/**
 * Experts techniques indépendants.
 *
 * IMPORTANT : ils n'exercent pas la profession d'avocat. Leur traitement
 * graphique est volontairement distinct de celui des avocats — cette
 * distinction est juridiquement nécessaire, ne pas l'aligner sur `MembreCard`.
 */

export type Expert = {
  slug: string;
  nom: string;
  monogramme: string;
  role: string;
  photo: string | null;
  texte: string;
  faits: { cle: string; valeur: string }[];
  tags: string[];
};

export const EXPERTS: Expert[] = [
  {
    slug: "nadia-abchiche-mimouni",
    nom: "Nadia Abchiche-Mimouni",
    monogramme: "NA",
    role: "docteure en ia · éthique algorithmique",
    photo: "/images/nadia-abchiche.png",
    texte:
      "Évalue l'architecture technique des systèmes d'intelligence artificielle, leurs biais et leurs impacts. Sur un dossier IA, elle établit ce que le système fait réellement — avant que le droit ne dise ce qu'il vaut.",
    faits: [
      {
        cle: "intervient sur",
        valeur: "Dossiers IA & AI Act · qualification de systèmes · expertises",
      },
      { cle: "statut", valeur: "Experte indépendante, mobilisée selon les besoins du dossier" },
    ],
    tags: ["IA", "éthique algorithmique", "audit technique"],
  },
  {
    slug: "khalid-sookia",
    nom: "Khalid Sookia",
    monogramme: "KS",
    role: "expert en cybersécurité",
    photo: "/images/khalid-sookia.png",
    texte:
      "Intervient sur l'audit des systèmes d'information, les politiques de sécurité et l'investigation numérique. Sur un incident, il établit l'état réel du système et sécurise les traces — ce qui déterminera ce qui peut être démontré.",
    faits: [
      {
        cle: "intervient sur",
        valeur: "Incidents cyber · NIS 2 · contentieux techniques · preuve numérique",
      },
      { cle: "statut", valeur: "Expert indépendant, mobilisé selon les besoins du dossier" },
    ],
    tags: ["audit SI", "PSSI", "forensic"],
  },
];
