import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import { MEMBRES } from "@/lib/equipe";
import styles from "../formations.module.css";
import type { Formation } from "../_data/types";
import { ALL_FORMATIONS } from "../_data/all";

const CONTACT = "/contact";

/**
 * Gabarit unique des pages de formation (maquettes 03–10). Server component :
 * la seule interactivité (accordéons, Oui/Non statiques) passe par des
 * `<details>` et des liens. Photos des formateurs issues de `lib/equipe.ts`.
 */
export default function FormationLayout({ f }: { f: Formation }) {
  const path = `/formations/${f.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Formations", item: SITE_URL + "/formations" },
      { "@type": "ListItem", position: 3, name: f.hubTitre, item: SITE_URL + path },
    ],
  };

  return (
    <main className={styles.formations} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ============================== HERO ============================= */}
      <section className={`${styles.sec} ${styles.navy} ${styles.fHero}`} aria-labelledby="h1">
        <div className={styles.wrap}>
          <div className={styles.fHeroGrid}>
            <div className={styles.fHeroMain}>
              <nav className={styles.crumb} aria-label="Fil d’Ariane">
                <Link href="/">Accueil</Link> / <Link href="/formations">Formations</Link> / <span aria-current="page">{f.hubTitre}</span>
              </nav>
              <span className={styles.kicker}>{f.kicker}</span>
              <h1 className={styles.fH1} id="h1">
                {f.h1.avant}
                <span className={styles.accent}>{f.h1.accent}</span>
                {f.h1.apres ?? ""}
              </h1>
              <p className={styles.accroche}>{f.accroche}</p>
              <p className={styles.fIntro}>{f.intro}</p>
            </div>
            <aside className={styles.reperes} aria-label="En bref">
              {f.reperes.map((r) => (
                <div className={styles.repere} key={r.label}>
                  <span className={styles.kicker}>{r.label}</span>
                  <span className={styles.repereVal}>{r.value}</span>
                </div>
              ))}
            </aside>
            <div className={`${styles.fBtns} ${styles.fHeroBtns}`}>
              <Link className={styles.btnP} href={CONTACT}>{f.ctaPrimaire}</Link>
              <Link className={styles.btnG} href={CONTACT}>{f.ctaSecondaire}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ SITUATION ========================== */}
      <section className={styles.sec}>
        <div className={styles.wrap}>
          <div className={styles.sitGrid}>
            <div className={styles.sitBox}>
              <span className={styles.eyebrow}>La situation</span>
              <span className={styles.sitMoment}>{f.situation.moment}</span>
              <p className={styles.sitScene}>{f.situation.scene}</p>
            </div>
            <p className={styles.sitRenvoi}>{f.situation.renvoi}</p>
          </div>
        </div>
      </section>

      {/* ========================= ÊTES-VOUS CONCERNÉ ==================== */}
      <section className={`${styles.sec} ${styles.navy}`}>
        <div className={styles.wrap}>
          <div className={styles.concGrid}>
            <div className={styles.concHead}>
              <span className={styles.eyebrow}>Êtes-vous concerné ?</span>
              <h2 className={styles.h2}>Trois questions</h2>
              <p className={styles.concLead}>Un seul « oui » suffit : cette formation vous concerne.</p>
            </div>
            <div className={styles.concList}>
              {f.concerne.map((q) => (
                <div className={styles.concRow} key={q}>
                  <span className={styles.concQ}>{q}</span>
                  <span className={styles.ouiNon}>
                    <Link className={styles.bOui} href={CONTACT}>Oui</Link>
                    <Link className={styles.bNon} href={CONTACT}>Non</Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ OBJECTIFS ========================= */}
      <section className={styles.sec}>
        <div className={styles.wrap}>
          <div className={styles.splitGrid}>
            <div className={styles.splitHead}>
              <span className={styles.eyebrow}>Objectifs</span>
              <h2 className={styles.h2}>À la fin de la journée, vos équipes savent</h2>
            </div>
            <ol className={styles.objList}>
              {f.objectifs.map((o, i) => (
                <li className={styles.objItem} key={o}>
                  <span className={styles.objNum}>{i + 1}</span>
                  <span>{o}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================== LA JOURNÉE ====================== */}
      <section className={`${styles.sec} ${styles.ghost}`} id="programme">
        <div className={styles.wrap}>
          <div className={styles.secHead}>
            <span className={styles.eyebrow}>La journée</span>
            <h2 className={styles.h2}>Heure par heure</h2>
          </div>
          <ol className={styles.frise}>
            {f.journee.map((c) => (
              <li className={`${styles.creneau}${c.detail ? "" : ` ${styles.creneauPause}`}`} key={c.heure}>
                <span className={styles.creneauH}>{c.heure}</span>
                <span className={styles.creneauT}>{c.titre}</span>
                {c.detail ? <span className={styles.creneauD}>{c.detail}</span> : null}
              </li>
            ))}
          </ol>

          <div className={styles.splitGrid}>
            <div className={styles.splitHead}>
              <span className={styles.progLead}>Le programme détaillé</span>
            </div>
            <div className={styles.prog}>
              {f.programme.map((m, i) => (
                <details className={styles.acc} key={m.num} open={i === 0}>
                  <summary>
                    <span className={styles.progSum}>
                      <span className={styles.progNum}>{m.num}</span>
                      <span className={styles.progTitle}>{m.titre}</span>
                    </span>
                    <span className={styles.accIco} aria-hidden="true" />
                  </summary>
                  <ul className={styles.l}>
                    {m.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= CE QUE VOUS EMPORTEZ ================= */}
      <section className={styles.sec}>
        <div className={styles.wrap}>
          <div className={styles.secHeadSplit}>
            <div className={styles.splitHead}>
              <span className={styles.eyebrow}>Ce que vous emportez</span>
              <h2 className={styles.h2}>{f.livrablesTitre}</h2>
            </div>
            <p className={styles.livrIntro}>{f.livrablesIntro}</p>
          </div>
          <div className={styles.docRow}>
            {f.livrables.slice(0, 4).map((d) => (
              <div className={styles.docCard} key={d.titre}>
                <div className={styles.docTop}>
                  <span className={styles.docLogo}>
                    LAZARÈGUE <span className={styles.accent}>AVOCATS</span>
                  </span>
                  <span className={styles.docTag}>Modèle</span>
                </div>
                <span className={styles.docRule} />
                <span className={styles.docTitle}>{d.titre}</span>
                <span className={styles.docSub}>{d.soustitre}</span>
                <ul className={`${styles.docExtrait}${d.cases ? ` ${styles.docCases}` : ""}`}>
                  {d.extrait.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ul className={`${styles.l} ${styles.livrList}`}>
            {f.livrables.map((d) => (
              <li key={d.titre}>
                <strong>{d.titre}</strong> — <span className={styles.muted}>{d.soustitre}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ FORMATEURS ======================== */}
      <section className={`${styles.sec} ${styles.navy}`}>
        <div className={styles.wrap}>
          <div className={styles.formGrid}>
            <div className={styles.formHead}>
              <span className={styles.eyebrow}>Vos formateurs</span>
              <h2 className={styles.h2}>{f.formateursTitre}</h2>
              <p className={styles.formIntro}>{f.formateursIntro}</p>
            </div>
            <div className={styles.formCards}>
              {f.formateurs.map((ft) => {
                const m = "slug" in ft ? MEMBRES[ft.slug] : null;
                const nom = m ? m.nom : "slug" in ft ? "" : ft.nom;
                const statut = m ? m.statut : "slug" in ft ? "" : ft.statut;
                return (
                  <div className={styles.formCard} key={nom}>
                    <span className={styles.formPhoto}>
                      {m ? (
                        <Image src={m.photo} alt={`Portrait de ${m.nom}`} fill sizes="(max-width: 767px) 84px, 270px" style={{ objectFit: "cover", objectPosition: m.position ?? "center" }} />
                      ) : (
                        <span className={styles.formPhotoPh} aria-hidden="true">Photo à venir</span>
                      )}
                    </span>
                    <div className={styles.formInfo}>
                      <span className={styles.formName}>{nom}</span>
                      <span className={styles.formRole}>{statut}</span>
                      <span className={styles.formBio}>{ft.bio}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =============================== FAQ ============================ */}
      <section className={`${styles.sec} ${styles.ghost}`}>
        <div className={styles.wrap}>
          <div className={styles.splitGrid}>
            <div className={styles.splitHead}>
              <span className={styles.eyebrow}>Questions fréquentes</span>
              <h2 className={styles.h2}>Avant de s’inscrire</h2>
            </div>
            <div className={styles.faqList}>
              {f.faq.map((qa, i) => (
                <details className={styles.acc} key={qa.q} open={i === 0}>
                  <summary>
                    <span className={styles.faqQ}>{qa.q}</span>
                    <span className={styles.accIco} aria-hidden="true" />
                  </summary>
                  <p className={styles.faqA}>{qa.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================= NOS AUTRES FORMATIONS ================ */}
      <section className={`${styles.sec} ${styles.ghost}`}>
        <div className={styles.wrap}>
          <div className={styles.secTitle}>
            <span className={styles.eyebrow}>Nos autres formations</span>
            <h2 className={styles.h2}>Découvrir les autres formations</h2>
          </div>
          <div className={styles.cards3}>
            {ALL_FORMATIONS.filter((o) => o.slug !== f.slug).map((o) => (
              <article className={styles.fcard} key={o.slug}>
                <span className={styles.fcardNum}>{o.numero}</span>
                <h3 className={styles.fcardH3}>{o.hubTitre}</h3>
                <p className={styles.fcardP}>{o.hubPhrase}</p>
                <Link className={styles.fcardBtn} href={`/formations/${o.slug}`}>Voir la formation</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= CTA FINAL ======================== */}
      <section className={`${styles.sec} ${styles.navy} ${styles.ctaFinal}`} aria-labelledby="h-cta">
        <div className={styles.wrap}>
          <div className={styles.ctaGrid}>
            <div className={styles.ctaText}>
              <h2 className={styles.h2} id="h-cta">{f.ctaFinalTitre}</h2>
              <span className={styles.ctaSub}>{f.ctaFinalTexte}</span>
            </div>
            <div className={styles.fBtns}>
              <Link className={styles.btnP} href={CONTACT}>{f.ctaPrimaire}</Link>
              <Link className={styles.btnG} href={CONTACT}>{f.ctaSecondaire}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
