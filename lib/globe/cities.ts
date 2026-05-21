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
    title: "Naissance de l'économie de plateforme & régulation IA",
    insight:
      "Berceau d'Airbnb (2008) et d'Uber, qui forcent la révision mondiale du droit du travail. En 2019, première ville au monde à interdire la reconnaissance faciale par les autorités publiques. En 2023, OpenAI y négocie des licences avec les médias pour entraîner ses modèles d'IA.",
  },
  {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
    title: "BitLicense & procès IA pour droit d'auteur",
    insight:
      "En 2015, l'État de New York crée le premier cadre réglementaire strict pour les exchanges crypto (BitLicense). À partir de 2023, auteurs et médias y intentent les premiers procès mondiaux contre les entreprises d'IA pour violation du droit d'auteur lors de l'entraînement des modèles.",
  },
  {
    name: "Washington D.C.",
    lat: 38.9072,
    lon: -77.0369,
    title: "Effondrement FTX & procès antitrust Google",
    insight:
      "L'effondrement de FTX (2022) — 8 Md$ détournés, Sam Bankman-Fried condamné à 25 ans — accélère la régulation mondiale des exchanges. En 2023, le DOJ remporte son procès contre Google pour monopole illégal sur les moteurs de recherche, première victoire antitrust tech depuis Microsoft en 2001.",
  },
  {
    name: "Austin",
    lat: 30.2672,
    lon: -97.7431,
    title: "Tesla & le droit du véhicule autonome",
    insight:
      "Tesla y développe ses technologies de conduite autonome, alimentées par des milliards de km de données vidéo collectées sur les véhicules. Le site pose la question centrale du droit de la donnée embarquée et de la responsabilité civile en cas d'accident d'un véhicule autonome.",
  },
  {
    name: "Las Vegas",
    lat: 36.1699,
    lon: -115.1398,
    title: "CES — baromètre mondial de l'innovation tech",
    insight:
      "Le Consumer Electronics Show présente chaque année les nouveaux outils d'IA grand public, de robotique, de surveillance connectée et de véhicules autonomes. Premier baromètre mondial des innovations qui deviendront des enjeux juridiques dans les 5 ans suivants.",
  },
  {
    name: "San Salvador",
    lat: 13.6929,
    lon: -89.2182,
    title: "Bitcoin adopté comme monnaie légale nationale",
    insight:
      "En 2021, le Salvador devient le premier État au monde à adopter le Bitcoin comme monnaie légale. Défi direct au droit monétaire international et au FMI, qui refuse tout prêt conditionné à ce choix. Expérience pionnière toujours observée par les juristes et économistes du monde entier.",
  },
  {
    name: "São Paulo",
    lat: -23.5505,
    lon: -46.6333,
    title: "LGPD — le RGPD de l'Amérique latine",
    insight:
      "Entrée en vigueur en 2020 de la LGPD (Lei Geral de Proteção de Dados), calquée sur le RGPD européen. S'applique à l'économie numérique la plus grande d'Amérique latine (215 M d'habitants). São Paulo devient le modèle de souveraineté numérique pour les pays émergents d'Amérique du Sud et d'Afrique.",
  },
  {
    name: "Lagos",
    lat: 6.5244,
    lon: 3.3792,
    title: "Nigeria Startup Act — structurer l'économie numérique par le droit",
    insight:
      "Lagos est le premier hub de startups d'Afrique. En 2022, le Nigeria Startup Act crée un cadre légal inédit : statut juridique des startups, incitations fiscales, accès au financement. Modèle suivi par d'autres pays africains pour structurer leur économie numérique émergente.",
  },
  {
    name: "Nairobi",
    lat: -1.2921,
    lon: 36.8219,
    title: "M-Pesa — la finance mobile sans banque",
    insight:
      "Nairobi est le berceau de M-Pesa (2007), service de paiement mobile qui bancarise 40 millions de personnes sans compte bancaire. Cas d'école mondial : la technologie précède et force le droit. Le Kenya adapte sa réglementation financière en temps réel. Modèle copié dans 40+ pays.",
  },
  {
    name: "Paris",
    lat: 48.8566,
    lon: 2.3522,
    title: "Taxe GAFA & pionnière de la justice prédictive",
    insight:
      "En 2019, la France instaure la taxe sur les services numériques (taxe GAFA), déclenchant un séisme diplomatique qui pousse l'OCDE à réformer la fiscalité internationale (taux minimum 15 %). En 2017, naissance de Predictice, pionnière mondiale de la justice prédictive par IA.",
  },
  {
    name: "Bruxelles",
    lat: 50.8503,
    lon: 4.3517,
    title: "RGPD & AI Act — l'effet Bruxelles mondial",
    insight:
      "Le RGPD (2018) redéfinit le droit des données personnelles dans 130+ pays. L'AI Act (2024), première loi mondiale sur l'IA par niveau de risque, s'impose comme standard international. Bruxelles exporte ses normes juridiques au monde entier — phénomène dit 'effet Bruxelles'.",
  },
  {
    name: "Luxembourg",
    lat: 49.6117,
    lon: 6.1319,
    title: "Schrems II — la fin du Privacy Shield transatlantique",
    insight:
      "La CJUE (siège à Luxembourg) invalide en 2020 le Privacy Shield (arrêt Schrems II), interdisant le transfert de données personnelles européennes vers les États-Unis sans garanties suffisantes. Arrêt qui remodèle les contrats numériques transatlantiques de milliers d'entreprises mondiales.",
  },
  {
    name: "Londres",
    lat: 51.5074,
    lon: -0.1278,
    title: "Hub mondial de la LegalTech & RegTech",
    insight:
      "Londres est le berceau de Luminance et de dizaines d'outils d'IA pour l'analyse de contrats et la due diligence. La FCA y invente en 2015 le concept de sandbox réglementaire FinTech, copié dans 50+ pays. Le Global RegTech Summit y réunit l'écosystème mondial de la conformité chaque année.",
  },
  {
    name: "Dublin",
    lat: 53.3498,
    lon: -6.2603,
    title: "Amende Meta 1,2 Md€ — record mondial RGPD",
    insight:
      "La DPC irlandaise inflige à Meta en 2023 l'amende RGPD la plus élevée de l'histoire : 1,2 Md€ pour transfert illégal de données vers les États-Unis. Dublin, siège européen de tous les GAFAM, est devenu le terrain de la plus grande bataille mondiale sur les transferts internationaux de données.",
  },
  {
    name: "Berlin",
    lat: 52.52,
    lon: 13.405,
    title: "Hub européen du Web3 & des DAO",
    insight:
      "Berlin est le centre européen des développeurs Ethereum et Web3. La ville est au cœur des débats juridiques sur les DAO (Organisations Autonomes Décentralisées) : peuvent-elles avoir une personnalité juridique ? Signer des contrats ? Être poursuivies en justice ? Questions sans réponse légale définitive.",
  },
  {
    name: "Stockholm",
    lat: 59.3293,
    lon: 18.0686,
    title: "E-krona — repenser le concept légal de monnaie",
    insight:
      "La Suède est la société la plus proche de l'économie sans espèces au monde. Stockholm teste l'e-krona, monnaie numérique de banque centrale (CBDC), obligeant les juristes du monde entier à redéfinir le concept légal de monnaie fiduciaire et le rôle des banques centrales à l'ère numérique.",
  },
  {
    name: "Tallinn",
    lat: 59.437,
    lon: 24.7536,
    title: "Première cyberattaque d'État & naissance de l'e-résidence",
    insight:
      "Après les premières cyberattaques étatiques de l'histoire (Russie, 2007), l'Estonie construit l'État numérique le plus avancé au monde : identité numérique pour 99% des services publics, registre d'État en blockchain, concept révolutionnaire d'ambassade de données à l'étranger. Modèle mondial.",
  },
  {
    name: "Moscou",
    lat: 55.7558,
    lon: 37.6173,
    title: "Data localization — souveraineté numérique autoritaire",
    insight:
      "La Russie impose depuis 2014 (loi Yarovaya) l'hébergement obligatoire des données personnelles de ses citoyens sur des serveurs russes. LinkedIn est bloqué en 2016 pour non-conformité. Modèle de souveraineté numérique fermée suivi par la Chine, l'Iran et discuté dans d'autres pays émergents.",
  },
  {
    name: "Barcelone",
    lat: 41.3851,
    lon: 2.1734,
    title: "Mobile World Congress — vitrine mondiale de la connectivité",
    insight:
      "Le MWC réunit chaque année à Barcelone 100 000 professionnels autour des futures infrastructures télécoms. C'est là que se négocient les standards 5G/6G, que se débattent les enjeux juridiques de la cybersécurité mobile et que s'annoncent les prochaines révolutions de connectivité mondiale.",
  },
  {
    name: "Tel Aviv",
    lat: 32.0853,
    lon: 34.7818,
    title: "Affaire Pegasus — droit face à la surveillance de masse",
    insight:
      "Tel Aviv est la capitale mondiale de la cybersécurité offensive. L'affaire NSO Group / Pegasus (2021) révèle que le logiciel espion israélien surveille journalistes, avocats et chefs d'État dans 45 pays. Déclenche un débat juridique mondial sur l'exportation de technologies de surveillance d'État.",
  },
  {
    name: "Dubaï",
    lat: 25.2048,
    lon: 55.2708,
    title: "VARA & stratégie blockchain gouvernementale pionnière",
    insight:
      "Dubaï est la première ville au monde à annoncer une stratégie 100% blockchain pour son gouvernement (2016). En 2022, création de la VARA, premier régulateur mondial dédié aux actifs virtuels. Attire Binance et 500+ entreprises crypto grâce à un cadre légal clair, complet et attractif.",
  },
  {
    name: "Singapour",
    lat: 1.3521,
    lon: 103.8198,
    title: "Sandbox réglementaire & tribunal numérique pionnier",
    insight:
      "La MAS crée en 2016 le premier sandbox réglementaire FinTech au monde, copié dans 50+ pays. En 2023, Singapour lance des initiatives pour résoudre les petits litiges via des interfaces judiciaires entièrement automatisées. 3e hub mondial de la FinTech derrière Londres et New York.",
  },
  {
    name: "Pékin",
    lat: 39.9042,
    lon: 116.4074,
    title: "Démantèlement d'Alibaba & régulation des algorithmes",
    insight:
      "En 2021, amende record de 18 Md€ contre Alibaba pour abus de position dominante, et annulation de l'IPO d'Ant Group (37 Md$, plus grande introduction en bourse jamais annulée). En 2022, la Chine légifère sur les algorithmes de recommandation, imposant la transparence de leur logique interne.",
  },
  {
    name: "Hangzhou",
    lat: 30.2741,
    lon: 120.1551,
    title: "Premier tribunal Internet au monde",
    insight:
      "Siège d'Alibaba, Hangzhou inaugure en 2017 le premier tribunal de l'Internet au monde : litiges e-commerce traités entièrement en ligne, de la plainte au jugement rendu par juge virtuel. Modèle étendu à Pékin et Guangzhou dès 2018, traitant plus de 2 millions de dossiers par an.",
  },
  {
    name: "Shenzhen",
    lat: 22.5431,
    lon: 114.0579,
    title: "La ville sans cash — WeChat Pay & Alipay",
    insight:
      "Shenzhen est l'épicentre du paiement mobile par QR code qui a quasiment éliminé le cash dans les commerces. Avec 1,5 milliard d'utilisateurs combinés d'Alipay et WeChat Pay, la Chine détient 54% du marché mondial des paiements mobiles, forçant une refonte complète du droit des paiements.",
  },
  {
    name: "Hong Kong",
    lat: 22.3193,
    lon: 114.1694,
    title: "Licences VASP & premiers ETF Bitcoin spot d'Asie",
    insight:
      "En 2023, Hong Kong lance son cadre VASP obligatoire et émet les premières licences crypto d'Asie, se repositionnant face à Singapour. En avril 2024, approuve les premiers ETF Bitcoin spot d'Asie. Montre comment une place financière majeure peut réintégrer la crypto après l'avoir totalement gelée.",
  },
  {
    name: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
    title: "Mt. Gox — première catastrophe juridique du secteur crypto",
    insight:
      "L'effondrement de Mt. Gox (2014) à Tokyo — 850 000 BTC perdus — déclenche la première crise juridique mondiale du secteur crypto. Le Japon réagit en devenant le premier pays à légiférer sur les exchanges (Payment Services Act, 2017), modèle de régulation suivi par toute l'Asie.",
  },
  {
    name: "Séoul",
    lat: 37.5665,
    lon: 126.978,
    title: "Loi anti-monopole App Store & Metaverse Seoul",
    insight:
      "En 2021, la Corée du Sud adopte la première loi au monde obligeant Apple et Google à ouvrir leurs App Stores aux systèmes de paiement tiers, inspirant directement le Digital Markets Act européen. En 2022, Séoul devient la première métropole à offrir des services publics dans le métaverse.",
  },
  {
    name: "Bangalore",
    lat: 12.9716,
    lon: 77.5946,
    title: "Aadhaar — 1,4 milliard d'identités biométriques",
    insight:
      "Bangalore porte le projet Aadhaar, le plus grand système d'identification biométrique au monde : 1,4 milliard de personnes enrôlées. La Cour suprême indienne tranche en 2018 sur sa constitutionnalité, posant les bases du droit à l'identité numérique et du rapport entre biométrie et libertés fondamentales.",
  },
];

export const GLOBE_CONNECTION_PAIRS: [number, number][] = [
  [0, 1],
  [0, 3],
  [2, 4],
  [2, 16],
  [3, 8],
  [5, 20],
  [6, 7],
  [6, 11],
  [9, 14],
  [10, 11],
  [12, 7],
  [13, 15],
  [17, 18],
  [14, 9],
  [1, 8],
  [21, 9],
  [22, 10],
  [23, 14],
  [24, 15],
  [25, 17],
  [26, 21],
  [27, 22],
];
