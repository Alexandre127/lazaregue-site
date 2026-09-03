"use client";

import Link from "next/link";
import { FAQ_ITEMS } from "./faq";
import EquipeDossier from "@/components/equipe-dossier";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ── Design system (aligné sur les autres pages compétences + charte graphique) ── */

const BLUE = "#1A47FF";
const RED = "#E24B4A";
const GREEN = "#1F9D6B";

const DARK = {
  bg: "#0a0f2e",
  panel: "#11163a",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.65)",
  border: "rgba(255,255,255,0.2)",
};

const LIGHT = {
  bg: "#f8f8f6",
  panel: "#ffffff",
  panel2: "#f1f1ee",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
};

const INNER: CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 48px" };
const SECTION_PAD = "40px 0";
const CARD_PAD = "16px 18px";
const GRID_GAP = 12;

const TYPE = {
  h2: { fontSize: 24, fontWeight: 500, lineHeight: 1.25 } as const,
  h3: { fontSize: 18, fontWeight: 500, lineHeight: 1.35 } as const,
};

const VIDEO_SRC = "/videos/reportage-reseaux-sociaux.mp4";

/* ── Données ── */

const REFUSAL_LINES = [
  { tag: "Refusé", pre: "", strong: "Google", post: " refuse de déréférencer le résultat." },
  { tag: "En ligne", pre: "", strong: "Meta", post: " laisse le contenu publié." },
  { tag: "Silence", pre: "", strong: "YouTube", post: " ne répond pas à votre signalement." },
  { tag: "Bloqué", pre: "Votre ", strong: "compte", post: " est suspendu, sans explication." },
];

const VIZ_ROWS = [
  { label: "Article — informations obsolètes", status: "Déréférencé" },
  { label: "Vidéo — atteinte à la réputation", status: "Retiré" },
  { label: "Faux profil — usurpation d'identité", status: "Supprimé" },
  { label: "Commentaires anonymes → auteur identifié", status: "Art. 145 CPC" },
];

const STATS = [
  { v: "Art. 145", l: "CPC — lever l'anonymat, obtenir les données de connexion et les IP" },
  { v: "3 statuts", l: "hébergeur · éditeur · responsable de traitement — la qualification décide de tout" },
  { v: "Sans préjudice", l: "le déréférencement n'exige pas de prouver un dommage" },
  { v: "Effet mondial", l: "une injonction de retrait peut porter au-delà des frontières" },
];

const ARC = [
  { n: 1, title: "Vous découvrez", text: "Un contenu vous vise, ou votre compte est bloqué." },
  { n: 2, title: "Vous signalez", text: "Via le formulaire de la plateforme." },
  { n: 3, title: "On refuse", text: "Contenu « conforme », ou aucune réponse." },
  { n: 4, title: "Vous perdez", text: "Clients, abonnés, réputation, sérénité." },
  { n: 5, title: "Vous êtes bloqué", text: "Vous ne savez plus vers qui vous tourner." },
  { n: 6, title: "Nous intervenons", text: "Notification opposable, référé, retrait.", on: true },
];

const PROFILES = [
  {
    title: "Vous êtes une entreprise",
    items: [
      "Une plateforme laisse en ligne des contenus qui vous nuisent.",
      "Google refuse de déréférencer un résultat préjudiciable.",
      "Votre marque est vendue ou détournée sur une marketplace.",
      "Votre compte professionnel a été suspendu sans explication.",
      "De faux avis ou un concurrent dégradent votre réputation.",
    ],
  },
  {
    title: "Vous êtes un particulier",
    items: [
      "Une vidéo ou un article porte atteinte à votre réputation.",
      "Des photos ou des données sont diffusées sans votre accord.",
      "Des informations anciennes remontent sur Google.",
      "Un faux profil usurpe votre identité.",
      "Vous êtes harcelé·e et la plateforme refuse d'agir.",
    ],
  },
];

const PLATFORMS = [
  "Google", "Meta", "Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube",
  "X", "Amazon", "Leboncoin", "Airbnb", "Booking", "Apple", "Microsoft", "OVHcloud",
];

const PROBLEMS = [
  { title: "Faire retirer un contenu", text: "Vous avez signalé un contenu mais la plateforme refuse d'intervenir. Nous analysons la régularité de votre notification — description et localisation des faits — et mettons en œuvre les recours adaptés, jusqu'au référé.", tags: "Notification · Référé de retrait" },
  { title: "Faire supprimer un résultat Google", text: "Des informations anciennes, non pertinentes ou excessives vous concernant remontent dans les moteurs. Nous analysons les conditions du déréférencement et contestons les refus du moteur ou de l'autorité de contrôle.", tags: "Déréférencement · Droit à l'oubli" },
  { title: "Défendre votre marque", text: "Votre marque est utilisée sur une marketplace, dans une publicité ou un lien sponsorisé. Nous qualifions les usages litigieux et organisons les actions d'interdiction et d'injonction ciblée.", tags: "Marque · Marketplace" },
  { title: "Défendre une plateforme", text: "Vous exploitez un service en ligne et votre responsabilité est recherchée. Nous déterminons votre régime juridique, sécurisons votre exonération et organisons votre défense face à une assignation ou une injonction.", tags: "Hébergeur · Exonération" },
  { title: "Protéger votre réputation en ligne", text: "Diffamation, dénigrement, usurpation d'identité, faux avis, publication de données personnelles. Nous obtenons des ordonnances ciblées de retrait des contenus identiques et équivalents.", tags: "Diffamation · Réputation" },
  { title: "Gérer une crise numérique", text: "Diffusion illicite, contrefaçon, atteinte massive. Nous sécurisons les preuves, évaluons la connaissance effective, définissons les délais de réaction et pilotons les relations avec les autorités.", tags: "Gestion de crise · Preuve" },
];

