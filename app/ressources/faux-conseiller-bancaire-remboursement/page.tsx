import Link from "next/link";
import styles from "../_components/article/article.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import { metaArticle } from "../data/meta";

// Article de test non finalisé (registre : publie = false) : noindex/nofollow,
// hors plan du site, listé « à paraître » sur /ressources.
// Titre, description, chapô, date et « L'essentiel » : registre data/articles.ts.
const SLUG = "faux-conseiller-bancaire-remboursement";

export const metadata = metaArticle(SLUG);

const AUTRES = [
  { tag: "À lire aussi", titre: "Virement frauduleux : comment obtenir le remboursement ?" },
  { tag: "Complément", titre: "Phishing bancaire : quels recours ?" },
  { tag: "Passer à l'action", titre: "Fraude bancaire : que faire dans les premières 24 heures ?" },
];

export default function Page() {
  const after = (
    <>
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
    </>
  );

  return (
    <ArticleLayout slug={SLUG} after={after}>
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
            <p className={styles.meta}>Dernière vérification juridique : 12 septembre 2026</p>
          </div>

    </ArticleLayout>
  );
}
