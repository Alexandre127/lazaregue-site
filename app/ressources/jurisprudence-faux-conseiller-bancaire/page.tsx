import type { Metadata } from "next";
import Observatoire from "./Observatoire";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/ressources/jurisprudence-faux-conseiller-bancaire";

const TITLE = "Arnaque au faux conseiller bancaire : la jurisprudence";
const DESCRIPTION =
  "Faux conseiller bancaire, SMS frauduleux, spoofing : ce que les juges ont décidé sur le remboursement des victimes. Décisions résumées par le cabinet.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Lazarègue Avocats",
    images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Observatoire de la fraude bancaire — faux conseiller bancaire",
      headline:
        "Arnaque au faux conseiller bancaire : votre banque peut être condamnée à rembourser",
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      isPartOf: `${URL_BASE}/ressources`,
      mainEntityOfPage: `${URL_BASE}${PATH}`,
      dateModified: "2026-10-02",
      about: { "@type": "Thing", name: "Fraude bancaire et faux conseiller bancaire" },
      publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Fraude bancaire et escroquerie",
          item: `${URL_BASE}/nos-domaines/escroquerie-fraude-bancaire`,
        },
        { "@type": "ListItem", position: 4, name: "Observatoire", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Observatoire />
    </>
  );
}
