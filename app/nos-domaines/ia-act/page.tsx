import type { Metadata } from "next";
import IaActClient from "./IaActClient";
import { FAQ_TEXTE } from "./faq-texte";

/**
 * « AI Act » seul est un terme éditorial, capté par la presse et les
 * institutions. Le titre vise l'intention de service (« avocat »,
 * « conformité », « gouvernance IA »).
 */
const TITLE = "Avocat AI Act : conformité et gouvernance IA | Lazarègue Avocats";
const DESCRIPTION =
  "Audit AI Act, cartographie des systèmes, charte IA, contrats et gouvernance. Le cabinet accompagne les PME et ETI dans leur mise en conformité.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/ia-act" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/ia-act",
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
      name: "Avocat AI Act & intelligence artificielle — Lazarègue Avocats",
      description:
        "Qualification des systèmes d'IA au sens du règlement (UE) 2024/1689, documentation technique, supervision humaine, encadrement contractuel des fournisseurs et articulation avec le RGPD et le droit du travail.",
      url: "https://lazaregue-avocats.fr/nos-domaines/ia-act",
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Conformité AI Act, qualification haut risque, documentation technique IA, gouvernance IA, contrats fournisseurs IA, IA et droit du travail",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_TEXTE.map((f) => ({
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
      <IaActClient />
    </>
  );
}
