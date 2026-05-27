"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const ACCENT = "#1D9E75";
const ACCENT_RGB = "29,158,117";

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

const SCENARIOS = [
  {
    color: "#1D9E75",
    label: "Scénario 1 — Contrôle CNIL",
    title: "Absence de registre, sanction sans violation effective",
    text: "La CNIL sanctionne le niveau de préparation, pas seulement les incidents. Sans registre à jour, sans base légale documentée pour chaque traitement, l'exposition est réelle — même si aucune donnée n'a été compromise.",
  },
  {
    color: "#1A47FF",
    label: "Scénario 2 — M&A & levée de fonds",
    title: "Due diligence RGPD : un fichier illicite peut bloquer une opération",
    text: "Dans toute opération de fusion-acquisition ou levée de fonds, le niveau de conformité RGPD est audité. Un fichier clients sans base légale peut être déclaré illicite — avec impact direct sur la valorisation.",
  },
  {
    color: "#BA7517",
    label: "Scénario 3 — Sous-traitant défaillant",
    title: "Violation chez un prestataire : vous êtes responsable",
    text: "Sans clause article 28 RGPD dans vos contrats IT ou cloud, vous restez exposé en cas de violation chez votre prestataire. L'absence de contrat conforme vous prive de tout recours.",
  },
] as const;

const TIMELINE = [
  {
    color: "#1D9E75",
    phase: "Cartographie & registre",
    summary: "Savoir ce que vous traitez — et pourquoi",
    items:
      "Cartographie des traitements, registre Art. 30 avec base légale, identification AIPD",
  },
  {
    color: "#1A47FF",
    phase: "Gouvernance & accountability",
    summary: "Démontrer la conformité, pas seulement la respecter",
    items: "DPO, politiques, comités, prêt contrôle CNIL en 48h",
  },
  {
    color: "#BA7517",
    phase: "Contrats & sous-traitants",
    summary: "Maîtriser votre exposition contractuelle",
    items:
      "Audit contrats IT/cloud/CRM, clauses Art. 28, transferts hors UE",
  },
  {
    color: "#9333EA",
    phase: "M&A & due diligence",
    summary: "Le RGPD comme levier de valorisation",
    items: "Due diligence complète, garanties actif/passif",
  },
] as const;

const DELIVERABLES = [
  "Registre des traitements avec base légale",
  "Procédures violations & notification CNIL",
  "Contrats sous-traitants Art. 28 conformes",
  "Politique confidentialité, mentions, chartes",
  "Rapport due diligence RGPD pour M&A",
] as const;

