"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import styles from "./binance.module.css";

/**
 * Modèle de courrier interactif (réclamation Binance).
 *
 * Sans JavaScript (rendu serveur) : le courrier complet est affiché, les trois
 * options dans des <details> natifs, l'option 1 ouverte. Après hydratation :
 * trois boutons choisissent le cas, le courrier n'affiche que l'option retenue,
 * et « Copier le modèle » copie le texte brut correspondant.
 *
 * Mesure : `data-track="copy_template"` est relayé par la délégation de clic de
 * components/analytics/analytics-events.tsx vers le dataLayer ; GTM ne le
 * transmet qu'aux outils autorisés par le visiteur (bandeau de consentement).
 */

const OPTIONS = [
  {
    bouton: "Retrait demandé",
    titre: "Option 1 – vous aviez demandé un retrait",
    texte:
      "Le [date et heure], j'ai demandé le retrait de [quantité et cryptomonnaie] sur le réseau [réseau], référence [référence ou ticket]. Cette demande apparaît comme [statut affiché]. Je vous demande d'exécuter ce retrait ou, à défaut, de m'indiquer par écrit la raison précise de ce blocage et les éléments éventuellement nécessaires.",
  },
  {
    bouton: "Retrait impossible",
    titre: "Option 2 – vous ne pouvez pas lancer de retrait",
    texte:
      "Depuis le [date], je ne parviens pas à retirer mes avoirs, qui s'élèvent à [quantités et cryptomonnaies] selon le relevé joint. [Si vous l'avez reçu : votre message de fin juin 2026 indiquait que mes crypto-actifs resteraient disponibles au retrait.] Je vous demande de m'indiquer à quelle date ce retrait sera possible pour mon compte.",
  },
  {
    bouton: "Cryptos manquantes",
    titre: "Option 3 – des cryptos manquent",
    texte:
      "Je constate depuis le [date] qu'il manque [quantité et cryptomonnaie] sur mon compte, à la suite de l'opération [référence si disponible] que je n'ai pas faite. Je vous demande d'en vérifier l'origine et de me restituer les cryptomonnaies correspondantes.",
  },
] as const;

const OBJET = "Objet : Réclamation – compte Binance [UID] – [retrait bloqué / cryptos manquantes]";
const DEBUT = [
  "Madame, Monsieur,",
  "Je suis titulaire du compte Binance n° [UID], associé à l'adresse [e-mail du compte], et je réside en France.",
];
const QUESTIONS_INTRO = "Je vous remercie de me préciser :";
const QUESTIONS = [
  "si cette situation est liée à l'incident de sécurité du 29 octobre 2026 ;",
  "quelle société était chargée de conserver mes crypto-actifs à cette date ;",
  "si cette société s'engage, elle aussi, à couvrir les pertes liées à l'incident, comme Binance l'a annoncé publiquement ;",
  "dans quel délai ma demande sera traitée.",
];
const FIN = [
  "Je vous demande d'enregistrer ce message comme une réclamation, de m'en communiquer la référence, de me répondre par écrit en expliquant votre position, et de conserver les données relatives à mon compte et aux opérations signalées.",
  "Pièces jointes : [relevés, confirmations, captures d'écran].",
  "Cette réclamation est faite sous réserve de tous mes droits.",
  "[Nom et prénom] – [Date] – [Coordonnées]",
];

function texteBrut(option: number): string {
  return [
    OBJET,
    "",
    ...DEBUT.flatMap((p) => [p, ""]),
    OPTIONS[option].texte,
    "",
    QUESTIONS_INTRO,
    "",
    ...QUESTIONS.map((q) => `- ${q}`),
    "",
    ...FIN.flatMap((p, i) => (i < FIN.length - 1 ? [p, ""] : [p])),
  ].join("\n");
}

/** Surligne les passages entre crochets (zones à compléter). */
function avecZones(texte: string) {
  return texte.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span className={styles.zone} key={i}>{part}</span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const subscribe = () => () => {};

export default function CourrierBinance() {
  const hydrate = useSyncExternalStore(subscribe, () => true, () => false);
  const [option, setOption] = useState(0);
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(texteBrut(option));
      setCopie(true);
      window.setTimeout(() => setCopie(false), 2500);
    } catch {
      /* presse-papiers indisponible : le texte reste sélectionnable à la main */
    }
  }

  return (
    <>
      {hydrate ? (
        <div className={styles.choix} role="group" aria-label="Choisir votre cas">
          {OPTIONS.map((o, i) => (
            <button
              key={o.bouton}
              type="button"
              className={styles.choixBtn}
              aria-pressed={option === i}
              onClick={() => {
                setOption(i);
                setCopie(false);
              }}
            >
              {o.bouton}
            </button>
          ))}
        </div>
      ) : null}
    <figure className={styles.courrier} aria-labelledby="courrier-titre">
      <div className={styles.courrierTete}>
        <p className={styles.mono} id="courrier-titre">réclamation · compte binance</p>
        {hydrate ? (
          <div className={styles.actions}>
            <span className={styles.copie} role="status" aria-live="polite">{copie ? "Modèle copié" : ""}</span>
            <button
              type="button"
              className={styles.copier}
              onClick={copier}
              data-track="copy_template"
              data-track-composant="modele_courrier_binance"
              data-track-option={String(option + 1)}
            >
              Copier le modèle
            </button>
          </div>
        ) : null}
      </div>

      <div className={styles.courrierCorps}>
        <p><b>{avecZones(OBJET)}</b></p>
        {DEBUT.map((p) => (
          <p key={p}>{avecZones(p)}</p>
        ))}
        {hydrate ? (
          <p>{avecZones(OPTIONS[option].texte)}</p>
        ) : (
          OPTIONS.map((o, i) => (
            <details key={o.titre} className={styles.option} open={i === 0}>
              <summary>{o.titre}</summary>
              <p>{avecZones(o.texte)}</p>
            </details>
          ))
        )}
        <p>{QUESTIONS_INTRO}</p>
        <ul>
          {QUESTIONS.map((q) => (
            <li key={q}>– {q}</li>
          ))}
        </ul>
        {FIN.map((p) => (
          <p key={p}>{avecZones(p)}</p>
        ))}
      </div>
    </figure>
    </>
  );
}
