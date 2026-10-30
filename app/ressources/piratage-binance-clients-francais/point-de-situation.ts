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
  miseAJour: "2026-10-30T20:00:00+01:00",
  /** Libellés affichés. */
  date: "30 octobre 2026",
  heure: "20 h",
  /** Quatre cases : libellé, valeur courte (en gros), détail. */
  cases: [
    { libelle: "Retraits", valeur: "Suspendus", detail: "Binance vise une reprise d'ici le dimanche 1er novembre, après reconstruction et tests de son système de retrait." },
    { libelle: "Montant concerné", valeur: "≈ 6,3 Md$", detail: "Dont environ 3 milliards déjà bloqués, selon Binance." },
    { libelle: "Engagement", valeur: "Pertes couvertes", detail: "Binance annonce avoir mis de côté plus de 6,34 milliards de dollars de fonds propres pour couvrir les pertes." },
    { libelle: "Prochaine étape", valeur: "Preuve de réserves", detail: "Rapport complet annoncé pour le lundi 2 novembre, avec un premier aperçu avant." },
  ],
} as const;

/** Date de première mise en ligne (ne change plus après publication). */
export const PUBLIE_LE = "2026-10-30T20:00:00+01:00";
