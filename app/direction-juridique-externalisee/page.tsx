import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/offres/offres.module.css";
import { MEMBRES } from "@/lib/equipe";

/**
 * Page d'offre « Direction juridique externalisée » (abonnement
 * d'accompagnement continu) — maquette
 * docs/maquettes/accompagnement-continu-maquette.html. Textes repris mot pour
 * mot de la consigne du cabinet (9 octobre 2026). Tous les boutons mènent au
 * formulaire de contact existant (/contact, sans paramètre : règle du site).
 */
const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/direction-juridique-externalisee";
const CONTACT = "/contact";
const TITLE = "Direction juridique externalisée — avocat du numérique | Lazarègue Avocats";
const DESCRIPTION =
  "Abonnement juridique pour les entreprises : contrats informatiques, IA, données personnelles et litiges technologiques. Un avocat du numérique au quotidien, dès 790 € HT/mois.";
const IMAGE = { url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", images: [IMAGE], locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", images: [IMAGE], title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Accompagnement", item: `${URL_BASE}${PATH}` },
        { "@type": "ListItem", position: 3, name: "Direction juridique externalisée", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "LegalService",
      name: "Lazarègue Avocats",
      url: `${URL_BASE}/`,
      telephone: "+33181706200",
      email: "contact@lazaregue-avocats.fr",
      address: { "@type": "PostalAddress", streetAddress: "18 rue de Tilsitt", postalCode: "75017", addressLocality: "Paris", addressCountry: "FR" },
      areaServed: { "@type": "Country", name: "France" },
    },
  ],
};

const QUESTIONS: { domaine: string; question: string }[] = [
  { domaine: "Contrats informatiques", question: "« Mon prestataire refuse de corriger les dysfonctionnements de son logiciel. Que puis-je faire ? »" },
  { domaine: "Intelligence artificielle", question: "« Puis-je utiliser les données de mes clients pour entraîner un outil d’IA ? »" },
  { domaine: "Données personnelles", question: "« Mon entreprise doit-elle réaliser une analyse d’impact avant ce projet ? »" },
  { domaine: "Cybersécurité", question: "« Un client nous impose une annexe de sécurité. Pouvons-nous la signer ? »" },
  { domaine: "Plateformes et e-commerce", question: "« Nos conditions générales sont-elles prêtes pour le lancement de notre service ? »" },
  { domaine: "Litiges technologiques", question: "« Un client conteste notre prestation et refuse de payer. Comment réagir ? »" },
];

type Formule = {
  nom: string;
  badge?: string;
  relation: string;
  prix: string;
  promesse: string;
  demandes: string;
  exemple: string;
  inclus: string[];
  bouton: string;
  vedette?: boolean;
};

const FORMULES: Formule[] = [
  {
    nom: "Conseil",
    relation: "Votre avocat référent pour le numérique.",
    prix: "790",
    promesse: "Un interlocuteur qui connaît votre entreprise, sollicité dès qu’une question numérique se pose.",
    demandes: "2 avis rapides + 1 demande courante par mois",
    exemple: "Par exemple : la relecture d’un contrat SaaS et deux questions sur un projet IA.",
    inclus: ["Point de suivi sur demande", "Veille du cabinet", "Espace client", "Tarif préférentiel sur les missions"],
    bouton: "Choisir Conseil",
  },
  {
    nom: "Business",
    badge: "Le plus demandé",
    relation: "Un accompagnement juridique régulier.",
    prix: "1 590",
    promesse: "Pour les entreprises dont les contrats, les données et les projets numériques suscitent des questions chaque mois, avec ou sans juriste interne.",
    demandes: "2 avis rapides + 2 demandes courantes par mois",
    exemple: "Par exemple : un contrat d’intégrateur, un DPA et deux questions sur un nouveau service.",
    inclus: ["Réunion trimestrielle de suivi", "Demandes traitées en priorité", "Veille centrée sur votre activité", "Espace client et tarif préférentiel"],
    bouton: "Choisir Business →",
    vedette: true,
  },
  {
    nom: "Direction juridique",
    relation: "Un avocat intégré à vos projets.",
    prix: "2 900",
    promesse: "Votre avocat connaît l’entreprise en profondeur, suit ses projets de l’intérieur et participe aux arbitrages avant que la question juridique ne se pose.",
    demandes: "4 avis rapides + 4 demandes courantes par mois",
    exemple: "Par exemple : la revue des contrats d’un lancement, la gouvernance de l’IA et le suivi d’un prestataire.",
    inclus: ["Avocat référent dédié", "Réunion mensuelle avec la direction", "Revue des contrats avant signature", "Priorité maximale, espace client et tarif préférentiel"],
    bouton: "Construire l’accompagnement",
  },
];

