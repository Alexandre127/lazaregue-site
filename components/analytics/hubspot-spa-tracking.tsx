"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

/**
 * Suivi HubSpot des navigations CÔTÉ CLIENT (App Router = SPA).
 *
 * HubSpot n'enregistre automatiquement QUE la page présente au chargement de son
 * script. Les pages atteintes ensuite par navigation interne (sans rechargement)
 * ne sont pas vues de HubSpot. On les lui signale manuellement.
 *
 * Règles (doc HubSpot tracking-code setPath/trackPageView) :
 *  - on NE retrace PAS la toute première page (HubSpot l'a déjà comptée) → on
 *    ignore le premier rendu ;
 *  - à chaque changement de route suivant, SI « Relation client » est accordé ET
 *    si HubSpot est bien chargé (cookie hubspotutk présent) : setPath(chemin)
 *    puis trackPageView. Le chemin commence par « / » (jamais l'URL complète) ;
 *  - au retrait du consentement, acceptedCategory("crm") repasse à false (et le
 *    cookie hubspotutk est révoqué) → les appels s'arrêtent d'eux-mêmes ;
 *  - on ne recharge JAMAIS le script HubSpot (il l'est une seule fois, via GTM).
 */

type HsWindow = {
  CookieConsent?: { acceptedCategory: (c: string) => boolean };
  _hsq?: unknown[];
};

function Tracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const premierRendu = useRef(true);

  useEffect(() => {
    // Première page : déjà comptée automatiquement par HubSpot au chargement.
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    try {
      const w = window as unknown as HsWindow;
      const crm = w.CookieConsent?.acceptedCategory?.("crm") === true;
      const hubspotCharge = document.cookie.includes("hubspotutk=");
      if (!crm || !hubspotCharge) return;
      const q = search?.toString();
      const chemin = pathname + (q ? `?${q}` : "");
      w._hsq = w._hsq || [];
      w._hsq.push(["setPath", chemin]);
      w._hsq.push(["trackPageView"]);
    } catch {
      /* API HubSpot absente : rien à faire */
    }
  }, [pathname, search]);

  return null;
}

export default function HubSpotSpaTracking() {
  // useSearchParams impose une frontière Suspense en App Router.
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
