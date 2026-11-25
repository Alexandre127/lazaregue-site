import { NextResponse } from "next/server";
import { upsertAbonneObservatoire } from "@/lib/hubspot";
import { CONSENTEMENT_TEXTE } from "@/lib/observatoire-consent";

/**
 * Abonnement « Recevoir les prochaines notes » de l'Observatoire (pages note
 * d'analyse et offre « sécurité des paiements »).
 *
 * Même mécanisme que /api/contact : enregistrement CÔTÉ SERVEUR dans le CRM
 * HubSpot (upsert par e-mail via HUBSPOT_PRIVATE_TOKEN, déjà configuré). La base
 * légale est le CONSENTEMENT (case obligatoire, non pré-cochée). Aucun e-mail
 * n'est envoyé ici : le visiteur reçoit une confirmation à l'écran, et recevra
 * les notes à venir. Aucune donnée personnelle n'est journalisée.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;

const MAX = { nom: 120, etablissement: 160, fonction: 120, email: 254, page: 300, body: 8 * 1024 } as const;

function clean(v: unknown, max: number): string {
  return String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

// Limitation best-effort par IP (cf. /api/contact : non fiable multi-instances ;
// la vraie protection est au pare-feu Vercel).
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 10;
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) for (const k of HITS.keys()) { HITS.delete(k); if (HITS.size <= 2500) break; }
  return arr.length > MAX_HITS;
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX.body) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 413 });
  }
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (raw.length > MAX.body) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 413 });
  }
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (typeof data !== "object" || data === null) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège : rempli = robot. On répond 200 sans rien enregistrer.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "inconnu";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Réessayez dans quelques minutes." },
      { status: 429 },
    );
  }

  const nom = clean(data.nom, MAX.nom);
  const etablissement = clean(data.etablissement, MAX.etablissement);
  const fonction = clean(data.fonction, MAX.fonction);
  const email = clean(data.email, MAX.email).toLowerCase();
  const page = clean(data.page, MAX.page);
  const consentement = data.consentement === true || data.consentement === "true";

  const invalides: string[] = [];
  if (!EMAIL_RE.test(email)) invalides.push("email");
  if (!consentement) invalides.push("consentement");
  if (invalides.length) {
    return NextResponse.json({ ok: false, error: "Champs invalides.", invalides }, { status: 422 });
  }

  // Enregistrement CRM côté serveur (indépendant des cookies), attendu avant la
  // réponse pour qu'il aboutisse même si l'instance se fige ensuite. On consigne
  // la DATE et le TEXTE EXACT du consentement, ainsi que la page d'origine.
  const consentementDate = new Date().toISOString().slice(0, 10); // AAAA-MM-JJ
  const res = await upsertAbonneObservatoire({
    email,
    nom,
    etablissement,
    fonction,
    page,
    consentementTexte: CONSENTEMENT_TEXTE,
    consentementDate,
  }).catch((e) => ({ ok: false as const, reason: e instanceof Error ? e.message : "unknown" }));

  // Demande du cabinet : un échec HubSpot est JOURNALISÉ mais N'EMPÊCHE PAS
  // l'affichage de la confirmation. Le visiteur voit la confirmation ; l'échec
  // (y compris « token-absent ») est traité par le cabinet via les logs.
  if (!res.ok) console.error("[abonnement] HubSpot:", res.reason);
  return NextResponse.json({ ok: true });
}
