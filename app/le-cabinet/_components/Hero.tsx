import Link from "next/link";
import styles from "../le-cabinet.module.css";
import { FAITS } from "../data/contenu";
import KeywordBadge from "@/components/keyword-badge";

/**
 * Hero sur fond navy, même construction que les hero de pages de domaine :
 * colonne gauche (œil-de-bœuf, badge mot-clé = <h1>, slogan Bebas, paragraphe,
 * boutons) sur environ la moitié de la largeur, grille de faits en colonne
 * droite — à la place où les pages de domaine mettent leur image. Le slogan
 * reprend l'échelle de titre des pages de domaine (clamp(32px, 5.5vw, 60px)).
 */
export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <div>
            <span className={`${styles.label} ${styles.labelLight}`}>Le cabinet</span>
            <div className={styles.h1badge}>
              <KeywordBadge as="h1">
                Cabinet d&apos;avocats en droit du numérique à Paris
              </KeywordBadge>
            </div>
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
