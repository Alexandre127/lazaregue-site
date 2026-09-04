"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { MembreCarte } from "@/components/equipe-dossier";
import { FAQ_ITEMS } from "./faq";

/* Jetons repris à l'identique des autres pages /nos-domaines/* (voir la page
   NIS 2 voisine) : aucune nouvelle palette, typographie ni échelle d'espacement. */
const DARK = {
  bg: "#0a0f2e",
  panel: "#11163a",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.72)", // chapeau héro — contraste vérifié > 4.5:1 sur bg navy
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

const BLUE = "#1A47FF";
const RED = "#b42318";

const INNER: React.CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 24px" };
const SECTION_PAD = "56px 0";
const PROSE_MAX = "68ch";

/* ------------------------------------------------------------------ Données */

type Porte = {
  titre: string;
  corps: string;
  lien: string;
  href: string;
  disponible: boolean;
  alerte?: boolean;
};

// Statut des destinations (cf. brief §1) : seule la page NIS 2 existe. Les trois
// autres sont pilotées par `disponible: false` → carte non cliquable, sans flèche
// ni couleur de lien, plutôt qu'un lien mort. À rebasculer à true à leur création.
const PORTES: Porte[] = [
  {
    titre: "Une attaque est en cours",
    corps:
      "Rançongiciel, intrusion, exfiltration. Ce qu'il faut faire — et ne pas faire — dans les premières heures.",
    lien: "Cyberattaque et cybercriminalité",
    href: "/nos-domaines/cybersecurite/cyberattaque",
    disponible: false,
    alerte: true,
  },
  {
    titre: "Des données ont fuité",
    corps:
      "Qualification de la violation, notification à la CNIL, information des personnes concernées, exposition au contentieux.",
    lien: "Violation de données personnelles",
    href: "/nos-domaines/cybersecurite/violation-de-donnees",
    disponible: false,
  },
  {
    titre: "Un client exige des garanties",
    corps:
      "Questionnaire fournisseur, audit de sécurité, clauses contractuelles, conformité NIS 2.",
    lien: "NIS 2 et sous-traitance",
    href: "/nos-domaines/cybersecurite/nis2",
    disponible: true,
  },
  {
    titre: "Un prestataire informatique a fauté",
    corps:
      "Sauvegardes absentes, maintenance défaillante, obligation de sécurité non tenue, projet bloqué.",
    lien: "Responsabilité du prestataire informatique",
    href: "/nos-domaines/cybersecurite/responsabilite-prestataire-informatique",
    disponible: false,
  },
];

const EXPOSITIONS: { titre: string; corps: string }[] = [
  {
    titre: "Réglementaire",
    corps:
      "Une violation de données personnelles doit être notifiée à la CNIL dans les meilleurs délais et au plus tard sous soixante-douze heures lorsqu'elle présente un risque pour les droits et libertés des personnes ; les personnes concernées doivent être informées lorsque le risque est élevé (RGPD, art. 33 et 34). Une fois la transposition de NIS 2 achevée, un incident affectant une entité assujettie relèvera d'un circuit distinct, avec ses propres seuils et ses propres délais. Deux notifications, deux destinataires, deux rédactions.",
  },
  {
    titre: "Gouvernance",
    corps:
      "NIS 2 place la maîtrise du risque au niveau de l'organe de direction, appelé à approuver les mesures et à superviser leur mise en œuvre. Sans attendre l'entrée en vigueur du texte, les donneurs d'ordre exigent déjà cette implication formelle de la direction. L'incident cesse d'être un sujet délégable au service informatique.",
  },
  {
    titre: "Contractuelle",
    corps:
      "Qui répond de quoi entre l'entreprise, son prestataire informatique et son donneur d'ordre se joue dans des clauses écrites avant l'incident. Après, il est trop tard pour négocier un plafond de responsabilité ou une définition du périmètre de sécurité.",
  },
  {
    titre: "Pénale et probatoire",
    corps:
      "Dépôt de plainte, conservation des traces, arbitrage sur ce qui est communiqué et à qui. Les décisions prises dans les premières heures conditionnent ce qui pourra être établi ensuite.",
  },
];

