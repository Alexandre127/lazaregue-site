"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

/**
 * CTA global compact — commun à toutes les pages, placé juste avant le pied de
 * page (rendu dans le layout). Fond Ink (#0A0A14). Volontairement compact
 * (surtitre + titre à gauche, bouton à droite sur une seule ligne en desktop)
 * pour ne pas se lire comme une seconde grande section après le CTA propre à
 * chaque page. Un seul bouton, aucun paragraphe commercial.
 *
 * Neutralisé sur certaines pages qui portent déjà leur propre bloc de contact
 * final : le CTA générique y ferait doublon. Composant client (usePathname) —
 * le rendu reste statique, seule la suppression conditionnelle est côté client.
 */
const SUPPRESS_ON = ["/", "/contact", "/le-cabinet", "/nos-domaines/cybersecurite", "/nos-domaines/contrats-informatiques", "/nos-domaines/rgpd-donnees-personnelles", "/nos-domaines/crypto-actifs-blockchain", "/nos-domaines/diffamation-retrait-contenus"];

export function GlobalCta() {
  const pathname = usePathname();
  if (pathname && SUPPRESS_ON.includes(pathname)) return null;

  return (
    <section className={styles.ctaGlobal} aria-labelledby="cta-global-title">
      <div className={styles.ctaInner}>
        <div>
          <p className={styles.ctaEyebrow}>Quelle que soit la situation</p>
          <h2 className={styles.ctaTitle} id="cta-global-title">
            Votre problème numérique a une solution.
          </h2>
        </div>
        <Link className={styles.btn} href="/contact">
          Échanger avec un avocat
        </Link>
      </div>
    </section>
  );
}
