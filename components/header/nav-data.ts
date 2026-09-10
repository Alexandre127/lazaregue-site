/**
 * Données de la navigation principale.
 *
 * Source unique du header (desktop + mobile) ET de la page d'index
 * /nos-domaines. Les libellés sont AU LONG (jamais « Contrats IT », « Crypto »…)
 * — ce sont des ancres répétées sur chaque page. Les phrases de contexte sont
 * VERBATIM (phrases verbales, pas des listes de mots-clés) : ne pas les
 * raccourcir ni y ajouter de mots-clés.
 *
 * Câblage sur les routes RÉELLES du projet (le brief employait un schéma
 * /domaines/* qui n'existe pas). Correspondance validée avec le cabinet.
 * ⚠️ « Fusions-acquisitions technologiques » est la seule sous /competences/
 * (et non /nos-domaines/) — incohérence de structure à traiter séparément.
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
  /** Intitulé de famille (bas de casse, non cliquable). */
  intitule: string;
  domaines: DomaineLink[];
};

/** Les trois familles du panneau DOMAINES (3 × 3). */
export const FAMILLES: Famille[] = [
  {
    intitule: "conformité et risques",
    domaines: [
      {
        titre: "RGPD et données personnelles",
        contexte: "Se mettre en conformité et gérer une violation de données",
        href: "/nos-domaines/rgpd-donnees",
      },
      {
        titre: "Intelligence artificielle",
        contexte: "Appliquer l'AI Act et encadrer les usages internes",
        href: "/nos-domaines/ia-act",
      },
      {
        titre: "Cybersécurité et NIS 2",
        contexte: "Prévenir les incidents et répondre aux obligations",
        href: "/nos-domaines/cybersecurite",
      },
    ],
  },
  {
    intitule: "contrats et opérations",
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
        href: "/competences/ma-tech",
      },
    ],
  },
  {
    intitule: "contentieux et atteintes",
    domaines: [
      {
        titre: "Fraude bancaire et escroquerie en ligne",
        contexte: "Obtenir le remboursement des sommes détournées",
        href: "/nos-domaines/avocat-escroquerie-fraude",
      },
      {
        titre: "Cyberattaques et cybercriminalité",
        contexte: "Réagir à une intrusion et engager les responsabilités",
        href: "/nos-domaines/cybercriminalite",
      },
      {
        titre: "Diffamation et retrait de contenus",
        contexte: "Faire retirer un contenu et identifier son auteur",
        href: "/nos-domaines/diffamation-retrait-de-contenus",
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
  // Panneau réduit à une seule carte réelle (PicRights) → lien direct.
  { type: "link", label: "ACTIONS COLLECTIVES", href: "/litige-afp-picrights/" },
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
