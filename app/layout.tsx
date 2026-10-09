import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, DM_Mono } from "next/font/google";
import { GlobalCta } from "@/components/footer/global-cta";
import { SiteFooter } from "@/components/footer/site-footer";
import { PageEffects } from "@/components/lazaregue/page-effects";
import { SiteHeader } from "@/components/header/site-header";
import { SITE_URL } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";
import ConsentAnalytics from "@/components/analytics/consent-analytics";
import AnalyticsEvents from "@/components/analytics/analytics-events";
import HubSpotSpaTracking from "@/components/analytics/hubspot-spa-tracking";
import "./globals.css";
import "./hero.css";
import "./cookieconsent-theme.css";

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
const fontVariables = `${spaceGrotesk.variable} ${bebasNeue.variable} ${dmMono.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Lazarègue Avocats — Droit du numérique",
  description:
    "Cabinet d'avocats dédié au droit du numérique, à la cybersécurité, à l'intelligence artificielle et à la régulation des plateformes.",
  // Site public : indexation autorisée (le verrou pré-prod noindex a été levé le
  // 1er octobre 2026). Deux pages de test gardent leur noindex propre
  // (/ressources/oeuvre-originale, /ressources/faux-conseiller-bancaire-remboursement).
  // Image de partage par défaut (1200×630). Next ne fusionnant pas en profondeur
  // openGraph/twitter, chaque page qui les redéclare reprend aussi cette image ;
  // ce défaut couvre les pages sans métadonnées propres (ex. sous-pages
  // Formations). metadataBase (ci-dessus) préfixe l'URL absolue.
  // Autorise les grands aperçus d'image dans les résultats (Google Discover,
  // aperçus enrichis). Une page qui déclare son propre `robots` le remplace.
  robots: { "max-image-preview": "large" },
  openGraph: {
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="min-h-screen bg-navy antialiased text-wh">
        <ConsentAnalytics />
        <AnalyticsEvents />
        <HubSpotSpaTracking />
        <PageEffects />
        <SiteHeader />
        {children}
        <GlobalCta />
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
