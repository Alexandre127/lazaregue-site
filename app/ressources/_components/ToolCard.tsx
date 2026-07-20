import styles from "../ressources.module.css";
import type { Outil } from "../data/outils";
import { DocChecklist } from "./DocProof";

/** Carte d'outil, avec son aperçu en pièce. */
export default function ToolCard({ outil }: { outil: Outil }) {
  return (
    <a className={styles.tool} href={outil.href}>
      <div className={styles.toolPreview}>
        <DocChecklist
          titre={outil.apercu.titre}
          reference={outil.apercu.reference}
          lignes={outil.apercu.lignes.map((l) => ({
            texte: l.texte,
            coche: l.coche,
          }))}
        />
      </div>
      <div className={styles.tag}>
        {outil.categorie} {outil.precision ? <em>{outil.precision}</em> : null}
      </div>
      <h3>{outil.titre}</h3>
      <p className={styles.xc}>{outil.description}</p>
      <span className={styles.toolCta}>{outil.cta}</span>
    </a>
  );
}
