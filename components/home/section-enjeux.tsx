import type { ReactNode } from "react";

/*
 * Section « Contexte · France » — version compacte.
 *
 * Deux chiffres sourcés, présentés dans une bande Deep Navy arrondie qui
 * flotte sur le fond clair des sections voisines (Pourquoi nous, Études de
 * cas). Remplace l'ancienne frise à quatre chiffres, la vidéo et la colonne
 * de citations : l'essentiel — l'ampleur du risque, deux sources publiques —
 * en un seul regard.
 *
 * Les chiffres sont statiques (aucun compteur animé n'existait à conserver).
 * Rien ne s'anime ici : la préférence « prefers-reduced-motion » n'a donc
 * aucune animation à neutraliser.
 *
 * Palette limitée aux valeurs de la charte pour cette bande :
 *  #0A0F2E fond · #4D6FFF chiffres · #8888A0 sur-titre et sources ·
 *  #E4E4F0 libellés · #B8B8CE clôture · filets #2A2F52 / #3A3F62.
 *
 * L'espace fine des milliers et l'espace avant « % » sont rendus par une
 * espace fine insécable (U+202F) : la police des chiffres (Bebas Neue) n'est
 * pas monospace, elle rend donc cette espace à sa juste chasse.
 */

const NAVY = "#0A0F2E";
const NUM = "#4D6FFF"; // chiffres — bleu clair, lisible sur le navy
const KICKER = "#8888A0"; // sur-titre + sources
const LABEL = "#E4E4F0"; // libellés des chiffres
const CLOSING = "#B8B8CE"; // phrase de clôture
const RULE = "#2A2F52"; // filet sous la grille
const SRC_RULE = "#3A3F62"; // soulignement des liens sources

const DISPLAY = "var(--ff-display)"; // Bebas Neue
const BODY = "var(--ff-body)"; // Space Grotesk
const MONO = "var(--ff-mono)"; // DM Mono

type Stat = {
  number: ReactNode;
  label: string;
  source: string;
  href: string;
};

const STATS: Stat[] = [
  {
    // +73 % — espace fine avant l'unité.
    number: <>+73{" "}%</>,
    label:
      "de demandes d'assistance émanant des entreprises et associations en un an",
    source: "Cybermalveillance.gouv.fr — Rapport d'activité 2025",
    href: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/rapport-activite-2025",
  },
  {
    // 6 167 — espace fine des milliers.
    number: <>6{" "}167</>,
    label:
      "violations de données personnelles notifiées à la CNIL, en hausse de 9,5 %",
    source: "CNIL — Rapport annuel 2025",
    href: "https://www.cnil.fr/fr/rapport-annuel-2025",
  },
];

const CLOSING_TEXT =
  "Cyberattaque, données, intelligence artificielle ou défaillance d'un prestataire : le risque numérique engage désormais la conformité, la responsabilité et la continuité de l'entreprise.";

export function SectionEnjeux() {
  return (
    <section id="section-2" className="w-full" style={{ background: "#F8F9FA" }}>
      <style>{`
        .ctx-source { transition: color 0.2s ease; }
        .ctx-source:hover, .ctx-source:focus-visible { color: #C7CADB; }
      `}</style>
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
        <div
          style={{
            background: NAVY,
            borderRadius: 12,
            padding: "2.25rem 2rem 2rem",
            fontFamily: BODY,
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.22em",
              color: KICKER,
              margin: "0 0 14px",
            }}
          >
            CONTEXTE · FRANCE
          </p>

          <h2
            style={{
              fontFamily: BODY,
              fontWeight: 400,
              fontSize: 25,
              lineHeight: 1.3,
              color: "#FFFFFF",
              maxWidth: "30ch",
              margin: "0 0 2rem",
            }}
          >
            Le risque numérique est devenu un enjeu de gouvernance.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
              paddingBottom: "1.75rem",
              borderBottom: `0.5px solid ${RULE}`,
            }}
          >
            {STATS.map((stat) => (
              <div key={stat.source}>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 58,
                    lineHeight: 0.95,
                    letterSpacing: "0.01em",
                    color: NUM,
                    whiteSpace: "nowrap",
                  }}
                >
                  {stat.number}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: LABEL,
                    margin: "10px 0 8px",
                    maxWidth: "30ch",
                  }}
                >
                  {stat.label}
                </p>
                <a
                  className="ctx-source"
                  href={stat.href}
                  target="_blank"
                  rel="noopener"
                  style={{
                    display: "inline-block",
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: KICKER,
                    textDecoration: "none",
                    borderBottom: `0.5px solid ${SRC_RULE}`,
                    paddingBottom: 1,
                  }}
                >
                  {stat.source} ↗
                </a>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: BODY,
              fontSize: 15.5,
              lineHeight: 1.65,
              color: CLOSING,
              maxWidth: "62ch",
              margin: "1.5rem 0 0",
            }}
          >
            {CLOSING_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}
