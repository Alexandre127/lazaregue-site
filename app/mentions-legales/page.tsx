import type { Metadata } from "next";
import PagesLegales from "@/components/legal/pages-legales";

const TITLE = "Mentions légales | Lazarègue Avocats";
const DESCRIPTION =
  "Éditeur, hébergement, profession réglementée, honoraires, propriété intellectuelle et responsabilité du site du cabinet Lazarègue Avocats, avocat au barreau de Paris.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/mentions-legales",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <PagesLegales initial="mentions" />;
}
