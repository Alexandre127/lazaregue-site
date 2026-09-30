import type { Formation } from "./types";

export const CYBER: Formation = {
  slug: "cybersecurite",
  numero: "03",
  kicker: "Formation 03 · Entreprises",

  title: "Formation cybersécurité et cyberfraude pour les entreprises | Lazarègue Avocats",
  metaDescription:
    "Formation d’une journée à la cybersécurité et à la cyberfraude : obligation de sécurité, NIS 2, fraude au président, gestion d’incident. Animée par un avocat et un consultant technique.",

  h1: { avant: "Formation cybersécurité et cyberfraude ", accent: "pour les entreprises" },
  accroche:
    "Avec NIS 2, les mesures de cybersécurité doivent être approuvées par la direction, qui en répond.",
  intro:
    "Obligation de sécurité, NIS 2, nouvelles règles sur les produits numériques, fraude au président et détournement de paiements : la formation relie les obligations de l’entreprise aux gestes qui évitent l’incident et à ceux qui en limitent les conséquences.",
  reperes: [
    { label: "Public", value: "Dirigeants, DSI et RSSI, directions financières, juristes" },
    { label: "Animée par", value: "Me Alexandre Lazarègue et Khalid Sookia" },
    { label: "Durée", value: "1 journée (7 h)" },
    { label: "Format", value: "Session de 12 participants au plus, au cabinet ou à distance" },
    { label: "Tarif", value: "990 € HT (1 188 € TTC) par participant" },
  ],
  ctaPrimaire: "Réserver une place",
  ctaSecondaire: "Recevoir le programme détaillé",

  situation: {
    moment: "Mardi, 16 h 40",
    scene:
      "La comptable reçoit un e-mail du président : un virement urgent et confidentiel vers un nouveau fournisseur, avant la clôture. L’adresse paraît correcte.",
    renvoi: "La formation donne à vos équipes les réponses, et les réflexes, pour ce type de situation.",
  },

  concerne: [
    "Vos équipes exécutent-elles des virements sur instruction par e-mail ?",
    "Votre entreprise, ou l’un de vos clients, relève-t-elle de NIS 2 ?",
    "Disposez-vous d’une procédure écrite en cas d’incident ?",
  ],

  objectifs: [
    "Connaître l’obligation de sécurité et les référentiels CNIL et ANSSI",
    "Savoir si l’entreprise relève de NIS 2 et ce qu’elle doit mettre en place",
    "Reconnaître les principales techniques de cyberfraude",
    "Réagir à un incident et limiter les responsabilités",
  ],

  journee: [
    { heure: "9 h 00", titre: "Le cadre", detail: "L’obligation de sécurité · NIS 2 : qui est concerné, que faire · Produits numériques et certification" },
    { heure: "11 h 00", titre: "Les obligations en pratique", detail: "Cyberfraude · Gérer un incident" },
    { heure: "12 h 30", titre: "Déjeuner" },
    { heure: "14 h 00", titre: "Cas pratique", detail: "Une fraude au virement après compromission d’une messagerie : réagir, préserver les preuves, notifier." },
    { heure: "16 h 30", titre: "Documents et plan d’action", detail: "Remise des modèles, priorités pour votre organisation" },
    { heure: "17 h 00", titre: "Fin" },
  ],
  programme: [
    {
      num: "01",
      titre: "L’obligation de sécurité",
      points: [
        "RGPD (article 32) et loi Informatique et Libertés",
        "Référentiels de la CNIL et de l’ANSSI",
      ],
    },
    {
      num: "02",
      titre: "NIS 2 : qui est concerné, que faire",
      points: [
        "Entités essentielles et entités importantes",
        "Politique de sécurité, gestion des risques, continuité, chaîne d’approvisionnement",
        "Mesures approuvées par la direction, contrats adaptés",
        "Sanctions : jusqu’à 2 % du chiffre d’affaires mondial (entités essentielles) et 1,4 % (entités importantes)",
      ],
    },
    {
      num: "03",
      titre: "Produits numériques et certification",
      points: [
        "Cybersecurity Act et certification européenne EUCC",
        "Cyber Resilience Act : sécurité par défaut, mises à jour, signalement des vulnérabilités",
      ],
    },
    {
      num: "04",
      titre: "Cyberfraude",
      points: [
        "Hameçonnage, fraude au président, compromission de messagerie, détournement de paiements",
        "Qualification pénale et responsabilité de l’entreprise",
      ],
    },
    {
      num: "05",
      titre: "Gérer un incident",
      points: [
        "Gestion des incidents et de la crise",
        "Continuité d’activité et reprise",
        "Notification à la CNIL et aux personnes en cas de violation de données",
      ],
    },
  ],

  livrablesTitre: "5 documents prêts à l’emploi",
  livrablesIntro: "Remis à chaque participant, à l’en-tête de votre entreprise sur demande.",
  livrables: [
    {
      titre: "Procédure anti-fraude au virement",
      soustitre: "Double validation · rappel sur un numéro connu · changement de RIB",
      cases: true,
      extrait: [
        "Double validation pour tout virement",
        "Rappel sur un numéro connu avant exécution",
        "Vérification de tout changement de RIB",
        "Alerte si demande urgente et confidentielle",
      ],
    },
    {
      titre: "Fiche réflexe incident",
      soustitre: "Les premières heures : isoler, conserver, notifier",
      extrait: [
        "Isoler les systèmes touchés",
        "Conserver les preuves (journaux, messages)",
        "Notifier la CNIL et les personnes si violation de données",
        "Prévenir la direction, et l’autorité compétente si NIS 2",
      ],
    },
    {
      titre: "Check-list NIS 2",
      soustitre: "Êtes-vous concerné, que mettre en place",
      cases: true,
      extrait: [
        "Entité essentielle ou entité importante ?",
        "Politique de sécurité et gestion des risques",
        "Continuité d’activité et chaîne d’approvisionnement",
        "Mesures approuvées par la direction",
      ],
    },
    {
      titre: "Clauses de cybersécurité pour vos contrats",
      soustitre: "Fournisseurs et prestataires",
      extrait: [
        "Obligations de sécurité du prestataire",
        "Notification des incidents et des vulnérabilités",
        "Audit et réversibilité",
        "Sous-traitance et chaîne d’approvisionnement",
      ],
    },
    {
      titre: "Trame de politique de sécurité (PSSI)",
      soustitre: "Modèle à adapter",
      extrait: [
        "Périmètre et responsabilités",
        "Mesures techniques (article 32, référentiels ANSSI)",
        "Gestion des incidents et continuité",
        "Revue et validation par la direction",
      ],
    },
  ],

  formateursTitre: "Un avocat et un expert technique, ensemble",
  formateursIntro:
    "L’avocat explique obligations, responsabilités et recours. Le consultant technique montre comment l’attaque se déroule et ce qu’il faut conserver.",
  formateurs: [
    {
      slug: "alexandre",
      bio: "Fondateur de Lazarègue Avocats en 2016. Tribunes dans Le Monde sur l’IA, les données et la cybersécurité ; auteur de « L’assurance des cyber risques » (L’Argus de l’assurance, à paraître).",
    },
    { slug: "khalid", bio: "Investigation numérique : journaux, accès, configurations." },
  ],

  faq: [
    {
      q: "Qui anime la formation ?",
      a: "Me Alexandre Lazarègue et Khalid Sookia. L’un explique ce que la règle exige, l’autre ce que cela change dans vos systèmes.",
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

  hubTitre: "Cybersécurité et cyberfraude",
  hubPhrase: "Obligation de sécurité, NIS 2, fraude au président, gestion d’incident.",
  hubPublic: "Dirigeants, DSI et RSSI, directions financières, juristes",
  hubAnimee: "Me Alexandre Lazarègue · Khalid Sookia",
};
