import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./article.module.css";
import ShareBar from "./_components/ShareBar";
import ModeleCourrier from "./_components/ModeleCourrier";
import ArticleFaq, { type QA } from "./_components/ArticleFaq";
import TocSpy from "./_components/TocSpy";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/ressources/fraude-bancaire-opposition-contestation-remboursement";
const COMPETENCE = "/nos-domaines/escroquerie-fraude-bancaire"; // route réelle (front matter corrigé)
const MAJ = "septembre 2026";
const LECTURE = "20 min de lecture"; // ~4 700 mots ÷ ~235 mots/min

const TITLE = "Fraude bancaire : opposition, contestation et remboursement | Lazarègue Avocats";
const DESCRIPTION =
  "Votre banque refuse de rembourser après une fraude ? Ce qu'elle doit prouver, ce que vous pouvez exiger, et comment préparer votre demande.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQ: QA[] = [
  { q: "J'ai moi-même effectué le virement. Ai-je encore un recours ?", a: "Oui. La loi exige un consentement à l'opération, pas un geste technique. Un virement obtenu par manœuvre, pour un objet fictif, peut être qualifié d'opération non autorisée. C'est aujourd'hui l'un des terrains les plus disputés du contentieux bancaire." },
  { q: "La banque m'oppose l'authentification forte. Est-ce décisif ?", a: "Non. L'article L. 133-23 dit expressément que l'usage enregistré de l'instrument ne suffit pas nécessairement à prouver l'autorisation, et l'Observatoire de la sécurité des moyens de paiement le rappelle dans les mêmes termes. Un refus fondé sur ce seul motif a été signalé au Sénat comme contraire à la loi." },
  { q: "La banque propose de rembourser la moitié. Est-ce normal ?", a: "Le régime ne connaît pas le partage. Une proposition transactionnelle reste possible, mais elle ne traduit pas l'état du droit : le remboursement est intégral ou nul." },
  { q: "Combien de temps pour agir ?", a: "Treize mois à compter du débit pour signaler l'opération. En pratique, il faut réagir en jours : la rapidité de la contestation est elle-même un élément d'appréciation, et le recall n'a de chances d'aboutir que dans les toutes premières heures." },
  { q: "Les banques cèdent-elles seulement devant un tribunal ?", a: "Le Sénat relevait en 2022 que les procédures engagées contre elles sont très fréquemment perdues par ces dernières, et que certaines semblent compter sur l'inaction de leurs clients. Un dossier se prépare donc comme s'il devait être jugé, même lorsqu'il se règle avant." },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Fraude bancaire : opposition, contestation et remboursement",
      description: DESCRIPTION,
      dateModified: "2026-09-01",
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
        { "@type": "ListItem", position: 4, name: "Fraude bancaire : opposition, contestation et remboursement", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const TOC = [
  { id: "s1", label: "1. Ce refus n'a rien d'un cas particulier" },
  { id: "s2", label: "2. Le principe : un remboursement immédiat" },
  { id: "s3", label: "3. Le vrai débat : « c'est vous qui avez validé l'opération »" },
  { id: "s4", label: "4. Ce que la banque doit prouver — et qu'elle produit rarement" },
  { id: "s5", label: "5. La négligence grave : comment les juges l'apprécient réellement" },
  { id: "s6", label: "6. Une disposition souvent oubliée : l'absence d'authentification forte" },
  { id: "s7", label: "7. Carte, virement, prélèvement : ce qui change" },
  { id: "s8", label: "8. L'autre porte : le devoir de vigilance de votre banque" },
  { id: "s9", label: "9. Les délais : ce qui ferme définitivement le dossier" },
  { id: "s10", label: "10. Ce qu'il faut faire, dans l'ordre" },
  { id: "s11", label: "11. Obtenir les preuves avant le procès" },
  { id: "s12", label: "12. Ce qui peut être demandé en justice" },
  { id: "preuve", label: "Qui doit prouver quoi" },
  { id: "faq", label: "Questions fréquentes" },
  { id: "loin", label: "Pour aller plus loin" },
];

function Jur({ head, faits, juge, href, linkText }: { head: string; faits: ReactNode; juge: ReactNode; href: string; linkText: string }) {
  const abonne = href.includes("doctrine.fr");
  return (
    <div className={styles.jur}>
      <p className={styles.jurHead}>{head}</p>
      <p className={styles.jlbl}>Les faits</p>
      <p className={styles.jtx}>{faits}</p>
      <p className={styles.jlbl}>Ce qui est jugé</p>
      <p className={styles.jtx}>{juge}</p>
      <p className={styles.jlink}>
        <a href={href} target="_blank" rel="noopener noreferrer">{linkText} ↗</a>
        {abonne ? " (accès abonné)" : null}
      </p>
    </div>
  );
}

function Texte({ art, cite, apres, href }: { art: string; cite: ReactNode; apres?: ReactNode; href: string }) {
  return (
    <div className={styles.box}>
      <span className={styles.label}>Ce que dit le texte</span>
      <p className={styles.boxTitle}>{art}</p>
      <p className={styles.tx}>{cite}</p>
      {apres ? <p className={styles.tx} style={{ marginTop: 8 }}>{apres}</p> : null}
      <p className={styles.boxLink}><a href={href} target="_blank" rel="noopener noreferrer">Lire l&apos;article sur Légifrance ↗</a></p>
    </div>
  );
}

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
            <span aria-current="page">Fraude bancaire</span>
          </nav>
          <p className={styles.kicker}>Fraudes et paiements · Note générale</p>
          <h1 id="h1">Fraude bancaire : opposition, contestation et remboursement</h1>
          <p className={styles.chapo}>
            Vous avez été victime d&apos;une fraude : un appel, un message, un site qui imitait celui que vous connaissiez, et de l&apos;argent est parti de votre compte. Vous avez prévenu votre banque et demandé le remboursement. Elle a refusé.
          </p>
          <div className={styles.byline}>
            <span className={styles.ava}>
              <Image src="/images/alexandre-pro.jpg" alt="Portrait d'Alexandre Lazarègue" fill sizes="48px" style={{ objectFit: "cover" }} />
            </span>
            <div>
              <p className={styles.bylineName}>Me Alexandre Lazarègue</p>
              <p className={styles.meta}>Avocat au Barreau de Paris</p>
            </div>
            <p className={`${styles.meta} ${styles.bylineDate}`}>Mis à jour en {MAJ} · {LECTURE}</p>
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

          {/* Introduction (trois paragraphes suivant le chapeau) */}
          <p>Le courrier de refus tient en général en dix lignes. Les opérations ont été « régulièrement authentifiées », aucune faute n&apos;est imputable à l&apos;établissement, le dossier est clos. Ce courrier n&apos;est pas une décision de justice, et il ne contient presque jamais les éléments que la loi impose précisément à la banque de produire pour refuser.</p>
          <p>Car la règle est l&apos;inverse de celle que la plupart des victimes croient : lorsqu&apos;une opération de paiement n&apos;a pas été autorisée, <strong>la banque devrait rembourser d&apos;abord et discuter ensuite</strong>. C&apos;est à elle de démontrer qu&apos;elle échappe à cette obligation, pas à vous de prouver que vous avez été piégé. Cette règle existe. Elle n&apos;est pas toujours appliquée — et les institutions elles-mêmes l&apos;ont constaté.</p>
          <p>Ce texte a pour objet de vous permettre de comprendre ce que la loi impose à votre banque, de situer votre propre situation dans ce cadre, et de préparer votre demande avec les bons arguments et les bonnes pièces. Il vaut pour la carte, le virement et le prélèvement. Chaque type de fraude — hameçonnage, faux conseiller, fraude au président, arnaque à l&apos;investissement — appelle ensuite une démonstration particulière, traitée séparément.</p>

          <div className={styles.brief}>
            <p className={styles.label}>En bref</p>
            <ul>
              <li>La banque doit rembourser une opération non autorisée au plus tard à la fin du premier jour ouvrable suivant son signalement (art. L. 133-18).</li>
              <li>C&apos;est à la banque de prouver l&apos;authentification et l&apos;absence de déficience technique, puis votre éventuelle négligence grave (art. L. 133-23).</li>
              <li>L&apos;authentification forte ne suffit pas, à elle seule, à prouver votre consentement.</li>
              <li>Treize mois pour contester, mais le recall se joue en heures.</li>
            </ul>
          </div>

          {/* ===== 1 ===== */}
          <h2 id="s1">1. Ce refus n&apos;a rien d&apos;un cas particulier</h2>
          <p>En avril 2021, l&apos;ACPR et la Banque de France ont publiquement demandé aux banques d&apos;améliorer le traitement des demandes de remboursement, en rappelant que la preuve de la négligence grave ou de la fraude du client pèse sur le seul établissement.</p>
          <p>En juillet 2022, la commission des finances du Sénat a consacré plusieurs pages au sujet. L&apos;UFC-Que Choisir avait analysé près de 4 300 signalements de refus de remboursement et estimait qu&apos;ils posaient tous problème ; une plainte avait été déposée contre douze établissements pour pratiques commerciales trompeuses. Le rapporteur relève que le motif le plus souvent invoqué est la négligence du client, très rarement prouvée, alors que la charge de cette preuve incombe à la banque, et que certains établissements refusent systématiquement dès qu&apos;une authentification renforcée a eu lieu — ce qui est contraire au texte. Il ajoute que les procédures engagées contre les banques sont très fréquemment perdues par ces dernières, et que celles qui persistent semblent compter sur l&apos;inaction de leurs clients.</p>
          <p>C&apos;est ce constat qui a conduit le législateur, en août 2022, à assortir l&apos;obligation de remboursement d&apos;intérêts majorés : il fallait rendre le refus plus coûteux que l&apos;exécution de la loi.</p>
          <p>Vous n&apos;êtes donc pas un plaideur isolé face à une pratique établie. Vous êtes un créancier face à une obligation légale dont le non-respect est identifié, mesuré et sanctionné.</p>

          {/* ===== 2 ===== */}
          <h2 id="s2">2. Le principe : un remboursement immédiat</h2>
          <Texte
            art="Article L. 133-18 du code monétaire et financier"
            cite="« En cas d'opération de paiement non autorisée signalée par l'utilisateur dans les conditions prévues à l'article L. 133-24, le prestataire de services de paiement du payeur rembourse au payeur le montant de l'opération non autorisée immédiatement après avoir pris connaissance de l'opération ou après en avoir été informé, et en tout état de cause au plus tard à la fin du premier jour ouvrable suivant […] »"
            apres="Le texte prévoit ensuite le rétablissement du compte dans l'état où il se serait trouvé, une date de valeur qui ne peut être postérieure à celle du débit, et des pénalités : intérêt au taux légal majoré de cinq points, de dix points au-delà de sept jours, de quinze points au-delà de trente jours."
            href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035430532/"
          />
          <div className={styles.prat}>
            <span className={styles.label}>En pratique</span>
            <p>Vous contestez par écrit le mardi. La banque doit vous rembourser au plus tard le mercredi soir. Si elle ne le fait pas et que le tribunal juge un an plus tard que l&apos;opération n&apos;était pas autorisée, elle ne doit pas seulement les sommes débitées : elle doit aussi, pour 20 000 euros contestés et un retard supérieur à trente jours, les intérêts au taux légal majoré de quinze points sur toute la période.</p>
          </div>
          <p>Le seul report prévu par la loi est étroit : la banque doit avoir de bonnes raisons de soupçonner une fraude de votre part, et elle doit communiquer ces raisons par écrit à la Banque de France. L&apos;« étude du dossier par le service fraude » qui s&apos;étire sur six semaines n&apos;a aucun fondement dans le texte.</p>

          {/* ===== 3 ===== */}
          <h2 id="s3">3. Le vrai débat : « c&apos;est vous qui avez validé l&apos;opération »</h2>
          <p>C&apos;est l&apos;argument central des banques, et celui qui décourage le plus de victimes. Il est pourtant fragile.</p>
          <p>Une opération n&apos;est autorisée que si vous y avez consenti, dans les formes convenues avec votre banque, sur un montant et un bénéficiaire déterminés (articles L. 133-6 et L. 133-7). Ce que la loi exige, c&apos;est un consentement — pas la trace d&apos;un code saisi.</p>
          <p>L&apos;Observatoire de la sécurité des moyens de paiement, présidé par le gouverneur de la Banque de France, l&apos;a écrit en mai 2023 : lorsqu&apos;une opération contestée a fait l&apos;objet d&apos;une authentification forte, la banque doit encore analyser si elle peut être regardée comme autorisée, au vu de son origine, des paramètres de l&apos;authentification et des interactions avec le payeur. L&apos;authentification forte ne suffit pas, en elle-même, à considérer l&apos;opération comme autorisée. Faute d&apos;éléments suffisants, l&apos;établissement doit rembourser sans délai.</p>
          <Jur
            head="Tribunal judiciaire de Lyon, 13 janvier 2026, n° 23/05455"
            faits="Une cliente est appelée depuis le numéro du service client de sa banque en ligne. Un faux conseiller la guide ; elle reçoit, pendant la conversation, des courriels de validation de bénéficiaires rédigés en termes ambigus. 13 638,77 euros partent."
            juge="L'usage de l'authentification forte ne permet pas de présumer le consentement lorsque l'opération est initiée par un tiers et que le client valide en croyant s'y opposer. La banque ne prouve ni l'absence de déficience technique, ni la négligence grave. Remboursement intégral."
            href="https://www.doctrine.fr/d/TJ/Lyon/2026/TJP88B07EFB28F0B0599934"
            linkText="Lire la décision"
          />
          <Jur
            head="Cour d'appel de Toulouse, 6 janvier 2026, n° 23/04208"
            faits="La veille de Noël, un client est appelé depuis le numéro du service d'opposition de sa banque. L'interlocuteur lui explique qu'il annule des opérations suspectes et lui fait valider des codes. 10 250 euros de virements."
            juge="Le consentement est vicié par l'escroquerie : les virements sont des opérations non autorisées. La mise en confiance, la rapidité de la manœuvre et l'usurpation du numéro excluent la négligence grave. Remboursement intégral."
            href="https://www.doctrine.fr/d/CA/Toulouse/2026/CAPF28409CCA477B8A8F2BC"
            linkText="Lire la décision"
          />
          <p>La même logique vaut lorsque les virements ont été passés par vous, sous la conduite d&apos;un tiers présenté comme conseiller, coach ou agent de sécurité. La question posée au juge n&apos;est pas « qui a cliqué », mais « le client a-t-il consenti à cette opération-là, en connaissance de son objet réel ».</p>

          {/* ===== 4 ===== */}
          <h2 id="s4">4. Ce que la banque doit prouver — et qu&apos;elle produit rarement</h2>
          <Texte
            art="Article L. 133-23 du code monétaire et financier"
            cite="« Lorsqu'un utilisateur de services de paiement nie avoir autorisé une opération de paiement qui a été exécutée […] il incombe à son prestataire de services de paiement de prouver que l'opération en question a été authentifiée, dûment enregistrée et comptabilisée et qu'elle n'a pas été affectée par une déficience technique ou autre."
            apres="L'utilisation de l'instrument de paiement telle qu'enregistrée par le prestataire de services de paiement ne suffit pas nécessairement en tant que telle à prouver que l'opération a été autorisée par le payeur ou que celui-ci n'a pas satisfait intentionnellement ou par négligence grave aux obligations lui incombant en la matière. »"
            href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035430567"
          />
          <div className={styles.vig}>
            <span className={styles.label}>Point de vigilance</span>
            <p>C&apos;est le texte le plus important de tout le dossier, et celui que les courriers de refus ignorent le plus souvent. La deuxième phrase condamne à elle seule le refus fondé sur le seul constat qu&apos;une authentification a eu lieu.</p>
          </div>
          <p>La Cour de cassation a fixé l&apos;ordre du raisonnement : la banque doit <strong>d&apos;abord</strong> démontrer la régularité technique de l&apos;opération ; la discussion sur votre comportement ne vient qu&apos;ensuite.</p>
          <Jur
            head="Cour de cassation, chambre commerciale, 12 novembre 2020, n° 19-12.112"
            faits="Une cliente reçoit deux codes à six chiffres destinés à valider des paiements sur internet qu'elle n'a pas réalisés. La banque lui oppose sa négligence. Pour prouver la régularité de l'opération, elle produit un tableau chronologique quasi illisible."
            juge="Avant même de discuter la négligence grave, la banque doit prouver que l'opération a été authentifiée, enregistrée, comptabilisée, et qu'aucune déficience technique n'est intervenue. Preuve non rapportée : la banque rembourse."
            href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000042551889"
            linkText="Lire l'arrêt sur Légifrance"
          />
          <Jur
            head="Cour de cassation, chambre commerciale, 20 novembre 2024, n° 23-15.099"
            faits="Un client avait remis ses moyens de paiement et ses codes à une personne rencontrée en ligne. Les juges du fond avaient retenu la négligence grave et débouté le client."
            juge="Cassation : les juges ne pouvaient retenir la négligence grave sans avoir d'abord vérifié que la banque établissait la régularité technique de l'opération. L'ordre des démonstrations n'est pas facultatif."
            href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000050704007"
            linkText="Lire l'arrêt sur Légifrance"
          />
          <p>C&apos;est là que se gagnent ou se perdent les dossiers. Sommée de produire ses journaux techniques, une banque en est parfois incapable.</p>
          <Jur
            head="Tribunal judiciaire de Paris, 20 février 2026, n° 25/02965"
            faits="Une carte est utilisée frauduleusement après avoir été soustraite à un client en établissement de soins."
            juge="La banque ne démontre ni que son dispositif de validation a été requis et obtenu, ni que les opérations n'ont pas été affectées par une défaillance technique. Elle est condamnée à rembourser sans que le tribunal ait besoin d'examiner le comportement du client, et à verser 500 euros de dommages-intérêts."
            href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPCF059EB99257620E9366"
            linkText="Lire la décision"
          />
          <p>À l&apos;inverse, lorsqu&apos;une banque verse aux débats des journaux d&apos;authentification complets, elle franchit cette première étape et le débat se déplace effectivement sur le comportement du payeur (tribunal de commerce de Paris, 7 juillet 2026, n° 2025022908 — <a href="https://www.doctrine.fr/d/TCOM/Paris/2026/TCOMP4A9377276CC57CE6F721" target="_blank" rel="noopener noreferrer">lire la décision</a> (accès abonné)).</p>

          <div className={styles.midcta}>
            <div>
              <p className={styles.midctaTitle}>Votre banque refuse le remboursement&nbsp;?</p>
              <p className={styles.tx}>Votre dossier se joue sur des pièces techniques et une chronologie précise. Le cabinet examine l&apos;autorisation des opérations, la charge de la preuve et les arguments opposés par l&apos;établissement.</p>
              <p className={styles.midctaLink}><Link href={COMPETENCE}>Voir les recours du cabinet contre les banques →</Link></p>
            </div>
            <Link className={styles.btnO} href="/contact">Faire examiner votre dossier</Link>
          </div>

          {/* ===== 5 ===== */}
          <h2 id="s5">5. La négligence grave : comment les juges l&apos;apprécient réellement</h2>
          <Texte
            art="Article L. 133-19, IV du code monétaire et financier"
            cite="Le payeur supporte toutes les pertes si elles résultent d'un agissement frauduleux de sa part, ou s'il n'a pas satisfait intentionnellement ou par négligence grave à ses obligations de sécurité et d'information (articles L. 133-16 et L. 133-17)."
            href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035430527"
          />
          <p>La loi ne définit pas la négligence grave. Ce sont les juges qui la dessinent, dossier par dossier, en comparant votre comportement à celui d&apos;un utilisateur normalement attentif <strong>placé dans la même situation</strong>. Deux enseignements ressortent de la jurisprudence récente.</p>
          <div className={styles.compare}>
            <div>
              <p className={styles.cmpH}>Ce qui est généralement jugé grave</p>
              <p>Le point commun de ces dossiers est un geste actif du client, hors de toute urgence créée par le fraudeur : communiquer l&apos;intégralité de ses données de sécurité en réponse à un message qui comportait des anomalies visibles, ou se dessaisir matériellement de sa carte. Ainsi, une cliente appelée par un faux conseiller augmente les plafonds de sa carte, prépare des virements et remet sa carte à un coursier sans vérifier la qualité de son interlocuteur : la remise de la carte est analysée comme un manquement grave à ses obligations de sécurité (TJ Paris, 18 février 2026, n° 25/02206 — <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPE0EBF96BA6C69455EAD5" target="_blank" rel="noopener noreferrer">lire la décision</a> (accès abonné)). De même, une cliente qui clique sur un SMS frauduleux, transmet ses identifiants et son code d&apos;activation, permet ainsi l&apos;installation du dispositif de sécurité sur le téléphone du fraudeur et ne réagit que plusieurs semaines plus tard (CA Paris, 21 janvier 2026, n° 24/10530 — <a href="https://www.doctrine.fr/d/CA/Paris/2026/CAPE346074CBE8EF5D5270D" target="_blank" rel="noopener noreferrer">lire la décision</a> (accès abonné)).</p>
            </div>
            <div>
              <p className={styles.cmpH}>Ce qui n&apos;est pas jugé grave</p>
              <p>Dès que le montage est sophistiqué, que le numéro de la banque s&apos;affiche à l&apos;écran ou que la victime est mise sous pression, la négligence grave est écartée — y compris lorsque le juge constate une négligence.</p>
            </div>
          </div>
          <Jur
            head="Cour de cassation, chambre commerciale, 23 octobre 2024, n° 23-16.267"
            faits="Un client est appelé par une personne se présentant comme un préposé de sa banque, dont le numéro s'affiche réellement sur son téléphone. Il supprime puis réinscrit des bénéficiaires de virements, en croyant se protéger d'un piratage."
            juge="Aucune négligence grave. La Cour retient que le procédé a mis le client en confiance et diminué sa vigilance, moindre face à un appel téléphonique que face à un courriel, qu'il aurait pu examiner à tête reposée. La banque rembourse."
            href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000050442874/"
            linkText="Lire l'arrêt sur Légifrance"
          />
          <Jur
            head="Tribunal judiciaire de Paris, 20 février 2026, n° 24/05912"
            faits="Fraude en deux temps : un SMS de type « amende Crit'Air », puis l'appel d'un faux agent de la répression des fraudes. Le client, aux revenus modestes, communique ses coordonnées et ses codes. 8 100 euros."
            juge="Le tribunal constate une négligence, mais la juge non grave au regard de la sophistication du montage et de la pression exercée. Remboursement intégral."
            href="https://www.doctrine.fr/d/TJ/Paris/2026/TJP7E76BC753347BB9A898E"
            linkText="Lire la décision"
          />
          <Jur
            head="Tribunal judiciaire de Paris, 8 janvier 2026, n° 25/00594"
            faits="Un client de 70 ans est visé par une escroquerie par SMS puis par la remise de sa carte à un faux coursier, en 2022, alors que ce mode opératoire était encore peu connu."
            juge="Les négligences sont réelles — absence de vérification, remise de la carte — mais non graves compte tenu de l'âge du client et de la nouveauté du procédé. Remboursement de 5 156 euros."
            href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPEF87860902E6D9D0D961"
            linkText="Lire la décision"
          />
          <h3>Deux règles à connaître avant toute discussion avec votre banque</h3>
          <div className={styles.vig}>
            <span className={styles.label}>Point de vigilance</span>
            <p><strong>Il n&apos;y a pas de partage.</strong> Le régime ignore le demi-remboursement : soit la négligence grave est établie et rien n&apos;est dû, soit elle ne l&apos;est pas et le remboursement est intégral. Une proposition de « geste commercial » à 50 % ne traduit donc pas l&apos;état du droit (Cass. com., 1er juillet 2020, n° 18-21.487 — <a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000042113135/" target="_blank" rel="noopener noreferrer">lire l&apos;arrêt</a>).</p>
          </div>
          <div className={styles.vig}>
            <span className={styles.label}>Point de vigilance</span>
            <p><strong>Votre bonne foi n&apos;entre pas en compte.</strong> Le même arrêt juge que la négligence grave s&apos;apprécie indépendamment de toute appréciation de la bonne foi. Être une victime sincère ne suffit pas à obtenir le remboursement ; à l&apos;inverse, aucun reproche moral ne peut tenir lieu de démonstration de la part de la banque.</p>
          </div>

          {/* ===== 6 ===== */}
          <h2 id="s6">6. Une disposition souvent oubliée : l&apos;absence d&apos;authentification forte</h2>
          <p>Depuis 2019, votre banque doit exiger une authentification forte pour l&apos;accès au compte en ligne, l&apos;initiation d&apos;un paiement électronique et toute opération à distance présentant un risque de fraude (article L. 133-44). L&apos;authentification forte repose sur au moins deux éléments parmi trois catégories : quelque chose que vous connaissez (un mot de passe), quelque chose que vous possédez (votre téléphone), quelque chose que vous êtes (une empreinte).</p>
          <p>Lorsque l&apos;opération litigieuse a été exécutée <strong>sans</strong> que cette authentification forte ait été exigée, l&apos;article L. 133-19, V, est catégorique : vous ne supportez aucune conséquence financière, sauf si vous avez vous-même agi frauduleusement. Aucune discussion sur votre vigilance n&apos;est alors nécessaire — votre comportement devient juridiquement indifférent. L&apos;Observatoire de la sécurité des moyens de paiement en tire la même conséquence : à défaut d&apos;authentification forte, l&apos;opération contestée est remboursée sans délai.</p>
          <div className={styles.vig}>
            <span className={styles.label}>Point de vigilance</span>
            <p><strong>Ce qu&apos;il faut vérifier.</strong> Avez-vous reçu une demande de validation sur votre application bancaire ou par un second canal pour chacune des opérations contestées ? Si certaines sont passées sans validation, ou si la banque ne parvient pas à démontrer laquelle a été validée et quand, ce point doit être soulevé avant même le récit de la fraude.</p>
          </div>

          {/* ===== 7 ===== */}
          <h2 id="s7">7. Carte, virement, prélèvement : ce qui change</h2>
          <p><strong>La carte.</strong> Avant votre opposition, les pertes restent à votre charge dans la limite de 50 euros (article L. 133-19, I). Ce plafond tombe lorsque la perte n&apos;était pas détectable, lorsqu&apos;elle résulte d&apos;un salarié de la banque, ou en cas de contrefaçon ou de détournement à votre insu. Après l&apos;opposition, plus rien ne peut vous être imputé. Le paiement sans contact obéit à un régime allégé, mais la Cour de justice a jugé qu&apos;une banque ne peut invoquer l&apos;impossibilité technique de bloquer un instrument sans l&apos;établir (CJUE, 11 novembre 2020, DenizBank, C-287/19 — <a href="https://www.doctrine.fr/d/CJUE/2020/CJUE62019CJ0287" target="_blank" rel="noopener noreferrer">lire l&apos;arrêt</a> (accès abonné)).</p>
          <p><strong>Le virement.</strong> Aucun plafond ne joue : soit l&apos;opération est non autorisée et le remboursement est intégral, soit la négligence grave est démontrée et rien n&apos;est dû. Le débat porte sur l&apos;enregistrement du bénéficiaire, sur les messages de validation reçus et leur formulation exacte, et sur la chronologie.</p>
          <p><strong>Le prélèvement.</strong> Un prélèvement que vous n&apos;avez jamais autorisé — mandat inexistant ou falsifié — relève du même régime : contestation, puis remboursement à la charge de la banque, qui doit prouver l&apos;existence de votre autorisation.</p>
          <h3>La banque du bénéficiaire : l&apos;autre établissement à mettre en cause</h3>
          <p>Les fonds ne disparaissent pas dans le vide. Ils arrivent sur un compte, ouvert dans une banque française ou étrangère, souvent auprès d&apos;un établissement de paiement ou de monnaie électronique. Deux réflexes en découlent.</p>
          <p><strong>Demander le recall immédiatement.</strong> Le recall est la demande de retour de fonds que votre banque adresse à celle du bénéficiaire. Son efficacité se compte en heures : les comptes receveurs sont vidés très vite. Demandez-le par écrit, dès le premier contact, et conservez la trace de votre demande comme de la réponse. L&apos;inertie de la banque sur ce point, lorsqu&apos;elle est établie, est en elle-même un manquement discutable devant un juge.</p>
          <p><strong>Mettre en cause la banque réceptrice.</strong> Elle est tenue de connaître son propre client et d&apos;exercer une vigilance constante sur ses opérations, au titre de la lutte contre le blanchiment (articles L. 561-5 et L. 561-6). Un compte récemment ouvert qui reçoit en quelques jours des virements de plusieurs particuliers sans rapport avec l&apos;activité déclarée, puis les réexpédie aussitôt vers l&apos;étranger ou vers des crypto-actifs, présente des anomalies que cet établissement ne peut ignorer. Sa responsabilité peut être recherchée sur le fondement de l&apos;article 1240 du code civil, y compris par une victime qui n&apos;est pas sa cliente. Cette voie suppose d&apos;identifier rapidement l&apos;établissement destinataire : l&apos;IBAN figurant sur vos relevés suffit à le faire.</p>

          {/* ===== 8 ===== */}
          <h2 id="s8">8. L&apos;autre porte : le devoir de vigilance de votre banque</h2>
          <p>Les deux fondements ne se cumulent pas librement. Lorsque l&apos;opération est non autorisée, le régime des articles L. 133-18 et suivants s&apos;applique seul, et il n&apos;est pas possible de lui substituer le reproche d&apos;un manque de vigilance (Cass. com., 27 mars 2024, n° 22-21.200 ; 2 mai 2024, n° 22-18.074). L&apos;ordre est donc imposé : remboursement légal à titre principal, défaut de vigilance à titre subsidiaire.</p>
          <p>Cette seconde voie retrouve toute sa place lorsque l&apos;opération doit être regardée comme autorisée — typiquement, la longue série de virements consentis sous emprise, dans une arnaque à l&apos;investissement. La banque n&apos;a pas à s&apos;immiscer dans vos affaires, mais elle doit détecter ce qui, au regard de ce qu&apos;elle sait de vous, n&apos;a manifestement aucun sens.</p>
          <p>Les juridictions du fond retiennent notamment, comme éléments déclencheurs d&apos;une obligation d&apos;alerte :</p>
          <ul className={styles.bullets}>
            <li><strong>le profil connu du client</strong> : revenus modestes, compte peu actif, solde habituellement faible ;</li>
            <li><strong>le rythme</strong> : plusieurs virements en quelques jours ou quelques semaines, alors que le compte n&apos;en émettait pas ;</li>
            <li><strong>les montants</strong> : progression rapide, sans commune mesure avec l&apos;historique ;</li>
            <li><strong>la destination</strong> : IBAN étrangers, bénéficiaires nouveaux, établissements de paiement inconnus du client ;</li>
            <li><strong>l&apos;origine des fonds</strong> : déblocage d&apos;épargne, prêt familial, crédit à la consommation, aussitôt réexpédiés.</li>
          </ul>
          <p>Un compte dont le solde n&apos;avait jamais dépassé quelques dizaines d&apos;euros et qui envoie, en trois mois, plusieurs dizaines de milliers d&apos;euros vers des prestataires de paiement étrangers, sans qu&apos;aucun appel, blocage temporaire ou demande de justificatif n&apos;intervienne, relève exactement de ce contentieux. Plusieurs décisions de fond ont retenu la responsabilité de la banque dans des configurations de ce type : TJ Nanterre, 27 octobre 2023, n° 22-10660 ; TJ Bordeaux, 11 juillet 2024, n° 22-04859 ; TJ Créteil, 21 janvier 2025, n° 23-00027 ; CA Paris, 14 décembre 2022, n° 21-03996.</p>

          {/* ===== 9 ===== */}
          <h2 id="s9">9. Les délais : ce qui ferme définitivement le dossier</h2>
          <p><strong>Prévenir sans tarder.</strong> Dès la découverte de la fraude, prévenez votre banque pour faire bloquer l&apos;instrument (article L. 133-17). Après cette information, plus aucune opération ne peut vous être imputée, sauf fraude de votre part (article L. 133-20). La rapidité de votre réaction pèsera ensuite sur l&apos;appréciation de votre vigilance : dans un dossier jugé en février 2026, le tribunal a relevé que le client avait appelé le jour même et déposé plainte le lendemain.</p>
          <p><strong>Treize mois, pas un jour de plus.</strong> Les opérations non autorisées doivent être signalées dans les treize mois de la date de débit (article L. 133-24). Passé ce délai, plus rien n&apos;est possible, y compris sur le fondement du droit commun (Cass. com., 2 mai 2024, n° 22-18.074).</p>

          {/* ===== 10 ===== */}
          <h2 id="s10">10. Ce qu&apos;il faut faire, dans l&apos;ordre</h2>
          <ol className={styles.steps}>
            <li><strong>Faire opposition et bloquer</strong> l&apos;instrument de paiement, par tout moyen laissant une trace écrite.</li>
            <li><strong>Demander le recall par écrit</strong>, en identifiant les IBAN destinataires figurant sur vos relevés.</li>
            <li><strong>Contester par écrit</strong>, en visant les opérations une à une — date, montant, bénéficiaire — et en indiquant qu&apos;elles n&apos;ont pas été autorisées au sens des articles L. 133-6 et L. 133-7.</li>
            <li><strong>Déposer plainte.</strong> La plainte est une pièce utile ; elle n&apos;oblige pas à attendre l&apos;issue de la procédure pénale pour agir contre la banque, ni à ce que l&apos;auteur de la fraude soit identifié.</li>
            <li><strong>Réunir et figer les pièces</strong> : relevés, messages échangés avec le fraudeur, captures d&apos;écran des interfaces, courrier de refus. Ces éléments disparaissent vite.</li>
            <li><strong>Demander vos données à la banque</strong> (voir le modèle ci-dessous) : c&apos;est le moyen d&apos;obtenir les journaux techniques avant tout procès.</li>
            <li><strong>Mettre en demeure</strong> l&apos;établissement par lettre recommandée, en lui demandant expressément de produire les éléments exigés par l&apos;article L. 133-23.</li>
            <li><strong>Saisir le tribunal</strong> si le refus persiste.</li>
          </ol>

          {/* ===== 11 ===== */}
          <h2 id="s11">11. Obtenir les preuves avant le procès : le courrier de droit d&apos;accès</h2>
          <p>La banque détient tout ce qui permet de trancher le litige : journaux d&apos;authentification, adresses IP, horodatage des validations, enregistrements des appels passés à son service client, traces des alertes internes. Vous n&apos;avez pas à attendre une procédure pour les demander. L&apos;article 15 du RGPD vous donne un droit d&apos;accès aux données personnelles vous concernant, que la banque doit exercer dans un délai d&apos;un mois.</p>
          <p>L&apos;intérêt est double : ce que la banque communique nourrit votre dossier, et ce qu&apos;elle ne communique pas se commente utilement devant un juge — en particulier lorsqu&apos;elle prétend par ailleurs détenir la preuve d&apos;une authentification régulière.</p>
          <ModeleCourrier />

          {/* ===== 12 ===== */}
          <h2 id="s12">12. Ce qui peut être demandé en justice</h2>
          <ul className={styles.bullets}>
            <li>le remboursement intégral des opérations contestées, avec rétablissement du compte ;</li>
            <li>les intérêts au taux légal majoré de 5, 10 puis 15 points selon la durée du retard ;</li>
            <li>des dommages-intérêts au titre du préjudice moral, accordés avec mesure mais régulièrement retenus lorsque le refus est dépourvu de fondement sérieux ;</li>
            <li>une indemnité au titre des frais d&apos;avocat (article 700 du code de procédure civile) et les dépens.</li>
          </ul>

          {/* ===== Qui doit prouver quoi ===== */}
          <h2 id="preuve">Qui doit prouver quoi</h2>
          <table className={styles.voies}>
            <thead>
              <tr><th scope="col"><span className={styles.srOnly}>Étape</span></th><th scope="col">Vous</th><th scope="col">La banque</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row" data-l="Étape">À la découverte</th><td data-l="Vous">Informer sans tarder, contester dans les treize mois</td><td data-l="La banque">Bloquer l&apos;instrument, transmettre le recall, fournir des moyens d&apos;alerte accessibles</td></tr>
              <tr><th scope="row" data-l="Étape">Sur l&apos;autorisation</th><td data-l="Vous">Contester ; vous n&apos;avez pas à prouver la fraude</td><td data-l="La banque">Prouver l&apos;authentification, l&apos;enregistrement, l&apos;absence de déficience technique</td></tr>
              <tr><th scope="row" data-l="Étape">Sur votre comportement</th><td data-l="Vous">—</td><td data-l="La banque">Prouver votre fraude ou votre négligence grave</td></tr>
              <tr><th scope="row" data-l="Étape">Sur le remboursement</th><td data-l="Vous">—</td><td data-l="La banque">Rembourser immédiatement, à défaut supporter les intérêts majorés</td></tr>
            </tbody>
          </table>

          {/* ===== FAQ ===== */}
          <h2 id="faq">Questions fréquentes</h2>
          <ArticleFaq items={FAQ} />

          {/* ===== Un cas traité par le cabinet ===== */}
          <h2>Un cas traité par le cabinet</h2>
          <div className={styles.cascab}>
            <article>
              <p className={styles.tag}>Cas client 02</p>
              <h3>Virements frauduleux vers des plateformes de crypto-actifs</h3>
              <p className={styles.tx}>Mise en cause de la banque émettrice et de la banque réceptrice après une série de virements vers des prestataires étrangers.</p>
              <Link className={styles.go} href={COMPETENCE}>Voir les dossiers du cabinet →</Link>
            </article>
            <article>
              <p className={styles.tag}>Cas client 08</p>
              <h3>Escroquerie en ligne : paiements par carte et virement</h3>
              <p className={styles.tx}>Contestation des opérations et de la négligence grave invoquée par l&apos;établissement.</p>
              <Link className={styles.go} href={COMPETENCE}>Voir les dossiers du cabinet →</Link>
            </article>
          </div>

          {/* ===== Pour aller plus loin ===== */}
          <h2 id="loin">Pour aller plus loin</h2>
          <p>Chaque scénario appelle une démonstration propre : hameçonnage, virement frauduleux, faux conseiller bancaire, fraude au président et changement de coordonnées bancaires, usurpation d&apos;identité, litige avec une plateforme de crypto-actifs.</p>
          <div className={styles.more}>
            <article>
              <p className={styles.tag}>Faux conseiller bancaire</p>
              <h3><Link href="/ressources/faux-conseiller-bancaire-remboursement">Faux conseiller bancaire : dans quels cas la banque doit-elle rembourser ?</Link></h3>
            </article>
          </div>
          <p style={{ marginTop: 18 }}>Une voie encore peu exploitée mérite d&apos;être signalée : la responsabilité de l&apos;opérateur téléphonique. Saisi d&apos;une fraude reposant sur l&apos;usurpation du numéro de la banque, le tribunal judiciaire de Paris a jugé que l&apos;opérateur devait authentifier les identifiants d&apos;appelant et interrompre l&apos;acheminement des appels non authentiques, et l&apos;a condamné à garantir la banque de sa propre condamnation (TJ Paris, 15 janvier 2026, n° 24/04856 — <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPE9AEC6538CF1CABF0203" target="_blank" rel="noopener noreferrer">lire la décision</a> (accès abonné)).</p>

          {/* ===== Clôture ===== */}
          <div className={styles.closing}>
            Reste une question que cet article ne tranche pas : <strong>votre dossier entre-t-il dans ce cadre, et sur quel fondement ?</strong> Elle se décide sur pièces — relevés, chronologie des échanges, termes exacts du refus. → <Link href={COMPETENCE}>Faire examiner votre dossier de fraude bancaire</Link>
          </div>

          {/* ===== Sources ===== */}
          <div className={styles.sources}>
            <p className={styles.label}>Sources et mise à jour</p>
            <p className={styles.srcgrp}><b>Textes.</b> Code monétaire et financier, articles <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035430532/" target="_blank" rel="noopener noreferrer">L. 133-18</a>, <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035430527" target="_blank" rel="noopener noreferrer">L. 133-19</a>, <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035430567" target="_blank" rel="noopener noreferrer">L. 133-23</a>, ainsi que L. 133-6, L. 133-7, L. 133-16, L. 133-17, L. 133-20, L. 133-24, L. 133-44, L. 311-1, L. 561-5, L. 561-6 et D. 312-1-1 (<a href="https://www.legifrance.gouv.fr/codes/id/LEGISCTA000020861577" target="_blank" rel="noopener noreferrer">section 8 du code</a>) ; code civil, article 1240 ; code des postes et des communications électroniques, article L. 44, IV ; code de procédure civile, articles 696 et 700 ; règlement (UE) 2016/679, article 15 ; directive (UE) 2015/2366 ; ordonnance n° 2017-1252 du 9 août 2017 ; loi n° 2022-1158 du 16 août 2022.</p>
            <p className={styles.srcgrp}><b>Sources institutionnelles.</b> Observatoire de la sécurité des moyens de paiement, communiqué du 16 mai 2023 (treize recommandations sur le remboursement des victimes de fraude) ; ACPR et Banque de France, communiqué du 26 avril 2021 ; Sénat, commission des finances, avis n° 822 (2021-2022) du 25 juillet 2022.</p>
            <p className={styles.srcgrp}><b>Jurisprudence.</b> Cass. com., <a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000050442874/" target="_blank" rel="noopener noreferrer">23 octobre 2024, n° 23-16.267</a> ; <a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000050704007" target="_blank" rel="noopener noreferrer">20 novembre 2024, n° 23-15.099</a> ; <a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000042551889" target="_blank" rel="noopener noreferrer">12 novembre 2020, n° 19-12.112</a> ; <a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000042113135/" target="_blank" rel="noopener noreferrer">1er juillet 2020, n° 18-21.487</a> ; 18 janvier 2017, n° 15-18.102 ; 27 mars 2024, n° 22-21.200 ; 2 mai 2024, n° 22-18.074 ; 2 mai 2024, n° 22-18.454 ; 30 avril 2025, n° 24-10.149. CJUE, <a href="https://www.doctrine.fr/d/CJUE/2020/CJUE62019CJ0287" target="_blank" rel="noopener noreferrer">11 novembre 2020, C-287/19</a> ; 2 septembre 2021, C-337/20. <a href="https://www.doctrine.fr/d/CA/Paris/2026/CAPE346074CBE8EF5D5270D" target="_blank" rel="noopener noreferrer">CA Paris, 21 janvier 2026, n° 24/10530</a> ; <a href="https://www.doctrine.fr/d/CA/Toulouse/2026/CAPF28409CCA477B8A8F2BC" target="_blank" rel="noopener noreferrer">CA Toulouse, 6 janvier 2026, n° 23/04208</a> ; <a href="https://www.doctrine.fr/d/TJ/Lyon/2026/TJP88B07EFB28F0B0599934" target="_blank" rel="noopener noreferrer">TJ Lyon, 13 janvier 2026, n° 23/05455</a> ; <a href="https://www.doctrine.fr/d/TJ/Paris/2025/TJP6334C7B98E24C140BF83" target="_blank" rel="noopener noreferrer">TJ Paris, 14 octobre 2025, n° 24/08524</a> ; <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPEF87860902E6D9D0D961" target="_blank" rel="noopener noreferrer">8 janvier 2026, n° 25/00594</a> ; <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPE9AEC6538CF1CABF0203" target="_blank" rel="noopener noreferrer">15 janvier 2026, n° 24/04856</a> ; <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPE0EBF96BA6C69455EAD5" target="_blank" rel="noopener noreferrer">18 février 2026, n° 25/02206</a> ; <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJP7E76BC753347BB9A898E" target="_blank" rel="noopener noreferrer">20 février 2026, n° 24/05912</a> ; <a href="https://www.doctrine.fr/d/TJ/Paris/2026/TJPCF059EB99257620E9366" target="_blank" rel="noopener noreferrer">20 février 2026, n° 25/02965</a> ; <a href="https://www.doctrine.fr/d/TCOM/Paris/2026/TCOMP4A9377276CC57CE6F721" target="_blank" rel="noopener noreferrer">T. com. Paris, 7 juillet 2026, n° 2025022908</a> ; TJ Nanterre, 27 octobre 2023, n° 22-10660 ; TJ Bordeaux, 11 juillet 2024, n° 22-04859 ; TJ Créteil, 21 janvier 2025, n° 23-00027 ; CA Paris, 14 décembre 2022, n° 21-03996. <span className={styles.meta}>(Décisions du fond signalées « accès abonné » : lien doctrine.fr.)</span></p>
            <p className={styles.meta}>Dernière vérification juridique : {MAJ}</p>
          </div>

          {/* ===== Auteur ===== */}
          <div className={styles.author}>
            <span className={styles.authorAva}>
              <Image src="/images/alexandre-pro.jpg" alt="Portrait d'Alexandre Lazarègue" fill sizes="96px" style={{ objectFit: "cover" }} />
            </span>
            <div>
              <p className={styles.label}>Auteur</p>
              <p className={styles.authorName}>Me Alexandre Lazarègue</p>
              <p className={styles.meta}>Avocat au Barreau de Paris · Fondateur de Lazarègue Avocats</p>
              <p className={styles.tx}>Intervient dans les recours contre les établissements bancaires après une fraude, en cybercriminalité et en protection des données.</p>
              <p className={styles.authorLinks}>
                <Link href={COMPETENCE}>Fraude bancaire et escroquerie en ligne</Link> ·{" "}
                <Link href="/le-cabinet">Le cabinet</Link>
              </p>
            </div>
          </div>

          <ShareBar />
        </article>

        <TocSpy items={TOC} />
      </div>

      {/* ================================ CTA ============================= */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <h2 className={styles.h2} id="h-cta">Faire examiner votre dossier</h2>
            <p className={styles.lead}>Un article expose les règles générales. Leur application dépend des faits, des pièces disponibles et des délais.</p>
          </div>
          <Link className={styles.btn} href="/contact">Échanger avec un avocat →</Link>
        </div>
      </section>
    </main>
  );
}
