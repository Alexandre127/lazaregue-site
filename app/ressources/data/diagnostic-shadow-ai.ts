/**
 * Autodiagnostic Shadow AI — CONTENU UNIQUE de l'outil (/ressources/diagnostic-shadow-ai).
 *
 * Tout ce qui s'affiche ou se calcule vit ICI : textes des cinq écrans,
 * questions, barème et seuils, chantiers et leurs statuts, dates du calendrier
 * de l'AI Act et montants des sanctions. Les composants
 * (app/ressources/_components/diagnostic-shadow-ai/) ne font que lire ce fichier.
 *
 * Conventions :
 *  - `{n}` dans un texte est remplacé par le nombre de chantiers affichés
 *    (en toutes lettres, voir NOMBRES) ;
 *  - un statut `null` masque le chantier : il n'est ni affiché ni compté ;
 *  - les dates sont au format ISO ; « en vigueur » est calculé d'après la date
 *    du jour dans le navigateur.
 *
 * Aucune réponse ne quitte le navigateur : pas d'envoi, pas de cookie, pas de
 * stockage local. Seuls trois événements de mesure partent dans le dataLayer
 * (voir EVENEMENTS), sans aucune réponse.
 */

export type Reponse = "oui" | "non" | "nsp";

export const LIBELLES_REPONSES: { valeur: Reponse; libelle: string }[] = [
  { valeur: "oui", libelle: "Oui" },
  { valeur: "non", libelle: "Non" },
  { valeur: "nsp", libelle: "Je ne sais pas" },
];

/* ------------------------------------------------------------------ axes */

export type AxeId = "usages" | "donnees" | "encadrement" | "reglementaire";

export const AXES: { id: AxeId; numero: string; libelle: string; badge: string }[] = [
  { id: "usages", numero: "01", libelle: "Usages des outils d'IA", badge: "usages" },
  { id: "donnees", numero: "02", libelle: "Données confiées aux outils", badge: "données" },
  { id: "encadrement", numero: "03", libelle: "Encadrement interne", badge: "encadrement" },
  { id: "reglementaire", numero: "04", libelle: "Risques réglementaires", badge: "réglementaire" },
];

/* ------------------------------------------------------------- questions */

export type Question = {
  id: string;
  axe: AxeId;
  intitule: string;
  aide?: string;
  pourquoi: string;
  /** Réponse qui expose l'entreprise (2 points) ; l'autre réponse est protectrice (0). */
  exposante: "oui" | "non";
};

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axe: "usages",
    intitule: "Des salariés utilisent-ils des outils d'IA grand public (ChatGPT, Gemini, Copilot…) avec un compte personnel ?",
    pourquoi:
      "Un compte personnel échappe aux contrats et aux réglages de l'entreprise : elle ne maîtrise ni la conservation ni la réutilisation des informations saisies.",
    exposante: "oui",
  },
  {
    id: "q2",
    axe: "usages",
    intitule: "Existe-t-il un inventaire des outils d'IA utilisés dans l'entreprise ?",
    pourquoi:
      "L'AI Act fait dépendre les obligations du niveau de risque de chaque usage. Sans inventaire, impossible de les qualifier.",
    exposante: "non",
  },
  {
    id: "q3",
    axe: "donnees",
    intitule: "Des informations confidentielles (secrets d'affaires, code source, contrats) sont-elles saisies dans ces outils ?",
    pourquoi:
      "Le secret des affaires n'est protégé que si l'entreprise prend des mesures raisonnables pour le préserver (C. com., art. L. 151-1). Le confier à un outil externe non maîtrisé peut fragiliser cette protection.",
    exposante: "oui",
  },
  {
    id: "q4",
    axe: "donnees",
    intitule: "Des salariés saisissent-ils des données personnelles de clients ou de collègues dans ces outils ?",
    aide: "Noms, adresses e-mail, CV, extraits de dossiers clients, comptes rendus d'entretien…",
    pourquoi:
      "Confier des données personnelles à un outil d'IA est un traitement au sens du RGPD. L'entreprise doit en connaître la finalité, le fournisseur et le lieu d'hébergement, et pouvoir le justifier.",
    exposante: "oui",
  },
  {
    id: "q5",
    axe: "encadrement",
    intitule: "Une charte ou une règle écrite encadre-t-elle l'usage de l'IA ?",
    pourquoi:
      "Une règle écrite fixe ce qui est permis. Pour être opposable aux salariés, une note portant des prescriptions générales et permanentes suit le régime du règlement intérieur (C. trav., art. L. 1321-5).",
    exposante: "non",
  },
  {
    id: "q6",
    axe: "encadrement",
    intitule: "Les équipes ont-elles été formées à l'usage de l'IA ?",
    pourquoi:
      "Depuis le 2 février 2025, l'article 4 de l'AI Act impose aux entreprises qui utilisent des systèmes d'IA de prendre des mesures pour assurer la maîtrise de l'IA par leur personnel.",
    exposante: "non",
  },
  {
    id: "q7",
    axe: "encadrement",
    intitule: "Des outils d'IA échangent-ils avec vos clients ou produisent-ils des contenus publiés (chatbot, images, textes) ?",
    pourquoi:
      "L'article 50 de l'AI Act impose des obligations de transparence : les personnes doivent savoir qu'elles échangent avec une IA, et certains contenus générés (hypertrucages, textes publiés pour informer le public) doivent être signalés. Elles s'appliquent depuis le 2 août 2026.",
    exposante: "oui",
  },
  {
    id: "q8",
    axe: "reglementaire",
    intitule: "L'IA intervient-elle dans le recrutement ou l'évaluation des salariés ?",
    pourquoi:
      "Ces usages sont classés à haut risque (AI Act, annexe III, point 4). L'entreprise qui les utilise aura des obligations propres (art. 26) à compter du 2 décembre 2027.",
    exposante: "oui",
  },
  {
    id: "q9",
    axe: "reglementaire",
    intitule: "Les conditions des fournisseurs d'IA (réutilisation des données, hébergement) ont-elles été vérifiées ?",
    pourquoi:
      "Le fournisseur qui traite des données pour le compte de l'entreprise doit être lié par un contrat conforme à l'article 28 du RGPD. Les transferts hors de l'Union sont encadrés par le chapitre V.",
    exposante: "non",
  },
  {
    id: "q10",
    axe: "reglementaire",
    intitule: "Une procédure prévoit-elle la réaction en cas de fuite de données par un outil d'IA ?",
    pourquoi:
      "Une violation de données personnelles doit, sauf risque improbable, être notifiée à la CNIL dans les 72 heures (RGPD, art. 33).",
    exposante: "non",
  },
];

