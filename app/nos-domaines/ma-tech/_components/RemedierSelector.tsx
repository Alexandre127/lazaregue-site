"use client";

/**
 * « Remédier » — sélecteur « Avant le closing / Après le closing ».
 *
 * Deux onglets (vrai `tablist`, navigation clavier gauche/droite/Début/Fin,
 * roving tabindex) ; une seule liste affichée à la fois, « Avant » par défaut.
 * Les DEUX listes restent dans le DOM et dans le rendu serveur : la liste
 * inactive est masquée par classe (`.is-hidden`), jamais retirée du balisage,
 * pour rester indexable (comme sur les pages IA et cybersécurité).
 */

import { useRef, useState } from "react";
import { fr } from "@/lib/typo";
import { REMEDIER } from "../data/ma-tech";

const PANELS = [
  { key: "avant", titre: REMEDIER.avantT, items: REMEDIER.avant },
  { key: "apres", titre: REMEDIER.apresT, items: REMEDIER.apres },
];

export default function RemedierSelector() {
  const [cur, setCur] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number, focus = false) => {
    const n = (i + PANELS.length) % PANELS.length;
    setCur(n);
    if (focus) tabRefs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(PANELS.length - 1, true); }
  };

  return (
    <div className="rem">
      <div className="rem__tabs" role="tablist" aria-label="Moment de la remédiation">
        {PANELS.map((p, i) => (
          <button
            key={p.key}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`rem-tab-${p.key}`}
            aria-controls={`rem-panel-${p.key}`}
            aria-selected={i === cur}
            tabIndex={i === cur ? 0 : -1}
            onClick={() => go(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {p.titre}
          </button>
        ))}
      </div>

      {PANELS.map((p, i) => (
        <ul
          key={p.key}
          className={`rem__list${i === cur ? "" : " is-hidden"}`}
          role="tabpanel"
          id={`rem-panel-${p.key}`}
          aria-labelledby={`rem-tab-${p.key}`}
        >
          {p.items.map((it) => <li key={it}>{fr(it)}</li>)}
        </ul>
      ))}
    </div>
  );
}
