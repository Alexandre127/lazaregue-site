/**
 * Contenu de la page « M&A Tech » — refonte UX v2 d'après `ma-tech-maquette-v2.html`.
 * Texte repris à l'identique de la page actuelle et de la maquette (aucune
 * reformulation). Les liens de maillage pointent vers les routes réelles du
 * dépôt (slugs : rgpd-donnees-personnelles, avocat-intelligence-artificielle).
 *
 * Textes NOUVEAUX (issus de l'audit, à valider) : les deux phrases du hero,
 * les cartes « Open source » et « IA » des conséquences, la synthèse audit,
 * le regroupement de « Traduire », le lexique, l'intro et les trois livrables.
 */

export const CONTACT = "/contact";

const CONTRATS = "/nos-domaines/contrats-informatiques";
const RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const CYBER = "/nos-domaines/cybersecurite";
const IA = "/nos-domaines/avocat-intelligence-artificielle";

export const HERO = {
  eyebrow: "M&A Tech · Toute la France",
  h1: "Avocat M&A Tech : due diligence juridique des actifs technologiques",
  what: "Due diligence juridique des logiciels, données, contrats et systèmes d'IA avant une acquisition ou une cession.",
  why: "Vérifier que les actifs appartiennent à la cible, peuvent être transférés et resteront exploitables après l'opération : ce que l'audit révèle se traduit en prix, en conditions de closing et en garanties.",
  cta1: "Faire auditer une cible",
  cta2: "Préparer une cession tech",
};

/* Conséquences — remontées juste après le hero ; cinq cartes (situation + effet). */
export const CONSEQ = {
  eyebrow: "Ce qui peut changer l'opération",
  h2: "Ce que l'audit peut changer dans l'opération",
  lede: "Cinq situations fréquentes, découvertes avant ou après la signature : leur effet sur le prix, le calendrier ou les garanties dépend du moment où elles sont identifiées.",
  cards: [
    { n: "01", h3: "Code", p: "Une partie du logiciel a été développée par des prestataires, sans cession de droits valable au profit de la société.", eff: "L'actif n'est pas entièrement détenu : régularisation avant le closing, condition suspensive ou garantie." },
    { n: "02", h3: "Open source", p: "Un composant libre soumis à une licence réciproque (copyleft) est intégré au produit distribué aux clients.", eff: "Remplacement du composant ou revue du mode de distribution avant ou après l'opération." },
    { n: "03", h3: "Données", p: "Les données portent une valeur économique réelle, sans que leur réutilisation après l'opération soit juridiquement possible.", eff: "Le périmètre d'exploitation retenu dans la valorisation doit être revu." },
    { n: "04", h3: "Contrats", p: "Une clause de changement de contrôle permet à un client ou à un fournisseur essentiel de sortir du contrat au moment du transfert.", eff: "Accord préalable du client, ajustement de prix ou complément de prix différé." },
    { n: "05", h3: "Intelligence artificielle", p: "Le modèle d'IA au cœur du produit est utilisé sous une licence qui exclut l'usage commercial ou l'adaptation aux données des clients.", eff: "Licence à renégocier ou engagement de migration inscrit au contrat de cession." },
  ],
};

export const POUR_QUI = {
  eyebrow: "Interlocuteurs",
  h2: "À qui nous nous adressons",
  cards: [
    { tag: "Acquisition", h3: "Acquéreur industriel ou entreprise de services", p: "L'acquisition vise une technologie, une base de clients ou une équipe. L'enjeu est de savoir ce qui sera effectivement transféré, ce qui restera chez des tiers et ce qui devra être régularisé. Le rapport d'audit est rédigé pour être utilisé en négociation, puis dans le contrat de cession." },
    { tag: "Investissement", h3: "Fonds d'investissement", p: "La thèse d'investissement repose sur un actif technologique et sur sa capacité à croître. L'audit isole les points susceptibles d'affecter la valorisation ou la sortie : propriété du code, dépendances open source, licences d'IA, exploitation des données et engagements contractuels de la cible." },
    { tag: "Cession", h3: "Dirigeant préparant une cession", p: "Les points faibles se traitent mieux avant la mise en vente qu'en réponse aux questions de l'acquéreur. Le cabinet identifie les régularisations possibles, prépare la partie technologique de la data room et anticipe les garanties qui seront demandées dans le contrat de cession." },
    { tag: "Conseil corporate", h3: "Cabinet conduisant l'opération", p: "Le cabinet intervient aux côtés du conseil corporate pour examiner les actifs technologiques, qualifier leurs incidences sur l'opération et préparer les stipulations correspondantes du contrat de cession. Les constats sont remis dans le format et selon le calendrier définis pour l'opération." },
  ],
};