/* ---------------------------------------------------------------- barème */

export const BAREME = { exposante: 2, nsp: 1, protectrice: 0 } as const;

export type NiveauId = "limitee" | "reelle" | "elevee";

/** Seuils sur 20, bornes incluses, du plus faible au plus fort. */
export const NIVEAUX: { id: NiveauId; min: number; max: number; titre: string; repere: string; synthese: string }[] = [
  {
    id: "limitee",
    min: 0,
    max: 6,
    titre: "Exposition limitée",
    repere: "limitée",
    synthese: "Votre encadrement est engagé. {n} chantiers restent à vérifier au regard de l'AI Act et du RGPD.",
  },
  {
    id: "reelle",
    min: 7,
    max: 13,
    titre: "Exposition réelle",
    repere: "réelle",
    synthese: "Des bases existent, mais des usages restent hors de contrôle. Vos réponses font apparaître {n} chantiers de mise en conformité.",
  },
  {
    id: "elevee",
    min: 14,
    max: 20,
    titre: "Exposition élevée",
    repere: "élevée",
    synthese:
      "Vos équipes utilisent l'IA sans cadre suffisant. Vos réponses font apparaître {n} chantiers de mise en conformité au titre de l'AI Act, du RGPD et du code du travail.",
  },
];

/** Nombre de chantiers écrit en toutes lettres (de 7 à 11 selon les réponses). */
export const NOMBRES: Record<number, string> = {
  1: "un", 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six",
  7: "sept", 8: "huit", 9: "neuf", 10: "dix", 11: "onze", 12: "douze",
};

/* -------------------------------------------------------------- chantiers */

/** Apparence du badge : « kit » (vert clair), « verifier » (bleu clair), « plein » (bleu, texte blanc). */
export type StyleStatut = "kit" | "verifier" | "plein";

export const STYLE_STATUT: Record<string, StyleStatut> = {
  "kit gratuit": "kit",
  "à vérifier": "verifier",
};
/** Tout statut absent de STYLE_STATUT prend ce style. */
export const STYLE_STATUT_DEFAUT: StyleStatut = "plein";

export type Chantier = {
  id: string;
  intitule: string;
  reference: string;
  /** Statut fixe, quelles que soient les réponses. */
  toujours?: string;
  /** Statut selon la réponse à une question ; `null` = chantier masqué. */
  selon?: { question: string; oui: string | null; non: string | null; nsp: string | null };
};

