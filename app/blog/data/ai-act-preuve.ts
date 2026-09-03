/**
 * Analyse « L'AI Act, un droit de la preuve de la conformité ? »
 *
 * Étude doctrinale rédigée par le cabinet, reprise à l'identique de la
 * maquette validée. Les références (articles du règlement, arrêts, avis)
 * ne doivent pas être reformulées sans validation.
 */

export type Bloc =
  | { t: "h3"; x: string }
  | { t: "p"; x: string }
  | { t: "lead"; lead: string; x: string }
  | { t: "quote"; x: string }
  | { t: "def"; defs: { term: string; def: string }[] }
  | { t: "cta"; x: string; ctaLabel: string };

export type Section = {
  id: string;
  num: string;
  h2: string;
  tocLabel: string;
  blocks: Bloc[];
};

export const ARTICLE = {
  slug: "ai-act-preuve-conformite",
  domain: "AI Act",
  registre: "Note de fond",
  date: "20 juil. 2026",
  dateISO: "2026-07-20",
  read: "22 min",
  h1: "L'AI Act, un droit de la preuve de la conformité ?",
  sub: "Fournisseurs, déployeurs et répartition des obligations dans le règlement (UE) 2024/1689.",
  author: "Alexandre Lazarègue",
  authorRole: "Avocat au barreau de Paris",
  excerpt:
    "Le règlement (UE) 2024/1689 n'exige pas que les systèmes soient sûrs, mais que leur sûreté puisse être démontrée. Qualification, rôles et charge documentaire avant le 2 août 2026.",
};

export const ESSENTIEL = [
  "Derrière l'apparente technicité du règlement (UE) 2024/1689 se dissimule une question plus fondamentale que celle du calendrier : le législateur européen a-t-il institué un droit des systèmes d'intelligence artificielle, ou un droit de la gouvernance documentaire ?",
  "Cette étude défend la seconde proposition. L'AI Act est moins un droit de l'intelligence artificielle qu'un droit de la preuve de la conformité : à de rares exceptions près, il n'exige pas que les systèmes soient sûrs, mais que leur sûreté puisse être démontrée, par des documents, à tout moment et plusieurs années après leur mise sur le marché.",
  "Pourquoi maintenant ? L'échéance du 2 août 2026 impose aux entreprises d'identifier leur qualité — fournisseur, déployeur ou intermédiaire — et les obligations qui en découlent. L'objet n'est pas de commenter le calendrier, mais de proposer une méthode d'analyse des obligations effectivement applicables à chaque acteur.",
];

