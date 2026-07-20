import styles from "../le-cabinet.module.css";
import PortailDemo from "./PortailDemo";
import Reveal from "./Reveal";

const FEATURES = [
  {
    titre: "Avancement en temps réel",
    texte: "l'étape en cours, ce qui est fait, ce qui reste à faire.",
  },
  { titre: "Diligences détaillées", texte: "chaque action tracée et datée." },
  { titre: "Prochaines échéances", texte: "les jalons, mis à jour au fil du dossier." },
  {
    titre: "Suivi du budget",
    texte:
      "les diligences engagées et leur incidence au regard du cadre financier convenu.",
  },
  {
    titre: "Documents & messagerie",
    texte: "vos pièces et vos échanges, réunis et sécurisés.",
  },
];

export default function PortailSection() {
  return (
    <section id="portail" className={`${styles.section} ${styles.portalSec}`} data-dark>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.reveal}`} inClassName={styles.in}>
          <div className={styles.slabel}>notre méthode</div>
          <h2 className={styles.h2}>
            Notre méthode de suivi, rendue visible dans votre portail client
          </h2>
          <p>
            L&apos;expertise juridique reste le cœur de notre travail. Le portail en est le
            prolongement : il rend visible, à tout moment, ce que nous faisons pour vous.
          </p>
        </Reveal>

        <div className={styles.portal}>
          <Reveal className={styles.reveal} inClassName={styles.in}>
            <p className={styles.pquote}>
              Si un client doit appeler pour savoir où en est son dossier, ce n&apos;est pas
              lui qui est impatient — c&apos;est l&apos;information qui manque.
            </p>
            <ul className={styles.pfeat}>
              {FEATURES.map((f) => (
                <li key={f.titre}>
                  <span className={styles.ic} aria-hidden>
                    →
                  </span>
                  <span>
                    <b>{f.titre}</b> — {f.texte}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <PortailDemo />
        </div>
      </div>
    </section>
  );
}
