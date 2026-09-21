# Réponse à l'inventaire — arbitrages avant le lot 1

Texte à coller tel quel dans la session Claude Code.

---

Inventaire validé. Une précision préalable qui change plusieurs de tes questions : **aucune
page du site n'est en production.** Le projet est entièrement en préproduction, sous
`noindex`. Il n'y a donc ni référencement acquis, ni trafic, ni historique de liens à
préserver. Tout raisonnement fondé sur le coût d'une migration d'URL tombe.

## B — Taxonomie des dix domaines

Applique **exactement** la liste d'URL de la section 3 du document de consignes, pour les
dix cartes. Les cinq routes qui en divergent sont renommées :

| Domaine | Route actuelle | Route cible |
|---|---|---|
| RGPD et données personnelles | `/nos-domaines/rgpd-donnees` | `/nos-domaines/rgpd-donnees-personnelles` |
| Intelligence artificielle et AI Act | `/nos-domaines/ia-act` | `/nos-domaines/intelligence-artificielle` |
| M&A Tech et due diligence | `/competences/ma-tech` | `/nos-domaines/ma-tech` |
| Escroquerie et fraude bancaire | `/nos-domaines/avocat-escroquerie-fraude` | `/nos-domaines/escroquerie-fraude-bancaire` |
| Diffamation et retrait de contenus | `/nos-domaines/diffamation-retrait-de-contenus` | `/nos-domaines/diffamation-retrait-contenus` |

M&A Tech rejoint `/nos-domaines/` comme les neuf autres : aucune page de compétence ne doit
subsister sous `/competences/`.

Cette migration est **expressément autorisée** et remplace la restriction du document de
consignes, qui n'autorisait que M&A Tech. Corrige cette phrase dans le document.

Deux conditions avant de toucher à une seule route :

1. Dresse l'inventaire exhaustif des références aux cinq anciennes URL — liens internes de
   toutes les pages, menus desktop et mobile, pied de page, canoniques, métadonnées,
   JSON-LD, sitemap, redirections existantes — et présente-le-moi. Une route renommée sans
   ce recensement laisse des liens morts ailleurs sur le site.
2. Traite les deux redirections déjà en place, qui pointent vers des slugs que tu vas
   renommer : `/avocat-escroquerie-fraude` et `/competences/plateformes`. Elles doivent
   viser directement la nouvelle URL. Aucune redirection ne doit en appeler une autre.

Mets en place un 301 depuis chacune des cinq anciennes adresses. Rien n'est indexé, mais
elles ont pu circuler par ailleurs et la mesure ne coûte rien.

**Carte 7, contentieux informatique et commercial.** La page sera créée dans un chantier
distinct, postérieur à celui-ci. En attendant, la carte est affichée dans la famille
« Contentieux et atteintes numériques », strictement non interactive, selon la règle déjà
prévue pour les références de presse sans URL : aucun `<a>`, aucun `href`, aucun rôle de
lien, aucun curseur de clic, commentaire `TODO` interne. Elle n'entre pas au sitemap. Elle
redeviendra un lien ordinaire vers `/nos-domaines/contentieux-informatique` dès que la page
existera — ce qui doit intervenir avant toute mise en ligne, faute de quoi la home partirait
avec une carte morte. Pas de fusion avec « Contrats informatiques » : la scission est un
arbitrage acquis et constitue la principale modification structurelle de la page.

## D1 — Nadia Abchiche-Mimouni

La maquette l'emporte sur la fiche : celle-ci est antérieure à cette correction. Afficher
« Maîtresse de conférences en informatique à l'Université Côte d'Azur ». La règle de la
fiche — n'afficher que les qualités professionnelles exactes — reste respectée ; seule la
valeur a changé depuis.

## D2 — Presse

Confirmé. Le Monde et Capital restent affichés sans aucun élément interactif, avec un
`TODO` interne. Sud Ouest et Le Revenu portent leurs URL réelles.

## D3 — Bouton du bloc portail

**Aucune page portail n'est prévue.** `/le-cabinet/portail-client/` était une URL inventée
dans la maquette : supprime le bouton « Voir le portail client » du grand bloc portail.
N'y substitue aucun lien.

Le bloc lui-même est conservé, avec son titre, son texte définitif et l'aperçu réel de
l'interface. Confirme-moi qu'une capture réelle du portail existe dans le dépôt. À défaut,
conserve un emplacement signalé en préproduction uniquement, et dis-le-moi.

## D4 — Médias

Réutilise les illustrations, la photographie collective et l'aperçu du portail déjà
présents dans le dépôt. Ne remplace aucun visuel manquant par une image générée. Donne-moi
la liste précise de ce qui manque réellement, fichier par fichier.

## Globe mobile — à trancher avant le lot 3

Le globe n'est aujourd'hui monté qu'au-delà de 901 px. La consigne mobile revient donc à
monter un rendu WebGL sur téléphone pour l'immobiliser aussitôt. Or un globe figé est, par
définition, une image.

Avant d'écrire la moindre ligne du lot 3, mesure et présente-moi deux choses :

1. le coût réel du montage du composant existant sur mobile — poids ajouté, activité CPU et
   GPU, effet sur le LCP et le CLS aux trois largeurs ;
2. la faisabilité d'exporter, depuis ce même composant, une vue orientée sur l'Europe en
   image statique servie uniquement sous 901 px, en WebP ou AVIF, avec dimensions
   explicites.

Si l'écart de performance est significatif, je retiendrai l'image statique exportée du
composant réel : rendu identique, identité préservée, coût nul, et plus aucun écouteur de
geste à neutraliser. Tu me présentes les deux mesures et je tranche. N'engage aucune des
deux voies avant ma réponse.

## Indexation — correction du lot 10

Puisque le site entier est en préproduction, le retrait des directives `noindex` ne relève
pas de ce chantier : il dépendra de la mise en ligne du site, décidée séparément. **Ne
touche à aucune directive d'indexation, dans aucun lot.** Le lot 10 se limite à la
validation de la préproduction et à la vérification de la canonique de la home, du sitemap
et des redirections. Corrige le document de consignes sur ce point.

## Points d'intendance

Les quelque 340 problèmes de lint préexistants sont hors périmètre : ne les corrige pas,
mais veille à ce que la refonte n'en ajoute aucun.

Confirme au lot 1 lequel des deux composants de pied de page est effectivement monté avant
d'y toucher.

Copie les trois fichiers de référence dans `docs/refonte-home/` au lot 1, afin qu'ils
soient versionnés avec la branche.

Le renommage des cinq routes s'intègre au lot 2, après validation de l'inventaire des
références demandé plus haut.

Tu peux lancer le lot 1.
