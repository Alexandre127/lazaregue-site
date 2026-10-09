import type { Metadata } from "next";
import { article, chemin } from "./articles";

/**
 * Métadonnées d'une ressource, tirées du registre : balise title (`seoTitle`),
 * meta description (`seoDescription`), URL canonique, Open Graph et Twitter avec
 * l'image de partage générée (/ressources/og/<slug>). Une page de test
 * (`publie: false`) reste en noindex/nofollow.
 */
export function metaArticle(slug: string): Metadata {
  const a = article(slug);
  const url = chemin(slug);
  const image = { url: `/ressources/og/${slug}`, width: 1200, height: 630, alt: a.title };
  return {
    title: a.seoTitle,
    description: a.seoDescription,
    alternates: { canonical: url },
    ...(a.publie ? {} : { robots: { index: false, follow: false } }),
    openGraph: { title: a.seoTitle, description: a.seoDescription, url, siteName: "Lazarègue Avocats", images: [image], locale: "fr_FR", type: "article" },
    twitter: { card: "summary_large_image", images: [image], title: a.seoTitle, description: a.seoDescription },
  };
}