function LivrablesPreview() {
  const [cur, setCur] = useState(0);

  const items = [
    {
      num: "01",
      name: "Registre des traitements",
      sub: "Base légale documentée — absent de 80% des registres",
    },
    {
      num: "02",
      name: "Procédure violations CNIL",
      sub: "Grille d'évaluation du risque — critères concrets",
    },
    {
      num: "03",
      name: "DPA sous-traitant Art. 28",
      sub: "Clauses que les SaaS refusent — et comment négocier",
    },
    {
      num: "04",
      name: "Politique de confidentialité",
      sub: "Articulation droit du travail + cookies + secteur",
    },
    {
      num: "05",
      name: "Rapport due diligence M&A",
      sub: "Valorisation chiffrée du risque résiduel",
    },
    {
      num: "06",
      name: "Vigie — accès au portail de conformité continue",
      sub: "Vos documents à jour, supervisés par nos avocats",
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

    // DOC 2 — DPA négocié
    <div
      key="2"
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
        DPA — Clauses obtenues après négociation
      </div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>
        Prestataire SaaS · Version consolidée · Mai 2026
      </div>
      <div
        style={{
          marginBottom: "8px",
          paddingBottom: "8px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ fontWeight: 700, color: "#111", fontSize: "8.5px" }}>
          Art. 7 — Localisation des données (obtenu)
        </div>
        <div style={{ fontSize: "8px", color: "#444", marginTop: "3px" }}>
          Hébergement exclusivement dans l'UE. Tout transfert hors UE soumis à
          accord préalable écrit.
        </div>
        <div
          style={{
            background: "#f0f4ff",
            borderLeft: "2px solid #1A47FF",
            padding: "4px 7px",
            fontSize: "8px",
            color: "#333",
            marginTop: "4px",
          }}
        >
          💬 Version standard prévoyait une localisation "mondiale". Clause
          modifiée après négociation.
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, color: "#111", fontSize: "8.5px" }}>
          Art. 9 — Droit d'audit (obtenu)
        </div>
        <div style={{ fontSize: "8px", color: "#444", marginTop: "3px" }}>
          Droit d'audit annuel avec préavis 30 jours. Rapport SOC 2 Type II en
          substitution.
        </div>
        <div
          style={{
            background: "#f0f4ff",
            borderLeft: "2px solid #1A47FF",
            padding: "4px 7px",
            fontSize: "8px",
            color: "#333",
            marginTop: "4px",
          }}
        >
          💬 Refus initial contourné : certification SOC 2 acceptée + droit
          d'audit exceptionnel en cas d'incident.
        </div>
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
        SaaS RH · 45 000 utilisateurs · Acquisition · Mai 2026
      </div>
      <div style={{ display: "flex", gap: "6px", margin: "8px 0" }}>
        {[
          ["3", "Non-conformités critiques", "#c0392b"],
          ["5", "À régulariser", "#e6a817"],
          ["2,4M€", "Risque chiffré max.", "#1a7a50"],
        ].map(([n, l, c]) => (
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
            <div style={{ fontSize: "13px", fontWeight: 700, color: c }}>{n}</div>
            <div
              style={{ fontSize: "7px", color: "#888", marginTop: "1px", lineHeight: 1.3 }}
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
        Base de 180 000 prospects sans consentement valide. Risque de
        qualification en actif illicite. Impact valorisation : −350k€ à −800k€.
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
        Régularisation en 3 semaines + garantie d'actif et de passif RGPD à
        hauteur de 1,2M€ — clause rédigée et négociée.
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
        "Documentation prête en cas de contrôle CNIL sous 48h",
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
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,.25)",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Ce que nous livrons
        </p>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "white",
            marginBottom: "4px",
            lineHeight: 1.3,
          }}
        >
          Pas des modèles.
          <br />
          Des documents sur mesure.
        </h3>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", marginBottom: "20px" }}>
          Ce que LegalStart ne peut pas faire.
        </p>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setCur(i)}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "10px 0",
              borderBottom: i < 5 ? ".5px solid rgba(255,255,255,.05)" : "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: cur === i ? "#1D9E75" : "rgba(255,255,255,.2)",
                fontFamily: "monospace",
                width: "20px",
                flexShrink: 0,
                paddingTop: "1px",
              }}
            >
              {item.num}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "12px",
                  color: cur === i ? "white" : "rgba(255,255,255,.4)",
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: cur === i ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.18)",
                  lineHeight: 1.4,
                  marginTop: "2px",
                }}
              >
                {item.sub}
              </div>
            </div>
            {cur === i ? (
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#1D9E75",
                  flexShrink: 0,
                  marginTop: "5px",
                }}
              />
            ) : null}
          </div>
        ))}
        <div
          style={{
            height: "2px",
            background: "rgba(255,255,255,.05)",
            marginTop: "14px",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            key={cur}
            style={{
              height: "100%",
              background: "#1D9E75",
              borderRadius: "1px",
              animation: "progressAnim 5s linear forwards",
            }}
          />
        </div>
        <style>{`@keyframes progressAnim { from { width: 0% } to { width: 100% } }`}</style>
      </div>

      <div style={{ position: "relative", height: "320px" }}>
        {docs.map((doc, i) => (
          <div
            key={i}
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
                {
                  [
                    "Registre Art.30",
                    "Procédure Art.33",
                    "DPA Art.28",
                    "Politique RGPD",
                    "Due Diligence M&A",
                    "Vigie by Lazarègue Avocats",
                  ][i]
                }
              </span>
            </div>
            {doc}
          </div>
        ))}
      </div>
    </div>
  );
}

