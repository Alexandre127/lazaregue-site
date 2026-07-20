import styles from "../ressources.module.css";
import { LIBELLES_DOSSIER, LIBELLES_TYPE, type Ressource } from "../data/ressources";

/** Carte « À lire ensuite ». */
export default function ResourceCard({ ressource }: { ressource: Ressource }) {
  const niveau = ressource.niveau
    ? ressource.niveau.charAt(0).toUpperCase() + ressource.niveau.slice(1)
    : null;

  return (
    <a className={styles.card} href={ressource.href}>
      <div className={styles.tag}>
        {LIBELLES_DOSSIER[ressource.dossier]}{" "}
        <em>
          · {LIBELLES_TYPE[ressource.type].toUpperCase()}
          {ressource.duree ? ` · ${ressource.duree} MIN` : ""}
        </em>
      </div>
      <h3>{ressource.title}</h3>
      <p className={styles.xc}>{ressource.promesse}</p>
      <div className={styles.mt}>
        Rév. <time dateTime={ressource.revision}>{ressource.revision}</time>
        {niveau ? ` · ${niveau}` : ""}
      </div>
      <div className={styles.bar} />
    </a>
  );
}
