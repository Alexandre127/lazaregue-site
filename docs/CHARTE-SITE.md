# Charte du site Lazarègue Avocats — état réel du code

> Établie **a posteriori** à partir de `main` (HEAD `4e7e09f`, 28 sept. 2026), en lecture seule.
> Décrit ce que le code fait **réellement**, pas ce qu'il devrait faire. Les écarts sont dans [`ECARTS.md`](./ECARTS.md), les causes et le plan dans [`ENSEIGNEMENTS.md`](./ENSEIGNEMENTS.md).
> Convention : ✅ règle appliquée et cohérente · ⚠️ règle appliquée mais avec variantes · ❌ règle contredite. « Token » renvoie à `app/globals.css`.

Fait structurant : **le CSS est scopé par page** (CSS Modules `:global()` sous une classe racine `.ia/.cc/.esc/.diff/.mt/.rgpd…`, ou styled-jsx `[data-domaine="…"]`). Les seuls systèmes réellement partagés sont l'en-tête, le pied de page, la rubrique cas-clients, l'équipe (`lib/equipe.ts`) et l'accueil (`AccueilV4`). Presque tout le reste (hero, boutons, surtitres, situations, FAQ, exergues, encarts) est **réimplémenté page par page**.

---

## A. Identité visuelle

### A.1 Couleurs

**Palette de charte réellement active** (tokens `app/globals.css:11-59`) :

| Rôle | Token | Valeur | Exemple conforme |
|---|---|---|---|
| Action (boutons, liens, focus, nav) | `--blue` / `--focus` | `#1A47FF` | `app/cas-clients` |
| Bleu hover | `--blue3` | `#0A2ACC` | `escroquerie.module.css` |
| Bleu clair | `--blue2` | `#4D6FFF` | — |
| Fond sombre principal (= `body`) | `--navy` | `#0A0F2E` | `escroquerie` hero |
| Fond sombre secondaire | `--ink` | `#0A0A14` | bandeaux `dcard` |
| Blanc | `--wh` | `#FFFFFF` | partout |
| Fond clair « Ghost White » | `--off` | `#F4F4F8` | sections `.tint` |
| Bordures / filets | `--bd` | `#E0E0EE` | cartes |
| Texte secondaire sur clair | `--text-muted` | `#4A4A63` | corps atténué |
| Texte secondaire sur sombre | `--muted-on-dark` | `#9FB2FF` (voir ⚠️) | — |
| Gris (sur navy / non-texte) | `--mu` | `#8888A0` | nav-link |
| Statuts (documents-preuves) | `--ok`/`--ko`/`--warn` | `#0E7A45`/`#C0272D`/`#8A6D00` | RGPD spécimens |

**Règles effectives :**
- ✅ **`#1A47FF` est la seule couleur d'action** (aucun bouton/lien en couleur de famille constaté).
- ✅ **`#C8F53A` (vert acide) : 0 occurrence** — correctement proscrit.
- ⚠️ **Fond clair « tint » = `#EEF1FB`** : valeur récurrente (10 pages) mais codée en dur, sans token dédié → à tokeniser.
- ⚠️ **Rouge d'urgence** : la règle « rouge = urgence » est respectée dans l'esprit, mais **5 rouges coexistent** — `#B42318` (contact, diffamation, escroquerie), `#B3231F` (cyber, rgpd, la plus récente), `#B3261E` (cybercriminalité), `#FF6B6B` (contentieux), + rouges foncés de texte `#7A1710`/`#8E1B18`. **Valeur à généraliser : `#B3231F`** (variante 09-25).
- ⚠️ **`#9FB2FF`** est ambigu : c'est le token `--muted-on-dark`, mais la moitié des pages le **bannissent** en le surchargeant en `rgba(255,255,255,.74-.78)` (diffamation, cybercriminalité, contentieux, ma-tech — variante 09-25), tandis que **footer (10×), cyber, rgpd et la home l'appliquent encore**. Voir ECARTS (décision à prendre).
- ⚠️ **`#8888A0`** n'est jamais appliqué en dur comme petit texte sur clair (conforme) ; seule trace legacy dans `components/legal/pages-legales.jsx:812`.
- ❌ **Cœur de charte codé en dur** au lieu des tokens dans de nombreux fichiers, surtout **`rgpd.module.css` et `cybersecurite.module.css` qui redéclarent tout le système** en alias locaux (`.rgpd{--blue:#1a47ff;--navy:#0a0f2e;…}`). Idem `#E0E0EE`→`--bd` (7 fichiers), `#4A4A63`→`--text-muted` (5), `#0A2ACC`→`--blue3` (4).

