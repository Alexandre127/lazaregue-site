"use client";

import { useEffect, useRef, useState } from "react";

/**
 * « Cas clients » — quatre mises en conformité, anonymisées par secteur (aucun
 * nom de client, nulle part, y compris attributs et métadonnées). Sans lien
 * (aucune page de cas n'existe encore).
 *
 * Deux versions de texte dans le code :
 *  · LONGUE (≥ 640px) : titre, blocs « LA DIFFICULTÉ » / « LA SOLUTION », résultat.
 *  · COURTE (< 639px) : titre, solution, résultat — trois lignes, sans intitulés.
 * La version non affichée est en display:none ET aria-hidden (piloté par la
 * largeur) pour ne pas être dupliquée aux lecteurs d'écran.
 *
 * Desktop : grille 2×2. Sous 639px : bande horizontale (scroll-snap) avec un
 * indicateur à quatre repères reflétant la position réelle (IntersectionObserver).
 */

type CasLong = { titre: string; difficulte: string; solution: string; resultat: string };
type CasShort = { titre: string; solution: string; resultat: string };
type Cas = { label: string; long: CasLong; short: CasShort };

const CAS: Cas[] = [
  {
    label: "Banque",
    long: {
      titre: "Une banque devait concilier le RGPD avec ses propres obligations réglementaires.",
      difficulte: "Lutte contre le blanchiment, secret bancaire, conservation des opérations sur titres : le droit bancaire impose de garder des données que le RGPD commande de limiter.",
      solution: "Pour chaque traitement, le cabinet a déterminé la base légale applicable et arrêté des durées de conservation justifiées texte par texte, puis mis à niveau l’information des clients et les contrats des prestataires.",
      resultat: "Chaque durée de conservation repose sur une obligation identifiée et peut être justifiée en cas de contrôle.",
    },
    short: {
      titre: "Le droit bancaire impose de conserver ce que le RGPD commande de limiter.",
      solution: "Une base légale et une durée justifiée pour chaque traitement, texte par texte.",
      resultat: "Chaque durée peut être justifiée en cas de contrôle.",
    },
  },
  {
    label: "Immobilier commercial",
    long: {
      titre: "Un groupe mesurait la fréquentation de ses centres commerciaux, et chaque filiale avait ses propres pratiques.",
      difficulte: "Selon la technique employée, la mesure de fréquentation peut suivre des personnes identifiables à leur insu. Entre la foncière, le gestionnaire mandaté et les prestataires, personne ne savait qui était responsable du traitement.",
      solution: "Le cabinet a qualifié le rôle de chacun (responsable, responsable conjoint, sous-traitant) et imposé l’anonymisation ou l’agrégation des données de fréquentation avant toute exploitation, dans des contrats harmonisés pour tout le groupe.",
      resultat: "Les responsabilités sont réparties par contrat, et les visiteurs ne sont plus identifiables.",
    },
    short: {
      titre: "Des visiteurs identifiables, et personne ne savait qui était responsable du traitement.",
      solution: "Rôles qualifiés, données anonymisées, contrats harmonisés dans tout le groupe.",
      resultat: "Les responsabilités sont réparties, les visiteurs ne sont plus identifiables.",
    },
  },
  {
    label: "Santé et intelligence artificielle",
    long: {
      titre: "Une entreprise de santé analysait le visage des patients pour établir un diagnostic.",
      difficulte: "Données de santé, traitement algorithmique, patients parfois vulnérables : ce cumul impose une analyse d’impact et un encadrement strict de l’hébergement des données et des études menées pour entraîner l’algorithme.",
      solution: "Le cabinet a conduit l’analyse d’impact, encadré les études avec les établissements de santé partenaires, organisé un hébergement conforme et rédigé une information compréhensible pour les patients.",
      resultat: "De l’étude clinique au déploiement, chaque étape repose sur un fondement documenté.",
    },
    short: {
      titre: "Des visages analysés pour établir un diagnostic : données de santé et algorithme à encadrer.",
      solution: "Analyse d’impact, études encadrées, hébergement conforme, information des patients.",
      resultat: "De l’étude clinique au déploiement, chaque étape est documentée.",
    },
  },
  {
    label: "Industrie automobile",
    long: {
      titre: "Un équipementier implanté dans de nombreux pays faisait circuler des données hors de l’Union européenne.",
      difficulte: "L’invalidation du Privacy Shield par la Cour de justice, en juillet 2020, avait privé de base juridique une partie des transferts vers les États-Unis.",
      solution: "Le cabinet a cartographié les flux entre sites et filiales, identifié ceux qui n’étaient plus couverts, puis mis en place les clauses contractuelles types et les mesures complémentaires, pays par pays.",
      resultat: "Chaque transfert hors de l’Union repose sur un instrument valide, et les autres écarts sont traités selon une feuille de route priorisée.",
    },
    short: {
      titre: "Après l’invalidation du Privacy Shield, des transferts hors de l’Union privés de base juridique.",
      solution: "Flux cartographiés, clauses contractuelles types mises en place pays par pays.",
      resultat: "Chaque transfert repose sur un instrument valide.",
    },
  },
];

function CasBodyLong({ t }: { t: CasLong }) {
  return (
    <>
      <h3>{t.titre}</h3>
      <p className="cas-sub">La difficulté</p>
      <p className="cas-text">{t.difficulte}</p>
      <p className="cas-sub">La solution</p>
      <p className="cas-text">{t.solution}</p>
      <p className="cas-issue">{t.resultat}</p>
    </>
  );
}

function CasBodyShort({ t }: { t: CasShort }) {
  return (
    <>
      <h3 className="cas-short-titre">{t.titre}</h3>
      <p className="cas-text">{t.solution}</p>
      <p className="cas-issue">{t.resultat}</p>
    </>
  );
}

export function CasClients() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof IntersectionObserver === "undefined") return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".cas-card"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = cards.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: grid, threshold: [0.6] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [isMobile]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const grid = gridRef.current;
    if (!grid) return;
    e.preventDefault();
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".cas-card"));
    const next = Math.min(Math.max(active + (e.key === "ArrowRight" ? 1 : -1), 0), cards.length - 1);
    cards[next]?.scrollIntoView({ inline: "start", block: "nearest" });
  };

  return (
    <>
      <div
        className="cas-grid"
        ref={gridRef}
        {...(isMobile
          ? { role: "region", tabIndex: 0, "aria-label": "Cas clients", onKeyDown }
          : {})}
      >
        {CAS.map((c) => (
          <article className="cas-card" key={c.label}>
            <p className="cas-label">{c.label}</p>
            <div className="cas-long" aria-hidden={isMobile || undefined}>
              <CasBodyLong t={c.long} />
            </div>
            <div className="cas-short" aria-hidden={!isMobile || undefined}>
              <CasBodyShort t={c.short} />
            </div>
          </article>
        ))}
      </div>
      <div className="cas-dots" aria-hidden="true">
        {CAS.map((_, i) => (
          <span key={i} className={`cas-dot${i === active ? " active" : ""}`} />
        ))}
      </div>
    </>
  );
}
