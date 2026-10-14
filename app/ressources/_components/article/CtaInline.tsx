import Link from "next/link";
import styles from "./article.module.css";

const TEL = { affiche: "01 81 70 62 00", href: "tel:+33181706200" };

/**
 * Encadré à bordure bleue dans le corps : titre, une phrase, bouton de contact.
 * `telephone` : ajoute le numéro du cabinet à côté du bouton.
 */
export default function CtaInline({ titre, texte, telephone = false }: { titre: string; texte: string; telephone?: boolean }) {
  const bouton = <Link className={styles.btn} href="/contact">Échanger avec un avocat</Link>;
  return (
    <aside className={styles.ctaIn}>
      <p className={styles.ctaInTitre}>{titre}</p>
      <p className={styles.ctaInTx}>{texte}</p>
      {telephone ? (
        <div className={styles.ctaActions}>
          {bouton}
          <a className={styles.ctaTel} href={TEL.href}>{TEL.affiche}</a>
        </div>
      ) : (
        bouton
      )}
    </aside>
  );
}
