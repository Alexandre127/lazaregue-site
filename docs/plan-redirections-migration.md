# Plan de redirections — migration ancien site → nouvelle architecture Next.js

> **Statut : PRÉPARÉ, NON DÉPLOYÉ.** À relire et arbitrer avant toute mise en
> production. Aucune règle n'est encore posée dans `next.config.mjs` (seules
> subsistent la redirection www→apex et `/competences/plateformes` →
> `/nos-domaines/diffamation-retrait-de-contenus`).

## Pourquoi ce plan est le point critique

Relevé Search Console (projet GSC lazaregue-avocats.fr, fenêtre juin–sept. 2026)
et backlinks (Ahrefs, `site-explorer`, sept. 2026) : **aucune URL de la nouvelle
architecture (`/nos-domaines/…`, `/competences/…`) n'est indexée ni ne reçoit de
lien.** L'index et les domaines référents pointent tous vers les **chemins
hérités**, servis aujourd'hui en 200 par l'ancien site. Le jour du déploiement,
ces chemins renverront 404 s'ils ne sont pas redirigés — et l'autorité acquise
(jusqu'à plusieurs dizaines de domaines référents par page) ne se reportera sur
les nouvelles pages que par des 301 complètes. Le risque n'est donc pas
éditorial mais **migratoire**.

## Deux systèmes distincts

L'écosystème « PicRights / litige AFP / CopyTrack » vit sur un **microsite
séparé** (projet Vercel dédié, proxy sur `/litige-afp-picrights/`) — voir
`lazaregue-sites-architecture`. Les redirections de ce groupe (B) se posent
**sur le microsite**, pas dans ce dépôt. Le présent dépôt (site principal)
gère les groupes A, C, D dans son `next.config.mjs`.

## Convention

Toutes les redirections proposées sont des **301** (permanentes) — utiliser
`statusCode: 301` dans `next.config.mjs` (et non `permanent: true`, qui émet un
308). Les variantes `www.` et `http://` sont déjà ramenées à l'apex `https://`
en amont : inutile de les dupliquer, elles héritent de la règle existante.

---

## Groupe A — pages thématiques du site principal → nouvelles pages

Chemins hérités indexés / recevant des liens, avec équivalent clair sur le
nouveau site. `rd` = domaines référents (Ahrefs) ; `impr` = impressions GSC.

| Ancienne URL (apex) | Autorité | Nouvelle URL | Type | Note |
|---|---|---|---|---|
| `/` | 617 rd | `/` | — | Inchangée (même racine). |
| `/avocat-en-droit-du-numerique/avocat-rgpd/` | 15 rd | `/nos-domaines/rgpd-donnees` | 301 | Page RGPD. |
| `/avocat-rgpd/` | 10 rd (www) | `/nos-domaines/rgpd-donnees` | 301 | Alias RGPD. |
| `/avocat-en-droit-du-numerique/avocat-rgpd/mise-en-conformite-rgpd/` | 4 rd | `/nos-domaines/rgpd-donnees` | 301 | Sous-page RGPD absorbée. |
| `/avocat-en-droit-du-numerique/avocat-en-cybersecurite/` | — | `/nos-domaines/cybersecurite` | 301 | |
| `/avocat-en-droit-du-numerique/avocat-escroquerie/` | 5 rd · 346 impr | `/nos-domaines/cybercriminalite` | 301 | Escroquerie/fraude → cybercriminalité. À confirmer. |
| `/avocat-en-droit-du-numerique/avocat-en-cybersecurite/avocat-usurpation-didentite/` | 5 rd · 155 impr | `/nos-domaines/cybercriminalite` | 301 | Usurpation d'identité → cybercriminalité. À confirmer (ou cybersécurité). |
| `/cybercriminalite-et-action-judiciaire/` | 2 rd · 49 impr | `/nos-domaines/cybercriminalite` | 301 | |
| `/cybercriminalite-et-action-judiciaire/risques-de-la-cybercriminalite/` | 2 rd | `/nos-domaines/cybercriminalite` | 301 | Sous-page absorbée. |
| `/qui-sommes-nous/` | 1 rd | `/le-cabinet` | 301 | |
| `/avocat-en-droit-du-numerique/avocat-droit-de-la-presse/` | 2 rd | `/nos-domaines/diffamation-retrait-de-contenus` | 301 | Droit de la presse ≈ diffamation/e-réputation. **Arbitrage** : rapprochement thématique, à valider. |

## Groupe C — chemins hérités SANS équivalent → arbitrage requis

Ces pages ont de l'autorité et/ou des impressions mais **aucune page miroir**
sur le nouveau site. Trois options par ligne : (a) rediriger vers la page la
plus proche, (b) rediriger vers un hub, (c) recréer la page. À trancher par le
cabinet — ne pas rediriger « au plus proche » par défaut si le sujet est
distinct (une 301 vers une page hors-sujet est traitée par Google comme un
soft-404 et ne transmet pas l'autorité).

| Ancienne URL | Autorité | Sujet | Piste | À trancher |
|---|---|---|---|---|
| `/avocat-en-droit-du-numerique/` | 5 rd | Hub « droit du numérique » | Pas de page d'index `/nos-domaines` sur le nouveau site → `/` ou créer un hub | **Oui** — décider si un index `/nos-domaines` est créé. |
| `/avocat-en-droit-du-numerique/avocat-specialiste-propriete-intellectuelle/` | 2 rd | Propriété intellectuelle | Aucune page PI | **Oui** — créer une page PI ou rediriger vers `/` (+ retirer le mot « spécialiste »). |
| `/avocat-en-droit-du-numerique/avocat-specialiste-propriete-intellectuelle/avocat-contrefacon/` | 1 rd | Contrefaçon | Aucune page | **Oui**. |
| `/avocat-en-droit-du-numerique/avocat-droit-e-commerce/avocat-redaction-cgv/` | 1 rd | E-commerce / CGV | Proche de Contrats IT | **Oui** — `/nos-domaines/contrats-informatiques` ? |
| `/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/avocat-application-mobiles/` | 2 rd | Applications mobiles | Aucune page dédiée | **Oui**. |
| `/formation-ia-avocat/` | — · 246 impr | Formation IA | Aucune page (ni `/ressources` ni `/blog` équivalent) | **Oui** — conserver une page formation ? |
| `/danciens-employes-dhermes-juges-pour-trafic-de-contrefacon-du-celebre-sac-birkin/` | 1 rd | Ancien billet d'actualité | `/blog` ou 410 | **Oui**. |
| `/licence-images/` | — · 1 impr | Licence d'images | Proche de l'écosystème PicRights (groupe B) | **Oui** — microsite ? |

## Groupe B — écosystème PicRights → à traiter SUR LE MICROSITE

Hors `next.config.mjs` de ce dépôt (projet Vercel séparé + proxy).

| Ancienne URL | Autorité | Cible | Note |
|---|---|---|---|
| `/litige-afp-picrights/` | 23 rd (apex) + 30 rd (www) | `/litige-afp-picrights/` | Déjà 200 — conserver ; page pilier consolidée. |
| `/litige-afp-picrights/courrier-picrights/` | 6 rd (www) + 4 rd | `/litige-afp-picrights/` | **⚠ Renvoie 404 aujourd'hui** — fuite d'autorité, 301 prioritaire. |
| `/picrights/` (+ `/faut-il-payer-picrights/`, `/avis-sur-picrights/`, `/jurisprudence-picrights/`, `/picrights-proces/`) | 665 impr (pilier) | `/litige-afp-picrights/` | Cluster consolidé (voir `guide-cluster-architecture`) → 301 de chaque URL du cluster vers la page unique. |
| `/picrights-afp/` (+ `/faut-il-payer/`, `/proces/`) | 81 impr | `/litige-afp-picrights/` | 301. |
| `/copytrack/` | 118 impr | à décider (page CopyTrack conservée ? sinon `/litige-afp-picrights/`) | **Arbitrage**. |

## Groupe D — actifs / divers

| Ancienne URL | Note |
|---|---|
| `https://www.lazaregue-avocats.fr/wp-content/uploads/2020/09/21736807.jpg` | Actif image WordPress hérité, 3 rd. Décider : 301 vers l'image équivalente si elle existe, sinon laisser en 404/410 (un actif ne transmet pas d'autorité de page). |
| `canicule.lazaregue-avocats.fr` | Sous-domaine distinct (projet séparé) — hors de ce plan. |

---

## Vérifications avant mise en production

1. Poser les 301 du groupe A (et les arbitrages retenus des groupes C/D) dans
   `next.config.mjs` (`statusCode: 301`).
2. Confirmer que le microsite PicRights porte les 301 du groupe B, en
   priorité `/litige-afp-picrights/courrier-picrights/` (404 actuel).
3. Régénérer et soumettre le `sitemap.xml` ; demander une réindexation des
   nouvelles URL dans la Search Console.
4. Après déploiement, re-mesurer dans GSC l'indexation des `/nos-domaines/*`,
   `/competences/ma-tech` (témoin : 0 impression avant), et surveiller les
   soft-404 (redirections vers des pages hors-sujet).
5. Aligner fiche Google Business, mentions légales et signatures mail sur le
   numéro canonique 01 81 70 62 00.

## Sources

- Search Console : projet `10107151`, pages & performances, 2026-06-01 → 2026-09-08.
- Backlinks : Ahrefs `site-explorer` (pages par domaines référents), sept. 2026.
- Ces chiffres sont un instantané ; réactualiser le relevé juste avant la bascule.
