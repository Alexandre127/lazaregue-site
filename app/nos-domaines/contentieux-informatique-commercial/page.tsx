import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./contentieux.module.css";
import ContactForm from "./_components/ContactForm";
import WaysTabs from "./_components/WaysTabs";
import FeesLists from "./_components/FeesLists";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/contentieux-informatique-commercial";
const CABINET_ID = `${URL_BASE}/#cabinet`; // seule entité globale existante (pas de #website/#organization)

const TEL_HREF = "tel:+33181706200";
const TEL_DISPLAY = "01 81 70 62 00";

// Maillage interne — routes réelles du projet.
const R_CONTRATS = "/nos-domaines/contrats-informatiques";
const R_CYBERSECURITE = "/nos-domaines/cybersecurite";
const R_CYBERCRIMINALITE = "/nos-domaines/cybercriminalite";
const R_RGPD = "/nos-domaines/rgpd-donnees-personnelles";

/* SEO inchangé (H1, URL, meta). */
const TITLE = "Avocat contentieux informatique et commercial à Paris";
const DESCRIPTION =
  "Avocats en contentieux informatique et commercial : projets IT défaillants, SaaS, infogérance, perte de données, expertise judiciaire et responsabilité.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

/* Pas de balisage FAQPage (décision du brief). */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": `${URL_BASE}${PATH}#webpage`, url: `${URL_BASE}${PATH}`, name: TITLE, description: DESCRIPTION, inLanguage: "fr", isPartOf: { "@id": CABINET_ID }, publisher: { "@id": CABINET_ID } },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Domaines d’intervention", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Contentieux informatique et commercial", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

/* Matrice du litige — chaîne verticale de l'aside du hero (desktop). */
const MATRICE: { k: string; v: string; hot?: boolean }[] = [
  { k: "Engagement", v: "Obligation de sauvegarde" },
  { k: "Fait constaté", v: "Données non récupérables" },
  { k: "Preuve", v: "Journaux, tests de restauration" },
  { k: "Conséquence", v: "Responsabilité et coût de reconstitution", hot: true },
];

/* Trois exemples de la matrice — cartes défilantes (mobile) / table (desktop). */
const EXEMPLES: { e: string; f: string; p: string; c: string }[] = [
  { e: "Date de livraison", f: "Retard ou livraison incomplète", p: "Contrat, planning et tickets", c: "Exécution, rupture ou indemnisation" },
  { e: "Obligation de sauvegarde", f: "Données non récupérables", p: "Journaux, rapports et tests de restauration", c: "Responsabilité et coût de reconstitution" },
  { e: "Critères de recette", f: "Anomalies ou réserves", p: "Cahier des charges, procès-verbal et échanges", c: "Conformité ou contestation de la recette" },
];

/* Six familles — desktop : cartes ; mobile : accordéon (premier ouvert). */
const TYPOLOGIES: { n: string; t: string; p: string }[] = [
  { n: "01", t: "Intégration, migration et recette", p: "Retards, dérive du périmètre, anomalies bloquantes, recette refusée ou contestée, migration de données incomplète. Le débat porte sur le contenu réel des engagements, le partage des tâches et la collaboration du client." },
  { n: "02", t: "SaaS, infogérance, maintenance et support", p: "Indisponibilités, niveaux de service non tenus, délais de correction, hausses tarifaires, suspension pour impayés. Les engagements de service sont confrontés aux mesures réellement relevées." },
  { n: "03", t: "Perte de données, sauvegardes et cybersécurité", p: "Données non restituables, sauvegardes jamais testées, incident imputé à la configuration ou à l’administration du système. Les obligations de sécurité sont rapprochées des interventions et des constats techniques." },
  { n: "04", t: "Rupture, résiliation et réversibilité", p: "Préavis, rupture jugée fautive, continuité du service pendant la transition, restitution des données et de la documentation. Le transfert vers un autre prestataire est souvent l’enjeu le plus urgent." },
  { n: "05", t: "Code, développements et propriété intellectuelle", p: "À qui appartiennent les développements, remise des sources et de la documentation, licences libres, réutilisation contestée. Ces questions décident de la capacité à poursuivre l’exploitation après la rupture." },
  { n: "06", t: "Financements, contrats liés et impayés", p: "Lorsque la solution est financée par un contrat de location distinct, les deux contrats peuvent être liés : si la prestation tombe, le financement peut tomber avec elle. La défense est alors conduite dans chacune des procédures." },
];