/* Personnes : photos tirées de lib/equipe.ts (source unique) ; noms et qualités
   tels que fournis par le cabinet pour cette page. */
const AVOCATS = [
  { m: MEMBRES.alexandre, nom: "Alexandre Lazarègue", titre: "Avocat au Barreau de Paris" },
  { m: MEMBRES.sarah, nom: "Sarah Hinderer", titre: "Avocate aux barreaux de Paris et de Montréal" },
  { m: MEMBRES.amir, nom: "Amir Ben Majed", titre: "Avocat partenaire au barreau d’Évry" },
];
const TECHNIQUES = [
  { m: MEMBRES.khalid, nom: "Khalid Sookia", titre: "Consultant technique en cybersécurité" },
  { m: MEMBRES.nadia, nom: "Nadia Abchiche-Mimouni", titre: "Intervenante technique en intelligence artificielle" },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  { q: "Quelle différence avec une consultation ponctuelle ?", a: "Votre avocat connaît déjà votre entreprise, ses contrats et ses projets. Vous le sollicitez sans devis préalable ni réexplication du contexte, pour un budget connu à l’avance." },
  { q: "Les demandes non utilisées sont-elles reportées ?", a: "Non. Si vos besoins varient fortement, la formule est ajustée lors du point de suivi." },
  { q: "Les contentieux sont-ils compris ?", a: "Non. Une procédure fait l’objet d’une mission distincte, au tarif préférentiel des abonnés, avec un devis préalable." },
  {
    q: "L’abonnement tient-il lieu de DPO ?",
    a: (
      <>
        Non. La fonction de délégué à la protection des données fait l’objet d’une offre distincte, le <Link className={styles.lien} href="/dpo-externalise">DPO externalisé</Link>.
      </>
    ),
  },
  { q: "Quelle est la durée d’engagement ?", a: "Douze mois, renouvelables, avec une faculté de sortie sans frais à l’issue des trois premiers mois. Les conditions sont précisées dans la convention d’honoraires." },
  { q: "Et si ma question ne relève pas du numérique ?", a: "Droit social, sociétés, fiscalité : le cabinet qualifie le besoin puis, avec votre accord, le confie à un confrère." },
  { q: "Mon entreprise doit-elle appartenir au secteur technologique ?", a: "Non. Toute entreprise qui utilise des logiciels, des prestataires informatiques, des données ou de l’IA rencontre ces questions." },
];

