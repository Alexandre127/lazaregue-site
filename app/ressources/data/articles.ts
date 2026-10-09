/**
 * Registre unique des ressources (refonte du 9 octobre 2026).
 *
 * Tout ce qui décrit une ressource vit ICI : titre, métadonnées SEO, domaine,
 * famille, chapô, date réelle de mise à jour, « L'essentiel », FAQ, mise à la
 * une, ordre et suggestions. La page /ressources, le gabarit d'article, les
 * données structurées, l'image de partage et le plan du site lisent ce registre.
 * Le CORPS d'un article reste dans sa page (`app/ressources/<slug>/page.tsx`).
 *
 * Règles : aucune donnée inventée. Un champ sans valeur reste vide ([] ou "")
 * et le bloc correspondant ne s'affiche pas. Le temps de lecture n'est pas
 * saisi : il est calculé à partir du nombre de mots (data/lecture.ts).
 */

export type QA = { q: string; a: string };

/* Domaines de la rubrique : clé de filtre (/ressources?domaine=…) et libellé
   court affiché en sur-titre et dans le bandeau défilant. */
export type Dom = "fraude" | "rgpd" | "cyber" | "crim" | "ia" | "contrats" | "contenus" | "pi" | "ma";

export const DOMAINES: { key: Dom; label: string }[] = [
  { key: "fraude", label: "Fraude bancaire" },
  { key: "rgpd", label: "RGPD" },
  { key: "cyber", label: "Cybersécurité" },
  { key: "crim", label: "Cybercriminalité" },
  { key: "ia", label: "IA" },
  { key: "contrats", label: "Contrats IT" },
  { key: "contenus", label: "E-réputation" },
  { key: "pi", label: "Propriété intellectuelle" },
  { key: "ma", label: "M&A tech" },
];

export const DOM_LABEL = Object.fromEntries(DOMAINES.map((d) => [d.key, d.label])) as Record<Dom, string>;

export function estDomaine(v: string | undefined): v is Dom {
  return !!v && DOMAINES.some((d) => d.key === v);
}

/* Les trois familles du menu (components/header/nav-data.ts). */
export type Famille =
  | "Conformité et gouvernance"
  | "Contrats et opérations numériques"
  | "Contentieux et atteintes numériques";

export type Article = {
  title: string; // titre complet, utilisé en H1
  seoTitle: string; // balise title (60 caractères maximum conseillés)
  seoDescription: string; // meta description (155 caractères maximum conseillés)
  slug: string;
  dom: Dom; // clé de filtre ; le libellé affiché en sur-titre est DOM_LABEL[dom]
  famille: Famille;
  type: string; // affiché en sur-titre après le domaine
  chapo: string;
  miseAJour: string; // date ISO réelle ; "" = inconnue (rien ne s'affiche)
  auteur: string;
  essentiel: string[]; // 2 à 4 phrases ; bloc masqué si vide
  faq: QA[]; // bloc et balisage FAQPage masqués si vide
  une: boolean; // article à la une de /ressources (un seul)
  titreUne: string; // accroche courte, lignes séparées par « | » ; à défaut, title
  ordre: number; // ordre dans la liste de /ressources
  liesA: string[]; // slugs proposés en « À lire aussi »
  exclureDesSuggestions: boolean;
  /* --- propres au site --- */
  publie: boolean; // false = page de test non finalisée : listée « à paraître », non indexée
  outil?: boolean; // true = outil interactif (ne passe pas par le gabarit d'article)
  sansTempsDeLecture?: boolean; // true = le temps de lecture calculé n'est pas affiché
};

const FAQ_FBO: QA[] = [
  { q: "J'ai moi-même effectué le virement. Ai-je encore un recours ?", a: "Oui. La loi exige un consentement à l'opération, pas un geste technique. Un virement obtenu par manœuvre, pour un objet fictif, peut être qualifié d'opération non autorisée. C'est aujourd'hui l'un des terrains les plus disputés du contentieux bancaire." },
  { q: "La banque m'oppose l'authentification forte. Est-ce décisif ?", a: "Non. L'article L. 133-23 dit expressément que l'usage enregistré de l'instrument ne suffit pas nécessairement à prouver l'autorisation, et l'Observatoire de la sécurité des moyens de paiement le rappelle dans les mêmes termes. Un refus fondé sur ce seul motif a été signalé au Sénat comme contraire à la loi." },
  { q: "La banque propose de rembourser la moitié. Est-ce normal ?", a: "Le régime ne connaît pas le partage. Une proposition transactionnelle reste possible, mais elle ne traduit pas l'état du droit : le remboursement est intégral ou nul." },
  { q: "Combien de temps pour agir ?", a: "Treize mois à compter du débit pour signaler l'opération. En pratique, il faut réagir en jours : la rapidité de la contestation est elle-même un élément d'appréciation, et le recall n'a de chances d'aboutir que dans les toutes premières heures." },
  { q: "Les banques cèdent-elles seulement devant un tribunal ?", a: "Le Sénat relevait en 2022 que les procédures engagées contre elles sont très fréquemment perdues par ces dernières, et que certaines semblent compter sur l'inaction de leurs clients. Un dossier se prépare donc comme s'il devait être jugé, même lorsqu'il se règle avant." },
];

