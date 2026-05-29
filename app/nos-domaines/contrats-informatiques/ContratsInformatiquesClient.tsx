"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import ClausesRisque from './ClausesRisque'

const DARK = {
  bg: "#0a0f2e",
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

const BLUE = "#1A47FF";

const INNER: CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 48px" };
const SECTION_PAD = "40px 0";
const CARD_PAD = 16;
const GRID_GAP = 12;

const TYPE = {
  h1: { fontSize: 36, fontWeight: 600, lineHeight: 1.2 } as const,
  h2: { fontSize: 24, fontWeight: 500, lineHeight: 1.2 } as const,
  h3: { fontSize: 18, fontWeight: 500, lineHeight: 1.35 } as const,
  body: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 } as const,
  secondary: { fontSize: 14, fontWeight: 400, lineHeight: 1.6, color: LIGHT.muted } as const,
};

const TEST_ITEMS = [
  "Vous avez signé un contrat IT sans cahier des charges formalisé et signé",
  "Vos contrats SaaS ou cloud ne précisent pas comment récupérer vos données en fin de contrat",
  "Votre prestataire n'a aucune obligation contractuelle en matière de cybersécurité ou de sauvegarde",
  "Vous avez subi une perte de données ou un incident et ne savez pas si vous pouvez vous retourner contre votre prestataire",
  "Vous voulez résilier un contrat IT mais craignez des pénalités disproportionnées",
  "Vos contrats de fourniture, maintenance et financement IT ont été signés séparément sans clause d'interdépendance",
  "En tant que prestataire, vous intervenez sur le SI de vos clients sans encadrement contractuel de votre responsabilité",
] as const;

const LOI_COLS = [
  {
    border: "#378ADD",
    badge: "Prestataire IT",
    badgeBg: "#E6F1FB",
    badgeColor: "#185FA5",
    title: "Obligations renforcées",
    desc: "Le prestataire doit conseiller, mettre en garde, s'informer des besoins — même si le client ne lui a rien demandé.",
    ex: [
      "Devoir de conseil sur la cybersécurité",
      "Obligation de résultat sur les sauvegardes",
      "Mise en garde sur les risques techniques",
    ],
  },
  {
    border: "#1D9E75",
    badge: "Client PME/ETI",
    badgeBg: "#E1F5EE",
    badgeColor: "#085041",
    title: "Devoir de collaboration",
    desc: "Le client doit exprimer ses besoins, valider les étapes, conserver les preuves. Un cahier des charges absent peut lui être reproché.",
    ex: [
      "Formaliser les besoins par écrit",
      "Valider et signer les recettes",
      "Documenter les refus de recommandations",
    ],
  },
  {
    border: "#BA7517",
    badge: "Ce que juge le tribunal",
    badgeBg: "#FAEEDA",
    badgeColor: "#633806",
    title: "La preuve technique",
    desc: "Audits, logs, rapports d'expert, constats d'huissier. Le juge tranche sur les pièces — pas sur les déclarations.",
    ex: [
      "Configuration conforme aux normes ANSSI",
      "Journaux de sauvegarde horodatés",
      "Traçabilité des mises en garde écrites",
    ],
  },
];

