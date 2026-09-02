"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "../analyses.module.css";
import {
  ANALYSES,
  AUTEUR,
  DOMAINES,
  REGISTRES,
  TEMPERATURE,
  type Analyse,
} from "../data/analyses";
import Newsletter from "./Newsletter";
import Reveal from "./Reveal";

/** Classe de puce propre à chaque registre. */
function classeTag(registre: Analyse["registre"]) {
  if (registre === "Texte nouveau") return styles.tagTexteNouveau;
  if (registre === "Note de fond") return styles.tagNoteDeFond;
  if (registre === "Chronique") return styles.tagChronique;
  return "";
}

/** Puce de registre + température + date, commune à toutes les cartes. */
function Meta({ a, clair }: { a: Analyse; clair?: boolean }) {
  const t = TEMPERATURE[a.registre];
  return (
    <div className={styles.meta}>
      <span className={clair ? styles.featureTag : `${styles.tag} ${classeTag(a.registre)}`.trim()}>
        {a.registre}
      </span>
      <span className={styles.temp}>
        <span
          className={`${styles.tempDot} ${t.plein ? "" : styles.tempDotCreux}`.trim()}
          aria-hidden
        />
        <span className={styles.tempLabel}>{t.label}</span>
      </span>
      <time className={styles.dateLabel} dateTime={a.dateISO}>
        {a.date}
      </time>
    </div>
  );
}

const signature = (a: Analyse) => `${AUTEUR} · ${a.domain} · ${a.read}`;

