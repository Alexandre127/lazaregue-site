import type { ReactNode } from "react";
import Link from "next/link";
import ArticleLayout from "../_components/article/ArticleLayout";
import { metaArticle } from "../data/meta";
import s from "./arnaque-crypto.module.css";

/* Titre, description, chapô, domaine, etc. : registre data/articles.ts.
   Texte repris de la maquette validée (Claude Design, 4 nov. 2026) ; le fichier
   source arnaque-crypto-recuperer-cryptos-volees.md n'étant pas au dépôt, le
   corps reproduit mot pour mot la copie de cette maquette. */
const SLUG = "arnaque-crypto-recuperer-cryptos-volees";
const CRYPTO = "/nos-domaines/crypto-actifs-blockchain";
const FRAUDE = "/nos-domaines/escroquerie-fraude-bancaire";
const TEL = "tel:+33181706200";

export const metadata = metaArticle(SLUG);

/* Puce « case cochée » du rapport de traçage (icône SVG à trait bleu). */
function Check({ children }: { children: ReactNode }) {
  return (
    <li>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <rect x="1" y="1" width="18" height="18" fill="none" stroke="var(--blue)" strokeWidth="2" />
        <path d="M5 10l3 3 7-7" fill="none" stroke="var(--blue)" strokeWidth="2" />
      </svg>
      {children}
    </li>
  );
}

