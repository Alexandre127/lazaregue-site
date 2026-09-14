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
