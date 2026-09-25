"use client";

/**
 * Section « Ce que l'audit fait apparaître ».
 *
 * BUREAU (> 640 px) : composant à onglets — vrai `tablist` / `tab` / `tabpanel`,
 * flèches gauche/droite, Début / Fin, roving tabindex, focus visible. Un seul
 * panneau visible à la fois (les inactifs sont masqués par classe, jamais par
 * l'attribut `hidden`, pour rester dans le rendu serveur).
 *
 * MOBILE (≤ 640 px) : les cinq panneaux s'affichent en liste verticale de cartes
 * autonomes (en-tête « 01 · Code », puis trois lignes étiquetées). Onglets,
 * flèches et compteur sont masqués en CSS. Aucune duplication du texte : le même
 * DOM sert les deux présentations ; seuls les libellés des trois lignes changent
 * (bureau : « Déclaré en data room »… / mobile : « La data room déclare »…).
 *
 * Chaque panneau : déclaration de la data room (citation barrée) → constat →
 * bandeau « Effet ». Exemples fictifs.
 */

import { useRef, useState } from "react";
import { fr } from "@/lib/typo";
import { DEMO } from "../data/ma-tech";

export default function DemoTabs() {
  const rows = DEMO.rows;
  const [cur, setCur] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number, focus = false) => {
    const n = (i + rows.length) % rows.length;
    setCur(n);
    if (focus) tabRefs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(rows.length - 1, true); }
  };

  return (
    <div className="demo2">
      <div className="d-top">
        <p className="d-top-hint">{fr(DEMO.hint)}</p>
        <p className="d-count" aria-live="polite">{cur + 1} / {rows.length}</p>
      </div>

      <div className="dtabs" role="tablist" aria-label="Exemples par actif">
        {rows.map((r, i) => (
          <button
            key={r.court}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`demo-tab-${i}`}
            aria-controls={`demo-panel-${i}`}
            aria-selected={i === cur}
            tabIndex={i === cur ? 0 : -1}
            onClick={() => go(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {r.court}
          </button>
        ))}
      </div>

      <div className="dstage">
        {rows.map((r, i) => (
          <div
            key={r.court}
            className={i === cur ? "dpanel is-active" : "dpanel"}
            role="tabpanel"
            id={`demo-panel-${i}`}
            aria-labelledby={`demo-tab-${i}`}
          >
            {/* En-tête de carte — visible en mobile seulement (le nom accessible
                du panneau vient déjà de l'onglet via aria-labelledby). */}
            <div className="d-head" aria-hidden="true">
              <span className="d-head-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="d-head-court">{fr(`· ${r.court}`)}</span>
            </div>
            <div className="d-decl">
              <span className="d-stamp">
                <span className="lbl-d">Déclaré en data room</span>
                <span className="lbl-m">La data room déclare</span>
              </span>
              <p className="d-q">{fr(r.decl)}</p>
            </div>
            <div className="d-arrow" aria-hidden="true">→</div>
            <div className="d-const">
              <span className="d-stamp d-stamp--inv">
                <span className="lbl-d">Constaté après audit</span>
                <span className="lbl-m">{fr("L'audit constate")}</span>
              </span>
              <p>{fr(r.constat)}</p>
            </div>
            <div className="d-eff">
              <span className="d-stamp d-stamp--eff">
                <span className="lbl-d">{fr("Effet possible sur l'opération")}</span>
                <span className="lbl-m">{fr("Effet sur l'opération")}</span>
              </span>
              <p>{fr(r.effet)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-nav">
        <button type="button" className="d-prev" aria-label="Exemple précédent" onClick={() => go(cur - 1)}>←</button>
        <button type="button" className="d-next" aria-label="Exemple suivant" onClick={() => go(cur + 1)}>→</button>
      </div>

      <p className="proof__note">{fr(DEMO.note)}</p>
    </div>
  );
}
