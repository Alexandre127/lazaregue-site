"use client";

import { useEffect, useRef } from "react";

/*
 * Vidéo de FOND du hero, fondue dans la section (aucun cadre) : `.hero-media`
 * en position absolue derrière le contenu, duoton bleu nuit + assombrissement
 * pour la lisibilité du texte. aria-hidden, tabindex=-1, muted, playsinline,
 * preload="none", poster fourni. Jamais LCP : sollicitée seulement après le
 * chargement du contenu essentiel (window load). Désactivée sous
 * prefers-reduced-motion et en saveData / 2G (le poster reste comme fond). Mise
 * en pause sur visibilitychange. Correcte si la vidéo ou le poster manquent.
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
    // Vidéo réservée au desktop / à la grande tablette : sous 900 px, le fichier
    // n'est jamais sollicité — les <source> ne sont injectées que si cette requête
    // média est satisfaite (le poster reste comme fond sur mobile).
    const desktop = mq("(min-width: 900px)");

    const reseauLent = () => {
      const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      return !!(c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || "")));
    };
    const autorisee = () => desktop.matches && !reduce.matches && !reseauLent();

    // Les sources ne sont ajoutées qu'ici : tant qu'elles sont absentes du DOM,
    // le navigateur ne télécharge aucun fichier (preload="none").
    const SOURCES = [
      { src: "/videos/rgpd-hero.webm", type: "video/webm" },
      { src: "/videos/rgpd-hero.mp4", type: "video/mp4" },
    ];
    const ajouterSources = () => {
      if (video.querySelector("source")) return;
      for (const s of SOURCES) {
        const el = document.createElement("source");
        el.src = s.src;
        el.type = s.type;
        video.appendChild(el);
      }
      video.load();
    };

    const init = () => {
      if (!autorisee()) {
        video.pause();
        return;
      }
      ajouterSources();
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
        ajouterSources();
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    reduce.addEventListener?.("change", init);
    desktop.addEventListener?.("change", init);

    return () => {
      window.removeEventListener("load", init);
      document.removeEventListener("visibilitychange", onVis);
      reduce.removeEventListener?.("change", init);
      desktop.removeEventListener?.("change", init);
    };
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
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
        {/* Les <source> sont injectées par le script uniquement ≥ 760 px
            (voir useEffect) : en mobile, aucun fichier vidéo n'est téléchargé. */}
      </video>
      {/* Couches décoratives : duoton bleu nuit + assombrissement pour la
          lisibilité du texte du hero. */}
      <div className="media-color" aria-hidden="true" />
      <div className="media-lift" aria-hidden="true" />
    </div>
  );
}
