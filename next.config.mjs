import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const SITE_HOST = "lazaregue-avocats.fr";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: rootDir,
  },

  // Masque l'indicateur de développement de Next (le rond « Dev Tools » en bas
  // de l'écran, visible pendant les compilations). Purement cosmétique et sans
  // effet en production, où il n'apparaît jamais.
  devIndicators: false,

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
      // L'ancienne page « plateformes » est devenue « Diffamation et retrait de
      // contenus ». Redirection 301 (statusCode explicite : `permanent: true`
      // émettrait un 308) pointant directement vers le slug définitif, sans
      // enchaîner sur une autre redirection.
      {
        source: "/competences/plateformes",
        destination: "/nos-domaines/diffamation-retrait-contenus",
        statusCode: 301,
      },
      // La page « escroquerie et fraude » a d'abord été poussée en top-level
      // (/avocat-escroquerie-fraude) avant d'être rangée sous /nos-domaines.
      // Redirection 301 pointant directement sur le slug définitif, sans chaîne.
      {
        source: "/avocat-escroquerie-fraude",
        destination: "/nos-domaines/escroquerie-fraude-bancaire",
        statusCode: 301,
      },

      // Renommage des cinq routes de domaines (refonte home, lot 2). Le site
      // étant en préproduction (noindex), rien n'est indexé ; ces 301 couvrent
      // les anciennes adresses qui auraient pu circuler par ailleurs. Chacune
      // vise directement le slug définitif : aucune n'en appelle une autre.
      {
        source: "/nos-domaines/rgpd-donnees",
        destination: "/nos-domaines/rgpd-donnees-personnelles",
        statusCode: 301,
      },
      {
        source: "/nos-domaines/ia-act",
        destination: "/nos-domaines/avocat-intelligence-artificielle",
        statusCode: 301,
      },
      // La page IA a été renommée en /avocat-intelligence-artificielle (maquette
      // V9). 301 directe vers le slug définitif.
      {
        source: "/nos-domaines/intelligence-artificielle",
        destination: "/nos-domaines/avocat-intelligence-artificielle",
        statusCode: 301,
      },
      {
        source: "/competences/ma-tech",
        destination: "/nos-domaines/ma-tech",
        statusCode: 301,
      },
      {
        source: "/nos-domaines/avocat-escroquerie-fraude",
        destination: "/nos-domaines/escroquerie-fraude-bancaire",
        statusCode: 301,
      },
      {
        source: "/nos-domaines/diffamation-retrait-de-contenus",
        destination: "/nos-domaines/diffamation-retrait-contenus",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
