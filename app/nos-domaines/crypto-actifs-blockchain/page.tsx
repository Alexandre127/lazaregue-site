import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import KeywordBadge from "@/components/keyword-badge";
import { fr } from "@/lib/typo";
import { MEMBRES } from "@/lib/equipe";
import styles from "./crypto.module.css";
import { FAQ_ITEMS, faqAnswerText } from "./faq";
import { Faq } from "./_components/Faq";
import { Toc } from "./_components/Toc";
import { PointsExamines } from "./_components/PointsExamines";
import { Repliable } from "./_components/Repliable";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/crypto-actifs-blockchain";
const CABINET_ID = `${URL_BASE}/#cabinet`; // seule entité globale existante (pas de #website/#organization)

/* Tous les CTA renvoient vers /contact, sans paramètre (convention du dépôt). */
const CT = "/contact";
const R_RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const R_ESCRO = "/nos-domaines/escroquerie-fraude-bancaire";

const khalid = MEMBRES.khalid;

/* Title, meta description, URL et H1 CONSERVÉS (SEO). */
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
      <a className={styles.skipLink} href="#contenu">Aller au contenu</a>

      <div className={styles.crypto}>
        {/* Fil d'Ariane (réserve la hauteur du header global) */}
        <nav className="crumbs dark" aria-label="Fil d’Ariane">
          <div className="wrap">
            <ol>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/nos-domaines">Domaines</Link></li>
              <li><span aria-current="page">Crypto-actifs, Blockchain et Web3</span></li>
            </ol>
          </div>
        </nav>

        <main id="contenu" tabIndex={-1}>
          {/* HERO */}
          <section className="hero dark" aria-labelledby="titre-page">
            <div className="wrap hero-grid">
              <div>
                <KeywordBadge>Crypto-actifs · Blockchain · Web3</KeywordBadge>
                <h1 id="titre-page">Avocat en <span className="nobr">crypto-actifs</span>, blockchain et Web3</h1>
                <p className="promise">{fr("Vous lancez un projet crypto : le cabinet vous dit quelles règles s'appliquent, obtient les autorisations nécessaires, rédige vos contrats et vous défend si vos actifs sont bloqués ou détournés.")}</p>
                <p className="audience">Pour les entreprises, start-up et plateformes · Paris et toute la France.</p>
                <Link className="btn btn-primary" href={CT}>Exposer un projet ou un litige</Link>
              </div>
              <aside className="cutoff" aria-labelledby="repere-titre">
                <h2 className="label" id="repere-titre" style={{ marginBottom: 8 }}>Repère réglementaire</h2>
                <time dateTime="2026-07-01">1<sup>er</sup> juillet 2026</time>
                <p>{fr("Depuis cette date, proposer des services sur crypto-actifs en France (conservation, échange, plateforme…) suppose une autorisation de l'Autorité des marchés financiers, dite « PSCA », ou un agrément obtenu dans un autre pays de l'Union. L'ancien enregistrement PSAN ne suffit plus.")}</p>
                <p className="note">{fr("Fin de la période transitoire française · règlement (UE) 2023/1114 dit « MiCA », art. 143.")}</p>
              </aside>
            </div>
          </section>

          {/* AIGUILLAGE */}
          <section className="situations" aria-labelledby="situations-titre">
            <div className="wrap">
              <h2 id="situations-titre">Quelle est votre situation&nbsp;?</h2>
              <ul className="sit-list">
                <li className="sit">
                  <span className="label">Lancement</span>
                  <h3>Vous lancez une activité crypto</h3>
                  <p>{fr("Savoir si vous avez besoin d'une autorisation, laquelle, et comment l'obtenir.")}</p>
                  <a className="anchor-link" href="#structurer">Voir les règles et l’autorisation</a>
                </li>
                <li className="sit">
                  <span className="label">Jeton et contrats</span>
                  <h3>Vous créez un jeton, un NFT ou un smart contract</h3>
                  <p>{fr("Définir ce que le jeton donne à ses acheteurs, et écrire des contrats qui collent au code.")}</p>
                  <a className="anchor-link" href="#contrats">Voir les jetons et les contrats</a>
                </li>
                <li className="sit">
                  <span className="label">Litige</span>
                  <h3>Vos crypto-actifs sont bloqués, perdus ou détournés</h3>
                  <p>{fr("Identifier qui est responsable et agir pour récupérer vos actifs.")}</p>
                  <a className="anchor-link" href="#contentieux">Voir les recours</a>
                </li>
              </ul>
            </div>
          </section>

          <div className="wrap doc">
            <Toc />

            <div className="doc-body">
              {/* 01 · LES RÈGLES APPLICABLES */}
              <section className="topic" id="structurer" aria-labelledby="h-structurer">
                <span className="label">01 · Les règles applicables</span>
                <h2 id="h-structurer">Savoir quelles règles s’appliquent à votre projet</h2>
                <p className="lead">{fr("Selon ce que vous proposez, votre projet peut relever du règlement européen MiCA, des règles financières classiques, ou d'aucune règle particulière. Ce qui compte, c'est ce que vous vendez, et à qui.")}</p>
                <div className="axes">
                  <div><h3>Ce que représente votre jeton</h3><p>{fr("Un simple accès à votre service, un placement financier, une monnaie numérique : chaque cas obéit à des règles différentes.")}</p></div>
                  <div><h3>Les services que vous rendez réellement</h3><p>{fr("Garder les crypto-actifs de vos clients, les échanger, faire fonctionner une plateforme, conseiller : c'est ce que fait réellement votre produit qui compte, pas son nom.")}</p></div>
                  <div><h3>L’autorisation dont vous avez besoin</h3><p>{fr("Autorisation de l'AMF, agrément obtenu dans un autre pays de l'Union, ou aucune autorisation si votre service n'est pas réglementé.")}</p></div>
                  <div><h3>Qui décide et qui est responsable</h3><p>{fr("Qui contrôle les clés et les mises à jour, et qui répond envers les utilisateurs, y compris dans un projet décentralisé.")}</p></div>
                </div>
                <PointsExamines>
                  <ul className="dash">
                    <li>{fr("Si vous vendez votre jeton au public ou le faites coter sur une plateforme : faut-il publier un document d'information, le « livre blanc » ?")}</li>
                    <li>{fr("Ce que vous pouvez dire dans votre publicité et vos communications en France")}</li>
                    <li>{fr("Si votre projet touche aussi aux paiements, à la monnaie électronique ou aux produits financiers classiques")}</li>
                    <li>{fr("Comment répartir l'activité entre vos sociétés et vos pays d'implantation")}</li>
                    <li>{fr("Le calendrier : ce qui doit être réglé avant le lancement")}</li>
                  </ul>
                </PointsExamines>
                <div className="deliv">
                  <p><b>Livrable associé</b> · Note de qualification juridique et réglementaire</p>
                  <Link href={CT}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 02 · L'AUTORISATION (PSCA) */}
              <section className="topic" id="psca" aria-labelledby="h-psca">
                <span className="label">02 · L’autorisation (PSCA)</span>
                <h2 id="h-psca">Obtenir l’autorisation de l’AMF</h2>
                <p className="lead">{fr("Pour garder, échanger ou vendre des crypto-actifs pour vos clients, il faut une autorisation de l'Autorité des marchés financiers, appelée « PSCA ». Le dossier décrit votre activité, vos dirigeants, votre sécurité et la protection de vos clients ; le cabinet le prépare avec vous.")}</p>
                <div className="families">
                  <section aria-labelledby="f1">
                    <h3 id="f1">Votre activité et votre modèle</h3>
                    <ul className="dash"><li>{fr("Les services que vous demandez à exercer")}</li><li>{fr("Votre plan d'activité sur plusieurs années")}</li><li>{fr("Vos fonds propres ou votre assurance")}</li><li>{fr("Ce qui se passe pour vos clients si vous arrêtez")}</li></ul>
                  </section>
                  <section aria-labelledby="f2">
                    <h3 id="f2">Vos dirigeants et vos actionnaires</h3>
                    <ul className="dash"><li>{fr("Réputation et compétence des dirigeants")}</li><li>{fr("Actionnaires qui détiennent une part importante")}</li><li>{fr("Qui contrôle quoi dans l'entreprise")}</li></ul>
                  </section>
                  <section aria-labelledby="f3">
                    <h3 id="f3">Votre sécurité et vos prestataires</h3>
                    <ul className="dash"><li>{fr("Sécurité informatique et résistance aux pannes et aux attaques")}</li><li>{fr("Poursuite de l'activité en cas d'incident")}</li><li>{fr("Contrôle des prestataires à qui vous confiez des tâches")}</li><li>{fr("Lutte contre le blanchiment")}</li></ul>
                  </section>
                  <section aria-labelledby="f4">
                    <h3 id="f4">La protection de vos clients</h3>
                    <ul className="dash"><li>{fr("Séparer les actifs de vos clients des vôtres")}</li><li>{fr("Éviter les conflits d'intérêts")}</li><li>{fr("Traiter les réclamations et bien informer vos clients")}</li></ul>
                  </section>
                </div>
                <p className="pull">{fr("Le dossier doit décrire ce que vos équipes font vraiment : après l'autorisation, l'AMF peut vérifier que les procédures sont appliquées.")}</p>
                <div className="deliv">
                  <p><b>Livrables associés</b> · Dossier d’autorisation PSCA et procédures de conformité</p>
                  <Link href={CT}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 03 · CONTRATS ET SMART CONTRACTS */}
              <section className="topic" id="contrats" aria-labelledby="h-contrats">
                <span className="label">03 · Contrats et smart contracts</span>
                <h2 id="h-contrats">Écrire des contrats qui collent à votre code</h2>
                <p className="measure">{fr("Un smart contract exécute automatiquement ce pour quoi il a été programmé. Il ne dit pas qui est responsable en cas de bug, de piratage ou de mise à jour : ce sont vos contrats qui le disent.")}</p>
                <ol className="layers" aria-label="Trois niveaux contractuels">
                  <li><div><span className="label">Niveau 1</span><h3>Avec vos utilisateurs</h3></div><p>{fr("Conditions générales, information avant l'achat, suspension et fermeture des comptes, sort des actifs si votre activité s'arrête.")}</p></li>
                  <li><div><span className="label">Niveau 2</span><h3>Avec vos prestataires</h3></div><p>{fr("Hébergeur, conservateur, fournisseurs techniques : ce que chacun garantit, et qui paie en cas de panne ou de piratage.")}</p></li>
                  <li><div><span className="label">Niveau 3</span><h3>Quand le code ne fait pas ce qui était prévu</h3></div><p>{fr("Bug, faille exploitée, donnée externe erronée ou mise à jour : ce que prévoit le contrat quand le programme s'écarte de ce qui était convenu.")}</p></li>
                </ol>
                <div className="deliv">
                  <p><b>Livrable associé</b> · Documentation contractuelle</p>
                  <Link href={CT}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 04 · L'EXAMEN TECHNIQUE (bande sombre) */}
              <section className="topic band dark" id="technique" aria-labelledby="h-technique">
                <span className="label">04 · L’examen technique</span>
                <h2 id="h-technique">Vérifier ce qui s’est réellement passé</h2>
                <p className="lead">{fr("Khalid Sookia, consultant technique en cybersécurité du cabinet, analyse les transactions, les accès, les clés et le code ; l'avocat en tire les conséquences juridiques.")}</p>
                <table className="readings">
                  <caption>Ce qui est lu, et la question juridique à laquelle cela répond</caption>
                  <thead><tr><th scope="col">Élément</th><th scope="col">Ce qui est examiné</th><th scope="col">Question juridique</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Transactions</th><td data-h="Ce qui est examiné">Chronologie, adresses, montants, passages par des intermédiaires</td><td data-h="Question juridique">{fr("Qui a ordonné le transfert, et à quel moment ?")}</td></tr>
                    <tr><th scope="row">Accès</th><td data-h="Ce qui est examiné">Connexions, authentification, modifications de paramètres</td><td data-h="Question juridique">{fr("L'opération était-elle autorisée ?")}</td></tr>
                    <tr><th scope="row">Clés</th><td data-h="Ce qui est examiné">Détention des clés privées, conservation, signatures multiples</td><td data-h="Question juridique">{fr("Qui contrôlait les actifs, et qui en répond ?")}</td></tr>
                    <tr><th scope="row">Code</th><td data-h="Ce qui est examiné">Fonctions, droits d’administration, mises à jour</td><td data-h="Question juridique">{fr("Le programme a-t-il fonctionné comme annoncé ?")}</td></tr>
                  </tbody>
                </table>
                <p className="caveat">{fr("La note technique peut être versée au dossier ; l'expertise judiciaire relève, elle, d'une désignation par la juridiction.")}</p>
                <div className="deliv">
                  <p><b>Livrable</b> · Note technique</p>
                </div>
              </section>

              {/* 05 · JETONS ET NFT */}
              <section className="topic" id="jetons" aria-labelledby="h-jetons">
                <span className="label">05 · Jetons et NFT</span>
                <h2 id="h-jetons">Savoir ce que votre jeton donne vraiment</h2>
                <p className="lead">{fr("Un jeton peut donner droit à des revenus, à l'accès à un service ou à un vote. Selon le cas, les règles et vos obligations ne sont pas les mêmes.")}</p>
                <dl className="rights">
                  <div><dt>Un droit à des revenus</dt><dd>{fr("Une part des bénéfices, un rendement, une créance : le jeton se rapproche alors d'un placement financier.")}</dd></div>
                  <div><dt>Un droit d’accès</dt><dd>{fr("À un service, à un bien ou à une communauté.")}</dd></div>
                  <div><dt>Un droit de vote</dt><dd>{fr("Sur l'évolution d'un protocole ou d'une organisation.")}</dd></div>
                </dl>
                <PointsExamines>
                  <ul className="dash">
                    <li>{fr("Les règles qui s'appliquent à votre jeton")}</li>
                    <li>{fr("Si le jeton représente un bien réel (immobilier, œuvre, or…) : ce bien existe-t-il, et qui le détient ?")}</li>
                    <li>{fr("Les informations à donner aux acheteurs")}</li>
                    <li>{fr("Les droits sur les œuvres et les marques utilisées")}</li>
                    <li>{fr("Les règles de revente du jeton")}</li>
                  </ul>
                </PointsExamines>
                <div className="statement" style={{ marginTop: 36 }}>
                  <p className="big">{fr("Acheter un NFT ne donne pas, à lui seul, les droits d'auteur sur l'œuvre.")}</p>
                  <p className="src">{fr("Code de la propriété intellectuelle, art. L. 111-3 et L. 131-3.")}</p>
                </div>
                <div className="deliv">
                  <p><b>Livrables associés</b> · Note de qualification et documentation contractuelle</p>
                  <Link href={CT}>Exposer ce projet</Link>
                </div>
              </section>

              {/* 06 · LUTTE CONTRE LE BLANCHIMENT */}
              <section className="topic" id="lcb-ft" aria-labelledby="h-lcb">
                <span className="label">06 · Lutte contre le blanchiment</span>
                <h2 id="h-lcb">Contrôler l’origine des fonds de vos clients</h2>
                <div className="split">
                  <div>
                    <p className="measure">{fr("Toute activité crypto réglementée doit vérifier l'identité de ses clients et l'origine de leurs fonds, et signaler les opérations suspectes. Ces contrôles doivent correspondre à la façon dont l'argent circule réellement chez vous.")}</p>
                    <ul className="dash"><li>{fr("Vérifier l'identité des clients et savoir qui se trouve derrière")}</li><li>{fr("Surveiller les opérations et signaler les soupçons")}</li><li>{fr("Appliquer les gels d'avoirs et les sanctions")}</li><li>{fr("Transmettre les informations requises à chaque transfert (règlement (UE) 2023/1113)")}</li></ul>
                    <p className="measure" style={{ marginTop: 24 }}>{fr("Si vous refusez ou fermez le compte d'un client sur la base d'un score calculé automatiquement, la loi impose des garanties, dont le droit d'obtenir l'intervention d'une personne (RGPD, art. 22). Le cabinet vérifie votre dispositif avec son pôle ")}<Link href={R_RGPD}>données personnelles</Link>.</p>
                  </div>
                  <div className="aside-box">
                    <h3>Et vos obligations fiscales&nbsp;?</h3>
                    <p>{fr("Vos obligations fiscales et déclaratives sont traitées, si besoin, avec votre expert-comptable ou votre conseil fiscal.")}</p>
                  </div>
                </div>
                <div className="deliv">
                  <p><b>Livrable associé</b> · Procédures de conformité</p>
                </div>
              </section>

              {/* 07 · LITIGES */}
              <section className="topic" id="contentieux" aria-labelledby="h-contentieux">
                <span className="label">07 · Litiges</span>
                <h2 id="h-contentieux">Récupérer des actifs bloqués, perdus ou détournés</h2>
                <p className="lead">{fr("Chaque situation a son responsable et sa voie d'action.")}</p>
                <ul className="cases">
                  {[
                    { h: "Une plateforme bloque votre compte ou vos actifs", f: "La raison donnée, ses conditions générales, vos échanges", i: "La plateforme et, le cas échéant, la société qui garde les actifs", v: "Demande écrite argumentée, mise en demeure, puis procédure d'urgence (référé) ou procès" },
                    { h: "Une plateforme ou un prestataire fait faillite", f: "Son statut, la séparation de vos actifs et des siens, l'état de la procédure", i: "Le prestataire et le mandataire chargé de la faillite", v: "Déclarer ce qui vous est dû, réclamer vos actifs, engager sa responsabilité" },
                    { h: "Vos fonds ont été volés ou transférés sans votre accord", f: "Le trajet des fonds, les accès utilisés, le passage par une plateforme identifiable", i: "La plateforme par laquelle les fonds sont passés et, s'il est connu, l'auteur", v: "Plainte, blocage des fonds en urgence, action en responsabilité" },
                    { h: "Votre banque refuse ou ferme votre compte", f: "La raison, le préavis, vos échanges, votre statut", i: "La banque", v: "Contestation fondée sur les règles qui encadrent les refus et fermetures de compte (art. L. 312-23 du Code monétaire et financier)" },
                  ].map((c) => (
                    <li className="case" key={c.h}>
                      <h3>{fr(c.h)}</h3>
                      <dl>
                        <div><dt>Ce qu’on examine</dt><dd>{fr(c.f)}</dd></div>
                        <div><dt>Contre qui</dt><dd>{fr(c.i)}</dd></div>
                        <div><dt>Comment agir</dt><dd>{fr(c.v)}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ul>
                <p className="limit">{fr("Le cabinet n'engage de procédure que s'il existe un responsable identifié qu'on peut effectivement poursuivre ; si ce n'est pas le cas, il vous le dit avant toute démarche.")}</p>
                <div className="redirect">
                  <p>{fr("Faux conseiller, faux investissement ou virement frauduleux ?")}</p>
                  <Link href={R_ESCRO}>Escroquerie et fraude bancaire</Link>
                </div>
                <div className="deliv">
                  <p><b>Livrables possibles</b> · Demande écrite, mise en demeure, assignation ou conclusions, selon la stratégie retenue</p>
                  <Link href={CT}>Exposer ce litige</Link>
                </div>
              </section>

              {/* 08 · MÉTHODE */}
              <section className="topic" id="intervention" aria-labelledby="h-intervention">
                <span className="label">08 · Comment le cabinet intervient</span>
                <h2 id="h-intervention">Une méthode en quatre temps</h2>
                <ol className="steps">
                  <li><h3>Comprendre</h3><p>{fr("Votre projet ou votre litige, les règles qui s'appliquent et les responsabilités en jeu.")}</p></li>
                  <li><h3>Garder les preuves</h3><p>{fr("Conserver échanges, historiques, transactions et contrats avant qu'ils ne disparaissent.")}</p></li>
                  <li><h3>Choisir comment agir</h3><p>{fr("Mise en conformité, négociation ou procès, selon les faits et le responsable identifié.")}</p></li>
                  <li><h3>Mener le dossier</h3><p>{fr("Rédaction des documents, échanges avec l'AMF ou l'autre partie, procédure jusqu'à son terme.")}</p></li>
                </ol>

                {/* CAS TYPE — du code aux documents */}
                <div className="castype dark" id="cas">
                  <span className="label">Exemple · du code aux documents</span>
                  <h3 className="castype__title">Un jeton présenté comme «&nbsp;immuable&nbsp;»</h3>

                  {/* Bureau : cinq blocs */}
                  <div className="castype__full">
                    <div className="ct-block">
                      <span className="ct-k">La situation</span>
                      <p>{fr("Une société française s'apprête à vendre au public un jeton donnant accès à sa plateforme. Son livre blanc, le document d'information remis aux acheteurs, annonce un contrat « non modifiable » et un nombre de jetons limité.")}</p>
                    </div>
                    <div className="ct-block ct-block--tech">
                      <span className="ct-k">Ce que l’examen technique établit · Khalid Sookia</span>
                      <p>{fr("Khalid Sookia établit que le contrat peut en réalité être modifié : une seule clé, détenue par un dirigeant, permet d'en changer les règles et de créer de nouveaux jetons sans limite.")}</p>
                    </div>
                    <div className="ct-block">
                      <span className="ct-k">La conséquence juridique · Me Alexandre Lazarègue</span>
                      <p>{fr("Le livre blanc ne dit donc pas la vérité sur le fonctionnement du jeton ; or la société répond de l'exactitude de ce qu'il contient (règlement MiCA, art. 15). Les droits attachés au jeton sont aussi revus.")}</p>
                    </div>
                    <div className="ct-block">
                      <span className="ct-k">Ce que le cabinet a fait</span>
                      <ul className="dash">
                        <li>{fr("Toute modification du contrat soumise à plusieurs signatures et à un délai")}</li>
                        <li>{fr("Nombre maximal de jetons inscrit dans le code")}</li>
                        <li>{fr("Livre blanc et conditions générales réécrits avant leur envoi à l'AMF")}</li>
                      </ul>
                    </div>
                    <div className="ct-block ct-block--result">
                      <span className="ct-k">Résultat</span>
                      <p>{fr("L'offre est lancée avec une documentation qui décrit exactement ce que fait le code.")}</p>
                    </div>
                  </div>

                  {/* Mobile : trois blocs */}
                  <div className="castype__mobile">
                    <div className="ct-block">
                      <span className="ct-k">La situation</span>
                      <p>{fr("Une société s'apprête à vendre un jeton au public. Son livre blanc, le document remis aux acheteurs, annonce un contrat « non modifiable » et un nombre de jetons limité.")}</p>
                    </div>
                    <div className="ct-block ct-block--tech">
                      <span className="ct-k">Le constat · technique et juridique</span>
                      <p>{fr("Khalid Sookia établit qu'une seule clé, détenue par un dirigeant, permet de modifier le contrat et de créer des jetons sans limite. Le livre blanc ne dit donc pas la vérité, et la société en répond (MiCA, art. 15).")}</p>
                    </div>
                    <div className="ct-block ct-block--result">
                      <span className="ct-k">Le résultat</span>
                      <p>{fr("Modifications soumises à plusieurs signatures, nombre de jetons plafonné dans le code, livre blanc réécrit avant son envoi à l'AMF : l'offre est lancée avec une documentation qui dit vrai.")}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* LIVRABLES */}
          <section className="full off" id="livrables" aria-labelledby="h-livrables">
            <div className="wrap">
              <span className="label">Ce que le cabinet produit</span>
              <h2 id="h-livrables">Des documents adaptés au projet ou au litige</h2>
              <ul className="docs">
                {[
                  { k: "Conseil", h: "Note de qualification juridique et réglementaire", p: "Les règles qui s'appliquent à votre projet, ce que vous devez faire, et dans quel ordre.", ex: "Une place de marché de NFT : une œuvre unique échappe au règlement MiCA, mais une collection vendue en milliers d'exemplaires peut y être soumise. La note trace la limite." },
                  { k: "Conformité", h: "Dossier d’autorisation PSCA", p: "Le dossier complet déposé auprès de l'Autorité des marchés financiers.", ex: "Un conservateur d'actifs affirmait séparer les actifs de ses clients des siens ; ses portefeuilles ne le permettaient pas. Corrigé avant le dépôt." },
                  { k: "Conformité", h: "Procédures de conformité", p: "Vos règles internes : sécurité, garde des actifs, lutte contre le blanchiment, conflits d'intérêts, réclamations.", ex: "Une plateforme d'échange : pour tout transfert de plus de 1 000 euros vers un portefeuille personnel, elle doit vérifier que le client en est bien le détenteur (règl. (UE) 2023/1113). La procédure dit comment." },
                  { k: "Contrats", h: "Documentation contractuelle", p: "Conditions générales, contrats avec vos prestataires, documentation de vos jetons.", ex: "Des conditions générales obligeaient les particuliers à plaider à Paris : clause sans effet contre eux. Réécrites, avec des règles claires sur la suspension des comptes et la restitution des actifs." },
                  { k: "Technique", h: "Note technique", p: "Ce que montrent les transactions, les accès, les clés et le code, examinés par Khalid Sookia.", ex: "Voir le cas ci-dessus : un jeton présenté comme « immuable »." },
                  { k: "Litige", h: "Mise en demeure, assignation ou écritures", p: "Les actes pour faire valoir vos droits, selon la stratégie retenue.", ex: "Une plateforme bloque sans explication les actifs d'une société en invoquant ses contrôles : demande fondée sur ses propres conditions générales, puis procédure d'urgence." },
                ].map((d) => (
                  <li key={d.h}>
                    <span className="sheet" aria-hidden="true" />
                    <span className="kind">{d.k}</span>
                    <h3>{fr(d.h)}</h3>
                    <p>{fr(d.p)}</p>
                    <Repliable summary="Voir un exemple" className="ex">
                      <p>{fr(d.ex)}</p>
                    </Repliable>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ÉQUIPE */}
          <section className="full" id="equipe" aria-labelledby="h-equipe">
            <div className="wrap">
              <h2 id="h-equipe">Une analyse juridique coordonnée avec la technique</h2>
              <ul className="team">
                <li className="person">
                  <div className="ph ph--filled">
                    <Image src="/images/alexandre-pro.jpg" alt="Me Alexandre Lazarègue" fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" style={{ objectFit: "cover" }} />
                  </div>
                  <div><h3>Me Alexandre Lazarègue</h3><p className="role">Avocat au barreau de Paris</p><p>{fr("Fondateur du cabinet. Règles applicables, autorisations et litiges crypto.")}</p></div>
                </li>
                <li className="person">
                  <div className="ph ph--filled">
                    <Image src="/images/amir-pro.jpg" alt="Me Amir Ben Majed" fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" style={{ objectFit: "cover" }} />
                  </div>
                  <div><h3>Me Amir Ben Majed</h3><p className="role">Avocat au barreau d’Évry</p><p>{fr("Contrats, responsabilité et exécution.")}</p></div>
                </li>
                <li className="person">
                  <div className="ph ph--filled">
                    <Image src={khalid.photo} alt={khalid.nom} fill sizes="(max-width: 900px) 50vw, 33vw" loading="lazy" style={{ objectFit: "cover", objectPosition: khalid.position ?? "center" }} />
                  </div>
                  <div><h3>{khalid.nom}</h3><p className="role">{khalid.statut}</p><p>{fr("Lecture des transactions, des accès, des clés et du code.")}</p></div>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="full off" id="faq" aria-labelledby="h-faq">
            <div className="wrap">
              <h2 id="h-faq">Questions fréquentes</h2>
              <Faq />
            </div>
          </section>

          {/* SUJETS LIÉS — inchangés */}
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

          {/* CONTACT FINAL */}
          <section className="contact dark" aria-labelledby="h-contact">
            <div className="wrap contact-grid">
              <div>
                <span className="label">Projet · Conformité · Litige</span>
                <h2 id="h-contact">Parlons de votre situation</h2>
                <p>{fr("Vous lancez un projet crypto, préparez une demande d'autorisation, rédigez vos contrats ou faites face à un blocage d'actifs ? Décrivez votre situation au cabinet, avec les premiers documents dont vous disposez.")}</p>
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
