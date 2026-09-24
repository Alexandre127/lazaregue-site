"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

type DifferentiateurCard = {
  imageSrc?: string;
  imageAlt: string;
  title: string;
  /** Sous-titre facultatif : trois cartes se suffisent de leur titre. */
  text?: string;
  visual?: "portail";
};

type PortalTab = "dossiers" | "documents" | "messages" | "profil";

type PortalDocument = {
  name: string;
  date: string;
};

type PortalDossier = {
  id: string;
  name: string;
  status: "En cours" | "Clôturé";
  progress?: number;
  documents: PortalDocument[];
};

type PortalFile = {
  name: string;
  size: string;
  type: "pdf" | "docx";
};

type PortalMessage = {
  from: string;
  time: string;
  preview: string;
  unread: boolean;
};

const PORTAL_DOSSIERS: PortalDossier[] = [
  {
    id: "rgpd",
    name: "Dossier RGPD — Confidentiel",
    status: "En cours",
    progress: 68,
    documents: [
      { name: "Mise en demeure.pdf", date: "14 mai 2026" },
      { name: "Analyse juridique.docx", date: "02 mai 2026" },
      { name: "Réponse CNIL.pdf", date: "28 avr. 2026" },
    ],
  },
  {
    id: "cyber",
    name: "Incident cyber — Groupe industriel",
    status: "En cours",
    progress: 42,
    documents: [
      { name: "Rapport forensic.pdf", date: "12 mai 2026" },
      { name: "Note de crise.docx", date: "05 mai 2026" },
      { name: "PV incident.pdf", date: "30 avr. 2026" },
    ],
  },
  {
    id: "saas",
    name: "Contrat SaaS — Revue juridique",
    status: "Clôturé",
    documents: [
      { name: "Contrat SaaS v3.pdf", date: "10 mars 2026" },
      { name: "Annexes SLA.docx", date: "08 mars 2026" },
      { name: "Avis juridique.pdf", date: "01 mars 2026" },
    ],
  },
];

const PORTAL_FILES: PortalFile[] = [
  { name: "Contrat_SaaS_v2.pdf", size: "2.4 MB", type: "pdf" },
  { name: "RGPD_Audit_2026.docx", size: "890 KB", type: "docx" },
  { name: "NDA_Prestataire.pdf", size: "1.1 MB", type: "pdf" },
  { name: "CGV_Ecommerce.docx", size: "445 KB", type: "docx" },
  { name: "Rapport_CNIL.pdf", size: "3.2 MB", type: "pdf" },
];

const PORTAL_MESSAGES: PortalMessage[] = [
  {
    from: "Maître Lazarègue",
    time: "Aujourd'hui 10:24",
    preview: "Concernant votre dossier RGPD...",
    unread: true,
  },
  {
    from: "Maître Hinderer",
    time: "Hier 16:45",
    preview: "Les documents ont été transmis...",
    unread: true,
  },
  {
    from: "Cabinet",
    time: "Lun. 09:12",
    preview: "Votre rendez-vous du 28 mai...",
    unread: false,
  },
];

const PORTAL_TABS: { id: PortalTab; label: string }[] = [
  { id: "dossiers", label: "Dossiers" },
  { id: "documents", label: "Documents" },
  { id: "messages", label: "Messages" },
  { id: "profil", label: "Profil" },
];

