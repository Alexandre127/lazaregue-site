"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type TeamMember = {
  fullName: string;
  role: string;
  photoBase: string;
  photoHover: string;
  tag: { color: string };
  signature: string;
  /**
   * Avocat ou intervenant extérieur. La distinction n'est pas cosmétique :
   * le RIN interdit d'entretenir une confusion entre les avocats du cabinet
   * et les experts indépendants qui interviennent à leurs côtés.
   */
  statut: string;
  avocat: boolean;
  /** Cadrage de la photo de survol, quand le sujet n'est pas centré. */
  positionHover?: string;
  /** Cadrage du portrait recto, quand le sujet n'est pas centré. */
  positionBase?: string;
  /** Texte alternatif dédié du portrait recto (sinon dérivé du nom + rôle). */
  portraitAlt?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    fullName: "Alexandre Lazarègue",
    statut: "Avocat au barreau de Paris",
    avocat: true,
    role: "Cybercriminalité & gestion de crise",
    photoBase: "/images/alexandre-pro.jpg",
    photoHover: "/images/alexandre-cool.jpg",
    tag: { color: "#4D6FFF" },
    signature:
      "« Les attaques les plus graves paralysent désormais l'activité avant même d'être détectées. »",
  },
  {
    fullName: "Sarah Hinderer",
    statut: "Avocate au barreau de Paris",
    avocat: true,
    role: "Données personnelles & intelligence artificielle",
    photoBase: "/images/equipe/sarah-hinderer.webp",
    portraitAlt: "Portrait de Me Sarah Hinderer, avocate au barreau de Paris",
    // Portrait buste sur fond bleu : ancrage haut pour ne pas couper au menton.
    positionBase: "center top",
    photoHover: "/images/sarah-cool.jpg",
    tag: { color: "#5DCAA5" },
    signature:
      "« Les systèmes d'IA doivent rester explicables, traçables et gouvernables. »",
  },
  {
    fullName: "Amir Ben Majed",
    statut: "Avocat au barreau de l'Essonne",
    avocat: true,
    role: "Contrats IT & contentieux technologiques",
    photoBase: "/images/amir-pro.jpg",
    photoHover: "/images/amir-cool.jpg",
    tag: { color: "#F09595" },
    signature:
      "« Les projets numériques échouent rarement pour des raisons uniquement techniques. »",
  },
  {
    fullName: "Khalid Sookia",
    statut: "Notre consultant technique — cybersécurité",
    avocat: false,
    role: "Investigation numérique",
    photoBase: "/images/khalid-pro.jpg",
    photoHover: "/images/khalid-cool.jpg",
    tag: { color: "#ED93B1" },
    signature:
      "« Les cybercriminels exploitent autant les vulnérabilités humaines que techniques. »",
  },
  {
    fullName: "Nadia Abchiche-Mimouni",
    statut: "Experte indépendante",
    avocat: false,
    role: "Intelligence artificielle & éthique algorithmique",
    photoBase: "/images/nadia-pro.jpg",
    // La photo de conférence est cadrée large, le sujet à droite : le
    // décalage horizontal la garde dans le champ au survol.
    photoHover: "/images/nadia-cool.jpg",
    positionHover: "68% 30%",
    tag: { color: "#C9A227" },
    // TODO à faire valider par l'intéressée : phrase rédigée par le cabinet,
    // attribuée à une personne réelle. Ne pas mettre en ligne sans son accord.
    signature:
      "« Un algorithme n'a pas d'intention. Il a des données, des choix de conception, et des conséquences. »",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  const altBase = `${member.fullName} — ${member.role}`;
  // Recto = portrait, verso = la photo « en dehors du cabinet ». Le
  // retournement 3D reprend le mécanisme des études de cas. Un <button> natif
  // apporte gratuitement le focus clavier et l'activation par Entrée / Espace ;
  // `aria-expanded` porte l'état persistant (clic / clavier). Le survol
  // retourne en plus la carte, en pur CSS, sur les appareils qui le
  // permettent. `prefers-reduced-motion` remplace la rotation par une
  // substitution d'opacité (voir les styles de la section).
  const [flipped, setFlipped] = useState(false);
  const sizes = "(max-width: 700px) 72vw, (max-width: 1200px) 33vw, 20vw";

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A14]">
      {/* Portrait au rapport 4/5, jamais rogné verticalement. La zone qui
          tourne se limite à la photo : le nom et la qualité, sous la carte,
          restent visibles recto comme verso. */}
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-expanded={flipped}
        aria-label={
          flipped
            ? `${member.fullName} — revenir au portrait`
            : `${member.fullName} — voir en dehors du cabinet`
        }
        className={`equipe-flip group relative block aspect-[4/5] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A47FF] focus-visible:ring-inset ${
          flipped ? "is-flipped" : ""
        }`}
      >
        <span className="equipe-flip-inner">
          <span className="equipe-flip-face equipe-flip-front">
            <Image
              src={member.photoBase}
              alt={member.portraitAlt ?? altBase}
              fill
              sizes={sizes}
              className="object-cover"
              style={{ objectPosition: member.positionBase ?? "center" }}
            />
          </span>
          <span className="equipe-flip-face equipe-flip-back">
            <Image
              src={member.photoHover}
              alt=""
              aria-hidden
              fill
              sizes={sizes}
              className="object-cover"
              style={{ objectPosition: member.positionHover ?? "center" }}
            />
          </span>
        </span>
      </button>

      {/* Hors de la zone qui tourne : nom, qualité (la distinction avocat /
          expert reste lisible), puis fonction en libellé discret. */}
      <div className="flex flex-col gap-1.5 px-3 pt-3 pb-4 sm:px-[18px] sm:pt-4">
        <p className="text-[15px] font-medium text-white sm:text-[16px]">
          {member.fullName}
        </p>
        <p
          className={`font-mono text-[9px] uppercase tracking-[0.12em] ${
            member.avocat ? "text-[#9FA8C0]" : "text-[#C5CBDE]"
          }`}
        >
          {member.statut}
        </p>
        <p className="font-mono text-[11px] tracking-[0.04em] text-[#C5CBDE]">
          {member.role}
        </p>
      </div>
    </article>
  );
}

