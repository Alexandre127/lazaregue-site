"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { CONSENTEMENT_TEXTE, LIEN_POLITIQUE } from "@/lib/observatoire-consent";
import styles from "./abonnement.module.css";

// Affiche le texte exact du consentement en y insérant le lien vers la politique.
const [CONSENT_AVANT, CONSENT_APRES] = CONSENTEMENT_TEXTE.split(LIEN_POLITIQUE);

/**
 * Formulaire « Recevoir les prochaines notes » de l'Observatoire.
 *
 * Partagé par la note d'analyse et la page d'offre. Envoi côté serveur vers
 * /api/abonnement-notes (upsert CRM HubSpot, même mécanisme que le formulaire de
 * contact). Case de consentement obligatoire, non pré-cochée. Confirmation à
 * l'écran ; gestion de l'erreur. Aucune donnée saisie ne transite par le
 * dataLayer (seul un événement d'abonnement sans donnée personnelle est poussé).
 */

type Statut = "idle" | "sending" | "done" | "error";

export default function AbonnementForm() {
  const pathname = usePathname();
  const [statut, setStatut] = useState<Statut>("idle");
  const [erreur, setErreur] = useState<string>("");
  const [invalides, setInvalides] = useState<string[]>([]);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    const consentement = fd.get("consentement") === "on";

    const manquants: string[] = [];
    if (!/^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/.test(email)) manquants.push("email");
    if (!consentement) manquants.push("consentement");
    if (manquants.length) {
      setInvalides(manquants);
      setStatut("error");
      setErreur("");
      if (manquants.includes("email")) emailRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }

    setInvalides([]);
    setStatut("sending");
    setErreur("");
    try {
      const res = await fetch("/api/abonnement-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: fd.get("nom") || "",
          email,
          etablissement: fd.get("etablissement") || "",
          fonction: fd.get("fonction") || "",
          consentement: true,
          website: fd.get("website") || "",
          page: pathname || "",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatut("done");
        track("observatoire_abonnement", { composant: "abonnement_form", page_type: "ressource" });
      } else {
        setStatut("error");
        setErreur(json.error || "L'enregistrement a échoué. Réessayez dans quelques minutes.");
      }
    } catch {
      setStatut("error");
      setErreur("La connexion a échoué. Vérifiez votre connexion et réessayez.");
    }
  }

  if (statut === "done") {
    return (
      <div className={styles.confirme} role="status">
        <strong>Inscription enregistrée.</strong> Vous recevrez la prochaine note de l&rsquo;Observatoire à
        l&rsquo;adresse indiquée.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {statut === "error" && erreur && (
        <p className={styles.erreur} role="alert">
          {erreur}
        </p>
      )}
      {/* Champ piège anti-robot : masqué, hors flux de tabulation. */}
      <div className={styles.pot} aria-hidden="true">
        <label>
          Ne pas remplir
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.champ}>
        <label htmlFor="ab-nom">Nom et prénom</label>
        <input id="ab-nom" name="nom" type="text" autoComplete="name" />
      </div>
      <div className={styles.champ}>
        <label htmlFor="ab-email">
          Adresse e-mail professionnelle <span className={styles.req} aria-hidden="true">*</span>
        </label>
        <input
          id="ab-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          ref={emailRef}
          aria-invalid={invalides.includes("email") || undefined}
        />
      </div>
      <div className={styles.champ}>
        <label htmlFor="ab-etab">Établissement</label>
        <input id="ab-etab" name="etablissement" type="text" autoComplete="organization" />
      </div>
      <div className={styles.champ}>
        <label htmlFor="ab-fonction">Fonction</label>
        <input id="ab-fonction" name="fonction" type="text" autoComplete="organization-title" />
      </div>

      <label className={styles.consent}>
        <input
          type="checkbox"
          name="consentement"
          required
          ref={consentRef}
          aria-invalid={invalides.includes("consentement") || undefined}
        />
        <span>
          {CONSENT_AVANT}
          <Link href="/politique-de-confidentialite">{LIEN_POLITIQUE}</Link>
          {CONSENT_APRES}
        </span>
      </label>

      <p className={styles.obligatoire}>* champ obligatoire</p>

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary" disabled={statut === "sending"}>
          {statut === "sending" ? "Envoi en cours…" : "Recevoir les notes"}
        </button>
      </div>
    </form>
  );
}
