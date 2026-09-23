import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./ia.module.css";
import { FAQ_IA } from "./faq-ia";
import { FaqAccordion } from "./_components/FaqAccordion";
import MatriceTabs from "./_components/MatriceTabs";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/avocat-intelligence-artificielle";

const TITLE = "Avocat IA à Paris – Conformité AI Act et gouvernance | Lazarègue Avocats";
const DESCRIPTION =
  "Audit AI Act, registre des systèmes, charte IA, contrats, gouvernance et défense en cas de contrôle. Accompagnement des entreprises à Paris et partout en France.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat IA & AI Act — Lazarègue Avocats",
      description:
        "Audit AI Act, registre des systèmes d'IA, charte IA, contrats fournisseurs, gouvernance et défense en cas de contrôle ou de contentieux.",
      url: `${URL_BASE}${PATH}`,
      areaServed: { "@type": "Country", name: "France" },
      serviceType: "Conformité AI Act, gouvernance de l'intelligence artificielle, audit de conformité IA, contentieux des systèmes d'IA",
      provider: { "@id": `${URL_BASE}/#cabinet` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Intelligence artificielle et AI Act", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_IA.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") } })),
    },
    { "@type": "Person", name: "Alexandre Lazarègue", jobTitle: "Avocat au barreau de Paris", worksFor: { "@id": `${URL_BASE}/#cabinet` } },
    { "@type": "Person", name: "Nadia Abchiche-Mimouni", jobTitle: "Experte en intelligence artificielle", worksFor: { "@id": `${URL_BASE}/#cabinet` } },
  ],
};

const SITUATIONS = [
  { n: "01", s: "Vos salariés utilisent des outils d’IA générative, avec ou sans autorisation", d: "Vous devez encadrer ces pratiques en définissant ce que les salariés peuvent saisir dans ces outils — notamment s’agissant des données personnelles et des informations confidentielles — puis informer et consulter le comité social et économique (CSE) lorsque l’outil modifie les conditions de travail." },
  { n: "02", s: "Un outil intervient dans le recrutement, l’évaluation ou la gestion des carrières", d: "L’outil peut être classé « à haut risque ». Une personne doit alors pouvoir contrôler ses résultats, et les candidats ou salariés doivent être informés de son utilisation." },
  { n: "03", s: "Vous intégrez une fonction d’IA à un produit ou à un service que vous vendez à des tiers", d: "Vous devenez « fournisseur » au sens du règlement : il vous revient de documenter le système, d’informer ses utilisateurs et de prévoir les clauses adaptées avec vos propres fournisseurs." },
  { n: "04", s: "Un client ou un fournisseur vous demande de justifier la conformité de votre outil", d: "Il vous faut un dossier présentable : la liste des systèmes utilisés, leur documentation, les contrats et la preuve des contrôles effectués." },
  { n: "05", s: "Un algorithme décide ou pré-décide du sort de personnes physiques", d: "Une analyse d’impact est souvent nécessaire, le traitement doit reposer sur une base légale et les personnes doivent pouvoir exercer leurs droits, notamment au titre du RGPD." },
  { n: "06", s: "Un incident, un contrôle ou une réclamation est déjà survenu", d: "Il faut reconstituer ce qui s’est passé, faire examiner techniquement le système et préparer la réponse à l’autorité, au client ou au juge." },
];

const THREE = [
  { t: "Ce que fait le système", p: "Assistant de rédaction, scoring, présélection de candidatures, génération de contenus, fonction intégrée à un produit vendu à des tiers." },
  { t: "Le rôle de l’entreprise", p: "Déployeur, fournisseur, importateur ou distributeur. Un outil acheté puis adapté, ou diffusé sous votre marque, ne relève pas du même régime qu’un outil utilisé tel quel." },
  { t: "Les personnes concernées", p: "Salariés, candidats, clients, assurés ou utilisateurs. La question décisive est de savoir si le système intervient dans une décision qui les concerne." },
];

