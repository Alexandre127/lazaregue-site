import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { upsertAvisGoogle } from "@/lib/hubspot";
import { decisionsVisibles } from "@/app/ressources/data/decisions-avis-google";
import { LIBELLES, dateLongue, evaluer, type Reponses } from "@/app/ressources/_components/diagnostic/evaluer";

/**
 * Traitement serveur du formulaire du diagnostic « avis Google ».
 *
 * Même circuit que /api/contact : e-mail au cabinet par le SMTP de sa
 * messagerie (aucune copie en base) + enregistrement du contact dans HubSpot
 * côté serveur (indépendant des cookies), avec les propriétés avis_*.
 * L'orientation est RECALCULÉE ici à partir des réponses : on ne fait pas
 * confiance à celle qu'afficherait le navigateur.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;
const MAX_BODY = 16 * 1024;

function clean(v: unknown, max: number): string {
  return String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}
function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}
const parmi = <T extends string>(v: unknown, valeurs: readonly T[]): T | null => (valeurs.includes(v as T) ? (v as T) : null);

/* Limitation en mémoire par IP (best-effort, comme /api/contact). */
const HITS = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) for (const k of HITS.keys()) { HITS.delete(k); if (HITS.size <= 2500) break; }
  return arr.length > 5;
}

export async function POST(req: Request) {
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (raw.length > MAX_BODY) return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 413 });
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (typeof data !== "object" || data === null) return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });

  // Champ piège : rempli = robot. Réponse 200 sans rien envoyer.
  if (typeof data.website === "string" && data.website.trim() !== "") return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "inconnu";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Trop de demandes envoyées. Réessayez dans quelques minutes ou appelez le cabinet." }, { status: 429 });
  }

  const nom = clean(data.nom, 120);
  const org = clean(data.org, 160);
  const email = clean(data.email, 254).toLowerCase();
  const tel = clean(data.tel, 40);
  const url = clean(data.url, 600);
  const message = String(data.message ?? "").replace(/\r\n/g, "\n").trim().slice(0, 2000);
  const page = clean(data.page, 300);

  const invalides: string[] = [];
  if (!nom) invalides.push("nom");
  if (!EMAIL_RE.test(email)) invalides.push("email");
  if (!/^https?:\/\/\S+$/i.test(url)) invalides.push("url");
  // Les deux cases sont obligatoires (honoraires, traitement des données).
  if (data.prix !== true) invalides.push("prix");
  if (data.rgpd !== true) invalides.push("rgpd");
  if (invalides.length) return NextResponse.json({ ok: false, error: "Champs invalides.", invalides }, { status: 422 });

  // Réponses au diagnostic (toutes facultatives) : valeurs fermées uniquement.
  const r = (data.reponses && typeof data.reponses === "object" ? data.reponses : {}) as Record<string, unknown>;
  const dateIso = typeof r.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(r.date) ? r.date : null;
  const rep: Reponses = {
    vise: parmi(r.vise, ["societe", "nom", "sante", "secret"] as const),
    client: parmi(r.client, ["non", "oui", "nsp"] as const),
    contenu: parmi(r.contenu, ["critique", "fait", "insulte", "perso"] as const),
    date: dateIso ? new Date(`${dateIso}T00:00:00`) : null,
    serie: parmi(r.serie, ["un", "meme", "vague"] as const),
    signal: parmi(r.signal, ["non", "bouton", "refus", "reclam"] as const),
  };
  const orientation = rep.contenu ? evaluer(rep, decisionsVisibles(false)).titre : "Non établie";
  const lib = {
    vise: rep.vise ? LIBELLES.vise[rep.vise] : "Non renseigné",
    client: rep.client ? LIBELLES.client[rep.client] : "Non renseigné",
    contenu: rep.contenu ? LIBELLES.contenu[rep.contenu] : "Non renseigné",
    date: rep.date ? dateLongue(rep.date) : "Non renseignée",
    serie: rep.serie ? LIBELLES.serie[rep.serie] : "Non renseigné",
    signal: rep.signal ? LIBELLES.signal[rep.signal] : "Non renseigné",
  };

  const crm = upsertAvisGoogle({
    email,
    nom,
    org,
    tel,
    message,
    page,
    avis: {
      vise: lib.vise,
      auteur_client: lib.client,
      contenu: lib.contenu,
      date_publication: dateIso ?? "",
      serie: lib.serie,
      signalement: lib.signal,
      orientation,
      url,
    },
  })
    .then((res) => {
      if (!res.ok) console.error("[avis-google] HubSpot:", res.reason);
      return res;
    })
    .catch((e) => {
      console.error("[avis-google] HubSpot:", e);
      return { ok: false as const };
    });

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    await crm;
    return NextResponse.json({ ok: false, error: "Le service d'envoi n'est pas encore configuré." }, { status: 503 });
  }
  const to = process.env.CONTACT_TO || "contact@lazaregue-avocats.fr";
  const from = process.env.CONTACT_FROM || user;
  const transporter = nodemailer.createTransport({ host, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "true", auth: { user, pass } });

  const lignes = [
    "DEMANDE D'EXAMEN — AVIS GOOGLE",
    `Nom : ${nom}`,
    `Établissement : ${org || "—"}`,
    `E-mail : ${email}`,
    `Téléphone : ${tel || "—"}`,
    `Avis : ${url}`,
    "",
    `Personne visée : ${lib.vise}`,
    `Auteur client : ${lib.client}`,
    `Contenu : ${lib.contenu}`,
    `Publication : ${lib.date}`,
    `Série : ${lib.serie}`,
    `Signalement Google : ${lib.signal}`,
    `Orientation : ${orientation}`,
    "Honoraires : pris connaissance",
    "",
    `Précisions : ${message || "—"}`,
  ];

  try {
    await transporter.sendMail({
      from: `"Formulaire lazaregue-avocats.fr" <${from}>`,
      to,
      replyTo: `"${nom}" <${email}>`,
      subject: `Avis Google — demande d'examen (${orientation})`,
      text: lignes.join("\n"),
      html: `<p>${lignes.map((l) => esc(l)).join("<br>")}</p>`,
    });
    await crm;
    return NextResponse.json({ ok: true });
  } catch {
    await crm;
    return NextResponse.json({ ok: false, error: "L'envoi a échoué. Réessayez, ou contactez le cabinet par téléphone ou e-mail." }, { status: 502 });
  }
}
