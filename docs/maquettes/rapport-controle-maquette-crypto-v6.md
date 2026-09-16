# Rapport de contrôle — maquette crypto-actifs, blockchain et Web3 (v6, charte v1.1 accessible)

Fichier : `maquette-crypto-actifs-blockchain-v6-charte-accessible.html` — 16 septembre 2026
Captures : dossier `captures-v6/` (pleine page à 1440, 1024, 768, 390 et 320 px)

## 0. Limites de ce contrôle

Seul le prompt final a été fourni. Trois sources qu'il cite étaient absentes :

- **`page-crypto-blockchain-web3-refonte-seo(1)(1).md`** : le fond des huit sections a été établi à partir du prompt et du texte validé de la V5 (smart contract, contentieux, ordonnance n° 2024-936, FAQ PSAN). Le texte doit être confronté à ce fichier avant intégration.
- **`Referentiel_UX_Web_Lazaregue(4).xlsx`** : sans le référentiel, les 168 critères et la liste officielle des 34 critères critiques ne sont pas connus. Le tableau du § 2 contrôle les exigences critiques explicitement formulées par le prompt. Il ne remplace pas le contrôle critère par critère, qui reste à faire avec le fichier.
- **`Charte_graphique_Lazaregue_Avocats_v1.1_accessible(2).docx`** : les tokens, typographies et règles de la charte v1.1 ont été repris du prompt, qui les cite littéralement, et des arbitrages déjà connus de la charte.

Le point 9 du livrable (`build`, `lint`, `typecheck`) est sans objet tant que la maquette n'est pas intégrée au dépôt.

## 1. Écarts corrigés par rapport à l'ancien brief et à la V5

| Défaut relevé | Correction |
|---|---|
| Architecture linéaire et uniforme | Huit thèmes rendus sous huit formes distinctes : grille 2 × 2 (structurer), familles (PSCA), niveaux empilés (contrats), bande sombre et tableau (technique), définitions et encadré (jetons), deux colonnes (LCB-FT), tableau de situations (contentieux), séquence (intervention). |
| Sommaire de type article | Liste numérotée légère sans carte. Sur mobile et tablette, elle est statique. Sur desktop (≥ 1024 px et ≥ 640 px de hauteur), elle devient latérale et collante, avec l'élément actif signalé par `aria-current`, un filet et la graisse. |
| Trois boutons d'aiguillage concurrents | Trois liens d'ancre explicites (`#structurer`, `#contrats`, `#contentieux`), aucun tunnel ni formulaire. |
| Listes PSCA trop denses | Quatre familles de trois ou quatre items chacune. |
| CTA non contextualisé | Destination `/contact/?objet=crypto-actifs`. Des liens de section transmettent en plus `situation=structuration`, `token-smart-contract` ou `contentieux-actifs`. |
| Livrables peu visibles | Micro-repères `Livrable associé` dans chaque section, puis une section autonome de six catégories, sans spécimen. |
| Risque de page générique | Le tableau de lecture technique relie chaque élément (transactions, accès, clés, code) à la question juridique à laquelle il répond. Le contentieux est présenté par faits, interlocuteur et voie d'action. |
| Mobile en simple empilement | Ordre : H1, promesse, CTA, puis repère daté, puis les trois situations. Les tableaux sont recomposés en fiches. « Points examinés » est replié sur mobile lorsque JavaScript est actif. La FAQ est repliée, sauf la première question. |
| Bebas Neue sur le H1 | H1 en Space Grotesk 500, 40 à 64 px. Bebas Neue est réservé au logo, au repère daté et aux numéros d'étape. |
| Couleurs non conformes | Seuls les dix tokens sont utilisés. Aucun `#8888A0`, vert, violet ni dégradé décoratif. |
| Animations ambitieuses | Aucune animation, aucun smooth scroll, aucun contenu masqué avant JavaScript. |
| JSON-LD redondant | Pas d'entité `LegalService` : la page renvoie à `https://lazaregue-avocats.fr/#organization`. Le JSON-LD contient `WebPage`, `BreadcrumbList` et `FAQPage`, et les six questions-réponses y sont générées depuis le texte visible. |
| Route et métadonnées | Route `/nos-domaines/crypto-actifs-blockchain`. Title, meta description et H1 sont repris du prompt. Le terme « agrément PSCA » n'apparaît qu'une fois. |
| Image Open Graph inexistante | Retirée ; `twitter:card` en `summary`. |

## 2. Exigences critiques contrôlées

Ces exigences sont celles que le prompt formule, et non la liste officielle des 34 critères du référentiel.

