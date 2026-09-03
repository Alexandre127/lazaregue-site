"use client";

import { useState } from "react";
import styles from "../analyse.module.css";

const DESTINATAIRE = "contact@lazaregue-avocats.fr";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Encart d'abonnement — même principe que la newsletter des Analyses :
 * la demande part de la messagerie du visiteur, aucune adresse n'est
 * collectée par le site.
 */
export default function Abonnement() {
  const [email, setEmail] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valeur = email.trim();
    if (!valeur) {
      setErreur("Merci d'indiquer votre e-mail.");
      return;
    }
    if (!EMAIL_RE.test(valeur)) {
      setErreur("Cette adresse e-mail semble incomplète.");
      return;
    }
    setErreur(null);
    const sujet = encodeURIComponent("Abonnement aux analyses");
    const corps = encodeURIComponent(
      `Bonjour,\n\nJe souhaite recevoir les analyses du cabinet.\n\nAdresse : ${valeur}\n\nCordialement,`,
    );
    window.location.href = `mailto:${DESTINATAIRE}?subject=${sujet}&body=${corps}`;
    setEnvoye(true);
  };

  return (
    <div className={styles.abo}>
      <div>
        <div className={styles.aboK}>La chronique du cabinet</div>
        <p className={styles.aboTexte}>
          Recevez nos analyses sur l&apos;IA, le RGPD et la tech — seulement quand une
          décision mérite qu&apos;on la commente.
        </p>
      </div>
      <div>
        {envoye ? (
          <div className={styles.aboOk} role="status">
            <span className={styles.aboOkIcone} aria-hidden>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span>Votre messagerie s&apos;est ouverte — il ne reste qu&apos;à envoyer.</span>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className={styles.aboBox}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErreur(null);
                }}
                placeholder="votre e-mail professionnel"
                aria-label="Votre adresse e-mail"
                aria-invalid={erreur ? true : undefined}
              />
              <button type="submit">S&apos;abonner</button>
            </div>
            <p className={styles.aboNote}>
              {erreur ??
                "Ouvre votre messagerie avec la demande déjà rédigée · aucune adresse n'est collectée par ce site."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
