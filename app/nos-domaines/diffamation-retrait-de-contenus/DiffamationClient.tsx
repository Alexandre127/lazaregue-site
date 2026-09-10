"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { MembreCarte } from "@/components/equipe-dossier";
import { Jurisprudence, type Decision } from "@/components/jurisprudence";
import { fr } from "@/lib/typo";
import { FAQ_ITEMS } from "./faq";

/* ==========================================================================
   Page « Diffamation et retrait de contenus en ligne ».

   Reconstruction de l'ancienne page plateformes avec les primitives du site.
   Nav, pied de page et bandeau de clôture « Votre problème numérique a une
   solution » viennent du layout global : la page ne les redéclare pas.

   Pas d'accent de famille inventé (famille « Contrats / opérations » sans
   accent arbitré) : bleu d'action + gris neutres.

   « expert »/« expertise » ne désignent ici que la mesure d'instruction et
   les rapports produits en procédure — jamais le cabinet ni les avocats.
   ========================================================================== */

const DARK = {
  bg: "#0a0f2e",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.68)",
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

const BLUE = "#1A47FF";
const PERI = "#4D6FFF";

const INNER: CSSProperties = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
const SECTION_PAD = "56px 0";
const CARD_PAD = 18;
const GRID_GAP = 12;

const TYPE = {
  h1: { fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 600, lineHeight: 1.08 } as const,
  h2: { fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 600, lineHeight: 1.25 } as const,
  h3: { fontSize: 18, fontWeight: 600, lineHeight: 1.35 } as const,
  secondary: { fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: LIGHT.muted } as const,
};

const CONTACT = "/contact";

/* -----------------------------------------------------------------------
   § 6 — DRAPEAU « DOSSIERS » (convention page contrats informatiques).
   Dossiers anonymisés mais caractérisants, plusieurs procédures en cours :
   leur publication relève d'un arbitrage que seul le cabinet peut faire.
   À `false`, la section n'est pas rendue et aucun lien de la page n'y renvoie.
   TODO (cabinet) — niveau de détail des dossiers et levée du drapeau.
   ----------------------------------------------------------------------- */
const DOSSIERS_ENABLED = false;

/* ---------- Données ------------------------------------------------------ */

const HERO_CHIPS = [
  "Retrait de contenu",
  "Déréférencement",
  "Faux avis",
  "Identification d'auteur",
  "LCEN & DSA",
];

const ROUTES = [
  {
    q: "Un contenu vous vise et la plateforme refuse de le retirer",
    d: "Vidéo, publication, commentaires, article. Le signalement est resté sans effet ou sans réponse.",
    l: "Obtenir le retrait",
  },
  {
    q: "Un résultat Google vous nuit",
    d: "Information ancienne, condamnation close, contenu excessif qui reste en tête des résultats.",
    l: "Déréférencement et droit à l'oubli",
  },
  {
    q: "De faux avis dégradent votre activité",
    d: "Avis manifestement faux, campagne concertée, dénigrement d'un concurrent.",
    l: "Supprimer un faux avis",
  },
  {
    q: "L'auteur est anonyme",
    d: "Faux profil, compte d'usurpation, messages malveillants adressés à votre entourage.",
    l: "Identifier l'auteur",
  },
];

const SCENARIO = [
  { n: "1", b: "Vous découvrez", t: "Un contenu vous vise, ou votre compte est bloqué." },
  { n: "2", b: "Vous signalez", t: "Via le formulaire de la plateforme." },
  { n: "3", b: "On refuse", t: "Contenu « conforme aux règles », ou silence prolongé." },
  { n: "4", b: "Vous perdez", t: "Clients, abonnés, réputation, sérénité." },
  { n: "5", b: "Vous êtes bloqué", t: "Plus d'interlocuteur, plus de recours apparent." },
  { n: "6", b: "Le cabinet intervient", t: "Notification opposable, référé, retrait.", dark: true },
];

const SCENARIO_ACC = [
  {
    num: "Étape 1 — Le signalement",
    q: "La demande adressée à la plateforme",
    a: "Le formulaire interne est utilisé, les preuves sont jointes, et rien ne bouge. Le signalement passe par un canal contractuel, pas par une voie de droit.",
  },
  {
    num: "Étape 2 — Le refus",
    q: "« Contenu conforme à nos règles »",
    a: "Réponse automatique de rejet, ou absence de réponse pendant plusieurs semaines. Dans les deux cas, la situation juridique de la plateforme n'a pas changé.",
  },
  {
    num: "Étape 3 — La règle",
    q: "Un signalement n'est pas une notification",
    a: "L'obligation de retrait prompt de l'hébergeur suppose une notification régulière, comportant la description et la localisation précises des faits litigieux. Et un hébergeur, même exonéré de responsabilité, peut se voir enjoindre le retrait d'un contenu déclaré illicite ainsi que de ses reprises identiques ou équivalentes.",
  },
  {
    num: "Étape 4 — La stratégie",
    q: "Une notification opposable, puis le juge",
    a: "Le cabinet délivre une notification conforme au visa de la LCEN, qui fait courir l'obligation de retrait. À défaut d'action de la plateforme, référé de retrait visant le contenu et ses reprises.",
  },
  {
    num: "Étape 5 — L'issue recherchée",
    q: "Le retrait du contenu et de ses copies",
    a: "La plateforme ne peut plus se retrancher derrière l'irrégularité du signalement. Il s'agit de l'objectif poursuivi dans ce type de dossier ; l'issue dépend des circonstances propres à chaque affaire.",
  },
];

/* Comparateur. Le panneau de gauche est un EXEMPLE TYPE : ne jamais y reprendre
   le message d'un client réel. Les cinq fragments de la notification (droite)
   déclenchent une note dans la zone de résultat unique. */
