import {
  AXES,
  BAREME,
  CHANTIERS,
  NIVEAUX,
  QUESTIONS,
  STYLE_STATUT,
  STYLE_STATUT_DEFAUT,
  type AxeId,
  type NiveauId,
  type Question,
  type Reponse,
  type StyleStatut,
} from "../../data/diagnostic-shadow-ai";

/**
 * Calcul de l'autodiagnostic Shadow AI, entièrement dans le navigateur, à partir
 * du seul fichier de contenu (data/diagnostic-shadow-ai.ts). Fonctions pures :
 * mêmes réponses, même résultat.
 */

export type Reponses = Partial<Record<string, Reponse>>;

export const SCORE_MAX = QUESTIONS.length * BAREME.exposante;

export function points(q: Question, r: Reponse): number {
  if (r === "nsp") return BAREME.nsp;
  return r === q.exposante ? BAREME.exposante : BAREME.protectrice;
}

export type ChantierAffiche = { id: string; intitule: string; reference: string; statut: string; style: StyleStatut };

export type Resultat = {
  score: number;
  niveau: NiveauId;
  titre: string;
  synthese: string;
  axes: { id: AxeId; score: number; max: number }[];
  chantiers: ChantierAffiche[];
};

export function evaluer(rep: Reponses): Resultat {
  const score = QUESTIONS.reduce((s, q) => s + (rep[q.id] ? points(q, rep[q.id]!) : 0), 0);
  const niveau = NIVEAUX.find((n) => score >= n.min && score <= n.max) ?? NIVEAUX[NIVEAUX.length - 1];

  const axes = AXES.map((a) => {
    const qs = QUESTIONS.filter((q) => q.axe === a.id);
    return {
      id: a.id,
      score: qs.reduce((s, q) => s + (rep[q.id] ? points(q, rep[q.id]!) : 0), 0),
      max: qs.length * BAREME.exposante,
    };
  });

  const chantiers: ChantierAffiche[] = [];
  for (const c of CHANTIERS) {
    let statut: string | null = c.toujours ?? null;
    if (c.selon) {
      const r = rep[c.selon.question];
      statut = r ? c.selon[r] : c.selon.nsp;
    }
    if (statut === null) continue; // chantier masqué : ni affiché ni compté
    chantiers.push({
      id: c.id,
      intitule: c.intitule,
      reference: c.reference,
      statut,
      style: STYLE_STATUT[statut] ?? STYLE_STATUT_DEFAUT,
    });
  }

  return { score, niveau: niveau.id, titre: niveau.titre, synthese: niveau.synthese, axes, chantiers };
}

/** Une échéance du calendrier est « en vigueur » à partir de sa date (jour local). */
export function enVigueur(iso: string, aujourdhui: Date): boolean {
  const [a, m, j] = iso.split("-").map(Number);
  return aujourdhui >= new Date(a, m - 1, j);
}