### A.2 Typographies

Polices chargées via `next/font` (`app/layout.tsx`) : **Space Grotesk** (`--ff-body`, 300/400/500), **Bebas Neue** (`--ff-display`, 400), **DM Mono** (`--ff-mono`, 300/400/500), Caveat (`--ff-hand`, réservé annotations documents-preuves). **Aucune serif** hormis une imitation typographique volontaire du logo « Le Monde » (`accueil-v4-css.ts:154`). Note : le **« gras » de charte = 500**, pas 700 (`--font-weight-bold: 500`).

| Rôle | Police | Poids | Taille | Casse / LS |
|---|---|---|---|---|
| H1 (hero) | Bebas | 400 | clamp par page (A.3) | souvent UPPERCASE, LS ~0.01-0.02em |
| H2 | Space Grotesk | 500 | `clamp(28px,3.2vw,40px)` (standard) | LS -0.015em |
| H3 | Space Grotesk | 500/600 | 20-21px | LS -0.01em |
| Surtitre / label | DM Mono | 400 | 11-12px | UPPERCASE, `--blue` |
| Corps | Space Grotesk | 400 | 16-17px | LH 1.5-1.65 |
| Chapô | Space Grotesk | 400/500 | 18-19px | LH 1.6 |
| Exergue | Space Grotesk | 500 | 19-28px | filet gauche bleu |
| Bouton | Space Grotesk | **600** | 16px | casse phrase |
| Nav-link | DM Mono | 400 | 10px | LS 0.14em, `--mu` |
| Gros chiffres | Bebas | 400 | 26-40px+ | `--blue` |

- ✅ **Aucun corps de texte en Bebas** ; Bebas strictement réservé aux titres, gros chiffres, logo (conforme).
- ✅ **Aucune serif** dans l'UI.
- ⚠️ **Exception Bebas** : **cybercriminalité proscrit Bebas entièrement** (H1 en Space Grotesk 600, arbitrage documenté dans son CSS). **diffamation** et **crypto** font de facto de même (H1 en Space Grotesk). Les trois sont les pages « refonte langage clair ». → à confirmer comme règle ou exception.
- ⚠️ **Surtitre : 6 noms de classe pour un motif identique** — `.label`, `.eyebrow`, `.kicker`, `.lbl`, `.cx-label`, `.role-eyebrow`. Interlettrage divergent (0.06 / 0.08 / 0.1 / 0.14em). **Valeur à généraliser : DM Mono UPPERCASE `--blue`, LS 0.14em.**

### A.3 Échelle des titres (mobile → desktop)

- ✅ **H2 très cohérent** : `clamp(28px,3.2vw,40px)` / SG 500 / LH 1.12 / LS -0.015em (cas-clients, ressources, formations, IA, articles).
- ⚠️ **H1 : chaque page redéfinit son propre `clamp()`**, plafond de **56px (cybercriminalité) à 96px (contentieux)**. `crypto.module.css` a même **deux définitions `.hero h1` concurrentes** (l.66 et l.324).
- ⚠️ **Corps oscille 16px / 17px / 1.0625rem** selon la page. **Valeur à généraliser : 17px** (variante ma-tech/crypto 09-25).

### A.4 Espacements

| Élément | Token / valeur | État |
|---|---|---|
| Largeur max conteneur | `--content-max: 1200px` | ⚠️ crypto `.wrap` **1272px**, cas-clients `.cgrid` **1296px**, nos-domaines hub **1120px** |
| Marge latérale | `--page-margin: 36px` / `--page-margin-mobile: 20px` | ⚠️ le-cabinet **40px**, cybercriminalité **24px**, cyber 36px |
| Gouttière grille | `--grid-gutter: 24px` | ✅ (charte 12 colonnes / 24px) |
| Padding-block section | `clamp(56px, 7vw, 104px)` | ⚠️ standard (cas-clients, ressources, IA, escroquerie) ; formations 104/120px, cybercriminalité 72→48px |

