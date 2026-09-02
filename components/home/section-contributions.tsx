"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type BadgeVariant = "tribune" | "conference" | "interview";

const BADGE_STYLES: Record<BadgeVariant, string> = {
  tribune: "bg-[#1A47FF]/18 text-[#6D8FFF]",
  conference: "bg-[#1D9E75]/18 text-[#5DCAA5]",
  interview: "bg-[#7F77DD]/18 text-[#AFA9EC]",
};

const BADGE_LABELS: Record<BadgeVariant, string> = {
  tribune: "Tribune",
  conference: "Conférence",
  interview: "Interview",
};

type ContributionArticle = {
  number: string;
  badge: BadgeVariant;
  title: string;
  source: string;
  date: string;
};

const ARTICLES: ContributionArticle[] = [
  {
    number: "03",
    badge: "tribune",
    title:
      "AI Act : ce que les entreprises françaises doivent anticiper dès maintenant",
    source: "Les Echos",
    date: "Mars 2026",
  },
  {
    number: "04",
    badge: "conference",
    title:
      "Responsabilité des systèmes d'IA : état du droit et perspectives",
    source: "Forum InCyber 2026 · Lille",
    date: "Avr. 2026",
  },
  {
    number: "05",
    badge: "interview",
    title:
      "RGPD 7 ans après : le bilan des sanctions et ce qui change en 2026",
    source: "LegalTech Magazine",
    date: "Juin 2026",
  },
  {
    number: "06",
    badge: "tribune",
    title:
      "NIS 2 : les PME ne sont pas prêtes — et elles ont six mois pour l'être",
    source: "L'Usine Digitale",
    date: "Sept. 2026",
  },
];

const CARD_SHELL =
  "flex h-full flex-col overflow-hidden rounded-lg border border-[#B0C0DF] bg-[#E8EEF8] shadow-[0_2px_8px_rgba(26,71,255,0.08)] transition-all hover:border-[#1A47FF]/50";

function Badge({ variant }: { variant: BadgeVariant }) {
  return (
    <span
      className={`inline-block w-fit rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${BADGE_STYLES[variant]}`}
    >
      {BADGE_LABELS[variant]}
    </span>
  );
}

