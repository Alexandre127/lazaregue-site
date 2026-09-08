/**
 * Page « M&A Tech » — due diligence juridique des actifs technologiques.
 *
 * Contenu porté VERBATIM de la maquette validée `docs/ma-tech-v2.html` : ne
 * rien réécrire, ne rien résumer, ne rien ajouter. Les chiffres présents (le
 * « 31 % des revenus récurrents ») appartiennent au cas fictif du bloc bascule
 * et ne doivent jamais être complétés par d'autres statistiques.
 */

export const HERO = {
  eyebrow: "lazarègue avocats — droit du numérique",
  h1: "Avocat M&A Tech :",
  h1tail: "due diligence juridique des actifs technologiques",
  sub: "Audit des logiciels, données, contrats IT, systèmes d'IA et risques cyber lors d'une acquisition, d'une cession ou d'une prise de participation.",
  intro:
    "Lazarègue Avocats intervient comme avocat du volet technologique des opérations de fusion-acquisition, aux côtés des acquéreurs, cédants, fonds d'investissement et cabinets corporate : de l'audit d'acquisition à la rédaction des garanties technologiques du SPA et au plan de remédiation.",
  assertions: [
    "Une donnée peut avoir une forte valeur économique sans être juridiquement réutilisable par l'acquéreur.",
    "Un modèle performant peut ne pas être un actif maîtrisé.",
    "Un logiciel peut avoir été développé par des prestataires qui n'en ont jamais cédé les droits.",
  ],
};

export const DEFINITION = {
  h2: "Qu'est-ce qu'une due diligence technologique ?",
  p1: "Une due diligence technologique est l'audit des actifs, contrats, droits et risques liés à la technologie d'une société avant son acquisition ou sa cession. Elle vérifie que la cible détient et pourra continuer d'exploiter les logiciels, données, licences, infrastructures et systèmes d'intelligence artificielle qui fondent sa valorisation.",
  tags: ["acquisition", "cession", "prise de participation", "carve-out", "asset deal"],
};

export const SCOPE = {
  label: "périmètre",
  h3: "Audit juridique ou audit technique ?",
  measure:
    "Notre due diligence porte sur la maîtrise juridique et contractuelle des actifs technologiques : propriété du code, licences, données, contrats, dépendances, conformité et garanties. Lorsque l'opération nécessite un audit de l'architecture, de la qualité du code, de la scalabilité ou de la dette technique, nous coordonnons nos travaux avec l'expert technique désigné par le client.",
  headA: "due diligence juridique tech — notre intervention",
  headB: "due diligence technique — l'expert désigné",
  rows: [
    ["Propriété du code et chaîne des droits", "Qualité du code"],
    ["Licences open source et composants tiers", "Dette technique"],
    ["Contrats clients et fournisseurs", "Architecture"],
    ["Données personnelles et RGPD", "Scalabilité"],
    ["Garanties du SPA et conditions suspensives", "Performance"],
    ["Risques réglementaires et responsabilité", "Sécurité technique et tests d'intrusion"],
  ] as const,
  note: "Les deux revues sont complémentaires : un code de bonne facture peut appartenir à un prestataire, et un code médiocre peut être parfaitement détenu.",
};

/**
 * Bloc « Pour qui » — répond aux objections propres aux ETI et fonds qui
 * acquièrent une cible tech : pas de DSI dédiée, un cabinet corporate déjà en
 * place, une crainte sur le périmètre et le coût.
 */
export const POUR_QUI = {
  titre: "Vous acquérez une cible technologique sans être une entreprise tech",
  texte:
    "La plupart de nos interlocuteurs dirigent une PME ou une ETI industrielle, de distribution ou de services, ou investissent pour un fonds. Ils rachètent une société technologique pour se digitaliser ou pour la faire croître, sans disposer en interne d'une direction des systèmes d'information capable d'auditer ce qu'ils achètent.",
  points: [
    {
      k: "Vous êtes un fonds d'investissement sans DSI en interne",
      v: "Nous tenons le stream technologique d'une opération de private equity : red flags avant LOI, revue complète en data room, et rédaction des garanties spécifiques du SPA.",
    },
    {
      k: "Vous avez déjà un cabinet corporate",
      v: "Nous intervenons sur le seul volet technologique, en co-conseil, sans reprendre le pilotage de l'opération.",
    },
    {
      k: "Vous n'avez pas d'équipe technique dédiée",
      v: "Nous traduisons les constats techniques en conséquences sur le prix, les garanties et le calendrier, pas en jargon d'ingénieur.",
    },
    {
      k: "Vous voulez connaître le périmètre avant de vous engager",
      v: "Le périmètre est arrêté après un premier échange sur la cible et ses actifs, avant toute intervention et toute facturation.",
    },
  ],
};

