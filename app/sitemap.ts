import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { CAS } from "@/app/cas-clients/data/cas-clients";

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

/** Pages statiques, de la plus structurante à la plus périphérique. */
const PAGES: { path: string; priority: number; frequence: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, frequence: "monthly" },

  // Pages de compétence — le cœur de l'offre
  { path: "/nos-domaines/rgpd-donnees-personnelles", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/cybersecurite", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/cybersecurite/nis2", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/avocat-intelligence-artificielle", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/contrats-informatiques", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/contentieux-informatique-commercial", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/cybercriminalite", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/escroquerie-fraude-bancaire", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/diffamation-retrait-contenus", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/ma-tech", priority: 0.9, frequence: "monthly" },
  { path: "/nos-domaines/crypto-actifs-blockchain", priority: 0.9, frequence: "monthly" },

  // Conversion et confiance
  { path: "/contact", priority: 0.8, frequence: "yearly" },
  { path: "/le-cabinet", priority: 0.8, frequence: "yearly" },

  // Contenus éditoriaux
  { path: "/ressources", priority: 0.7, frequence: "weekly" },
  { path: "/ressources/oeuvre-originale", priority: 0.6, frequence: "yearly" },
  { path: "/ressources/faux-conseiller-bancaire-remboursement", priority: 0.6, frequence: "yearly" },
  { path: "/ressources/fraude-bancaire-opposition-contestation-remboursement", priority: 0.6, frequence: "yearly" },

  // Cas clients — rubrique + huit dossiers
  { path: "/cas-clients", priority: 0.7, frequence: "monthly" },
  ...CAS.map((c) => ({ path: `/cas-clients/${c.slug}`, priority: 0.6, frequence: "yearly" as const })),

  // Formations — hub + trois formations (L'Avocat Augmenté /formations/ia-avocat
  // pas encore construite : hors sitemap tant que la page n'existe pas)
  { path: "/formations", priority: 0.7, frequence: "monthly" },
  { path: "/formations/intelligence-artificielle-entreprise", priority: 0.6, frequence: "monthly" },
  { path: "/formations/rgpd", priority: 0.6, frequence: "monthly" },
  { path: "/formations/cybersecurite", priority: 0.6, frequence: "monthly" },

  // Pages légales — priorité faible mais indexables
  { path: "/mentions-legales", priority: 0.3, frequence: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.3, frequence: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.frequence,
    priority: p.priority,
  }));
}
