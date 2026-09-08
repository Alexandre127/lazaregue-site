/**
 * Source unique des questions fréquentes de la page « Contrats informatiques ».
 *
 * Elle vit dans un module neutre parce qu'un composant `"use client"` ne peut
 * pas exporter de données vers un composant serveur — Next y substitue une
 * référence client. La page en a besoin pour produire le balisage FAQPage,
 * qui doit rester rigoureusement identique au texte affiché : l'accordéon
 * visible (client) et le JSON-LD (serveur) lisent le même tableau.
 */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Mon prestataire informatique est-il responsable en cas de perte de données ?",
    a: "Sa responsabilité dépend de ce qu'il s'est engagé à faire. Lorsqu'il s'est expressément engagé à réaliser et à maintenir des sauvegardes exploitables, leur absence ou leur inefficacité peut caractériser l'inexécution de son obligation. L'appréciation tient néanmoins au périmètre contractuel, aux diligences respectives des parties et aux causes de la perte de données. Le devoir de conseil joue en outre indépendamment de toute demande du client.",
  },
  {
    q: "Puis-je résilier mon contrat informatique avant son terme ?",
    a: "Un contrat à durée déterminée ne se résilie pas pour simple insatisfaction. La résolution suppose une inexécution suffisamment grave et, sauf urgence ou circonstances particulières, une mise en demeure demeurée sans effet. Le non-respect d'un calendrier présenté dès l'origine comme déterminant du consentement peut à lui seul la justifier. À défaut, le client s'expose aux sommes dues jusqu'au terme et aux pénalités contractuelles.",
  },
  {
    q: "Que doit contenir un cahier des charges informatique ?",
    a: "Périmètre fonctionnel, environnement technique existant, volumétrie, contraintes d'interopérabilité, jalons, livrables et critères de recette. Son absence ne profite pas au prestataire : il lui appartient d'en exiger la rédaction, d'émettre des réserves ou de refuser de s'engager.",
  },
  {
    q: "Comment récupérer ses données en fin de contrat cloud ?",
    a: "Par la clause de réversibilité, qui doit prévoir les formats de restitution, les délais, la durée de l'assistance à la transition et le plafonnement de son coût. En l'absence d'une telle clause, la récupération se négocie au moment où le rapport de force est le plus défavorable.",
  },
  {
    q: "Prestataire informatique : comment limiter sa responsabilité ?",
    a: "Par une clause rédigée de manière à couvrir l'ensemble des manquements visés et assortie d'un plafond non dérisoire. Seule est réputée non écrite la clause limitative qui contredit la portée de l'obligation essentielle souscrite. Un plafond librement négocié, en contrepartie d'avantages commerciaux, peut être maintenu même en cas de manquement essentiel, dès lors qu'il ne vide pas l'obligation de sa substance.",
  },
  {
    q: "À qui appartiennent le logiciel et le code source ?",
    a: "Sauf cession expresse et écrite, les droits sur les développements restent au prestataire. En l'absence de cession suffisamment précise, le client peut ne disposer que des droits d'utilisation prévus au contrat, sans pouvoir librement modifier le logiciel ni en confier l'évolution à un tiers. La clause de propriété intellectuelle doit distinguer le socle préexistant, les développements spécifiques et les composants open source intégrés.",
  },
  {
    q: "Comment organiser la recette d'un logiciel ?",
    a: "Par une procédure écrite : jeux d'essai, critères d'acceptation, délais de vérification, effets d'une recette avec réserves et d'un refus. Une recette signée sans réserve fragilise durablement toute contestation ultérieure.",
  },
  {
    q: "Comment se prépare une expertise judiciaire informatique ?",
    a: "Par la conservation immédiate des journaux, configurations et échanges, l'identification d'un conseil technique aux côtés de l'avocat, et la préparation des dires. L'expertise se joue largement sur les pièces produites lors des premières réunions.",
  },
];
