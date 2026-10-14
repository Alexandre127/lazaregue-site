/**
 * Les cinq entrées de recrutement — source unique pour les cartes de la page,
 * la liste du formulaire et la validation serveur (/api/candidature).
 */
export type Entree = {
  /** Identifiant utilisé par les liens « Candidater → » pour présélectionner l'entrée. */
  id: string;
  n: string;
  /** Titre de la carte. */
  titre: string;
  /** Libellé dans la liste du formulaire et dans l'objet de l'e-mail. */
  formulaire: string;
  pour: string;
  statut: string;
  epreuve: string;
};

export const ENTREES: Entree[] = [
  {
    id: "stages",
    n: "01",
    titre: "Stages & apprentissage",
    formulaire: "Stages et apprentissage",
    pour: "Élèves-avocats (PPI, stage final), étudiants de M1 et M2",
    statut: "Convention de stage ; apprentissage dès la promotion 2027",
    epreuve: "Note juridique sur dossier fictif",
  },
  {
    id: "jeunes-avocats",
    n: "02",
    titre: "Jeunes avocats",
    formulaire: "Jeunes avocats",
    pour: "De la prestation de serment à trois ans d'exercice",
    statut: "Contrat de travail",
    epreuve: "Acte sur dossier fictif, restitution orale",
  },
  {
    id: "avocats-confirmes",
    n: "03",
    titre: "Avocats confirmés",
    formulaire: "Avocats confirmés",
    pour: "Avocats expérimentés en droit du numérique",
    statut: "Contrat de travail",
    epreuve: "Stratégie sur un dossier complexe ; références",
  },
  {
    id: "profils-techniques",
    n: "04",
    titre: "Profils techniques",
    formulaire: "Profils techniques",
    pour: "Cybersécurité, IA, données, développement",
    statut: "Contrat de travail ou mission de conseil",
    epreuve: "Analyse d'un incident, expliquée à un client",
  },
  {
    id: "fonctions-support",
    n: "05",
    titre: "Fonctions support",
    formulaire: "Fonctions support",
    pour: "Assistanat juridique, relation client, contenu",
    statut: "Contrat de travail",
    epreuve: "Mise en situation : courriels, client, organisation",
  },
];

/** Plafond des deux PDF réunis : 4 Mo, sous la limite de 4,5 Mo d'une requête Vercel. */
export const MAX_FICHIERS = 4 * 1024 * 1024;

/** Événement émis par les liens « Candidater → » pour présélectionner l'entrée. */
export const EVT_ENTREE = "candidature:entree";
