/**
 * URL de référence du site — canoniques, Open Graph, sitemap.
 *
 * Pilotée par `NEXT_PUBLIC_SITE_URL`. En PRODUCTION Vercel
 * (`VERCEL_ENV === "production"`), l'absence de cette variable est une erreur
 * BLOQUANTE : sans elle, les canoniques et le sitemap retomberaient
 * silencieusement sur le domaine `.vercel.app` et entreraient en duplication
 * avec le domaine définitif le jour de la bascule. On préfère un build qui
 * échoue à un déploiement de production trompeusement vert.
 *
 * En preview / local, un repli est toléré : ces déploiements sont de toute
 * façon mis en `noindex` par le middleware tant qu'ils ne sont pas servis
 * depuis le domaine de production.
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL;

if (!raw && process.env.VERCEL_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL est obligatoire en production. " +
      "Définissez-la dans les variables d'environnement Vercel " +
      "(ex. https://lazaregue-avocats.fr) avant de déployer sur le domaine définitif.",
  );
}

export const SITE_URL = raw ?? "https://lazaregue-site.vercel.app";
