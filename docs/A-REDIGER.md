# À rédiger — inventaire du contenu restant

> Inventaire en lecture seule (30 septembre 2026) de tout ce qui reste à écrire,
> réécrire, compléter ou fournir sur le site, pour rédaction par le cabinet.
> Aucune page n'a été créée ni corrigée. Classé par rubrique.
>
> **Colonnes** — *Intitulé* : ce qui s'affiche à l'écran (ou proposé s'il n'existe
> pas encore) · *Où* : page + section · *Adresse* : route existante ou prévue ·
> *État* : à écrire entièrement / test à réécrire / incomplet / lien vers page
> inexistante / lien générique par défaut / information à fournir · *Type* :
> article / cas client / texte de section / document de formation / information / lien.

---

## 1. Accueil

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| Dossier 01 « Un piratage. 80 000 € d'appels internationaux facturés. » | Accueil › section « Dossiers traités » | `/` (→ `/cas-clients`) | incomplet (contenu provisoire à valider) + lien générique par défaut | cas client + lien |
| Dossier 02 « Le logiciel était livré. L'entreprise ne pouvait pas l'utiliser. » | Accueil › « Dossiers traités » | `/` (→ `/cas-clients`) | incomplet (provisoire à valider) + lien générique | cas client + lien |
| Dossier 03 « Une fuite de données. Des grands comptes prêts à rompre. » | Accueil › « Dossiers traités » | `/` (→ `/cas-clients`) | incomplet (provisoire à valider) + lien générique | cas client + lien |

- Les 3 dossiers sont marqués « CONTENU PROVISOIRE À VALIDER PAR ME LAZARÈGUE » (`components/home/accueil-v4/home-dossiers.ts:4-7`) : profils, situations, interventions, leviers à valider. Les 3 liens « Découvrir le cas → » pointent tous vers l'index `/cas-clients` faute de page dédiée.
- Le reste de l'accueil est renseigné (équipe réelle + photos, panorama, 8 tribunes de presse avec URL, domaines câblés sur les vraies routes).

---

## 2. Nos domaines

Les 10 pages de domaine sont rédigées et substantiellement complètes. Les éléments à traiter se concentrent sur **RGPD**, **Contrats**, **Escroquerie/fraude bancaire** et **Diffamation**.

### 2.1 RGPD et données personnelles — `/nos-domaines/rgpd-donnees-personnelles`

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| « l'usage des outils d'intelligence artificielle par les salariés » | FAQ (`#faq`) | lien `→ /ressources/ia-salaries` | lien vers page inexistante (404) — article à écrire | lien + article |
| « le recours aux solutions hébergées par des fournisseurs américains » | FAQ (`#faq`) | lien `→ /ressources/hebergeurs-americains` | lien vers page inexistante (404) — article à écrire | lien + article |
| « Échanger sur le DPO externalisé » | « Prolongements de la mission » (`#specialises`) | lien `→ /contact` | lien générique par défaut (page DPO dédiée à créer) | lien |

*(`page.tsx:447`, `:450` — commentaires `TODO(URL à renseigner)` ; `:417-420` — page DPO à créer.)*

### 2.2 Contrats informatiques — `/nos-domaines/contrats-informatiques`

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| 3 cas « situations-types » (sauvegardes inutilisables / retard ERP / données bloquées) | Section « situations rencontrées » | `/nos-domaines/contrats-informatiques` | information à fournir (contenu générique volontaire, aucun dossier réel/résultat) | texte de section / information |

*(`ContratsInformatiquesClient.tsx:294-313` — « à confirmer par le cabinet avant toute présentation en dossier réel ».)*

### 2.3 Escroquerie et fraude bancaire — `/nos-domaines/escroquerie-fraude-bancaire`

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| 3 « Cas client » (01/02/03) avec résultats chiffrés | Section « cas clients » | `/nos-domaines/escroquerie-fraude-bancaire` | information à fournir (présentés comme réels, à confirmer factuellement — chiffres/résultats) | cas client / information |

*(`page.tsx:94-98`, `:199` — « Trois exemples parmi les dossiers dans lesquels le cabinet est intervenu » ; aucun marqueur de provisoire, mais à valider par le cabinet.)*

### 2.4 Diffamation et retrait de contenus — `/nos-domaines/diffamation-retrait-contenus`

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| « Comprendre le déréférencement → » | Section objectifs / ressources | lien `→ /ressources` | lien générique par défaut (page dédiée à créer) | lien + article |
| « Faux avis Google : que faire ? → » | Section objectifs / ressources | lien `→ /ressources` | lien générique par défaut (page dédiée à créer) | lien + article |
| Vidéo de fond du hero (version définitive) | Hero | `/nos-domaines/diffamation-retrait-contenus` | information à fournir (vidéo provisoire en place, définitive non intégrée — pas de balise `VideoObject`) | information / média |
| Image de partage (og:image) | `<head>` (métadonnées) | idem | information à fournir (fichier non fourni) | information / asset |

