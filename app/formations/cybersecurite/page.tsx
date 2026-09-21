import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import styles from "../formations.module.css";

/**
 * Formation cybersécurité et cyberfraude — /formations/cybersecurite.
 * Contenu repris mot pour mot de la maquette (files-19/cybersecurite.html).
 * Liens croisés ramenés aux routes réelles. Header/footer = composants globaux.
 * Rendu statique. À ne pas confondre avec la page de compétence
 * /nos-domaines/cybersecurite (intervention du cabinet) : ceci est la formation.
 */

const PATH = "/formations/cybersecurite";
const TITLE = "Formation cybersécurité en entreprise : phishing et fraude | Lazarègue Avocats";
const DESCRIPTION =
  "Formation et sensibilisation cybersécurité des salariés : phishing, fraude au président, faux RIB, réflexes en cas d’incident. Présentiel ou visioconférence.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL + "/" },
    { "@type": "ListItem", position: 2, name: "Formations", item: SITE_URL + "/formations" },
    { "@type": "ListItem", position: 3, name: "Cybersécurité", item: SITE_URL + PATH },
  ],
};

export default function FormationCyberPage() {
  return (
    <main className={styles.formations} id="contenu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* HERO */}
      <section className="hero-f ghost" aria-labelledby="h1">
        <div className="wrap">
          <nav className="crumb dk" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> / <Link href="/formations">Formations</Link> /{" "}
            <span aria-current="page">Cybersécurité</span>
          </nav>
          <div className="grid">
            <div>
              <p className="label" style={{ marginTop: 22 }}>
                Formation · Sensibilisation cybersécurité, phishing et fraude
              </p>
              <h1 id="h1">Formation cybersécurité et cyberfraude pour les entreprises</h1>
              <p className="lead">
                Apprendre à reconnaître un phishing, une tentative de fraude ou un comportement à
                risque et savoir comment réagir lorsqu’un incident survient.
              </p>
              <p className="tx" style={{ marginTop: 12 }}>
                Une formation destinée aux collaborateurs, directions, fonctions financières, RH,
                juridiques et équipes métier.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="/contact?objet=formation">
                  Construire votre formation cybersécurité →
                </Link>
                <a className="link" href="#programme">
                  Voir le programme
                </a>
              </div>
              <p className="meta" style={{ marginTop: 16 }}>
                Présentiel ou visioconférence · Cas pratiques · Programme adapté à vos risques
              </p>
            </div>
            <div className="phv" role="img" aria-label="Atelier, échanges avec les participants">
              ATELIER, ÉCHANGES AVEC LES PARTICIPANTS — PHOTO RÉELLE À FOURNIR
            </div>
          </div>
        </div>
      </section>

      {/* VOTRE BESOIN — need3 */}
      <section className="sec" aria-labelledby="h-need">
        <div className="wrap">
          <div className="head">
            <p className="label">Votre besoin</p>
            <h2 className="h2" id="h-need">
              Quel risque souhaitez-vous réduire ?
            </h2>
          </div>
          <div className="need3">
            <article>
              <p className="meta">Risque 1</p>
              <h3>Prévenir les erreurs du quotidien</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Former l’ensemble des collaborateurs aux principaux risques liés aux emails, mots de
                passe, documents, outils numériques et demandes inhabituelles.
              </p>
              <div className="tags">
                <span>Liens et pièces jointes</span>
                <span>Partage d’informations</span>
                <span>Faux messages</span>
                <span>Mots de passe</span>
                <span>Usages professionnels</span>
                <span>Signaux faibles</span>
              </div>
              <a className="go" href="#programme">
                Sensibiliser les équipes →
              </a>
            </article>
            <article>
              <p className="meta">Risque 2</p>
              <h3>Prévenir le phishing et les cyberfraudes</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Apprendre à repérer les techniques utilisées pour obtenir un paiement, des
                identifiants ou des informations confidentielles.
              </p>
              <div className="tags">
                <span>Phishing</span>
                <span>Fraude au président</span>
                <span>Faux fournisseur</span>
                <span>Changement de RIB</span>
                <span>Faux conseiller bancaire</span>
                <span>Compromission de messagerie</span>
              </div>
              <a className="go" href="#programme">
                Former aux cyberfraudes →
              </a>
            </article>
            <article>
              <p className="meta">Risque 3</p>
              <h3>Préparer les équipes à réagir à un incident</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Savoir quoi faire lorsque quelqu’un a cliqué, transmis une information, effectué un
                paiement ou constate un comportement anormal.
              </p>
              <div className="tags">
                <span>Qui prévenir</span>
                <span>Quoi conserver</span>
                <span>Quelles actions éviter</span>
                <span>Comment documenter</span>
                <span>Comment limiter l’aggravation</span>
              </div>
              <a className="go" href="#programme">
                Préparer la réaction à l’incident →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* APRÈS LA FORMATION — obj navy */}
      <section className="sec navy" aria-labelledby="h-obj">
        <div className="wrap">
          <div className="head">
            <p className="label">Après la formation</p>
            <h2 className="h2" id="h-obj">
              Vos équipes doivent savoir reconnaître, vérifier et réagir
            </h2>
          </div>
          <div className="obj" style={{ "--n": 3 } as React.CSSProperties}>
            <div>
              <h3>Reconnaître</h3>
              <p>Identifier les indices d’un message, d’une demande ou d’une situation inhabituelle.</p>
            </div>
            <div>
              <h3>Vérifier</h3>
              <p>Savoir interrompre l’automatisme et contrôler une demande par un canal fiable avant d’agir.</p>
            </div>
            <div>
              <h3>Réagir</h3>
              <p>Connaître les premières mesures lorsqu’une erreur, une fraude ou un incident est suspecté.</p>
            </div>
          </div>
          <p className="quote">
            La sécurité ne repose pas sur la capacité d’un collaborateur à devenir expert en
            cybersécurité. Elle repose aussi sur sa capacité à reconnaître qu’une situation mérite
            d’être vérifiée.
          </p>
        </div>
      </section>

      {/* PROGRAMME — prog (6 modules) */}
      <section id="programme" className="sec" aria-labelledby="h-prog">
        <div className="wrap">
          <div className="head">
            <p className="label">Programme</p>
            <h2 className="h2" id="h-prog">
              Un programme construit autour des situations réellement rencontrées par les entreprises
            </h2>
            <p className="lead">
              Une formation de prévention humaine : aucun module technique de sécurité informatique.
            </p>
          </div>
          <div className="prog">
            <article>
              <span className="n">01</span>
              <div>
                <h3>Comprendre comment une attaque atteint un collaborateur</h3>
                <div className="tags">
                  <span>Ingénierie sociale</span>
                  <span>Sentiment d’urgence</span>
                  <span>Autorité</span>
                  <span>Confiance</span>
                  <span>Habitudes professionnelles</span>
                  <span>Collecte préalable d’informations</span>
                </div>
              </div>
              <div className="side">
                <b>Question pratique</b>
                Pourquoi un message frauduleux peut-il paraître parfaitement crédible ?
              </div>
            </article>
            <article>
              <span className="n">02</span>
              <div>
                <h3>Reconnaître un phishing</h3>
                <div className="tags">
                  <span>Adresse d’expéditeur</span>
                  <span>Domaine</span>
                  <span>Lien</span>
                  <span>Pièce jointe</span>
                  <span>Urgence</span>
                  <span>Demande inhabituelle</span>
                  <span>Page de connexion</span>
                  <span>QR code</span>
                  <span>SMS ou messagerie</span>
                </div>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Un collaborateur reçoit un message Microsoft 365 lui demandant de renouveler son mot
                de passe : quels éléments vérifier avant de cliquer ?
              </div>
            </article>
            <article className="hl">
              <span className="n">03</span>
              <div>
                <h3>Reconnaître les principales cyberfraudes</h3>
                <dl>
                  <dt>Fraude au président</dt>
                  <dd>Une personne se présentant comme un dirigeant exige un paiement urgent et confidentiel.</dd>
                  <dt>Faux fournisseur</dt>
                  <dd>Un interlocuteur demande de modifier les coordonnées bancaires utilisées pour régler une facture.</dd>
                  <dt>Compromission de messagerie</dt>
                  <dd>Un fraudeur prend le contrôle d’une boîte email et intervient dans une conversation existante.</dd>
                  <dt>Faux conseiller bancaire</dt>
                  <dd>Un interlocuteur se présente comme la banque et utilise des informations crédibles pour obtenir une action du client.</dd>
                  <dt>Usurpation d’identité</dt>
                  <dd>Le fraudeur exploite l’identité d’un collaborateur, dirigeant ou partenaire.</dd>
                </dl>
              </div>
              <div className="side">
                <b>Question centrale</b>
                À quel moment faut-il cesser de traiter la demande comme habituelle et déclencher une
                vérification indépendante ?
              </div>
            </article>
            <article>
              <span className="n">04</span>
              <div>
                <h3>Sécuriser les paiements et demandes sensibles</h3>
                <p className="tx" style={{ fontSize: 14, marginBottom: 8 }}>
                  Pour : direction, comptabilité, finance, achats, trésorerie, direction
                  administrative.
                </p>
                <div className="tags">
                  <span>Changement de RIB</span>
                  <span>Ordre de virement inhabituel</span>
                  <span>Nouveau bénéficiaire</span>
                  <span>Urgence</span>
                  <span>Validation exceptionnelle</span>
                  <span>Demande venant d’un dirigeant</span>
                  <span>Procédure de contre-appel</span>
                </div>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Un fournisseur connu annonce par email un changement de coordonnées bancaires avant
                une échéance importante : quelles vérifications doivent être effectuées ?
              </div>
            </article>
            <article>
              <span className="n">05</span>
              <div>
                <h3>Que faire lorsqu’une erreur vient d’être commise ?</h3>
                <div className="tags">
                  <span>Clic sur un lien</span>
                  <span>Saisie d’identifiants</span>
                  <span>Téléchargement</span>
                  <span>Transmission d’une information</span>
                  <span>Virement</span>
                  <span>Perte de matériel</span>
                  <span>Anomalie de messagerie</span>
                </div>
              </div>
              <div className="side">
                <b>Réflexes</b>
                <ol>
                  <li>Ne pas masquer l’incident</li>
                  <li>Prévenir immédiatement le bon interlocuteur</li>
                  <li>Conserver les éléments utiles</li>
                  <li>Ne pas prendre d’initiative susceptible d’effacer des traces</li>
                  <li>Suivre la procédure prévue par l’entreprise</li>
                </ol>
              </div>
            </article>
            <article>
              <span className="n">06</span>
              <div>
                <h3>Que fait l’entreprise après le signalement ?</h3>
                <div className="tags">
                  <span>Qualification de l’incident</span>
                  <span>Préservation des preuves</span>
                  <span>Prestataires concernés</span>
                  <span>Assureur cyber</span>
                  <span>Banque si un paiement est concerné</span>
                  <span>Violation de données personnelles</span>
                  <span>Éventuelle notification</span>
                  <span>Plainte</span>
                  <span>Gestion contractuelle</span>
                  <span>Communication</span>
                </div>
                <p className="more">
                  Pour aller plus loin :{" "}
                  <Link href="/nos-domaines/cybercriminalite">
                    intervention du cabinet après une cyberattaque
                  </Link>{" "}
                  · <Link href="/nos-domaines/rgpd-donnees-personnelles">violations de données</Link>{" "}
                  ·{" "}
                  <Link href="/nos-domaines/contentieux-informatique-commercial">
                    responsabilité des prestataires
                  </Link>
                  .
                </p>
              </div>
              <div className="side">
                <b>Niveau de détail</b>
                Le niveau de détail de cette partie est adapté au public formé : managers, juridique,
                conformité et direction en particulier.
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SENSIBILISATION AU PHISHING — mail + idx */}
      <section className="sec ghost" aria-labelledby="h-ph">
        <div className="wrap">
          <div className="head">
            <p className="label">Sensibilisation au phishing</p>
            <h2 className="h2" id="h-ph">
              Savoir repérer un message qui cherche à provoquer une action
            </h2>
          </div>
          <div className="mail">
            <div
              className="box"
              role="img"
              aria-label="Exemple fictif de courriel d’hameçonnage annoté de six indices"
            >
              <p className="hd">EXEMPLE FICTIF · À DES FINS PÉDAGOGIQUES</p>
              <p className="ln">
                <span className="mk">1</span>
                <b>Service Informatique</b>
              </p>
              <p className="ln">
                <span className="mk">2</span>
                <code>&lt;alerte@portail-colaborateurs-verif.example&gt;</code>
              </p>
              <p className="ln">
                Objet : <b>Action requise : votre accès expire aujourd’hui</b>
              </p>
              <div className="body">
                <p>Bonjour,</p>
                <p style={{ marginTop: 8 }}>
                  <span className="mk">3</span> Votre mot de passe expire <b>dans 2 heures</b>. Sans
                  action de votre part, votre messagerie sera suspendue.
                </p>
                <p style={{ marginTop: 8 }}>
                  <span className="mk">4</span> Confirmez vos identifiants pour conserver l’accès :
                </p>
                <p style={{ marginTop: 8 }}>
                  <span className="mk">5</span> <span className="fakebtn">Conserver mon accès</span>
                </p>
                <p style={{ marginTop: 8 }}>
                  <span className="mk">6</span> <code>procedure_securite.html</code>
                </p>
              </div>
            </div>
            <ol className="idx">
              <li>
                <span className="mk">1</span>
                <span>
                  <b>Nom affiché</b>Il reprend un service interne, mais ne prouve rien.
                </span>
              </li>
              <li>
                <span className="mk">2</span>
                <span>
                  <b>Véritable adresse</b>Le domaine d’envoi ne correspond pas à l’organisation.
                </span>
              </li>
              <li>
                <span className="mk">3</span>
                <span>
                  <b>Ton et urgence</b>Un délai très court pousse à agir sans réfléchir.
                </span>
              </li>
              <li>
                <span className="mk">4</span>
                <span>
                  <b>Demande</b>Confirmer ses identifiants par un lien reçu.
                </span>
              </li>
              <li>
                <span className="mk">5</span>
                <span>
                  <b>Lien</b>L’adresse réelle, visible au survol ou à l’appui long, diffère du texte.
                </span>
              </li>
              <li>
                <span className="mk">6</span>
                <span>
                  <b>Pièce jointe</b>Un document inattendu, au format inhabituel.
                </span>
              </li>
            </ol>
          </div>
          <p
            className="quote"
            style={{ color: "var(--ink)", borderTopColor: "var(--border)", fontSize: 20 }}
          >
            L’objectif n’est pas de mémoriser une liste d’indices : les techniques évoluent. Il est
            d’apprendre à reconnaître une rupture dans une situation habituelle et à utiliser une
            méthode de vérification.
          </p>
        </div>
      </section>

      {/* CYBERFRAUDE — fr4 */}
      <section className="sec" aria-labelledby="h-cf">
        <div className="wrap">
          <div className="head">
            <p className="label">Cyberfraude</p>
            <h2 className="h2" id="h-cf">
              Le message frauduleux peut parfaitement ressembler à un échange habituel
            </h2>
          </div>
          <div className="fr4">
            <article>
              <div className="in">
                <p className="meta">Situation 1</p>
                <h3 className="h3" style={{ fontSize: 19 }}>
                  Un dirigeant demande un virement urgent
                </h3>
                <blockquote>
                  « J’ai besoin que ce virement parte avant midi. Opération confidentielle, n’en
                  parle à personne. »
                </blockquote>
                <p className="tx" style={{ fontSize: 15 }}>
                  La demande paraît crédible et confidentielle.
                </p>
              </div>
              <p className="rx">
                <b>Réflexe</b>Vérifier par un canal indépendant.
              </p>
            </article>
            <article>
              <div className="in">
                <p className="meta">Situation 2</p>
                <h3 className="h3" style={{ fontSize: 19 }}>
                  Un fournisseur communique un nouveau RIB
                </h3>
                <blockquote>
                  « Suite à un changement de banque, merci d’utiliser désormais les coordonnées
                  ci-jointes. »
                </blockquote>
                <p className="tx" style={{ fontSize: 15 }}>
                  L’email provient d’une conversation déjà existante.
                </p>
              </div>
              <p className="rx">
                <b>Réflexe</b>Contrôler le changement selon une procédure séparée du canal utilisé
                pour le demander.
              </p>
            </article>
            <article>
              <div className="in">
                <p className="meta">Situation 3</p>
                <h3 className="h3" style={{ fontSize: 19 }}>
                  La banque appelle au sujet d’une opération suspecte
                </h3>
                <blockquote>
                  « Nous bloquons une opération frauduleuse sur votre compte, je vais vous guider. »
                </blockquote>
                <p className="tx" style={{ fontSize: 15 }}>
                  L’interlocuteur connaît plusieurs informations sur l’entreprise.
                </p>
              </div>
              <p className="rx">
                <b>Réflexe</b>Interrompre l’appel et contacter l’établissement via ses coordonnées
                habituelles.
              </p>
            </article>
            <article>
              <div className="in">
                <p className="meta">Situation 4</p>
                <h3 className="h3" style={{ fontSize: 19 }}>
                  Un collaborateur reçoit un faux écran de connexion
                </h3>
                <blockquote>[ Identifiant ]  [ Mot de passe ]  — Se connecter</blockquote>
                <p className="tx" style={{ fontSize: 15 }}>
                  L’interface reproduit celle d’un service qu’il utilise quotidiennement.
                </p>
              </div>
              <p className="rx">
                <b>Réflexe</b>Ne pas saisir ses identifiants à partir du lien reçu.
              </p>
            </article>
          </div>
          <p className="tx" style={{ marginTop: 18, fontSize: 15 }}>
            Un paiement est déjà parti ? Voir{" "}
            <Link href="/ressources/fraude-bancaire-opposition-contestation-remboursement">
              fraude bancaire : opposition, contestation et remboursement
            </Link>
            .
          </p>
        </div>
      </section>

      {/* POUR VOS ÉQUIPES — jobs */}
      <section className="sec ghost" aria-labelledby="h-jobs">
        <div className="wrap">
          <div className="head">
            <p className="label">Pour vos équipes</p>
            <h2 className="h2" id="h-jobs">
              Tous les collaborateurs ne sont pas exposés aux mêmes scénarios
            </h2>
          </div>
          <div className="jobs">
            <div>
              <h3>Tous les collaborateurs</h3>
              <p>Phishing, mots de passe, partage de données, liens, pièces jointes et signalement.</p>
            </div>
            <div>
              <h3>Finance, comptabilité, trésorerie</h3>
              <p>Fraude au virement, changement de RIB, faux dirigeant et procédure de validation.</p>
            </div>
            <div>
              <h3>Direction</h3>
              <p>Usurpation d’identité, fraude au président, gestion de crise et décisions sensibles.</p>
            </div>
            <div>
              <h3>Ressources humaines</h3>
              <p>Faux candidats, documents, données personnelles, demandes urgentes et usurpation.</p>
            </div>
            <div>
              <h3>IT, DSI, RSSI</h3>
              <p>Articulation entre signalement utilisateur, procédure technique et conservation des éléments.</p>
            </div>
            <div>
              <h3>Juridique, conformité, DPO</h3>
              <p>Incident, preuves, obligations contractuelles, données personnelles, notifications et responsabilité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISES EN SITUATION — mis */}
      <section className="sec" aria-labelledby="h-mis">
        <div className="wrap">
          <div className="head">
            <p className="label">Mises en situation</p>
            <h2 className="h2" id="h-mis">
              Les bons réflexes s’apprennent mieux en situation
            </h2>
          </div>
          <div className="mis">
            <article>
              <p className="meta">Mise en situation 1</p>
              <h3>Le changement de RIB</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Un fournisseur habituel transmet de nouvelles coordonnées bancaires deux jours avant
                le paiement d’une facture importante.
              </p>
              <p className="q">Que vérifiez-vous et comment ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 2</p>
              <h3>Le compte Microsoft 365</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Une alerte demande au collaborateur de confirmer immédiatement ses identifiants.
              </p>
              <p className="q">Quels indices doivent déclencher une vérification ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 3</p>
              <h3>L’ordre confidentiel du dirigeant</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Un dirigeant demande depuis son téléphone un paiement urgent sans respecter la
                procédure habituelle.
              </p>
              <p className="q">Que doit faire le collaborateur ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 4</p>
              <h3>L’erreur vient d’avoir lieu</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Un collaborateur pense avoir communiqué ses identifiants sur une fausse page.
              </p>
              <p className="q">Que doit-il faire dans les minutes qui suivent ?</p>
            </article>
          </div>
        </div>
      </section>

      {/* LIVRABLES — liv */}
      <section className="sec ghost" aria-labelledby="h-liv">
        <div className="wrap">
          <div className="head">
            <p className="label">Après la formation</p>
            <h2 className="h2" id="h-liv">
              Des outils à conserver lorsque la situation se présentera
            </h2>
            <p className="meta">Selon le programme défini.</p>
          </div>
          <div className="liv" style={{ "--n": 4 } as React.CSSProperties}>
            <article>
              <h3>Fiche réflexe phishing</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Les vérifications essentielles avant de cliquer, répondre ou transmettre une
                information.
              </p>
            </article>
            <article>
              <h3>Fiche réflexe fraude au virement</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Les contrôles à effectuer lorsqu’un paiement ou un changement de coordonnées
                bancaires paraît inhabituel.
              </p>
            </article>
            <article>
              <h3>Fiche « J’ai cliqué : que faire ? »</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Les premières actions lorsqu’une erreur vient d’être commise.
              </p>
            </article>
            <article>
              <h3>Support pédagogique</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Synthèse des méthodes et cas abordés pendant la session.
              </p>
            </article>
            <article className="wide">
              <h3>Procédure interne adaptée</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Lorsque cela fait partie de la mission : adaptation ou création d’un circuit d’alerte
                et de vérification correspondant à l’organisation.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* MODALITÉS — mod + steps4 */}
      <section className="sec" aria-labelledby="h-mod">
        <div className="wrap">
          <div className="head">
            <p className="label">Modalités et sur mesure</p>
            <h2 className="h2" id="h-mod">
              Une formation adaptée à vos équipes et à vos risques
            </h2>
          </div>
          <div className="mod" style={{ "--n": 5 } as React.CSSProperties}>
            <div>
              <h3>Dans vos locaux</h3>
              <p>Formation organisée auprès des collaborateurs concernés.</p>
            </div>
            <div>
              <h3>À distance</h3>
              <p>Formation cybersécurité en visioconférence lorsque les équipes sont réparties sur plusieurs sites.</p>
            </div>
            <div>
              <h3>Sensibilisation courte</h3>
              <p>Format centré sur les principaux risques et réflexes.</p>
            </div>
            <div>
              <h3>Formation approfondie</h3>
              <p>Programme intégrant davantage de mises en situation, les procédures de l’entreprise et certains publics particulièrement exposés.</p>
            </div>
            <div>
              <h3>Sur mesure</h3>
              <p>Les scénarios peuvent être adaptés au secteur, aux métiers et aux procédures de l’organisation.</p>
            </div>
          </div>
          <div className="steps4">
            <div>
              <span>01</span>
              <h3>Identifier les publics exposés</h3>
              <p>Fonctions, outils et opérations sensibles.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Sélectionner les scénarios</h3>
              <p>Phishing, paiements, messagerie, données, identité ou autres situations.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Former en situation</h3>
              <p>Expliquer, analyser et faire appliquer les méthodes de vérification.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Formaliser les réflexes</h3>
              <p>Supports et procédures adaptés au périmètre défini.</p>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href="/contact?objet=formation">
              Construire votre formation →
            </Link>
          </p>
        </div>
      </section>

      {/* LE CABINET — cab */}
      <section className="sec ghost" aria-labelledby="h-cab">
        <div className="wrap cab">
          <div className="phv" role="img" aria-label="Intervention du cabinet">
            PHOTO RÉELLE — INTERVENTION, À FOURNIR
          </div>
          <div>
            <p className="label">Le cabinet</p>
            <h2 className="h2" id="h-cab" style={{ marginTop: 10 }}>
              Une formation nourrie par les incidents et contentieux numériques
            </h2>
            <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.6 }}>
              Lazarègue Avocats intervient sur les problématiques de cybercriminalité, fraudes
              bancaires, phishing, usurpation d’identité, violations de données et responsabilité
              liées aux incidents numériques.
            </p>
            <p className="tx" style={{ marginTop: 10 }}>
              Cette pratique permet de montrer non seulement comment débute une fraude, mais également
              ce qui devient déterminant après l’incident : chronologie, alertes, procédures
              internes, preuves, échanges avec la banque ou les prestataires et décisions prises dans
              les premières heures.
            </p>
            <p className="pull">
              Les participants comprennent ainsi pourquoi certains réflexes comptent avant, pendant
              et après l’incident.
            </p>
            <p className="tx" style={{ marginTop: 14, fontSize: 14 }}>
              Autres formations : <Link href="/formations/rgpd">RGPD et DPO</Link> ·{" "}
              <Link href="/formations/intelligence-artificielle-entreprise">
                IA et AI Act en entreprise
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec faq" aria-labelledby="h-faq">
        <div className="wrap faq-grid">
          <div className="head" style={{ margin: 0 }}>
            <p className="label">Questions fréquentes</p>
            <h2 className="h2" id="h-faq">
              Questions sur la formation cybersécurité
            </h2>
          </div>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            <details open>
              <summary>À qui s’adresse cette formation ?</summary>
              <p>
                Elle est destinée aux entreprises qui souhaitent sensibiliser leurs collaborateurs
                aux risques cyber, au phishing et aux principales cyberfraudes. Le contenu peut être
                adapté aux fonctions les plus exposées comme la finance, la comptabilité, la
                direction, les RH ou les équipes juridiques.
              </p>
            </details>
            <details>
              <summary>La formation nécessite-t-elle des connaissances informatiques ?</summary>
              <p>
                Non. Elle est conçue pour permettre aux collaborateurs d’identifier des situations à
                risque et d’adopter les bons réflexes sans exiger de compétence technique
                particulière.
              </p>
            </details>
            <details>
              <summary>Peut-on organiser une formation uniquement sur le phishing ?</summary>
              <p>Oui. Un programme peut être centré sur le phishing, la compromission d’identifiants et les méthodes de vérification.</p>
            </details>
            <details>
              <summary>Pouvez-vous former spécifiquement les équipes finance et comptabilité ?</summary>
              <p>
                Oui. Le programme peut être renforcé sur la fraude au virement, les changements de
                coordonnées bancaires, les faux fournisseurs et les demandes émanant prétendument
                d’un dirigeant.
              </p>
            </details>
            <details>
              <summary>La formation peut-elle être réalisée à distance ?</summary>
              <p>Oui. Elle peut être organisée en visioconférence lorsque les équipes sont réparties sur plusieurs sites.</p>
            </details>
            <details>
              <summary>Pouvez-vous utiliser des situations propres à notre entreprise ?</summary>
              <p>Oui. Le programme et les cas pratiques peuvent être adaptés aux métiers, procédures et risques identifiés avec l’entreprise.</p>
            </details>
            <details>
              <summary>S’agit-il d’une formation technique en cybersécurité ?</summary>
              <p>
                Non. Cette formation vise principalement la prévention humaine, l’identification des
                tentatives de fraude et les réactions attendues des collaborateurs. Elle n’a pas pour
                objet de former des analystes, administrateurs ou spécialistes techniques de la
                cybersécurité.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA final — navy */}
      <section className="sec navy" aria-labelledby="h-cta">
        <div className="wrap">
          <div className="head" style={{ marginBottom: 24 }}>
            <p className="label">Votre formation</p>
            <h2 className="h2" id="h-cta">
              Préparons vos équipes aux situations qu’elles peuvent réellement rencontrer
            </h2>
            <p className="lead">
              Indiquez-nous les collaborateurs concernés, les risques que vous souhaitez traiter et
              les situations auxquelles votre organisation est exposée. Nous construirons le
              programme adapté.
            </p>
          </div>
          <div className="hero-cta" style={{ marginTop: 0 }}>
            <Link className="btn" href="/contact?objet=formation">
              Nous parler de votre besoin →
            </Link>
            <Link className="link" href="/formations" style={{ color: "#fff" }}>
              Voir les autres formations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
