import type { Metadata } from "next";
import { AVIS } from "@/lib/avis";
import { Header5 } from "@/components/home/header-05";
import { SectionCabinet } from "@/components/home/section-cabinet";
import SectionCompetences from "@/components/home/section-competences";
import { SectionDifferenciateurs } from "@/components/home/section-differenciateurs";
import { SectionEnjeux } from "@/components/home/section-enjeux";
import { SectionEquipe } from "@/components/home/section-equipe";
import { SectionContributions } from "@/components/home/section-contributions";
import { SectionCas } from "@/components/home/section-cas";

/**
 * La page d'accueil n'avait pas de métadonnées propres : elle héritait du
 * titre générique du site. C'est pourtant elle qui reçoit les recherches de
 * marque (« lazarègue avocats ») — les premières à ressortir pour un site neuf.
 */
const TITLE = "Avocat droit du numérique à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Lazarègue Avocats accompagne les entreprises en droit du numérique : cybersécurité, intelligence artificielle, RGPD, contrats informatiques et plateformes. Cabinet à Paris.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/**
 * Membres de l'équipe pour le balisage Person. Les intitulés reprennent
 * exactement ceux affichés dans la section équipe de la page (section-equipe) :
 * ce composant est `"use client"` et ne peut pas exporter ses données vers
 * cette page serveur, d'où la reprise à l'identique ici.
 */
const EQUIPE = [
  { nom: "Alexandre Lazarègue", intitule: "Avocat à la Cour d'appel de Paris", domaine: "Cybercriminalité & gestion de crise" },
  { nom: "Sarah Hinderer", intitule: "Avocate à la Cour d'appel de Paris", domaine: "Données personnelles & intelligence artificielle" },
  { nom: "Amir Ben Majed", intitule: "Avocat à la Cour d'appel de Paris", domaine: "Contrats IT & contentieux technologiques" },
  { nom: "Khalid Sookia", intitule: "Expert indépendant", domaine: "Investigation numérique" },
  { nom: "Nadia Abchiche-Mimouni", intitule: "Experte indépendante", domaine: "Intelligence artificielle & éthique algorithmique" },
];

const CABINET_ID = "https://lazaregue-avocats.fr/#cabinet";

/** Fiche d'identité du cabinet — c'est elle qui relie le site à la fiche Google. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": CABINET_ID,
      name: "Lazarègue Avocats",
      description: DESCRIPTION,
      url: "https://lazaregue-avocats.fr",
      telephone: "+33181706200",
      email: "contact@lazaregue-avocats.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 rue de Tilsitt",
        addressLocality: "Paris",
        postalCode: "75017",
        addressCountry: "FR",
      },
      geo: { "@type": "GeoCoordinates", latitude: "48.8738", longitude: "2.2950" },
      openingHours: "Mo-Fr 09:00-19:00",
      priceRange: "€€",
      areaServed: { "@type": "Country", name: "France" },
      foundingDate: "2016",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: AVIS.noteNum,
        reviewCount: String(AVIS.nombre),
        bestRating: "5",
      },
    },
    ...EQUIPE.map((m) => ({
      "@type": "Person",
      name: m.nom,
      jobTitle: m.intitule,
      description: m.domaine,
      worksFor: { "@id": CABINET_ID },
      url: "https://lazaregue-avocats.fr/le-cabinet",
    })),
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <Header5 />

      <SectionCabinet />

      <SectionEnjeux />
      <SectionDifferenciateurs />
      <div id="section-competences">
        <SectionCompetences />
      </div>
      <SectionCas />
      <SectionEquipe />
      <SectionContributions />
      <hr
        style={{
          border: "none",
          borderTop: "0.5px solid rgba(0,0,0,0.08)",
          margin: "0",
        }}
      />
    </>
  );
}
