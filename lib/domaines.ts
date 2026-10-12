import { FAMILLES, type CleDomaine } from "@/components/header/nav-data";

/**
 * Classement unique des contenus du site (12 octobre 2026).
 *
 * Articles, cas clients et outils se rangent dans UNE seule liste : celle des
 * dix domaines du menu (`FAMILLES`, components/header/nav-data.ts). Rien n'est
 * recopié ici : clés, intitulés et adresses sont lus dans cette source.
 *
 * `THEMES` accueille les contenus qui ne relèvent d'aucun des dix domaines
 * (ils n'ont pas de page de domaine, donc pas de lien). Thème PROPOSÉ au
 * cabinet, en attente de validation.
 */
export type { CleDomaine };
export type CleTheme = "pi";
export type Classement = CleDomaine | CleTheme;

export type Rubrique = {
  cle: Classement;
  /** Intitulé au long (celui du menu). */
  titre: string;
  /** Intitulé court : sur-titres et filtres. */
  court: string;
  /** Page de domaine ; `null` pour un thème hors domaines. */
  href: string | null;
  /** Famille du menu ; `null` pour un thème hors domaines. */
  famille: string | null;
};

const THEMES: Rubrique[] = [
  { cle: "pi", titre: "Propriété intellectuelle", court: "Propriété intellectuelle", href: null, famille: null },
];

export const CLASSEMENT: Rubrique[] = [
  ...FAMILLES.flatMap((f) =>
    f.domaines.map((d) => ({ cle: d.cle, titre: d.titre, court: d.court, href: d.href, famille: f.intitule })),
  ),
  ...THEMES,
];

export function rubrique(cle: Classement): Rubrique {
  const r = CLASSEMENT.find((x) => x.cle === cle);
  if (!r) throw new Error(`Domaine inconnu : ${cle}`);
  return r;
}

export function estClassement(v: string | undefined): v is Classement {
  return !!v && CLASSEMENT.some((x) => x.cle === v);
}
