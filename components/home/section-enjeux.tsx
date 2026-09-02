import type { ReactNode } from "react";

/*
 * Section « Contexte ». Deux colonnes sur desktop (≥1024px) — colonne
 * éditoriale collante à gauche, frise chiffrée + clôture à droite — et une
 * colonne unique resserrée sous lg.
 *
 * Les quatre chiffres forment une progression (entreprises non préparées →
 * incidents en hausse → données touchées → sanction) : une frise verticale
 * continue (filet + point à chaque bloc, blocs numérotés 01–04 en bleu),
 * calquée sur la frise horaire de la page cybercriminalité, la donne à voir.
 *
 * Séparateur des milliers et espace avant « % » / « M€ » : rendus par une
 * marge fine (`marginLeft`), pas par un caractère espace. La police des
 * chiffres est monospace : une espace, même fine insécable (U+202F), y occupe
 * une cellule pleine (~0,6em) et donne le rendu « cassé » d'un trou. La marge
 * (~0,15em) donne l'espace fine typographique, quelle que soit la police.
 */

const BLUE = "#1A47FF";
const TXT = "#FFFFFF";
const TXT_SECOND = "#C5CBDE"; // légendes, ≥4,5:1 sur le fond navy
const TXT_SOURCE = "#7E8AA6"; // sources en mono, ton estompé (~5:1)
const THIN = "0.16em"; // espace fine avant l'unité (%, M€)
const THIN_MILLE = "0.14em"; // espace fine des milliers

type Stat = {
  id: string;
  /** Le grand nombre, avec son unité colorée selon la règle du brief. */
  number: ReactNode;
  legend: string;
  source: string;
};

const STATS: Stat[] = [
  {
    id: "preparation",
    // 80 % : nombre blanc, unité bleue.
    number: (
      <>
        <span style={{ color: TXT }}>80</span>
        <span style={{ color: BLUE, marginLeft: THIN }}>%</span>
      </>
    ),
    legend:
      "des entreprises interrogées estiment ne pas être suffisamment préparées face au risque cyber",
    source: "Cybermalveillance.gouv.fr — 2025",
  },
  {
    id: "assistance",
    // +73 % : intégralement en bleu.
    number: (
      <span style={{ color: BLUE }}>
        +73<span style={{ marginLeft: THIN }}>%</span>
      </span>
    ),
    legend: "de demandes d'assistance émanant des professionnels en un an",
    source: "Cybermalveillance.gouv.fr — 2025",
  },
  {
    id: "violations",
    // 6 167 : blanc, séparateur de milliers en espace fine.
    number: (
      <span style={{ color: TXT }}>
        6<span style={{ marginLeft: THIN_MILLE }}>167</span>
      </span>
    ),
    legend:
      "violations de données personnelles notifiées à la CNIL, en hausse de 9,5 %",
    source: "CNIL — Rapport annuel 2025",
  },
  {
    id: "amendes",
    // 486,8 M€ : nombre blanc, unité bleue.
    number: (
      <>
        <span style={{ color: TXT }}>486,8</span>
        <span style={{ color: BLUE, marginLeft: THIN }}>M€</span>
      </>
    ),
    legend: "d'amendes prononcées en 83 sanctions",
    source: "CNIL — Rapport annuel 2025",
  },
];

const NOTE_MILLESIME = "DONNÉES PUBLIÉES EN 2026 · DERNIER EXERCICE DISPONIBLE";

const CLOSING_TEXT =
  "Cybersécurité, données, intelligence artificielle, plateformes, contrats : le risque numérique ne relève plus du seul service informatique. Il engage la conformité, la responsabilité et la continuité de l'entreprise.";

const SOURCE_CLASS =
  "font-mono text-[10px] uppercase tracking-wide md:text-[11px]";

function StatBlock({
  stat,
  index,
  isLast,
}: {
  stat: Stat;
  index: number;
  isLast: boolean;
}) {
  const numero = String(index + 1).padStart(2, "0");
  return (
    <div className="flex gap-4 md:gap-5">
      {/* Rail : point marqueur + segment de liaison → frise verticale continue. */}
      <div className="flex flex-col items-center" aria-hidden>
        <span
          className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: BLUE }}
        />
        {!isLast ? (
          <span
            className="mt-1.5 w-px grow"
            style={{ background: "rgba(255,255,255,0.14)", minHeight: "16px" }}
          />
        ) : null}
      </div>

      <div className={`flex-1 ${isLast ? "" : "pb-7 md:pb-8"}`}>
        <p
          className="mb-1.5 font-mono text-[11px] font-medium tracking-wide"
          style={{ color: BLUE }}
        >
          {numero}
        </p>
        {/* `whitespace-nowrap` : le grand nombre et son unité restent sur une
            seule ligne, y compris à 360px. */}
        <p className="whitespace-nowrap font-mono text-[34px] font-bold leading-none tracking-tight sm:text-4xl md:text-5xl">
          {stat.number}
        </p>
        {/* Légende aussi lisible que le chiffre : couleur explicite, jamais d'opacity. */}
        <p className="mt-2 text-sm leading-relaxed" style={{ color: TXT_SECOND }}>
          {stat.legend}
        </p>
        <p className={`mt-2 ${SOURCE_CLASS}`} style={{ color: TXT_SOURCE }}>
          {stat.source}
        </p>
      </div>
    </div>
  );
}

export function SectionEnjeux() {
  return (
    <section id="section-2" className="w-full">
      <div className="py-14 md:py-24" style={{ background: "#060912" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-8 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Colonne éditoriale — collante au scroll sur desktop. */}
          <div className="lg:sticky lg:top-[12vh] lg:self-start">
            <p
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ color: TXT_SECOND }}
            >
              CONTEXTE · FRANCE
            </p>
            <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-[40px] lg:leading-[1.15]">
              Le numérique est devenu un enjeu de gouvernance.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
              Ce n&apos;est plus un risque technique.{" "}
              <span style={{ color: BLUE }}>C&apos;est un risque juridique.</span>
            </p>
          </div>

          {/* Colonne de la frise chiffrée + clôture. */}
          <div className="mt-8 lg:mt-0">
            <div>
              {STATS.map((stat, index) => (
                <StatBlock
                  key={stat.id}
                  stat={stat}
                  index={index}
                  isLast={index === STATS.length - 1}
                />
              ))}

              {/* Millésime des données — aligné sur le texte des blocs (décalage
                  de la largeur du point + gouttière), même style que les sources. */}
              <div className="mt-3 flex gap-4 md:gap-5">
                <span className="w-2.5 shrink-0" aria-hidden />
                <p className={SOURCE_CLASS} style={{ color: TXT_SOURCE }}>
                  {NOTE_MILLESIME}
                </p>
              </div>
            </div>

            {/* Clôture éditoriale — encadré à filet vertical bleu, sans guillemets. */}
            <div
              className="mt-8 pl-4 md:pl-5"
              style={{ borderLeft: `2px solid ${BLUE}` }}
            >
              <p
                className="text-[14px] leading-relaxed md:text-[15px]"
                style={{ color: TXT_SECOND }}
              >
                {CLOSING_TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