Exemple conforme : `app/cas-clients` (1200px, 36px, `clamp(56px,7vw,104px)`).

### A.5 Rayons, bordures, ombres, filets

- ✅ **`border-radius: 0`** quasi partout (tokens `--radius-*: 0`). Design plat, **2 seules `box-shadow`** de tout le site (anneau focus footer ; dropdown menu header).
- ❌ **2 violations de rayon** : `nos-domaines.module.css:81` (`border-radius: 8px`) et `cybersecurite/nis2/CybersecuriteClient.tsx:651` (`borderRadius:"12px"` inline sur `<video>`). (`cas-clients.module.css:39` `50%` = pastille décorative 8px, toléré.)
- ⚠️ **Filet d'accent bleu** : épaisseur incohérente **2 / 3 / 4px**. **Valeur à généraliser : `4px solid var(--blue)`** (cas-clients/formations, 09-25).
- ✅ **Bouton standard cohérent** : `min-height:48px; padding:13px 24px; background:var(--blue); color:#fff; 600 16px; border:0; radius:0`, hover `--blue3`.

### A.6 Photos et vidéos

- ✅ **`next/image`** sur tous les hero et portraits des pages **live** (21 fichiers).
- ⚠️ **`<img>` bruts en code vivant** : `cybercriminalite/page.tsx:272` (portraits équipe — à passer en `next/image`) et `ma-tech/page.tsx:109` (`<picture>` art-direction volontaire, toléré). Les ~20 autres `<img>` sont dans du **code mort** (voir F).
- ✅ **Hero photo pleine largeur, ratio natif** : `le-cabinet` (bande `aspect-ratio:1800/792`, corrigée 28-09) est le modèle.
- ⚠️ **Portraits équipe : deux traitements** — `equipe-dossier.tsx` (`aspect-ratio:4/5`, `object-fit:cover`, le plus récent) vs `section-equipe.tsx` (ratio responsive 0.82→0.88→4/3). **Ratio à généraliser : 4/5.**
- ⚠️ **Lecteur vidéo hero réimplémenté 4×** : `contact/HeroVideo.tsx`, `rgpd/HeroVideo.tsx` (même nom, code distinct), `cybercriminalite/PalaisVideo.tsx`, `<video>` inline diffamation → à mutualiser.

---

## B. Composants récurrents

