"use client";

/**
 * Honoraires — deux listes.
 *
 * `<details>` natifs (contenu toujours dans le DOM et le rendu serveur). Au-delà
 * de 900 px : ouverts et non repliables (le sommaire n'est pas cliquable, réglé
 * en CSS). Sous 900 px : accordéon, fermés au chargement. L'état est posé après
 * montage selon la largeur, puis suit les changements de point de rupture ; le
 * rendu serveur les laisse ouverts (lisibles sans JavaScript).
 */

import { useEffect, useRef } from "react";
import { fr } from "@/lib/typo";

const COLS: { titre: string; items: string[] }[] = [
  {
    titre: "Ce qui détermine le coût",
    items: [
      "Volume contractuel et documentaire",
      "Complexité technique du litige",
      "Urgence",
      "Nombre de parties en cause",
      "Existence d’une expertise",
      "Juridiction saisie",
    ],
  },
  {
    titre: "Ce que fixe la convention",
    items: [
      "Périmètre de la mission",
      "Actes ou phases couverts",
      "Taux horaire ou forfait",
      "Frais prévisibles",
      "Intervention d’un consultant technique",
      "Éventuel honoraire de résultat",
    ],
  },
];

export default function FeesLists() {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => {
      const closed = mq.matches;
      refs.current.forEach((d) => { if (d) d.open = !closed; });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="fees">
      {COLS.map((c, i) => (
        <details className="fees-col acc-item" key={c.titre} open ref={(el) => { refs.current[i] = el; }}>
          <summary>
            <h3 className="acc-q">{c.titre}</h3>
            <span className="acc-sign" aria-hidden="true" />
          </summary>
          <div className="acc-panel">
            <ul>
              {c.items.map((it) => <li key={it}>{fr(it)}</li>)}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
