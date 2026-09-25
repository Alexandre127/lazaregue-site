"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fr } from "@/lib/typo";
import styles from "./diffamation.module.css";
import { FAQ_ITEMS } from "./faq";

const CONTACT = "/contact";
const TEL = "tel:+33181706200";

/* Liens de ressources — routes RÉELLES à créer (pages inexistantes au 21.09.2026).
   Cible provisoire : l'index /ressources (200). À remplacer dès publication. */
const R_DEREF = "/ressources";
const R_FAUX_AVIS = "/ressources";

/* Situations (6) fusionnées : « situation → ce que le cabinet peut obtenir ».
   La dernière (« accusé ») signale l'autre position. */
const SITUATIONS = [
  { h: "Un contenu diffamatoire vous vise", p: "Une publication, une vidéo ou un commentaire vous accuse publiquement d'un fait précis.", obtenir: "Le retrait du contenu, et une réparation lorsque l'auteur est identifié." },
  { h: "Des faux avis dégradent votre activité", p: "Des avis trompeurs ou répétés font baisser votre note et la confiance de vos clients.", obtenir: "La suppression des faux avis, en les distinguant des critiques légitimes, et la fin de la campagne." },
  { h: "Votre entreprise ou vos produits sont dénigrés", p: "Des propos mettent en cause vos produits, vos services ou vos pratiques commerciales.", obtenir: "L'arrêt du dénigrement et la réparation du préjudice commercial." },
  { h: "La plateforme refuse de retirer le contenu", p: "Votre signalement a été rejeté, est resté sans réponse ou n'a entraîné qu'un retrait partiel.", obtenir: "Une nouvelle demande, fondée juridiquement, puis le juge si nécessaire." },
  { h: "Vous ne connaissez pas l'auteur", p: "Le compte est anonyme ou usurpe l'identité de quelqu'un d'autre.", obtenir: "Une décision du juge obligeant la plateforme ou l'hébergeur à communiquer les données encore disponibles." },
  { h: "Vous êtes accusé de diffamation", p: "Mise en demeure, convocation ou assignation à propos de propos que vous avez publiés ou relayés.", obtenir: "Votre défense : vérité des faits, bonne foi, prescription.", accent: true },
];

/* Méthode — trois étapes raccourcies (fusion avec « Après un refus »). */
const STEPS = [
  { n: "01", h: "Analyser les propos", p: "Diffamation, injure, dénigrement, atteinte à la vie privée : la qualification détermine la voie et le délai." },
  { n: "02", h: "Conserver la preuve", p: "Le contenu, son adresse et sa date sont figés, par constat de commissaire de justice si nécessaire, avant qu'il ne disparaisse." },
  { n: "03", h: "Agir", p: "Une notification juridique adressée au bon interlocuteur de la plateforme, puis, si elle ne suffit pas, le juge, y compris en urgence." },
];

/* Exemples (3) — contenu et rubrique « Issue » conservés. */
const CASES = [
  {
    pp: "Exemple 01", h: "Campagne de faux avis contre une entreprise",
    situation: "Une entreprise a découvert, en quelques jours, une série d'avis très négatifs publiés depuis plusieurs comptes. Les textes reprenaient les mêmes accusations et affectaient directement sa note ainsi que la confiance de ses clients.",
    intervention: "Le cabinet a rapproché les avis, leurs dates et leurs auteurs apparents, et distingué les critiques licites du dénigrement. Une demande juridique documentée a été adressée à la plateforme et aux responsables identifiables.",
    issue: "Les avis litigieux ont été retirés et la campagne a cessé.",
  },
  {
    pp: "Exemple 02", h: "Compte anonyme visant un dirigeant",
    situation: "Un compte anonyme publiait de manière répétée des accusations visant un dirigeant et son entreprise. Le profil ne permettait pas d'identifier directement son utilisateur.",
    intervention: "Le cabinet a fait préserver les publications et identifié les opérateurs susceptibles de détenir les données utiles. Il a engagé la mesure judiciaire permettant d'obtenir les éléments encore disponibles.",
    issue: "Les données communiquées ont permis d'identifier l'auteur du compte et d'engager l'action à son encontre.",
  },
  {
    pp: "Exemple 03", h: "Publication maintenue après un premier refus",
    situation: "Une publication portant des accusations précises contre un professionnel était restée accessible après le rejet d'un premier signalement adressé à la plateforme.",
    intervention: "Le cabinet a repris les propos un à un et précisé leur qualification. Une notification documentée, distincte du formulaire initial, a été adressée à l'entité juridique compétente.",
    issue: "La plateforme a retiré la publication après réception de la notification juridique.",
  },
];

