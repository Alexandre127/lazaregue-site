/**
 * Collection unique « Cas clients ». Les DEUX pages (générale + [slug]) sont
 * générées d'ici : aucun texte de cas n'est écrit en dur dans un composant.
 * Textes mot pour mot des maquettes. Les libellés de domaines suivent le § 4
 * (intitulés exacts du site) ; les routes sont les routes réelles.
 */

export type DomKey = "cyber" | "contentieux" | "fraude" | "crypto" | "contenus" | "cybercrim" | "pi";

/** Intitulés EXACTS du site + route réelle de la page compétence (§ 4). */
export const DOM_META: Record<DomKey, { label: string; href: string }> = {
  cyber: { label: "Cybersécurité et NIS 2", href: "/nos-domaines/cybersecurite" },
  contentieux: { label: "Contentieux informatique et commercial", href: "/nos-domaines/contentieux-informatique-commercial" },
  fraude: { label: "Fraude bancaire et escroquerie en ligne", href: "/nos-domaines/escroquerie-fraude-bancaire" },
  crypto: { label: "Crypto-actifs et blockchain", href: "/nos-domaines/crypto-actifs-blockchain" },
  contenus: { label: "Diffamation et retrait de contenus", href: "/nos-domaines/diffamation-retrait-contenus" },
  cybercrim: { label: "Cyberattaques et cybercriminalité", href: "/nos-domaines/cybercriminalite" },
  // Pas de page compétence Next pour la PI : lien vers la page PicRights/AFP du
  // site (à signaler — cette route est portée par le SPA, pas par l'app Next).
  pi: { label: "Propriété intellectuelle — photographies", href: "/litige-afp-picrights/" },
};

export const ISSUE = "Dossier clos — issue favorable";

export type Cas = {
  slug: string;
  numero: string;
  domaines: DomKey[];
  titre: string;
  seoTitle: string;
  metaDescription: string;
  chapo: string;
  resume: string; // une ligne : cartes + bandeau « Situation »
  client: string;
  nature: string;
  voie: string;
  situation: string[];
  enjeu: string;
  difficultes?: { b: string; titre: string; desc: string }[];
  intervention: string[];
  arbitrage?: { voie: string; app: string; dec: string; ret: boolean }[];
  issue: string;
  aRetenir: string[];
  ressources: { titre: string; href: string }[];
};

const FCB = { titre: "Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser ?", href: "/ressources/faux-conseiller-bancaire-remboursement" };

