import type { Metadata } from "next";
import PagesLegales from "@/components/legal/pages-legales";

const TITLE = "Politique de confidentialité | Lazarègue Avocats";
const DESCRIPTION =
  "Traitement des données personnelles par le cabinet Lazarègue Avocats : finalités, bases légales, durées de conservation, destinataires, transferts hors UE et droits des personnes (RGPD).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/politique-de-confidentialite" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/politique-de-confidentialite",
    siteName: "Lazarègue Avocats", images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
};

export default function Page() {
  return <PagesLegales initial="donnees" />;
}
