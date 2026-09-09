import Link from "next/link";
import styles from "../le-cabinet.module.css";
import { DOMAINES } from "../data/contenu";

/**
 * Section 5 — « Entrer par votre situation ». Maillage vers les pages de
 * domaine, dans un `<nav>` dédié. Sept entrées (voir data/contenu.ts :
 * « Escroquerie et fraude » retirée tant que sa page n'est pas fusionnée).
 */
export default function Domaines() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <span className={`${styles.label} ${styles.labelBlue}`}>Nos domaines</span>
          <h2>Entrer par votre situation</h2>
        </div>
        <nav className={styles.domaines} aria-label="Domaines d'intervention">
          {DOMAINES.map((d) => (
            <Link key={d.href} href={d.href}>
              {d.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
