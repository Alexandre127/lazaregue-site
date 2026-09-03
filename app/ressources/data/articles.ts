/**
 * Les articles de la page Ressources.
 *
 * Source unique de la page : les compteurs par domaine, le total, le
 * classement « les plus consultés » et les filtres en sont tous calculés.
 * Tu peux modifier titres, domaines, durées et résumés ici sans toucher au
 * code de la page.
 */

export type Article = {
  title: string;
  domain: Domain;
  /** Durée de lecture, ex. « 6 min » */
  read: string;
  /** Sert uniquement à ordonner « les plus consultés » */
  views: number;
  excerpt: string;
  href: string;
};

export const DOMAINES = [
  "Propriété intellectuelle",
  "Marques",
  "Concurrence",
  "Données personnelles",
  "Contrats",
  "Contrefaçon",
] as const;

export type Domain = (typeof DOMAINES)[number];

export const ARTICLES: Article[] = [
  {
    title: "Qu'est-ce qu'une œuvre originale ?",
    domain: "Propriété intellectuelle",
    read: "12 min",
    views: 4700,
    excerpt:
      "En droit d'auteur, une œuvre n'est protégée que si elle est originale. Ce que recouvre vraiment ce critère, et comment les juges l'apprécient.",
    href: "/ressources/oeuvre-originale",
  },
  {
    title: "Qu'est-ce que le parasitisme en droit ?",
    domain: "Concurrence",
    read: "7 min",
    views: 3200,
    excerpt:
      "Une entreprise se place dans votre sillage et profite de vos efforts ? Définition, recours possibles et moyens de s'en protéger.",
    href: "#",
  },
  {
    title: "Comment savoir si une marque est déposée ?",
    domain: "Marques",
    read: "5 min",
    views: 4100,
    excerpt:
      "Avant tout dépôt, vérifiez la disponibilité de votre marque : où chercher, comment lire une antériorité, et éviter le refus de l'INPI.",
    href: "#",
  },
  {
    title: "Comment protéger ses données personnelles ?",
    domain: "Données personnelles",
    read: "6 min",
    views: 3900,
    excerpt:
      "Les bons réflexes et les obligations pour protéger les données personnelles que vous traitez, côté entreprise comme côté particulier.",
    href: "#",
  },
  {
    title: "Comment se protéger du cybersquatting ?",
    domain: "Marques",
    read: "6 min",
    views: 2400,
    excerpt:
      "Quelqu'un a réservé un nom de domaine reprenant votre marque ? Ce qu'est le cybersquatting et les procédures pour récupérer le nom.",
    href: "#",
  },
  {
    title: "Qu'est-ce que la concurrence déloyale ?",
    domain: "Concurrence",
    read: "7 min",
    views: 3000,
    excerpt:
      "Dénigrement, imitation, désorganisation : les visages de la concurrence déloyale et les actions pour y mettre fin.",
    href: "#",
  },
  {
    title: "Le consentement aux cookies : ce qu'il faut savoir",
    domain: "Données personnelles",
    read: "5 min",
    views: 3600,
    excerpt:
      "Bandeau, finalités, preuve du consentement : les règles à respecter pour déposer des cookies sur votre site sans risque.",
    href: "#",
  },
  {
    title: "Qu'appelle-t-on un contrat électronique ?",
    domain: "Contrats",
    read: "6 min",
    views: 1800,
    excerpt:
      "Formation, preuve, signature électronique : ce qui fait la validité d'un contrat conclu en ligne.",
    href: "#",
  },
  {
    title: "Comment définir le droit à l'information ?",
    domain: "Données personnelles",
    read: "6 min",
    views: 1500,
    excerpt:
      "Entre liberté d'expression et droit d'être informé : les contours d'une notion au cœur des sociétés démocratiques.",
    href: "#",
  },
  {
    title: "Qu'est-ce que le droit de la propriété intellectuelle ?",
    domain: "Propriété intellectuelle",
    read: "8 min",
    views: 3400,
    excerpt:
      "Brevets, marques, droit d'auteur, dessins et modèles : la carte complète des droits qui protègent vos actifs immatériels.",
    href: "#",
  },
  {
    title: "Quel droit protège une œuvre de l'esprit ?",
    domain: "Propriété intellectuelle",
    read: "7 min",
    views: 2600,
    excerpt:
      "Conditions de protection, droits moraux et patrimoniaux : le régime du droit d'auteur applicable à toute œuvre de l'esprit.",
    href: "#",
  },
  {
    title: "Comment protéger juridiquement un site internet ?",
    domain: "Propriété intellectuelle",
    read: "7 min",
    views: 2900,
    excerpt:
      "Droit d'auteur, marques, CGU, dépôt : les leviers juridiques pour protéger un site internet et son contenu.",
    href: "#",
  },
  {
    title: "Comment utiliser les licences Creative Commons ?",
    domain: "Propriété intellectuelle",
    read: "5 min",
    views: 2100,
    excerpt:
      "Ce qu'autorise et interdit une licence Creative Commons, et comment l'utiliser sans enfreindre les droits de l'auteur.",
    href: "#",
  },
  {
    title: "Comment vérifier la disponibilité d'un nom de domaine ?",
    domain: "Marques",
    read: "4 min",
    views: 2200,
    excerpt:
      "Avant de réserver, assurez-vous que le nom de domaine est libre : les outils et vérifications à mener, étape par étape.",
    href: "#",
  },
  {
    title: "L'œuvre collective : ce qu'il faut savoir",
    domain: "Propriété intellectuelle",
    read: "6 min",
    views: 1600,
    excerpt:
      "Plusieurs contributeurs, un seul titulaire : le régime particulier de l'œuvre collective et ses conséquences.",
    href: "#",
  },
  {
    title: "Avocats contrefaçon : protéger et défendre vos droits",
    domain: "Contrefaçon",
    read: "8 min",
    views: 2700,
    excerpt:
      "Face à la contrefaçon, de la caractérisation de l'atteinte à l'action en justice : comment le cabinet défend vos droits de propriété intellectuelle.",
    href: "#",
  },
];

/** L'article mis en avant. Il reprend le thème de la contrefaçon, présent
 *  aussi dans le catalogue sous une forme plus courte. */
export const FEATURED = {
  title: "Avocats contrefaçon : protéger et défendre vos droits de PI",
  domain: "Contrefaçon" as const,
  read: "8 min",
  /** Monogramme affiché en grand dans le panneau bleu */
  big: "PI",
  excerpt:
    "Face à la contrefaçon, le cabinet accompagne la défense et l'exploitation de vos droits de propriété intellectuelle — de la caractérisation de l'atteinte à l'action en justice.",
  href: "#",
};

/** Mots-clés proposés sous la barre de recherche. */
export const SUGGESTIONS = [
  "œuvre originale",
  "parasitisme",
  "marque déposée",
  "cookies",
  "contrefaçon",
];

/** Maillage thématique en bas de page — un lien par domaine. */
export const PILLARS = DOMAINES.map((d) => ({ label: d, href: "#" }));

/* ── Sélecteurs ── */

/** Total affiché dans le hero. */
export const total = () => ARTICLES.length;

export const parDomaine = (d: string) =>
  d === "tout" ? ARTICLES : ARTICLES.filter((a) => a.domain === d);

/** Classement calculé depuis `views`, jamais écrit en dur. */
export const lesPlusConsultes = (n = 5) =>
  [...ARTICLES]
    .sort((a, b) => b.views - a.views)
    .slice(0, n)
    .map((a, i) => ({
      rank: String(i + 1).padStart(2, "0"),
      title: a.title,
      domain: a.domain,
      href: a.href,
    }));
