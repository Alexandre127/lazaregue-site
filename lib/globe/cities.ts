export type GlobeCity = {
  name: string;
  lat: number;
  lon: number;
  title: string;
  insight: string;
};

export const GLOBE_CITIES: GlobeCity[] = [
  {
    name: "San Francisco",
    lat: 37.7749,
    lon: -122.4194,
    title: "Plateformes",
    insight:
      "Berceau d’Uber et Airbnb, San Francisco devient le symbole de l’économie de plateforme et de ses nouveaux défis réglementaires.",
  },
  {
    name: "Washington D.C.",
    lat: 38.9072,
    lon: -77.0369,
    title: "Antitrust",
    insight:
      "En 2024, la justice américaine juge Google responsable du maintien illégal d’un monopole sur la recherche en ligne.",
  },
  {
    name: "San Salvador",
    lat: 13.6929,
    lon: -89.2182,
    title: "Bitcoin",
    insight:
      "En 2021, le Salvador devient le premier État à adopter le Bitcoin comme monnaie légale. En 2025, pour obtenir un prêt du FMI, il rend son acceptation facultative.",
  },
  {
    name: "Nairobi",
    lat: -1.2921,
    lon: 36.8219,
    title: "Paiement mobile",
    insight:
      "Lancé au Kenya en 2007, M-Pesa fait du téléphone mobile un moyen de paiement accessible à des millions de personnes.",
  },
  {
    name: "Paris",
    lat: 48.8566,
    lon: 2.3522,
    title: "Fiscalité numérique",
    insight:
      "En 2019, la France instaure une taxe sur les services numériques visant les grandes entreprises du secteur.",
  },
  {
    name: "Bruxelles",
    lat: 50.8503,
    lon: 4.3517,
    title: "RGPD & AI Act",
    insight:
      "Du RGPD à l’AI Act, Bruxelles place la protection des données et l’intelligence artificielle au cœur de la régulation européenne du numérique.",
  },
  {
    name: "Dublin",
    lat: 53.3498,
    lon: -6.2603,
    title: "Big Tech & RGPD",
    insight:
      "En 2023, l’autorité irlandaise inflige à Meta une amende de 1,2 milliard d’euros concernant les transferts de données vers les États-Unis.",
  },
  {
    name: "Tallinn",
    lat: 59.437,
    lon: 24.7536,
    title: "État numérique",
    insight:
      "L’Estonie fait de l’identité numérique l’infrastructure d’un État où la quasi-totalité des services publics sont accessibles en ligne.",
  },
  {
    name: "Tel Aviv",
    lat: 32.0853,
    lon: 34.7818,
    title: "Cybersurveillance",
    insight:
      "L’affaire Pegasus révèle en 2021 l’ampleur internationale des enjeux juridiques liés aux logiciels espions.",
  },
  {
    name: "Hangzhou",
    lat: 30.2741,
    lon: 120.1551,
    title: "Justice numérique",
    insight:
      "En 2017, Hangzhou inaugure le premier Internet Court chinois, juridiction spécialisée dans les litiges nés en ligne.",
  },
  {
    name: "Séoul",
    lat: 37.5665,
    lon: 126.978,
    title: "Intelligence artificielle",
    insight:
      "Le 22 janvier 2026, la Corée du Sud fait entrer en vigueur sa loi-cadre sur l’intelligence artificielle, l’une des premières législations globales sur l’IA.",
  },
  {
    name: "Brasília",
    lat: -15.7939,
    lon: -47.8828,
    title: "Plateformes",
    insight:
      "En août 2024, la Cour suprême brésilienne fait suspendre X dans tout le pays, faute pour la plateforme d’avoir désigné un représentant légal.",
  },
  {
    name: "Montréal",
    lat: 45.5019,
    lon: -73.5674,
    title: "Données personnelles",
    insight:
      "Avec la Loi 25, entrée en vigueur par étapes de 2022 à 2024, le Québec rapproche sa protection des renseignements personnels des standards du RGPD.",
  },
  {
    name: "New Delhi",
    lat: 28.6139,
    lon: 77.209,
    title: "Données personnelles",
    insight:
      "En 2023, l’Inde adopte sa loi sur la protection des données personnelles numériques.",
  },
  {
    name: "Santiago",
    lat: -33.4489,
    lon: -70.6693,
    title: "Neurodroits",
    insight:
      "En 2021, le Chili devient le premier pays à protéger dans sa Constitution l’activité cérébrale et les informations qui en sont issues face aux neurotechnologies.",
  },
  {
    name: "Abuja",
    lat: 9.0765,
    lon: 7.3986,
    title: "Big Tech et données",
    insight:
      "En 2025, un tribunal nigérian confirme l’amende de 220 millions de dollars infligée à Meta et WhatsApp pour des pratiques abusives à l’égard des données des consommateurs.",
  },
  {
    name: "Durban",
    lat: -29.8587,
    lon: 31.0218,
    title: "Cyberattaque",
    insight:
      "En juillet 2021, une cyberattaque paralyse les terminaux portuaires de Transnet ; l’opérateur sud-africain invoque la force majeure.",
  },
  {
    name: "Dubaï",
    lat: 25.2048,
    lon: 55.2708,
    title: "Crypto-actifs",
    insight:
      "En 2022, Dubaï crée la VARA, l’une des premières autorités au monde entièrement dédiées à la régulation des actifs virtuels.",
  },
  {
    name: "Singapour",
    lat: 1.3521,
    lon: 103.8198,
    title: "Gouvernance de l’IA",
    insight:
      "En 2019, Singapour publie l’un des premiers cadres de gouvernance de l’IA destinés aux entreprises.",
  },
];

// Arcs de liaison entre les points conservés (indices 0–9). Densité comparable
// à l'ancienne carte ; le rendu et le comportement restent inchangés.
export const GLOBE_CONNECTION_PAIRS: [number, number][] = [
  [0, 1], // San Francisco — Washington
  [1, 2], // Washington — San Salvador
  [0, 4], // San Francisco — Paris
  [1, 6], // Washington — Dublin
  [4, 5], // Paris — Bruxelles
  [5, 6], // Bruxelles — Dublin
  [4, 7], // Paris — Tallinn
  [4, 8], // Paris — Tel Aviv
  [8, 3], // Tel Aviv — Nairobi
  [8, 9], // Tel Aviv — Hangzhou
  [6, 7], // Dublin — Tallinn
];
