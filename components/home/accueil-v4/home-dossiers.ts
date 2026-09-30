/* ============================================================================
   Dossiers traités — cartes de la page d'accueil (section « Dossiers traités »).

   CONTENU PROVISOIRE À VALIDER PAR ME LAZARÈGUE : profils, situations,
   interventions, leviers. Les trois liens pointent provisoirement vers la
   rubrique /cas-clients (aucune page dédiée ne correspond encore à ces trois
   dossiers).

   Voix : « le cabinet » (jamais « nous »). Espaces insécables dans « 80 000 € ».
   ========================================================================== */

export type HomeDossier = {
  id: string;
  numero: string;
  domaine: string;
  profil: string;
  titre: string;
  situation: string;
  intervention: string;
  levier: string;
  issue: string;
  href: string;
};

export const HOME_DOSSIERS: HomeDossier[] = [
  {
    id: "dossier-accueil-1",
    numero: "01",
    domaine: "Cyberattaque",
    profil: "Distributeur B2B, PME",
    titre: "Un piratage. 80 000 € d’appels internationaux facturés.",
    situation:
      "Le standard de l’entreprise a émis des appels en rafale vers des numéros surtaxés. L’opérateur imputait ce trafic à l’entreprise et en exigeait le paiement.",
    intervention:
      "Le cabinet et son consultant cybersécurité ont analysé les journaux d’appels : l’accès reposait sur un simple filtrage d’adresse IP, sans seuil d’alerte côté opérateur.",
    levier: "Obligation de sécurité de l’opérateur",
    issue: "Facture annulée.",
    href: "/cas-clients",
  },
  {
    id: "dossier-accueil-2",
    numero: "02",
    domaine: "Contrat informatique",
    profil: "Industriel, ETI",
    titre: "Le logiciel était livré. L’entreprise ne pouvait pas l’utiliser.",
    situation:
      "L’ERP ne gérait ni la facturation ni les stocks. Le prestataire réclamait pourtant le solde en invoquant un procès-verbal de recette.",
    intervention:
      "Le cabinet a fait constater les fonctions manquantes par commissaire de justice et établi que la recette avait été prononcée sous réserves.",
    levier: "Délivrance conforme · devoir de conseil",
    issue: "Contrat résilié, sommes versées remboursées.",
    href: "/cas-clients",
  },
  {
    id: "dossier-accueil-3",
    numero: "03",
    domaine: "Données personnelles",
    profil: "Éditeur SaaS, PME",
    titre: "Une fuite de données. Des grands comptes prêts à rompre.",
    situation:
      "Une base clients exposée sur un serveur mal configuré ; les principaux clients exigeaient des garanties.",
    intervention:
      "Périmètre établi avec le consultant technique, CNIL notifiée dans le délai légal, audits des clients traités sur la base d’un plan de remédiation documenté.",
    levier: "Art. 33 et 34 RGPD",
    issue: "Contrats majeurs conservés.",
    href: "/cas-clients",
  },
];
