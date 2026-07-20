/**
 * La bibliothèque du cabinet — 20 ressources.
 *
 * Ce fichier est la source unique de la page /ressources : les compteurs de
 * dossiers et le total du teaser en sont calculés, jamais écrits en dur.
 * Tu peux modifier les titres, promesses, durées et niveaux ici sans toucher
 * au code de la page.
 */

export type TypeRessource = "guide" | "definition" | "outil";
export type Niveau = "essentiel" | "approfondi";
export type DossierId =
  | "donnees-rgpd"
  | "pi-creations"
  | "marques-domaines"
  | "cyber"
  | "ia";

export type Ressource = {
  title: string;
  /** Phrase révélée au survol dans la liste d'un dossier */
  promesse: string;
  type: TypeRessource;
  dossier: DossierId;
  /** En minutes — absent pour les outils */
  duree?: number;
  /** Absent pour les outils */
  niveau?: Niveau;
  revision: string;
  /** Uniquement pour les outils : "PDF", "En ligne" */
  format?: string;
  featured?: boolean;
  /** Chapeau long, utilisé seulement par la ressource mise en avant */
  chapeau?: string;
  auteur?: string;
  ordre: number;
  href: string;
};

export const RESSOURCES: Ressource[] = [
  /* ── 01 · Données personnelles & RGPD ── */
  {
    title: "Comment se mettre en conformité avec le RGPD ?",
    promesse:
      "Les étapes à suivre, dans l'ordre, pour une conformité qui tient devant la CNIL.",
    type: "guide",
    dossier: "donnees-rgpd",
    duree: 7,
    niveau: "essentiel",
    revision: "2026",
    ordre: 1,
    href: "#",
  },
  {
    title: "Tout savoir sur les droits RGPD",
    promesse:
      "Accès, effacement, opposition : ce que chacun peut exiger — et comment y répondre.",
    type: "guide",
    dossier: "donnees-rgpd",
    duree: 7,
    niveau: "essentiel",
    revision: "2026",
    ordre: 2,
    href: "#",
  },
  {
    title: "Tout savoir sur le consentement aux cookies",
    promesse: "Le consentement qui tient devant la CNIL — bandeau compris.",
    type: "guide",
    dossier: "donnees-rgpd",
    duree: 10,
    niveau: "approfondi",
    revision: "2026",
    ordre: 3,
    href: "#",
  },
  {
    title: "Protéger ses données personnelles : comment s'y prendre ?",
    promesse: "Les réflexes concrets pour reprendre la main sur vos données.",
    type: "guide",
    dossier: "donnees-rgpd",
    duree: 8,
    niveau: "essentiel",
    revision: "2026",
    ordre: 4,
    href: "#",
  },
  {
    title: "Qu'est-ce qu'un contrat électronique en droit ?",
    promesse:
      "Signature, preuve, validité : ce qui rend un contrat numérique opposable.",
    type: "definition",
    dossier: "donnees-rgpd",
    duree: 8,
    niveau: "essentiel",
    revision: "2026",
    ordre: 5,
    href: "#",
  },
  {
    title: "Droit à l'information : de quoi s'agit-il ?",
    promesse:
      "Où s'arrête la liberté d'informer, où commence la protection des personnes.",
    type: "definition",
    dossier: "donnees-rgpd",
    duree: 7,
    niveau: "essentiel",
    revision: "2026",
    ordre: 6,
    href: "#",
  },

  /* ── 02 · Propriété intellectuelle & créations ── */
  {
    title: "Œuvre originale : de quoi s'agit-il ?",
    promesse:
      "L'originalité ne se présume pas : comment elle se démontre, œuvre par œuvre.",
    chapeau:
      "L'originalité ne se présume pas : elle s'apprécie œuvre par œuvre. Comment ce critère essentiel du droit d'auteur se démontre — et pourquoi il est au cœur de la réponse aux réclamations photographiques.",
    auteur: "Alexandre Lazarègue",
    type: "definition",
    dossier: "pi-creations",
    duree: 11,
    niveau: "approfondi",
    revision: "2026",
    featured: true,
    ordre: 1,
    href: "#",
  },
  {
    title: "Qu'est-ce qu'une œuvre collective ?",
    promesse: "Qui est titulaire des droits quand l'œuvre a plusieurs mains ?",
    type: "definition",
    dossier: "pi-creations",
    duree: 8,
    niveau: "approfondi",
    revision: "2026",
    ordre: 2,
    href: "#",
  },
  {
    title: "Tout savoir sur la protection d'une œuvre de l'esprit",
    promesse: "Ce que le droit d'auteur protège — et à quelles conditions.",
    type: "guide",
    dossier: "pi-creations",
    duree: 8,
    niveau: "essentiel",
    revision: "2026",
    ordre: 3,
    href: "#",
  },
  {
    title: "Les moyens juridiques de protection d'un site internet",
    promesse:
      "Code, contenus, base de données, nom de domaine : protéger chaque couche du site.",
    type: "guide",
    dossier: "pi-creations",
    duree: 10,
    niveau: "essentiel",
    revision: "2026",
    ordre: 4,
    href: "#",
  },
  {
    title: "Licences creative commons : bien les utiliser",
    promesse:
      "« Libre de droits » ne veut pas dire sans conditions : lire la licence avant l'usage.",
    type: "guide",
    dossier: "pi-creations",
    duree: 7,
    niveau: "essentiel",
    revision: "2026",
    ordre: 5,
    href: "#",
  },
  {
    title: "Droit de la propriété intellectuelle : ce qu'il faut savoir",
    promesse:
      "La carte complète : droit d'auteur, marques, brevets, dessins et modèles.",
    type: "guide",
    dossier: "pi-creations",
    duree: 7,
    niveau: "essentiel",
    revision: "2026",
    ordre: 6,
    href: "#",
  },
  {
    title: "Ce qu'il faut savoir avant de déposer une marque",
    promesse:
      "Disponibilité, classes, antériorités : les vérifications qui évitent un dépôt fragile.",
    type: "guide",
    dossier: "pi-creations",
    duree: 10,
    niveau: "essentiel",
    revision: "2026",
    ordre: 7,
    href: "#",
  },

  /* ── 03 · Marques, noms de domaine & concurrence ── */
  {
    title: "Vérifier la disponibilité d'un nom de domaine",
    promesse: "Vérifier avant de réserver : la méthode, registre par registre.",
    type: "guide",
    dossier: "marques-domaines",
    duree: 8,
    niveau: "essentiel",
    revision: "2026",
    ordre: 1,
    href: "#",
  },
  {
    title: "Cybersquatting : quelles solutions ?",
    promesse:
      "UDRP, Syreli, voies judiciaires : récupérer un nom de domaine capté.",
    type: "guide",
    dossier: "marques-domaines",
    duree: 9,
    niveau: "approfondi",
    revision: "2026",
    ordre: 2,
    href: "#",
  },
  {
    title: "Tout savoir sur la concurrence déloyale",
    promesse: "Reconnaître les actes déloyaux — et réunir la preuve qui tient.",
    type: "definition",
    dossier: "marques-domaines",
    duree: 8,
    niveau: "essentiel",
    revision: "2026",
    ordre: 3,
    href: "#",
  },
  {
    title: "Tout savoir sur le parasitisme en droit",
    promesse: "Profiter des efforts d'autrui : où la ligne passe, et comment agir.",
    type: "definition",
    dossier: "marques-domaines",
    duree: 8,
    niveau: "essentiel",
    revision: "2026",
    ordre: 4,
    href: "#",
  },

  /* ── 04 · Cybersécurité & cybercriminalité ── */
  {
    title: "Quels sont les risques liés à la cybercriminalité ?",
    promesse:
      "Entreprise, PME ou particulier : à quoi vous êtes réellement exposé.",
    type: "guide",
    dossier: "cyber",
    duree: 6,
    niveau: "essentiel",
    revision: "2026",
    ordre: 1,
    href: "#",
  },
  {
    title: "Cyberattaque : le protocole des premières heures",
    promesse:
      "Préserver les preuves, isoler, notifier : l'ordre des opérations après l'attaque.",
    type: "outil",
    dossier: "cyber",
    revision: "2026",
    format: "En ligne",
    ordre: 2,
    href: "#",
  },

  /* ── 05 · Intelligence artificielle ── */
  {
    title: "Audit IA : la check-list des 14 points",
    promesse:
      "Situer les risques d'un projet IA avant une levée ou une mise en production.",
    type: "outil",
    dossier: "ia",
    revision: "2026",
    format: "PDF",
    ordre: 1,
    href: "#",
  },
];

