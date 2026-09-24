"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PortailDemo } from "@/components/home/section-differenciateurs";
import { ACCUEIL_V4_CSS } from "@/components/home/accueil-v4-css";
import { FAMILLES as MENU_FAMILLES } from "@/components/header/nav-data";

/**
 * Accueil — intégration fidèle de la maquette V4 validée (18 sept. 2026).
 *
 * Le CSS de la maquette est porté tel quel, borné à `.accueilV4` (aucune fuite
 * globale). Exceptions demandées par le client :
 *  · le globe reste le composant THREE.js du projet (masqué ≤850px, halo fixe) ;
 *  · le portail réutilise le vrai composant animé `PortailDemo` ;
 *  · les dix domaines pointent vers les routes réelles (aucune modale) ;
 *  · le contact renvoie au parcours réel du site.
 *
 * Les interactions de la maquette (titre tournant + pause, carrousel de presse,
 * accent des dossiers au survol/clavier/tap, aperçu des cas en dialog) sont
 * portées dans un effet unique, borné à la racine `.accueilV4`.
 */

const HeroGlobeThree = dynamic(
  () => import("@/components/home/hero-globe-three").then((m) => m.HeroGlobeThree),
  { ssr: false },
);

/* Ajustements propres à l'intégration (le port utilise `next/image`, non les
   `<img>` de la maquette ; le header global flotte au-dessus du hero). */