/* Expertise — quatre étapes. */
const EXPERTISE: { n: string; t: string; p: string; last?: boolean }[] = [
  { n: "1", t: "La mission", p: "L’expert ne constate que ce que sa mission lui demande d’examiner. Sa rédaction se discute, et s’étend si nécessaire." },
  { n: "2", t: "Préserver et préparer", p: "Environnements, journaux et configurations sont figés dès l’annonce de la mesure. Chaque réunion se prépare avec les pièces et les questions utiles." },
  { n: "3", t: "Les dires", p: "Les observations écrites adressées à l’expert, préparées avec le consultant technique, rattachent chaque constat au contrat." },
  { n: "4", t: "Le rapport", p: "Le rapport est ensuite lu en juriste : ce qu’il établit, ce qu’il écarte, ce qu’il laisse ouvert.", last: true },
];

/* Cas clients — deux dossiers. */
const CAS: { tag: string; badge: string; titre: string; enjeu: string; rub: { k: string; v: string }[] }[] = [
  {
    tag: "Cas client 01",
    badge: "Procédures en cours",
    titre: "Infogérance et financements interdépendants",
    enjeu: "Les loyers continuaient d’être réclamés pour une installation contestée.",
    rub: [
      { k: "Situation", v: "L’installation et l’exploitation de l’informatique de l’entreprise étaient confiées à un prestataire et financées par des contrats de location auprès de plusieurs organismes." },
      { k: "Difficulté", v: "Prestations, recette et financements devaient être examinés ensemble." },
      { k: "Intervention", v: "Chronologie reconstituée, engagements confrontés aux prestations réalisées, défense organisée dans chacune des procédures." },
      { k: "État", v: "Procédures en cours devant le tribunal de commerce." },
    ],
  },
  {
    tag: "Cas client 02",
    badge: "Expertise en cours",
    titre: "Cyberattaque et responsabilité du prestataire",
    enjeu: "Déterminer si l’intrusion engage la responsabilité du prestataire chargé de sécuriser le système.",
    rub: [
      { k: "Situation", v: "Après une intrusion, l’entreprise met en cause la sécurisation et l’administration de son système d’information." },
      { k: "Difficulté", v: "Rapprocher le déroulement de l’attaque des configurations, des accès et des interventions réalisées." },
      { k: "Intervention", v: "Expertise conduite avec un conseil technique ; observations rattachant chaque constat aux obligations du contrat." },
      { k: "État", v: "Opérations d’expertise en cours." },
    ],
  },
];

/* Déroulement — cinq étapes ; les livrables deviennent des étiquettes. */
const DEROULE: { n: string; t: string; p: string; tags?: string[]; dark?: boolean }[] = [
  { n: "1", t: "Premier échange", p: "Le différend, son état d’avancement et les échéances connues." },
  { n: "2", t: "Collecte ciblée", p: "La liste des seuls documents utiles à ce stade.", tags: ["Stratégie de conservation des preuves"] },
  { n: "3", t: "Analyse juridique et technique", p: "Chronologie, obligations de chacun, confrontation aux faits constatés.", tags: ["Chronologie documentée", "Matrice du litige", "Note de responsabilités", "Préjudices et clauses limitatives"] },
  { n: "4", t: "Présentation des scénarios", p: "Options, risques, délais et conséquences financières de chacune." },
  { n: "5", t: "Mise en œuvre", p: "En négociation, en expertise ou devant le juge.", tags: ["Mise en demeure", "Protocole transactionnel", "Assignation", "Conclusions", "Demande d’expertise", "Dires à l’expert"], dark: true },
];

