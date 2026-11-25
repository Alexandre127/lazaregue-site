import type { Metadata } from "next";
import NoteBanques from "./NoteBanques";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/ressources/fraude-par-manipulation-banques-2026-2028";
const SLUG = "fraude-par-manipulation-banques-2026-2028";

// Titre < 60 caractères : le suffixe « | Lazarègue Avocats » dépasserait la
// limite, il est donc omis (règle CLAUDE.md).
const TITLE = "Fraude par manipulation : ce qui change pour les banques";
const DESCRIPTION =
  "CJUE du 15 octobre 2026, arrêts de la Cour de cassation, futur règlement : la charge de la fraude par manipulation se déplace vers les banques. Note à télécharger.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Lazarègue Avocats",
    images: [{ url: `/ressources/og/${SLUG}`, width: 1200, height: 630, alt: "Lazarègue Avocats — Observatoire des obligations techniques des banques" }],
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `/ressources/og/${SLUG}`, alt: "Lazarègue Avocats — Observatoire des obligations techniques des banques" }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Fraude par manipulation : ce qui change pour les banques entre 2026 et 2028",
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      datePublished: "2026-11-01",
      dateModified: "2026-11-01",
      mainEntityOfPage: `${URL_BASE}${PATH}`,
      author: {
        "@type": "Person",
        name: "Alexandre Lazarègue",
        jobTitle: "Avocat au barreau de Paris",
        url: `${URL_BASE}/le-cabinet`,
      },
      publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
        { "@type": "ListItem", position: 3, name: "Fraude par manipulation : ce qui change pour les banques", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <NoteBanques />
    </>
  );
}
