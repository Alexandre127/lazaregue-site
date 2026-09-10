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

const TITLE = "Domaines d'intervention — Lazarègue Avocats";
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

/*
 * Phrases de contexte PROPRES à la page (versions longues, rédigées par le
 * cabinet). Le menu déroulant garde les versions courtes de FAMILLES (gabarit) ;
 * ici on remplace par ces phrases, clé = href du domaine. Repli sur la phrase
 * du menu si une clé venait à manquer.
 */
const PHRASES_PAGE: Record<string, string> = {
  "/nos-domaines/rgpd-donnees":
    "Cartographie des traitements, contrats de sous-traitance, notification d'une violation, contrôle et sanction de la CNIL.",
  "/nos-domaines/ia-act":
    "Qualification des systèmes au regard de l'AI Act, répartition fournisseur-déployeur, gouvernance interne et contrats avec les éditeurs.",
  "/nos-domaines/cybersecurite":
    "Assujettissement à NIS 2, obligations de la chaîne de sous-traitance, notification d'incident et responsabilité des dirigeants.",
  "/nos-domaines/contrats-informatiques":
    "Rédaction et négociation des contrats SaaS, maintenance et infogérance ; recette, réversibilité et contentieux de l'échec de projet.",
  "/nos-domaines/crypto-actifs-blockchain":
    "Agrément CASP sous MiCA, obligations des prestataires, litiges avec les plateformes et blocage de comptes.",
  "/competences/ma-tech":
    "Due diligence des actifs numériques : propriété du code, licences open source, passif RGPD et exposition cyber.",
  "/nos-domaines/avocat-escroquerie-fraude":
    "Contestation des opérations non autorisées, charge de la preuve du consentement, recours contre l'établissement teneur du compte.",
  "/nos-domaines/cybercriminalite":
    "Gestion des premières heures, préservation de la preuve, plainte, mise en cause du prestataire et contestation du refus de garantie.",
  "/nos-domaines/diffamation-retrait-de-contenus":
    "Qualification et délai de prescription, notification aux plateformes, identification de l'auteur et déréférencement.",
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
                        <span className={styles.cardContext}>
                          {PHRASES_PAGE[d.href] ?? d.contexte}
                        </span>
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