const ACCUEIL_V4_OVERRIDES = `
.accueilV4 .person-photo{position:relative}
.accueilV4 .team-panorama{position:relative;line-height:0}
.accueilV4 .hero-art{position:relative}
.accueilV4 .hero-art canvas{max-width:100%}
.accueilV4 .hero{padding-top:96px}
@media(max-width:850px){.accueilV4 .hero{padding-top:80px}}
@media(max-width:639px){.accueilV4 .hero{padding-top:72px}}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(29,158,117,.45)}70%{box-shadow:0 0 0 6px rgba(29,158,117,0)}100%{box-shadow:0 0 0 0 rgba(29,158,117,0)}}

/* --- Retouches ciblées du hero et de l'équipe (sept. 2026) --- */
/* 1. Hero ordinateur : fond presque noir rétabli (globe THREE inchangé, canvas
      transparent : il se fond dans ce fond). */
.accueilV4 .hero{background:#05060f}
/* 4. « Intervention partout en France » : lisible, ~16px, fort contraste,
      proche de l'introduction — plus une note de bas de page. */
.accueilV4 .hero-baseline{font-size:1rem;color:#fff}
.accueilV4 .hero-baseline span{font-weight:500}
/* 6. Spécialités sous les portraits : le p{color:blanc 82%} global les rendait
      illisibles sur fond clair. Couleur bleu nuit rétablie, en local. */
.accueilV4 .person-expertise{color:var(--navy)}
/* 3. Sous préférence « animations réduites », rien n'anime le hero : la commande
      de pause devient inutile et n'est pas affichée. */
@media(prefers-reduced-motion:reduce){.accueilV4 .motion-control{display:none}}
/* 2. Hero mobile : pas de globe, un halo bleu discret et fixe en haut à droite,
      fondu dans le fond sombre (limité aux petits écrans où le globe est retiré). */
@media(max-width:850px){
  .accueilV4 .hero-art{display:none}
  .accueilV4 .hero{position:relative}
  .accueilV4 .hero::after{content:"";position:absolute;top:-70px;right:-70px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(26,71,255,.30),rgba(26,71,255,0) 70%);pointer-events:none;z-index:0}
  .accueilV4 .hero>.wrap{position:relative;z-index:1}
}

/* --- Ajustements finaux (21 sept. 2026) --- */
/* 1. Libellé « Atlas interactif du droit du numérique » près du globe, discret,
      dans le coin haut-droit (hors de la sphère). Masqué sur mobile car le
      conteneur .hero-art y est déjà display:none (globe absent). */
.accueilV4 .hero-atlas-label{position:absolute;top:6px;right:2px;margin:0;max-width:184px;text-align:right;font:400 .6875rem/1.5 var(--ff-mono);letter-spacing:.06em;text-transform:uppercase;color:#9fb2ff;z-index:2;pointer-events:none}
/* 2. Globe légèrement agrandi (~10%) sur ordinateur, par transform : n'augmente
      pas la hauteur du hero, la sphère reste dans sa boîte (pas de chevauchement,
      pas de débordement). Rendu, rotation, interactions et pause inchangés. */
@media(min-width:851px){.accueilV4 .hero-art .laz-globe-three{transform:scale(1.1);transform-origin:center}}
/* 3. Photo collective (ordinateur/tablette) : cadrage ancré en haut → têtes
      entières + petite marge au-dessus des cheveux, épaules visibles ; seul le
      bas des bustes est recadré. Image non déformée, alignée sur la grille. */
@media(min-width:640px){.accueilV4 .team-panorama img{aspect-ratio:3;object-fit:cover;object-position:center top}}

/* --- Ajustements (23 sept. 2026) --- */
/* Dossiers : chaque carte pointe vers la page du cas réel (plus de fenêtre
   interne). Le titre porte le lien ; son ::after rend toute la carte cliquable.
   « Lire le cas → » redevient un repère visuel (span, non focusable). */
.accueilV4 .case-card{position:relative}
.accueilV4 .case-card-link{color:inherit;text-decoration:none}
.accueilV4 .case-card-link::after{content:"";position:absolute;inset:0;z-index:1}
.accueilV4 .case-card:hover .case-card-link,.accueilV4 .case-card-link:focus-visible{text-decoration:underline;text-underline-offset:3px}
.accueilV4 .case-card .case-detail-link{pointer-events:none}
/* Commande d'animation (WCAG 2.2.2) — option B : icône seule, sans libellé.
   Toujours focusable ; sur écran tactile elle reste visible ; là où le survol
   existe (ordinateur) elle apparaît au survol du hero ou au focus clavier.
   prefers-reduced-motion la masque toujours (rien ne s'anime). */
.accueilV4 .motion-control{gap:0;min-width:44px}
.accueilV4 .motion-control .motion-icon{font-size:1.125rem;line-height:1}
@media(hover:hover){
  .accueilV4 .motion-control{opacity:0;transition:opacity .18s ease}
  .accueilV4 .hero:hover .motion-control,.accueilV4 .motion-control:focus-visible{opacity:1}
}

/* === Section « Domaines d'intervention » — version compacte MOBILE (≤639px) ===
   Au-dessus de 640px : AUCUN changement (desktop + tablette identiques). Les
   deux éléments ci-dessous restent display:none — donc hors de l'arbre
   d'accessibilité — et ne sont montés qu'en dessous de 640px, en remplacement
   des descriptions longues (une seule description exposée par domaine à chaque
   largeur). Jetons de la charte uniquement (--ink #0A0A14, --blue #1A47FF,
   --muted #4A4A63, --line #E0E0EE). */
.accueilV4 .domain-description-short{display:none}
.accueilV4 .domains-all-mobile{display:none}
@media(max-width:639px){
  /* Liste à filets, sans carte encadrée ni fond blanc. Familles espacées de 28px. */
  .accueilV4 .domain-groups{gap:28px}
  .accueilV4 .domain-family{display:block;background:transparent;border:0;border-top:2px solid var(--ink);padding:0}
  /* En-tête de famille sur UNE ligne : numéro (Bebas 26px, bleu) + titre (Space Grotesk 500, 17px). Accroche masquée. */
  .accueilV4 .family-heading{display:flex;align-items:baseline;gap:12px;padding:14px 0 6px;min-height:0;grid-template-columns:none}
  .accueilV4 .family-number{font:400 26px/1 var(--ff-display);color:var(--blue);margin:0;grid-row:auto}
  .accueilV4 .family-heading h3{font-family:var(--ff-body);font-weight:500;font-size:17px;line-height:1.25;margin:0;min-height:0}
  .accueilV4 .family-purpose{display:none}
  /* Domaines : lien natif pleine ligne, ≥44px, padding vertical 12px, filet inférieur 1px. */
  .accueilV4 .domain-list{padding:0}
  .accueilV4 .domain-item,.accueilV4 .domain-item:first-child{border-top:0;border-bottom:1px solid var(--line);padding:0}
  .accueilV4 .domain-item a.domain-entry{display:block;padding:12px 0;min-height:44px}
  .accueilV4 .domain-entry-head{display:flex;align-items:center;justify-content:space-between;gap:14px}
  .accueilV4 .domain-title{font-family:var(--ff-body);font-weight:600;font-size:16px;line-height:1.3;color:var(--ink)}
  .accueilV4 .domain-entry .arrow{color:var(--blue);font-size:1.25rem;line-height:1.2;flex-shrink:0}
  /* Bascule description longue -> courte (méga-menu), une seule dans l'arbre d'accessibilité. */
  .accueilV4 .domain-description{display:none}
  .accueilV4 .domain-description-short{display:block;font-family:var(--ff-body);font-weight:400;font-size:14px;line-height:1.4;color:var(--muted);margin-top:4px}
  /* Lien final. */
  .accueilV4 .domains-all-mobile{display:inline-flex;align-items:center;gap:10px;min-height:44px;margin-top:8px;color:var(--ink);font-family:var(--ff-body);font-weight:600;font-size:16px;text-decoration:none}
  .accueilV4 .domains-all-mobile .arrow{color:var(--blue)}
  .accueilV4 .domains-all-mobile:hover{text-decoration:underline;text-underline-offset:4px}
}

/* === Section « Dossiers traités » — format court (audit) : libellé, titre, UN
   paragraphe, lien, à toutes les largeurs. Le paragraphe s'affiche aussi sur
   mobile. Sur carte active (survol pointeur précis), le paragraphe passe en
   clair sur le fond bleu nuit. === */
.accueilV4 #dossiers .case-para{font-size:1rem;line-height:1.6;color:var(--muted);margin:0}
.accueilV4 #dossiers .case-card.is-active .case-para{color:#e7e7ef}
@media(max-width:639px){
  .accueilV4 #dossiers .case-detail-link{width:100%;min-height:48px}
}

/* === « Le cabinet » : flèche « Rencontrer l'équipe » rendue en SVG net
   (l'ancienne « ↓ » en police Arial de repli s'affichait comme un trait
   vertical détaché). Toutes largeurs. === */
.accueilV4 .arrow-down{display:inline-flex;align-items:center}
.accueilV4 .arrow-down svg{display:block}

/* === Portail : l'illustration est décorative et NON interactive
   (pointer-events:none, parties internes aria-hidden) ; SEULE la commande de
   pause reste utilisable (clavier + toucher), conformément à WCAG 2.2.2.
   Toutes largeurs. === */
.accueilV4 .portal-demo-frame{pointer-events:none}
.accueilV4 .pdemo-pause{position:relative;pointer-events:auto}
.accueilV4 .pdemo-pause-icon{font-size:11px;line-height:1;letter-spacing:-1px}
/* cible tactile ≥44px sans agrandir le bouton visuel */
.accueilV4 .pdemo-pause::after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:44px;height:44px}
.accueilV4 .pdemo-pause:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
/* mouvement réduit : rien ne s'anime, la commande de pause n'est pas affichée. */
@media(prefers-reduced-motion:reduce){.accueilV4 .pdemo-pause{display:none}}

@media(max-width:639px){
  /* --- Pourquoi : 3 arguments = liste à filets, même fond que la section,
     sans carte encadrée, sans alternance blanc/bleu nuit/gris, sans filet bleu. --- */
  .accueilV4 #pourquoi .why-list{display:block}
  .accueilV4 #pourquoi .why-row{background:transparent;border:0;border-bottom:1px solid var(--line);border-radius:0;padding:18px 0;margin:0;color:var(--ink);grid-column:auto}
  .accueilV4 #pourquoi .why-row:first-child{border-top:2px solid var(--ink)}
  .accueilV4 #pourquoi .why-row h3{font-family:var(--ff-body);font-weight:400;font-size:15px;line-height:1.35;color:var(--muted);margin:0}
  .accueilV4 #pourquoi .why-emphasis{display:block;font-family:var(--ff-display);font-weight:400;font-size:32px;line-height:1.05;color:var(--blue);margin-top:2px}
  .accueilV4 #pourquoi .why-row p{font-family:var(--ff-body);font-weight:400;font-size:15px;line-height:1.5;color:var(--ink);margin-top:8px}

  /* --- Portail : lisibilité (aucun texte < 13px ; contenus d'onglet ≥ 14px)
     et suppression de la bande blanche vide (hauteur ramenée au contenu). --- */
  .accueilV4 .pdemo *{font-size:13px !important}
  .accueilV4 .pdemo .pdemo-tab{font-size:14px !important}
  .accueilV4 .pdemo .pdemo-stage *{font-size:14px !important}
  .accueilV4 .pdemo .pdemo-stage{min-height:146px !important}
}

/* === « L'équipe » : bande horizontale unique sous 639px ===
   Un seul DOM : les deux groupes (avocats + intervenants techniques) sont
   réunis dans le conteneur de défilement via display:contents ; l'ordre du DOM
   (3 avocats puis 2 techniques) = l'ordre visuel = l'ordre de lecture. Jetons de
   la charte : --blue #1A47FF, --line #E0E0EE, --ink #0A0A14, #4A4A63, #C9CBDA.
   Au-dessus de 639px : aucune règle ici, la grille reste inchangée. */
@media(max-width:639px){
  .accueilV4 #equipe .team-group{display:contents}
  .accueilV4 #equipe .team-group-label{display:none}
  .accueilV4 #equipe .team-grid{
    display:flex;grid-template-columns:none;gap:12px;
    overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;
    /* déborde jusqu'au bord de l'écran, retrait intérieur = marge (20px) */
    margin-left:-20px;margin-right:-20px;padding:2px 20px;
    scrollbar-width:none;-ms-overflow-style:none;
  }
  .accueilV4 #equipe .team-grid::-webkit-scrollbar{display:none}
  .accueilV4 #equipe .team-grid:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
  .accueilV4 #equipe .person-card{
    flex:0 0 min(280px,78vw);scroll-snap-align:start;
    display:block;width:auto;max-width:none;margin:0;
    background:#fff;border:1px solid var(--line);border-radius:0;box-shadow:none;
  }
  .accueilV4 #equipe .person-photo{width:100%;aspect-ratio:4/3}
  .accueilV4 #equipe .person-photo img{width:100%;height:100%;object-fit:cover}
  .accueilV4 #equipe .person-info{padding:14px 15px 16px}
  .accueilV4 #equipe .person-status{font:400 12px/1.4 var(--ff-mono);text-transform:uppercase;letter-spacing:.06em;color:var(--blue);margin:0}
  .accueilV4 #equipe .person-status-tech{color:#4A4A63}
  .accueilV4 #equipe .person-card h3{font-family:var(--ff-body);font-weight:600;font-size:19px;line-height:1.2;margin:6px 0 0;min-height:0}
  .accueilV4 #equipe .person-role{font-size:14px;line-height:1.45;color:#4A4A63;margin-top:6px;min-height:0}
  .accueilV4 #equipe .person-expertise{font-size:14px;line-height:1.45;color:var(--ink);margin-top:8px;padding-top:0;border-top:0}
  /* pas d'effet de survol sous 639 (tactile) : le zoom d'image ne se déclenche pas. */
  .accueilV4 #equipe .person-card:hover img{transform:none}
  /* indicateur de position (décoratif) */
  .accueilV4 #equipe .team-dots{display:flex;gap:6px;justify-content:center;margin-top:16px}
  .accueilV4 #equipe .team-dot{width:6px;height:3px;background:#C9CBDA}
  .accueilV4 #equipe .team-dot.active{width:18px;background:var(--blue)}
}
@media(max-width:639px) and (prefers-reduced-motion:reduce){
  .accueilV4 #equipe .team-grid{scroll-behavior:auto}
}

/* === Mot tournant du hero : hauteur STABLE = celle de l'état final.
   L'état final (index 0) reste dans le flux et fixe la hauteur du bloc ; les
   états 1→8 sont superposés en absolu (ils n'influent pas sur la hauteur → aucun
   décalage de mise en page). Les états trop longs sont réduits en taille par le
   JS (fitWords) pour tenir dans cette hauteur. Toutes largeurs. === */
.accueilV4 .rotating{display:block;position:relative;min-height:0}
.accueilV4 .rotating>span{grid-area:auto}
.accueilV4 .rotating>span:not(:first-child){position:absolute;top:0;left:0;right:0}
`;

