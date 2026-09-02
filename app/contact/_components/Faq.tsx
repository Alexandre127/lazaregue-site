"use client";

import { useState } from "react";
import styles from "../contact.module.css";
import { FAQ } from "../data/reassurance";

/** Questions fréquentes — accordéon accessible au clavier. */
export default function Faq() {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <section className={styles.faq} aria-labelledby="faq-titre">
      <div className={styles.wrap}>
        <div className={styles.folio}>Questions fréquentes</div>
        <h2 id="faq-titre" className={styles.faqTitre}>
          Vos questions, nos réponses
        </h2>

        <div className={styles.faqListe}>
          {FAQ.map((item, i) => {
            const actif = ouvert === i;
            return (
              <div key={item.q} className={styles.faqItem}>
                <h3>
                  <button
                    type="button"
                    className={styles.faqQ}
                    aria-expanded={actif}
                    aria-controls={`faq-r-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOuvert(actif ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.faqSigne} aria-hidden>
                      {actif ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {actif ? (
                  <div
                    className={styles.faqA}
                    id={`faq-r-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                  >
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
