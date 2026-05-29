"use client";

import Link from "next/link";
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

const METRICS = [
  { tone: "red" as const, badge: "+20%", value: "504 000", label: "demandes d'assistance en France en 2025", ref: "cybermalveillance.gouv.fr" },
  { tone: "red" as const, badge: "+196%", value: "13 000", label: "assistances fraude au virement en 2025", ref: "Menace n°3 entreprises" },
  { tone: "red" as const, badge: "+159%", value: "15 000", label: "assistances faux conseiller bancaire", ref: "Malgré la sensibilisation" },
  { tone: "amber" as const, badge: "+52%", value: "1/3", label: "des assistances entreprises = piratage de compte. Menace n°1 professionnels.", ref: "Souvent par un salarié ou ex-salarié" },
  { tone: "amber" as const, badge: "+517%", value: "7 000", label: "assistances usurpation de numéro de téléphone — explosion en 2025", ref: "10e menace particuliers" },
];

const THREAT_BARS = [
  { label: "Piratage de compte", pct: 21, color: "#E24B4A" },
  { label: "Hameçonnage", pct: 16, color: "#EF9F27" },
  { label: "Fraude au virement", pct: 13.5, color: "#378ADD" },
  { label: "Ransomware", pct: 8, color: "#BA7517" },
  { label: "Violation de données", pct: 6.6, color: "#7F77DD" },
];

const TIMELINE = [
  { time: "H+0", title: "Isoler sans éteindre", desc: "Ne pas éteindre les machines. Les preuves numériques sont en mémoire vive. Un arrêt les efface définitivement. Déconnectez du réseau uniquement.", tag: null },
  { time: "H+1", title: "Associer l'avocat dès les premières décisions", desc: "Payer la rançon ou non, notifier ou attendre, communiquer ou se taire — chaque décision engage la procédure. L'avocat n'intervient pas après la technique. Il intervient avant.", tag: null },
  { time: "H+4", title: "Qualifier l'incident", desc: "Ransomware, vol de données, intrusion, fraude, salarié malveillant — la qualification pénale conditionne les recours disponibles et l'exposition de l'entreprise.", tag: "Art. 323-1 à 323-3 · 313-1 · 226-17 C.pén." },
  { time: "H+24", title: "Dépôt de plainte structuré", desc: "Une plainte bien construite ouvre des investigations que la procédure civile ne permet pas — réquisitions, saisies informatiques, expertises judiciaires. Une plainte contre X au commissariat ne donne presque rien.", tag: null },
  { time: "H+72", title: "Notification CNIL — délai à qualifier", desc: "Le délai court à partir de la prise de connaissance effective — une notion juridique qui se plaide. Nous qualifions ce moment.", tag: "Art. 33 RGPD · 72h" },
];

const TEAM_MEMBERS = [
  {
    name: "Me Alexandre Lazarègue",
    role: "· Droit pénal du numérique",
    text: "Intervient en défense et en attaque sur les dossiers de cybercriminalité, ransomware, fraude au président et atteintes aux STAD. Plaide devant les juridictions pénales.",
  },
  {
    name: "Me Amir Ben Majed",
    role: "· Contentieux IT & pénal",
    text: "Spécialiste des contentieux informatiques complexes. Intervient sur les dossiers de salarié malveillant, vol de données, atteintes aux systèmes d'information et fraudes numériques en entreprise.",
  },
  {
    name: "Me Sarah Hinderer",
    role: "Avocate · Données personnelles & pénal",
    text: "Défend les entreprises mises en cause après incident cyber et construit les dossiers de notification et de défense devant le parquet.",
  },
];