| Exigence | Statut | Preuve |
|---|---|---|
| Un seul H1, hiérarchie H2/H3 sans saut | Conforme | Contrôle automatisé : 1 H1, aucun saut de niveau. |
| `lang="fr"`, landmarks | Conforme | `header`, deux `nav` étiquetées, `main`, `footer`, `aside` pour le repère. |
| Lien d'évitement | Conforme | 1re tabulation ; Entrée place le focus sur `#contenu`. |
| Navigation clavier complète | Conforme | 60 arrêts de tabulation dans un ordre logique (§ 6). |
| Focus visible 3 px | Conforme | Tous les arrêts ont un contour de 3 px. Le contour est Electric Blue sur fond clair et Light Blue sur fond sombre (voir § 3). |
| Cibles 44 × 44 px | Conforme | Aucune cible interactive hors texte courant sous 44 px, de 320 à 1440 px. |
| Menu mobile : clavier, Échap, focus rendu | Conforme | Ouverture au clavier, focus sur le premier lien, Échap ferme et rend le focus au bouton. |
| Accordéons FAQ en `<button>` avec `aria-expanded` et `aria-controls` | Conforme | Entrée et Espace basculent l'état ; aucun `href="#"`. |
| Contenu sans JavaScript | Conforme | Sans JS : six réponses visibles, menu visible, « Points examinés » ouvert. |
| Aucun contenu dépendant du survol | Conforme | Le survol ne fait que souligner ou foncer. |
| Information non portée par la seule couleur | Conforme | Sommaire actif signalé par filet et graisse ; liens de corps soulignés. |
| Contrastes AA, 7:1 sur l'essentiel | Conforme, une réserve | Voir § 5 : les liens Electric Blue sont à 6,20:1, AA mais sous 7:1. |
| Zoom 200 % et reflow | Conforme | Aucun débordement à 640 × 450, 720 × 450 et 844 × 390 ; sommaire non collant dans ces cas. |
| Aucun défilement horizontal global | Conforme | Aucun débordement mesuré à 320, 360, 375, 390, 640, 768, 1024, 1280 et 1440 px. |
| Corps ≥ 16 px, labels ≥ 12 px | Conforme | Corps à 17 px ; aucun texte visible sous 12 px. |
| `prefers-reduced-motion` | Conforme | Règle présente ; aucune animation dans la page. |
| Images : alt utile ou vide | Conforme | Logo en `aria-hidden` dans un lien étiqueté ; pas d'image informative à ce stade. |
| Lisibilité en niveaux de gris | Conforme | Rendu vérifié en filtre gris. |
| Polices locales, sans Google Fonts | Conforme dans la maquette | WOFF2 embarqués, `font-display: swap`, aucun appel externe. |
| Aucun résultat, chiffre, dossier ou membre inventé | Conforme | Photos en emplacements signalés ; appui technique non nommé. |
| Lecteur d'écran (VoiceOver, NVDA) | Non testé | À faire sur le site intégré. |

## 3. Conformité à la charte v1.1

- **Palette** : seuls les dix tokens sont utilisés, plus des transparences du blanc, de l'Ink et du Light Blue pour les filets et la grille du hero. Periwinkle `#4D6FFF` n'apparaît pas.
- **Typographie** : Space Grotesk (400, 500, 600) pour les titres, le corps et l'interface, avec des boutons à 16 px / 600. DM Mono (400) est limité aux labels, repères et références, de 12 à 13 px. Bebas Neue sert au logo, à la date du repère et aux numéros d'étape.
- **Géométrie** : `border-radius: 0` partout, bordures de 1 px `#E0E0EE`, conteneur de 1200 px utiles, marges de 36 px sur desktop et 20 px sous 640 px. Les espacements suivent l'échelle 4, 8, 12, 16, 24, 36, 72 et 96, sauf le padding de bouton 13 × 24 px imposé par la charte.
- **Grille** : la page utilise deux colonnes 3/9 et 7/5 alignées sur 12 colonnes, mais sans système de grille à 12 colonnes explicite.
- **Écart assumé : couleur du focus sur fond sombre.** Electric Blue sur Navy ne donne que 3,02:1, à la limite du minimum. Sur les zones sombres, le contour passe donc en Light Blue `#9FB2FF` (9,18:1). C'est à trancher dans la charte.
- **Logo** : le composant réel est repris, avec trois polygones, la troisième barre en blanc sur fond sombre et le wordmark Bebas Neue où « AVOCATS » est en Electric Blue.

## 4. Captures

`captures-v6/capture-1440px.png`, `capture-1024px.png`, `capture-768px.png`, `capture-390px.png`, `capture-320px.png`

Les pleines pages mesurent environ 13 300 px de haut à 1440 px et 24 500 px à 320 px.

## 5. Contrastes (WCAG 2.x)

