import Link from "next/link";
import styles from "../le-cabinet.module.css";
import { DOSSIERS } from "../data/contenu";

/**
 * Section 2 — « Trois dossiers conduits par le cabinet », sur fond navy.
 *
 * À VALIDER : chacun de ces trois récits doit correspondre à un dossier
 * réellement traité. À défaut, le remplacer ou supprimer la carte (brief). Le
 * lien de la carte « Fraude » pointe provisoirement vers Cybercriminalité — la
 * page Escroquerie et fraude n'est pas encore fusionnée
 * (docs/bascule-domaine-vercel.md).
 */
export default function Dossiers() {
  return (
    <section className={`${styles.section} ${styles.dark}`} id="pratique">
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <span className={`${styles.label} ${styles.labelLight}`}>La pratique</span>
          <h2>Trois dossiers conduits par le cabinet</h2>
          <p>
            Trois affaires réelles, décrites sans nom ni chiffre : la situation de
            départ, la difficulté juridique et le travail accompli. Le cabinet
            intervient devant les juridictions civiles, commerciales et pénales,
            devant les autorités administratives indépendantes et devant les
            juridictions administratives.
          </p>
        </div>

        <div className={styles.cas}>
          {DOSSIERS.map((d) => (
            <article key={d.titre}>
              <div>
                <span className={`${styles.label} ${styles.labelLight}`}>{d.eyebrow}</span>
                <h3>{d.titre}</h3>
                <p>{d.corps}</p>
              </div>
              <Link className={styles.casLink} href={d.lien.href}>
                {d.lien.label}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