export const DEFINITION = {
  eyebrow: "Définition",
  h2: "Qu'est-ce qu'une due diligence technologique ?",
  para1: "La due diligence technologique est l'examen, avant une acquisition ou une cession, des droits que détient une société sur les technologies qui font sa valeur : logiciels, bases de données, contrats informatiques, systèmes d'intelligence artificielle et dispositifs de sécurité. Elle est aussi désignée par les termes due diligence IT, tech due diligence ou technology due diligence, et s'inscrit dans l'audit d'acquisition conduit par le conseil corporate.",
  pull: "La technologie fonctionne-t-elle ? Mais surtout : la société en détient-elle les droits, et pourra-t-elle continuer à l'exploiter après l'opération ?",
  moreSummary: "Côté acquéreur, côté cédant, et les trois moments de l'opération",
  more: [
    "Elle se pratique dans les deux sens. Côté acquéreur, elle documente ce qui est acheté et alimente la négociation. Côté cédant, la vendor due diligence — l'audit conduit par le vendeur avant la mise en vente — permet de régulariser ce qui peut l'être et de présenter un dossier tenable plutôt que de subir les découvertes de l'acquéreur.",
    "Trois moments structurent l'intervention : la lettre d'intention (LOI), document par lequel l'acquéreur formalise son intérêt et les grands paramètres de l'opération ; le contrat de cession (SPA, share purchase agreement), qui porte les garanties ; et le closing, date de réalisation effective du transfert.",
  ],
};

export const AUDIT = {
  eyebrow: "Périmètre",
  h2: "Audit juridique et audit technique : deux examens complémentaires",
  lede: "L'audit technique examine la robustesse, l'architecture et les performances de la technologie. L'audit juridique établit les droits détenus sur les actifs, les conditions de leur transmission et les risques contractuels ou réglementaires attachés à leur exploitation. Le rapprochement de ces analyses permet d'apprécier les conséquences concrètes sur l'opération.",
  synth: [
    { label: "Audit technique", q: "La solution fonctionne-t-elle et tiendra-t-elle la croissance prévue ?", eff: "Effet : plan d'intégration, budget technique après l'acquisition." },
    { label: "Audit juridique · le cabinet", q: "La société détient-elle ce qu'elle exploite, et pourra-t-elle continuer à l'exploiter ?", eff: "Effet : prix, conditions suspensives, garanties du contrat de cession, calendrier.", accent: true },
  ],
  moreSummary: "Deux examens, deux questions distinctes : comparaison détaillée",
  cols: ["Point d'examen", "Audit technique", "Audit juridique"],
  rows: [
    { k: "Objet", tech: "Architecture, qualité du code, dette technique, capacité à monter en charge.", jur: "Titularité des droits, transmissibilité des contrats, licéité des usages." },
    { k: "Question posée", tech: "La solution fonctionne-t-elle et tiendra-t-elle la croissance prévue ?", jur: "La société détient-elle ce qu'elle exploite, et pourra-t-elle continuer à l'exploiter ?" },
    { k: "Matière examinée", tech: "Dépôts de code, infrastructures, journaux, tests, indicateurs de production.", jur: "Contrats de prestation et de travail, licences, CGU, registres RGPD, polices d'assurance." },
    { k: "Matière produite", tech: "Cartographie technique, estimation des coûts de reprise et des délais.", jur: "Constats juridiques, clauses du contrat de cession, plan de régularisation." },
    { k: "Risque révélé", tech: "Coût de reprise, délai de refonte, incidents d'exploitation.", jur: "Revendication d'un tiers, perte d'un contrat, restriction dans la réutilisation des données." },
    { k: "Effet sur l'opération", tech: "Plan d'intégration, budget technique après l'acquisition.", jur: "Prix, conditions suspensives, garanties du contrat de cession, calendrier." },
  ],
};

