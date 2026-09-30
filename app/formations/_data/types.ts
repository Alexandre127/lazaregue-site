/**
 * Modèle de données des pages Formations.
 *
 * Chaque formation est décrite par un objet `Formation` ; le gabarit unique
 * `FormationLayout` en fait une page complète. Le hub `/formations` réutilise
 * les champs `hub*` pour ses cartes. Les formateurs sont désignés par leur slug
 * dans `lib/equipe.ts` (photos et intitulés partagés avec le reste du site).
 *
 * Voir docs/CHARTE-SITE.md § « Créer une page de formation ».
 */

export type Repere = { label: string; value: string };
export type Creneau = { heure: string; titre: string; detail?: string };
export type ProgrammeModule = { num: string; titre: string; points: string[] };
export type Livrable = {
  titre: string;
  soustitre: string;
  /** Extrait réel (4–6 lignes) affiché dans l'aperçu du document. */
  extrait: string[];
  /** Rendu en cases à cocher (check-list) plutôt qu'en lignes. */
  cases?: boolean;
};
/**
 * Formateur : soit un membre de `lib/equipe.ts` (par `slug`, photo réelle), soit
 * une fiche renseignée à la main (photo en attente, ex. consœur à confirmer).
 */
export type FormationFormateur =
  | { slug: string; bio: string }
  | { nom: string; statut: string; bio: string };
export type FormationFaq = { q: string; a: string };

export type Formation = {
  /** Segment d'URL (le chemin complet vaut `/formations/<slug>`). */
  slug: string;
  /** Numéro affiché (01–04). */
  numero: string;
  /** Sur-titre du hero, ex. « Formation 01 · Entreprises ». */
  kicker: string;

  /** <title> de la page. */
  title: string;
  metaDescription: string;

  /** H1 : `avant` + `<accent>` bleu + `apres`. */
  h1: { avant: string; accent: string; apres?: string };
  /** Accroche en bandeau bleu (sous le H1). */
  accroche: string;
  /** Paragraphe d'introduction du hero. */
  intro: string;
  /** Repères du hero (Public, Animée par, Durée, Format, Tarif). */
  reperes: Repere[];
  /** Libellés des deux boutons du hero et du CTA final. */
  ctaPrimaire: string;
  ctaSecondaire: string;

  /** « La situation » : un moment daté + la scène + le renvoi. */
  situation: { moment: string; scene: string; renvoi: string };

  /** « Êtes-vous concerné ? » : trois questions (maquette statique). */
  concerne: string[];

  /** « À la fin de la journée, vos équipes savent ». */
  objectifs: string[];

  /** « La journée, heure par heure » (frise). */
  journee: Creneau[];
  /** Programme détaillé en modules (accordéon, premier ouvert). */
  programme: ProgrammeModule[];

  /** « Ce que vous emportez ». */
  livrablesTitre: string;
  livrablesIntro: string;
  livrables: Livrable[];

  /** « Vos formateurs » : intro + deux personnes (slugs `lib/equipe.ts`). */
  formateursTitre: string;
  formateursIntro: string;
  formateurs: FormationFormateur[];

  faq: FormationFaq[];

  /** CTA final. */
  ctaFinalTitre: string;
  ctaFinalTexte: string;

  /* ---- Champs repris par le hub /formations ---- */
  /** Titre court sur la carte du hub, ex. « IA Act ». */
  hubTitre: string;
  /** Phrase de la carte. */
  hubPhrase: string;
  /** « Pour » (public résumé) sur la carte. */
  hubPublic: string;
  /** « Animée par » sur la carte (noms séparés par « · »). */
  hubAnimee: string;
};
