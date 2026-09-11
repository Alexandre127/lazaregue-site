import Link from "next/link";

/*
 * Section « Contributions & prises de position ».
 *
 * Règle de publication : aucune entrée sans destination, aucune entrée au
 * titre provisoire. Quatre entrées étaient prévues ; l'interview Capital,
 * dont le titre et l'URL restent provisoires, est retirée tant qu'ils ne
 * sont pas fournis — la section affiche donc trois cartes. La grille reste
 * équilibrée à trois comme à quatre (flex centré).
 *
 * Les liens sortants réels ouvrent un nouvel onglet (rel="noopener"). Les
 * revues sous abonnement ou sans page éditeur publique pointent, à défaut,
 * vers la fiche interne de /ressources : jamais de destination vide.
 *
 * L'ancienne carte vidéo (passage TV) et les quatre brèves (Les Échos, Forum
 * InCyber, LegalTech Magazine, L'Usine Digitale) sont retirées de l'accueil.
 */

type BadgeKind = "tribune" | "etude" | "livre";

const BADGE_STYLES: Record<BadgeKind, string> = {
  tribune: "bg-[#1A47FF]/18 text-[#3F63E6]",
  etude: "bg-[#1D9E75]/18 text-[#0F6E56]",
  livre: "bg-[#ED93B1]/22 text-[#B65478]",
};

const BADGE_LABELS: Record<BadgeKind, string> = {
  tribune: "Tribune",
  etude: "Étude",
  livre: "Livre",
};

type Contribution = {
  n: string;
  kind: BadgeKind;
  /** Titre affiché ; abrégé si le titre complet déborde de la carte. */
  title: string;
  /** Titre complet, porté par l'attribut `title` du lien quand il diffère. */
  fullTitle?: string;
  source: string;
  date: string;
  href: string;
  /** Vrai lien sortant : nouvel onglet + rel noopener. Faux = lien interne. */
  external: boolean;
};

const CONTRIBUTIONS: Contribution[] = [
  {
    n: "01",
    kind: "tribune",
    title:
      "Transformer les discours sur la souveraineté numérique en une stratégie industrielle",
    fullTitle:
      "IA : « L'Europe doit transformer les discours sur la souveraineté numérique en une véritable stratégie industrielle »",
    source: "Le Monde",
    date: "21 juin 2026",
    href: "https://www.lemonde.fr/idees/article/2026/06/21/ia-l-europe-doit-transformer-les-discours-sur-la-souverainete-numerique-en-une-veritable-strategie-industrielle_6706105_3232.html",
    external: true,
  },
  {
    n: "02",
    kind: "etude",
    title:
      "Canicule au travail : de l'obligation générale de sécurité vers un régime spécial",
    source: "Semaine sociale Lamy n° 2193",
    date: "13 juillet 2026",
    // Revue sous abonnement, pas d'URL publique : fiche interne sur Ressources.
    href: "/ressources",
    external: false,
  },
  {
    n: "03",
    kind: "livre",
    title: "Le « juge bashing », poison lent de la démocratie",
    source: "Alexandre Lazarègue · Le Bord de l'eau · 15 €",
    date: "2026",
    // Pas d'URL éditeur fournie : fiche interne sur Ressources, à défaut.
    href: "/ressources",
    external: false,
  },
];

function Badge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={`inline-block w-fit rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${BADGE_STYLES[kind]}`}
    >
      {BADGE_LABELS[kind]}
    </span>
  );
}

function ContributionCard({ item }: { item: Contribution }) {
  const shell =
    "group flex h-full flex-col gap-2 rounded-lg border border-[#B0C0DF] bg-[#E8EEF8] p-4 shadow-[0_2px_8px_rgba(26,71,255,0.08)] transition-colors hover:border-[#1A47FF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A47FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF1F8]";

  const body = (
    <>
      <span className="font-mono text-[26px] font-medium leading-none text-[#0A0F2E]/20">
        {item.n}
      </span>
      <Badge kind={item.kind} />
      <h3 className="flex-1 text-[13px] font-medium leading-snug text-[#0A0F2E]">
        {item.title}
      </h3>
      <div className="flex items-center justify-between gap-3 border-t border-[#0A0F2E]/[0.08] pt-2">
        <span className="text-[11px] leading-snug text-[#0A0F2E]/55">
          {item.source}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-[#0A0F2E]/50">
          {item.date}
        </span>
      </div>
    </>
  );

  // Lien sortant réel → nouvel onglet ; sinon navigation interne (next/link).
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        title={item.fullTitle ?? item.title}
        className={shell}
      >
        {body}
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      title={item.fullTitle ?? item.title}
      className={shell}
    >
      {body}
    </Link>
  );
}

export function SectionContributions() {
  return (
    <section className="bg-[#EEF1F8] py-16 md:py-24">
      <div className="relative z-20 px-4 md:px-8 lg:px-12">
        <header className="mb-7 max-w-2xl">
          <p className="home-kicker mb-3 font-mono text-[10px] uppercase tracking-widest text-[#0A0F2E]/65">
            Contributions &amp; Prises de position
          </p>
          <h2 className="text-2xl font-medium leading-snug text-[#0A0F2E]">
            Parce que le droit du numérique se construit aussi dans
            l&apos;espace public,{" "}
            <span className="text-[#1A47FF]">
              nous contribuons aux débats.
            </span>
          </h2>
        </header>

        {/* Grille centrée : équilibrée à trois cartes comme à quatre. */}
        <div className="mx-auto mb-6 flex max-w-5xl flex-wrap justify-center gap-3">
          {CONTRIBUTIONS.map((item) => (
            <div
              key={item.n}
              className="w-full grow basis-[280px] sm:w-[calc(50%-6px)] md:max-w-[360px]"
            >
              <ContributionCard item={item} />
            </div>
          ))}
        </div>

        {/* Renvoi vers l'archive complète. La page archive n'existe pas encore
            (/contributions absente) : on conserve le libellé sans le rendre
            cliquable plutôt que de créer un lien mort. */}
        <p className="text-[13px] font-medium text-[#0A0F2E]/60 underline underline-offset-4">
          Voir toutes nos contributions →
        </p>
      </div>
    </section>
  );
}