function Personnes({ liste }: { liste: typeof AVOCATS }) {
  return (
    <ul>
      {liste.map((p) => (
        <li key={p.nom}>
          <span className={styles.portrait}>
            <Image src={p.m.photo} alt="" fill sizes="56px" style={{ objectFit: "cover", objectPosition: p.m.position ?? "center" }} />
          </span>
          <span>
            <span className={styles.equipeNom}>{p.nom}</span>
            <span className={styles.equipeTitre}>{p.titre}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ============================== A — Hero ============================ */}
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrille}`}>
          <div>
            <h1 className={styles.h1Surtitre}>Direction juridique externalisée</h1>
            <p className={styles.titreDisplay}>Votre avocat du numérique, au quotidien.</p>
            <p className={styles.heroP1}>Un avocat pour vos contrats informatiques, vos projets d’intelligence artificielle, vos données personnelles et vos litiges technologiques.</p>
            <p className={styles.heroP2}>Un accompagnement juridique régulier, adapté à votre activité, sans multiplier les consultations ponctuelles. Avec des experts techniques aux côtés des avocats.</p>
            <div className={styles.heroBoutons}>
              <a className={styles.btn} href="#formules">Découvrir notre accompagnement <span aria-hidden="true">↓</span></a>
              <Link className={styles.lienBlanc} href={CONTACT}>Échanger avec un avocat</Link>
            </div>
          </div>
          <aside className={styles.carteHero} aria-labelledby="carte-hero">
            <p className={styles.surtitre}>Premier échange · Sans engagement</p>
            <p className={styles.carteTitre} id="carte-hero">Parlons de vos besoins juridiques.</p>
            <p className={styles.carteTexte}>Présentez votre activité et vos besoins : le cabinet vous indique si un abonnement est adapté à votre entreprise, et lequel.</p>
            <Link className={styles.btn} href={CONTACT}>Échanger avec notre cabinet <span aria-hidden="true">→</span></Link>
            <ul className={styles.coches}>
              <li>Un avocat du cabinet, pas un commercial</li>
              <li>Une réponse franche si l’abonnement n’est pas pertinent</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ============================ B — 01 Pourquoi ======================= */}
      <section className={styles.sec} aria-labelledby="t-pourquoi">
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <p className={styles.surtitre}>01 — Pourquoi</p>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-pourquoi">Les questions juridiques du numérique ne surviennent pas une fois par an.</h2>
          </div>
          <div className={styles.trois}>
            <div className={styles.colFilet}>
              <h3>Un contrat à signer</h3>
              <p>Votre prestataire vous adresse un contrat dont les clauses de responsabilité, de propriété intellectuelle ou de résiliation méritent d’être vérifiées.</p>
            </div>
            <div className={styles.colFilet}>
              <h3>Une technologie à déployer</h3>
              <p>Vous intégrez une solution d’IA, lancez un logiciel ou exploitez de nouvelles données personnelles.</p>
            </div>
            <div className={styles.colFilet}>
              <h3>Un litige à prévenir</h3>
              <p>Un client conteste une prestation, un fournisseur ne tient pas ses engagements, une difficulté contractuelle apparaît.</p>
            </div>
          </div>
          <p className={styles.encadre}>Le droit est le plus utile lorsqu’il intervient avant la décision.</p>
        </div>
      </section>

      {/* ================= C — 02 Ce que vous pouvez nous demander ========== */}
      <section className={`${styles.sec} ${styles.ghost}`} aria-labelledby="t-demander">
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <p className={styles.surtitre}>02 — Ce que vous pouvez nous demander</p>
            <h2 className={styles.h2} id="t-demander">Une question. Un contrat. Un projet.</h2>
          </div>
          <div className={styles.trois} style={{ gap: 24 }}>
            {QUESTIONS.map((q) => (
              <div className={styles.carte} key={q.domaine}>
                <h3>{q.domaine}</h3>
                <p className={styles.carteQuestion}>{q.question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== D — 03 Comment votre avocat intervient-il ? ========= */}
      <section className={styles.sec} aria-labelledby="t-comment">
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <p className={styles.surtitre}>03 — Comment votre avocat intervient-il ?</p>
            <h2 className={styles.h2} id="t-comment">Une question posée, une réponse exploitable.</h2>
          </div>
          <ol className={styles.etapes}>
            <li>
              <span className={styles.etapeN} aria-hidden="true">01</span>
              <strong>Vous posez votre question.</strong>
              <span>Depuis votre espace client ou par e-mail, avec les documents utiles.</span>
            </li>
            <li>
              <span className={styles.etapeN} aria-hidden="true">02</span>
              <strong>Nous définissons l’intervention.</strong>
              <span>Sous un jour ouvré, votre avocat qualifie la demande et vous indique le travail nécessaire.</span>
            </li>
            <li>
              <span className={styles.etapeN} aria-hidden="true">03</span>
              <strong>Vous obtenez une réponse exploitable.</strong>
              <span>Un conseil, une analyse ou un document corrigé qui vous permet d’avancer.</span>
            </li>
          </ol>
          <div className={styles.cases}>
            <div>
              <p className={styles.caseLabel}>Avis rapide</p>
              <p>Une question sans document : « Puis-je faire ceci ? »</p>
            </div>
            <div>
              <p className={styles.caseLabel}>Demande courante</p>
              <p>Un contrat SaaS ou un DPA à relire, une clause à réécrire.</p>
            </div>
            <div className={styles.caseGrise}>
              <p className={styles.caseLabel}>Mission</p>
              <p>Une négociation longue, un audit, un contentieux : proposition distincte, avant toute diligence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= E — 04 Pourquoi le cabinet ================= */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="t-cabinet">
        <div className={styles.wrap}>
          <p className={styles.surtitre}>04 — Pourquoi le cabinet</p>
          <h2 className={styles.h2} id="t-cabinet">Comprendre la technologie pour mieux appliquer le droit.</h2>
          <p className={styles.intro}>Un contrat SaaS, une faille de sécurité ou un système d’intelligence artificielle ne s’examinent pas sous leur seul angle juridique. Ils exigent de comprendre leur fonctionnement, leurs risques et la responsabilité de chacun. C’est cette double compréhension qui caractérise le cabinet.</p>
          <div className={styles.bandeau}>
            <div>
              <p className={styles.bandeauChiffre}>2016</p>
              <p>Création du cabinet, consacré au droit du numérique depuis l’origine</p>
            </div>
            <div>
              <p className={styles.bandeauTitre}>Une pratique consacrée au numérique</p>
              <p>Droit du numérique, contrats informatiques, intelligence artificielle et protection des données.</p>
            </div>
            <div>
              <p className={styles.bandeauTitre}>Une compréhension technique</p>
              <p>Une approche juridique qui tient compte du fonctionnement réel des technologies.</p>
            </div>
            <div>
              <p className={styles.bandeauTitre}>Un accompagnement personnalisé</p>
              <p>Des avocats identifiés qui connaissent les activités et les enjeux de leurs clients.</p>
            </div>
          </div>
          <div className={styles.equipe}>
            <div>
              <h3 className={styles.surtitre}>Les avocats</h3>
              <Personnes liste={AVOCATS} />
            </div>
            <div>
              <h3 className={styles.surtitre}>Les experts techniques</h3>
              <Personnes liste={TECHNIQUES} />
              <p className={styles.equipeNote}>L’intervention d’un expert technique fait l’objet d’une proposition distincte, communiquée avant toute diligence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== F — 05 Les abonnements ==================== */}
      <section className={styles.sec} id="formules" aria-labelledby="t-formules" style={{ scrollMarginTop: "var(--header-h-compact)" }}>
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <p className={styles.surtitre}>05 — Les abonnements</p>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-formules">Trois abonnements, selon la relation que vous voulez avec le cabinet.</h2>
          </div>
          <div className={styles.formules}>
            {FORMULES.map((f) => (
              <article className={`${styles.formule}${f.vedette ? ` ${styles.vedette}` : ""}`} key={f.nom}>
                <h3 className={styles.formuleNom}>
                  {f.nom}
                  {f.badge ? <span className={styles.badge}>{f.badge}</span> : null}
                </h3>
                <p className={styles.relation}>{f.relation}</p>
                <p className={styles.prix}>
                  <b>{f.prix}</b>
                  <span>€ HT / mois</span>
                </p>
                <p className={styles.promesse}>{f.promesse}</p>
                <p className={styles.demandes}>
                  <strong>{f.demandes}.</strong>
                  {f.exemple}
                </p>
                <ul className={styles.inclus}>
                  {f.inclus.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <Link className={f.vedette ? styles.btn : styles.btnContour} href={CONTACT}>{f.bouton}</Link>
              </article>
            ))}
          </div>
          <p className={styles.note}>Engagement de douze mois, avec une faculté de sortie sans frais à l’issue des trois premiers mois. Factures mensuelles, demandes non reportées. Missions et expertise technique : 300 € HT de l’heure ou forfait sur devis.</p>
        </div>
      </section>

      {/* ============================ G — Aide au choix ===================== */}
      <section className={`${styles.sec} ${styles.ghost}`} aria-labelledby="t-aide">
        <div className={`${styles.wrap} ${styles.aide}`}>
          <div>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-aide">Vous ne savez pas quelle formule choisir ?</h2>
            <p>Décrivez votre activité et vos besoins juridiques. Le cabinet vous indiquera si un abonnement est pertinent, ou si une intervention ponctuelle serait plus adaptée.</p>
          </div>
          <Link className={styles.btn} href={CONTACT}>Échanger avec un avocat <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* ====================== H — 06 Votre espace client ================== */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="t-espace">
        <div className={`${styles.wrap} ${styles.espaceGrille}`}>
          <div>
            <p className={styles.surtitre}>06 — Votre espace client</p>
            <h2 className={styles.h2} id="t-espace">Le droit de l’entreprise, au même endroit.</h2>
            <ul className={styles.points}>
              <li><strong>Déposer une demande</strong><span>Transmettez une question ou un contrat à examiner.</span></li>
              <li><strong>Suivre les interventions</strong><span>Retrouvez vos dossiers, leur avancement et les prochaines étapes.</span></li>
              <li><strong>Conserver vos documents</strong><span>Accédez aux analyses, contrats et documents remis par le cabinet.</span></li>
            </ul>
          </div>
          <div>
            {/* Aperçu d'interface factice, non interactif : masqué aux lecteurs d'écran. */}
            <div className={styles.apercu} aria-hidden="true">
              <div className={styles.apercuTete}>Espace client · Conseil · octobre</div>
              <div className={styles.apercuBarre}>
                <span className={styles.apercuCompteur}>Demandes du mois <b>2 / 3</b></span>
                <span className={styles.apercuBouton}>+ Nouvelle demande</span>
              </div>
              <div className={styles.apercuLigne}><span>Contrat SaaS fournisseur</span><span className={styles.apercuEtat}>Analyse en cours</span></div>
              <div className={styles.apercuLigne}><span>Usage de l’IA par les équipes</span><span className={styles.apercuEtat}>Réponse disponible</span></div>
              <div className={styles.apercuLigne}><span>Prochain point avec votre avocat</span><span className={styles.apercuEtat}>22 octobre</span></div>
            </div>
            <p className={styles.legende}>Aperçu illustratif</p>
          </div>
        </div>
      </section>

      {/* ========================= I — Questions fréquentes ================= */}
      <section className={styles.sec} aria-labelledby="t-faq">
        <div className={`${styles.wrap} ${styles.etroit}`}>
          <h2 className={styles.h2} id="t-faq">Questions fréquentes</h2>
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary><h3>{f.q}</h3></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== J — CTA final ======================= */}
      <section className={`${styles.sec} ${styles.navy} ${styles.final}`} id="rendez-vous" aria-labelledby="t-final">
        <div className={styles.wrap}>
          <p className={styles.surtitre}>Une question ne devrait pas attendre de devenir un litige.</p>
          <h2 className={styles.finalTitre} id="t-final">Échanger avec notre cabinet.</h2>
          <p>Présentez votre entreprise et vos besoins. Le cabinet vous dira franchement si un abonnement est pertinent, et lequel.</p>
          <Link className={styles.btn} href={CONTACT}>Prendre rendez-vous <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
