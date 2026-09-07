"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import EquipeDossier from "@/components/equipe-dossier";

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

const BLUE = "#1A47FF";

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
        color: BLUE,
        marginBottom: 4,
      }}
    >
      {children}
    </p>
  );
}

const heroTags = ["AI Act", "RGPD", "Responsabilité", "Preuve", "Gouvernance"];

const scenarios = [
  {
    color: "#E24B4A",
    tag: "RH",
    title: "Tri de CV automatisé",
    text: "Un outil qui filtre les candidatures relève de l'annexe III. Sans supervision humaine documentée, votre responsabilité est directement engagée — et le candidat peut contester.",
  },
  {
    color: "#BA7517",
    tag: "Produit",
    title: "IA intégrée à un dispositif physique",
    text: "Composant de sécurité dans une machine ou un dispositif médical soumis à marquage CE : les obligations haut risque s'appliquent. La plupart des équipes produit l'ignorent.",
  },
  {
    color: "#1A47FF",
    tag: "Commercial",
    title: "Scoring client automatisé",
    text: "Un algorithme qui évalue la solvabilité ou la fidélité client croise AI Act et RGPD. Sans documentation ni droit de contestation, le déploiement expose l'entreprise à un contentieux et à une remise en cause.",
  },
];

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
    text: "Gouvernance des données, supervision humaine, évaluation de conformité. Les durées de conservation dépendent du système et du rôle tenu.",
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
        type: "Registre IA",
        h3: "Inventaire des systèmes IA",
        extraitLabel: "Exemple pédagogique — ESN d'une cinquantaine de salariés",
        extrait: (
          <>
            Système n°3 — Outil de tri de CV <B>Workable AI</B>. Qualification :{" "}
            <B>haut risque</B>, <B>annexe III §4</B>. Données traitées : CV, lettres de motivation,
            profils LinkedIn. Supervision humaine : <B>décision finale RH obligatoire</B>, documentée
            dans Workable. <B>Évaluation de conformité</B> : à réaliser avant <B>août 2026</B>.
          </>
        ),
      },
      {
        icon: "ti-alert-triangle",
        type: "Matrice des risques",
        h3: "Risques prioritaires identifiés",
        extraitLabel: "Exemple pédagogique — fintech de crédit",
        extrait: (
          <>
            <B>Risque n°1 — Critique</B>. Algorithme de scoring crédit déployé sans évaluation de
            conformité <B>Art. 9</B>. Données utilisées : revenus, comportement bancaire, âge.
            Absence de <B>droit de contestation</B> documenté. Action requise avant toute nouvelle
            décision automatisée.
          </>
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
  const [openQuestions, setOpenQuestions] = useState(["q1"]);
  const activePanel = interventionTabs.find((t) => t.id === activeTab) ?? interventionTabs[0];

  return (
    <main style={{ background: LIGHT.bg, color: LIGHT.text, fontFamily: "var(--ff-body)" }}>
      {/* 1. HERO */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD, width: "100%" }}>
        <div style={INNER}>
          <p
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: DARK.muted,
              marginBottom: 14,
            }}
          >
            Avocat en droit de l&apos;intelligence artificielle · Paris
          </p>
          <h1 style={{ ...TYPE.h1, marginBottom: 12, color: DARK.text }}>
            Mise en conformité AI Act et gouvernance de l&apos;IA
          </h1>
          <p
            style={{
              fontSize: 19,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 620,
              marginBottom: 14,
            }}
          >
            Une IA mal documentée devient un risque de responsabilité.
          </p>
          <p style={{ ...TYPE.body, maxWidth: 640, color: DARK.muted, marginBottom: 16 }}>
            Le cabinet accompagne les PME et ETI qui utilisent, intègrent ou
            développent des systèmes d&apos;intelligence artificielle. Un logiciel
            de conformité produit une catégorie ; nous produisons une
            qualification, une documentation et, le jour du contrôle, une défense.
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

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              style={{
                background: BLUE,
                color: DARK.text,
                padding: "12px 18px",
                borderRadius: 4,
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: ".04em",
              }}
            >
              Structurer ma gouvernance IA →
            </Link>
            <Link
              href="/references"
              style={{
                background: "transparent",
                color: DARK.text,
                border: `1px solid ${DARK.borderBlue}`,
                padding: "12px 18px",
                borderRadius: 4,
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: ".04em",
              }}
            >
              Cas clients
            </Link>
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

      {/* 3. LA DÉMONSTRATION — le même outil, deux régimes (dispositif
          différenciant, à créer). Tableau sémantique ; en mobile chaque ligne
          s'empile (intitulé, A, B) sans défilement horizontal. */}
      <section style={{ background: LIGHT.panel, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <style>{`
            .demo-table { width: 100%; border-collapse: collapse; border: 0.5px solid ${LIGHT.border}; border-radius: 10px; overflow: hidden; }
            .demo-table thead th { text-align: left; background: ${LIGHT.panel2}; padding: 10px 12px; vertical-align: top; border-bottom: 0.5px solid ${LIGHT.border}; }
            .demo-table thead th span { display: block; font-weight: 400; font-size: 11px; color: ${LIGHT.faint}; margin-top: 2px; }
            .demo-table thead th:first-child { width: 30%; }
            .demo-table tbody th { text-align: left; font-weight: 600; font-size: 12px; color: ${LIGHT.text}; background: ${LIGHT.panel2}; padding: 9px 12px; vertical-align: top; }
            .demo-table td { padding: 9px 12px; font-size: 12px; color: ${LIGHT.text}; line-height: 1.45; vertical-align: top; border-top: 0.5px solid rgba(0,0,0,0.06); }
            .demo-eyebrow-a { font-family: var(--ff-mono); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; color: ${LIGHT.muted}; }
            .demo-a { background: #F3F9F7; color: #0F5545; }
            .demo-b { background: #FDF4F4; color: #8A2020; }
            @media (max-width: 767px) {
              .demo-table, .demo-table tbody, .demo-table tr, .demo-table td, .demo-table th { display: block; width: 100%; }
              .demo-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
              .demo-table tr { border-top: 0.5px solid ${LIGHT.border}; }
              .demo-table tr:first-child { border-top: none; }
              .demo-table tbody th { font-size: 13px; }
              .demo-table td { border-top: none; padding-top: 2px; }
              .demo-table td::before { content: attr(data-label); display: block; font-family: var(--ff-mono); font-size: 9px; letter-spacing: .06em; text-transform: uppercase; color: ${LIGHT.muted}; margin-bottom: 1px; }
            }
          `}</style>
          <Eyebrow>La démonstration</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Le même outil, deux régimes différents</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 720 }}>
            Deux entreprises déploient le même logiciel de tri de candidatures.
            Rien ne les distingue, sinon la date.
          </p>

          <table className="demo-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Entreprise A<span>Déployé en 2025</span></th>
                <th scope="col">Entreprise B<span>Déploiement en 2028</span></th>
              </tr>
            </thead>
            <tbody>
              {[
                { k: "Qualification", a: "Annexe III — haut risque", b: "Annexe III — haut risque", accent: false },
                { k: "Régime applicable", a: "Régime transitoire — art. 111", b: "Régime complet", accent: true },
                { k: "Documentation technique", a: "Sauf modification importante", b: "Exigée", accent: false },
                { k: "Évaluation de conformité", a: "Non, en l'état", b: "Oui, avant mise en service", accent: false },
                { k: "Consultation du CSE", a: "À examiner — droit du travail", b: "À examiner — droit du travail", accent: false },
              ].map((r) => (
                <tr key={r.k}>
                  <th scope="row">{r.k}</th>
                  <td data-label="Entreprise A" className={r.accent ? "demo-a" : undefined}>{r.a}</td>
                  <td data-label="Entreprise B" className={r.accent ? "demo-b" : undefined}>{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ background: DARK.bg, borderRadius: 10, padding: 14, marginTop: 12 }}>
            <p style={{ fontSize: 13, color: "#fff", margin: 0, lineHeight: 1.6 }}>
              Aucun questionnaire automatisé ne fait cette différence : elle ne
              dépend ni du cas d&apos;usage, ni du secteur, mais d&apos;une date et
              d&apos;un régime transitoire.
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
          <Eyebrow>Suis-je concerné ?</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>Cinq usages qui appellent une qualification</h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 720 }}>
            Un seul de ces usages suffit à justifier d&apos;identifier votre rôle
            et les documents à conserver. Entrer dans le champ du règlement
            n&apos;emporte pas les obligations les plus lourdes.
          </p>
          <div style={{ border: `0.5px solid ${LIGHT.border}`, borderRadius: 8, overflow: "hidden" }}>
            {[
              "IA générative utilisée par vos salariés",
              "Outils RH ou de recrutement automatisés",
              "Scoring, profilage ou aide à la décision",
              "IA intégrée à un produit ou un service",
              "Fournisseur ou API d'IA externe",
            ].map((usage, i) => (
              <div
                key={usage}
                style={{
                  padding: "12px 14px",
                  fontSize: 14,
                  color: LIGHT.text,
                  lineHeight: 1.45,
                  borderTop: i > 0 ? `0.5px solid ${LIGHT.border}` : "none",
                }}
              >
                {usage}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NOS INTERVENTIONS — trois niveaux */}
      <section style={{ background: LIGHT.panel, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Nos interventions</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 14 }}>Trois niveaux d&apos;intervention</h2>
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

      {/* 8. ÉTAPES */}
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
                      border: "1px solid rgba(26,71,255,0.35)",
                      color: BLUE,
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
                    <span style={{ fontSize: 10, color: BLUE, border: `1px solid ${BLUE}55`, borderRadius: 999, padding: "2px 8px" }}>
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

      {/* 7. AI ETHIC OFFICER */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>L&apos;équipe</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
            Gouvernance IA — une approche juridique et scientifique
          </h2>
          <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.7, marginBottom: 16, maxWidth: 760 }}>
            Alexandre Lazarègue qualifie juridiquement vos systèmes IA et construit
            la documentation qui tient devant les autorités. Nadia Abchiche-Mimouni
            évalue l&apos;architecture technique des systèmes, leurs biais et leurs
            impacts éthiques. Deux compétences complémentaires — du contrat à
            l&apos;algorithme.
          </p>

          <EquipeDossier
            eyebrow="Gouvernance IA"
            titre="Du contrat à l'algorithme"
            chapeau="Qualifier un système d'IA en droit suppose d'abord d'établir ce qu'il fait réellement. C'est pourquoi l'avocat et l'intervenante technique travaillent sur le même dossier."
            couleurs={{ panneau: LIGHT.panel2, carte: LIGHT.panel, bordure: LIGHT.border, texte: LIGHT.text, secondaire: LIGHT.muted, accent: BLUE }}
            membres={[
              { slug: "alexandre", role: "Qualification juridique & documentation de conformité", tags: ["AI Act", "RGPD", "Contentieux"] },
              { slug: "nadia", role: "Architecture des systèmes, biais et impacts", tags: ["Docteure en IA", "Éthique algorithmique", "Audit technique"] },
            ]}
          />

          <div style={{ marginTop: 16 }}>
            <div style={{ background: "#F8F8FB", borderRadius: 8, padding: CARD_PAD, display: "flex", flexWrap: "wrap", gap: GRID_GAP, alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ margin: 0, color: LIGHT.muted }}>
                Rendre l&apos;IA gouvernable dans votre entreprise — avant que l&apos;absence de règles ne devienne un risque.
              </p>
              <Link
                href="/contact"
                style={{
                  background: BLUE,
                  color: DARK.text,
                  padding: "10px 14px",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 12,
                }}
              >
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERVENTION INTERACTIVE */}
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
                    <p style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>
                      {card.extrait}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. JURISPRUDENCE */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP, marginBottom: 16 }}>
            <article style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: "3px solid #E14B4B", borderRadius: 8, padding: CARD_PAD, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: LIGHT.muted, textTransform: "uppercase", letterSpacing: ".06em" }}>JANV. 2026</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#E14B4B", border: "1px solid rgba(225,75,75,0.35)", borderRadius: 999, padding: "2px 8px" }}>TJ NANTERRE</span>
              </div>
              <h3 style={{ ...TYPE.h3, margin: "0 0 4px" }}>IA RH : déploiement suspendu faute de consultation du CSE</h3>
              <p style={{ fontSize: 11, color: LIGHT.muted, margin: "0 0 8px" }}>Réf. TJ Nanterre, 29 janv. 2026, n° 25/02856</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                Une entreprise déploie deux outils de gestion des compétences intégrant de l&apos;IA pour alimenter les entretiens annuels, le suivi des carrières et l&apos;affectation des salariés sur les missions. Le tribunal considère que ces outils modifient concrètement les conditions de travail et imposent une consultation préalable du CSE. Le déploiement est suspendu jusqu&apos;à l&apos;achèvement de cette procédure.
              </p>
              <p style={{ fontSize: 12, color: LIGHT.muted, fontStyle: "italic", margin: 0 }}>
                Une IA RH qui influence l&apos;évaluation, les compétences ou les parcours professionnels n&apos;est pas un simple outil informatique. Elle peut déclencher des obligations d&apos;information-consultation du CSE avant sa mise en œuvre.
              </p>
            </article>
            <article style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: "3px solid #F2A43A", borderRadius: 8, padding: CARD_PAD, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: LIGHT.muted, textTransform: "uppercase", letterSpacing: ".06em" }}>FÉV. 2026</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#F2A43A", border: "1px solid rgba(242,164,58,0.35)", borderRadius: 999, padding: "2px 8px" }}>TJ PARIS</span>
              </div>
              <h3 style={{ ...TYPE.h3, margin: "0 0 4px" }}>Copilot 365 : pas encore un « projet important »</h3>
              <p style={{ fontSize: 11, color: LIGHT.muted, margin: "0 0 8px" }}>Réf. TJ Paris, 10 févr. 2026, n° 25/57412</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                Une association expérimente Copilot 365 pendant quatre mois auprès de salariés volontaires. Le tribunal juge que cette phase pilote ne modifie pas suffisamment les conditions de travail pour justifier une expertise du CSE. L&apos;outil est facultatif, temporaire et son impact reste limité à ce stade.
              </p>
              <p style={{ fontSize: 12, color: LIGHT.muted, fontStyle: "italic", margin: 0 }}>
                L&apos;introduction d&apos;une IA ne suffit pas, à elle seule, à caractériser un projet important. Les juges regardent ses effets réels sur l&apos;organisation du travail, les missions confiées aux salariés et leur environnement professionnel.
              </p>
            </article>
            <article style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: "3px solid #1A47FF", borderRadius: 8, padding: CARD_PAD, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: LIGHT.muted, textTransform: "uppercase", letterSpacing: ".06em" }}>MAI 2025</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#1A47FF", border: "1px solid rgba(26,71,255,0.35)", borderRadius: 999, padding: "2px 8px" }}>COUR DE CASSATION</span>
              </div>
              <h3 style={{ ...TYPE.h3, margin: "0 0 4px" }}>Vidéoprotection : le RGPD s&apos;applique pleinement</h3>
              <p style={{ fontSize: 11, color: LIGHT.muted, margin: "0 0 8px" }}>Réf. Cass. soc., 21 mai 2025, n° 22-19.925</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                La Cour de cassation rappelle que l&apos;exploitation d&apos;images permettant d&apos;identifier un salarié constitue un traitement de données personnelles soumis au RGPD. Un dispositif de surveillance peut être utilisé comme preuve à condition que les salariés aient été correctement informés de son existence, de ses finalités et de leurs droits.
              </p>
              <p style={{ fontSize: 12, color: LIGHT.muted, fontStyle: "italic", margin: 0 }}>
                Toute IA qui analyse, surveille ou exploite des données relatives aux salariés engage simultanément le RGPD et le droit du travail.
              </p>
            </article>
            <article style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: "3px solid #29A06A", borderRadius: 8, padding: CARD_PAD, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: LIGHT.muted, textTransform: "uppercase", letterSpacing: ".06em" }}>MAI 2025</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#29A06A", border: "1px solid rgba(41,160,106,0.35)", borderRadius: 999, padding: "2px 8px" }}>CA LYON</span>
              </div>
              <h3 style={{ ...TYPE.h3, margin: "0 0 4px" }}>IA comptable validée : l&apos;humain conserve la décision</h3>
              <p style={{ fontSize: 11, color: LIGHT.muted, margin: "0 0 8px" }}>Réf. CA Lyon, 13 mai 2025, n° 23/04589</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                La cour valide un logiciel de comptabilité fondé sur l&apos;IA. La solution automatise une grande partie du traitement comptable, mais l&apos;utilisateur conserve la maîtrise des choix et valide lui-même les opérations. L&apos;assistance humaine se limite à des conseils ponctuels sans se substituer au client.
              </p>
              <p style={{ fontSize: 12, color: LIGHT.muted, fontStyle: "italic", margin: 0 }}>
                L&apos;automatisation est admise lorsque les responsabilités restent clairement identifiées. Plus une IA prend des décisions à la place de l&apos;utilisateur, plus les exigences de documentation, de supervision et de gouvernance deviennent essentielles.
              </p>
            </article>
          </div>
          <p style={{ fontSize: 14, fontWeight: 500, textTransform: "uppercase", color: LIGHT.text, lineHeight: 1.4, margin: "0 0 6px" }}>
            Les juges appliquent déjà une logique de gouvernance IA.
          </p>
          <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.7, margin: 0 }}>
            Documentation. Transparence. Supervision humaine. Traçabilité des décisions. Bien avant les premières sanctions de l&apos;AI Act, ces exigences apparaissent déjà dans les contentieux relatifs au travail, aux données personnelles et aux outils numériques.
          </p>
        </div>
      </section>

      {/* 8B. QUESTIONS FRÉQUENTES */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Questions fréquentes</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 16 }}>
            Ce que nos clients nous demandent avant de commencer
          </h2>

          <div style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 8, overflow: "hidden" }}>
            {[
              {
                id: "q1",
                q: "Mon entreprise est-elle vraiment concernée ?",
                badge: "En vigueur depuis 2024",
                a: "Oui — dès que vous utilisez un système d'IA dans l'UE, même acheté à un tiers. L'AI Act s'applique aux fournisseurs ET aux déployeurs. Un outil RH de tri de CV, un algorithme de scoring client, un chatbot, une API tierce : vous êtes déployeur au sens du règlement et vous avez des obligations directes.",
              },
              {
                id: "q2",
                q: "On utilise juste ChatGPT et Copilot — on est vraiment exposé ?",
                a: "Oui. Utiliser un outil IA tiers ne vous exonère pas de vos responsabilités. Le TJ Paris (fév. 2026, n° 25/57412) a jugé que même une expérimentation Copilot 365 limitée à des volontaires sur 4 mois pouvait déclencher des obligations sociales. Sans politique interne, chaque usage engage l'entreprise — sur les données personnelles des salariés, sur la loyauté des décisions automatisées, sur la traçabilité.",
              },
              {
                id: "q3",
                q: "Quelles sont les obligations concrètes pour un système à haut risque ?",
                badge: "Art. 6 & Annexes I-III RIA",
                a: "Pour tout système IA à haut risque — outil RH de sélection, scoring client, composant dans un dispositif médical — vous devez mettre en place : une gestion continue des risques (art. 9), une gouvernance des données d'entraînement (art. 10), une documentation technique complète (art. 11), une journalisation automatique (art. 12), une supervision humaine effective (art. 14), une évaluation de conformité avant mise sur le marché (art. 43), et un enregistrement dans la base européenne (art. 49). La documentation technique doit être conservée par le fournisseur du système (art. 18) ; les durées de conservation dépendent du système et du rôle tenu.",
              },
              {
                id: "q4",
                q: "L'IA engage-t-elle aussi le droit du travail ?",
                a: "Oui — et c'est souvent la surprise. Le TJ Nanterre (29 jan. 2026, n° 25/02856) a suspendu le déploiement de logiciels IA RH faute de consultation du CSEC au préalable. La Cour de cassation (21 mai 2025, 22-19.925) impose une double conformité pour tout système IA traitant des données de salariés : RGPD ET droit du travail cumulativement. Aucune information personnelle ne peut être collectée sans que le salarié en ait été préalablement informé (art. L.1222-4 C. trav.).",
              },
              {
                id: "q5",
                q: "Nos fournisseurs IA sont responsables — pas nous ?",
                a: "Non. Utiliser une API tierce ou un SaaS IA sans encadrement contractuel ne vous exonère pas. Vous restez déployeur au sens du règlement et responsable du déploiement. La CA Lyon (13 mai 2025, n° 23/04589) a rappelé que la responsabilité de l'utilisateur final doit être clairement documentée dans les CGV. Sans contrat encadrant votre fournisseur IA, le risque est entièrement porté par vous.",
              },
              {
                id: "q6",
                q: "Que se passe-t-il en cas de contrôle ?",
                a: "Les autorités nationales peuvent auditer à tout moment. En cas de contrôle, l'entreprise doit pouvoir démontrer comment son système a été conçu, supervisé et documenté. Un manquement à la documentation ou à la supervision humaine devient un indice de défaut — utilisable dans tout contentieux en responsabilité. Les incidents graves doivent être notifiés dans les 72 h (croisement AI Act / RGPD art. 33).",
              },
              {
                id: "q7",
                q: "À partir de quand mes obligations s'appliquent-elles ?",
                badge: "3 étapes clés",
                a: (
                  <div className="flex flex-col gap-2">
                    <div style={{ borderLeft: "2px solid #1a7a50", padding: "8px 12px", background: "rgba(15,85,69,0.08)", fontSize: 12 }}>
                      → Fév. 2025 : pratiques interdites et maîtrise de l&apos;IA — en vigueur (art. 5)
                    </div>
                    <div style={{ borderLeft: "2px solid #1a7a50", padding: "8px 12px", background: "rgba(15,85,69,0.08)", fontSize: 12 }}>
                      → Août 2026 : transparence, gouvernance et sanctions — en vigueur
                    </div>
                    <div style={{ borderLeft: "2px solid #8A5A00", padding: "8px 12px", background: "rgba(138,90,0,0.08)", fontSize: 12 }}>
                      → Déc. 2027 et août 2028 : haut risque (annexes III et I) — reporté par le Digital Omnibus
                    </div>
                  </div>
                ),
              },
            ].map((item, idx, arr) => {
              const isOpen = openQuestions.includes(item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: idx < arr.length - 1 ? `1px solid ${LIGHT.border}` : "none",
                    padding: "0 16px",
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-ia-reponse-${item.id}`}
                    onClick={() =>
                      setOpenQuestions((prev) =>
                        prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                      )
                    }
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      padding: "10px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: LIGHT.text, marginBottom: item.badge ? 6 : 0 }}>{item.q}</div>
                      {item.badge ? (
                        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: BLUE, border: "1px solid rgba(26,71,255,0.25)", borderRadius: 999, padding: "2px 8px" }}>
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
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

                  {/* La réponse reste dans le DOM une fois repliée : rendue
                      conditionnellement, elle serait absente du HTML servi —
                      donc invisible pour les moteurs, alors même qu'elle est
                      déclarée dans le balisage FAQPage. */}
                  <div
                    id={`faq-ia-reponse-${item.id}`}
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

      {/* 10. CTA */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD, width: "100%" }}>
        <div style={{ ...INNER, textAlign: "center" }}>
          <h2 style={{ ...TYPE.h2, marginBottom: 6, color: DARK.text }}>
            Structurez votre gouvernance IA avant que le problème arrive.
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
            Structurer ma gouvernance IA →
          </Link>
        </div>
      </section>
    </main>
  );
}
