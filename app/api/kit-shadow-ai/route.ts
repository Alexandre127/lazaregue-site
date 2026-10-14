import { NextResponse } from "next/server";
import { LIBELLE_LETTRE, MENTION_COMPLETE } from "@/app/ressources/shadow-ai/textes";

/**
 * Formulaire du kit « Shadow AI » (/ressources/shadow-ai) : enregistre la
 * demande dans HubSpot par la Forms API (soumission v3), puis accorde l'accès
 * aux documents.
 *
 * Variables d'environnement (jamais dans le code) :
 *   HUBSPOT_PORTAL_ID            identifiant du compte HubSpot ;
 *   HUBSPOT_FORM_ID_SHADOW_AI    identifiant (GUID) du formulaire HubSpot.
 * Absentes : l'accès aux documents est quand même accordé et un avertissement
 * est écrit dans les journaux du serveur.
 *
 * Point d'accès : POST /submissions/v3/integration/submit/{portalId}/{formGuid}.
 * Le compte du cabinet est hébergé dans l'UE (eu1) : l'hôte régional
 * api-eu1.hsforms.com est essayé d'abord, puis l'hôte général api.hsforms.com
 * s'il échoue. L'échec de HubSpot ne bloque jamais le téléchargement.
 *
 * Champs transmis : email, firstname, company, jobtitle (propriétés standard)
 * et lz_lettre_information ("true"/"false"), case d'abonnement distincte du
 * téléchargement ; plus le consentement RGPD de HubSpot (voir `consentement`). Contexte transmis : URL canonique de la page (jamais
 * l'adresse d'un aperçu), adresse IP du visiteur et, s'il existe déjà, son
 * cookie hubspotutk (lu, jamais déposé). Aucun e-mail envoyé.
 *
 * Région d'exécution : Paris (cdg1), fixée dans vercel.json.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;
const FONCTIONS = [
  "Direction générale",
  "Direction juridique ou conformité",
  "DSI, RSSI",
  "Ressources humaines",
  "Délégué à la protection des données",
  "Autre",
];
const MAX_BODY = 8 * 1024;
const HOTES = ["https://api-eu1.hsforms.com", "https://api.hsforms.com"];
const TIMEOUT_MS = 4000;

function clean(v: unknown, max: number): string {
  return String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/* Limitation en mémoire par IP — BEST-EFFORT, comme sur /api/contact. */
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

type Champ = { objectTypeId: "0-1"; name: string; value: string };

/* URL déclarée à HubSpot (context.pageUri) : TOUJOURS l'URL canonique du site.
   Une adresse *.vercel.app (aperçus) n'est pas un domaine enregistré dans le
   compte : HubSpot classe alors la soumission en spam (« Unregistered Site
   Domain ») et ne crée aucun contact. */
const DOMAINE_CANONIQUE = "https://lazaregue-avocats.fr";
function urlCanonique(): string {
  const env = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
  let base = DOMAINE_CANONIQUE;
  try {
    if (env && !/\.vercel\.app$/i.test(new URL(env).hostname)) base = env;
  } catch {
    /* valeur mal formée : domaine canonique */
  }
  return `${base}/ressources/shadow-ai`;
}

/** Cookie HubSpot du visiteur (hubspotutk), s'il existe déjà : il n'est déposé
 *  que si le visiteur a accepté la finalité « relation client ». */
function hutkDe(req: Request): string | undefined {
  const m = /(?:^|;\s*)hubspotutk=([^;]+)/.exec(req.headers.get("cookie") ?? "");
  return m ? decodeURIComponent(m[1]) : undefined;
}

type Contexte = { pageUri: string; pageName: string; hutk?: string; ipAddress?: string };

/* Consentement RGPD au sens de HubSpot (legalConsentOptions), pour un compte
   où les paramètres RGPD sont activés. Transmis UNIQUEMENT si la case lettre
   d'information est cochée (décision du cabinet, 14 oct. 2026) ; case non
   cochée : aucun legalConsentOptions. Jamais `legitimateInterest`, qui
   autoriserait l'envoi de la lettre à qui n'a pas coché la case.
   - consentToProcess : texte = la mention affichée sous le formulaire, mot
     pour mot ;
   - communications : abonnement au type « Lettre d'information du cabinet »,
     texte = le libellé exact de la case.
   Identifiant du type d'abonnement : HUBSPOT_SUBSCRIPTION_ID_LETTRE.
   Absent : aucun legalConsentOptions n'est envoyé (avertissement journalisé). */
