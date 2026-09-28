# Enseignements & plan d'uniformisation

> À partir de l'état réel de `main` (`4e7e09f`). Lecture seule — **aucune uniformisation n'a été commencée**.

## Ce qui a causé les divergences

1. **Développement page par page, en silos CSS.** Chaque page a été construite avec son propre `*.module.css` scopé (`:global()` sous `.ia/.cc/.esc…`) ou du styled-jsx `[data-domaine]`. Résultat : le même motif (hero, bouton, surtitre, exergue, encart délai, FAQ) est **réimplémenté à chaque fois**, avec des noms de classe différents (`.label`/`.eyebrow`/`.kicker`/`.lbl`) et des valeurs recopiées puis dérivées.
2. **Valeurs codées en dur plutôt que tokens.** Le noyau de charte (`#1A47FF`, `#0A0F2E`, `#E0E0EE`, `#4A4A63`…) est réécrit en littéral dans les modules ; rgpd et cybersécurité vont jusqu'à **redéclarer tout le système** en alias locaux. Les corrections de charte ne se propagent donc pas.
3. **Données dupliquées au lieu d'une source unique.** L'équipe est ré-encodée en dur dans 5 pages ; du coup la source `lib/equipe.ts` a pris du retard (Sarah sans Montréal) sans que les pages en pâtissent — et l'incohérence s'installe.
4. **Héritage de template non purgé.** Un thème Relume/Tailwind (tokens `--color-*`, composants `home/blog-*`, `layout-*`, `navbar-11`, `footer-01`) subsiste en **code mort** (~1 900 lignes) et pollue ESLint (`<img>`, `@ts-nocheck`, apostrophes) et `globals.css`.
5. **Refontes successives non rétro-appliquées.** Les décisions récentes (langage clair, proscription de `#9FB2FF`, rouge `#B3231F`, corps 17px, Bebas optionnel) ont été prises page par page ; les pages plus anciennes gardent l'ancienne valeur → variantes datées qui coexistent.

## Ce qu'il faut mettre en place pour que ça ne se reproduise pas

- **Tokens uniques et obligatoires.** Un seul jeu de couleurs/typo/espacement dans `globals.css` ; interdiction d'un hex de charte en littéral dans un module (lint/relecture). Purger les tokens Relume morts.
- **Composants partagés obligatoires** pour tout motif présent sur ≥2 pages : `DomainHero`, `HeroVideo`, `Button` (ou `.btn` global), `Eyebrow`, `Exergue`, `DelaiCallout`, `Faq`, `VoirAussi`. Le trio propre `cas-clients/*`, `header/*`, `equipe-dossier + lib/equipe.ts` est le modèle.
- **Sources de données uniques** : `lib/equipe.ts` (personnes), `nav-data.ts` (familles + domaines) — les pages **lisent**, ne recopient pas.
- **Règles à ajouter dans `CLAUDE.md`** : (a) jamais de hex de charte en dur, utiliser les tokens ; (b) pas de nouveau `*.module.css` pour un motif déjà partagé ; (c) voix « le cabinet », jamais « nous », dans tout texte affiché **y compris les CTA** ; (d) CTA `/contact` sans paramètre ; (e) `id="contenu"` sur chaque `<main>` + BreadcrumbList/FAQPage quand une FAQ existe ; (f) pas d'engagement de délai (« sous 24 h/48 h ») ; (g) `radius: 0`, `next/image` obligatoire.

---

## Plan d'uniformisation en une passe

