/**
 * Marquage d'événements UX (UX-001 / UX-003) — SANS traqueur installé.
 *
 * Helper no-op : il fige les NOMS d'événements et leur point d'appel, prêts à
 * être branchés le jour où un outil de mesure (respectueux de la vie privée)
 * sera choisi. Aucune requête réseau, aucun cookie, aucun coût de performance.
 *
 * Événements figés (ne pas renommer sans mettre à jour les appels) :
 *   - cta_principal    : clic sur « Échanger avec un avocat » (hero, contact, barre mobile)
 *   - cta_violation    : clic sur « Signaler une violation » (section urgences)
 *   - cta_cnil         : clic sur « Être assisté face à la CNIL » (section urgences)
 *   - specimen_ouvert  : sélection d'un spécimen dans la liste
 *   - specimen_agrandi : ouverture d'un spécimen en modale
 *   - clic_telephone   : clic sur le numéro de téléphone
 */
export type TrackEvent =
  | "cta_principal"
  | "cta_violation"
  | "cta_cnil"
  | "specimen_ouvert"
  | "specimen_agrandi"
  | "clic_telephone";

export function track(
  _event: TrackEvent,
  _props?: Record<string, string | number | boolean>,
): void {
  // No-op délibéré. Branchement futur ici (ex. : window.__analytics?.(event, props)).
}
