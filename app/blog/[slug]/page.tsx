import type { Metadata } from "next";
import { ARTICLES, DEFAULT_SLUG } from "./articles-data";
import ArticleClient from "./article-client";

/**
 * La route était un composant client sans métadonnées : chaque article
 * héritait du titre et de la description du gabarit racine. Elle est
 * désormais servie par ce composant serveur, qui dérive title, description et
 * canonical des données de l'article ; la partie interactive (sommaire actif,
 * survols) vit dans le composant client enfant.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug] ?? ARTICLES[DEFAULT_SLUG];

  const title = `${article.title} | Lazarègue Avocats`;
  const description = article.chapo;
  const url = `/blog/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      url,
      siteName: "Lazarègue Avocats",
      locale: "fr_FR",
      type: "article",
    },
    twitter: { card: "summary_large_image", title: article.title, description },
  };
}

export default function Page() {
  return <ArticleClient />;
}
