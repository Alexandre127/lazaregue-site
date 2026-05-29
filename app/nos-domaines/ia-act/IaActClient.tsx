"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";

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
  h1: { fontSize: 36, fontWeight: 600, lineHeight: 1.2 } as const,
  h2: { fontSize: 24, fontWeight: 500, lineHeight: 1.2 } as const,
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

const TEST_ITEMS = [
  "Vous utilisez ChatGPT, Copilot ou un outil d'IA générative dans votre activité",
  "Vous utilisez un CRM, un outil RH ou marketing avec des fonctions automatisées ou prédictives",
  "Vous triez ou évaluez des candidatures avec un outil numérique",
  "Vous utilisez une API OpenAI, Anthropic, Mistral ou équivalent",
  "Vous développez un produit ou service intégrant de l'IA",
  "Vous utilisez l'IA pour évaluer, noter ou scorer des personnes",
  "Vous exploitez un chatbot ou un agent conversationnel",
] as const;

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
    text: "Un algorithme qui évalue la solvabilité ou la fidélité client croise AI Act et RGPD. Sans documentation ni droit de contestation, le déploiement est illégal.",
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
    text: "Gouvernance des données, supervision humaine, évaluation de conformité. Dix ans de conservation obligatoire.",
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
        extraitLabel: "Extrait — TechRH Solutions (ESN, 45 sal.)",
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
        extraitLabel: "Extrait — Fintech Crédit Sud (fictif)",
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
        extraitLabel: "Extrait — MedAssist Pro (SaaS médical fictif)",
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
        extraitLabel: "Extrait — ChatBot Assur (assureur fictif)",
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
        extraitLabel: "Extrait — Groupe Lavalette (ETI industrie fictive)",
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
        extraitLabel: "Extrait — Cabinet Novalis (fictif)",
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
        extraitLabel: "Extrait — contrat API OpenAI (clause fictive)",
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
        extraitLabel: "Extrait — CGV LogiCompta IA (SaaS fictif)",
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
        extraitLabel: "Extrait — AlgoRH Pro (RH fictif)",
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
        extraitLabel: "Extrait — dossier contrôle CNIL (fictif)",
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
  const [checkedTests, setCheckedTests] = useState<number[]>([]);
  const activePanel = interventionTabs.find((t) => t.id === activeTab) ?? interventionTabs[0];

  const toggleTest = (index: number) => {
    setCheckedTests((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main style={{ background: LIGHT.bg, color: LIGHT.text, fontFamily: "var(--ff-body)" }}>
      {/* 1. HERO */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD, width: "100%" }}>
        <div style={INNER}>
          <p style={{ fontSize: 12, color: DARK.muted, marginBottom: 10 }}>
            Nos domaines · <span style={{ color: BLUE }}>IA & AI Act</span>
          </p>
          <h1 style={{ ...TYPE.h1, marginBottom: 8, color: DARK.text }}>
            UNE IA MAL DOCUMENTÉE DEVIENT UN RISQUE DE RESPONSABILITÉ.
          </h1>
          <h2 style={{ fontSize: 20, fontWeight: 400, color: "#4d7aff", lineHeight: 1.4, maxWidth: 760, marginBottom: 12 }}>
            Vous utilisez l&apos;IA dans vos outils — ou vous en construisez. Dans
            les deux cas, l&apos;AI Act vous concerne.
          </h2>
          <p style={{ ...TYPE.body, maxWidth: 760, color: DARK.muted, marginBottom: 16 }}>
            ChatGPT, Copilot, outils RH, API tierces, scoring client, IA intégrée à
            un produit SaaS — l&apos;AI Act est en vigueur. Les premières obligations
            s&apos;appliquent déjà. Savez-vous ce que vous devrez démontrer à un juge,
            à la CNIL ou à votre client si quelque chose tourne mal ?
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

      {/* 2. FAITES LE TEST */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 8,
              padding: CARD_PAD,
            }}
          >
            <Eyebrow>Suis-je concerné ?</Eyebrow>
            <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
              Faites le test
            </h2>
            <p style={{ ...TYPE.secondary, marginBottom: 16 }}>
              Votre entreprise est probablement concernée si vous cochez au moins
              une case.
            </p>

            <div className="flex flex-col gap-1">
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
                      border: "none",
                      background: checked ? "rgba(26,71,255,0.07)" : "transparent",
                      borderRadius: 8,
                      padding: "10px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 220ms ease",
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
                        transition: "background 220ms ease, transform 180ms ease",
                        transform: checked ? "scale(1.08)" : "scale(1)",
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
                        transition: "color 220ms ease",
                      }}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 16,
                padding: checkedTests.length > 0 ? "14px 16px" : 0,
                borderRadius: 8,
                background: checkedTests.length > 0 ? "#FCEBEB" : "transparent",
                border: checkedTests.length > 0 ? "1px solid #F09595" : "none",
                transition: "background 250ms ease, border-color 250ms ease, padding 250ms ease",
              }}
            >
              <p
                style={{
                  fontWeight: 500,
                  color: checkedTests.length > 0 ? "#A32D2D" : LIGHT.text,
                  lineHeight: 1.6,
                  margin: 0,
                  fontSize: checkedTests.length > 0 ? 14 : 16,
                  transition: "color 250ms ease",
                }}
              >
                {checkedTests.length > 0
                  ? `${checkedTests.length} case${checkedTests.length > 1 ? "s" : ""} cochée${checkedTests.length > 1 ? "s" : ""} — vous êtes concerné par l'AI Act.`
                  : "Si vous avez coché une seule case, vous êtes déjà concerné par l'AI Act."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. L'AI ACT EN CLAIR */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>L&apos;AI Act en clair</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
            Ce que la loi impose — selon ce que vous faites
          </h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16, maxWidth: 760 }}>
            L&apos;AI Act (Règlement UE 2024/1689) est le premier cadre légal
            mondial sur l&apos;intelligence artificielle. Il s&apos;applique à toute
            entreprise qui développe ou utilise un système d&apos;IA dans l&apos;Union
            européenne — même un outil acheté à un tiers. Il classe les systèmes
            selon leur niveau de risque et impose des obligations différentes à
            chaque niveau.
          </p>

          {/* GRILLE 3 COLONNES */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
            {[
              {
                border: "#F09595",
                badge: "IA interdite",
                badgeBg: "#FCEBEB",
                badgeColor: "#A32D2D",
                title: "Interdiction absolue",
                desc: "Certains usages sont illégaux sans aucune dérogation possible.",
                ex: [
                  "Manipulation cognitive sous le seuil de conscience",
                  "Notation sociale des personnes",
                  "Reconnaissance faciale en temps réel dans l'espace public",
                ],
              },
              {
                border: "#EF9F27",
                badge: "Haut risque",
                badgeBg: "#FAEEDA",
                badgeColor: "#633806",
                title: "Obligations lourdes",
                desc: "Documentation, supervision humaine, évaluation de conformité. 10 ans de conservation.",
                ex: [
                  "Tri de CV et recrutement automatisé",
                  "Scoring de crédit ou d'assurance",
                  "IA dans dispositifs médicaux ou infrastructures",
                ],
              },
              {
                border: LIGHT.border,
                badge: "Risque limité",
                badgeBg: "#E6F1FB",
                badgeColor: "#185FA5",
                title: "Obligations de transparence",
                desc: "Informer que l'utilisateur interagit avec une IA. Signaler les contenus générés.",
                ex: [
                  "Chatbots et agents conversationnels",
                  "IA générative — texte, image, code",
                  "Systèmes de recommandation",
                ],
              },
            ].map((c) => (
              <article
                key={c.badge}
                style={{
                  background: LIGHT.panel,
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: 16,
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
                <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 12px" }}>
                  {c.desc}
                </p>
                <div className="flex flex-col gap-2">
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

          {/* SÉPARATEUR */}
          <div aria-hidden="true" style={{ height: "0.5px", background: LIGHT.border, margin: "32px 0" }} />

          {/* TIMELINE */}
          <Eyebrow>Calendrier</Eyebrow>
          <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, marginBottom: 16 }}>
            Une application progressive — certaines obligations sont déjà en vigueur
          </p>

          <div className="flex flex-col">
            {[
              {
                date: "Fév. 2025",
                dateColor: "#A32D2D",
                point: "#E24B4A",
                badge: "En vigueur",
                badgeBg: "#FCEBEB",
                badgeColor: "#A32D2D",
                title: "IA interdites",
                desc: "Manipulation cognitive, notation sociale, reconnaissance faciale en temps réel dans l'espace public.",
              },
              {
                date: "Août 2025",
                dateColor: "#633806",
                point: "#BA7517",
                badge: "En vigueur",
                badgeBg: "#FAEEDA",
                badgeColor: "#633806",
                title: "Modèles d'IA à usage général",
                desc: "ChatGPT, Copilot, Mistral et équivalents — documentation technique, transparence, conformité droits d'auteur.",
              },
              {
                date: "Août 2026",
                dateColor: "#185FA5",
                point: "#378ADD",
                badge: "À venir",
                badgeBg: "#E6F1FB",
                badgeColor: "#185FA5",
                title: "IA à haut risque",
                desc: "Recrutement automatisé, scoring de crédit, dispositifs médicaux, infrastructures critiques — obligations lourdes de documentation et supervision humaine.",
              },
              {
                date: "2027",
                dateColor: "#085041",
                point: "#1D9E75",
                badge: "À venir",
                badgeBg: "#E1F5EE",
                badgeColor: "#085041",
                title: "Application complète",
                desc: "Tous les systèmes IA soumis au règlement. Articulation avec le Data Act et le DMA.",
              },
            ].map((s, idx, arr) => (
              <div
                key={s.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 24px 1fr",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: s.dateColor, textAlign: "right", paddingTop: 1 }}>
                  {s.date}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span
                    aria-hidden="true"
                    style={{ width: 12, height: 12, borderRadius: "50%", background: s.point, flexShrink: 0, marginTop: 3 }}
                  />
                  {idx < arr.length - 1 ? (
                    <span aria-hidden="true" style={{ flex: 1, width: 2, background: LIGHT.border, marginTop: 4 }} />
                  ) : null}
                </div>
                <div style={{ paddingBottom: idx < arr.length - 1 ? 16 : 0 }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      background: s.badgeBg,
                      color: s.badgeColor,
                      borderRadius: 999,
                      padding: "2px 8px",
                      marginBottom: 6,
                    }}
                  >
                    {s.badge}
                  </span>
                  <h3 style={{ ...TYPE.h3, margin: "0 0 4px" }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SCÉNARIOS */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Ce que vos équipes font peut-être déjà</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
            Cinq situations à risque — concrètes
          </h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16 }}>
            L&apos;IA est déjà dans votre entreprise. La question est : savez-vous ce qu&apos;elle vous expose ?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP }}>
            {scenarios.map((s) => (
              <article key={s.title} style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: `3px solid ${s.color}`, borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 10, color: s.color, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.tag}</span>
                <h3 style={{ margin: "6px 0 6px", ...TYPE.h3 }}>{s.title}</h3>
                <p style={{ ...TYPE.body, color: LIGHT.muted, lineHeight: 1.7 }}>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ANGLE PREUVE — 8 domaines */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Un sujet transversal</Eyebrow>
          <h2 style={{ ...TYPE.h2, marginBottom: 6 }}>
            L&apos;IA est un sujet de direction générale — la preuve par les juges
          </h2>
          <p style={{ ...TYPE.secondary, marginBottom: 16 }}>
            Elle engage simultanément huit domaines du droit — souvent sans que l&apos;entreprise l&apos;ait anticipé.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: GRID_GAP, marginBottom: 16 }}>
            {[
              ["ti-users", "Droit du travail", "Information-consultation CSE, loyauté des évaluations algorithmiques, transparence des objectifs automatisés"],
              ["ti-shield-lock", "RGPD & données", "Licéité, analyse d'impact, minimisation, droits des personnes — cumulatifs avec l'AI Act"],
              ["ti-file-invoice", "Responsabilité produit", "Défaut de documentation ou de supervision humaine = indice de défaut en contentieux"],
              ["ti-world", "Fournisseurs & cloud", "APIs tierces, SaaS IA, contrats cloud : chaque prestataire sans encadrement est un risque non couvert"],
              ["ti-eye", "Transparence", "Contenus générés, chatbots, deepfakes : obligation d'information envers les utilisateurs — en vigueur"],
              ["ti-scale", "Devoir de conseil", "Les prestataires intégrant l'IA restent tenus d'informer sur les limites, risques et maturité des outils"],
              ["ti-building-bank", "Régulation sectorielle", "Finance, immobilier, santé, plateformes : des obligations spécifiques s'ajoutent au cadre général"],
              ["ti-certificate", "Conformité CNIL", "Référentiels, analyses d'impact, codes de conduite : la doctrine CNIL s'applique aux systèmes IA"],
            ].map(([icon, title, text]) => (
              <div key={title} style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 6, padding: CARD_PAD }}>
                <i className={`ti ${icon}`} style={{ fontSize: 18, color: "#1A47FF", display: "block", marginBottom: 8 }} aria-hidden="true" />
                <div style={{ fontSize: 12, fontWeight: 600, color: LIGHT.text, marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 11, color: LIGHT.muted, lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}
          </div>
          <div style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderLeft: "3px solid #1A47FF", borderRadius: "0 4px 4px 0", padding: CARD_PAD, display: "flex", gap: GRID_GAP, alignItems: "center" }}>
            <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6 }}>
              <strong style={{ color: LIGHT.text, fontWeight: 500 }}>Notre approche : </strong>
              nous ne traitons pas l&apos;IA comme un sujet réglementaire isolé. Nous l&apos;articulons avec l&apos;ensemble des obligations de l&apos;entreprise — pour construire une gouvernance qui tient sur tous les fronts.
            </div>
          </div>
        </div>
      </section>

      {/* PREUVE SOCIALE */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div
            style={{
              background: LIGHT.panel2,
              border: `1px solid ${LIGHT.border}`,
              borderRadius: 8,
              padding: CARD_PAD,
            }}
          >
            <p style={{ fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, marginBottom: 12 }}>
              Nous accompagnons des entreprises qui utilisent l&apos;IA dans leurs outils RH, leurs
              produits SaaS, leurs processus commerciaux et leurs systèmes de décision — souvent sans
              l&apos;avoir formalisé.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Éditeurs SaaS", "PME & ETI", "Directions RH", "Équipes produit", "Directions juridiques"].map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: 10,
                    borderRadius: 999,
                    border: `1px solid ${LIGHT.border}`,
                    padding: "4px 10px",
                    color: LIGHT.muted,
                  }}
                >
                  {p}
                </span>
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

      {/* 7. NOTRE ANGLE */}
      <section style={{ background: LIGHT.bg, color: LIGHT.text, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div style={{ background: LIGHT.panel2, border: `1px solid ${LIGHT.border}`, borderRadius: 8, padding: 16 }}>
            <Eyebrow>Notre angle</Eyebrow>
            <blockquote style={{ borderLeft: "2px solid #1A47FF", paddingLeft: 12, margin: "0 0 10px", color: LIGHT.text, fontSize: 14, fontStyle: "italic", lineHeight: 1.65 }}>
              En cas de contrôle, l&apos;entreprise doit pouvoir démontrer comment son système a été conçu, supervisé et documenté.
            </blockquote>
            <p style={{ ...TYPE.body, color: LIGHT.muted, margin: 0 }}>
              Un manquement à la documentation ou à la supervision humaine devient un indice de défaut — utilisable contre vous dans tout contentieux. Nous construisons la preuve en amont pour qu&apos;elle tienne en aval.
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

          <div style={{ background: LIGHT.panel, border: `1px solid ${LIGHT.border}`, borderRadius: 8, padding: CARD_PAD }}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP, marginBottom: 16 }}>
              <div style={{ border: `1px solid ${LIGHT.border}`, borderRadius: 8, padding: 0, display: "flex", flexDirection: "column" }}>
                <img
                  src="/images/alexandre-lazaregue.png"
                  alt="Alexandre Lazarègue"
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: 4,
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Alexandre Lazarègue</div>
                  <div style={{ fontSize: 12, color: LIGHT.muted }}>Avocat</div>
                  <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6 }}>Droit du numérique · Cybersécurité · RGPD · AI Act · Contentieux</div>
                </div>
              </div>
              <div style={{ border: `1px solid ${LIGHT.border}`, borderRadius: 8, padding: 0, display: "flex", flexDirection: "column" }}>
                <img
                  src="/images/nadia-abchiche.png"
                  alt="Nadia Abchiche-Mimouni"
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: 4,
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Nadia Abchiche-Mimouni</div>
                  <div style={{ fontSize: 12, color: LIGHT.muted }}>AI Ethic Officer</div>
                  <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6 }}>Docteure en IA · CNRS · Éthique algorithmique · Systèmes IA</div>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: 13,
                color: "rgba(10,10,20,0.55)",
                lineHeight: 1.7,
                padding: "12px 0",
                borderTop: "1px solid rgba(10,10,20,0.07)",
                marginTop: 12,
              }}
            >
              Alexandre Lazarègue qualifie juridiquement vos systèmes IA et construit la documentation qui tient devant les autorités. Nadia Abchiche-Mimouni évalue l&apos;architecture technique des systèmes, leurs biais et leurs impacts éthiques. Deux compétences complémentaires au service d&apos;une gouvernance IA qui couvre l&apos;intégralité du spectre — du contrat à l&apos;algorithme.
            </div>

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
                a: "Pour tout système IA à haut risque — outil RH de sélection, scoring client, composant dans un dispositif médical — vous devez mettre en place : une gestion continue des risques (art. 9), une gouvernance des données d'entraînement (art. 10), une documentation technique complète (art. 11), une journalisation automatique (art. 12), une supervision humaine effective (art. 14), une évaluation de conformité avant mise sur le marché (art. 43), et un enregistrement dans la base européenne (art. 49). Conservation obligatoire : 10 ans (art. 18).",
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
                    <div style={{ borderLeft: "2px solid #E24B4A", padding: "8px 12px", background: "rgba(226,75,74,0.08)", fontSize: 12 }}>
                      → Fév. 2025 : Pratiques interdites — en vigueur (art. 5 RIA)
                    </div>
                    <div style={{ borderLeft: "2px solid #F2A43A", padding: "8px 12px", background: "rgba(242,164,58,0.08)", fontSize: 12 }}>
                      → Août 2025 : IA générative, chatbots, deepfakes — obligations de transparence en vigueur
                    </div>
                    <div style={{ borderLeft: "2px solid #1A47FF", padding: "8px 12px", background: "rgba(26,71,255,0.08)", fontSize: 12 }}>
                      → Août 2027 : Systèmes à haut risque — pleine conformité fournisseurs et déployeurs (art. 6)
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

                  {isOpen ? (
                    <div style={{ ...TYPE.small, color: LIGHT.muted, lineHeight: 1.7, padding: "0 0 14px 0", maxWidth: 760 }}>
                      {item.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
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
