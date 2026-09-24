import type { Metadata } from "next";
import styles from "./diffamation.module.css";
import DiffamationClient from "./DiffamationClient";

const URL_BASE = "https://lazaregue-avocats.fr";
/* Route conservée telle quelle (décision projet) : le site est standardisé sur
   « …-contenus » ; « …-de-contenus » 301 déjà vers elle. */
const PATH = "/nos-domaines/diffamation-retrait-contenus";

const TITLE = "Avocat diffamation Paris | Retrait de contenus";
const DESCRIPTION =
  "Diffamation, faux avis, dénigrement ou refus de retrait : Lazarègue Avocats agit auprès des plateformes et contre les auteurs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  // Pas d'og:image : le fichier n'est pas fourni. twitter card = summary.
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

/* JSON-LD : BreadcrumbList seul, cohérent avec le fil d'Ariane visible. Pas de
   second LegalService (l'entité #cabinet est déjà déclarée au niveau global),
   pas de FAQPage, pas de VideoObject (vidéo définitive non intégrée). */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
    { "@type": "ListItem", position: 2, name: "Domaines", item: `${URL_BASE}/nos-domaines` },
    { "@type": "ListItem", position: 3, name: "Diffamation et retrait de contenus", item: `${URL_BASE}${PATH}` },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <DiffamationClient />
    </>
  );
}
