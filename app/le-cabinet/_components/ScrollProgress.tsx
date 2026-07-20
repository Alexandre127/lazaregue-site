"use client";

import { useEffect, useState } from "react";
import styles from "../le-cabinet.module.css";

/** Barre de progression de lecture — 2px, bleu, en haut de page. */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className={styles.sprog} style={{ width: `${pct}%` }} aria-hidden />;
}