export const METHODE = {
  eyebrow: "Méthode",
  h2: "Auditer, traduire, remédier",
  lede: "Trois temps, adossés aux moments de l'opération.",
  steps: [
    { meta: "Avant la lettre d'intention, puis en data room", big: "Auditer", p: "Établir ce que la cible détient réellement sur son code, ses composants tiers, ses contrats, ses données, sa sécurité et ses systèmes d'IA." },
    { meta: "Effet sur le prix, le calendrier et le contrat", big: "Traduire", p: "Convertir chaque constat en décision : poursuivre, demander une pièce, régulariser, conditionner, garantir ou budgéter." },
    { meta: "Régularisations avant closing, plan après", big: "Remédier", p: "Obtenir les cessions de droits et accords manquants avant la réalisation, puis sécuriser l'intégration une fois l'opération conclue." },
  ],
};

/** Six volets d'audit — bodies conservés à l'identique (before/lien/après). */
export const AUDITER = {
  eyebrow: "01 · Auditer",
  h2: "Les actifs et droits examinés",
  lede: "Six examens, conduits sur pièces et sur entretiens, adaptés au périmètre et au calendrier de l'opération.",
  items: [
    { k: "01", titre: "Propriété du code", before: "La question n'est pas de savoir qui a écrit le logiciel, mais à qui il appartient. Le code produit par les salariés dans le cadre de leurs fonctions revient en principe à l'employeur, sous conditions ; celui produit par des prestataires, freelances ou agences n'est transféré que si le contrat comporte une cession de droits expresse, portant sur des droits identifiés, pour une durée et un territoire déterminés. Sont examinés les contrats de prestation, les statuts des fondateurs développeurs, les conventions avec les écoles ou stagiaires et les éventuels apports en nature. Une chaîne de titularité incomplète se traite avant le transfert : voir l'", lien: "audit des contrats et droits sur les logiciels", href: CONTRATS, after: "." },
    { k: "02", titre: "Composants tiers et open source", before: "Un produit logiciel intègre presque toujours des bibliothèques de tiers. Chacune est soumise à une licence, dont certaines imposent des obligations à celui qui distribue le produit : mise à disposition du code source, maintien des mentions, extension des obligations de réciprocité à tout ou partie du logiciel distribué, selon la licence concernée et les conditions d'intégration du composant. L'examen porte sur l'inventaire des dépendances, le mode de distribution retenu et la compatibilité des licences avec le modèle économique de la cible. Il couvre également les composants sous licence commerciale dont les droits d'usage ne suivent pas nécessairement le changement d'actionnaire. Voir la ", lien: "sécurisation des licences et composants logiciels", href: CONTRATS, after: "." },
    { k: "03", titre: "Contrats et revenus", before: "Le chiffre d'affaires récurrent n'a de valeur que s'il survit à l'opération. L'examen porte sur les principaux contrats clients et fournisseurs : clauses de changement de contrôle, cessibilité, durée et reconduction, niveaux de service et pénalités, exclusivités, plafonds de responsabilité, clauses de réversibilité et dépendances critiques à un hébergeur ou à un éditeur unique. Les contrats les plus contraignants ne sont pas toujours les plus visibles dans la data room ; leur identification conditionne la rédaction des garanties. Voir ", lien: "contrats informatiques et responsabilité", href: CONTRATS, after: "." },
    { k: "04", titre: "Données", before: "Les bases de données figurent souvent parmi les actifs les plus valorisés. L'examen porte sur l'origine des données, les finalités déclarées lors de la collecte, les bases légales retenues, l'information des personnes, les durées de conservation, les transferts hors Union européenne et les rôles respectifs de responsable de traitement et de sous-traitant. Il détermine ce que l'acquéreur pourra faire des données après l'opération : poursuivre les traitements existants, accomplir les formalités nécessaires pour de nouveaux usages ou renoncer aux exploitations qui ne disposent pas d'un fondement juridique suffisant. Voir l'", lien: "audit RGPD des données de la cible", href: RGPD, after: "." },
    { k: "05", titre: "Cybersécurité", before: "Un incident non traité se transmet avec la société. L'examen porte sur les incidents survenus et leur traitement, les notifications effectuées, les engagements pris auprès des clients, la couverture d'assurance et son maintien après le transfert, ainsi que sur les obligations réglementaires applicables à l'activité de la cible et de ses propres clients. Il identifie les écarts susceptibles de fonder une réclamation ultérieure ou d'imposer un investissement rapide après l'opération. Voir l'", lien: "audit des risques cyber et obligations NIS 2", href: CYBER, after: "." },
    { k: "06", titre: "Systèmes d'intelligence artificielle", before: "Lorsque la valeur repose sur un modèle, trois questions se posent. Sur quoi le modèle a-t-il été entraîné, et dans quelles conditions ces données pouvaient-elles l'être ? Quels sont les droits attachés aux modèles tiers utilisés : usage commercial, adaptation, redistribution, propriété des sorties ? Quelles obligations pèsent sur la société au titre du règlement européen sur l'intelligence artificielle, selon sa qualification et le niveau de risque de ses systèmes ? L'examen établit ce qui est transférable en l'état et ce qui suppose une adaptation. Voir la ", lien: "conformité des systèmes d'intelligence artificielle", href: IA, after: "." },
  ],
};

