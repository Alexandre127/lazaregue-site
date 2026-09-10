import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import { MEMBRES } from "@/lib/equipe";
import KeywordBadge from "@/components/keyword-badge";
import { FAQ_ITEMS } from "./faq";
import styles from "./crypto.module.css";

/*
 * Route réelle : /nos-domaines/crypto-actifs-blockchain (la maquette proposait
 * /expertises/crypto-actifs-blockchain/, namespace inexistant dans le projet ;
 * toutes les pages compétence vivent sous /nos-domaines/). Canonical, OG et
 * JSON-LD alignés sur cette route. Le breadcrumb et la WebPage de la maquette
 * (qui pointaient vers un index /expertises/ absent) sont retirés — aucune page
 * domaine n'en a. L'image OG « à produire » n'est pas déclarée (pas de fichier).
 */
const TITLE = "Avocat crypto, blockchain et Web3 à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Lazarègue Avocats accompagne les projets crypto, blockchain et Web3 : conformité MiCA, autorisation PSCA, contrats, tokenisation et contentieux.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/nos-domaines/crypto-actifs-blockchain" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/nos-domaines/crypto-actifs-blockchain",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const PERSONNES = [
  {
    name: "Alexandre Lazarègue",
    avocat: true,
    jobTitle: "Avocat au barreau de Paris — droit du numérique",
    knowsAbout: ["Crypto-actifs", "Règlement MiCA", "Contrats technologiques", "Contentieux des flux financiers"],
  },
  {
    name: "Amir Ben Majed",
    avocat: true,
    jobTitle: "Avocat au barreau de Paris — conformité et contrats",
    knowsAbout: ["Conformité réglementaire", "Documentation contractuelle", "Procédures"],
  },
  {
    name: "Khalid Sookia",
    avocat: false,
    jobTitle: "Consultant technique — cybersécurité",
    knowsAbout: ["Architecture blockchain", "Analyse de code", "Traçabilité des flux", "Preuve technique"],
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat crypto-actifs, blockchain et Web3 — Lazarègue Avocats",
      description:
        "Qualification des projets crypto, autorisation PSCA et conformité MiCA, contrats et smart contracts, tokenisation, LCB-FT et contentieux des crypto-actifs.",
      url: "https://lazaregue-avocats.fr/nos-domaines/crypto-actifs-blockchain",
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Conformité MiCA, autorisation PSCA, contrats blockchain, smart contracts, tokenisation, NFT, LCB-FT, contentieux crypto-actifs",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
      knowsAbout: [
        "crypto-actifs",
        "cryptomonnaies",
        "blockchain",
        "Web3",
        "règlement MiCA",
        "agrément PSCA",
        "tokenisation",
        "NFT",
        "smart contracts",
      ],
    },
    ...PERSONNES.map((p) => ({
      "@type": "Person",
      name: p.name,
      ...(p.avocat ? { honorificPrefix: "Maître" } : {}),
      jobTitle: p.jobTitle,
      knowsAbout: p.knowsAbout,
      worksFor: { "@type": "LegalService", name: "Lazarègue Avocats" },
      url: "https://lazaregue-avocats.fr/le-cabinet",
    })),
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const TOC = [
  { href: "#structurer", label: "Structurer un projet" },
  { href: "#conformite", label: "Agrément PSCA et MiCA" },
  { href: "#contrats", label: "Contrats et smart contracts" },
  { href: "#technique", label: "Lecture technique" },
  { href: "#tokenisation", label: "Tokenisation, NFT, jetons" },
  { href: "#lcbft", label: "LCB-FT et déclarations" },
  { href: "#contentieux", label: "Contentieux et exécution" },
  { href: "#methode", label: "Méthode" },
];

const EQUIPE = [
  {
    slug: "alexandre" as const,
    role: "avocat au barreau de paris",
    texte:
      "Fondateur du cabinet. Qualification réglementaire des projets, contrats technologiques et contentieux des flux financiers.",
  },
  {
    slug: "amir" as const,
    role: "avocat",
    texte:
      "Conformité réglementaire, documentation contractuelle et suivi des procédures.",
  },
  {
    slug: "khalid" as const,
    role: "consultant technique · cybersécurité",
    texte:
      "Analyse de l'architecture et du code, traçabilité des flux, constitution de la preuve technique et assistance à expertise.",
  },
];