const CAS = [
  {
    badge: "Incident cyber",
    badgeColor: "#A32D2D",
    badgeBg: "#FCEBEB",
    border: "#E24B4A",
    title: "Ransomware — sauvegardes défaillantes depuis 6 mois",
    points: [
      "Prestataire condamné : absence de sauvegarde valide = obligation de résultat non tenue",
      "Le ransomware n'est pas un cas de force majeure si des sauvegardes correctes auraient limité les dégâts",
      "Clause limitative maintenue — plafond à 2 fois l'abonnement annuel",
    ],
    ref: "CA Paris, 7 fév. 2020, n° 18/03616",
  },
  {
    badge: "Projet qui dérape",
    badgeColor: "#633806",
    badgeBg: "#FAEEDA",
    border: "#BA7517",
    title: "Projet ERP — échec de déploiement, absence de cahier des charges",
    points: [
      "Sans cahier des charges signé, le prestataire ne peut pas se retrancher derrière « les besoins mal exprimés »",
      "Responsabilité partagée 50/50 : client n'ayant pas fourni les informations nécessaires",
      "Obligation de moyens renforcée pour le prestataire",
    ],
    ref: "CA Reims, 28 avr. 2026, n° 24/01502",
  },
  {
    badge: "Perte de données",
    badgeColor: "#A32D2D",
    badgeBg: "#FCEBEB",
    border: "#E24B4A",
    title: "Serveur RAID obsolète — migration sans vérification préalable",
    points: [
      "Prestataire condamné : intervention sur système obsolète sans recommander le remplacement",
      "Absence de vérification des sauvegardes des logiciels métiers avant migration",
      "Clause limitative maintenue malgré la faute technique",
    ],
    ref: "CA Bordeaux, 27 fév. 2023, n° 20/05024",
  },
  {
    badge: "Résiliation fautive",
    badgeColor: "#185FA5",
    badgeBg: "#E6F1FB",
    border: "#378ADD",
    title: "Résiliation anticipée d'un contrat IT à durée déterminée",
    points: [
      "Un contrat à durée déterminée ne peut être résilié sans démontrer un manquement grave et non réparable",
      "Client condamné à payer toutes les sommes dues jusqu'au terme + pénalités contractuelles",
      "La simple insatisfaction ne suffit pas",
    ],
    ref: "TAE Lille, 9 jan. 2025, n° 2023019696",
  },
];

const ALERTES = [
  "Pas de cahier des charges signé — impossible d'engager le prestataire sur ses promesses",
  "Aucune obligation de sécurité ou de sauvegarde dans le contrat IT ou cloud",
  "Clause limitative de responsabilité trop basse — ne couvre pas une vraie perte de données",
  "Pas de clause de réversibilité — impossible de récupérer vos données ou licences en fin de contrat",
  "Contrats de fourniture, maintenance et financement signés séparément sans clause d'indivisibilité",
  "Frais de sortie cloud non plafonnés — migration vers un autre prestataire rendue économiquement impossible",
];

const ETAPES = [
  {
    num: "1",
    title: "Audit contractuel",
    desc: "Inventaire de vos contrats IT, SaaS, cloud et infogérance. Identification des lacunes critiques : sauvegarde, réversibilité, responsabilité, pénalités.",
    tag: "Livrable : matrice des risques contractuels",
  },
  {
    num: "2",
    title: "Analyse juridique",
    desc: "Qualification des obligations de chaque partie, clauses limitatives, articulation entre contrats de fourniture, maintenance et financement.",
    tag: "Livrable : note de qualification",
  },
  {
    num: "3",
    title: "Négociation & rédaction",
    desc: "Clauses sur mesure : cahier des charges, sauvegarde, cybersécurité, réversibilité cloud, plafonds de responsabilité adaptés à votre exposition.",
    tag: "Livrable : contrats ou avenants",
  },
  {
    num: "4",
    title: "Formalisation & preuve",
    desc: "Recettes signées, mises en garde tracées, registre des engagements. Tout ce qui tient devant un juge si le litige survient.",
    tag: "Livrable : dossier de preuve",
  },
  {
    num: "5",
    title: "Contentieux & défense",
    desc: "Stratégie en cas de perte de données, projet avorté ou résiliation contestée. Articulation preuve technique et argumentaire juridique.",
    tag: "Notre terrain naturel",
  },
];

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Mon prestataire IT est-il responsable en cas de perte de données ?",
    a: "Cela dépend entièrement de ce que dit le contrat — et de ce que le prestataire a effectivement mis en œuvre. Sans clause de sauvegarde ni obligation de résultat documentée, la responsabilité est difficile à engager. Avec une clause claire et des preuves de défaillance, les tribunaux condamnent régulièrement les prestataires.",
  },
  {
    q: "Puis-je résilier mon contrat IT avant terme ?",
    a: "Un contrat à durée déterminée ne peut être résilié sans manquement grave et non réparable du cocontractant. La simple insatisfaction ou un changement de prestataire ne suffit pas — vous risquez de devoir payer l'intégralité des sommes restantes dues.",
  },
  {
    q: "Que doit contenir un cahier des charges IT ?",
    a: "Objectifs fonctionnels, périmètre technique, critères de recette, délais, responsabilités de chaque partie, exigences de sécurité et de sauvegarde. Sans cahier des charges signé, le prestataire peut invoquer des besoins mal exprimés — et le client peut voir sa responsabilité engagée pour défaut de collaboration.",
  },
  {
    q: "Comment récupérer mes données en fin de contrat cloud ?",
    a: "Uniquement si une clause de réversibilité existe et est correctement rédigée : format des données, délai de restitution, plafond des frais de sortie, astreinte en cas de retard. Sans cette clause, le prestataire peut légalement conserver ou supprimer vos données après résiliation.",
  },
  {
    q: "Je suis prestataire IT — comment limiter ma responsabilité ?",
    a: "Par des clauses limitatives proportionnées à votre prestation, une définition claire du périmètre, des exclusions de force majeure encadrées, et surtout une documentation de vos mises en garde écrites. Une clause limitative trop basse peut être écartée si elle ne couvre pas le préjudice réel.",
  },
];