function ContributionBookCard() {
  return (
    <article className="flex h-full flex-row overflow-hidden rounded-lg border border-[#B0C0DF] bg-[#E8EEF8] shadow-[0_2px_8px_rgba(26,71,255,0.08)] transition-all hover:border-[#1A47FF]/50">
      {/* `relative` requis par next/image `fill` ; visuellement neutre sur ce
          bloc à taille fixe (160px de large, hauteur étirée). La conversion
          apporte le WebP, le chargement différé et réserve la place (pas de
          saut de mise en page), à rendu identique. */}
      <div className="relative h-full w-[160px] shrink-0 self-stretch">
        <Image
          src="/images/livre-lazaregue.jpg"
          alt="Couverture — Le Juge Bashing"
          fill
          sizes="160px"
          loading="lazy"
          className="object-cover object-top"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-[9px] uppercase tracking-wider text-[#1A47FF]">
          ★ PUBLICATION
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-[#ED93B1]/18 text-[#ED93B1]">
            Livre
          </span>
          <span className="inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-[#F5A623]/18 text-[#F5A623]">
            À paraître
          </span>
        </div>
        <h3 className="text-[13px] font-medium leading-snug text-[#0A0F2E]">
          Le « Juge Bashing »
        </h3>
        <p className="text-xs leading-relaxed text-[#0A0F2E]/70">
          Poison lent de la démocratie
        </p>
        <p className="text-[11px] text-[#0A0F2E]/50">
          Alexandre Lazarègue · Le Bord de l&apos;Eau
        </p>
      </div>
    </article>
  );
}

function ContributionVideoCard() {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // La vignette est une boucle muette hébergée sur notre domaine : aucun appel
  // à YouTube au chargement, donc aucun cookie tiers avant consentement. Le
  // lecteur YouTube (youtube-nocookie) n'est chargé qu'après le clic.
  //
  // L'autoplay est porté par l'attribut `autoPlay` (fiable). Cet effet ne sert
  // qu'à couper la boucle si l'utilisateur a demandé la réduction des animations.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.autoplay = false;
      video.pause(); // on laisse le poster figé
    }
  }, []);

  useEffect(() => {
    if (!videoOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [videoOpen]);

  return (
    <>
      <article className={`${CARD_SHELL} md:flex-row`}>
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          aria-label="Lire la vidéo : Réseaux sociaux et responsabilité des plateformes"
          className="group relative aspect-video w-full shrink-0 cursor-pointer overflow-hidden bg-[#0a0f2e] md:aspect-auto md:h-full md:w-auto md:flex-1 md:self-stretch"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/passage-tv-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videos/passage-tv-loop.mp4" type="video/mp4" />
          </video>
          {/* Voile + bouton lecture façon YouTube */}
          <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm transition-transform group-hover:scale-110">
            <span className="ml-0.5 border-y-[8px] border-l-[13px] border-y-transparent border-l-white" />
          </span>
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#1A47FF]">
            ★ À LA UNE
          </p>
          <span className="inline-block w-fit rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-[#E24B4A]/18 text-[#F09595]">
            PASSAGE TV
          </span>
          <h3 className="text-sm font-medium leading-snug text-[#0A0F2E]">
            Réseaux sociaux et responsabilité des plateformes : ce que dit
            vraiment la loi
          </h3>
          <p className="text-[11px] text-[#0A0F2E]/50">LAZARÈGUE AVOCATS · YouTube</p>
        </div>
      </article>

      {videoOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.92)] p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Lecture de la vidéo"
        >
          <button
            type="button"
            onClick={() => setVideoOpen(false)}
            className="absolute right-4 top-4 z-10 cursor-pointer text-2xl text-white/70 transition-colors hover:text-white"
            aria-label="Fermer"
          >
            ✕
          </button>
          <iframe
            src="https://www.youtube-nocookie.com/embed/ccYVu3APMmw?autoplay=1"
            title="Réseaux sociaux et responsabilité des plateformes : ce que dit vraiment la loi"
            className="aspect-video w-[80vw] max-w-[900px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          />
        </div>
      ) : null}
    </>
  );
}

function ContributionArticleCard({ card }: { card: ContributionArticle }) {
  return (
    <article className={CARD_SHELL}>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="font-mono text-[26px] font-medium leading-none text-[#0A0F2E]/20">
          {card.number}
        </span>
        <Badge variant={card.badge} />
        <h3 className="flex-1 text-xs font-medium leading-snug text-[#0A0F2E]">
          {card.title}
        </h3>
        <div className="flex justify-between border-t border-white/[0.07] pt-2">
          <span className="text-[11px] text-[#0A0F2E]/50">{card.source}</span>
          <span className="font-mono text-[10px] text-[#0A0F2E]/50">{card.date}</span>
        </div>
      </div>
    </article>
  );
}

export function SectionContributions() {
  return (
    <section className="bg-[#EEF1F8] py-16 md:py-24">
      <div className="relative z-20 px-4 md:px-8 lg:px-12">
        <header className="mb-7 max-w-2xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#0A0F2E]/50">
            Contributions &amp; Prises de position
          </p>
          <h2 className="text-2xl font-medium leading-snug text-[#0A0F2E]">
            Le droit du numérique se construit
            <br />
            aussi dans l&apos;espace public.
          </h2>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          <ContributionBookCard />
          <ContributionVideoCard />
          {ARTICLES.map((card) => (
            <ContributionArticleCard key={card.number} card={card} />
          ))}
        </div>

        <p className="text-[13px] font-medium text-[#0A0F2E]/60 underline underline-offset-4 transition-colors duration-200 hover:text-[#0A0F2E]">
          Voir toutes nos contributions →
        </p>
      </div>
    </section>
  );
}
