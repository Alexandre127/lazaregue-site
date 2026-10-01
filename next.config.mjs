import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const SITE_HOST = "lazaregue-avocats.fr";
const CANON = `https://${SITE_HOST}`;

/*
 * Redirections de MIGRATION (anciens sites → nouveau site).
 *
 * Deux origines :
 *  - l'ancien site vitrine (SPA Netlify) encore en ligne sur le domaine ;
 *  - l'ancien site WordPress (pages de compétences uniquement — pas les
 *    tribunes, articles, pages institutionnelles ni adresses techniques).
 *
 * Chaque entrée vise DIRECTEMENT la page définitive (pas de chaîne de
 * redirections de contenu, pas de boucle). Placées EN TÊTE du tableau et avec
 * une destination ABSOLUE (domaine canonique sans www), une requête sur www est
 * redirigée en UN SEUL saut 301 (sans repasser par la canonicalisation www→nu).
 * La variante avec barre oblique finale est ramenée à la forme sans barre par
 * la normalisation interne de Next (308), puis ce 301 s'applique : la cible est
 * atteinte directement, sans redirection de contenu intermédiaire.
 *
 * `[from, to]` : `from` est le chemin sans barre finale ; les deux variantes
 * (avec et sans barre finale) sont générées automatiquement plus bas.
 */
const LEGACY = [
  // --- Ancien site vitrine (SPA) ---
  ["/confidentialite", "/politique-de-confidentialite"],
  ["/licence-images", "/mentions-legales"], // pas d'équivalent : page légale la plus proche
  ["/action-collective", "/cas-clients/photographies-utilisees-sans-autorisation-reclamation"], // recouvrement abusif de photothèques → cas client photographies/PI
  ["/litige-afp-picrights/confier", "/contact"], // page de conversion « confier mon dossier » → contact

  // --- Ancien WordPress : RGPD ---
  ["/avocat-en-droit-du-numerique/avocat-rgpd", "/nos-domaines/rgpd-donnees-personnelles"],
  ["/avocat-en-droit-du-numerique/avocat-rgpd/mise-en-conformite-rgpd", "/nos-domaines/rgpd-donnees-personnelles"],
  ["/avocat-rgpd", "/nos-domaines/rgpd-donnees-personnelles"],
  ["/dpo-rgpd", "/nos-domaines/rgpd-donnees-personnelles"],
  ["/big-data-et-donnees-personnelles-rgpd", "/nos-domaines/rgpd-donnees-personnelles"],
  ["/offre-rgpd-privacy-shield", "/nos-domaines/rgpd-donnees-personnelles"],

  // --- Ancien WordPress : Cybersécurité ---
  ["/avocat-en-droit-du-numerique/avocat-en-cybersecurite", "/nos-domaines/cybersecurite"],

  // --- Ancien WordPress : Cybercriminalité ---
  ["/avocat-en-droit-du-numerique/avocat-en-cybersecurite/avocat-piratage-informatique", "/nos-domaines/cybercriminalite"],
  ["/avocat-en-droit-du-numerique/avocat-en-cybersecurite/avocat-usurpation-didentite", "/nos-domaines/cybercriminalite"],
  ["/cybercriminalite-et-action-judiciaire", "/nos-domaines/cybercriminalite"],
  ["/cybercriminalite-et-action-judiciaire/risques-de-la-cybercriminalite", "/nos-domaines/cybercriminalite"],

  // --- Ancien WordPress : Escroquerie ---
  ["/avocat-en-droit-du-numerique/avocat-escroquerie", "/nos-domaines/escroquerie-fraude-bancaire"],

  // --- Ancien WordPress : Diffamation ---
  ["/avocat-en-droit-du-numerique/avocat-droit-de-la-presse", "/nos-domaines/diffamation-retrait-contenus"],
  ["/droit-a-loubli", "/nos-domaines/diffamation-retrait-contenus"],

  // --- Ancien WordPress : Contrats informatiques ---
  ["/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies", "/nos-domaines/contrats-informatiques"],
  ["/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/avocat-application-mobiles", "/nos-domaines/contrats-informatiques"],
  ["/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/avocat-droit-informatique", "/nos-domaines/contrats-informatiques"],
  ["/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/droit-logiciel", "/nos-domaines/contrats-informatiques"],
  ["/avocat-en-droit-du-numerique/avocat-droit-e-commerce", "/nos-domaines/contrats-informatiques"],
  ["/avocat-en-droit-du-numerique/avocat-droit-e-commerce/avocat-redaction-cgv", "/nos-domaines/contrats-informatiques"],
  ["/applications-digitales-et-ecommerce", "/nos-domaines/contrats-informatiques"],

  // --- Ancien WordPress : page d'ensemble des compétences ---
  ["/avocat-en-droit-du-numerique", "/nos-domaines"],

  // --- Exception : lien entrant actif (legavox.fr, sos-justice.net) ---
  ["/litige-afp-picrights/courrier-picrights", "/cas-clients/photographies-utilisees-sans-autorisation-reclamation"],
];

