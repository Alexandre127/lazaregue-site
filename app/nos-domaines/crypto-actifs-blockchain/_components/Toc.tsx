"use client";

import { useEffect, useState } from "react";

/**
 * Sommaire compact. Statique sur mobile/tablette, collant en desktop (≥ 1024 px
 * de large ET 640 px de haut, via CSS — donc non collant au zoom 200 %).
 * L'entrée active est signalée par `aria-current="true"`, un filet gauche et la
 * graisse (jamais par la couleur seule). Les liens sont dans le HTML serveur.
 */
const SECTIONS = [
  { id: "structurer", label: "Structurer le projet" },
  { id: "psca", label: "Autorisation PSCA" },
  { id: "contrats", label: "Contrats et code" },
  { id: "technique", label: "Lecture technique" },
  { id: "jetons", label: "Jetons, tokenisation et NFT" },
  { id: "lcb-ft", label: "LCB-FT et obligations déclaratives" },
  { id: "contentieux", label: "Contentieux" },
  { id: "intervention", label: "Notre intervention" },
];

export function Toc() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="toc" aria-labelledby="toc-titre">
      <h2 id="toc-titre">Sur cette page</h2>
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
