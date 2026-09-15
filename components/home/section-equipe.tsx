import Link from "next/link";
import Image from "next/image";

/*
 * Section « L'équipe » — cinq profils à plat (composant serveur).
 *
 * Trois avocats au premier rang, deux experts centrés au second (flex-wrap,
 * cartes de largeur identique). Portraits au rapport 4/5, cadrage cover,
 * traitement commun. Aucun retournement (le portrait est une image simple, non
 * focalisable) ; la maquette ne montre qu'un seul portrait par personne.
 *
 * Aucun badge « membre », « hors cabinet » ni « indépendant » : la distinction
 * avocat / expert est portée par la QUALITÉ affichée en toutes lettres (barreau,
 * fonction), non par une couleur ni une étiquette. Aucune photo ni personne
 * générée. Qualités exactes de la fiche.
 */

type TeamMember = {
  fullName: string;
  quality: string; // qualité exacte (barreau / fonction)
  role: string;
  photo: string;
  positionBase?: string;
  portraitAlt?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    fullName: "Alexandre Lazarègue",
    quality: "Avocat au barreau de Paris",
    role: "Cybercriminalité et gestion de crise",
    photo: "/images/alexandre-pro.jpg",
  },
  {
    fullName: "Sarah Hinderer",
    quality: "Avocate aux barreaux de Paris et de Montréal",
    role: "Données personnelles et intelligence artificielle",
    photo: "/images/equipe/sarah-hinderer.webp",
    positionBase: "center top",
    portraitAlt:
      "Portrait de Me Sarah Hinderer, avocate aux barreaux de Paris et de Montréal",
  },
  {
    fullName: "Amir Ben Majed",
    quality: "Avocat au barreau d'Évry",
    role: "Contrats IT et contentieux informatique",
    photo: "/images/amir-pro.jpg",
  },
  {
    fullName: "Khalid Sookia",
    quality: "Consultant en cybersécurité",
    role: "Investigation numérique",
    photo: "/images/khalid-pro.jpg",
  },
  {
    fullName: "Nadia Abchiche-Mimouni",
    quality: "Maîtresse de conférences en informatique à l'Université Côte d'Azur",
    role: "Intelligence artificielle et éthique algorithmique",
    photo: "/images/nadia-pro.jpg",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0A0A14]">
      {/* Portrait 4/5, cadrage cover, non rogné verticalement. Image simple :
          aucun retournement, aucun élément focalisable. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={member.photo}
          alt={member.portraitAlt ?? `${member.fullName} — ${member.role}`}
          fill
          sizes="(max-width: 639px) 100vw, 250px"
          className="object-cover"
          style={{ objectPosition: member.positionBase ?? "center" }}
        />
      </div>
      <div className="flex flex-col gap-1.5 px-3 pb-4 pt-3 sm:px-[18px] sm:pt-4">
        <p className="text-[15px] font-medium text-white sm:text-[16px]">
          {member.fullName}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9FA8C0]">
          {member.quality}
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
      {/* Trois avocats au rang 1, deux experts centrés au rang 2 — même largeur
          de carte, jamais étirées. Conteneur calé sur trois cartes. */}
      <style>{`
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
