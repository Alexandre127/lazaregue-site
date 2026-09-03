import type { Metadata } from "next";
import styles from "./contact.module.css";
import ContactForm from "./_components/ContactForm";
import Faq from "./_components/Faq";
import HeroVideo from "./_components/HeroVideo";
import { AVIS, CHIFFRES, GARANTIES, TEMOIGNAGES } from "./data/reassurance";

const TITLE = "Avocat droit du numérique Paris | Contact | Lazarègue Avocats";
const DESCRIPTION =
  "Cabinet d'avocats spécialisé en droit du numérique à Paris 17e. Litige numérique, conformité RGPD, fraude informatique. Réponse sous 24 h. PME et ETI.";

const MAPS =
  "https://maps.google.com/?q=18+rue+de+Tilsitt+75017+Paris";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    siteName: "Lazarègue Avocats",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/**
 * Données structurées LegalService.
 *
 * `aggregateRating` reprend la note réelle de la fiche Google du cabinet
 * (5,0 sur 17 avis, relevé du 21 juillet 2026). Google affiche ces valeurs
 * en étoiles dans les résultats : elles doivent rester exactes et être
 * réactualisées quand le nombre d'avis évolue — voir data/reassurance.ts.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Lazarègue Avocats",
  description:
    "Cabinet d'avocats spécialisé en droit du numérique pour PME et ETI. Litige numérique, conformité RGPD, fraude informatique.",
  url: "https://lazaregue-avocats.fr/contact",
  telephone: "+33181706200",
  email: "contact@lazaregue-avocats.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 rue de Tilsitt",
    addressLocality: "Paris",
    postalCode: "75017",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "48.8738",
    longitude: "2.2950",
  },
  openingHours: "Mo-Fr 09:00-19:00",
  priceRange: "€€",
  areaServed: { "@type": "City", name: "Paris" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: AVIS.noteNum,
    reviewCount: String(AVIS.nombre),
    bestRating: "5",
  },
};

const CANAUX = [
  {
    k: "Écrire",
    v: "contact@lazaregue-avocats.fr",
    s: "Réponse sous 24 h ouvrées",
    href: "mailto:contact@lazaregue-avocats.fr",
  },
  {
    k: "Appeler",
    v: "01 81 70 62 00",
    s: "Lun. – ven. · 9 h – 19 h",
    href: "tel:+33181706200",
  },
  {
    k: "Rencontrer",
    v: "18 rue de Tilsitt, Paris 17ᵉ",
    s: "Charles-de-Gaulle — Étoile · sur rendez-vous",
    href: MAPS,
    externe: true,
  },
];

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* Hero vidéo */}
      <header className={styles.heroV}>
        <HeroVideo />
        <div className={styles.heroVeil} aria-hidden />
        <div className={styles.heroInner}>
          <div className={styles.heroK}>
            Contact · Paris 17<sup>e</sup>
          </div>
          <h1>
            QUAND TOUT S&apos;ACCÉLÈRE,
            <br />
            LE DROIT DOIT RESTER <span>LISIBLE.</span>
          </h1>
          <p className={styles.slogan}>
            <b>Dirigeants, directions juridiques et financières</b> : échangez avec un
            avocat dédié aux enjeux numériques de l&apos;entreprise.
          </p>
          {/* Ligne de preuve — faits vérifiables uniquement (cabinet fondé en
              2016, exercice exclusif du droit du numérique). Aucun chiffre
              de dossiers tant qu'il n'a pas été confirmé. */}
          <div className={styles.heroProof}>
            <span>Exclusivement droit du numérique</span>
            <span>Depuis 2016</span>
            <span>Barreau de Paris</span>
          </div>
          <div className={styles.heroCta}>
            <a href="#ecrire" className={styles.btnP}>
              Décrire ma situation
            </a>
            <a href="mailto:contact@lazaregue-avocats.fr" className={styles.btnS}>
              Écrire au cabinet
            </a>
          </div>
          <div className={styles.heroFoot}>
            18 rue de Tilsitt, 75017 Paris · 01 81 70 62 00
          </div>
        </div>
        <div className={styles.scrollH} aria-hidden>
          Faire défiler ↓
        </div>
      </header>

      {/* Bandeau de confiance */}
      <section className={styles.confiance} aria-label="Le cabinet en chiffres">
        <div className={styles.confianceGrille}>
          {CHIFFRES.map((c) => (
            <div key={c.legende} className={styles.chiffre}>
              <div className={styles.v}>{c.valeur}</div>
              <div className={styles.l}>{c.legende}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pivot */}
      <div className={styles.pivot}>
        <div className={styles.pivotIn}>
          <p>Vous avez besoin d&apos;une réponse, pas d&apos;un parcours compliqué.</p>
          <span>Choisissez le canal qui vous convient.</span>
        </div>
      </div>

      <div className={styles.wrap}>
        {/* Coordonnées directes */}
        <section className={styles.direct}>
          <div className={styles.folio}>Le canal de votre choix</div>
          <p className={styles.secRole}>
            Écrivez, appelez ou passez — au rythme de votre dossier, pas du nôtre.
          </p>
          {CANAUX.map((c) => (
            <a
              key={c.k}
              className={styles.dRow}
              href={c.href}
              {...(c.externe ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span className={styles.k}>{c.k}</span>
              <span className={styles.v}>{c.v}</span>
              <span className={styles.s}>{c.s}</span>
              <span className={styles.arrow} aria-hidden>
                →
              </span>
            </a>
          ))}
        </section>

        {/* Formulaire */}
        <section className={styles.ecrire} id="ecrire">
          <div className={styles.eGrid}>
            <div className={styles.eLeft}>
              <div className={styles.folio}>Par écrit</div>
              <h2>Exposez votre situation en quelques champs.</h2>
              <p className={styles.xc}>
                Dirigeant confronté à un litige numérique, responsable juridique en
                quête d&apos;un avis, DAF face à une fraude : décrivez votre situation
                avec vos mots.
              </p>
              <p className={styles.delai}>
                Réponse sous 24 h ouvrées — votre message est lu par un avocat du
                cabinet.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* Vous préférez nous rencontrer ? */}
        <section className={styles.rencontre}>
          <div className={styles.folio}>Vous préférez nous rencontrer ?</div>
          <div className={styles.rencontreGrid}>
            <div>
              <h2>Nous vous accueillons au cabinet, sur rendez-vous.</h2>
              <p className={styles.rencontreTexte}>
                À deux pas de la place Charles-de-Gaulle — Étoile. Un premier
                rendez-vous permet souvent de qualifier une situation plus vite
                qu&apos;un échange écrit.
              </p>
              <p className={styles.adresse}>
                <strong>Lazarègue Avocats</strong>
                <br />
                18 rue de Tilsitt — Paris 17<sup>e</sup>
                <br />
                <em>À 2 minutes du métro Charles-de-Gaulle — Étoile</em>
              </p>
              <a
                className={styles.rencontreBtn}
                href={MAPS}
                target="_blank"
                rel="noopener"
              >
                Voir le plan →
              </a>
            </div>

            {/* PLACEHOLDER — en attente d'une photographie authentique des
                locaux ou de l'équipe. Ne pas remplacer par une image générée :
                ce bloc sert précisément à prouver que le cabinet est réel. */}
            <div className={styles.photoAttente}>
              <p>
                Photographie du cabinet
                <br />à insérer
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Témoignages — avis Google publics, cités fidèlement */}
      <section className={styles.temoignages} aria-labelledby="avis-titre">
        <div className={styles.wrap}>
          <div className={styles.folio}>Ils nous ont fait confiance</div>
          <div className={styles.avisEntete}>
            <h2 id="avis-titre" className={styles.avisTitre}>
              {AVIS.note} sur 5
            </h2>
            <div className={styles.etoiles} aria-hidden>
              ★★★★★
            </div>
            <a
              className={styles.avisSource}
              href={AVIS.href}
              target="_blank"
              rel="noopener"
            >
              {AVIS.source} · {AVIS.nombre} avis →
            </a>
          </div>

          <div className={styles.avisGrille}>
            {TEMOIGNAGES.map((t) => (
              <figure key={t.auteur} className={styles.avis}>
                <div className={styles.etoilesPetites} aria-label="5 étoiles sur 5">
                  ★★★★★
                </div>
                <blockquote>{t.texte}</blockquote>
                <figcaption>
                  <span className={styles.avisInitiales} aria-hidden>
                    {t.auteur
                      .split(" ")
                      .map((m) => m[0])
                      .join("")}
                  </span>
                  <span className={styles.avisAuteur}>{t.auteur}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className={styles.garanties} aria-label="Nos engagements">
        <div className={styles.garantiesInner}>
          <div className={styles.garantiesK}>Nos engagements</div>
          <ul className={styles.garantiesListe}>
            {GARANTIES.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions fréquentes */}
      <Faq />

      {/* Accès */}
      <section className={styles.acces}>
        <div className={styles.accesIn}>
          <div>
            <div className={styles.aK}>Le cabinet</div>
            <h2>LAZARÈGUE AVOCATS</h2>
            <p className={styles.aX}>
              Cabinet dédié au droit du numérique — conseil et contentieux.
            </p>
            <p className={styles.aC}>
              18 rue de Tilsitt, 75017 Paris
              <br />
              01 81 70 62 00
              <br />
              contact@lazaregue-avocats.fr
            </p>
          </div>
          <div>
            <div className={styles.aK}>Accès</div>
            <p className={styles.aC}>
              Charles-de-Gaulle — Étoile
              <br />
              Métro lignes 1, 2 et 6 · RER A
              <br />
              Lun. – ven., 9 h – 19 h · sur rendez-vous
            </p>
            <a className={styles.aBtn} href={MAPS} target="_blank" rel="noopener">
              Voir l&apos;itinéraire →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