*(`DiffamationClient.tsx:13-16,167-168` — cibles provisoires vers `/ressources` ; `page.tsx:18,25`.)*

### 2.5 Domaines complets (aucun contenu à rédiger)
IA & AI Act, Cybersécurité, Contentieux informatique et commercial, Cybercriminalité, M&A tech, Crypto-actifs et blockchain — **complets** (textes, portraits, vidéos, liens de maillage tous présents et valides).

### 2.6 Transverse à la rubrique
| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| Image de partage (og:image) des pages de domaine | Métadonnées de chaque page | `/nos-domaines/*` | information à fournir (aucune des 11 pages ne déclare d'`openGraph.images` ; à traiter si une image de partage est souhaitée) | information / asset |
| Chapô de l'index (commentaire de code périmé `{{CHAPO_A_REDIGER}}`) | `nos-domaines/page.tsx:11` | `/nos-domaines` | information (le chapô est en réalité **rédigé** ; seul le commentaire est obsolète — non visible) | information |

---

## 3. Ressources

Source unique du hub : `app/ressources/data/ressources-index.ts`. Un seul article est définitif ; tout le reste du corpus est annoncé « à paraître » (`href:null`).

### 3.1 Articles du corpus à écrire entièrement (« 04 — Corpus » ; certains aussi en « 03 — À la une › Quatre repères »)

| # | Intitulé affiché | Adresse prévue | État | Type |
|---|---|---|---|---|
| 1 | NIS 2 : quelles entreprises sont concernées et quelles obligations anticiper ? | à créer | à écrire entièrement | article |
| 2 | Article 28 du RGPD : quelles clauses prévoir avec un sous-traitant ? | à créer | à écrire entièrement | article |
| 3 | Ransomware (rançongiciel) : les décisions juridiques à prendre dans les premières 24 heures | à créer | à écrire entièrement | article |
| 4 | Faux avis Google : comment demander leur suppression ? | à créer | à écrire entièrement | article |
| 5 | Gouvernance IA : comment encadrer les usages dans l'entreprise ? | à créer | à écrire entièrement | article |
| 6 | Déréférencement Google : dans quels cas demander la suppression d'un résultat ? | à créer | à écrire entièrement | article |
| 7 | Mise en conformité RGPD : par où commencer dans une PME ? | à créer | à écrire entièrement | article |
| 8 | Contrat de maintenance informatique : quelles clauses vérifier avant de signer ? | à créer | à écrire entièrement | article |
| 9 | Recette informatique : peut-on refuser un projet comportant des anomalies ? | à créer | à écrire entièrement | article |
| 10 | Réclamation PicRights : faut-il payer et comment répondre ? | à créer | à écrire entièrement | article |
| 11 | Due diligence technologique : que doit vérifier un acquéreur avant le closing ? | à créer | à écrire entièrement | article |

*(Corpus `ressources-index.ts:92-106` ; les repères « À la une » = NIS 2, Article 28, Gouvernance IA, Ransomware, tous ci-dessus, badge « À paraître ».)*

### 3.2 Articles annoncés « à paraître » hors corpus (dans la page test « Faux conseiller »)

| Intitulé affiché | Où | Adresse | État | Type |
|---|---|---|---|---|
| Virement frauduleux : comment obtenir le remboursement ? | « Faux conseiller » › Pour aller plus loin | à créer | à écrire entièrement | article |
| Phishing bancaire : quels recours ? | idem | à créer | à écrire entièrement | article |
| Fraude bancaire : que faire dans les premières 24 heures ? | idem | à créer | à écrire entièrement | article |

*(`faux-conseiller-bancaire-remboursement/page.tsx:56-79` — à réintégrer au corpus ou supprimer lors de la réécriture.)*

### 3.3 Articles-tests à réécrire

| Intitulé affiché | Adresse (existante) | État | Type |
|---|---|---|---|
| Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser ? | `/ressources/faux-conseiller-bancaire-remboursement` | test à réécrire | article |
| Œuvre originale (test) | `/ressources/oeuvre-originale` | test à réécrire | article |

### 3.4 Cartes de domaine « à paraître » (sans page ni filtre)

| Intitulé affiché | Où | Adresse | État | Type |
|---|---|---|---|---|
| Contentieux informatique et commercial (n° 06) | Ressources › « Par domaine » | à créer | à écrire entièrement (ni contenu ni filtre) | texte de section / futurs articles |
| Crypto-actifs, blockchain et Web3 (n° 08) | Ressources › « Par domaine » | à créer | à écrire entièrement (ni contenu ni filtre) | texte de section / futurs articles |

### 3.5 Article de référence (complet — pour mémoire)
« Fraude bancaire : opposition, contestation et remboursement » — `/ressources/fraude-bancaire-opposition-contestation-remboursement` — **complet, daté et sourcé** (le seul article définitif).

> Conséquence : 7 des 8 filtres de domaine actifs (cyber, rgpd, ia, contrats, contenus, pi, ma) n'affichent aujourd'hui que des cartes « À paraître » ; seul le filtre « fraude » mène à un article lisible.

---

## 4. Cas clients

Les **8 cas** de la collection (`app/cas-clients/data/cas-clients.ts`) ont chacun une **page détaillée complète** (Situation / Enjeu / Intervention / Issue / À retenir). Restent :

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| Champ « Client » = « [À préciser] » (cas 04, Usurpation d'identité) | Encart faits + bandeau résumé | `/cas-clients/usurpation-identite-identifier-auteur-article-145-cpc` | information à fournir | information |
| Badge « Dossier clos — issue favorable » + phrase finale « Le dossier est clos, avec une issue favorable… » | Statut + fin de chaque cas | les 8 pages `/cas-clients/*` | incomplet (formulation générique identique sur les 8) | texte de section |
| « Voir la compétence → » (cas 07, photographies/PI) | Bas de la page du cas 07 | lien `→ /litige-afp-picrights/` | lien vers page inexistante (route Next absente ; portée par le SPA, à traiter) | lien |

*(`cas-clients.ts:143` ; `:23,83…228` ; `:20`.)*

> À noter : les blocs « cas clients » internes aux pages de domaine (RGPD, escroquerie, contentieux, IA) sont autonomes et **ne pointent pas** vers les pages `/cas-clients` existantes — maillage à créer (facultatif).

---

## 5. Formations

Le hub et les 4 pages ont du contenu réel. Les éléments à fournir se concentrent sur la **formation avocats** et sur les **documents remis**.

### 5.1 Informations / présentations à fournir

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| Coanimatrice (nom, statut, bio, **photo**) | Formation avocats › formateurs (placeholder « Photo à venir ») | `/formations/ia-avocats` | à écrire entièrement + information à fournir | information |
| « Animée par … [consœur du barreau de Paris — à confirmer] » | Repère + carte hub « Vous êtes avocat ? » | `/formations/ia-avocats` et `/formations` | information à fournir | information |
| « Durée … [heures de formation continue — à vérifier] » | Repère de la formation avocats | `/formations/ia-avocats` | information à fournir | information |
| FAQ « La formation est-elle validée au titre de la formation continue ? » → « [À vérifier] » | FAQ formation avocats | `/formations/ia-avocats` | information à fournir (réponse à valider) | texte de section |
| Accroche IA Act (exactitude de « l'article 4 » après le règlement modificatif) | Formation IA Act | `/formations/intelligence-artificielle-entreprise` | information à fournir (à vérifier) | texte de section |
| « Prochaines sessions : nous contacter » | Hub › Formats et tarifs | `/formations` | information à fournir (dates, quand programmées) | information |

*(`_data/avocats.ts:13-14,20,21,136,137,147,157` ; `_data/ia-act.ts:13-16` ; `page.tsx:151`.)*

### 5.2 Documents remis aux participants (livrables)

Présentés en **aperçu** (extraits rédigés) sur chaque page, mais **aucun n'est le document complet remis** : les 21 supports sont à produire/finaliser.

| Formation | Documents annoncés | État | Type |
|---|---|---|---|
| IA Act (5) | Grille de qualification des systèmes d'IA · Tableau des obligations par rôle · Charte d'utilisation de l'IA générative · Trame d'analyse d'impact sur les droits fondamentaux · Inventaire des outils d'IA | à produire (aperçu rédigé, document complet à finaliser) | document de formation |
| RGPD (5) | Procédure de gestion des violations · Modèle de notification à la CNIL · Registre des activités de traitement · Trame d'analyse d'impact (AIPD) · Check-list sécurité | à produire | document de formation |
| Cybersécurité (5) | Procédure anti-fraude au virement · Fiche réflexe incident · Check-list NIS 2 · Clauses de cybersécurité pour vos contrats · Trame de politique de sécurité (PSSI) | à produire | document de formation |
| Avocats (6) | Bibliothèque de consignes (prompts) · Workflow de classement des pièces (n8n/Make) · Modèle de bordereau de communication de pièces · Tableau de suivi des échéances et relances · Grille d'usage de l'IA et secret professionnel · Tableau de bord de rentabilité | à produire | document de formation |

---

## 6. Le cabinet — `/le-cabinet`

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| « [plateforme externe — à renseigner] » (label d'avis) | Bloc « cadre de confiance » (constantes définies mais **non rendues**) | `/le-cabinet` | information à fournir (seulement si le bloc doit exister) | information / lien |

*(`app/le-cabinet/data/liens.ts:12-13` — `AVIS_HREF = null`. Reste de la page complet : héros, repères, équipe, méthode, engagements, honoraires, domaines.)*

---

## 7. Contact — `/contact`

Aucun contenu à rédiger. Coordonnées, formulaire (+ écran de confirmation), FAQ et visuel complets.

---

## 8. Pages légales

| Intitulé | Où | Adresse | État | Type |
|---|---|---|---|---|
| « À vérifier avant mise en ligne : outil d'audience installé, contenus incorporés, bandeau de recueil » | Politique de confidentialité › « Traceurs et mesure d'audience » | `/politique-de-confidentialite` | information à fournir (à confirmer avant mise en ligne) | information |

- Notes internes (non affichées) à confirmer avant mise en ligne : (1) outil d'audience réellement installé ; (2) formulaire de contact sans persistance en base ; (3) n° TVA FR24 823 894 142.
- **Mentions légales** : complètes (SIREN/SIRET, APE, TVA, hébergeur, RC pro, médiateur, Bâtonnier).

---

## Récapitulatif chiffré par rubrique

| Rubrique | Éléments à traiter |
|---|---|
| **Accueil** | 3 (dossiers provisoires à valider + liens génériques) |
| **Nos domaines** | RGPD 3 · Contrats 1 (bloc de 3 cas) · Escroquerie 1 (bloc de 3 cas à confirmer) · Diffamation 4 · + og:image transverse aux 11 pages = **~10 items** |
| **Ressources** | 14 articles à écrire (11 corpus + 3 hors corpus) · 2 tests à réécrire · 2 domaines « à paraître » = **18 items** (+ 1 article de référence complet) |
| **Cas clients** | 3 (client cas 04 · issue générique des 8 · lien PI mort) |
| **Formations** | 6 informations/présentations à fournir · 21 documents à produire = **27 items** |
| **Le cabinet** | 1 (label d'avis, optionnel) |
| **Contact** | 0 |
| **Pages légales** | 1 (politique de confidentialité à confirmer) |

**Liens internes à corriger (transverse) :**
- **404 (page inexistante) :** `/litige-afp-picrights/` (cas 07) · `/ressources/ia-salaries` (FAQ RGPD) · `/ressources/hebergeurs-americains` (FAQ RGPD).
- **Générique par défaut :** RGPD « DPO externalisé » → `/contact` · Diffamation « déréférencement » et « faux avis » → `/ressources` · Accueil 3 dossiers → `/cas-clients` · Ressource fraude, cartes « Cas client 02/08 » → `/nos-domaines/escroquerie-fraude-bancaire` (au lieu des pages `/cas-clients` dédiées existantes).

---

## À traiter en premier — éléments visibles depuis l'accueil ou le menu

1. **Accueil › « Dossiers traités »** — les 3 dossiers provisoires sont visibles dès la page d'accueil (contenu à valider par le cabinet).
2. **Menu › Ressources** — le hub affiche d'emblée **11 articles « À paraître »**, **2 cartes de domaine « à paraître »** (Contentieux, Crypto) et **2 articles-tests** (Faux conseiller, Œuvre originale) : c'est la rubrique la plus visiblement incomplète.
3. **Menu › Formations** — dès le hub : « Prochaines sessions : nous contacter » et la carte « Vous êtes avocat ? » avec « [consœur — à confirmer] » ; sur `/formations/ia-avocats`, la coanimatrice s'affiche en « Photo à venir » avec bio à écrire.
4. **Menu › Cas clients** — le cas 04 affiche « [À préciser] » à la place du client ; la formule d'issue est identique sur les 8 cas.
5. **Menu › Nos domaines** — RGPD (2 liens de FAQ en 404 + « DPO externalisé » générique) et Diffamation (2 liens « déréférencement » / « faux avis » renvoyés vers l'index générique).

> Priorité éditoriale suggérée par visibilité : **(1) Accueil → (2) Ressources → (3) Formations → (4) Cas clients → (5) FAQ des domaines**. Les 3 articles de Ressources reliés à des liens morts (IA & salariés, hébergeurs américains, déréférencement/faux avis) font d'une pierre deux coups : ils suppriment aussi des 404 / liens génériques.
