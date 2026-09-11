import type { Metadata } from "next";
import styles from "./le-cabinet.module.css";
import { CABINET } from "./data/liens";
import Hero from "./_components/Hero";
import Dossiers from "./_components/Dossiers";
import Equipe from "./_components/Equipe";
import Engagements from "./_components/Engagements";
import Domaines from "./_components/Domaines";
import Portail from "./_components/Portail";
// La section « Contributions » est retirée du rendu tant que le contenu réel
// (publications, ouvrage, interventions, associations) n'est pas fourni : on
// n'affiche pas de cartes « à renseigner » en production (addendum au brief).
// Le composant, ses données et ses styles sont conservés pour réactivation.
// import Contributions from "./_components/Contributions";
import CtaFinal from "./_components/CtaFinal";

const TITLE = "Cabinet d'avocats en droit du numérique à Paris | Lazarègue";
const DESCRIPTION =
  "Cabinet d'avocats en droit du numérique à Paris : contentieux informatique, cybersécurité, RGPD, IA et contrats IT. Intervention dans toute la France.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/le-cabinet" },
  openGraph: {
    // Pas d'`images` : l'illustration OG 1200×630 reste à produire. On ne
    // pointe pas vers un fichier inexistant (brief).
    title: "Cabinet d'avocats en droit du numérique à Paris",
    description:
      "Contentieux informatique, cybersécurité, RGPD, IA et contrats IT. Avocats et intervenants techniques réunis.",
    url: "/le-cabinet",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet d'avocats en droit du numérique à Paris",
    description:
      "Contentieux informatique, cybersécurité, RGPD, IA et contrats IT. Avocats et intervenants techniques réunis.",
  },
};

/*
 * JSON-LD — LegalService (l'entité cabinet) + les trois avocats en `Person`
 * rattachés par `worksFor`. Jamais le type `Attorney` pour une personne : dans
 * schema.org c'est un sous-type de LegalService, donc une entité de service.
 *
 * Les `sameAs` (profils externes) sont OMIS tant que les URL ne sont pas
 * fournies : on n'invente pas d'adresse (brief).
 */
const CABINET_ID = "https://lazaregue-avocats.fr/#cabinet";

const AVOCATS = [
  {
    slug: "alexandre-lazaregue",
    name: "Alexandre Lazarègue",
    jobTitle: "Avocat au barreau de Paris",
    knowsAbout: [
      "Contentieux des plateformes",
      "Cybersécurité",
      "Données personnelles",
      "Propriété intellectuelle",
    ],
  },
  {
    slug: "amir-ben-majed",
    name: "Amir Ben Majed",
    jobTitle: "Avocat au barreau de l'Essonne",
    knowsAbout: ["Contrats IT", "Contentieux IT", "Responsabilité des prestataires"],
  },
  {
    slug: "sarah-hinderer",
    name: "Sarah Hinderer",
    jobTitle: "Avocate au barreau de Paris",
    knowsAbout: ["RGPD", "Protection des données", "Due diligence"],
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": CABINET_ID,
  name: "Lazarègue Avocats",
  url: "https://lazaregue-avocats.fr/",
  telephone: CABINET.telephone,
  email: CABINET.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 rue de Tilsitt",
    postalCode: "75017",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  areaServed: { "@type": "Country", name: "France" },
  knowsAbout: [
    "Droit du numérique",
    "Contentieux informatique",
    "Cybersécurité",
    "RGPD",
    "Intelligence artificielle",
    "Contrats IT",
    "Cybercriminalité",
    "M&A technologique",
  ],
  employee: AVOCATS.map((a) => ({
    "@type": "Person",
    "@id": `https://lazaregue-avocats.fr/le-cabinet/${a.slug}/#personne`,
    url: `https://lazaregue-avocats.fr/le-cabinet/${a.slug}/`,
    name: a.name,
    jobTitle: a.jobTitle,
    worksFor: { "@id": CABINET_ID },
    knowsAbout: a.knowsAbout,
  })),
};

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <Hero />
      <Dossiers />
      <Equipe />
      <Engagements />
      <Domaines />
      <Portail />
      {/* <Contributions /> — masquée jusqu'à réception du contenu réel (addendum). */}
      <CtaFinal />
    </main>
  );
}