/* Mot tournant du hero. Index 0 = état FINAL « droit du numérique » : c'est lui
   qui est rendu actif au chargement (DOM/SEO/sans-JS). L'animation (JS) parcourt
   rapidement les états 1→8 puis s'arrête définitivement sur l'index 0. */
const ROTATING = [
  "droit du numérique",
  "droit de l’intelligence artificielle",
  "droit des données personnelles",
  "droit de la cybersécurité",
  "droit de l’informatique",
  "droit pénal du numérique",
  "droit de la presse",
  "droit des crypto-actifs",
  "droit des fusions-acquisitions",
];

/* Descriptions LONGUES de la home, rattachées par href (contenu inchangé). Les
   INTITULÉS et l’ORDRE des domaines viennent désormais de la source unique
   nav-data.ts (MENU_FAMILLES) : la home ne porte plus ses propres intitulés
   (audit — lot 3). */
const LONG_DESC: Record<string, string> = {
  "/nos-domaines/rgpd-donnees-personnelles": "Mettre l’entreprise en conformité avec les règles encadrant le traitement des données personnelles et réagir à un contrôle de la CNIL ou à une violation de données.",
  "/nos-domaines/avocat-intelligence-artificielle": "Encadrer l’utilisation ou le développement d’outils d’IA par l’entreprise et organiser sa conformité à l’AI Act.",
  "/nos-domaines/cybersecurite": "Assurer la gestion des risques d’incidents et respecter les exigences de sécurité, y compris les dispositions de NIS 2.",
  "/nos-domaines/contrats-informatiques": "Négocier ou sécuriser un contrat SaaS, cloud, de développement ou d’infogérance.",
  "/nos-domaines/ma-tech": "Identifier les risques liés aux logiciels, données, contrats et actifs numériques avant une acquisition.",
  "/nos-domaines/crypto-actifs-blockchain": "Sécuriser une activité liée aux crypto-actifs et respecter les obligations issues du règlement MiCA.",
  "/nos-domaines/contentieux-informatique-commercial": "Intervenir lorsque le projet informatique rencontre une difficulté d’exécution, lorsque le prestataire ne respecte pas ses engagements ou lorsqu’une expertise s’avère nécessaire.",
  "/nos-domaines/cybercriminalite": "Réagir à une intrusion, un rançongiciel, un vol de données ou une cyberattaque.",
  "/nos-domaines/escroquerie-fraude-bancaire": "Contester les opérations frauduleuses et demander le remboursement des sommes détournées.",
  "/nos-domaines/diffamation-retrait-contenus": "Faire retirer un contenu, identifier son auteur ou défendre une personne contre une atteinte à sa réputation.",
};

