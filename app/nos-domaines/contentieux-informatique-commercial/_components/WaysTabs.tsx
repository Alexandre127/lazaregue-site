"use client";

/**
 * Section « Voies possibles ».
 *
 * BUREAU (> 900 px) : composant à onglets — vrai `tablist` / `tab` / `tabpanel`,
 * navigation clavier (flèches, Début, Fin), roving tabindex, focus visible. Un
 * seul panneau visible (les inactifs sont masqués par classe, jamais par
 * l'attribut `hidden`, pour rester dans le rendu serveur). Panneau = colonne de
 * contenu (7/12) + bloc bleu « En clair » (5/12).
 *
 * MOBILE (≤ 900 px) : quatre cartes empilées (numéro, verbe en Bebas, sous-titre,
 * contenu, bloc bleu « En clair »). Onglets, compteur et flèches masqués en CSS.
 */

import { useRef, useState } from "react";
import { fr } from "@/lib/typo";

type Voie = { court: string; sub: string; recouvre: string; clair: string };

const VOIES: Voie[] = [
  {
    court: "Négocier",
    sub: "Remettre le projet sur les rails",
    recouvre: "Corrections, nouveau calendrier, gouvernance renforcée, remises, échéancier et protocole formalisant les engagements de chacun.",
    clair: "Un protocole transactionnel fixe par écrit les engagements de chacun et clôt le différend sur les points qu’il règle.",
  },
  {
    court: "Faire exécuter",
    sub: "Obtenir ce qui était dû",
    recouvre: "Correction des anomalies, livraison, récupération des données, réversibilité ou remise de documents.",
    clair: "Le juge peut ordonner de livrer, de corriger ou de restituer, plutôt que de condamner seulement à payer.",
  },
  {
    court: "Organiser la sortie",
    sub: "Changer de prestataire sans perdre le service",
    recouvre: "Mise en demeure, résiliation, continuité du service, transition vers une autre solution et conséquences financières.",
    clair: "Sortir d’un contrat se prépare : une rupture mal conduite peut être reprochée à celui qui l’engage.",
  },
  {
    court: "Saisir le juge",
    sub: "Faire trancher le différend",
    recouvre: "Référé, mesure de preuve avant tout procès, expertise judiciaire ou procédure au fond, en demande comme en défense.",
    clair: "Des preuves peuvent être obtenues ou conservées par décision du juge avant même d’engager le procès.",
  },
];

export default function WaysTabs() {
  const [cur, setCur] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number, focus = false) => {
    const n = (i + VOIES.length) % VOIES.length;
    setCur(n);
    if (focus) tabRefs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1, true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(VOIES.length - 1, true); }
  };

  return (
    <div className="ways">
      <div className="dtabs" role="tablist" aria-label="Quatre voies">
        {VOIES.map((v, i) => (
          <button
            key={v.court}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`voie-tab-${i}`}
            aria-controls={`voie-panel-${i}`}
            aria-selected={i === cur}
            tabIndex={i === cur ? 0 : -1}
            onClick={() => go(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {v.court}
          </button>
        ))}
      </div>

      <div className="dstage">
        {VOIES.map((v, i) => (
          <div
            key={v.court}
            className={i === cur ? "v-panel is-active" : "v-panel"}
            role="tabpanel"
            id={`voie-panel-${i}`}
            aria-labelledby={`voie-tab-${i}`}
          >
            <div className="v-side">
              <div className="v-head">
                <span className="v-n">Voie {String(i + 1).padStart(2, "0")}<span className="v-n-suf"> / 04</span></span>
                <span className="v-verb">{v.court}</span>
              </div>
              <span className="v-big">{fr(v.sub)}</span>
              <p className="v-recouvre">{fr(v.recouvre)}</p>
              <div className="d-nav">
                <button type="button" className="d-prev" aria-label="Voie précédente" onClick={() => go(cur - 1)}>←</button>
                <button type="button" className="d-next" aria-label="Voie suivante" onClick={() => go(cur + 1)}>→</button>
              </div>
            </div>
            <div className="v-clear">
              <span className="v-tag">En clair</span>
              <p>{fr(v.clair)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
