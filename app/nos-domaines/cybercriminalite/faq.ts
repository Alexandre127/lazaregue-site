/**
 * Questions fréquentes — page « Cybercriminalité » (maquette v4).
 * Texte repris à l'identique. Six questions, la première ouverte au chargement.
 * Rendues en <details>/<summary> natifs (réponses dans le HTML initial, clavier
 * natif, aucun script requis).
 */
export const FAQ_ITEMS: { q: string; a: string; open?: boolean }[] = [
  {
    q: "Quel est le rôle d'un avocat en cas de cyberattaque ?",
    a: "Il sécurise d'abord ce qui deviendra la preuve : quoi conserver, sous quelle forme, avec quelle traçabilité, avant que la remise en service n'efface les traces. Il détermine ensuite la qualification pénale, qui oriente l'enquête et les actes pouvant être demandés. Il devient enfin l'interlocuteur unique face au parquet, à l'assureur et au prestataire technique.",
    open: true,
  },
  {
    // TODO — délai de 72 h (art. L. 12-10-1 code des assurances, loi LOPMI du
    // 24 janvier 2023) : rédaction et champ d'application à vérifier par le
    // cabinet avant mise en ligne.
    q: "Faut-il déposer plainte après une cyberattaque ?",
    a: "Le dépôt de plainte n'est pas obligatoire, mais il est souvent exigé par l'assureur et il conditionne l'ouverture d'une procédure pénale. Pour être indemnisée par son assurance cyber, l'entreprise doit porter plainte dans les 72 heures. Une plainte sommaire ne permet pas aux enquêteurs d'identifier les faits, les qualifications envisageables et les investigations utiles. L'enjeu n'est pas de déposer plainte, mais de déposer une plainte documentée.",
  },
  {
    q: "Un ancien salarié est parti avec notre base clients.",
    a: "Plusieurs qualifications peuvent être envisagées selon les circonstances : maintien frauduleux dans le système si les accès ont été conservés après le départ, extraction frauduleuse de données, vol ou abus de confiance. S'y ajoute le volet civil du secret des affaires. Le choix dépend de ce que les journaux permettent d'établir, ce qui suppose de les conserver avant toute réattribution du poste.",
  },
  {
    q: "On nous accuse d'une intrusion. Une adresse IP nous désigne.",
    a: "Une adresse IP identifie un abonnement à un instant donné, pas une personne ni une intention. Partage de connexion, relais, machine compromise, adresse usurpée : les hypothèses alternatives se discutent sur pièces. Le travail consiste à obtenir l'intégralité des éléments techniques, à vérifier leurs conditions de collecte et à confronter la chronologie retenue par l'enquête à celle des journaux.",
  },
  {
    q: "Les serveurs sont à l'étranger, peut-on agir ?",
    a: "La localisation d'un serveur ne fait pas obstacle à la compétence des juridictions françaises dès lors que les faits ou leurs effets se situent en France. L'entraide pénale internationale et les réquisitions adressées aux opérateurs et aux plateformes permettent d'atteindre des éléments hébergés hors du territoire. Les délais s'allongent, la voie ne se ferme pas.",
  },
  {
    // TODO — art. L. 127-3 du code des assurances (libre choix de l'avocat en
    // protection juridique) : à vérifier par le cabinet avant mise en ligne.
    q: "Notre assureur impose son prestataire. Pouvons-nous choisir notre avocat ?",
    a: "Lorsque le contrat comporte une garantie de protection juridique, le libre choix de l'avocat s'impose à l'assureur (art. L. 127-3 du code des assurances). L'assureur peut proposer un intervenant, il ne peut pas l'imposer. La distinction est utile : le prestataire de réponse à incident travaille à restaurer le service, l'avocat à construire un dossier. Les deux objectifs sont légitimes et ne commandent pas les mêmes gestes dans les premières heures.",
  },
];
