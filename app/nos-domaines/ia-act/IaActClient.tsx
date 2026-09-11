"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Jurisprudence, type Decision } from "@/components/jurisprudence";
import { FAQ_TEXTE } from "./faq-texte";

/* § 5.3 — Ces deux décisions ont été validées par le cabinet (retrouvées et
   lues) : verifiee: true, le composant partagé les rend. Cass. soc. 22-19.925
   et CA Lyon 23/04589 ont été retirées (objet ne correspondant pas à
   l'enseignement affiché, v4). Remplacements POSSIBLES à valider séparément,
   NON ajoutés (garde-fou) : TJ Nanterre 14 févr. 2025 n° 24/01457 ;
   TJ Créteil 15 juil. 2025 n° 25/00851.
   Le garde-fou reste actif : toute décision future dont verifiee vaut false ne
   sera pas rendue (mécanisme mis en place après qu'une version antérieure de la
   page contrats a cité un « tribunal des activités économiques de Lille »,
   juridiction inexistante). */
const JURIS_IA: Decision[] = [
  {
    juridiction: "TJ Nanterre",
    date: "29 janvier 2026",
    reference: "n° 25/02856",
    intitule: "IA RH : déploiement suspendu, CSE non consulté",
    regle:
      "Deux logiciels RH intégrant de l'IA : déploiement suspendu, y compris en phase pilote, faute de consultation du CSE central.",
    verifiee: true,
  },
  {
    juridiction: "TJ Paris",
    date: "10 février 2026",
    reference: "n° 25/57412",
    intitule: "Copilot 365 : expertise du CSE annulée",
    regle:
      "Copilot 365 : expertise du CSE annulée, l'expérimentation étant limitée, volontaire et sans impact concret établi.",
    verifiee: true,
  },
];

const DARK = {
  bg: "#0a0f2e",
  panel: "#11163a",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.65)",
  border: "rgba(255,255,255,0.2)",
  borderBlue: "rgba(26,71,255,0.25)",
};

const LIGHT = {
  bg: "#f8f8f6",
  panel: "#ffffff",
  panel2: "#f1f1ee",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
  borderBlue: "rgba(26,71,255,0.22)",
};

/**
 * Système chromatique (charte). Famille « Données et conformité » (même accent
 * que la page RGPD). BLUE reste la couleur d'ACTION (boutons, liens, focus,
 * contrôles interactifs) ; ACCENT est l'accent ÉDITORIAL de la famille (vert)
 * réservé aux sur-titres, labels de repérage et fonds légers. Valeurs réelles
 * posées en variables CSS sur le <main>.
 */
const BLUE = "var(--brand)";
const ACCENT = "var(--famille-accent)";

const INNER: CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 48px" };
const SECTION_PAD = "40px 0";
const CARD_PAD = 16;
const GRID_GAP = 12;

const TYPE = {
  // Règle typographique validée (identique aux 3 autres pages de domaine).
  h1: { fontSize: "clamp(32px, 5.5vw, 60px)", fontWeight: 600, lineHeight: 1.08 } as const,
  h2: { fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 600, lineHeight: 1.25 } as const,
  h3: { fontSize: 18, fontWeight: 500, lineHeight: 1.35 } as const,
  body: { fontSize: 16, fontWeight: 400, lineHeight: 1.7 } as const,
  secondary: { fontSize: 14, fontWeight: 400, lineHeight: 1.7, color: LIGHT.muted } as const,
  small: { fontSize: 13, lineHeight: 1.6 } as const,
  label: { fontSize: 12, lineHeight: 1.5 } as const,
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: ACCENT,
        marginBottom: 4,
      }}
    >
      {children}
    </p>
  );
}

const heroTags = ["AI Act", "RGPD", "Responsabilité", "Preuve", "Gouvernance"];

function B({ children }: { children: ReactNode }) {
  return <strong style={{ fontStyle: "normal", fontWeight: 600, color: LIGHT.text }}>{children}</strong>;
}

/* ---------------------------------------------------------------- Qualificateur
   Bloc 3 interactif : trois questions recomposent, sous les yeux du lecteur, ce
   que le règlement impose SUR SON OUTIL. « Je ne sais pas » (q3) l'emporte sur
   tout. Le « socle » (formation, art. 4) apparaît dans les quatre combinaisons
   de rôle. Aucune formulation de l'ancien bloc n'est conservée. */
const OUTILS = [
  { id: "assistant", label: "Un assistant de rédaction", nom: "votre assistant de rédaction" },
  { id: "tri", label: "Un logiciel de tri de candidatures", nom: "votre logiciel de tri de candidatures" },
  { id: "chatbot", label: "Un chatbot client", nom: "votre chatbot client" },
  { id: "produit", label: "Une IA intégrée à votre produit", nom: "l'IA intégrée à votre produit" },
] as const;
const PROVENANCES = [
  { id: "d", label: "Acheté sur le marché, utilisé tel quel" },
  { id: "f", label: "Développé pour vous, ou diffusé sous votre nom" },
] as const;
const DECISIONS = [
  { id: "n", label: "Non" },
  { id: "o", label: "Oui" },
  { id: "i", label: "Je ne sais pas" },
] as const;
type OutilId = (typeof OUTILS)[number]["id"];
type ProvId = "d" | "f";
type DecId = "n" | "o" | "i";

const SOCLE =
  "Prendre des mesures pour faire monter vos équipes en compétence, à proportion de leur profil et du contexte d'usage — et en garder la trace";

type QualifResult = {
  titre: string;
  bullets: string[];
  reference: string;
  calendrier: boolean;
  contact: boolean;
};

