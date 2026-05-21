"use client";

// @ts-nocheck

import { HeroCTACard } from "@/components/home/hero-cta-card";
import { HeroH1DynamicLine } from "@/components/home/hero-h1-dynamic-line";
import { HeroGlobeThree } from "@/components/home/hero-globe-three";
import { HeroReveal } from "@/components/home/hero-reveal";
import { useState } from "react";

export function Header5() {
  const [ctaOpen, setCtaOpen] = useState(false);
  return (
    <section className="laz-hero !pt-6" id="hero">
      <div className="laz-hero-left overflow-visible">
        <div className="laz-hero-copy overflow-visible -mt-[70px]">
          <HeroReveal delay={0}>
            <h1
              className="laz-hero-h1 max-w-full"
              style={{
                fontSize: "clamp(46px, 6.5vw, 78px)",
                lineHeight: "1.0",
              }}
            >
              <span className="laz-hero-h1-line">VOTRE CABINET</span>
              <span className="laz-hero-h1-line">D&apos;AVOCATS EN</span>
              <HeroH1DynamicLine />
            </h1>
          </HeroReveal>

          <HeroReveal delay={60}>
            <h2 className="laz-hero-h2 max-w-[480px] text-[18px] leading-relaxed md:text-[20px]">
              <span className="font-medium text-white/85">
                Conseil juridique et défense
              </span>{" "}
              <span className="text-white/55">
                des entreprises en droit du numérique et des technologies.
              </span>
            </h2>
          </HeroReveal>

          <HeroReveal delay={120} className="laz-hero-cta-wrap">
            <div className="laz-cta-row relative">
              <button
                type="button"
                className="laz-btn-primary"
                onClick={() => setCtaOpen((open) => !open)}
                aria-expanded={ctaOpen}
              >
                Parler à un avocat
                <span className="laz-btn-arrow">→</span>
              </button>

              <HeroCTACard
                open={ctaOpen}
                onClose={() => setCtaOpen(false)}
                className="fixed bottom-0 left-0 right-0 z-50 md:absolute md:bottom-0 md:right-0 md:left-auto md:w-[300px]"
              />
            </div>
          </HeroReveal>
        </div>
      </div>

      <HeroReveal delay={120} className="laz-hero-right">
        <div className="relative min-h-[460px] w-full min-w-[520px] shrink-0 overflow-visible">
          <div
            className="absolute top-6 right-6 z-10 max-w-[200px] text-right font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{
              background: "rgba(6,8,15,0.55)",
              backdropFilter: "blur(4px)",
              borderRadius: "6px",
              padding: "6px 10px",
              border: "0.5px solid rgba(255,255,255,0.08)",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.50)" }}>
              ATLAS MONDIAL DU DROIT DU NUMÉRIQUE
            </p>
            <p style={{ color: "#1A47FF" }}>SURVOLEZ POUR EXPLORER</p>
          </div>

          <div
            className="laz-globe-wrap laz-globe-wrap-3d relative"
            style={{ width: "520px", height: "520px", marginTop: "40px" }}
          >
            <HeroGlobeThree />
          </div>
        </div>
      </HeroReveal>
    </section>
  );
}
