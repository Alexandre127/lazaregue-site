# Redirections

Inventaire des redirections **portées par l'application Next** (`next.config.mjs`,
fonction `redirects()`). Elles s'appliquent quel que soit l'hébergement et
visent directement le slug définitif (aucune chaîne de redirection).

> `statusCode: 301` = redirection permanente classique (301). `permanent: true`
> émettrait un 308 ; il n'est utilisé que pour la canonicalisation de domaine.
> La normalisation de la barre oblique finale (`/page/` → `/page`) est un 308
> géré automatiquement par Next (`trailingSlash: false`).

## Canonicalisation de domaine

| Source | Destination | Code |
|---|---|---|
| `www.lazaregue-avocats.fr/:path*` | `https://lazaregue-avocats.fr/:path*` | 308 |

## Anciennes URL → nouveaux slugs

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

## Ancien site (trafic Google résiduel)

| Source | Destination | Code | Raison |
|---|---|---|---|
| `/litige-afp-picrights` | `/cas-clients/photographies-utilisees-sans-autorisation-reclamation` | 301 | Page de l'ancien site (réclamations PicRights/AFP pour photographies) encore référencée par Google ; dirigée vers le cas client n° 07 (photographies / propriété intellectuelle). |
| `/litige-afp-picrights/` | `/cas-clients/photographies-utilisees-sans-autorisation-reclamation` | 308 → 301 | Forme avec barre oblique finale : Next la normalise d'abord en `/litige-afp-picrights` (308), qui applique ensuite le 301 ci-dessus. Les deux formes aboutissent donc au cas client n° 07. |

---

*Note : ce fichier recense les redirections au niveau de l'application. La
migration de domaine et le plan de redirections côté hébergeur sont documentés
dans [plan-redirections-migration.md](plan-redirections-migration.md).*
