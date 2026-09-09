import Image from "next/image";
import styles from "../le-cabinet.module.css";
import { EQUIPE } from "../data/contenu";
import { MEMBRES } from "@/lib/equipe";

/**
 * Section 3 — « Qui traite votre dossier ». Cinq intervenants, même format de
 * fiche : trois avocats (filet supérieur encre) et deux intervenants techniques
 * (filet supérieur bleu, ligne de statut « N'exerce pas la profession d'avocat »,
 * lien externe). Les photos proviennent de la source unique `lib/equipe`.
 *
 * Les fiches individuelles /le-cabinet/<avocat>/ n'existent pas : pas de lien
 * « Sa fiche » tant qu'elles ne sont pas créées (brief : aucun 404 au lancement).
 */
export default function Equipe() {
  return (
    <section className={styles.section} id="equipe">
      <div className={styles.wrap}>
        <div className={styles.secHead}>
          <span className={`${styles.label} ${styles.labelBlue}`}>L&apos;équipe</span>
          <h2>Qui traite votre dossier</h2>
          <p>
            Un dossier numérique se joue sur deux plans : le juridique décide de la
            stratégie, la technique décide de ce qui est démontrable. Les avocats
            mènent le dossier et travaillent avec des intervenants techniques sur le
            même terrain — c&apos;est ce regard à 360° qui permet de qualifier un
            système, de constituer une preuve exploitable et de tenir devant un juge
            ou une autorité.
          </p>
        </div>

        <div className={styles.team}>
          {EQUIPE.map((m) => {
            const photo = MEMBRES[m.slug];
            return (
              <article
                key={m.slug}
                className={`${styles.person}${m.tech ? ` ${styles.personTech}` : ""}`}
              >
                <span
                  className={`${styles.label}${m.accentEyebrow ? ` ${styles.labelBlue}` : ""}`}
                >
                  {m.eyebrow}
                </span>
                <div className={styles.photo}>
                  <Image
                    src={photo.photo}
                    alt={`Portrait de ${m.nom}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 360px"
                    style={{
                      objectFit: "cover",
                      objectPosition: photo.position ?? "center",
                    }}
                  />
                </div>
                <h3 className={styles.personName}>{m.nom}</h3>
                <p>{m.bio}</p>
                <dl className={styles.meta}>
                  {m.meta.map((ligne) => (
                    <div key={ligne.dt}>
                      <dt>{ligne.dt}</dt>
                      <dd>{ligne.dd}</dd>
                    </div>
                  ))}
                </dl>
                {m.statut ? <p className={styles.statut}>{m.statut}</p> : null}
                {m.lien ? (
                  <a
                    className={styles.more}
                    href={m.lien.href}
                    {...(m.lien.externe
                      ? { target: "_blank", rel: "noopener" }
                      : {})}
                  >
                    {m.lien.label}
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
