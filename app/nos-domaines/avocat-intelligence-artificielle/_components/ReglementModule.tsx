"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";

/**
 * Module unique « Ce que dit le règlement » — remplace les anciennes sections
 * Principe de lecture, Matrice de risque, Obligations et Calendrier.
 *
 * Deux briques du site : onglets accessibles (role="tablist", flèches clavier,
 * Home/End, roving tabindex) + lignes/sélecteurs à visibilité pilotée par classe
 * (jamais l'attribut `hidden` : sur ordinateur, `[hidden]` est `display:none`
 * d'origine navigateur, imbattable par un `!important` auteur). Tout le contenu
 * reste dans le DOM ; le CSS décide de ce qui s'affiche selon la taille.
 *
 * Ordinateur : bloc « Toute entreprise » toujours visible + onglets des quatre
 * niveaux (Haut risque par défaut), chaque niveau montrant Déployeur ET
 * Fournisseur. Mobile (maquette) : un seul jeu de cinq onglets — Toute entreprise
 * (ouvert par défaut) puis les quatre niveaux — et, dans chaque niveau, un
 * sélecteur Déployeur / Fournisseur n'affichant qu'une liste à la fois.
 *
 * `sel` : 0 = Toute entreprise, 1..4 = niveaux (index LEVELS + 1).
 */

type Rich = { b: string; span: string; em: string; href?: string };

const REPORT =
  "Le report des obligations à haut risque ne suspend ni ces obligations, ni le droit du travail, ni le RGPD, ni les engagements contractuels. Une obligation applicable sans amende immédiate reste opposable devant le juge civil ou prud’homal.";

const TOUTE: Rich[] = [
  { b: "Former les équipes", span: "Prendre des mesures pour favoriser la maîtrise de l’IA des personnes qui utilisent les systèmes, adaptées à leur rôle, et en garder la trace.", em: "Art. 4 · depuis le 2 févr. 2025", href: "#mission-05" },
  { b: "Écarter les pratiques interdites", span: "Vérifier qu’aucun outil utilisé ne relève des pratiques de l’article 5.", em: "Art. 5" },
  { b: "Informer quand c’est requis", span: "Signaler l’agent conversationnel à ses interlocuteurs ; signaler les contenus hypertruqués diffusés.", em: "Art. 50" },
  { b: "Encadrer les usages internes", span: "Données personnelles, secrets d’affaires, propriété des contenus produits : règles écrites, charte d’usage.", em: "RGPD · droit des contrats" },
  { b: "Associer les représentants du personnel", span: "Informer et consulter le CSE lorsque l’outil modifie les conditions de travail.", em: "Code du travail" },
  { b: "Tenir l’inventaire des outils", span: "Recenser les systèmes utilisés, leur fournisseur et leur usage. Mesure recommandée : sans lui, aucune qualification n’est possible.", em: "Mesure recommandée" },
];

type Col = { role: string; rich?: Rich[]; plain?: string };
type Level = { label: string; band: string; cases: string[]; cols: Col[]; articles: string };

