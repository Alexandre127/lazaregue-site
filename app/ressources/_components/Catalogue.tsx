"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import styles from "../ressources.module.css";
import {
  ARTICLES,
  DOMAINES,
  SUGGESTIONS,
  lesPlusConsultes,
  total,
} from "../data/articles";
import Reveal from "./Reveal";

const STATS = [
  { n: String(total()), l: "Articles" },
  { n: String(DOMAINES.length).padStart(2, "0"), l: "Domaines" },
  { n: "100%", l: "Consultation libre" },
  { n: "0", l: "Formulaire" },
];

/**
 * Hero (recherche) + catalogue filtrable.
 *
 * Recherche et filtres partagent le même état, d'où le regroupement dans un
 * seul composant client : taper dans le champ du hero filtre la grille plus bas.
 *
 * `children` est rendu ENTRE le hero et le catalogue — c'est la place de la
 * section « À la une » dans la maquette. Elle reste ainsi rendue côté serveur.
 */
export default function Catalogue({ children }: { children?: ReactNode }) {
  const [domaine, setDomaine] = useState<string>("tout");
  const [query, setQuery] = useState("");
  const catalogueRef = useRef<HTMLElement>(null);

  const filtres = useMemo(
    () => [
      { key: "tout", label: "Tous les domaines", count: ARTICLES.length },
      ...DOMAINES.map((d) => ({
        key: d as string,
        label: d as string,
        count: ARTICLES.filter((a) => a.domain === d).length,
      })),
    ],
    [],
  );

  const resultats = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter(
      (a) =>
        (domaine === "tout" || a.domain === domaine) &&
        (!q || `${a.title} ${a.domain} ${a.excerpt}`.toLowerCase().includes(q)),
    );
  }, [domaine, query]);

  const populaires = useMemo(() => lesPlusConsultes(), []);

  const versCatalogue = () => {
    const el = catalogueRef.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  const resultLabel = `${resultats.length} ${
    resultats.length > 1 ? "articles" : "article"
  } · consultation libre`;

  return (
    <>
      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <Reveal className={styles.heroKicker} inClassName={styles.in}>
            <span>Ressources · Consultation libre</span>
          </Reveal>

          <Reveal as="h1" className={styles.reveal} inClassName={styles.in}>
            CE QU&apos;IL FAUT SAVOIR AVANT DE DÉCIDER
          </Reveal>

          <Reveal
            as="p"
            className={`${styles.heroLede} ${styles.reveal}`}
            inClassName={styles.in}
          >
            Des repères clairs sur la propriété intellectuelle, les marques, la
            concurrence et les données personnelles.{" "}
            <strong>Écrits par le cabinet, en consultation libre.</strong>
          </Reveal>

          <Reveal
            className={`${styles.searchWrap} ${styles.reveal}`}
            inClassName={styles.in}
          >
            <div className={styles.searchBox}>
              <div className={styles.searchIcon} aria-hidden>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="œuvre originale, marque déposée, cookies, cybersquatting…"
                aria-label="Rechercher un article"
              />
              <button type="button" onClick={versCatalogue}>
                Chercher
              </button>
            </div>
            <div className={styles.suggestions}>
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal
            className={`${styles.heroStats} ${styles.reveal}`}
            inClassName={styles.in}
          >
            {STATS.map((s) => (
              <div key={s.l} className={styles.stat}>
                <div className={styles.n}>{s.n}</div>
                <div className={styles.l}>{s.l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </header>

      {children}

      {/* Catalogue */}
      <section ref={catalogueRef} className={styles.catalogue} id="catalogue">
        <div className={styles.catalogueInner}>
          <Reveal className={`${styles.catalogueHead} ${styles.reveal}`} inClassName={styles.in}>
            <div className={styles.kicker}>
              <span>Le catalogue</span>
            </div>
            <h2>Tous les articles</h2>
          </Reveal>

          <Reveal className={`${styles.filtres} ${styles.reveal}`} inClassName={styles.in}>
            {filtres.map((f) => (
              <button
                key={f.key}
                type="button"
                className={styles.chip}
                aria-pressed={domaine === f.key}
                onClick={() => setDomaine(f.key)}
              >
                {f.label}
                <span className={styles.count}>{f.count}</span>
              </button>
            ))}
          </Reveal>

          <div className={styles.catalogueGrid}>
            <div>
              <div className={styles.resultLabel} role="status">
                {resultLabel}
              </div>

              {resultats.length > 0 ? (
                <div className={styles.cards}>
                  {resultats.map((a) => (
                    <a key={a.title} href={a.href} className={styles.card}>
                      <div className={styles.cardTop}>
                        <span className={styles.cardDomain}>{a.domain}</span>
                      </div>
                      <h3>{a.title}</h3>
                      <p className={styles.cardExcerpt}>{a.excerpt}</p>
                      <div className={styles.cardFoot}>
                        <span>Repère</span>
                        <span>{a.read}</span>
                      </div>
                      <div className={styles.cardBar} aria-hidden />
                    </a>
                  ))}
                </div>
              ) : (
                <div className={styles.vide}>
                  <div className={styles.videSigne} aria-hidden>
                    ∅
                  </div>
                  <p className={styles.videTitre}>Aucun article pour cette recherche.</p>
                  <p className={styles.videAide}>
                    Essayez « Tous les domaines » ou un autre mot-clé.
                  </p>
                </div>
              )}
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.popular}>
                <div className={styles.popularHead}>
                  <span>Les plus consultés</span>
                </div>
                {populaires.map((p) => (
                  <a key={p.title} href={p.href} className={styles.popularItem}>
                    <span className={styles.popularRank}>{p.rank}</span>
                    <div>
                      <div className={styles.popularTitle}>{p.title}</div>
                      <div className={styles.popularDomain}>{p.domain}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className={styles.encart} id="contact">
                <div className={styles.encartK}>Votre situation</div>
                <p>
                  Une question dépasse ce que lit un moteur de recherche ? Parlons de
                  votre cas précis.
                </p>
                <a href="/contact">Nous écrire →</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
