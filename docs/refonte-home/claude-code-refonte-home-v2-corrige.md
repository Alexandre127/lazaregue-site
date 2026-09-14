# Refonte de la page d’accueil — consignes définitives d’implémentation

Document destiné à Claude Code. À placer dans `docs/refonte-home/` avec :

- `fiche-v3.docx` : source de vérité pour le contenu, les textes et les règles ;
- `maquette-home.html` : source de vérité pour la composition, l’ordre et le responsive ;
- le présent document : méthode d’exécution, périmètre et recette.

En cas de divergence, la fiche l’emporte sur la maquette. Signaler toute divergence avant de coder ; ne pas arbitrer silencieusement.

---

## 1. Message d’ouverture à envoyer à Claude Code

> Lis intégralement `docs/refonte-home/fiche-v3.docx`, `docs/refonte-home/maquette-home.html` et `docs/refonte-home/claude-code-refonte-home-v2-corrige.md`.
>
> Avant toute écriture, inspecte le dépôt et produis l’inventaire des composants, routes, styles, médias et données structurées concernés. Pour chaque composant, indique : fichier, rôle, propre à la home ou partagé, pages potentiellement affectées, et décision proposée — conserver, modifier, supprimer ou créer.
>
> Vérifie également `git status`, la branche courante, les scripts disponibles dans `package.json`, la stratégie actuelle de `noindex`, les routes réelles, le sitemap et les redirections existantes. Ne modifie rien avant ma validation de cet inventaire.
>
> Ensuite, exécute les lots dans l’ordre ci-dessous. Un lot = un commit isolé = un point d’arrêt. À la fin de chaque lot, arrête-toi et attends mon accord.

Le premier tour est exclusivement une lecture et un diagnostic.

---

## 2. Règles permanentes

### Préserver l’existant

- Ne pas changer de framework.
- Ne pas créer de seconde home parallèle.
- Ne pas dupliquer un composant existant pouvant être adapté proprement.
- Ne pas écraser les modifications déjà présentes dans le dépôt.
- Ne modifier aucun composant partagé sans avoir recensé les pages affectées.
- La maquette est une référence visuelle et fonctionnelle ; ne pas copier aveuglément son code.

### Ne rien inventer

- Aucun cas, résultat, chiffre, avis, témoignage, distinction, logo client ou personne fictive.
- Réutiliser uniquement les images validées.
- À défaut d’un média réel, conserver un emplacement uniquement en préproduction et le signaler ; aucun placeholder ne doit être publié.

### Presse

Les URL de l’article du Monde et de l’interview de Capital ne sont pas encore fournies. Tant qu’elles manquent :

- afficher la référence seulement si son titre et son attribution sont vérifiés ;
- la rendre strictement non interactive : aucun `<a>`, `href`, rôle de lien, chevron ou curseur de clic ;
- conserver un commentaire `TODO` interne précis ;
- ne jamais utiliser `href="#"`, une URL générique ou une URL devinée.

### Contenu et accessibilité

- Tout contenu essentiel existe dans le DOM initial et reste compréhensible sans JavaScript.
- Rien d’essentiel ne dépend d’un survol, retournement ou mouvement.
- Utiliser en priorité les éléments natifs `a`, `button`, `nav`, `header`, `main`, `section` et `footer`.
- Navigation clavier complète et focus toujours visible.
- Respecter WCAG 2.2 AA : contraste minimal de 4,5:1 pour le texte courant et 3:1 pour les grands textes et composants concernés.
- Les cibles tactiles respectent au moins 24 × 24 px CSS avec espacement conforme ; viser environ 44 × 44 px pour les actions principales.
- Respecter `prefers-reduced-motion`.
- Aucun débordement ni contenu inaccessible à 200 % de zoom.

### Périmètre

La home est la seule page de contenu à modifier. Les seules interventions transversales autorisées sont celles nécessaires à la navigation, au footer, au sitemap, aux données structurées et à la redirection M&A Tech expressément prévues. Le formulaire `/contact` reste hors périmètre.

