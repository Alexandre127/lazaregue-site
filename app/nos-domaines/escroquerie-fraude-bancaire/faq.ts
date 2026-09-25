/**
 * Questions fréquentes — page « Fraude bancaire et escroquerie ».
 * La première question est ouverte au chargement.
 */
export const FAQ_ITEMS: { q: string; a: string; open?: boolean }[] = [
  {
    q: "Ma banque refuse de rembourser parce que j'ai validé l'opération. Est-ce définitif ?",
    a: "Non. Valider un écran présenté comme une mesure de sécurité n'équivaut pas à consentir au paiement qui a été exécuté. Pour refuser le remboursement, la banque doit établir une négligence grave de votre part, ce qui est l'exception dans ces fraudes conçues pour tromper. Le refus opposé au guichet n'est donc pas le dernier mot.",
    open: true,
  },
  {
    q: "Que faire si j'ai moi-même effectué le virement ?",
    a: "Deux questions se posent successivement : celle de la qualification — l'opération exécutée n'est pas toujours celle à laquelle le consentement a porté — puis, lorsque l'ordre a réellement été voulu, celle d'un autre manquement précisément caractérisé, notamment une anomalie apparente non détectée par la banque.",
  },
  {
    q: "L'authentification forte suffit-elle à prouver mon consentement ?",
    a: "Non. L'article L. 133-23 du code monétaire et financier énonce que l'utilisation de l'instrument de paiement enregistrée par le prestataire ne suffit pas nécessairement à prouver que l'opération a été autorisée, ni que l'utilisateur a commis une négligence grave.",
  },
  {
    q: "Quel délai pour contester ?",
    a: "Treize mois à compter de la date du débit, en application de l'article L. 133-24 du code monétaire et financier, pour signaler une opération non autorisée ou mal exécutée. Pour les entreprises, le contrat de compte peut prévoir un délai plus court : il faut le vérifier en priorité, sans préjuger des autres actions susceptibles d'être engagées.",
  },
  {
    q: "Faut-il porter plainte avant de demander le remboursement ?",
    a: "La contestation adressée à la banque ne dépend pas du dépôt d'une plainte. La plainte peut contribuer à l'identification, aux réquisitions et aux saisies ; elle est conduite en parallèle du recours contre les établissements, et le retard pris à l'une ne doit pas retarder l'autre.",
  },
  {
    q: "Peut-on agir contre la banque qui a reçu les fonds ?",
    a: "Oui, en caractérisant une faute propre dans l'ouverture ou le fonctionnement du compte de réception, ainsi que le préjudice et le lien de causalité. C'est l'angle le plus exigeant du contentieux ; il a permis, dans le cas client 03, un accord transactionnel avec la banque réceptrice.",
  },
];