function PortalFileIcon({ type }: { type: PortalFile["type"] }) {
  const color = type === "pdf" ? "#E24B4A" : "#1A47FF";
  return (
    <svg
      className="shrink-0"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function PortalDocIcon() {
  return (
    <svg
      className="shrink-0"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(10,15,46,0.35)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconDossiers({ active }: { active: boolean }) {
  const color = active ? "#1A47FF" : "rgba(10,15,46,0.25)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDocuments({ active }: { active: boolean }) {
  const color = active ? "#1A47FF" : "rgba(10,15,46,0.25)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMessages({ active }: { active: boolean }) {
  const color = active ? "#1A47FF" : "rgba(10,15,46,0.25)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconProfil({ active }: { active: boolean }) {
  const color = active ? "#1A47FF" : "rgba(10,15,46,0.25)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusBadge({ status }: { status: PortalDossier["status"] }) {
  const isActive = status === "En cours";
  return (
    <span
      className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
      style={{
        background: isActive ? "rgba(26,71,255,0.08)" : "rgba(29,158,117,0.08)",
        color: isActive ? "#1A47FF" : "#0F6E56",
      }}
    >
      {isActive ? "EN COURS" : "CLÔTURÉ"}
    </span>
  );
}

function PortalHeader({
  title,
  badge,
}: {
  title: string;
  badge?: ReactNode;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2.5"
      style={{ background: "#F8F9FA", borderColor: "rgba(0,0,0,0.06)" }}
    >
      <span className="text-[13px] font-medium text-[#0A0F2E]">{title}</span>
      {badge}
    </div>
  );
}

function PortalPanel({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col overflow-hidden transition-opacity duration-200 ease ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}

function ClientPortalMockupVisual() {
  const [activeTab, setActiveTab] = useState<PortalTab>("dossiers");
  const [dossierView, setDossierView] = useState<"list" | "detail">("list");
  const [selectedDossierId, setSelectedDossierId] = useState<string | null>(null);

  const selectedDossier = PORTAL_DOSSIERS.find((d) => d.id === selectedDossierId);
  const unreadCount = PORTAL_MESSAGES.filter((m) => m.unread).length;

  const selectTab = (tab: PortalTab) => {
    setActiveTab(tab);
    setDossierView("list");
  };

  const openDossier = (id: string) => {
    setSelectedDossierId(id);
    setDossierView("detail");
  };

  const navIcons: Record<PortalTab, (props: { active: boolean }) => ReactNode> = {
    dossiers: IconDossiers,
    documents: IconDocuments,
    messages: IconMessages,
    profil: IconProfil,
  };

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden bg-white">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <PortalPanel visible={activeTab === "dossiers" && dossierView === "list"}>
          <PortalHeader
            title="Portail client"
            badge={
              <span
                className="rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide"
                style={{ background: "rgba(26,71,255,0.08)", color: "#1A47FF" }}
              >
                3 actifs
              </span>
            }
          />
          <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2">
            {PORTAL_DOSSIERS.map((dossier) => (
              <button
                key={dossier.id}
                type="button"
                onClick={() => openDossier(dossier.id)}
                className="cursor-pointer rounded-md px-2 py-2 text-left transition-colors duration-200 hover:bg-[rgba(26,71,255,0.04)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] font-medium leading-snug text-[#0A0F2E]">
                    {dossier.name}
                  </p>
                  <StatusBadge status={dossier.status} />
                </div>
                {dossier.id === "rgpd" && dossier.progress !== undefined ? (
                  <div className="mt-2">
                    <div
                      className="h-[2px] rounded"
                      style={{ background: "rgba(26,71,255,0.12)" }}
                    >
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${dossier.progress}%`,
                          background: "#1A47FF",
                        }}
                      />
                    </div>
                    <p
                      className="mt-1 font-mono text-[9px]"
                      style={{ color: "rgba(10,15,46,0.25)" }}
                    >
                      {dossier.progress}% complété
                    </p>
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        </PortalPanel>

        <PortalPanel visible={activeTab === "dossiers" && dossierView === "detail" && !!selectedDossier}>
          {selectedDossier ? (
            <>
              <div
                className="flex shrink-0 items-center gap-2 border-b px-3 py-2.5"
                style={{ background: "#F8F9FA", borderColor: "rgba(0,0,0,0.06)" }}
              >
                <button
                  type="button"
                  onClick={() => setDossierView("list")}
                  className="cursor-pointer text-[11px] text-[#0A0F2E]/45 transition-colors hover:text-[#0A0F2E]"
                  aria-label="Retour"
                >
                  ←
                </button>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#0A0F2E]">
                  {selectedDossier.name}
                </span>
                <StatusBadge status={selectedDossier.status} />
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto p-2">
                {selectedDossier.status === "En cours" &&
                selectedDossier.progress !== undefined ? (
                  <div className="mb-1 px-2">
                    <div
                      className="h-[2px] rounded"
                      style={{ background: "rgba(26,71,255,0.12)" }}
                    >
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${selectedDossier.progress}%`,
                          background: "#1A47FF",
                        }}
                      />
                    </div>
                  </div>
                ) : null}
                {selectedDossier.documents.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-[rgba(26,71,255,0.04)]"
                  >
                    <PortalDocIcon />
                    <p className="min-w-0 flex-1 text-[10px] text-[#0A0F2E]/45">
                      <span className="text-[11px] text-[#0A0F2E]">{doc.name}</span>
                      <span> · {doc.date}</span>
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </PortalPanel>

        <PortalPanel visible={activeTab === "documents"}>
          <PortalHeader
            title="Mes documents"
            badge={
              <span
                className="font-mono text-[9px]"
                style={{ color: "rgba(10,15,46,0.45)" }}
              >
                5 fichiers
              </span>
            }
          />
          <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2">
            {PORTAL_FILES.map((file) => (
              <div
                key={file.name}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-[rgba(26,71,255,0.04)]"
              >
                <PortalFileIcon type={file.type} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-[#0A0F2E]">{file.name}</p>
                  <p
                    className="font-mono text-[9px]"
                    style={{ color: "rgba(10,15,46,0.35)" }}
                  >
                    {file.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PortalPanel>

        <PortalPanel visible={activeTab === "messages"}>
          <PortalHeader
            title="Messagerie"
            badge={
              <span
                className="font-mono text-[9px]"
                style={{ color: "rgba(10,15,46,0.45)" }}
              >
                {unreadCount} non lus
              </span>
            }
          />
          <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2">
            {PORTAL_MESSAGES.map((msg) => (
              <div
                key={msg.from}
                className="flex cursor-pointer gap-2 rounded-md px-2 py-2 transition-colors hover:bg-[rgba(26,71,255,0.04)]"
              >
                <div className="mt-1.5 shrink-0">
                  {msg.unread ? (
                    <span
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ background: "#1A47FF" }}
                      aria-hidden
                    />
                  ) : (
                    <span className="block h-1.5 w-1.5" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] font-medium text-[#0A0F2E]">{msg.from}</p>
                    <p
                      className="shrink-0 font-mono text-[9px]"
                      style={{ color: "rgba(10,15,46,0.25)" }}
                    >
                      {msg.time}
                    </p>
                  </div>
                  <p
                    className="mt-0.5 truncate text-[10px]"
                    style={{ color: "rgba(10,15,46,0.45)" }}
                  >
                    {msg.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PortalPanel>

        <PortalPanel visible={activeTab === "profil"}>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-medium"
              style={{ background: "rgba(26,71,255,0.08)", color: "#1A47FF" }}
            >
              SC
            </div>
            <p className="mt-3 text-[13px] font-medium text-[#0A0F2E]">
              Société Confidentielle SAS
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "rgba(10,15,46,0.45)" }}>
              direction@societe.fr
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "rgba(10,15,46,0.30)" }}>
              Membre depuis mars 2024
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div
                className="rounded-lg p-3"
                style={{ background: "rgba(26,71,255,0.06)" }}
              >
                <p className="text-[18px] font-medium text-[#1A47FF]">4</p>
                <p className="text-[10px]" style={{ color: "rgba(10,15,46,0.45)" }}>
                  dossiers
                </p>
              </div>
              <div
                className="rounded-lg p-3"
                style={{ background: "rgba(26,71,255,0.06)" }}
              >
                <p className="text-[18px] font-medium text-[#1A47FF]">12</p>
                <p className="text-[10px]" style={{ color: "rgba(10,15,46,0.45)" }}>
                  documents
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 cursor-pointer self-start rounded-full border px-3 py-1.5 text-[11px] text-[#0A0F2E]/40 transition-colors hover:border-[rgba(0,0,0,0.2)]"
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
            >
              Se déconnecter
            </button>
          </div>
        </PortalPanel>
      </div>

      <nav
        className="mt-auto flex shrink-0 items-center justify-around border-t px-2 py-2"
        style={{ background: "#F8F9FA", borderColor: "rgba(0,0,0,0.06)" }}
      >
        {PORTAL_TABS.map((tab) => {
          const Icon = navIcons[tab.id];
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className="flex cursor-pointer flex-col items-center px-3 py-1"
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              <Icon active={active} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

const SPOTLIGHT_TITLE = "Le droit du numérique, notre ";
const SPOTLIGHT_ACCENT = "seul métier";

// Titre « spotlight » rétabli SANS duplication de texte : UN SEUL nœud de texte,
// un dégradé animé découpé sur les lettres (background-clip: text) dont la
// position suit le défilement (variable --spot). Dégradation en couleur unie si
// background-clip: text n'est pas supporté ; effet neutralisé sous
// prefers-reduced-motion (et écouteur non attaché) ; couleur unie forcée à
// l'impression (sinon texte transparent = invisible). Lisible avant toute
// animation (couleur de repli #0A0F2E au rendu initial).
function DifferentiateurSpotlightTitle() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 quand le titre entre par le bas, 1 quand il sort par le haut.
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--spot", `${(p * 100).toFixed(1)}%`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .laz-spotlight-title { color: #0A0F2E; }
        @supports ((-webkit-background-clip: text) or (background-clip: text)) {
          @media (prefers-reduced-motion: no-preference) {
            .laz-spotlight-title {
              background: linear-gradient(100deg, #0A0F2E 0%, #0A0F2E 34%, #4D6FFF 50%, #0A0F2E 66%, #0A0F2E 100%);
              background-size: 260% 100%;
              background-position: var(--spot, 0%) 50%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
            }
          }
        }
        @media print {
          .laz-spotlight-title {
            -webkit-text-fill-color: #0A0F2E !important;
            color: #0A0F2E !important;
            background: none !important;
          }
        }
      `}</style>
      <h2
        ref={ref}
        className="laz-spotlight-title mb-5 text-2xl font-bold leading-snug md:mb-6 md:text-3xl lg:text-4xl"
      >
        {`${SPOTLIGHT_TITLE}${SPOTLIGHT_ACCENT}`}
      </h2>
    </>
  );
}

const CARDS: DifferentiateurCard[] = [
  {
    imageSrc: "/images/pourquoi-nous/logs-annotes.webp",
    imageAlt:
      "Page de journal serveur imprimée, annotée à la main de références au RGPD et au code pénal",
    title: "Un cabinet dédié au numérique",
    text: "Le droit du numérique est la seule matière du cabinet, du contrat informatique au contentieux pénal des systèmes d'information.",
  },
  {
    imageSrc: "/images/pourquoi-nous/tableau-architecture.webp",
    imageAlt:
      "Schéma d'architecture de traitement de données dessiné au tableau, annoté de références juridiques",
    title: "Une équipe juridique et technique",
    text: "Avocats et experts en cybersécurité confrontent l'analyse juridique aux réalités techniques du dossier. Une double inscription aux barreaux de Paris et de Montréal complète cette approche sur les dossiers transatlantiques.",
  },
  {
    imageSrc: "/images/pourquoi-nous/plaque-tilsitt.webp",
    imageAlt: "Plaque du cabinet Lazarègue Avocats, 18 rue de Tilsitt, Paris",
    title: "Une pratique du numérique depuis 2016",
    text: "Le cabinet intervient sur les cyberattaques, les données personnelles, l'intelligence artificielle, les plateformes et les projets informatiques en difficulté.",
  },
];

export function PortailDemo() {
  const [activeTab, setActiveTab] = useState("dossiers");
  const [showNotif, setShowNotif] = useState(false);
  const [notif, setNotif] = useState("");
  const [prog, setProg] = useState(68);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Aperçu décoratif : figé si l'utilisateur réduit les animations OU s'il a
    // activé la commande de pause.
    if (
      paused ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }
    const states = [
      { tab: "dossiers", notif: "Dossier RGPD mis à jour", prog: 72 },
      { tab: "docs", notif: "Nouveau document ajouté", prog: 72 },
      { tab: "msgs", notif: "Message de votre avocat", prog: 72 },
      { tab: "avocat", notif: "Avocat disponible en direct", prog: 72 },
    ];
    let i = 0;
    const interval = setInterval(() => {
      const s = states[i % states.length];
      setActiveTab(s.tab);
      setNotif(s.notif);
      setShowNotif(true);
      if (s.prog) setProg(s.prog);
      setTimeout(() => setShowNotif(false), 1100);
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="pdemo"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        overflow: "hidden",
        fontSize: "11px",
      }}
    >
      <div
        className="pdemo-head"
        style={{
          padding: "8px 12px",
          borderBottom: "0.5px solid rgba(10,15,46,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            color: "rgba(10,15,46,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Portail client
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            className="pdemo-pause"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Reprendre l’aperçu animé du portail" : "Mettre en pause l’aperçu animé du portail"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "26px",
              height: "26px",
              padding: 0,
              border: "1px solid rgba(10,15,46,0.18)",
              borderRadius: "4px",
              background: "#fff",
              color: "#0A0F2E",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            <span aria-hidden="true" className="pdemo-pause-icon">
              {paused ? "▷" : "❚❚"}
            </span>
          </button>
          <span
            aria-hidden="true"
            style={{
              background: "#1A47FF",
              color: "#FFFFFF",
              padding: "1px 6px",
              borderRadius: "2px",
              fontSize: "9px",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            TEMPS RÉEL
          </span>
        </span>
      </div>

      <div
        aria-hidden="true"
        style={{
          display: "flex",
          borderBottom: "0.5px solid rgba(10,15,46,0.1)",
        }}
      >
        {["dossiers", "docs", "msgs", "avocat"].map((tab) => (
          <div
            key={tab}
            className="pdemo-tab"
            style={{
              flex: 1,
              padding: "8px 4px",
              textAlign: "center",
              fontSize: "13px",
              color: activeTab === tab ? "#1A47FF" : "rgba(10,15,46,0.35)",
              borderBottom: activeTab === tab ? "2px solid #1A47FF" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab === "dossiers"
              ? "Dossiers"
              : tab === "docs"
                ? "Docs"
                : tab === "msgs"
                  ? "Messages"
                  : "Avocat"}
          </div>
        ))}
      </div>

      <div className="pdemo-stage" aria-hidden="true" style={{ minHeight: "160px", padding: "10px 12px" }}>
        {activeTab === "dossiers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              { name: "RGPD — E-commerce", status: "EN COURS", bg: "rgba(26,71,255,0.1)", color: "#1A47FF" },
              { name: "Incident cyber — Industrie", status: "URGENT", bg: "rgba(226,75,74,0.12)", color: "#C73E3D" },
              { name: "Due diligence — M&A", status: "VALIDÉ", bg: "rgba(29,158,117,0.12)", color: "#1D9E75" },
            ].map((d) => (
              <div
                key={d.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 8px",
                  border: "0.5px solid rgba(10,15,46,0.08)",
                  borderRadius: "4px",
                }}
              >
                <span style={{ color: "#0A0F2E", fontSize: "11px" }}>{d.name}</span>
                <span
                  style={{
                    background: d.bg,
                    color: d.color,
                    padding: "1px 6px",
                    borderRadius: "2px",
                    fontSize: "9px",
                    fontWeight: 600,
                  }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "docs" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Rapport conformité RGPD v4", "DPA sous-traitant — version signée"].map((doc) => (
              <div
                key={doc}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  border: "0.5px solid rgba(10,15,46,0.08)",
                  borderRadius: "4px",
                }}
              >
                <span style={{ color: "#0A0F2E", fontSize: "11px" }}>{doc}</span>
                <span
                  style={{
                    background: "rgba(26,71,255,0.1)",
                    color: "#1A47FF",
                    padding: "1px 5px",
                    borderRadius: "2px",
                    fontSize: "9px",
                    fontWeight: 600,
                  }}
                >
                  NOUVEAU
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "msgs" && (
          <div
            style={{
              padding: "8px",
              border: "0.5px solid rgba(10,15,46,0.08)",
              borderRadius: "6px",
              background: "rgba(26,71,255,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(26,71,255,0.15)",
                  color: "#1A47FF",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                SH
              </div>
              <div style={{ color: "#0A0F2E", fontSize: "11px", fontWeight: 500 }}>Me Sarah Hinderer</div>
            </div>
            <div style={{ color: "rgba(10,15,46,0.65)", fontSize: "11px", lineHeight: 1.55 }}>
              Le projet DPA est prêt. Vous pouvez valider et signer depuis le portail.
            </div>
          </div>
        )}

        {activeTab === "avocat" && (
          <div
            style={{
              padding: "10px",
              border: "0.5px solid rgba(10,15,46,0.08)",
              borderRadius: "6px",
              background: "rgba(29,158,117,0.04)",
            }}
          >
            <div style={{ color: "#0A0F2E", fontSize: "11px", marginBottom: "6px" }}>
              Me Sarah Hinderer · Données & IA
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#1D9E75", fontSize: "11px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#1D9E75",
                  animation: "pulse 2.5s infinite",
                  boxShadow: "0 0 0 0 rgba(29,158,117,0.45)",
                }}
              />
              Disponible maintenant
            </div>
          </div>
        )}
      </div>

      <div
        aria-hidden="true"
        style={{
          padding: "6px 12px",
          background: "rgba(26,71,255,0.04)",
          borderTop: "0.5px solid rgba(10,15,46,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          opacity: showNotif ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      >
        <span
          style={{
            width: "5px",
            height: "5px",
            background: "#1A47FF",
            borderRadius: "50%",
            flexShrink: 0,
          }}
        />
        <span style={{ color: "rgba(10,15,46,0.55)", fontSize: "10px" }}>{notif}</span>
      </div>
    </div>
  );
}

export function SectionDifferenciateurs() {
  return (
    <section className="w-full bg-[#F8F9FA] px-4 py-8 md:px-8 md:py-14 lg:px-12">
      {/* Trois cartes illustrées : 1 colonne en mobile, 3 colonnes ≥768px.
          Le grand bloc portail passe en deux colonnes ≥768px. */}
      <style>{`
        .pourquoi-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .pourquoi-grid { grid-template-columns: repeat(3, 1fr); } }
        .portal-block { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .portal-block { grid-template-columns: minmax(0,0.95fr) minmax(0,1.05fr); } }
      `}</style>
      <div className="container mx-auto">
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10 lg:mb-16">
          <p className="home-kicker mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0A0F2E]/65 md:mb-4">
            Pourquoi nous
          </p>
          <DifferentiateurSpotlightTitle />
        </header>

        <div className="pourquoi-grid">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="flex flex-col overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "0.5px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
              }}
            >
              {/* Bande illustrée — hauteur 116px (mobile) / 128px (≥768px),
                  cadrage cover, filet bas 0.5px. */}
              <div
                className="relative h-[116px] w-full shrink-0 overflow-hidden md:h-[128px]"
                style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}
              >
                <Image
                  src={card.imageSrc as string}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>

              <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                {/* Hauteur du bloc titre réservée sur le titre le plus long
                    (2 lignes) en desktop (md : grille à 3 colonnes) pour que les
                    trois paragraphes démarrent sur la même ligne. Naturel en
                    mobile. */}
                <div className="md:min-h-[44px]">
                  <h3
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontWeight: 500,
                      fontSize: 16,
                      lineHeight: 1.35,
                      color: "#0A0F2E",
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                {card.text ? (
                  <p
                    style={{
                      fontFamily: "var(--ff-body)",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: "rgba(10,15,46,0.6)",
                      margin: "8px 0 0",
                    }}
                  >
                    {card.text}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {/* Grand bloc portail — titre, texte définitif et aperçu réel de
            l'interface. PortailDemo est réutilisé (non recopié) : c'est la seule
            implémentation rendue. Aucun bouton (aucune page portail n'existe). */}
        <div className="portal-block mt-11 overflow-hidden rounded-[2px] border border-white/15">
          <div className="bg-[#0A0F2E] px-8 py-8 md:px-9 md:py-10">
            <h3 className="m-0 mb-3 text-[21px] font-medium leading-snug text-white">
              Votre dossier accessible à tout moment
            </h3>
            <p className="m-0 max-w-[44ch] text-[15px] leading-[1.6] text-[#B7BEE4]">
              Chaque client dispose d&apos;un espace personnel réunissant les
              documents, les échanges, les échéances et l&apos;avancement de son
              dossier. Il bénéficie ainsi d&apos;un suivi clair tout au long de
              notre intervention.
            </p>
          </div>
          {/* Aperçu réel de l'interface — décoratif (aria-hidden) : le titre et
              le texte portent l'information. */}
          <div
            className="flex items-center justify-center border-t border-white/[0.12] bg-[#070B24] p-6 md:border-l md:border-t-0 md:p-8"
            aria-hidden="true"
          >
            <div className="w-full max-w-[380px]">
              <PortailDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
