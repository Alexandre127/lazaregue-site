import type { ReactNode } from "react";
import styles from "./article.module.css";

/**
 * Référence légale en encadré latéral : filet bleu à gauche, référence en
 * DM Mono, texte en gris accessible. `reference` : « Art. L. 133-18 CMF ».
 */
export default function RefLegale({ reference, children }: { reference: string; children: ReactNode }) {
  return (
    <aside className={styles.ref}>
      <p className={styles.refRef}>{reference}</p>
      <p className={styles.refTx}>{children}</p>
    </aside>
  );
}