/**
 * Bloc bascule « vue data room / vue audit » — pièce centrale de la section 01.
 * Les deux vues sont rendues côté serveur ; la bascule ne fait que poser ou
 * retirer l'attribut `hidden`. La mention « exemple illustratif » reste visible
 * dans les deux vues. Le « 31 % » appartient au cas fictif : ne pas ajouter de
 * statistique, de décote ou de durée absente de ce jeu de données.
 */
export type Ligne = { ref: string; t: string; sev: string; ton: "b" | "h" | "m" | "l" };

export const BASCULE = {
  mention: "exemple illustratif · société fictive · aucun dossier réel",
  groupLabel: "Lecture du dossier",
  dr: {
    v: "dr",
    onglet: "vue data room",
    piece: "pièce 4.2 — déclarations du cédant",
    titre: "Le socle technologique est détenu et exploitable en l'état.",
    verdict: "déclaré conforme",
    lignes: [
      { ref: "DR / 4.2.1", t: "Le module de reporting est développé en interne et distribué sous licence propriétaire.", sev: "déclaré", ton: "l" },
      { ref: "DR / 4.2.2", t: "Les développements du cœur de produit ont été réalisés par l'équipe salariée.", sev: "déclaré", ton: "l" },
      { ref: "DR / 4.2.3", t: "Les contrats clients ne comportent aucune clause de changement de contrôle ni restriction susceptible d'affecter l'opération.", sev: "déclaré", ton: "l" },
      { ref: "DR / 4.2.4", t: "Le modèle est entraîné sur des données propres à la société.", sev: "déclaré", ton: "l" },
      { ref: "DR / 4.2.5", t: "L'hébergement est assuré par deux prestataires référencés.", sev: "déclaré", ton: "l" },
    ] as Ligne[],
    foot: "Les déclarations du cédant sont reprises telles quelles. Aucune vérification indépendante n'y est attachée.",
  },
  au: {
    v: "au",
    onglet: "vue audit",
    piece: "rapport d'audit — constats",
    titre: "Le socle technologique n'est ni entièrement détenu, ni exploitable en l'état.",
    verdict: "réserves majeures",
    lignes: [
      { ref: "AU / 4.2.1", t: "Le module de reporting repose sur une bibliothèque sous licence à réciprocité forte, incompatible avec la distribution propriétaire envisagée.", sev: "bloquant", ton: "b" },
      { ref: "AU / 4.2.2", t: "Trois prestataires ont contribué au cœur du produit entre 2019 et 2021 sans stipulation de cession de droits.", sev: "élevé", ton: "h" },
      { ref: "AU / 4.2.3", t: "Quatre contrats clients, représentant 31 % des revenus récurrents, comportent une clause de changement de contrôle à consentement préalable.", sev: "élevé", ton: "h" },
      { ref: "AU / 4.2.4", t: "L'origine et la base légale d'une partie des données d'entraînement du modèle ne sont pas documentées.", sev: "moyen", ton: "m" },
      { ref: "AU / 4.2.5", t: "Aucun contrat de sous-traitance n'a été conclu avec l'hébergeur secondaire.", sev: "faible", ton: "l" },
    ] as Ligne[],
    foot: "Chaque constat appelle un traitement : régularisation avant closing, condition suspensive, retenue de prix, garantie autonome ou plan de remédiation. Ces traitements figurent dans la matrice ci-dessous.",
  },
  thinkFoot: "Chaque ligne non vérifiée est un écart entre le prix payé et l'actif acquis.",
};

