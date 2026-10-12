import Link from "next/link";
import { surLeMemeSujet, type RubriqueContenu } from "@/lib/contenus";
import type { Classement } from "@/lib/domaines";
import styles from "./sur-le-meme-sujet.module.css";

/**
 * Bloc « Sur le même sujet » : jusqu'à trois contenus du même domaine, pris
 * dans les deux autres rubriques (articles, cas clients, outils). N'affiche
 * rien si le domaine n'a pas d'autre contenu.
 */
export default function SurLeMemeSujet({
  rubrique,
  domaines,
  exclure,
  className,
}: {
  rubrique: RubriqueContenu;
  domaines: Classement[];
  /** Adresses déjà proposées ailleurs sur la page (« À lire aussi »). */
  exclure?: string[];
  className?: string;
}) {
  const liens = surLeMemeSujet(rubrique, domaines, exclure);
  if (!liens.length) return null;
  return (
    <nav className={`${styles.bloc}${className ? ` ${className}` : ""}`} aria-labelledby="meme-sujet">
      <h2 className={styles.titre} id="meme-sujet">Sur le même sujet</h2>
      <ul>
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              <span className={styles.surtitre}>{l.surtitre}</span>
              <span className={styles.lien}>{l.titre}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
