/**
 * Source unique des six questions fréquentes — page « Crypto-actifs, blockchain
 * et Web3 ». Version « langage clair » (réécriture des réponses).
 *
 * Chaque réponse est une suite de segments : texte, exposant (`sup`) ou lien
 * (`link`). Le composant FAQ les rend (avec `<sup>` / `<a>`), et le JSON-LD
 * FAQPage concatène le MÊME texte (segments mis bout à bout) — le texte affiché
 * et le texte structuré sont donc strictement identiques.
 */
export type Seg = string | { sup: string } | { link: string; href: string };

export const FAQ_ITEMS: { q: string; a: Seg[] }[] = [
  {
    q: "L'enregistrement PSAN permet-il encore d'exercer en France ?",
    a: [
      "Non. Depuis le 1",
      { sup: "er" },
      " juillet 2026, proposer des services crypto en France suppose une autorisation PSCA de l'AMF, un agrément obtenu dans un autre pays de l'Union ou, pour certaines banques et entreprises financières, une simple notification.",
    ],
  },
  {
    q: "Quelle différence entre PSAN et PSCA ?",
    a: [
      "Le PSAN était le statut français, délivré par l'AMF. Le PSCA est le statut européen créé par le règlement MiCA : il permet d'exercer dans toute l'Union, mais impose davantage d'exigences : gouvernance, fonds propres, garde des actifs, traitement des réclamations.",
    ],
  },
  {
    q: "Un smart contract remplace-t-il un contrat juridique ?",
    a: [
      "Non. Le code exécute automatiquement certaines actions, mais c'est le contrat, et la loi, qui disent comment l'interpréter, quand le suspendre ou le résilier, et qui est responsable.",
    ],
  },
  {
    q: "Peut-on agir contre une plateforme qui bloque des crypto-actifs ?",
    a: [
      "Oui, selon la raison du blocage et ce que prévoient ses conditions générales. On commence en général par une demande écrite argumentée ; en cas d'urgence, une procédure rapide (référé) peut être engagée. Le résultat dépend des faits et ne peut jamais être garanti.",
    ],
  },
  {
    q: "Le cabinet peut-il récupérer des cryptomonnaies volées ?",
    a: [
      "Aucune récupération ne peut être promise. Pour agir, il faut un responsable qu'on peut poursuivre, le plus souvent une plateforme régulée par laquelle les fonds sont passés. Faux conseiller ou faux placement ? Consultez la page ",
      { link: "Escroquerie et fraude bancaire", href: "/nos-domaines/escroquerie-fraude-bancaire" },
      ".",
    ],
  },
  {
    q: "L'achat d'un NFT transfère-t-il les droits d'auteur ?",
    a: [
      "Non. Posséder le jeton ne donne pas les droits d'auteur sur l'œuvre : leur cession suppose un écrit qui précise les droits cédés, leur étendue et leur durée.",
    ],
  },
];

/** Texte plat d'une réponse (pour le JSON-LD FAQPage). */
export function faqAnswerText(a: Seg[]): string {
  return a.map((s) => (typeof s === "string" ? s : "sup" in s ? s.sup : s.link)).join("");
}
