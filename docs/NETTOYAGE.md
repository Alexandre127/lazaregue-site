# Nettoyage du code — inventaire (étape 1, LECTURE SEULE)

> Inventaire du 1ᵉʳ octobre 2026. **Rien n'a été supprimé ni modifié.**
> Point de retour créé avant toute action : étiquette git **`avant-nettoyage`**
> (sur `main` à jour, poussée). Pour revenir en arrière : `git reset --hard avant-nettoyage`.
>
> Chaque élément : **chemin** · **pourquoi inutile** · **preuve** · **risque de
> suppression** (faible / moyen / élevé). La liste complète des routes figure en
> fin de document : c'est la référence à retrouver identique après nettoyage.

---

## Lot 1 — Code mort (fichiers que plus rien n'importe)

Vérifié par remontée des chaînes d'import (un fichier importé seulement par un fichier mort est mort). `tsconfig.json` exclut déjà `archive` et `tools` du build.

### Composants
| Chemin | Pourquoi | Preuve | Risque |
|---|---|---|---|
| `components/home/hero-atlas-caption.tsx` | `HeroAtlasCaption` jamais importé | aucun import ; seule la classe CSS `hero-atlas-label` (sans rapport) existe | faible |
| `components/home/hero-globe-canvas.tsx` | `HeroGlobeCanvas` supplanté par la chaîne vivante `hero-globe-three` | aucun import (le globe vivant = `dynamic(() => import("…/hero-globe-three"))`) | faible |
| `components/home/hero-reveal.tsx` | `HeroReveal` jamais importé | aucun import | faible |
| `components/jurisprudence.tsx` | `Jurisprudence`/`Decision` jamais importés | aucun import (le fichier importe `lib/typo` mais personne ne l'importe) | faible |
| `app/nos-domaines/cybersecurite/CasesExtra.tsx` | non importé par la page ni par `CyberV4` | `page.tsx`→`CyberV4`→`SituationTravail` uniquement | faible |
| `app/nos-domaines/rgpd-donnees-personnelles/_components/DeliverablesV4.tsx` | non importé par la page RGPD | imports de `page.tsx` RGPD vérifiés : absent | **moyen** (461 lignes « V4 » ; confirmer qu'aucune réintégration éditoriale n'est prévue) |
| `app/nos-domaines/rgpd-donnees-personnelles/_components/SpecimenViewer.tsx` | non importé (ni page RGPD ni `SpecimensRecus`) | aucun import | faible |
| `app/ressources/_components/Catalogue.tsx` | la page ressources utilise `RessourcesIndex`, pas `Catalogue` | `page.tsx`→`RessourcesIndex` ; `Catalogue` n'apparaît nulle part | faible |
| `components/ui/badge.jsx` | dossier `components/ui/` entièrement mort | aucun import de `components/ui/*` dans tout le dépôt | faible |
| `components/ui/button.jsx` | idem | idem | faible |
| `components/ui/card.jsx` | idem | idem | faible |
| `components/ui/input.jsx` | idem | idem | faible |

### Utilitaires / données (morts par chaîne)
| Chemin | Pourquoi | Preuve | Risque |
|---|---|---|---|
| `lib/utils.ts` (`cn`) | importé uniquement par les 4 `components/ui/*.jsx` (morts) | seuls consommateurs = `ui/{input,button,card,badge}.jsx` | faible (à recréer si réintro d'un composant shadcn) |
| `app/ressources/data/articles.ts` | importé uniquement par `Catalogue.tsx` (mort) | unique import = `Catalogue.tsx:11` | **moyen** (222 lignes de contenu éditorial — confirmer qu'il ne doit pas réalimenter le catalogue) |
| `hooks/use-media-query.ts` | `useMediaQuery` jamais importé | aucun import | faible |
| `src/components/Hero.astro` | fichier **Astro** dans un projet Next (non pris en charge) | aucune référence ; `src/` ne contient que ce fichier | faible |

### Archive (hors build, jamais importée)
`archive/blog/README.md`, `archive/blog/ai-act-preuve.ts`, `archive/blog/analyses.ts`, `archive/blog/articles-data.ts` — exclus du build (`tsconfig`), aucun import. **Risque faible** (déjà archivé volontairement).

### Module de style orphelin
| Chemin | Pourquoi | Preuve | Risque |
|---|---|---|---|
| `app/nos-domaines/cybersecurite/cybersecurite.module.css` (237 lignes) | **jamais importé** : la page cybersécurité stylise via un bloc `<style dangerouslySetInnerHTML>` inline dans `CyberV4.tsx` (classes `cw-*`), pas via ce module | `grep "cybersecurite.module" app components` → 0 import ; ses classes (`hero`, `cyber`, `acc`…) absentes du markup | faible |

### Déjà supprimés (rien à faire)
`MatriceTabs`, `LivrablesPreview`, `navbar-11`, `cyber-v4-css` : introuvables — déjà nettoyés. Les deux `HeroVideo` (contact + RGPD) sont **tous deux vivants** (pas de doublon mort). Aucune route orpheline.

---

## Lot 2 — Fichiers `public/` jamais utilisés

**≈ 25,5 Mo d'orphelins sur 51 Mo** (la moitié du dossier). Preuve : aucun `basename`/chemin référencé dans `app/`, `components/`, `lib/`, `next.config.mjs`, sitemap. Risque **faible** sauf mention (moyen si référence dynamique possible).

### Lourds (priorité)
| Fichier | Taille | Risque |
|---|---|---|
| `public/videos/reportage-reseaux-sociaux.mp4` | **17,6 Mo** | faible |
| `public/images/ma-tech/ma-tech.jpg` | **2,6 Mo** | faible (la page sert `ma-tech-800/1200`) |
| `public/images/rgpd-hero.jpg` | 640 Ko | faible (hero RGPD = vidéo + poster webp) |
| `public/videos/passage-tv-loop.mp4` | 516 Ko | faible |
| `public/images/equipe.jpg` | 468 Ko | faible |

### Photos d'équipe en double / variantes « cool » non utilisées
`images/{alexandre,amir,sarah,khalid,nadia}-cool.jpg`, `images/sarah-pro.jpg`, `images/nadia-abchiche.jpg`, `images/nadia-cool.jpg`, `images/khalid-cool.jpg`, `images/equipe-cabinet-2026.jpg` — les portraits vivants sont `alexandre-pro.jpg`, `amir-pro.jpg`, `khalid-pro.jpg`, `nadia-pro.jpg`, `equipe/sarah-hinderer.webp`, `equipe-panorama.webp`. **Risque faible/moyen** (vérifier qu'aucune n'est servie dynamiquement).

### Anciennes cartes / heros / divers non référencés
`images/card-{portail,terrain,territoire,equipe}.jpg`, `images/{tokyo-nuit,grimpeur-canyon,livre-lazaregue,escroquerie-passerelle,ia-act-hero}.jpg`, `images/analyses/*.jpg` (3), `images/contrats-informatiques/{hero.jpg,hero.webp?,hero-mobile.jpg,hero-mobile.webp}`, `images/diffamation/{hero.jpg,hero-mobile.jpg,hero-mobile.webp}`, `images/passage-tv-poster.jpg`.
*(À confirmer au cas par cas : certaines variantes `-mobile`/`.jpg` peuvent avoir été remplacées par des `.webp` — risque moyen.)*

### Reliquats de starters (Next/Relume)
`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `images/placeholder-dark.svg`, `svgs/navbar-{0,1,2}.svg`, `logo/logo-dark.svg`, `logo/logo-light.svg`, `images/logo.png`, `images/logo-icon.jpg`, `images/logo-transparent.png`, `images/ logo.png.jpg` (nom avec espace), `images/1.png`. **Risque faible.**

### ⚠️ Cas particulier — à NE PAS supprimer, mais à remplacer
`public/videos/contact-paris.mp4` (796 Ko) est **utilisé** (hero /contact desktop) **mais porte un filigrane « MINIMAX / Hailuo AI » incrusté**. → Non pas une suppression : un **remplacement** par une version sans filigrane (le jour où le cabinet en fournit une).

---

## Lot 3 — Dépendances npm installées mais non utilisées

Preuve : `0` import (`from "<dep>"`) dans `app/components/lib`. Reliquats du kit Relume/shadcn.

| Dépendance | Preuve | Risque |
|---|---|---|
| `@radix-ui/react-slot` | importée seulement par `components/ui/*` (morts) | faible |
| `class-variance-authority` | idem (`components/ui/*`) | faible |
| `clsx` | aucun import | faible |
| `tailwind-merge` | aucun import | faible |
| `gsap` | aucun import | faible |
| `motion` | aucun import | faible |
| `relume-icons` | aucun import | faible |

**À garder malgré « 0 import direct » :** `react-dom` (runtime Next), `next`, `react`, `nodemailer` (route contact), `three` (globe). Côté `devDependencies`, tout sert (Tailwind v4, types, ESLint, TypeScript) — rien à retirer.

---

## Lot 4 — Code inutile dans les fichiers vivants

### 4.1 — `console.*` et code commenté
- **`console.log/debug/info/warn/error` : AUCUN** (0 occurrence dans `app/components/lib/hooks`).
- **Code commenté (JSX/CSS/TS désactivé) : AUCUN** — tous les commentaires présents sont des séparateurs de section ou explicatifs utiles.
- `TODO/FIXME` : **5** (marqueurs éditoriaux, ex. URL de FAQ RGPD à renseigner — déjà dans `A-REDIGER.md`). Risque faible.

### 4.2 — Fonctions / constantes / variables mortes DANS des fichiers vivants
| Élément | Emplacement | Pourquoi | Preuve | Risque |
|---|---|---|---|---|
| `ClientPortalMockupVisual` (~291 lignes) | `components/home/section-differenciateurs.tsx:245` | composant jamais rendu ni exporté (le fichier est vivant pour `PortailDemo`, mais cette fonction est morte) | 1 seule occurrence (définition) | faible (gros bloc mort autonome) |
| `const ENGAGE` | `app/nos-domaines/contrats-informatiques/ContratsInformatiquesClient.tsx:279` | tableau de contenu « restauré » jamais rendu | 0 rendu | **moyen** (contenu éditorial non branché — confirmer avec le cabinet) |
| `const CAS` (3 cas-types) | même fichier `:297` | jamais rendu | 0 rendu | **moyen** (idem) |
| `prog` (valeur `useState`) | `section-differenciateurs.tsx:639` | la valeur n'est jamais lue (seul `setProg` sert) | — | faible (indissociable du tuple `useState` — ignorable) |
| `idx` (param) | `lib/globe/init-premium-globe.ts:353` | paramètre d'index inutilisé | ESLint | faible |

*(Faux positifs à conserver : `lib/track.ts` `_event`/`_props` = placeholders no-op volontaires.)*

### 4.3 — Classes CSS définies mais non référencées (modules vivants)
**Fiabilité élevée** (scopés `styles.X`, risque faible) :
- `app/le-cabinet/le-cabinet.module.css` : ancien bloc DOMAINES/PORTAIL réécrit — `domaine`, `domaineT/N/Arrow`, `domainesGrid`, `mock*`, `exemple*`, `facts`, `nonAvocat`, `portailList`.
- `app/contact/contact.module.css` : `acces`, `btnO`, `cLead`, `cLeft`, `cgrid`, `chan`, `chanK`, `clientIn`, `clientTitle`, `clientTx`, `heroFacts`, `heroWhat`, `urgentIcon`, `visitLinks`.
- `app/ressources/ressources.module.css` : `doms`, `domCard`, `domN`, `domDesc`, `domGo` (ancienne grille domaines).
- `app/formations/formations.module.css` : `fHeroPhoto`.

**Risque moyen** (modules en `:global`, composition dynamique possible — relire bloc par bloc avant retrait) : nombreuses classes dans `ma-tech` (`conseq*`, `deliv3*`, `risk*`, `rail-*`, `proof*`, `hero__grid/__media/__lede`…), `diffamation`, `escroquerie`, `crypto`, `contentieux`, `cybercriminalite`, `rgpd` (`team-duo`, `mc-livrable`, `pourquoi-args`…), `cas-clients` (`alsodo`, `alsohead`).

### 4.4 — Variables CSS custom non utilisées (`app/globals.css`)
| Token(s) | Preuve | Risque |
|---|---|---|
| `--space-4/8/12/16/24/36/72/96`, `--grid-gutter` | aucun `var()` | faible/moyen (tokens de charte « source » — conservables en référence) |
| `--ok`, `--ko`, `--warn` | 0 usage (`--red`, `--tint` eux SONT utilisés) | faible |
| **`--ff-hand` (police Caveat)** | **0 `var(--ff-hand)`** alors que Caveat est chargée via `next/font` (`layout.tsx:47`) → **police téléchargée pour rien** | **moyen** (gain perf — cf. Lot 6) |
| `--max-w-xxs…xxl`, `--container-xxs…xl` (sauf `xxl`, utilisé), `--spacing-18/30` | aucun utilitaire correspondant | faible/moyen |

### 4.5 — Tokens & utilitaires Relume résiduels (`@theme` / `@utility` / `@custom-variant`)
Leurs seuls consommateurs sont les composants **morts** `components/ui/*.jsx` + `jurisprudence.tsx` (Lot 1). Non utilisés dans le markup vivant :
- **Couleurs** : `--color-dodger-blue-*` (7), `--color-neutral-*` (7).
- **Rayons** : `--radius-button/card/checkbox/carousel/form/badge/image` (charte = angles droits 0px).
- **Échelle typo** : `--text-h1..h6`, `--text-large/medium/regular/tiny` (seul `text-h5` apparaît, dans `ui/card.jsx` mort).
- **Variants/utilities** : `@custom-variant badge-alt / btn-dark / btn-light / alternate` ; `@utility scheme-1/2/3`, `text-eyebrow`, `text-stat-accent`, `nav-glass`, `nav-link`, `font-display`, `scrollbar-none`, `laz-card`, `font-mono-label`.

**À CONSERVER** : `--breakpoint-sm/md/lg` (préfixes `sm:/md:/lg:` utilisés), `--font-weight-bold` (`font-bold` utilisé), `--color-navy`/`--color-wh` (`bg-navy`/`text-wh` dans `layout.tsx`), `--border-bd`, `container`.

> **Ordre conseillé** (cohérence) : purger d'abord `components/ui/*.jsx` + `jurisprudence.tsx` + la dépendance `relume-icons` → l'usage de tous ces tokens tombe à 0, leur retrait de `globals.css` devient alors **à faible risque**.

---

## Lot 5 — Documents et dossiers de travail (sans usage sur le site)

**À conserver** (demandé) : `CLAUDE.md`, `AGENTS.md`, et les docs utiles — `docs/CHARTE-SITE.md`, `docs/ECARTS.md`, `docs/ENSEIGNEMENTS.md`, `docs/A-REDIGER.md`, `docs/plan-redirections-migration.md` (= REDIRECTIONS), `docs/NETTOYAGE.md`, `docs/SEO-formations.md`, `docs/bascule-domaine-vercel.md`, `docs/charte/*` (charte graphique de référence).

**Proposition : archiver hors du dépôt** (ou supprimer) — aucun usage par le site, poids à sortir du repo :
| Chemin | Nature | Risque |
|---|---|---|
| `tools/globe-export/` (**2,6 Mo** : textures earth_*.jpg/png, `entry.ts`, `index.html`, `bundle.js` non suivi) | outil de génération du globe (hors build via `tsconfig`) | **moyen** (utile pour régénérer les textures du globe — archiver plutôt que supprimer) |
| `docs/refonte-home/` (`maquette-home.html`, `fiche-v3.docx`, `lot-*.md`, `points-a-arbitrer.md`, `recette-lot-9.md`, `reponse-inventaire-arbitrages.md`, `systeme-chromatique-familles.md`) | anciens briefs/maquettes de la refonte accueil | faible (archiver) |
| `docs/maquettes/` (`maquette-crypto-actifs-blockchain-v6-*.html`, `rapport-controle-maquette-crypto-v6.md`) | maquettes/rapports de contrôle | faible (archiver) |
| `docs/ma-tech-v2.html` | maquette HTML | faible (archiver) |
| `archive/blog/` | anciennes données blog (voir Lot 1) | faible (archiver ou supprimer) |
| `reference/` (`DESIGN.md`, `README.md`, `assets.md`, `sitemap.md`, 24 Ko) | matériel de référence du starter | faible (archiver si plus consulté) |
| `src/components/Hero.astro` + dossier `src/` | reliquat Astro (voir Lot 1) | faible (supprimer) |

> Les maquettes citées par le brief (`maquettes-mobile-lots`, `maquettes-formations`) n'existent pas en tant que dossiers suivis par git — elles étaient hors dépôt (zips de travail). Rien à archiver côté repo.

---

## Lot 6 — Points défavorables au référencement

> **Dominant mais volontaire** : `app/layout.tsx:66` → `robots: { index:false, follow:false }` (+ `app/robots.ts`) verrouillent tout le site en `noindex` (pré-prod). À LEVER le jour de la mise en ligne. Les points ci-dessous valent une fois ce verrou retiré.

| # | Constat | Emplacement | Preuve | Risque correction |
|---|---|---|---|---|
| 6.1 | **Feuille CSS distante bloquante + apparemment inutilisée** : `@tabler/icons-webfont@latest` chargée dans `<head>` sur TOUTES les pages (render-blocking, CDN tiers, version `@latest` non figée) | `app/layout.tsx:77` | aucune classe `ti ti-*` dans `app/`/`components/` | faible/moyen (**gain le plus net** : retirer si confirmé inutilisé ; sinon auto-héberger + figer la version) |
| 6.2 | 2 `<img>` bruts au lieu de `next/image` | `app/nos-domaines/cybercriminalite/page.tsx:272` (portrait), `app/nos-domaines/ma-tech/page.tsx:109` (fond hero) | balises `<img>` | moyen (migration peut décaler le cadrage) |
| 6.3 | **AVIF non activé** (aucun bloc `images` dans `next.config.mjs`) | `next.config.mjs` | pas de `images.formats` | faible (ajouter `['image/avif','image/webp']`) |
| 6.4 | Sources images/vidéos lourdes (servies optimisées par Next mais gonflent le dépôt) : `oeuvre-originale-couverture.jpg` 3,5 Mo, `-atelier.jpg` 2,3 Mo, `cabinet-interieur.jpg` 2,65 Mo, `opage-formation.png` 1,74 Mo (photo en **PNG**) ; vidéos hero `tribunal-*`, `rgpd-hero` | `public/images/*`, `public/videos/*` | tailles réelles | faible/moyen (recompresser / PNG→WebP) |
| 6.5 | H1 : **1 seul par route**, aucune page sans H1 | toutes les routes (tableau vérifié) | — | — (RAS) |
| 6.6 | `title`/`description` : **tous présents, aucun doublon** (statiques) | chaque page `metadata`/`generateMetadata` | — | — (RAS) ; vigilance : champs dynamiques `/cas-clients/[slug]` (vérifier unicité dans `cas-clients.ts`) |
| 6.7 | Liens sans texte : **aucun** (tous les liens/boutons icône ont `aria-label` + SVG `aria-hidden`) | header, footer, ShareBar… | — | — (RAS) |
| 6.8 | Scripts : globe THREE.js **déjà différé** (`dynamic` + monté >851px + `prefers-reduced-motion`) ; polices via `next/font` auto-hébergées ; JSON-LD inline (bénéfique). Rien de bloquant hormis 6.1 | `AccueilV4.tsx`, `app/layout.tsx` | — | faible (option : ne charger THREE qu'à l'entrée en viewport) |
| 6.9 | Vigilance code mort : `Catalogue.tsx` contient un **2ᵉ `<h1>`** — ne pas le réintroduire sur `/ressources` sans le dégrader | `app/ressources/_components/Catalogue.tsx:77` | — | — (déjà mort, cf. Lot 1) |
| 6.10 | **Police Caveat chargée pour rien** : importée via `next/font` et posée en `--ff-hand`, mais **jamais consommée** (`var(--ff-hand)` → 0) → téléchargement inutile | `app/layout.tsx:47` | aucun `var(--ff-hand)` | faible (retirer l'import `Caveat` + la variable) |

---

## Lot 7 — Sécurité (fichiers .env, clés, secrets)

**RAS — aucun secret exposé.**
- Aucun fichier `.env` / secret **suivi par git** (`git ls-files` → 0).
- `.env*` est bien dans `.gitignore`.
- `.env.local` existe **en local uniquement** (non suivi) — c'est le bon emplacement pour les variables SMTP de la route contact.
- **Aucun secret en dur** dans le code (clés API, mots de passe, tokens, `sk_live`, AWS `AKIA…`, `BEGIN …KEY`) → 0.
- **Aucun `.env`/secret dans l'historique git** (`git log --all --name-only` → 0).

---

## Référence — toutes les routes du site (à retrouver identiques après nettoyage)

**27 routes statiques + 1 route dynamique (8 cas) = 35 pages.**

Statiques :
1. `/`
2. `/nos-domaines`
3. `/nos-domaines/rgpd-donnees-personnelles`
4. `/nos-domaines/avocat-intelligence-artificielle`
5. `/nos-domaines/cybersecurite`
6. `/nos-domaines/contrats-informatiques`
7. `/nos-domaines/contentieux-informatique-commercial`
8. `/nos-domaines/cybercriminalite`
9. `/nos-domaines/escroquerie-fraude-bancaire`
10. `/nos-domaines/diffamation-retrait-contenus`
11. `/nos-domaines/ma-tech`
12. `/nos-domaines/crypto-actifs-blockchain`
13. `/formations`
14. `/formations/intelligence-artificielle-entreprise`
15. `/formations/rgpd`
16. `/formations/cybersecurite`
17. `/formations/ia-avocats`
18. `/ressources`
19. `/ressources/fraude-bancaire-opposition-contestation-remboursement`
20. `/ressources/faux-conseiller-bancaire-remboursement`
21. `/ressources/oeuvre-originale`
22. `/cas-clients`
23. `/le-cabinet`
24. `/contact`
25. `/mentions-legales`
26. `/politique-de-confidentialite`
27. `/sitemap.xml` + `/robots.txt` (générés)

Dynamique `/cas-clients/[slug]` — 8 cas :
- `/cas-clients/cyberattaque-responsabilite-prestataire-informatique`
- `/cas-clients/virements-frauduleux-plateformes-crypto-recours-banque`
- `/cas-clients/dereferencement-google-procedure-judiciaire`
- `/cas-clients/usurpation-identite-identifier-auteur-article-145-cpc`
- `/cas-clients/litige-infogerance-prestataire-informatique`
- `/cas-clients/piratage-informatique-expertise-origine-attaque`
- `/cas-clients/photographies-utilisees-sans-autorisation-reclamation`
- `/cas-clients/escroquerie-en-ligne-paiements-carte-crypto-banque`

**Redirections 301/308** à préserver (`next.config.mjs`) : `/competences/plateformes`, `/avocat-escroquerie-fraude`, `/nos-domaines/rgpd-donnees`, `/nos-domaines/ia-act`, `/nos-domaines/intelligence-artificielle`, `/competences/ma-tech`, `/nos-domaines/avocat-escroquerie-fraude`, `/nos-domaines/diffamation-retrait-de-contenus`, `/nos-domaines/cybersecurite/nis2` → leurs destinations actuelles.

---

### Récapitulatif chiffré
- **Lot 1** : **16 fichiers morts** (dont `components/ui/*` + `lib/utils`) + **1 module CSS orphelin** (`cybersecurite.module.css`, 237 lignes) + **4 fichiers archive**.
- **Lot 2** : ≈ **25,5 Mo** d'assets `public/` orphelins (dont 1 vidéo de 17,6 Mo) + 1 vidéo à **remplacer** (filigrane, `contact-paris.mp4`).
- **Lot 3** : **7 dépendances npm** inutilisées (reliquats Relume/shadcn).
- **Lot 4** : 0 `console.log`, 0 code commenté ; 1 fonction morte (~291 lignes) + 2 constantes de données non rendues dans des fichiers vivants ; classes CSS mortes (le-cabinet/contact/ressources/ma-tech…) ; variables + tokens Relume `@theme` inutilisés ; **police Caveat chargée pour rien**.
- **Lot 5** : `tools/globe-export` (2,6 Mo), `docs/refonte-home`, `docs/maquettes`, `archive/blog`, `reference/`, `src/` à archiver/supprimer.
- **Lot 6** : 1 action nette (webfont Tabler bloquante/inutile), 2 `<img>`→`next/image`, AVIF à activer, sources lourdes, police Caveat ; H1/méta/liens **OK** ; verrou noindex à lever à la mise en ligne.
- **Lot 7** : **RAS** (aucun secret exposé ni dans l'historique).
