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

const HERO_STATS = [
  {
    value: 20,
    suffix: "M€",
    label: "sanction maximale ou 4% CA mondial",
    source: "RGPD Art. 83 §5",
  },
  {
    value: 72,
    suffix: "h",
    label: "notification CNIL après violation",
    source: "RGPD Art. 33",
  },
  {
    display: "Art.25",
    label: "Privacy by Design & by Default",
    source: "RGPD Art. 25",
  },
  {
    display: "Art.30",
    label: "Registre des traitements obligatoire",
    source: "RGPD Art. 30",
  },
] as const;

function LivrablesPreview() {
  const [cur, setCur] = useState(0);

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
    {
      num: "06",
      name: "Vigie — conformité continue",
      sub: "Vos documents tenus à jour, pas un audit oublié",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const timer = setInterval(() => {
      if (isMounted) setCur((c) => (c + 1) % 6);
    }, 5000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

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

    // DOC 5 — Vigie
    <div
      key="5"
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
        Conformité continue — pas un audit oublié
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "12px" }}>
        Espace client réservé · Abonnement mensuel
      </div>
      {[
        "Registre des traitements centralisé et mis à jour",
        "Suivi des sous-traitants et contrats Art. 28",
        "Gestion des incidents et violations documentée",
        "Documentation prête en cas de contrôle CNIL",
      ].map((line) => (
        <div
          key={line}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            marginBottom: "6px",
            fontSize: "8.5px",
            color: "#444",
            lineHeight: 1.55,
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#1D9E75",
              flexShrink: 0,
              marginTop: "4px",
            }}
          />
          <span>{line}</span>
        </div>
      ))}
      <div
        style={{
          display: "inline-block",
          marginTop: "10px",
          background: "rgba(29,158,117,.1)",
          color: "#5dc9a0",
          fontSize: "9px",
          borderRadius: "2px",
          padding: "3px 8px",
        }}
      >
        Disponible après mission initiale
      </div>
    </div>,
  ];

  // Ordre d'affichage (A6) : le DPA passe en premier. Les blocs `docs` restent
  // définis dans leur ordre historique ; `order` mappe l'index affiché (celui
  // du menu et de `cur`) vers le bloc et son bandeau.
  const order = [2, 3, 0, 1, 4, 5];
  const docBadges = [
    "Registre Art.30",
    "Procédure Art.33",
    "DPA Art.28",
    "Politique RGPD",
    "Due Diligence M&A",
    "Vigie by Lazarègue Avocats",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "center",
      }}
    >
      <div>
        {items.map((item, i) => (
          <h3 key={i} style={{ margin: 0 }}>
            <button
              type="button"
              onClick={() => setCur(i)}
              id={`livrable-tab-${i}`}
              aria-controls={`livrable-doc-${i}`}
              aria-current={cur === i ? "true" : undefined}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "10px 0",
                border: "none",
                borderBottom: i < 5 ? `.5px solid ${LIGHT.border}` : "none",
                background: "none",
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
        <div
          style={{
            height: "2px",
            background: LIGHT.border,
            marginTop: "14px",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            key={cur}
            style={{
              height: "100%",
              background: BRAND,
              borderRadius: "1px",
              animation: "progressAnim 5s linear forwards",
            }}
          />
        </div>
        <style>{`@keyframes progressAnim { from { width: 0% } to { width: 100% } }`}</style>
        <p
          style={{
            marginTop: "12px",
            fontFamily: "monospace",
            fontSize: "9px",
            letterSpacing: ".08em",
            color: LIGHT.faint,
          }}
        >
          SPÉCIMENS · AUCUNE DONNÉE RÉELLE
        </p>
      </div>

      <div style={{ position: "relative", height: "320px" }}>
        {order.map((docIdx, i) => (
          <div
            key={i}
            id={`livrable-doc-${i}`}
            role="group"
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
    </div>
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
  const value =
    "display" in stat && stat.display
      ? stat.display
      : `${"value" in stat ? stat.value : 0}${"suffix" in stat ? stat.suffix : ""}`;

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
      `}</style>

      {/* HERO */}
      <section style={{ background: DARK.bg, position: "relative", overflow: "hidden" }}>
        <div
          className="relative"
          style={{ ...INNER, padding: "64px 24px" }}
        >
          <div
            className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.25) 0%, transparent 70%)`,
              animation: "glowMove 8s ease-in-out infinite alternate",
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <FadeUp delay={0}>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em",
                  marginBottom: "16px",
                }}
              >
                Nos domaines ·{" "}
                <span style={{ color: ACCENT }}>RGPD & Données</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "12px",
                  lineHeight: 1.2,
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
                  Voir nos cas clients
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
          <h2
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
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {HERO_STATS.map((stat) => (
              <StatRow key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* DANS QUELLES SITUATIONS (section 3) */}
      <section style={{ background: DARK.bg, borderTop: `1px solid ${DARK.border}` }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
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
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 600,
              color: "#ffffff",
              maxWidth: "720px",
              marginBottom: "12px",
              lineHeight: 1.35,
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
            Les signaux qui justifient de sécuriser vos traitements — souvent
            avant qu&apos;un contrôle ou une opération ne les révèle.
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
        <div style={{ ...INNER, padding: SECTION_PAD }}>
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
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 600,
              color: LIGHT.text,
              maxWidth: "720px",
              marginBottom: "20px",
              lineHeight: 1.35,
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
            fontSize: "20px",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "40px",
            lineHeight: 1.25,
          }}
        >
          Cartographier, organiser,
          <br />
          encadrer, documenter
        </h2>

        <div style={{ width: "100%" }}>
          <div
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0",
            }}
          >
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
                  "Contrats sous-traitants Art. 28, clauses négociées, transferts hors UE (CCT, BCR), mesures de sécurité Art. 32.",
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
                    lineHeight: 1.35,
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
          Ce que nous livrons
        </p>
        <h2
          style={{
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "32px",
            lineHeight: 1.35,
          }}
        >
          Des spécimens documentés, pas des modèles
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
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "720px",
            marginBottom: "16px",
            lineHeight: 1.35,
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
          cabinet exerce la fonction ou appuie le délégué en place — tenue du
          registre, analyses d&apos;impact, sensibilisation des équipes,
          relations avec la CNIL.
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            color: LIGHT.faint,
            cursor: "default",
          }}
        >
          Découvrir notre offre DPO externe →
          <span
            style={{
              fontSize: "9px",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: LIGHT.faint,
              border: `1px solid ${LIGHT.border}`,
              borderRadius: "3px",
              padding: "2px 6px",
            }}
          >
            Page à venir
          </span>
        </span>
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
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "760px",
            marginBottom: "16px",
            lineHeight: 1.35,
          }}
        >
          Contrôle CNIL, violation de données et responsabilité des
          sous-traitants
        </h2>
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
          L&apos;incident relève aussi du terrain pénal ?{" "}
          <a
            href="/nos-domaines/cybercriminalite"
            style={{ color: BRAND, textDecoration: "underline" }}
          >
            Avocat en cybercriminalité
          </a>
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
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "720px",
            marginBottom: "12px",
            lineHeight: 1.35,
          }}
        >
          Due diligence RGPD et opérations M&amp;A
        </h2>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: LIGHT.text,
            maxWidth: "720px",
            marginBottom: "16px",
            lineHeight: 1.5,
          }}
        >
          Un fichier non conforme peut être déclaré illicite.
        </p>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            marginBottom: "16px",
            lineHeight: 1.75,
          }}
        >
          Dans toute opération de fusion-acquisition ou levée de fonds, le
          niveau de conformité RGPD est audité. Un fichier clients sans base
          légale peut être qualifié d&apos;actif illicite et peser sur la
          valorisation de la cible.
        </p>
        <p
          style={{
            fontSize: "14px",
            color: LIGHT.muted,
            maxWidth: "720px",
            margin: 0,
            lineHeight: 1.75,
          }}
        >
          Nous intervenons en due diligence, côté acquéreur comme côté cible :
          identification des non-conformités, régularisation avant closing,
          garanties d&apos;actif et de passif RGPD rédigées et négociées.
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
            fontSize: "20px",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "12px",
            lineHeight: 1.35,
          }}
        >
          Ce que nous voyons chaque semaine
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
          {[
            {
              title: "Outils SaaS américains utilisés sans encadrement",
              sub: "Des outils SaaS empilés — sans encadrement contractuel suffisant ni documentation des traitements et des transferts",
              expand:
                "Le Cloud Act américain peut contraindre l'hébergeur à transmettre vos données sans vous prévenir. Sans contrat Art. 28 conforme, vous restez responsable en cas de violation.",
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
          ].map((item, index) => {
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Maillage interne : ces situations débordent du seul RGPD. */}
        <p
          style={{
            marginTop: "22px",
            fontSize: "13px",
            color: LIGHT.muted,
            lineHeight: 1.8,
            maxWidth: "68ch",
          }}
        >
          Ces situations dépassent souvent le seul RGPD. Les outils SaaS et le Cloud
          Act relèvent aussi de vos{" "}
          <a
            href="/nos-domaines/contrats-informatiques"
            style={{ color: BRAND, textDecoration: "underline" }}
          >
            contrats IT
          </a>{" "}
          ; une violation de données peut déclencher simultanément une notification
          CNIL et une obligation au titre de{" "}
          <a
            href="/nos-domaines/cybersecurite/nis2"
            style={{ color: BRAND, textDecoration: "underline" }}
          >
            la directive NIS 2
          </a>{" "}
          ; et l&apos;usage d&apos;IA générative croise le{" "}
          <a href="/nos-domaines/ia-act" style={{ color: BRAND, textDecoration: "underline" }}>
            règlement européen sur l&apos;intelligence artificielle
          </a>
          .
        </p>
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
        <h2
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
        </h2>
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center"
          style={{
            padding: "24px",
            background: LIGHT.panel2,
            border: `1px solid ${LIGHT.border}`,
            borderRadius: "12px",
          }}
        >
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
              système de preuve. Les entreprises qui le maîtrisent vraiment ne
              subissent pas les contrôles. Elles les anticipent. »
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src="/images/sarah-pro.jpg"
                alt="Me Sarah Hinderer"
                width={44}
                height={44}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontSize: "13px",
                  color: LIGHT.muted,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                — Me Sarah Hinderer
                <br />
                Données personnelles &amp; intelligence artificielle
              </p>
            </div>
          </div>
          <video
            width="100%"
            style={{ borderRadius: "12px" }}
            controls
            playsInline
          >
            <source
              src="https://dwhsfozwid3mrmrl.public.blob.vercel-storage.com/rgpd-intro.mp4"
              type="video/mp4"
            />
          </video>
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
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            color: LIGHT.text,
            marginBottom: "24px",
            lineHeight: 1.35,
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
          border: `0.5px solid rgba(${ACCENT_RGB},0.15)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 50%, rgba(${ACCENT_RGB},0.15) 0%, transparent 60%)`,
            animation: "glowMove 6s ease-in-out infinite alternate",
          }}
          aria-hidden
        />
        <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          <div>
            <h2
              style={{
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "12px",
                lineHeight: 1.35,
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

          <div className="flex justify-center">
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "20px",
                width: "100%",
                maxWidth: "280px",
                textAlign: "center",
              }}
            >
              {/* Balise <img> brute auparavant : le fichier de 1200 px était
                  servi tel quel pour une vignette de 64 px. */}
              <Image
                src="/images/sarah-pro.jpg"
                alt="Me Sarah Hinderer"
                width={64}
                height={64}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  margin: "0 auto 10px",
                  display: "block",
                }}
              />
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Me Sarah Hinderer
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  margin: "2px 0 0",
                  lineHeight: 1.4,
                }}
              >
                Données personnelles & intelligence artificielle
              </p>
            </div>
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