export const SECTIONS: Section[] = [
  {
    id: "liminaire",
    num: "",
    h2: "Propos liminaire — pourquoi le 2 août 2026 constitue un tournant",
    tocLabel: "Pourquoi le 2 août 2026 est un tournant",
    blocks: [
      { t: "p", x: "L'échéance du 2 août 2026 marque une étape décisive dans l'entrée en application du règlement (UE) 2024/1689 du 13 juin 2024. Pour la plupart des opérateurs, le temps de l'anticipation laisse place à celui de la conformité. Une confusion doit toutefois être dissipée : cette date est présentée tantôt comme la « pleine application » du règlement, tantôt, depuis l'accord « omnibus numérique », comme une échéance vidée de sa substance. Les deux présentations sont inexactes." },
      { t: "lead", lead: "Ce qui devient applicable", x: "L'article 113 fixe au 2 août 2026 l'application de l'ensemble des dispositions restantes, vingt-quatre mois après l'entrée en vigueur du 1er août 2024. Les États doivent avoir mis en place au moins un bac à sable réglementaire. Surtout, c'est le premier moment où le règlement devient opposable à la généralité des opérateurs : jusqu'ici, seuls étaient concernés ceux recourant à une pratique prohibée (art. 5, interdite depuis le 2 février 2025) et les fournisseurs de modèles à usage général (depuis le 2 août 2025)." },
      { t: "lead", lead: "Ce qui demeure différé", x: "L'accord politique du 7 mai 2026 reporte l'exigibilité des obligations relatives aux systèmes à haut risque : au 2 décembre 2027 pour les systèmes autonomes de l'annexe III, au 2 août 2028 pour ceux intégrés à des produits déjà réglementés. Ce report ne supprime aucune obligation ; il en déplace la date d'exigibilité. Il s'explique par l'indisponibilité des normes harmonisées auxquelles l'article 43 subordonne la présomption de conformité." },
      { t: "p", x: "La contradiction n'est qu'apparente. L'accord du 7 mai 2026 demeure un texte politique appelé à être formellement adopté puis publié au JOUE. Tant que cette publication n'est pas intervenue, le calendrier de l'article 113 conserve seul force obligatoire. L'opérateur ne peut se prévaloir d'un report annoncé pour justifier une abstention constatée : prudence commande de traiter le report comme une opportunité de préparation, non comme une dispense." },
      { t: "lead", lead: "Ce que cela change concrètement", x: "Aucune obligation nouvelle ne naît le 2 août 2026 ; ce qui naît, c'est l'exigibilité de qualifications que beaucoup ont différées. Une entreprise incapable de dire, à cette date, quels de ses outils relèvent de l'article 3, quelle qualité elle revêt et quel niveau de risque leur est attaché, n'est pas seulement en retard : elle est dans l'impossibilité de savoir ce qu'elle doit. C'est cette impossibilité, et non le décompte des jours, qui constitue le véritable enjeu de l'été 2026." },
    ],
  },
  {
    id: "s1",
    num: "I",
    h2: "Nul n'est débiteur avant d'être qualifié",
    tocLabel: "Nul n'est débiteur avant d'être qualifié",
    blocks: [
      { t: "h3", x: "A. La qualification du système" },
      { t: "p", x: "L'article 3, point 1, définit le système d'IA comme un système automatisé conçu pour fonctionner avec des niveaux variables d'autonomie, susceptible de s'adapter après son déploiement et capable, à partir des données reçues, de déduire la manière de générer des prédictions, du contenu, des recommandations ou des décisions influençant des environnements physiques ou virtuels." },
      { t: "p", x: "Le critère déterminant réside dans l'existence d'un mécanisme d'inférence : ce qui caractérise un système d'IA n'est pas sa sophistication mais sa capacité à déterminer lui-même la manière de produire une sortie, par opposition à l'exécution de règles prédéterminées. Un moteur de règles métier, aussi complexe soit-il, demeure en principe étranger au règlement ; un modèle statistique simple peut parfaitement en relever." },
      { t: "p", x: "Cette approche fonctionnelle n'allait pas de soi : la Commission a dû en préciser la portée par des lignes directrices du 6 février 2025 identifiant sept critères cumulatifs. Qu'une notion aussi centrale trouve sa consistance dans un instrument de droit souple est critiquable — la qualification conditionne l'assujettissement et devrait relever du texte lui-même." },
      { t: "p", x: "Le champ territorial obéit à la même logique d'extension (art. 2, § 1). Le facteur de rattachement tiré de l'utilisation des seuls résultats dans l'Union est plus large que celui du RGPD : il ne suppose ni établissement, ni ciblage du marché européen, ni traitement de données personnelles. L'entreprise européenne qui exploite les sorties d'un système opéré depuis un État tiers ne saurait invoquer l'extranéité de son prestataire." },
      { t: "h3", x: "B. La qualification du rôle" },
      { t: "p", x: "C'est la question la plus importante du règlement : c'est d'elle que dépend la quasi-totalité des obligations et l'intensité de la charge." },
      {
        t: "def",
        defs: [
          { term: "Fournisseur", def: "développe ou fait développer un système d'IA et le met sur le marché ou en service sous son propre nom ou sa marque (art. 3, point 3)." },
          { term: "Déployeur", def: "utilise un système d'IA sous sa propre autorité, dans le cadre d'une activité professionnelle (art. 3, point 4)." },
          { term: "Intermédiaires", def: "mandataires, importateurs et distributeurs, tenus d'une mission de vérification de la conformité en amont (art. 22 à 24)." },
        ],
      },
      { t: "p", x: "Cette répartition n'est pas figée. Le déployeur devient fournisseur lorsqu'il commercialise le système sous son propre nom, en modifie substantiellement la destination ou l'intègre dans un produit mis sur le marché sous sa responsabilité. L'entreprise qui affine un modèle tiers avant de le distribuer sous sa marque n'est plus déployeur : elle est fournisseur, et supporte instantanément l'intégralité de la charge documentaire correspondante." },
      { t: "p", x: "Cette mutation de statut n'est, en pratique, identifiée qu'au moment d'un contrôle. C'est le risque juridique le plus sous-estimé du règlement, précisément parce qu'il ne procède d'aucune décision consciente : il résulte d'opérations commerciales ordinaires — marque blanche, intégration produit, réentraînement métier. La répartition conventionnelle des qualités doit être arrêtée dès la conception du projet, non constatée après coup." },
    ],
  },
  {
    id: "s2",
    num: "II",
    h2: "L'exception prohibitive : la seule strate qui échappe à la logique probatoire",
    tocLabel: "L'exception prohibitive (art. 5)",
    blocks: [
      { t: "p", x: "Une catégorie de dispositions s'impose indistinctement à tous les opérateurs : les interdictions de l'article 5. Elle constitue la seule exception à la thèse défendue. Sont notamment prohibés les techniques subliminales ou manipulatrices, l'exploitation des vulnérabilités, la notation sociale, la police prédictive fondée sur le seul profil, le moissonnage indiscriminé d'images faciales, l'inférence émotionnelle au travail et dans l'enseignement, la catégorisation biométrique sensible et, sauf exceptions, l'identification biométrique à distance en temps réel à des fins répressives." },
      { t: "quote", x: "Ici, et ici seulement, le règlement impose un résultat et non une démonstration. Il n'y a qu'une abstention." },
      { t: "p", x: "Cette singularité emporte une conséquence méthodologique : l'analyse d'un cas d'usage doit commencer par cette grille, avant tout raisonnement sur le niveau de risque et les obligations documentaires. Elle révèle aussi la méthode du règlement — la prohibition ne frappe presque jamais une technologie mais une finalité, appréciée en contexte. L'inférence émotionnelle n'est pas interdite en soi : elle l'est sur le lieu de travail. Un même dispositif d'analyse du sentiment sera licite pour mesurer les réactions d'un consommateur, illicite pour évaluer celles du téléconseiller. L'opérateur doit donc anticiper les finalités que son outil rend possibles." },
    ],
  },
  {
    id: "s3",
    num: "III",
    h2: "Le fournisseur, débiteur principal de la preuve",
    tocLabel: "Le fournisseur, débiteur de la preuve",
    blocks: [
      { t: "h3", x: "A. Le système à haut risque, ou la conformité réduite à son dossier" },
      { t: "p", x: "L'article 6, combiné aux annexes I et III, organise la qualification selon deux mécanismes : les composants de sécurité de produits déjà soumis à évaluation par un tiers, et — principale source en pratique — les systèmes autonomes employés dans des domaines sensibles : biométrie, infrastructures critiques, éducation, emploi, accès aux services essentiels (assurance, crédit), répression, migration, justice, processus démocratiques." },
      { t: "p", x: "C'est ici que la thèse trouve sa vérification la plus nette. Pris isolément, chacun des articles 9 à 21 est une obligation technique autonome ; pris ensemble, ils composent un dispositif dont la finalité n'est pas la sûreté du système mais son attestabilité. La gestion des risques (art. 9) n'impose pas d'éliminer les risques mais d'établir qu'ils ont été identifiés et réduits. La gouvernance des données (art. 10) exige la traçabilité des choix, non des jeux parfaits. La journalisation (art. 12) conserve la trace ; la conservation décennale (art. 18) garantit qu'un dossier subsistera dix ans après." },
      { t: "quote", x: "Le règlement n'exige pas seulement que le système soit conforme ; il exige que sa conformité demeure démontrable longtemps après sa mise sur le marché." },
      { t: "p", x: "Deux réserves affectent la faisabilité. La normalisation d'abord : l'article 43 institue une présomption de conformité au bénéfice des systèmes respectant les normes harmonisées ; leur indisponibilité rend l'obligation plus coûteuse à satisfaire pour l'opérateur de bonne foi que pour celui qui s'en désintéresse. L'asymétrie économique ensuite : constituer une gouvernance documentaire coûte à peu près autant pour dix systèmes que pour un seul, ce qui pèse davantage sur les opérateurs modestes." },
      { t: "h3", x: "B. Le modèle à usage général, ou la transparence au profit des tiers" },
      { t: "p", x: "Les trois obligations de l'article 53 — documentation technique communicable au Bureau de l'IA, information des intégrateurs, politique de conformité au droit d'auteur assortie d'un résumé détaillé des contenus d'entraînement — poursuivent une finalité unique : organiser la circulation de l'information dans la chaîne de valeur. Un modèle à usage général n'ayant pas de destination déterminée, le législateur a substitué à la démonstration de la maîtrise une démonstration de la transparence." },
      { t: "p", x: "L'obligation de publier un résumé des contenus d'entraînement est souvent mal analysée. Elle ne modifie ni les conditions de protection des œuvres, ni les exceptions, ni les actions ouvertes aux ayants droit : elle ne crée aucun droit substantiel nouveau. Son apport est de réduire une asymétrie informationnelle — l'identification même des œuvres utilisées. L'article 53 ne transforme pas le droit substantiel : il transforme les conditions probatoires de sa mise en œuvre, cette fois au bénéfice du tiers lésé plutôt que de l'autorité." },
      { t: "p", x: "L'exemption des modèles libres et ouverts cesse en présence d'un risque systémique, dont la caractérisation résulte du dépassement d'un seuil de puissance de calcul ou d'une décision de la Commission (obligations renforcées de l'art. 55). Ce critère est contestable : la puissance de calcul est un indicateur de moyens, non de risques. Le principal contentieux du règlement portera sur cette qualification." },
      { t: "cta", x: "Vous développez ou intégrez un système d'IA sous votre marque ?", ctaLabel: "Diagnostic fournisseur" },
    ],
  },
  {
    id: "s4",
    num: "IV",
    h2: "Le déployeur et les intermédiaires : de la conception à l'organisation",
    tocLabel: "Déployeur et intermédiaires",
    blocks: [
      { t: "p", x: "Les obligations du déployeur (art. 26) portent sur l'exploitation, non la conception : usage conforme à la notice, contrôle humain confié à des personnes formées, qualité des données d'entrée maîtrisées, surveillance, tenue des journaux, suspension en cas d'anomalie et information. Elles paraissent modestes ; l'impression est trompeuse, car la logique probatoire s'y transpose, déplacée du produit vers l'organisation." },
      { t: "p", x: "Chacune suppose une formalisation écrite : procédure d'usage opposable aux équipes, dispositif de formation dont la réalité puisse être établie, chaîne d'alerte identifiée, politique de conservation des journaux, traçabilité des interventions humaines. Le déployeur diligent qui n'a conservé aucune trace de sa diligence se trouve, en cas d'incident, dans la même position défensive que le déployeur négligent." },
      { t: "p", x: "De l'articulation des articles 14 et 26 découle un point essentiel : le fournisseur doit concevoir une interface permettant le contrôle humain ; le déployeur doit l'exercer. Or un dispositif offrant la faculté de contredire la sortie ne remplit sa fonction que si celui qui en dispose a la compétence, le temps et l'autorité pour en user. L'exigence est organisationnelle avant d'être technique — et c'est sur l'effectivité du contrôle, non son existence formelle, que se jouera l'essentiel du contentieux." },
      { t: "p", x: "Quant aux mandataires, importateurs et distributeurs (art. 22 à 24), leur contrôle est formel : vérifier l'existence de la documentation, des marquages, des enregistrements, et s'abstenir en présence d'une carence apparente. La régularité documentaire de la chaîne de distribution devient une condition de la commercialisation — méthode empruntée au droit de la sécurité des produits." },
      { t: "cta", x: "Vous utilisez un système d'IA dans votre activité ?", ctaLabel: "Audit déployeur" },
    ],
  },
  {
    id: "s5",
    num: "V",
    h2: "Les conditions d'administration de la preuve",
    tocLabel: "L'administration de la preuve",
    blocks: [
      { t: "p", x: "La première diligence s'impose d'elle-même : constituer, pour chaque système inventorié, un dossier unique rassemblant la qualification retenue, le rôle assumé, les analyses conduites, les décisions prises et leurs motifs. C'est ce dossier, et non le système, qui sera examiné." },
      { t: "p", x: "Mais l'exigence excède les diligences internes. Le fournisseur d'un système à haut risque ne satisfait aux articles 9 à 15 qu'à raison des informations que le fournisseur du modèle sous-jacent lui aura transmises : sa conformité dépend matériellement de la diligence de ses cocontractants. Les contrats de licence, d'intégration et d'accès par API doivent donc stipuler expressément les engagements documentaires, les droits d'audit, les modalités de notification des incidents et la répartition des responsabilités en cas de requalification." },
      { t: "p", x: "L'administration s'opérera devant une pluralité d'autorités : un Bureau de l'IA et un Comité européen, et, par État, au moins une autorité notifiante et une autorité de surveillance du marché. En France, le dispositif procède par extension de prérogatives existantes (DGCCRF, douanes, DGFiP ; ANFR pour les équipements radioélectriques), la CNIL conservant sa compétence sur les traitements de données personnelles. Pour l'entreprise contrôlée, la première difficulté sera d'identifier l'autorité compétente avant même de connaître le grief." },
      { t: "p", x: "Enfin, le règlement ne se substitue à aucun texte. Le RGPD continue de régir les traitements de données personnelles, l'AI Act y superposant des exigences propres au risque algorithmique : une AIPD ne saurait tenir lieu d'analyse d'impact sur les droits fondamentaux (art. 27). Le règlement s'insère aussi dans un ensemble comprenant le DMA et le Data Act, dont les exigences de portabilité conditionnent la réversibilité des solutions et la continuité de la documentation à maintenir." },
    ],
  },
];

