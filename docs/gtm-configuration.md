# Configuration Google Tag Manager — Lazarègue Avocats

Ce document décrit le conteneur GTM qui pilote la mesure du site, dans le
respect du consentement. Il accompagne l'export importable
[`gtm-container-lazaregue.json`](./gtm-container-lazaregue.json).

> Le code du site (composant `components/analytics/consent-analytics.tsx`)
> déclare le **Consent Mode v2 en mode basique AVANT GTM** (toutes les finalités
> Google à `denied`), charge GTM, puis — via le bandeau **CookieConsent v3** —
> met à jour le consentement et pousse des événements `consent_update_*`. GTM ne
> fait que **relayer** aux outils, finalité par finalité. Rien n'est mesuré sans
> accord.

## 1. Identifiants

| Élément | Valeur |
|---|---|
| Conteneur GTM | `GTM-NCX9HMQV` |
| GA4 (Measurement ID) | `G-51QEQT8T1G` |
| Microsoft Clarity (Project ID) | `yqta0b1aix` |
| HubSpot (Hub ID) | `149462176` — hébergement UE (**eu1**) |

Côté site : `NEXT_PUBLIC_GTM_ID` (défaut `GTM-NCX9HMQV`),
`NEXT_PUBLIC_HUBSPOT_HUB_ID`. Le jeton serveur `HUBSPOT_PRIVATE_TOKEN` est déjà
dans Vercel (Production + Preview) et ne concerne QUE l'enregistrement serveur
des demandes (voir `lib/hubspot.ts`), pas GTM.

## 2. Principe de gating (très important)

- **GA4** est une balise Google : elle respecte nativement le Consent Mode.
  On l'autorise à se déclencher, mais elle est bridée tant que
  `analytics_storage` est `denied`. Le code passe `analytics_storage: granted`
  dès que la finalité « Mesure d'audience » est acceptée.
- **Clarity** et **HubSpot** ne sont PAS des balises Google : le Consent Mode ne
  les bride pas. On les **charge uniquement** via un déclencheur d'événement
  personnalisé (`consent_update_clarity`, `consent_update_hubspot`) que le site
  ne pousse **qu'après** acceptation de la finalité correspondante. Avant
  consentement, leur balise n'existe pas dans la page.

Conséquence : avant tout choix, et après « Tout refuser », **aucune** de ces
trois balises ne se charge. Chaque finalité acceptée seule ne charge que son
outil.

## 3. Consent Mode (déjà posé par le site, pour mémoire)

Déclaré avant GTM, donc **rien à recréer dans GTM** :

```js
gtag('consent','default',{
  ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted', security_storage:'granted',
  wait_for_update:500
});
```

Dans GTM : laisser la case **« Activer la prise en charge du consentement
intégré »** active sur la balise GA4 (comportement par défaut). Aucune balise
« Google Consent Mode » supplémentaire n'est nécessaire (mode basique).

## 4. Variables (dataLayer)

À créer en **Variable définie par l'utilisateur → Variable de couche de
données**, version 2 :

| Nom de variable | Clé dataLayer |
|---|---|
| `dlv.page_type` | `page_type` |
| `dlv.domaine` | `domaine` |
| `dlv.composant` | `composant` |
| `dlv.emplacement` | `emplacement` |
| `dlv.objet` | `objet` |
| `dlv.urgent` | `urgent` |
| `dlv.percent` | `percent` |
| `dlv.domaine_lien` | `domaine_lien` |
| `dlv.motif` | `motif` |

> **Aucune donnée personnelle** ne transite par le dataLayer : pas de nom,
> e-mail, téléphone, ni contenu de message. `objet` est une liste fermée,
> `urgent` est un booléen.

## 5. Déclencheurs (Triggers)

### Déclencheurs de consentement (activation des outils)

| Déclencheur | Type | Condition |
|---|---|---|
| `CE - consent_update_ga4` | Événement personnalisé | nom = `consent_update_ga4` |
| `CE - consent_update_clarity` | Événement personnalisé | nom = `consent_update_clarity` |
| `CE - consent_update_hubspot` | Événement personnalisé | nom = `consent_update_hubspot` |

### Déclencheurs d'événements de mesure (GA4)

Un déclencheur « Événement personnalisé » par événement du §2 de la stratégie :

`page_view`, `cta_click`, `phone_click`, `email_click`, `contact_start`,
`contact_submit`, `contact_error`, `scroll_depth`, `outbound_click`,
`nav_click`.

> Astuce : un seul déclencheur « Tous les événements personnalisés » avec une
> expression régulière sur le nom
> (`^(cta_click|phone_click|email_click|contact_start|contact_submit|contact_error|scroll_depth|outbound_click|nav_click)$`)
> + une balise GA4 unique « $event » est une alternative plus compacte à une
> balise par événement. L'export fourni crée des balises séparées, plus lisibles
> pour un premier paramétrage.

## 6. Balises (Tags)

### 6.1 GA4 — Configuration

- Type : **Google Tag** (ou « GA4 : configuration »).
- ID : `G-51QEQT8T1G`.
- Déclencheur : **Initialisation — toutes les pages** (le Consent Mode bride la
  collecte tant que `analytics_storage` = `denied`).
