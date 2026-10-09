import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/offres/offres.module.css";
import { MEMBRES } from "@/lib/equipe";

/**
 * Page d'offre « DPO externalisé » — maquette
 * docs/maquettes/dpo-externalise-maquette.html. Textes repris mot pour mot de
 * la consigne du cabinet (9 octobre 2026). Tous les boutons mènent au
 * formulaire de contact existant (/contact, sans paramètre : règle du site).
 */
const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/dpo-externalise";
const CONTACT = "/contact";
const RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const LINKEDIN = "https://www.linkedin.com/in/alexandre-lazarègue"; // URL déjà utilisée dans le pied de page
const TITLE = "DPO externalisé : tarif et missions d'un avocat DPO | Lazarègue Avocats";
const DESCRIPTION =
  "DPO externalisé assuré par un avocat en droit du numérique. Trois formules dès 590 € HT/mois, premier échange gratuit, diagnostic seulement si nécessaire.";
const IMAGE = { url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" };

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", images: [IMAGE], locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", images: [IMAGE], title: TITLE, description: DESCRIPTION },
};

/* Les huit questions : une seule source pour l'accordéon ET le balisage FAQPage
   (texte strictement identique). */
const FAQ: { q: string; a: string }[] = [
  { q: "Qu’est-ce qu’un DPO externalisé ?", a: "C’est un délégué à la protection des données qui exerce sa fonction pour votre organisation dans le cadre d’un contrat de service. Il remplit les missions de conseil, de contrôle et de coopération prévues par le RGPD, avec les garanties d’indépendance nécessaires." },
  { q: "La désignation d’un DPO est-elle obligatoire pour toutes les entreprises ?", a: "Non. Elle est notamment obligatoire pour les autorités et organismes publics, sous réserve de l’exception prévue pour les juridictions, ainsi que lorsque les activités de base impliquent un suivi régulier et systématique des personnes à grande échelle, ou le traitement à grande échelle de catégories particulières de données ou de données relatives aux condamnations et infractions. L’effectif ne suffit pas à déterminer cette obligation. Une désignation volontaire est également possible et doit respecter le cadre applicable au DPO." },
  { q: "Quel est le tarif d’un DPO externalisé ?", a: "Nos formules sont proposées à 590 € HT/mois pour Essentiel, 990 € HT/mois pour Entreprise et à partir de 1 690 € HT/mois pour Renforcé. La proposition dépend des traitements, des risques et surtout du temps et des moyens nécessaires. Un diagnostic distinct peut être proposé si la situation le justifie." },
  { q: "Faut-il payer un audit avant de souscrire ?", a: "Non, aucun audit payant n’est imposé systématiquement. Le premier échange commercial de 20 à 30 minutes est gratuit. Si un examen complémentaire est nécessaire, nous proposons un diagnostic au périmètre défini et facturé séparément, après acceptation du devis. Une documentation suffisamment exploitable peut permettre de démarrer sans nouveau diagnostic payant." },
  { q: "L’abonnement comprend-il toute la mise en conformité RGPD ?", a: "Non. Il couvre la mission de DPO selon la lettre de mission. Les travaux opérationnels comme la rédaction intégrale du registre, les audits complets, la production complète d’AIPD, les corrections techniques et le contentieux ne sont pas implicitement inclus. Ils nécessitent un accord distinct et une vérification des conflits d’intérêts." },
  { q: "Un avocat peut-il être notre DPO externe ?", a: "Oui, sous réserve des compétences, des moyens et de l’indépendance nécessaires. Les autres missions confiées à l’avocat doivent être compatibles avec la fonction de DPO. Cette compatibilité est vérifiée au cas par cas, notamment lorsqu’une représentation dans un litige concernant les données personnelles est envisagée." },
  { q: "Notre organisation reste-t-elle responsable de sa conformité ?", a: "Oui. La désignation du DPO ne transfère pas au délégué les obligations du responsable du traitement. Votre organisation reste responsable de ses décisions et de la mise en œuvre des actions nécessaires." },
  { q: "La formule peut-elle évoluer ?", a: "Oui. Un nouveau service, un changement de prestataire, des traitements sensibles ou une évolution de l’organisation peuvent modifier les moyens nécessaires. Le périmètre et les conditions financières sont alors réexaminés avec vous pour maintenir une mission adaptée." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Avocat RGPD", item: `${URL_BASE}${RGPD}` },
        { "@type": "ListItem", position: 4, name: "DPO externalisé", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const MISSIONS = [
  { n: "01", titre: "Informer et conseiller", texte: "Nous informons et conseillons votre organisation et les équipes concernées sur leurs obligations en matière de protection des données, en tenant compte de votre activité et de vos projets." },
  { n: "02", titre: "Contrôler le respect du RGPD", texte: "Nous contrôlons le respect des règles de protection des données et des politiques internes, selon les risques identifiés. Ce suivi comprend des recommandations et l’examen de leur prise en compte. Il ne constitue pas une garantie de conformité ni un audit exhaustif permanent." },
  { n: "03", titre: "Conseiller sur les analyses d’impact", texte: "Lorsque cela est nécessaire, nous donnons un avis sur l’analyse d’impact relative à la protection des données, ou AIPD, et suivons sa réalisation. Sa production intégrale ne fait pas automatiquement partie de l’abonnement." },
  { n: "04", titre: "Coopérer avec la CNIL", texte: "Nous coopérons avec la CNIL et assurons le rôle de point de contact prévu pour le DPO. Cette mission se distingue de la défense de votre organisation dans une procédure contentieuse." },
];

const FORMULES = [
  {
    nom: "Essentiel",
    prefixe: "",
    prix: "590",
    accroche: "Pour les organisations dont les traitements courants sont relativement stables.",
    texte: "Votre activité repose principalement sur des outils de gestion, de comptabilité, de ressources humaines ou de relation client. Votre environnement nécessite un suivi proportionné, sans multiplicité de projets ou de risques particuliers exigeant une intervention intensive.",
    puces: ["Un suivi proportionné à un environnement stable.", "Des contrôles ciblés sur les risques identifiés.", "Une réponse aux évolutions signalées par vos équipes."],
  },
  {
    nom: "Entreprise",
    prefixe: "",
    prix: "990",
    accroche: "Pour les organisations dont les activités numériques appellent un suivi plus soutenu.",
    texte: "Vous utilisez plusieurs applications, travaillez avec différents sous-traitants ou faites régulièrement évoluer vos services. Vos projets, vos contrats et vos échanges avec vos partenaires nécessitent des conseils et des contrôles plus fréquents.",
    puces: ["Un suivi plus fréquent de vos projets et évolutions.", "Un conseil lors des changements de prestataires et d’outils.", "Des contrôles adaptés à un environnement évolutif."],
  },
  {
    nom: "Renforcé",
    prefixe: "À partir de",
    prix: "1 690",
    accroche: "Pour les organisations dont les risques ou l’organisation nécessitent des moyens renforcés.",
    texte: "Données sensibles, traitements à grande échelle, profilage, systèmes d’intelligence artificielle, transferts internationaux multiples ou organisation complexe peuvent demander davantage de temps d’analyse et de coordination.",
    puces: ["Un suivi renforcé des risques et des projets sensibles.", "Un avis sur les AIPD et le suivi de leur réalisation.", "Une coordination avec vos équipes et prestataires, selon la lettre de mission."],
  },
];

const DIAGNOSTICS = [
  {
    nom: "Diagnostic ciblé",
    prix: "À partir de 1 200 € HT",
    texte: "Examen d’un périmètre limité de traitements et de documents sélectionnés, avec un entretien de cadrage. La sélection des pièces et les limites de l’examen sont fixées au devis.",
    livrables: "synthèse des constats sur ce périmètre, repérage des principales lacunes et plan d’actions priorisé.",
  },
  {
    nom: "Diagnostic approfondi",
    prix: "À partir de 2 500 € HT",
    texte: "Revue documentaire élargie des traitements retenus, de contrats de sous-traitance et de procédures sélectionnés, complétée par des entretiens avec les interlocuteurs identifiés. L’étendue de la revue et les entretiens sont précisés au devis.",
    livrables: "cartographie de synthèse du périmètre étudié, analyse des écarts et risques observés, recommandations et feuille de route priorisée.",
  },
  {
    nom: "Diagnostic complexe",
    prix: "Sur devis",
    texte: "Pour les environnements multisites, les groupes, les traitements sensibles ou les systèmes nécessitant des investigations spécifiques. Les entités, les flux, les documents et les entretiens à examiner sont convenus à l’avance.",
    livrables: "rapport limité au périmètre étudié, synthèse des risques et plan d’actions adapté, avec restitution selon le devis.",
  },
];

const CRITERES = [
  { titre: "Nature et sensibilité des données", texte: "Des coordonnées professionnelles et des données de facturation n’appellent pas le même niveau d’attention que des dossiers médicaux ou des données biométriques utilisées pour identifier une personne." },
  { titre: "Volume et diversité des traitements", texte: "Une activité avec quelques processus stables diffère d’une plateforme combinant comptes utilisateurs, mesure d’audience, marketing et nouveaux services réguliers. Le volume de données et de personnes concernées compte également." },
  { titre: "Sous-traitants", texte: "Quelques outils bien documentés demandent un suivi différent d’une chaîne de prestataires et de sous-traitants ultérieurs dont les contrats et les pratiques évoluent." },
  { titre: "Transferts internationaux", texte: "Un hébergement annoncé en Europe ne suffit pas à écarter tout transfert. Les accès à distance et les prestataires situés hors de l’Espace économique européen peuvent demander des vérifications complémentaires." },
  { titre: "IA et profilage", texte: "Un outil d’assistance sans données personnelles présente des enjeux différents d’un système évaluant des candidats ou établissant des profils clients à partir de données personnelles." },
  { titre: "Organisation", texte: "Plusieurs entités, sites, interlocuteurs ou systèmes peuvent multiplier les besoins de coordination. La disponibilité de vos équipes et la qualité de votre documentation influencent aussi le travail nécessaire." },
];

const EXEMPLES = [
  "Une agence de communication utilise des outils de gestion et un CRM, avec des traitements stables et une documentation exploitable. Une formule Essentiel peut être adaptée après évaluation.",
  "Un éditeur SaaS fait évoluer sa plateforme, mobilise plusieurs prestataires et reçoit régulièrement des demandes de ses clients. Une formule Entreprise peut être envisagée selon les risques et la charge de suivi.",
  "Une plateforme de télémédecine traite des données de santé et développe des fonctionnalités d’IA. Une mission Renforcé, voire un dimensionnement spécifique, peut être nécessaire indépendamment de son effectif.",
];

export default function Page() {
  const alexandre = MEMBRES.alexandre;
  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ====================== A — Fil d'Ariane et hero ==================== */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <ol>
              <li><Link href="/">Accueil</Link><span aria-hidden="true">›</span></li>
              <li><Link href="/nos-domaines">Nos domaines</Link><span aria-hidden="true">›</span></li>
              <li><Link href={RGPD}>Avocat RGPD</Link><span aria-hidden="true">›</span></li>
              <li><span aria-current="page">DPO externalisé</span></li>
            </ol>
          </nav>
        </div>
        <div className={`${styles.wrap} ${styles.heroGrille}`}>
          <div>
            <p className={styles.surtitre}>RGPD &amp; données · DPO externe</p>
            <h1 className={styles.h1}>DPO externalisé : un avocat en droit du numérique</h1>
            <p className={`${styles.heroP1} ${styles.heroP1dpo}`}>Confiez la fonction de délégué à la protection des données à Lazarègue Avocats. Vous bénéficiez d’un interlocuteur juridique pour conseiller vos équipes, contrôler le respect du RGPD et suivre vos enjeux de protection des données dans la durée.</p>
            <p className={`${styles.heroP2} ${styles.heroP2dpo}`}>Notre accompagnement est dimensionné selon vos traitements, vos risques et les moyens nécessaires à une mission effective de DPO.</p>
            <p className={styles.heroPrix}>Trois formules dès 590 € HT/mois, adaptées à vos traitements et au suivi nécessaire.</p>
            <div className={styles.heroBoutons}>
              <Link className={styles.btn} href={CONTACT}>Demander une proposition</Link>
            </div>
            <p className={styles.heroNote}>Évaluation commerciale préalable gratuite de 20 à 30 minutes. Sans audit de conformité à ce stade.</p>
          </div>
          <aside className={styles.carteHero} aria-labelledby="carte-hero">
            <p className={styles.surtitre} id="carte-hero">Comment démarrer</p>
            <ol className={styles.demarrer}>
              <li><span className={styles.chiffre} aria-hidden="true">01</span><strong>Un premier échange gratuit</strong><span>20 à 30 minutes, sans audit.</span></li>
              <li><span className={styles.chiffre} aria-hidden="true">02</span><strong>Une proposition adaptée</strong><span>La formule correspondant au suivi nécessaire.</span></li>
              <li><span className={styles.chiffre} aria-hidden="true">03</span><strong>Un diagnostic seulement si nécessaire</strong><span>Jamais imposé, toujours sur devis.</span></li>
            </ol>
          </aside>
        </div>
      </section>

      {/* ============================ B — Présentation ====================== */}
      <section className={styles.sec} aria-labelledby="t-presentation">
        <div className={`${styles.wrap} ${styles.presentation}`}>
          <h2 className={styles.h2} id="t-presentation">Un DPO externe pour accompagner vos décisions</h2>
          <div>
            <p>Les données personnelles sont au cœur de vos relations avec vos clients, vos équipes et vos partenaires. Un nouveau logiciel, un service utilisant l’intelligence artificielle ou un prestataire international peuvent soulever des questions juridiques qui demandent un suivi régulier.</p>
            <p>Lazarègue Avocats met sa pratique du droit du numérique au service de votre organisation. Notre mission de DPO externalisé vous aide à identifier les priorités, à éclairer vos choix et à suivre les mesures prises en matière de protection des données.</p>
            <p className={styles.fort}>La désignation d’un DPO ne suffit pas, à elle seule, à rendre une organisation conforme au RGPD. Elle s’inscrit dans une démarche continue portée par votre direction et vos équipes.</p>
          </div>
        </div>
      </section>

      {/* ============================== C — Missions ======================== */}
      <section className={`${styles.sec} ${styles.ghost}`} aria-labelledby="t-missions">
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-missions">Les missions de votre DPO externalisé</h2>
          </div>
          <div className={styles.deux}>
            {MISSIONS.map((m) => (
              <div className={styles.carte} key={m.n}>
                <span className={styles.carteN} aria-hidden="true">{m.n}</span>
                <h3>{m.titre}</h3>
                <p>{m.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== D — Qui intervient ===================== */}
      <section className={styles.sec} aria-labelledby="t-qui">
        <div className={`${styles.wrap} ${styles.qui}`}>
          <div className={styles.quiPhoto}>
            <Image src={alexandre.photo} alt="Portrait d’Alexandre Lazarègue" fill sizes="180px" style={{ objectFit: "cover", objectPosition: alexandre.position ?? "center" }} />
          </div>
          <div>
            <p className={styles.surtitre}>Qui intervient</p>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-qui">Alexandre Lazarègue, avocat au Barreau de Paris</h2>
            <p>Master II en droit des nouvelles technologies (Université de Strasbourg) et diplôme en droit de la protection des données (Université Paris-Ouest Nanterre). Ancien consultant auprès de la CNDP du Maroc, l’autorité marocaine de protection des données.</p>
            <p>Avec Me Sarah Hinderer, avocate aux barreaux de Paris et de Montréal, et, lors des incidents de sécurité, Khalid Sookia, consultant technique en cybersécurité.</p>
            <div className={styles.quiLiens}>
              <Link className={styles.lien} href="/le-cabinet">Découvrir l’équipe du cabinet</Link>
              <a className={styles.lien} href={LINKEDIN} target="_blank" rel="noopener">Profil LinkedIn d’Alexandre Lazarègue</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================================ E — Tarifs ======================== */}
      <section className={styles.sec} id="formules" aria-labelledby="t-formules" style={{ paddingTop: 0, scrollMarginTop: "var(--header-h-compact)" }}>
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-formules">DPO externalisé : tarifs et formules d’accompagnement</h2>
            <p className={styles.intro}>Le tarif dépend du suivi réellement nécessaire. Les trois formules couvrent le même socle de missions réglementaires du DPO, avec une intensité et des moyens adaptés à votre situation. Le périmètre, les modalités de suivi et les prestations distinctes sont précisés dans la lettre de mission.</p>
          </div>
          <div className={styles.formules}>
            {FORMULES.map((f) => (
              <article className={`${styles.formule} ${styles.formuleDpo}`} key={f.nom}>
                <h3 className={styles.formuleNom}>{f.nom}</h3>
                <p className={styles.prefixe}>{f.prefixe}</p>
                <p className={`${styles.prix} ${styles.prixDpo}`}>
                  <b>{f.prix}</b>
                  <span>€ HT/mois</span>
                </p>
                <p className={styles.accroche}>{f.accroche}</p>
                <p className={styles.promesse}>{f.texte}</p>
                <p className={styles.intensite}>Intensité du suivi</p>
                <ul className={`${styles.inclus} ${styles.puces}`}>
                  {f.puces.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link className={styles.btn} href={CONTACT}>Demander une proposition</Link>
              </article>
            ))}
          </div>
          <p className={styles.socle}><strong>Socle commun aux trois formules :</strong> informer et conseiller, contrôler le respect du RGPD, donner un avis sur les analyses d’impact et suivre leur réalisation, coopérer avec la CNIL.</p>
          <p className={styles.note}>La formule est proposée après évaluation de votre situation. Les exemples ne constituent pas des critères automatiques d’éligibilité. Si vos activités évoluent ou si les moyens nécessaires dépassent le périmètre convenu, nous définissons avec vous une adaptation de la mission et de ses conditions financières avant les prestations supplémentaires. La mission doit toujours disposer de moyens suffisants.</p>
        </div>
      </section>

      {/* ====================== F — Évaluation et diagnostic ================ */}
      <section className={`${styles.sec} ${styles.ghost}`} aria-labelledby="t-diagnostic">
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-diagnostic">Une évaluation préalable, puis un diagnostic si nécessaire</h2>
            <p className={styles.miseEnAvant}>Un diagnostic payant uniquement si votre situation le nécessite.</p>
          </div>
          <div className={styles.deux}>
            <div className={`${styles.carte} ${styles.carteSombre}`}>
              <p className={styles.surtitre}>Gratuit</p>
              <h3>Un premier échange gratuit de 20 à 30 minutes.</h3>
              <p>Nous échangeons sur votre activité, les catégories de données traitées, vos principaux outils et sous-traitants, vos projets et la documentation disponible. Cette évaluation commerciale permet d’orienter la proposition et de déterminer si un examen complémentaire est nécessaire. Elle n’est ni un audit de conformité ni une consultation juridique complète.</p>
            </div>
            <div className={styles.carte}>
              <p className={styles.surtitre}>Si nécessaire · Distinct de l’abonnement</p>
              <h3>Un diagnostic initial distinct de l’abonnement.</h3>
              <p>Lorsque les informations disponibles ne permettent pas de dimensionner suffisamment la mission, nous pouvons proposer un diagnostic payant. Son périmètre et ses livrables sont définis dans un devis accepté avant intervention. Il vise les sujets convenus et ne prétend pas couvrir exhaustivement votre conformité.</p>
            </div>
          </div>
          <div className={styles.diagnostics}>
            {DIAGNOSTICS.map((d) => (
              <div key={d.nom}>
                <h3>{d.nom}</h3>
                <p className={styles.diagPrix}>{d.prix}</p>
                <p>{d.texte}</p>
                <p><strong>Livrables :</strong> {d.livrables}</p>
              </div>
            ))}
          </div>
          <div className={styles.suiteTexte}>
            <p>Ces diagnostics n’incluent pas, sauf accord spécifique, un audit technique de sécurité, un inventaire exhaustif de tous les traitements, la rédaction intégrale du registre ou des AIPD, ni la réalisation des corrections. Le devis précise également le calendrier et les limites d’analyse.</p>
            <p className={styles.fort}>Un diagnostic payant n’est pas systématique. Si votre registre, vos contrats, vos procédures ou vos rapports récents sont suffisamment exploitables pour préparer la prise de fonction, nous pouvons nous appuyer sur ces éléments sans imposer un nouvel examen payant.</p>
            <Link className={styles.btn} href={CONTACT}>Demander une proposition</Link>
          </div>
        </div>
      </section>

      {/* ========================= G — Choisir la formule =================== */}
      <section className={styles.sec} aria-labelledby="t-choisir">
        <div className={styles.wrap}>
          <div className={styles.tete}>
            <h2 className={`${styles.h2} ${styles.h2large}`} id="t-choisir">Comment déterminer la formule adaptée à vos traitements</h2>
            <p className={styles.intro}>Le principal critère est le temps et les moyens nécessaires pour exercer la mission sérieusement. Nous apprécions votre situation dans son ensemble, sans appliquer de seuil automatique de salariés.</p>
          </div>
          <div className={styles.criteres}>
            {CRITERES.map((c) => (
              <div className={styles.critere} key={c.titre}>
                <h3>{c.titre}</h3>
                <p>{c.texte}</p>
              </div>
            ))}
          </div>
          <div className={`${styles.trois} ${styles.exemples}`} style={{ gap: 24 }}>
            {EXEMPLES.map((e) => (
              <div className={styles.exemple} key={e}>
                <p className={styles.exempleLabel}>Exemple illustratif</p>
                <p>{e}</p>
              </div>
            ))}
          </div>
          <p className={styles.petiteNote}>Ces exemples ne sont pas des classifications automatiques. Aucun seuil chiffré de salariés, de traitements ou de prestataires ne constitue ici un critère légal de tarification ou de désignation d’un DPO. Les exigences légales s’apprécient au regard de l’activité et des traitements concernés.</p>
        </div>
      </section>

      {/* ====================== H — Cadre et responsabilités ================ */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="t-cadre">
        <div className={`${styles.wrap} ${styles.cadre}`}>
          <h2 className={styles.h2} id="t-cadre">Un cadre clair pour la mission et les responsabilités</h2>
          <div>
            <p>Le DPO conseille et contrôle. Votre organisation reste responsable des décisions relatives à ses traitements et de la réalisation des mesures de conformité. La direction doit lui permettre d’accéder aux informations utiles, l’associer aux projets en temps utile et lui fournir des ressources suffisantes.</p>
            <p>La mise en conformité opérationnelle, la rédaction intégrale du registre, la réalisation complète d’AIPD, les audits complets, les travaux techniques et les contentieux sont hors forfait, sauf prestation expressément convenue. Ils peuvent faire l’objet d’une proposition distincte, après vérification de leur compatibilité avec la fonction de DPO.</p>
            <p>Le DPO exerce ses missions en toute indépendance, sans instruction sur ses conclusions, et rend compte au plus haut niveau de la direction. Il ne décide pas des finalités et des moyens de vos traitements.</p>
            <p>Avant la désignation, puis en cas de nouvelle mission, le cabinet vérifie les risques de conflits d’intérêts. Une mission de conseil opérationnel ou de représentation dans un litige relatif aux données personnelles doit notamment être examinée au cas par cas. La seule séparation des contrats ne suffit pas à garantir la compatibilité des rôles.</p>
          </div>
        </div>
      </section>

      {/* ================================= I — FAQ ========================== */}
      <section className={styles.sec} aria-labelledby="t-faq">
        <div className={`${styles.wrap} ${styles.etroit}`}>
          <h2 className={`${styles.h2} ${styles.h2large}`} id="t-faq">Questions fréquentes sur le DPO externalisé</h2>
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

      {/* ============================ J — Liens internes ==================== */}
      <section className={`${styles.sec} ${styles.ghost} ${styles.liens}`} aria-labelledby="t-liens">
        <div className={styles.wrap}>
          <h2 className={`${styles.h2} ${styles.h2large}`} id="t-liens">Articuler protection des données et accompagnement juridique</h2>
          <p>
            Pour vos projets de protection des données, découvrez notre <Link className={styles.lien} href={RGPD}>accompagnement en droit du RGPD</Link>. Pour vos autres besoins de conseil récurrent, consultez notre <Link className={styles.lien} href="/direction-juridique-externalisee">abonnement juridique</Link>. Chaque intervention conserve son périmètre propre et fait l’objet d’une vérification de compatibilité avec la mission de DPO.
          </p>
        </div>
      </section>

      {/* =============================== K — CTA final ====================== */}
      <section className={`${styles.sec} ${styles.navy} ${styles.final}`} aria-labelledby="t-final">
        <div className={styles.wrap}>
          <h2 className={styles.finalTitre} id="t-final" style={{ maxWidth: "20ch" }}>Parlons de votre besoin de DPO externalisé</h2>
          <p>Présentez-nous votre activité, vos principaux traitements et votre documentation disponible. Après un premier échange commercial gratuit de 20 à 30 minutes, nous vous proposerons un accompagnement adapté et préciserons si un diagnostic complémentaire est nécessaire.</p>
          <Link className={styles.btn} href={CONTACT}>Demander une proposition</Link>
        </div>
      </section>
    </main>
  );
}
