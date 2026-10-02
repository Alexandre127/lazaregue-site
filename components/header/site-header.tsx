"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./logo";
import {
  FAMILLES,
  FORMATIONS_LINKS,
  NAV_ENTRIES,
  PANEL_DOMAINES_FOOTER,
  TEL,
} from "./nav-data";
import styles from "./site-header.module.css";

/**
 * En-tête global du site.
 *
 * · Fond Deep Navy plein (#0A0F2E) en PERMANENCE — aucune transparence ni flou,
 *   au repos comme au défilement. La hauteur se compacte légèrement au défilement.
 * · Navigation complète dès 900px (ordinateur et tablette large) ; bouton « Menu »
 *   et menu plein écran uniquement SOUS 900px. La barre basse n'apparaît que
 *   sous 900px.
 * · « Domaines » et « Formations » suivent le modèle W3C « Disclosure Navigation
 *   Menu with Top-Level Links » : le libellé est un LIEN (vers /nos-domaines,
 *   /formations) et un bouton flèche distinct (aria-expanded / aria-controls)
 *   ouvre le sous-menu. Aucun role="menu".
 * · Sur les pages articles et en mobile uniquement, l'en-tête se masque au
 *   défilement vers le bas et réapparaît à la remontée (300ms, coupé sous
 *   prefers-reduced-motion). La barre Sommaire et la barre basse restent visibles.
 *
 * Hauteurs pilotées par --header-h / --header-h-compact (globals.css).
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

  /* Barre basse globale masquée là où la page porte sa propre barre :
     /contact (formulaire), les articles du gabarit /ressources/<slug> et les
     détails de cas /cas-clients/<slug>. */
  const isGabaritArticle =
    !!pathname && pathname.startsWith("/ressources/") && pathname !== "/ressources/oeuvre-originale";
  const isCaseDetail = !!pathname && pathname.startsWith("/cas-clients/");
  const hideBottomBar = pathname === "/contact" || isGabaritArticle || isCaseDetail;

  /* Pages « article » : gabarit /ressources/<slug> (barre Sommaire présente),
     y compris « oeuvre-originale ». Le masquage au défilement (mobile) s'y applique. */
  const isArticle = !!pathname && pathname.startsWith("/ressources/") && pathname !== "/ressources";

  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openedByClick, setOpenedByClick] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);

  // Fond toujours plein ; `solid` ne pilote plus que la hauteur compacte + le filet.
  const solid = scrolled;

  const headerRef = useRef<HTMLElement>(null);
  const arrowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  /* ---- État collant (hauteur compacte) : au-delà de 40px de défilement ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Barre basse mobile : après le premier tiers de défilement ---- */
  useEffect(() => {
    const onScroll = () => setShowBottomBar(!hideBottomBar && window.scrollY > window.innerHeight / 3);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hideBottomBar]);

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

  /* ---- Articles (mobile) : masquer l'en-tête au défilement vers le bas,
     le réafficher à la remontée. Le CSS ne transforme l'en-tête que sous 900px. ---- */
  useEffect(() => {
    if (!isArticle) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect */
      setHiddenByScroll(false);
      return;
    }
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (mobileOpen || openMenu) {
        lastY.current = y;
        return;
      }
      const goingDown = y > lastY.current;
      if (goingDown && y > 90) setHiddenByScroll(true);
      else if (!goingDown) setHiddenByScroll(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticle, mobileOpen, openMenu]);

  /* ---- Signale l'en-tête masqué à la page (la barre Sommaire des articles
     remonte alors en haut, sans laisser de bande de contenu au-dessus). ---- */
  useEffect(() => {
    const el = document.documentElement;
    if (hiddenByScroll) el.setAttribute("data-header-hidden", "true");
    else el.removeAttribute("data-header-hidden");
    return () => el.removeAttribute("data-header-hidden");
  }, [hiddenByScroll]);

  /* ---- Fermer les menus au changement de route ---- */
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setOpenMenu(null);
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

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const closeMenu = useCallback((id?: string, focusArrow = false) => {
    clearTimers();
    setOpenMenu(null);
    setOpenedByClick(false);
    if (focusArrow && id) arrowRefs.current[id]?.focus();
  }, []);

  /* ---- Échap ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) closeMenu(openMenu, true);
      if (mobileOpen) closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openMenu, mobileOpen, closeMenu, closeMobile]);

  /* ---- Clic extérieur : ferme le sous-menu ouvert ---- */
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (headerRef.current?.contains(t)) return;
      clearTimers();
      setOpenMenu(null);
      setOpenedByClick(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openMenu]);

  /* ---- Survol : ouverture 60ms, fermeture 450ms. Pointeurs survolants only. ---- */
  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  const openOnHover = (id: string) => {
    if (!hoverCapable()) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (openMenu === id) return;
    openTimer.current = window.setTimeout(() => setOpenMenu(id), 60);
  };
  const closeOnHover = () => {
    if (!hoverCapable() || openedByClick) return;
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 450);
  };

  const toggleByClick = (id: string) => {
    clearTimers();
    const willOpen = openMenu !== id;
    setOpenMenu(willOpen ? id : null);
    setOpenedByClick(willOpen);
  };

  const menuLinks = (id: string) =>
    Array.from(document.getElementById(id)?.querySelectorAll<HTMLAnchorElement>("a") ?? []);

  const openAndFocusFirst = (id: string) => {
    clearTimers();
    setOpenMenu(id);
    setOpenedByClick(true);
    window.setTimeout(() => menuLinks(id)[0]?.focus(), 60);
  };

  /* Clavier sur le bouton flèche : Entrée / Espace / Flèche bas ouvrent et
     placent le focus sur le premier lien du sous-menu. */
  const onArrowKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      openAndFocusFirst(id);
    }
  };

  /* Clavier dans un sous-menu : Flèches, Début, Fin. Flèche haut sur le premier
     lien referme et rend le focus au bouton flèche. */
  const onMenuKeyDown = (e: React.KeyboardEvent, id: string) => {
    const links = menuLinks(id);
    if (!links.length) return;
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      links[Math.min(i + 1, links.length - 1)]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i <= 0) closeMenu(id, true);
      else links[i - 1]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1]?.focus();
    }
  };

  // Rubrique active : une page de domaine → Domaines, /formations/* → Formations, etc.
  const activeHref = (() => {
    if (!pathname) return null;
    if (pathname === "/nos-domaines" || pathname.startsWith("/nos-domaines/")) return "/nos-domaines";
    if (pathname === "/formations" || pathname.startsWith("/formations/")) return "/formations";
    const e = NAV_ENTRIES.find(
      (x) => x.type === "link" && (pathname === x.href || pathname.startsWith(x.href + "/")),
    );
    return e && "href" in e ? e.href : null;
  })();

  const panelDomaines = NAV_ENTRIES.find((e) => e.type === "panel");
  const domainesId = panelDomaines && "panelId" in panelDomaines ? panelDomaines.panelId : "panel-domaines";
  const domainesOpen = openMenu === domainesId;

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header}${solid ? ` ${styles.solid}` : ""}${
          openMenu ? ` ${styles.panelActive}` : ""
        }${hiddenByScroll ? ` ${styles.hHidden}` : ""}`}
        data-solid={solid ? "true" : "false"}
      >
        <div className={styles.bar}>
          <Logo isHome={isHome} />

          {/* --- Navigation ordinateur / tablette (≥900px) --- */}
          <nav className={styles.nav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              {NAV_ENTRIES.map((entry) => {
                if (entry.type === "link") {
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
                }

                // panel (Domaines) : le libellé ENTIER est un BOUTON qui ouvre /
                // ferme le panneau (aria-expanded, clavier, survol conservé sur le
                // <li>). Plus de lien vers /nos-domaines sur le libellé : ce lien
                // vit dans le panneau (« Tous les domaines → »).
                if (entry.type === "panel") {
                  const id = entry.panelId;
                  const open = openMenu === id;
                  return (
                    <li
                      key={entry.label}
                      className={styles.navItem}
                      onMouseEnter={() => openOnHover(id)}
                      onMouseLeave={closeOnHover}
                    >
                      <button
                        type="button"
                        ref={(el) => {
                          arrowRefs.current[id] = el;
                        }}
                        className={`${styles.navLink}${open ? ` ${styles.navLinkOpen}` : ""}`}
                        aria-label={`${open ? "Fermer" : "Ouvrir"} le panneau ${entry.label}`}
                        aria-expanded={open}
                        aria-controls={id}
                        onClick={() => toggleByClick(id)}
                        onKeyDown={(e) => onArrowKeyDown(e, id)}
                      >
                        {entry.label}
                        <svg viewBox="0 0 12 8" width="11" height="8" aria-hidden="true" className={styles.chevronIcon}>
                          {chevronPath()}
                        </svg>
                      </button>
                    </li>
                  );
                }

                // disclosure (Formations) : libellé LIEN + bouton flèche distinct.
                const id = entry.menuId;
                const open = openMenu === id;
                const active = activeHref === entry.href;
                return (
                  <li
                    key={entry.label}
                    className={styles.navItem}
                    onMouseEnter={() => openOnHover(id)}
                    onMouseLeave={closeOnHover}
                  >
                    <Link
                      className={`${styles.navLink}${open ? ` ${styles.navLinkOpen}` : ""}`}
                      href={entry.href}
                      aria-current={active ? "page" : undefined}
                    >
                      {entry.label}
                    </Link>
                    <button
                      type="button"
                      ref={(el) => {
                        arrowRefs.current[id] = el;
                      }}
                      className={`${styles.navArrow}${open ? ` ${styles.navArrowOpen}` : ""}`}
                      aria-label={`${open ? "Fermer" : "Ouvrir"} le sous-menu ${entry.label}`}
                      aria-expanded={open}
                      aria-controls={id}
                      onClick={() => toggleByClick(id)}
                      onKeyDown={(e) => onArrowKeyDown(e, id)}
                    >
                      <svg viewBox="0 0 12 8" width="11" height="8" aria-hidden="true" className={styles.chevronIcon}>
                        {chevronPath()}
                      </svg>
                    </button>

                    {/* Sous-menu compact « Formations » (le panneau Domaines est rendu
                        pleine largeur sous la barre, plus bas). */}
                    {entry.type === "disclosure" && (
                      <ul
                        id={id}
                        className={`${styles.dropdown}${open ? ` ${styles.dropdownOpen}` : ""}`}
                        onKeyDown={(e) => onMenuKeyDown(e, id)}
                        onMouseEnter={() => openOnHover(id)}
                        onMouseLeave={closeOnHover}
                      >
                        <li className={styles.dropAllItem}>
                          <Link className={styles.dropLinkAll} href={entry.href} tabIndex={open ? 0 : -1}>
                            Toutes les formations
                          </Link>
                        </li>
                        {entry.items.map((it) => (
                          <li key={it.href}>
                            <Link
                              className={styles.dropLink}
                              href={it.href}
                              tabIndex={open ? 0 : -1}
                              aria-current={activeHref === "/formations" && pathname === it.href ? "page" : undefined}
                            >
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* --- Bouton « Écrire au cabinet » (toujours visible, ordinateur/tablette) --- */}
          <Link className={styles.cta} href={CONTACT_HREF} data-track="cta_click" data-track-composant="header">
            Écrire au cabinet <span aria-hidden="true">→</span>
          </Link>

          {/* --- Bouton « Menu » (sous 900px) --- */}
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
          id={domainesId}
          className={`${styles.panel}${domainesOpen ? ` ${styles.panelOpen}` : ""}`}
          role="region"
          aria-label="Domaines d'intervention"
          onMouseEnter={() => openOnHover(domainesId)}
          onMouseLeave={closeOnHover}
          onKeyDown={(e) => onMenuKeyDown(e, domainesId)}
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
                        <Link className={styles.card} href={d.href} tabIndex={domainesOpen ? 0 : -1}>
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

      {/* --- Menu plein écran (sous 900px) --- */}
      <MobileMenu open={mobileOpen} onClose={closeMobile} activeHref={activeHref} pathname={pathname} />

      {/* --- Barre basse mobile --- */}
      <div
        className={`${styles.bottomBar}${showBottomBar && !mobileOpen ? ` ${styles.bottomBarShown}` : ""}`}
        aria-hidden={!showBottomBar || mobileOpen}
      >
        <Link className={styles.bottomBarBtn} href={CONTACT_HREF} tabIndex={showBottomBar && !mobileOpen ? 0 : -1}>
          ÉCRIRE AU CABINET
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

/* ---------------- Menu plein écran (sous 900px) ---------------- */
function MobileMenu({
  open,
  onClose,
  activeHref,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  activeHref: string | null;
  pathname: string;
}) {
  const [domOpen, setDomOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <nav
      id="site-mobile-menu"
      className={`${styles.mmenu}${open ? ` ${styles.mmenuOpen}` : ""}`}
      aria-label="Navigation principale (mobile)"
      hidden={!open}
    >
      <ul className={styles.mlist}>
        {/* DOMAINES — le libellé ENTIER est un bouton qui ouvre/ferme la liste
            (aria-expanded, clavier). Le lien vers /nos-domaines est en bas de la
            liste (« Voir tous les domaines d'intervention »). */}
        <li className={styles.maccItem}>
          <button
            type="button"
            className={styles.mlink}
            aria-expanded={domOpen}
            aria-controls="mobile-domaines"
            aria-label={`${domOpen ? "Fermer" : "Ouvrir"} la liste des domaines`}
            onClick={() => setDomOpen((o) => !o)}
          >
            Domaines
            <span className={styles.msign} aria-hidden="true">{domOpen ? "–" : "+"}</span>
          </button>
          <div id="mobile-domaines" className={`${styles.macc}${domOpen ? ` ${styles.maccOpen}` : ""}`}>
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

        {/* FORMATIONS — libellé lien + bouton flèche (disclosure) */}
        <li className={styles.maccItem}>
          <div className={styles.mrow}>
            <Link
              className={styles.mlink}
              href="/formations"
              aria-current={activeHref === "/formations" ? "page" : undefined}
              onClick={onClose}
            >
              Formations
            </Link>
            <button
              type="button"
              className={styles.mtoggle}
              aria-expanded={formOpen}
              aria-controls="mobile-formations"
              aria-label={`${formOpen ? "Fermer" : "Ouvrir"} la liste des formations`}
              onClick={() => setFormOpen((o) => !o)}
            >
              <span className={styles.msign} aria-hidden="true">{formOpen ? "–" : "+"}</span>
            </button>
          </div>
          <div id="mobile-formations" className={`${styles.macc}${formOpen ? ` ${styles.maccOpen}` : ""}`}>
            {FORMATIONS_LINKS.map((it) => (
              <Link
                className={styles.macclink}
                href={it.href}
                key={it.href}
                aria-current={pathname === it.href ? "page" : undefined}
                onClick={onClose}
              >
                {it.label}
              </Link>
            ))}
          </div>
        </li>

        {NAV_ENTRIES.filter((e) => e.type === "link").map((e) => (
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

      <Link
        className={styles.mcta}
        href={CONTACT_HREF}
        onClick={onClose}
        data-track="cta_click"
        data-track-composant="header_mobile"
      >
        Écrire au cabinet <span aria-hidden="true">→</span>
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