const CMP_NOTES: Record<string, [string, string]> = {
  a: [
    "Le destinataire",
    "Une notification adressée au mauvais interlocuteur ne produit aucun effet. Identifier l'hébergeur, distinct de l'éditeur du site et du titulaire du compte, est la première opération — et souvent celle qui prend le plus de temps.",
  ],
  b: [
    "La date et le notifiant",
    "La date fixe le point de départ de la connaissance du contenu, à partir duquel se mesure la promptitude de la réaction. L'identification complète du notifiant conditionne la recevabilité de la démarche.",
  ],
  c: [
    "La description et la localisation",
    "C'est la mention qui fait échouer la plupart des demandes. « Une publication me concernant » ne suffit pas : il faut décrire les faits litigieux et indiquer l'adresse exacte de chaque contenu, reprise par reprise.",
  ],
  d: [
    "Le fondement et les motifs",
    "Le retrait doit être demandé au visa des dispositions applicables et des motifs de fait qui le justifient. Sans qualification juridique, la plateforme n'a aucune obligation d'apprécier l'illicéité.",
  ],
  e: [
    "La démarche préalable",
    "La copie de la correspondance adressée à l'auteur du contenu, ou la justification de l'impossibilité de le joindre, complète le dossier et prévient l'objection la plus fréquente en défense.",
  ],
};

const CONCERNE = {
  entreprise: [
    "Une plateforme laisse en ligne des contenus qui vous nuisent.",
    "Google refuse de déréférencer un résultat préjudiciable.",
    "Votre marque est vendue ou détournée sur une place de marché.",
    "Votre compte professionnel a été suspendu sans explication.",
    "De faux avis ou un concurrent dégradent votre réputation.",
  ],
  personne: [
    "Une vidéo ou un article porte atteinte à votre réputation.",
    "Des photos ou des données sont diffusées sans votre accord.",
    "Des informations anciennes remontent dans les résultats de recherche.",
    "Un faux profil usurpe votre identité.",
    "Vous êtes harcelé et la plateforme refuse d'agir.",
  ],
};

const PRESTATIONS = [
  {
    tag: "Notification · Référé",
    titre: "Faire retirer un contenu",
    texte:
      "Le contenu a été signalé, la plateforme refuse d'intervenir. Le cabinet examine la régularité de la notification — description et localisation des faits — et met en œuvre les recours adaptés, jusqu'au référé de retrait visant le contenu et ses reprises identiques et équivalentes.",
  },
  {
    tag: "Déréférencement · Droit à l'oubli",
    titre: "Faire supprimer un résultat Google",
    texte:
      "Des informations anciennes, non pertinentes ou excessives remontent dans les moteurs. L'exploitant d'un moteur traite des données personnelles et peut être tenu de supprimer des liens, même lorsque la page d'origine reste licitement publiée. Le cabinet construit la demande et conteste les refus.",
  },
  {
    tag: "Avis · Dénigrement",
    titre: "Faire supprimer un faux avis",
    texte:
      "Tout avis négatif n'est pas illicite : la libre critique est protégée, et un commentaire subjectif de client déçu ne constitue pas un trouble manifestement illicite. La question est de distinguer la critique loyale du faux avis, du dénigrement et de la campagne concertée, puis de choisir le fondement.",
  },
  {
    // § 4 — Correction de fond : l'identification porte sur les données
    // d'identité civile, PAS sur les données techniques de connexion (adresses
    // IP), qui relèvent d'un régime distinct (TJ Nice, 7 janv. 2025).
    tag: "Article 145 CPC · LCEN",
    titre: "Identifier l'auteur d'un compte anonyme",
    texte:
      "Le juge peut enjoindre à une plateforme de communiquer les données d'identification du titulaire d'un compte. Le périmètre de ce qui peut être obtenu est précisément délimité — il ne recouvre pas les données techniques de connexion, réservées à d'autres finalités. Le cabinet construit une demande réaliste et opposable.",
  },
  {
    tag: "Diffamation · Vie privée",
    titre: "Diffamation, injure et atteinte à la réputation",
    texte:
      "Diffamation, injure publique, dénigrement, usurpation d'identité, publication de données personnelles. La qualification commande la procédure et les délais, très courts en matière de presse. L'analyse porte d'abord sur la mise en balance entre liberté d'expression et protection de la réputation.",
  },
  {
    tag: "Marque · Place de marché",
    titre: "Détournement de marque en ligne",
    texte:
      "Votre marque est utilisée sur une place de marché, dans une publicité ou un lien sponsorisé. Le cabinet qualifie les usages litigieux et organise les mesures d'interdiction et les injonctions ciblées.",
  },
];

const REGIMES = [
  {
    label: "Structure et classe",
    titre: "Hébergeur",
    role: "Sans rôle actif de connaissance ni de contrôle des contenus stockés.",
    verdict: "Responsabilité allégée",
    texte: "Exonéré, sauf connaissance effective de l'illicéité sans retrait prompt. La notification régulière est la clé de voûte du régime.",
    src: null as string | null,
  },
  {
    label: "Sélectionne et dirige",
    titre: "Éditeur",
    role: "Pouvoir de sélection ou de direction éditoriale sur les contenus.",
    verdict: "Droit commun · exposition maximale",
    texte: "Répond des contenus illicites selon le droit commun. C'est l'exposition la plus élevée des trois.",
    src: null,
  },
  {
    label: "Indexe et ordonne",
    titre: "Moteur de recherche",
    role: "Indexe et met à disposition des données personnelles.",
    verdict: "Responsable de traitement",
    texte: "Débiteur du droit au déréférencement, même lorsque la source demeure licite, et sans qu'un préjudice ait à être établi.",
    src: "CJUE, 13 mai 2014, C-131/12",
  },
];

