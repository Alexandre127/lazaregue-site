import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const SITE_HOST = "lazaregue-avocats.fr";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: rootDir,
  },

  // Une seule forme d'URL, sans barre oblique finale : `/page/` est redirigé
  // en 308 vers `/page`. C'est déjà le défaut de Next, rendu explicite ici
  // pour verrouiller l'intention et éviter les doublons d'exploration.
  trailingSlash: false,

  // Doublons de domaine : toute requête sur www.<domaine> est redirigée en
  // permanent vers le domaine nu, forme retenue pour les canoniques. (Sur
  // Vercel, la configuration du domaine reste le point de contrôle principal ;
  // cette règle est une sécurité côté application.)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${SITE_HOST}` }],
        destination: `https://${SITE_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
