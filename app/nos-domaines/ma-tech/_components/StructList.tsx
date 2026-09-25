"use client";

/**
 * « Structures d'opération » — six lignes.
 *
 * Bureau : grille 3×2, chaque description toujours visible (le bouton devient
 * inerte). Mobile : lignes repliables, titre visible et description dans le
 * dépliant (bouton + `aria-expanded`, visibilité par classe). Les descriptions
 * restent dans le DOM et dans le rendu serveur (div normale, jamais retirée),
 * pour rester indexables. Rendu initial fermé = identique serveur/client ; le
 * bureau ouvre après montage, sans décalage visuel (la classe .structg force
 * l'affichage en CSS au-dessus de 860 px).
 */

import { useEffect, useState } from "react";
import { fr } from "@/lib/typo";
import { SITUATIONS } from "../data/ma-tech";

export default function StructList() {
  const [open, setOpen] = useState<boolean[]>(() => SITUATIONS.cards.map(() => false));
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const apply = () => {
      setDesktop(mq.matches);
      if (mq.matches) setOpen(SITUATIONS.cards.map(() => true));
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggle = (i: number) => setOpen((o) => o.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="structg">
      {SITUATIONS.cards.map((c, i) => {
        const isOpen = desktop || open[i];
        return (
          <div className="structg__item" key={c.h3}>
            <button
              type="button"
              className="structg__sum"
              aria-expanded={isOpen}
              aria-controls={`str-body-${i}`}
              onClick={() => toggle(i)}
            >
              <span className="structg__h">{fr(c.h3)}</span>
              <span className="structg__chev" aria-hidden="true" />
            </button>
            <div className={`structg__body${isOpen ? " is-open" : ""}`} id={`str-body-${i}`}>
              <p>{fr(c.p)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