**Ordre des opérations** (du plus structurant au plus local, pour que chaque étape s'appuie sur la précédente) :

1. **Nettoyage** (débloque le reste, réduit le bruit) : supprimer le code mort (G18) et purger les tokens Relume (G19). Build + lint → la base ESLint doit chuter fortement.
2. **Tokens** (`app/globals.css`) : ajouter `--tint` (G9), `--red` (G8) ; trancher `#9FB2FF` (G6) ; vérifier le noyau. Aucune page ne doit encore définir d'alias local.
3. **Composants / classes partagés** : poser dans `globals.css` les classes `.btn*`, `.eyebrow`, `.wrap`, `.skipLink`, focus ring (G10-G12) ; créer `DomainHero` + `HeroVideo` uniques ; fusionner `FaqAccordion` (L5) ; supprimer `MobileActionBar` d'escroquerie (L4).
4. **Sources de données** : corriger `lib/equipe.ts` (G3) puis brancher les 5 pages qui recopient l'équipe (G4-G5) ; aligner les 3 libellés de domaines (L8) et le-cabinet (L7).
5. **Balayage par page** : remplacer les hex en dur par les tokens (G7), retirer les query params `/contact` (G16), poser `id="contenu"` + JSON-LD (G13-G15), uniformiser les `<title>` (G14) et la mention géo (G21), corriger les rayons (L1-L2), l'`<img>` (L3), le `.hero h1` crypto (L6), l'effet IA (L9), les entités légales (L10).
6. **Rédaction** : harmoniser les CTA (G1-G2), retirer les engagements de délai (G20), basculer les réfs d'articles en petit/FAQ (L13), lever les 3 TODO de citation avec le cabinet (L12).
7. **Vérification finale** : build + lint ; audit débordement 375/390/430/1440 ; contrôle visuel des pages retouchées ; retrait du verrou noindex **seulement** au go-live.

**Fichiers principaux touchés** : `app/globals.css` ; `components/{header,footer,ui}/*` ; `components/equipe-dossier.tsx` + `lib/equipe.ts` ; `components/header/nav-data.ts` ; les 20 `*.module.css` ; les `page.tsx`/`*Client.tsx` des 10 domaines + formations + contact + le-cabinet + home (`AccueilV4`) ; suppression de ~10 fichiers morts.

## Points qui nécessitent ta décision (avec ma recommandation)

1. **`#9FB2FF` sur navy** — le retirer partout (surcharger `--muted-on-dark` en `rgba(255,255,255,.76)`, comme les 4 pages récentes) **ou** l'assumer comme couleur de charte ? → **Recommandation : le retirer partout** (cohérent avec les refontes 09-25 et l'accessibilité).
2. **Bebas** — le proscrire officiellement sur cybercriminalité/diffamation/crypto (déjà le cas de facto) reste-t-il une **exception** ou devient-il la règle « langage clair » pour toutes les pages ? → **Recommandation : garder Bebas en H1 partout ailleurs** (identité forte), assumer ces 3 pages comme exceptions documentées.
3. **CTA principal** — quel libellé unique ? → **Recommandation : « Échanger avec un avocat »** (déjà le plus répandu) ; téléphone : **« Appeler — 01 81 70 62 00 »** ; header : **« Écrire au cabinet »**.
4. **Boutons** — poser un `.btn` global dans `globals.css` **ou** généraliser `components/ui/button.jsx` aux pages domaine ? → **Recommandation : `.btn` global CSS** (les pages domaine sont en CSS Modules, moins de refactor).
5. **`GlobalCta`** — IA, contentieux et ma-tech reçoivent le CTA générique alors qu'elles ont un bloc final : les ajouter à `SUPPRESS_ON` ? → **Recommandation : oui**, les ajouter (cohérent avec les 7 autres domaines).
6. **Corps de texte** — figer à **17px** (recommandé, variante récente) ou 16px ?
7. **Engagements de délai** — « sous 24 h » (contact) : supprimer ou reformuler en non-engageant (« nous revenons vers vous rapidement ») ? → **Recommandation : reformuler sans délai chiffré.**
8. **Vidéo NIS 2 externe** (Vercel Blob) — rapatrier dans `public/` ? → **Recommandation : oui** (robustesse, pas de dépendance externe).

**Ne pas commencer l'uniformisation.** En attente de validation de ces 8 points et du périmètre.
