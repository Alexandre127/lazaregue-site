import type { Metadata } from "next";
import Image from "next/image";
import styles from "./ma-tech.module.css";
import { AVIS } from "@/lib/avis";
import {
  DOMAINES_AUDIT,
  ECART,
  ETAPES,
  FAQ,
  FIN,
  HERO,
  LIVRABLES,
  MATRICE,
  OPERATIONS,
  POUR_QUI,
} from "./data/ma-tech";
import Rail from "./_components/Rail";
import EquipeDossier from "@/components/equipe-dossier";

const TITLE =
  "Avocat M&A Tech — due diligence technologique et audit juridique logiciel | Lazarègue Avocats";
const DESCRIPTION =
  "Due diligence technologique lors d'une acquisition : propriété du code, open source, données, garanties du SPA. Pour les PME et ETI qui rachètent une cible tech.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/competences/ma-tech" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/competences/ma-tech",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      name: "Avocat M&A Tech — Lazarègue Avocats",
      description:
        "Due diligence juridique des actifs numériques et technologiques lors d'une acquisition, d'une cession ou d'une prise de participation.",
      url: "https://lazaregue-avocats.fr/competences/ma-tech",
      areaServed: { "@type": "Country", name: "France" },
      serviceType:
        "Due diligence technologique, audit juridique logiciel, acquisition entreprise tech, garanties SPA",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats" },
    },
    {
      "@type": "HowTo",
      name: "Sécuriser le volet technologique d'une acquisition",
      description:
        "Les trois temps de l'intervention sur le stream technologique d'une opération de M&A.",
      step: ETAPES.map((e, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: e.court,
        text: e.these,
        url: `https://lazaregue-avocats.fr/competences/ma-tech#${e.id}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/** Bouton d'action — pointe systématiquement vers la page contact. */
function Cta({
  tag,
  label,
  primary,
}: {
  tag: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      className={`${styles.cta} ${primary ? styles.ctaPrimary : ""}`.trim()}
      href="/contact"
    >
      <span className={styles.tag}>{tag}</span>
      <span className={styles.lbl}>{label}</span>
    </a>
  );
}

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <div className={styles.wrap}>
        {/* Hero */}
        <header className={styles.hero}>
          <span className={styles.eyebrow}>{HERO.eyebrow}</span>
          <h1>{HERO.h1}</h1>
          <p className={styles.heroSub}>{HERO.sub}</p>

          <div className={styles.tri}>
            {HERO.triptyque.map((t, i) => (
              <div key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{t}</p>
              </div>
            ))}
          </div>

          <p className={styles.scope}>
            {HERO.scope}
            <br />
            {HERO.scope2}
          </p>

          <div className={styles.ctaRow}>
            <Cta tag="Buy-side" label="Faire auditer une cible" primary />
            <Cta tag="Sell-side" label="Préparer une cession tech" />
          </div>
        </header>

        {/* Pour qui */}
        <section className={styles.pourQui} aria-labelledby="pour-qui">
          <span className={styles.eyebrow}>Pour qui</span>
          <h2 id="pour-qui">{POUR_QUI.titre}</h2>
          <p className={styles.pourQuiTexte}>{POUR_QUI.texte}</p>
          <div className={styles.pourQuiGrille}>
            {POUR_QUI.points.map((p) => (
              <div key={p.k} className={styles.pourQuiItem}>
                <h3>{p.k}</h3>
                <p>{p.v}</p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.bodyGrid}>
          <Rail />

          <div className={styles.col}>
            {ETAPES.map((e) => (
              <section key={e.id} id={e.id} className={styles.step}>
                <span className={styles.eyebrow}>
                  {e.n} — {e.court}
                </span>
                <h2>{e.h2}</h2>
                <p className={styles.these}>{e.these}</p>

                {/* Tableau des écarts — propre à l'étape « Auditer » */}
                {e.id === "auditer" ? (
                  <>
                    <figure className={styles.schema}>
                      <div className={styles.gapTbl}>
                        <div className={styles.gh}>
                          <span>Ce que l&apos;acquéreur pense acheter</span>
                          <span>Ce qu&apos;il doit vérifier</span>
                        </div>
                        {ECART.lignes.map((l) => (
                          <div
                            key={l.a}
                            className={`${styles.gr} ${l.hl ? styles.hl : ""}`.trim()}
                          >
                            <span className={styles.a}>{l.a}</span>
                            <span className={styles.b}>{l.b}</span>
                          </div>
                        ))}
                      </div>
                      <figcaption className={styles.figcaption}>
                        {ECART.legende}
                      </figcaption>
                    </figure>

                    <h3 className={styles.eyebrow}>
                      Audit juridique du logiciel et des données
                    </h3>
                    {DOMAINES_AUDIT.map((d) => (
                      <div key={d.h3} className={styles.dom}>
                        <h3>{d.h3}</h3>
                        <p>{d.p}</p>
                        {d.lien ? (
                          <a className={styles.domLien} href={d.lien.href}>
                            {d.lien.label} →
                          </a>
                        ) : null}
                      </div>
                    ))}

                    <div className={styles.deliver}>
                      <span className={styles.k}>Nos livrables</span>
                      <ol>
                        {LIVRABLES.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ol>
                    </div>

                    <div className={styles.spec}>
                      <div className={styles.specTop}>
                        <b>{MATRICE.titre}</b>
                        <i>{MATRICE.mention}</i>
                      </div>
                      <div className={`${styles.specRow} ${styles.specHdr}`}>
                        <span>#</span>
                        <span>Constat</span>
                        <span>Gravité</span>
                        <span>Traitement retenu</span>
                      </div>
                      {MATRICE.lignes.map((l) => (
                        <div key={l.n} className={styles.specRow}>
                          <span className={styles.specN}>{l.n}</span>
                          {/* `data-col` sert de libellé de repli sur mobile,
                              où l'en-tête du tableau n'est plus affiché. */}
                          <span className={styles.specF} data-col="Constat">
                            {l.constat}
                          </span>
                          <span data-col="Gravité">
                            <span
                              className={`${styles.sev} ${
                                l.ton === "hi"
                                  ? styles.sevHi
                                  : l.ton === "md"
                                    ? styles.sevMd
                                    : styles.sevLo
                              }`}
                            >
                              {l.gravite}
                            </span>
                          </span>
                          <span className={styles.specT} data-col="Traitement retenu">
                            {l.traitement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {e.paragraphes?.map((p) => <p key={p}>{p}</p>)}

                {e.domaines?.map((d) => (
                  <div key={d.h3} className={styles.dom}>
                    <h3>{d.h3}</h3>
                    <p>{d.p}</p>
                    {d.lien ? (
                      <a className={styles.domLien} href={d.lien.href}>
                        {d.lien.label} →
                      </a>
                    ) : null}
                  </div>
                ))}

                <div className={styles.legal}>
                  <span className={styles.k}>Le point juridique</span>
                  <p>{e.point}</p>
                </div>

                <div className={styles.ctaRow}>
                  <Cta
                    tag={`${e.court} ${e.n}`}
                    label={e.cta}
                    primary={e.id === "auditer"}
                  />
                </div>
              </section>
            ))}

            {/* Interventions */}
            <section className={styles.ops} id="operations">
              <h2>Acquisition SaaS, carve-out, asset deal : nos interventions</h2>
              <div className={styles.grid}>
                {OPERATIONS.map((o) => (
                  <div key={o.h3} className={styles.op}>
                    <span className={styles.k}>{o.k}</span>
                    <h3>{o.h3}</h3>
                    <p>{o.p}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Signature */}
            <section className={styles.signature}>
              <div className={styles.signaturePhoto}>
                <Image
                  src="/images/alexandre-pro.jpg"
                  alt="Alexandre Lazarègue, avocat au barreau de Paris"
                  fill
                  sizes="92px"
                />
              </div>
              <div>
                <h2>Une pratique quotidienne du droit des actifs numériques</h2>
                <p>
                  Lazarègue Avocats intervient en droit des logiciels, contrats IT,
                  données personnelles, intelligence artificielle, plateformes et
                  cybercriminalité. Cette pratique permet d&apos;examiner la
                  technologie acquise au-delà des seules déclarations de la data room.
                </p>
                <div className={styles.signatureNom}>Alexandre Lazarègue</div>
                <div className={styles.signatureRole}>
                  Avocat au barreau de Paris · fondateur du cabinet
                </div>
                <p className={styles.signatureAvis}>
                  {AVIS.note} sur 5 —{" "}
                  <a href={AVIS.href} target="_blank" rel="noopener">
                    {AVIS.nombre} avis Google
                  </a>
                </p>
              </div>
            </section>

            {/* Équipe du stream technologique */}
            <section style={{ margin: "40px 0" }}>
              <EquipeDossier
                eyebrow="L'équipe"
                titre="Qui tient le stream technologique"
                chapeau="Le volet technologique d'une opération se joue entre la revue des actifs numériques et la rédaction des garanties du contrat d'acquisition. Les deux sont menées par la même équipe."
                membres={[
                  { slug: "alexandre", role: "Actifs numériques & due diligence", tags: ["Propriété du code", "Open source", "Données"] },
                  { slug: "amir", role: "Contrats & garanties du SPA", tags: ["SPA", "Change of control", "Remédiation"] },
                ]}
              />
            </section>

            {/* FAQ */}
            <section className={styles.faq}>
              <h2>Questions fréquentes</h2>
              {FAQ.map((f) => (
                <div key={f.q} className={styles.qa}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>

            {/* Fin */}
            <section className={styles.end} id="contact">
              <h2>{FIN.h2}</h2>
              <p>{FIN.p}</p>
              <div className={styles.ctaRow}>
                <Cta tag="Buy-side" label="Faire auditer une cible" primary />
                <Cta tag="Sell-side" label="Préparer une cession tech" />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Contact toujours à portée sur mobile */}
      <a href="/contact" className={styles.sticky}>
        Auditer ma cible →
      </a>
    </main>
  );
}
