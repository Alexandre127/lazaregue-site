"use client";

/**
 * Section « Voies possibles » — composant à onglets (modèle validé sur M&A Tech).
 *
 * Accessibilité : vrai `tablist` / `tab` / `tabpanel`, navigation clavier
 * (flèches, Début, Fin), tabindex mobile (roving), focus visible. Les QUATRE
 * panneaux sont dans le HTML (attribut `hidden` sur les inactifs) pour rester
 * indexables sans JavaScript. L'animation est retirée si l'utilisateur demande
 * une réduction des mouvements (géré en CSS via prefers-reduced-motion).
 *
 * Libellés courts d'onglets + noms complets repris du H2 et du contenu actuel.
 * Bandeaux « En clair » : voies 2 et 3 = phrases déjà présentes sur la page ;
 * voies 1 et 4 = ajouts soumis (protocole transactionnel ; article 145 CPC).
 */

import { useRef, useState } from "react";
import { fr } from "@/lib/typo";

type Voie = {
  court: string;
  n: string;
  nom: string;
  recouvre: string;
  clair: string;
};

const VOIES: Voie[] = [
  {
    court: "Négocier",
    n: "Voie 01 / 04",
    nom: "Sauver ou réorganiser le projet",
    recouvre:
      "Corrections, nouveau calendrier, gouvernance renforcée, remises, échéancier de paiement et protocole formalisant les engagements de chacun.",
    clair:
      "Le protocole transactionnel fixe par écrit les engagements de chacun et met fin au différend sur les points qu’il règle.",
  },
  {
    court: "Faire exécuter",
    n: "Voie 02 / 04",
    nom: "Obtenir l’exécution d’une obligation",
    recouvre:
      "Correction des anomalies, livraison, récupération des données, mise en œuvre de la réversibilité ou remise de documents.",
    clair:
      "L’exécution forcée consiste à obtenir du juge qu’il ordonne l’accomplissement de ce qui était dû, plutôt que des dommages et intérêts.",
  },
  {
    court: "Organiser la sortie",
    n: "Voie 03 / 04",
    nom: "Organiser la rupture",
    recouvre:
      "Mise en demeure, résiliation, continuité du service, transition vers une autre solution et traitement des conséquences financières.",
    clair:
      "La résolution du contrat, lorsqu’elle est prononcée, remet les parties dans l’état antérieur, dans la mesure permise par la nature des prestations.",
  },
  {
    court: "Saisir le juge",
    n: "Voie 04 / 04",
    nom: "Engager ou défendre une procédure",
    recouvre:
      "Référé, mesure de preuve ordonnée avant tout procès, expertise judiciaire ou procédure au fond, en demande comme en défense.",
    clair:
      "La mesure d’instruction avant tout procès (article 145 du code de procédure civile) permet de faire établir ou conserver des preuves avant d’engager l’action au fond.",
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
    <>
      <div className="d-top">
        <p className="meta d-top-hint">Quatre voies, choisies selon l’objectif économique</p>
        <p className="meta d-count" aria-live="polite">{cur + 1} / {VOIES.length}</p>
      </div>

      <div className="dtabs" role="tablist" aria-label="Voies possibles">
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
            className="v-panel"
            role="tabpanel"
            id={`voie-panel-${i}`}
            aria-labelledby={`voie-tab-${i}`}
            hidden={i !== cur}
          >
            <div className="v-name">
              <span className="v-n">{v.n}</span>
              <span className="v-big">{v.nom}</span>
            </div>
            <div className="v-body">
              <span className="v-stamp">Ce que recouvre cette voie</span>
              <p>{fr(v.recouvre)}</p>
            </div>
            <div className="v-clear">
              <span className="v-tag">En clair</span>
              <p>{fr(v.clair)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-nav">
        <button type="button" className="d-prev" aria-label="Voie précédente" onClick={() => go(cur - 1)}>←</button>
        <button type="button" className="d-next" aria-label="Voie suivante" onClick={() => go(cur + 1)}>→</button>
      </div>
    </>
  );
}
