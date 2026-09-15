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
