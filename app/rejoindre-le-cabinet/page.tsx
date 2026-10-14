import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./rejoindre.module.css";
import { MEMBRES } from "@/lib/equipe";
import { SITE_URL } from "@/lib/site-url";
import { ENTREES } from "./data/entrees";
import CandidaterLink from "./_components/CandidaterLink";
import CandidatureForm from "./_components/CandidatureForm";

/*
 * Page « Rejoindre le cabinet » — hors menu principal, reliée depuis le footer
 * et un bandeau en bas de /le-cabinet. Terminologie alignée sur CLAUDE.md :
 * « intervenants techniques » (jamais « experts », qui prête à confusion avec
 * l'expert judiciaire) ; intitulés des personnes lus dans lib/equipe.ts.
 */

const TITLE = "Rejoindre le cabinet — Lazarègue Avocats, droit du numérique à Paris";
const DESCRIPTION =
  "Stages, apprentissage, avocats, profils techniques : rejoindre un cabinet de droit du numérique fondé sur une méthode écrite et le travail en binôme avec des intervenants techniques en cybersécurité et en IA.";

export const metadata: Metadata = {
  // `absolute` : le title validé porte déjà le nom du cabinet.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/rejoindre-le-cabinet" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/rejoindre-le-cabinet",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Le cabinet", item: `${SITE_URL}/le-cabinet` },
    { "@type": "ListItem", position: 3, name: "Rejoindre le cabinet", item: `${SITE_URL}/rejoindre-le-cabinet` },
  ],
};

/* ---------------------------------------------------------------- contenus */

const REPERES = [
  { n: "2016", l: "année de fondation" },
  { n: "10", l: "domaines du droit du numérique" },
  { n: "5", l: "avocats et intervenants techniques" },
];

const BANDEAU = ["stages & apprentissage", "jeunes avocats", "avocats confirmés", "profils techniques", "fonctions support"];

const PRINCIPES = [
  { n: "01", t: "Une procédure pour chaque dossier.", d: "De l'ouverture du dossier à la décision, chaque étape est écrite, outillée et partagée." },
  { n: "02", t: "Améliorée par ceux qui l'appliquent.", d: "Chaque membre du cabinet respecte la méthode et propose de la perfectionner." },
  { n: "03", t: "Un même niveau d'exigence.", d: "Le client reçoit un travail identique en qualité, quel que soit l'interlocuteur." },
];

const EXIGENCES = [
  { k: "client", t: "Le sens du client.", d: "Traduire le droit en décision pour un dirigeant qui n'est pas juriste." },
  { k: "méthode", t: "Le goût de la méthode.", d: "Appliquer une procédure avec exactitude, puis argumenter pour l'améliorer." },
  { k: "écriture", t: "Une écriture exacte.", d: "Chaque phrase sert la décision du client ; aucune ne se contente de paraphraser." },
  { k: "technique", t: "La compréhension technique.", d: "Savoir expliquer une API, un chiffrement ou un modèle d'IA en termes simples." },
  { k: "curiosité", t: "La curiosité du monde.", d: "Une veille personnelle, des lectures hors du droit, des projets menés par goût." },
  { k: "intelligence artificielle", t: "Un usage critique de l'IA.", d: "Des outils maîtrisés, des sources contrôlées, des limites identifiées." },
];

const SITUATIONS = [
  {
    k: "cyberattaque",
    t: "Remonter le chemin d'une intrusion.",
    d: "Reconstituer l'attaque avec l'intervenant technique pour établir qui, du prestataire ou du client, a manqué à ses obligations.",
  },
  {
    k: "intelligence artificielle",
    t: "Comprendre un agent avant de le juger.",
    d: "Savoir ce qu'un agent autonome lit, décide et exécute, avant d'en apprécier les risques au regard du RGPD et du règlement sur l'IA.",
  },
  {
    k: "contentieux numérique",
    t: "Faire parler les preuves techniques.",
    d: "Confronter journaux techniques, contrats et expertises pour établir la preuve et la causalité.",
  },
];

