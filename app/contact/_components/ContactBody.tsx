"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "../contact.module.css";
import ContactForm from "./ContactForm";
import Faq from "./Faq";
import HeroVideo from "./HeroVideo";

const TEL = "tel:+33181706200";
const MAPS = "https://maps.google.com/?q=18+rue+de+Tilsitt+75017+Paris";

/**
 * Corps de la page contact (client). Gère la bascule vers l'écran de
 * confirmation (« Votre demande est transmise ») après un envoi réussi :
 * le hero, le formulaire, les coordonnées et la FAQ laissent alors place à
 * l'écran de confirmation seul, entre l'en-tête et le pied de page globaux.
 * Hero avec vidéo de fond (Arc de Triomphe) sur desktop et tablette ;
 * fond navy uni en mobile (≤ 767 px, inchangé).
 */
export default function ContactBody() {
  const [sent, setSent] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  if (sent) {
    return (
      <div className={styles.confirm} ref={doneRef} role="status" tabIndex={-1}>
        <div className={styles.wrap}>
          <span className={styles.confirmIcon} aria-hidden>
            ✓
          </span>
          <h1 className={styles.confirmTitle}>Votre demande est transmise</h1>
          <p className={styles.confirmLead}>
            {fr("Un avocat du cabinet l'examine et revient vers vous par e-mail ou par téléphone pour convenir d'un premier échange.")}
          </p>
          <ol className={styles.confirmSteps}>
            <li>
              <span className={styles.confirmNum}>1</span>
              <p>{fr("Le cabinet vérifie qu'il peut intervenir, notamment l'absence de conflit d'intérêts.")}</p>
            </li>
            <li>
              <span className={styles.confirmNum}>2</span>
              <p>{fr("Il vous indique les premiers documents utiles et, si besoin, un canal sécurisé pour les transmettre.")}</p>
            </li>
            <li>
              <span className={styles.confirmNum}>3</span>
              <p>{fr("Si une mission est nécessaire, une convention d'honoraires vous est remise avant toute intervention.")}</p>
            </li>
          </ol>
          <div className={styles.confirmUrg}>
            <p>{fr("Une échéance très proche ou un incident en cours ?")}</p>
            <a href={TEL} className={styles.confirmTel}>
              Appeler — 01 81 70 62 00
            </a>
          </div>
          <Link href="/" className={styles.confirmBack}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===================== 1. HERO (vidéo desktop/tablette, navy mobile) === */}
      <header className={styles.hero} aria-labelledby="titre-contact">
        <HeroVideo />
        <div className={styles.heroVeil} aria-hidden />
        <div className={styles.heroInner}>
          <p className={styles.heroK}>Contact · Paris 17ᵉ · toute la France</p>
          <h1 id="titre-contact">
            QUAND TOUT S&apos;ACCÉLÈRE,
            <br />
            LE DROIT DOIT RESTER <span>LISIBLE.</span>
          </h1>
          <p className={styles.heroWho}>
            {fr("Dirigeants, directions juridiques et financières : un avocat en droit du numérique examine votre situation.")}
          </p>
          <div className={styles.heroCta}>
            <a href="#formulaire" className={styles.btnP}>
              Décrire ma situation →
            </a>
            <a href={TEL} className={styles.btnS}>
              Appeler — 01 81 70 62 00
            </a>
          </div>
          <p className={styles.heroHours}>Lundi – vendredi · 9 h – 19 h</p>
        </div>
      </header>

      {/* ===================== 2. FORMULAIRE ================================ */}
      <section className={styles.formSec} id="formulaire" aria-labelledby="h-form">
        <div className={styles.wrap}>
          <ContactForm onSent={() => setSent(true)} />
        </div>
      </section>

      {/* ===================== 3. COORDONNÉES (bloc fusionné) =============== */}
      <section id="venir" className={styles.visitSec} aria-labelledby="h-venir">
        <div className={styles.wrap}>
          <div className={styles.visit}>
            <div>
              <p className={styles.folio}>Le cabinet</p>
              <h2 className={styles.cTitle} id="h-venir">
                Sur rendez-vous, à deux pas de l&apos;Étoile
              </h2>
              <dl className={styles.coord}>
                <div>
                  <dt>Téléphone</dt>
                  <dd>
                    <a href={TEL}>01 81 70 62 00</a>
                    <small>Lundi – vendredi · 9 h – 19 h</small>
                  </dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>
                    <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
                  </dd>
                </div>
                <div>
                  <dt>Adresse</dt>
                  <dd>
                    <strong>18 rue de Tilsitt, 75017 Paris</strong>
                    <small>Métro Charles-de-Gaulle — Étoile · lignes 1, 2 et 6 · RER A</small>
                  </dd>
                </div>
              </dl>
              <p className={styles.coordLink}>
                <a href={MAPS} target="_blank" rel="noopener">
                  Ouvrir l&apos;itinéraire →
                </a>
              </p>
            </div>
            <div className={styles.visitPhoto}>
              <Image
                src="/images/cabinet-interieur.jpg"
                alt="L'accueil du cabinet, rue de Tilsitt"
                fill
                sizes="(max-width: 1100px) 100vw, 42vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 4. FAQ ======================================= */}
      <Faq />
    </>
  );
}