const FAQ_OSINT: QA[] = [
  { q: "L'OSINT est-il légal ?", a: "Oui, consulter des informations publiques est licite. Ce sont la manière de les collecter et l'usage qui en est fait qui peuvent être illicites : constitution de fichiers à l'insu des personnes, surveillance, exposition de données personnelles." },
  { q: "Une capture d'écran est-elle une preuve ?", a: "Elle est recevable, mais sa force probante est faible si elle est isolée. Elle gagne en valeur lorsqu'elle est corroborée par d'autres éléments ou figée par un constat de commissaire de justice." },
  { q: "Peut-on prouver qu'une personne est l'auteur d'un message en ligne ?", a: "Oui, par un faisceau d'indices concordants : rapprochement avec ses publications publiques, style d'écriture, détails personnels, témoignages. Les données de connexion détenues par la plateforme, accessibles par voie judiciaire, permettent souvent de conclure." },
  { q: "Comment obtenir ses propres données auprès d'un réseau social ?", a: "Par le droit d'accès prévu à l'article 15 du RGPD. Les grandes plateformes proposent un outil de téléchargement des données dans les paramètres du compte." },
];

const FAQ_AVIS_GOOGLE: QA[] = [
  { q: "Peut-on faire supprimer un avis Google négatif ?", a: "Pas parce qu'il est négatif. Il peut l'être s'il est faux, s'il émane d'une personne en conflit d'intérêts, s'il est dénigrant, diffamatoire ou injurieux, ou s'il divulgue des informations protégées." },
  { q: "Un avis sous pseudonyme peut-il être retiré pour ce seul motif ?", a: "Non. L'anonymat est licite ; il faut des indices sérieux de faux avis ou un contenu illicite." },
  { q: "Google peut-il révéler l'auteur d'un avis anonyme ?", a: "Seulement sur décision de justice, et à condition que l'avis puisse recevoir une qualification pénale, comme la diffamation ou l'injure publiques." },
  { q: "Faut-il assigner l'auteur pour obtenir le retrait ?", a: "Non. Le juge peut ordonner le retrait à Google directement, sur le fondement de l'article 6-3 de la LCEN, à condition que l'illicéité soit manifeste ou que le retrait soit proportionné lorsque l'auteur ne peut être identifié." },
  { q: "Peut-on porter plainte pour un faux avis ?", a: "Oui si l'avis est diffamatoire ou injurieux, dans un délai de trois mois. Un faux avis simplement dénigrant relève de l'action civile." },
  { q: "Faut-il répondre à un avis négatif ?", a: "Une réponse brève et courtoise est utile pour les lecteurs. Elle ne doit révéler aucune information sur un client ou un patient, et jamais son identité : un garage qui avait publié le nom et l'adresse d'un client dans sa réponse a été condamné (CA Nancy, 12 déc. 2022, n° 22/00726). Répondre ne fait pas obstacle à une procédure." },
  { q: "Faut-il un avocat ?", a: "Pas pour un premier signalement. L'avocat intervient pour qualifier l'avis, rédiger une notification motivée, saisir l'organisme extrajudiciaire et conduire toute action en justice, où les délais et le formalisme ne pardonnent pas l'approximation." },
];

