import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./observatoire-2026.module.css";

/**
 * Observatoire de la médiation bancaire 2026 — « La médiation bancaire face à
 * la fraude : état des lieux » (publié le 3 novembre 2026).
 *
 * Textes repris mot pour mot de la maquette validée (« Page Observatoire –
 * desktop »), avec les seules adaptations décidées par le cabinet : voix « le
 * cabinet » (aucun « nous »/« notre ») et CTA final harmonisé. Couleurs
 * ramenées aux tokens de la charte. Header, footer et barre basse mobile
 * viennent du layout global.
 *
 * Téléchargement libre et direct : aucun formulaire, aucune collecte d'e-mail.
 * Les clics sur le PDF et le ZIP poussent l'événement dataLayer
 * `telechargement_observatoire` (via data-track, components/analytics/
 * analytics-events.tsx) ; GTM ne le relaie qu'après consentement.
 */

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/ressources/observatoire-mediation-bancaire-2026";
const DOSSIER = "/ressources/observatoire";
const PDF = `${DOSSIER}/Observatoire-mediation-bancaire-fraude-2026.pdf`;
const ZIP = `${DOSSIER}/Dossier-presse-Observatoire-2026.zip`;
const COUVERTURE = `${DOSSIER}/couverture-observatoire-2026.jpg`;
const OG = `${DOSSIER}/og-observatoire-2026.jpg`;

const TITLE = "Observatoire 2026 : la médiation bancaire face à la fraude";
const DESCRIPTION =
  "Rapport 2026 : délais, résultats et gestes des médiateurs bancaires face à la fraude, comparés à 453 décisions de justice. Accès libre au PDF.";
const H1 = "La médiation bancaire face à la fraude : état des lieux";
const OG_ALT = "Sur 100 dossiers, que reçoit la victime de fraude ? Médiateur et juge comparés — Observatoire 2026, Lazarègue Avocats";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Lazarègue Avocats",
    images: [{ url: OG, width: 1200, height: 630, alt: OG_ALT }],
    locale: "fr_FR",
    type: "article",
    publishedTime: "2026-11-03",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG, alt: OG_ALT }],
  },
};