function qualif(q1: OutilId, q2: ProvId, q3: DecId): QualifResult {
  const nom = OUTILS.find((o) => o.id === q1)!.nom;
  if (q3 === "i") {
    return {
      titre: `Sur ${nom}, c'est la question qui commande tout le reste`,
      bullets: [
        "Le classement ne se lit pas dans une fiche produit : il dépend de la destination donnée à l'outil",
        "Un filtre prévu par le texte peut en faire sortir un système listé, sous réserve d'une évaluation documentée",
        "Une même entreprise est souvent hors champ pour un outil et à haut risque pour un autre",
      ],
      reference: "art. 6 et annexe III",
      calendrier: false,
      contact: true,
    };
  }
  if (q2 === "d" && q3 === "n") {
    const variantes: Record<OutilId, string[]> = {
      assistant: ["Si vous publiez des contenus de synthèse, les cas de mention prévus par le texte s'appliquent"],
      chatbot: ["Votre interlocuteur doit savoir qu'il s'adresse à une IA — l'obligation pèse d'abord sur l'éditeur de l'outil"],
      produit: ["Vérifier si votre produit relève d'une réglementation à marquage : le régime changerait"],
      tri: [],
    };
    return {
      titre: `Sur ${nom} : le socle commun, et rien de plus`,
      bullets: [SOCLE, ...variantes[q1]],
      reference: "art. 4 · art. 50 — les obligations de l'article 26 ne s'appliquent pas ici",
      calendrier: false,
      contact: false,
    };
  }
  if (q2 === "d" && q3 === "o") {
    return {
      titre: `Sur ${nom} : vous êtes déployeur d'un système à haut risque`,
      bullets: [
        "Utiliser l'outil conformément à sa notice",
        "Confier la supervision à des personnes ayant l'autorité de contredire le système",
        "Veiller aux données d'entrée dont vous avez le contrôle",
        "Conserver les journaux",
        "Informer les travailleurs et leurs représentants avant la mise en service",
        "Informer les personnes visées par une décision",
        SOCLE,
      ],
      reference: "art. 26 · exigible au 2 décembre 2027 pour l'annexe III",
      calendrier: true,
      contact: false,
    };
  }
  if (q2 === "f" && q3 === "n") {
    return {
      titre: `Sur ${nom} : vous êtes fournisseur, hors haut risque`,
      bullets: [
        SOCLE,
        "Concevoir l'outil pour qu'on sache qu'on s'adresse à une IA, lorsqu'il dialogue avec des personnes",
        "Marquer les sorties de synthèse dans un format lisible par machine",
      ],
      reference: "art. 4 · art. 50 §1 et §2",
      calendrier: false,
      contact: false,
    };
  }
  // f + o — fournisseur d'un système à haut risque
  return {
    titre: `Sur ${nom} : vous êtes fournisseur d'un système à haut risque`,
    bullets: [
      "Gestion des risques, gouvernance des données et examen des biais",
      "Documentation technique et journalisation",
      "Notice d'utilisation et conception permettant la supervision humaine",
      "Évaluation de conformité, marquage, enregistrement européen",
      "Surveillance après commercialisation",
      "Incidents graves signalés sous quinze jours",
      SOCLE,
    ],
    reference: "art. 16 et suivants · le détail figure dans notre livre blanc",
    calendrier: false,
    contact: false,
  };
}

/** Un groupe de choix (boutons réels, aria-pressed, clavier natif). */
function QGroup({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: readonly { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: LIGHT.muted, margin: "0 0 7px" }}>
        {label}
        {hint ? <span style={{ textTransform: "none", letterSpacing: 0, color: LIGHT.faint }}> {hint}</span> : null}
      </p>
      <div className="qualif-group" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              style={{
                fontFamily: "var(--ff-body)",
                fontSize: 13,
                lineHeight: 1.3,
                padding: "9px 14px",
                borderRadius: 8,
                border: `1px solid ${active ? BLUE : LIGHT.border}`,
                background: active ? BLUE : LIGHT.panel,
                color: active ? "#fff" : LIGHT.text,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const interventionTabs = [
  {
    id: "audit",
    label: "Audit",
    cards: [
      {
        icon: "ti-list-check",
        type: "Registre des systèmes d'IA",
        h3: "Inventaire des systèmes IA",
        extraitLabel: "entreprise de services, une cinquantaine de salariés",
        extrait: (
          <div style={{ fontStyle: "normal" }}>
            {[
              ["Système n° 3", "Tri de candidatures"],
              ["Rôle tenu", "Déployeur"],
              ["Mise en service", "Antérieure à déc. 2027"],
              ["Régime applicable", "Transitoire — art. 111"],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "5px 0", borderBottom: i < 3 ? "0.5px solid #EDEDEA" : "none" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.faint }}>{k}</span>
                <span style={{ fontSize: 12, color: LIGHT.text, textAlign: "right" }}>{v}</span>
              </div>
            ))}
            <div style={{ background: LIGHT.panel2, borderLeft: `2px solid ${ACCENT}`, padding: "10px 11px", marginTop: 11 }}>
              <p style={{ fontFamily: "var(--ff-mono)", fontSize: 9, color: ACCENT, margin: "0 0 5px", letterSpacing: ".05em", textTransform: "uppercase" }}>
                Analyse technique — N. Abchiche-Mimouni
              </p>
              <p style={{ fontSize: 11.5, color: LIGHT.muted, margin: 0, lineHeight: 1.6 }}>
                Le score renvoyé n&apos;est pas un simple classement : il pondère des variables corrélées à l&apos;ancienneté du diplôme. La reprise humaine existe mais n&apos;est pas tracée. Une modification du paramétrage constituerait vraisemblablement une modification importante au sens du règlement.
              </p>
            </div>
            <div style={{ background: "#F7F7F5", padding: "9px 11px", marginTop: 9, borderRadius: 4 }}>
              <p style={{ fontSize: 11, color: LIGHT.muted, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: LIGHT.text, fontWeight: 600 }}>Ce que ce champ change.</strong> La date de mise en service commande le régime applicable autant que la qualification — et une modification importante le fait basculer.
              </p>
            </div>
          </div>
        ),
      },
      {
        icon: "ti-alert-triangle",
        type: "Matrice des risques",
        h3: "Risques prioritaires identifiés",
        extraitLabel: "fintech de crédit",
        extrait: (
          <div style={{ fontStyle: "normal" }}>
            {[
              ["Rôle tenu non documenté", "Exigible aujourd'hui"],
              ["Information des personnes concernées", "Exigible aujourd'hui"],
              ["Paramétrage modifié sans qualification", "À qualifier sans délai"],
              ["Classement haut risque — annexe III", "À préparer · déc. 2027"],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "5px 0", borderBottom: i < 3 ? "0.5px solid #EDEDEA" : "none" }}>
                <span style={{ fontSize: 12, color: LIGHT.text }}>{k}</span>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.faint, textAlign: "right", flexShrink: 0 }}>{v}</span>
              </div>
            ))}
            <div style={{ background: LIGHT.panel2, borderLeft: `2px solid ${ACCENT}`, padding: "10px 11px", marginTop: 11 }}>
              <p style={{ fontFamily: "var(--ff-mono)", fontSize: 9, color: ACCENT, margin: "0 0 5px", letterSpacing: ".05em", textTransform: "uppercase" }}>
                Analyse — priorisation
              </p>
              <p style={{ fontSize: 11.5, color: LIGHT.muted, margin: 0, lineHeight: 1.6 }}>
                Deux risques sont déjà exigibles : documenter le rôle tenu et informer les personnes concernées. Le classement haut risque n&apos;est opposable qu&apos;en décembre 2027 — il se prépare, il ne se traite pas dans l&apos;urgence.
              </p>
            </div>
            <div style={{ background: "#F7F7F5", padding: "9px 11px", marginTop: 9, borderRadius: 4 }}>
              <p style={{ fontSize: 11, color: LIGHT.muted, margin: 0, lineHeight: 1.55 }}>
                <strong style={{ color: LIGHT.text, fontWeight: 600 }}>Ce que la matrice hiérarchise.</strong> Ce qui est dû aujourd&apos;hui, ce qui est reporté, et le paramétrage non qualifié qui peut faire tomber le régime allégé.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: "documentation",
    label: "Documentation",
    cards: [
      {
        icon: "ti-file-text",
        type: "Documentation technique Art. 11",
        h3: "Notice technique du système IA",
        extraitLabel: "SaaS médical",
        extrait: (
          <>
            <B>§3.2 — Supervision humaine</B>. Le système ne produit pas de diagnostic. Il génère
            une suggestion d&apos;orientation que le praticien valide ou écarte. Toute décision
            finale est tracée dans le dossier patient sous la responsabilité du médecin. Aucune
            décision automatisée au sens de l&apos;<B>Art. 22 RGPD</B>.
          </>
        ),
      },
      {
        icon: "ti-eye",
        type: "Notice utilisateur Art. 13",
        h3: "Transparence envers les utilisateurs",
        extraitLabel: "chatbot d'assureur",
        extrait: (
          <>
            Vous interagissez avec un système d&apos;<B>intelligence artificielle</B>. Les réponses
            fournies sont générées automatiquement et ne constituent pas un conseil personnalisé.
            Vous pouvez demander à être mis en relation avec un conseiller humain à tout moment en
            tapant <B>&apos;Conseiller&apos;</B>.
          </>
        ),
      },
    ],
  },
  {
    id: "gouvernance",
    label: "Gouvernance",
    cards: [
      {
        icon: "ti-settings",
        type: "Charte IA interne",
        h3: "Politique d'usage de l'IA",
        extraitLabel: "ETI industrielle",
        extrait: (
          <>
            <B>Art. 5 — Données interdites</B>. Il est interdit d&apos;injecter dans tout outil IA :
            données de santé des salariés, documents couverts par le secret des affaires, données
            clients non anonymisées, évaluations individuelles. Tout usage non conforme déclenche
            une <B>procédure disciplinaire</B>.
          </>
        ),
      },
      {
        icon: "ti-users",
        type: "Comité IA",
        h3: "Gouvernance et circuit de décision",
        extraitLabel: "cabinet de conseil",
        extrait: (
          <>
            Tout déploiement d&apos;un nouveau système IA est soumis à validation du{" "}
            <B>Comité IA</B> (DG + DPO + DSI) avant mise en production. Délai de traitement :{" "}
            <B>15 jours ouvrés</B>. Les systèmes à haut risque requièrent en outre une évaluation de
            conformité et une information préalable du <B>CSE</B> si impact sur les
            conditions de travail.
          </>
        ),
      },
    ],
  },
  {
    id: "contrats",
    label: "Contrats",
    cards: [
      {
        icon: "ti-file-check",
        type: "Clause fournisseur IA",
        h3: "Encadrement des API et SaaS IA",
        extraitLabel: "clause type pour un contrat d'API",
        extrait: (
          <>
            <B>Art. 9.3</B> — Le fournisseur garantit que le modèle utilisé n&apos;est pas classé à
            haut risque au sens de l&apos;<B>Annexe III</B> du Règlement IA pour les usages couverts
            par le présent contrat. Il s&apos;engage à notifier le client dans un délai de{" "}
            <B>5 jours ouvrés</B> de toute modification susceptible de modifier cette qualification.
          </>
        ),
      },
      {
        icon: "ti-scale",
        type: "Clause CGV éditeur SaaS",
        h3: "Responsabilité et limites de l'automatisation",
        extraitLabel: "CGV d'un éditeur SaaS",
        extrait: (
          <>
            Les résultats produits par le système constituent des propositions soumises à validation
            de l&apos;utilisateur. LogiCompta IA ne se substitue pas au professionnel qualifié. La
            décision finale et la responsabilité de son exécution incombent exclusivement à
            l&apos;utilisateur, conformément à l&apos;arrêt <B>CA Lyon, 13 mai 2025</B>.
          </>
        ),
      },
    ],
  },
  {
    id: "crise",
    label: "Crise",
    cards: [
      {
        icon: "ti-alert-circle",
        type: "Procédure incident IA",
        h3: "Gestion d'un incident algorithmique",
        extraitLabel: "outil RH de présélection",
        extrait: (
          <>
            Incident détecté : biais systématique dans le scoring de candidats. <B>H+0</B> :
            suspension immédiate des décisions automatisées. <B>H+4</B> : information du DPO et du
            DRH. <B>H+24</B> : qualification juridique par l&apos;avocat — <B>AI Act</B> +{" "}
            <B>RGPD</B> + droit du travail. <B>H+48</B> : décision sur obligation de notification{" "}
            <B>CNIL</B> et information du <B>CSE</B>.
          </>
        ),
      },
      {
        icon: "ti-shield",
        type: "Stratégie de défense",
        h3: "Réponse à un contrôle autorité",
        extraitLabel: "dossier de contrôle CNIL",
        extrait: (
          <>
            Face à la demande de justification du système de scoring client : production du registre
            IA (système qualifié risque limité, non haut risque), de la notice utilisateur{" "}
            <B>Art. 13</B> (information sur l&apos;automatisation), et du journal de{" "}
            <B>supervision humaine</B> démontrant qu&apos;aucune décision n&apos;a été prise sans
            validation.
          </>
        ),
      },
    ],
  },
] as const;

