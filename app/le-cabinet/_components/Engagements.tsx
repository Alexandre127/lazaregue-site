import styles from "../le-cabinet.module.css";
import { ENGAGEMENTS } from "../data/contenu";

/**
 * Section 4 — « Six engagements de service », fond clair, grille de trois
 * colonnes. Des engagements vérifiables, pas des promesses de résultat.
 */
export default function Engagements() {
  return (
    <section className={`${styles.section} ${styles.alt}`}>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <span className={`${styles.label} ${styles.labelBlue}`}>La charte client</span>
          <h2>Six engagements de service</h2>
          <p>
            Ce que le cabinet tient sur chaque dossier. Des engagements
            vérifiables — pas des promesses de résultat.
          </p>
        </div>
        <div className={styles.eng}>
          {ENGAGEMENTS.map((e) => (
            <article key={e.titre}>
              <h3>{e.titre}</h3>
              <p>{e.corps}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
