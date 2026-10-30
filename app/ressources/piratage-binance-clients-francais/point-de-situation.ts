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
  miseAJour: "2026-10-30T17:00:00+01:00",
  /** Libellés affichés. */
  date: "30 octobre 2026",
  heure: "17 h",
  cases: [
    { titre: "Retraits", texte: "suspendus. Binance dit viser une reprise dans les 45 heures suivant sa mise à jour du 30 octobre." },
    { titre: "Montant concerné", texte: "environ 6,3 milliards de dollars, dont environ 3 milliards déjà bloqués." },
    { titre: "Engagement", texte: "Binance annonce qu'elle couvrira toutes les pertes." },
    { titre: "Prochaine étape", texte: "une vérification publique de ses réserves, annoncée pour la fin des réparations." },
  ],
} as const;

/** Date de première mise en ligne (ne change plus après publication). */
export const PUBLIE_LE = "2026-10-30T17:00:00+01:00";
