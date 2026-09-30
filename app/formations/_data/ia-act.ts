import type { Formation } from "./types";

export const IA_ACT: Formation = {
  slug: "intelligence-artificielle-entreprise",
  numero: "01",
  kicker: "Formation 01 · Entreprises",

  title: "Formation IA Act pour les entreprises | Lazarègue Avocats",
  metaDescription:
    "Formation d’une journée au règlement européen sur l’IA (IA Act) : usages interdits, systèmes à haut risque, obligations par rôle. Animée par un avocat et une experte technique.",

  h1: { avant: "Formation IA Act ", accent: "pour les entreprises" },
  // TODO (cabinet) : vérifier que l'accroche article 4 reste exacte après le
  // règlement modificatif cité sur la page IA (/nos-domaines/avocat-intelligence-artificielle).
  accroche:
    "Depuis le 2 février 2025, le règlement impose de s’assurer que les personnes qui utilisent l’IA en ont une maîtrise suffisante (article 4).",
  intro:
    "Le règlement européen sur l’intelligence artificielle interdit certains usages, encadre les systèmes à haut risque et répartit les obligations entre ceux qui fournissent, importent, distribuent ou utilisent un système. La formation traduit ces règles en décisions concrètes pour vos équipes.",
  reperes: [
    { label: "Public", value: "Juristes, directions métiers, ressources humaines, DSI" },
    { label: "Animée par", value: "Me Sarah Hinderer et Nadia Abchiche-Mimouni" },
    { label: "Durée", value: "1 journée (7 h)" },
    { label: "Format", value: "Session de 12 participants au plus, au cabinet ou à distance" },
    { label: "Tarif", value: "990 € HT (1 188 € TTC) par participant" },
  ],
  ctaPrimaire: "Réserver une place",
  ctaSecondaire: "Recevoir le programme détaillé",

  situation: {
    moment: "Lundi, 9 h",
    scene:
      "La DRH découvre qu’un outil trie les candidatures depuis six mois. Qui l’a autorisé ? Relève-t-il du « haut risque » ? Le CSE a-t-il été informé ?",
    renvoi: "La formation donne à vos équipes les réponses, et les réflexes, pour ce type de situation.",
  },

  concerne: [
    "Vos salariés utilisent-ils un outil d’IA générative ?",
    "Un outil d’IA intervient-il dans le recrutement ou l’évaluation ?",
    "Vendez-vous un produit ou un service qui intègre de l’IA ?",
  ],

  objectifs: [
    "Repérer les usages de l’IA interdits par le règlement",
    "Reconnaître un système d’IA « à haut risque »",
    "Savoir quelles obligations pèsent sur l’entreprise selon son rôle",
    "Articuler le règlement IA avec le RGPD, le droit du travail et la cybersécurité",
  ],

  journee: [
    { heure: "9 h 00", titre: "Le cadre", detail: "Ce que le règlement interdit · Reconnaître un système à haut risque · Qui doit faire quoi" },
    { heure: "11 h 00", titre: "Les obligations en pratique", detail: "L’IA sur le lieu de travail · Gouvernance et suivi" },
    { heure: "12 h 30", titre: "Déjeuner" },
    { heure: "14 h 00", titre: "Cas pratique", detail: "Le déploiement d’un système d’IA à haut risque dans l’entreprise : qualifier le système, identifier les obligations, constituer la documentation." },
    { heure: "16 h 30", titre: "Documents et plan d’action", detail: "Remise des modèles, priorités pour votre organisation" },
    { heure: "17 h 00", titre: "Fin" },
  ],
  programme: [
    {
      num: "01",
      titre: "Ce que le règlement interdit",
      points: [
        "Manipulation et exploitation des vulnérabilités",
        "Notation sociale et prédiction d’infractions sur profil",
        "Reconnaissance faciale par collecte massive d’images",
        "Reconnaissance des émotions au travail et dans l’enseignement",
        "Catégorisation biométrique fondée sur des données sensibles",
      ],
    },
    {
      num: "02",
      titre: "Reconnaître un système à haut risque",
      points: [
        "Composants de sécurité de produits réglementés (annexe I)",
        "Emploi, éducation, accès au crédit (annexe III)",
        "Ce que la qualification change pour l’entreprise",
      ],
    },
    {
      num: "03",
      titre: "Qui doit faire quoi",
      points: [
        "Fournisseurs : gestion des risques, qualité des données, documentation, journalisation, contrôle humain, robustesse, marquage CE",
        "Importateurs et distributeurs : vérifier la conformité avant la mise sur le marché",
        "Utilisateurs (déployeurs) : analyse d’impact sur les droits fondamentaux, et analyse d’impact RGPD le cas échéant",
      ],
    },
    {
      num: "04",
      titre: "L’IA sur le lieu de travail",
      points: [
        "Évaluer les risques avant le déploiement et mettre à jour le document unique",
        "Informer les représentants du personnel et les salariés",
        "Ce qui est interdit : inférer les émotions des salariés",
      ],
    },
    {
      num: "05",
      titre: "Gouvernance et suivi",
      points: [
        "Surveillance après la mise sur le marché et signalement des incidents graves",
        "Normes techniques et organismes d’évaluation",
        "Lien avec le RGPD et la cybersécurité",
      ],
    },
  ],

  livrablesTitre: "5 documents prêts à l’emploi",
  livrablesIntro: "Remis à chaque participant, à l’en-tête de votre entreprise sur demande.",
  livrables: [
    {
      titre: "Grille de qualification des systèmes d’IA",
      soustitre: "Interdit · haut risque · transparence · risque minimal",
      cases: true,
      extrait: [
        "Usage interdit — manipulation, notation sociale, reconnaissance des émotions au travail",
        "Haut risque — emploi, éducation, accès au crédit (annexe III)",
        "Transparence — IA générative, contenus artificiels",
        "Risque minimal",
      ],
    },
    {
      titre: "Tableau des obligations par rôle",
      soustitre: "Fournisseur · importateur · distributeur · déployeur",
      extrait: [
        "Fournisseur — gestion des risques, documentation, journalisation, contrôle humain, marquage CE",
        "Importateur et distributeur — vérifier la conformité avant la mise sur le marché",
        "Déployeur — analyse d’impact sur les droits fondamentaux ; AIPD le cas échéant",
      ],
    },
    {
      titre: "Charte d’utilisation de l’IA générative",
      soustitre: "Ce qui peut être saisi, par qui, avec quels outils",
      extrait: [
        "Outils autorisés dans l’entreprise",
        "Ce qui ne doit jamais être saisi dans un outil d’IA",
        "Qui peut l’utiliser, pour quelles tâches",
        "Contrôle humain avant d’utiliser le résultat",
      ],
    },
    {
      titre: "Trame d’analyse d’impact sur les droits fondamentaux",
      soustitre: "Pour les systèmes à haut risque",
      extrait: [
        "Système concerné, finalité et personnes affectées",
        "Risques pour les droits fondamentaux",
        "Mesures de contrôle humain et de surveillance",
        "Suivi après la mise sur le marché",
      ],
    },
    {
      titre: "Inventaire des outils d’IA de l’entreprise",
      soustitre: "Modèle à remplir",
      extrait: [
        "Outil · Rôle (fournisseur / déployeur)",
        "Niveau de risque · Responsable",
        "Une ligne par outil de l’entreprise",
      ],
    },
  ],

  formateursTitre: "Un avocat et un expert technique, ensemble",
  formateursIntro:
    "L’avocate explique ce que le règlement exige. L’experte montre comment cela se vérifie sur un système réel : données d’entraînement, journalisation, contrôle humain.",
  formateurs: [
    { slug: "sarah", bio: "Données personnelles et intelligence artificielle." },
    {
      slug: "nadia",
      bio: "Maîtresse de conférences en informatique à l’Université Côte d’Azur. Architecture des systèmes, jeux de données, supervision, biais.",
    },
  ],

  faq: [
    {
      q: "Qui anime la formation ?",
      a: "Me Sarah Hinderer et Nadia Abchiche-Mimouni. L’un explique ce que la règle exige, l’autre ce que cela change dans vos systèmes.",
    },
    {
      q: "La formation est-elle finançable par un OPCO ?",
      a: "Pas à ce jour. La journée est animée par deux intervenants, un avocat et un expert technique, pour le prix d’une inscription en catalogue.",
    },
    {
      q: "Peut-on l’adapter à notre secteur ?",
      a: "Oui. Les exemples et le cas pratique sont construits à partir de votre activité et, si vous le souhaitez, de vos propres situations.",
    },
    {
      q: "Quels sont la durée, le format et le tarif ?",
      a: "Une journée de 7 heures : 990 € HT (1 188 € TTC) par participant, en session de 12 personnes au plus, au cabinet ou à distance. Pour former toute une équipe dans vos locaux, sur devis.",
    },
  ],

  ctaFinalTitre: "Organiser la formation pour vos équipes",
  ctaFinalTexte: "Indiquez le public, le nombre de participants et vos contraintes.",

  hubTitre: "IA Act",
  hubPhrase: "Usages interdits, systèmes à haut risque, obligations de chaque acteur.",
  hubPublic: "Juristes, directions métiers, ressources humaines, DSI",
  hubAnimee: "Me Sarah Hinderer · Nadia Abchiche-Mimouni",
};
