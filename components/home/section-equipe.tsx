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
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    fullName: "Alexandre Lazarègue",
    statut: "Avocat à la Cour d'appel de Paris",
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
    statut: "Avocate à la Cour d'appel de Paris",
    avocat: true,
    role: "Données personnelles & intelligence artificielle",
    photoBase: "/images/sarah-pro.jpg",
    photoHover: "/images/sarah-cool.jpg",
    tag: { color: "#5DCAA5" },
    signature:
      "« Les systèmes d'IA doivent rester explicables, traçables et gouvernables. »",
  },
  {
    fullName: "Amir Ben Majed",
    statut: "Avocat à la Cour d'appel de Paris",
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
    statut: "Expert indépendant",
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
  // Le portrait par défaut, la photo « en dehors du cabinet » au clic.
  // Un clic (et non un simple survol) rend la bascule utilisable au tap
  // sur mobile ; l'état est mémorisé, ce qui évite le clignotement du hover.
  const [dehors, setDehors] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A14]">
      {/* Portrait au rapport 4/5 : jamais rogné verticalement, quelle que soit
          la largeur de colonne. Le bouton porte la bascule — focusable au
          clavier, activable au tap. */}
      <button
        type="button"
        onClick={() => setDehors((v) => !v)}
        aria-pressed={dehors}
        aria-label={
          dehors
            ? `${member.fullName} — revenir au portrait`
            : `${member.fullName} — voir en dehors du cabinet`
        }
        className="group relative block aspect-[4/5] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A47FF]"
      >
        <Image
          src={member.photoBase}
          alt={altBase}
          fill
          sizes="(max-width: 700px) 72vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover"
          style={{ opacity: dehors ? 0 : 1, transition: "opacity 400ms ease" }}
        />
        <Image
          src={member.photoHover}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 700px) 72vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover"
          style={{
            opacity: dehors ? 1 : 0,
            transition: "opacity 400ms ease",
            objectPosition: member.positionHover ?? "center",
          }}
        />
        {/* Indice d'affordance permanent : sans lui, personne ne devine
            qu'il faut cliquer. Reste discret, en DM Mono. */}
        <span className="pointer-events-none absolute bottom-2 left-2 z-[1] flex items-center gap-1 rounded-sm bg-[#0A0A14]/75 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#C5CBDE]">
          {dehors ? "↺ portrait" : "↗ en dehors du cabinet"}
        </span>
      </button>

      {/* Sous la carte : nom, qualité (la distinction avocat / expert reste
          lisible), puis fonction en libellé discret. */}
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
        .equipe-cards {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
        }
        .equipe-cards > * { flex: 0 0 72%; scroll-snap-align: start; }
        @media (min-width: 700px) {
          .equipe-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            overflow: visible;
          }
          .equipe-cards > * { flex: none; }
        }
        @media (min-width: 1200px) {
          .equipe-cards { grid-template-columns: repeat(5, 1fr); }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <header className="mb-8 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#9FA8C0] md:mb-4">
            L&apos;équipe · Lazarègue Avocats
          </p>
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            Des avocats qui comprennent le code.
            <br />
            Des experts techniques qui comprennent le droit.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#C5CBDE]">
            Trois avocats à la Cour d&apos;appel de Paris, deux experts
            indépendants mobilisés selon les besoins du dossier.
          </p>
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