/* Hero — vidéo fondue en fond. Chargée en différé (data-src) ; poster affiché
   avant lecture et si prefers-reduced-motion. Décorative (aria-hidden). */
function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) { queueMicrotask(() => setPaused(true)); return; }
    const sources = video.querySelectorAll<HTMLSourceElement>("source[data-src]");
    sources.forEach((s) => { s.src = s.getAttribute("data-src") || ""; });
    video.load();
    video.play().catch(() => { /* pas de fichier : le dégradé reste */ });
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    setPaused((p) => {
      const next = !p;
      if (video) {
        if (next) video.pause();
        else video.play().catch(() => {});
      }
      return next;
    });
  };

  return (
    <div className="vid-bg" aria-hidden="true">
      <video ref={videoRef} muted playsInline loop preload="metadata" tabIndex={-1} poster="/assets/video/diffamation-poster.webp">
        <source data-src="/assets/video/diffamation-hero.webm" type="video/webm" />
        <source data-src="/assets/video/diffamation-hero.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        className="vid-pause"
        aria-pressed={paused}
        aria-label={paused ? "Reprendre la vidéo" : "Mettre la vidéo en pause"}
        onClick={toggle}
      >
        <span className="vid-pause-icon" aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}

export default function DiffamationClient() {
  return (
    <div className={styles.diff}>
      <nav className="crumb" aria-label="Fil d’Ariane">
        <div className="wrap">
          <ol>
            <li><Link href="/">Accueil</Link></li>
            <li aria-hidden="true" className="sep">›</li>
            <li><Link href="/nos-domaines">Domaines</Link></li>
            <li aria-hidden="true" className="sep">›</li>
            <li aria-current="page">Diffamation et retrait de contenus</li>
          </ol>
        </div>
      </nav>

      <main id="contenu">
        {/* ===== 1. HERO (vidéo fondue en fond) ===== */}
        <section className="hero-d on-dark">
          <HeroMedia />
          <div className="wrap">
            <p className="eyebrow">Diffamation · Retrait de contenus · Toute la France</p>
            <h1>Avocat en diffamation à Paris et retrait de contenus en ligne</h1>
            <p className="accroche">{fr("Vous avez signalé le contenu. La plateforme a refusé. Ce refus ne ferme pas les autres voies d'action.")}</p>
            <p className="intro">{fr("Publication diffamatoire, campagne de faux avis, dénigrement ou compte anonyme : le cabinet analyse les propos, conserve la preuve et agit auprès de la plateforme ou contre l'auteur.")}</p>
            <p className="hero-actions">
              <Link className="btn btn-primary" href={CONTACT}>Faire analyser ma situation</Link>
              <a className="link-hero" href="#methode">Voir comment le cabinet intervient</a>
            </p>
            <p className="hero-local">18 rue de Tilsitt, 75017 Paris — <a href={TEL}>01 81 70 62 00</a> — intervention dans toute la France</p>
          </div>
        </section>

        {/* ===== 2. ENCART « 3 MOIS » (remonté juste après le hero) ===== */}
        {/* TODO — liste exacte des motifs de l'art. 65-3 à vérifier par le cabinet
            avant mise en ligne. */}
        <section className="delai-wrap" aria-label="Délai pour agir">
          <div className="wrap">
            <div className="delai" role="note">
              <p className="delai-n">3 mois<span>Délai à surveiller</span></p>
              <p>{fr("Pour agir. En diffamation et en injure, la plainte ou l'assignation doit en principe intervenir dans les trois mois de la première publication, même si le contenu reste en ligne (art. 65 de la loi du 29 juillet 1881). Le délai est d'un an pour les propos visant l'origine, la religion, le sexe, l'orientation sexuelle, l'identité de genre ou le handicap (art. 65-3).")}</p>
            </div>
          </div>
        </section>

        {/* ===== 3. SITUATIONS (6) → ce que le cabinet peut obtenir ===== */}
        <section id="situations">
          <div className="wrap">
            <p className="eyebrow">Reconnaître sa situation</p>
            <h2>Quelle est votre situation&nbsp;?</h2>
            <p className="lede">{fr("Pour chaque situation, ce que le cabinet peut obtenir.")}</p>
            <div className="scards">
              {SITUATIONS.map((s) => (
                <article className={s.accent ? "scard scard--accent" : "scard"} key={s.h}>
                  <h3>{fr(s.h)}</h3>
                  <p>{fr(s.p)}</p>
                  <div className="obtenir">
                    <span className="obtenir-k">Ce que le cabinet peut obtenir</span>
                    <p>{fr(s.obtenir)}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="sit-links">
              <a className="obj-link" href={R_DEREF}>Comprendre le déréférencement →</a>
              <a className="obj-link" href={R_FAUX_AVIS}>Faux avis Google&nbsp;: que faire&nbsp;? →</a>
            </p>
          </div>
        </section>

        {/* ===== 4. MÉTHODE (navy) + exergue ===== */}
        <section className="method on-dark" id="methode">
          <div className="wrap">
            <p className="eyebrow">Méthode</p>
            <h2>Comment le cabinet intervient</h2>
            <ol className="steps4">
              {STEPS.map((s) => (
                <li className="step4" key={s.n}>
                  <span className="k">{s.n}</span>
                  <h3>{fr(s.h)}</h3>
                  <p>{fr(s.p)}</p>
                </li>
              ))}
            </ol>
            <p className="method-pull">{fr("Un signalement par formulaire et une notification juridique ne répondent pas aux mêmes exigences. C'est souvent pour cela que la première demande a été rejetée.")}</p>
          </div>
        </section>

        {/* ===== 5. EXEMPLES DE CAS (3) — remontés juste après la méthode ===== */}
        <section className="cases">
          <div className="wrap">
            <p className="eyebrow">Exemples de cas</p>
            <h2>Trois exemples parmi les dossiers du cabinet</h2>
            <div className="case-grid">
              {CASES.map((c) => (
                <article className="dcard" key={c.h}>
                  <div className="dcard-top">
                    <p className="pp">{c.pp}</p>
                    <p className="ct">{fr(c.h)}</p>
                  </div>
                  <dl>
                    <div><dt>Situation</dt><dd>{fr(c.situation)}</dd></div>
                    <div><dt>Intervention</dt><dd>{fr(c.intervention)}</dd></div>
                  </dl>
                  <div className="res"><b>Issue</b><p>{fr(c.issue)}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 6. AVOCAT ===== */}
        <section className="lawyer">
          <div className="wrap lawyer-grid">
            <div className="portrait">
              <Image
                src="/images/alexandre-pro.jpg"
                alt="Portrait d’Alexandre Lazarègue, avocat au barreau de Paris"
                fill
                sizes="(max-width: 760px) 260px, 260px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p className="eyebrow">Votre interlocuteur</p>
              <h2>Qui traite votre dossier&nbsp;?</h2>
              <p className="who-name">Me Alexandre Lazarègue</p>
              <p className="role">Avocat au barreau de Paris</p>
              <p className="measure">{fr("Alexandre Lazarègue intervient en droit du numérique dans les litiges liés aux contenus en ligne, aux plateformes, au déréférencement et à l'identification de leurs auteurs.")}</p>
              <p className="lawyer-links">
                <Link className="btn btn-ghost" href={CONTACT}>Faire analyser ma situation</Link>
                <Link className="link-inline" href="/le-cabinet">Voir son parcours</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ===== 7. FAQ (accordéon, 1re ouverte, toutes présentes) ===== */}
        <section className="faq">
          <div className="wrap faq-grid">
            <div className="faq-head">
              <p className="eyebrow">Questions pratiques</p>
              <h2>Vos questions sur la diffamation et le retrait de contenus</h2>
            </div>
            <div className="qa-list">
              {FAQ_ITEMS.map((item, i) => (
                <details className="qa" key={item.q} open={i === 0}>
                  <summary><span>{fr(item.q)}</span></summary>
                  <p>{fr(item.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 8. APPEL FINAL (bleu électrique) ===== */}
        <section className="final" id="appel-final">
          <div className="wrap">
            <p className="eyebrow">Prendre contact</p>
            <h2>Le contenu est toujours en ligne&nbsp;?</h2>
            <p>{fr("Transmettez au cabinet l'adresse du contenu, sa date de publication, les captures disponibles et la réponse éventuelle de la plateforme. Le cabinet examinera les voies d'action adaptées à votre situation.")}</p>
            <p><Link className="btn btn-white" href={CONTACT}>Faire analyser ma situation</Link></p>
            <p className="coords">Lazarègue Avocats — 18 rue de Tilsitt, 75017 Paris — <a href={TEL}>01&nbsp;81&nbsp;70&nbsp;62&nbsp;00</a> — <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
