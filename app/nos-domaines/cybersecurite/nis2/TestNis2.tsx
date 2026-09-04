"use client";

import Link from "next/link";
import { useState } from "react";

const BLUE = "#1A47FF";
const LIGHT = {
  panel: "#ffffff",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
};

type Question = {
  q: string;
  aide: string;
  /** Réponse qui rapproche l'utilisateur d'une exposition NIS 2 */
  exposeSi: boolean;
};

const QUESTIONS: Question[] = [
  {
    q: "Votre client exerce-t-il dans un secteur critique ?",
    aide: "Énergie, eau, transports, santé, banque, infrastructure numérique, administrations publiques, industrie critique. Si oui, il est probablement une entité essentielle ou importante au sens de NIS 2.",
    exposeSi: true,
  },
  {
    q: "Vos services lui sont-ils indispensables ?",
    aide: "Hébergement, cloud, infogérance, maintenance, SaaS, développement, télécoms. La directive analyse le niveau de dépendance à vos services, le caractère critique de vos systèmes, et l'absence d'alternative.",
    exposeSi: true,
  },
  {
    q: "Disposez-vous d'une documentation de conformité NIS 2 ?",
    aide: "Politique de sécurité des systèmes d'information, gestion des incidents, plan de continuité d'activité, preuves de formation, audits. Comme pour le RGPD, la conformité NIS 2 se démontre — elle ne se déclare pas.",
    exposeSi: false,
  },
];

/** Diagnostic rendu à la fin, selon le nombre de signaux d'exposition. */
function diagnostic(signaux: number) {
  if (signaux === 3)
    return {
      titre: "Vous êtes exposé, et sans documentation à opposer",
      texte:
        "Vous intervenez dans la chaîne d'approvisionnement d'un acteur critique et ne disposez pas des preuves qu'un client — ou son assureur — peut exiger à tout moment. C'est la situation qui fait perdre un référencement.",
      ton: "alerte" as const,
    };
  if (signaux === 2)
    return {
      titre: "Vous êtes probablement dans le périmètre",
      texte:
        "Deux signaux sur trois indiquent une exposition. Le point à trancher est le niveau réel de dépendance de votre client à vos services, et ce que vos contrats vous engagent déjà à garantir.",
      ton: "attention" as const,
    };
  if (signaux === 1)
    return {
      titre: "Exposition possible, à vérifier",
      texte:
        "Un seul signal ressort. NIS 2 peut malgré tout vous atteindre par voie contractuelle : un client soumis à la directive répercute ses obligations sur ses fournisseurs, même non assujettis.",
      ton: "attention" as const,
    };
  return {
    titre: "Exposition directe peu probable",
    texte:
      "Aucun signal ne ressort de ce test. Restez attentif : un nouveau client dans un secteur critique, ou un questionnaire cybersécurité reçu en cours de contrat, peut changer la donne du jour au lendemain.",
    ton: "ok" as const,
  };
}

const TONS = {
  alerte: { fond: "#FCEBEB", bord: "#F09595", texte: "#A32D2D" },
  attention: { fond: "#FAEEDA", bord: "#E4C48A", texte: "#633806" },
  ok: { fond: "#E1F5EE", bord: "#9AD5C2", texte: "#085041" },
};

/**
 * Test d'exposition NIS 2 — trois questions, un diagnostic.
 *
 * Remplace la liste statique : l'utilisateur répond par oui ou non et obtient
 * une lecture de sa situation. Aucune donnée n'est transmise ni conservée :
 * tout est calculé dans le navigateur.
 */
export default function TestNis2() {
  const [reponses, setReponses] = useState<(boolean | null)[]>([null, null, null]);

  const repondre = (i: number, valeur: boolean) =>
    setReponses((r) => r.map((v, j) => (j === i ? valeur : v)));

  const complet = reponses.every((r) => r !== null);
  const signaux = reponses.filter(
    (r, i) => r !== null && r === QUESTIONS[i].exposeSi,
  ).length;
  const d = complet ? diagnostic(signaux) : null;
  const ton = d ? TONS[d.ton] : null;

  return (
    <div className="flex flex-col gap-3">
      {QUESTIONS.map((item, i) => {
        const rep = reponses[i];
        return (
          <div
            key={item.q}
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: "16px 20px",
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: LIGHT.text,
                margin: "0 0 6px",
              }}
            >
              <span style={{ color: BLUE, fontFamily: "var(--ff-mono)", fontSize: 12 }}>
                {i + 1} —{" "}
              </span>
              {item.q}
            </p>
            <p
              style={{
                fontSize: 13,
                color: LIGHT.muted,
                lineHeight: 1.6,
                margin: "0 0 12px",
              }}
            >
              {item.aide}
            </p>

            <div
              role="group"
              aria-label={item.q}
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              {[true, false].map((valeur) => {
                const actif = rep === valeur;
                return (
                  <button
                    key={String(valeur)}
                    type="button"
                    onClick={() => repondre(i, valeur)}
                    aria-pressed={actif}
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "8px 20px",
                      borderRadius: 8,
                      cursor: "pointer",
                      border: `1px solid ${actif ? BLUE : LIGHT.border}`,
                      background: actif ? BLUE : "transparent",
                      color: actif ? "#fff" : LIGHT.faint,
                      transition: "background .15s, border-color .15s, color .15s",
                    }}
                  >
                    {valeur ? "Oui" : "Non"}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Diagnostic */}
      {complet && d && ton ? (
        <div
          role="status"
          style={{
            background: ton.fond,
            border: `1px solid ${ton.bord}`,
            borderRadius: 12,
            padding: "20px 22px",
            marginTop: 4,
          }}
        >
          <p
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: ton.texte,
              margin: "0 0 8px",
            }}
          >
            Votre diagnostic
          </p>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: LIGHT.text,
              lineHeight: 1.35,
              margin: "0 0 8px",
            }}
          >
            {d.titre}
          </p>
          <p
            style={{
              fontSize: 13.5,
              color: LIGHT.muted,
              lineHeight: 1.7,
              margin: "0 0 16px",
              maxWidth: "62ch",
            }}
          >
            {d.texte}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                background: BLUE,
                color: "#fff",
                padding: "12px 22px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Diagnostiquer mon exposition NIS 2 →
            </Link>
            <button
              type="button"
              onClick={() => setReponses([null, null, null])}
              style={{
                background: "transparent",
                border: `1px solid ${LIGHT.border}`,
                color: LIGHT.faint,
                padding: "12px 22px",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Recommencer
            </button>
          </div>
          <p
            style={{
              fontSize: 11,
              color: LIGHT.faint,
              margin: "14px 0 0",
              lineHeight: 1.6,
            }}
          >
            Ce test donne une première orientation. Il ne constitue pas une consultation
            juridique et ne préjuge pas de la qualification retenue par l&apos;autorité
            compétente. Aucune réponse n&apos;est transmise ni conservée.
          </p>
        </div>
      ) : (
        <p
          style={{
            fontSize: 12,
            color: LIGHT.faint,
            fontFamily: "var(--ff-mono)",
            letterSpacing: "0.04em",
            margin: "4px 0 0",
          }}
        >
          Répondez aux trois questions pour obtenir votre diagnostic.
        </p>
      )}
    </div>
  );
}
