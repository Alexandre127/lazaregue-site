import type { Formation } from "./types";

export const AVOCATS: Formation = {
  slug: "ia-avocats",
  numero: "04",
  kicker: "Formation 04 · Avocats et juristes",

  title: "Formation IA pour les avocats : l’Avocat augmenté | Lazarègue Avocats",
  metaDescription:
    "Formation d’une journée pour les avocats et juristes : l’IA comme environnement de travail, de la prospection à la décision de justice. Aucun prérequis technique, 10 participants au plus.",

  h1: { avant: "Formation IA pour les avocats : ", accent: "l’Avocat augmenté" },
  accroche: "L’IA ne rend pas un cabinet plus productif. Son organisation, si.",
  intro:
    "Ni un cours de ChatGPT, ni un atelier de productivité : l’IA y est présentée comme un nouvel environnement de travail, de la prospection du client jusqu’à la décision de justice. Le matin pour comprendre, l’après-midi pour pratiquer sur un dossier réel.",
  reperes: [
    { label: "Public", value: "Avocats, élèves-avocats et juristes · aucun prérequis technique" },
    { label: "Animée par", value: "Me Alexandre Lazarègue et Me Sarah Hinderer" },
    { label: "Durée", value: "1 journée (7 h)" },
    { label: "Format", value: "10 participants au plus" },
    { label: "Tarif", value: "990 € HT (1 188 € TTC) par participant" },
  ],
  ctaPrimaire: "Réserver une place",
  ctaSecondaire: "Recevoir le programme détaillé",

  situation: {
    moment: "Lundi, 8 h 30",
    scene:
      "Quarante e-mails sont arrivés pendant le week-end, avec des pièces pour six dossiers différents. Il faudra la matinée pour les classer et préparer les bordereaux.",
    renvoi: "La formation donne à vos équipes les réponses, et les réflexes, pour ce type de situation.",
  },

  concerne: [
    "Recevez-vous chaque jour des pièces par e-mail à classer ?",
    "Rédigez-vous des conclusions longues sous contrainte de délai ?",
    "Utilisez-vous l’IA sans cadre au regard du secret professionnel ?",
  ],

  objectifs: [
    "Classer les pièces, préparer les bordereaux et suivre les échéances avec des outils d’IA",
    "Analyser un dossier, rédiger et renforcer des conclusions, rechercher en vérifiant les sources",
    "Mener une recherche en sources ouvertes (OSINT)",
    "Automatiser une partie du travail du cabinet, avec ou sans code, dans le respect du secret professionnel",
  ],

  journee: [
    { heure: "9 h 00", titre: "Le matin : les usages, étape par étape", detail: "Développer le cabinet · Le dossier · Rédiger et rechercher" },
    { heure: "11 h 00", titre: "Suite des usages", detail: "Enquêter · L’avocat augmenté par le code · Piloter le cabinet et protéger le secret" },
    { heure: "12 h 30", titre: "Déjeuner" },
    { heure: "14 h 00", titre: "L’après-midi : votre dossier", detail: "Chaque participant applique la méthode à un dossier réel qu’il apporte." },
    { heure: "16 h 30", titre: "Ce que vous mettez en place lundi", detail: "Priorités et outils retenus pour votre cabinet" },
    { heure: "17 h 00", titre: "Fin" },
  ],
  programme: [
    { num: "01", titre: "Développer le cabinet", points: ["Préparer la rencontre du prospect et la proposition d’honoraires", "Prospection et relation client"] },
    { num: "02", titre: "Le dossier", points: ["Ouvrir et organiser le dossier, classer les pièces reçues", "Analyser le dossier et reconstituer la chronologie"] },
    { num: "03", titre: "Rédiger et rechercher", points: ["Rédiger et renforcer des conclusions", "Recherche juridique : vérifier chaque source"] },
    { num: "04", titre: "Enquêter", points: ["OSINT : recherches en sources ouvertes sur une partie ou un fait"] },
    { num: "05", titre: "L’avocat augmenté par le code", points: ["Automatiser sans être développeur : Cursor, Python, n8n, Make"] },
    { num: "06", titre: "Piloter le cabinet et protéger le secret", points: ["Tableau de bord de rentabilité", "Quels outils, quelles données : l’IA et le secret professionnel"] },
  ],

  livrablesTitre: "6 documents prêts à l’emploi",
  livrablesIntro: "Remis à chaque participant, à l’en-tête de votre cabinet sur demande.",
  livrables: [
    {
      titre: "Bibliothèque de consignes (prompts)",
      soustitre: "Par étape du dossier, de la prospection à l’audience",
      extrait: [
        "Développer le cabinet : proposition d’honoraires",
        "Le dossier : classer les pièces, chronologie",
        "Rédiger : conclusions, recherche vérifiée",
        "Enquêter : OSINT sur une partie ou un fait",
      ],
    },
    {
      titre: "Workflow de classement des pièces reçues par e-mail",
      soustitre: "Avec n8n ou Make, prêt à adapter",
      extrait: [
        "Réception d’un e-mail avec pièces",
        "Identification du dossier concerné",
        "Renommage et classement des pièces",
        "Mise à jour du bordereau (n8n ou Make)",
      ],
    },
    {
      titre: "Modèle de bordereau de communication de pièces",
      soustitre: "Généré à partir du dossier",
      extrait: [
        "N° · Nature de la pièce",
        "Date · Cote",
        "Généré à partir du dossier",
      ],
    },
    {
      titre: "Tableau de suivi des échéances et relances",
      soustitre: "Modèle",
      extrait: [
        "Dossier · Échéance",
        "Action · Relance",
        "Une ligne par échéance",
      ],
    },
    {
      titre: "Grille d’usage de l’IA et secret professionnel",
      soustitre: "Quels outils, quelles données, quelles précautions",
      cases: true,
      extrait: [
        "Où l’outil est hébergé, avec quelles garanties",
        "Données transmises : anonymisées ?",
        "Consentement du client si nécessaire",
        "Vérification humaine du résultat",
      ],
    },
    {
      titre: "Tableau de bord de rentabilité du cabinet",
      soustitre: "Modèle",
      extrait: [
        "Dossier · Temps passé",
        "Honoraires · Marge",
        "Modèle à remplir",
      ],
    },
  ],

  formateursTitre: "Deux avocats praticiens",
  formateursIntro:
    "La formation est animée par des avocats qui utilisent ces outils dans leurs propres dossiers, pas par des spécialistes de la productivité.",
  formateurs: [
    {
      slug: "alexandre",
      bio: "Fondateur de Lazarègue Avocats en 2016. Tribunes dans Le Monde sur l’IA, les données et la cybersécurité ; auteur de « L’assurance des cyber risques » (L’Argus de l’assurance, à paraître).",
    },
    // Coanimatrice : Me Sarah Hinderer. Nom, statut et photo proviennent de la
    // source unique lib/equipe.ts (slug « sarah ») — photo de référence identique
    // au reste du site.
    { slug: "sarah", bio: "Avocate aux barreaux de Paris et de Montréal. Intervient en données personnelles et en intelligence artificielle, du cadre réglementaire à sa mise en œuvre dans les dossiers." },
  ],

  faq: [
    { q: "Faut-il des connaissances techniques ?", a: "Non. Aucun prérequis technique n’est demandé." },
    {
      q: "Peut-on utiliser l’IA sans méconnaître le secret professionnel ?",
      a: "C’est l’un des objets de la journée : quels outils, quelles données, quelles précautions contractuelles et techniques.",
    },
    { q: "Que faut-il apporter ?", a: "Un dossier réel, anonymisé si nécessaire, sur lequel vous travaillez l’après-midi." },
    { q: "Quel est le tarif ?", a: "990 € HT (1 188 € TTC) par participant, pour une journée de 7 heures." },
  ],

  ctaFinalTitre: "Réserver une place",
  ctaFinalTexte: "Dix participants au plus par session.",

  hubTitre: "L’Avocat augmenté",
  hubPhrase: "Exercer le métier d’avocat à l’ère de l’IA, de la prospection à la décision de justice. Une journée, 10 participants au plus, 990 € HT (1 188 € TTC) par participant.",
  hubPublic: "Avocats, élèves-avocats et juristes",
  hubAnimee: "Me Alexandre Lazarègue · Me Sarah Hinderer",
};
