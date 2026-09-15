/*
 * Section « Le droit du numérique en action » — trois cas pratiques à plat,
 * condensés (correction post-lot 6).
 *
 * Objectif : réduire le poids visuel (surtout la hauteur empilée sur mobile)
 * sans toucher aux faits. Leviers utilisés : fusion des trois interventions en
 * une phrase (suppression des puces), espacements resserrés, et couleur limitée
 * à un BANDEAU DE TITRE (corps sur blanc) au lieu de toute la carte. Aucune
 * hauteur fixe, aucun corps de texte réduit.
 *
 * Contenus : validés. Situation = recto allégé ; « Ce que nous avons fait » =
 * interventions existantes fusionnées (déduplication limitée aux répétitions
 * littérales de l'issue) ; Issue = inchangée. Titres inchangés.
 *
 * Couleurs : les trois teintes rouge / vert / bleu ont été NEUTRALISÉES au
 * profit d'un accent UNIQUE (le bleu d'action de la marque). Depuis le passage
 * des familles de domaines en neutre, ces trois couleurs étaient les seules
 * hors bleu de marque — sans système ni signification. Un accent unique rétablit
 * la cohérence chromatique (variété dans le système). Le bandeau reste le seul
 * porteur de couleur ; le corps de carte est sombre.
 * Composant serveur, aucune interactivité, aucun élément focalisable.
 */

// Accent unique : le bleu d'action de la marque (repère + filet du bandeau).
const CAS_ACCENT = "#1A47FF";
const CAS_BAND = "#E8EEFF";

type CasCard = {
  key: string;
  title: string;
  accent: string;
  band: string; // teinte du bandeau de titre
  situation: string;
  action: string; // interventions fusionnées en une phrase
  issue: string;
};

const CASE_CARDS: CasCard[] = [
  {
    key: "incident",
    title: "Une industrie paralysée après un piratage",
    accent: CAS_ACCENT,
    band: CAS_BAND,
    situation:
      "Une industrie a vu sa messagerie piratée : production arrêtée, données clients et fiches RH volées.",
    action:
      "Nous avons coordonné la réponse à l'incident avec les experts techniques et respecté les obligations de notification auprès de la CNIL dans les délais.",
    issue:
      "Reprise progressive de la production, préservation des preuves et mise en cause du prestataire d'infogérance.",
  },
  {
    key: "ia",
    title: "Mise en conformité d'une entreprise IA avant une levée de fonds",
    accent: CAS_ACCENT,
    band: CAS_BAND,
    situation:
      "Une entreprise développait des logiciels d'IA pour les ressources humaines. Avant une levée de fonds, ses investisseurs ont exigé une mise en conformité complète avec la réglementation européenne sur l'IA.",
    action:
      "Nous avons documenté la gouvernance juridique des systèmes d'IA et mis à niveau les contrats avec les fournisseurs cloud.",
    issue:
      "Gouvernance et documentation de conformité mises en place ; levée de fonds conclue dans les délais.",
  },
  {
    key: "fuite",
    title: "Fuite massive de données clients chez un site de vente en ligne",
    accent: CAS_ACCENT,
    band: CAS_BAND,
    situation:
      "Un site de vente en ligne a découvert le vol des données personnelles de plusieurs centaines de milliers de clients chez un sous-traitant, revendues sur des forums illicites ; la CNIL a ouvert une enquête.",
    action:
      "Nous avons mis en cause la responsabilité du sous-traitant et anticipé les risques d'action collective.",
    issue:
      "Notification réalisée dans les délais, personnes concernées informées et responsabilité du sous-traitant documentée.",
  },
];

function CasCardView({ card }: { card: CasCard }) {
  const label =
    "mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[#AEB4CC]";
  const body = "m-0 text-[14.5px] leading-[1.5] text-[#C9CEDD]";
  return (
    // Carte au corps SOMBRE (h-full : s'étire à la plus haute de la rangée en
    // desktop, cf. grille lg:items-stretch). Seul le bandeau de titre porte la
    // couleur (repère).
    <article
      className="cas-card flex h-full flex-col overflow-hidden rounded-[3px] border border-white/10"
      style={{ background: "#0E1220" }}
    >
      {/* Bandeau de titre : accent unique limité à cette zone. Hauteur minimale
          uniforme en desktop (lg:min-h) calée sur le titre le plus long (2 lignes)
          pour que les trois corps de texte démarrent sur la même ligne — les
          bandeaux n'ont pas la même hauteur naturelle car les titres n'occupent
          pas le même nombre de lignes. Hauteur naturelle en mobile (une colonne). */}
      <div
        className="px-5 pb-3 pt-[14px] lg:min-h-[76px]"
        style={{ background: card.band, borderTop: `3px solid ${card.accent}` }}
      >
        <h3 className="m-0 text-[18px] font-medium leading-[1.28] text-[#0A0F2E]">
          {card.title}
        </h3>
      </div>
      {/* Corps sombre. */}
      <div className="px-5 pb-4 pt-4">
        <dl className="m-0">
          <dt className={label}>Situation</dt>
          <dd className={`${body} mb-2.5`}>{card.situation}</dd>

          <dt className={label}>Ce que nous avons fait</dt>
          <dd className={`${body} mb-2.5`}>{card.action}</dd>

          <dt className={label}>Issue</dt>
          {/* Issue mise en avant (résultat immédiatement identifiable). */}
          <dd className="m-0 text-[14.5px] font-medium leading-[1.5] text-white">
            {card.issue}
          </dd>
        </dl>
      </div>
    </article>
  );
}

export function SectionCas() {
  return (
    <section className="bg-[#0A0A14]">
      <style>{`
        @media print {
          .cas-card {
            break-inside: avoid;
            page-break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="px-4 py-8 md:px-8 md:py-14 lg:px-12">
        {/* Sur-titre : cohérence avec les sections à en-tête descriptif (Équipe,
            Presse) qui portent un court sur-titre. « Cas pratiques » (et non
            « cas clients » : la page parle de dossiers anonymisés, pas d'une
            relation contractuelle). */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#AEB4CC]">
          Cas pratiques
        </p>
        <h2 className="mb-6 text-[22px] font-medium leading-snug text-white md:mb-8">
          Le droit du numérique en action
        </h2>

        {/* Desktop : hauteurs égalisées par étirement de la grille (items-stretch
            + h-full sur les cartes). Mobile : hauteur naturelle (items-start). */}
        <div className="mx-auto grid max-w-[600px] grid-cols-1 items-start gap-3 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
          {CASE_CARDS.map((card) => (
            <CasCardView key={card.key} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
