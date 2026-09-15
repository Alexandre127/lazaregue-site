"use client";

import { useEffect, useRef } from "react";

/*
 * Vidéo décorative du hero. aria-hidden, tabindex=-1, muted, playsinline,
 * preload="none", poster fourni. Jamais LCP : sollicitée seulement après le
 * chargement du contenu essentiel (window load). Absente du flux sous 760px
 * (CSS : .media { display:none }). Désactivée sous prefers-reduced-motion et en
 * saveData / 2G. Mise en pause sur visibilitychange. Correcte si la vidéo ou le
 * poster manquent (le poster, puis le fond, restent affichés).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const mq = (q: string) =>
      typeof window.matchMedia === "function"
        ? window.matchMedia(q)
        : ({ matches: false, addEventListener: undefined } as unknown as MediaQueryList);
    const reduce = mq("(prefers-reduced-motion: reduce)");
    const small = mq("(max-width: 759px)");

    const reseauLent = () => {
      const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      return !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")));
    };
    const autorisee = () => !reduce.matches && !small.matches && !reseauLent();

    const init = () => {
      if (!autorisee()) {
        video.pause();
        return;
      }
      video.preload = "metadata";
      video.loop = true;
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };

    // Après le contenu essentiel : si déjà chargé, initialiser tout de suite.
    if (document.readyState === "complete") init();
    else window.addEventListener("load", init, { once: true });

    const onVis = () => {
      if (document.hidden) video.pause();
      else if (autorisee()) {
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    reduce.addEventListener?.("change", init);
    small.addEventListener?.("change", init);

    return () => {
      window.removeEventListener("load", init);
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener?.("change", init);
      small.removeEventListener?.("change", init);
    };
  }, []);

  return (
    <div className="media">
      <video
        ref={ref}
        muted
        playsInline
        preload="none"
        poster="/images/rgpd/hero-poster.webp"
        aria-hidden="true"
        tabIndex={-1}
        width={960}
        height={540}
      >
        <source src="/videos/rgpd-hero.webm" type="video/webm" />
        <source src="/videos/rgpd-hero.mp4" type="video/mp4" />
      </video>
      {/* Couches du duoton bleu — décoratives. */}
      <div className="media-color" aria-hidden="true" />
      <div className="media-lift" aria-hidden="true" />
    </div>
  );
}
