"use client";

// @ts-nocheck

import { HeroCTACard } from "@/components/home/hero-cta-card";
import { HeroReveal } from "@/components/home/hero-reveal";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Le globe Three.js (≈144 Ko gzip) ne doit PAS partir dans le paquet servi
// sous 901px. Import dynamique sans rendu serveur : la bibliothèque n'est
// téléchargée que lorsque <HeroGlobeThree/> est effectivement rendu, c'est-à-
// dire au-dessus du seuil (mountGlobe passe à true uniquement ≥901px). Ce
// n'est donc plus un simple rendu conditionnel : la frontière d'import garantit
// qu'aucun octet de Three ne franchit le seuil vers les téléphones.
const HeroGlobeThree = dynamic(
  () => import("@/components/home/hero-globe-three").then((m) => m.HeroGlobeThree),
  { ssr: false },
);

const MOBILE_QUERY = "(max-width: 900px)";

// Huit états. Le PREMIER est « droit du numérique » : c'est l'état présent dans
// le DOM au premier rendu (SSR), donc celui que lisent les moteurs — l'arbitrage
// SEO du commit 3aa99d1 (expression cible « droit du numérique ») est préservé.
// La rotation enchaîne ensuite les sept domaines puis revient au premier. Écrits
// en casse normale : la mise en capitales est faite par CSS (text-transform),
// comme les autres lignes du H1. L'état le plus long (« droit de l'intelligence
// artificielle ») commande la réserve de largeur et de hauteur, pour qu'aucun
// changement ne déplace le sous-titre ni le bouton.
const HERO_DOMAINS = [
  "droit du numérique",
  "droit des contrats informatiques",
  "droit de la cybersécurité",
  "droit des données personnelles",
  "droit de l'intelligence artificielle",
  "droit de la cybercriminalité",
  "droit des réseaux sociaux",
  "droit de la fraude numérique",
] as const;
const HERO_DOMAIN_LONGEST = "droit de l'intelligence artificielle";
const HERO_ROTATE_MS = 2200;

/**
 * Troisième ligne du H1 : mot tournant. Un état réel est présent dans le DOM dès
 * le rendu serveur (index 0) — le H1 n'est jamais assemblé après JavaScript.
 * L'intitulé stable « droit du numérique » est fourni aux technologies
 * d'assistance ; la partie visuelle changeante est `aria-hidden` et n'est jamais
 * annoncée (pas d'`aria-live`). Sous `prefers-reduced-motion`, l'état reste figé
 * sur le premier terme.
 */
function HeroDomainRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_DOMAINS.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className="laz-hero-h1-line laz-hero-rotator"
      style={{ color: "var(--blue)" }}
    >
      {/* Intitulé stable lu par les lecteurs d'écran : « …en droit du numérique »,
          lecture inchangée. Non masqué à l'accessibilité. */}
      <span className="laz-visually-hidden">droit du numérique</span>
      {/* Partie visuelle, décorative : un seul état à la fois, jamais annoncé. */}
      <span className="laz-hero-rotator-vis" aria-hidden="true">
        <span className="laz-hero-rotator-sizer">{HERO_DOMAIN_LONGEST}</span>
        <span key={index} className="laz-hero-rotator-word">
          {HERO_DOMAINS[index]}
        </span>
      </span>
    </span>
  );
}

/**
 * Barre d'appel collante — mobile uniquement (<900px). Sur le modèle de la
 * barre fixe de /nos-domaines/ma-tech, mais elle n'apparaît qu'au défilement
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
        href="tel:+33181706200"
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

      {/* Sous 901px : pas de globe. Un halo bleu nuit décoratif occupe l'angle
          supérieur droit (voir `.laz-hero::before` dans hero.css). Le vrai globe
          n'existe qu'au-dessus du seuil (import dynamique). */}
      <div className="laz-hero-left overflow-visible">
        <div className="laz-hero-copy overflow-visible -mt-[28px]">
          {/* Badge — mobile uniquement (masqué ≥900px en CSS). */}
          <span className="laz-hero-badge">Paris · Depuis 2016</span>

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
              {/* Troisième ligne : mot tournant (sept domaines de la fiche).
                  Intitulé stable « droit du numérique » pour l'accessibilité et
                  comme ancrage sémantique unique ; un seul état visuel à la fois
                  dans le DOM (aria-hidden). Voir HeroDomainRotator. */}
              <HeroDomainRotator />
            </h1>
          </HeroReveal>

          <HeroReveal delay={60}>
            {/* Sous-titre du hero : c'est un paragraphe, pas un titre. Un seul
                H1 par page, et ce texte introduit le H1 sans ouvrir une section
                (hiérarchie de titres — refonte home, lot 2). */}
            <p className="laz-hero-h2 max-w-[480px] text-[18px] leading-relaxed md:text-[20px] md:leading-snug">
              {/* Coupure typographique après « défense » : équilibre les deux
                  lignes plutôt que d'isoler « face aux risques numériques ». */}
              <span className="font-medium text-white/85">
                Conseil juridique et défense des entreprises{" "}
              </span>
              <span className="text-white/55">
                confrontées aux risques, projets et contentieux numériques.
              </span>
            </p>
          </HeroReveal>

          <HeroReveal delay={120} className="laz-hero-cta-wrap">
            <div className="laz-cta-row relative">
              <button
                type="button"
                className="laz-btn-primary"
                onClick={() => setCtaOpen((open) => !open)}
                aria-expanded={ctaOpen}
              >
                Exposer votre situation à un avocat
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
