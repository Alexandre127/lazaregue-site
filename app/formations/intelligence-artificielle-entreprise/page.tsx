import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import styles from "../formations.module.css";

/**
 * Formation IA en entreprise (IA générative + AI Act) —
 * /formations/intelligence-artificielle-entreprise.
 * Contenu repris mot pour mot de la maquette (files-19/…). Liens croisés ramenés
 * aux routes réelles. Header/footer = composants globaux. Rendu statique.
 *
 * Réserve : deux réponses de la FAQ portent encore la mention « [Réponse à
 * valider] » présente dans la maquette (signalée au cabinet avant publication).
 */

const PATH = "/formations/intelligence-artificielle-entreprise";
const TITLE = "Formation IA en entreprise : IA générative et AI Act | Lazarègue Avocats";
const DESCRIPTION =
  "Formation IA en entreprise : bons usages de l’IA générative (ChatGPT, Copilot), confidentialité, hallucinations, charte IA et obligations de l’AI Act.";

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
    { "@type": "ListItem", position: 3, name: "IA et AI Act en entreprise", item: SITE_URL + PATH },
  ],
};

export default function FormationIaPage() {
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
            <span aria-current="page">IA et AI Act en entreprise</span>
          </nav>
          <div className="grid">
            <div>
              <p className="label" style={{ marginTop: 22 }}>
                Formation · IA générative et AI Act
              </p>
              <h1 id="h1">Formation IA en entreprise : usages de l’IA générative et AI Act</h1>
              <p className="lead">
                Apprendre à utiliser les outils d’intelligence artificielle générative dans un cadre
                professionnel tout en maîtrisant les risques liés aux données, à la confidentialité,
                aux contenus générés et à la fiabilité des réponses — et comprendre ce que l’AI Act
                impose à l’entreprise.
              </p>
              <p className="tx" style={{ marginTop: 12 }}>
                Une formation destinée aux directions, juristes, RH, équipes métier, communication,
                marketing et fonctions support.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="/contact?objet=formation">
                  Construire votre formation IA →
                </Link>
                <a className="link" href="#programme">
                  Voir le programme
                </a>
              </div>
              <p className="meta" style={{ marginTop: 16 }}>
                Présentiel ou visioconférence · Cas pratiques · Programme adapté à vos usages
              </p>
            </div>
            <div className="phv" role="img" aria-label="Participants utilisant un outil d’IA">
              PARTICIPANTS UTILISANT UN OUTIL D’IA — PHOTO RÉELLE À FOURNIR
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
              Pourquoi souhaitez-vous former vos équipes à l’IA ?
            </h2>
          </div>
          <div className="need3">
            <article>
              <p className="meta">Situation 1</p>
              <h3>Nos collaborateurs utilisent déjà ChatGPT ou d’autres IA</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Ils expérimentent ces outils mais les règles relatives aux informations transmises,
                aux contenus générés ou à la vérification des réponses ne sont pas toujours claires.
              </p>
              <a className="go" href="#programme">
                Encadrer les usages existants →
              </a>
            </article>
            <article>
              <p className="meta">Situation 2</p>
              <h3>Nous voulons déployer l’IA dans plusieurs équipes</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                L’entreprise souhaite permettre certains usages tout en définissant des méthodes et
                des limites communes.
              </p>
              <a className="go" href="#programme">
                Former avant le déploiement →
              </a>
            </article>
            <article>
              <p className="meta">Situation 3</p>
              <h3>Nous devons appliquer l’AI Act et fixer des règles internes</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                L’objectif est de former les collaborateurs, de comprendre les obligations du
                règlement et de préparer une charte, des consignes ou une gouvernance cohérente avec
                les usages de l’entreprise.
              </p>
              <a className="go" href="#programme">
                Construire un cadre d’utilisation →
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
              Savoir utiliser l’IA, vérifier son résultat et protéger l’entreprise
            </h2>
          </div>
          <div className="obj" style={{ "--n": 3 } as React.CSSProperties}>
            <div>
              <h3>Utiliser</h3>
              <p>
                Choisir les usages adaptés et comprendre ce que l’on peut raisonnablement demander à
                une IA générative.
              </p>
            </div>
            <div>
              <h3>Vérifier</h3>
              <p>
                Ne pas traiter une réponse produite par l’IA comme une information automatiquement
                exacte, complète ou exploitable.
              </p>
            </div>
            <div>
              <h3>Protéger</h3>
              <p>
                Savoir quelles données, informations ou documents nécessitent des précautions
                particulières avant d’être transmis à un outil.
              </p>
            </div>
          </div>
          <p className="quote">
            L’objectif n’est pas d’apprendre une liste de prompts. Il est de donner aux
            collaborateurs une méthode qu’ils pourront conserver lorsque les outils auront changé.
          </p>
        </div>
      </section>

      {/* PROGRAMME — prog (8 modules) */}
      <section id="programme" className="sec" aria-labelledby="h-prog">
        <div className="wrap">
          <div className="head">
            <p className="label">Programme</p>
            <h2 className="h2" id="h-prog">
              Un programme construit autour de l’utilisation réelle de l’IA en entreprise
            </h2>
            <p className="lead">
              Huit modules, sans mathématiques ni architecture technique des modèles. Le module 08
              est consacré à l’AI Act.
            </p>
          </div>
          <div className="prog">
            <article>
              <span className="n">01</span>
              <div>
                <h3>Comprendre ce que fait réellement une IA générative</h3>
                <div className="tags">
                  <span>Moteur de recherche et IA générative</span>
                  <span>Modèles de langage</span>
                  <span>Génération probabiliste</span>
                  <span>Contexte</span>
                  <span>Limites</span>
                  <span>Erreurs possibles</span>
                </div>
              </div>
              <div className="side">
                <b>Objectif</b>
                Comprendre suffisamment le fonctionnement pour ne pas attribuer à l’outil des
                capacités qu’il n’a pas.
              </div>
            </article>
            <article>
              <span className="n">02</span>
              <div>
                <h3>Identifier les usages utiles</h3>
                <div className="tags">
                  <span>Synthèse</span>
                  <span>Recherche préparatoire</span>
                  <span>Reformulation</span>
                  <span>Rédaction</span>
                  <span>Brainstorming</span>
                  <span>Traduction</span>
                  <span>Classification</span>
                  <span>Analyse de documents</span>
                  <span>Préparation d’un support</span>
                  <span>Automatisation de certaines tâches</span>
                </div>
              </div>
              <div className="side">
                <b>Question pratique</b>
                Quelles tâches peuvent être assistées et lesquelles nécessitent un contrôle humain
                particulièrement important ?
              </div>
            </article>
            <article>
              <span className="n">03</span>
              <div>
                <h3>Savoir quelles informations peuvent être transmises</h3>
                <div className="tags">
                  <span>Données personnelles</span>
                  <span>Données clients</span>
                  <span>Informations confidentielles</span>
                  <span>Secrets d’affaires</span>
                  <span>Documents internes</span>
                  <span>Contrats</span>
                  <span>Informations relatives aux salariés</span>
                  <span>Données sensibles</span>
                </div>
                <p className="more">
                  Remplacer le réflexe « copier-coller puis réfléchir » par une vérification
                  préalable. Données personnelles : voir{" "}
                  <Link href="/formations/rgpd">la formation RGPD</Link>.
                </p>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Un collaborateur veut déposer un contrat client entier dans un outil d’IA pour
                obtenir un résumé : quelles questions doit-il se poser avant de le faire ?
              </div>
            </article>
            <article>
              <span className="n">04</span>
              <div>
                <h3>Vérifier les réponses et gérer les hallucinations</h3>
                <div className="tags">
                  <span>Réponse plausible mais fausse</span>
                  <span>Sources inventées</span>
                  <span>Chiffres inexacts</span>
                  <span>Omissions</span>
                  <span>Contexte mal compris</span>
                  <span>Biais</span>
                  <span>Niveau de confiance trompeur</span>
                </div>
                <dl>
                  <dt>Vérifier la source</dt>
                  <dd>D’où vient l’information ?</dd>
                  <dt>Vérifier les faits</dt>
                  <dd>Peut-on confirmer les éléments importants ?</dd>
                  <dt>Vérifier la tâche</dt>
                  <dd>Le résultat correspond-il réellement à ce qui était demandé ?</dd>
                  <dt>Vérifier l’impact</dt>
                  <dd>Quelle serait la conséquence d’une erreur ?</dd>
                </dl>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Une IA produit une réponse très convaincante contenant une référence juridique ou
                technique inexistante.
              </div>
            </article>
            <article>
              <span className="n">05</span>
              <div>
                <h3>Propriété intellectuelle et contenus générés</h3>
                <div className="tags">
                  <span>Textes</span>
                  <span>Images</span>
                  <span>Code</span>
                  <span>Contenus tiers</span>
                  <span>Droits existants</span>
                  <span>Réutilisation</span>
                  <span>Validation des productions</span>
                </div>
                <p className="more">
                  L’objectif n’est pas un cours complet de propriété intellectuelle, mais le repérage
                  des situations qui appellent une vérification.
                </p>
              </div>
              <div className="side">
                <b>Question</b>
                Peut-on publier ou exploiter professionnellement un contenu simplement parce qu’une
                IA l’a généré ?
              </div>
            </article>
            <article>
              <span className="n">06</span>
              <div>
                <h3>Confidentialité et sécurité</h3>
                <div className="tags">
                  <span>Comptes personnels et professionnels</span>
                  <span>Accès aux outils</span>
                  <span>Historique</span>
                  <span>Partage</span>
                  <span>Extensions</span>
                  <span>Outils non autorisés</span>
                  <span>Documents confidentiels</span>
                  <span>Données sensibles</span>
                  <span>Risques liés aux outils tiers</span>
                </div>
                <p className="more">
                  Voir aussi <Link href="/formations/cybersecurite">la formation cybersécurité</Link>{" "}
                  et, pour les fournisseurs d’outils,{" "}
                  <Link href="/nos-domaines/contrats-informatiques">les contrats informatiques</Link>.
                </p>
              </div>
              <div className="side">
                <b>Cas pratique</b>
                Un collaborateur utilise son compte personnel pour traiter un document professionnel.
              </div>
            </article>
            <article>
              <span className="n">07</span>
              <div>
                <h3>Mettre en place les règles de l’entreprise</h3>
                <div className="tags">
                  <span>Outils autorisés</span>
                  <span>Usages autorisés</span>
                  <span>Usages soumis à validation</span>
                  <span>Informations interdites ou sensibles</span>
                  <span>Contrôle humain</span>
                  <span>Responsabilités</span>
                  <span>Signalement d’un problème</span>
                  <span>Documentation</span>
                  <span>Mise à jour des règles</span>
                </div>
              </div>
              <div className="side">
                <b>Transition</b>
                Ces règles peuvent ensuite être formalisées dans une charte IA adaptée à
                l’organisation.
              </div>
            </article>
            <article className="hl">
              <span className="n">08</span>
              <div>
                <h3>AI Act : ce que le règlement impose à l’entreprise</h3>
                <div className="tags">
                  <span>Qualification des systèmes</span>
                  <span>Rôles : fournisseur, déployeur</span>
                  <span>Niveaux de risque</span>
                  <span>Pratiques interdites</span>
                  <span>Transparence</span>
                  <span>Maîtrise de l’IA (article 4)</span>
                  <span>Documentation</span>
                  <span>Gouvernance</span>
                  <span>Calendrier d’application</span>
                </div>
                <p className="more">
                  Approfondi pour la direction, le juridique, la conformité, le DPO et les
                  responsables IA. Pour un projet à sécuriser plutôt qu’une équipe à former :{" "}
                  <Link href="/nos-domaines/avocat-intelligence-artificielle">
                    l’accompagnement IA et AI Act du cabinet
                  </Link>
                  .
                </p>
              </div>
              <div className="side">
                <b>Question centrale</b>
                Quels systèmes l’entreprise utilise-t-elle, à quel titre, et quelles obligations en
                découlent aujourd’hui ?
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FORMATION IA GÉNÉRATIVE — m4 */}
      <section className="sec ghost" aria-labelledby="h-gen">
        <div className="wrap">
          <div className="head">
            <p className="label">Formation IA générative</p>
            <h2 className="h2" id="h-gen">
              ChatGPT, Copilot, Gemini… apprendre une méthode qui ne dépend pas d’un seul outil
            </h2>
            <p className="lead">
              Les outils évoluent rapidement. Une formation centrée exclusivement sur l’interface
              actuelle de ChatGPT risquerait de devenir rapidement obsolète. Le programme combine
              donc la maîtrise des outils disponibles et des principes qui restent valables lorsqu’un
              service ou un modèle change.
            </p>
          </div>
          <p className="meta" style={{ marginBottom: 10 }}>
            Exemple fictif · méthode en quatre temps
          </p>
          <div className="m4">
            <div>
              <b>1 · Demande</b>« Résume ce compte rendu de réunion en cinq points pour l’équipe
              commerciale. » Contexte, objectif et format précisés. Document sans donnée sensible.
            </div>
            <div>
              <b>2 · Réponse</b>Cinq points clairs… dont une échéance qui n’apparaît pas dans le
              compte rendu.
            </div>
            <div>
              <b>3 · Contrôle</b>✓ Points conformes au document · ✕ Échéance non sourcée : retirée ·
              ✓ Aucune omission importante
            </div>
            <div>
              <b>4 · Utilisation</b>Synthèse corrigée, relue, puis transmise à l’équipe.
            </div>
          </div>
        </div>
      </section>

      {/* CADRE INTERNE — charte */}
      <section className="sec" aria-labelledby="h-ch">
        <div className="wrap">
          <div className="head">
            <p className="label">Cadre interne</p>
            <h2 className="h2" id="h-ch">
              Former les équipes permet aussi de fixer des règles communes
            </h2>
            <p className="lead">
              Lorsque les usages se développent sans cadre partagé, les collaborateurs doivent
              décider seuls de ce qu’ils peuvent transmettre, générer ou réutiliser.
            </p>
          </div>
          <p className="meta" style={{ marginBottom: 10 }}>
            Charte d’utilisation de l’IA — [Organisation]
          </p>
          <div className="charte">
            <div>
              <span>Art. 1</span>
              <h3>Outils</h3>
              <p>Quels services sont autorisés ?</p>
            </div>
            <div>
              <span>Art. 2</span>
              <h3>Données</h3>
              <p>Quelles informations ne doivent pas être transmises ?</p>
            </div>
            <div>
              <span>Art. 3</span>
              <h3>Usages</h3>
              <p>Quelles tâches peuvent être assistées ?</p>
            </div>
            <div>
              <span>Art. 4</span>
              <h3>Validation</h3>
              <p>Quels résultats nécessitent obligatoirement un contrôle humain ?</p>
            </div>
            <div>
              <span>Art. 5</span>
              <h3>Contenus</h3>
              <p>Quelles vérifications effectuer avant publication ou réutilisation ?</p>
            </div>
            <div>
              <span>Art. 6</span>
              <h3>Incident</h3>
              <p>Qui contacter lorsqu’un problème survient ?</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEUX PUBLICS — two */}
      <section className="sec ghost" aria-labelledby="h-2p">
        <div className="wrap">
          <div className="head">
            <p className="label">Deux publics, une formation</p>
            <h2 className="h2" id="h-2p">
              Usages de l’IA pour les équipes, AI Act pour les fonctions de pilotage
            </h2>
          </div>
          <div className="two">
            <article>
              <h3>Volet usages — équipes</h3>
              <p className="tx" style={{ marginBottom: 10 }}>
                Permettre aux collaborateurs d’utiliser correctement l’intelligence artificielle dans
                leur activité quotidienne.
              </p>
              <div className="tags">
                <span>Usages</span>
                <span>Données</span>
                <span>Confidentialité</span>
                <span>Hallucinations</span>
                <span>Contenus</span>
                <span>Propriété intellectuelle</span>
                <span>Contrôle humain</span>
                <span>Règles internes</span>
              </div>
              <p className="tx" style={{ marginTop: 12, fontSize: 14 }}>
                <b>Public.</b> Équipes métier, RH, marketing, communication, juristes, fonctions
                support et management.
              </p>
            </article>
            <article className="dark">
              <h3>Volet AI Act — pilotage</h3>
              <p style={{ marginBottom: 10 }}>
                Comprendre les obligations réglementaires et organiser la gouvernance et la
                conformité de l’entreprise.
              </p>
              <div className="tags">
                <span>Qualification des systèmes</span>
                <span>Rôles</span>
                <span>Niveaux de risque</span>
                <span>Obligations</span>
                <span>Documentation</span>
                <span>Gouvernance</span>
                <span>Déploiement réglementaire</span>
              </div>
              <p style={{ marginTop: 12, fontSize: 14 }}>
                <b>Public.</b> Direction, juridique, conformité, DPO, responsables IA, IT.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* POUR VOS ÉQUIPES — jobs */}
      <section className="sec" aria-labelledby="h-jobs">
        <div className="wrap">
          <div className="head">
            <p className="label">Pour vos équipes</p>
            <h2 className="h2" id="h-jobs">
              Les usages de l’IA ne sont pas les mêmes selon les fonctions
            </h2>
          </div>
          <div className="jobs">
            <div>
              <h3>Direction</h3>
              <p>Gouvernance, décisions, risques et cadre d’utilisation.</p>
            </div>
            <div>
              <h3>Juridique, conformité, DPO</h3>
              <p>Confidentialité, données, contrats, documentation et conformité.</p>
            </div>
            <div>
              <h3>Ressources humaines</h3>
              <p>CV, recrutement, évaluations, données salariés, rédaction et décisions assistées.</p>
            </div>
            <div>
              <h3>Marketing, communication</h3>
              <p>Génération de contenus, images, campagnes, données, propriété intellectuelle et vérification.</p>
            </div>
            <div>
              <h3>IT, DSI</h3>
              <p>Outils autorisés, accès, sécurité, fournisseurs et intégration dans le système d’information.</p>
            </div>
            <div>
              <h3>Équipes métier</h3>
              <p>Utilisation quotidienne, vérification des réponses et protection des informations de l’entreprise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISES EN SITUATION — mis */}
      <section className="sec ghost" aria-labelledby="h-mis">
        <div className="wrap">
          <div className="head">
            <p className="label">Mises en situation</p>
            <h2 className="h2" id="h-mis">
              Les règles deviennent claires lorsqu’elles sont appliquées à une situation réelle
            </h2>
          </div>
          <div className="mis">
            <article>
              <p className="meta">Mise en situation 1</p>
              <h3>Résumer un contrat avec une IA</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Un collaborateur souhaite transmettre le document intégral à un outil externe.
              </p>
              <p className="q">Que faut-il vérifier avant de l’envoyer ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 2</p>
              <h3>Préparer un document à partir d’une réponse ChatGPT</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Le texte paraît excellent et contient plusieurs informations précises.
              </p>
              <p className="q">Quelles vérifications effectuer avant de l’utiliser ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 3</p>
              <h3>Générer une image pour une campagne</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Le service marketing obtient une image adaptée à sa communication.
              </p>
              <p className="q">Le fait que l’image soit générée suffit-il à autoriser son utilisation ?</p>
            </article>
            <article>
              <p className="meta">Mise en situation 4</p>
              <h3>Utiliser l’IA pour traiter des candidatures</h3>
              <p className="tx" style={{ fontSize: 15 }}>
                Une équipe RH veut automatiser une partie de l’analyse.
              </p>
              <p className="q">Quels risques nécessitent une attention particulière avant le déploiement ?</p>
            </article>
          </div>
        </div>
      </section>

      {/* LIVRABLES — liv */}
      <section className="sec" aria-labelledby="h-liv">
        <div className="wrap">
          <div className="head">
            <p className="label">Après la formation</p>
            <h2 className="h2" id="h-liv">
              Des outils que les collaborateurs peuvent réellement réutiliser
            </h2>
            <p className="meta">Selon le programme défini.</p>
          </div>
          <div className="liv" style={{ "--n": 4 } as React.CSSProperties}>
            <article>
              <h3>Fiche réflexe « Avant d’utiliser une IA »</h3>
              <ul>
                <li>Quelles données vais-je transmettre ?</li>
                <li>Cet outil est-il autorisé ?</li>
                <li>Le résultat doit-il être vérifié ?</li>
                <li>Pourrai-je expliquer comment j’ai obtenu cette information ?</li>
              </ul>
            </article>
            <article>
              <h3>Support de formation</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Synthèse des principaux usages, risques et méthodes étudiés.
              </p>
            </article>
            <article>
              <h3>Grille de vérification d’un résultat</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Méthode de contrôle avant réutilisation.
              </p>
            </article>
            <article>
              <h3>Cas pratiques adaptés aux métiers</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Situations proches de celles auxquelles les collaborateurs sont réellement
                confrontés.
              </p>
            </article>
            <article className="wide">
              <h3>Charte ou règles internes · traçabilité article 4</h3>
              <p className="tx" style={{ fontSize: 14 }}>
                Lorsque la mission le prévoit : document adapté aux outils et usages de
                l’organisation. Les supports et justificatifs de participation permettent de
                documenter les mesures prises au titre de l’article 4 de l’AI Act.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* MODALITÉS — mod + steps4 */}
      <section className="sec ghost" aria-labelledby="h-mod">
        <div className="wrap">
          <div className="head">
            <p className="label">Modalités et sur mesure</p>
            <h2 className="h2" id="h-mod">
              Une formation adaptée à votre organisation
            </h2>
          </div>
          <div className="mod" style={{ "--n": 5 } as React.CSSProperties}>
            <div>
              <h3>Dans vos locaux</h3>
              <p>Formation organisée directement auprès des équipes.</p>
            </div>
            <div>
              <h3>À distance</h3>
              <p>Formation IA à distance, en visioconférence, pour les équipes réparties sur plusieurs sites.</p>
            </div>
            <div>
              <h3>Sensibilisation</h3>
              <p>Format resserré destiné à donner un socle commun et des réflexes essentiels.</p>
            </div>
            <div>
              <h3>Formation approfondie</h3>
              <p>Programme plus complet incluant davantage de cas pratiques et les usages propres aux métiers concernés.</p>
            </div>
            <div>
              <h3>Sur mesure</h3>
              <p>Adaptation aux outils, fonctions et règles internes de l’entreprise.</p>
            </div>
          </div>
          <div className="steps4">
            <div>
              <span>01</span>
              <h3>Identifier les usages</h3>
              <p>Quels outils sont déjà utilisés et pour quelles tâches ?</p>
            </div>
            <div>
              <span>02</span>
              <h3>Identifier les risques</h3>
              <p>Données, confidentialité, contenus, erreurs, décisions ou gouvernance.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Construire les cas</h3>
              <p>Situations correspondant aux métiers des participants.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Formaliser les règles</h3>
              <p>Supports, réflexes et, lorsque prévu, cadre interne.</p>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href="/contact?objet=formation">
              Construire votre formation IA →
            </Link>
          </p>
        </div>
      </section>

      {/* LE CABINET — cab */}
      <section className="sec" aria-labelledby="h-cab">
        <div className="wrap cab">
          <div className="phv" role="img" aria-label="Intervention du cabinet">
            PHOTO RÉELLE — INTERVENTION, À FOURNIR
          </div>
          <div>
            <p className="label">Le cabinet</p>
            <h2 className="h2" id="h-cab" style={{ marginTop: 10 }}>
              Former à l’IA à partir des risques rencontrés par les entreprises
            </h2>
            <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.6 }}>
              Lazarègue Avocats accompagne les entreprises sur les questions d’intelligence
              artificielle, de données personnelles, de contrats informatiques, de propriété
              intellectuelle et de conformité numérique.
            </p>
            <p className="tx" style={{ marginTop: 10 }}>
              Cette pratique permet d’aborder les usages de l’IA à partir des questions qui se posent
              réellement lorsqu’une entreprise déploie ces outils : quelles données transmettre,
              quels outils autoriser, comment contrôler les résultats, quelles responsabilités
              organiser et quelles règles internes mettre en place.
            </p>
            <p className="pull">
              La formation relie l’utilisation de l’outil aux conséquences concrètes pour
              l’organisation.
            </p>
            <p className="tx" style={{ marginTop: 14, fontSize: 14 }}>
              Autres formations : <Link href="/formations/rgpd">RGPD et DPO</Link> ·{" "}
              <Link href="/formations/cybersecurite">cybersécurité</Link>. Vous êtes avocat ou
              juriste ? <Link href="/formations/ia-avocat">L’Avocat Augmenté</Link>.
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
              Questions sur la formation IA et AI Act en entreprise
            </h2>
          </div>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            <details open>
              <summary>À qui s’adresse la formation IA ?</summary>
              <p>
                Elle peut être destinée aux collaborateurs qui utilisent déjà des outils d’IA
                générative, aux équipes qui s’apprêtent à les adopter ou aux fonctions chargées
                d’encadrer leur utilisation. Le programme est adapté aux métiers et au niveau des
                participants.
              </p>
            </details>
            <details>
              <summary>La formation porte-t-elle sur ChatGPT ?</summary>
              <p>
                ChatGPT peut être utilisé parmi les exemples et outils étudiés. La formation ne
                dépend toutefois pas d’un service unique : elle vise à transmettre des méthodes
                applicables aux différents outils d’IA générative utilisés dans l’entreprise.
              </p>
            </details>
            <details>
              <summary>Faut-il déjà savoir utiliser l’intelligence artificielle ?</summary>
              <p>
                Non. Le niveau de la formation est adapté aux participants. Elle peut servir à
                découvrir les usages professionnels de l’IA comme à structurer des pratiques déjà
                existantes.
              </p>
            </details>
            <details>
              <summary>La formation couvre-t-elle l’AI Act ?</summary>
              <p>
                [Réponse à valider] Oui. Le module 08 présente les obligations du règlement européen
                sur l’IA : qualification des systèmes, rôles, niveaux de risque, transparence et
                maîtrise de l’IA. Il est approfondi pour la direction, le juridique, la conformité et
                le DPO.
              </p>
            </details>
            <details>
              <summary>La formation permet-elle de répondre à l’obligation de l’article 4 de l’AI Act ?</summary>
              <p>
                [Réponse à valider] Elle fait partie des mesures qu’une entreprise peut prendre pour
                assurer la maîtrise de l’IA par ses équipes, et les supports et justificatifs de
                participation permettent de documenter ces mesures. Elle ne constitue pas, à elle
                seule, une certification de conformité.
              </p>
            </details>
            <details>
              <summary>Peut-on organiser une formation IA à distance ?</summary>
              <p>Oui. La formation peut être organisée en visioconférence lorsque les participants sont répartis sur plusieurs sites.</p>
            </details>
            <details>
              <summary>Peut-on adapter les cas pratiques à notre entreprise ?</summary>
              <p>Oui. Les exercices et situations peuvent être construits à partir des métiers, outils et usages identifiés avec l’organisation.</p>
            </details>
            <details>
              <summary>Pouvez-vous nous aider à élaborer une charte IA ?</summary>
              <p>
                Oui. Lorsque le besoin le justifie, la formation peut être articulée avec la
                définition ou la révision de règles internes d’utilisation de l’intelligence
                artificielle.
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
              Donnons à vos équipes un cadre clair pour utiliser l’IA
            </h2>
            <p className="lead">
              Indiquez-nous les personnes concernées, les outils déjà utilisés et les situations que
              vous souhaitez encadrer. Nous construirons le programme adapté à votre organisation.
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
