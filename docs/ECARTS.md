# Écarts constatés — site Lazarègue Avocats

> Inventaire des écarts entre le code (`main` `4e7e09f`) et la charte effective ([`CHARTE-SITE.md`](./CHARTE-SITE.md)) + les règles arrêtées.
> **Trié par ampleur de la correction** : d'abord les corrections **globales** (un token / un composant / une source corrige tout le site), puis les corrections **locales** (une page).
> Aucun fichier du site n'a été modifié.

## 1. Corrections globales (un geste corrige plusieurs pages)

| # | Catégorie | Écart constaté | Règle | Correction proposée | Fichier(s) |
|---|---|---|---|---|---|
| G1 | Rédaction | CTA du header « Nous écrire » (voix « nous »), présent **sur toutes les pages** | « le cabinet », pas « nous » | Remplacer par un libellé sans « nous » (ex. « Écrire au cabinet ») | `components/header/site-header.tsx:303,373,456` |
| G2 | Rédaction | **15+ libellés de CTA** différents pour la même action ; téléphone en 6 formats | CTA cohérents | Figer 1 libellé principal (« Échanger avec un avocat ») + 1 libellé téléphone (« Appeler — 01 81 70 62 00 ») | header, `global-cta.tsx:34`, toutes pages domaine, formations, home |
| G3 | Personnes | `lib/equipe.ts` **en retard sur les pages** : Sarah « barreau de Paris » (sans Montréal) | Sarah = Paris **et Montréal** | Corriger la source `MEMBRES` (barreau + photo `/images/equipe/sarah-hinderer.webp`) | `lib/equipe.ts:47` |
| G4 | Composant | Équipe **ré-encodée en dur** dans 5 pages au lieu de lire `lib/equipe.ts` → statuts divergents | Source unique | Faire lire `MEMBRES`/`MembreCarte` à cybercriminalité, escroquerie, cyber, rgpd, accueil (après G3) | `cybercriminalite/page.tsx:78`, `escroquerie-fraude-bancaire/page.tsx:102`, `cybersecurite/CyberV4.tsx:244`, `rgpd/page.tsx:278`, `app/page.tsx:34` |
| G5 | Personnes | Khalid perd « technique » sur la home | « Consultant **technique** en cybersécurité » | Corriger le JSON-LD et le rôle affiché | `app/page.tsx:38`, `components/home/accueil-v4/AccueilV4.tsx:431` |
| G6 | Couleur | `#9FB2FF` appliqué sur navy (footer 10×, cyber, rgpd, home) alors que 4 pages le bannissent | Couleur proscrite en petit texte | **Décision requise** (voir ENSEIGNEMENTS) : soit surcharger partout `--muted-on-dark` en `rgba(255,255,255,.76)`, soit l'assumer | `components/footer/footer.module.css` (l.71,133,185,194,218,222,236,274,286,309), `cybersecurite.module.css:18`, `rgpd.module.css:22,164`, `AccueilV4.tsx:73` |
| G7 | Couleur | Cœur de charte **codé en dur** au lieu des tokens ; rgpd & cyber redéclarent tout le système | Utiliser les tokens | Remplacer les hex par `var(--…)` ; supprimer les alias locaux `.rgpd{…}`/`.cyber{…}` | `rgpd.module.css`, `cybersecurite.module.css`, + `#e0e0ee`/`#4a4a63`/`#0a2acc` dans 4-7 fichiers |
| G8 | Couleur | **5 rouges** d'urgence coexistent | Rouge = urgence, valeur unique | Généraliser `#B3231F` (créer un token `--red`) | contact, diffamation, escroquerie (`#b42318`), cybercriminalité (`#b3261e`), contentieux (`#ff6b6b`) |
| G9 | Couleur | Fond clair « tint » `#EEF1FB` en dur sur 10 pages, sans token | Tokeniser | Créer `--tint: #eef1fb` et remplacer | 10 module.css |
| G10 | Composant | `.btn*` réécrit dans **16 modules** (jusqu'à 16 défs/page) ; pas de `.btn` global | Composant/token partagé | Poser `.btn`/`.btn-primary`/`.btn-line` dans `globals.css` (ou adopter `ui/button`) et purger les redéfinitions | tous les `*.module.css` domaine |
| G11 | Composant | `.skipLink` (8 modules), `.wrap` (16), focus ring (16) dupliqués | DRY | Extraire en classes globales | idem |
| G12 | Composant | Surtitre = 6 noms de classe pour un motif identique | 1 classe/token | Classe globale `.eyebrow` (DM Mono, `--blue`, LS 0.14em) | tous modules |
| G13 | SEO/a11y | `id="contenu"` absent ou variant (`#contenu-principal`, `#main`) ; skip-link orphelin | Ancre `#contenu` uniforme | Poser `id="contenu"` sur chaque `<main>` ; aligner les skip-links | home (pas de `<main>`), IA, cyber, nis2, contrats, œuvre-originale, rgpd, escroquerie |
| G14 | SEO | Suffixe de marque `<title>` non uniforme | 1 suffixe | Figer « … \| Lazarègue Avocats » | ma-tech, contentieux, crypto, contrats, diffamation, rgpd |
| G15 | SEO | Breadcrumb & FAQPage JSON-LD manquants là où pertinent | Balisage cohérent | Ajouter BreadcrumbList (9 pages) et FAQPage (cyber, contentieux, cybercriminalité, diffamation, escroquerie) | voir tableau CHARTE-SITE §E |
| G16 | Rédaction | **17 CTA `/contact` avec paramètres** `?objet=…`/`&situation=` | CTA sans paramètre | Retirer les query params | `formations/*` (11), `CyberV4.tsx:27`, `ContratsInformatiquesClient.tsx:58,60` |
| G17 | Espacement | max-width conteneur divergent | `--content-max: 1200px` | Aligner | crypto `.wrap` (1272), cas-clients `.cgrid` (1296), nos-domaines hub (1120) |
| G18 | Technique | **~1 921 lignes de code mort** (10 composants non importés) — source de 20 `<img>` et d'erreurs ESLint | Supprimer | `navbar-11`, `footer-01`, `home/blog-35`, `blog-64`, `layout-300`, `layout-351`, `stats-19`, `team-06`, IA `MatriceTabs`, `LivrablesPreview` |
| G19 | Technique | Thème Relume résiduel : ~50 tokens jamais consommés | Purger | `--color-*`, `--color-scheme-*`, `--radius-*`, `--space-*`, `--text-h1..h6`, `--container-*`, `--breakpoint-*` dans `app/globals.css` |
| G20 | Rédaction | Engagements de délai « sous 24 h » / « sous 48h » | Pas d'engagement de délai permanent | Retirer/reformuler | `contact/page.tsx:17`, `contact/data/reassurance.ts:25`, `api/contact/route.ts:157`, `nis2/CybersecuriteClient.tsx:141,440` |
| G21 | Rédaction | Mention géo non figée (6 variantes) ; barreaux collectifs incohérents (footer omet Montréal) | « Paris · intervention partout en France » | Figer la formule ; corriger le footer | `site-footer.tsx`, contact, le-cabinet, toutes les eyebrows domaine |

## 2. Corrections locales (une page)

| # | Page | Catégorie | Écart constaté | Règle | Correction proposée | Fichier(s) |
|---|---|---|---|---|---|---|
| L1 | nos-domaines (hub) | Visuel | `border-radius: 8px` | radius 0 | Mettre 0 | `nos-domaines.module.css:81` |
| L2 | cybersécurité/NIS 2 | Visuel | `borderRadius:"12px"` inline sur `<video>` | radius 0 | Retirer | `nis2/CybersecuriteClient.tsx:651` |
| L3 | cybercriminalité | Technique | portraits en `<img>` brut | `next/image` | Convertir | `cybercriminalite/page.tsx:272` |
| L4 | escroquerie | Composant | `MobileActionBar.tsx` réimplémente la barre basse (commentaire faux + double `padding-bottom`) | barre basse unique (header) | Supprimer, utiliser celle du header | `escroquerie-fraude-bancaire/MobileActionBar.tsx` |
| L5 | IA & rgpd | Composant | **2 `FaqAccordion.tsx` homonymes** quasi identiques | 1 composant | Fusionner en un composant partagé | `avocat-intelligence-artificielle/_components/FaqAccordion.tsx`, `rgpd-donnees-personnelles/_components/FaqAccordion.tsx` |
| L6 | crypto | Visuel | **2 définitions `.hero h1` concurrentes** | 1 définition | Dédoublonner | `crypto.module.css:66,324` |
| L7 | le-cabinet | Personnes | Amir « barreau de l'Essonne », Nadia « Nice Sophia Antipolis »/« maître » | Évry ; Université Côte d'Azur ; maîtresse | Aligner | `le-cabinet/data/contenu.ts` |
| L8 | le-cabinet & cas-clients | Intitulés | 3 libellés de domaines divergents du menu (M&A, cybercriminalité, fraude) | libellés du menu | Aligner sur `nav-data.ts` | `le-cabinet/data/contenu.ts:207,215,216`, `cas-clients/data/cas-clients.ts:14,17,242` |
| L9 | IA | Technique | `setState` synchrone dans un effet | — | Corriger | `ReglementModule.tsx:186` |
| L10 | mentions & politique | Technique | ~120 erreurs `no-unescaped-entities` en code vivant | build propre | Échapper ou désactiver contextuellement | `components/legal/pages-legales.jsx` |
| L11 | NIS 2 | Technique | vidéo hébergée sur Vercel Blob externe | robustesse | Rapatrier dans `public/` ou documenter | `nis2/CybersecuriteClient.tsx:652` |
| L12 | diffamation, cybercriminalité | Rédaction | 3 TODO de citation non levés (art. 65-3, L.12-10-1, L.127-3) | pas de réf non vérifiée | Faire trancher par le cabinet | `DiffamationClient.tsx:139`, `cybercriminalite/faq.ts:14,33` |
| L13 | crypto, CyberV4, nis2, rgpd, diffamation | Rédaction | réfs d'articles en plein corps de texte | réfs en petit / FAQ | Basculer en note/FAQ | voir CHARTE-SITE §D |

## 3. Mobile / débordement

**Aucun écart** : audit à 375 / 390 / 430 / 1440 px sur les ~25 pages → 0 débordement horizontal, en-tête lisible dès 375px, contenu replié présent dans le DOM. Seule réserve mineure : DM Mono à 10-11px pour nav-links/labels (sous 12px, mais labels et non corps). Point de rupture **non unifié** (640/767/900/1023/992px selon les modules) — à harmoniser si l'on veut un comportement homogène (non bloquant).

## 4. Règles arrêtées non appliquées nulle part

- **`--ok`/`--ko`/`--warn`** (statuts documents-preuves) : définis mais 0 usage en `var()` → soit les câbler aux badges RGPD, soit les retirer.
- **`#C8F53A`** : correctement absent (0 occurrence) — rien à faire.
- Le **`components/ui/button.jsx`** partagé existe mais n'atteint jamais les pages domaine : règle « composant partagé » non tenue hors accueil.
