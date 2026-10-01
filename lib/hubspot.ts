/**
 * Enregistrement serveur des demandes de contact dans HubSpot (CRM).
 *
 * Module SERVEUR uniquement : importé par app/api/contact/route.ts (runtime
 * Node). Ne jamais l'importer depuis un composant client — il porte le jeton.
 *
 * Principes (§ stratégie data-conversion, exigence 5 & 7) :
 *  - indépendant des cookies et du choix de consentement : l'upsert a lieu côté
 *    serveur, qu'on ait accepté ou refusé les traceurs ;
 *  - ne BLOQUE JAMAIS l'e-mail : toute erreur est journalisée et avalée, la
 *    fonction renvoie un simple indicateur, jamais d'exception ;
 *  - base légale renseignée : « Exécution d'un contrat » (propriété standard
 *    hs_legal_basis), dont la valeur d'option est résolue dynamiquement depuis
 *    le schéma du compte (le RGPD doit être activé dans HubSpot) ;
 *  - aucune donnée « notes » (le jeton n'a pas le scope notes) : le message est
 *    stocké dans une propriété de contact dédiée ;
 *  - propriétés personnalisées créées à la volée si elles manquent.
 *
 * Jeton : HUBSPOT_PRIVATE_TOKEN (déjà présent dans Vercel, Production + Preview).
 * Hébergement du compte : UE (eu1). L'API publique reste api.hubapi.com pour
 * toutes les régions ; eu1 ne concerne que la résidence des données.
 */

const TOKEN = process.env.HUBSPOT_PRIVATE_TOKEN;
const BASE = "https://api.hubapi.com";
const TIMEOUT_MS = 4000;

export type HubspotContact = {
  email: string;
  nom: string;
  org?: string;
  tel?: string;
  objet: string;
  urgenceLabel: string;
  echeance?: string;
  message: string;
  page?: string;
  utm?: Partial<Record<"source" | "medium" | "campaign" | "term" | "content", string>>;
};

// Propriétés personnalisées (préfixe lz_) créées si absentes. Groupe standard
// « contactinformation » pour qu'elles apparaissent sur la fiche contact.
const CUSTOM_PROPS: { name: string; label: string; fieldType: "text" | "textarea" }[] = [
  { name: "lz_objet", label: "Objet de la demande (site)", fieldType: "text" },
  { name: "lz_urgence", label: "Urgence (site)", fieldType: "text" },
  { name: "lz_echeance", label: "Échéance indiquée (site)", fieldType: "text" },
  { name: "lz_message", label: "Message du formulaire (site)", fieldType: "textarea" },
  { name: "lz_page", label: "Page d'arrivée (site)", fieldType: "text" },
  { name: "lz_utm_source", label: "UTM source (site)", fieldType: "text" },
  { name: "lz_utm_medium", label: "UTM medium (site)", fieldType: "text" },
  { name: "lz_utm_campaign", label: "UTM campaign (site)", fieldType: "text" },
  { name: "lz_utm_term", label: "UTM term (site)", fieldType: "text" },
  { name: "lz_utm_content", label: "UTM content (site)", fieldType: "text" },
];

