"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ARTICLES, DEFAULT_SLUG } from "./articles-data";

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

export default function ArticleClient() {
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
