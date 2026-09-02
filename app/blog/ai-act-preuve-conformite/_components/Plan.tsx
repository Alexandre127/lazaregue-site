"use client";

import { useEffect, useState } from "react";
import styles from "../analyse.module.css";
import { TOC } from "../../data/ai-act-preuve";

/**
 * Barre de progression de lecture + plan latéral dont la section en cours
 * est mise en évidence. Les écouteurs sont nettoyés au démontage.
 */
export default function Plan() {
  const [progression, setProgression] = useState(0);
  const [actif, setActif] = useState<string | null>(null);

  useEffect(() => {
    const ids = TOC.map((t) => t.href.slice(1));

    const onScroll = () => {
      // Progression : part du haut de l'article, s'achève avant le pied de page
      const corps = document.getElementById("article-corps");
      if (corps) {
        const debut = corps.offsetTop;
        const total = corps.offsetHeight - window.innerHeight * 0.4;
        const p =
          total > 0
            ? (window.scrollY - debut + window.innerHeight * 0.4) / total
            : 0;
        setProgression(Math.max(0, Math.min(1, p)) * 100);
      }

      // Section active : la dernière dont le haut est passé sous la navbar
      let courant: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) courant = id;
      }
      setActif(courant);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={styles.progress}
        style={{ transform: `scaleX(${progression / 100})` }}
        aria-hidden
      />
      <aside className={styles.plan}>
        <div className={styles.planTitre}>Plan</div>
        <nav className={styles.planNav} aria-label="Plan de l'analyse">
          {TOC.map((t) => {
            const id = t.href.slice(1);
            return (
              <a
                key={t.href}
                href={t.href}
                className={`${styles.planLien} ${actif === id ? styles.actif : ""}`.trim()}
                aria-current={actif === id ? "true" : undefined}
              >
                <span className={styles.planNum}>{t.num}</span>
                <span>{t.label}</span>
              </a>
            );
          })}
        </nav>
        <a href="/contact" className={styles.planCta}>
          Nous écrire
        </a>
      </aside>
    </>
  );
}
