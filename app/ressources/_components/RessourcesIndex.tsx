"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "../ressources.module.css";
import {
  SITUATIONS,
  DOM_CARDS,
  FEATURED,
  REPERES,
  CORPUS,
  FILTERS,
  DOM_LABEL,
  type Dom,
} from "../data/ressources-index";

function norm(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Carte de ressource (corpus / repères). Cliquable si `href`, sinon « à paraître ». */
function ResourceCard({
  dom,
  titre,
  excerpt,
  href,
}: {
  dom: Dom;
  titre: string;
  excerpt: string;
  href: string | null;
}) {
  return (
    <article className={href ? `${styles.card} ${styles.cardlink}` : styles.card}>
      <p className={styles.cardTag}>{DOM_LABEL[dom]}</p>
      <h3>
        {href ? (
          <Link href={href}>{titre}</Link>
        ) : (
          <span>{titre}</span>
        )}
      </h3>
      <p className={styles.cardExcerpt}>{excerpt}</p>
      {!href && <p className={styles.soon}>À paraître</p>}
    </article>
  );
}

export default function RessourcesIndex({ initialDomaine }: { initialDomaine?: string }) {
  // Le domaine initial vient du serveur (searchParams) → rendu identique
  // serveur/client, pas de désynchronisation d'hydratation.
  const initialFilter =
    initialDomaine && FILTERS.some((f) => f.key === initialDomaine) ? (initialDomaine as Dom) : "all";

  const [filter, setFilter] = useState<"all" | Dom>(initialFilter);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"situation" | "domaine">("situation");

  const active = filter !== "all" || query.trim() !== "";
  const term = norm(query.trim());

  const visible = useMemo(
    () =>
      CORPUS.filter((c) => {
        const okDom = filter === "all" || c.dom === filter;
        const okTerm = !term || norm(`${c.titre} ${c.excerpt}`).includes(term);
        if (!active && c.featDup) return false; // masque les doublons par défaut
        return okDom && okTerm;
      }),
    [filter, term, active],
  );

  return (
    <>
      {/* ============================ HERO + RECHERCHE ==================== */}
      <section className={styles.hero} aria-labelledby="h1">
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden>/</span>{" "}
            <span aria-current="page">Ressources</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="h1">RESSOURCES</h1>
              <p className={styles.heroSub}>Comprendre les règles qui encadrent vos activités numériques</p>
              <p className={styles.heroTx}>
                Des repères juridiques conçus pour les entreprises : données personnelles, intelligence
                artificielle, cybersécurité, fraudes, contrats informatiques, plateformes et
                contentieux numériques.
              </p>
            </div>
            <div role="search" className={styles.searchWrap}>
              <label className={styles.label} htmlFor="q">Rechercher dans les ressources</label>
              <div className={styles.search}>
                <input
                  id="q"
                  type="search"
                  placeholder="Rechercher une question, un texte"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span className={styles.searchIcon} aria-hidden>⌕</span>
              </div>
              <p className={styles.freq}>
                <span>Recherches fréquentes :</span>
                {[
                  { q: "NIS 2", label: "NIS 2" },
                  { q: "faux conseiller", label: "faux conseiller bancaire" },
                  { q: "article 28", label: "article 28 RGPD" },
                  { q: "gouvernance", label: "gouvernance IA" },
                ].map((s) => (
                  <button key={s.label} type="button" onClick={() => { setQuery(s.q); setFilter("all"); }}>
                    {s.label}
                  </button>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TROUVER LA BONNE RESSOURCE (sélecteur unique) === */}
      <section className={styles.sec} aria-labelledby="h-trouver">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <h2 className={styles.h2} id="h-trouver">Trouver la bonne ressource</h2>
          </div>
          <div className={styles.seg} role="tablist" aria-label="Entrer par situation ou par domaine">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "situation"}
              className={mode === "situation" ? styles.segOn : undefined}
              onClick={() => setMode("situation")}
            >
              Ce qui vous arrive
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "domaine"}
              className={mode === "domaine" ? styles.segOn : undefined}
              onClick={() => setMode("domaine")}
            >
              Par domaine
            </button>
          </div>
          {mode === "situation" ? (
            <nav className={styles.sitlist} aria-label="Entrer par situation">
              {SITUATIONS.map((s) => (
                <Link key={s.texte} href={s.href}>
                  {s.texte}
                </Link>
              ))}
            </nav>
          ) : (
            <nav className={styles.sitlist} aria-label="Entrer par domaine">
              {DOM_CARDS.map((d) =>
                d.href ? (
                  <Link key={d.n} href={d.href}>
                    {d.titre}
                  </Link>
                ) : (
                  <span key={d.n} className={styles.sitSoon}>
                    {d.titre} <em>à paraître</em>
                  </span>
                ),
              )}
            </nav>
          )}
        </div>
      </section>

      {/* ============================ 03 — À LA UNE ====================== */}
      <section className={styles.sec} aria-labelledby="h-une">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <p className={styles.label}>03 — À la une · {FEATURED.domLabel}</p>
            <h2 className={styles.h2} id="h-une">Le guide du moment</h2>
          </div>
          <article className={`${styles.feat} ${styles.cardlink}`}>
            <div className={styles.chrono} aria-hidden>
              <p className={styles.label}>Chronologie des démarches</p>
              <ol>
                {FEATURED.chrono.map((c) => (
                  <li key={c.step}>
                    <span>{c.step}</span>
                    {c.label}
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.featTxt}>
              <p className={styles.cardTag}>{FEATURED.domLabel}</p>
              <h3>
                <Link href={FEATURED.href}>{FEATURED.titre}</Link>
              </h3>
              <p className={styles.featExcerpt}>{FEATURED.excerpt}</p>
              <span className={styles.featLink} aria-hidden>Lire le guide →</span>
            </div>
          </article>

          <div className={styles.repWrap}>
            <h3 className={styles.repTitle}>Quatre repères pour commencer</h3>
            <p className={styles.repIntro}>
              Quatre réponses pour agir face aux situations les plus fréquentes, sans avoir à connaître
              leur qualification juridique.
            </p>
            <div className={styles.rep}>
              {REPERES.map((r) => (
                <ResourceCard key={r.id} dom={r.dom} titre={r.titre} excerpt={r.excerpt} href={r.href} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 04 — CORPUS ======================= */}
      <section id="corpus" className={`${styles.sec} ${styles.ghost}`} aria-labelledby="h-all">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <p className={styles.label}>04 — Corpus</p>
            <h2 className={styles.h2} id="h-all">Toutes les ressources</h2>
          </div>
          <div className={styles.filters} role="group" aria-label="Filtrer par domaine">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          {!active && (
            <p className={styles.noteF}>
              Les ressources présentées plus haut s&apos;affichent dès qu&apos;un filtre ou une
              recherche est appliqué.
            </p>
          )}
          {visible.length > 0 ? (
            <div className={styles.corpus}>
              {visible.map((c) => (
                <ResourceCard key={c.id} dom={c.dom} titre={c.titre} excerpt={c.excerpt} href={c.href} />
              ))}
            </div>
          ) : (
            <p className={styles.empty} role="status">
              Aucune ressource ne correspond à cette recherche. Essayez un autre terme ou
              réinitialisez les filtres.
            </p>
          )}
        </div>
      </section>

      {/* ============================ CTA =============================== */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <p className={styles.label}>Besoin d&apos;une analyse personnalisée ?</p>
            <h2 className={styles.h2} id="h-cta">
              Une ressource donne des repères. Votre situation peut nécessiter une analyse spécifique.
            </h2>
            <p className={styles.lead}>
              Les faits, les documents disponibles et les délais peuvent modifier la stratégie à
              retenir. Le cabinet peut examiner votre situation et les premières mesures utiles.
            </p>
          </div>
          <div className={styles.ctaRow}>
            <Link className={styles.btn} href="/contact">Échanger avec un avocat →</Link>
            <Link className={styles.ctaLink} href="/nos-domaines">Découvrir les domaines d&apos;intervention</Link>
          </div>
        </div>
      </section>
    </>
  );
}
