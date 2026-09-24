"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Logo from "./logo";
import {
  ADRESSE,
  aHeroSombre,
  FAMILLES,
  NAV_ENTRIES,
  PANEL_DOMAINES_FOOTER,
  TEL,
} from "./nav-data";
import styles from "./site-header.module.css";

/**
 * Header global du site — réintégré d'après `home-menu-maquette.html` (23 sept.
 * 2026). Réglages EXACTS repris de la maquette :
 *   · Repos sur hero sombre : transparent, 104 px. Au défilement (> 40 px) :
 *     fond bleu nuit translucide + flou, filet bas, 76 px, logo réduit (350 ms).
 *   · Panneau « Domaines » : passerelle invisible (le survol ne se coupe pas),
 *     ouverture différée 60 ms, fermeture différée 450 ms annulée au retour,
 *     fondu + translation 6 px (180 ms), AUCUNE animation de hauteur.
 *   · Zones cliquables des liens ≥ 54 px. Clavier complet (flèches, Début, Fin,
 *     Échap). Lien d'évitement global hors-écran. Menu plein écran < 1280 px.
 *
 * Source de données UNIQUE (nav-data.ts) pour le header ET le tiroir mobile.
 * Routes RÉELLES du projet (les href de la maquette sont des exemples).
 */

const CONTACT_HREF = "/contact";
const DOMAINES_INDEX = PANEL_DOMAINES_FOOTER.lien.href; // /nos-domaines

