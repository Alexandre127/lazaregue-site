"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../contact.module.css";

/**
 * Vidéo de fond du hero (Arc de Triomphe, nuit) — CONSERVÉE (contrainte cabinet).
 * · muted loop playsInline, lecture démarrée par le script (pas d'autoplay) ;
 * · bouton pause/lecture ≥ 44 px (exigence d'accessibilité) ;
 * · `prefers-reduced-motion` : la vidéo n'est pas lancée et le fond navy dégradé
 *   (fixe) prend le relais ;
 * · desktop / grande tablette uniquement : sous 900 px, la <source> garde son
 *   data-src (jamais de src) et `preload="none"` → AUCUN fichier vidéo n'est
 *   téléchargé sur mobile ; le CSS masque par ailleurs la couche et le bouton.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    if (!desktop.matches || reduce.matches) { queueMicrotask(() => setPaused(true)); return; }
    const s = v.querySelector<HTMLSourceElement>("source[data-src]");
    if (s && !s.src) { s.src = s.getAttribute("data-src") || ""; v.load(); }
    v.play().catch(() => {});
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  }

  return (
    <>
      <video
        ref={ref}
        className={styles.heroBg}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      >
        {/* data-src (pas src) : injecté par le useEffect uniquement ≥ 900 px. */}
        <source data-src="/videos/contact-paris.mp4" type="video/mp4" />
      </video>
      {/* Masqué sous prefers-reduced-motion (CSS) : la vidéo y est déjà coupée. */}
      <button
        type="button"
        className={styles.vidPause}
        onClick={toggle}
        aria-label={paused ? "Lire la vidéo de fond" : "Mettre la vidéo de fond en pause"}
      >
        {paused ? "▶" : "❚❚"}
      </button>
    </>
  );
}
