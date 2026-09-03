/**
 * Source unique des questions fréquentes.
 *
 * Module neutre : un composant `"use client"` ne peut pas exporter de données
 * vers un composant serveur — Next y substitue une référence client. La page
 * en a besoin pour produire le balisage FAQPage, qui doit rester
 * rigoureusement identique au texte affiché.
 *
 * `lien` prolonge la réponse vers le domaine réellement engagé : le
 * déréférencement et le droit à l'oubli sont des droits RGPD avant d'être des
 * questions de plateforme.
 */
export const FAQ_ITEMS: {
  q: string;
  a: string;
  lien?: { href: string; label: string };
}[] = [
  {
    q: "Une plateforme refuse de retirer un contenu. Que puis-je faire ?",
    a: "On vérifie d'abord la régularité de votre notification : elle doit décrire et localiser précisément les faits litigieux et comporter les mentions de la loi du 21 juin 2004. Une notification régulière conditionne l'obligation de retrait prompt de l'hébergeur — et, à défaut, on engage le recours adapté, jusqu'au référé.",
  },
  {
    q: "Ma plateforme est-elle hébergeur ou éditeur ?",
    a: "Structurer et classer des contenus sans rôle actif de connaissance ou de contrôle relève du régime des hébergeurs, même créateur du site. Exercer une sélection ou une direction éditoriale fait basculer vers le droit commun des éditeurs, avec une exposition bien plus élevée.",
  },
  {
    q: "Peut-on faire retirer un contenu identique republié ailleurs ?",
    a: "Oui. Un hébergeur peut se voir enjoindre de retirer un contenu déjà déclaré illicite, quel qu'en soit l'auteur, ainsi que les contenus équivalents véhiculant en substance le même message — à condition que l'injonction reste ciblée et n'impose pas une appréciation autonome généralisée.",
  },
  {
    q: "Puis-je faire déréférencer des informations si la page source reste licite ?",
    a: "Oui. Le traitement du moteur se distingue de celui de l'éditeur : un moteur peut être tenu de supprimer des liens même si la publication sur la page source demeure licite et en ligne, dès lors que l'inclusion apparaît inadéquate, non ou plus pertinente, ou excessive.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "L'effacement à la source (art. 17 RGPD) : voir RGPD & données" },
  },
  {
    q: "Le droit à l'oubli exige-t-il de prouver un préjudice ?",
    a: "Non. Le déréférencement ne suppose pas la démonstration d'un préjudice. En principe, la vie privée et la protection des données priment sur l'intérêt économique de l'exploitant et sur l'intérêt du public — sauf rôle de la personne dans la vie publique.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Droit à l'effacement et droits des personnes : voir RGPD & données" },
  },
  {
    q: "Une injonction peut-elle produire un effet mondial ?",
    a: "Oui. La directive sur le commerce électronique ne s'oppose pas à des mesures d'injonction produisant des effets à l'échelle mondiale, sous réserve du respect des règles de droit international pertinentes.",
  },
];
