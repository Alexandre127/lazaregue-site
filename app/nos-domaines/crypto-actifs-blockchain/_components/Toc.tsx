"use client";

import { useEffect, useState } from "react";

/**
 * Sommaire compact. Statique sur mobile/tablette, collant en desktop (≥ 1024 px
 * de large ET 640 px de haut, via CSS — donc non collant au zoom 200 %).
 * L'entrée active est signalée par `aria-current="true"`, un filet gauche et la
 * graisse (jamais par la couleur seule). Les liens sont dans le HTML serveur.
 */
const SECTIONS = [
  { id: "structurer", label: "Les règles applicables", num: true },
  { id: "psca", label: "L'autorisation (PSCA)", num: true },
  { id: "contrats", label: "Contrats et smart contracts", num: true },
  { id: "technique", label: "L'examen technique", num: true },
  { id: "jetons", label: "Jetons et NFT", num: true },
  { id: "lcb-ft", label: "Lutte contre le blanchiment", num: true },
  { id: "contentieux", label: "Litiges", num: true },
  { id: "intervention", label: "Méthode", num: true },
  { id: "cas", label: "Un cas, du code aux documents", num: false },
  { id: "livrables", label: "Livrables", num: false },
  { id: "equipe", label: "Équipe", num: false },
  { id: "faq", label: "Questions", num: false },
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
          <li key={s.id} data-nonum={s.num ? undefined : "true"}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
