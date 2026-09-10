"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { MembreCarte } from "@/components/equipe-dossier";
import { fr } from "@/lib/typo";
import { FAQ_ITEMS } from "./faq";

/* ==========================================================================
   Page « Contrats informatiques et projets IT ».

   Reconstruite à partir de la maquette de référence avec les primitives du
   site (jetons repris à l'identique des autres pages de domaine). La barre de
   navigation, le pied de page et le bandeau de clôture « Votre problème
   numérique a une solution » sont fournis par le layout global : la page ne
   les redéclare pas.

   Pas de couleur de famille inventée : la famille « Contrats / opérations »
   n'a pas encore d'accent arbitré par le cabinet. On s'en tient donc au bleu
   d'action et aux gris neutres.
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
const DEEP = "#0A2ACC";

const INNER: CSSProperties = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
const SECTION_PAD = "56px 0";
const CARD_PAD = 18;
const GRID_GAP = 12;

const TYPE = {
  h1: { fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 600, lineHeight: 1.08 } as const,
  h2: { fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 600, lineHeight: 1.25 } as const,
  h3: { fontSize: 18, fontWeight: 600, lineHeight: 1.35 } as const,
  body: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 } as const,
  secondary: { fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: LIGHT.muted } as const,
};

/* -----------------------------------------------------------------------
   § 6 — DRAPEAU DE FONCTIONNALITÉ « DOSSIERS »

   Ces quatre dossiers sont anonymisés mais très caractérisants, en
   particulier le quatrième — identifiable par le nombre d'intervenants et
   l'ordre de grandeur. Leur publication soulève une question de secret
   professionnel que seul le cabinet peut trancher. Tant que le drapeau vaut
   `false`, la section n'est pas rendue et aucun lien de la page n'y renvoie.

   TODO (cabinet) — décider de la levée du drapeau et du niveau de détail.
   ----------------------------------------------------------------------- */
const DOSSIERS_ENABLED = false;

// TODO (cabinet) — destinations réelles des boutons « Faire auditer un
// contrat » et « Évaluer un litige » : formulaire dédié, prise de rendez-vous
// ou page contact. `/contact` est une page réelle (aucun href="#" en
// production) ; à confirmer par le cabinet.
const CONTACT = "/contact";

/* ---------- Données ------------------------------------------------------ */

const HERO_CHIPS = ["Contrats IT", "SaaS & cloud", "Infogérance", "Responsabilité", "Preuve"];

const ROUTES = [
  {
    q: "Un contrat est sur la table",
    d: "Négociation, renouvellement, contrat imposé par un éditeur ou un donneur d'ordre.",
    l: "Faire auditer un contrat",
    href: "#contrats",
  },
  {
    q: "Un projet informatique dérape",
    d: "Retards, anomalies persistantes, recette contestée, dépassement budgétaire.",
    l: "Contentieux des projets IT",
    href: "#contentieux",
  },
  {
    // La page dédiée « Responsabilité du prestataire informatique » n'existe
    // pas encore : cette porte pointe vers le contentieux de la présente page.
    // Le jour où la page dédiée est créée, la faire pointer vers elle (brief §5).
    q: "Une perte de données ou un incident",
    d: "Sauvegardes défaillantes, indisponibilité prolongée, défaillance après cyberattaque.",
    l: "Responsabilité du prestataire",
    href: "#contentieux",
  },
  {
    q: "Un changement de prestataire est bloqué",
    d: "Réversibilité refusée, format inexploitable, frais de sortie disproportionnés.",
    l: "Débloquer la sortie du contrat",
    href: "#contrats",
  },
];

const CONTRATS = [
  {
    tag: "SaaS & cloud",
    titre: "Contrats SaaS et cloud",
    texte:
      "Un contrat SaaS n'est ni une vente ni une licence classique : il organise l'accès à un service continu dont le client ne maîtrise ni l'infrastructure, ni le rythme des évolutions. Niveaux de service et sanctions, localisation des données, conditions de sortie, plafonnement des frais de migration.",
  },
  {
    tag: "Licence",
    titre: "Licences de logiciels",
    texte:
      "Étendue des droits concédés, nombre d'utilisateurs et de postes, périmètre géographique, droit d'audit de l'éditeur, sous-licence, sort des développements spécifiques. La licence détermine ce que l'entreprise peut faire de son outil, et ce que l'éditeur peut lui réclamer des années après la signature.",
  },
  {
    tag: "Développement",
    titre: "Développement de logiciels et d'applications",
    texte:
      "Le prestataire est tenu d'une obligation de moyens renforcée : il lui appartient de démontrer ses diligences. Une obligation de résultat peut être retenue lorsqu'il s'engage sur un livrable conforme à un cahier des charges précis. La propriété du code source se joue au même endroit.",
  },
  {
    tag: "Intégration",
    titre: "Intégration d'ERP, de CRM et de solutions métier",
    texte:
      "Ces projets concentrent les causes classiques d'échec : besoin insuffisamment exprimé, reprise de données sous-estimée, recette conduite sans réserves écrites, calendrier glissant. Structuration du projet, procédure de recette, traçabilité des alertes et des validations.",
  },
  {
    tag: "Infogérance",
    titre: "Infogérance et externalisation",
    texte:
      "Le contrat transfère au prestataire l'exploitation de tout ou partie du système d'information. Périmètre exact des services, engagements de disponibilité, obligations de sécurité et de sauvegarde, plan de réversibilité et durée de l'assistance à la transition.",
  },
  {
    tag: "Maintenance",
    titre: "Maintenance et support informatique",
    texte:
      "Un contrat de maintenance informatique se lit d'abord par ce qu'il exclut. Correctif, évolutif et préventif, délais de prise en charge et de rétablissement, plages d'astreinte, sort des versions non maintenues, articulation avec la licence et la fourniture du matériel.",
  },
  {
    tag: "Hébergement",
    titre: "Hébergement, cloud et services managés",
    texte:
      "Localisation et souveraineté des données, mesures de sécurité contractualisées, notification des incidents, sous-traitance en cascade, conditions et coût de récupération des données en fin de contrat. Le cabinet traite également l'hébergement de données de santé.",
  },
  {
    tag: "Régie & forfait",
    titre: "Assistance technique, régie et forfait",
    texte:
      "Le choix entre régie et forfait modifie la répartition des responsabilités, le pilotage du projet et l'appréciation des retards ou des dépassements budgétaires. Il emporte aussi un risque de requalification lorsque l'encadrement effectif des intervenants échappe au prestataire.",
  },
  {
    tag: "Données & API",
    titre: "Contrats de données, API et interconnexions",
    texte:
      "Mise à disposition de bases de données, contrats d'interface, conditions d'accès aux API, droits d'usage et de réutilisation, articulation avec les rôles de responsable de traitement et de sous-traitant au sens du RGPD.",
  },
  {
    tag: "Cybersécurité",
    titre: "Contrats de cybersécurité et de sauvegarde",
    texte:
      "Sauvegarde, supervision, détection et réponse à incident. Ces contrats doivent énoncer précisément ce à quoi le prestataire s'engage : c'est cette rédaction, et non la qualification générale du contrat, qui déterminera sa responsabilité le jour de l'incident.",
  },
];

