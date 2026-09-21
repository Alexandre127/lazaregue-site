import type { ReactNode } from "react";
import Link from "next/link";
import { type Cas, DOM_META, ISSUE, CAS_BASE, caseLabel } from "../data/cas-clients";

const doms = (c: Cas) => c.domaines.map((d) => DOM_META[d].label).join(" · ");

/** Carte de cas (grille). Entièrement cliquable (titre = nom accessible). */
export function CaseCard({ cas, hidden }: { cas: Cas; hidden?: boolean }) {
  return (
    <article className="ccard" data-doms={cas.domaines.join(" ")} hidden={hidden}>
      <span className="num" aria-hidden>{cas.numero}</span>
      <p className="tagd">{doms(cas)}</p>
      <h3>
        <Link href={`${CAS_BASE}/${cas.slug}`}>{cas.titre}</Link>
      </h3>
      <p className="ctx">{cas.resume}</p>
      <div className="foot">
        <span className="status stOk">{ISSUE}</span>
        <span className="clink" aria-hidden>Lire le cas →</span>
      </div>
    </article>
  );
}

/** Cas à la une (2 colonnes : texte + colonne bleu nuit enjeu/voie/issue). */
export function CaseFeatured({ cas, hidden }: { cas: Cas; hidden?: boolean }) {
  return (
    <article className="feat ccard" data-doms={cas.domaines.join(" ")} hidden={hidden}>
      <div className="featL">
        <p className="tagd">{caseLabel(cas)}</p>
        <h2>
          <Link href={`${CAS_BASE}/${cas.slug}`}>{cas.titre}</Link>
        </h2>
        <p className="ftx">{cas.chapo}</p>
        <p>
          <Link className="btn" href={`${CAS_BASE}/${cas.slug}`}>Lire le cas →</Link>
        </p>
      </div>
      <div className="featR">
        <dl>
          <dt>Enjeu</dt>
          <dd>{cas.enjeu}</dd>
          <dt>Voie retenue</dt>
          <dd>{cas.voie}</dd>
          <dt>Issue</dt>
          <dd>{ISSUE}</dd>
        </dl>
      </div>
    </article>
  );
}

/** Bandeau situation / voie / issue (haut de page de cas). */
export function CaseSummaryBar({ cas }: { cas: Cas }) {
  return (
    <dl className="sumbar">
      <div>
        <dt>Situation</dt>
        <dd>{cas.resume}</dd>
      </div>
      <div>
        <dt>Voie retenue</dt>
        <dd>{cas.voie}</dd>
      </div>
      <div>
        <dt>Issue</dt>
        <dd>{ISSUE}</dd>
      </div>
    </dl>
  );
}

/** Fiche du dossier (collante sur ordinateur). */
export function CaseFactsAside({ cas }: { cas: Cas }) {
  return (
    <aside className="fiche" aria-label="Fiche du dossier">
      <p className="t">Fiche du dossier</p>
      <dl>
        <dt>Domaines</dt>
        <dd>
          {cas.domaines.map((d, i) => (
            <span key={d}>
              <Link href={DOM_META[d].href}>{DOM_META[d].label}</Link>
              {i < cas.domaines.length - 1 ? " · " : ""}
            </span>
          ))}
        </dd>
        <dt>Client</dt>
        <dd>{cas.client}</dd>
        <dt>Nature</dt>
        <dd>{cas.nature}</dd>
        <dt>Voie retenue</dt>
        <dd>{cas.voie}</dd>
        <dt>Issue</dt>
        <dd>{ISSUE}</dd>
      </dl>
      <div className="who">
        <span className="ava" role="img" aria-label="Portrait d’Alexandre Lazarègue" />
        <div>
          <p className="meta wsm">Dossier suivi par</p>
          <p className="wnm">Me Alexandre Lazarègue</p>
          <Link href="/le-cabinet" className="wlk">Découvrir le cabinet</Link>
        </div>
      </div>
    </aside>
  );
}

/** Section numérotée du corps de cas. */
export function CaseSection({ n, id, titre, children }: { n: string; id: string; titre: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <span className="sn" aria-hidden>{n}</span>
      <h2 id={id}>{titre}</h2>
      {children}
    </section>
  );
}

/** Cas précédent / cas suivant (ordre des numéros). */
export function CasePrevNext({ prev, next }: { prev?: Cas; next?: Cas }) {
  return (
    <nav className="pn" aria-label="Autres cas">
      {prev ? (
        <Link href={`${CAS_BASE}/${prev.slug}`}>← {prev.titre}</Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`${CAS_BASE}/${next.slug}`} className="pnRight">{next.titre} →</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
