"use client";

import { useState } from "react";
import styles from "../article.module.css";

const DESTINATAIRE = "contact@lazaregue-avocats.fr";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Demande de la grille « Préparer votre dossier ».
 *
 * Comme le formulaire de contact, la demande passe par la messagerie du
 * visiteur : rien ne transite par le site, aucune adresse n'y est conservée.
 * Le texte affiché le dit explicitement — pas de promesse d'envoi automatique.
 */
export default function GrilleForm() {
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

    const sujet = encodeURIComponent("Demande de grille — Œuvre originale");
    const corps = encodeURIComponent(
      `Bonjour,\n\nMerci de m'adresser la grille « Préparer votre dossier — œuvre originale » au format PDF.\n\nAdresse : ${valeur}\n\nCordialement,`,
    );
    window.location.href = `mailto:${DESTINATAIRE}?subject=${sujet}&body=${corps}`;
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <div className={styles.grille}>
        <div className={styles.grilleOk} role="status">
          <span className={styles.grilleOkIcone} aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span>
            Votre messagerie s&apos;est ouverte — il ne reste qu&apos;à envoyer.
          </span>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.grille} onSubmit={onSubmit} noValidate>
      <div className={styles.grilleBox}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErreur(null);
          }}
          placeholder="votre@email.fr"
          aria-label="Votre adresse e-mail"
          aria-invalid={erreur ? true : undefined}
        />
        <button type="submit">Recevoir la grille</button>
      </div>
      <p className={styles.grilleNote}>
        {erreur ?? "Ouvre votre messagerie avec la demande déjà rédigée · ce site ne conserve aucune adresse."}
      </p>
    </form>
  );
}
