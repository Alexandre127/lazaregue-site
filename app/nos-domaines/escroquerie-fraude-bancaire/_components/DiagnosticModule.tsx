"use client";

import { useEffect, useState } from "react";
import styles from "../escroquerie.module.css";
import { fr } from "@/lib/typo";

/* Fondements — textes juridiques repris VERBATIM de la maquette (source de
   vérité). Aucune reformulation. `clock` : true = décompte de forclusion,
   "cond" = décompte avec légende conditionnelle, false = pas de décompte
   (jours écoulés). */
type Clock = true | false | "cond";
type Fond = { head: string; body: string; visas: string[]; clock: Clock };

const FOND: Record<"A" | "B" | "C", Fond> = {
  A: {
    head: "Opération non autorisée",
    body:
      "Le remboursement est de principe : il intervient au plus tard à la fin du premier jour ouvrable suivant la notification, sauf raisons de soupçonner une fraude de l'utilisateur communiquées par écrit à la Banque de France. Il incombe à l'établissement de prouver que l'opération a été authentifiée et régulièrement enregistrée — et l'usage de l'instrument de paiement ne suffit pas à établir qu'elle était autorisée.",
    visas: [
      "à titre principal — art. L. 133-18 CMF",
      "charge de la preuve — art. L. 133-23 CMF",
      "régime aménageable pour les non-consommateurs",
    ],
    clock: true,
  },
  B: {
    head: "Consentement à qualifier avant tout",
    body:
      "Lorsque la validation a été présentée comme le blocage d'une fraude ou une mise en sécurité du compte, il faut déterminer si le consentement a porté sur le paiement réellement exécuté. Selon le contenu des écrans, des messages et des informations affichées au moment de la validation, l'opération peut être contestée comme non autorisée. À défaut, la responsabilité de l'établissement se recherche sur le devoir de vigilance.",
    visas: [
      "à examiner — art. L. 133-6, L. 133-7 et L. 133-18 CMF",
      "à défaut — devoir de vigilance",
    ],
    clock: "cond",
  },
  C: {
    head: "Opération autorisée, mobile vicié",
    body:
      "Le consentement à l'opération existe. Le recours se déplace sur le devoir de vigilance et sur son tempérament, l'anomalie apparente : montant étranger au fonctionnement du compte, bénéficiaire nouvellement enregistré, rupture d'un placement, ordres fractionnés. D'autres délais que celui de la contestation des opérations non autorisées s'appliquent alors, et ils doivent être vérifiés au cas par cas.",
    visas: [
      "devoir de vigilance · anomalie apparente",
      "art. 1231-1 et 1240 C. civ.",
    ],
    clock: false,
  },
};

/** Ajoute n mois en bornant le quantième au dernier jour du mois d'arrivée
 *  (évite le débordement de setMonth : 31 janv. + 1 mois → 28/29 févr.). */
function addMonths(d: Date, n: number): Date {
  const day = d.getDate();
  const r = new Date(d.getFullYear(), d.getMonth() + n, 1);
  r.setDate(Math.min(day, new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate()));
  return r;
}

const ORDRES: { v: "A" | "B" | "C"; label: string }[] = [
  { v: "A", label: "Vous n'avez rien validé" },
  { v: "B", label: "Vous avez validé, mais on vous a dit que c'était pour bloquer une fraude" },
  { v: "C", label: "Vous avez voulu ce virement, vers un bénéficiaire cru légitime" },
];
const BANQUES: { v: string; label: string }[] = [
  { v: "refus", label: "Refus opposé" },
  { v: "attente", label: "Sans réponse" },
  { v: "rien", label: "Pas encore contesté" },
];