const TEAM = [
  {
    initials: "AL",
    avatarBg: "#EEEDFE",
    avatarColor: "#3C3489",
    tagBg: "#EEEDFE",
    tagColor: "#3C3489",
    name: "Me Alexandre Lazarègue",
    role: "Avocat — droit du numérique & cybersécurité",
    tags: ["Contrats IT", "Cybersécurité", "Contentieux"],
  },
  {
    initials: "AB",
    avatarBg: "#E6F1FB",
    avatarColor: "#0C447C",
    tagBg: "#E6F1FB",
    tagColor: "#0C447C",
    name: "Me Amir Ben Majed",
    role: "Avocat — contrats informatiques & contentieux IT",
    tags: ["Contrats IT", "Responsabilité", "Preuve"],
  },
  {
    initials: "SH",
    avatarBg: "#E1F5EE",
    avatarColor: "#085041",
    tagBg: "#E1F5EE",
    tagColor: "#085041",
    name: "Me Sarah Hinderer",
    role: "Avocate — données personnelles & IA",
    tags: ["RGPD Art. 32", "Cloud", "Conformité"],
  },
];

function K({ children }: { children: ReactNode }) {
  return <span style={{ fontWeight: 500, color: LIGHT.text }}>{children}</span>;
}

type CasObtenu = {
  icon: string;
  iconBg: string;
  iconColor: string;
  type: string;
  titre: string;
  situation: ReactNode;
  citation: string;
  resultat: ReactNode;
  outcomeAmount: string;
  outcomeLabel: string;
};

