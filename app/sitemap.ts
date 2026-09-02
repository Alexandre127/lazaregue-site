import type { MetadataRoute } from "next";

/**
 * Plan du site.
 *
 * Pour un site neuf, c'est le moyen le plus direct de faire découvrir toutes
 * les pages d'un coup : on le déclare dans la Search Console le jour de la
 * mise en ligne, plutôt que d'attendre que Google suive les liens un à un.
 *
 * `priority` n'est qu'une indication relative entre nos propres pages ;
 * Google l'utilise peu, mais elle documente l'intention.
 */

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lazaregue-avocats.fr";

/** Pages statiques, de la plus structurante à la plus périphérique. */
const PAGES: { path: string; priority: number; frequence: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, frequence: "monthly" },

  // Pages de compétence — le cœur de l'offre
  { path: "/nos-domaines/rgpd-donnees", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/cybersecurite", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/ia-act", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/contrats-informatiques", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/cybercriminalite", priority: 0.9, frequence: "monthly" },
  { path: "/competences/plateformes", priority: 0.9, frequence: "monthly" },
  { path: "/competences/ma-tech", priority: 0.9, frequence: "monthly" },

  // Conversion et confiance
  { path: "/contact", priority: 0.8, frequence: "yearly" },
  { path: "/le-cabinet", priority: 0.8, frequence: "yearly" },

  // Contenus éditoriaux
  { path: "/ressources", priority: 0.7, frequence: "weekly" },
  { path: "/blog", priority: 0.7, frequence: "weekly" },
  { path: "/ressources/oeuvre-originale", priority: 0.6, frequence: "yearly" },
  { path: "/blog/ai-act-preuve-conformite", priority: 0.6, frequence: "yearly" },

  // Pages légales — priorité faible mais indexables
  { path: "/mentions-legales", priority: 0.3, frequence: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.3, frequence: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.frequence,
    priority: p.priority,
  }));
}
