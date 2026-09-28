/**
 * Questions fréquentes de la page contact.
 * Maquette mobile 28/09/2026 : deux questions.
 */

export type Question = { q: string; a: string };

export const FAQ: Question[] = [
  {
    q: "Combien coûte un premier échange ?",
    a: "Le premier contact permet de qualifier votre situation et de vérifier que le cabinet peut intervenir : il est sans engagement et ne constitue pas une consultation juridique. Si une mission est nécessaire, une convention d'honoraires est remise avant toute intervention ; elle précise la mission, le mode de calcul et les frais prévisibles.",
  },
  {
    q: "Intervenez-vous en dehors de Paris ?",
    a: "Oui. Le cabinet accompagne des entreprises dans toute la France, principalement par visioconférence. Ses bureaux sont à Paris 17ᵉ, à deux pas de la place Charles-de-Gaulle — Étoile.",
  },
];
