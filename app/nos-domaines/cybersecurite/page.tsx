"use client";

import { useEffect, useRef, useState } from "react";

const HERO_STATS = [
  {
    value: 72,
    suffix: "h",
    label: "délai légal CNIL",
    source: "RGPD Art. 33",
  },
  {
    value: 20,
    suffix: "M€",
    label: "sanction RGPD maximale",
    source: "RGPD Art. 83",
  },
  {
    value: 10,
    suffix: "M€",
    label: "sanction NIS 2 entités essentielles",
    source: "NIS 2 Art. 34",
  },
  {
    value: 60,
    suffix: "%",
    label: "des victimes sont des PME/ETI",
    source: "",
  },
] as const;

const SCENARIOS = [
  {
    color: "#E24B4A",
    title: "Scénario 1 — Ransomware",
    subtitle: "Production arrêtée, données clients chiffrées",
    text: "Une mauvaise gestion des premières 48h aggrave la responsabilité vis-à-vis de la CNIL. Les preuves mal préservées compromettent tous les recours.",
  },
  {
    color: "#BA7517",
    title: "Scénario 2 — NIS 2 indirecte",
    subtitle: "PME SaaS de 40 salariés, soumise à NIS 2 sans le savoir",
    text: "Un éditeur SaaS qui héberge une activité critique peut être soumis à NIS 2 indirectement. Le critère n'est pas la taille — c'est le rôle dans la chaîne.",
  },
  {
    color: "#1A47FF",
    title: "Scénario 3 — Contrôle CNIL",
    subtitle: "Documentation insuffisante, sanction sans violation",
    text: "La CNIL sanctionne le niveau de préparation, pas seulement l'incident.",
  },
] as const;

const TIMELINE = [
  {
    color: "#1D9E75",
    phase: "Avant — Anticipation",
    summary: "Structurer la conformité avant qu'elle soit exigée",
    items: "Audit RGPD & NIS 2, PSSI, registre des traitements",
  },
  {
    color: "#E24B4A",
    phase: "Pendant — Gestion de crise",
    summary: "Coordonner la réponse juridique en temps réel",
    items: "Qualification, notification CNIL/ANSSI, forensic",
  },
  {
    color: "#1A47FF",
    phase: "Après — Recours & résilience",
    summary: "Engager les responsabilités, renforcer la posture",
    items: "Recours prestataire, défense régulateurs",
  },
] as const;

const INTERVENTIONS = [
  {
    num: "01",
    title: "Diagnostic de conformité RGPD & cybersécurité",
    body: "Audit combinant RGPD, référentiels CNIL et obligations NIS 2. Identification des écarts, traitements à risque, preuves d'accountability. Beaucoup d'entreprises ont des sauvegardes — mais aucun PRA réellement testé. Un PRA non testé est un PRA inexistant aux yeux de l'ANSSI.",
    tags: ["Audit RGPD", "PSSI", "Registre traitements", "Accountability"],
  },
  {
    num: "02",
    title: "Mise en conformité NIS 2 & identification du statut",
    body: "Identification de votre statut réel (EE, EI, prestataire critique, OIV). Le critère n'est pas votre taille — c'est votre rôle dans la chaîne de valeur de vos clients. La confusion entre régimes de notification (CNIL 72h, ANSSI, DORA) est l'une des erreurs les plus coûteuses.",
    tags: ["NIS 2 Art. 21", "PCA/PRA", "PSSI", "OIV/OSE"],
  },
  {
    num: "03",
    title: "Gouvernance cyber & responsabilité des dirigeants",
    body: "NIS 2 engage directement les organes de direction. En cas de manquement grave, l'ANSSI peut requérir une interdiction d'exercer des fonctions dirigeantes. Documenter l'implication de la direction n'est pas une formalité — c'est une protection personnelle.",
    tags: ["Gouvernance", "Comex", "DPO/RSSI", "Plan de vigilance"],
  },
  {
    num: "04",
    title: "Contrats IT, cloud & sécurité fournisseurs",
    body: "Revue et négociation de vos contrats cloud, SaaS, infogérance : clauses de sécurité, notification d'incidents, réversibilité. Le Cloud Act américain peut contraindre votre hébergeur à divulguer vos données sans vous en informer. Un contrat mal rédigé vous prive de tout recours.",
    tags: ["Cloud", "SaaS", "Art. 28 RGPD", "Réversibilité"],
  },
  {
    num: "05",
    title: "Gestion de crise & notification réglementaire",
    body: "Intervention sous 4h pour qualifier l'incident, déterminer les obligations de notification et coordonner la réponse. Dans les premières heures, deux erreurs aggravent tout : éteindre les systèmes sans avis forensic, et notifier trop tard. Nous évitons ces deux écueils.",
    tags: ["Notification CNIL", "ANSSI", "Forensic", "Communication crise"],
  },
] as const;

