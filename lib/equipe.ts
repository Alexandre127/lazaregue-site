/**
 * Source unique de l'équipe.
 *
 * Les pages de domaine affichaient chacune leur propre liste — parfois avec
 * des initiales au lieu des photos, parfois sans bloc du tout. Un changement
 * de portrait ou d'intitulé devait alors être répercuté à la main partout.
 * Tout part désormais d'ici ; les pages ne choisissent que les personnes
 * concernées et les mots-clés propres au domaine.
 */

export type Membre = {
  /** Identifiant court utilisé par les pages. */
  slug: string;
  /** Nom affiché — les avocats portent « Me », conformément à l'usage. */
  nom: string;
  /** Qualité professionnelle, dans les termes du barreau. */
  statut: string;
  /** Vrai pour un avocat inscrit, faux pour un intervenant extérieur.
   *  Le RIN interdit d'entretenir la confusion entre les deux. */
  avocat: boolean;
  photo: string;
  /** Cadrage, quand le sujet n'est pas centré dans la photo. */
  position?: string;
};

/**
 * Libellé centralisé du barreau de Me Amir Ben Majed. Me Ben Majed exerce comme
 * AVOCAT PARTENAIRE au barreau d'Évry (Essonne). Toute page, donnée structurée,
 * title ou description qui mentionne son barreau reprend cette constante : un
 * seul endroit à modifier. La variante « (Essonne) » se compose à partir d'ici.
 */
export const AMIR_BARREAU = "Avocat partenaire au barreau d'Évry";

export const MEMBRES: Record<string, Membre> = {
  alexandre: {
    slug: "alexandre",
    nom: "Me Alexandre Lazarègue",
    statut: "Avocat au barreau de Paris",
    avocat: true,
    photo: "/images/alexandre-pro.jpg",
  },
  amir: {
    slug: "amir",
    nom: "Me Amir Ben Majed",
    // Me Ben Majed est avocat PARTENAIRE au barreau d'Évry (Essonne), non à celui
    // de Paris. Libellé centralisé dans AMIR_BARREAU (ci-dessus) ; la reprise se
    // propage aux pages qui affichent ce membre (crypto-actifs, cybercriminalité…).
    statut: `${AMIR_BARREAU} (Essonne)`,
    avocat: true,
    photo: "/images/amir-pro.jpg",
  },
  sarah: {
    slug: "sarah",
    nom: "Me Sarah Hinderer",
    statut: "Avocate aux barreaux de Paris et de Montréal",
    avocat: true,
    // Photo unique de Sarah : celle de la page d'accueil, appliquée partout.
    photo: "/images/equipe/sarah-hinderer.webp",
    position: "center top",
  },
  khalid: {
    slug: "khalid",
    nom: "Khalid Sookia",
    // Intitulé « consultant technique » plutôt qu'« expert » : le mot « expert »
    // prête à confusion avec la qualité d'expert judiciaire, particulièrement
    // sur les pages qui traitent de l'expertise judiciaire informatique.
    statut: "Consultant technique en cybersécurité",
    avocat: false,
    photo: "/images/khalid-pro.jpg",
  },
  nadia: {
    slug: "nadia",
    nom: "Nadia Abchiche-Mimouni",
    statut: "Docteure en intelligence artificielle",
    avocat: false,
    photo: "/images/nadia-pro.jpg",
  },
};