/** Métadonnées des dossiers. Le compteur est calculé, jamais écrit en dur. */
export const DOSSIERS: {
  id: DossierId;
  numero: string;
  titre: string;
  /** Mention ajoutée après le compteur, ex. « DOSSIER OUVERT » */
  mention?: string;
  pratique?: { label: string; href: string };
}[] = [
  {
    id: "donnees-rgpd",
    numero: "01",
    titre: "DONNÉES PERSONNELLES & RGPD",
    pratique: { label: "avocat DPO & données personnelles", href: "#" },
  },
  {
    id: "pi-creations",
    numero: "02",
    titre: "PROPRIÉTÉ INTELLECTUELLE & CRÉATIONS",
    pratique: { label: "avocat droit d'auteur", href: "#" },
  },
  {
    id: "marques-domaines",
    numero: "03",
    titre: "MARQUES, NOMS DE DOMAINE & CONCURRENCE",
  },
  {
    id: "cyber",
    numero: "04",
    titre: "CYBERSÉCURITÉ & CYBERCRIMINALITÉ",
    pratique: { label: "avocat cybercriminalité", href: "#" },
  },
  {
    id: "ia",
    numero: "05",
    titre: "INTELLIGENCE ARTIFICIELLE",
    mention: "DOSSIER OUVERT",
  },
];

