import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Politique cookies | Lazarègue Avocats";
const DESCRIPTION =
  "Cookies et traceurs déposés par le site Lazarègue Avocats : finalités, consentement, durées et outils (mesure d'audience, analyse de l'expérience, suivi CRM).";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/politique-cookies" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/politique-cookies", siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website", images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
};

/**
 * Page provisoire. Le texte définitif de la politique cookies (outils,
 * finalités, durées, base légale, transferts) est en cours de validation ;
 * voir la section « Traceurs et mesure d'audience » de la politique de
 * confidentialité en attendant.
 */
export default function Page() {
  return (
    <main id="contenu" className="wrap" style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(32px,6vw,72px) 16px" }}>
      <nav className="crumb" aria-label="Fil d’Ariane" style={{ marginBottom: 18 }}>
        <Link href="/">Accueil</Link> <span aria-hidden>/</span> <span aria-current="page">Politique cookies</span>
      </nav>
      <h1 style={{ marginBottom: 16 }}>Politique cookies</h1>
      <p style={{ marginBottom: 14 }}>
        Le site ne dépose les cookies de mesure d’audience, d’analyse de l’expérience et de suivi de la
        relation client qu’après votre consentement, recueilli finalité par finalité. Vous pouvez à tout
        moment modifier ou retirer ce choix via le lien «&nbsp;Gérer les cookies&nbsp;» en pied de page.
      </p>
      <p>
        Le détail des outils, finalités, durées de conservation et transferts figure, en attendant la
        version dédiée de cette page, dans la section «&nbsp;Traceurs et mesure d’audience&nbsp;» de la{" "}
        <Link href="/politique-de-confidentialite#cookies">politique de confidentialité</Link>.
      </p>
    </main>
  );
}
