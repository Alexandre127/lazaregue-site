// @ts-nocheck
"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { KeyboardArrowDown } from "relume-icons";

type DropdownKey = "domaines" | "cabinet";

const DOMAINES_LINKS = [
  { label: "Cybersécurité & NIS 2", href: "/nos-domaines/cybersecurite" },
  { label: "RGPD & Données", href: "/nos-domaines/rgpd-donnees" },
  { label: "Intelligence artificielle & AI Act", href: "/competences/ia" },
  { label: "Contrats tech & Économie numérique", href: "/competences/contrats" },
  { label: "Contentieux informatique", href: "/competences/contentieux" },
  { label: "Cybercriminalité & Fraudes", href: "/competences/cybercriminalite" },
  {
    label: "Plateformes, médias & Réseaux sociaux",
    href: "/competences/plateformes",
  },
  { label: "M&A Tech & Due diligence", href: "/competences/ma-tech" },
  { label: "Gaming, Esport & Industrie créative", href: "/competences/gaming" },
];

const CABINET_LINKS = [
  { label: "À propos", href: "/a-propos" },
  { label: "L'équipe", href: "/equipe" },
  { label: "Études de cas", href: "/#cas" },
  { label: "Contributions", href: "/#contributions" },
  { label: "Tarifs", href: "/tarifs" },
];

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
  const isMobile = useMediaQuery("(max-width: 767px)");
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

export function Navbar11() {
  const useActive = useRelume();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="laz-nav flex w-full items-center justify-between">
        <LazLogo />

        <nav
          className="laz-nav-links !ml-0 hidden justify-start md:flex"
          aria-label="Principal"
        >
          <NavDropdown
            label="Nos domaines"
            dropdownKey="domaines"
            links={DOMAINES_LINKS}
            useActive={useActive}
            panelClassName="absolute left-0 top-full z-[101] hidden min-w-[320px] overflow-hidden border border-[var(--hero-bd)] bg-[rgba(10,15,46,0.98)] backdrop-blur-[14px] md:block"
          />
          <NavDropdown
            label="Le cabinet"
            dropdownKey="cabinet"
            links={CABINET_LINKS}
            useActive={useActive}
            panelClassName="absolute left-0 top-full z-[101] hidden min-w-[220px] overflow-hidden border border-[var(--hero-bd)] bg-[rgba(10,15,46,0.98)] backdrop-blur-[14px] md:block"
          />
          <a href="/blog" className="laz-nlink">
            Blog
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
          className="text-[24px] text-white md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <i className="ti ti-menu-2" aria-hidden />
        </button>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#06080f] md:hidden">
          <button
            type="button"
            className="absolute right-4 top-4 text-[24px] text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <i className="ti ti-x" aria-hidden />
          </button>

          <nav className="flex h-full flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-8 text-center">
              <NavDropdown
                label="Nos domaines"
                dropdownKey="domaines"
                links={DOMAINES_LINKS}
                useActive={useActive}
                panelClassName="overflow-hidden md:hidden"
                triggerClassName="flex items-center gap-1 text-[20px] text-white"
              />
              <NavDropdown
                label="Le cabinet"
                dropdownKey="cabinet"
                links={CABINET_LINKS}
                useActive={useActive}
                panelClassName="overflow-hidden md:hidden"
                triggerClassName="flex items-center gap-1 text-[20px] text-white"
              />
              <a
                href="/blog"
                className="text-[20px] text-white"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="/ressources"
                className="text-[20px] text-white"
                onClick={() => setMenuOpen(false)}
              >
                Ressources
              </a>
              <a
                href="/contact"
                className="text-[20px] text-white"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
