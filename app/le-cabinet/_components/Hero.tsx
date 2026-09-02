import styles from "../le-cabinet.module.css";
import { AVIS } from "@/lib/avis";
import { CONTACT_HREF } from "../data/liens";
import { CtaTransition } from "./MethodTransition";
import Reveal from "./Reveal";

/**
 * Chaque chiffre doit rester exact dans la durée.
 *  · « 10+ ans » visait l'expérience du fondateur, pas l'âge du cabinet créé
 *    en 2016 : la mention devenait ambiguë et fragile. Remplacée par la note
 *    Google, vérifiable et adossée à une source publique.
 *  · Le suivi en ligne est précisé : il démarre à l'ouverture du dossier,
 *    faute de quoi l'engagement serait pris en défaut dès la prise de contact.
 */
const STATS = [
  { v: "2016", l: "création du cabinet" },
  { v: `${AVIS.note}/5`, l: `note google · ${AVIS.nombre} avis` },
  { v: "24H", l: "accusé de réception" },
  { v: "TOUS", l: "les dossiers suivis en ligne dès leur ouverture" },
];

export default function Hero() {
  return (
    <header className={styles.hero} data-dark>
      <div className={styles.wrap}>
        <div className={styles.hgrid}>
          <Reveal className={styles.reveal} inClassName={styles.in}>
            <div className={styles.slabel}>le cabinet</div>
            <h1>
              Vous ne venez pas chercher
              <br />
              une procédure.
              <br />
              <span>Vous venez chercher une issue.</span>
            </h1>
          </Reveal>

          <Reveal className={styles.reveal} inClassName={styles.in}>
            <p className={styles.sub}>
              Cabinet de droit du numérique pour les PME et les ETI technologiques — avocats
              et experts techniques réunis.
            </p>
            <p className={styles.lede}>
              Cabinet d&apos;avocats en nouvelles technologies : contentieux, conformité,
              contrats et gestion de crise. Sortir d&apos;une difficulté, sécuriser une
              décision ou reprendre le contrôle — avec, à chaque étape, la visibilité sur ce
              qui est fait et sur ce que cela coûte.
            </p>
            <div className={styles.hstats}>
              {STATS.map((s) => (
                <div key={s.l} className={styles.stat}>
                  <div className={styles.v}>{s.v}</div>
                  <div className={styles.l}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className={styles.hcta}>
              <CtaTransition href={CONTACT_HREF} className={`${styles.btn} ${styles.btnP}`}>
                Parler de votre dossier <span className={styles.ar}>→</span>
              </CtaTransition>
              <a href="#equipe" className={`${styles.btn} ${styles.btnGo}`}>
                L&apos;équipe <span className={styles.ar}>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
