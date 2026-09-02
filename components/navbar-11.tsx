// @ts-nocheck
"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useEffect, useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

type DropdownKey = "domaines";

const DOMAINES_LINKS = [
  { label: "Cybersécurité & NIS 2", href: "/nos-domaines/cybersecurite" },
  { label: "RGPD & Données", href: "/nos-domaines/rgpd-donnees" },
  { label: "Intelligence artificielle & AI Act", href: "/nos-domaines/ia-act" },
  { label: "Contrats IT & responsabilité", href: "/nos-domaines/contrats-informatiques" },
  { label: "Cybercriminalité & fraudes", href: "/nos-domaines/cybercriminalite" },
  {
    label: "Plateformes, médias & Réseaux sociaux",
    href: "/competences/plateformes",
  },
  { label: "M&A Tech & Due diligence", href: "/competences/ma-tech" },
  // « Gaming, Esport & Industrie créative » pointait vers /competences/gaming,
  // qui n'existe pas. À remettre le jour où la page sera écrite.
];

// Menu mobile — cinq premiers domaines seulement, puis « Tous nos domaines ».
const DOMAINES_TOP5 = DOMAINES_LINKS.slice(0, 5);

const MOBILE_ENTRIES: {
  n: string;
  label: string;
  href?: string;
  key?: "domaines";
}[] = [
  { n: "01", label: "Nos domaines", key: "domaines" },
  { n: "02", label: "Le cabinet", href: "/le-cabinet" },
  { n: "03", label: "Analyses", href: "/blog" },
  { n: "04", label: "Ressources", href: "/ressources" },
  { n: "05", label: "Contact", href: "/contact" },
];

const MONO = { fontFamily: "var(--ff-mono)" } as const;

const dropdownVariants = {
  open: {
    visibility: "visible",
    opacity: "100%",
    height: "auto",
  },
  close: {
    visibility: "hidden",
    opacity: "0%",
    height: 0,
  },
};

const useRelume = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const toggleMobileDropdown = (key: DropdownKey) => () => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };
  const openOnDesktopDropdown = (key: DropdownKey) => () => {
    if (!isMobile) setOpenDropdown(key);
  };
  const closeOnDesktopDropdown = () => {
    if (!isMobile) setOpenDropdown(null);
  };
  const getAnimateDropdownMenu = (key: DropdownKey) =>
    openDropdown === key ? "open" : "close";
  const getAnimateDropdownMenuIcon = (key: DropdownKey) =>
    openDropdown === key ? "rotated" : "initial";
  return {
    openOnDesktopDropdown,
    closeOnDesktopDropdown,
    toggleMobileDropdown,
    getAnimateDropdownMenu,
    getAnimateDropdownMenuIcon,
  };
};

function LazLogo() {
  return (
    <a href="#" className="laz-logo">
      <span style={{ fontWeight: 700, letterSpacing: "0.05em", fontSize: "14px" }}>
        LAZARÈGUE <span style={{ color: "#1A47FF" }}>AVOCATS</span>
      </span>
    </a>
  );
}

function NavDropdownLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col py-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="whitespace-nowrap px-4 py-2 font-mono text-[11px] tracking-wide text-white/75 transition-colors hover:bg-white/5 hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function NavDropdown({
  label,
  dropdownKey,
  links,
  useActive,
  panelClassName,
  triggerClassName = "laz-nlink flex items-center gap-1",
}: {
  label: string;
  dropdownKey: DropdownKey;
  links: { label: string; href: string }[];
  useActive: ReturnType<typeof useRelume>;
  panelClassName: string;
  triggerClassName?: string;
}) {
  const Panel = motion.div;

  return (
    <div
      className="relative"
      onMouseEnter={useActive.openOnDesktopDropdown(dropdownKey)}
      onMouseLeave={useActive.closeOnDesktopDropdown}
    >
      <p
        role="button"
        className={triggerClassName}
        onClick={useActive.toggleMobileDropdown(dropdownKey)}
      >
        {label}
        <motion.span
          animate={useActive.getAnimateDropdownMenuIcon(dropdownKey)}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <KeyboardArrowDown className="text-white" />
        </motion.span>
      </p>
      <AnimatePresence>
        <Panel
          animate={useActive.getAnimateDropdownMenu(dropdownKey)}
          initial="close"
          exit="close"
          variants={dropdownVariants}
          transition={{ duration: 0.3 }}
          className={panelClassName}
        >
          <NavDropdownLinks links={links} />
        </Panel>
      </AnimatePresence>
    </div>
  );
}

