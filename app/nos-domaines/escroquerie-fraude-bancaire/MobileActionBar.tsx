"use client";

import { useEffect, useState } from "react";
import styles from "./escroquerie.module.css";

/**
 * Barre d'action mobile (< 768 px) : « Appeler » (action principale) et
 * « Être contacté ». Aucune barre collante globale équivalente n'existe sur le
 * site, on la pose donc ici. Elle disparaît sur le bloc de contact (elle y
 * ferait doublon), réserve la safe-area iOS et ne masque aucun contenu (padding
 * de compensation sur <body>). Absente à l'impression (CSS). Le contenu reste
 * accessible sans JavaScript : sans JS la barre reste simplement affichée.
 */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const contact = document.getElementById("contact");

    const setVisible = (visible: boolean) => {
      const on = visible && mq.matches;
      setHidden(!on);
      document.body.style.paddingBottom = on ? "84px" : "";
    };

    const sync = () => setVisible(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    let io: IntersectionObserver | null = null;
    if (contact && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!mq.matches) return;
            setVisible(!en.isIntersecting);
          });
        },
        { threshold: 0.2 },
      );
      io.observe(contact);
    }

    return () => {
      mq.removeEventListener("change", sync);
      io?.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, []);

  return (
    <div className={styles.mobar} hidden={hidden}>
      <a className="btn btn-primary" href="tel:+33181706200">Appeler</a>
      <a className="btn btn-ghost" href="/contact">Être contacté</a>
    </div>
  );
}
