"use client";

import { HeroCTACard } from "@/components/home/hero-cta-card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LinkedinLogo, XLogo } from "relume-icons";

function IconPhone() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A47FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A47FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A47FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconUserCircle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/35">
        {title}
      </p>
      <div className="flex flex-col gap-2 text-[13px] leading-relaxed text-white/55">
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const [ctaOpen, setCtaOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    if (!footer || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = footer.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = Math.floor(rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(footer);

    const onMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      target.current.x = e.clientX - rect.left;
      target.current.y = e.clientY - rect.top;
    };

    const draw = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(
        current.current.x,
        current.current.y,
        0,
        current.current.x,
        current.current.y,
        320,
      );
      gradient.addColorStop(0, "rgba(26, 71, 255, 0.10)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rafRef.current = requestAnimationFrame(draw);
    };

    footer.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      footer.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative z-20 overflow-hidden bg-[#06080f] pt-12 text-white"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden
      />

      <div className="relative z-10">
        <div className="border-b border-white/[0.07] bg-[#06080f] px-4 py-14 md:px-8 md:py-20 lg:px-12">
          <div className="container mx-auto flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="mb-4 font-mono text-[10px] tracking-widest text-white/35">
                Prêt à sécuriser votre activité ?
              </p>
              <h2 className="text-2xl font-medium leading-snug text-white md:text-3xl">
                Votre problème numérique a une{" "}
                <span className="text-[#1A47FF]">solution.</span>
              </h2>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCtaOpen((open) => !open)}
                aria-expanded={ctaOpen}
                className="inline-flex items-center gap-3 rounded-full border border-[#1A47FF] bg-transparent px-8 py-4 text-[15px] text-[#1A47FF] transition-all duration-200 hover:bg-[#1A47FF] hover:text-white"
              >
                <IconUserCircle />
                Parler à un avocat
              </button>
              <HeroCTACard
                open={ctaOpen}
                onClose={() => setCtaOpen(false)}
                className="fixed bottom-6 right-6 z-50 w-[300px]"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-10 md:px-8 md:py-16 lg:px-12">
          <div className="container mx-auto grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <div>
              <p className="mb-3 text-lg font-medium tracking-wide text-white">
                LAZARÈGUE <span className="text-[#1A47FF]">AVOCATS</span>
              </p>
              <p className="mb-6 text-[13px] text-white/45">
                Cabinet en droit du numérique. Paris.
              </p>
              <ul className="space-y-3 text-[13px] text-white/55">
                <li className="flex items-center gap-2.5">
                  <IconPhone />
                  <a href="tel:+33181706200" className="hover:text-white">
                    +33 1 81 70 62 00
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <IconMail />
                  <a
                    href="mailto:contact@lazaregue-avocats.fr"
                    className="hover:text-white"
                  >
                    contact@lazaregue-avocats.fr
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconPin />
                  <span>18 rue de Tilsitt, 75017 Paris</span>
                </li>
              </ul>
            </div>

            <FooterColumn title="Nos domaines">
              <Link href="/competences/cybersecurite" className="hover:text-white">
                Cybersécurité & gestion de crise
              </Link>
              <Link href="/competences/contentieux" className="hover:text-white">
                Contentieux technologiques
              </Link>
              <Link href="/nos-domaines/contrats-informatiques" className="hover:text-white">
                Contrats IT & responsabilité
              </Link>
              <Link href="/competences/ia" className="hover:text-white">
                IA, données & conformité
              </Link>
              <Link href="/competences/plateformes" className="hover:text-white">
                Plateformes & réputation numérique
              </Link>
              <Link href="/competences/rgpd" className="hover:text-white">
                RGPD & protection des données
              </Link>
              <Link href="/competences/cybercriminalite" className="hover:text-white">
                Cybercriminalité & fraudes
              </Link>
              <Link href="/competences/contrats" className="hover:text-white">
                Contrats tech & économie numérique
              </Link>
              <Link href="/competences/gaming" className="hover:text-white">
                Gaming, esport & industries créatives
              </Link>
              <Link href="/competences/forensic" className="hover:text-white">
                Investigations numériques & forensic
              </Link>
            </FooterColumn>

            <FooterColumn title="Le cabinet">
              <Link href="/a-propos" className="hover:text-white">
                Notre approche
              </Link>
              <Link href="/equipe" className="hover:text-white">
                L&apos;équipe
              </Link>
              <Link href="/#cas" className="hover:text-white">
                Cas clients
              </Link>
              <Link href="/blog" className="hover:text-white">
                Blog juridique
              </Link>
              <Link href="/ressources" className="hover:text-white">
                Ressources
              </Link>
              <Link href="/blog" className="hover:text-white">
                Actualités
              </Link>
            </FooterColumn>

            <FooterColumn title="Informations">
              <Link href="#contact" className="hover:text-white">
                Contact
              </Link>
              <Link href="#contact" className="hover:text-white">
                Prendre rendez-vous
              </Link>
              <Link href="#" className="hover:text-white">
                Mentions légales
              </Link>
              <Link href="#" className="hover:text-white">
                Confidentialité
              </Link>
              <Link href="#" className="hover:text-white">
                CGU
              </Link>
              <Link href="/tarifs" className="hover:text-white">
                Honoraires
              </Link>
            </FooterColumn>
          </div>
        </div>

        <div className="relative overflow-hidden border-t border-white/[0.07] px-4 py-5 md:px-8 lg:px-12">
          <style>{`
            @keyframes textShimmer {
              0% {
                background-position: 100% 0;
              }
              100% {
                background-position: -100% 0;
              }
            }
          `}</style>
          <p
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
            style={{
              fontSize: "clamp(48px, 8vw, 120px)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, rgba(255,255,255,0.03) 100%)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "textShimmer 6s ease-in-out infinite",
              userSelect: "none",
            }}
            aria-hidden
          >
            LAZARÈGUE AVOCATS
          </p>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-4 text-[12px] text-white/40 md:flex-row">
            <p>© 2026 Lazarègue Avocats — Tous droits réservés</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="#" className="hover:text-white">
                Mentions légales
              </Link>
              <span className="text-white/20">·</span>
              <Link href="#" className="hover:text-white">
                Confidentialité
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white/50 transition-colors hover:text-white"
              >
                <LinkedinLogo className="size-5" />
              </a>
              <a
                href="#"
                aria-label="X"
                className="text-white/50 transition-colors hover:text-white"
              >
                <XLogo className="size-5 p-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
