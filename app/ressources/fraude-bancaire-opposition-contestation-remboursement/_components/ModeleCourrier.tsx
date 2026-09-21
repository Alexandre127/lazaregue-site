"use client";

import { Fragment, useState } from "react";
import styles from "../article.module.css";

/**
 * Modèle de courrier — demande de droit d'accès (art. 15 RGPD).
 * Police du texte courant (pas de chasse fixe). Boutons « Copier le modèle »
 * (presse-papiers, texte BRUT) et « Imprimer ». Les crochets […] restent
 * visibles et surlignés (zones à compléter).
 */

const INTRO = "À adresser en recommandé avec accusé de réception au délégué à la protection des données de votre banque, avec copie de votre pièce d'identité.";
const OBJET = "Objet : demande d'accès à mes données personnelles — article 15 du règlement (UE) 2016/679";
const PARAS = [
  "Madame, Monsieur,",
  "Titulaire du compte n° […] ouvert dans vos livres, j'ai contesté le […] les opérations suivantes : […] (dates, montants, bénéficiaires).",
  "Sur le fondement de l'article 15 du règlement (UE) 2016/679, je vous demande de me communiquer l'ensemble des données à caractère personnel me concernant relatives à ces opérations, et notamment :",
];
const PUCES = [
  "les journaux techniques d'authentification de chacune des opérations contestées (horodatage, canal, type d'authentification mise en œuvre, résultat) ;",
  "les adresses IP et les identifiants des terminaux depuis lesquels les opérations ont été initiées et validées ;",
  "l'historique des enrôlements et désenrôlements du dispositif de sécurité personnalisé attaché à mon compte, avec leurs dates et les terminaux concernés ;",
  "l'historique des ajouts, suppressions et modifications de bénéficiaires sur la période, avec leur horodatage ;",
  "les enregistrements et comptes rendus de mes échanges avec vos services, téléphoniques comme écrits, sur la période concernée ;",
  "les alertes, scores de risque ou signalements générés par vos dispositifs de surveillance des opérations sur la période ;",
  "les informations relatives au traitement de ma contestation, y compris les éléments ayant fondé votre décision.",
];
const FIN = [
  "Je vous rappelle que cette demande doit recevoir réponse dans un délai d'un mois à compter de sa réception, et que l'absence de réponse m'ouvre la voie d'une réclamation auprès de la CNIL.",
  "Je vous prie d'agréer, Madame, Monsieur, l'expression de ma considération distinguée.",
];

const PLAIN = [
  INTRO,
  "",
  OBJET,
  "",
  PARAS[0],
  "",
  PARAS[1],
  "",
  PARAS[2],
  "",
  ...PUCES.map((p) => `— ${p}`),
  "",
  FIN[0],
  "",
  FIN[1],
].join("\n");

/** Rend un texte en surlignant les crochets […]. */
function withSlots(text: string) {
  return text.split(/(\[…\])/g).map((part, i) =>
    part === "[…]" ? (
      <span className={styles.slot} key={i}>[…]</span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export default function ModeleCourrier() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PLAIN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  return (
    <figure className={styles.letter} aria-label="Modèle de courrier — demande de droit d'accès (article 15 du RGPD)">
      <div className={styles["letter-top"]}>
        <p className={styles.label}>Modèle de courrier — demande de droit d&apos;accès (article 15 du RGPD)</p>
        <div className={styles["letter-actions"]}>
          <button type="button" className={styles["letter-btn"]} onClick={copy}>Copier le modèle</button>
          <button type="button" className={styles["letter-btn"]} onClick={() => window.print()}>Imprimer</button>
          <span className={styles["letter-copied"]} role="status" aria-live="polite">{copied ? "Modèle copié" : ""}</span>
        </div>
      </div>
      <div className={styles["letter-body"]}>
        <p className={styles.lem}>{INTRO}</p>
        <p><b>{OBJET}</b></p>
        <p>{PARAS[0]}</p>
        <p>{withSlots(PARAS[1])}</p>
        <p>{PARAS[2]}</p>
        <ul>
          {PUCES.map((p) => (
            <li key={p}>— {p}</li>
          ))}
        </ul>
        <p>{FIN[0]}</p>
        <p>{FIN[1]}</p>
      </div>
    </figure>
  );
}