const SCENE = [
  { tone: "note" as const, k: "Étape 1 — Votre signalement", h: "Vous demandez le retrait à la plateforme", p: "Vous utilisez le formulaire interne et joignez vos preuves. Rien ne bouge.", letter: { to: "Équipe Contenus — Plateforme", objet: "Signalement d'un contenu portant atteinte à la vie privée", message: "« Merci de retirer la publication accessible à l'adresse […]. »" } },
  { tone: "refus" as const, k: "Étape 2 — Le refus", h: "« Contenu conforme à nos règles »", p: "Réponse automatique de rejet — ou silence total pendant des semaines. Un signalement, seul, n'engage rien." },
  { tone: "law" as const, k: "Étape 3 — Ce que dit la jurisprudence", h: "Un signalement n'est pas une notification", p: "L'obligation de retrait prompt de l'hébergeur ne se déclenche qu'avec une notification régulière — description et localisation précises des faits (Cass. 1re civ., 17 fév. 2011). Et un hébergeur, même exonéré, peut se voir enjoindre le retrait (CJUE, 3 oct. 2019)." },
  { tone: "strat" as const, k: "Étape 4 — Notre stratégie", h: "Une notification opposable, puis le juge", p: "Nous délivrons une notification conforme au visa de la LCEN, qui fait courir l'obligation de retrait. À défaut d'action, référé de retrait visant le contenu et ses reprises identiques et équivalentes." },
  { tone: "win" as const, k: "Étape 5 — L'issue recherchée", h: "Retrait du contenu — et de ses copies", p: "La plateforme ne peut plus se retrancher derrière un signalement irrégulier. Objectif du dossier ; l'issue dépend des circonstances propres à chaque affaire." },
];

const DOSSIERS = [
  {
    tag: "Réseau social · Compte détourné",
    title: "Une page professionnelle certifiée, des centaines de milliers d'abonnés — détournée en 48 heures.",
    steps: [
      { k: "Le piège", p: "Un faux partenariat rémunéré sert à faire activer une option qui donne la main sur la page. Un administrateur pirate est ajouté, le titulaire perd tout accès, la page finit suspendue." },
      { k: "Mise en demeure", p: "Sommation à la plateforme de restaurer l'accès et de retirer les administrateurs frauduleux, sur le fondement de ses propres CGU et de l'obligation de sécurité des données." },
      { k: "Objectif", p: "Rétablissement de l'accès exclusif, suppression des accès pirates, restauration des contenus effacés — à défaut, saisine du juge.", res: true },
    ],
    chips: ["CGU plateforme", "Art. 32 RGPD"],
  },
  {
    tag: "Plateforme vidéo · Vie privée & harcèlement",
    title: "Filmée à son insu sur son lieu de travail, puis harcelée en commentaires — et une chaîne créée pour la cibler.",
    steps: [
      { k: "Notification", p: "Signalement de la vidéo et des commentaires : atteinte à l'image et à la vie privée (art. 9 C. civ.) et harcèlement moral en ligne (art. 222-33-2-2 C. pén.), au visa de la LCEN et du DSA." },
      { k: "Retrait partiel", p: "La plateforme retire plusieurs liens signalés et le confirme par écrit." },
      { k: "Récidive → relance", p: "Nouvelle vidéo et chaîne dédiée à la cible : nouvelle notification visant le retrait immédiat et la suspension du canal.", res: true },
    ],
    chips: ["Art. 9 C. civ.", "Art. 222-33-2-2 C. pén.", "LCEN", "DSA"],
  },
  {
    tag: "Moteur de recherche · Droit à l'oubli",
    title: "Des articles vieux de près de quinze ans, figés en tête des résultats — et des contrats professionnels rompus à cause d'eux.",
    steps: [
      { k: "Le préjudice", p: "Une condamnation ancienne et définitivement close, sans intérêt public actuel, reste amplifiée par le moteur — jusqu'à faire rompre des partenariats avec de grands groupes." },
      { k: "Demande préalable", p: "Demande de déréférencement adressée à l'exploitant du moteur — refusée." },
      { k: "Assignation", p: "Saisine du tribunal en procédure accélérée au fond, sur le fondement du droit à l'effacement (art. 17 RGPD) : pour des données pénales anciennes, le déréférencement doit être le principe.", res: true },
    ],
    chips: ["Art. 17 RGPD", "Droit à l'oubli", "LCEN"],
  },
  {
    tag: "Réseau social · Identification d'auteur",
    title: "Un compte anonyme usurpe une identité pour détruire une vie de famille. Encore fallait-il savoir qui.",
    steps: [
      { k: "Le préjudice", p: "Depuis un compte anonyme usurpant l'identité d'un tiers, des messages malveillants et des accusations diffusés à l'entourage — vie familiale et professionnelle gravement atteintes." },
      { k: "Assignation 145", p: "Référé contre la plateforme pour la contraindre, sous astreinte et sous 15 jours, à communiquer les données d'identification : identifiant de connexion, adresses IP, coordonnées." },
      { k: "Objectif", p: "Lever l'anonymat pour engager l'action pénale — harcèlement moral, appels malveillants, usurpation d'identité.", res: true },
    ],
    chips: ["Art. 145 CPC", "Art. 222-33-2-2 C. pén.", "Usurpation d'identité"],
  },
];

