"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./diagnostic-shadow-ai.module.css";
import { track } from "@/lib/analytics";
import { fr } from "@/lib/typo";
import {
  AXES,
  CALENDRIER,
  EVENEMENTS,
  KIT,
  LIBELLES_REPONSES,
  NIVEAUX,
  NOMBRES,
  QUESTIONS,
  SANCTIONS,
  TEXTES,
  type Reponse,
} from "../../data/diagnostic-shadow-ai";
import { SCORE_MAX, enVigueur, evaluer, type Reponses } from "./calcul";

/**
 * Autodiagnostic Shadow AI — maquette v2 du 14.10.2026, dans la charte du site.
 *
 * Une seule page, cinq écrans, état tenu en mémoire côté client :
 *  1. présentation (navy) ; 2. dix questions, une par écran ;
 *  3. résultat (navy), 4. chantiers (blanc) et 5. calendrier + rendez-vous
 *  (navy), ces trois derniers à la suite sur le même écran de résultat.
 *
 * Aucune réponse n'est envoyée, stockée ni mise en cookie. Trois événements de
 * mesure seulement (début, fin avec le niveau, clic « Échanger avec un avocat »).
 * Tous les textes, le barème et les statuts : data/diagnostic-shadow-ai.ts.
 */

type Ecran = { nom: "presentation" } | { nom: "question"; i: number } | { nom: "resultat" };

const deux = (n: number) => String(n).padStart(2, "0");
const enLettres = (n: number) => NOMBRES[n] ?? String(n);

/** Remplace `{n}` par le nombre en lettres ; « {n} chantiers » est mis en gras. */
function avecNombre(texte: string, n: number) {
  const [avant, apres] = fr(texte).split("{n}");
  if (apres === undefined) return avant;
  const m = /^(\s*chantiers)/.exec(apres);
  return (
    <>
      {avant}
      <strong>
        {enLettres(n)}
        {m ? m[1] : ""}
      </strong>
      {m ? apres.slice(m[1].length) : apres}
    </>
  );
}

