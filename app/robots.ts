import type { MetadataRoute } from "next";

/**
 * VERROU PRÉ-PROD — le site n'est pas encore public.
 *
 * Tant que des contenus sont en placeholder (ex. {{CHAPO_A_REDIGER}}) et que la
 * mise en ligne n'est pas décidée, on interdit toute exploration : `Disallow: /`
 * pour tous les robots. Le `noindex, nofollow` posé dans app/layout.tsx couvre
 * en plus le cas où une URL serait tout de même atteinte.
 *
 * Le site n'a pas encore de backlinks, donc aucun risque d'« indexation sans
 * snippet » malgré le blocage. Pas de sitemap déclaré tant que c'est verrouillé.
 *
 * À RÉTABLIR le jour de la mise en ligne publique : rouvrir `allow: "/"`,
 * exclure seulement /_next/ et /api/, redéclarer le sitemap, et retirer le
 * `robots` de app/layout.tsx. (Ancienne config ouverte conservée en historique
 * git.)
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
