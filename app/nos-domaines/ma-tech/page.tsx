import type { Metadata } from "next";
import Link from "next/link";
import { fr } from "@/lib/typo";
import { MembreCarte } from "@/components/equipe-dossier";
import styles from "./ma-tech.module.css";
import DemoTabs from "./_components/DemoTabs";
import ConseqReveal from "./_components/ConseqReveal";
import LivrablesGrid from "./_components/LivrablesGrid";
import {
  AUDIT,
  AUDITER,
  CONSEQ,
  CONTACT,
  CONTACT_SECTION,
  DEFINITION,
  FAQ,
  HERO,
  LIVRABLES,
  METHODE,
  MID,
  POUR_QUI,
  REMEDIER,
  SITUATIONS,
  TEAM,
  TRADUIRE,
} from "./data/ma-tech";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/ma-tech";

/* Title et meta description CONSERVÉS (brief §3). */
const TITLE = "Avocat due diligence technologique — audit juridique des actifs numériques";
const DESCRIPTION =
  "Due diligence juridique des logiciels, données, contrats IT, systèmes d'IA et risques cyber lors d'une acquisition ou d'une cession. Intervention en co-conseil.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${URL_BASE}${PATH}#service`,
      name: "Due diligence juridique des actifs technologiques",
      url: `${URL_BASE}${PATH}`,
      provider: { "@id": `${URL_BASE}/#cabinet` },
      areaServed: { "@type": "Country", name: "France" },
      serviceType: "Due diligence technologique",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "M&A Tech", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

