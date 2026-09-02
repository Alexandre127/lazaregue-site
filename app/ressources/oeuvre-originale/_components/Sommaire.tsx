"use client";

import { useEffect, useState } from "react";
import styles from "../article.module.css";
import { GROUPES, SECTIONS, DOSSIER } from "../../data/oeuvre-originale";

/** Libellé de chaque ancre, y compris la section « Préparer votre dossier ». */
const LIBELLES: Record<string, string> = {
  ...Object.fromEntries(SECTIONS.map((s) => [s.id, s.h2])),
  [DOSSIER.id]: DOSSIER.h2,
};

/**
 * Sommaire latéral : la section en cours de lecture est mise en évidence.
 * L'observer est nettoyé au démontage.
 */
export default function Sommaire() {
  const [actif, setActif] = useState<string | null>(null);

  useEffect(() => {
    const ids = GROUPES.flatMap((g) => g.ids);
    const cibles = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!cibles.length) return;

    const onScroll = () => {
      // La section active est la dernière dont le haut est passé sous la navbar.
      const seuil = 120;
      let courant: string | null = null;
      for (const el of cibles) {
        if (el.getBoundingClientRect().top <= seuil) courant = el.id;
      }
      setActif(courant);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={styles.sommaire}>
      <div className={styles.sommaireTitre}>Sommaire</div>
      <nav className={styles.sommaireNav} aria-label="Sommaire de l'article">
        {GROUPES.map((g) => (
          <div key={g.step}>
            <div className={styles.groupe}>
              <span className={styles.groupeStep}>{g.step}</span>
              <span className={styles.groupeLabel}>{g.label}</span>
            </div>
            {g.ids.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${styles.tocLien} ${actif === id ? styles.actif : ""}`.trim()}
                aria-current={actif === id ? "true" : undefined}
                style={{ display: "block" }}
              >
                {LIBELLES[id]}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <a href={`#${DOSSIER.id}`} className={styles.sommaireCta}>
        Préparer mon dossier
      </a>
    </aside>
  );
}
