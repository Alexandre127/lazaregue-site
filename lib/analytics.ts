/**
 * Utilitaire UNIQUE de mesure côté client : `track(event, params)` pousse un
 * événement dans `window.dataLayer`. Google Tag Manager le relaie ensuite aux
 * seuls outils AUTORISÉS par le visiteur (Consent Mode v2 + déclencheurs liés
 * aux finalités du bandeau CookieConsent).
 *
 * RÈGLE ABSOLUE (§2 du doc stratégie) : AUCUNE donnée saisie ni personnelle ne
 * transite par le dataLayer — ni nom, e-mail, téléphone, ni contenu de message.
 * Seuls l'objet choisi dans une liste et l'indicateur d'urgence (oui/non) sont
 * admis. Les paramètres communs sont `page_type`, `domaine`, `composant`.
 */

export type PageType =
  | "accueil"
  | "domaine"
  | "ressource"
  | "cas_client"
  | "formation"
  | "cabinet"
  | "contact"
  | "autre";

export type TrackParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Pousse un événement dans le dataLayer (no-op côté serveur). */
export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const payload: Record<string, unknown> = { event };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") payload[key] = value;
  }
  window.dataLayer.push(payload);
}

/** Déduit le `page_type` d'un chemin, pour les événements de vue de page. */
export function pageTypeFromPath(pathname: string): PageType {
  if (pathname === "/") return "accueil";
  if (pathname === "/contact") return "contact";
  if (pathname === "/le-cabinet") return "cabinet";
  if (pathname.startsWith("/nos-domaines/")) return "domaine";
  if (pathname.startsWith("/cas-clients/")) return "cas_client";
  if (pathname.startsWith("/formations/")) return "formation";
  if (pathname.startsWith("/ressources/")) return "ressource";
  return "autre";
}

/** Extrait le slug de domaine (`/nos-domaines/<slug>`) sinon chaîne vide. */
export function domaineFromPath(pathname: string): string {
  const m = pathname.match(/^\/nos-domaines\/([^/]+)/);
  return m ? m[1] : "";
}
