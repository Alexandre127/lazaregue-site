import type { Metadata } from "next";
import DiffamationClient from "./DiffamationClient";
import { FAQ_ITEMS } from "./faq";

/**
 * Le titre reprend les actions que le visiteur tape lui-même — diffamation,
 * retrait de contenus — plutôt qu'un intitulé de rubrique. Paris figure dans
 * le title, le h1 et la pastille du héro ; le corps de page précise que le
 * cabinet intervient sur l'ensemble du territoire.
 */
const TITLE =
  "Avocat diffamation et retrait de contenus en ligne à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Avocat à Paris en diffamation et retrait de contenus en ligne : notification opposable, référé de retrait, déréférencement Google, faux avis, identification d'auteurs anonymes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/diffamation-retrait-de-contenus" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/diffamation-retrait-de-contenus",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat diffamation et retrait de contenus en ligne — Lazarègue Avocats",
      description:
        "Notification opposable au visa de la LCEN, référé de retrait, déréférencement Google, suppression de faux avis, identification d'auteurs anonymes et défense de la réputation en ligne des entreprises et des personnes.",
      url: "https://lazaregue-avocats.fr/nos-domaines/diffamation-retrait-de-contenus",
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Retrait de contenu illicite, déréférencement, droit à l'oubli, suppression de faux avis, identification d'auteur anonyme, diffamation et e-réputation",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
      <DiffamationClient />
    </>
  );
}
