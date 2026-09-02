import type { ReactNode } from "react";

/*
 * Section « Contexte ». Refonte : le contenu (chiffres, sources, clôture) est
 * entièrement nouveau. La grille d'origine (texte / vidéo / citations) reposait
 * sur la colonne vidéo centrale et la colonne citations, toutes deux supprimées.
 * Nouvelle mise en page arbitrée : deux colonnes sur desktop (≥1024px) — colonne
 * éditoriale collante à gauche, blocs chiffrés + clôture à droite — et une
 * colonne unique resserrée sous lg (mobile / tablette).
 *
 * Nombres statiques (plus de count-up) : le formatage exact demandé (« 6 167 »,
 * « 486,8 M€ », unités en bleu) est ainsi garanti à tout instant.
 */

const BLUE = "#1A47FF";
const TXT = "#FFFFFF";
const TXT_SECOND = "#C5CBDE"; // légendes, ≥4,5:1 sur le fond navy
const TXT_SOURCE = "#7E8AA6"; // sources en mono, ton estompé (~5:1)

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
        <span style={{ color: BLUE }}>&nbsp;%</span>
      </>
    ),
    legend:
      "des entreprises interrogées estiment ne pas être suffisamment préparées face au risque cyber",
    source: "Cybermalveillance.gouv.fr — 2025, enquête TPE-PME",
  },
  {
    id: "assistance",
    // +73 % : intégralement en bleu.
    number: <span style={{ color: BLUE }}>+73&nbsp;%</span>,
    legend:
      "de demandes d'assistance émanant des entreprises et associations en un an",
    source: "Cybermalveillance.gouv.fr — 2025",
  },
  {
    id: "violations",
    // 6 167 : blanc.
    number: <span style={{ color: TXT }}>6&nbsp;167</span>,
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
        <span style={{ color: BLUE }}>&nbsp;M€</span>
      </>
    ),
    legend: "d'amendes prononcées en 83 sanctions",
    source: "CNIL — Rapport annuel 2025",
  },
];

const CLOSING_TEXT =
  "Cybersécurité, données, intelligence artificielle, plateformes, contrats : le risque numérique ne relève plus du seul service informatique. Il engage la conformité, la responsabilité et la continuité de l'entreprise.";

function StatBlock({ stat }: { stat: Stat }) {
  return (
    <div className="py-5 md:py-6">
      {/* `whitespace-nowrap` : le grand nombre et son unité restent sur une
          seule ligne, y compris à 360px. */}
      <p className="whitespace-nowrap font-mono text-[34px] font-bold leading-none tracking-tight sm:text-4xl md:text-5xl">
        {stat.number}
      </p>
      {/* Légende aussi lisible que le chiffre : couleur explicite, jamais d'opacity. */}
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: TXT_SECOND }}
      >
        {stat.legend}
      </p>
      <p
        className="mt-2 font-mono text-[10px] uppercase tracking-wide md:text-[11px]"
        style={{ color: TXT_SOURCE }}
      >
        {stat.source}
      </p>
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
              CONTEXTE · FRANCE 2026
            </p>
            <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-[40px] lg:leading-[1.15]">
              Le numérique est devenu un enjeu de gouvernance.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
              La menace se massifie.{" "}
              <span style={{ color: BLUE }}>La réglementation aussi.</span>
            </p>
          </div>

          {/* Colonne des chiffres + clôture. Filets horizontaux entre chaque
              bloc via `divide-y`. */}
          <div className="mt-8 lg:mt-0">
            <div className="divide-y divide-white/10">
              {STATS.map((stat) => (
                <StatBlock key={stat.id} stat={stat} />
              ))}
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
