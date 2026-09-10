import Link from "next/link";
import styles from "../le-cabinet.module.css";

/**
 * Section 8 — appel à l'action final, sur fond bleu de marque.
 */
export default function CtaFinal() {
  return (
    <div className={styles.cta}>
      <div className={styles.wrap}>
        <span className={styles.label}>Prise de contact</span>
        <h2 className={styles.ctaTitle}>Exposez-nous votre dossier.</h2>
        <p className={styles.ctaCopy}>
          Vous ne traiterez peut-être qu&apos;un seul dossier comme celui-ci dans
          votre vie. Nous en traitons chaque semaine — et nous n&apos;oublions pas
          la différence.
        </p>
        <Link className={styles.btn} href="/contact">
          Prendre rendez-vous
        </Link>
      </div>
    </div>
  );
}