const INTERVENTIONS = [
  {
    num: "01",
    title: "Audit RGPD & cartographie des traitements",
    body: "Diagnostic complet : registre Art. 30, bases légales, contrats sous-traitants, sécurité, droits des personnes. La CNIL a sanctionné l'absence de documentation même sans violation effective. Plan d'action priorisé par niveau de risque.",
    footnote: "SAN-2019-005 · SAN-2020-018 · SAN-2021-020",
    tags: ["Registre Art.30", "Bases légales", "AIPD", "Gap analysis"],
  },
  {
    num: "02",
    title: "Gouvernance & accountability",
    body: "L'accountability signifie pouvoir prouver la conformité à tout moment — pas seulement la respecter. Un contrôle CNIL peut survenir sans préavis. Nous structurons la gouvernance, les procédures de droits des personnes et la documentation qui vous protège.",
    tags: ["DPO", "Politiques internes", "Accountability", "Droits personnes"],
  },
  {
    num: "03",
    title: "Privacy by Design & projets",
    body: "Tout produit ou outil développé sans analyse RGPD préalable peut être déclaré non conforme. L'article 32 impose des mesures de sécurité proportionnées — chiffrement, sauvegardes testées, contrôle des accès. La CNIL sanctionne l'absence de mesures même sans violation.",
    tags: ["Art.25 RGPD", "Privacy by Design", "Minimisation", "Cycle de vie"],
  },
  {
    num: "04",
    title: "Contrats sous-traitants & flux de données",
    body: "Sans clause Art. 28 conforme, vous restez responsable en cas de violation chez un prestataire — sans recours possible. Les transferts hors UE (Cloud Act, hébergeurs américains) nécessitent des garanties spécifiques (CCT, BCR) sous peine de suspension.",
    tags: ["Art.28 RGPD", "Cloud & SaaS", "Transferts UE", "CCT"],
  },
  {
    num: "05",
    title: "Due diligence RGPD — M&A & levées de fonds",
    body: "Dans toute levée de fonds ou M&A, un fichier non conforme peut être qualifié d'actif illicite — impact direct sur la valorisation. Nous avons accompagné des cibles dans la régularisation pré-closing en moins de 3 semaines.",
    tags: ["Due diligence", "M&A", "Levée de fonds", "Garanties A&P"],
  },
] as const;

const SITUATIONS = [
  {
    num: "01",
    text: "Registre des traitements jamais mis à jour ou inexistant",
  },
  {
    num: "02",
    text: "Outils SaaS et cloud utilisés sans cartographie ni contrat article 28",
  },
  {
    num: "03",
    text: "Base légale absente ou incorrecte pour les traitements marketing ou RH",
  },
  {
    num: "04",
    text: "Transferts de données hors UE non identifiés (outils américains, sous-traitants offshore)",
  },
  {
    num: "05",
    text: "Politique de conservation des données inexistante — données conservées indéfiniment",
  },
  {
    num: "06",
    text: "Droits des salariés insuffisamment encadrés — absence de procédure de réponse documentée",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Une PME de moins de 250 salariés doit-elle tenir un registre RGPD ?",
    a: "Juridiquement, l'obligation de registre ne vise en principe que les entreprises de 250 salariés et plus. Mais en pratique, toute PME qui met en œuvre des traitements non occasionnels ou à risque doit tenir un registre — car c'est la base de la démonstration de conformité (accountability) en cas de contrôle CNIL.",
  },
  {
    q: "Le RGPD s'applique-t-il aux outils d'IA générative ?",
    a: "Oui. Dès lors qu'un outil d'IA traite des données personnelles — même indirectement — le RGPD s'applique pleinement. Base légale, minimisation, durée de conservation, information des personnes : les obligations sont identiques. L'AI Act ajoute une couche supplémentaire pour les systèmes à risque élevé.",
  },
  {
    q: "Peut-on utiliser des outils américains (Google, Microsoft, Salesforce...) ?",
    a: "Oui, mais avec des garanties appropriées. Les transferts vers les États-Unis nécessitent des clauses contractuelles types (CCT) conformes à la décision d'adéquation UE-USA. En pratique, la plupart des grands éditeurs proposent ces garanties — mais elles doivent être vérifiées et documentées contrat par contrat.",
  },
  {
    q: "Une levée de fonds peut-elle révéler des risques RGPD ?",
    a: "Oui — et c'est l'un des angles les plus sous-estimés. Dans toute due diligence, les investisseurs vérifient la conformité RGPD. Un fichier clients sans base légale valide ou un contrat sous-traitant non conforme peut être qualifié d'actif illicite — avec impact direct sur la valorisation et les garanties négociées.",
  },
  {
    q: "Que risque réellement une PME en cas de contrôle CNIL ?",
    a: "Les sanctions peuvent atteindre 20M€ ou 4% du CA mondial. Mais au-delà du montant, c'est la publicité de la sanction qui frappe : les délibérations CNIL sont publiées en ligne. Plusieurs PME ont subi des pertes clients et partenaires directement liées à une sanction publiée. La CNIL sanctionne aussi l'absence de documentation — sans violation effective.",
  },
  {
    q: "Quels contrats doivent intégrer l'article 28 RGPD ?",
    a: "Tout contrat avec un prestataire qui traite des données personnelles pour votre compte : hébergeur, éditeur SaaS, agence marketing, cabinet de paie, intégrateur IT, prestataire RH. Sans clause article 28 conforme, vous restez responsable en cas de violation chez le prestataire — et vous perdez tout recours contractuel.",
  },
] as const;

