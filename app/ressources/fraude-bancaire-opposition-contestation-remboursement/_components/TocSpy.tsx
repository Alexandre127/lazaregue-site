"use client";

import { useEffect, useState } from "react";
import styles from "../article.module.css";

export type TocItem = { id: string; label: string };

/**
 * Sommaire fixe (colonne droite) avec sommaire ACTIF au défilement :
 * IntersectionObserver sur les titres de section, aria-current sur l'entrée
 * courante. La mise à jour se fait dans le callback de l'observer (pas un
 * setState synchrone dans le corps de l'effet).
 */
export default function TocSpy({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <aside className={styles.toc} aria-label="Sommaire">
      <p className={styles.label}>Sommaire</p>
      {items.map((t) => (
        <a key={t.id} href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined}>
          {t.label}
        </a>
      ))}
    </aside>
  );
}
