/**
 * Vrai hors production (développement local, prévisualisation Vercel).
 * À lire CÔTÉ SERVEUR uniquement (pages, routes) : `VERCEL_ENV` n'existe pas
 * dans le navigateur. Sert à n'afficher qu'en dehors de la production les
 * éléments encore à relire (décisions non vérifiées, mentions « à préciser »).
 */
export const HORS_PRODUCTION = process.env.VERCEL_ENV !== "production";
