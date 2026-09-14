"use client";

import { useEffect, useState } from "react";
import styles from "../ma-tech.module.css";
import { ETAPES } from "../data/ma-tech";

/**
 * Sommaire latéral : l'étape en cours de lecture est mise en évidence.
 * L'écouteur est nettoyé au démontage.
 */
export default function Rail() {
  const [actif, setActif] = useState<string>(ETAPES[0].id);

  useEffect(() => {
    const onScroll = () => {
      // La section active est la dernière dont le haut est passé sous la navbar.
      let courant = ETAPES[0].id;
      for (const e of ETAPES) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top <= 160) courant = e.id;
      }
      setActif(courant);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={styles.rail} aria-label="Notre intervention dans l'opération">
      <p className={styles.railHd}>Notre intervention</p>
      <ol>
        {ETAPES.map((e) => (
          <li key={e.id} className={actif === e.id ? styles.on : undefined}>
            <a href={`#${e.id}`} aria-current={actif === e.id ? "true" : undefined}>
              <span className={styles.railN}>{e.n}</span>
              <span className={styles.railS}>{e.court}</span>
              <span className={styles.railWhen}>{e.quand}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
