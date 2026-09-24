# CHARTE GRAPHIQUE & DESIGN SYSTEM ACCESSIBLE

Cabinet IT & Innovation · Droit du numérique

Ce document définit l'identité visuelle et les règles d'expérience du cabinet Lazarègue Avocats. Il s'adresse aux designers, développeurs, intégrateurs et prestataires chargés du site, des outils et des supports numériques. Les règles d'accessibilité et d'usage priment sur tout effet décoratif.

| | |
|---|---|
| VERSION | 1.1 — Révision UX & accessibilité |
| DATE | Septembre 2026 |
| USAGE | Web, Mobile, Print, Motion accessible |
| STACK CIBLE | Design system indépendant du framework |
| CONTACT DESIGN | alexandre.lazaregue@lazaregue-avocats.fr |

> Transcription Markdown fidèle du fichier source `Charte_graphique_Lazaregue_Avocats_v1.1_accessible.docx` (même dossier). En cas de doute, le `.docx` fait foi. Aucune reformulation, aucun résumé.

---

## 01 · POSITIONNEMENT & ADN DE MARQUE

### ADN

Lazarègue Avocats est un cabinet de droit du numérique positionné pour les ETI technologiques. Sa différence : parler le langage du code autant que celui du droit. Ni startup, ni cabinet traditionnel — une entité hybride qui pense comme un CTO et défend comme un avocat.

**Territoire de marque**

Institutionnel mais pas figé. Sérieux sans être solennel. Tech sans être startup.

**Ce que le design doit communiquer**

- Confiance au premier regard — le bleu électrique hérite de la légitimité institutionnelle du Pantone Reflex Blue de la charte originale, poussé à sa vibrance maximale pour l'écran.
- Maîtrise technique — DM Mono comme police de métadonnées signale immédiatement 'on comprend votre monde' sans le dire.
- Précision chirurgicale — pas de décoration superflue. Chaque élément de l'interface a une fonction.
- Modernité assumée — Space Grotesk remplace Montserrat. Même famille géométrique, mais avec des détails techniques dans les formes de lettres (g, a, r) qui évoquent subtilement le code.

**Cibles**

- DSI et CTO d'ETI tech (150–2000 salariés)
- DG et fondateurs de scale-ups en croissance
- DAF impliqués dans des opérations M&A tech
- Responsables juridiques de groupes industriels numérisés

---

## 02 · PALETTE DE COULEURS

### COULEURS

