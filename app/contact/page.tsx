import type { Metadata } from "next";
import styles from "./contact.module.css";
import ContactBody from "./_components/ContactBody";

const TITLE = "Avocat droit du numérique Paris | Contact | Lazarègue Avocats";
const DESCRIPTION =
  "Cabinet d'avocats spécialisé en droit du numérique à Paris 17e. Litige numérique, conformité RGPD, fraude informatique. PME et ETI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lazarègue Avocats",
  description:
    "Cabinet d'avocats spécialisé en droit du numérique pour PME et ETI. Litige numérique, conformité RGPD, fraude informatique.",
  url: "https://lazaregue-avocats.fr/contact",
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
};

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <ContactBody />
    </main>
  );
}
