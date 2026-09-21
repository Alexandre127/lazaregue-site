import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "./le-cabinet.module.css";
import { CABINET } from "./data/liens";
import { MEMBRES } from "@/lib/equipe";
import { PortailDemo } from "@/components/home/section-differenciateurs";
import {
  HERO,
  REPERES,
  EQUIPE_INTRO_1,
  EQUIPE_INTRO_2,
  AVOCATS,
  EXPERTS,
  METHODE,
  ENGAGEMENTS,
  DOMAINES_FAMILLES,
  HONORAIRES_MODALITES,
  HONORAIRES_PRINCIPES,
  DEMARRAGE,
  type Membre,
} from "./data/contenu";

const TITLE = "Cabinet d'avocats en droit du numérique à Paris | Lazarègue";
const DESCRIPTION =
  "Cabinet d'avocats en droit du numérique à Paris : contentieux informatique, cybersécurité, RGPD, IA et contrats IT. Intervention dans toute la France.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/le-cabinet" },
  openGraph: {
    // Pas d'`images` : l'illustration OG 1200×630 reste à produire. On ne
    // pointe pas vers un fichier inexistant (brief).
    title: "Cabinet d'avocats en droit du numérique à Paris",
    description:
      "Contentieux informatique, cybersécurité, RGPD, IA et contrats IT. Avocats et intervenants techniques réunis.",
    url: "/le-cabinet",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet d'avocats en droit du numérique à Paris",
    description:
      "Contentieux informatique, cybersécurité, RGPD, IA et contrats IT. Avocats et intervenants techniques réunis.",
  },
};

/*
 * JSON-LD — LegalService (l'entité cabinet) + les trois avocats en `Person`
 * rattachés par `worksFor`. Jamais le type `Attorney` pour une personne : dans
 * schema.org c'est un sous-type de LegalService, donc une entité de service.
 *
 * Les `sameAs` (profils externes) sont OMIS tant que les URL ne sont pas
 * fournies : on n'invente pas d'adresse (brief).
 */
const CABINET_ID = "https://lazaregue-avocats.fr/#cabinet";

