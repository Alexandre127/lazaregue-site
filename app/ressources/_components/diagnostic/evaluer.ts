import type { Decision } from "../../data/decisions-avis-google";
import { FORFAIT_AMIABLE } from "../../data/offre-avis-google";

/**
 * Logique du diagnostic « avis Google » — portage à l'identique du prototype
 * validé (docs/maquettes/diagnostic-avis-google.html) : qualification, niveau,
 * voie recommandée, délais calculés depuis la date de publication, notes,
 * décisions comparables, honoraires. Fonctions pures, partagées par le
 * composant (navigateur) et par la route d'envoi (serveur).
 */

export type Reponses = {
  vise: "societe" | "nom" | "sante" | "secret" | null;
  client: "non" | "oui" | "nsp" | null;
  contenu: "critique" | "fait" | "insulte" | "perso" | null;
  date: Date | null;
  serie: "un" | "meme" | "vague" | null;
  signal: "non" | "bouton" | "refus" | "reclam" | null;
};

export type Niveau = "ok" | "warn" | "stop";

export type Resultat = {
  niveau: Niveau;
  titre: string;
  qualification: string;
  etapes: string[];
  delais: { libelle: string; valeur: string; alerte: boolean }[];
  notes: string[];
  adr: boolean;
  offre: { libelle: string; prix: string; detail: string }[];
  prescrit: boolean;
  comparables: Decision[];
};

export const QUESTIONS = {
  vise: {
    n: "01",
    legende: "Qui est visé par l’avis ?",
    options: [
      ["societe", "Une société"],
      ["nom", "Un professionnel en nom propre"],
      ["sante", "Un professionnel de santé"],
      ["secret", "Un avocat, un notaire ou une autre profession tenue au secret"],
    ],
  },
  client: {
    n: "02",
    legende: "L’auteur de l’avis a-t-il été votre client ?",
    aide: "Vérifiez vos factures, réservations et agenda sur la période concernée.",
    options: [
      ["non", "Non, aucune trace de cette personne"],
      ["oui", "Oui, c’est un client"],
      ["nsp", "Impossible à savoir (pseudonyme)"],
    ],
  },
  contenu: {
    n: "03",
    legende: "Que dit l’avis ?",
    options: [
      ["critique", "Il critique la qualité, le prix, l’accueil"],
      ["fait", "Il accuse d’un fait précis (fraude, vol, faute grave)"],
      ["insulte", "Il contient des insultes"],
      ["perso", "Il divulgue des informations confidentielles ou personnelles"],
    ],
  },
  serie: {
    n: "05",
    legende: "S’agit-il d’un avis isolé ?",
    options: [
      ["un", "Un seul avis"],
      ["meme", "Plusieurs avis du même auteur"],
      ["vague", "Plusieurs avis d’auteurs différents, au même moment"],
    ],
  },
  signal: {
    n: "06",
    legende: "Avez-vous déjà signalé l’avis à Google ?",
    aide: "Le bouton « Signaler » de la fiche et le formulaire juridique de Google sont deux démarches distinctes ; seule la seconde a une portée juridique.",
    options: [
      ["non", "Pas encore"],
      ["bouton", "Oui, par le bouton « Signaler » de la fiche"],
      ["refus", "Oui, par le formulaire juridique de Google, qui a refusé"],
      ["reclam", "Oui, et ma réclamation contre ce refus a aussi été rejetée"],
    ],
  },
} as const;

/** Libellés courts des réponses (récapitulatif transmis au cabinet). */
export const LIBELLES = {
  vise: { societe: "Société", nom: "Professionnel en nom propre", sante: "Professionnel de santé", secret: "Profession tenue au secret" },
  client: { non: "Non", oui: "Oui", nsp: "Impossible à savoir" },
  contenu: { critique: "Critique", fait: "Fait précis", insulte: "Insultes", perso: "Informations personnelles" },
  serie: { un: "Avis isolé", meme: "Plusieurs avis, même auteur", vague: "Plusieurs avis, auteurs différents" },
  signal: { non: "Pas encore", bouton: "Bouton Signaler", refus: "Formulaire juridique refusé", reclam: "Réclamation rejetée" },
} as const;

const JOUR = 86400000;
export const dateLongue = (d: Date) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const plusMois = (d: Date, m: number) => new Date(d.getFullYear(), d.getMonth() + m, d.getDate());
const aujourdhui = () => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
};

export function nombreDeReponses(a: Reponses): number {
  return (["vise", "client", "contenu", "date", "serie", "signal"] as const).filter((k) => a[k]).length;
}

