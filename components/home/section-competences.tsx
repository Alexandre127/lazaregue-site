"use client";

import React, { useEffect, useRef } from "react";

type CompetenceCard = {
  id: number;
  gridRgb: string;
  icon: string;
  color: string;
  bg: string;
  title: string;
  phrase: string;
  tags: string[];
  tagColor: string;
  tagText: string;
};

function CardGridCanvas({ gridRgb }: { gridRgb: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const step = 32;
    startRef.current = performance.now();

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      const elapsed = (time - startRef.current) / 1000;
      const alpha = (Math.sin(elapsed * 0.8) * 0.5 + 0.5) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = `rgba(${gridRgb}, ${alpha})`;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [gridRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}

function CardShimmer({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sh = ref.current;
    if (!sh) return;

    let intervalId: ReturnType<typeof setInterval>;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const go = () => {
      sh.style.transition = "none";
      sh.style.transform = "translateX(-160%)";
      sh.style.opacity = "1";

      t1 = setTimeout(() => {
        sh.style.transition = "transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        sh.style.transform = "translateX(160%)";
      }, 50);

      t2 = setTimeout(() => {
        sh.style.opacity = "0";
      }, 960);
    };

    const startId = setTimeout(() => {
      go();
      intervalId = setInterval(go, 4000 + index * 600);
    }, 800 + index * 700);

    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index]);

  return <div ref={ref} className="card-shimmer" aria-hidden />;
}

function CompetenceCardIcon({ name, color }: { name: string; color: string }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "shield-lock":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 11v4" />
          <path d="M9 11h6" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...common}>
          <path d="M14 13l-8.5 8.5a2.12 2.12 0 103 3L17 16" />
          <path d="m16 6 4 4" />
          <path d="m7.5 10.5 9-9" />
          <path d="m19 12 1 1" />
          <path d="M2 21h8" />
        </svg>
      );
    case "robot":
      return (
        <svg {...common}>
          <rect x="5" y="9" width="14" height="12" rx="2" />
          <path d="M9 9V7a3 3 0 016 0v2" />
          <circle cx="9.5" cy="14" r="1" fill={color} stroke="none" />
          <circle cx="14.5" cy="14" r="1" fill={color} stroke="none" />
          <path d="M9 18h6" />
          <path d="M12 2v2" />
        </svg>
      );
    case "message-circle":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

const cards: CompetenceCard[] = [
  {
    id: 1,
    gridRgb: "26,71,255",
    icon: "shield-lock",
    color: "#4D6FFF",
    bg: "linear-gradient(135deg, #0a0f1e 0%, #0e1530 50%, #0a0f1e 100%)",
    title: "Cybercrises & incidents numériques",
    phrase:
      "Anticiper, gérer et contenir les incidents cyber susceptibles d'interrompre l'activité et d'affecter durablement l'entreprise.",
    tags: [
      "CYBERSÉCURITÉ & NIS 2",
      "CYBERCRIMINALITÉ & FRAUDES",
      "GESTION DE CRISE",
    ],
    tagColor: "rgba(26,71,255,.12)",
    tagText: "#6D8FFF",
  },
  {
    id: 2,
    gridRgb: "226,75,74",
    icon: "gavel",
    color: "#F09595",
    bg: "linear-gradient(135deg, #1a0808 0%, #1e0c10 50%, #1a0808 100%)",
    title: "Conflits IT & projets bloqués",
    phrase:
      "Résoudre les situations de blocage liées aux projets numériques, aux prestataires technologiques et aux infrastructures critiques.",
    tags: [
      "CONTENTIEUX INFORMATIQUE",
      "CONTRATS TECH & SAAS",
      "AUDIT TECHNOLOGIQUE",
    ],
    tagColor: "rgba(226,75,74,.12)",
    tagText: "#F09595",
  },
  {
    id: 3,
    gridRgb: "29,158,117",
    icon: "robot",
    color: "#5DCAA5",
    bg: "linear-gradient(135deg, #081408 0%, #0c1a10 50%, #081408 100%)",
    title: "IA, données & risques réglementaires",
    phrase:
      "Implémenter les usages de l'IA et des données dans une logique de conformité, de sécurité et de maîtrise des risques.",
    tags: ["IA & AI ACT", "RGPD & DONNÉES", "GOUVERNANCE DES DONNÉES"],
    tagColor: "rgba(29,158,117,.12)",
    tagText: "#5DCAA5",
  },
  {
    id: 4,
    gridRgb: "212,83,126",
    icon: "message-circle",
    color: "#ED93B1",
    bg: "linear-gradient(135deg, #0e0818 0%, #120c1e 50%, #0e0818 100%)",
    title: "Contenus, plateformes & atteintes à l'image",
    phrase:
      "Protéger les entreprises et leurs dirigeants face aux atteintes réputationnelles, aux plateformes et aux usages abusifs des contenus numériques.",
    tags: [
      "PLATEFORMES & RÉSEAUX SOCIAUX",
      "GAMING & INDUSTRIE CRÉATIVE",
      "E-RÉPUTATION & DÉNIGREMENT",
    ],
    tagColor: "rgba(212,83,126,.12)",
    tagText: "#ED93B1",
  },
];

function CompetenceCardTile({
  card,
  index,
}: {
  card: CompetenceCard;
  index: number;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div className="group block w-full">
      <div
        ref={tiltRef}
        className="w-full transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative flex h-[320px] w-full flex-col justify-start overflow-hidden rounded-lg p-8"
          style={{
            background: card.bg,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 0 60px ${card.color}10, 0 20px 40px rgba(0,0,0,0.4)`,
            color: card.color,
          }}
        >
          <div
            aria-hidden
            className="competence-deco-line"
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              width: "48px",
              height: "2px",
              background: "currentColor",
              borderRadius: "1px",
            }}
          />
          <CardGridCanvas gridRgb={card.gridRgb} />
          <CardShimmer index={index} />

          <div
            className="relative z-10 flex flex-1 flex-col"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3 className="text-xl font-medium leading-snug text-white">
              {card.title}
            </h3>

            <p
              className="mb-4 max-w-[320px] text-[13px] leading-[1.7] text-white/45"
              style={{ minHeight: "88px" }}
            >
              {card.phrase}
            </p>

            <div className="mb-4 flex flex-nowrap gap-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: `1px solid ${card.tagText}40`,
                    color: card.tagText,
                    background: card.tagColor,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    padding: "3px 8px",
                    borderRadius: "2px",
                    letterSpacing: ".05em",
                    display: "inline-block",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              className="font-mono text-[11px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ color: card.color }}
            >
              En savoir plus →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SectionCompetences() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A14] py-10 md:py-16">
      <style>{`
        @keyframes lineBreathe {
          0%,
          100% {
            opacity: 0.25;
            box-shadow: none;
          }
          50% {
            opacity: 1;
            box-shadow:
              0 0 8px currentColor,
              0 0 16px currentColor;
          }
        }

        .competence-deco-line {
          animation: lineBreathe 3s ease-in-out infinite;
        }
      `}</style>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(26,71,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mb-4 text-center md:mb-5">
          <p
            className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Nos compétences · Droit du numérique
          </p>
          <h2 className="text-3xl font-medium leading-tight text-white md:text-4xl lg:text-5xl">
            Ce que nous faisons,
            <br />
            <span className="text-white/50">concrètement</span>
          </h2>
        </div>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          style={{ perspective: "1200px" }}
        >
          {cards.map((card, index) => (
            <CompetenceCardTile key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
