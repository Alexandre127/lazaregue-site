/**
 * Données et calculs de l'Observatoire de la fraude bancaire
 * (/ressources/jurisprudence-faux-conseiller-bancaire).
 *
 * Source UNIQUE : le JSON des 169 décisions, copié dans ce dossier
 * (`observatoire-faux-conseiller-bancaire.json`). Tous les chiffres de la page
 * sont CALCULÉS ici depuis ces décisions — jamais écrits en dur (règle du brief).
 *
 * Règles de calcul (reprises de la maquette validée) :
 *  - « 9 fois sur 10 » / « X décisions sur Y » : parmi les décisions où
 *    `authentificationProuvee === false`, part de celles où `remboursement`.
 *    Libellé « 9 fois sur 10 » seulement si le ratio ≥ 0,9, sinon « N fois sur 10 ».
 *  - Total remboursé + fourchette : somme / min / max des montants des décisions
 *    `remboursement === true` ET `montantLibelle === "Montant remboursé"`,
 *    en prenant le PREMIER montant quand il est écrit « X € sur Y € ».
 *  - Jamais de nombre de décisions défavorables ni de taux de réussite global.
 */

import raw from "./observatoire-faux-conseiller-bancaire.json";

export type SituationKey = "appel" | "sms" | "site" | "carte" | "rien";

export type Decision = {
  id: string;
  situation: SituationKey;
  situationLibelle: string;
  remboursement: boolean;
  date: string; // AAAA-MM-JJ
  banque: string | null;
  montant: string | null;
  montantLibelle: string;
  titre: string;
  motif: string;
  motifLibelle: string;
  reference: string;
  authentificationProuvee: boolean | null;
  lienDecision: string | null;
};

export const DECISIONS = raw as Decision[];

/** Les cinq situations, dans l'ordre d'affichage des cartes (libellés + accroches verbatim). */
export const SITUATIONS: { key: SituationKey; label: string; quote: string }[] = [
  {
    key: "appel",
    label: "Faux conseiller au téléphone",
    quote: "Un faux conseiller de ma banque m’a appelé et m’a fait valider des opérations",
  },
  {
    key: "sms",
    label: "Faux SMS, puis faux conseiller",
    quote: "J’ai reçu un faux SMS de ma banque, puis l’appel d’un faux conseiller",
  },
  {
    key: "site",
    label: "Phishing : faux mail ou faux site",
    quote: "Un faux mail ou un faux site (phishing) m’a fait saisir mes codes",
  },
  {
    key: "carte",
    label: "Carte remise à un faux coursier",
    quote: "J’ai remis ma carte à un faux coursier envoyé par ma « banque »",
  },
  {
    key: "rien",
    label: "Compte piraté, opérations à mon insu",
    quote: "Mon compte a été piraté : des opérations que je n’ai jamais faites",
  },
];

export const SIT_LABEL = Object.fromEntries(
  SITUATIONS.map((s) => [s.key, s.label]),
) as Record<SituationKey, string>;

/**
 * Extrait le montant numérique d'un libellé (ex. « 5 680,87 € sur 10 010 € »
 * → 5680.87). Prend le PREMIER montant, avant le « € ». `\s` couvre l'espace
 * normal, l'espace insécable et l'espace fine insécable.
 */
export function parseMontant(s: string | null): number {
  if (!s) return 0;
  const m = String(s).match(/^([\d\s]+(?:,\d+)?)\s*€/);
  return m ? parseFloat(m[1].replace(/\s/g, "").replace(",", ".")) : 0;
}

/** Format euros : entier, séparateurs français en espace simple, « € » final. */
export function formatEuro(x: number): string {
  return Math.round(x).toLocaleString("fr-FR").replace(/ | /g, " ") + " €";
}

export type Stats = {
  favAuthFalse: number; // décisions remboursées parmi authentification non prouvée
  totalAuthFalse: number; // total des décisions où authentification non prouvée
  ratioLabel: string; // « 9 fois sur 10 » ou « N fois sur 10 »
  sumRefund: string; // total remboursé
  rangeRefund: string; // « De min à max »
};

/** Chiffres clés calculés depuis les décisions fournies. */
export function computeStats(data: Decision[] = DECISIONS): Stats {
  const authFalse = data.filter((d) => d.authentificationProuvee === false);
  const totalAuthFalse = authFalse.length;
  const favAuthFalse = authFalse.filter((d) => d.remboursement === true).length;
  const ratio = totalAuthFalse ? favAuthFalse / totalAuthFalse : 0;
  const ratioLabel = ratio >= 0.9 ? "9 fois sur 10" : `${Math.round(ratio * 10)} fois sur 10`;

  const refunds = data
    .filter((d) => d.remboursement === true && d.montantLibelle === "Montant remboursé")
    .map((d) => parseMontant(d.montant))
    .filter((x) => x > 0);
  const sumRefund = formatEuro(refunds.reduce((a, b) => a + b, 0));
  const rangeRefund = `De ${formatEuro(Math.min(...refunds))} à ${formatEuro(Math.max(...refunds))}`;

  return { favAuthFalse, totalAuthFalse, ratioLabel, sumRefund, rangeRefund };
}

/** Nombre de décisions FAVORABLES (remboursement) pour une situation donnée. */
export function winsBySituation(data: Decision[], key: SituationKey): number {
  return data.filter((d) => d.situation === key && d.remboursement === true).length;
}

/** Liste triée (alphabétique FR) des banques nommées (hors valeurs nulles). */
export function banquesList(data: Decision[] = DECISIONS): string[] {
  return Array.from(new Set(data.map((d) => d.banque).filter((b): b is string => !!b))).sort(
    (a, b) => a.localeCompare(b, "fr"),
  );
}
