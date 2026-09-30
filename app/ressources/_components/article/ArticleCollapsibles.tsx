"use client";

import { useEffect } from "react";
import styles from "./article.module.css";

/**
 * Rend repliables, sur mobile uniquement (≤ 767 px), les blocs éditoriaux du
 * gabarit (maquette 05) : « Ce que dit le texte » (.box), jurisprudence (.jur),
 * « Sources et mise à jour » (.sources) et le modèle de courrier (.letter).
 *
 * Amélioration progressive : l'effet ne s'exécute que côté client et seulement
 * en mobile ; le DOM desktop rendu au serveur n'est jamais touché (rendu
 * desktop strictement identique). Au passage en desktop, la transformation est
 * défaite.
 *
 * `.box`/`.jur`/`.sources` deviennent des <details> natifs ; `.letter` reçoit un
 * simple bouton (ses actions Copier/Imprimer ne peuvent pas être imbriquées dans
 * un <summary>).
 */
export default function ArticleCollapsibles() {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    // header = nombre d'éléments de tête conservés visibles ; open = état mobile.
    const DETAILS: { cls: string; header: number; open: boolean }[] = [
      { cls: styles.box, header: 2, open: true },
      { cls: styles.jur, header: 1, open: false },
      { cls: styles.sources, header: 1, open: false },
    ];

    type Made =
      | { kind: "details"; block: HTMLElement; details: HTMLDetailsElement; nodes: Element[] }
      | { kind: "letter"; block: HTMLElement; toggle: HTMLButtonElement };
    let made: Made[] = [];

    const build = () => {
      if (made.length) return;

      for (const cfg of DETAILS) {
        if (!cfg.cls) continue;
        document.querySelectorAll<HTMLElement>(`.${cfg.cls}`).forEach((block) => {
          const parent = block.parentNode;
          const kids = Array.from(block.children);
          if (!parent || kids.length <= cfg.header) return;

          const details = document.createElement("details");
          details.className = `${block.className} ${styles.discReady}`;
          details.open = cfg.open;

          const summary = document.createElement("summary");
          summary.className = styles.discSummary;
          const head = document.createElement("span");
          head.className = styles.discHead;
          kids.slice(0, cfg.header).forEach((h) => head.appendChild(h));
          const ico = document.createElement("span");
          ico.className = styles.discIco;
          ico.setAttribute("aria-hidden", "true");
          summary.append(head, ico);

          const body = document.createElement("div");
          body.className = styles.discBody;
          kids.slice(cfg.header).forEach((b) => body.appendChild(b));

          details.append(summary, body);
          parent.replaceChild(details, block);
          made.push({ kind: "details", block, details, nodes: kids });
        });
      }

      // Modèle de courrier : bouton de repli, corps masqué par défaut.
      if (styles.letter) {
        document.querySelectorAll<HTMLElement>(`.${styles.letter}`).forEach((block) => {
          const top = block.querySelector<HTMLElement>(`.${styles["letter-top"]}`);
          if (!top) return;
          block.classList.add(styles.discReady);
          const toggle = document.createElement("button");
          toggle.type = "button";
          toggle.className = styles.discToggle;
          toggle.setAttribute("aria-label", "Afficher ou masquer le modèle");
          toggle.setAttribute("aria-expanded", "false");
          const ico = document.createElement("span");
          ico.className = styles.discIco;
          ico.setAttribute("aria-hidden", "true");
          toggle.appendChild(ico);
          toggle.addEventListener("click", () => {
            const open = block.classList.toggle(styles.discOpen);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
          });
          top.appendChild(toggle);
          made.push({ kind: "letter", block, toggle });
        });
      }
    };

    const teardown = () => {
      for (const t of made) {
        if (t.kind === "details") {
          t.nodes.forEach((n) => t.block.appendChild(n));
          t.details.parentNode?.replaceChild(t.block, t.details);
        } else {
          t.block.classList.remove(styles.discReady, styles.discOpen);
          t.toggle.remove();
        }
      }
      made = [];
    };

    const apply = () => (mq.matches ? build() : teardown());
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      teardown();
    };
  }, []);

  return null;
}