// Génère pour chaque entrée les deux variantes (sans et avec barre finale),
// vers la destination absolue, en 301.
const legacyRedirects = LEGACY.flatMap(([from, to]) => [
  { source: from, destination: CANON + to, statusCode: 301 },
  { source: `${from}/`, destination: CANON + to, statusCode: 301 },
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: rootDir,
  },

  // Masque l'indicateur de développement de Next (le rond « Dev Tools » en bas
  // de l'écran, visible pendant les compilations). Purement cosmétique et sans
  // effet en production, où il n'apparaît jamais.
  devIndicators: false,

  // Formats servis par next/image. AVIF en premier (meilleure compression),
  // WebP en repli ; Next négocie selon les en-têtes Accept du navigateur et
  // retombe sur la source d'origine pour les agents qui ne gèrent ni l'un ni
  // l'autre. S'applique à toutes les images rendues via next/image, quel que
  // soit le format du fichier source.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Une seule forme d'URL, sans barre oblique finale : `/page/` est redirigé
  // en 308 vers `/page`. C'est déjà le défaut de Next, rendu explicite ici
  // pour verrouiller l'intention et éviter les doublons d'exploration.
  trailingSlash: false,

  async redirects() {
    return [
      // 1) Redirections de MIGRATION en tête (voir LEGACY ci-dessus) : comme
      // elles n'ont pas de condition d'hôte et visent une URL absolue, elles
      // s'appliquent avant la règle www→nu ci-dessous et évitent toute chaîne.
      ...legacyRedirects,

      // 2) Doublons de domaine : toute requête sur www.<domaine> est redirigée
      // en permanent vers le domaine nu, forme retenue pour les canoniques.
      // (Sur Vercel, la configuration du domaine reste le point de contrôle
      // principal ; cette règle est une sécurité côté application.)
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${SITE_HOST}` }],
        destination: `${CANON}/:path*`,
        permanent: true,
      },

        // Domaine secondaire lazaregue-avocats.tech (et www) → même chemin sur
        // le domaine principal. Règle PRÊTE mais inactive tant que le domaine
        // n'est pas rattaché au projet Vercel (aucune requête sur ce host
        // n'atteint l'application avant ce rattachement ; elle s'activera alors
        // d'elle-même).
        {
          source: "/:path*",
          has: [{ type: "host", value: "lazaregue-avocats.tech" }],
          destination: `${CANON}/:path*`,
          statusCode: 301,
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "www.lazaregue-avocats.tech" }],
          destination: `${CANON}/:path*`,
          statusCode: 301,
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
        // La page dédiée NIS 2 a été supprimée : son contenu est couvert par la
        // page Cybersécurité. 301 directe vers le slug définitif, sans chaîne.
        {
          source: "/nos-domaines/cybersecurite/nis2",
          destination: "/nos-domaines/cybersecurite",
          statusCode: 301,
        },
        // Le cas client « Usurpation d'identité » (n° 04) a été retiré de la
        // collection. 301 vers l'index des cas clients (pas de cas de remplacement).
        {
          source: "/cas-clients/usurpation-identite-identifier-auteur-article-145-cpc",
          destination: "/cas-clients",
          statusCode: 301,
        },
        // Ancienne page « /litige-afp-picrights » de l'ancien site (réclamations
        // PicRights/AFP pour photographies), qui reçoit encore du trafic Google.
        // 301 directe vers le cas client correspondant (n° 07, photographies / PI).
        // Les deux formes (avec et sans barre oblique finale) sont couvertes.
        {
          source: "/litige-afp-picrights",
          destination: "/cas-clients/photographies-utilisees-sans-autorisation-reclamation",
          statusCode: 301,
        },
        {
          source: "/litige-afp-picrights/",
          destination: "/cas-clients/photographies-utilisees-sans-autorisation-reclamation",
          statusCode: 301,
        },
      ];
  },
};

export default nextConfig;
