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

export type DomaineLink = {
  /** Libellé au long — sert d'ancre. */
  titre: string;
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
        titre: "RGPD et données personnelles",
        contexte: "Se mettre en conformité et gérer une violation de données",
        href: "/nos-domaines/rgpd-donnees-personnelles",
      },
      {
        titre: "Intelligence artificielle",
        contexte: "Appliquer l'AI Act et encadrer les usages internes",
        href: "/nos-domaines/avocat-intelligence-artificielle",
      },
      {
        titre: "Cybersécurité et NIS 2",
        contexte: "Prévenir les incidents et répondre aux obligations",
        href: "/nos-domaines/cybersecurite",
      },
    ],
  },
  {
    intitule: "Contrats et opérations numériques",
    domaines: [
      {
        titre: "Contrats informatiques",
        contexte: "Négocier, sécuriser et faire exécuter un projet IT",
        href: "/nos-domaines/contrats-informatiques",
      },
      {
        titre: "Crypto-actifs et blockchain",
        contexte: "Obtenir un agrément et sécuriser ses opérations",
        href: "/nos-domaines/crypto-actifs-blockchain",
      },
      {
        titre: "Fusions-acquisitions technologiques",
        contexte: "Auditer le passif numérique avant une acquisition",
        href: "/nos-domaines/ma-tech",
      },
    ],
  },
  {
    intitule: "Contentieux et atteintes numériques",
    domaines: [
      {
        titre: "Fraude bancaire et escroquerie en ligne",
        contexte: "Obtenir le remboursement des sommes détournées",
        href: "/nos-domaines/escroquerie-fraude-bancaire",
      },
      {
        titre: "Cyberattaques et cybercriminalité",
        contexte: "Réagir à une intrusion et engager les responsabilités",
        href: "/nos-domaines/cybercriminalite",
      },
      {
        titre: "Diffamation et retrait de contenus",
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
 *  - `link` : lien simple.
 *
 * ACTIONS COLLECTIVES et RESSOURCES sont des LIENS SIMPLES (et non des panneaux)
 * car, après retrait des entrées sans page, il ne restait qu'une carte
 * (PicRights) ou aucune (Ressources) — un panneau à zéro ou une carte n'a pas
 * de sens. Elles redeviendront des panneaux quand les pages existeront.
 */
export type NavEntry =
  | { type: "panel"; label: string; href: string; panelId: string }
  | { type: "link"; label: string; href: string };

export const NAV_ENTRIES: NavEntry[] = [
  { type: "panel", label: "DOMAINES", href: "/nos-domaines", panelId: "panel-domaines" },
  // « Actions collectives » retirée (aucune page dédiée n'existe) : reviendra le
  // jour où la page existera. Ne rien mettre à sa place.
  // Aucune sous-page /ressources/* n'existe → lien direct vers l'index existant.
  { type: "link", label: "RESSOURCES", href: "/ressources" },
  { type: "link", label: "LE CABINET", href: "/le-cabinet" },
  { type: "link", label: "CONTACT", href: "/contact" },
];

/** Pied du panneau DOMAINES. */
export const PANEL_DOMAINES_FOOTER = {
  lien: { label: "voir tous les domaines d'intervention", href: "/nos-domaines" },
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
  "/le-cabinet",
  "/ressources",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
] as const;

/** Le header doit-il être transparent au repos sur cette route ? */
export function aHeroSombre(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ROUTES_HERO_SOMBRE.some((r) =>
    r === "/" ? p === "/" : p === r || p.startsWith(r + "/"),
  );
}
