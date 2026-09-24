import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./rgpd.module.css";
import { FAQ_ITEMS } from "./faq";
import { HeroVideo } from "./_components/HeroVideo";
import { FaqAccordion } from "./_components/FaqAccordion";
import { TrackedLink } from "./_components/TrackedLink";
import { SpecimensRecus } from "./_components/SpecimensRecus";
import { TerrainCards } from "./_components/TerrainCards";

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

/* Phrase de réassurance, reprise de la section honoraires (lot 2). Ajoutée sous
   les points d'action (hero, bouton intermédiaire, contact final). */
const REASSURANCE =
  "Premier échange pour comprendre votre besoin. Mission et honoraires convenus par écrit avant de commencer.";

/* Cinq situations : les deux situations d'urgence (violation de données,
   contrôle CNIL) sont désormais traitées par la section « situations urgentes »
   placée juste après le hero (lot 4). */
const SITUATIONS: { t: string; p: string; cta: string }[] = [
  { t: "Vous devez vous mettre en conformité", p: "Votre activité traite des données personnelles sans documentation formalisée. Vous voulez savoir où vous en êtes et par quoi commencer.", cta: "Faire le point sur la conformité" },
  { t: "Vos prestataires ne sont pas encadrés", p: "Vos outils et vos sous-traitants traitent vos données sans clauses suffisantes. Vos clients ou votre assureur réclament ces garanties.", cta: "Encadrer les contrats" },
  { t: "Vous lancez un produit ou un outil d’intelligence artificielle", p: "Un nouveau service doit intégrer la protection des données dès sa conception. Les choix techniques sont actuellement en cours d’arbitrage.", cta: "Intégrer la protection des données" },
  { t: "Vous préparez une acquisition ou une levée de fonds", p: "Un examen de votre conformité sera effectué par l’acquéreur ou l’investisseur. Les écarts identifiés peuvent influencer l’évaluation du risque, les garanties ou les conditions de l’opération.", cta: "Préparer l’opération" },
  { t: "Un accompagnement RGPD dans la durée", p: "Un avocat identifié suit vos questions, vos contrats et l’évolution de vos projets, en lien avec vos équipes. Lorsque les conditions sont réunies, la fonction de délégué à la protection des données peut être assurée par le cabinet.", cta: "Échanger sur votre suivi RGPD" },
];

/* Quatre temps de la mise en conformité — contenu restauré de l'ancienne page
   (registre Art. 30, AIPD, DPO, procédures des droits, contrats Art. 28,
   transferts hors UE, sécurité Art. 32, privacy by design Art. 25, violations
   et notification CNIL, documentation d'accountability). */
const MC_BLOCKS: { titre: string; resume: string; detail: string }[] = [
  {
    titre: "Cartographier",
    resume: "Savoir ce que vous traitez — et pourquoi",
    detail: "Cartographie des traitements, registre Art. 30 avec base légale documentée, identification des AIPD nécessaires.",
  },
  {
    titre: "Organiser",
    resume: "Répartir les rôles et les responsabilités",
    detail: "DPO interne ou externe, politiques internes, procédures de réponse aux droits des personnes, comités de suivi.",
  },
  {
    titre: "Encadrer",
    resume: "Maîtriser votre exposition contractuelle et technique",
    detail: "Contrats sous-traitants Art. 28, clauses négociées, transferts hors UE (CCT, BCR), mesures de sécurité Art. 32 et protection des données dès la conception (privacy by design, Art. 25).",
  },
  {
    titre: "Documenter",
    resume: "Être prêt à démontrer, à tout moment",
    detail: "Procédures de violation et de notification CNIL, traçabilité des décisions, documentation tenue à jour en vue d’un contrôle.",
  },
];