/* Numéro + phrase d’accroche par famille, dans l’ordre de MENU_FAMILLES. */
const FAMILY_META = [
  { num: "01", but: "Organiser vos obligations." },
  { num: "02", but: "Sécuriser vos projets et vos engagements." },
  { num: "03", but: "Réagir en cas de litige ou d’infraction numérique." },
];

/**
 * Descriptions COURTES (une ligne) — source unique réutilisée : le méga-menu
 * DOMAINES (`nav-data.ts` → `contexte`), rattachées par `href`. Affichées à la
 * place des descriptions longues UNIQUEMENT sous 640px (version mobile
 * compacte) ; aucun texte n'est recopié en dur ici.
 */
const SHORT_DESC: Record<string, string> = Object.fromEntries(
  MENU_FAMILLES.flatMap((f) => f.domaines.map((d) => [d.href, d.contexte])),
);

/* Dossiers de la home (audit 24 sept. 2026). Format court : libellé, titre, UN
   SEUL paragraphe, lien — à toutes les largeurs (plus de rubriques situation/
   issue). Insécable dans « 80 000 € ». Aucune page dédiée n'existe : les trois
   liens pointent provisoirement vers /cas-clients. */
const CASES = [
  {
    id: "cas-accueil-1",
    href: "/cas-clients",
    kicker: "01 / CYBERATTAQUE",
    titre: "Un piratage. 80\u00A0000\u00A0€ d’appels internationaux facturés.",
    para: "L’opérateur soutenait que les appels provenaient du système de l’entreprise. Nous avons retracé l’intrusion et identifié la faille exploitée. La facture a été annulée.",
  },
  {
    id: "cas-accueil-2",
    href: "/cas-clients",
    kicker: "02 / CONTRAT INFORMATIQUE",
    titre: "Le logiciel était livré. L’entreprise ne pouvait toujours pas l’utiliser.",
    para: "Le prestataire réclamait le solde du contrat. Nous avons fait constater les fonctions manquantes et leur effet sur l’activité. L’entreprise a obtenu la résiliation du contrat et le remboursement des sommes versées.",
  },
  {
    id: "cas-accueil-3",
    href: "/cas-clients",
    kicker: "03 / DONNÉES PERSONNELLES",
    titre: "Une fuite de données. Des clients qui demandaient des comptes.",
    para: "Il fallait établir ce qui avait été exposé, notifier les personnes concernées et répondre aux partenaires commerciaux. Nous avons coordonné l’analyse technique et la réponse juridique. L’entreprise a conservé ses contrats majeurs et évité une rupture de confiance.",
  },
];

const LAWYERS = [
  { nom: "Alexandre Lazarègue", statut: "Avocat", role: "Avocat au barreau de Paris", exp: "Cybercriminalité et gestion de crise", photo: "/images/alexandre-pro.jpg", pos: "center 22%" },
  { nom: "Sarah Hinderer", statut: "Avocate", role: "Avocate aux barreaux de Paris et de Montréal", exp: "Données personnelles et intelligence artificielle", photo: "/images/equipe/sarah-hinderer.webp", pos: "center top" },
  { nom: "Amir Ben Majed", statut: "Avocat", role: "Avocat au barreau d’Évry", exp: "Contrats IT et contentieux informatique", photo: "/images/amir-pro.jpg", pos: "center 22%" },
];
const TECHNICAL = [
  { nom: "Khalid Sookia", statut: "Appui technique", role: "Consultant en cybersécurité", exp: "Investigation numérique", photo: "/images/khalid-pro.jpg", pos: "center 22%" },
  { nom: "Nadia Abchiche-Mimouni", statut: "Appui technique", role: "Maîtresse de conférences en informatique à l’Université Côte d’Azur", exp: "Intelligence artificielle et éthique algorithmique", photo: "/images/nadia-pro.jpg", pos: "center 22%" },
];

