import Image from "next/image";
import Link from "next/link";

/*
 * Section « Contributions & prises de position ».
 *
 * Quatre entrées, chacune avec une destination réelle. Les liens sortants
 * ouvrent un nouvel onglet (rel="noopener") ; les revues sous abonnement ou
 * sans page éditeur publique pointent, à défaut, vers la fiche interne de
 * /ressources — jamais de destination vide.
 *
 * Le livre est présenté avec sa couverture et reste marqué « à paraître » :
 * son statut de publication n'est pas tranché depuis une fiche marchande
 * (règle générale), il attend confirmation de l'auteur.
 *
 * Grille deux colonnes : équilibrée à quatre cartes (2×2) comme à trois.
 * L'ancienne carte vidéo et les brèves Les Échos / Forum InCyber / LegalTech
 * Magazine / L'Usine Digitale ne figurent plus sur l'accueil.
 */

type BadgeKind = "tribune" | "etude" | "interview" | "livre" | "aparaitre";

const BADGE_STYLES: Record<BadgeKind, string> = {
  tribune: "bg-[#1A47FF]/18 text-[#3F63E6]",
  etude: "bg-[#1D9E75]/18 text-[#0F6E56]",
  interview: "bg-[#7F77DD]/18 text-[#5A52C4]",
  livre: "bg-[#ED93B1]/22 text-[#B65478]",
  aparaitre: "bg-[#F5A623]/20 text-[#B57200]",
};

const BADGE_LABELS: Record<BadgeKind, string> = {
  tribune: "Tribune",
  etude: "Étude",
  interview: "Interview",
  livre: "Livre",
  aparaitre: "À paraître",
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
  type: "article";
  n: string;
  badge: BadgeKind;
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

type BookEntry = {
  type: "book";
  n: string;
  title: string;
  subtitle: string;
  meta: string;
  cover: string;
  alt: string;
  href: string;
};

type Entry = ArticleEntry | BookEntry;

const ENTRIES: Entry[] = [
  {
    type: "article",
    n: "01",
    badge: "tribune",
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
    type: "article",
    n: "02",
    badge: "etude",
    title:
      "Canicule au travail : de l'obligation générale de sécurité vers un régime spécial",
    source: "Semaine sociale Lamy n° 2193",
    date: "13 juillet 2026",
    // Revue sous abonnement, pas d'URL publique : fiche interne sur Ressources.
    href: "/ressources",
    external: false,
  },
  {
    type: "book",
    n: "03",
    title: "Le « juge bashing »",
    subtitle: "Poison lent de la démocratie",
    meta: "Alexandre Lazarègue · Le Bord de l'eau · 15 €",
    cover: "/images/livre-lazaregue.jpg",
    alt: "Couverture du livre « Le juge bashing, poison lent de la démocratie » d'Alexandre Lazarègue",
    // Pas d'URL éditeur fournie : fiche interne sur Ressources, à défaut.
    href: "/ressources",
  },
  {
    type: "article",
    n: "04",
    badge: "interview",
    title: "Dans quels cas votre banque doit vous rembourser",
    fullTitle:
      "Piratage bancaire : dans quels cas votre banque doit-elle obligatoirement vous rembourser ?",
    source: "Capital",
    date: "septembre 2026",
    href: "https://www.capital.fr/votre-argent/piratage-bancaire-dans-quels-cas-votre-banque-doit-elle-obligatoirement-vous-rembourser-1529747",
    external: true,
  },
];

const SHELL =
  "group flex h-full overflow-hidden rounded-lg border border-[#B0C0DF] bg-[#E8EEF8] shadow-[0_2px_8px_rgba(26,71,255,0.08)] transition-colors hover:border-[#1A47FF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A47FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EEF1F8]";

function ArticleCard({ item }: { item: ArticleEntry }) {
  const body = (
    <div className="flex flex-1 flex-col gap-2 p-4">
      <span className="font-mono text-[26px] font-medium leading-none text-[#0A0F2E]/20">
        {item.n}
      </span>
      <Badge kind={item.badge} />
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
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        title={item.fullTitle ?? item.title}
        className={`${SHELL} flex-col`}
      >
        {body}
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      title={item.fullTitle ?? item.title}
      className={`${SHELL} flex-col`}
    >
      {body}
    </Link>
  );
}

function BookCard({ item }: { item: BookEntry }) {
  // Lien interne (fiche Ressources) : next/link, pas de nouvel onglet.
  return (
    <Link href={item.href} title={`${item.title} — ${item.subtitle}`} className={`${SHELL} flex-row`}>
      <div className="relative h-full w-[128px] shrink-0 self-stretch bg-[#0A0F2E]">
        <Image
          src={item.cover}
          alt={item.alt}
          fill
          sizes="128px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#1A47FF]">
          ★ Publication
        </span>
        <div className="flex flex-wrap gap-1.5">
          <Badge kind="livre" />
          <Badge kind="aparaitre" />
        </div>
        <h3 className="text-[13px] font-medium leading-snug text-[#0A0F2E]">
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed text-[#0A0F2E]/70">
          {item.subtitle}
        </p>
        <p className="mt-auto text-[11px] text-[#0A0F2E]/50">{item.meta}</p>
      </div>
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

        {/* 2×2 : équilibré à quatre cartes comme à trois. */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {ENTRIES.map((item) =>
            item.type === "book" ? (
              <BookCard key={item.n} item={item} />
            ) : (
              <ArticleCard key={item.n} item={item} />
            ),
          )}
        </div>

        {/* Le renvoi « Voir toutes nos contributions » est retiré tant que la
            page archive n'existe pas : pas de libellé de lien sans destination.
            À rétablir à la création de la page. */}
      </div>
    </section>
  );
}
