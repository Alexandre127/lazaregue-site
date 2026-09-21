import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./article.module.css";
import ShareBar from "./_components/ShareBar";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/ressources/faux-conseiller-bancaire-remboursement";

const TITLE = "Arnaque au faux conseiller bancaire : la banque doit-elle rembourser ? | Lazarègue Avocats";
const DESCRIPTION =
  "Faux conseiller bancaire : consentement au paiement, authentification forte, négligence grave et charge de la preuve. Les critères de remboursement et les démarches à engager.";
const MAJ = "12 septembre 2026";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser ?",
      description: DESCRIPTION,
      dateModified: "2026-09-12",
      inLanguage: "fr-FR",
      mainEntityOfPage: `${URL_BASE}${PATH}`,
      author: { "@type": "Person", name: "Alexandre Lazarègue", jobTitle: "Avocat au Barreau de Paris", url: `${URL_BASE}/le-cabinet` },
      publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
        { "@type": "ListItem", position: 3, name: "Fraudes et paiements", item: `${URL_BASE}/ressources/?domaine=fraude` },
        { "@type": "ListItem", position: 4, name: "Faux conseiller bancaire", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

const TOC = [
  { id: "droit", label: "Ce que prévoit le droit des services de paiement" },
  { id: "consentement", label: "Le consentement au paiement en question" },
  { id: "negligence", label: "La négligence grave invoquée par la banque" },
  { id: "demarches", label: "Les démarches à engager sans attendre" },
  { id: "voies", label: "Réclamation, médiation, juridiction : quelle voie ?" },
];

const AUTRES = [
  { tag: "À lire aussi", titre: "Virement frauduleux : comment obtenir le remboursement ?" },
  { tag: "Complément", titre: "Phishing bancaire : quels recours ?" },
  { tag: "Passer à l'action", titre: "Fraude bancaire : que faire dans les premières 24 heures ?" },
];

export default function Page() {
  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ================================ HERO ============================ */}
      <section className={styles.aHero} aria-labelledby="h1">
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden>/</span>{" "}
            <Link href="/ressources">Ressources</Link> <span aria-hidden>/</span>{" "}
            <Link href="/ressources/?domaine=fraude">Fraudes et paiements</Link> <span aria-hidden>/</span>{" "}
            <span aria-current="page">Faux conseiller bancaire</span>
          </nav>
          <p className={styles.kicker}>Fraudes et paiements · Guide</p>
          <h1 id="h1">Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser&nbsp;?</h1>
          <p className={styles.chapo}>
            Lorsqu&apos;un fraudeur obtient la validation d&apos;un virement en se faisant passer pour un
            conseiller bancaire, le remboursement dépend notamment du consentement au paiement, de
            l&apos;authentification et de l&apos;éventuelle négligence grave du client.
          </p>
          <div className={styles.byline}>
            <span className={styles.ava}>
              <Image src="/images/alexandre-pro.jpg" alt="Portrait d'Alexandre Lazarègue" fill sizes="48px" style={{ objectFit: "cover" }} />
            </span>
            <div>
              <p className={styles.bylineName}>Me Alexandre Lazarègue</p>
              <p className={styles.meta}>Avocat au Barreau de Paris</p>
            </div>
            <p className={`${styles.meta} ${styles.bylineDate}`}>Mis à jour le {MAJ}</p>
          </div>
        </div>
      </section>

      <div className={styles.aGrid}>
        <article className={styles.body}>
          <details className={styles.tocM}>
            <summary>Sommaire</summary>
            <nav aria-label="Sommaire">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`}>{t.label}</a>
              ))}
            </nav>
          </details>

          <div className={styles.brief}>
            <p className={styles.label}>En bref</p>
            <ul>
              <li>La validation technique d&apos;une opération ne suffit pas, à elle seule, à établir un consentement valable.</li>
              <li>La banque qui refuse le remboursement doit prouver la négligence grave qu&apos;elle invoque.</li>
              <li>La contestation doit être adressée sans tarder, par écrit et de manière précise.</li>
              <li>Les échanges, numéros d&apos;appel et notifications reçus doivent être conservés.</li>
            </ul>
          </div>

          <h2 id="droit">Ce que prévoit le droit des services de paiement</h2>
          <p>Le Code monétaire et financier distingue les opérations autorisées, auxquelles le payeur a consenti, des opérations non autorisées. Pour ces dernières, le principe est celui d&apos;un remboursement rapide par le prestataire de services de paiement, dès que l&apos;opération lui est signalée.</p>
          <div className={styles.box}>
            <span className={styles.label}>Texte applicable</span>
            <p className={styles.boxTitle}>Article L. 133-18 du Code monétaire et financier</p>
            <p className={styles.tx}>En cas d&apos;opération non autorisée signalée, le prestataire rembourse le payeur immédiatement, et au plus tard à la fin du premier jour ouvrable suivant, sauf s&apos;il a de bonnes raisons de soupçonner une fraude et communique ces raisons par écrit à la Banque de France.</p>
            <p className={styles.boxLink}><a href="https://www.legifrance.gouv.fr/" target="_blank" rel="noopener noreferrer">Consulter le texte sur Légifrance ↗</a></p>
          </div>

          <h2 id="consentement">Le consentement au paiement en question</h2>
          <p>Dans le scénario du faux conseiller, le client valide lui-même l&apos;opération, souvent depuis son application, en croyant sécuriser son compte ou annuler un paiement suspect. Toute la discussion porte alors sur la portée de cette validation.</p>
          <h3>Validation technique et consentement</h3>
          <p>L&apos;authentification forte atteste qu&apos;un dispositif a été utilisé ; elle ne dit rien, par elle-même, de l&apos;intention de celui qui l&apos;a actionné. Le texte précise d&apos;ailleurs que l&apos;utilisation de l&apos;instrument de paiement, telle qu&apos;enregistrée, ne suffit pas nécessairement à prouver que l&apos;opération a été autorisée.</p>
          <div className={styles.vig}>
            <span className={styles.label}>Point de vigilance</span>
            <p>Le contenu exact de la notification de validation compte : montant, bénéficiaire, nature de l&apos;opération. Une capture de l&apos;écran affiché au moment de la validation est une pièce précieuse.</p>
          </div>

          <h2 id="negligence">La négligence grave invoquée par la banque</h2>
          <p>Le payeur supporte les pertes lorsqu&apos;il a agi frauduleusement ou manqué, intentionnellement ou par négligence grave, à ses obligations de sécurité (article L. 133-19, IV). C&apos;est l&apos;argument le plus fréquemment opposé aux victimes.</p>
          <h3>Une charge de la preuve pesant sur la banque</h3>
          <p>L&apos;article L. 133-23 impose au prestataire de fournir des éléments établissant la fraude ou la négligence grave de son client. L&apos;appréciation se fait au regard des circonstances : crédibilité de la mise en scène, usurpation du numéro de l&apos;agence, informations détenues par le fraudeur.</p>

          <h2 id="demarches">Les démarches à engager sans attendre</h2>
          <p>La rapidité de la réaction conditionne à la fois les chances de blocage des fonds et la solidité de la contestation.</p>
          <ol className={styles.steps}>
            <li>Faire opposition et signaler l&apos;opération à la banque par écrit.</li>
            <li>Déposer plainte en décrivant précisément le déroulé de l&apos;appel.</li>
            <li>Adresser une contestation écrite et motivée visant l&apos;article L. 133-18.</li>
            <li>Conserver l&apos;ensemble des éléments de preuve.</li>
          </ol>
          <div className={styles.prat}>
            <span className={styles.label}>En pratique</span>
            <p>Conservez les SMS, journaux d&apos;appels, courriels, notifications bancaires et captures de l&apos;espace client, sans les retoucher.</p>
          </div>
          <div className={styles.vig}>
            <span className={styles.label}>Point de vigilance</span>
            <p>Le délai de treize mois prévu par l&apos;article L. 133-24 pour signaler une opération n&apos;autorise pas nécessairement à attendre avant d&apos;agir : le texte exige un signalement sans tarder.</p>
          </div>

          <div className={styles.midcta}>
            <div>
              <p className={styles.midctaTitle}>Votre banque refuse le remboursement&nbsp;?</p>
              <p className={styles.tx}>Le cabinet peut examiner l&apos;autorisation du paiement, les modalités d&apos;authentification, les alertes déclenchées et les arguments opposés par la banque.</p>
              <p className={styles.midctaLink}><Link href="/nos-domaines/escroquerie-fraude-bancaire">Voir les recours du cabinet contre les banques →</Link></p>
            </div>
            <Link className={styles.btnO} href="/contact">Faire examiner la situation</Link>
          </div>

          <h2 id="voies">Réclamation, médiation, juridiction : quelle voie&nbsp;?</h2>
          <p>En cas de refus, plusieurs voies se succèdent. Leur choix dépend du montant en jeu, de la position de la banque et de l&apos;urgence.</p>
          <table className={styles.voies}>
            <thead>
              <tr><th scope="col">Voie</th><th scope="col">Interlocuteur</th><th scope="col">Intérêt</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row" data-l="Voie">Réclamation écrite</th><td data-l="Interlocuteur">Service réclamations de la banque</td><td data-l="Intérêt">Préalable indispensable, fixe la position de la banque</td></tr>
              <tr><th scope="row" data-l="Voie">Médiation</th><td data-l="Interlocuteur">Médiateur bancaire de l&apos;établissement</td><td data-l="Intérêt">Gratuite, après réclamation préalable restée infructueuse</td></tr>
              <tr><th scope="row" data-l="Voie">Action judiciaire</th><td data-l="Interlocuteur">Juridiction compétente</td><td data-l="Intérêt">Décision exécutoire, débat complet sur la preuve</td></tr>
            </tbody>
          </table>
          <p>La réclamation doit être rédigée en visant les textes applicables : c&apos;est elle qui structurera la suite du débat.</p>

          <div className={styles.sources}>
            <p className={styles.label}>Sources et mise à jour</p>
            <ul>
              <li>Code monétaire et financier, art. L. 133-18, L. 133-19, L. 133-23 et L. 133-24 — <a href="https://www.legifrance.gouv.fr/" target="_blank" rel="noopener noreferrer">Légifrance</a></li>
            </ul>
            <p className={styles.meta}>Dernière vérification juridique : {MAJ}</p>
          </div>

          <div className={styles.author}>
            <span className={styles.authorAva}>
              <Image src="/images/alexandre-pro.jpg" alt="Portrait d'Alexandre Lazarègue" fill sizes="96px" style={{ objectFit: "cover" }} />
            </span>
            <div>
              <p className={styles.label}>Auteur</p>
              <p className={styles.authorName}>Me Alexandre Lazarègue</p>
              <p className={styles.meta}>Avocat au Barreau de Paris · Fondateur de Lazarègue Avocats</p>
              <p className={styles.tx}>Intervient en droit du numérique, notamment dans les recours contre les établissements bancaires après une fraude, en cybercriminalité et en protection des données.</p>
              <p className={styles.authorLinks}>
                <Link href="/nos-domaines/escroquerie-fraude-bancaire">Fraude bancaire et escroquerie</Link> ·{" "}
                <Link href="/le-cabinet">Le cabinet</Link>
              </p>
            </div>
          </div>

          <ShareBar />
        </article>

        <aside className={styles.toc} aria-label="Sommaire">
          <p className={styles.label}>Sommaire</p>
          {TOC.map((t) => (
            <a key={t.id} href={`#${t.id}`}>{t.label}</a>
          ))}
        </aside>
      </div>

      {/* ============================ POUR ALLER PLUS LOIN ================ */}
      <section className={`${styles.sec} ${styles.ghost}`} aria-labelledby="h-more">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <h2 className={styles.h2} id="h-more">Pour aller plus loin</h2>
          </div>
          <div className={styles.more}>
            {AUTRES.map((a) => (
              <article key={a.titre}>
                <p className={styles.tag}>{a.tag}</p>
                <h3>{a.titre}</h3>
                <p className={styles.soon}>À paraître</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ CTA ============================= */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <h2 className={styles.h2} id="h-cta">Une question demeure sur votre situation&nbsp;?</h2>
            <p className={styles.lead}>Un article expose les règles générales. Leur application dépend des faits, des documents disponibles et des délais.</p>
          </div>
          <Link className={styles.btn} href="/contact">Échanger avec un avocat →</Link>
        </div>
      </section>
    </main>
  );
}