/* Intervenants (id="intervenants"). Barreau de Me Ben Majed : « Évry (Essonne) »,
   même formule que la page cybercriminalité. */
const EQUIPE: { statut: string; nom: string; barreau: string; texte: string; photo: string; dark?: boolean }[] = [
  { statut: "Avocat", nom: "Me Alexandre Lazarègue", barreau: "Barreau de Paris — droit du numérique et contentieux", texte: "Définit la stratégie, organise la preuve et conduit la négociation ou la procédure.", photo: "/images/alexandre-pro.jpg" },
  { statut: "Avocat", nom: "Me Amir Ben Majed", barreau: "Avocat au barreau d’Évry (Essonne)", texte: "Analyse contractuelle, chronologie du projet, mises en demeure, expertises et écritures.", photo: "/images/amir-pro.jpg" },
  { statut: "Consultant technique en cybersécurité", nom: "Khalid Sookia", barreau: "Systèmes d’information et cybersécurité", texte: "Examine journaux, configurations, sauvegardes, versions et conditions techniques de la réversibilité.", photo: "/images/khalid-pro.jpg", dark: true },
];

/* Six questions fréquentes — `<details>` natif, premier ouvert. */
const FAQ: { q: string; a: string }[] = [
  { q: "Quand consulter un avocat dans un projet informatique en difficulté ?", a: "Avant l’envoi d’une mise en demeure, avant une résiliation et avant tout écrit qui pourra vous être opposé. À ce stade, échanges, tickets et journaux existent encore, et les clauses de notification peuvent être mises en œuvre utilement. Une consultation après la rupture laisse moins de latitude." },
  { q: "Peut-on résilier un contrat informatique qui ne fonctionne pas ?", a: "C’est possible, mais les conditions comptent autant que le principe. Le contrat organise le plus souvent une notification préalable, un délai de correction et des modalités de résiliation. Une rupture qui s’en écarte peut être jugée fautive et exposer son auteur. Il faut également anticiper la continuité du service et la restitution des données, faute de quoi l’entreprise se retrouve sans solution opérationnelle." },
  { q: "Une expertise judiciaire est-elle toujours nécessaire ?", a: "Non. Elle s’impose lorsque les faits techniques sont réellement contestés et que le débat ne peut être tranché sur pièces. Lorsque les documents contractuels, les échanges et les journaux suffisent à établir les manquements, d’autres voies existent : constat, mesure de preuve avant tout procès, ou discussion directe sur les pièces. Son coût et sa durée se mesurent à l’enjeu." },
  { q: "Une recette signée empêche-t-elle toute contestation ?", a: "Pas nécessairement. Tout dépend des termes du procès-verbal, des réserves qui y figurent, du périmètre effectivement vérifié et des obligations qui subsistent après la recette, notamment de maintenance ou de garantie. Une acceptation ne couvre pas davantage ce qui n’était pas décelable lors des tests." },
  { q: "Un prestataire est-il automatiquement responsable d’une perte de données ?", a: "Non. La responsabilité suppose d’identifier une obligation précise — sauvegarde, restauration, sécurisation, administration — et de la rapprocher de ce qui a été effectivement réalisé. Le périmètre contractuel, la nature de l’obligation, les clauses limitatives et le comportement du client entrent dans la discussion. C’est la confrontation des engagements aux constatations techniques qui détermine l’issue." },
  { q: "Le cabinet défend-il également les prestataires informatiques ?", a: "Oui. Éditeurs, ESN, intégrateurs, infogérants et hébergeurs sont défendus dans les mêmes conditions, sous réserve de l’absence de conflit d’intérêts. La défense d’un prestataire suppose notamment d’examiner le devoir de collaboration du client, le périmètre réel des engagements souscrits et l’imputabilité des difficultés rencontrées." },
];