const AUTODIAG = [
  "Un contrat IT a été signé sans cahier des charges formalisé et signé.",
  "Les contrats SaaS ou cloud ne précisent pas comment récupérer les données en fin de contrat, ni à quel coût.",
  "Le prestataire n'a aucune obligation contractuelle de sécurité ni de sauvegarde.",
  "Une perte de données ou un incident est survenu et le recours contre le prestataire reste incertain.",
  "La résiliation d'un contrat IT est envisagée, mais les pénalités réclamées paraissent disproportionnées.",
  "Les contrats de fourniture, de maintenance et de financement ont été signés séparément, sans clause d'interdépendance.",
  "En tant que prestataire, vous intervenez sur le système d'information de vos clients sans encadrement contractuel de votre responsabilité.",
];

const REGIMES = [
  {
    label: "Prestataire IT",
    titre: "Obligations renforcées",
    texte:
      "Le prestataire doit s'informer des besoins de son client et l'alerter sur les difficultés ou les risques que ses compétences lui permettent d'identifier.",
    points: [
      "Devoir de conseil et de mise en garde, y compris sur les risques de cybersécurité",
      "Engagement exprès de sauvegardes exploitables : leur absence ou leur inefficacité peut caractériser l'inexécution",
      "Selon la mission et les engagements souscrits : obligation de moyens, parfois renforcée, ou de résultat portant sur certains livrables",
    ],
  },
  {
    label: "Client PME / ETI",
    titre: "Devoir de collaboration",
    texte:
      "Le client doit exprimer ses besoins, valider les étapes et conserver les preuves. Un manquement sérieux du client peut réduire la responsabilité du prestataire.",
    points: [
      "Formaliser les besoins par écrit",
      "Valider et signer les recettes, réserves comprises",
      "Documenter les refus de recommandations",
    ],
  },
  {
    label: "Devant le juge",
    titre: "La preuve technique",
    texte: "Audits, journaux, rapports d'expert, constats. Le juge tranche sur les pièces, pas sur les déclarations.",
    points: [
      "Configuration conforme aux référentiels applicables",
      "Journaux de sauvegarde horodatés",
      "Traçabilité écrite des mises en garde",
    ],
  },
];

const CLAUSES = [
  {
    num: "01",
    titre: "La clause de sauvegarde",
    texte:
      "« Mon prestataire gère les sauvegardes » ne se vérifie qu'au contrat. Il faut y lire la fréquence, la rétention, l'externalisation, le test de restauration et l'engagement sur le délai de reprise. Sans ces éléments, la sauvegarde est une pratique, pas une obligation.",
  },
  {
    num: "02",
    titre: "La clause de réversibilité",
    texte:
      "Formats de restitution, délais, durée de l'assistance à la transition, plafonnement du coût. En l'absence de cette clause, la récupération des données se négocie au moment où le rapport de force est le plus défavorable.",
  },
  {
    num: "03",
    titre: "La clause limitative de responsabilité",
    texte:
      "Un plafond aligné sur douze mois d'abonnement couvre rarement une perte de données réelle. Seule est réputée non écrite la clause qui contredit la portée de l'obligation essentielle souscrite : un plafond non dérisoire, librement négocié, résiste au manquement même essentiel.",
  },
  {
    num: "04",
    titre: "Le niveau de service",
    texte:
      "Disponibilité, délai de prise en charge, délai de rétablissement, périmètre des exclusions. Un engagement de service sans pénalité ni crédit associé reste une promesse commerciale.",
  },
  {
    num: "05",
    titre: "La clause d'interdépendance",
    texte:
      "Fourniture, maintenance et financement sont signés séparément, puis traités isolément le jour où le projet s'arrête. Lorsque ces contrats poursuivent un même but et n'ont aucun sens séparément, leur interdépendance peut être reconnue et emporter la caducité de l'ensemble.",
  },
];

