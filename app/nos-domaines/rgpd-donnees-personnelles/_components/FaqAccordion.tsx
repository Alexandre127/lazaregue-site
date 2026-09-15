"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "../faq";

/*
 * Accordéon FAQ (cinq questions). Boutons natifs, aria-expanded / aria-controls,
 * ouverture indépendante. Contenu essentiel visible sans JS : le <noscript> de
 * la page force l'affichage des panneaux (les réponses sont dans le DOM initial).
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="faq">
      {FAQ_ITEMS.map((item) => {
        const isOpen = !!open[item.id];
        return (
          <div key={item.id}>
            <h3>
              <button
                className="faq-btn"
                type="button"
                aria-expanded={isOpen}
                aria-controls={item.id}
                onClick={() => setOpen((s) => ({ ...s, [item.id]: !s[item.id] }))}
              >
                {item.q}
                <span className="chev" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-panel" id={item.id} hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
