"use client";

import { usePathname } from "next/navigation";

/**
 * Pages de pièces (`/v/<jeton>`) : vidéos consultables depuis des conclusions
 * judiciaires, par lien ou QR code.
 *
 * Ces pages s'affichent SANS l'habillage du site : ni en-tête, ni barre basse,
 * ni appel à l'action, ni pied de page, ni curseur personnalisé, ni bandeau de
 * cookies ni outil de mesure (GTM, GA4, Clarity, HubSpot, Vercel Analytics).
 * Le lecteur d'une pièce (magistrat, confrère) ne doit voir que la vidéo et sa
 * légende, sans consentement à donner ni traceur déposé.
 *
 * Tout le reste du site est inchangé : ce composant rend ses enfants partout
 * ailleurs.
 */
export const PREFIXE_PIECES = "/v/";

export function estPagePiece(pathname: string | null): boolean {
  return !!pathname && pathname.startsWith(PREFIXE_PIECES);
}

export function HorsPieces({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (estPagePiece(pathname)) return null;
  return <>{children}</>;
}
