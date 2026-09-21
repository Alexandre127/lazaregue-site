"use client";

import { useRef, useState, type KeyboardEvent } from "react";

/**
 * Matrice rôle × niveau de risque (section « Principe de lecture »).
 * Onglets accessibles : role="tablist", flèches clavier, Home/End, aria-selected,
 * aria-controls, roving tabindex. Panneau « Haut risque » ouvert par défaut.
 * Chaque panneau : d'abord les cas, puis les obligations par acteur, puis la source.
 */

const SYNTHESE =
  "Synthèse indicative du règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744. Les listes de cas ne sont pas exhaustives ; la qualification dépend de l’usage réel.";

type Role = { role: string; oblig: string };
type Panel = { label: string; cases: string[]; roles: Role[]; articles: string };

const PANELS: Panel[] = [
  {
    label: "Pratiques interdites",
    cases: [
      "Notation sociale des personnes",
      "Manipulation ou exploitation des vulnérabilités (âge, handicap, situation sociale)",
      "Reconnaissance des émotions sur le lieu de travail ou dans l’enseignement, sauf raisons médicales ou de sécurité",
      "Catégorisation biométrique déduisant des données sensibles (opinions, orientation sexuelle…)",
      "Constitution de bases de reconnaissance faciale par moissonnage non ciblé d’images",
      "Évaluation du risque qu’une personne commette une infraction sur la seule base de son profilage",
      "Génération de contenus intimes non consentis ou d’abus sexuels sur mineurs (ajout du règlement 2026/1744, au 2 décembre 2026)",
    ],
    roles: [
      { role: "Tous les acteurs", oblig: "Ne pas mettre sur le marché, mettre en service ou utiliser ces systèmes. Les amendes les plus élevées du règlement s’y appliquent." },
    ],
    articles: "Art. 5 · art. 99",
  },
  {
    label: "Haut risque",
    cases: [
      "Recrutement, sélection, évaluation, promotion ou licenciement des salariés, répartition des tâches",
      "Accès à l’éducation et évaluation des élèves ou étudiants",
      "Évaluation de la solvabilité (scoring de crédit), tarification de l’assurance vie et santé",
      "Accès aux prestations et services publics essentiels",
      "Identification biométrique à distance, gestion d’infrastructures critiques",
      "Composants de sécurité de produits déjà réglementés : dispositifs médicaux, machines, jouets, ascenseurs (annexe I)",
    ],
    roles: [
      { role: "Fournisseur", oblig: "Gestion des risques, documentation technique, évaluation de la conformité, enregistrement, marquage CE, surveillance après commercialisation." },
      { role: "Déployeur", oblig: "Usage conforme à la notice, contrôle humain, surveillance, conservation des journaux ; analyse d’impact sur les droits fondamentaux pour certains déployeurs." },
      { role: "Importateur", oblig: "Vérifier que le fournisseur a accompli ses obligations avant la mise sur le marché." },
      { role: "Distributeur", oblig: "Vérifier le marquage CE et la documentation avant la mise à disposition." },
    ],
    articles: "Art. 6, annexes I et III · art. 16 à 27",
  },
  {
    label: "Transparence",
    cases: [
      "Agent conversationnel en contact avec des clients, candidats ou usagers",
      "Images, sons ou vidéos générés ou modifiés par IA, dont les hypertrucages",
      "Textes générés par IA et publiés pour informer le public",
      "Systèmes de reconnaissance des émotions ou de catégorisation biométrique non interdits",
    ],
    roles: [
      { role: "Fournisseur", oblig: "Informer les personnes qu’elles interagissent avec un système d’IA ; marquer les contenus générés." },
      { role: "Déployeur", oblig: "Signaler les contenus hypertruqués ; informer les personnes exposées à certains systèmes (reconnaissance des émotions, catégorisation biométrique)." },
    ],
    articles: "Art. 50",
  },
  {
    label: "Risque minimal",
    cases: [
      "Assistant de rédaction ou de traduction utilisé en interne",
      "Filtre anti-spam, correcteur, moteur de recherche interne",
      "Outil de recommandation ou d’aide sans effet sur une décision concernant des personnes",
    ],
    roles: [
      { role: "Tous les acteurs", oblig: "Pas d’obligation spécifique au titre du risque ; la maîtrise de l’IA par les équipes (article 4) et les autres règles (RGPD, droit du travail, contrats) restent applicables." },
    ],
    articles: "Art. 4",
  },
];

export default function MatriceTabs() {
  const [active, setActive] = useState(1); // Haut risque par défaut
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (active + 1) % PANELS.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + PANELS.length) % PANELS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = PANELS.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  }

  return (
    <>
      <div className="mtabs" role="tablist" aria-label="Niveaux de risque">
        {PANELS.map((p, i) => (
          <button
            key={p.label}
            ref={(el) => { tabsRef.current[i] = el; }}
            type="button"
            role="tab"
            id={`mt${i}`}
            aria-controls={`mp${i}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div>
        {PANELS.map((p, i) => (
          <div className="mpanel" role="tabpanel" id={`mp${i}`} aria-labelledby={`mt${i}`} hidden={active !== i} key={p.label}>
            <div className="cases-in">
              <p className="hd2">Les cas qui relèvent de ce niveau</p>
              <ul>
                {p.cases.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <p className="hd">Ce que chaque acteur doit faire</p>
            {p.roles.map((r) => (
              <div className="r" key={r.role}>
                <b>{r.role}</b>
                <span>{r.oblig}</span>
              </div>
            ))}
            <p className="ft">
              <span>{SYNTHESE}</span>
              <span className="meta">{p.articles}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
