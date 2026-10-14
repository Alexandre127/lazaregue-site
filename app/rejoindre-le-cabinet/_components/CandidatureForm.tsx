"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "../rejoindre.module.css";
import { ENTREES, EVT_ENTREE, MAX_FICHIERS } from "../data/entrees";

/**
 * Formulaire de candidature — envoi réel côté serveur (POST /api/candidature,
 * SMTP du cabinet, PDF joints à l'e-mail).
 *
 * Mêmes principes que le formulaire de contact :
 *  · validation à l'ENVOI, récapitulatif d'erreurs en haut avec liens vers les
 *    champs, focus sur le récapitulatif ;
 *  · la saisie n'est jamais perdue en cas d'erreur ;
 *  · confirmation à l'écran avec focus — AUCUN e-mail automatique au candidat ;
 *  · anti-spam : champ piège « website » + limitation côté serveur.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Champ = "entree" | "nom" | "email" | "disponibilite" | "cv" | "travail" | "mention";
type Errs = Partial<Record<Champ, string>>;

const LIBELLES: Record<Champ, string> = {
  entree: "Entrée visée",
  nom: "Prénom et nom",
  email: "Adresse électronique",
  disponibilite: "Disponibilité",
  cv: "Curriculum vitæ",
  travail: "Exemple de travail personnel",
  mention: "Mention d'information",
};

const MSG: Record<Champ, string> = {
  entree: "Sélectionnez l'entrée visée.",
  nom: "Indiquez votre prénom et votre nom.",
  email: "Indiquez une adresse électronique valide, par exemple prenom.nom@exemple.fr.",
  disponibilite: "Indiquez une date de disponibilité.",
  cv: "Joignez votre curriculum vitæ au format PDF.",
  travail: "L'exemple de travail doit être un fichier PDF.",
  mention: "Cochez la case pour confirmer la prise de connaissance de la mention d'information.",
};
const MSG_PDF = "Seuls les fichiers PDF sont acceptés.";
const MSG_TAILLE = "Les deux fichiers dépassent 4 Mo au total. Réduisez leur taille.";

const estPdf = (f: File) => f.type === "application/pdf" || /\.pdf$/i.test(f.name);

export default function CandidatureForm() {
  const [entree, setEntree] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [disponibilite, setDisponibilite] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [travail, setTravail] = useState<File | null>(null);
  const [mention, setMention] = useState(false);
  const [website, setWebsite] = useState(""); // piège

  const [errs, setErrs] = useState<Errs>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [failMsg, setFailMsg] = useState("");

  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLParagraphElement>(null);

  // Présélection de l'entrée depuis les liens « Candidater → » des cartes.
  useEffect(() => {
    function onEntree(e: Event) {
      const id = (e as CustomEvent<string>).detail;
      const found = ENTREES.find((x) => x.id === id);
      if (found) setEntree(found.formulaire);
    }
    window.addEventListener(EVT_ENTREE, onEntree);
    return () => window.removeEventListener(EVT_ENTREE, onEntree);
  }, []);

  function validate(): Errs {
    const e: Errs = {};
    if (!entree) e.entree = MSG.entree;
    if (!nom.trim()) e.nom = MSG.nom;
    if (!EMAIL_RE.test(email.trim())) e.email = MSG.email;
    if (!disponibilite) e.disponibilite = MSG.disponibilite;
    if (!cv) e.cv = MSG.cv;
    else if (!estPdf(cv)) e.cv = MSG_PDF;
    if (travail && !estPdf(travail)) e.travail = MSG_PDF;
    if (!e.cv && !e.travail && (cv?.size ?? 0) + (travail?.size ?? 0) > MAX_FICHIERS) {
      e[travail ? "travail" : "cv"] = MSG_TAILLE;
    }
    if (!mention) e.mention = MSG.mention;
    return e;
  }

  function montrerErreurs(next: Errs) {
    setErrs(next);
    setShowSummary(true);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      montrerErreurs(next);
      return;
    }
    setErrs({});
    setShowSummary(false);
    setStatus("sending");
    setFailMsg("");

    const fd = new FormData();
    fd.set("entree", entree);
    fd.set("nom", nom);
    fd.set("email", email);
    fd.set("disponibilite", disponibilite);
    fd.set("mention", mention ? "oui" : "");
    fd.set("website", website);
    if (cv) fd.set("cv", cv);
    if (travail) fd.set("travail", travail);

    try {
      const res = await fetch("/api/candidature", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("done");
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      setStatus("idle");
      // Champs refusés par le serveur : on les signale comme à la validation locale.
      const invalides = (Array.isArray(json.invalides) ? json.invalides : []) as Champ[];
      if (invalides.length) {
        const srv: Errs = {};
        for (const c of invalides) if (c in MSG) srv[c] = json.error === MSG_PDF ? MSG_PDF : MSG[c];
        montrerErreurs(srv);
        return;
      }
      setStatus("error");
      setFailMsg(json.error || "L'envoi a échoué. Réessayez dans quelques instants.");
      requestAnimationFrame(() => failRef.current?.focus());
    } catch {
      setStatus("error");
      setFailMsg("L'envoi a échoué (problème de connexion). La saisie est conservée : réessayez.");
      requestAnimationFrame(() => failRef.current?.focus());
    }
  }

  if (status === "done") {
    return (
      <div className={styles.formCard}>
        <div className={styles.done} ref={doneRef} role="status" tabIndex={-1}>
          <p className={styles.doneTitle}>Candidature reçue. Une réponse vous sera adressée.</p>
        </div>
      </div>
    );
  }

  const errList = (Object.keys(errs) as Champ[]).filter((k) => errs[k]);
  const desc = (c: Champ, extra?: string) =>
    [extra, errs[c] ? `e-${c}` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.formCard}>
      {/* data-clarity-mask : le contenu saisi n'est jamais enregistré par Clarity. */}
      <form onSubmit={onSubmit} noValidate aria-label="Formulaire de candidature" data-clarity-mask="true">
        <p className={styles.req}>Les champs marqués * sont obligatoires.</p>

        {showSummary && errList.length > 0 && (
          <div className={styles.sumerr} ref={summaryRef} role="alert" tabIndex={-1}>
            <strong>Certains champs sont à corriger :</strong>
            <ul>
              {errList.map((c) => (
                <li key={c}>
                  <a href={`#f-${c}`}>
                    {LIBELLES[c]} — {errs[c]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Champ piège anti-robots — masqué, hors flux, non focusable. */}
        <div aria-hidden className={styles.hp}>
          <label htmlFor="f-website">Ne pas remplir</label>
          <input id="f-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className={styles.fld}>
          <label htmlFor="f-entree">Entrée visée&nbsp;*</label>
          <select
            id="f-entree"
            value={entree}
            onChange={(e) => setEntree(e.target.value)}
            aria-invalid={errs.entree ? "true" : undefined}
            aria-describedby={desc("entree")}
          >
            <option value="">Sélectionnez une entrée</option>
            {ENTREES.map((x) => (
              <option key={x.id} value={x.formulaire}>
                {x.formulaire}
              </option>
            ))}
          </select>
          {errs.entree && <p className={styles.err} id="e-entree">{errs.entree}</p>}
        </div>

        <div className={styles.row2}>
          <div className={styles.fld}>
            <label htmlFor="f-nom">Prénom et nom&nbsp;*</label>
            <input
              id="f-nom"
              type="text"
              autoComplete="name"
              maxLength={120}
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              aria-invalid={errs.nom ? "true" : undefined}
              aria-describedby={desc("nom")}
            />
            {errs.nom && <p className={styles.err} id="e-nom">{errs.nom}</p>}
          </div>
          <div className={styles.fld}>
            <label htmlFor="f-email">Adresse électronique&nbsp;*</label>
            <input
              id="f-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errs.email ? "true" : undefined}
              aria-describedby={desc("email")}
            />
            {errs.email && <p className={styles.err} id="e-email">{errs.email}</p>}
          </div>
        </div>

        <div className={styles.fld}>
          <label htmlFor="f-disponibilite">Disponibilité&nbsp;*</label>
          <input
            id="f-disponibilite"
            type="date"
            value={disponibilite}
            onChange={(e) => setDisponibilite(e.target.value)}
            aria-invalid={errs.disponibilite ? "true" : undefined}
            aria-describedby={desc("disponibilite")}
          />
          {errs.disponibilite && <p className={styles.err} id="e-disponibilite">{errs.disponibilite}</p>}
        </div>

        <div className={styles.fld}>
          <label htmlFor="f-cv">Curriculum vitæ&nbsp;*</label>
          <p className={styles.hint} id="h-cv">PDF uniquement, 4 Mo au total pour les deux fichiers.</p>
          <input
            id="f-cv"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setCv(e.target.files?.[0] ?? null)}
            aria-invalid={errs.cv ? "true" : undefined}
            aria-describedby={desc("cv", "h-cv")}
          />
          {errs.cv && <p className={styles.err} id="e-cv">{errs.cv}</p>}
        </div>

        <div className={styles.fld}>
          <label htmlFor="f-travail">
            Exemple de travail personnel — mémoire, article, note <span className={styles.opt}>facultatif</span>
          </label>
          <p className={styles.hint} id="h-travail">
            PDF uniquement, 4 Mo au total pour les deux fichiers. Aucune lettre de motivation n&apos;est
            demandée&nbsp;: un écrit réel en dit davantage.
          </p>
          <input
            id="f-travail"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setTravail(e.target.files?.[0] ?? null)}
            aria-invalid={errs.travail ? "true" : undefined}
            aria-describedby={desc("travail", "h-travail")}
          />
          {errs.travail && <p className={styles.err} id="e-travail">{errs.travail}</p>}
        </div>

        <div className={styles.fld}>
          <label className={styles.check} htmlFor="f-mention">
            <input
              id="f-mention"
              type="checkbox"
              checked={mention}
              onChange={(e) => setMention(e.target.checked)}
              aria-invalid={errs.mention ? "true" : undefined}
              aria-describedby={desc("mention")}
            />
            <span>Prise de connaissance de la mention d&apos;information relative au traitement des données.&nbsp;*</span>
          </label>
          {errs.mention && <p className={styles.err} id="e-mention">{errs.mention}</p>}
        </div>

        {status === "error" && (
          <p className={styles.fail} ref={failRef} role="alert" tabIndex={-1}>
            {failMsg}
          </p>
        )}

        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : "Envoyer la candidature →"}
        </button>

        <p className={styles.mention} id="mention-information">
          Les données recueillies sont traitées par Lazarègue Avocats, 18 rue de Tilsitt, 75017 Paris, pour la
          gestion des candidatures, sur le fondement de mesures précontractuelles prises à la demande du candidat
          (art. 6.1.b du RGPD). Elles sont destinées aux seuls membres du cabinet chargés du recrutement et
          conservées six mois. Le candidat dispose
          d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition,
          qu&apos;il exerce à l&apos;adresse{" "}
          <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>, ainsi que du droit
          d&apos;introduire une réclamation auprès de la CNIL.
        </p>
      </form>
    </div>
  );
}
