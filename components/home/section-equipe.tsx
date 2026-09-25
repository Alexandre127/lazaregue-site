import Link from "next/link";
import Image from "next/image";

/*
 * Section « L'équipe » — composant serveur.
 *
 * V4 : les cinq profils sont répartis en DEUX groupes explicitement nommés —
 * « Les avocats » (trois) et « Les intervenants techniques » (deux) — pour
 * porter la distinction par la proximité et non par une étiquette (MAR-019).
 *  · grand écran (≥ 1101px) : les deux groupes côte à côte, séparés par un filet
 *    vertical ;
 *  · ≤ 1100px : ils se succèdent, séparés par un filet horizontal, les cartes
 *    restant en ligne dans chaque groupe ;
 *  · téléphone (≤ 639px) : une carte par ligne, photo plus grande (4:3), puis
 *    statut, nom, qualité et compétence dessous.
 *
 * Chaque carte porte un statut en toutes lettres (AVOCAT / APPUI TECHNIQUE) :
 * la distinction avocat / intervenant technique n'est jamais portée par la seule
 * couleur. Portrait = image simple (aucun retournement, non focalisable). Fond
 * marine conservé (rythme des sections committé). Qualités exactes de la fiche.
 */

type TeamMember = {
  fullName: string;
  status: string; // AVOCAT / AVOCATE / APPUI TECHNIQUE
  quality: string; // qualité exacte (barreau / fonction)
  role: string; // champ d'intervention
  photo: string;
  positionBase?: string;
  portraitAlt?: string;
};

const LAWYERS: TeamMember[] = [
  {
    fullName: "Alexandre Lazarègue",
    status: "Avocat",
    quality: "Avocat au barreau de Paris",
    role: "Cybercriminalité et gestion de crise",
    photo: "/images/alexandre-pro.jpg",
  },
  {
    fullName: "Sarah Hinderer",
    status: "Avocate",
    quality: "Avocate aux barreaux de Paris et de Montréal",
    role: "Données personnelles et intelligence artificielle",
    photo: "/images/equipe/sarah-hinderer.webp",
    positionBase: "center top",
    portraitAlt:
      "Portrait de Me Sarah Hinderer, avocate aux barreaux de Paris et de Montréal",
  },
  {
    fullName: "Amir Ben Majed",
    status: "Avocat",
    quality: "Avocat au barreau d'Évry",
    role: "Contrats IT et contentieux informatique",
    photo: "/images/amir-pro.jpg",
  },
];

const TECHNICAL: TeamMember[] = [
  {
    fullName: "Khalid Sookia",
    status: "Consultant technique en cybersécurité",
    quality: "Consultant en cybersécurité",
    role: "Investigation numérique",
    photo: "/images/khalid-pro.jpg",
  },
  {
    fullName: "Nadia Abchiche-Mimouni",
    status: "Docteure en intelligence artificielle",
    quality:
      "Maîtresse de conférences en informatique à l'Université Côte d'Azur",
    role: "Intelligence artificielle et éthique algorithmique",
    photo: "/images/nadia-pro.jpg",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="person-card">
      <div className="person-photo">
        <Image
          src={member.photo}
          alt={member.portraitAlt ?? `Portrait de ${member.fullName}`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1100px) 33vw, 220px"
          className="object-cover"
          style={{ objectPosition: member.positionBase ?? "center 22%" }}
        />
      </div>
      <div className="person-info">
        <p className="person-status">{member.status}</p>
        <h3 className="person-name">{member.fullName}</h3>
        <p className="person-role">{member.quality}</p>
        <p className="person-expertise">{member.role}</p>
      </div>
    </article>
  );
}

