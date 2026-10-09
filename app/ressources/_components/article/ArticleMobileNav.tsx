"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./article.module.css";

export type TocItem = { id: string; label: string };
type Cta = { href: string; label: string };

/**
 * Chrome mobile du gabarit d'article (maquettes 05 et 06), affiché uniquement
 * sous 767 px (masqué en desktop par le CSS). Trois éléments :
 *  1. barre « Sommaire » collante sous l'en-tête : progression de lecture +
 *     libellé de la section courante ;
 *  2. panneau plein écran (liste numérotée du sommaire, entrée courante en
 *     bleu, fermeture par croix ou touche Échap) ;
 *  3. barre d'action fixe en bas : ouverture du sommaire + appel à l'action.
 * Le rendu desktop n'est pas affecté (les nœuds sont `display:none` ≥ 768 px).
 */
export default function ArticleMobileNav({
  toc,
  cta = { href: "/contact", label: "Échanger avec un avocat" },
}: {
  toc: TocItem[];
  cta?: Cta;
}) {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(-1); // -1 = introduction (avant la 1re section)
  const raf = useRef<number | null>(null);

  // Progression de lecture + section courante, recalculées au défilement.
  const measure = useCallback(() => {
    raf.current = null;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    setProgress(scrollable > 0 ? Math.min(1, Math.max(0, doc.scrollTop / scrollable)) : 0);
    // Ligne de détection sous l'en-tête global + la barre Sommaire collante.
    const line = 140;
    let idx = -1;
    for (let i = 0; i < toc.length; i++) {
      const el = document.getElementById(toc[i].id);
      if (el && el.getBoundingClientRect().top <= line) idx = i;
    }
    setCurrent(idx);
  }, [toc]);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current == null) raf.current = window.requestAnimationFrame(measure);
    };
    onScroll(); // première mesure hors du corps de l'effet (via rAF)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
    };
  }, [measure]);

  // Verrou de défilement + fermeture au clavier quand le panneau est ouvert.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Rafraîchit le libellé/la progression une fois le défilement lissé terminé.
      window.setTimeout(() => {
        if (raf.current == null) raf.current = window.requestAnimationFrame(measure);
      }, 500);
    }
  };

  const listIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
  // Les libellés du sommaire portent déjà « 1. », « 2. »… : on retire ce préfixe
  // pour le mobile, où le numéro est affiché dans une gouttière dédiée (maquette 06).
  const strip = (s: string) => s.replace(/^\s*\d+\s*[.)]\s*/, "");
  const currentLabel = current < 0 ? "Introduction" : strip(toc[current]?.label ?? "");

  return (
    <>
      {/* 1. Barre « Sommaire » collante */}
      <div className={styles.mNav} role="presentation">
        <div className={styles.mProg} aria-hidden="true">
          <span style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
        <button type="button" className={styles.mNavBtn} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
          <span className={styles.mNavLabel}>
            {listIcon}
            Sommaire
          </span>
          <span className={styles.mNavCur}>{currentLabel}</span>
        </button>
      </div>

      {/* 2. Panneau plein écran */}
      {open ? (
        <div className={styles.mPanelWrap} role="dialog" aria-modal="true" aria-label="Sommaire de l’article">
          <button type="button" className={styles.mPanelScrim} aria-label="Fermer le sommaire" onClick={() => setOpen(false)} />
          <nav className={styles.mPanel} aria-label="Sommaire de l’article">
            <div className={styles.mPanelTop}>
              <span className={styles.mPanelTitle}>Sommaire</span>
              <button type="button" className={styles.mPanelClose} aria-label="Fermer le sommaire" onClick={() => setOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className={styles.mPanelList}>
              {toc.map((t, i) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={styles.mItem}
                  aria-current={i === current ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(t.id);
                  }}
                >
                  <span className={styles.mItemN}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{strip(t.label)}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      ) : null}

      {/* 3. Barre d'action fixe */}
      <div className={styles.mBar}>
        <button type="button" className={styles.mBarIcon} aria-label="Ouvrir le sommaire" onClick={() => setOpen(true)}>
          {listIcon}
        </button>
        <Link href={cta.href} className={styles.mBarCta}>
          {cta.label}
        </Link>
      </div>
    </>
  );
}
