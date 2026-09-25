"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Rail défilant horizontalement sur mobile, avec repère « i / n » mis à jour au
 * défilement. Sur ordinateur (CSS), le rail redevient une grille normale et le
 * repère est masqué. Le contenu est identique aux deux tailles : aucun texte
 * n'est masqué au rendu.
 *
 * `trackClass` = classe de la piste interne (« missions », « steps3 »…), pour
 * réutiliser les styles de grille/subgrid existants.
 */
export default function ScrollRail({
  total,
  trackClass,
  label,
  children,
}: {
  total: number;
  trackClass: string;
  label: string;
  children: ReactNode;
}) {
  const [i, setI] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  function onScroll() {
    const el = railRef.current;
    const track = el?.firstElementChild;
    if (!el || !track || track.children.length === 0) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, idx) => {
      const c = child as HTMLElement;
      const center = c.offsetLeft + c.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) { bestDist = dist; best = idx; }
    });
    if (best !== i) setI(best);
  }

  return (
    <>
      <div className="rail" ref={railRef} onScroll={onScroll} role="region" tabIndex={0} aria-label={label}>
        <div className={trackClass}>{children}</div>
      </div>
      <p className="rail-count" aria-hidden="true">{i + 1} / {total}</p>
    </>
  );
}
