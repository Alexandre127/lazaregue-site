import type { Metadata } from "next";
import styles from "./analyses.module.css";
import { ANALYSES, AUTEUR } from "./data/analyses";
import AnalysesGrille from "./_components/Analyses";

const TITLE = "Analyses — le fil du cabinet | Lazarègue Avocats";
const DESCRIPTION =
  "Ce que change une décision, à partir de quand, et ce qu'elle laisse ouvert. Commentaires d'arrêts, textes nouveaux, notes de fond et chroniques du cabinet Lazarègue Avocats.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Analyses — Lazarègue Avocats",
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  publisher: { "@type": "LegalService", name: "Lazarègue Avocats" },
  blogPost: ANALYSES.map((a) => ({
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.dateISO,
    about: a.domain,
    author: { "@type": "Person", name: AUTEUR },
  })),
};

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <AnalysesGrille />
    </main>
  );
}
