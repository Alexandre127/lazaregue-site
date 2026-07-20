/**
 * Les 8 engagements de la charte client.
 * Textes validés — ne pas réécrire sans validation.
 */

export type Engagement = {
  n: string;
  titre: string;
  texte: string;
};

export const ENGAGEMENTS: Engagement[] = [
  {
    n: "01",
    titre: "Nous vous répondons sous un jour ouvré",
    texte:
      "Toute demande reçoit un accusé de réception. Vous n'attendez pas sans savoir si votre message est arrivé.",
  },
  {
    n: "02",
    titre: "Nous vous disons franchement si nous ne sommes pas le bon cabinet",
    texte:
      "Si votre dossier sort de nos domaines, nous vous le disons vite et vous orientons plutôt que de vous faire perdre du temps.",
  },
  {
    n: "03",
    titre: "Nous expliquons avant d'agir",
    texte:
      "Votre situation, les options possibles et leurs conséquences pratiques, en langage clair. Nous donnons des jalons réalistes — pas des promesses que la procédure ne permet pas de tenir.",
  },
  {
    n: "04",
    titre: "Vous connaissez le budget avant que nous commencions",
    texte:
      "Une convention d'honoraires précise la mission, le mode de calcul et les frais prévisibles. Rien ne démarre avant.",
  },
  {
    n: "05",
    titre: "Aucune dépense n'est engagée sans votre accord",
    texte:
      "Si le dossier évolue et que le budget doit bouger, nous vous le disons avant — jamais sur la facture.",
  },
  {
    n: "06",
    titre: "Vous n'avez pas à relancer",
    texte:
      "C'est à nous d'aller vers vous. L'avancement est consultable à tout moment et nous vous informons sans attendre votre appel.",
  },
  {
    n: "07",
    titre: "Vous savez qui traite votre dossier",
    texte:
      "Un avocat responsable est identifié. Nous ne changeons pas d'interlocuteur sans vous en informer.",
  },
  {
    n: "08",
    titre: "Votre dossier vous appartient",
    texte:
      "Vous pouvez en obtenir la restitution à tout moment, dans les conditions prévues par les règles de la profession.",
  },
];
