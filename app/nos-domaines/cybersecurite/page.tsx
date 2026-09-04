import type { Metadata } from "next";
import PilierClient from "./PilierClient";
import { FAQ_ITEMS } from "./faq";

const TITLE = "Avocat en cybersécurité à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Cyberattaque, violation de données, conformité NIS 2, responsabilité du prestataire informatique : cabinet d'avocats en cybersécurité à Paris.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Canonical relatif : résolu contre `metadataBase` (NEXT_PUBLIC_SITE_URL,
  // défini dans app/layout.tsx). Jamais de domaine écrit en dur ici.
  alternates: { canonical: "/nos-domaines/cybersecurite" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/cybersecurite",
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
      name: "Avocat en cybersécurité — Lazarègue Avocats",
      description:
        "Cabinet d'avocats en cybersécurité à Paris : réponse à cyberattaque, violation de données, conformité NIS 2, responsabilité du prestataire informatique. Analyse juridique et audit technique menés ensemble.",
      url: "https://lazaregue-avocats.fr/nos-domaines/cybersecurite",
      telephone: "+33181706200",
      areaServed: "FR",
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 rue de Tilsitt",
        addressLocality: "Paris",
        postalCode: "75017",
        addressCountry: "FR",
      },
      serviceType:
        "Réponse à incident cyber, violation de données personnelles, conformité NIS 2, responsabilité du prestataire informatique",
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
      <PilierClient />
    </>
  );
}