type Obl = { titre: string; when: string; items: { b: string; span: string; em: string }[] };
const OBLIGATIONS: Obl[] = [
  {
    titre: "Toute entreprise qui utilise l’IA",
    when: "Déjà applicable",
    items: [
      { b: "Former les équipes", span: "Prendre des mesures pour assurer un niveau suffisant de maîtrise de l’IA des personnes qui utilisent les systèmes, et en garder la trace. Voir la mission 05.", em: "Art. 4" },
      { b: "Écarter les pratiques interdites", span: "Vérifier qu’aucun outil utilisé ne relève des pratiques de l’article 5.", em: "Art. 5" },
      { b: "Informer quand c’est requis", span: "Signaler l’agent conversationnel à ses interlocuteurs ; signaler les contenus hypertruqués diffusés.", em: "Art. 50" },
      { b: "Encadrer les usages internes", span: "Données personnelles, secrets d’affaires, propriété des contenus produits : règles écrites, charte d’usage.", em: "RGPD · droit des contrats" },
      { b: "Associer les représentants du personnel", span: "Informer et consulter le CSE lorsque l’outil modifie les conditions de travail.", em: "Code du travail" },
      { b: "Tenir l’inventaire des outils", span: "Recenser les systèmes utilisés, leur fournisseur et leur usage. Ce n’est pas une obligation générale du règlement, mais sans lui aucune qualification n’est possible.", em: "Mesure recommandée" },
    ],
  },
  {
    titre: "Déployeur d’un système à haut risque",
    when: "Annexe III : 2 décembre 2027",
    items: [
      { b: "Utiliser selon la notice", span: "Mesures techniques et organisationnelles pour respecter la notice d’utilisation du fournisseur.", em: "Art. 26" },
      { b: "Confier le contrôle humain", span: "Désigner des personnes compétentes, formées et disposant de l’autorité nécessaire.", em: "Art. 26" },
      { b: "Surveiller et conserver les journaux", span: "Surveiller le fonctionnement, signaler les incidents graves, conserver les journaux au moins six mois.", em: "Art. 26" },
      { b: "Informer salariés et personnes concernées", span: "Informer les représentants du personnel et les salariés avant la mise en service au travail ; informer les personnes faisant l’objet d’une décision.", em: "Art. 26 · art. 86" },
      { b: "Analyser l’impact", span: "Analyse d’impact sur les droits fondamentaux pour les organismes publics et certains usages (crédit, assurance) ; analyse d’impact RGPD le cas échéant.", em: "Art. 27 · RGPD art. 35" },
    ],
  },
  {
    titre: "Fournisseur d’un système à haut risque",
    when: "Annexe III : 2 décembre 2027 · annexe I : 2 août 2028",
    items: [
      { b: "Gérer les risques et les données", span: "Système de gestion des risques sur tout le cycle de vie ; qualité et gouvernance des données d’entraînement.", em: "Art. 9 · 10" },
      { b: "Documenter", span: "Documentation technique, journalisation automatique, notice d’utilisation claire pour les déployeurs.", em: "Art. 11 à 13" },
      { b: "Garantir contrôle et robustesse", span: "Conception permettant le contrôle humain ; exactitude, robustesse et cybersécurité.", em: "Art. 14 · 15" },
      { b: "Prouver la conformité", span: "Système de gestion de la qualité, évaluation de la conformité, déclaration UE, marquage CE, enregistrement.", em: "Art. 17 · 43 · 47 à 49" },
      { b: "Suivre après la mise sur le marché", span: "Surveillance après commercialisation et signalement des incidents graves.", em: "Art. 72 · 73" },
    ],
  },
];

type Mission = { n: string; t: string; items: string[]; recv: string; link?: boolean };
const MISSIONS: Mission[] = [
  { n: "01", t: "Audit et diagnostic AI Act", items: ["Inventaire des systèmes et des usages réels", "Qualification : rôle tenu, niveau de risque, obligations applicables", "Écarts constatés et priorités"], recv: "Une cartographie des systèmes, une note de qualification par système et un plan d’action priorisé et daté." },
  { n: "02", t: "Gouvernance, registre, charte et procédures", items: ["Encadrement des usages internes", "Procédure d’arrivée d’un nouvel outil", "Information et consultation des représentants du personnel"], recv: "Le registre des systèmes d’IA, une charte d’usage opposable et la trame d’information du CSE." },
  { n: "03", t: "Conformité des systèmes à haut risque", items: ["Gestion des risques et supervision humaine", "Journalisation et information des personnes", "Répartition des responsabilités avec les fournisseurs"], recv: "La documentation technique, les clauses IA pour vos contrats fournisseurs et clients, et le dossier de preuve associé." },
  { n: "04", t: "Contrôle, incident ou contentieux", items: ["Réponse aux demandes d’une autorité ou d’un client", "Reconstitution des faits et examen technique du système", "Défense devant les juridictions civiles, prud’homales ou pénales"], recv: "Une trame de réponse au contrôle ou à la réclamation, et la stratégie de défense correspondante." },
  { n: "05", t: "Formation des équipes (article 4)", items: ["Usages de l’IA générative, vérification des résultats, protection des données et des secrets", "Programme adapté aux métiers : direction, RH, juridique, commercial, équipes techniques", "Traçabilité des sessions pour documenter la maîtrise de l’IA"], recv: "Les supports de formation et les justificatifs de participation, qui permettent de documenter les mesures prises au titre de l’article 4.", link: true },
];

