import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./escroquerie.module.css";
import { FAQ_ITEMS } from "./faq";
import { MobileActionBar } from "./MobileActionBar";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/escroquerie-fraude-bancaire";
const TEL = "tel:+33181706200";

const TITLE = "Avocat fraude bancaire — remboursement et recours | Lazarègue Avocats";
const DESCRIPTION =
  "Victime de phishing, spoofing, faux conseiller ou virement frauduleux ? Le cabinet examine les recours et le remboursement pouvant être demandé.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/* JSON-LD : LegalService (provider = nœud global #cabinet — le layout ne déclare
   pas #organization) + BreadcrumbList. Aucun FAQPage. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${URL_BASE}${PATH}#service`,
      name: "Avocat en fraude bancaire et escroquerie en ligne",
      url: `${URL_BASE}${PATH}`,
      provider: { "@id": `${URL_BASE}/#cabinet` },
      areaServed: { "@type": "Country", name: "France" },
      serviceType: ["Fraude bancaire", "Virement frauduleux", "Escroquerie en ligne", "Recours contre les établissements de paiement"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Fraude bancaire et escroquerie", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

/* Titres des quatre premières mesures — réutilisés tels quels dans l'encadré
   d'urgence du hero (§3.1 : aucun texte nouveau hormis l'intitulé de l'encadré). */
const MESURES = [
  {
    t: "Alerter l'établissement et demander le rappel des fonds",
    p: "Faire opposition lorsqu'elle est utile, notifier immédiatement les opérations contestées et demander le rappel des fonds. La notification fait courir les obligations de la banque.",
  },
  {
    t: "Conserver les échanges et traces disponibles",
    p: "Relevés, messages, courriels et historique des appels. Les preuves non conservées rapidement peuvent devenir difficiles, voire impossibles, à reconstituer.",
  },
  {
    t: "Contester les opérations par écrit",
    p: "Une contestation adressée à l'établissement, et non une simple réclamation en ligne : sa réponse devient une pièce du dossier.",
  },
  {
    t: "Ne pas attendre la fin de l'enquête pour faire examiner les recours",
    p: "L'action contre les établissements ne dépend pas de l'avancement de la procédure pénale, et certains délais courent en parallèle.",
  },
];

/* Six procédés (situations traitées). `cf` = configuration de rattachement
   (§3.2, proposition de lecture à valider juridiquement). */
const SITUATIONS = [
  { t: "Spoofing et faux conseiller", d: "Appel affichant le numéro de la banque", cf: "Configuration B" },
  { t: "Phishing et hameçonnage", d: "Courriel ou SMS usurpant un service connu", cf: "Configuration A ou B" },
  { t: "Fraude au président", d: "Ordre urgent attribué au dirigeant", cf: "Configuration C" },
  { t: "Faux RIB fournisseur", d: "Facture réglée au mauvais destinataire", cf: "Configuration C" },
  { t: "Placement fictif", d: "Rendements simulés, retraits impossibles", cf: "Configuration C" },
  { t: "Fausse vente en ligne", d: "Virement vers un compte de tiers", cf: "Configuration C" },
];

/* Trajet des fonds. `hit` = les deux banques (accent bleu électrique). */
const FLOW = [
  { n: "01", b: "Victime", s: "Point de départ des fonds", hit: false },
  { n: "02", b: "Banque émettrice", s: "Exécution et vigilance", hit: true },
  { n: "03", b: "Plateforme ou PSP", s: "Obligations sectorielles", hit: false },
  { n: "04", b: "Banque réceptrice", s: "Ouverture et fonctionnement du compte", hit: true },
  { n: "05", b: "Auteur", s: "Solvabilité à vérifier", hit: false },
];

const INTERVENANTS = [
  {
    n: "02",
    t: "La banque du donneur d'ordre",
    p: "Remboursement de l'opération non autorisée, lorsque la qualification est acquise — y compris, sous réserve de cette qualification, quand la validation a été obtenue par manœuvre. Si l'ordre est qualifié d'autorisé, un autre manquement doit être précisément caractérisé, notamment au regard des anomalies apparentes lors de son exécution.",
    refs: ["art. L. 133-18 CMF", "anomalie apparente", "art. 1231-1 C. civ."],
  },
  {
    n: "03",
    t: "La plateforme ou le prestataire de paiement",
    p: "Marketplace, plateforme ou prestataire de paiement : le rôle de chaque intervenant dépend de son statut, des services effectivement fournis et de son intervention dans la réception ou le transfert des fonds.",
    refs: ["statut de l'intervenant", "services effectivement fournis", "réception et transfert des fonds"],
  },
  {
    n: "04",
    t: "La banque qui a reçu les fonds",
    p: "Le compte de réception peut être ouvert au nom d'un tiers ou d'un intermédiaire utilisé pour recevoir et transférer les fonds. La responsabilité de l'établissement suppose une faute civile propre dans l'ouverture ou le fonctionnement du compte : les éléments de vigilance y contribuent sans y suffire, la faute, le préjudice et le lien de causalité restant à établir.",
    refs: ["faute civile propre", "art. 1240 C. civ."],
  },
  {
    n: "05",
    t: "L'auteur et ses complices",
    p: "Une action pénale ou civile peut être engagée contre l'auteur et ses complices lorsqu'ils sont identifiés et que cette voie présente un intérêt pour la victime. La restitution dépend notamment des saisies réalisées et de leur solvabilité.",
    refs: ["art. 313-1 C. pén.", "saisies pénales"],
  },
];

const ACTES = [
  { t: "Note d'analyse du recours", p: "Fondement applicable, délais à vérifier, établissements susceptibles d'être mis en cause, montant susceptible d'être réclamé au regard des opérations et des préjudices justifiés, coût de l'action." },
  { t: "Contestation bancaire motivée", p: "Adressée à l'établissement sur le fondement exact, pièces à l'appui, pour obtenir le remboursement ou une position écrite utilisable." },
  { t: "Mise en demeure", p: "Une fois la position de l'établissement arrêtée, elle fixe les manquements invoqués et la demande chiffrée avant toute saisine d'une juridiction." },
  { t: "Mesure d'instruction ou requête adaptée", p: "Sur le fondement de l'article 145 du code de procédure civile, pour rechercher l'identité du titulaire du compte de réception : motif légitime, nécessité, proportionnalité et secret bancaire s'y discutent." },
  { t: "Plainte ou constitution de partie civile", p: "Rédigée avec les qualifications retenues, la chronologie et l'inventaire des pièces, puis suivie auprès du service saisi." },
  { t: "Procédure et voies de recours", p: "Assignation de la banque émettrice, de la banque réceptrice ou des deux, selon les manquements caractérisés. Saisine du médiateur ou signalement à l'ACPR : leur intérêt et leur articulation avec l'action judiciaire s'apprécient selon le dossier et les délais applicables." },
];

/* Cas clients — bandeau + titre explicite (§3.4), aucune lettre A/B/C. */
const CASES = [
  {
    cnum: "Cas client 01",
    titre: "Virements professionnels après un faux message de la banque",
    situation: "Dirigeante d'une société de services. Après un message reproduisant l'interface de sa banque, des virements sont exécutés depuis le compte professionnel vers des comptes de tiers.",
    diff: "L'établissement oppose une négligence grave de sa cliente.",
    interv: "Contestation de l'autorisation des opérations et de la négligence grave invoquée par l'établissement.",
    res: "Remboursement intégral des virements contestés, obtenu avant audience.",
  },
  {
    cnum: "Cas client 02",
    titre: "Faux placement garanti : deux banques mises en cause",
    situation: "Particulier retraité, sollicité sur plusieurs mois pour un placement présenté comme garanti. Les fonds partent vers des comptes ouverts dans deux établissements distincts, dont un hors métropole.",
    diff: "Les ordres ont été donnés par la victime elle-même, et les comptes de réception relèvent de deux établissements différents.",
    interv: "Mises en demeure, puis assignation des deux banques.",
    res: "Indemnisation au titre de la perte de chance de conserver les fonds.",
  },
  {
    cnum: "Cas client 03",
    titre: "Fausse vente de véhicule : la banque réceptrice mise en cause",
    situation: "Acheteur d'un véhicule annoncé sur une plateforme de petites annonces. Le virement est exécuté vers un compte ouvert au nom d'un tiers, dans un établissement en ligne.",
    diff: "Le virement a été voulu par l'acheteur, et le compte destinataire n'était pas celui du vendeur annoncé.",
    interv: "Assignation de la banque émettrice et de la banque réceptrice.",
    res: "Accord transactionnel avec la banque réceptrice.",
  },
];

const TEAM = [
  { photo: "/images/alexandre-pro.jpg", alt: "Portrait d'Alexandre Lazarègue", nom: "Alexandre Lazarègue", bar: "avocat au barreau de Paris", p: "Droit du numérique. Conduit les recours contre les établissements financiers, l'action pénale et les mesures d'instruction destinées à identifier les comptes de réception.", pos: "center 25%" },
  { photo: "/images/amir-pro.jpg", alt: "Portrait d'Amir Ben Majed", nom: "Amir Ben Majed", bar: "avocat au barreau d'Évry", p: "Contentieux et procédure. Intervient sur les écritures, les mesures d'urgence et la conduite des instances devant les juridictions saisies.", pos: "center 25%" },
  { photo: "/images/equipe/sarah-hinderer.webp", alt: "Portrait de Sarah Hinderer", nom: "Sarah Hinderer", bar: "avocate aux barreaux de Paris et de Montréal", p: "Suit les dossiers de fraude bancaire et d'escroquerie, de la constitution du dossier de preuve au suivi des plaintes et du lien avec les services d'enquête.", pos: "center top" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className={styles.skipLink} href="#main">Aller au contenu</a>

      <div className={styles.esc}>
        <main id="main">
          {/* ===== 1. HERO (photo La Défense + dégradé bleu nuit) ===== */}
          <section className="hero hero-photo" aria-labelledby="h1">
            <div className="hero-bg" aria-hidden="true">
              <Image
                src="/images/fraude-bancaire-hero.webp"
                alt=""
                aria-hidden="true"
                fill
                priority
                sizes="100vw"
                className="hero-bg-img"
              />
            </div>
            <div className="wrap">
              <nav className="crumb" aria-label="Fil d’Ariane">
                <Link href="/">Accueil</Link> <span aria-hidden>/</span> <Link href="/nos-domaines">Domaines</Link> <span aria-hidden>/</span> <span aria-current="page">Fraude bancaire et escroquerie</span>
              </nav>
              <div className="hero-grid">
                <div className="hero-main">
                  <span className="lbl">fraude bancaire · escroquerie en ligne · toute la France</span>
                  <h1 id="h1">Avocat en fraude bancaire et escroquerie en ligne</h1>
                  <p className="say">{fr("Le cabinet défend les victimes de virements frauduleux, de faux conseillers bancaires, de phishing, de faux RIB et de placements fictifs. Il examine la qualification de chaque opération et les recours susceptibles d'être engagés contre les établissements et intermédiaires concernés.")}</p>
                  <p className="claim">{fr("L'escroc a disparu. Les établissements par lesquels les fonds ont circulé, non.")}</p>
                  <div className="actions">
                    <a className="btn btn-primary" href={TEL}>Appeler le cabinet — 01 81 70 62 00</a>
                    <Link className="btn btn-line" href="/contact">Demander à être contacté</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bande d'urgence — rappel court, pleine largeur, sous le hero */}
          <section className="urgband" aria-label="Opération récente : premières démarches">
            <div className="wrap urgband-inner">
              <p className="urgband-title">Opération récente ? À faire maintenant</p>
              <ol className="urgband-list">
                {MESURES.map((m) => (
                  <li key={m.t}>{fr(m.t)}</li>
                ))}
              </ol>
              <a className="urgband-link" href="#premiers">Détail des premières mesures ↓</a>
            </div>
          </section>

          {/* ===== 2. UN RECOURS RESTE-T-IL POSSIBLE ? ===== */}
          <section aria-labelledby="recours-h">
            <div className="wrap qc">
              <div className="sec-head">
                <span className="lbl">la première question</span>
                <h2 id="recours-h">Un recours reste-t-il possible&nbsp;?</h2>
              </div>
              <div className="answer">
                <p>{fr("Un refus de la banque ne suffit pas à répondre à cette question. Le recours dépend notamment de l'opération réellement autorisée, des informations présentées au moment de la validation, des preuves produites par l'établissement, des anomalies éventuellement apparentes et du rôle des comptes ayant reçu les fonds.")}</p>
                <p>{fr("Le cabinet reprend chaque opération séparément et détermine le régime applicable, les délais à vérifier et les établissements dont la responsabilité peut être recherchée.")}</p>
                <p className="delay"><b>Délai.</b> {fr("Une opération non autorisée ou mal exécutée doit en principe être signalée dans les treize mois du débit. Ce délai ne régit pas tous les recours et certaines règles peuvent être aménagées pour les clients professionnels. La qualification du paiement et le contrat applicable doivent être vérifiés.")}</p>
                <p className="answer-cta"><a className="link" href={TEL}>Parler à un avocat — 01 81 70 62 00</a></p>
              </div>
            </div>
          </section>

          {/* ===== 3. TROIS CONFIGURATIONS ===== */}
          <section className="tint" aria-labelledby="conf-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">{fr("qualification de l'opération")}</span>
                <h2 id="conf-h">Trois configurations, trois analyses différentes</h2>
                <p className="lede">{fr("La question décisive n'est pas de savoir si vous avez appuyé sur un bouton, mais sur quelle opération de paiement a porté votre consentement. De cette qualification dépend le fondement du recours, et elle se discute au vu des écrans, des messages et des informations affichées au moment de la validation.")}</p>
              </div>
              <div className="conf">
                <article className="conf-a">
                  <span className="L" aria-hidden>A</span>
                  <h3><span className="sr">Configuration A — </span>{fr("L'ordre a été passé sans vous")}</h3>
                  <p className="sit">{fr("Débit par carte, virement exécuté après captation de vos données, bénéficiaire enregistré à votre insu.")}</p>
                  <p className="k">Ce qui se discute</p>
                  <ul className="pts">
                    <li>{fr("Remboursement de principe, au plus tard à la fin du premier jour ouvrable suivant la notification.")}</li>
                    <li>{fr("Exception lorsque l'établissement a de bonnes raisons de soupçonner une fraude de l'utilisateur et les communique par écrit à la Banque de France.")}</li>
                    <li>{fr("La preuve de l'autorisation, comme celle de la négligence grave, lui incombe.")}</li>
                  </ul>
                  <p className="refs">art. L. 133-18 · L. 133-19 · L. 133-23 CMF</p>
                </article>
                <article className="conf-b">
                  <span className="L" aria-hidden>B</span>
                  <h3><span className="sr">Configuration B — </span>{fr("Vous avez validé, mais sur quoi ?")}</h3>
                  <p className="sit">{fr("Faux conseiller, spoofing : la validation est présentée comme le blocage d'une fraude, l'enregistrement d'un bénéficiaire ou une mise en sécurité du compte.")}</p>
                  <p className="k">Ce qui se discute</p>
                  <ul className="pts">
                    <li>{fr("Établir que le consentement n'a pas porté sur le paiement exécuté, et contester l'opération comme non autorisée.")}</li>
                    <li>{fr("Si elle est finalement qualifiée d'autorisée, rechercher si un autre manquement peut être caractérisé, notamment une anomalie apparente.")}</li>
                    <li>{fr("Question distincte : la négligence grave opposée au client, dont la preuve pèse sur l'établissement.")}</li>
                  </ul>
                  <p className="refs">art. L. 133-18 · L. 133-23 CMF · art. 1231-1 C. civ.</p>
                </article>
                <article className="conf-c">
                  <span className="L" aria-hidden>C</span>
                  <h3><span className="sr">Configuration C — </span>{fr("Vous avez voulu le virement")}</h3>
                  <p className="sit">{fr("Vous avez volontairement donné l'ordre, mais au profit d'un bénéficiaire que vous croyiez légitime : faux RIB fournisseur, ordre attribué au dirigeant, plateforme d'investissement fictive.")}</p>
                  <p className="k">Ce qui se discute</p>
                  <ul className="pts">
                    <li>{fr("Le consentement à l'opération existe : elle est autorisée.")}</li>
                    <li>{fr("Un autre manquement doit alors être précisément caractérisé, notamment au regard des anomalies apparentes lors de l'exécution.")}</li>
                    <li>{fr("Les délais applicables ne sont pas ceux de la contestation des opérations non autorisées.")}</li>
                  </ul>
                  <p className="refs">anomalie apparente · art. 1231-1 C. civ.</p>
                </article>
              </div>
              <div className="bc">
                <span className="tag" aria-hidden>B / C</span>
                <p><span className="sr">Configurations B et C. </span>{fr("Ce qui se discute entre B et C est l'enjeu principal de ces dossiers. L'établissement soutiendra que l'authentification forte a été validée, donc que l'opération était autorisée. L'article L. 133-23 du code monétaire et financier fournit le point d'appui de la discussion : l'utilisation de l'instrument de paiement enregistrée par le prestataire ne suffit pas nécessairement à prouver que l'opération a été autorisée.")}</p>
              </div>
            </div>
          </section>

          {/* ===== 4. SITUATIONS TRAITÉES ===== */}
          <section aria-labelledby="proc-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">situations traitées</span>
                <h2 id="proc-h">Faux conseiller, phishing, faux RIB et placements fictifs</h2>
                <p className="lede">{fr("Le cabinet intervient lorsque la fraude a conduit à un paiement, à un virement ou à l'ouverture d'un compte ou d'un crédit au nom de la victime. Le procédé employé doit être distingué de la qualification juridique des opérations réalisées.")}</p>
              </div>
              <div className="typo">
                {SITUATIONS.map((s) => (
                  <article key={s.t}>
                    <h3>{fr(s.t)}</h3>
                    <p className="d">{fr(s.d)}</p>
                    <p className="cf">{s.cf}</p>
                  </article>
                ))}
              </div>
              <p className="after-band">{fr("Le cabinet intervient également dans les dossiers d'usurpation d'identité, de détournement interne ou d'escroquerie sentimentale lorsqu'ils impliquent des flux bancaires ou des intermédiaires susceptibles d'être mis en cause.")}</p>
              <div className="crypto">
                <h3>Placements fictifs et conversion en crypto-actifs</h3>
                <p>{fr("Lorsqu'une victime a elle-même ordonné les virements vers un faux courtier, le régime des opérations non autorisées ne s'applique pas automatiquement. Le cabinet examine alors le rôle des banques et intermédiaires ayant exécuté ou reçu les fonds. Lorsque les sommes ont été converties en crypto-actifs, une analyse technique peut compléter la reconstitution des flux.")}</p>
              </div>
            </div>
          </section>

          {/* ===== 5. CE QU'IL FAUT FAIRE IMMÉDIATEMENT ===== */}
          <section id="premiers" className="tint" aria-labelledby="urg-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">les premiers jours</span>
                <h2 id="urg-h">{fr("Ce qu'il faut faire immédiatement")}</h2>
                <p className="lede">{fr("Certaines démarches doivent être entreprises rapidement, sans attendre que l'ensemble du dossier soit constitué.")}</p>
              </div>
              <ol className="steps">
                {MESURES.map((m, i) => (
                  <li key={m.t}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3>{fr(m.t)}</h3><p>{fr(m.p)}</p></div>
                  </li>
                ))}
              </ol>
              <p className="after-steps">{fr("En cas de doute, le cabinet indique dès le premier échange les démarches prioritaires et les éléments à conserver.")}</p>
            </div>
          </section>

          {/* ===== 6. CONTRE QUELS INTERVENANTS AGIR ? (navy) ===== */}
          <section className="dark" aria-labelledby="def-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">le trajet des fonds</span>
                <h2 id="def-h">Contre quels intervenants agir&nbsp;?</h2>
                <p className="lede">{fr("Une escroquerie bancaire peut faire intervenir la banque du payeur, l'établissement qui reçoit les fonds, ainsi que des prestataires de paiement, plateformes ou autres intermédiaires. Chacun a des obligations propres, et le manquement de l'un n'exclut pas celui de l'autre.")}</p>
              </div>
              <ol className="flowf" aria-label="Trajet des fonds, de la victime à l’auteur">
                {FLOW.map((f) => (
                  <li key={f.n} className={f.hit ? "hit" : undefined}>
                    <span className="num">{f.n}</span>
                    <b>{f.b}</b>
                    <span className="s">{fr(f.s)}</span>
                  </li>
                ))}
              </ol>
              <p className="para"><b>{fr("Voie parallèle — l'assureur.")}</b> {fr("La garantie fraude ou cyber du contrat de l'entreprise ne se situe pas sur le trajet des fonds : elle se mobilise en parallèle, à condition d'une déclaration correctement qualifiée dès les premiers jours.")}</p>
              <div className="who">
                {INTERVENANTS.map((it) => (
                  <article key={it.n}>
                    <span className="num">{it.n}</span>
                    <div>
                      <h3>{fr(it.t)}</h3>
                      <p>{fr(it.p)}</p>
                    </div>
                    <p className="refs">
                      {it.refs.map((r, i) => (
                        <span key={r}>{fr(r)}{i < it.refs.length - 1 ? <br /> : null}</span>
                      ))}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 7. LES ACTES PRÉPARÉS ===== */}
          <section aria-labelledby="actes-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">la prestation</span>
                <h2 id="actes-h">Les actes préparés par le cabinet</h2>
                <p className="lede">{fr("Selon la qualification retenue et l'état du dossier, l'intervention se traduit par des actes identifiés.")}</p>
              </div>
              <div className="acts">
                {ACTES.map((a, i) => (
                  <article key={a.t}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3>{fr(a.t)}</h3><p>{fr(a.p)}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 8. CAS CLIENTS (navy) ===== */}
          <section className="dark" aria-labelledby="cas-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">cas clients</span>
                <h2 id="cas-h">Trois dossiers, trois stratégies de recours</h2>
                <p className="lede">{fr("Trois exemples parmi les dossiers dans lesquels le cabinet est intervenu.")}</p>
              </div>
              <div className="dos">
                {CASES.map((c) => (
                  <article className="dcard" key={c.cnum}>
                    <div className="top">
                      <p className="cnum">{c.cnum}</p>
                      <h3 className="ctitle">{fr(c.titre)}</h3>
                    </div>
                    <dl>
                      <dt>Situation</dt>
                      <dd>{fr(c.situation)}</dd>
                      <dt>Difficulté juridique</dt>
                      <dd>{fr(c.diff)}</dd>
                      <dt>Intervention</dt>
                      <dd>{fr(c.interv)}</dd>
                    </dl>
                    <div className="res">
                      <b>Résultat</b>
                      <p>{fr(c.res)}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="note-line">{fr("Les résultats mentionnés correspondent à des décisions ou à des accords effectivement obtenus. Ils ne préjugent pas de l'issue d'un autre dossier, chaque situation dépendant de ses propres faits et pièces. Les faits sont modifiés dans la mesure nécessaire à l'anonymat des parties.")}</p>
            </div>
          </section>

          {/* ===== 9. FAQ ===== */}
          <section aria-labelledby="faq-h">
            <div className="wrap faq-grid">
              <div className="sec-head">
                <span className="lbl">questions fréquentes</span>
                <h2 id="faq-h">Ce qui est demandé le plus souvent</h2>
              </div>
              <div>
                <div className="faq">
                  {FAQ_ITEMS.map((item) => (
                    <details key={item.q} open={item.open}>
                      <summary>{fr(item.q)}</summary>
                      <div className="a"><p>{fr(item.a)}</p></div>
                    </details>
                  ))}
                </div>
                <p className="after-faq">
                  {fr("Pour les atteintes aux systèmes de traitement automatisé de données, voir la page ")}
                  <Link href="/nos-domaines/cybercriminalite">cybercriminalité</Link>
                  {fr(". Lorsque le litige porte sur le fonctionnement propre d'une plateforme, la conservation des clés, un smart contract ou le blocage contractuel d'actifs, consultez la compétence ")}
                  <Link href="/nos-domaines/crypto-actifs-blockchain">Crypto-actifs, blockchain et Web3</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* ===== 10. ÉQUIPE ===== */}
          <section className="tint" aria-labelledby="team-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">qui traite le dossier</span>
                <h2 id="team-h">Le dossier est suivi par un avocat, pas par un service</h2>
                <p className="lede">{fr("Ces dossiers se jouent sur des pièces et une chronologie. Chaque dossier est placé sous la responsabilité d'un avocat identifié, qui en coordonne le suivi jusqu'à son terme.")}</p>
              </div>
              <div className="team">
                {TEAM.map((m) => (
                  <figure key={m.nom}>
                    <div className="portrait">
                      <Image src={m.photo} alt={m.alt} fill sizes="(max-width: 940px) 100vw, 33vw" loading="lazy" style={{ objectFit: "cover", objectPosition: m.pos }} />
                    </div>
                    <figcaption>
                      <h3>{m.nom}</h3>
                      <p className="bar">{m.bar}</p>
                      <p>{fr(m.p)}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="after-team">{fr("Sur les dossiers où la reconstitution des flux ou l'analyse des journaux d'authentification est déterminante, le cabinet travaille avec un intervenant technique.")}</p>
            </div>
          </section>

          {/* ===== 11. CONTACT (bleu) ===== */}
          <section className="contact" id="contact" aria-labelledby="ct-h">
            <div className="wrap">
              <span className="lbl">prendre contact</span>
              <h2 id="ct-h">Faire évaluer mon recours par un avocat</h2>
              <p className="lede">{fr("Un premier échange permet de comprendre la fraude, la position de la banque et les recours qui méritent d'être examinés. Le cabinet vous indiquera ensuite les informations et pièces nécessaires.")}</p>
              <div className="actions">
                <a className="btn btn-white" href={TEL}>Appeler — 01 81 70 62 00</a>
                <Link className="btn btn-ow" href="/contact">Demander à être contacté</Link>
              </div>
              <p className="coord">
                <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a> · 18 rue de Tilsitt, 75017 Paris — le cabinet intervient dans toute la France.
              </p>
            </div>
          </section>
        </main>

        <MobileActionBar />
      </div>
    </>
  );
}
