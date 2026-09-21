import type { Metadata } from "next";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./cybercriminalite.module.css";
import { FAQ_ITEMS } from "./faq";
import { PalaisVideo } from "./PalaisVideo";

const HERO_POSTER = "/images/poster-tribunal-exterieur.jpg";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/cybercriminalite";
const TEL = "tel:+33181706200";

const CT = "/contact?objet=cybercriminalite";
const CT_VICTIME = "/contact?objet=cybercriminalite&position=victime";
const CT_MIS = "/contact?objet=cybercriminalite&position=mis-en-cause";

const R_CYBER = "/nos-domaines/cybersecurite";
const R_RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const R_CONTENTIEUX = "/nos-domaines/contentieux-informatique-commercial";
const R_ESCRO = "/nos-domaines/escroquerie-fraude-bancaire";

const TITLE = "Avocat en cybercriminalité à Paris | Lazarègue Avocats";
const DESCRIPTION =
  "Intrusion, rançongiciel, exfiltration ou mise en cause : Lazarègue Avocats construit la plainte ou la défense pénale des entreprises.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
    { "@type": "ListItem", position: 2, name: "Nos domaines", item: `${URL_BASE}/nos-domaines` },
    { "@type": "ListItem", position: 3, name: "Cybercriminalité", item: `${URL_BASE}${PATH}` },
  ],
};

/* « Avant d’agir » — remplace « Ce que le cabinet examine » (textes nouveaux, §4). */
const QUESTIONS = [
  { n: "01", h: "Que s’est-il réellement passé ?", p: "Les traces de connexion et les messages prouvent certaines choses, pas d’autres. Le cabinet distingue ce qui est établi de ce qui n’est qu’une supposition." },
  { n: "02", h: "Qui avait le droit d’accéder au système ?", p: "Un ancien salarié dont l’accès n’a pas été coupé n’est pas dans la même situation qu’un pirate extérieur. C’est souvent sur ce point que le dossier se joue." },
  { n: "03", h: "Qu’est-ce qui a été conservé, et comment ?", p: "Une preuve mal recueillie peut être écartée. Il faut savoir quoi garder et comment le garder avant de remettre les systèmes en marche." },
  { n: "04", h: "Êtes-vous victime ou mis en cause ?", p: "La stratégie, le calendrier et ce que l’on peut demander à la justice en dépendent. Une entreprise peut d’ailleurs être l’une, puis l’autre." },
];

/* Situations (6) + position en toutes lettres (§4.3). */
const SITUATIONS = [
  { h: "Rançongiciel et blocage du système", p: "Le système est chiffré ou rendu indisponible, une contrepartie est réclamée. Deux qualifications se cumulent, entrave et extorsion.", who: "Victime" },
  { h: "Ancien salarié encore connecté", p: "Les accès n’ont pas été révoqués au départ. L’accès initial était légitime ; le maintien, lui, ne l’est plus.", who: "Victime" },
  { h: "Base clients partie avec un collaborateur", p: "Fichiers copiés avant la fin du contrat. Volet pénal et secret des affaires n’obéissent pas au même calendrier.", who: "Victime" },
  { h: "Comptes compromis en masse", p: "Des milliers d’accès utilisés en quelques heures. La question devient : que permettait réellement le système ?", who: "Victime, parfois interrogée" },
  { h: "Détournement de virement", p: "Un ordre obtenu par manœuvre, exécuté vers un compte tiers. La qualification d’escroquerie ouvre d’autres actes que le seul volet informatique.", who: "Victime" },
  { h: "Entreprise ou dirigeant mis en cause", p: "Une adresse IP, un journal, un témoignage désignent l’entreprise. La défense se construit sur les éléments techniques du dossier.", who: "Mis en cause" },
];

