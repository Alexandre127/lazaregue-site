"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./observatoire.module.css";
import {
  DECISIONS,
  SITUATIONS,
  SIT_LABEL,
  type SituationKey,
  computeStats,
  winsBySituation,
  banquesList,
} from "@/app/ressources/data/observatoire";

/**
 * Observatoire de la fraude bancaire — faux conseiller bancaire.
 *
 * Page interactive (filtres + « afficher plus »), construite depuis les 169
 * décisions du JSON. Structure, textes et fonctionnement repris de la maquette
 * validée ; charte, header et footer du site via le layout global. Tous les
 * chiffres sont calculés (voir data/observatoire.ts).
 *
 * Accessibilité : vrais <button> (cartes situation, « afficher plus »),
 * <select> étiquetés, compteur de résultats en aria-live, cibles ≥ 44 px.
 */

const PHONE_DISPLAY = "01 81 70 62 00";
const PHONE_HREF = "tel:+33181706200";

type SortKey = "favorables" | "recent";
type IssueKey = "Toutes" | "Remboursement ordonné" | "Pas de remboursement";
type ScFilter = "Toutes" | SituationKey;

export default function Observatoire() {
  const [sc, setSc] = useState<ScFilter>("Toutes");
  const [banque, setBanque] = useState<string>("Toutes");
  const [issue, setIssue] = useState<IssueKey>("Toutes");
  const [sort, setSort] = useState<SortKey>("favorables");
  const [limit, setLimit] = useState<number>(9);

  const stats = useMemo(() => computeStats(DECISIONS), []);
  const banques = useMemo(() => banquesList(DECISIONS), []);

  // Réinitialise la pagination à chaque changement de filtre.
  const resetLimit = () => setLimit(9);
  const pickScenario = (key: SituationKey) => {
    setSc(key);
    setBanque("Toutes");
    setIssue("Toutes");
    setSort("favorables");
    setLimit(9);
    document.getElementById("decisions")?.scrollIntoView({ behavior: "smooth" });
  };
  const resetAll = () => {
    setSc("Toutes");
    setBanque("Toutes");
    setIssue("Toutes");
    setSort("favorables");
    setLimit(9);
  };

  const filtered = useMemo(() => {
    const v = DECISIONS.filter(
      (d) =>
        (sc === "Toutes" || d.situation === sc) &&
        (banque === "Toutes" || d.banque === banque) &&
        (issue === "Toutes" || (issue === "Remboursement ordonné" ? d.remboursement : !d.remboursement)),
    );
    v.sort((a, b) => {
      if (sort === "favorables" && a.remboursement !== b.remboursement) return a.remboursement ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
    return v;
  }, [sc, banque, issue, sort]);

  const visible = filtered.slice(0, limit);
  const rest = filtered.length - visible.length;
  const n = filtered.length;

  const listTitle =
    sc === "Toutes"
      ? "Jurisprudence : ce que les juges ont décidé face aux faux conseillers bancaires"
      : `${SIT_LABEL[sc]} : ce que les juges ont décidé`;

  const countLabel =
    sort === "favorables"
      ? n > 1
        ? `${n} décisions · remboursements obtenus en premier`
        : `${n} décision`
      : n > 1
        ? `${n} décisions · les plus récentes en premier`
        : `${n} décision`;

  return (
    <main id="contenu" className={styles.wrap}>
      {/* 01 — Hero : promesse + action immédiate + trois chiffres */}
      <section className={styles.hero}>
        <div className={styles.inner}>
          <nav aria-label="Fil d'Ariane" className={styles.crumb}>
            <Link href="/">Accueil</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/ressources">Ressources</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/nos-domaines/escroquerie-fraude-bancaire">Fraude bancaire et escroquerie</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Observatoire</span>
          </nav>
          <p className={styles.heroEyebrow}>OBSERVATOIRE DE LA FRAUDE BANCAIRE · JURISPRUDENCE</p>
          <h1 className={styles.h1}>
            Arnaque au faux conseiller bancaire : votre banque peut être{" "}
            <span className={styles.accent}>condamnée à rembourser</span>
          </h1>
          <p className={styles.heroLead}>
            Faux conseiller, faux SMS, phishing, spoofing (usurpation du numéro de la banque) : le refus de
            votre banque n&rsquo;est pas une décision de justice. Voici ce que les tribunaux ont jugé dans des
            situations comme la vôtre, résumé en langage clair par le cabinet.
          </p>
          <div className={styles.heroActions}>
            <Link className="btn btn-primary" href="/contact">
              Faire examiner mon dossier →
            </Link>
            <a className={styles.heroLink} href="#scenarios">
              Trouver ma situation ↓
            </a>
          </div>
          <div className={styles.statGrid}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{stats.ratioLabel}</span>
              <span className={styles.statDesc}>
                la banque est condamnée à rembourser quand elle ne prouve pas l&rsquo;authentification des
                opérations
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{stats.sumRefund}</span>
              <span className={styles.statDesc}>
                remboursés aux victimes par les juges, dans les décisions de cet observatoire
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{stats.rangeRefund}</span>
              <span className={styles.statDesc}>
                selon les dossiers : les petits montants aussi se récupèrent
              </span>
            </div>
          </div>
          <p className={styles.heroNote}>
            Chiffres calculés sur les décisions récentes réunies dans cet observatoire. {stats.ratioLabel} :{" "}
            {stats.favAuthFalse} décisions sur {stats.totalAuthFalse}.
          </p>
        </div>
      </section>

      {/* 02 — Vous reconnaissez-vous ? (cinq situations) */}
      <section id="scenarios" className={styles.scen}>
        <div className={styles.inner}>
          <div className={styles.secHead}>
            <p className={styles.eyebrowDark}>VOTRE SITUATION</p>
            <h2 className={styles.h2}>Vous reconnaissez-vous ?</h2>
            <p className={styles.secLead}>
              Choisissez ce qui ressemble le plus à ce que vous avez vécu : vous verrez les décisions rendues
              dans des situations comparables.
            </p>
          </div>
          <div className={styles.scenGrid}>
            {SITUATIONS.map((s) => {
              const wins = winsBySituation(DECISIONS, s.key);
              const on = sc === s.key;
              return (
                <button
                  type="button"
                  key={s.key}
                  aria-pressed={on}
                  onClick={() => pickScenario(s.key)}
                  className={`${styles.scenCard} ${on ? styles.scenCardOn : ""}`}
                >
                  <span className={styles.scenQuote}>« {s.quote} »</span>
                  <span className={styles.scenCount}>
                    {wins}
                    {wins > 1
                      ? " décisions où la banque a dû rembourser"
                      : " décision où la banque a dû rembourser"}
                  </span>
                  <span className={styles.scenCta}>Voir les décisions →</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — Argument clé */}
      <section className={styles.arg}>
        <div className={styles.inner}>
          <div className={styles.secHead}>
            <p className={styles.eyebrowOnDark}>CE QUE PEU DE VICTIMES SAVENT</p>
            <h2 className={styles.h2}>
              Vous avez validé l&rsquo;opération dans votre application ? Vous pouvez quand même être remboursé.
            </h2>
            <p className={styles.leadOnDark}>
              C&rsquo;est la situation de la plupart des victimes de faux conseillers : un code saisi, une
              notification acceptée, une clé digitale activée. C&rsquo;est ce qu&rsquo;on appelle
              l&rsquo;authentification forte. La banque s&rsquo;en sert pour refuser. La loi ne lui donne pas
              raison pour autant.
            </p>
          </div>
          <div className={styles.argGrid}>
            <div className={styles.argCard}>
              <span className={styles.argNum}>01</span>
              <h3 className={styles.h3}>Valider n&rsquo;est pas consentir</h3>
              <p className={styles.argText}>
                Si vous avez validé en croyant bloquer ou annuler un paiement, vous n&rsquo;avez pas consenti à
                ce paiement. La loi précise que l&rsquo;utilisation de vos codes ne suffit pas, à elle seule, à
                prouver votre accord.
              </p>
            </div>
            <div className={styles.argCard}>
              <span className={styles.argNum}>02</span>
              <h3 className={styles.h3}>La banque doit le prouver</h3>
              <p className={styles.argText}>
                Affirmer « l&rsquo;opération a été validée par authentification forte » ne suffit pas. La banque
                doit produire ses journaux techniques et démontrer l&rsquo;absence de défaillance. Beaucoup ne
                le font pas, et perdent pour cette raison.
              </p>
            </div>
            <div className={styles.argCard}>
              <span className={styles.argNum}>03</span>
              <h3 className={styles.h3}>Une négligence n&rsquo;est pas une négligence grave</h3>
              <p className={styles.argText}>
                Seule une négligence grave permet à la banque de refuser. Un appel depuis son numéro,
                l&rsquo;urgence, la pression exercée par l&rsquo;escroc : les juges en tiennent compte.
              </p>
            </div>
          </div>
          <div className={styles.argPull}>
            <p className={styles.argPullText}>
              Quand la banque n&rsquo;a pas prouvé l&rsquo;authentification, elle a été condamnée à rembourser
              dans {stats.favAuthFalse} décisions sur {stats.totalAuthFalse}.
            </p>
            <p className={styles.argPullSub}>
              Parmi elles, des clients qui avaient eux-mêmes validé les opérations en croyant les bloquer (TJ
              Marseille, 28 août 2026, n° 23/12995 ; TJ Toulouse, 3 sept. 2026, n° 25/02608 ; TJ Lille, 27 mai
              2026, n° 25/00111). Décisions récentes de cet observatoire pour lesquelles l&rsquo;information est
              disponible.
            </p>
          </div>
          <Link className="btn btn-primary" href="/contact">
            J&rsquo;ai validé l&rsquo;opération : faire examiner mon dossier →
          </Link>
        </div>
      </section>

      {/* 04 — Décisions (filtres + liste) */}
      <section id="decisions" className={styles.dec}>
        <div className={styles.inner}>
          <div className={styles.decHead}>
            <div className={styles.secHead}>
              <p className={styles.eyebrowDark}>LES DÉCISIONS</p>
              <h2 className={styles.h2}>{listTitle}</h2>
            </div>
            <button type="button" onClick={resetAll} className={styles.reset}>
              Voir toutes les situations
            </button>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterField}>
              <label htmlFor="f-sc">Situation</label>
              <select
                id="f-sc"
                value={sc}
                onChange={(e) => {
                  setSc(e.target.value as ScFilter);
                  resetLimit();
                }}
              >
                <option value="Toutes">Toutes</option>
                {SITUATIONS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterField}>
              <label htmlFor="f-banque">Banque</label>
              <select
                id="f-banque"
                value={banque}
                onChange={(e) => {
                  setBanque(e.target.value);
                  resetLimit();
                }}
              >
                <option value="Toutes">Toutes</option>
                {banques.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterField}>
              <label htmlFor="f-issue">Résultat</label>
              <select
                id="f-issue"
                value={issue}
                onChange={(e) => {
                  setIssue(e.target.value as IssueKey);
                  resetLimit();
                }}
              >
                <option value="Toutes">Toutes</option>
                <option value="Remboursement ordonné">Remboursement ordonné</option>
                <option value="Pas de remboursement">Pas de remboursement</option>
              </select>
            </div>
            <div className={styles.filterField}>
              <label htmlFor="f-sort">Ordre</label>
              <select
                id="f-sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortKey);
                  resetLimit();
                }}
              >
                <option value="favorables">Remboursements d&rsquo;abord</option>
                <option value="recent">Plus récentes</option>
              </select>
            </div>
          </div>

          <p className={styles.count} aria-live="polite">
            {countLabel}
          </p>

          <div className={styles.cardGrid}>
            {visible.map((d) => {
              const showBanque = d.banque !== null;
              const showMontant = d.montant !== null;
              return (
                <article key={d.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.tag}>{d.situationLibelle.toUpperCase()}</span>
                    <span className={d.remboursement ? styles.badgeWin : styles.badgeLoss}>
                      {d.remboursement ? "Remboursement ordonné" : "Pas de remboursement"}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{d.titre}</h3>
                  {(showBanque || showMontant) && (
                    <div className={styles.boxes}>
                      {showBanque && (
                        <div className={styles.box}>
                          <span className={styles.boxLabel}>Banque</span>
                          <span className={styles.boxVal}>{d.banque}</span>
                        </div>
                      )}
                      {showMontant && (
                        <div className={styles.box}>
                          <span className={styles.boxLabel}>{d.montantLibelle}</span>
                          <span className={styles.boxVal}>{d.montant}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className={styles.diff}>
                    <span className={styles.diffLabel}>{d.motifLibelle}</span>
                    <p className={styles.diffText}>{d.motif}</p>
                  </div>
                  {!d.remboursement && (
                    <p className={styles.nuance}>
                      Votre situation ne présente pas ce point ? Elle doit être appréciée différemment.
                    </p>
                  )}
                  <div className={styles.cardFoot}>
                    <span className={styles.ref}>{d.reference}</span>
                    {d.lienDecision && (
                      <a
                        className={styles.lire}
                        href={d.lienDecision}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lire la décision ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {rest > 0 && (
            <button type="button" onClick={() => setLimit(limit + 9)} className={styles.more}>
              Afficher {Math.min(9, rest)} décisions de plus ({rest} restantes)
            </button>
          )}

          <div className={styles.ctaBox}>
            <div className={styles.ctaText}>
              <h3 className={styles.ctaTitle}>
                Victime d&rsquo;un faux conseiller bancaire ? Votre situation ressemble à l&rsquo;une de ces
                décisions ?
              </h3>
              <p className={styles.ctaLead}>
                Le cabinet intervient comme avocat en fraude bancaire et examine votre dossier : refus de la
                banque, chronologie, messages reçus, preuves que la banque doit produire.
              </p>
            </div>
            <Link className="btn btn-white" href="/contact">
              Faire examiner mon dossier →
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — Faites relire votre récit */}
      <section className={styles.recit}>
        <div className={`${styles.inner} ${styles.recitGrid}`}>
          <div className={styles.recitCard}>
            <h2 className={styles.recitTitle}>
              Avant d&rsquo;écrire à votre banque ou de déposer plainte, faites relire votre récit.
            </h2>
            <p className={styles.recitText}>
              Décrivez précisément ce qui s&rsquo;est passé : qui vous a contacté, depuis quel numéro, ce
              qu&rsquo;on vous a dit, ce que vous avez fait et à quel moment.
            </p>
            <p className={styles.recitText}>
              Évitez les jugements sur vous-même, comme « j&rsquo;ai été naïf » ou « j&rsquo;aurais dû me
              méfier » : ce ne sont pas des faits, et la banque s&rsquo;en servira pour soutenir que vous avez
              commis une négligence grave.
            </p>
          </div>
          <div className={styles.recitSide}>
            <h3 className={styles.h3}>Conservez dès maintenant</h3>
            <ul className={styles.recitList}>
              <li>les captures des SMS, courriels et messages de validation ;</li>
              <li>le journal des appels, avec les numéros affichés ;</li>
              <li>vos relevés et le courrier de refus de la banque.</li>
            </ul>
            <Link className={`btn ${styles.btnInk}`} href="/contact">
              Faire relire mon dossier →
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — À propos de cet observatoire */}
      <section id="methode" className={styles.apropos}>
        <div className={`${styles.inner} ${styles.aproposGrid}`}>
          <div className={styles.secHead}>
            <p className={styles.eyebrowDark}>À PROPOS</p>
            <h2 className={styles.h2small}>À propos de cet observatoire</h2>
          </div>
          <div className={styles.aproposText}>
            <p>
              Voici les décisions récentes analysées par le cabinet. Elles sont publiques. Le cabinet les
              résume en langage clair, et chaque résumé renvoie au texte intégral de la décision.
            </p>
            <p>
              Chaque dossier dépend de ses faits et de ses pièces : aucune décision ne préjuge de l&rsquo;issue
              d&rsquo;un autre. Personnes physiques anonymisées ; mise à jour mensuelle (dernière mise à jour :
              2 octobre 2026).
            </p>
          </div>
        </div>
      </section>

      {/* 07 — Barre de contact fixe */}
      <div className={styles.bar}>
        <div className={`${styles.inner} ${styles.barInner}`}>
          <span className={styles.barText}>Victime d&rsquo;un faux conseiller bancaire ?</span>
          <div className={styles.barActions}>
            <a className={styles.barPhone} href={PHONE_HREF}>
              {PHONE_DISPLAY}
            </a>
            <Link className="btn btn-primary" href="/contact">
              Faire examiner mon dossier →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
