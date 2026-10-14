import Link from "next/link";
import styles from "../_components/article/article.module.css";
import s from "./ai-addendum.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import { metaArticle } from "../data/meta";

// Titre, description, chapô et sur-titre : registre data/articles.ts.
const SLUG = "ai-addendum-avenant-ia";
const CONTRATS = "/nos-domaines/contrats-informatiques";
const IA = "/nos-domaines/avocat-intelligence-artificielle";
const RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const TEL = { affiche: "01 81 70 62 00", href: "tel:+33181706200" };
const EMAIL = "contact@lazaregue-avocats.fr";

export const metadata = metaArticle(SLUG);

function SansClause({ children }: { children: React.ReactNode }) {
  return (
    <aside className={s.sans}>
      <p>
        <strong>Sans cette clause :</strong> {children}
      </p>
    </aside>
  );
}

const CONTROLE = [
  "Les outils d'IA autorisés sont identifiés, ou soumis à accord préalable.",
  "L'interdiction d'entraînement couvre le prestataire et tous ses fournisseurs d'IA.",
  "Les fournisseurs d'IA sont déclarés comme sous-traitants ultérieurs au sens du RGPD.",
  "La localisation des traitements et les transferts hors de l'Union sont encadrés.",
  "Le client bénéficie d'une exclusivité d'usage sur les résultats produits.",
  "Une relecture humaine est imposée avant toute remise de livrable.",
  "L'erreur de l'outil est exclue des causes d'exonération.",
  "Confidentialité et données personnelles sont exclues du plafond de responsabilité.",
  "Une garantie contre la contrefaçon couvre les contenus générés.",
  "Les rôles au titre de l'AI Act sont répartis par écrit.",
  "La fin du contrat prévoit restitution et suppression des données, y compris chez les fournisseurs d'IA.",
];

const NEGOCIATION = [
  {
    enjeu: "Entraînement des modèles",
    client: "Interdiction absolue",
    prestataire: "Usage des données techniques et statistiques",
    equilibre: "Interdiction totale sur le contenu ; tolérance limitée aux métadonnées techniques agrégées et non réidentifiables",
  },
  {
    enjeu: "Garantie contrefaçon",
    client: "Garantie intégrale, sans plafond",
    prestataire: "Garantie limitée",
    equilibre: "Garantie adossée à celle que le prestataire obtient de son fournisseur d'IA, sous réserve d'un usage conforme",
  },
  {
    enjeu: "Exactitude des résultats",
    client: "Responsabilité pleine du prestataire",
    prestataire: "Aucune garantie sur les résultats bruts",
    equilibre:
      "Prestation intellectuelle : relecture humaine obligatoire. SaaS utilisé directement par le client : vérification finale à la charge de l'utilisateur",
  },
  {
    enjeu: "Sous-traitants IA",
    client: "Accord préalable pour chaque outil",
    prestataire: "Simple liste consultable",
    equilibre: "Liste annexée, information préalable de tout changement et droit d'opposition du client",
  },
];

