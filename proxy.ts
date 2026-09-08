import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Anti-indexation tant que le site n'est pas servi depuis son domaine définitif.
 *
 * Le contrôle porte sur le DOMAINE SERVI (l'en-tête `host` de chaque requête),
 * pas sur le type de déploiement Vercel : la production servie temporairement
 * depuis *.vercel.app doit rester en noindex (Vercel n'ajoute `noindex` qu'aux
 * déploiements de type *preview*, pas à la production). Dès que
 * lazaregue-avocats.fr est rattaché, la requête arrive avec ce host → l'en-tête
 * disparaît de lui-même, SANS nouveau déploiement.
 *
 * Le domaine de production est piloté par variable d'environnement
 * (`PROD_HOST`), avec un repli sûr sur le domaine cible connu.
 */
const PROD_HOST = (process.env.PROD_HOST ?? "lazaregue-avocats.fr").toLowerCase();

export function proxy(request: NextRequest) {
  const host = (
    request.headers.get("host") ??
    request.headers.get("x-forwarded-host") ??
    ""
  )
    .toLowerCase()
    .split(":")[0]; // retire un éventuel port (dev local)

  const servedFromProd = host === PROD_HOST || host === `www.${PROD_HOST}`;

  const response = NextResponse.next();
  if (!servedFromProd) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  // Toutes les routes, sauf les assets internes de Next et le favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
