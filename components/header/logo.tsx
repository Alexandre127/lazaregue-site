import Link from "next/link";
import styles from "./logo.module.css";

/**
 * Logo du cabinet — symbole SVG + wordmark, réunis dans un UNIQUE `<a href="/">`.
 * Sur la page d'accueil : `aria-current="page"` et pas d'état de survol.
 * Le nom reste complet (« LAZARÈGUE AVOCATS »), y compris en barre collante.
 *
 * `isHome` est fourni par le header (qui connaît déjà le pathname), pour éviter
 * un second `usePathname`.
 */
export default function Logo({ isHome = false }: { isHome?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Lazarègue Avocats — retour à l'accueil"
      aria-current={isHome ? "page" : undefined}
      className={`${styles.logo}${isHome ? ` ${styles.isHome}` : ""}`}
    >
      <svg
        className={styles.mark}
        viewBox="0 0 112 100"
        aria-hidden="true"
        focusable="false"
      >
        <polygon points="22.1,0 42.2,0 81,100 61.7,100" fill="#1A47FF" />
        <polygon points="79.3,60.3 95.7,60.3 111.7,100 94,100" fill="#1A47FF" />
        <polygon points="14.7,60.3 33.6,60.3 20.2,100 1.2,100" fill="currentColor" />
      </svg>
      <span className={styles.word}>
        LAZARÈGUE&nbsp;<span className={styles.avocats}>AVOCATS</span>
      </span>
    </Link>
  );
}