const LITIGES = [
  "Retards de livraison et dépassements budgétaires",
  "Logiciel inutilisable ou non conforme au cahier des charges",
  "Échec d'une intégration ou d'une migration de données",
  "Indisponibilités prolongées et pertes de données",
  "Défaillance du prestataire à la suite d'une cyberattaque",
  "Manquement au devoir de conseil et de mise en garde",
  "Blocage de la réversibilité et rétention des données",
  "Rupture anticipée d'un contrat à durée déterminée",
  "Expertise judiciaire informatique, de la désignation au rapport",
  "Résolution du contrat, restitutions et indemnisation",
];

// § 8 — TODO (cabinet) : les quatre chiffres ci-dessous (1,8 M€, dix-huit
// mois, quatre millions de fichiers, cinq ans / plusieurs centaines de
// milliers d'euros) sont à recouper dans les dossiers avant toute publication.
// La section n'est de toute façon rendue que si DOSSIERS_ENABLED vaut true.
const DOSSIERS = [
  {
    num: "01",
    type: "Production paralysée",
    titre: "Des sauvegardes inutilisables après une cyberattaque",
    corps: [
      "À la suite d'un rançongiciel, une entreprise industrielle découvre que ses sauvegardes ne permettent pas de restaurer son système. Le prestataire soutient que leur contrôle ne relevait pas de son périmètre.",
      "Le cabinet analyse le contrat, les tickets d'assistance, les rapports d'intervention et les journaux techniques afin d'identifier les engagements effectivement souscrits. Les preuves susceptibles de disparaître sont immédiatement préservées, avant l'envoi de la mise en demeure et l'organisation d'une expertise contradictoire.",
    ],
    enjeu: "Plusieurs semaines d'arrêt de production et des pertes d'exploitation majeures",
  },
  {
    num: "02",
    type: "Projet ERP hors de contrôle",
    titre: "1,8 million d'euros engagés et dix-huit mois de retard",
    corps: [
      "L'intégrateur réclame le paiement du solde alors que plusieurs fonctions essentielles de l'ERP restent inutilisables. Il oppose au client des procès-verbaux de recette signés ainsi qu'un plafond de responsabilité très faible.",
      "Le cabinet reconstitue la chronologie du projet. L'analyse porte notamment sur les réserves formulées lors des validations, les anomalies critiques reportées d'une version à l'autre et le caractère déterminant du calendrier. Le dossier est construit autour des engagements inexécutés et des preuves techniques, plutôt que d'une simple insatisfaction du client.",
    ],
    enjeu: "Résolution du contrat, restitution des sommes versées et financement d'une solution de remplacement",
  },
  {
    num: "03",
    type: "Données prises en otage",
    titre: "Quatre millions de fichiers bloqués au moment de changer de prestataire",
    corps: [
      "Une société décide de quitter sa solution cloud. Le fournisseur accepte de restituer les données, mais uniquement dans un format inexploitable et contre une facture de sortie représentant près de deux années d'abonnement.",
      "Le cabinet examine la clause de réversibilité, les engagements commerciaux, les spécifications d'export et la documentation technique. Une stratégie d'urgence est préparée pour préserver l'accès au service et obtenir la restitution des données dans un format effectivement réutilisable.",
    ],
    enjeu: "Continuité d'activité et récupération du patrimoine informationnel de l'entreprise",
  },
  {
    num: "04",
    type: "Quatre contrats, un seul échec",
    titre: "Des loyers encore prélevés pour un système devenu inutilisable",
    corps: [
      "Une PME demeure engagée pendant cinq ans auprès de plusieurs sociétés : fournisseur de matériels, intégrateur, mainteneur et organisme de financement. Le projet informatique échoue, mais les loyers continuent d'être prélevés pour des équipements et des services devenus inutiles.",
      "Le cabinet reconstitue l'opération dans son ensemble : dates de signature, identité des intervenants, matériels financés, circulation des documents et dépendance économique entre les contrats. L'analyse vise à déterminer si la disparition du contrat principal peut entraîner la caducité des contrats de financement associés.",
    ],
    enjeu: "Plusieurs centaines de milliers d'euros d'engagements résiduels",
  },
];

const ETAPES = [
  {
    n: "1",
    titre: "Audit contractuel",
    texte:
      "Inventaire des contrats IT, SaaS, cloud et infogérance. Identification des lacunes critiques : sauvegarde, réversibilité, responsabilité, pénalités.",
    deliv: "Livrable — matrice des risques contractuels",
  },
  {
    n: "2",
    titre: "Analyse juridique",
    texte:
      "Qualification des obligations de chaque partie, examen des clauses limitatives, articulation entre fourniture, maintenance et financement.",
    deliv: "Livrable — note de qualification",
  },
  {
    n: "3",
    titre: "Négociation et rédaction",
    texte:
      "Clauses sur mesure : cahier des charges, sauvegarde, cybersécurité, réversibilité, plafonds de responsabilité adaptés à l'exposition réelle.",
    deliv: "Livrable — contrats ou avenants",
  },
  {
    n: "4",
    titre: "Formalisation et preuve",
    texte:
      "Recettes signées, mises en garde tracées, registre des engagements. Ce qui tient devant un juge si le litige survient.",
    deliv: "Livrable — dossier de preuve",
  },
  {
    n: "5",
    titre: "Contentieux et défense",
    texte:
      "Perte de données, projet avorté, résiliation contestée, expertise judiciaire. Articulation de la preuve technique et de l'argumentaire juridique.",
    deliv: "Terrain naturel du cabinet",
  },
];

