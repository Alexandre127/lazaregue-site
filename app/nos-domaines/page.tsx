import type { Metadata } from "next";
import Link from "next/link";
import { FAMILLES } from "@/components/header/nav-data";
import styles from "./nos-domaines.module.css";

/*
 * Index des domaines d'intervention. Cible du libellé « DOMAINES » du menu et
 * du pied de panneau « voir tous les domaines d'intervention ».
 *
 * Structure minimale imposée : H1 + chapô (à rédiger par le cabinet, laissé en
 * placeholder {{CHAPO_A_REDIGER}} — ne pas inventer) + les neuf domaines en
 * trois familles. Rien d'autre : pas de réassurance, de témoignage ni de CTA.
 *
 * Les libellés et phrases de contexte sont ceux du menu (FAMILLES) : à
 * différencier ensuite pour que la page ait son propre texte (le menu est du
 * gabarit).
 */

const TITLE = "Domaines d'intervention | Lazarègue Avocats";
const DESCRIPTION =
  "Les domaines d'intervention du cabinet Lazarègue Avocats en droit du numérique : conformité et risques, contrats et opérations, contentieux et atteintes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function Page() {
  return (
    <main className={styles.page} id="contenu">
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <h1>Domaines d&apos;intervention</h1>
          {/* Chapô de 80 à 150 mots — À RÉDIGER par le cabinet, ne pas inventer. */}
          <p className={styles.chapo}>{"{{CHAPO_A_REDIGER}}"}</p>
        </div>
      </header>

      <section className={styles.familles}>
        <div className={styles.wrap}>
          <div className={styles.grid}>
            {FAMILLES.map((f) => (
              <div key={f.intitule}>
                <p className={styles.familleLabel}>{f.intitule}</p>
                <ul className={styles.list}>
                  {f.domaines.map((d) => (
                    <li key={d.href}>
                      <Link className={styles.card} href={d.href}>
                        <span className={styles.cardTitle}>{d.titre}</span>
                        <span className={styles.cardContext}>{d.contexte}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
