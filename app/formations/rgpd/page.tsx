import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import styles from "../formations.module.css";

/**
 * Formation RGPD et DPO — /formations/rgpd.
 * Contenu repris mot pour mot de la maquette (files-19/rgpd.html). Liens croisés
 * ramenés aux routes réelles du site (/nos-domaines/rgpd-donnees-personnelles,
 * /formations/…). Header et footer = composants globaux. Rendu statique.
 */

const PATH = "/formations/rgpd";
const TITLE = "Formation RGPD et DPO pour les entreprises | Lazarègue Avocats";
const DESCRIPTION =
  "Formation RGPD des équipes, sensibilisation RGPD et formation DPO : droits des personnes, prestataires, violations de données, conformité. Intra-entreprise ou à distance.";

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
    { "@type": "ListItem", position: 3, name: "RGPD et DPO", item: SITE_URL + PATH },
  ],
};

export default function FormationRgpdPage() {
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
            <span aria-current="page">RGPD et DPO</span>
          </nav>
          <div className="grid">
            <div>
              <p className="label" style={{ marginTop: 22 }}>
                Formation · RGPD et DPO
              </p>
              <h1 id="h1">Formation RGPD pour les entreprises et les DPO</h1>
              <p className="lead">
                Comprendre les règles de protection des données, savoir les appliquer dans les
                situations quotidiennes et donner aux équipes les bons réflexes.
              </p>
              <p className="tx" style={{ marginTop: 12 }}>
                La formation est adaptée au niveau et aux fonctions des participants : équipes
                métier, RH, marketing, IT, directions juridiques, référents RGPD ou DPO.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="/contact?objet=formation">
                  Construire votre formation RGPD →
                </Link>
                <a className="link" href="#programme">
                  Voir le programme
                </a>
              </div>
              <p className="meta" style={{ marginTop: 16 }}>
                Présentiel ou visioconférence · Programme adaptable · Cas pratiques
              </p>
            </div>
            <div className="phv" role="img" aria-label="Formation ou intervention">
              FORMATION OU INTERVENTION — PHOTO RÉELLE À FOURNIR
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
              Quelle formation RGPD correspond à votre situation ?
            </h2>
          </div>
          <div className="need3">
            <article>
              <p className="meta">Parcours 1</p>
              <h3>Sensibilisation RGPD des équipes</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Donner aux collaborateurs les règles essentielles pour traiter correctement les
                données personnelles dans leur activité quotidienne.
              </p>
              <div className="tags">
                <span>RH</span>
                <span>Marketing</span>
                <span>Commercial</span>
                <span>Communication</span>
                <span>Équipes opérationnelles</span>
              </div>
              <a className="go" href="#programme">
                Former vos équipes →
              </a>
            </article>
            <article>
              <p className="meta">Parcours 2</p>
              <h3>Former une fonction métier</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Approfondir les questions RGPD propres à une direction : ressources humaines,
                marketing, informatique, juridique ou métier.
              </p>
              <div className="tags">
                <span>Recrutement et données RH</span>
                <span>Prospection</span>
                <span>Cookies</span>
                <span>Prestataires</span>
                <span>Sécurité</span>
                <span>Droits des personnes</span>
              </div>
              <a className="go" href="#programme">
                Adapter la formation à une équipe →
              </a>
            </article>
            <article>
              <p className="meta">Parcours 3</p>
              <h3>Formation DPO et référent RGPD</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Consolider la maîtrise du RGPD et travailler sur les situations auxquelles le DPO ou
                le référent est réellement confronté dans l’organisation.
              </p>
              <div className="tags">
                <span>Registre</span>
                <span>Analyses d’impact</span>
                <span>Sous-traitants</span>
                <span>Violations de données</span>
                <span>Demandes d’exercice de droits</span>
                <span>Documentation</span>
                <span>Contrôles CNIL</span>
              </div>
              <a className="go" href="#programme">
                Construire un parcours DPO →
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
              À l’issue de la formation, les participants doivent savoir quoi faire
            </h2>
          </div>
          <div className="obj" style={{ "--n": 4 } as React.CSSProperties}>
            <div>
              <h3>Identifier</h3>
              <p>Reconnaître une donnée personnelle, un traitement et les principaux risques associés.</p>
            </div>
            <div>
              <h3>Vérifier</h3>
              <p>Savoir quelles questions poser avant de collecter, partager, conserver ou réutiliser des données.</p>
            </div>
            <div>
              <h3>Réagir</h3>
              <p>
                Identifier les bons réflexes face à une demande d’exercice de droits, une erreur ou
                une violation de données.
              </p>
            </div>
            <div>
              <h3>Documenter</h3>
              <p>Comprendre quels éléments doivent être conservés pour démontrer la conformité de l’entreprise.</p>
            </div>
          </div>
          <p className="quote">
            Le but n’est pas de transformer chaque participant en spécialiste du RGPD. Il est de lui
            permettre d’identifier une situation à risque et d’adopter le bon réflexe.
          </p>
        </div>
      </section>

      {/* PROGRAMME — prog */}
      <section id="programme" className="sec" aria-labelledby="h-prog">
        <div className="wrap">
          <div className="head">
            <p className="label">Programme</p>
            <h2 className="h2" id="h-prog">
              Un programme RGPD construit autour des situations rencontrées en entreprise
            </h2>
            <p className="lead">
              Six modules composent le programme de formation RGPD ; leur place et leur durée
              varient selon les participants.
            </p>
          </div>
          <div className="prog">
            <article>
              <span className="n">01</span>
              <div>
                <h3>Comprendre ce que protège le RGPD</h3>
                <div className="tags">
                  <span>Donnée personnelle</span>
                  <span>Traitement</span>
                  <span>Responsable de traitement</span>
                  <span>Sous-traitant</span>
                  <span>Données sensibles</span>
                  <span>Personnes concernées</span>
                </div>
              </div>
              <div className="side">
                <b>Objectif</b>
                Disposer du vocabulaire nécessaire sans entrer dans un cours théorique inutile.
              </div>
            </article>
            <article>
              <span className="n">02</span>
              <div>
                <h3>Peut-on utiliser cette donnée ?</h3>
                <div className="tags">
                  <span>Finalité</span>
                  <span>Base juridique</span>
                  <span>Consentement</span>
                  <span>Intérêt légitime</span>
                  <span>Obligation légale</span>
                  <span>Minimisation</span>
                </div>
              </div>
              <div className="side">
                <b>Question pratique</b>
                Avons-nous réellement le droit de collecter et d’utiliser cette donnée pour cet
                objectif ?
              </div>
            </article>
            <article>
              <span className="n">03</span>
              <div>
                <h3>Informer et respecter les droits des personnes</h3>
                <div className="tags">
                  <span>Information</span>
                  <span>Accès</span>
                  <span>Rectification</span>
                  <span>Effacement</span>
                  <span>Opposition</span>
                  <span>Limitation</span>
                  <span>Portabilité lorsque applicable</span>
                </div>
              </div>
              <div className="side">
                <b>Cas pratique possible</b>
                Un client ou un salarié demande l’ensemble de ses données : que faut-il faire ?
              </div>
            </article>
            <article>
              <span className="n">04</span>
              <div>
                <h3>Partager des données avec un prestataire</h3>
                <div className="tags">
                  <span>Sous-traitance</span>
                  <span>Contrats</span>
                  <span>Accès aux données</span>
                  <span>Sécurité</span>
                  <span>Transferts</span>
                  <span>Contrôle du prestataire</span>
                </div>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Un nouveau logiciel SaaS traite les données de clients : quelles vérifications
                effectuer avant de signer ?
              </div>
            </article>
            <article>
              <span className="n">05</span>
              <div>
                <h3>Sécurité et violation de données</h3>
                <div className="tags">
                  <span>Erreur humaine</span>
                  <span>Phishing</span>
                  <span>Perte</span>
                  <span>Divulgation</span>
                  <span>Accès non autorisé</span>
                  <span>Qualification de l’incident</span>
                  <span>Documentation</span>
                  <span>Notification lorsque nécessaire</span>
                </div>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Un collaborateur envoie un fichier contenant des données personnelles au mauvais
                destinataire : que fait-on dans les premières heures ?
              </div>
            </article>
            <article>
              <span className="n">06</span>
              <div>
                <h3>Démontrer la conformité</h3>
                <div className="tags">
                  <span>Registre</span>
                  <span>Documentation</span>
                  <span>Politiques internes</span>
                  <span>Durées de conservation</span>
                  <span>Analyses d’impact</span>
                  <span>Preuves</span>
                  <span>Gouvernance</span>
                </div>
              </div>
              <div className="side">
                <b>Niveau de détail</b>
                Le niveau de détail de chacun de ces modules dépend du public formé.
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FORMATION DPO — two */}
      <section className="sec ghost" aria-labelledby="h-dpo">
        <div className="wrap">
          <div className="head">
            <p className="label">Formation DPO</p>
            <h2 className="h2" id="h-dpo">
              Vous êtes DPO ou référent RGPD ?
            </h2>
            <p className="lead">
              Le programme peut être approfondi pour les personnes chargées d’organiser ou de
              piloter la conformité au sein de l’entreprise : une formation DPO construite sur leurs
              missions réelles.
            </p>
          </div>
          <div className="two">
            <article>
              <h3>Maîtriser les outils du DPO</h3>
              <ul>
                <li>Cartographie des traitements</li>
                <li>Registre</li>
                <li>Analyse d’impact</li>
                <li>Gestion des droits</li>
                <li>Procédures de violation</li>
                <li>Relations avec les sous-traitants</li>
                <li>Documentation de conformité</li>
              </ul>
            </article>
            <article className="dark">
              <h3>Savoir arbitrer les situations difficiles</h3>
              <ul>
                <li>Déterminer une base juridique</li>
                <li>Apprécier un intérêt légitime</li>
                <li>Qualifier un risque</li>
                <li>Déterminer si une AIPD est nécessaire</li>
                <li>Organiser une réponse à un incident</li>
                <li>Documenter une décision</li>
                <li>Préparer un contrôle</li>
              </ul>
            </article>
          </div>
          <p className="tx" style={{ marginTop: 18 }}>
            Le contenu peut être construit à partir de vos propres procédures, documents ou
            difficultés opérationnelles.{" "}
            <Link href="/contact?objet=formation-dpo">Échanger sur un parcours DPO →</Link>
          </p>
          <p className="tx" style={{ fontSize: 14, marginTop: 6 }}>
            Besoin d’un DPO plutôt que d’une formation ?{" "}
            <Link href="/nos-domaines/rgpd-donnees-personnelles">Voir le DPO externalisé</Link>.
          </p>
        </div>
      </section>

      {/* MISES EN SITUATION — mis */}
      <section className="sec" aria-labelledby="h-mis">
        <div className="wrap">
          <div className="head">
            <p className="label">Mises en situation</p>
            <h2 className="h2" id="h-mis">
              Le RGPD devient plus clair lorsqu’il part d’une situation réelle
            </h2>
          </div>
          <div className="mis">
            <article>
              <p className="meta">Mise en situation 1</p>
              <h3>Un salarié demande l’accès à toutes ses données</h3>
              <p className="q">Qui traite la demande ? Quelles données communiquer ? Dans quel délai ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 2</p>
              <h3>Un nouveau logiciel traite les données de l’entreprise</h3>
              <p className="q">Quelles vérifications effectuer avant de confier les données au prestataire ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 3</p>
              <h3>Un fichier est envoyé au mauvais destinataire</h3>
              <p className="q">Comment qualifier l’incident et faut-il notifier une violation ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 4</p>
              <h3>Le marketing souhaite réutiliser une base de contacts</h3>
              <p className="q">La nouvelle utilisation est-elle possible et à quelles conditions ?</p>
            </article>
          </div>
          <p className="tx" style={{ marginTop: 18, fontSize: 15 }}>
            Prestataires et logiciels SaaS : voir aussi{" "}
            <Link href="/nos-domaines/contrats-informatiques">les contrats informatiques</Link>.
            Fichier envoyé par erreur ou piratage : voir{" "}
            <Link href="/formations/cybersecurite">la formation cybersécurité</Link>.
          </p>
        </div>
      </section>

      {/* POUR VOS ÉQUIPES — jobs */}
      <section className="sec ghost" aria-labelledby="h-jobs">
        <div className="wrap">
          <div className="head">
            <p className="label">Pour vos équipes</p>
            <h2 className="h2" id="h-jobs">
              Le RGPD ne se présente pas de la même manière selon les métiers
            </h2>
          </div>
          <div className="jobs">
            <div>
              <h3>Ressources humaines</h3>
              <p>
                Recrutement, dossiers salariés, données sensibles, accès, conservation et outils RH :
                les points clés d’une formation RGPD RH.
              </p>
            </div>
            <div>
              <h3>Marketing, communication</h3>
              <p>Prospection, bases de contacts, cookies, mesure d’audience, campagnes et prestataires.</p>
            </div>
            <div>
              <h3>Direction juridique, conformité</h3>
              <p>Bases juridiques, contrats, responsabilités, documentation et gestion des risques.</p>
            </div>
            <div>
              <h3>DSI, RSSI, équipes IT</h3>
              <p>Accès, sécurité, prestataires, incidents, durée de conservation et exigences de privacy by design.</p>
            </div>
            <div>
              <h3>Direction générale</h3>
              <p>Gouvernance, responsabilités, priorisation des risques et organisation de la conformité.</p>
            </div>
            <div>
              <h3>DPO, référent RGPD</h3>
              <p>Pilotage, documentation, analyses d’impact, incidents, droits et relations avec la CNIL.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVRABLES — liv */}
      <section className="sec ghost" aria-labelledby="h-liv">
        <div className="wrap">
          <div className="head">
            <p className="label">Après la formation</p>
            <h2 className="h2" id="h-liv">
              Les participants repartent avec des outils utilisables
            </h2>
            <p className="meta">Selon le programme défini.</p>
          </div>
          <div className="liv" style={{ "--n": 4 } as React.CSSProperties}>
            <article>
              <h3>Support pédagogique</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Synthèse structurée des règles et méthodes vues pendant la formation.
              </p>
            </article>
            <article>
              <h3>Fiches réflexes</h3>
              <ul>
                <li>Demande d’exercice de droits</li>
                <li>Violation de données</li>
                <li>Recours à un prestataire</li>
                <li>Nouvelle collecte de données</li>
              </ul>
            </article>
            <article>
              <h3>Check-list RGPD</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Questions à se poser avant de lancer un nouveau traitement ou outil.
              </p>
            </article>
            <article>
              <h3>Documents adaptés au besoin</h3>
              <ul>
                <li>Modèle de procédure</li>
                <li>Trame de registre</li>
                <li>Grille prestataire</li>
                <li>Support de sensibilisation</li>
                <li>Grille d’analyse d’un traitement</li>
              </ul>
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
              Une formation adaptée à votre organisation
            </h2>
          </div>
          <div className="mod" style={{ "--n": 4 } as React.CSSProperties}>
            <div>
              <h3>Présentiel</h3>
              <p>Dans vos locaux ou dans un lieu convenu avec le cabinet.</p>
            </div>
            <div>
              <h3>À distance</h3>
              <p>Formation RGPD à distance, en visioconférence, pour les équipes réparties sur plusieurs sites.</p>
            </div>
            <div>
              <h3>Format adaptable</h3>
              <p>Le programme peut être resserré sur une sensibilisation ou approfondi selon le niveau des participants.</p>
            </div>
            <div>
              <h3>Intra-entreprise</h3>
              <p>Les exemples et cas pratiques peuvent être adaptés à l’activité et aux procédures de l’organisation.</p>
            </div>
          </div>
          <div className="steps4">
            <div>
              <span>01</span>
              <h3>Identifier</h3>
              <p>Qui doit être formé et quelles situations les participants rencontrent-ils ?</p>
            </div>
            <div>
              <span>02</span>
              <h3>Prioriser</h3>
              <p>Quels risques, traitements ou procédures doivent être compris en priorité ?</p>
            </div>
            <div>
              <span>03</span>
              <h3>Former</h3>
              <p>Explications, exemples et mises en situation.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Outiller</h3>
              <p>Remise des supports et outils définis selon le programme.</p>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href="/contact?objet=formation">
              Construire votre programme RGPD →
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
              Le RGPD expliqué à partir de sa mise en œuvre réelle
            </h2>
            <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.6 }}>
              Lazarègue Avocats accompagne les entreprises sur leurs problématiques de protection des
              données, de conformité numérique, de contrats informatiques, d’intelligence
              artificielle et de cybersécurité.
            </p>
            <p className="tx" style={{ marginTop: 10 }}>
              Les formations s’appuient sur les situations rencontrées dans la pratique : nouveaux
              traitements, relations avec les prestataires, incidents, demandes de personnes
              concernées, documentation de conformité et contrôles.
            </p>
            <p className="pull">La formation relie la règle juridique à la décision opérationnelle.</p>
            <p className="tx" style={{ marginTop: 14, fontSize: 14 }}>
              L’accompagnement du cabinet en conformité :{" "}
              <Link href="/nos-domaines/rgpd-donnees-personnelles">voir la page RGPD</Link>. Autres
              formations :{" "}
              <Link href="/formations/intelligence-artificielle-entreprise">
                IA et AI Act en entreprise
              </Link>{" "}
              · <Link href="/formations/cybersecurite">cybersécurité</Link>.
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
              Questions sur la formation RGPD
            </h2>
          </div>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            <details open>
              <summary>À qui s’adresse une formation RGPD ?</summary>
              <p>
                Elle peut être destinée aux collaborateurs qui manipulent des données personnelles,
                aux fonctions RH, marketing, IT ou juridiques, ainsi qu’aux référents RGPD et DPO. Le
                niveau du programme est adapté aux participants.
              </p>
            </details>
            <details>
              <summary>Proposez-vous une formation spécifique pour les DPO ?</summary>
              <p>
                Oui. Le programme peut être approfondi pour un DPO ou un référent RGPD et porter
                notamment sur le registre, les analyses d’impact, les sous-traitants, les violations
                de données, l’exercice des droits et la documentation de conformité.
              </p>
            </details>
            <details>
              <summary>Quelle est la différence entre une sensibilisation RGPD et une formation DPO ?</summary>
              <p>
                La sensibilisation vise principalement à donner aux collaborateurs les réflexes
                nécessaires dans leur activité. Le parcours DPO approfondit les méthodes et outils
                nécessaires au pilotage de la conformité.
              </p>
            </details>
            <details>
              <summary>Peut-on organiser une formation RGPD directement dans l’entreprise ?</summary>
              <p>Oui. La formation peut être organisée pour une ou plusieurs équipes et adaptée à l’activité de l’entreprise.</p>
            </details>
            <details>
              <summary>Proposez-vous une formation RGPD à distance ?</summary>
              <p>Oui. La formation peut être organisée en visioconférence lorsque les participants sont répartis sur plusieurs sites.</p>
            </details>
            <details>
              <summary>Peut-on adapter le programme à nos métiers ?</summary>
              <p>
                Oui. Les sujets, exemples et cas pratiques peuvent être adaptés aux fonctions des
                participants et aux situations rencontrées dans l’organisation.
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
              Construisons une formation RGPD adaptée à vos équipes
            </h2>
            <p className="lead">
              Indiquez-nous les personnes concernées, leur niveau et les situations qu’elles
              rencontrent. Nous définirons le programme et le format adaptés à votre organisation.
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
