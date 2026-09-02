/**
 * Éléments de réassurance de la page contact.
 *
 * RÈGLE : tout chiffre publié ici doit être vérifiable. Pour un avocat, une
 * mention chiffrée inexacte engage à la fois la déontologie (RIN art. 10 —
 * la publicité doit être sincère) et le droit de la consommation
 * (art. L121-2 C. conso, pratique commerciale trompeuse).
 */

export type Chiffre = { valeur: string; legende: string };

/** Chiffres affichés — chacun adossé à un fait vérifiable. */
export const CHIFFRES: Chiffre[] = [
  { valeur: "2016", legende: "Année de création" },
  { valeur: "5,0 / 5", legende: "Note Google · 17 avis" },
  { valeur: "24 h", legende: "Délai de réponse ouvré" },
  { valeur: "100 %", legende: "Droit du numérique" },
];

export { AVIS } from "@/lib/avis";

export type Temoignage = {
  texte: string;
  auteur: string;
  /** Vrai si la citation est tronquée, comme affichée par Google */
  tronque?: boolean;
};

/**
 * Témoignages repris des avis Google publics, cités fidèlement et attribués
 * au nom d'affichage de leur auteur. Aucune fonction ni taille d'entreprise
 * n'est ajoutée : Google n'en publie pas, et les inventer fausserait l'avis.
 *
 * Les textes complets sont tronqués par Google (« … Plus ») ; la troncature
 * est signalée par des points de suspension.
 */
export const TEMOIGNAGES: Temoignage[] = [
  {
    texte:
      "Nous avons fait appel au cabinet Lazarègue Avocats dans le cadre d'une restructuration juridique impliquant à la fois des enjeux capitalistiques…",
    auteur: "Carole Duval",
    tronque: true,
  },
  {
    texte:
      "J'ai eu la chance d'être accompagné par Me Lazarègue dans une affaire délicate, et je tiens à souligner son professionnalisme et sa réactivité.",
    auteur: "Rayan Kibz",
  },
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
