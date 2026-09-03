"use client";

import { useState } from "react";
import styles from "../analyses.module.css";

const DESTINATAIRE = "contact@lazaregue-avocats.fr";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Demande d'abonnement aux analyses.
 *
 * Comme les autres formulaires du site, elle passe par la messagerie du
 * visiteur : aucune adresse n'est collectée ni conservée ici. Le texte affiché
 * le dit — pas de promesse d'inscription automatique tant qu'aucun service
 * d'envoi n'est en place.
 */
export default function Newsletter() {
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
    <section id="news" className={styles.news}>
      <div className={styles.newsInner}>
        <div>
          <h2>RECEVEZ NOS ANALYSES QUAND ELLES COMPTENT</h2>
          <p className={styles.newsTexte}>
            Pas de calendrier, pas de veille au kilomètre. Un e-mail seulement quand
            une décision mérite qu&apos;on la commente.
          </p>
        </div>

        <div>
          {envoye ? (
            <div className={styles.newsOk} role="status">
              <span className={styles.newsOkIcone} aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span>Votre messagerie s&apos;est ouverte — il ne reste qu&apos;à envoyer.</span>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.newsBox}>
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
              <p className={styles.newsNote}>
                {erreur ??
                  "Ouvre votre messagerie avec la demande déjà rédigée · aucune adresse n'est collectée par ce site."}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
