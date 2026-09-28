@AGENTS.md

# Charte du site — règles de prévention (obligatoires)

Ces règles évitent que les divergences corrigées lors de l'uniformisation du 28/09/2026 ne réapparaissent. Voir `docs/CHARTE-SITE.md` (charte effective), `docs/ECARTS.md`, `docs/ENSEIGNEMENTS.md`.

## Couleurs
- Utiliser **les tokens** de `app/globals.css`, jamais un hex de charte en dur : `var(--blue)` #1A47FF (seule couleur d'action), `var(--navy)`, `var(--ink)`, `var(--off)`, `var(--bd)`, `var(--text-muted)`, `var(--muted-on-dark)`, `var(--tint)` #EEF1FB, `var(--red)` #B3231F (seul rouge, urgence uniquement).
- **Interdits** : `#9FB2FF` (bleu ciel), `#C8F53A`, et `#8888A0` pour du petit texte sur fond clair. Sur fond navy/ink, le texte secondaire est en **blanc atténué 70–85 %** (`var(--muted-on-dark)`).
- Ne pas redéclarer les tokens de charte en alias locaux dans un module.

## Typographie
- **Bebas Neue** (`--ff-display`) : titres, logo et grands chiffres uniquement — **jamais dans le corps**. Aucune serif dans l'UI.
- **Exception documentée** : les pages **cybercriminalité, diffamation et crypto** proscrivent Bebas et composent leur H1 en Space Grotesk 600 (registre « langage clair »). Toutes les autres pages gardent Bebas en H1.
- Corps : **17px sur ordinateur, 16px sous 900px** (déjà posé sur `body`). Bouton : Space Grotesk 600, 16px, casse phrase. Labels/sur-titres : DM Mono, ≥12px si texte de contenu.

## Composants partagés (obligatoires si le motif existe sur ≥2 pages)
- Boutons : classes globales `.btn` / `.btn-primary` / `.btn-line` / `.btn-ghost` / `.btn-white` (dans `globals.css`). Ne pas redéfinir `.btn` dans un module.
- Sur-titre : classe globale `.eyebrow` (DM Mono, `--blue`, 0.14em).
- Réutiliser les systèmes propres existants : `components/header/*`, `components/footer/*`, `app/cas-clients/_components/* + data/cas-clients.ts`, `components/equipe-dossier.tsx + lib/equipe.ts`.
- **Sources de données uniques** : personnes = `lib/equipe.ts` ; familles + libellés de domaines = `components/header/nav-data.ts`. Les pages **lisent** ces sources, ne recopient pas.

## Rédaction
- Voix **« le cabinet »**, jamais **« nous »/« notre »/« nos »** ni **« je »**, dans tout texte affiché, **y compris les CTA**.
- CTA harmonisés : principal **« Échanger avec un avocat »** ; téléphone **« Appeler — 01 81 70 62 00 »** ; en-tête et barre basse mobile **« Écrire au cabinet »**. Aucun **« Nous écrire »**.
- Liens `/contact` **sans paramètre** (`?objet=…`, `&situation=…` interdits).
- **Aucun engagement de délai** (« sous 24 h », « sous 48 h »…). Aucun chiffre/résultat inventé, aucune statistique décorative ; chiffres sourcés.
- Références d'articles de loi **en petit ou en FAQ**, pas dans le corps. Toute décision de justice passe par `components/jurisprudence.tsx` (`verifiee:false` = non rendue).
- Intitulés/personnes figés : Khalid Sookia = « Consultant technique en cybersécurité » ; Amir Ben Majed = barreau d'Évry (Essonne) ; Sarah Hinderer = barreaux de Paris et de Montréal ; Alexandre Lazarègue = barreau de Paris. Coordonnées : 18 rue de Tilsitt, 75017 Paris · 01 81 70 62 00 · contact@lazaregue-avocats.fr. Mention géo : « Paris · intervention partout en France ». Cible = entreprises ; seule la page fraude bancaire/escroquerie accueille aussi les particuliers.

## Structure / technique
- `border-radius: 0` partout ; cibles 44×44px ; focus visible ; contraste AA ; **aucun débordement horizontal de 375 à 1920px** (à vérifier avant chaque mise en ligne).
- `next/image` obligatoire (pas de `<img>` brut). Toutes les pages de compétences sous `/nos-domaines/`.
- `<main id="contenu">` sur chaque page + BreadcrumbList, et FAQPage dès qu'une FAQ visible existe. Suffixe de titre : « … | Lazarègue Avocats ».
- `GlobalCta` masqué (`SUPPRESS_ON`) sur les pages qui portent leur propre bloc contact final. Barre basse mobile unique = celle du header (pas de réimplémentation par page).
- **Verrou pré-prod noindex actif** (layout + `robots.ts` + proxy) : à retirer **uniquement** au go-live.
