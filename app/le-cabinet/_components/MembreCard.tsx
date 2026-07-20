import Image from "next/image";
import styles from "../le-cabinet.module.css";
import type { Membre } from "../data/equipe";
import Reveal from "./Reveal";

/**
 * Portrait éditorial d'un avocat.
 * Fallback monogramme si `photo` est absente (évite tout trou visuel).
 */
export default function MembreCard({ membre }: { membre: Membre }) {
  return (
    <Reveal
      as="article"
      className={`${styles.member} ${membre.reverse ? styles.rev : ""} ${styles.reveal}`.trim()}
      inClassName={styles.in}
      threshold={0.15}
    >
      <div className={styles.mphoto}>
        {membre.photo ? (
          <Image
            src={membre.photo}
            alt={`${membre.prenom} ${membre.nom}, ${membre.role}`}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <>
            <div className={styles.mono} aria-hidden>
              {membre.monogramme}
            </div>
            <div className={styles.ph}>photo à insérer</div>
          </>
        )}
      </div>

      <div className={styles.mbody}>
        <div className={styles.mrole}>{membre.role}</div>
        <h3 className={styles.mname}>
          {membre.prenom}
          <br />
          {membre.nom}
        </h3>

        <div className={styles.mbio}>
          <p>{membre.bio}</p>
          <p className={styles.appro}>{membre.approche}</p>
        </div>

        <div className={styles.mfacts}>
          {membre.faits.map((f) => (
            <div key={f.cle} className={styles.row}>
              <div className={styles.k}>{f.cle}</div>
              <div className={styles.v}>{f.valeur}</div>
            </div>
          ))}
        </div>

        {/* PLACEHOLDER : liens réels à renseigner dans data/equipe.ts */}
        {membre.linkedin || membre.email ? (
          <div className={styles.msoc}>
            {membre.linkedin ? (
              <a href={membre.linkedin} aria-label={`LinkedIn de ${membre.prenom} ${membre.nom}`}>
                in
              </a>
            ) : null}
            {membre.email ? (
              <a href={`mailto:${membre.email}`} aria-label={`E-mail de ${membre.prenom} ${membre.nom}`}>
                @
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
