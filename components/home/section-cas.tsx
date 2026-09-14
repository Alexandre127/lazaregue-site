/*
 * Section « Le droit du numérique en action » — trois cas pratiques à plat.
 *
 * Aucun retournement : plus de perspective 3D, de rotateY, de backface, de rôle
 * bouton, de tabindex, d'écouteurs de survol/focus, ni de texte d'instruction.
 * Composant serveur (aucune interactivité). Les quatre éléments de chaque carte
 * (titre + Situation + Ce que nous avons fait + Issue) sont en clair dans le DOM.
 * Hauteur libre (grille `items-start`) : les cartes ne sont pas alignées de
 * force, aucune description tronquée.
 *
 * Couleurs : les trois couleurs actuelles sont conservées comme repères (elles
 * ne sont PAS alignées sur les couleurs de famille — chantier distinct). La
 * couleur ne porte jamais seule l'information : chaque carte affiche son titre
 * et ses trois intitulés de champ en toutes lettres.
 *
 * Contenus : Situation = recto existant ; « Ce que nous avons fait » = contenu
 * du verso existant ; Issue = contenu validé par le cabinet.
 */

type CasCard = {
  key: string;
  title: string;
  accent: string; // repère de couleur (filet supérieur + puces)
  bg: string;
  situation: string;
  actions: string[]; // ex-verso « ce que le cabinet a fait »
  issue: string;
};

const CASE_CARDS: CasCard[] = [
  {
    key: "incident",
    title: "Une industrie paralysée après un piratage",
    accent: "#E24B4A",
    bg: "#FDE8E8",
    situation:
      "Une industrie a vu sa messagerie piratée. La production s'est arrêtée, des données clients et des fiches RH ont été volées, et le prestataire informatique était directement responsable.",
    actions: [
      "Coordination de la réponse à l'incident avec les experts techniques",
      "Obligations de notification auprès de la CNIL respectées dans les délais",
      "Responsabilité du prestataire informatique engagée",
    ],
    issue:
      "Reprise progressive de la production, préservation des preuves et mise en cause du prestataire d'infogérance.",
  },
  {
    key: "ia",
    title: "Mise en conformité d'une entreprise IA avant une levée de fonds",
    accent: "#1D9E75",
    bg: "#E8F5F0",
    situation:
      "Une entreprise développait des logiciels d'IA pour les ressources humaines. Avant une levée de fonds, ses investisseurs ont exigé une mise en conformité complète avec les nouvelles réglementations européennes sur l'IA.",
    actions: [
      "Gouvernance juridique des systèmes d'IA documentée",
      "Contrats avec les fournisseurs cloud mis à niveau",
      "Levée de fonds conclue dans les délais",
    ],
    issue:
      "Gouvernance et documentation de conformité mises en place ; levée de fonds conclue dans les délais.",
  },
  {
    key: "fuite",
    title: "Fuite massive de données clients chez un site de vente en ligne",
    accent: "#1A47FF",
    bg: "#E8EEFF",
    situation:
      "Un site de vente en ligne a découvert que les données personnelles de plusieurs centaines de milliers de clients avaient été volées chez un sous-traitant et revendues sur des forums illicites. La CNIL a ouvert une enquête.",
    actions: [
      "Notification pilotée dans le respect des délais",
      "Responsabilité du sous-traitant engagée",
      "Risques d'action collective anticipés",
    ],
    issue:
      "Notification réalisée dans les délais, personnes concernées informées et responsabilité du sous-traitant documentée.",
  },
];

function CasCardView({ card }: { card: CasCard }) {
  return (
    <article
      className="cas-card flex flex-col rounded-[2px] border border-[#E0E0EE] p-6"
      style={{ background: card.bg, borderTop: `3px solid ${card.accent}` }}
    >
      <h3 className="mb-[18px] text-[19px] font-medium leading-[1.28] text-[#0A0F2E]">
        {card.title}
      </h3>
      <dl className="m-0">
        <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#55556A]">
          Situation
        </dt>
        <dd className="m-0 mb-4 text-[14.5px] leading-[1.58] text-[#3A3A50]">
          {card.situation}
        </dd>

        <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#55556A]">
          Ce que nous avons fait
        </dt>
        <dd className="m-0 mb-4">
          <ul className="m-0 list-none space-y-1.5 p-0">
            {card.actions.map((action) => (
              <li
                key={action}
                className="flex gap-2 text-[14.5px] leading-[1.58] text-[#3A3A50]"
              >
                <span
                  className="mt-[0.62em] h-[4px] w-[4px] shrink-0 rounded-full"
                  style={{ background: card.accent }}
                  aria-hidden
                />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </dd>

        <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#55556A]">
          Issue
        </dt>
        <dd className="m-0 text-[14.5px] leading-[1.58] text-[#3A3A50]">
          {card.issue}
        </dd>
      </dl>
    </article>
  );
}

export function SectionCas() {
  return (
    <section className="bg-[#F4F4F8]">
      <style>{`
        /* Impression : une carte ne doit pas être coupée entre deux pages, et
           ses couleurs (filet, fond) doivent être conservées. Sans retournement,
           les cartes s'impriment naturellement dans le bon sens. */
        @media print {
          .cas-card {
            break-inside: avoid;
            page-break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="px-4 py-16 md:px-8 md:py-24 lg:px-12">
        <h2 className="mb-8 text-[22px] font-medium leading-snug text-[#0A0F2E] md:mb-10">
          Le droit du numérique en action
        </h2>

        <div className="mx-auto grid max-w-[600px] grid-cols-1 items-start gap-5 lg:max-w-none lg:grid-cols-3">
          {CASE_CARDS.map((card) => (
            <CasCardView key={card.key} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
