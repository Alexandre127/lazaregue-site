/**
 * Éléments de réassurance de la page contact.
 *
 * RÈGLE : tout chiffre publié ici doit être vérifiable. Pour un avocat, une
 * mention chiffrée inexacte engage à la fois la déontologie (RIN art. 10 —
 * la publicité doit être sincère) et le droit de la consommation
 * (art. L121-2 C. conso, pratique commerciale trompeuse).
 */

export type Chiffre = { valeur: string; legende: string };

/**
 * Chiffres affichés — chacun adossé à un fait vérifiable.
 *
 * La note et le nombre d'avis Google ont été retirés : plus aucune mention
 * d'avis ni de note Google sur le site.
 */
export const CHIFFRES: Chiffre[] = [
  { valeur: "2016", legende: "Année de création" },
  { valeur: "24 h", legende: "Délai de réponse ouvré" },
  { valeur: "100 %", legende: "Droit du numérique" },
];

/** Engagements — chacun correspond à une pratique effective du cabinet. */
export const GARANTIES = [
  "Première prise de contact sans engagement",
  "Réponse personnelle d'un avocat sous 24 h ouvrées",
  "Échanges couverts par le secret professionnel",
  "Votre message part de votre messagerie : ce site n'en conserve aucune copie",
];

export type Question = { q: string; a: string };

export const FAQ: Question[] = [
  {
    q: "Combien coûte une première consultation ?",
    a: "La première prise de contact permet de qualifier votre situation et de vérifier si le cabinet peut intervenir : elle est sans engagement et ne constitue pas une consultation juridique. Si une mission est nécessaire, une convention d'honoraires vous est remise avant toute intervention ; elle précise la mission, le mode de calcul et les frais prévisibles.",
  },
  {
    q: "Mes échanges sont-ils vraiment confidentiels ?",
    a: "Oui, dès le premier contact. Le secret professionnel de l'avocat s'applique à toutes nos communications, même avant la signature d'un contrat de mission (art. 66-5 de la loi du 31 décembre 1971). Précision technique : le formulaire de cette page ouvre votre propre messagerie — votre message ne transite pas par ce site, qui n'en conserve aucune copie.",
  },
  {
    q: "Quel délai pour obtenir une réponse ?",
    a: "Nous répondons sous 24 heures ouvrées. En cas d'urgence, appelez directement le 01 81 70 62 00, du lundi au vendredi de 9 h à 19 h.",
  },
  {
    q: "Intervenez-vous en dehors de Paris ?",
    a: "Oui, nous accompagnons des entreprises sur toute la France, principalement par visioconférence. Nos bureaux sont situés à Paris 17ᵉ, à deux pas de la place Charles-de-Gaulle — Étoile.",
  },
];