---

## 3. Taxonomie et liens obligatoires

Ne modifier aucune URL déjà correcte. Utiliser exactement cette répartition sur la home, le menu desktop et le menu mobile.

### Conformité et gouvernance — 3 cartes

1. **RGPD et données personnelles**  
   `/nos-domaines/rgpd-donnees-personnelles/`
2. **Intelligence artificielle et AI Act**  
   `/nos-domaines/intelligence-artificielle/`
3. **Cybersécurité et NIS 2**  
   `/nos-domaines/cybersecurite/`

### Contrats et opérations numériques — 3 cartes

4. **Contrats informatiques**  
   `/nos-domaines/contrats-informatiques/`
5. **M&A Tech et due diligence**  
   `/nos-domaines/ma-tech/`
6. **Crypto-actifs et blockchain**  
   `/nos-domaines/crypto-actifs-blockchain/`

### Contentieux et atteintes numériques — 4 cartes

7. **Contentieux informatique et commercial**  
   `/nos-domaines/contentieux-informatique/`
8. **Cybercriminalité et atteintes aux systèmes**  
   `/nos-domaines/cybercriminalite/`
9. **Escroquerie et fraude bancaire**  
   `/nos-domaines/escroquerie-fraude-bancaire/`
10. **Diffamation et retrait de contenus**  
    `/nos-domaines/diffamation-retrait-contenus/`

**[Corrigé le 14/09/2026 selon les arbitrages — voir `reponse-inventaire-arbitrages.md`.]** Le site étant entièrement en préproduction (`noindex`), il n'y a ni référencement ni trafic à préserver : **les cinq routes divergentes sont renommées** pour appliquer exactement la taxonomie de la section 3 (RGPD → `rgpd-donnees-personnelles`, IA → `intelligence-artificielle`, M&A → `ma-tech` sous `/nos-domaines/`, escroquerie → `escroquerie-fraude-bancaire`, diffamation → `diffamation-retrait-contenus`). Un 301 est posé depuis chacune des cinq anciennes adresses ; aucune page de compétence ne subsiste sous `/competences/`. Avant tout renommage, recenser l'ensemble des références (liens internes de toutes les pages, menus desktop et mobile, pied de page, canoniques, métadonnées, JSON-LD, sitemap, redirections existantes) et le présenter. Les deux redirections existantes (`/avocat-escroquerie-fraude`, `/competences/plateformes`) doivent viser directement la nouvelle URL — aucune redirection n'en appelle une autre.

---

## 4. Lots d’implémentation

### Lot 1 — Branche et état initial

Créer une branche dédiée. Ne modifier aucun fichier fonctionnel.

**Fin de lot :** branche créée, `git status` documenté, site lancé à l’identique, commandes disponibles recensées.

### Lot 2 — Structure HTML, liens et route M&A Tech

- Un seul H1.
- Un H2 par section principale ; H3 uniquement pour les sous-parties appropriées.
- Le sous-titre du hero redevient un paragraphe s’il est actuellement un H2.
- Corriger uniquement la route M&A Tech et sa redirection permanente.
- Supprimer le lien et l’icône X.
- LinkedIn pointe vers `https://www.linkedin.com/in/alexandre-lazarègue/` après vérification que cette URL est bien celle validée et qu’elle résout correctement.
- Aucun `href` vide ou égal à `#`.
- Ne modifier aucun composant partagé sans signaler les pages affectées.

**Fin de lot :** hiérarchie de titres valide, route et redirection testées, aucun lien cassé, impacts transversaux listés.

### Lot 3 — Hero et mot tournant

