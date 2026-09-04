import type { Metadata } from "next";
import RgpdClient from "./RgpdClient";
import { FAQ_ITEMS } from "./faq";

/**
 * La page n'avait ni titre ni description propres : composant client, elle
 * héritait des métadonnées du site. Le titre vise désormais l'intention
 * transactionnelle (« avocat RGPD », « audit », « due diligence ») plutôt que
 * le terme « RGPD » seul, verrouillé par la CNIL et les grands cabinets.
 */
const TITLE =
  "Avocat RGPD : audit, due diligence M&A et conformité des données personnelles | Lazarègue Avocats";
const DESCRIPTION =
  "Contrôle CNIL, levée de fonds, sous-traitance article 28, IA générative : le RGPD comme système de preuve. Audit, registre, contrats et gouvernance pour PME et ETI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/rgpd-donnees" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/rgpd-donnees",
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
      name: "Avocat RGPD & données personnelles — Lazarègue Avocats",
      description:
        "Audit de conformité RGPD, registre des traitements, contrats de sous-traitance article 28, due diligence M&A et encadrement des usages d'IA générative.",
      url: "https://lazaregue-avocats.fr/nos-domaines/rgpd-donnees",
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Audit RGPD, due diligence RGPD M&A, contrat sous-traitant article 28, AIPD, gouvernance des données, RGPD et IA générative",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
    },
    {
      /* Renforce l'E-E-A-T : la personne qui porte l'expertise est identifiée. */
      "@type": "Person",
      name: "Sarah Hinderer",
      honorificPrefix: "Maître",
      jobTitle: "Avocate — données personnelles et intelligence artificielle",
      worksFor: { "@type": "LegalService", name: "Lazarègue Avocats" },
      knowsAbout: [
        "RGPD",
        "Données personnelles",
        "Intelligence artificielle",
        "Due diligence M&A",
        "Contrôle CNIL",
      ],
      url: "https://lazaregue-avocats.fr/le-cabinet",
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
      <RgpdClient />
    </>
  );
}