- Champs de configuration :
  - `cookie_expires` = `34164000` (13 mois, en secondes) — limite les cookies
    GA4 à **13 mois**.
  - Dans GA4 (Administration) : conservation des données **14 mois**, partage
    des données avec Google **désactivé**, Google Signals **désactivé**.

### 6.2 GA4 — Événements

Une balise **GA4 : événement** par déclencheur du §5.2, avec les paramètres
d'événement correspondants :

| Événement | Paramètres transmis |
|---|---|
| `page_view` | `page_type`, `domaine` |
| `cta_click` | `composant`, `emplacement` |
| `phone_click` | `composant` |
| `email_click` | `composant` |
| `nav_click` | `composant` |
| `contact_start` | `composant` |
| `contact_submit` | `objet`, `urgent` |
| `contact_error` | `composant`, `motif` |
| `scroll_depth` | `percent`, `page_type` |
| `outbound_click` | `domaine_lien` |

Marquer `contact_submit` comme **conversion** (événement clé) dans GA4.

### 6.3 Microsoft Clarity

- Type : **HTML personnalisé**.
- Déclencheur : `CE - consent_update_clarity` (donc jamais avant consentement).
- Masquage « Strict » réglé dans le compte Clarity ; le formulaire de contact
  porte en plus `data-clarity-mask="true"`.

```html
<script type="text/javascript">
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "yqta0b1aix");
</script>
```

### 6.4 HubSpot (suivi en ligne)

- Type : **HTML personnalisé**.
- Déclencheur : `CE - consent_update_hubspot` (donc jamais avant consentement).
- **Point de domaine UE** : charger le script `js-eu1` (compte eu1).
- Option « Ne pas définir de cookie jusqu'au déclenchement » : non requise, la
  balise elle-même ne se charge qu'après consentement.

```html
<script type="text/javascript" id="hs-script-loader" async defer
  src="//js-eu1.hs-scripts.com/149462176.js"></script>
```

> **Bannière HubSpot** : elle est **désactivée** dans le compte (Privacy &
> Consent → Cookies). Le consentement est géré par notre bandeau. En cas de
> retrait de la finalité « Relation client », le site appelle
> `_hsq.push(['doNotTrack'])` et `_hsp.push(['revokeCookieConsent'])` (voir
> `consent-analytics.tsx`), ce qui suffit à arrêter le suivi et à anonymiser.
> Aucun autre signal n'est nécessaire côté API HubSpot pour **démarrer** le
> suivi, puisque la balise n'est chargée qu'après accord.

## 7. Importer l'export

1. GTM → **Admin → Importer un conteneur**.
2. Fichier : `docs/gtm-container-lazaregue.json`.
3. Espace de travail : nouveau (par ex. « Mesure + consentement »).
4. Option : **Fusionner** (recommandé) puis « Renommer les conflits », pour ne
   pas écraser un paramétrage existant.
5. Vérifier/compléter : l'ID GA4, l'ID Clarity et l'ID HubSpot sont déjà
   renseignés ; contrôler les déclencheurs et le `cookie_expires`.
6. **Prévisualiser** avant publication (voir §8).

## 8. Vérification (mode Aperçu GTM)

Dans **Tag Assistant / Aperçu**, sur le site :

1. **Avant tout choix** : seul GTM est présent. Aucune balise GA4/Clarity/HubSpot
   déclenchée ; `analytics_storage` = `denied`.
2. **Accepter « Mesure d'audience » seule** : `consent_update_ga4` apparaît,
   `analytics_storage` passe à `granted`, GA4 se déclenche ; Clarity et HubSpot
   restent inactifs.
3. **Accepter « Analyse de l'expérience » seule** : `consent_update_clarity`,
   la balise Clarity se charge ; GA4 reste bridé, HubSpot inactif.
4. **Accepter « Relation client » seule** : `consent_update_hubspot`, la balise
   HubSpot se charge ; GA4 bridé, Clarity inactif.
5. **Tout refuser** : aucun `consent_update_*`, aucune balise non nécessaire.
6. **Parcours** : vérifier `page_view` (changement de page), `cta_click`,
   `phone_click`, `email_click`, `scroll_depth` (50/75/90), `contact_submit`.

## 9. Événements émis par le site (référence)

Émis par `lib/analytics.ts` / `components/analytics/analytics-events.tsx` et le
formulaire de contact. Les événements « vue » spécifiques (compétence, cas
client, formation…) sont couverts par `page_view` + `page_type` (+ `domaine`).

| Événement | Où | Paramètres |
|---|---|---|
| `page_view` | tracker de route | `page_type`, `domaine` |
| `scroll_depth` | tracker de route | `percent` (50/75/90), `page_type` |
| `cta_click` | CTA partagés (header, pré-footer) | `composant`, `emplacement` |
| `phone_click` | liens `tel:` | `composant` |
| `email_click` | liens `mailto:` | `composant` |
| `outbound_click` | liens externes | `domaine_lien` |
| `nav_click` | navigation (à marquer `data-track`) | `composant` |
| `contact_start` | formulaire (1re interaction) | `composant` |
| `contact_submit` | formulaire (succès) | `objet`, `urgent` |
| `contact_error` | formulaire (échec) | `composant`, `motif` |

Pour instrumenter un nouvel élément sans toucher au tracker : lui ajouter
`data-track="mon_event"` et, au besoin, `data-track-composant="…"`.