/* Démonstration — composant à onglets. Cinq exemples fictifs (déclaration → constat → effet). */
export const DEMO = {
  eyebrow: "Démonstration",
  h2: "Ce que l'audit fait apparaître",
  lede: "L'écart entre ce qu'une data room déclare et ce que les pièces établissent constitue l'essentiel du travail.",
  hint: "Exemple illustratif · société fictive · déclaration → constat → effet",
  rows: [
    { court: "Code", decl: "« Le code de la plateforme est développé en interne. »", constat: "Deux modules essentiels ont été écrits par un prestataire, sur un contrat sans clause de cession de droits.", effet: "Régularisation recherchée avant le closing ; à défaut, condition suspensive ou garantie spécifique." },
    { court: "Open source", decl: "« Aucune dépendance open source contraignante. »", constat: "Une bibliothèque sous licence réciproque est intégrée au produit distribué aux clients.", effet: "Remplacement du composant, ou réexamen du mode de distribution et des engagements pris aux clients." },
    { court: "Données", decl: "« Les données d'usage alimentent le modèle de revenus. »", constat: "Les conditions de collecte ne mentionnent ni l'entraînement d'un modèle ni la transmission à un tiers.", effet: "Réexamen des finalités et du fondement juridique ; limitation éventuelle du périmètre d'exploitation retenu dans la valorisation." },
    { court: "Contrats", decl: "« Les principaux contrats clients sont transférables. »", constat: "Trois contrats comportent une clause de changement de contrôle ouvrant une faculté de résiliation.", effet: "Accords des clients recherchés avant la réalisation ; à défaut, ajustement de prix ou complément de prix différé." },
    { court: "IA", decl: "« Le moteur d'IA repose sur un modèle sous licence. »", constat: "La licence exclut l'usage commercial et l'adaptation du modèle sur les données des clients.", effet: "Négociation d'une licence adaptée ou engagement de migration inscrit au contrat." },
  ],
  note: "La gravité d'un constat et son traitement dépendent de la cible, du prix, de la structure de l'opération et des objectifs de l'acquéreur ou du cédant. Aucun classement automatique n'est appliqué : chaque point est apprécié dans le contexte de l'opération.",
};

