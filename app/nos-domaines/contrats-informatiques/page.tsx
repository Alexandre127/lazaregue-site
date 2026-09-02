import type { Metadata } from "next";
import { AVIS } from "@/lib/avis";
import ContratsInformatiquesClient from "./ContratsInformatiquesClient";
import { FAQ_ITEMS } from "./faq";

/**
 * « Contrats informatiques » seul est une requête très disputée par les grands
 * cabinets parisiens. Le titre y ajoute donc ce que les visiteurs tapent
 * réellement quand le problème est déjà là — contentieux, perte de données,
 * résiliation — et la double cible client / prestataire.
 */
const TITLE =
  "Avocat contrats informatiques & contentieux IT — PME, ETI et prestataires | Lazarègue Avocats";
const DESCRIPTION =
  "Perte de données, projet qui dérape, réversibilité cloud, résiliation contestée : nous sécurisons vos contrats IT et défendons vos intérêts en contentieux. Sauvegarde, SLA, clause limitative.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/contrats-informatiques" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/contrats-informatiques",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** Les trois avocats qui portent réellement la matière — signal E-E-A-T. */
const AVOCATS = [
  {
    name: "Alexandre Lazarègue",
    jobTitle: "Avocat — droit du numérique et cybersécurité",
    knowsAbout: ["Contrats informatiques", "Cybersécurité", "Contentieux IT"],
  },
  {
    name: "Amir Ben Majed",
    jobTitle: "Avocat — contrats informatiques et contentieux IT",
    knowsAbout: ["Contrats informatiques", "Responsabilité contractuelle", "Preuve technique"],
  },
  {
    name: "Sarah Hinderer",
    jobTitle: "Avocate — données personnelles et intelligence artificielle",
    knowsAbout: ["RGPD", "Données personnelles", "Sous-traitance article 28"],
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat contrats informatiques & contentieux IT — Lazarègue Avocats",
      description:
        "Audit et rédaction de contrats IT, SaaS, cloud et infogérance : clause de sauvegarde, réversibilité, SLA, limitation de responsabilité, interdépendance des contrats. Défense en contentieux informatique.",
      url: "https://lazaregue-avocats.fr/nos-domaines/contrats-informatiques",
      areaServed: "FR",
      serviceType:
        "Contrat informatique, contentieux IT, perte de données, réversibilité cloud, SLA, clause limitative de responsabilité, résiliation de contrat IT",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: AVIS.noteNum,
        reviewCount: String(AVIS.nombre),
        bestRating: "5",
      },
    },
    ...AVOCATS.map((a) => ({
      "@type": "Person",
      name: a.name,
      honorificPrefix: "Maître",
      jobTitle: a.jobTitle,
      knowsAbout: a.knowsAbout,
      worksFor: { "@type": "LegalService", name: "Lazarègue Avocats" },
      url: "https://lazaregue-avocats.fr/le-cabinet",
    })),
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
      <ContratsInformatiquesClient />
    </>
  );
}