async function hs(path: string, init: RequestInit = {}): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${BASE}${path}`, {
      ...init,
      signal: ctrl.signal,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

// --- Caches par instance « chaude » (évite de refaire ces appels à chaque POST) ---
let propsEnsured: Promise<void> | null = null;
let legalBasisValue: Promise<string | undefined> | null = null;

/** Crée les propriétés personnalisées manquantes (une seule fois par instance). */
function ensureProperties(): Promise<void> {
  if (propsEnsured) return propsEnsured;
  propsEnsured = (async () => {
    const res = await hs("/crm/v3/properties/contacts?archived=false");
    if (!res.ok) throw new Error(`props list ${res.status}`);
    const json = (await res.json()) as { results?: { name: string }[] };
    const existing = new Set((json.results || []).map((p) => p.name));
    const missing = CUSTOM_PROPS.filter((p) => !existing.has(p.name));
    if (!missing.length) return;
    const inputs = missing.map((p) => ({
      name: p.name,
      label: p.label,
      type: "string",
      fieldType: p.fieldType,
      groupName: "contactinformation",
    }));
    const create = await hs("/crm/v3/properties/contacts/batch/create", {
      method: "POST",
      body: JSON.stringify({ inputs }),
    });
    if (!create.ok) throw new Error(`props create ${create.status}`);
  })().catch((e) => {
    // En cas d'échec, on réessaiera à la prochaine instance froide.
    propsEnsured = null;
    throw e;
  });
  return propsEnsured;
}

/**
 * Résout la valeur d'option de hs_legal_basis correspondant à « Exécution d'un
 * contrat » depuis le schéma du compte. Renvoie undefined si la propriété
 * n'existe pas (RGPD non activé) ou si aucune option ne correspond.
 */
function resolvePerformanceOfContract(): Promise<string | undefined> {
  if (legalBasisValue) return legalBasisValue;
  legalBasisValue = (async () => {
    const res = await hs("/crm/v3/properties/contacts/hs_legal_basis");
    if (!res.ok) return undefined; // 404 = RGPD non activé sur le compte
    const json = (await res.json()) as { options?: { label: string; value: string }[] };
    const opts = json.options || [];
    const match =
      opts.find((o) => o.value === "PERFORMANCE_OF_CONTRACT") ||
      opts.find((o) => /performance of (a )?contract/i.test(o.label)) ||
      opts.find((o) => /exécution d('|’)un contrat/i.test(o.label));
    return match?.value;
  })().catch(() => undefined);
  return legalBasisValue;
}

/** Scinde « Prénom Nom » en firstname / lastname (best-effort, non bloquant). */
function splitName(nom: string): { firstname: string; lastname?: string } {
  const parts = nom.trim().split(/\s+/);
  if (parts.length <= 1) return { firstname: parts[0] || "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

/**
 * Upsert d'un contact par e-mail. Ne lève jamais : renvoie { ok } pour la
 * journalisation. L'appelant ne doit pas attendre ce résultat pour répondre au
 * visiteur ni pour envoyer l'e-mail.
 */
export async function upsertContact(c: HubspotContact): Promise<{ ok: boolean; reason?: string }> {
  if (!TOKEN) return { ok: false, reason: "token-absent" };

  try {
    // Propriétés personnalisées + base légale en parallèle (cachées).
    const [, legalBasis] = await Promise.all([
      ensureProperties().catch(() => undefined),
      resolvePerformanceOfContract(),
    ]);

    const { firstname, lastname } = splitName(c.nom);
    const utm = c.utm || {};
    const properties: Record<string, string> = {
      email: c.email,
      ...(firstname ? { firstname } : {}),
      ...(lastname ? { lastname } : {}),
      ...(c.org ? { company: c.org } : {}),
      ...(c.tel ? { phone: c.tel } : {}),
      lz_objet: c.objet,
      lz_urgence: c.urgenceLabel,
      ...(c.echeance ? { lz_echeance: c.echeance } : {}),
      lz_message: c.message,
      ...(c.page ? { lz_page: c.page } : {}),
      ...(utm.source ? { lz_utm_source: utm.source } : {}),
      ...(utm.medium ? { lz_utm_medium: utm.medium } : {}),
      ...(utm.campaign ? { lz_utm_campaign: utm.campaign } : {}),
      ...(utm.term ? { lz_utm_term: utm.term } : {}),
      ...(utm.content ? { lz_utm_content: utm.content } : {}),
      ...(legalBasis ? { hs_legal_basis: legalBasis } : {}),
    };

    // Upsert par e-mail en un appel (crée ou met à jour selon idProperty).
    const res = await hs("/crm/v3/objects/contacts/batch/upsert", {
      method: "POST",
      body: JSON.stringify({ inputs: [{ idProperty: "email", id: c.email, properties }] }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, reason: `upsert ${res.status} ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : "unknown" };
  }
}
