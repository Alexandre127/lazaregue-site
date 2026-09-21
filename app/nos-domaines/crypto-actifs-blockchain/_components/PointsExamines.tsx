"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Accordéon « Points examinés » : `<details open>` natif, donc ouvert sans
 * JavaScript. Avec JavaScript et sous 640 px, il est replié au chargement.
 * L'utilisateur peut ensuite l'ouvrir/fermer normalement.
 */
export function PointsExamines({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (ref.current && window.matchMedia("(max-width: 639px)").matches) {
      ref.current.open = false;
    }
  }, []);

  return (
    <details className="more" open ref={ref}>
      <summary>Points examinés</summary>
      <div>{children}</div>
    </details>
  );
}
