"use client";

/**
 * « Ce que l'audit peut changer » — cinq colonnes à trois rangées partagées
 * (subgrid) : les encadrés « Effet possible » démarrent tous à la même hauteur.
 *
 * Animation : quand la section entre dans l'écran, les cinq encadrés s'allument
 * l'un après l'autre (décalage ~120 ms) via IntersectionObserver + transition.
 * Si `prefers-reduced-motion`, l'état final est affiché directement, sans
 * animation. Au survol / focus d'une colonne, son encadré passe en bleu plein.
 */

import { useEffect, useRef, useState } from "react";
import { fr } from "@/lib/typo";
import { CONSEQ } from "../data/ma-tech";

export default function ConseqReveal() {
  const ref = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Le rendu en mouvement réduit est géré en CSS (état final forcé via
    // prefers-reduced-motion) : ici on se contente d'observer l'entrée à l'écran.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ol className={`conseq${shown ? " is-shown" : ""}`} ref={ref}>
      {CONSEQ.cards.map((c, i) => (
        <li key={c.n} tabIndex={0}>
          <div className="conseq__head">
            <span className="conseq__n">{c.n}</span>
            <h3>{c.h3}</h3>
          </div>
          <p className="conseq__p">{fr(c.p)}</p>
          <p className="conseq__eff" style={{ transitionDelay: `${i * 120}ms` }}>
            <b>Effet possible sur l’opération</b>
            {fr(c.eff)}
          </p>
        </li>
      ))}
    </ol>
  );
}
