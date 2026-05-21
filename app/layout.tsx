import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/lazaregue/page-effects";
import { Navbar11 } from "@/components/navbar-11";
import "./globals.css";
import "./hero.css";

export const metadata: Metadata = {
  title: "Lazarègue Avocats — Droit du numérique",
  description:
    "Cabinet d'avocats dédié au droit du numérique, à la cybersécurité, à l'intelligence artificielle et à la régulation des plateformes.",
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
        <Navbar11 />
        {children}
        <Footer />
      </body>
    </html>
  );
}
