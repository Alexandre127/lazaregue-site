import type { Metadata } from "next";
import ContratsInformatiquesClient from "./ContratsInformatiquesClient";
import { FAQ_ITEMS } from "./faq";

/**
 * Paris figure dans le title, le h1 et la pastille du héro ; le corps de page
 * précise que le cabinet intervient sur l'ensemble du territoire. Le titre vise
 * la double cible client / prestataire et l'ensemble des contrats IT.
 */
const TITLE =
  "Avocat contrats informatiques et projets IT à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Avocat en contrats informatiques à Paris : négociation, audit et contentieux des projets logiciels, SaaS, cloud, maintenance et infogérance. PME, ETI, prestataires.";

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

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/contrats-informatiques";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat en contrats informatiques et projets IT — Lazarègue Avocats",
      description:
        "Audit, rédaction et négociation de contrats IT, SaaS, cloud et infogérance : clause de sauvegarde, réversibilité, SLA, limitation de responsabilité, interdépendance des contrats.",
      url: `${URL_BASE}${PATH}`,
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Contrat informatique, SaaS et cloud, infogérance, réversibilité, SLA, clause limitative de responsabilité, audit et négociation de contrats IT",
      provider: { "@id": `${URL_BASE}/#cabinet` },
    },
    ...AVOCATS.map((a) => ({
      "@type": "Person",
      name: a.name,
      honorificPrefix: "Maître",
      jobTitle: a.jobTitle,
      knowsAbout: a.knowsAbout,
      worksFor: { "@id": `${URL_BASE}/#cabinet` },
      url: `${URL_BASE}/le-cabinet`,
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Contrats informatiques et projets IT", item: `${URL_BASE}${PATH}` },
      ],
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
      <ContratsInformatiquesClient />
    </>
  );
}