const STEPS3 = [
  { k: "Étape 01", t: "Premier échange", p: "Trente à quarante-cinq minutes, par téléphone ou en visioconférence, sur les outils utilisés, le produit et les contrats existants. Aucun document n’est exigé à ce stade." },
  { k: "Étape 02", t: "Périmètre et proposition", p: "Définition du périmètre à examiner et des interlocuteurs à mobiliser côté entreprise — direction des systèmes d’information, métiers utilisateurs, ressources humaines lorsque des salariés sont concernés. Une convention d’honoraires chiffrée est signée avant tout travail d’analyse." },
  { k: "Étape 03", t: "Inventaire et qualification", p: "Premier livrable : la cartographie des systèmes, la qualification des rôles et des niveaux de risque, et un plan d’action hiérarchisé entre ce qui est exigible immédiatement et ce qui peut attendre." },
];

const CASES = [
  { pp: "Éditeur de logiciel — 90 salariés", ct: "Une fonction de scoring vendue sans dossier de conformité", situation: "Une fonction de scoring intégrée à la plateforme, vendue à des clients grands comptes exigeant des garanties de conformité.", difficulte: "Rôle de fournisseur non assumé dans les contrats, aucune documentation technique, réponses divergentes selon les interlocuteurs commerciaux.", intervention: "Qualification du système, constitution de la documentation, réécriture des clauses IA et d’un argumentaire de conformité unique.", res: "Dossier opposable transmis aux clients ; les appels d’offres bloqués ont pu être réengagés." },
  { pp: "Groupe industriel — direction des ressources humaines", ct: "Un outil de présélection de candidatures contesté", situation: "Outil de présélection de candidatures déployé par un prestataire, contesté par un candidat écarté.", difficulte: "Aucune trace des critères utilisés, absence de supervision humaine documentée, contrat prestataire muet sur la responsabilité.", intervention: "Examen technique du paramétrage, reconstitution de la chaîne de décision, réponse au candidat et renégociation du contrat.", res: "Procédure de recrutement redocumentée et supervision humaine rétablie avant tout contentieux." },
];

const TIMELINE = [
  { d: "2 févr. 2025", p: "Pratiques interdites et maîtrise de l’IA par les équipes (article 4)", cls: "done" },
  { d: "2 août 2025", p: "Modèles d’IA à usage général et régime des sanctions", cls: "done" },
  { d: "2 août 2026", p: "Application générale du règlement, dont les obligations de transparence (article 50)", cls: "done" },
  { d: "2 déc. 2026", p: "Nouvelles interdictions ajoutées par le règlement (UE) 2026/1744 ; fin de la période transitoire pour le marquage des contenus générés", cls: "next" },
  { d: "2 déc. 2027", p: "Systèmes à haut risque de l’annexe III — emploi, éducation, services essentiels", cls: "" },
  { d: "2 août 2028", p: "Systèmes à haut risque de l’annexe I — produits déjà soumis à une législation d’harmonisation", cls: "" },
];

const REL = [
  { href: "/nos-domaines/rgpd-donnees-personnelles", label: "Données personnelles et RGPD" },
  { href: "/nos-domaines/contrats-informatiques", label: "Contrats informatiques" },
  { href: "/nos-domaines/contentieux-informatique-commercial", label: "Contentieux informatique et commercial" },
  { href: "/nos-domaines/cybersecurite", label: "Cybersécurité et NIS 2" },
  { href: "/formations/intelligence-artificielle-entreprise", label: "Formation IA en entreprise" },
];

