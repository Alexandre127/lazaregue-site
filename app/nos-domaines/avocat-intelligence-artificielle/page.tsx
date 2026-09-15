import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./ia.module.css";
import { FAQ_IA } from "./faq-ia";
import { LivrablesPreview } from "./_components/LivrablesPreview";
import { FaqAccordion } from "./_components/FaqAccordion";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/avocat-intelligence-artificielle";

const TITLE = "Avocat IA à Paris – Conformité AI Act et gouvernance";
const DESCRIPTION =
  "Audit AI Act, registre des systèmes, charte IA, contrats, gouvernance et défense en cas de contrôle. Accompagnement des entreprises à Paris.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat IA & AI Act — Lazarègue Avocats",
      description:
        "Audit AI Act, registre des systèmes d'IA, charte IA, contrats fournisseurs, gouvernance et défense en cas de contrôle ou de contentieux.",
      url: `${URL_BASE}${PATH}`,
      areaServed: { "@type": "Country", name: "France" },
      serviceType: "Conformité AI Act, gouvernance de l'intelligence artificielle, audit de conformité IA, contentieux des systèmes d'IA",
      provider: { "@id": `${URL_BASE}/#cabinet` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Avocat en intelligence artificielle", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_IA.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
    },
    { "@type": "Person", name: "Alexandre Lazarègue", jobTitle: "Avocat au barreau de Paris", worksFor: { "@id": `${URL_BASE}/#cabinet` } },
    { "@type": "Person", name: "Nadia Abchiche-Mimouni", jobTitle: "Experte en intelligence artificielle", worksFor: { "@id": `${URL_BASE}/#cabinet` } },
  ],
};

const SITUATIONS: { n: string; theme: string; detail: string; examen: string }[] = [
  { n: "01", theme: "Usages des salariés", detail: "Vos salariés utilisent des outils d’IA générative, avec ou sans autorisation.", examen: "Encadrement des usages, protection des données et des secrets, information et consultation du CSE" },
  { n: "02", theme: "Recrutement et gestion des carrières", detail: "Un outil intervient dans le recrutement, l’évaluation ou la gestion des carrières.", examen: "Qualification possible en système à haut risque, supervision humaine, information des personnes" },
  { n: "03", theme: "IA intégrée à un produit", detail: "Vous intégrez une fonction d’IA à un produit ou un service vendu à des tiers.", examen: "Rôle éventuel de fournisseur, documentation technique, transparence lorsqu’elle est applicable et clauses fournisseurs" },
  { n: "04", theme: "Demande d’un client, d’un partenaire ou d’un donneur d’ordre", detail: "On vous demande de justifier la conformité de votre outil.", examen: "Constitution d’un dossier opposable : registre, documentation, chaîne contractuelle, preuves de contrôle" },
  { n: "05", theme: "Décision concernant une personne", detail: "Un algorithme décide ou pré-décide du sort de personnes physiques.", examen: "Analyse d’impact, base légale, droits des personnes, articulation avec le RGPD" },
  { n: "06", theme: "Incident, contrôle ou réclamation", detail: "Une difficulté est déjà survenue.", examen: "Reconstitution des faits, examen technique du système, stratégie de réponse et de défense" },
];

const DUTIES: [string, string][] = [
  ["Vous utilisez des outils d’IA dans vos activités", "Recenser les usages, vérifier l’absence de pratique interdite, assurer une maîtrise suffisante de l’IA et encadrer les données, les secrets et les usages internes selon les règles applicables"],
  ["Vous déployez un système à haut risque", "Respecter la notice, organiser la supervision humaine, contrôler les données d’entrée, surveiller le fonctionnement, conserver les journaux et informer les personnes concernées"],
  ["Vous développez ou commercialisez un système sous votre nom", "Organiser la gestion des risques, la gouvernance des données, la documentation technique, la traçabilité, la conformité du système et la surveillance après commercialisation"],
  ["Votre système interagit avec le public ou génère des contenus", "Vérifier les obligations d’information, d’identification ou de signalement des contenus artificiels"],
  ["Vous intégrez une solution tierce dans un produit ou un processus sensible", "Vérifier la répartition contractuelle des rôles, l’accès à la documentation, aux journaux et aux informations nécessaires en cas d’incident ou de contrôle"],
];

