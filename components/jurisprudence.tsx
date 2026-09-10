import { fr } from "@/lib/typo";

/**
 * Accordéon jurisprudentiel partagé — traitement unique des décisions de
 * justice sur tout le site (référence en DM Mono à gauche, intitulé de la
 * règle en Space Grotesk à droite, filet fin entre chaque entrée, mention de
 * prudence sous la liste).
 *
 * GARDE-FOU. Le champ `verifiee` conditionne le rendu : une décision dont
 * `verifiee` vaut `false` n'est JAMAIS rendue, sur aucune page. Le mécanisme
 * rend impossible la publication d'une référence non vérifiée — une version
 * antérieure de la page contrats informatiques citait un « tribunal des
 * activités économiques de Lille », juridiction inexistante (Lille ne figure
 * pas parmi les douze tribunaux de l'expérimentation). Une référence se passe
 * à `verifiee: true` seulement après avoir été retrouvée et lue sur Judilibre
 * ou Doctrine.
 */
export type Decision = {
  juridiction: string;
  date: string;
  reference: string;
  /** Intitulé de la règle (résumé cliquable). */
  intitule: string;
  /** Texte de l'accordéon : la règle que la décision énonce. */
  regle: string;
  verifiee: boolean;
};

const NOTE_DEFAUT =
  "Ces décisions sont citées pour la règle qu'elles énoncent. Chaque affaire dépend de ses circonstances propres et aucun résultat ne peut être garanti.";

export function Jurisprudence({
  decisions,
  note = NOTE_DEFAUT,
}: {
  decisions: Decision[];
  /** Mention de prudence sous la liste. `null` la masque (aucune mention). */
  note?: string | null;
}) {
  const rendues = decisions.filter((d) => d.verifiee);
  // Aucune décision vérifiée : ne rien rendre (ni liste, ni mention).
  if (rendues.length === 0) return null;

  return (
    <>
      <style>{`
        .jur-acc { border-top: 1px solid rgba(0,0,0,0.1); }
        .jur-acc details { border-bottom: 1px solid rgba(0,0,0,0.1); }
        .jur-acc summary { list-style: none; cursor: pointer; display: flex; gap: 16px; align-items: baseline; padding: 18px 0; }
        .jur-acc summary::-webkit-details-marker { display: none; }
        .jur-ref { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.06em; color: #1A47FF; min-width: 190px; }
        .jur-titre { font-family: var(--ff-body); font-size: 17px; font-weight: 500; flex: 1; letter-spacing: -0.01em; color: #1a1a1a; }
        .jur-plus { margin-left: auto; color: #6a6a6a; font-size: 20px; line-height: 1; flex-shrink: 0; }
        .jur-plus::after { content: "+"; }
        .jur-acc details[open] .jur-plus::after { content: "−"; color: #1A47FF; }
        .jur-body { padding: 0 0 20px 206px; }
        .jur-body p { font-size: 15px; color: #4a4a4a; line-height: 1.6; margin: 0; }
        .jur-note { margin: 22px 0 0; font-size: 14px; color: #6a6a6a; line-height: 1.6; max-width: 72ch; }
        @media (max-width: 760px) {
          .jur-acc summary { flex-wrap: wrap; gap: 6px 16px; }
          .jur-ref { min-width: 0; }
          .jur-body { padding-left: 0; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>
      <div className="jur-acc">
        {rendues.map((d) => (
          <details key={`${d.juridiction}-${d.date}-${d.reference}`}>
            <summary>
              <span className="jur-ref">
                {d.juridiction} · {d.date} · {d.reference}
              </span>
              <span className="jur-titre">{fr(d.intitule)}</span>
              <span className="jur-plus" aria-hidden />
            </summary>
            <div className="jur-body">
              <p>{fr(d.regle)}</p>
            </div>
          </details>
        ))}
      </div>
      {note ? <p className="jur-note">{fr(note)}</p> : null}
    </>
  );
}