const APPORTS = [
  { k: "formation", t: "« L'Avocat augmenté », dès l'arrivée.", d: "La formation du cabinet à l'exercice du métier avec l'IA, suivie par chaque recrue, et les outils qui l'accompagnent." },
  { k: "dossiers réels", t: "Une exposition directe.", d: "Enquêtes internes, contentieux, audiences, rendez-vous clients : des dossiers réels dès le premier mois, sous encadrement." },
  { k: "publication", t: "Une analyse signée.", d: "Chaque stagiaire publie sous son nom une analyse dans les ressources du cabinet ; chaque avocat peut contribuer aux livres blancs." },
  { k: "encadrement", t: "Un parcours écrit.", d: "Un maître de stage nommé, un point chaque semaine, un bilan écrit à mi-parcours et en fin de période." },
  { k: "au cabinet", t: "Un travail en présence.", d: "Le métier s'apprend par la proximité et par la méthode. Le travail s'effectue au cabinet, 18 rue de Tilsitt." },
];

/** Ordre d'affichage ; noms, intitulés et portraits lus dans lib/equipe.ts. */
const EQUIPE: { slug: keyof typeof MEMBRES; complement?: string }[] = [
  { slug: "alexandre", complement: "fondateur" },
  { slug: "sarah" },
  { slug: "amir" },
  { slug: "khalid" },
  { slug: "nadia" },
];

const PARCOURS = [
  { t: "Méthode", d: "Outils, secret professionnel, déontologie, procédures du cabinet.", l: "fiche de méthode validée" },
  { t: "Recherche", d: "Analyse sur dossiers en cours, aux côtés de l'intervenant technique.", l: "deux notes de recherche" },
  { t: "Rédaction", d: "Mises en demeure, conclusions, clauses contractuelles.", l: "premier acte commenté" },
  { t: "Terrain", d: "Audiences, rendez-vous clients, réunions techniques.", l: "compte rendu" },
  { t: "Publication", d: "Projet personnel sur un sujet du numérique.", l: "analyse signée publiée" },
  { t: "Autonomie", d: "Dossiers conduits sous supervision, puis bilan.", l: "bilan écrit" },
];

const MODULES = [
  { t: "Comprendre Internet", d: "DNS, serveurs, API, hébergement, cloud : l'environnement technique de chaque dossier." },
  { t: "Comprendre la cybersécurité", d: "Rançongiciels, sauvegardes, pare-feu, vulnérabilités : dialoguer d'égal à égal avec un spécialiste." },
  { t: "Comprendre l'intelligence artificielle", d: "Modèles de langage, agents, recherche augmentée, modèles ouverts : les enjeux juridiques réels." },
  { t: "Maîtriser les contrats informatiques", d: "SaaS, infogérance, niveaux de service, réversibilité : analyser et rédiger." },
  { t: "Maîtriser le contentieux numérique", d: "Preuve électronique, expertise judiciaire, causalité : construire un raisonnement contentieux." },
  { t: "Travailler selon la méthode du cabinet", d: "Procédures écrites, rédaction, recherche, relation client, déontologie." },
];

const SELECTION = [
  { t: "Candidature", d: "Entrée visée, CV et, si possible, un exemple de travail personnel. Aucune lettre de motivation." },
  { t: "Étude du dossier", d: "Lecture du dossier ; les candidats retenus reçoivent une courte question écrite." },
  {
    t: "Cas pratique",
    d: "Un incident de cybersécurité ou un projet d'IA, tiré de situations réelles et rendu fictif, avec une procédure du cabinet à appliquer. IA autorisée et déclarée, raisonnement défendu à l'oral.",
    duree: "90 min + 15 min d'oral",
  },
  {
    t: "Entretien",
    d: "Quatre temps, menés par deux membres du cabinet : une technologie expliquée, un problème juridique raisonné, une objection à surmonter, les questions du candidat.",
    duree: "45 minutes",
  },
  { t: "Rencontre", d: "Échange avec l'équipe, dont un intervenant technique.", duree: "30 minutes" },
];

