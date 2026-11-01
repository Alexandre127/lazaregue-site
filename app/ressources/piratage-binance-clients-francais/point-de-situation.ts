/**
 * ENCADRÉ « POINT AU … » — seul endroit à modifier à chaque annonce officielle.
 *
 * Mettre à jour la date, l'heure et le texte des quatre cases. `miseAJour`
 * (date ISO, heure de Paris) alimente aussi automatiquement :
 *  - `dateModified` (données structurées Article),
 *  - `article:modified_time` (Open Graph),
 *  - le `lastmod` du plan du site,
 *  - la ligne « à jour au … » de l'en-tête et la mention finale.
 *
 * Heure de Paris : +01:00 en hiver (fin octobre à fin mars), +02:00 en été.
 */
export const POINT = {
  /** Date et heure de la dernière mise à jour (ISO 8601, heure de Paris). */
  miseAJour: "2026-11-01T09:30:00+01:00",
  /** Libellés affichés. */
  date: "1er novembre 2026",
  heure: "9 h 30",
  /** Quatre cases : libellé, valeur courte (en gros), détail. */
  cases: [
    { libelle: "Retraits", valeur: "Reprise progressive", detail: "Depuis ce matin, en commençant par le bitcoin. Les autres cryptos et réseaux rouvrent par étapes." },
    { libelle: "Montant concerné", valeur: "≈ 6,3 Md$", detail: "Binance indique avoir déjà remplacé environ 95 % des cryptos volées." },
    { libelle: "Engagement", valeur: "Pertes couvertes", detail: "Financées par son fonds SAFU, un fonds d'assurance interne et ses fonds propres, selon Binance." },
    { libelle: "Prochaine étape", valeur: "Preuve de réserves", detail: "Annoncée pour le début de la semaine." },
  ],
} as const;

/** Date de première mise en ligne (ne change plus après publication). */
export const PUBLIE_LE = "2026-10-30T20:00:00+01:00";
