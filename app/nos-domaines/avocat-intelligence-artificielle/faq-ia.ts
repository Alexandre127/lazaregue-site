/**
 * Quatre questions (maquette V9, section 14) — source UNIQUE de l'accordéon FAQ
 * et du balisage FAQPage (page.tsx). Textes identiques mot pour mot. Réponses
 * en paragraphes.
 */
export type FaqItem = { id: string; q: string; a: string[] };

export const FAQ_IA: FaqItem[] = [
  {
    id: "a1",
    q: "Notre entreprise utilise seulement ChatGPT : sommes-nous vraiment concernés ?",
    a: [
      "Les obligations les plus lourdes ne s’appliquent pas à cet usage. Mais l’utilisation d’un assistant générique soulève d’autres questions : confidentialité des informations saisies, protection des secrets d’affaires, propriété des contenus produits, information des salariés. Ces sujets relèvent du RGPD, du droit du travail et du droit des contrats, et sont exigibles aujourd’hui.",
      "L’entreprise doit également veiller à ce que les personnes qui utilisent l’outil disposent d’une maîtrise suffisante de l’IA au regard de leurs fonctions.",
    ],
  },
  {
    id: "a2",
    q: "Quelle différence entre un audit et une mise en conformité ?",
    a: [
      "L’audit recense les systèmes, qualifie le rôle de l’entreprise et détermine les obligations applicables. La mise en conformité met ensuite en œuvre les mesures nécessaires, produit les documents attendus, traite les écarts et organise les preuves pouvant être présentées à un client, une autorité ou un juge.",
    ],
  },
  {
    id: "a3",
    q: "Pouvons-nous devenir fournisseur alors que nous avons acheté le système ?",
    a: [
      "Oui, dans certaines situations. Une entreprise peut notamment être requalifiée lorsqu’elle commercialise le système sous son nom ou sa marque, lui apporte une modification substantielle ou modifie sa destination de manière à le faire entrer dans le régime des systèmes à haut risque.",
      "Cette qualification doit être examinée à partir de l’usage réel, des contrats et des modifications apportées.",
    ],
  },
  {
    id: "a4",
    q: "Combien de temps dure une intervention ?",
    a: [
      "La durée dépend du nombre de systèmes et du rôle tenu. Un inventaire et une qualification sur un périmètre restreint se traitent en quelques semaines. La constitution d’un dossier de conformité pour un système à haut risque commercialisé s’inscrit sur plusieurs mois. Le périmètre et le calendrier sont fixés dans la proposition, avant toute analyse.",
    ],
  },
];
