import type { Metadata } from "next";
import IaActClient from "./IaActClient";
import { FAQ_TEXTE } from "./faq-texte";

/**
 * « AI Act » seul est un terme éditorial, capté par la presse et les
 * institutions. Le titre vise donc l'intention de service (« avocat »,
 * « mise en conformité ») et couvre au passage l'appellation française
 * « RIA », de plus en plus utilisée dans les textes et les appels d'offres.
 */
const TITLE =
  "Avocat AI Act (RIA) : mise en conformité et gouvernance de l'intelligence artificielle | Lazarègue Avocats";
const DESCRIPTION =
  "Qualification de vos systèmes d'IA, documentation technique, supervision humaine, contrats fournisseurs et consultation du CSE. Le règlement européen sur l'IA appliqué aux PME et ETI.";

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
      areaServed: "FR",
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