- Conserver l’identité, le badge, le globe, le bouton et la force typographique.
- Utiliser les sept états exacts de la fiche, chacun formant une phrase complète en « droit de… ».
- Un état réel est présent dans le DOM initial ; aucun H1 vide ou construit seulement après JavaScript.
- Réserver la largeur nécessaire au terme le plus long.
- Intitulé accessible stable ; ne pas annoncer chaque rotation au lecteur d’écran.
- Aucun déplacement vertical du CTA.
- Avec `prefers-reduced-motion`, afficher un terme fixe.
- Sur mobile, intégrer le globe au hero, recadré sur le bord droit et protégé par un dégradé.
- La représentation filaire, les continents schématiques et le repère textuel « Europe » éventuellement utilisés dans la maquette sont uniquement des indications de cadrage. Ils ne doivent jamais être intégrés au rendu de production.
- Réutiliser obligatoirement le composant réel du globe déjà présent sur le site. Ne pas créer un second globe mobile et ne pas le remplacer par le globe filaire de la maquette.
- Avant toute modification, inspecter le composant réel afin d’identifier la bibliothèque utilisée, son système d’axes, son orientation initiale, sa caméra, sa boucle d’animation et ses gestionnaires de pointeur ou de geste.
- Sur mobile uniquement, orienter la vue réelle vers l’Europe à partir d’un point géographique indicatif situé autour de **50° N / 10° E**. Convertir ces coordonnées dans le repère propre au composant existant : ne pas supposer les axes et ne pas appliquer aveuglément une formule générique.
- Ajuster légèrement l’orientation si la texture ou le modèle présente un décalage, afin que l’Europe occidentale et centrale soient reconnaissables et que la France se trouve approximativement au centre de la partie utile du globe.
- Une fois le cadrage obtenu, immobiliser complètement la version mobile : aucune rotation automatique, inertie, interaction tactile, modification de caméra, parallaxe, zoom ou suivi du doigt.
- Retirer ou désactiver les écouteurs de pointeur et de geste susceptibles d’intercepter le défilement vertical. Utiliser notamment `pointer-events: none` si cela correspond à l’architecture existante, sans s’en contenter si une boucle d’animation continue inutilement en arrière-plan.
- Si l’immobilisation permet de supprimer proprement la boucle de rendu permanente sur mobile, le faire afin d’éviter un coût CPU/GPU inutile. Ne pas altérer pour autant le comportement desktop.
- Aucun libellé « Europe », repère, marqueur ou annotation géographique ne doit être visible en production.
- Le globe est décoratif pour les technologies d’assistance s’il n’apporte aucune information utile.
- Le comportement desktop actuellement validé reste inchangé. Ne pas modifier le composant desktop pour résoudre le cas mobile.
- Si le composant existant ne permet pas d’obtenir ce résultat proprement, s’arrêter et expliquer la contrainte avant de proposer une image statique ou un composant alternatif.

**Fin de lot :** fournir des captures à 320, 390 et 430 px montrant clairement le continent réellement affiché. Vérifier visuellement le cadrage européen avant validation ; aucun texte tronqué, recouvrement, décalage du CTA ou blocage du défilement. Dans le compte rendu, indiquer les paramètres ou rotations finalement utilisés et confirmer que le desktop est inchangé.

### Lot 4 — Dix domaines et grille 3 / 3 / 4

- Remplacer l’ancienne carte combinée par « Contrats informatiques » et « Contentieux informatique et commercial ».
- Utiliser exactement les dix intitulés, familles et URL de la section 3.
- Toutes les cartes restent visibles et cliquables.
- Lien natif couvrant la carte entière, focus distinct du hover.
- Texte utile d’au moins 14 px et contraste conforme.
- Desktop : familles successives en 3, 3 et 4 cartes ; passer à deux colonnes lorsque le contenu l’exige.
- Mobile : titre de famille puis cartes en une colonne, sans accordéon.
- Ne jamais réduire artificiellement les textes pour préserver une hauteur identique.

**Fin de lot :** dix cartes, aucune carte orpheline, aucun texte tassé, ordre et liens conformes sur desktop et mobile.

