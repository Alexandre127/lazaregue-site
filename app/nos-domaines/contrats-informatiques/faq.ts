/**
 * Source unique des questions fréquentes de la page « Contrats informatiques ».
 *
 * Elle vit dans un module neutre parce qu'un composant `"use client"` ne peut
 * pas exporter de données vers un composant serveur — Next y substitue une
 * référence client. La page en a besoin pour produire le balisage FAQPage,
 * qui doit rester rigoureusement identique au texte affiché : l'accordéon
 * visible (client) et le JSON-LD (serveur) lisent le même tableau.
 *
 * Refonte « contrats / contentieux » : la FAQ est recentrée sur la phase
 * contractuelle (cinq questions). Les réponses 1 à 4 sont transférées VERBATIM
 * depuis l'ancien composant ; leur libellé de question reprend la formulation
 * arbitrée du brief. La question 5 (honoraires) est nouvelle, sans montant, à
 * confronter à la page Honoraires avant mise en ligne. Les questions retirées
 * (cahier des charges, limitation de responsabilité, recette, expertise
 * judiciaire) rejoindront la future page contentieux.
 */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Comment répartir la responsabilité en cas de perte de données ?",
    a: "Sa responsabilité dépend de ce qu'il s'est engagé à faire. Lorsqu'il s'est expressément engagé à réaliser et à maintenir des sauvegardes exploitables, leur absence ou leur inefficacité peut caractériser l'inexécution de son obligation. L'appréciation tient néanmoins au périmètre contractuel, aux diligences respectives des parties et aux causes de la perte de données. Le devoir de conseil joue en outre indépendamment de toute demande du client.",
  },
  {
    q: "Peut-on résilier un contrat informatique avant son terme ?",
    a: "Un contrat à durée déterminée ne se résilie pas pour simple insatisfaction. La résolution suppose une inexécution suffisamment grave et, sauf urgence ou circonstances particulières, une mise en demeure demeurée sans effet. Le non-respect d'un calendrier présenté dès l'origine comme déterminant du consentement peut à lui seul la justifier. À défaut, le client s'expose aux sommes dues jusqu'au terme et aux pénalités contractuelles.",
  },
  {
    q: "À qui appartient le code source d'un logiciel développé sur mesure ?",
    a: "Sauf cession expresse et écrite, les droits sur les développements restent au prestataire. En l'absence de cession suffisamment précise, le client peut ne disposer que des droits d'utilisation prévus au contrat, sans pouvoir librement modifier le logiciel ni en confier l'évolution à un tiers. La clause de propriété intellectuelle doit distinguer le socle préexistant, les développements spécifiques et les composants open source intégrés.",
  },
  {
    q: "Comment récupérer les données à la fin d'un contrat cloud ?",
    a: "Par la clause de réversibilité, qui doit prévoir les formats de restitution, les délais, la durée de l'assistance à la transition et le plafonnement de son coût. En l'absence d'une telle clause, la récupération se négocie au moment où le rapport de force est le plus défavorable.",
  },
  {
    q: "Combien coûte l'intervention d'un avocat en contrats informatiques ?",
    a: "Le coût dépend de la nature de l'intervention et du volume contractuel examiné. Un audit de contrat, une rédaction ou un avenant se traitent habituellement au forfait, arrêté après un premier examen des pièces. Une convention d'honoraires écrite précise, avant tout engagement, le mode de calcul retenu et les frais susceptibles de s'y ajouter.",
  },
];
