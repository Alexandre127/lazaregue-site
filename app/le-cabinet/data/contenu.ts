/*
 * Contenu de la page « Le cabinet ».
 *
 * Les données rédactionnelles et le maillage sont réunis ici pour que le jour
 * où la page Escroquerie et fraude sera publiée (branche non encore fusionnée),
 * il n'y ait qu'un seul endroit à corriger — voir docs/bascule-domaine-vercel.md.
 */

import { MEMBRES } from "@/lib/equipe";

/* HERO — grille de quatre faits. */
export const FAITS: { chiffre: string; libelle: string }[] = [
  { chiffre: "2016", libelle: "Création du cabinet" },
  { chiffre: "5", libelle: "Trois avocats et deux intervenants techniques" },
  {
    chiffre: "Portail",
    libelle: "Votre dossier consultable en ligne dès son ouverture",
  },
  { chiffre: "France", libelle: "Paris, et intervention sur tout le territoire" },
];

/*
 * DOSSIERS — section 2. Récits PROVISOIRES : ils attendent la validation du
 * cabinet (cf. commentaire dans Dossiers.tsx). Le lien de la carte « Fraude »
 * pointe provisoirement vers Cybercriminalité : la page Escroquerie et fraude
 * n'est pas encore fusionnée (docs/bascule-domaine-vercel.md).
 */
export const DOSSIERS: {
  eyebrow: string;
  titre: string;
  corps: string;
  lien: { href: string; label: string };
}[] = [
  {
    eyebrow: "Contentieux IT",
    titre: "Projet informatique paralysé, contrats imbriqués",
    corps:
      "Une entreprise subit l'échec de son système d'information alors que coexistent le contrat du prestataire, celui de maintenance et ceux de plusieurs financeurs. Le cabinet a reconstitué l'économie de l'opération, rapproché les obligations techniques de chaque contrat et organisé la preuve en vue du contentieux.",
    lien: { href: "/nos-domaines/contrats-informatiques", label: "Contrats et projets IT" },
  },
  {
    eyebrow: "Fraude",
    titre: "Fraude numérique et responsabilité bancaire",
    corps:
      "À la suite d'une série d'opérations orientées vers des plateformes d'actifs numériques, le cabinet a reconstitué le parcours des fonds et distingué les opérations autorisées des anomalies susceptibles d'engager la responsabilité des prestataires de services de paiement.",
    // Provisoire : à rebrancher vers /nos-domaines/avocat-escroquerie-fraude à la fusion.
    lien: { href: "/nos-domaines/cybercriminalite", label: "Cybercriminalité et fraudes" },
  },
  {
    eyebrow: "Contenus en ligne",
    titre: "Contenus dommageables maintenus en ligne",
    corps:
      "Face à des publications portant atteinte à une entreprise sur plusieurs services numériques, le cabinet a identifié les responsables, sécurisé les constats, puis coordonné les demandes de retrait, le déréférencement et l'action contentieuse.",
    lien: {
      href: "/nos-domaines/diffamation-retrait-de-contenus",
      label: "Diffamation et retrait de contenus",
    },
  },
];

/* ÉQUIPE — cinq intervenants, même format. Les photos viennent de lib/equipe. */
type LigneMeta = { dt: string; dd: string };
export type Intervenant = {
  slug: keyof typeof MEMBRES;
  /** Œil-de-bœuf (DM Mono). */
  eyebrow: string;
  accentEyebrow?: boolean;
  /** Nom affiché en Bebas (sans « Me », usage d'en-tête de fiche). */
  nom: string;
  bio: string;
  meta: LigneMeta[];
  /** Intervenants techniques uniquement. */
  statut?: string;
  /** Lien « en savoir plus ». Externe pour les intervenants techniques. */
  lien?: { href: string; label: string; externe?: boolean };
  tech?: boolean;
};