export const TABLE_ROWS = [
  { role: "Tout opérateur", obl: "Abstention de toute pratique prohibée — seule obligation de résultat du règlement.", art: "art. 5" },
  { role: "Fournisseur d'un système à haut risque", obl: "Gestion des risques, gouvernance des données, documentation technique, journalisation, notice, contrôle humain, robustesse, gestion de la qualité, conservation décennale, analyse d'impact, évaluation de conformité, enregistrement, notification des incidents.", art: "art. 9 à 21, 27, 43, 49, 73" },
  { role: "Fournisseur d'un modèle à usage général", obl: "Documentation technique, information des intégrateurs, politique de droit d'auteur, résumé des contenus d'entraînement.", art: "art. 53" },
  { role: "Fournisseur d'un modèle à risque systémique", obl: "En sus : évaluations avancées, tests contradictoires, cybersécurité, notification des incidents graves, information de la Commission sous deux semaines.", art: "art. 52 § 1, 55" },
  { role: "Déployeur d'un système à haut risque", obl: "Usage conforme à la notice, contrôle humain effectif, qualité des données d'entrée, surveillance, journaux, suspension et information.", art: "art. 26" },
  { role: "Mandataire, importateur, distributeur", obl: "Vérification des diligences accomplies en amont ; abstention en cas de carence apparente.", art: "art. 22 à 24" },
];

