"use client";

import { track } from "@/lib/analytics";

/**
 * Lien de téléchargement du PDF de la note. Composant client : pousse un
 * événement GA4 (via le dataLayer / GTM) au clic, sans donnée personnelle.
 * Téléchargement libre, sans formulaire.
 */
export default function PdfLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      download
      onClick={() => track("telechargement_note", { composant: "note_banques", page_type: "ressource" })}
    >
      {children}
    </a>
  );
}