const COMPLEX_LIST = [
  "du statut de la plateforme — hébergeur, éditeur ou responsable de traitement ;",
  "de la qualité et de la régularité de la notification ;",
  "du type de contenu et du fondement invoqué ;",
  "du droit applicable — LCEN, DSA, RGPD, propriété intellectuelle, diffamation ;",
  "de la jurisprudence récente de la CJUE et de la Cour de cassation.",
];

const TREE = [
  {
    name: "Hébergeur",
    branch: "structure & classe",
    desc: "Sans rôle actif de connaissance ni de contrôle des contenus.",
    conseq: "Responsabilité allégée",
    ref: "Cass. 09-13.202 · 09-67.896",
    box: "Exonéré, sauf connaissance effective de l'illicéité sans retrait prompt.",
    key: "Notification régulière = clé.",
  },
  {
    name: "Éditeur",
    branch: "sélectionne & dirige",
    desc: "Pouvoir de sélection ou de direction éditoriale.",
    conseq: "Droit commun · exposition maximale",
    ref: "Cass. 09-13.202",
    box: "Répond des contenus illicites comme un éditeur, selon le droit commun.",
    key: "Exposition la plus élevée.",
  },
  {
    name: "Moteur de recherche",
    branch: "indexe & ordonne",
    desc: "Indexe et ordonne des données personnelles.",
    conseq: "Responsable de traitement",
    ref: "CJUE C-131/12",
    box: "Débiteur du droit au déréférencement, même si la source est licite.",
    key: "Sans preuve de préjudice.",
  },
];

const TIMELINE = [
  { year: "2011", a: "L'Oréal / eBay", b: "+ trio Cass. 17 fév." },
  { year: "2014", a: "Google Spain", b: "droit à l'oubli" },
  { year: "2019", a: "Glawischnig / Facebook", b: "injonctions ciblées" },
];

/**
 * `lecon` est ce qu'un dirigeant non juriste doit retenir : elle reste
 * toujours visible. Le considérant complet (`p`) est replié par défaut —
 * six blocs de motivation d'affilée décourageaient la lecture — mais reste
 * dans le DOM, parce que c'est lui qui porte le vocabulaire juridique
 * précis sur lequel la page fait autorité.
 */
const JURIS = [
  { ref: "CJUE C-324/09 · 12 juil. 2011 · L'Oréal / eBay", h: "Marque & place de marché", lecon: "Votre marque contrefaite sur une place de marché : vous pouvez agir, y compris sur le simple achat du mot-clé.", p: "Le titulaire peut s'opposer aux offres ou publicités visant des consommateurs de l'Union pour des produits d'États tiers non écoulés dans l'EEE avec son consentement. Le mot-clé identique à la marque dans un référencement est un « usage » opposable si la publicité ne laisse pas voir l'origine des produits." },
  { ref: "Cass. 1re civ. 09-13.202 · 17 fév. 2011", h: "Hébergeur ou éditeur", lecon: "Toute la responsabilité de la plateforme se joue sur cette qualification — c'est la première chose que nous établissons.", p: "Structurer et classer sans rôle actif de connaissance ou de contrôle relève du seul régime des hébergeurs, fût-on créateur de son site. La sélection ou la direction éditoriale fait basculer dans le droit commun des éditeurs." },
  { ref: "Cass. 1re civ. 09-67.896 · 17 fév. 2011 · Dailymotion", h: "Intermédiaire technique", lecon: "Vendre de la publicité ne fait pas d'une plateforme un éditeur : ne comptez pas sur cet argument seul.", p: "Réencodage, formatage et outils de classification n'induisent pas de sélection éditoriale. La commercialisation d'espaces publicitaires ne crée pas de capacité d'action sur les contenus. Statut d'hébergeur retenu." },
  { ref: "CJUE C-131/12 · 13 mai 2014 · Google Spain", h: "Droit au déréférencement", lecon: "Vous n'avez pas à prouver un préjudice pour faire déréférencer un lien — même si la page d'origine reste licite.", p: "La personne peut demander la suppression de liens inadéquats, non ou plus pertinents ou excessifs — sans démontrer de préjudice, et même si la page source reste licite. La vie privée prime en principe, sauf rôle prépondérant dans la vie publique." },
  { ref: "CJUE C-18/18 · 3 oct. 2019 · Glawischnig-Piesczek / Facebook", h: "Injonctions contre les réseaux sociaux", lecon: "Un contenu retiré puis republié à l'identique ou en substance peut être visé par la même injonction — parfois mondialement.", p: "Un hébergeur, même exonéré, peut se voir enjoindre de retirer un contenu illicite, ses copies à l'identique et ses équivalents ciblés — sans appréciation autonome généralisée, avec des effets pouvant être mondiaux." },
  { ref: "Cass. 1re civ. 09-15.857 · 17 fév. 2011", h: "La notification fait la responsabilité", lecon: "C'est l'arrêt qui explique pourquoi votre signalement a échoué : sans les mentions légales exactes, la plateforme ne doit rien.", p: "Aucun manquement à l'obligation de retrait prompt ne peut être reproché sans vérifier que la notification comportait toutes les mentions de la loi du 21 juin 2004 — description et localisation des faits comprises." },
];