export default function DiagnosticShadowAI() {
  const [ecran, setEcran] = useState<Ecran>({ nom: "presentation" });
  const [rep, setRep] = useState<Reponses>({});
  const titreRef = useRef<HTMLHeadingElement>(null);
  const premier = useRef(true);

  /* Changement d'écran : retour en haut et focus sur le titre (lecteurs d'écran, clavier). */
  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    titreRef.current?.focus({ preventScroll: true });
  }, [ecran]);

  const commencer = () => {
    track(EVENEMENTS.debut);
    setEcran({ nom: "question", i: 0 });
  };
  const quitter = () => {
    setRep({});
    setEcran({ nom: "presentation" });
  };

  if (ecran.nom === "presentation") return <Presentation titreRef={titreRef} commencer={commencer} />;

  if (ecran.nom === "question") {
    const i = ecran.i;
    const q = QUESTIONS[i];
    const axe = AXES.find((a) => a.id === q.axe)!;
    const choix = rep[q.id];
    const suivant = () => {
      if (!choix) return;
      if (i < QUESTIONS.length - 1) return setEcran({ nom: "question", i: i + 1 });
      track(EVENEMENTS.fin, { niveau: evaluer(rep).niveau });
      setEcran({ nom: "resultat" });
    };
    const retour = () => setEcran(i === 0 ? { nom: "presentation" } : { nom: "question", i: i - 1 });
    const t = TEXTES.question;

    return (
      <section className={styles.qEcran} aria-labelledby="dsa-question">
        <h1 className="sr-only">{fr(TEXTES.presentation.titre)}</h1>
        <div
          className={styles.progres}
          role="progressbar"
          aria-label="Progression du diagnostic"
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={i + 1}
        >
          <i style={{ width: `${((i + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <div className={styles.col}>
          <div className={styles.qBarre}>
            <span className={styles.qCompteur}>
              {t.compteur} {deux(i + 1)} / {deux(QUESTIONS.length)}
            </span>
            <button type="button" className={styles.quitter} onClick={quitter}>
              {t.quitter}
            </button>
          </div>
          <p className={styles.badgeAxe}>
            {t.axe} {axe.numero} · {axe.badge}
          </p>
          <h2 className={styles.qTitre} id="dsa-question" ref={titreRef} tabIndex={-1}>
            {fr(q.intitule)}
          </h2>
          {q.aide && (
            <p className={styles.aide} id="dsa-aide">
              {fr(q.aide)}
            </p>
          )}
          <fieldset className={styles.options} aria-labelledby="dsa-question" aria-describedby={q.aide ? "dsa-aide" : undefined}>
            {LIBELLES_REPONSES.map((o) => (
              <label key={o.valeur} className={styles.option} data-choisi={choix === o.valeur || undefined}>
                <input
                  type="radio"
                  name={q.id}
                  value={o.valeur}
                  checked={choix === o.valeur}
                  onChange={() => setRep((r) => ({ ...r, [q.id]: o.valeur as Reponse }))}
                />
                <span className={styles.rond} aria-hidden="true" />
                <span>{o.libelle}</span>
              </label>
            ))}
          </fieldset>
          {/* `key` : le bloc se rouvre (ouvert par défaut) à chaque question. */}
          <details key={q.id} className={styles.pourquoi} open>
            <summary>{t.pourquoi}</summary>
            <p>{fr(q.pourquoi)}</p>
          </details>
        </div>
        <div className={styles.qNav}>
          <div className={styles.qNavIn}>
            <button type="button" className="btn btn-line" onClick={retour}>
              {t.retour}
            </button>
            <button type="button" className="btn btn-primary" onClick={suivant} disabled={!choix}>
              {t.suivant}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return <ResultatEcran rep={rep} titreRef={titreRef} />;
}

/* ================================================================ écran 1 */

function Presentation({ titreRef, commencer }: { titreRef: React.Ref<HTMLHeadingElement>; commencer: () => void }) {
  const t = TEXTES.presentation;
  return (
    <section className={styles.navy} aria-labelledby="dsa-titre">
      <div className={`${styles.col} ${styles.intro}`}>
        <nav className={styles.label} aria-label="Fil d’Ariane">
          <Link href="/ressources">ressources</Link> <span aria-hidden="true">·</span>{" "}
          <Link href="/outils">outils</Link> <span aria-hidden="true">·</span> <span>{fr(t.label)}</span>
        </nav>
        <h1 className={styles.titre} id="dsa-titre" ref={titreRef} tabIndex={-1}>
          {fr(t.titre)}
        </h1>
        <p className={styles.chapo}>{fr(t.texte)}</p>
        <ul className={styles.reperes}>
          {t.reperes.map((r) => (
            <li key={r.libelle}>
              <span className={styles.repereValeur}>{r.valeur}</span>
              <span className={styles.repereLibelle}>{r.libelle}</span>
            </li>
          ))}
        </ul>
        <h2 className={styles.label}>{t.titreAxes}</h2>
        <ol className={styles.axes}>
          {AXES.map((a) => (
            <li key={a.id}>
              <span className={styles.axeNum}>{a.numero}</span>
              <span>{fr(a.libelle)}</span>
            </li>
          ))}
        </ol>
        <button type="button" className={`btn btn-primary ${styles.cta}`} onClick={commencer}>
          {t.bouton}
        </button>
        <p className={styles.mention}>{fr(t.mention)}</p>
      </div>
    </section>
  );
}

/* ====================================================== écrans 3, 4 et 5 */

function ResultatEcran({ rep, titreRef }: { rep: Reponses; titreRef: React.Ref<HTMLHeadingElement> }) {
  const res = evaluer(rep);
  const n = res.chantiers.length;
  const tr = TEXTES.resultat;
  const tc = TEXTES.chantiers;
  const tv = TEXTES.rendezVous;
  const aujourdhui = new Date();

  return (
    <>
      {/* ------------------------------------------------------- 3. résultat */}
      <section className={styles.navy} aria-labelledby="dsa-niveau">
        <div className={`${styles.col} ${styles.bloc}`}>
          <p className={styles.label}>{tr.label}</p>
          <h1 className={styles.titre} id="dsa-niveau" ref={titreRef} tabIndex={-1}>
            {res.titre}
          </h1>
          <div className={styles.jauge} style={{ "--segments": SCORE_MAX } as React.CSSProperties} aria-hidden="true">
            {Array.from({ length: SCORE_MAX }, (_, k) => (
              <i key={k} data-plein={k < res.score || undefined} />
            ))}
          </div>
          <p className={styles.reperesJauge}>
            {NIVEAUX.map((nv, k) => {
              const actif = nv.id === res.niveau;
              const dernier = k === NIVEAUX.length - 1;
              return (
                <span
                  key={nv.id}
                  data-actif={actif || undefined}
                  data-dernier={dernier || undefined}
                  style={dernier ? undefined : { left: `${(nv.min / SCORE_MAX) * 100}%` }}
                >
                  {nv.repere}
                  {actif && (
                    <>
                      {" · "}
                      {res.score}/{SCORE_MAX}
                    </>
                  )}
                </span>
              );
            })}
          </p>
          <p className="sr-only">
            Score : {res.score} sur {SCORE_MAX}.
          </p>
          <p className={styles.synthese}>{avecNombre(res.synthese, n)}</p>

          <h2 className={styles.label}>{tr.titreKit}</h2>
          <div className={`${styles.jauge} ${styles.jaugeKit}`} style={{ "--segments": n } as React.CSSProperties} aria-hidden="true">
            {Array.from({ length: n }, (_, k) => (
              <i key={k} data-plein={k < KIT.couverts || undefined} />
            ))}
          </div>
          <p className={styles.legendeKit}>
            <span>{tr.legendeKit.replace("{c}", String(KIT.couverts)).replace("{t}", String(n))}</span>
            <span>{KIT.legende}</span>
          </p>
          <p className={styles.texte}>{fr(tr.texteKit)}</p>
          <a className={`btn btn-white ${styles.cta}`} href="#chantiers">
            {tr.bouton.replace("{n}", enLettres(n)).replace(" ↓", "")} <span aria-hidden="true">&nbsp;↓</span>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------ 4. chantiers */}
      <section className={styles.blanc} id="chantiers" aria-labelledby="dsa-chantiers">
        <div className={`${styles.col} ${styles.bloc}`}>
          <p className={styles.label}>{tc.label}</p>
          <h2 className={styles.h2} id="dsa-chantiers">
            {fr(tc.titre)}
          </h2>
          <ul className={styles.chantiers}>
            {res.chantiers.map((c) => (
              <li key={c.id}>
                <div>
                  <p className={styles.chIntitule}>{fr(c.intitule)}</p>
                  <p className={styles.chRef}>{fr(c.reference)}</p>
                </div>
                <span className={styles.statut} data-style={c.style}>
                  {c.statut}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.collant}>
          <div className={styles.col}>
            <a className={`btn btn-primary ${styles.cta}`} href="#rendez-vous">
              {tc.bouton}
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------- 5. calendrier et rendez-vous */}
      <section className={styles.navy} id="rendez-vous" aria-labelledby="dsa-rdv">
        <div className={`${styles.col} ${styles.bloc}`}>
          <h2 className={styles.label}>{tv.labelCalendrier}</h2>
          <ol className={styles.frise}>
            {CALENDRIER.map((e) => (
              <li key={e.date}>
                <p className={styles.friseDate}>
                  <time dateTime={e.date}>{e.libelle}</time>
                  {enVigueur(e.date, aujourdhui) && <span className={styles.vigueur}>{tv.enVigueur}</span>}
                </p>
                <p>{fr(e.texte)}</p>
              </li>
            ))}
          </ol>

          <h2 className={styles.label}>{tv.labelSanctions}</h2>
          <ul className={styles.sanctions}>
            {SANCTIONS.map((s) => (
              <li key={s.montant}>
                <span className={styles.montant}>{s.montant}</span>
                <span>{fr(s.texte)}</span>
              </li>
            ))}
          </ul>

          <div className={styles.carte}>
            <h2 className={styles.carteTitre} id="dsa-rdv">
              {fr(tv.titre)}
            </h2>
            <p>{fr(tv.texte)}</p>
            <Link className={`btn btn-primary ${styles.cta}`} href={tv.lienBouton} onClick={() => track(EVENEMENTS.rendezVous)}>
              {tv.bouton}
            </Link>
            <p className={styles.tel}>
              {tv.telephone.avant} <a href={tv.telephone.href}>{fr(tv.telephone.affiche)}</a>
            </p>
          </div>

          <p className={styles.seul}>
            {fr(tv.seul.avant)} <Link href={tv.seul.href}>{tv.seul.lien}</Link>
          </p>
          <p className={styles.mention}>{fr(tv.mention)}</p>
        </div>
      </section>
    </>
  );
}