const SITUATIONS = [
  {
    num: "01",
    text: "Absence de PSSI documentée ou PSSI obsolète non mise à jour",
  },
  {
    num: "02",
    text: "Contrats cloud et SaaS sans clause de sécurité ni notification d'incidents",
  },
  {
    num: "03",
    text: "Aucune procédure formalisée de gestion des violations de données",
  },
  {
    num: "04",
    text: "Droits d'accès non révisés — ex-salariés ayant encore accès aux systèmes",
  },
  {
    num: "05",
    text: "Sauvegardes non testées et plans de continuité inexistants",
  },
  {
    num: "06",
    text: "Direction non impliquée formellement dans la gouvernance cyber",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "Mon entreprise est-elle concernée par NIS 2 ?",
    a: "Pas forcément directement — mais peut-être indirectement. NIS 2 s'applique aux entreprises de 50 salariés et 10M€ de CA dans des secteurs listés (énergie, santé, finance, numérique...). Mais même hors de ces seuils, une PME qui fournit des services critiques à une entité NIS 2 peut être visée par effet en cascade. La première étape est de qualifier votre statut réel.",
  },
  {
    q: "Que se passe-t-il si je ne notifie pas la CNIL dans les 72 heures ?",
    a: "Le dépassement du délai de 72 heures aggrave systématiquement la sanction. La CNIL prend en compte non seulement l'incident lui-même, mais aussi la réactivité et la qualité de la réponse. Une notification tardive ou incomplète est considérée comme un manquement autonome, distinct de la violation initiale.",
  },
  {
    q: "L'ANSSI peut-elle vraiment interdire à un dirigeant d'exercer ses fonctions ?",
    a: "Oui — c'est l'une des nouvelles prérogatives prévues par le projet de loi de transposition NIS 2. Cette mesure vise les dirigeants d'entités essentielles qui n'auraient pas pris les mesures nécessaires malgré une mise en demeure. Elle renforce considérablement la pression sur les organes de direction.",
  },
  {
    q: "Comment savoir si mes contrats cloud sont conformes NIS 2 ?",
    a: "Un contrat cloud conforme NIS 2 doit intégrer : des exigences de sécurité précises, une obligation de notification d'incidents dans des délais définis, des clauses d'audit, la localisation des données, les conditions de réversibilité et la gestion des sous-traitants en cascade. La plupart des contrats standards des éditeurs ne satisfont pas à ces exigences.",
  },
  {
    q: "Quelle est la différence entre entité essentielle et entité importante ?",
    a: "Les entités essentielles (EE) sont soumises à des contrôles proactifs de l'ANSSI et à des sanctions pouvant atteindre 10M€ ou 2% du CA mondial. Les entités importantes (EI) font l'objet de contrôles a posteriori et de sanctions plafonnées à 7M€ ou 1,4% du CA. Dans les deux cas, les obligations de sécurité sont identiques — seule l'intensité du contrôle diffère.",
  },
  {
    q: "Combien coûte un accompagnement NIS 2 pour une PME ?",
    a: "Le coût dépend de votre point de départ et de votre secteur. Un accompagnement complet (diagnostic, PSSI, procédures, contrats) pour une PME de 100-500 salariés représente généralement plusieurs dizaines de milliers d'euros. Mais une sanction NIS 2 peut atteindre 10M€ — et un incident non géré coûte en moyenne 3 à 5 fois plus qu'une mise en conformité préventive.",
  },
] as const;

