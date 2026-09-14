import Link from "next/link";

/*
 * Section « Domaines d'intervention » — dix domaines en trois familles (3/3/4).
 *
 * - Les dix cartes sont présentes dans le DOM au premier rendu : pas
 *   d'accordéon, pas de « voir plus », pas de carrousel.
 * - Grille 3/3/4 en desktop (lg), une colonne en mobile. Les familles à trois
 *   cartes passent de 3 à 1 colonne sans étape à 2 (aucune carte orpheline) ;
 *   la famille à quatre cartes passe par 2 colonnes.
 * - Lien natif couvrant toute la surface de la carte (une seule tabulation) ;
 *   le renvoi « voir le domaine » est décoratif (`aria-hidden`, non focalisable).
 * - « Contentieux informatique et commercial » est strictement NON interactif :
 *   sa page n'existe pas encore (chantier distinct). Aucune entrée au sitemap.
 *
 * Couleurs de famille : le système de jetons ne définit qu'UN accent de famille
 * validé (vert « Données/conformité », posé sur les pages de domaine via
 * `data-domaine`), les deux autres étant en attente d'arbitrage du cabinet
 * (« ne pas inventer »). Les propositions de la maquette (teal/ambre/rose) ne
 * sont pas des jetons validés et divergent même du vert. La section est donc
 * livrée EN NEUTRE (titres de famille et filets de carte sans couleur de
 * famille), en attendant l'arbitrage. Le bleu reste la seule couleur d'action.
 */

const BLUE = "#4D6FFF"; // action uniquement (renvoi décoratif)
const DESC = "rgba(255,255,255,0.70)"; // corps des descriptions — contraste ≥ 4,5:1 relevé

type Domaine = {
  title: string;
  desc: string;
  href?: string; // absent = carte non interactive (page à créer)
};

type Famille = {
  key: string;
  label: string; // intitulé définitif — repris au mot près au menu (lot 8)
  cols: 3 | 4;
  domaines: Domaine[];
};

const FAMILLES: Famille[] = [
  {
    key: "conformite",
    label: "Conformité et gouvernance",
    cols: 3,
    domaines: [
      {
        title: "RGPD et données personnelles",
        desc: "Mettre les traitements de données en conformité et répondre à un contrôle ou à une violation de données.",
        href: "/nos-domaines/rgpd-donnees-personnelles",
      },
      {
        title: "Intelligence artificielle et AI Act",
        desc: "Encadrer les outils d'IA utilisés ou développés par l'entreprise et préparer la conformité à l'AI Act.",
        href: "/nos-domaines/intelligence-artificielle",
      },
      {
        title: "Cybersécurité et NIS 2",
        desc: "Organiser la prévention des incidents et respecter les obligations de sécurité, notamment celles de NIS 2.",
        href: "/nos-domaines/cybersecurite",
      },
    ],
  },
  {
    key: "operations",
    label: "Contrats et opérations numériques",
    cols: 3,
    domaines: [
      {
        title: "Contrats informatiques",
        desc: "Négocier ou sécuriser un contrat SaaS, cloud, de développement ou d'infogérance.",
        href: "/nos-domaines/contrats-informatiques",
      },
      {
        title: "M&A Tech et due diligence",
        desc: "Identifier les risques liés aux logiciels, données, contrats et actifs numériques avant une acquisition.",
        href: "/nos-domaines/ma-tech",
      },
      {
        title: "Crypto-actifs et blockchain",
        desc: "Sécuriser une activité liée aux crypto-actifs et respecter les obligations issues de MiCA.",
        href: "/nos-domaines/crypto-actifs-blockchain",
      },
    ],
  },
  {
    key: "contentieux",
    label: "Contentieux et atteintes numériques",
    cols: 4,
    domaines: [
      {
        // TODO(lot ultérieur) : rendre cette carte interactive dès que la page
        // /nos-domaines/contentieux-informatique existe (avant toute mise en
        // ligne, faute de quoi la home partirait avec une carte morte). En
        // attendant : aucun <a>, aucun href, aucun rôle de lien, aucun curseur
        // de clic, absente du sitemap.
        title: "Contentieux informatique et commercial",
        desc: "Agir lorsqu'un projet IT échoue, qu'un prestataire manque à ses obligations ou qu'une expertise devient nécessaire.",
      },
      {
        title: "Cybercriminalité et atteintes aux systèmes",
        desc: "Réagir à une intrusion, un rançongiciel, un vol de données ou une atteinte au système informatique.",
        href: "/nos-domaines/cybercriminalite",
      },
      {
        title: "Escroquerie et fraude bancaire",
        desc: "Contester les opérations frauduleuses et demander le remboursement des sommes détournées.",
        href: "/nos-domaines/escroquerie-fraude-bancaire",
      },
      {
        title: "Diffamation et retrait de contenus",
        desc: "Faire retirer un contenu, identifier son auteur ou défendre l'entreprise contre une atteinte à sa réputation.",
        href: "/nos-domaines/diffamation-retrait-contenus",
      },
    ],
  },
];