// § 7 — Jurisprudence. Corpus remis au cabinet, toutes les décisions lues et
// validées par le cabinet le 8 septembre 2026 (verifiee: true) — y compris les
// trois arrêts Cass. 1re civ. du 17 février 2011, regroupés en une seule entrée
// (même jour, ensemble cohérent). Toute décision future passe par le composant
// partagé et n'est rendue qu'avec verifiee: true.
const JURIS: Decision[] = [
  {
    juridiction: "CJUE",
    date: "13 mai 2014",
    reference: "C-131/12",
    intitule: "Google Spain — le droit au déréférencement",
    regle: "L'indexation et la mise à disposition de résultats constituent un traitement de données personnelles dont l'exploitant du moteur est responsable. Il peut être tenu d'effacer des liens lorsque les données sont devenues inadéquates ou non pertinentes au regard des finalités du traitement, même si l'information demeure licitement publiée sur le site d'origine.",
    verifiee: true,
  },
  {
    juridiction: "CJUE",
    date: "3 octobre 2019",
    reference: "C-18/18",
    intitule: "Glawischnig-Piesczek — contenus identiques et équivalents",
    regle: "Un hébergeur peut se voir enjoindre de retirer ou de bloquer des contenus identiques ou équivalents à un contenu déclaré illicite, sous réserve d'un périmètre d'injonction précisément défini et sans obligation générale de surveillance. Cet équilibre commande la rédaction des demandes de retrait et des mesures de blocage.",
    verifiee: true,
  },
  {
    juridiction: "CEDH",
    date: "16 juin 2015",
    reference: "64569/09",
    intitule: "Delfi — l'intermédiaire actif et le retrait sans délai",
    regle: "Un grand portail d'actualités qui intègre et structure sa zone de commentaires, en tire un intérêt économique et exerce un contrôle substantiel sur les contributions ne peut se prévaloir pleinement du régime des prestataires purement techniques, et peut répondre de l'absence de retrait sans délai de propos manifestement haineux.",
    verifiee: true,
  },
  {
    juridiction: "CEDH",
    date: "15 mai 2023",
    reference: "45581/15",
    intitule: "Sanchez — la responsabilité du titulaire d'un compte exposé",
    regle: "Le titulaire d'un mur public utilisé à des fins électorales peut répondre de commentaires de tiers qu'il n'a pas supprimés dans un délai raisonnable, un contrôle a posteriori minimal étant attendu pour filtrer les propos clairement illicites, même en l'absence de notification de la victime. Nature du compte, contexte et gravité des propos sont les critères.",
    verifiee: true,
  },
  {
    juridiction: "CEDH",
    date: "7 janvier 2025",
    reference: "1847/21",
    intitule: "Alexandru Pătraşcu — la base légale de la mise en cause",
    regle: "En l'absence de normes internes définissant avec une netteté suffisante l'étendue et les modalités de la responsabilité du titulaire d'une page pour les propos de tiers, sa condamnation n'est pas prévue par la loi. La décision offre un moyen de défense aux titulaires de comptes mis en cause pour des contenus qu'ils n'ont pas publiés.",
    verifiee: true,
  },
  {
    juridiction: "CA Paris",
    date: "22 mars 2019",
    reference: "n° 18/17204",
    intitule: "Avis en ligne — la libre critique n'est pas un trouble illicite",
    regle: "Les avis d'internautes relèvent de la libre critique lorsqu'ils ne sont ni diffamatoires ni injurieux, et ne constituent pas un trouble manifestement illicite justifiant leur retrait en référé. Cette ligne commande la sélection des avis réellement actionnables et écarte les demandes vouées à l'échec.",
    verifiee: true,
  },
  {
    juridiction: "TJ Nice",
    date: "7 janvier 2025",
    reference: "n° 23/01721",
    intitule: "Identification d'un auteur — ce qui peut être obtenu",
    regle: "La plateforme s'est vu ordonner la transmission des données d'identification civile de titulaires de comptes à l'origine de propos injurieux, la mesure étant jugée nécessaire et proportionnée. Le jugement précise que les données techniques de connexion obéissent à un régime distinct, réservé à d'autres finalités. Une demande d'identification doit donc être calibrée sur ce périmètre pour prospérer.",
    verifiee: true,
  },
  {
    juridiction: "Cons. const.",
    date: "18 juin 2020",
    reference: "n° 2020-801 DC",
    intitule: "Les limites des obligations de retrait",
    regle: "Les dispositions imposant aux plateformes un retrait en vingt-quatre heures sous peine de lourdes sanctions ont été censurées : compte tenu de la diversité des qualifications pénales et du volume des signalements, l'obligation incitait à retirer aussi des contenus licites, portant à la liberté de communication une atteinte qui n'était ni nécessaire, ni adaptée, ni proportionnée.",
    verifiee: true,
  },
  {
    juridiction: "Cass. 1re civ.",
    date: "17 février 2011",
    reference: "09-13.202 · 09-67.896 · 09-15.857",
    intitule: "Hébergeur ou éditeur — et ce que doit contenir la notification",
    regle: "Trois arrêts rendus le même jour fixent les deux points sur lesquels se joue la plupart des dossiers. D'une part, la qualification : le rôle purement technique, automatique et passif du prestataire commande le régime allégé, et le fait de tirer des revenus publicitaires de l'activité ne suffit pas à conférer la qualité d'éditeur. D'autre part, le formalisme de la notification : à défaut des mentions prescrites, la connaissance du contenu litigieux n'est pas acquise et l'obligation de retrait ne court pas.",
    verifiee: true,
  },
];

const DOSSIERS = [
  {
    num: "01",
    type: "Réseau social · compte détourné",
    titre: "Une page professionnelle certifiée, détournée en 48 heures",
    corps: [
      "Un faux partenariat rémunéré sert à faire activer une option qui donne la main sur la page. Un administrateur pirate est ajouté, le titulaire perd tout accès, la page finit suspendue.",
      "Sommation adressée à la plateforme de restaurer l'accès et de retirer les administrateurs frauduleux, sur le fondement de ses propres conditions générales et de l'obligation de sécurité des données.",
    ],
    obj: "Rétablissement de l'accès exclusif, suppression des accès pirates et restauration des contenus effacés — à défaut, saisine du juge",
  },
  {
    num: "02",
    type: "Plateforme vidéo · vie privée et harcèlement",
    titre: "Filmée à son insu, puis harcelée en commentaires",
    corps: [
      "Une vidéo tournée sur le lieu de travail, des commentaires malveillants, puis une chaîne créée pour cibler la personne.",
      "Notification visant l'atteinte à l'image et à la vie privée et le harcèlement moral en ligne, au visa de la LCEN et du règlement sur les services numériques. Retrait partiel obtenu et confirmé par écrit, puis nouvelle notification à la suite de la récidive, visant le retrait immédiat et la suspension du canal.",
    ],
    obj: "Cessation de la diffusion et des reprises, préparation de l'action au fond",
  },
  {
    num: "03",
    type: "Moteur de recherche · droit à l'oubli",
    titre: "Des articles de près de quinze ans, figés en tête des résultats",
    corps: [
      "Une condamnation ancienne et définitivement close, sans intérêt public actuel, reste amplifiée par le moteur — jusqu'à faire rompre des partenariats avec de grands groupes.",
      "Demande préalable de déréférencement adressée à l'exploitant du moteur, refusée. Saisine du tribunal en procédure accélérée au fond sur le fondement du droit à l'effacement : s'agissant de données pénales anciennes, le déréférencement doit être le principe.",
    ],
    obj: "Déréférencement des liens litigieux et restauration de l'activité professionnelle",
  },
  {
    num: "04",
    type: "Réseau social · identification d'auteur",
    titre: "Un compte anonyme usurpe une identité pour détruire une vie de famille",
    corps: [
      "Depuis un compte anonyme usurpant l'identité d'un tiers, des messages malveillants et des accusations sont diffusés à l'entourage. Vie familiale et professionnelle gravement atteintes.",
      "Action contre la plateforme pour la contraindre, sous astreinte et dans un délai déterminé, à communiquer les données d'identification du titulaire du compte, dans le périmètre que le juge peut ordonner.",
    ],
    obj: "Lever l'anonymat pour engager l'action pénale — harcèlement moral, usurpation d'identité",
  },
];