export default function IaActClient() {
  const [activeTab, setActiveTab] = useState("audit");
  const [openQuestions, setOpenQuestions] = useState<number[]>([0]);
  // Qualificateur (bloc 3) — trois choix, défauts : assistant / acheté / non.
  const [q1, setQ1] = useState<OutilId>("assistant");
  const [q2, setQ2] = useState<ProvId>("d");
  const [q3, setQ3] = useState<DecId>("n");
  const activePanel = interventionTabs.find((t) => t.id === activeTab) ?? interventionTabs[0];

  return (
    <main
      data-domaine="donnees"
      style={
        {
          "--brand": "#1A47FF",
          "--brand-rgb": "26,71,255",
          "--famille-accent": "#1D9E75",
          "--famille-rgb": "29,158,117",
          background: LIGHT.bg,
          color: LIGHT.text,
          fontFamily: "var(--ff-body)",
          // Le header global (SiteHeader) est en position absolue et transparent
          // sur les heros sombres : le héro passe DESSOUS, comme les autres pages
          // /nos-domaines. Pas de décalage ici — un paddingTop laisserait
          // apparaître le fond clair du <main> sous le header (bande blanche). Le
          // dégagement des 72px du header est géré dans le héro (.iaact-hero-text).
        } as CSSProperties
      }
    >
      {/* 1. HERO — deux colonnes avec photographie (même traitement que
          cybersécurité). Mobile : photo en fond + voile ; desktop : texte 55 %
          à gauche, image 45 % à droite en cover. */}
      <section style={{ background: DARK.bg, color: DARK.text, overflow: "hidden" }}>
        <style>{`
          .iaact-hero-grid { position: relative; display: block; }
          .iaact-hero-photo { position: absolute; inset: 0; z-index: 0; }
          .iaact-hero-img { object-position: center top; }
          .iaact-hero-overlay { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(8,10,20,0.86) 0%, rgba(8,10,20,0.78) 55%, rgba(8,10,20,0.66) 100%); }
          .iaact-hero-fade { display: none; }
          .iaact-hero-text { position: relative; z-index: 1; padding: 88px 24px 44px; min-height: 360px; }
          @media (min-width: 1024px) {
            .iaact-hero-grid { display: grid; grid-template-columns: 55fr 45fr; align-items: stretch; }
            .iaact-hero-photo { position: relative; inset: auto; order: 2; height: auto; min-height: 460px; z-index: auto; }
            .iaact-hero-overlay { display: none; }
            .iaact-hero-fade { display: block; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(to left, rgba(10,15,46,0) 58%, ${DARK.bg} 100%); }
            .iaact-hero-text { order: 1; padding: 56px 40px 56px 24px; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
          }
        `}</style>
        <div className="iaact-hero-grid" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="iaact-hero-photo">
            <Image
              src="/images/ia-act-hero.jpg"
              alt="Immeuble haussmannien à Paris au crépuscule, quelques fenêtres éclairées"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="iaact-hero-img"
              style={{ objectFit: "cover" }}
            />
            <span className="iaact-hero-fade" aria-hidden />
            <span className="iaact-hero-overlay" aria-hidden />
          </div>

          <div className="iaact-hero-text">
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5fd3a8",
                background: "rgba(var(--famille-rgb),0.22)",
                borderRadius: 8,
                padding: "4px 12px",
                marginBottom: 16,
                alignSelf: "flex-start",
              }}
            >
              IA &amp; AI Act · Paris
            </span>
            <h1 style={{ ...TYPE.h1, marginBottom: 12, color: DARK.text }}>
              Mise en conformité AI Act et gouvernance IA
            </h1>
            <p
              style={{
                fontSize: 19,
                fontWeight: 400,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 520,
                marginBottom: 14,
              }}
            >
              Une IA mal documentée devient un risque de responsabilité.
            </p>
            <p style={{ ...TYPE.body, maxWidth: 520, color: DARK.muted, marginBottom: 16 }}>
              Le cabinet accompagne les entreprises qui utilisent, intègrent ou
              développent des systèmes d&apos;intelligence artificielle. Nous
              établissons les obligations qui vous incombent, nous posons les
              règles que vos équipes appliqueront, et nous vous défendons le jour
              où le sujet est contesté.
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {heroTags.map((t) => (
                <span
                  key={t}
                  style={{
                    border: `1px solid ${DARK.borderBlue}`,
                    color: DARK.text,
                    opacity: 0.72,
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 3,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Un seul bouton principal (prompt 2.2) ; l'ancien second bouton
                devient un lien texte discret placé SOUS le bouton. */}
            <div className="flex flex-col" style={{ gap: 12, alignItems: "flex-start" }}>
              <Link
                href="/contact"
                style={{
                  background: BLUE,
                  color: DARK.text,
                  padding: "0 20px",
                  minHeight: 48,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 12,
                  letterSpacing: ".04em",
                }}
              >
                Faire le point sur vos systèmes d&apos;IA →
              </Link>
              {/* Lien texte discret : DM Mono, Muted, flèche descendante, ancre
                  #ce-que-les-juges. Pas de fond, pas de bordure. */}
              <Link
                href="#ce-que-les-juges"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: DARK.muted,
                  fontFamily: "var(--ff-mono)",
                  fontSize: 11,
                  letterSpacing: ".06em",
                  textDecoration: "none",
                }}
              >
                Ce que les juges exigent déjà ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ÊTES-VOUS CONCERNÉ — six exemples, tableau Situation / Question. */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Périmètre</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Êtes-vous concerné ?</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 720 }}>
            Six exemples parmi les plus fréquents. La liste n&apos;est pas limitative.
          </p>
          <div style={{ border: `0.5px solid ${LIGHT.border}`, borderRadius: 8, overflow: "hidden" }}>
            <div className="hidden md:grid md:grid-cols-2" style={{ gap: "0 16px", padding: "10px 14px", background: LIGHT.panel, borderBottom: `0.5px solid ${LIGHT.border}` }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: LIGHT.faint }}>Situation</span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: LIGHT.faint }}>La question qui se pose</span>
            </div>
            {[
              { situation: "IA générative utilisée par vos salariés", question: "Quelles données peut-on y verser, et quelles règles fixer ?" },
              { situation: "Recrutement et gestion RH", question: "Comment encadrer la décision et préparer le dialogue social ?" },
              { situation: "Chatbot destiné à vos clients", question: "Que faut-il dire à l'interlocuteur, et qui répond des erreurs ?" },
              { situation: "Scoring ou aide à la décision", question: "Quelles garanties pour les personnes, et quel lien avec le RGPD ?" },
              { situation: "IA intégrée à votre produit", question: "Quel rôle tenons-nous, et quelles obligations nous incombent ?" },
              { situation: "Inférence des émotions au travail", question: "Cet usage est interdit. Où s'arrête l'interdiction ?" },
            ].map((r, i) => (
              <div
                key={r.situation}
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ gap: "4px 16px", padding: "12px 14px", borderTop: i > 0 ? `0.5px solid ${LIGHT.border}` : "none" }}
              >
                <div style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.4 }}>{r.situation}</div>
                <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.5 }}>{r.question}</div>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              marginTop: 12,
              fontFamily: "var(--ff-mono)",
              fontSize: 12,
              letterSpacing: ".04em",
              color: LIGHT.muted,
              textDecoration: "none",
            }}
          >
            Un autre usage ? →
          </Link>
        </div>
      </section>

      {/* 3. CE QUE LE RÈGLEMENT IMPOSE — qualificateur interactif. Titre = vrai
          <h2>. Trois questions recomposent le résultat SUR L'OUTIL (aria-live). */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <style>{`
          @media (max-width: 640px) {
            .qualif-group { flex-direction: column; }
            .qualif-group button { width: 100%; }
          }
        `}</style>
        <div style={INNER}>
          <Eyebrow>Le cadre</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 10 }}>Ce que le règlement impose, sur votre outil</h2>
          <div style={{ ...TYPE.secondary, marginBottom: 18, maxWidth: 760 }}>
            <p style={{ margin: "0 0 8px", lineHeight: 1.7 }}>
              Depuis le 2 février 2025, les entreprises qui utilisent, intègrent ou
              mettent sur le marché des systèmes d&apos;intelligence artificielle
              sont soumises au{" "}
              <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener" style={{ color: BLUE, textDecoration: "none" }}>règlement (UE) 2024/1689</a>{" "}
              du 13 juin 2024, dit règlement sur l&apos;intelligence artificielle
              ou AI Act, modifié par le{" "}
              <a href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj" target="_blank" rel="noopener" style={{ color: BLUE, textDecoration: "none" }}>règlement (UE) 2026/1744</a>{" "}
              du 8 juillet 2026. Il s&apos;applique aussi aux entreprises établies
              hors de l&apos;Union lorsque les résultats de leurs systèmes y sont
              utilisés.
            </p>
            <p style={{ margin: "0 0 8px", lineHeight: 1.7 }}>
              Le texte ne classe pas les entreprises, il classe les usages :
              certains sont <B>interdits</B>, d&apos;autres sont dits{" "}
              <B>à haut risque</B> et relèvent d&apos;un régime proche de celui
              d&apos;un produit industriel, d&apos;autres n&apos;appellent
              qu&apos;une obligation de <B>transparence</B>, la plupart ne sont
              pas réglementés. Vos obligations se déterminent donc outil par outil.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7 }}>Trois questions suffisent à situer le vôtre.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <QGroup label="1 · De quel outil parlons-nous ?" options={OUTILS} value={q1} onChange={(v) => setQ1(v as OutilId)} />
            <QGroup label="2 · D'où vient-il ?" options={PROVENANCES} value={q2} onChange={(v) => setQ2(v as ProvId)} />
            <QGroup
              label="3 · Sert-il à décider du sort de personnes ?"
              hint="(recrutement, crédit, assurance, éducation, accès à un service essentiel)"
              options={DECISIONS}
              value={q3}
              onChange={(v) => setQ3(v as DecId)}
            />
          </div>

          {/* Panneau de résultat — recomposé à chaque choix. */}
          <div aria-live="polite" style={{ marginTop: 16 }}>
            {(() => {
              const r = qualif(q1, q2, q3);
              return (
                <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.borderBlue}`, borderRadius: 10, padding: CARD_PAD }}>
                  <p style={{ ...TYPE.h3, color: LIGHT.text, margin: 0 }}>{r.titre}</p>
                  <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {r.bullets.map((b) => (
                      <li key={b} style={{ fontSize: 13.5, color: LIGHT.muted, lineHeight: 1.55, display: "flex", gap: 8 }}>
                        <span aria-hidden style={{ color: BLUE, flexShrink: 0 }}>—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.faint, margin: "12px 0 0", letterSpacing: ".03em" }}>
                    {r.reference}
                    {r.calendrier ? (
                      <>
                        {" — "}
                        <a href="#le-calendrier" style={{ color: BLUE, textDecoration: "none" }}>voir le calendrier</a>
                      </>
                    ) : null}
                  </p>
                  {r.contact ? (
                    <Link
                      href="/contact"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginTop: 14,
                        background: BLUE,
                        color: "#fff",
                        padding: "0 18px",
                        minHeight: 42,
                        borderRadius: 4,
                        textDecoration: "none",
                        fontSize: 12,
                        letterSpacing: ".04em",
                      }}
                    >
                      Faire le point sur vos systèmes d&apos;IA →
                    </Link>
                  ) : null}
                </div>
              );
            })()}
          </div>

          {/* Note de bas de bloc — toujours visible. */}
          <p style={{ fontSize: 12, color: LIGHT.muted, margin: "16px 0 0", lineHeight: 1.55, maxWidth: 760 }}>
            Cette page ne remplace pas une analyse. La qualification d&apos;un
            système donné suppose l&apos;examen de son fonctionnement réel, de sa
            destination et de vos contrats.
          </p>
        </div>
      </section>

      {/* 4. NOS INTERVENTIONS — trois niveaux + bloc « Défendre ». Bas de section
          resserré : livrables enchaîne sur le même fond (bloc « offre » continu). */}
      <section style={{ background: LIGHT.panel, color: LIGHT.text, padding: "40px 0 8px" }}>
        <div style={INNER}>
          <Eyebrow>Nos interventions</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 4 }}>Audit, gouvernance et conformité IA</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16 }}>Trois accompagnements et une défense.</p>
          <div className="flex flex-col" style={{ gap: GRID_GAP }}>
            {[
              {
                num: "01",
                titre: "Audit et diagnostic AI Act",
                phrase: "« Nous utilisons plusieurs IA sans savoir où nous en sommes. »",
                corps: "Inventaire des systèmes officiels et des usages informels, qualification, rôle tenu, feuille de route.",
                recois: "cartographie des usages, registre des systèmes, plan d'action priorisé",
                option: null as string | null,
                accent: true,
              },
              {
                num: "02",
                titre: "Gouvernance IA : registre, charte et procédures",
                phrase: "« Nous devons poser des règles. »",
                corps: "Registre des systèmes, charte IA, outils autorisés et données interdites, validation humaine, incidents, formation.",
                recois: "charte IA et procédures, circuit de validation",
                option:
                  "En option, un suivi dans la durée. Les services marketing, RH et informatique lancent chacun leurs projets sans procédure commune, et un audit ponctuel devient vite obsolète. Le suivi consiste à examiner les nouveaux usages, revoir les fournisseurs, actualiser le registre et animer les ateliers avec les équipes, avec la direction, le DPO et la DSI." as string | null,
                accent: false,
              },
              {
                num: "03",
                titre: "Conformité d'un système à haut risque",
                phrase: "« Notre produit peut relever de l'annexe III. »",
                corps: "Analyse complète, documentation, supervision humaine, contrats fournisseurs, préparation au contrôle.",
                recois: "documentation adaptée au rôle, organisation de la supervision, clauses contractuelles",
                option: null as string | null,
                accent: false,
              },
            ].map((n) => (
              <article
                key={n.num}
                style={{
                  background: LIGHT.panel,
                  border: `0.5px solid ${n.accent ? LIGHT.borderBlue : LIGHT.border}`,
                  borderRadius: 10,
                  padding: CARD_PAD,
                }}
              >
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".07em", color: LIGHT.muted }}>{n.num}</span>
                <h3 style={{ ...TYPE.h3, margin: "6px 0 0" }}>{n.titre}</h3>
                <p style={{ fontSize: 13, color: LIGHT.text, fontStyle: "italic", margin: "8px 0 0", lineHeight: 1.5 }}>{n.phrase}</p>
                <p style={{ fontSize: 13, color: LIGHT.muted, margin: "6px 0 0", lineHeight: 1.6 }}>{n.corps}</p>
                <p style={{ fontSize: 12.5, margin: "8px 0 0", lineHeight: 1.55 }}>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: BLUE }}>Ce que vous recevez</span>{" "}
                  <span style={{ color: LIGHT.muted }}>{n.recois}</span>
                </p>
                {n.option ? (
                  <p style={{ fontSize: 12.5, color: LIGHT.faint, margin: "8px 0 0", lineHeight: 1.55 }}>{n.option}</p>
                ) : null}
              </article>
            ))}
            {/* 4e bloc, d'une AUTRE nature (pas une mission de conformité) :
                l'intervention contentieuse. Volontairement distinct — fond navy. */}
            <article
              style={{
                background: DARK.bg,
                border: `0.5px solid ${DARK.borderBlue}`,
                borderRadius: 10,
                padding: CARD_PAD,
              }}
            >
              <h3 style={{ ...TYPE.h3, color: DARK.text, margin: 0 }}>Défendre — contrôle, incident, contentieux</h3>
              <p style={{ fontSize: 13, color: DARK.muted, margin: "8px 0 0", lineHeight: 1.6 }}>
                La documentation de conformité est la première ligne de défense ;
                le cabinet la construit pour qu&apos;elle tienne.
              </p>
              <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".04em", color: DARK.muted, margin: "12px 0 0", lineHeight: 1.6 }}>
                contrôle de l&apos;autorité · incident grave · contentieux avec un fournisseur ou un salarié
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 5. LES LIVRABLES — extraits (section « offre » : fond LIGHT.panel). */}
      <section style={{ background: LIGHT.panel, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Notre intervention</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Extraits de nos livrables</h2>
          <p style={{ ...TYPE.label, fontStyle: "italic", color: LIGHT.faint, margin: "0 0 16px" }}>
            Extraits inspirés de dossiers réels.
          </p>

          {/* Tableau v4 : ce que chaque livrable apporte, AVANT les extraits en
              onglets (conservés : registre, matrice, analyse signée). */}
          <div style={{ border: `0.5px solid ${LIGHT.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 18 }}>
            <div className="hidden md:grid md:grid-cols-2" style={{ gap: "0 16px", padding: "10px 14px", background: LIGHT.bg, borderBottom: `0.5px solid ${LIGHT.border}` }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: LIGHT.faint }}>Livrable</span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: LIGHT.faint }}>Ce qu&apos;il vous donne</span>
            </div>
            {[
              { livrable: "Cartographie des usages", donne: "Les outils réellement utilisés, leurs responsables, les données concernées" },
              { livrable: "Registre des systèmes", donne: "Les règles applicables à chacun, et le rôle que vous tenez" },
              { livrable: "Plan d'action priorisé", donne: "Ce qui est dû aujourd'hui, ce qui est reporté, avec responsables et échéances" },
              { livrable: "Charte IA et procédures", donne: "Des règles utilisables par les équipes, pas un document de principe" },
              { livrable: "Clauses contractuelles", donne: "Responsabilités, accès aux données et aux journaux, confidentialité, coopération documentaire" },
            ].map((r, i) => (
              <div key={r.livrable} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "4px 16px", padding: "12px 14px", borderTop: i > 0 ? `0.5px solid ${LIGHT.border}` : "none" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.4 }}>{r.livrable}</div>
                <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.5 }}>{r.donne}</div>
              </div>
            ))}
          </div>

          <div className="mb-3 overflow-x-auto">
            <div
              className="inline-flex min-w-max"
              style={{
                border: "1px solid rgba(10,10,20,0.08)",
                borderRadius: 6,
                overflow: "hidden",
                background: "white",
              }}
            >
              {interventionTabs.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    border: "none",
                    borderRight: idx < interventionTabs.length - 1 ? "1px solid rgba(10,10,20,0.08)" : "none",
                    background: activeTab === t.id ? DARK.bg : LIGHT.panel,
                    color: activeTab === t.id ? DARK.text : "rgba(10,10,20,0.4)",
                    padding: "8px 12px",
                    fontSize: 12,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: LIGHT.panel,
              border: `1px solid ${LIGHT.border}`,
              borderRadius: 8,
              padding: CARD_PAD,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP, alignItems: "stretch" }}>
              {activePanel.cards.map((card) => (
                <div
                  key={card.h3}
                  style={{
                    background: LIGHT.panel,
                    border: `1px solid ${LIGHT.border}`,
                    borderRadius: 12,
                    padding: CARD_PAD,
                    display: "flex",
                    flexDirection: "column",
                    gap: GRID_GAP,
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        background: "#E6F1FB",
                        color: "#185FA5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`ti ${card.icon}`} style={{ fontSize: 17 }} aria-hidden="true" />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: LIGHT.muted,
                      }}
                    >
                      {card.type}
                    </span>
                  </div>
                  <h3 style={{ ...TYPE.h3, color: LIGHT.text, margin: 0, lineHeight: 1.35 }}>
                    {card.h3}
                  </h3>
                  <div
                    style={{
                      background: LIGHT.panel2,
                      borderLeft: "2px solid #378ADD",
                      borderRadius: "0 8px 8px 0",
                      padding: "10px 14px",
                      marginTop: "auto",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 10,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#185FA5",
                        margin: "0 0 6px",
                      }}
                    >
                      {card.extraitLabel}
                    </p>
                    <div style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>
                      {card.extrait}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. NOS DOSSIERS — preuve vécue (entre livrables et jurisprudence). Deux
          dossiers, quatre lignes chacun. Sobre : ni photo, ni icône. */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Retour d&apos;expérience</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 16 }}>Nos dossiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP, alignItems: "stretch" }}>
            {[
              {
                titre: "Des salariés utilisent l'IA avec des documents confidentiels",
                lignes: [
                  ["Situation", "Une entreprise de conseil découvre que ses équipes transmettent des contrats clients et des comptes rendus internes à plusieurs assistants d'IA."],
                  ["Difficulté", "Personne ne sait quels outils sont utilisés, quelles données sont conservées, ni quels engagements les fournisseurs prennent."],
                  ["Notre intervention", "Recenser les usages, examiner les conditions contractuelles, définir les données autorisées, former les équipes à partir des situations rencontrées."],
                  ["Résultat", "Une liste d'outils autorisés, une charte opérationnelle, un circuit de validation des nouveaux usages."],
                ],
              },
              {
                titre: "Un éditeur ajoute une fonction d'IA avant de signer avec un grand compte",
                lignes: [
                  ["Situation", "Un éditeur SaaS intègre un modèle tiers à son logiciel ; un client important demande des garanties sur les données, les résultats et la conformité avant de signer."],
                  ["Difficulté", "Les engagements commerciaux envisagés dépassent les garanties obtenues du fournisseur du modèle."],
                  ["Notre intervention", "Déterminer les rôles respectifs, examiner les flux de données, revoir les engagements contractuels, constituer le dossier de réponses aux questions du client."],
                  ["Résultat", "Un périmètre et des responsabilités clarifiés, des clauses adaptées, une documentation qui a permis de poursuivre la négociation."],
                ],
              },
            ].map((d) => (
              <article key={d.titre} style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 10, padding: CARD_PAD, display: "flex", flexDirection: "column", height: "100%" }}>
                <h3 style={{ ...TYPE.h3, margin: 0, lineHeight: 1.3 }}>{d.titre}</h3>
                <dl style={{ margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 9 }}>
                  {d.lignes.map(([k, v]) => (
                    <div key={k}>
                      <dt style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: BLUE }}>{k}</dt>
                      <dd style={{ margin: "2px 0 0", fontSize: 13, color: LIGHT.muted, lineHeight: 1.55 }}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <p style={{ fontSize: 12, color: LIGHT.muted, margin: "12px 0 0", lineHeight: 1.55 }}>
            Dossiers anonymisés. Chaque affaire dépend de ses circonstances propres.
          </p>
          {/* Rappel de contact — une ligne + le bouton, pas une nouvelle section. */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 18 }}>
            <span style={{ fontSize: 14, color: LIGHT.text }}>Une situation proche de la vôtre ?</span>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", background: BLUE, color: "#fff", padding: "0 18px", minHeight: 42, borderRadius: 4, textDecoration: "none", fontSize: 12, letterSpacing: ".04em" }}>
              Faire le point sur vos systèmes d&apos;IA →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CE QUE LES JUGES EXIGENT DÉJÀ — jurisprudence. Chaque carte
          affiche juridiction, date et enseignement essentiel ; l'analyse est
          repliée derrière un <details> natif (aucun JS). */}
      <section id="ce-que-les-juges" style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD, scrollMarginTop: 80 }}>
        <div style={INNER}>
          <Eyebrow>Jurisprudence</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Ce que les juges exigent déjà</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 760 }}>
            Ces décisions ne sont pas des applications de l&apos;AI Act. Elles
            montrent que le droit du travail encadre déjà le déploiement de
            l&apos;IA en entreprise.
          </p>
          {/* Les décisions passent par le composant partagé, qui ne rend que
              celles dont verifiee vaut true. Les quatre entrées ont été validées
              par le cabinet (voir JURIS_IA en tête de fichier). */}
          {/* Mention de prudence de bas de section retirée (prompt 2.9) :
              note={null} la masque pour cette page uniquement, sans toucher au
              rendu des autres pages qui utilisent le composant partagé. */}
          <Jurisprudence decisions={JURIS_IA} note={null} />
        </div>
      </section>

      {/* 8. NOTRE APPROCHE — le binôme (parité stricte : même format, même
          encadré de fonction, même nombre de points, hauteur identique via
          align-items:stretch + height 100%). Alexandre en premier. Un seul h2.
          TODO (cabinet) : valider avec Nadia Abchiche-Mimouni l'intitulé exact
          de sa fonction (donnée partagée lib/equipe.ts non modifiée). */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Notre approche</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Du contrat à l&apos;algorithme</h2>
          <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.7, marginBottom: 16, maxWidth: 760 }}>
            Qualifier juridiquement un système suppose d&apos;abord d&apos;établir
            ce qu&apos;il fait réellement — et cela ne se lit pas dans une fiche
            produit. L&apos;analyse juridique et l&apos;examen technique sont menés
            ensemble, et les conclusions construites en commun.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP, alignItems: "stretch" }}>
            {[
              {
                photo: "/images/alexandre-pro.jpg",
                fonction: "Avocat au barreau de Paris",
                nom: "Me Alexandre Lazarègue",
                role: "Qualification juridique, documentation et contentieux",
                examine: "Ce qu'il examine",
                points: [
                  "Rôle de l'entreprise : fournisseur, déployeur, importateur",
                  "Régime applicable et date de mise sur le marché",
                  "Documentation de conformité et traçabilité des décisions",
                  "Défense en cas de contrôle ou de contentieux",
                ],
              },
              {
                photo: "/images/nadia-pro.jpg",
                fonction: "Docteure en intelligence artificielle · intervenante indépendante",
                nom: "Nadia Abchiche-Mimouni",
                role: "Architecture des systèmes, données et supervision",
                examine: "Ce qu'elle examine",
                points: [
                  "Architecture du système et nature réelle du traitement",
                  "Jeux de données d'entraînement, de validation et de test",
                  "Mécanismes de supervision et points de reprise humaine",
                  "Mesure des biais et de leurs effets sur les personnes",
                ],
              },
            ].map((m) => (
              <article
                key={m.nom}
                style={{
                  background: LIGHT.panel,
                  border: `0.5px solid ${LIGHT.border}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
                  <Image
                    src={m.photo}
                    alt={m.nom}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <span
                    style={{
                      alignSelf: "flex-start",
                      fontFamily: "var(--ff-mono)",
                      fontSize: 9,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: LIGHT.muted,
                      border: `1px solid ${LIGHT.border}`,
                      padding: "3px 8px",
                      lineHeight: 1.5,
                    }}
                  >
                    {m.fonction}
                  </span>
                  <p style={{ fontSize: 15, fontWeight: 600, color: LIGHT.text, margin: 0, lineHeight: 1.35 }}>{m.nom}</p>
                  <p style={{ fontSize: 12, color: LIGHT.muted, margin: 0, lineHeight: 1.5 }}>{m.role}</p>
                  <p
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 10,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: LIGHT.faint,
                      margin: "4px 0 0",
                    }}
                  >
                    {m.examine}
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {m.points.map((pt) => (
                      <li key={pt} style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.5, display: "flex", gap: 8 }}>
                        <span aria-hidden="true" style={{ color: ACCENT, flexShrink: 0 }}>—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 9. OÙ EN EST LE DROIT — le calendrier (section autonome). id = cible de
          l'ancre « voir le calendrier » du qualificateur (bloc 3). */}
      <section id="le-calendrier" style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD, scrollMarginTop: 80 }}>
        <div style={INNER}>
          <Eyebrow>Où en est le droit</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
            Le calendrier, au 11 septembre 2026
          </h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 760 }}>
            Règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744 du
            8 juillet 2026, en vigueur depuis le 27 juillet.
          </p>

          {/* Calendrier v4 — version allégée : une ligne = une date + une
              obligation. Le détail des rôles est au bloc « Ce que le règlement
              impose », les montants dans la FAQ.
              AVANT MISE EN LIGNE — AL : confirmer la date d'application des deux
              interdictions (art. 1, point 40 a, du règlement (UE) 2026/1744). */}
          {[
            {
              bloc: "Ce qui s'applique aujourd'hui",
              rows: [
                { date: "2 février 2025", titre: "Pratiques interdites et maîtrise de l'IA", initial: null as string | null, desc: null as string | null },
                { date: "2 août 2025", titre: "Sanctions et autorités nationales", initial: null as string | null, desc: "Régime de sanctions et désignation des autorités nationales, sauf l'article 101 (amendes des fournisseurs de modèles), applicable depuis le 2 août 2026. Les amendes ne sont donc pas exigibles depuis février 2025." as string | null },
                { date: "2 août 2026", titre: "Transparence et application générale du règlement", initial: null as string | null, desc: null as string | null },
              ],
            },
            {
              bloc: "Ce qui vient",
              rows: [
                { date: "2 décembre 2026", titre: "Marquage lisible par machine", initial: null as string | null, desc: "Quatre mois de transition, pour les seuls fournisseurs ayant mis leur système sur le marché avant août 2026. L'annonce d'une IA interactive et la divulgation des hypertrucages ne sont pas reportées." as string | null },
                { date: "2 décembre 2026", titre: "Deux interdictions nouvelles", initial: null as string | null, desc: "Contenus intimes non consentis et contenus pédocriminels générés par IA. Le déployeur n'est visé que s'il utilise le système dans ce but." as string | null },
                { date: "2 décembre 2027", titre: "Haut risque, annexe III", initial: "initialement août 2026" as string | null, desc: "Par exemple : recrutement et gestion RH, scoring de crédit, tarification en assurance, éducation, accès aux services essentiels." as string | null },
                { date: "2 août 2028", titre: "Haut risque, annexe I", initial: "initialement août 2027" as string | null, desc: "Par exemple : composant de sécurité d'un dispositif médical, d'une machine, d'un jouet. Les machines relèvent désormais d'une approche sectorielle." as string | null },
              ],
            },
          ].map((b) => (
            <div key={b.bloc} style={{ marginBottom: 18 }}>
              <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: LIGHT.text, margin: "0 0 8px" }}>{b.bloc}</p>
              <div style={{ border: `0.5px solid ${LIGHT.border}`, borderRadius: 10, overflow: "hidden" }}>
                {b.rows.map((r, i) => (
                  <div key={r.titre} style={{ padding: "13px 14px", borderTop: i > 0 ? `0.5px solid ${LIGHT.border}` : "none", background: LIGHT.panel }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                      <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.muted }}>{r.date}</span>
                      {r.initial ? (
                        <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: LIGHT.faint, whiteSpace: "nowrap" }}>{r.initial}</span>
                      ) : null}
                    </div>
                    <p style={{ fontSize: 14, color: LIGHT.text, fontWeight: 600, margin: "6px 0 0" }}>{r.titre}</p>
                    {r.desc ? (
                      <p style={{ fontSize: 12.5, color: LIGHT.muted, margin: "4px 0 0", lineHeight: 1.55 }}>{r.desc}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Bandeau à la suite du calendrier */}
          <div style={{ background: DARK.bg, borderRadius: 10, padding: 16, marginTop: 12 }}>
            <p style={{ fontSize: 14, color: "#fff", fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
              Le calendrier ne suffit pas à déterminer vos obligations.
            </p>
            <p style={{ fontSize: 13, color: DARK.muted, margin: "7px 0 0", lineHeight: 1.6 }}>
              Il faut qualifier le système, établir le rôle de l&apos;entreprise,
              et vérifier sa date de mise sur le marché. Les allègements prévus
              pour les petites entreprises et les entreprises à faible
              capitalisation entrent aussi en compte.
            </p>
          </div>
          <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: LIGHT.faint, margin: "12px 0 0", letterSpacing: ".04em" }}>
            À JOUR AU 11 SEPTEMBRE 2026 · RÉVISION TRIMESTRIELLE
          </p>
        </div>
      </section>

      {/* 10. LIVRE BLANC — bloc de renvoi (prompt 2.10). La page Ressources
          correspondante n'existe pas encore → bouton DÉSACTIVÉ, aucune URL
          inventée, aucun formulaire. À ACTIVER quand la page « Le règlement sur
          l'IA : qui doit faire quoi » existera dans Ressources : pointer vers la
          PAGE (pas le PDF). Signalé à AL. */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: CARD_PAD,
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: LIGHT.text, margin: 0, lineHeight: 1.4 }}>
                {"Livre blanc — « Le règlement sur l'IA : qui doit faire quoi »"}
              </p>
              <p style={{ fontSize: 13, color: LIGHT.muted, margin: "6px 0 0", lineHeight: 1.6 }}>
                {"Le partage des obligations entre fournisseur, déployeur et éditeur de modèle, étape par étape."}
                <br />
                {"Révision août 2026. Lecture libre, sans formulaire."}
              </p>
            </div>
            {/* Bouton désactivé tant que la page Ressources n'existe pas. */}
            <span
              aria-disabled="true"
              title="Page en préparation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 18px",
                minHeight: 44,
                borderRadius: 4,
                border: `1px solid ${LIGHT.border}`,
                background: "transparent",
                color: LIGHT.muted,
                fontFamily: "var(--ff-mono)",
                fontSize: 12,
                letterSpacing: ".04em",
                opacity: 0.5,
                cursor: "not-allowed",
                whiteSpace: "nowrap",
              }}
            >
              Consulter le livre blanc
            </span>
          </div>
        </div>
      </section>

      {/* 11. QUESTIONS FRÉQUENTES */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Questions fréquentes</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 16 }}>
            Ce que nos clients nous demandent avant de commencer
          </h2>

          <div style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 8, overflow: "hidden" }}>
            {/* Source unique : FAQ_TEXTE alimente cet accordéon ET le FAQPage
                (page.tsx). Les deux affichent exactement le même texte. */}
            {FAQ_TEXTE.map((item, idx, arr) => {
              const isOpen = openQuestions.includes(idx);
              return (
                <div
                  key={item.q}
                  style={{
                    borderBottom: idx < arr.length - 1 ? `1px solid ${LIGHT.border}` : "none",
                    padding: "0 16px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-ia-reponse-${idx}`}
                      onClick={() =>
                        setOpenQuestions((prev) =>
                          prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
                        )
                      }
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        padding: "12px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        textAlign: "left",
                        cursor: "pointer",
                        font: "inherit",
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 500, color: LIGHT.text }}>{item.q}</span>
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: 18,
                          color: BLUE,
                          lineHeight: 1,
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 180ms ease",
                          flexShrink: 0,
                        }}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  {/* La réponse reste dans le DOM une fois repliée (hidden), pour
                      rester présente dans le HTML servi et cohérente avec le
                      balisage FAQPage. */}
                  <div
                    id={`faq-ia-reponse-${idx}`}
                    hidden={!isOpen}
                    style={{ ...TYPE.small, color: LIGHT.muted, lineHeight: 1.7, padding: "0 0 14px 0", maxWidth: 760 }}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 12. MAILLAGE — RGPD, contrats IT, NIS 2. Version simple posée dès le
          lot 2 pour ne pas perdre les liens internes ; à peaufiner au lot 4. */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <p style={{ fontSize: 14, color: LIGHT.muted, margin: 0, lineHeight: 1.7 }}>
            L&apos;IA croise vos autres obligations : les données personnelles
            relèvent du{" "}
            <Link href="/nos-domaines/rgpd-donnees" style={{ color: BLUE, textDecoration: "underline" }}>
              RGPD
            </Link>
            , les prestataires et API de vos{" "}
            <Link href="/nos-domaines/contrats-informatiques" style={{ color: BLUE, textDecoration: "underline" }}>
              contrats IT
            </Link>
            , et la journalisation rejoint les exigences de{" "}
            <Link href="/nos-domaines/cybersecurite/nis2" style={{ color: BLUE, textDecoration: "underline" }}>
              NIS 2
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 13. CTA */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD, width: "100%" }}>
        <div style={{ ...INNER, textAlign: "center" }}>
          <h2 style={{ ...TYPE.h2, marginBottom: 6, color: DARK.text }}>
            Faire qualifier vos systèmes avant que la question ne se pose.
          </h2>
          <p style={{ ...TYPE.body, color: DARK.muted, marginBottom: 16 }}>
            Un premier échange pour cartographier vos usages et évaluer votre exposition — sans engagement.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: BLUE,
              color: DARK.text,
              textDecoration: "none",
              padding: "12px 18px",
              borderRadius: 4,
              fontSize: 12,
              letterSpacing: ".04em",
            }}
          >
            Faire le point sur vos systèmes d&apos;IA →
          </Link>
        </div>
      </section>
    </main>
  );
}
