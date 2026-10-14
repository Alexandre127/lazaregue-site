import type { Metadata } from "next";
import Link from "next/link";
import styles from "./outils.module.css";
import { DOM_LABEL, chemin, libelleType, outils } from "../ressources/data/articles";

/**
 * /outils — regroupe les outils et observatoires du site. Les outils gardent
 * leur adresse sous /ressources/ : cette page ne fait que les présenter. Tout
 * est lu dans le registre (app/ressources/data/articles.ts, `outil: true`) :
 * aucun outil, chiffre ni compteur n'est saisi ici.
 */
const URL_BASE = "https://lazaregue-avocats.fr";
const TITLE = "Outils et observatoires | Lazarègue Avocats";
const DESCRIPTION =
  "Les outils en accès libre du cabinet : diagnostic d'un avis Google, autodiagnostic Shadow AI, observatoire des décisions sur le faux conseiller bancaire.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/outils" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/outils",
    siteName: "Lazarègue Avocats",
    images: [{ url: "/og/outils", width: 1200, height: 630, alt: "Outils et observatoires — Lazarègue Avocats" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: [{ url: "/og/outils", alt: "Outils et observatoires — Lazarègue Avocats" }], title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  const liste = outils();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Outils et observatoires — Lazarègue Avocats",
        description: DESCRIPTION,
        inLanguage: "fr-FR",
        url: `${URL_BASE}/outils`,
        hasPart: liste.map((a) => ({ "@type": "WebPage", name: a.title, url: `${URL_BASE}${chemin(a.slug)}` })),
        publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
          { "@type": "ListItem", position: 2, name: "Outils et observatoires", item: `${URL_BASE}/outils` },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.tete}>
        <nav className={styles.crumb} aria-label="Fil d’Ariane">
          <Link href="/">Accueil</Link> <span aria-hidden="true">/</span> <span aria-current="page">Outils et observatoires</span>
        </nav>
        <h1>Outils et observatoires</h1>
        <p className={styles.chapo}>
          Des outils en accès libre, construits par le cabinet à partir des textes et des décisions de justice. Ils
          donnent une première orientation ; ils ne remplacent pas l’examen d’un dossier.
        </p>
      </header>

      <section className={styles.liste} aria-label="Les outils">
        <ul>
          {liste.map((a) => (
            <li key={a.slug}>
              <Link className={styles.carte} href={chemin(a.slug)}>
                <span className={styles.surtitre}>{DOM_LABEL[a.domaine]} · {libelleType(a)}</span>
                <span className={styles.titre}>{a.title}</span>
                <span className={styles.texte}>{a.chapo || a.seoDescription}</span>
                <span className={styles.lien}>Accéder à l’outil <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <nav className={styles.ailleurs} aria-label="Autres rubriques">
        <Link href="/ressources">Guides et articles <span aria-hidden="true">→</span></Link>
        <Link href="/cas-clients">Cas clients <span aria-hidden="true">→</span></Link>
      </nav>
    </main>
  );
}
