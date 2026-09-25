"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Dépliant générique : `<details open>` natif, donc ouvert (visible) sans
 * JavaScript et sur bureau. Avec JavaScript et sous 640 px, il est replié au
 * chargement — l'utilisateur peut ensuite l'ouvrir/fermer. Le contenu reste
 * dans le DOM et dans le rendu serveur.
 */
export function Repliable({
  summary,
  className = "ex",
  children,
}: {
  summary: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (ref.current && window.matchMedia("(max-width: 639px)").matches) {
      ref.current.open = false;
    }
  }, []);

  return (
    <details className={className} open ref={ref}>
      <summary>{summary}</summary>
      <div>{children}</div>
    </details>
  );
}