const ETAPES = [
  {
    n: "1",
    titre: "Qualifier",
    texte: "Hébergeur, éditeur, moteur, responsable de traitement. La qualification commande tout le régime applicable.",
    deliv: "Livrable — note de qualification",
  },
  {
    n: "2",
    titre: "Cartographier l'exposition",
    texte: "Contenus, reprises, données personnelles, usages de marque, comptes concernés et procédures internes déjà engagées.",
    deliv: "Livrable — inventaire des contenus et des reprises",
  },
  {
    n: "3",
    titre: "Sécuriser la preuve",
    texte: "Captation datée des contenus, constats, conservation des échanges avec la plateforme. Ce qui n'est pas constaté aujourd'hui aura disparu à l'audience.",
    deliv: "Livrable — dossier de preuve",
  },
  {
    n: "4",
    titre: "Notifier",
    texte: "Notification comportant les mentions prescrites, la description et la localisation précises des faits. C'est elle, et non le signalement, qui fait courir l'obligation de retrait.",
    deliv: "Livrable — notification opposable",
  },
  {
    n: "5",
    titre: "Agir",
    texte: "Référés et injonctions de retrait visant les contenus identiques et équivalents, déréférencement, demandes d'identification d'auteur, actions au fond.",
    deliv: "Terrain naturel du cabinet",
  },
];

const POURQUOI = [
  { num: "01", titre: "Un seul métier", texte: "Droit du numérique : plateformes, données personnelles, propriété intellectuelle, réputation en ligne." },
  { num: "02", titre: "Le cabinet plaide", texte: "Référés de retrait, assignations, demandes d'identification d'auteur, déréférencement devant le tribunal. Le contentieux, pas seulement le courrier." },
  { num: "03", titre: "La preuve qui tient", texte: "Notification opposable, constats, éléments d'identification : le dossier est construit pour résister, là où un simple signalement échoue." },
  { num: "04", titre: "Jusqu'à l'exécution", texte: "Premier courrier, notification juridique, procédure d'urgence, décision — et son exécution face à la plateforme." },
];

const AVOCATS = [
  { slug: "alexandre", role: "Droit des plateformes et contentieux", tags: ["Référé de retrait", "Identification d'auteur", "LCEN & DSA"] },
  { slug: "sarah", role: "Données personnelles et réputation en ligne", tags: ["Déréférencement", "Droit à l'oubli", "Droit à l'effacement"] },
];

// § 9 — Maillage sortant. Le contenu de conformité des autres pages n'est pas
// dupliqué ici : on y renvoie. « Défendre une plateforme » reste inactif tant
// que la page (DSA, responsabilité des intermédiaires) n'existe pas.
const LIENS = [
  { ancre: "Contrat de sous-traitance RGPD", href: "/nos-domaines/rgpd-donnees" },
  { ancre: "Réponse à incident et preuve technique", href: "/nos-domaines/cybersecurite" },
  { ancre: "Contrats IT et responsabilité du prestataire", href: "/nos-domaines/contrats-informatiques" },
  { ancre: "Défendre une plateforme", href: null }, // page à venir
];

/* ---------- Primitives ---------------------------------------------------- */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: light ? PERI : BLUE, margin: "0 0 10px" }}>
      {typeof children === "string" ? fr(children) : children}
    </p>
  );
}

function SectionHead({ label, titre, sub, light = false }: { label: string; titre: string; sub?: string; light?: boolean }) {
  return (
    <>
      <Eyebrow light={light}>{label}</Eyebrow>
      <h2 style={{ ...TYPE.h2, color: light ? "#fff" : LIGHT.text, margin: "0 0 10px", maxWidth: "26ch" }}>{fr(titre)}</h2>
      {sub ? (
        <p style={{ ...TYPE.secondary, color: light ? DARK.muted : LIGHT.muted, margin: "0 0 24px", maxWidth: "68ch", fontSize: 15 }}>{fr(sub)}</p>
      ) : null}
    </>
  );
}

const BTN_PRIMARY: CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  background: BLUE, color: "#fff", padding: "15px 26px", borderRadius: 8,
  fontSize: 14, fontWeight: 500, textDecoration: "none", minHeight: 48,
};

/* Carte de prestation, repliable sous 900 px (même comportement que la page
   contrats). Bouton réel dans le h3 ; jamais le h3 lui-même cliquable. */
