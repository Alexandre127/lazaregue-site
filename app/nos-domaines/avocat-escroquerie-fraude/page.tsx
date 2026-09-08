import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./escroquerie.module.css";
import { FAQ_ITEMS } from "./faq";
import DiagnosticModule from "./_components/DiagnosticModule";
import Triangle from "./_components/Triangle";

const TITLE = "Avocat escroquerie à Paris | Fraudes et recours bancaires";
const DESCRIPTION =
  "Victime d'une escroquerie ou d'une fraude bancaire ? Lazarègue Avocats engage les recours contre les banques et les intermédiaires financiers.";
const PATH = "/nos-domaines/avocat-escroquerie-fraude";
const ABS = "https://lazaregue-avocats.fr" + PATH;

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
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": ABS + "#service",
      name: "Lazarègue Avocats — escroquerie et fraude",
      url: ABS,
      description: DESCRIPTION,
      areaServed: "FR",
      telephone: "+33181706200",
      address: {
        "@type": "PostalAddress",
        streetAddress: "18 rue de Tilsitt",
        postalCode: "75017",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    {
      "@type": "FAQPage",
      "@id": ABS + "#faq",
      mainEntity: FAQ_ITEMS.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <div className={styles.page}>
        {/* ===== Héro ===== */}
        <div className={styles.hero}>
          <div className={styles.wrap}>
            <span className={styles.lbl}>victimes d'escroquerie · recours et récupération des fonds</span>
            <h1>Avocat<br />escroquerie<br />et fraude</h1>
            <p className={styles.claim}>{fr("L'escroc a disparu. Les établissements qui ont laissé circuler les fonds, non.")}</p>
            <p className={styles.sub}>{fr("Escroquerie bancaire, phishing, spoofing, faux conseiller, fraude au président, faux RIB, placement fictif, escroquerie hors ligne. Le cabinet intervient pour les victimes : il conduit l'action pénale et, surtout, recherche le remboursement ou l'indemnisation auprès des établissements et intermédiaires financiers.")}</p>
            <div className={styles.heroline}>
              <div><strong>13 mois</strong><span>délai de contestation des opérations non autorisées — art. L. 133-24 CMF</span></div>
              <div><strong>5</strong><span>voies de recours à examiner, dont deux établissements bancaires</span></div>
              <div><strong>313-1</strong><span>l'escroquerie, distincte des atteintes aux systèmes (323-1 et s.)</span></div>
            </div>
          </div>
        </div>

        {/* ===== Module de qualification (îlot client) ===== */}
        <DiagnosticModule />

        {/* ===== Les trois configurations ===== */}
        <section id="test">
          <div className={styles.wrap}>
            <span className={styles.lbl}>le test du consentement</span>
            <h2>Trois configurations, pas deux</h2>
            <p className={styles.lede}>{fr("La question décisive n'est pas de savoir si vous avez appuyé sur un bouton, mais sur quelle opération de paiement a porté votre consentement. C'est de cette qualification que dépend le fondement, et elle se discute au vu des écrans, des messages et des informations affichées au moment de la validation.")}</p>
            <div className={styles.gates}>
              <div>
                <p className={styles.q}>A — aucun acte de votre part</p>
                <h3>L'ordre a été passé sans vous</h3>
                <p>Débit par carte, virement exécuté après captation de vos données, bénéficiaire enregistré à votre insu.</p>
                <ul>
                  <li>Remboursement de principe, au plus tard à la fin du premier jour ouvrable suivant la notification</li>
                  <li>Exception si l'établissement a de bonnes raisons de soupçonner une fraude de l'utilisateur, communiquées par écrit à la Banque de France</li>
                  <li>La preuve de l'autorisation, comme celle de la négligence grave, lui incombe</li>
                </ul>
                <p className={styles.base}>art. L. 133-18, L. 133-19 et L. 133-23 CMF<br />régime aménageable pour les non-consommateurs</p>
              </div>
              <div>
                <p className={styles.q}>B — validation obtenue par manœuvre</p>
                <h3>{fr("Vous avez validé, mais sur quoi ?")}</h3>
                <p>Faux conseiller, spoofing : la validation est présentée comme le blocage d'une fraude, l'enregistrement d'un bénéficiaire ou une mise en sécurité du compte.</p>
                <ul>
                  <li><strong>Première voie</strong> — établir que le consentement n'a pas porté sur le paiement exécuté, et contester l'opération comme non autorisée</li>
                  <li><strong>Seconde voie</strong> — à défaut, rechercher la responsabilité sur le devoir de vigilance</li>
                </ul>
                <p className={styles.base}>art. L. 133-6, L. 133-7 et L. 133-18 CMF<br />à défaut — devoir de vigilance</p>
              </div>
              <div>
                <p className={styles.q}>C — ordre voulu, mobile vicié</p>
                <h3>Vous avez voulu ce virement</h3>
                <p>Faux RIB fournisseur, ordre attribué au dirigeant, plateforme d'investissement fictive : le bénéficiaire était cru légitime.</p>
                <ul>
                  <li>Le consentement à l'opération existe : elle est autorisée</li>
                  <li>Le recours porte sur la vigilance et l'anomalie apparente</li>
                  <li>Les délais applicables ne sont pas ceux de la contestation des opérations non autorisées</li>
                </ul>
                <p className={styles.base}>devoir de vigilance · anomalie apparente<br />art. 1231-1 et 1240 C. civ.</p>
              </div>
            </div>
            <p className={styles.refs}>{fr("La ligne de partage entre B et C est l'enjeu principal de ces dossiers. L'établissement soutiendra que l'authentification forte a été validée, donc que l'opération était autorisée et que seule la vigilance reste discutable. La discussion se noue alors sur un point précis : à quelle opération le consentement a-t-il porté, au vu de ce qui était affiché au moment de la validation. L'article L. 133-23 du code monétaire et financier fournit le point d'appui, en énonçant que l'utilisation de l'instrument de paiement enregistrée par le prestataire ne suffit pas nécessairement à prouver que l'opération a été autorisée.")}</p>
          </div>
        </section>

        {/* ===== Ce que la plainte ne fait pas ===== */}
        <section id="plainte">
          <div className={`${styles.wrap} ${styles.narrow}`}>
            <span className={styles.lbl}>un préalable</span>
            <h2>Ce que la plainte ne fait pas</h2>
            <p>L'auteur est rarement identifié, rarement solvable, rarement en France. La procédure pénale établit la matérialité des faits, ouvre la voie des saisies et documente le dossier civil. Elle ne restitue presque jamais les fonds à elle seule.</p>
            <p>C'est pourquoi la plainte, lorsqu'elle est déposée, n'est jamais l'unique action. Elle est conduite en parallèle du recours contre les établissements, pas avant lui, et surtout pas à sa place.</p>
          </div>
        </section>

        {/* ===== Contre qui le recours peut être engagé ===== */}
        <section className={styles.navy} id="qui-paie">
          <div className={styles.wrap}>
            <span className={styles.lbl}>l'architecture du recours</span>
            <h2>Contre qui le recours peut-il être engagé</h2>
            <p className={styles.lede}>{fr("Une escroquerie bancaire fait intervenir au moins deux établissements, auxquels peuvent s'ajouter des prestataires de paiement, des plateformes ou d'autres intermédiaires. Chacun a des obligations propres, et le manquement de l'un n'exclut pas celui de l'autre.")}</p>

            <Triangle />
            <p className={styles.triNote}>Cinq voies, numérotées comme les fiches ci-dessous. La cinquième est celle que tout le monde tente d'abord.</p>

            <div className={styles.debtors}>
              <div className={styles.debtor}>
                <span className={styles.n}>01</span>
                <div><h3>La banque du donneur d'ordre</h3><p>Remboursement de l'opération non autorisée à titre principal, y compris lorsque la validation a été obtenue par manœuvre. Manquement au devoir de vigilance à titre subsidiaire, ou à titre principal lorsque l'ordre a réellement été voulu.</p></div>
                <p className={styles.base}>principal — L. 133-18 CMF<br />subsidiaire — vigilance</p>
              </div>
              <div className={styles.debtor}>
                <span className={styles.n}>02</span>
                <div><h3>La banque du bénéficiaire</h3><p>Le compte de réception est presque toujours ouvert au nom d'un intermédiaire. Sa responsabilité peut être recherchée lorsqu'une faute civile propre est caractérisée dans l'ouverture ou le fonctionnement du compte. Les éléments issus du dispositif de vigilance contribuent à la démonstration, sans ouvrir par eux-mêmes un droit à indemnisation : la faute, le préjudice et le lien de causalité restent à établir. C'est l'angle le moins exploité du contentieux, et le plus exigeant.</p></div>
                <p className={styles.base}>faute civile propre<br />art. 1240 C. civ.</p>
              </div>
              <div className={styles.debtor}>
                <span className={styles.n}>03</span>
                <div><h3>La plateforme ou le prestataire</h3><p>Marketplace, prestataire de services sur actifs numériques, opérateur de paiement : leurs obligations propres, et depuis le 1<sup>er</sup> octobre 2024 l'obligation faite aux opérateurs téléphoniques de bloquer les appels dont le numéro n'a pu être authentifié.</p></div>
                <p className={styles.base}>obligations sectorielles<br />authentification des appels</p>
              </div>
              <div className={styles.debtor}>
                <span className={styles.n}>04</span>
                <div><h3>L'assureur</h3><p>Garantie fraude ou cyber du contrat de l'entreprise, dont la mobilisation suppose une déclaration correctement qualifiée dès les premiers jours.</p></div>
                <p className={styles.base}>police fraude<br />police cyber</p>
              </div>
              <div className={styles.debtor}>
                <span className={styles.n}>05</span>
                <div><h3>L'auteur et ses complices</h3><p>Poursuivi, saisi, parfois condamné. L'aide apportée en connaissance de cause, même par l'intermédiaire d'un autre complice, tombe sous l'article 121-7 du code pénal. Mais la solvabilité manque presque toujours.</p></div>
                <p className={styles.base}>art. 313-1, 313-2<br />art. 121-7 C. pén.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Les procédés traités ===== */}
        <section id="procedes">
          <div className={styles.wrap}>
            <span className={styles.lbl}>le vecteur, pas le domaine</span>
            <h2>Les procédés traités</h2>
            <p className={styles.lede}>{fr("Le phishing et le spoofing ne sont pas des infractions : ce sont des manœuvres frauduleuses au sens de l'article 313-1 du code pénal. Le numérique est le canal, l'escroquerie est la qualification.")}</p>
            <div className={styles.grid}>
              <article><h3>Spoofing et faux conseiller</h3><p>Le numéro réel de l'établissement s'affiche sur le téléphone. Sous couvert de sécuriser le compte, la victime valide l'ajout d'un bénéficiaire.</p><p className={styles.txt}>313-1 · 226-4-1 · L. 133-19</p></article>
              <article><h3>Phishing et hameçonnage</h3><p>Courriel ou SMS usurpant une banque, une administration, un fournisseur. Les identifiants captés servent ensuite au détournement.</p><p className={styles.txt}>313-1 · 226-18 · 323-3</p></article>
              <article><h3>Fraude au président</h3><p>Ordre urgent et confidentiel attribué au dirigeant. Le comptable exécute. L'opération est régulière en la forme.</p><p className={styles.txt}>313-1 · vigilance bancaire</p></article>
              <article><h3>Faux fournisseur, faux RIB</h3><p>Changement de coordonnées bancaires annoncé par courriel falsifié. La facture est réglée au bon montant, au mauvais destinataire.</p><p className={styles.txt}>313-1 · 441-1</p></article>
              <article><h3>Investissement et actifs numériques</h3><p>Plateforme fictive, rendements simulés, retraits impossibles. Les fonds transitent par des comptes ouverts au nom de tiers.</p><p className={styles.txt}>313-1 · traçage des flux</p></article>
              <article><h3>Escroquerie sentimentale</h3><p>Relation entretenue sur plusieurs mois, demandes graduées, rupture d'épargne. Les montants sont souvent les plus élevés.</p><p className={styles.txt}>313-1 · 313-2 (vulnérabilité)</p></article>
              <article><h3>Usurpation d'identité</h3><p>Crédit souscrit, compte ouvert, documents falsifiés au nom de la victime, qui découvre la dette avant la fraude.</p><p className={styles.txt}>226-4-1 · 441-1</p></article>
              <article><h3>Escroquerie hors ligne</h3><p>Fausse qualité, abus d'une qualité vraie, faux certificateurs, mise en scène avec intervention de tiers. Le numérique n'y joue aucun rôle.</p><p className={styles.txt}>313-1 · 313-2 · 313-7 à 313-9</p></article>
              <article><h3>Détournement interne</h3><p>Fournisseur fictif, double facturation, virements sortants d'un salarié ou d'un mandataire. Le volet pénal croise le volet social.</p><p className={styles.txt}>314-1 · 313-1 · 121-7</p></article>
            </div>
          </div>
        </section>

        {/* ===== Escroqueries au placement ===== */}
        <section id="investissement">
          <div className={styles.wrap}>
            <span className={styles.lbl}>hors régime des paiements</span>
            <h2>Escroqueries au placement et aux actifs numériques</h2>
            <p className={styles.lede}>{fr("Aucun régime de remboursement ne s'applique lorsque les fonds ont été virés volontairement vers un prétendu courtier. Le dossier ne s'arrête pas là : il change simplement de leviers, et ceux-ci sont au nombre de quatre.")}</p>

            <div className={styles.levers}>
              <div className={styles.lever}>
                <p className={styles.k}>01 — l'absence de titre</p>
                <div><h3>Le prestataire n'avait pas le droit d'exercer</h3><p>Inscription sur la liste noire de l'AMF ou de l'ACPR, absence d'agrément, défaut d'enregistrement pour les prestataires sur actifs numériques, aujourd'hui relayé par le régime européen. À quoi s'ajoutent, très souvent, un démarchage prohibé et une publicité interdite pour des contrats hautement spéculatifs. Cette irrégularité n'est pas un détail de conformité : elle nourrit la manœuvre frauduleuse et fonde la faute des intermédiaires qui ont laissé passer les flux.</p></div>
                <p className={styles.base}>art. 313-1 C. pén.<br />L. 341-1 et s. CMF<br />régime PSAN et MiCA</p>
              </div>
              <div className={styles.lever}>
                <p className={styles.k}>02 — la banque qui a exécuté</p>
                <div><h3>Le devoir de vigilance ne dépend pas du régime applicable</h3><p>Virements répétés vers un établissement de paiement étranger, rupture d'un contrat d'assurance-vie ou d'un plan d'épargne, crédit souscrit pour alimenter le compte, montants sans rapport avec l'historique, âge du titulaire. L'anomalie apparente s'apprécie sur la série, pas sur l'ordre isolé.</p></div>
                <p className={styles.base}>devoir de vigilance<br />anomalie apparente<br />art. 1231-1 C. civ.</p>
              </div>
              <div className={styles.lever}>
                <p className={styles.k}>03 — les intermédiaires de réception</p>
                <div><h3>Ceux qui ont ouvert les comptes d'arrivée</h3><p>Établissements de paiement, prestataires sur actifs numériques et comptes ouverts au nom de tiers. Leur responsabilité suppose une faute civile propre dans l'ouverture ou le fonctionnement du compte, que les éléments de vigilance aident à établir sans y suffire. C'est le levier le moins exploité, et souvent le seul solvable.</p></div>
                <p className={styles.base}>faute civile propre<br />art. 1240 C. civ.</p>
              </div>
              <div className={styles.lever}>
                <p className={styles.k}>04 — le traçage et la saisie</p>
                <div><h3>Suivre les fonds avant de discuter du droit</h3><p>Reconstitution des flux bancaires et, pour les actifs numériques, suivi des transferts jusqu'aux points de conversion. Ce travail conditionne l'identification des comptes assignables, la demande de gel et la saisie pénale. Il est conduit avec un intervenant technique aux côtés du cabinet.</p></div>
                <p className={styles.base}>art. 145 CPC<br />saisies pénales</p>
              </div>
            </div>
            {/* /ressources/escroquerie n'existe pas encore : texte rendu sans lien. */}
            <p className={styles.refs}>{fr("Lorsque le placement a été financé par un crédit souscrit à cette occasion, l'action contre le prêteur se conduit en parallèle et obéit à ses propres règles. C'est fréquemment la voie la plus rapide vers un résultat. Pour une présentation générale de l'infraction et de ses éléments constitutifs, voir la note escroquerie : définition, éléments constitutifs et peines.")}</p>
          </div>
        </section>

        {/* ===== Escroquerie ou atteinte au système ===== */}
        <section id="frontiere">
          <div className={styles.wrap}>
            <span className={styles.lbl}>la ligne de partage</span>
            <h2>Escroquerie ou atteinte au système</h2>
            <p className={styles.lede}>{fr("Une même affaire peut cumuler les deux qualifications, mais elles ne se plaident pas de la même façon et ne visent pas les mêmes défendeurs. Dans la première, la victime agit sous l'empire d'une tromperie. Dans la seconde, elle subit.")}</p>
            <table>
              <thead><tr><th></th><th>Escroquerie et fraude</th><th>Atteinte aux systèmes (STAD)</th></tr></thead>
              <tbody>
                <tr><td>textes</td><td>Art. 313-1 et 313-2 C. pén.</td><td>Art. 323-1 à 323-4 C. pén.</td></tr>
                <tr><td>objet</td><td>Le consentement de la victime</td><td>Le système et les données</td></tr>
                <tr><td>rôle de la victime</td><td>Elle accomplit elle-même l'acte préjudiciable</td><td>Elle n'y participe pas</td></tr>
                <tr><td>ce qui se démontre</td><td>La manœuvre, la remise, le lien entre les deux</td><td>Le contrôle d'accès, la conscience du maintien irrégulier</td></tr>
                <tr><td>le préjudice</td><td>Patrimonial, immédiat</td><td>Extraction et usage des données, sans mouvement de fonds nécessaire</td></tr>
                <tr><td>le recours utile</td><td>Action contre les établissements financiers</td><td>Notification, assurance, action contre l'auteur ou le prestataire</td></tr>
              </tbody>
            </table>
            <p className={styles.refs}>La chambre criminelle a retenu le maintien frauduleux dans un système de traitement automatisé de données et le vol de fichiers informatiques à l'encontre d'un prévenu qui, parvenu par une défaillance technique au cœur d'un extranet, s'y était maintenu après avoir constaté l'existence de contrôles d'accès, avait téléchargé des données inaccessibles au public, les avait fixées sur différents supports puis diffusées à des tiers (Crim. 20 mai 2015, n° 14-81.336, publié). Aucun de ces éléments n'est requis en matière d'escroquerie, où c'est la remise obtenue par tromperie qui fonde la poursuite. La compétence du cabinet en matière d'atteintes aux systèmes est traitée sur la page <Link href="/nos-domaines/cybercriminalite">cybercriminalité</Link>.</p>
          </div>
        </section>

        {/* ===== La séquence des premiers jours ===== */}
        <section id="urgence" className={styles.navy}>
          <div className={styles.wrap}>
            <span className={styles.lbl}>la séquence</span>
            <h2>Les premiers jours décident du dossier</h2>
            <p className={styles.lede}>Les fonds circulent en quelques heures, les preuves techniques s'effacent en quelques semaines, et la contestation se forclôt à treize mois.</p>
            <ol className={styles.steps}>
              <li><div><h3>Geler ce qui peut l'être</h3><p>Opposition, notification écrite à l'établissement, demande de rappel de fonds. La notification fait courir les obligations de la banque.</p></div></li>
              <li><div><h3>Figer la preuve</h3><p>Relevés, journaux d'authentification, messages, en-têtes de courriels, historique des appels. Ce qui n'est pas conservé dans les premières semaines ne sera pas reconstitué.</p></div></li>
              <li><div><h3>Contester par écrit, en droit</h3><p>Une contestation motivée sur le fondement applicable, et non une réclamation en ligne. Le refus de l'établissement devient alors une pièce du dossier.</p></div></li>
              <li><div><h3>Identifier le compte destinataire</h3><p>Une mesure d'instruction peut être sollicitée sur le fondement de l'article 145 du code de procédure civile, avant tout procès au fond. Son obtention se discute : motif légitime, nécessité, proportionnalité et secret bancaire.</p></div></li>
              <li><div><h3>Déposer une plainte documentée</h3><p>Un signalement en ligne n'est pas une plainte. La plainte est rédigée avec les pièces, la chronologie et les qualifications, et suivie jusqu'à sa réponse.</p></div></li>
              <li><div><h3>Engager l'action</h3><p>Mise en demeure motivée, puis assignation de l'établissement ou des établissements en cause, et constitution de partie civile lorsque l'enquête progresse.</p></div></li>
            </ol>
            <p className={styles.clock}>{fr("Treize mois à compter du débit : c'est le délai de l'article L. 133-24 du code monétaire et financier pour contester une opération non autorisée ou mal exécutée. Il ne régit pas les autres actions contre un établissement, mais c'est la première échéance à vérifier, et la seule qui se ferme aussi vite.")}</p>
          </div>
        </section>

        {/* ===== Ce que le cabinet produit ===== */}
        <section id="livrables">
          <div className={styles.wrap}>
            <span className={styles.lbl}>ce que le cabinet produit</span>
            <h2>Des actes, pas des étapes</h2>
            <div className={styles.deliv}>
              <div><h3>Note de recevabilité et de chiffrage</h3><p>Fondement applicable, délais restants, établissements assignables, ordre de grandeur du recouvrable et coût de l'action.</p></div>
              <div><h3>Contestation motivée en droit bancaire</h3><p>Adressée à l'établissement sur le fondement exact, avec les pièces, pour provoquer soit le remboursement, soit un refus utilisable.</p></div>
              <div><h3>Requête aux fins d'identification</h3><p>Sollicitée sur le fondement de l'article 145 du code de procédure civile, pour rechercher l'identité du titulaire du compte de réception avant l'action au fond.</p></div>
              <div><h3>Plainte et constitution de partie civile</h3><p>Rédigée avec les qualifications retenues, la chronologie et l'inventaire des pièces, puis suivie auprès du service saisi.</p></div>
              <div><h3>Assignation des établissements</h3><p>Contre la banque émettrice, la banque réceptrice, ou les deux, selon les manquements caractérisés.</p></div>
              <div><h3>Médiation bancaire et signalement au régulateur</h3><p>Saisine du médiateur lorsque cette voie présente un intérêt de calendrier ou de preuve, et signalement à l'ACPR si les pratiques constatées le justifient. Le régulateur ne tranche pas le litige et n'ordonne aucun remboursement : ces démarches ne retardent jamais l'action judiciaire.</p></div>
            </div>
          </div>
        </section>

        {/* ===== Dossiers ===== */}
        <section id="dossiers">
          <div className={styles.wrap}>
            <span className={styles.lbl}>situations dans lesquelles le cabinet est intervenu</span>
            <h2>Trois dossiers, trois fondements</h2>
            <div className={styles.cases}>
              <div className={styles.case}>
                <p className={styles.meta}>hameçonnage · opération non autorisée</p>
                <p>Dirigeante d'une société de services. Après un message reproduisant l'interface de sa banque, des virements sont exécutés depuis le compte professionnel vers des comptes de tiers. L'établissement oppose une négligence grave.</p>
                <p className={styles.stade}>Contestation fondée sur la charge de la preuve — procédure en cours</p>
              </div>
              <div className={styles.case}>
                <p className={styles.meta}>escroquerie à l'investissement · deux établissements</p>
                <p>Particulier retraité, sollicité sur plusieurs mois pour un placement présenté comme garanti. Les fonds partent vers des comptes ouverts dans deux établissements distincts, dont un hors métropole.</p>
                <p className={styles.stade}>Mises en demeure puis assignation des deux banques — procédure en cours</p>
              </div>
              <div className={styles.case}>
                <p className={styles.meta}>fausse vente en ligne · virement frauduleux</p>
                <p>Acheteur d'un véhicule annoncé sur une plateforme de petites annonces. Le virement est exécuté vers un compte ouvert au nom d'un tiers, dans un établissement en ligne.</p>
                <p className={styles.stade}>Assignation de la banque émettrice et de la banque réceptrice — procédure en cours</p>
              </div>
            </div>
            <p className={styles.refs}>Aucun résultat n'est annoncé tant qu'il n'est pas acquis. Les faits sont modifiés dans la mesure nécessaire à l'anonymat des parties.</p>
          </div>
        </section>

        {/* ===== FAQ (source unique = faq.ts, identique au JSON-LD) ===== */}
        <section id="faq">
          <div className={styles.wrap}>
            <span className={styles.lbl}>questions fréquentes</span>
            <h2>Ce qui est demandé le plus souvent</h2>
            <div className={styles.faqList}>
              {FAQ_ITEMS.map((it, i) => (
                <details key={it.q} open={i === 0}>
                  <summary>{it.q}</summary>
                  <p>{it.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Personnes mises en cause ===== */}
        <section id="defense">
          <div className={styles.wrap}>
            <span className={styles.lbl}>autre situation</span>
            <h2>Personnes mises en cause</h2>
            <div className={styles.aside}>
              <h3>La défense pénale est traitée séparément</h3>
              {/* La page /defense-penale n'existe pas encore : plutôt qu'un lien
                  mort, on renvoie vers le contact. */}
              <p>Audition libre, garde à vue, compte ayant servi de passage, complicité, recel, blanchiment, saisies pénales et confiscation : la défense d'une personne poursuivie pour escroquerie relève d'une autre page et d'un autre traitement. Elle n'est pas conduite depuis le point de vue exposé ici. <Link href="/contact">Décrire la situation</Link>.</p>
            </div>
          </div>
        </section>

        {/* ===== Équipe ===== */}
        <section id="equipe">
          <div className={styles.wrap}>
            <span className={styles.lbl}>qui traite le dossier</span>
            <h2>Le dossier est suivi par un avocat, pas par un service</h2>
            <p className={styles.lede}>{fr("Ces dossiers se jouent sur des pièces et une chronologie. Trois avocats les suivent, et le même interlocuteur tient le dossier d'un bout à l'autre, de la première contestation écrite jusqu'à l'audience.")}</p>
            <div className={styles.team}>
              <div>
                <figure>
                  <Image src="/images/alexandre-pro.jpg" alt="Alexandre Lazarègue, avocat au barreau de Paris" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                </figure>
                <div className={styles.teamBody}>
                  <p className={styles.role}>avocat au barreau de paris<br />fondateur</p>
                  <h3>Alexandre Lazarègue</h3>
                  <p>Droit du numérique. Conduit les recours contre les établissements financiers, l'action pénale et les mesures d'instruction destinées à identifier les comptes de réception.</p>
                </div>
              </div>
              <div>
                <figure>
                  <Image src="/images/amir-pro.jpg" alt="Amir Ben Majed, avocat au barreau de Paris" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                </figure>
                <div className={styles.teamBody}>
                  <p className={styles.role}>avocat au barreau de paris</p>
                  <h3>Amir Ben Majed</h3>
                  <p>Contentieux et procédure. Intervient sur les écritures, les mesures d'urgence et la conduite des instances devant les juridictions saisies.</p>
                </div>
              </div>
              <div>
                <figure>
                  <Image src="/images/sarah-pro.jpg" alt="Sarah Hinderer, avocate au barreau de Paris" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
                </figure>
                <div className={styles.teamBody}>
                  <p className={styles.role}>avocate au barreau de paris</p>
                  <h3>Sarah Hinderer</h3>
                  <p>Suit les dossiers de fraude bancaire et d'escroquerie, de la constitution du dossier de preuve au suivi des plaintes et du lien avec les services d'enquête.</p>
                </div>
              </div>
            </div>
            <p className={styles.refs}>Sur les dossiers où la reconstitution des flux ou l'analyse des journaux d'authentification est déterminante, le cabinet travaille avec un intervenant technique.</p>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section className={styles.cta} id="contact">
          <div className={styles.wrap}>
            <h2>Un dossier commence par une question de délai</h2>
            <p>La première chose à vérifier n'est pas le montant, mais la date du débit et la nature de l'ordre. Un premier échange suffit à savoir si un recours reste ouvert.</p>
            <Link className={styles.btn} href="/contact">décrire la situation</Link>
            <p className={styles.contact}>
              Lazarègue Avocats — 18 rue de Tilsitt, 75017 Paris<br />
              <a href="tel:+33181706200">01 81 70 62 00</a> · <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