export const CONCLUSION = [
  "Si la thèse ici défendue est exacte, l'AI Act ne modifie pas seulement le contenu des obligations des entreprises : il modifie la manière dont celles-ci devront concevoir leur gouvernance.",
  "Un droit de la preuve n'appelle pas les mêmes réflexes qu'un droit de la sécurité des produits. Il impose de documenter les décisions au moment où elles sont prises, et non de les reconstituer lorsqu'elles sont contestées ; d'écrire les raisonnements de qualification plutôt que de les tenir pour évidents ; de conserver dix ans des éléments dont l'utilité n'apparaîtra jamais si aucun contrôle n'intervient. Il déplace le centre de gravité de la conformité de la direction technique vers la direction juridique.",
  "À l'approche du 2 août 2026, la principale difficulté n'est plus de connaître la date d'entrée en application, mais d'avoir déjà qualifié les systèmes utilisés, identifié le rôle de chaque opérateur et réuni les éléments permettant d'en démontrer la conformité. Une date d'exigibilité se reporte ; une culture de la preuve ne s'improvise pas.",
];

export const NOTES = [
  { i: "1", text: "Règlement (UE) 2024/1689 du Parlement européen et du Conseil du 13 juin 2024 établissant des règles harmonisées concernant l'intelligence artificielle, JOUE 12 juill. 2024 ; entrée en vigueur le 1er août 2024." },
  { i: "2", text: "ARCEP, avis n° 25-1765, 4 sept. 2025." },
  { i: "3", text: "Sur la présentation du règlement comme instrument de confiance, v. les travaux préparatoires de la Commission : Livre blanc sur l'intelligence artificielle — Une approche européenne axée sur l'excellence et la confiance, COM(2020) 65 final, 19 févr. 2020." },
  { i: "4", text: "Commission européenne, lignes directrices relatives à la définition d'un système d'intelligence artificielle, 6 févr. 2025." },
  { i: "5", text: "ADLC, avis n° 24-A-05, 28 juin 2024, relatif au fonctionnement concurrentiel du secteur de l'intelligence artificielle générative." },
  { i: "6", text: "Sur la portée de l'article 53, § 1, d, v. l'articulation du résumé des contenus d'entraînement avec l'exception de fouille de textes et de données : dir. (UE) 2019/790 du 17 avr. 2019 sur le droit d'auteur dans le marché unique numérique, art. 4, transposé aux art. L. 122-5-3 et L. 342-3-1 du Code de la propriété intellectuelle." },
  { i: "7", text: "ADLC, avis n° 26-A-05, 17 juill. 2026, relatif au fonctionnement concurrentiel du secteur des agents d'intelligence artificielle." },
  { i: "8", text: "Loi n° 2024-449 du 21 mai 2024 visant à sécuriser et à réguler l'espace numérique, art. 28 et 29." },
];

export const AVERTISSEMENT =
  "La présente étude constitue une analyse doctrinale et ne saurait tenir lieu de consultation juridique sur une situation particulière.";

export const RELATED = [
  { title: "AI Act : les 4 niveaux de risque", domain: "AI Act", read: "8 min", href: "#" },
  { title: "Encadrer l'usage de l'IA générative en entreprise", domain: "AI Act", read: "12 min", href: "#" },
  { title: "Sécuriser un transfert de données hors UE", domain: "RGPD", read: "10 min", href: "#" },
];

/** Sommaire : les sections, puis le tableau et la conclusion. */
export const TOC = [
  ...SECTIONS.map((s) => ({ num: s.num || "—", label: s.tocLabel, href: `#${s.id}` })),
  { num: "§", label: "Tableau récapitulatif", href: "#tableau" },
  { num: "", label: "Conclusion", href: "#conclusion" },
];