| Paire | Ratio |
|---|---|
| Ink sur blanc | 19,69:1 |
| Ink sur Off | 17,95:1 |
| Texte secondaire `#4A4A63` sur blanc | 8,57:1 |
| Texte secondaire sur Off | 7,81:1 |
| Lien Electric Blue sur blanc | 6,20:1 (AA) |
| Lien Electric Blue sur Off | 5,65:1 (AA) |
| Lien au survol, Deep Blue sur blanc | 9,48:1 |
| Bouton : blanc sur Electric Blue | 6,20:1 (AA) |
| Bouton au survol : blanc sur Deep Blue | 9,48:1 |
| Blanc sur Navy | 18,74:1 |
| Light Blue sur Navy | 9,18:1 |
| Light Blue sur Ink | 9,65:1 |
| Blanc sur Ink | 19,69:1 |
| Blanc sur fond du repère | 19,14:1 |
| Light Blue sur fond du repère | 9,38:1 |
| Focus Electric Blue sur blanc | 6,20:1 |
| Focus Light Blue sur Navy | 9,18:1 |
| Focus Electric Blue sur Navy (non retenu) | 3,02:1 |
| Bordure des emplacements photo sur Off | 7,81:1 |

**Réserve** : Electric Blue n'atteint pas 7:1 sur fond clair. La couleur est imposée par la charte pour les liens et le bouton primaire, et elle reste conforme AA.

## 6. Parcours clavier (desktop 1440 px)

- 1 : Aller au contenu
- 2 : logo
- 3 à 7 : Domaines, Actions collectives, Ressources, Le cabinet, Contact
- 8 et 9 : fil d'Ariane (Accueil, Nos domaines)
- 10 : CTA du hero
- 11 à 13 : trois liens de situation
- 14 à 21 : huit entrées du sommaire
- 22 : « Points examinés »
- 23 à 29 : liens de section (quatre « Exposer ce projet », « protection des données », renvoi fraude bancaire, « Exposer ce litige »)
- 30 à 35 : six boutons FAQ
- 36 à 39 : quatre sujets liés
- 40 et 41 : CTA du contact et téléphone
- 42 à 60 : pied de page, jusqu'à « Politique de confidentialité »

Aucun piège de focus. Sur mobile, Échap ferme le menu et rend le focus au bouton.

## 7. Liens et ancres

**Ancres** (toutes résolues, aucun identifiant dupliqué, aucun `href="#"`) : `#contenu`, `#structurer`, `#psca`, `#contrats`, `#technique`, `#jetons`, `#lcb-ft`, `#contentieux`, `#intervention`.

**Liens internes du contenu**

- `/contact/?objet=crypto-actifs`, ainsi que `&situation=structuration`, `&situation=token-smart-contract` et `&situation=contentieux-actifs`
- `/nos-domaines/rgpd`
- `/nos-domaines/escroquerie-fraude-bancaire`
- `/nos-domaines/contrats-informatiques`
- `/nos-domaines/contentieux-informatique-et-commercial`
- `/nos-domaines/ma-tech`

**Liens du header et du footer de démonstration** : `/`, `/nos-domaines`, `/actions-collectives`, `/ressources`, `/cabinet`, `/contact`, `/nos-domaines/intelligence-artificielle`, `/nos-domaines/cybersecurite`, `/nos-domaines/cybercriminalite`, `/nos-domaines/diffamation-retrait-de-contenus`, `/nos-domaines/crypto-actifs-blockchain`, `/mentions-legales`, `/politique-de-confidentialite`.

Toutes ces routes sont à vérifier dans le dépôt, et notamment trois points :

- la barre oblique finale, que la maquette omet pour suivre la route donnée par le prompt, alors que la maquette du pied de page l'utilisait ;
- l'existence effective de `/nos-domaines/contentieux-informatique-et-commercial` ;
- la prise en charge des paramètres `objet` et `situation` par la page contact.

## 8. Éléments à valider par le cabinet

1. **Relecture juridique** : repère du 1er juillet 2026, les six réponses FAQ et les mentions du règlement (UE) 2023/1113, de l'ordonnance n° 2024-936 et des articles L. 111-3 et L. 131-3 du CPI.
2. **Fond éditorial** : confrontation avec le fichier SEO absent. Le texte des huit sections a été rédigé pour cette maquette à partir du prompt et de la V5.
3. **Appui technique** : nom de l'intervenant à afficher. Khalid Sookia figurait dans la V5 ; il n'est pas repris faute de validation.
4. **Portraits** réels de Me Lazarègue et de Me Ben Majed.
5. **FAQPage** : maintien selon la stratégie globale. Google a cessé les résultats enrichis FAQ, le balisage n'apporte donc aucun affichage enrichi.
6. **Identifiant global** de l'entité cabinet (`/#organization`) et du site (`/#website`).
7. **Page contact** : reprise de l'objet et de la situation, et exclusion de l'analytics pour le contenu libre, les pièces, les adresses de portefeuille et les montants.
8. **Focus sur fond sombre** : arbitrage à inscrire dans la charte (§ 3).
9. **Extraits anonymisés de livrables** : une zone est réservée en commentaire HTML, sans affichage.
10. **Contrôle critère par critère** des 168 critères, dont les 34 critiques, avec le référentiel.