export const CAS: Cas[] = [
  {
    slug: "cyberattaque-responsabilite-prestataire-informatique",
    numero: "01",
    domaines: ["cyber", "contentieux"],
    titre: "Cyberattaque : une entreprise paralysée met en cause son prestataire informatique",
    seoTitle: "Cyberattaque : responsabilité du prestataire informatique",
    metaDescription: "Après une cyberattaque, une PME fait ordonner une expertise judiciaire (article 145 du CPC) pour établir la responsabilité de son infogérant. Cas anonymisé.",
    chapo: "À la suite d’une interruption importante de son système d’information, une entreprise devait déterminer l’origine de l’incident, préserver les éléments techniques disponibles et examiner si les prestations de son infogérant avaient été exécutées conformément aux engagements contractuels.",
    resume: "Préserver les preuves et faire établir les causes techniques de l’incident avant de discuter des responsabilités.",
    client: "PME",
    nature: "Conseil et contentieux",
    voie: "Expertise judiciaire (art. 145 CPC)",
    situation: [
      "Après une intrusion, l’entreprise ne pouvait plus accéder à plusieurs outils métiers. Son prestataire d’infogérance contestait toute responsabilité et les journaux techniques risquaient de ne pas être conservés.",
      "Plusieurs intervenants techniques étaient impliqués et les responsabilités étaient contestées.",
    ],
    enjeu: "Identifier les causes de l’incident sans laisser disparaître les preuves nécessaires à l’établissement des responsabilités.",
    difficultes: [
      { b: "A", titre: "Faits techniques et contractuels enchevêtrés", desc: "Chaque dysfonctionnement devait être rattaché à une obligation précise." },
      { b: "B", titre: "Pluralité des prestataires", desc: "Plusieurs intervenants, chacun renvoyant la responsabilité aux autres." },
      { b: "C", titre: "Urgence de préserver les preuves", desc: "Des journaux techniques exposés à un effacement à brève échéance." },
      { b: "D", titre: "Clauses limitatives de responsabilité", desc: "Un contrat plafonnant l’indemnisation, dont la portée devait être discutée." },
    ],
    intervention: [
      "Le cabinet a procédé à l’analyse des contrats, des échanges entre les intervenants et des éléments techniques disponibles.",
      "La stratégie a consisté à préserver les preuves, déterminer les obligations respectives des prestataires et préparer une mesure d’expertise permettant de confronter les différentes versions techniques.",
    ],
    arbitrage: [
      { voie: "Négociation directe", app: "Prestataire contestant toute responsabilité", dec: "Écartée", ret: false },
      { voie: "Mise en demeure", app: "Utile pour fixer les positions et demander la conservation des données", dec: "Retenue", ret: true },
      { voie: "Expertise (art. 145 CPC)", app: "Établir les causes techniques avant tout procès", dec: "Retenue — axe principal", ret: true },
      { voie: "Action au fond immédiate", app: "Prématurée sans constatations techniques", dec: "Différée", ret: false },
    ],
    issue: "Une expertise judiciaire a été ordonnée afin de déterminer les causes de l’incident et les responsabilités. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["En matière de cyberattaque, la préservation immédiate des journaux, sauvegardes, échanges et éléments contractuels peut conditionner la possibilité d’établir ultérieurement les responsabilités."],
    ressources: [],
  },
  {
    slug: "virements-frauduleux-plateformes-crypto-recours-banque",
    numero: "02",
    domaines: ["fraude", "crypto"],
    titre: "Virements frauduleux vers des plateformes crypto : un particulier conteste les opérations auprès de sa banque",
    seoTitle: "Virements frauduleux vers une plateforme crypto : recours",
    metaDescription: "Une série de virements frauduleux vers des plateformes de crypto-actifs est contestée auprès de la banque, opération par opération. Cas client anonymisé.",
    chapo: "Un particulier constatait une succession de virements réalisés vers différents prestataires de paiement et plateformes intervenant dans l’univers des crypto-actifs.",
    resume: "Établir, opération par opération, les conditions d’autorisation des virements et le droit au remboursement.",
    client: "Particulier",
    nature: "Contentieux",
    voie: "Action contre l’établissement bancaire",
    situation: [
      "Un particulier constatait une succession de virements réalisés vers différents prestataires de paiement et plateformes intervenant dans l’univers des crypto-actifs.",
      "Les opérations litigieuses s’étaient succédé pendant plusieurs mois.",
    ],
    enjeu: "Déterminer les conditions dans lesquelles les opérations avaient été réalisées et si l’établissement bancaire devait procéder à leur remboursement au regard du régime applicable aux services de paiement.",
    intervention: [
      "Le cabinet a reconstitué la chronologie des virements, identifié les différents établissements et prestataires intervenus dans la chaîne de paiement et analysé les mécanismes d’authentification utilisés.",
      "L’action a été construite notamment autour des règles du Code monétaire et financier relatives à l’autorisation des opérations de paiement, à la preuve et au remboursement.",
    ],
    issue: "L’action a été menée contre l’établissement bancaire. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["Dans les dossiers de fraude bancaire, la chronologie des opérations, les modalités exactes d’authentification et la circulation des fonds doivent être établies opération par opération."],
    ressources: [FCB],
  },
  {
    slug: "dereferencement-google-procedure-judiciaire",
    numero: "03",
    domaines: ["contenus"],
    titre: "Déréférencement Google : une entreprise et ses dirigeants saisissent le juge",
    seoTitle: "Déréférencement Google : une action en justice",
    metaDescription: "Des contenus liés à une procédure restaient visibles dans Google : une action judiciaire en déréférencement est engagée pour l’entreprise et ses dirigeants.",
    chapo: "Une entreprise et ses dirigeants souhaitaient limiter l’accessibilité, depuis le moteur de recherche, de contenus liés à une procédure et susceptibles d’affecter durablement leur réputation.",
    resume: "Articuler le droit des personnes concernées et la liberté d’information devant le juge.",
    client: "Entreprise et dirigeants",
    nature: "Contentieux",
    voie: "Action judiciaire en déréférencement",
    situation: ["Une entreprise et ses dirigeants souhaitaient limiter l’accessibilité, depuis le moteur de recherche, de contenus liés à une procédure et susceptibles d’affecter durablement leur réputation."],
    enjeu: "Déterminer si les conditions du droit au déréférencement, souvent appelé « droit à l’oubli », étaient réunies et articuler les droits des personnes concernées avec la liberté d’information.",
    intervention: [
      "Le cabinet a analysé les contenus, leur ancienneté, leur accessibilité depuis les résultats de recherche ainsi que les intérêts en présence.",
      "Une procédure a ensuite été engagée afin d’obtenir l’examen judiciaire de la demande de déréférencement.",
    ],
    issue: "La demande de déréférencement a été soumise à l’examen du juge. Le dossier est clos, avec une issue favorable aux clients.",
    aRetenir: ["Le retrait du contenu à sa source et son déréférencement par un moteur de recherche sont deux mécanismes juridiquement distincts."],
    ressources: [],
  },
  {
    slug: "usurpation-identite-identifier-auteur-article-145-cpc",
    numero: "04",
    domaines: ["cybercrim"],
    titre: "Usurpation d’identité : identifier l’auteur grâce à une mesure de l’article 145 du CPC",
    seoTitle: "Usurpation d'identité : identifier l'auteur (art. 145 CPC)",
    metaDescription: "Face à une usurpation d’identité impliquant plusieurs opérateurs, des mesures probatoires de l’article 145 du CPC visent à obtenir les données identifiant l’auteur.",
    chapo: "Une identité avait été utilisée dans le cadre de communications électroniques impliquant plusieurs services et opérateurs.",
    resume: "Obtenir la conservation et la communication des données techniques avant leur disparition.",
    client: "[À préciser]",
    nature: "Contentieux",
    voie: "Mesures probatoires (art. 145 CPC)",
    situation: [
      "Une identité avait été utilisée dans le cadre de communications électroniques impliquant plusieurs services et opérateurs.",
      "L’identité exacte de la personne à l’origine des faits ne pouvait être déterminée à partir des seuls éléments disponibles pour la victime.",
    ],
    enjeu: "Préserver et obtenir les données techniques susceptibles de permettre l’identification des auteurs avant leur disparition.",
    intervention: ["Le cabinet a identifié les intermédiaires techniques susceptibles de détenir des données utiles et engagé une procédure destinée à obtenir leur conservation et leur communication, par des mesures probatoires fondées sur l’article 145 du Code de procédure civile."],
    issue: "Les mesures probatoires fondées sur l’article 145 du Code de procédure civile ont été mises en œuvre. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["Dans les affaires numériques, identifier rapidement les opérateurs susceptibles de détenir une donnée est souvent aussi important que l’action au fond elle-même."],
    ressources: [],
  },
  {
    slug: "litige-infogerance-prestataire-informatique",
    numero: "05",
    domaines: ["contentieux"],
    titre: "Litige d’infogérance : une entreprise met en cause son prestataire informatique",
    seoTitle: "Litige d'infogérance avec un prestataire informatique",
    metaDescription: "Contrat d’infogérance, prestations contestées, financements multiples : reconstituer la relation contractuelle avant de discuter la responsabilité du prestataire.",
    chapo: "Une entreprise contestait l’exécution de prestations informatiques intervenues dans le cadre d’une relation contractuelle comprenant plusieurs opérations et financements.",
    resume: "Reconstruire la relation contractuelle avant de déterminer la responsabilité technique.",
    client: "Entreprise",
    nature: "Contentieux commercial",
    voie: "Action au fond",
    situation: ["Une entreprise contestait l’exécution de prestations informatiques intervenues dans le cadre d’une relation contractuelle comprenant plusieurs opérations et financements."],
    enjeu: "Reconstituer les prestations effectivement commandées et exécutées, déterminer les obligations contractuelles de chaque intervenant et évaluer les conséquences financières des manquements allégués.",
    intervention: ["Analyse des contrats, factures, échanges, livrables et chronologie du projet ; identification des obligations discutées ; préparation de la stratégie contentieuse."],
    issue: "Le contentieux commercial a été conduit à son terme. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["Dans un contentieux informatique, la première difficulté consiste souvent à reconstruire précisément la relation contractuelle avant même de déterminer la responsabilité technique."],
    ressources: [],
  },
  {
    slug: "piratage-informatique-expertise-origine-attaque",
    numero: "06",
    domaines: ["cyber", "contentieux"],
    titre: "Piratage informatique : une expertise technique pour déterminer l’origine de l’attaque",
    seoTitle: "Piratage informatique : établir l'origine par expertise",
    metaDescription: "Après le piratage de son infrastructure, une entreprise prépare l’expertise informatique qui reliera le scénario de l’attaque aux obligations des prestataires.",
    chapo: "À la suite d’un incident de sécurité affectant son infrastructure informatique, une entreprise devait déterminer le scénario technique de l’attaque et le rôle éventuel des différents intervenants chargés du réseau.",
    resume: "Transformer un incident technique complexe en faits discutables contradictoirement.",
    client: "Entreprise",
    nature: "Contentieux",
    voie: "Expertise judiciaire",
    situation: ["À la suite d’un incident de sécurité affectant son infrastructure informatique, une entreprise devait déterminer le scénario technique de l’attaque et le rôle éventuel des différents intervenants chargés du réseau."],
    enjeu: "Transformer un événement technique complexe en faits susceptibles d’être discutés contradictoirement dans une procédure.",
    intervention: ["Le cabinet a travaillé sur la chronologie de l’incident, les équipements concernés, les données disponibles et les obligations des différents prestataires afin de préparer l’expertise et les questions soumises au technicien."],
    issue: "L’expertise a été préparée et conduite sur la base des questions techniques définies. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["L’expertise informatique n’a d’utilité contentieuse que si les questions techniques sont reliées précisément aux obligations contractuelles dont dépend la responsabilité."],
    ressources: [],
  },
  {
    slug: "photographies-utilisees-sans-autorisation-reclamation",
    numero: "07",
    domaines: ["pi"],
    titre: "Photographies utilisées sans autorisation : une entreprise conteste la réclamation reçue",
    seoTitle: "Photo utilisée sans autorisation : contester la réclamation",
    metaDescription: "Une entreprise reçoit une demande d’indemnisation pour des photographies : preuve des droits, usages réels et calcul du montant sont vérifiés avant de répondre.",
    chapo: "Une entreprise avait reçu une demande d’indemnisation en raison de l’utilisation alléguée de plusieurs photographies protégées par le droit d’auteur.",
    resume: "Vérifier la preuve des droits, les usages réels et le calcul de l’indemnisation demandée.",
    client: "Entreprise",
    nature: "Conseil et contentieux",
    voie: "Contestation de la réclamation",
    situation: ["Une entreprise avait reçu une demande d’indemnisation en raison de l’utilisation alléguée de plusieurs photographies protégées par le droit d’auteur."],
    enjeu: "Vérifier la titularité des droits invoqués, déterminer les conditions exactes d’utilisation des photographies et apprécier le montant de l’indemnisation réclamée.",
    intervention: ["Le cabinet a examiné les photographies concernées, les droits revendiqués, les usages reprochés et les éléments justifiant le montant demandé avant de définir la réponse et la stratégie contentieuse."],
    issue: "La réclamation a été contestée sur la preuve des droits, les usages et le montant demandé. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["La réception d’une réclamation ne dispense pas de vérifier la preuve des droits, les usages effectivement réalisés et la méthode de calcul de l’indemnisation."],
    ressources: [],
  },
  {
    slug: "escroquerie-en-ligne-paiements-carte-crypto-banque",
    numero: "08",
    domaines: ["fraude", "crypto"],
    titre: "Escroquerie en ligne : des paiements par carte et un virement vers une plateforme crypto contestés",
    seoTitle: "Escroquerie en ligne et crypto : contester les paiements",
    metaDescription: "Après une escroquerie en ligne, paiements par carte bancaire et virement vers une plateforme crypto sont contestés séparément, selon leur régime propre.",
    chapo: "Après avoir été entraînée dans un dispositif frauduleux en ligne, une victime avait effectué plusieurs opérations par carte bancaire ainsi qu’un virement vers des services associés aux crypto-actifs.",
    resume: "Distinguer chaque opération selon le moyen de paiement utilisé pour identifier les recours.",
    client: "Particulier",
    nature: "Contentieux",
    voie: "Contestation auprès de l’établissement bancaire",
    situation: ["Après avoir été entraînée dans un dispositif frauduleux en ligne, une victime avait effectué plusieurs opérations par carte bancaire ainsi qu’un virement vers des services associés aux crypto-actifs."],
    enjeu: "Distinguer chaque opération, ses modalités d’autorisation et les mécanismes d’authentification utilisés afin de déterminer les recours envisageables.",
    intervention: ["Reconstitution des opérations, analyse des flux et des authentifications, qualification juridique et contestation auprès de l’établissement bancaire."],
    issue: "Les opérations ont été contestées auprès de l’établissement bancaire, chacune selon son régime. Le dossier est clos, avec une issue favorable au client.",
    aRetenir: ["Dans les escroqueries complexes, il est rarement pertinent de traiter toutes les opérations comme un bloc : leur régime juridique peut différer selon le moyen de paiement utilisé."],
    ressources: [FCB],
  },
];

/** Ordre des filtres de la page générale (un bouton par domaine présent). */
export const FILTER_ORDER: DomKey[] = ["contentieux", "fraude", "contenus", "cybercrim", "cyber", "pi", "crypto"];

/** Domaines du site SANS cas publié — calculés depuis la collection (§ 4). */
const AUTRES_SITE = [
  { label: "RGPD et données personnelles", href: "/nos-domaines/rgpd-donnees-personnelles" },
  { label: "Intelligence artificielle et AI Act", href: "/nos-domaines/avocat-intelligence-artificielle" },
  { label: "Contrats informatiques", href: "/nos-domaines/contrats-informatiques" },
  { label: "Fusions-acquisitions technologiques", href: "/nos-domaines/ma-tech" },
];
export const ALSO_DOMAINES = AUTRES_SITE; // aucun n'apparaît dans CAS → liste stable

export const getCas = (slug: string) => CAS.find((c) => c.slug === slug);
export const caseLabel = (c: Cas) => `Cas client ${c.numero} · ${c.domaines.map((d) => DOM_META[d].label).join(" · ")}`;
export const CAS_BASE = "/cas-clients";