const CABINET = { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` };

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Report",
      name: H1,
      alternateName: "Observatoire de la médiation bancaire 2026",
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      datePublished: "2026-11-03",
      url: `${URL_BASE}${PATH}`,
      image: `${URL_BASE}${COUVERTURE}`,
      author: CABINET,
      publisher: CABINET,
      isAccessibleForFree: true,
      encoding: {
        "@type": "MediaObject",
        contentUrl: `${URL_BASE}${PDF}`,
        encodingFormat: "application/pdf",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
        { "@type": "ListItem", position: 3, name: "Outils et observatoires", item: `${URL_BASE}/outils` },
        { "@type": "ListItem", position: 4, name: "Observatoire 2026", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

/* ---------- Contenus (verbatim maquette) ---------- */

const CHIFFRES = [
  {
    chiffre: (
      <>
        3,6 % <span className={styles.kpiVs}>vs</span> 34 %
      </>
    ),
    texte: "de remboursements intégraux : médiateur de la FBF, puis juridictions",
    source: "Médiateur FBF 2024 · 448 décisions 2026",
  },
  {
    chiffre: "229 jours",
    texte: "de traitement moyen après recevabilité, pour un délai légal de 90 jours",
    source: "Médiateur FBF 2024 · C. consom., R. 612-5",
  },
  {
    chiffre: "≈ 1 100 €",
    texte: "de geste moyen proposé ; 71 % des gestes sont inférieurs à 1 000 €",
    source: "Calcul sur le rapport FBF 2024",
  },
  {
    chiffre: "4 sur 10",
    texte: "victimes obtiennent gain de cause devant le juge en 2026, près d'une sur deux hors de Paris",
    source: "448 décisions au fond, Doctrine",
  },
];

const EXIGENCES = [
  {
    titre: "Des sources publiques et vérifiables.",
    texte: "Rapports annuels des médiateurs, Banque de France, décisions de justice : chaque chiffre renvoie à sa source.",
  },
  {
    titre: "Aucune estimation présentée comme un fait.",
    texte: "Quand une donnée manque, le rapport le dit. Les calculs sont expliqués.",
  },
  {
    titre: "Les limites exposées.",
    texte: "Les biais de chaque série sont décrits dans le rapport, quel que soit le sens dans lequel ils jouent.",
  },
  {
    titre: "L'indépendance.",
    texte: "Rapport réalisé par le cabinet, sans commande ni financement extérieur.",
  },
];

const ETAPES = [
  {
    label: "01 · LES MÉDIATEURS",
    texte: "Le dernier rapport annuel publié par huit médiateurs bancaires : saisines, recevabilité, délais, sens des propositions, montants.",
  },
  {
    label: "02 · LES JUGES",
    texte: "453 décisions de fraude aux paiements rendues de janvier à octobre 2026, recensées sur Doctrine ; chaque décision qualifiée à partir de son texte intégral.",
  },
  {
    label: "03 · LA CONFRONTATION",
    texte: "Les deux séries comparées indicateur par indicateur, puis lues au regard du droit applicable : code monétaire et financier, Cour de cassation, CJUE.",
  },
];

const CONSTATS = [
  {
    titre: "La médiation donne souvent quelque chose, rarement ce que la loi accorde.",
    texte: "Le médiateur de la FBF formule une proposition favorable ou partielle dans 58 % des cas, mais un remboursement intégral dans 3,6 % seulement. Devant le juge, cette proportion est près de dix fois supérieure.",
  },
  {
    titre: "Pour les opérations non autorisées, le médiateur raisonne en équité, pas en droit.",
    texte: "C'est pourtant pour ces opérations que la loi impose un remboursement intégral, sauf négligence grave prouvée par la banque. Le geste d'équité se substitue à un droit.",
  },
  {
    titre: "Les délais légaux ne sont pas tenus dans les grands réseaux.",
    texte: "229 jours à la FBF, 204 jours à La Banque Postale, où 30 % seulement des dossiers sont traités dans les 90 jours.",
  },
  {
    titre: "Les résultats varient fortement d'un médiateur à l'autre.",
    texte: "De 14 % d'avis favorables en tout ou partie à la Caisse d'Épargne Île-de-France (2023, hors dossiers réglés avant avis) à 60 % d'issues favorables, accords amiables compris, au Crédit Mutuel Arkéa (2025). Chaque banque désigne son médiateur ; le client n'a pas le choix.",
  },
  {
    titre: "Le droit est du côté des victimes, et le juge peut leur donner pleinement raison.",
    texte: "La Cour de cassation fait peser sur la banque la preuve de la négligence grave, y compris en cas de spoofing ou de faux conseiller. En 2026, environ quatre victimes sur dix obtiennent gain de cause, et récupèrent alors en général l'intégralité de la somme, avec les intérêts majorés.",
  },
];

/* Largeurs des barres : valeurs exactes de la maquette (en %). */
const COMPARAISON = [
  {
    titre: "Remboursement intégral",
    mediateur: { largeur: 3.6, libelle: "3,6 %" },
    juge: { largeur: 33.9, libelle: "34 %" },
  },
  {
    titre: "Remboursement partiel",
    mediateur: { largeur: 54.6, libelle: "54,6 %" },
    juge: { largeur: 9.4, libelle: "9 %" },
  },
  {
    titre: "Rien",
    mediateur: { largeur: 41.8, libelle: "41,8 %" },
    juge: { largeur: 56.7, libelle: "57 %" },
  },
];

const JURISPRUDENCE = [
  {
    date: ["12 NOV. 2020", "CASS. COM., N° 19-12.112", "PUBLIÉ"],
    titre: "La preuve de l'authentification",
    texte: "La banque qui entend laisser la perte au client pour négligence grave doit aussi prouver que l'opération a été authentifiée, dûment enregistrée et comptabilisée, et qu'elle n'a pas été affectée par une déficience technique.",
  },
  {
    date: ["23 OCT. 2024", "CASS. COM., N° 23-16.267", "PUBLIÉ"],
    titre: "Spoofing : la négligence grave n'est pas présumée",
    texte: "La banque doit prouver la négligence grave de son client, y compris lorsqu'il a été trompé par un faux conseiller utilisant le numéro de la banque.",
  },
  {
    date: ["30 AVR. 2025", "CASS. COM., N° 24-10.149", "PUBLIÉ"],
    titre: "Cette preuve est un préalable",
    texte: "La banque doit « au préalable » prouver l'authentification des opérations. La Cour casse l'arrêt qui avait retenu la négligence grave d'une société cliente ayant cliqué sur un courriel d'hameçonnage, sans procéder à cette vérification.",
  },
  {
    date: ["12 JUIN 2025", "CASS. COM., N° 24-13.777", "PUBLIÉ"],
    titre: "Position réaffirmée",
    texte: "La salariée d'une société, trompée par un faux technicien qui utilisait un numéro de la banque, n'a pas commis de négligence grave. La banque doit rembourser 98 000 €.",
  },
  {
    date: ["4 MARS 2026", "CASS. COM., N° 24-19.588", "PUBLIÉ"],
    titre: "Nuance : le message de validation compte",
    texte: "Le juge doit rechercher si le message de confirmation, qui présentait les opérations comme des validations de paiement et non des annulations, permettait au client de suspecter la fraude.",
    nuance: true,
  },
  {
    date: ["15 OCT. 2026", "CJUE, C-70/25", "TUKOWIECKA"],
    titre: "Rembourser d'abord",
    texte: "La banque ne peut refuser le remboursement immédiat d'une opération non autorisée au motif d'une négligence grave ; elle peut seulement en réclamer ensuite le montant si elle la prouve.",
  },
];

const FAQ = [
  {
    q: "Faut-il saisir le médiateur avant d'aller en justice ?",
    a: "Pour une demande n'excédant pas 5 000 €, une tentative de règlement amiable est en principe exigée avant de saisir le juge, et la médiation bancaire y satisfait. Au-delà, la médiation est un choix : aucune clause ne peut l'imposer au consommateur.",
  },
  {
    q: "La proposition du médiateur s'impose-t-elle à la banque ?",
    a: "Non. Chaque partie est libre de l'accepter ou de la refuser. Au médiateur de la FBF, les banques refusent environ un quart des propositions favorables ou partielles. En cas de refus, le juge peut toujours être saisi.",
  },
  {
    q: "Que change l'arrêt de la CJUE du 15 octobre 2026 ?",
    a: "La banque ne peut plus invoquer une négligence grave du client pour refuser le remboursement immédiat d'une opération non autorisée. Elle doit rembourser d'abord, et ne peut réclamer les sommes qu'ensuite, si elle prouve cette négligence.",
  },
];

const GARANTIES = [
  {
    titre: "Un remboursement immédiat",
    texte: "La banque doit rembourser une opération non autorisée au plus tard le jour ouvrable suivant votre signalement.",
  },
  {
    titre: "La preuve pèse sur la banque",
    texte: "C'est à elle de prouver une négligence grave de votre part. Le seul fait d'avoir été trompé ne suffit pas.",
  },
  {
    titre: "Des intérêts majorés en cas de retard",
    texte: "À défaut de remboursement dans les délais, les sommes dues portent intérêts au taux légal majoré de cinq à quinze points.",
  },
];

function IconeTelecharger() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M12 3v12M6 10l6 6 6-6M4 21h16" />
    </svg>
  );
}

function IconeCoche() {
  return (
    <svg aria-hidden="true" className={styles.coche} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ---------- 1. Hero ---------- */}
      <section className={styles.hero} aria-labelledby="titre-observatoire">
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d'Ariane">
            <Link href="/ressources">Ressources</Link> <span aria-hidden="true">›</span>{" "}
            <Link href="/outils">Outils et observatoires</Link> <span aria-hidden="true">›</span>{" "}
            <span aria-current="page">Observatoire 2026</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.heroEyebrow}>OBSERVATOIRE DE LA FRAUDE BANCAIRE · RAPPORT 2026</p>
              <h1 id="titre-observatoire" className={styles.h1}>
                La médiation bancaire face à la fraude : <span className={styles.accent}>état des lieux</span>
              </h1>
              <p className={styles.heroLead}>
                Victimes de fraude bancaire : ce que les médiateurs des banques leur accordent, en combien de temps, et ce
                qu&apos;obtiennent celles qui vont devant le juge. Analyse des rapports des médiateurs et de 453 décisions de
                justice rendues en 2026.
              </p>
              <div className={styles.heroActions}>
                <a className="btn btn-primary" href="#telecharger">
                  <IconeTelecharger />
                  Télécharger le rapport (PDF, 12 pages)
                </a>
                <a className="btn btn-ghost" href="#constats">
                  Lire la synthèse en ligne
                </a>
              </div>
              <p className={styles.heroMeta}>
                Accès libre, sans inscription · Données arrêtées au 2 novembre 2026 · Publié le 3 novembre 2026
              </p>
            </div>
            <div className={styles.heroCouverture}>
              <Image
                src={COUVERTURE}
                alt="Couverture du rapport « La médiation bancaire face à la fraude : état des lieux »"
                width={900}
                height={1273}
                sizes="(max-width: 899px) 260px, 380px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 2. Chiffres clés ---------- */}
      <section className={styles.kpis} aria-label="Chiffres clés">
        <div className={styles.wrap}>
          <ul className={styles.kpiGrid}>
            {CHIFFRES.map((c) => (
              <li key={c.source} className={styles.kpi}>
                <p className={styles.kpiChiffre}>{c.chiffre}</p>
                <p className={styles.kpiTexte}>{c.texte}</p>
                <p className={styles.kpiSource}>{c.source}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 3. L'observatoire ---------- */}
      <section className={styles.apropos} aria-labelledby="apropos">
        <div className={styles.wrap}>
          <div className={styles.deux}>
            <div>
              <p className="eyebrow">L&apos;OBSERVATOIRE</p>
              <h2 id="apropos" className={styles.h2}>Pourquoi ce rapport</h2>
              <p className={styles.texte}>
                Lorsque leur banque refuse de les rembourser, les victimes de fraude sont orientées vers le médiateur
                bancaire : en 2024, le seul médiateur de la FBF a reçu plus de 19 000 saisines, dont environ 80 % des
                dossiers recevables portaient sur la fraude. Gratuit, le médiateur bancaire est présenté comme la voie
                naturelle. Chaque médiateur publie son rapport, mais aucune publication récente connue ne rassemble les
                résultats de chaque médiateur en matière de fraude.
              </p>
              <p className={styles.texte}>
                Cet observatoire rassemble les chiffres publiés par les médiateurs et les confronte aux décisions de justice,
                pour que chaque victime puisse choisir sa voie en connaissance de cause : ni découragée, ni bercée
                d&apos;illusions.
              </p>
              <p className={styles.texte}>
                <strong className={styles.fort}>Le cabinet</strong> Lazarègue Avocats est un cabinet d&apos;avocats au
                barreau de Paris, fondé en 2016, consacré au droit du numérique. Il intervient partout en France en matière
                de fraude aux moyens de paiement et de contentieux bancaire.
              </p>
            </div>
            <div className={styles.exigences}>
              <h3 className={styles.h3}>Les exigences de l&apos;observatoire</h3>
              <ul>
                {EXIGENCES.map((e) => (
                  <li key={e.titre}>
                    <IconeCoche />
                    <p>
                      <strong>{e.titre}</strong> {e.texte}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.methode}>
            <h3 className={styles.h3}>La méthode, en trois étapes</h3>
            <ol className={styles.trois}>
              {ETAPES.map((e) => (
                <li key={e.label} className={styles.etape}>
                  <p className={styles.etapeLabel}>{e.label}</p>
                  <p>{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- 4. Synthèse : cinq constats ---------- */}
      <section id="constats" className={styles.constats} aria-labelledby="constats-titre">
        <div className={styles.wrap}>
          <p className="eyebrow">SYNTHÈSE</p>
          <h2 id="constats-titre" className={styles.h2}>Cinq constats</h2>
          <ol className={styles.constatsListe}>
            {CONSTATS.map((c, i) => (
              <li key={c.titre}>
                <span aria-hidden="true" className={styles.constatNum}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={styles.constatTitre}>{c.titre}</h3>
                  <p>{c.texte}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.conclusion}>
            <p className={styles.conclusionLabel}>CONCLUSION</p>
            <p className={styles.conclusionTexte}>
              Au regard des décisions rendues par les juridictions, la médiation bancaire se montre sévère envers les
              victimes dont la négligence grave n&apos;est pas établie : elle leur propose le plus souvent une fraction de
              ce que la loi leur garantit, au terme d&apos;un délai qui dépasse souvent le délai légal. Elle reste utile
              pour les petits montants et pour les dossiers où la négligence de la victime est plus difficile à contester.
              Le choix de la voie doit donc procéder d&apos;une analyse juridique préalable du dossier, et non d&apos;un
              réflexe.
            </p>
            <p className={styles.conclusionLien}>
              <a href="#telecharger">Lire le rapport complet (PDF)</a>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 5. Médiateur ou juge ---------- */}
      <section className={styles.comparaison} aria-labelledby="comparaison">
        <div className={styles.wrap}>
          <p className="eyebrow">MÉDIATEUR OU JUGE</p>
          <h2 id="comparaison" className={styles.h2}>Ce que chaque voie produit pour la victime</h2>
          <p className={styles.compIntro}>
            Sur 100 dossiers, que reçoit le client ? Médiateur de la FBF : 4 793 propositions (2024). Juge : 448 décisions
            au fond (2026).
          </p>
          <div
            className={styles.barres}
            role="img"
            aria-label="Remboursement intégral : médiateur 3,6 %, juge 34 %. Partiel : médiateur 54,6 %, juge 9 %. Rien : médiateur 41,8 %, juge 57 %."
          >
            {COMPARAISON.map((g) => (
              <div key={g.titre} className={styles.groupe}>
                <p className={styles.groupeTitre}>{g.titre}</p>
                <div className={styles.lignes}>
                  <span className={styles.voie}>Médiateur</span>
                  <span className={styles.piste}>
                    <span className={styles.barreMediateur} style={{ width: `${g.mediateur.largeur}%` }} />
                  </span>
                  <b className={styles.valeur}>{g.mediateur.libelle}</b>
                  <span className={styles.voie}>Juge</span>
                  <span className={styles.piste}>
                    <span className={styles.barreJuge} style={{ width: `${g.juge.largeur}%` }} />
                  </span>
                  <b className={`${styles.valeur} ${styles.valeurJuge}`}>{g.juge.libelle}</b>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.retenir}>
            À retenir : devant le juge, un client sur trois est remboursé intégralement ; chez le médiateur de la FBF, moins
            de quatre sur cent.
          </p>
          <ul className={styles.points}>
            <li>
              <b>Le médiateur dit plus souvent oui</b> : 58 % d&apos;issues favorables en tout ou partie, contre 43 % devant
              le juge.
            </li>
            <li>
              <b>Mais il accorde rarement tout</b> : 3,6 % de remboursements intégraux, contre 34 % devant le juge.
            </li>
            <li>
              <b>Ses gestes sont modestes</b> : plus de la moitié (1 497 sur 2 790) n&apos;atteignent pas 500 €.
            </li>
          </ul>
          <p className={styles.prudence}>Les deux séries ne portent pas sur les mêmes dossiers ; le rapport détaille ces limites.</p>
          <div className={styles.agir}>
            <p className={styles.agirTitre}>Agir en justice : un recours plus que jamais utile</p>
            <p>
              <b>Une victime à qui sa banque, ou le médiateur, oppose la négligence grave ne doit pas renoncer.</b> C&apos;est
              à la banque d&apos;en apporter la preuve, et la Cour de cassation contrôle strictement cette preuve ;
              l&apos;arrêt Tukowiecka de la Cour de justice de l&apos;Union européenne renforce encore l&apos;obligation de
              remboursement immédiat. En 2026, environ quatre victimes sur dix obtiennent gain de cause devant le juge, près
              d&apos;une sur deux hors de Paris, et récupèrent alors en général toute la somme, avec les intérêts majorés.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 6. Repères de jurisprudence ---------- */}
      <section className={styles.jurisprudence} aria-labelledby="jurisprudence">
        <div className={styles.wrap}>
          <p className="eyebrow">REPÈRES DE JURISPRUDENCE</p>
          <h2 id="jurisprudence" className={styles.h2}>
            Ce que disent la Cour de cassation et la Cour de justice de l&apos;Union
          </h2>
          <ol className={styles.frise}>
            {JURISPRUDENCE.map((d) => (
              <li key={d.titre} className={styles.friseItem}>
                <p className={`${styles.friseDate}${d.nuance ? ` ${styles.friseNuance}` : ""}`}>
                  {d.date.map((l, i) => (
                    <span key={l}>
                      {i > 0 ? <br /> : null}
                      {l}
                    </span>
                  ))}
                </p>
                <div>
                  <h3 className={styles.friseTitre}>{d.titre}</h3>
                  <p>{d.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- 7. Téléchargement ---------- */}
      <section id="telecharger" className={styles.telecharger} aria-labelledby="dl-titre">
        <div className={styles.wrap}>
          <div className={styles.dlCadre}>
            <Image className={styles.dlCouverture} src={COUVERTURE} alt="" width={900} height={1273} sizes="170px" />
            <div className={styles.dlCorps}>
              <p className="eyebrow">RAPPORT COMPLET · PDF · 12 PAGES</p>
              <h2 id="dl-titre" className={styles.dlTitre}>Télécharger l&apos;observatoire 2026</h2>
              <p className={styles.texte}>
                Chiffres de huit médiateurs, doctrine appliquée à la fraude, confrontation avec 453 décisions de justice,
                recommandations, méthode et sources.
              </p>
              <a
                className={`btn ${styles.btnDark}`}
                href={PDF}
                download
                data-track="telechargement_observatoire"
                data-track-fichier="rapport_pdf"
                data-track-composant="observatoire_2026"
              >
                <IconeTelecharger />
                Télécharger le PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 8. Espace presse / Visuels / Méthode ---------- */}
      <section className={styles.presse} aria-labelledby="presse">
        <div className={styles.wrap}>
          <div className={styles.trois}>
            <div className={styles.presseCol}>
              <h2 id="presse" className={styles.presseTitre}>Espace presse</h2>
              <p>Entretiens, chiffres complémentaires et visuels sur demande.</p>
              <p className={styles.presseLiens}>
                <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
                <a href="tel:+33181706200">01 81 70 62 00</a>
              </p>
            </div>
            <div className={styles.presseCol}>
              <h2 className={styles.presseTitre}>Visuels</h2>
              <p>Couverture et graphiques en haute définition, libres de reprise avec mention de la source.</p>
              <p className={styles.presseLiens}>
                <a
                  href={ZIP}
                  download
                  data-track="telechargement_observatoire"
                  data-track-fichier="dossier_visuels_zip"
                  data-track-composant="observatoire_2026"
                >
                  Télécharger le dossier visuels (ZIP)
                </a>
              </p>
            </div>
            <div className={styles.presseCol}>
              <h2 className={styles.presseTitre}>Méthode</h2>
              <p>
                Derniers rapports publiés par huit médiateurs ; 453 décisions de 2026 extraites de Doctrine, chacune qualifiée
                à partir de son texte intégral. Détail et limites au chapitre 7 du rapport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 9. FAQ ---------- */}
      <section className={styles.faq} aria-labelledby="faq">
        <div className={`${styles.wrap} ${styles.wrapEtroit}`}>
          <p className="eyebrow">QUESTIONS FRÉQUENTES</p>
          <h2 id="faq" className={styles.h2}>Médiation bancaire : l&apos;essentiel</h2>
          <div className={styles.faqListe}>
            {FAQ.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 10. Ce que la loi vous garantit ---------- */}
      <section className={styles.victime} aria-labelledby="victime">
        <div className={styles.wrap}>
          <div className={styles.deux}>
            <div>
              <p className={styles.victimeEyebrow}>VICTIME D&apos;UNE FRAUDE ?</p>
              <h2 id="victime" className={styles.victimeTitre}>Ce que la loi vous garantit</h2>
              <p className={styles.victimeChapo}>
                Avant d&apos;accepter une proposition partielle de votre banque ou du médiateur, comparez-la à ce que le
                droit vous accorde.
              </p>
              <p className={styles.victimeQuestion}>Une question sur ce rapport ou sur une situation particulière ?</p>
              <Link className="btn btn-primary" href="/contact" data-track="cta_click" data-track-composant="observatoire_2026">
                Échanger avec un avocat
              </Link>
            </div>
            <ol className={styles.garanties}>
              {GARANTIES.map((g) => (
                <li key={g.titre}>
                  <p className={styles.garantieTitre}>{g.titre}</p>
                  <p>{g.texte}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.mention}>
            Ce rapport présente une analyse générale ; il ne constitue pas une consultation juridique. Reproduction autorisée
            avec mention de la source.
          </p>
        </div>
      </section>
    </main>
  );
}