const CONTRIBUTIONS = [
  { media: "Le Monde", role: "Tribune", date: "21 juin 2026", titre: "IA : « L’Europe doit transformer les discours sur la souveraineté numérique en une véritable stratégie industrielle »", topic: "IA et souveraineté numérique", url: "https://www.lemonde.fr/idees/article/2026/06/21/ia-l-europe-doit-transformer-les-discours-sur-la-souverainete-numerique-en-une-veritable-strategie-industrielle_6706105_3232.html", access: "Accès abonnés sur Le Monde" },
  { media: "Capital", role: "Interview", date: "2 septembre 2026", titre: "Piratage bancaire : votre banque doit-elle vraiment vous rembourser ?", topic: "Cyberfraude bancaire et contestation des paiements", url: "https://www.capital.fr/votre-argent/piratage-bancaire-dans-quels-cas-votre-banque-doit-elle-obligatoirement-vous-rembourser-1529747", access: "" },
  { media: "Le Revenu", role: "Tribune", date: "23 octobre 2024", titre: "Fraude bancaire en ligne : les banques se dérobent, les épargnants paient le prix", topic: "Fraude bancaire, phishing et spoofing", url: "https://www.lerevenu.com/diversifier-placements/placements-divers/fraude-bancaire-en-ligne-les-banques-se-derobent-les-epargnants-paient-le-prix/", access: "" },
  { media: "The Media Leader", role: "Tribune", date: "21 mars 2024", titre: "L’European Freedom Act : un pas en avant ou une entrave à la liberté de presse ? – par Alexandre Lazarègue", topic: "Régulation des médias, plateformes et libertés", url: "https://fr.themedialeader.com/leuropean-freedom-act-un-pas-en-avant-ou-une-entrave-a-la-liberte-de-presse-par-alexandre-lazaregue/", access: "" },
  { media: "Le Monde", role: "Tribune", date: "22 décembre 2025", titre: "Piratage du ministère de l’intérieur : « La numérisation de nos données administratives est un défi à l’Etat de droit »", topic: "Cyberattaque, données publiques et libertés", url: "https://www.lemonde.fr/idees/article/2025/12/22/piratage-du-ministere-de-l-interieur-la-numerisation-de-nos-donnees-administratives-est-un-defi-a-l-etat-de-droit_6659106_3232.html", access: "Accès abonnés sur Le Monde" },
  { media: "DirectIndustry", role: "Tribune · En anglais", date: "3 août 2026", titre: "OP-ED. On August 2, 2026, Business Leaders Have Become Accountable for Artificial Intelligence", topic: "IA en entreprise et gouvernance", url: "https://emag.directindustry.com/2026/08/03/op-ed-on-august-2-2026-business-leaders-have-become-accountable-for-artificial-intelligence/", access: "" },
  { media: "Le Monde", role: "Tribune", date: "4 septembre 2024", titre: "Affaire Pavel Durov : « La justice française se fait une conception curieuse et extensive de la complicité »", topic: "Plateformes numériques et responsabilité pénale", url: "https://www.lemonde.fr/idees/article/2024/09/04/affaire-pavel-durov-la-justice-francaise-se-fait-une-conception-curieuse-et-extensive-de-la-complicite_6304037_3232.html", access: "Accès abonnés sur Le Monde" },
  { media: "Le Monde", role: "Tribune", date: "16 novembre 2022", titre: "Clearview AI : « On mesure à la lecture du raisonnement de la CNIL l’insécurité juridique qui pèse sur nos données personnelles »", topic: "Données personnelles et reconnaissance faciale", url: "https://www.lemonde.fr/idees/article/2022/11/16/clearview-ai-on-mesure-a-la-lecture-du-raisonnement-de-la-cnil-l-insecurite-juridique-qui-pese-sur-nos-donnees-personnelles_6150158_3232.html", access: "Accès abonnés sur Le Monde" },
];

function PersonCard({ p }: { p: (typeof LAWYERS)[number] }) {
  const isTech = p.statut === "Appui technique";
  return (
    <article className="person-card">
      <div className="person-photo">
        <Image src={p.photo} alt={`Portrait de ${p.nom}`} fill sizes="(max-width:639px) 280px, (max-width:1100px) 33vw, 220px" style={{ objectFit: "cover", objectPosition: p.pos }} />
      </div>
      <div className="person-info">
        <p className={`person-status${isTech ? " person-status-tech" : ""}`}>{p.statut}</p>
        <h3>{p.nom}</h3>
        <p className="person-role">{p.role}</p>
        <p className="person-expertise">{p.exp}</p>
      </div>
    </article>
  );
}

