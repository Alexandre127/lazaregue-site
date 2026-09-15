# Points de recette à vérifier au lot 9

Reports explicites depuis les lots précédents, à contrôler lors de la recette
technique/visuelle/accessible du lot 9.

## 1. `SpotlightTitle` (section « Pourquoi nous » / différenciateurs)

Motif actuel à consolider **au lot 7**, puis à vérifier ici :

- la bascule entre deux `<h2>` se fait en JavaScript sur un état `isMobile` ;
- la version desktop **duplique le texte du titre en interne** (couche
  `aria-hidden` + couche révélée) pour l'animation « spotlight ».

Cela cumule trois risques : écart entre rendu serveur et rendu client, décalage
de mise en page, et texte présent **deux fois** dans le DOM.

**À vérifier au lot 9 (après refonte lot 7) :** un seul contenu sémantique dans
le HTML, présenté différemment selon la largeur (pas deux titres ni texte
dupliqué, qu'ils soient masqués en CSS ou choisis en JS) ; aucun écart
SSR/client ; aucun décalage de mise en page au montage.

## 2. `prefers-reduced-motion` — vérification visuelle

Implémenté au lot 3, mais non émulable dans le navigateur de la session.
**À capturer au lot 9, desktop et mobile, la préférence activée :**

- mot tournant **figé sur le premier état** (« droit du numérique ») ;
- globe desktop **immobile** (aucune rotation caméra ni maillage) ;
- halo mobile **sans dérive** (animation `lazHeroHaloDrift` neutralisée).

## 3. Composition du premier écran (mot tournant) — pour mémoire

Mesuré au lot 3 : la ligne réservée supplémentaire (états ~1024–1600 px) laisse
le bouton « Exposer votre situation à un avocat » **au-dessus de la ligne de
flottaison** dans les neuf cas (largeurs 1280/1440/1920 × hauteurs 700/800/900),
marge minimale +92 px. Décision : on ne touche à rien. À re-contrôler si la
répartition copie/globe ou le corps du H1 changeait.

---

## Résultats de recette (exécution autonome)

Mesures faites sur la préproduction locale (`next start`, build de production).

### Largeurs (débordement horizontal)
Aucun débordement horizontal de page à 320 / 375 / 390 / 430 / 768 / 900 / 901 /
1024 / 1440 px (vérifié par section au fil des lots, et sur la page entière à
320/768/1440). Les seuls `scrollWidth > clientWidth` internes sont décoratifs et
maîtrisés : la barre de matières du hero (`overflow-x:auto` voulu) et les halos
en dégradé (clippés par `overflow:hidden`) — jamais de scroll horizontal visible.

### Clavier
Ordre de tabulation = ordre DOM = ordre visuel. Anneaux de focus visibles sur
les éléments interactifs (CTA hero, cartes de domaine, liens presse, liens
footer). Zéro élément focalisable dans les cartes de cas et dans l'aperçu portail
(décoratif, aria-hidden). Une seule tabulation par carte de domaine (9 ; la 10e,
Contentieux, sautée). Équipe : une seule tabulation (lien « Rencontrer l'équipe »).

### Contrastes (AA, mesurés)
- Cas : intitulés de champ 6,2–6,5:1 ; descriptions 9,4:1 ; titre sur bandeau 16:1.
- Domaines : descriptions 9,4:1 ; titres 18,7:1.
- Halo mobile : H1 blanc 19,7:1 là où le halo l'effleure ; ligne bleue du H1
  3,25:1 sur encre (grand texte, AA ≥3:1, marge nulle — consigné lot technique §4).

### CLS / performance
- CLS ≈ **0** (aucun décalage de mise en page cumulé) en local. DOMContentLoaded
  ~263 ms, load ~271 ms.
- **LCP et INP** non capturés de façon fiable par l'outil ici, et doivent de
  toute façon être mesurés sur la **préproduction Vercel** (consigne). Réserve :
  le mot tournant réserve la hauteur de l'état le plus long (aucun décalage
  attendu) ; l'import dynamique du globe évite ~135 Ko gzip au first-load mobile.

### `prefers-reduced-motion`
Chemins vérifiés dans le code (émulation de la préférence non disponible dans le
navigateur de la session — capture visuelle à faire sur un poste où elle est
activée) :
- mot tournant figé sur le premier état (garde `matchMedia`, aucun intervalle) ;
- globe figé (`staticFrame`) ; halo sans dérive (`@media prefers-reduced-motion`
  → `animation: none`) ; aperçu portail figé (retour anticipé) ;
- cartes de cas et d'équipe entièrement statiques (aucune animation, aucun flip).

### Impression
Cartes de cas : `break-inside/page-break-inside: avoid` + `print-color-adjust:
exact` (vérifié présent). Sans retournement, impression dans le bon sens.
Rendu PDF visuel desktop/mobile : à confirmer sur un poste (impression réelle).

### Zoom 200 %
Non testable en zoom de page par l'outil ; le reflow à ~640 px (équivalent 1280 @
200 %) est couvert par les largeurs 430/768 sans débordement. À confirmer
visuellement.
