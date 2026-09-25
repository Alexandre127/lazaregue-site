import type { Metadata } from "next";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./cybercriminalite.module.css";
import { FAQ_ITEMS } from "./faq";
import { PalaisVideo } from "./PalaisVideo";
import FourQuestions from "./FourQuestions";

const HERO_POSTER = "/images/poster-tribunal-exterieur.jpg";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/cybercriminalite";
const TEL = "tel:+33181706200";

/* Tous les CTA renvoient vers /contact, sans paramètre. */
const CT = "/contact";

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

/* Situations pénales (6) : texte réécrit, ligne « Ce que dit le droit », badge. */
const SITUATIONS = [
  { h: "Rançongiciel et blocage du système", p: "Le système est chiffré ou paralysé, une rançon est réclamée.", droit: "Entrave au fonctionnement d’un système (art. 323-2 C. pén.) et extorsion (art. 312-1)", who: "Victime" },
  { h: "Ancien salarié encore connecté", p: "Ses accès n’ont pas été coupés à son départ. Entrer était légitime ; rester ne l’est plus.", droit: "Maintien frauduleux dans un système (art. 323-1)", who: "Victime" },
  { h: "Base clients partie avec un collaborateur", p: "Des fichiers ont été copiés avant la fin du contrat. La voie pénale et la protection du secret des affaires ne suivent pas le même calendrier.", droit: "Extraction frauduleuse de données (art. 323-3) ; vol ou abus de confiance selon les cas", who: "Victime" },
  { h: "Comptes compromis en masse", p: "Des milliers de comptes utilisés en quelques heures. Toute la question est de savoir ce que le système permettait réellement.", droit: "Accès frauduleux (art. 323-1) ; extraction de données (art. 323-3)", who: "Victime, parfois interrogée" },
  { h: "Détournement de virement", p: "Un ordre de paiement obtenu par une manœuvre, exécuté vers un compte tiers.", droit: "Escroquerie (art. 313-1)", who: "Victime" },
  { h: "Entreprise ou dirigeant mis en cause", p: "Une adresse IP, un journal ou un témoignage désignent l’entreprise. La défense se construit sur les éléments techniques du dossier.", droit: "Les mêmes textes, discutés en défense", who: "Mis en cause", mis: true },
];

/* Dossiers (3) — bandeau sombre « L'enjeu », rubriques resserrées. */
const CASES = [
  {
    pp: "Dossier 01 · Victime", ct: "Ancien salarié, accès administrateur",
    enjeu: "prouver que les demandes de paiement venaient de l’ancienne administratrice.",
    situation: "Après son départ, une administratrice système conserve ses accès. Des comptes sont désactivés, des services coupés, et l’entreprise reçoit des demandes de paiement.",
    intervention: "Journaux conservés avant toute remise en service ; plainte pour maintien frauduleux et extorsion ; rapprochement heure par heure des connexions et des messages.",
  },
  {
    pp: "Dossier 02 · Victime, puis interrogée", ct: "Compromission de comptes et de données",
    enjeu: "l’entreprise victime se retrouve interrogée sur sa propre sécurité.",
    situation: "Des milliers de comptes utilisés en quelques heures par des outils automatisés.",
    intervention: "Reconstitution des conditions d’accès ; distinction entre données réellement atteintes et données seulement exposées ; volet pénal articulé avec les obligations relatives aux données personnelles.",
  },
  {
    pp: "Dossier 03 · Mis en cause", ct: "Mise en cause fondée sur une adresse IP",
    enjeu: "une adresse IP identifie un abonnement à un instant donné, pas une personne.",
    situation: "Une entreprise est désignée par une adresse IP dans une procédure d’intrusion.",
    intervention: "Accès à l’intégralité des éléments techniques ; contrôle des conditions de collecte ; chronologie de l’enquête confrontée à celle des journaux.",
  },
];

