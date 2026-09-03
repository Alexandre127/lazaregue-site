import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lazaregue-avocats.fr";

/**
 * Directives d'exploration + déclaration du plan du site.
 *
 * Tout est ouvert : le site n'a pas de zone privée. Seules les routes
 * techniques de Next.js sont exclues — elles n'ont rien à faire dans l'index.
 *
 * Le groupe « * » autorise déjà tous les robots. Les robots des moteurs de
 * réponse par IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) sont
 * listés explicitement : c'est sans effet sur le comportement — ils étaient
 * déjà couverts — mais ça rend l'intention lisible et non ambiguë. Un robot
 * qui trouve son propre groupe l'utilise en priorité, d'où la reprise du même
 * `disallow` technique.
 */
const DISALLOW = ["/_next/", "/api/"];
const BOTS_IA = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...BOTS_IA.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