export const CHANTIERS: Chantier[] = [
  { id: "c1", intitule: "Charte d'usage de l'IA", reference: "règlement intérieur, information des salariés", toujours: "kit gratuit" },
  { id: "c2", intitule: "Inventaire des outils et des usages", reference: "la grille recense, elle ne qualifie pas", toujours: "kit gratuit" },
  { id: "c3", intitule: "Qualifier chaque usage par niveau de risque", reference: "AI Act, art. 6 et annexe III", toujours: "analyse" },
  { id: "c4", intitule: "Écarter les pratiques interdites", reference: "AI Act, art. 5 · depuis le 2 févr. 2025", toujours: "analyse" },
  {
    id: "c5",
    intitule: "Mesures de maîtrise de l'IA pour le personnel",
    reference: "AI Act, art. 4 · depuis le 2 févr. 2025",
    selon: { question: "q6", oui: "à documenter", non: "à organiser", nsp: "à vérifier" },
  },
  {
    id: "c6",
    intitule: "Transparence envers clients et public",
    reference: "AI Act, art. 50 · depuis le 2 août 2026",
    selon: { question: "q7", oui: "analyse", non: null, nsp: "à vérifier" },
  },
  {
    id: "c7",
    intitule: "Obligations du déployeur d'IA à haut risque",
    reference: "AI Act, art. 26 · 2 déc. 2027",
    selon: { question: "q8", oui: "analyse", non: "à vérifier", nsp: "à vérifier" },
  },
  {
    id: "c8",
    intitule: "Analyse d'impact sur les données",
    reference: "RGPD, art. 35, selon les usages",
    selon: { question: "q4", oui: "analyse", non: null, nsp: "à vérifier" },
  },
  {
    id: "c9",
    intitule: "Contrats et transferts des fournisseurs d'IA",
    reference: "RGPD, art. 28 et chapitre V",
    selon: { question: "q9", oui: null, non: "audit", nsp: "à vérifier" },
  },
  { id: "c10", intitule: "Consultation du CSE", reference: "C. trav., art. L. 2312-8 · dès 50 salariés", toujours: "à vérifier" },
  {
    id: "c11",
    intitule: "Procédure en cas de fuite de données",
    reference: "RGPD, art. 33 · notification sous 72 h",
    selon: { question: "q10", oui: null, non: "à rédiger", nsp: "à vérifier" },
  },
];

/** Chantiers couverts par le kit gratuit (charte + grille d'inventaire). */
export const KIT = { couverts: 2, legende: "charte · inventaire" };

/* --------------------------------------------------- calendrier, sanctions */

export const CALENDRIER: { date: string; libelle: string; texte: string }[] = [
  { date: "2025-02-02", libelle: "2 févr. 2025", texte: "Pratiques interdites, maîtrise de l'IA par le personnel" },
  { date: "2026-08-02", libelle: "2 août 2026", texte: "Transparence des systèmes d'IA (art. 50)" },
  { date: "2027-12-02", libelle: "2 déc. 2027", texte: "Systèmes à haut risque de l'annexe III : recrutement, évaluation des salariés, crédit…" },
];

export const SANCTIONS: { montant: string; texte: string }[] = [
  { montant: "35 M€ · 7 %", texte: "du chiffre d'affaires mondial, pratiques interdites" },
  { montant: "15 M€ · 3 %", texte: "autres obligations, dont celles du déployeur" },
];

/* ------------------------------------------------------------------ textes */

export const TEXTES = {
  presentation: {
    label: "gouvernance de l'ia",
    titre: "Votre entreprise est-elle exposée au shadow AI ?",
    texte: "Dix questions pour situer les usages d'IA non encadrés dans votre entreprise et savoir par où commencer.",
    reperes: [
      { valeur: "10", libelle: "questions" },
      { valeur: "4", libelle: "axes" },
      { valeur: "0", libelle: "inscription" },
    ],
    titreAxes: "les quatre axes évalués",
    bouton: "Commencer le diagnostic",
    mention: "Résultat indicatif, qui ne constitue pas une consultation juridique. Les réponses restent dans votre navigateur.",
  },
  question: {
    outil: "autodiagnostic shadow ai",
    compteur: "question", // « question 04 / 10 »
    axe: "axe", // « axe 02 · données »
    pourquoi: "pourquoi cette question",
    retour: "Retour",
    suivant: "Suivant",
    quitter: "Quitter",
  },
  resultat: {
    label: "votre résultat",
    titreKit: "ce que le kit gratuit couvre",
    legendeKit: "{c} chantiers sur {t}", // {c} couverts, {t} total affiché
    texteKit:
      "La charte et la grille posent le cadre. Elles ne disent pas quels usages sont interdits, lesquels sont à haut risque, ni ce que chacun impose à l'entreprise.",
    bouton: "Voir les {n} chantiers ↓",
  },
  chantiers: {
    label: "vos chantiers de conformité",
    titre: "Ce que la réglementation exige, selon vos réponses",
    bouton: "Faire qualifier vos usages",
  },
  rendezVous: {
    labelCalendrier: "calendrier",
    enVigueur: "en vigueur",
    labelSanctions: "sanctions maximales · ai act, art. 99",
    titre: "Faire qualifier vos usages",
    texte:
      "Un avocat et une intervenante technique examinent vos usages d'IA, les classent par niveau de risque et fixent les obligations qui s'appliquent à votre entreprise.",
    bouton: "Échanger avec un avocat",
    lienBouton: "/contact",
    telephone: { avant: "ou", affiche: "01 81 70 62 00", href: "tel:+33181706200" },
    seul: { avant: "Commencer seul :", lien: "télécharger la charte et la grille", href: "/ressources/shadow-ai#kit" },
    mention: "Résultat indicatif, qui ne constitue pas une consultation juridique.",
  },
};

/* ------------------------------------------------------- mesure d'audience */

/** Seuls événements poussés dans le dataLayer (aucune réponse transmise). */
export const EVENEMENTS = {
  debut: "diagnostic_start",
  fin: "diagnostic_complete", // paramètre unique : niveau
  rendezVous: "diagnostic_cta_rdv",
} as const;
