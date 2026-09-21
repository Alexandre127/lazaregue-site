/**
 * Questions fréquentes — page « Fraude bancaire et escroquerie » (maquette v3.5).
 * Texte repris à l'identique. La première question est ouverte au chargement.
 */
export const FAQ_ITEMS: { q: string; a: string; open?: boolean }[] = [
  {
    q: "La banque doit-elle rembourser une opération non autorisée ?",
    a: "Le remboursement intervient aussitôt que l'établissement est informé de l'opération, et au plus tard à la fin du premier jour ouvrable suivant, sauf s'il a de bonnes raisons de soupçonner une fraude de l'utilisateur et qu'il les communique par écrit à la Banque de France. Ce régime peut être aménagé par contrat pour les clients qui ne sont pas des consommateurs.",
    open: true,
  },
  {
    q: "L'authentification forte suffit-elle à prouver mon consentement ?",
    a: "Non. L'article L. 133-23 du code monétaire et financier énonce que l'utilisation de l'instrument de paiement enregistrée par le prestataire ne suffit pas nécessairement à prouver que l'opération a été autorisée, ni que l'utilisateur a commis une négligence grave.",
  },
  {
    q: "Quel délai pour contester ?",
    a: "Treize mois à compter de la date du débit, en application de l'article L. 133-24 du code monétaire et financier, pour signaler une opération non autorisée ou mal exécutée. Cette échéance doit être vérifiée en priorité, sans préjuger des autres actions susceptibles d'être engagées.",
  },
  {
    q: "Faut-il porter plainte avant de demander le remboursement ?",
    a: "La contestation adressée à la banque ne dépend pas du dépôt d'une plainte. La plainte peut contribuer à l'identification, aux réquisitions et aux saisies ; elle est conduite en parallèle du recours contre les établissements, et le retard pris à l'une ne doit pas retarder l'autre.",
  },
  {
    q: "Que faire si j'ai moi-même effectué le virement ?",
    a: "Deux questions se posent successivement : celle de la qualification — l'opération exécutée n'est pas toujours celle à laquelle le consentement a porté — puis, lorsque l'ordre a réellement été voulu, celle d'un autre manquement précisément caractérisé, notamment une anomalie apparente.",
  },
  {
    q: "Peut-on agir contre la banque qui a reçu les fonds ?",
    a: "Cette voie suppose de caractériser une faute civile propre dans l'ouverture ou le fonctionnement du compte de réception, ainsi que le préjudice et le lien de causalité. C'est l'angle le moins exploité du contentieux, et le plus exigeant.",
  },
];