const QUALIF = [
  { s: "Un tiers entre dans le système", q: "Accès frauduleux dans un système de traitement automatisé de données", t: "art. 323-1 C. pén.", e: "La suppression ou la modification de données aggrave la peine encourue" },
  { s: "Un ancien salarié conserve ses accès", q: "Maintien frauduleux dans un système", t: "art. 323-1 C. pén.", e: "L’accès initial légitime n’exclut pas l’infraction" },
  { s: "Le système est bloqué ou saturé", q: "Entrave au fonctionnement d’un système", t: "art. 323-2 C. pén.", e: "Qualification distincte du seul accès, et plus lourdement réprimée" },
  { s: "Des données sont extraites ou copiées", q: "Extraction, reproduction ou transmission frauduleuse de données", t: "art. 323-3 C. pén.", e: "Rédaction issue de la loi du 24 juillet 2015" },
  { s: "Une contrepartie est exigée sous menace", q: "Extorsion", t: "art. 312-1 C. pén.", e: "Souvent plus adaptée que le seul volet informatique" },
  { s: "La base clients part avec le salarié", q: "Vol, ou abus de confiance selon les circonstances", t: "art. 311-1, 314-1 C. pén.", e: "Articulation à prévoir avec le secret des affaires" },
];

const METHODE = [
  { n: "01", h: "Préserver", p: "Journaux d’intervention, accès distants, courriels, horodatages : chaque élément est une pièce, et sa valeur dépend des conditions dans lesquelles il a été recueilli. Les décisions de conservation se prennent avant la remise en service." },
  { n: "02", h: "Qualifier", p: "Accès, maintien, entrave, atteinte aux données, extorsion, escroquerie : la qualification retenue oriente l’enquête et détermine ce qui peut être demandé. Elle se discute au vu des éléments techniques, elle ne se subit pas." },
  { n: "03", h: "Construire", p: "Une plainte documentée expose les faits, les qualifications envisageables et les investigations utiles. Les actes d’enquête — réquisitions, perquisitions informatiques, expertise — relèvent de la décision des autorités compétentes, que la plainte éclaire sans les commander." },
];

/* Dossiers (3) — bandeau sombre titré + position en toutes lettres (§4.6), pas d’« Issue ». */
const CASES = [
  {
    pp: "Dossier 01 · Victime", ct: "Ancien salarié · accès administrateur",
    situation: "Une administratrice système conserve ses accès après son départ. Pendant plusieurs jours, des comptes sont désactivés et des services rendus indisponibles, tandis que l’entreprise reçoit des demandes de paiement. Le cabinet assistait l’entreprise visée.",
    difficulte: "Rattacher les événements techniques à l’auteur des messages.",
    intervention: "Conservation des journaux de connexion avant toute remise en service ; plainte visant le maintien frauduleux dans le système et l’extorsion, plutôt que le seul volet données ; corrélation horodatée entre les connexions distantes et l’envoi des demandes, versée à la procédure.",
  },
  {
    pp: "Dossier 02 · Victime, puis interrogée", ct: "Compromission de comptes et de données",
    situation: "Des milliers de comptes sont utilisés en quelques heures au moyen d’outils automatisés. L’entreprise, d’abord victime, se voit interroger sur le niveau de sécurité qu’elle avait déployé.",
    difficulte: "Déterminer ce que le système permettait réellement, et l’étendue exacte des données accessibles.",
    intervention: "Reconstitution des conditions d’accès à partir des journaux ; distinction entre les données effectivement atteintes et celles seulement exposées ; discussion des limites techniques des infractions envisagées ; articulation du volet pénal avec les obligations relatives aux données personnelles.",
  },
  {
    pp: "Dossier 03 · Mis en cause", ct: "Mise en cause fondée sur une adresse IP",
    situation: "Une entreprise est désignée par une adresse IP figurant dans une procédure d’intrusion. Le cabinet intervenait en défense.",
    difficulte: "Une adresse identifie un abonnement à un instant donné, ni une personne ni une intention.",
    intervention: "Demande d’accès à l’intégralité des éléments techniques ; vérification de la méthode et des conditions de collecte ; confrontation de la chronologie retenue par l’enquête avec celle que documentaient les journaux ; discussion de la qualification au regard de ce que les pièces établissaient.",
  },
];

