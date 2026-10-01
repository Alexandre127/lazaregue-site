import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * SITE PUBLIC — verrou pré-prod levé le 1er octobre 2026.
 *
 *   · Agents de lecture à la demande (Claude, ChatGPT, Perplexity) → Allow: /
 *   · Robots d'entraînement / d'aspiration                         → Disallow: /
 *     (choix éditorial : on autorise la lecture à la demande, pas l'entraînement)
 *   · Tous les autres robots (`*`)  → Allow: / sauf /api/ et /_next/ (routes techniques)
 *
 * Le `noindex` site-wide a été retiré de app/layout.tsx. L'en-tête
 * `X-Robots-Tag: noindex` de proxy.ts ne s'applique plus que hors domaine de
 * production (previews *.vercel.app) : il disparaît de lui-même sur
 * lazaregue-avocats.fr. Deux pages de test gardent leur `noindex` propre.
 *
 * Le `sitemap.xml` est déclaré ci-dessous (domaine de production).
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
      // Site public (verrou levé le 1er oct. 2026) : exploration autorisée, hors
      // routes techniques.
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