export const EQUIPE: Intervenant[] = [
  {
    slug: "alexandre",
    eyebrow: "Fondateur · avocat au barreau de Paris",
    nom: "Alexandre Lazarègue",
    bio: "Fondateur du cabinet en 2016, il intervient depuis plus de dix ans dans les contentieux liés aux plateformes, aux cyberfraudes, aux données personnelles et à la propriété intellectuelle. Il pilote personnellement le suivi des dossiers.",
    meta: [
      {
        dt: "Intervient en",
        dd: "Contentieux des plateformes · cybersécurité · données personnelles · propriété intellectuelle",
      },
      { dt: "Modalités", dd: "Cabinet · visioconférence · correspondance écrite" },
      { dt: "Langues", dd: "Français · anglais" },
    ],
  },
  {
    slug: "amir",
    eyebrow: "Avocat au barreau de Paris · contentieux IT",
    nom: "Amir Ben Majed",
    bio: "Il intervient sur les litiges informatiques complexes : projets qui dérapent, responsabilité des prestataires, contentieux de la preuve technique — ces dossiers où le droit ne se départage qu'à condition de comprendre la machine.",
    meta: [
      { dt: "Intervient en", dd: "Contrats IT · contentieux IT · responsabilité" },
      { dt: "Modalités", dd: "Cabinet · visioconférence · correspondance écrite" },
      { dt: "Langues", dd: "Français · anglais" },
    ],
  },
  {
    slug: "sarah",
    eyebrow: "Avocate au barreau de Paris · données personnelles",
    nom: "Sarah Hinderer",
    bio: "Elle accompagne les entreprises sur la protection des données personnelles et les enjeux data des opérations et des levées de fonds — de la cartographie des traitements jusqu'à la due diligence. Elle traite le RGPD comme un système de preuve.",
    meta: [
      { dt: "Intervient en", dd: "RGPD · données · due diligence" },
      { dt: "Modalités", dd: "Cabinet · visioconférence · correspondance écrite" },
      { dt: "Langues", dd: "Français · anglais" },
    ],
  },
  {
    slug: "nadia",
    // Sur cette page, l'intitulé « expert » est retenu (addendum au brief) : la
    // convention de lib/equipe est écartée ICI. Le titre universitaire est un
    // élément vérifiable, signal fort de la fiche.
    eyebrow: "Experte en intelligence artificielle",
    accentEyebrow: true,
    tech: true,
    nom: "Nadia Abchiche-Mimouni",
    bio: "Docteure en intelligence artificielle et maître de conférences à Nice Sophia Antipolis, elle évalue l'architecture technique des systèmes, leurs jeux de données, leur supervision et leurs biais. Sur un dossier IA, elle établit ce que le système fait réellement — avant que le droit ne dise ce qu'il vaut.",
    meta: [
      { dt: "Intervient en", dd: "Dossiers IA et AI Act · qualification de systèmes · expertises" },
      { dt: "Modalités", dd: "Mobilisée selon les besoins du dossier" },
    ],
    statut: "N'exerce pas la profession d'avocat.",
    lien: {
      href: "https://webusers.i3s.unice.fr/~abchiche/",
      label: "Sa page universitaire",
      externe: true,
    },
  },
  {
    slug: "khalid",
    // « Expert » retenu ICI (addendum) ; la ligne de statut « N'exerce pas la
    // profession d'avocat » lève la confusion avec l'expert judiciaire.
    eyebrow: "Expert en cybersécurité",
    accentEyebrow: true,
    tech: true,
    nom: "Khalid Sookia",
    bio: "Il intervient sur l'audit des systèmes d'information, les politiques de sécurité et l'investigation numérique. Sur un incident, il établit l'état réel du système et sécurise les traces — ce qui déterminera ce qui peut être démontré.",
    meta: [
      { dt: "Intervient en", dd: "Incidents cyber · NIS 2 · preuve numérique · contentieux techniques" },
      { dt: "Modalités", dd: "Mobilisé selon les besoins du dossier" },
    ],
    statut: "N'exerce pas la profession d'avocat.",
    lien: {
      href: "https://www.kinsa.fr/cybersecurite.html",
      label: "Son activité",
      externe: true,
    },
  },
];

