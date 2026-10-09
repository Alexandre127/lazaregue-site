import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./article.module.css";
import ShareBar from "./ShareBar";
import TocSpy from "./TocSpy";
import ArticleMobileNav from "./ArticleMobileNav";
import ArticleCollapsibles from "./ArticleCollapsibles";
import ArticleFaq from "./ArticleFaq";
import ReadingProgress from "./ReadingProgress";
import { DOM_LABEL, aLireAussi, article, chemin, moisAnnee } from "../../data/articles";
import { minutesDeLecture } from "../../data/lecture";

export type TocItem = { id: string; label: string };

const URL_BASE = "https://lazaregue-avocats.fr";
const ROLE = "Avocat au Barreau de Paris";

/** Texte brut d'un titre JSX (pour le sommaire). */
function texte(n: ReactNode): string {
  if (n == null || typeof n === "boolean") return "";
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (Array.isArray(n)) return n.map(texte).join("");
  if (isValidElement(n)) return texte((n as ReactElement<{ children?: ReactNode }>).props.children);
  return "";
}

const deuxChiffres = (n: number) => String(n).padStart(2, "0");

/**
 * Gabarit d'article de ressources (refonte du 9 octobre 2026, maquette
 * docs/maquettes/article_mobile_maquette.html).
 *
 * La page passe son `slug` et son corps en `children`. Tout le reste vient du
 * registre (data/articles.ts) : fil d'Ariane, sur-titre, H1, chapô, auteur,
 * date réelle, « L'essentiel », FAQ, « À lire aussi », données structurées.
 * Le SOMMAIRE est généré à partir des <h2> placés directement dans le corps :
 * ils sont numérotés 01, 02… et reçoivent une ancre (leur `id`, ou « section-n »).
 * `pied` reçoit ce qui suit les suggestions (sources). `after` remplace l'appel
 * final par défaut.
 *
 * Voir docs/CHARTE-SITE.md § « Rédiger un nouvel article ».
 */
export default function ArticleLayout({
  slug,
  children,
  pied,
  after,
  mobileCta,
}: {
  slug: string;
  children: ReactNode;
  pied?: ReactNode;
  after?: ReactNode;
  mobileCta?: { href: string; label: string };
}) {
  const a = article(slug);
  const domaine = DOM_LABEL[a.dom];
  const url = chemin(slug);
  const minutes = minutesDeLecture(slug);
  const maj = moisAnnee(a.miseAJour);
  const suggestions = aLireAussi(slug);

  /* Sommaire + numérotation, à partir des <h2> du corps. */
  const toc: TocItem[] = [];
  const corps = Children.toArray(children).map((el) => {
    if (!isValidElement(el) || el.type !== "h2") return el;
    const h2 = el as ReactElement<{ id?: string; children?: ReactNode }>;
    const n = toc.length + 1;
    const id = h2.props.id ?? `section-${n}`;
    toc.push({ id, label: texte(h2.props.children) });
    return (
      <h2 key={id} id={id}>
        <span className={styles.num} aria-hidden="true">{deuxChiffres(n)}</span>
        {h2.props.children}
      </h2>
    );
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.seoDescription,
        ...(a.miseAJour ? { dateModified: a.miseAJour } : {}),
        inLanguage: "fr-FR",
        mainEntityOfPage: `${URL_BASE}${url}`,
        image: `${URL_BASE}/ressources/og/${slug}`,
        author: { "@type": "Person", name: a.auteur, jobTitle: ROLE, url: `${URL_BASE}/le-cabinet` },
        publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
          { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
          { "@type": "ListItem", position: 3, name: domaine, item: `${URL_BASE}/ressources?domaine=${a.dom}` },
          { "@type": "ListItem", position: 4, name: a.title, item: `${URL_BASE}${url}` },
        ],
      },
      ...(a.faq.length
        ? [{ "@type": "FAQPage", mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
        : []),
    ],
  };

  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Progression de lecture (≥ 768 px) ; sous 768 px, la barre Sommaire
          collante de ArticleMobileNav la porte déjà. */}
      <ReadingProgress />
      <ArticleMobileNav toc={toc} cta={mobileCta} />
      {/* Blocs éditoriaux repliables sur mobile (desktop inchangé). */}
      <ArticleCollapsibles />

      {/* ================================ EN-TÊTE ========================== */}
      <section className={styles.aHero} aria-labelledby="h1">
        <div className={styles.col}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <Link href="/ressources">Ressources</Link> <span aria-hidden="true">/</span>{" "}
            <Link href={`/ressources?domaine=${a.dom}#liste`}>{domaine}</Link>
          </nav>
          <p className={styles.kicker}>{domaine} · {a.type}</p>
          <h1 id="h1">{a.title}</h1>
          {a.chapo ? <p className={styles.chapo}>{a.chapo}</p> : null}
          <div className={styles.byline}>
            <span className={styles.ava}>
              <Image src="/images/alexandre-pro.jpg" alt="" fill sizes="44px" style={{ objectFit: "cover" }} />
            </span>
            <div>
              <p className={styles.bylineName}>{a.auteur}</p>
              <p className={styles.bylineRole}>{ROLE}</p>
              {maj || minutes ? (
                <p className={styles.bylineDate}>
                  {[maj ? `Mis à jour · ${maj}` : null, minutes ? `${minutes} min` : null].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.aGrid}>
        <article className={styles.body}>
          {a.essentiel.length ? (
            <div className={styles.essentiel}>
              <p className={styles.essLabel}>L’essentiel</p>
              <ul>
                {a.essentiel.map((phrase) => (
                  <li key={phrase}>{phrase}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {toc.length ? (
            <details className={styles.tocM}>
              <summary>
                <span>Sommaire</span>
                <span className={styles.tocChev} aria-hidden="true" />
              </summary>
              <nav aria-label="Sommaire">
                {toc.map((t, i) => (
                  <a key={t.id} href={`#${t.id}`}>
                    <b aria-hidden="true">{deuxChiffres(i + 1)}</b>
                    {t.label}
                  </a>
                ))}
              </nav>
            </details>
          ) : null}

          {corps}

          {a.faq.length ? (
            <>
              <h2 className={styles.monoTitre} id="faq">Questions fréquentes</h2>
              <ArticleFaq items={a.faq} />
            </>
          ) : null}

          {suggestions.length ? (
            <nav className={styles.lire} aria-labelledby="lire-aussi">
              <h2 className={styles.monoTitre} id="lire-aussi">À lire aussi</h2>
              <ul>
                {suggestions.map((s) => (
                  <li key={s.slug}>
                    <Link href={chemin(s.slug)}>
                      <span className={styles.lireDom}>{DOM_LABEL[s.dom]}</span>
                      <span className={styles.lireTitre}>{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {pied}

          <ShareBar />
        </article>

        <TocSpy items={toc} />
      </div>

      {after ?? (
        <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
          <div className={styles.wrap}>
            <div className={styles.head}>
              <h2 className={styles.h2} id="h-cta">Faire examiner votre dossier</h2>
              <p className={styles.lead}>Un article expose les règles générales. Leur application dépend des faits, des pièces disponibles et des délais.</p>
            </div>
            <Link className={styles.btn} href="/contact">Échanger avec un avocat →</Link>
          </div>
        </section>
      )}
    </main>
  );
}