/**
 * `lien` renvoie vers le domaine du cabinet que le point d'audit engage — une
 * due diligence tech se distingue d'une revue contractuelle générique parce que
 * la même équipe traite le RGPD, la cybersécurité et l'AI Act.
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
    p: "Contrats clients stratégiques, niveaux de service, cloud et hébergement, sous-traitants critiques, exclusivités, et les clauses de changement de contrôle susceptibles de faire disparaître une part du chiffre d'affaires au lendemain du closing.",
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
    lien: { href: "/nos-domaines/cybersecurite/nis2", label: "Notre pratique Cybersécurité & NIS 2" },
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

/** Matrice des risques — même dossier fictif que la bascule ; mention affichée. */
export const MATRICE = {
  titre: "Matrice des risques technologiques — même dossier",
  mention: "exemple illustratif · société fictive",
  lignes: [
    {
      n: "01",
      constat:
        "Module de reporting reposant sur une bibliothèque sous licence à réciprocité forte, incompatible avec la distribution propriétaire envisagée",
      gravite: "bloquant",
      ton: "hi" as const,
      traitement: "Réécriture du module ou licence commerciale, en condition suspensive",
    },
    {
      n: "02",
      constat:
        "Trois prestataires ayant contribué au cœur du produit entre 2019 et 2021 sans stipulation de cession de droits",
      gravite: "élevé",
      ton: "hi" as const,
      traitement: "Régularisation avant closing ; à défaut, retenue de prix et garantie spécifique",
    },
    {
      n: "03",
      constat:
        "Clause de changement de contrôle à consentement préalable dans quatre contrats clients représentant 31 % des revenus récurrents",
      gravite: "élevé",
      ton: "hi" as const,
      traitement: "Obtention des consentements en condition suspensive ; ajustement de prix à défaut",
    },
    {
      n: "04",
      constat:
        "Origine et base légale d'une partie des données d'entraînement du modèle non documentées",
      gravite: "moyen",
      ton: "md" as const,
      traitement: "Déclaration et garantie autonome, plafond et durée dédiés",
    },
    {
      n: "05",
      constat: "Absence de contrat de sous-traitance avec l'hébergeur secondaire",
      gravite: "faible",
      ton: "lo" as const,
      traitement: "Régularisation post-closing, plan de remédiation à J+90",
    },
  ],
};