/**
 * Panneau de menu mobile (plein écran, <lg). Refonte : tout aligné à gauche sur
 * une marge unique, entrées numérotées (numéro en DM Mono bleu) séparées par un
 * filet, sous-menu « Nos domaines » (5 premiers + « Tous nos domaines »),
 * apparition en cascade, pied de panneau avec téléphone + adresse + deux
 * boutons, et zone d'entrées scrollable (le sous-menu déplié ne pousse plus
 * « Contact » hors écran).
 */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [domainesOpen, setDomainesOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Cascade à l'ouverture : ~40 ms de décalage, légère translation + fondu.
  // Neutralisée sous prefers-reduced-motion.
  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.04,
        delayChildren: reduce ? 0 : 0.06,
      },
    },
  };
  const itemVariants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        },
      };

  const numberClass = "text-[13px] text-[#1A47FF]";

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col bg-[#06080f] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      {/* Barre supérieure — logo + fermeture, alignée sur la marge des entrées. */}
      <div className="flex h-[54px] shrink-0 items-center justify-between border-b border-white/10 px-6">
        <span
          className="text-[14px] font-bold tracking-[0.05em] text-white"
        >
          LAZARÈGUE <span style={{ color: "#1A47FF" }}>AVOCATS</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="text-[24px] text-white"
        >
          <i className="ti ti-x" aria-hidden />
        </button>
      </div>

      {/* Entrées — zone scrollable (le corps reste verrouillé). */}
      <motion.nav
        className="flex-1 overflow-y-auto overscroll-contain px-6"
        variants={listVariants}
        initial="hidden"
        animate="show"
        aria-label="Navigation mobile"
      >
        {MOBILE_ENTRIES.map((entry) => (
          <motion.div
            key={entry.n}
            variants={itemVariants}
            className="border-b border-white/10"
          >
            {entry.key === "domaines" ? (
              <>
                <button
                  type="button"
                  onClick={() => setDomainesOpen((o) => !o)}
                  aria-expanded={domainesOpen}
                  className="flex w-full items-center gap-3 py-4 text-left"
                >
                  <span className={numberClass} style={MONO}>
                    {entry.n}
                  </span>
                  <span className="text-[19px] text-white">{entry.label}</span>
                  <i
                    className="ti ti-chevron-down ml-auto text-[18px] text-white/55"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: domainesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    aria-hidden
                  />
                </button>

                {domainesOpen ? (
                  <div className="mb-4 ml-1 flex flex-col gap-3 border-l border-white/15 pl-4">
                    {DOMAINES_TOP5.map((d) => (
                      <a
                        key={d.href}
                        href={d.href}
                        onClick={onClose}
                        className="text-[13px] leading-snug text-white/70 transition-colors hover:text-white"
                        style={MONO}
                      >
                        {d.label}
                      </a>
                    ))}
                    <a
                      href="/#section-competences"
                      onClick={onClose}
                      className="text-[13px] text-[#1A47FF]"
                      style={MONO}
                    >
                      Tous nos domaines →
                    </a>
                  </div>
                ) : null}
              </>
            ) : (
              <a
                href={entry.href}
                onClick={onClose}
                className="flex items-center gap-3 py-4"
              >
                <span className={numberClass} style={MONO}>
                  {entry.n}
                </span>
                <span className="text-[19px] text-white">{entry.label}</span>
              </a>
            )}
          </motion.div>
        ))}
      </motion.nav>

      {/* Pied de panneau — sous un filet, téléphone + adresse + deux boutons
          (mêmes styles que la barre d'appel collante). */}
      <div className="shrink-0 border-t border-white/10 px-6 pb-6 pt-5">
        <a
          href="tel:+33181706200"
          className="block text-[24px] font-medium tracking-[0.02em] text-white"
          style={MONO}
        >
          01 81 70 62 00
        </a>
        <p
          className="mt-1.5 text-[11px] tracking-[0.04em] text-white/45"
          style={MONO}
        >
          18 rue de Tilsitt · 75017 Paris
        </p>
        <div className="mt-4 flex gap-2.5">
          <a
            href="tel:+33181706200"
            className="flex h-[46px] flex-1 items-center justify-center rounded-[8px] bg-[#1A47FF] text-[12px] font-semibold uppercase tracking-[0.06em] text-white"
            style={MONO}
          >
            Appeler
          </a>
          <a
            href="/contact"
            onClick={onClose}
            className="flex h-[46px] flex-1 items-center justify-center rounded-[8px] border border-white/[0.28] text-[12px] font-semibold uppercase tracking-[0.06em] text-white"
            style={MONO}
          >
            Écrire
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Navbar11() {
  const useActive = useRelume();
  const [menuOpen, setMenuOpen] = useState(false);

  // Étape 5 — Verrouillage du défilement du corps tant que le menu plein écran
  // est ouvert : sans cela, la page défile derrière le panneau.
  useEffect(() => {
    if (!menuOpen) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="laz-nav flex w-full items-center justify-between">
        <LazLogo />

        <nav
          className="laz-nav-links !ml-0 hidden justify-start lg:flex"
          aria-label="Principal"
        >
          <NavDropdown
            label="Nos domaines"
            dropdownKey="domaines"
            links={DOMAINES_LINKS}
            useActive={useActive}
            panelClassName="absolute left-0 top-full z-[101] hidden min-w-[320px] overflow-hidden border border-[var(--hero-bd)] bg-[rgba(10,15,46,0.98)] backdrop-blur-[14px] lg:block"
          />
          <a href="/le-cabinet" className="laz-nlink">
            Le cabinet
          </a>
          <a href="/blog" className="laz-nlink">
            Analyses
          </a>
          <a href="/ressources" className="laz-nlink">
            Ressources
          </a>
          <a href="/contact" className="laz-nlink">
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="text-[24px] text-white lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <i className="ti ti-menu-2" aria-hidden />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <MobileMenu onClose={() => setMenuOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
