"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PortailDemo } from "@/components/home/section-differenciateurs";
import { ACCUEIL_V4_CSS } from "@/components/home/accueil-v4-css";

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
`;

const ROTATING = [
  "droit du numérique",
  "intelligence artificielle",
  "données personnelles",
  "cybersécurité",
  "cybercriminalité",
  "contrats informatiques",
  "contentieux informatique",
  "fraude bancaire",
  "crypto-actifs",
  "diffamation",
  "M&A Tech",
];

type Domaine = { titre: string; desc: string; href: string };
const FAMILLES: { num: string; nom: string; but: string; domaines: Domaine[] }[] = [
  {
    num: "01",
    nom: "Conformité et gouvernance",
    but: "Organiser vos obligations.",
    domaines: [
      { titre: "RGPD et données personnelles", desc: "Mettre l’entreprise en conformité avec les règles encadrant le traitement des données personnelles et réagir à un contrôle de la CNIL ou à une violation de données.", href: "/nos-domaines/rgpd-donnees-personnelles" },
      { titre: "Intelligence artificielle et AI Act", desc: "Encadrer l’utilisation ou le développement d’outils d’IA par l’entreprise et organiser sa conformité à l’AI Act.", href: "/nos-domaines/avocat-intelligence-artificielle" },
      { titre: "Cybersécurité et NIS 2", desc: "Assurer la gestion des risques d’incidents et respecter les exigences de sécurité, y compris les dispositions de NIS 2.", href: "/nos-domaines/cybersecurite" },
    ],
  },
  {
    num: "02",
    nom: "Contrats et opérations numériques",
    but: "Sécuriser vos projets et vos engagements.",
    domaines: [
      { titre: "Contrats informatiques", desc: "Négocier ou sécuriser un contrat SaaS, cloud, de développement ou d’infogérance.", href: "/nos-domaines/contrats-informatiques" },
      { titre: "M&A Tech et due diligence", desc: "Identifier les risques liés aux logiciels, données, contrats et actifs numériques avant une acquisition.", href: "/nos-domaines/ma-tech" },
      { titre: "Crypto-actifs et blockchain", desc: "Sécuriser une activité liée aux crypto-actifs et respecter les obligations issues du règlement MiCA.", href: "/nos-domaines/crypto-actifs-blockchain" },
    ],
  },
  {
    num: "03",
    nom: "Contentieux et atteintes numériques",
    but: "Réagir en cas de litige ou d’infraction numérique.",
    domaines: [
      { titre: "Contentieux informatique et commercial", desc: "Intervenir lorsque le projet informatique rencontre une difficulté d’exécution, lorsque le prestataire ne respecte pas ses engagements ou lorsqu’une expertise s’avère nécessaire.", href: "/nos-domaines/contentieux-informatique-commercial" },
      { titre: "Cybercriminalité et atteintes aux systèmes", desc: "Réagir à une intrusion, un rançongiciel, un vol de données ou une cyberattaque.", href: "/nos-domaines/cybercriminalite" },
      { titre: "Escroquerie et fraude bancaire", desc: "Contester les opérations frauduleuses et demander le remboursement des sommes détournées.", href: "/nos-domaines/escroquerie-fraude-bancaire" },
      { titre: "Diffamation et retrait de contenus", desc: "Faire retirer un contenu, identifier son auteur ou défendre une personne contre une atteinte à sa réputation.", href: "/nos-domaines/diffamation-retrait-contenus" },
    ],
  },
];

const CASES = [
  {
    id: "cas-accueil-1",
    href: "/cas-clients/cyberattaque-responsabilite-prestataire-informatique",
    kicker: "01 / CYBERSÉCURITÉ",
    titre: "Une entreprise paralysée met en cause son prestataire informatique",
    situation: "Après une intrusion, l’entreprise ne pouvait plus accéder à plusieurs outils métiers ; son infogérant contestait toute responsabilité et les journaux techniques risquaient d’être perdus.",
    intervention: "Analyse des contrats et des éléments techniques, préservation des preuves et mise en place d’une expertise pour confronter les versions.",
    issue: "Une expertise judiciaire a été ordonnée pour établir les causes et les responsabilités. Dossier clos, issue favorable.",
  },
  {
    id: "cas-accueil-2",
    href: "/cas-clients/virements-frauduleux-plateformes-crypto-recours-banque",
    kicker: "02 / FRAUDE BANCAIRE",
    titre: "Virements frauduleux vers des plateformes crypto : recours contre la banque",
    situation: "Un particulier constatait une série de virements vers différents prestataires de paiement et plateformes de crypto-actifs, étalés sur plusieurs mois.",
    intervention: "Reconstitution de la chronologie, analyse des mécanismes d’authentification et action fondée sur les règles du Code monétaire et financier.",
    issue: "L’action a été menée contre l’établissement bancaire. Dossier clos, issue favorable.",
  },
  {
    id: "cas-accueil-3",
    href: "/cas-clients/dereferencement-google-procedure-judiciaire",
    kicker: "03 / DIFFAMATION ET CONTENUS",
    titre: "Déréférencement Google : une entreprise saisit le juge",
    situation: "Une entreprise et ses dirigeants souhaitaient limiter l’accès, depuis le moteur de recherche, à des contenus liés à une procédure et nuisibles à leur réputation.",
    intervention: "Analyse des contenus et des intérêts en présence, puis engagement d’une procédure pour soumettre la demande de déréférencement au juge.",
    issue: "La demande de déréférencement a été soumise à l’examen du juge. Dossier clos, issue favorable.",
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
  return (
    <article className="person-card">
      <div className="person-photo">
        <Image src={p.photo} alt={`Portrait de ${p.nom}`} fill sizes="(max-width:639px) 100vw, (max-width:1100px) 33vw, 220px" style={{ objectFit: "cover", objectPosition: p.pos }} />
      </div>
      <div className="person-info">
        <p className="person-status">{p.statut}</p>
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

  // Le canvas THREE n'est monté qu'au-dessus du seuil où le globe est visible
  // (851px), jamais sous 850px (le CSS y masque .hero-art).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 851px)");
    const sync = () => setMountGlobe(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Interactions portées de la maquette (app.js), bornées à la racine.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ---- Titre tournant + pause ---- */
    const words = Array.from(root.querySelectorAll<HTMLElement>(".rotating > span"));
    const pauseBtn = root.querySelector<HTMLButtonElement>("#motion-control");
    if (words.length && pauseBtn) {
      let index = 0;
      let paused = reduced.matches;
      let timer: ReturnType<typeof setInterval> | undefined;
      const reflect = () => {
        pauseBtn.setAttribute("data-paused", String(paused));
        pauseBtn.querySelector(".motion-icon")!.textContent = paused ? "▷" : "Ⅱ";
        pauseBtn.setAttribute("aria-label", paused ? "Reprendre l’animation" : "Mettre l’animation en pause");
        // La pause gèle aussi la rotation du globe (le composant THREE écoute cet
        // événement) : « Pause » arrête effectivement les animations du hero.
        document.dispatchEvent(new CustomEvent("accueilv4:motion", { detail: { paused } }));
      };
      const nextWord = () => {
        words[index].classList.remove("active");
        index = (index + 1) % words.length;
        words[index].classList.add("active");
      };
      const schedule = () => {
        if (timer) clearInterval(timer);
        if (!paused && !document.hidden) timer = setInterval(nextWord, 4200);
        reflect();
      };
      const onPause = () => { paused = !paused; schedule(); };
      const onReduce = () => {
        if (reduced.matches) { paused = true; words.forEach((n, i) => n.classList.toggle("active", i === 0)); index = 0; }
        schedule();
      };
      pauseBtn.addEventListener("click", onPause);
      reduced.addEventListener("change", onReduce);
      document.addEventListener("visibilitychange", schedule);
      schedule();
      cleanups.push(() => {
        if (timer) clearInterval(timer);
        pauseBtn.removeEventListener("click", onPause);
        reduced.removeEventListener("change", onReduce);
        document.removeEventListener("visibilitychange", schedule);
      });
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

    /* ---- Accent des dossiers (survol / clavier / tap) ---- */
    const grid = root.querySelector<HTMLElement>(".case-grid");
    if (grid) {
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
                      <span key={w} className={i === 0 ? "active" : ""}>{w}</span>
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
              <h2 id="titre-cabinet">Avocats et experts techniques croisent leurs compétences pour traiter les dossiers de droit du numérique.</h2>
            </div>
            <div>
              <p>Lazarègue Avocats est un cabinet d&rsquo;avocats exclusivement dédié au droit du numérique et des nouvelles technologies, établi à Paris. Depuis 2016, nous conseillons et représentons les entreprises en matière de droit de l&rsquo;informatique. Notre pratique couvre les cyberattaques, les contrats informatiques, l&rsquo;intelligence artificielle, la protection des données et les litiges liés aux plateformes numériques.</p>
              <a className="text-link" href="#equipe">Rencontrer l&rsquo;équipe <span className="arrow" aria-hidden="true">↓</span></a>
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
            {FAMILLES.map((fam, fi) => (
              <section className="domain-family" aria-labelledby={`family-${fi}`} key={fam.num}>
                <div className="family-heading">
                  <span className="family-number" aria-hidden="true">{fam.num}</span>
                  <h3 id={`family-${fi}`}>{fam.nom}</h3>
                  <p className="family-purpose">{fam.but}</p>
                </div>
                <ul className="domain-list">
                  {fam.domaines.map((d) => (
                    <li className="domain-item" key={d.href}>
                      <Link className="domain-entry" href={d.href}>
                        <span className="domain-entry-head">
                          <span className="domain-title">{d.titre}</span>
                          <span className="arrow" aria-hidden="true">→</span>
                        </span>
                        <span className="domain-description">{d.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POURQUOI + PORTAIL ============ */}
      <section id="pourquoi" className="section" aria-labelledby="titre-pourquoi">
        <div className="wrap">
          <div className="why-layout">
            <div>
              <span className="eyebrow">Pourquoi le cabinet</span>
              <h2 id="titre-pourquoi">Le droit du numérique,<br />notre seul métier.</h2>
              <p className="why-intro">Analyser les aspects techniques, évaluer les implications juridiques et concevoir avec vous une stratégie sur mesure.</p>
            </div>
            <ul className="why-list">
              <li className="why-row">
                <div><h3>Un cabinet dédié au <span className="why-emphasis">numérique</span></h3><p>Le droit du numérique est la seule matière du cabinet, du contrat informatique au contentieux pénal des systèmes d&rsquo;information.</p></div>
              </li>
              <li className="why-row">
                <div><h3>Une équipe <span className="why-emphasis">juridique et technique</span></h3><p>Une équipe juridique et technique (avocats et experts en cybersécurité) confronte l&rsquo;analyse juridique aux réalités techniques du dossier.</p></div>
              </li>
              <li className="why-row">
                <div><h3>Une pratique du numérique <span className="why-emphasis">depuis 2016</span></h3><p>Le cabinet intervient depuis 2016 sur les cyberattaques, les données personnelles, l&rsquo;intelligence artificielle, les plateformes et les projets informatiques en difficulté.</p></div>
              </li>
            </ul>
          </div>
          <div className="portal-strip">
            <div>
              <span className="eyebrow">Le suivi de votre dossier</span>
              <h3>Votre dossier accessible à tout moment.</h3>
              <p>Chaque client dispose d&rsquo;un espace personnel réunissant les documents, les échanges, les échéances et l&rsquo;avancement de son dossier. Il bénéficie ainsi d&rsquo;un suivi clair tout au long de notre intervention.</p>
            </div>
            <div className="portal-demo-frame" aria-hidden="true">
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
                <div><p className="case-kicker">{c.kicker}</p><h3><Link className="case-card-link" href={c.href}>{c.titre}</Link></h3></div>
                <dl>
                  <div><dt>La situation</dt><dd>{c.situation}</dd></div>
                  <div><dt>Notre intervention</dt><dd>{c.intervention}</dd></div>
                  <div className="case-outcome"><dt>L&rsquo;issue</dt><dd>{c.issue}</dd></div>
                </dl>
                <span className="case-detail-link" aria-hidden="true">Lire le cas <span className="arrow">→</span></span>
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
            <p>Le droit et les faits techniques,<br />examinés ensemble.</p>
          </div>
          <div className="team-grid">
            <div className="team-group team-group-lawyers" role="group" aria-labelledby="groupe-avocats">
              <p className="team-group-label" id="groupe-avocats">Les avocats</p>
              {LAWYERS.map((p) => <PersonCard key={p.nom} p={p} />)}
            </div>
            <div className="team-group team-group-technical" role="group" aria-labelledby="groupe-technique">
              <p className="team-group-label" id="groupe-technique">Les intervenants techniques</p>
              {TECHNICAL.map((p) => <PersonCard key={p.nom} p={p} />)}
            </div>
          </div>
          <p className="technical-note">Les intervenants techniques apportent leur expertise aux côtés des avocats. Ils n&rsquo;exercent pas la profession d&rsquo;avocat.</p>
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
            <span className="contact-small">18 rue de Tilsitt · Paris 17e · Sur rendez-vous</span>
          </div>
        </div>
      </section>
    </div>
  );
}
