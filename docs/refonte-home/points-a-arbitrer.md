# Points arbitrés en exécution autonome (refonte home)

Décisions prises sans interruption, selon la règle « l'option la plus proche de la
fiche qui n'invente rien ». Une entrée par décision, avec sa raison.

## Cas pratiques (correction)
- Déduplication limitée aux répétitions **littérales** (consigne). « documenté la
  gouvernance juridique des systèmes d'IA » conservé au dossier 2 malgré le
  recouvrement thématique avec l'issue.
- Dossier 3, intervention : « mis en cause » et non « engagé », pour ne pas
  affirmer plus que l'issue.
- Couleur limitée à un **bandeau de titre** (corps sur blanc) pour réduire le
  poids visuel sans changer la gamme ni introduire de couleur nouvelle.

## Lot 7B — Équipe
- Cartes mises à plat (portrait unique, aucun retournement). La maquette ne
  montre qu'un portrait par personne ; le retournement révélait une seconde photo
  « hors cabinet » aux colorimétries hétérogènes, contraire au « traitement
  commun ». Règle de sobriété appliquée.
- Distinction avocat/expert portée par la qualité en toutes lettres (barreau /
  fonction), non par une couleur : intitulé de statut en couleur unique
  (traitement commun). Aucun badge.
- Signatures/citations retirées (non rendues ; les témoignages sont proscrits).
- Portraits : cartes bornées à 250px (déjà réduites vs les placeholders
  surdimensionnés de la maquette).
- JSON-LD (Person) d'Amir et Nadia à resynchroniser au lot 8 (données
  structurées).

## Reprise post-audit — arbitrages appliqués
- Cabinet : les deux boutons inertes sous le paragraphe (<button> sans handler)
  convertis en liens réels (Parlons-en → /contact ; Découvrir le cabinet →
  /le-cabinet). La photographie pointe vers /contact (aria-label explicite).
- Cibles tactiles 44 px appliquées à des composants PARTAGÉS (Footer,
  site-header, hero-cta-card) : conséquence assumée = pied de page plus haut sur
  toutes les pages. Wordmark laissé comme lien de marque (exception 44 px usuelle).

## Confrontation observations / référentiel — arbitrages appliqués
- **Espacement inter-sections (points 2-3).** Échelle unique `py-8 md:py-14`
  (32 / 56 px) appliquée à toutes les sections, plutôt qu'une refonte « padding
  d'un seul côté » (invasive sur 7 composants hétérogènes, et cassant la
  respiration autour des changements de fond clair/sombre). Jointures doublées
  ramenées de 160-192 px à ~112 px desktop / 64 px mobile ; jointure à un côté
  56 / 32 px. Mesuré sur build.
- **Cas — accent unique (point 6a).** Bleu d'action de la marque retenu comme
  accent unique (option 1 du référentiel, recommandée) plutôt que rattachement
  au chantier chromatique des familles (sans date). Rouge/vert supprimés.
- **Cas — sur-titre (point 6d).** « Cas pratiques » retenu (pas « cas clients » :
  dossiers anonymisés). Ajouté aussi parce que la majorité des sections portent
  un sur-titre (Cabinet, Pourquoi nous, Équipe, Presse).
- **Domaines — pas de sur-titre.** Contrairement au constat du référentiel qui
  cite « cas ET domaines », le titre H2 « Domaines d'intervention » est déjà un
  intitulé-repère (modèle « label-H2 », comme la maquette le prévoit
  explicitement : « aucun chapô »). Ajouter un sur-titre le dédoublerait
  (« Nos domaines / Domaines d'intervention »). Laissé en l'état — à trancher si
  le cabinet veut reformuler le H2 en titre descriptif + sur-titre.

## Confrontation observations — points VÉRIFIÉS sans correction nécessaire
- **Chevauchement logo / badge (point 1).** Aucun recouvrement réel sur la build
  actuelle. Mesures (scroll 0) : dégagement en-tête → badge = 103 px (1440),
  40 px (390 / 320). L'en-tête est `position: absolute` en haut de page et défile
  avec le héros (aucun recouvrement collant). Le badge est `static` (non absolu).
  Il n'existe pas de sous-ligne de logo (« cabinet IT & innovation ») : les trois
  hypothèses du référentiel sont écartées par la mesure. Aucune correction.
- **Tailles des groupes de cartes (point 6c).** Mesurées (desktop 1440) :
  Pourquoi nous 307/307/307, Cas 386×3, Équipe 440×3 + 454×2 (3,2 %), Presse
  144/144/127/127 (13 %, écart croisé entre rangées d'une grille 2×2 — cartes
  égalisées DANS chaque rangée par étirement, l'axe que l'œil compare ; forcer
  l'égalité inter-rangées ajouterait du vide aux deux cartes basses).
  Domaines : cartes égales dans chaque rangée de famille ; l'écart 194 vs 240
  provient de familles distinctes (3/3/4), non d'un défaut d'alignement.
  Aucune égalisation forcée supplémentaire.
- **Titre spotlight (point 5).** Effet présent et vérifié (voir commit) ; pic du
  dégradé éclairci pour la perceptibilité.

## Points NON techniques — à trancher par le cabinet (non traités, consigne F)
Décisions éditoriales/stratégiques, hors périmètre technique :

1. **Carte « Escroquerie et fraude bancaire ».** Elle décrit une démarche de
   particulier au milieu de neuf cartes destinées aux entreprises. Cohérence de
   cible à trancher (reformuler côté entreprise ? déplacer ? assumer le mixte ?).
2. **Chevauchement pour un dirigeant** entre cybersécurité, cybercriminalité,
   contentieux informatique et fraude : la frontière entre ces domaines n'est pas
   explicitée pour le visiteur non juriste. Clarification éditoriale à arbitrer.
3. **Absence d'indicateur de réussite** attaché à la page (aucun objectif de
   conversion/mesure défini). À définir avant mise en ligne si un suivi est
   souhaité (le site étant en préproduction noindex, aucune mesure d'audience).

## Hors de portée du développement (référentiel — nécessite le cabinet / un poste)
- **Retournement des portraits (point 7).** Peut revenir à UNE condition
  matérielle : cinq secondes photographies cadrées et traitées comme les
  premières (séance photo, pas une ligne de code). Sinon le cliché informel
  actuel violerait « traitement commun des images ». Conditions techniques déjà
  posées si les photos existent (nom/fonction visibles en permanence, survol
  ET toucher, immobilisation sous reduced-motion).
- **UX-003 / UX-009** — aucun indicateur de réussite ni profil fondé sur des
  demandes réelles (voir point non technique 3).
- **UX-015 / UX-048** — test de tri de cartes / test utilisateurs (5-8 personnes,
  une demi-journée) : seule manière de trancher la frontière entre domaines
  (point 4). À la charge du cabinet.
- **UX-145 / UX-165** — zoom 200 % / 400 % et restitution au lecteur d'écran :
  non émulables dans l'outil de session (aucune commande de zoom de page ; pas
  de lecteur d'écran). Vérification par le code faite (reflow, noms accessibles,
  role/aria) ; contrôle réel à faire sur un poste.
- **Mesure de performance réelle** — suspendue à la variable d'environnement
  Vercel (voir section E du rapport) : `NEXT_PUBLIC_SITE_URL` = origine canonique
  de la préprod, à renseigner dans Vercel → Settings → Environment Variables
  (environnement Production/Preview). Le garde-fou `lib/site-url.ts` lève une
  erreur en build production tant qu'elle est absente.
