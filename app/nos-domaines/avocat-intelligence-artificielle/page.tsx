import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./ia.module.css";
import { FAQ_IA } from "./faq-ia";
import { FaqAccordion } from "./_components/FaqAccordion";
import ReglementModule from "./_components/ReglementModule";
import ScrollRail from "./_components/ScrollRail";
import DossierDetail from "./_components/DossierDetail";

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

// Une situation : titre + phrase (raccourcis), un renvoi de régime (vers un onglet
// du module « Ce que dit le règlement ») et un ou plusieurs renvois de mission.
type Renvoi = { t: string; href: string };
type Situation = { n: string; s: string; d: string; regime?: Renvoi; missions: string[] };

const SITUATIONS: Situation[] = [
  { n: "01", s: "Vos salariés utilisent l’IA générative, autorisée ou non", d: "Encadrer ce qui peut y être saisi et consulter le CSE si le travail change.", regime: { t: "Toute entreprise", href: "#reglement" }, missions: ["02", "05"] },
  { n: "02", s: "Un outil intervient dans le recrutement ou l’évaluation des salariés", d: "Contrôle humain des résultats, information des candidats et des salariés.", regime: { t: "Haut risque", href: "#reglement-haut-risque" }, missions: ["03"] },
  { n: "03", s: "Vous vendez un produit ou un service qui intègre de l’IA", d: "Vous pouvez devenir « fournisseur » : documenter, informer, adapter les clauses.", regime: { t: "Fournisseur", href: "#reglement-haut-risque" }, missions: ["01", "03"] },
  { n: "04", s: "Un client vous demande de justifier la conformité de votre outil", d: "Un dossier présentable et la preuve des contrôles effectués.", missions: ["01", "02"] },
  { n: "05", s: "Un algorithme décide ou pré-décide du sort de personnes", d: "Analyse d’impact, base légale et droits des personnes au titre du RGPD.", regime: { t: "Haut risque possible", href: "#reglement-haut-risque" }, missions: ["01"] },
  { n: "06", s: "Un incident, un contrôle ou une réclamation est survenu", d: "Reconstituer les faits et préparer la réponse à l’autorité, au client ou au juge.", missions: ["04"] },
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

type Case = { pp: string; ct: string; missions: string; situation: string; difficulte: string; intervention: string; res: string };
const CASES: Case[] = [
  { pp: "Éditeur de logiciel — 90 salariés", ct: "Une fonction de scoring vendue sans dossier de conformité", missions: "Missions 01 · 03", situation: "Une fonction de scoring intégrée à la plateforme, vendue à des clients grands comptes exigeant des garanties de conformité.", difficulte: "Rôle de fournisseur non assumé dans les contrats, aucune documentation technique, réponses divergentes selon les interlocuteurs commerciaux.", intervention: "Qualification du système, constitution de la documentation, réécriture des clauses IA et d’un argumentaire de conformité unique.", res: "Dossier opposable transmis aux clients ; les appels d’offres bloqués ont pu être réengagés." },
  { pp: "Groupe industriel — direction des ressources humaines", ct: "Un outil de présélection de candidatures contesté", missions: "Missions 03 · 04", situation: "Outil de présélection de candidatures déployé par un prestataire, contesté par un candidat écarté.", difficulte: "Aucune trace des critères utilisés, absence de supervision humaine documentée, contrat prestataire muet sur la responsabilité.", intervention: "Examen technique du paramétrage, reconstitution de la chaîne de décision, réponse au candidat et renégociation du contrat.", res: "Procédure de recrutement redocumentée et supervision humaine rétablie avant tout contentieux." },
];

const REL = [
  { href: "/nos-domaines/rgpd-donnees-personnelles", label: "Données personnelles et RGPD" },
  { href: "/nos-domaines/contrats-informatiques", label: "Contrats informatiques" },
  { href: "/nos-domaines/contentieux-informatique-commercial", label: "Contentieux informatique et commercial" },
  { href: "/nos-domaines/cybersecurite", label: "Cybersécurité et NIS 2" },
  { href: "/formations/intelligence-artificielle-entreprise", label: "Formation IA en entreprise" },
];

function Renvois({ s }: { s: Situation }) {
  return (
    <p className="renvoi">
      {s.regime ? (
        <>
          <a className="rg" href={s.regime.href}>{s.regime.t}</a>
          <span aria-hidden> · </span>
        </>
      ) : null}
      <span>{s.missions.length > 1 ? "Missions" : "Mission"} </span>
      {s.missions.map((m, idx) => (
        <span key={m}>
          {idx > 0 ? <span aria-hidden> · </span> : null}
          <a href={`#mission-${m}`}>{m}</a>
        </span>
      ))}
      <span aria-hidden> →</span>
    </p>
  );
}

export default function Page() {
  return (
    <main className={styles.ia}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ============================ 1. HERO ============================ */}
      <section className="hero-i navy" aria-labelledby="h1">
        <div className="wrap">
          <nav className="crumb" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden>/</span> <Link href="/nos-domaines">Domaines</Link> <span aria-hidden>/</span> <span aria-current="page">Intelligence artificielle et AI Act</span>
          </nav>
          <div className="hero-grid">
            <div className="hero-main">
              <p className="label">Avocat en intelligence artificielle · Paris et toute la France</p>
              <h1 id="h1">AVOCAT IA : MISE EN CONFORMITÉ AI ACT ET GOUVERNANCE</h1>
            </div>
            <div className="hero-side">
              <p className="acc">Une IA mal documentée devient un risque de responsabilité.</p>
              <p className="lead">Le cabinet assiste les entreprises qui utilisent, déploient ou commercialisent des systèmes d’intelligence artificielle, depuis la qualification des usages et la mise en conformité documentaire et contractuelle jusqu’à leur défense en cas de contrôle ou de contentieux.</p>
              <div className="hero-cta">
                <a className="btn" href="/contact">Parler de votre situation →</a>
                <a className="heroLink" href="#missions">Voir les cinq missions</a>
              </div>
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
            <p className="lead sits-intro">Le règlement vise des usages précis. Chaque situation renvoie au régime applicable et à la mission correspondante.</p>
          </div>
          <ul className="sits" aria-label="Situations et renvois">
            {SITUATIONS.map((s) => (
              <li key={s.n}>
                <div className="s"><span className="sn">{s.n}</span><p>{s.s}</p></div>
                <div className="d">
                  <p>{s.d}</p>
                  <Renvois s={s} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== 3. CE QUE DIT LE RÈGLEMENT ================ */}
      <section id="reglement" className="sec" aria-labelledby="h-reg">
        <div className="wrap">
          <div className="head">
            <p className="label">Ce que dit le règlement</p>
            <h2 className="h2" id="h-reg">Qui doit faire quoi, et à partir de quand</h2>
            <p className="lead">La qualification dépend de trois éléments : ce que fait le système, le rôle de l’entreprise — déployeur, fournisseur, importateur ou distributeur — et les personnes concernées.</p>
          </div>
          <ReglementModule />
        </div>
      </section>

      {/* ==================== 4. MISSIONS =============================== */}
      <section id="missions" className="sec" aria-labelledby="h-mis">
        <div className="wrap">
          <div className="head"><p className="label">Nos interventions</p><h2 className="h2" id="h-mis">Audit, gouvernance et conformité IA</h2></div>
          <ScrollRail total={MISSIONS.length} trackClass="missions" label="Les cinq missions">
            {MISSIONS.map((m) => (
              <article id={`mission-${m.n}`} key={m.n}>
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
          </ScrollRail>
          <p className="tx missions-foot">La plupart des missions commencent par l’audit. Le cabinet oriente ensuite vers la mission adaptée à la situation identifiée.</p>
        </div>
      </section>

      {/* ==================== 5. DEUX INTERVENTIONS ==================== */}
      <section className="sec ghost" aria-labelledby="h-cas">
        <div className="wrap">
          <div className="head"><p className="label">Dossiers traités</p><h2 className="h2" id="h-cas">Deux interventions récentes</h2></div>
          <div className="cases">
            {CASES.map((c) => (
              <article className="dcard" key={c.ct}>
                <div className="top"><p className="pp">{c.pp}</p><h3 className="ct">{c.ct}</h3><p className="dmis">{c.missions}</p></div>
                <dl className="d-sit"><dt>Situation</dt><dd>{c.situation}</dd></dl>
                <DossierDetail difficulte={c.difficulte} intervention={c.intervention} />
                <div className="res"><b>Résultat</b><p>{c.res}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============= 6. MÉTHODE ET DÉROULEMENT (navy) =============== */}
      <section className="sec navy" aria-labelledby="h-duo">
        <div className="wrap meth-grid">
          <div className="meth">
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
          <div className="derou">
            <div className="head"><p className="label">Déroulement</p><h3 className="h2 derou-h" id="h-st">Comment commence la mission</h3><p className="lead">Une prise de contact suffit. Aucun questionnaire technique n’est demandé en amont.</p></div>
            <ScrollRail total={STEPS3.length} trackClass="steps3" label="Déroulement de la mission">
              {STEPS3.map((s) => (
                <div className="step" key={s.k}><span className="k">{s.k}</span><h4 className="h3 step-h">{s.t}</h4><p className="tx">{s.p}</p></div>
              ))}
            </ScrollRail>
          </div>
        </div>
      </section>

      {/* ==================== 7. LIVRE BLANC + FAQ ===================== */}
      <section className="sec ghost faq-sec" aria-labelledby="h-faq">
        <div className="wrap faq-grid">
          <div className="faq-left">
            <div className="head faq-head"><p className="label">Avant d’engager une mission</p><h2 className="h2" id="h-faq">Les questions que posent les entreprises</h2></div>
            <div className="wp">
              <div><p className="wp-t">Livre blanc — AI Act : qui doit faire quoi</p><p className="tx">Répartition des obligations entre fournisseur, déployeur et importateur. Sans formulaire ni inscription.</p></div>
              <span className="btn-o btn-disabled" aria-disabled>Télécharger le livre blanc</span>
            </div>
          </div>
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

      {/* ==================== 8. CTA FINAL (navy) ===================== */}
      <section className="sec navy" aria-labelledby="h-cta">
        <div className="wrap">
          <div className="head cta-head"><h2 className="h2" id="h-cta">Faire le point sur vos systèmes d’IA</h2><p className="lead">Décrivez les outils développés ou utilisés : le cabinet identifie votre rôle et les premières obligations.</p></div>
          <a className="btn" href="/contact">Faire le point sur vos systèmes d’IA →</a>
        </div>
      </section>
    </main>
  );
}