const METHOD = [
  { n: "01", title: "Qualifier", text: "Hébergeur, éditeur, moteur, responsable de traitement. La qualification commande tout le régime." },
  { n: "02", title: "Cartographier l'exposition", text: "Usages de marque, contenus, données personnelles, contrats et procédures internes." },
  { n: "03", title: "Structurer la notification et le retrait", text: "Notifications robustes — mentions prescrites, description et localisation précises — et procédures de notice and take down." },
  { n: "04", title: "Agir", text: "Référés et injonctions de retrait (identiques et équivalents), déréférencement, actions d'interdiction en matière de marque." },
  { n: "05", title: "Défendre et sécuriser", text: "Exonération des opérateurs, gestion de crise, preuves, relations avec la CNIL et les autorités.", pill: "Notre terrain naturel" },
];

const REASONS = [
  { n: 1, h: "Un seul métier : le droit du numérique", p: "Plateformes, données personnelles, propriété intellectuelle, e-réputation. Pas un cabinet généraliste qui traite votre dossier entre deux autres." },
  { n: 2, h: "Nous plaidons", p: "Référés de retrait, assignations, requêtes en identification d'auteur (article 145 CPC), déréférencement devant le tribunal. Le contentieux, pas seulement le courrier." },
  { n: 3, h: "La preuve qui tient devant un juge", p: "Notification opposable, logs, adresses IP, constats : nous construisons le dossier pour qu'il résiste — là où un simple signalement échoue." },
  { n: 4, h: "De la mise en demeure au jugement", p: "Une chaîne complète : premier courrier, notification juridique, procédure d'urgence, décision — et son exécution face à la plateforme." },
];


/* ── Composants utilitaires ── */

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, pointerEvents: "none" }} aria-hidden>
      <div style={{ height: "100%", width: `${progress}%`, background: BLUE, transition: "width 0.1s linear" }} />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: BLUE, marginBottom: 4 }}>
      {children}
    </p>
  );
}

function SectionHead({ label, title, sub, dark }: { label: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <>
      <Eyebrow>{label}</Eyebrow>
      <h2 style={{ ...TYPE.h2, color: dark ? DARK.text : LIGHT.text, margin: sub ? "0 0 6px" : "0 0 14px", whiteSpace: "pre-line" }}>{title}</h2>
      {sub ? (
        <p style={{ fontSize: 14, color: dark ? DARK.muted : LIGHT.muted, lineHeight: 1.7, margin: "0 0 14px", maxWidth: 720, whiteSpace: "pre-line" }}>{sub}</p>
      ) : null}
    </>
  );
}

function Divider() {
  return <div style={{ borderTop: `0.5px solid ${LIGHT.border}`, maxWidth: 900, margin: "16px auto" }} />;
}

/**
 * Six motivations d'arrêt à la suite formaient un mur de texte que seul un
 * juriste lit. La leçon reste visible, le considérant se déplie — et surtout
 * reste servi dans le HTML même replié : c'est lui qui porte le vocabulaire
 * sur lequel la page se positionne.
 */
