"use client";

import Script from "next/script";
import { useCallback } from "react";

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

// Texte du bandeau (section 4 de docs/strategie-data-conversion.md).
const BANNER_TEXT =
  "Ces mesures servent à améliorer les pages et les analyses publiées par le cabinet. Aucune donnée n'est vendue ni utilisée à des fins publicitaires.";

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
};

export default function ConsentAnalytics() {
  const setup = useCallback(() => {
    const w = window as unknown as CCWindow;
    const cc = w.CookieConsent;
    if (!cc) return;

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
        // transmet explicitement le consentement « suivre », pour qu'il ne reste
        // pas en attente de sa propre bannière. Méthode documentée, symétrique du
        // doNotTrack posé au refus.
        try {
          w._hsq = w._hsq || [];
          w._hsq.push(["doNotTrack", { track: true }]);
        } catch {
          /* API HubSpot absente : rien à faire */
        }
      } else {
        // Finalité « Relation client » refusée ou retirée. Le bandeau HubSpot
        // étant désactivé dans le compte, son code (s'il a été chargé) suivrait
        // par défaut : on lui demande explicitement de ne pas suivre et de
        // révoquer son consentement, via son API de confidentialité.
        try {
          w._hsq = w._hsq || [];
          w._hsq.push(["doNotTrack"]);
          w._hsp = w._hsp || [];
          w._hsp.push(["revokeCookieConsent"]);
        } catch {
          /* API HubSpot absente : rien à faire */
        }
      }
    };

    cc.run({
      guiOptions: {
        // Bandeau en bas, pleine largeur, non bloquant (pas d'overlay).
        consentModal: { layout: "bar inline", position: "bottom", equalWeightButtons: true, flipButtons: false },
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
              title: "Votre vie privée",
              description: BANNER_TEXT,
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Tout refuser",
              showPreferencesBtn: "Personnaliser",
              footer: '<a href="/politique-cookies">Politique cookies</a>',
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
                  title: "Mesure d'audience (Google Analytics 4)",
                  description:
                    "Statistiques de fréquentation et de parcours, pour améliorer les pages. Cookies déposés uniquement après votre accord.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Analyse de l'expérience (Microsoft Clarity)",
                  description:
                    "Cartes de chaleur et relecture agrégée de la navigation, avec masquage strict de tout contenu saisi.",
                  linkedCategory: "experience",
                },
                {
                  title: "Relation client (suivi HubSpot)",
                  description:
                    "Rattache vos visites à votre fiche lorsque vous contactez le cabinet, pour un meilleur suivi.",
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

      {/* 3) CookieConsent v3 auto-hébergé (CSS + JS). CSS tiers chargé au
          runtime depuis public/ (non bundlable) ; nos variables de charte le
          surchargent (cookieconsent-theme.css). */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/vendor/cookieconsent/cookieconsent.css" />
      <Script
        id="cookieconsent"
        src="/vendor/cookieconsent/cookieconsent.umd.js"
        strategy="afterInteractive"
        onLoad={setup}
        onReady={setup}
      />

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