const SEPARATOR = "0.5px solid rgba(255,255,255,0.06)";

type HeroStat = (typeof HERO_STATS)[number];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(active: boolean, target: number, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (!active) {
      if (isMounted) setValue(0);
      return () => {
        isMounted = false;
      };
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      if (!isMounted) return;
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * easeOutCubic(t)));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
    };
  }, [active, target, duration]);

  return value;
}

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

function ScrollRevealCard({
  children,
  delay = 0,
  hoverColor,
}: {
  children: ReactNode;
  delay?: number;
  hoverColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const el = ref.current;
    if (!el) {
      return () => {
        isMounted = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMounted) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
        border: `0.5px solid ${hovered ? hoverColor : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered ? `0 12px 32px ${hoverColor}22` : "none",
        borderRadius: "8px",
        background: "#0a0f1e",
        padding: "24px",
      }}
    >
      {children}
    </div>
  );
}

function StatRow({ stat, active }: { stat: HeroStat; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const numericValue =
    "value" in stat && stat.value !== undefined ? stat.value : 0;
  const count = useCountUp(active, "value" in stat ? numericValue : 0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 20px",
        borderBottom: SEPARATOR,
        background: hovered ? `rgba(${ACCENT_RGB},0.04)` : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      <p
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "white",
          margin: 0,
          textShadow: hovered
            ? `0 0 12px rgba(${ACCENT_RGB},0.5)`
            : "none",
          transition: "text-shadow 0.3s ease",
        }}
      >
        {"display" in stat && stat.display
          ? stat.display
          : `${count}${"suffix" in stat ? stat.suffix : ""}`}
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
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `rgba(${ACCENT_RGB},0.03)` : "#060912",
        border: `0.5px solid ${hovered ? `rgba(${ACCENT_RGB},0.2)` : "rgba(255,255,255,0.06)"}`,
        borderRadius: "6px",
        padding: "14px 16px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        transition: "background 0.3s ease, border-color 0.3s ease",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            style={{
              borderBottom: SEPARATOR,
              padding: "20px 0",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
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
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "white",
                  lineHeight: 1.45,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  color: ACCENT,
                  fontSize: "18px",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
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

function PulsingDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        animation: "pulse 2.5s ease-in-out infinite",
        boxShadow: `0 0 0 0 ${color}66`,
      }}
    />
  );
}

export default function RgpdDonneesPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const terrainMountedRef = useRef(true);
  const [statsActive, setStatsActive] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const [openTerrainCard, setOpenTerrainCard] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const el = statsRef.current;
    if (!el) {
      return () => {
        isMounted = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMounted) setStatsActive(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

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
      style={{
        background: "#060912",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
      }}
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
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(29, 158, 117, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(29, 158, 117, 0);
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
      <section
        className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 overflow-hidden lg:grid-cols-[1.2fr_1fr]"
        style={{ padding: "64px 48px" }}
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
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                marginBottom: "20px",
                lineHeight: 1.15,
              }}
            >
              RGPD & Données
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "520px",
                marginBottom: "20px",
              }}
            >
              Le RGPD n&apos;est pas qu&apos;une contrainte administrative.
              Bien maîtrisé, il devient un levier de confiance, un critère de
              sélection dans vos chaînes de valeur, et un atout dans vos
              opérations de financement.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.5)",
                borderLeft: `2px solid ${ACCENT}`,
                paddingLeft: "16px",
                maxWidth: "480px",
                marginBottom: "28px",
                lineHeight: 1.7,
              }}
            >
              Nous aidons les entreprises à garder le contrôle de leurs
              données, de leurs risques et de leur crédibilité.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mb-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                style={{
                  background: ACCENT,
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

        <FadeUp delay={0.2} className="relative z-10">
          <div
            ref={statsRef}
            style={{
              background: "#0a0f1e",
              border: `0.5px solid rgba(${ACCENT_RGB},0.15)`,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {HERO_STATS.map((stat) => (
              <StatRow key={stat.label} stat={stat} active={statsActive} />
            ))}
          </div>
        </FadeUp>
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* SCÉNARIOS */}
      <section style={{ padding: "64px 48px" }} className="mx-auto max-w-6xl">
        <h2
          style={{
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 600,
            maxWidth: "720px",
            marginBottom: "12px",
            lineHeight: 1.35,
          }}
        >
          Un fichier non conforme peut être déclaré illicite. Une due diligence
          peut tout révéler.
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.4)",
            maxWidth: "640px",
            marginBottom: "32px",
            lineHeight: 1.7,
          }}
        >
          Les situations où le RGPD crée un risque concret — que la plupart des
          dirigeants découvrent trop tard.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SCENARIOS.map((card, index) => (
            <ScrollRevealCard
              key={card.label}
              delay={index * 130}
              hoverColor={card.color}
            >
              <p
                style={{
                  fontSize: "10px",
                  color: card.color,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {card.text}
              </p>
            </ScrollRevealCard>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* TIMELINE */}
      <section
        className="mx-auto max-w-6xl"
        style={{
          padding: "64px 48px",
          borderTop: ".5px solid rgba(255,255,255,.06)",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,.25)",
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
            color: "white",
            marginBottom: "40px",
            lineHeight: 1.25,
          }}
        >
          4 étapes pour une conformité
          <br />
          qui se prouve
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
                background: "#0e1628",
                border: "1px solid rgba(29,158,117,.4)",
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
                  color: "#1D9E75",
                  fontFamily: "monospace",
                }}
              >
                01
              </span>
            </div>
            <div
              style={{ flex: 1, height: "1px", background: "rgba(29,158,117,0.4)" }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#0e1628",
                border: "1px solid rgba(29,158,117,.4)",
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
                  color: "#1D9E75",
                  fontFamily: "monospace",
                }}
              >
                02
              </span>
            </div>
            <div
              style={{ flex: 1, height: "1px", background: "rgba(29,158,117,0.4)" }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#0e1628",
                border: "1px solid rgba(29,158,117,.4)",
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
                  color: "#1D9E75",
                  fontFamily: "monospace",
                }}
              >
                03
              </span>
            </div>
            <div
              style={{ flex: 1, height: "1px", background: "rgba(29,158,117,0.4)" }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#0e1628",
                border: "1px solid rgba(29,158,117,.4)",
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
                  color: "#1D9E75",
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
            <div style={{ paddingRight: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "6px",
                  lineHeight: 1.35,
                }}
              >
                Cartographie & registre
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,.35)",
                  lineHeight: 1.6,
                  marginBottom: "6px",
                }}
              >
                Savoir ce que vous traitez — et pourquoi
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.2)",
                  lineHeight: 1.6,
                }}
              >
                Registre Art. 30 avec base légale documentée. Identification des
                AIPD nécessaires.
              </div>
            </div>
            <div style={{ paddingRight: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "6px",
                  lineHeight: 1.35,
                }}
              >
                Gouvernance & accountability
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,.35)",
                  lineHeight: 1.6,
                  marginBottom: "6px",
                }}
              >
                Démontrer la conformité, pas seulement la respecter
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.2)",
                  lineHeight: 1.6,
                }}
              >
                DPO, politiques, comités. Prêt pour un contrôle CNIL en 48h.
              </div>
            </div>
            <div style={{ paddingRight: "24px" }}>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "6px",
                  lineHeight: 1.35,
                }}
              >
                Contrats & sous-traitants
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,.35)",
                  lineHeight: 1.6,
                  marginBottom: "6px",
                }}
              >
                Maîtriser votre exposition contractuelle
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.2)",
                  lineHeight: 1.6,
                }}
              >
                DPA Art. 28 sur mesure, clauses négociées, transferts hors UE
                (CCT, BCR).
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "6px",
                  lineHeight: 1.35,
                }}
              >
                M&A & due diligence
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,.35)",
                  lineHeight: 1.6,
                  marginBottom: "6px",
                }}
              >
                Le RGPD comme levier de valorisation
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,.2)",
                  lineHeight: 1.6,
                }}
              >
                Due diligence complète, risque chiffré, garanties d&apos;actif et
                de passif rédigées.
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{ height: ".5px", background: "rgba(255,255,255,.06)", margin: "40px 0" }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div>
            <blockquote
              style={{
                borderLeft: "2px solid #1D9E75",
                paddingLeft: "20px",
                fontSize: "15px",
                fontStyle: "italic",
                color: "rgba(255,255,255,.7)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              « Le RGPD n&apos;est pas seulement une contrainte — c&apos;est un système
              de preuve. Les entreprises qui le maîtrisent vraiment ne subissent pas
              les contrôles. Elles les anticipent. »
            </blockquote>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,.3)",
                marginTop: "12px",
                paddingLeft: "20px",
              }}
            >
              — Me Sarah Hinderer · Données personnelles & intelligence artificielle
            </div>
          </div>

          <div
            style={{
              background: "#0a0f1e",
              border: ".5px solid rgba(29,158,117,.2)",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              minWidth: "280px",
            }}
          >
            <img
              src="/images/sarah-hinderer.png"
              alt="Me Sarah Hinderer"
              width={120}
              height={140}
              style={{
                width: "120px",
                height: "140px",
                objectFit: "cover",
                objectPosition: "center top",
                flexShrink: 0,
              }}
            />
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "white", lineHeight: 1.3 }}>
                Me Sarah Hinderer
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.35)", marginTop: "3px" }}>
                Données personnelles & IA
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#5dc9a0",
                    animation: "pulse 2.5s infinite",
                    boxShadow: "0 0 0 0 rgba(29, 158, 117, 0.4)",
                  }}
                />
                <span style={{ color: "#5dc9a0", fontSize: "10px" }}>
                  Disponible aujourd&apos;hui
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "64px 48px",
          borderTop: ".5px solid rgba(255,255,255,.06)",
        }}
        className="mx-auto max-w-6xl"
      >
        <LivrablesPreview />
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* INTERVENTIONS */}
      <section style={{ padding: "64px 48px" }} className="mx-auto max-w-6xl">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "32px",
          }}
        >
          Nos 5 interventions
        </h2>
        <div className="flex flex-col gap-0">
          {INTERVENTIONS.map((item, index) => (
            <div
              key={item.num}
              style={{
                padding: "28px 0",
                borderTop: index === 0 ? SEPARATOR : undefined,
                borderBottom: SEPARATOR,
              }}
            >
              <div className="flex flex-wrap items-start gap-4">
                <span
                  className="font-mono"
                  style={{
                    fontSize: "14px",
                    color: ACCENT,
                    minWidth: "32px",
                  }}
                >
                  {item.num}
                </span>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "white",
                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.75,
                      marginBottom: "14px",
                      maxWidth: "720px",
                    }}
                  >
                    {item.body}
                  </p>
                  {"footnote" in item && item.footnote ? (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "monospace",
                        marginTop: "4px",
                        marginBottom: "14px",
                        maxWidth: "720px",
                      }}
                    >
                      {item.footnote}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.35)",
                          background: `rgba(${ACCENT_RGB},0.08)`,
                          padding: "3px 8px",
                          borderRadius: "3px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RGPD comme levier */}
      <section
        className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12"
        style={{
          background: "#0a0f1e",
          borderTop: SEPARATOR,
          borderBottom: SEPARATOR,
          padding: "40px 48px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "10px",
              color: ACCENT,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            RGPD comme levier
          </p>
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 600,
              marginBottom: "16px",
              lineHeight: 1.35,
            }}
          >
            Un RGPD maîtrisé devient un avantage concurrentiel durable.
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Les entreprises qui anticipent leur conformité RGPD accèdent plus
            facilement aux marchés publics, lèvent des fonds dans de meilleures
            conditions et négocient en position de force avec leurs clients grands
            comptes. Ce n&apos;est pas une obligation — c&apos;est un signal de
            solidité et de gouvernance.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {[
            "Critère de sélection dans les appels d'offres publics et privés",
            "Argument de crédibilité face aux investisseurs et partenaires internationaux",
            "Protection en cas de litige ou de contrôle — la conformité documentée réduit les sanctions",
          ].map((item) => (
            <div key={item} className="flex gap-3" style={{ alignItems: "flex-start" }}>
              <span
                style={{
                  color: ACCENT,
                  fontSize: "14px",
                  lineHeight: 1.5,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                ✓
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.55,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Situations fréquentes */}
      <section
        className="mx-auto max-w-6xl"
        style={{
          background: "#0a0f1e",
          padding: "64px 48px",
          borderTop: ".5px solid rgba(255,255,255,.06)",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,.25)",
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
            marginBottom: "12px",
            lineHeight: 1.35,
          }}
        >
          Ce que nous voyons chaque semaine
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.4)",
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
              sub: "Notion, Slack, HubSpot, ChatGPT — sans DPA ni base légale",
              expand:
                "Le Cloud Act américain peut contraindre l'hébergeur à transmettre vos données sans vous prévenir. Sans contrat Art. 28 conforme, vous restez responsable en cas de violation — sans recours possible contre le prestataire.",
            },
            {
              title: "Registre des traitements inexistant ou obsolète",
              sub: "La base légale de chaque traitement n'est pas documentée",
              expand:
                "La CNIL peut sanctionner même sans violation effective. Sans registre à jour, impossible de démontrer la conformité lors d'un contrôle ou d'une due diligence investisseur.",
            },
            {
              title: "DRH qui utilise ChatGPT avec des données RH",
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
                  background: "#0a0f1e",
                  border: `.5px solid ${isOpen ? "rgba(29,158,117,.25)" : "rgba(255,255,255,.06)"}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen) e.currentTarget.style.borderColor = "rgba(29,158,117,.3)";
                }}
                onMouseLeave={(e) => {
                  if (!isOpen) e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
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
                        color: "rgba(29,158,117,.5)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: "rgba(255,255,255,.45)", fontSize: "14px", lineHeight: 1 }}>
                      {isOpen ? "×" : "+"}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,.7)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: "11px",
                      color: "rgba(255,255,255,.25)",
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
                    borderTop: isOpen ? ".5px solid rgba(255,255,255,.06)" : "none",
                  }}
                >
                  <div
                    style={{
                      borderLeft: "2px solid rgba(29,158,117,.3)",
                      background: "rgba(29,158,117,.04)",
                      padding: "10px 12px",
                      margin: "10px 12px 12px",
                    }}
                  >
                    <div
                      style={{
                        color: "#5dc9a0",
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
                        color: "rgba(255,255,255,.45)",
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
      </section>

      {/* FAQ */}
      <section
        className="mx-auto max-w-6xl"
        style={{
          background: "#060912",
          padding: "64px 48px",
          borderTop: SEPARATOR,
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.35)",
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
        className="relative mx-auto max-w-6xl overflow-hidden"
        style={{
          padding: "64px 48px",
          background: "#0a0f1e",
          margin: "0 40px 48px",
          borderRadius: "8px",
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
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              style={{
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 600,
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
              Audit RGPD, due diligence M&A, mise en conformité — nous répondons
              sous 48h.
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
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-end">
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "16px 20px",
                minWidth: "240px",
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <img
                  src="/images/sarah-hinderer.png"
                  alt="Me Sarah Hinderer"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Me Sarah Hinderer
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.35)",
                      margin: 0,
                    }}
                  >
                    Données personnelles & intelligence artificielle
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PulsingDot color={ACCENT} />
                <span style={{ fontSize: "11px", color: "#5dc9a0" }}>
                  Disponible aujourd&apos;hui
                </span>
              </div>
            </div>
            <a
              href="/contact"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: ACCENT,
                color: "white",
                padding: "14px 28px",
                borderRadius: "4px",
                fontSize: "12px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                boxShadow: ctaHover
                  ? `0 0 20px rgba(${ACCENT_RGB},0.5)`
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
