"use client";

import { useRef, useState } from "react";

/**
 * Formulaire « Faire le point sur le litige ».
 *
 * Branché sur le circuit de contact existant du site : un lien `mailto:` qui
 * ouvre le logiciel de messagerie du visiteur avec un message pré-rempli
 * (même point d'entrée et même traitement que /contact — aucun serveur, rien
 * n'est stocké ni transmis par le site).
 *
 * Deux conséquences de ce choix, comme sur /contact :
 *  · aucun dépôt de pièces (une pièce jointe ne peut pas transiter par un
 *    mailto — le visiteur l'ajoute lui-même après le premier échange) ;
 *  · la confirmation indique que la messagerie s'est ouverte.
 *
 * Champs obligatoires : nom, e-mail, description. Les autres portent la mention
 * « (facultatif) ». Erreurs affichées près des champs, saisie conservée, résumé
 * d'erreurs en tête (role="alert") et confirmation explicite après envoi.
 */

const DESTINATAIRE = "contact@lazaregue-avocats.fr";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const POSITIONS = [
  "Entreprise cliente — projet ou solution en difficulté",
  "Entreprise cliente — rupture, données ou réversibilité",
  "Prestataire informatique mis en cause",
  "Procédure ou expertise déjà engagée",
  "Autre situation",
];

type Champs = {
  nom: string;
  entreprise: string;
  email: string;
  tel: string;
  position: string;
  description: string;
  echeance: string;
};

type ClefObligatoire = "nom" | "email" | "description";
type Erreurs = Partial<Record<ClefObligatoire, string>>;

const VIDE: Champs = {
  nom: "",
  entreprise: "",
  email: "",
  tel: "",
  position: "",
  description: "",
  echeance: "",
};

const MESSAGES: Record<ClefObligatoire, string> = {
  nom: "Indiquez le nom à utiliser pour vous répondre.",
  email: "Saisissez une adresse e-mail valide, par exemple nom@societe.fr.",
  description: "Décrivez brièvement la situation rencontrée.",
};

