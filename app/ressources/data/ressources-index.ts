/**
 * Données de la page /ressources (refonte v2, 21 sept. 2026).
 *
 * Un seul article est publié pour l'instant : « Faux conseiller bancaire »
 * (`href` réel). Toutes les autres ressources sont marquées « à paraître »
 * (`href: null`) → aucune 404. Les liens de domaine/situation pointent vers les
 * routes RÉELLES du site (les URL du maquette étaient indicatives).
 */

export type Dom = "cyber" | "fraude" | "rgpd" | "ia" | "contrats" | "contenus" | "pi" | "ma";

export const DOM_LABEL: Record<Dom, string> = {
  cyber: "Cybersécurité et cyberattaques",
  fraude: "Fraudes et paiements",
  rgpd: "Données personnelles et RGPD",
  ia: "IA et AI Act",
  contrats: "Contrats informatiques",
  contenus: "Diffamation et retrait de contenus",
  pi: "Propriété intellectuelle",
  ma: "M&A Tech",
};

/** Filtres du corpus (04) — seulement les domaines qui portent au moins un article. */
export const FILTERS: { key: "all" | Dom; label: string }[] = [
  { key: "all", label: "Tous les domaines" },
  { key: "cyber", label: DOM_LABEL.cyber },
  { key: "fraude", label: DOM_LABEL.fraude },
  { key: "rgpd", label: DOM_LABEL.rgpd },
  { key: "ia", label: DOM_LABEL.ia },
  { key: "contrats", label: DOM_LABEL.contrats },
  { key: "contenus", label: DOM_LABEL.contenus },
  { key: "pi", label: DOM_LABEL.pi },
  { key: "ma", label: DOM_LABEL.ma },
];

const REEL = "/ressources/faux-conseiller-bancaire-remboursement";

/* 01 — Par situation. Filtre du corpus (?domaine=) ou page de domaine réelle. */
export const SITUATIONS: { texte: string; href: string }[] = [
  { texte: "Une banque refuse de rembourser une fraude", href: "/ressources/?domaine=fraude" },
  { texte: "Une cyberattaque ou un rançongiciel perturbe l'activité", href: "/ressources/?domaine=cyber" },
  { texte: "Une violation de données vient de se produire", href: "/ressources/?domaine=rgpd" },
  { texte: "Un projet informatique n'est pas livré ou n'est pas conforme", href: "/nos-domaines/contentieux-informatique-commercial" },
  { texte: "De faux avis ou un contenu portent atteinte à l'entreprise", href: "/ressources/?domaine=contenus" },
  { texte: "Des fonds sont bloqués sur une plateforme de crypto-actifs", href: "/nos-domaines/crypto-actifs-blockchain" },
  { texte: "L'entreprise doit déterminer si elle relève de NIS 2", href: "/ressources/?domaine=cyber" },
  { texte: "Les salariés utilisent des outils d'IA sans cadre interne", href: "/ressources/?domaine=ia" },
  { texte: "Une acquisition nécessite l'audit des actifs technologiques", href: "/ressources/?domaine=ma" },
];

/* 02 — Par domaine (10 cartes). `href` = filtre corpus ; `soon` = à paraître. */
export const DOM_CARDS: { n: string; titre: string; desc: string; href: string | null; soon?: boolean }[] = [
  { n: "01", titre: "Cybersécurité et cyberattaques", desc: "NIS 2, rançongiciel, gestion de crise, plainte après une attaque et responsabilités après un incident.", href: "/ressources/?domaine=cyber" },
  { n: "02", titre: "Fraudes et paiements", desc: "Faux conseiller bancaire, virements frauduleux, fraude à la carte et placements fictifs.", href: "/ressources/?domaine=fraude" },
  { n: "03", titre: "Données personnelles et RGPD", desc: "Mise en conformité, sous-traitance, violations de données, contrôles de la CNIL et DPO.", href: "/ressources/?domaine=rgpd" },
  { n: "04", titre: "IA et AI Act", desc: "Gouvernance IA, rôles réglementaires, systèmes à risque, chartes internes et documentation.", href: "/ressources/?domaine=ia" },
  { n: "05", titre: "Contrats informatiques", desc: "SaaS, maintenance, infogérance, recette, responsabilité et réversibilité.", href: "/ressources/?domaine=contrats" },
  { n: "06", titre: "Contentieux informatique", desc: "Projet défaillant, perte de données, responsabilité du prestataire et expertise judiciaire.", href: null, soon: true },
  { n: "07", titre: "Diffamation et retrait de contenus", desc: "Faux avis, dénigrement, diffamation, identification d'auteur, retrait et déréférencement.", href: "/ressources/?domaine=contenus" },
  { n: "08", titre: "Crypto-actifs", desc: "Compte bloqué sur une plateforme, fraude aux cryptomonnaies, obligations des prestataires.", href: null, soon: true },
  { n: "09", titre: "Propriété intellectuelle", desc: "Logiciels, photographies, PicRights, droit d'auteur et concurrence déloyale.", href: "/ressources/?domaine=pi" },
  { n: "10", titre: "M&A Tech", desc: "Audit des actifs technologiques, code, données, contrats et garanties d'acquisition.", href: "/ressources/?domaine=ma" },
];

