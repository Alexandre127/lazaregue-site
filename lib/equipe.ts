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

export const MEMBRES: Record<string, Membre> = {
  alexandre: {
    slug: "alexandre",
    nom: "Me Alexandre Lazarègue",
    statut: "Avocat à la Cour d'appel de Paris",
    avocat: true,
    photo: "/images/alexandre-pro.jpg",
  },
  amir: {
    slug: "amir",
    nom: "Me Amir Ben Majed",
    statut: "Avocat à la Cour d'appel de Paris",
    avocat: true,
    photo: "/images/amir-pro.jpg",
  },
  sarah: {
    slug: "sarah",
    nom: "Me Sarah Hinderer",
    statut: "Avocate à la Cour d'appel de Paris",
    avocat: true,
    photo: "/images/sarah-pro.jpg",
  },
  khalid: {
    slug: "khalid",
    nom: "Khalid Sookia",
    statut: "Expert indépendant — cybersécurité",
    avocat: false,
    photo: "/images/khalid-pro.jpg",
  },
  nadia: {
    slug: "nadia",
    nom: "Nadia Abchiche-Mimouni",
    statut: "Experte indépendante — docteure en IA",
    avocat: false,
    photo: "/images/nadia-pro.jpg",
  },
};