const FRISE: { jalon: string; titre: string; corps: string }[] = [
  {
    jalon: "H+0",
    titre: "Isoler sans éteindre",
    corps:
      "Couper le réseau, laisser les machines sous tension. Éteindre efface la mémoire vive, et avec elle une partie de ce qui permettra d'établir le déroulement de l'attaque. C'est le réflexe recommandé par la doctrine de réponse à incident, sauf consigne contraire de l'équipe technique mobilisée.",
  },
  {
    jalon: "H+2",
    titre: "Cellule de crise",
    corps:
      "Direction, expert technique, avocat. Un seul canal de décision, un seul porte-parole. Les échanges opérationnels et les échanges couverts par le secret professionnel sont séparés dès ce moment.",
  },
  {
    jalon: "H+4",
    titre: "Qualification juridique",
    corps:
      "Des données personnelles sont-elles touchées ? Un service essentiel est-il interrompu ? Le contrat avec le donneur d'ordre impose-t-il une information immédiate ? C'est cette qualification qui détermine quelles obligations se déclenchent, et lesquelles ne se déclenchent pas.",
  },
  {
    jalon: "H+24",
    titre: "Premiers signalements",
    corps:
      "Information du donneur d'ordre, dépôt de plainte, déclaration à l'assureur. Ce qui est écrit ici sera relu plus tard, par la CNIL, par l'assureur ou par un juge.",
  },
  {
    jalon: "H+72",
    titre: "Notification à la CNIL",
    corps: "Et arbitrage sur l'information des personnes concernées.",
  },
];

/* ------------------------------------------------------------- Primitives UI */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: BLUE,
        margin: "0 0 8px",
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
      <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 600, color: LIGHT.text, margin: "0 0 10px" }}>
        {title}
      </h2>
      {sub ? (
        <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 720 }}>{sub}</p>
      ) : null}
    </>
  );
}

