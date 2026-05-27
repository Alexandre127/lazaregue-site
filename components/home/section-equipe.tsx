import Link from "next/link";

type TeamMember = {
  fullName: string;
  role: string;
  photoBase: string;
  photoHover: string;
  tag: { color: string };
  signature: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    fullName: "Alexandre Lazarègue",
    role: "Cybercriminalité & gestion de crise",
    photoBase: "/images/alexandre-pro.jpg",
    photoHover: "/images/alexandre-cool.jpg",
    tag: { color: "#4D6FFF" },
    signature:
      "« Les attaques les plus graves paralysent désormais l'activité avant même d'être détectées. »",
  },
  {
    fullName: "Sarah Hinderer",
    role: "Données personnelles & intelligence artificielle",
    photoBase: "/images/sarah-pro.jpg",
    photoHover: "/images/sarah-cool.jpg",
    tag: { color: "#5DCAA5" },
    signature:
      "« Les systèmes d'IA doivent rester explicables, traçables et gouvernables. »",
  },
  {
    fullName: "Amir Ben Majed",
    role: "Contrats IT & contentieux technologiques",
    photoBase: "/images/amir-pro.jpg",
    photoHover: "/images/amir-cool.jpg",
    tag: { color: "#F09595" },
    signature:
      "« Les projets numériques échouent rarement pour des raisons uniquement techniques. »",
  },
  {
    fullName: "Khalid Sookia",
    role: "Investigation numérique",
    photoBase: "/images/khalid-pro.jpg",
    photoHover: "/images/khalid-cool.jpg",
    tag: { color: "#ED93B1" },
    signature:
      "« Les cybercriminels exploitent autant les vulnérabilités humaines que techniques. »",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  const altBase = `${member.fullName} — ${member.role}`;
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-white/8 bg-[#0A0A14] transition-colors hover:border-[#1A47FF]/40">
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={member.photoBase}
          alt={altBase}
          className="h-full w-full object-cover"
        />
        <img
          src={member.photoHover}
          alt={`${altBase} — portrait décontracté`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div
        className="flex flex-col px-[18px] pt-4"
        style={{ gap: "8px", minHeight: "auto", paddingBottom: "20px" }}
      >
        <p
          className="text-white"
          style={{ fontSize: "17px", fontWeight: 500 }}
        >
          {member.fullName}
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: member.tag.color,
          }}
        >
          {member.role}
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            fontStyle: "italic",
            lineHeight: 1.5,
          }}
        >
          {member.signature}
        </p>
      </div>
    </article>
  );
}

export function SectionEquipe() {
  return (
    <section className="bg-[#0A0F2E] py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <header className="mb-8 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/30 md:mb-4">
            L&apos;équipe · Lazarègue Avocats
          </p>
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            Des avocats qui comprennent le code.
            <br />
            Un expert IT qui comprend le droit.
          </h2>
          <p className="mt-4 text-sm text-white/40">
            Passez la souris sur la photo pour mieux nous connaître.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.fullName} member={member} />
          ))}
        </div>

        <Link
          href="/equipe"
          className="mx-auto mt-8 block w-fit border border-white/15 px-8 py-3 text-sm text-white transition-colors hover:border-[#1A47FF] hover:bg-[#1A47FF]"
        >
          Rencontrer l&apos;équipe →
        </Link>
      </div>
    </section>
  );
}
