"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * « Ce que vous recevez » — aperçu des cinq livrables (menu à gauche, document
 * spécimen à droite, « Agrandir le document » en modale). Version validée par le
 * cabinet (reprise de l'ancienne page RGPD). Extraits illustratifs, aucune
 * donnée réelle. Client component (sélection + modale Échap/clic-fond).
 */

const BRAND = "#1A47FF";
const LIGHT = {
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
};

export function SpecimensRecus() {
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

  // Spécimens réellement disponibles parmi les quatre livrables de la section
  // (arbitrage sept. 2026). « Rapport d'audit et plan d'action » et « Procédure
  // de gestion d'une violation » n'ont pas encore de document spécimen : ils ne
  // sont PAS fabriqués ici (signalés dans le rapport). Retirés : due diligence,
  // politique de confidentialité, grille d'évaluation du risque.
  const items = [
    { num: "01", name: "Registre des traitements", sub: "La base légale documentée, traitement par traitement" },
    { num: "02", name: "DPA sous-traitant — art. 28", sub: "Les clauses que les éditeurs refusent — et comment elles se rédigent" },
  ];

  const docs: ReactNode[] = [
    // DOC 0 — Registre
    <div key="0" style={{ padding: "12px 14px", fontSize: "9px", color: "#333", lineHeight: 1.65 }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "#111", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".06em" }}>Registre des activités de traitement</div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>Version auditée · Mai 2026 · Confidentiel</div>
      <div style={{ display: "flex", background: "#f0f0f0", fontWeight: 700, fontSize: "7.5px", color: "#444", marginBottom: "1px" }}>
        {["Traitement", "Finalité", "Base légale", "Risque"].map((h) => (
          <div key={h} style={{ flex: 1, padding: "3px 4px", borderRight: "1px solid #ddd" }}>{h}</div>
        ))}
      </div>
      {[
        ["CRM prospects", "Prospection B2B", "Intérêt légitime ✓", "Faible"],
        ["Newsletter", "Marketing", "Consentement ✓", "Moyen"],
        ["RH — salariés", "Gestion paie", "Obligation légale ✓", "Élevé"],
        ["Analytics web", "Audience", "⚠ manquante", "Élevé"],
      ].map((row, i) => (
        <div key={i} style={{ display: "flex", borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fafafa" : "white" }}>
          {row.map((cell, j) => (
            <div key={j} style={{ flex: 1, padding: "3px 4px", borderRight: "1px solid #eee", fontSize: "7.5px", color: j === 2 && i === 3 ? "#c0392b" : "#333" }}>{cell}</div>
          ))}
        </div>
      ))}
      <div style={{ background: "#fffbf0", borderLeft: "2px solid #e6a817", padding: "6px 8px", margin: "8px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#b8860b" }}>⚠ Point critique :</strong> Le traitement analytics web est dépourvu de base légale valide. Exposition à une sanction CNIL immédiate (réf. SAN-2021-023).
      </div>
    </div>,

    // DOC 1 — Grille risque
    <div key="1" style={{ padding: "12px 14px", fontSize: "9px", color: "#333", lineHeight: 1.65 }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "#111", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".06em" }}>Grille d’évaluation du risque</div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>Outil d’aide à la décision · Lazarègue Avocats · 2026</div>
      <div style={{ display: "flex", gap: "6px", margin: "8px 0" }}>
        {[["4/5", "Gravité"], ["3/5", "Probabilité"], ["12k", "Personnes"], ["Santé", "Catégorie"]].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: "#f8f8f8", border: "1px solid #e5e5e5", borderRadius: "3px", padding: "5px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c0392b" }}>{n}</div>
            <div style={{ fontSize: "7px", color: "#888", marginTop: "1px" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff5f5", borderLeft: "2px solid #c0392b", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#c0392b" }}>Notification CNIL obligatoire sous 72h</strong><br />
        Score ≥ 3/5 sur données sensibles (santé) + volume &gt; 10 000 personnes.
      </div>
      <div style={{ background: "#f0faf5", borderLeft: "2px solid #1a7a50", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#1a7a50" }}>Action immédiate :</strong> Conserver les logs système. Mandater expert forensic avant toute intervention IT. Délai critique : J+4h.
      </div>
    </div>,

    // DOC 2 — DPA sous-traitant
    <div key="2" style={{ padding: "12px 14px", fontSize: "9px", color: "#333", lineHeight: 1.55 }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "#111", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".06em" }}>DPA — Rédaction proposée par le cabinet — spécimen</div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "8px" }}>Prestataire SaaS · Spécimen — aucune donnée réelle</div>
      {[
        { art: "Art. 7 — Localisation des données", depart: "Hébergement « mondial », transferts non encadrés.", propose: "Hébergement dans l'UE. Tout transfert hors UE soumis à accord préalable écrit." },
        { art: "Art. 9 — Droit d'audit", depart: "Aucun droit d'audit prévu.", propose: "Audit annuel, préavis 30 jours ; rapport SOC 2 Type II en substitution." },
        { art: "Art. 3 — Notification d'incident", depart: "Le prestataire informe le client dans les meilleurs délais.", propose: "Notification sous 24 heures, contenu minimal défini, conservation des journaux pendant six mois." },
      ].map((row) => (
        <div key={row.art} style={{ marginBottom: "6px", paddingBottom: "6px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontWeight: 700, color: "#111", fontSize: "8.5px", marginBottom: "3px" }}>{row.art}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            <div style={{ background: "#f4f4f4", borderLeft: "2px solid #bbb", padding: "4px 6px" }}>
              <div style={{ fontSize: "6.5px", textTransform: "uppercase", letterSpacing: ".04em", color: "#888", marginBottom: "2px" }}>Version de départ</div>
              <div style={{ fontSize: "8px", color: "#666" }}>{row.depart}</div>
            </div>
            <div style={{ background: "#f0f4ff", borderLeft: "2px solid #1A47FF", padding: "4px 6px" }}>
              <div style={{ fontSize: "6.5px", textTransform: "uppercase", letterSpacing: ".04em", color: "#1A47FF", marginBottom: "2px" }}>Rédaction proposée</div>
              <div style={{ fontSize: "8px", color: "#333" }}>{row.propose}</div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ background: "#fffbf0", borderLeft: "2px solid #e6a817", padding: "6px 8px", marginTop: "2px", fontSize: "8px", color: "#555", lineHeight: 1.55 }}>
        <strong style={{ color: "#b8860b" }}>Pourquoi cela compte.</strong> « Dans les meilleurs délais » ne permet pas de tenir les soixante-douze heures de l’article 33 : le responsable de traitement dépend alors du calendrier de son prestataire.
      </div>
    </div>,

    // DOC 3 — Politique sur mesure
    <div key="3" style={{ padding: "12px 14px", fontSize: "9px", color: "#333", lineHeight: 1.65 }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "#111", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".06em" }}>Points spécifiques — Au-delà du modèle standard</div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "10px" }}>Secteur B2B · RH 120 salariés · E-commerce · Mai 2026</div>
      <div style={{ background: "#f0faf5", borderLeft: "2px solid #1a7a50", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#1a7a50" }}>Droit du travail intégré :</strong> Clause sur la surveillance des outils informatiques salariés (art. L.1222-4 CT). Information préalable du CSE obligatoire. Absent des modèles standard.
      </div>
      <div style={{ background: "#fffbf0", borderLeft: "2px solid #e6a817", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#b8860b" }}>Cookies post-consentement :</strong> Mention explicite des partenaires publicitaires tiers. Exigé par les dernières décisions CNIL (délib. 2023-091). Non prévu dans les générateurs automatiques.
      </div>
      <div style={{ background: "#fff5f5", borderLeft: "2px solid #c0392b", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#c0392b" }}>Point sectoriel :</strong> E-commerce = conservation données paiement soumise au PCI-DSS en sus du RGPD. Double régime articulé.
      </div>
    </div>,

    // DOC 4 — Due diligence chiffrée
    <div key="4" style={{ padding: "12px 14px", fontSize: "9px", color: "#333", lineHeight: 1.65 }}>
      <div style={{ fontSize: "10px", fontWeight: 700, color: "#111", marginBottom: "4px", textTransform: "uppercase", letterSpacing: ".06em" }}>Valorisation du risque résiduel</div>
      <div style={{ fontSize: "8px", color: "#888", marginBottom: "8px" }}>SaaS RH · Acquisition · Spécimen — aucune donnée réelle</div>
      <div style={{ display: "flex", gap: "8px", margin: "8px 0", background: "#f8f8f8", border: "1px solid #e5e5e5", borderRadius: "3px", padding: "7px 9px" }}>
        {[["Critiques", "Non-conformités à traiter avant l'opération", "#c0392b"], ["À régulariser", "Points de conformité résiduels", "#e6a817"]].map(([t, l, c]) => (
          <div key={t} style={{ flex: 1 }}>
            <div style={{ fontSize: "8.5px", fontWeight: 700, color: c, textTransform: "uppercase", letterSpacing: ".04em" }}>{t}</div>
            <div style={{ fontSize: "7.5px", color: "#888", marginTop: "2px", lineHeight: 1.3 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff5f5", borderLeft: "2px solid #c0392b", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#c0392b" }}>Non-conformité critique :</strong> Base de prospection constituée sans consentement valide. Risque de qualification en actif illicite.
      </div>
      <div style={{ background: "#f0faf5", borderLeft: "2px solid #1a7a50", padding: "6px 8px", margin: "6px 0", fontSize: "8.5px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#1a7a50" }}>Recommandation :</strong> Régularisation avant closing + garantie d’actif et de passif RGPD — clause rédigée et négociée.
      </div>
    </div>,
  ];

  // `order` mappe l'index du menu vers le bloc `docs` et son bandeau : menu 01
  // (registre) → doc 0 ; menu 02 (DPA art. 28) → doc 2. Les autres blocs `docs`
  // (grille, politique, due diligence) restent définis mais ne sont plus mappés.
  const order = [0, 2];
  const docBadges = ["Registre Art.30", "Procédure Art.33", "DPA Art.28", "Politique RGPD", "Due Diligence M&A"];

  return (
    <>
      <style>{`
        /* Colonne document plus large sur ordinateur (tableaux plus lisibles) ;
           la modale « Agrandir » reste disponible pour le plein format. */
        .livr-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 40px; align-items: start; }
        .livr-doc { position: relative; height: 340px; }
        @media (min-width: 768px) { .livr-doc { height: 360px; } }
        .livr-menu-items button:focus-visible { outline: 2px solid #1A47FF; outline-offset: -2px; }
        @media (max-width: 767px) {
          .livr-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; align-items: stretch; }
          .livr-menu { min-width: 0; }
          .livr-menu-items { display: flex; flex-direction: column; gap: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .livr-doc-card, .livr-zoom-inner { transition: none !important; } }

        /* Lot 5 — sous 639px : bande horizontale de vignettes (modèle bande
           équipe de la home). Chaque vignette ouvre le spécimen EN PLEIN ÉCRAN
           (lisible, zoomable). Plus d'aperçu de document en petit corps dans la
           page : le viewer 340px est masqué. */
        .livr-band { display: none; }
        @media (max-width: 639px) {
          .livr-grid { display: none; }
          .livr-band {
            display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
            margin: 0 -20px; padding: 2px 20px 12px; scrollbar-width: none; -ms-overflow-style: none;
          }
          .livr-band::-webkit-scrollbar { display: none; }
          .livr-thumb {
            flex: 0 0 78%; scroll-snap-align: start; display: flex; flex-direction: column;
            background: #fff; border: 1px solid #e0e0ee; padding: 0 0 12px;
            text-align: left; cursor: pointer; overflow: hidden;
          }
          .livr-thumb:focus-visible { outline: 3px solid #1A47FF; outline-offset: 2px; }
          .livr-thumb-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; background: #f7f7f7; border-bottom: 1px solid #e5e5e5; padding: 9px 12px; }
          .livr-thumb-brand { font-size: 10px; font-weight: 700; color: #111; letter-spacing: .04em; }
          .livr-thumb-brand span { color: #1A47FF; }
          .livr-thumb-badge { font-size: 8px; color: #666; letter-spacing: .06em; text-transform: uppercase; background: #eaeaea; padding: 2px 6px; }
          .livr-thumb-doc { display: block; height: 168px; overflow: hidden; position: relative; -webkit-mask-image: linear-gradient(#000 72%, transparent); mask-image: linear-gradient(#000 72%, transparent); pointer-events: none; }
          .livr-thumb-cap { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px 0; min-height: 44px; }
          .livr-thumb-name { font-size: 13px; font-weight: 500; color: #14141f; line-height: 1.35; }
          .livr-thumb-open { flex: none; font-size: 12px; color: #1A47FF; white-space: nowrap; }
        }
      `}</style>

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
                    width: "100%", display: "flex", alignItems: "flex-start", gap: "12px",
                    padding: "10px 10px 10px 12px", border: "none",
                    borderLeft: cur === i ? `2px solid ${BRAND}` : "2px solid transparent",
                    borderBottom: i < items.length - 1 ? `.5px solid ${LIGHT.border}` : "none",
                    background: cur === i ? "#f4f4f8" : "none",
                    textAlign: "left", font: "inherit", cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "11px", color: cur === i ? BRAND : LIGHT.faint, fontFamily: "monospace", width: "20px", flexShrink: 0, paddingTop: "1px" }}>{item.num}</span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", fontSize: "12px", color: cur === i ? LIGHT.text : LIGHT.muted, fontWeight: 500, lineHeight: 1.4 }}>{item.name}</span>
                    <span style={{ display: "block", fontSize: "10px", color: cur === i ? LIGHT.muted : LIGHT.faint, lineHeight: 1.4, marginTop: "2px" }}>{item.sub}</span>
                  </span>
                  {cur === i ? <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: BRAND, flexShrink: 0, marginTop: "5px" }} /> : null}
                </button>
              </h3>
            ))}
          </div>
          <p className="livr-menu-mention" style={{ marginTop: "16px", fontFamily: "monospace", fontSize: "9px", letterSpacing: ".08em", color: LIGHT.faint }}>
            Exemples illustratifs · aucune donnée réelle
          </p>
        </div>

        <div>
          <div className="livr-doc">
            {order.map((docIdx, i) => (
              <div
                key={i}
                className="livr-doc-card"
                id={`livrable-doc-${i}`}
                role="tabpanel"
                aria-labelledby={`livrable-tab-${i}`}
                aria-hidden={cur === i ? undefined : "true"}
                style={{
                  position: "absolute", inset: 0, background: "white", borderRadius: "6px",
                  boxShadow: "0 20px 60px rgba(0,0,0,.5)", overflow: "hidden", fontFamily: "sans-serif",
                  transition: "all .5s cubic-bezier(.4,0,.2,1)",
                  opacity: cur === i ? 1 : 0,
                  transform: cur === i ? "translateY(0) scale(1)" : `translateY(${(i - cur) * 12}px) scale(${Math.max(0.9, 1 - Math.abs(i - cur) * 0.02)})`,
                  zIndex: cur === i ? 10 : 5 - Math.abs(i - cur),
                  pointerEvents: cur === i ? "auto" : "none",
                }}
              >
                <div style={{ background: "#f7f7f7", borderBottom: "1px solid #e5e5e5", padding: "9px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#111", letterSpacing: ".04em" }}>LAZARÈGUE <span style={{ color: "#1A47FF" }}>AVOCATS</span></span>
                  <span style={{ fontSize: "8px", color: "#666", letterSpacing: ".06em", textTransform: "uppercase", background: "#eaeaea", padding: "2px 6px", borderRadius: "2px" }}>{docBadges[docIdx]}</span>
                </div>
                {docs[docIdx]}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            style={{ marginTop: "14px", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", color: BRAND, background: "none", border: `1px solid ${LIGHT.border}`, borderRadius: "6px", padding: "8px 14px", cursor: "pointer" }}
          >
            Agrandir le document
          </button>
        </div>
      </div>

      {/* Bande de vignettes — mobile (lot 5). Chaque vignette ouvre le spécimen
          en plein écran, lisible et zoomable. */}
      <div className="livr-band" aria-label="Nos livrables">
        {order.map((docIdx, i) => (
          <button
            key={i}
            type="button"
            className="livr-thumb"
            onClick={() => { setCur(i); setZoomed(true); }}
            aria-label={`Ouvrir le spécimen en plein écran : ${items[i].name}`}
          >
            <span className="livr-thumb-head">
              <span className="livr-thumb-brand">LAZARÈGUE <span>AVOCATS</span></span>
              <span className="livr-thumb-badge">{docBadges[docIdx]}</span>
            </span>
            <span className="livr-thumb-doc" aria-hidden="true">{docs[docIdx]}</span>
            <span className="livr-thumb-cap">
              <span className="livr-thumb-name">{items[i].num} · {items[i].name}</span>
              <span className="livr-thumb-open" aria-hidden="true">Agrandir →</span>
            </span>
          </button>
        ))}
      </div>

      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Document agrandi"
          onClick={() => setZoomed(false)}
          style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", padding: "5vw" }}
        >
          <button type="button" onClick={() => setZoomed(false)} aria-label="Fermer" style={{ position: "absolute", top: "16px", right: "20px", background: "none", border: "none", color: "white", fontSize: "26px", lineHeight: 1, cursor: "pointer" }}>×</button>
          <div
            className="livr-zoom-inner"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "min(560px, 96vw)", maxHeight: "90vh", overflow: "auto", background: "white", borderRadius: "8px", fontFamily: "sans-serif" }}
          >
            <div style={{ background: "#f7f7f7", borderBottom: "1px solid #e5e5e5", padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0 }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#111", letterSpacing: ".04em" }}>LAZARÈGUE <span style={{ color: "#1A47FF" }}>AVOCATS</span></span>
              <span style={{ fontSize: "9px", color: "#666", letterSpacing: ".06em", textTransform: "uppercase", background: "#eaeaea", padding: "3px 8px", borderRadius: "2px" }}>{docBadges[order[cur]]}</span>
            </div>
            <div style={{ zoom: 1.55 }}>{docs[order[cur]]}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
