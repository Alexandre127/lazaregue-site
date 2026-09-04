/**
 * Source unique des questions directes.
 *
 * Module neutre : un composant `"use client"` ne peut pas exporter de données
 * vers un composant serveur — Next y substitue une référence client. La page
 * en a besoin pour produire le balisage FAQPage, qui doit rester
 * rigoureusement identique au texte affiché.
 *
 * `lien` prolonge la réponse vers le domaine réellement engagé : un dirigeant
 * qui subit un rançongiciel a simultanément un problème pénal, un problème
 * CNIL et un problème contractuel avec son prestataire. C'est le moment où il
 * est le plus utile de le lui montrer.
 */
export const FAQ_ITEMS: {
  q: string;
  a: string;
  lien?: { href: string; label: string };
}[] = [
  {
    q: "Un ex-salarié est parti avec notre base clients. On peut faire quelque chose ?",
    a: "Oui — et c'est pénal. L'accès à des données après la rupture du contrat constitue un accès frauduleux à un STAD (art. 323-1 C.pén.). La copie de données est une extraction frauduleuse (art. 323-3). La plainte pénale peut être accompagnée d'un référé en urgence pour interdire l'utilisation des données.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Le volet RGPD : fichier clients détourné et obligations envers les personnes" },
  },
  {
    q: "Notre banque refuse de rembourser le phishing.",
    a: "La charge de la preuve lui appartient. Elle doit démontrer votre négligence grave — pas vous prouver votre bonne foi. Cette preuve suppose un email avec des indices manifestes qu'un utilisateur normalement attentif aurait détectés. Si ce n'est pas le cas, le remboursement s'impose.",
  },
  {
    q: "On nous accuse d'une intrusion informatique. Une adresse IP nous désigne.",
    a: "Une adresse IP n'est pas une identité. Elle peut être usurpée, partagée, mal interprétée. Chaque élément constitutif de l'infraction doit être établi par l'accusation. Nous examinons le dossier technique et soulevons les failles de la démonstration.",
  },
  {
    q: "On a subi une attaque. La CNIL enquête maintenant sur nous.",
    a: "Être victime n'exclut pas d'être mis en cause pour insuffisance de sécurité. La défense repose sur trois démonstrations : les mesures prises, la réaction documentée à l'incident, et la responsabilité du prestataire si une vulnérabilité n'a pas été corrigée.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Notification de violation et contrôle CNIL : voir RGPD & données" },
  },
  {
    q: "Faut-il payer la rançon ?",
    a: "C'est une décision qui engage la procédure pénale, la relation avec l'assureur et la position devant la CNIL. Payer ne garantit pas la restitution des données. Appelez-nous avant de décider.",
    lien: { href: "/nos-domaines/cybersecurite/nis2", label: "Prévenir et documenter en amont : Cybersécurité & NIS 2" },
  },
];