const BTN_PRIMARY: React.CSSProperties = {
  background: BLUE,
  color: "#fff",
  padding: "15px 28px",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  minHeight: 48,
  justifyContent: "center",
};

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `0.5px solid ${LIGHT.border}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`cyb-faq-${index}`}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          background: "none",
          border: "none",
          padding: "18px 0",
          textAlign: "left",
          cursor: "pointer",
          minHeight: 48,
        }}
      >
        <span style={{ display: "flex", gap: 14 }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: BLUE, flexShrink: 0, paddingTop: 2 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, lineHeight: 1.45 }}>{item.q}</span>
        </span>
        <span
          aria-hidden
          className="cyb-plus"
          style={{
            color: BLUE,
            fontSize: 20,
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      {/* La réponse reste dans le DOM même repliée (rendue une fois, masquée par
          `hidden`) : c'est ce texte qui porte la longue traîne et qui alimente
          le FAQPage. Aucune duplication. */}
      <div
        id={`cyb-faq-${index}`}
        hidden={!open}
        style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.7, margin: 0, padding: "0 0 20px 40px", maxWidth: 760 }}
      >
        {item.a}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Page */

export default function PilierClient() {
  return (
    <main
      style={{
        background: LIGHT.bg,
        color: LIGHT.text,
        fontFamily: "var(--ff-body)",
        maxWidth: 1200,
        margin: "0 auto",
        // La barre de navigation du site est fixe (`.laz-nav`, 54px, opaque).
        // Le bandeau incident étant le premier élément de la page, on décale le
        // contenu de la hauteur de cette barre pour qu'il ne passe pas dessous.
        paddingTop: 54,
      }}
    >
      <style>{`
        .cyb-plus { transition: transform 180ms ease; }
        .cyb-banner-text { display: flex; flex-direction: column; line-height: 1.35; }
        @media (min-width: 1024px) {
          .cyb-banner { min-height: 44px !important; }
          .cyb-banner-text { flex-direction: row; align-items: baseline; gap: 10px; }
        }
        .cyb-h1 { font-size: clamp(30px, 6vw, 60px); line-height: 1.08; }
        @media (prefers-reduced-motion: reduce) {
          .cyb-plus { transition: none; }
        }
      `}</style>

      {/* ===== 1. BANDEAU INCIDENT (en flux, jamais position:fixed) =====
          « Rappel prioritaire » remplace volontairement un délai chiffré
          (brief §9) : ne pas réintroduire de durée ici. */}
      <a
        href="tel:+33181706200"
        className="cyb-banner"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minHeight: 48,
          padding: "8px 24px",
          background: "#57100f",
          color: "#ffffff",
          textDecoration: "none",
          justifyContent: "center",
        }}
      >
        <i className="ti ti-phone" aria-hidden style={{ fontSize: 18, flexShrink: 0 }} />
        <span className="cyb-banner-text">
          <strong style={{ fontWeight: 700 }}>Incident en cours&nbsp;?</strong>
          <span style={{ color: "rgba(255,255,255,0.92)" }}>Rappel prioritaire · 01&nbsp;81&nbsp;70&nbsp;62&nbsp;00</span>
        </span>
        <span aria-hidden style={{ marginLeft: "auto", fontSize: 18, flexShrink: 0 }}>
          →
        </span>
      </a>

      {/* ===== 2. HÉRO ===== */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr]" style={{ ...INNER, gap: 40, alignItems: "center" }}>
          <div>
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7fa8ff",
                background: "rgba(26,71,255,0.25)",
                borderRadius: 8,
                padding: "4px 12px",
                marginBottom: 18,
              }}
            >
              Cybersécurité · Paris
            </span>
            <h1 className="cyb-h1" style={{ fontWeight: 600, color: "#ffffff", margin: "0 0 18px", overflowWrap: "break-word" }}>
              Avocat en cybersécurité
            </h1>
            <p style={{ fontSize: 15, color: DARK.muted, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 620 }}>
              Une attaque, une fuite de données, un prestataire défaillant ou un client qui exige des garanties : le
              risque numérique cesse d'être une affaire technique dès l'instant où il engage une responsabilité. Le
              cabinet intervient sur l'ensemble de cette chaîne, à Paris, avec un expert technique à ses côtés.
            </p>
            <div className="flex flex-col sm:flex-row" style={{ gap: 12 }}>
              <Link href="/contact" style={BTN_PRIMARY}>
                Être rappelé par un avocat <span aria-hidden>→</span>
              </Link>
              <a
                href="#approche"
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.85)",
                  padding: "15px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  textDecoration: "none",
                  border: `0.5px solid ${DARK.border}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 48,
                }}
              >
                Voir ce que nous produisons
              </a>
            </div>
          </div>

          {/* Aplat de marque (desktop) — décor, aucun texte structurant. */}
          <div
            className="hidden lg:flex"
            aria-hidden
            style={{
              aspectRatio: "4 / 3",
              borderRadius: 16,
              border: `0.5px solid ${DARK.border}`,
              background: "radial-gradient(120% 120% at 15% 10%, rgba(26,71,255,0.35) 0%, rgba(10,15,46,0) 60%), #0c1236",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 24,
            }}
          >
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7fa8ff" }}>
              Droit · Technique
            </span>
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 44, fontWeight: 500, color: "#ffffff", lineHeight: 1.1, marginTop: 6 }}>
              72<span style={{ color: "#7fa8ff" }}>h</span>
            </span>
          </div>
        </div>
      </section>

      {/* ===== 3. QUELLE EST VOTRE SITUATION ? — 4 portes ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="Par où commencer" title="Quelle est votre situation ?" />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
            {PORTES.map((p) => {
              const inner = (
                <>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: LIGHT.text, margin: "0 0 8px", lineHeight: 1.3 }}>
                    {p.alerte ? (
                      <i className="ti ti-alert-triangle" aria-hidden style={{ color: RED, fontSize: 17, marginRight: 8 }} />
                    ) : null}
                    {p.titre}
                  </h3>
                  <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 14px" }}>{p.corps}</p>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: p.disponible ? BLUE : LIGHT.faint,
                    }}
                  >
                    {p.lien}
                    {p.disponible ? <span aria-hidden> →</span> : null}
                  </span>
                </>
              );
              const cardStyle: React.CSSProperties = {
                display: "block",
                background: LIGHT.panel,
                border: p.alerte ? `1.5px solid ${RED}` : `0.5px solid ${LIGHT.border}`,
                borderRadius: 12,
                padding: 22,
                height: "100%",
                textDecoration: "none",
              };
              return p.disponible ? (
                <Link key={p.titre} href={p.href} style={cardStyle}>
                  {inner}
                </Link>
              ) : (
                // Non cliquable tant que la page n'existe pas : ni lien, ni flèche,
                // ni couleur de lien (brief §1).
                <div key={p.titre} style={cardStyle}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. UN INCIDENT, QUATRE EXPOSITIONS SIMULTANÉES ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Ce qui est en jeu"
            title="Un incident, quatre expositions simultanées"
            sub="Elles se déclenchent en même temps, relèvent d'autorités différentes et obéissent à des calendriers qui ne coïncident pas. C'est cette simultanéité, plus que chaque régime pris isolément, qui met les directions en difficulté."
          />
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 0 }}>
            {EXPOSITIONS.map((e) => (
              // Blocs séparés par des filets, pas de cartes ombrées (brief §4).
              <div key={e.titre} style={{ borderTop: `0.5px solid ${LIGHT.border}`, padding: "20px 0", marginRight: 0 }} className="cyb-expo">
                <h3 style={{ fontSize: 15, fontWeight: 600, color: LIGHT.text, margin: "0 0 8px" }}>{e.titre}</h3>
                <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.65, margin: 0, maxWidth: PROSE_MAX }}>{e.corps}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. LES 72 PREMIÈRES HEURES — frise <ol> (disposition verticale) =====
          Disposition verticale retenue à tous les points de rupture : les corps
          H+0 et H+4 sont trop longs pour une frise horizontale à cinq colonnes
          sans réduire la taille du texte, ce que le brief interdit (§5, repli
          autorisé sur la verticale). */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead label="En cas d'attaque" title="Les 72 premières heures" />
          <p style={{ fontSize: 15, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.7, margin: "-16px 0 28px" }}>
            La séquence appliquée, et l'erreur la plus fréquente à chaque étape.
          </p>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {FRISE.map((f, i) => {
              const last = i === FRISE.length - 1;
              return (
                <li key={f.jalon} style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 56, flexShrink: 0, textAlign: "right" }}>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 13, fontWeight: 600, color: BLUE }}>{f.jalon}</span>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      flex: 1,
                      borderLeft: last ? "2px solid transparent" : `2px solid ${LIGHT.border}`,
                      paddingLeft: 22,
                      paddingBottom: last ? 0 : 28,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: -6,
                        top: 4,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: BLUE,
                      }}
                    />
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: LIGHT.text, margin: "0 0 6px", lineHeight: 1.3 }}>{f.titre}</h3>
                    <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.65, margin: 0, maxWidth: PROSE_MAX }}>{f.corps}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ===== 6. CE QUE « MESURES APPROPRIÉES » VEUT DIRE CONCRÈTEMENT ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>L&apos;obligation de sécurité</Eyebrow>
          <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 600, color: LIGHT.text, margin: "0 0 18px", maxWidth: PROSE_MAX }}>
            Ce que « mesures appropriées » veut dire concrètement
          </h2>
          <div style={{ maxWidth: PROSE_MAX }}>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              L&apos;article 32 du RGPD impose des mesures techniques et organisationnelles appropriées au risque. La
              formule paraît souple ; la pratique de la CNIL l&apos;est nettement moins.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              Dans sa délibération du 28 juillet 2020 (n° SAN-2020-003), la CNIL a caractérisé un manquement à cette
              obligation sur des points d&apos;une grande banalité opérationnelle : robustesse insuffisante des mots de
              passe, absence de dispositif de blocage après des tentatives répétées d&apos;authentification,
              enregistrements de conversations conservés au-delà du nécessaire, durées de conservation non
              proportionnées.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              L&apos;enseignement est direct. L&apos;obligation de sécurité ne se démontre pas par une politique
              générale, mais par des paramètres vérifiables : longueur et complexité exigées, comptage des échecs
              d&apos;authentification, journalisation, durées de conservation effectivement appliquées. C&apos;est ce
              niveau de détail qui est examiné en contrôle, et c&apos;est celui auquel les documents produits par le
              cabinet sont rédigés.
            </p>
            <p style={{ fontSize: 12, color: LIGHT.faint, lineHeight: 1.5, margin: "10px 0 0", fontStyle: "italic" }}>
              CNIL, délibération du 28 juillet 2020, n° SAN-2020-003.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 7. UNE CONTRAINTE DÉJÀ LÀ, UN TEXTE QUI NE L'EST PAS ENCORE =====
          TODO (cabinet) : l'état de la transposition de NIS 2 est arrêté à l'été
          2026. Si la loi (résilience des infrastructures critiques / transposition
          NIS 2, REC, DORA) a été promulguée depuis, cette section doit être
          réécrite par le cabinet. */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>NIS 2</Eyebrow>
          <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 600, color: LIGHT.text, margin: "0 0 18px", maxWidth: PROSE_MAX }}>
            Une contrainte déjà là, un texte qui ne l&apos;est pas encore
          </h2>
          <div style={{ maxWidth: PROSE_MAX }}>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              La directive (UE) 2022/2555, dite NIS 2, devait être transposée par les États membres au plus tard le 17
              octobre 2024. La France a choisi un véhicule législatif large — le projet de loi relatif à la résilience
              des infrastructures critiques et au renforcement de la cybersécurité, qui transpose simultanément NIS 2,
              la directive REC et le volet directive de DORA. Adopté par le Sénat le 12 mars 2025, examiné en commission
              spéciale à l&apos;Assemblée nationale le 10 septembre 2025, ce texte n&apos;était pas promulgué à
              l&apos;été 2026. Le 8 juillet 2026, la Commission européenne a saisi la Cour de justice pour défaut de
              notification des mesures de transposition, en demandant des sanctions financières.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              Il faut en tirer une conséquence que peu de publications énoncent clairement : les obligations NIS 2 ne
              sont pas encore juridiquement exigibles en France, et les seuils, listes d&apos;entités et procédures de
              déclaration dépendront de décrets à paraître après la loi.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              Cela ne réduit pas la contrainte, cela en déplace la source. La pression qui s&apos;exerce aujourd&apos;hui
              sur les entreprises n&apos;est pas réglementaire, elle est contractuelle : les grands donneurs d&apos;ordre,
              eux, ont anticipé, et répercutent leurs exigences de sécurité sur leurs fournisseurs par questionnaires,
              audits et clauses. Un sous-traitant peut ainsi perdre un marché pour non-conformité à un texte qui
              n&apos;est pas encore applicable.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              Deux enjeux se préparent dès maintenant. D&apos;abord répondre à ces exigences contractuelles sans
              souscrire des engagements que l&apos;entreprise ne pourra pas tenir, ni s&apos;obliger au-delà de ce que la
              loi imposera. Ensuite anticiper l&apos;articulation avec le RGPD : un même incident peut relever des deux
              régimes, avec deux autorités, deux calendriers et deux logiques de sanction.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 20px" }}>
              Selon l&apos;ANSSI, le périmètre attendu se situe entre dix mille et quinze mille entités, contre environ
              cinq cents sous NIS 1.
            </p>
            <Link href="/nos-domaines/cybersecurite/nis2" style={{ fontSize: 14, fontWeight: 600, color: BLUE, textDecoration: "none" }}>
              Le détail des obligations pour les PME et sous-traitants <span aria-hidden>→</span> NIS 2 et sous-traitance
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 8. UN AVOCAT ET UN EXPERT TECHNIQUE, ENSEMBLE ===== */}
      <section id="approche" style={{ background: LIGHT.bg, padding: SECTION_PAD, scrollMarginTop: 80 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ ...INNER, gap: 40, alignItems: "start" }}>
          <div>
            <Eyebrow>Notre approche</Eyebrow>
            <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 600, color: LIGHT.text, margin: "0 0 18px" }}>
              Un avocat et un expert technique, ensemble
            </h2>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px", maxWidth: PROSE_MAX }}>
              L&apos;analyse juridique d&apos;un incident ne vaut que ce que valent les faits sur lesquels elle repose.
              Journaux d&apos;accès, état réel des sauvegardes, comptes encore actifs, périmètre effectif des droits :
              ces éléments ne se déduisent pas d&apos;un entretien, ils se constatent.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 22px", maxWidth: PROSE_MAX }}>
              Le cabinet travaille pour cette raison en binôme, l&apos;analyse juridique et l&apos;audit technique menés
              ensemble plutôt que successivement. Les documents produits décrivent le système d&apos;information réel de
              l&apos;entreprise, et non un système générique.
            </p>
            <Link
              href="/nos-domaines/cybersecurite/nis2#obligations"
              style={{
                display: "block",
                background: LIGHT.panel2,
                border: `0.5px solid ${LIGHT.border}`,
                borderRadius: 12,
                padding: 18,
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.6 }}>
                <strong style={{ color: LIGHT.text, fontWeight: 600 }}>Les documents que nous produisons</strong> — PSSI,
                clauses contractuelles, PCA/PRA, rapport d&apos;écart.
              </span>
              <span style={{ display: "block", marginTop: 8, fontSize: 13, fontWeight: 600, color: BLUE }}>
                Voir les livrables <span aria-hidden>→</span>
              </span>
            </Link>
          </div>

          {/* Portraits : composant de carte de l'équipe réutilisé. Deux côte à
              côte, jamais trois par ligne (brief §4). */}
          <div className="grid grid-cols-2" style={{ gap: 12 }}>
            <MembreCarte
              membre={{ slug: "alexandre", role: "Analyse juridique de l'incident", tags: ["Réponse à incident", "RGPD", "NIS 2"] }}
            />
            <MembreCarte
              membre={{ slug: "khalid", role: "Audit technique du système d'information", tags: ["Forensic", "Sauvegardes", "Journalisation"] }}
            />
          </div>
        </div>
      </section>

      {/* ===== 9. QUESTIONS FRÉQUENTES ===== */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={{ ...INNER, maxWidth: 820 }}>
          <SectionHead label="FAQ" title="Questions fréquentes" />
          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. APPEL À L'ACTION ===== */}
      <section style={{ background: LIGHT.bg, padding: "8px 0 64px" }}>
        <div style={INNER}>
          <div
            style={{
              background: DARK.bg,
              borderRadius: 16,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7fa8ff", margin: "0 0 10px" }}>
              Quelle que soit la situation
            </p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600, color: "#ffffff", margin: "0 0 10px" }}>
              Parlons de votre situation
            </h2>
            <p style={{ fontSize: 15, color: DARK.muted, lineHeight: 1.7, margin: "0 auto 26px", maxWidth: 520 }}>
              Premier échange d&apos;une heure, sans engagement, pour qualifier votre exposition.
            </p>
            <div className="flex flex-col sm:flex-row" style={{ gap: 12, justifyContent: "center" }}>
              <Link href="/contact" style={BTN_PRIMARY}>
                Être rappelé par un avocat <span aria-hidden>→</span>
              </Link>
              <a
                href="tel:+33181706200"
                style={{
                  background: "transparent",
                  color: "#ffffff",
                  padding: "15px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: `0.5px solid ${DARK.border}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minHeight: 48,
                }}
              >
                <i className="ti ti-phone" aria-hidden style={{ fontSize: 16 }} />
                01&nbsp;81&nbsp;70&nbsp;62&nbsp;00
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