export const ARTICLES: Article[] = [
  {
    title: "Fraude bancaire : opposition, contestation et remboursement",
    seoTitle: "Fraude bancaire : opposition, contestation et remboursement",
    seoDescription:
      "Votre banque refuse de rembourser après une fraude ? Ce qu'elle doit prouver, ce que vous pouvez exiger, et comment préparer votre demande.",
    slug: "fraude-bancaire-opposition-contestation-remboursement",
    dom: "fraude",
    famille: "Contentieux et atteintes numériques",
    type: "Ressource",
    chapo:
      "Vous avez été victime d'une fraude : un appel, un message, un site qui imitait celui que vous connaissiez, et de l'argent est parti de votre compte. Vous avez prévenu votre banque et demandé le remboursement. Elle a refusé.",
    miseAJour: "2026-09-01",
    auteur: "Alexandre Lazarègue",
    essentiel: [
      "La banque doit rembourser une opération non autorisée au plus tard à la fin du premier jour ouvrable suivant son signalement (art. L. 133-18).",
      "C'est à la banque de prouver l'authentification et l'absence de déficience technique, puis votre éventuelle négligence grave (art. L. 133-23).",
      "L'authentification forte ne suffit pas, à elle seule, à prouver votre consentement.",
      "Treize mois pour contester, mais le recall se joue en heures.",
    ],
    faq: FAQ_FBO,
    une: true,
    titreUne: "Fraude bancaire : | la banque | doit-elle | rembourser ?",
    ordre: 0,
    liesA: [],
    exclureDesSuggestions: false,
    publie: true,
  },
  {
    title: "Observatoire du faux conseiller bancaire : la jurisprudence sur le remboursement",
    seoTitle: "Arnaque au faux conseiller bancaire : la jurisprudence",
    seoDescription:
      "Faux conseiller bancaire, SMS frauduleux, spoofing : ce que les juges ont décidé sur le remboursement des victimes. Décisions résumées par le cabinet.",
    slug: "jurisprudence-faux-conseiller-bancaire",
    dom: "fraude",
    famille: "Contentieux et atteintes numériques",
    type: "Ressource",
    chapo: "",
    miseAJour: "2026-10-02",
    auteur: "Alexandre Lazarègue",
    essentiel: [],
    faq: [],
    une: false,
    titreUne: "",
    ordre: 1,
    liesA: [],
    exclureDesSuggestions: false,
    publie: true,
    outil: true,
  },
  {
    title: "OSINT : définition, valeur de preuve et cadre juridique",
    seoTitle: "OSINT : définition, valeur de preuve et cadre juridique",
    seoDescription:
      "OSINT, c'est quoi ? Définition de la recherche en sources ouvertes, valeur de preuve devant le juge, limites légales (RGPD, arrêt Ikea) et bons réflexes.",
    slug: "osint-definition-preuve",
    dom: "crim",
    famille: "Contentieux et atteintes numériques",
    type: "Ressource",
    chapo:
      "L'OSINT, ou recherche en sources ouvertes, consiste à collecter des informations accessibles à tous puis à les recouper pour établir un fait.",
    miseAJour: "2026-10-09",
    auteur: "Alexandre Lazarègue",
    essentiel: [
      "Devant un juge, ces éléments ne valent pas preuve à eux seuls : ils valent par leur convergence.",
      "Leur collecte obéit par ailleurs à des règles, en particulier celles du RGPD et du code pénal.",
    ],
    faq: FAQ_OSINT,
    une: false,
    titreUne: "",
    ordre: 2,
    liesA: [],
    exclureDesSuggestions: false,
    publie: true,
  },
  {
    title: "Supprimer un faux avis Google : la procédure complète",
    seoTitle: "Supprimer un faux avis Google : la procédure complète | Lazarègue Avocats",
    seoDescription:
      "Faux avis, avis diffamatoire ou anonyme : les règles de Google, le signalement, le recours prévu par le DSA et l'action en justice, étape par étape.",
    slug: "supprimer-faux-avis-google",
    dom: "contenus",
    famille: "Contentieux et atteintes numériques",
    type: "Guide",
    chapo:
      "Un avis négatif ne peut être retiré au seul motif qu'il déplaît. Il peut l'être lorsqu'il est faux, dénigrant, diffamatoire ou injurieux, ou lorsqu'il divulgue des informations protégées. Google n'arbitre pas les désaccords entre un établissement et ses clients ; il retire, en revanche, les contenus contraires à ses règles ou à la loi. Le règlement européen sur les services numériques (DSA) et le droit français offrent plusieurs voies pour l'y contraindre. Leur choix dépend de deux questions : qui est visé, et qui a écrit l'avis.",
    miseAJour: "2026-10-09",
    auteur: "Alexandre Lazarègue",
    essentiel: [],
    faq: FAQ_AVIS_GOOGLE,
    une: false,
    titreUne: "",
    ordre: 4,
    liesA: ["diagnostic-avis-google"],
    exclureDesSuggestions: false,
    publie: true,
  },
  {
    title: "Votre avis Google peut-il être retiré ?",
    seoTitle: "Votre avis Google peut-il être retiré ? Diagnostic | Lazarègue Avocats",
    seoDescription:
      "Six questions pour savoir si un avis Google peut être retiré, par quelle voie et dans quel délai, avec les décisions de justice comparables.",
    slug: "diagnostic-avis-google",
    dom: "contenus",
    famille: "Contentieux et atteintes numériques",
    type: "Outil",
    chapo:
      "Six questions, deux minutes. Le résultat indique la qualification probable de l'avis, la voie adaptée et le délai qui vous reste pour agir.",
    miseAJour: "2026-10-09",
    auteur: "Alexandre Lazarègue",
    essentiel: [],
    faq: [],
    une: false,
    titreUne: "",
    ordre: 5,
    liesA: ["supprimer-faux-avis-google"],
    exclureDesSuggestions: false,
    publie: true,
    outil: true,
  },
  {
    title: "Agents IA et e-commerce : quel cadre juridique, et comment adapter ses CGV ?",
    seoTitle: "Agents IA et e-commerce : cadre juridique et CGV à adapter",
    seoDescription:
      "Commandes passées par des agents d'IA : qui est engagé, quelles CGV s'appliquent, quand exiger l'accord du client, quelles clauses ajouter. Le guide pratique.",
    slug: "agents-ia-ecommerce-cgv",
    dom: "ia",
    famille: "Conformité et gouvernance",
    type: "Guide pratique",
    chapo:
      "Les agents d'intelligence artificielle commencent à rechercher, choisir, commander et payer en ligne pour le compte de leurs utilisateurs. Pour un site marchand, la question n'est plus de savoir si ces commandes arriveront, mais comment les accepter sans risque. Ce guide expose le droit applicable et les adaptations à prévoir.",
    miseAJour: "", // aucune date affichée (consigne du cabinet)
    auteur: "Alexandre Lazarègue",
    essentiel: [],
    faq: [],
    une: false,
    titreUne: "",
    ordre: 6,
    liesA: ["cas-pratique-ia-commande-erreur"],
    exclureDesSuggestions: false,
    publie: true,
    sansTempsDeLecture: true,
  },
  {
    // Cas FICTIF à visée pédagogique : page à part (pas le gabarit d'article),
    // jamais dans /cas-clients (rubrique réservée aux dossiers réels).
    title: "Une IA commande sur votre site et se trompe : qui en supporte le risque ?",
    seoTitle: "IA qui commande sur un site e-commerce : qui supporte le risque ? Cas pratique",
    seoDescription:
      "Une commande passée par l'agent IA d'une cliente tourne mal. Vente, CGV, information, option payante, rétractation, preuve : ce que risque le e-commerçant et comment s'en prémunir.",
    slug: "cas-pratique-ia-commande-erreur",
    dom: "ia",
    famille: "Conformité et gouvernance",
    type: "Cas pratique",
    chapo:
      "Les agents d'intelligence artificielle commencent à acheter en ligne pour le compte de leurs utilisateurs. Pour une entreprise, la question n'est plus théorique : demain, une partie de vos commandes sera passée par des machines. Un cas suivi étape par étape montre où se situent vos risques, et comment les maîtriser.",
    miseAJour: "", // aucune date affichée (consigne du cabinet)
    auteur: "Alexandre Lazarègue",
    essentiel: [],
    faq: [],
    une: false,
    titreUne: "",
    ordre: 7,
    liesA: ["agents-ia-ecommerce-cgv"],
    exclureDesSuggestions: false,
    publie: true,
    sansTempsDeLecture: true,
  },
  {
    // Article de test non finalisé : non indexé, hors plan du site, listé « à paraître ».
    title: "Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser ?",
    seoTitle: "Faux conseiller bancaire : la banque doit-elle rembourser ?",
    seoDescription:
      "Faux conseiller bancaire : consentement, authentification forte, négligence grave et charge de la preuve. Critères de remboursement et démarches à engager.",
    slug: "faux-conseiller-bancaire-remboursement",
    dom: "fraude",
    famille: "Contentieux et atteintes numériques",
    type: "Ressource",
    chapo:
      "Lorsqu'un fraudeur obtient la validation d'un virement en se faisant passer pour un conseiller bancaire, le remboursement dépend notamment du consentement au paiement, de l'authentification et de l'éventuelle négligence grave du client.",
    miseAJour: "2026-09-12",
    auteur: "Alexandre Lazarègue",
    essentiel: [
      "La validation technique d'une opération ne suffit pas, à elle seule, à établir un consentement valable.",
      "La banque qui refuse le remboursement doit prouver la négligence grave qu'elle invoque.",
      "La contestation doit être adressée sans tarder, par écrit et de manière précise.",
      "Les échanges, numéros d'appel et notifications reçus doivent être conservés.",
    ],
    faq: [],
    une: false,
    titreUne: "",
    ordre: 3,
    liesA: [],
    exclureDesSuggestions: true,
    publie: false,
  },
];

