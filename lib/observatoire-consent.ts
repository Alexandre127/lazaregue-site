/**
 * Texte EXACT de la case de consentement du formulaire « Recevoir les prochaines
 * notes » de l'Observatoire. Source UNIQUE, partagée par l'affichage
 * (components/observatoire/AbonnementForm.tsx, qui le rend et insère le lien vers
 * la politique de confidentialité) et l'enregistrement serveur
 * (app/api/abonnement-notes/route.ts → HubSpot). Ainsi, la preuve de consentement
 * stockée correspond mot pour mot à ce que le visiteur a coché.
 *
 * `LIEN_POLITIQUE` est le fragment sur lequel l'affichage coupe le texte pour y
 * poser le lien. Si ce texte change, le modifier ICI.
 */
export const LIEN_POLITIQUE = "politique de confidentialité";

export const CONSENTEMENT_TEXTE =
  "J’accepte de recevoir par e-mail les notes d’analyse de Lazarègue Avocats. Je peux me désinscrire à tout moment grâce au lien présent dans chaque envoi. Mes données sont utilisées pour ce seul envoi, conformément à la " +
  LIEN_POLITIQUE +
  ".";