const LEVELS: Level[] = [
  {
    label: "Pratiques interdites",
    band: "Applicable depuis le 2 février 2025",
    cases: [
      "Notation sociale des personnes",
      "Manipulation ou exploitation des vulnérabilités (âge, handicap, situation sociale)",
      "Reconnaissance des émotions sur le lieu de travail ou dans l’enseignement, sauf raisons médicales ou de sécurité",
      "Catégorisation biométrique déduisant des données sensibles (opinions, orientation sexuelle…)",
      "Constitution de bases de reconnaissance faciale par moissonnage non ciblé d’images",
      "Évaluation du risque qu’une personne commette une infraction sur la seule base de son profilage",
      "Génération de contenus intimes non consentis ou d’abus sexuels sur mineurs (ajout du règlement 2026/1744, au 2 décembre 2026)",
    ],
    cols: [
      { role: "Tous les acteurs", plain: "Ne pas mettre sur le marché, mettre en service ou utiliser ces systèmes. Les amendes les plus élevées du règlement s’y appliquent." },
    ],
    articles: "Art. 5 · art. 99",
  },
  {
    label: "Haut risque",
    band: "Annexe III : 2 décembre 2027 · annexe I : 2 août 2028",
    cases: [
      "Recrutement, sélection, évaluation, promotion ou licenciement des salariés, répartition des tâches",
      "Accès à l’éducation et évaluation des élèves ou étudiants",
      "Évaluation de la solvabilité (scoring de crédit), tarification de l’assurance vie et santé",
      "Accès aux prestations et services publics essentiels",
      "Identification biométrique à distance, gestion d’infrastructures critiques",
      "Composants de sécurité de produits déjà réglementés : dispositifs médicaux, machines, jouets, ascenseurs (annexe I)",
    ],
    cols: [
      {
        role: "Déployeur",
        rich: [
          { b: "Utiliser selon la notice", span: "Mesures techniques et organisationnelles pour respecter la notice d’utilisation du fournisseur.", em: "Art. 26" },
          { b: "Confier le contrôle humain", span: "Désigner des personnes compétentes, formées et disposant de l’autorité nécessaire.", em: "Art. 26" },
          { b: "Surveiller et conserver les journaux", span: "Surveiller le fonctionnement, signaler les incidents graves, conserver les journaux au moins six mois.", em: "Art. 26" },
          { b: "Informer salariés et personnes concernées", span: "Informer les représentants du personnel et les salariés avant la mise en service au travail ; informer les personnes faisant l’objet d’une décision.", em: "Art. 26 · art. 86" },
          { b: "Analyser l’impact", span: "Analyse d’impact sur les droits fondamentaux pour les organismes publics et certains usages (crédit, assurance) ; analyse d’impact RGPD le cas échéant.", em: "Art. 27 · RGPD art. 35" },
        ],
      },
      {
        role: "Fournisseur",
        rich: [
          { b: "Gérer les risques et les données", span: "Système de gestion des risques sur tout le cycle de vie ; qualité et gouvernance des données d’entraînement.", em: "Art. 9 · 10" },
          { b: "Documenter", span: "Documentation technique, journalisation automatique, notice d’utilisation claire pour les déployeurs.", em: "Art. 11 à 13" },
          { b: "Garantir contrôle et robustesse", span: "Conception permettant le contrôle humain ; exactitude, robustesse et cybersécurité.", em: "Art. 14 · 15" },
          { b: "Prouver la conformité", span: "Système de gestion de la qualité, évaluation de la conformité, déclaration UE, marquage CE, enregistrement.", em: "Art. 17 · 43 · 47 à 49" },
          { b: "Suivre après la mise sur le marché", span: "Surveillance après commercialisation et signalement des incidents graves.", em: "Art. 72 · 73" },
        ],
      },
    ],
    articles: "Art. 6, annexes I et III · art. 16 à 27",
  },
  {
    label: "Transparence",
    band: "Applicable depuis le 2 août 2026",
    cases: [
      "Agent conversationnel en contact avec des clients, candidats ou usagers",
      "Images, sons ou vidéos générés ou modifiés par IA, dont les hypertrucages",
      "Textes générés par IA et publiés pour informer le public",
      "Systèmes de reconnaissance des émotions ou de catégorisation biométrique non interdits",
    ],
    cols: [
      { role: "Fournisseur", plain: "Informer les personnes qu’elles interagissent avec un système d’IA ; marquer les contenus générés." },
      { role: "Déployeur", plain: "Signaler les contenus hypertruqués ; informer les personnes exposées à certains systèmes (reconnaissance des émotions, catégorisation biométrique)." },
    ],
    articles: "Art. 50",
  },
  {
    label: "Risque minimal",
    band: "",
    cases: [
      "Assistant de rédaction ou de traduction utilisé en interne",
      "Filtre anti-spam, correcteur, moteur de recherche interne",
      "Outil de recommandation ou d’aide sans effet sur une décision concernant des personnes",
    ],
    cols: [
      { role: "Tous les acteurs", plain: "Pas d’obligation spécifique au titre du risque ; la maîtrise de l’IA par les équipes (article 4) et les autres règles (RGPD, droit du travail, contrats) restent applicables." },
    ],
    articles: "Art. 4",
  },
];

const SYNTHESE =
  "Synthèse indicative du règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744. Les listes de cas ne sont pas exhaustives ; la qualification dépend de l’usage réel.";

// Renvois des situations : #reglement-<clé> active l'onglet (sel) correspondant.
const HASH_TO_SEL: Record<string, number> = {
  interdites: 1,
  "haut-risque": 2,
  transparence: 3,
  minimal: 4,
};

function RichRow({ it }: { it: Rich }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="reg-row">
      <div className="reg-row-head">
        <span className="reg-row-b">
          {it.href ? <Link href={it.href}>{it.b}</Link> : it.b}
        </span>
        <em>{it.em}</em>
        <button
          type="button"
          className="reg-row-toggle"
          aria-expanded={open}
          aria-controls={id}
          aria-label={open ? "Masquer le détail" : "Afficher le détail"}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">{open ? "–" : "+"}</span>
        </button>
      </div>
      <p className={open ? "reg-row-body is-open" : "reg-row-body"} id={id}>{it.span}</p>
    </div>
  );
}

