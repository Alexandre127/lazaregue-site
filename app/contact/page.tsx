import type { Metadata } from "next";
import Image from "next/image";
import { fr } from "@/lib/typo";
import styles from "./contact.module.css";
import ContactForm from "./_components/ContactForm";
import Faq from "./_components/Faq";
import HeroVideo from "./_components/HeroVideo";

const TEL = "tel:+33181706200";
const MAPS = "https://maps.google.com/?q=18+rue+de+Tilsitt+75017+Paris";
/* Espace client : le portail n'a pas encore d'URL publique (site non mis en
   ligne). Bouton présent mais inactif, à câbler dès que l'URL existera. */
const ESPACE_CLIENT_URL = "#";

const TITLE = "Avocat droit du numérique Paris | Contact | Lazarègue Avocats";
const DESCRIPTION =
  "Cabinet d'avocats spécialisé en droit du numérique à Paris 17e. Litige numérique, conformité RGPD, fraude informatique. Réponse sous 24 h. PME et ETI.";

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
  geo: { "@type": "GeoCoordinates", latitude: "48.8738", longitude: "2.2950" },
  openingHours: "Mo-Fr 09:00-19:00",
  priceRange: "€€",
  areaServed: { "@type": "Country", name: "France" },
};

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ===================== 1. HERO (vidéo conservée) ===================== */}
      <header className={styles.heroV} aria-labelledby="titre-contact">
        <HeroVideo />
        <div className={styles.heroVeil} aria-hidden />
        <div className={styles.heroInner}>
          <p className={styles.heroK}>Contact · Paris 17ᵉ · toute la France</p>
          <h1 id="titre-contact">
            QUAND TOUT S&apos;ACCÉLÈRE,
            <br />
            LE DROIT DOIT RESTER <span>LISIBLE.</span>
          </h1>
          <p className={styles.heroWhat}>Contacter un avocat en droit du numérique</p>
          <p className={styles.heroWho}>
            {fr("Dirigeants, directions juridiques et financières : échangez avec un avocat dédié aux enjeux numériques de l'entreprise.")}
          </p>
          <p className={styles.heroFacts}>Depuis 2016 · Barreaux de Paris, Évry et Montréal · Intervention partout en France</p>
          <div className={styles.heroCta}>
            <a href="#formulaire" className={styles.btnP}>
              Décrire ma situation →
            </a>
            <a href={TEL} className={styles.btnS}>
              Appeler — 01 81 70 62 00
            </a>
          </div>
        </div>
      </header>

      {/* ===================== 2 + 3. URGENCE & FORMULAIRE =================== */}
      <section className={styles.formSec} id="formulaire" aria-labelledby="h-form">
        <div className={styles.wrap}>
          <div className={styles.urgent} role="note">
            <span aria-hidden className={styles.urgentIcon}>◷</span>
            <p>
              <b>Une échéance ou un incident est en cours ?</b>
              {fr("Indiquez-le dans le formulaire et précisez la date de la prochaine échéance connue. Vous pouvez également appeler le cabinet au ")}
              <a href={TEL}>01 81 70 62 00</a>.
            </p>
          </div>

          <div className={styles.cgrid}>
            <div className={styles.cLeft}>
              <p className={styles.folio}>Par écrit ou par téléphone</p>
              <h2 className={styles.cTitle}>Exposez votre situation en quelques champs.</h2>
              <p className={styles.cLead}>
                {fr("Dirigeant confronté à un litige numérique, responsable juridique en quête d'un avis, DAF face à une fraude : décrivez votre situation avec vos mots. Le cabinet examinera votre demande afin de vous indiquer les premières modalités d'intervention.")}
              </p>
              <div className={styles.chan}>
                <div>
                  <span className={styles.chanK}>Téléphone</span>
                  <a href={TEL}>01 81 70 62 00</a>
                  <small>Lundi – vendredi · 9 h – 19 h</small>
                </div>
                <div>
                  <span className={styles.chanK}>E-mail</span>
                  <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
                </div>
                <div>
                  <span className={styles.chanK}>Cabinet</span>
                  <strong>18 rue de Tilsitt, 75017 Paris</strong>
                  <small>
                    Sur rendez-vous · <a href="#venir">accès</a>
                  </small>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* ===================== 4. ESPACE CLIENT ===================== */}
      <section className={styles.client} aria-label="Espace client">
        <div className={styles.clientIn}>
          <div>
            <p className={styles.clientTitle}>Vous êtes déjà client du cabinet ?</p>
            <p className={styles.clientTx}>
              Accédez à votre espace sécurisé pour consulter votre dossier et transmettre des documents.
            </p>
          </div>
          <a className={styles.btnO} href={ESPACE_CLIENT_URL}>
            Accéder à l&apos;espace client
          </a>
        </div>
      </section>

      {/* ===================== 5. VENIR AU CABINET ===================== */}
      <section id="venir" className={styles.visitSec} aria-labelledby="h-venir">
        <div className={styles.wrap}>
          <div className={styles.visit}>
            <div>
              <p className={styles.folio}>Vous préférez nous rencontrer ?</p>
              <h2 className={styles.cTitle} id="h-venir">Nous vous accueillons au cabinet, sur rendez-vous.</h2>
              <p className={styles.cLead}>
                {fr("À deux pas de la place Charles-de-Gaulle — Étoile. Un premier rendez-vous permet souvent de qualifier une situation plus vite qu'un échange écrit.")}
              </p>
              <p className={styles.adresse}>
                <strong>Lazarègue Avocats</strong>
                <br />
                18 rue de Tilsitt, 75017 Paris
              </p>
              <p className={styles.acces}>
                Métro Charles-de-Gaulle — Étoile · lignes 1, 2 et 6 · RER A
                <br />
                Lundi – vendredi, 9 h – 19 h, sur rendez-vous
              </p>
              <div className={styles.visitLinks}>
                <a href={MAPS} target="_blank" rel="noopener">Ouvrir l&apos;itinéraire ↗</a>
                <a href={TEL}>Appeler le cabinet →</a>
              </div>
            </div>
            <div className={styles.visitPhoto}>
              <Image
                src="/images/cabinet-interieur.jpg"
                alt="L'intérieur du cabinet, rue de Tilsitt"
                fill
                sizes="(max-width: 1100px) 100vw, 42vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 6. FAQ ===================== */}
      <Faq />
    </main>
  );
}