export default function Page() {
  const pied = (
    <div className={styles.sources}>
      <p className={styles.label}>Sources</p>
      <ul>
        <li>Code civil, art. 1170, 1218 et 1231-1 ; Code de commerce, art. L. 151-1 ; Code de la propriété intellectuelle, art. L. 111-1.</li>
        <li>Règlement (UE) 2016/679 (RGPD), art. 28, 44 et s., 83 ; règlement (UE) 2024/1689 (AI Act), art. 25, 26, 50 et 99 ; règlement (UE) 2023/2854 (Data Act).</li>
        <li>Cass. com., 22 oct. 1996, n° 93-18.632 (Chronopost) ; Cass. com., 29 juin 2010, n° 09-11.841 (Faurecia) ; Cass. com., 5 juin 2024, n° 23-10.954, et 5 févr. 2025, n° 23-10.953, publiés au Bulletin.</li>
        <li>CA Grenoble, ch. com., 26 juin 2025, n° 24/02148.</li>
        <li>Autorité de la concurrence, décision n° 24-D-03 du 15 mars 2024 ; avis n° 24-A-05 du 28 juin 2024 relatif au fonctionnement concurrentiel du secteur de l&apos;intelligence artificielle générative.</li>
        <li>« Le retour du terrain », <em>L&apos;Informaticien</em>, n° 249, septembre 2026.</li>
      </ul>
      <p className={styles.meta}>
        <em>Ce document présente des informations générales. Il ne constitue pas une consultation juridique et ne dispense pas d&apos;une analyse de chaque contrat.</em>
      </p>
    </div>
  );

  /* Appel final navy : même bloc que l'appel par défaut du gabarit. */
  const after = (
    <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
      <div className={styles.wrap}>
        <div className={styles.head}>
          <h2 className={styles.h2} id="h-cta">Sécuriser vos contrats avant l&apos;incident</h2>
          <p className={styles.lead} style={{ marginTop: 16 }}>
            Lazarègue Avocats audite les contrats fournisseurs, rédige les avenants IA des entreprises clientes et négocie, pour les prestataires, les avenants imposés par leurs grands comptes. Chaque dossier associe les avocats du cabinet à des intervenants techniques, afin d&apos;apprécier l&apos;usage réel des outils au-delà de la lettre du contrat.
          </p>
          <p className={styles.lead} style={{ marginTop: 12 }}>
            Un premier échange suffit à mesurer l&apos;exposition de l&apos;entreprise et à fixer les priorités.
          </p>
        </div>
        <Link className={styles.btn} href="/contact">Échanger avec un avocat →</Link>
        <p className={s.coord}>
          <a href={TEL.href}>{TEL.affiche}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </section>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} after={after}>
      {/* ===== 01 ===== */}
      <h2 id="angle-mort">Un angle mort dans la plupart des contrats</h2>
      <p>Éditeurs de logiciels, ESN, agences, experts-comptables, centres d&apos;appels : tous les prestataires intègrent désormais <Link href={IA}>l&apos;intelligence artificielle</Link> à leurs outils et à leurs méthodes de travail. Les fichiers clients, le code source, les données financières, les stratégies commerciales qui leur sont confiés transitent ainsi par des modèles hébergés chez des tiers, souvent hors de l&apos;Union européenne.</p>
      <p>Nombre de <Link href={CONTRATS}>contrats</Link> en cours ne disent rien de cet usage. Or ce que le contrat ne prévoit pas, le prestataire le décide seul : il choisit librement ses moyens d&apos;exécution, ses outils et ses fournisseurs. L&apos;entreprise cliente découvre généralement la situation trop tard — après une fuite, un livrable inexact ou une réclamation de tiers.</p>
      <p>Les grands comptes en ont tiré les conséquences. Comme le relève <em>L&apos;Informaticien</em> en septembre 2026, un « AI Addendum » accompagne désormais systématiquement la signature des contrats des éditeurs de logiciels : les clients l&apos;imposent pour interdire que leurs données servent à entraîner les agents du fournisseur. Ce qui relevait hier de la précaution est devenu une condition de la relation commerciale.</p>

      <div className={styles.brief}>
        <span className={styles.label}>Ce qui est en jeu</span>
        <ul>
          <li><strong>Le secret des affaires.</strong> Une information confiée sans mesure de protection raisonnable cesse d&apos;être protégée (article L. 151-1 du Code de commerce). Le savoir-faire transmis à un prestataire, puis à son outil d&apos;IA, peut ainsi perdre toute protection juridique.</li>
          <li><strong>Les sanctions RGPD.</strong> Un manquement aux règles de sous-traitance ou de transfert expose à des amendes pouvant atteindre 20 millions d&apos;euros ou 4&nbsp;% du chiffre d&apos;affaires annuel mondial (article 83 du RGPD). Le client, responsable du traitement, répond de ses sous-traitants.</li>
          <li><strong>Les sanctions de l&apos;AI Act.</strong> Le règlement (UE) 2024/1689 prévoit jusqu&apos;à 15 millions d&apos;euros ou 3&nbsp;% du chiffre d&apos;affaires pour la méconnaissance des obligations pesant sur les fournisseurs et les déployeurs (article 99).</li>
          <li><strong>La contrefaçon.</strong> Un contenu généré qui reproduit une œuvre protégée engage la responsabilité de celui qui l&apos;exploite — c&apos;est-à-dire, le plus souvent, le client.</li>
        </ul>
      </div>

      {/* ===== 02 ===== */}
      <h2 id="juge">Ce que décidera le juge</h2>
      <p>Le contentieux de l&apos;intelligence artificielle se tranche aujourd&apos;hui avec les outils du droit commun des contrats. Le raisonnement des juridictions est prévisible, et il commande la rédaction.</p>
      <p><strong>Ce qui n&apos;est pas écrit n&apos;est pas dû.</strong> Saisie d&apos;un litige portant sur une base de données vendue avec une campagne d&apos;e-mailing présentée sous une appellation « IA », la cour d&apos;appel de Grenoble a jugé la prestation au regard des seules spécifications contractuelles : la promesse commerciale d&apos;une intelligence artificielle n&apos;a fait naître aucune obligation de résultat <span className={s.cite}>(CA Grenoble, ch. com., 26 juin 2025, n° 24/02148)</span>. Le client qui n&apos;a rien stipulé n&apos;a rien à réclamer.</p>
      <p><strong>Le prestataire répond de ses outils.</strong> À l&apos;inverse, le débiteur d&apos;une obligation répond des moyens et des tiers qu&apos;il emploie pour l&apos;exécuter (article 1231-1 du Code civil). Une erreur produite par l&apos;outil qu&apos;il a choisi ne constitue pas un cas de force majeure, faute d&apos;extériorité et d&apos;imprévisibilité (article 1218). Encore faut-il que le contrat ait défini précisément ce que le prestataire devait livrer.</p>
      <p><strong>La protection se prouve.</strong> En matière de secret des affaires, la Cour de cassation exige des mesures concrètes : dans une affaire de franchise, elle a retenu comme telles la mention de confidentialité portée sur chaque page d&apos;un document et l&apos;interdiction contractuelle de le diffuser <span className={s.cite}>(Cass. com., 5 juin 2024, n° 23-10.954 ; Cass. com., 5 févr. 2025, n° 23-10.953, publiés)</span>. Transposé à l&apos;IA, le raisonnement est implacable : l&apos;entreprise qui n&apos;a pas interdit l&apos;usage de ses données dans des modèles tiers pourra difficilement soutenir qu&apos;elle les protégeait.</p>
      <p>L&apos;Autorité de la concurrence a déjà sanctionné Google, notamment pour avoir utilisé des contenus d&apos;éditeurs de presse afin d&apos;entraîner son outil d&apos;IA sans les en informer <span className={s.cite}>(Aut. conc., déc. n° 24-D-03, 15 mars 2024)</span>. L&apos;usage non autorisé de données pour l&apos;entraînement de modèles est désormais un terrain de sanction identifié.</p>

      {/* ===== 03 ===== */}
      <h2 id="clauses">Les sept clauses essentielles</h2>

      <h3>1. Périmètre d&apos;usage</h3>
      <p>L&apos;avenant définit les technologies visées — modèles de langage, outils d&apos;IA générative, agents — et distingue les données transmises à l&apos;outil (<em>inputs</em>) des contenus produits (<em>outputs</em>). Il fixe ensuite le régime : usage interdit, limité à une liste d&apos;outils approuvés, ou soumis à accord écrit préalable.</p>
      <SansClause>le prestataire utilise l&apos;outil de son choix, y compris une version grand public dont les conditions autorisent la réutilisation des données.</SansClause>

      <h3>2. Interdiction d&apos;entraînement</h3>
      <p>Le prestataire s&apos;engage à ce que ni lui ni aucun de ses fournisseurs d&apos;IA n&apos;utilise les données ou les résultats du client pour entraîner, affiner ou améliorer un modèle. L&apos;engagement doit viser expressément toute la chaîne de sous-traitance : c&apos;est le fournisseur du modèle, et non le prestataire, qui traite effectivement les données.</p>
      <SansClause>les données de l&apos;entreprise peuvent enrichir un modèle accessible à ses concurrents, et le secret des affaires devient indéfendable.</SansClause>

      <h3>3. Données personnelles</h3>
      <p>Le fournisseur d&apos;IA auquel le prestataire transmet des données personnelles est un sous-traitant ultérieur au sens du <Link href={RGPD}>RGPD</Link>. Son intervention suppose l&apos;autorisation écrite préalable du client et des obligations identiques à celles du prestataire (article 28, paragraphes 2 et 4). Un hébergement hors de l&apos;Union impose un mécanisme de transfert valable (articles 44 et suivants). L&apos;avenant liste les fournisseurs, organise l&apos;information préalable en cas de changement et impose la suppression ou la pseudonymisation des données avant leur transmission à l&apos;outil.</p>
      <SansClause>l&apos;entreprise, responsable du traitement, porte devant la CNIL un manquement qu&apos;elle n&apos;a ni connu ni autorisé.</SansClause>

      <h3>4. Propriété des résultats</h3>
      <p>Le droit d&apos;auteur ne protège que les créations portant l&apos;empreinte de la personnalité d&apos;une personne physique (article L. 111-1 du Code de la propriété intellectuelle). Un contenu produit de façon autonome par une IA échappe en principe à toute protection. Une clause de « cession de droits » sur un tel contenu ne transfère donc rien. La rédaction efficace stipule une exclusivité d&apos;usage au profit du client et interdit au prestataire de réutiliser ou de revendre le même résultat.</p>
      <SansClause>le livrable payé par l&apos;entreprise peut être légalement reproduit, réutilisé, voire vendu à un concurrent.</SansClause>

      <h3>5. Contrôle humain et traçabilité</h3>
      <p>Aucun livrable n&apos;est remis sans relecture et validation par une personne qualifiée. Les interactions avec les outils d&apos;IA sont journalisées, pour permettre de reconstituer, en cas de litige, ce qui a été produit, quand et comment.</p>
      <SansClause>l&apos;entreprise reçoit des livrables générés sans contrôle et ne dispose d&apos;aucune preuve pour établir l&apos;origine d&apos;une erreur.</SansClause>

      <h3>6. Responsabilité et garanties</h3>
      <ul className={styles.bullets}>
        <li><strong>L&apos;erreur de l&apos;outil n&apos;exonère jamais le prestataire</strong> : l&apos;avenant l&apos;écrit expressément et exclut toute qualification de force majeure.</li>
        <li><strong>Le plafond de responsabilité</strong> ne s&apos;applique pas aux manquements à la confidentialité et à la protection des données. Une clause limitative qui prive de sa substance l&apos;obligation essentielle est réputée non écrite (article 1170 du Code civil, consacrant les jurisprudences Chronopost, <span className={s.cite}>Cass. com., 22 oct. 1996, n° 93-18.632</span>, et Faurecia, <span className={s.cite}>Cass. com., 29 juin 2010, n° 09-11.841</span>) ; mieux vaut toutefois ne pas laisser au juge le soin d&apos;en décider.</li>
        <li><strong>La garantie de contrefaçon</strong> couvre les contenus générés, frais de défense compris.</li>
      </ul>
      <SansClause>un plafond fixé à quelques mois de facturation peut couvrir une fuite de données dont le coût réel se chiffre en centaines de milliers d&apos;euros.</SansClause>

      <h3>7. AI Act et sortie du contrat</h3>
      <p>Le règlement (UE) 2024/1689 répartit les obligations entre le fournisseur d&apos;un système d&apos;IA et son déployeur. L&apos;avenant attribue ces rôles, organise le respect des obligations de transparence (article 50) et, pour les systèmes à haut risque — le recrutement assisté par IA en est un exemple —, celles du déployeur (article 26). Une entreprise qui modifie substantiellement un système ou le commercialise sous son nom en devient fournisseur (article 25). La fin du contrat est enfin organisée : restitution et suppression des données, y compris chez les fournisseurs d&apos;IA, et conditions de changement de prestataire, que le Data Act encadre pour les services cloud (règlement (UE) 2023/2854).</p>
      <SansClause>l&apos;entreprise découvre à l&apos;occasion d&apos;un contrôle qu&apos;elle supporte des obligations réglementaires qu&apos;elle croyait à la charge de son fournisseur.</SansClause>

      <aside className={styles.ctaIn}>
        <p className={styles.ctaInTitre}>Vos contrats fournisseurs couvrent-ils l&apos;usage de l&apos;IA ?</p>
        <p className={styles.ctaInTx}>Un audit des contrats existants permet d&apos;identifier rapidement les relations exposées et les avenants à négocier en priorité.</p>
        <div className={s.ctaActions}>
          <Link className={styles.btn} href="/contact">Échanger avec un avocat</Link>
          <a className={s.tel} href={TEL.href}>{TEL.affiche}</a>
        </div>
      </aside>

      {/* ===== 04 ===== */}
      <h2 id="negociation">La négociation</h2>
      <p>Le client cherche la sécurité ; le prestataire, lui-même lié par les conditions de ses fournisseurs d&apos;IA, cherche à limiter des engagements qu&apos;il ne maîtrise pas entièrement. L&apos;équilibre se construit sur quelques points décisifs.</p>
      <table className={styles.voies}>
        <thead>
          <tr>
            <th scope="col">Enjeu</th>
            <th scope="col">Exigence du client</th>
            <th scope="col">Position du prestataire</th>
            <th scope="col">Point d&apos;équilibre</th>
          </tr>
        </thead>
        <tbody>
          {NEGOCIATION.map((l) => (
            <tr key={l.enjeu}>
              <th scope="row" data-l="Enjeu">{l.enjeu}</th>
              <td data-l="Exigence du client">{l.client}</td>
              <td data-l="Position du prestataire">{l.prestataire}</td>
              <td data-l="Point d'équilibre">{l.equilibre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Pour le prestataire, l&apos;enjeu est symétrique : un avenant imposé par un grand compte et signé sans négociation peut l&apos;engager au-delà de ce que ses propres fournisseurs lui garantissent. Il supporte alors seul un risque qu&apos;il ne peut ni contrôler ni répercuter.</p>

      {/* ===== 05 ===== */}
      <h2 id="erreurs">Trois erreurs qui coûtent cher</h2>
      <ul className={styles.bullets}>
        <li><strong>Une interdiction d&apos;entraînement limitée au prestataire.</strong> Elle laisse libres ceux qui traitent effectivement les données.</li>
        <li><strong>Une « cession » de droits sur des contenus non protégés.</strong> Elle ne transfère rien et laisse le livrable sans exclusivité.</li>
        <li><strong>Un plafond de responsabilité unique pour tout le contrat.</strong> Appliqué à une fuite de données, il réduit l&apos;indemnisation à une fraction du préjudice.</li>
      </ul>

      {/* ===== 06 ===== */}
      <h2 id="controle">Liste de contrôle</h2>
      <ul className={s.check}>
        {CONTROLE.map((c) => (
          <li key={c}>
            <span className={s.case} aria-hidden="true" />
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <p>Une seule case non cochée suffit à exposer l&apos;entreprise.</p>
    </ArticleLayout>
  );
}