const QUAND = [
  { b: "Avant l'appel d'offres", d: "Pour cadrer l'expression des besoins et le futur cahier des charges." },
  { b: "Avant la signature ou le renouvellement", d: "Tant que le contrat est encore négociable." },
  { b: "Lorsque le projet dérape", d: "Au moment où les réserves peuvent encore être formalisées utilement." },
  { b: "Avant une mise en demeure ou une résiliation", d: "Sa rédaction détermine la suite du dossier." },
  { b: "Lors d'un incident ou d'une expertise", d: "Pour organiser la conservation et la production des preuves techniques." },
  { b: "Avant une migration ou un changement de prestataire", d: "Pour faire jouer la réversibilité pendant que le contrat court encore." },
];

const AVOCATS = [
  { slug: "alexandre", role: "Droit du numérique et cybersécurité", tags: ["Contrats IT", "Cybersécurité", "Contentieux"] },
  { slug: "amir", role: "Contrats informatiques et contentieux IT", tags: ["Contrats IT", "Responsabilité", "Preuve"] },
  { slug: "sarah", role: "Données personnelles et intelligence artificielle", tags: ["RGPD", "Contrats de données", "Conformité numérique"] },
];

const KHALID_EXAMINE = [
  "État réel des sauvegardes et des tests de restauration",
  "Journaux, configurations et traces d'intervention du prestataire",
  "Chronologie technique des anomalies et des correctifs",
  "Faisabilité et format des opérations de réversibilité",
];

// § 5 — Maillage sortant. Le contenu de conformité des pages cybersécurité,
// RGPD et AI Act n'est pas dupliqué ici : on y renvoie.
const LIENS = [
  { ancre: "Obligations de sécurité et réponse à incident", href: "/nos-domaines/cybersecurite" },
  { ancre: "Contrat de sous-traitance RGPD", href: "/nos-domaines/rgpd-donnees" },
  { ancre: "Systèmes d'IA fournis par un prestataire", href: "/nos-domaines/ia-act" },
  { ancre: "Due diligence des actifs technologiques (M&A)", href: "/competences/ma-tech" },
  { ancre: "Responsabilité du prestataire informatique", href: null }, // page à venir
];

/* ---------- Primitives locales ------------------------------------------- */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: light ? "#7fa8ff" : BLUE,
        margin: "0 0 10px",
      }}
    >
      {typeof children === "string" ? fr(children) : children}
    </p>
  );
}

function SectionHead({
  label,
  titre,
  sub,
  light = false,
}: {
  label: string;
  titre: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <>
      <Eyebrow light={light}>{label}</Eyebrow>
      <h2 style={{ ...TYPE.h2, color: light ? "#fff" : LIGHT.text, margin: "0 0 10px", maxWidth: "24ch" }}>{fr(titre)}</h2>
      {sub ? (
        <p style={{ ...TYPE.secondary, color: light ? DARK.muted : LIGHT.muted, margin: "0 0 24px", maxWidth: "68ch" }}>
          {fr(sub)}
        </p>
      ) : null}
    </>
  );
}

const BTN_PRIMARY: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  background: BLUE,
  color: "#fff",
  padding: "15px 26px",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
  minHeight: 48,
};

const BTN_GHOST: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  background: "transparent",
  color: "rgba(255,255,255,0.9)",
  padding: "15px 24px",
  borderRadius: 8,
  fontSize: 14,
  textDecoration: "none",
  border: `1px solid ${DARK.border}`,
  minHeight: 48,
};

/* ---------- Carte de contrat (repliable sous 900 px) --------------------- */

