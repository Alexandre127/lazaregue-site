/**
 * Données de la navigation principale.
 *
 * Source unique du header (desktop + mobile) ET de la page d'index
 * /nos-domaines. Les libellés sont AU LONG (jamais « Contrats IT », « Crypto »…)
 * — ce sont des ancres répétées sur chaque page. Les phrases de contexte sont
 * VERBATIM (phrases verbales, pas des listes de mots-clés) : ne pas les
 * raccourcir ni y ajouter de mots-clés.
 *
 * Câblage sur les routes RÉELLES du projet. Depuis le lot 2, les dix domaines
 * (M&A Tech compris) sont sous /nos-domaines/ ; plus aucune route /competences/.
 */

/** Clé stable d'un domaine : sert au classement de TOUS les contenus du site
 *  (articles, cas clients, outils) et au filtre `?domaine=`. */
export type CleDomaine =
  | "rgpd"
  | "ia"
  | "cyber"
  | "contrats"
  | "ma"
  | "crypto"
  | "contentieux"
  | "crim"
  | "fraude"
  | "contenus";

export type DomaineLink = {
  /** Clé de classement (voir lib/domaines.ts). */
  cle: CleDomaine;
  /** Libellé au long — sert d'ancre. */
  titre: string;
  /** Libellé court : sur-titres et filtres des contenus, jamais une ancre de menu. */
  court: string;
  /** Phrase de contexte verbale, verbatim. */
  contexte: string;
  /** Route réelle. */
  href: string;
};

export type Famille = {
  /**
   * Intitulé de famille, non cliquable. Repris AU MOT PRÈS de la section
   * « Domaines d'intervention » de la home (lot 8) : ne pas reformuler.
   */
  intitule: string;
  domaines: DomaineLink[];
};

/** Les trois familles du panneau DOMAINES (3 × 3). */
export const FAMILLES: Famille[] = [
  {
    intitule: "Conformité et gouvernance",
    domaines: [
      {
        cle: "rgpd",
        titre: "RGPD et données personnelles",
        court: "RGPD",
        contexte: "Se mettre en conformité et gérer une violation de données",
        href: "/nos-domaines/rgpd-donnees-personnelles",
      },
      {
        cle: "ia",
        titre: "Intelligence artificielle et AI Act",
        court: "IA",
        contexte: "Appliquer l'AI Act et encadrer les usages internes",
        href: "/nos-domaines/avocat-intelligence-artificielle",
      },
      {
        cle: "cyber",
        titre: "Cybersécurité et NIS 2",
        court: "Cybersécurité",
        contexte: "Prévenir les incidents et répondre aux obligations",
        href: "/nos-domaines/cybersecurite",
      },
    ],
  },
  {
    intitule: "Contrats et opérations numériques",
    domaines: [
      {
        cle: "contrats",
        titre: "Contrats informatiques",
        court: "Contrats IT",
        contexte: "Négocier, sécuriser et faire exécuter un projet IT",
        href: "/nos-domaines/contrats-informatiques",
      },
      {
        cle: "ma",
        titre: "M&A tech et due diligence",
        court: "M&A tech",
        contexte: "Auditer le passif numérique avant une acquisition",
        href: "/nos-domaines/ma-tech",
      },
      {
        cle: "crypto",
        titre: "Crypto-actifs et blockchain",
        court: "Crypto-actifs",
        contexte: "Obtenir un agrément et sécuriser ses opérations",
        href: "/nos-domaines/crypto-actifs-blockchain",
      },
    ],
  },
  {
    intitule: "Contentieux et atteintes numériques",
    domaines: [
      {
        cle: "contentieux",
        titre: "Contentieux informatique et commercial",
        court: "Contentieux IT",
        contexte: "Agir quand un projet IT échoue ou qu'un prestataire manque à ses obligations",
        href: "/nos-domaines/contentieux-informatique-commercial",
      },
      {
        cle: "crim",
        titre: "Cybercriminalité et cyberattaques",
        court: "Cybercriminalité",
        contexte: "Réagir à une intrusion et engager les responsabilités",
        href: "/nos-domaines/cybercriminalite",
      },
      {
        cle: "fraude",
        titre: "Fraude bancaire et escroquerie",
        court: "Fraude bancaire",
        contexte: "Obtenir le remboursement des sommes détournées",
        href: "/nos-domaines/escroquerie-fraude-bancaire",
      },
      {
        cle: "contenus",
        titre: "Diffamation et retrait de contenus",
        court: "E-réputation",
        contexte: "Faire retirer un contenu et identifier son auteur",
        href: "/nos-domaines/diffamation-retrait-contenus",
      },
    ],
  },
];