function ArretCard({ arret, index }: { arret: (typeof JURIS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderLeft: `3px solid ${BLUE}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11.5, color: BLUE, fontWeight: 500 }}>{arret.ref}</div>
      <h3 style={{ fontSize: 16, fontWeight: 500, margin: "8px 0 6px", color: LIGHT.text }}>{arret.h}</h3>
      <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.5 }}>{arret.lecon}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`arret-detail-${index}`}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: BLUE, fontSize: 12.5, fontFamily: "var(--ff-mono)" }}
      >
        {open ? "− Masquer la décision" : "+ Ce qu'a jugé la cour"}
      </button>
      <p
        id={`arret-detail-${index}`}
        hidden={!open}
        style={{ margin: "10px 0 0", fontSize: 13.5, color: LIGHT.muted, lineHeight: 1.55 }}
      >
        {arret.p}
      </p>
    </div>
  );
}

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `0.5px solid ${LIGHT.border}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-plateformes-reponse-${index}`}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, background: "none", border: "none", padding: "12px 0", textAlign: "left", cursor: "pointer" }}
      >
        <span style={{ display: "flex", gap: 10 }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: BLUE, flexShrink: 0, paddingTop: 2 }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45 }}>{item.q}</span>
        </span>
        <span aria-hidden style={{ color: BLUE, fontSize: 20, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 180ms ease" }}>+</span>
      </button>
      {/* La réponse reste dans le DOM une fois repliée : rendue
          conditionnellement, elle serait absente du HTML servi — donc
          invisible pour les moteurs, alors qu'elle est déclarée en FAQPage. */}
      <div
        id={`faq-plateformes-reponse-${index}`}
        hidden={!open}
        style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.7, margin: 0, padding: "0 0 12px 34px", maxWidth: 760 }}
      >
        {item.a}
        {item.lien ? (
          <Link href={item.lien.href} style={{ display: "inline-block", marginTop: 10, color: BLUE, textDecoration: "none" }}>
            {item.lien.label} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

const SCENE_TONE: Record<string, { bar: string; bg: string; k: string }> = {
  note: { bar: BLUE, bg: LIGHT.panel, k: BLUE },
  refus: { bar: RED, bg: "#fdf4f4", k: RED },
  law: { bar: BLUE, bg: "#f2f4ff", k: BLUE },
  strat: { bar: LIGHT.text, bg: LIGHT.panel, k: LIGHT.faint },
  win: { bar: GREEN, bg: "#f1faf5", k: GREEN },
};

/* ── Page ── */

export default function PlateformesClient() {
  return (
    <main style={{ background: LIGHT.bg, color: LIGHT.text, fontFamily: "var(--ff-body)" }}>
      <ScrollProgressBar />

      {/* 1. Hero */}
      <div style={{ background: DARK.bg, color: DARK.text, padding: "72px 0 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -160, right: -120, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle at 40% 40%, ${BLUE}, #0a2acc 60%, transparent 72%)`, opacity: 0.5, pointerEvents: "none" }} aria-hidden />
        <div style={{ ...INNER, position: "relative" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr]" style={{ gap: 40, alignItems: "center" }}>
            <div>
              <Eyebrow>Retrait de contenu · Déréférencement · Réputation en ligne</Eyebrow>
              <h1 style={{ fontSize: 34, fontWeight: 600, lineHeight: 1.12, color: "#fff", margin: "8px 0 0" }}>
                Vous avez signalé. La plateforme a refusé. Ça ne s&apos;arrête pas là.
              </h1>
              <div style={{ margin: "22px 0 8px", display: "grid", gap: 9 }}>
                {REFUSAL_LINES.map((l) => (
                  <div key={l.strong} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <span style={{ flex: "0 0 auto", fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ff9a9d", border: "1px solid rgba(226,75,74,0.4)", borderRadius: 5, padding: "2px 7px", minWidth: 64, textAlign: "center" }}>
                      {l.tag}
                    </span>
                    <span style={{ color: "#dfe3ee", fontSize: 15 }}>
                      {l.pre}
                      <strong style={{ color: "#fff", fontWeight: 600 }}>{l.strong}</strong>
                      {l.post}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ color: DARK.muted, maxWidth: 620, margin: "18px 0 26px", fontSize: 15, lineHeight: 1.7 }}>
                Quand le signalement ne suffit plus, nous prenons le relais : notification juridique opposable, référé de retrait, déréférencement, identification des auteurs. Pour les entreprises et les personnes visées par un contenu en ligne.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href="/contact" style={{ background: BLUE, color: "#fff", padding: "13px 22px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                  Faire analyser ma situation →
                </Link>
                <a href="#scene" style={{ background: "transparent", color: DARK.muted, padding: "13px 22px", borderRadius: 8, fontSize: 14, textDecoration: "none", border: `0.5px solid ${DARK.border}` }}>
                  Voir comment on procède
                </a>
              </div>
            </div>

            {/* Viz card */}
            <div style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16, padding: "20px 20px 12px" }} aria-hidden>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
                Contenus en ligne vous concernant
              </div>
              {VIZ_ROWS.map((r) => (
                <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "13px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", marginBottom: 10 }}>
                  <span style={{ color: "#dfe3ee", fontSize: 13.5, textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.35)" }}>{r.label}</span>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8ea2ff", whiteSpace: "nowrap" }}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Chiffres-clés */}
      <section style={{ background: DARK.bg, color: DARK.text, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "28px 0" }}>
        <div style={INNER}>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 22 }}>
            {STATS.map((s) => (
              <div key={s.v} style={{ borderLeft: `2px solid ${BLUE}`, paddingLeft: 14 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#fff", lineHeight: 1.15 }}>{s.v}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5, marginTop: 7, lineHeight: 1.45 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bande-récit */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Le scénario que vous vivez" title="De la découverte au blocage — puis à l'action" />
          <div className="grid grid-cols-2 md:grid-cols-6" style={{ gap: 10 }}>
            {ARC.map((a) => (
              <div key={a.n} style={{ textAlign: "center", padding: "0 4px" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${a.on ? BLUE : LIGHT.border}`, background: a.on ? BLUE : LIGHT.panel, color: a.on ? "#fff" : LIGHT.faint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontFamily: "var(--ff-mono)", fontSize: 13 }}>
                  {a.n}
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 600, margin: "0 0 4px", color: a.on ? BLUE : LIGHT.text }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: LIGHT.faint, lineHeight: 1.4 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 4. Êtes-vous concerné */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Êtes-vous concerné ?" title="Cette page est faite pour vous si…" />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {PROFILES.map((p) => (
              <div key={p.title} style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderTop: `3px solid ${BLUE}`, borderRadius: 12, padding: 22 }}>
                <h3 style={{ ...TYPE.h3, color: LIGHT.text, margin: "0 0 14px" }}>{p.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 11 }}>
                  {p.items.map((it) => (
                    <li key={it} style={{ display: "flex", gap: 11, fontSize: 14, color: LIGHT.muted, lineHeight: 1.45 }}>
                      <span style={{ flex: "0 0 7px", width: 7, height: 7, borderRadius: "50%", background: BLUE, marginTop: 7 }} aria-hidden />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, color: LIGHT.muted, fontSize: 14 }}>
            Vous <strong style={{ fontWeight: 600, color: LIGHT.text }}>exploitez</strong> une plateforme et votre responsabilité est recherchée ? C&apos;est une autre logique — <a href="#problemes" style={{ color: BLUE, fontWeight: 600, textDecoration: "none" }}>voir « défendre une plateforme » →</a>
          </p>
        </div>
      </section>

      {/* 5. Plateformes concernées */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Les acteurs concernés" title="Des litiges qui impliquent les principales plateformes" dark />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
            {PLATFORMS.map((pl) => (
              <span key={pl} style={{ fontSize: 14, fontWeight: 500, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#e7e9f2", borderRadius: 10, padding: "9px 15px" }}>{pl}</span>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 18, maxWidth: 640, lineHeight: 1.6 }}>
            Ces acteurs sont cités à titre d&apos;illustration des services régulièrement en cause dans ce type de contentieux. Leur mention ne préjuge d&apos;aucune relation avec le cabinet.
          </p>
        </div>
      </section>

      {/* 6. Problèmes traités */}
      <section id="problemes" style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Ce que nous traitons"
            /* Le titre portait l'intention du cabinet ; il porte désormais
               celle du visiteur — les verbes qu'il tape lui-même dans un
               moteur, et le terme « e-réputation » qui manquait à la page. */
            title="Faire retirer, déréférencer, défendre votre e-réputation"
            sub="La réponse dépend rarement du seul contenu — elle dépend du statut de la plateforme, de la notification et du droit applicable."
          />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {PROBLEMS.map((p) => (
              <div key={p.title} style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: CARD_PAD }}>
                <h3 style={{ fontSize: 17, fontWeight: 500, color: LIGHT.text, margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: LIGHT.muted, lineHeight: 1.6 }}>{p.text}</p>
                <div style={{ marginTop: 14, fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: BLUE }}>{p.tags}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 7. Scène preuve */}
      <section id="scene" style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Comment ça se passe, concrètement"
            title="Un refus de retrait, étape par étape"
            sub="Le même scénario, du signalement resté lettre morte jusqu'au retrait obtenu par la voie juridique. Exemple reconstitué et anonymisé."
          />
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {SCENE.map((s, i) => {
              const tone = SCENE_TONE[s.tone];
              return (
                <div key={s.k}>
                  <div style={{ background: tone.bg, border: `1px solid ${LIGHT.border}`, borderLeft: `3px solid ${tone.bar}`, borderRadius: 12, padding: "18px 20px" }}>
                    <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: tone.k, marginBottom: 8 }}>{s.k}</div>
                    <h4 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 6px", color: LIGHT.text }}>{s.h}</h4>
                    <p style={{ margin: 0, fontSize: 14, color: LIGHT.muted, lineHeight: 1.55 }}>{s.p}</p>
                    {s.letter ? (
                      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "#555", background: "#fafafa", border: "1px dashed #d3cfc6", borderRadius: 8, padding: "12px 14px", marginTop: 12, lineHeight: 1.7 }}>
                        <strong style={{ color: LIGHT.text }}>À :</strong> {s.letter.to}<br />
                        <strong style={{ color: LIGHT.text }}>Objet :</strong> {s.letter.objet}<br />
                        <strong style={{ color: LIGHT.text }}>Message :</strong> {s.letter.message}
                      </div>
                    ) : null}
                  </div>
                  {i < SCENE.length - 1 ? <div style={{ width: 2, height: 24, background: LIGHT.border, margin: "0 auto" }} aria-hidden /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* 8. Dossiers réels */}
      <section id="cas" style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Dossiers réels · anonymisés"
            title="De vrais dossiers, sans les noms"
            sub="Le chemin réel — du signalement à la procédure. Quatre affaires représentatives des demandes les plus fréquentes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {DOSSIERS.map((d) => (
              <article key={d.tag} style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderTop: `3px solid ${BLUE}`, borderRadius: 12, padding: 22 }}>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: BLUE, fontWeight: 500 }}>{d.tag}</div>
                <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3, margin: "10px 0 18px", color: LIGHT.text }}>{d.title}</p>
                <div>
                  {d.steps.map((st, si) => (
                    <div key={st.k} style={{ position: "relative", display: "grid", gridTemplateColumns: "16px 1fr", gap: 14, paddingBottom: si < d.steps.length - 1 ? 16 : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: 13, height: 13, borderRadius: "50%", background: st.res ? GREEN : "#fff", border: `2.5px solid ${st.res ? GREEN : BLUE}`, marginTop: 2, zIndex: 1 }} />
                        {si < d.steps.length - 1 ? <div style={{ width: 2, flex: 1, background: LIGHT.border, marginTop: 2 }} aria-hidden /> : null}
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: st.res ? GREEN : LIGHT.faint, marginBottom: 3 }}>{st.k}</div>
                        <p style={{ margin: 0, fontSize: 13.5, color: LIGHT.muted, lineHeight: 1.5 }}>{st.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${LIGHT.border}` }}>
                  {d.chips.map((c) => (
                    <span key={c} style={{ fontFamily: "var(--ff-mono)", fontSize: 11, background: "rgba(26,71,255,0.08)", color: "#0a2acc", borderRadius: 6, padding: "4px 9px" }}>{c}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 20, color: LIGHT.faint, fontSize: 13, maxWidth: 680, fontStyle: "italic", lineHeight: 1.6 }}>
            Dossiers réels, anonymisés et adaptés à des fins pédagogiques. Plusieurs procédures sont en cours : chaque affaire dépend de ses circonstances propres et aucun résultat ne peut être garanti.
          </p>
        </div>
      </section>

      <Divider />

      {/* 9. Pourquoi c'est complexe */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div style={{ background: "#f2f4ff", border: "1px solid #dbe1ff", borderRadius: 14, padding: 32 }}>
            <h2 style={{ ...TYPE.h2, color: "#0a2acc", margin: 0 }}>Pourquoi ces dossiers sont complexes</h2>
            <p style={{ color: LIGHT.muted, margin: "14px 0 20px", maxWidth: 640, lineHeight: 1.7, fontSize: 14 }}>
              Parce que la solution ne dépend presque jamais uniquement du contenu. Elle dépend d&apos;une combinaison de facteurs qui décident, en amont, de ce qui est possible :
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }} className="md:grid-cols-2">
              {COMPLEX_LIST.map((c) => (
                <li key={c} style={{ display: "flex", gap: 11, fontSize: 14, color: LIGHT.text, lineHeight: 1.5 }}>
                  <span style={{ color: BLUE, fontWeight: 700 }} aria-hidden>→</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 22, marginBottom: 0, fontWeight: 600, color: "#0a2acc", fontSize: 16 }}>C&apos;est exactement à ce stade qu&apos;intervient le cabinet.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* 10. Arbre de décision */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="La question qui décide de tout"
            title="Quel régime s'applique à la plateforme ?"
            sub="La qualification du service commande l'ensemble du régime de responsabilité. Trois rôles possibles, trois régimes."
          />
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
            {TREE.map((t) => (
              <div key={t.name} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: DARK.bg, borderRadius: 12, padding: 18 }}>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.05em", color: "#8ea2ff", marginBottom: 8 }}>{t.branch}</div>
                  <div style={{ fontSize: 17, fontWeight: 500, color: "#fff", marginBottom: 8 }}>{t.name}</div>
                  <p style={{ margin: "0 0 10px", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{t.desc}</p>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: "#cfd4e4" }}>→ {t.conseq}</p>
                  <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "#8ea2ff" }}>{t.ref}</div>
                </div>
                <div style={{ background: LIGHT.bg, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: 16 }}>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: LIGHT.muted, lineHeight: 1.5 }}>{t.box}</p>
                  <p style={{ margin: 0, fontSize: 13, color: BLUE, fontWeight: 500 }}>{t.key}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA mid */}
      <section style={{ background: LIGHT.panel, padding: "0 0 40px" }}>
        <div style={INNER}>
          <div style={{ background: DARK.bg, borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
            <h2 style={{ ...TYPE.h2, color: "#fff", margin: "0 auto", maxWidth: 620 }}>
              Un contenu illicite ne se combat pas au moment du retrait. Il se prépare avant.
            </h2>
            <p style={{ color: DARK.muted, maxWidth: 540, margin: "16px auto 24px", lineHeight: 1.7, fontSize: 14 }}>
              Un premier échange pour qualifier votre situation et définir les recours réellement disponibles.
            </p>
            <Link href="/contact" style={{ background: BLUE, color: "#fff", padding: "13px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none", display: "inline-block" }}>
              Faire analyser ma situation →
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* 12. Jurisprudence */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="La démonstration juridique"
            title="Une pratique bâtie sur les arrêts fondateurs"
            sub="Chaque intervention s'appuie sur les standards de la CJUE et de la Cour de cassation — voici les décisions qui structurent la matière."
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", margin: "0 0 24px", padding: "0 8px" }}>
            <div style={{ position: "absolute", top: 6, left: 40, right: 40, height: 2, background: "rgba(26,71,255,0.25)" }} aria-hidden />
            {TIMELINE.map((t) => (
              <div key={t.year} style={{ position: "relative", textAlign: "center", flex: 1 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: BLUE, margin: "0 auto 8px" }} />
                <div style={{ fontSize: 16, fontWeight: 600, color: LIGHT.text }}>{t.year}</div>
                <div style={{ fontSize: 12.5, color: LIGHT.muted }}>{t.a}</div>
                <div style={{ fontSize: 12.5, color: LIGHT.faint }}>{t.b}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {JURIS.map((j, i) => (
              <ArretCard key={j.ref} arret={j} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 13. Méthode */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Notre méthode"
            title="De la qualification au contentieux"
            sub="Une démarche structurée, valable pour un opérateur comme pour une personne lésée."
          />
          <div>
            {METHOD.map((m, i) => (
              <div key={m.n} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 20, padding: "22px 0", borderBottom: i < METHOD.length - 1 ? `0.5px solid ${LIGHT.border}` : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${BLUE}`, color: BLUE, fontFamily: "var(--ff-mono)", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{m.n}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 4px", color: LIGHT.text }}>{m.title}</h3>
                  <p style={{ margin: 0, color: LIGHT.muted, fontSize: 14, lineHeight: 1.6 }}>{m.text}</p>
                  {m.pill ? (
                    <span style={{ display: "inline-block", marginTop: 8, fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: BLUE, background: "rgba(26,71,255,0.08)", padding: "4px 10px", borderRadius: 6 }}>{m.pill}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Pourquoi le cabinet */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Pourquoi le cabinet"
            title="Pourquoi nous confier votre dossier"
            sub="Le contentieux des plateformes est notre terrain — de la première mise en demeure jusqu'à l'audience."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {REASONS.map((r) => (
              <div key={r.n} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "22px 24px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 8, background: BLUE, color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{r.n}</span>
                <h3 style={{ fontSize: 16, fontWeight: 500, color: "#fff", margin: "0 0 7px" }}>{r.h}</h3>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.5 }}>{r.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 14 bis. L'équipe sur ce type de dossier */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <EquipeDossier
            titre="Qui traite votre dossier"
            chapeau="Retrait de contenu, déréférencement et identification d'auteur relèvent autant du droit des plateformes que de celui des données personnelles. Les deux sont traités ensemble."
            couleurs={{ panneau: LIGHT.panel2, carte: LIGHT.panel, bordure: LIGHT.border, texte: LIGHT.text, secondaire: LIGHT.muted, accent: BLUE }}
            membres={[
              { slug: "alexandre", role: "Droit des plateformes & contentieux", tags: ["Référé de retrait", "Art. 145 CPC", "LCEN & DSA"] },
              { slug: "sarah", role: "Données personnelles & e-réputation", tags: ["Déréférencement", "Droit à l'oubli", "Art. 17 RGPD"] },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* 15. FAQ */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Questions fréquentes" title="Ce que l'on nous demande avant de commencer" />
          <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: "4px 20px" }}>
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 16. Vidéo — reportage */}
      <section id="media" style={{ background: LIGHT.panel, padding: "8px 0 40px" }}>
        <div style={INNER}>
          <Eyebrow>Dans les médias</Eyebrow>
          <h2 style={{ ...TYPE.h2, color: LIGHT.text, margin: "0 0 14px" }}>Le cabinet, sollicité en reportage</h2>
        </div>
        <div style={{ position: "relative", borderRadius: 0, overflow: "hidden", background: DARK.bg }}>
          <video
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", maxHeight: 560, objectFit: "contain", display: "block", background: "#000" }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </video>
        </div>
        <div style={INNER}>
          <p style={{ fontSize: 13, color: LIGHT.faint, margin: "12px 0 0", lineHeight: 1.6, fontStyle: "italic" }}>
            Intervention de Me Alexandre Lazarègue dans le cadre d&apos;un contentieux impliquant les réseaux sociaux.
          </p>
        </div>
      </section>

      <Divider />

      {/* 17. CTA final */}
      <section style={{ background: LIGHT.panel, padding: "0 0 48px" }}>
        <div style={INNER}>
          <div style={{ background: DARK.bg, borderRadius: 16, padding: "40px 32px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
            <div>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Confronté à une plateforme ?</span>
              <h2 style={{ fontSize: 30, fontWeight: 600, color: "#fff", margin: "12px 0 0", lineHeight: 1.15 }}>
                Votre problème numérique a une <span style={{ color: BLUE }}>solution.</span>
              </h2>
            </div>
            <Link href="/contact" style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: 40, padding: "16px 30px", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
              Parler à un avocat →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
