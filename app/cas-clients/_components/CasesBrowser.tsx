"use client";

import { useState } from "react";
import Link from "next/link";
import { CaseCard, CaseFeatured } from "./case-parts";
import { CAS, FILTER_ORDER, DOM_META, type Cas, type DomKey } from "../data/cas-clients";

/**
 * Région interactive de la page générale : filtres par domaine (chips), cas à
 * la une et grille. Tout le contenu est dans le HTML initial ; les filtres ne
 * font que masquer des cartes (attribut `hidden`). Le domaine initial vient du
 * serveur (searchParams) → rendu identique serveur/client, pas de mismatch.
 */
export default function CasesBrowser({ initialDomaine }: { initialDomaine?: string }) {
  const initial =
    initialDomaine && FILTER_ORDER.includes(initialDomaine as DomKey) ? (initialDomaine as DomKey) : "all";
  const [f, setF] = useState<"all" | DomKey>(initial);

  const match = (c: Cas) => f === "all" || c.domaines.includes(f as DomKey);
  const featured = CAS[0];
  const rest = CAS.slice(1);
  const visibleCount = CAS.filter(match).length;

  return (
    <>
      <section className="hub-hero ghost" aria-labelledby="h1">
        <div className="wrap">
          <nav className="crumb dk" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden>/</span> <span aria-current="page">Cas clients</span>
          </nav>
          <p className="label heroLabel">Cas clients</p>
          <h1 id="h1">DES SITUATIONS CONCRÈTES, UNE STRATÉGIE ADAPTÉE À CHAQUE DOSSIER</h1>
          <p className="lead heroLead">
            Cyberattaque et responsabilité d’un prestataire informatique, virements frauduleux,
            déréférencement Google, usurpation d’identité, litige d’infogérance, piratage,
            photographies utilisées sans autorisation, escroquerie en ligne : huit dossiers traités et
            menés à leur terme par le cabinet, présentés de manière anonymisée, de la situation
            rencontrée à l’issue obtenue.
          </p>
          <div className="chips" role="group" aria-label="Filtrer par domaine">
            <button type="button" aria-pressed={f === "all"} onClick={() => setF("all")}>Tous les domaines</button>
            {FILTER_ORDER.map((k) => (
              <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>
                {DOM_META[k].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="sec casSec" aria-labelledby="h-feat">
        <div className="wrap">
          <p className="label" id="h-feat">Cas à la une</p>
          <CaseFeatured cas={featured} hidden={!match(featured)} />
          <div className="grid3" id="list">
            {rest.map((c) => (
              <CaseCard key={c.slug} cas={c} hidden={!match(c)} />
            ))}
          </div>
          {visibleCount === 0 && (
            <p className="empty" role="status">Aucun cas publié pour ce domaine à ce jour.</p>
          )}
          <p className="note-a">
            Dossiers anonymisés et clos : les faits sont modifiés dans la mesure nécessaire à
            l’anonymat des parties. Les résultats obtenus ne préjugent pas de l’issue d’un autre
            dossier, chaque situation dépendant de ses propres faits et pièces.
          </p>
        </div>
      </section>
    </>
  );
}
