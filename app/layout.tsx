import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, DM_Mono, Caveat } from "next/font/google";
import { GlobalCta } from "@/components/footer/global-cta";
import { SiteFooter } from "@/components/footer/site-footer";
import { PageEffects } from "@/components/lazaregue/page-effects";
import { SiteHeader } from "@/components/header/site-header";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";
import "./hero.css";

/**
 * Polices AUTO-HÉBERGÉES (charte § 08, UX-121). next/font/google télécharge les
 * WOFF2 au build, les sert depuis notre domaine (aucune requête runtime vers
 * Google), sous-ensemble latin + latin-ext, applique font-display: swap et
 * génère un repli à métriques ajustées (réduit le CLS). Les mêmes noms de
 * variables (--ff-*) qu'auparavant sont posés sur <html> : le reste du CSS
 * (var(--ff-body)…) est inchangé. Poids repris à l'identique du CDN retiré, donc
 * aucun changement de rendu.
 *
 * Préchargement réservé à la police CRITIQUE (Space Grotesk, corps de texte) ;
 * les autres se chargent à l'usage (swap), sans bloquer le rendu.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--ff-body",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--ff-display",
  preload: false,
  fallback: ["sans-serif"],
});
const dmMono = DM_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--ff-mono",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  display: "swap",
  variable: "--ff-hand",
  preload: false,
  fallback: ["cursive"],
});

const fontVariables = `${spaceGrotesk.variable} ${bebasNeue.variable} ${dmMono.variable} ${caveat.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lazarègue Avocats — Droit du numérique",
  description:
    "Cabinet d'avocats dédié au droit du numérique, à la cybersécurité, à l'intelligence artificielle et à la régulation des plateformes.",
  // VERROU PRÉ-PROD — le site n'est pas encore public (contenus en placeholder,
  // ex. {{CHAPO_A_REDIGER}}). noindex/nofollow à l'échelle du site. À RETIRER
  // le jour de la mise en ligne publique (voir aussi app/robots.ts).
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontVariables}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body className="min-h-screen bg-navy antialiased text-wh">
        <PageEffects />
        <SiteHeader />
        {children}
        <GlobalCta />
        <SiteFooter />
      </body>
    </html>
  );
}
