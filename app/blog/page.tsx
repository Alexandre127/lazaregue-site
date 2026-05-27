"use client";

import Link from "next/link";

const FEATURED = {
  slug: "cyberattaque-72h",
  category: "Cybersécurité",
  tag: "Cybersécurité · À la une",
  title:
    "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
  author: "Alexandre Lazarègue",
  date: "12 mai 2026",
  readTime: "8 min",
};

const GRID_ARTICLES = [
  {
    slug: "ai-act-entreprises",
    category: "IA & Conformité",
    color: "#1D9E75",
    title: "AI Act : ce que les entreprises françaises doivent anticiper",
    excerpt:
      "Calendrier, gouvernance et documentation : les priorités avant l'entrée en vigueur des obligations majeures.",
    source: "Lazarègue Avocats",
    date: "Mai 2026",
  },
  {
    slug: "rupture-contrat-saas",
    category: "Contentieux IT",
    color: "#E24B4A",
    title: "Rupture de contrat SaaS : les recours juridiques",
    excerpt:
      "Indisponibilité, résiliation abusive et préjudice : comment structurer une action rapide et crédible.",
    source: "Lazarègue Avocats",
    date: "Avr. 2026",
  },
  {
    slug: "violation-donnees-rgpd",
    category: "RGPD",
    color: "#1A47FF",
    title: "Violation de données : les obligations légales",
    excerpt:
      "Notification CNIL, information des personnes et registre des violations : le plan d'action en 48 heures.",
    source: "Lazarègue Avocats",
    date: "Mars 2026",
  },
] as const;

const PUBLICATIONS = [
  {
    num: "01",
    title: "Responsabilité des plateformes : ce que dit la loi DSA",
    source: "YouTube",
    date: "Sept. 2025",
  },
  {
    num: "02",
    title: "NIS 2 & DORA : les nouvelles obligations de cybersécurité",
    source: "Forum InCyber",
    date: "Avr. 2026",
  },
  {
    num: "03",
    title: "Intelligence artificielle et responsabilité",
    source: "Les Echos",
    date: "Mars 2026",
  },
  {
    num: "04",
    title: "Le Juge Bashing — Poison lent de la démocratie",
    source: "Livre",
    date: "2026",
  },
] as const;

export default function BlogPage() {
  return (
    <main style={{ background: "#060912", color: "white", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex flex-col justify-end"
        style={{
          height: "460px",
          background: "linear-gradient(135deg, #0a1428, #1a2a50)",
          padding: "0 5% 48px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, #060912 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="mb-4 flex items-center gap-2">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#E24B4A",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {FEATURED.tag}
            </span>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1
                style={{
                  fontSize: "clamp(24px, 3.5vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "white",
                }}
              >
                {FEATURED.title}
              </h1>
              <p
                className="mt-4"
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.04em",
                }}
              >
                {FEATURED.author} · {FEATURED.date} · {FEATURED.readTime} de
                lecture
              </p>
            </div>
            <Link
              href={`/blog/${FEATURED.slug}`}
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: "#1A47FF",
                color: "white",
                padding: "14px 28px",
                borderRadius: "4px",
                fontSize: "12px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                flexShrink: 0,
              }}
            >
              Lire l&apos;article →
            </Link>
          </div>
        </div>
      </section>

      {/* Grille 3 articles */}
      <section
        className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        {GRID_ARTICLES.map((article, index) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block transition-opacity hover:opacity-90"
            style={{
              textDecoration: "none",
              color: "inherit",
              borderRight:
                index < GRID_ARTICLES.length - 1
                  ? "0.5px solid rgba(255,255,255,0.06)"
                  : undefined,
            }}
          >
            <div
              style={{
                height: "160px",
                background: `linear-gradient(135deg, ${article.color}22, ${article.color}44)`,
              }}
            />
            <div style={{ padding: "20px 24px 24px" }}>
              <div className="mb-3 flex items-center gap-2">
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: article.color,
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    color: article.color,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {article.category}
                </span>
              </div>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "white",
                  lineHeight: 1.4,
                  marginBottom: "8px",
                }}
              >
                {article.title}
              </h2>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  {article.source} · {article.date}
                </span>
                <span style={{ fontSize: "11px", color: "#1A47FF" }}>
                  Lire →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Liste publications */}
      <section style={{ padding: "32px 40px" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h2
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "white",
                letterSpacing: "0.02em",
              }}
            >
              Toutes les publications
            </h2>
            <Link
              href="/blog"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              Voir tout →
            </Link>
          </div>
          <div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            {PUBLICATIONS.map((pub, index) => (
              <div
                key={pub.num}
                className="grid grid-cols-1 items-center gap-2 py-4 sm:grid-cols-4 sm:gap-4"
                style={{
                  borderBottom:
                    index < PUBLICATIONS.length - 1
                      ? "0.5px solid rgba(255,255,255,0.06)"
                      : undefined,
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  {pub.num}
                </span>
                <span
                  className="sm:col-span-2"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {pub.title}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {pub.source}
                </span>
                <span
                  className="sm:text-right"
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  {pub.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