function PrestationCard({ tag, titre, texte }: { tag: string; titre: string; texte: string }) {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const pid = `df-prest-${titre.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <article style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 12, padding: CARD_PAD }}>
      <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>
        {tag}
      </span>
      <h3 style={{ ...TYPE.h3, margin: 0 }}>
        {mobile ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={pid}
            style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, width: "100%", font: "inherit", color: "inherit", minHeight: 44 }}
          >
            <span>{fr(titre)}</span>
            <span aria-hidden style={{ color: BLUE, fontWeight: 400, flexShrink: 0 }}>{open ? "−" : "+"}</span>
          </button>
        ) : (
          fr(titre)
        )}
      </h3>
      <p id={pid} hidden={mobile && !open} style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.6, margin: "10px 0 0" }}>
        {fr(texte)}
      </p>
    </article>
  );
}

/* Comparateur : cinq fragments-boutons, une zone de résultat unique en
   aria-live. Un seul fragment actif ; un second clic le désélectionne. */
function Comparateur() {
  const [active, setActive] = useState<string | null>(null);
  const toggle = (k: string) => setActive((cur) => (cur === k ? null : k));
  const note = active ? CMP_NOTES[active] : null;

  const hot = (k: string, children: ReactNode) => (
    <button
      type="button"
      className="df-hot"
      aria-pressed={active === k}
      aria-expanded={active === k}
      aria-controls="df-cmpout"
      onClick={() => toggle(k)}
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="df-cmp">
        {/* Panneau gauche — EXEMPLE TYPE, jamais le message d'un client réel. */}
        <article className="df-doc df-doc--ko">
          <header>
            <span className="df-stamp df-stamp--ko">Sans effet juridique</span>
            <span className="df-dl">Formulaire de la plateforme</span>
          </header>
          <p className="df-dline"><em>À :</em> Équipe Contenus</p>
          <p className="df-dline"><em>Objet :</em> Signalement</p>
          <p className="df-dbody">
            Bonjour,<br /><br />
            Merci de retirer la publication qui me concerne, elle est fausse et me porte préjudice.
            C&apos;est urgent.<br /><br />
            Cordialement.
          </p>
          <footer className="df-dnote">
            {fr("Réponse type : « ce contenu est conforme à nos règles ». La situation juridique de la plateforme n'a pas changé.")}
          </footer>
        </article>

        {/* Panneau droit — notification opposable, fragments cliquables. */}
        <article className="df-doc df-doc--ok">
          <header>
            <span className="df-stamp df-stamp--ok">Opposable</span>
            <span className="df-dl">Notification adressée à l&apos;hébergeur</span>
          </header>
          <p className="df-dline"><em>Destinataire :</em> {hot("a", "l'hébergeur régulièrement identifié")}</p>
          <p className="df-dline"><em>Objet :</em> Notification aux fins de retrait</p>
          <p className="df-dbody">
            La présente, {hot("b", "datée et signée par le notifiant identifié")}, porte sur{" "}
            {hot("c", "un contenu décrit et localisé par son adresse exacte")}, dont le retrait est
            demandé {hot("d", "au visa des dispositions applicables et des motifs de fait")}, après{" "}
            {hot("e", "démarche auprès de l'auteur ou justification de son impossibilité")}.
          </p>
          <footer className="df-dnote">
            À compter de sa réception, la connaissance du contenu est acquise et l&apos;obligation
            d&apos;agir promptement court.
          </footer>
        </article>
      </div>

      <div className="df-cmpout" id="df-cmpout" role="status" aria-live="polite">
        {note ? (
          <>
            <span className="df-cmpk">{note[0]}</span>
            <p>{fr(note[1])}</p>
          </>
        ) : (
          <span className="df-cmpph">Sélectionnez une mention pour voir ce qu&apos;elle déclenche.</span>
        )}
      </div>
    </>
  );
}

/* ======================================================================== */

export default function DiffamationClient() {
  return (
    <main
      data-domaine="plateformes"
      style={{
        background: LIGHT.bg,
        color: LIGHT.text,
        fontFamily: "var(--ff-body)",
        // Header global en position absolue, transparent sur ce héro sombre :
        // le héro passe DESSOUS (comme les autres pages /nos-domaines). Pas de
        // paddingTop — il ferait apparaître le fond clair du <main> sous le
        // header (bande blanche). Le héro (photo 150px puis texte) dégage seul
        // les 72px du header sur mobile.
      }}
    >
      <style>{`
        /* ---- Héro : deux colonnes ≥1024 px, image en bande ≤1023 px ---- */
        .df-hero-grid { display: block; }
        .df-hero-photo { position: relative; width: 100%; height: 150px; overflow: hidden; }
        .df-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .df-hero-text { padding: 32px 24px 40px; }
        @media (min-width: 1024px) {
          .df-hero-grid { display: grid; grid-template-columns: 55fr 45fr; align-items: stretch; }
          .df-hero-photo { order: 2; height: auto; min-height: 480px; }
          .df-hero-text { order: 1; padding: 72px 40px 72px 0; display: flex; flex-direction: column; justify-content: center; }
        }
        /* ---- Accordéons natifs : indicateur +/− en CSS ---- */
        .df-acc details { border-bottom: 1px solid ${LIGHT.border}; }
        .df-acc summary { list-style: none; cursor: pointer; display: flex; gap: 16px; align-items: baseline; padding: 18px 0; }
        .df-acc summary::-webkit-details-marker { display: none; }
        .df-acc .df-num { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.06em; color: ${BLUE}; min-width: 190px; }
        .df-acc.df-faq .df-num { min-width: 34px; font-size: 15px; }
        .df-acc .df-q { font-size: 17px; font-weight: 500; flex: 1; letter-spacing: -0.01em; }
        .df-acc .df-plus { margin-left: auto; color: ${LIGHT.faint}; font-size: 20px; line-height: 1; flex-shrink: 0; }
        .df-acc .df-plus::after { content: "+"; }
        .df-acc details[open] .df-plus::after { content: "−"; color: ${BLUE}; }
        .df-acc .df-body { padding: 0 0 20px 206px; }
        .df-acc.df-faq .df-body { padding-left: 50px; }
        @media (max-width: 760px) {
          .df-acc summary { flex-wrap: wrap; gap: 6px 16px; }
          .df-acc .df-num { min-width: 0; }
          .df-acc .df-body, .df-acc.df-faq .df-body { padding-left: 0; }
        }
        /* ---- Scénario en six temps ---- */
        .df-scen { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: ${LIGHT.border}; border: 1px solid ${LIGHT.border}; border-radius: 12px; overflow: hidden; }
        @media (min-width: 1024px) { .df-scen { grid-template-columns: repeat(6, 1fr); } }
        @media (max-width: 559px) { .df-scen { grid-template-columns: repeat(2, 1fr); } }
        /* ---- Comparateur ---- */
        .df-cmp { display: grid; grid-template-columns: 1fr; gap: 20px; align-items: start; }
        @media (min-width: 900px) { .df-cmp { grid-template-columns: 1fr 1fr; } }
        .df-doc { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 24px; }
        .df-doc--ok { border-color: rgba(26,71,255,0.55); background: rgba(26,71,255,0.07); }
        .df-doc header { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.14); }
        .df-stamp { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 9px; border: 1px solid; border-radius: 4px; }
        .df-stamp--ko { color: #9AA0C8; border-color: rgba(255,255,255,0.25); }
        .df-stamp--ok { color: #fff; border-color: ${BLUE}; background: ${BLUE}; }
        .df-dl { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #8E94C0; }
        .df-dline { font-family: var(--ff-mono); font-size: 12.5px; color: #B8BCD8; margin: 0 0 8px; }
        .df-dline em { font-style: normal; color: #7A80A8; }
        .df-dbody { font-size: 15.5px; line-height: 1.7; color: #DDE0F2; margin: 16px 0 0; }
        .df-doc--ko .df-dbody { color: #9AA0C8; }
        .df-dnote { display: block; margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.14); font-size: 13.5px; line-height: 1.5; color: #8E94C0; }
        .df-doc--ok .df-dnote { color: #B8BCD8; }
        /* all: unset remet display à sa valeur initiale (inline-block sur un
           bouton dans certains moteurs) : on force inline pour que les
           fragments coulent comme du texte, avec césure naturelle et virgule
           collée. */
        .df-hot { all: unset; display: inline; cursor: pointer; color: #fff; border-bottom: 1px dashed ${PERI}; padding-bottom: 1px; }
        .df-hot:hover { border-bottom-style: solid; }
        .df-hot[aria-pressed="true"] { background: ${BLUE}; color: #fff; border-bottom-color: ${BLUE}; box-shadow: 0 0 0 3px ${BLUE}; }
        .df-hot:focus-visible { outline: 2px solid ${PERI}; outline-offset: 3px; }
        .df-cmpout { margin-top: 22px; border: 1px solid rgba(255,255,255,0.14); border-left: 3px solid ${BLUE}; background: rgba(255,255,255,0.04); border-radius: 0 8px 8px 0; padding: 22px 24px; min-height: 96px; }
        .df-cmpk { display: block; font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: ${PERI}; margin-bottom: 8px; }
        .df-cmpout p { margin: 0; color: #DDE0F2; font-size: 15.5px; line-height: 1.6; }
        .df-cmpph { color: #7A80A8; font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* ===== 1. HÉRO ===== */}
      <section style={{ background: DARK.bg, color: DARK.text, overflow: "hidden" }}>
        <div className="df-hero-grid" style={{ maxWidth: 960, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
          <div className="df-hero-photo">
            <picture>
              <source media="(max-width: 1023px)" type="image/webp" srcSet="/images/diffamation/hero-mobile.webp" />
              <source media="(max-width: 1023px)" srcSet="/images/diffamation/hero-mobile.jpg" />
              <source type="image/webp" srcSet="/images/diffamation/hero.webp" />
              <img
                className="df-hero-img"
                src="/images/diffamation/hero.jpg"
                width={1200}
                height={1500}
                alt="Rue parisienne déserte la nuit, descendant vers un carrefour encore éclairé"
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
            </picture>
          </div>

          <div className="df-hero-text">
            <span style={{ display: "inline-block", alignSelf: "flex-start", fontFamily: "var(--ff-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7fa8ff", background: "rgba(26,71,255,0.22)", borderRadius: 8, padding: "4px 12px", marginBottom: 18 }}>
              Diffamation · Retrait de contenus · Paris
            </span>
            <h1 style={{ ...TYPE.h1, color: "#fff", margin: "0 0 18px", overflowWrap: "break-word" }}>
              Avocat en diffamation et retrait de contenus en ligne
            </h1>
            <p style={{ fontSize: 19, fontWeight: 400, lineHeight: 1.4, color: "rgba(255,255,255,0.92)", margin: "0 0 16px", maxWidth: "32ch" }}>
              Vous avez signalé. La plateforme a refusé. Ça ne s&apos;arrête pas là.
            </p>
            <p style={{ fontSize: 15, color: DARK.muted, lineHeight: 1.7, margin: "0 0 26px", maxWidth: "64ch" }}>
              Lazarègue Avocats intervient à Paris et partout en France pour faire retirer un contenu
              illicite, faire déréférencer un résultat Google, faire supprimer un faux avis, identifier
              l&apos;auteur d&apos;un compte anonyme et défendre la réputation en ligne des entreprises
              comme des personnes.
            </p>
            <div className="flex flex-col sm:flex-row" style={{ gap: 12, alignItems: "flex-start" }}>
              <Link href={CONTACT} style={BTN_PRIMARY}>
                Faire analyser ma situation <span aria-hidden>→</span>
              </Link>
              <a href="#scenario" style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--ff-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.4)", padding: "0 0 5px", textDecoration: "none", minHeight: 44 }}>
                Voir comment le cabinet procède
              </a>
            </div>
            <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {HERO_CHIPS.map((c) => (
                <span key={c} style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C6CAE4", border: "1px solid rgba(255,255,255,0.28)", padding: "5px 11px", borderRadius: 6 }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. ROUTEUR ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Par où commencer" titre="Quelle est votre situation ?" />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {ROUTES.map((r) => (
              <Link key={r.q} href="#prestations" style={{ display: "block", background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 12, padding: "24px 22px", textDecoration: "none" }}>
                <span style={{ display: "block", fontSize: 17, fontWeight: 600, color: LIGHT.text, marginBottom: 8 }}>{fr(r.q)}</span>
                <span style={{ display: "block", fontSize: 14, color: LIGHT.muted, lineHeight: 1.55, marginBottom: 14 }}>{fr(r.d)}</span>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE }}>{fr(r.l)} →</span>
              </Link>
            ))}
          </div>
          <p style={{ margin: "20px 0 0" }}>
            <Link href={CONTACT} style={{ fontFamily: "var(--ff-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE }}>
              ou parlez-en directement à un avocat
            </Link>
          </p>
        </div>
      </section>

      {/* ===== 3. SCÉNARIO ===== */}
      <section id="scenario" style={{ background: LIGHT.bg, padding: SECTION_PAD, scrollMarginTop: 70 }}>
        <div style={INNER}>
          <SectionHead
            label="Le point de départ"
            titre="Que faire lorsqu'une plateforme refuse de retirer un contenu ?"
            sub="Un signalement adressé au formulaire interne d'une plateforme n'a, à lui seul, aucune portée juridique. Le déclencheur est ailleurs."
          />
          <div className="df-scen">
            {SCENARIO.map((s) => (
              <div key={s.n} style={{ background: s.dark ? DARK.bg : LIGHT.panel, color: s.dark ? "#fff" : LIGHT.text, padding: "20px 16px" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 22, color: s.dark ? PERI : BLUE, lineHeight: 1, display: "block", marginBottom: 8 }}>{s.n}</span>
                <b style={{ display: "block", fontWeight: 500, fontSize: 15, marginBottom: 5 }}>{fr(s.b)}</b>
                <span style={{ fontSize: 13.5, color: s.dark ? DARK.muted : LIGHT.muted, lineHeight: 1.45 }}>{fr(s.t)}</span>
              </div>
            ))}
          </div>
          <div className="df-acc" style={{ marginTop: 40, borderTop: `1px solid ${LIGHT.border}` }}>
            {SCENARIO_ACC.map((s) => (
              <details key={s.num}>
                <summary>
                  <span className="df-num">{fr(s.num)}</span>
                  <span className="df-q">{fr(s.q)}</span>
                  <span className="df-plus" aria-hidden />
                </summary>
                <div className="df-body">
                  <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{fr(s.a)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. COMPARATEUR (navy) ===== */}
      <section id="comparateur" style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="La différence qui décide de tout"
            titre="Le même contenu, deux courriers, deux effets juridiques"
            sub="À gauche, ce que la plupart des personnes envoient. À droite, ce qui fait courir l'obligation de retrait. Cliquez sur les mentions soulignées."
            light
          />
          <Comparateur />
        </div>
      </section>

      {/* ===== 5. CONCERNE ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Qui est concerné" titre="Dans quels litiges le cabinet intervient-il ?" />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {[
              { h: "Vous êtes une entreprise", items: CONCERNE.entreprise },
              { h: "Vous êtes une personne physique", items: CONCERNE.personne },
            ].map((pane) => (
              <div key={pane.h} style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 12, padding: "26px 24px" }}>
                <h3 style={{ ...TYPE.h3, margin: "0 0 12px" }}>{fr(pane.h)}</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {pane.items.map((it, i) => (
                    <li key={it} style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.5, padding: "9px 0 9px 18px", borderBottom: i < pane.items.length - 1 ? `1px solid ${LIGHT.border}` : "none", position: "relative" }}>
                      <span aria-hidden style={{ position: "absolute", left: 0, top: 17, width: 9, height: 1, background: BLUE }} />
                      {fr(it)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* § 5 — La défense d'un opérateur s'adresse au public opposé : encart
              séparé, lien inactif tant que la page « Défendre une plateforme »
              n'existe pas. */}
          <div style={{ marginTop: 24, background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: `3px solid ${LIGHT.faint}`, borderRadius: 8, padding: "22px 24px" }}>
            <p style={{ margin: 0, fontSize: 15.5, color: LIGHT.muted, lineHeight: 1.6 }}>
              <strong style={{ color: LIGHT.text, fontWeight: 600 }}>{fr("Vous exploitez une plateforme ou une place de marché ?")}</strong>{" "}
              La défense d&apos;un opérateur relève d&apos;une logique inverse de celle de cette page :
              qualification du service, exonération, procédures de notification et obligations issues du
              règlement sur les services numériques.{" "}
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: LIGHT.faint }}>— page à venir</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== 6. PRESTATIONS ===== */}
      <section id="prestations" style={{ background: LIGHT.bg, padding: SECTION_PAD, scrollMarginTop: 70 }}>
        <div style={INNER}>
          <SectionHead
            label="Interventions"
            titre="Retrait, déréférencement, faux avis, identification"
            sub="La réponse dépend rarement du seul contenu. Elle dépend du statut de la plateforme, de la régularité de la notification et du fondement mobilisé."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: GRID_GAP }}>
            {PRESTATIONS.map((p) => (
              <PrestationCard key={p.titre} tag={p.tag} titre={p.titre} texte={p.texte} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. RÉGIMES ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="La question préalable"
            titre="Quel régime s'applique à la plateforme ?"
            sub="La qualification du service commande l'ensemble du régime de responsabilité. Trois rôles possibles, trois régimes distincts. C'est la première chose que le cabinet établit."
          />
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
            {REGIMES.map((r) => (
              <article key={r.titre} style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderTop: `3px solid ${BLUE}`, borderRadius: 10, padding: CARD_PAD }}>
                <Eyebrow>{r.label}</Eyebrow>
                <h3 style={{ ...TYPE.h3, margin: "0 0 8px" }}>{fr(r.titre)}</h3>
                <p style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.55, margin: "0 0 12px" }}>{fr(r.role)}</p>
                <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, margin: "0 0 8px" }}>{fr(r.verdict)}</p>
                <p style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.55, margin: 0 }}>{fr(r.texte)}</p>
                {r.src ? (
                  <span style={{ display: "block", fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.08em", color: LIGHT.faint, marginTop: 14 }}>{r.src}</span>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. JURISPRUDENCE ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="La démonstration" titre="Une pratique bâtie sur les arrêts qui structurent la matière" />
          <Jurisprudence decisions={JURIS} />
        </div>
      </section>

      {/* ===== 9. RESPIRATION — texte seul sur navy ===== */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: "72px 0" }}>
        <div style={INNER}>
          <p style={{ fontWeight: 300, fontSize: "clamp(23px, 3.4vw, 38px)", lineHeight: 1.28, letterSpacing: "-0.02em", color: "#fff", margin: 0, maxWidth: "26ch" }}>
            Un contenu publié ne disparaît pas parce qu&apos;on le signale.<br />
            Il disparaît parce qu&apos;une obligation a été déclenchée.
          </p>
        </div>
      </section>

      {/* ===== 10. DOSSIERS — derrière le drapeau ===== */}
      {DOSSIERS_ENABLED ? (
        <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
          <div style={INNER}>
            <SectionHead
              label="Situations dans lesquelles le cabinet intervient"
              titre="Quatre affaires, sans les noms"
              sub="Le chemin réel, du signalement à la procédure. Quatre situations représentatives des demandes les plus fréquentes."
            />
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
              {DOSSIERS.map((d) => (
                <article key={d.num} style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: `3px solid ${BLUE}`, borderRadius: 10, padding: CARD_PAD }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 18, color: BLUE }}>{d.num}</span>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: LIGHT.faint }}>{d.type}</span>
                  </div>
                  <h3 style={{ ...TYPE.h3, margin: "0 0 12px" }}>{fr(d.titre)}</h3>
                  {d.corps.map((c, i) => (
                    <p key={i} style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 12px" }}>{fr(c)}</p>
                  ))}
                  <p style={{ margin: "16px 0 0", paddingTop: 14, borderTop: `1px solid ${LIGHT.border}`, fontSize: 14 }}>
                    <span style={{ display: "block", fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, marginBottom: 5 }}>Objectif</span>
                    {fr(d.obj)}
                  </p>
                </article>
              ))}
            </div>
            <p style={{ margin: "24px 0 0", fontSize: 13, color: LIGHT.faint, maxWidth: "70ch" }}>
              Dossiers réels, dont les éléments d&apos;identification ont été écartés. Plusieurs
              procédures sont en cours ; chaque affaire dépend de ses circonstances propres et aucun
              résultat ne peut être garanti.
            </p>
          </div>
        </section>
      ) : null}

      {/* ===== 11. MÉTHODE ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Méthode"
            titre="De la qualification au contentieux"
            sub="Une démarche structurée, valable pour une personne visée par un contenu comme pour une entreprise attaquée sur sa réputation."
          />
          <div>
            {ETAPES.map((e, i) => (
              <div key={e.n} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 20, padding: "22px 0", borderBottom: i < ETAPES.length - 1 ? `1px solid ${LIGHT.border}` : "none" }}>
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 34, fontWeight: 500, color: BLUE, lineHeight: 1 }}>{e.n}</div>
                <div>
                  <h3 style={{ ...TYPE.h3, margin: "0 0 6px" }}>{fr(e.titre)}</h3>
                  <p style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{fr(e.texte)}</p>
                  <span style={{ display: "inline-block", marginTop: 10, fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: LIGHT.faint }}>{fr(e.deliv)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 12. POURQUOI (navy) ===== */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Pourquoi le cabinet" titre="Le contentieux des plateformes, de la mise en demeure à l'audience" light />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 1, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.14)" }}>
            {POURQUOI.map((b) => (
              <div key={b.num} style={{ background: "#0b1130", padding: "24px 26px" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.14em", color: PERI, display: "block", marginBottom: 10 }}>{b.num}</span>
                <h3 style={{ ...TYPE.h3, color: "#fff", margin: "0 0 6px" }}>{fr(b.titre)}</h3>
                <p style={{ fontSize: 14.5, color: DARK.muted, lineHeight: 1.55, margin: 0 }}>{fr(b.texte)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. NOTRE APPROCHE ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Notre approche</Eyebrow>
          <p style={{ fontWeight: 300, fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.25, color: LIGHT.text, maxWidth: "26ch", margin: "0 0 26px", paddingLeft: 22, borderLeft: `3px solid ${BLUE}` }}>
            Le retrait d&apos;un contenu se prépare avant la demande, pas après le refus.
          </p>
          <h2 style={{ ...TYPE.h2, margin: "0 0 10px" }}>Qui traite votre dossier</h2>
          <p style={{ ...TYPE.secondary, fontSize: 15, margin: "0 0 26px", maxWidth: "72ch" }}>
            Retrait de contenu, déréférencement et identification d&apos;auteur relèvent autant du droit
            des plateformes que de celui des données personnelles. Les deux sont traités ensemble.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: GRID_GAP, alignItems: "stretch", maxWidth: 640 }}>
            {AVOCATS.map((a) => (
              <MembreCarte key={a.slug} membre={a} couleurs={{ panneau: LIGHT.panel2, carte: LIGHT.panel, bordure: LIGHT.border, texte: LIGHT.text, secondaire: LIGHT.muted, accent: BLUE }} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 14. FAQ ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Questions fréquentes" titre="Ce que l'on demande au cabinet avant de commencer" />
          <div className="df-acc df-faq" style={{ borderTop: `1px solid ${LIGHT.border}` }}>
            {FAQ_ITEMS.map((item, i) => (
              <details key={item.q}>
                <summary>
                  <span className="df-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="df-q" style={{ margin: 0, fontWeight: 500 }}>{fr(item.q)}</h3>
                  <span className="df-plus" aria-hidden />
                </summary>
                <div className="df-body">
                  <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{fr(item.a)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Maillage sortant (§9) ===== */}
      <section style={{ background: LIGHT.bg, padding: "40px 0" }}>
        <div style={INNER}>
          <Eyebrow>Pour aller plus loin</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: GRID_GAP }}>
            {LIENS.map((lk) =>
              lk.href ? (
                <Link key={lk.ancre} href={lk.href} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 10, padding: "16px 18px", fontSize: 14.5, fontWeight: 500, color: LIGHT.text, textDecoration: "none" }}>
                  {fr(lk.ancre)}
                  <span aria-hidden style={{ color: BLUE }}>→</span>
                </Link>
              ) : (
                <div key={lk.ancre} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, background: LIGHT.panel2, border: `1px dashed ${LIGHT.border}`, borderRadius: 10, padding: "16px 18px", fontSize: 14.5, color: LIGHT.faint }}>
                  {fr(lk.ancre)}
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: LIGHT.faint }}>Page à venir</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== 15. CTA ===== */}
      <section style={{ background: BLUE, color: "#fff", padding: "72px 0", textAlign: "center" }}>
        <div style={INNER}>
          <h2 style={{ ...TYPE.h2, color: "#fff", margin: "0 auto 12px", maxWidth: "24ch" }}>
            {fr("Un contenu à faire retirer, un résultat à faire déréférencer ?")}
          </h2>
          <p style={{ fontSize: 16, color: "#DDE2FF", margin: "0 auto 28px", maxWidth: "52ch", lineHeight: 1.6 }}>
            Un premier échange pour qualifier votre situation et déterminer les recours réellement
            disponibles, sans engagement.
          </p>
          <Link href={CONTACT} style={{ ...BTN_PRIMARY, background: "#fff", color: BLUE }}>
            Faire analyser ma situation
          </Link>
        </div>
      </section>
    </main>
  );
}