const FAQ = [
  {
    q: "Le cabinet pratique-t-il le télétravail ?",
    r: "Non. Le travail s'effectue au cabinet. La méthode se transmet par la proximité, et la qualité d'un dossier tient à l'échange permanent entre avocats et intervenants techniques.",
  },
  {
    q: "Pourquoi un contrat de travail plutôt qu'une collaboration libérale ?",
    r: "Le cabinet fait le choix d'engager ses avocats en contrat de travail : une protection sociale complète et un temps entièrement consacré aux dossiers du cabinet et à la formation.",
  },
  {
    q: "Les profils non juristes peuvent-ils candidater ?",
    r: "Oui, par l'entrée « profils techniques » ou « fonctions support ». Les intervenants techniques travaillent aux côtés des avocats sans exercer la profession d'avocat.",
  },
];

/* -------------------------------------------------------------------- rendu */

function Tete({ label, titre, id, chapeau }: { label: string; titre: string; id: string; chapeau?: string }) {
  return (
    <div className={styles.head}>
      <p className="eyebrow">{label}</p>
      <h2 className={styles.h2} id={id}>
        {titre}
      </h2>
      {chapeau && <p className={styles.lede}>{chapeau}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ================================ HERO ================================ */}
      <section className={styles.hero} aria-labelledby="titre-page">
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden="true">/</span> <Link href="/le-cabinet">Le cabinet</Link>{" "}
            <span aria-hidden="true">/</span> <span aria-current="page">Rejoindre le cabinet</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.heroLabel}>rejoindre le cabinet · tous profils</p>
              <h1 id="titre-page" className={styles.h1}>
                Rejoindre <span className={styles.accent}>Lazarègue</span> Avocats
              </h1>
              <p className={styles.heroLede}>
                Un cabinet de droit du numérique fondé sur une méthode&nbsp;: écrite, éprouvée, améliorée chaque jour
                par ceux qui l&apos;appliquent.
              </p>
              <div className={styles.btnRow}>
                <a className="btn btn-primary" href="#candidater">
                  Déposer une candidature →
                </a>
                <a className="btn btn-ghost" href="#methode">
                  Découvrir la méthode
                </a>
              </div>
            </div>
            <dl className={styles.reperes}>
              {REPERES.map((r) => (
                <div key={r.n} className={styles.repere}>
                  <dt className={styles.repereN}>{r.n}</dt>
                  <dd className={styles.repereL}>{r.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <div className={styles.bandeau}>
        <ul className={styles.wrap}>
          {BANDEAU.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      {/* =========================== 01 · MÉTHODE ============================ */}
      <section id="methode" className={styles.section} aria-labelledby="methode-titre">
        <div className={`${styles.wrap} ${styles.split}`}>
          <Tete
            label="01 · La méthode du cabinet"
            titre="Une méthode, plutôt qu'un talent isolé."
            id="methode-titre"
            chapeau="La qualité d'un cabinet ne repose pas sur l'inspiration de chacun, mais sur la rigueur d'un système commun."
          />
          <div>
            <p className={styles.grandCorps}>
              Le cabinet repose sur une méthode. Chaque type de dossier suit une procédure écrite, éprouvée et
              améliorée en continu. C&apos;est elle qui garantit au client un travail de même niveau, quel que soit
              l&apos;avocat qui le conduit.
            </p>
            <ol className={styles.principes}>
              {PRINCIPES.map((p) => (
                <li key={p.n}>
                  <span className={styles.principeN} aria-hidden="true">
                    {p.n}
                  </span>
                  <div>
                    <h3 className={styles.h3}>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.encadre}>
              Cette organisation ne convient pas à tous. Elle convient à ceux qui considèrent la rigueur comme une
              forme de liberté.
            </p>
          </div>
        </div>
      </section>

      {/* ============================ 02 · PROFIL ============================ */}
      <section className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="profil-titre">
        <div className={styles.wrap}>
          <Tete
            label="02 · Le profil recherché"
            titre="Six exigences, énoncées sans détour."
            id="profil-titre"
            chapeau="Le cabinet recrute des profils de tous niveaux. Les attentes, elles, sont les mêmes pour chacun."
          />
          <ul className={styles.exigences}>
            {EXIGENCES.map((x) => (
              <li key={x.k}>
                <p className={styles.tag}>{x.k}</p>
                <h3 className={styles.h3}>{x.t}</h3>
                <p>{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================== 03 · APPORTS ============================ */}
      <section className={`${styles.section} ${styles.off}`} aria-labelledby="apports-titre">
        <div className={styles.wrap}>
          <Tete
            label="03 · Ce que le cabinet apporte"
            titre="Le droit ne suffit pas. Il faut comprendre la technique."
            id="apports-titre"
            chapeau="Chaque dossier technique associe un avocat et un intervenant technique en cybersécurité ou en intelligence artificielle. Trois situations donnent la mesure du travail."
          />
          <ul className={styles.situations}>
            {SITUATIONS.map((s) => (
              <li key={s.k}>
                <p className={styles.tag}>{s.k}</p>
                <h3 className={styles.h3}>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ul>

          <div className={styles.modele}>
            <div>
              <p className={styles.modeleLabel}>modèle social</p>
              <p className={styles.modeleTitre}>Contrat de travail pour tous les avocats</p>
            </div>
            <p>
              Le cabinet engage ses avocats en contrat de travail, avec la protection sociale complète d&apos;un
              salarié, et verse une prime annuelle fondée sur des critères écrits&nbsp;: qualité du travail,
              contribution aux dossiers, publications.
            </p>
          </div>

          <ul className={styles.apports}>
            {APPORTS.map((a) => (
              <li key={a.k}>
                <p className={styles.tag}>{a.k}</p>
                <h3 className={styles.h3}>{a.t}</h3>
                <p>{a.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 04 · ÉQUIPE ============================ */}
      <section className={styles.section} aria-labelledby="equipe-titre">
        <div className={styles.wrap}>
          <Tete
            label="04 · L'équipe"
            titre="Ceux qui encadrent."
            id="equipe-titre"
            chapeau="Trois avocats et deux intervenants techniques. Chaque recrue travaille directement à leurs côtés."
          />
          <ul className={styles.equipe}>
            {EQUIPE.map(({ slug, complement }) => {
              const m = MEMBRES[slug];
              return (
                <li key={slug}>
                  <div className={styles.portrait}>
                    <Image
                      src={m.photo}
                      alt={`Portrait de ${m.nom}.`}
                      fill
                      sizes="(max-width: 599px) 100vw, (max-width: 1099px) 33vw, 220px"
                      style={{ objectFit: "cover", objectPosition: m.position ?? "center" }}
                    />
                  </div>
                  <h3 className={styles.membreNom}>{m.nom}</h3>
                  <p className={styles.membreStatut}>
                    {m.statut}
                    {complement ? `, ${complement}` : ""}
                  </p>
                  <Link className={styles.lien} href={`/le-cabinet#equipe-${slug}`} aria-label={`Voir le profil de ${m.nom}`}>
                    Voir le profil →
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============================ 05 · ENTRÉES =========================== */}
      <section className={`${styles.section} ${styles.sectionRule}`} aria-labelledby="entrees-titre">
        <div className={styles.wrap}>
          <Tete
            label="05 · Cinq entrées"
            titre="Cinq manières de rejoindre le cabinet."
            id="entrees-titre"
            chapeau="Chaque entrée précise le public visé, le statut et l'épreuve de sélection."
          />
          <ul className={styles.entrees}>
            {ENTREES.map((e) => (
              <li key={e.id}>
                <span className={styles.entreeN} aria-hidden="true">
                  {e.n}
                </span>
                <h3 className={styles.h3}>{e.titre}</h3>
                <dl>
                  <dt>pour</dt>
                  <dd>{e.pour}</dd>
                  <dt>statut</dt>
                  <dd>{e.statut}</dd>
                  <dt>épreuve</dt>
                  <dd>{e.epreuve}</dd>
                </dl>
                <CandidaterLink entree={e.id} label={e.titre} className={styles.lien} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================== 06 · PARCOURS =========================== */}
      <section className={`${styles.section} ${styles.off}`} aria-labelledby="parcours-titre">
        <div className={styles.wrap}>
          <Tete
            label="06 · Six mois au cabinet"
            titre="Le parcours d'un stage, mois par mois."
            id="parcours-titre"
            chapeau="Le parcours est écrit à l'avance. Chaque étape produit un livrable relu et commenté."
          />
          <ol className={styles.frise}>
            {PARCOURS.map((p, i) => (
              <li key={p.t}>
                <span className={styles.friseN} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={styles.h3}>
                  <span className={styles.sr}>Mois {i + 1} — </span>
                  {p.t}
                </h3>
                <p>{p.d}</p>
                <p className={styles.livrable}>
                  <span className={styles.sr}>Livrable : </span>
                  {p.l}
                </p>
              </li>
            ))}
          </ol>

          <div className={styles.socle}>
            <h3 className={styles.socleTitre}>Le socle de formation du cabinet</h3>
            <p className={styles.lede}>
              Six modules suivis par chaque recrue, quel que soit son niveau. Chacun associe une documentation, un
              exercice sur un cas fictif et un échange avec un avocat ou un intervenant technique.
            </p>
          </div>
          <ol className={styles.modules}>
            {MODULES.map((m, i) => (
              <li key={m.t}>
                <p className={styles.tag}>module {String(i + 1).padStart(2, "0")}</p>
                <h4 className={styles.h3}>{m.t}</h4>
                <p>{m.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================== 07 · SÉLECTION ========================== */}
      <section className={`${styles.section} ${styles.navy}`} aria-labelledby="selection-titre">
        <div className={styles.wrap}>
          <div className={styles.head}>
            <p className={styles.heroLabel}>07 · Le processus de sélection</p>
            <h2 className={styles.h2} id="selection-titre">
              Une sélection fondée sur le travail, non sur le parcours.
            </h2>
            <p className={styles.lede}>
              Les mêmes épreuves et les mêmes questions pour chaque candidat, notées sur une grille écrite à
              l&apos;avance.
            </p>
          </div>
          <ol className={styles.etapes}>
            {SELECTION.map((s, i) => (
              <li key={s.t}>
                <span className={styles.etapeN} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.h3}>{s.t}</h3>
                <p>{s.d}</p>
                {s.duree && (
                  <p className={styles.duree}>
                    <span className={styles.sr}>Durée : </span>
                    {s.duree}
                  </p>
                )}
              </li>
            ))}
          </ol>
          <div className={styles.reponse}>
            <p>Chaque candidature reçoit une réponse, y compris lorsqu&apos;elle n&apos;est pas retenue.</p>
            <a className="btn btn-white" href="#candidater">
              Déposer une candidature →
            </a>
          </div>
        </div>
      </section>

      {/* ============================== 08 · FAQ ============================= */}
      <section className={styles.section} aria-labelledby="faq-titre">
        <div className={`${styles.wrap} ${styles.split}`}>
          <Tete label="08 · Questions fréquentes" titre="Avant de candidater." id="faq-titre" />
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== 09 · CANDIDATER ========================= */}
      <section id="candidater" className={`${styles.section} ${styles.off}`} aria-labelledby="candidater-titre">
        <div className={`${styles.wrap} ${styles.split}`}>
          <div className={styles.head}>
            <p className="eyebrow">09 · Candidater</p>
            <h2 className={styles.h2} id="candidater-titre">
              Déposer une candidature.
            </h2>
            <p className={styles.lede}>
              Une seule porte d&apos;entrée, pour tous les profils. Les candidatures envoyées par courriel sont
              redirigées vers ce formulaire.
            </p>
            <p className={styles.note}>
              Chaque candidature est lue. Les candidats retenus sont invités à poursuivre par une courte épreuve
              écrite.
            </p>
          </div>
          <CandidatureForm />
        </div>
      </section>
    </main>
  );
}