const DOSSIERS = [
  {
    badge: "Outil automobile · International · STAD",
    badgeBg: "#FCEBEB",
    badgeColor: "#A32D2D",
    title:
      "Un logiciel de reprogrammation automobile.\nPlusieurs pays. Des années d'instruction.\nUne question au cœur du dossier.",
    quote: "Ce logiciel est-il une arme informatique\nau sens du droit pénal ?",
    items: [
      "Analyse technique complète du logiciel et des protocoles des constructeurs",
      "Des dizaines de milliers de pages de procédure. Des expertises judiciaires.",
      "Débat sur la qualification même d'atteinte à un STAD — existe-t-elle ?",
      "Confrontation entre droit pénal français et droit de l'Union européenne",
    ],
    verdict:
      "Quand la définition légale d'un système\ninformatique devient l'enjeu principal\ndu procès pénal.",
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
    verdict:
      "Informatique industrielle, investigation\nnumérique et droit pénal dans le même dossier.\nParce que connaître un système\nne donne pas le droit d'y revenir.",
  },
  {
    badge: "Intrusion massive · Données personnelles",
    badgeBg: "#EEEDFE",
    badgeColor: "#3C3489",
    title:
      "Des milliers de comptes compromis\nen quelques heures.\nDes outils automatisés. Des enquêteurs saisis.",
    quote:
      "La question n'est pas seulement\nce qui s'est passé.\nLa question est : que permettait\nréellement le système ?",
    items: [
      "Conditions réelles d'accès — y avait-il vraiment une intrusion ?",
      "Niveau de sécurité déployé par l'entreprise — suffisant ou non ?",
      "Étendue exacte des données réellement accessibles",
      "Limites techniques des infractions retenues par le parquet",
    ],
    verdict:
      "En cybercriminalité, comprendre\nl'architecture du système\nchange souvent le dossier.",
  },
  {
    badge: "Criminalité organisée · Crypto · International",
    badgeBg: "#E6F1FB",
    badgeColor: "#185FA5",
    title:
      "Des serveurs hébergés à l'étranger.\nDes paiements en cryptomonnaies.\nDes identités dissimulées.\nUne organisation structurée — ou pas ?",
    quote: "Logs, adresses IP, transactions crypto —\ndes pièces de procédure comme les autres.",
    items: [
      "Reconstitution du fonctionnement réel de l'infrastructure numérique",
      "Traçabilité des flux financiers en cryptomonnaies",
      "Identification du rôle exact de chaque intervenant",
      "Qualification ou non de criminalité organisée",
    ],
    verdict:
      "Parce qu'une adresse IP à l'étranger\nn'est pas une frontière juridique.",
  },
];

