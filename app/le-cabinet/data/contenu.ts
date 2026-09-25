/*
 * Contenu de la page « Le cabinet ».
 *
 * Reconstruction fidèle de la maquette de référence (cabinet@1x, sept. 2026) :
 * hero clair, repères, équipe (avocats + intervenants techniques), méthode,
 * exemple de décision, engagements, domaines, portail, honoraires, démarrage,
 * contact. Les biographies, le maillage et les liens externes proviennent des
 * données validées du cabinet (lib/equipe + arbitrages des pages de domaine),
 * pas des textes « à préciser » restés à l'état de gabarit dans la maquette.
 */

/* ------------------------------------------------------------------ HERO */
export const HERO = {
  eyebrow: "Le cabinet",
  titre1: "Le cabinet Lazarègue ",
  titreAccent: "Avocats",
  accroche1: "Vous ne venez pas chercher une procédure.",
  accroche2: "Vous venez chercher une issue.",
  intro1:
    "Cabinet d'avocats en droit du numérique à Paris, Lazarègue Avocats accompagne les PME, les ETI et leurs dirigeants dans leurs projets technologiques, leurs obligations de conformité, leurs situations de crise et leurs contentieux.",
  intro2:
    "Le cabinet associe analyse juridique, compréhension des faits techniques et prise en compte des enjeux opérationnels pour proposer une stratégie lisible, proportionnée et directement exploitable.",
  photoLegende: "Photographie collective — équipe au cabinet",
};

/* Repères — bandeau de quatre faits sous le hero. */
export const REPERES: { k: string; label: string }[] = [
  { k: "2016", label: "Année de fondation du cabinet" },
  { k: "Paris · Évry · Montréal", label: "Barreaux d'inscription des avocats" },
  { k: "Partout en France", label: "Zone d'intervention" },
  { k: "Suivi en ligne", label: "Espace client dédié à chaque dossier" },
];

/* ---------------------------------------------------------------- ÉQUIPE */
type LigneMeta = { dt: string; dd: string };
export type Membre = {
  slug: "alexandre" | "amir" | "sarah" | "nadia" | "khalid";
  eyebrow: string;
  nom: string;
  bio: string;
  /** « Intervient en » éclaté en pastilles. */
  domaines: string[];
  meta: LigneMeta[];
  /** Intervenants techniques uniquement. */
  statut?: string;
  lien?: { href: string; label: string; externe?: boolean };
};

export const EQUIPE_INTRO_1 =
  "Les dossiers sont suivis par des avocats identifiés. Lorsque la situation l'exige, le cabinet s'appuie sur des compétences techniques complémentaires, sans diluer la responsabilité du suivi juridique.";
export const EQUIPE_INTRO_2 =
  "Le droit détermine la stratégie et la procédure. L'analyse technique établit ce qui s'est réellement produit et ce qui peut être démontré.";

export const AVOCATS: Membre[] = [
  {
    slug: "alexandre",
    eyebrow: "Fondateur · avocat au barreau de Paris",
    nom: "Alexandre Lazarègue",
    bio: "Fondateur du cabinet en 2016, il intervient depuis plus de dix ans dans les contentieux liés aux plateformes, aux cyberfraudes, aux données personnelles et à la propriété intellectuelle. Il pilote personnellement le suivi des dossiers.",
    domaines: [
      "Contentieux des plateformes",
      "Cybersécurité",
      "Données personnelles",
      "Propriété intellectuelle",
    ],
    meta: [
      { dt: "Modalités", dd: "Cabinet · visioconférence · correspondance écrite" },
      { dt: "Langues", dd: "Français · anglais" },
    ],
  },
  {
    slug: "amir",
    eyebrow: "Avocat au barreau de l'Essonne · contentieux IT",
    nom: "Amir Ben Majed",
    bio: "Il intervient sur les litiges informatiques complexes : projets qui dérapent, responsabilité des prestataires, contentieux de la preuve technique — ces dossiers où le droit ne se départage qu'à condition de comprendre la machine.",
    domaines: ["Contrats IT", "Contentieux IT", "Responsabilité des prestataires"],
    meta: [
      { dt: "Modalités", dd: "Cabinet · visioconférence · correspondance écrite" },
      { dt: "Langues", dd: "Français · anglais" },
    ],
  },
  {
    slug: "sarah",
    eyebrow: "Avocate aux barreaux de Paris et de Montréal · données personnelles",
    nom: "Sarah Hinderer",
    bio: "Elle accompagne les entreprises sur la protection des données personnelles et les enjeux data des opérations et des levées de fonds — de la cartographie des traitements jusqu'à la due diligence. Elle traite le RGPD comme un système de preuve.",
    domaines: ["RGPD", "Protection des données", "Due diligence"],
    meta: [
      { dt: "Modalités", dd: "Cabinet · visioconférence · correspondance écrite" },
      { dt: "Langues", dd: "Français · anglais" },
    ],
  },
];

