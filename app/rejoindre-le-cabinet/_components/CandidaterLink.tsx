"use client";

import { EVT_ENTREE } from "../data/entrees";

/**
 * Lien « Candidater → » d'une carte d'entrée : ancre simple vers #candidater
 * (fonctionne sans JavaScript), qui présélectionne en plus l'entrée dans le
 * formulaire par un événement — aucun paramètre d'URL.
 */
export default function CandidaterLink({ entree, label, className }: { entree: string; label: string; className?: string }) {
  return (
    <a
      href="#candidater"
      className={className}
      aria-label={`Candidater — ${label}`}
      onClick={() => window.dispatchEvent(new CustomEvent(EVT_ENTREE, { detail: entree }))}
    >
      Candidater →
    </a>
  );
}
