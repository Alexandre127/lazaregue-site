"use client";

import { useState, useSyncExternalStore } from "react";
import styles from "../article.module.css";

export type QA = { q: string; a: string };

const subscribe = () => () => {};

/**
 * Accordéon FAQ. Vrais <button>, aria-expanded/controls, cible ≥44px, icône +/−.
 * Lisible sans JS (tout ouvert au SSR) ; première question seule ouverte après
 * hydratation. `mounted` via useSyncExternalStore (pas de setState en effet).
 */
export default function ArticleFaq({ items }: { items: QA[] }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [open, setOpen] = useState<Record<number, boolean>>(() => ({ 0: true }));

  return (
    <div className={styles.faq}>
      {items.map((item, i) => {
        const isOpen = mounted ? !!open[i] : true;
        const pid = `faq-r-${i}`;
        const bid = `faq-q-${i}`;
        return (
          <div className={styles["faq-item"]} key={item.q}>
            <h3>
              <button
                type="button"
                id={bid}
                className={styles["faq-q"]}
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
              >
                <span>{item.q}</span>
                <span className={styles["faq-ico"]} aria-hidden>{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <div className={styles["faq-a"]} id={pid} role="region" aria-labelledby={bid} hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
