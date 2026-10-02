"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "../contact.module.css";
import { track } from "@/lib/analytics";

/** Lit la page courante et les paramètres de campagne (UTM) de l'URL.
 *  Aucune donnée personnelle : seulement le chemin et les UTM éventuels. */
function contexteEnvoi(): { page: string; utm: Record<string, string> } {
  if (typeof window === "undefined") return { page: "", utm: {} };
  const page = window.location.pathname;
  const q = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ["source", "medium", "campaign", "term", "content"] as const) {
    const v = q.get(`utm_${k}`);
    if (v) utm[k] = v;
  }
  return { page, utm };
}

/**
 * Formulaire de contact — envoi RÉEL côté serveur (POST /api/contact, SMTP du
 * cabinet). Remplace l'ancien envoi par la messagerie du visiteur.
 *
 * Principes UX de l'audit du 21.09.2026 :
 *  · validation à l'ENVOI, pas pendant la saisie ;
 *  · récapitulatif d'erreurs en haut, liens vers les champs, focus sur le récap ;
 *  · la saisie n'est JAMAIS perdue (état React conservé en cas d'erreur ou d'échec) ;
 *  · écran de confirmation avec focus ;
 *  · anti-spam discret : champ piège « website » + limitation côté serveur.
 */

const OBJETS = [
  "RGPD et données personnelles",
  "Intelligence artificielle et AI Act",
  "Cybersécurité et NIS 2",
  "Contrats informatiques",
  "Fusions-acquisitions technologiques",
  "Crypto-actifs et blockchain",
  "Contentieux informatique et commercial",
  "Cyberattaques et cybercriminalité",
  "Fraude bancaire et escroquerie en ligne",
  "Diffamation et retrait de contenus",
  "Autre demande",
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX = 2000;

type Errs = { objet?: boolean; urgence?: boolean; nom?: boolean; email?: boolean; message?: boolean };

export default function ContactForm({ onSent }: { onSent?: () => void }) {
  const [objet, setObjet] = useState("");
  const [urgence, setUrgence] = useState("");
  const [echeance, setEcheance] = useState("");
  const [nom, setNom] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // piège

  const [errs, setErrs] = useState<Errs>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [failMsg, setFailMsg] = useState("");

  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const failRef = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  const urgent = urgence === "echeance" || urgence === "incident";

  // Première interaction avec le formulaire : un seul événement, sans aucune
  // donnée saisie.
  function onFirstInteraction() {
    if (started.current) return;
    started.current = true;
    track("contact_start", { page_type: "contact", composant: "contact_form" });
  }

  function validate(): Errs {
    return {
      objet: !objet,
      urgence: !urgence,
      nom: !nom.trim(),
      email: !EMAIL_RE.test(email.trim()),
      message: message.trim().length < 10,
    };
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    const hasError = Object.values(next).some(Boolean);
    setErrs(next);
    if (hasError) {
      setShowSummary(true);
      // Erreur de validation : seuls les noms de champs manquants, jamais leur contenu.
      track("contact_error", { composant: "contact_form", motif: "validation" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus("sending");
    setFailMsg("");
    const { page, utm } = contexteEnvoi();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objet, urgence, echeance, nom, org, email, tel, message, website, page, utm }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("done");
        // Conversion : objet (liste fermée) et urgence (oui/non) uniquement.
        track("contact_submit", {
          composant: "contact_form",
          objet,
          urgent: urgence !== "non",
        });
        // Rattache l'historique de navigation de ce navigateur au contact dans
        // HubSpot. UNIQUEMENT si « Relation client » est accordé ; sinon rien.
        // identify (e-mail ↔ hubspotutk) → setPath vers une page de confirmation
        // VIRTUELLE (pas de vraie route, pas dans le sitemap) → trackPageView :
        // cela transmet l'identité et marque clairement l'envoi dans l'historique,
        // sans compter une 2e vue artificielle de /contact. L'upsert serveur, lui,
        // a lieu quel que soit le consentement.
        try {
          const w = window as unknown as {
            CookieConsent?: { acceptedCategory: (c: string) => boolean };
            _hsq?: unknown[];
          };
          if (w.CookieConsent?.acceptedCategory?.("crm")) {
            w._hsq = w._hsq || [];
            w._hsq.push(["identify", { email: email.trim().toLowerCase() }]);
            w._hsq.push(["setPath", "/contact/demande-envoyee"]);
            w._hsq.push(["trackPageView"]);
          }
        } catch {
          /* API HubSpot absente : rien à faire */
        }
        if (onSent) {
          onSent();
        } else {
          requestAnimationFrame(() => doneRef.current?.focus());
        }
      } else {
        setStatus("error");
        track("contact_error", { composant: "contact_form", motif: "serveur" });
        setFailMsg(json.error || "L'envoi a échoué. Réessayez, ou contactez le cabinet par téléphone ou e-mail.");
        requestAnimationFrame(() => failRef.current?.focus());
      }
    } catch {
      setStatus("error");
      track("contact_error", { composant: "contact_form", motif: "reseau" });
      setFailMsg("L'envoi a échoué (problème de connexion). Votre texte est conservé : réessayez, ou contactez le cabinet par téléphone ou e-mail.");
      requestAnimationFrame(() => failRef.current?.focus());
    }
  }

  if (status === "done") {
    return (
      <div className={styles.fcard}>
        <div className={styles.done} ref={doneRef} role="status" tabIndex={-1}>
          <h2>Votre demande a bien été transmise.</h2>
          <p className={styles.doneLead}>Un accusé de réception vous est adressé par e-mail. La suite :</p>
          <ol>
            <li>Un avocat du cabinet examine votre demande.</li>
            <li>Il vous recontacte pour préciser votre situation, votre objectif et son éventuel degré d&apos;urgence.</li>
            <li>Si une mission est nécessaire, vous recevez une proposition d&apos;intervention et une convention d&apos;honoraires.</li>
          </ol>
          <p className={styles.doneUrg}>
            Urgence&nbsp;? <a href="tel:+33181706200">01 81 70 62 00</a>
          </p>
        </div>
      </div>
    );
  }

  const errList: { anchor: string; label: string }[] = [];
  if (errs.objet) errList.push({ anchor: "objet", label: "Objet de la demande" });
  if (errs.urgence) errList.push({ anchor: "urg", label: "Urgence" });
  if (errs.nom) errList.push({ anchor: "nom", label: "Nom et prénom" });
  if (errs.email) errList.push({ anchor: "mail", label: "Adresse e-mail" });
  if (errs.message) errList.push({ anchor: "msg", label: "Description de la situation" });

  return (
    <div className={styles.fcard}>
      {/* data-clarity-mask : Microsoft Clarity n'enregistre JAMAIS le contenu
          saisi dans ce formulaire (masquage au niveau de l'élément, en plus du
          masquage « Strict » réglé dans le compte). */}
      <form
        onSubmit={onSubmit}
        onFocusCapture={onFirstInteraction}
        noValidate
        aria-labelledby="h-form"
        data-clarity-mask="true"
      >
        <h2 id="h-form">Décrivez votre situation</h2>
        <p className={styles.formIntro}>
          Quelques lignes suffisent. Ne joignez pas encore de document : le cabinet vous proposera un
          canal sécurisé si nécessaire.
        </p>
        <p className={styles.req}>Les champs marqués * sont obligatoires.</p>

        {showSummary && errList.length > 0 && (
          <div className={styles.sumerr} ref={summaryRef} role="alert" tabIndex={-1}>
            <strong>Certains champs sont à compléter :</strong>
            <ul>
              {errList.map((e) => (
                <li key={e.anchor}>
                  <a href={`#${e.anchor}`}>{e.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Champ piège anti-robots — masqué, hors flux, non focusable. */}
        <div aria-hidden className={styles.hp}>
          <label htmlFor="website">Ne pas remplir</label>
          <input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className={styles.fld}>
          <label htmlFor="objet">Quel est l&apos;objet principal de votre demande ?&nbsp;*</label>
          <select
            id="objet"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            aria-invalid={errs.objet ? "true" : undefined}
            aria-describedby={errs.objet ? "e-objet" : undefined}
          >
            <option value="">Sélectionnez un objet</option>
            {OBJETS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errs.objet && <p className={styles.err} id="e-objet">Sélectionnez l&apos;objet de votre demande.</p>}
        </div>

        <fieldset className={styles.fld} id="urg">
          <legend>Votre demande présente-t-elle une urgence particulière ?&nbsp;*</legend>
          <label className={styles.radio}>
            <input type="radio" name="u" value="non" checked={urgence === "non"} onChange={() => setUrgence("non")} />
            Non, il s&apos;agit d&apos;un projet ou d&apos;une demande de conseil
          </label>
          <label className={styles.radio}>
            <input type="radio" name="u" value="echeance" checked={urgence === "echeance"} onChange={() => setUrgence("echeance")} />
            Une échéance approche
          </label>
          <label className={styles.radio}>
            <input type="radio" name="u" value="incident" checked={urgence === "incident"} onChange={() => setUrgence("incident")} />
            Un incident ou un contentieux est déjà en cours
          </label>
          {errs.urgence && <p className={styles.err} id="e-u">Indiquez si votre demande est urgente.</p>}
        </fieldset>

        {urgent && (
          <div className={styles.fld} id="blk-date">
            <label htmlFor="date">
              Date de la prochaine échéance connue{" "}
              <span className={styles.opt}>(audience, réunion d&apos;expertise, fin de préavis, date limite de réponse)</span>
            </label>
            <input id="date" type="text" value={echeance} onChange={(e) => setEcheance(e.target.value)} placeholder="jj/mm/aaaa ou « dans 10 jours »" />
          </div>
        )}

        <div className={styles.row2}>
          <div className={styles.fld}>
            <label htmlFor="nom">Nom et prénom&nbsp;*</label>
            <input
              id="nom"
              type="text"
              autoComplete="name"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              aria-invalid={errs.nom ? "true" : undefined}
              aria-describedby={errs.nom ? "e-nom" : undefined}
            />
            {errs.nom && <p className={styles.err} id="e-nom">Indiquez votre nom.</p>}
          </div>
          <div className={styles.fld}>
            <label htmlFor="org">
              Entreprise ou organisation <span className={styles.opt}>facultatif</span>
            </label>
            <input id="org" type="text" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
          </div>
        </div>

        <div className={styles.row2}>
          <div className={styles.fld}>
            <label htmlFor="mail">Adresse e-mail&nbsp;*</label>
            <input
              id="mail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errs.email ? "true" : undefined}
              aria-describedby={errs.email ? "e-mail" : undefined}
            />
            {errs.email && <p className={styles.err} id="e-mail">Indiquez une adresse e-mail valide, par exemple nom@entreprise.fr.</p>}
          </div>
          <div className={styles.fld}>
            <label htmlFor="tel">
              Téléphone <span className={styles.opt}>{urgent ? "recommandé" : "facultatif"}</span>
            </label>
            <input id="tel" type="tel" autoComplete="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
          </div>
        </div>

        <div className={styles.fld}>
          <label htmlFor="msg">Décrivez brièvement votre situation&nbsp;*</label>
          <p className={styles.hint} id="h-msg">
            Ce qui s&apos;est produit, les acteurs concernés, les démarches déjà entreprises et les principales échéances.
          </p>
          <textarea
            id="msg"
            maxLength={MAX}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-describedby={errs.message ? "h-msg cnt e-msg" : "h-msg cnt"}
            aria-invalid={errs.message ? "true" : undefined}
          />
          <p className={styles.count} id="cnt" aria-live="polite">
            {message.length.toLocaleString("fr-FR")} / 2 000 caractères
          </p>
          {errs.message && <p className={styles.err} id="e-msg">Décrivez votre situation en quelques phrases.</p>}
        </div>

        <p className={styles.nodoc}>
          Aucune pièce n&apos;est demandée à ce stade. Si des documents sont utiles, le cabinet vous
          proposera un canal de transmission sécurisé.
        </p>

        <p className={styles.priv}>
          Les informations transmises sont utilisées pour examiner votre demande et vous recontacter.
          Pour en savoir plus sur leur traitement, consultez la{" "}
          <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </p>

        {status === "error" && (
          <p className={styles.fail} ref={failRef} role="alert" tabIndex={-1}>
            {failMsg} Téléphone&nbsp;: <a href="tel:+33181706200">01 81 70 62 00</a> · E-mail&nbsp;:{" "}
            <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
          </p>
        )}

        <button className={styles.submit} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
        </button>

        <p className={styles.formFoot}>
          L&apos;envoi du formulaire ne vaut pas acceptation du dossier ni création automatique d&apos;une relation avocat-client.
        </p>
      </form>
    </div>
  );
}