/** Libellés de dossier affichés dans les étiquettes (section 1 et 2). */
export const LIBELLES_DOSSIER: Record<DossierId, string> = {
  "donnees-rgpd": "DONNÉES & RGPD",
  "pi-creations": "PROPRIÉTÉ INTELLECTUELLE",
  "marques-domaines": "MARQUES & DOMAINES",
  cyber: "CYBERSÉCURITÉ",
  ia: "INTELLIGENCE ARTIFICIELLE",
};

export const LIBELLES_TYPE: Record<TypeRessource, string> = {
  guide: "Guide",
  definition: "Définition",
  outil: "Outil",
};

/** Les 3 ressources mises en avant dans « À lire ensuite ». */
export const A_LIRE_ENSUITE: string[] = [
  "Tout savoir sur les droits RGPD",
  "Ce qu'il faut savoir avant de déposer une marque",
  "Cybersquatting : quelles solutions ?",
];

/** Dossiers annoncés mais pas encore ouverts — simple bandeau, non cliquable. */
export const EN_PREPARATION = [
  "Jeux vidéo & e-sport",
  "M&A Tech",
  "Presse & e-réputation",
  "Applications mobiles & contrats IT",
];

/* ── Sélecteurs ── */

export const parDossier = (id: DossierId) =>
  RESSOURCES.filter((r) => r.dossier === id).sort((a, b) => a.ordre - b.ordre);

export const laRessourceAlire = () => RESSOURCES.find((r) => r.featured);

export const aLireEnsuite = () =>
  A_LIRE_ENSUITE.map((t) => RESSOURCES.find((r) => r.title === t)).filter(
    (r): r is Ressource => Boolean(r),
  );

export const total = () => RESSOURCES.length;
