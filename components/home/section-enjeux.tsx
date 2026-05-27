"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HIGHLIGHT_TEXT =
  "Les entreprises qui anticipent leur conformité numérique lèvent plus facilement des fonds, accèdent aux marchés publics et négocient en position de force. Ce n'est pas une obligation, c'est un AVANTAGE CONCURRENTIEL.";

const HIGHLIGHT_WORDS = HIGHLIGHT_TEXT.split(/\s+/);

const TITLE_TEXT =
  "Toute entreprise est aujourd'hui exposée aux risques juridiques du numérique.";

const TITLE_WORDS = TITLE_TEXT.split(/\s+/);

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

const ATTACK_INCREASE_STAT = {
  value: 87,
  delay: 0,
  step: 1,
  format: (n: number) => (
    <>
      <span className="text-white">+</span>
      <span className="text-white">{Math.round(n)}</span>
      <span className="text-[#1A47FF]">%</span>
    </>
  ),
  label: "d'augmentation des attaques sur cinq ans",
  quote: "",
  source: "Rapport cybercriminalité 2026",
} as const;

function easeOutQuad(t: number) {
  return t * (2 - t);
}

function useCountUp(
  active: boolean,
  target: number,
  delay: number,
  step: number,
  duration: number,
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
  stat: (typeof STATS)[number] | typeof ATTACK_INCREASE_STAT;
}) {
  const value = useCountUp(
    active,
    stat.value,
    stat.delay,
    stat.step,
    COUNT_DURATION_MS,
  );

  return (
    <div
      className="py-6 last:border-b-0"
      style={{ borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
    >
      <p className="font-mono text-4xl font-bold tracking-tight text-white md:text-5xl">
        {stat.format(value)}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{stat.label}</p>
    </div>
  );
}

const SEPARATOR_STYLE = {
  border: "none",
  borderTop: "0.5px solid rgba(255,255,255,0.05)",
  margin: "24px 0",
} as const;

const COLUMN_BORDER = "0.5px solid rgba(255,255,255,0.05)";

function HighlightParagraph({
  containerRef,
  words = HIGHLIGHT_WORDS,
  accentWords = ACCENT_WORDS,
  as: Tag = "p",
  className = "mb-9 max-w-md text-[13px] leading-relaxed",
  style,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  words?: readonly string[];
  accentWords?: Set<string>;
  as?: "p" | "h2";
  className?: string;
  style?: React.CSSProperties;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    let rafId = 0;

    const update = () => {
      const rect = textEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.52;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, progress));
      setLitCount(Math.floor(clamped * words.length));
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
      { rootMargin: "-5% 0px -15% 0px", threshold: 0.1 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, words.length]);

  return (
    <div ref={textRef}>
      <Tag className={className} style={style}>
        {words.map((word, index) => {
          const isLit = index < litCount;
          const isAccent = accentWords.has(word);

          return (
            <span
              key={`${word}-${index}`}
              style={{
                color: isAccent
                  ? "#1A47FF"
                  : isLit
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.25)",
                fontWeight: isAccent ? 600 : undefined,
                transition: "color 0.3s ease",
              }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

export function SectionEnjeux() {
  const enjeuxSectionRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      videoRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
    };
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!Number.isFinite(video.duration)) return;

      const remaining = video.duration - video.currentTime;
      if (remaining < 0.8) {
        video.style.opacity = String(remaining / 0.8);
      } else if (video.currentTime < 0.8) {
        video.style.opacity = String(video.currentTime / 0.8);
      } else {
        video.style.opacity = "1";
      }
    };

    const startTimeUpdate = () => {
      video.addEventListener("timeupdate", handleTimeUpdate);
    };

    if (Number.isFinite(video.duration)) {
      startTimeUpdate();
    } else {
      video.addEventListener("loadedmetadata", startTimeUpdate, { once: true });
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", startTimeUpdate);
    };
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

  useEffect(() => {
    const video = videoRef.current;
    const section = enjeuxSectionRef.current;
    if (!video || !section) return;
    video.pause();
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (video.duration && !isNaN(video.duration)) {
          video.currentTime = video.duration * self.progress;
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section id="section-2" ref={enjeuxSectionRef} className="w-full">
      <div
        className="pt-24 pb-32 md:pt-32 md:pb-48"
        style={{ background: "#060912" }}
      >
        <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
          {/* Colonne gauche — texte + stats */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: "40px 28px" }}
          >
            <p
              className="mb-4 uppercase"
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.12em",
              }}
            >
              CONTEXTE · FRANCE 2026
            </p>

            <HighlightParagraph
              containerRef={enjeuxSectionRef}
              as="h2"
              words={TITLE_WORDS}
              accentWords={new Set()}
              className="mb-4 max-w-md leading-snug"
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 600,
              }}
            />

            <HighlightParagraph containerRef={enjeuxSectionRef} />

            <hr style={SEPARATOR_STYLE} />

            {STATS.map((stat) => (
              <AnimatedStat key={stat.source} active={statsActive} stat={stat} />
            ))}
          </div>

          {/* Colonne centre — vidéo (sectionRef pour parallax) */}
          <div
            ref={sectionRef}
            className="relative min-h-[320px] w-full overflow-hidden lg:min-h-[520px] lg:w-[220px]"
            style={{
              borderLeft: COLUMN_BORDER,
              borderRight: COLUMN_BORDER,
            }}
          >
            <div className="relative h-full min-h-[320px] w-full overflow-hidden lg:min-h-[520px]">
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full"
                style={{
                  objectFit: "cover",
                  objectPosition: "center bottom",
                  transform: "scale(1.3) translateY(-15%)",
                  transition: "opacity 0.1s",
                }}
                src="/videos/alpiniste.mp4"
                aria-hidden="true"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10"
              style={{
                background:
                  "linear-gradient(to right, #060912, transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10"
              style={{
                background:
                  "linear-gradient(to left, #060912, transparent)",
              }}
              aria-hidden
            />
          </div>

          {/* Colonne droite — citations */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: "40px 28px" }}
          >
            <blockquote
              className="pl-4 italic leading-relaxed"
              style={{
                borderLeft: "2px solid #1A47FF",
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              « La menace cyber est une réalité du quotidien qui nous impose
              d&apos;intensifier nos efforts. »
            </blockquote>
            <p
              className="mt-3 pl-4 font-mono"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}
            >
              ANSSI — Rapport d&apos;activité 2025
            </p>

            <hr style={SEPARATOR_STYLE} />

            <blockquote
              className="pl-4 italic leading-relaxed"
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.32)",
              }}
            >
              « En 2025, le volume d&apos;attaques confirme une pression cyber
              durable et structurelle. »
            </blockquote>
            <p
              className="mt-3 pl-4 font-mono"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}
            >
              Ministère de l&apos;Intérieur — 2026
            </p>

            <hr style={SEPARATOR_STYLE} />

            <blockquote
              className="pl-4 italic leading-relaxed"
              style={{
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.32)",
              }}
            >
              « 6 entreprises sur 10 ne savent pas évaluer les conséquences
              d&apos;une cyberattaque. »
            </blockquote>
            <p
              className="mt-3 pl-4 font-mono"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}
            >
              Cybermalveillance.gouv.fr — 2025
            </p>

            <hr style={SEPARATOR_STYLE} />

            <AnimatedStat active={statsActive} stat={ATTACK_INCREASE_STAT} />
          </div>
        </div>
      </div>
    </section>
  );
}
