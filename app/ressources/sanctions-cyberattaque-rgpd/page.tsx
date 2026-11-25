import type { Metadata } from "next";
import RapportCyber from "./RapportCyber";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/ressources/sanctions-cyberattaque-rgpd";
const OG = "/og-rapport-cyberattaque-sanction.jpg"; // couverture du rapport (page 1)

// Titre repris du brief (dépasse la limite usuelle de 60 car. ; à ajuster après
// vérification Ahrefs, comme indiqué dans le brief).
const TITLE = "Sanction après une cyberattaque : étude de 139 décisions européennes | Lazarègue Avocats";
const DESCRIPTION =
  "Une entreprise piratée peut-elle être sanctionnée ? Étude comparée de 139 décisions rendues dans 20 pays européens : défauts reprochés, montants, délais. Rapport en accès libre.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Lazarègue Avocats",
    images: [{ url: OG, width: 1200, height: 630, alt: "Rapport « Après la cyberattaque, la sanction » — Lazarègue Avocats" }],
    locale: "fr_FR",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG, alt: "Rapport « Après la cyberattaque, la sanction » — Lazarègue Avocats" }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Report",
      name: "Après la cyberattaque, la sanction",
      headline: "Après la cyberattaque, la sanction : étude de 139 décisions européennes",
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      datePublished: "2026-11-26",
      dateModified: "2026-11-26",
      mainEntityOfPage: `${URL_BASE}${PATH}`,
      image: `${URL_BASE}${OG}`,
      author: { "@type": "Organization", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
      publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
        { "@type": "ListItem", position: 3, name: "Après la cyberattaque, la sanction", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <RapportCyber />
    </>
  );
}
