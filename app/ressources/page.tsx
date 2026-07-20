import type { Metadata } from "next";
import styles from "./ressources.module.css";
import { DOSSIERS, aLireEnsuite, laRessourceAlire } from "./data/ressources";
import { OUTILS } from "./data/outils";
import ArchiveTeaser from "./_components/ArchiveTeaser";
import DossierDoor from "./_components/DossierDoor";
import FeaturedResource from "./_components/FeaturedResource";
import PrepBand from "./_components/PrepBand";
import ResourceCard from "./_components/ResourceCard";
import SectionHeader from "./_components/SectionHeader";
import ToolCard from "./_components/ToolCard";

const TITLE =
  "Pour comprendre — guides, définitions et outils du droit du numérique | Lazarègue Avocats";
const DESCRIPTION =
  "Guides, définitions et outils du droit du numérique : données personnelles et RGPD, propriété intellectuelle, marques, cybersécurité et intelligence artificielle.";

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Page() {
  const featured = laRessourceAlire();
  const suivantes = aLireEnsuite();

  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1>
            POUR <span>COMPRENDRE.</span>
          </h1>
          <p>
            Les guides, définitions et outils que nous utilisons quotidiennement au
            cabinet pour maîtriser durablement le droit du numérique.
          </p>
        </div>
      </header>

      <div className={styles.wrap}>
        {/* 1 · La ressource à lire */}
        {featured ? (
          <section className={styles.today}>
            <SectionHeader
              folio="La ressource à lire"
              role="Le texte qui sert le plus souvent."
            />
            <FeaturedResource ressource={featured} />
          </section>
        ) : null}

        {/* 2 · À lire ensuite */}
        <section className={styles.next}>
          <SectionHeader
            folio="À lire ensuite"
            role="Un guide par dossier, pour commencer."
          />
          <div className={styles.nextGrid}>
            {suivantes.map((r) => (
              <ResourceCard key={r.title} ressource={r} />
            ))}
          </div>
        </section>

        {/* 3 · Les dossiers */}
        <section className={styles.dossiers}>
          <SectionHeader
            folio="Les dossiers de la bibliothèque"
            role="Cinq dossiers ouverts, vingt ressources — chacune relue et maintenue à jour."
          />
          {DOSSIERS.map((d) => (
            <DossierDoor key={d.id} dossier={d} />
          ))}
          <PrepBand />
        </section>
      </div>

      {/* 4 · Outils */}
      <section className={styles.tools}>
        <div className={styles.toolsInner}>
          <SectionHeader
            folio="Outils pour décider"
            role="Les diagnostics et check-lists du cabinet."
          />
          <div className={styles.toolsGrid}>
            {OUTILS.map((o) => (
              <ToolCard key={o.slug} outil={o} />
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Teaser */}
      <div className={styles.wrap}>
        <ArchiveTeaser />
      </div>
    </main>
  );
}
