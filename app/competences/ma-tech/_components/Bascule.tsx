"use client";

import { useEffect, useState } from "react";
import styles from "../ma-tech.module.css";
import { BASCULE, type Ligne } from "../data/ma-tech";
import { fr } from "@/lib/typo";

/**
 * Bloc bascule « vue data room / vue audit ».
 *
 * Contraintes (non négociables) :
 *  — Les DEUX vues sont dans le HTML rendu côté serveur ; la bascule ne fait
 *    que poser ou retirer l'attribut `hidden`. Aucune donnée injectée par JS.
 *  — Lisible et complète sans JavaScript : tant que le script n'a pas monté le
 *    composant (`monte === false`), les deux vues sont visibles (aucune n'est
 *    masquée). Le premier rendu client est identique au rendu serveur, donc
 *    pas de divergence d'hydratation. Une fois monté, la vue data room est
 *    active par défaut et l'on bascule sans recharger de contenu.
 *  — Commandes = vrais <button aria-pressed> dans un role="group" étiqueté ;
 *    corps en aria-live="polite" ; aucune animation.
 *  — La mention « exemple illustratif » reste visible dans les deux vues.
 */

const SEV: Record<Ligne["ton"], string> = {
  b: styles.sevB,
  h: styles.sevH,
  m: styles.sevM,
  l: styles.sevL,
};

function Vue({ vue }: { vue: typeof BASCULE.dr | typeof BASCULE.au }) {
  return (
    <div className={styles.view} data-v={vue.v}>
      <div className={styles.docHead}>
        <div>
          <span className={`${styles.eyebrow} ${styles.eyebrowBlue}`}>{vue.piece}</span>
          <h4 className={styles.docH}>{fr(vue.titre)}</h4>
        </div>
        <span className={styles.verdict}>{vue.verdict}</span>
      </div>
      <ul className={styles.lines}>
        {vue.lignes.map((l) => (
          <li key={l.ref}>
            <span className={styles.lnRef}>{l.ref}</span>
            <span className={styles.lnT}>{fr(l.t)}</span>
            <span className={`${styles.sev} ${SEV[l.ton]}`}>{l.sev}</span>
          </li>
        ))}
      </ul>
      <p className={styles.docFoot}>{fr(vue.foot)}</p>
    </div>
  );
}

export default function Bascule() {
  const [monte, setMonte] = useState(false);
  const [vue, setVue] = useState<"dr" | "au">("dr");

  useEffect(() => setMonte(true), []);

  return (
    <>
      <div className={styles.switch} data-view={vue}>
        <div className={styles.switchBar}>
          <span className={styles.mention}>{BASCULE.mention}</span>
          <div className={styles.tg} role="group" aria-label={BASCULE.groupLabel}>
            <button type="button" aria-pressed={vue === "dr"} onClick={() => setVue("dr")}>
              {BASCULE.dr.onglet}
            </button>
            <button type="button" aria-pressed={vue === "au"} onClick={() => setVue("au")}>
              {BASCULE.au.onglet}
            </button>
          </div>
        </div>

        <div className={styles.switchBody} aria-live="polite">
          <div hidden={monte && vue !== "dr"}>
            <Vue vue={BASCULE.dr} />
          </div>
          <div hidden={monte && vue !== "au"}>
            <Vue vue={BASCULE.au} />
          </div>
        </div>
      </div>
      <p className={styles.thinkFoot}>{fr(BASCULE.thinkFoot)}</p>
    </>
  );
}
