"use client";

import { useState } from "react";
import styles from "../contact.module.css";

const DESTINATAIRE = "contact@lazaregue-avocats.fr";

type Champs = { nom: string; email: string; msg: string };
type Erreurs = Partial<Record<keyof Champs, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulaire de contact — ouvre le logiciel de messagerie du visiteur avec un
 * message pré-rempli. Aucun serveur n'est impliqué : rien n'est stocké ni
 * transmis par le site, et le message part depuis la propre messagerie du
 * visiteur, directement au cabinet.
 *
 * Deux conséquences assumées de ce choix, reflétées dans les textes :
 *  · aucune pièce jointe possible (le visiteur l'ajoute dans son logiciel) ;
 *  · aucun accusé de réception automatique.
 */
export default function ContactForm() {
  const [champs, setChamps] = useState<Champs>({ nom: "", email: "", msg: "" });
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [ouvert, setOuvert] = useState(false);

  const set = (k: keyof Champs) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChamps((c) => ({ ...c, [k]: e.target.value }));
    setErreurs((err) => ({ ...err, [k]: undefined }));
  };

  const valider = (): boolean => {
    const err: Erreurs = {};
    if (!champs.nom.trim()) err.nom = "Merci d'indiquer votre nom.";
    if (!champs.email.trim()) err.email = "Merci d'indiquer votre e-mail.";
    else if (!EMAIL_RE.test(champs.email.trim()))
      err.email = "Cette adresse e-mail semble incomplète.";
    if (!champs.msg.trim()) err.msg = "Merci de décrire votre situation.";
    setErreurs(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valider()) return;

    const sujet = `Demande de ${champs.nom.trim()}`;
    const corps = [
      champs.msg.trim(),
      "",
      "—",
      `${champs.nom.trim()}`,
      `${champs.email.trim()}`,
    ].join("\n");

    window.location.href = `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(
      sujet,
    )}&body=${encodeURIComponent(corps)}`;
    setOuvert(true);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={styles.fField}>
        <label className={styles.fLabel} htmlFor="nom">
          Nom et prénom
        </label>
        <input
          type="text"
          id="nom"
          autoComplete="name"
          value={champs.nom}
          onChange={set("nom")}
          aria-invalid={erreurs.nom ? true : undefined}
          aria-describedby={erreurs.nom ? "err-nom" : undefined}
        />
        {erreurs.nom ? (
          <p className={styles.fError} id="err-nom">
            {erreurs.nom}
          </p>
        ) : null}
      </div>

      <div className={styles.fField}>
        <label className={styles.fLabel} htmlFor="email">
          Votre e-mail
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          value={champs.email}
          onChange={set("email")}
          aria-invalid={erreurs.email ? true : undefined}
          aria-describedby={erreurs.email ? "err-email" : undefined}
        />
        {erreurs.email ? (
          <p className={styles.fError} id="err-email">
            {erreurs.email}
          </p>
        ) : null}
      </div>

      <div className={styles.fField}>
        <label className={styles.fLabel} htmlFor="msg">
          Décrivez votre situation
        </label>
        <textarea
          id="msg"
          value={champs.msg}
          onChange={set("msg")}
          placeholder="Quelques phrases suffisent pour nous permettre de comprendre votre situation et de vous orienter."
          aria-invalid={erreurs.msg ? true : undefined}
          aria-describedby={erreurs.msg ? "err-msg" : undefined}
        />
        {erreurs.msg ? (
          <p className={styles.fError} id="err-msg">
            {erreurs.msg}
          </p>
        ) : null}
      </div>

      {/* Remplace le dépôt de fichier de la maquette : une pièce jointe ne peut
          pas transiter par un lien mailto. Le visiteur l'ajoute lui-même. */}
      <div className={styles.fField}>
        <span className={styles.fLabel}>
          Un document à joindre ? <em>· facultatif</em>
        </span>
        <div className={styles.joindre}>
          <span className={styles.dK}>Dans votre message</span>
          <div className={styles.dT}>
            Le courrier, contrat ou e-mail reçu — joignez-le directement depuis
            votre messagerie, une fois le message ouvert.
          </div>
        </div>
      </div>

      <button className={styles.fSubmit} type="submit">
        {ouvert ? "Rouvrir mon message" : "Décrire ma situation"}
      </button>

      {ouvert ? (
        <p className={styles.fAfter} role="status">
          Votre messagerie s&apos;est ouverte — il ne reste qu&apos;à envoyer.
        </p>
      ) : null}
    </form>
  );
}
