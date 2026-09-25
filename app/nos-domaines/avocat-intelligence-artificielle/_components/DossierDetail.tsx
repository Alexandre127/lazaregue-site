"use client";

import { useId, useState } from "react";

/**
 * Repli « Détail du dossier » (mobile) : la difficulté et l'intervention sont
 * masquées derrière un bouton aria-expanded. Sur ordinateur (CSS), le bouton
 * disparaît et les deux blocs s'affichent en deux colonnes — rien n'est masqué
 * au rendu, le panneau reste dans le DOM même replié.
 */
export default function DossierDetail({
  difficulte,
  intervention,
}: {
  difficulte: string;
  intervention: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <button
        type="button"
        className="dcard-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        Détail du dossier <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>
      <div className={open ? "dcard-inner is-open" : "dcard-inner"} id={id}>
        <dl className="d-dif"><dt>Difficulté</dt><dd>{difficulte}</dd></dl>
        <dl className="d-int"><dt>Intervention</dt><dd>{intervention}</dd></dl>
      </div>
    </>
  );
}
