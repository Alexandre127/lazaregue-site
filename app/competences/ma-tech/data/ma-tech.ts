/**
 * Page M&A Tech — due diligence des actifs numériques.
 *
 * Contenu repris de la maquette validée. Les intitulés de section ont été
 * reformulés pour porter les requêtes réellement tapées par les acquéreurs
 * (« due diligence technologique », « audit juridique logiciel », « garanties
 * SPA », « acquisition SaaS ») sans modifier le fond.
 */

export const HERO = {
  eyebrow: "Lazarègue Avocats — droit du numérique",
  h1: "Avocat M&A Tech",
  sub: "Due diligence technologique et audit juridique des actifs numériques",
  triptyque: [
    "Une donnée peut avoir une forte valeur économique sans être juridiquement réutilisable par l'acquéreur.",
    "Un modèle performant peut ne pas être un actif maîtrisé.",
    "Un logiciel peut avoir été développé par des prestataires qui n'en ont jamais cédé les droits.",
  ],
  scope:
    "Nous intervenons sur le volet technologique des acquisitions, cessions et prises de participation : logiciels, données, contrats numériques, IA, infrastructures et cybersécurité.",
  scope2: "Aux côtés des acquéreurs, fonds, fondateurs et conseils corporate.",
};

/**
 * Bloc « Pour qui » — répond aux objections propres aux ETI industrielles ou
 * de services qui acquièrent une cible tech : pas de DSI dédiée, un cabinet
 * corporate déjà en place, une crainte sur le périmètre et le coût.
 */
export const POUR_QUI = {
  titre: "Vous acquérez une cible technologique sans être une entreprise tech",
  texte:
    "La plupart de nos interlocuteurs dirigent une PME ou une ETI industrielle, de distribution ou de services, ou investissent pour un fonds. Ils rachètent une société technologique pour se digitaliser ou pour la faire croître, sans disposer en interne d'une direction des systèmes d'information capable d'auditer ce qu'ils achètent.",
  points: [
    {
      /* Le private equity commandite l'essentiel des due diligence tech du
         marché ; la page ne s'adressait qu'aux acquéreurs industriels. */
      k: "Vous êtes un fonds d'investissement sans DSI en interne",
      v: "Nous tenons le stream technologique d'une opération de private equity : red flags avant LOI, revue complète en data room, et rédaction des garanties spécifiques du SPA.",
    },
    {
      k: "Vous avez déjà un cabinet corporate",
      v: "Nous intervenons sur le seul volet technologique, en co-conseil, sans reprendre le pilotage de l'opération.",
    },
    {
      k: "Vous n'avez pas d'équipe technique dédiée",
      v: "Nous traduisons les constats techniques en conséquences sur le prix, les garanties et le calendrier — pas en jargon d'ingénieur.",
    },
    {
      k: "Vous voulez connaître le périmètre avant de vous engager",
      v: "Le périmètre est arrêté après un premier échange sur la cible et ses actifs, avant toute intervention et toute facturation.",
    },
  ],
};

export const ECART = {
  titre: "Ce que l'acquéreur pense acheter, et ce qu'il doit vérifier",
  lignes: [
    { a: "Logiciel propriétaire", b: "Qui détient réellement le code ?" },
    { a: "Base utilisateurs", b: "Les données sont-elles réutilisables ?" },
    { a: "Revenus SaaS", b: "Les clients peuvent-ils résilier ?" },
    { a: "Modèle d'IA", b: "Les droits sur le modèle sont-ils acquis ?", hl: true },
    { a: "Infrastructure", b: "La cible peut-elle fonctionner seule ?" },
    { a: "Équipe technique", b: "Les personnes clés resteront-elles ?" },
  ],
  legende:
    "Chaque ligne non vérifiée est un écart entre le prix payé et l'actif acquis.",
};

/**
 * `lien` renvoie vers le domaine du cabinet que le point d'audit engage.
 * Un acquéreur qui rachète un SaaS doit voir que la même équipe traite le
 * RGPD, la cybersécurité et l'AI Act — c'est ce qui distingue une due
 * diligence tech d'une revue contractuelle générique.
 */
export type Domaine = {
  h3: string;
  p: string;
  lien?: { href: string; label: string };
};

