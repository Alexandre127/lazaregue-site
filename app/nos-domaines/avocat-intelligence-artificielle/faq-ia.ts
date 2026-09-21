/**
 * Quatre questions (maquette v4, section FAQ) — source UNIQUE de l'accordéon FAQ
 * et du balisage FAQPage (page.tsx). Textes mot pour mot. Réponses en paragraphes.
 * EMO-014 : « Aucune intervention ne garantit une conformité absolue » conservé (Q2).
 */
export type FaqItem = { id: string; q: string; a: string[] };

export const FAQ_IA: FaqItem[] = [
  {
    id: "a1",
    q: "Notre entreprise utilise seulement ChatGPT. Sommes-nous vraiment concernés ?",
    a: [
      "Les obligations les plus lourdes ne s’appliquent pas à cet usage. Mais l’utilisation d’un assistant générique soulève d’autres questions : confidentialité des informations saisies, protection des secrets d’affaires, propriété des contenus produits, information des salariés. Ces sujets relèvent du RGPD, du droit du travail et du droit des contrats, et sont exigibles aujourd’hui.",
    ],
  },
  {
    id: "a2",
    q: "Quelle différence entre un audit et une mise en conformité ?",
    a: [
      "L’audit établit ce que l’entreprise utilise, à quel titre et quelles obligations en découlent. La mise en conformité consiste ensuite à identifier les obligations applicables, mettre en place les mesures nécessaires, produire la documentation, traiter les risques résiduels et préparer un éventuel contrôle. Aucune intervention ne garantit une conformité absolue : elle organise la capacité de l’entreprise à en rendre compte.",
    ],
  },
  {
    id: "a3",
    q: "Combien de temps dure une intervention ?",
    a: [
      "La durée dépend du nombre de systèmes et du rôle tenu. Un inventaire et une qualification sur un périmètre restreint se traitent en quelques semaines. La constitution d’un dossier de conformité pour un système à haut risque commercialisé s’inscrit sur plusieurs mois. Le périmètre et le calendrier sont fixés dans la convention d’honoraires, avant toute analyse.",
    ],
  },
  {
    id: "a4",
    q: "L’experte technique intervient-elle systématiquement ?",
    a: [
      "Non. L’examen technique est mobilisé lorsque la qualification en dépend : système développé ou adapté en interne, décision individuelle contestée, incident à reconstituer. Pour un encadrement d’usages d’outils achetés sur étagère, l’intervention juridique suffit le plus souvent. Ce point est tranché lors de la définition du périmètre.",
    ],
  },
];