export default function ReglementModule() {
  const [sel, setSel] = useState(2); // Haut risque (défaut ordinateur ; mobile → Toute)
  const [roleView, setRoleView] = useState("Déployeur"); // sélecteur mobile
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  function scrollToModule() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = rootRef.current?.closest("section") ?? rootRef.current;
    target?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }

  useEffect(() => {
    function applyHash(): boolean {
      if (!location.hash.startsWith("#reglement")) return false;
      const key = location.hash.replace(/^#reglement-?/, "");
      const idx = key === "" ? 0 : (key in HASH_TO_SEL ? HASH_TO_SEL[key] : null);
      if (idx === null) return false;
      setSel(idx);
      scrollToModule();
      return true;
    }
    const hadHash = applyHash();
    // Défaut mobile : premier onglet « Toute entreprise ».
    if (!hadHash && window.matchMedia("(max-width: 767px)").matches) setSel(0);
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    const visible = tabsRef.current.filter((b): b is HTMLButtonElement => !!b && b.offsetParent !== null);
    const cur = visible.indexOf(e.currentTarget);
    if (cur < 0) return;
    let ni: number | null = null;
    if (e.key === "ArrowRight") ni = (cur + 1) % visible.length;
    else if (e.key === "ArrowLeft") ni = (cur - 1 + visible.length) % visible.length;
    else if (e.key === "Home") ni = 0;
    else if (e.key === "End") ni = visible.length - 1;
    if (ni !== null) {
      e.preventDefault();
      const target = visible[ni];
      setSel(tabsRef.current.indexOf(target));
      target.focus();
    }
  }

  function goToute(e: ReactMouseEvent) {
    e.preventDefault();
    setSel(0);
    scrollToModule();
  }

  return (
    <div className="reg" ref={rootRef}>
      <p className="reg-h">Selon le niveau de risque du système</p>

      {/* ---- Barre d'onglets (Toute entreprise masqué sur ordinateur) ---- */}
      <div className="mtabs" role="tablist" aria-label="Obligations par régime">
        <button
          type="button"
          role="tab"
          className="reg-tab-toute"
          ref={(el) => { tabsRef.current[0] = el; }}
          id="rt-toute"
          aria-controls="rp-toute"
          aria-selected={sel === 0}
          tabIndex={sel === 0 ? 0 : -1}
          onClick={() => setSel(0)}
          onKeyDown={onKey}
        >
          Toute entreprise
        </button>
        {LEVELS.map((p, k) => (
          <button
            key={p.label}
            type="button"
            role="tab"
            ref={(el) => { tabsRef.current[k + 1] = el; }}
            id={`rt${k}`}
            aria-controls={`rp${k}`}
            aria-selected={sel === k + 1}
            tabIndex={sel === k + 1 ? 0 : -1}
            onClick={() => setSel(k + 1)}
            onKeyDown={onKey}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ---- Panneau « Toute entreprise » : cartouche + obligations ---- */}
      <div
        className={sel === 0 ? "reg-toute is-active" : "reg-toute"}
        role="tabpanel"
        id="rp-toute"
        aria-labelledby="rt-toute"
      >
        <div className="reg-cartouche">
          <p className="reg-band">Déjà applicable</p>
          <h3 className="h3">Toute entreprise qui utilise l’IA</h3>
          <p>{REPORT}</p>
        </div>
        <div className="reg-obls">
          {TOUTE.map((it) => (
            <RichRow it={it} key={it.b} />
          ))}
        </div>
      </div>

      {/* ---- Panneaux des niveaux de risque ---- */}
      <div className="reg-panels">
        {LEVELS.map((p, k) => (
          <div
            className={sel === k + 1 ? "reg-panel is-active" : "reg-panel"}
            role="tabpanel"
            id={`rp${k}`}
            aria-labelledby={`rt${k}`}
            key={p.label}
          >
            {p.label === "Risque minimal" ? (
              <p className="reg-band reg-band-muted">
                Aucune obligation propre à ce niveau — <a href="#reglement" onClick={goToute}>voir les obligations applicables à toute entreprise</a>
              </p>
            ) : (
              <p className="reg-band">{p.band}</p>
            )}
            <div className="reg-cols">
              <div className="reg-cases">
                <p className="hd2">Les cas qui relèvent de ce niveau</p>
                <ul>
                  {p.cases.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="reg-roles" data-count={p.cols.length}>
                {p.cols.length > 1 ? (
                  <div className="reg-select" role="group" aria-label="Choisir un rôle">
                    {p.cols.map((col) => (
                      <button
                        key={col.role}
                        type="button"
                        className={roleView === col.role ? "reg-select-btn is-on" : "reg-select-btn"}
                        aria-pressed={roleView === col.role}
                        onClick={() => setRoleView(col.role)}
                      >
                        {col.role}
                      </button>
                    ))}
                  </div>
                ) : null}
                {p.cols.map((col) => {
                  const mobileVisible = p.cols.length === 1 || col.role === roleView;
                  return (
                    <div className={mobileVisible ? "reg-role is-rolevis" : "reg-role"} key={col.role}>
                      <p className="reg-role-t">{col.role}</p>
                      {col.rich ? (
                        col.rich.map((it) => <RichRow it={it} key={it.b} />)
                      ) : (
                        <p className="reg-plain">{col.plain}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="ft">
              <span>{SYNTHESE}</span>
              <span className="meta">{p.articles}</span>
            </p>
          </div>
        ))}
      </div>

      {/* ---- Pied du module : sanctions + calendrier ---- */}
      <p className="reg-foot">
        Sanctions prévues par l’article 99 : jusqu’à 35 millions d’euros ou 7 % du chiffre d’affaires mondial pour les pratiques interdites, 15 millions ou 3 % pour les autres obligations.
        {" "}
        <span className="reg-cal">Calendrier détaillé, article par article — ressource à paraître.</span>
      </p>
    </div>
  );
}
