/*
 * Section « Contributions & prises de position ».
 *
 * Quatre références numériques, toutes à destination réelle (liens sortants,
 * nouvel onglet + rel="noopener", nom accessible explicite). La canicule
 * (Semaine sociale Lamy), le livre et les numéros décoratifs ne figurent plus.
 * Aucune destination vide, aucun numéro, aucune date inventée.
 *
 * Titres Le Monde et Capital : intitulés validés (fiche). Les pages n'ont pas pu
 * être ouvertes ici pour re-vérification (accès bloqué) — voir rapport.
 * Sud Ouest et Le Revenu : URL et titres réels repris de la maquette.
 */

type BadgeKind = "tribune" | "interview" | "article";

const BADGE_STYLES: Record<BadgeKind, string> = {
  tribune: "bg-[#1A47FF]/18 text-[#3F63E6]",
  interview: "bg-[#7F77DD]/18 text-[#5A52C4]",
  article: "bg-[#1D9E75]/18 text-[#0F6E56]",
};

const BADGE_LABELS: Record<BadgeKind, string> = {
  tribune: "Tribune",
  interview: "Interview",
  article: "Article",
};

function Badge({ kind }: { kind: BadgeKind }) {
  return (
    <span
      className={`inline-block w-fit rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${BADGE_STYLES[kind]}`}
    >
      {BADGE_LABELS[kind]}
    </span>
  );
}

type ArticleEntry = {
  kind: BadgeKind;
  title: string;
  source: string;
  /** Date de publication fournie (toutes lettres, jamais devinée ni recalculée). */
  date: string;
  href: string;
};

// Ordre d'affichage fixe (Le Monde, Capital, Sud Ouest, Le Revenu) — pas de tri
// par date. Dates fournies par le cabinet.
const ARTICLES: ArticleEntry[] = [
  {
    kind: "tribune",
    title:
      "IA : « L'Europe doit transformer les discours sur la souveraineté numérique en une véritable stratégie industrielle »",
    source: "Le Monde",
    date: "21 juin 2026",
    href: "https://www.lemonde.fr/idees/article/2026/06/21/ia-l-europe-doit-transformer-les-discours-sur-la-souverainete-numerique-en-une-veritable-strategie-industrielle_6706105_3232.html",
  },
  {
    kind: "interview",
    title:
      "Piratage bancaire : dans quels cas votre banque doit-elle obligatoirement vous rembourser ?",
    source: "Capital",
    date: "2 septembre 2026",
    href: "https://www.capital.fr/votre-argent/piratage-bancaire-dans-quels-cas-votre-banque-doit-elle-obligatoirement-vous-rembourser-1529747",
  },
  {
    kind: "interview",
    title:
      "Les entreprises ne savent pas précisément quels outils d'IA elles utilisent",
    source: "Sud Ouest",
    date: "2 août 2026",
    href: "https://www.sudouest.fr/sciences-et-technologie/intelligence-artificielle-les-entreprises-ne-savent-pas-precisement-quels-outils-ia-elles-utilisent-analyse-un-avocat-30114992.php",
  },
  {
    kind: "article",
    title:
      "Fraude bancaire en ligne : les banques se dérobent, les épargnants paient le prix",
    source: "Le Revenu",
    date: "21 octobre 2024",
    href: "https://www.lerevenu.com/diversifier-placements/placements-divers/fraude-bancaire-en-ligne-les-banques-se-derobent-les-epargnants-paient-le-prix/",
  },
];

const SHELL =
  "group flex h-full flex-col overflow-hidden rounded-lg border border-[#B0C0DF] bg-[#E8EEF8] shadow-[0_2px_8px_rgba(26,71,255,0.08)] transition-colors hover:border-[#1A47FF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A47FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF1F8]";

function ArticleCard({ item }: { item: ArticleEntry }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener"
      aria-label={`${item.title} — ${item.source}, ${item.date}, ${BADGE_LABELS[item.kind]} (ouvre un nouvel onglet)`}
      className={SHELL}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge kind={item.kind} />
        <h3 className="flex-1 text-[13px] font-medium leading-snug text-[#0A0F2E]">
          {item.title}
        </h3>
        {/* Nom du média puis, dessous, la date de publication. */}
        <div className="border-t border-[#0A0F2E]/[0.08] pt-2">
          <span className="block text-[11px] leading-snug text-[#0A0F2E]/70">
            {item.source}
          </span>
          <span className="mt-0.5 block font-mono text-[10px] tracking-[0.04em] text-[#0A0F2E]/60">
            {item.date}
          </span>
        </div>
      </div>
    </a>
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

        {/* 2×2 : quatre références. */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {ARTICLES.map((item) => (
            <ArticleCard key={item.href} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
