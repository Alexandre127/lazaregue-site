import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import KeywordBadge from "@/components/keyword-badge";
import { fr } from "@/lib/typo";
import styles from "./crypto.module.css";
import { FAQ_ITEMS, faqAnswerText } from "./faq";
import { Faq } from "./_components/Faq";
import { Toc } from "./_components/Toc";
import { PointsExamines } from "./_components/PointsExamines";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/crypto-actifs-blockchain";
const CABINET_ID = `${URL_BASE}/#cabinet`; // seule entité globale existante (pas de #website/#organization)

/* CTA contextualisés (convention du dépôt : /contact sans barre oblique finale).
   La page contact ne lit pas encore `objet`/`situation` — voir compte rendu. */
const CT = "/contact?objet=crypto-actifs";
const CT_STRUCT = "/contact?objet=crypto-actifs&situation=structuration";
const CT_TOKEN = "/contact?objet=crypto-actifs&situation=token-smart-contract";
const CT_LITIGE = "/contact?objet=crypto-actifs&situation=contentieux-actifs";
const R_RGPD = "/nos-domaines/rgpd-donnees-personnelles"; // maquette : /nos-domaines/rgpd
const R_ESCRO = "/nos-domaines/escroquerie-fraude-bancaire";

const TITLE = "Avocat crypto, blockchain et Web3 — MiCA et PSCA";
const DESCRIPTION =
  "Avocats en crypto-actifs, blockchain et Web3 : autorisation PSCA, conformité MiCA, contrats, smart contracts, tokenisation et contentieux d’actifs bloqués.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${URL_BASE}${PATH}#webpage`, url: `${URL_BASE}${PATH}`, name: TITLE, description: DESCRIPTION, inLanguage: "fr", isPartOf: { "@id": CABINET_ID }, publisher: { "@id": CABINET_ID } },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Crypto-actifs, Blockchain et Web3", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: faqAnswerText(f.a) } })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <div className={styles.crypto}>
        {/* Fil d'Ariane (réserve la hauteur du header global) */}
        <nav className="crumbs dark" aria-label="Fil d’Ariane">
          <div className="wrap">
            <ol>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/nos-domaines">Nos domaines</Link></li>
              <li><span aria-current="page">Crypto-actifs, Blockchain et Web3</span></li>
            </ol>
          </div>
        </nav>

        <main id="contenu" tabIndex={-1}>
          {/* 3 · HERO */}
          <section className="hero dark" aria-labelledby="titre-page">
            <div className="wrap hero-grid">
              <div>
                <KeywordBadge>Crypto-actifs · Blockchain · Web3</KeywordBadge>
                <h1 id="titre-page">Avocat en <span className="nobr">crypto-actifs</span>, blockchain et Web3</h1>
                <p className="promise">{fr("Le cabinet qualifie le modèle, prépare la conformité MiCA, organise les contrats et agit lorsque le code, les actifs et les responsabilités cessent de coïncider.")}</p>
                <p className="audience">Entreprises, plateformes et prestataires technologiques · Paris et toute la France.</p>
                <Link className="btn btn-primary" href={CT}>Exposer un projet ou un litige</Link>
              </div>
              <aside className="cutoff" aria-labelledby="repere-titre">
                <h2 className="label" id="repere-titre" style={{ marginBottom: 8 }}>Repère réglementaire</h2>
                <time dateTime="2026-07-01">1<sup>er</sup> juillet 2026</time>
                <p>{fr("Fin de la période transitoire française. Depuis cette date, les prestataires concernés ne peuvent plus poursuivre leurs services en France sur le seul fondement de leur ancien statut PSAN : leur situation doit relever du cadre MiCA applicable, notamment d’une autorisation PSCA ou d’un autre mode d’accès au marché prévu par les textes.")}</p>
                <p className="note">Règlement (UE) 2023/1114, art. 143, et cadre français de transition.</p>
              </aside>
            </div>
          </section>

          {/* 4 · AIGUILLAGE */}
          <section className="situations" aria-labelledby="situations-titre">
            <div className="wrap">
              <h2 id="situations-titre">Quelle est votre situation&nbsp;?</h2>
              <ul className="sit-list">
                <li className="sit">
                  <span className="label">Conseil et conformité</span>
                  <h3>Vous structurez ou exploitez un service crypto</h3>
                  <p>Qualification, accès au marché, autorisation PSCA, gouvernance et conformité.</p>
                  <a className="anchor-link" href="#structurer">Voir la structuration et la conformité</a>
                </li>
                <li className="sit">
                  <span className="label">Opérations</span>
                  <h3>Vous lancez un token, un NFT ou un smart contract</h3>
                  <p>Droits, documentation, code, responsabilités et sous-jacent.</p>
                  <a className="anchor-link" href="#contrats">Voir les contrats et les opérations</a>
                </li>
                <li className="sit">
                  <span className="label">Contentieux</span>
                  <h3>Vos actifs sont bloqués, perdus ou détournés</h3>
                  <p>Preuve, flux, interlocuteur responsable et voie de recours.</p>
                  <a className="anchor-link" href="#contentieux">Voir les recours</a>
                </li>
              </ul>
            </div>
          </section>

          <div className="wrap doc">
            {/* 5 · SOMMAIRE (scroll-spy client) */}
            <Toc />

            <div className="doc-body">
              {/* 6 · STRUCTURER */}
              <section className="topic" id="structurer" aria-labelledby="h-structurer">
                <span className="label">01 · Structurer le projet</span>
                <h2 id="h-structurer">Savoir ce que vous pouvez lancer, et sous quel régime</h2>
                <p className="lead">{fr("Un même projet peut relever de MiCA, du droit des instruments financiers, des services de paiement ou d’aucun régime spécial. La réponse dépend moins de la technologie employée que de ce que le jeton confère et des services effectivement rendus.")}</p>
                <div className="axes">
                  <div><h3>Qualification du jeton</h3><p>{fr("Instrument financier, jeton de monnaie électronique, jeton se référant à un ou plusieurs actifs, autre crypto-actif, ou actif hors du champ du règlement.")}</p></div>
                  <div><h3>Services réellement fournis</h3><p>{fr("Conservation, échange, exploitation d’une plateforme, exécution ou transmission d’ordres, conseil, transfert : la liste des services est confrontée au fonctionnement réel du produit.")}</p></div>
                  <div><h3>Mode d’accès au marché</h3><p>{fr("Autorisation PSCA en France, passeport obtenu dans un autre État membre, notification ouverte à certaines entités financières, ou absence de service réglementé.")}</p></div>
                  <div><h3>Gouvernance et responsabilités</h3><p>{fr("Qui décide, qui contrôle les clés et les mises à jour, qui répond envers les utilisateurs, y compris dans une structure décentralisée ou une DAO.")}</p></div>
                </div>
                <PointsExamines>
                  <ul className="dash">
                    <li>Offre au public, admission à la négociation et livre blanc lorsque le régime l’exige.</li>
                    <li>Communications commerciales et commercialisation auprès du public français.</li>
                    <li>Articulation avec les régimes des services de paiement, de la monnaie électronique et des instruments financiers.</li>
                    <li>Organisation des entités, localisation des activités et répartition des rôles entre elles.</li>
                    <li>Calendrier réglementaire du projet et points de décision avant lancement.</li>
                  </ul>
                </PointsExamines>
                <div className="deliv">
                  <p><b>Livrable associé</b> · Note de qualification juridique et réglementaire</p>
                  <Link href={CT_STRUCT}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 7 · AUTORISATION PSCA */}
              <section className="topic" id="psca" aria-labelledby="h-psca">
                <span className="label">02 · Autorisation PSCA</span>
                <h2 id="h-psca">Préparer un dossier MiCA applicable dans l’entreprise</h2>
                <p className="lead">{fr("En France, l’autorisation PSCA (parfois appelée « agrément PSCA ») est délivrée par l’Autorité des marchés financiers. Le dossier couvre quatre ensembles, préparés avec les équipes qui devront les faire vivre.")}</p>
                <div className="families">
                  <section aria-labelledby="f1">
                    <h3 id="f1">Modèle, services et programme d’activité</h3>
                    <ul className="dash"><li>Périmètre des services demandés</li><li>Programme d’activité et plan de développement</li><li>Exigences prudentielles</li><li>Plan de liquidation ordonnée</li></ul>
                  </section>
                  <section aria-labelledby="f2">
                    <h3 id="f2">Gouvernance, dirigeants et actionnariat</h3>
                    <ul className="dash"><li>Honorabilité et compétence des dirigeants</li><li>Actionnaires et participations qualifiées</li><li>Fonctions de contrôle et répartition des responsabilités</li></ul>
                  </section>
                  <section aria-labelledby="f3">
                    <h3 id="f3">Risques, sécurité, continuité et externalisation</h3>
                    <ul className="dash"><li>Sécurité des systèmes et résilience opérationnelle</li><li>Continuité d’activité</li><li>Externalisation et contrôle des prestataires</li><li>Dispositif LCB-FT</li></ul>
                  </section>
                  <section aria-labelledby="f4">
                    <h3 id="f4">Actifs clients, conflits d’intérêts et réclamations</h3>
                    <ul className="dash"><li>Ségrégation et conservation des actifs des clients</li><li>Prévention et gestion des conflits d’intérêts</li><li>Traitement des réclamations et information des clients</li></ul>
                  </section>
                </div>
                <p className="pull">{fr("Les procédures décrites dans le dossier doivent pouvoir être appliquées par les équipes, et démontrées au régulateur après l’autorisation.")}</p>
                <div className="deliv">
                  <p><b>Livrables associés</b> · Dossier d’autorisation PSCA et procédures de conformité</p>
                  <Link href={CT_STRUCT}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 8 · CONTRATS ET CODE */}
              <section className="topic" id="contrats" aria-labelledby="h-contrats">
                <span className="label">03 · Contrats et code</span>
                <h2 id="h-contrats">Répartir les responsabilités avant que le code ne tranche</h2>
                <p className="principle">Le code exécute, il n’épuise pas l’accord.</p>
                <p className="measure">{fr("Un smart contract peut automatiser l’exécution de certaines obligations. Il ne règle pas, à lui seul, le consentement, l’interprétation, la suspension, la réversibilité, la responsabilité ou la loi applicable. Ces questions se tranchent dans une documentation cohérente avec le fonctionnement du programme : oracle, bridge, API, conservation, sécurité, disponibilité et mise à jour.")}</p>
                <ol className="layers" aria-label="Trois niveaux contractuels">
                  <li><div><span className="label">Niveau 1</span><h3>Relation utilisateur</h3></div><p>{fr("Conditions générales, information préalable, suspension et clôture du compte, sort des actifs en cas de cessation d’activité.")}</p></li>
                  <li><div><span className="label">Niveau 2</span><h3>Chaîne de prestataires</h3></div><p>{fr("Conservation, hébergement, API, oracles et bridges : niveaux de service, sécurité, disponibilité, réversibilité et responsabilité de chacun.")}</p></li>
                  <li><div><span className="label">Niveau 3</span><h3>Articulation du code et de l’accord</h3></div><p>{fr("Ce que prévoit l’accord lorsque le programme s’exécute contrairement à la volonté commune, qu’une faille est exploitée, qu’un oracle défaille ou qu’une mise à jour modifie le fonctionnement.")}</p></li>
                </ol>
                <div className="deliv">
                  <p><b>Livrable associé</b> · Documentation contractuelle</p>
                  <Link href={CT_TOKEN}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 9 · LECTURE TECHNIQUE */}
              <section className="topic band dark" id="technique" aria-labelledby="h-technique">
                <span className="label">04 · Lecture technique</span>
                <h2 id="h-technique">Relier les faits techniques à la qualification juridique</h2>
                <p className="lead">{fr("Lorsque le dossier l’exige, le cabinet met en regard l’analyse juridique et la lecture des transactions, des accès, des clés et du fonctionnement du code, avec l’appui d’un intervenant technique adapté.")}</p>
                <table className="readings">
                  <caption>Ce qui est lu, et la question juridique à laquelle cela répond</caption>
                  <thead><tr><th scope="col">Élément</th><th scope="col">Ce qui est examiné</th><th scope="col">Question juridique</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Transactions</th><td data-h="Ce qui est examiné">Chronologie, adresses, montants, passages par des intermédiaires</td><td data-h="Question juridique">{fr("Qui a ordonné le transfert, et à quel moment ?")}</td></tr>
                    <tr><th scope="row">Accès</th><td data-h="Ce qui est examiné">Connexions, authentification, modifications de paramètres</td><td data-h="Question juridique">{fr("L’opération était-elle autorisée ?")}</td></tr>
                    <tr><th scope="row">Clés</th><td data-h="Ce qui est examiné">Détention des clés privées, conservation, signatures multiples</td><td data-h="Question juridique">{fr("Qui contrôlait les actifs, et qui en répond ?")}</td></tr>
                    <tr><th scope="row">Code</th><td data-h="Ce qui est examiné">Fonctions, droits d’administration, mises à jour, oracles</td><td data-h="Question juridique">{fr("Le programme a-t-il fonctionné comme documenté ?")}</td></tr>
                  </tbody>
                </table>
                <p className="caveat">{fr("Cette lecture n’a pas la valeur d’une expertise judiciaire, qui relève d’une désignation par la juridiction.")}</p>
                <div className="deliv">
                  <p><b>Livrable possible</b> · Note technique ou dire d’expertise selon la procédure</p>
                </div>
              </section>

              {/* 10 · JETONS */}
              <section className="topic" id="jetons" aria-labelledby="h-jetons">
                <span className="label">05 · Jetons, tokenisation et NFT</span>
                <h2 id="h-jetons">Définir le droit réellement attaché au jeton</h2>
                <p className="lead">{fr("Un jeton vaut ce qu’il confère. Sa qualification, sa documentation et sa circulation dépendent du droit qu’il représente et de la réalité de son sous-jacent.")}</p>
                <dl className="rights">
                  <div><dt>Droit financier</dt><dd>Rendement, part de revenus, créance ou droit sur un actif.</dd></div>
                  <div><dt>Droit d’usage</dt><dd>Accès à un service, à un bien ou à une communauté.</dd></div>
                  <div><dt>Droit de gouvernance</dt><dd>Vote, proposition ou contrôle sur un protocole ou une organisation.</dd></div>
                </dl>
                <div className="two">
                  <div>
                    <h3>Points examinés</h3>
                    <ul className="dash"><li>Qualification du jeton et régime applicable</li><li>Existence, détention et conservation du sous-jacent tokenisé</li><li>Documentation remise aux acquéreurs</li><li>Propriété intellectuelle sur les œuvres et les marques associées</li><li>Règles de revente et fonctionnement du marché secondaire</li></ul>
                  </div>
                  <div className="statement">
                    <p className="big">{fr("L’achat d’un NFT n’emporte pas, à lui seul, cession des droits d’auteur sur l’œuvre associée.")}</p>
                    <p className="src">Code de la propriété intellectuelle, art. L. 111-3 et L. 131-3.</p>
                  </div>
                </div>
                <div className="deliv">
                  <p><b>Livrables associés</b> · Note de qualification et documentation contractuelle</p>
                  <Link href={CT_TOKEN}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 11 · LCB-FT */}
              <section className="topic" id="lcb-ft" aria-labelledby="h-lcb">
                <span className="label">06 · LCB-FT et obligations déclaratives</span>
                <h2 id="h-lcb">Mettre les contrôles en cohérence avec les flux réels</h2>
                <div className="split">
                  <div>
                    <p className="measure">{fr("Un dispositif de lutte contre le blanchiment n’est opposable que s’il correspond aux flux que traite réellement l’entreprise. Le cabinet en vérifie la cohérence et la traçabilité.")}</p>
                    <ul className="dash"><li>Connaissance des clients et des bénéficiaires effectifs</li><li>Surveillance des opérations et déclarations de soupçon</li><li>Gel des avoirs et mesures restrictives</li><li>Informations accompagnant les transferts de crypto-actifs, règlement (UE) 2023/1113</li></ul>
                    <p className="measure" style={{ marginTop: 24 }}>{fr("Lorsqu’un refus ou une clôture de compte repose sur un score automatisé, les garanties propres aux décisions automatisées sont examinées, en lien avec la pratique du cabinet en ")}<Link href={R_RGPD}>protection des données</Link>.</p>
                  </div>
                  <div className="aside-box">
                    <h3>Obligations déclaratives</h3>
                    <p>{fr("Les obligations déclaratives, notamment fiscales, sont traitées selon le périmètre de la mission et, si nécessaire, avec le conseil fiscal de l’entreprise.")}</p>
                  </div>
                </div>
                <div className="deliv">
                  <p><b>Livrable associé</b> · Procédures de conformité</p>
                </div>
              </section>

              {/* 12 · CONTENTIEUX */}
              <section className="topic" id="contentieux" aria-labelledby="h-contentieux">
                <span className="label">07 · Contentieux</span>
                <h2 id="h-contentieux">Agir lorsque des crypto-actifs sont bloqués, perdus ou détournés</h2>
                <p className="lead">{fr("Chaque situation appelle ses propres faits, son interlocuteur et sa voie d’action.")}</p>
                <ul className="cases">
                  {[
                    { h: "Actifs ou compte bloqués par une plateforme", f: "Motif invoqué, conditions générales, échanges, vigilance alléguée", i: "La plateforme et, le cas échéant, son conservateur", v: "Demande documentée, mise en demeure, référé ou action au fond" },
                    { h: "Défaillance d’une plateforme ou d’un prestataire", f: "Statut du prestataire, ségrégation des actifs, état de la procédure", i: "Le prestataire et les organes de la procédure collective", v: "Déclaration de créance, revendication, action en responsabilité" },
                    { h: "Détournement ou transfert non autorisé", f: "Parcours des fonds, accès, passage par un intermédiaire régulé", i: "L’intermédiaire identifié et, s’il est connu, l’auteur", v: "Plainte, mesures conservatoires, action en responsabilité selon les faits" },
                    { h: "Refus ou clôture d’un compte bancaire lié à l’activité crypto", f: "Motif, préavis, échanges, statut de l’entreprise", i: "L’établissement bancaire", v: "Contestation dans le cadre issu de l’ordonnance n° 2024-936" },
                  ].map((c) => (
                    <li className="case" key={c.h}>
                      <h3>{fr(c.h)}</h3>
                      <dl>
                        <div><dt>Faits examinés</dt><dd>{fr(c.f)}</dd></div>
                        <div><dt>Interlocuteur</dt><dd>{fr(c.i)}</dd></div>
                        <div><dt>Voie d’action</dt><dd>{fr(c.v)}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ul>
                <p className="limit">{fr("Aucune procédure n’est engagée sans défendeur atteignable. Lorsque la reconstitution des faits n’en fait apparaître aucun, le cabinet le dit avant toute action.")}</p>
                <div className="redirect">
                  <p>{fr("Faux conseiller, faux investissement ou virement frauduleux ?")}</p>
                  <Link href={R_ESCRO}>Consultez la page Escroquerie et fraude bancaire</Link>
                </div>
                <div className="deliv">
                  <p><b>Livrables possibles</b> · Demande documentée, mise en demeure, assignation ou écritures selon la stratégie retenue</p>
                  <Link href={CT_LITIGE}>Exposer ce litige</Link>
                </div>
              </section>

              {/* 13 · NOTRE INTERVENTION */}
              <section className="topic" id="intervention" aria-labelledby="h-intervention">
                <span className="label">08 · Notre intervention</span>
                <h2 id="h-intervention">Une méthode en quatre temps</h2>
                <ol className="steps">
                  <li><h3>Qualifier</h3><p>{fr("La situation, les services, les droits et les responsabilités en cause.")}</p></li>
                  <li><h3>Sécuriser les faits</h3><p>{fr("Conserver échanges, journaux, transactions et contrats avant qu’ils ne disparaissent.")}</p></li>
                  <li><h3>Choisir la voie d’action</h3><p>{fr("Conformité, négociation ou procédure, selon les faits et l’interlocuteur atteignable.")}</p></li>
                  <li><h3>Conduire le dossier</h3><p>{fr("Rédaction, échanges avec le régulateur ou les parties, procédure jusqu’à son terme.")}</p></li>
                </ol>
              </section>
            </div>
          </div>

          {/* 14 · LIVRABLES */}
          <section className="full off" aria-labelledby="h-livrables">
            <div className="wrap">
              <span className="label">Ce que le cabinet produit</span>
              <h2 id="h-livrables">Des documents adaptés au projet ou au litige</h2>
              <ul className="docs">
                {[
                  { k: "Conseil", h: "Note de qualification juridique et réglementaire", p: "Régime applicable, services en cause et points de décision." },
                  { k: "Conformité", h: "Dossier d’autorisation PSCA", p: "Pièces du dossier déposé auprès de l’Autorité des marchés financiers." },
                  { k: "Conformité", h: "Procédures de conformité", p: "Gouvernance, conservation, LCB-FT, conflits d’intérêts et réclamations." },
                  { k: "Contrats", h: "Documentation contractuelle", p: "Conditions générales, contrats de prestation et documentation des jetons." },
                  { k: "Technique", h: "Note technique ou dire d’expertise", p: "Lorsque le dossier s’y prête, avec l’intervenant technique." },
                  { k: "Contentieux", h: "Mise en demeure, assignation ou écritures", p: "Selon la stratégie retenue et la juridiction saisie." },
                ].map((d) => (
                  <li key={d.h}><span className="sheet" aria-hidden="true" /><span className="kind">{d.k}</span><h3>{fr(d.h)}</h3><p>{fr(d.p)}</p></li>
                ))}
              </ul>
            </div>
          </section>

          {/* 15 · ÉQUIPE */}
          <section className="full" aria-labelledby="h-equipe">
            <div className="wrap">
              <h2 id="h-equipe">Une analyse juridique coordonnée avec la technique</h2>
              <ul className="team">
                <li className="person">
                  <div className="ph ph--filled">
                    <Image src="/images/alexandre-pro.jpg" alt="Me Alexandre Lazarègue" fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" style={{ objectFit: "cover" }} />
                  </div>
                  <div><h3>Me Alexandre Lazarègue</h3><p className="role">Avocat au barreau de Paris</p><p>Fondateur du cabinet.</p></div>
                </li>
                <li className="person">
                  <div className="ph ph--filled">
                    <Image src="/images/amir-pro.jpg" alt="Me Amir Ben Majed" fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" style={{ objectFit: "cover" }} />
                  </div>
                  <div><h3>Me Amir Ben Majed</h3><p className="role">Avocat au barreau d’Évry</p></div>
                </li>
                <li className="person">
                  <div className="ph">Emplacement réservé · intervenant technique à valider</div>
                  <div><h3>Appui technique</h3><p className="role">Selon le dossier</p><p>{fr("Un intervenant technique adapté est associé lorsque les faits l’exigent.")}</p></div>
                </li>
              </ul>
            </div>
          </section>

          {/* 16 · FAQ */}
          <section className="full off" aria-labelledby="h-faq">
            <div className="wrap">
              <h2 id="h-faq">Questions fréquentes</h2>
              <Faq />
            </div>
          </section>

          {/* 17 · SUJETS LIÉS */}
          <section className="full" aria-labelledby="h-lies">
            <div className="wrap">
              <h2 id="h-lies">Sujets liés</h2>
              <ul className="related">
                <li><Link href="/nos-domaines/contrats-informatiques"><span className="t">Contrats informatiques</span><span className="d">Contrats SaaS, maintenance, infogérance et réversibilité.</span></Link></li>
                <li><Link href="/nos-domaines/contentieux-informatique-commercial"><span className="t">Contentieux informatique et commercial</span><span className="d">Échec de projet, rupture et responsabilité des prestataires.</span></Link></li>
                <li><Link href="/nos-domaines/escroquerie-fraude-bancaire"><span className="t">Escroquerie et fraude bancaire</span><span className="d">Recours des victimes contre l’établissement teneur du compte.</span></Link></li>
                <li><Link href="/nos-domaines/ma-tech"><span className="t">M&amp;A Tech</span><span className="d">Due diligence des actifs numériques et opérations.</span></Link></li>
              </ul>
            </div>
          </section>

          {/* 18 · CONTACT FINAL */}
          <section className="contact dark" aria-labelledby="h-contact">
            <div className="wrap contact-grid">
              <div>
                <span className="label">Projet · Conformité · Contentieux</span>
                <h2 id="h-contact">Parlons de votre situation</h2>
                <p>{fr("Vous préparez une autorisation PSCA, lancez une opération Web3, négociez un contrat ou faites face à un blocage d’actifs ? Présentez au cabinet le projet ou le litige et les premiers éléments disponibles.")}</p>
              </div>
              <div className="contact-actions">
                <Link className="btn btn-primary" href={CT}>Exposer un projet ou un litige</Link>
                <a className="tel" href="tel:+33181706200">Appeler le 01&nbsp;81&nbsp;70&nbsp;62&nbsp;00</a>
                <address>18 rue de Tilsitt, 75017 Paris</address>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