| Composant | État partagé | Réalité |
|---|---|---|
| **Hero de domaine** | ❌ aucun | 10 implémentations indépendantes ; classe `.hero`/`.hero-i`/`.hero-y`/`.hero-d`/`.cx-hero`, modificateur sombre `navy`/`dark`/`on-dark`/`onDark`/`hero-photo` **tous différents** |
| **Surtitre** | ❌ aucun | 6 noms de classe (A.2) |
| **Boutons** | ⚠️ `components/ui/button.jsx` existe mais **n'est utilisé que par l'accueil** | Toutes les pages domaine utilisent `.btn*` réécrit dans chaque module (jusqu'à **16 définitions** dans escroquerie) ; aucun `.btn` dans `globals.css` |
| **Cartes situation** | ❌ aucun | `.situations`/`.castype`/`.cw-sits`/matrice — propre à chaque page |
| **« En clair »** | ❌ aucun | `v-tag` (contentieux) vs `.gl` inline (cybercriminalité) |
| **Exergue** | ❌ aucun | `.exergue`/`.acc`/`.claim`/`blockquote.pvd-quote` — filet gauche bleu réimplémenté |
| **Encart urgence** | ❌ aucun | `.delai` (rgpd 72h), `.delai-wrap/.delai-n` (diffamation 3 mois), `<b>Délai.</b>` inline (escroquerie 13 mois), `<B>24h/72h</B>` (nis2) |
| **Matrice / tables** | ❌ aucun | `.matrix`/`.readings`/`.register-excerpt`/`<table>` brut + `MatriceTabs`/`ReglementModule` (IA) |
| **Frise d'étapes** | ❌ aucun | `.frise`/`.mc-blocks`/`.methode-bloc`/`.steps`/`.cw-nis` |
| **FAQ** | ⚠️ 3 familles | `<details>` natif (7 pages, contenu **dans le DOM** ✅) ; **2 `FaqAccordion.tsx` homonymes** (IA vs rgpd, quasi identiques) ; `Faq` custom crypto |
| **Cas clients** | ✅ **partagé** | `cas-clients/_components/case-parts.tsx` + `data/cas-clients.ts` (`ISSUE`, `DOM_META`) — **modèle de consolidation** |
| **Cartes équipe** | ⚠️ source `lib/equipe.ts` + `equipe-dossier.tsx` | lues par le-cabinet/contrats/ma-tech/crypto ; **ré-encodées en dur** par cybercriminalité, escroquerie, cyber, rgpd, accueil |
| **« Ce qui distingue »** | ❌ | bloc formel seulement dans contentieux (`.distingue`) |
| **« Voir aussi »** | ❌ aucun | « Sujets liés » / « Poursuivre la lecture » / « Voir aussi » / « Pour aller plus loin » — 4 libellés |
| **Contact + formulaire** | ⚠️ | page `/contact` avec backend réel `app/api/contact/route.ts` (nodemailer SMTP) ; contentieux a **son propre** `ContactForm.tsx` |
| **`GlobalCta`** | ✅ `components/footer/global-cta.tsx` (layout, site-wide) | `SUPPRESS_ON` = 10 routes (voir C/§final). ⚠️ IA, contentieux, ma-tech reçoivent quand même le CTA générique alors qu'elles ont un bloc final |
| **Barre basse mobile** | ✅ `site-header.tsx` (`.bottomBar`, site-wide) | ⚠️ **doublon** : `escroquerie/MobileActionBar.tsx` réimplémente une barre (commentaire faux + double `padding-bottom`) |
| **Header / menu** | ✅ `components/header/*` (`site-header`, `nav-data`, `logo`) | propre. `components/navbar-11.tsx` = ancien header **mort** |

`SUPPRESS_ON` (`global-cta.tsx:18`) : `["/", "/contact", "/le-cabinet", "/nos-domaines/cybersecurite", "/nos-domaines/contrats-informatiques", "/nos-domaines/rgpd-donnees-personnelles", "/nos-domaines/crypto-actifs-blockchain", "/nos-domaines/cybercriminalite", "/nos-domaines/diffamation-retrait-contenus", "/nos-domaines/escroquerie-fraude-bancaire"]`.

**Contre-exemples propres à généraliser** : `components/header/*`, `components/footer/*`, `cas-clients/_components/* + data/cas-clients.ts`, `components/equipe-dossier.tsx + lib/equipe.ts`.

---

## C. Mobile

**Audit réel (navigateur, dev :3211) à 375 / 390 / 430 / 1440 px sur les ~25 pages :**
- ✅ **Aucun débordement horizontal** (`scrollWidth ≤ innerWidth`) sur aucune page à aucune de ces largeurs.
- ✅ **En-tête (logo + bouton Menu) tient sans chevauchement dès 375px** partout.
- ✅ Pas de titre Bebas qui déborde/coupe, pas de bouton sur 3 lignes constaté.
- ✅ **Contenu replié présent dans le DOM** : les `<details>` natifs (7 pages) et les deux `FaqAccordion` (contenu en `hidden={!open}`) gardent le texte dans le DOM.

**Point de rupture réellement utilisé — divergent** : `1023/1024px` (le-cabinet, plusieurs domaines), `767/768px` (escroquerie, cartes), `900/901px` (contentieux honoraires), `640px` (cybercriminalité), `992px` (échelle globale). Il n'y a **pas un breakpoint unique** : chaque module choisit le sien.

**Motifs mobiles récurrents** : grilles multi-colonnes → 1 colonne ; onglets « client » (WaysTabs, DemoTabs, ReglementModule) ; `<details>` ; barre basse fixe ; table desktop doublée en cartes mobile (contentieux).

**Cibles tactiles / petits textes** : la barre basse et les boutons respectent 44-48px. DM Mono descend à **10-11px** pour les nav-links et labels (sous le plancher de 12px de la charte, mais ce sont des labels, pas du corps) — à noter. Les liens **inline** dans le corps sont < 44px de haut, ce qui est admis pour un lien de texte.

---

## D. Rédaction et discours

- ⚠️ **Personne grammaticale** : la règle « le cabinet, pas nous » est **contredite sur des pages rendues**. « nous/notre/nos » en voix du cabinet dans : **toutes les pages Formations** (très marqué), **NIS 2**, **contrats** (« Nous rapprochons/examinons/analysons… »), **rgpd**, home (`AccueilV4:407,414,421,891`), le-cabinet, contact, footer (« Nos domaines »), et surtout le **CTA du header site-wide « Nous écrire »**. Aucun « je » de la voix du cabinet (seules occurrences = questions FAQ à la voix du prospect).
- ⚠️ **Jargon non expliqué** visant le prospect : « donneur d'ordre » (nis2, contrats), « au fond » (cas-clients, WaysTabs), « ne préjuge(nt) pas » (cas-clients, nis2), « qualifier les obligations » (CyberV4), « ce que le RGPD commande de » (rgpd), « caducité de l'ensemble » / « réputée non écrite » (contrats), « perte de chance de conserver les fonds » (escroquerie).
- ❌ **CTA : au moins 15 libellés différents** pour la même action. Le téléphone existe en **6 formats** (« Appeler le cabinet » ± flèche ± numéro, « Parler à un avocat — 01 81 70 62 00 »). La home utilise **deux** libellés propres (« Exposer votre situation à un avocat » en hero, « Écrire au cabinet » en pied). **À généraliser** : un libellé principal unique (recommandation : « Échanger avec un avocat », déjà le plus répandu) + un libellé téléphone unique.
- ✅ **Réserve cas clients** cohérente : « Dossiers anonymisés et clos… ne préjuge(nt) pas de l'issue d'un autre dossier… » (`CasesBrowser.tsx:64`, `[slug]/page.tsx:160`).
- ⚠️ **Chiffres** : « Depuis 2016 » (auto-déclaratif, cohérent) ✅. « 72 h / 13 mois / 3 mois / 35 M€ / 1,4 % du CA » sont **sourcés** (articles) ✅. **À signaler** : engagements de délai de service **« réponse sous 24 h »** (contact) et **« sous 48h »** (NIS 2) — contraires à la règle « pas d'engagement de délai permanent ». Les stats non sourcées « 73/80/93 % » n'existent **que dans du code mort** (`stats-19.tsx`).
- ⚠️ **Références d'articles en plein corps** (règle : en petit ou en FAQ) : crypto (MiCA art. 15), CyberV4 (art. 32 RGPD en lead), nis2, rgpd (livrables), diffamation (art. 65), IA. **Conformes** (en petit/FAQ) : escroquerie (`.soutient-refs`), contact, cas-clients.
- ❌ **3 TODO de citation à lever avant mise en ligne** : diffamation `DiffamationClient.tsx:139` (art. 65-3), cybercriminalité `faq.ts:14` (art. L.12-10-1) et `faq.ts:33` (art. L.127-3).

**Intitulés & personnes :**
- ✅ **Trois familles** identiques partout (source `nav-data.ts` → header, footer, home, le-cabinet).
- ⚠️ **10 domaines** : home/menu/footer alignés (même source), mais **le-cabinet et cas-clients divergent sur 3** : « M&A tech et due diligence » vs « Fusions-acquisitions technologiques » ; « Cybercriminalité et cyberattaques » vs ordre inversé ; « Fraude bancaire et escroquerie » vs « …en ligne ».
- ⚠️ **Personnes** — source `lib/equipe.ts`, mais **en retard sur les pages** : **Sarah Hinderer** y est « barreau de Paris » (sans Montréal) alors que toutes les pages affichent « Paris et Montréal » ; **Khalid** perd « technique » sur la home (`app/page.tsx:38` + `AccueilV4:431` = « Consultant en cybersécurité ») ; **Amir** = « barreau de l'Essonne » dans le-cabinet (vs « Évry ») ; **Nadia** = « Nice Sophia Antipolis » / « maître » dans le-cabinet vs « Université Côte d'Azur » / « maîtresse » ailleurs. Aucune trace de « appui technique » en prod (seulement code mort).
- ✅ **Coordonnées** adresse/téléphone/e-mail cohérentes partout.
- ⚠️ **Mention géo non figée** : « Paris · intervention partout en France » (règle) coexiste avec « Paris et toute la France », « intervention dans toute la France », « Toute la France », « Paris 17ᵉ · toute la France »… **Barreaux collectifs** incohérents : footer « Paris et d'Évry » (**omet Montréal**) vs contact « Paris, Évry et Montréal ».
- ✅ **Cible** : seule escroquerie adresse les particuliers, et le fait. (À noter : cybercriminalité « Vous êtes victime » et les 2 ressources fraude ont un cadrage B2C ponctuel, admis dans ce cluster.)

---

## E. SEO et structure

- ✅ **Canonicals** présents et cohérents avec la route sur toutes les pages ; **noindex site-wide actif** (verrou pré-prod : `layout.tsx:66` + `robots.ts` + en-tête `X-Robots-Tag` via `proxy.ts`) — **à retirer à la mise en ligne**.
- ✅ **Toutes les pages `/competences` sont sous `/nos-domaines/`** (règle structure respectée).
- ⚠️ **`id="contenu"` non uniforme** : présent sur ~la moitié ; **absent** sur home (pas de `<main>`), IA, cybersécurité, NIS 2, contrats, œuvre-originale ; **variantes** `id="contenu-principal"` (rgpd) et `id="main"` (escroquerie). Le skip-link vise `#contenu` → cible manquante sur les pages sans cet id (a11y).
- ⚠️ **Breadcrumb JSON-LD absent** sur home, nos-domaines (index), NIS 2, le-cabinet, contact, ressources (index), œuvre-originale, mentions, politique.
- ⚠️ **FAQPage JSON-LD** présent (RGPD, IA, NIS 2, contrats, M&A, crypto, œuvre-originale) mais **absent alors qu'une FAQ visible existe** sur cybersécurité, contentieux, cybercriminalité, diffamation, escroquerie.
- ⚠️ **Suffixe de marque des `<title>` non uniforme** : moitié « | Lazarègue Avocats », autres « | Lazarègue », « — Lazarègue Avocats », ou aucun (ma-tech, contentieux, crypto, diffamation, rgpd).

(Tableau H1/title/canonical/JSON-LD par page : voir le détail dans `ECARTS.md`.)

---

## F. Technique et qualité

- **ESLint** : **175 problèmes (145 erreurs, 30 avert.)**. Dominante : `react/no-unescaped-entities` (140, surtout `components/legal/pages-legales.jsx` **en code vivant**). `@next/next/no-img-element` (23) presque tous en **code mort**, sauf `cybercriminalite/page.tsx:272`. `@ts-nocheck` interdit sur 3 fichiers (dont 2 morts). 1 `react-hooks/set-state-in-effect` (`ReglementModule.tsx:186`). 7 `no-unused-vars`.
- **Tokens définis mais inutilisés** : ~la moitié de `globals.css` = **thème Relume/Tailwind résiduel jamais consommé** (`--color-*`, `--color-scheme-*`, `--radius-*`, `--space-*`, `--text-h1..h6`, `--container-*`, `--breakpoint-*`, `--ok/--ko/--warn`). Le noyau vivant est court (`--blue/--navy/--ink/--off/--bd/--mu/--text-muted/--muted-on-dark/--focus/--header-h*/--content-max/--page-margin`).
- **CSS dupliquée** : `.skipLink` dans **8 modules** (4 byte-identiques), `.wrap` dans **16**, `.btn*` dans **16**, focus ring dans **16** ; gabarit d'article dupliqué (~63 lignes communes entre les 2 articles ressources).
- ❌ **17 liens `/contact` avec paramètres** (`?objet=…`, `&situation=…`) — contraire à la règle : les 4 pages Formations, `CyberV4.tsx:27`, `ContratsInformatiquesClient.tsx:58`.
- ✅ **Aucune image locale manquante** (36 chemins vérifiés). Une vidéo NIS 2 pointe vers un **Vercel Blob externe** (`CybersecuriteClient.tsx:652`) — dépendance à signaler.
- **Code mort** : **~1 921 lignes / 10 composants** non importés (`navbar-11`, `footer-01`, `home/blog-35`, `blog-64`, `layout-300`, `layout-351`, `stats-19`, `team-06`, IA `MatriceTabs`, `LivrablesPreview`).

---

*Fin de CHARTE-SITE.md — voir `ECARTS.md` pour l'inventaire trié et `ENSEIGNEMENTS.md` pour le plan.*