const CAS_OBTENUS: CasObtenu[] = [
  {
    icon: "ti-virus",
    iconBg: "#FCEBEB",
    iconColor: "#A32D2D",
    type: "Ransomware · ESN · 12 personnes",
    titre:
      "Notre prestataire dit que sa responsabilité est limitée à 800€. On a perdu 40 000€.",
    situation: (
      <>
        Cyberattaque un lundi matin. Tout le système d&apos;information bloqué pendant{" "}
        <K>11 jours</K>. Perte d&apos;exploitation, données clients inaccessibles, coût de remise en
        état.
        <br />
        <br />
        Le prestataire d&apos;infogérance invoque la clause limitative du contrat : plafond à{" "}
        <K>800€</K>. Les sauvegardes existaient sur le papier — mais n&apos;avaient pas été testées
        depuis <K>8 mois</K>.
      </>
    ),
    citation:
      "On nous dit qu'on a signé ça. On ne savait pas que ça voulait dire qu'ils pouvaient tout rater pour 800€.",
    resultat: (
      <>
        Nous avons démontré que les sauvegardes n&apos;étaient jamais testées — obligation de résultat
        non tenue. Une clause limitative ne protège pas le prestataire quand il a commis une faute
        lourde. Le tribunal l&apos;a écartée.
      </>
    ),
    outcomeAmount: "28 000€",
    outcomeLabel: "obtenus — clause limitative écartée",
  },
  {
    icon: "ti-mood-sad",
    iconBg: "#FAEEDA",
    iconColor: "#633806",
    type: "Projet ERP · ETI industrie · 80 salariés",
    titre: "18 mois de projet, 120 000€ dépensés, le logiciel ne fonctionne toujours pas.",
    situation: (
      <>
        Un intégrateur a vendu un ERP sur mesure. Après <K>18 mois</K> et <K>120 000€</K> facturés, le
        logiciel ne couvre pas les besoins de base. Pas de cahier des charges signé.
        <br />
        <br />
        Le prestataire dit : les besoins étaient mal exprimés, c&apos;est votre responsabilité. Le client
        dit : vous nous avez vendu quelque chose qui ne fonctionne pas.
      </>
    ),
    citation:
      "On nous a dit qu'on n'avait qu'à mieux expliquer ce qu'on voulait. Mais c'est leur métier de poser les bonnes questions.",
    resultat: (
      <>
        Un prestataire professionnel a l&apos;obligation d&apos;exiger un cahier des charges ou de refuser la
        mission. S&apos;il s&apos;engage sans, la responsabilité lui revient. Expertise judiciaire obtenue —
        responsabilité <K>60/40</K>.
      </>
    ),
    outcomeAmount: "72 000€",
    outcomeLabel: "obtenus en appel",
  },
  {
    icon: "ti-database-export",
    iconBg: "#E6F1FB",
    iconColor: "#185FA5",
    type: "Sortie cloud · PME · données RH 6 ans",
    titre: "On veut partir. L'éditeur réclame 4 800€ pour nous rendre nos propres données.",
    situation: (
      <>
        Résiliation d&apos;un SaaS RH après <K>6 ans</K>. 6 ans de données salariés : contrats, évaluations,
        historique de paie. L&apos;éditeur annonce <K>4 800€</K> de frais d&apos;export — non prévus au
        contrat.
        <br />
        <br />
        Sans paiement, les données seraient supprimées dans <K>30 jours</K>. Le client se retrouve otage.
      </>
    ),
    citation: "Ce sont nos données. On les a produites. Et on doit payer pour les récupérer ?",
    resultat: (
      <>
        Depuis la loi <K>SREN 2024</K>, les frais de transfert sont plafonnés aux coûts réels. Facturer{" "}
        <K>4 800€</K> pour un export est illégal. Une mise en demeure a suffi — l&apos;éditeur a cédé
        immédiatement.
      </>
    ),
    outcomeAmount: "4 800€",
    outcomeLabel: "de frais annulés — export obtenu en 15 jours",
  },
  {
    icon: "ti-file-x",
    iconBg: "#EEEDFE",
    iconColor: "#3C3489",
    type: "Résiliation · Contrat infogérance · 18 mois restants",
    titre: "On veut partir mais le contrat réclame 43 000€ si on part avant le terme.",
    situation: (
      <>
        Contrat d&apos;infogérance <K>3 ans</K> à <K>2 400€/mois</K>. <K>18 mois</K> restants. Le prestataire
        ne répond plus dans les délais, les incidents s&apos;accumulent, aucun rapport mensuel depuis{" "}
        <K>6 mois</K>.
        <br />
        <br />
        Le client veut partir. Le contrat prévoit le paiement de toutes les mensualités restantes :{" "}
        <K>43 200€</K>.
      </>
    ),
    citation:
      "On est bloqués avec quelqu'un qui ne fait plus son travail et on doit payer pour partir.",
    resultat: (
      <>
        Documentation des manquements : tickets non traités, SLA violés, rapports absents. Résiliation
        aux torts du prestataire — quand l&apos;autre partie manque à ses obligations, vous pouvez partir
        sans payer.
      </>
    ),
    outcomeAmount: "43 200€",
    outcomeLabel: "de pénalités évitées — résiliation obtenue",
  },
];

