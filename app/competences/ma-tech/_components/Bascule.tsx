"use client";

import { useState } from "react";
import styles from "../ma-tech.module.css";
import { BASCULE, type Ligne } from "../data/ma-tech";
import { fr } from "@/lib/typo";

/**
 * Bloc bascule « vue data room / vue audit ».
 *
 * Contraintes (non négociables) :
 *  — Les DEUX vues sont dans le HTML rendu côté serveur ; la bascule ne fait
 *    que poser ou retirer l'attribut `hidden`. Aucune donnée injectée par JS.
 *  — La vue audit porte `hidden` DÈS le rendu serveur (état initial `vue="dr"`),
 *    de sorte que le visiteur ne voit pas brièvement les deux documents empilés
 *    avant l'hydratation. Le premier rendu client est identique au rendu serveur
 *    (`vue="dr"`), donc aucune divergence d'hydratation.
 *  — Sans JavaScript, une règle `<noscript>` révèle la vue masquée : les deux
 *    documents s'affichent alors à la suite, plutôt qu'un seul.
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
    <div className={styles.view}>
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
  const [vue, setVue] = useState<"dr" | "au">("dr");

  return (
    <>
      <div className={styles.switch} data-view={vue} data-mt-switch="">
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
          <div data-mt-view="dr" hidden={vue !== "dr"}>
            <Vue vue={BASCULE.dr} />
          </div>
          <div data-mt-view="au" hidden={vue !== "au"}>
            <Vue vue={BASCULE.au} />
          </div>
        </div>

        {/* Sans JavaScript, la vue masquée est révélée : les deux documents
            s'affichent à la suite. Sélecteur scopé au bloc bascule. */}
        <noscript>
          <style>{`[data-mt-switch] [data-mt-view][hidden]{display:block!important}`}</style>
        </noscript>
      </div>
      <p className={styles.thinkFoot}>{fr(BASCULE.thinkFoot)}</p>
    </>
  );
}
