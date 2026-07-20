import styles from "../le-cabinet.module.css";
import { AVOCATS } from "../data/equipe";
import MembreCard from "./MembreCard";
import Reveal from "./Reveal";

export default function EquipeAvocats() {
  return (
    <section id="equipe" className={styles.section}>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.reveal}`} inClassName={styles.in}>
          <div className={styles.slabel}>les avocats</div>
          <h2 className={styles.h2}>Qui traite votre dossier</h2>
          <p>
            Un dossier numérique se joue sur deux plans : le juridique décide de la
            stratégie, la technique décide de ce qui est démontrable. Nos avocats mènent le
            dossier et travaillent avec des experts techniques sur le même terrain —
            c&apos;est ce regard à 360° qui permet de qualifier un système, de constituer une
            preuve exploitable et de tenir devant un juge ou une autorité.
          </p>
        </Reveal>

        {AVOCATS.map((membre) => (
          <MembreCard key={membre.slug} membre={membre} />
        ))}
      </div>
    </section>
  );
}
