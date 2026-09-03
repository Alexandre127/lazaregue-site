/**
 * Note Google du cabinet — source unique pour tout le site.
 *
 * Valeurs relevées sur la fiche d'établissement Google gérée par le cabinet
 * (capture du 21 juillet 2026 : « Lazarègue Avocats — 5,0 (17) »).
 *
 * Ces valeurs alimentent aussi les données structurées, que Google affiche en
 * étoiles dans les résultats : elles doivent rester exactes. À réactualiser
 * lorsque le nombre d'avis évolue — un seul endroit à modifier.
 */
export const AVIS = {
  note: "5,0",
  /** Valeur numérique pour le JSON-LD */
  noteNum: "5",
  nombre: 17,
  source: "Avis Google",
  href: "https://www.google.com/search?q=Lazar%C3%A8gue+Avocats+Paris",
  /** Date du relevé, à mentionner si la note est citée */
  releve: "juillet 2026",
};