/* Traduire — les neuf décisions, regroupées par objectif, + lexique SPA. */
export const TRADUIRE = {
  eyebrow: "02 · Traduire",
  h2: "Du constat à la décision transactionnelle",
  lede: "Chaque constat se traduit en décision utilisable dans la négociation et dans le contrat.",
  groups: [
    { h3: "Poursuivre ou compléter", items: [
      "Poursuivre l'opération sans modification, le point étant sans effet sur la valeur ou l'exploitation.",
      "Demander une pièce complémentaire lorsque la data room ne permet pas encore de conclure.",
    ] },
    { h3: "Régulariser avant le closing", items: [
      "Régulariser avant la réalisation : cession de droits, accord d'un tiers, mise à jour d'une politique ou d'un contrat.",
      "Ériger la régularisation en condition suspensive, l'opération ne se réalisant qu'une fois le point réglé.",
    ] },
    { h3: "Protéger l'acquéreur dans le SPA", items: [
      "Rédiger une garantie spécifique, distincte des garanties générales, couvrant précisément le point identifié.",
      "Prévoir une indemnisation dédiée, plafonnée et limitée dans le temps.",
      "Retenir une part du prix ou la placer sous séquestre jusqu'à la levée du point.",
    ] },
    { h3: "Traiter après le closing", items: [
      "Prendre un engagement post-closing : migration, remplacement d'un composant, mise en conformité dans un délai convenu.",
      "Intégrer le point à l'équation économique de l'opération, en le documentant et en le budgétant.",
    ] },
  ],
  glossTitle: "Les protections à intégrer au SPA, en clair",
  gloss: [
    { dt: "Condition suspensive", dd: "Ce qui doit être régularisé avant le closing pour que l'opération se réalise." },
    { dt: "Garantie spécifique", dd: "La protection prévue au contrat si ce risque précis se réalise, en complément de la garantie d'actif et de passif." },
    { dt: "Séquestre", dd: "Une part du prix bloquée jusqu'à ce que le point soit réglé." },
    { dt: "Clause de changement de contrôle", dd: "La clause qui permet à un cocontractant de résilier ou de renégocier lorsque la société change de mains." },
    { dt: "Copyleft", dd: "Une licence libre susceptible d'imposer la diffusion du code qui l'intègre." },
  ],
};

/* CTA intermédiaire — un seul, deux portes. */
export const MID = {
  phrase: "Une opération en préparation ? Le volet technologique se qualifie dès la lettre d'intention.",
};

export const REMEDIER = {
  eyebrow: "03 · Remédier",
  h2: "Rendre les actifs exploitables avant et après le closing",
  avantT: "Avant le closing",
  avant: [
    "Obtenir les cessions de droits manquantes auprès des prestataires et anciens développeurs.",
    "Recueillir les accords des clients et fournisseurs visés par une clause de changement de contrôle.",
    "Remplacer ou isoler les composants dont la licence est incompatible avec la distribution du produit.",
    "Mettre à jour les mentions d'information, politiques et registres relatifs aux données.",
    "Régulariser les relations avec les sous-traitants et hébergeurs, y compris hors Union européenne.",
    "Documenter les incidents de sécurité passés et les mesures prises.",
    "Constituer la partie technologique de la data room, du côté cédant.",
  ],
  apresT: "Après le closing",
  apres: [
    "Exécuter les engagements souscrits au contrat dans les délais convenus.",
    "Reprendre les contrats transférés et harmoniser les conditions générales du groupe.",
    "Migrer ou remplacer les composants et modèles dont les droits n'ont pas été obtenus.",
    "Intégrer les traitements de données dans la gouvernance de l'acquéreur.",
    "Aligner le niveau de sécurité et les obligations réglementaires sur celles du groupe.",
    "Reconstituer la chaîne de titularité sur les développements postérieurs à l'opération.",
    "Suivre les points laissés ouverts jusqu'à l'expiration des garanties.",
  ],
};

