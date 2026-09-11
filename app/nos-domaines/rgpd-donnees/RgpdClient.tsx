"use client";

import Image from "next/image";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FAQ_ITEMS } from "./faq";

/**
 * Système chromatique (Bloc B).
 * — `BRAND` : bleu Lazarègue, couleur de la marque et de l'ACTION. Identique
 *   sur toutes les pages : boutons primaires, liens, focus, indicateurs de
 *   sélection/progression cliquables.
 * — `ACCENT` : accent ÉDITORIAL de la famille (ici « Données/conformité » =
 *   vert). Sur-titres, labels de repérage, fonds et halos décoratifs. Jamais
 *   sur un élément d'action.
 * Les valeurs réelles sont posées en variables CSS sur le <main> (voir plus
 * bas), ce qui permettra plus tard de changer de famille par attribut sans
 * toucher aux composants. Aucune couleur ne porte seule une information (B4).
 */
const BRAND = "var(--brand)";
const BRAND_RGB = "var(--brand-rgb)";
const ACCENT = "var(--famille-accent)";
const ACCENT_RGB = "var(--famille-rgb)";

const DARK = {
  bg: "#0a0f2e",
  panel: "#11163a",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.62)",
  border: "rgba(255,255,255,0.12)",
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
const INNER = { maxWidth: 900, margin: "0 auto", padding: "0 24px" };
const SECTION_PAD = "56px 0";

/**
 * Masqué visuellement mais présent dans le DOM (et l'arbre d'accessibilité).
 * Sert aux sections dont le titre visible est un sur-titre graphique : on garde
 * le sur-titre tel quel et on ajoute un vrai h2 pour la hiérarchie.
 */
const SR_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

const HERO_STATS = [
  {
    display: "20 M€ ou 4 %",
    label:
      "du chiffre d'affaires annuel mondial, le montant le plus élevé étant retenu",
    source: "RGPD, art. 83 §5",
  },
  {
    display: "72 h",
    label:
      "pour notifier une violation à la CNIL à compter de sa connaissance, lorsqu'elle présente un risque",
    source: "RGPD, art. 33",
  },
] as const;

