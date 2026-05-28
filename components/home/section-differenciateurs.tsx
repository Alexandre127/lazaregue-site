"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DifferentiateurCard = {
  imageSrc?: string;
  imageAlt: string;
  title: string;
  text: string;
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

function CardShimmer({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sh = ref.current;
    if (!sh) return;

    let intervalId: ReturnType<typeof setInterval>;

    const go = () => {
      sh.style.transition = "none";
      sh.style.transform = "translateX(-160%)";
      sh.style.opacity = "1";
      setTimeout(() => {
        sh.style.transition = "transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        sh.style.transform = "translateX(160%)";
      }, 50);
      setTimeout(() => {
        sh.style.opacity = "0";
      }, 960);
    };

    const startId = setTimeout(() => {
      go();
      intervalId = setInterval(go, 4000 + index * 600);
    }, 800 + index * 700);

    return () => {
      clearTimeout(startId);
      clearInterval(intervalId);
    };
  }, [index]);

  return <div ref={ref} className="card-shimmer" aria-hidden />;
}

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
const SPOTLIGHT_WIDTH = 80;
const SPOTLIGHT_INITIAL_MS = 1400;
const SPOTLIGHT_LOOP_MS = 6000;
const SPOTLIGHT_PASS_MS = 800;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function DifferentiateurSpotlightTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const loopTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealedRef = useRef(false);
  const [revealWidth, setRevealWidth] = useState(0);
  const [spotlightLeft, setSpotlightLeft] = useState(-SPOTLIGHT_WIDTH);
  const [spotlightStrong, setSpotlightStrong] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const titleClass =
    "text-2xl font-bold leading-snug md:text-3xl lg:text-4xl";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setRevealWidth(9999);
      setRevealed(true);
      revealedRef.current = true;
      setSpotlightLeft(-SPOTLIGHT_WIDTH);
      return;
    }

    let cancelled = false;
    let session = 0;

    const stopSpotlight = () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
        loopTimerRef.current = null;
      }
    };

    const playSpotlight = () => {
      stopSpotlight();
      cancelled = false;
      const currentSession = ++session;

      setRevealed(false);
      revealedRef.current = false;
      setRevealWidth(0);
      setSpotlightLeft(-SPOTLIGHT_WIDTH);
      setSpotlightStrong(true);

      requestAnimationFrame(() => {
        if (cancelled || currentSession !== session) return;

        const wrap = wrapRef.current;
        if (!wrap) return;

        const textWidth = wrap.offsetWidth;

        const runPass = (
          duration: number,
          strong: boolean,
          onDone?: () => void,
        ) => {
          setSpotlightStrong(strong);
          const start = performance.now();

          const tick = (now: number) => {
            if (cancelled || currentSession !== session) return;

            const t = Math.min((now - start) / duration, 1);
            const eased = easeInOut(t);
            const left =
              -SPOTLIGHT_WIDTH + eased * (textWidth + SPOTLIGHT_WIDTH);
            setSpotlightLeft(left);

            if (!revealedRef.current) {
              setRevealWidth(Math.min(left + SPOTLIGHT_WIDTH, textWidth));
            }

            if (t < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              onDone?.();
            }
          };

          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(tick);
        };

        runPass(SPOTLIGHT_INITIAL_MS, true, () => {
          if (cancelled || currentSession !== session) return;

          setRevealWidth(textWidth);
          setRevealed(true);
          revealedRef.current = true;
          setSpotlightLeft(-SPOTLIGHT_WIDTH);

          loopTimerRef.current = setInterval(() => {
            runPass(SPOTLIGHT_PASS_MS, false);
          }, SPOTLIGHT_LOOP_MS);
        });
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playSpotlight();
        } else {
          stopSpotlight();
          setRevealed(false);
          revealedRef.current = false;
          setRevealWidth(0);
          setSpotlightLeft(-SPOTLIGHT_WIDTH);
        }
      },
      { threshold: 0.3 },
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      stopSpotlight();
      observer.disconnect();
    };
  }, [isMobile]);

  const titleContent = (visible: boolean) => (
    <span
      className={titleClass}
      style={{ color: visible ? "#0A0F2E" : "rgba(10,15,46,0.08)" }}
    >
      {SPOTLIGHT_TITLE}
      <span style={{ color: visible ? "#1A47FF" : "rgba(10,15,46,0.08)" }}>
        {SPOTLIGHT_ACCENT}
      </span>
    </span>
  );

  if (isMobile) {
    return (
      <h2 className="mb-5 md:mb-6">
        <span className={titleClass} style={{ color: "#0A0F2E" }}>
          {SPOTLIGHT_TITLE}
          <span className="text-[#1A47FF]">{SPOTLIGHT_ACCENT}</span>
        </span>
      </h2>
    );
  }

  return (
    <h2 ref={titleRef} className="mb-5 md:mb-6">
      <div ref={wrapRef} className="relative inline-block">
        <div aria-hidden="true">{titleContent(false)}</div>

        <div
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap"
          style={{ width: revealed ? "100%" : revealWidth }}
        >
          {titleContent(true)}
        </div>

        <div
          className="spotlight pointer-events-none absolute"
          style={{
            top: -20,
            bottom: -20,
            width: SPOTLIGHT_WIDTH,
            left: spotlightLeft,
            opacity:
              revealed && spotlightLeft <= -SPOTLIGHT_WIDTH / 2 ? 0 : 1,
            background: spotlightStrong
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 50%, transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)",
          }}
          aria-hidden
        />
      </div>
    </h2>
  );
}

