"use client";

import styles from "./footer.module.css";

/**
 * Lien « Gérer les cookies » du pied de page : ouvre le panneau de préférences
 * tarteaucitron (API `userInterface.openPanel`, repli sur le hashtag
 * `#gerer-cookies`). Rendu comme un lien du footer.
 */
export default function ManageCookiesLink() {
  const open = () => {
    const tac = (window as unknown as {
      tarteaucitron?: { userInterface?: { openPanel?: () => void } };
    }).tarteaucitron;
    if (tac?.userInterface?.openPanel) {
      tac.userInterface.openPanel();
    } else {
      // Repli : déclenche l'ouverture via le hashtag configuré.
      window.location.hash = "";
      window.location.hash = "gerer-cookies";
    }
  };

  return (
    <li>
      <button type="button" className={styles.manage} onClick={open}>
        Gérer les cookies
      </button>
    </li>
  );
}
