import Link from "next/link";

type TeamMember = {
  fullName: string;
  role: string;
  photoBase: string;
  photoHover: string;
  tag: { label: string; color: string };
  signature: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    fullName: "Alexandre Lazarègue",
    role: "Avocat",
    photoBase: "/images/alexandre-pro.jpg",
    photoHover: "/images/alexandre-cool.jpg",
    tag: {
      label: "DOSSIER EN COURS : GESTION DE CRISE CYBER",
      color: "#4D6FFF",
    },
    signature: "« Une cyberattaque ne prévient pas. Moi si. »",
  },
  {
    fullName: "Sarah Hinderer",
    role: "Avocate",
    photoBase: "/images/sarah-pro.jpg",
    photoHover: "/images/sarah-cool.jpg",
    tag: {
      label: "EN CE MOMENT : AUDIT IA & CONFORMITÉ IA ACT",
      color: "#5DCAA5",
    },
    signature:
      "« Les données personnelles ne sont pas une case à cocher. Ce sont vos actifs. »",
  },
  {
    fullName: "Amir Ben Majed",
    role: "Avocat",
    photoBase: "/images/amir-pro.jpg",
    photoHover: "/images/amir-cool.jpg",
    tag: {
      label: "SUR LE TERRAIN : LITIGE TECHNOLOGIQUE COMPLEXE",
      color: "#F09595",
    },
    signature:
      "« Je transforme les échecs de projets informatiques en décisions judiciaires. »",
  },
  {
    fullName: "Khalid Sookia",
    role: "Expert IT",
    photoBase: "/images/khalid-pro.jpg",
    photoHover: "/images/khalid-cool.jpg",
    tag: {
      label: "EN MISSION : ANALYSE FORENSIC POST-ATTAQUE",
      color: "#ED93B1",
    },
    signature: "« Je vois les failles avant qu'elles deviennent des litiges. »",
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
      <div className="flex flex-col px-[18px] py-4">
        <div className="flex min-h-[52px] flex-col">
          <p className="text-[14px] font-medium text-white">{member.fullName}</p>
          <p className="font-mono text-[10px] uppercase text-white/30">
            {member.role}
          </p>
        </div>
        <div className="mb-3 flex min-h-[28px] items-start">
          <p
            className="text-left font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              color: member.tag.color,
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            {member.tag.label}
          </p>
        </div>
        <div className="flex min-h-[60px] items-start">
          <p className="text-[12px] italic leading-[1.65] text-white/40">
            {member.signature}
          </p>
        </div>
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