const CARDS: DifferentiateurCard[] = [
  {
    imageSrc: "/images/card-territoire.jpg",
    imageAlt: "Un seul territoire — droit du numérique",
    title: "Un cabinet dédié au numérique",
    text: "Nous intervenons exclusivement en droit du numérique.",
  },
  {
    imageSrc: "/images/card-equipe.jpg",
    imageAlt: "Une équipe juridique et technique",
    title: "Une équipe juridique et technique",
    text: "Nous traitons chaque dossier avec une compréhension concrète des systèmes d'information.",
  },
  {
    imageSrc: "/images/card-terrain.jpg",
    imageAlt: "Une pratique opérationnelle du numérique",
    title: "Une pratique opérationnelle du numérique",
    text: "Depuis 2016, nous accompagnons les PME, ETI et groupes dans leurs problématiques liées au droit des nouvelles technologies.",
  },
  {
    imageAlt: "Un portail client transparent — interface de suivi des dossiers",
    title: "Un portail client avec un suivi continu des dossiers",
    text: "Nos clients savent en permanence où en est leur affaire.",
    visual: "portail",
  },
];

function PortailDemo() {
  const [activeTab, setActiveTab] = useState("dossiers");
  const [showNotif, setShowNotif] = useState(false);
  const [notif, setNotif] = useState("");
  const [prog, setProg] = useState(68);

  useEffect(() => {
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
  }, []);

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        overflow: "hidden",
        fontSize: "11px",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "0.5px solid rgba(10,15,46,0.1)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: "rgba(10,15,46,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Portail client
        </span>
        <span
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
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: "0.5px solid rgba(10,15,46,0.1)",
        }}
      >
        {["dossiers", "docs", "msgs", "avocat"].map((tab) => (
          <div
            key={tab}
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

      <div style={{ minHeight: "160px", padding: "10px 12px" }}>
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
    <section className="w-full bg-[#F8F9FA] px-4 py-10 md:px-8 md:py-16 lg:px-12">
      <div className="container mx-auto">
        <header className="mx-auto mb-8 max-w-3xl text-center md:mb-10 lg:mb-16">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8888A0] md:mb-4">
            Pourquoi nous
          </p>
          <DifferentiateurSpotlightTitle />
        </header>

        <div className="grid grid-cols-1 grid-rows-[1fr] items-start gap-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4">
          {CARDS.map((card, index) => (
            <article key={card.title} className="flex flex-col">
              {card.visual === "portail" ? (
                <div className="h-[240px] w-full shrink-0 overflow-hidden rounded-md border border-[rgba(0,0,0,0.08)]">
                  <PortailDemo />
                </div>
              ) : (
                <div
                  className="group relative h-[240px] overflow-hidden rounded-md border border-[rgba(255,255,255,0.10)] hover:border-[rgba(26,71,255,0.55)] hover:shadow-[0_0_32px_rgba(26,71,255,0.18),inset_0_0_20px_rgba(26,71,255,0.06)]"
                  style={{
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <CardShimmer index={index} />
                  <img
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className="relative z-[1] h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <h3 className="mb-3 font-medium text-[#0A0F2E] md:mb-4">
                  {card.title}
                </h3>
                <p className="max-w-[280px] text-[13px] leading-[1.8] text-[#0A0F2E]/55">
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
