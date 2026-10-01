# Redirections

Inventaire des redirections **portées par l'application Next** (`next.config.mjs`,
fonction `redirects()`). Chaque entrée vise **directement** la page définitive —
aucune chaîne de redirection de contenu (A → B → C), aucune boucle.

> **Codes.** `statusCode: 301` = redirection permanente classique (301).
> `permanent: true` émettrait un 308 ; réservé à la canonicalisation de domaine.
>
> **Barre oblique finale.** Le site est canonique **sans** barre finale
> (`trailingSlash: false`). Une URL en `/page/` est d'abord ramenée à `/page`
> par la normalisation interne de Next (**308**), puis le 301 ci-dessous
> s'applique : la cible est atteinte directement (2 sauts au plus, sans
> redirection de contenu intermédiaire).
>
> **www / sans www.** Les redirections de migration ci-dessous ont une
> destination **absolue** (`https://lazaregue-avocats.fr/…`) et pas de condition
> d'hôte : une requête sur `www` est donc redirigée en **un seul saut** vers le
> domaine nu, sans repasser par la règle www→nu.

## Migration — ancien site vitrine (SPA)

| Ancienne URL | Nouvelle URL | Code | Note |
|---|---|---|---|
| `/confidentialite` | `/politique-de-confidentialite` | 301 | Équivalent |
| `/licence-images` | `/mentions-legales` | 301 | Pas d'équivalent — page légale la plus proche |
| `/action-collective` | `/cas-clients/photographies-utilisees-sans-autorisation-reclamation` | 301 | Recouvrement abusif de photothèques → cas client photographies/PI |
| `/litige-afp-picrights/confier` | `/contact` | 301 | Page de conversion « confier mon dossier » |
| `/litige-afp-picrights` | `/cas-clients/photographies-utilisees-sans-autorisation-reclamation` | 301 | Mise en demeure PicRights/AFP → cas client n° 07 |
| `/litige-afp-picrights/courrier-picrights` | `/cas-clients/photographies-utilisees-sans-autorisation-reclamation` | 301 | Exception : liens entrants actifs (legavox.fr, sos-justice.net) |

## Migration — ancien site WordPress (pages de compétences uniquement)

> Seules les pages de **compétences** sont redirigées. Les tribunes, articles,
> pages institutionnelles (contact, honoraires, qui-sommes-nous…) et adresses
> techniques ne le sont pas.

| Ancienne URL | Nouvelle URL | Code |
|---|---|---|
| `/avocat-en-droit-du-numerique/avocat-rgpd` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/avocat-en-droit-du-numerique/avocat-rgpd/mise-en-conformite-rgpd` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/avocat-rgpd` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/dpo-rgpd` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/big-data-et-donnees-personnelles-rgpd` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/offre-rgpd-privacy-shield` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/avocat-en-droit-du-numerique/avocat-en-cybersecurite` | `/nos-domaines/cybersecurite` | 301 |
| `/avocat-en-droit-du-numerique/avocat-en-cybersecurite/avocat-piratage-informatique` | `/nos-domaines/cybercriminalite` | 301 |
| `/avocat-en-droit-du-numerique/avocat-en-cybersecurite/avocat-usurpation-didentite` | `/nos-domaines/cybercriminalite` | 301 |
| `/cybercriminalite-et-action-judiciaire` | `/nos-domaines/cybercriminalite` | 301 |
| `/cybercriminalite-et-action-judiciaire/risques-de-la-cybercriminalite` | `/nos-domaines/cybercriminalite` | 301 |
| `/avocat-en-droit-du-numerique/avocat-escroquerie` | `/nos-domaines/escroquerie-fraude-bancaire` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-de-la-presse` | `/nos-domaines/diffamation-retrait-contenus` | 301 |
| `/droit-a-loubli` | `/nos-domaines/diffamation-retrait-contenus` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies` | `/nos-domaines/contrats-informatiques` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/avocat-application-mobiles` | `/nos-domaines/contrats-informatiques` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/avocat-droit-informatique` | `/nos-domaines/contrats-informatiques` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-des-nouvelles-technologies/droit-logiciel` | `/nos-domaines/contrats-informatiques` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-e-commerce` | `/nos-domaines/contrats-informatiques` | 301 |
| `/avocat-en-droit-du-numerique/avocat-droit-e-commerce/avocat-redaction-cgv` | `/nos-domaines/contrats-informatiques` | 301 |
| `/applications-digitales-et-ecommerce` | `/nos-domaines/contrats-informatiques` | 301 |
| `/avocat-en-droit-du-numerique` | `/nos-domaines` | 301 |
| `/competences` | `/nos-domaines` | 301 |

