import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./article.module.css";
import ShareBar from "./ShareBar";
import TocSpy from "./TocSpy";
import ArticleMobileNav from "./ArticleMobileNav";
import ArticleCollapsibles from "./ArticleCollapsibles";

export type TocItem = { id: string; label: string };
type Crumb = { href?: string; label: string };

/**
 * Gabarit d'article de ressources — modèle de référence (construit à partir de
 * l'article « Fraude bancaire »). Tout nouvel article utilise ce composant :
 * il fournit le fil d'Ariane, le sur-titre, le titre, le chapô, la signature,
 * la grille corps + sommaire (mobile `tocM` + aside `TocSpy` actif) et la barre
 * de partage. Le corps (introduction, « En bref », sections) est passé en
 * `children` ; `after` reçoit les sections placées après le corps (« Pour aller
 * plus loin », CTA…).
 *
 * Voir docs/CHARTE-SITE.md § « Rédiger un nouvel article ».
 */
export default function ArticleLayout({
  jsonLd,
  breadcrumb,
  kicker,
  h1,
  chapo,
  bylineName = "Me Alexandre Lazarègue",
  bylineRole = "Avocat au Barreau de Paris",
  bylineDate,
  toc,
  children,
  after,
  mobileCta,
}: {
  jsonLd?: object;
  breadcrumb: Crumb[];
  kicker: string;
  h1: ReactNode;
  chapo: ReactNode;
  bylineName?: string;
  bylineRole?: string;
  bylineDate: ReactNode;
  toc: TocItem[];
  children: ReactNode;
  after?: ReactNode;
  mobileCta?: { href: string; label: string };
}) {
  return (
    <main className={styles.page} id="contenu">
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}

      {/* Chrome mobile (barre Sommaire collante + panneau + barre d'action) —
          masqué en desktop par le CSS ; maquettes 05 / 06. */}
      <ArticleMobileNav toc={toc} cta={mobileCta} />
      {/* Blocs éditoriaux repliables sur mobile (desktop inchangé). */}
      <ArticleCollapsibles />

      {/* ================================ HERO ============================ */}
      <section className={styles.aHero} aria-labelledby="h1">
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            {breadcrumb.map((c, i) => {
              const last = i === breadcrumb.length - 1;
              return (
                <Fragment key={c.label}>
                  {c.href && !last ? (
                    <Link href={c.href}>{c.label}</Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined}>{c.label}</span>
                  )}
                  {!last ? (
                    <>
                      {" "}
                      <span aria-hidden>/</span>{" "}
                    </>
                  ) : null}
                </Fragment>
              );
            })}
          </nav>
          <p className={styles.kicker}>{kicker}</p>
          <h1 id="h1">{h1}</h1>
          <p className={styles.chapo}>{chapo}</p>
          <div className={styles.byline}>
            <span className={styles.ava}>
              <Image src="/images/alexandre-pro.jpg" alt="Portrait d'Alexandre Lazarègue" fill sizes="48px" style={{ objectFit: "cover" }} />
            </span>
            <div>
              <p className={styles.bylineName}>{bylineName}</p>
              <p className={styles.meta}>{bylineRole}</p>
            </div>
            <p className={`${styles.meta} ${styles.bylineDate}`}>{bylineDate}</p>
          </div>
        </div>
      </section>

      <div className={styles.aGrid}>
        <article className={styles.body}>
          <details className={styles.tocM}>
            <summary>Sommaire</summary>
            <nav aria-label="Sommaire">
              {toc.map((t) => (
                <a key={t.id} href={`#${t.id}`}>{t.label}</a>
              ))}
            </nav>
          </details>

          {children}

          <ShareBar />
        </article>

        <TocSpy items={toc} />
      </div>

      {after}
    </main>
  );
}