/* Ressources annoncées, pas encore écrites : titre et domaine seulement, jamais
   de lien (aucune 404). Le brouillon « Faux conseiller bancaire » s'y ajoute à
   l'affichage via ARTICLES (publie: false). */
export const A_PARAITRE: { id: string; dom: Dom; titre: string }[] = [
  { id: "nis2", dom: "cyber", titre: "NIS 2 : quelles entreprises sont concernées et quelles obligations anticiper ?" },
  { id: "a28", dom: "rgpd", titre: "Article 28 du RGPD : quelles clauses prévoir avec un sous-traitant ?" },
  { id: "rw", dom: "cyber", titre: "Ransomware (rançongiciel) : les décisions juridiques à prendre dans les premières 24 heures" },
  { id: "gia", dom: "ia", titre: "Gouvernance IA : comment encadrer les usages dans l'entreprise ?" },
  { id: "der", dom: "contenus", titre: "Déréférencement Google : dans quels cas demander la suppression d'un résultat ?" },
  { id: "pme", dom: "rgpd", titre: "Mise en conformité RGPD : par où commencer dans une PME ?" },
  { id: "mnt", dom: "contrats", titre: "Contrat de maintenance informatique : quelles clauses vérifier avant de signer ?" },
  { id: "rec", dom: "contrats", titre: "Recette informatique : peut-on refuser un projet comportant des anomalies ?" },
  { id: "pic", dom: "pi", titre: "Réclamation PicRights : faut-il payer et comment répondre ?" },
  { id: "dd", dom: "ma", titre: "Due diligence technologique : que doit vérifier un acquéreur avant le closing ?" },
];