/**
 * Entrées du menu, dans l'ordre. Trois formes possibles :
 *  - `panel` : entrée à panneau (libellé = lien vers la rubrique, chevron =
 *    bouton distinct). Seule DOMAINES en a un.
 *  - `cartes` : libellé = lien (vers la première carte), chevron = bouton
 *    distinct qui ouvre un panneau de cartes. ACCOMPAGNEMENT et RESSOURCES.
 *  - `link` : lien simple.
 */
/** Carte d'un sous-menu à cartes (ACCOMPAGNEMENT, RESSOURCES) : titre et ligne de
 *  description ; sur-titre et lien de bas de carte facultatifs. */
export type CarteMenu = { surtitre?: string; titre: string; texte: string; lien?: string; href: string };

export type NavEntry =
  | { type: "panel"; label: string; href: string; panelId: string }
  | { type: "cartes"; label: string; href: string; menuId: string; cartes: CarteMenu[] }
  | { type: "link"; label: string; href: string };

/**
 * Sous-liens du menu « Formations » (les quatre formations réelles).
 * Le libellé « Formations » reste un lien vers /formations ; un bouton flèche
 * distinct ouvre cette liste (modèle W3C « Disclosure Navigation Menu with
 * Top-Level Links »).
 */
export const FORMATIONS_LINKS: { label: string; href: string }[] = [
  { label: "IA Act", href: "/formations/intelligence-artificielle-entreprise" },
  { label: "RGPD et DPO", href: "/formations/rgpd" },
  { label: "Cybersécurité et cyberfraude", href: "/formations/cybersecurite" },
  { label: "L’Avocat augmenté", href: "/formations/ia-avocats" },
];

/**
 * Sous-menu ACCOMPAGNEMENT (9 octobre 2026) : il prend la place de FORMATIONS
 * dans le menu principal. Les formations ne disparaissent pas : elles en sont
 * la troisième carte, et /formations garde son adresse.
 */
export const ACCOMPAGNEMENT_HREF = "/direction-juridique-externalisee";
export const ACCOMPAGNEMENT_CARTES: CarteMenu[] = [
  {
    surtitre: "Abonnement",
    titre: "Accompagnement continu",
    texte: "Votre direction juridique du numérique, toute l’année.",
    lien: "À partir de 950 € HT / mois",
    href: "/direction-juridique-externalisee",
  },
  {
    surtitre: "Fonction RGPD",
    titre: "DPO externalisé",
    texte: "Un avocat délégué à la protection des données, désigné auprès de la CNIL.",
    lien: "À partir de 690 € HT / mois",
    href: "/dpo-externalise",
  },
  {
    surtitre: "Équipes",
    titre: "Formations",
    texte: "IA Act, RGPD et DPO, cybersécurité, L’Avocat augmenté.",
    lien: "Toutes les formations",
    href: "/formations",
  },
];

/**
 * Sous-menu RESSOURCES (12 octobre 2026) : trois rubriques de contenus. « Cas
 * clients » quitte le premier niveau et devient la deuxième carte (il reste
 * dans le pied de page) ; /outils regroupe les outils et observatoires.
 */
