import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./contentieux.module.css";
import ContactForm from "./_components/ContactForm";
import WaysTabs from "./_components/WaysTabs";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/contentieux-informatique-commercial";
const CABINET_ID = `${URL_BASE}/#cabinet`; // seule entité globale existante (pas de #website/#organization)

const TEL_HREF = "tel:+33181706200";
const TEL_DISPLAY = "01 81 70 62 00";

// Maillage interne — routes réelles du projet.
const R_CONTRATS = "/nos-domaines/contrats-informatiques";
const R_CYBERSECURITE = "/nos-domaines/cybersecurite";
const R_CYBERCRIMINALITE = "/nos-domaines/cybercriminalite";
const R_RGPD = "/nos-domaines/rgpd-donnees-personnelles";

const TITLE = "Avocat contentieux informatique et commercial à Paris";
const DESCRIPTION =
  "Avocats en contentieux informatique et commercial : projets IT défaillants, SaaS, infogérance, perte de données, expertise judiciaire et responsabilité.";

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
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

/* Pas de balisage FAQPage (décision du brief, §4). */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL_BASE}${PATH}#webpage`,
      url: `${URL_BASE}${PATH}`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "fr",
      isPartOf: { "@id": CABINET_ID },
      publisher: { "@id": CABINET_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Domaines d’intervention", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Contentieux informatique et commercial", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

/* Six typologies — premier panneau ouvert au rendu serveur, les autres fermés :
   `<details>` natif, état porté par le HTML, aucun effet client, lisible sans JS. */
const TYPOLOGIES: { t: string; p: string }[] = [
  {
    t: "Projets d’intégration, migration et recette",
    p: "Retards, dérive du périmètre, anomalies bloquantes, refus ou contestation de la recette, migrations de données incomplètes, reprise d’historique défaillante. Le débat porte sur le contenu réel des engagements, sur le partage des tâches entre les parties et sur le respect du devoir de collaboration du client.",
  },
  {
    t: "SaaS, infogérance, maintenance et support",
    p: "Indisponibilités, niveaux de service non tenus, délais de correction, évolutions tarifaires, suspension de service pour impayés, périmètre exact du support. L’analyse confronte les engagements de service aux mesures effectivement relevées et aux modalités de constatation prévues au contrat.",
  },
  {
    t: "Perte de données, sauvegardes et cybersécurité",
    p: "Données non restituables, sauvegardes non testées, incident de sécurité imputé à la configuration ou à l’administration du système. Le litige suppose de rapprocher les obligations de sécurité souscrites, les interventions réalisées et les constatations techniques disponibles.",
  },
  {
    t: "Rupture, résiliation et réversibilité",
    p: "Conditions de résiliation, préavis, rupture jugée fautive, continuité du service pendant la transition, restitution des données et de la documentation. La réversibilité — transfert organisé du service vers le client ou vers un autre prestataire — constitue souvent l’enjeu le plus urgent.",
  },
  {
    t: "Code, développements et propriété intellectuelle",
    p: "Titularité des développements spécifiques, étendue des droits concédés, remise des sources et de la documentation, composants tiers et licences libres, réutilisation contestée de développements. Ces questions déterminent la capacité du client à poursuivre l’exploitation après la rupture.",
  },
  {
    t: "Financements, contrats interdépendants, factures et impayés",
    p: "Location financière, cession de créance, prestations facturées et contestées, suspension de paiement. Lorsque plusieurs contrats concourent à une même opération, ils peuvent être qualifiés d’interdépendants : le sort de l’un est alors susceptible d’influer sur celui des autres, ce qui commande d’organiser la défense dans chacune des procédures.",
  },
];

/* Six questions fréquentes — même dispositif `<details>` natif. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Quand consulter un avocat dans un projet informatique en difficulté ?",
    a: "Avant l’envoi d’une mise en demeure, avant une résiliation et avant toute prise de position écrite susceptible d’être opposée ensuite. À ce stade, les échanges, tickets et journaux existent encore et les clauses de notification ou de remède peuvent être mises en œuvre utilement. Une consultation intervenant après la rupture laisse moins de latitude.",
  },
  {
    q: "Peut-on résilier un contrat informatique qui ne fonctionne pas ?",
    a: "C’est possible, mais les conditions comptent autant que le principe. Le contrat organise le plus souvent une notification préalable, un délai de correction et des modalités de résiliation. Une rupture qui s’en écarte peut être jugée fautive et exposer son auteur. Il faut également anticiper la continuité du service et la restitution des données, faute de quoi l’entreprise se retrouve sans solution opérationnelle.",
  },
  {
    q: "Une expertise judiciaire est-elle toujours nécessaire ?",
    a: "Non. Elle s’impose lorsque les faits techniques sont réellement contestés et que le débat ne peut être tranché sur pièces. Lorsque les documents contractuels, les échanges et les journaux suffisent à établir les manquements, d’autres voies existent : constat, mesure de preuve avant tout procès, ou discussion directe sur les pièces. L’expertise a un coût et une durée qui doivent être mis en balance avec l’enjeu économique.",
  },
  {
    q: "Une recette signée empêche-t-elle toute contestation ?",
    a: "Pas nécessairement. Tout dépend des termes du procès-verbal, des réserves qui y figurent, du périmètre effectivement vérifié et des obligations qui subsistent après la recette, notamment de maintenance ou de garantie. Une acceptation ne couvre pas davantage ce qui n’était pas décelable lors des tests. Chaque situation s’apprécie au regard des documents et de la chronologie.",
  },
  {
    q: "Un prestataire est-il automatiquement responsable d’une perte de données ?",
    a: "Non. La responsabilité suppose d’identifier une obligation précise — sauvegarde, restauration, sécurisation, administration — et de la rapprocher de ce qui a été effectivement réalisé. Le périmètre contractuel, la nature de l’obligation, les clauses limitatives et le comportement du client entrent dans la discussion. C’est la confrontation des engagements aux constatations techniques qui détermine l’issue.",
  },
  {
    q: "Le cabinet défend-il également les prestataires informatiques ?",
    a: "Oui. Éditeurs, ESN, intégrateurs, infogérants et hébergeurs sont défendus dans les mêmes conditions, sous réserve de l’absence de conflit d’intérêts. La défense d’un prestataire suppose notamment d’examiner le devoir de collaboration du client, le périmètre réel des engagements souscrits et l’imputabilité des difficultés rencontrées.",
  },
];

/* Expertise judiciaire — quatre étapes (mêmes textes que la version en paragraphes). */
const EXPERTISE: { k: string; t: string; p: string[] }[] = [
  {
    k: "Étape 01",
    t: "La mission",
    p: [
      "L’expertise ne tranche pas le droit. Elle éclaire les faits techniques compris dans la mission confiée à l’expert.",
      "La mission détermine le périmètre des constatations : ce qui n’y figure pas ne sera pas examiné. Sa rédaction, puis son éventuelle extension, constituent donc un enjeu à part entière.",
    ],
  },
  {
    k: "Étape 02",
    t: "Préserver et préparer",
    p: [
      "Les environnements, configurations, journaux et documents doivent être préservés en l’état dès l’annonce de la mesure.",
      "Chaque réunion se prépare : pièces communiquées à l’avance, points techniques identifiés, questions posées à l’expert.",
    ],
  },
  {
    k: "Étape 03",
    t: "Les dires",
    p: [
      "La coordination avec un consultant technique permet de formuler des observations utiles sur les constatations.",
      "Les dires — observations écrites adressées à l’expert — engagent la discussion technique et doivent être reliés aux obligations contractuelles.",
    ],
  },
  {
    k: "Étape 04",
    t: "Le rapport",
    p: [
      "Le contradictoire, principe selon lequel chaque partie doit être mise en mesure de discuter les pièces et constatations de l’autre, gouverne l’ensemble des opérations.",
      "Le rapport déposé fait ensuite l’objet d’une exploitation juridique : ce qu’il établit, ce qu’il écarte et ce qu’il laisse ouvert.",
    ],
  },
];

const EQUIPE = [
  {
    nom: "Me Alexandre Lazarègue",
    role: "Avocat au barreau de Paris — droit du numérique et contentieux",
    texte:
      "Il définit la stratégie, qualifie les obligations, organise la preuve et conduit la négociation ou la procédure.",
    photo: "/images/alexandre-pro.jpg",
  },
  {
    nom: "Me Amir Ben Majed",
    role: "Avocat au barreau de l’Essonne — contrats informatiques et contentieux IT",
    texte:
      "Il intervient sur l’analyse contractuelle, la chronologie du projet, les mises en demeure, les expertises et les écritures contentieuses.",
    photo: "/images/amir-pro.jpg",
  },
  {
    nom: "Khalid Sookia",
    role: "Consultant technique — systèmes d’information et cybersécurité",
    texte:
      "Il peut examiner les journaux, configurations, sauvegardes, versions, interventions et conditions techniques de la réversibilité.",
    photo: "/images/khalid-pro.jpg",
  },
];

function Markers() {
  return (
    <>
      <div className="marker">
        <p className="marker-label">Entreprises accompagnées</p>
        <p className="marker-value">Entreprises clientes et prestataires informatiques</p>
      </div>
      <div className="marker">
        <p className="marker-label">Position procédurale</p>
        <p className="marker-value">
          Intervention en demande comme en défense, avant ou pendant la procédure
        </p>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className={styles.skipLink} href="#contenu">Aller au contenu</a>

      <div className={styles.contentieux}>
        {/* Fil d'Ariane (réserve la hauteur du header global) */}
        <nav className="crumbs dark" aria-label="Fil d’Ariane">
          <div className="wrap">
            <ol>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/nos-domaines">Domaines d’intervention</Link></li>
              <li><span aria-current="page">Contentieux informatique et commercial</span></li>
            </ol>
          </div>
        </nav>

        <main id="contenu" tabIndex={-1}>
          {/* 1 · HERO */}
          <section className="hero dark" aria-labelledby="h1">
            <div className="wrap">
              <div className="hero-grid">
                <div>
                  <p className="eyebrow">Contentieux informatique · Litiges commerciaux · Paris et France</p>
                  <h1 id="h1">Avocat en contentieux informatique et commercial</h1>
                  <p className="hero-promise">{fr("Projet IT défaillant, logiciel inutilisable, perte de données, rupture d’un contrat SaaS ou responsabilité d’un prestataire : le cabinet défend les entreprises lorsque les contrats, les responsabilités et les faits techniques sont contestés.")}</p>
                  <p className="hero-support">{fr("Nous établissons la chronologie, préservons les preuves, qualifions les obligations de chaque partie et construisons la stratégie : négociation, expertise, mesure urgente ou procédure judiciaire.")}</p>
                  <p className="hero-cta">
                    <a className="btn" href="#contact">Faire le point sur le litige</a>
                    <a className="hero-link" href="#voies">Voir les voies possibles ↓</a>
                  </p>
                  <p className="hero-reassure">Analyse des contrats · Preuve technique · Expertise judiciaire · Défense devant le tribunal</p>
                </div>
                <div className="hero-aside">
                  <Markers />
                </div>
              </div>
            </div>
          </section>

          {/* 2 · RECONNAISSANCE DE LA SITUATION */}
          <section aria-labelledby="h-situations">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Votre situation</p>
                <h2 id="h-situations">{fr("Quelle difficulté rencontrez-vous ?")}</h2>
                <p className="lede">Trois situations reviennent fréquemment dans les litiges informatiques accompagnés par le cabinet.</p>
              </div>
              <div className="sit-grid">
                <article className="sit">
                  <h3>Le projet ne fonctionne plus</h3>
                  <ul>
                    <li>Retards et anomalies persistantes</li>
                    <li>Logiciel ou solution non conforme à ce qui était attendu</li>
                    <li>Intégration ou migration défaillante</li>
                    <li>Perte de données ou sauvegardes inutilisables</li>
                    <li>Factures contestées, prestataire mis en cause</li>
                  </ul>
                </article>
                <article className="sit">
                  <h3>Le contrat ou la relation se rompt</h3>
                  <ul>
                    <li>Résiliation annoncée ou déjà notifiée</li>
                    <li>{fr("Refus de réversibilité, c’est-à-dire de restitution des données et de transfert du service vers un autre prestataire")}</li>
                    <li>Difficulté à récupérer les données</li>
                    <li>Manquements éventuels du client à son devoir de collaboration</li>
                  </ul>
                </article>
                <article className="sit sit-hot">
                  <h3>Le litige est déjà engagé</h3>
                  <ul>
                    <li>Mise en demeure reçue ou envoyée</li>
                    <li>Assignation devant le tribunal</li>
                    <li>{fr("Référé, procédure rapide permettant d’obtenir une mesure provisoire ou urgente")}</li>
                    <li>Expertise envisagée ou déjà ordonnée</li>
                    <li>Procédure en demande ou en défense</li>
                  </ul>
                </article>
              </div>
              <p className="note">Le cabinet intervient pour les entreprises clientes comme pour les éditeurs, ESN, intégrateurs et autres prestataires informatiques, sous réserve de l’absence de conflit d’intérêts.</p>
              <div className="mobile-markers">
                <Markers />
              </div>
            </div>
          </section>

          {/* 3 · MESURES IMMÉDIATES — Préserver / Vérifier / Décider en grands mots */}
          <section className="ghost" aria-labelledby="h-mesures">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Premiers réflexes</p>
                <h2 id="h-mesures">Les décisions à prendre sans attendre</h2>
                <p className="lede">Les premiers jours déterminent souvent ce qui pourra être démontré ensuite. Trois ordres de mesures méritent d’être engagés avant toute prise de position écrite.</p>
              </div>
              <div className="pvd">
                <section>
                  <span className="pvd-big">Préserver</span>
                  <ul>
                    <li>Les contrats, annexes et versions successives</li>
                    <li>Les tickets, journaux techniques et échanges utiles, exportés dans un format exploitable</li>
                    <li>Les anomalies, documentées sans altérer l’environnement</li>
                  </ul>
                </section>
                <section>
                  <span className="pvd-big">Vérifier</span>
                  <ul>
                    <li>Les accès détenus par chaque partie</li>
                    <li>L’état réel des sauvegardes</li>
                    <li>Les sommes payées et les sommes réclamées</li>
                    <li>Les clauses de notification, de remède, de résiliation et de réversibilité</li>
                  </ul>
                </section>
                <section className="pvd-last">
                  <span className="pvd-big">Décider</span>
                  <ul>
                    <li>Le risque d’interruption du service et ses conséquences d’exploitation</li>
                    <li>Les délais susceptibles d’affecter l’action</li>
                    <li>Le moment et la forme de la première prise de position écrite</li>
                  </ul>
                </section>
              </div>
              <p className="warn">Une mise en demeure envoyée trop tôt ou une rupture mal préparée peut fragiliser la preuve et la continuité du service.</p>
            </div>
          </section>

          {/* 4 · CE QU'IL FAUT ÉTABLIR — frise 5 éléments, puis matrice, puis note */}
          <section aria-labelledby="h-methode">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Construction du dossier</p>
                <h2 id="h-methode">Ce qu’il faut établir avant d’agir</h2>
                <p className="lede">Un litige informatique ne se résume pas à la question de savoir qui a tort. Chaque reproche doit être relié à un engagement, un fait observable, une preuve et une conséquence.</p>
              </div>
              <ol className="five" aria-label="Les cinq éléments examinés">
                <li><span>01</span>L’ensemble contractuel</li>
                <li><span>02</span>La chronologie du projet</li>
                <li><span>03</span>Les obligations de chaque partie</li>
                <li><span>04</span>Les faits techniques</li>
                <li><span>05</span>L’objectif économique</li>
              </ol>
              <p className="meta matrix-intro">Trois exemples de la matrice utilisée pour relier les reproches aux engagements et aux pièces.</p>
              <table className="matrix">
                <caption>Trois exemples de la matrice utilisée pour relier les reproches aux engagements et aux pièces.</caption>
                <thead>
                  <tr>
                    <th scope="col">Engagement</th>
                    <th scope="col">Fait constaté</th>
                    <th scope="col">Preuve disponible</th>
                    <th scope="col">Conséquence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" data-label="Engagement">Date de livraison</th>
                    <td data-label="Fait constaté">Retard ou livraison incomplète</td>
                    <td data-label="Preuve disponible">Contrat, planning et tickets</td>
                    <td data-label="Conséquence">Exécution, rupture ou indemnisation</td>
                  </tr>
                  <tr>
                    <th scope="row" data-label="Engagement">Obligation de sauvegarde</th>
                    <td data-label="Fait constaté">Données non récupérables</td>
                    <td data-label="Preuve disponible">Journaux, rapports et tests de restauration</td>
                    <td data-label="Conséquence">Responsabilité et coût de reconstitution</td>
                  </tr>
                  <tr>
                    <th scope="row" data-label="Engagement">Critères de recette</th>
                    <td data-label="Fait constaté">Anomalies ou réserves</td>
                    <td data-label="Preuve disponible">Cahier des charges, procès-verbal et échanges</td>
                    <td data-label="Conséquence">Conformité ou contestation de la recette</td>
                  </tr>
                </tbody>
              </table>
              <p className="note-box">La recette désigne l’opération par laquelle le client vérifie et accepte la solution livrée, le plus souvent au moyen d’un procès-verbal et, le cas échéant, de réserves.</p>
            </div>
          </section>

          {/* 5 · TYPOLOGIES — deux colonnes (intro + accordéons) */}
          <section className="warm" aria-labelledby="h-typologies">
            <div className="wrap split">
              <div className="sec-head split-head">
                <p className="eyebrow">Champ d’intervention</p>
                <h2 id="h-typologies">Les principaux contentieux informatiques</h2>
                <p className="lede">Six ensembles recouvrent les litiges dont la dimension logicielle, contractuelle ou probatoire appelle une compétence en droit informatique.</p>
              </div>
              <div className="acc">
                {TYPOLOGIES.map((item, i) => (
                  <details className="acc-item" key={item.t} open={i === 0}>
                    <summary>
                      <h3 className="acc-q">{item.t}</h3>
                      <span className="acc-sign" aria-hidden="true" />
                    </summary>
                    <div className="acc-panel">
                      <p>{fr(item.p)}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 6 · VOIES POSSIBLES — composant à onglets (navy) */}
          <section id="voies" className="dark demo2" aria-labelledby="h-solutions">
            <div className="wrap">
              <div className="v-intro">
                <div className="sec-head" style={{ marginBottom: 0 }}>
                  <p className="eyebrow">Voies possibles</p>
                  <h2 id="h-solutions">Négocier, faire exécuter, organiser la sortie ou saisir le juge</h2>
                  <p className="lede">La procédure n’est pas une fin : elle est au service d’un objectif économique — remettre le projet en marche, récupérer des données, limiter une perte ou obtenir une indemnisation.</p>
                </div>
                <p className="v-strong">La mise en demeure n’est jamais une réponse automatique.</p>
              </div>
              <WaysTabs />
            </div>
          </section>

          {/* 7 · EXPERTISE JUDICIAIRE — quatre étapes */}
          <section aria-labelledby="h-expertise">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Mesure d’instruction</p>
                <h2 id="h-expertise">Préparer et conduire une expertise judiciaire informatique</h2>
              </div>
              <ol className="steps4">
                {EXPERTISE.map((s) => (
                  <li key={s.k}>
                    <span className="k">{s.k}</span>
                    <h3>{s.t}</h3>
                    {s.p.map((para) => (
                      <p key={para}>{fr(para)}</p>
                    ))}
                  </li>
                ))}
              </ol>
              <p className="expertise-cta"><a className="link-arrow" href="#contact">Faire le point sur une expertise en cours →</a></p>
            </div>
          </section>

          {/* 8 · CAS CLIENTS — placés après l'expertise, comme preuve */}
          <section className="ghost" aria-labelledby="h-cas">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Cas clients</p>
                <h2 id="h-cas">Deux exemples parmi les dossiers du cabinet</h2>
                <p className="lede">Contrats, chronologie et faits techniques doivent être examinés ensemble pour déterminer les responsabilités et choisir la procédure adaptée. Ces deux dossiers illustrent la méthode ; le cabinet intervient sur l’ensemble des contentieux décrits plus haut.</p>
              </div>
              <div className="cases">
                <article className="case">
                  <div className="case-col">
                    <p className="case-tag">Cas client 01</p>
                    <h3>Infogérance et financements interdépendants</h3>
                    <dl>
                      <dt>Situation</dt>
                      <dd>Une entreprise avait confié l’installation et l’exploitation de son environnement informatique à un prestataire. Le projet associait plusieurs prestations informatiques à des contrats de location financière conclus auprès de différents organismes.</dd>
                      <dt>Difficulté</dt>
                      <dd>L’entreprise contestait la conformité des prestations et leur utilité, tandis que les loyers continuaient d’être réclamés. Le litige nécessitait d’examiner ensemble les contrats informatiques, les conditions de livraison et de recette ainsi que les financements associés.</dd>
                    </dl>
                  </div>
                  <div className="case-col">
                    <dl>
                      <dt>Intervention</dt>
                      <dd>Le cabinet a reconstitué la chronologie du projet, rapproché les engagements contractuels des prestations effectivement réalisées et analysé l’interdépendance des contrats. Il a également organisé la défense de l’entreprise dans les différentes procédures engagées par le prestataire et les organismes financiers.</dd>
                      <dt>État du dossier</dt>
                      <dd>Les responsabilités du prestataire et les conséquences sur les contrats de financement sont examinées dans le cadre des procédures en cours devant le tribunal de commerce.</dd>
                    </dl>
                    <p className="disclaimer">Dossier anonymisé — procédure en cours. La présentation ne préjuge pas de la décision à intervenir.</p>
                  </div>
                </article>
                <article className="case">
                  <div className="case-col">
                    <p className="case-tag">Cas client 02</p>
                    <h3>Cyberattaque et responsabilité du prestataire informatique</h3>
                    <dl>
                      <dt>Situation</dt>
                      <dd>À la suite d’une intrusion informatique, une entreprise a mis en cause les conditions de sécurisation et d’administration de son système d’information par son prestataire.</dd>
                      <dt>Difficulté</dt>
                      <dd>L’origine et le déroulement de l’attaque devaient être rapprochés des configurations techniques, des accès, des équipements réseau et des interventions réalisées. Le désaccord portait également sur la possibilité d’imputer les conséquences de l’incident à un manquement contractuel déterminé.</dd>
                    </dl>
                  </div>
                  <div className="case-col">
                    <dl>
                      <dt>Intervention</dt>
                      <dd>Le cabinet intervient dans le cadre de l’expertise afin d’organiser les pièces, de confronter les constatations techniques aux obligations contractuelles et de formuler les observations utiles. Le travail est coordonné avec un conseil technique, notamment sur l’analyse des équipements et des configurations concernés.</dd>
                      <dt>État du dossier</dt>
                      <dd>Les opérations d’expertise sont destinées à établir les circonstances techniques de l’incident et à éclairer les responsabilités susceptibles d’être discutées ultérieurement devant le juge.</dd>
                    </dl>
                    <p className="disclaimer">Dossier anonymisé — expertise en cours. Les responsabilités ne sont pas définitivement établies.</p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* 9 · CE QUE LE CABINET PRÉPARE */}
          <section aria-labelledby="h-livrables">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Travail produit</p>
                <h2 id="h-livrables">Ce que le cabinet prépare dans un dossier</h2>
                <p className="lede">Les documents produits dépendent de l’état d’avancement du litige et de la voie retenue.</p>
              </div>
              <div className="prod">
                <section>
                  <h3>Analyser et structurer</h3>
                  <ul>
                    <li>Chronologie documentée</li>
                    <li>Matrice obligations, manquements, preuves et conséquences</li>
                    <li>Note d’analyse des responsabilités</li>
                    <li>Analyse des préjudices et des clauses limitatives</li>
                  </ul>
                </section>
                <section>
                  <h3>Préserver et négocier</h3>
                  <ul>
                    <li>Stratégie de conservation des preuves</li>
                    <li>Mise en demeure</li>
                    <li>Réponse à une mise en cause</li>
                    <li>Protocole transactionnel</li>
                  </ul>
                </section>
                <section>
                  <h3>Agir ou se défendre</h3>
                  <ul>
                    <li>Assignation</li>
                    <li>Conclusions en défense</li>
                    <li>Demande d’expertise et proposition de mission</li>
                    <li>Dires à l’expert</li>
                    <li>Bordereau de pièces structuré</li>
                  </ul>
                </section>
              </div>
              <p className="warn">Le premier livrable utile est souvent la matrice du litige : elle évite de présenter séparément les faits techniques, les reproches juridiques et les demandes financières.</p>
            </div>
          </section>

          {/* 10 · COMMENT COMMENCE L'INTERVENTION */}
          <section className="ghost" aria-labelledby="h-intervention">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Déroulement</p>
                <h2 id="h-intervention">{fr("Comment commence l’intervention ?")}</h2>
                <p className="lede">Il n’est pas nécessaire de réunir l’ensemble des courriels et des contrats avant le premier échange. Le tri des pièces fait partie du travail.</p>
              </div>
              <ol className="steps">
                <li>
                  <span className="num" aria-hidden="true">1</span>
                  <h3>Premier échange</h3>
                  <p>Exposé du différend, de son état d’avancement et des échéances connues.</p>
                </li>
                <li>
                  <span className="num" aria-hidden="true">2</span>
                  <h3>Collecte ciblée</h3>
                  <p>Liste précise des documents et éléments techniques réellement utiles à ce stade.</p>
                </li>
                <li>
                  <span className="num" aria-hidden="true">3</span>
                  <h3>Analyse juridique et technique</h3>
                  <p>Chronologie, qualification des obligations et confrontation aux faits constatés.</p>
                </li>
                <li>
                  <span className="num" aria-hidden="true">4</span>
                  <h3>Présentation des scénarios</h3>
                  <p>Options envisageables, risques respectifs, délais et conséquences financières.</p>
                </li>
                <li>
                  <span className="num" aria-hidden="true">5</span>
                  <h3>Mise en œuvre</h3>
                  <p>Exécution de la stratégie retenue, en négociation, en expertise ou devant le juge.</p>
                </li>
              </ol>
            </div>
          </section>

          {/* 11 · ÉQUIPE */}
          <section aria-labelledby="h-equipe">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Intervenants</p>
                <h2 id="h-equipe">Une analyse juridique appuyée par une compréhension technique</h2>
              </div>
              <ul className="team">
                {EQUIPE.map((m) => (
                  <li className="member" key={m.nom}>
                    <div className="portrait">
                      <Image src={m.photo} alt={m.nom} fill sizes="(max-width: 900px) 80px, 96px" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <h3>{m.nom}</h3>
                      <p className="role">{m.role}</p>
                      <p>{m.texte}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="note" style={{ marginTop: "var(--sp-36)" }}>Leurs interventions sont coordonnées afin de relier les constatations techniques aux obligations contractuelles, à la preuve et aux demandes présentées.</p>
            </div>
          </section>

          {/* 12 · HONORAIRES (bouton intermédiaire supprimé) */}
          <section className="warm" aria-labelledby="h-honoraires">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Honoraires</p>
                <h2 id="h-honoraires">{fr("Comment sont fixés les honoraires ?")}</h2>
              </div>
              <div className="fees">
                <div>
                  <h3>Ce qui détermine le coût</h3>
                  <ul>
                    <li>Le volume contractuel et documentaire</li>
                    <li>La complexité technique du litige</li>
                    <li>L’urgence</li>
                    <li>Le nombre de parties en cause</li>
                    <li>L’existence d’une expertise</li>
                    <li>La juridiction saisie</li>
                  </ul>
                </div>
                <div>
                  <h3>Ce que fixe la convention d’honoraires</h3>
                  <ul>
                    <li>Le périmètre de la mission</li>
                    <li>Les actes ou les phases couverts</li>
                    <li>Le taux horaire ou le forfait</li>
                    <li>Les frais prévisibles</li>
                    <li>L’intervention éventuelle d’un consultant technique</li>
                    <li>L’éventuel honoraire de résultat</li>
                  </ul>
                </div>
              </div>
              <p className="warn">Une première mission peut être limitée à l’analyse du dossier, des responsabilités et des options, avant toute décision d’engager une procédure.</p>
            </div>
          </section>

          {/* 13 · FAQ (aucun balisage FAQPage — décision du brief) */}
          <section aria-labelledby="h-faq">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Questions fréquentes</p>
                <h2 id="h-faq">Questions fréquentes sur les contentieux informatiques</h2>
              </div>
              <div className="acc">
                {FAQ.map((item, i) => (
                  <details className="acc-item" key={item.q} open={i === 0}>
                    <summary>
                      <h3 className="acc-q">{fr(item.q)}</h3>
                      <span className="acc-sign" aria-hidden="true" />
                    </summary>
                    <div className="acc-panel">
                      <p>{fr(item.a)}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 14 · SUJETS LIÉS */}
          <section className="ghost" aria-labelledby="h-liens">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Sujets liés</p>
                <h2 id="h-liens">Avant, à côté et après le litige</h2>
              </div>
              <div className="related">
                <div>
                  <Link className="link-arrow" href={R_CONTRATS}>Contrats informatiques →</Link>
                  <p>Audit, rédaction et négociation des contrats avant tout différend : cette page-ci intervient lorsque le désaccord doit être prouvé et porté devant un juge.</p>
                </div>
                <div>
                  <Link className="link-arrow" href={R_CYBERSECURITE}>Cybersécurité →</Link>
                  <p>Obligations de sécurité, gouvernance et coordination juridique d’un incident : la responsabilité d’un prestataire à la suite d’une attaque relève en revanche de la présente page.</p>
                </div>
                <div>
                  <Link className="link-arrow" href={R_CYBERCRIMINALITE}>Cybercriminalité →</Link>
                  <p>Plainte, identification et poursuite de l’auteur d’une attaque : la recherche de l’auteur y est traitée, la mise en cause du prestataire ici.</p>
                </div>
                <div>
                  <Link className="link-arrow" href={R_RGPD}>RGPD et violations de données →</Link>
                  <p>Conformité, notification d’une violation et relations avec la CNIL : le contentieux contractuel né de la perte des données reste traité sur cette page.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 15 · CONTACT */}
          <section className="dark" id="contact" aria-labelledby="h-contact">
            <div className="wrap">
              <div className="contact-grid">
                <div>
                  <p className="eyebrow">Litige IT · Expertise · Résolution · Responsabilité</p>
                  <h2 id="h-contact">Parlons de votre situation</h2>
                  <p className="lede">Vous pouvez nous exposer brièvement le différend, son état d’avancement et les éventuelles échéances en cours. Le cabinet vous indiquera ensuite les premiers documents utiles et le périmètre de l’analyse.</p>
                  <div className="contact-cta">
                    <a className="btn cta-jump" href="#form-title">Faire le point sur le litige</a>
                    <a className="btn btn-sec" href={TEL_HREF}>Appeler le cabinet</a>
                  </div>
                  <address className="addr">
                    Lazarègue Avocats<br />
                    18 rue de Tilsitt, 75017 Paris<br />
                    <a href={TEL_HREF}>{TEL_DISPLAY}</a><br />
                    Interventions à Paris et partout en France
                  </address>
                </div>
                <div className="form">
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>
          {/* Barre de contact mobile : fournie par le layout global (site-header). */}
        </main>
      </div>
    </>
  );
}