/* Livrables — grille des huit (4×2). Textes repris mot pour mot ; « Rapport de
   red flags prioritaires » devient « Rapport de points bloquants ». La carte 08
   (livrable vendeur) est sur fond bleu nuit. Sous-phrase à valider (§8). */
export const LIVRABLES = {
  eyebrow: "Livrables",
  h2: "Ce que vous recevez",
  lede: "Les documents remis dépendent du périmètre et du calendrier de chaque mission.",
  items: [
    { num: "01", h3: "Rapport de points bloquants", p: "Les constats susceptibles d'arrêter ou de reconfigurer l'opération, présentés en tête de rapport." },
    { num: "02", h3: "Matrice des risques par actif", p: "Code, composants tiers, contrats, données, sécurité et IA, avec le traitement proposé pour chacun." },
    { num: "03", h3: "Liste des pièces manquantes", p: "Les documents à demander à la cible, classés par ordre d'utilité pour la décision." },
    { num: "04", h3: "Projet de conditions suspensives", p: "La rédaction des points dont dépend la réalisation de l'opération." },
    { num: "05", h3: "Garanties technologiques du contrat", p: "Déclarations et garanties propres aux logiciels, données, licences et systèmes d'IA." },
    { num: "06", h3: "Plan de remédiation avant closing", p: "Les actions à conduire, leur ordre, leur responsable et leur délai." },
    { num: "07", h3: "Feuille de route après closing", p: "Les engagements à exécuter et les points à suivre jusqu'à l'expiration des garanties." },
    { num: "08", h3: "Dossier de cession — livrable vendeur", p: "Data room technologique préparée, régularisations conduites en amont et garanties anticipées.", dark: true },
  ],
};

export const SITUATIONS = {
  eyebrow: "Structures d'opération",
  h2: "Des diligences adaptées à l'actif et à la structure de l'opération",
  cards: [
    { h3: "Éditeur de logiciel ou SaaS", p: "Le périmètre suit le contrat d'abonnement : cessibilité du parc clients, engagements de service, réversibilité et dépendance à l'hébergeur. L'audit s'étend aux contrats fournisseurs sans lesquels le service ne peut être rendu." },
    { h3: "Société d'intelligence artificielle", p: "L'examen se concentre sur les droits attachés aux jeux d'entraînement, aux modèles tiers et aux sorties produites, ainsi que sur la qualification de la société au regard du règlement européen sur l'IA." },
    { h3: "Vendor due diligence", p: "Conduite pour le compte du cédant avant la mise en vente. Le périmètre est le même, mais le calendrier est inversé : régulariser d'abord, documenter ensuite, exposer enfin dans un dossier tenable." },
    { h3: "Plateforme ou marketplace", p: "L'audit porte sur la qualification de l'intermédiaire, les obligations tenant aux contenus et aux vendeurs tiers, les flux de paiement et les conditions générales applicables aux deux faces du marché." },
    { h3: "Carve-out", p: "Détacher une activité d'un groupe suppose de séparer ce qui était mutualisé : licences groupe, outils partagés, contrats-cadres, équipes et traitements de données. Le périmètre transféré se construit ligne à ligne." },
    { h3: "Acquisition d'actifs technologiques", p: "L'opération porte sur des éléments identifiés — logiciel, marque, base de données, contrats — et non sur les titres de la société. Chaque actif doit être individuellement cessible et effectivement cédé." },
  ],
};

