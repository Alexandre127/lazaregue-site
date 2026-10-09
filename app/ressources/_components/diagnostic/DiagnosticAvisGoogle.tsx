"use client";

import { useMemo, useState } from "react";
import styles from "./diagnostic.module.css";
import { decisionsVisibles, DECISIONS } from "../../data/decisions-avis-google";
import { FORFAIT_AMIABLE } from "../../data/offre-avis-google";
import { QUESTIONS, evaluer, nombreDeReponses, type Reponses } from "./evaluer";

/**
 * Diagnostic « Votre avis Google peut-il être retiré ? » — portage du prototype
 * validé (docs/maquettes/diagnostic-avis-google.html) dans la charte du site.
 *
 * `variant="complet"` : questions + résultat, « Comment savoir si c'est un faux
 * avis ? », « Ce que jugent les tribunaux », les étapes, honoraires, formulaire.
 * `variant="court"` : questions + résultat + honoraires + formulaire (l'article
 * traite déjà les trois sections explicatives).
 * `theme` : "clair" (défaut) ou "sombre" (pose sur fond navy).
 * `montrerNonVerifiees` : calculé CÔTÉ SERVEUR par la page (false en
 * production) — voir data/decisions-avis-google.ts.
 *
 * Le niveau du résultat n'est jamais porté par la seule couleur : il est écrit
 * en toutes lettres (pastille + titre).
 */

const VIDE: Reponses = { vise: null, client: null, contenu: null, date: null, serie: null, signal: null };
const EXT = { target: "_blank", rel: "noopener" } as const;

type Etat = "saisie" | "envoi" | "envoye";

