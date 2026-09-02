"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
      {/* Libellé aussi lisible que le chiffre : couleur explicite, jamais d'opacity. */}
      <p className="mt-2 text-sm leading-relaxed" style={{ color: TXT_SECOND }}>
        {stat.label}
      </p>
    </div>
  );
}

/*
 * Couleurs de texte sur fond navy, explicites (jamais via `opacity`) et
 * calibrées pour au moins 4,5:1 : le corps et les citations ne descendent
 * pas sous #C5CBDE. Seul le bleu de marque reste sur les grands chiffres.
 */
const TXT = "#FFFFFF";
const TXT_SECOND = "#C5CBDE";
const TXT_UNLIT = "#7E8AA6"; // état « éteint » de la révélation au scroll (~5:1)
const HAIR = "rgba(255,255,255,0.10)";

const SEPARATOR_STYLE = {
  border: "none",
  borderTop: `0.5px solid ${HAIR}`,
  margin: "24px 0",
} as const;

const COLUMN_BORDER = `0.5px solid ${HAIR}`;

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
                    ? TXT
                    : TXT_UNLIT,
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
  const [statsActive, setStatsActive] = useState(false);

  // La colonne centrale portait une vidéo (grimpeur) pilotée par le scroll,
  // avec un contournement CSS du filigrane Kling AI. Remplacée par une image
  // fixe servie en WebP par next/image : plus légère sur mobile, sans
  // filigrane et sans logique de lecture. Ne reste que l'observateur qui
  // déclenche l'animation des chiffres.
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
      {/*
       * Grille en zones nommées : une seule source pour les deux dispositions.
       * - Desktop (≥1024px) : 3 colonnes 1fr / 0.8fr / 1fr, alignées en haut,
       *   la colonne vidéo devient `sticky` (top 12vh) et accompagne le scroll
       *   des deux colonnes de texte au lieu de flotter dans du vide.
       * - Mobile : une colonne, ordre imposé titre → vidéo → chiffres →
       *   citations, la vidéo en bandeau (hauteur ≤ 45vh), sans sticky.
       * Plus aucune hauteur minimale imposée : c'est le contenu qui la fixe.
       */}
      <style>{`
        .enjeux-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: "text" "video" "stats" "quotes";
          align-items: start;
          column-gap: 24px;
        }
        .enjeux-text   { grid-area: text; }
        .enjeux-video  { grid-area: video; align-self: start; height: 45vh; }
        .enjeux-stats  { grid-area: stats; }
        .enjeux-quotes { grid-area: quotes; }
        @media (min-width: 1024px) {
          .enjeux-grid {
            grid-template-columns: 1fr 0.8fr 1fr;
            grid-template-areas:
              "text  video quotes"
              "stats video quotes";
          }
          .enjeux-video { position: sticky; top: 12vh; height: 70vh; }
        }
      `}</style>

      <div className="py-16 md:py-24" style={{ background: "#060912" }}>
        <div className="enjeux-grid">
          {/* Titre + accroche */}
          <div className="enjeux-text" style={{ padding: "8px 28px 24px" }}>
            <p
              className="mb-4 font-mono uppercase"
              style={{ fontSize: "10px", color: TXT_SECOND, letterSpacing: "0.12em" }}
            >
              CONTEXTE · FRANCE 2026
            </p>

            <HighlightParagraph
              containerRef={enjeuxSectionRef}
              as="h2"
              words={TITLE_WORDS}
              accentWords={new Set()}
              className="mb-4 max-w-md leading-snug"
              style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 600 }}
            />

            <HighlightParagraph containerRef={enjeuxSectionRef} />
          </div>

          {/* Image fixe — grimpeur. `sizes` déclare 100vw sous 900px (bandeau
              pleine largeur) et ~33vw au-delà (la colonne 0.8fr) : next/image
              sert la variante WebP de ~800px sur mobile, plus large sur
              desktop. Chargée en différé (hors du premier écran). */}
          <div
            className="enjeux-video relative w-full overflow-hidden"
            style={{ borderLeft: COLUMN_BORDER, borderRight: COLUMN_BORDER }}
          >
            {/* Wrapper `absolute inset-0` : parent de position valide pour une
                image `fill`. Le conteneur `.enjeux-video` étant `position:sticky`
                sur desktop, Next.js refusait le `fill` directement dessus. */}
            <div className="absolute inset-0">
              <Image
                src="/images/grimpeur-canyon.jpg"
                alt="Un grimpeur suspendu à une paroi éclairée, au fond d'un canyon dans l'ombre — l'exposition de l'entreprise face au risque numérique."
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10"
              style={{ background: "linear-gradient(to right, #060912, transparent)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10"
              style={{ background: "linear-gradient(to left, #060912, transparent)" }}
              aria-hidden
            />
          </div>

          {/* Chiffres clés */}
          <div className="enjeux-stats" style={{ padding: "8px 28px 24px" }}>
            <hr style={{ ...SEPARATOR_STYLE, marginTop: 0 }} />
            {STATS.map((stat) => (
              <AnimatedStat key={stat.source} active={statsActive} stat={stat} />
            ))}
          </div>

          {/* Citations */}
          <div className="enjeux-quotes" style={{ padding: "8px 28px 24px" }}>
            <blockquote
              className="pl-4 italic leading-relaxed"
              style={{ borderLeft: "2px solid #1A47FF", fontSize: "13px", color: TXT_SECOND }}
            >
              « La menace cyber est une réalité du quotidien qui nous impose
              d&apos;intensifier nos efforts. »
            </blockquote>
            <p className="mt-3 pl-4 font-mono" style={{ fontSize: "11px", color: TXT_SECOND }}>
              ANSSI — Rapport d&apos;activité 2025
            </p>

            <hr style={SEPARATOR_STYLE} />

            <blockquote
              className="pl-4 italic leading-relaxed"
              style={{ borderLeft: `1px solid ${HAIR}`, fontSize: "12px", color: TXT_SECOND }}
            >
              « En 2025, le volume d&apos;attaques confirme une pression cyber
              durable et structurelle. »
            </blockquote>
            <p className="mt-3 pl-4 font-mono" style={{ fontSize: "11px", color: TXT_SECOND }}>
              Ministère de l&apos;Intérieur — 2026
            </p>

            <hr style={SEPARATOR_STYLE} />

            <blockquote
              className="pl-4 italic leading-relaxed"
              style={{ borderLeft: `1px solid ${HAIR}`, fontSize: "12px", color: TXT_SECOND }}
            >
              « 6 entreprises sur 10 ne savent pas évaluer les conséquences
              d&apos;une cyberattaque. »
            </blockquote>
            <p className="mt-3 pl-4 font-mono" style={{ fontSize: "11px", color: TXT_SECOND }}>
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