/* Équipe — barreaux exacts (Sarah corrigée : Paris et Montréal, §2). Photos réelles. */
const TEAM = [
  { nom: "Me Alexandre Lazarègue", barreau: "Avocat au Barreau de Paris", role: "Droit pénal du numérique", photo: "/images/alexandre-pro.jpg" },
  { nom: "Me Amir Ben Majed", barreau: "Avocat au Barreau d’Évry (Essonne)", role: "Contentieux informatique et pénal", photo: "/images/amir-pro.jpg" },
  { nom: "Me Sarah Hinderer", barreau: "Avocate aux Barreaux de Paris et de Montréal", role: "Données personnelles et pénal", photo: "/images/sarah-pro.jpg" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <link rel="preload" as="image" href={HERO_POSTER} fetchPriority="high" />
      <a className={styles.skipLink} href="#contenu">Aller au contenu principal</a>

      <div className={styles.cc}>
        {/* 0 · BANDEAU D’URGENCE (seul rouge) */}
        <div className="urgent" role="note">
          <div className="wrap">
            <span>Incident en cours&nbsp;?</span>
            <a href={TEL}>Appelez directement le 01&nbsp;81&nbsp;70&nbsp;62&nbsp;00</a>
          </div>
        </div>

        <main id="contenu">
          {/* 1 · HÉRO — vidéo fondue en fond */}
          <section className="hero-y onDark" aria-labelledby="h1">
            <PalaisVideo
              webm="/videos/tribunal-exterieur.webm"
              mp4="/videos/tribunal-exterieur.mp4"
              poster={HERO_POSTER}
              preload="metadata"
              containerClassName="vidbg"
            />
            <div className="wrap">
              <nav className="crumb" aria-label="Fil d’Ariane">
                <ol>
                  <li><Link href="/">Accueil</Link> <span aria-hidden="true">/</span></li>
                  <li><Link href="/nos-domaines">Nos domaines</Link> <span aria-hidden="true">/</span></li>
                  <li aria-current="page">Cybercriminalité</li>
                </ol>
              </nav>
              <div className="heroInner">
                <p className="kicker">Cybercriminalité · Droit pénal · Victimes et mis en cause</p>
                <h1 id="h1">Avocat en cybercriminalité</h1>
                <p className="chapo">{fr("Le cabinet confronte les faits techniques, les autorisations et les éléments disponibles afin de construire la plainte ou la défense pénale.")}</p>
                <p className="repere">PME et ETI · Paris et toute la France · intervention rapide selon la situation</p>
                <div className="btns">
                  <a className="btn" href={TEL}>Nous appeler — 01 81 70 62 00</a>
                  <Link className="btn btn--ghost" href={CT}>Décrire les faits par écrit</Link>
                </div>
                <p className="conf">N’adressez aucun original par le formulaire.</p>
                <nav className="doors" aria-label="Choisir sa position">
                  <a href="#victime"><span><small>Première position</small><b>Vous êtes victime</b></span><span aria-hidden="true">↓</span></a>
                  <a href="#mis-en-cause"><span><small>Seconde position</small><b>Vous êtes mis en cause</b></span><span aria-hidden="true">↓</span></a>
                </nav>
              </div>
            </div>
          </section>

          {/* 2 · AVANT D’AGIR — les quatre questions */}
          <section aria-labelledby="h-q4">
            <div className="wrap">
              <p className="kicker">Avant d’agir</p>
              <h2 id="h-q4">Les quatre questions que le cabinet se pose d’abord</h2>
              <p className="lead">Leurs réponses déterminent ce qui pourra être prouvé et défendu devant la justice.</p>
              <div className="four">
                {QUESTIONS.map((q) => (
                  <article key={q.n}>
                    <span className="n">{q.n}</span>
                    <div>
                      <h3>{fr(q.h)}</h3>
                      <p>{fr(q.p)}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="bridge-line">Vous cherchez plutôt à prévenir une attaque&nbsp;? <Link href={R_CYBER}>Voir notre accompagnement en cybersécurité</Link>.</p>
            </div>
          </section>

          {/* 3 · SITUATIONS PÉNALES */}
          <section className="alt" aria-labelledby="h-sit">
            <div className="wrap">
              <p className="kicker">Situations</p>
              <h2 id="h-sit">Quand une affaire informatique devient une affaire pénale</h2>
              <div className="six" style={{ marginTop: "var(--s6)" }}>
                {SITUATIONS.map((s, i) => (
                  <article className={i === SITUATIONS.length - 1 ? "sixc sixc--mis" : "sixc"} key={s.h}>
                    <h3>{fr(s.h)}</h3>
                    <p>{fr(s.p)}</p>
                    <p className="who">{s.who}</p>
                  </article>
                ))}
              </div>
              <p className="fraude-line">Un virement détourné relève aussi de <Link href={R_ESCRO}>la page fraude bancaire et escroquerie</Link>, pour les recours contre les banques.</p>
            </div>
          </section>

          {/* 4 · QUALIFICATIONS */}
          <section aria-labelledby="h-qual">
            <div className="wrap">
              <p className="kicker">Qualification pénale</p>
              <h2 id="h-qual">Les qualifications en jeu</h2>
              <p className="lead">{fr("La qualification commande le service d'enquête saisi, les actes qui peuvent être demandés et ce qui peut être réclamé. Elle se discute.")}</p>
              <figure className="tbl">
                <table>
                  <caption>{fr("Qualifications pénales les plus fréquentes en matière d'atteinte aux systèmes d'information")}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Situation</th>
                      <th scope="col">Qualification</th>
                      <th scope="col">Texte</th>
                      <th scope="col">Enjeu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUALIF.map((row) => (
                      <tr key={row.s}>
                        <th scope="row">{fr(row.s)}</th>
                        <td data-label="Qualification">{fr(row.q)}</td>
                        <td className="ref" data-label="Texte">{row.t}</td>
                        <td className="stake" data-label="Enjeu">{fr(row.e)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <figcaption className="meta" style={{ marginTop: "var(--s4)" }}>Références vérifiées au 14 septembre 2026.</figcaption>
              </figure>
              <p style={{ marginTop: "var(--s5)" }}>
                {fr("Violation de données et contrôle de l'autorité : voir ")}<Link href={R_RGPD}>données personnelles</Link>{fr(". Prévention et conformité : voir ")}<Link href={R_CYBER}>cybersécurité</Link>.
              </p>
            </div>
          </section>

          {/* 5 · MÉTHODE (3 colonnes) */}
          <section className="alt" aria-labelledby="h-m">
            <div className="wrap">
              <p className="kicker">Méthode</p>
              <h2 id="h-m">Préserver, qualifier, construire</h2>
              <p className="lead">{fr("Un dossier pénal ne se joue pas en heures mais en mois. Ce qui se décide le premier jour détermine ce qui pourra être établi à l'audience.")}</p>
              <ol className="meth" style={{ marginTop: "var(--s6)" }}>
                {METHODE.map((m) => (
                  <li key={m.n}>
                    <span className="n">{m.n}</span>
                    <h3>{fr(m.h)}</h3>
                    <p>{fr(m.p)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 6 · VICTIME / MIS EN CAUSE — deux panneaux pleine largeur */}
          <div className="pos" aria-label="Deux positions">
            <section id="victime" className="pos-v" aria-labelledby="h-vi">
              <p className="kicker">Deux positions · 1</p>
              <h2 id="h-vi">Vous êtes victime</h2>
              <ul>
                <li><span>01</span>Préservation et mise en forme des éléments techniques</li>
                <li><span>02</span>{fr("Choix de la voie : plainte simple, constitution de partie civile, citation directe")}</li>
                <li><span>03</span>{fr("Rédaction de la plainte et demandes d'actes")}</li>
                <li><span>04</span>Suivi de la procédure et relance</li>
                <li><span>05</span>Demande de réparation</li>
              </ul>
              <p className="gl"><b>En clair.</b> {fr("La constitution de partie civile saisit un juge d'instruction de la plainte ; la citation directe saisit le tribunal sans enquête préalable. Le choix dépend de ce que le dossier permet déjà d'établir.")}</p>
              <div><Link className="btn" href={CT_VICTIME}>Décrire les faits par écrit</Link></div>
            </section>
            <section id="mis-en-cause" className="pos-m onDark" aria-labelledby="h-mc">
              <p className="kicker">Deux positions · 2</p>
              <h2 id="h-mc">Vous êtes mis en cause</h2>
              <ul>
                <li><span>01</span>Accès et analyse des éléments techniques du dossier</li>
                <li><span>02</span>Discussion de la qualification retenue</li>
                <li><span>03</span>{fr("Demande d'expertise ou de contre-expertise")}</li>
                <li><span>04</span>Assistance en audition et devant le parquet</li>
                <li><span>05</span>Défense devant les juridictions pénales</li>
              </ul>
              <div className="pos-cta"><Link className="btn" href={CT_MIS}>Demander un rendez-vous</Link></div>
            </section>
          </div>

          {/* 6b · BANDEAU VIDÉO pleine largeur (hall du tribunal) + slogan */}
          <section className="vband" aria-label="Une cyberattaque devient une affaire judiciaire">
            <PalaisVideo
              webm="/videos/tribunal-interieur.webm"
              mp4="/videos/tribunal-interieur.mp4"
              poster="/images/poster-tribunal-interieur.jpg"
              preload="none"
              containerClassName="vband-bg"
            />
            <p className="vband-t">
              Une cyberattaque est un incident informatique.
              <br />
              Jusqu’au moment où elle devient une affaire judiciaire.
            </p>
          </section>

          {/* 7 · DOSSIERS */}
          <section className="alt" aria-labelledby="h-dos">
            <div className="wrap">
              <p className="kicker">Dossiers</p>
              <h2 id="h-dos">Trois dossiers représentatifs</h2>
              <p className="meta">{fr("Dossiers anonymisés. Aucune juridiction, date, montant ni qualité de partie n'est mentionnée.")}</p>
              <div className="dos3" style={{ marginTop: "var(--s6)" }}>
                {CASES.map((c) => (
                  <article className="dcard" key={c.ct}>
                    <div className="dtop">
                      <p className="pp">{c.pp}</p>
                      <p className="ct">{fr(c.ct)}</p>
                    </div>
                    <dl>
                      <dt>Situation</dt>
                      <dd>{fr(c.situation)}</dd>
                      <dt>Difficulté</dt>
                      <dd>{fr(c.difficulte)}</dd>
                      <dt>Intervention</dt>
                      <dd>{fr(c.intervention)}</dd>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 8 · ÉQUIPE */}
          <section aria-labelledby="h-team">
            <div className="wrap">
              <p className="kicker">L’équipe</p>
              <h2 id="h-team">Des pénalistes du numérique</h2>
              <p className="lead">{fr("Qualifier l'infraction et sécuriser les éléments techniques dès les premières heures suppose de traiter ensemble le droit pénal et la matière informatique.")}</p>
              <div className="team3" style={{ marginTop: "var(--s6)" }}>
                {TEAM.map((m) => (
                  <article key={m.nom}>
                    <div className="ph">
                      <img src={m.photo} alt={`Portrait de ${m.nom}`} width={320} height={400} loading="lazy" decoding="async" />
                    </div>
                    <p className="barreau">{m.barreau}</p>
                    <h3>{m.nom}</h3>
                    <p className="role">{m.role}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 9 · FAQ */}
          <section className="alt" aria-labelledby="h-faq">
            <div className="wrap">
              <p className="kicker">Questions directes</p>
              <h2 id="h-faq">Questions fréquentes</h2>
              <div className="faq">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={item.q} open={item.open}>
                    <summary>
                      <span className="num">{String(i + 1).padStart(2, "0")}</span> {fr(item.q)}
                      <span className="sign" aria-hidden="true" />
                    </summary>
                    <div className="ans"><p>{fr(item.a)}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 10 · SUJETS LIÉS */}
          <section aria-labelledby="h-rel">
            <div className="wrap">
              <p className="kicker">Sujets liés</p>
              <h2 id="h-rel">Poursuivre la lecture</h2>
              <div className="rel4" style={{ marginTop: "var(--s6)" }}>
                <article><h3><Link href={R_CYBER}>Cybersécurité →</Link></h3><p>Prévention, conformité et organisation de la réponse à incident.</p></article>
                <article><h3><Link href={R_RGPD}>Données personnelles →</Link></h3><p>{fr("Violation de données, notification et contrôle de l'autorité.")}</p></article>
                <article><h3><Link href={R_CONTENTIEUX}>Contentieux informatique →</Link></h3><p>{fr("Mise en cause du prestataire, expertise et responsabilité.")}</p></article>
                <article><h3><Link href={R_ESCRO}>Escroquerie et fraude →</Link></h3><p>Virement frauduleux et recours des particuliers contre les banques.</p></article>
              </div>
            </div>
          </section>

          {/* 11 · CTA FINAL */}
          <section className="final onDark" aria-labelledby="h-cta">
            <div className="wrap">
              <p className="kicker">Prendre contact</p>
              <h2 id="h-cta">Parlons de votre situation</h2>
              <p>{fr("Décrivez les faits et les éléments déjà disponibles. Le cabinet vous indiquera les informations nécessaires à l'examen de la plainte ou de la défense.")}</p>
              <div className="btns">
                <a className="btn" href={TEL}>Nous appeler — 01 81 70 62 00</a>
                <Link className="btn btn--ghost" href={CT}>Décrire les faits par écrit</Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
