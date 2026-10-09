/**
 * Décisions citées par le diagnostic « avis Google » — fichier UNIQUE.
 *
 * `verifie: true` = décision relue par le cabinet sur son texte intégral.
 * `verifie: false` = issue d'une extraction non encore vérifiée : elle n'est
 * JAMAIS affichée en production (ni dans les listes, ni dans une phrase). Hors
 * production (développement, prévisualisation), elle apparaît avec la mention
 * « à vérifier » pour permettre la relecture.
 *
 * Pour publier une décision : la vérifier, puis passer `verifie` à true.
 */
export type Decision = {
  id: string;
  ref: string; // référence complète (résultat du diagnostic, notes)
  court: string; // référence courte (liste « Ce que jugent les tribunaux »)
  texte: string; // résumé affiché dans « décisions comparables »
  liste?: string; // résumé affiché dans « Ce que jugent les tribunaux » (si la décision y figure)
  favorable: boolean; // true = retrait obtenu ; false = avis maintenu ou demande rejetée
  verifie: boolean;
};

export const DECISIONS: Decision[] = [
  {
    id: "cab",
    ref: "Dossier traité par le cabinet",
    court: "Dossier traité par le cabinet",
    texte: "Avis authentique d’un ancien client, conforme aux règles de Google mais révélant des informations commerciales confidentielles : retrait obtenu sans contester l’expérience du client.",
    liste: "Avis authentique d’un ancien client révélant des informations commerciales confidentielles : retrait obtenu auprès de Google.",
    favorable: true,
    verifie: true, // dossier du cabinet (voir le cas client publié)
  },
  {
    id: "cass24",
    ref: "Cass. 1re civ., 26 juin 2024, n° 22-22.483",
    court: "Cass. 1re civ., 26 juin 2024",
    texte: "Faux profils publiant des avis contre un chirurgien : retrait et interdiction de diffusion sous astreinte confirmés.",
    liste: "Faux profils contre un chirurgien : retrait et interdiction de diffusion sous astreinte.",
    favorable: true,
    verifie: true,
  },
  {
    id: "cha25",
    ref: "CA Chambéry, 22 mai 2025, n° 22/01814",
    court: "CA Chambéry, 22 mai 2025",
    texte: "Fiche d’une dentiste créée sans son consentement : suppression de la fiche et 10 000 € de dommages et intérêts (RGPD).",
    liste: "Fiche d’une dentiste créée sans son consentement : suppression et 10 000 €.",
    favorable: true,
    verifie: true,
  },
  {
    id: "gre25",
    ref: "CA Grenoble, 2025, n° 23/02032",
    court: "CA Grenoble, 2025",
    texte: "Faux avis contre une ophtalmologue, rédigés par une personne qui n’avait jamais été patiente : dénigrement, 5 000 € de dommages et intérêts.",
    liste: "Faux avis contre une ophtalmologue, par une personne jamais soignée : 5 000 € de dommages et intérêts.",
    favorable: true,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "tls22",
    ref: "CA Toulouse, 13 janv. 2022, n° 21/00861",
    court: "CA Toulouse, 13 janv. 2022",
    texte: "Avis accusant un élevage d’illégalité et de plaintes inexistantes : retrait ordonné sous astreinte.",
    liste: "Élevage accusé d’illégalité et de plaintes inexistantes : retrait sous astreinte.",
    favorable: true,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "aix18",
    ref: "CA Aix-en-Provence, 22 févr. 2018, n° 17/20726",
    court: "CA Aix-en-Provence, 22 févr. 2018",
    texte: "Avis imputant une faute précise à un ostéopathe, sans preuve ni bonne foi : retrait ordonné sous astreinte.",
    favorable: true,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "dou25",
    ref: "CA Douai, 25 sept. 2025, n° 24/01714",
    court: "CA Douai, 25 sept. 2025",
    texte: "« Entreprise non professionnelle », écrit par un vrai client : avis maintenu, la critique reposant sur son expérience.",
    liste: "« Entreprise non professionnelle », écrit par un client : maintenu.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "col21",
    ref: "CA Colmar, 2 déc. 2021 ; Cass. 1re civ., 8 mars 2023",
    court: "Cass. 1re civ., 8 mars 2023",
    texte: "Avis d’une cliente relatant exactement des retards de livraison : avis maintenu, 3 000 € de frais mis à la charge du promoteur.",
    liste: "Retards de livraison exactement relatés : maintenu, 3 000 € de frais pour le promoteur.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "par26",
    ref: "CA Paris, 2 juill. 2026, n° 25/16002",
    court: "CA Paris, 2 juill. 2026",
    texte: "Avis évoquant une intoxication dans une boulangerie : passages diffamatoires, mais bonne foi plausible, retrait refusé en référé.",
    liste: "Intoxication alléguée dans une boulangerie : bonne foi plausible, retrait refusé en référé.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "ren26",
    ref: "CA Rennes, 20 janv. 2026, n° 25/00268",
    court: "CA Rennes, 20 janv. 2026",
    texte: "Cabinet d’avocats visé par des avis présentés comme faux : identification refusée, la diffamation étant prescrite.",
    liste: "Diffamation prescrite : identification de l’auteur refusée.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "mtp22",
    ref: "CA Montpellier, 15 sept. 2022, n° 22/00066",
    court: "CA Montpellier, 15 sept. 2022",
    texte: "« Des voleurs » retiré par l’auteure en cours d’instance : le reste de l’avis relève de la libre critique.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  /* Décisions citées dans une phrase (notes du résultat), sans figurer dans les listes. */
  {
    id: "par22",
    ref: "CA Paris, 27 avr. 2022, n° 21/14958",
    court: "CA Paris, 27 avr. 2022",
    texte: "Demande rejetée en l’absence d’indices sérieux de faux avis.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
  {
    id: "nan22",
    ref: "CA Nancy, 12 déc. 2022, n° 22/00726",
    court: "CA Nancy, 12 déc. 2022",
    texte: "Garage condamné pour avoir publié le nom et l’adresse d’un client dans sa réponse à un avis.",
    favorable: false,
    verifie: true, // confirmée par le cabinet le 9 octobre 2026
  },
];

/** Décisions affichables : toutes hors production, seulement les vérifiées en production. */
export function decisionsVisibles(montrerNonVerifiees: boolean): Map<string, Decision> {
  return new Map(DECISIONS.filter((d) => d.verifie || montrerNonVerifiees).map((d) => [d.id, d]));
}
