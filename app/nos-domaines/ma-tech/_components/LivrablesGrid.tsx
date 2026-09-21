"use client";

/**
 * Grille des huit livrables (4×2). Numéros Bebas bleu atténué (décoratifs,
 * aria-hidden), titres H3, texte courant ; la carte 08 (livrable vendeur) est
 * sur fond bleu nuit. Apparition rangée par rangée à l'entrée dans l'écran
 * (léger décalage) ; état final immédiat si prefers-reduced-motion (CSS).
 */

import { useEffect, useRef, useState } from "react";
import { fr } from "@/lib/typo";
import { LIVRABLES } from "../data/ma-tech";

export default function LivrablesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Le rendu en mouvement réduit est forcé en CSS ; ici on observe l'entrée.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`deliv8${shown ? " is-shown" : ""}`} ref={ref}>
      {LIVRABLES.items.map((it, i) => (
        <article
          className={it.dark ? "lv8 lv8--dark" : "lv8"}
          key={it.num}
          style={{ animationDelay: `${Math.floor(i / 4) * 120}ms` }}
        >
          <span className="lv8__n" aria-hidden="true">{it.num}</span>
          <h3>{fr(it.h3)}</h3>
          <p>{fr(it.p)}</p>
        </article>
      ))}
    </div>
  );
}
