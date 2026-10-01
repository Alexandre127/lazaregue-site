import type { Metadata } from "next";
import PagesLegales from "@/components/legal/pages-legales";

const TITLE = "Politique de cookies | Lazarègue Avocats";
const DESCRIPTION =
  "Cookies et traceurs du site Lazarègue Avocats : cookie de consentement, mesure d'audience sans cookie (Vercel), et outils soumis à votre accord (Google Analytics, Microsoft Clarity, suivi HubSpot). Finalités, durées et retrait du consentement.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/politique-cookies" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/politique-cookies",
    siteName: "Lazarègue Avocats",
    images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
};

export default function Page() {
  return <PagesLegales initial="cookies" />;
}
