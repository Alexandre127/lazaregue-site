"use client";

import { track } from "@/lib/analytics";

/**
 * Lien de téléchargement (rapport PDF, liste Excel). Composant client : pousse
 * un événement GA4 (via le dataLayer / GTM) au clic, sans donnée personnelle.
 * Téléchargement libre, sans formulaire.
 */
export default function DownloadLink({
  href,
  fichier,
  composant,
  className,
  children,
}: {
  href: string;
  fichier: string;
  composant: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      download
      onClick={() => track("telechargement_rapport", { fichier, composant, page_type: "ressource" })}
    >
      {children}
    </a>
  );
}
