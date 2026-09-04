"use client";

import Link from "next/link";
import { FAQ_ITEMS } from "./faq";
import EquipeDossier from "@/components/equipe-dossier";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const RED = "#E24B4A";

const DARK = {
  bg: "#0a0f2e",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.65)",
  border: "rgba(255,255,255,0.2)",
};

const LIGHT = {
  bg: "#f8f8f6",
  panel: "#ffffff",
  panel2: "#f1f1ee",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
};

const INNER: CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 48px" };
const SECTION_PAD = "32px 0";
const CARD_PAD = "14px 16px";
const GRID_GAP = 10;

const TYPE = {
  h2: { fontSize: 24, fontWeight: 500, lineHeight: 1.3 } as const,
  h3: { fontSize: 18, fontWeight: 500, lineHeight: 1.35 } as const,
};

/* Dossiers publiés — décision du cabinet. */
const DOSSIERS_ENABLED = true;

/* §4 — deux indicateurs conservés sur cinq (graphique et paragraphe retirés). */
const METRICS: { repere: string; chiffre: string; libelle: string }[] = [
  {
    repere: "Menace n° 1",
    chiffre: "1 / 3",
    libelle: "des assistances entreprises : piratage de compte, souvent par un salarié ou un ancien salarié",
  },
  {
    repere: "+196 %",
    chiffre: "13 000",
    libelle: "assistances pour fraude au virement en un an",
  },
];

/* §5 — trois temps (remplace la chronologie H+0 → H+72). */
const TROIS_TEMPS: {
  n: number;
  titre: string;
  corps: string;
  mono?: string;
  lien?: { href: string; label: string };
}[] = [
  {
    n: 1,
    titre: "Préserver la preuve",
    corps:
      "Isoler sans éteindre : les traces vivent en mémoire vive et un arrêt les efface. Journaux d'intervention, accès distants, courriels de rançon, horodatages — tout est une pièce, et sa valeur probatoire dépend de la façon dont elle a été recueillie.",
    mono: "SAUF CONSIGNE CONTRAIRE DE L'ÉQUIPE TECHNIQUE",
  },
  {
    n: 2,
    titre: "Qualifier pénalement",
    corps:
      "Intrusion, maintien frauduleux, entrave au fonctionnement, extorsion, escroquerie, atteinte aux données : la qualification commande le service d'enquête saisi, les actes possibles et ce qui peut être réclamé. Elle se discute, elle ne se subit pas.",
    mono: "ART. 323-1 À 323-3 · 312-1 · 313-1 · 226-17 C. PÉN.",
    lien: { href: "/nos-domaines/contrats-informatiques", label: "Si le prestataire est en cause : contrats IT & responsabilité" },
  },
  {
    n: 3,
    titre: "Construire la procédure",
    corps:
      "Une plainte documentée ouvre des investigations que la voie civile ne permet pas : réquisitions, saisies informatiques, expertise judiciaire. Une plainte contre X au commissariat ne donne presque rien. Puis constitution de partie civile — ou défense, si c'est vous qui êtes mis en cause.",
    lien: { href: "/nos-domaines/rgpd-donnees", label: "Notification de violation et contrôle CNIL : voir RGPD & données" },
  },
];

