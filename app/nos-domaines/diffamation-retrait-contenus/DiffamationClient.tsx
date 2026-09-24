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

/* Situations (6) — la dernière (« accusé ») signale l'autre position. */
const SITUATIONS = [
  { h: "Un contenu diffamatoire vous vise", p: "Une publication, une vidéo ou un commentaire vous accuse publiquement d'un fait précis susceptible de nuire à votre réputation." },
  { h: "De faux avis dégradent votre activité", p: "Des avis trompeurs, répétés ou publiés dans le cadre d'une campagne nuisent à votre note et à la confiance de vos clients." },
  { h: "Votre entreprise ou vos produits sont dénigrés", p: "Des propos mettent en cause vos produits, vos services ou vos pratiques commerciales et portent atteinte à votre activité." },
  { h: "La plateforme refuse de retirer le contenu", p: "Votre signalement a été rejeté, est resté sans réponse ou n'a entraîné qu'un retrait partiel." },
  { h: "Vous ne connaissez pas l'auteur", p: "Le compte ne permet pas d'identifier la personne qui publie ou utilise l'identité de quelqu'un d'autre." },
  { h: "Vous êtes accusé de diffamation", p: "Vous recevez une mise en demeure, une convocation ou une assignation à propos de propos que vous avez publiés ou relayés.", accent: true },
];

/* Objectifs (6) — « Identifier l'auteur » en bleu nuit ; 2 renvois de ressource. */
const RESULTS = [
  { h: "Faire retirer un contenu", p: "Après un refus, le cabinet reprend la demande, précise son fondement juridique et agit auprès de la plateforme. Lorsque la situation l'exige, il saisit le juge afin d'obtenir une décision imposant le retrait." },
  { h: "Faire disparaître un résultat Google", p: "Le cabinet vous accompagne dans la demande adressée à Google pour faire disparaître le résultat de recherche lorsque les conditions sont réunies. Le déréférencement ne supprime pas la page publiée sur le site d'origine.", link: { href: R_DEREF, label: "Comprendre le déréférencement →" } },
  { h: "Faire supprimer de faux avis", p: "Le cabinet distingue la critique licite du faux avis, du dénigrement et de la campagne destinée à porter atteinte à l'activité, puis agit auprès du site concerné ou devant le juge.", link: { href: R_FAUX_AVIS, label: "Faux avis Google : que faire ? →" } },
  { h: "Identifier l'auteur", p: "Une mesure judiciaire permet de demander au réseau social, à l'hébergeur ou à l'opérateur concerné les données d'identification encore disponibles. Le cabinet détermine le bon destinataire et les informations à solliciter.", dark: true },
  { h: "Faire cesser une campagne", p: "Le cabinet agit sur les contenus, sur les comptes qui les publient ou les relaient et contre les personnes qui en sont responsables." },
  { h: "Agir contre le responsable", p: "Retirer un contenu auprès de la plateforme, identifier son auteur et demander réparation constituent le plus souvent des actions différentes. Elles sont engagées ensemble ou successivement selon le dossier." },
];

/* Méthode — TROIS étapes présentes dans le code (la maquette v2 en prévoit
   quatre : la 4e n'existe pas dans le contenu actuel, à trancher). Rendues
   toutes visibles dans le HTML initial, sans dépendance à une animation. */
const STEPS = [
  { n: "01", h: "Analyser les propos", p: "Le cabinet détermine si les propos relèvent de la diffamation, de l'injure, du dénigrement, de l'atteinte à la vie privée ou d'un autre fondement afin de choisir la stratégie adaptée." },
  { n: "02", h: "Préserver la preuve et identifier les acteurs", p: "Le contenu, son adresse, sa date et son contexte sont conservés. Lorsque le dossier l'exige, un constat est établi par un commissaire de justice. Le cabinet identifie ensuite l'auteur connu ou anonyme, la plateforme, le moteur de recherche ou l'hébergeur concerné." },
  { n: "03", h: "Agir", p: "Le cabinet adresse la mise en demeure ou la notification juridique à l'interlocuteur compétent. Si cette démarche ne suffit pas, il saisit le juge, notamment en urgence lorsque les conditions sont réunies, afin de demander le retrait du contenu ou les informations nécessaires à l'identification de l'auteur." },
];

