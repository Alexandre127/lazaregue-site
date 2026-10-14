"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./shadow-ai.module.css";
import { track } from "@/lib/analytics";
import { LIBELLE_LETTRE, MENTION, MENTION_LIEN } from "./textes";

/**
 * Formulaire du kit « Shadow AI » : e-mail professionnel obligatoire, prénom,
 * entreprise et fonction facultatifs, case lettre d'information NON cochée et
 * indépendante du téléchargement. Envoi : POST /api/kit-shadow-ai.
 *
 * Après envoi : état « Bien reçu » et quatre liens de téléchargement, à
 * l'écran uniquement (aucun e-mail). Aucun cookie ; l'événement GA4
 * `generate_lead` ne part que si la mesure d'audience est déjà acceptée dans
 * le bandeau CookieConsent, et ne contient aucune donnée saisie.
 */

const FONCTIONS = [
  "Direction générale",
  "Direction juridique ou conformité",
  "DSI, RSSI",
  "Ressources humaines",
  "Délégué à la protection des données",
  "Autre",
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MSG_EMAIL = "Saisissez une adresse électronique valide, par exemple prenom.nom@entreprise.fr.";
const DOSSIER = "/ressources/kit-shadow-ai";

const FICHIERS = [
  { href: `${DOSSIER}/Charte-IA-Lazaregue-Avocats.pdf`, label: "Charte d'utilisation de l'IA", fmt: "pdf" },
  { href: `${DOSSIER}/Charte-IA-Lazaregue-Avocats.docx`, label: "Charte d'utilisation de l'IA", fmt: "word" },
  { href: `${DOSSIER}/Grille-inventaire-IA-Lazaregue-Avocats.pdf`, label: "Grille d'inventaire", fmt: "pdf" },
  { href: `${DOSSIER}/Grille-inventaire-IA-Lazaregue-Avocats.xlsx`, label: "Grille d'inventaire", fmt: "excel" },
];

function mesureAcceptee(): boolean {
  try {
    const w = window as unknown as { CookieConsent?: { acceptedCategory: (c: string) => boolean } };
    return !!w.CookieConsent?.acceptedCategory?.("analytics");
  } catch {
    return false;
  }
}

export default function KitForm() {
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [fonction, setFonction] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [website, setWebsite] = useState(""); // piège
  const [errEmail, setErrEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [failMsg, setFailMsg] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setErrEmail(MSG_EMAIL);
      emailRef.current?.focus();
      return;
    }
    setErrEmail("");
    setFailMsg("");
    setStatus("sending");
    try {
      const res = await fetch("/api/kit-shadow-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, prenom, entreprise, fonction, newsletter, website }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("done");
        if (mesureAcceptee()) {
          track("generate_lead", { page_type: "ressource", domaine: "ia", composant: "kit_shadow_ai" });
        }
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (Array.isArray(json.invalides) && json.invalides.includes("email")) {
        setStatus("idle");
        setErrEmail(json.error || MSG_EMAIL);
        emailRef.current?.focus();
        return;
      }
      setStatus("error");
      setFailMsg(json.error || "L'envoi a échoué. Réessayez dans quelques instants.");
    } catch {
      setStatus("error");
      setFailMsg("L'envoi a échoué (problème de connexion). Réessayez dans quelques instants.");
    }
  }

  return (
    <div className={styles.form}>
      {status === "done" ? (
        <div>
          <p className={styles.tick}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 10l5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            Bien reçu
          </p>
          <h3 className={styles.formTitre} ref={doneRef} tabIndex={-1}>
            Vos deux modèles sont prêts
          </h3>
          <ul className={styles.dl}>
            {FICHIERS.map((f) => (
              <li key={f.href}>
                <a className="btn btn-primary" href={f.href} download>
                  {f.label} <span>{f.fmt}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.sub}>
            Étape suivante : mesurez l&apos;exposition de votre entreprise en dix questions avec{" "}
            <Link href="/ressources/diagnostic-shadow-ai">l&apos;autodiagnostic Shadow AI</Link>.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-labelledby="kit-form-titre" data-clarity-mask="true">
          <h3 className={styles.formTitre} id="kit-form-titre">
            Recevoir la charte IA et le registre
          </h3>
          <p className={styles.sub}>Les liens de téléchargement s&apos;affichent aussitôt.</p>

          {/* Champ piège anti-robots — masqué, hors flux, non focusable. */}
          <div aria-hidden className={styles.hp}>
            {/* Identifiant neutre : un nom comme « website » attire le remplissage
                automatique des navigateurs, qui ferait écarter une vraie demande. */}
            <label htmlFor="kit-zq7">Ne pas remplir</label>
            <input
              id="kit-zq7"
              name="kit-zq7"
              tabIndex={-1}
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className={styles.fields}>
            <div className={`${styles.f} ${styles.full}`}>
              <label htmlFor="kit-email">Adresse électronique professionnelle</label>
              <input
                ref={emailRef}
                type="email"
                id="kit-email"
                name="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={errEmail ? "true" : undefined}
                aria-describedby="kit-email-msg"
                placeholder="prenom.nom@entreprise.fr"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errEmail) setErrEmail("");
                }}
              />
              <p className={styles.msg} id="kit-email-msg" role="alert">
                {errEmail}
              </p>
            </div>
            <div className={styles.f}>
              <label htmlFor="kit-prenom">
                Prénom <span className={styles.opt}>(facultatif)</span>
              </label>
              <input type="text" id="kit-prenom" name="prenom" autoComplete="given-name" maxLength={80} value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>
            <div className={styles.f}>
              <label htmlFor="kit-entreprise">
                Entreprise <span className={styles.opt}>(facultatif)</span>
              </label>
              <input type="text" id="kit-entreprise" name="entreprise" autoComplete="organization" maxLength={160} value={entreprise} onChange={(e) => setEntreprise(e.target.value)} />
            </div>
            <div className={`${styles.f} ${styles.full}`}>
              <label htmlFor="kit-fonction">
                Fonction <span className={styles.opt}>(facultatif)</span>
              </label>
              <select id="kit-fonction" name="fonction" value={fonction} onChange={(e) => setFonction(e.target.value)}>
                <option value="">Choisir</option>
                {FONCTIONS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.check}>
            <input type="checkbox" id="kit-newsletter" name="newsletter" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
            <label htmlFor="kit-newsletter">
              {LIBELLE_LETTRE}
            </label>
          </div>

          {status === "error" && (
            <p className={styles.fail} role="alert">
              {failMsg}
            </p>
          )}

          <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Envoi en cours…" : "Recevoir les modèles"}
          </button>
          <p className={styles.legal}>
            {MENTION} <a href="/politique-de-confidentialite">{MENTION_LIEN}</a>.
          </p>
        </form>
      )}
    </div>
  );
}
