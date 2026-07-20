import styles from "../le-cabinet.module.css";
import Reveal from "./Reveal";

/** Citation en deux temps : le texte, puis la signature différée. */
export default function Credo() {
  return (
    <section className={styles.credo} data-dark>
      <div className={styles.wrap}>
        <Reveal as="blockquote" className={styles.reveal} inClassName={styles.in} threshold={0.15}>
          Vous ne traiterez peut-être qu&apos;un seul dossier comme celui-ci dans votre vie.
          Nous en traitons chaque semaine — et nous n&apos;oublions pas la différence.
        </Reveal>
        <div className={styles.sign}>lazarègue avocats</div>
      </div>
    </section>
  );
}
