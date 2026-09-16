"use client";

import { useEffect, useState } from "react";
import { FAQ_ITEMS, type Seg } from "../faq";

/**
 * FAQ — `<button>` dans un `<h3>`, `aria-expanded` / `aria-controls`, panneau
 * `role="region"` lié par `aria-labelledby`, état porté par `hidden` (aucune
 * animation de hauteur). Rendu serveur : les six réponses sont visibles (état
 * initial « tout ouvert »). Après hydratation, seule la première reste ouverte.
 * Sans JavaScript, les six réponses restent visibles.
 */
function renderSegments(a: Seg[]) {
  return a.map((s, i) => {
    if (typeof s === "string") return <span key={i}>{s}</span>;
    if ("sup" in s) return <sup key={i}>{s.sup}</sup>;
    return (
      <a key={i} href={s.href}>
        {s.link}
      </a>
    );
  });
}

export function Faq() {
  const [open, setOpen] = useState<boolean[]>(() => FAQ_ITEMS.map(() => true));

  useEffect(() => {
    // Après hydratation, on replie tout sauf la première. Déféré à une tâche
    // (setTimeout) pour ne pas appeler setState de façon synchrone dans l'effet,
    // et pour se déclencher même dans un onglet en arrière-plan.
    const id = setTimeout(() => setOpen(FAQ_ITEMS.map((_, i) => i === 0)), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="faq">
      {FAQ_ITEMS.map((item, i) => {
        const bId = `faq-b${i + 1}`;
        const pId = `faq-${i + 1}`;
        return (
          <div className="faq-item" key={pId}>
            <h3>
              <button
                className="faq-btn"
                type="button"
                aria-expanded={open[i]}
                aria-controls={pId}
                id={bId}
                onClick={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))}
              >
                <span>{item.q}</span>
                <span className="sign" aria-hidden="true">{open[i] ? "−" : "+"}</span>
              </button>
            </h3>
            <div className="faq-panel" id={pId} role="region" aria-labelledby={bId} hidden={!open[i]}>
              <p>{renderSegments(item.a)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