export default function DiagnosticAvisGoogle({
  variant,
  theme = "clair",
  montrerNonVerifiees = false,
}: {
  variant: "complet" | "court";
  theme?: "clair" | "sombre";
  montrerNonVerifiees?: boolean;
}) {
  const [rep, setRep] = useState<Reponses>(VIDE);
  const [dateSaisie, setDateSaisie] = useState("");
  const visibles = useMemo(() => decisionsVisibles(montrerNonVerifiees), [montrerNonVerifiees]);
  const n = nombreDeReponses(rep);
  const res = rep.contenu ? evaluer(rep, visibles) : null;

  const choisir = <K extends keyof Reponses>(cle: K, valeur: Reponses[K]) => setRep((r) => ({ ...r, [cle]: valeur }));

  /* ------------------------------ formulaire ------------------------------ */
  const [etat, setEtat] = useState<Etat>("saisie");
  const [erreur, setErreur] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const manque = [
      ["nom", "votre nom"],
      ["email", "votre adresse électronique"],
      ["url", "le lien vers l’avis"],
    ]
      .filter(([k]) => !v(k))
      .map(([, l]) => l);
    if (manque.length) return setErreur(`Il manque ${manque.join(", ")}.`);
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) return setErreur("L’adresse électronique ne semble pas valide.");
    if (!f.get("prix")) return setErreur("Cochez la case confirmant que vous avez pris connaissance des honoraires.");
    if (!f.get("rgpd")) return setErreur("Cochez la case d’accord pour que le cabinet puisse traiter votre demande.");
    setErreur("");
    setEtat("envoi");
    try {
      const r = await fetch("/api/avis-google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: v("nom"),
          org: v("org"),
          email: v("email"),
          tel: v("tel"),
          url: v("url"),
          message: v("message"),
          website: v("website"),
          prix: true,
          rgpd: true,
          page: window.location.pathname,
          reponses: { vise: rep.vise, client: rep.client, contenu: rep.contenu, date: dateSaisie || null, serie: rep.serie, signal: rep.signal },
        }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error || "");
      setEtat("envoye");
    } catch (err) {
      setEtat("saisie");
      setErreur((err instanceof Error && err.message) || "L’envoi a échoué. Réessayez, ou appelez le cabinet au 01 81 70 62 00.");
    }
  }

  /* --------------------------- listes de décisions ------------------------- */
  const liste = (favorable: boolean) => DECISIONS.filter((d) => d.liste && d.favorable === favorable && visibles.has(d.id));
  const obtenus = liste(true);
  const refuses = liste(false);
  const aVerifier = (verifie: boolean) => (verifie ? null : <span className={styles.aVerifier}>à vérifier</span>);

  return (
    <div className={styles.diag} data-theme={theme}>
      {/* ============================ questions + résultat =================== */}
      <div className={styles.grille}>
        <form className={styles.quiz} onSubmit={(e) => e.preventDefault()} noValidate>
          <Question cle="vise" rep={rep} choisir={choisir} />
          <Question cle="client" rep={rep} choisir={choisir} />
          <Question cle="contenu" rep={rep} choisir={choisir} />
          <fieldset>
            <legend><span className={styles.num}>04</span>Quand l’avis a-t-il été publié ?</legend>
            <p className={styles.aide}>La date apparaît sous l’avis. Une date approximative suffit.</p>
            <div className={styles.dateBox}>
              <input
                type="date"
                name="date"
                aria-label="Date de publication de l’avis"
                value={dateSaisie}
                onChange={(e) => {
                  setDateSaisie(e.target.value);
                  choisir("date", e.target.value ? new Date(`${e.target.value}T00:00:00`) : null);
                }}
              />
            </div>
          </fieldset>
          <Question cle="serie" rep={rep} choisir={choisir} />
          <Question cle="signal" rep={rep} choisir={choisir} />
        </form>

        <aside className={styles.verdict} aria-live="polite">
          <div className={styles.progres} aria-hidden="true"><i style={{ width: `${(n / 6) * 100}%` }} /></div>
          <div className={styles.vTete}>
            <span className={styles.pastille} data-niveau={res ? res.niveau : "attente"}>
              {res ? `${res.titre.toLowerCase()} · ${n} / 6` : `${n} / 6 réponses`}
            </span>
            <p className={styles.vTitre}>
              {res ? res.titre : n ? "Répondez à la question 03 pour obtenir une première orientation." : "Le résultat s’affiche ici au fil de vos réponses."}
            </p>
          </div>
          <div className={styles.vCorps}>
            {!res ? (
              <p className={styles.attenue}>
                Trois issues sont possibles : <b>retrait envisageable</b>, <b>à examiner</b> ou <b>retrait peu probable</b>. Chacune s’accompagne de la voie à suivre et des délais applicables.
              </p>
            ) : (
              <>
                {res.qualification ? (
                  <div><h3>qualification probable</h3><p>{res.qualification}</p></div>
                ) : null}
                {res.etapes.length ? (
                  <div><h3>voie recommandée</h3><ol>{res.etapes.map((s) => <li key={s}>{s}</li>)}</ol></div>
                ) : null}
                <div>
                  <h3>délais</h3>
                  {res.delais.length ? (
                    <div className={styles.dl}>
                      {res.delais.map((d) => (
                        <div key={d.libelle}>
                          <span>{d.libelle}</span>
                          <b className={d.alerte ? styles.tard : undefined}>{d.alerte ? <span className={styles.srOnly}>Attention : </span> : null}{d.valeur}</b>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.attenue}>Indiquez la date de publication (question 04) pour calculer vos délais.</p>
                  )}
                </div>
                {res.adr ? (
                  <div>
                    <h3>ADR Center, de quoi s’agit-il</h3>
                    <p>Un organisme indépendant de règlement des litiges, certifié par le régulateur italien des communications (AGCOM) en application de l’article 21 du DSA et compétent dans toute l’Union. Il réexamine le refus de Google au regard de ses propres règles et de la loi.</p>
                    <ul>
                      <li>Gratuit pour vous : les frais sont à la charge de Google.</li>
                      <li>Procédure en ligne, menée en français.</li>
                      <li>Recevable après une réclamation auprès de Google, dans les douze mois des faits, et en l’absence d’action en justice en cours.</li>
                      <li>Décision motivée sous 90 jours, prolongeables pour les dossiers complexes.</li>
                      <li>Décision non contraignante : Google doit participer de bonne foi, sans être obligé de l’appliquer.</li>
                    </ul>
                  </div>
                ) : null}
                <div>
                  <h3>honoraires du cabinet</h3>
                  {res.offre.length ? (
                    <>
                      <div className={styles.dl}>
                        {res.offre.map((o) => (
                          <div key={o.libelle}><span>{o.libelle}</span><b className={styles.prix}>{o.prix}<br /><small>{o.detail}</small></b></div>
                        ))}
                      </div>
                      <p className={styles.aide} style={{ marginTop: 8 }}>Un seul règlement, quel que soit le nombre d’étapes nécessaires jusqu’à la décision d’ADR Center. Forfait par avis, dû après validation du dossier par un avocat et signature de la convention d’honoraires.</p>
                    </>
                  ) : (
                    <p>Le cabinet ne vous recommande pas d’engager de frais pour cet avis.</p>
                  )}
                </div>
                {res.comparables.length ? (
                  <div>
                    <h3>décisions comparables</h3>
                    <ul className={styles.cmp}>
                      {res.comparables.map((d) => (
                        <li key={d.id} data-issue={d.favorable ? "obtenu" : "refuse"}>
                          <span className={styles.etiquette}>{d.favorable ? "obtenu" : "refusé"}</span>
                          <b>{d.ref}</b> {d.texte} {aVerifier(d.verifie)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {res.notes.length ? (
                  <div><h3>à savoir</h3><ul>{res.notes.map((s) => <li key={s}>{s}</li>)}</ul></div>
                ) : null}
                <p className={styles.renvoi}><a href="#diagnostic-contact">Faire examiner l’avis par un avocat</a>.</p>
              </>
            )}
          </div>
        </aside>
      </div>

      {variant === "complet" ? (
        <>
          {/* ============================ la preuve =========================== */}
          <section className={styles.bloc} aria-labelledby="diag-preuve">
            <div className={styles.blocTete}>
              <p className={styles.label}>faux avis · la preuve</p>
              <h2 id="diag-preuve">Comment savoir si c’est un faux avis ?</h2>
              <p className={styles.aide}>On ne le sait jamais avec certitude au départ. On réunit des indices ; la certitude vient de l’identification de l’auteur. Trois niveaux de preuve, selon l’interlocuteur.</p>
            </div>
            <ol className={styles.cartes}>
              <li>
                <span className={styles.niveauPreuve}>ce que vous vérifiez vous-même</span>
                <h3>Les indices</h3>
                <ul>
                  <li><b>Vos fichiers</b> : aucune trace de l’auteur, ni des faits décrits (facture, réservation, agenda, date, montant).</li>
                  <li><b>Le contenu</b> : aucun détail qu’un vrai client connaîtrait, ou des détails faux (service que vous ne proposez pas, jour de fermeture).</li>
                  <li><b>Le profil</b> : compte récent, un seul avis, cinq étoiles chez un concurrent, lieux sans rapport avec votre zone.</li>
                  <li><b>Le contexte</b> : plusieurs avis en peu de temps, juste après un licenciement, un litige ou l’ouverture d’un concurrent.</li>
                </ul>
              </li>
              <li>
                <span className={styles.niveauPreuve}>ce qui suffit devant google et adr center</span>
                <h3>La vraisemblance</h3>
                <p>Plusieurs indices concordants, présentés avec une attestation de recherche dans vos fichiers, rendent le faux avis vraisemblable. Le pseudonyme seul ne suffit pas : l’anonymat est licite.</p>
              </li>
              <li>
                <span className={styles.niveauPreuve}>ce qui prouve devant le juge</span>
                <h3>L’identification de l’auteur</h3>
                <p>
                  Le juge peut obliger Google, puis l’opérateur internet, à révéler qui a écrit l’avis.{" "}
                  {visibles.has("gre25") ? (
                    <>C’est ainsi qu’à Grenoble, l’auteure de faux avis contre une ophtalmologue s’est révélée être l’assistante maternelle de confrères concurrents. {aVerifier(false)} </>
                  ) : null}
                  Condition : un avis diffamatoire ou injurieux, et une action dans les trois mois de sa publication.
                </p>
              </li>
            </ol>
          </section>

          {/* ========================= ce que jugent les tribunaux ============ */}
          {obtenus.length || refuses.length ? (
            <section className={styles.bloc} aria-labelledby="diag-juris">
              <div className={styles.blocTete}>
                <p className={styles.label}>jurisprudence · cours d’appel et cour de cassation, 2018-2026</p>
                <h2 id="diag-juris">Ce que jugent les tribunaux</h2>
                <p className={styles.aide}>Le cabinet n’engage que les procédures que la jurisprudence soutient. Les juges distinguent nettement deux situations.</p>
              </div>
              <div className={styles.colonnes}>
                {obtenus.length ? (
                  <div className={styles.colonne} data-issue="obtenu">
                    <h3>Ce qui est retiré</h3>
                    <p>Les avis sans expérience réelle, les faux profils, les accusations d’illégalité ou de faute sans fondement, et les avis, même authentiques, qui divulguent des informations protégées.</p>
                    <ul>{obtenus.map((d) => <li key={d.id}><b>{d.court}</b> {d.liste} {aVerifier(d.verifie)}</li>)}</ul>
                  </div>
                ) : null}
                {refuses.length ? (
                  <div className={styles.colonne} data-issue="refuse">
                    <h3>Ce qui reste en ligne</h3>
                    <p>La critique d’un véritable client, même sévère, et l’action engagée trop tard.</p>
                    <ul>{refuses.map((d) => <li key={d.id}><b>{d.court}</b> {d.liste} {aVerifier(d.verifie)}</li>)}</ul>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* ================================ les étapes ====================== */}
          <section className={styles.bloc} id="diagnostic-etapes" aria-labelledby="diag-etapes">
            <div className={styles.blocTete}>
              <p className={styles.label}>procédure · règlement (ue) 2022/2065 sur les services numériques</p>
              <h2 id="diag-etapes">Les étapes, de la plus simple à la plus contraignante</h2>
              <p className={styles.aide}>Chaque étape ne s’ouvre qu’après l’échec de la précédente. La première peut être faite seul. Les étapes 2 à 4 sont couvertes par un forfait unique du cabinet ; l’étape 5 fait l’objet d’un devis.</p>
            </div>
            <ol className={`${styles.cartes} ${styles.etapes}`}>
              <li>
                <h3>Le signalement depuis la fiche</h3>
                <p>Le propriétaire de la fiche signale l’avis dans l’outil de gestion des avis, en choisissant un motif dans une liste (faux contenu, conflit d’intérêts, hors sujet…). Aucune argumentation n’est possible.</p>
                <dl>
                  <dt>Portée</dt><dd>Une simple alerte, traitée en grande partie de façon automatisée.</dd>
                  <dt>Délai</dt><dd>Examen en général en quelques jours, selon Google.</dd>
                  <dt>Lien</dt><dd><a href="https://support.google.com/business/workflow/9945796?hl=fr" {...EXT}>Outil de gestion des avis</a></dd>
                </dl>
              </li>
              <li>
                <h3>La notification motivée</h3>
                <p>Le formulaire de Google destiné aux contenus contraires à la loi. On y expose pourquoi l’avis est illicite (faux avis, dénigrement, diffamation, injure), on indique le fondement légal et on joint les pièces.</p>
                <dl>
                  <dt>Portée</dt><dd>Notification au sens de l’article 16 du DSA : Google est réputé connaître l’illicéité et doit rendre une décision motivée, avec les voies de recours.</dd>
                  <dt>Délai</dt><dd>Google doit statuer « dans les meilleurs délais » ; aucun délai chiffré.</dd>
                  <dt>Lien</dt><dd><a href="https://support.google.com/legal/troubleshooter/1114905?hl=fr" {...EXT}>Signaler un contenu pour des raisons juridiques</a></dd>
                </dl>
              </li>
              <li>
                <h3>La réclamation contre le refus</h3>
                <p>L’appel interne contre la décision de Google : depuis l’outil de gestion des avis (« Faire appel pour les avis éligibles ») ou par le lien figurant dans l’e-mail de décision. On y joint un élément nouveau, comme une attestation.</p>
                <dl>
                  <dt>Portée</dt><dd>Réexamen obligatoire, qui ne peut pas être purement automatisé (art. 20 DSA). Un seul appel par signalement.</dd>
                  <dt>Délai</dt><dd>Possible pendant au moins six mois après le refus ; à déposer sans attendre. Le statut passe à « Escaladé », la réponse arrive par e-mail.</dd>
                  <dt>Lien</dt><dd><a href="https://support.google.com/business/answer/4596773?hl=fr" {...EXT}>Faire appel d’une décision sur un avis</a></dd>
                </dl>
              </li>
              <li>
                <h3>La saisine d’ADR Center</h3>
                <p>Un organisme indépendant, certifié par le régulateur italien des communications (AGCOM) au titre de l’article 21 du DSA, compétent dans toute l’Union. Il réexamine le refus de Google au regard de ses propres règles et de la loi.</p>
                <dl>
                  <dt>Conditions</dt><dd>Avoir fait appel auprès de Google ; agir dans les douze mois des faits ; ne pas avoir saisi le juge sur le fond. Pour une entreprise, joindre la preuve du pouvoir de la représenter.</dd>
                  <dt>Pièces</dt><dd>Lien de l’avis et de la fiche, captures, date de l’appel et e-mail de réponse de Google, code de référence, description des faits.</dd>
                  <dt>Délai</dt><dd>Recevabilité en 10 jours, décision motivée en 90 jours (prolongeable).</dd>
                  <dt>Coût</dt><dd>Gratuit pour le demandeur ; les frais sont facturés à Google. Décision non contraignante.</dd>
                  <dt>Liens</dt><dd><a href="https://ods.adrcenter.com/fr/platform/google-maps.html" {...EXT}>ADR Center et Google Maps</a> · <a href="https://ods.adrcenter.com/fr/dispute/start" {...EXT}>Ouvrir un dossier</a></dd>
                </dl>
              </li>
              <li>
                <h3>Le juge</h3>
                <p>Il peut être saisi à tout moment, sans passer par les étapes précédentes, et ses décisions s’imposent à Google. Il peut ordonner le retrait de l’avis (art. 6-3 LCEN) et, si l’avis est diffamatoire ou injurieux, l’identification de son auteur.</p>
                <dl>
                  <dt>Délai</dt><dd>3 mois à compter de la publication pour la diffamation et l’injure ; 5 ans pour le dénigrement. Les adresses IP ne sont conservées qu’un an.</dd>
                  <dt>À savoir</dt><dd>Une action au fond rend la saisine d’ADR Center impossible : l’ordre des démarches compte.</dd>
                </dl>
              </li>
            </ol>
          </section>
        </>
      ) : null}

      {/* ========================== honoraires + formulaire ================== */}
      <section className={styles.contact} id="diagnostic-contact" aria-labelledby="diag-contact">
        <h2 id="diag-contact">Faire examiner votre avis par le cabinet</h2>
        <ol className={styles.pas}>
          <li><b>Votre demande</b>Vos réponses et le lien de l’avis parviennent au cabinet.</li>
          <li><b>Analyse sous 48 heures</b>Un avocat qualifie l’avis et vous dit si le dossier tient.</li>
          <li><b>Convention et règlement</b>Si le dossier tient, vous recevez la convention d’honoraires et le lien de paiement du forfait. Rien n’est dû avant.</li>
        </ol>
        <table className={styles.tarifs}>
          <caption className={styles.srOnly}>Honoraires</caption>
          <tbody>
            <tr><th scope="row">Analyse de l’avis sous 48 heures</th><td>gratuite</td></tr>
            <tr><th scope="row">Forfait procédure amiable : notification motivée, réclamation et saisine d’ADR Center</th><td>{FORFAIT_AMIABLE.ht} · {FORFAIT_AMIABLE.ttc}</td></tr>
            <tr><th scope="row">Action en justice : retrait ordonné à Google, identification de l’auteur, dommages et intérêts</th><td>sur devis</td></tr>
          </tbody>
        </table>
        <p className={styles.aide}>Le forfait se règle une seule fois et couvre toutes les étapes amiables nécessaires, jusqu’à la décision d’ADR Center. Forfait par avis.</p>

        {etat === "envoye" ? (
          <p className={styles.envoye} role="status"><b>Demande reçue.</b> Un avocat vous répond sous 48 heures.</p>
        ) : (
          <form onSubmit={envoyer} noValidate>
            <div className={styles.champs}>
              <div className={styles.champ}><label htmlFor="dg-nom">Nom et prénom</label><input type="text" id="dg-nom" name="nom" autoComplete="name" required maxLength={120} /></div>
              <div className={styles.champ}><label htmlFor="dg-org">Établissement</label><input type="text" id="dg-org" name="org" autoComplete="organization" maxLength={160} /></div>
              <div className={styles.champ}><label htmlFor="dg-mail">Adresse électronique</label><input type="email" id="dg-mail" name="email" autoComplete="email" required maxLength={254} /></div>
              <div className={styles.champ}><label htmlFor="dg-tel">Téléphone</label><input type="tel" id="dg-tel" name="tel" autoComplete="tel" maxLength={40} /></div>
              <div className={`${styles.champ} ${styles.large}`}><label htmlFor="dg-url">Lien vers l’avis</label><input type="url" id="dg-url" name="url" placeholder="https://maps.app.goo.gl/…" required maxLength={600} /></div>
              <div className={`${styles.champ} ${styles.large}`}><label htmlFor="dg-msg">Précisions (facultatif)</label><textarea id="dg-msg" name="message" placeholder="Contexte, litige en cours, autres avis…" maxLength={2000} /></div>
            </div>
            {/* Champ piège anti-robot : invisible, hors tabulation. */}
            <div className={styles.piege} aria-hidden="true"><label htmlFor="dg-website">Ne pas remplir</label><input type="text" id="dg-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            <p className={styles.case}><input type="checkbox" id="dg-prix" name="prix" required /><label htmlFor="dg-prix">J’ai pris connaissance des honoraires : l’analyse est gratuite, la procédure qui suit est payante.</label></p>
            <p className={styles.case}><input type="checkbox" id="dg-rgpd" name="rgpd" required /><label htmlFor="dg-rgpd">J’accepte que Lazarègue Avocats traite ces informations pour répondre à ma demande. Elles ne sont utilisées à aucune autre fin.</label></p>
            <button className={styles.btn} type="submit" disabled={etat === "envoi"}>{etat === "envoi" ? "Envoi en cours…" : "Envoyer ma demande"}</button>
            {erreur ? <p className={styles.erreur} role="alert">{erreur}</p> : null}
          </form>
        )}
      </section>
    </div>
  );
}

/* Une question à choix unique : fieldset/legend, radios natifs, cible ≥ 48 px. */
function Question<K extends "vise" | "client" | "contenu" | "serie" | "signal">({
  cle,
  rep,
  choisir,
}: {
  cle: K;
  rep: Reponses;
  choisir: (cle: K, valeur: Reponses[K]) => void;
}) {
  const q = QUESTIONS[cle] as { n: string; legende: string; aide?: string; options: readonly (readonly [string, string])[] };
  return (
    <fieldset>
      <legend><span className={styles.num}>{q.n}</span>{q.legende}</legend>
      {q.aide ? <p className={styles.aide}>{q.aide}</p> : null}
      <div className={styles.options}>
        {q.options.map(([valeur, libelle]) => (
          <label className={styles.option} key={valeur}>
            <input type="radio" name={cle} value={valeur} checked={rep[cle] === valeur} onChange={() => choisir(cle, valeur as Reponses[K])} />
            <span>{libelle}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
