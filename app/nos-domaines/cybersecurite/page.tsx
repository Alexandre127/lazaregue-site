import type { Metadata } from "next";
import { CyberV4 } from "./CyberV4";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/cybersecurite";

const TITLE = "Avocat en cybersécurité à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Avocat en cybersécurité à Paris pour les entreprises : prévention, cyberattaque, contrats, assurance et recours. Échangez avec Lazarègue Avocats.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat en cybersécurité — Lazarègue Avocats",
      description:
        "Obligations de sécurité, contrats informatiques, gestion juridique d'incident, notifications, NIS 2 et contentieux. Intervention avec un expert en cybersécurité.",
      url: `${URL_BASE}${PATH}`,
      areaServed: { "@type": "Country", name: "France" },
      serviceType: "Cybersécurité, gestion d'incident, NIS 2, contrats de sécurité informatique, contentieux",
      provider: { "@id": `${URL_BASE}/#cabinet` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Cybersécurité", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <CyberV4 />
    </>
  );
}
