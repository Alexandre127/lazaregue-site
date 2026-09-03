/**
 * Article « Qu'est-ce qu'une œuvre originale ? »
 *
 * Contenu rédigé par le cabinet, repris à l'identique de la maquette validée.
 * Les textes juridiques (références d'arrêts, articles du CPI) ne doivent pas
 * être reformulés sans validation.
 */

export type Bloc =
  | { t: "h3"; x: string }
  | { t: "p"; x: string }
  | { t: "bullet"; x: string }
  | { t: "note"; x: string }
  | { t: "case"; lead: string; x: string }
  | { t: "pratique"; lead: string; x: string }
  | { t: "midcta"; x: string; lead: string }
  | { t: "img"; src: string; cap: string; capHref: string; capLabel: string };

export type Section = { id: string; h2: string; num?: string; blocks: Bloc[] };

export const ARTICLE = {
  slug: "oeuvre-originale",
  domain: "Propriété intellectuelle",
  h1: "Qu'est-ce qu'une œuvre originale ?",
  date: "12 mars 2026",
  dateISO: "2026-03-12",
  read: "12 min",
  chapo:
    "Le droit d'auteur ne protège pas toutes les créations, mais une seule catégorie : celles qui franchissent le seuil de l'originalité. Le principe tient en une ligne ; son application occupe les tribunaux depuis quarante ans.",
  ctaText:
    "Vous avez réuni vos pièces ? Le cabinet évalue le caractère original de votre création et vous dit, concrètement, ce qui est défendable et comment agir.",
  cover: {
    src: "/images/ressources/oeuvre-originale-couverture.jpg",
    alt: "Œuvre picturale",
    cap: "L'originalité ne se confond pas avec la nouveauté : un même motif, traité par plusieurs auteurs, donne autant d'œuvres protégeables.",
  },
};

/** Regroupements du sommaire. */
export const GROUPES = [
  { step: "01", label: "Comprendre", ids: ["definition", "apprecier"] },
  { step: "02", label: "Appliquer", ids: ["juges", "numerique", "proteger"] },
  { step: "03", label: "Agir", ids: ["dossier", "conclusion"] },
];

/** Titre de la section check-list, insérée entre « proteger » et « conclusion ». */
export const DOSSIER = {
  id: "dossier",
  h2: "Préparer votre dossier",
  intro:
    "Avant tout litige, réunissez les éléments qui rendront l'originalité démontrable.",
};