export default function Page() {
  return (
    <main className={styles.page} id="contenu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ===== Héro ===== */}
      <header className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <KeywordBadge style={{ marginBottom: 34 }}>
              crypto-actifs · blockchain · web3
            </KeywordBadge>
            <h1>
              Avocat en crypto-actifs,
              <br />
              blockchain et Web3
            </h1>
            <p className={styles.lede}>
              {fr(
                "Le cabinet qualifie le modèle, conduit la mise en conformité et défend l'entreprise lorsque le code, les actifs et les responsabilités cessent de coïncider.",
              )}
            </p>
            <p className={styles.sub}>
              {fr(
                "Le régime applicable aux prestataires a changé de nature. Les risques juridiques et contractuels ont changé avec lui.",
              )}
            </p>
            <a className={`${styles.btn} ${styles.btnHero}`} href="#contact">
              exposer un projet ou un litige
            </a>
            <p className={styles.micro}>
              {fr(
                "Premier échange destiné à qualifier le régime applicable ou la voie de recours ouverte.",
              )}
            </p>
          </div>

          {/* Bloc daté (fin de période transitoire MiCA). À réviser avant
              juillet 2027 pour un intitulé non daté. */}
          <div className={styles.cutoff}>
            <div className={styles.d}>
              1
              <sup style={{ fontSize: "0.42em", verticalAlign: "super" }}>er</sup> JUILLET
            </div>
            <div className={styles.m}>2026</div>
            <p>
              {fr(
                "Terme de la période transitoire de l'article 143 du règlement MiCA. Depuis cette date, le statut national de prestataire de services sur actifs numériques ne suffit plus pour opérer en France.",
              )}
            </p>
            <cite>règlement (UE) 2023/1114 · ord. n° 2024-936 et 2024-937 du 15 oct. 2024</cite>
          </div>
        </div>
      </header>

      {/* ===== Corps + sommaire ===== */}
      <div className={`${styles.wrap} ${styles.body}`}>
        <aside className={styles.toc} aria-label="Sommaire">
          <ol>
            {TOC.map((t) => (
              <li key={t.href}>
                <a href={t.href}>{t.label}</a>
              </li>
            ))}
          </ol>
        </aside>

        <div>
          <details className={styles.tocMobile}>
            <summary>sommaire</summary>
            <ol>
              {TOC.map((t) => (
                <li key={t.href}>
                  <a href={t.href}>{t.label}</a>
                </li>
              ))}
            </ol>
          </details>

          <section id="intro">
            <p className={styles.intro}>
              {fr(
                "Le cabinet Lazarègue Avocats intervient auprès des entreprises, des porteurs de projets, des plateformes, des prestataires technologiques et de leurs conseils sur les questions juridiques soulevées par les crypto-actifs, les cryptomonnaies et les registres distribués. Cette pratique se situe au point de rencontre de trois matières déjà exercées par le cabinet : la régulation du numérique, les contrats technologiques complexes et le contentieux des flux financiers.",
              )}
            </p>
            <p>
              {fr(
                "La bascule du 1er juillet 2026 ne se limite pas à une formalité d'agrément. Elle redistribue les risques entre les acteurs autorisés, ceux qui ont dû cesser leur activité, leurs clients et les établissements qui les financent. C'est dans cet espace que le cabinet intervient.",
              )}
            </p>
          </section>

          <section id="structurer">
            <span className={styles.tag}>conseil</span>
            <h2>Structurer un projet fondé sur les crypto-actifs</h2>
            <p>
              {fr(
                "L'analyse préalable conditionne tout le reste : le statut, la documentation, les obligations déclaratives et fiscales applicables aux opérateurs, et l'exposition contentieuse. Le cabinet la conduit en trois temps.",
              )}
            </p>
            <ul className={styles.stack}>
              <li>
                <b>Qualification des actifs.</b>{" "}
                {fr(
                  "Crypto-actifs au sens de MiCA, jetons se référant à un actif, jetons de monnaie électronique, ou instruments financiers relevant d'un autre corpus. La qualification retenue commande le régime d'émission, les obligations d'information et l'autorité compétente.",
                )}
              </li>
              <li>
                <b>Qualification des services.</b>{" "}
                {fr(
                  "La liste des services régulés est fermée ; son application à un modèle réel ne l'est pas. Un dispositif non custodial, une interface ou un protocole autonome appellent une analyse fonctionnelle, et non déclarative.",
                )}
              </li>
              <li>
                <b>Choix du statut.</b>{" "}
                {fr(
                  "Autorisation de plein exercice, notification de l'article 60 pour les entités financières déjà agréées, recours à un prestataire tiers autorisé, ou libre prestation sous passeport depuis un autre État membre. Chaque voie emporte des conséquences de délai, de coût et de gouvernance à arbitrer avant la constitution de la société.",
                )}
              </li>
            </ul>
            <p>
              {fr(
                "Les projets Web3 présentés comme non intermédiés — organisations autonomes décentralisées, protocoles ouverts, gouvernance par jeton — ajoutent une question préalable : qui est juridiquement responsable, et devant quelle juridiction. Le cabinet traite le choix d'une entité de rattachement lorsqu'il est possible et le risque de requalification en société créée de fait, qui expose les participants à une responsabilité indéfinie.",
              )}
            </p>
          </section>

          <section id="conformite">
            <span className={styles.tag}>conformité</span>
            <h2>Autorisation PSCA et conformité MiCA</h2>
            <h3>Constituer le dossier d&apos;autorisation</h3>
            <p>
              {fr(
                "Le dossier suppose d'établir la substance de l'entreprise : organe de direction, honorabilité et compétence des dirigeants, actionnariat et bénéficiaires effectifs, exigences prudentielles, contrôle interne, gestion des risques, continuité d'activité, sécurité des systèmes, externalisation, conservation et ségrégation des actifs des clients, traitement des réclamations, conflits d'intérêts.",
              )}
            </p>
            <div className={styles.note}>
              <p>
                {fr(
                  "L'Autorité des marchés financiers rappelle que le délai d'instruction prévu par le règlement MiCA peut atteindre quatre mois une fois le dossier complet transmis, et que l'expérience montre que les dossiers déposés auprès d'elle sont rarement complets dans leur version initiale. Le travail utile consiste donc moins à rédiger des politiques qu'à s'assurer que l'organisation décrite existe et que les documents produits sont cohérents entre eux. ",
                )}
                <a
                  href="https://www.amf-france.org/fr/actualites-publications/actualites/lamf-rappelle-que-la-periode-transitoire-pour-les-psan-pour-continuer-de-fournir-des-services-sur"
                  target="_blank"
                  rel="noopener"
                >
                  Communiqué de l&apos;AMF
                </a>
                .
              </p>
            </div>
            <h3>Tenir les obligations en régime de croisière</h3>
            <p>
              {fr(
                "L'autorisation n'est pas un point d'arrivée : information claire, exacte et non trompeuse, avertissement sur les risques, transparence tarifaire, encadrement des communications commerciales, du parrainage et de l'influence commerciale portant sur les crypto-actifs, régime issu de l'ordonnance n° 2024-936.",
              )}
            </p>
            <h3>Sortir du marché, ou reprendre une clientèle</h3>
            <p>
              {fr(
                "Depuis la fin de la période transitoire, les acteurs non autorisés doivent organiser leur cessation d'activité ou le transfert de leur clientèle. Cette phase soulève des difficultés moins visibles que l'obtention de l'autorisation elle-même. Les plans de cessation ordonnée sont mis en œuvre sous la surveillance des régulateurs. Le cabinet intervient sur la restitution des actifs, l'information due aux clients, l'articulation avec le droit des entreprises en difficulté, et sur les vérifications préalables qui s'imposent au prestataire autorisé accueillant une clientèle transférée.",
              )}
            </p>
          </section>

          <section id="contrats">
            <span className={styles.tag}>contrats</span>
            <h2>Contrats, plateformes et smart contracts</h2>
            <p>
              {fr(
                "Un projet blockchain repose sur un empilement contractuel : conditions générales, intégration, hébergement, développement, conventions avec les auditeurs de code, les opérateurs de nœuds et les fournisseurs d'oracles. Le cabinet y transpose sa pratique des contrats informatiques et des projets IT.",
              )}
            </p>
            <h3>Le code exécute, il n&apos;épuise pas l&apos;accord</h3>
            <p>
              {fr(
                "Un smart contract peut matérialiser ou automatiser l'exécution de certaines obligations. Il ne détermine pas pour autant, à lui seul, l'ensemble de l'accord : consentement, interprétation, suspension, résiliation, réversibilité, loi applicable, responsabilité et traitement des situations imprévues doivent être organisés dans une documentation cohérente avec le fonctionnement du programme. L'enjeu de rédaction est celui de l'articulation entre les deux : que se passe-t-il lorsque le code s'exécute conformément à ses instructions mais contrairement à la volonté commune, lorsqu'un oracle défaille, ou lorsqu'une règle d'ordre public s'oppose à l'automaticité, à l'image du délai de grâce de l'article 1343-5 du code civil.",
              )}
            </p>
            <h3>Les clauses limitatives, point de tension</h3>
            <p>
              {fr(
                "La stipulation qui contredit la portée de l'obligation essentielle souscrite doit être réputée non écrite. Appliquée aux plateformes et aux éditeurs de solutions blockchain, cette grille impose d'identifier le cœur du service promis — disponibilité, exécution des transactions, conservation des clés, intégrité des données — et de calibrer les plafonds pour qu'ils opèrent une répartition du risque plutôt qu'une décharge anticipée.",
              )}
            </p>
            <p className={styles.ref}>
              Com., 22 octobre 1996, n° 93-18.632 · Com., 29 juin 2010, n° 09-11.841
            </p>
            <div className={styles.note}>
              <p>
                {fr(
                  "La rédaction des clauses relatives au code suppose de savoir ce que le code fait. Le cabinet conduit cette lecture avec son consultant technique, avant de fixer le périmètre des engagements, les livrables attendus et la responsabilité des développeurs, auditeurs et opérateurs en cas de vulnérabilité.",
                )}
              </p>
            </div>
          </section>

          <section id="technique">
            <span className={styles.tag}>avocat + technique</span>
            <h2>Une lecture technique, pas seulement juridique</h2>
            <p>
              {fr(
                "La plupart des questions posées par les crypto-actifs sont des questions de fait avant d'être des questions de droit. Savoir si une entreprise fournit un service régulé dépend de qui détient les clés. Savoir si une clause limitative sera écartée dépend de ce que le programme exécutait réellement. Savoir si un dossier de fraude a un défendeur solvable dépend du point de sortie des fonds.",
              )}
            </p>
            <p>
              {fr(
                "L'analyse technique est intégrée dès l'ouverture du dossier, et non produite en fin de course pour étayer une position déjà prise. Selon sa nature, elle est conduite avec les intervenants techniques du cabinet et mise en regard des qualifications et des moyens juridiques envisagés.",
              )}
            </p>
            <ul className={styles.stack}>
              <li>
                <b>Qualification de l&apos;architecture.</b>{" "}
                {fr(
                  "Examen du dispositif réel — conservation des clés, chemin d'exécution des ordres, dépendances externes, rôle des interfaces et des relayeurs — dont dépend la qualification réglementaire du service et donc le statut applicable.",
                )}
              </li>
              <li>
                <b>Analyse fonctionnelle du code et de l&apos;architecture avant déploiement.</b>{" "}
                {fr(
                  "Lecture conjointe des contrats intelligents et de leur environnement, aux côtés de l'analyse juridique des engagements souscrits. L'audit de sécurité et la certification technique relèvent d'un prestataire spécialisé, dont le cabinet définit le périmètre et encadre contractuellement la responsabilité.",
                )}
              </li>
              <li>
                <b>Traçabilité des flux et constitution de la preuve.</b>{" "}
                {fr(
                  "Reconstitution du parcours des fonds, identification des points de passage par un intermédiaire régulé, mise en forme des constatations dans un document exploitable devant une juridiction ou un expert judiciaire.",
                )}
              </li>
              <li>
                <b>Assistance à expertise.</b>{" "}
                {fr(
                  "Le cabinet est rompu aux opérations d'expertise judiciaire en matière technique : rédaction des dires, contestation de la méthode retenue, discussion du périmètre des opérations et des conclusions techniques.",
                )}
              </li>
            </ul>
            <div className={styles.note}>
              <p>
                {fr(
                  "Cette pratique repose sur un binôme avocat et technique constitué dès l'ouverture du dossier. Les intervenants sont présentés plus bas, dans ",
                )}
                <a href="#equipe">l&apos;équipe sur ce domaine</a>.
              </p>
            </div>
          </section>

          <section id="tokenisation">
            <span className={styles.tag}>opérations</span>
            <h2>Tokenisation, NFT et émissions de jetons</h2>
            <p>
              {fr(
                "L'inscription d'un droit sur un registre distribué ne modifie pas la nature du droit inscrit. C'est le principe directeur des interventions du cabinet.",
              )}
            </p>
            <ul className={styles.stack}>
              <li>
                <b>Émissions de jetons.</b>{" "}
                {fr(
                  "La qualification — jeton d'usage, jeton se référant à un actif, jeton de monnaie électronique, titre financier tokenisé — commande le régime d'offre au public, le contenu du livre blanc et la responsabilité de l'émetteur au titre des informations diffusées.",
                )}
              </li>
              <li>
                <b>Tokenisation d&apos;actifs réels.</b>{" "}
                {fr(
                  "Le jeton ne transfère par lui-même ni la propriété d'un immeuble, ni une créance, ni une part sociale. Le travail consiste à construire le lien juridique entre le jeton et le sous-jacent, à sécuriser sa transmission et à traiter le sort du détenteur en cas de défaillance de l'émetteur ou de la plateforme.",
                )}
              </li>
              <li>
                <b>NFT et propriété intellectuelle.</b>{" "}
                {fr(
                  "La création et l'exploitation d'un jeton non fongible peuvent impliquer des actes de reproduction ou de communication au public de l'œuvre associée, selon les fichiers effectivement incorporés, hébergés ou rendus accessibles ; le jeton peut aussi ne porter qu'un identifiant ou un lien. La détention du jeton n'emporte par elle-même aucune cession de droits. Le cabinet intervient en rédaction des cessions et licences comme en contentieux de la contrefaçon.",
                )}
              </li>
            </ul>
          </section>

          <section id="lcbft">
            <span className={styles.tag}>conformité</span>
            <h2>LCB-FT, connaissance du client et obligations déclaratives</h2>
            <p>
              {fr(
                "Le cabinet accompagne la construction et la révision des procédures de connaissance du client, de classification des risques, de vigilance renforcée et de déclaration de soupçon, ainsi que leur articulation avec les obligations de traçabilité du règlement (UE) 2023/1113 sur les informations accompagnant les transferts de fonds et de certains crypto-actifs.",
              )}
            </p>
            <p>
              {fr(
                "S'y ajoute depuis 2026 un volet fiscal. La directive (UE) 2023/2226, dite DAC8, transposée aux articles 1649 AC bis et suivants du code général des impôts, impose de collecter les données d'identification et de résidence fiscale des utilisateurs et de déclarer les opérations réalisées à compter du 1er janvier 2026. Le cabinet en traite le périmètre et l'articulation avec le RGPD.",
              )}
            </p>
            <h3>Contester une décision prise par un outil de conformité</h3>
            <p>
              {fr(
                "Le gel d'un compte ou le refus d'une opération résulte le plus souvent d'un score produit par un outil d'analyse automatisé, dont la logique n'est presque jamais exposée à la personne concernée. Le cabinet conduit ces contestations sur deux fronts simultanés : les obligations de transparence du RGPD et, lorsque la décision repose exclusivement sur un traitement automatisé produisant des effets juridiques ou comparables, les garanties attachées à son article 22 ; et l'examen technique du dispositif de scoring lui-même — données d'entrée, seuils, réalité de la supervision humaine.",
              )}
            </p>
          </section>

          <section id="contentieux">
            <span className={styles.tag}>contentieux</span>
            <h2>Contentieux et voies d&apos;exécution</h2>
            <p>
              {fr(
                "Les actions en responsabilité contractuelle visent les dysfonctionnements de plateformes, les interruptions de service, les erreurs d'exécution, les défaillances d'oracles et les manquements aux engagements de disponibilité. Le débat se déplace régulièrement sur la portée des clauses limitatives et, le cas échéant, sur la faute lourde, entendue non comme la seule gravité du manquement mais comme celle du comportement du débiteur.",
              )}
            </p>
            <p>
              {fr(
                "Les mesures d'exécution sur crypto-actifs constituent un terrain plus récent. Lorsque les actifs sont conservés par un intermédiaire identifiable, des mesures conservatoires ou d'exécution peuvent être recherchées entre ses mains. Leur régime dépend toutefois de la nature des droits du client, du mode de conservation retenu et de la localisation juridique de l'intermédiaire. Le cabinet intervient sur l'identification des détenteurs, sur les mesures conservatoires et sur la coordination avec les commissaires de justice.",
              )}
            </p>
            <h3>Actifs bloqués, gels et cessations d&apos;activité</h3>
            <p>
              {fr(
                "Le blocage d'actifs sur une plateforme relève d'une logique contractuelle et réglementaire : gel au titre des obligations de vigilance, restitution dans le cadre d'une cessation d'activité, litige sur les conditions générales, ou procédure collective ouverte contre le prestataire. Le cabinet intervient également au soutien des acteurs du secteur confrontés au refus ou à la clôture de leurs comptes bancaires, l'ordonnance n° 2024-936 ayant encadré les motifs de refus et imposé un préavis en cas de résiliation.",
              )}
            </p>
            <div className={styles.note}>
              <p>
                {fr(
                  "Les fraudes à l'investissement et les détournements de fonds relèvent d'une autre pratique du cabinet, dirigée principalement contre les établissements bancaires et les prestataires de services de paiement lorsque les fonds ont quitté un compte ouvert en France. Elle est exposée sur la page ",
                )}
                <Link href="/nos-domaines/avocat-escroquerie-fraude">
                  escroquerie et fraude bancaire
                </Link>
                .
              </p>
            </div>
          </section>

          <section id="methode">
            <span className={styles.tag}>méthode</span>
            <h2>Méthode d&apos;intervention</h2>
            <ul className={styles.stack}>
              <li>
                <b>Analyser le modèle avant les textes.</b>{" "}
                {fr(
                  "La qualification dépend de l'architecture réelle : qui détient les clés, qui exécute l'ordre, qui supporte le risque de contrepartie. Le premier temps de chaque dossier y est consacré, au besoin avec les équipes techniques du client.",
                )}
              </li>
              <li>
                <b>Cartographier les régimes et les autorités.</b>{" "}
                {fr(
                  "MiCA, droit financier, LCB-FT, obligations déclaratives, protection des données, droit de la consommation, droit d'auteur : les régimes se superposent et relèvent d'autorités différentes.",
                )}
              </li>
              <li>
                <b>Traduire en obligations contractuelles.</b>{" "}
                {fr(
                  "Les engagements techniques sont convertis en obligations identifiées, hiérarchisées entre l'essentiel et l'accessoire, et assorties de mécanismes de réparation cohérents avec cette hiérarchie.",
                )}
              </li>
              <li>
                <b>Rédiger en considération du litige futur.</b>{" "}
                {fr(
                  "Conservation de la preuve, clauses probatoires adaptées à des éléments techniques, choix de la loi et de la juridiction, articulation entre résolution amiable et accès au juge étatique.",
                )}
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* Section « Situations dans lesquelles le cabinet est intervenu » :
          volontairement absente (maquette). À réintroduire lorsque deux
          situations réelles et anonymisées seront disponibles. Styles
          .results/.slots/.slot conservés dans le module. */}

      {/* ===== Équipe ===== */}
      <div className={styles.team} id="equipe">
        <div className={styles.wrap}>
          <h2>L&apos;équipe sur ce domaine</h2>
          <p className={styles.lead}>
            {fr(
              "Le dossier est conduit par les avocats du cabinet, avec l'intervenant technique associé dès l'ouverture et non consulté en fin de course.",
            )}
          </p>
          <div className={styles.members}>
            {EQUIPE.map((m) => {
              const photo = MEMBRES[m.slug];
              return (
                <div className={styles.member} key={m.slug}>
                  <div className={styles.portrait}>
                    <Image
                      src={photo.photo}
                      alt={`Portrait de ${photo.nom.replace(/^Me /, "")}`}
                      fill
                      sizes="(max-width: 800px) 100vw, 360px"
                      style={{ objectFit: "cover", objectPosition: photo.position ?? "center" }}
                    />
                  </div>
                  <div className={styles.name}>{photo.nom.replace(/^Me /, "")}</div>
                  <div className={styles.role}>{m.role}</div>
                  <p>{fr(m.texte)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== FAQ ===== */}
      <div className={`${styles.wrap} ${styles.faq}`}>
        <h2>Questions fréquentes</h2>
        {FAQ_ITEMS.map((f) => (
          <details key={f.q}>
            <summary>{fr(f.q)}</summary>
            <p>{fr(f.a)}</p>
          </details>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className={styles.cta} id="contact">
        <div className={`${styles.wrap} ${styles.ctaGrid}`}>
          <div>
            <h2>Exposer votre situation</h2>
            <p style={{ maxWidth: "52ch", marginBottom: 0 }}>
              {fr(
                "Un premier échange permet de déterminer le régime applicable à votre projet ou les voies ouvertes dans votre dossier, avant tout engagement.",
              )}
            </p>
          </div>
          <div>
            <Link className={styles.btn} href="/contact">
              prendre rendez-vous
            </Link>
            <p className={styles.coord} style={{ marginTop: 20 }}>
              18 rue de Tilsitt, 75017 Paris
              <br />
              <a href="tel:+33181706200">01 81 70 62 00</a>
              <br />
              <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