export default function Analyses() {
  const [registre, setRegistre] = useState<string>("tout");
  const [domaine, setDomaine] = useState<string>("tout");

  const filtres = useMemo(
    () =>
      ANALYSES.filter((a) => registre === "tout" || a.registre === registre).filter(
        (a) => domaine === "tout" || a.domain === domaine,
      ),
    [registre, domaine],
  );

  /**
   * Répartition éditoriale : chaque analyse est placée au plus une fois.
   * L'ordre de prélèvement reprend celui de la maquette — la note de fond est
   * choisie avant les brèves latérales.
   */
  const bloc = useMemo(() => {
    const restant = [...filtres];
    const prendre = (n: number, pred?: (a: Analyse) => boolean) => {
      const out: Analyse[] = [];
      for (let i = 0; i < restant.length && out.length < n; ) {
        if (!pred || pred(restant[i])) out.push(restant.splice(i, 1)[0]);
        else i++;
      }
      return out;
    };
    const rowTop = prendre(3);
    const feature = prendre(1)[0];
    const bigNote =
      prendre(1, (a) => a.registre === "Note de fond")[0] ?? prendre(1)[0];
    const rowSide = prendre(2);
    const rowBottom = prendre(2);
    return { rowTop, feature, bigNote, rowSide, rowBottom };
  }, [filtres]);

  const compte = `${filtres.length} ${
    filtres.length > 1 ? "analyses" : "analyse"
  } · triées par date`;

  return (
    <>
      {/* En-tête éditorial */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.ourlet}>
            <span className={styles.ourletG}>Le fil du cabinet</span>
            <span className={styles.ourletD}>
              Publié au fil des décisions, pas pour l&apos;algorithme
            </span>
          </div>

          <div className={styles.titreRangee}>
            <Reveal as="h1" inClassName={styles.in}>
              ANALYSES
            </Reveal>
            <Reveal className={styles.chips} inClassName={styles.in}>
              {["tout", ...REGISTRES].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={styles.chip}
                  aria-pressed={registre === r}
                  onClick={() => setRegistre(r)}
                >
                  {r === "tout" ? "Tout" : r}
                </button>
              ))}
            </Reveal>
          </div>

          <Reveal as="p" className={styles.chapo} inClassName={styles.in}>
            Ce que change une décision, à partir de quand, et ce qu&apos;elle laisse
            ouvert. Les Ressources expliquent le droit ; les Analyses le{" "}
            <em>jugent</em> — sourcées, datées, prises de position assumées.
          </Reveal>
        </div>
      </header>

      {/* Grille éditoriale */}
      <section className={styles.grille}>
        <div className={styles.inner}>
          <div className={styles.tri}>
            <div className={styles.triGroupe}>
              <span className={styles.triLabel}>Trier par thème</span>
              {["tout", ...DOMAINES].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={styles.chip}
                  aria-pressed={domaine === d}
                  onClick={() => setDomaine(d)}
                >
                  {d === "tout" ? "Tous" : d}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.compte} role="status">
            {compte}
          </div>

          {filtres.length === 0 ? (
            <div className={styles.vide}>
              <p className={styles.videTitre}>Aucune analyse pour cette sélection.</p>
              <p className={styles.videAide}>
                Essayez « Tout » ou un autre thème.
              </p>
            </div>
          ) : (
            <>
              {/* Rangée 1 — trois brèves */}
              {bloc.rowTop.length > 0 ? (
                <div className={styles.rangeeTrois}>
                  {bloc.rowTop.map((a) => (
                    <a key={a.title} href={a.href} className={styles.carte}>
                      {a.img ? (
                        <div className={styles.carteImg}>
                          <Image
                            src={a.img}
                            alt=""
                            fill
                            sizes="(max-width: 1000px) 100vw, 400px"
                          />
                        </div>
                      ) : null}
                      <div className={styles.carteMeta}>
                        <Meta a={a} />
                      </div>
                      <h3>{a.title}</h3>
                      <p className={styles.carteExcerpt}>{a.excerpt}</p>
                      <div className={`${styles.signature} ${styles.carteSign}`}>
                        {signature(a)}
                      </div>
                      <div className={styles.bar} aria-hidden />
                    </a>
                  ))}
                </div>
              ) : null}

              {/* Rangée 2 — à la une + deux brèves */}
              {bloc.feature ? (
                <div className={styles.rangeeUne}>
                  <a href={bloc.feature.href} className={styles.feature}>
                    <Meta a={bloc.feature} clair />
                    <h2>{bloc.feature.title}</h2>
                    <p className={styles.featureExcerpt}>{bloc.feature.excerpt}</p>
                    <div className={styles.featurePied}>
                      <span className={styles.featureLien}>Lire l&apos;analyse →</span>
                      <span className={styles.signature}>{signature(bloc.feature)}</span>
                    </div>
                    <div className={styles.bar} aria-hidden />
                  </a>
                  <div className={styles.colonne}>
                    {bloc.rowSide.map((a) => (
                      <a key={a.title} href={a.href} className={styles.breve}>
                        <Meta a={a} />
                        <h3>{a.title}</h3>
                        <p className={styles.breveExcerpt}>{a.excerpt}</p>
                        <div className={styles.signature}>{signature(a)}</div>
                        <div className={styles.bar} aria-hidden />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Rangée 3 — note de fond + deux brèves */}
              {bloc.bigNote ? (
                <div className={styles.rangeeNote}>
                  <a href={bloc.bigNote.href} className={styles.note}>
                    <Meta a={bloc.bigNote} />
                    <h2>{bloc.bigNote.title}</h2>
                    <p className={styles.noteExcerpt}>{bloc.bigNote.excerpt}</p>
                    <div className={`${styles.signature} ${styles.noteSign}`}>
                      {signature(bloc.bigNote)}
                    </div>
                    <div className={styles.bar} aria-hidden />
                  </a>
                  {bloc.rowBottom.map((a) => (
                    <a key={a.title} href={a.href} className={styles.breveBasse}>
                      <Meta a={a} />
                      <h3>{a.title}</h3>
                      <p className={styles.breveExcerpt}>{a.excerpt}</p>
                      <div className={styles.signature}>{signature(a)}</div>
                      <div className={styles.bar} aria-hidden />
                    </a>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
