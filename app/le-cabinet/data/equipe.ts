/**
 * Les avocats du cabinet.
 * Textes validés (juridiquement et déontologiquement) — ne pas réécrire.
 *
 * PLACEHOLDER : les liens `linkedin` et `email` sont à renseigner.
 */

export type Fait = { cle: string; valeur: string };

export type Membre = {
  slug: string;
  prenom: string;
  nom: string;
  monogramme: string;
  role: string;
  photo: string | null;
  /** Inverse la colonne photo/texte (mise en page alternée) */
  reverse?: boolean;
  bio: string;
  /** Phrase d'approche, rendue en italique avec filet bleu */
  approche: string;
  faits: Fait[];
  linkedin: string | null;
  email: string | null;
};

export const AVOCATS: Membre[] = [
  {
    slug: "alexandre-lazaregue",
    prenom: "Alexandre",
    nom: "Lazarègue",
    monogramme: "AL",
    role: "fondateur · avocat au barreau de paris",
    photo: "/images/alexandre-pro.jpg",
    bio: "Fondateur du cabinet en 2016, avocat au Barreau de Paris, il intervient depuis plus de dix ans dans les contentieux liés aux plateformes, aux cyberfraudes, aux données personnelles et à la propriété intellectuelle. Il pilote personnellement le suivi des dossiers.",
    approche:
      "Sa méthode : expliquer avant d'agir, chiffrer avant d'engager, informer sans attendre qu'on le lui demande.",
    faits: [
      {
        cle: "intervient en",
        valeur:
          "Contentieux des plateformes · cybersécurité · données personnelles · propriété intellectuelle",
      },
      {
        cle: "interventions",
        valeur: "Rendez-vous au cabinet · visioconférence · correspondance écrite",
      },
      { cle: "langues", valeur: "Français · anglais" },
    ],
    linkedin: null,
    email: null,
  },
  {
    slug: "amir-ben-majed",
    prenom: "Amir",
    nom: "Ben Majed",
    monogramme: "AB",
    role: "avocat · contentieux it",
    photo: "/images/amir-pro.jpg",
    reverse: true,
    bio: "Amir Ben Majed intervient sur les litiges informatiques complexes : projets qui dérapent, responsabilité des prestataires, contentieux de la preuve technique — ces dossiers où le droit ne se départage qu'à condition de comprendre la machine.",
    approche:
      "Dans ces dossiers, la preuve technique fait souvent la différence : c'est là qu'il concentre le travail.",
    faits: [
      { cle: "domaines", valeur: "Contrats IT · contentieux IT · responsabilité" },
      { cle: "interventions", valeur: "Cabinet · visioconférence · correspondance écrite" },
      { cle: "langues", valeur: "Français · anglais" },
    ],
    linkedin: null,
    email: null,
  },
  {
    slug: "sarah-hinderer",
    prenom: "Sarah",
    nom: "Hinderer",
    monogramme: "SH",
    role: "avocate · données personnelles",
    photo: "/images/sarah-pro.jpg",
    bio: "Sarah Hinderer accompagne les entreprises sur la protection des données personnelles et les enjeux data des opérations et des levées de fonds — de la cartographie des traitements jusqu'à la due diligence.",
    approche:
      "Elle traite le RGPD comme un système de preuve : ce qui protège l'entreprise le jour d'un contrôle ou d'un litige.",
    faits: [
      { cle: "domaines", valeur: "RGPD · données · due diligence" },
      { cle: "interventions", valeur: "Cabinet · visioconférence · correspondance écrite" },
      { cle: "langues", valeur: "Français · anglais" },
    ],
    linkedin: null,
    email: null,
  },
];