export const TEAM = {
  eyebrow: "Le cabinet · fusions-acquisitions technologiques, Paris",
  h2: "Une pratique quotidienne des actifs numériques",
  membres: [
    { slug: "alexandre", role: "Actifs numériques, propriété du code et due diligence technologique.", tags: ["Actifs numériques", "Propriété du code", "Due diligence"] },
    { slug: "amir", role: "Contrats, garanties du contrat de cession et remédiation.", tags: ["Contrats", "Garanties SPA", "Remédiation"] },
    { slug: "sarah", role: "Données personnelles et conformité de la cible.", tags: ["RGPD", "Données", "Conformité"] },
  ],
  closing:
    "Lazarègue Avocats réunit ses compétences en droit des logiciels, contrats informatiques, données personnelles, intelligence artificielle, plateformes et cybersécurité afin d'examiner les actifs technologiques dans leur ensemble. Les constats juridiques peuvent être rapprochés des analyses du conseil corporate et de l'expert technique intervenant sur l'opération.",
  liensIntro: "Pour approfondir : ",
  liens: [
    { href: RGPD, label: "données personnelles" },
    { href: CONTRATS, label: "contrats informatiques" },
    { href: CYBER, label: "cybersécurité" },
    { href: IA, label: "systèmes d'IA" },
  ],
};

export const FAQ: { q: string; a: string }[] = [
  { q: "Pouvez-vous intervenir aux côtés du cabinet qui conduit l'opération ?", a: "Oui. Le cabinet examine les actifs technologiques, qualifie les incidences juridiques des constats et prépare les clauses ou recommandations correspondantes. Il coordonne son intervention avec le conseil corporate selon le calendrier et le format retenus pour l'opération." },
  { q: "Quelle différence avec l'audit technique ?", a: "L'audit technique apprécie notamment l'architecture, la robustesse, la performance et la capacité d'évolution de la solution. L'audit juridique établit les droits sur le code et les données, la portée des licences, la continuité des contrats et les garanties à intégrer à l'opération. Ces analyses répondent à des questions différentes et peuvent être rapprochées." },
  { q: "À quel moment faut-il lancer les diligences ?", a: "Au plus tard à l'ouverture de la data room, et utilement avant la lettre d'intention lorsque la valeur repose entièrement sur la technologie. Plus les constats sont établis tôt, plus les options restent ouvertes : régularisation, aménagement contractuel ou ajustement économique." },
  { q: "Combien de temps prennent-elles ?", a: "La durée dépend du périmètre retenu, de la qualité de la data room et de la disponibilité des interlocuteurs de la cible. Le calendrier est arrêté avec le conseil corporate au début de la mission, et une première note de red flags prioritaires peut être remise avant le rapport complet." },
  { q: "Pourrons-nous réutiliser les données de la cible ?", a: "Cela dépend des finalités annoncées lors de la collecte, des bases légales retenues et de l'information délivrée aux personnes. L'audit distingue les usages pouvant se poursuivre en l'état, ceux qui nécessitent une information, un consentement ou un autre fondement approprié, et ceux qui ne pourront pas être poursuivis dans les conditions envisagées." },
  { q: "Que recouvre une vendor due diligence ?", a: "Le même examen, conduit pour le cédant avant la mise en vente. Il permet de régulariser ce qui peut l'être, de préparer la partie technologique de la data room et d'anticiper les garanties qui seront demandées, plutôt que de découvrir les difficultés sous la pression du calendrier." },
  { q: "Comment sont fixés le périmètre et le coût ?", a: "Le périmètre est arrêté après un premier échange sur la cible, les actifs concernés et le stade de l'opération. La mission et son coût sont définis par écrit avant tout démarrage, selon le nombre d'examens retenus et le calendrier ; les extensions éventuelles font l'objet d'un accord distinct." },
];

export const CONTACT_SECTION = {
  eyebrow: "Prendre contact",
  h2: "Faire qualifier le volet technologique de l'opération",
  lede: "Un premier échange permet d'identifier les actifs concernés, les risques prioritaires, le calendrier de l'opération et le périmètre d'intervention adapté.",
  cta1: "Faire auditer une cible",
  cta2: "Préparer une cession tech",
  coord: "18 rue de Tilsitt, 75017 Paris · intervention dans toute la France",
  tel: "01 81 70 62 00",
  email: "contact@lazaregue-avocats.fr",
};