const DOSSIERS = [
  {
    badge: "Outil automobile · International · STAD",
    badgeBg: "#FCEBEB",
    badgeColor: "#A32D2D",
    title: "Un logiciel de reprogrammation automobile.\nPlusieurs pays. Des années d'instruction.\nUne question au cœur du dossier.",
    quote: "Ce logiciel est-il une arme informatique\nau sens du droit pénal ?",
    items: [
      "Analyse technique complète du logiciel et des protocoles des constructeurs",
      "Des dizaines de milliers de pages de procédure. Des expertises judiciaires.",
      "Débat sur la qualification même d'atteinte à un STAD — existe-t-elle ?",
      "Confrontation entre droit pénal français et droit de l'Union européenne",
    ],
    verdict: "Quand la définition légale d'un système\ninformatique devient l'enjeu principal\ndu procès pénal.",
  },
  {
    badge: "Cyberextorsion · Éditeur logiciel industriel",
    badgeBg: "#FAEEDA",
    badgeColor: "#633806",
    title: "Une ancienne salariée connaît\nles accès administrateurs.\nElle s'en sert.",
    quote: "Vous avez deux heures pour réagir.",
    items: [
      "Accès à distance au système informatique de son ancien employeur après son départ",
      "Désactivation de comptes, blocage d'accès, perturbation du service",
      "Menaces coordonnées pour obtenir de l'argent — extorsion numérique",
      "Corrélation établie entre les événements techniques et les actes de menace",
    ],
    verdict: "Informatique industrielle, investigation\nnumérique et droit pénal dans le même dossier.\nParce que connaître un système\nne donne pas le droit d'y revenir.",
  },
  {
    badge: "Intrusion massive · Données personnelles",
    badgeBg: "#EEEDFE",
    badgeColor: "#3C3489",
    title: "Des milliers de comptes compromis\nen quelques heures.\nDes outils automatisés. Des enquêteurs saisis.",
    quote: "La question n'est pas seulement\nce qui s'est passé.\nLa question est : que permettait\nréellement le système ?",
    items: [
      "Conditions réelles d'accès — y avait-il vraiment une intrusion ?",
      "Niveau de sécurité déployé par l'entreprise — suffisant ou non ?",
      "Étendue exacte des données réellement accessibles",
      "Limites techniques des infractions retenues par le parquet",
    ],
    verdict: "En cybercriminalité, comprendre\nl'architecture du système\nchange souvent le dossier.",
  },
  {
    badge: "Criminalité organisée · Crypto · International",
    badgeBg: "#E6F1FB",
    badgeColor: "#185FA5",
    title: "Des serveurs hébergés à l'étranger.\nDes paiements en cryptomonnaies.\nDes identités dissimulées.\nUne organisation structurée — ou pas ?",
    quote: "Logs, adresses IP, transactions crypto —\ndes pièces de procédure comme les autres.",
    items: [
      "Reconstitution du fonctionnement réel de l'infrastructure numérique",
      "Traçabilité des flux financiers en cryptomonnaies",
      "Identification du rôle exact de chaque intervenant",
      "Qualification ou non de criminalité organisée",
    ],
    verdict: "Parce qu'une adresse IP à l'étranger\nn'est pas une frontière juridique.",
  },
];

/* ── Composants utilitaires ── */

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, pointerEvents: "none" }} aria-hidden>
      <div style={{ height: "100%", width: `${progress}%`, background: RED, transition: "width 0.1s linear" }} />
    </div>
  );
}

/* Vidéo du tribunal — poster réel, lecture pilotée par JS :
   - muette, en boucle, playsinline, poster, dimensions explicites ;
   - `preload="none"` : rien n'est téléchargé tant que la vidéo n'est pas jouée ;
   - pause hors viewport et quand l'onglet est masqué ;
   - `prefers-reduced-motion` : on ne lance jamais la lecture (le poster reste). */
function PalaisVideo({
  webm,
  mp4,
  poster,
  alt,
  style,
  containerStyle,
  containerClassName,
}: {
  webm: string;
  mp4: string;
  poster: string;
  alt: string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  containerClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // poster figé
    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) void v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return (
    <div className={containerClassName} style={{ position: "relative", overflow: "hidden", ...containerStyle }}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        width={1920}
        height={1080}
        aria-label={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: RED, marginBottom: 4 }}>
      {children}
    </p>
  );
}

function SectionHead({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <>
      <Eyebrow>{label}</Eyebrow>
      <h2 style={{ ...TYPE.h2, color: LIGHT.text, margin: sub ? "0 0 6px" : "0 0 14px", whiteSpace: "pre-line" }}>{title}</h2>
      {sub ? (
        <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.7, margin: "0 0 14px", maxWidth: 720, whiteSpace: "pre-line" }}>{sub}</p>
      ) : null}
    </>
  );
}

