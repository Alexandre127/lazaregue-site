import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./article.module.css";

const TEL = { affiche: "01 81 70 62 00", href: "tel:+33181706200" };
const EMAIL = "contact@lazaregue-avocats.fr";

/**
 * Appel final navy d'un article (prop `after` d'ArticleLayout) : même bloc que
 * l'appel par défaut du gabarit, avec un titre et des paragraphes propres à
 * l'article, puis le téléphone et l'e-mail du cabinet sous le bouton.
 */
export default function AppelFinal({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
      <div className={styles.wrap}>
        <div className={`${styles.head} ${styles.appel}`}>
          <h2 className={styles.h2} id="h-cta">{titre}</h2>
          {children}
        </div>
        <Link className={styles.btn} href="/contact">Échanger avec un avocat →</Link>
        <p className={styles.coord}>
          <a href={TEL.href}>{TEL.affiche}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </section>
  );
}
