import styles from "../_components/article/article.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import { metaArticle } from "../data/meta";

// Titre, description et chapô : registre data/articles.ts. Ni date ni temps de
// lecture ne sont affichés pour cet article (consigne du cabinet).
const SLUG = "agents-ia-ecommerce-cgv";

export const metadata = metaArticle(SLUG);

export default function Page() {
  const pied = (
    <div className={styles.sources}>
      <p className={styles.label}>Fondements juridiques</p>
      <ul>
        <li>Code civil, art. 1119 (conditions générales), 1127-2 et 1127-3 (contrat électronique), 1156 (croyance légitime), 1353 et 1356 (preuve).</li>
        <li>Code de la consommation, art. L. 111-1 et L. 221-5 (information), L. 221-13 (confirmation), L. 221-14 (bouton de commande), L. 121-17 (options payantes), L. 312-18-1 (crédit, à compter du 20 novembre 2026).</li>
        <li>Code monétaire et financier, art. L. 133-6 et suivants (opérations de paiement).</li>
        <li>Cass. 1re civ., 7 mai 2025, n° 23-22.972 ; CJUE, 7 avr. 2022, C-249/21.</li>
        <li>Autorité de la concurrence, avis n° 26-A-05 du 17 juillet 2026.</li>
      </ul>
    </div>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} titreSuggestions="Pour aller plus loin">
          <h2 id="s1">Comment un agent achète-t-il sur votre site ?</h2>
          <p>Un agent d&apos;IA reçoit une consigne de son utilisateur (« un ordinateur portable pour le travail, environ 2 000 €, livré avant vendredi ») et accomplit seul les étapes de l&apos;achat. Il peut accéder à un site marchand de deux manières, et la différence a des conséquences juridiques.</p>
          <p><strong>Il navigue comme un humain.</strong> L&apos;agent ouvre les pages, lit les fiches produits, remplit les formulaires et clique sur les boutons. Il ne communique rien de ses consignes au site. Le marchand voit une commande ordinaire et ne sait pas toujours qu&apos;un agent l&apos;a passée.</p>
          <p><strong>Il dialogue avec le site par un protocole.</strong> L&apos;agent ne lit plus l&apos;écran : il échange des données structurées avec le système du marchand. Plusieurs protocoles existent déjà :</p>
          <ul className={styles.bullets}>
            <li>l&apos;ACP, lancé par OpenAI et Stripe en 2025 ;</li>
            <li>l&apos;UCP, présenté par Google en janvier 2026 avec Shopify, Walmart, Carrefour, Visa et Stripe ;</li>
            <li>l&apos;AP2, consacré au paiement.</li>
          </ul>
          <p>Certains de ces protocoles permettent à l&apos;agent de transmettre les limites fixées par son utilisateur. L&apos;AP2 prévoit ainsi un « mandat d&apos;intention » signé par l&apos;utilisateur, qui précise notamment le prix maximum et le délai.</p>
          <p>Retenez cette distinction : elle détermine ce que le marchand savait, ou devait savoir, au moment de la commande.</p>

          <h2 id="s2">Une commande passée par un agent est-elle valable ?</h2>
          <p><strong>Oui, en principe.</strong> Le droit français admet depuis longtemps qu&apos;un contrat se forme par l&apos;échange de systèmes informatiques programmés. L&apos;agent n&apos;a pas de personnalité juridique : ce n&apos;est ni un mandataire ni une partie au contrat, mais un outil. Ce qu&apos;il accomplit engage la personne qui l&apos;utilise.</p>
          <p>Le contrat est conclu entre le marchand et le client, pas avec l&apos;éditeur de l&apos;agent. Même lorsque l&apos;achat se déroule entièrement dans l&apos;interface de l&apos;agent, le marchand reste le vendeur et demeure tenu de toutes ses obligations.</p>
          <p><strong>La limite : ce que vous saviez.</strong> Le vendeur ne peut pas se prévaloir d&apos;une commande dont il savait, ou devait savoir, qu&apos;elle dépassait la volonté du client.</p>
          <ul className={styles.bullets}>
            <li>Si l&apos;agent a navigué sans rien transmettre, vous ne pouviez pas connaître son budget : la vente tient.</li>
            <li>Si l&apos;agent vous a transmis un plafond de 2 000 € et que vous acceptez une commande de 2 650 €, vous ne pourrez pas invoquer votre bonne foi.</li>
          </ul>
          <p>Une consigne vague ne protège pas le client. Celui qui demande un ordinateur « autour de 2 000 € » laisse à son agent une marge dont il répond.</p>

          <h2 id="s3">Pouvez-vous filtrer ou refuser les agents ?</h2>
          <p><strong>Oui, pour des raisons légitimes.</strong> Un marchand reste libre de choisir ses canaux de vente et de filtrer les robots pour se protéger : fraude, extraction massive de données, surcharge des serveurs. Ces filtres doivent être justifiés et cohérents.</p>
          <p>Deux points de vigilance :</p>
          <ul className={styles.bullets}>
            <li><strong>En position dominante</strong>, un blocage sélectif visant les agents concurrents d&apos;un partenaire peut être contesté au titre du droit de la concurrence.</li>
            <li><strong>À l&apos;échelle européenne</strong>, une étude remise à la Commission en mai 2026 propose d&apos;interdire la discrimination des consommateurs selon qu&apos;ils recourent ou non à un agent. Ce n&apos;est pas encore une règle, mais c&apos;est une direction.</li>
          </ul>
          <p>L&apos;approche la plus sûre consiste à ne pas bloquer par principe, mais à fixer des conditions d&apos;accès claires dans vos CGV.</p>

          <h2 id="s4">Comment savoir ce que l&apos;agent est autorisé à faire ?</h2>
          <p>La nouvelle question n&apos;est plus seulement de savoir qui se connecte, mais ce qu&apos;il a le droit de faire. Les paramètres utiles sont toujours les mêmes :</p>
          <ul className={styles.bullets}>
            <li>les catégories de produits autorisées ;</li>
            <li>le plafond par commande et le plafond cumulé ;</li>
            <li>la durée de validité de l&apos;autorisation ;</li>
            <li>les options payantes et modes de livraison admis ;</li>
            <li>le droit, ou non, d&apos;annuler, de retourner ou de réclamer.</li>
          </ul>
          <p><strong>En pratique :</strong></p>
          <ul className={styles.bullets}>
            <li>Si vous adoptez un protocole d&apos;achat, lisez les paramètres qu&apos;il transmet et bloquez automatiquement les commandes qui les dépassent.</li>
            <li>Si l&apos;agent navigue sur votre site, vous ne connaissez pas ses limites. Exigez alors que l&apos;agent se déclare comme tel, et réservez certains actes à la confirmation du client (voir la section 7).</li>
          </ul>

          <h2 id="s5">Vos CGV s&apos;appliquent-elles ?</h2>
          <p><strong>Seulement si le client a pu les lire avant de s&apos;engager.</strong> Des conditions générales ne s&apos;imposent qu&apos;à celui qui a pu en prendre connaissance et les a acceptées. Un simple renvoi ne suffit pas si le client ne pouvait pas les consulter normalement avant la conclusion du contrat.</p>
          <p>Avec un agent, le moment décisif change. Ce n&apos;est plus le clic final, auquel le client n&apos;assiste pas : c&apos;est la mise en service de l&apos;agent, ou l&apos;adhésion à votre service de commande automatisée. Des CGV « acceptées » par un agent, alors que son utilisateur n&apos;a jamais pu les lire, ne lui sont pas opposables. La vente subsiste, mais sans les clauses qui vous protègent : frais de retour, limitations de responsabilité, conditions de garantie.</p>
          <p><strong>Avec vos clients professionnels</strong>, la solution est le contrat-cadre. Signé une fois, il intègre vos CGV et fixe les règles applicables à toutes les commandes automatisées qui suivront. Entre professionnels, la loi permet même d&apos;écarter la procédure de validation en deux clics.</p>
          <p><strong>Avec les consommateurs</strong>, les règles sont impératives :</p>
          <ul className={styles.bullets}>
            <li>Le bouton de validation doit indiquer « commande avec obligation de paiement » ou une formule équivalente, faute de quoi le client n&apos;est pas lié.</li>
            <li>Aucune décision n&apos;admet encore qu&apos;un agent puisse reconnaître cette obligation à la place du consommateur.</li>
            <li>Tant que la question n&apos;est pas tranchée, seule la validation finale par le client sécurise la vente.</li>
          </ul>
          <p><strong>Pensez aussi aux machines.</strong> Publiez vos conditions dans un format lisible par les agents. Le fichier de déclaration du protocole UCP s&apos;y prête. Des sites demandent déjà aux agents qui les visitent de lire et de respecter leurs conditions générales.</p>

          <h2 id="s6">Quelles informations doivent parvenir au client lui-même ?</h2>
          <p><strong>Informer l&apos;agent ne suffit pas.</strong> Le droit de la consommation exige que le consommateur lui-même reçoive les informations essentielles :</p>
          <ul className={styles.bullets}>
            <li>les caractéristiques du produit ;</li>
            <li>le prix total, frais compris ;</li>
            <li>le délai de livraison ;</li>
            <li>l&apos;identité du vendeur ;</li>
            <li>les conditions du droit de rétractation.</li>
          </ul>
          <p>Ces informations doivent lui parvenir sur un support qu&apos;il peut conserver, par exemple un courriel ou un document téléchargeable. Une page affichée sur le site d&apos;un intermédiaire ne suffit pas.</p>
          <p><strong>Les sanctions sont lourdes :</strong></p>
          <ul className={styles.bullets}>
            <li>sans information sur la rétractation, le délai de 14 jours est prolongé de douze mois ;</li>
            <li>une information essentielle manquante peut entraîner l&apos;annulation de la vente.</li>
          </ul>
          <p><strong>La règle des deux couches.</strong> Organisez deux flux distincts :</p>
          <ul className={styles.bullets}>
            <li><strong>pour l&apos;agent</strong>, des données structurées et complètes ;</li>
            <li><strong>pour le client</strong>, une confirmation systématique de chaque commande, envoyée directement à lui.</li>
          </ul>
          <p>Veillez aussi à la cohérence entre votre site et vos données. Un prix de 799 € sur la page et de 699 € dans le catalogue lu par les agents, c&apos;est un litige assuré.</p>

          <h2 id="s7">Quand exiger l&apos;accord direct du client ?</h2>
          <p>Pour certains actes, la loi exige un consentement exprès, explicite ou résultant d&apos;un acte positif clair. Le silence, l&apos;option cochée par défaut et le paramétrage général sont exclus. L&apos;agent peut préparer ces actes, mais le client doit les accomplir.</p>
          <div className={styles.tableau} tabIndex={0} role="region" aria-label="Tableau : acte">
            <table>
              <thead><tr><th scope="col">Acte</th><th scope="col">Règle</th><th scope="col">Conduite à tenir</th></tr></thead>
              <tbody>
                <tr><th scope="row">Option payante (garantie, assurance, service)</th><td>Consentement exprès ; à défaut, remboursement et amende jusqu&apos;à 15 000 €</td><td>Confirmation par le client, option par option</td></tr>
                <tr><th scope="row">Crédit ou paiement fractionné</th><td>Demande préalable et accord explicite à compter du 20 nov. 2026</td><td>Aucun financement proposé à l&apos;agent seul</td></tr>
                <tr><th scope="row">Validation de la commande (consommateur)</th><td>Reconnaissance de l&apos;obligation de payer</td><td>Confirmation par le client</td></tr>
                <tr><th scope="row">Consentement à l&apos;usage des données</th><td>Acte positif de la personne</td><td>Recueil direct</td></tr>
                <tr><th scope="row">Renonciation au droit de rétractation</th><td>Accord et renoncement exprès</td><td>Recueil direct</td></tr>
                <tr><th scope="row">Commande hors des limites transmises</th><td>Votre bonne foi n&apos;est plus protégée</td><td>Suspendre et demander confirmation</td></tr>
                <tr><th scope="row">Réassort courant sous contrat-cadre (professionnels)</th><td>Liberté contractuelle</td><td>Automatique et tracé</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="s8">Que faut-il conserver comme preuve ?</h2>
          <p>En cas de litige, c&apos;est à vous de prouver que la commande a été valablement passée et que le client a été informé. Avec un agent, il faut prouver davantage : ce qu&apos;il était autorisé à faire.</p>
          <p><strong>Le dossier de transaction.</strong> Conservez pour chaque commande passée par un agent, horodatés :</p>
          <ol className={styles.steps}>
            <li>l&apos;identité de l&apos;agent et le protocole utilisé ;</li>
            <li>les limites et autorisations reçues ;</li>
            <li>les prix et informations transmis ;</li>
            <li>la version des CGV applicable ;</li>
            <li>les options choisies et les confirmations du client ;</li>
            <li>les données d&apos;autorisation du paiement ;</li>
            <li>les actes d&apos;après-vente.</li>
          </ol>
          <p>Ces données sont aussi des données personnelles. Leur durée de conservation doit être justifiée par leur utilité en cas de litige.</p>
          <p><strong>Avec vos clients professionnels</strong>, une clause de preuve peut donner force probante à vos journaux. <strong>Avec les consommateurs</strong>, une telle clause ne doit jamais les priver de la possibilité de prouver le contraire.</p>

          <h2 id="s9">Que se passe-t-il en cas d&apos;erreur ou de fraude ?</h2>
          <div className={styles.tableau} tabIndex={0} role="region" aria-label="Tableau : situation">
            <table>
              <thead><tr><th scope="col">Situation</th><th scope="col">Qui supporte le risque</th></tr></thead>
              <tbody>
                <tr><th scope="row">Le client a donné une consigne floue</th><td>Le client</td></tr>
                <tr><th scope="row">L&apos;agent a dépassé une limite que vous ne connaissiez pas</th><td>Le client, qui se retourne contre l&apos;éditeur de l&apos;agent</td></tr>
                <tr><th scope="row">L&apos;agent a dépassé une limite qui vous avait été transmise</th><td>Vous : vous ne pouvez pas vous en prévaloir</td></tr>
                <tr><th scope="row">Votre site a affiché une donnée fausse (prix, stock, délai)</th><td>Vous</td></tr>
                <tr><th scope="row">L&apos;agent a profité d&apos;un prix manifestement erroné</th><td>Personne n&apos;est lié : l&apos;erreur grossière empêche l&apos;accord</td></tr>
                <tr><th scope="row">L&apos;agent a été piraté et a payé à l&apos;insu du client</th><td>La banque rembourse son client et peut, selon les règles du réseau de carte, se retourner contre le commerçant</td></tr>
              </tbody>
            </table>
          </div>
          <p>Deux précautions s&apos;imposent.</p>
          <ul className={styles.bullets}>
            <li><strong>Annulation des erreurs manifestes.</strong> Prévoyez dans vos CGV la possibilité d&apos;annuler les commandes passées sur une erreur de prix évidente. Un agent programmé pour repérer et exploiter ces erreurs peut commander en masse en quelques secondes.</li>
            <li><strong>Preuves d&apos;autorisation du paiement.</strong> Conservez-les avec chaque commande.</li>
          </ul>

          <h2 id="s10">Quelles clauses ajouter à vos CGV ?</h2>
          <p>Les clauses ci-dessous sont des exemples à adapter à votre activité, à votre clientèle (professionnelle ou grand public) et aux protocoles que vous utilisez. Envers les consommateurs, elles ne peuvent écarter aucune règle impérative.</p>
          <p><strong>Commandes passées par un système automatisé.</strong></p>
          <blockquote className={styles.clause}><p>Toute commande passée au moyen d&apos;un agent logiciel ou d&apos;un système automatisé est réputée passée par la personne qui l&apos;utilise. Le Vendeur peut exiger que l&apos;agent déclare son caractère automatisé et identifie son utilisateur.</p></blockquote>
          <p><strong>Limites transmises.</strong></p>
          <blockquote className={styles.clause}><p>Lorsque l&apos;agent transmet au Vendeur des limites fixées par son utilisateur, notamment un montant maximal, le Vendeur s&apos;engage à ne pas accepter de commande qui les excède sans confirmation préalable de l&apos;utilisateur.</p></blockquote>
          <p><strong>Confirmation du client.</strong></p>
          <blockquote className={styles.clause}><p>L&apos;ajout de toute option payante, le recours à un paiement fractionné ou à un crédit, et toute commande excédant les limites transmises sont subordonnés à la confirmation expresse du client, recueillie directement auprès de lui.</p></blockquote>
          <p><strong>Information du client.</strong></p>
          <blockquote className={styles.clause}><p>Le Vendeur adresse au client, à l&apos;adresse électronique associée à la commande, la confirmation de celle-ci et l&apos;ensemble des informations prévues par la loi, quel que soit le mode de passation de la commande.</p></blockquote>
          <p><strong>Erreur manifeste.</strong></p>
          <blockquote className={styles.clause}><p>En cas d&apos;erreur manifeste affectant le prix ou la désignation d&apos;un produit, le Vendeur peut annuler la commande et rembourser intégralement les sommes versées, sans autre indemnité.</p></blockquote>
          <p><strong>Preuve</strong> (contrats entre professionnels).</p>
          <blockquote className={styles.clause}><p>Les journaux horodatés du Vendeur retraçant les échanges avec l&apos;agent du client, les limites transmises et les validations font foi entre les parties, sauf preuve contraire.</p></blockquote>
          <p><strong>Après-vente.</strong></p>
          <blockquote className={styles.clause}><p>L&apos;agent peut suivre une commande, signaler un incident et exercer le droit de rétractation pour le compte du client. La modification de l&apos;adresse de livraison, du moyen de remboursement, ou l&apos;acceptation d&apos;un dédommagement, requièrent la confirmation directe du client.</p></blockquote>

          <h2 id="s11">La liste des actions à mener</h2>
          <ul className={styles.bullets}>
            <li><strong>Cartographier</strong> les parcours de votre site que les agents peuvent emprunter.</li>
            <li><strong>Décider</strong> de votre politique d&apos;accès : agents admis, protocoles acceptés, conditions.</li>
            <li><strong>Adapter</strong> vos CGV, et proposer un contrat-cadre à vos clients professionnels.</li>
            <li><strong>Paramétrer</strong> la confirmation du client pour les options, le financement et les commandes hors limites.</li>
            <li><strong>Envoyer</strong> au client une confirmation complète de chaque commande.</li>
            <li><strong>Aligner</strong> les données lues par les agents sur celles de votre site.</li>
            <li><strong>Organiser</strong> la conservation des preuves.</li>
          </ul>
    </ArticleLayout>
  );
}
