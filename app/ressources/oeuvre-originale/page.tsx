import type { Metadata } from "next";
import Image from "next/image";
import styles from "./article.module.css";
import {
  ARTICLE,
  CHECKLIST,
  DOSSIER,
  FAQ,
  RELATED,
  SECTIONS,
  type Bloc,
} from "../data/oeuvre-originale";
import GrilleForm from "./_components/GrilleForm";
import Sommaire from "./_components/Sommaire";

export const metadata: Metadata = {
  title: `${ARTICLE.h1} | Lazarègue Avocats`,
  description: ARTICLE.chapo,
  alternates: { canonical: `/ressources/${ARTICLE.slug}` },
  openGraph: {
    title: ARTICLE.h1,
    description: ARTICLE.chapo,
    url: `/ressources/${ARTICLE.slug}`,
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "article",
    publishedTime: ARTICLE.dateISO,
    images: [ARTICLE.cover.src],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE.h1,
    description: ARTICLE.chapo,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: ARTICLE.h1,
      description: ARTICLE.chapo,
      datePublished: ARTICLE.dateISO,
      inLanguage: "fr-FR",
      author: {
        "@type": "Person",
        name: "Alexandre Lazarègue",
        jobTitle: "Avocat au barreau de Paris",
      },
      publisher: { "@type": "LegalService", name: "Lazarègue Avocats" },
      about: ARTICLE.domain,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/** Rend un bloc de contenu selon son type. */
function RenduBloc({ bloc }: { bloc: Bloc }) {
  switch (bloc.t) {
    case "h3":
      return <h3>{bloc.x}</h3>;
    case "p":
      return <p className={styles.p}>{bloc.x}</p>;
    case "bullet":
      return (
        <div className={styles.puce}>
          <span aria-hidden>▪</span>
          <p>{bloc.x}</p>
        </div>
      );
    case "case":
      return (
        <div className={styles.cas}>
          <span className={styles.casLead}>{bloc.lead}</span>
          <p className={styles.casTexte}>{bloc.x}</p>
        </div>
      );
    case "note":
      return (
        <div className={styles.note}>
          <div className={styles.noteK}>Bon à savoir</div>
          <p>{bloc.x}</p>
        </div>
      );
    case "pratique":
      return (
        <div className={styles.pratique}>
          <div className={styles.pratiqueK}>{bloc.lead}</div>
          <p>{bloc.x}</p>
        </div>
      );
    case "midcta":
      return (
        <a href={`#${DOSSIER.id}`} className={styles.midcta}>
          <p className={styles.midctaTexte}>{bloc.x}</p>
          <span className={styles.midctaLien}>{bloc.lead} →</span>
        </a>
      );
    case "img":
      return (
        <figure className={styles.figure}>
          <div className={styles.figureImg}>
            <Image src={bloc.src} alt={bloc.cap} fill sizes="(max-width: 960px) 100vw, 720px" />
          </div>
          <figcaption className={styles.figureCap}>
            <span>{bloc.cap}</span>
            <a href={bloc.capHref} className={styles.figureCapLien}>
              {bloc.capLabel} →
            </a>
          </figcaption>
        </figure>
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
            <a href="/ressources">Ressources</a>
            <span aria-hidden>/</span>
            <span className={styles.filActif}>{ARTICLE.domain}</span>
          </div>
          <div className={styles.tags}>
            <span className={styles.tagOutline}>{ARTICLE.domain}</span>
            <span className={styles.tagPlain}>Repère</span>
          </div>
          <h1>{ARTICLE.h1}</h1>
          <p className={styles.chapo}>{ARTICLE.chapo}</p>
          <div className={styles.meta}>
            <div className={styles.auteur}>
              <div className={styles.sigle} aria-hidden>
                <i />
                <i />
                <i />
              </div>
              <div>
                <div className={styles.auteurNom}>Alexandre Lazarègue</div>
                <div className={styles.auteurRole}>Avocat au barreau de Paris</div>
              </div>
            </div>
            <div className={styles.metaItem}>
              <time dateTime={ARTICLE.dateISO}>{ARTICLE.date}</time>
            </div>
            <div className={styles.metaItem}>{ARTICLE.read} de lecture</div>
          </div>
        </div>
      </header>

      {/* Couverture */}
      <div className={styles.couverture}>
        <figure className={styles.couvertureFigure}>
          <div className={styles.couvertureImg}>
            <Image
              src={ARTICLE.cover.src}
              alt={ARTICLE.cover.alt}
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 928px"
            />
          </div>
          <figcaption className={styles.legende}>{ARTICLE.cover.cap}</figcaption>
        </figure>
      </div>

      {/* Corps */}
      <div className={styles.corps}>
        <Sommaire />

        <article className={styles.article}>
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2>{s.h2}</h2>
              <div className={styles.sectionBar} aria-hidden />
              {s.blocks.map((b, i) => (
                <RenduBloc key={i} bloc={b} />
              ))}

              {/* La check-list s'intercale avant la conclusion, comme au sommaire */}
              {s.id === "proteger" ? (
                <section id={DOSSIER.id} className={styles.dossier}>
                  <h2>{DOSSIER.h2}</h2>
                  <div className={styles.sectionBar} aria-hidden />
                  <p className={styles.dossierIntro}>{DOSSIER.intro}</p>
                  {CHECKLIST.map((c, i) => (
                    <div key={c} className={styles.checkItem}>
                      <span className={styles.checkNum}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p>{c}</p>
                    </div>
                  ))}
                  <GrilleForm />
                </section>
              ) : null}
            </section>
          ))}

          {/* Bloc auteur / CTA */}
          <div className={styles.auteurBloc}>
            <div className={styles.auteurBlocK}>Votre situation</div>
            <p>{ARTICLE.ctaText}</p>
            <a href="/contact" className={styles.auteurBlocCta}>
              Décrire ma situation →
            </a>
          </div>

          {/* FAQ */}
          <section className={styles.faq}>
            <h2>Questions fréquentes</h2>
            {FAQ.map((f) => (
              <div key={f.q} className={styles.faqItem}>
                <p className={styles.faqQ}>{f.q}</p>
                <p className={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </section>
        </article>
      </div>

      {/* Sur le même sujet */}
      <section className={styles.related}>
        <div className={styles.relatedInner}>
          <div className={styles.relatedK}>Sur le même sujet</div>
          <div className={styles.relatedGrid}>
            {RELATED.map((r) => (
              <a key={r.title} href="#" className={styles.relatedCard}>
                <span className={styles.relatedDomain}>{r.domain}</span>
                <p className={styles.relatedTitre}>{r.title}</p>
                <span className={styles.relatedRead}>{r.read}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
