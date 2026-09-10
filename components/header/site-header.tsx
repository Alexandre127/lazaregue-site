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
 * Header global du site.
 *
 * Non négociables respectés :
 *  - Tous les liens sont de vraies balises `<a>` rendues au chargement (les
 *    panneaux sont dans le DOM dès le SSR, simplement masqués en CSS). Un seul
 *    `<a>` par carte, couvrant titre + phrase de contexte.
 *  - Panneau ouvrable au clic ET au survol ; `aria-expanded` sur le chevron,
 *    `aria-controls` vers l'id du panneau ; fermeture à Échap avec retour du
 *    focus sur le déclencheur ; fermeture au clic extérieur.
 *  - `prefers-reduced-motion` géré en CSS.
 *
 * Deux états : au repos (absolu par-dessus le hero, sans bouton d'action) ;
 * en barre collante (fixe, compacte, CONTACT devient « NOUS ÉCRIRE »).
 */

const CONTACT_HREF = "/contact";

/* Le panneau du menu « Nos domaines » (3 familles × 3), rendu toujours dans le
   DOM (SSR), masqué en CSS tant que `open` est faux. */
function DomainesPanel({ id, open }: { id: string; open: boolean }) {
  return (
    // Toujours rendu (SSR) pour la crawlabilité des liens ; masqué en CSS
    // (visibilité) tant que `open` est faux — pas d'attribut `hidden`/display:none.
    <div
      id={id}
      className={`${styles.panel}${open ? ` ${styles.panelOpen}` : ""}`}
      role="region"
      aria-label="Domaines d'intervention"
    >
      <div className={styles.panelInner}>
        <div className={styles.panelCols}>
          {FAMILLES.map((f) => (
            <div className={styles.panelCol} key={f.intitule}>
              <p className={styles.familleLabel}>{f.intitule}</p>
              <ul className={styles.cardList}>
                {f.domaines.map((d) => (
                  <li key={d.href}>
                    <Link className={styles.card} href={d.href}>
                      <span className={styles.cardTitle}>{d.titre}</span>
                      <span className={styles.cardContext}>{d.contexte}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.panelFooter}>
          <Link className={styles.panelFooterLink} href={PANEL_DOMAINES_FOOTER.lien.href}>
            {PANEL_DOMAINES_FOOTER.lien.label}
          </Link>
          <span className={styles.panelFooterMention}>{PANEL_DOMAINES_FOOTER.mention}</span>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Header transparent au repos sur les pages à hero sombre ; opaque partout
  // ailleurs (drapeau déclaratif, cf. nav-data → aHeroSombre).
  const heroSombre = aHeroSombre(pathname);

  const [sticky, setSticky] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  // Ouvert au CLIC (« épinglé ») : dans ce cas le survol ne le referme pas ;
  // seuls un clic extérieur ou Échap le ferment.
  const [openedByClick, setOpenedByClick] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);

  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navItemRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* ---- État collant : sentinelle IntersectionObserver ----
     On observe une sentinelle posée en haut du document, haute d'une barre
     (.sentinelFallback = 72px). Le header devient collant dès que cette
     sentinelle a défilé au-dessus du viewport, c.-à-d. quand le header au repos
     (absolu, en haut) a lui-même disparu vers le haut : le relais vers la barre
     fixe est donc sans couture. Aucune référence à la hauteur du hero ni à une
     fraction de viewport — l'ancienne heuristique à 0,68·viewport se décalait
     dès qu'un hero changeait de hauteur ; ici c'est stable partout, sans réglage
     par page. Observé une seule fois (la sentinelle est dans le layout). */
  useEffect(() => {
    const sentinelle = sentinelRef.current;
    if (!sentinelle) return;
    const io = new IntersectionObserver(
      ([e]) => setSticky(!e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinelle);
    return () => io.disconnect();
  }, []);

  /* ---- Barre basse mobile (au défilement) ---- */
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

  /* ---- Barre basse masquée dès que le bloc contact entre dans le viewport ---- */
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

  /* ---- Fermer les menus au changement de route ----
     Le header vit dans le layout : il PERSISTE entre les navigations de l'App
     Router (pas de remontage). Sans cette fermeture, le panneau/tiroir resterait
     ouvert après un clic sur un lien ou un retour navigateur. setState en effet
     assumé pour cette synchronisation avec le routeur. */
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

  const closePanel = useCallback((focusTrigger = false) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanelOpen(false);
    setOpenedByClick(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  /* ---- Échap : ferme panneau (retour focus) ou tiroir ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (panelOpen) closePanel(true);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, mobileOpen, closePanel]);

  /* ---- Clic extérieur : ferme le panneau (y compris s'il est épinglé) ---- */
  useEffect(() => {
    if (!panelOpen) return;
    const onClick = (e: MouseEvent) => {
      if (navItemRef.current && !navItemRef.current.contains(e.target as Node)) {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        setPanelOpen(false);
        setOpenedByClick(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [panelOpen]);

  /* ---- Survol du conteneur (entrée + panneau) ----
     Le conteneur est le <li> qui enveloppe le libellé, le chevron ET le panneau
     (le panneau est rendu à l'intérieur). Descendre du libellé vers le panneau
     ne quitte donc pas le conteneur. Délai de fermeture (~180 ms) annulé si la
     souris revient, pour tolérer une trajectoire diagonale. Un panneau ouvert au
     clic (épinglé) ne se ferme pas au survol. */
  const openOnHover = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanelOpen(true);
  };
  const closeOnHover = () => {
    if (openedByClick) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanelOpen(false), 180);
  };
  /* Clic sur le chevron : bascule, indépendamment du survol. Ouvrir épingle
     (le survol ne le fermera plus) ; refermer désépingle. */
  const toggleByClick = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    const next = !panelOpen;
    setPanelOpen(next);
    setOpenedByClick(next);
  };

  return (
    <>
      {/* Sentinelle de repli pour l'état collant : observée uniquement quand
          aucun hero n'est identifié sur la page. Invisible (1px de large). */}
      <div ref={sentinelRef} className={styles.sentinelFallback} aria-hidden />
      <header
        className={`${styles.header}${heroSombre ? ` ${styles.heroDark}` : ""}${
          sticky ? ` ${styles.sticky}` : ""
        }`}
        data-sticky={sticky ? "true" : "false"}
      >
        <div className={styles.bar}>
          <Logo isHome={isHome} />

          {/* --- Navigation desktop --- */}
          <nav className={styles.nav} aria-label="Navigation principale">
            <ul className={styles.navList}>
              {NAV_ENTRIES.map((entry) => {
                if (entry.type === "panel") {
                  return (
                    <li
                      key={entry.label}
                      className={styles.navItem}
                      ref={navItemRef}
                      onMouseEnter={openOnHover}
                      onMouseLeave={closeOnHover}
                    >
                      {/* Le libellé est un lien vers la rubrique ; le chevron est
                          un bouton distinct (accès à la rubrique en tactile). */}
                      <Link
                        className={`${styles.navLink}${
                          panelOpen ? ` ${styles.navLinkOpen}` : ""
                        }`}
                        href={entry.href}
                      >
                        {entry.label}
                      </Link>
                      <button
                        type="button"
                        ref={triggerRef}
                        className={styles.chevron}
                        aria-expanded={panelOpen}
                        aria-controls={panelId}
                        aria-label={
                          panelOpen
                            ? "Fermer le panneau des domaines"
                            : "Ouvrir le panneau des domaines"
                        }
                        onClick={toggleByClick}
                      >
                        <svg
                          viewBox="0 0 12 8"
                          width="11"
                          height="8"
                          aria-hidden="true"
                          className={styles.chevronIcon}
                        >
                          <path
                            d="M1 1.5L6 6.5L11 1.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {/* Panneau rendu À L'INTÉRIEUR du conteneur (le <li>), pour
                          que descendre du libellé au panneau ne quitte pas la
                          zone de survol. Positionné en pleine largeur sous la
                          barre (position absolue relative au header). */}
                      <DomainesPanel id={panelId} open={panelOpen} />
                    </li>
                  );
                }
                // Lien simple. CONTACT devient un bouton « NOUS ÉCRIRE » en collant.
                const isContact = entry.href === CONTACT_HREF;
                if (isContact && sticky) {
                  return (
                    <li key={entry.label} className={styles.navItem}>
                      <Link className={styles.ctaButton} href={CONTACT_HREF}>
                        NOUS ÉCRIRE
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={entry.label} className={styles.navItem}>
                    <Link className={styles.navLink} href={entry.href}>
                      {entry.label}
                    </Link>
                  </li>
                );
              })}
              {/* Emplacement « Portail client » à réserver ici, à droite après un
                  filet vertical, le jour où la page existera. Non posé (brief). */}
            </ul>
          </nav>

          {/* --- Hamburger mobile --- */}
          <button
            type="button"
            className={styles.hamburger}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* --- Tiroir mobile plein écran --- */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isHome={isHome}
      />

      {/* --- Barre basse mobile (après le premier tiers de défilement) --- */}
      <div
        className={`${styles.bottomBar}${showBottomBar && !mobileOpen ? ` ${styles.bottomBarShown}` : ""}`}
        aria-hidden={!showBottomBar || mobileOpen}
      >
        <Link className={styles.bottomBarBtn} href={CONTACT_HREF} tabIndex={showBottomBar ? 0 : -1}>
          NOUS ÉCRIRE
        </Link>
        <a
          className={styles.bottomBarTel}
          href={TEL.href}
          aria-label={`Appeler le cabinet — ${TEL.display}`}
          tabIndex={showBottomBar ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
        </a>
      </div>
    </>
  );
}

/* ---------------- Tiroir mobile ---------------- */
function MobileDrawer({
  open,
  onClose,
  isHome,
}: {
  open: boolean;
  onClose: () => void;
  isHome: boolean;
}) {
  const [accordion, setAccordion] = useState(false);

  return (
    <div
      className={`${styles.drawer}${open ? ` ${styles.drawerOpen}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!open}
    >
      <div className={styles.drawerTop}>
        <Logo isHome={isHome} />
        <button type="button" className={styles.drawerClose} aria-label="Fermer le menu" onClick={onClose}>
          ✕
        </button>
      </div>

      <nav className={styles.drawerNav} aria-label="Navigation principale (mobile)">
        <ul className={styles.drawerList}>
          <li>
            <Link className={styles.drawerLink} href="/" onClick={onClose}>
              ACCUEIL
            </Link>
          </li>

          {/* DOMAINES — accordéon reprenant le panneau, familles conservées. */}
          <li className={styles.drawerAccordion}>
            <div className={styles.drawerAccRow}>
              <Link className={styles.drawerLink} href="/nos-domaines" onClick={onClose}>
                DOMAINES
              </Link>
              <button
                type="button"
                className={styles.drawerAccBtn}
                aria-expanded={accordion}
                aria-label={accordion ? "Replier les domaines" : "Déplier les domaines"}
                onClick={() => setAccordion((o) => !o)}
              >
                <svg viewBox="0 0 12 8" width="12" height="9" aria-hidden="true" className={accordion ? styles.accIconOpen : ""}>
                  <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={styles.drawerAccPanel} hidden={!accordion}>
              {FAMILLES.map((f) => (
                <div className={styles.drawerFamille} key={f.intitule}>
                  <p className={styles.familleLabel}>{f.intitule}</p>
                  <ul>
                    {f.domaines.map((d) => (
                      <li key={d.href}>
                        <Link className={styles.drawerCard} href={d.href} onClick={onClose}>
                          <span className={styles.cardTitle}>{d.titre}</span>
                          <span className={styles.cardContext}>{d.contexte}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link className={styles.drawerAllDomaines} href="/nos-domaines" onClick={onClose}>
                {PANEL_DOMAINES_FOOTER.lien.label}
              </Link>
            </div>
          </li>

          {NAV_ENTRIES.filter((e) => e.type !== "panel").map((e) => (
            <li key={e.label}>
              <Link className={styles.drawerLink} href={e.href} onClick={onClose}>
                {e.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.drawerFooter}>
        <Link className={styles.drawerCta} href={CONTACT_HREF} onClick={onClose}>
          NOUS ÉCRIRE
        </Link>
        <a className={styles.drawerTel} href={TEL.href} aria-label={`Appeler — ${TEL.display}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {TEL.display}
        </a>
      </div>
    </div>
  );
}

export default SiteHeader;