export const ETAPES: {
  id: string;
  n: string;
  court: string;
  quand: string;
  h2: string;
  these: string;
  cta: string;
  point: string;
  sousTitres?: { h3: string; p: string }[];
  paragraphes?: string[];
}[] = [
  {
    id: "auditer",
    n: "01",
    court: "auditer",
    quand: "Avant la LOI, puis en data room",
    h2: "Due diligence technologique lors d'une acquisition d'entreprise",
    these:
      "Une due diligence tech ne consiste pas à vérifier que les contrats existent, mais que les actifs qui fondent la valorisation existent, sont disponibles, et le resteront après l'opération.",
    cta: "Faire auditer une cible technologique",
    point:
      "Acquérir les titres d'une société ne garantit pas que celle-ci détienne les droits nécessaires à l'exploitation de sa technologie. La propriété des logiciels, des données, des marques et des développements réalisés par des prestataires se vérifie séparément, actif par actif.",
  },
  {
    id: "traduire",
    n: "02",
    court: "traduire",
    quand: "Négociation du SPA",
    h2: "Garanties du SPA : du constat à la protection contractuelle",
    these: "Lister les non-conformités ne suffit pas. Ce qui compte est ce que chaque constat impose de faire.",
    paragraphes: [
      "Nous hiérarchisons les constats selon leur effet sur l'opération : risque bloquant, risque affectant la valorisation, régularisation à obtenir avant le closing, garantie spécifique à négocier, engagement post-closing, ou risque accepté et budgété.",
      "Nous fournissons ensuite au conseil de l'opération, ou négocions directement selon le mandat, les stipulations correspondantes : déclarations et garanties spécifiques aux actifs numériques, conditions suspensives de régularisation, retenues ou séquestres adossés à un risque identifié, mécanismes d'indemnisation autonomes, ajustements de prix et earn-out conditionnés à la délivrance d'une technologie ou à la conservation de clients.",
    ],
    cta: "Sécuriser les garanties du contrat",
    point:
      "Une garantie générique de propriété intellectuelle ne protège pas nécessairement contre un défaut affectant un composant open source, un jeu de données ou une technologie développée par un prestataire. Les garanties doivent être construites à partir de l'architecture réelle du produit.",
  },
  {
    id: "remedier",
    n: "03",
    court: "remédier",
    quand: "Closing, puis intégration",
    h2: "Remédiation : avant et après le closing",
    these: "Une technologie peut être acquise juridiquement sans être immédiatement exploitable.",
    sousTitres: [
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
    k: "acquisition",
    h3: "Entreprise SaaS",
    p: "Propriété du logiciel, contrats clients, revenus récurrents, renouvellement et résiliation, niveaux de service, hébergement, données, changement de contrôle.",
  },
  {
    k: "prise de participation",
    h3: "Société d'intelligence artificielle",
    p: "Modèles, jeux de données et provenance, licences, documentation technique, cadre réglementaire applicable.",
  },
  {
    k: "cession",
    h3: "Préparation d'une cession tech",
    p: "Vendor due diligence, régularisation de la chaîne des droits, préparation de la data room, anticipation des garanties demandées par l'acquéreur.",
  },
  {
    k: "acquisition",
    h3: "Plateforme ou marketplace",
    p: "Conditions d'utilisation, flux de paiement, modération, conformité DSA, régime de responsabilité.",
  },
  {
    k: "carve-out",
    h3: "Isolation d'une activité numérique",
    p: "Contrats, infrastructures, données, licences et outils nécessaires à la continuité de l'activité.",
  },
  {
    k: "asset deal",
    h3: "Acquisition d'actifs technologiques",
    p: "Périmètre réellement nécessaire à une exploitation autonome : logiciels, droits, bases, comptes, domaines, contrats.",
  },
];

/** Équipe du stream technologique — rendue via EquipeDossier (portraits issus
 *  de lib/equipe.ts). Rôles propres à cette page.
 *  NB : le rôle de Me Sarah Hinderer, « Données et conformité de la cible »,
 *  est une PROPOSITION en attente de validation par l'intéressée. Ne pas la
 *  propager à d'autres pages ni l'inscrire comme rôle canonique dans
 *  lib/equipe.ts avant confirmation. */
export const TEAM = [
  { slug: "alexandre", role: "Actifs numériques & due diligence", tags: ["Propriété du code", "Open source", "Données"] },
  { slug: "amir", role: "Contrats & garanties du SPA", tags: ["SPA", "Change of control", "Remédiation"] },
  { slug: "sarah", role: "Données et conformité de la cible", tags: ["RGPD", "Transferts", "IA"] },
];

export const EQUIPE_POINT =
  "Lazarègue Avocats intervient en droit des logiciels, contrats IT, données personnelles, intelligence artificielle, plateformes et cybercriminalité. Cette pratique permet d'examiner la technologie acquise au-delà des seules déclarations de la data room.";

export const FAQ = [
  {
    q: "Pouvez-vous intervenir aux côtés de notre cabinet corporate ?",
    a: "Oui. Nous prenons en charge le stream technologique sans reprendre le pilotage corporate de l'opération. Nous pouvons aussi être directement mandatés par un acquéreur ou un cédant : dans les deux configurations, le mandat reste délimité à l'audit juridique des actifs technologiques, aux garanties correspondantes et à leur remédiation.",
  },
  {
    q: "Quelle différence avec une due diligence technique ?",
    a: "La due diligence technique examine la qualité du code, l'architecture, la scalabilité et la dette technique. La nôtre porte sur les droits, les contrats et la conformité. Les deux sont complémentaires et se conduisent en parallèle, avec l'expert technique désigné par le client.",
  },
  {
    q: "Comment se déroule une due diligence IT, et combien de temps prend-elle ?",
    a: "Une revue de red flags avant la LOI se conduit en quelques jours à partir des éléments disponibles. La revue complète en data room dépend du nombre d'actifs et de la qualité de la documentation ; le calendrier est arrêté avec le conseil de l'opération dès l'ouverture de la data room.",
  },
  {
    q: "Les données d'une cible sont-elles exploitables par l'acquéreur ?",
    a: "Dans une acquisition de titres, les données restent généralement détenues par la société cible ; leur réutilisation, leur combinaison avec celles de l'acquéreur ou leur migration doivent respecter les finalités, bases légales et informations initialement délivrées. Dans un asset deal, la question de leur transmission est plus sensible encore.",
  },
  {
    q: "Que couvre une vendor due diligence technologique ?",
    a: "Côté cédant, l'audit porte sur les mêmes actifs, mais avant l'ouverture de la data room : régulariser la chaîne des droits, documenter les licences et les traitements de données, et anticiper les garanties que l'acquéreur demandera.",
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
  steps: [
    "Auditer — avant la LOI, puis en data room",
    "Traduire — négociation du SPA",
    "Remédier — closing, puis intégration",
  ],
};
