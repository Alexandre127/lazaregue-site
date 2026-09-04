import type { Metadata } from "next";
import CybersecuriteClient from "./CybersecuriteClient";
import { FAQ_TEXTE } from "./faq-texte";

/**
 * Le titre vise l'intention de recherche (« NIS 2 PME », « sous-traitants »,
 * « mise en conformité ») plutôt que le seul terme « NIS 2 », sur lequel la
 * concurrence institutionnelle — ANSSI, Commission européenne — est hors de
 * portée. La longue traîne transactionnelle est le terrain jouable.
 */
const TITLE =
  "NIS 2 pour PME et sous-traitants : obligations et mise en conformité | Lazarègue Avocats";
const DESCRIPTION =
  "Votre client vous demande des garanties NIS 2 ? Obligations, secteurs concernés, clauses contractuelles et mise en conformité pour les PME et ETI sous-traitantes d'acteurs critiques.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/cybersecurite/nis2" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/cybersecurite/nis2",
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
      name: "Avocat NIS 2 — Lazarègue Avocats",
      description:
        "Accompagnement des PME et ETI sous-traitantes d'acteurs critiques : audit de conformité NIS 2, PSSI, clauses contractuelles de cybersécurité, gestion de crise.",
      url: "https://lazaregue-avocats.fr/nos-domaines/cybersecurite/nis2",
      areaServed: "FR",
      serviceType:
        "Mise en conformité NIS 2, audit cybersécurité, clause NIS 2 contrat, PSSI, gestion de crise cyber",
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
      <CybersecuriteClient />
    </>
  );
}
