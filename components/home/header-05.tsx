"use client";

// @ts-nocheck

import { HeroCTACard } from "@/components/home/hero-cta-card";
import { HeroH1DynamicLine } from "@/components/home/hero-h1-dynamic-line";
import { HeroGlobeThree } from "@/components/home/hero-globe-three";
import { HeroReveal } from "@/components/home/hero-reveal";
import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 900px)";

/**
 * Barre d'appel collante — mobile uniquement (<900px). Sur le modèle de la
 * barre fixe de /competences/ma-tech, mais elle n'apparaît qu'au défilement
 * (pas au chargement) et s'efface dès que le pied de page entre dans le
 * viewport. Aucune écoute sur desktop.
 */
function HeroMobileCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Desktop : on n'attache rien (la barre est de toute façon masquée en CSS).
    if (!window.matchMedia(MOBILE_QUERY).matches) return;

    const footer = document.querySelector("footer");

    // Visibilité mesurée à chaque défilement, sans IntersectionObserver : la
    // barre apparaît une fois passé le premier écran et disparaît dès que le
    // haut du pied de page entre dans le viewport. Une lecture de rect par
    // événement suffit (React ignore un setState de valeur inchangée).
    const compute = () => {
      const scrolledEnough = window.scrollY > 320;
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(scrolledEnough && !footerVisible);
    };

    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    compute();

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      className={`laz-hero-callbar${visible ? " is-visible" : ""}`}
      aria-hidden={!visible}
    >
      <a
        href="tel:+3382889119"
        className="laz-hero-callbar-btn laz-hero-callbar-btn--call"
      >
        Appeler
      </a>
      <a
        href="/contact"
        className="laz-hero-callbar-btn laz-hero-callbar-btn--write"
      >
        Écrire
      </a>
    </div>
  );
}

export function Header5() {
  const [ctaOpen, setCtaOpen] = useState(false);
  // Le canvas Three.js du globe ne doit être MONTÉ qu'au-dessus de 900px — pas
  // seulement masqué en CSS : c'est son montage (WebGL) qui coûte la batterie
  // et le temps de chargement sur mobile. On part de `false` (aucun montage au
  // rendu serveur ni au premier rendu client) et on ne le monte que si la
  // largeur est confirmée ≥900px. Le globe étant déjà purement client (init en
  // useEffect), le rendu desktop reste inchangé.
  const [mountGlobe, setMountGlobe] = useState(false);

  useEffect(() => {
    // ≥901px : au-dessus du seuil mobile (le globe reste masqué à 900px, comme
    // la colonne .laz-hero-right).
    const mq = window.matchMedia("(min-width: 901px)");
    const sync = () => setMountGlobe(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <section className="laz-hero !pt-6" id="hero">
      <style>{`
        #hero .laz-btn-arrow {
          transition: transform 0.3s ease;
        }

        #hero .laz-btn-primary:hover .laz-btn-arrow {
          transform: translateX(3px);
        }
      `}</style>
      <div className="laz-hero-left overflow-visible">
        <div className="laz-hero-copy overflow-visible -mt-[70px]">
          {/* Badge — mobile uniquement (masqué ≥900px en CSS). */}
          <span className="laz-hero-badge">Droit du numérique · Paris</span>

          <HeroReveal delay={0}>
            <h1
              className="laz-hero-h1 max-w-full"
              style={{
                // Borne basse abaissée pour les petits écrans : à 360-390 px,
                // les mots longs (« CYBERCRIMINALITÉ », « CONTRATS
                // INFORMATIQUES ») tenaient hors de l'écran. Seuls les écrans
                // < ~490 px sont touchés ; au-delà, c'est 6.5vw qui pilote,
                // donc desktop et tablette restent identiques.
                fontSize: "clamp(32px, 6.5vw, 78px)",
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
                Conseil juridique et défense des entreprises
                <br />
              </span>
              <span className="text-white/55">
                en droit du numérique et des technologies.
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

          {/* Bandeau de compétences — mobile uniquement (masqué ≥900px). Bande
              fixe (pas de défilement auto : le titre a déjà un mot rotatif),
              débordement horizontal scrollable au doigt, fondu à droite. */}
          <div className="laz-hero-skills">
            <div className="laz-hero-skills-scroll">
              <span className="laz-hero-skill">Cybersécurité</span>
              <span className="laz-hero-skill-dot" aria-hidden />
              <span className="laz-hero-skill">NIS 2</span>
              <span className="laz-hero-skill-dot" aria-hidden />
              <span className="laz-hero-skill">RGPD</span>
              <span className="laz-hero-skill-dot" aria-hidden />
              <span className="laz-hero-skill">AI Act</span>
              <span className="laz-hero-skill-dot" aria-hidden />
              <span className="laz-hero-skill">Contrats IT</span>
              <span className="laz-hero-skill-dot" aria-hidden />
              <span className="laz-hero-skill">Plateformes</span>
              <span className="laz-hero-skill-dot" aria-hidden />
              <span className="laz-hero-skill">Cybercriminalité</span>
            </div>
          </div>
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
            {mountGlobe ? <HeroGlobeThree /> : null}
          </div>
        </div>
      </HeroReveal>
      </section>

      {/* Barre d'appel rendue HORS de <section id="hero"> : cette section a
          `position:relative; z-index:1`, ce qui piégeait la barre fixe dans son
          contexte d'empilement (les sections suivantes, z-index ≥10, passaient
          par-dessus). En sibling de la section, la barre vit dans le contexte
          racine et son z-index domine tout le contenu de la page. */}
      <HeroMobileCallBar />
    </>
  );
}