/* Équipe — 4 intervenants. Khalid : statut issu de lib/equipe. Photos réelles. */
const TEAM = [
  { nom: "Me Alexandre Lazarègue", statut: "Avocat au Barreau de Paris", role: "Droit pénal du numérique", photo: "/images/alexandre-pro.jpg" },
  { nom: "Me Amir Ben Majed", statut: "Avocat au Barreau d’Évry (Essonne)", role: "Contentieux informatique et pénal", photo: "/images/amir-pro.jpg" },
  { nom: "Me Sarah Hinderer", statut: "Avocate aux Barreaux de Paris et de Montréal", role: "Données personnelles et pénal", photo: "/images/sarah-pro.jpg" },
  { nom: "Khalid Sookia", statut: "Consultant technique en cybersécurité", role: "Analyse des journaux, accès et configurations", photo: "/images/khalid-pro.jpg" },
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
                <p className="chapo">{fr("Intrusion, rançongiciel, ancien salarié qui a gardé ses accès, données copiées, ou entreprise désignée par une adresse IP : ce qui se décide dans les premières heures détermine ce qui pourra être prouvé devant le juge. Le cabinet construit la plainte — ou la défense.")}</p>
                <p className="repere">PME et ETI · Paris et toute la France</p>
                <div className="btns">
                  <a className="btn" href={TEL}>Nous appeler — 01 81 70 62 00</a>
                  <Link className="btn btn--ghost" href={CT}>Décrire les faits par écrit</Link>
                </div>
                <nav className="doors" aria-label="Choisir sa position">
                  <a href="#victime"><b>Vous êtes victime</b><span aria-hidden="true">↓</span></a>
                  <a href="#mis-en-cause"><b>Vous êtes mis en cause</b><span aria-hidden="true">↓</span></a>
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
              <FourQuestions />
              <p className="bridge-line">Vous cherchez plutôt à prévenir une attaque&nbsp;? <Link href={R_CYBER}>Voir notre accompagnement en cybersécurité</Link>.</p>
            </div>
          </section>

          {/* 3 · ENCART 72 HEURES */}
          <section className="encart-wrap" aria-label="Assurance cyber et délai de plainte">
            <div className="wrap">
              <div className="encart72">
                <div className="encart72-txt">
                  <strong>Assurance cyber&nbsp;: 72 heures pour porter plainte.</strong>
                  <p>{fr("Pour les entreprises et les professionnels, l’indemnisation des pertes liées à une cyberattaque par l’assureur est subordonnée au dépôt d’une plainte dans les 72 heures suivant la connaissance de l’attaque (art. L. 12-10-1 du code des assurances).")}</p>
                </div>
                <a className="btn" href={TEL}>Appeler le cabinet</a>
              </div>
            </div>
          </section>

          {/* 4 · SITUATIONS + QUALIFICATIONS (fusionnées) */}
          <section className="alt" aria-labelledby="h-sit">
            <div className="wrap">
              <p className="kicker">Situations</p>
              <h2 id="h-sit">Quand une affaire informatique devient une affaire pénale</h2>
              <p className="lead">{fr("La qualification retenue oriente l’enquête et ce qui peut être demandé à la justice. Elle se discute.")}</p>
              <div className="six" style={{ marginTop: "var(--s6)" }}>
                {SITUATIONS.map((s) => (
                  <article className={s.mis ? "sixc sixc--mis" : "sixc"} key={s.h}>
                    <span className="badge">{s.who}</span>
                    <h3>{fr(s.h)}</h3>
                    <p>{fr(s.p)}</p>
                    <div className="droit">
                      <span className="droit-k">Ce que dit le droit</span>
                      <p>{fr(s.droit)}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="fraude-line">Un virement détourné relève aussi de <Link href={R_ESCRO}>la page fraude bancaire et escroquerie</Link>, pour les recours contre les banques.</p>
            </div>
          </section>

          {/* 5 · EXERGUE (avant les deux positions) */}
          <section className="exergue-wrap" aria-hidden="false">
            <div className="wrap">
              <p className="exergue">{fr("Un dossier pénal se joue en mois, mais ce qui se décide le premier jour détermine ce qui pourra être établi à l’audience.")}</p>
            </div>
          </section>

          {/* 6 · VICTIME / MIS EN CAUSE — deux panneaux pleine largeur */}
          <div className="pos" aria-label="Deux positions">
            <section id="victime" className="pos-v" aria-labelledby="h-vi">
              <p className="kicker">Deux positions · 1</p>
              <h2 id="h-vi">Vous êtes victime</h2>
              <ul>
                <li><span>01</span>Conserver les éléments techniques avant la remise en service</li>
                <li><span>02</span>{fr("Choisir la voie : plainte simple, plainte avec constitution de partie civile ou citation directe")}</li>
                <li><span>03</span>{fr("Rédiger une plainte documentée et demander les actes d’enquête utiles")}</li>
                <li><span>04</span>Suivre la procédure et relancer</li>
                <li><span>05</span>Obtenir réparation</li>
              </ul>
              <p className="gl"><b>En clair.</b> {fr("La constitution de partie civile saisit un juge d’instruction de la plainte ; la citation directe saisit le tribunal sans enquête préalable. Le choix dépend de ce que le dossier permet déjà d’établir.")}</p>
              <div><Link className="btn" href={CT}>Décrire les faits par écrit</Link></div>
            </section>
            <section id="mis-en-cause" className="pos-m onDark" aria-labelledby="h-mc">
              <p className="kicker">Deux positions · 2</p>
              <h2 id="h-mc">Vous êtes mis en cause</h2>
              <ul>
                <li><span>01</span>{fr("Obtenir l’accès à l’ensemble des éléments techniques du dossier")}</li>
                <li><span>02</span>Discuter la qualification retenue</li>
                <li><span>03</span>Demander une expertise ou une contre-expertise</li>
                <li><span>04</span>{fr("Assister l’entreprise ou le dirigeant en audition libre ou en garde à vue")}</li>
                <li><span>05</span>Défendre devant le tribunal</li>
              </ul>
              <p className="gl"><b>En clair.</b> {fr("Convocation par la police ou la gendarmerie : la personne entendue peut être assistée d’un avocat. Mieux vaut le prévoir avant l’audition qu’après.")}</p>
              <div className="pos-cta"><Link className="btn" href={CT}>Demander un rendez-vous</Link></div>
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
              <p className="meta">Trois dossiers anonymisés.</p>
              <div className="dos3" style={{ marginTop: "var(--s6)" }}>
                {CASES.map((c) => (
                  <article className="dcard" key={c.ct}>
                    <div className="dtop">
                      <p className="pp">{c.pp}</p>
                      <p className="ct">{fr(c.ct)}</p>
                      <p className="enjeu"><span>L’enjeu</span> {fr(c.enjeu)}</p>
                    </div>
                    <dl>
                      <dt>Situation</dt>
                      <dd>{fr(c.situation)}</dd>
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
              <h2 id="h-team">Des pénalistes du numérique, appuyés par un technicien</h2>
              <p className="lead">{fr("Qualifier l’infraction et sécuriser les éléments techniques dès les premières heures suppose de traiter ensemble le droit pénal et la matière informatique.")}</p>
              <div className="team3 team4" style={{ marginTop: "var(--s6)" }}>
                {TEAM.map((m) => (
                  <article key={m.nom}>
                    <div className="ph">
                      <img src={m.photo} alt={`Portrait de ${m.nom}`} width={320} height={400} loading="lazy" decoding="async" />
                    </div>
                    <p className="barreau">{m.statut}</p>
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
                <article><h3><Link href={R_RGPD}>Données personnelles →</Link></h3><p>{fr("Violation de données, notification et contrôle de l’autorité.")}</p></article>
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
              <p>{fr("Décrivez les faits et les éléments déjà disponibles. Le cabinet vous indiquera les informations nécessaires à l’examen de la plainte ou de la défense.")}</p>
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