const TIMELINE: [string, string][] = [
  ["depuis le 2 février 2025", "Pratiques interdites de l’article 5 et obligation de maîtrise de l’IA au sein des équipes."],
  ["depuis le 2 août 2026", "Application générale du règlement. Cette date n’a pas été déplacée par le règlement modificatif. Les obligations de transparence de l’article 50 sont exigibles."],
  ["2 décembre 2026", "Marquage lisible par machine des contenus produits ou modifiés par un système d’IA, et nouvelles pratiques interdites introduites par le règlement modificatif."],
  ["2 décembre 2027", "Exigences applicables aux systèmes à haut risque relevant de l’annexe III — emploi, éducation, accès aux services essentiels, biométrie."],
  ["2 août 2028", "Exigences applicables aux systèmes à haut risque liés aux produits de l’annexe I, déjà soumis à une législation d’harmonisation."],
  ["à retenir", "Le report d’une échéance ne suspend ni le RGPD, ni le droit du travail, ni vos engagements contractuels : une obligation non encore exigible au titre du règlement peut être opposée devant un juge civil ou prud’homal sur un autre fondement."],
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className={styles.skipLink} href="#contenu">Aller au contenu principal</a>

      <main id="contenu" className={styles.ia}>
        {/* 1. HERO */}
        <div className="hero">
          <div className="wrap">
            <nav className="breadcrumb" aria-label="Fil d’Ariane">
              <ol>
                <li><Link href="/">Accueil</Link></li>
                <li><Link href="/nos-domaines">Nos domaines</Link></li>
                <li><span aria-current="page">Avocat en intelligence artificielle</span></li>
              </ol>
            </nav>
            <div className="hero-grid">
              <div>
                <p className="eyebrow">Avocat en intelligence artificielle à Paris</p>
                <h1>Mise en conformité AI Act et gouvernance IA</h1>
                <p className="hero-sub">Identifiez les obligations applicables à chaque système d’IA et constituez les preuves de votre conformité.</p>
                <p className="hero-target">Le cabinet accompagne les entreprises qui utilisent, intègrent ou commercialisent des systèmes d’intelligence artificielle : qualification des usages, documentation, contrats et défense en cas de contrôle ou de contentieux.</p>
                <div className="hero-actions">
                  <Link className="btn" href="/contact">Parler de votre situation</Link>
                  <a className="btn btn-ghost" href="#livrables">Voir les documents remis</a>
                </div>
              </div>
              <div className="hero-visual">
                <Image src="/images/ia-act-hero.jpg" alt="" fill sizes="(max-width:900px) 100vw, 33vw" priority style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. ÊTES-VOUS CONCERNÉ ? */}
        <section id="concerne">
          <div className="wrap">
            <p className="label">situations</p>
            <h2 className="wide">Êtes-vous concerné&nbsp;?</h2>
            <p className="lede">Les obligations ne sont pas les mêmes pour toutes les entreprises. Elles dépendent du système utilisé, de sa finalité et du rôle tenu par l’entreprise. Voici les situations qui conduisent le plus souvent à consulter le cabinet.</p>
            <table className="tbl situations">
              <caption>Situations rencontrées et principales questions à examiner.</caption>
              <thead><tr><th scope="col">Votre situation</th><th scope="col">Ce qu’il faut examiner</th></tr></thead>
              <tbody>
                {SITUATIONS.map((s) => (
                  <tr key={s.n}>
                    <td>
                      <span className="num">{s.n}</span>
                      <span className="theme">{s.theme}</span>
                      <span className="detail">{s.detail}</span>
                    </td>
                    <td data-prefix="À examiner — ">{s.examen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. QUEL RÉGIME S'APPLIQUE ? */}
        <section className="bg-ghost tight">
          <div className="wrap">
            <p className="label">principe de lecture</p>
            <h2 className="wide">Quel régime s’applique à votre système&nbsp;?</h2>
            <p className="lede">Une entreprise n’est pas globalement « conforme » ou « non conforme » à l’AI Act. Chaque système doit être examiné selon son usage réel, le rôle tenu par l’entreprise et son niveau de risque. Un système, un usage, une fiche.</p>
            <div className="criteria">
              <div className="criterion">
                <h3>L’usage réel et le niveau de risque</h3>
                <p>Assistant de rédaction, outil de scoring, présélection de candidatures, génération de contenus ou fonction d’IA intégrée à un produit : le régime dépend principalement de l’usage réel du système. Celui-ci peut relever d’une pratique interdite, du haut risque, d’une obligation de transparence ou d’aucune obligation spécifique.</p>
              </div>
              <div className="criterion">
                <h3>Le rôle de l’entreprise</h3>
                <p className="role-def"><strong>Déployeur :</strong> l’entreprise utilise un système d’IA sous sa propre responsabilité.</p>
                <p className="role-def"><strong>Fournisseur :</strong> elle développe un système, le fait développer ou le commercialise sous son nom ou sa marque.</p>
                <p className="role-def">Elle peut également être importatrice ou distributrice lorsqu’elle met un système à disposition sur le marché européen.</p>
                <p>Une adaptation importante du système ou un changement de sa destination peut modifier le rôle initial de l’entreprise.</p>
              </div>
              <div className="criterion">
                <h3>Les règles déjà applicables</h3>
                <p>Le RGPD, le droit du travail et les contrats conclus avec les fournisseurs s’appliquent indépendamment du calendrier européen. Les personnes concernées — salariés, candidats, clients, assurés, utilisateurs — et les données traitées s’apprécient à l’intérieur de ces trois régimes.</p>
              </div>
            </div>
            <p className="criteria-note">La même entreprise peut être simple déployeur pour un assistant de rédaction, déployeur d’un système à haut risque pour le recrutement, et fournisseur pour une solution qu’elle commercialise sous sa marque. L’analyse se conduit système par système, et non entreprise par entreprise.</p>
          </div>
        </section>

        {/* 4. LES MESURES À METTRE EN PLACE */}
        <section className="tight">
          <div className="wrap">
            <p className="label">obligations</p>
            <h2 className="wide">Concrètement, que devez-vous mettre en place&nbsp;?</h2>
            <p className="lede">La qualification n’est qu’une première étape. Elle permet de déterminer, système par système, les mesures que l’entreprise doit effectivement mettre en place. Ces obligations ne sont pas identiques pour un utilisateur, un fournisseur ou un distributeur, et elles varient selon le niveau de risque et l’usage concerné.</p>
            <table className="tbl duties">
              <caption>Principales mesures selon la situation de l’entreprise.</caption>
              <thead><tr><th scope="col">Votre situation</th><th scope="col">Ce que l’entreprise doit notamment organiser</th></tr></thead>
              <tbody>
                {DUTIES.map(([sit, org]) => (
                  <tr key={sit}><td>{sit}</td><td data-prefix="À organiser — ">{org}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="criteria-note">Ces mesures ne s’appliquent pas indistinctement. Leur contenu dépend de la qualification de chaque système, des conditions réelles de son utilisation, des contrats conclus et du calendrier applicable.</p>
          </div>
        </section>

        {/* 5. QUATRE MISSIONS + CTA INTERMÉDIAIRE */}
        <section id="missions" className="bg-ghost">
          <div className="wrap">
            <p className="label">nos interventions</p>
            <h2 className="wide">Audit, gouvernance et conformité IA</h2>
            <p className="lede">Le cabinet transforme cette qualification réglementaire en un plan de conformité applicable dans l’entreprise, et en preuves pouvant être présentées à un client, une autorité ou un juge.</p>
            <div className="missions">
              <div className="mission">
                <span className="n">01</span>
                <h3>Audit et diagnostic AI Act</h3>
                <ul>
                  <li>Inventaire des systèmes et des usages réels</li>
                  <li>Qualification des rôles et des niveaux de risque</li>
                  <li>Établissement des obligations applicables à chaque système</li>
                  <li>Identification des écarts, des mesures à prendre et des priorités</li>
                </ul>
              </div>
              <div className="mission">
                <span className="n">02</span>
                <h3>Gouvernance et procédures internes</h3>
                <ul>
                  <li>Encadrement des usages internes</li>
                  <li>Procédure d’arrivée d’un nouvel outil</li>
                  <li>Registre des systèmes et charte IA</li>
                  <li>Information et consultation des représentants du personnel</li>
                </ul>
                <p className="precision">La gouvernance précise quels outils peuvent être utilisés, quelles données peuvent y être versées, qui valide un nouvel usage et comment une erreur ou un incident doit être signalé.</p>
              </div>
              <div className="mission">
                <span className="n">03</span>
                <h3>Mise en conformité et documentation</h3>
                <ul>
                  <li>Mise en œuvre des obligations applicables</li>
                  <li>Organisation de la supervision, de la traçabilité et de l’information</li>
                  <li>Articulation avec le RGPD et le droit du travail</li>
                  <li>Révision des contrats et de la répartition des responsabilités</li>
                </ul>
                <p className="precision">La qualification précède la documentation : tout outil utilisé dans un domaine sensible n’est pas automatiquement soumis au régime des systèmes à haut risque.</p>
              </div>
              <div className="mission">
                <span className="n">04</span>
                <h3>Contrôle, incident ou contentieux</h3>
                <ul>
                  <li>Réponse aux demandes d’une autorité ou d’un client</li>
                  <li>Reconstitution des faits et examen technique du système</li>
                  <li>Défense devant les juridictions civiles, prud’homales ou pénales</li>
                </ul>
              </div>
            </div>
            <p className="orientation-line">La plupart des missions commencent par un inventaire et une qualification des usages. Le premier échange permet ensuite d’identifier la combinaison d’interventions adaptée, sans que l’entreprise ait à déterminer seule la qualification juridique de ses systèmes.</p>
            <div className="cta-mid">
              <div>
                <h3>Vous ne savez pas quelles obligations s’appliquent&nbsp;?</h3>
                <p>Un premier échange permet de circonscrire les systèmes utilisés, les obligations à examiner et les premières mesures à engager.</p>
              </div>
              <Link className="btn" href="/contact">Parler de votre situation</Link>
            </div>
          </div>
        </section>

        {/* 7. COMMENT COMMENCE LA MISSION */}
        <section className="bg-accent tight">
          <div className="wrap">
            <p className="label">déroulement</p>
            <h2 className="wide">Comment commence la mission&nbsp;?</h2>
            <p className="lede">Une prise de contact suffit. Aucun dossier technique complet n’est demandé avant le premier échange.</p>
            <div className="steps">
              <div className="step">
                <h3>Premier échange</h3>
                <p>Un premier échange d’orientation, par téléphone ou en visioconférence, permet de présenter les outils utilisés, le produit concerné, les contrats existants et l’échéance éventuelle.</p>
              </div>
              <div className="step">
                <h3>Périmètre, livrables et honoraires</h3>
                <p>Le cabinet précise les systèmes et les interlocuteurs à mobiliser, puis adresse une proposition fixant le périmètre, les livrables, le calendrier et les honoraires. La mission commence après validation de cette proposition.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. LES SEPT LIVRABLES */}
        <section id="livrables">
          <div className="wrap">
            <p className="label">livrables</p>
            <h2 className="wide">Les documents remis à l’entreprise</h2>
            <p className="lede">À l’issue de l’intervention, l’entreprise ne reçoit pas une simple analyse. Elle dispose des documents nécessaires pour appliquer les mesures retenues, attribuer les responsabilités et justifier ses choix. Ils sont utilisables par les équipes, présentables à un client, un auditeur ou une autorité, et cohérents avec le fonctionnement réel des systèmes.</p>
            <LivrablesPreview />
          </div>
        </section>

        {/* 9. DEUX DOSSIERS */}
        <section className="bg-ghost">
          <div className="wrap">
            <p className="label">dossiers traités</p>
            <h2 className="wide">Deux interventions récentes</h2>
            <p className="lede">Exemples anonymisés d’interventions réalisées par le cabinet.</p>
            <div className="cases">
              <div className="case">
                <span className="tag">éditeur de logiciel</span>
                <dl>
                  <dt>situation</dt><dd>Une fonction de scoring intégrée à la plateforme, vendue à des clients qui demandent des garanties de conformité.</dd>
                  <dt>difficulté</dt><dd>Rôle de fournisseur non assumé dans les contrats et absence de documentation technique.</dd>
                  <dt>intervention</dt><dd>Qualification du système, constitution de la documentation et réécriture des clauses IA.</dd>
                  <dt>livrables</dt><dd>Note de qualification, documentation technique, clauses fournisseurs et clients, dossier de réponse aux demandes de conformité.</dd>
                </dl>
              </div>
              <div className="case">
                <span className="tag">direction des ressources humaines</span>
                <dl>
                  <dt>situation</dt><dd>Outil de présélection de candidatures déployé par un prestataire.</dd>
                  <dt>difficulté</dt><dd>Absence de trace des critères utilisés, supervision humaine non documentée, contrat prestataire muet sur la responsabilité.</dd>
                  <dt>intervention</dt><dd>Examen technique du paramétrage, reconstitution de la chaîne de décision et renégociation du contrat.</dd>
                  <dt>livrables</dt><dd>Note de qualification, procédure de supervision humaine documentée, clauses de responsabilité révisées.</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 10. DEUX DÉCISIONS DE JUSTICE */}
        <section className="tight">
          <div className="wrap">
            <p className="label">état du droit</p>
            <h2 className="wide">Le risque existe déjà, indépendamment du calendrier de l’AI Act</h2>
            <p className="lede">Le déploiement d’un système d’IA peut déjà être contesté sur le fondement du droit du travail, du RGPD ou des obligations contractuelles. Le report de certaines échéances européennes ne suspend pas ces règles.</p>
            <p style={{ fontSize: "0.96rem", color: "var(--text-2)", maxWidth: "72ch" }}>Ces décisions ne sont pas des applications de l’AI Act. Elles montrent que le droit du travail encadre déjà le déploiement de l’IA en entreprise.</p>
            <div className="rulings">
              <div className="ruling">
                <span className="ref">TJ Nanterre, ord. réf., 29 janvier 2026, n° 25/02856</span>
                <p>Deux logiciels de gestion des ressources humaines intégrant des fonctionnalités d’IA.</p>
                <p>Déploiement suspendu sous astreinte, y compris en phase pilote, faute de consultation préalable du CSE central.</p>
                {/* TODO(URL) : ajouter le lien vers la décision ou l'analyse du cabinet lorsque l'URL existe. Aucune URL fournie → carte sans lien. */}
              </div>
              <div className="ruling">
                <span className="ref">TJ Paris, ord. réf., 10 février 2026, n° 25/57412</span>
                <p>Déploiement expérimental de Copilot 365 au sein d’une association.</p>
                <p>Délibération du CSE désignant un expert annulée : expérimentation de quatre mois, fondée sur le volontariat, sans impact concret établi.</p>
                {/* TODO(URL) : idem — aucune URL fournie → carte sans lien. */}
              </div>
            </div>
          </div>
        </section>

        {/* 11. BINÔME */}
        <section className="bg-ghost tight">
          <div className="wrap">
            <p className="label">méthode</p>
            <h2 className="wide">Une analyse juridique appuyée, lorsque nécessaire, par un examen technique</h2>
            <p className="lede">La documentation commerciale ne permet pas toujours de comprendre ce que fait réellement un système. Lorsque la mission l’exige, l’analyse juridique est complétée par l’examen de son fonctionnement, de ses données et de ses mécanismes de supervision.</p>
            <div className="duo">
              <div className="person">
                <div className="portrait">
                  <Image src="/images/alexandre-pro.jpg" alt="Alexandre Lazarègue" width={118} height={148} loading="lazy" sizes="118px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3>Me Alexandre Lazarègue</h3>
                  <p className="role">avocat au barreau de Paris</p>
                  <p>Qualification juridique, contrats et défense.</p>
                </div>
              </div>
              <div className="person">
                <div className="portrait">
                  <Image src="/images/nadia-pro.jpg" alt="Nadia Abchiche-Mimouni" width={118} height={148} loading="lazy" sizes="118px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3>Nadia Abchiche-Mimouni</h3>
                  <p className="role">experte en intelligence artificielle</p>
                  <p>Fonctionnement du système, données, tests et supervision humaine. Elle intervient de manière indépendante sur les dossiers qui nécessitent un examen technique.</p>
                </div>
              </div>
            </div>
            <div className="duo-result">
              <h3>Résultat commun</h3>
              <p>Une documentation juridique cohérente avec le fonctionnement réel du système.</p>
            </div>
          </div>
        </section>

        {/* 12. CALENDRIER */}
        <section className="bg-navy tight">
          <div className="wrap">
            <p className="label">calendrier</p>
            <h2 className="wide">Les échéances qui engagent votre entreprise</h2>
            <p className="lede">Les principales échéances permettent de situer chaque système et les mesures à engager. Le calendrier complet, article par article, fait l’objet d’une ressource distincte tenue à jour.</p>
            <div className="timeline">
              {TIMELINE.map(([date, txt]) => (
                <div className="tl-row" key={date}><div className="tl-date">{date}</div><p>{txt}</p></div>
              ))}
            </div>
            <p style={{ marginTop: 22, fontSize: "0.88rem", color: "#b9bcd4", maxWidth: "72ch" }}>Règlement (UE) 2024/1689 du 13 juin 2024, modifié par le règlement (UE) 2026/1744 du 8 juillet 2026, publié au Journal officiel de l’Union européenne le 24 juillet 2026 et entré en vigueur le 27 juillet 2026.</p>
            <p className="updated">mis à jour le <time dateTime="2026-09-11">11 septembre 2026</time></p>
            <p style={{ marginTop: 22 }}><Link href="/analyses/calendrier-ai-act" style={{ color: "#fff" }}>Calendrier détaillé de l’AI Act, article par article</Link></p>
          </div>
        </section>

        {/* 13. LIVRE BLANC */}
        <section className="tight">
          <div className="wrap">
            <div className="wp">
              <div>
                <h3 style={{ marginBottom: 8 }}>Livre blanc — AI Act : qui doit faire quoi</h3>
                <p>Répartition des obligations entre fournisseur, déployeur et importateur. Sans formulaire ni inscription.</p>
              </div>
              <Link className="btn btn-ghost" href="/ressources/livre-blanc-ai-act">Télécharger le livre blanc</Link>
            </div>
          </div>
        </section>

        {/* 14. FAQ + MAILLAGE */}
        <section className="tight">
          <div className="wrap">
            <p className="label">avant d’engager une mission</p>
            <h2 className="wide">Les questions que posent les entreprises</h2>
            <FaqAccordion />
            <div className="links-out">
              <Link href="/nos-domaines/rgpd-donnees-personnelles">Données personnelles et RGPD</Link>
              <Link href="/nos-domaines/contrats-informatiques">Contrats informatiques et projets IT</Link>
              {/* TODO(page à créer) : /nos-domaines/contentieux-informatique n'existe pas encore. */}
              <Link href="/nos-domaines/contentieux-informatique">Contentieux informatique et commercial</Link>
              <Link href="/nos-domaines/cybersecurite">Cybersécurité et NIS 2</Link>
              <Link href="/analyses/ai-act">Nos analyses sur l’AI Act</Link>
            </div>
          </div>
        </section>

        {/* 15. CONTACT FINAL */}
        <section className="bg-navy final tight">
          <div className="wrap">
            <h2>Faire le point sur vos systèmes d’IA</h2>
            <p>Que votre projet soit en préparation, déjà déployé ou contesté, un premier échange permet d’identifier les questions à traiter et la mission adaptée.</p>
            <p style={{ marginTop: 26 }}><Link className="btn" href="/contact">Parler de votre situation</Link></p>
            <div className="contact">
              <a href="tel:+33181706200">01 81 70 62 00</a>
              <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
              <span>18 rue de Tilsitt, 75017 Paris</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
