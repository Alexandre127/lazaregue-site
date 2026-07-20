import styles from "../ressources.module.css";
import {
  LIBELLES_TYPE,
  parDossier,
  type DossierId,
  type Ressource,
} from "../data/ressources";
import { VISUELS } from "./dossierVisuals";

/** Métadonnée d'un point d'entrée de dossier. */
type Dossier = {
  id: DossierId;
  numero: string;
  titre: string;
  mention?: string;
  pratique?: { label: string; href: string };
};

function meta(r: Ressource) {
  if (r.type === "outil") return r.format ?? "";
  const niveau = r.niveau
    ? r.niveau.charAt(0).toUpperCase() + r.niveau.slice(1)
    : "";
  return `${r.duree} min · ${niveau}`;
}

export default function DossierDoor({ dossier }: { dossier: Dossier }) {
  const ressources = parDossier(dossier.id);
  const compteur = ressources.length;
  const libelle = compteur > 1 ? "RESSOURCES" : "RESSOURCE";

  return (
    <div className={styles.door}>
      <div className={styles.doorBody}>
        <div className={styles.doorN}>
          {dossier.numero} · {compteur} {libelle}
          {dossier.mention ? ` · ${dossier.mention}` : ""}
        </div>
        <h3>{dossier.titre}</h3>

        <div className={styles.doorList}>
          {ressources.map((r) => (
            <a key={r.title} className={styles.doorItem} href={r.href}>
              <span className={styles.diRow}>
                <span className={styles.t}>{r.title}</span>
                <span className={styles.ty}>{LIBELLES_TYPE[r.type]}</span>
                <span className={styles.mt}>{meta(r)}</span>
              </span>
              <p className={styles.prev}>{r.promesse}</p>
            </a>
          ))}
        </div>

        {dossier.pratique ? (
          <a className={styles.plink} href={dossier.pratique.href}>
            La pratique associée : {dossier.pratique.label} <i>→</i>
          </a>
        ) : null}
      </div>

      <div className={styles.doorVisual}>{VISUELS[dossier.id]}</div>
    </div>
  );
}
