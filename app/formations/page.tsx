import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import { MEMBRES } from "@/lib/equipe";
import styles from "./formations.module.css";
import { IA_ACT } from "./_data/ia-act";
import { RGPD } from "./_data/rgpd";
import { CYBER } from "./_data/cyber";
import { AVOCATS } from "./_data/avocats";
import type { Formation } from "./_data/types";

const PATH = "/formations";
const TITLE = "Formations IA Act, RGPD et cybersécurité pour les entreprises | Lazarègue Avocats";
const DESCRIPTION =
  "Trois formations juridiques pour les entreprises — IA Act, RGPD et DPO, cybersécurité et cyberfraude — animées par un avocat et un expert technique. Une formation IA pour les avocats.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, type: "website" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL + "/" },
    { "@type": "ListItem", position: 2, name: "Formations", item: SITE_URL + PATH },
  ],
};

const ENTREPRISES: Formation[] = [IA_ACT, RGPD, CYBER];
const BINOME = ["alexandre", "sarah", "khalid", "nadia"];

export default function FormationsPage() {
  return (
    <main className={styles.formations} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ============================== HERO ============================= */}
      <section className={`${styles.sec} ${styles.navy} ${styles.fHero}`} aria-labelledby="h1">
        <div className={styles.wrap}>
          <div className={styles.hubHeroGrid}>
            <div className={styles.hubHeroMain}>
              <nav className={styles.crumb} aria-label="Fil d’Ariane">
                <Link href="/">Accueil</Link> / <span aria-current="page">Formations</span>
              </nav>
              <h1 className={styles.hubH1} id="h1">
                Formations IA Act, RGPD et cybersécurité <span className={styles.accent}>pour les entreprises</span>
              </h1>
              <p className={styles.hubLead}>
                Trois formations juridiques, chacune animée par un avocat et un expert technique, pour que vos équipes appliquent les règles qui encadrent leurs outils.
              </p>
              <div className={styles.hubBtns}>
                <Link className={styles.btnP} href="#formations">Choisir une formation</Link>
                <Link className={styles.btnG} href="/contact">Décrire votre besoin</Link>
              </div>
            </div>
            <div className={styles.hubHeroPhoto}>
              <Image src="/images/formations/opage-formation.webp" alt="Formation animée par le cabinet" fill sizes="(max-width: 900px) 0px, 40vw" style={{ objectFit: "cover" }} priority />
            </div>
          </div>
        </div>
      </section>

      {/* =========================== TROIS FORMATIONS =================== */}
      <section className={`${styles.sec} ${styles.ghost}`} id="formations">
        <div className={styles.wrap}>
          <div className={styles.secTitle}>
            <span className={styles.eyebrow}>Trois formations</span>
            <h2 className={styles.h2}>Choisissez le sujet de vos équipes</h2>
          </div>
          <div className={styles.cards3}>
            {ENTREPRISES.map((f) => (
              <article className={styles.fcard} key={f.slug}>
                <span className={styles.fcardNum}>{f.numero}</span>
                <h3 className={styles.fcardH3}>{f.hubTitre}</h3>
                <p className={styles.fcardP}>{f.hubPhrase}</p>
                <div className={`${styles.fcardMeta} ${styles.bt}`}>
                  <span className={styles.eyebrow}>Pour</span>
                  <span>{f.hubPublic}</span>
                </div>
                <div className={styles.fcardMeta}>
                  <span className={styles.eyebrow}>Animée par</span>
                  <span>{f.hubAnimee}</span>
                </div>
                <Link className={styles.fcardBtn} href={`/formations/${f.slug}`}>Voir le programme</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BINÔME AVOCAT + EXPERT ==================== */}
      <section className={`${styles.sec} ${styles.navy}`}>
        <div className={styles.wrap}>
          <div className={styles.binome}>
            <div className={styles.binomeText}>
              <span className={styles.eyebrow}>Ce qui distingue ces formations</span>
              <h2 className={styles.h2}>Un avocat et un expert technique, à chaque séance</h2>
              <p>L’avocat explique ce que la règle exige. L’expert technique montre ce que cela change concrètement dans vos systèmes et vos pratiques.</p>
            </div>
            <div className={styles.binomePhotos}>
              {BINOME.map((slug) => {
                const m = MEMBRES[slug];
                if (!m) return null;
                return (
                  <div className={styles.binomePhoto} key={slug}>
                    <span className={styles.ph}>
                      <Image src={m.photo} alt={`Portrait de ${m.nom}`} fill sizes="140px" style={{ objectFit: "cover", objectPosition: m.position ?? "center top" }} />
                    </span>
                    <span>{m.nom}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= DÉROULEMENT ===================== */}
      <section className={styles.sec}>
        <div className={styles.wrap}>
          <div className={styles.secTitle}>
            <span className={styles.eyebrow}>Déroulement</span>
            <h2 className={styles.h2}>Comment se déroule une formation</h2>
          </div>
          <ol className={styles.etapes}>
            <li className={styles.etape}><span className={styles.etapeNum}>1</span><b>Cadrage</b><span>Public, niveau, secteur et cas à traiter.</span></li>
            <li className={styles.etape}><span className={styles.etapeNum}>2</span><b>Formation</b><span>Les règles, un cas pratique, les réflexes à retenir.</span></li>
            <li className={styles.etape}><span className={styles.etapeNum}>3</span><b>Après</b><span>Les documents types sont remis aux participants.</span></li>
          </ol>
        </div>
      </section>

      {/* =========================== FORMATS ET TARIFS ================= */}
      <section className={styles.sec}>
        <div className={styles.wrap}>
          <div className={styles.formats}>
            <div className={styles.formatsHead}>
              <span className={styles.eyebrow}>Formats et tarifs</span>
              <h2 className={styles.h2}>Une journée, deux façons de la suivre</h2>
            </div>
            <div className={styles.formatsA}>
              <div className={styles.formatsCard}>
                <span className={styles.eyebrow}>Session inter-entreprises</span>
                <span className={styles.formatsBig}>990 € HT</span>
                <span>Par participant (1 188 € TTC) · une journée (7 h), au cabinet (18 rue de Tilsitt, Paris 17ᵉ) ou à distance, 12 personnes au plus.</span>
                <span className={styles.crumb}>Prochaines sessions : nous contacter</span>
              </div>
            </div>
            <div className={styles.formatsB}>
              <div className={styles.formatsCard}>
                <span className={styles.eyebrow}>Pour toute une équipe</span>
                <span className={styles.formatsBig}>Sur devis</span>
                <span>Dans vos locaux, programme adapté à votre organisation.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== VOUS ÊTES AVOCAT ================= */}
      <section className={`${styles.sec} ${styles.ghost}`}>
        <div className={styles.wrap}>
          <div className={styles.secTitle}>
            <span className={styles.eyebrow}>Vous êtes avocat ?</span>
          </div>
          <div className={styles.avocatBand}>
            <span className={styles.avocatNum}>{AVOCATS.numero}</span>
            <div className={styles.avocatText}>
              <h3>{AVOCATS.hubTitre}</h3>
              <p>{AVOCATS.hubPhrase}</p>
            </div>
            <Link className={styles.btnP} href={`/formations/${AVOCATS.slug}`}>Voir le programme</Link>
          </div>
        </div>
      </section>

      {/* ================================ FAQ ========================= */}
      <section className={`${styles.sec} ${styles.ghost}`}>
        <div className={styles.wrap}>
          <div className={styles.splitGrid}>
            <div className={styles.splitHead}>
              <span className={styles.eyebrow}>Questions fréquentes</span>
              <h2 className={styles.h2}>Avant d’organiser une formation</h2>
            </div>
            <div className={styles.faqList}>
              <details className={styles.acc} open>
                <summary><span className={styles.faqQ}>Les formations sont-elles réservées aux juristes ?</span><span className={styles.accIco} aria-hidden="true" /></summary>
                <p className={styles.faqA}>Non. Chaque formation s’adresse aussi aux directions métiers, aux équipes techniques et aux dirigeants concernés par le sujet.</p>
              </details>
              <details className={styles.acc}>
                <summary><span className={styles.faqQ}>Peut-on adapter une formation à notre secteur ?</span><span className={styles.accIco} aria-hidden="true" /></summary>
                <p className={styles.faqA}>Oui. Le niveau de détail, les exemples et le cas pratique sont ajustés à votre activité.</p>
              </details>
              <details className={styles.acc}>
                <summary><span className={styles.faqQ}>Quels sont la durée, le format et le tarif ?</span><span className={styles.accIco} aria-hidden="true" /></summary>
                <p className={styles.faqA}>Une journée de 7 heures : 990 € HT (1 188 € TTC) par participant, en session de 12 personnes au plus, au cabinet ou à distance. Pour former toute une équipe dans vos locaux, sur devis.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ============================= CTA FINAL ====================== */}
      <section className={`${styles.sec} ${styles.navy}`} aria-labelledby="h-cta">
        <div className={styles.wrap}>
          <div className={styles.ctaRow}>
            <h2 className={styles.h2} id="h-cta">Organiser une formation pour vos équipes</h2>
            <Link className={styles.btnP} href="/contact">Décrire votre besoin</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