### Lot 5 — Suppression du bloc statistique

Supprimer complètement le bloc « +73 % » / « 6 167 », son code, ses styles devenus inutiles et l’espace résiduel. Ne rien ajouter pour le remplacer.

**Fin de lot :** absence totale du bloc dans le DOM et le rendu ; aucune animation compensatoire.

### Lot 6 — Cas pratiques

- Déplacer la section immédiatement après « Pourquoi nous ».
- Conserver seulement le titre « Le droit du numérique en action ».
- Ne rien écrire sur le caractère réel, les noms ou l’anonymisation des dossiers.
- Supprimer perspective, `rotateY`, retournement, rôle bouton, `tabindex` artificiel et instructions associées.
- Afficher directement pour chaque carte : titre, Situation, Ce que nous avons fait, Issue.
- Utiliser exactement les trois issues de la fiche.
- Aucun faux lien vers une étude complète inexistante.
- Hauteur libre ; texte non tronqué ; couleurs toujours accompagnées de libellés.
- Impression et PDF dans le bon sens.

**Fin de lot :** tout le contenu est visible, lisible, imprimable et identique dans sa structure sur les trois cartes.

### Lot 7A — Pourquoi nous et portail client

- Conserver exactement trois cartes illustrées et les textes de la fiche.
- Supprimer entièrement la petite carte « Un portail client », y compris trait, titre, texte et espace.
- Réutiliser les illustrations existantes ; hauteur approximative 115–130 px, cadrage `cover`.
- Conserver ensuite le grand bloc portail, son texte définitif et l’aperçu réel de l’interface.
- Rendre « Le droit du numérique, notre seul métier » lisible dès le rendu initial et à l’impression.

**Fin de lot :** trois cartes seulement, aucun résidu de la quatrième et grand portail complet.

### Lot 7B — Équipe

- Trois avocats sur la première rangée, deux experts centrés sur la seconde.
- Conserver les cinq personnes et les qualités exactes de la fiche.
- Amir Ben Majed : « Contrats IT et contentieux informatique » ; barreau d’Évry.
- Aucun badge « membre », « hors cabinet » ou « indépendant ».
- Ratio, cadrage, largeur et traitement colorimétrique communs.
- Réduire les portraits surdimensionnés de la maquette selon les bornes de la fiche.
- Ne générer aucune personne ni photo.

**Fin de lot :** cinq profils exacts, rôles lisibles, grille cohérente et aucune fausse appartenance.

### Lot 7C — Presse, CTA final et footer

- Conserver l’accroche : « Parce que le droit du numérique se construit aussi dans l’espace public, nous contribuons aux débats. »
- Quatre références numériques : Le Monde, Capital, Sud Ouest et Le Revenu.
- Supprimer la canicule, le livre et les numéros décoratifs.
- Appliquer les règles de non-interactivité lorsque l’URL manque.
- Conserver l’appel final « Votre problème numérique a une solution. »
- Uniformiser le CTA du hero et le CTA final selon le libellé arrêté dans la fiche.
- Vérifier téléphone, email et « 18 rue de Tilsitt ».
- La barre mobile Écrire/Téléphone respecte les zones sûres iOS et ne masque aucun contenu.

**Fin de lot :** quatre références exactes, CTA cohérents et footer accessible sans lien factice.

### Lot 8 — Navigation, sitemap et données structurées

- Reporter les trois intitulés de familles à l’identique dans home, menu desktop et menu mobile.
- Mettre à jour footer, liens internes, sitemap et redirection M&A Tech.
- Inclure exactement les dix URL finales de la section 3 dans le sitemap si les pages existent et sont publiables.
- Exclure l’ancienne URL M&A après mise en place de la redirection.
- Inspecter le JSON-LD global avant toute modification.
- Éviter tout doublon ou contradiction entre `Organization`, `LegalService`, `Person`, adresse, fonctions et URL.
- Ne pas inventer d’avis, résultat, récompense ou profil.
- Fournir le JSON-LD final dans le compte rendu.