// Réglages de survol (ms), calqués sur la maquette.
const OPEN_DELAY = 60;
const CLOSE_DELAY = 450;
const CLICK_GUARD = 500; // un clic < 500 ms après l'ouverture au survol n'referme pas

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Transparent au repos sur les pages à hero sombre ; opaque ailleurs
  // (drapeau déclaratif, cf. nav-data → aHeroSombre). Connu dès le SSR.
  const heroSombre = aHeroSombre(pathname);

  const [solid, setSolid] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navItemRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const hoverAt = useRef(0);
  const hoverCapable = useRef(false);

  const clearTimers = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const openPanel = useCallback(() => {
    clearTimers();
    setPanelOpen(true);
  }, []);

  const closePanel = useCallback((focusTrigger = false) => {
    clearTimers();
    setPanelOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  /* ---- Détection d'un pointeur fin (souris) : le survol n'est câblé que là ---- */
  useEffect(() => {
    hoverCapable.current = window.matchMedia("(hover:hover)").matches;
  }, []);

  /* ---- État « solide » : au-delà de 40 px de défilement (seuil de la maquette).
     Le tiroir mobile ouvert force l'état solide (barre lisible). ---- */
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Fermer les menus au changement de route (le header persiste dans le
     layout : pas de remontage). ---- */
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setPanelOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /* ---- Verrou de défilement quand le tiroir mobile est ouvert ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- Échap : ferme le panneau (retour focus au bouton) ou le tiroir ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (panelOpen) closePanel(true);
      if (mobileOpen) closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, mobileOpen, closePanel, closeMobile]);

  /* ---- Clic hors du header : ferme le panneau ---- */
  useEffect(() => {
    if (!panelOpen) return;
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        clearTimers();
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [panelOpen]);

  /* ---- Survol : ouverture différée (60 ms), fermeture différée (450 ms) ----
     Le panneau est rendu À L'INTÉRIEUR du <li> conteneur : descendre du bouton
     vers le panneau ne déclenche pas le `mouseleave` du conteneur, et la
     passerelle CSS (`.navItem::after`, `.panel::before`) couvre le vide visuel.
     La fermeture est annulée dès qu'on revient dans le conteneur ou qu'on bouge
     dans le panneau. */
  const onContainerEnter = () => {
    if (!hoverCapable.current) return;
    clearTimers();
    openTimer.current = window.setTimeout(() => {
      if (!panelOpen) hoverAt.current = Date.now();
      setPanelOpen(true);
    }, OPEN_DELAY);
  };
  const onContainerLeave = () => {
    if (!hoverCapable.current) return;
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setPanelOpen(false), CLOSE_DELAY);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  /* ---- Clic sur le chevron : bascule. Un clic < 500 ms après l'ouverture au
     survol ne referme PAS (sinon l'ouverture au survol serait annulée). ---- */
  const onTriggerClick = () => {
    if (panelOpen && Date.now() - hoverAt.current > CLICK_GUARD) {
      closePanel();
    } else {
      hoverAt.current = Date.now();
      openPanel();
    }
  };

  /* ---- Flèche bas depuis le bouton : ouvre + place le focus sur le 1er domaine ---- */
  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openPanel();
      requestAnimationFrame(() =>
        window.setTimeout(() => {
          panelRef.current?.querySelector<HTMLAnchorElement>("a[data-dom]")?.focus();
        }, 20),
      );
    }
  };

  /* ---- Clavier dans le panneau : flèches (cycliques) sur les DIX domaines,
     Début, Fin. Le lien « Tous les domaines » reste accessible à la tabulation
     mais hors du cycle fléché (le brief ne fait parcourir que les domaines). ---- */
  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    const links = panelRef.current
      ? Array.from(panelRef.current.querySelectorAll<HTMLAnchorElement>("a[data-dom]"))
      : [];
    if (!links.length) return;
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      links[(i + 1) % links.length].focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      links[(i - 1 + links.length) % links.length].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      links[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      links[links.length - 1].focus();
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const p = pathname && pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    return p === href || (p ? p.startsWith(href + "/") : false);
  };

  return (
    <>
      {/* Lien d'évitement GLOBAL (un seul sur tout le site) : hors-écran, jamais
          display:none ; visible uniquement au focus clavier, au-dessus de tout.
          Premier élément focalisable de la page. */}
      <a className={styles.skip} href="#contenu">
        Aller au contenu
      </a>

      <header
        ref={headerRef}
        className={`${styles.header}${heroSombre ? ` ${styles.heroDark}` : ""}${
          solid || mobileOpen ? ` ${styles.solid}` : ""
        }${panelOpen ? ` ${styles.open}` : ""}`}
        data-solid={solid || mobileOpen ? "true" : "false"}
      >
        <div className={styles.bar}>
          <Logo isHome={isHome} />

          {/* --- Navigation desktop --- */}
          <nav className={styles.nav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              {NAV_ENTRIES.map((entry) => {
                if (entry.type === "panel") {
                  const active = isActive(entry.href);
                  return (
                    <li
                      key={entry.label}
                      className={styles.navItem}
                      ref={navItemRef}
                      onMouseEnter={onContainerEnter}
                      onMouseLeave={onContainerLeave}
                    >
                      {/* Libellé = lien vers la rubrique ; chevron = bouton du
                          panneau (accès à la rubrique en tactile). */}
                      <Link
                        className={`${styles.navLink}${panelOpen ? ` ${styles.navLinkOpen}` : ""}`}
                        href={entry.href}
                        aria-current={active ? "page" : undefined}
                      >
                        {entry.label}
                      </Link>
                      <button
                        type="button"
                        ref={triggerRef}
                        className={styles.chevron}
                        aria-expanded={panelOpen}
                        aria-controls={panelId}
                        aria-label={panelOpen ? "Fermer le panneau des domaines" : "Ouvrir le panneau des domaines"}
                        onClick={onTriggerClick}
                        onKeyDown={onTriggerKeyDown}
                      >
                        <svg viewBox="0 0 12 8" width="11" height="8" aria-hidden="true" className={styles.chevronIcon}>
                          <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {/* Panneau rendu dans le <li>, calé sur le header (pleine
                          largeur). Toujours dans le DOM (SSR) ; masqué en CSS. */}
                      <div
                        id={panelId}
                        ref={panelRef}
                        className={`${styles.panel}${panelOpen ? ` ${styles.panelOpen}` : ""}`}
                        role="region"
                        aria-label="Domaines d'intervention"
                        onMouseMove={cancelClose}
                        onMouseEnter={cancelClose}
                        onKeyDown={onPanelKeyDown}
                      >
                        <div className={styles.panelInner}>
                          <div className={styles.panelHead}>
                            <p className={styles.panelLabel}>Dix domaines, trois familles</p>
                            <Link className={styles.panelAll} href={DOMAINES_INDEX}>
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
                                      <Link className={styles.card} href={d.href} data-dom>
                                        <span className={styles.cardText}>
                                          <span className={styles.cardTitle}>{d.titre}</span>
                                          <span className={styles.cardContext}>{d.contexte}</span>
                                        </span>
                                        <span className={styles.cardAr} aria-hidden="true">→</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <p className={styles.panelMention}>{PANEL_DOMAINES_FOOTER.mention}</p>
                        </div>
                      </div>
                    </li>
                  );
                }
                const active = isActive(entry.href);
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

          {/* --- Bouton d'action persistant --- */}
          <Link className={styles.cta} href={CONTACT_HREF}>
            Nous écrire <span className={styles.ctaAr} aria-hidden="true">→</span>
          </Link>

          {/* --- Bouton Menu (mobile / tablette) --- */}
          <button
            ref={hamburgerRef}
            type="button"
            className={styles.burger}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className={styles.burgerTxt}>{mobileOpen ? "Fermer" : "Menu"}</span>
            <span className={styles.burgerBars} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      {/* --- Tiroir plein écran (mobile / tablette) --- */}
      <MobileDrawer id="menu-mobile" open={mobileOpen} onClose={closeMobile} isActive={isActive} />
    </>
  );
}

/* ---------------- Tiroir mobile ---------------- */
function MobileDrawer({
  id,
  open,
  onClose,
  isActive,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const [accordion, setAccordion] = useState(false);
  const accId = useId();

  return (
    <nav
      id={id}
      className={`${styles.drawer}${open ? ` ${styles.drawerOpen}` : ""}`}
      aria-label="Navigation principale (mobile)"
      aria-hidden={!open}
    >
      <ul className={styles.drawerList}>
        {NAV_ENTRIES.map((entry) => {
          if (entry.type === "panel") {
            return (
              <li key={entry.label}>
                <button
                  type="button"
                  className={styles.drawerRow}
                  aria-expanded={accordion}
                  aria-controls={accId}
                  onClick={() => setAccordion((o) => !o)}
                >
                  {entry.label}
                  <span className={styles.drawerSign} aria-hidden="true">{accordion ? "–" : "+"}</span>
                </button>
                <div className={`${styles.acc}${accordion ? ` ${styles.accOpen}` : ""}`} id={accId}>
                  {FAMILLES.map((f) => (
                    <div key={f.intitule}>
                      <h4 className={styles.accHead}>{f.intitule}</h4>
                      {f.domaines.map((d) => (
                        <Link key={d.href} className={styles.accLink} href={d.href} onClick={onClose} tabIndex={open ? 0 : -1}>
                          {d.titre}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </li>
            );
          }
          const active = isActive(entry.href);
          return (
            <li key={entry.label}>
              <Link
                className={styles.drawerRow}
                href={entry.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                tabIndex={open ? 0 : -1}
              >
                {entry.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link className={styles.drawerCta} href={CONTACT_HREF} onClick={onClose} tabIndex={open ? 0 : -1}>
        Nous écrire <span aria-hidden="true">→</span>
      </Link>
      <p className={styles.drawerFoot}>
        <a href={TEL.href} tabIndex={open ? 0 : -1}>{TEL.display}</a>
        <br />
        {ADRESSE}
      </p>
    </nav>
  );
}

export default SiteHeader;
