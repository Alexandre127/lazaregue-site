"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Deux dernières situations : repliées derrière un bouton natif sous 700 px,
 * les quatre affichées au-delà. Le contenu est présent dans le HTML et reste
 * atteignable sans JavaScript (disclosure natif <details>/<summary>).
 *
 * Pourquoi un enrichissement client plutôt qu'un pur CSS : au-delà de 700 px, le
 * contenu doit être visible ET le bouton masqué. Révéler le contenu d'un
 * <details> fermé par CSS seul n'est pas garanti sur tous les moteurs (modèle
 * ::details-content). On force donc l'ouverture native quand la fenêtre atteint
 * 700 px — reveal fiable partout — et l'on ne masque le <summary> (via
 * [data-ready]) qu'une fois le script exécuté : sans JS, le bouton reste présent
 * à toutes les largeurs et rien n'est rendu inaccessible.
 */
export function CasesExtra({ summaryLabel, children }: { summaryLabel: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 700px)");
    const apply = () => {
      if (mq.matches) el.open = true; // ≥700 : garantit l'affichage des 4 situations
    };
    setReady(true);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <details ref={ref} className="cases-extra" data-ready={ready ? "" : undefined}>
      <summary>{summaryLabel}</summary>
      <div className="cases">{children}</div>
    </details>
  );
}
