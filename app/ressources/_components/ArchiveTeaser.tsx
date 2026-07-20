import styles from "../ressources.module.css";
import { total } from "../data/ressources";

/** Le compteur est calculé depuis la collection, jamais écrit en dur. */
export default function ArchiveTeaser() {
  return (
    <section className={styles.archiveTeaser}>
      <div className={styles.n}>{total()}</div>
      <h3>ressources publiées</h3>
      <p className={styles.xc}>
        Guides, définitions et outils, relus et maintenus à jour — et les analyses
        d&apos;actualité vivent dans le journal.
      </p>
      <a href="/blog" className={styles.bigCta}>
        Lire les analyses →
      </a>
    </section>
  );
}
