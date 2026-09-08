"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { fr } from "@/lib/typo";
import Link from "next/link";
import Image from "next/image";
import { Jurisprudence, type Decision } from "@/components/jurisprudence";
import { FAQ_TEXTE } from "./faq-texte";

/* § 5.3 — Ces quatre décisions ont été validées par le cabinet le 8 septembre
   2026 (retrouvées et lues) : verifiee: true, le composant partagé les rend.
   Le garde-fou reste actif : toute décision future dont verifiee vaut false ne
   sera pas rendue (mécanisme mis en place après qu'une version antérieure de la
   page contrats a cité un « tribunal des activités économiques de Lille »,
   juridiction inexistante). */
const JURIS_IA: Decision[] = [
  {
    juridiction: "TJ Nanterre",
    date: "29 janvier 2026",
    reference: "n° 25/02856",
    intitule: "IA RH : déploiement suspendu faute de consultation du CSE",
    regle: "Une entreprise déploie deux outils de gestion des compétences intégrant de l'IA pour alimenter les entretiens annuels, le suivi des carrières et l'affectation des salariés. Le tribunal considère que ces outils modifient concrètement les conditions de travail et imposent une consultation préalable du CSE ; le déploiement est suspendu jusqu'à l'achèvement de cette procédure. Une IA RH qui influence l'évaluation, les compétences ou les parcours n'est pas un simple outil informatique.",
    verifiee: true,
  },
  {
    juridiction: "TJ Paris",
    date: "10 février 2026",
    reference: "n° 25/57412",
    intitule: "Copilot 365 : pas encore un « projet important »",
    regle: "Une association expérimente Copilot 365 pendant quatre mois auprès de salariés volontaires. Le tribunal juge que cette phase pilote — facultative, temporaire, à l'impact limité — ne modifie pas suffisamment les conditions de travail pour justifier une expertise du CSE. L'introduction d'une IA ne suffit pas, à elle seule, à caractériser un projet important : les juges regardent ses effets réels sur l'organisation du travail.",
    verifiee: true,
  },
  {
    juridiction: "Cass. soc.",
    date: "21 mai 2025",
    reference: "n° 22-19.925",
    intitule: "Vidéoprotection : le RGPD s'applique pleinement",
    regle: "L'exploitation d'images permettant d'identifier un salarié constitue un traitement de données personnelles soumis au RGPD. Un dispositif de surveillance peut servir de preuve à condition que les salariés aient été correctement informés de son existence, de ses finalités et de leurs droits. Toute IA qui analyse ou exploite des données relatives aux salariés engage simultanément le RGPD et le droit du travail.",
    verifiee: true,
  },
  {
    juridiction: "CA Lyon",
    date: "13 mai 2025",
    reference: "n° 23/04589",
    intitule: "IA comptable validée : l'humain conserve la décision",
    regle: "La cour valide un logiciel de comptabilité fondé sur l'IA : la solution automatise une grande partie du traitement, mais l'utilisateur conserve la maîtrise des choix et valide lui-même les opérations. L'automatisation est admise lorsque les responsabilités restent clairement identifiées ; plus une IA décide à la place de l'utilisateur, plus les exigences de documentation, de supervision et de gouvernance deviennent essentielles.",
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

const steps = [
  {
    n: "01",
    title: "Cartographier — tout ce que vous utilisez vraiment",
    text: "Systèmes internes, API tierces, modèles intégrés. Sans inventaire, vous ne savez pas ce que vous exposez.",
    pill: "Priorité immédiate",
  },
  {
    n: "02",
    title: "Qualifier — interdits, haut risque, transparence",
    text: "La qualification conditionne tout le régime. C'est la décision la plus structurante — et la plus souvent mal faite en interne.",
  },
  {
    n: "03",
    title: "Documenter — construire la preuve en amont",
    text: "Gouvernance des données, supervision humaine, traçabilité des décisions. Les durées de conservation dépendent du système et du rôle tenu.",
  },
  {
    n: "04",
    title: "Gouverner — chartes, politiques, formation",
    text: "Comité IA, référent conformité, articulation DPO, DUERP, information des salariés.",
  },
  {
    n: "05",
    title: "Défendre — contrôles, incidents, contentieux",
    text: "La documentation de conformité est votre première ligne de défense. Nous la construisons pour qu'elle tienne.",
    pill: "Notre terrain naturel",
  },
];

function B({ children }: { children: ReactNode }) {
  return <strong style={{ fontStyle: "normal", fontWeight: 600, color: LIGHT.text }}>{children}</strong>;
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
        extraitLabel: "Exemple pédagogique — entreprise de services, une cinquantaine de salariés",
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
        extraitLabel: "Exemple pédagogique — fintech de crédit",
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
        extraitLabel: "Exemple pédagogique — SaaS médical",
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
        extraitLabel: "Exemple pédagogique — chatbot d'assureur",
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
        extraitLabel: "Exemple pédagogique — ETI industrielle",
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
        extraitLabel: "Exemple pédagogique — cabinet de conseil",
        extrait: (
          <>
            Tout déploiement d&apos;un nouveau système IA est soumis à validation du{" "}
            <B>Comité IA</B> (DG + DPO + DSI) avant mise en production. Délai de traitement :{" "}
            <B>15 jours ouvrés</B>. Les systèmes à haut risque requièrent en outre une évaluation de
            conformité externe et une information préalable du <B>CSE</B> si impact sur les
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
        extraitLabel: "Exemple pédagogique — clause type pour un contrat d'API",
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
        extraitLabel: "Exemple pédagogique — CGV d'un éditeur SaaS",
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
        extraitLabel: "Exemple pédagogique — outil RH de présélection",
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
        extraitLabel: "Exemple pédagogique — dossier de contrôle CNIL",
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
          // La barre de navigation du site est fixe (`.laz-nav`, 54px, opaque,
          // z-index 100). Sans décalage, la pastille du héro passe dessous. On
          // compense la hauteur du bandeau, comme la page cybersécurité.
          paddingTop: 54,
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
          .iaact-hero-text { position: relative; z-index: 1; padding: 40px 24px 44px; min-height: 360px; }
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
              Le cabinet accompagne les PME et ETI qui utilisent, intègrent ou
              développent des systèmes d&apos;intelligence artificielle. Nous
              produisons une qualification, une documentation et, le jour du
              contrôle, une défense.
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

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                style={{
                  background: BLUE,
                  color: DARK.text,
                  padding: "0 18px",
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 12,
                  letterSpacing: ".04em",
                }}
              >
                Faire qualifier un système →
              </Link>
              <Link
                href="#ce-que-les-juges"
                style={{
                  background: "rgba(8,10,20,0.35)",
                  color: DARK.text,
                  border: `1px solid ${DARK.borderBlue}`,
                  padding: "0 18px",
                  minHeight: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 12,
                  letterSpacing: ".04em",
                }}
              >
                Ce que les juges exigent déjà
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EN UN MOT — bandeau de cadrage */}
      <section style={{ background: DARK.panel, color: DARK.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>En un mot</Eyebrow>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "#fff", margin: 0, maxWidth: 720 }}>
            Le régime a été réécrit à près de trente pour cent en juillet 2026.
            Certaines dates ont reculé, d&apos;autres non, et deux interdictions
            sont apparues. Ce qui vous concerne dépend désormais autant de la date
            de mise sur le marché de votre système que de sa nature.
          </p>
        </div>
      </section>

      {/* 3. LA DÉMONSTRATION — récit en trois temps. Le tableau A/B ne rendait
          pas la chronologie et introduisait du vocabulaire réglementaire ;
          remplacé par trois blocs de même largeur, le 3e marquant la bascule.
          Aucun numéro d'article ni terme d'annexe ici : ils restent dans le
          calendrier, qui est leur place. */}
      <section style={{ background: LIGHT.panel, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>La démonstration</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Le même outil, deux régimes différents</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 720 }}>
            Rien n&apos;a changé dans la loi. Tout a changé dans le régime applicable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP, alignItems: "stretch" }}>
            <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 10, padding: CARD_PAD }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".08em", color: LIGHT.faint }}>2025</span>
              <p style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text, margin: "8px 0 0", lineHeight: 1.45 }}>
                Une entreprise déploie un outil de tri de candidatures.
              </p>
              <p style={{ fontSize: 13, color: LIGHT.muted, margin: "6px 0 0", lineHeight: 1.6 }}>
                Elle bénéficie aujourd&apos;hui d&apos;un régime allégé : la
                documentation complète et l&apos;évaluation de conformité ne lui
                sont pas encore exigées.
              </p>
            </div>
            <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 10, padding: CARD_PAD }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".08em", color: LIGHT.faint }}>2027</span>
              <p style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text, margin: "8px 0 0", lineHeight: 1.45 }}>
                La même entreprise modifie le paramétrage de l&apos;outil.
              </p>
              <p style={{ fontSize: 13, color: LIGHT.muted, margin: "6px 0 0", lineHeight: 1.6 }}>
                Le régime allégé tombe. Documentation, supervision, évaluation :
                tout devient exigible.
              </p>
            </div>
            {/* Temps 3 — la bascule, visuellement distinct des deux premiers. */}
            <div style={{ background: "#FBF7E8", border: "1px solid #E7D4A6", borderLeft: "3px solid #8A5A00", borderRadius: 10, padding: CARD_PAD }}>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".08em", color: "#8A5A00" }}>La question</span>
              <p style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text, margin: "8px 0 0", lineHeight: 1.5 }}>
                Ce qui a changé n&apos;est pas la loi. C&apos;est une décision
                interne que personne n&apos;a qualifiée.
              </p>
            </div>
          </div>

          <div style={{ background: DARK.bg, borderRadius: 10, padding: 14, marginTop: 12 }}>
            <p style={{ fontSize: 13, color: "#fff", margin: 0, lineHeight: 1.6 }}>
              Le bénéfice du délai dépend de choix quotidiens qu&apos;une
              entreprise fait sans savoir qu&apos;ils comptent. Ces choix ne se
              détectent pas dans un inventaire : ils se qualifient.
            </p>
          </div>
          <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: LIGHT.faint, margin: "11px 0 0", letterSpacing: ".04em" }}>
            SPÉCIMEN · AUCUNE DONNÉE RÉELLE
          </p>
        </div>
      </section>

      {/* 4. OÙ EN EST LE DROIT — le calendrier (section autonome) */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Où en est le droit</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
            Le calendrier, au 1<sup>er</sup> septembre 2026
          </h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 760 }}>
            Règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744 du
            8 juillet 2026, en vigueur depuis le 27 juillet.
          </p>

          <div style={{ border: `0.5px solid ${LIGHT.border}`, borderRadius: 10, overflow: "hidden" }}>
            {[
              { date: "Fév. 2025", statut: "EN VIGUEUR", ton: "vigueur", titre: "Pratiques interdites · maîtrise de l'IA", corps: "L'obligation de maîtrise de l'IA a été réécrite en juillet 2026 : elle passe d'une garantie à un soutien au développement de cette littératie. Sanctionnable depuis l'été 2026." },
              { date: "Août 2025", statut: "EN VIGUEUR", ton: "vigueur", titre: "Modèles d'IA à usage général", corps: "Ces obligations pèsent sur les fournisseurs des modèles, non sur l'entreprise qui les utilise." },
              { date: "Août 2026", statut: "EN VIGUEUR", ton: "vigueur", titre: "Transparence · gouvernance · sanctions", corps: "Application générale du règlement hors haut risque. Pouvoirs de contrôle et de sanction actifs." },
              { date: "Déc. 2026", statut: "PROCHAINE", ton: "alerte", titre: "Contenus synthétiques · deux interdictions nouvelles", corps: "Marquage des contenus générés et divulgation des hypertrucages pour les systèmes mis sur le marché avant août 2026. Interdiction des contenus intimes non consentis et des contenus pédocriminels générés par IA." },
              { date: "Déc. 2027", statut: "REPORTÉ · +17 MOIS", ton: "reporte", titre: "Haut risque — annexe III", corps: "Recrutement, gestion des travailleurs, éducation, scoring de crédit, tarification de l'assurance, accès aux services essentiels." },
              // TODO (à traiter AVANT publication) : vérifier dans le texte
              // CONSOLIDÉ du règlement (UE) 2026/1744 la formulation exacte
              // « ceux relevant du règlement Machines sortent du champ de
              // l'AI Act » — reformuler si le texte consolidé ne la porte pas.
              { date: "Août 2028", statut: "REPORTÉ · +12 MOIS", ton: "reporte", titre: "Haut risque — annexe I", corps: "Systèmes intégrés à des produits réglementés. Ceux relevant du règlement Machines sortent du champ de l'AI Act." },
            ].map((m, idx) => {
              const badge =
                m.ton === "vigueur"
                  ? { color: "#0F5545", bg: "#E4F2ED" }
                  : m.ton === "alerte"
                    ? { color: "#8A5A00", bg: "#F5E6C8" }
                    : { color: "#5F5E5A", bg: "#EAEAE7" };
              return (
                <div
                  key={m.date}
                  style={{
                    padding: "13px 14px",
                    borderTop: idx > 0 ? `0.5px solid ${LIGHT.border}` : "none",
                    background: m.ton === "alerte" ? "#FBF7E8" : LIGHT.panel,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.muted }}>{m.date}</span>
                    <span
                      style={{
                        fontFamily: "var(--ff-mono)",
                        fontSize: 9,
                        letterSpacing: ".04em",
                        color: badge.color,
                        background: badge.bg,
                        padding: "2px 7px",
                        borderRadius: 3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.statut}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: LIGHT.text, fontWeight: 600, margin: "6px 0 0" }}>{m.titre}</p>
                  <p style={{ fontSize: 12.5, color: LIGHT.muted, margin: "4px 0 0", lineHeight: 1.55 }}>{m.corps}</p>
                </div>
              );
            })}
          </div>

          {/* Bandeau à la suite du calendrier */}
          <div style={{ background: DARK.bg, borderRadius: 10, padding: 16, marginTop: 12 }}>
            <p style={{ fontSize: 14, color: "#fff", fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
              Le calendrier ne suffit pas à déterminer vos obligations.
            </p>
            {/* TODO (à traiter AVANT publication) : identifier la RÉFÉRENCE
                EXACTE (article / considérant du règlement 2026/1744) des
                allègements pour petites entreprises et entreprises à faible
                capitalisation — préciser ou reformuler selon le texte trouvé. */}
            <p style={{ fontSize: 13, color: DARK.muted, margin: "7px 0 0", lineHeight: 1.6 }}>
              Il faut qualifier le système, établir le rôle de l&apos;entreprise,
              et vérifier sa date de mise sur le marché. Les allègements prévus
              pour les petites entreprises et les entreprises à faible
              capitalisation entrent aussi en compte.
            </p>
          </div>
          <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: LIGHT.faint, margin: "12px 0 0", letterSpacing: ".04em" }}>
            À JOUR AU 1ᵉʳ SEPTEMBRE 2026 · RÉVISION TRIMESTRIELLE
          </p>
        </div>
      </section>

      {/* 5. SUIS-JE CONCERNÉ — cinq usages */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>{fr("Suis-je concerné ?")}</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Cinq usages qui appellent une qualification</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 720 }}>
            Un seul de ces usages suffit à justifier d&apos;identifier votre rôle
            et les documents à conserver. Entrer dans le champ du règlement
            n&apos;emporte pas les obligations les plus lourdes.
          </p>
          <div style={{ border: `0.5px solid ${LIGHT.border}`, borderRadius: 8, overflow: "hidden" }}>
            {[
              { usage: "IA générative utilisée par vos salariés", suite: "transparence et maîtrise de l'IA, applicables aujourd'hui" },
              { usage: "Outils RH ou de recrutement automatisés", suite: "relève de l'annexe III, la qualification la plus lourde" },
              { usage: "Scoring, profilage ou aide à la décision", suite: "souvent annexe III, et croisement avec le RGPD" },
              { usage: "IA intégrée à un produit ou un service", suite: "annexe I si le produit relève d'une réglementation à marquage" },
              { usage: "Fournisseur ou API d'IA externe", suite: "la répartition des rôles se joue au contrat" },
            ].map((u, i) => (
              <div
                key={u.usage}
                style={{
                  padding: "12px 14px",
                  borderTop: i > 0 ? `0.5px solid ${LIGHT.border}` : "none",
                }}
              >
                <div style={{ fontSize: 14, color: LIGHT.text, lineHeight: 1.4 }}>{u.usage}</div>
                <div style={{ fontSize: 12.5, color: LIGHT.muted, lineHeight: 1.5, marginTop: 2 }}>{u.suite}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NOS INTERVENTIONS — trois niveaux */}
      <section style={{ background: LIGHT.panel, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Nos interventions</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 14 }}>Trois niveaux d&apos;accompagnement AI Act</h2>
          <div className="flex flex-col" style={{ gap: GRID_GAP }}>
            {[
              {
                num: "01",
                titre: "Diagnostic et audit AI Act",
                phrase: "« Nous utilisons plusieurs IA sans savoir où nous en sommes. »",
                corps: "Inventaire des systèmes officiels et des usages informels, qualification juridique, rôle de l'entreprise, feuille de route.",
                accent: true,
              },
              {
                num: "02",
                titre: "Gouvernance IA : registre, charte et procédures",
                phrase: "« Nous devons poser des règles dans l'entreprise. »",
                corps: "Registre des systèmes d'IA, charte IA, outils autorisés et données interdites, validation humaine, gestion des incidents, formation.",
                accent: false,
              },
              {
                num: "03",
                titre: "Conformité d'un système sensible ou à haut risque",
                phrase: "« Notre produit ou notre usage peut relever de l'annexe III. »",
                corps: "Analyse complète, documentation, supervision humaine, contrats fournisseurs, préparation au contrôle.",
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
              </article>
            ))}
          </div>
          <div style={{ background: DARK.bg, borderRadius: 10, padding: 14, marginTop: 14 }}>
            <p style={{ fontSize: 13, color: DARK.muted, margin: 0, lineHeight: 1.6 }}>
              Dix-sept mois de délai ne sont pas un répit : c&apos;est le temps de
              faire l&apos;inventaire et la qualification qu&apos;aucune entreprise
              n&apos;a encore faits.
            </p>
          </div>
        </div>
      </section>

      {/* 7. NOTRE MÉTHODE — cinq étapes */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Notre méthode</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Cinq étapes — de l&apos;audit jusqu&apos;au contentieux</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16 }}>
            Une démarche structurée, proche du RGPD. Les enjeux techniques sont plus lourds.
          </p>

          <div className="flex flex-col">
            {steps.map((s, idx) => (
              <article
                key={s.n}
                style={{
                  background: "transparent",
                  padding: "10px 0",
                  borderBottom: idx < steps.length - 1 ? "1px solid rgba(10,10,20,0.06)" : "none",
                }}
              >
                <div className="mb-2 flex items-center gap-10">
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "1px solid rgba(var(--famille-rgb),0.35)",
                      color: ACCENT,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontFamily: "monospace",
                    }}
                  >
                    {s.n}
                  </span>
                  {s.pill ? (
                    <span style={{ fontSize: 10, color: ACCENT, border: "1px solid rgba(var(--famille-rgb),0.35)", borderRadius: 999, padding: "2px 8px" }}>
                      {s.pill}
                    </span>
                  ) : null}
                </div>
                <h3 style={{ marginBottom: 6, ...TYPE.h3 }}>{s.title}</h3>
                <p style={{ ...TYPE.body, color: LIGHT.muted, margin: 0 }}>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CE QUE VOUS RECEVEZ — spécimens */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Notre intervention</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Ce que vous recevez concrètement</h2>
          <p style={{ ...TYPE.label, fontStyle: "italic", color: LIGHT.faint, margin: "0 0 16px" }}>
            Extraits inspirés de dossiers réels, anonymisés et adaptés à des fins pédagogiques.
          </p>

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
          <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: LIGHT.faint, margin: "11px 0 0", letterSpacing: ".04em" }}>
            SPÉCIMENS · AUCUNE DONNÉE RÉELLE
          </p>
        </div>
      </section>

      {/* 9. CE QUE LES JUGES EXIGENT DÉJÀ — jurisprudence. Chaque carte
          affiche juridiction, date et enseignement essentiel ; l'analyse est
          repliée derrière un <details> natif (aucun JS). */}
      <section id="ce-que-les-juges" style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD, scrollMarginTop: 80 }}>
        <div style={INNER}>
          <Eyebrow>Jurisprudence</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Ce que les juges exigent déjà</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 760 }}>
            Documentation, transparence, supervision humaine : ces exigences
            apparaissent dans les contentieux du travail et des données, bien
            avant les premières sanctions de l&apos;AI Act.
          </p>
          {/* Les décisions passent par le composant partagé, qui ne rend que
              celles dont verifiee vaut true. Les quatre entrées ont été validées
              par le cabinet (voir JURIS_IA en tête de fichier). */}
          <Jurisprudence decisions={JURIS_IA} />
        </div>
      </section>

      {/* 10. NOTRE APPROCHE — le binôme (parité stricte : même format, même
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

          <p style={{ ...TYPE.secondary, margin: "14px 0 0", maxWidth: 760 }}>
            Le cabinet ne délivre ni certification ni évaluation de conformité au
            sens du règlement, laquelle relève d&apos;organismes notifiés.
          </p>
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
            Faire qualifier un système →
          </Link>
        </div>
      </section>
    </main>
  );
}