export const DOMAINES_AUDIT: Domaine[] = [
  {
    h3: "Propriété du code et chaîne des droits",
    p: "Titularité du code source, contrats des développeurs salariés et indépendants, cessions effectives, copropriétés, marques et noms de domaine, droits sur les bases de données, restrictions affectant les évolutions futures.",
  },
  {
    h3: "Composants tiers et open source",
    p: "Licences des bibliothèques et du middleware, obligations de réciprocité, d'attribution ou de mise à disposition du code, compatibilité avec le modèle d'exploitation de l'acquéreur.",
  },
  {
    h3: "Contrats et revenus",
    p: "Contrats clients stratégiques, niveaux de service, cloud et hébergement, sous-traitants critiques, exclusivités — et les clauses de changement de contrôle susceptibles de faire disparaître une part du chiffre d'affaires au lendemain du closing.",
    lien: { href: "/nos-domaines/contrats-informatiques", label: "Notre pratique Contrats IT & responsabilité" },
  },
  {
    h3: "Données",
    p: "Origine et licéité, finalités initiales, conditions de transmission, de migration, de combinaison et de réutilisation après l'opération, sous-traitance, transferts hors Union européenne, incidents et procédures CNIL, coût d'une mise en conformité.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Notre pratique RGPD & données personnelles" },
  },
  {
    h3: "Cybersécurité",
    p: "Incidents passés, dépendance à un prestataire critique, vulnérabilités connues, sauvegarde et reprise, engagements contractuels des prestataires, risque de notification et de responsabilité.",
    lien: { href: "/nos-domaines/cybersecurite", label: "Notre pratique Cybersécurité & NIS 2" },
  },
  {
    h3: "Systèmes d'intelligence artificielle",
    p: "Qualification des systèmes, répartition des rôles entre fournisseur, déployeur et intégrateur, provenance des données d'entraînement, droits sur les modèles et recours à des modèles tiers, documentation, restrictions affectant l'exploitation commerciale.",
    lien: { href: "/nos-domaines/ia-act", label: "Notre pratique Intelligence artificielle & AI Act" },
  },
];

export const LIVRABLES = [
  "Un rapport de red flags ciblé sur les risques technologiques majeurs",
  "Une matrice des risques, hiérarchisée par effet sur l'opération",
  "Une analyse des conditions et du coût de remédiation",
  "Une liste des conditions suspensives recommandées",
  "Un jeu de déclarations et garanties propres aux actifs numériques",
  "Une revue des clauses correspondantes du contrat d'acquisition",
  "Un plan de remédiation, pré-closing ou post-closing",
];

/** Extrait de matrice — exemple illustratif, la mention doit rester affichée. */
export const MATRICE = {
  titre: "Matrice des risques technologiques — extrait",
  mention: "Exemple illustratif · données fictives",
  lignes: [
    {
      n: "01",
      constat:
        "Module de reporting reposant sur une bibliothèque sous licence à réciprocité forte — incompatible avec la distribution propriétaire envisagée",
      gravite: "Bloquant",
      ton: "hi" as const,
      traitement: "Réécriture du module ou licence commerciale — condition suspensive",
    },
    {
      n: "02",
      constat:
        "Trois prestataires ayant contribué au cœur du produit entre 2019 et 2021 sans stipulation de cession de droits",
      gravite: "Élevé",
      ton: "hi" as const,
      traitement:
        "Régularisation avant closing ; à défaut, retenue de prix et garantie spécifique",
    },
    {
      n: "03",
      constat:
        "Clause de changement de contrôle à consentement préalable dans quatre contrats clients représentant 31 % des revenus récurrents",
      gravite: "Élevé",
      ton: "hi" as const,
      traitement:
        "Obtention des consentements en condition suspensive ; ajustement de prix à défaut",
    },
    {
      n: "04",
      constat:
        "Origine et base légale d'une partie des données d'entraînement du modèle non documentées",
      gravite: "Moyen",
      ton: "md" as const,
      traitement: "Déclaration et garantie autonome, plafond et durée dédiés",
    },
    {
      n: "05",
      constat: "Absence de contrat de sous-traitance avec l'hébergeur secondaire",
      gravite: "Faible",
      ton: "lo" as const,
      traitement: "Régularisation post-closing, plan de remédiation à J+90",
    },
  ],
};

/**
 * Les domaines rattachés à une étape partagent le type `Domaine` : ils
 * peuvent donc eux aussi porter un lien vers la page du cabinet concernée.
 */
