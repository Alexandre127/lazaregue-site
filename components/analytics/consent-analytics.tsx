"use client";

import Script from "next/script";
import { useCallback } from "react";

/**
 * Couche consentement + mesure.
 *
 * Ordre garanti :
 *  1. Consent Mode v2 (mode BASIQUE) : toutes les finalités Google à « denied »
 *     AVANT le chargement de GTM → aucun tag Google ne se déclenche sans accord.
 *  2. Conteneur GTM (ne mesure rien seul ; relaie aux outils autorisés).
 *  3. tarteaucitron (auto-hébergé, CSS 100 % maison) : bandeau + préférences.
 *     Trois finalités, chacune reliée à son déclenchement :
 *       - « Mesure d'audience » (GA4)      → gtag consent update analytics_storage
 *       - « Analyse de l'expérience » (Clarity) → dataLayer event consent_update_clarity
 *       - « Relation client » (HubSpot)    → dataLayer event consent_update_hubspot
 *     GTM porte les balises et leur condition de consentement (voir
 *     docs/gtm-configuration.md).
 *
 * Identifiant GTM : variable d'env NEXT_PUBLIC_GTM_ID (valeur par défaut en
 * configuration ci-dessous). GA4 et Clarity sont configurés DANS GTM.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NCX9HMQV";

// 1) Consent Mode v2 — défauts « denied » (exécuté avant GTM).
const CONSENT_DEFAULT = `
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

// 2) Chargement du conteneur GTM.
const GTM_LOADER = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
`;

type TacService = {
  key: string;
  type: string;
  name: string;
  needConsent: boolean;
  cookies: string[];
  js: () => void;
  fallback: () => void;
};
type Tac = {
  __lzInit?: boolean;
  services: Record<string, TacService>;
  job: string[];
  customText?: Record<string, string>;
  init: (opts: Record<string, unknown>) => void;
  userInterface?: { openPanel?: () => void };
};
type TacWindow = {
  tarteaucitron?: Tac;
  tarteaucitronForceLanguage?: string;
  tarteaucitronCustomText?: Record<string, string>;
  gtag?: (...a: unknown[]) => void;
  dataLayer?: Record<string, unknown>[];
};

export default function ConsentAnalytics() {
  // 3) Configuration de tarteaucitron, une fois son script chargé.
  const setupTarteaucitron = useCallback(() => {
    const w = window as unknown as TacWindow;
    const tac = w.tarteaucitron;
    if (!tac || tac.__lzInit) return;
    tac.__lzInit = true;

    const run = () => {
    const push = (event: string) => {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event });
    };

    // Textes (section 4 du document). tarteaucitron fusionne la variable
    // globale `tarteaucitronCustomText` dans `tarteaucitron.lang`.
    w.tarteaucitronForceLanguage = "fr";
    w.tarteaucitronCustomText = {
      alertBigPrivacy:
        "Ces mesures servent à améliorer les pages et les analyses publiées par le cabinet. Aucune donnée n'est vendue ni utilisée à des fins publicitaires.",
      alertBigTitle: "Votre vie privée",
      personalize: "Personnaliser",
      acceptAll: "Tout accepter",
      denyAll: "Tout refuser",
      title: "Panneau de gestion du consentement",
    };

    // --- Finalité « Mesure d'audience » : GA4 (via Consent Mode + GTM) ---
    tac.services.ga4 = {
      key: "ga4",
      type: "analytic",
      name: "Mesure d'audience (Google Analytics)",
      needConsent: true,
      cookies: ["_ga", "_gid", "_gat", "_ga_" + "*"],
      js: function () {
        if (w.gtag) w.gtag("consent", "update", { analytics_storage: "granted" });
        push("consent_update_ga4");
      },
      fallback: function () {
        if (w.gtag) w.gtag("consent", "update", { analytics_storage: "denied" });
      },
    };

    // --- Finalité « Analyse de l'expérience » : Microsoft Clarity (via GTM) ---
    tac.services.clarity = {
      key: "clarity",
      type: "analytic",
      name: "Analyse de l'expérience (Microsoft Clarity)",
      needConsent: true,
      cookies: ["_clck", "_clsk", "CLID", "ANONCHK", "MR", "MUID", "SM"],
      js: function () {
        push("consent_update_clarity");
      },
      fallback: function () {},
    };

    // --- Finalité « Relation client » : suivi HubSpot (via GTM) ---
    tac.services.hubspot = {
      key: "hubspot",
      type: "api",
      name: "Relation client (suivi HubSpot)",
      needConsent: true,
      cookies: ["__hstc", "__hssc", "__hssrc", "hubspotutk"],
      js: function () {
        push("consent_update_hubspot");
      },
      fallback: function () {},
    };

    tac.job = tac.job || [];
    tac.job.push("ga4", "clarity", "hubspot");

    // Initialisation EN DERNIER : tarteaucitron, chargé après le load de la
    // page (readyState « complete »), construit l'UI immédiatement — il faut
    // donc que les services et jobs soient déjà déclarés. Bandeau en bas, non
    // bloquant, CSS 100 % maison, crédit retiré.
    tac.init({
      privacyUrl: "/politique-de-confidentialite",
      bodyPosition: "bottom",
      hashtag: "#gerer-cookies",
      cookieName: "lz_consent",
      orientation: "bottom",
      groupServices: false,
      showAlertSmall: false,
      cookieslider: false,
      showIcon: false,
      showDetailsOnClick: true,
      serviceDefaultState: "wait",
      AcceptAllCta: true,
      DenyAllCta: true,
      highPrivacy: true,
      handleBrowserDNTRequest: false,
      removeCredit: true,
      moreInfoLink: true,
      useExternalCss: true, // habillage 100 % maison (tarteaucitron-theme.css)
      useExternalJs: false, // flux normal : charge lang + services (auto-hébergés)
      readmoreLink: "/politique-de-confidentialite",
      mandatory: true,
      mandatoryCta: false,
    });
    };

    // tarteaucitron construit son UI dès l'init quand la page est déjà chargée.
    // On diffère donc tout le setup jusqu'à readyState « complete » pour éviter
    // la course avec l'événement load (sinon le bandeau n'est jamais construit).
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
  }, []);

  return (
    <>
      {/* 1) Consent Mode v2 par défaut — AVANT GTM. Rendu depuis le root layout
          (App Router) : la règle lint vise l'ancien pages/_document, sans objet ici. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="consent-default" strategy="beforeInteractive">
        {CONSENT_DEFAULT}
      </Script>

      {/* 2) Conteneur GTM. */}
      <Script id="gtm-loader" strategy="afterInteractive">
        {GTM_LOADER}
      </Script>

      {/* 3) tarteaucitron auto-hébergé. */}
      <Script
        id="tarteaucitron"
        src="/vendor/tarteaucitron/tarteaucitron.js"
        strategy="afterInteractive"
        onLoad={setupTarteaucitron}
        onReady={setupTarteaucitron}
      />

      {/* GTM noscript (navigateurs sans JS). */}
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
