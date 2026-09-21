/**
 * Cinq questions fréquentes — source UNIQUE de l'accordéon FAQ et du balisage
 * FAQPage (page.tsx). Les deux doivent être identiques mot pour mot (SEO §6) :
 * ne pas dupliquer ce contenu ailleurs. Textes arbitrés (maquette v3).
 */
export type FaqItem = { id: string; q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    q: "Une PME de moins de 250 salariés doit-elle tenir un registre ?",
    a: "L’exemption prévue pour certaines structures de moins de 250 salariés est limitée. Elle ne s’applique notamment pas lorsque les traitements ne sont pas occasionnels, présentent un risque pour les personnes ou portent sur certaines catégories de données. Les traitements réguliers liés aux salariés, aux clients ou aux prospects rendent donc généralement cette exemption inapplicable.",
  },
  {
    id: "faq-2",
    q: "Quelle différence entre un avocat RGPD et un consultant ?",
    a: "Les deux peuvent contribuer à une démarche de conformité. L’avocat ajoute à l’accompagnement opérationnel le secret professionnel attaché à sa mission, l’analyse du risque juridique, la négociation contractuelle et la défense de l’entreprise en cas de contrôle ou de contentieux. Le choix dépend du périmètre de la mission et du niveau de risque.",
  },
  {
    id: "faq-3",
    q: "Combien de temps dure un audit ou une mise en conformité ?",
    a: "La durée dépend du nombre de traitements, du nombre de prestataires et de la documentation déjà existante. Elle est arrêtée avec vous lors du cadrage, puis rythmée par le plan d’action : les écarts les plus exposés sont traités en premier, sans attendre l’achèvement de l’ensemble.",
  },
  {
    id: "faq-4",
    q: "Quand faut-il notifier une violation à la CNIL ?",
    a: "Une notification est requise lorsque la violation est susceptible d’engendrer un risque pour les droits et libertés des personnes. Elle doit, lorsque cela est possible, être adressée à la CNIL dans les 72 heures suivant le moment où le responsable de traitement en a pris connaissance. Lorsque le risque est élevé, les personnes concernées doivent également être informées. Toute décision de notifier ou de ne pas notifier doit être motivée et documentée.",
  },
  {
    id: "faq-5",
    q: "Le cabinet peut-il intervenir comme DPO externalisé ?",
    a: "Une mission de DPO externalisé peut être envisagée après vérification du périmètre, des moyens nécessaires, de l’indépendance de la fonction et de l’absence de conflit d’intérêts. Lorsqu’elle est possible, elle fait l’objet d’une offre et d’une lettre de mission distinctes.",
  },
];
