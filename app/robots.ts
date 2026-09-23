import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * PRÉPROD — accessible aux AGENTS DE LECTURE IA « à la demande », NON indexable.
 *
 * Objectif (23 sept. 2026) : permettre à Claude, ChatGPT et Perplexity d'OUVRIR
 * les pages lorsqu'un utilisateur le demande, tout en interdisant l'indexation
 * par les moteurs et l'aspiration par les robots d'entraînement.
 *   · Agents de lecture à la demande        → Allow: /
 *   · Robots d'entraînement / d'aspiration   → Disallow: /
 *   · Tous les autres robots (`*`)           → Disallow: /  (préprod verrouillée)
 *
 * L'INDEXATION reste bloquée indépendamment de ce fichier : balise
 * `robots: { index:false, follow:false }` (app/layout.tsx) + en-tête
 * `X-Robots-Tag: noindex, nofollow` (proxy.ts). Un `Allow` dans robots.txt
 * n'autorise que l'exploration/lecture, jamais l'indexation.
 *
 * Le `sitemap.xml` est déclaré (les agents de lecture peuvent s'y référer).
 *
 * À la mise en ligne publique : rouvrir `Allow: /` pour `*` (en excluant
 * /api/ et /_next/), et retirer le `noindex` (layout.tsx + proxy.ts).
 */

// Agents de LECTURE à la demande (fetch déclenché par un utilisateur) : autorisés.
const LECTEURS = [
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
];

// Robots d'ENTRAÎNEMENT / d'aspiration / d'indexation de corpus : interdits.
const ENTRAINEMENT = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Google-Extended",
  "Bytespider",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: LECTEURS, allow: "/" },
      { userAgent: ENTRAINEMENT, disallow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
