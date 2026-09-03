import type { Metadata } from "next";
import { AVIS } from "@/lib/avis";
import PlateformesClient from "./PlateformesClient";
import { FAQ_ITEMS } from "./faq";

/**
 * « Plateformes, médias & réseaux sociaux » décrit une rubrique du cabinet,
 * pas ce que cherche le visiteur. Le titre reprend les actions qu'il tape
 * lui-même — retrait de contenu, déréférencement, e-réputation — qui sont
 * aussi les seules requêtes à volume réel sur ce marché.
 */
const TITLE =
  "Avocat réseaux sociaux & plateformes : retrait de contenu, déréférencement Google, e-réputation | Lazarègue Avocats";
const DESCRIPTION =
  "Vous avez signalé, la plateforme a refusé. Notification opposable (LCEN, DSA), référé de retrait, déréférencement, identification d'auteur (art. 145 CPC), défense d'opérateur. Entreprises et particuliers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/competences/plateformes" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/competences/plateformes",
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
      name: "Avocat plateformes, réseaux sociaux & e-réputation — Lazarègue Avocats",
      description:
        "Retrait de contenu illicite, déréférencement de résultats Google, droit à l'oubli, identification d'auteur anonyme, récupération de compte suspendu, défense de marque sur les places de marché et défense des opérateurs de plateforme.",
      url: "https://lazaregue-avocats.fr/competences/plateformes",
      areaServed: "FR",
      serviceType:
        "Retrait de contenu illicite, déréférencement Google, droit à l'oubli, e-réputation, notification LCEN et DSA, article 145 CPC, défense d'hébergeur, contrefaçon de marque sur marketplace",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: AVIS.noteNum,
        reviewCount: String(AVIS.nombre),
        bestRating: "5",
      },
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
      <PlateformesClient />
    </>
  );
}
