"use client";

import { useEffect, useState } from "react";
import styles from "../le-cabinet.module.css";

const SECTIONS = [
  { id: "charte", num: "01", label: "charte" },
  { id: "portail", num: "02", label: "portail" },
  { id: "honoraires", num: "03", label: "honoraires" },
  { id: "equipe", num: "04", label: "équipe" },
  { id: "experts", num: "05", label: "experts" },
];

/**
 * Repère de lecture latéral (desktop ≥ 1300px).
 * La section active passe en bleu ; le repère s'inverse en blanc
 * lorsqu'il survole une section à fond sombre (`data-dark`).
 */
export default function ReadingRail() {
  const [active, setActive] = useState<string | null>(null);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;

      // Section active : la dernière dont le haut est passé au-dessus du milieu
      let current: string | null = null;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) current = s.id;
      }
      setActive(current);

      // Inversion sur fond sombre
      const darks = document.querySelectorAll<HTMLElement>("[data-dark]");
      let dark = false;
      darks.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) dark = true;
      });
      setOnDark(dark);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className={styles.rail} aria-label="Repère de lecture">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`${onDark ? styles.dark : ""} ${active === s.id ? styles.on : ""}`.trim()}
        >
          <span className={styles.num}>{s.num}</span>
          <span className={styles.lbl}>{s.label}</span>
        </a>
      ))}
    </nav>
  );
}
