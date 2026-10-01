"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./cybercriminalite.module.css";

/**
 * Vidéo décorative du Palais de justice (fichiers récupérés de la version
 * précédente). Règles du prompt :
 *  - muted, loop, playsinline, poster systématique, dimensions déclarées ;
 *  - `preload="metadata"` (héros) / `"none"` (bande, différée) ;
 *  - décorative → `aria-hidden` ; aucune information ne dépend de la vidéo ;
 *  - bouton pause/lecture visible ≥ 44×44, au clavier, libellé explicite
 *    (obligatoire pour une animation en boucle > 5 s) ;
 *  - `prefers-reduced-motion: reduce` → pas de lecture auto, poster seul ; un
 *    passage à `reduce` met en pause immédiatement ;
 *  - lecture démarrée à l'entrée dans le viewport, pause en sortie / onglet caché ;
 *  - toute erreur laisse silencieusement le poster en place (le conteneur porte
 *    aussi un fond dégradé de repli si le poster manque).
 *
 * Le poster du héros est préchargé en priorité côté page pour rester l'élément
 * LCP à la place de la vidéo.
 */
export function PalaisVideo({
  webm,
  mp4,
  poster,
  preload,
  containerClassName,
  videoStyle,
}: {
  webm: string;
  mp4: string;
  poster: string;
  preload: "metadata" | "none";
  containerClassName: string;
  videoStyle?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const reduced = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Desktop / grande tablette uniquement : sous 900 px, les <source> gardent
    // leur data-src sans jamais recevoir de src → aucun fichier vidéo n'est
    // téléchargé sur mobile (le poster tient lieu de fond).
    const desktop = window.matchMedia("(min-width: 900px)");
    reduced.current = mq.matches;
    let inView = false;
    let io: IntersectionObserver | null = null;

    const injecter = () => {
      if (v.querySelector("source[src]")) return;
      v.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((s) => {
        s.src = s.getAttribute("data-src") || "";
      });
      v.load();
    };

    const sync = () => {
      if (desktop.matches && inView && !document.hidden && !reduced.current && !userPaused.current) {
        injecter();
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    };

    const startObserving = () => {
      if (io || !desktop.matches) return;
      io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); }, { threshold: 0.1 });
      io.observe(v);
    };
    startObserving();

    const onVis = () => sync();
    document.addEventListener("visibilitychange", onVis);
    const onMotion = () => { reduced.current = mq.matches; sync(); };
    mq.addEventListener?.("change", onMotion);
    const onDesktop = () => { startObserving(); sync(); };
    desktop.addEventListener?.("change", onDesktop);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener?.("change", onMotion);
      desktop.removeEventListener?.("change", onDesktop);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; void v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <div className={`media ${containerClassName}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload={preload}
        poster={poster}
        width={1920}
        height={1080}
        aria-hidden="true"
        tabIndex={-1}
        style={videoStyle}
      >
        {/* data-src (pas src) : injecté par le useEffect uniquement ≥ 900 px,
            donc aucun téléchargement vidéo sous 900 px. */}
        <source data-src={webm} type="video/webm" />
        <source data-src={mp4} type="video/mp4" />
      </video>
      <button type="button" className={styles.videoBtn} onClick={toggle} aria-label={playing ? "Mettre en pause la vidéo" : "Lire la vidéo"}>
        <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
    </div>
  );
}
