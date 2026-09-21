import type { Metadata } from "next";
import Link from "next/link";
import styles from "./cas-clients.module.css";
import CasesBrowser from "./_components/CasesBrowser";
import { ALSO_DOMAINES } from "./data/cas-clients";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/cas-clients";

const TITLE = "Cas clients en droit du numérique | Lazarègue Avocats";
const DESCRIPTION =
  "Huit dossiers anonymisés : cyberattaque, virements frauduleux, déréférencement Google, usurpation d’identité, infogérance, piratage, photographies.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cas clients — Lazarègue Avocats",
  description: DESCRIPTION,
  inLanguage: "fr-FR",
  isPartOf: { "@type": "WebSite", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
      { "@type": "ListItem", position: 2, name: "Cas clients", item: `${URL_BASE}${PATH}` },
    ],
  },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ domaine?: string }> }) {
  const { domaine } = await searchParams;
  return (
    <main className={styles.cas} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <CasesBrowser initialDomaine={domaine} />

      <section className="sec ghost" aria-labelledby="h-also">
        <div className="wrap alsodo">
          <div className="head alsohead">
            <p className="label">Autres domaines</p>
            <h2 className="h2" id="h-also">Le cabinet intervient aussi en</h2>
            <p className="lead">Ces domaines ne font pas encore l’objet d’un cas publié.</p>
          </div>
          <ul>
            {ALSO_DOMAINES.map((d) => (
              <li key={d.href}>
                <Link href={d.href}>{d.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec navy" aria-labelledby="h-cta">
        <div className="wrap">
          <div className="head ctahead">
            <h2 className="h2" id="h-cta">Votre situation ressemble à l’un de ces dossiers&nbsp;?</h2>
            <p className="lead">Le cabinet examine les faits, les documents disponibles et les délais applicables avant de proposer une stratégie.</p>
          </div>
          <Link className="btn" href="/contact">Présenter votre situation →</Link>
        </div>
      </section>
    </main>
  );
}