export default function Page() {
  return (
    <main className={styles.ia}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ============================ 1. HERO ============================ */}
      <section className="hero-i navy" aria-labelledby="h1">
        <div className="ph-bg" aria-hidden>
          <Image src="/images/ia-act-hero.jpg" alt="" fill priority sizes="(max-width:1100px) 100vw, 60vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="wrap">
          <nav className="crumb" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden>/</span> <Link href="/nos-domaines">Domaines</Link> <span aria-hidden>/</span> <span aria-current="page">Intelligence artificielle et AI Act</span>
          </nav>
          <div className="hero-copy">
            <p className="label">Avocat en intelligence artificielle · Paris et toute la France</p>
            <h1 id="h1">AVOCAT IA : MISE EN CONFORMITÉ AI ACT ET GOUVERNANCE</h1>
            <p className="acc">Une IA mal documentée devient un risque de responsabilité.</p>
            <p className="lead">Le cabinet assiste les entreprises qui utilisent, déploient ou commercialisent des systèmes d’intelligence artificielle, depuis la qualification des usages et la mise en conformité documentaire et contractuelle jusqu’à leur défense en cas de contrôle ou de contentieux.</p>
            <div className="hero-cta">
              <a className="btn" href="/contact">Parler de votre situation →</a>
              <a className="heroLink" href="#missions">Voir les cinq missions</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ 2. SITUATIONS ===================== */}
      <section className="sec ghost" aria-labelledby="h-sit">
        <div className="wrap">
          <div className="head">
            <p className="label">Situations</p>
            <h2 className="h2" id="h-sit">Êtes-vous concerné&nbsp;?</h2>
            <p className="lead">Le règlement ne s’applique pas à des entreprises en général, mais à des usages précis. Ces situations sont celles qui amènent le plus souvent une entreprise à consulter.</p>
          </div>
          <ul className="sits" aria-label="Situations et obligations déclenchées">
            {SITUATIONS.map((s) => (
              <li key={s.n}>
                <div className="s"><span className="sn">{s.n}</span><p>{s.s}</p></div>
                <div className="d"><p className="dl">Ce que cela implique pour vous</p><p>{s.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== 3. PRINCIPE + MATRICE ===================== */}
      <section className="sec" aria-labelledby="h-q">
        <div className="wrap">
          <div className="head">
            <p className="label">Principe de lecture</p>
            <h2 className="h2" id="h-q">Le règlement qualifie les systèmes, leurs usages et le rôle de chaque acteur</h2>
            <p className="lead">Pour qualifier un système, trois éléments sont examinés en premier.</p>
          </div>
          <div className="three">
            {THREE.map((t) => (
              <article key={t.t}><h3 className="h3 three-h">{t.t}</h3><p className="tx">{t.p}</p></article>
            ))}
          </div>
          <p className="tx three-nuance">Ces trois éléments déterminent les vérifications à mener. Ils ne suffisent pas, à eux seuls, à qualifier juridiquement un système : la finalité réelle, les données traitées, les conditions effectives d’utilisation et les engagements contractuels pris entrent également en compte.</p>
          <h3 className="h3">Quels usages relèvent de quel niveau de risque&nbsp;?</h3>
          <p className="tx matrice-intro">Choisissez un niveau : le tableau montre d’abord les cas qui y conduisent, puis ce que chaque acteur doit faire.</p>
          <MatriceTabs />
        </div>
      </section>

      {/* ==================== 4. OBLIGATIONS ============================ */}
      <section className="sec ghost" aria-labelledby="h-obl">
        <div className="wrap">
          <div className="head">
            <p className="label">Obligations</p>
            <h2 className="h2" id="h-obl">Ce que l’entreprise doit mettre en place</h2>
            <p className="lead">Les obligations dépendent du rôle tenu et du niveau de risque. Certaines s’appliquent déjà à toute entreprise qui utilise l’IA ; les plus lourdes visent les systèmes à haut risque.</p>
          </div>
          <div className="obls">
            {OBLIGATIONS.map((o) => (
              <article className="obl" key={o.titre}>
                <div className="oh"><h3>{o.titre}</h3><p className="when">{o.when}</p></div>
                <ul>
                  {o.items.map((it) => (
                    <li key={it.b}><b>{it.b}</b><span>{it.span}</span><em>{it.em}</em></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="ft2">Sanctions prévues par l’article 99 : jusqu’à 35 millions d’euros ou 7 % du chiffre d’affaires mondial pour les pratiques interdites, 15 millions ou 3 % pour les autres obligations. Synthèse à rapprocher du texte consolidé après le règlement (UE) 2026/1744.</p>
        </div>
      </section>

      {/* ==================== 5. MISSIONS =============================== */}
      <section id="missions" className="sec" aria-labelledby="h-mis">
        <div className="wrap">
          <div className="head"><p className="label">Nos interventions</p><h2 className="h2" id="h-mis">Audit, gouvernance et conformité IA</h2></div>
          <div className="mis-scroll" role="region" aria-label="Les cinq missions" tabIndex={0}>
            <div className="missions">
              {MISSIONS.map((m) => (
                <article key={m.n}>
                  <span className="n">{m.n}</span>
                  <h3>{m.t}</h3>
                  <ul>
                    {m.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <p className="recv">
                    <b>Vous recevez</b>{m.recv}
                    {m.link ? <> <Link href="/formations/intelligence-artificielle-entreprise">Voir la formation →</Link></> : null}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <p className="meta mis-hint">Faites défiler horizontalement pour voir les cinq missions.</p>
          <p className="tx missions-foot">La plupart des missions commencent par un inventaire et une qualification des usages. La gouvernance, la documentation ou la défense sont ensuite adaptées à la situation identifiée : il n’appartient pas au client de choisir seul entre ces cinq entrées.</p>
        </div>
      </section>

      {/* ==================== 6. DÉROULEMENT ============================ */}
      <section className="sec ghost" aria-labelledby="h-st">
        <div className="wrap">
          <div className="head"><p className="label">Déroulement</p><h2 className="h2" id="h-st">Comment commence la mission</h2><p className="lead">Une prise de contact suffit. Aucun questionnaire technique n’est demandé en amont.</p></div>
          <ol className="steps3">
            {STEPS3.map((s) => (
              <li key={s.k}><span className="k">{s.k}</span><h3 className="h3 step-h">{s.t}</h3><p className="tx">{s.p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* ==================== 7. DEUX INTERVENTIONS ==================== */}
      <section className="sec" aria-labelledby="h-cas">
        <div className="wrap">
          <div className="head"><p className="label">Dossiers traités</p><h2 className="h2" id="h-cas">Deux interventions récentes</h2></div>
          <div className="cases">
            {CASES.map((c) => (
              <article className="dcard" key={c.ct}>
                <div className="top"><p className="pp">{c.pp}</p><h3 className="ct">{c.ct}</h3></div>
                <dl>
                  <dt>Situation</dt><dd>{c.situation}</dd>
                  <dt>Difficulté</dt><dd>{c.difficulte}</dd>
                  <dt>Intervention</dt><dd>{c.intervention}</dd>
                </dl>
                <div className="res"><b>Résultat</b><p>{c.res}</p></div>
              </article>
            ))}
          </div>
          <div className="risk">
            <h3 className="h3 risk-h">Le risque existe déjà, indépendamment du calendrier de l’AI Act</h3>
            <p>Les juridictions contrôlent aujourd’hui l’information des salariés, la consultation du CSE, l’explicabilité des décisions individuelles et la documentation des traitements algorithmiques. Le report d’une échéance européenne ne suspend ni le droit du travail, ni le RGPD, ni les obligations contractuelles.</p>
          </div>
          {/* Deux références de jurisprudence : à réinsérer uniquement après vérification (juridiction, date, numéro). */}
        </div>
      </section>

      {/* ==================== 8. DU CONTRAT À L'ALGORITHME (navy) ====== */}
      <section className="sec navy" aria-labelledby="h-duo">
        <div className="wrap">
          <div className="head"><p className="label">Méthode</p><h2 className="h2" id="h-duo">Du contrat à l’algorithme</h2><p className="lead">Une qualification juridique qui ne repose pas sur le fonctionnement réel du système ne résiste pas à un contrôle. Les dossiers techniques sont traités à deux.</p></div>
          <div className="duo">
            <article>
              <span className="ph" role="img" aria-label="Portrait d’Alexandre Lazarègue"><Image src="/images/alexandre-pro.jpg" alt="" fill sizes="110px" style={{ objectFit: "cover" }} /></span>
              <div><p className="label">Avocat au Barreau de Paris</p><h3 className="h3">Me Alexandre Lazarègue</h3><p>Qualification juridique, contrats et défense.</p></div>
            </article>
            <article>
              <span className="ph" role="img" aria-label="Portrait de Nadia Abchiche-Mimouni"><Image src="/images/nadia-pro.jpg" alt="" fill sizes="110px" style={{ objectFit: "cover" }} /></span>
              <div><p className="label">Experte en intelligence artificielle — intervenante indépendante</p><h3 className="h3">Nadia Abchiche-Mimouni</h3><p>Fonctionnement du système, données, tests et supervision. Elle intervient à la demande, sur les dossiers qui l’exigent.</p></div>
            </article>
          </div>
          <p className="common"><strong>Résultat commun.</strong> Une documentation cohérente avec le fonctionnement réel du système. C’est cette correspondance qui est examinée en cas de contrôle, et c’est elle qui manque le plus souvent aux dossiers constitués sans examen technique.</p>
        </div>
      </section>

      {/* ==================== 9. CALENDRIER ============================ */}
      <section className="sec" aria-labelledby="h-cal">
        <div className="wrap">
          <div className="head"><p className="label">Calendrier</p><h2 className="h2" id="h-cal">Les échéances qui engagent votre entreprise</h2><p className="lead">Règlement (UE) 2024/1689, modifié par le règlement (UE) 2026/1744 dit « omnibus numérique IA », entré en vigueur le 27 juillet 2026. Le calendrier complet, article par article, fait l’objet d’une ressource distincte tenue à jour.</p></div>
          <ol className="tl">
            {TIMELINE.map((t) => (
              <li key={t.d} className={t.cls}><span className="d">{t.d}</span><p>{t.p}</p></li>
            ))}
          </ol>
          <div className="keep">
            <div className="ghost"><p className="label">À retenir</p><p className="keep-tx">Le report des systèmes à haut risque ne suspend ni les interdictions, ni les obligations de transparence, ni la maîtrise de l’IA par les équipes, déjà applicables.</p></div>
            <div className="ghost"><p className="label">À retenir</p><p className="keep-tx">L’entrée en application d’une obligation et l’exigibilité des sanctions ne coïncident pas : une obligation applicable sans amende immédiate reste opposable devant un juge civil ou prud’homal.</p></div>
          </div>
          <p className="meta cal-maj">Mis à jour le 21 septembre 2026 · <span className="cal-ressource">Calendrier détaillé de l’AI Act, article par article (ressource à paraître)</span></p>
          <div className="wp">
            <div><p className="wp-t">Livre blanc — AI Act : qui doit faire quoi</p><p className="tx">Répartition des obligations entre fournisseur, déployeur et importateur. Sans formulaire ni inscription.</p></div>
            <span className="btn-o btn-disabled" aria-disabled>Télécharger le livre blanc</span>
          </div>
        </div>
      </section>

      {/* ==================== 10. FAQ ================================== */}
      <section className="sec ghost faq-sec" aria-labelledby="h-faq">
        <div className="wrap faq-grid">
          <div className="head faq-head"><p className="label">Avant d’engager une mission</p><h2 className="h2" id="h-faq">Les questions que posent les entreprises</h2></div>
          <div>
            <FaqAccordion />
            <p className="rel"><strong>Sujets liés :</strong>
              {REL.map((r) => (
                <Link key={r.href} href={r.href}>{r.label}</Link>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 11. CTA FINAL (navy) ===================== */}
      <section className="sec navy" aria-labelledby="h-cta">
        <div className="wrap">
          <div className="head cta-head"><h2 className="h2" id="h-cta">Faire le point sur vos systèmes d’IA</h2><p className="lead">Décrivez les outils développés ou utilisés : le cabinet identifie votre rôle et les premières obligations.</p></div>
          <a className="btn" href="/contact">Faire le point sur vos systèmes d’IA →</a>
        </div>
      </section>
    </main>
  );
}