export const SECTIONS: Section[] = [
    {
      id: "definition", h2: "Œuvre originale : définition",
      blocks: [
        { t: "h3", x: "Une conception subjective, héritée des arts" },
        { t: "p", x: "Le Code de la propriété intellectuelle pose d'abord une approche large et neutre : l'article L112-1 protège les droits des auteurs sur toutes les œuvres de l'esprit « quels qu'en soient le genre, la forme d'expression, le mérite ou la destination ». Aucune hiérarchie de valeur, donc." },
        { t: "p", x: "Historiquement, l'originalité se conçoit de manière subjective : une création est protégée lorsqu'elle porte l'empreinte de la personnalité de son auteur. Cette approche vient des arts, domaine d'origine du droit d'auteur." },
        { t: "img", src: "/images/ressources/oeuvre-originale-fresque.jpg", cap: "Née dans les arts, la notion d'originalité y trouve son image la plus forte : l'empreinte de la personnalité de l'auteur.", capHref: "#apprecier", capLabel: "Comment l'apprécier" },
        { t: "p", x: "Mais ce rattachement aux arts ne dispense jamais de caractériser juridiquement l'originalité. La Cour de cassation censure une décision écartant la protection d'un modèle de portail au motif que sa forme serait « tout à fait banale », sans rechercher si la combinaison des éléments pouvait constituer une conception originale (Cass. 1re civ., 12 septembre 2018, n° 17-18.390)." },
        { t: "h3", x: "Le basculement vers une conception objective" },
        { t: "p", x: "Dès 1997, la Cour de cassation érige l'originalité en condition unique et préalable : les œuvres de l'esprit sont protégées « à la seule condition qu'elles présentent un caractère original » (Cass. 1re civ., 11 février 1997, n° 95-13.176)." },
        { t: "p", x: "L'arrêt fondateur reste celui de l'Assemblée plénière du 7 mars 1986 (n° 83-10.477), rendu à propos d'un logiciel. La Cour y exige de l'auteur « un effort personnalisé allant au-delà de la simple mise en œuvre d'une logique automatique et contraignante », dont la matérialisation réside « dans une structure individualisée ». L'originalité devient un apport intellectuel objectivable, inscrit dans la forme." },
        { t: "p", x: "Corollaire constant : elle ne se confond pas avec la nouveauté. Dans l'affaire Tod's, la Cour refuse la protection à un modèle reprenant la combinaison essentielle d'un modèle antérieur, l'ajout de semelles à picots relevant d'une simple tendance de la mode (Cass. 1re civ., 20 mars 2014, n° 12-18.518)." },
        { t: "h3", x: "L'unification européenne : « la création intellectuelle propre à son auteur »" },
        { t: "p", x: "La Cour de justice de l'Union européenne a fixé un standard autonome et uniforme : le droit d'auteur ne s'applique qu'à un objet original « en ce sens qu'il est une création intellectuelle propre à son auteur » (CJCE, 16 juillet 2009, C-5/08, Infopaq)." },
        { t: "p", x: "Une création l'est « lorsqu'elle reflète la personnalité » de l'auteur, ce qui suppose qu'il ait pu exprimer ses capacités créatives « en effectuant des choix libres et créatifs » (CJUE, 1er décembre 2011, C-145/10, Painer)." },
        { t: "p", x: "Deux arrêts complètent le dispositif. Cofemel écarte tout seuil spécifique pour les arts appliqués : les mêmes critères s'appliquent partout (C-683/17). Levola ajoute une condition d'expression — l'objet doit être identifiable « avec suffisamment de précision et d'objectivité » —, ce qui exclut la saveur d'un produit alimentaire (C-310/17)." },
      ],
    },
    {
      id: "apprecier", h2: "Comment apprécier l'originalité ?",
      blocks: [
        { t: "h3", x: "Une appréciation d'ensemble" },
        { t: "p", x: "C'est la règle la plus fréquemment rappelée, et la plus souvent méconnue : « l'originalité d'une œuvre doit être appréciée dans son ensemble au regard des différents éléments qui la composent, pris en leur combinaison » (Cass. 1re civ., 12 septembre 2018)." },
        { t: "p", x: "Un juge ne peut donc écarter la protection en qualifiant chaque élément de banal ou de fonctionnel pris isolément, sans examiner la manière dont ils sont assemblés. Trois cassations l'illustrent :" },
        { t: "case", lead: "Le portail", x: "La cour d'appel avait jugé que la structure d'un panneau ne pouvait « à elle seule » constituer une conception originale, sans se prononcer sur la combinaison revendiquée (n° 17-18.390)." },
        { t: "case", lead: "La lampe", x: "Les juges n'avaient pas pris en compte toutes les caractéristiques invoquées — source lumineuse invisible, arches fines s'effaçant derrière le tableau — se limitant à des éléments jugés fonctionnels (n° 19-11.258)." },
        { t: "case", lead: "Le meuble", x: "La Cour censure un arrêt qui isolait un encadrement partiellement évidé sans analyser l'ensemble (Cass. 1re civ., 9 avril 2026, n° 25-11.711)." },
        { t: "h3", x: "Ce qui exclut l'originalité : la contrainte technique" },
        { t: "p", x: "L'originalité fait défaut lorsque la forme est imposée par des considérations techniques ne laissant aucune place à la liberté créative. Le droit d'auteur protège les expressions, non les idées." },
        { t: "p", x: "L'arrêt Brompton Bicycle fixe l'équilibre : une forme nécessaire à un résultat technique peut être protégée si l'auteur a malgré tout exprimé sa capacité créative par des choix libres ; mais si la forme est « uniquement dictée » par la fonction, la protection est écartée (CJUE, 11 juin 2020, C-833/18)." },
        { t: "img", src: "/images/ressources/oeuvre-originale-atelier.jpg", cap: "« Des choix libres et créatifs » : c'est dans les partis pris de l'auteur, non dans la seule technique, que se loge l'originalité.", capHref: "#juges", capLabel: "La preuve devant les juges" },
        { t: "midcta", x: "Une création de votre entreprise est-elle vraiment protégée ?", lead: "Préparer mon dossier" },
        { t: "p", x: "La Cour de cassation ajoute deux avertissements : le caractère créatif des choix ne se présume pas, et l'effet esthétique ne suffit pas à établir une création intellectuelle reflétant la personnalité de l'auteur (Cass. 1re civ., 9 avril 2026)." },
        { t: "h3", x: "La protection des parties originales" },
        { t: "p", x: "Les parties d'une œuvre sont protégées dès lors qu'elles « contiennent certains des éléments qui sont l'expression de la création intellectuelle propre à l'auteur ». Dans Infopaq, un extrait de onze mots consécutifs peut ainsi constituer une reproduction partielle protégée." },
        { t: "p", x: "En matière de logiciel, la distinction est nette : les mots-clés, la syntaxe et les commandes pris isolément ne sont pas une création intellectuelle, mais leur choix et leur combinaison au sein d'un manuel peuvent l'être (CJUE, 2 mai 2012, C-406/10, SAS Institute)." },
      ],
    },
    {
      id: "juges", h2: "L'originalité à l'épreuve des juges",
      blocks: [
        { t: "h3", x: "Quand et comment apporter la preuve" },
        { t: "p", x: "La question surgit presque toujours dans le même cadre : une action en contrefaçon, où le défendeur conteste la protection en invoquant l'absence d'originalité. La charge de la preuve pèse sur celui qui revendique le droit d'auteur, et se fait in concreto." },
        { t: "case", lead: "Logiciels", x: "Produire les lignes de programmation, les codes, l'organigramme ou le matériel de conception préparatoire (Cass. 1re civ., 14 novembre 2013, n° 12-20.687)." },
        { t: "case", lead: "Bases de données", x: "Préciser quels choix de matières ou quelle disposition justifient l'architecture (Cass. 1re civ., 22 septembre 2011)." },
        { t: "case", lead: "Photographies", x: "Identifier les caractéristiques originales œuvre par œuvre, au-delà d'une « approche générale » (Cass. 1re civ., 30 novembre 2016, n° 15-17.301)." },
        { t: "note", x: "La preuve peut aussi passer par l'examen des antériorités. Dans l'affaire Tod's, c'est la comparaison avec un modèle antérieur qui a fait tomber l'originalité revendiquée." },
        { t: "h3", x: "L'office du juge" },
        { t: "p", x: "Les juges du fond disposent d'un pouvoir souverain : l'originalité est une question de fait (Cass. crim., 27 février 2018, n° 16-86.881). Ce pouvoir n'est pas discrétionnaire pour autant — la Cour de cassation casse les décisions qui se prononcent par affirmations générales. Elle exige des juges qu'ils :" },
        { t: "bullet", x: "recherchent concrètement l'empreinte de la personnalité ou les choix libres et créatifs ;" },
        { t: "bullet", x: "motivent leur décision en identifiant les éléments précis retenus ;" },
        { t: "bullet", x: "respectent l'indifférence du genre, de la forme, du mérite et de la destination (art. L112-1 CPI)." },
      ],
    },
    {
      id: "numerique", h2: "Œuvre originale et création numérique",
      blocks: [
        { t: "h3", x: "Logiciels, photographies, bases de données" },
        { t: "p", x: "Les logiciels sont expressément visés comme œuvres de l'esprit (art. L112-2, 13° CPI). Leur originalité réside dans les choix de conception : structure, organisation des modules, enchaînement des traitements. À l'inverse, la fonctionnalité, le langage de programmation ou le format de fichiers ne sont pas protégés en tant que tels (SAS Institute)." },
        { t: "p", x: "Les photographies relèvent du standard Painer : mise en scène, pose, éclairage, cadrage, angle et développement sont autant d'occasions d'imprimer une touche personnelle. Les bases de données sont protégées par le choix ou la disposition des matières (art. L112-3) — un classement purement alphabétique ou chronologique en est dépourvu." },
        { t: "h3", x: "Les productions générées par une intelligence artificielle" },
        { t: "p", x: "Il faut être direct : aucun texte ni aucune décision ne tranche aujourd'hui la question. Ni la Cour de cassation ni la Cour de justice ne se sont prononcées sur la qualification des productions générées par un système autonome." },
        { t: "p", x: "Le seul point d'appui est le standard général : une création intellectuelle propre à son auteur, reflétant sa personnalité par des choix libres et créatifs. La jurisprudence admet la protection lorsque le résultat se rattache à des choix humains — paramétrage, sélection, traitement — et la refuse pour une exécution automatique dépourvue de touche personnelle." },
        { t: "note", x: "En pratique, la question se déplace de l'outil vers la part de maîtrise humaine réellement exercée — d'où l'importance de conserver les éléments qui l'attestent." },
      ],
    },
    {
      id: "proteger", h2: "Protéger son œuvre et prouver sa paternité",
      blocks: [
        { t: "p", x: "La protection naît sans formalité : l'œuvre est réputée créée « du seul fait de la réalisation, même inachevée, de la conception de l'auteur » (art. L111-2 CPI). Le problème n'est donc jamais l'existence du droit, mais sa démonstration. Quatre réflexes s'imposent." },
        { t: "case", lead: "Documenter", x: "Brouillons, maquettes, versions successives, codes sources, organigrammes, notes de conception : ces pièces établissent l'apport intellectuel et la chronologie." },
        { t: "case", lead: "Identifier l'auteur", x: "Une personne morale ne peut être auteur (Cass. 1re civ., 15 janvier 2015, n° 13-23.566). En équipe, œuvre collective ou de collaboration commandent la titularité (art. L113-2 et L113-4 CPI)." },
        { t: "case", lead: "Anticiper", x: "Préparez, avant tout litige, la description des caractéristiques originales et de leur combinaison, et ce qui dépasse les seules contraintes techniques." },
        { t: "case", lead: "Contextualiser", x: "L'examen des antériorités fait partie du dossier, comme le montrent les affaires Tod's et Betec." },
        { t: "pratique", lead: "En pratique — ETI", x: "Un éditeur de logiciels de 480 salariés nous a consultés après qu'un concurrent eut repris l'architecture de son interface. Faute d'avoir daté ses versions et documenté ses choix de conception, la démonstration de l'originalité a demandé trois mois de reconstitution. Constituer le dossier en amont aurait divisé ce délai — et renforcé la position de négociation." },
      ],
    },
    {
      id: "conclusion", h2: "Conclusion", num: "",
      blocks: [
        { t: "p", x: "Une œuvre originale se définit aujourd'hui, en droit français comme européen, comme une création intellectuelle propre à son auteur : un objet identifiable avec précision, qui reflète sa personnalité à travers des choix libres et créatifs, au-delà des contraintes techniques." },
        { t: "p", x: "Retenez surtout ceci : l'originalité ne se présume pas. Elle se démontre, élément par élément, combinaison à l'appui — et cette démonstration se prépare bien avant l'assignation." },
      ],
    },
  ];

