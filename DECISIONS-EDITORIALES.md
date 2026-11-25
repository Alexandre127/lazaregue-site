# Décisions éditoriales

Registre des choix de **contenu** (chiffres, sources, formulations) faits sur le
site, avec leur justification et ce qui reste à arbitrer ou à vérifier. Pendant
technique de [`DETTE-TECHNIQUE.md`](DETTE-TECHNIQUE.md).

---

## Section « Contexte » de la home — les quatre chiffres (2 septembre 2026)

La section affichait auparavant des chiffres inexacts ou dupliqués. Elle a été
refondue autour de **quatre chiffres sourcés**, présentés en frise numérotée
01–04. Composant : `components/home/section-enjeux.tsx`.

### Les quatre chiffres retenus

| # | Chiffre | Légende | Source exacte | Statut |
|---|---|---|---|---|
| 01 | **80 %** | des entreprises interrogées estiment ne pas être suffisamment préparées face au risque cyber | Cybermalveillance.gouv.fr — 2025 | ⚠️ **non vérifié à la source** |
| 02 | **+73 %** | de demandes d'assistance émanant des professionnels en un an | Cybermalveillance.gouv.fr — 2025 | ⚠️ **non vérifié à la source** |
| 03 | **6 167** | violations de données personnelles notifiées à la CNIL, en hausse de 9,5 % | CNIL — Rapport annuel 2025 | Vérifié |
| 04 | **486,8 M€** | d'amendes prononcées en 83 sanctions | CNIL — Rapport annuel 2025 | ⚠️ **à contextualiser (voir ci-dessous)** |

### Points à arbitrer / à vérifier

- **486,8 M€ — chiffre dominé par deux affaires.** Ce total d'amendes s'explique
  **pour l'essentiel par deux décisions « cookies » visant Google et Shein**. Le
  présenter comme un montant annuel global est exact mais potentiellement
  trompeur : sans ces deux dossiers, l'ordre de grandeur des sanctions est tout
  autre. **À arbitrer** : garder le chiffre brut, ou l'accompagner d'une mention
  (« dont l'essentiel sur deux décisions »), ou retenir un indicateur plus
  représentatif de l'activité de sanction courante.
- **80 % et +73 % — non vérifiés à la source.** Les deux chiffres
  Cybermalveillance.gouv.fr (2025) proviennent de reprises et **n'ont pas encore
  été confrontés au rapport original**. À valider avant mise en ligne définitive
  (libellé exact, périmètre « professionnels », millésime de l'exercice).

### Chiffres écartés (et pourquoi)

- **+87 % — retiré.** Il mesurait la hausse des **demandes d'assistance**, et non
  celle des **attaques** : le présenter comme une progression des attaques était
  un contresens. Écarté pour éviter l'amalgame.
- **« 486 M€ · 20 150 plaintes traitées » — inexact.** Le rapport CNIL distingue
  **20 150 plaintes reçues** et **18 123 plaintes traitées** : la formulation
  confondait les deux. Écartée. (Le montant retenu, plus précis, est 486,8 M€ —
  voir #04.)

### Règle appliquée aux millésimes

Un rapport se désigne par **l'année de son exercice**, pas par celle de sa
publication. Les sources portent donc « 2025 » (exercice), même si la parution
est intervenue en 2026. La home l'indique par une ligne mono discrète sous les
chiffres : « DONNÉES PUBLIÉES EN 2026 · DERNIER EXERCICE DISPONIBLE ». Le kicker
de la section, lui, ne porte plus de millésime (« CONTEXTE · FRANCE »).

## Pages « banques » (note d'analyse + offre « sécurité des paiements ») — deux exceptions assumées

Deux pages s'adressent à un **public de juristes bancaires** (directions
juridiques, conformité, risques, sécurité), et non au grand public :

- `/ressources/fraude-par-manipulation-banques-2026-2028` (note d'analyse) ;
- `/securite-des-paiements` (offre d'accompagnement).

Pour ces deux pages **seulement**, deux règles générales du site sont écartées,
à la demande du cabinet :

1. **Références d'articles de loi dans le corps.** La règle du site place les
   références d'articles « en petit ou en FAQ ». Ici elles restent dans le fil du
   texte (art. L. 133-18 à L. 133-24, L. 133-23 ; directive (UE) 2015/2366 ;
   règlement délégué (UE) 2018/389 ; art. 58, 59, 69 et 83 du futur règlement…).
   **Raison :** le lecteur est juriste bancaire ; les références sont la substance
   de l'analyse et doivent être lisibles dans le raisonnement.

2. **Dix questions au « nous ».** La section « Dix questions à poser maintenant »
   est rédigée à la première personne du pluriel (« Pouvons-nous rembourser… »,
   « Disposons-nous des rapports d'audit… »). Ce « nous » n'est **pas** la voix du
   cabinet mais **la voix de la banque qui s'interroge** : ce sont les questions
   que le comité des risques se pose à lui-même. La règle « voix le cabinet / pas
   de “nous” » ne s'y applique donc pas. Texte conservé tel quel.