/* ENGAGEMENTS — six, à l'affirmative. */
export const ENGAGEMENTS: { titre: string; corps: string }[] = [
  {
    titre: "Une réponse sous un jour ouvré",
    corps:
      "Chaque demande reçoit une réponse dans ce délai, y compris pour dire que nous avons besoin de plus de temps pour l'examiner.",
  },
  {
    titre: "Un avis franc, y compris quand il vous déplaît",
    corps:
      "Si l'action n'en vaut pas le coût, si vos chances sont faibles ou si votre situation sort de nos domaines, nous vous le disons — et nous vous orientons vers qui la traitera mieux que nous.",
  },
  {
    titre: "Les options exposées avant l'action",
    corps:
      "Votre situation, les voies ouvertes, leurs conséquences pratiques et des jalons réalistes, expliqués en langage clair avant toute décision.",
  },
  {
    titre: "Aucune dépense engagée sans votre accord",
    corps:
      "Si le dossier évolue et que le budget doit bouger, vous l'apprenez avant, jamais sur la facture.",
  },
  {
    titre: "Un avocat identifié du début à la fin",
    corps:
      "Vous savez qui conduit votre dossier, et vous êtes informé si cette personne devait changer.",
  },
  {
    titre: "L'avancement visible sans avoir à le demander",
    corps:
      "Votre portail montre à tout moment l'étape en cours, les diligences accomplies et les prochaines échéances.",
  },
];

/*
 * DOMAINES — « Entrer par votre situation ». SEPT entrées : la maquette en
 * comptait huit, « Escroquerie et fraude » a été retirée (page non fusionnée),
 * pour rester aligné sur le pied de page global et le menu. À rétablir à la
 * fusion — docs/bascule-domaine-vercel.md.
 */
export const DOMAINES: { href: string; label: string }[] = [
  { href: "/nos-domaines/contrats-informatiques", label: "Contentieux informatique et projets IT" },
  { href: "/nos-domaines/cybersecurite", label: "Cybersécurité et incidents" },
  { href: "/nos-domaines/rgpd-donnees", label: "RGPD et protection des données" },
  { href: "/nos-domaines/ia-act", label: "Intelligence artificielle et AI Act" },
  { href: "/nos-domaines/cybercriminalite", label: "Cybercriminalité et atteintes aux systèmes" },
  { href: "/nos-domaines/diffamation-retrait-de-contenus", label: "Diffamation et retrait de contenus" },
  { href: "/competences/ma-tech", label: "M&A tech et due diligence" },
];

/* PORTAIL — points et reproduction d'interface. */
export const PORTAIL_POINTS: { titre: string; suite: string }[] = [
  { titre: "Avancement en temps réel", suite: "l'étape en cours, ce qui est fait, ce qui reste à faire." },
  { titre: "Diligences détaillées", suite: "chaque action tracée et datée." },
  { titre: "Prochaines échéances", suite: "les jalons, mis à jour au fil du dossier." },
  { titre: "Suivi du budget", suite: "les diligences engagées et leur incidence au regard du cadre convenu." },
  { titre: "Documents et messagerie", suite: "vos pièces et vos échanges, réunis et sécurisés." },
];

export const PORTAIL_STEPS: { libelle: string; etat: string; on?: boolean }[] = [
  { libelle: "Assignation en référé déposée", etat: "12 mars · fait" },
  { libelle: "Constitution du dossier de preuve", etat: "en cours", on: true },
  { libelle: "Audience de mise en état", etat: "à venir · 4 avr." },
  { libelle: "6 pièces · mise à jour aujourd'hui", etat: "démonstration" },
];

/*
 * CONTRIBUTIONS — quatre cases à l'état de gabarit. Mentions « à renseigner »
 * CONSERVÉES : ces éléments attendent les données réelles du cabinet (brief).
 */
export const CONTRIBUTIONS: { titre: string; corps: string; todo: string }[] = [
  {
    titre: "Publications",
    corps: "Contributions en revue juridique et articles de doctrine.",
    todo: "à renseigner : titres et revues",
  },
  {
    titre: "Ouvrage",
    corps: "Essai consacré à la victime numérique.",
    todo: "à renseigner : titre et éditeur",
  },
  {
    titre: "Interventions publiques",
    corps: "Conférences, colloques et interventions dans les médias.",
    todo: "à renseigner : trois références",
  },
  {
    titre: "Associations professionnelles",
    corps: "Appartenances aux organisations de la matière.",
    todo: "à renseigner : ADIJ, Cyberlex, AFDIT, AFCDP ?",
  },
];