function ContratCard({ tag, titre, texte }: { tag: string; titre: string; texte: string }) {
  // Sous 900 px, la description se replie derrière un vrai bouton placé DANS
  // le h3 ; au-dessus, le titre redevient du texte et le paragraphe est
  // visible. On ne rend jamais le h3 lui-même cliquable (défaut de la version
  // précédente). Le premier rendu (serveur + hydratation) est toujours la vue
  // « bureau » — l'état mobile n'est appliqué qu'après montage, ce qui évite
  // toute divergence d'hydratation. Le paragraphe reste dans le DOM (attribut
  // `hidden`), donc lisible par les moteurs.
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const pid = `contrat-${titre.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <article
      style={{
        background: LIGHT.panel,
        border: `1px solid ${LIGHT.border}`,
        borderRadius: 12,
        padding: CARD_PAD,
      }}
    >
      <span
        style={{
          fontFamily: "var(--ff-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: BLUE,
          display: "block",
          marginBottom: 10,
        }}
      >
        {tag}
      </span>
      <h3 style={{ ...TYPE.h3, margin: 0 }}>
        {mobile ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={pid}
            style={{
              all: "unset",
              boxSizing: "border-box",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 14,
              width: "100%",
              font: "inherit",
              color: "inherit",
              minHeight: 44,
            }}
          >
            <span>{fr(titre)}</span>
            <span aria-hidden style={{ color: BLUE, fontWeight: 400, flexShrink: 0 }}>
              {open ? "−" : "+"}
            </span>
          </button>
        ) : (
          fr(titre)
        )}
      </h3>
      <p
        id={pid}
        hidden={mobile && !open}
        style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.6, margin: "10px 0 0" }}
      >
        {fr(texte)}
      </p>
    </article>
  );
}

/* ======================================================================== */

export default function ContratsInformatiquesClient() {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) =>
    setChecked((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  const n = checked.length;

  return (
    <main
      data-domaine="contrats"
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
        /* ---- Héro : deux colonnes ≥1024 px, image en bande ≤1023 px ----
           Le texte reste toujours sur aplat navy (l'image n'est jamais en
           fond du texte), donc le contraste du texte blanc est garanti. */
        .cx-hero-grid { display: block; }
        .cx-hero-photo { position: relative; width: 100%; height: 150px; overflow: hidden; }
        .cx-hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .cx-hero-text { padding: 32px 24px 40px; }
        @media (min-width: 1024px) {
          .cx-hero-grid { display: grid; grid-template-columns: 55fr 45fr; align-items: stretch; gap: 0; }
          .cx-hero-photo { order: 2; height: auto; min-height: 460px; }
          .cx-hero-text { order: 1; padding: 72px 40px 72px 0; display: flex; flex-direction: column; justify-content: center; }
        }
        /* ---- Accordéons natifs (clauses + FAQ) : indicateur +/− en CSS ---- */
        .cx-acc details { border-bottom: 1px solid ${LIGHT.border}; }
        .cx-acc summary { list-style: none; cursor: pointer; display: flex; gap: 16px; align-items: baseline; padding: 18px 0; }
        .cx-acc summary::-webkit-details-marker { display: none; }
        .cx-acc .cx-plus { margin-left: auto; color: ${LIGHT.faint}; font-size: 20px; line-height: 1; flex-shrink: 0; }
        .cx-acc .cx-plus::after { content: "+"; }
        .cx-acc details[open] .cx-plus::after { content: "−"; color: ${BLUE}; }
        .cx-acc .cx-body { padding: 0 0 20px; }
        /* Entrée du bouton conditionnel de l'autodiagnostic. */
        @keyframes cxReveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .cx-reveal { animation: cxReveal 240ms ease both; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* ===== 1. HÉRO ===== */}
      <section style={{ background: DARK.bg, color: DARK.text, overflow: "hidden" }}>
        <div className="cx-hero-grid" style={{ maxWidth: 960, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
          <div className="cx-hero-photo">
            <picture>
              <source media="(max-width: 1023px)" type="image/webp" srcSet="/images/contrats-informatiques/hero-mobile.webp" />
              <source media="(max-width: 1023px)" srcSet="/images/contrats-informatiques/hero-mobile.jpg" />
              <source type="image/webp" srcSet="/images/contrats-informatiques/hero.webp" />
              <img
                className="cx-hero-img"
                src="/images/contrats-informatiques/hero.jpg"
                width={1200}
                height={1500}
                alt="Façade d'un immeuble de bureaux à la tombée du jour, un plateau encore éclairé"
                // Chargement prioritaire : le héro est le premier écran.
                fetchPriority="high"
                decoding="async"
                loading="eager"
              />
            </picture>
          </div>

          <div className="cx-hero-text">
            <span
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7fa8ff",
                background: "rgba(26,71,255,0.22)",
                borderRadius: 8,
                padding: "4px 12px",
                marginBottom: 18,
              }}
            >
              Contrats informatiques · Paris
            </span>
            <h1 style={{ ...TYPE.h1, color: "#fff", margin: "0 0 18px", overflowWrap: "break-word" }}>
              Avocat en contrats informatiques et projets IT à Paris
            </h1>
            {/* Accroche en paragraphe, pas en titre. */}
            <p style={{ fontSize: 19, fontWeight: 400, lineHeight: 1.4, color: "rgba(255,255,255,0.92)", margin: "0 0 16px", maxWidth: "34ch" }}>
              Un contrat IT mal rédigé vous expose autant qu'un incident technique.
            </p>
            <p style={{ fontSize: 15, color: DARK.muted, lineHeight: 1.7, margin: "0 0 26px", maxWidth: "62ch" }}>
              Lazarègue Avocats accompagne les PME, ETI, éditeurs, intégrateurs et ESN dans la
              négociation, l'exécution et le contentieux de leurs contrats informatiques : logiciels,
              SaaS, cloud, infogérance et projets de transformation numérique.
            </p>
            <div className="flex flex-col sm:flex-row" style={{ gap: 12, alignItems: "flex-start" }}>
              <Link href={CONTACT} style={BTN_PRIMARY}>
                Faire auditer un contrat <span aria-hidden>→</span>
              </Link>
              <a
                href="#contentieux"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "var(--ff-mono)",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fff",
                  borderBottom: "1px solid rgba(255,255,255,0.4)",
                  padding: "0 0 5px",
                  textDecoration: "none",
                  minHeight: 44,
                }}
              >
                Évaluer un projet en difficulté
              </a>
            </div>
            <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {HERO_CHIPS.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C6CAE4",
                    border: "1px solid rgba(255,255,255,0.28)",
                    padding: "5px 11px",
                    borderRadius: 6,
                  }}
                >
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
              <Link
                key={r.q}
                href={r.href}
                style={{
                  display: "block",
                  background: LIGHT.panel,
                  border: `1px solid ${LIGHT.border}`,
                  borderRadius: 12,
                  padding: "24px 22px",
                  textDecoration: "none",
                }}
              >
                <span style={{ display: "block", fontSize: 17, fontWeight: 600, color: LIGHT.text, marginBottom: 8 }}>
                  {r.q}
                </span>
                <span style={{ display: "block", fontSize: 14, color: LIGHT.muted, lineHeight: 1.55, marginBottom: 14 }}>
                  {r.d}
                </span>
                <span
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: BLUE,
                  }}
                >
                  {r.l} →
                </span>
              </Link>
            ))}
          </div>
          <p style={{ margin: "20px 0 0" }}>
            <Link
              href={CONTACT}
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: BLUE,
              }}
            >
              ou parlez-en directement à un avocat
            </Link>
          </p>
        </div>
      </section>

      {/* ===== 3. QUELS CONTRATS — dix h3 ===== */}
      <section id="contrats" style={{ background: LIGHT.bg, padding: SECTION_PAD, scrollMarginTop: 70 }}>
        <div style={INNER}>
          <SectionHead
            label="Périmètre d'intervention"
            titre="Quels contrats informatiques le cabinet accompagne-t-il ?"
            sub="La qualification du contrat commande le régime de responsabilité applicable. Une même opération associe fréquemment une licence, une prestation d'intégration, un contrat de maintenance et un financement, dont les régimes diffèrent et dont l'articulation détermine ce qu'il adviendra en cas de défaillance de l'un d'eux. Le cabinet intervient depuis Paris et sur l'ensemble du territoire, aux côtés des clients comme des prestataires."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: GRID_GAP }}>
            {CONTRATS.map((c) => (
              <ContratCard key={c.titre} tag={c.tag} titre={c.titre} texte={c.texte} />
            ))}
          </div>
          {/* Cellule d'appel à l'action « audit » — son intitulé n'est pas un
              h3 (la section compte dix h3, un par type de contrat). */}
          <div
            style={{
              background: DARK.bg,
              color: "#fff",
              borderRadius: 12,
              padding: "26px 24px",
              marginTop: GRID_GAP,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 18,
            }}
          >
            <div style={{ maxWidth: "60ch" }}>
              <span
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#7fa8ff",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Un doute sur un contrat
              </span>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>Audit d'un contrat en cours</p>
              <p style={{ fontSize: 14.5, color: DARK.muted, lineHeight: 1.6, margin: 0 }}>
                Le cabinet examine un contrat signé, en cours de négociation ou arrivant à échéance, et
                remet une matrice des risques : sauvegarde, réversibilité, responsabilité, pénalités.
              </p>
            </div>
            <Link href={CONTACT} style={BTN_PRIMARY}>
              Faire auditer mon contrat
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 4. AUTODIAGNOSTIC ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Points de vigilance"
            titre="Votre situation présente-t-elle l'un de ces points de vigilance ?"
            sub="Ces lacunes sont courantes et restent le plus souvent invisibles jusqu'au premier incident."
          />
          <div style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 12, padding: "24px 22px", maxWidth: 860 }}>
            <div className="flex flex-col" style={{ gap: 4 }}>
              {AUTODIAG.map((item, i) => {
                const on = checked.includes(i);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(i)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      padding: "13px 0",
                      borderBottom: i < AUTODIAG.length - 1 ? `1px solid ${LIGHT.border}` : "none",
                      textAlign: "left",
                      cursor: "pointer",
                      minHeight: 44,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 19,
                        height: 19,
                        borderRadius: 4,
                        border: `1.5px solid ${on ? BLUE : "#B4B4CC"}`,
                        background: on ? BLUE : "transparent",
                        flexShrink: 0,
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {on ? <i className="ti ti-check" style={{ fontSize: 12, color: "#fff", lineHeight: 1 }} /> : null}
                    </span>
                    <span style={{ fontSize: 15.5, color: on ? LIGHT.text : LIGHT.muted, lineHeight: 1.5, fontWeight: on ? 500 : 400 }}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Zone de résultat en live region : le message ET le bouton
                conditionnel y vivent, si bien que l'apparition du bouton est
                annoncée. Le bouton n'est présent dans le DOM que lorsqu'au
                moins une case est cochée. Son entrée est animée, mais
                l'animation est neutralisée sous prefers-reduced-motion par la
                règle globale du bloc <style> ci-dessus. */}
            <div aria-live="polite">
              <p
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: n > 0 ? LIGHT.text : LIGHT.faint,
                  margin: "20px 0 0",
                }}
              >
                {n === 0 ? (
                  "Aucun point de vigilance coché pour l'instant"
                ) : (
                  <>
                    Votre situation présente{" "}
                    <strong style={{ color: BLUE, fontWeight: 500 }}>
                      {n} point{n > 1 ? "s" : ""} de vigilance
                    </strong>
                    . Un audit contractuel permet d'en déterminer les priorités.
                  </>
                )}
              </p>
              {n > 0 ? (
                <Link href={CONTACT} className="cx-reveal" style={{ ...BTN_PRIMARY, marginTop: 16 }}>
                  Examiner ces points avec le cabinet
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. OBLIGATIONS ET PREUVES — trois cartes ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Ce que dit le droit"
            titre="Les obligations et les preuves qui déterminent la responsabilité"
            sub="Les contrats informatiques relèvent du droit commun, mais les juridictions y ont construit des obligations propres, particulièrement exigeantes."
          />
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
            {REGIMES.map((r) => (
              <article
                key={r.label}
                style={{
                  background: LIGHT.panel,
                  border: `1px solid ${LIGHT.border}`,
                  borderTop: `3px solid ${BLUE}`,
                  borderRadius: 10,
                  padding: CARD_PAD,
                }}
              >
                <Eyebrow>{r.label}</Eyebrow>
                <h3 style={{ ...TYPE.h3, margin: "0 0 8px" }}>{r.titre}</h3>
                <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 14px" }}>{fr(r.texte)}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {r.points.map((p) => (
                    <li key={p} style={{ fontSize: 13.5, color: LIGHT.muted, lineHeight: 1.5, paddingLeft: 14, borderLeft: `1px solid ${LIGHT.border}` }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. CINQ CLAUSES — accordéon natif ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Les clauses à risque"
            titre="Cinq clauses fréquemment décisives dans un contentieux IT"
            sub="Dans de nombreux litiges informatiques, la difficulté technique ne suffit pas : l'issue dépend de la manière dont les obligations et les procédures de validation ont été contractualisées. Cinq clauses sont souvent négligées au moment de la signature."
          />
          <div className="cx-acc" style={{ borderTop: `1px solid ${LIGHT.border}` }}>
            {CLAUSES.map((c) => (
              <details key={c.num}>
                <summary>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 20, color: BLUE, minWidth: 34 }}>{c.num}</span>
                  <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{fr(c.titre)}</span>
                  <span className="cx-plus" aria-hidden />
                </summary>
                <div className="cx-body" style={{ paddingLeft: 50 }}>
                  <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{fr(c.texte)}</p>
                </div>
              </details>
            ))}
          </div>
          <p style={{ margin: "30px 0 0", fontSize: 18, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45, maxWidth: "60ch" }}>
            Avant de signer, la question n'est pas seulement de savoir ce que le prestataire va faire.
            Elle est de savoir ce qui se passera lorsqu'il ne pourra plus le faire.
          </p>
        </div>
      </section>

      {/* ===== 7. CONTENTIEUX ===== */}
      <section id="contentieux" style={{ background: LIGHT.bg, padding: SECTION_PAD, scrollMarginTop: 70 }}>
        <div style={INNER}>
          <SectionHead
            label="Contentieux"
            titre="Contentieux des contrats informatiques"
            sub="Ces litiges se gagnent sur la qualification des obligations, sur la chronologie documentée des alertes et des réserves, et sur la solidité des pièces produites."
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "0 40px", margin: 0, padding: 0, listStyle: "none", maxWidth: 900 }}>
            {LITIGES.map((l) => (
              <li
                key={l}
                style={{
                  fontSize: 15.5,
                  color: LIGHT.text,
                  padding: "12px 0 12px 22px",
                  borderBottom: `1px solid ${LIGHT.border}`,
                  position: "relative",
                }}
              >
                <span aria-hidden style={{ position: "absolute", left: 0, top: 20, width: 9, height: 1, background: BLUE }} />
                {l}
              </li>
            ))}
          </ul>
          <p style={{ margin: "30px 0 0", fontSize: 15, color: LIGHT.muted, lineHeight: 1.7, maxWidth: "70ch" }}>
            Les dommages directs peuvent être indemnisés lorsqu'ils sont établis et imputables au
            manquement, sous réserve des plafonds contractuels opposables : perte d'exploitation,
            coûts de remise en état du système, ressaisie des données, surcharge des équipes internes.
            Les préjudices
            indirects sont fréquemment écartés, soit par le jeu d'une clause d'exclusion, soit faute de
            preuve suffisante. La construction du dossier probatoire commence donc avant la mise en
            demeure, pas après l'assignation.
          </p>
          <div style={{ marginTop: 26 }}>
            <Link href={CONTACT} style={BTN_PRIMARY}>
              Évaluer un litige informatique
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 8. DOSSIERS — derrière le drapeau DOSSIERS_ENABLED ===== */}
      {DOSSIERS_ENABLED ? (
        <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
          <div style={INNER}>
            <SectionHead
              label="Situations dans lesquelles le cabinet intervient"
              titre="Quand un contrat informatique devient un enjeu stratégique"
              sub="Quatre situations illustrant la manière dont une analyse juridique, contractuelle et technique permet de reconstruire les responsabilités et de préparer la réponse de l'entreprise."
            />
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
              {DOSSIERS.map((d) => (
                <article
                  key={d.num}
                  style={{
                    background: LIGHT.panel,
                    border: `1px solid ${LIGHT.border}`,
                    borderLeft: `3px solid ${BLUE}`,
                    borderRadius: 10,
                    padding: CARD_PAD,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 18, color: BLUE }}>{d.num}</span>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: LIGHT.faint }}>
                      {d.type}
                    </span>
                  </div>
                  <h3 style={{ ...TYPE.h3, margin: "0 0 12px" }}>{d.titre}</h3>
                  {d.corps.map((p, i) => (
                    <p key={i} style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 12px" }}>
                      {p}
                    </p>
                  ))}
                  <p style={{ margin: "16px 0 0", paddingTop: 14, borderTop: `1px solid ${LIGHT.border}`, fontSize: 14 }}>
                    <span style={{ display: "block", fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: BLUE, marginBottom: 5 }}>
                      Enjeu
                    </span>
                    {d.enjeu}
                  </p>
                </article>
              ))}
            </div>
            <p style={{ margin: "24px 0 0", fontSize: 13, color: LIGHT.faint, maxWidth: "70ch" }}>
              Dossiers réels, dont les éléments d'identification ont été écartés. Certains sont en cours.
            </p>
          </div>
        </section>
      ) : null}

      {/* ===== 9. MÉTHODE ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Méthode"
            titre="De l'audit du contrat au contentieux"
            sub="En conseil comme en contentieux, une démarche structurée et documentée."
          />
          <div>
            {ETAPES.map((e, i) => (
              <div
                key={e.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: 20,
                  padding: "22px 0",
                  borderBottom: i < ETAPES.length - 1 ? `1px solid ${LIGHT.border}` : "none",
                }}
              >
                <div style={{ fontFamily: "var(--ff-mono)", fontSize: 34, fontWeight: 500, color: BLUE, lineHeight: 1 }}>{e.n}</div>
                <div>
                  <h3 style={{ ...TYPE.h3, margin: "0 0 6px" }}>{e.titre}</h3>
                  <p style={{ fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{fr(e.texte)}</p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 10,
                      fontFamily: "var(--ff-mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: LIGHT.faint,
                    }}
                  >
                    {e.deliv}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. QUAND CONSULTER — fond navy ===== */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Calendrier" titre="Quand consulter un avocat en contrats informatiques ?" light />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 1, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.14)" }}>
            {QUAND.map((q) => (
              <div key={q.b} style={{ background: "#0b1130", padding: "22px 24px" }}>
                <b style={{ display: "block", fontWeight: 500, color: "#fff", marginBottom: 6 }}>{q.b}</b>
                <span style={{ fontSize: 14.5, color: DARK.muted, lineHeight: 1.55 }}>{fr(q.d)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. NOTRE APPROCHE — trois avocats + consultant technique ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Notre approche</Eyebrow>
          <p
            style={{
              fontWeight: 300,
              fontSize: "clamp(22px, 3vw, 32px)",
              lineHeight: 1.25,
              color: LIGHT.text,
              maxWidth: "24ch",
              margin: "0 0 26px",
              paddingLeft: 22,
              borderLeft: `3px solid ${BLUE}`,
            }}
          >
            L'analyse juridique d'un litige informatique ne vaut que ce que valent les faits sur lesquels elle repose.
          </p>
          <h2 style={{ ...TYPE.h2, margin: "0 0 10px" }}>Un cabinet, et un consultant technique à ses côtés</h2>
          <p style={{ ...TYPE.secondary, margin: "0 0 26px", maxWidth: "72ch" }}>
            Journaux, configurations, état réel des sauvegardes, périmètre effectif des droits : ces
            éléments ne peuvent être appréciés sur le seul fondement des déclarations des parties. Ils
            doivent être constatés, documentés et confrontés aux engagements contractuels. Le cabinet
            travaille pour cette raison en binôme, l'examen juridique et l'examen technique menés
            ensemble plutôt que successivement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: GRID_GAP, alignItems: "stretch" }}>
            {AVOCATS.map((a) => (
              <MembreCarte
                key={a.slug}
                membre={a}
                couleurs={{ panneau: LIGHT.panel2, carte: LIGHT.panel, bordure: LIGHT.border, texte: LIGHT.text, secondaire: LIGHT.muted, accent: BLUE }}
              />
            ))}
          </div>

          {/* Consultant technique — TODO (cabinet) : accord de Khalid Sookia
              pour figurer sur le site, réalité d'une collaboration habituelle,
              exactitude de sa fonction et de ses domaines d'intervention. */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: GRID_GAP, marginTop: GRID_GAP, alignItems: "stretch" }}
          >
            <MembreCarte
              membre={{ slug: "khalid", role: "Audit technique du système d'information", tags: ["Forensic", "Sauvegardes", "Journalisation"] }}
              couleurs={{ panneau: LIGHT.panel2, carte: LIGHT.panel, bordure: LIGHT.border, texte: LIGHT.text, secondaire: LIGHT.muted, accent: BLUE }}
            />
            <div style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 12, padding: CARD_PAD }}>
              <p
                style={{
                  fontFamily: "var(--ff-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: BLUE,
                  margin: "0 0 14px",
                }}
              >
                Ce qu'il examine
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {KHALID_EXAMINE.map((k) => (
                  <li key={k} style={{ display: "flex", gap: 10, fontSize: 14.5, color: LIGHT.muted, lineHeight: 1.55 }}>
                    <span aria-hidden style={{ color: BLUE, flexShrink: 0 }}>—</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12. FAQ — huit questions (accordéon natif) ===== */}
      <section style={{ background: LIGHT.panel2, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Questions fréquentes" titre="Ce que les clients demandent avant de commencer" />
          <div className="cx-acc" style={{ borderTop: `1px solid ${LIGHT.border}` }}>
            {FAQ_ITEMS.map((item, i) => (
              <details key={item.q}>
                <summary>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 18, color: BLUE, minWidth: 34 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", margin: 0 }}>{fr(item.q)}</h3>
                  <span className="cx-plus" aria-hidden />
                </summary>
                <div className="cx-body" style={{ paddingLeft: 50 }}>
                  <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{fr(item.a)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Maillage sortant (§5) ===== */}
      <section style={{ background: LIGHT.bg, padding: "40px 0" }}>
        <div style={INNER}>
          <Eyebrow>Pour aller plus loin</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: GRID_GAP }}>
            {LIENS.map((lk) =>
              lk.href ? (
                <Link
                  key={lk.ancre}
                  href={lk.href}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    background: LIGHT.panel,
                    border: `1px solid ${LIGHT.border}`,
                    borderRadius: 10,
                    padding: "16px 18px",
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: LIGHT.text,
                    textDecoration: "none",
                  }}
                >
                  {lk.ancre}
                  <span aria-hidden style={{ color: BLUE }}>→</span>
                </Link>
              ) : (
                <div
                  key={lk.ancre}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    background: LIGHT.panel2,
                    border: `1px dashed ${LIGHT.border}`,
                    borderRadius: 10,
                    padding: "16px 18px",
                    fontSize: 14.5,
                    color: LIGHT.faint,
                  }}
                >
                  {lk.ancre}
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: LIGHT.faint }}>
                    Page à venir
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== 13. CTA PRINCIPAL ===== */}
      <section style={{ background: BLUE, color: "#fff", padding: "72px 0", textAlign: "center" }}>
        <div style={INNER}>
          <h2 style={{ ...TYPE.h2, color: "#fff", margin: "0 auto 12px", maxWidth: "22ch" }}>
            {fr("Un contrat à négocier ou un projet informatique en difficulté ?")}
          </h2>
          <p style={{ fontSize: 16, color: "#DDE2FF", margin: "0 auto 28px", maxWidth: "52ch", lineHeight: 1.6 }}>
            Un premier échange pour examiner vos contrats, évaluer votre exposition ou apprécier un
            litige en cours, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row" style={{ gap: 12, justifyContent: "center" }}>
            <Link href={CONTACT} style={{ ...BTN_PRIMARY, background: "#fff", color: BLUE }}>
              Faire auditer un contrat
            </Link>
            <Link href={CONTACT} style={{ ...BTN_GHOST, color: "#fff", borderColor: "rgba(255,255,255,0.6)" }}>
              Évaluer un litige
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
