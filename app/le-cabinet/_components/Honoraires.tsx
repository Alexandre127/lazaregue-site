import styles from "../le-cabinet.module.css";
import Reveal from "./Reveal";

/**
 * Hiérarchie visuelle à préserver : « FORFAIT » domine,
 * le taux horaire de 350 € HT reste en mention secondaire.
 */
export default function Honoraires() {
  return (
    <section id="honoraires" className={`${styles.section} ${styles.alt}`}>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.reveal}`} inClassName={styles.in}>
          <div className={styles.slabel}>honoraires &amp; frais</div>
          <h2 className={styles.h2}>Comment nous facturons</h2>
          <p>
            Le cadre financier est posé avant l&apos;engagement — pas découvert en cours de
            route.
          </p>
        </Reveal>

        <div className={styles.fees}>
          <Reveal as="ul" className={styles.reveal} inClassName={styles.in}>
            <li>
              Nos honoraires sont établis <b>au forfait</b>, calculé sur la base du temps
              estimé pour votre dossier.
            </li>
            <li>
              Avant toute intervention, nous vous remettons une <b>convention
              d&apos;honoraires</b> précisant la mission, le mode de calcul et les frais
              prévisibles.
            </li>
            <li>
              Les <b>honoraires et les frais</b> (frais de procédure, expertises,
              intervenants extérieurs) sont présentés distinctement.
            </li>
            <li>
              Les hypothèses susceptibles de faire évoluer le budget sont annoncées à
              l&apos;avance ; toute évolution est validée avec vous avant d&apos;être
              engagée.
            </li>
            <li>
              La <b>prise de contact initiale</b> nous permet de vérifier si le cabinet peut
              intervenir et de vous proposer un cadre d&apos;accompagnement. Elle ne
              constitue pas une consultation juridique.
            </li>
          </Reveal>

          {/* ── BLOC TAUX — retirable d'un seul geste ── */}
          <Reveal
            className={`${styles.ratecard} ${styles.reveal}`}
            inClassName={styles.in}
          >
            <div className={styles.rk}>notre principe</div>
            <div className={styles.big}>FORFAIT</div>
            <div className={styles.sm}>
              Un montant convenu à l&apos;avance pour une mission définie. Vous savez ce que
              vous payez avant que nous commencions — et ce montant ne bouge pas sans votre
              accord.
            </div>
            <div className={styles.note}>
              Le forfait est établi sur la base du temps estimé pour votre dossier, à partir
              d&apos;un taux horaire de référence de <b>350 € HT</b>. Le montant final est
              fixé dans la convention d&apos;honoraires, selon la nature et la complexité du
              dossier.
            </div>
          </Reveal>
          {/* ── FIN BLOC TAUX ── */}
        </div>
      </div>
    </section>
  );
}
