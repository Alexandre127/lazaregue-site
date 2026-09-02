import type { Metadata } from "next";
import styles from "./analyse.module.css";
import {
  ARTICLE,
  AVERTISSEMENT,
  CONCLUSION,
  ESSENTIEL,
  NOTES,
  RELATED,
  SECTIONS,
  TABLE_ROWS,
  type Bloc,
} from "../data/ai-act-preuve";
import Abonnement from "./_components/Abonnement";
import Partager from "./_components/Partager";
import Plan from "./_components/Plan";

export const metadata: Metadata = {
  title: `${ARTICLE.h1} | Lazarègue Avocats`,
  description: ARTICLE.excerpt,
  alternates: { canonical: `/blog/${ARTICLE.slug}` },
  openGraph: {
    title: ARTICLE.h1,
    description: ARTICLE.excerpt,
    url: `/blog/${ARTICLE.slug}`,
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "article",
    publishedTime: ARTICLE.dateISO,
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE.h1,
    description: ARTICLE.excerpt,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline: ARTICLE.h1,
  alternativeHeadline: ARTICLE.sub,
  description: ARTICLE.excerpt,
  datePublished: ARTICLE.dateISO,
  inLanguage: "fr-FR",
  about: ARTICLE.domain,
  author: {
    "@type": "Person",
    name: ARTICLE.author,
    jobTitle: ARTICLE.authorRole,
  },
  publisher: { "@type": "LegalService", name: "Lazarègue Avocats" },
  citation: NOTES.map((n) => n.text),
};

/** Rend un bloc de contenu selon son type. */
function RenduBloc({ bloc }: { bloc: Bloc }) {
  switch (bloc.t) {
    case "h3":
      return <h3>{bloc.x}</h3>;
    case "p":
      return <p className={styles.p}>{bloc.x}</p>;
    case "lead":
      return (
        <p className={styles.lead}>
          <span className={styles.leadK}>{bloc.lead}</span>
          {bloc.x}
        </p>
      );
    case "quote":
      return <p className={styles.quote}>{bloc.x}</p>;
    case "def":
      return (
        <div className={styles.def}>
          <div className={styles.defK}>Définition</div>
          {bloc.defs.map((d) => (
            <p key={d.term}>
              <span className={styles.defTerme}>{d.term} — </span>
              {d.def}
            </p>
          ))}
        </div>
      );
    case "cta":
      return (
        <a href="#contact" className={styles.cta}>
          <span className={styles.ctaTexte}>{bloc.x}</span>
          <span className={styles.ctaLabel}>{bloc.ctaLabel} →</span>
        </a>
      );
  }
}

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* En-tête */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.fil}>
            <a href="/blog">Analyses</a>
            <span aria-hidden>/</span>
            <span className={styles.filActif}>{ARTICLE.domain}</span>
          </div>
          <div className={styles.tags}>
            <span className={styles.tagRegistre}>{ARTICLE.registre}</span>
            <time className={styles.tagDate} dateTime={ARTICLE.dateISO}>
              {ARTICLE.date}
            </time>
          </div>
          <h1>{ARTICLE.h1}</h1>
          <p className={styles.sub}>{ARTICLE.sub}</p>
          <div className={styles.meta}>
            <div className={styles.auteur}>
              <div className={styles.sigle} aria-hidden>
                AL
              </div>
              <div>
                <div className={styles.auteurNom}>{ARTICLE.author}</div>
                <div className={styles.auteurRole}>{ARTICLE.authorRole}</div>
              </div>
            </div>
            <span className={styles.duree}>{ARTICLE.read} de lecture</span>
          </div>
          <div className={styles.actions}>
            <Partager />
          </div>
        </div>
      </header>

      {/* Corps */}
      <div className={styles.corps} id="article-corps">
        <Plan />

        <article className={styles.article}>
          <div className={styles.essentiel}>
            <div className={styles.essentielK}>L&apos;essentiel</div>
            {ESSENTIEL.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2>
                <span className={styles.sectionNum}>{s.num || "§"}</span>
                <span>{s.h2}</span>
              </h2>
              <div className={styles.sectionBar} aria-hidden />
              <div className={styles.sectionCorps}>
                {s.blocks.map((b, i) => (
                  <RenduBloc key={i} bloc={b} />
                ))}
              </div>
            </section>
          ))}

          {/* Tableau récapitulatif */}
          <section id="tableau" className={styles.tableau}>
            <h2>Tableau récapitulatif — la répartition des obligations</h2>
            <div className={styles.table}>
              <div className={styles.tableHead}>
                <span>Opérateur</span>
                <span>Obligations principales</span>
                <span>Fondement</span>
              </div>
              {TABLE_ROWS.map((r) => (
                <div key={r.role} className={styles.tableRow}>
                  <div className={styles.tableRole}>{r.role}</div>
                  <div className={styles.tableObl}>{r.obl}</div>
                  <div className={styles.tableArt}>{r.art}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className={styles.conclusion}>
            <h2>Conclusion</h2>
            <div className={styles.conclusionBar} aria-hidden />
            {CONCLUSION.map((p, i) => (
              <p key={i} className={styles.p}>
                {p}
              </p>
            ))}
          </section>

          {/* Bloc auteur / CTA */}
          <div id="contact" className={styles.contact}>
            <div className={styles.contactK}>
              Qu&apos;est-ce que ça change pour vous, et à partir de quand ?
            </div>
            <p>
              Qualification de vos systèmes, cartographie de vos rôles, sécurisation
              contractuelle de la chaîne de valeur : le cabinet accompagne votre mise
              en conformité AI Act avant le 2 août 2026.
            </p>
            <div className={styles.contactCta}>
              <a href="/contact" className={styles.ctaSolid}>
                Nous écrire
              </a>
              <a href="/nos-domaines/ia-act" className={styles.ctaGhost}>
                Nos expertises IA
              </a>
            </div>
          </div>

          {/* Notes */}
          <section className={styles.notes}>
            <div className={styles.notesK}>Notes</div>
            <p className={styles.avertissement}>{AVERTISSEMENT}</p>
            <div className={styles.notesListe}>
              {NOTES.map((n) => (
                <div key={n.i} className={styles.note}>
                  <span className={styles.noteNum}>{n.i}</span>
                  <p>{n.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>

      {/* Pour aller plus loin */}
      <section className={styles.related}>
        <div className={styles.relatedInner}>
          <div className={styles.relatedK}>
            <span>Pour aller plus loin · {ARTICLE.domain}</span>
          </div>
          <div className={styles.relatedGrid}>
            {RELATED.map((r) => (
              <a key={r.title} href={r.href} className={styles.relatedCard}>
                <span className={styles.relatedDomain}>{r.domain}</span>
                <h3>{r.title}</h3>
                <span className={styles.relatedRead}>{r.read} · Lire →</span>
                <div className={styles.relatedBar} aria-hidden />
              </a>
            ))}
          </div>

          <Abonnement />
        </div>
      </section>
    </main>
  );
}