function Divider() {
  return <div style={{ borderTop: `0.5px solid ${LIGHT.border}`, maxWidth: 900, margin: "16px auto" }} />;
}

function MetricCard({ metric }: { metric: (typeof METRICS)[number] }) {
  return (
    <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: "16px 18px" }}>
      <span style={{ display: "inline-block", fontFamily: "var(--ff-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 6, background: "#FCEBEB", color: "#A32D2D", marginBottom: 10 }}>
        {metric.repere}
      </span>
      <p style={{ fontSize: 32, fontWeight: 600, color: "#A32D2D", margin: "0 0 6px", lineHeight: 1.1 }}>{metric.chiffre}</p>
      <p style={{ fontSize: 13, color: LIGHT.text, lineHeight: 1.5, margin: 0 }}>{metric.libelle}</p>
    </div>
  );
}

function DossierCard({ dossier, index }: { dossier: (typeof DOSSIERS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <article style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: CARD_PAD }}>
      <span style={{ display: "inline-block", fontFamily: "var(--ff-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 6, background: dossier.badgeBg, color: dossier.badgeColor, marginBottom: 10 }}>
        {dossier.badge}
      </span>
      <blockquote style={{ margin: "0 0 8px", padding: "6px 10px", borderLeft: `2px solid ${LIGHT.faint}`, fontSize: 13, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>
        {dossier.quote}
      </blockquote>
      <p style={{ fontSize: 13, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 8px", whiteSpace: "pre-line" }}>{dossier.verdict}</p>
      {/* §6 — détail derrière un dépliant « Le dossier » en mobile ; déplié
          d'office en desktop (bouton masqué, détail toujours visible). */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`dossier-detail-${index}`}
        className="dossier-toggle"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", padding: "4px 0", cursor: "pointer", color: RED, fontSize: 13, fontWeight: 500 }}
      >
        Le dossier
        <span aria-hidden style={{ fontSize: 18, lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform 180ms ease" }}>+</span>
      </button>
      <div id={`dossier-detail-${index}`} className={`dossier-detail${open ? " open" : ""}`} style={{ borderTop: `0.5px solid ${LIGHT.border}`, marginTop: 8, paddingTop: 10 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45, margin: "0 0 10px", whiteSpace: "pre-line" }}>{dossier.title}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {dossier.items.map((item) => (
            <div key={item} style={{ display: "flex", gap: 8, fontSize: 13, color: LIGHT.muted, lineHeight: 1.5 }}>
              <span style={{ color: RED, flexShrink: 0 }}>→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `0.5px solid ${LIGHT.border}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-cyber-reponse-${index}`}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, background: "none", border: "none", padding: "14px 0", textAlign: "left", cursor: "pointer", minHeight: 48 }}
      >
        <span style={{ display: "flex", gap: 10 }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: RED, flexShrink: 0, paddingTop: 2 }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45 }}>{item.q}</span>
        </span>
        <span aria-hidden style={{ color: RED, fontSize: 20, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 180ms ease" }}>+</span>
      </button>
      <div id={`faq-cyber-reponse-${index}`} hidden={!open} style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.7, margin: 0, padding: "0 0 12px 40px", maxWidth: 760 }}>
        {item.a}
        {item.lien ? (
          <Link href={item.lien.href} style={{ display: "inline-block", marginTop: 10, color: RED, textDecoration: "none" }}>
            {item.lien.label} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function CybercriminaliteClient() {
  return (
    <main style={{ background: LIGHT.bg, color: LIGHT.text, fontFamily: "var(--ff-body)" }}>
      <style>{`
        .cyber-hero { display: flex; align-items: stretch; overflow: hidden; min-height: 380px; }
        .cyber-hero-text { flex: 1; padding: 80px 48px 32px 64px; }
        .cyber-hero-media { width: 42%; position: relative; overflow: hidden; flex-shrink: 0; }
        .cyber-hero-h1 { font-size: clamp(30px, 5vw, 60px); line-height: 1.08; }
        .cyber-hero-accroche { font-size: clamp(20px, 3.4vw, 40px); }
        .cyber-hero-btns { display: flex; flex-wrap: wrap; gap: 12px; }
        .cyber-hero-btns a { min-height: 48px; }
        .cyber-band { height: 220px; }
        @media (min-width: 1024px) { .cyber-band { height: 320px; } }
        /* Dossiers : repliés en mobile (bouton « Le dossier »), dépliés en desktop. */
        .dossier-detail { display: none; }
        .dossier-detail.open { display: block; }
        @media (min-width: 1024px) {
          .dossier-detail { display: block !important; }
          .dossier-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .cyber-hero { flex-direction: column-reverse; min-height: 0; }
          .cyber-hero-text { padding: 28px 24px 32px; }
          .cyber-hero-media { width: 100%; height: 180px; }
          .cyber-hero-btns a { flex: 1 1 100%; text-align: center; }
        }
      `}</style>
      <ScrollProgressBar />

      {/* 1. Héro (§2) — vidéo du tribunal conservée */}
      <div className="cyber-hero" style={{ background: DARK.bg, width: "100%" }}>
        <div className="cyber-hero-text" style={{ color: DARK.text }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", background: "rgba(226,75,74,.2)", color: "#F09595", padding: "4px 14px", borderRadius: 20, marginBottom: 16 }}>
            Cybercriminalité · Droit pénal · Victimes &amp; Mis en cause
          </div>
          <h1 className="cyber-hero-h1" style={{ fontWeight: 500, color: "#ffffff", margin: "0 0 10px" }}>
            Avocat en cybercriminalité à Paris
          </h1>
          {/* Accroche : même typographie d'affichage, ~70 % du H1, en <p> (pas <h2>). */}
          <p className="cyber-hero-accroche" style={{ fontWeight: 500, color: "#ffffff", lineHeight: 1.2, margin: "0 0 18px", opacity: 0.92 }}>
            Une cyberattaque devient rapidement une affaire pénale.
          </p>
          {/* §2.2 — liste réécrite, registre entreprise (sortie de l'escroquerie bancaire). */}
          <p style={{ fontSize: 14, color: DARK.muted, lineHeight: 1.7, margin: "0 0 20px", maxWidth: 620 }}>
            Le fournisseur nie toute responsabilité. Un ancien salarié est parti avec la base clients. La CNIL enquête
            sur la victime. Le dirigeant découvre qu'il est lui-même mis en cause. Nous construisons le dossier — pour
            poursuivre ou pour défendre.
          </p>
          <div className="cyber-hero-btns">
            <a href="tel:+33181706200" style={{ background: RED, color: "#fff", padding: "13px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              Nous appeler — 01 81 70 62 00
            </a>
            <Link href="/contact" style={{ background: "transparent", color: DARK.muted, padding: "13px 22px", borderRadius: 8, fontSize: 13, textDecoration: "none", border: `0.5px solid ${DARK.border}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              Décrire l&apos;incident par écrit
            </Link>
            <a href="#methode" style={{ background: "transparent", color: DARK.muted, padding: "13px 22px", borderRadius: 8, fontSize: 13, textDecoration: "none", border: `0.5px solid ${DARK.border}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              Notre méthode
            </a>
          </div>
        </div>

        <div className="cyber-hero-media">
          <PalaisVideo
            webm="/videos/tribunal-exterieur.webm"
            mp4="/videos/tribunal-exterieur.mp4"
            poster="/images/poster-tribunal-exterieur.jpg"
            alt="Le tribunal de Paris, façade et ciel."
            containerStyle={{ width: "100%", height: "100%" }}
          />
          <div style={{ position: "absolute", top: 0, left: 0, width: "60%", height: "100%", background: "linear-gradient(to left, transparent, #0a0f2e)" }} aria-hidden />
        </div>
      </div>

      {/* 2. Chiffres (§4) — deux indicateurs */}
      <section style={{ background: LIGHT.panel, padding: "32px 0 0" }}>
        <div style={INNER}>
          <SectionHead label="La menace en 2025" title={"Les chiffres officiels — et ce qu'ils\nsignifient pour votre entreprise"} />
          <div className="grid grid-cols-2" style={{ gap: GRID_GAP, marginBottom: 10 }}>
            {METRICS.map((m) => (
              <MetricCard key={m.repere} metric={m} />
            ))}
          </div>
          {/* TODO (cabinet) : chiffres à recouper dans le rapport d'activité
              cybermalveillance.gouv.fr ; la mention « à recouper » sera retirée
              après vérification. */}
          <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: LIGHT.faint, margin: "0 0 4px" }}>
            Cybermalveillance.gouv.fr
          </p>
        </div>
      </section>

      <Divider />

      {/* 3. Trois temps (§5) — méthode */}
      <section id="methode" style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Notre méthode"
            title="Préserver, qualifier, construire"
            sub={"Un dossier pénal ne se joue pas en heures mais en mois. Ce qui se décide le premier jour détermine ce qui sera établi à l'audience."}
          />
          <ol style={{ listStyle: "none", margin: 0, padding: 0, background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12 }}>
            {TROIS_TEMPS.map((t, idx) => (
              <li key={t.n} style={{ display: "flex", gap: 14, padding: "16px 20px", borderTop: idx === 0 ? "none" : `0.5px solid ${LIGHT.border}` }}>
                <span aria-hidden style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: RED, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--ff-mono)", fontSize: 13, fontWeight: 600 }}>
                  {t.n}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: LIGHT.text, margin: "0 0 6px" }}>{t.titre}</p>
                  <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.65, margin: 0, maxWidth: "68ch" }}>{t.corps}</p>
                  {t.mono ? (
                    <span style={{ display: "inline-block", fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.faint, background: LIGHT.panel2, padding: "3px 9px", borderRadius: 6, marginTop: 8 }}>{t.mono}</span>
                  ) : null}
                  {t.lien ? (
                    <Link href={t.lien.href} style={{ display: "block", fontSize: 12, color: RED, textDecoration: "none", marginTop: 8 }}>
                      {t.lien.label} →
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Bande vidéo (§3) — entre la méthode et les dossiers */}
      {/* TODO (cabinet, §13) : droit à l'image des personnes visibles dans la
          vidéo du hall, et autorisation de tournage en enceinte judiciaire si ces
          images sont propres au cabinet — à vérifier avant mise en ligne. */}
      <div style={{ position: "relative" }}>
        <PalaisVideo
          webm="/videos/tribunal-interieur.webm"
          mp4="/videos/tribunal-interieur.mp4"
          poster="/images/poster-tribunal-interieur.jpg"
          alt="La salle des pas perdus du tribunal de Paris."
          containerClassName="cyber-band"
          containerStyle={{ width: "100%" }}
          style={{ filter: "brightness(.6)" }}
        />
        {/* Voile renforcé sous le texte : les zones vitrées du hall sont très
            claires, le voile garantit le contraste du texte blanc (§3). */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,46,0.55) 0%, rgba(10,15,46,0.35) 35%, rgba(10,15,46,0.35) 65%, rgba(10,15,46,0.55) 100%)" }} aria-hidden />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
          <p style={{ fontSize: "clamp(16px, 2.4vw, 20px)", fontWeight: 500, color: "#fff", lineHeight: 1.5, margin: 0, maxWidth: 520, textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}>
            Une cyberattaque est un incident informatique.
            <br />
            Jusqu&apos;au moment où elle devient une affaire judiciaire.
          </p>
        </div>
      </div>

      {/* 5. Dossiers (§6) — sous drapeau DOSSIERS_ENABLED (false par défaut) */}
      {DOSSIERS_ENABLED ? (
        <>
          <Divider />
          <section id="dossiers" style={{ background: LIGHT.panel, padding: "32px 0" }}>
            <div style={INNER}>
              <SectionHead label="Dossiers" title={"Quand l'informatique devient\nune affaire pénale"} />
              <p style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.faint, margin: "0 0 14px" }}>Dossiers anonymisés.</p>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
                {DOSSIERS.map((d, i) => (
                  <DossierCard key={d.badge} dossier={d} index={i} />
                ))}
              </div>
            </div>
            <div style={{ maxWidth: 900, margin: "16px auto 0", padding: "0 48px", boxSizing: "border-box" }}>
              <div style={{ width: "100%", boxSizing: "border-box", background: "#0a0f2e", borderRadius: 12, padding: "32px 48px", marginTop: 16 }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: 0 }}>
                  Nous intervenons dans les dossiers où l&apos;enquête pénale rencontre la technique : journaux, serveurs,
                  adresses IP, infrastructures cloud, protocoles industriels, cryptomonnaies, expertises judiciaires.
                </p>
              </div>
            </div>
          </section>
        </>
      ) : null}

      <Divider />

      {/* 6. Équipe */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <EquipeDossier
            titre="Des pénalistes du numérique"
            chapeau="Une plainte pénale bien construite ouvre des investigations que la voie civile ne permet pas. Encore faut-il qualifier l'infraction et sécuriser les preuves dès les premières heures."
            couleurs={{ panneau: LIGHT.panel2, carte: LIGHT.panel, bordure: LIGHT.border, texte: LIGHT.text, secondaire: LIGHT.muted, accent: RED }}
            membres={[
              { slug: "alexandre", role: "Droit pénal du numérique", tags: ["Rançongiciel", "STAD", "Fraude au président"] },
              { slug: "amir", role: "Contentieux IT & pénal", tags: ["Salarié malveillant", "Vol de données"] },
              { slug: "sarah", role: "Données personnelles & pénal", tags: ["Art. 33 RGPD", "Défense CNIL"] },
            ]}
          />
        </div>
      </section>

      <Divider />

      {/* 7. FAQ (§7) */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Questions directes" title="Ce que les dirigeants nous posent" />
          <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: "4px 20px" }}>
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 8. Renvois croisés (§8) — avant l'appel à l'action */}
      {/* TODO (cabinet, §13) : articulation avec le futur pôle escroquerie —
          le renvoi « Recours contre les banques » pointera vers cette page dès
          sa création (drapeau/URL à définir par le cabinet). */}
      <section style={{ background: LIGHT.panel, padding: "8px 0 24px" }}>
        <div style={INNER}>
          <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.7, margin: "0 0 8px" }}>
            Vous cherchez à prévenir plutôt qu&apos;à poursuivre ?{" "}
            <Link href="/nos-domaines/cybersecurite" style={{ color: RED, fontWeight: 500, textDecoration: "none" }}>
              Avocat en cybersécurité →
            </Link>
          </p>
          <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.7, margin: 0 }}>
            Vous êtes une personne physique victime d&apos;une escroquerie ou d&apos;un virement frauduleux ?{" "}
            <span style={{ color: LIGHT.faint }}>Recours contre les banques</span>{" "}
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: LIGHT.faint }}>page à venir</span>
          </p>
        </div>
      </section>

      {/* 9. CTA final */}
      <section style={{ background: LIGHT.panel, padding: "0 0 32px", width: "100%" }}>
        <div style={INNER}>
          <div style={{ background: DARK.bg, borderRadius: 12, padding: "24px 32px", textAlign: "center" }}>
            <h2 style={{ ...TYPE.h2, color: "#ffffff", margin: "0 0 6px", whiteSpace: "pre-line" }}>
              {"Ne laissez pas l'incident devenir\nun dossier subi."}
            </h2>
            <p style={{ fontSize: 14, color: DARK.muted, lineHeight: 1.7, margin: "0 0 16px", whiteSpace: "pre-line" }}>
              {"Qualification pénale · Dépôt de plainte ·\nDéfense devant le parquet et la CNIL\nPour les PME et ETI."}
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+33181706200" style={{ background: RED, color: "#fff", padding: "12px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                Nous appeler →
              </a>
              {DOSSIERS_ENABLED ? (
                <a href="#dossiers" style={{ background: "transparent", color: "rgba(255,255,255,0.7)", padding: "12px 22px", borderRadius: 8, fontSize: 13, textDecoration: "none", border: "0.5px solid rgba(255,255,255,0.2)" }}>
                  Voir nos dossiers
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