/* Exemples (3) — titres explicites (§3.3), bandeau sombre + issue bleue. */
const CASES = [
  {
    pp: "Exemple 01", h: "Campagne de faux avis contre une entreprise",
    situation: "Une entreprise a découvert, en quelques jours, une série d'avis très négatifs publiés depuis plusieurs comptes. Les textes reprenaient les mêmes accusations et affectaient directement sa note ainsi que la confiance de ses clients.",
    intervention: "Le cabinet a rapproché les avis, leurs dates et leurs auteurs apparents, distingué les critiques licites des contenus susceptibles de relever du dénigrement, puis adressé une demande juridique documentée à la plateforme et aux responsables identifiables.",
    issue: "Les avis litigieux ont été retirés et la campagne a cessé.",
  },
  {
    pp: "Exemple 02", h: "Compte anonyme visant un dirigeant",
    situation: "Un compte anonyme publiait de manière répétée des accusations visant un dirigeant et son entreprise. Le profil ne permettait pas d'identifier directement son utilisateur.",
    intervention: "Le cabinet a fait préserver les publications, identifié les opérateurs susceptibles de détenir les données utiles et engagé la mesure judiciaire permettant d'obtenir les éléments encore disponibles.",
    issue: "Les données communiquées ont permis d'identifier l'auteur du compte et d'engager l'action à son encontre.",
  },
  {
    pp: "Exemple 03", h: "Publication maintenue après un premier refus",
    situation: "Une publication portant des accusations précises contre un professionnel était restée accessible après le rejet d'un premier signalement adressé à la plateforme.",
    intervention: "Le cabinet a repris les propos un à un, précisé leur qualification, identifié l'entité juridique compétente et adressé une notification documentée distincte du formulaire initial.",
    issue: "La plateforme a retiré la publication après réception de la notification juridique.",
  },
];

/* Hero — vidéo fondue en fond (mains sur smartphone, fil social). Chargée en
   différé (data-src) ; poster affiché avant lecture, sur connexion lente et si
   prefers-reduced-motion (auquel cas la vidéo ne démarre pas). Décorative
   (aria-hidden). Commande d'arrêt : icône seule, discrète (voir CSS .vid-pause). */