type Consentement = {
  consent: {
    consentToProcess: true;
    text: string;
    communications: { value: true; subscriptionTypeId: number; text: string }[];
  };
};
function consentement(newsletter: boolean): Consentement | undefined {
  if (!newsletter) return undefined;
  const id = Number(process.env.HUBSPOT_SUBSCRIPTION_ID_LETTRE);
  if (!Number.isInteger(id) || id <= 0) {
    console.warn("[kit-shadow-ai] HUBSPOT_SUBSCRIPTION_ID_LETTRE absente ou invalide : consentement non transmis à HubSpot.");
    return undefined;
  }
  return {
    consent: {
      consentToProcess: true,
      text: MENTION_COMPLETE,
      communications: [{ value: true, subscriptionTypeId: id, text: LIBELLE_LETTRE }],
    },
  };
}

async function soumettre(
  portal: string,
  form: string,
  fields: Champ[],
  context: Contexte,
  legalConsentOptions?: Consentement,
): Promise<void> {
  const body = JSON.stringify({ fields, context, ...(legalConsentOptions ? { legalConsentOptions } : {}) });
  for (const hote of HOTES) {
    const url = `${hote}/submissions/v3/integration/submit/${portal}/${form}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const reponse = await res.text().catch(() => "");
      if (res.ok) {
        console.info(`[kit-shadow-ai] POST ${url} (pageUri ${context.pageUri}) → ${res.status} ${reponse}`);
        return;
      }
      console.error(`[kit-shadow-ai] POST ${url} (pageUri ${context.pageUri}) → ${res.status} ${reponse}`);
    } catch (e) {
      console.error(`[kit-shadow-ai] POST ${url} (pageUri ${context.pageUri}) → échec réseau :`, e);
    }
  }
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 413 });
  }
  let data: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) throw new Error("trop long");
    data = JSON.parse(raw) as Record<string, unknown>;
    if (typeof data !== "object" || data === null) throw new Error("invalide");
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège : rempli = robot. Réponse identique à un succès, rien n'est transmis.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    console.warn("[kit-shadow-ai] Champ piège rempli : demande écartée (robot ou remplissage automatique du navigateur).");
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "inconnu";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes depuis cette connexion. Réessayez plus tard." },
      { status: 429 },
    );
  }

  const email = clean(data.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Saisissez une adresse électronique valide, par exemple prenom.nom@entreprise.fr.", invalides: ["email"] },
      { status: 422 },
    );
  }
  const prenom = clean(data.prenom, 80);
  const entreprise = clean(data.entreprise, 160);
  const fonctionBrute = clean(data.fonction, 80);
  const fonction = FONCTIONS.includes(fonctionBrute) ? fonctionBrute : "";
  const newsletter = data.newsletter === true;

  const portal = process.env.HUBSPOT_PORTAL_ID;
  const form = process.env.HUBSPOT_FORM_ID_SHADOW_AI;
  if (!portal || !form) {
    console.warn(
      "[kit-shadow-ai] HUBSPOT_PORTAL_ID ou HUBSPOT_FORM_ID_SHADOW_AI absente : demande non enregistrée dans HubSpot, accès aux documents accordé.",
    );
    return NextResponse.json({ ok: true });
  }

  const fields: Champ[] = [
    { objectTypeId: "0-1", name: "email", value: email },
    ...(prenom ? [{ objectTypeId: "0-1" as const, name: "firstname", value: prenom }] : []),
    ...(entreprise ? [{ objectTypeId: "0-1" as const, name: "company", value: entreprise }] : []),
    ...(fonction ? [{ objectTypeId: "0-1" as const, name: "jobtitle", value: fonction }] : []),
    { objectTypeId: "0-1", name: "lz_lettre_information", value: newsletter ? "true" : "false" },
  ];
  const hutk = hutkDe(req);
  const context: Contexte = {
    pageUri: urlCanonique(),
    pageName: "Shadow AI : ce que risque l'entreprise et comment l'encadrer",
    ...(hutk ? { hutk } : {}),
    ...(ip !== "inconnu" ? { ipAddress: ip } : {}),
  };
  await soumettre(portal, form, fields, context, consentement(newsletter));

  return NextResponse.json({ ok: true });
}