function LivrablesPreview() {
  const [cur, setCur] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  const items = [
    {
      num: "01",
      name: "DPA sous-traitant — art. 28",
      sub: "Les clauses que les éditeurs refusent — et comment elles se rédigent",
    },
    {
      num: "02",
      name: "Politique de confidentialité",
      sub: "Droit du travail, cookies et régime sectoriel articulés",
    },
    {
      num: "03",
      name: "Registre des traitements",
      sub: "La base légale documentée, traitement par traitement",
    },
    {
      num: "04",
      name: "Grille d'évaluation du risque",
      sub: "Notifier ou non : les critères de la décision",
    },
    {
      num: "05",
      name: "Rapport de due diligence",
      sub: "Ce qu'un acquéreur regarde dans une base clients",
    },
  ];

  const docs = [
    // DOC 0 — Registre
    <div
      key="0"
      style={{
        padding: "12px 14px",
        fontSize: "9px",
        color: "#333",
        lineHeight: 1.65,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#111",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        Registre des activités de traitement
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>
        Version auditée · Mai 2026 · Confidentiel
      </div>
      <div
        style={{
          display: "flex",
          background: "#f0f0f0",
          fontWeight: 700,
          fontSize: "7.5px",
          color: "#444",
          marginBottom: "1px",
        }}
      >
        {["Traitement", "Finalité", "Base légale", "Risque"].map((h) => (
          <div
            key={h}
            style={{ flex: 1, padding: "3px 4px", borderRight: "1px solid #ddd" }}
          >
            {h}
          </div>
        ))}
      </div>
      {[
        ["CRM prospects", "Prospection B2B", "Intérêt légitime ✓", "Faible"],
        ["Newsletter", "Marketing", "Consentement ✓", "Moyen"],
        ["RH — salariés", "Gestion paie", "Obligation légale ✓", "Élevé"],
        ["Analytics web", "Audience", "⚠ manquante", "Élevé"],
      ].map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            borderBottom: "1px solid #eee",
            background: i % 2 === 0 ? "#fafafa" : "white",
          }}
        >
          {row.map((cell, j) => (
            <div
              key={j}
              style={{
                flex: 1,
                padding: "3px 4px",
                borderRight: "1px solid #eee",
                fontSize: "7.5px",
                color: j === 2 && i === 3 ? "#c0392b" : "#333",
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      <div
        style={{
          background: "#fffbf0",
          borderLeft: "2px solid #e6a817",
          padding: "6px 8px",
          margin: "8px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#b8860b" }}>⚠ Point critique :</strong> Le
        traitement analytics web est dépourvu de base légale valide. Exposition à
        une sanction CNIL immédiate (réf. SAN-2021-023).
      </div>
    </div>,

    // DOC 1 — Grille risque
    <div
      key="1"
      style={{
        padding: "12px 14px",
        fontSize: "9px",
        color: "#333",
        lineHeight: 1.65,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#111",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        Grille d'évaluation du risque
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>
        Outil d'aide à la décision · Lazarègue Avocats · 2026
      </div>
      <div style={{ display: "flex", gap: "6px", margin: "8px 0" }}>
        {[
          ["4/5", "Gravité"],
          ["3/5", "Probabilité"],
          ["12k", "Personnes"],
          ["Santé", "Catégorie"],
        ].map(([n, l]) => (
          <div
            key={l}
            style={{
              flex: 1,
              background: "#f8f8f8",
              border: "1px solid #e5e5e5",
              borderRadius: "3px",
              padding: "5px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c0392b" }}>
              {n}
            </div>
            <div style={{ fontSize: "7px", color: "#888", marginTop: "1px" }}>
              {l}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "#fff5f5",
          borderLeft: "2px solid #c0392b",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#c0392b" }}>
          Notification CNIL obligatoire sous 72h
        </strong>
        <br />
        Score ≥ 3/5 sur données sensibles (santé) + volume &gt; 10 000 personnes.
      </div>
      <div
        style={{
          background: "#f0faf5",
          borderLeft: "2px solid #1a7a50",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#1a7a50" }}>Action immédiate :</strong>{" "}
        Conserver les logs système. Mandater expert forensic avant toute
        intervention IT. Délai critique : J+4h.
      </div>
    </div>,

    // DOC 2 — DPA sous-traitant (2 colonnes : version de départ / rédaction proposée)
    <div
      key="2"
      style={{
        padding: "12px 14px",
        fontSize: "9px",
        color: "#333",
        lineHeight: 1.55,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#111",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        DPA — Rédaction proposée par le cabinet — spécimen
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "8px" }}>
        Prestataire SaaS · Spécimen — aucune donnée réelle
      </div>
      {[
        {
          art: "Art. 7 — Localisation des données",
          depart: "Hébergement « mondial », transferts non encadrés.",
          propose:
            "Hébergement dans l'UE. Tout transfert hors UE soumis à accord préalable écrit.",
        },
        {
          art: "Art. 9 — Droit d'audit",
          depart: "Aucun droit d'audit prévu.",
          propose:
            "Audit annuel, préavis 30 jours ; rapport SOC 2 Type II en substitution.",
        },
        {
          art: "Art. 3 — Notification d'incident",
          depart: "Le prestataire informe le client dans les meilleurs délais.",
          propose:
            "Notification sous 24 heures, contenu minimal défini, conservation des journaux pendant six mois.",
        },
      ].map((row) => (
        <div
          key={row.art}
          style={{
            marginBottom: "6px",
            paddingBottom: "6px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#111",
              fontSize: "8.5px",
              marginBottom: "3px",
            }}
          >
            {row.art}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px",
            }}
          >
            <div
              style={{
                background: "#f4f4f4",
                borderLeft: "2px solid #bbb",
                padding: "4px 6px",
              }}
            >
              <div
                style={{
                  fontSize: "6.5px",
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  color: "#888",
                  marginBottom: "2px",
                }}
              >
                Version de départ
              </div>
              <div style={{ fontSize: "8px", color: "#666" }}>{row.depart}</div>
            </div>
            <div
              style={{
                background: "#f0f4ff",
                borderLeft: "2px solid #1A47FF",
                padding: "4px 6px",
              }}
            >
              <div
                style={{
                  fontSize: "6.5px",
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  color: "#1A47FF",
                  marginBottom: "2px",
                }}
              >
                Rédaction proposée
              </div>
              <div style={{ fontSize: "8px", color: "#333" }}>{row.propose}</div>
            </div>
          </div>
        </div>
      ))}
      <div
        style={{
          background: "#fffbf0",
          borderLeft: "2px solid #e6a817",
          padding: "6px 8px",
          marginTop: "2px",
          fontSize: "8px",
          color: "#555",
          lineHeight: 1.55,
        }}
      >
        <strong style={{ color: "#b8860b" }}>Pourquoi cela compte.</strong>{" "}
        « Dans les meilleurs délais » ne permet pas de tenir les soixante-douze
        heures de l'article 33 : le responsable de traitement dépend alors du
        calendrier de son prestataire.
      </div>
    </div>,

    // DOC 3 — Politique sur mesure
    <div
      key="3"
      style={{
        padding: "12px 14px",
        fontSize: "9px",
        color: "#333",
        lineHeight: 1.65,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#111",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        Points spécifiques — Au-delà du modèle standard
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>
        Secteur B2B · RH 120 salariés · E-commerce · Mai 2026
      </div>
      <div
        style={{
          background: "#f0faf5",
          borderLeft: "2px solid #1a7a50",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#1a7a50" }}>Droit du travail intégré :</strong>{" "}
        Clause sur la surveillance des outils informatiques salariés (art.
        L.1222-4 CT). Information préalable du CSE obligatoire. Absent des
        modèles standard.
      </div>
      <div
        style={{
          background: "#fffbf0",
          borderLeft: "2px solid #e6a817",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#b8860b" }}>Cookies post-consentement :</strong>{" "}
        Mention explicite des partenaires publicitaires tiers. Exigé par les
        dernières décisions CNIL (délib. 2023-091). Non prévu dans les
        générateurs automatiques.
      </div>
      <div
        style={{
          background: "#fff5f5",
          borderLeft: "2px solid #c0392b",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#c0392b" }}>Point sectoriel :</strong> E-commerce
        = conservation données paiement soumise au PCI-DSS en sus du RGPD. Double
        régime articulé.
      </div>
    </div>,

    // DOC 4 — Due diligence chiffrée
    <div
      key="4"
      style={{
        padding: "12px 14px",
        fontSize: "9px",
        color: "#333",
        lineHeight: 1.65,
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          color: "#111",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        Valorisation du risque résiduel
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "8px" }}>
        SaaS RH · Acquisition · Spécimen — aucune donnée réelle
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          margin: "8px 0",
          background: "#f8f8f8",
          border: "1px solid #e5e5e5",
          borderRadius: "3px",
          padding: "7px 9px",
        }}
      >
        {[
          ["Critiques", "Non-conformités à traiter avant l'opération", "#c0392b"],
          ["À régulariser", "Points de conformité résiduels", "#e6a817"],
        ].map(([t, l, c]) => (
          <div key={t} style={{ flex: 1 }}>
            <div
              style={{
                fontSize: "8.5px",
                fontWeight: 700,
                color: c,
                textTransform: "uppercase",
                letterSpacing: ".04em",
              }}
            >
              {t}
            </div>
            <div
              style={{ fontSize: "7.5px", color: "#888", marginTop: "2px", lineHeight: 1.3 }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "#fff5f5",
          borderLeft: "2px solid #c0392b",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#c0392b" }}>Non-conformité critique :</strong>{" "}
        Base de prospection constituée sans consentement valide. Risque de
        qualification en actif illicite.
      </div>
      <div
        style={{
          background: "#f0faf5",
          borderLeft: "2px solid #1a7a50",
          padding: "6px 8px",
          margin: "6px 0",
          fontSize: "8.5px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#1a7a50" }}>Recommandation :</strong>{" "}
        Régularisation avant closing + garantie d'actif et de passif RGPD —
        clause rédigée et négociée.
      </div>
    </div>,

  ];

  // Ordre d'affichage (A6) : le DPA passe en premier. Les blocs `docs` restent
  // définis dans leur ordre historique ; `order` mappe l'index affiché (celui
  // du menu et de `cur`) vers le bloc et son bandeau.
  const order = [2, 3, 0, 1, 4];
  const docBadges = [
    "Registre Art.30",
    "Procédure Art.33",
    "DPA Art.28",
    "Politique RGPD",
    "Due Diligence M&A",
  ];

  return (
    <>
    <div className="livr-grid">
      <div className="livr-menu">
        <div className="livr-menu-items" role="tablist" aria-label="Nos livrables">
        {items.map((item, i) => (
          <h3 key={i} style={{ margin: 0 }}>
            <button
              type="button"
              role="tab"
              onClick={() => setCur(i)}
              id={`livrable-tab-${i}`}
              aria-controls={`livrable-doc-${i}`}
              aria-selected={cur === i}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "10px 10px 10px 12px",
                border: "none",
                borderLeft:
                  cur === i ? `2px solid ${BRAND}` : "2px solid transparent",
                borderBottom: i < 4 ? `.5px solid ${LIGHT.border}` : "none",
                background: cur === i ? "rgba(var(--brand-rgb),0.05)" : "none",
                textAlign: "left",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: cur === i ? BRAND : LIGHT.faint,
                  fontFamily: "monospace",
                  width: "20px",
                  flexShrink: 0,
                  paddingTop: "1px",
                }}
              >
                {item.num}
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    color: cur === i ? LIGHT.text : LIGHT.muted,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: cur === i ? LIGHT.muted : LIGHT.faint,
                    lineHeight: 1.4,
                    marginTop: "2px",
                  }}
                >
                  {item.sub}
                </span>
              </span>
              {cur === i ? (
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: BRAND,
                    flexShrink: 0,
                    marginTop: "5px",
                  }}
                />
              ) : null}
            </button>
          </h3>
        ))}
        </div>
        <style>{`@media (prefers-reduced-motion: reduce) { .livr-doc-card, .livr-zoom-inner { transition: none !important; } }`}</style>
        <p
          className="livr-menu-mention"
          style={{
            marginTop: "16px",
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: ".08em",
            color: LIGHT.faint,
          }}
        >
          Extraits anonymisés · aucune donnée réelle
        </p>
      </div>

      <div>
        <div className="livr-doc" style={{ position: "relative", height: "320px" }}>
          {order.map((docIdx, i) => (
            <div
              key={i}
              className="livr-doc-card"
              id={`livrable-doc-${i}`}
              role="tabpanel"
              aria-labelledby={`livrable-tab-${i}`}
              aria-hidden={cur === i ? undefined : "true"}
              style={{
                position: "absolute",
                inset: 0,
                background: "white",
                borderRadius: "6px",
                boxShadow: "0 20px 60px rgba(0,0,0,.5)",
                overflow: "hidden",
                fontFamily: "sans-serif",
                transition: "all .5s cubic-bezier(.4,0,.2,1)",
                opacity: cur === i ? 1 : 0,
                transform:
                  cur === i
                    ? "translateY(0) scale(1)"
                    : `translateY(${(i - cur) * 12}px) scale(${Math.max(0.9, 1 - Math.abs(i - cur) * 0.02)})`,
                zIndex: cur === i ? 10 : 5 - Math.abs(i - cur),
                pointerEvents: cur === i ? "auto" : "none",
              }}
            >
              <div
                style={{
                  background: "#f7f7f7",
                  borderBottom: "1px solid #e5e5e5",
                  padding: "9px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#111", letterSpacing: ".04em" }}>
                  LAZARÈGUE <span style={{ color: "#1A47FF" }}>AVOCATS</span>
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    color: "#666",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    background: "#eaeaea",
                    padding: "2px 6px",
                    borderRadius: "2px",
                  }}
                >
                  {docBadges[docIdx]}
                </span>
              </div>
              {docs[docIdx]}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setZoomed(true)}
          style={{
            marginTop: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: BRAND,
            background: "none",
            border: `1px solid ${LIGHT.border}`,
            borderRadius: "6px",
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          Agrandir le document
        </button>
      </div>
    </div>

    {zoomed ? (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Document agrandi"
        onClick={() => setZoomed(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(0,0,0,0.82)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5vw",
        }}
      >
        <button
          type="button"
          onClick={() => setZoomed(false)}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "26px",
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <div
          className="livr-zoom-inner"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "min(560px, 96vw)",
            maxHeight: "90vh",
            overflow: "auto",
            background: "white",
            borderRadius: "8px",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              background: "#f7f7f7",
              borderBottom: "1px solid #e5e5e5",
              padding: "11px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#111", letterSpacing: ".04em" }}>
              LAZARÈGUE <span style={{ color: "#1A47FF" }}>AVOCATS</span>
            </span>
            <span
              style={{
                fontSize: "9px",
                color: "#666",
                letterSpacing: ".06em",
                textTransform: "uppercase",
                background: "#eaeaea",
                padding: "3px 8px",
                borderRadius: "2px",
              }}
            >
              {docBadges[order[cur]]}
            </span>
          </div>
          <div style={{ zoom: 1.55 }}>{docs[order[cur]]}</div>
        </div>
      </div>
    ) : null}
    </>
  );
}

const SITUATIONS = [
  {
    num: "01",
    text: "Un contrôle CNIL s'annonce — préparer la documentation et la ligne de défense",
  },
  {
    num: "02",
    text: "Des données ont fuité — qualifier l'incident et arbitrer la notification",
  },
  {
    num: "03",
    text: "Un nouveau produit se lance — intégrer la conformité dès la conception",
  },
  {
    num: "04",
    text: "Des outils SaaS sont utilisés sans encadrement — cartographier et contractualiser",
  },
  {
    num: "05",
    text: "Un salarié exerce ses droits — répondre dans les délais sans exposer l'entreprise",
  },
  {
    num: "06",
    text: "Une levée de fonds ou une acquisition se prépare — sécuriser la due diligence RGPD",
  },
] as const;


type HeroStat = (typeof HERO_STATS)[number];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        animation: `fadeUp 0.8s ease ${delay}s both`,
      }}
    >
      {children}
    </div>
  );
}

function StatRow({ stat }: { stat: HeroStat }) {
  // Repère chiffré : élément non cliquable — aucun effet de survol (un survol
  // suggérerait une action qui n'existe pas).
  const value = stat.display;

  return (
    <div
      style={{
        padding: "18px 20px",
        borderRadius: "8px",
        border: "0.5px solid rgba(255,255,255,0.12)",
        background: "#11163a",
      }}
    >
      <p
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "white",
          margin: 0,
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.55)",
          margin: "4px 0 0",
        }}
      >
        {stat.label}
      </p>
      {stat.source ? (
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            margin: "2px 0 0",
            fontFamily: "monospace",
          }}
        >
          {stat.source}
        </p>
      ) : null}
    </div>
  );
}

function SituationItem({ num, text }: { num: string; text: string }) {
  // Situation informative : élément non cliquable — pas d'effet de survol.
  return (
    <div
      style={{
        background: "#060912",
        border: "0.5px solid rgba(255,255,255,0.06)",
        borderRadius: "6px",
        padding: "14px 16px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: "12px",
          color: ACCENT,
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.55,
        }}
      >
        · {text}
      </span>
    </div>
  );
}

function FaqAccordion() {
  // A9 — la question « prix » (première) est dépliée par défaut : Google
  // l'affiche dans le SERP « avocat RGPD ».
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            style={{
              borderBottom: `1px solid ${LIGHT.border}`,
              padding: "20px 0",
            }}
          >
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-question-${index}`}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: LIGHT.text,
                    lineHeight: 1.45,
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: BRAND,
                    fontSize: "18px",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <p
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                style={{
                  fontSize: "13px",
                  color: LIGHT.muted,
                  lineHeight: 1.75,
                  paddingTop: "12px",
                  margin: 0,
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function RgpdClient() {
  const terrainMountedRef = useRef(true);
  const [ctaHover, setCtaHover] = useState(false);
  const [openTerrainCard, setOpenTerrainCard] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    terrainMountedRef.current = true;
    return () => {
      isMounted = false;
      if (!isMounted) terrainMountedRef.current = false;
    };
  }, []);

  return (
    <main
      data-domaine="donnees"
      style={
        {
          // Marque / action — commun à tout le site.
          "--brand": "#1A47FF",
          "--brand-rgb": "26,71,255",
          // Famille « Données/conformité » — accent éditorial (vert).
          "--famille-accent": "#1D9E75",
          "--famille-rgb": "29,158,117",
          background: LIGHT.bg,
          color: LIGHT.text,
          fontFamily: "Inter, system-ui, sans-serif",
          minHeight: "100vh",
        } as CSSProperties
      }
    >
      <style>{`
        @keyframes glowMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 40px); }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* ---- Héro avec photographie (même traitement que cybersécurité) ----
           Mobile : la photo est le FOND de la section, derrière le texte, avec
           un voile sombre pour que le texte blanc passe. Desktop : deux colonnes
           55/45, photo à droite en cover, fondue à gauche dans le fond sombre. */
        .rgpd-hero-grid { position: relative; display: block; }
        .rgpd-hero-photo { position: absolute; inset: 0; z-index: 0; }
        .rgpd-hero-img { object-position: center 45%; }
        .rgpd-hero-overlay { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(9,13,38,0.92) 0%, rgba(9,13,38,0.84) 55%, rgba(9,13,38,0.72) 100%); }
        .rgpd-hero-fade { display: none; }
        .rgpd-hero-text { position: relative; z-index: 1; padding: 48px 24px 56px; min-height: 380px; }
        @media (min-width: 1024px) {
          .rgpd-hero-grid { display: grid; grid-template-columns: 55fr 45fr; align-items: stretch; }
          .rgpd-hero-photo { position: relative; inset: auto; order: 2; height: auto; min-height: 460px; z-index: auto; }
          .rgpd-hero-overlay { display: none; }
          .rgpd-hero-fade { display: block; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(to left, rgba(10,15,46,0) 60%, ${DARK.bg} 100%); }
          .rgpd-hero-text { order: 1; padding: 64px 40px 64px 24px; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
        }

        /* ---- Méthode : 4 colonnes en desktop, empilées en mobile ; la frise
             numérotée horizontale n'a plus de sens sur des étapes empilées ---- */
        .methode-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        @media (max-width: 767px) {
          .methode-frise { display: none !important; }
          .methode-grid { grid-template-columns: 1fr; gap: 28px; }
          .methode-grid > div { padding-right: 0 !important; }
        }

        /* ---- Carrousel de spécimens : deux colonnes en desktop ; sous 768 px,
             le menu passe en bandeau horizontal défilant au-dessus du document,
             lui-même en pleine largeur ---- */
        .livr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 767px) {
          .livr-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; align-items: stretch; }
          .livr-menu { min-width: 0; }
          .livr-menu-items { display: flex; flex-direction: column; gap: 0; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ background: DARK.bg, position: "relative", overflow: "hidden" }}>
        <div className="rgpd-hero-grid" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="rgpd-hero-photo">
            <Image
              src="/images/rgpd-hero.jpg"
              alt="Meuble à tiroirs éclairé dans une salle sombre — archives classées"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="rgpd-hero-img"
              style={{ objectFit: "cover" }}
            />
            <span className="rgpd-hero-fade" aria-hidden />
            <span className="rgpd-hero-overlay" aria-hidden />
          </div>

          <div className="rgpd-hero-text">
            <FadeUp delay={0}>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#5fd3a8",
                  background: `rgba(${ACCENT_RGB},0.22)`,
                  borderRadius: "8px",
                  padding: "4px 12px",
                  marginBottom: "18px",
                }}
              >
                RGPD &amp; Données · Paris
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1
                style={{
                  fontSize: "clamp(32px, 5.5vw, 60px)",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "12px",
                  lineHeight: 1.08,
                }}
              >
                Avocat RGPD et données personnelles à Paris
              </h1>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  maxWidth: "500px",
                  marginBottom: "28px",
                }}
              >
                Le cabinet intervient à Paris et partout en France, aux côtés des
                PME et ETI : de l&apos;audit à la due diligence, une conformité
                construite pour être démontrée.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="mb-6 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  style={{
                    background: BRAND,
                    color: "white",
                    padding: "14px 28px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Nous contacter →
                </a>
                <a
                  href="/#cas"
                  style={{
                    background: "transparent",
                    color: "rgba(255,255,255,0.5)",
                    padding: "14px 24px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    textDecoration: "none",
                    border: "0.5px solid rgba(255,255,255,0.15)",
                  }}
                >
                  Voir des situations concrètes
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.5}>
              <div className="flex flex-wrap gap-2">
                {[
                  "RGPD",
                  "Accountability",
                  "Privacy by Design",
                  "DPO",
                  "Due diligence",
                  "M&A",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.35)",
                      border: "0.5px solid rgba(255,255,255,0.1)",
                      padding: "4px 10px",
                      borderRadius: "3px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* REPÈRES CHIFFRÉS (section 2) — grille 2×2, mobile et desktop */}
      <section style={{ background: DARK.bg }}>
        <div style={{ ...INNER, padding: "0 24px 64px" }}>
          <h2 style={SR_ONLY}>Repères chiffrés</h2>
          <p
            aria-hidden="true"
            style={{
              fontSize: "10px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Repères chiffrés
          </p>
          <div className="grid grid-cols-2 gap-3">
            {HERO_STATS.map((stat) => (
              <StatRow key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* DANS QUELLES SITUATIONS (section 3) */}
      <section style={{ background: DARK.bg, borderTop: `1px solid ${DARK.border}` }}>
        <div style={{ ...INNER, padding: "56px 24px" }}>
          <p
            style={{
              fontSize: "10px",
              color: ACCENT,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Quand nous consulter
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 600,
              color: "#ffffff",
              maxWidth: "720px",
              marginBottom: "12px",
              lineHeight: 1.25,
            }}
          >
            Dans quelles situations faire appel à un avocat RGPD&nbsp;?
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "640px",
              marginBottom: "32px",
              lineHeight: 1.7,
            }}
          >
            Les signaux qui justifient de sécuriser vos traitements — avant
            qu&apos;un contrôle ou une opération ne révèle les non-conformités.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {SITUATIONS.map((s) => (
              <SituationItem key={s.num} num={s.num} text={s.text} />
            ))}
          </div>
        </div>
      </section>

      {/* MISE EN CONFORMITÉ RGPD (section 4) */}
      <section style={{ background: LIGHT.bg }}>
        <div style={{ ...INNER, padding: "56px 24px" }}>
          <p
            style={{
              fontSize: "10px",
              color: ACCENT,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Mise en conformité RGPD
          </p>
          <h2
            style={{
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 600,
              color: LIGHT.text,
              maxWidth: "720px",
              marginBottom: "20px",
              lineHeight: 1.25,
            }}
          >
            Une conformité qui se prouve
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: LIGHT.muted,
              maxWidth: "680px",
              marginBottom: "16px",
              lineHeight: 1.75,
            }}
          >
            Le règlement n&apos;impose pas seulement de respecter ses principes :
            il impose d&apos;être en mesure de le démontrer (art. 5.2 et 24 du
            RGPD). Un contrôle ne se joue donc pas sur ce que l&apos;entreprise
            fait, mais sur ce qu&apos;elle peut établir.
          </p>
          <p
            style={{
              fontSize: "15px",
              color: LIGHT.muted,
              maxWidth: "680px",
              margin: 0,
              lineHeight: 1.75,
            }}
          >
            C&apos;est ce déplacement qui commande notre méthode : constituer, à
            chaque étape, la preuve documentaire des choix effectués et de leur
            mise en œuvre.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        className="mx-auto"
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Notre méthode
        </div>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "40px",
            lineHeight: 1.25,
          }}
        >
          Mise en conformité RGPD : cartographier, organiser,
          <br />
          encadrer, documenter
        </h2>

        <div style={{ width: "100%" }}>
          <div
            className="methode-frise"
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: LIGHT.panel,
                border: "1px solid rgba(var(--famille-rgb),.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--famille-accent)",
                  fontFamily: "monospace",
                }}
              >
                01
              </span>
            </div>
            <div
              style={{ flex: 1, height: "1px", background: "rgba(var(--famille-rgb),0.4)" }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: LIGHT.panel,
                border: "1px solid rgba(var(--famille-rgb),.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--famille-accent)",
                  fontFamily: "monospace",
                }}
              >
                02
              </span>
            </div>
            <div
              style={{ flex: 1, height: "1px", background: "rgba(var(--famille-rgb),0.4)" }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: LIGHT.panel,
                border: "1px solid rgba(var(--famille-rgb),.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--famille-accent)",
                  fontFamily: "monospace",
                }}
              >
                03
              </span>
            </div>
            <div
              style={{ flex: 1, height: "1px", background: "rgba(var(--famille-rgb),0.4)" }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: LIGHT.panel,
                border: "1px solid rgba(var(--famille-rgb),.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--famille-accent)",
                  fontFamily: "monospace",
                }}
              >
                04
              </span>
            </div>
          </div>

          <div className="methode-grid">
            {[
              {
                titre: "Cartographier",
                resume: "Savoir ce que vous traitez — et pourquoi",
                detail:
                  "Cartographie des traitements, registre Art. 30 avec base légale documentée, identification des AIPD nécessaires.",
                livrable: "Registre des traitements",
              },
              {
                titre: "Organiser",
                resume: "Répartir les rôles et les responsabilités",
                detail:
                  "DPO interne ou externe, politiques internes, procédures de réponse aux droits des personnes, comités de suivi.",
                livrable: "Politiques et procédures internes",
              },
              {
                titre: "Encadrer",
                resume: "Maîtriser votre exposition contractuelle et technique",
                detail:
                  "Contrats sous-traitants Art. 28, clauses négociées, transferts hors UE (CCT, BCR), mesures de sécurité Art. 32 et protection des données dès la conception (privacy by design, Art. 25).",
                livrable: "Contrats sous-traitants Art. 28",
              },
              {
                titre: "Documenter",
                resume: "Être prêt à démontrer, à tout moment",
                detail:
                  "Procédures de violation et de notification CNIL, traçabilité des décisions, documentation tenue à jour en vue d'un contrôle.",
                livrable: "Dossier de conformité",
              },
            ].map((etape, i) => (
              <div key={etape.titre} style={{ paddingRight: i < 3 ? "24px" : 0 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: LIGHT.text,
                    marginBottom: "6px",
                    lineHeight: 1.25,
                  }}
                >
                  {etape.titre}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: LIGHT.muted,
                    lineHeight: 1.6,
                    marginBottom: "6px",
                  }}
                >
                  {etape.resume}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: LIGHT.faint,
                    lineHeight: 1.6,
                    marginBottom: "10px",
                  }}
                >
                  {etape.detail}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#15603f",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    lineHeight: 1.5,
                  }}
                >
                  Livrable · {etape.livrable}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <section
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
        className="mx-auto"
      >
        <p
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Ce que vous recevez
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "32px",
            lineHeight: 1.25,
          }}
        >
          Ce que vous recevez
        </h2>
        <LivrablesPreview />
      </section>

      {/* DPO EXTERNE (section 7) */}
      <section
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
        className="mx-auto"
      >
        <p
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          DPO externe
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "720px",
            marginBottom: "16px",
            lineHeight: 1.25,
          }}
        >
          DPO externe et accompagnement du DPO interne
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            marginBottom: "20px",
            lineHeight: 1.75,
          }}
        >
          Le règlement impose la désignation d&apos;un délégué à la protection
          des données dans certains cas (art. 37). Selon votre organisation, le
          cabinet exerce la fonction en DPO externalisé ou appuie le délégué en
          place — tenue du registre, analyses d&apos;impact, sensibilisation des
          équipes, relations avec la CNIL.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            color: BRAND,
            textDecoration: "underline",
          }}
        >
          Parler de votre DPO externalisé →
        </a>
      </section>

      {/* CONTRÔLE CNIL & VIOLATION (section 8) */}
      <section
        id="controle-cnil"
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
          scrollMarginTop: "80px",
        }}
        className="mx-auto"
      >
        <p
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Contrôle CNIL &amp; violation
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "760px",
            marginBottom: "16px",
            lineHeight: 1.25,
          }}
        >
          Contrôle CNIL, violation de données et responsabilité des
          sous-traitants
        </h2>
        {/* Sous-bloc A — Contrôle CNIL */}
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: LIGHT.text,
            margin: "0 0 10px",
            lineHeight: 1.3,
          }}
        >
          Contrôle CNIL
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            marginBottom: "28px",
            lineHeight: 1.75,
          }}
        >
          Lorsqu&apos;un contrôle s&apos;ouvre, le cabinet prépare le dossier et
          sélectionne les pièces à produire, répond aux demandes de la
          délégation de la CNIL, rédige les observations écrites et, si la
          procédure se poursuit, assure la défense devant la formation
          restreinte. L&apos;objectif reste le même à chaque étape : présenter
          une conformité déjà documentée, plutôt que de la reconstituer dans
          l&apos;urgence.
        </p>

        {/* Sous-bloc B — Violation de données */}
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: LIGHT.text,
            margin: "0 0 10px",
            lineHeight: 1.3,
          }}
        >
          Violation de données
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            marginBottom: "16px",
            lineHeight: 1.75,
          }}
        >
          Une violation doit être notifiée à la CNIL dans les meilleurs délais
          et au plus tard sous soixante-douze heures lorsqu&apos;elle présente
          un risque pour les droits et libertés des personnes, et les personnes
          concernées informées lorsque ce risque est élevé (art. 33 et 34). Le
          délai court à compter de la prise de connaissance effective — une
          notion qui se discute.
        </p>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            marginBottom: "20px",
            lineHeight: 1.75,
          }}
        >
          Lorsque l&apos;incident survient chez un prestataire, la répartition
          des responsabilités dépend des clauses de sous-traitance. Des clauses
          inadaptées fragilisent la maîtrise contractuelle du risque et
          compliquent la détermination des responsabilités après coup.
        </p>
        <p
          style={{
            fontSize: "13px",
            color: LIGHT.muted,
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          Une même violation peut aussi relever de la{" "}
          <a
            href="/nos-domaines/cybersecurite/nis2"
            style={{ color: BRAND, textDecoration: "underline" }}
          >
            directive NIS 2
          </a>{" "}
          ; et lorsque l&apos;incident relève du terrain pénal,{" "}
          <a
            href="/nos-domaines/cybercriminalite"
            style={{ color: BRAND, textDecoration: "underline" }}
          >
            avocat en cybercriminalité
          </a>
          .
        </p>
      </section>

      {/* DUE DILIGENCE & M&A (section 9) */}
      <section
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
        className="mx-auto"
      >
        <p
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Opérations
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "720px",
            marginBottom: "12px",
            lineHeight: 1.25,
          }}
        >
          Due diligence RGPD et opérations M&amp;A
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            margin: 0,
            lineHeight: 1.75,
          }}
        >
          Un fichier clients constitué ou exploité sans base légale peut voir sa
          licéité contestée, ce qui pèse sur sa cessibilité et sa valorisation.
          Nous intervenons en due diligence, côté acquéreur comme côté cible :
          régularisation avant closing, garanties d&apos;actif et de passif RGPD
          rédigées et négociées.{" "}
          <a
            href="/competences/ma-tech"
            style={{ color: BRAND, textDecoration: "underline" }}
          >
            Notre accompagnement M&amp;A tech →
          </a>
        </p>
      </section>

      {/* Situations fréquentes */}
      <section
        className="mx-auto"
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Sur le terrain
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "12px",
            lineHeight: 1.25,
          }}
        >
          Ce que nous voyons le plus souvent
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "560px",
            marginBottom: "28px",
            lineHeight: 1.7,
          }}
        >
          Les situations les plus fréquentes — et ce qui se passe concrètement
          quand elles ne sont pas anticipées.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {([
            {
              title: "Outils SaaS américains utilisés sans encadrement",
              sub: "Des outils SaaS empilés — sans encadrement contractuel suffisant ni documentation des traitements et des transferts",
              expand:
                "Le Cloud Act américain peut contraindre l'hébergeur à transmettre vos données sans vous prévenir. Sans contrat Art. 28 conforme, vous restez responsable en cas de violation.",
              link: {
                href: "/nos-domaines/contrats-informatiques",
                label: "Encadrer vos contrats IT →",
              },
            },
            {
              title: "Registre des traitements inexistant ou obsolète",
              sub: "La base légale de chaque traitement n'est pas documentée",
              expand:
                "La CNIL peut sanctionner même sans violation effective. Sans registre à jour, impossible de démontrer la conformité lors d'un contrôle ou d'une due diligence investisseur.",
            },
            {
              title: "DRH qui utilise une IA générative avec des données RH",
              sub: "CV, évaluations, données salariés — sans encadrement IA",
              expand:
                "Double exposition : RGPD et AI Act (système IA à risque élevé). Le salarié peut exercer son droit d'opposition. La CNIL a déjà ouvert des enquêtes sur ce sujet.",
              link: {
                href: "/nos-domaines/ia-act",
                label: "Conformité AI Act →",
              },
            },
            {
              title: "Lancement d'appli mobile sans mise en conformité",
              sub: "Géolocalisation, cookies, données utilisateurs non encadrés",
              expand:
                "La CNIL surveille activement les applis mobiles. Une plainte utilisateur suffit à déclencher un contrôle. Les données de géolocalisation sont sensibles — leur collecte sans consentement valide expose à une sanction immédiate.",
            },
            {
              title: "Salarié qui demande l'accès à tous ses emails",
              sub: "Droit d'accès exercé en contexte de conflit RH",
              expand:
                "Sans procédure documentée, l'entreprise doit répondre sous un mois. Un refus ou retard expose à une réclamation CNIL. Nous structurons la réponse juridique tout en protégeant les intérêts de l'entreprise.",
            },
            {
              title: "Levée de fonds qui révèle des non-conformités",
              sub: "Due diligence investisseur — le RGPD devient un enjeu de valorisation",
              expand:
                "Un fichier prospects sans consentement valide peut être qualifié d'actif illicite — impact direct sur la valorisation. Nous accompagnons les fondateurs dans la régularisation pré-closing.",
            },
          ] as Array<{
            title: string;
            sub: string;
            expand: string;
            link?: { href: string; label: string };
          }>).map((item, index) => {
            const isOpen = openTerrainCard === index;
            return (
              <div
                key={item.title}
                onClick={() => {
                  if (!terrainMountedRef.current) return;
                  setOpenTerrainCard((prev) => (prev === index ? null : index));
                }}
                style={{
                  background: LIGHT.panel,
                  border: `1px solid ${isOpen ? "rgba(var(--brand-rgb),.35)" : LIGHT.border}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) e.currentTarget.style.borderColor = "rgba(var(--brand-rgb),.4)";
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) e.currentTarget.style.borderColor = LIGHT.border;
                }}
              >
                <div style={{ padding: "14px 14px 12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: ACCENT,
                        fontFamily: "monospace",
                        fontSize: "11px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: LIGHT.faint, fontSize: "14px", lineHeight: 1 }}>
                      {isOpen ? "×" : "+"}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: LIGHT.text,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "11px",
                      color: LIGHT.faint,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.sub}
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    borderTop: isOpen ? `1px solid ${LIGHT.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      borderLeft: "2px solid rgba(var(--famille-rgb),.4)",
                      background: "rgba(var(--famille-rgb),.07)",
                      padding: "10px 12px",
                      margin: "10px 12px 12px",
                    }}
                  >
                    <div
                      style={{
                        color: "#15603f",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        marginBottom: "6px",
                      }}
                    >
                      CE QUI SE PASSE SANS ENCADREMENT
                    </div>
                    <div
                      style={{
                        color: LIGHT.muted,
                        fontSize: "11px",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.expand}
                    </div>
                    {item.link ? (
                      <a
                        href={item.link.href}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-block",
                          marginTop: "10px",
                          fontSize: "11px",
                          color: BRAND,
                          textDecoration: "underline",
                        }}
                      >
                        {item.link.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* NOTRE CONVICTION (section 11) — citation + portrait + vidéo */}
      <section
        className="mx-auto"
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
      >
        <h2 style={SR_ONLY}>Notre conviction</h2>
        <p
          aria-hidden="true"
          style={{
            fontSize: "10px",
            fontWeight: 400,
            color: ACCENT,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Notre conviction
        </p>
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] md:items-start"
          style={{
            padding: "24px",
            background: LIGHT.panel2,
            border: `1px solid ${LIGHT.border}`,
            borderRadius: "12px",
          }}
        >
          {/* Ordre : portrait, puis nom et fonction. La citation suit dans la
              colonne de droite. Portrait grand format, encadré de fonction. */}
          <figure style={{ margin: 0 }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                borderRadius: "12px",
                overflow: "hidden",
                border: `0.5px solid ${LIGHT.border}`,
              }}
            >
              <Image
                src="/images/equipe/sarah-hinderer.webp"
                alt="Portrait de Me Sarah Hinderer, avocate aux barreaux de Paris et de Montréal"
                fill
                sizes="(max-width: 767px) 100vw, 240px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <figcaption>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: LIGHT.text,
                  margin: "12px 0 0",
                  lineHeight: 1.35,
                }}
              >
                Me Sarah Hinderer
              </p>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "monospace",
                  fontSize: "9px",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: LIGHT.muted,
                  border: `1px solid ${LIGHT.border}`,
                  padding: "3px 8px",
                  marginTop: "8px",
                }}
              >
                Avocate aux barreaux de Paris et de Montréal
              </span>
              <p
                style={{
                  fontSize: "12px",
                  color: LIGHT.faint,
                  margin: "8px 0 0",
                  lineHeight: 1.5,
                }}
              >
                Données personnelles &amp; intelligence artificielle
              </p>
            </figcaption>
          </figure>
          <div>
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: "16px",
                color: LIGHT.text,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              « Le RGPD n&apos;est pas seulement une contrainte — c&apos;est un
              système de preuve. Les entreprises qui le maîtrisent arrivent au
              contrôle avec une conformité déjà documentée, plutôt que de devoir
              la reconstituer dans l&apos;urgence. »
            </p>
            {/* TODO (cabinet) : réintégrer ici la vidéo d'introduction de
                Me Sarah Hinderer une fois qu'elle sera prête. Elle prenait place
                sous la citation (source Vercel Blob : rgpd-intro.mp4), en
                width 100%, borderRadius 12px, controls + playsInline. */}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="mx-auto"
        style={{
          maxWidth: 900,
          padding: "56px 24px",
          borderTop: `1px solid ${LIGHT.border}`,
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: ACCENT,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Questions fréquentes
        </p>
        <h2
          style={{
            fontSize: "clamp(22px, 2.8vw, 30px)",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "24px",
            lineHeight: 1.25,
          }}
        >
          Ce que nous demandent les dirigeants
        </h2>
        <FaqAccordion />
      </section>

      {/* CTA FINAL */}
      <section
        className="relative mx-auto overflow-hidden"
        style={{
          maxWidth: 900,
          padding: "56px 40px",
          background: DARK.bg,
          margin: "32px auto 80px",
          borderRadius: "12px",
          border: `0.5px solid rgba(${BRAND_RGB},0.15)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 50%, rgba(${BRAND_RGB},0.15) 0%, transparent 60%)`,
            animation: "glowMove 6s ease-in-out infinite alternate",
          }}
          aria-hidden
        />
        <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2
              style={{
                fontSize: "clamp(22px, 2.8vw, 30px)",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "12px",
                lineHeight: 1.25,
              }}
            >
              Vous préparez une opération, anticipez un contrôle ou structurez
              votre conformité ?
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Audit RGPD, due diligence M&A, mise en conformité.
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,.2)",
                marginTop: "8px",
                fontStyle: "italic",
              }}
            >
              Depuis 2016, nous accompagnons des entreprises du numérique sur
              leurs enjeux RGPD — startups en lancement, ETI en levée de fonds,
              groupes en acquisition.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <a
              href="/contact"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: BRAND,
                color: "white",
                padding: "14px 28px",
                borderRadius: "4px",
                fontSize: "12px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                boxShadow: ctaHover
                  ? `0 0 20px rgba(${BRAND_RGB},0.5)`
                  : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Nous contacter →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
