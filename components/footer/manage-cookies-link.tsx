"use client";

import styles from "./footer.module.css";

/**
 * Lien « Gérer les cookies » du pied de page : rouvre le panneau de préférences
 * CookieConsent (permet aussi de retirer son consentement). Rendu comme un lien
 * du footer.
 */
export default function ManageCookiesLink() {
  const open = () => {
    const cc = (window as unknown as { CookieConsent?: { showPreferences: () => void } }).CookieConsent;
    cc?.showPreferences();
  };

  return (
    <li>
      <button type="button" className={styles.manage} onClick={open}>
        Gérer les cookies
      </button>
    </li>
  );
}