export default function Page() {
  /* Mention des décisions citées (rendue après les suggestions). */
  const pied = (
    /* TODO cabinet : vérifier ces deux références avant indexation
       — TJ Paris, réf., 12 mars 2026, n° 25/58060
       — TJ Les Sables-d'Olonne, réf., 28 avril 2026, n° 26/00001 */
    <div className={s.srcNote}>
      Décisions citées : TJ Paris, réf., 12 mars 2026, n° 25/58060 ; TJ Les Sables-d&apos;Olonne, réf., 28 avril 2026, n° 26/00001. Informations générales, ne constituant pas une consultation juridique.
    </div>
  );

  /* Bloc final (remplace l'appel par défaut du gabarit) — renvoi vers /contact. */
  const after = (
    <section className={s.cta} aria-labelledby="h-cta">
      <div className={s.ctaWrap}>
        <div className={s.ctaMain}>
          <span className={s.ctaLabel}>Avocat en escroquerie crypto</span>
          <h2 className={s.ctaH} id="h-cta">Chaque jour compte pour récupérer vos fonds.</h2>
          <p className={s.ctaP}>Le cabinet associe à ses avocats un consultant technique en cybersécurité. L&apos;analyse des flux est conduite avec lui, puis traduite en demandes que le juge peut accorder.</p>
        </div>
        <div className={s.ctaBtns}>
          <Link className={s.btnPrimary} href="/contact">Faire examiner mon dossier</Link>
          <a className={s.btnGhost} href={TEL}>01 81 70 62 00</a>
        </div>
      </div>
    </section>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} after={after} mobileCta={{ href: "/contact", label: "Faire examiner mon dossier" }}>
      {/* ===== L'essentiel en trois temps ===== */}
      <div className={s.troisTemps}>
        <span className={s.ttLabel}>L&apos;essentiel en trois temps</span>
        <div className={s.ttGrid}>
          <div className={s.ttCell}>
            <div className={s.ttNum} aria-hidden="true">01</div>
            <h3 className={s.ttH}>Tracer</h3>
            <p className={s.ttP}>Établir, preuve à l&apos;appui, la plateforme où les fonds sont arrivés.</p>
          </div>
          <div className={s.ttCell}>
            <div className={s.ttNum} aria-hidden="true">02</div>
            <h3 className={s.ttH}>Identifier</h3>
            <p className={s.ttP}>Obtenir du juge que la plateforme révèle le titulaire du compte.</p>
          </div>
          <div className={`${s.ttCell} ${s.ttDark}`}>
            <div className={s.ttNum} aria-hidden="true">03</div>
            <h3 className={s.ttH}>Saisir</h3>
            <p className={s.ttP}>Bloquer les avoirs, à hauteur du préjudice, avant qu&apos;ils ne disparaissent.</p>
          </div>
        </div>
      </div>

      {/* ===== 1 ===== */}
      <h2 id="s1">Pourquoi des cryptos volées peuvent être retrouvées</h2>
      <p>La blockchain est un registre public. Chaque transfert y figure, avec son montant, sa date et les adresses concernées. Qu&apos;il s&apos;agisse d&apos;un faux placement, d&apos;un faux conseiller ou du piratage d&apos;un portefeuille, un analyste peut suivre les fonds d&apos;adresse en adresse, même lorsque l&apos;escroc les fractionne ou les fait transiter par plusieurs portefeuilles.</p>
      <p>Ce registre ne donne pas de noms. Mais tôt ou tard, l&apos;escroc doit convertir les cryptoactifs en monnaie. Il passe alors par une plateforme d&apos;échange, tenue de vérifier l&apos;identité de ses clients et de conserver leurs coordonnées, leurs connexions et leurs comptes bancaires.</p>

      <div className={s.schema} role="img" aria-label="Schéma : du portefeuille de la victime, vers des adresses intermédiaires, jusqu'à la plateforme d'arrivée qui détient l'identité du titulaire">
        <div className={s.schemaBox}>portefeuille<br />de la victime</div>
        <div className={s.schemaArrow} aria-hidden="true">→</div>
        <div className={`${s.schemaBox} ${s.dash}`}>adresses<br />intermédiaires</div>
        <div className={s.schemaArrow} aria-hidden="true">→</div>
        <div className={s.schemaDest}>plateforme d&apos;arrivée<br />= identité du titulaire</div>
      </div>

      <p className={s.pull}><strong>Le but du traçage :</strong> établir, preuve à l&apos;appui, sur quelle plateforme les fonds sont arrivés. C&apos;est ce point d&apos;arrivée qui ouvre la voie judiciaire.</p>

      {/* ===== 2 ===== */}
      <h2 id="s2" data-toc="Obtenir l'identité du titulaire">Première étape : obtenir l&apos;identité du titulaire du compte</h2>
      <p>Dans une ordonnance du 12 mars 2026, le juge des référés du tribunal judiciaire de Paris a ordonné à la société qui exploite la plateforme Kraken de communiquer à une victime l&apos;identité du titulaire d&apos;un compte ayant reçu une partie de ses fonds. La victime avait perdu un peu plus de 65 000 euros.</p>

      <div className={s.fiche}>
        <div className={s.ficheHead}>
          <span>TJ PARIS, RÉF., 12 MARS 2026, N° 25/58060</span>
          <span className={`${s.badge} ${s.badgeOk}`}>ACCORDÉ</span>
        </div>
        <div className={s.ficheBody}>
          <div>
            <span className={s.ficheLbl}>Pièces produites</span>
            <ul className={s.ficheList}>
              <li>un rapport d&apos;enquête détaillant la chaîne des transactions</li>
              <li>une plainte détaillée et circonstanciée</li>
              <li>les captures d&apos;écran des échanges</li>
            </ul>
          </div>
          <div>
            <span className={s.ficheLbl}>Données à communiquer</span>
            <ul className={s.ficheList}>
              <li>nom, naissance, nationalité, adresse</li>
              <li>e-mail, téléphones, pseudonymes</li>
              <li>connexions et transactions</li>
              <li>comptes bancaires liés</li>
            </ul>
          </div>
        </div>
      </div>

      <p>La demande reposait sur l&apos;article 145 du code de procédure civile. La victime n&apos;avait pas à prouver l&apos;escroquerie : il suffisait qu&apos;elle la rende <strong>plausible</strong>.</p>
      <p><strong>Le siège étranger de la plateforme n&apos;est pas un obstacle.</strong> Le juge français peut ordonner des mesures provisoires lorsque la victime vit en France.</p>
      <p><strong>La plainte pénale n&apos;empêche pas d&apos;agir au civil.</strong> La victime n&apos;a aucune certitude sur les suites de sa plainte.</p>
      <p><strong>La demande doit rester proportionnée.</strong> Le juge a limité la communication à une période d&apos;un an.</p>

      {/* ===== 3 ===== */}
      <h2 id="s3" data-toc="Ce que le juge refuse">Ce que le juge refuse : le blocage mal préparé</h2>
      <p>Dans l&apos;affaire parisienne, la suspension du compte a été refusée : l&apos;article 145 sert à obtenir des preuves, pas à geler des avoirs. Et dix-huit mois après les faits, les fonds ont peu de chances d&apos;être encore là.</p>
      <p>Aux Sables-d&apos;Olonne, une victime de 180 000 euros demandait le blocage de réserves de près de 17 millions de dollars. Elle a perdu, et a été condamnée à payer 2 000 euros de frais à l&apos;adversaire.</p>

      <div className={s.fiche}>
        <div className={s.ficheHead}>
          <span>TJ SABLES-D&apos;OLONNE, RÉF., 28 AVRIL 2026, N° 26/00001</span>
          <span className={`${s.badge} ${s.badgeNo}`}>REJETÉ</span>
        </div>
        <ol className={s.ficheMotifs}>
          <li>Un rapport au conditionnel : « suggère », « peut », « potentiellement ».</li>
          <li>Aucun lien démontré entre le compte de la victime et les adresses visées.</li>
          <li>Un rapport commandé par un proche, sans les données de départ.</li>
          <li>Un document illisible sans l&apos;aide d&apos;un technicien.</li>
          <li>Une demande disproportionnée, au détriment des autres détenteurs.</li>
          <li>Des fonds arrivés avant l&apos;escroquerie.</li>
        </ol>
      </div>

      {/* ===== 4 ===== */}
      <h2 id="s4" data-toc="Identifier d'abord, saisir ensuite">Récupérer son argent : identifier d&apos;abord, saisir ensuite</h2>
      <div className={s.tempsGrid}>
        <div className={s.tempsCard}>
          <span className={s.tempsKicker}>Premier temps</span>
          <p className={s.tempsP}><strong>L&apos;identification.</strong> La plateforme d&apos;arrivée révèle le titulaire et la destination des fonds.</p>
        </div>
        <div className={s.tempsCard}>
          <span className={s.tempsKicker}>Second temps</span>
          <p className={s.tempsP}><strong>La saisie conservatoire.</strong> Autorisée par le juge de l&apos;exécution, à hauteur du préjudice.</p>
        </div>
        <div className={s.tempsCard}>
          <span className={s.tempsKicker}>En parallèle</span>
          <p className={s.tempsP}><strong>La voie pénale et la banque.</strong> Saisies pénales, et remboursement par la banque en cas de manquement à sa vigilance.</p>
        </div>
      </div>
      <p>Lorsque la victime a d&apos;abord envoyé des euros par virement, sa banque peut être tenue de la rembourser ou d&apos;engager sa responsabilité. C&apos;est souvent la voie la plus sûre pour obtenir le <Link href={FRAUDE}>remboursement d&apos;une arnaque crypto</Link>.</p>
      <p className={s.voir}>→ Voir aussi : <Link href={CRYPTO}>Crypto-actifs, blockchain et Web3</Link>.</p>

      {/* ===== 5 ===== */}
      <h2 id="s5" data-toc="Le rapport qui tient devant un juge">Le rapport de traçage qui tient devant un juge</h2>
      <ul className={s.check}>
        <Check>Commandé par la victime elle-même, ou par son avocat</Check>
        <Check>Partant de son propre compte, relevés à l&apos;appui</Check>
        <Check>Des conclusions affirmées, jamais au conditionnel</Check>
        <Check>Les identifiants (hash) de chaque transaction</Check>
        <Check>Une chronologie qui exclut les fonds antérieurs aux faits</Check>
        <Check>Le montant exact de la victime sur chaque adresse</Check>
        <Check>La plateforme d&apos;arrivée et l&apos;adresse de dépôt précise</Check>
        <Check>Une méthode expliquée en termes clairs pour le juge</Check>
      </ul>

      {/* ===== 6 ===== */}
      <h2 id="s6" data-toc="Que faire, et dans quel ordre">Arnaque crypto : que faire, et dans quel ordre</h2>
      <p>Le temps est le facteur décisif. Chaque semaine perdue augmente le risque que les fonds soient convertis, retirés ou dispersés.</p>
      <ol className={s.steps}>
        <li><span className={s.stepN} aria-hidden="true">1</span>Conserver échanges, relevés et identifiants de transaction</li>
        <li><span className={s.stepN} aria-hidden="true">2</span>Déposer une plainte précise et circonstanciée</li>
        <li><span className={s.stepN} aria-hidden="true">3</span>Faire établir le rapport de traçage sans attendre</li>
        <li><span className={s.stepN} aria-hidden="true">4</span>Saisir le juge contre la plateforme d&apos;arrivée</li>
        <li><span className={s.stepN} aria-hidden="true">5</span>Examiner en même temps la responsabilité de la banque</li>
      </ol>
    </ArticleLayout>
  );
}
