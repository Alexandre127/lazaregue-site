import styles from "../le-cabinet.module.css";
import { ENGAGEMENTS } from "../data/engagements";
import { CONTACT_HREF } from "../data/liens";
import { CtaTransition } from "./MethodTransition";
import Reveal from "./Reveal";

export default function CharteClient() {
  return (
    <section id="charte" className={styles.section}>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.reveal}`} inClassName={styles.in}>
          <div className={styles.slabel}>la charte client</div>
          <h2 className={styles.h2}>Nos huit engagements</h2>
          <p>
            Ce que nous tenons sur chaque dossier. Des engagements de service vérifiables —
            pas des promesses de résultat.
          </p>
        </Reveal>

        <div className={styles.charte}>
          {ENGAGEMENTS.map((e) => (
            <Reveal
              key={e.n}
              className={`${styles.crow} ${styles.reveal}`}
              inClassName={styles.in}
            >
              <div className={styles.cn}>{e.n}</div>
              <div className={styles.ct}>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Le visiteur vient de lire les engagements : on lui propose l'étape
            qui suit logiquement — vérifier que le cabinet est le bon. */}
        <Reveal className={`${styles.charteSuite} ${styles.reveal}`} inClassName={styles.in}>
          <p>
            Le deuxième engagement vaut aussi pour un premier échange : si votre dossier
            sort de nos domaines, nous vous le disons vite.
          </p>
          <CtaTransition href={CONTACT_HREF} className={`${styles.btn} ${styles.btnG}`}>
            Vérifier si nous pouvons vous accompagner <span className={styles.ar}>→</span>
          </CtaTransition>
        </Reveal>
      </div>
    </section>
  );
}
