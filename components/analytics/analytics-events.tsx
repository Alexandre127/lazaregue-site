"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { track, pageTypeFromPath, domaineFromPath } from "@/lib/analytics";

/**
 * Émetteur d'événements dataLayer PARTAGÉ (monté une fois dans le layout).
 *
 * Il couvre les événements transverses du §2 de la stratégie sans toucher
 * chaque page :
 *   - page_view ...... à chaque changement de route (page_type, domaine) ;
 *   - scroll_depth ... une fois par palier (50/75/90 %) et par page ;
 *   - phone_click / email_click / outbound_click ... par délégation de clic ;
 *   - tout élément portant `data-track="<event>"` (+ `data-track-*` en
 *     paramètres), pour les composants partagés (CTA, navigation…).
 *
 * RÈGLE : aucune donnée saisie ni personnelle. On ne pousse que des libellés
 * déjà publics (type de page, domaine, nom de composant, domaine d'un lien
 * sortant).
 */
export default function AnalyticsEvents() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  // page_view + réinitialisation des paliers de défilement à chaque route.
  useEffect(() => {
    if (!pathname || lastPage.current === pathname) return;
    lastPage.current = pathname;
    track("page_view", {
      page_type: pageTypeFromPath(pathname),
      domaine: domaineFromPath(pathname) || undefined,
    });

    const paliers = [50, 75, 90];
    const atteints = new Set<number>();
    let ticking = false;
    const mesure = () => {
      ticking = false;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      for (const p of paliers) {
        if (pct >= p && !atteints.has(p)) {
          atteints.add(p);
          track("scroll_depth", { percent: p, page_type: pageTypeFromPath(pathname) });
        }
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(mesure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Délégation de clic : liens tel/mailto/sortants + éléments data-track.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el) return;

      // 1) Événement explicite déclaré sur l'élément (ou un ancêtre).
      const marque = el.closest<HTMLElement>("[data-track]");
      if (marque?.dataset.track) {
        const params: Record<string, string> = {};
        for (const [k, v] of Object.entries(marque.dataset)) {
          if (k !== "track" && k.startsWith("track") && typeof v === "string") {
            // data-track-composant -> composant
            const nom = k.slice("track".length);
            params[nom.charAt(0).toLowerCase() + nom.slice(1)] = v;
          }
        }
        track(marque.dataset.track, params);
      }

      // 2) Liens : téléphone, e-mail, sortants.
      const a = el.closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        track("phone_click", { composant: marque?.dataset.trackComposant });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { composant: marque?.dataset.trackComposant });
      } else if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href);
          if (url.host !== window.location.host) {
            track("outbound_click", { domaine_lien: url.host });
          }
        } catch {
          /* href non analysable : ignoré */
        }
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