const ARGUMENTS: { t: string; p: string }[] = [
  { t: "Une approche juridique, contractuelle et contentieuse", p: "La conformité est traitée comme un dossier susceptible d’être examiné par la CNIL, un client, un assureur ou un tribunal." },
  { t: "Un accompagnement adapté aux PME et aux ETI", p: "Le cabinet travaille avec des entreprises qui ne disposent pas d’une direction juridique dédiée à ces sujets. Il adapte la documentation à leurs moyens réels." },
  { t: "Un cabinet de droit du numérique depuis 2016", p: "Le cabinet exerce en droit du numérique depuis 2016 et intervient sur l’ensemble du territoire." },
  { t: "Des interlocuteurs identifiés", p: "Un avocat désigné conduit la mission, supervise les échanges et demeure votre interlocuteur tout au long du dossier." },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* Contenu essentiel visible sans JS : révèle les panneaux FAQ masqués. */}
      <noscript>
        <style>{`.faq-panel[hidden]{display:block!important}`}</style>
      </noscript>

      {/* Lien d'évitement (UX-159) — première cible utile de la page. */}
      <a className={styles.skipLink} href="#contenu-principal">Aller au contenu principal</a>

      <main id="contenu-principal" className={styles.rgpd}>
        {/* ============ 1. HERO ============ */}
        <div className="hero dark">
          {/* Vidéo de fond, fondue dans la section (aucun cadre) — cf. HeroVideo. */}
          <HeroVideo />
          <div className="wrap">
            <nav className="breadcrumb" aria-label="Fil d’Ariane">
              <ol>
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/nos-domaines">Nos domaines</Link></li>
                <li><span aria-current="page">Avocat RGPD</span></li>
              </ol>
            </nav>
            <div className="hero-main">
              <p className="badge">RGPD &amp; DONNÉES · PARIS</p>
              <h1>Avocat RGPD <span>pour les entreprises</span></h1>
              <p className="lead"><span className="lead-s1">Le cabinet accompagne les PME et les ETI pour auditer leurs pratiques, corriger les écarts et rendre leur conformité démontrable.</span> <span className="lead-s2">Selon votre besoin, le cabinet établit un plan d’action et prépare les documents adaptés à votre activité.</span></p>
              <div className="hero-actions">
                <TrackedLink href="/contact" event="cta_principal" className="btn btn-primary">Échanger avec un avocat <span aria-hidden="true">→</span></TrackedLink>
                <a className="link-nav" href="#urgences">Une violation ou un contrôle CNIL ? <span aria-hidden="true">→</span></a>
              </div>
              <p className="reassurance reassurance-dark">{REASSURANCE}</p>
            </div>
          </div>
        </div>

        {/* ============ 2. SITUATIONS URGENTES (remontées juste après le hero) ============ */}
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
                <p>Intrusion, rançongiciel, fuite de fichiers ou envoi erroné&nbsp;: le responsable de traitement doit informer la CNIL dans un délai très court lorsque l’incident présente un risque pour les personnes concernées.</p>
                <p className="urg-more">Le cabinet qualifie les faits, arbitre la notification, rédige les communications et documente la décision. Il travaille en étroite collaboration avec vos équipes techniques et, lorsque l’incident l’exige, avec le volet <Link href="/nos-domaines/cybersecurite">cybersécurité</Link> du dossier.</p>
                <TrackedLink href="/contact" event="cta_violation" className="btn btn-urgent">Contacter un avocat après une violation</TrackedLink>
              </div>
              <div className="urg">
                <p className="delai">procédure en cours</p>
                <h3>Contrôle ou procédure CNIL</h3>
                <p>Questionnaire écrit, contrôle sur place, contrôle sur pièces ou mise en demeure&nbsp;: chaque réponse écrite devient une pièce du dossier et détermine la suite de la procédure.</p>
                <p className="urg-more">Le cabinet élabore les réponses, encadre les échanges et assure la défense de l’entreprise devant la formation restreinte de la CNIL si la procédure se poursuit.</p>
                <TrackedLink href="/contact" event="cta_cnil" className="btn btn-urgent">Être assisté face à la CNIL</TrackedLink>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. SITUATIONS ============ */}
        <section id="situations">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">votre situation</p>
              <h2>Dans quelle situation êtes-vous&nbsp;?</h2>
              <p className="lead">Un projet à sécuriser, un écart à corriger ou une procédure en cours&nbsp;: accédez à l’accompagnement qui vous concerne.</p>
            </div>
            <ul className="situations">
              {SITUATIONS.map((s) => (
                <li key={s.t}>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  <Link className="link-nav" href="/contact">{s.cta} <span aria-hidden="true">→</span></Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 4. MÉTHODE — QUATRE TEMPS ============ */}
        <section className="tint" id="missions">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">notre méthode</p>
              <h2>Mise en conformité avec le RGPD&nbsp;: cartographier, organiser, encadrer et documenter</h2>
              <p className="lead">Le cabinet s’appuie sur vos pratiques réelles, hiérarchise les écarts selon le niveau de risque, puis structure la conformité en quatre étapes&nbsp;— jusqu’à une documentation prête à être démontrée.</p>
            </div>
            <ol className="mc-blocks">
              {MC_BLOCKS.map((b, i) => (
                <li key={b.titre}>
                  <span className="mc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{b.titre}</h3>
                  <p className="mc-resume">{b.resume}</p>
                  <p className="mc-detail">{b.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 5. LIVRABLES ============ */}
        {/* « Ce que vous recevez » : menu des livrables + document spécimen
            (aperçu + « Agrandir le document »). Extraits illustratifs anonymisés. */}
        <section id="livrables">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">livrables</p>
              <h2>Ce que vous recevez</h2>
              <p className="lead">À chaque mission correspondent des documents précis, rattachés à votre activité. En voici des exemples illustratifs, sans aucune donnée réelle.</p>
            </div>
            <SpecimensRecus />

            {/* 6. Bouton intermédiaire + réassurance (lot 4) */}
            <div className="mid-cta">
              <TrackedLink href="/contact" event="cta_intermediaire" className="btn btn-primary">Faire le point sur votre conformité <span aria-hidden="true">→</span></TrackedLink>
              <p className="reassurance">{REASSURANCE}</p>
            </div>
          </div>
        </section>

        {/* ============ 7. SUR LE TERRAIN ============ */}
        <section id="terrain">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">sur le terrain</p>
              <h2>Ce que nous voyons le plus souvent</h2>
              <p className="lead">Les situations les plus fréquentes&nbsp;— et ce qui se passe concrètement quand elles ne sont pas anticipées.</p>
            </div>
            <TerrainCards />
          </div>
        </section>

        {/* ============ 8. L'ÉQUIPE (section distincte, avant « Pourquoi ») ============ */}
        <section id="equipe">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">l’équipe</p>
              <h2>Les intervenants sur vos dossiers RGPD</h2>
            </div>
            <div className="team-row">
              <figure className="person">
                <div className="shot">
                  <Image
                    src="/images/equipe/sarah-hinderer.webp"
                    alt="Sarah Hinderer, avocate aux barreaux de Paris et de Montréal"
                    fill
                    sizes="(min-width:720px) 33vw, 100vw"
                    loading="lazy"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <figcaption>
                  <span className="role-eyebrow">Avocate</span>
                  <b>Sarah Hinderer</b>
                  <span className="role">Avocate aux barreaux de Paris et de Montréal.</span>
                  <span className="role">Données personnelles et intelligence artificielle.</span>
                </figcaption>
              </figure>
              <figure className="person">
                <div className="shot">
                  <Image
                    src="/images/alexandre-pro.jpg"
                    alt="Alexandre Lazarègue, avocat au barreau de Paris"
                    fill
                    sizes="(min-width:720px) 33vw, 100vw"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption>
                  <span className="role-eyebrow">Avocat</span>
                  <b>Alexandre Lazarègue</b>
                  <span className="role">Avocat au barreau de Paris.</span>
                  <span className="role">Analyse juridique et conduite de la mission.</span>
                </figcaption>
              </figure>
              <figure className="person technical-person">
                <div className="shot">
                  <Image
                    src="/images/khalid-pro.jpg"
                    alt="Khalid Sookia, appui technique en cybersécurité"
                    fill
                    sizes="(min-width:720px) 33vw, 100vw"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption>
                  <span className="role-eyebrow">Appui technique</span>
                  <b>Khalid Sookia</b>
                  <span className="role">Consultant en cybersécurité.</span>
                  <span className="role">Examen des faits techniques, des outils et des mesures de sécurité.</span>
                  <span className="role-note">N’exerce pas la profession d’avocat.</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ 9. POURQUOI ============ */}
        <section id="pourquoi">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">le cabinet</p>
              <h2>Pourquoi Lazarègue Avocats</h2>
            </div>
            <ul className="arguments pourquoi-args">
              {ARGUMENTS.map((a) => (
                <li key={a.t}><h3>{a.t}</h3><p>{a.p}</p></li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 10. HONORAIRES ============ */}
        <section className="tint" id="honoraires">
          <div className="wrap">
            <div className="sec-head">
              <p className="label">honoraires</p>
              <h2>Combien coûte l’intervention d’un avocat RGPD&nbsp;?</h2>
            </div>
            <div className="honoraires">
              <div>
                <p>Le premier échange permet de comprendre votre activité, votre besoin et son urgence. Avant de commencer, nous convenons par écrit de la mission, des documents à préparer et des honoraires.</p>
                <p>Lorsque le périmètre peut être précisément délimité — audit, documentation de conformité ou ensemble de contrats — le cabinet propose un forfait.</p>
                <p>En cas d’urgence (violation, procédure CNIL), les modalités sont convenues dès le premier échange.</p>
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

        {/* ============ 11. PROLONGEMENTS DE LA MISSION ============ */}
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
                {/* Page DPO dédiée à créer : on renvoie au parcours de contact réel plutôt qu'à une route inexistante. */}
                <Link className="link-nav" href="/contact">Échanger sur le DPO externalisé</Link>
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

        {/* ============ 12. FAQ ============ */}
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

        {/* ============ 13. CONTACT FINAL ============ */}
        <section className="dark final" id="contact">
          <div className="wrap">
            <p className="label">contact</p>
            <h2>Parlons de votre situation</h2>
            <p className="lead">Le cabinet intervient pour un audit, pour un projet en cours, pour une violation de données ou pour un contrôle de la CNIL. Le premier échange permet d’évaluer l’urgence de la situation et de définir le périmètre.</p>
            <TrackedLink href="/contact" event="cta_principal" className="btn btn-primary">Échanger avec un avocat</TrackedLink>
            <p className="reassurance reassurance-dark">{REASSURANCE}</p>
          </div>
        </section>
      </main>
    </>
  );
}
