"use client";

import { useEffect, useRef } from "react";
import styles from "../contact.module.css";

/**
 * Paris ralentit à mesure qu'on descend vers le formulaire :
 * la vitesse de lecture passe de 1× à 0,12× sur environ 1,6 hauteur d'écran.
 *
 * Neutralisé si l'utilisateur a demandé moins d'animations — dans ce cas
 * le CSS masque aussi la vidéo et le fond navy prend le relais.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = Math.min(Math.max(window.scrollY / (window.innerHeight * 1.6), 0), 1);
        video.playbackRate = Math.max(1 - r * 0.88, 0.12);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
  );
}
