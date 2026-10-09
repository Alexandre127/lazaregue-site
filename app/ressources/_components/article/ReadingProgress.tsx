"use client";

import { useEffect, useRef } from "react";
import styles from "./article.module.css";

/**
 * Barre de progression de lecture (3 px) sous l'en-tête, à partir de 768 px.
 * Sous 768 px, la barre « Sommaire » collante porte déjà la progression.
 * Décorative (aria-hidden). La largeur suit le défilement sans animation.
 */
export default function ReadingProgress() {
  const barre = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const mesurer = () => {
      raf = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const part = total > 0 ? Math.min(1, Math.max(0, doc.scrollTop / total)) : 0;
      if (barre.current) barre.current.style.transform = `scaleX(${part})`;
    };
    const auDefilement = () => {
      if (!raf) raf = requestAnimationFrame(mesurer);
    };
    mesurer();
    window.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement);
    return () => {
      window.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.prog} aria-hidden="true">
      <span ref={barre} />
    </div>
  );
}
