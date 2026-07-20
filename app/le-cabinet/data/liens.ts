/**
 * Liens de la page — PLACEHOLDERS à confirmer.
 *
 * `CONTACT_HREF`  : destination des CTA « Nous exposer votre dossier ».
 *                   Pointe pour l'instant sur /contact (comme le reste du site).
 * `AVIS_HREF`     : plateforme d'avis externe (bloc « cadre de confiance »).
 *                   `null` ⇒ le lien est rendu en texte inerte, pas en lien mort.
 */

export const CONTACT_HREF = "/contact";

export const AVIS_HREF: string | null = null;
export const AVIS_LABEL = "[plateforme externe — à renseigner]";

export const CABINET = {
  adresse: "18 rue de Tilsitt, 75017 Paris",
  telephone: "+33 1 81 70 62 00",
  telephoneUri: "+33181706200",
  email: "contact@lazaregue-avocats.fr",
};
