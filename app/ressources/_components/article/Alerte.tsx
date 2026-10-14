import type { ReactNode } from "react";
import styles from "./article.module.css";

/**
 * Alerte discrète dans le corps : filet bleu à gauche, libellé en bleu gras
 * (« Sans cette clause : », « À retenir : »), suivi du texte.
 */
export default function Alerte({ libelle, children }: { libelle: string; children: ReactNode }) {
  return (
    <aside className={styles.alerte}>
      <p>
        <strong>{libelle}</strong> {children}
      </p>
    </aside>
  );
}