const LIENS: { href: string; t: string; d: string }[] = [
  { href: R_CONTRATS, t: "Contrats informatiques", d: "Sécuriser un contrat avant tout différend : audit, rédaction, négociation." },
  { href: R_CYBERSECURITE, t: "Cybersécurité et NIS 2", d: "Obligations de sécurité, NIS 2 et gestion juridique d’un incident." },
  { href: R_CYBERCRIMINALITE, t: "Cybercriminalité", d: "Porter plainte et faire poursuivre l’auteur d’une attaque." },
  { href: R_RGPD, t: "RGPD et violations de données", d: "Notification d’une violation et relations avec la CNIL." },
];

function ArrowDown() {
  return (
    <svg className="chain-arrow" width="14" height="20" viewBox="0 0 14 20" aria-hidden="true">
      <path d="M7 0v18M1 12l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className={styles.skipLink} href="#contenu">Aller au contenu</a>

      <div className={styles.contentieux}>
        <nav className="crumbs dark" aria-label="Fil d’Ariane">
          <div className="wrap">
            <ol>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/nos-domaines">Domaines d’intervention</Link></li>
              <li><span aria-current="page">Contentieux informatique et commercial</span></li>
            </ol>
          </div>
        </nav>

        <main id="contenu" tabIndex={-1}>
          {/* 1 · HERO */}
          <section className="hero dark" aria-labelledby="h1">
            <div className="wrap">
              <div className="hero-grid">
                <div className="hero-main">
                  <p className="eyebrow">Contentieux informatique · Litiges commerciaux · Paris et toute la France</p>
                  <h1 id="h1">Avocat en contentieux <span className="accent">informatique</span> et commercial</h1>
                  <p className="hero-promise">{fr("Projet informatique qui n’aboutit pas, données perdues, prestataire qui se retire, loyers réclamés pour une solution qui ne fonctionne pas : le litige se joue d’abord sur la preuve. Le cabinet relie le contrat, la chronologie et les faits techniques pour choisir l’issue adaptée — négociation, expertise, mesure urgente ou procès.")}</p>

                  {/* Mobile : encadré « avocats + consultant technique » */}
                  <div className="hero-team" aria-hidden="true">
                    <span className="ini ini--a">AL</span>
                    <span className="ini ini--b">AB</span>
                    <span className="ini ini--c">KS</span>
                    <span className="hero-team-txt">Avocats et consultant technique sur le même dossier</span>
                  </div>

                  <p className="hero-cta">
                    <a className="btn" href="#contact">Faire le point sur le litige</a>
                    <a className="hero-link" href="#voies">Voir les voies possibles ↓</a>
                  </p>
                  <p className="hero-reassure">Clients comme prestataires · en demande comme en défense</p>
                </div>

                {/* Desktop : la matrice du litige */}
                <aside className="hero-aside" aria-label="La matrice du litige">
                  <p className="aside-label">La matrice du litige</p>
                  <p className="aside-lede">{fr("Chaque reproche relié à ce qui peut être démontré.")}</p>
                  <div className="chain">
                    {MATRICE.map((m, i) => (
                      <div key={m.k}>
                        <div className={m.hot ? "chain-cell chain-cell--hot" : "chain-cell"}>
                          <span className="chain-k">{m.k}</span>
                          <span className="chain-v">{fr(m.v)}</span>
                        </div>
                        {i < MATRICE.length - 1 && <ArrowDown />}
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* 2 · SITUATIONS */}
          <section aria-labelledby="h-situations">
            <div className="wrap">
              <div className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Votre situation</p>
                  <h2 id="h-situations">{fr("Quelle difficulté rencontrez-vous ?")}</h2>
                </div>
                <p className="lede">{fr("Trois moments où le cabinet est le plus souvent sollicité.")}</p>
              </div>
              <div className="sit-grid">
                <article className="sit">
                  <span className="sit-n">01</span>
                  <h3>Le projet ne fonctionne pas</h3>
                  <ul>
                    <li>Retards et anomalies qui persistent</li>
                    <li>Solution livrée non conforme à ce qui était attendu</li>
                    <li>Migration ou intégration qui échoue, données perdues</li>
                    <li>Factures contestées, prestataire mis en cause</li>
                  </ul>
                </article>
                <article className="sit">
                  <span className="sit-n">02</span>
                  <h3>La relation avec le prestataire se rompt</h3>
                  <ul>
                    <li>Résiliation annoncée ou déjà notifiée</li>
                    <li>Données non restituées, changement de prestataire bloqué</li>
                    <li>Reproches croisés sur la collaboration de chacun</li>
                  </ul>
                </article>
                <article className="sit">
                  <span className="sit-n">03</span>
                  <h3>Le litige est engagé</h3>
                  <ul>
                    <li>Mise en demeure reçue ou envoyée</li>
                    <li>{fr("Assignation, y compris en référé (procédure d’urgence)")}</li>
                    <li>Expertise demandée ou déjà ordonnée</li>
                  </ul>
                </article>
              </div>
            </div>
          </section>

          {/* 3 · MESURES IMMÉDIATES */}
          <section className="ghost" aria-labelledby="h-mesures">
            <div className="wrap pvd-grid">
              <div className="pvd-intro">
                <p className="eyebrow">Premiers réflexes</p>
                <h2 id="h-mesures">Les décisions à prendre sans attendre</h2>
                <p className="lede">{fr("Les premiers jours déterminent ce qui pourra être démontré ensuite. Trois gestes précèdent toute prise de position écrite.")}</p>
                <blockquote className="pvd-quote">{fr("Une mise en demeure envoyée trop tôt ou une rupture mal préparée peut fragiliser la preuve et la continuité du service.")}</blockquote>
              </div>
              <div className="pvd">
                <section>
                  <span className="pvd-big">Préserver</span>
                  <ul>
                    <li>Contrats, annexes et versions successives</li>
                    <li>{fr("Tickets, journaux et échanges, exportés dans un format exploitable")}</li>
                    <li>{fr("Anomalies documentées sans modifier l’environnement")}</li>
                  </ul>
                </section>
                <section>
                  <span className="pvd-big">Vérifier</span>
                  <ul>
                    <li>Accès détenus par chaque partie</li>
                    <li>État réel des sauvegardes</li>
                    <li>Sommes payées et sommes réclamées</li>
                    <li>{fr("Clauses de préavis, de résiliation et de réversibilité")}</li>
                  </ul>
                </section>
                <section>
                  <span className="pvd-big">Décider</span>
                  <ul>
                    <li>{fr("Risque d’interruption du service")}</li>
                    <li>{fr("Délais qui peuvent fermer une action")}</li>
                    <li>Moment et forme du premier écrit</li>
                  </ul>
                </section>
              </div>
            </div>
          </section>

          {/* 4 · CE QUI DISTINGUE LE CABINET (navy) */}
          <section className="dark distingue" aria-labelledby="h-distingue">
            <div className="wrap dist-grid">
              <div className="dist-main">
                <p className="eyebrow">Ce qui distingue le cabinet</p>
                <p className="dist-phrase" id="h-distingue">{fr("Le contrat dit ce qui était dû. Les journaux, les tickets et les sauvegardes disent ce qui s’est réellement passé.")}</p>
                <p className="dist-sub">{fr("Le cabinet fait travailler ensemble avocats et consultant technique pour lire les deux.")}</p>
                <a className="dist-link" href="#intervenants">Voir comment ils interviennent ↓</a>
              </div>
              <div className="dist-people">
                {EQUIPE.map((m) => (
                  <figure className={m.dark ? "dist-p dist-p--hot" : "dist-p"} key={m.nom}>
                    <div className="dist-photo">
                      <Image src={m.photo} alt={m.nom} fill sizes="150px" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <figcaption>
                      {m.nom.replace("Me Alexandre Lazarègue", "Me Lazarègue").replace("Me Amir Ben Majed", "Me Ben Majed")}<br />
                      <span>{m.statut}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* 5 · CE QU'IL FAUT ÉTABLIR */}
          <section aria-labelledby="h-methode">
            <div className="wrap">
              <div className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Construction du dossier</p>
                  <h2 id="h-methode">Ce qu’il faut établir avant d’agir</h2>
                </div>
                <div className="split-aside">
                  <p className="lede">{fr("Un litige informatique ne se résume pas à savoir qui a tort. Chaque reproche doit être relié à un engagement, à un fait constaté, à une preuve et à une conséquence.")}</p>
                  <p className="strong">{fr("C’est l’objet de la matrice du litige, souvent le premier document utile.")}</p>
                </div>
              </div>

              {/* Desktop : table ; mobile : cartes défilantes */}
              <table className="matrix">
                <thead>
                  <tr>
                    <th scope="col">Engagement</th>
                    <th scope="col">Fait constaté</th>
                    <th scope="col">Preuve disponible</th>
                    <th scope="col" className="matrix-hot">Conséquence</th>
                  </tr>
                </thead>
                <tbody>
                  {EXEMPLES.map((r) => (
                    <tr key={r.e}>
                      <th scope="row">{fr(r.e)}</th>
                      <td>{fr(r.f)}</td>
                      <td className="matrix-muted">{fr(r.p)}</td>
                      <td className="matrix-hot">{fr(r.c)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="matrix-cards" role="group" aria-label="Trois exemples de la matrice du litige">
                {EXEMPLES.map((r, i) => (
                  <article className="mcard" key={r.e}>
                    <span className="mcard-idx">Exemple {i + 1} / 3</span>
                    <div className="mcard-cell"><span className="mcard-k">Engagement</span><span className="mcard-v">{fr(r.e)}</span></div>
                    <ArrowDown />
                    <div className="mcard-cell"><span className="mcard-k">Fait constaté</span><span className="mcard-v">{fr(r.f)}</span></div>
                    <ArrowDown />
                    <div className="mcard-cell"><span className="mcard-k">Preuve</span><span className="mcard-v">{fr(r.p)}</span></div>
                    <ArrowDown />
                    <div className="mcard-cell mcard-cell--hot"><span className="mcard-k">Conséquence</span><span className="mcard-v">{fr(r.c)}</span></div>
                  </article>
                ))}
              </div>
              <p className="drag" aria-hidden="true"><span className="drag-dot drag-dot--on" /><span className="drag-dot" /><span className="drag-dot" /><span className="drag-txt">Faire glisser</span></p>

              <p className="note-box">{fr("La recette est l’opération par laquelle le client vérifie et accepte la solution livrée, le plus souvent par un procès-verbal, avec ou sans réserves.")}</p>
            </div>
          </section>

          {/* 6 · TYPOLOGIES */}
          <section className="ghost" aria-labelledby="h-typologies">
            <div className="wrap">
              <div className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Champ d’intervention</p>
                  <h2 id="h-typologies">Les principaux contentieux informatiques</h2>
                </div>
                <p className="lede">{fr("Six familles de litiges traitées par le cabinet.")}</p>
              </div>

              {/* Desktop : grille de cartes */}
              <div className="typo-grid">
                {TYPOLOGIES.map((t) => (
                  <article className="typo" key={t.n}>
                    <span className="typo-n">{t.n}</span>
                    <h3>{fr(t.t)}</h3>
                    <p>{fr(t.p)}</p>
                  </article>
                ))}
              </div>

              {/* Mobile : accordéon (premier ouvert) */}
              <div className="typo-acc acc">
                {TYPOLOGIES.map((t, i) => (
                  <details className="acc-item" key={t.n} open={i === 0}>
                    <summary>
                      <span className="typo-n">{t.n}</span>
                      <h3 className="acc-q">{fr(t.t)}</h3>
                      <span className="acc-sign" aria-hidden="true" />
                    </summary>
                    <div className="acc-panel"><p>{fr(t.p)}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 7 · VOIES POSSIBLES */}
          <section id="voies" className="dark demo2" aria-labelledby="h-solutions">
            <div className="wrap">
              <div className="v-intro">
                <div>
                  <p className="eyebrow">Voies possibles</p>
                  <h2 id="h-solutions">Négocier, faire exécuter, organiser la sortie ou saisir le juge</h2>
                </div>
                <div className="v-intro-aside">
                  <p className="lede">{fr("La procédure n’est pas une fin : elle sert un objectif économique — remettre le projet en marche, récupérer des données, limiter une perte ou obtenir une indemnisation.")}</p>
                  <p className="v-strong">{fr("La mise en demeure n’est jamais une réponse automatique.")}</p>
                </div>
              </div>
              <WaysTabs />
            </div>
          </section>

          {/* 8 · EXPERTISE JUDICIAIRE */}
          <section aria-labelledby="h-expertise">
            <div className="wrap">
              <div className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Mesure d’instruction</p>
                  <h2 id="h-expertise">Préparer et conduire une expertise judiciaire informatique</h2>
                </div>
                <p className="lede">{fr("C’est à ce stade que l’association d’avocats et d’un consultant technique prend tout son sens.")}</p>
              </div>
              <ol className="frise">
                {EXPERTISE.map((s) => (
                  <li className={s.last ? "frise-step frise-step--last" : "frise-step"} key={s.n}>
                    <span className="frise-num">{s.n}</span>
                    <h3>{s.t}</h3>
                    <p>{fr(s.p)}</p>
                  </li>
                ))}
              </ol>
              <p className="expertise-cta"><a className="btn btn-outline" href="#contact">Faire le point sur une expertise en cours</a></p>
            </div>
          </section>

          {/* 9 · CAS CLIENTS */}
          <section className="ghost" aria-labelledby="h-cas">
            <div className="wrap">
              <div className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Cas clients</p>
                  <h2 id="h-cas">Deux exemples parmi les dossiers du cabinet</h2>
                </div>
                <p className="lede">{fr("Deux dossiers en cours, présentés de manière anonyme.")}</p>
              </div>
              <div className="cases">
                {CAS.map((c) => (
                  <article className="case" key={c.tag}>
                    <div className="case-head">
                      <div className="case-top">
                        <span className="case-tag">{c.tag}</span>
                        <span className="case-badge">{c.badge}</span>
                      </div>
                      <h3>{fr(c.titre)}</h3>
                    </div>
                    <div className="case-enjeu">
                      <span className="case-enjeu-k">L’enjeu</span>
                      <p>{fr(c.enjeu)}</p>
                    </div>
                    <div className="case-rubs">
                      {c.rub.map((r) => (
                        <div key={r.k}>
                          <p className="rub">{r.k}</p>
                          <p className="rt">{fr(r.v)}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <p className="cases-note">Dossiers anonymisés — procédures en cours.</p>
            </div>
          </section>

          {/* 10 · DÉROULEMENT */}
          <section aria-labelledby="h-deroule">
            <div className="wrap">
              <div className="sec-head sec-head--split">
                <div>
                  <p className="eyebrow">Déroulement</p>
                  <h2 id="h-deroule">{fr("Comment commence l’intervention ?")}</h2>
                </div>
                <p className="lede">{fr("Il n’est pas nécessaire de réunir tous les courriels et contrats avant le premier échange. Le tri des pièces fait partie du travail.")}</p>
              </div>
              <ol className="deroule">
                {DEROULE.map((s) => (
                  <li className={s.dark ? "der-step der-step--dark" : "der-step"} key={s.n}>
                    <span className="der-num">{s.n}</span>
                    <h3>{s.t}</h3>
                    <p>{fr(s.p)}</p>
                    {s.tags && (
                      <p className="der-tags">
                        {s.tags.map((t) => <span className="tag" key={t}>{fr(t)}</span>)}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 11 · INTERVENANTS */}
          <section className="ghost" id="intervenants" aria-labelledby="h-equipe">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Intervenants</p>
                <h2 id="h-equipe">Une analyse juridique appuyée par une compréhension technique</h2>
              </div>
              <ul className="team">
                {EQUIPE.map((m) => (
                  <li className={m.dark ? "member member--hot" : "member"} key={m.nom}>
                    <div className="portrait">
                      <Image src={m.photo} alt={m.nom} fill sizes="(max-width: 900px) 76px, 33vw" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="member-body">
                      <span className="member-statut">{m.statut}</span>
                      <h3>{m.nom}</h3>
                      <p className="role">{fr(m.barreau)}</p>
                      <p>{fr(m.texte)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="team-closing">{fr("Constats techniques, obligations contractuelles et demandes présentées au juge sont construits ensemble.")}</p>
            </div>
          </section>

          {/* 12 · HONORAIRES */}
          <section className="warm" aria-labelledby="h-honoraires">
            <div className="wrap fees-grid">
              <div className="fees-intro">
                <p className="eyebrow">Honoraires</p>
                <h2 id="h-honoraires">{fr("Comment sont fixés les honoraires ?")}</h2>
                <div className="fees-hi"><p>{fr("Une première mission peut être limitée à l’analyse du dossier, des responsabilités et des options, avant toute décision d’engager une procédure.")}</p></div>
              </div>
              <FeesLists />
            </div>
          </section>

          {/* 13 · FAQ */}
          <section className="ghost" aria-labelledby="h-faq">
            <div className="wrap faq-grid">
              <div className="sec-head">
                <p className="eyebrow">Questions fréquentes</p>
                <h2 id="h-faq">Questions fréquentes sur les contentieux informatiques</h2>
              </div>
              <div className="acc">
                {FAQ.map((item, i) => (
                  <details className="acc-item" key={item.q} open={i === 0}>
                    <summary>
                      <h3 className="acc-q">{fr(item.q)}</h3>
                      <span className="acc-sign" aria-hidden="true" />
                    </summary>
                    <div className="acc-panel"><p>{fr(item.a)}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 14 · AVANT, À CÔTÉ ET APRÈS */}
          <section aria-labelledby="h-liens">
            <div className="wrap">
              <div className="sec-head">
                <p className="eyebrow">Avant, à côté et après le litige</p>
                <h2 id="h-liens" className="sr-only">Sujets liés</h2>
              </div>
              <div className="related">
                {LIENS.map((l) => (
                  <Link className="related-item" href={l.href} key={l.href}>
                    <strong>{l.t} →</strong>
                    <span>{fr(l.d)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 15 · CONTACT */}
          <section className="dark" id="contact" aria-labelledby="h-contact">
            <div className="wrap contact-grid">
              <div className="contact-intro">
                <p className="eyebrow">Parlons de votre situation</p>
                <h2 id="h-contact">Faire le point sur le litige</h2>
                <p className="lede">{fr("Quelques lignes suffisent : le différend, son état d’avancement, les échéances en cours. Le cabinet vous indique ensuite les premiers documents utiles. Aucune pièce n’est nécessaire à ce stade.")}</p>
                <address className="addr">
                  Lazarègue Avocats<br />
                  18 rue de Tilsitt, 75017 Paris<br />
                  <a href={TEL_HREF}>{TEL_DISPLAY}</a><br />
                  <span className="addr-mono">Paris · intervention partout en France</span>
                </address>
              </div>
              <div className="form form--ondark">
                <ContactForm />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
