/**
 * Version texte des questions fréquentes de la page IA & AI Act.
 *
 * Elle existe uniquement pour alimenter le balisage FAQPage : les réponses
 * affichées vivent dans le composant client (certaines sont du JSX, donc
 * non sérialisables), et un composant `"use client"` ne peut pas exporter
 * de données vers un composant serveur — Next y substitue une référence.
 *
 * Toute modification d'une réponse à l'écran doit être répercutée ici :
 * une FAQ balisée qui ne correspond pas au contenu visible est un motif
 * de sanction manuelle chez Google.
 */
export const FAQ_TEXTE: { q: string; a: string }[] = [
  {
    q: "Mon entreprise est-elle vraiment concernée ?",
    a: "Oui — dès que vous utilisez un système d'IA dans l'UE, même acheté à un tiers. L'AI Act s'applique aux fournisseurs ET aux déployeurs. Un outil RH de tri de CV, un algorithme de scoring client, un chatbot, une API tierce : vous êtes déployeur au sens du règlement et vous avez des obligations directes.",
  },
  {
    q: "On utilise juste ChatGPT et Copilot — on est vraiment exposé ?",
    a: "Oui. Utiliser un outil IA tiers ne vous exonère pas de vos responsabilités. Le TJ Paris (fév. 2026, n° 25/57412) a jugé que même une expérimentation Copilot 365 limitée à des volontaires sur 4 mois pouvait déclencher des obligations sociales. Sans politique interne, chaque usage engage l'entreprise — sur les données personnelles des salariés, sur la loyauté des décisions automatisées, sur la traçabilité.",
  },
  {
    q: "Quelles sont les obligations concrètes pour un système à haut risque ?",
    a: "Pour tout système IA à haut risque — outil RH de sélection, scoring client, composant dans un dispositif médical — vous devez mettre en place : une gestion continue des risques (art. 9), une gouvernance des données d'entraînement (art. 10), une documentation technique complète (art. 11), une journalisation automatique (art. 12), une supervision humaine effective (art. 14), une évaluation de conformité avant mise sur le marché (art. 43), et un enregistrement dans la base européenne (art. 49). Conservation obligatoire : 10 ans (art. 18).",
  },
  {
    q: "L'IA engage-t-elle aussi le droit du travail ?",
    a: "Oui — et c'est souvent la surprise. Le TJ Nanterre (29 jan. 2026, n° 25/02856) a suspendu le déploiement de logiciels IA RH faute de consultation du CSEC au préalable. La Cour de cassation (21 mai 2025, 22-19.925) impose une double conformité pour tout système IA traitant des données de salariés : RGPD ET droit du travail cumulativement. Aucune information personnelle ne peut être collectée sans que le salarié en ait été préalablement informé (art. L.1222-4 C. trav.).",
  },
  {
    q: "Nos fournisseurs IA sont responsables — pas nous ?",
    a: "Non. Utiliser une API tierce ou un SaaS IA sans encadrement contractuel ne vous exonère pas. Vous restez déployeur au sens du règlement et responsable du déploiement. La CA Lyon (13 mai 2025, n° 23/04589) a rappelé que la responsabilité de l'utilisateur final doit être clairement documentée dans les CGV. Sans contrat encadrant votre fournisseur IA, le risque est entièrement porté par vous.",
  },
  {
    q: "Que se passe-t-il en cas de contrôle ?",
    a: "Les autorités nationales peuvent auditer à tout moment. En cas de contrôle, l'entreprise doit pouvoir démontrer comment son système a été conçu, supervisé et documenté. Un manquement à la documentation ou à la supervision humaine devient un indice de défaut — utilisable dans tout contentieux en responsabilité. Les incidents graves doivent être notifiés dans les 72 h (croisement AI Act / RGPD art. 33).",
  },
  {
    q: "À partir de quand mes obligations s'appliquent-elles ?",
    a: "En trois étapes. Février 2025 : les pratiques interdites sont en vigueur (art. 5 RIA). Août 2025 : les obligations de transparence s'appliquent à l'IA générative, aux chatbots et aux deepfakes. Août 2027 : pleine conformité des systèmes à haut risque, pour les fournisseurs comme pour les déployeurs (art. 6).",
  },
];
