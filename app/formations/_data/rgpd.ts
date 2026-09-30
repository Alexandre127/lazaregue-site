import type { Formation } from "./types";

export const RGPD: Formation = {
  slug: "rgpd",
  numero: "02",
  kicker: "Formation 02 · Entreprises",

  title: "Formation RGPD et DPO pour les entreprises | Lazarègue Avocats",
  metaDescription:
    "Formation d’une journée au RGPD et au rôle du DPO : statut et missions, sécurité, notification des violations en 72 h, documentation. Animée par un avocat et un consultant technique.",

  h1: { avant: "Formation RGPD et DPO ", accent: "pour les entreprises" },
  accroche:
    "Une violation de données doit être notifiée à la CNIL dans les 72 heures lorsqu’elle présente un risque pour les personnes.",
  intro:
    "Le délégué à la protection des données conseille, contrôle et fait le lien avec la CNIL. La formation donne au DPO, et à ceux qui travaillent avec lui, les règles, les réflexes et les documents qui permettent de démontrer la conformité.",
  reperes: [
    { label: "Public", value: "DPO, responsables de traitement, sous-traitants, juristes" },
    { label: "Animée par", value: "Me Sarah Hinderer et Khalid Sookia" },
    { label: "Durée", value: "1 journée (7 h)" },
    { label: "Format", value: "Session de 12 participants au plus, au cabinet ou à distance" },
    { label: "Tarif", value: "990 € HT (1 188 € TTC) par participant" },
  ],
  ctaPrimaire: "Réserver une place",
  ctaSecondaire: "Recevoir le programme détaillé",

  situation: {
    moment: "Vendredi, 18 h",
    scene:
      "Un ordinateur portable contenant le fichier clients est volé dans un train. Faut-il prévenir la CNIL ? Avant quand ? Écrire aux clients ?",
    renvoi: "La formation donne à vos équipes les réponses, et les réflexes, pour ce type de situation.",
  },

  concerne: [
    "Avez-vous désigné un DPO, ou devez-vous le faire ?",
    "Traitez-vous des données de clients, de salariés ou de patients ?",
    "Sauriez-vous notifier une violation en 72 heures ?",
  ],

  objectifs: [
    "Maîtriser le rôle, les missions et les garanties du DPO",
    "Organiser la gouvernance interne de la protection des données",
    "Gérer la sécurité et la notification des violations",
    "Documenter la conformité : registre, analyses d’impact, politiques, audits",
  ],

  journee: [
    { heure: "9 h 00", titre: "Le cadre", detail: "Le statut du DPO · Les missions du DPO" },
    { heure: "11 h 00", titre: "Les obligations en pratique", detail: "Sécurité et violations de données · Protection dès la conception et documentation" },
    { heure: "12 h 30", titre: "Déjeuner" },
    { heure: "14 h 00", titre: "Cas pratique", detail: "Une violation de données : la qualifier, notifier la CNIL, informer les personnes, documenter les décisions." },
    { heure: "16 h 30", titre: "Documents et plan d’action", detail: "Remise des modèles, priorités pour votre organisation" },
    { heure: "17 h 00", titre: "Fin" },
  ],
  programme: [
    {
      num: "01",
      titre: "Le statut du DPO",
      points: [
        "Être associé en temps utile à toutes les questions de protection des données",
        "Disposer des ressources, de l’accès aux données et de la formation nécessaires",
        "Exercer sans instruction, sans sanction liée à ses missions, sans conflit d’intérêts",
        "Rendre compte au plus haut niveau de la direction",
      ],
    },
    {
      num: "02",
      titre: "Les missions du DPO",
      points: [
        "Informer et conseiller l’entreprise et ses équipes",
        "Contrôler le respect du RGPD et des règles internes",
        "Conseiller sur les analyses d’impact et en suivre l’exécution",
        "Coopérer avec la CNIL et répondre aux personnes concernées",
      ],
    },
    {
      num: "03",
      titre: "Sécurité et violations de données",
      points: [
        "Les mesures de l’article 32 : chiffrement, disponibilité, tests réguliers",
        "Les recommandations de la CNIL",
        "Notifier la CNIL dans les 72 heures",
        "Informer les personnes concernées",
      ],
    },
    {
      num: "04",
      titre: "Protection dès la conception et documentation",
      points: [
        "Protection des données dès la conception et par défaut",
        "Conduire une analyse d’impact",
        "Tenir le registre, les politiques internes et les audits",
      ],
    },
  ],

  livrablesTitre: "5 documents prêts à l’emploi",
  livrablesIntro: "Remis à chaque participant, à l’en-tête de votre entreprise sur demande.",
  livrables: [
    {
      titre: "Procédure de gestion des violations de données",
      soustitre: "Qualifier · notifier · informer · documenter",
      extrait: [
        "Qualifier : y a-t-il un risque pour les personnes ?",
        "Notifier la CNIL dans les 72 heures",
        "Informer les personnes si le risque est élevé",
        "Documenter la décision et les mesures prises",
      ],
    },
    {
      titre: "Modèle de notification à la CNIL",
      soustitre: "Les informations à réunir en 72 heures",
      extrait: [
        "Nature de la violation et catégories de données",
        "Nombre approximatif de personnes concernées",
        "Conséquences probables et mesures prises",
        "Coordonnées du DPO",
      ],
    },
    {
      titre: "Registre des activités de traitement",
      soustitre: "Modèle commenté",
      extrait: [
        "Traitement · Finalité",
        "Base légale · Durée de conservation",
        "Destinataires",
        "Une ligne par traitement",
      ],
    },
    {
      titre: "Trame d’analyse d’impact (AIPD)",
      soustitre: "Pour les traitements à risque élevé",
      extrait: [
        "Description du traitement et de sa finalité",
        "Nécessité et proportionnalité",
        "Risques pour les droits et libertés",
        "Mesures : chiffrement, disponibilité, tests réguliers (article 32)",
      ],
    },
    {
      titre: "Check-list sécurité",
      soustitre: "Article 32 et recommandations de la CNIL",
      cases: true,
      extrait: [
        "Chiffrement des données sensibles",
        "Sauvegardes et disponibilité",
        "Tests réguliers des mesures (article 32)",
        "Journalisation des accès",
      ],
    },
  ],

  formateursTitre: "Un avocat et un expert technique, ensemble",
  formateursIntro:
    "L’avocate traite le cadre juridique et la relation avec la CNIL. Le consultant technique traduit l’obligation de sécurité en mesures vérifiables sur votre système d’information.",
  formateurs: [
    { slug: "sarah", bio: "Données personnelles et intelligence artificielle." },
    { slug: "khalid", bio: "Investigation numérique : journaux, accès, configurations." },
  ],

  faq: [
    {
      q: "Qui anime la formation ?",
      a: "Me Sarah Hinderer et Khalid Sookia. L’un explique ce que la règle exige, l’autre ce que cela change dans vos systèmes.",
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

  hubTitre: "RGPD et DPO",
  hubPhrase: "Statut et missions du DPO, sécurité, violations de données, documentation.",
  hubPublic: "DPO, responsables de traitement, sous-traitants, juristes",
  hubAnimee: "Me Sarah Hinderer · Khalid Sookia",
};