**Fin de lot :** navigation et sitemap conformes, anciennes références M&A supprimées, données structurées validées.

### Lot 9 — Recette technique, visuelle et accessible

1. Exécuter les commandes existantes de build, lint et tests. Ne pas installer une nouvelle infrastructure sans nécessité.
2. Vérifier les erreurs console, erreurs d’hydratation, liens internes et redirections.
3. Produire des captures comparables à 320, 390, 768, 1024 et 1440 px.
4. Tester le terme le plus long du hero.
5. Tester clavier : Tab, Maj+Tab, Entrée, Espace et Échap.
6. Tester focus, contrastes, zoom 200 %, impression PDF et `prefers-reduced-motion`.
7. Vérifier l’ordre du DOM et le contenu essentiel sans JavaScript.
8. Vérifier les zones sûres mobiles et l’absence de contenu masqué.
9. Mesurer LCP, INP et CLS en laboratoire sur préproduction, mobile et desktop ; présenter les valeurs et la comparaison avec l’état initial sans prétendre disposer de données terrain.
10. Vérifier que le globe ne provoque aucun déplacement de mise en page et ne monopolise pas le chargement mobile.

**Fin de lot :** rapport point par point, captures avant/après et liste de toute différence non demandée. Aucune publication.

### Lot 10 — Préproduction et vérification finale

**[Corrigé le 14/09/2026 selon les arbitrages — voir `reponse-inventaire-arbitrages.md`.]** Le site entier est en préproduction : **le retrait des directives `noindex` ne relève pas de ce chantier** et dépendra d'une mise en ligne décidée séparément. **Ne toucher à aucune directive d'indexation, dans aucun lot.**

- Faire valider la préproduction.
- Vérifier la canonique exacte de la home, le sitemap et les redirections.
- Ne toucher à aucune directive d'indexation ni à aucune protection de préproduction.

**Fin de lot :** préproduction validée ; canonique, sitemap et redirections vérifiés ; indexation inchangée.

---

## 5. Ce que Claude Code ne doit pas faire

- Changer de framework ou créer une home parallèle.
- Migrer d'autres routes que celles arrêtées. **[Corrigé le 14/09/2026 :** le renommage des cinq routes de la section 3 — RGPD, IA, M&A, escroquerie, diffamation — **est expressément autorisé** ; toute autre migration reste interdite sans instruction.**]**
- Copier directement le code de la maquette.
- Toucher silencieusement à un composant partagé.
- Ajouter des animations décoratives.
- Réduire les textes pour les faire tenir artificiellement.
- Inventer un lien, un résultat, un contenu ou une personne.
- Publier un placeholder.
- Retirer globalement les protections `noindex` des previews Vercel.
- Ajouter une dépendance sans expliquer sa nécessité.
- Commencer un lot sans validation du précédent.

---

## 6. Compte rendu obligatoire à chaque fin de lot

Fournir uniquement :

1. fichiers modifiés et changement réalisé dans chacun ;
2. tests et commandes exécutés, avec leur résultat ;
3. points non appliqués ou divergences constatées, avec la raison ;
4. vérifications visuelles à effectuer avant le lot suivant ;
5. effets possibles sur les composants ou pages partagés.

S’il ne peut pas appliquer une prescription, Claude Code s’arrête, explique le blocage et n’invente pas de solution de remplacement.

---

## 7. Résultat attendu

La home conserve son identité et son code existant chaque fois qu’ils sont satisfaisants. Elle gagne une hiérarchie HTML correcte, dix domaines organisés sans être masqués, des preuves remontées, des cas entièrement lisibles, un portail client clairement mis en valeur, une équipe mieux cadrée et une navigation cohérente. La publication n’intervient qu’après validation visuelle, technique, responsive, accessible et SEO.
