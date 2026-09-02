import styles from "../le-cabinet.module.css";
import { AVIS } from "@/lib/avis";
import { CABINET } from "../data/liens";
import Reveal from "./Reveal";

const ITEMS = [
  { titre: "Barreau de Paris", texte: "Cabinet et avocats inscrits au Barreau de Paris." },
  {
    titre: "Secret professionnel",
    texte: "Vos échanges avec le cabinet sont protégés par le secret professionnel.",
  },
  { titre: "Assurance RCP", texte: "Responsabilité civile professionnelle." },
  {
    titre: "Médiation",
    texte:
      "Recours possible au médiateur de la consommation de la profession en cas de différend d'honoraires.",
  },
  { titre: "Données · RGPD", texte: "Traitement de vos données conforme au RGPD." },
];

export default function CadreConfiance() {
  return (
    <section className={`${styles.section} ${styles.trust}`} data-dark>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.reveal}`} inClassName={styles.in}>
          <div className={styles.slabel}>le cadre de confiance</div>
          <h2 className={styles.h2}>Identifiable, régulé, assuré</h2>
        </Reveal>

        <Reveal className={`${styles.titems} ${styles.reveal}`} inClassName={styles.in}>
          {ITEMS.map((i) => (
            <div key={i.titre} className={styles.titem}>
              <h4>{i.titre}</h4>
              <p>{i.texte}</p>
            </div>
          ))}
        </Reveal>

        <p className={styles.tline}>
          {CABINET.adresse.toLowerCase()} · {CABINET.telephone} · {CABINET.email}
          <br />
          {AVIS.note} sur 5 —{" "}
          <a href={AVIS.href} target="_blank" rel="noopener">
            {AVIS.nombre} avis google
          </a>{" "}
          · conformément aux règles de la profession, nous ne publions ni nom ni photo
          de client sur ce site.
        </p>
      </div>
    </section>
  );
}