/* Note générale « Fraude bancaire : opposition… » — 1er article publié, mis à la une. */
const NOTE = "/ressources/fraude-bancaire-opposition-contestation-remboursement";

/* 03 — À la une : le guide du moment (note générale fraude bancaire).
   Chronologie = les huit étapes de la section 10 de l'article, en titres courts. */
export const FEATURED = {
  domLabel: DOM_LABEL.fraude,
  href: NOTE,
  titre: "Fraude bancaire : opposition, contestation et remboursement",
  excerpt:
    "Votre banque refuse de rembourser après une fraude ? Ce qu'elle doit prouver, ce que vous pouvez exiger, et comment préparer votre demande.",
  chrono: [
    { step: "Étape 1", label: "Opposition" },
    { step: "Étape 2", label: "Recall" },
    { step: "Étape 3", label: "Contestation écrite" },
    { step: "Étape 4", label: "Plainte" },
    { step: "Étape 5", label: "Pièces" },
    { step: "Étape 6", label: "Droit d'accès" },
    { step: "Étape 7", label: "Mise en demeure" },
    { step: "Étape 8", label: "Tribunal" },
  ],
};

/* Corpus (04). `featDup` = repris dans « Quatre repères » (03), masqué tant
   qu'aucun filtre/recherche n'est actif. `href: null` = à paraître. */
export type CorpusItem = { dom: Dom; id: string; titre: string; excerpt: string; href: string | null; featDup?: boolean };

export const CORPUS: CorpusItem[] = [
  { dom: "cyber", id: "nis2", featDup: true, href: null, titre: "NIS 2 : quelles entreprises sont concernées et quelles obligations anticiper ?", excerpt: "Entités essentielles, entités importantes, sous-traitants, gouvernance et notification des incidents : les principaux critères à vérifier." },
  { dom: "fraude", id: "fbo", featDup: true, href: NOTE, titre: "Fraude bancaire : opposition, contestation et remboursement", excerpt: "Ce que la banque doit prouver, ce que vous pouvez exiger, et comment préparer votre demande — de l'opposition au tribunal." },
  { dom: "fraude", id: "fcb", href: REEL, titre: "Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser ?", excerpt: "Consentement, authentification forte, négligence grave et opérations inhabituelles : les critères à examiner pour contester les paiements." },
  { dom: "rgpd", id: "a28", featDup: true, href: null, titre: "Article 28 du RGPD : quelles clauses prévoir avec un sous-traitant ?", excerpt: "Instructions, sécurité, sous-traitance ultérieure, audits, violations et restitution des données : les clauses à prévoir dans le contrat." },
  { dom: "cyber", id: "rw", featDup: true, href: null, titre: "Ransomware (rançongiciel) : les décisions juridiques à prendre dans les premières 24 heures", excerpt: "Préserver les preuves, coordonner les intervenants, examiner les notifications et organiser la continuité sans compromettre les recours." },
  { dom: "contenus", id: "fa", href: null, titre: "Faux avis Google : comment demander leur suppression ?", excerpt: "Qualifier l'avis, conserver la preuve, adresser un signalement exploitable et choisir la voie d'action adaptée." },
  { dom: "ia", id: "gia", featDup: true, href: null, titre: "Gouvernance IA : comment encadrer les usages dans l'entreprise ?", excerpt: "Cartographie, rôles, responsabilités, charte interne, contrats et procédure d'incident : les composantes d'un cadre de gouvernance." },
  { dom: "contenus", id: "der", href: null, titre: "Déréférencement Google : dans quels cas demander la suppression d'un résultat ?", excerpt: "Retrait à la source, déréférencement, droit à l'effacement et atteinte à la réputation : distinguer les procédures avant d'agir." },
  { dom: "rgpd", id: "pme", href: null, titre: "Mise en conformité RGPD : par où commencer dans une PME ?", excerpt: "Cartographier les traitements, hiérarchiser les risques et construire un plan d'action adapté aux activités de l'entreprise." },
  { dom: "contrats", id: "mnt", href: null, titre: "Contrat de maintenance informatique : quelles clauses vérifier avant de signer ?", excerpt: "Périmètre, délais d'intervention, niveaux de service, sécurité, sauvegardes, responsabilité et conditions de sortie." },
  { dom: "contrats", id: "rec", href: null, titre: "Recette informatique : peut-on refuser un projet comportant des anomalies ?", excerpt: "Conformité aux spécifications, réserves, anomalies, procès-verbal de recette et conséquences d'une acceptation prématurée." },
  { dom: "pi", id: "pic", href: null, titre: "Réclamation PicRights : faut-il payer et comment répondre ?", excerpt: "Vérifier les droits invoqués, l'utilisation de la photographie, les preuves, le montant demandé et les options de réponse." },
  { dom: "ma", id: "dd", href: null, titre: "Due diligence technologique : que doit vérifier un acquéreur avant le closing ?", excerpt: "Code, licences, données, contrats, cybersécurité et dépendances techniques : les actifs et risques à examiner avant l'acquisition." },
];

/* 03 — Quatre repères. `featDup` (5 items) sert au masquage des doublons du
   corpus (les 4 repères + le guide « à la une » fcb) ; les repères eux-mêmes
   sont ces 4 fiches précises (fcb est mis en avant plus haut, pas ici). */
export const REPERES = CORPUS.filter((c) => ["nis2", "a28", "gia", "rw"].includes(c.id));