const TEAM_COLORS = {
  panneau: "var(--off)",
  carte: "var(--wh)",
  bordure: "var(--bd)",
  texte: "var(--ink)",
  secondaire: "var(--text-muted)",
  accent: "var(--blue)",
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <div className={styles.mt}>
        <nav className="crumb" aria-label="Fil d’Ariane">
          <div className="shell">
            <ol>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/nos-domaines">Nos domaines</Link></li>
              <li aria-current="page">M&amp;A Tech</li>
            </ol>
          </div>
        </nav>

        <main id="contenu">
          {/* 1 · HERO — photographie fondue en fond de section */}
          <section className="hero on-dark">
            <div className="hero__bg" aria-hidden="true">
              <picture>
                <source type="image/webp" srcSet="/images/ma-tech/ma-tech-800.webp 800w, /images/ma-tech/ma-tech-1200.webp 1200w" sizes="(max-width:1040px) 100vw, 60vw" />
                <img
                  src="/images/ma-tech/ma-tech-1200.jpg"
                  srcSet="/images/ma-tech/ma-tech-800.jpg 800w, /images/ma-tech/ma-tech-1200.jpg 1200w"
                  sizes="(max-width:1040px) 100vw, 60vw"
                  alt=""
                  width={1200}
                  height={1500}
                  decoding="async"
                />
              </picture>
              <span className="hero__veil" />
            </div>
            <div className="shell">
              <div className="hero__inner">
                <span className="eyebrow">{HERO.eyebrow}</span>
                <h1>{fr(HERO.h1)}</h1>
                <p className="hero__what">{fr(HERO.what)}</p>
                <p className="hero__why">{fr(HERO.why)}</p>
                <div className="btn-row">
                  <Link className="btn btn--primary" href={CONTACT}>{HERO.cta1} →</Link>
                  <Link className="btn btn--ghost" href={CONTACT}>{HERO.cta2}</Link>
                </div>
              </div>
            </div>
          </section>

          {/* 2 · CE QUE L'AUDIT PEUT CHANGER (remonté) */}
          <section className="section" id="consequences" aria-labelledby="h-conseq">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{CONSEQ.eyebrow}</span>
                  <h2 id="h-conseq">{fr(CONSEQ.h2)}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 34 }}>{fr(CONSEQ.lede)}</p>
              <ConseqReveal />
            </div>
          </section>

          {/* 3 · À QUI NOUS NOUS ADRESSONS */}
          <section className="section section--ghost" id="publics" aria-labelledby="h-pub">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{POUR_QUI.eyebrow}</span>
                  <h2 id="h-pub">{fr(POUR_QUI.h2)}</h2>
                </div>
              </div>
              <div className="cards">
                {POUR_QUI.cards.map((c) => (
                  <article className="card" key={c.tag}>
                    <span className="card__tag">{c.tag}</span>
                    <h3>{fr(c.h3)}</h3>
                    <p>{fr(c.p)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 4 · DÉFINITION */}
          <section className="section" id="definition" aria-labelledby="h-def">
            <div className="shell split">
              <div className="shead split-head">
                <div>
                  <span className="eyebrow">{DEFINITION.eyebrow}</span>
                  <h2 id="h-def">{fr(DEFINITION.h2)}</h2>
                </div>
              </div>
              <div className="measure">
                <p style={{ fontSize: "1.12rem", lineHeight: 1.6 }}>{fr(DEFINITION.para1)}</p>
                <blockquote className="pull">{fr(DEFINITION.pull)}</blockquote>
                <details className="more">
                  <summary>{fr(DEFINITION.moreSummary)}</summary>
                  <div>
                    {DEFINITION.more.map((p) => (
                      <p key={p}>{fr(p)}</p>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* 5 · AUDIT JURIDIQUE / TECHNIQUE */}
          <section className="section section--ghost" id="audit" aria-labelledby="h-aud">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">Périmètre</span>
                  <h2 id="h-aud">{fr(AUDIT.h2)}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 28 }}>{fr(AUDIT.lede)}</p>
              <div className="cmp">
                {AUDIT.synth.map((s) => (
                  <div className={s.accent ? "cmp__col cmp__col--accent" : "cmp__col"} key={s.label}>
                    <span className="cmp__label">{s.label}</span>
                    <p className="cmp__q">{fr(s.q)}</p>
                    <p className="cmp__eff">{fr(s.eff)}</p>
                  </div>
                ))}
              </div>
              <details className="more">
                <summary>{fr(AUDIT.moreSummary)}</summary>
                <div>
                  <div className="resp">
                    <div className="tablewrap" tabIndex={0} role="region" aria-label="Comparaison entre audit technique et audit juridique">
                      <table>
                        <thead>
                          <tr>{AUDIT.cols.map((c) => <th scope="col" key={c}>{fr(c)}</th>)}</tr>
                        </thead>
                        <tbody>
                          {AUDIT.rows.map((row) => (
                            <tr key={row.k}>
                              <th scope="row">{fr(row.k)}</th>
                              <td data-label="Audit technique">{fr(row.tech)}</td>
                              <td data-label="Audit juridique">{fr(row.jur)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </section>

          {/* 6 · MÉTHODE (rail, navy) */}
          <section className="section section--navy on-dark" id="methode" aria-labelledby="h-meth">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{METHODE.eyebrow}</span>
                  <h2 id="h-meth">{fr(METHODE.h2)}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 34 }}>{fr(METHODE.lede)}</p>
              <ol className="rail">
                {METHODE.steps.map((s, i) => (
                  <li className={i === METHODE.steps.length - 1 ? "rail-step rail-step--last" : "rail-step"} key={s.big}>
                    <span className="rail-meta">{fr(s.meta)}</span>
                    <span className="rail-big">{s.big}</span>
                    <p>{fr(s.p)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 7 · LES ACTIFS ET DROITS EXAMINÉS (accordéons) */}
          <section className="section section--sub" id="auditer" aria-labelledby="h-auditer">
            <div className="shell split">
              <div className="shead split-head">
                <div>
                  <span className="eyebrow">{AUDITER.eyebrow}</span>
                  <h2 id="h-auditer">{fr(AUDITER.h2)}</h2>
                  <p className="lede" style={{ marginTop: 14 }}>{fr(AUDITER.lede)}</p>
                </div>
              </div>
              <div className="acc">
                {AUDITER.items.map((it) => (
                  <details key={it.k}>
                    <summary><span className="acc__k">{it.k}</span> {fr(it.titre)}</summary>
                    <div className="acc__body">
                      <p>
                        {fr(it.before)}
                        <Link href={it.href}>{fr(it.lien)}</Link>
                        {it.after}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 8 · DÉMONSTRATION (onglets, navy) */}
          <section className="section section--navy on-dark demo-sec" id="demonstration" aria-labelledby="h-demo">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">Démonstration</span>
                  <h2 id="h-demo">Ce que l’audit fait apparaître</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 28 }}>L’écart entre ce qu’une data room déclare et ce que les pièces établissent constitue l’essentiel du travail.</p>
              <DemoTabs />
            </div>
          </section>

          {/* 9 · TRADUIRE (groupes + lexique) */}
          <section className="section" id="traduire" aria-labelledby="h-trad">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{TRADUIRE.eyebrow}</span>
                  <h2 id="h-trad">{fr(TRADUIRE.h2)}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 30 }}>{fr(TRADUIRE.lede)}</p>
              <div className="groups">
                {TRADUIRE.groups.map((g) => (
                  <section className="group" key={g.h3}>
                    <h3>{fr(g.h3)}</h3>
                    <ul>
                      {g.items.map((it) => <li key={it}>{fr(it)}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
              <h3 className="gloss-title">{fr(TRADUIRE.glossTitle)}</h3>
              <dl className="gloss">
                {TRADUIRE.gloss.map((g) => (
                  <div key={g.dt}>
                    <dt>{fr(g.dt)}</dt>
                    <dd>{fr(g.dd)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* 10 · CTA INTERMÉDIAIRE (unique, navy) */}
          <section className="section--navy on-dark mid-sec" aria-label="Prendre contact">
            <div className="shell mid">
              <p className="mid__phrase">{fr(MID.phrase)}</p>
              <div className="btn-row" style={{ margin: 0 }}>
                <Link className="btn btn--primary" href={CONTACT}>{HERO.cta1} →</Link>
                <Link className="btn btn--ghost" href={CONTACT}>{HERO.cta2}</Link>
              </div>
            </div>
          </section>

          {/* 11 · REMÉDIER */}
          <section className="section section--ghost" id="remedier" aria-labelledby="h-rem">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{REMEDIER.eyebrow}</span>
                  <h2 id="h-rem">{fr(REMEDIER.h2)}</h2>
                </div>
              </div>
              <div className="cols2">
                <div className="colbox">
                  <h3>{REMEDIER.avantT}</h3>
                  <ul>{REMEDIER.avant.map((it) => <li key={it}>{fr(it)}</li>)}</ul>
                </div>
                <div className="colbox">
                  <h3>{REMEDIER.apresT}</h3>
                  <ul>{REMEDIER.apres.map((it) => <li key={it}>{fr(it)}</li>)}</ul>
                </div>
              </div>
            </div>
          </section>

          {/* 12 · LIVRABLES (trois exemples, un par étape) */}
          <section className="section" id="livrables" aria-labelledby="h-liv">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{LIVRABLES.eyebrow}</span>
                  <h2 id="h-liv">{fr(LIVRABLES.h2)}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 34 }}>{fr(LIVRABLES.lede)}</p>
              <LivrablesGrid />
            </div>
          </section>

          {/* 13 · STRUCTURES D'OPÉRATION */}
          <section className="section section--warm" id="situations" aria-labelledby="h-str">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{SITUATIONS.eyebrow}</span>
                  <h2 id="h-str">{fr(SITUATIONS.h2)}</h2>
                </div>
              </div>
              <div className="struct">
                {SITUATIONS.cards.map((c) => (
                  <article key={c.h3}>
                    <h3>{fr(c.h3)}</h3>
                    <p>{fr(c.p)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 14 · LE CABINET */}
          <section className="section" id="equipe" aria-labelledby="h-cab">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{TEAM.eyebrow}</span>
                  <h2 id="h-cab">{fr(TEAM.h2)}</h2>
                </div>
              </div>
              <div className="team-grid">
                {TEAM.membres.map((m) => (
                  <MembreCarte key={m.slug} membre={m} couleurs={TEAM_COLORS} />
                ))}
              </div>
              <p className="measure" style={{ marginTop: 34 }}>{fr(TEAM.closing)}</p>
              <p className="measure" style={{ marginTop: 12 }}>
                {TEAM.liensIntro}
                {TEAM.liens.map((l, i) => (
                  <span key={l.href}>
                    <Link href={l.href}>{fr(l.label)}</Link>
                    {i < TEAM.liens.length - 1 ? " · " : "."}
                  </span>
                ))}
              </p>
            </div>
          </section>

          {/* 15 · FAQ */}
          <section className="section section--ghost" id="faq" aria-labelledby="h-faq">
            <div className="shell faq-grid">
              <div className="shead" style={{ marginBottom: 0 }}>
                <div>
                  <span className="eyebrow">Questions fréquentes</span>
                  <h2 id="h-faq">Ce que les acquéreurs et les cédants demandent</h2>
                </div>
              </div>
              <div className="faq">
                {FAQ.map((f) => (
                  <details key={f.q}>
                    <summary>{fr(f.q)}</summary>
                    <div className="faq__body"><p>{fr(f.a)}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 16 · CONTACT */}
          <section className="section section--navy on-dark" id="contact" aria-labelledby="h-contact">
            <div className="shell">
              <div className="shead">
                <div>
                  <span className="eyebrow">{CONTACT_SECTION.eyebrow}</span>
                  <h2 id="h-contact">{fr(CONTACT_SECTION.h2)}</h2>
                </div>
              </div>
              <p className="lede" style={{ marginBottom: 26 }}>{fr(CONTACT_SECTION.lede)}</p>
              <div className="btn-row" style={{ marginTop: 0 }}>
                <Link className="btn btn--primary" href={CONTACT}>{CONTACT_SECTION.cta1} →</Link>
                <Link className="btn btn--ghost" href={CONTACT}>{CONTACT_SECTION.cta2}</Link>
              </div>
              <p className="contact__coord">
                {CONTACT_SECTION.coord}<br />
                <a href="tel:+33181706200">{CONTACT_SECTION.tel}</a> · <a href={`mailto:${CONTACT_SECTION.email}`}>{CONTACT_SECTION.email}</a>
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