La palette repose sur un axe principal : Electric Blue (#1A47FF) sur Navy (#0A0F2E). Le bleu reste la seule famille d'accent de marque. Les autres bleus sont des variations fonctionnelles, jamais des accents concurrents. Chaque combinaison texte/fond doit respecter au minimum WCAG AA.

**Couleur principale : Electric Blue**

#1A47FF · RGB(26, 71, 255) · Pantone Reflex Blue C poussé à saturation maximale

C'est le Pantone Reflex Blue (#2E3191) de la charte originale repensé pour l'écran rétina. Le Reflex Blue classique vit sur du papier — sur écran, il paraît lourd et daté. #1A47FF garde toute la légitimité institutionnelle du bleu tout en affichant une vibrance qui dit 'natif digital'.

**Tableau de palette complet**

| Aperçu | NOM / HEX | RÔLE | USAGE |
|---|---|---|---|
| | Electric Blue / #1A47FF | Accent principal | CTA, liens, focus, icônes clés. Texte blanc uniquement en grand ou gras vérifié. |
| | Periwinkle / #4D6FFF | Variation tonale | Surfaces, graphiques et grands éléments. Pas de petit texte sur fond clair ou Navy. |
| | Deep Blue / #0A2ACC | État actif | Pressed, sélection, bordures renforcées. Vérifier le contraste du texte. |
| | Deep Navy / #0A0F2E | Fond sombre principal | Hero, footer, navigation sombre. Texte blanc ou Light Blue accessible. |
| | Ink / #0A0A14 | Texte et fond sombre | Texte principal sur fond clair, contact, manifeste. |
| | Ghost White / #F4F4F8 | Surface claire | Fond alterné, cartes, regroupements de contenu. |
| | Pure White / #FFFFFF | Fond principal | Pages, cartes, espaces de respiration. |
| | Accessible Muted / #4A4A63 | Texte secondaire clair | Descriptions, légendes, métadonnées sur blanc ou Ghost White. |
| | Muted / #8888A0 | Neutre décoratif | Éléments non textuels ou texte sur Navy. Interdit pour petit texte sur fond clair. |
| | Light Blue / #9FB2FF | Texte secondaire sombre | Liens secondaires, labels et métadonnées sur Navy ou Ink. |
| | Border / #E0E0EE | Séparateur | Bordures et grilles. Ne porte jamais seul une information. |

**Règles d'utilisation**

- Le bleu #1A47FF est l'accent principal. Periwinkle et Deep Blue sont ses variations, pas des accents concurrents. Les couleurs de statut sont réservées aux messages fonctionnels et toujours accompagnées d'un libellé ou d'une icône.
- Sur fond Navy ou Ink : grande barre = bleu électrique, petite barre = blanc à 55% d'opacité.
- Sur fond blanc : grande barre = bleu électrique, petite barre = Ink (#0A0A14).
- Sur fond Electric Blue : toutes les barres = blanc (plein ou semi-transparent).
- Ne jamais utiliser le vert pomme (#C8F53A), le violet ou une couleur décorative concurrente. Contraste minimal : 4,5:1 pour le texte courant, 3:1 pour le grand texte et les composants. Viser 7:1 pour les contenus essentiels.

**Jetons de statut**

| Aperçu | NOM / HEX | RÔLE | USAGE |
|---|---|---|---|
| | Statut urgence / #B3231F | Message fonctionnel d'urgence | Filet et libellé des situations à délai contraint (violation de données, contrôle CNIL). **Toujours accompagné d'un libellé** (« 72 heures », « Procédure en cours »), jamais porteur seul de l'information. Sur blanc : ≈ 6,6:1 (AA). Jeton `--urgence`. |

Les jetons de statut ne sont pas des accents de marque : ils ne concurrencent pas l'Electric Blue et ne servent qu'aux messages fonctionnels. Aucun autre rouge ni vert n'est introduit dans la palette.

---

## 03 · TYPOGRAPHIE

### TYPO

Trois polices, trois rôles distincts, une hiérarchie claire. Le système est conçu pour une seule règle : chaque police a son territoire et n'empiète jamais sur celui des autres.

**Tableau du système typographique**

| POLICE | RÔLE | TAILLE | USAGE | NOTE |
|---|---|---|---|---|
| Bebas Neue | Display / Logo | H1 court : 48–88px | Hero, logo, grands chiffres | Majuscules. Réserver aux titres courts, jamais aux paragraphes. |
| Space Grotesk | Titres / Corps / UI | H2 : 28–44px / H3 : 18–24px / Corps : 16–18px | Titres, corps, boutons, formulaires | Poids 400 à 600. Corps par défaut : 17px. |
| DM Mono | Labels / Métadonnées | 12–14px | Labels courts, dates, références, code | Jamais sous 12px si l'information est utile. |

**Specimens typographiques**

- LAZARÈGUE AVOCATS — ↑ Bebas Neue — H1 héro, logo, compteurs chiffrés
- Le droit au rythme du code — ↑ Space Grotesk Light 300 — Sous-titres héro, italique éditoriale
- Propriété intellectuelle & logiciel — ↑ Space Grotesk Medium 500 — H2 sections, titres cartes
- RGPD · AI ACT · M&A TECH · IP SOFTWARE · 48H · Paris · 2026 — ↑ DM Mono — Navigation, labels, badges, dates, URLs, métadonnées
- Nous accompagnons les ETI technologiques dans leurs enjeux juridiques les plus complexes. Pas de jargon opaque. Des stratégies qui tiennent à l'épreuve du réel. — ↑ Space Grotesk Regular 400 — Corps de texte, descriptions, excerpts

**Règles typographiques**

- Bebas Neue : H1 courts, logo et grands chiffres. Si le titre dépasse deux lignes ou porte une nuance juridique, employer Space Grotesk pour préserver la lecture.
- Space Grotesk : H2 en 500 (medium), H3 en 500, corps en 400 (regular), sous-titres héro en 300 (light) italique.
- DM Mono : labels courts, dates, références et métadonnées. La navigation et les CTA principaux restent en Space Grotesk pour une lecture immédiate. Les abréviations usuelles peuvent rester en capitales.
- Letter-spacing DM Mono : 0.04em à 0.10em pour une information à lire ; 0.14em à 0.18em seulement pour un label très court. Ne jamais compenser une petite taille par un espacement excessif.
- Interlignage : 1.60–1.70 pour les pages commerciales, 1.70–1.80 pour les articles longs, 1.40–1.55 dans les cartes. Titres Bebas : 0.92–1.00. Largeur de lecture : 64–72 caractères par ligne.
- Ne jamais utiliser Garamond, Times New Roman, ou toute police serif traditionnelle — c'est le signal inverse du positionnement voulu.

---

## 04 · LOGO & SYMBOLE

### LOGO

Le symbole est un A fragmenté en trois barres obliques parallèles — jambe gauche, grande barre centrale, petite barre droite. Il encode les initiales A (Alexandre) et L (Lazarègue) dans une forme géométrique abstraite.

**Anatomie du symbole**

| ÉLÉMENT | FOND SOMBRE | FOND BLANC | FOND BLEU |
|---|---|---|---|
| Grande barre (centrale) | #1A47FF Electric Blue | #1A47FF Electric Blue | #FFFFFF Blanc pur |
| Petite barre (gauche) | #FFFFFF à 55% opacité | #0A0A14 Ink | #FFFFFF à 40% opacité |
| Petite barre (droite) | #1A47FF à 50% opacité | #1A47FF à 45% opacité | #FFFFFF à 30% opacité |
| Wordmark | #F0EEE8 Off-white | #0A0A14 Ink | #FFFFFF Blanc |
| Sous-titre DM Mono | #8888A0 Muted | #8888A0 Muted | #FFFFFF à 50% opacité |

**Sous-titre logo**

Cabinet IT & Innovation — DM Mono 12px minimum à l'écran, tracking 0.12em, couleur Accessible Muted sur fond clair ou Light Blue sur fond sombre

Ce sous-titre est la seule addition par rapport au logo original. Il fait le travail de positionnement que le seul logo ne faisait pas. Il peut être omis dans les très petits formats (favicon, tampon < 20px).

**Zones d'exclusion**

- Espace minimum autour du logo : 1× la hauteur du symbole sur chaque côté.
- Ne jamais déformer, tourner, ou modifier les proportions du symbole.
- Ne jamais utiliser le logo ou son sous-titre sur un fond insuffisamment contrasté. Ratio minimal : 4,5:1 pour le sous-titre ; 3:1 pour les éléments graphiques du symbole.
- Ne jamais remplacer la couleur principale par une autre couleur que celles définies dans le tableau ci-dessus.

---

## 05 · GRILLE & ESPACEMENT

### GRILLE

Le système d'espacement est basé sur une unité de 4px. La grille principale compte 12 colonnes avec un gutter de 24px sur desktop. La mise en page doit rester lisible à 200 % de zoom, sans défilement horizontal global.

**Grille desktop**

| | |
|---|---|
| Breakpoint desktop | ≥ 1280px |
| Colonnes | 12 colonnes |
| Gutter | 24px entre colonnes |
| Margin latérale | 36px de chaque côté (padding des sections) |
| Largeur max contenu | 1200px (centré) |
| Breakpoint tablet | ≥ 768px — grille 2 colonnes |
| Breakpoint mobile | < 640px — 1 colonne, padding 20px, cible tactile 44×44px minimum |

**Système d'espacement (tokens)**

| PX | REM | TOKEN | CONTEXTE D'USAGE |
|---|---|---|---|
| 4px | 0.25rem | Micro-espacement | Gaps entre badge et dot, entre icon et texte inline |
| 8px | 0.5rem | XS | Padding interne badges et pills, gap bouton icon+label |
| 12px | 0.75rem | SM | Gap entre éléments de même famille (stats, liens nav) |
| 16px | 1rem | Base | Padding interne cartes (côtés), espacement paragraphes |
| 24px | 1.5rem | MD | Padding cartes (vertical), espacement sections proches |
| 36px | 2.25rem | LG | Padding sections principales, gap hero left/right |
| 72px | 4.5rem | XL | Padding sections full-width (desktop), section padding top/bottom |
| 96px | 6rem | 2XL | Manifesto section padding, espacement héros vertical |

---

## 06 · COMPOSANTS UI

### COMPO

Les composants conservent les angles droits et les bordures fines de la marque. Chaque état doit fonctionner au clavier, rester visible sans animation et proposer un focus net. Une cible interactive mesure au minimum 44×44px.

**Tableau des composants**

| COMPOSANT | SPEC TECHNIQUE | USAGE |
|---|---|---|
| Bouton primaire | bg #1A47FF · texte blanc · Space Grotesk 15–16px/600 · casse phrase · min-height 44px · padding 13px 24px | Une action principale par zone : diagnostic, contact, téléchargement |
| Bouton secondaire | bg transparent · border 1px #4A4A63 · texte Ink · hover et focus distincts · min-height 44px | Action secondaire clairement hiérarchisée |
| Badge / label | DM Mono 12px min · tracking 0.08–0.14em · border 1px · padding 5px 9px · no radius | Catégorie, type, statut. Jamais seul pour transmettre un état |
| Carte | bg #FFF · border 1px #E0E0EE · padding 24–32px · titre 18px min · lien explicite | Expertises, articles, preuves et livrables |
| Stat | bg #FFF · border 1px #E0E0EE · chiffre Bebas 38px · label 12px #4A4A63 | Chiffres vérifiables, avec unité et contexte |
| Champ | label visible · texte 16px · hauteur 44px min · aide liée · erreur textuelle · focus 3px | Contact, newsletter, recherche. Placeholder non substitut au label |
| Lien navigation | Space Grotesk 14–16px · zone 44px min · état actif textuel + visuel | Navigation principale, mobile et fil d'Ariane |
| Lien éditorial | couleur Ink/Blue · souligné dans le corps · focus visible | Liens dans paragraphes et contenus juridiques |
| Barre accent | height 2–3px · #1A47FF · visible au hover et focus | Renfort visuel uniquement, jamais seul indicateur |
| Label de section | DM Mono 12px min · tracking 0.14–0.18em · #0A2ACC sur clair / #9FB2FF sur sombre | Repère court au-dessus d'un titre explicite |

**Règles globales des composants**

- Border-radius : 0px sur tous les composants. Pas d'arrondis. C'est une décision de marque — les angles droits signalent la précision juridique et technique.
- Transitions : 0.15–0.2s pour les états simples. Éviter les mouvements longs. Respecter prefers-reduced-motion et désactiver les translations, parallaxes et défilements animés quand l'utilisateur le demande.
- Curseur : conserver le curseur natif. Aucun curseur personnalisé obligatoire ; il peut gêner la précision, la performance et les aides techniques. Les éléments interactifs utilisent le pointeur attendu et un focus clavier visible.
- Animations : facultatives et décoratives. Le contenu est visible par défaut, même sans JavaScript. Si un reveal est utilisé : déplacement ≤ 12px, durée ≤ 0.3s, aucun décalage gênant et neutralisation avec prefers-reduced-motion.
- Barre d'accent : renfort au hover et au focus, jamais unique signal d'interactivité. Le libellé, le contraste et le focus restent compréhensibles sans la barre.

---

## 07 · ARCHITECTURE DES PAGES

### PAGES

**Structure globale du site**

| PAGE | URL | DESCRIPTION |
|---|---|---|
| Accueil | / | Hero + marquee + expertises + manifesto + ticker + process + contact |
| Expertises | /expertise/[slug] | Page détail par domaine — RGPD, AI Act, IP, M&A, Contrats, Cyber |
| Blog | /blog | Listing articles avec filtres catégories, featured, grille 3 colonnes |
| Article | /blog/[slug] | Article long avec TOC sidebar sticky, barre progression lecture |
| Ressources | /ressources | Livres blancs, rapports, guides — filtres par format, DL sur email |
| Plateforme | protect.lazaregue-avocats.fr | Services automatisés avec paiement — phishing, OSINT, piracy |
| Class Action | action.lazaregue-avocats.fr | Listing affaires collectives, landing par affaire, inscription |
| Contact | /contact | Formulaire diagnostic gratuit + Calendly |

**Structure section Hero (homepage)**

- Grid 2 colonnes égales. Colonne gauche : tag DM Mono + H1 Bebas monumentale. Colonne droite : description Space Grotesk + 4 stats en grille 2×2 + boutons.
- Fond : Navy #0A0F2E avec grille de points à 4% d'opacité (40×40px, couleur #1A47FF).
- Le hero de la page d'accueil peut approcher 80–88vh. Sur les pages d'expertise, préférer un hero plus court : proposition de valeur, public concerné, preuve et CTA visibles sans écran d'attente.
- Animation facultative : courte, non bloquante et supprimée avec prefers-reduced-motion. Le H1, la promesse et le CTA sont présents et visibles dès le chargement.

---

## 08 · STACK TECHNIQUE & INTÉGRATION

### STACK

**Technologies recommandées**

| TECHNOLOGIE | VERSION | RÔLE |
|---|---|---|
| HTML sémantique | Standard | Landmarks, titres hiérarchisés, liens et boutons natifs |
| CSS / design tokens | Standard | Couleurs, typographies, espacements, focus et responsive centralisés |
| JavaScript | Progressif | Seulement pour l'interaction utile ; contenu essentiel disponible sans JS |
| Framework | Projet | Libre choix si performance, SEO, rendu serveur et accessibilité sont vérifiés |
| Animation | Optionnelle | CSS ou bibliothèque légère ; reduced motion obligatoire ; pas de smooth scroll imposé |
| Formulaires | Natif + validation | Labels persistants, erreurs annoncées, état succès explicite, anti-spam accessible |
| Mesure | Consentement maîtrisé | Événements CTA et formulaires sans dégrader vitesse ni vie privée |
| Performance | Budget | Fonts locales ou optimisées, images responsives, dimensions réservées, JS limité |

**Variables CSS à déclarer (:root)**

```css
--blue: #1A47FF;
--blue2: #4D6FFF;
--blue3: #0A2ACC;
--navy: #0A0F2E;
--ink: #0A0A14;
--wh: #FFFFFF;
--off: #F4F4F8;
--text-muted: #4A4A63;
--muted-on-dark: #9FB2FF;
--bd: #E0E0EE;
--focus: #1A47FF;
--ff-display: 'Bebas Neue', sans-serif;
--ff-body: 'Space Grotesk', sans-serif;
--ff-mono: 'DM Mono', monospace;
```

**Polices web — chargement**

Privilégier l'auto-hébergement WOFF2, font-display: swap et le sous-ensemble utile. Précharger uniquement la police critique. Définir des fallbacks métriquement proches pour limiter le CLS.

---

## 09 · DO & DON'T

### RÈGLES

| ✓ À FAIRE | ✗ À NE PAS FAIRE |
|---|---|
| Fond Navy #0A0F2E pour les zones fortes | Ajouter vert, violet ou gradient décoratif |
| Bleu #1A47FF comme accent principal | Employer #8888A0 pour petit texte sur fond clair |
| Bebas Neue pour les H1 courts | Mettre CTA ou navigation en 9–10px |
| Space Grotesk pour la lecture et les CTA | Utiliser la couleur seule pour un statut |
| DM Mono à 12px minimum pour les métadonnées | Masquer le focus ou dépendre du hover |
| Contraste AA vérifié sur chaque combinaison | Imposer curseur ou smooth scroll personnalisé |
| Focus visible 3px et cibles 44×44px | Cacher du contenu avant exécution JavaScript |
| Liens explicites et soulignés dans le corps | Saturer une page de CTA concurrents |
| Contenu visible sans animation | Écrire des paragraphes sur plus de 72 caractères par ligne |
| Tester clavier, mobile, zoom 200 % et reduced motion | Réduire la police pour faire tenir un bloc |

---

## 10 · UX, ACCESSIBILITÉ & CONVERSION

### UX / A11Y

Ces règles sont obligatoires sur toutes les pages. Elles traduisent l'audit UX en critères de conception et de recette. En cas de conflit, la compréhension, l'accessibilité et la tâche de l'utilisateur priment sur l'effet visuel.

| CRITÈRE | RÈGLE DE CHARTE | BÉNÉFICE UTILISATEUR |
|---|---|---|
| Hiérarchie | Un H1 unique ; H2/H3 dans l'ordre ; titres descriptifs | Comprendre la page et naviguer avec un lecteur d'écran |
| Promesse | Public, problème traité, résultat et CTA visibles dès le premier écran | Savoir en quelques secondes si le cabinet est pertinent |
| CTA | Libellé d'action précis ; un CTA principal par zone ; état focus/hover/pressed | Décider et agir sans ambiguïté |
| Navigation | Header stable, lien d'évitement, fil d'Ariane si utile, menu clavier | Se repérer et revenir en arrière |
| Contenu | Paragraphes courts, largeur 64–72ch, jargon expliqué, répétitions supprimées | Lire vite et retenir l'essentiel |
| Preuves | Livrables, méthode, décisions et résultats distingués des promesses | Évaluer la crédibilité du cabinet |
| Accordéons | Bouton natif, aria-expanded/controls, fonctionnement clavier | Ouvrir et fermer sans dépendre de la souris |
| Tableaux | En-têtes sémantiques ; version mobile en blocs sans perdre les libellés | Comparer les informations sur tous les écrans |
| Formulaires | Labels persistants, aide, erreurs près du champ + synthèse, succès confirmé | Corriger puis envoyer sans deviner |
| Images | Alt utile ou vide si décorative ; width/height ; srcset/sizes ; lazy sous la ligne | Comprendre et charger rapidement |
| Responsive | Recette à 1440, 1024, 768, 390 et 320px ; zoom 200 % | Aucun contenu tronqué ni débordement global |
| Performance | Éviter le JS inutile ; réserver l'espace média ; limiter polices et animations | Afficher vite le contenu décisif |

### RECETTE AVANT MISE EN LIGNE

Valider au minimum : navigation clavier complète ; focus toujours visible ; contrastes AA ; lecture à 200 % ; absence de débordement horizontal ; CTA et formulaires compréhensibles ; images et tableaux accessibles ; contenu essentiel disponible sans animation ni JavaScript. Tester sur Safari iOS, Chrome Android et un navigateur desktop récent.

---

LAZARÈGUE AVOCATS · CHARTE GRAPHIQUE v1.1 · SEPTEMBRE 2026

Document confidentiel — usage interne et prestataires mandatés
