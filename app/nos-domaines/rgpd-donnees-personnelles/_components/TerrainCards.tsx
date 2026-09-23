"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * « Ce que nous voyons le plus souvent » — six situations récurrentes.
 * Titre + explication courte visibles ; le détail (« ce qui se passe sans
 * encadrement ») se déplie au clic. Contenu restauré VERBATIM de l'ancienne
 * page RGPD (git 624bb52) ; seul le lien IA a été recâblé sur la route réelle
 * du projet (`/nos-domaines/avocat-intelligence-artificielle`).
 *
 * Grille `align-items:start` : l'ouverture d'un bloc n'étire pas les blocs
 * voisins (pas de grande zone vide dans les cartes voisines).
 */

type Terrain = {
  title: string;
  sub: string;
  expand: string;
  link?: { href: string; label: string };
};

const TERRAIN: Terrain[] = [
  {
    title: "Outils SaaS américains utilisés sans encadrement",
    sub: "Des outils SaaS empilés, sans contrat adéquat ni documentation des traitements et des transferts de données",
    expand:
      "Le Cloud Act américain peut contraindre l'hébergeur à transmettre vos données sans vous prévenir. Sans contrat Art. 28 conforme, vous restez responsable en cas de violation.",
    link: { href: "/nos-domaines/contrats-informatiques", label: "Encadrer vos contrats IT" },
  },
  {
    title: "Registre des traitements manquant ou obsolète",
    sub: "La base légale de chaque traitement n'est pas documentée",
    expand:
      "La CNIL peut sanctionner même sans violation effective. Sans registre à jour, impossible de démontrer la conformité lors d'un contrôle ou d'une due diligence investisseur.",
  },
  {
    title: "DRH qui s’appuie sur une intelligence artificielle générative en utilisant des données RH",
    sub: "CV, évaluations, informations sur les salariés, sans aucune supervision en matière d’IA",
    expand:
      "Double exposition : RGPD et AI Act (système IA à risque élevé). Le salarié peut exercer son droit d'opposition. La CNIL a déjà ouvert des enquêtes sur ce sujet.",
    link: { href: "/nos-domaines/avocat-intelligence-artificielle", label: "Conformité AI Act" },
  },
  {
    title: "Lancement d’une application mobile sans mise en conformité",
    sub: "Géolocalisation, cookies et données utilisateurs non encadrés",
    expand:
      "La CNIL surveille activement les applis mobiles. Une plainte utilisateur suffit à déclencher un contrôle. Les données de géolocalisation sont sensibles — leur collecte sans consentement valide expose à une sanction immédiate.",
  },
  {
    title: "Salarié qui réclame l’accès à l’ensemble de ses courriels",
    sub: "Droit d’accès exercé dans un contexte de contentieux en ressources humaines",
    expand:
      "Sans procédure documentée, l'entreprise doit répondre sous un mois. Un refus ou retard expose à une réclamation CNIL. Nous structurons la réponse juridique tout en protégeant les intérêts de l'entreprise.",
  },
  {
    title: "Opération de financement qui met en évidence des écarts de conformité",
    sub: "Lors de la due diligence, la protection des données devient un facteur de valorisation",
    expand:
      "Un fichier prospects sans consentement valide peut être qualifié d'actif illicite — impact direct sur la valorisation. Nous accompagnons les fondateurs dans la régularisation pré-closing.",
  },
];

export function TerrainCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="terrain">
      {TERRAIN.map((item, i) => {
        const isOpen = open === i;
        const panelId = `terrain-panel-${i}`;
        return (
          <li key={item.title} className={`terrain-card${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="terrain-btn"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen((prev) => (prev === i ? null : i))}
            >
              <span className="terrain-top">
                <span className="terrain-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="terrain-sign" aria-hidden="true">{isOpen ? "×" : "+"}</span>
              </span>
              <span className="terrain-title">{item.title}</span>
              <span className="terrain-sub">{item.sub}</span>
            </button>
            {isOpen ? (
              <div className="terrain-panel" id={panelId}>
                <div className="terrain-panel-inner">
                  <p className="terrain-flag">Ce qui se passe sans encadrement</p>
                  <p className="terrain-expand">{item.expand}</p>
                  {item.link ? (
                    <Link className="terrain-link" href={item.link.href}>
                      {item.link.label} <span aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