export function SectionEquipe() {
  return (
    <section className="bg-[#0A0F2E] py-16 md:py-24">
      {/* 5 cartes de taille identique sur une seule rangée. La distinction
          avocat / expert n'est plus portée par deux grilles séparées mais par
          la qualité affichée sous chaque carte. */}
      <style>{`
        /* Option A : deux rangs. Trois avocats au rang 1, deux intervenants
           centrés au rang 2 — même largeur de carte, jamais étirés. Flex centré
           avec largeur de carte fixe et conteneur calé sur trois cartes. */
        .equipe-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          max-width: 782px; /* 3 × 250 + 2 × 16 : exactement trois par rang */
          margin: 0 auto;
        }
        .equipe-cards > * { flex: 0 0 250px; max-width: 250px; }
        @media (max-width: 639px) {
          .equipe-cards { max-width: 340px; }
          .equipe-cards > * { flex-basis: 100%; max-width: 100%; }
        }

        /* Retournement 3D du portrait — repris des cartes « études de cas ». */
        .equipe-flip { perspective: 1000px; padding: 0; border: 0; background: transparent; cursor: pointer; overflow: hidden; }
        .equipe-flip-inner {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .equipe-flip-face {
          position: absolute;
          inset: 0;
          display: block;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .equipe-flip-back { transform: rotateY(180deg); }
        @media (hover: hover) and (pointer: fine) {
          .equipe-flip:hover .equipe-flip-inner { transform: rotateY(180deg); }
        }
        .equipe-flip.is-flipped .equipe-flip-inner { transform: rotateY(180deg); }

        /* Mouvement réduit : pas de rotation 3D, substitution directe par
           opacité (transition neutralisée). */
        @media (prefers-reduced-motion: reduce) {
          .equipe-flip-inner { transition: none; transform: none !important; transform-style: flat; }
          .equipe-flip-face { backface-visibility: visible; -webkit-backface-visibility: visible; }
          .equipe-flip-back { transform: none; opacity: 0; }
          .equipe-flip-front { opacity: 1; }
          .equipe-flip.is-flipped .equipe-flip-front { opacity: 0; }
          .equipe-flip.is-flipped .equipe-flip-back { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) and (hover: hover) and (pointer: fine) {
          .equipe-flip:hover .equipe-flip-front { opacity: 0; }
          .equipe-flip:hover .equipe-flip-back { opacity: 1; }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <header className="mb-8 text-center">
          <p className="home-kicker mb-3 font-mono text-[10px] uppercase tracking-widest text-[#C5CBDE] md:mb-4">
            L&apos;équipe
          </p>
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            Des avocats qui comprennent le code.
            <br />
            Des experts techniques qui comprennent le droit.
          </h2>
          {/* Paragraphe « Trois avocats… deux experts… » retiré : les cartes
              qui suivent portent déjà ces informations. */}
        </header>

        <div className="equipe-cards">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.fullName} member={member} />
          ))}
        </div>

        {/* /equipe n'existe pas : la page de l'équipe, c'est /le-cabinet. */}
        <Link
          href="/le-cabinet"
          className="mx-auto mt-10 block w-fit border border-white/15 px-8 py-3 text-sm text-white transition-colors hover:border-[#1A47FF] hover:bg-[#1A47FF]"
        >
          Rencontrer l&apos;équipe →
        </Link>
      </div>
    </section>
  );
}
