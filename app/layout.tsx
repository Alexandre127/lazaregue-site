import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/lazaregue/page-effects";
import { SiteHeader } from "@/components/header/site-header";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";
import "./hero.css";

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
    <html lang="fr">
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
        <Footer />
      </body>
    </html>
  );
}