const AVOCATS_LD = [
  {
    slug: "alexandre-lazaregue",
    name: "Alexandre Lazarègue",
    jobTitle: "Avocat au barreau de Paris",
    knowsAbout: [
      "Contentieux des plateformes",
      "Cybersécurité",
      "Données personnelles",
      "Propriété intellectuelle",
    ],
  },
  {
    slug: "amir-ben-majed",
    name: "Amir Ben Majed",
    jobTitle: "Avocat au barreau de l'Essonne",
    knowsAbout: ["Contrats IT", "Contentieux IT", "Responsabilité des prestataires"],
  },
  {
    slug: "sarah-hinderer",
    name: "Sarah Hinderer",
    jobTitle: "Avocate aux barreaux de Paris et de Montréal",
    knowsAbout: ["RGPD", "Protection des données", "Due diligence"],
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": CABINET_ID,
  name: "Lazarègue Avocats",
  url: "https://lazaregue-avocats.fr/",
  telephone: CABINET.telephone,
  email: CABINET.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 rue de Tilsitt",
    postalCode: "75017",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  areaServed: { "@type": "Country", name: "France" },
  knowsAbout: [
    "Droit du numérique",
    "Contentieux informatique",
    "Cybersécurité",
    "RGPD",
    "Intelligence artificielle",
    "Contrats IT",
    "Cybercriminalité",
    "M&A technologique",
  ],
  employee: AVOCATS_LD.map((a) => ({
    "@type": "Person",
    "@id": `https://lazaregue-avocats.fr/le-cabinet/${a.slug}/#personne`,
    url: `https://lazaregue-avocats.fr/le-cabinet/${a.slug}/`,
    name: a.name,
    jobTitle: a.jobTitle,
    worksFor: { "@id": CABINET_ID },
    knowsAbout: a.knowsAbout,
  })),
};

/* --------------------------------------------------------------- rendu */

function PersonCard({ m }: { m: Membre }) {
  const photo = MEMBRES[m.slug].photo;
  return (
    <article className={styles.person}>
      <div className={styles.portrait}>
        <Image src={photo} alt={`Portrait de ${m.nom}.`} fill sizes="(max-width: 767px) 100vw, 33vw" />
      </div>
      <h3 className={styles.personName}>{m.nom}</h3>
      <p className={styles.personRole}>{m.eyebrow}</p>
      <p className={styles.personBio}>{m.bio}</p>
      <div className={styles.chips}>
        {m.domaines.map((d) => (
          <span className={styles.chip} key={d}>
            {d}
          </span>
        ))}
      </div>
    </article>
  );
}

function ExpertCard({ m }: { m: Membre }) {
  const photo = MEMBRES[m.slug].photo;
  return (
    <article className={styles.expert}>
      <div className={styles.portrait}>
        <Image src={photo} alt={`Portrait de ${m.nom}.`} fill sizes="(max-width: 767px) 160px, 150px" />
      </div>
      <div>
        <h3 className={styles.personName}>{m.nom}</h3>
        <p className={styles.personRole}>{m.eyebrow}</p>
        <p className={styles.personBio}>{m.bio}</p>
        <div className={styles.chips}>
          {m.domaines.map((d) => (
            <span className={styles.chip} key={d}>
              {d}
            </span>
          ))}
        </div>
        {m.lien && (
          <div className={styles.expertMetaRow}>
            <a
              className={styles.linkExt}
              href={m.lien.href}
              {...(m.lien.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {m.lien.label} ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ============================ HERO ========================= */}
      <section className={styles.hero} aria-labelledby="titre-page">
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.label}>{HERO.eyebrow}</p>
              <h1 id="titre-page" className={styles.h1}>
                {HERO.titre1}
                <em>{HERO.titreAccent}</em>
              </h1>
              <p className={styles.accroche}>
                {HERO.accroche1}
                <em>{HERO.accroche2}</em>
              </p>
              <div className={styles.heroText}>
                <p>{HERO.intro1}</p>
                <p>{HERO.intro2}</p>
              </div>
              <div className={styles.heroActions}>
                <div className={styles.btnRow}>
                  <Link className={styles.btn} href="/contact">
                    Échanger avec un avocat →
                  </Link>
                  <Link className={styles.btnLink} href="#domaines">
                    Découvrir nos domaines d&apos;intervention
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.heroMedia}>
              <Image
                src="/images/equipe-panorama.webp"
                alt="L'équipe du cabinet réunie"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 42vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </div>
        </div>

        <div className={styles.reperes}>
          <div className={styles.wrap}>
            <div className={styles.reperesGrid}>
              {REPERES.map((r) => (
                <div className={styles.repere} key={r.k}>
                  <p className={styles.repereK}>{r.k}</p>
                  <p>{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================== ÉQUIPE ======================== */}
      <section id="equipe" className={`${styles.section} ${styles.equipe}`} aria-labelledby="equipe-titre">
        <div className={styles.wrap}>
          <div className={styles.equipeHead}>
            <div>
              <p className={styles.label}>L&apos;équipe</p>
              <h2 className={styles.h2} id="equipe-titre">
                Des interlocuteurs identifiés pour chaque dossier
              </h2>
            </div>
            <div className={styles.equipeIntro}>
              <p className={styles.lede}>{EQUIPE_INTRO_1}</p>
              <p className={styles.lede}>{EQUIPE_INTRO_2}</p>
            </div>
          </div>

          <div className={styles.groupHead}>
            <h3 id="avocats-titre">Les avocats</h3>
            <p className={styles.meta}>Analyse, stratégie et suivi juridique</p>
          </div>
          <div className={styles.avocats}>
            {AVOCATS.map((m) => (
              <PersonCard m={m} key={m.slug} />
            ))}
          </div>

          <div className={styles.expertsBlock}>
            <div className={styles.groupHead}>
              <h3 id="experts-titre">Compétences techniques mobilisées</h3>
            </div>
            <div className={styles.experts}>
              {EXPERTS.map((m) => (
                <ExpertCard m={m} key={m.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================== MÉTHODE ======================= */}
      <section className={`${styles.section} ${styles.methode}`} aria-labelledby="methode-titre">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>Notre méthode</p>
            <h2 className={styles.h2} id="methode-titre">
              Comprendre avant de décider
            </h2>
          </div>
          <ol className={styles.steps}>
            {METHODE.map((s) => (
              <li className={styles.step} key={s.n}>
                <p className={styles.stepN}>{s.n}</p>
                <h3>{s.titre}</h3>
                <p>{s.corps}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================= ENGAGEMENTS ===================== */}
      <section className={`${styles.section} ${styles.engagements}`} aria-labelledby="engagements-titre">
        <div className={styles.wrap}>
          <div className={styles.engHead}>
            <div>
              <p className={styles.label}>Nos engagements</p>
              <h2 className={styles.h2} id="engagements-titre">
                Ce que vous pouvez attendre du cabinet
              </h2>
            </div>
            <div className={styles.engIntro}>
              <p className={styles.lede}>
                Six engagements de service, chacun adossé à une pratique concrète du cabinet. Ils
                portent sur la qualité du suivi, jamais sur le résultat d&apos;une procédure.
              </p>
            </div>
          </div>
          <div className={styles.engGrid}>
            {ENGAGEMENTS.map((e, i) => (
              <article className={styles.engagement} key={e.titre}>
                <p className={styles.engagementN}>{String(i + 1).padStart(2, "0")}</p>
                <h3>{e.titre}</h3>
                <p>{e.corps}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== DOMAINES ======================= */}
      <section id="domaines" className={`${styles.section} ${styles.domaines}`} aria-labelledby="domaines-titre">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>Nos domaines</p>
            <h2 className={styles.h2} id="domaines-titre">
              Les domaines d&apos;intervention du cabinet
            </h2>
            <p className={styles.lede}>
              Le cabinet intervient en conseil, en conformité, en gestion de crise et en contentieux
              sur les principales questions juridiques liées aux technologies et aux usages numériques.
            </p>
          </div>
          <nav className={styles.famGrid} aria-label="Domaines d'intervention">
            {DOMAINES_FAMILLES.map((fam) => (
              <section className={styles.fam} key={fam.nom}>
                <h3 className={styles.famTitle}>{fam.nom}</h3>
                <ul className={styles.famList}>
                  {fam.items.map((d) => (
                    <li key={d.href}>
                      <Link className={styles.famLink} href={d.href}>
                        <span>{d.label}</span>
                        <span className={styles.famArrow} aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>
      </section>

      {/* =========================== PORTAIL ======================= */}
      <section className={`${styles.section} ${styles.portail}`} aria-labelledby="portail-titre">
        <div className={styles.wrap}>
          <div className={styles.portailGrid}>
            <div>
              <p className={styles.label}>Le suivi du dossier</p>
              <h2 className={styles.h2} id="portail-titre">
                Le suivi de votre dossier, rendu visible
              </h2>
              <p className={styles.lede}>
                L&apos;expertise juridique reste au cœur de la mission. Le portail client en est le
                prolongement : il réunit les documents, les échanges, les diligences accomplies et les
                prochaines échéances, consultables dès l&apos;ouverture du dossier.
              </p>
              <p className={styles.portailNote}>
                Le portail complète les échanges avec l&apos;avocat responsable du dossier ; il ne les
                remplace pas.
              </p>
            </div>

            <div className={styles.portailDemo} aria-hidden="true">
              <PortailDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= HONORAIRES ====================== */}
      <section className={`${styles.section} ${styles.honoraires}`} aria-labelledby="honoraires-titre">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>Honoraires</p>
            <h2 className={styles.h2} id="honoraires-titre">
              Un cadre défini avant de commencer
            </h2>
            <p className={styles.lede}>
              Le mode d&apos;honoraires est choisi selon la nature de la mission. Aucun montant
              n&apos;est engagé sans que son cadre ait été présenté et validé.
            </p>
          </div>
          <div className={styles.honoGrid}>
            {HONORAIRES_MODALITES.map((h) => (
              <div className={styles.honoCard} key={h.titre}>
                <h3>{h.titre}</h3>
                <p>{h.corps}</p>
              </div>
            ))}
          </div>
          <ul className={styles.honoPrincipes}>
            {HONORAIRES_PRINCIPES.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== DÉMARRER UNE MISSION ================= */}
      <section className={`${styles.section} ${styles.demarrage}`} aria-labelledby="demarrage-titre">
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>Démarrer une mission</p>
            <h2 className={styles.h2} id="demarrage-titre">
              Ce qui se passe après votre message
            </h2>
          </div>
          <div className={styles.demGrid}>
            {DEMARRAGE.map((s) => (
              <div className={styles.demStep} key={s.n}>
                <p className={styles.demStepN}>{s.n}</p>
                <h3>{s.titre}</h3>
                <p>{s.corps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== CTA FINAL ====================== */}
      <section className={styles.cta} aria-labelledby="cta-titre">
        <div className={styles.wrap}>
          <p className={styles.label}>Prise de contact</p>
          <h2 className={styles.h2} id="cta-titre">
            Parlons de votre situation
          </h2>
          <p>
            Présentez brièvement le contexte, le degré d&apos;urgence et l&apos;objectif recherché. Le
            cabinet vous indiquera si la situation relève de ses domaines d&apos;intervention et dans
            quelles conditions elle peut être examinée.
          </p>
          <div className={styles.btnRow}>
            <Link className={`${styles.btn} ${styles.btnInvert}`} href="/contact">
              Exposer mon dossier →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
