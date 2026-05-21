"use client";

import { useEffect, useRef, useState } from "react";

const HIGHLIGHT_TEXT =
  "Les entreprises qui anticipent leur conformité numérique lèvent plus facilement des fonds, accèdent aux marchés publics et négocient en position de force. Ce n'est pas une obligation, c'est un AVANTAGE CONCURRENTIEL.";

const HIGHLIGHT_WORDS = HIGHLIGHT_TEXT.split(/\s+/);

const ACCENT_WORDS = new Set(["AVANTAGE", "CONCURRENTIEL."]);

const COUNT_DURATION_MS = 3500;

const STATS = [
  {
    value: 453200,
    delay: 0,
    step: 100,
    format: (n: number) => (
      <>
        <span className="text-white">{Math.floor(n / 1000)} </span>
        <span className="text-[#1A47FF]">
          {String(Math.round(n % 1000)).padStart(3, "0")}
        </span>
      </>
    ),
    label: "atteintes numériques enregistrées en France",
    quote:
      "Les PME et ETI représentent 60% des victimes — souvent sans avocat ni plan de réponse.",
    source: "Cybermalveillance.gouv.fr · 2026",
  },
  {
    value: 486,
    delay: 300,
    step: 1,
    format: (n: number) => (
      <>
        <span className="text-white">{Math.round(n)} </span>
        <span className="text-[#1A47FF]">M€</span>
      </>
    ),
    label: "d'amendes prononcées · 20 150 plaintes traitées",
    quote:
      "Une mise en conformité RGPD bien conduite coûte 10 à 50 fois moins qu'une sanction.",
    source: "CNIL · Rapport annuel 2026",
  },
  {
    value: 20,
    delay: 600,
    step: 1,
    format: (n: number) => (
      <>
        <span className="text-[#1A47FF]">+</span>
        <span className="text-[#1A47FF]">{Math.round(n)}</span>
        <span className="text-white">%</span>
      </>
    ),
    label: "de demandes d'assistance en un an",
    quote:
      "Les entreprises accompagnées en amont gèrent les crises 3x plus vite que les autres.",
    source: "ANSSI · Rapport d'activité 2026",
  },
] as const;

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function useCountUp(
  active: boolean,
  target: number,
  delay = 0,
  step = 1,
  duration = COUNT_DURATION_MS,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        setValue(0);
        frameId = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min(elapsed / duration, 1);
      const raw = target * easeOutQuad(t);
      const stepped = t >= 1 ? target : Math.floor(raw / step) * step;
      setValue(stepped);

      if (t < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, delay, step, duration]);

  return value;
}

function AnimatedStat({
  active,
  stat,
}: {
  active: boolean;
  stat: (typeof STATS)[number];
}) {
  const value = useCountUp(active, stat.value, stat.delay, stat.step);

  return (
    <div className="border-b border-white/[0.07] py-6 last:border-b-0">
      <p className="font-mono text-4xl font-bold tracking-tight text-white md:text-5xl">
        {stat.format(value)}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{stat.label}</p>
      <p className="mt-4 border-l-2 border-[#1A47FF] pl-3 text-[12px] italic leading-relaxed text-white/55">
        {stat.quote}
      </p>
      <p className="mt-3 font-mono text-[11px] text-white/45">{stat.source}</p>
    </div>
  );
}

function HighlightParagraph({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    const paragraph = textRef.current;
    if (!section || !paragraph) return;

    let rafId = 0;

    const update = () => {
      const rect = paragraph.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.25;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, progress));
      setLitCount(Math.floor(clamped * HIGHLIGHT_WORDS.length));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
          setLitCount(0);
        }
      },
      { rootMargin: "-5% 0px -25% 0px", threshold: 0 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <p ref={textRef} className="mb-9 max-w-md text-[13px] leading-relaxed">
      {HIGHLIGHT_WORDS.map((word, index) => {
        const isLit = index < litCount;
        const isAccent = ACCENT_WORDS.has(word);

        return (
          <span
            key={`${word}-${index}`}
            className="transition-colors duration-300"
            style={{
              color: isLit
                ? isAccent
                  ? "#1A47FF"
                  : "#ffffff"
                : "rgba(255, 255, 255, 0.25)",
            }}
          >
            {word}
            {index < HIGHLIGHT_WORDS.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

export function SectionEnjeux() {
  const enjeuxSectionRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      imgRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
    };
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const section = enjeuxSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStatsActive(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="section-2" ref={enjeuxSectionRef} className="w-full">
      <div className="bg-[#0A0A14] pt-0 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            ref={sectionRef}
            className="relative min-h-[460px] w-full overflow-hidden rounded-md lg:ml-0 lg:w-full lg:rounded-r-md"
          >
            <img
              ref={imgRef}
              src="/images/alpiniste2.jpg"
              alt="Alpiniste — sécuriser la trajectoire de croissance"
              className="absolute inset-0 w-full object-cover"
              style={{
                objectPosition: "center 30%",
                height: "115%",
                willChange: "transform",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A14]/60"
              aria-hidden
            />
          </div>

          <div className="flex flex-col justify-center px-8 lg:px-16">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
              Contexte · France 2026
            </p>
            <h2 className="mb-6 text-[22px] font-medium leading-snug text-white">
              Toute entreprise est aujourd&apos;hui
              <br />
              exposée aux risques juridiques
              <br />
              du numérique.
            </h2>

            <HighlightParagraph containerRef={enjeuxSectionRef} />

            {STATS.map((stat) => (
              <AnimatedStat key={stat.source} active={statsActive} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
