import styles from "../ressources.module.css";
import { EN_PREPARATION } from "../data/ressources";

/**
 * Dossiers annoncés mais pas encore ouverts.
 * Bandeau simple et NON cliquable — pas de porte tant que le dossier est vide.
 */
export default function PrepBand() {
  return (
    <div className={styles.prep}>
      <span className={styles.k}>Dossiers en préparation</span>
      {EN_PREPARATION.map((d, i) => (
        <span key={d} style={{ display: "contents" }}>
          <span>{d}</span>
          {i < EN_PREPARATION.length - 1 ? <i aria-hidden>·</i> : null}
        </span>
      ))}
    </div>
  );
}
