/**
 * Questions fréquentes de la page pilier « Avocat en cybersécurité ».
 *
 * Source unique : le même tableau alimente l'accordéon visible (rendu une seule
 * fois dans le flux) et le balisage FAQPage de `page.tsx`. Aucun texte n'est
 * ainsi recopié entre le HTML servi et les données structurées.
 */

export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Faut-il déposer plainte après une cyberattaque ?",
    a: "Le dépôt de plainte n'est pas une obligation générale, mais il conditionne fréquemment l'indemnisation par l'assureur cyber, et il fixe une date certaine dans la chronologie de l'incident. La question se pose donc dans les premières vingt-quatre heures, pas après.",
  },
  {
    q: "Faut-il notifier la CNIL et l'ANSSI pour le même incident ?",
    a: "Ce sont deux régimes distincts, avec des critères de déclenchement et des délais propres. Un même incident peut relever des deux, d'un seul, ou d'aucun. La qualification précède la notification.",
  },
  {
    q: "Notre prestataire informatique est-il responsable ?",
    a: "Cela dépend du contrat, de ce qu'il prévoit en matière de sécurité, de sauvegarde et de notification, et de ce qui peut être établi techniquement. La réponse se construit à partir des pièces, pas du ressenti.",
  },
  {
    // TODO (cabinet) : la subordination de l'indemnisation d'une rançon au dépôt
    // d'une plainte dans un délai bref doit être vérifiée dans le code des
    // assurances avant mise en ligne (art. L. 12-10-1 C. assur.). Texte laissé
    // tel quel en attendant validation.
    q: "Peut-on payer une rançon ?",
    a: "Le versement n'est pas en soi pénalement réprimé, mais il engage plusieurs terrains à la fois : conformité aux régimes de sanctions internationales, couverture par l'assurance cyber — l'indemnisation d'un tel versement étant subordonnée au dépôt d'une plainte dans un délai bref —, et cohérence avec ce qui a été déclaré aux autorités. Cette décision ne se prend pas dans l'urgence sans analyse.",
  },
  {
    q: "Le dirigeant est-il personnellement exposé ?",
    a: "NIS 2 placera la supervision du risque au niveau de l'organe de direction, une fois la transposition française achevée. Indépendamment de ce texte, l'exposition du dirigeant se joue déjà sur le terrain de la faute de gestion et des engagements pris envers les clients. Elle se documente et se limite ; elle ne s'ignore pas.",
  },
];
