"use client";

import styles from "./footer.module.css";

/**
 * Lien « Gérer les cookies » du pied de page : rouvre le panneau de préférences
 * CookieConsent (permet aussi de retirer son consentement).
 *
 * Deux usages : dans la colonne « Informations » (rendu en <li>, défaut) et
 * dans la ligne légale inférieure (`bare`, rendu en simple <button> aligné sur
 * les autres liens de la ligne).
 */
export default function ManageCookiesLink({ bare = false }: { bare?: boolean }) {
  const open = () => {
    const cc = (window as unknown as { CookieConsent?: { showPreferences: () => void } }).CookieConsent;
    cc?.showPreferences();
  };

  if (bare) {
    return (
      <button type="button" onClick={open}>
        Gérer les cookies
      </button>
    );
  }

  return (
    <li>
      <button type="button" className={styles.manage} onClick={open}>
        Gérer les cookies
      </button>
    </li>
  );
}
