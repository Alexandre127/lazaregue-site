import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./rgpd.module.css";
import { FAQ_ITEMS } from "./faq";
import { HeroVideo } from "./_components/HeroVideo";
import { SpecimenViewer } from "./_components/SpecimenViewer";
import { FaqAccordion } from "./_components/FaqAccordion";
import { TrackedLink } from "./_components/TrackedLink";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/rgpd-donnees-personnelles";

const TITLE = "Avocat RGPD à Paris — Audit, conformité et CNIL";
const DESCRIPTION =
  "Avocats en RGPD et protection des données : audit, mise en conformité, contrats, violations de données et accompagnement CNIL des PME et ETI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Balisages : ne décrivent que du contenu réellement visible dans la page.
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
    { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
    { "@type": "ListItem", position: 3, name: "Avocat RGPD", item: `${URL_BASE}${PATH}` },
  ],
};
const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lazarègue Avocats",
  areaServed: "FR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 rue de Tilsitt",
    postalCode: "75017",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  telephone: "+33181706200",
  url: `${URL_BASE}${PATH}`,
  serviceType:
    "Conformité RGPD, audit, contrats de sous-traitance, violations de données, procédures CNIL",
};
// FAQPage strictement limité aux cinq questions visibles, textes identiques.
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SITUATIONS: { t: string; p: string }[] = [
  { t: "Vous devez vous mettre en conformité", p: "Votre activité traite des données personnelles sans documentation formalisée. Vous voulez savoir où vous en êtes et par quoi commencer." },
  { t: "Vos prestataires ne sont pas encadrés", p: "Vos outils et vos sous-traitants traitent vos données sans clauses suffisantes. Vos clients ou votre assureur réclament ces garanties." },
  { t: "Vous lancez un produit ou un outil d’IA", p: "Un nouveau service doit intégrer la protection des données dès sa conception. Les choix techniques sont en cours d’arbitrage." },
  { t: "Vous subissez une violation de données", p: "Fuite, rançongiciel ou envoi erroné : vous devez décider vite s’il faut notifier la CNIL et informer les personnes concernées." },
  { t: "Vous êtes contrôlé par la CNIL", p: "Vous avez reçu un questionnaire, un avis de contrôle ou une demande d’information. Vos réponses engagent la suite de la procédure." },
  { t: "Vous préparez une acquisition ou une levée", p: "L’acquéreur ou l’investisseur audite votre conformité. Les écarts identifiés peuvent affecter l’évaluation du risque, les garanties ou les conditions de l’opération." },
  { t: "Vous voulez un appui régulier", p: "Vous n’avez pas de juriste dédié à ces sujets. Vous cherchez un interlocuteur disponible au fil de vos projets." },
];

const MISSIONS: { t: string; p: string }[] = [
  { t: "Auditer", p: "Le cabinet examine vos traitements, vos outils, vos contrats et vos pratiques réelles, au-delà des documents déjà rédigés, et hiérarchise les écarts par niveau de risque." },
  { t: "Mettre en conformité", p: "Le cabinet rédige et met à jour la documentation exigée par le règlement, en la rattachant à votre activité réelle plutôt qu’à un modèle générique." },
  { t: "Sécuriser les contrats et les prestataires", p: "Le cabinet négocie et rédige les clauses de sous-traitance, arbitre les responsabilités entre les parties et encadre les transferts hors Union européenne." },
  { t: "Accompagner les projets dès leur conception", p: "Le cabinet intervient au moment des choix techniques, avant la mise en production, et non pour constater ensuite des écarts devenus coûteux à corriger." },
];

const METHODE: { t: string; p: string }[] = [
  { t: "Premier échange", p: "Votre activité, vos outils, le degré d’urgence et le périmètre à traiter." },
  { t: "Audit", p: "Entretiens, examen des contrats et des traitements, constat des écarts." },
  { t: "Plan d’action", p: "Priorisation par risque, par coût et par délai, validée avec la direction." },
  { t: "Mise en œuvre", p: "Rédaction des documents, négociation des contrats, appui aux équipes." },
  { t: "Suivi", p: "Mise à jour de la documentation et point périodique sur les nouveaux projets." },
];

