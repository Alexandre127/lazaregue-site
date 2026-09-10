/**
 * Données des articles + type, dans un module neutre (pas de "use client").
 * La page serveur les lit pour `generateMetadata`, le composant client pour
 * le rendu — un composant client ne peut pas exporter de données vers un
 * composant serveur.
 */
export type TocItem = { id: string; label: string };

export type ExpertQuote = { text: string };

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  expert?: ExpertQuote;
};

export type Article = {
  slug: string;
  category: string;
  categoryColor: string;
  date: string;
  readTime: string;
  title: string;
  chapo: string;
  author: { initials: string; name: string; role: string };
  heroImageBg: string;
  toc: TocItem[];
  sections: ArticleSection[];
  related: { slug: string; tag: string; title: string; color: string }[];
};

export const ARTICLES: Record<string, Article> = {
  "cyberattaque-72h": {
    slug: "cyberattaque-72h",
    category: "Cybersécurité",
    categoryColor: "#E24B4A",
    date: "12 mai 2026",
    readTime: "8 min",
    title:
      "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
    chapo:
      "Les trois premiers jours conditionnent la résilience opérationnelle, la conformité réglementaire et la crédibilité de l'entreprise face à ses partenaires, clients et autorités.",
    author: {
      initials: "AL",
      name: "Alexandre Lazarègue",
      role: "Avocat — Cybercriminalité & gestion de crise",
    },
    heroImageBg: "linear-gradient(135deg, #0a1428 0%, #1a2a50 50%, #0e1a38 100%)",
    toc: [
      { id: "enjeu", label: "Les 72 premières heures" },
      { id: "cellule", label: "Constituer la cellule de crise" },
      { id: "preuves", label: "Préserver les preuves" },
      { id: "obligations", label: "Obligations réglementaires" },
      { id: "communication", label: "Communiquer avec maîtrise" },
    ],
    sections: [
      {
        id: "enjeu",
        heading: "Les 72 premières heures : l'enjeu décisif",
        paragraphs: [
          "Une cyberattaque n'est pas seulement un incident technique. C'est une séquence juridique, réputationnelle et contractuelle qui s'accélère dès la première heure.",
          "Les décisions prises dans les 72 heures suivant la détection — gel des systèmes, préservation des logs, activation des assurances, notification des autorités — déterminent souvent l'ampleur du préjudice et la tenue des recours ultérieurs.",
        ],
        expert: {
          text: "Le réflexe de tout restaurer immédiatement est compréhensible, mais il peut détruire des éléments de preuve essentiels. La priorité est la stabilité juridique de la réponse, pas la vitesse apparente.",
        },
      },
      {
        id: "cellule",
        heading: "Étape 1 — Constituer la cellule de crise",
        paragraphs: [
          "La cellule doit réunir direction générale, RSSI ou DSI, responsable conformité, communication et conseil juridique. Chaque canal de décision doit être identifié avant toute déclaration externe.",
        ],
        bullets: [
          "Désigner un décideur unique et un porte-parole distinct",
          "Activer le contrat de réponse à incident et l'assurance cyber",
          "Documenter l'heure de détection et les premiers symptômes",
        ],
      },
      {
        id: "preuves",
        heading: "Étape 2 — Préserver les preuves",
        paragraphs: [
          "Les journaux, captures réseau, échanges avec l'attaquant et copies des systèmes affectés constituent la base des investigations et des procédures éventuelles.",
        ],
        bullets: [
          "Isoler sans effacer les environnements compromis",
          "Centraliser les échanges internes et externes",
          "Mandater un prestataire forensic sous contrôle du conseil",
        ],
        expert: {
          text: "En contentieux, l'entreprise qui n'a pas su conserver les preuves se retrouve en position de faiblesse, y compris face à son propre assureur.",
        },
      },
      {
        id: "obligations",
        heading: "Étape 3 — Évaluer les obligations réglementaires",
        paragraphs: [
          "Selon la nature des données et le statut de l'entité, des notifications CNIL, ANSSI ou autorités sectorielles peuvent être requises dans des délais contraints.",
          "L'analyse doit distinguer incident de sécurité, violation de données personnelles et obligation de signalement NIS 2.",
        ],
      },
      {
        id: "communication",
        heading: "Étape 4 — Communiquer avec maîtrise",
        paragraphs: [
          "Tout message public ou adressé aux clients doit être validé juridiquement. L'objectif est de préserver la confiance sans admettre prématurément des faits encore en investigation.",
        ],
        expert: {
          text: "Une communication trop rapide ou imprécise crée souvent plus de risques que le silence temporaire d'une cellule bien structurée.",
        },
      },
    ],
    related: [
      {
        slug: "violation-donnees-rgpd",
        tag: "RGPD",
        title: "Violation de données : les obligations légales",
        color: "#1A47FF",
      },
      {
        slug: "rupture-contrat-saas",
        tag: "Contentieux IT",
        title: "Rupture de contrat SaaS : les recours juridiques",
        color: "#E24B4A",
      },
      {
        slug: "ai-act-entreprises",
        tag: "IA & Conformité",
        title: "AI Act : ce que les entreprises françaises doivent anticiper",
        color: "#1D9E75",
      },
    ],
  },
  "ai-act-entreprises": {
    slug: "ai-act-entreprises",
    category: "IA & Conformité",
    categoryColor: "#1D9E75",
    date: "Mai 2026",
    readTime: "6 min",
    title: "AI Act : ce que les entreprises françaises doivent anticiper",
    chapo:
      "Cartographie des systèmes, documentation et gouvernance : les fondations d'une mise en conformité progressive.",
    author: {
      initials: "SH",
      name: "Sarah Hinderer",
      role: "Avocat — Données & IA",
    },
    heroImageBg: "linear-gradient(135deg, #081408, #0c1a10)",
    toc: [{ id: "cadre", label: "Le cadre AI Act" }],
    sections: [
      {
        id: "cadre",
        heading: "Le cadre AI Act",
        paragraphs: [
          "Les entreprises déployant ou intégrant des systèmes d'IA doivent anticiper les obligations de transparence, de supervision humaine et de gestion des risques selon le niveau de criticité du système.",
        ],
      },
    ],
    related: [
      {
        slug: "cyberattaque-72h",
        tag: "Cybersécurité",
        title:
          "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
        color: "#E24B4A",
      },
    ],
  },
  "rupture-contrat-saas": {
    slug: "rupture-contrat-saas",
    category: "Contentieux IT",
    categoryColor: "#E24B4A",
    date: "Avr. 2026",
    readTime: "7 min",
    title: "Rupture de contrat SaaS : les recours juridiques",
    chapo:
      "Indisponibilité prolongée, résiliation unilatérale et préjudice commercial : structurer une réponse contentieuse efficace.",
    author: {
      initials: "AL",
      name: "Alexandre Lazarègue",
      role: "Avocat — Contentieux informatique",
    },
    heroImageBg: "linear-gradient(135deg, #1a0808, #1e0c10)",
    toc: [{ id: "recours", label: "Les recours disponibles" }],
    sections: [
      {
        id: "recours",
        heading: "Les recours disponibles",
        paragraphs: [
          "L'analyse contractuelle doit précéder toute mise en demeure : périmètre de service, SLA, limites de responsabilité et clauses de sortie.",
        ],
      },
    ],
    related: [
      {
        slug: "cyberattaque-72h",
        tag: "Cybersécurité",
        title:
          "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
        color: "#E24B4A",
      },
    ],
  },
  "violation-donnees-rgpd": {
    slug: "violation-donnees-rgpd",
    category: "RGPD",
    categoryColor: "#1A47FF",
    date: "Mars 2026",
    readTime: "6 min",
    title: "Violation de données : les obligations légales",
    chapo:
      "Notification CNIL, registre des violations et information des personnes : le plan d'action juridique en 48 heures.",
    author: {
      initials: "SH",
      name: "Sarah Hinderer",
      role: "Avocat — RGPD & données",
    },
    heroImageBg: "linear-gradient(135deg, #0a0f1e, #0e1530)",
    toc: [{ id: "plan", label: "Plan d'action 48h" }],
    sections: [
      {
        id: "plan",
        heading: "Plan d'action 48h",
        paragraphs: [
          "La qualification de la violation et l'évaluation du risque pour les personnes concernées orientent le calendrier de notification et les mesures correctives.",
        ],
      },
    ],
    related: [
      {
        slug: "cyberattaque-72h",
        tag: "Cybersécurité",
        title:
          "Cyberattaque en entreprise : comment réagir dans les 72 premières heures ?",
        color: "#E24B4A",
      },
    ],
  },
};

export const DEFAULT_SLUG = "cyberattaque-72h";
