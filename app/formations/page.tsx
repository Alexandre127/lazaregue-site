import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_URL } from "@/lib/site-url";
import styles from "./formations.module.css";

/**
 * Hub « Formations » — /formations.
 * Contenu repris mot pour mot de la maquette (files-19/index.html). Header et
 * footer sont les composants globaux du site ; la page ne fournit que <main>.
 * Rendu 100 % statique (aucune interactivité : FAQ = <details> natifs).
 */

const PATH = "/formations";
const TITLE = "Formations IA, RGPD et cybersécurité pour les entreprises | Lazarègue Avocats";
const DESCRIPTION =
  "Formations en droit du numérique pour les entreprises : IA et AI Act, RGPD et DPO, cybersécurité et cyberfraude. Dans vos locaux ou à distance.";

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
    { "@type": "ListItem", position: 2, name: "Formations", item: SITE_URL + PATH },
  ],
};

export default function FormationsPage() {
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
            <Link href="/">Accueil</Link> / <span aria-current="page">Formations</span>
          </nav>
          <div className="grid">
            <div>
              <p className="label" style={{ marginTop: 22 }}>
                Formations · Entreprises
              </p>
              <h1 id="h1">Formations IA, RGPD et cybersécurité pour les entreprises</h1>
              <p className="lead">
                Des formations juridiques et opérationnelles en droit du numérique, conçues pour
                aider les entreprises à encadrer leurs usages, comprendre leurs obligations et
                donner aux équipes les bons réflexes.
              </p>
              <div className="hero-cta">
                <a className="btn" href="#formations">
                  Découvrir les trois formations →
                </a>
                <Link className="link" href="/contact?objet=formation">
                  Construire une formation sur mesure
                </Link>
              </div>
              <p className="meta" style={{ marginTop: 16 }}>
                Dans vos locaux ou à distance · Programmes adaptés à vos équipes · Cas pratiques
              </p>
            </div>
            <div className="phv has-photo">
              <Image
                src="/images/formations/opage-formation.png"
                alt="Formation animée par le cabinet Lazarègue Avocats"
                fill
                sizes="(max-width: 1100px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* VOTRE BESOIN — sitrows */}
      <section className="sec" aria-labelledby="h-sit">
        <div className="wrap">
          <div className="head">
            <p className="label">Votre besoin</p>
            <h2 className="h2" id="h-sit">
              Dans quelle situation vous trouvez-vous ?
            </h2>
          </div>
          <nav className="sitrows" aria-label="Choisir selon votre situation">
            <Link href="/formations/intelligence-artificielle-entreprise">
              <strong>Nous utilisons déjà ChatGPT, Copilot ou d’autres outils d’IA</strong>
              <span>
                Encadrer les usages, les données transmises, la confidentialité et les risques.
              </span>
              <em>Formation IA →</em>
            </Link>
            <Link href="/formations/intelligence-artificielle-entreprise#programme">
              <strong>
                Nous devons comprendre ce que l’AI Act change pour notre organisation
              </strong>
              <span>
                Identifier les systèmes concernés, les rôles et les obligations à mettre en place.
              </span>
              <em>Formation IA · volet AI Act →</em>
            </Link>
            <Link href="/formations/rgpd">
              <strong>Nous voulons former nos équipes au RGPD</strong>
              <span>
                Donner aux collaborateurs des règles simples et des réflexes adaptés à leur
                activité.
              </span>
              <em>Formation RGPD →</em>
            </Link>
            <Link href="/formations/rgpd#h-dpo">
              <strong>Notre DPO ou nos référents doivent approfondir certains sujets</strong>
              <span>
                Adapter la formation aux fonctions conformité et protection des données.
              </span>
              <em>Formation DPO →</em>
            </Link>
            <Link href="/formations/cybersecurite">
              <strong>Nous voulons réduire le risque humain face aux cyberfraudes</strong>
              <span>
                Préparer les équipes à identifier le phishing, la fraude au virement et les
                incidents cyber.
              </span>
              <em>Formation cybersécurité →</em>
            </Link>
            <Link href="/contact?objet=formation">
              <strong>Notre besoin ne correspond pas exactement à un programme existant</strong>
              <span>Construire une intervention spécifique avec le cabinet.</span>
              <em>Formation sur mesure →</em>
            </Link>
          </nav>
        </div>
      </section>

      {/* LES FORMATIONS — f3 */}
      <section id="formations" className="sec ghost" aria-labelledby="h-f3">
        <div className="wrap">
          <div className="head">
            <p className="label">Les formations</p>
            <h2 className="h2" id="h-f3">
              Trois formations, adaptées à vos équipes
            </h2>
          </div>
          <div className="f3">
            <article>
              <div className="top">
                <p className="meta" style={{ color: "rgba(255,255,255,.75)" }}>
                  Formation 1
                </p>
                <h3>IA et AI Act en entreprise</h3>
              </div>
              <div className="in">
                <p className="tx">
                  Former les équipes aux bons usages de l’IA générative — confidentialité, données,
                  propriété intellectuelle, fiabilité, règles internes — et les fonctions de
                  pilotage aux obligations de l’AI Act.
                </p>
                <p className="for">
                  <b>Pour :</b> Directions, juristes, RH, équipes métier, marketing, IT, DPO.
                </p>
                <Link className="btn" href="/formations/intelligence-artificielle-entreprise">
                  Découvrir la formation IA →
                </Link>
              </div>
            </article>
            <article>
              <div className="top">
                <p className="meta" style={{ color: "rgba(255,255,255,.75)" }}>
                  Formation 2
                </p>
                <h3>RGPD et DPO</h3>
              </div>
              <div className="in">
                <p className="tx">
                  Former les équipes, référents internes et DPO aux obligations de protection des
                  données et à leur mise en œuvre dans les activités quotidiennes de l’entreprise.
                </p>
                <p className="for">
                  <b>Pour :</b> Équipes métier, RH, marketing, IT, juristes, référents RGPD et DPO.
                </p>
                <Link className="btn" href="/formations/rgpd">
                  Découvrir la formation RGPD →
                </Link>
              </div>
            </article>
            <article>
              <div className="top">
                <p className="meta" style={{ color: "rgba(255,255,255,.75)" }}>
                  Formation 3
                </p>
                <h3>Cybersécurité et cyberfraude</h3>
              </div>
              <div className="in">
                <p className="tx">
                  Préparer les équipes à identifier les risques, reconnaître les tentatives de
                  fraude et adopter les bons réflexes lorsqu’un incident survient.
                </p>
                <p className="for">
                  <b>Pour :</b> Tous les collaborateurs ; finance, comptabilité, direction, RH,
                  juridique.
                </p>
                <Link className="btn" href="/formations/cybersecurite">
                  Découvrir la formation cybersécurité →
                </Link>
              </div>
            </article>
          </div>
          <div className="sm">
            <div>
              <p style={{ fontWeight: 600, fontSize: 18 }}>
                Formation sur mesure en droit du numérique
              </p>
              <p className="tx" style={{ fontSize: 15 }}>
                Contrats informatiques, réseaux sociaux, plateformes, propriété intellectuelle,
                gouvernance des données : un programme construit à partir des activités et des
                risques de votre organisation.
              </p>
            </div>
            <Link className="btn-o" href="/contact?objet=formation">
              Construire une formation sur mesure
            </Link>
          </div>
        </div>
      </section>

      {/* NOTRE APPROCHE — navy */}
      <section className="sec navy" aria-labelledby="h-app">
        <div className="wrap">
          <div className="head">
            <p className="label">Notre approche</p>
            <h2 className="h2" id="h-app">
              Des formations juridiques pensées pour être utilisées après la formation
            </h2>
          </div>
          <div className="obj">
            <div>
              <h3>Comprendre</h3>
              <p>
                Identifier les règles réellement applicables et comprendre les risques liés aux
                pratiques de l’entreprise.
              </p>
            </div>
            <div>
              <h3>Décider</h3>
              <p>
                Savoir quelles questions poser et quelle réaction adopter face à une situation
                concrète.
              </p>
            </div>
            <div>
              <h3>Appliquer</h3>
              <p>
                Repartir avec des méthodes, procédures, documents et réflexes utilisables par les
                équipes : supports, cas pratiques, check-lists et, selon le besoin, outils internes
                (charte IA, fiche réflexe RGPD, procédure de violation de données, fiche réflexe
                cyber).
              </p>
            </div>
          </div>
          <p className="quote">
            Notre objectif n’est pas que les participants mémorisent davantage de textes. Il est
            qu’ils sachent quoi faire lorsqu’une situation se présente.
          </p>
        </div>
      </section>

      {/* POUR VOS ÉQUIPES — jobs */}
      <section className="sec" aria-labelledby="h-jobs">
        <div className="wrap">
          <div className="head">
            <p className="label">Pour vos équipes</p>
            <h2 className="h2" id="h-jobs">
              Le même sujet ne se présente pas de la même manière selon les fonctions
            </h2>
          </div>
          <div className="jobs">
            <div>
              <h3>Direction générale</h3>
              <p>Comprendre les risques, arbitrer et organiser la gouvernance.</p>
            </div>
            <div>
              <h3>Juridique, conformité, DPO</h3>
              <p>Maîtriser les obligations, la documentation et les procédures.</p>
            </div>
            <div>
              <h3>Ressources humaines</h3>
              <p>Encadrer les usages des salariés et les traitements de données RH.</p>
            </div>
            <div>
              <h3>DSI, RSSI, IT</h3>
              <p>Articuler architecture technique, sécurité et responsabilités juridiques.</p>
            </div>
            <div>
              <h3>Marketing, communication</h3>
              <p>Données personnelles, contenus, IA générative et propriété intellectuelle.</p>
            </div>
            <div>
              <h3>Équipes métier</h3>
              <p>Acquérir des règles simples et immédiatement applicables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS — mod */}
      <section className="sec ghost" aria-labelledby="h-fmt">
        <div className="wrap">
          <div className="head">
            <p className="label">Formats</p>
            <h2 className="h2" id="h-fmt">
              Un format adapté à votre organisation
            </h2>
          </div>
          <div className="mod" style={{ "--n": 4 } as React.CSSProperties}>
            <div>
              <h3>Dans vos locaux</h3>
              <p>Formation organisée directement auprès de vos équipes.</p>
            </div>
            <div>
              <h3>À distance</h3>
              <p>Session en visioconférence lorsque les participants sont répartis sur plusieurs sites.</p>
            </div>
            <div>
              <h3>Format court ou journée complète</h3>
              <p>Programme adapté au niveau des participants et aux objectifs recherchés.</p>
            </div>
            <div>
              <h3>Sur mesure</h3>
              <p>Adaptation du programme, des exemples et des cas pratiques à votre activité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AVOCAT AUGMENTÉ — aa navy */}
      <section className="sec navy" aria-labelledby="h-aa">
        <div className="wrap aa">
          <div>
            <p className="label">Professions du droit</p>
            <h2 className="h2" id="h-aa" style={{ marginTop: 10 }}>
              Vous êtes avocat ou juriste ? L’Avocat Augmenté
            </h2>
            <p className="lead" style={{ marginTop: 12 }}>
              Une journée consacrée à l’exercice du métier à l’ère de l’intelligence artificielle :
              développement du cabinet, analyse de dossier, rédaction, recherche juridique, OSINT,
              automatisation et pilotage.
            </p>
            <div className="tags" style={{ marginTop: 14 }}>
              <span>1 journée · 7 heures</span>
              <span>10 participants maximum</span>
              <span>Travail sur un dossier réel</span>
            </div>
            <p style={{ marginTop: 20 }}>
              <Link className="btn" href="/formations/ia-avocat">
                Découvrir L’Avocat Augmenté →
              </Link>
            </p>
          </div>
          <p className="pull">
            L’IA n’est pas seulement un outil de productivité. Elle devient un nouvel environnement
            de travail pour l’avocat.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec faq" aria-labelledby="h-faq">
        <div className="wrap faq-grid">
          <div className="head" style={{ margin: 0 }}>
            <p className="label">Questions fréquentes</p>
            <h2 className="h2" id="h-faq">
              Questions fréquentes sur les formations
            </h2>
          </div>
          <div style={{ borderTop: "1px solid var(--ink)" }}>
            <details open>
              <summary>Les formations sont-elles réservées aux juristes ?</summary>
              <p>Non. Les contenus sont adaptés au niveau et aux fonctions des participants.</p>
            </details>
            <details>
              <summary>La formation IA couvre-t-elle l’AI Act ?</summary>
              <p>
                [Réponse à valider] Oui. La formation IA en entreprise comprend un volet consacré à
                l’AI Act — qualification des systèmes, rôles, niveaux de risque, obligations —
                approfondi pour la direction, le juridique, la conformité et le DPO.
              </p>
            </details>
            <details>
              <summary>La formation RGPD peut-elle être destinée à un DPO ?</summary>
              <p>
                Oui. Elle peut être adaptée à des équipes opérationnelles, des référents internes ou
                des DPO selon le niveau recherché.
              </p>
            </details>
            <details>
              <summary>Pouvez-vous former uniquement une équipe ou une direction ?</summary>
              <p>Oui. Le programme peut être construit pour une fonction précise.</p>
            </details>
            <details>
              <summary>Les formations peuvent-elles avoir lieu dans l’entreprise ?</summary>
              <p>Oui.</p>
            </details>
            <details>
              <summary>Proposez-vous des formations à distance ?</summary>
              <p>Oui.</p>
            </details>
            <details>
              <summary>Les programmes peuvent-ils être personnalisés ?</summary>
              <p>
                Oui. Les situations, procédures et documents de l’entreprise peuvent être intégrés à
                la préparation de la formation lorsque cela est pertinent.
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
              Parlons de la formation dont vos équipes ont besoin
            </h2>
            <p className="lead">
              Indiquez-nous le sujet, les personnes concernées et votre objectif. Nous pourrons
              définir avec vous le format et le programme adaptés.
            </p>
          </div>
          <div className="hero-cta" style={{ marginTop: 0 }}>
            <Link className="btn" href="/contact?objet=formation">
              Exposer votre besoin de formation →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
