import type { Metadata } from "next";
import styles from "./le-cabinet.module.css";
import { CABINET } from "./data/liens";
import CadreConfiance from "./_components/CadreConfiance";
import CharteClient from "./_components/CharteClient";
import Credo from "./_components/Credo";
import CtaFinal from "./_components/CtaFinal";
import EquipeAvocats from "./_components/EquipeAvocats";
import ExpertsTechniques from "./_components/ExpertsTechniques";
import Hero from "./_components/Hero";
import Honoraires from "./_components/Honoraires";
import { MethodTransitionOverlay } from "./_components/MethodTransition";
import PortailSection from "./_components/PortailSection";
import ReadingRail from "./_components/ReadingRail";
import ScrollProgress from "./_components/ScrollProgress";

const TITLE =
  "Le cabinet — Lazarègue Avocats | Cabinet d'avocats en droit du numérique et nouvelles technologies";
const DESCRIPTION =
  "Cabinet d'avocats en nouvelles technologies et droit du numérique à Paris. Contentieux, conformité, contrats et gestion de crise pour les PME et ETI. Honoraires au forfait, suivi de dossier en ligne.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/le-cabinet" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/le-cabinet",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lazarègue Avocats",
  description: DESCRIPTION,
  url: "https://lazaregue-avocats.fr/le-cabinet",
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
    "Cybersécurité et NIS 2",
    "RGPD et protection des données",
    "Intelligence artificielle et AI Act",
    "Contrats informatiques",
    "Cybercriminalité et fraude numérique",
    "Plateformes, médias et réseaux sociaux",
  ],
  foundingDate: "2016",
};

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <ScrollProgress />
      <ReadingRail />
      <MethodTransitionOverlay />

      <Hero />
      <CharteClient />
      <div className={styles.rule} />
      <PortailSection />
      <div className={styles.rule} />
      <Honoraires />
      <div className={styles.rule} />
      <EquipeAvocats />
      <div className={styles.rule} />
      <ExpertsTechniques />
      <CadreConfiance />
      <Credo />
      <CtaFinal />
    </main>
  );
}
