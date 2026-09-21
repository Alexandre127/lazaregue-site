import type { Metadata } from "next";
import styles from "./ressources.module.css";
import RessourcesIndex from "./_components/RessourcesIndex";
import { DOM_LABEL } from "./data/ressources-index";

const TITLE = "Ressources en droit du numérique pour les entreprises | Lazarègue Avocats";
const DESCRIPTION =
  "Repères juridiques pour les entreprises : RGPD, IA et AI Act, cybersécurité et NIS 2, fraudes bancaires, contrats informatiques, contentieux et retrait de contenus.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ressources" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ressources",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ressources — Lazarègue Avocats",
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  isPartOf: {
    "@type": "WebSite",
    name: "Lazarègue Avocats",
    url: "https://lazaregue-avocats.fr",
  },
  about: Object.values(DOM_LABEL),
  publisher: {
    "@type": "LegalService",
    name: "Lazarègue Avocats",
    areaServed: { "@type": "Country", name: "France" },
    founder: {
      "@type": "Person",
      name: "Alexandre Lazarègue",
      jobTitle: "Avocat au barreau de Paris",
    },
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ domaine?: string }>;
}) {
  const { domaine } = await searchParams;
  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <RessourcesIndex initialDomaine={domaine} />
    </main>
  );
}