export function SectionEquipe() {
  return (
    <section className="equipe-v4 border-t border-white/[0.08] bg-[#0A0F2E] py-8 md:py-14">
      <style>{`
        .equipe-v4 .team-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .equipe-v4 .team-group {
          display: grid;
          gap: 22px;
          align-content: start;
          min-width: 0;
          position: relative;
        }
        .equipe-v4 .team-group-lawyers {
          grid-column: 1 / span 3;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .equipe-v4 .team-group-technical {
          grid-column: 4 / span 2;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .equipe-v4 .team-group-technical::before {
          content: "";
          position: absolute;
          left: -12px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255, 255, 255, 0.16);
        }
        .equipe-v4 .team-group-label {
          grid-column: 1 / -1;
          margin: 0;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          line-height: 1.5;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9FA8C0;
        }
        .equipe-v4 .person-card { min-width: 0; }
        .equipe-v4 .person-photo {
          position: relative;
          width: 100%;
          aspect-ratio: 0.82;
          overflow: hidden;
          background: #0A0A14;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .equipe-v4 .person-info { min-width: 0; }
        .equipe-v4 .person-status {
          margin: 14px 0 0;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          line-height: 1.4;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #4D6FFF;
        }
        .equipe-v4 .person-name {
          margin: 7px 0 0;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.25;
          color: #fff;
        }
        .equipe-v4 .person-role {
          margin: 8px 0 0;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          line-height: 1.5;
          letter-spacing: 0.02em;
          color: #9FA8C0;
        }
        .equipe-v4 .person-expertise {
          margin: 12px 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: #C5CBDE;
        }

        /* ≤ 1100px : les groupes se succèdent, filet horizontal entre eux ;
           cartes toujours en ligne (3 puis 2). */
        @media (max-width: 1100px) {
          .equipe-v4 .team-grid { grid-template-columns: 1fr; gap: 34px; max-width: 720px; }
          .equipe-v4 .team-group-lawyers,
          .equipe-v4 .team-group-technical {
            grid-column: 1;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
          }
          .equipe-v4 .team-group-technical {
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.16);
          }
          .equipe-v4 .team-group-technical::before { display: none; }
          .equipe-v4 .person-photo { aspect-ratio: 0.88; }
        }

        /* Téléphone (≤ 639px) : une carte par ligne, photo 4:3 plus grande,
           statut / nom / qualité / compétence dessous. */
        @media (max-width: 639px) {
          .equipe-v4 .team-grid { gap: 40px; max-width: 420px; }
          .equipe-v4 .team-group-lawyers,
          .equipe-v4 .team-group-technical {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .equipe-v4 .person-photo { aspect-ratio: 4 / 3; }
          .equipe-v4 .person-photo img { object-position: center 20% !important; }
          .equipe-v4 .person-name { font-size: 22px; }
          .equipe-v4 .person-role { font-size: 13px; }
          .equipe-v4 .person-expertise { font-size: 15px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .equipe-v4 .person-photo img { transition: none !important; }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <header className="mb-8 text-center md:mb-10">
          <p className="home-kicker mb-3 font-mono text-[10px] uppercase tracking-widest text-[#C5CBDE] md:mb-4">
            L&apos;équipe
          </p>
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            Des avocats qui comprennent le code.
            <br />
            Des experts techniques qui comprennent le droit.
          </h2>
        </header>

        <div className="team-grid">
          <div
            className="team-group team-group-lawyers"
            role="group"
            aria-labelledby="groupe-avocats"
          >
            <p className="team-group-label" id="groupe-avocats">
              Les avocats
            </p>
            {LAWYERS.map((member) => (
              <TeamMemberCard key={member.fullName} member={member} />
            ))}
          </div>
          <div
            className="team-group team-group-technical"
            role="group"
            aria-labelledby="groupe-technique"
          >
            <p className="team-group-label" id="groupe-technique">
              Les intervenants techniques
            </p>
            {TECHNICAL.map((member) => (
              <TeamMemberCard key={member.fullName} member={member} />
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[720px] text-center text-[13px] leading-relaxed text-[#9FA8C0] md:mt-10">
          Les intervenants techniques apportent leur expertise aux côtés des
          avocats. Ils n&apos;exercent pas la profession d&apos;avocat.
        </p>

        {/* /equipe n'existe pas : la page de l'équipe, c'est /le-cabinet. */}
        <Link
          href="/le-cabinet"
          className="mx-auto mt-8 block w-fit border border-white/15 px-8 py-3 text-sm text-white transition-colors hover:border-[#1A47FF] hover:bg-[#1A47FF]"
        >
          Rencontrer l&apos;équipe →
        </Link>
      </div>
    </section>
  );
}
