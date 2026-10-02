"use client";

import Script from "next/script";
import { useCallback, useEffect } from "react";

/**
 * Couche consentement + mesure (CookieConsent v3, auto-hébergé).
 *
 * Ordre garanti :
 *  1. Consent Mode v2 (mode BASIQUE) : toutes les finalités Google à « denied »
 *     AVANT GTM → aucun tag Google ne se déclenche sans accord.
 *  2. Conteneur GTM (ne mesure rien seul ; relaie aux outils autorisés).
 *  3. CookieConsent v3 : bandeau + préférences. Trois finalités, chacune reliée
 *     à son déclenchement :
 *       - « Mesure d'audience » (GA4)        → Consent Mode analytics_storage
 *       - « Analyse de l'expérience » (Clarity) → dataLayer consent_update_clarity
 *       - « Relation client » (HubSpot)      → dataLayer consent_update_hubspot
 *     GTM porte les balises et leur condition de consentement (voir
 *     docs/gtm-configuration.md).
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NCX9HMQV";

const CONSENT_DEFAULT = `
// Désactive la bannière de cookies propre à HubSpot AVANT tout chargement de son
// code (doc HubSpot). Le consentement est géré par notre bandeau ; HubSpot ne
// doit pas afficher la sienne ni attendre son propre accord.
window.disableHubSpotCookieBanner = true;
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
`;

const GTM_LOADER = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
`;

// Texte du bandeau (validé par le cabinet, oct. 2026).
const BANNER_TEXT =
  "Avec votre accord, le cabinet mesure la fréquentation du site et la façon dont ses pages sont lues, afin de les améliorer. Aucun traceur publicitaire, aucune vente de données. Vous pouvez changer d'avis à tout moment avec le lien « Gérer les cookies », en bas de chaque page.";

type CookieConsent = {
  run: (config: Record<string, unknown>) => void;
  acceptedCategory: (c: string) => boolean;
  showPreferences: () => void;
};
type CCWindow = {
  CookieConsent?: CookieConsent;
  gtag?: (...a: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
  _hsq?: unknown[];
  _hsp?: unknown[];
  __ccPrefDelegation?: boolean;
};

export default function ConsentAnalytics() {
  const setup = useCallback(() => {
    const w = window as unknown as CCWindow;
    const cc = w.CookieConsent;
    if (!cc) return;

    // Ouverture du panneau depuis le lien « Personnaliser » du PIED du bandeau.
    // CookieConsent ne câble l'attribut `data-cc` que sur les éléments présents
    // dans le corps du bandeau (.cm__body) ou dans le document au tout premier
    // init ; notre lien, lui, est injecté dans le pied (.cm__footer), hors de
    // cette portée — il faut donc ouvrir le panneau nous-mêmes, par délégation
    // d'événement (une seule fois, quels que soient les réaffichages du bandeau).
    if (!w.__ccPrefDelegation) {
      w.__ccPrefDelegation = true;
      document.addEventListener("click", (e) => {
        const el = e.target as HTMLElement | null;
        const trigger = el?.closest?.('[data-cc="show-preferencesModal"]');
        if (trigger) {
          e.preventDefault();
          cc.showPreferences();
        }
      });
    }

    const push = (event: string) => {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event });
    };

    // Applique les choix : Consent Mode (GA4) + événements dataLayer (Clarity,
    // HubSpot) relayés par GTM après consentement de leur finalité.
    const apply = () => {
      const ga = cc.acceptedCategory("analytics");
      const clarity = cc.acceptedCategory("experience");
      const crm = cc.acceptedCategory("crm");
      if (w.gtag) w.gtag("consent", "update", { analytics_storage: ga ? "granted" : "denied" });
      if (ga) push("consent_update_ga4");
      if (clarity) push("consent_update_clarity");
      if (crm) {
        push("consent_update_hubspot");
        // Bannière HubSpot désactivée (window.disableHubSpotCookieBanner) : on lui
        // RETRANSMET le consentement à chaque chargement (HubSpot ne conserve pas
        // l'état). D'abord réactiver le suivi (si un doNotTrack avait été posé),
        // puis la méthode documentée setHubSpotConsent. On n'accorde QUE
        // l'analytique : notre finalité « Relation client » ne couvre ni la
        // publicité ni la « fonctionnalité » HubSpot.
        try {
          w._hsq = w._hsq || [];
          w._hsq.push(["doNotTrack", { track: true }]);
          w._hsp = w._hsp || [];
          w._hsp.push([
            "setHubSpotConsent",
            { analytics: true, advertisement: false, functionality: false },
          ]);
        } catch {
          /* API HubSpot absente : rien à faire */
        }
      } else {
        // Finalité « Relation client » refusée ou retirée : zéro collecte.
        // Retire tout consentement, révoque les cookies, puis force doNotTrack.
        // (Le suivi de route s'arrête de lui-même : il est conditionné au
        // consentement « Relation client ».)
        try {
          w._hsp = w._hsp || [];
          w._hsp.push([
            "setHubSpotConsent",
            { analytics: false, advertisement: false, functionality: false },
          ]);
          w._hsp.push(["revokeCookieConsent"]);
          w._hsq = w._hsq || [];
          w._hsq.push(["doNotTrack"]);
        } catch {
          /* API HubSpot absente : rien à faire */
        }
      }
    };

    cc.run({
      guiOptions: {
        // Bandeau en bas, pleine largeur, non bloquant (pas d'overlay).
        consentModal: { layout: "bar inline", position: "bottom", equalWeightButtons: true, flipButtons: true },
        preferencesModal: { layout: "box", position: "right", equalWeightButtons: true, flipButtons: false },
      },
      // Durée de conservation du choix : 6 mois, puis nouvelle demande.
      cookie: { name: "lz_consent", expiresAfterDays: 183 },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
        experience: {},
        crm: {},
      },
      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Vos choix sur ce site",
              description: BANNER_TEXT,
              // Deux boutons de même poids, côte à côte (égale prominence CNIL).
              acceptAllBtn: "Accepter",
              acceptNecessaryBtn: "Continuer sans accepter",
              // « Personnaliser » et « Politique de cookies » rendus comme deux
              // liens SOUS les boutons (pied du bandeau). « Personnaliser » ouvre
              // le panneau des finalités via l'attribut natif data-cc de
              // CookieConsent (preventDefault intégré → pas de navigation vers #).
              // Volontairement PAS de showPreferencesBtn : évite un 3e bouton
              // encadré ; le lien du pied le remplace.
              footer:
                '<a href="#" data-cc="show-preferencesModal">Personnaliser</a><a href="/politique-cookies">Politique de cookies</a>',
            },
            preferencesModal: {
              title: "Préférences de confidentialité",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              savePreferencesBtn: "Enregistrer mes choix",
              closeIconLabel: "Fermer",
              serviceCounterLabel: "finalité|finalités",
              sections: [
                {
                  title: "Cookies nécessaires",
                  description:
                    "Indispensables au fonctionnement et à la sécurité du site ; ils conservent aussi votre choix de consentement. Toujours actifs.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Mesure d'audience (Google Analytics)",
                  description:
                    "Compter les visites et les pages consultées, de façon globale.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Amélioration des pages (Microsoft Clarity)",
                  description:
                    "Voir comment les pages sont parcourues, pour les rendre plus claires. Les champs des formulaires ne sont jamais enregistrés.",
                  linkedCategory: "experience",
                },
                {
                  title: "Suivi des demandes (HubSpot)",
                  description:
                    "Lorsque vous écrivez au cabinet, relier vos visites précédentes à votre demande, pour mieux en comprendre l'objet.",
                  linkedCategory: "crm",
                },
                {
                  title: "En savoir plus",
                  description:
                    'Le détail des outils, finalités et durées figure dans la <a href="/politique-cookies">politique cookies</a>.',
                },
              ],
            },
          },
        },
      },
      // onConsent couvre le premier accord ET les visites suivantes ; onChange
      // les modifications ultérieures. (Pas d'onFirstConsent : éviterait un
      // double déclenchement au premier choix.)
      onConsent: apply,
      onChange: apply,
    });
  }, []);

  // Charge CookieConsent (UMD auto-hébergé) manuellement, APRÈS l'hydratation.
  // Volontairement PAS via next/script : celui-ci ajoutait un
  // <link rel="preload" as="script">, signalé « préchargé mais inutilisé » par le
  // navigateur sur les pages lourdes (le script ne s'exécutant qu'après
  // hydratation). Ici, aucun preload : le script est inséré au moment réel de
  // son chargement, puis setup() s'exécute à son onload.
  useEffect(() => {
    const w = window as unknown as CCWindow;
    if (w.CookieConsent) {
      setup();
      return;
    }
    if (document.getElementById("cookieconsent-js")) return;
    const s = document.createElement("script");
    s.id = "cookieconsent-js";
    s.src = "/vendor/cookieconsent/cookieconsent.umd.js";
    s.async = true;
    s.addEventListener("load", setup);
    document.body.appendChild(s);
  }, [setup]);

  return (
    <>
      {/* 1) Consent Mode v2 par défaut — AVANT GTM (rendu depuis le root layout). */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="consent-default" strategy="beforeInteractive">
        {CONSENT_DEFAULT}
      </Script>

      {/* 2) Conteneur GTM. */}
      <Script id="gtm-loader" strategy="afterInteractive">
        {GTM_LOADER}
      </Script>

      {/* 3) CookieConsent v3 auto-hébergé. Le CSS tiers est chargé au runtime
          depuis public/ (non bundlable) ; nos variables de charte le surchargent
          (cookieconsent-theme.css). Le JS, lui, est chargé dans un useEffect
          ci-dessus (pas de next/script → pas de preload « inutilisé »). */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/vendor/cookieconsent/cookieconsent.css" />

      {/* GTM noscript. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="gtm"
        />
      </noscript>
    </>
  );
}
