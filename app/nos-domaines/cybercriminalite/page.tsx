import type { Metadata } from "next";
import CybercriminaliteClient from "./CybercriminaliteClient";
import { FAQ_ITEMS } from "./faq";

/**
 * Le titre vise l'intention d'urgence — c'est ce que tape un dirigeant dont
 * l'incident est déjà en cours — plutôt que le terme « cybercriminalité »
 * seul, dominé par la presse et les sites institutionnels. La double
 * position (poursuivre / défendre) est reprise telle quelle : elle
 * qualifie autant le mis en cause que la victime.
 */
const TITLE = "Avocat cybercriminalité à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Intrusion, rançongiciel, extorsion, salarié malveillant, exfiltration de données : le cabinet intervient au pénal, pour poursuivre comme pour défendre.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/cybercriminalite" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/cybercriminalite",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const AVOCATS = [
  {
    name: "Alexandre Lazarègue",
    jobTitle: "Avocat — droit pénal du numérique",
    knowsAbout: ["Cybercriminalité", "Rançongiciel", "Atteintes aux systèmes de traitement automatisé de données", "Fraude au président"],
  },
  {
    name: "Amir Ben Majed",
    jobTitle: "Avocat — contentieux IT et pénal",
    knowsAbout: ["Vol de données", "Salarié malveillant", "Fraude numérique en entreprise"],
  },
  {
    name: "Sarah Hinderer",
    jobTitle: "Avocate — données personnelles et pénal",
    knowsAbout: ["Notification de violation de données", "Défense devant la CNIL", "Article 33 RGPD"],
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat cybercriminalité & fraude numérique — Lazarègue Avocats",
      description:
        "Plainte pénale et défense après incident cyber : rançongiciel, fraude au virement, extraction frauduleuse de données par un ex-salarié, atteinte à un système de traitement automatisé de données, mise en cause après violation de données.",
      url: "https://lazaregue-avocats.fr/nos-domaines/cybercriminalite",
      telephone: "+33181706200",
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Plainte pénale cybercriminalité, ransomware, fraude au virement, vol de données par un salarié, défense pénale informatique, notification CNIL après incident",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
    },
    ...AVOCATS.map((a) => ({
      "@type": "Person",
      name: a.name,
      honorificPrefix: "Maître",
      jobTitle: a.jobTitle,
      knowsAbout: a.knowsAbout,
      worksFor: { "@type": "LegalService", name: "Lazarègue Avocats" },
      url: "https://lazaregue-avocats.fr/le-cabinet",
    })),
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <CybercriminaliteClient />
    </>
  );
}
