/**
 * FAQ de la page « Crypto-actifs et blockchain ».
 *
 * Source unique partagée par l'affichage (`<details>`) ET le JSON-LD FAQPage,
 * pour garantir l'identité mot pour mot. Textes repris de la maquette
 * (version affichée, la plus complète).
 */
export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Un ancien enregistrement PSAN permet-il encore d'exercer ?",
    a: "Non. Depuis le 1er juillet 2026, l'enregistrement ou l'agrément national obtenu sous l'ancien régime ne suffit plus, à lui seul, pour fournir en France les services sur crypto-actifs relevant du règlement MiCA. L'opérateur doit disposer d'une autorisation délivrée au titre du règlement, d'un passeport européen obtenu dans un autre État membre, ou, lorsque son statut le permet, du régime de notification prévu à l'article 60 pour certaines entités financières.",
  },
  {
    q: "Cryptomonnaie ou crypto-actif : la distinction a-t-elle une portée juridique ?",
    a: "Oui. « Cryptomonnaie » est un terme d'usage sans définition légale. Le droit européen raisonne sur les crypto-actifs et distingue notamment les jetons se référant à un ou plusieurs actifs, les jetons de monnaie électronique et les autres crypto-actifs, chacun relevant d'obligations différentes. Certains instruments échappent d'ailleurs au règlement MiCA pour relever du droit des instruments financiers. La qualification retenue commande le régime applicable : elle constitue toujours la première étape du travail.",
  },
  {
    q: "Mon projet nécessite-t-il une autorisation ?",
    a: "La réponse dépend de la nature exacte du service fourni et de la question de savoir si l'entreprise détient ou non les actifs et les clés de ses utilisateurs. Un modèle purement logiciel, une interface ou un service d'information ne relèvent pas nécessairement du périmètre régulé. L'analyse doit être conduite sur le fonctionnement réel du dispositif et non sur sa présentation commerciale.",
  },
  {
    q: "Une entreprise déjà agréée doit-elle solliciter une autorisation distincte ?",
    a: "Certains établissements de crédit, entreprises d'investissement et établissements de monnaie électronique peuvent fournir certains services sur crypto-actifs après une simple notification à leur autorité de tutelle, dans les conditions de l'article 60 du règlement. Le périmètre des services ainsi ouverts est limité et doit être vérifié service par service.",
  },
  {
    q: "Un smart contract a-t-il valeur de contrat ?",
    a: "Le code peut matérialiser ou automatiser l'exécution de certaines obligations, mais il ne détermine pas à lui seul l'ensemble de l'accord. L'interprétation, la suspension, la résiliation, la responsabilité et le droit applicable restent régis par la documentation contractuelle et par le droit. C'est la raison pour laquelle tout projet reposant sur des smart contracts doit s'accompagner d'un écrit cohérent avec le fonctionnement du programme.",
  },
  {
    q: "Est-il possible de récupérer des crypto-actifs détournés ?",
    a: "Aucune réponse générale ne peut être donnée. Les perspectives de recouvrement dépendent de l'existence d'un intermédiaire régulé dans la chaîne des flux, de la localisation des actifs et de la solvabilité des intervenants identifiés. Le cabinet procède à cette analyse avant d'engager une procédure et se prononce sur son opportunité.",
  },
  {
    q: "Le cabinet intervient-il en dehors de Paris ?",
    a: "Oui. Le cabinet est établi à Paris et intervient devant les juridictions de l'ensemble du territoire.",
  },
];
