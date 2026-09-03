# Dette technique

## Conflits `app/hero.css` ↔ classes Tailwind

**Statut : à traiter après la mise en ligne. Ne rien changer maintenant.**

### Contexte

Le hero provient d'un HTML importé : ses styles vivent dans `app/hero.css`, en
classes préfixées `.laz-*`. Ce fichier est chargé **sans `@layer`** : ses règles
sont donc « non-layered » et l'emportent, à spécificité égale, sur les
utilitaires Tailwind (qui, eux, vivent dans des layers). Résultat : plusieurs
utilitaires Tailwind posés sur des éléments `.laz-*` sont écrasés silencieusement,
et il a fallu deux fois compenser avec `!important` ou remonter la spécificité.

### Direction retenue (post-lancement)

Envelopper le contenu de `hero.css` dans un `@layer components { … }`. Les
utilitaires Tailwind (layer `utilities`, plus haute priorité) reprendraient alors
systématiquement la main sans `!important`, et les deux `!important` ci-dessous
pourraient être retirés. À valider avec une passe de non-régression visuelle du
hero (desktop + mobile) car certaines règles `.laz-*` comptent aujourd'hui sur
leur priorité actuelle.

### Les cinq conflits réels

| # | Règle `hero.css` | Utilitaire Tailwind | Élément | Mécanisme | État actuel |
|---|---|---|---|---|---|
| 1 | `.laz-nav-links { display: flex }` — `hero.css:107` | `hidden` | `navbar-11.tsx:171` | Même spécificité (0,1,0) ; hero.css l'emporte par l'ordre de cascade → le menu horizontal restait affiché sous mobile, **en plus** du burger | **Corrigé** par une media query : `@media (max-width:1023.98px){ .laz-nav-links{ display:none } }` (`hero.css:117`) |
| 2 | `.laz-nav-links { margin-left: auto }` — `hero.css:109` | `ml-0` | `navbar-11.tsx:171` | La classe `.laz-nav-links` (0,1,0) l'emporte, par l'ordre de cascade, sur l'utilitaire `ml-0` de même spécificité | **Compensé par `!important`** → `!ml-0` |
| 3 | `.laz-hero { padding-top: 54px }` — `hero.css:154` | `pt-6` | `header-05.tsx:14` | Idem : `.laz-hero` écrase `pt-6` à spécificité égale | **Compensé par `!important`** → `!pt-6` |
| 4 | `.laz-reveal.laz-hero-right { display: flex }` — `hero.css:392` | (règle CSS `.laz-hero-right{ display:none }`) | `header-05.tsx` (colonne droite / globe) | Conflit **interne à hero.css** : la règle de base à deux classes (0,2,0) écrasait un simple `.laz-hero-right` (0,1,0) → la colonne droite refusait de se masquer sous 900px | **Corrigé** en remontant la spécificité dans la media query : `@media (max-width:900px){ .laz-hero-right, .laz-reveal.laz-hero-right { display:none } }` (`hero.css:662`) |
| 5 | `.laz-hero-h1 { font-size: clamp(62px,8.5vw,104px) }` — `hero.css:219` | style **inline** `fontSize: "clamp(46px,6.5vw,78px)"` | `header-05.tsx:30` | Le style inline (1,0,0,0) l'emporte toujours → la `font-size` de `hero.css` est **du code mort** | Non compensé : l'inline gagne en silence. À nettoyer (supprimer la ligne morte de `hero.css` **ou** l'inline, et fixer la taille à un seul endroit) |

### Récapitulatif des deux `!important` de compensation

- `!ml-0` — `navbar-11.tsx:171` (compense le conflit #2)
- `!pt-6` — `header-05.tsx:14` (compense le conflit #3)

Ces deux `!important` sont les seuls ajoutés pour contourner la cascade
`hero.css` ↔ Tailwind. Ils deviendront inutiles une fois `hero.css` passé en
`@layer components`.
