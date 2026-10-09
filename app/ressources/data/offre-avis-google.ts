/**
 * Offre « avis Google » — honoraires affichés par le diagnostic.
 *
 * PRIX PROVISOIRE (à confirmer par le cabinet) : pour le changer, modifier la
 * seule ligne `FORFAIT_AMIABLE_HT`. Le TTC et tous les affichages en découlent.
 */
export const FORFAIT_AMIABLE_HT = 690;

const TAUX_TVA = 0.2;
const euros = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} €`;

export const FORFAIT_AMIABLE = {
  ht: `${euros(FORFAIT_AMIABLE_HT)} HT`,
  ttc: `${euros(Math.round(FORFAIT_AMIABLE_HT * (1 + TAUX_TVA) * 100) / 100)} TTC`,
};
