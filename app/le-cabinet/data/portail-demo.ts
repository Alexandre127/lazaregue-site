/**
 * Données de DÉMONSTRATION du portail client.
 * Entièrement fictives — le badge « ● démonstration » doit rester affiché.
 */

export const PORTAIL_REF = "dossier #2026-0148";
export const PORTAIL_TITRE = "Contentieux plateforme — retrait de contenu";
export const PORTAIL_STATUT = "en cours";

export const PORTAIL_ONGLETS = [
  { id: "p-suivi", label: "suivi" },
  { id: "p-docs", label: "documents" },
  { id: "p-budget", label: "budget" },
  { id: "p-msg", label: "messages" },
] as const;

export type OngletId = (typeof PORTAIL_ONGLETS)[number]["id"];

/** Intervalle de défilement automatique des onglets (ms) */
export const AUTOPLAY_MS = 4200;

export const ETAPES = [
  { label: "analyse", etat: "done" as const },
  { label: "convention", etat: "done" as const },
  { label: "procédure", etat: "now" as const },
  { label: "audience", etat: "todo" as const },
  { label: "décision", etat: "todo" as const },
];

export const DILIGENCES = [
  { label: "Assignation en référé déposée", statut: "12 mars · fait", etat: "off" as const },
  { label: "Constitution du dossier de preuve", statut: "en cours", etat: "on" as const },
  { label: "Audience de mise en état", statut: "à venir · 4 avr.", etat: "pulse" as const },
];

export const DOCUMENTS = [
  { type: "PDF", label: "Assignation en référé", date: "12 mars" },
  { type: "PDF", label: "Constat d'huissier — captures", date: "9 mars" },
  { type: "PDF", label: "Convention d'honoraires signée", date: "4 mars" },
  { type: "+3", label: "Autres pièces du dossier", date: "maj auj." },
];

export const BUDGET = {
  libelle: "diligences engagées",
  montant: "3 200 € / 5 000 € HT convenus",
  /** Pourcentage de remplissage de la jauge */
  pct: 64,
  lignes: [
    { label: "Analyse & stratégie", valeur: "900 €" },
    { label: "Rédaction de l'assignation", valeur: "1 600 €" },
    { label: "Constitution des preuves", valeur: "700 €" },
  ],
  total: { label: "Engagé à ce jour", valeur: "3 200 € HT" },
};

export const MESSAGES = [
  {
    qui: "votre avocat · aujourd'hui",
    texte:
      "L'assignation a été déposée. Prochaine étape : l'audience de mise en état, prévue le 4 avril. Je reviens vers vous dès réception du calendrier.",
  },
  {
    qui: "vous · hier",
    texte:
      "Merci, tout est clair. Je vous transmets le dernier échange reçu de la plateforme.",
  },
];

export const PORTAIL_TAGS = ["6 pièces · maj aujourd'hui", "1 message non lu"];
