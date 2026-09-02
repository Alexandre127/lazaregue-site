/**
 * Les analyses du cabinet — « Le fil du cabinet ».
 *
 * Source unique de la page : filtres, compteurs et répartition éditoriale en
 * sont calculés. Les articles sont classés du plus récent au plus ancien.
 */

export const REGISTRES = [
  "Commentaire",
  "Texte nouveau",
  "Note de fond",
  "Chronique",
] as const;

export type Registre = (typeof REGISTRES)[number];

export type Analyse = {
  title: string;
  registre: Registre;
  domain: string;
  date: string;
  /** Pour le tri et l'attribut datetime */
  dateISO: string;
  read: string;
  excerpt: string;
  /** Illustration — seules les trois premières en ont une */
  img?: string;
  href: string;
};

export const AUTEUR = "Alexandre Lazarègue";

export const ANALYSES: Analyse[] = [
  {
    title: "L'AI Act, un droit de la preuve de la conformité ?",
    registre: "Note de fond",
    domain: "AI Act",
    date: "20 juil. 2026",
    dateISO: "2026-07-20",
    read: "22 min",
    excerpt:
      "Le règlement (UE) 2024/1689 n'exige pas que les systèmes soient sûrs, mais que leur sûreté puisse être démontrée. Qualification, rôles et charge documentaire avant le 2 août 2026.",
    href: "/blog/ai-act-preuve-conformite",
  },
  {
    title: "L'originalité ne se présume pas : la Cour de cassation resserre la vis",
    registre: "Commentaire",
    domain: "Propriété intellectuelle",
    date: "9 avr. 2026",
    dateISO: "2026-04-09",
    read: "8 min",
    img: "/images/analyses/analyses-originalite.jpg",
    excerpt:
      "Cass. 1re civ., 9 avr. 2026, n° 25-11.711 : le caractère créatif des choix doit être démontré, l'effet esthétique ne suffit plus.",
    href: "#",
  },
  {
    title: "AI Act : ce que l'entrée en vigueur des obligations GPAI change vraiment",
    registre: "Texte nouveau",
    domain: "AI Act",
    date: "2 avr. 2026",
    dateISO: "2026-04-02",
    read: "6 min",
    img: "/images/analyses/analyses-ai-act-gpai.jpg",
    excerpt:
      "Documentation technique, transparence, résumé des données d'entraînement : le calendrier, et qui doit être prêt.",
    href: "#",
  },
  {
    title: "Clause de réversibilité SaaS : l'argument qui ne prend plus",
    registre: "Chronique",
    domain: "Contrats",
    date: "24 mars 2026",
    dateISO: "2026-03-24",
    read: "5 min",
    img: "/images/analyses/analyses-contrat.jpg",
    excerpt:
      "À droit constant, ce qu'on voit se déplacer dans les négociations d'hébergement depuis dix-huit mois.",
    href: "#",
  },
  {
    title: "Contrefaçon logicielle : la charge de la preuve après l'arrêt SAS Institute",
    registre: "Commentaire",
    domain: "IP Software",
    date: "18 mars 2026",
    dateISO: "2026-03-18",
    read: "9 min",
    excerpt:
      "Ce que la décision juge, ce qu'elle laisse ouvert, et à partir de quand elle s'impose à vos contrats de licence.",
    href: "#",
  },
  {
    title: "Transferts hors UE : la CNIL précise les mesures supplémentaires",
    registre: "Texte nouveau",
    domain: "RGPD",
    date: "11 mars 2026",
    dateISO: "2026-03-11",
    read: "5 min",
    excerpt:
      "La position de l'autorité, traduite en obligations concrètes pour les responsables de traitement.",
    href: "#",
  },
  {
    title: "Le régime de responsabilité de l'IA générative — note de fond",
    registre: "Note de fond",
    domain: "AI Act",
    date: "3 mars 2026",
    dateISO: "2026-03-03",
    read: "18 min",
    excerpt:
      "Deux ou trois par an : l'analyse longue, sourcée, destinée à être citée. Ce que le cadre actuel permet, et ce qu'il ne règle pas.",
    href: "#",
  },
  {
    title: "Parasitisme : la frontière avec la libre concurrence se déplace",
    registre: "Commentaire",
    domain: "Concurrence",
    date: "26 fév. 2026",
    dateISO: "2026-02-26",
    read: "7 min",
    excerpt:
      "Une décision récente rebat les cartes sur la caractérisation du sillage économique.",
    href: "#",
  },
  {
    title: "Cybersquatting : l'UDRP face aux noms de domaine génératifs",
    registre: "Chronique",
    domain: "Marques",
    date: "17 fév. 2026",
    dateISO: "2026-02-17",
    read: "6 min",
    excerpt:
      "Une pratique de marché qui se déplace, observée à droit constant dans les dossiers de récupération.",
    href: "#",
  },
];

/**
 * Température éditoriale associée à chaque registre : elle signale au lecteur
 * s'il doit agir vite ou s'il consulte une référence.
 */
export const TEMPERATURE: Record<Registre, { label: string; plein: boolean }> = {
  "Texte nouveau": { label: "Urgent", plein: true },
  Commentaire: { label: "À suivre", plein: true },
  "Note de fond": { label: "Référence", plein: false },
  Chronique: { label: "Référence", plein: false },
};

/** Domaines présents, déduits des articles. */
export const DOMAINES = Array.from(new Set(ANALYSES.map((a) => a.domain)));