function CasObtenuCard({ card, index }: { card: CasObtenu; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colLabel: CSSProperties = {
    fontFamily: "var(--ff-mono)",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 8,
  };

  return (
    <article
      ref={ref}
      style={{
        background: LIGHT.panel,
        border: `0.5px solid ${LIGHT.border}`,
        borderRadius: 12,
        padding: CARD_PAD,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: card.iconBg,
              color: card.iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <i className={`ti ${card.icon}`} style={{ fontSize: 18 }} aria-hidden="true" />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                ...colLabel,
                color: LIGHT.faint,
                margin: "0 0 6px",
              }}
            >
              {card.type}
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: LIGHT.text, lineHeight: 1.4, margin: 0 }}>
              &laquo;&nbsp;{card.titre}&nbsp;&raquo;
            </p>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 0, alignItems: "stretch" }}
      >
        <div
          style={{
            padding: "0 14px 14px 0",
            borderRight: `0.5px solid ${LIGHT.border}`,
          }}
          className="max-md:border-r-0 max-md:pb-4 max-md:mb-4 max-md:border-b max-md:border-[rgba(0,0,0,0.1)]"
        >
          <p style={{ ...colLabel, color: LIGHT.faint }}>La situation</p>
          <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.65, margin: "0 0 12px" }}>
            {card.situation}
          </p>
          <blockquote
            style={{
              margin: 0,
              padding: "8px 12px",
              borderLeft: `2px solid ${LIGHT.faint}`,
              fontSize: 13,
              fontStyle: "italic",
              color: LIGHT.muted,
              lineHeight: 1.65,
            }}
          >
            &laquo;&nbsp;{card.citation}&nbsp;&raquo;
          </blockquote>
        </div>

        <div style={{ padding: "0 0 0 14px" }} className="max-md:pl-0">
          <p style={{ ...colLabel, color: "#085041" }}>Ce qui s&apos;est passé</p>
          <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.65, margin: "0 0 14px" }}>
            {card.resultat}
          </p>
          <div
            style={{
              background: "#E1F5EE",
              borderRadius: 12,
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 22, fontWeight: 500, color: "#085041", margin: "0 0 4px", lineHeight: 1.2 }}>
              {card.outcomeAmount}
            </p>
            <p style={{ fontSize: 12, color: "#1D9E75", margin: 0, lineHeight: 1.4 }}>{card.outcomeLabel}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: BLUE,
        marginBottom: 4,
      }}
    >
      {children}
    </p>
  );
}

function SectionHead({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <>
      <Eyebrow>{label}</Eyebrow>
      <h2 style={{ ...TYPE.h2, color: LIGHT.text, margin: "0 0 6px" }}>{title}</h2>
      <p style={{ ...TYPE.secondary, margin: "0 0 16px", maxWidth: 720 }}>{sub}</p>
    </>
  );
}