const ACCENT = "#1A47FF";

const NOTIFICATIONS = [
  {
    regime: "RGPD",
    authority: "CNIL",
    subject: "Violation données",
    delay: "72h",
    badge: "red",
  },
  {
    regime: "OIV",
    authority: "ANSSI",
    subject: "SIIV",
    delay: "Sans délai",
    badge: "orange",
  },
  {
    regime: "NIS 2 EE/EI",
    authority: "CERT",
    subject: "Incident important",
    delay: "Sans retard",
    badge: "orange",
  },
  {
    regime: "DORA",
    authority: "BdF/ACPR",
    subject: "Incidents TIC",
    delay: "Délai réglementaire",
    badge: "blue",
  },
  {
    regime: "Santé",
    authority: "ARS",
    subject: "Incidents graves",
    delay: "Sans délai",
    badge: "orange",
  },
] as const;

const SEPARATOR = "0.5px solid rgba(255,255,255,0.06)";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(active: boolean, target: number, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (!active) {
      if (isMounted) setValue(0);
      return () => {
        isMounted = false;
      };
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      if (!isMounted) return;
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * easeOutCubic(t)));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
    };
  }, [active, target, duration]);

  return value;
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        animation: `fadeUp 0.8s ease ${delay}s both`,
      }}
    >
      {children}
    </div>
  );
}