/**
 * `visibles` : décisions affichables (toutes hors production, seulement les
 * vérifiées en production). Une décision absente n'est ni listée ni citée.
 */
export function evaluer(a: Reponses, visibles: Map<string, Decision>): Resultat {
  const cite = (id: string) => (visibles.has(id) ? ` (${visibles.get(id)!.ref})` : "");
  const presse = a.contenu === "fait" || a.contenu === "insulte";

  // Qualification
  let qualification = "";
  if (a.contenu === "fait") qualification = "Diffamation probable : l’avis impute un fait précis qui porte atteinte à l’honneur.";
  else if (a.contenu === "insulte") qualification = "Injure probable : termes outrageants sans fait précis.";
  else if (a.contenu === "perso")
    qualification =
      "Divulgation d’informations confidentielles ou personnelles : même écrit par un vrai client, l’avis peut être illicite. L’authenticité du témoignage ne rend pas licite la divulgation de tout ce qu’il contient.";
  else if (a.contenu === "critique") {
    qualification =
      a.client === "oui"
        ? "Critique d’un client : elle relève en principe de la liberté d’expression, sauf propos excessifs ou dépourvus de base factuelle."
        : "Dénigrement probable : une critique sans expérience réelle de vos services n’a pas de base factuelle.";
  }

  // Niveau
  let prescrit = false;
  let echeance: Date | null = null;
  let reste: number | null = null;
  if (a.date) {
    echeance = plusMois(a.date, 3);
    reste = Math.ceil((echeance.getTime() - aujourdhui().getTime()) / JOUR);
    if (presse && reste < 0) prescrit = true;
  }
  let niveau: Niveau;
  let titre: string;
  if (a.contenu === "critique" && a.client === "oui") {
    niveau = "stop";
    titre = "Retrait peu probable";
  } else if (a.contenu === "fait" || a.contenu === "insulte" || a.contenu === "perso" || a.serie === "meme" || (a.contenu === "critique" && a.client === "non")) {
    niveau = "ok";
    titre = "Retrait envisageable";
  } else {
    niveau = "warn";
    titre = "À examiner";
  }
  if (prescrit && niveau === "ok") {
    niveau = "warn";
    titre = "À examiner : délai judiciaire expiré";
  }

  // Voie recommandée
  const qui = a.vise === "sante" ? "patient" : "client";
  const etapes: string[] = [];
  let adr = false;
  if (niveau === "stop") {
    etapes.push(`Publier une réponse brève et courtoise, sans aucune information sur le ${qui}.`);
    etapes.push("Faire examiner l’avis seulement si certains propos vous paraissent mensongers.");
  } else {
    if (!a.signal || a.signal === "non")
      etapes.push("Adresser à Google une notification motivée par son formulaire juridique (art. 16 DSA) : qualification de l’avis, fondement légal, pièces.");
    if (a.signal === "bouton")
      etapes.push("Votre signalement par le bouton de la fiche n’a pas de portée juridique. Adresser à Google une notification motivée par son formulaire juridique (art. 16 DSA).");
    if (a.signal === "refus")
      etapes.push(
        "Votre notification a été refusée : déposer la réclamation prévue par l’article 20 du DSA. C’est un recours distinct de la notification, ouvert pendant six mois après le refus, que Google doit faire examiner par une personne et non par un algorithme.",
      );
    else if (a.signal !== "reclam")
      etapes.push("Si Google refuse, déposer la réclamation prévue par l’article 20 du DSA, que Google doit faire examiner par une personne et non par un algorithme.");
    etapes.push(
      a.signal === "reclam"
        ? "Votre réclamation a été rejetée : saisir ADR Center (voir le détail des étapes plus bas)."
        : "En cas de nouveau refus, saisir ADR Center (voir le détail des étapes plus bas).",
    );
    if (presse && !prescrit)
      etapes.push("Si l’auteur est anonyme, demander au juge son identification ; à défaut, demander au juge d’ordonner directement à Google le retrait de l’avis.");
    if (a.serie === "meme") etapes.push("Plusieurs avis d’un même auteur : une action en justice avec dommages et intérêts peut se justifier.");
    adr = true;
  }

  // Honoraires
  const offre: Resultat["offre"] = [];
  if (niveau !== "stop") {
    offre.push({
      libelle: "Forfait procédure amiable : notification motivée, réclamation et saisine d’ADR Center, selon ce qui reste à faire",
      prix: FORFAIT_AMIABLE.ht,
      detail: FORFAIT_AMIABLE.ttc,
    });
    if (presse && !prescrit)
      offre.push({ libelle: "Action en justice : retrait ordonné à Google, identification de l’auteur, dommages et intérêts", prix: "sur devis", detail: "après analyse" });
  }

  // Notes
  const notes: string[] = [];
  if (a.vise === "nom" || a.vise === "sante" || a.vise === "secret")
    notes.push(
      "Exerçant en nom propre, vous disposez aussi du droit d’opposition prévu par le RGPD. Il conduit à la suppression de toute la fiche, avis positifs compris : à réserver au cas où vous ne souhaitez plus figurer sur Google Maps.",
    );
  if (a.vise === "sante" || a.vise === "secret") notes.push(`Tenu au secret professionnel, ne confirmez ni ne démentez jamais publiquement qu’une personne est votre ${qui}.`);
  if (a.client === "nsp")
    notes.push(
      "Le pseudonyme ne suffit pas à faire retirer un avis : l’anonymat est licite. Il faut des indices sérieux de faux avis : aucune trace de l’auteur ni des faits dans vos fichiers, profil sans historique, avis en série, détails incompatibles avec votre activité." +
        (visibles.has("par22") ? ` Sans ces indices, le juge refuse${cite("par22")}.` : ""),
    );
  if (a.client === "non") notes.push(`Un avis sans expérience réelle est un dénigrement, même s’il est formulé comme une simple critique${cite("gre25")}.`);
  if (a.client === "oui" && a.contenu === "critique")
    notes.push("Une opinion ne peut pas être « fausse » : seuls des faits précis et inexacts peuvent justifier un retrait, à condition d’en prouver l’inexactitude.");
  notes.push(
    "Si vous répondez publiquement, ne révélez jamais l’identité ou les coordonnées de l’auteur" +
      (visibles.has("nan22") ? ` : un garage qui l’avait fait a été condamné${cite("nan22")}.` : "."),
  );
  if (a.vise === "societe" && a.contenu === "critique")
    notes.push("Conservez dès maintenant les statistiques de votre fiche et de votre site : elles servent à chiffrer le préjudice.");

  // Délais
  const delais: Resultat["delais"] = [];
  if (a.date && echeance !== null && reste !== null) {
    const now = aujourdhui().getTime();
    if (presse) {
      delais.push({
        libelle: `Action en justice pour ${a.contenu === "fait" ? "diffamation" : "injure"}`,
        valeur: reste >= 0 ? `jusqu’au ${dateLongue(echeance)} (${reste} j)` : `expiré le ${dateLongue(echeance)}`,
        alerte: reste < 0 || reste <= 21,
      });
      const ip = plusMois(a.date, 12);
      const ipReste = Math.ceil((ip.getTime() - now) / JOUR);
      delais.push({ libelle: "Conservation des adresses IP", valeur: ipReste >= 0 ? `jusqu’au ${dateLongue(ip)}` : "dépassée", alerte: ipReste < 0 || ipReste <= 60 });
    }
    const adrFin = plusMois(a.date, 12);
    const adrReste = Math.ceil((adrFin.getTime() - now) / JOUR);
    delais.push({ libelle: "Saisine d’ADR Center", valeur: adrReste >= 0 ? `jusqu’au ${dateLongue(adrFin)}` : "délai dépassé", alerte: adrReste < 0 || adrReste <= 60 });
    if (a.contenu === "critique" && a.client !== "oui") delais.push({ libelle: "Action en dénigrement", valeur: `jusqu’au ${dateLongue(plusMois(a.date, 60))}`, alerte: false });
    if (prescrit)
      notes.unshift("Le délai de trois mois pour agir en justice en diffamation ou en injure est expiré. Le signalement à Google et la saisine d’ADR Center restent possibles.");
    if (a.date.getTime() > now) notes.unshift("La date indiquée est dans le futur : vérifiez-la.");
  }

  // Décisions comparables (trois au plus), parmi les décisions affichables.
  const cles: string[] = [];
  if (a.contenu === "critique" && a.client === "oui") cles.push("dou25", "col21");
  else if (a.contenu === "critique") cles.push("gre25", "cass24");
  if (a.contenu === "fait") cles.push("tls22", "par26");
  if (a.contenu === "insulte") cles.push("aix18", "mtp22");
  if (a.contenu === "perso") cles.push("cab");
  if (prescrit) cles.push("ren26");
  if ((a.vise === "sante" || a.vise === "secret" || a.vise === "nom") && !cles.includes("cha25")) cles.push("cha25");
  const comparables = cles
    .slice(0, 3)
    .map((id) => visibles.get(id))
    .filter((d): d is Decision => !!d);

  return { niveau, titre, qualification, etapes, delais, notes, adr, offre, prescrit, comparables };
}
