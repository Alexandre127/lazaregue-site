/**
 * Source UNIQUE des questions fréquentes de la page IA & AI Act.
 *
 * Ce fichier alimente à la fois l'accordéon visible (IaActClient) et le
 * balisage FAQPage (page.tsx). Les réponses sont donc de simples chaînes,
 * sérialisables : accordéon et FAQPage lisent exactement le même texte, ce
 * qui évite toute divergence entre le contenu affiché et le balisage — une
 * FAQ balisée non conforme au visible est un motif de sanction manuelle
 * chez Google.
 *
 * TODO (cabinet) : les décisions de justice citées dans la page (jurisprudence)
 * restent à vérifier une par une sur Doctrine avant publication.
 */
export const FAQ_TEXTE: { q: string; a: string }[] = [
  {
    q: "Le report de 2026 me dispense-t-il d'agir ?",
    a: "Non. Le report ne touche que les systèmes à haut risque — annexe III au 2 décembre 2027, annexe I au 2 août 2028. Les pratiques interdites s'appliquent depuis le 2 février 2025, mais les amendes ne sont exigibles que depuis le 2 août 2025, avec la désignation des autorités de surveillance. Les obligations de transparence et de gouvernance s'appliquent depuis le 2 août 2026. Le report est surtout le temps de faire l'inventaire et la qualification des systèmes — un travail que très peu d'entreprises ont engagé.",
  },
  {
    q: "Comment qualifier un système d'IA ?",
    a: "La qualification établit trois choses : le rôle tenu par votre entreprise — fournisseur ou déployeur —, la nature réelle du système au regard du règlement (interdit, haut risque, transparence) et la date de mise sur le marché, qui commande le régime applicable. Elle suppose une analyse juridique et un examen technique du système. C'est de cette qualification que découle la documentation à construire, celle sur laquelle repose la défense le jour d'un contrôle.",
  },
  {
    q: "Comment construire un registre des systèmes d'IA ?",
    a: "En recensant les systèmes officiels et les usages informels, puis, pour chacun : la qualification (interdit, haut risque, transparence), le rôle tenu (fournisseur ou déployeur), la date de mise en service et le régime qui en découle, les données traitées et les mécanismes de supervision humaine. La date de mise en service compte autant que la qualification : elle détermine si le régime transitoire s'applique.",
  },
  {
    q: "Une charte IA est-elle obligatoire en entreprise ?",
    a: "Le règlement n'impose pas de charte en tant que telle, mais c'est l'outil qui rend l'usage de l'IA gouvernable : outils autorisés, données interdites d'injection, validation humaine, gestion des incidents, formation. Elle s'articule avec le droit du travail — une charte qui encadre les outils des salariés relève de l'information, voire de la consultation, du CSE.",
  },
  {
    q: "Quelle différence entre fournisseur et déployeur ?",
    a: "Le fournisseur développe le système ou le met sur le marché ; le déployeur l'utilise sous sa propre autorité. Les obligations diffèrent selon le rôle. Utiliser une API ou un SaaS tiers fait de vous un déployeur — cela ne vous exonère pas : vous restez responsable du déploiement, et l'encadrement contractuel du fournisseur détermine la répartition du risque.",
  },
  {
    q: "Comment articuler AI Act, RGPD et droit du travail ?",
    a: "Les trois régimes se cumulent. Dès qu'un système traite des données personnelles, le RGPD s'applique pleinement (licéité, information, droits des personnes). S'il concerne des salariés, le droit du travail ajoute ses exigences — information et consultation du CSE, loyauté des évaluations, article L.1222-4 du code du travail. L'AI Act se superpose à ces deux corps de règles ; il ne les remplace pas.",
  },
  {
    q: "Combien coûte un diagnostic AI Act ?",
    a: "Le coût dépend de plusieurs variables : le nombre de systèmes officiels et d'usages informels, leur qualification, le rôle tenu par l'entreprise, l'état de la documentation existante et le volume à créer ou à reprendre. Un diagnostic commence par l'inventaire et la qualification — c'est de là que découlent le périmètre et la charge de la mise en conformité.",
  },
  {
    q: "Sommes-nous fournisseur ou déployeur si nous avons configuré l'outil nous-mêmes ?",
    a: "Cela dépend de ce que « configurer » recouvre. Régler les paramètres prévus par la notice vous laisse déployeur. En revanche, assigner au système une destination qu'il n'avait pas — en particulier un usage relevant de l'annexe III — ou le modifier substantiellement peut faire de vous le fournisseur, avec le régime le plus lourd (art. 25). La qualification se fait système par système, sur l'usage réel.",
  },
  {
    q: "Qui répond si nous utilisons un modèle du marché ?",
    a: "Les obligations relatives aux modèles d'IA à usage général — documentation du modèle, politique de droit d'auteur, résumé des contenus d'entraînement — pèsent sur l'éditeur du modèle. Vous n'y avez pas droit de plein droit : la documentation destinée aux intégrateurs vise ceux qui construisent un système à partir du modèle, et ce que vous obtiendrez dépend de votre contrat. C'est donc un point de négociation, à traiter avant la signature. (art. 53 et 55)",
  },
  {
    q: "Combien risque une PME ?",
    a: "Les plafonds sont de 35 M€ ou 7 % du chiffre d'affaires mondial pour les pratiques interdites, 15 M€ ou 3 % pour les manquements des fournisseurs et des déployeurs, 7,5 M€ ou 1 % pour les informations inexactes fournies aux autorités. Pour les PME, jeunes pousses comprises, la règle s'inverse : c'est le montant le plus faible qui plafonne l'amende, jamais le plus élevé (art. 99 § 6).",
  },
];
