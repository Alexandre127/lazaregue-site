"use client";

import { useId, useState } from "react";
import { fr } from "@/lib/typo";

/**
 * « Le travail du cabinet » : liste repliable sur mobile (bouton aria-expanded),
 * dépliée sur ordinateur (le CSS masque le bouton et affiche la liste). Le
 * contenu reste dans le DOM à toutes les tailles ; visibilité pilotée par classe
 * (`.is-open`), jamais par l'attribut `hidden`.
 */
export default function SituationTravail({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="cw-travail">
      <button
        type="button"
        className="cw-travail-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span>Le travail du cabinet</span>
        <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>
      <p className="cw-sit-sub cw-travail-label">Le travail du cabinet</p>
      <ul className={open ? "cw-sit-ul is-open" : "cw-sit-ul"} id={id}>
        {items.map((t) => (
          <li key={t}>{fr(t)}</li>
        ))}
      </ul>
    </div>
  );
}
