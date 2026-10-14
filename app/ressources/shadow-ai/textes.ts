/**
 * Textes juridiques du formulaire du kit « Shadow AI », source UNIQUE : la page
 * les affiche et /api/kit-shadow-ai transmet exactement les mêmes à HubSpot
 * (legalConsentOptions), pour que la preuve du consentement reprenne mot pour
 * mot ce que l'internaute a lu.
 */

/** Libellé de la case lettre d'information. */
export const LIBELLE_LETTRE =
  "Recevoir la lettre d'information du cabinet sur le droit du numérique, environ une fois par mois. Désinscription en un clic.";

/** Mention d'information sous le bouton, hors lien final. */
export const MENTION =
  "Lazarègue Avocats traite ces données pour vous donner accès aux documents et, si vous l'acceptez, sa lettre d'information. Elles sont conservées trois ans à compter du dernier contact. Vous disposez de droits d'accès, de rectification, d'effacement et d'opposition auprès de contact@lazaregue-avocats.fr, et pouvez saisir la CNIL.";

/** Lien qui termine la mention. */
export const MENTION_LIEN = "Politique de confidentialité";

/** Mention telle qu'affichée, lien compris. */
export const MENTION_COMPLETE = `${MENTION} ${MENTION_LIEN}.`;