export const RESSOURCES_HREF = "/ressources";
export const OUTILS_HREF = "/outils";
export const RESSOURCES_CARTES: CarteMenu[] = [
  {
    titre: "Guides et articles",
    texte: "Les règles du droit du numérique, expliquées par le cabinet.",
    href: "/ressources",
  },
  {
    titre: "Cas clients",
    texte: "Des dossiers traités par le cabinet, présentés de manière anonymisée.",
    href: "/cas-clients",
  },
  {
    titre: "Outils et observatoires",
    texte: "Diagnostic d’un avis en ligne, observatoire de jurisprudence.",
    href: OUTILS_HREF,
  },
];

// Ordre du menu : Domaines · Accompagnement · Ressources · Le cabinet · Contact.
// Source unique du header ET du tiroir mobile.
export const NAV_ENTRIES: NavEntry[] = [
  { type: "panel", label: "DOMAINES", href: "/nos-domaines", panelId: "panel-domaines" },
  { type: "cartes", label: "ACCOMPAGNEMENT", href: ACCOMPAGNEMENT_HREF, menuId: "panel-accompagnement", cartes: ACCOMPAGNEMENT_CARTES },
  { type: "cartes", label: "RESSOURCES", href: RESSOURCES_HREF, menuId: "panel-ressources", cartes: RESSOURCES_CARTES },
  { type: "link", label: "LE CABINET", href: "/le-cabinet" },
  { type: "link", label: "CONTACT", href: "/contact" },
];

/** Pied du panneau DOMAINES. */
export const PANEL_DOMAINES_FOOTER = {
  lien: { label: "Voir tous les domaines d'intervention", href: "/nos-domaines" },
  mention: "le cabinet intervient partout en France",
};

/** Téléphone (barre mobile + pied de tiroir). */
export const TEL = { display: "01 81 70 62 00", href: "tel:+33181706200" };

/**
 * Routes dont le HAUT DE PAGE est un hero sombre : le header s'y pose en
 * transparent au repos (il flotte sur le hero), puis redevient opaque en
 * collant. Toute route ABSENTE d'ici — et toute page future non déclarée —
 * garde le header opaque #0a0f2e, donc lisible par défaut.
 *
 * C'est un drapeau DÉCLARATIF (pas une détection au défilement ni une mesure du
 * hero) : l'état est connu dès le rendu serveur, donc aucun clignotement.
 *
 * Correspondance par segment : `/nos-domaines` couvre l'index ET toutes les
 * pages de domaine (M&A Tech compris depuis le lot 2).
 * Quand une page à hero sombre est ajoutée hors de ces préfixes, l'inscrire ici.
 */
export const ROUTES_HERO_SOMBRE = [
  "/", // accueil
  "/nos-domaines", // index + toutes les pages de domaine
  // « /le-cabinet » et « /ressources » retirés : ces pages ont désormais un
  // hero CLAIR (refonte sept. 2026). Le header opaque (navy) au repos reste
  // lisible dessus ; un hero sombre rendrait le texte blanc du header invisible.
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
] as const;

/**
 * Exceptions à hero CLAIR sous un préfixe sombre : routes de `/nos-domaines`
 * dont le hero reste clair et où le header transparent à texte blanc serait
 * invisible. La page Fraude bancaire est passée en hero sombre (photo La Défense
 * + dégradé, sept. 2026) : elle a rejoint le comportement sombre par défaut de
 * `/nos-domaines` et n'est donc plus une exception. Liste vide pour l'instant.
 */
export const ROUTES_HERO_CLAIR: readonly string[] = [] as const;

/** Le header doit-il être transparent au repos sur cette route ? */
export function aHeroSombre(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (ROUTES_HERO_CLAIR.some((r) => p === r || p.startsWith(r + "/"))) {
    return false;
  }
  return ROUTES_HERO_SOMBRE.some((r) =>
    r === "/" ? p === "/" : p === r || p.startsWith(r + "/"),
  );
}

/* Espace client (portail) : lien d'accès hors menu principal — en-tête, menu
   mobile (dernière ligne) et pied de page lisent cette seule constante. */
export const ESPACE_CLIENT = {
  label: "Espace client",
  href: "https://espace.lazaregue-avocats.fr/connexion",
};
