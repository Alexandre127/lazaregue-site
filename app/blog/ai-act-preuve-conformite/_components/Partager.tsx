"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../analyse.module.css";
import { ARTICLE } from "../../data/ai-act-preuve";

/**
 * Partage de l'analyse : menu natif du système quand il existe,
 * copie du lien sinon. Le libellé confirme l'action pendant deux secondes.
 */
export default function Partager() {
  const [copie, setCopie] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: ARTICLE.h1, text: ARTICLE.sub, url });
        return;
      }
    } catch {
      // partage annulé par l'utilisateur : on retombe sur la copie
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopie(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopie(false), 2000);
  };

  return (
    <button type="button" className={styles.partage} onClick={onShare}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </svg>
      <span>{copie ? "Lien copié" : "Partager"}</span>
    </button>
  );
}
