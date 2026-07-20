/**
 * Les outils de la section « Outils pour décider ».
 *
 * Ce sont des objets distincts des 20 ressources de la bibliothèque : ils ne
 * sont pas comptés dans le total du teaser.
 *
 * Rappel de charte : le mot « gratuit » est banni ici.
 */

export type Outil = {
  slug: string;
  /** Étiquette de tête, ex. « DIAGNOSTIC » */
  categorie: string;
  /** Complément d'étiquette en gris, ex. « · 5 MIN » */
  precision?: string;
  titre: string;
  description: string;
  cta: string;
  href: string;
  /** Aperçu façon check-list affiché au-dessus de la carte */
  apercu: {
    titre: string;
    reference: string;
    lignes: { texte: string; coche: boolean }[];
  };
};

export const OUTILS: Outil[] = [
  {
    slug: "diagnostic-rgpd",
    categorie: "DIAGNOSTIC",
    precision: "· 5 MIN",
    titre: "Où en êtes-vous du RGPD ?",
    description:
      "Huit questions pour situer votre conformité avant un contrôle ou un appel d'offres.",
    cta: "Lancer le diagnostic",
    href: "#",
    apercu: {
      titre: "Auto-diagnostic RGPD",
      reference: "3 / 8",
      lignes: [
        { texte: "Registre des traitements tenu", coche: true },
        { texte: "Mentions d'information à jour", coche: true },
        { texte: "Consentement cookies conforme", coche: false },
        { texte: "Contrats sous-traitants art. 28", coche: false },
      ],
    },
  },
  {
    slug: "checklist-marque",
    categorie: "CHECK-LIST",
    precision: "· PDF · 2 PAGES",
    titre: "Déposer une marque solide",
    description: "Les vérifications à mener avant le dépôt — dans l'ordre.",
    cta: "Télécharger",
    href: "#",
    apercu: {
      titre: "Check-list avant dépôt de marque",
      reference: "PDF",
      lignes: [
        { texte: "Recherche à l'identique (INPI)", coche: true },
        { texte: "Recherche de similarités", coche: true },
        { texte: "Noms de domaine associés", coche: false },
        { texte: "Classes de produits définies", coche: false },
      ],
    },
  },
  {
    slug: "protocole-photo",
    categorie: "PROTOCOLE",
    titre: "Mise en demeure photo : les premiers réflexes",
    description: "L'ordre des opérations avant toute réponse à l'agence.",
    cta: "Voir le protocole",
    href: "#",
    apercu: {
      titre: "Réponse à une réclamation photo",
      reference: "Protocole",
      lignes: [
        { texte: "J+0 — ne pas payer, ne pas ignorer", coche: true },
        { texte: "J+2 — constat de la publication", coche: true },
        { texte: "J+8 — exiger mandat et originalité", coche: false },
      ],
    },
  },
];
