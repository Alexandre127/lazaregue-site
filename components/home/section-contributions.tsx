"use client";

import { useEffect, useState } from "react";

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
      <div className="h-full w-[160px] shrink-0 self-stretch">
        <img
          src="/images/livre-lazaregue.jpg"
          alt="Couverture — Le Juge Bashing"
          className="h-full w-full object-cover object-top"
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
      <article className={CARD_SHELL}>
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="relative flex h-[120px] w-full shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5"
          style={{
            background: "linear-gradient(135deg, #0d1525, #0a1020)",
          }}
          aria-label="Regarder l'interview sur YouTube"
        >
          <span className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] text-white/20">
            LAZARÈGUE AVOCATS
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A47FF]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="font-mono text-[11px] text-white/40">
            Regarder l&apos;interview
          </span>
        </button>
        <div className="flex flex-1 flex-col gap-2 p-4">
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
            src="https://www.youtube.com/embed/ccYVu3APMmw?autoplay=1"
            title="Réseaux sociaux et responsabilité des plateformes : ce que dit vraiment la loi"
            className="aspect-video w-[80vw] max-w-[900px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
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
    <section className="bg-[#EEF1F8] py-10 md:py-16">
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