const ARGUMENTS: { t: string; p: string }[] = [
  { t: "Une approche juridique, contractuelle et contentieuse", p: "La conformité est traitée comme un dossier susceptible d’être discuté : devant la CNIL, face à un client, à un assureur ou à un juge." },
  { t: "Un accompagnement calibré pour les PME et les ETI", p: "Le cabinet travaille avec des entreprises qui n’ont pas de direction juridique dédiée à ces sujets, et adapte la documentation à leurs moyens réels." },
  { t: "Un cabinet de droit du numérique depuis 2016", p: "Le cabinet exerce en droit du numérique depuis 2016 et intervient sur l’ensemble du territoire." },
  { t: "Des interlocuteurs identifiés", p: "Un avocat identifié conduit la mission, suit les échanges et reste votre interlocuteur tout au long du dossier." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* Contenu essentiel visible sans JS : révèle les panneaux masqués. */}
      <noscript>
        <style>{`.spec-panel[hidden],.faq-panel[hidden]{display:block!important}.spec-panel{position:static!important}`}</style>
      </noscript>

      {/* Lien d'évitement (UX-159) — première cible utile de la page. */}
      <a className={styles.skipLink} href="#contenu-principal">Aller au contenu principal</a>

      <main id="contenu-principal" className={styles.rgpd}>
        {/* ============ 1. HERO ============ */}
        <div className="hero dark">
          <div className="wrap">
            <nav className="breadcrumb" aria-label="Fil d’Ariane">
              <ol>
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/nos-domaines">Nos domaines</Link></li>
                <li><span aria-current="page">Avocat RGPD</span></li>
              </ol>
            </nav>
            <div className="hero-grid">
              <div>
                <p className="badge">RGPD &amp; DONNÉES · PARIS</p>
                <h1>Avocat RGPD pour les entreprises</h1>
                <p className="lead">Le cabinet accompagne les PME et les ETI pour auditer leurs pratiques, corriger les risques et rendre leur conformité démontrable. Vous disposez d’un plan d’action et de documents adaptés à votre activité.</p>
                <TrackedLink href="/contact" event="cta_principal" className="btn btn-primary">Échanger avec un avocat</TrackedLink>
              </div>
              <HeroVideo />
            </div>
            <ul className="reperes">
              <li><b>Audit</b><span>Cartographie des traitements, registre, plan d’action priorisé.</span></li>
              <li><b>Documents et contrats</b><span>Politiques, mentions d’information, contrats de sous-traitance.</span></li>
              <li><b>Violations et CNIL</b><span>Notification dans les délais, réponse aux contrôles et aux procédures.</span></li>
            </ul>
          </div>
        </div>

        {/* ============ 2. SITUATIONS ============ */}
        <section id="situations">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">votre situation</p>
              <h2>Dans quelle situation êtes-vous&nbsp;?</h2>
            </div>
            <ul className="situations">
              {SITUATIONS.map((s) => (
                <li key={s.t}><h3>{s.t}</h3><p>{s.p}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 3. MISSIONS ============ */}
        <section className="tint" id="missions">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">nos interventions</p>
              <h2>Les quatre missions du cabinet</h2>
            </div>
            <ul className="missions">
              {MISSIONS.map((m) => (
                <li key={m.t}><h3>{m.t}</h3><p>{m.p}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 4. LIVRABLES + SPÉCIMENS ============ */}
        <section id="livrables">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">livrables</p>
              <h2>Ce que le cabinet vous remet</h2>
              <p className="lead">Selon la mission, le cabinet peut remettre les documents suivants. Quatre exemples sont présentés ci-dessous.</p>
            </div>

            <div className="livrables-groupes">
              <div>
                <h3>Diagnostic</h3>
                <ul className="livrables">
                  <li>Cartographie des traitements et des flux de données</li>
                  <li>Registre des activités de traitement</li>
                  <li>Rapport d’audit et plan d’action priorisé</li>
                </ul>
              </div>
              <div>
                <h3>Documents et contrats</h3>
                <ul className="livrables">
                  <li>Politique de confidentialité et mentions d’information</li>
                  <li>Politique cookies et paramétrage du bandeau</li>
                  <li>Contrats et clauses de sous-traitance, article&nbsp;28</li>
                  <li>Encadrement des transferts hors Union européenne</li>
                </ul>
              </div>
              <div>
                <h3>Procédures internes</h3>
                <ul className="livrables">
                  <li>Procédure de réponse aux demandes d’exercice des droits</li>
                  <li>Procédure de gestion et de notification des violations</li>
                  <li>Charte informatique et politique interne de protection des données</li>
                </ul>
              </div>
            </div>

            <h3>Quatre extraits</h3>
            <SpecimenViewer />
          </div>
        </section>

        {/* ============ 5. URGENCES ============ */}
        <section className="tint" id="urgences">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">situations urgentes</p>
              <h2>Violation de données et contrôle CNIL</h2>
            </div>
            <div className="urgences">
              <div className="urg">
                <p className="delai">72 heures</p>
                <h3>Violation de données</h3>
                <p>Intrusion, rançongiciel, fuite de fichiers ou envoi erroné&nbsp;: le responsable de traitement dispose d’un délai très court pour notifier la CNIL lorsque la violation présente un risque pour les personnes.</p>
                <p>Le cabinet qualifie les faits, arbitre la notification, rédige les communications et documente la décision, en lien avec vos équipes techniques et, lorsque l’incident l’exige, avec le volet <Link href="/nos-domaines/cybersecurite">cybersécurité</Link> du dossier.</p>
                <TrackedLink href="/contact" event="cta_violation" className="btn btn-urgent">Signaler une violation</TrackedLink>
              </div>
              <div className="urg">
                <p className="delai">procédure en cours</p>
                <h3>Contrôle ou procédure CNIL</h3>
                <p>Questionnaire écrit, contrôle sur place, contrôle en ligne ou mise en demeure&nbsp;: chaque réponse écrite devient une pièce du dossier et détermine la suite de la procédure.</p>
                <p>Le cabinet prépare les réponses, encadre les échanges et assure la défense de l’entreprise devant la formation restreinte si la procédure se poursuit.</p>
                <TrackedLink href="/contact" event="cta_cnil" className="btn btn-urgent">Être assisté face à la CNIL</TrackedLink>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 6. ACCOMPAGNEMENTS SPÉCIALISÉS ============ */}
        <section id="specialises">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">accompagnements spécialisés</p>
              <h2>Prolongements de la mission</h2>
            </div>
            <ul className="renvois">
              <li>
                <h3>DPO externalisé</h3>
                <p>Une fonction de délégué à la protection des données assurée par le cabinet, au forfait et dans la durée.</p>
                {/* TODO(page à créer) : /nos-domaines/dpo-externalise n'existe pas encore. */}
                <Link className="link-nav" href="/nos-domaines/dpo-externalise">Découvrir le DPO externalisé</Link>
              </li>
              <li>
                <h3>M&amp;A Tech et due diligence</h3>
                <p>L’examen de la conformité dans les opérations d’acquisition, de cession et de levée de fonds.</p>
                <Link className="link-nav" href="/nos-domaines/ma-tech">Découvrir le M&amp;A Tech</Link>
              </li>
              <li>
                <h3>AI Act et projets d’intelligence artificielle</h3>
                <p>L’articulation entre le règlement sur l’intelligence artificielle et la protection des données.</p>
                <Link className="link-nav" href="/nos-domaines/avocat-intelligence-artificielle">Découvrir l’AI Act</Link>
              </li>
            </ul>
          </div>
        </section>

        {/* ============ 7. MÉTHODE ============ */}
        <section className="dark" id="methode">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">méthode</p>
              <h2>Comment se déroule une mission RGPD&nbsp;?</h2>
            </div>
            <ol className="methode">
              {METHODE.map((m) => (
                <li key={m.t}><h3>{m.t}</h3><p>{m.p}</p></li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 8. POURQUOI ============ */}
        <section id="pourquoi">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">le cabinet</p>
              <h2>Pourquoi Lazarègue Avocats</h2>
            </div>
            <div className="pourquoi">
              <ul className="arguments">
                {ARGUMENTS.map((a) => (
                  <li key={a.t}><h3>{a.t}</h3><p>{a.p}</p></li>
                ))}
              </ul>
              <div>
                <div className="portrait">
                  <div className="shot">
                    <Image
                      src="/images/equipe/sarah-hinderer.webp"
                      alt="Me Sarah Hinderer, avocate en droit des données personnelles"
                      fill
                      sizes="(min-width:900px) 380px, (min-width:640px) 45vw, 100vw"
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <b>Me Sarah Hinderer</b>
                  <span className="role">Avocate aux barreaux de Paris et de Montréal. Intervient sur les audits, la documentation de conformité et les procédures CNIL.</span>
                </div>
                {/* À intégrer ultérieurement : deux dossiers anonymisés réels et une
                    publication ou intervention pertinente. Ne rien afficher tant que
                    cette matière n’est pas fournie. */}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 9. HONORAIRES ============ */}
        <section className="tint" id="honoraires">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">honoraires</p>
              <h2>Combien coûte l’intervention d’un avocat RGPD&nbsp;?</h2>
            </div>
            <div className="honoraires">
              <div>
                <p>Le périmètre est arrêté par écrit avant tout démarrage. Lorsqu’il peut être précisément délimité — audit, documentation de conformité ou ensemble de contrats — le cabinet propose un forfait.</p>
                <p>Lorsqu’une mission dépend d’événements extérieurs, notamment en cas de violation de données ou de procédure devant la CNIL, elle peut être facturée au temps passé sur la base d’un taux horaire annoncé à l’avance.</p>
                <p>Aucune prestation n’est engagée sans accord préalable sur son étendue et sur son coût.</p>
              </div>
              <div>
                <h3>Ce qui fait varier le prix</h3>
                <ul className="facteurs">
                  <li>Le nombre et la sensibilité des traitements</li>
                  <li>Le nombre d’outils et de prestataires à examiner</li>
                  <li>L’existence de transferts hors Union européenne</li>
                  <li>L’état de la documentation déjà en place</li>
                  <li>Le degré d’urgence de la situation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 10. FAQ ============ */}
        <section id="faq">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">questions fréquentes</p>
              <h2>Questions fréquentes sur l’accompagnement RGPD</h2>
            </div>
            <FaqAccordion />
            <p className="faq-suite">
              Deux sujets voisins sont traités à part&nbsp;:{" "}
              {/* TODO(URL à renseigner) : ressource « IA et salariés ». */}
              <Link href="/ressources/ia-salaries">l’usage des outils d’intelligence artificielle par les salariés</Link>{" "}
              et{" "}
              {/* TODO(URL à renseigner) : ressource « hébergeurs américains ». */}
              <Link href="/ressources/hebergeurs-americains">le recours aux solutions hébergées par des fournisseurs américains</Link>.
            </p>
          </div>
        </section>

        {/* ============ 11. CONTACT FINAL ============ */}
        <section className="dark final" id="contact">
          <div className="wrap">
            <p className="label">contact</p>
            <h2>Parlons de votre situation</h2>
            <p className="lead">Le cabinet intervient pour un audit, pour un projet en cours, pour une violation de données ou pour un contrôle de la CNIL. Le premier échange permet de situer l’urgence et de définir le périmètre.</p>
            <TrackedLink href="/contact" event="cta_principal" className="btn btn-primary">Échanger avec un avocat</TrackedLink>
          </div>
        </section>

        {/* Barre de contact mobile (< 768px), masquée quand la modale est ouverte. */}
        <div className="barre">
          <TrackedLink href="tel:+33181706200" event="clic_telephone" className="tel" ariaLabel="Appeler le cabinet au 01 81 70 62 00">
            <span className="tel-long" aria-hidden="true">01 81 70 62 00</span>
            <span className="tel-court" aria-hidden="true">Appeler</span>
          </TrackedLink>
          <TrackedLink href="/contact" event="cta_principal" className="btn btn-primary">Échanger avec un avocat</TrackedLink>
        </div>
      </main>
    </>
  );
}