/* « Trouver par situation » : filtre de la liste (?domaine=) ou page de domaine réelle. */
export const SITUATIONS: { texte: string; href: string }[] = [
  { texte: "Une banque refuse de rembourser une fraude", href: "/ressources?domaine=fraude#liste" },
  { texte: "Une cyberattaque ou un rançongiciel perturbe l'activité", href: "/ressources?domaine=cyber#liste" },
  { texte: "Une violation de données vient de se produire", href: "/ressources?domaine=rgpd#liste" },
  { texte: "Un projet informatique n'est pas livré ou n'est pas conforme", href: "/nos-domaines/contentieux-informatique-commercial" },
  { texte: "De faux avis ou un contenu portent atteinte à l'entreprise", href: "/ressources?domaine=contenus#liste" },
  { texte: "Des fonds sont bloqués sur une plateforme de crypto-actifs", href: "/nos-domaines/crypto-actifs-blockchain" },
  { texte: "L'entreprise doit déterminer si elle relève de NIS 2", href: "/ressources?domaine=cyber#liste" },
  { texte: "Les salariés utilisent des outils d'IA sans cadre interne", href: "/ressources?domaine=ia#liste" },
  { texte: "Une acquisition nécessite l'audit des actifs technologiques", href: "/ressources?domaine=ma#liste" },
];

export const chemin = (slug: string) => `/ressources/${slug}`;

export function article(slug: string): Article {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) throw new Error(`Ressource inconnue : ${slug}`);
  return a;
}

/** L'article à la une. S'il y en a plusieurs, le plus récemment mis à jour. */
export function aLaUne(): Article | undefined {
  return ARTICLES.filter((a) => a.une && a.publie).sort((a, b) => b.miseAJour.localeCompare(a.miseAJour))[0];
}

/** Ressources publiées, dans l'ordre d'affichage. */
export function publiees(): Article[] {
  return ARTICLES.filter((a) => a.publie).sort((a, b) => a.ordre - b.ordre);
}

/**
 * « À lire aussi » : d'abord `liesA` ; à défaut, la même famille, hors article
 * courant et hors articles marqués `exclureDesSuggestions`. Un article marqué
 * `exclureDesSuggestions` ne propose que ses propres `liesA`.
 */
export function aLireAussi(slug: string): Article[] {
  const a = article(slug);
  const lies = a.liesA
    .map((s) => ARTICLES.find((x) => x.slug === s))
    .filter((x): x is Article => !!x && x.publie && x.slug !== slug);
  if (lies.length || a.exclureDesSuggestions) return lies.slice(0, 3);
  return publiees()
    .filter((x) => x.slug !== slug && x.famille === a.famille && !x.exclureDesSuggestions)
    .slice(0, 3);
}

const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."];

/** « oct. 2026 » à partir d'une date ISO ; "" si la date manque. */
export function moisAnnee(iso: string): string {
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  return m ? `${MOIS[Number(m[2]) - 1]} ${m[1]}` : "";
}