const FAQ_ITEMS = [
  { q: "Un ex-salarié est parti avec notre base clients. On peut faire quelque chose ?", a: "Oui — et c'est pénal. L'accès à des données après la rupture du contrat constitue un accès frauduleux à un STAD (art. 323-1 C.pén.). La copie de données est une extraction frauduleuse (art. 323-3). La plainte pénale peut être accompagnée d'un référé en urgence pour interdire l'utilisation des données." },
  { q: "Notre banque refuse de rembourser le phishing.", a: "La charge de la preuve lui appartient. Elle doit démontrer votre négligence grave — pas vous prouver votre bonne foi. Cette preuve suppose un email avec des indices manifestes qu'un utilisateur normalement attentif aurait détectés. Si ce n'est pas le cas, le remboursement s'impose." },
  { q: "On nous accuse d'une intrusion informatique. Une adresse IP nous désigne.", a: "Une adresse IP n'est pas une identité. Elle peut être usurpée, partagée, mal interprétée. Chaque élément constitutif de l'infraction doit être établi par l'accusation. Nous examinons le dossier technique et soulevons les failles de la démonstration." },
  { q: "On a subi une attaque. La CNIL enquête maintenant sur nous.", a: "Être victime n'exclut pas d'être mis en cause pour insuffisance de sécurité. La défense repose sur trois démonstrations : les mesures prises, la réaction documentée à l'incident, et la responsabilité du prestataire si une vulnérabilité n'a pas été corrigée." },
  { q: "Faut-il payer la rançon ?", a: "C'est une décision qui engage la procédure pénale, la relation avec l'assureur et la position devant la CNIL. Payer ne garantit pas la restitution des données. Appelez-nous avant de décider." },
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

function ThreatBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginTop: 16 }}>
      <h3 style={{ ...TYPE.h3, color: LIGHT.text, margin: "0 0 10px" }}>Principales menaces entreprises 2025</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: GRID_GAP }}>
        {THREAT_BARS.map((bar) => (
          <div key={bar.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, fontSize: 13, color: LIGHT.text }}>
              <span>{bar.label}</span>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: LIGHT.muted }}>{bar.pct}%</span>
            </div>
            <div style={{ height: 8, background: LIGHT.panel2, borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: visible ? `${bar.pct}%` : "0%",
                  background: bar.color,
                  borderRadius: 4,
                  transition: "width 0.8s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: RED,
        marginBottom: 4,
      }}
    >
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
  const isRed = metric.tone === "red";
  return (
    <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: CARD_PAD }}>
      <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: isRed ? "#FCEBEB" : "#FAEEDA", color: isRed ? "#A32D2D" : "#633806", marginBottom: 10 }}>
        {metric.badge}
      </span>
      <p style={{ fontSize: 28, fontWeight: 600, color: isRed ? "#A32D2D" : "#633806", margin: "0 0 6px", lineHeight: 1.1 }}>{metric.value}</p>
      <p style={{ fontSize: 13, color: LIGHT.text, lineHeight: 1.5, margin: "0 0 8px" }}>{metric.label}</p>
      <p style={{ fontSize: 11, color: LIGHT.faint, margin: 0, fontStyle: "italic" }}>{metric.ref}</p>
    </div>
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
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, background: "none", border: "none", padding: "12px 0", textAlign: "left", cursor: "pointer" }}
      >
        <span style={{ display: "flex", gap: 10 }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: RED, flexShrink: 0, paddingTop: 2 }}>{String(index + 1).padStart(2, "0")}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45 }}>{item.q}</span>
        </span>
        <span aria-hidden style={{ color: RED, fontSize: 20, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 180ms ease" }}>+</span>
      </button>
      {open ? (
        <div style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.7, margin: 0, padding: "0 0 12px 40px", maxWidth: 760 }}>{item.a}</div>
      ) : null}
    </div>
  );
}

function TeamMemberCard({ member }: { member: (typeof TEAM_MEMBERS)[number] }) {
  return (
    <article
      style={{
        background: "var(--color-background-primary, #ffffff)",
        border: "0.5px solid var(--color-border-tertiary, rgba(0,0,0,0.1))",
        borderRadius: "var(--border-radius-lg, 12px)",
        padding: 20,
        height: "100%",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary, #1a1a1a)", margin: "0 0 4px" }}>{member.name}</p>
      <p
        style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--color-text-tertiary, #6a6a6a)",
          margin: "0 0 12px",
        }}
      >
        {member.role}
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--color-text-secondary, #4a4a4a)", margin: 0 }}>{member.text}</p>
    </article>
  );
}

/* ── Page ── */