export const EXPERTS: Membre[] = [
  {
    slug: "khalid",
    eyebrow: "Consultant technique en cybersécurité",
    nom: "Khalid Sookia",
    bio: "Il intervient sur l'audit des systèmes d'information, les politiques de sécurité et l'investigation numérique. Sur un incident, il établit l'état réel du système et sécurise les traces — ce qui déterminera ce qui peut être démontré.",
    domaines: ["Incidents cyber", "NIS 2", "Preuve numérique", "Contentieux techniques"],
    meta: [{ dt: "Modalités", dd: "Mobilisé selon les besoins du dossier" }],
    statut: "Consultant technique en cybersécurité",
    lien: {
      href: "https://www.kinsa.fr/cybersecurite.html",
      label: "Son activité",
      externe: true,
    },
  },
  {
    slug: "nadia",
    eyebrow: "Docteure en intelligence artificielle",
    nom: "Nadia Abchiche-Mimouni",
    bio: "Docteure en intelligence artificielle et maître de conférences à Nice Sophia Antipolis, elle évalue l'architecture technique des systèmes, leurs jeux de données, leur supervision et leurs biais. Sur un dossier IA, elle établit ce que le système fait réellement — avant que le droit ne dise ce qu'il vaut.",
    domaines: ["Dossiers IA et AI Act", "Qualification de systèmes", "Expertise"],
    meta: [{ dt: "Modalités", dd: "Mobilisée selon les besoins du dossier" }],
    statut: "Docteure en intelligence artificielle",
    lien: {
      href: "https://webusers.i3s.unice.fr/~abchiche/",
      label: "Sa page universitaire",
      externe: true,
    },
  },
];

/* --------------------------------------------------------------- MÉTHODE */
export const METHODE: { n: string; titre: string; corps: string }[] = [
  {
    n: "01",
    titre: "Comprendre la situation",
    corps:
      "Identifier les faits, les acteurs, les documents disponibles, les contraintes opérationnelles et les échéances.",
  },
  {
    n: "02",
    titre: "Qualifier les enjeux",
    corps:
      "Distinguer les questions juridiques, techniques, économiques et probatoires afin d'éviter une lecture partielle du dossier.",
  },
  {
    n: "03",
    titre: "Définir la stratégie",
    corps:
      "Présenter les options, leurs conséquences, les coûts prévisibles et l'ordre dans lequel agir.",
  },
  {
    n: "04",
    titre: "Mettre en œuvre et suivre",
    corps:
      "Exécuter la stratégie retenue, rendre compte des avancées et réévaluer les choix lorsque la situation évolue.",
  },
];

