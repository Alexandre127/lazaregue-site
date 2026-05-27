"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

type TocItem = { id: string; label: string };

type ExpertQuote = { text: string };

type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  expert?: ExpertQuote;
};

type Article = {
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  title: string;
  chapo: string;
  author: { initials: string; name: string; role: string };
  heroImageBg: string;
  toc: TocItem[];
  sections: ArticleSection[];
  related: { slug: string; tag: string; title: string; color: string }[];
};

const ARTICLES: Record<string, Article> = {
  "cyberattaque-72h": {
    slug: "cyberattaque-72h",
    category: "Cybersécurité",
    categoryColor: "#E24B4A",
    date: "12 mai 2026",
    readTime: "8 min",
    title:
      "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
    chapo:
      "Les trois premiers jours conditionnent la résilience opérationnelle, la conformité réglementaire et la crédibilité de l'entreprise face à ses partenaires, clients et autorités.",
    author: {
      initials: "AL",
      name: "Alexandre Lazarègue",
      role: "Avocat — Cybercriminalité & gestion de crise",
    },
    heroImageBg: "linear-gradient(135deg, #0a1428 0%, #1a2a50 50%, #0e1a38 100%)",
    toc: [
      { id: "enjeu", label: "Les 72 premières heures" },
      { id: "cellule", label: "Constituer la cellule de crise" },
      { id: "preuves", label: "Préserver les preuves" },
      { id: "obligations", label: "Obligations réglementaires" },
      { id: "communication", label: "Communiquer avec maîtrise" },
    ],
    sections: [
      {
        id: "enjeu",
        heading: "Les 72 premières heures : l'enjeu décisif",
        paragraphs: [
          "Une cyberattaque n'est pas seulement un incident technique. C'est une séquence juridique, réputationnelle et contractuelle qui s'accélère dès la première heure.",
          "Les décisions prises dans les 72 heures suivant la détection — gel des systèmes, préservation des logs, activation des assurances, notification des autorités — déterminent souvent l'ampleur du préjudice et la tenue des recours ultérieurs.",
        ],
        expert: {
          text: "Le réflexe de tout restaurer immédiatement est compréhensible, mais il peut détruire des éléments de preuve essentiels. La priorité est la stabilité juridique de la réponse, pas la vitesse apparente.",
        },
      },
      {
        id: "cellule",
        heading: "Étape 1 — Constituer la cellule de crise",
        paragraphs: [
          "La cellule doit réunir direction générale, RSSI ou DSI, responsable conformité, communication et conseil juridique. Chaque canal de décision doit être identifié avant toute déclaration externe.",
        ],
        bullets: [
          "Désigner un décideur unique et un porte-parole distinct",
          "Activer le contrat de réponse à incident et l'assurance cyber",
          "Documenter l'heure de détection et les premiers symptômes",
        ],
      },
      {
        id: "preuves",
        heading: "Étape 2 — Préserver les preuves",
        paragraphs: [
          "Les journaux, captures réseau, échanges avec l'attaquant et copies des systèmes affectés constituent la base des investigations et des procédures éventuelles.",
        ],
        bullets: [
          "Isoler sans effacer les environnements compromis",
          "Centraliser les échanges internes et externes",
          "Mandater un prestataire forensic sous contrôle du conseil",
        ],
        expert: {
          text: "En contentieux, l'entreprise qui n'a pas su conserver les preuves se retrouve en position de faiblesse, y compris face à son propre assureur.",
        },
      },
      {
        id: "obligations",
        heading: "Étape 3 — Évaluer les obligations réglementaires",
        paragraphs: [
          "Selon la nature des données et le statut de l'entité, des notifications CNIL, ANSSI ou autorités sectorielles peuvent être requises dans des délais contraints.",
          "L'analyse doit distinguer incident de sécurité, violation de données personnelles et obligation de signalement NIS 2.",
        ],
      },
      {
        id: "communication",
        heading: "Étape 4 — Communiquer avec maîtrise",
        paragraphs: [
          "Tout message public ou adressé aux clients doit être validé juridiquement. L'objectif est de préserver la confiance sans admettre prématurément des faits encore en investigation.",
        ],
        expert: {
          text: "Une communication trop rapide ou imprécise crée souvent plus de risques que le silence temporaire d'une cellule bien structurée.",
        },
      },
    ],
    related: [
      {
        slug: "violation-donnees-rgpd",
        tag: "RGPD",
        title: "Violation de données : les obligations légales",
        color: "#1A47FF",
      },
      {
        slug: "rupture-contrat-saas",
        tag: "Contentieux IT",
        title: "Rupture de contrat SaaS : les recours juridiques",
        color: "#E24B4A",
      },
      {
        slug: "ai-act-entreprises",
        tag: "IA & Conformité",
        title: "AI Act : ce que les entreprises françaises doivent anticiper",
        color: "#1D9E75",
      },
    ],
  },
  "ai-act-entreprises": {
    slug: "ai-act-entreprises",
    category: "IA & Conformité",
    categoryColor: "#1D9E75",
    date: "Mai 2026",
    readTime: "6 min",
    title: "AI Act : ce que les entreprises françaises doivent anticiper",
    chapo:
      "Cartographie des systèmes, documentation et gouvernance : les fondations d'une mise en conformité progressive.",
    author: {
      initials: "SH",
      name: "Sarah Hinderer",
      role: "Avocat — Données & IA",
    },
    heroImageBg: "linear-gradient(135deg, #081408, #0c1a10)",
    toc: [{ id: "cadre", label: "Le cadre AI Act" }],
    sections: [
      {
        id: "cadre",
        heading: "Le cadre AI Act",
        paragraphs: [
          "Les entreprises déployant ou intégrant des systèmes d'IA doivent anticiper les obligations de transparence, de supervision humaine et de gestion des risques selon le niveau de criticité du système.",
        ],
      },
    ],
    related: [
      {
        slug: "cyberattaque-72h",
        tag: "Cybersécurité",
        title:
          "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
        color: "#E24B4A",
      },
    ],
  },
  "rupture-contrat-saas": {
    slug: "rupture-contrat-saas",
    category: "Contentieux IT",
    categoryColor: "#E24B4A",
    date: "Avr. 2026",
    readTime: "7 min",
    title: "Rupture de contrat SaaS : les recours juridiques",
    chapo:
      "Indisponibilité prolongée, résiliation unilatérale et préjudice commercial : structurer une réponse contentieuse efficace.",
    author: {
      initials: "AL",
      name: "Alexandre Lazarègue",
      role: "Avocat — Contentieux informatique",
    },
    heroImageBg: "linear-gradient(135deg, #1a0808, #1e0c10)",
    toc: [{ id: "recours", label: "Les recours disponibles" }],
    sections: [
      {
        id: "recours",
        heading: "Les recours disponibles",
        paragraphs: [
          "L'analyse contractuelle doit précéder toute mise en demeure : périmètre de service, SLA, limites de responsabilité et clauses de sortie.",
        ],
      },
    ],
    related: [
      {
        slug: "cyberattaque-72h",
        tag: "Cybersécurité",
        title:
          "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
        color: "#E24B4A",
      },
    ],
  },
  "violation-donnees-rgpd": {
    slug: "violation-donnees-rgpd",
    category: "RGPD",
    categoryColor: "#1A47FF",
    date: "Mars 2026",
    readTime: "6 min",
    title: "Violation de données : les obligations légales",
    chapo:
      "Notification CNIL, registre des violations et information des personnes : le plan d'action juridique en 48 heures.",
    author: {
      initials: "SH",
      name: "Sarah Hinderer",
      role: "Avocat — RGPD & données",
    },
    heroImageBg: "linear-gradient(135deg, #0a0f1e, #0e1530)",
    toc: [{ id: "plan", label: "Plan d'action 48h" }],
    sections: [
      {
        id: "plan",
        heading: "Plan d'action 48h",
        paragraphs: [
          "La qualification de la violation et l'évaluation du risque pour les personnes concernées orientent le calendrier de notification et les mesures correctives.",
        ],
      },
    ],
    related: [
      {
        slug: "cyberattaque-72h",
        tag: "Cybersécurité",
        title:
          "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
        color: "#E24B4A",
      },
    ],
  },
};

