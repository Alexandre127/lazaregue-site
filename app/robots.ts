import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * robots.txt — site public, OUVERT À TOUS LES ROBOTS SANS EXCEPTION.
 *
 * Plus aucun blocage de robots d'IA (entraînement ou lecture) : tout agent est
 * autorisé à explorer tout le site. Seul `/api/` reste interdit (points d'entrée
 * techniques, aucune page à indexer). `/_next/` est volontairement AUTORISÉ :
 * Google a besoin des CSS, scripts et images servis depuis `/_next/` pour rendre
 * et évaluer correctement les pages.
 *
 * (Le `noindex` site-wide a été retiré de app/layout.tsx ; l'en-tête
 * `X-Robots-Tag: noindex` de proxy.ts ne s'applique plus que hors domaine de
 * production. Deux pages de test gardent leur `noindex` propre.)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