export default function CybercriminaliteClient() {
  return (
    <main style={{ background: LIGHT.bg, color: LIGHT.text, fontFamily: "var(--ff-body)" }}>
      <ScrollProgressBar />

      {/* 1. Hero */}
      <div
        style={{
          background: DARK.bg,
          display: "flex",
          alignItems: "stretch",
          overflow: "hidden",
          minHeight: 380,
          width: "100%",
        }}
      >
        <div style={{ flex: 1, padding: "80px 48px 32px 64px", color: DARK.text }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              background: "rgba(226,75,74,.2)",
              color: "#F09595",
              padding: "4px 14px",
              borderRadius: 20,
              marginBottom: 16,
            }}
          >
            Cybercriminalité · Droit pénal · Victimes & Mis en cause
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 500,
              textTransform: "none",
              lineHeight: 1.25,
              color: "#ffffff",
              marginBottom: 16,
              whiteSpace: "pre-line",
            }}
          >
            {"Une cyberattaque devient rapidement\nune affaire pénale."}
          </h1>
          <div style={{ marginBottom: 16, maxWidth: 640 }}>
            {[
              "La banque refuse de rembourser.",
              "La CNIL enquête sur la victime.",
              "Le fournisseur nie toute responsabilité.",
              "Le dirigeant découvre qu'il est lui-même mis en cause.",
              "Nous construisons le dossier —",
              "pour poursuivre ou pour défendre.",
            ].map((line) => (
              <p key={line} style={{ fontSize: 14, color: DARK.muted, lineHeight: 1.7, margin: "0 0 4px" }}>
                {line}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" style={{ background: RED, color: "#fff", padding: "12px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
              Nous appeler →
            </Link>
            <a href="#timeline" style={{ background: "transparent", color: DARK.muted, padding: "12px 22px", borderRadius: 8, fontSize: 13, textDecoration: "none", border: `0.5px solid ${DARK.border}` }}>
              Construire le dossier
            </a>
          </div>
        </div>

        <div style={{ width: "42%", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          <video autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
            <source src="/videos/tribunal-exterieur.mp4" type="video/mp4" />
          </video>
          <div
            style={{ position: "absolute", top: 0, left: 0, width: "60%", height: "100%", background: "linear-gradient(to left, transparent, #0a0f2e)" }}
            aria-hidden
          />
        </div>
      </div>

      {/* 2. Chiffres 2025 */}
      <section style={{ background: LIGHT.panel, padding: "32px 0 0", marginBottom: 0 }}>
        <div style={INNER}>
          <SectionHead label="La menace en 2025" title={"Les chiffres officiels — et ce qu'ils\nsignifient pour votre entreprise"} />
          <p style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.faint, margin: "0 0 14px" }}>
            Source : cybermalveillance.gouv.fr — Rapport d&apos;activité 2025
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: GRID_GAP, marginBottom: GRID_GAP }}>
            {METRICS.slice(0, 3).map((m) => (
              <MetricCard key={m.value + m.badge} metric={m} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP, marginBottom: GRID_GAP }}>
            {METRICS.slice(3).map((m) => (
              <MetricCard key={m.value + m.badge} metric={m} />
            ))}
          </div>
          <ThreatBars />
          <div
            style={{
              marginTop: 12,
              marginBottom: 0,
              padding: "12px 16px",
              background: "#FCEBEB",
              border: "1px solid #F09595",
              borderRadius: 12,
              fontSize: 13,
              color: LIGHT.text,
              lineHeight: 1.6,
            }}
          >
            6 entreprises sur 10 ne savent pas évaluer les conséquences d&apos;une cyberattaque. 80% estiment ne pas être suffisamment préparées. La question n&apos;est plus de savoir si une attaque surviendra — mais de savoir ce qui se passera le jour où elle arrive.
          </div>
        </div>
      </section>

      <Divider />

      {/* 4. Si vous êtes victime */}
      <section id="timeline" style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Si vous êtes victime"
            title={"Ce qu'il faut faire — dans l'ordre"}
            sub={"La plupart des entreprises font\nles mauvaises décisions dans les premières heures.\nPas par négligence — par manque d'information."}
          />
          <div style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: "4px 20px" }}>
            {TIMELINE.map((step, idx) => (
              <div key={step.time} style={{ display: "flex", gap: 10, padding: "12px 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: RED, flexShrink: 0, marginTop: 4 }} />
                  {idx < TIMELINE.length - 1 ? (
                    <div style={{ width: 1, flex: 1, background: LIGHT.border, minHeight: 16 }} aria-hidden />
                  ) : null}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: RED, margin: "0 0 4px", fontWeight: 600 }}>{step.time}</p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: LIGHT.text, margin: "0 0 6px" }}>{step.title}</p>
                  <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  {step.tag ? (
                    <span style={{ display: "inline-block", fontSize: 11, color: LIGHT.faint, background: LIGHT.panel2, padding: "3px 9px", borderRadius: 6, marginTop: 8, fontFamily: "var(--ff-mono)" }}>
                      {step.tag}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 5. L'arsenal pénal */}
      {/* 6. L'équipe */}
      <section style={{ background: LIGHT.panel, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="L'équipe" title="Des pénalistes." />
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: GRID_GAP }}>
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 7. Vidéo intérieure */}
      <div style={{ position: "relative", borderRadius: "var(--border-radius-lg)", overflow: "hidden", margin: 0 }}>
        <video autoPlay muted loop playsInline style={{ width: "100%", height: 300, objectFit: "cover", display: "block", filter: "brightness(.65)" }}>
          <source src="/videos/tribunal-interieur.mp4" type="video/mp4" />
        </video>
        <div
          style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0f2e 0%, transparent 25%, transparent 75%, #0a0f2e 100%)" }}
          aria-hidden
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
          <p style={{ fontSize: 20, fontWeight: 500, color: "#fff", lineHeight: 1.5, margin: 0, maxWidth: 480 }}>
            Une cyberattaque est un incident informatique.
            <br />
            <span style={{ color: "#ffffff" }}>Jusqu&apos;au moment où elle devient une affaire judiciaire.</span>
          </p>
        </div>
      </div>

      <Divider />

      {/* 7. Dossiers */}
      <section id="dossiers" style={{ background: LIGHT.panel, padding: "32px 0" }}>
        <div style={INNER}>
          <SectionHead label="Dossiers" title={"Quand l'informatique devient\nune affaire pénale"} />
          <p style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.faint, margin: "0 0 14px" }}>Dossiers anonymisés.</p>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: GRID_GAP }}>
            {DOSSIERS.map((d) => (
              <article key={d.badge} style={{ background: LIGHT.panel, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: CARD_PAD }}>
                <span style={{ display: "inline-block", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 6, background: d.badgeBg, color: d.badgeColor, marginBottom: 10 }}>
                  {d.badge}
                </span>
                <p style={{ fontSize: 15, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45, margin: "0 0 8px", whiteSpace: "pre-line" }}>{d.title}</p>
                <blockquote style={{ margin: "0 0 10px", padding: "6px 10px", borderLeft: `2px solid ${LIGHT.faint}`, fontSize: 13, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {d.quote}
                </blockquote>
                <div style={{ borderTop: `0.5px solid ${LIGHT.border}`, paddingTop: 10, marginBottom: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {d.items.map((item) => (
                      <div key={item} style={{ display: "flex", gap: 8, fontSize: 13, color: LIGHT.muted, lineHeight: 1.5 }}>
                        <span style={{ color: RED, flexShrink: 0 }}>→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: 13, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>{d.verdict}</p>
              </article>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: "16px auto 0", padding: "0 48px", boxSizing: "border-box" }}>
          <div
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#0a0f2e",
              border: "0.5px solid rgba(0,0,0,0.1)",
              borderRadius: "12px",
              padding: "32px 48px",
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, margin: "0 0 12px", whiteSpace: "pre-line" }}>
              {`Nous intervenons dans les dossiers\noù l'enquête pénale rencontre la technique.\nLogs, serveurs, adresses IP,\ninfrastructures cloud, protocoles industriels,\ncryptomonnaies, données personnelles,\nexpertises judiciaires.`}
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#ffffff", lineHeight: 1.5, margin: 0, whiteSpace: "pre-line" }}>
              {`Là où la compréhension du système\ndevient aussi importante\nque la compréhension du dossier.`}
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* 8. FAQ */}
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
              <Link href="/contact" style={{ background: RED, color: "#fff", padding: "12px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                Nous appeler →
              </Link>
              <a href="#dossiers" style={{ background: "transparent", color: "rgba(255,255,255,0.7)", padding: "12px 22px", borderRadius: 8, fontSize: 13, textDecoration: "none", border: "0.5px solid rgba(255,255,255,0.2)" }}>
                Voir nos dossiers
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