export const CHECKLIST: string[] = [
    "Vos brouillons, maquettes, versions successives et fichiers sources — datés : ils établissent l'apport intellectuel et la chronologie.",
    "Une description écrite des caractéristiques originales et, surtout, de leur combinaison d'ensemble.",
    "La part de vos choix libres et créatifs, distinguée de ce qui vous était imposé par la technique ou la fonction.",
    "L'identité du ou des auteurs et la titularité des droits (création salariée, prestataire, œuvre collective).",
    "Les antériorités que vous connaissez : créations proches, dépôts, publications antérieures.",
  ];

export type Faq = { q: string; a: string };
export const FAQ: Faq[] = [
    { q: "Faut-il déposer son œuvre pour être protégé par le droit d'auteur ?", a: "Non. La protection naît sans formalité, du seul fait de la création (art. L111-2 CPI). Le dépôt (huissier, INPI, société de gestion) ne conditionne pas le droit mais facilite la preuve de la paternité et de la date." },
    { q: "Originalité et nouveauté, est-ce la même chose ?", a: "Non. L'originalité est l'empreinte de la personnalité de l'auteur ou un ensemble de choix libres et créatifs ; la nouveauté relève du droit des brevets et des dessins et modèles. Une œuvre peut être originale sans être nouvelle." },
    { q: "Une création générée par une intelligence artificielle est-elle protégée ?", a: "Aucune décision ne tranche encore la question. La protection est admise lorsque le résultat se rattache à des choix humains (paramétrage, sélection, retouche) et refusée pour une exécution purement automatique dépourvue de touche personnelle." },
    { q: "Qui doit prouver l'originalité en cas de litige ?", a: "Celui qui revendique le droit d'auteur, dès lors que le défendeur conteste l'originalité. La preuve se fait in concreto, caractéristique par caractéristique, et l'appréciation relève du pouvoir souverain des juges du fond." },
  ];

export const RELATED = [
    { title: "Quel droit protège une œuvre de l'esprit ?", domain: "Propriété intellectuelle", read: "7 min" },
    { title: "L'œuvre collective : ce qu'il faut savoir", domain: "Propriété intellectuelle", read: "6 min" },
    { title: "Comment utiliser les licences Creative Commons ?", domain: "Propriété intellectuelle", read: "5 min" },
  ];