export const ETAPES: {
  id: string;
  n: string;
  court: string;
  quand: string;
  h2: string;
  these: string;
  cta: string;
  point: string;
  paragraphes?: string[];
  domaines?: Domaine[];
}[] = [
  {
    id: "auditer",
    n: "01",
    court: "Auditer",
    quand: "Avant la LOI → data room",
    /** Intitulé porteur pour la recherche */
    h2: "Due diligence technologique : vérifier ce qui fonde la valorisation",
    these:
      "Une due diligence tech ne consiste pas à vérifier que les contrats existent, mais que les actifs qui fondent la valorisation existent, sont disponibles, et le resteront après l'opération.",
    cta: "Faire auditer une cible technologique",
    point:
      "Acquérir les titres d'une société ne garantit pas que celle-ci détienne les droits nécessaires à l'exploitation de sa technologie. La propriété des logiciels, des données, des marques et des développements réalisés par des prestataires se vérifie séparément, actif par actif.",
  },
  {
    id: "traduire",
    n: "02",
    court: "Traduire",
    quand: "Négociation du SPA",
    h2: "Garanties du SPA : du constat à la protection contractuelle",
    these:
      "Lister les non-conformités ne suffit pas. Ce qui compte est ce que chaque constat impose de faire.",
    paragraphes: [
      "Nous hiérarchisons les constats selon leur effet sur l'opération : risque bloquant, risque affectant la valorisation, régularisation à obtenir avant le closing, garantie spécifique à négocier, engagement post-closing, ou risque accepté et budgété.",
      "Nous fournissons ensuite au conseil de l'opération — ou négocions directement, selon le mandat — les stipulations correspondantes : déclarations et garanties spécifiques aux actifs numériques, conditions suspensives de régularisation, retenues ou séquestres adossés à un risque identifié, mécanismes d'indemnisation autonomes, ajustements de prix et earn-out conditionnés à la délivrance d'une technologie ou à la conservation de clients.",
    ],
    cta: "Sécuriser les garanties du contrat",
    point:
      "Une garantie générique de propriété intellectuelle ne protège pas nécessairement contre un défaut affectant un composant open source, un jeu de données ou une technologie développée par un prestataire. Les garanties doivent être construites à partir de l'architecture réelle du produit.",
  },
  {
    id: "remedier",
    n: "03",
    court: "Remédier",
    quand: "Closing → intégration",
    h2: "Remédiation : avant et après le closing",
    these:
      "Une technologie peut être acquise juridiquement sans être immédiatement exploitable.",
    domaines: [
      {
        h3: "Avant le closing",
        p: "Cessions de droits manquantes, consentements et levées de clauses de changement de contrôle, formalisation des licences, mise à disposition du code source, sécurisation des noms de domaine et des comptes techniques, documentation des traitements de données.",
      },
      {
        h3: "Après le closing",
        p: "Continuité des contrats essentiels, accès au code et aux infrastructures, migration des données, services transitoires, incidents révélés après l'opération et mise en œuvre des garanties.",
      },
    ],
    cta: "Préparer une régularisation ou une intégration",
    point:
      "Les accès, les personnes clés, les licences et les services transitoires s'organisent avant le closing. Une fois l'opération réalisée, la négociation de ces points se fait sans levier.",
  },
];

export const OPERATIONS = [
  {
    k: "Acquisition",
    h3: "Entreprise SaaS",
    p: "Propriété du logiciel, contrats clients, revenus récurrents, renouvellement et résiliation, niveaux de service, hébergement, données, changement de contrôle.",
  },
  {
    k: "Prise de participation",
    h3: "Société d'intelligence artificielle",
    p: "Modèles, jeux de données et provenance, licences, documentation technique, cadre réglementaire applicable.",
  },
  {
    k: "Cession",
    h3: "Préparation d'une cession tech",
    p: "Audit vendeur, régularisation de la chaîne des droits, préparation de la data room, anticipation des garanties demandées par l'acquéreur.",
  },
  {
    k: "Acquisition",
    h3: "Plateforme ou marketplace",
    p: "Conditions d'utilisation, flux de paiement, modération, conformité DSA, régime de responsabilité.",
  },
  {
    k: "Carve-out",
    h3: "Isolation d'une activité numérique",
    p: "Contrats, infrastructures, données, licences et outils nécessaires à la continuité de l'activité.",
  },
  {
    k: "Asset deal",
    h3: "Acquisition d'actifs technologiques",
    p: "Périmètre réellement nécessaire à une exploitation autonome : logiciels, droits, bases, comptes, domaines, contrats.",
  },
];

export const FAQ = [
  {
    q: "Intervenez-vous comme conseil unique de l'opération ?",
    a: "Nous intervenons sur le volet technologique. Selon les opérations, nous travaillons seuls pour un acquéreur, ou en co-conseil avec le cabinet corporate qui pilote le processus.",
  },
  {
    q: "Les données d'une cible sont-elles exploitables par l'acquéreur ?",
    a: "Dans une acquisition de titres, les données restent généralement détenues par la société cible ; leur réutilisation, leur combinaison avec celles de l'acquéreur ou leur migration doivent respecter les finalités, bases légales et informations initialement délivrées. Dans un asset deal, la question de leur transmission est plus sensible encore.",
  },
  {
    q: "À quel moment faut-il vous solliciter ?",
    a: "Idéalement avant la signature de la lettre d'intention, et au plus tard avant l'ouverture complète de la due diligence. Une LOI fixe déjà un prix, une exclusivité et une structure.",
  },
  {
    q: "Comment le périmètre et le coût de l'intervention sont-ils arrêtés ?",
    a: "Le périmètre dépend de la taille de la cible, du nombre d'actifs technologiques concernés et de l'état de la data room. Il est arrêté après un premier échange, avant toute intervention : une convention d'honoraires précise alors la mission, le mode de calcul et les frais prévisibles.",
  },
];

export const FIN = {
  h2: "Vous envisagez l'acquisition, la cession ou la prise de participation dans une entreprise technologique ?",
  p: "Transmettez-nous les premiers éléments de l'opération : l'activité de la cible, les principaux actifs technologiques concernés et, s'ils existent, la lettre d'intention ou l'accès à la data room. Nous identifions les diligences tech prioritaires et le périmètre d'intervention adapté.",
};