function Divider() {
  return <div style={{ borderTop: `0.5px solid ${LIGHT.border}`, maxWidth: 900, margin: "0 auto" }} />;
}

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `0.5px solid ${LIGHT.border}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          background: "none",
          border: "none",
          padding: "12px 0",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span style={{ display: "flex", gap: 14 }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: BLUE, flexShrink: 0, paddingTop: 2 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45 }}>{item.q}</span>
        </span>
        <span
          aria-hidden
          style={{
            color: BLUE,
            fontSize: 20,
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform 180ms ease",
          }}
        >
          +
        </span>
      </button>
      {open ? (
        <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: 0, padding: "0 0 16px 40px", maxWidth: 760 }}>
          {item.a}
        </div>
      ) : null}
    </div>
  );
}

export default function ContratsInformatiquesClient() {
  const [checkedTests, setCheckedTests] = useState<number[]>([]);

  const toggleTest = (index: number) => {
    setCheckedTests((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main style={{ background: LIGHT.bg, color: LIGHT.text, fontFamily: "var(--ff-body)" }}>
      {/* 1. HERO */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: "80px 0 40px", width: "100%" }}>
        <div style={INNER}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--ff-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7fa8ff",
              background: "rgba(26,71,255,0.25)",
              borderRadius: 8,
              padding: "4px 12px",
              marginBottom: 12,
            }}
          >
            Contrats informatiques · PME · ETI · prestataires IT
          </span>
          <h1 style={{ ...TYPE.h1, color: "#ffffff", marginBottom: 8, maxWidth: "100%", overflowWrap: "break-word" }}>
            Un contrat IT mal rédigé vous expose autant
            <span style={{ display: "block", fontSize: 20, fontWeight: 400, color: "#4d7aff", marginTop: 8 }}>
              qu&apos;un incident technique.
            </span>
          </h1>
          <p style={{ ...TYPE.body, color: DARK.muted, marginBottom: 16, maxWidth: 640 }}>
            Projet qui dérape, sauvegardes absentes, réversibilité impossible, prestataire injoignable
            après une cyberattaque — la plupart des problèmes informatiques ont une origine
            contractuelle. Nous les anticipons avant qu&apos;ils arrivent.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              style={{
                background: BLUE,
                color: "#fff",
                padding: "12px 22px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Analyser mon contrat
            </Link>
            <a
              href="#livrables"
              style={{
                background: "transparent",
                color: DARK.muted,
                padding: "12px 22px",
                borderRadius: 8,
                fontSize: 13,
                textDecoration: "none",
                border: `0.5px solid ${DARK.border}`,
              }}
            >
              Voir nos interventions
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* 2. TEST INTERACTIF */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: CARD_PAD,
            }}
          >
            <SectionHead
              label="Êtes-vous exposé ?"
              title="Faites le test"
              sub="Votre situation est probablement concernée si vous cochez au moins une case."
            />

            <p
              style={{
                fontSize: 13,
                fontWeight: checkedTests.length > 0 ? 500 : 400,
                color: checkedTests.length > 0 ? BLUE : LIGHT.muted,
                margin: "0 0 12px",
                transition: "color 200ms ease",
              }}
            >
              {checkedTests.length === 0
                ? "0 case cochée"
                : `${checkedTests.length} case${checkedTests.length > 1 ? "s" : ""} cochée${checkedTests.length > 1 ? "s" : ""} — votre exposition est réelle`}
            </p>

            <div className="flex flex-col" style={{ gap: 8 }}>
              {TEST_ITEMS.map((item, index) => {
                const checked = checkedTests.includes(index);
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={checked}
                    onClick={() => toggleTest(index)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      width: "100%",
                      border: checked ? "1px solid #378ADD" : `1px solid ${LIGHT.border}`,
                      background: checked ? "#E6F1FB" : LIGHT.panel,
                      borderRadius: 8,
                      padding: "10px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 220ms ease, border-color 220ms ease",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: `1.5px solid ${checked ? BLUE : BLUE}`,
                        background: checked ? BLUE : "transparent",
                        flexShrink: 0,
                        marginTop: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {checked ? (
                        <i className="ti ti-check" style={{ fontSize: 11, color: "#fff", lineHeight: 1 }} />
                      ) : null}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        color: checked ? LIGHT.text : LIGHT.muted,
                        lineHeight: 1.6,
                        fontWeight: checked ? 500 : 400,
                      }}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {checkedTests.length > 0 ? (
              <div
                style={{
                  marginTop: 16,
                  padding: "12px 14px",
                  borderRadius: 8,
                  background: "#E6F1FB",
                }}
              >
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#0C447C", lineHeight: 1.6 }}>
                  Si vous avez coché une seule case, votre exposition est réelle — et souvent invisible
                  jusqu&apos;au premier litige.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Divider />

      {/* 3. CE QUE DIT LA LOI */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Ce que dit la loi"
            title="Trois régimes, trois niveaux d'exigence"
            sub="Les contrats informatiques obéissent au droit commun — mais les juges ont construit des obligations spécifiques très exigeantes."
          />
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
            {LOI_COLS.map((c) => (
              <article
                key={c.badge}
                style={{
                  background: LIGHT.panel,
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: CARD_PAD,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    background: c.badgeBg,
                    color: c.badgeColor,
                    borderRadius: 999,
                    padding: "3px 10px",
                    marginBottom: 8,
                  }}
                >
                  {c.badge}
                </span>
                <h3 style={{ ...TYPE.h3, margin: "0 0 6px" }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 10px" }}>{c.desc}</p>
                <div className="flex flex-col" style={{ gap: 6 }}>
                  {c.ex.map((e) => (
                    <div key={e} style={{ display: "flex", gap: 8, fontSize: 12, color: LIGHT.muted, lineHeight: 1.5 }}>
                      <span style={{ color: BLUE, flexShrink: 0 }}>→</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 4. SITUATIONS CONCRÈTES */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Situations concrètes"
            title="Cinq cas réels — et ce qu'ils ont coûté"
            sub="Les contrats informatiques sont à l'origine de la plupart des litiges IT."
          />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {CAS.map((c) => (
              <article
                key={c.ref}
                style={{
                  background: LIGHT.panel,
                  border: `0.5px solid ${LIGHT.border}`,
                  borderLeft: `3px solid ${c.border}`,
                  borderRadius: 8,
                  padding: CARD_PAD,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    background: c.badgeBg,
                    color: c.badgeColor,
                    borderRadius: 999,
                    padding: "3px 10px",
                    marginBottom: 8,
                  }}
                >
                  {c.badge}
                </span>
                <h3 style={{ ...TYPE.h3, margin: "0 0 10px" }}>{c.title}</h3>
                <div style={{ height: 1, background: LIGHT.border, margin: "0 0 10px" }} />
                <p
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    color: LIGHT.faint,
                    margin: "0 0 8px",
                  }}
                >
                  Ce que le juge a retenu
                </p>
                <ul style={{ margin: "0 0 12px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {c.points.map((p) => (
                    <li key={p} style={{ display: "flex", gap: 8, fontSize: 13, color: LIGHT.muted, lineHeight: 1.55 }}>
                      <span style={{ color: BLUE, flexShrink: 0 }}>→</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 11, color: LIGHT.faint, margin: 0, fontStyle: "italic" }}>{c.ref}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 5. SIGNAUX D'ALERTE */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Les signaux d'alerte"
            title="Votre contrat est-il solide ?"
            sub="Ces lacunes contractuelles sont courantes — et souvent invisibles jusqu'au premier incident."
          />
          <div className="flex flex-col" style={{ gap: 8 }}>
            {ALERTES.map((a) => (
              <div
                key={a}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "11px 14px",
                  background: LIGHT.panel,
                  border: `0.5px solid ${LIGHT.border}`,
                  borderRadius: 8,
                }}
              >
                <span
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "#E24B4A", flexShrink: 0, marginTop: 5 }}
                  aria-hidden
                />
                <p style={{ fontSize: 13, color: LIGHT.text, lineHeight: 1.55, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <ClausesRisque />

      {/* 6. CE QUE NOUS AVONS OBTENU */}
      <section id="livrables" style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Ce que nous avons obtenu</Eyebrow>
          <h2 style={{ ...TYPE.h2, margin: "0 0 6px" }}>
            Quatre situations réelles — et ce qui s&apos;est passé concrètement
          </h2>
          <p style={{ fontSize: 13, fontStyle: "italic", color: LIGHT.faint, lineHeight: 1.6, margin: "0 0 16px" }}>
            Dossiers anonymisés. Ce n&apos;est pas ce qu&apos;on peut faire — c&apos;est ce qu&apos;on a fait.
          </p>
          <div className="flex flex-col" style={{ gap: GRID_GAP }}>
            {CAS_OBTENUS.map((card, index) => (
              <CasObtenuCard key={card.titre} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 7. MÉTHODE */}
      <section id="methode" style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Notre méthode"
            title="5 étapes — de l'audit au contrat sécurisé"
            sub="En conseil comme en contentieux, une démarche structurée et documentée."
          />
          <div
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: "4px 16px",
            }}
          >
            {ETAPES.map((step, idx) => (
              <div key={step.num} style={{ display: "flex", gap: 16, padding: "12px 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#E6F1FB",
                      color: "#185FA5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--ff-mono)",
                      fontSize: 12,
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  {idx < ETAPES.length - 1 ? (
                    <div style={{ width: 1, flex: 1, background: LIGHT.border, minHeight: 12 }} aria-hidden />
                  ) : null}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text, margin: "0 0 4px", paddingTop: 5 }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      color: LIGHT.faint,
                      background: LIGHT.panel2,
                      padding: "2px 8px",
                      borderRadius: 8,
                      marginTop: 6,
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 8. ÉQUIPE */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div style={{ background: LIGHT.panel2, borderRadius: 12, padding: 20 }}>
            <Eyebrow>L&apos;équipe</Eyebrow>
            <h2 style={{ ...TYPE.h2, margin: "0 0 6px" }}>
              Contrats informatiques, contentieux et cybersécurité
            </h2>
            <p style={{ ...TYPE.secondary, margin: "0 0 16px" }}>
              Trois expertises complémentaires — droit du numérique, données personnelles et contentieux
              IT — pour couvrir l&apos;intégralité des enjeux contractuels de votre système
              d&apos;information.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
              {TEAM.map((m) => (
                <article
                  key={m.name}
                  style={{
                    background: LIGHT.panel,
                    border: `0.5px solid ${LIGHT.border}`,
                    borderRadius: 12,
                    padding: CARD_PAD,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: m.avatarBg,
                      color: m.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--ff-mono)",
                      fontSize: 14,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    {m.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: LIGHT.text, margin: "0 0 4px", lineHeight: 1.35 }}>
                      {m.name}
                    </p>
                    <p style={{ fontSize: 12, color: LIGHT.muted, margin: "0 0 10px", lineHeight: 1.5 }}>{m.role}</p>
                    <div className="flex flex-wrap" style={{ gap: 6 }}>
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "3px 9px",
                            borderRadius: 8,
                            background: m.tagBg,
                            color: m.tagColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* 9. FAQ */}
      <section className="contrats-faq" style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Questions fréquentes"
            title="Ce que nos clients nous demandent avant de commencer"
            sub="Les vraies questions — pas les questions juridiques abstraites."
          />
          <div
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: "4px 16px",
            }}
          >
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 9. CTA */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD, width: "100%" }}>
        <div style={{ ...INNER, textAlign: "center" }}>
          <h2 style={{ ...TYPE.h2, color: "#fff", margin: "0 0 6px" }}>
            Sécurisez vos contrats IT avant le premier litige.
          </h2>
          <p style={{ ...TYPE.body, color: DARK.muted, margin: "0 0 16px", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Un premier échange pour analyser vos contrats et évaluer votre exposition — sans engagement.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: BLUE,
              color: "#fff",
              textDecoration: "none",
              padding: "12px 22px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Analyser mon contrat →
          </Link>
        </div>
      </section>
    </main>
  );
}
