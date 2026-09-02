import styles from "../le-cabinet.module.css";
import { CONTACT_HREF } from "../data/liens";
import { CtaTransition } from "./MethodTransition";

export default function CtaFinal() {
  return (
    <section id="contact" className={styles.closing} data-dark>
      <div className={styles.wrap}>
        <div>
          <div className={styles.k}>réponse sous 1 jour ouvré</div>
          <h2>
            Exposez-nous
            <br />
            <span>votre dossier.</span>
          </h2>
        </div>
        <CtaTransition href={CONTACT_HREF} className={`${styles.btn} ${styles.btnP}`}>
          Prendre rendez-vous <span className={styles.ar}>→</span>
        </CtaTransition>
      </div>
    </section>
  );
}
