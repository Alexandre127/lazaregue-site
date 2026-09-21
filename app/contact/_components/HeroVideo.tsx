"use client";

import { useRef, useState } from "react";
import styles from "../contact.module.css";

/**
 * Vidéo de fond du hero (Arc de Triomphe, nuit) — CONSERVÉE (contrainte cabinet).
 * · autoplay muted loop playsInline ;
 * · bouton pause/lecture ≥ 44 px (exigence d'accessibilité) ;
 * · `prefers-reduced-motion` : la vidéo est masquée par le CSS et le fond navy
 *   dégradé (fixe) prend le relais — le bouton est alors masqué lui aussi.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

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
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src="/videos/contact-paris.mp4" type="video/mp4" />
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
