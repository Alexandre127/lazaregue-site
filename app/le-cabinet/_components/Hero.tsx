import Link from "next/link";
import styles from "../le-cabinet.module.css";
import { FAITS } from "../data/contenu";

/**
 * Hero sur fond navy. Le H1 réel est discret (référencement) ; le slogan en
 * Bebas joue le rôle de titre visuel, dans un `<p>` pour ne pas multiplier les
 * titres de rang 1.
 */
export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <div>
            <span className={`${styles.label} ${styles.labelLight}`}>Le cabinet</span>
            <h1 className={styles.h1seo}>
              Cabinet d&apos;avocats en droit du numérique à Paris
            </h1>
            <p className={styles.slogan}>
              Vous ne venez pas chercher une procédure.
              <br />
              <em>Vous venez chercher une issue.</em>
            </p>
            <p className={styles.heroCopy}>
              Lazarègue Avocats intervient auprès des entreprises confrontées à un
              risque juridique d&apos;origine numérique : projet informatique qui
              dérape, incident de sécurité, contrôle d&apos;une autorité, fraude,
              litige de plateforme, opération sur actifs technologiques. Le cabinet
              réunit des avocats et des experts techniques, à Paris et dans toute
              la France.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.btn} href="/contact">
                Parler de votre dossier
              </Link>
              <Link className={`${styles.btn} ${styles.btnGhost}`} href="#equipe">
                L&apos;équipe
              </Link>
            </div>
          </div>
          <div className={styles.facts}>
            {FAITS.map((f) => (
              <div className={styles.fact} key={f.chiffre}>
                <b>{f.chiffre}</b>
                <span>{f.libelle}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroRule}>
          <span className={`${styles.label} ${styles.labelLight}`}>
            Contentieux · conformité · contrats · gestion de crise
          </span>
          <span className={`${styles.label} ${styles.labelLight}`}>
            Paris · toute la France
          </span>
        </div>
      </div>
    </div>
  );
}
