import Link from "next/link";

/*
 * Section « Nos compétences » — une carte par domaine (neuf).
 *
 * Grille 3 colonnes en desktop, 2 sous 1024px, 1 sous 640px. Chaque carte
 * est un lien réel (<a> via next/link) englobant le titre : la carte entière
 * est cliquable, sans onClick sur une div. Surface uniforme (la palette des
 * anciennes cartes thématiques ne correspondait pas à ce découpage par
 * domaine) ; l'accent Electric Blue marque le numéro et le renvoi.
 *
 * Chaque href pointe vers une page de domaine vérifiée existante. Quatre
 * chemins diffèrent de ceux du brief (routes réelles du projet) : RGPD →
 * /rgpd-donnees, escroquerie → /avocat-escroquerie-fraude, M&A Tech →
 * /competences/ma-tech, crypto → /crypto-actifs-blockchain.
 */

const BLUE = "#4D6FFF";

type Domaine = {
  n: string;
  title: string;
  desc: string;
  href: string;
};

const DOMAINES: Domaine[] = [
  {
    n: "01",
    title: "Cybersécurité & NIS 2",
    desc: "Conformité NIS 2, gouvernance du risque et sécurité des systèmes d'information.",
    href: "/nos-domaines/cybersecurite",
  },
  {
    n: "02",
    title: "Cybercriminalité & atteintes aux systèmes",
    desc: "Réponse aux intrusions, rançongiciels et atteintes aux systèmes de traitement automatisé.",
    href: "/nos-domaines/cybercriminalite",
  },
  {
    n: "03",
    title: "RGPD & données personnelles",
    desc: "Mise en conformité, registre, analyses d'impact et défense en cas de contrôle CNIL.",
    href: "/nos-domaines/rgpd-donnees",
  },
  {
    n: "04",
    title: "Intelligence artificielle & AI Act",
    desc: "Qualification des systèmes d'IA, documentation et gouvernance au sens du règlement européen.",
    href: "/nos-domaines/ia-act",
  },
  {
    n: "05",
    title: "Contrats IT & responsabilité",
    desc: "Négociation, exécution et contentieux des contrats informatiques et des prestataires.",
    href: "/nos-domaines/contrats-informatiques",
  },
  {
    n: "06",
    title: "Escroquerie & fraude bancaire",
    desc: "Recours des victimes, remboursement et mise en cause de la responsabilité des banques.",
    href: "/nos-domaines/avocat-escroquerie-fraude",
  },
  {
    n: "07",
    title: "Diffamation & retrait de contenus",
    desc: "Retrait de contenus, déréférencement et défense de la réputation en ligne.",
    href: "/nos-domaines/diffamation-retrait-de-contenus",
  },
  {
    n: "08",
    title: "M&A Tech & due diligence",
    desc: "Due diligence juridique des actifs technologiques dans les opérations de fusion-acquisition.",
    href: "/competences/ma-tech",
  },
  {
    n: "09",
    title: "Crypto-actifs & blockchain",
    desc: "MiCA, prestataires sur actifs numériques, tokenisation et projets Web3.",
    href: "/nos-domaines/crypto-actifs-blockchain",
  },
];

export default function SectionCompetences() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A14] py-16 md:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(26,71,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mb-6 text-center md:mb-8">
          <p
            className="home-kicker text-xs uppercase tracking-[0.2em] text-[#C5CBDE]"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Nos compétences
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINES.map((d) => (
            <Link
              key={d.n}
              href={d.href}
              className="competence-tile group flex h-full flex-col rounded-xl p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A14]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="font-mono text-[11px] tracking-[0.12em]"
                style={{ color: BLUE }}
              >
                {d.n}
              </span>
              <h3 className="mt-2 text-[15px] font-medium leading-snug text-white">
                {d.title}
              </h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-[1.5] text-white/45">
                {d.desc}
              </p>
              <span
                className="mt-3 font-mono text-[11px] opacity-70 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ color: BLUE }}
                aria-hidden
              >
                Voir le domaine →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .competence-tile {
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .competence-tile:hover {
            border-color: rgba(26,71,255,0.5);
            background-color: rgba(26,71,255,0.06);
            transform: translateY(-2px);
          }
        }
      `}</style>
    </section>
  );
}
