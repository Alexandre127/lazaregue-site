"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Les sept livrables (maquette V9, section 8) — ouverture contextuelle sous la
 * ligne, un seul aperçu ouvert à la fois. Vrais <button>, aria-expanded /
 * aria-controls, libellés portés par data-label-open / data-label-close (jamais
 * reconstruits par concaténation). Indice de défilement affiché seulement si un
 * mini-tableau déborde réellement.
 *
 * CONTENU DES EXTRAITS : repris VERBATIM de la page IA en production (§7.1),
 * sans réécriture ni reconstruction. Les encadrés « Emplacement de travail » ont
 * disparu (les extraits réels sont raccordés).
 */

// Facsimilé de document — palette du document repris (texte non-charte assumé,
// c'est un fac-similé anonymisé, pas du corps de page).
const DOC = {
  panel2: "#f1f1ee",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
};
const ACCENT = "#1A47FF";

function B({ children }: { children: ReactNode }) {
  return <strong style={{ fontWeight: 600, color: DOC.text }}>{children}</strong>;
}

function KeyVals({ rows }: { rows: [string, string][] }) {
  return (
    <div>
      {rows.map(([k, v], i) => (
        <div
          key={k}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            padding: "5px 0",
            borderBottom: i < rows.length - 1 ? "0.5px solid #EDEDEA" : "none",
          }}
        >
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: DOC.faint }}>{k}</span>
          <span style={{ fontSize: 13, color: DOC.text, textAlign: "right" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function Analyse({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ background: DOC.panel2, borderLeft: `2px solid ${ACCENT}`, padding: "10px 11px", marginTop: 11 }}>
      <p style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: ACCENT, margin: "0 0 5px", letterSpacing: ".05em", textTransform: "uppercase" }}>{label}</p>
      <p style={{ fontSize: 13.5, color: DOC.muted, margin: 0, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

function Takeaway({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div style={{ background: "#F7F7F5", padding: "9px 11px", marginTop: 9 }}>
      <p style={{ fontSize: 13, color: DOC.muted, margin: 0, lineHeight: 1.55 }}>
        <strong style={{ color: DOC.text, fontWeight: 600 }}>{titre}</strong> {children}
      </p>
    </div>
  );
}

type Card = { type: string; h3: string; label: string; body: ReactNode };
type Livrable = { nom: string; donne: string; labelOpen: string; labelClose: string; cards: Card[] };

const LIVRABLES: Livrable[] = [
  {
    nom: "Cartographie des usages",
    donne: "Les outils réellement utilisés, leurs responsables, les données concernées.",
    labelOpen: "Voir un aperçu de la cartographie des usages",
    labelClose: "Fermer l’aperçu de la cartographie des usages",
    cards: [
      {
        type: "Cartographie des usages IA",
        h3: "Les outils réellement utilisés",
        label: "Exemple anonymisé — entreprise de services, une cinquantaine de salariés · extrait : 6 lignes sur 14 recensées",
        body: (
          <div>
            <div style={{ overflowX: "auto" }}>
              <table className="mini" style={{ minWidth: 620 }}>
                <thead>
                  <tr>
                    {["#", "Outil", "Origine", "Service", "Données en entrée", "Validé", "Rôle présumé"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "Assistant de rédaction généraliste", "abonnement éditeur", "Direction, commerce", "courriels, notes de réunion, projets de contrats", "oui", "déployeur"],
                    ["2", "Tri de candidatures", "module du SIRH", "RH", "CV, lettres, historiques de candidature", "oui", "déployeur"],
                    ["3", "Assistant de code", "extension installée par l'équipe", "IT", "code source, identifiants présents dans les extraits", "non", "déployeur"],
                    ["4", "Générateur d'images", "compte gratuit personnel", "Marketing", "briefs, visuels clients", "non", "déployeur"],
                    ["5", "Transcription de réunions", "connecteur visio activé par défaut", "toute l'entreprise", "enregistrements, voix des participants", "non", "déployeur"],
                    ["6", "Chatbot du site", "développé par un prestataire, diffusé sous la marque", "Marketing", "questions clients, adresses électroniques", "oui", "fournisseur présumé"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={row[0] === "6" && ci === 6 ? { fontWeight: 600 } : undefined}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Analyse label="Analyse">
              Cinq des quatorze systèmes recensés n’ont fait l’objet d’aucune validation. Trois traitent des données de personnes qui ignorent le traitement : candidats, participants aux réunions, visiteurs du site. Le chatbot est le seul système sur lequel l’entreprise est susceptible d’être fournisseur, parce qu’il est diffusé sous sa marque. C’est la ligne à qualifier en premier, non la plus visible mais la plus lourde de conséquences.
            </Analyse>
            <Takeaway titre="Ce que la cartographie révèle.">
              Les usages informels ne se déclarent pas : ils se trouvent dans les factures, les extensions de navigateur et les connecteurs activés par défaut. Un inventaire fondé sur les seules déclarations des services manque l’essentiel.
            </Takeaway>
          </div>
        ),
      },
    ],
  },
  {
    nom: "Registre des systèmes",
    donne: "Le rôle que vous tenez sur chaque système et le régime qui en découle.",
    labelOpen: "Voir un aperçu du registre des systèmes",
    labelClose: "Fermer l’aperçu du registre des systèmes",
    cards: [
      {
        type: "Registre des systèmes d’IA",
        h3: "Inventaire des systèmes IA",
        label: "Exemple anonymisé — entreprise de services, une cinquantaine de salariés",
        body: (
          <div>
            <KeyVals
              rows={[
                ["Système n° 3", "Tri de candidatures"],
                ["Rôle tenu", "Déployeur"],
                ["Mise en service", "Antérieure à déc. 2027"],
                ["Régime applicable", "Transitoire — art. 111"],
              ]}
            />
            <Analyse label="Analyse technique — N. Abchiche-Mimouni">
              Le score renvoyé n’est pas un simple classement : il pondère des variables corrélées à l’ancienneté du diplôme. La reprise humaine existe mais n’est pas tracée. Une modification du paramétrage constituerait vraisemblablement une modification importante au sens du règlement.
            </Analyse>
            <Takeaway titre="Ce que ce champ change.">
              La date de mise en service commande le régime applicable autant que la qualification — et une modification importante le fait basculer.
            </Takeaway>
          </div>
        ),
      },
    ],
  },
  {
    nom: "Matrice des risques",
    donne: "Ce qui est dû aujourd’hui, ce qui est reporté, dans quel ordre traiter.",
    labelOpen: "Voir un aperçu de la matrice des risques",
    labelClose: "Fermer l’aperçu de la matrice des risques",
    cards: [
      {
        type: "Matrice des risques",
        h3: "Risques prioritaires identifiés",
        label: "Exemple anonymisé — fintech de crédit",
        body: (
          <div>
            <KeyVals
              rows={[
                ["Rôle tenu non documenté", "Exigible aujourd’hui"],
                ["Information des personnes concernées", "Exigible aujourd’hui"],
                ["Paramétrage modifié sans qualification", "À qualifier sans délai"],
                ["Classement haut risque — annexe III", "À préparer · déc. 2027"],
              ]}
            />
            <Analyse label="Analyse — priorisation">
              Deux risques sont déjà exigibles : documenter le rôle tenu et informer les personnes concernées. Le classement haut risque n’est opposable qu’en décembre 2027 — il se prépare, il ne se traite pas dans l’urgence.
            </Analyse>
            <Takeaway titre="Ce que la matrice hiérarchise.">
              Ce qui est dû aujourd’hui, ce qui est reporté, et le paramétrage non qualifié qui peut faire tomber le régime allégé.
            </Takeaway>
          </div>
        ),
      },
    ],
  },
  {
    nom: "Documentation technique",
    donne: "Le dossier que vous devez pouvoir produire à la demande.",
    labelOpen: "Voir un aperçu de la documentation technique",
    labelClose: "Fermer l’aperçu de la documentation technique",
    cards: [
      {
        type: "Documentation technique Art. 11",
        h3: "Notice technique du système IA",
        label: "Exemple anonymisé — SaaS médical",
        body: (
          <p style={{ margin: 0 }}>
            <B>§3.2 — Supervision humaine</B>. Le système ne produit pas de diagnostic. Il génère une suggestion d’orientation que le praticien valide ou écarte. Toute décision finale est tracée dans le dossier patient sous la responsabilité du médecin. Aucune décision automatisée au sens de l’<B>Art. 22 RGPD</B>.
          </p>
        ),
      },
      {
        type: "Notice utilisateur Art. 13",
        h3: "Transparence envers les utilisateurs",
        label: "Exemple anonymisé — chatbot d’assureur",
        body: (
          <p style={{ margin: 0 }}>
            Vous interagissez avec un système d’<B>intelligence artificielle</B>. Les réponses fournies sont générées automatiquement et ne constituent pas un conseil personnalisé. Vous pouvez demander à être mis en relation avec un conseiller humain à tout moment en tapant <B>&apos;Conseiller&apos;</B>.
          </p>
        ),
      },
    ],
  },
  {
    nom: "Charte IA et procédures",
    donne: "Des règles utilisables par les équipes, pas un document de principe.",
    labelOpen: "Voir un aperçu de la charte IA et des procédures",
    labelClose: "Fermer l’aperçu de la charte IA et des procédures",
    cards: [
      {
        type: "Charte IA interne",
        h3: "Politique d’usage de l’IA",
        label: "Exemple anonymisé — ETI industrielle",
        body: (
          <p style={{ margin: 0 }}>
            <B>Art. 5 — Données interdites</B>. Il est interdit d’injecter dans tout outil IA : données de santé des salariés, documents couverts par le secret des affaires, données clients non anonymisées, évaluations individuelles. Tout usage non conforme déclenche une <B>procédure disciplinaire</B>.
          </p>
        ),
      },
      {
        type: "Comité IA",
        h3: "Gouvernance et circuit de décision",
        label: "Exemple anonymisé — cabinet de conseil",
        body: (
          <p style={{ margin: 0 }}>
            Tout déploiement d’un nouveau système IA est soumis à validation du <B>Comité IA</B> (DG + DPO + DSI) avant mise en production. Délai de traitement : <B>15 jours ouvrés</B>. Les systèmes à haut risque requièrent en outre une évaluation de conformité et une information préalable du <B>CSE</B> si impact sur les conditions de travail.
          </p>
        ),
      },
    ],
  },
  {
    nom: "Clauses contractuelles",
    donne: "La répartition des engagements avec vos prestataires.",
    labelOpen: "Voir un aperçu des clauses contractuelles",
    labelClose: "Fermer l’aperçu des clauses contractuelles",
    cards: [
      {
        type: "Clause fournisseur IA",
        h3: "Encadrement des API et SaaS IA",
        label: "Exemple anonymisé — clause type pour un contrat d’API",
        body: (
          <p style={{ margin: 0 }}>
            <B>Art. 9.3</B> — Le fournisseur garantit que le modèle utilisé n’est pas classé à haut risque au sens de l’<B>Annexe III</B> du Règlement IA pour les usages couverts par le présent contrat. Il s’engage à notifier le client dans un délai de <B>5 jours ouvrés</B> de toute modification susceptible de modifier cette qualification.
          </p>
        ),
      },
      {
        type: "Clause CGV éditeur SaaS",
        h3: "Responsabilité et limites de l’automatisation",
        label: "Exemple anonymisé — CGV d’un éditeur SaaS",
        body: (
          <p style={{ margin: 0 }}>
            Les résultats produits par le système constituent des propositions soumises à validation de l’utilisateur. LogiCompta IA ne se substitue pas au professionnel qualifié. La décision finale et la responsabilité de son exécution incombent exclusivement à l’utilisateur, conformément à l’arrêt <B>CA Lyon, 13 mai 2025</B>.
          </p>
        ),
      },
    ],
  },
  {
    nom: "Procédure d’incident et défense",
    donne: "Qui fait quoi le jour où le sujet est contesté.",
    labelOpen: "Voir un aperçu de la procédure d’incident et de défense",
    labelClose: "Fermer l’aperçu de la procédure d’incident et de défense",
    cards: [
      {
        type: "Procédure incident IA",
        h3: "Gestion d’un incident algorithmique",
        label: "Exemple anonymisé — outil RH de présélection",
        body: (
          <p style={{ margin: 0 }}>
            Incident détecté : biais systématique dans le scoring de candidats. <B>H+0</B> : suspension immédiate des décisions automatisées. <B>H+4</B> : information du DPO et du DRH. <B>H+24</B> : qualification juridique par l’avocat — <B>AI Act</B> + <B>RGPD</B> + droit du travail. <B>H+48</B> : décision sur obligation de notification <B>CNIL</B> et information du <B>CSE</B>.
          </p>
        ),
      },
      {
        type: "Stratégie de défense",
        h3: "Réponse à un contrôle autorité",
        label: "Exemple anonymisé — dossier de contrôle CNIL",
        body: (
          <p style={{ margin: 0 }}>
            Face à la demande de justification du système de scoring client : production du registre IA (système qualifié risque limité, non haut risque), de la notice utilisateur <B>Art. 13</B> (information sur l’automatisation), et du journal de <B>supervision humaine</B> démontrant qu’aucune décision n’a été prise sans validation.
          </p>
        ),
      },
    ],
  },
];

export function LivrablesPreview() {
  const [open, setOpen] = useState<number | null>(null);
  const rootRef = useRef<HTMLTableSectionElement>(null);

  // Indice de défilement : visible seulement si un mini-tableau déborde.
  useEffect(() => {
    const sync = () => {
      rootRef.current?.querySelectorAll<HTMLElement>(".preview-scroll").forEach((box) => {
        const hint = box.previousElementSibling;
        if (hint && hint.classList.contains("scroll-hint")) {
          hint.classList.toggle("is-visible", box.scrollWidth > box.clientWidth + 2);
        }
      });
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [open]);

  return (
    <div className="preview-scroll-wrap">
      <table className="tbl deliverables">
        <caption>Documents produits selon le périmètre de la mission. Extraits inspirés de dossiers réels.</caption>
        <thead>
          <tr>
            <th scope="col">Livrable</th>
            <th scope="col">Ce qu’il vous donne</th>
            <th scope="col">Aperçu</th>
          </tr>
        </thead>
        <tbody ref={rootRef}>
          {LIVRABLES.map((l, i) => {
            const isOpen = open === i;
            const panelId = `ap-${i + 1}`;
            return (
              <Fragment key={l.nom}>
                <tr>
                  <td>{l.nom}</td>
                  <td data-prefix="Ce qu’il vous donne — ">{l.donne}</td>
                  <td className="act">
                    <button
                      className="see"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-label={isOpen ? l.labelClose : l.labelOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {isOpen ? "Fermer l’aperçu" : "Voir →"}
                    </button>
                  </td>
                </tr>
                <tr className="preview-row" id={panelId} hidden={!isOpen}>
                  <td colSpan={3}>
                    <div className="preview">
                      {l.cards.map((c, ci) => (
                        <div key={ci} className={ci > 0 ? "preview-card preview-card--next" : "preview-card"}>
                          <span className="anon">{c.label}</span>
                          <h3>{c.h3}</h3>
                          <p className="ctx">{c.type}</p>
                          <p className="scroll-hint">Faire défiler le tableau horizontalement</p>
                          <div className="preview-scroll">{c.body}</div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
