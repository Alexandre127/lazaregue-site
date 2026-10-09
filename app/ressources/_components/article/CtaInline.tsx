import Link from "next/link";
import styles from "./article.module.css";

/** Encadré à bordure bleue dans le corps : titre, une phrase, bouton de contact. */
export default function CtaInline({ titre, texte }: { titre: string; texte: string }) {
  return (
    <aside className={styles.ctaIn}>
      <p className={styles.ctaInTitre}>{titre}</p>
      <p className={styles.ctaInTx}>{texte}</p>
      <Link className={styles.btn} href="/contact">Échanger avec un avocat</Link>
    </aside>
  );
}
