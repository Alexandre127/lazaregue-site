import { CAS } from "@/app/cas-clients/data/cas-clients";
import { DOM_LABEL, chemin, libelleType, publiees } from "@/app/ressources/data/articles";
import type { Classement } from "@/lib/domaines";

/**
 * Vue d'ensemble des contenus publiés, toutes rubriques confondues : articles,
 * cas clients, outils. Sert au bloc « Sur le même sujet » (liens croisés).
 * Rien n'est saisi ici : tout est lu dans les deux registres.
 */
export type RubriqueContenu = "article" | "cas" | "outil";

export type Contenu = {
  rubrique: RubriqueContenu;
  /** Sur-titre : domaine puis nature du contenu. */
  surtitre: string;
  titre: string;
  href: string;
  /** Le premier est le domaine principal. */
  domaines: Classement[];
};

export function contenus(): Contenu[] {
  const ressources: Contenu[] = publiees().map((a) => ({
    rubrique: a.outil ? "outil" : "article",
    surtitre: `${DOM_LABEL[a.domaine]} · ${libelleType(a)}`,
    titre: a.title,
    href: chemin(a.slug),
    domaines: [a.domaine],
  }));
  const cas: Contenu[] = CAS.map((c) => ({
    rubrique: "cas",
    surtitre: `${DOM_LABEL[c.domaines[0]]} · Cas client`,
    titre: c.titre,
    href: `/cas-clients/${c.slug}`,
    domaines: c.domaines,
  }));
  return [...ressources, ...cas];
}

/**
 * Jusqu'à trois contenus partageant un domaine, pris dans les DEUX AUTRES
 * rubriques, en alternant entre elles. `exclure` : adresses déjà proposées
 * ailleurs sur la page. Tableau vide si rien ne correspond.
 */
export function surLeMemeSujet(rubrique: RubriqueContenu, domaines: Classement[], exclure: string[] = []): Contenu[] {
  const autres = (["article", "cas", "outil"] as const).filter((r) => r !== rubrique);
  const files = autres.map((r) =>
    contenus()
      .filter((c) => c.rubrique === r && !exclure.includes(c.href) && c.domaines.some((d) => domaines.includes(d)))
      // d'abord ceux dont le domaine principal correspond au domaine principal de la page
      .sort((x, y) => Number(y.domaines[0] === domaines[0]) - Number(x.domaines[0] === domaines[0])),
  );
  const choix: Contenu[] = [];
  for (let i = 0; choix.length < 3 && files.some((f) => i < f.length); i++) {
    for (const f of files) if (f[i] && choix.length < 3) choix.push(f[i]);
  }
  return choix;
}