const DEFAULT_SLUG = "cyberattaque-72h";

const SEPARATOR = "0.5px solid rgba(255,255,255,0.06)";

function ExpertBlock({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "rgba(26,71,255,0.06)",
        border: "0.5px solid rgba(26,71,255,0.2)",
        borderRadius: "6px",
        padding: "16px",
        margin: "24px 0",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          color: "#6a8fff",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Avis de l&apos;expert
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.55)",
          fontStyle: "italic",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default function BlogArticlePage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : DEFAULT_SLUG;
  const article = ARTICLES[slug] ?? ARTICLES[DEFAULT_SLUG];
  const [activeToc, setActiveToc] = useState(article.toc[0]?.id ?? "");

  return (
    <main style={{ background: "#060912", color: "white", minHeight: "100vh" }}>
      {/* Header article */}
      <header
        style={{
          padding: "48px 40px 32px",
          borderBottom: SEPARATOR,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="flex items-center gap-2"
              style={{
                fontSize: "10px",
                color: article.categoryColor,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: article.categoryColor,
                }}
              />
              {article.category}
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}
            >
              {article.date}
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <span
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}
            >
              {article.readTime} de lecture
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "760px",
              marginBottom: "24px",
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              maxWidth: "760px",
              fontSize: "15px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              borderLeft: "2px solid #1A47FF",
              paddingLeft: "16px",
              marginBottom: "28px",
            }}
          >
            {article.chapo}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(26,71,255,0.2)",
                  color: "#6a8fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {article.author.initials}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "white",
                    margin: 0,
                  }}
                >
                  {article.author.name}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    margin: 0,
                  }}
                >
                  {article.author.role}
                </p>
              </div>
            </div>
            <button
              type="button"
              style={{
                background: "transparent",
                border: "0.5px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.5)",
                padding: "10px 20px",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Partager →
            </button>
          </div>
        </div>
      </header>

      {/* 2 colonnes */}
      <div
        className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1fr_260px]"
      >
        {/* Corps article */}
        <article
          style={{
            padding: "40px 48px 40px 40px",
            borderRight: SEPARATOR,
          }}
        >
          <div
            style={{
              height: "240px",
              borderRadius: "8px",
              background: article.heroImageBg,
              marginBottom: "32px",
            }}
            aria-hidden
          />

          {article.sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              {index > 0 && (
                <hr
                  style={{
                    border: "none",
                    borderTop: SEPARATOR,
                    margin: "32px 0 24px",
                  }}
                />
              )}
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "16px",
                  paddingTop: index === 0 ? 0 : undefined,
                }}
              >
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.85,
                    marginBottom: "16px",
                  }}
                >
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul
                  style={{
                    margin: "0 0 16px 0",
                    paddingLeft: "20px",
                    listStyle: "none",
                  }}
                >
                  {section.bullets.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.85,
                        marginBottom: "8px",
                        position: "relative",
                        paddingLeft: "12px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "0.55em",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "#1A47FF",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.expert ? <ExpertBlock text={section.expert.text} /> : null}
            </section>
          ))}
        </article>

        {/* Sidebar */}
        <aside
          style={{
            padding: "32px 40px 32px 32px",
            position: "sticky",
            top: "20px",
            alignSelf: "start",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Sommaire
          </p>
          <nav>
            {article.toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveToc(item.id)}
                style={{
                  display: "block",
                  fontSize: "12px",
                  padding: "6px 0 6px 12px",
                  marginBottom: "4px",
                  borderLeft:
                    activeToc === item.id
                      ? "2px solid #1A47FF"
                      : "1px solid rgba(255,255,255,0.08)",
                  color:
                    activeToc === item.id
                      ? "#1A47FF"
                      : "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <hr
            style={{
              border: "none",
              borderTop: SEPARATOR,
              margin: "24px 0",
            }}
          />

          <div
            style={{
              background: "#0e1628",
              border: "0.5px solid rgba(26,71,255,0.2)",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "white",
                marginBottom: "8px",
              }}
            >
              Vous êtes concerné ?
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              Incident en cours, notification CNIL — notre équipe intervient
              sous 4h.
            </p>
            <a
              href="mailto:contact@lazaregue-avocats.fr"
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                background: "#1A47FF",
                color: "white",
                padding: "12px 16px",
                borderRadius: "4px",
                fontSize: "11px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Parler à un avocat →
            </a>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: SEPARATOR,
              margin: "24px 0",
            }}
          />

          <p
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Articles liés
          </p>
          <div className="flex flex-col gap-4">
            {article.related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    color: rel.color,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {rel.tag}
                </span>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.4,
                    marginTop: "4px",
                  }}
                >
                  {rel.title}
                </p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