function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Mouvement réduit : image fixe. setState différé (hors corps synchrone de l'effet).
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
            <p className="eyebrow">Diffamation · Retrait de contenus · Paris</p>
            <h1>Avocat en diffamation à Paris et retrait de contenus en ligne</h1>
            <p className="accroche">{fr("Vous avez signalé le contenu. La plateforme a refusé. Ce refus ne ferme pas les autres voies d'action.")}</p>
            <p className="intro">{fr("Publication diffamatoire, campagne de faux avis, dénigrement ou compte anonyme : Lazarègue Avocats analyse les propos, préserve la preuve et engage l'action adaptée contre l'auteur ou auprès de la plateforme.")}</p>
            <p className="hero-actions">
              <Link className="btn btn-primary" href={CONTACT}>Faire analyser ma situation</Link>
              <a className="link-hero" href="#methode">Voir comment le cabinet intervient</a>
            </p>
            <p className="hero-local">18 rue de Tilsitt, 75017 Paris — <a href={TEL}>01 81 70 62 00</a> — intervention dans toute la France</p>
          </div>
        </section>

        {/* ===== 2. SITUATIONS (6, filets) ===== */}
        <section id="situations">
          <div className="wrap">
            <p className="eyebrow">Reconnaître sa situation</p>
            <h2>Quelle est votre situation ?</h2>
            <p className="lede">{fr("Le cabinet intervient lorsqu'un contenu porte atteinte à la réputation d'une personne, d'une entreprise, de ses dirigeants, de ses produits ou de ses services.")}</p>
            <div className="sit6">
              {SITUATIONS.map((s) => (
                <article className={s.accent ? "sit sit--accent" : "sit"} key={s.h}>
                  <h3>{fr(s.h)}</h3>
                  <p>{fr(s.p)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 3. OBJECTIFS (6) + délai « 3 mois » ===== */}
        <section className="objectives">
          <div className="wrap">
            <p className="eyebrow">Ce que vous cherchez à obtenir</p>
            <h2>Retirer le contenu, identifier l’auteur ou obtenir réparation</h2>
            <p className="lede">{fr("La voie à engager dépend des propos, du site ou du réseau concerné, de l'identité de l'auteur et du résultat recherché.")}</p>
            <div className="obj">
              {RESULTS.map((r) => (
                <article className={r.dark ? "objc objc--dark" : "objc"} key={r.h}>
                  <h3>{fr(r.h)}</h3>
                  <p>{fr(r.p)}</p>
                  {r.link ? <a className="obj-link" href={r.link.href}>{r.link.label}</a> : null}
                </article>
              ))}
            </div>
            <div className="deadline" role="note">
              <p className="deadline-n">3 mois<span>Délai à surveiller</span></p>
              <p>{fr("En matière de diffamation et d'injure, l'action — plainte ou assignation — se prescrit en principe par trois mois à compter de la première publication (article 65 de la loi du 29 juillet 1881). Ce délai court même si le contenu reste en ligne.")}</p>
            </div>
          </div>
        </section>

        {/* ===== 4. MÉTHODE (navy) ===== */}
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
          </div>
        </section>

        {/* ===== 5. APRÈS UN REFUS ===== */}
        <section className="refusal">
          <div className="wrap">
            <p className="eyebrow">Après un refus</p>
            <h2>Pourquoi la plateforme a-t-elle rejeté ma demande de retrait ?</h2>
            <div className="refusal-grid">
              <div>
                <p>{fr("Les formulaires des plateformes reposent sur des catégories générales. Ils ne permettent pas d'exposer précisément les propos, la personne ou l'activité visée et le fondement juridique de la demande.")}</p>
                <p>{fr("Le cabinet reprend le signalement, analyse les propos, identifie la personne ou le compte à viser et adresse la demande à l'interlocuteur juridique compétent du réseau social, du site ou du moteur de recherche. Si cette voie ne suffit pas, il engage la procédure adaptée devant le juge.")}</p>
              </div>
              <p className="pull">{fr("Un signalement dans un formulaire et une notification juridique ne répondent pas aux mêmes exigences.")}</p>
            </div>
          </div>
        </section>

        {/* ===== 6. EXEMPLES DE CAS (3) ===== */}
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

        {/* ===== 7. QUALIFICATION ET FONDEMENTS (navy) ===== */}
        <section className="practice on-dark">
          <div className="wrap fond">
            <div className="fond-head">
              <p className="eyebrow">Qualification et fondements</p>
              <h2>Une pratique de la diffamation, du droit de la presse et des plateformes</h2>
            </div>
            <div className="measure">
              <p>{fr("Diffamation, injure, dénigrement, faux avis, déréférencement et identification d'un auteur ne relèvent pas des mêmes règles. Le cabinet détermine la qualification applicable, la personne ou l'intermédiaire à viser et la voie d'action à engager.")}</p>
              <p>{fr("Selon la situation, l'intervention articule le droit de la presse, la responsabilité civile, la protection des données et les règles applicables aux plateformes.")}</p>
            </div>
          </div>
        </section>

        {/* ===== 8. AVOCAT ===== */}
        <section className="lawyer">
          <div className="wrap lawyer-grid">
            <div className="portrait">
              <Image
                src="/images/alexandre-pro.jpg"
                alt="Alexandre Lazarègue, avocat au Barreau de Paris"
                fill
                sizes="(max-width: 759px) 100vw, 260px"
                loading="lazy"
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
            <div>
              <p className="eyebrow">Votre interlocuteur</p>
              <h2>Qui traite votre dossier ?</h2>
              <p className="who-name">Me Alexandre Lazarègue</p>
              <p className="role">Avocat au Barreau de Paris</p>
              <p className="measure">{fr("Alexandre Lazarègue intervient en droit du numérique dans les litiges liés aux contenus en ligne, aux plateformes, au déréférencement et à l'identification de leurs auteurs.")}</p>
              <p className="lawyer-links">
                <Link className="btn btn-ghost" href={CONTACT}>Faire analyser ma situation</Link>
                <Link className="link-inline" href="/le-cabinet">Voir son parcours</Link>
              </p>
            </div>
          </div>
        </section>

        {/* ===== 9. FAQ (accordéon, 1re ouverte, toutes présentes) ===== */}
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

        {/* ===== 10. APPEL FINAL (bleu électrique) ===== */}
        <section className="final" id="appel-final">
          <div className="wrap">
            <p className="eyebrow">Prendre contact</p>
            <h2>Le contenu est toujours en ligne ?</h2>
            <p>{fr("Transmettez au cabinet l'adresse du contenu, sa date de publication, les captures disponibles et la réponse éventuelle de la plateforme. Le cabinet examinera les voies d'action adaptées à votre situation.")}</p>
            <p><Link className="btn btn-white" href={CONTACT}>Faire analyser ma situation</Link></p>
            <p className="coords">Lazarègue Avocats — 18 rue de Tilsitt, 75017 Paris — <a href={TEL}>01 81 70 62 00</a> — <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a></p>
          </div>
        </section>
      </main>
    </div>
  );
}
