import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../cas-clients.module.css";
import { CaseSummaryBar, CaseFactsAside, CaseSection, CasePrevNext } from "../_components/case-parts";
import { CAS, getCas, caseLabel, DOM_META, ISSUE, CAS_BASE } from "../data/cas-clients";

const URL_BASE = "https://lazaregue-avocats.fr";

export function generateStaticParams() {
  return CAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cas = getCas(slug);
  if (!cas) return {};
  const title = `${cas.seoTitle} | Lazarègue Avocats`;
  const path = `${CAS_BASE}/${cas.slug}`;
  return {
    title,
    description: cas.metaDescription,
    alternates: { canonical: path },
    openGraph: { title, description: cas.metaDescription, url: path, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "article" },
    twitter: { card: "summary_large_image", title, description: cas.metaDescription },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cas = getCas(slug);
  if (!cas) notFound();

  const idx = CAS.findIndex((c) => c.slug === cas.slug);
  const prev = CAS[idx - 1];
  const next = CAS[idx + 1];
  const principal = DOM_META[cas.domaines[0]]; // § 4 : compétence principale = 1re clé

  const JSON_LD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
      { "@type": "ListItem", position: 2, name: "Cas clients", item: `${URL_BASE}${CAS_BASE}` },
      { "@type": "ListItem", position: 3, name: `Cas ${cas.numero}`, item: `${URL_BASE}${CAS_BASE}/${cas.slug}` },
    ],
  };

  return (
    <main className={styles.cas} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ================================ HERO ============================ */}
      <section className="case-hero ghost" aria-labelledby="h1">
        <div className="wrap">
          <nav className="crumb dk" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> <span aria-hidden>/</span> <Link href={CAS_BASE}>Cas clients</Link> <span aria-hidden>/</span> <span aria-current="page">Cas {cas.numero}</span>
          </nav>
          <p className="tagd heroTag">{caseLabel(cas)}</p>
          <h1 id="h1">{cas.titre}</h1>
          <p className="chapo">{cas.chapo}</p>
          <CaseSummaryBar cas={cas} />
        </div>
      </section>

      <div className="cgrid">
        <article className="cbody">
          <CaseSection n="01" id="s1" titre="La situation">
            {cas.situation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </CaseSection>

          <CaseSection n="02" id="s2" titre="L’enjeu">
            <p>{cas.enjeu}</p>
            {cas.difficultes && (
              <div className="diff diffTop">
                {cas.difficultes.map((d) => (
                  <div key={d.b}>
                    <b>{d.b}</b>
                    <p>
                      <strong>{d.titre}</strong>
                      <span>{d.desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CaseSection>

          <CaseSection n="03" id="s3" titre="L’intervention du cabinet">
            {cas.intervention.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {cas.arbitrage && (
              <>
                <p className="arbTitle">Arbitrage entre les voies envisagées</p>
                <div className="scroll">
                  <table className="tbl arb">
                    <thead>
                      <tr><th scope="col">Voie</th><th scope="col">Appréciation</th><th scope="col">Décision</th></tr>
                    </thead>
                    <tbody>
                      {cas.arbitrage.map((a) => (
                        <tr key={a.voie}>
                          <th scope="row" data-l="Voie">{a.voie}</th>
                          <td data-l="Appréciation">{a.app}</td>
                          <td data-l="Décision" className={a.ret ? "ret" : undefined}>{a.dec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CaseSection>

          <CaseSection n="04" id="s4" titre="L’issue du dossier">
            <div className="state">
              <span className="status stOk">{ISSUE}</span>
              <p className="stateP">{cas.issue}</p>
            </div>
          </CaseSection>

          <CaseSection n="05" id="s5" titre="Ce que cette situation permet de retenir">
            <ul className="keep">
              {cas.aRetenir.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </CaseSection>

          <CasePrevNext prev={prev} next={next} />
        </article>

        <CaseFactsAside cas={cas} />
      </div>

      {/* ================= Pour comprendre les règles en jeu ============= */}
      <section className="sec ghost" aria-labelledby="h-rel">
        <div className="wrap">
          <div className="head">
            <h2 className="h2" id="h-rel">Pour comprendre les règles en jeu</h2>
          </div>
          <div className="rel3">
            <article className="comp">
              <p className="tagd">Compétence du cabinet</p>
              <h3>{principal.label}</h3>
              <Link className="link relLink" href={principal.href}>Voir la compétence →</Link>
            </article>
            {cas.ressources.map((r) => (
              <article key={r.href}>
                <p className="tagd">Ressource</p>
                <h3>{r.titre}</h3>
                <Link className="link relLink" href={r.href}>Lire la ressource →</Link>
              </article>
            ))}
          </div>
          <p className="note-a">
            Dossier anonymisé et clos : les faits sont modifiés dans la mesure nécessaire à l’anonymat
            des parties. Le résultat obtenu ne préjuge pas de l’issue d’un autre dossier, chaque
            situation dépendant de ses propres faits et pièces.
          </p>
        </div>
      </section>

      {/* ================================ CTA ============================ */}
      <section className="sec navy" aria-labelledby="h-cta">
        <div className="wrap">
          <div className="head ctahead">
            <h2 className="h2" id="h-cta">Une situation comparable&nbsp;?</h2>
            <p className="lead">Le cabinet peut examiner les contrats, les faits techniques, les preuves disponibles et les délais applicables.</p>
          </div>
          <Link className="btn" href="/contact">Présenter votre situation →</Link>
          <Link className="link ctaAll" href={CAS_BASE}>Tous les cas clients</Link>
        </div>
      </section>
    </main>
  );
}
