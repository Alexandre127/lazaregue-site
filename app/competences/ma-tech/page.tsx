import type { Metadata } from "next";
import styles from "./ma-tech.module.css";
import { fr } from "@/lib/typo";
import {
  BASCULE,
  DEFINITION,
  DOMAINES_AUDIT,
  ETAPES,
  EQUIPE_POINT,
  FAQ,
  FIN,
  HERO,
  LIVRABLES,
  MATRICE,
  OPERATIONS,
  POUR_QUI,
  SCOPE,
  TEAM,
} from "./data/ma-tech";
import Rail from "./_components/Rail";
import Bascule from "./_components/Bascule";
import EquipeDossier from "@/components/equipe-dossier";

/**
 * Le title vise la requête réellement tapée par les acquéreurs et leurs
 * conseils ; la description reprend celle de la maquette.
 */
const TITLE =
  "Avocat M&A Tech à Paris — due diligence technologique | Lazarègue Avocats";
const DESCRIPTION =
  "Avocat du volet technologique des opérations de fusion-acquisition : due diligence juridique des logiciels, données, contrats IT et systèmes d'IA, garanties du SPA et remédiation. Paris, toute la France.";

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

/* JSON-LD : LegalService (le site utilise déjà ce type) + FAQPage (les sept
   questions de la page). Pas de HowTo (non demandé, plus de résultat enrichi
   depuis 2023, et il décrirait une prestation d'avocat comme un mode d'emploi) ;
   pas d'Organization (déjà dans le layout) ; PAS d'AggregateRating (un balisage
   de notation auto-déclaré n'est pas éligible aux résultats enrichis et expose
   à une action manuelle). */
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
function Cta({ tag, label, primary }: { tag: string; label: string; primary?: boolean }) {
  return (
    <a className={`${styles.cta} ${primary ? styles.ctaPrimary : ""}`.trim()} href="/contact">
      <span className={styles.tag}>{tag}</span>
      <span className={styles.lbl}>{fr(label)}</span>
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
        {/* ===== Héro — une seule colonne tant que la photographie n'existe
             pas (pas de colonne droite vide).
             À RÉTABLIR quand l'image sera fournie :
               • grille deux colonnes AU-DESSUS de 940 px (texte à gauche,
                 image à droite), une seule colonne en dessous ;
               • image portrait, ratio 4:5, 1200 × 1500 px, masquée sous 940 px ;
               • next/image, priority (héro), alt descriptif, width/height
                 explicites. La maquette (docs/ma-tech-v2.html : .hero-grid /
                 .hero-media / .ph--dark) porte le gabarit de référence. ===== */}
        <header className={styles.hero}>
          <span className={styles.eyebrow}>{HERO.eyebrow}</span>
          <h1>
            {fr(HERO.h1)}
            <span className={styles.h1tail}>{fr(HERO.h1tail)}</span>
          </h1>
          <p className={styles.heroSub}>{fr(HERO.sub)}</p>
          <p className={styles.heroIntro}>{fr(HERO.intro)}</p>

          <div className={styles.ctaRow}>
            <Cta tag="buy-side" label="Faire auditer une cible" primary />
            <Cta tag="sell-side" label="Préparer une cession tech" />
          </div>

          <div className={styles.assert}>
            {HERO.assertions.map((a, i) => (
              <div key={a}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <p>{fr(a)}</p>
              </div>
            ))}
          </div>
        </header>
      </div>

      {/* ===== Définition ===== */}
      <section className={styles.definition}>
        <div className={`${styles.wrap} ${styles.defGrid}`}>
          <div>
            <h2>{fr(DEFINITION.h2)}</h2>
          </div>
          <div className={styles.defBody}>
            <p>{fr(DEFINITION.p1)}</p>
            <p className={styles.small}>
              On la rencontre aussi sous les appellations <strong>due diligence IT</strong>,{" "}
              <em>tech due diligence</em> ou <em>technology due diligence</em>. Côté vendeur,
              l&apos;exercice symétrique est la <strong>vendor due diligence</strong> : le cédant fait
              auditer sa propre technologie avant d&apos;ouvrir la data room.
            </p>
            <div className={styles.defTags}>
              {DEFINITION.tags.map((t) => (
                <span key={t} className={styles.tagChip}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Audit juridique / audit technique ===== */}
      <section>
        <div className={styles.wrap}>
          <div className={styles.scope}>
            <span className={`${styles.eyebrow} ${styles.eyebrowBlue}`}>{SCOPE.label}</span>
            <h3 className={styles.scopeH}>{fr(SCOPE.h3)}</h3>
            <p className={styles.measure}>{fr(SCOPE.measure)}</p>
            <table className={styles.compare}>
              <thead>
                <tr>
                  <th scope="col">{SCOPE.headA}</th>
                  <th scope="col">{SCOPE.headB}</th>
                </tr>
              </thead>
              <tbody>
                {SCOPE.rows.map(([a, b]) => (
                  <tr key={a}>
                    <td>{fr(a)}</td>
                    <td>{fr(b)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.scopeNote}>{fr(SCOPE.note)}</p>
          </div>
        </div>
      </section>

      {/* ===== Pour qui ===== */}
      <section>
        <div className={styles.wrap}>
          <span className={styles.eyebrow}>pour qui</span>
          <h2 className={styles.pourQuiTitre}>{fr(POUR_QUI.titre)}</h2>
          <p className={styles.lead}>{fr(POUR_QUI.texte)}</p>
          <div className={styles.whoGrid}>
            {POUR_QUI.points.map((p) => (
              <article key={p.k}>
                <h4>{fr(p.k)}</h4>
                <p>{fr(p.v)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 01 / 02 / 03 — rail + contenu ===== */}
      <section>
        <div className={`${styles.wrap} ${styles.bodyGrid}`}>
          <Rail />

          <div className={styles.col}>
            {ETAPES.map((e) => (
              <section key={e.id} id={e.id} className={styles.step}>
                <span className={styles.eyebrow}>
                  {e.n} — {e.court}
                </span>
                <h2>{fr(e.h2)}</h2>
                <p className={styles.these}>{fr(e.these)}</p>

                {/* Étape 01 : bloc bascule, accordéon des domaines, livrables,
                    matrice. */}
                {e.id === "auditer" ? (
                  <>
                    <Bascule />

                    <h3 className={styles.domTitre}>Audit juridique du logiciel et des données</h3>
                    <div className={styles.dom}>
                      {DOMAINES_AUDIT.map((d) => (
                        <details key={d.h3}>
                          <summary>{fr(d.h3)}</summary>
                          <div className={styles.domBody}>
                            <p>{fr(d.p)}</p>
                            {d.lien ? (
                              <a className={styles.domLien} href={d.lien.href}>
                                {d.lien.label} →
                              </a>
                            ) : null}
                          </div>
                        </details>
                      ))}
                    </div>

                    <div className={styles.deliver}>
                      <span className={`${styles.k} ${styles.kBlue}`}>nos livrables</span>
                      <ol>
                        {LIVRABLES.map((l) => (
                          <li key={l}>{fr(l)}</li>
                        ))}
                      </ol>
                    </div>

                    <div className={styles.matrix}>
                      <div className={styles.matrixHead}>
                        <h3>{fr(MATRICE.titre)}</h3>
                        <span className={styles.k}>{MATRICE.mention}</span>
                      </div>
                      <div className={`${styles.specRow} ${styles.specHdr}`}>
                        <span>#</span>
                        <span>constat</span>
                        <span>gravité</span>
                        <span>traitement retenu</span>
                      </div>
                      {MATRICE.lignes.map((l) => (
                        <div key={l.n} className={styles.specRow}>
                          <span className={styles.specN}>{l.n}</span>
                          <span className={styles.specF} data-col="Constat">
                            {fr(l.constat)}
                          </span>
                          <span data-col="Gravité">
                            <span
                              className={`${styles.sev} ${
                                l.ton === "hi" ? styles.sevHi : l.ton === "md" ? styles.sevMd : styles.sevLo
                              }`}
                            >
                              {l.gravite}
                            </span>
                          </span>
                          <span className={styles.specT} data-col="Traitement retenu">
                            {fr(l.traitement)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {e.paragraphes?.map((p) => (
                  <p key={p} className={styles.measure}>
                    {fr(p)}
                  </p>
                ))}

                {e.sousTitres?.map((d) => (
                  <div key={d.h3}>
                    <h3 className={styles.sousTitre}>{fr(d.h3)}</h3>
                    <p className={styles.measure}>{fr(d.p)}</p>
                  </div>
                ))}

                <div className={styles.legal}>
                  <span className={`${styles.k} ${styles.kBlue}`}>le point juridique</span>
                  <p>{fr(e.point)}</p>
                </div>

                <Cta tag={`${e.court} ${e.n}`} label={e.cta} primary={e.id === "auditer"} />
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Opérations ===== */}
      <section id="operations">
        <div className={styles.wrap}>
          <h2>Acquisition SaaS, carve-out, asset deal : nos interventions</h2>
          <div className={styles.ops}>
            {OPERATIONS.map((o) => (
              <article key={o.h3}>
                <span className={`${styles.k} ${styles.kPeri}`}>{o.k}</span>
                <h4>{fr(o.h3)}</h4>
                <p>{fr(o.p)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Équipe ===== */}
      <section>
        <div className={styles.wrap}>
          <EquipeDossier
            eyebrow="l'équipe"
            titre="Qui tient le stream technologique"
            chapeau="Le volet technologique d'une opération se joue entre la revue des actifs numériques, la conformité des données et la rédaction des garanties du contrat d'acquisition. Ces trois travaux sont menés par la même équipe."
            membres={TEAM}
          />
          <div className={styles.legal} style={{ marginTop: 24 }}>
            <span className={`${styles.k} ${styles.kBlue}`}>une pratique quotidienne</span>
            <p>{fr(EQUIPE_POINT)}</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section>
        <div className={styles.wrap}>
          <h2>Questions fréquentes</h2>
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{fr(f.q)}</summary>
                <div className={styles.a}>{fr(f.a)}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className={styles.contact} id="contact">
        <div className={`${styles.wrap} ${styles.contactGrid}`}>
          <div>
            <h2 className={styles.contactH}>{fr(FIN.h2)}</h2>
            <p className={styles.lead}>{fr(FIN.p)}</p>
            <div className={styles.ctaRow}>
              <Cta tag="buy-side" label="Faire auditer une cible" primary />
              <Cta tag="sell-side" label="Préparer une cession tech" />
            </div>
          </div>
          <div>
            <span className={styles.eyebrow}>notre intervention</span>
            <div className={styles.steps}>
              {FIN.steps.map((s, i) => (
                <div key={s}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <span>{fr(s)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact toujours à portée sur mobile */}
      <a href="/contact" className={styles.sticky}>
        Auditer ma cible →
      </a>
    </main>
  );
}