export function AccueilV4() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mountGlobe, setMountGlobe] = useState(false);
  // Index du mot tournant du hero. Piloté par un ÉTAT React (et non par une
  // manipulation directe de classe) pour survivre aux re-rendus du composant.
  const [activeWord, setActiveWord] = useState(0);

  // Le canvas THREE n'est monté qu'au-dessus du seuil où le globe est visible
  // (851px), jamais sous 850px (le CSS y masque .hero-art).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 851px)");
    const sync = () => setMountGlobe(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* ---- Équipe en bande horizontale (≤639px uniquement) ----
     Un seul DOM : les deux groupes sont réunis dans le même conteneur de
     défilement via `display:contents` (CSS). Le conteneur reçoit role/tabindex/
     nom et la navigation clavier SEULEMENT sous 639px ; l'indicateur de position
     reflète le défilement réel (IntersectionObserver). Au-dessus : rien. */
  const [teamMobile, setTeamMobile] = useState(false);
  const [teamActive, setTeamActive] = useState(0);
  const teamGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setTeamMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!teamMobile) return;
    const grid = teamGridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".person-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = cards.indexOf(e.target as HTMLElement);
            if (idx >= 0) setTeamActive(idx);
          }
        });
      },
      { root: grid, threshold: [0.6] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [teamMobile]);

  const onTeamKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const grid = teamGridRef.current;
    if (!grid) return;
    e.preventDefault();
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".person-card"));
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = Math.min(Math.max(teamActive + delta, 0), cards.length - 1);
    cards[next]?.scrollIntoView({ inline: "start", block: "nearest" });
  };

  // Interactions portées de la maquette (app.js), bornées à la racine.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ---- Titre tournant : défilement RAPIDE (≈300 ms) des états 1→8 puis
       ARRÊT DÉFINITIF sur « droit du numérique » (index 0). Aucune boucle,
       aucune reprise. Sous mouvement réduit : état final direct. ---- */
    const rotating = root.querySelector<HTMLElement>(".rotating");
    const words = rotating
      ? Array.from(rotating.querySelectorAll<HTMLElement>(":scope > span"))
      : [];
    if (words.length) {
      // Hauteur stable = hauteur de l'état final ; les états plus longs voient
      // leur taille de caractère réduite pour tenir dans cette hauteur. (Les
      // tailles inline ne sont pas contrôlées par React → elles survivent aux
      // re-rendus.)
      const fitWords = () => {
        words.forEach((s) => (s.style.fontSize = ""));
        const finalH = words[0].getBoundingClientRect().height;
        words.forEach((s, i) => {
          if (i === 0) return;
          let guard = 0;
          while (s.getBoundingClientRect().height > finalH + 1 && guard < 30) {
            const cur = parseFloat(getComputedStyle(s).fontSize);
            s.style.fontSize = `${Math.max(12, cur * 0.95)}px`;
            guard += 1;
          }
        });
      };
      fitWords();
      window.addEventListener("resize", fitWords);
      cleanups.push(() => window.removeEventListener("resize", fitWords));

      if (!reduced.matches && words.length > 1) {
        let step = 1;
        setActiveWord(step);
        const iv = setInterval(() => {
          step += 1;
          if (step >= words.length) {
            setActiveWord(0); // arrêt définitif sur « droit du numérique »
            clearInterval(iv);
            return;
          }
          setActiveWord(step);
        }, 300);
        cleanups.push(() => clearInterval(iv));
      }
    }

    /* ---- Commande de pause du hero : elle ne pilote plus le mot (animation
       courte et non bouclée) mais uniquement le globe THREE, via l'événement. ---- */
    const pauseBtn = root.querySelector<HTMLButtonElement>("#motion-control");
    if (pauseBtn) {
      let paused = reduced.matches;
      const reflect = () => {
        pauseBtn.setAttribute("data-paused", String(paused));
        pauseBtn.querySelector(".motion-icon")!.textContent = paused ? "▷" : "Ⅱ";
        pauseBtn.setAttribute("aria-label", paused ? "Reprendre l’animation" : "Mettre l’animation en pause");
        document.dispatchEvent(new CustomEvent("accueilv4:motion", { detail: { paused } }));
      };
      const onPause = () => { paused = !paused; reflect(); };
      pauseBtn.addEventListener("click", onPause);
      reflect();
      cleanups.push(() => pauseBtn.removeEventListener("click", onPause));
    }

    /* ---- Carrousel de presse ---- */
    const track = root.querySelector<HTMLElement>("#press-track");
    const prev = root.querySelector<HTMLButtonElement>("#press-prev");
    const next = root.querySelector<HTMLButtonElement>("#press-next");
    const counter = root.querySelector<HTMLElement>("#press-counter");
    const announcer = root.querySelector<HTMLElement>("#press-announcer");
    if (track && prev && next && counter) {
      const cards = [...track.children] as HTMLElement[];
      const visibleRange = (): [number, number] => {
        const rect = track.getBoundingClientRect();
        const vis = cards
          .map((card, i) => ({ i, r: card.getBoundingClientRect() }))
          .filter((x) => Math.min(x.r.right, rect.right) - Math.max(x.r.left, rect.left) >= x.r.width * 0.5);
        return vis.length ? [vis[0].i + 1, vis[vis.length - 1].i + 1] : [1, 1];
      };
      const update = () => {
        const [first, last] = visibleRange();
        counter.textContent = (first === last ? `${first}` : `${first}–${last}`) + " / " + cards.length;
        prev.disabled = track.scrollLeft < 3;
        next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      };
      const move = (dir: number) => {
        const cw = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const step = cw + gap;
        const current = Math.round(track.scrollLeft / step);
        track.scrollTo({ left: (current + dir) * step, behavior: reduced.matches ? "instant" : "smooth" });
        setTimeout(() => { update(); if (announcer) announcer.textContent = "Contributions " + counter.textContent; }, 400);
      };
      const onPrev = () => move(-1);
      const onNext = () => move(1);
      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
      track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
      if ("fonts" in document) (document as Document).fonts.ready.then(update);
      cleanups.push(() => {
        prev.removeEventListener("click", onPrev);
        next.removeEventListener("click", onNext);
        track.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      });
    }

    /* ---- Archive presse (liste complète) ---- */
    const archiveToggle = root.querySelector<HTMLButtonElement>("#archive-toggle");
    const archive = root.querySelector<HTMLElement>("#press-archive");
    if (archiveToggle && archive) {
      archive.hidden = true;
      const onToggle = () => {
        const expanded = archiveToggle.getAttribute("aria-expanded") === "true";
        archiveToggle.setAttribute("aria-expanded", String(!expanded));
        archive.hidden = expanded;
        archiveToggle.innerHTML = expanded
          ? 'Voir la sélection complète <span class="arrow" aria-hidden="true">↓</span>'
          : 'Replier la sélection <span class="arrow" aria-hidden="true">↑</span>';
      };
      archiveToggle.addEventListener("click", onToggle);
      cleanups.push(() => archiveToggle.removeEventListener("click", onToggle));
    }

    /* ---- Accent bleu des dossiers : au SURVOL uniquement, et seulement sur
       les appareils à pointeur précis (souris/stylet). Sur écran tactile, aucune
       activation → la carte ne reste jamais bleue après un toucher. ---- */
    const grid = root.querySelector<HTMLElement>(".case-grid");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (grid && finePointer) {
      const cards = [...grid.querySelectorAll<HTMLElement>(":scope > .case-card")];
      if (cards.length) {
        let keyboardInput = true;
        let hovered: HTMLElement | null = null;
        let touchSelection: HTMLElement | null = null;
        let tap: { id: number; card: HTMLElement; x: number; y: number; time: number; sx: number; sy: number; moved: boolean } | null = null;
        const interactive = 'a,button,input,select,textarea,summary,[role="button"],[role="link"]';
        const cardAt = (t: EventTarget | null) => {
          const c = t instanceof Element ? t.closest<HTMLElement>(".case-card") : null;
          return c && cards.includes(c) ? c : null;
        };
        const activate = (card: HTMLElement | null) => cards.forEach((it) => it.classList.toggle("is-active", it === card));
        const kbCard = () => (keyboardInput ? cardAt(document.activeElement) : null);
        const onKeydownDoc = () => { keyboardInput = true; };
        const onPointerdownDoc = () => { keyboardInput = false; };
        document.addEventListener("keydown", onKeydownDoc, true);
        document.addEventListener("pointerdown", onPointerdownDoc, { capture: true, passive: true });
        activate(cards[0]);
        const onOver = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
          const c = cardAt(e.target);
          if (c) { hovered = c; activate(kbCard() || c); }
        };
        const onLeave = (e: PointerEvent) => {
          if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
          hovered = null; activate(kbCard() || cards[0]);
        };
        const onFocusin = (e: FocusEvent) => { const c = cardAt(e.target); if (c && keyboardInput) activate(c); };
        const onKeydown = (e: KeyboardEvent) => { const c = cardAt(e.target); if (c) activate(c); };
        const onFocusout = () => queueMicrotask(() => activate(kbCard() || hovered || touchSelection || cards[0]));
        const onDown = (e: PointerEvent) => {
          if (e.pointerType !== "touch") return;
          const c = cardAt(e.target);
          if (!e.isPrimary || !c || (e.target as Element).closest(interactive)) { tap = null; return; }
          tap = { id: e.pointerId, card: c, x: e.clientX, y: e.clientY, time: e.timeStamp, sx: window.scrollX, sy: window.scrollY, moved: false };
        };
        const onMove = (e: PointerEvent) => { if (tap && e.pointerId === tap.id && Math.hypot(e.clientX - tap.x, e.clientY - tap.y) > 10) tap.moved = true; };
        const onCancel = () => { tap = null; };
        const onUp = (e: PointerEvent) => {
          if (!tap || e.pointerId !== tap.id) return;
          const cand = tap; tap = null;
          if (cand.moved || e.timeStamp - cand.time > 500 || Math.hypot(e.clientX - cand.x, e.clientY - cand.y) > 10) return;
          if (Math.abs(window.scrollX - cand.sx) > 2 || Math.abs(window.scrollY - cand.sy) > 2) return;
          const r = cand.card.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
          hovered = null; touchSelection = cand.card; activate(touchSelection);
        };
        grid.addEventListener("pointerover", onOver, { passive: true });
        grid.addEventListener("pointerleave", onLeave, { passive: true });
        grid.addEventListener("focusin", onFocusin);
        grid.addEventListener("keydown", onKeydown);
        grid.addEventListener("focusout", onFocusout);
        grid.addEventListener("pointerdown", onDown, { passive: true });
        grid.addEventListener("pointermove", onMove, { passive: true });
        grid.addEventListener("pointercancel", onCancel, { passive: true });
        grid.addEventListener("pointerup", onUp, { passive: true });
        cleanups.push(() => {
          document.removeEventListener("keydown", onKeydownDoc, true);
          document.removeEventListener("pointerdown", onPointerdownDoc, { capture: true } as EventListenerOptions);
        });
      }
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div className="accueilV4" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: ACCUEIL_V4_CSS + ACCUEIL_V4_OVERRIDES }} />

      {/* ============ HERO ============ */}
      <section className="hero dark" aria-labelledby="titre-accueil">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">PARIS · DEPUIS 2016</p>
              <h1 id="titre-accueil">
                <span className="sr-only">Votre cabinet d&rsquo;avocats en droit du numérique</span>
                <span aria-hidden="true">
                  <span className="hero-prefix">Votre cabinet<br />d&rsquo;avocats en</span>
                  <span className="rotating">
                    {ROTATING.map((w, i) => (
                      <span key={w} className={i === activeWord ? "active" : ""}>{w}</span>
                    ))}
                  </span>
                </span>
              </h1>
              <p className="hero-copy">
                <strong>Conseil juridique et représentation des entreprises</strong> confrontées aux risques, aux projets et aux litiges liés au monde numérique.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#contact">Exposer votre situation à un avocat <span className="arrow" aria-hidden="true">→</span></a>
                <a className="text-link" href="#domaines">Voir nos domaines</a>
              </div>
              <button id="motion-control" className="motion-control" type="button" aria-label="Mettre l’animation en pause">
                <span className="motion-icon" aria-hidden="true">&#x2161;</span>
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <p className="hero-atlas-label">Atlas interactif du droit du numérique</p>
              {mountGlobe ? <HeroGlobeThree /> : null}
            </div>
          </div>
          <div className="hero-baseline">
            <span><i className="square" aria-hidden="true" />Intervention partout en France</span>
          </div>
        </div>
      </section>

      {/* ============ INTRO / CABINET ============ */}
      <section id="cabinet" className="section intro" aria-labelledby="titre-cabinet">
        <div className="wrap">
          <figure className="team-panorama">
            <Image src="/images/equipe-panorama.webp" alt={"Visuel collectif de l’équipe du cabinet"} width={1800} height={792} priority sizes="(max-width:1200px) 100vw, 1200px" />
          </figure>
          <div className="intro-body">
            <div>
              <span className="eyebrow">Le cabinet</span>
              <h2 id="titre-cabinet">Avocats et experts techniques, une même équipe.</h2>
            </div>
            <div>
              <p>Lazarègue Avocats réunit des avocats et des experts en cybersécurité et en intelligence artificielle pour conseiller et représenter les entreprises en droit du numérique et des nouvelles technologies. Établi à Paris, le cabinet intervient dans toute la France.</p>
              <a className="text-link" href="#equipe">Rencontrer l&rsquo;équipe <span className="arrow arrow-down" aria-hidden="true"><svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 1.25v9.5M2.25 7L6 10.75 9.75 7" /></svg></span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOMAINES ============ */}
      <section id="domaines" className="section soft" aria-labelledby="titre-domaines">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Domaines d&rsquo;intervention</span>
              <h2 id="titre-domaines">Dix domaines, trois familles.</h2>
            </div>
            <p>Trouvez le domaine qui correspond à votre situation.</p>
          </div>
          <div className="domain-groups">
            {MENU_FAMILLES.map((fam, fi) => (
              <section className="domain-family" aria-labelledby={`family-${fi}`} key={fam.intitule}>
                <div className="family-heading">
                  <span className="family-number" aria-hidden="true">{FAMILY_META[fi].num}</span>
                  <h3 id={`family-${fi}`}>{fam.intitule}</h3>
                  <p className="family-purpose">{FAMILY_META[fi].but}</p>
                </div>
                <ul className="domain-list">
                  {fam.domaines.map((d) => (
                    <li className="domain-item" key={d.href}>
                      <Link className="domain-entry" href={d.href}>
                        <span className="domain-entry-head">
                          <span className="domain-title">{d.titre}</span>
                          <span className="arrow" aria-hidden="true">→</span>
                        </span>
                        <span className="domain-description">{LONG_DESC[d.href]}</span>
                        {SHORT_DESC[d.href] ? (
                          <span className="domain-description-short">{SHORT_DESC[d.href]}</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {/* Lien final — visible uniquement en version mobile compacte (≤639px). */}
          <Link className="domains-all-mobile" href="/nos-domaines">
            Voir tous les domaines <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ============ POURQUOI + PORTAIL ============ */}
      <section id="pourquoi" className="section" aria-labelledby="titre-pourquoi">
        <div className="wrap">
          <div className="why-layout">
            <div>
              <span className="eyebrow">Pourquoi le cabinet</span>
              <h2 id="titre-pourquoi">Le droit du numérique,<br />notre seul métier.</h2>
            </div>
            <ul className="why-list">
              <li className="why-row">
                <div><h3>Un cabinet dédié au <span className="why-emphasis">numérique</span></h3><p>Du contrat informatique au contentieux pénal des systèmes d&rsquo;information&#160;: aucune autre matière.</p></div>
              </li>
              <li className="why-row">
                <div><h3>Une équipe <span className="why-emphasis">juridique et technique</span></h3><p>L&rsquo;analyse juridique est confrontée aux réalités techniques du dossier avant toute stratégie.</p></div>
              </li>
              <li className="why-row">
                <div><h3>Une pratique du numérique <span className="why-emphasis">depuis 2016</span></h3><p>Dix ans de pratique exclusive, en conseil comme devant les juridictions.</p></div>
              </li>
            </ul>
          </div>
          <div className="portal-strip">
            <div>
              <span className="eyebrow">Le suivi de votre dossier</span>
              <h3>Votre dossier accessible à tout moment.</h3>
              <p>Chaque client dispose d&rsquo;un espace personnel réunissant les documents, les échanges, les échéances et l&rsquo;avancement de son dossier.</p>
            </div>
            <div className="portal-demo-frame">
              <PortailDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ============ DOSSIERS ============ */}
      <section id="dossiers" className="section" aria-labelledby="titre-dossiers">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Dossiers traités</span>
              <h2 id="titre-dossiers">Trois dossiers, trois stratégies.</h2>
            </div>
          </div>
          <div className="case-grid">
            {CASES.map((c) => (
              <article className="case-card" key={c.id}>
                <div><p className="case-kicker">{c.kicker}</p><h3><Link className="case-card-link" href={c.href} aria-label={`Découvrir le cas : ${c.titre}`}>{c.titre}</Link></h3></div>
                <p className="case-para">{c.para}</p>
                <span className="case-detail-link" aria-hidden="true">Découvrir le cas <span className="arrow">→</span></span>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="text-link" href="/cas-clients">
              Voir tous les cas clients <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ============ ÉQUIPE ============ */}
      <section id="equipe" className="section soft" aria-labelledby="titre-equipe">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">L&rsquo;équipe</span>
              <h2 id="titre-equipe">Des avocats qui comprennent le code.<br />Des experts techniques qui comprennent le droit.</h2>
            </div>
          </div>
          <div
            className="team-grid"
            ref={teamGridRef}
            {...(teamMobile
              ? {
                  role: "region",
                  tabIndex: 0,
                  "aria-label":
                    "L'équipe : trois avocats et deux intervenants techniques",
                  onKeyDown: onTeamKeyDown,
                }
              : {})}
          >
            <div className="team-group team-group-lawyers" role="group" aria-labelledby="groupe-avocats">
              <p className="team-group-label" id="groupe-avocats">Les avocats</p>
              {LAWYERS.map((p) => <PersonCard key={p.nom} p={p} />)}
            </div>
            <div className="team-group team-group-technical" role="group" aria-labelledby="groupe-technique">
              <p className="team-group-label" id="groupe-technique">Les intervenants techniques</p>
              {TECHNICAL.map((p) => <PersonCard key={p.nom} p={p} />)}
            </div>
          </div>
          {teamMobile && (
            <div className="team-dots" aria-hidden="true">
              {Array.from({ length: LAWYERS.length + TECHNICAL.length }).map((_, i) => (
                <span key={i} className={`team-dot${i === teamActive ? " active" : ""}`} />
              ))}
            </div>
          )}
          <p className="technical-note">Les intervenants techniques apportent leur expertise aux côtés des avocats.</p>
        </div>
      </section>

      {/* ============ CONTRIBUTIONS ============ */}
      <section id="contributions" className="section press-section" aria-labelledby="titre-contributions">
        <div className="wrap">
          <div className="section-heading press-heading">
            <div>
              <span className="eyebrow">Contributions et prises de position</span>
              <h2 id="titre-contributions">Dans le débat public.</h2>
            </div>
            <div className="carousel-controls">
              <button id="press-prev" className="round-button" type="button" aria-label="Contributions précédentes">←</button>
              <button id="press-next" className="round-button" type="button" aria-label="Contributions suivantes">→</button>
            </div>
          </div>
          <div id="press-track" className="press-track">
            {CONTRIBUTIONS.map((c) => (
              <article className="press-card" data-media={c.media} key={c.url}>
                <p className="press-media">{c.media}</p>
                <p className="press-meta">{c.role ? <>{c.role}<br /></> : null}{c.date}</p>
                <h3>{c.titre}</h3>
                <p className="topic">{c.topic}</p>
                <a className="text-link" href={c.url} target="_blank" rel="noopener noreferrer">Lire sur {c.media} <span className="arrow" aria-hidden="true">↗</span></a>
                {c.access ? <p className="access">{c.access}</p> : null}
              </article>
            ))}
          </div>
          <div className="press-bottom">
            <span id="press-counter" className="press-counter">1 / {CONTRIBUTIONS.length}</span>
            <button id="archive-toggle" className="text-link" type="button" aria-expanded="false" aria-controls="press-archive">
              Voir la sélection complète <span className="arrow" aria-hidden="true">↓</span>
            </button>
          </div>
          <ul id="press-archive" className="press-archive" hidden>
            {CONTRIBUTIONS.map((c) => (
              <li key={c.url}>
                <a className="archive-link" href={c.url} target="_blank" rel="noopener noreferrer">
                  <span className="archive-medium">{c.media}</span>
                  <span className="archive-title">{c.titre}</span>
                  <span className="archive-date">{c.date}</span>
                </a>
              </li>
            ))}
          </ul>
          <p id="press-announcer" className="sr-only" role="status" aria-live="polite" />
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="section contact dark" aria-labelledby="titre-contact">
        <div className="wrap contact-layout">
          <div>
            <span className="eyebrow">Parlez à un avocat</span>
            <h2 id="titre-contact">Un projet, un incident<br />ou un différend numérique ?</h2>
            <p>Présentez brièvement votre situation. Le cabinet examinera votre demande pour vous indiquer les premières modalités d&rsquo;intervention.</p>
          </div>
          <div className="contact-actions">
            <Link className="btn" href="/contact">Écrire au cabinet <span className="arrow" aria-hidden="true">→</span></Link>
            <a className="contact-phone" href="tel:+33181706200">01 81 70 62 00</a>
          </div>
        </div>
      </section>
    </div>
  );
}