const CARD_BASE =
  "relative flex h-full flex-col rounded-xl p-5 md:p-6";
const CARD_STYLE = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
} as const;

function CardInner({ d, interactive }: { d: Domaine; interactive: boolean }) {
  return (
    <>
      {/* Filet de carte — neutre pour l'instant (recevra la couleur de famille
          une fois l'accent arbitré par le cabinet). */}
      <span
        className="mb-4 block h-[2px] w-[26px] rounded-[1px]"
        style={{ background: "rgba(255,255,255,0.25)" }}
        aria-hidden
      />
      <h4 className="mb-2.5 text-[17px] font-medium leading-snug tracking-[-0.005em] text-white">
        {d.title}
      </h4>
      <p
        className="flex-1 text-[14.5px] leading-[1.55]"
        style={{ color: DESC }}
      >
        {d.desc}
      </p>
      {interactive && (
        <span
          className="mt-4 font-mono text-[11.5px] tracking-[0.14em] opacity-80 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          style={{ color: BLUE }}
          aria-hidden
        >
          voir le domaine →
        </span>
      )}
    </>
  );
}

function DomaineCard({ d }: { d: Domaine }) {
  if (d.href) {
    return (
      <Link
        href={d.href}
        className={`domaine-card group ${CARD_BASE} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A14]`}
        style={CARD_STYLE}
      >
        <CardInner d={d} interactive />
      </Link>
    );
  }
  // Carte non interactive : aucun lien, aucun rôle, aucun survol, aucun focus.
  return (
    <div className={CARD_BASE} style={CARD_STYLE}>
      <CardInner d={d} interactive={false} />
    </div>
  );
}

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
        {/* Titre de section (H2) — traitement de titre de section, non de
            sur-titre. Aucun chapô. */}
        <h2 className="mb-10 max-w-[22ch] text-[clamp(28px,3.4vw,38px)] font-medium leading-[1.18] tracking-[-0.01em] text-white md:mb-14">
          Domaines d&apos;intervention
        </h2>

        {FAMILLES.map((fam) => (
          <div key={fam.key} className="mb-12 last:mb-0">
            <div className="mb-5 flex items-center gap-4">
              {/* Titre de famille (H3) — intitulé en toutes lettres (la couleur
                  ne porte jamais seule l'information). Neutre pour l'instant. */}
              <h3
                className="m-0 whitespace-nowrap text-[12.5px] uppercase tracking-[0.16em] text-[#C5CBDE]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {fam.label}
              </h3>
              <span
                className="h-px flex-1"
                style={{ background: "rgba(255,255,255,0.12)" }}
                aria-hidden
              />
            </div>

            <div
              className={`grid grid-cols-1 gap-4 ${
                fam.cols === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "lg:grid-cols-3"
              }`}
            >
              {fam.domaines.map((d) => (
                <DomaineCard key={d.title} d={d} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .domaine-card {
          transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          a.domaine-card:hover {
            border-color: rgba(26,71,255,0.5);
            background-color: rgba(26,71,255,0.06);
            transform: translateY(-2px);
          }
        }
      `}</style>
    </section>
  );
}
