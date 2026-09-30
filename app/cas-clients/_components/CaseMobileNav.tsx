"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export type StepItem = { id: string; n: string; label: string };
type Cta = { href: string; label: string };

/**
 * Chrome mobile du détail de cas client (maquette 07), affiché seulement sous
 * 767 px (masqué en desktop par le CSS). Deux éléments :
 *  1. barre d'étapes horizontale, collante sous l'en-tête, avec l'étape courante
 *     mise en évidence au défilement (et centrée dans la barre) ;
 *  2. barre d'action fixe en bas (« Échanger avec un avocat »).
 * Le rendu desktop n'est pas affecté (nœuds `display:none` ≥ 768 px).
 */
export default function CaseMobileNav({
  items,
  cta = { href: "/contact", label: "Échanger avec un avocat" },
}: {
  items: StepItem[];
  cta?: Cta;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement | null>(null);
  const raf = useRef<number | null>(null);

  // Étape courante = dernière dont le titre est passé sous l'en-tête + la barre.
  const measure = useCallback(() => {
    raf.current = null;
    const line = 150;
    let current = items[0]?.id ?? "";
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el && el.getBoundingClientRect().top <= line) current = it.id;
    }
    setActive(current);
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current == null) raf.current = window.requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
    };
  }, [measure]);

  // Centre l'étape active dans la barre défilante.
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector<HTMLElement>(`[data-step="${active}"]`);
    if (nav && el) {
      const target = el.offsetLeft - nav.clientWidth / 2 + el.clientWidth / 2;
      nav.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }
  }, [active]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav ref={navRef} className="case-steps" aria-label="Étapes du cas">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            data-step={it.id}
            className={`case-step${active === it.id ? " is-active" : ""}`}
            aria-current={active === it.id ? "true" : undefined}
            onClick={(e) => go(e, it.id)}
          >
            <span className="case-step-n">{it.n}</span>
            {it.label}
          </a>
        ))}
      </nav>

      <div className="case-mbar">
        <Link href={cta.href} className="case-mbar-cta">
          {cta.label}
        </Link>
      </div>
    </>
  );
}
