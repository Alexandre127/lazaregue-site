"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type DifferentiateurCard = {
  imageSrc?: string;
  imageAlt: string;
  title: string;
  /** Sous-titre facultatif : trois cartes se suffisent de leur titre. */
  text?: string;
  visual?: "portail";
};

const SPOTLIGHT_TITLE = "Le droit du numérique, notre ";
const SPOTLIGHT_ACCENT = "seul métier";

// Titre « spotlight » rétabli SANS duplication de texte : UN SEUL nœud de texte,
// un dégradé animé découpé sur les lettres (background-clip: text) dont la
// position suit le défilement (variable --spot). Dégradation en couleur unie si
// background-clip: text n'est pas supporté ; effet neutralisé sous
// prefers-reduced-motion (et écouteur non attaché) ; couleur unie forcée à
// l'impression (sinon texte transparent = invisible). Lisible avant toute
// animation (couleur de repli #0A0F2E au rendu initial).
function DifferentiateurSpotlightTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 quand le titre entre par le bas, 1 quand il sort par le haut.
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--spot", `${(p * 100).toFixed(1)}%`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .laz-spotlight-title { color: #0A0F2E; }
        @supports ((-webkit-background-clip: text) or (background-clip: text)) {
          @media (prefers-reduced-motion: no-preference) {
            .laz-spotlight-title {
              background: linear-gradient(100deg, #0A0F2E 0%, #0A0F2E 34%, #4D6FFF 50%, #0A0F2E 66%, #0A0F2E 100%);
              background-size: 260% 100%;
              background-position: var(--spot, 0%) 50%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
            }
          }
        }
        @media print {
          .laz-spotlight-title {
            -webkit-text-fill-color: #0A0F2E !important;
            color: #0A0F2E !important;
            background: none !important;
          }
        }
      `}</style>
      <h2
        ref={ref}
        className="laz-spotlight-title mb-5 text-2xl font-bold leading-snug md:mb-6 md:text-3xl lg:text-4xl"
      >
        {`${SPOTLIGHT_TITLE}${SPOTLIGHT_ACCENT}`}
      </h2>
    </>
  );
}

const CARDS: DifferentiateurCard[] = [
  {
    imageSrc: "/images/pourquoi-nous/logs-annotes.webp",
    imageAlt:
      "Page de journal serveur imprimée, annotée à la main de références au RGPD et au code pénal",
    title: "Un cabinet dédié au numérique",
    text: "Le droit du numérique est la seule matière du cabinet, du contrat informatique au contentieux pénal des systèmes d'information.",
  },
  {
    imageSrc: "/images/pourquoi-nous/tableau-architecture.webp",
    imageAlt:
      "Schéma d'architecture de traitement de données dessiné au tableau, annoté de références juridiques",
    title: "Une équipe juridique et technique",
    text: "Avocats et experts en cybersécurité confrontent l'analyse juridique aux réalités techniques du dossier. Une double inscription aux barreaux de Paris et de Montréal complète cette approche sur les dossiers transatlantiques.",
  },
  {
    imageSrc: "/images/pourquoi-nous/plaque-tilsitt.webp",
    imageAlt: "Plaque du cabinet Lazarègue Avocats, 18 rue de Tilsitt, Paris",
    title: "Une pratique du numérique depuis 2016",
    text: "Le cabinet intervient sur les cyberattaques, les données personnelles, l'intelligence artificielle, les plateformes et les projets informatiques en difficulté.",
  },
];

export function PortailDemo() {
  const [activeTab, setActiveTab] = useState("dossiers");
  const [showNotif, setShowNotif] = useState(false);
  const [notif, setNotif] = useState("");
  const [, setProg] = useState(68);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // L'animation ne tourne que lorsque l'aperçu est visible à l'écran ; elle
  // reprend là où elle s'était arrêtée (l'index `i` n'avance pas hors écran).
  const onScreenRef = useRef(true);
  // Sous 639px, la commande de pause est retirée ; pour rester conforme
  // (WCAG 2.2.2 — un mouvement automatique de plus de 5 s doit pouvoir être
  // arrêté), l'animation mobile est COURTE et FINIE : « Dossiers » puis
  // « Avocat » (≈2,5 s chacun), arrêt définitif sur « Avocat », durée < 5 s.
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);
  const mobilePlayedRef = useRef(false);
  const mobileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Lance l'animation mobile finie, une seule fois. Le minuteur n'est PAS
  // rattaché au cycle de vie d'un effet : une fois « Dossiers » affiché, la
  // bascule vers « Avocat » a lieu quoi qu'il arrive (aucune annulation par un
  // changement de visibilité). Sous mouvement réduit : « Avocat » d'emblée.
  const playMobileOnce = () => {
    if (mobilePlayedRef.current) return;
    mobilePlayedRef.current = true;
    if (prefersReduced()) {
      setActiveTab("avocat");
      return;
    }
    setActiveTab("dossiers");
    mobileTimerRef.current = setTimeout(() => setActiveTab("avocat"), 2500);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (typeof IntersectionObserver === "undefined") {
      onScreenRef.current = true;
      if (isMobileRef.current) playMobileOnce(); // pas d'IO : démarre d'emblée
      return;
    }
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        onScreenRef.current = e.isIntersecting;
        // Mobile : l'animation finie démarre à la première entrée à l'écran.
        if (e.isIntersecting && isMobileRef.current) playMobileOnce();
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => {
      isMobileRef.current = mq.matches;
      setIsMobile(mq.matches);
      // Mouvement réduit : « Avocat » d'emblée, sans attendre le défilement.
      if (mq.matches && prefersReduced()) playMobileOnce();
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nettoyage du minuteur mobile au démontage uniquement.
  useEffect(() => () => { if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current); }, []);

  // Animation ORDINATEUR/TABLETTE (≥640px) : cycle continu inchangé, figé si
  // l'utilisateur réduit les animations OU active la commande de pause.
  useEffect(() => {
    if (isMobile) return;
    if (
      paused ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }
    const states = [
      { tab: "dossiers", notif: "Dossier RGPD mis à jour", prog: 72 },
      { tab: "docs", notif: "Nouveau document ajouté", prog: 72 },
      { tab: "msgs", notif: "Message de votre avocat", prog: 72 },
      { tab: "avocat", notif: "Avocat disponible en direct", prog: 72 },
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (!onScreenRef.current) return; // hors écran : on ne fait pas avancer
      const s = states[i % states.length];
      setActiveTab(s.tab);
      setNotif(s.notif);
      setShowNotif(true);
      if (s.prog) setProg(s.prog);
      setTimeout(() => setShowNotif(false), 1100);
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, [paused, isMobile]);

  return (
    <div
      ref={rootRef}
      className="pdemo"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        overflow: "hidden",
        fontSize: "11px",
      }}
    >
      <div
        className="pdemo-head"
        style={{
          padding: "8px 12px",
          borderBottom: "0.5px solid rgba(10,15,46,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            color: "rgba(10,15,46,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Portail client
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            className="pdemo-pause"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Reprendre l’aperçu animé du portail" : "Mettre en pause l’aperçu animé du portail"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "26px",
              height: "26px",
              padding: 0,
              border: "1px solid rgba(10,15,46,0.18)",
              borderRadius: "4px",
              background: "#fff",
              color: "#0A0F2E",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            <span aria-hidden="true" className="pdemo-pause-icon">
              {paused ? "▷" : "❚❚"}
            </span>
          </button>
          <span
            aria-hidden="true"
            style={{
              background: "#1A47FF",
              color: "#FFFFFF",
              padding: "1px 6px",
              borderRadius: "2px",
              fontSize: "9px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            TEMPS RÉEL
          </span>
        </span>
      </div>

      <div
        aria-hidden="true"
        style={{
          display: "flex",
          borderBottom: "0.5px solid rgba(10,15,46,0.1)",
        }}
      >
        {["dossiers", "docs", "msgs", "avocat"].map((tab) => (
          <div
            key={tab}
            className="pdemo-tab"
            style={{
              flex: 1,
              padding: "8px 4px",
              textAlign: "center",
              fontSize: "13px",
              color: activeTab === tab ? "#1A47FF" : "rgba(10,15,46,0.35)",
              borderBottom: activeTab === tab ? "2px solid #1A47FF" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab === "dossiers"
              ? "Dossiers"
              : tab === "docs"
                ? "Docs"
                : tab === "msgs"
                  ? "Messages"
                  : "Avocat"}
          </div>
        ))}
      </div>

      <div className="pdemo-stage" aria-hidden="true" style={{ padding: "10px 12px" }}>
        <div className="pdemo-panel" aria-hidden={activeTab !== "dossiers"} data-active={activeTab === "dossiers"}>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              { name: "RGPD — E-commerce", status: "EN COURS", bg: "rgba(26,71,255,0.1)", color: "#1A47FF" },
              { name: "Incident cyber — Industrie", status: "URGENT", bg: "rgba(226,75,74,0.12)", color: "#C73E3D" },
              { name: "Due diligence — M&A", status: "VALIDÉ", bg: "rgba(29,158,117,0.12)", color: "#1D9E75" },
            ].map((d) => (
              <div
                key={d.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 8px",
                  border: "0.5px solid rgba(10,15,46,0.08)",
                  borderRadius: "4px",
                }}
              >
                <span style={{ color: "#0A0F2E", fontSize: "11px" }}>{d.name}</span>
                <span
                  style={{
                    background: d.bg,
                    color: d.color,
                    padding: "1px 6px",
                    borderRadius: "2px",
                    fontSize: "9px",
                    fontWeight: 600,
                  }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pdemo-panel" aria-hidden={activeTab !== "docs"} data-active={activeTab === "docs"}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Rapport conformité RGPD v4", "DPA sous-traitant — version signée"].map((doc) => (
              <div
                key={doc}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  border: "0.5px solid rgba(10,15,46,0.08)",
                  borderRadius: "4px",
                }}
              >
                <span style={{ color: "#0A0F2E", fontSize: "11px" }}>{doc}</span>
                <span
                  style={{
                    background: "rgba(26,71,255,0.1)",
                    color: "#1A47FF",
                    padding: "1px 5px",
                    borderRadius: "2px",
                    fontSize: "9px",
                    fontWeight: 600,
                  }}
                >
                  NOUVEAU
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pdemo-panel" aria-hidden={activeTab !== "msgs"} data-active={activeTab === "msgs"}>
          <div
            style={{
              padding: "8px",
              border: "0.5px solid rgba(10,15,46,0.08)",
              borderRadius: "6px",
              background: "rgba(26,71,255,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(26,71,255,0.15)",
                  color: "#1A47FF",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                SH
              </div>
              <div style={{ color: "#0A0F2E", fontSize: "11px", fontWeight: 500 }}>Me Sarah Hinderer</div>
            </div>
            <div style={{ color: "rgba(10,15,46,0.65)", fontSize: "11px", lineHeight: 1.55 }}>
              Le projet DPA est prêt. Vous pouvez valider et signer depuis le portail.
            </div>
          </div>
        </div>

        <div className="pdemo-panel" aria-hidden={activeTab !== "avocat"} data-active={activeTab === "avocat"}>
          <div
            style={{
              padding: "10px",
              border: "0.5px solid rgba(10,15,46,0.08)",
              borderRadius: "6px",
              background: "rgba(29,158,117,0.04)",
            }}
          >
            <div style={{ color: "#0A0F2E", fontSize: "11px", marginBottom: "6px" }}>
              Me Sarah Hinderer · Données & IA
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#1D9E75", fontSize: "11px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1D9E75",
                  animation: "pulse 2.5s infinite",
                  boxShadow: "0 0 0 0 rgba(29,158,117,0.45)",
                }}
              />
              Disponible maintenant
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          padding: "6px 12px",
          background: "rgba(26,71,255,0.04)",
          borderTop: "0.5px solid rgba(10,15,46,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          opacity: showNotif ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      >
        <span
          style={{
            width: "5px",
            height: "5px",
            background: "#1A47FF",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
        <span style={{ color: "rgba(10,15,46,0.55)", fontSize: "10px" }}>{notif}</span>
      </div>
    </div>
  );
}

export function SectionDifferenciateurs() {
  return (
    <section className="w-full bg-[#F8F9FA] px-4 py-8 md:px-8 md:py-14 lg:px-12">
      {/* Trois cartes illustrées : 1 colonne en mobile, 3 colonnes ≥768px.
          Le grand bloc portail passe en deux colonnes ≥768px. */}
      <style>{`
        .pourquoi-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .pourquoi-grid { grid-template-columns: repeat(3, 1fr); } }
        .portal-block { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .portal-block { grid-template-columns: minmax(0,0.95fr) minmax(0,1.05fr); } }
      `}</style>
      <div className="container mx-auto">
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10 lg:mb-16">
          <p className="home-kicker mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0A0F2E]/65 md:mb-4">
            Pourquoi nous
          </p>
          <DifferentiateurSpotlightTitle />
        </header>

        <div className="pourquoi-grid">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "0.5px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
              }}
            >
              {/* Bande illustrée — hauteur 116px (mobile) / 128px (≥768px),
                  cadrage cover, filet bas 0.5px. */}
              <div
                className="relative h-[116px] w-full shrink-0 overflow-hidden md:h-[128px]"
                style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}
              >
                <Image
                  src={card.imageSrc as string}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>

              <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                {/* Hauteur du bloc titre réservée sur le titre le plus long
                    (2 lignes) en desktop (md : grille à 3 colonnes) pour que les
                    trois paragraphes démarrent sur la même ligne. Naturel en
                    mobile. */}
                <div className="md:min-h-[44px]">
                  <h3
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: 1.35,
                      color: "#0A0F2E",
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                {card.text ? (
                  <p
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "rgba(10,15,46,0.6)",
                      margin: "8px 0 0",
                    }}
                  >
                    {card.text}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {/* Grand bloc portail — titre, texte définitif et aperçu réel de
            l'interface. PortailDemo est réutilisé (non recopié) : c'est la seule
            implémentation rendue. Aucun bouton (aucune page portail n'existe). */}
        <div className="portal-block mt-11 overflow-hidden rounded-[2px] border border-white/15">
          <div className="bg-[#0A0F2E] px-8 py-8 md:px-9 md:py-10">
            <h3 className="m-0 mb-3 text-[21px] font-medium leading-snug text-white">
              Votre dossier accessible à tout moment
            </h3>
            <p className="m-0 max-w-[44ch] text-[15px] leading-[1.6] text-[#B7BEE4]">
              Chaque client dispose d&apos;un espace personnel réunissant les
              documents, les échanges, les échéances et l&apos;avancement de son
              dossier. Il bénéficie ainsi d&apos;un suivi clair tout au long de
              notre intervention.
            </p>
          </div>
          {/* Aperçu réel de l'interface — décoratif (aria-hidden) : le titre et
              le texte portent l'information. */}
          <div
            className="flex items-center justify-center border-t border-white/[0.12] bg-[#070B24] p-6 md:border-l md:border-t-0 md:p-8"
            aria-hidden="true"
          >
            <div className="w-full max-w-[380px]">
              <PortailDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
