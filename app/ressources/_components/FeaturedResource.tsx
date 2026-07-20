import styles from "../ressources.module.css";
import { LIBELLES_DOSSIER, LIBELLES_TYPE, type Ressource } from "../data/ressources";
import { DocContract, Mark, Redact } from "./DocProof";

/** La ressource mise en avant, avec sa pièce en couverture. */
export default function FeaturedResource({ ressource }: { ressource: Ressource }) {
  return (
    <a className={styles.todayGrid} href={ressource.href}>
      <div className={styles.todayBody}>
        <div className={styles.tag}>
          {LIBELLES_DOSSIER[ressource.dossier]}{" "}
          <em>
            · {LIBELLES_TYPE[ressource.type].toUpperCase()}
            {ressource.duree ? ` · ${ressource.duree} MIN` : ""} · RÉV.{" "}
            {ressource.revision}
          </em>
        </div>
        <h2>{ressource.title}</h2>
        <p className={styles.xc}>{ressource.chapeau ?? ressource.promesse}</p>
        {ressource.auteur ? <div className={styles.mt}>{ressource.auteur}</div> : null}
        <div className={styles.bar} />
      </div>

      <div className={styles.todayCover}>
        <DocContract
          titre={
            <>
              LRAR — agence <Redact width={44} />
            </>
          }
          reference="Pièce commentée"
          entete="Objet : utilisation non autorisée d'une photographie"
          paragraphes={[
            <>
              « …l&apos;œuvre référencée <Redact width={34} /> dont notre mandant
              est <Mark>l&apos;auteur</Mark>… »
            </>,
          ]}
          annotation="auteur, peut-être — originale, à démontrer"
          tampon="Contestée"
        />
      </div>
    </a>
  );
}
