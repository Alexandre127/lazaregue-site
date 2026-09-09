import styles from "../le-cabinet.module.css";
import { PORTAIL_POINTS, PORTAIL_STEPS } from "../data/contenu";

/**
 * Section 6 — « Notre méthode » : colonne de texte + reproduction d'interface
 * du portail client, suivie du bloc honoraires condensé.
 *
 * Le bloc honoraires porte `id="honoraires"` : c'est la cible de l'ancre
 * `/le-cabinet#honoraires` du pied de page global. Il n'existe pas de page
 * « /honoraires » distincte — le contenu est autonome, sans lien mort.
 */
export default function Portail() {
  return (
    <section className={`${styles.section} ${styles.alt}`}>
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <span className={`${styles.label} ${styles.labelBlue}`}>Notre méthode</span>
          <h2>Le suivi de votre dossier, rendu visible</h2>
          <p>
            L&apos;expertise juridique reste le cœur du travail. Le portail en est
            le prolongement : il montre, à tout moment, où en est votre dossier.
          </p>
        </div>

        <div className={styles.portail}>
          <div>
            <p className={styles.portailLede}>
              Si un client doit appeler pour savoir où en est son dossier, ce
              n&apos;est pas lui qui est impatient — c&apos;est l&apos;information
              qui manque.
            </p>
            <ul>
              {PORTAIL_POINTS.map((pt) => (
                <li key={pt.titre}>
                  <b>{pt.titre}</b> — {pt.suite}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.screen} aria-hidden>
            <div className={styles.screenTop}>
              <span className={`${styles.label} ${styles.labelLight}`}>
                Portail client · dossier #2026-0148
              </span>
              <h3>Contentieux plateforme — retrait de contenu</h3>
            </div>
            <div className={styles.screenTabs}>
              <span>suivi</span>
              <span>documents</span>
              <span>budget</span>
              <span>messages</span>
            </div>
            {PORTAIL_STEPS.map((s) => (
              <div
                key={s.libelle}
                className={`${styles.step}${s.on ? ` ${styles.stepOn}` : ""}`}
              >
                <span>{s.libelle}</span>
                <em>{s.etat}</em>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.honoLite} id="honoraires">
          <div>
            <span className={`${styles.label} ${styles.labelBlue}`}>Honoraires</span>
            <h3>Un montant arrêté avant de commencer</h3>
          </div>
          <div>
            <p>
              Le cabinet travaille au forfait : un montant convenu à l&apos;avance
              pour une mission définie, déterminé selon la nature, l&apos;urgence et
              la complexité du dossier, et fixé dans la convention d&apos;honoraires
              avant toute intervention. Lorsque la mission ne s&apos;y prête pas, le
              taux horaire applicable y est précisé de la même manière.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
