/**
 * Source unique des six questions fréquentes — page « Crypto-actifs, blockchain
 * et Web3 » (maquette v6). Texte repris à l'identique.
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
      "Non, pas à lui seul. Depuis le 1",
      { sup: "er" },
      " juillet 2026, les services sur crypto-actifs relevant du règlement MiCA supposent une autorisation PSCA, un passeport obtenu dans un autre État membre ou, pour certaines entités financières, le régime de notification prévu par le règlement.",
    ],
  },
  {
    q: "Quelle différence entre PSAN et PSCA ?",
    a: [
      "Le PSAN relevait d'un régime français d'enregistrement ou d'agrément auprès de l'AMF. Le PSCA est le statut créé par le règlement MiCA : il repose sur une autorisation, ouvre un passeport européen et comporte des exigences de gouvernance, de fonds propres, de conservation et de traitement des réclamations.",
    ],
  },
  {
    q: "Un smart contract remplace-t-il un contrat juridique ?",
    a: [
      "Non. Le code peut automatiser l'exécution de certaines obligations, mais l'interprétation, la suspension, la résiliation, la responsabilité et la loi applicable restent régies par la documentation contractuelle et par le droit.",
    ],
  },
  {
    q: "Peut-on agir contre une plateforme qui bloque des crypto-actifs ?",
    a: [
      "Oui, selon le motif du blocage, les conditions générales et les obligations de vigilance invoquées. L'action commence en général par une demande documentée ; un référé peut être envisagé si l'urgence le justifie. L'issue dépend des faits et n'est jamais garantie.",
    ],
  },
  {
    q: "Le cabinet peut-il récupérer des cryptomonnaies volées ?",
    a: [
      "Aucune récupération ne peut être promise. Une action suppose d'identifier un interlocuteur atteignable, le plus souvent un intermédiaire régulé par lequel les fonds ont transité. En cas de faux conseiller ou de faux investissement, consultez la page ",
      { link: "Escroquerie et fraude bancaire", href: "/nos-domaines/escroquerie-fraude-bancaire" },
      ".",
    ],
  },
  {
    q: "L'achat d'un NFT transfère-t-il les droits d'auteur ?",
    a: [
      "Non, pas à lui seul. La propriété du jeton est distincte des droits d'auteur sur l'œuvre, dont la cession suppose un écrit précisant les droits cédés, leur étendue et leur durée.",
    ],
  },
];

/** Texte plat d'une réponse (pour le JSON-LD FAQPage). */
export function faqAnswerText(a: Seg[]): string {
  return a.map((s) => (typeof s === "string" ? s : "sup" in s ? s.sup : s.link)).join("");
}