function ScrollRevealCard({
  children,
  delay = 0,
  hoverColor,
}: {
  children: React.ReactNode;
  delay?: number;
  hoverColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const el = ref.current;
    if (!el) {
      return () => {
        isMounted = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMounted) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
        border: `0.5px solid ${hovered ? hoverColor : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered ? `0 12px 32px ${hoverColor}22` : "none",
        borderRadius: "8px",
        background: "#0a0f1e",
        padding: "24px",
      }}
    >
      {children}
    </div>
  );
}

function StatRow({
  stat,
  active,
}: {
  stat: (typeof HERO_STATS)[number];
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const value = useCountUp(active, stat.value);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "16px 20px",
        borderBottom: SEPARATOR,
        background: hovered ? "rgba(26,71,255,0.04)" : "transparent",
        transition: "background 0.3s ease",
      }}
    >
      <p
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "white",
          margin: 0,
          textShadow: hovered ? "0 0 12px rgba(26,71,255,0.5)" : "none",
          transition: "text-shadow 0.3s ease",
        }}
      >
        {value}
        {stat.suffix}
      </p>
      <p
        style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.55)",
          margin: "4px 0 0",
        }}
      >
        {stat.label}
      </p>
      {stat.source ? (
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.25)",
            margin: "2px 0 0",
            fontFamily: "monospace",
          }}
        >
          {stat.source}
        </p>
      ) : null}
    </div>
  );
}

function SituationItem({ num, text }: { num: string; text: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(26,71,255,0.03)" : "#060912",
        border: `0.5px solid ${hovered ? "rgba(26,71,255,0.2)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "6px",
        padding: "14px 16px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <span
        className="font-mono"
        style={{
          fontSize: "12px",
          color: ACCENT,
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.55,
        }}
      >
        · {text}
      </span>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            style={{
              borderBottom: SEPARATOR,
              padding: "20px 0",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "white",
                  lineHeight: 1.45,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  color: ACCENT,
                  fontSize: "18px",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.75,
                  paddingTop: "12px",
                  margin: 0,
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PulsingDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        animation: "pulse 2.5s ease-in-out infinite",
        boxShadow: `0 0 0 0 ${color}66`,
      }}
    />
  );
}

export default function CybersecuritePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const el = statsRef.current;
    if (!el) {
      return () => {
        isMounted = false;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMounted) setStatsActive(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, []);

  const badgeStyle = (badge: string) => {
    if (badge === "red")
      return { bg: "rgba(226,75,74,0.15)", color: "#f09595" };
    if (badge === "orange")
      return { bg: "rgba(186,117,23,0.15)", color: "#d4a24a" };
    return { bg: "rgba(26,71,255,0.15)", color: "#6a8fff" };
  };

  return (
    <main
      style={{
        background: "#060912",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @keyframes glowMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 40px); }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(29, 158, 117, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(29, 158, 117, 0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 overflow-hidden lg:grid-cols-[1.2fr_1fr]"
        style={{ padding: "64px 48px" }}
      >
        <div
          className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,71,255,0.25) 0%, transparent 70%)",
            animation: "glowMove 8s ease-in-out infinite alternate",
          }}
          aria-hidden
        />

        <div className="relative z-10">
          <FadeUp delay={0}>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Nos domaines · Cybersécurité & NIS 2
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                marginBottom: "20px",
                lineHeight: 1.15,
              }}
            >
              Cybersécurité & NIS 2
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "520px",
                marginBottom: "20px",
              }}
            >
              Une cyberattaque ne détruit pas seulement des serveurs. Elle
              désorganise la direction, bloque les opérations et fragilise
              durablement la confiance des clients.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.5)",
                borderLeft: "2px solid #1A47FF",
                paddingLeft: "16px",
                maxWidth: "480px",
                marginBottom: "28px",
                lineHeight: 1.7,
              }}
            >
              Notre rôle est d&apos;éviter que l&apos;incident technique
              devienne une crise juridique et réputationnelle.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="mb-6 flex flex-wrap gap-3">
              <a
                href="/contact"
                style={{
                  background: "#1A47FF",
                  color: "white",
                  padding: "14px 28px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Nous contacter →
              </a>
              <a
                href="/#cas"
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.5)",
                  padding: "14px 24px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  textDecoration: "none",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                }}
              >
                Voir nos cas clients
              </a>
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <div className="flex flex-wrap gap-2">
              {["RGPD", "NIS 2", "DORA", "ANSSI", "Gestion de crise"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.35)",
                      border: "0.5px solid rgba(255,255,255,0.1)",
                      padding: "4px 10px",
                      borderRadius: "3px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="relative z-10">
          <div
            ref={statsRef}
            style={{
              background: "#0a0f1e",
              border: "0.5px solid rgba(26,71,255,0.15)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {HERO_STATS.map((stat) => (
              <StatRow key={stat.label} stat={stat} active={statsActive} />
            ))}
          </div>
        </FadeUp>
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* SCÉNARIOS */}
      <section style={{ padding: "64px 48px" }} className="mx-auto max-w-6xl">
        <h2
          style={{
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 600,
            maxWidth: "640px",
            marginBottom: "32px",
            lineHeight: 1.35,
          }}
        >
          La plupart des entreprises ne découvrent leurs failles qu&apos;après
          l&apos;attaque.
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SCENARIOS.map((card, index) => (
            <ScrollRevealCard
              key={card.title}
              delay={index * 120}
              hoverColor={card.color}
            >
              <p
                style={{
                  fontSize: "10px",
                  color: card.color,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {card.title}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "white",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {card.subtitle}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {card.text}
              </p>
            </ScrollRevealCard>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* TIMELINE */}
      <section
        className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2"
        style={{ padding: "64px 48px" }}
      >
        <div>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "32px",
            }}
          >
            Avant · Pendant · Après
          </h2>
          <div className="relative" style={{ paddingLeft: "28px" }}>
            <div
              style={{
                position: "absolute",
                left: "4px",
                top: "8px",
                bottom: "8px",
                width: "1px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
              }}
              aria-hidden
            />
            {TIMELINE.map((item) => (
              <div
                key={item.phase}
                style={{ position: "relative", marginBottom: "32px" }}
              >
                <PulsingDot color={item.color} />
                <div style={{ marginTop: "-14px", paddingLeft: "20px" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: item.color,
                      marginBottom: "6px",
                    }}
                  >
                    {item.phase}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "6px",
                    }}
                  >
                    {item.summary}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.35)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            background: "#0a0f1e",
            border: "0.5px solid rgba(26,71,255,0.15)",
            borderRadius: "8px",
            padding: "32px",
            alignSelf: "start",
          }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(26,71,255,0.12) 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <p
            style={{
              fontSize: "10px",
              color: "#6a8fff",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Avis expert
          </p>
          <p
            style={{
              fontSize: "15px",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              marginBottom: "20px",
            }}
          >
            Dans les dossiers cyber que nous traitons, la qualification
            juridique de l&apos;incident est presque toujours faite trop tard.
            Or c&apos;est elle qui détermine toutes les obligations qui
            suivent.
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              margin: 0,
            }}
          >
            — Me Alexandre Lazarègue · Cybercriminalité & gestion de crise
          </p>
        </div>
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* INTERVENTIONS */}
      <section style={{ padding: "64px 48px" }} className="mx-auto max-w-6xl">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "32px",
          }}
        >
          Nos 5 interventions
        </h2>
        <div className="flex flex-col gap-0">
          {INTERVENTIONS.map((item, index) => (
            <div
              key={item.num}
              style={{
                padding: "28px 0",
                borderTop: index === 0 ? SEPARATOR : undefined,
                borderBottom: SEPARATOR,
              }}
            >
              <div className="flex flex-wrap items-start gap-4">
                <span
                  className="font-mono"
                  style={{
                    fontSize: "14px",
                    color: "#1A47FF",
                    minWidth: "32px",
                  }}
                >
                  {item.num}
                </span>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "white",
                      marginBottom: "12px",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.75,
                      marginBottom: "14px",
                      maxWidth: "720px",
                    }}
                  >
                    {item.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.35)",
                          background: "rgba(26,71,255,0.08)",
                          padding: "3px 8px",
                          borderRadius: "3px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chaîne d'approvisionnement */}
      <section
        className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12"
        style={{
          background: "#0a0f1e",
          borderTop: SEPARATOR,
          borderBottom: SEPARATOR,
          padding: "40px 48px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "10px",
              color: ACCENT,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Chaîne d&apos;approvisionnement
          </p>
          <h2
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 600,
              marginBottom: "16px",
              lineHeight: 1.35,
            }}
          >
            Votre exposition dépend aussi de vos prestataires.
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            NIS 2 impose d&apos;identifier, d&apos;évaluer et de contractualiser la
            sécurité de toute votre chaîne de valeur numérique. Un incident chez un
            prestataire critique peut produire un effet en cascade sur votre
            activité — et engager votre responsabilité si vous n&apos;aviez pas
            encadré la relation.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {[
            "Hébergeurs & infogérants — obligation de notification d'incidents dans les contrats",
            "Éditeurs SaaS — exigences MFA, chiffrement, localisation des données",
            "Sous-traitants en cascade — vérification des garanties de sécurité de niveau 2",
            "Prestataires pays tiers — évaluation du risque extraterritorial (Cloud Act, etc.)",
          ].map((item) => (
            <div key={item} className="flex gap-3" style={{ alignItems: "flex-start" }}>
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: ACCENT,
                  marginTop: "6px",
                  flexShrink: 0,
                }}
                aria-hidden
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.65,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: SEPARATOR, margin: "8px 0" }} />

      {/* TABLEAU NOTIFICATIONS */}
      <section style={{ padding: "64px 48px" }} className="mx-auto max-w-6xl">
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Qui notifie quoi, à qui, dans quel délai ?
        </h2>
        <div style={{ borderTop: SEPARATOR }}>
          {NOTIFICATIONS.map((row, index) => {
            const badge = badgeStyle(row.badge);
            return (
              <div
                key={row.regime}
                className="grid grid-cols-2 items-center gap-3 py-4 sm:grid-cols-5"
                style={{
                  borderBottom:
                    index < NOTIFICATIONS.length - 1 ? SEPARATOR : undefined,
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 600 }}>
                  {row.regime}
                </span>
                <span
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}
                >
                  {row.authority}
                </span>
                <span
                  className="col-span-2 sm:col-span-1"
                  style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}
                >
                  {row.subject}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    justifySelf: "start",
                    background: badge.bg,
                    color: badge.color,
                    padding: "3px 8px",
                    borderRadius: "3px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {row.delay}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Situations fréquentes */}
      <section
        className="mx-auto max-w-6xl"
        style={{
          background: "#0a0f1e",
          padding: "64px 48px",
          borderTop: SEPARATOR,
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Ce que nous voyons sur le terrain
        </p>
        <h2
          style={{
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            marginBottom: "12px",
            lineHeight: 1.35,
          }}
        >
          Les signaux d&apos;exposition les plus fréquents dans les PME et ETI
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.4)",
            maxWidth: "560px",
            marginBottom: "28px",
            lineHeight: 1.7,
          }}
        >
          Des situations courantes — mais souvent invisibles jusqu&apos;au
          premier contrôle ou au premier incident.
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SITUATIONS.map((item) => (
            <SituationItem key={item.num} num={item.num} text={item.text} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        className="mx-auto max-w-6xl"
        style={{
          background: "#060912",
          padding: "64px 48px",
          borderTop: SEPARATOR,
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Questions fréquentes
        </p>
        <h2
          style={{
            fontSize: "clamp(20px, 2.5vw, 26px)",
            fontWeight: 600,
            marginBottom: "24px",
            lineHeight: 1.35,
          }}
        >
          Ce que nous demandent les dirigeants
        </h2>
        <FaqAccordion />
      </section>

      {/* CTA FINAL */}
      <section
        className="relative mx-auto max-w-6xl overflow-hidden"
        style={{
          padding: "64px 48px",
          background: "#0a0f1e",
          margin: "0 40px 48px",
          borderRadius: "8px",
          border: "0.5px solid rgba(26,71,255,0.15)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(26,71,255,0.15) 0%, transparent 60%)",
            animation: "glowMove 6s ease-in-out infinite alternate",
          }}
          aria-hidden
        />
        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              style={{
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 600,
                marginBottom: "12px",
                lineHeight: 1.35,
              }}
            >
              Vous avez subi un incident ou anticipez un contrôle CNIL / ANSSI
              ?
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Notre équipe intervient sous 4h pour les crises cyber.
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-end">
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "16px 20px",
                minWidth: "240px",
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(26,71,255,0.2)",
                    color: "#6a8fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  AL
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Me Alexandre Lazarègue
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.35)",
                      margin: 0,
                    }}
                  >
                    Cybercriminalité & gestion de crise
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PulsingDot color="#1D9E75" />
                <span
                  style={{
                    fontSize: "11px",
                    color: "#5dc9a0",
                  }}
                >
                  Disponible aujourd&apos;hui
                </span>
              </div>
            </div>
            <a
              href="/contact"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              style={{
                background: "#1A47FF",
                color: "white",
                padding: "14px 28px",
                borderRadius: "4px",
                fontSize: "12px",
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                boxShadow: ctaHover
                  ? "0 0 20px rgba(26,71,255,0.5)"
                  : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              Nous contacter →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
