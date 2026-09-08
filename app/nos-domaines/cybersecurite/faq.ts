/**
 * Questions fréquentes de la page pilier « Avocat en cybersécurité ».
 *
 * Source unique : le même tableau alimente l'accordéon visible (rendu une seule
 * fois dans le flux) et le balisage FAQPage de `page.tsx`. Le champ `a` (texte
 * seul) sert au JSON-LD ; `lien` n'apparaît qu'à l'affichage, jamais dans les
 * données structurées — aucune duplication.
 *
 * Bloc G de l'amendement : deux questions relevant du pénal ont été RETIRÉES
 * d'ici et sont à reprendre sur /nos-domaines/cybercriminalite :
 *   — « Faut-il déposer plainte après une cyberattaque ? »
 *   — « Peut-on payer une rançon ? » — avec son TODO cabinet : la subordination
 *     de l'indemnisation d'une rançon au dépôt d'une plainte dans un délai bref
 *     reste à vérifier au code des assurances avant mise en ligne.
 */

export type FaqItem = {
  q: string;
  a: string;
  /** Lien affiché à la suite de la réponse. Absent du FAQPage JSON-LD. */
  lien?: { href: string; label: string };
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Quel est le rôle de l'avocat en cas de cyberattaque ?",
    a: "Qualifier l'incident au regard des régimes applicables, arbitrer ce qui doit être notifié et à qui, protéger la position de l'entreprise dans les écrits qui seront relus plus tard, et préserver ce qui pourra être établi ensuite. L'avocat n'intervient pas après la technique : il intervient en même temps.",
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
    q: "Quelles obligations de cybersécurité pèsent sur une PME ?",
    a: "L'obligation de sécurité de l'article 32 du RGPD s'applique sans seuil d'effectif. S'y ajoutent les exigences répercutées par les donneurs d'ordre, contractuellement, et selon le secteur des obligations propres. La taille de l'entreprise ne l'exonère pas ; elle change ce qui est proportionné.",
  },
  {
    q: "Quelle différence entre cybersécurité, NIS 2 et RGPD ?",
    a: "Le RGPD protège les données personnelles et impose une obligation de sécurité assortie d'un régime de notification. NIS 2 vise la résilience des entités critiques et de leur chaîne d'approvisionnement. Un même incident peut relever des deux, avec deux autorités et deux calendriers. La cybersécurité est le terrain où ces régimes se rencontrent.",
  },
  {
    q: "Combien coûte l'intervention d'un avocat en cybersécurité ?",
    a: "Cela dépend de la nature de l'intervention — diagnostic ponctuel, mise en conformité, assistance en cas d'incident, contentieux. Le premier échange est sans engagement et permet d'établir un devis.",
    lien: { href: "/le-cabinet#honoraires", label: "Nos honoraires" },
  },
];
