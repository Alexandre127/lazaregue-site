import Link from "next/link";
import Logo from "@/components/header/logo";
import { FAMILLES } from "@/components/header/nav-data";
import styles from "./footer.module.css";

/**
 * Pied de page du site — quatre colonnes en desktop, deux entre 640 et 1039px,
 * une en dessous. Rendu côté serveur, présent dans le DOM initial, lisible sans
 * JavaScript. Fond Navy (#0A0F2E). Aucune icône ne remplace un texte ; aucun
 * faux lien : les entrées sans page dédiée sont en texte non cliquable (signalé
 * au rapport). Trois <nav>, chacun nommé par son titre de colonne (<p>, jamais
 * <h2> : ne perturbe pas la hiérarchie éditoriale de la page).
 *
 * Slugs vérifiés dans l'arborescence /nos-domaines (trailingSlash: false).
 */

// Une entrée sans `href` est « à venir » (rendue en texte, jamais en lien) ;
// lui ajouter un href — une seule donnée — la fait basculer en lien, sans
// retoucher le composant ni le rendu.
type FooterLink = { label: string; href?: string };

// Colonne 2 — SOURCE UNIQUE : le méga-menu (nav-data.ts). Libellés et slugs
// repris VERBATIM, dans l'ordre des trois familles (aucune reformulation).
const MENU_DOMAINES: FooterLink[] = FAMILLES.flatMap((f) =>
  f.domaines.map((d) => ({ label: d.titre, href: d.href })),
);

// « Contentieux informatique et commercial » n'a pas encore de page : entrée
// « à venir » à sa place dans la famille Contentieux (en tête, comme sur la
// home). Un href la fera passer en lien.
const DOMAINES: FooterLink[] = [
  ...MENU_DOMAINES.slice(0, 6), // Conformité + Contrats et opérations
  { label: "Contentieux informatique et commercial" },
  ...MENU_DOMAINES.slice(6), // Contentieux et atteintes numériques
];

const CABINET: FooterLink[] = [
  { label: "Le cabinet", href: "/le-cabinet" },
  { label: "Ressources", href: "/ressources" },
  { label: "Contact", href: "/contact" },
];

// Colonne 4 — « Honoraires » et « Colophon » n'ont pas encore de page : entrées
// « à venir » (sans href), affichées à leur place. Un href les fera passer en
// lien.
const INFORMATIONS: FooterLink[] = [
  { label: "Honoraires" },
  { label: "Colophon" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Mentions légales", href: "/mentions-legales" },
];

function LinkList({ items }: { items: FooterLink[] }) {
  return (
    <ul className={styles.flist}>
      {items.map((item) =>
        item.href ? (
          <li key={item.label}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ) : (
          // « À venir » : jamais un <a> (aucun href, aucun 404), non focusable.
          <li key={item.label}>
            <span className={styles.pending}>
              {item.label}
              <span className={styles.soon}>bientôt</span>
            </span>
          </li>
        ),
      )}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          {/* Colonne 1 — identité et coordonnées */}
          <div className={styles.colIdentity}>
            <div className={styles.brandWrap}>
              <Logo />
            </div>
            <p className={styles.brandText}>
              Cabinet d&apos;avocats en droit du numérique, établi à Paris et
              intervenant dans toute la France.
            </p>
            <p className={styles.bar}>Avocats au Barreau de Paris</p>
            <address className={styles.contact}>
              <a href="tel:+33181706200">+33 1 81 70 62 00</a>
              <a href="mailto:contact@lazaregue-avocats.fr">
                contact@lazaregue-avocats.fr
              </a>
              <span>18 rue de Tilsitt, 75017 Paris</span>
            </address>
          </div>

          {/* Colonne 2 — Nos domaines */}
          <nav className={styles.col} aria-labelledby="ft-domaines">
            <p className={styles.colTitle} id="ft-domaines">
              Nos domaines
            </p>
            <LinkList items={DOMAINES} />
          </nav>

          {/* Colonne 3 — Le cabinet */}
          <nav className={styles.col} aria-labelledby="ft-cabinet">
            <p className={styles.colTitle} id="ft-cabinet">
              Le cabinet
            </p>
            <LinkList items={CABINET} />
          </nav>

          {/* Colonne 4 — Informations */}
          <nav className={styles.col} aria-labelledby="ft-informations">
            <p className={styles.colTitle} id="ft-informations">
              Informations
            </p>
            <LinkList items={INFORMATIONS} />
          </nav>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © 2026 Lazarègue Avocats — Tous droits réservés
        </p>
        <a
          className={styles.social}
          href="https://www.linkedin.com/in/alexandre-lazarègue"
          aria-label="Lazarègue Avocats sur LinkedIn"
          rel="noopener"
          target="_blank"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.95-3.07-1.96 0-2.26 1.46-2.26 2.97V21h-4z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
