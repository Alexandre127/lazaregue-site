# Système chromatique des familles — état des lieux (chantier distinct)

> Ce chantier **dépasse la refonte de la home**. Il appelle une décision unique
> couvrant **la home, les pages de domaines et le menu**, à traiter d'un seul
> mouvement. À ne pas engager au fil de l'eau dans un lot de la refonte home.

## Ce qui est validé aujourd'hui

- **Bleu Lazarègue `#1A47FF` = marque + ACTION** (boutons, liens, focus,
  indicateurs cliquables), identique sur tout le site. Seule couleur d'action.
- **Un seul accent de famille validé** : **vert `#1D9E75`** pour la famille
  « Données / conformité ». Il est posé **par domaine**, sur les pages de
  domaines, via des variables CSS sur `<main data-domaine="…">`
  (`--famille-accent` / `--famille-rgb`). Application éditoriale uniquement
  (sur-titres, labels, filets, halos décoratifs), jamais sur un élément d'action.

## Ce qui manque

- **Deux accents de famille non fournis** : « Contrats et opérations numériques »
  et « Contentieux et atteintes numériques » (dans la nomenclature antérieure :
  « Contrats/opérations » et « Risque/pénal »). Le cabinet ne les a pas encore
  arbitrés. **Consigne en vigueur : ne pas inventer, ne pas généraliser.**

## Pourquoi on ne colore pas les familles sur la home maintenant

- Le vert validé est un accent **par domaine** (sur `data-domaine`), pas **par
  famille**. Introduire trois accents **par famille** sur la home créerait un
  **second système chromatique** à côté du premier, avec le risque qu'un même
  domaine porte **une couleur sur la home et une autre sur sa page**.
- Les couleurs de la maquette (`--fam-conf #0E7C7B` teal, `--fam-ops #9A6A16`
  ambre, `--fam-cont #A33A5B` rose) sont explicitement notées « **proposition,
  jamais utilisées pour un bouton ou un lien** ». Elles ne sont pas des jetons
  validés, et la proposition « conformité » (teal) **diverge du vert validé**.

## Décision prise pour la refonte home (lot 4)

**Familles livrées en neutre.** Les intitulés de famille en toutes lettres
portent l'information ; le bleu reste la seule couleur d'action. La section
« Domaines d'intervention » n'introduit aucune couleur de famille tant que le
chantier ci-dessous n'est pas tranché.

## Ce que la décision transverse devra fixer

1. Choisir entre un accent **par domaine** (existant) et un accent **par
   famille**, ou articuler les deux sans contradiction.
2. Fournir les **deux accents manquants** (ou décider du neutre définitif).
3. Garantir la cohérence **home ↔ page de domaine ↔ menu** : un domaine porte la
   même couleur partout.
4. Confirmer la correspondance famille ↔ accent (le vert `#1D9E75` s'applique-t-il
   à « Conformité et gouvernance » ?).

Voir aussi la mémoire projet « Système chromatique Lazarègue » et la charte
`docs/CHARTE.md`.
