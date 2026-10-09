import Link from "next/link";
import styles from "./diagnostic-page.module.css";
import DiagnosticAvisGoogle from "../_components/diagnostic/DiagnosticAvisGoogle";
import { DOM_LABEL, article, chemin } from "../data/articles";
import { metaArticle } from "../data/meta";
import { HORS_PRODUCTION } from "../data/environnement";

// Titre, description et chapô : registre data/articles.ts (type « Outil »).
const SLUG = "diagnostic-avis-google";
const URL_BASE = "https://lazaregue-avocats.fr";
const ARTICLE = "/ressources/supprimer-faux-avis-google";

export const metadata = metaArticle(SLUG);

export default function Page() {
  const a = article(SLUG);
  const domaine = DOM_LABEL[a.dom];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: a.title,
        description: a.seoDescription,
        inLanguage: "fr-FR",
        url: `${URL_BASE}${chemin(SLUG)}`,
        dateModified: a.miseAJour,
        publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
          { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
          { "@type": "ListItem", position: 3, name: domaine, item: `${URL_BASE}/ressources?domaine=${a.dom}` },
          { "@type": "ListItem", position: 4, name: a.title, item: `${URL_BASE}${chemin(SLUG)}` },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.wrap}>
        <header className={styles.tete}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <Link href="/ressources">Ressources</Link> <span aria-hidden="true">/</span>{" "}
            <Link href={`/ressources?domaine=${a.dom}#liste`}>{domaine}</Link>
          </nav>
          <p className={styles.kicker}>{domaine} · {a.type}</p>
          <h1>{a.title}</h1>
          <p className={styles.chapo}>{a.chapo}</p>
        </header>

        <DiagnosticAvisGoogle variant="complet" montrerNonVerifiees={HORS_PRODUCTION} />

        <p className={styles.suite}>
          Pour le détail des règles et de chaque étape : <Link href={ARTICLE}>Supprimer un faux avis Google : la procédure complète</Link>.
        </p>
      </div>
    </main>
  );
}
