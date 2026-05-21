"use client";

import { useCallback, useEffect, useState } from "react";

type CasCard = {
  number: string;
  tag: string;
  tagClass: string;
  title: string;
  description: string;
  frontBg: string;
  backBg: string;
  dotColor: string;
  results: string[];
};

const CASE_CARDS: CasCard[] = [
  {
    number: "01 / 03",
    tag: "Incident & crise",
    tagClass: "bg-[#E24B4A]/15 text-[#F09595]",
    title: "Une industrie paralysée après un piratage",
    description:
      "Une industrie a vu sa messagerie piratée. La production s'est arrêtée, des données clients et des fiches RH ont été volées, et le prestataire informatique était directement responsable.",
    frontBg: "#FDE8E8",
    backBg: "#1a2744",
    dotColor: "#6a90cc",
    results: [
      "Coordination de la réponse à l'incident avec les experts techniques",
      "Obligations de notification auprès de la CNIL respectées dans les délais",
      "Responsabilité du prestataire informatique engagée",
    ],
  },
  {
    number: "02 / 03",
    tag: "Intelligence artificielle",
    tagClass: "bg-[#1D9E75]/10 text-[#0F6E56]",
    title: "Mise en conformité d'une entreprise IA avant une levée de fonds",
    description:
      "Une entreprise développait des logiciels d'IA pour les ressources humaines. Avant une levée de fonds, ses investisseurs ont exigé une mise en conformité complète avec les nouvelles réglementations européennes sur l'IA.",
    frontBg: "#E8F5F0",
    backBg: "#0e5c44",
    dotColor: "#5dc9a0",
    results: [
      "Gouvernance juridique des systèmes d'IA documentée",
      "Contrats avec les fournisseurs cloud mis à niveau",
      "Levée de fonds conclue dans les délais",
    ],
  },
  {
    number: "03 / 03",
    tag: "Violation de données",
    tagClass: "bg-[#1A47FF]/15 text-[#6D8FFF]",
    title: "Fuite massive de données clients chez un site de vente en ligne",
    description:
      "Un site de vente en ligne a découvert que les données personnelles de plusieurs centaines de milliers de clients avaient été volées chez un sous-traitant et revendues sur des forums illicites. La CNIL a ouvert une enquête.",
    frontBg: "#E8EEFF",
    backBg: "#1845c0",
    dotColor: "#80aaff",
    results: [
      "Notification pilotée dans le respect des délais",
      "Responsabilité du sous-traitant engagée",
      "Risques d'action collective anticipés",
    ],
  },
];

function CasFlipCard({
  card,
  flipped,
  onToggle,
  hoverFlipEnabled,
}: {
  card: CasCard;
  flipped: boolean;
  onToggle: () => void;
  hoverFlipEnabled: boolean;
}) {
  return (
    <div
      className={`cas-flip w-full ${flipped ? "cas-flip--flipped" : ""}`}
      onClick={hoverFlipEnabled ? undefined : onToggle}
      onKeyDown={
        hoverFlipEnabled
          ? undefined
          : (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle();
              }
            }
      }
      role={hoverFlipEnabled ? undefined : "button"}
      tabIndex={hoverFlipEnabled ? undefined : 0}
      aria-label={hoverFlipEnabled ? undefined : `Retourner la carte : ${card.title}`}
    >
      <div className="cas-flip-inner">
        <div
          className="cas-flip-face cas-flip-front flex flex-col border-[0.5px] border-[rgba(10,15,46,0.12)]"
          style={{ backgroundColor: card.frontBg }}
        >
          <p className="mb-3 font-mono text-[11px] tracking-widest text-[#0A0F2E]/25">
            {card.number}
          </p>
          <span
            className={`mb-4 inline-block w-fit rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${card.tagClass}`}
          >
            {card.tag}
          </span>
          <h3 className="mb-3 text-[14px] font-medium leading-snug text-[#0A0F2E]">
            {card.title}
          </h3>
          <p className="flex-1 text-[12px] leading-relaxed text-[#55556A]">
            {card.description}
          </p>
          <div className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] text-[#8888A0]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M6 1v10M1 6l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="md:hidden">Appuyer pour voir les résultats</span>
            <span className="hidden md:inline">Survoler pour voir les résultats</span>
          </div>
        </div>

        <div
          className="cas-flip-face cas-flip-back flex flex-col text-white"
          style={{ backgroundColor: card.backBg }}
        >
          <span className="mb-4 inline-block w-fit rounded-sm bg-white/15 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/90">
            Résultats
          </span>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-wider text-white/50">
            Ce que le cabinet a fait
          </p>
          <ul className="space-y-3">
            {card.results.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12px] leading-relaxed text-white/85"
              >
                <span
                  className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full"
                  style={{ backgroundColor: card.dotColor }}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SectionCas() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [canHoverFlip, setCanHoverFlip] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const update = () => setCanHoverFlip(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleToggle = useCallback(
    (index: number) => {
      if (canHoverFlip) return;
      setFlippedIndex((prev) => (prev === index ? null : index));
    },
    [canHoverFlip],
  );

  return (
    <section className="bg-[#F4F4F8]">
      <style>{`
        .cas-flip {
          perspective: 1000px;
          height: 300px;
          cursor: default;
        }
        .cas-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cas-flip-face {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 22px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .cas-flip-back {
          transform: rotateY(180deg);
        }
        @media (hover: hover) and (min-width: 768px) {
          .cas-flip:hover .cas-flip-inner {
            transform: rotateY(180deg);
          }
        }
        .cas-flip--flipped .cas-flip-inner {
          transform: rotateY(180deg);
        }
        @media (max-width: 767px) {
          .cas-flip {
            cursor: pointer;
          }
        }
      `}</style>

      <div className="px-4 py-10 md:px-8 md:py-16 lg:px-12">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#8888A0]">
          Études de cas
        </p>

        <h2 className="mb-2 text-[22px] font-medium leading-snug text-[#0A0F2E]">
          Ce que nous faisons,
          <br />
          dans la pratique.
        </h2>

        <p className="mb-7 text-[13px] text-[#8888A0]">
          Les noms sont anonymisés, les situations sont réelles.
        </p>

        <div className="mx-auto grid max-w-[600px] grid-cols-1 gap-4 md:max-w-none md:grid-cols-3">
          {CASE_CARDS.map((card, index) => (
            <CasFlipCard
              key={card.number}
              card={card}
              flipped={flippedIndex === index}
              onToggle={() => handleToggle(index)}
              hoverFlipEnabled={canHoverFlip}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