/* ----------------------------------------------------------- ENGAGEMENTS */
export const ENGAGEMENTS: { titre: string; corps: string }[] = [
  {
    titre: "Un interlocuteur identifié",
    corps: "Vous savez qui suit votre dossier et à qui vous adresser.",
  },
  {
    titre: "Des réponses utilisables pour décider",
    corps:
      "Les règles juridiques sont traduites en options, risques, conséquences et recommandations.",
  },
  {
    titre: "Une stratégie expliquée avant d'être engagée",
    corps:
      "Les objectifs, les étapes et les arbitrages sont expliqués avant leur mise en œuvre.",
  },
  {
    titre: "Une visibilité sur les honoraires",
    corps:
      "Le mode de facturation et le périmètre de l'intervention sont définis avant le commencement de la mission.",
  },
  {
    titre: "Un suivi convenu dès le départ",
    corps:
      "Vous connaissez le prochain jalon, les éléments attendus et le moment auquel un nouveau point sera effectué.",
  },
  {
    titre: "La maîtrise de la confidentialité",
    corps:
      "Les documents, les accès et les échanges sont organisés selon la sensibilité du dossier. Les personnes qui interviennent et les outils utilisés sont identifiés.",
  },
];

/* -------------------------------------------------------------- DOMAINES
 * Dix domaines regroupés dans les trois familles de la page d'accueil.
 * Intitulés strictement identiques à ceux des menus (nav-data) et routes
 * réelles du site. */
export const DOMAINES_FAMILLES: {
  nom: string;
  items: { href: string; label: string }[];
}[] = [
  {
    nom: "Conformité et gouvernance",
    items: [
      { href: "/nos-domaines/rgpd-donnees-personnelles", label: "RGPD et données personnelles" },
      { href: "/nos-domaines/avocat-intelligence-artificielle", label: "Intelligence artificielle et AI Act" },
      { href: "/nos-domaines/cybersecurite", label: "Cybersécurité et NIS 2" },
    ],
  },
  {
    nom: "Contrats et opérations numériques",
    items: [
      { href: "/nos-domaines/contrats-informatiques", label: "Contrats informatiques" },
      { href: "/nos-domaines/ma-tech", label: "Fusions-acquisitions technologiques" },
      { href: "/nos-domaines/crypto-actifs-blockchain", label: "Crypto-actifs et blockchain" },
    ],
  },
  {
    nom: "Contentieux et atteintes numériques",
    items: [
      { href: "/nos-domaines/contentieux-informatique-commercial", label: "Contentieux informatique et commercial" },
      { href: "/nos-domaines/cybercriminalite", label: "Cyberattaques et cybercriminalité" },
      { href: "/nos-domaines/escroquerie-fraude-bancaire", label: "Fraude bancaire et escroquerie en ligne" },
      { href: "/nos-domaines/diffamation-retrait-contenus", label: "Diffamation et retrait de contenus" },
    ],
  },
];

/* ------------------------------------------------------------ HONORAIRES */
export const HONORAIRES_MODALITES: { titre: string; corps: string }[] = [
  {
    titre: "Forfait",
    corps: "Un montant convenu à l'avance, lorsque la mission peut être précisément définie.",
  },
  {
    titre: "Temps passé",
    corps:
      "Un taux horaire et des modalités de suivi précisés dans la convention, lorsque la mission ne se prête pas à un forfait.",
  },
  {
    titre: "Abonnement",
    corps: "Un accompagnement récurrent, pour les besoins juridiques suivis dans la durée.",
  },
];

export const HONORAIRES_PRINCIPES: string[] = [
  "Le mode d'honoraires est proposé avant tout engagement.",
  "Le périmètre de la mission est validé avant son commencement.",
  "Tout événement modifiant le coût prévu est signalé avant d'être engagé.",
  "Une estimation est toujours distinguée d'un engagement ferme.",
];

/* --------------------------------------------------- DÉMARRER UNE MISSION */
export const DEMARRAGE: { n: string; titre: string; corps: string }[] = [
  {
    n: "01",
    titre: "Premier échange",
    corps:
      "Nous précisons votre situation, votre objectif et son éventuel degré d'urgence.",
  },
  {
    n: "02",
    titre: "Proposition d'intervention",
    corps:
      "Vous recevez un périmètre de mission, le nom de l'avocat référent, les premières étapes et les modalités d'honoraires.",
  },
  {
    n: "03",
    titre: "Démarrage de la mission",
    corps: "Les documents utiles sont transmis et le premier jalon de suivi est convenu.",
  },
];
