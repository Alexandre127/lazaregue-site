"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Logo from "./logo";
import {
  aHeroSombre,
  FAMILLES,
  NAV_ENTRIES,
  PANEL_DOMAINES_FOOTER,
  TEL,
} from "./nav-data";
import styles from "./site-header.module.css";

/**
 * En-tête global du site (menu v2, d'après la maquette du 24.09.2026).
 *
 * Deux états sur ordinateur (≥1280px) :
 *  · au repos : transparent, 104px, posé sur le hero (uniquement sur les pages à
 *    hero sombre) ;
 *  · collant / opaque : au-delà de 40px de défilement — ou d'emblée sur les pages
 *    dont le hero n'est pas sombre — Deep Navy translucide + flou, 76px, filet bas.
 *
 * « Domaines » ouvre un panneau (survol 60/450ms avec passerelle invisible, clic,
 * clavier) ; les zones de lien font 54px, aucun élément ne bouge. Sous 1280px :
 * menu plein écran avec accordéon. La barre basse « Nous écrire / téléphone »
 * reste en place partout, masquée seulement quand le menu plein écran est ouvert.
 *
 * Hauteurs pilotées par --header-h / --header-h-compact (globals.css). Mouvement
 * réduit géré en CSS.
 */

const CONTACT_HREF = "/contact";