### Pages de compétences WordPress repérées mais NON redirigées

Repérées via l'API CDX de la Wayback Machine, sur le thème **Propriété
intellectuelle** — non couvert par une page de domaine du nouveau site.
Laissées de côté volontairement (arbre PI entier) :

- `/propriete-intellectuelle-et-concurrence/`
- `/avocat-specialiste-propriete-intellectuelle/`
- `/avocat-en-droit-du-numerique/avocat-propriete-intellectuelle/` + sous-pages
  (`avocat-contrefacon`, `avocat-droit-dauteur`, `avocat-marque`,
  `droit-dessins-et-modeles`, `litiges-nom-de-domaine`)
- la même arborescence dupliquée sous
  `/avocat-en-droit-du-numerique/avocat-specialiste-propriete-intellectuelle/`

## Domaine secondaire — `lazaregue-avocats.tech`

Règle **prête mais inactive** tant que le domaine n'est pas rattaché au projet
Vercel (aucune requête sur ce host n'atteint l'application avant ce
rattachement ; elle s'activera alors d'elle-même).

| Source (host) | Destination | Code |
|---|---|---|
| `lazaregue-avocats.tech/:path*` | `https://lazaregue-avocats.fr/:path*` | 301 |
| `www.lazaregue-avocats.tech/:path*` | `https://lazaregue-avocats.fr/:path*` | 301 |

## Canonicalisation de domaine (toutes pages)

| Source | Destination | Code |
|---|---|---|
| `www.lazaregue-avocats.fr/:path*` | `https://lazaregue-avocats.fr/:path*` | 308 |

## Anciens slugs internes du nouveau site

| Source | Destination | Code |
|---|---|---|
| `/competences/plateformes` | `/nos-domaines/diffamation-retrait-contenus` | 301 |
| `/avocat-escroquerie-fraude` | `/nos-domaines/escroquerie-fraude-bancaire` | 301 |
| `/nos-domaines/avocat-escroquerie-fraude` | `/nos-domaines/escroquerie-fraude-bancaire` | 301 |
| `/nos-domaines/rgpd-donnees` | `/nos-domaines/rgpd-donnees-personnelles` | 301 |
| `/nos-domaines/ia-act` | `/nos-domaines/avocat-intelligence-artificielle` | 301 |
| `/nos-domaines/intelligence-artificielle` | `/nos-domaines/avocat-intelligence-artificielle` | 301 |
| `/competences/ma-tech` | `/nos-domaines/ma-tech` | 301 |
| `/nos-domaines/diffamation-retrait-de-contenus` | `/nos-domaines/diffamation-retrait-contenus` | 301 |
| `/nos-domaines/cybersecurite/nis2` | `/nos-domaines/cybersecurite` | 301 |

## Contenus retirés

| Source | Destination | Code | Raison |
|---|---|---|---|
| `/cas-clients/usurpation-identite-identifier-auteur-article-145-cpc` | `/cas-clients` | 301 | Cas client n° 04 retiré de la collection |

---

*Note : ce fichier recense les redirections au niveau de l'application. La
migration de domaine et le plan de redirections côté hébergeur sont documentés
dans [plan-redirections-migration.md](plan-redirections-migration.md).*
