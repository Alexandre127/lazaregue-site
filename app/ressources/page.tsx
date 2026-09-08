import type { Metadata } from "next";
import styles from "./ressources.module.css";
import { DOMAINES, FEATURED, PILLARS } from "./data/articles";
import Catalogue from "./_components/Catalogue";
import Reveal from "./_components/Reveal";

const TITLE =
  "Ressources — ce qu'il faut savoir avant de décider | Lazarègue Avocats";
const DESCRIPTION =
  "Repères clairs sur la propriété intellectuelle, les marques, la concurrence et les données personnelles, écrits par le cabinet Lazarègue Avocats. Consultation libre.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ressources" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ressources",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ressources — Lazarègue Avocats",
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  isPartOf: {
    "@type": "WebSite",
    name: "Lazarègue Avocats",
    url: "https://www.lazaregue-avocats.fr",
  },
  about: [...DOMAINES],
  publisher: {
    "@type": "LegalService",
    name: "Lazarègue Avocats",
    areaServed: { "@type": "Country", name: "France" },
    founder: {
      "@type": "Person",
      name: "Alexandre Lazarègue",
      jobTitle: "Avocat au barreau de Paris",
    },
  },
};

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero + catalogue : la recherche du hero pilote la grille, d'où
          le regroupement dans un seul composant client. « À la une » se glisse
          entre les deux, comme dans la maquette. */}
      <Catalogue>
        <section className={styles.featureSection}>
          <div className={styles.featureInner}>
            <Reveal className={styles.kicker} inClassName={styles.in}>
              <span>À la une</span>
            </Reveal>

            <Reveal
              as="a"
              className={`${styles.feature} ${styles.reveal}`}
              inClassName={styles.in}
            >
              <div className={styles.featureBody}>
                <div className={styles.featureTags}>
                  <span className={styles.tagOutline}>{FEATURED.domain}</span>
                  <span className={styles.tagPlain}>{FEATURED.read} de lecture</span>
                </div>
                <h2>{FEATURED.title}</h2>
                <p className={styles.featureExcerpt}>{FEATURED.excerpt}</p>
                <span className={styles.featureLink}>Lire l&apos;article →</span>
              </div>
              <div className={styles.featureAside}>
                <div className={styles.featureBig} aria-hidden>
                  {FEATURED.big}
                </div>
              </div>
              <div className={styles.underline} aria-hidden />
            </Reveal>
          </div>
        </section>
      </Catalogue>

      {/* Maillage thématique — un lien par domaine */}
      <section className={styles.pillarsSection}>
        <div className={styles.pillarsInner}>
          <div className={styles.pillarsK}>Explorer par thème</div>
          <div className={styles.pillars}>
            {PILLARS.map((p) => (
              <a key={p.label} href={p.href} className={styles.pillar}>
                <span>{p.label}</span>
                <span className={styles.pillarArrow} aria-hidden>
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
