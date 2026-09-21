"use client";

import { useState, useSyncExternalStore } from "react";
import { FAQ_IA } from "../faq-ia";

/*
 * FAQ (maquette v4). Vrais <button>, aria-expanded / aria-controls, cible ≥44px,
 * indicateur d'état par icône +/− (pas seulement la couleur). LISIBLE SANS JS :
 * en rendu serveur tous les panneaux sont ouverts ; après hydratation, seule la
 * première question reste ouverte. `mounted` via useSyncExternalStore (false au
 * SSR, true côté client) — pas de setState dans un effet, pas de mismatch.
 */
const subscribe = () => () => {};

export function FaqAccordion() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true, // client
    () => false, // serveur
  );
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FAQ_IA.map((f, i) => [f.id, i === 0])),
  );

  return (
    <div className="faq">
      {FAQ_IA.map((item) => {
        // Avant hydratation : panneau visible (lisible sans JS).
        const isOpen = mounted ? !!open[item.id] : true;
        const btnId = `b-${item.id}`;
        return (
          <div className="faq-item" key={item.id}>
            <h3>
              <button
                className="faq-q"
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={item.id}
                onClick={() => setOpen((s) => ({ ...s, [item.id]: !s[item.id] }))}
              >
                {item.q}
                <span className="faq-ico" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq-a" id={item.id} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              {item.a.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
