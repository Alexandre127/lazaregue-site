import DiagnosticShadowAI from "../_components/diagnostic-shadow-ai/DiagnosticShadowAI";
import { article, chemin } from "../data/articles";
import { metaArticle } from "../data/meta";

// Titre, description et canonique : registre data/articles.ts (outil).
// Contenu de l'outil : data/diagnostic-shadow-ai.ts.
const SLUG = "diagnostic-shadow-ai";
const URL_BASE = "https://lazaregue-avocats.fr";

export const metadata = metaArticle(SLUG);

export default function Page() {
  const a = article(SLUG);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: a.title,
        description: a.seoDescription,
        inLanguage: "fr-FR",
        url: `${URL_BASE}${chemin(SLUG)}`,
        dateModified: a.miseAJour,
        publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
          { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
          { "@type": "ListItem", position: 3, name: "Outils et observatoires", item: `${URL_BASE}/outils` },
          { "@type": "ListItem", position: 4, name: a.title, item: `${URL_BASE}${chemin(SLUG)}` },
        ],
      },
    ],
  };

  return (
    <main id="contenu" style={{ paddingTop: "var(--header-h)", background: "var(--navy)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DiagnosticShadowAI />
    </main>
  );
}
