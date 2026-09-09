import styles from "../le-cabinet.module.css";
import { CONTRIBUTIONS } from "../data/contenu";

/**
 * Section 7 — « Contributions », fond navy. Quatre cases à l'état de gabarit :
 * les mentions « à renseigner » sont CONSERVÉES, elles attendent les données
 * réelles du cabinet (brief). Ne pas inventer de titres, revues ou références.
 */
export default function Contributions() {
  return (
    <section className={`${styles.section} ${styles.dark}`}>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <span className={`${styles.label} ${styles.labelLight}`}>Contributions</span>
          <h2>Ce que le cabinet publie et enseigne</h2>
          <p>
            La matière bouge vite. Le cabinet y prend position publiquement —
            c&apos;est aussi la manière la plus honnête de montrer ce qu&apos;il sait.
          </p>
        </div>
        <div className={styles.contrib}>
          {CONTRIBUTIONS.map((c) => (
            <div key={c.titre}>
              <h3>{c.titre}</h3>
              <p>{c.corps}</p>
              <span className={styles.todo}>{c.todo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
