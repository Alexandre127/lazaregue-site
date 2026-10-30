import type { Metadata } from "next";
import Link from "next/link";
import a from "../_components/article/article.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import CourrierBinance from "./CourrierBinance";
import s from "./binance.module.css";
import { metaArticle } from "../data/meta";
import { article, chemin } from "../data/articles";
import { rubrique } from "@/lib/domaines";
import { POINT } from "./point-de-situation";

/*
 * Mise en page : maquette « Page article – ordinateur » (oct. 2026), variante
 * « actualite » du gabarit. Texte : Article_piratage_Binance_v2_grand_public.md
 * (le texte validé fait foi ; la maquette ne fournit que la forme).
 * Titre, description, chapô, dates et questions fréquentes : registre data/articles.ts.
 * Encadré « Point au … » et date de mise à jour : point-de-situation.ts.
 */
const SLUG = "piratage-binance-clients-francais";
const A = article(SLUG);

const base = metaArticle(SLUG);
/** Image de partage par défaut du site (aucune photo, aucun logo Binance). */
const IMAGE = { url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats" };

export const metadata: Metadata = {
  ...base,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: { ...base.openGraph, title: A.title, images: [IMAGE] },
  twitter: { ...base.twitter, card: "summary_large_image", title: A.title, images: [IMAGE] },
};

/** Ordre des sections : numérote les sections encadrées comme le gabarit numérote les autres. */
const ORDRE = [
  "ce-qui-s-est-passe",
  "promesse",
  "clients-francais",
  "votre-situation",
  "des-maintenant",
  "reprise-des-retraits",
  "faux-remboursements",
  "modele-de-courrier",
  "quand-consulter",
  "lexique",
  "faq",
];
const numero = (id: string) => String(ORDRE.indexOf(id) + 1).padStart(2, "0");

/** Sources numérotées (renvois [n] dans le texte). */
const SOURCES: { texte: string; titre?: string; suite?: string; url?: string }[] = [
  { texte: "Binance, ", titre: "Security Incident Update", suite: ", 30 octobre 2026", url: "https://www.binance.com/en-TR/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7" },
  { texte: "", titre: "Business Upturn", suite: ", 30 octobre 2026, reprenant l'analyse de TRM Labs", url: "https://businessupturn.com/finance/cryptocurrency/binance-withdrawals-to-resume-within-48-hours-says-yi-he-after-record-6-36-billion-crypto-hack/" },
  { texte: "Binance, mise à jour du 30 octobre 2026 sur les retraits et la couverture des pertes", url: "https://www.binance.com/en/square/post/10-30-2026-binance-safu-and-its-own-funds-will-cover-all-losses-approximately-3-billion-has-been-frozen-382819698517524" },
  { texte: "", titre: "France 24", suite: ", 30 octobre 2026 ; Quartz, 30 octobre 2026", url: "https://www.france24.com/fr/%C3%A9co-tech/20261030-cryptomonnaies-binance-cyberattaque-massive-gel-2-5-milliards-de-dollars-bitcoin-ether" },
  { texte: "", titre: "IBTimes UK", suite: ", 30 octobre 2026", url: "https://www.ibtimes.co.uk/binance-suspends-withdrawals-after-security-incident-1828947" },
  { texte: "AMF, ", titre: "Investir en crypto-actifs : quel professionnel choisir ?", suite: ", 27 juillet 2026", url: "https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/crypto-actifs-bitcoin-etc/investir-en-crypto-monnaies-quel-professionnel-choisir" },
  { texte: "CA Lyon, 8e ch., 25 mars 2026, n° 25/04129" },
  { texte: "Message de Binance aux clients français, fin juin 2026, rapporté par Les Échos (repris par Moneyvox) et Journal du Coin", url: "https://www.moneyvox.fr/placement/actualites/109356/binance-suspend-ses-activites-en-france-les-consequences-pour-vos-crypto-ici-le-1er-juillet-2026" },
  { texte: "AMF, ", titre: "Liste des PSAN radiés", url: "https://www.amf-france.org/fr/espace-professionnels/fintech/mes-relations-avec-lamf/prestataire-de-services-sur-crypto-actifs-psca/liste-des-psan-radies" },
  { texte: "ESMA, registre européen des prestataires agréés (fichier CASPS.csv), version du 30 octobre 2026", url: "https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica" },
  { texte: "CA Grenoble, ch. com., 26 juin 2025, n° 24/02105" },
  { texte: "", titre: "TechCrunch", suite: ", mai 2019, sur le piratage de Binance de 2019", url: "https://techcrunch.com/?p=1823936" },
];

/** Renvoi vers une ou plusieurs sources : [1] [2]. */
function R({ n }: { n: number[] }) {
  return (
    <>
      {n.map((i) => (
        <span key={i} className={s.renvoi}>
          {" "}
          <a href={`#source-${i}`} aria-label={`Source ${i}`}>[{i}]</a>
        </span>
      ))}
    </>
  );
}

/** Pictogramme « croix » des pièges (encadré d'alerte). */
function Croix() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.4" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Cartes de liens internes (sous « Si vous avez déjà payé… »). Titres lus dans le registre et le menu. */
const FRAUDE = article("fraude-bancaire-opposition-contestation-remboursement");
const OBSERVATOIRE = article("jurisprudence-faux-conseiller-bancaire");
const DOMAINE_FRAUDE = rubrique("fraude");
const CARTES = [
  { href: chemin(FRAUDE.slug), label: "guide", titre: FRAUDE.title, lire: "Lire →" },
  { href: chemin(OBSERVATOIRE.slug), label: "jurisprudence", titre: OBSERVATOIRE.title, lire: "Lire →" },
  { href: DOMAINE_FRAUDE.href ?? "/nos-domaines/escroquerie-fraude-bancaire", label: "le cabinet", titre: DOMAINE_FRAUDE.titre, lire: "Découvrir →" },
];

export default function Page() {
  const pied = (
    <section className={s.sources} aria-labelledby="sources">
      <p className={s.sourcesTitre} id="sources">sources</p>
      <ol className={s.sourcesListe}>
        {SOURCES.map((src, i) => (
          <li key={i} id={`source-${i + 1}`}>
            {src.texte}
            {src.titre ? <i>{src.titre}</i> : null}
            {src.suite}
            {src.url ? (
              <>
                {" — "}
                <a href={src.url} target="_blank" rel="noopener">
                  {new URL(src.url).hostname.replace(/^www\./, "")} ↗
                </a>
              </>
            ) : null}
          </li>
        ))}
      </ol>
      <p className={s.avertissement}>Article d&apos;information générale, à jour au {POINT.date}. Il ne constitue pas une consultation juridique.</p>
    </section>
  );

  return (
    <ArticleLayout
      slug={SLUG}
      variante="actualite"
      pied={pied}
      faqDansLeCorps
      signature={<>à jour au {POINT.date} · Lazarègue Avocats</>}
      encart={<a className="btn btn-primary" href="#modele-de-courrier">Accéder au modèle gratuit</a>}
      after={<></>}
      bandeau={
        <section className={s.point} aria-labelledby="point-titre">
          <div className={s.pointIn}>
            <div className={s.pointTete}>
              <h2 className={s.pointTitre} id="point-titre">Point au {POINT.date}, {POINT.heure} (heure de Paris)</h2>
              <p className={s.mono}>Cet encadré est mis à jour à chaque nouvelle annonce officielle.</p>
            </div>
            <dl className={s.pointCases}>
              {POINT.cases.map((c) => (
                <div key={c.libelle}>
                  <dt>{c.libelle}</dt>
                  <dd>
                    <span className={s.pointValeur}>{c.valeur}</span>
                    <span className={s.pointDetail}>{c.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      }
    >
      {/* ===== Introduction ===== */}
      <p className={s.intro}>Si vous avez des cryptomonnaies chez Binance, vous avez sans doute appris que la plateforme a été piratée. Vous vous demandez si votre argent est perdu, ce qu&apos;il faut faire et s&apos;il faut s&apos;inquiéter.</p>
      <aside className={s.reponse} aria-labelledby="reponse-courte">
        <p className={s.mono} id="reponse-courte">la réponse courte</p>
        <p className={s.reponseTexte}>À ce stade, rien n&apos;indique que vos cryptos sont perdues. Binance a été volée, pas vous directement, et elle annonce qu&apos;elle remboursera.</p>
      </aside>
      <p>Mais les clients français sont dans une situation particulière, que cette page explique pas à pas, sans jargon. Vous y trouverez aussi un <a className={s.lien} href="#modele-de-courrier">modèle de courrier gratuit</a>, à utiliser si un problème apparaît sur votre compte.</p>

      {/* ===== 01 ===== */}
      <h2 id="ce-qui-s-est-passe" data-toc="Ce qui s&apos;est passé">Ce qui s&apos;est passé, expliqué simplement</h2>
      <h3>Binance, une « banque » de cryptomonnaies</h3>
      <p>Binance est la plus grande plateforme d&apos;échange de cryptomonnaies au monde. Quand vous achetez du bitcoin ou de l&apos;ether sur Binance et que vous le laissez sur votre compte, vous ne le gardez pas vous-même. C&apos;est Binance qui le conserve pour vous, un peu comme une banque conserve votre argent.</p>
      <p>Votre compte affiche un solde, par exemple « 0,5 bitcoin ». Ce solde correspond à ce que Binance vous doit. Les cryptos elles-mêmes sont rangées dans les coffres numériques de la plateforme, avec celles des autres clients. On appelle ces coffres des <strong>portefeuilles</strong>.</p>
      <p>Une partie de ces portefeuilles reste connectée à Internet en permanence, pour que Binance puisse exécuter rapidement les retraits de ses clients. Ce sont ces portefeuilles « connectés » qui ont été visés.</p>

      <h3>L&apos;attaque du 29 octobre 2026</h3>
      <p>Dans la soirée du jeudi 29 octobre 2026, des pirates ont réussi à faire sortir des sommes énormes des portefeuilles de Binance, sur une dizaine de réseaux de cryptomonnaies différents. Concrètement, ils ont obtenu que les systèmes de Binance valident eux-mêmes des transferts vers leurs propres adresses, comme si un voleur parvenait à faire signer des virements par la banque.</p>
      <ul className={s.chiffres} aria-label="Chiffres clés">
        <li><span className={s.chiffreValeur}>≈ 6,3 Md$</span><span className={s.chiffreTexte}>montant de l&apos;opération, selon Binance</span></li>
        <li><span className={s.chiffreValeur}>≈ 3 Md$</span><span className={s.chiffreTexte}>bloqués rapidement</span></li>
        <li><span className={s.chiffreValeur}>Record</span><span className={s.chiffreTexte}>le plus important vol de l&apos;histoire du secteur, selon les sociétés d&apos;analyse</span></li>
      </ul>
      <p>Binance a annoncé le lendemain que l&apos;opération portait sur environ <strong>6,3 milliards de dollars</strong>. C&apos;est, selon les sociétés spécialisées dans l&apos;analyse des transactions en cryptomonnaies, le plus important vol de l&apos;histoire du secteur.<R n={[1, 2]} /></p>
      <p>Binance a d&apos;abord expliqué que l&apos;attaque avait pu commencer par l&apos;ordinateur piraté d&apos;un de ses ingénieurs. Elle a ensuite indiqué avoir découvert d&apos;autres failles. Son enquête n&apos;est pas terminée et elle a promis un rapport technique détaillé.<R n={[1, 3]} /></p>
      <p>Des sociétés privées d&apos;analyse, dont TRM Labs, attribuent l&apos;attaque à un groupe de pirates lié à la Corée du Nord. Binance ne s&apos;est pas prononcée sur ce point.<R n={[2, 4]} /></p>

      <h3>Pourquoi une partie de l&apos;argent a déjà été bloquée</h3>
      <p>Environ <strong>3 milliards de dollars</strong> ont pu être bloqués rapidement.<R n={[1]} /></p>
      <p>Une partie des fonds volés était en <strong>stablecoins</strong>. Ce sont des cryptomonnaies dont la valeur suit celle du dollar, émises par des sociétés comme Tether ou Circle. Ces sociétés peuvent bloquer à distance les jetons qu&apos;elles ont émis, et elles l&apos;ont fait : plus de 2 milliards de dollars ont été bloqués de cette manière.<R n={[5]} /></p>
      <p>Le bitcoin ou l&apos;ether, au contraire, n&apos;ont pas d&apos;émetteur capable de les bloquer. La partie volée sous cette forme est beaucoup plus difficile à récupérer.</p>
      <p className={s.filet}>« Bloqué » ne veut pas dire « rendu ». Ces fonds sont immobilisés : les pirates ne peuvent plus s&apos;en servir. Mais leur restitution à Binance prendra du temps.</p>

      <h3>Pourquoi vous ne pouvez plus retirer vos cryptos</h3>
      <p>Dès qu&apos;elle a détecté l&apos;attaque, Binance a coupé les retraits pour tous ses clients. C&apos;est une mesure de sécurité classique : tant que la faille n&apos;est pas réparée, chaque retrait pourrait être détourné. Binance indique qu&apos;elle reconstruit son système de retrait et vise une reprise dans les 45 heures suivant sa mise à jour du 30 octobre.<R n={[3]} /></p>
      <p>Ce n&apos;est pas la première fois. En 2019, Binance s&apos;était fait voler environ 7 000 bitcoins : elle avait remboursé avec son fonds de réserve, et avait annoncé une suspension des retraits d&apos;environ une semaine.<R n={[12]} /></p>

      <h3>Votre compte personnel a-t-il été piraté ?</h3>
      <p>En principe, non. Les pirates ont visé les coffres de la plateforme, pas les comptes des clients un par un. Rien n&apos;indique, à ce stade, que votre mot de passe ou vos identifiants aient été volés.</p>

      {/* ===== 02 ===== */}
      <h2 id="promesse" data-toc="Ce que vaut la promesse">Ce que Binance promet, et ce que cela vaut</h2>
      <h3>La promesse</h3>
      <p>Binance a déclaré qu&apos;elle <strong>couvrirait toutes les pertes</strong> liées à l&apos;attaque, et que les fonds de ses clients étaient en sécurité.<R n={[1, 3]} /> Pour cela, elle compte utiliser deux sources d&apos;argent :</p>
      <ul className={a.bullets}>
        <li><strong>son fonds SAFU.</strong> C&apos;est une réserve créée par Binance en 2018 pour indemniser ses utilisateurs en cas d&apos;incident, une sorte de caisse de secours interne ;</li>
        <li><strong>ses fonds propres,</strong> c&apos;est-à-dire son propre argent.</li>
      </ul>
      <p>Elle promet aussi de publier une <strong>preuve de réserves</strong> une fois les réparations terminées. Il s&apos;agit d&apos;une vérification qui doit montrer qu&apos;elle détient bien assez de cryptos pour couvrir tous les soldes de ses clients. Ce document sera le meilleur indicateur de la situation réelle.</p>
      <h3>Ce qu&apos;il faut savoir sur cette promesse</h3>
      <div className={s.grille2}>
        <div className={s.carteBord}>
          <p className={s.carteTitre}>Ce n&apos;est pas une garantie de l&apos;État.</p>
          <p className={s.carteTexte}>Quand une banque fait faillite, un fonds public, le Fonds de garantie des dépôts et de résolution, rembourse les clients jusqu&apos;à un certain montant. Ce fonds ne couvre pas les cryptomonnaies.<R n={[6]} /> La seule protection, c&apos;est l&apos;engagement de Binance et votre contrat avec elle.</p>
        </div>
        <div className={s.carteBord}>
          <p className={s.carteTitre}>On ne sait pas exactement qui s&apos;engage.</p>
          <p className={s.carteTexte}>La promesse a été faite au nom de « Binance », sans préciser quelle société. Or Binance n&apos;est pas une seule entreprise : c&apos;est un ensemble de sociétés réparties dans plusieurs pays. Pour un client français, le contrat a été signé en principe avec <strong>Binance France SAS</strong>, une société française distincte. Cette société a même soutenu devant la cour d&apos;appel de Lyon, en mars 2026, qu&apos;elle n&apos;appartenait à aucun « groupe Binance ».<R n={[7]} /> Il sera donc utile de lui demander par écrit si elle se considère tenue par cette promesse. Le <a className={s.lien} href="#modele-de-courrier">modèle de courrier ci-dessous</a> le fait.</p>
        </div>
        <div className={s.carteBord}>
          <p className={s.carteTitre}>Le montant volé n&apos;est pas votre perte.</p>
          <p className={s.carteTexte}>Les 6,3 milliards ont été pris dans les coffres de Binance. Si votre compte affichait 1 bitcoin avant l&apos;attaque et l&apos;affiche encore aujourd&apos;hui, Binance vous doit toujours 1 bitcoin. Vous n&apos;avez rien perdu : vous ne pouvez simplement pas le retirer pour l&apos;instant.</p>
        </div>
        <div className={s.carteBord}>
          <p className={s.carteTitre}>Une baisse des cours n&apos;est pas une perte remboursée.</p>
          <p className={s.carteTexte}>Le prix des cryptomonnaies a baissé après l&apos;annonce. Si vous avez vendu par crainte, la perte qui en résulte n&apos;est pas, en principe, couverte par la promesse de Binance.</p>
        </div>
      </div>

      {/* ===== 03 — bloc navy ===== */}
      <section className={s.blocNavy} data-toc-ancre="clients-francais" data-toc="Clients français" aria-labelledby="clients-francais">
        <p className={s.mono}>{numero("clients-francais")} · clients français</p>
        <h2 id="clients-francais">Pourquoi les clients français sont dans une situation particulière</h2>
        <h3>Binance ne peut plus servir les clients français depuis juillet</h3>
        <p>Depuis le 1er juillet 2026, une règle européenne s&apos;applique dans toute l&apos;Union : le règlement <strong>MiCA</strong>. Il impose à toute plateforme de cryptomonnaies d&apos;obtenir une autorisation officielle, appelée <strong>agrément</strong>, pour servir des clients européens. Cette autorisation s&apos;accompagne d&apos;obligations de sécurité et de protection des clients.</p>
        <p>Binance n&apos;a pas obtenu cet agrément. Fin juin 2026, elle a prévenu ses clients français qu&apos;aucune de ses sociétés ne l&apos;obtiendrait à temps.<R n={[8]} /> Depuis le 1er juillet :</p>
        <ul>
          <li>les clients français ne peuvent plus acheter, vendre ni déposer de l&apos;argent sur Binance ;</li>
          <li>les positions plus complexes, comme le trading avec effet de levier, ont été fermées d&apos;office le 1er octobre ;</li>
          <li><strong>la seule opération encore possible était le retrait de ses avoirs.</strong><R n={[8]} /></li>
        </ul>
        <p>L&apos;ancien enregistrement de Binance France auprès de l&apos;Autorité des marchés financiers (AMF) a pris fin le 2 juillet 2026.<R n={[9]} /> Et au 30 octobre 2026, aucune société du groupe Binance ne figure sur la liste officielle européenne des plateformes autorisées.<R n={[10]} /></p>
        <div className={s.separe}>
          <h3>Ce que cela change pour vous</h3>
          <p><strong>Le piratage a bloqué votre seule porte de sortie.</strong> Pour un client d&apos;un autre pays, la suspension des retraits est un désagrément temporaire. Pour un client français, c&apos;était la seule chose qu&apos;il pouvait encore faire.</p>
          <p><strong>Les protections de MiCA ne vous sont pas acquises.</strong> Le règlement MiCA rend une plateforme autorisée responsable des cryptos perdues à cause d&apos;une cyberattaque qui lui est imputable. Mais ces règles visent les plateformes autorisées, ce que Binance France n&apos;est plus. Votre protection repose donc surtout sur votre <strong>contrat</strong> : Binance France s&apos;est engagée à conserver vos cryptos et à vous les restituer, et cette obligation n&apos;a pas disparu avec la fin de son autorisation.</p>
          <p><strong>Votre compte n&apos;a plus vocation à rester ouvert.</strong> L&apos;AMF demande aux plateformes non autorisées de cesser leur activité et d&apos;informer leurs clients du sort de leurs cryptos.<R n={[6]} /> Quand les retraits reprendront, la vraie question sera de savoir où transférer vos avoirs.</p>
        </div>
      </section>

      {/* ===== 04 ===== */}
      <h2 id="votre-situation" data-toc="Votre situation">Votre situation : que faire ?</h2>
      <div className={s.grille2}>
        <div className={s.carteGris}>
          <p className={s.mono}>cas a</p>
          <h3 className={s.carteTitre}>Votre solde est intact et vous n&apos;aviez rien en cours</h3>
          <p className={s.carteTexte}>C&apos;est la situation de la plupart des clients. Conservez une preuve de votre solde (voir ci-dessous) et attendez l&apos;annonce officielle de la reprise des retraits. Il est inutile d&apos;envoyer une réclamation maintenant.</p>
        </div>
        <div className={s.carteGris}>
          <p className={s.mono}>cas b</p>
          <h3 className={s.carteTitre}>Vous aviez demandé un retrait juste avant la suspension</h3>
          <p className={s.carteTexte}>Notez la date, le montant, la cryptomonnaie, le réseau choisi et le statut affiché (« en cours », « en attente »…). Tant que les retraits sont suspendus pour tout le monde, votre demande attend comme les autres. Si elle reste bloquée après la reprise générale, envoyez le <a className={s.lien} href="#modele-de-courrier">courrier proposé plus bas</a>.</p>
        </div>
        <div className={s.carteGris}>
          <p className={s.mono}>cas c</p>
          <h3 className={s.carteTitre}>Votre compte reste bloqué alors que les retraits ont repris</h3>
          <p className={s.carteTexte}>Le blocage peut avoir une autre cause que l&apos;attaque : vérification de votre identité, justificatif demandé, contrôle propre à votre compte. Demandez une réponse écrite qui concerne <strong>votre</strong> compte, et pas un message général.</p>
        </div>
        <div className={s.carteGris}>
          <p className={s.mono}>cas d</p>
          <h3 className={s.carteTitre}>Des cryptos manquent, ou vous voyez une opération que vous n&apos;avez pas faite</h3>
          <p className={s.carteTexte}>Signalez-le immédiatement au service client, uniquement depuis l&apos;application ou le site officiel. Conservez vos relevés avant et après l&apos;opération, sa référence et vos échanges. Par précaution, changez votre mot de passe et vérifiez la double authentification, c&apos;est-à-dire le code reçu par téléphone ou par application. Vérifiez aussi la liste des appareils connectés à votre compte.</p>
        </div>
      </div>

      {/* ===== 05 ===== */}
      <h2 id="des-maintenant" data-toc="À faire dès maintenant">Ce que vous pouvez faire dès maintenant</h2>
      <p className={s.noteCourrier}>Ces quatre démarches sont simples et gratuites. Elles vous protègent quoi qu&apos;il arrive ensuite.</p>
      <ol className={s.etapes}>
        <li><span className={s.etapeNum} aria-hidden="true">01</span><span><strong>Identifiez la société avec laquelle vous avez un contrat.</strong> Dans votre compte Binance, cherchez la rubrique des conditions générales, ou « mentions légales ». Notez le nom de la société indiquée, en principe Binance France SAS. Gardez aussi le courriel reçu fin juin 2026 sur l&apos;arrêt des services en France.</span></li>
        <li><span className={s.etapeNum} aria-hidden="true">02</span><span><strong>Gardez la preuve de votre solde.</strong> Faites une capture d&apos;écran de votre solde aujourd&apos;hui. Puis téléchargez l&apos;historique complet de vos opérations : Binance permet de l&apos;exporter dans un fichier depuis votre compte. En cas de litige, c&apos;est la pièce la plus importante.</span></li>
        <li><span className={s.etapeNum} aria-hidden="true">03</span><span><strong>Conservez tout échange.</strong> Numéros de ticket du service client, réponses reçues, messages d&apos;erreur, captures d&apos;écran datées.</span></li>
        <li><span className={s.etapeNum} aria-hidden="true">04</span><span><strong>Ne donnez jamais vos codes secrets.</strong> Ni votre mot de passe, ni votre phrase de récupération (la liste de 12 ou 24 mots qui permet d&apos;accéder à un portefeuille), ni vos codes de double authentification. Personne n&apos;a de raison légitime de vous les demander, pas même Binance.</span></li>
      </ol>

      {/* ===== 06 ===== */}
      <h2 id="reprise-des-retraits" data-toc="À la reprise des retraits">Quand les retraits reprendront : comment récupérer vos cryptos sans erreur</h2>
      <p>Le jour de la reprise, beaucoup de clients voudront retirer en même temps. C&apos;est aussi le moment où les erreurs coûtent le plus cher.</p>
      <p><strong>Choisissez où envoyer vos cryptos.</strong> Deux possibilités :</p>
      <div className={s.grille2}>
        <div className={s.carteGris}>
          <h3 className={s.carteTitre}>Un portefeuille personnel</h3>
          <p className={s.carteTexte}>C&apos;est-à-dire une application ou un petit appareil qui vous permet de détenir vous-même vos cryptos, sans intermédiaire. Vous en êtes alors seul responsable : en perdant votre phrase de récupération, vous perdez l&apos;accès.</p>
        </div>
        <div className={s.carteGris}>
          <h3 className={s.carteTitre}>Une autre plateforme autorisée en France</h3>
          <p className={s.carteTexte}>L&apos;AMF publie sur son site la liste des plateformes autorisées, appelée « liste blanche ». Vérifiez-y le nom exact de la société avant d&apos;ouvrir un compte.<R n={[6]} /></p>
        </div>
      </div>
      <div className={s.reflexes}>
        <div>
          <p className={s.reflexeTitre}>Vérifiez l&apos;adresse et le réseau.</p>
          <p className={s.reflexeTexte}>Chaque cryptomonnaie peut circuler sur plusieurs réseaux. Si vous envoyez sur le mauvais réseau, ou à une adresse mal recopiée, les fonds peuvent être perdus définitivement. Copiez-collez l&apos;adresse, ne la retapez jamais, et vérifiez les premiers et derniers caractères.</p>
        </div>
        <div>
          <p className={s.reflexeTitre}>Faites un essai avec un petit montant.</p>
          <p className={s.reflexeTexte}>Envoyez d&apos;abord une petite somme, vérifiez qu&apos;elle est bien arrivée, puis transférez le reste.</p>
        </div>
        <div>
          <p className={s.reflexeTitre}>Gardez la preuve de chaque retrait :</p>
          <p className={s.reflexeTexte}>la date, le montant, l&apos;adresse de destination et l&apos;identifiant de la transaction, une suite de chiffres et de lettres que Binance affiche.</p>
        </div>
      </div>
      <p>Ces conseils ne visent pas à vous faire vendre vos cryptos ni à quitter ce type de placement. Ils visent seulement à récupérer des avoirs détenus par une plateforme qui n&apos;a plus le droit de vous servir en France.</p>

      {/* ===== 07 — encadré d&apos;alerte (seul usage du rouge) ===== */}
      <section className={s.alerte} data-toc-ancre="faux-remboursements" data-toc="Faux remboursements" aria-labelledby="faux-remboursements">
        <p className={s.alerteEtiquette}>{numero("faux-remboursements")} · alerte</p>
        <h2 id="faux-remboursements">Attention aux faux remboursements</h2>
        <p>Après chaque grand piratage, des escrocs profitent de l&apos;inquiétude des clients. Il faut s&apos;attendre à la même chose cette fois. Binance demande elle-même de ne se fier qu&apos;à ses canaux officiels.<R n={[3]} /></p>
        <p><strong>Les pièges les plus fréquents :</strong></p>
        <ul className={s.pieges}>
          <li><Croix /><span><strong>un appel d&apos;un faux « service client Binance ».</strong> Le numéro affiché peut sembler officiel, et l&apos;interlocuteur connaître votre nom et votre solde ;</span></li>
          <li><Croix /><span><strong>un SMS ou un courriel avec un lien vers un « formulaire de remboursement » ;</strong></span></li>
          <li><Croix /><span><strong>une demande de « mettre vos fonds en sécurité »</strong> en les transférant vers une nouvelle adresse ;</span></li>
          <li><Croix /><span><strong>une société, ou même un faux avocat,</strong> qui promet de récupérer vos cryptos si vous payez d&apos;abord des frais.</span></li>
        </ul>
        <div className={s.encartGris}>
          <p><strong>Les bons réflexes :</strong></p>
          <ul>
            <li>ne cherchez pas un numéro de téléphone « Binance » sur Internet : beaucoup sont faux ;</li>
            <li>ne cliquez sur aucun lien reçu par SMS, courriel ou réseau social ;</li>
            <li>ouvrez vous-même l&apos;application ou tapez l&apos;adresse du site dans votre navigateur ;</li>
            <li>au moindre doute, raccrochez.</li>
          </ul>
        </div>
        <div className={s.dejaPaye}>
          <p><strong>Si vous avez déjà payé ou transféré de l&apos;argent</strong> après un tel contact, vous êtes victime d&apos;une escroquerie. Agissez vite : appelez votre banque pour faire opposition et déposez plainte. Dans ces dossiers, il est souvent possible de se retourner contre les banques qui ont exécuté les paiements. Le guide <Link className={s.lien} href="/ressources/fraude-bancaire-opposition-contestation-remboursement">fraude bancaire : opposition, contestation et remboursement</Link> détaille les premières démarches. La page <Link className={s.lien} href="/ressources/jurisprudence-faux-conseiller-bancaire">jurisprudence sur le faux conseiller bancaire</Link> montre comment les juges traitent ce type de manœuvre. Le cabinet intervient sur ces dossiers en <Link className={s.lien} href="/nos-domaines/escroquerie-fraude-bancaire">escroquerie et fraude bancaire</Link>.</p>
          <ul className={s.cartes}>
            {CARTES.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>
                  <span className={s.carteLabel}>{c.label}</span>
                  <span className={s.carteNom}>{c.titre}</span>
                  <span className={s.carteLire}>{c.lire}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 08 ===== */}
      <h2 id="modele-de-courrier" data-toc="Modèle de réclamation">Modèle de courrier gratuit</h2>
      <p><strong>Quand l&apos;utiliser ?</strong> Seulement si vous avez un problème : un retrait bloqué après la reprise, un retrait impossible à lancer, ou des cryptos qui manquent. Si tout va bien sur votre compte, ne l&apos;envoyez pas.</p>
      <p><strong>Comment ?</strong></p>
      <ol className={a.steps}>
        <li>Choisissez l&apos;option qui correspond à votre cas et supprimez les deux autres.</li>
        <li>Remplacez chaque passage entre crochets par vos informations. L&apos;« UID » est votre numéro de compte Binance, visible dans votre profil.</li>
        <li>Envoyez le courrier par le canal de réclamation indiqué dans vos conditions générales, ou à défaut par le service client depuis votre compte.</li>
        <li>Gardez une copie datée et le numéro de réclamation.</li>
      </ol>
      <CourrierBinance />
      <p className={s.noteCourrier}><strong>À savoir :</strong></p>
      <ul className={`${a.bullets} ${s.noteCourrier}`}>
        <li>ne joignez jamais votre mot de passe ou vos codes ;</li>
        <li>ce courrier est une première démarche amiable. Il n&apos;oblige pas Binance à vous rembourser dans un délai précis ;</li>
        <li>la formule « sous réserve de tous mes droits » signifie que vous ne renoncez à rien en l&apos;envoyant.</li>
      </ul>

      {/* ===== 09 ===== */}
      <h2 id="quand-consulter" data-toc="Quand consulter">Quand faire appel à un avocat</h2>
      <p>La plupart des clients n&apos;en auront pas besoin : si les retraits reprennent et que votre solde est intact, il suffira de récupérer vos cryptos.</p>
      <p>L&apos;aide d&apos;un avocat devient utile dans quatre situations :</p>
      <ul className={s.cellules}>
        <li><strong>votre retrait reste bloqué après la reprise générale,</strong> malgré votre réclamation et vos justificatifs ;</li>
        <li><strong>Binance France refuse de vous rembourser</strong> en expliquant que la promesse viendrait d&apos;une autre société du groupe ;</li>
        <li><strong>des cryptos manquent ou ont été vendues d&apos;office.</strong> Dans ce cas, la manière de formuler la demande compte beaucoup : en 2025, la cour d&apos;appel de Grenoble a refusé d&apos;ordonner la restitution de cryptomonnaies elles-mêmes et n&apos;a accordé que la valeur des fonds déposés, sans les gains perdus<R n={[11]} /> ;</li>
        <li><strong>on vous propose une indemnisation en échange de votre renonciation à tout recours.</strong> Il faut alors savoir ce que vous abandonnez avant de signer.</li>
      </ul>
      <aside className={s.appel} aria-label="Exposer votre situation au cabinet">
        <div className={s.appelTexte}>
          <p className={s.appelFort}>Le cabinet identifie la société réellement tenue envers vous, ce que vous pouvez demander et la démarche adaptée à l&apos;enjeu.</p>
          <p>Ses avocats travaillent avec des intervenants techniques capables de retracer les opérations sur les réseaux de cryptomonnaies. Pour un premier examen, rassemblez vos conditions générales, le courriel de juin 2026, l&apos;historique de vos opérations et les réponses du service client.</p>
        </div>
        <Link className={s.appelBtn} href="/contact">Exposer votre situation au cabinet</Link>
      </aside>
      {/* TODO (cabinet) : rétablir la phrase « Pour aller plus loin, l&apos;article
          [Binance bloque votre retrait ou refuse votre indemnisation : quels recours ?](/ressources/binance-retrait-bloque-recours)
          détaille les fondements juridiques et les procédures possibles. »
          quand la page /ressources/binance-retrait-bloque-recours sera publiée. */}

      {/* ===== 10 ===== */}
      <h2 id="lexique" data-toc="Les mots à connaître">Les mots à connaître</h2>
      <dl className={s.lexique}>
        <div><dt>Plateforme d&apos;échange</dt><dd>site qui permet d&apos;acheter, vendre et conserver des cryptomonnaies (Binance, Coinbase, Kraken…).</dd></div>
        <div><dt>Portefeuille</dt><dd>coffre numérique où sont rangées des cryptomonnaies. Il peut être tenu par une plateforme pour ses clients, ou par vous-même.</dd></div>
        <div><dt>Stablecoin</dt><dd>cryptomonnaie dont la valeur suit une monnaie classique, le plus souvent le dollar, et que son émetteur peut bloquer.</dd></div>
        <div><dt>SAFU</dt><dd>fonds de réserve créé par Binance pour indemniser ses utilisateurs en cas d&apos;incident.</dd></div>
        <div><dt>Preuve de réserves</dt><dd>vérification publique destinée à montrer qu&apos;une plateforme détient bien les cryptos de tous ses clients.</dd></div>
        <div><dt>MiCA</dt><dd>règlement européen qui, depuis le 1er juillet 2026, impose aux plateformes de cryptomonnaies une autorisation pour servir des clients dans l&apos;Union.</dd></div>
        <div><dt>Agrément</dt><dd>autorisation officielle délivrée par une autorité, comme l&apos;AMF en France.</dd></div>
        <div><dt>AMF</dt><dd>Autorité des marchés financiers, le gendarme français des placements financiers.</dd></div>
        <div><dt>Phrase de récupération</dt><dd>liste de 12 ou 24 mots qui donne accès à un portefeuille. Quiconque la connaît peut vider le portefeuille.</dd></div>
      </dl>

      {/* ===== 11 — FAQ : même texte que le balisage FAQPage (registre) ===== */}
      <h2 id="faq" data-toc="Questions fréquentes">Questions fréquentes</h2>
      <div className={s.faq}>
        {A.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </ArticleLayout>
  );
}