export default function DiagnosticModule() {
  // useState uniquement — aucune persistance (données de situation personnelle).
  const [date, setDate] = useState<string>("");
  const [ordre, setOrdre] = useState<"A" | "B" | "C" | null>(null);
  const [banque, setBanque] = useState<string | null>(null);
  // Borne haute du champ = aujourd'hui (une date de débit future n'a pas de
  // sens). Posée après montage pour éviter un écart d'hydratation SSR/client.
  const [maxDate, setMaxDate] = useState<string>("");
  useEffect(() => {
    const t = new Date();
    setMaxDate(
      `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`,
    );
  }, []);

  const hasDate = Boolean(date);
  let num = "—";
  let unit = "jours avant forclusion";
  let warn = false;
  let head = "";
  let body = "";
  let visas: string[] = [];

  if (hasDate) {
    const parts = date.split("-");
    const d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    const t = new Date();
    const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    const days = Math.round((addMonths(d, 13).getTime() - today.getTime()) / 86400000);
    const elapsed = Math.round((today.getTime() - d.getTime()) / 86400000);

    const f = ordre ? FOND[ordre] : null;

    if (f && f.clock === false) {
      num = String(elapsed > 0 ? elapsed : 0);
      unit = "jours écoulés depuis le débit — le délai de treize mois n'est pas celui qui s'applique ici";
    } else if (days > 0) {
      num = String(days);
      if (days <= 60) warn = true;
      if (f && f.clock === "cond") {
        unit = days <= 60
          ? "jours — échéance rapprochée si l'opération est contestée comme non autorisée"
          : "jours — si l'opération est contestée comme non autorisée";
      } else {
        unit = days <= 60 ? "jours — échéance rapprochée" : "jours avant forclusion";
      }
    } else {
      num = "0";
      warn = true;
      unit = "délai de contestation des opérations non autorisées expiré";
    }

    if (f) {
      head = f.head;
      body = f.body;
      visas = [...f.visas];
    } else {
      head = "Fondement à déterminer";
      body = "Indiquez comment l'ordre de paiement a été passé pour voir le fondement applicable.";
      visas = [];
    }

    if (days <= 0 && f && f.clock !== false) {
      body = "Le délai de l'article L. 133-24 est expiré : la contestation par la voie des opérations non autorisées n'est plus ouverte. Restent l'action fondée sur la vigilance, celle contre la banque du bénéficiaire et l'action pénale, qui obéissent à d'autres délais.";
      visas = ["devoir de vigilance · art. 1240 C. civ.", "art. 313-1 C. pén."];
    }
    if (banque === "refus" && f) {
      visas = [...visas, "le refus écrit est une pièce du dossier, pas un terme"];
    }
  }

  return (
    <section className={`${styles.diag}`} id="diagnostic">
      <div className={`${styles.wrap} ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.lbl}>qualification en trois questions</span>
          <h2>{fr("Reste-t-il un recours ?")}</h2>
          <p className={styles.lede}>
            {fr("Deux éléments décident du fondement applicable : la date du débit et la nature de l'ordre. La troisième question sert au calendrier de l'action.")}
          </p>

          <div className={styles.qblock}>
            <span className={styles.qt}>01 — date du débit contesté</span>
            <div className={styles.dateline}>
              <input
                type="date"
                aria-label="Date du débit contesté"
                max={maxDate || undefined}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.qblock}>
            <span className={styles.qt}>02 — l'ordre de paiement</span>
            <div className={styles.opts} role="group" aria-label="Nature de l'ordre">
              {ORDRES.map((o) => (
                <button
                  key={o.v}
                  className={styles.opt}
                  type="button"
                  aria-pressed={ordre === o.v}
                  onClick={() => setOrdre(o.v)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.qblock}>
            <span className={styles.qt}>03 — position de l'établissement</span>
            <div className={styles.opts} role="group" aria-label="Réponse de la banque">
              {BANQUES.map((b) => (
                <button
                  key={b.v}
                  className={styles.opt}
                  type="button"
                  aria-pressed={banque === b.v}
                  onClick={() => setBanque(b.v)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.right} ${styles.verdict}`} aria-live="polite">
          <p className={styles.idle} hidden={hasDate}>
            Le délai de contestation est un délai de forclusion de treize mois à compter du débit. Renseignez la date pour voir ce qu'il en reste.
          </p>
          <div hidden={!hasDate}>
            <div className={`${styles.count}${warn ? " " + styles.warn : ""}`}>{num}</div>
            <span className={styles.unit}>{unit}</span>
            <p className={styles.head}>{head}</p>
            <p>{body}</p>
            <p className={styles.visas}>
              {visas.map((v, i) => (
                <span key={v}>
                  {v}
                  {i < visas.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <a className={styles.go} href="#contact">décrire la situation</a>
          </div>
          <p className={styles.disclaim}>
            Indication de principe, sans valeur de consultation. Le délai de treize mois de l'article L. 133-24 du code monétaire et financier vise la contestation des opérations non autorisées ou mal exécutées. Il ne s'applique pas à toute action en responsabilité contre un établissement, et le régime peut être aménagé par contrat pour les clients non consommateurs.
          </p>
        </div>
      </div>
    </section>
  );
}
