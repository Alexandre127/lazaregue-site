/**
 * Questions fréquentes de la page contact.
 *
 * Refonte 21.09.2026 : le formulaire envoie désormais réellement depuis le site
 * (route API + SMTP du cabinet) et non plus par la messagerie du visiteur — les
 * réponses de FAQ qui décrivaient ce fonctionnement ont été corrigées.
 * Les anciens blocs CHIFFRES / GARANTIES ont été retirés (bandeau de chiffres et
 * section « engagements » supprimés par l'audit).
 */

export type Question = { q: string; a: string };

export const FAQ: Question[] = [
  {
    q: "Combien coûte une première consultation ?",
    a: "La première prise de contact permet de qualifier votre situation et de vérifier si le cabinet peut intervenir : elle est sans engagement et ne constitue pas une consultation juridique. Si une mission est nécessaire, une convention d'honoraires vous est remise avant toute intervention ; elle précise la mission, le mode de calcul et les frais prévisibles.",
  },
  {
    // §3.2 — formulation du secret professionnel À CONFIRMER avant publication.
    q: "Mes échanges sont-ils vraiment confidentiels ?",
    a: "Oui, dès le premier contact. Le secret professionnel de l'avocat couvre l'ensemble de nos échanges, y compris avant toute mission (art. 66-5 de la loi du 31 décembre 1971). Les informations transmises par ce formulaire servent uniquement à examiner votre demande et à vous recontacter ; elles ne sont pas conservées au-delà de ce traitement.",
  },
  {
    q: "Quel délai pour obtenir une réponse ?",
    a: "Nous répondons sous 24 heures ouvrées. En cas d'urgence, appelez directement le 01 81 70 62 00, du lundi au vendredi de 9 h à 19 h.",
  },
  {
    q: "Intervenez-vous en dehors de Paris ?",
    a: "Oui, nous accompagnons des entreprises sur toute la France, principalement par visioconférence. Nos bureaux sont situés à Paris 17ᵉ, à deux pas de la place Charles-de-Gaulle — Étoile.",
  },
];