export default function ContactForm() {
  const [champs, setChamps] = useState<Champs>(VIDE);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoye, setEnvoye] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const succesRef = useRef<HTMLDivElement>(null);

  const set =
    (k: keyof Champs) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setChamps((c) => ({ ...c, [k]: e.target.value }));
      if (k === "nom" || k === "email" || k === "description") {
        setErreurs((err) => ({ ...err, [k]: undefined }));
      }
    };

  const valider = (): Erreurs => {
    const err: Erreurs = {};
    if (!champs.nom.trim()) err.nom = MESSAGES.nom;
    if (!champs.email.trim() || !EMAIL_RE.test(champs.email.trim()))
      err.email = MESSAGES.email;
    if (!champs.description.trim()) err.description = MESSAGES.description;
    return err;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = valider();
    setErreurs(err);
    if (Object.keys(err).length > 0) {
      resumeRef.current?.focus();
      return;
    }

    const lignes: string[] = [champs.description.trim(), "", "—", champs.nom.trim()];
    if (champs.entreprise.trim()) lignes.push(`Entreprise : ${champs.entreprise.trim()}`);
    lignes.push(champs.email.trim());
    if (champs.tel.trim()) lignes.push(`Téléphone : ${champs.tel.trim()}`);
    if (champs.position) lignes.push(`Position dans le litige : ${champs.position}`);
    if (champs.echeance.trim()) lignes.push(`Échéance connue : ${champs.echeance.trim()}`);

    const sujet = `Contentieux informatique — demande de ${champs.nom.trim()}`;
    window.location.href = `mailto:${DESTINATAIRE}?subject=${encodeURIComponent(
      sujet,
    )}&body=${encodeURIComponent(lignes.join("\n"))}`;
    setEnvoye(true);
    // le focus part sur la confirmation à l'affichage suivant
    setTimeout(() => succesRef.current?.focus(), 0);
  };

  const listeErreurs = (Object.keys(erreurs) as ClefObligatoire[]).filter(
    (k) => erreurs[k],
  );

  if (envoye) {
    return (
      <div className="success" role="status" tabIndex={-1} ref={succesRef}>
        <h3>Votre demande a été transmise</h3>
        <p>
          Votre messagerie s’est ouverte avec le message pré-rempli : il ne
          reste qu’à l’envoyer. Le cabinet revient ensuite vers vous pour un
          premier échange. Si une échéance approche, vous pouvez appeler le
          01 81 70 62 00.
        </p>
        <button
          className="btn btn-sec"
          type="button"
          onClick={() => setEnvoye(false)}
        >
          Revenir au formulaire
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h3 id="form-title">Faire le point sur le litige</h3>
      <p className="form-intro">
        Le dépôt de pièces n’est pas nécessaire pour prendre contact. Vous
        pourrez nous transmettre les documents utiles après un premier échange.
      </p>

      {listeErreurs.length > 0 ? (
        <div className="form-errors" role="alert" tabIndex={-1} ref={resumeRef}>
          <strong>Votre demande n’a pas pu être transmise.</strong>
          <ul>
            {listeErreurs.map((k) => (
              <li key={k}>{erreurs[k]}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="row2">
        <div className={`field${erreurs.nom ? " invalid" : ""}`}>
          <label htmlFor="nom">Nom et prénom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            autoComplete="name"
            value={champs.nom}
            onChange={set("nom")}
            aria-invalid={erreurs.nom ? true : undefined}
            aria-describedby={erreurs.nom ? "nom-err" : undefined}
          />
          {erreurs.nom ? (
            <p className="err" id="nom-err">
              {erreurs.nom}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="entreprise">
            Entreprise <span className="opt">(facultatif)</span>
          </label>
          <input
            type="text"
            id="entreprise"
            name="entreprise"
            autoComplete="organization"
            value={champs.entreprise}
            onChange={set("entreprise")}
          />
        </div>
      </div>

      <div className="row2">
        <div className={`field${erreurs.email ? " invalid" : ""}`}>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={champs.email}
            onChange={set("email")}
            aria-invalid={erreurs.email ? true : undefined}
            aria-describedby={erreurs.email ? "email-err" : undefined}
          />
          {erreurs.email ? (
            <p className="err" id="email-err">
              {erreurs.email}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="tel">
            Téléphone <span className="opt">(facultatif)</span>
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            autoComplete="tel"
            value={champs.tel}
            onChange={set("tel")}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="position">
          Votre position dans le litige <span className="opt">(facultatif)</span>
        </label>
        <select
          id="position"
          name="position"
          value={champs.position}
          onChange={set("position")}
        >
          <option value="">Sélectionner si vous le souhaitez</option>
          {POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className={`field${erreurs.description ? " invalid" : ""}`}>
        <label htmlFor="description">Décrivez brièvement la situation</label>
        <textarea
          id="description"
          name="description"
          value={champs.description}
          onChange={set("description")}
          aria-invalid={erreurs.description ? true : undefined}
          aria-describedby={`description-hint${
            erreurs.description ? " description-err" : ""
          }`}
        />
        <p className="hint" id="description-hint">
          Indiquez notamment la nature du projet, la difficulté rencontrée et
          les éventuelles échéances en cours. Quelques lignes suffisent.
        </p>
        {erreurs.description ? (
          <p className="err" id="description-err">
            {erreurs.description}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="echeance">
          Échéance prochaine connue <span className="opt">(facultatif)</span>
        </label>
        <input
          type="text"
          id="echeance"
          name="echeance"
          value={champs.echeance}
          onChange={set("echeance")}
          aria-describedby="echeance-hint"
        />
        <p className="hint" id="echeance-hint">
          Audience, réunion d’expertise, fin de préavis, date limite de réponse.
        </p>
      </div>

      <button type="submit" className="btn btn-block">
        Transmettre ma demande
      </button>
      <p className="legal">
        Les informations transmises sont utilisées pour l’examen de votre
        demande. Un premier échange ne crée pas de mission : celle-ci résulte
        d’une convention d’honoraires écrite.
      </p>
    </form>
  );
}
