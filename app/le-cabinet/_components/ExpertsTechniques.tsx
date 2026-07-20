import Image from "next/image";
import styles from "../le-cabinet.module.css";
import { EXPERTS } from "../data/experts";
import Reveal from "./Reveal";

/**
 * Experts techniques — traitement graphique VOLONTAIREMENT distinct de celui
 * des avocats (cartes, et non portraits éditoriaux). Ils n'exercent pas la
 * profession d'avocat : la distinction est juridiquement nécessaire.
 */
export default function ExpertsTechniques() {
  return (
    <section id="experts" className={`${styles.section} ${styles.alt}`}>
      <div className={styles.wrap}>
        <Reveal className={`${styles.secHead} ${styles.reveal}`} inClassName={styles.in}>
          <div className={styles.slabel}>nos experts techniques</div>
          <h2 className={styles.h2}>La lecture technique du dossier</h2>
          <p>
            Le cabinet s&apos;appuie, selon les besoins du dossier, sur des experts
            techniques indépendants. Ils n&apos;exercent pas la profession d&apos;avocat :
            ils établissent la réalité technique sur laquelle s&apos;appuie ensuite
            l&apos;analyse juridique.
          </p>
        </Reveal>

        <div className={styles.grid2}>
          {EXPERTS.map((expert, i) => (
            <Reveal
              key={expert.slug}
              className={styles.xcard}
              inClassName={styles.in}
              threshold={0.15}
              delay={i * 120}
            >
              <div className={styles.xhead}>
                <div className={styles.xav}>
                  {expert.photo ? (
                    <Image
                      src={expert.photo}
                      alt={`${expert.nom}, ${expert.role}`}
                      width={64}
                      height={64}
                      sizes="64px"
                    />
                  ) : (
                    <span aria-hidden>{expert.monogramme}</span>
                  )}
                </div>
                <div>
                  <div className={styles.xname}>{expert.nom}</div>
                  <div className={styles.xrole}>{expert.role}</div>
                </div>
              </div>

              <p>{expert.texte}</p>

              <div className={styles.xfacts}>
                {expert.faits.map((f) => (
                  <div key={f.cle}>
                    <span>{f.cle}</span>
                    {f.valeur}
                  </div>
                ))}
              </div>

              <div className={styles.xtags}>
                {expert.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