function chevronPath() {
  return (
    <path
      d="M1 1.5L6 6.5L11 1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const heroSombre = aHeroSombre(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [openedByClick, setOpenedByClick] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);

  // Opaque/compact d'emblée si le hero n'est pas sombre ; sinon transparent au
  // repos et opaque au défilement (> 40px).
  const solid = scrolled || !heroSombre;

  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navItemRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* ---- État collant : au-delà de 40px de défilement ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Barre basse mobile : après le premier tiers de défilement ---- */
  useEffect(() => {
    const onScroll = () => setShowBottomBar(window.scrollY > window.innerHeight / 3);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ---- Barre basse masquée quand le bloc contact entre à l'écran ---- */
  useEffect(() => {
    const cible = document.querySelector("#contact");
    if (!cible) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShowBottomBar(false);
      },
      { threshold: 0 },
    );
    io.observe(cible);
    return () => io.disconnect();
  }, [pathname]);

  /* ---- Fermer les menus au changement de route ---- */
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setPanelOpen(false);
    setOpenedByClick(false);
    setMobileOpen(false);
  }, [pathname]);

  /* ---- Verrou de défilement quand le menu plein écran est ouvert ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const closePanel = useCallback((focusTrigger = false) => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanelOpen(false);
    setOpenedByClick(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  /* ---- Échap ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (panelOpen) closePanel(true);
      if (mobileOpen) closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, mobileOpen, closePanel, closeMobile]);

  /* ---- Clic extérieur : ferme le panneau ---- */
  useEffect(() => {
    if (!panelOpen) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (navItemRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      setPanelOpen(false);
      setOpenedByClick(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [panelOpen]);

  /* ---- Survol : ouverture 60ms, fermeture 450ms (passerelle invisible en CSS) ----
     Actif seulement sur les pointeurs qui survolent (souris/stylet). */
  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  const openOnHover = () => {
    if (!hoverCapable()) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (panelOpen) return;
    openTimer.current = window.setTimeout(() => setPanelOpen(true), 60);
  };
  const closeOnHover = () => {
    if (!hoverCapable() || openedByClick) return;
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setPanelOpen(false), 450);
  };

  const toggleByClick = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    const next = !panelOpen;
    setPanelOpen(next);
    setOpenedByClick(next);
  };

  const panelLinks = () =>
    panelRef.current
      ? Array.from(panelRef.current.querySelectorAll<HTMLAnchorElement>("a"))
      : [];

  const openAndFocusFirst = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanelOpen(true);
    setOpenedByClick(true);
    // Le focus entre dans le panneau une fois celui-ci rendu et visible.
    window.setTimeout(() => panelLinks()[0]?.focus(), 60);
  };

  /* Clavier sur le bouton Domaines : Entrée / Espace / Flèche bas ouvrent. */
  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      openAndFocusFirst();
    }
  };

  /* Clavier dans le panneau : Flèches, Début, Fin naviguent entre les liens. */
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    const links = panelLinks();
    if (!links.length) return;
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(i + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) {
        closePanel(true);
      } else {
        links[i - 1]?.focus();
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1]?.focus();
    }
  };

  // Rubrique active : une page de domaine → Domaines, etc.
  const activeHref = (() => {
    if (!pathname) return null;
    if (pathname === "/nos-domaines" || pathname.startsWith("/nos-domaines/")) return "/nos-domaines";
    const e = NAV_ENTRIES.find(
      (x) => x.type === "link" && (pathname === x.href || pathname.startsWith(x.href + "/")),
    );
    return e?.href ?? null;
  })();

  return (
    <>
      <header
        className={`${styles.header}${solid ? ` ${styles.solid}` : ""}${
          panelOpen ? ` ${styles.panelActive}` : ""
        }`}
        data-solid={solid ? "true" : "false"}
      >
        <div className={styles.bar}>
          <Logo isHome={isHome} />

          {/* --- Navigation ordinateur (≥1280px) --- */}
          <nav className={styles.nav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              {NAV_ENTRIES.map((entry) => {
                if (entry.type === "panel") {
                  const domActive = activeHref === "/nos-domaines";
                  return (
                    <li
                      key={entry.label}
                      className={styles.navItem}
                      ref={navItemRef}
                      onMouseEnter={openOnHover}
                      onMouseLeave={closeOnHover}
                    >
                      <button
                        type="button"
                        ref={triggerRef}
                        className={`${styles.navLink} ${styles.navButton}${
                          panelOpen ? ` ${styles.navLinkOpen}` : ""
                        }`}
                        aria-expanded={panelOpen}
                        aria-controls={panelId}
                        aria-current={domActive ? "page" : undefined}
                        onClick={toggleByClick}
                        onKeyDown={onTriggerKeyDown}
                      >
                        {entry.label}
                        <svg viewBox="0 0 12 8" width="11" height="8" aria-hidden="true" className={styles.chevronIcon}>
                          {chevronPath()}
                        </svg>
                      </button>
                    </li>
                  );
                }
                const active = activeHref === entry.href;
                return (
                  <li key={entry.label} className={styles.navItem}>
                    <Link
                      className={styles.navLink}
                      href={entry.href}
                      aria-current={active ? "page" : undefined}
                    >
                      {entry.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- Bouton « Nous écrire » (toujours visible, ordinateur) --- */}
          <Link className={styles.cta} href={CONTACT_HREF}>
            Nous écrire <span aria-hidden="true">→</span>
          </Link>

          {/* --- Bouton « Menu » (mobile / tablette) --- */}
          <button
            ref={hamburgerRef}
            type="button"
            className={styles.burger}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-menu"
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          >
            <span className={styles.burgerLabel}>{mobileOpen ? "Fermer" : "Menu"}</span>
            <span className={styles.burgerBars} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>

        {/* --- Panneau « Domaines » (pleine largeur sous la barre) --- */}
        <div
          id={panelId}
          ref={panelRef}
          className={`${styles.panel}${panelOpen ? ` ${styles.panelOpen}` : ""}`}
          role="region"
          aria-label="Domaines d'intervention"
          onMouseEnter={openOnHover}
          onMouseLeave={closeOnHover}
          onKeyDown={onPanelKeyDown}
        >
          <div className={styles.panelInner}>
            <div className={styles.panelHead}>
              <p className={styles.panelHeadLabel}>Dix domaines, trois familles</p>
              <Link className={styles.panelAll} href={PANEL_DOMAINES_FOOTER.lien.href}>
                Tous les domaines <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={styles.panelCols}>
              {FAMILLES.map((f) => (
                <div className={styles.panelCol} key={f.intitule}>
                  <h3 className={styles.familleLabel}>{f.intitule}</h3>
                  <ul className={styles.cardList}>
                    {f.domaines.map((d) => (
                      <li key={d.href}>
                        <Link className={styles.card} href={d.href} tabIndex={panelOpen ? 0 : -1}>
                          <span className={styles.cardTitle}>{d.titre}</span>
                          <span className={styles.cardArrow} aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* --- Menu plein écran (mobile / tablette) --- */}
      <MobileMenu open={mobileOpen} onClose={closeMobile} activeHref={activeHref} />

      {/* --- Barre basse mobile --- */}
      <div
        className={`${styles.bottomBar}${showBottomBar && !mobileOpen ? ` ${styles.bottomBarShown}` : ""}`}
        aria-hidden={!showBottomBar || mobileOpen}
      >
        <Link className={styles.bottomBarBtn} href={CONTACT_HREF} tabIndex={showBottomBar && !mobileOpen ? 0 : -1}>
          NOUS ÉCRIRE
        </Link>
        <a
          className={styles.bottomBarTel}
          href={TEL.href}
          aria-label={`Appeler le cabinet — ${TEL.display}`}
          tabIndex={showBottomBar && !mobileOpen ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </a>
      </div>
    </>
  );
}

/* ---------------- Menu plein écran (mobile / tablette) ---------------- */
function MobileMenu({
  open,
  onClose,
  activeHref,
}: {
  open: boolean;
  onClose: () => void;
  activeHref: string | null;
}) {
  const [accordion, setAccordion] = useState(false);
  const accId = useId();

  return (
    <nav
      id="site-mobile-menu"
      className={`${styles.mmenu}${open ? ` ${styles.mmenuOpen}` : ""}`}
      aria-label="Navigation principale (mobile)"
      hidden={!open}
    >
      <ul className={styles.mlist}>
        {/* DOMAINES — accordéon */}
        <li className={styles.maccItem}>
          <button
            type="button"
            className={styles.mlink}
            aria-expanded={accordion}
            aria-controls={accId}
            aria-current={activeHref === "/nos-domaines" ? "page" : undefined}
            onClick={() => setAccordion((o) => !o)}
          >
            Domaines
            <span className={styles.msign} aria-hidden="true">{accordion ? "–" : "+"}</span>
          </button>
          <div id={accId} className={`${styles.macc}${accordion ? ` ${styles.maccOpen}` : ""}`}>
            {FAMILLES.map((f) => (
              <div className={styles.mfam} key={f.intitule}>
                <h4 className={styles.mfamLabel}>{f.intitule}</h4>
                {f.domaines.map((d) => (
                  <Link className={styles.macclink} href={d.href} key={d.href} onClick={onClose}>
                    {d.titre}
                  </Link>
                ))}
              </div>
            ))}
            <Link className={styles.macclink} href={PANEL_DOMAINES_FOOTER.lien.href} onClick={onClose}>
              {PANEL_DOMAINES_FOOTER.lien.label}
            </Link>
          </div>
        </li>

        {NAV_ENTRIES.filter((e) => e.type !== "panel").map((e) => (
          <li key={e.label}>
            <Link
              className={styles.mlink}
              href={e.href}
              aria-current={activeHref === e.href ? "page" : undefined}
              onClick={onClose}
            >
              {e.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link className={styles.mcta} href={CONTACT_HREF} onClick={onClose}>
        Nous écrire <span aria-hidden="true">→</span>
      </Link>
      <p className={styles.mfoot}>
        <a href={TEL.href}>{TEL.display}</a>
        <br />
        18 rue de Tilsitt, 75017 Paris
      </p>
    </nav>
  );
}

export default SiteHeader;
