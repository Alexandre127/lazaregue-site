/**
 * Source unique des questions directes (FAQ).
 *
 * Module neutre : un composant `"use client"` ne peut pas exporter de données
 * vers un composant serveur. La page en a besoin pour produire le balisage
 * FAQPage, qui doit rester rigoureusement identique au texte affiché.
 *
 * §7 de l'amendement — sept questions. « Notre banque refuse de rembourser le
 * phishing » a été retirée (pôle escroquerie). Les questions 1 (rôle de
 * l'avocat), 2 (dépôt de plainte) et 7 (payer la rançon) viennent du pilier
 * cybersécurité, où elles avaient été supprimées — réponses reprises telles
 * quelles, non réécrites.
 */
export const FAQ_ITEMS: {
  q: string;
  a: string;
  lien?: { href: string; label: string };
}[] = [
  {
    q: "Quel est le rôle de l'avocat dans les premières heures ?",
    a: "Qualifier l'incident au regard des régimes applicables, arbitrer ce qui doit être notifié et à qui, protéger la position de l'entreprise dans les écrits qui seront relus plus tard, et préserver ce qui pourra être établi ensuite. L'avocat n'intervient pas après la technique : il intervient en même temps.",
  },
  {
    q: "Faut-il déposer plainte après une cyberattaque ?",
    a: "Le dépôt de plainte n'est pas une obligation générale, mais il conditionne fréquemment l'indemnisation par l'assureur cyber, et il fixe une date certaine dans la chronologie de l'incident. La question se pose donc dans les premières vingt-quatre heures, pas après.",
  },
  {
    q: "Un ex-salarié est parti avec notre base clients.",
    a: "Oui — et c'est pénal. L'accès à des données après la rupture du contrat constitue un accès frauduleux à un STAD (art. 323-1 C.pén.). La copie de données est une extraction frauduleuse (art. 323-3). La plainte pénale peut être accompagnée d'un référé en urgence pour interdire l'utilisation des données.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Le volet RGPD : fichier clients détourné et obligations envers les personnes" },
  },
  {
    q: "On nous accuse d'une intrusion. Une adresse IP nous désigne.",
    a: "Une adresse IP n'est pas une identité. Elle peut être usurpée, partagée, mal interprétée. Chaque élément constitutif de l'infraction doit être établi par l'accusation. Nous examinons le dossier technique et soulevons les failles de la démonstration.",
  },
  {
    q: "On a subi une attaque. La CNIL enquête sur nous.",
    a: "Être victime n'exclut pas d'être mis en cause pour insuffisance de sécurité. La défense repose sur trois démonstrations : les mesures prises, la réaction documentée à l'incident, et la responsabilité du prestataire si une vulnérabilité n'a pas été corrigée.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Notification de violation et contrôle CNIL : voir RGPD & données" },
  },
  {
    q: "Les serveurs sont à l'étranger, peut-on agir ?",
    a: "Une infrastructure hébergée hors de France ne fait pas obstacle à la poursuite. Ce qui compte est la localisation du dommage et les canaux d'entraide disponibles. Serveurs distants, adresses IP et flux en cryptomonnaies sont des pièces de procédure comme les autres.",
  },
  {
    // TODO (cabinet) : la subordination de l'indemnisation d'une rançon au dépôt
    // d'une plainte dans un délai bref reste à vérifier au code des assurances
    // avant mise en ligne. Réponse reprise telle quelle du pilier cybersécurité.
    q: "Faut-il payer la rançon ?",
    a: "Le versement n'est pas en soi pénalement réprimé, mais il engage plusieurs terrains à la fois : conformité aux régimes de sanctions internationales, couverture par l'assurance cyber — l'indemnisation d'un tel versement étant subordonnée au dépôt d'une plainte dans un délai bref —, et cohérence avec ce qui a été déclaré aux autorités. Cette décision ne se prend pas dans l'urgence sans analyse.",
  },
];
