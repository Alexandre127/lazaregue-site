"use client";

import Image from "next/image";
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

// Statut des destinations (bloc H de l'amendement) :
//  — « attaque en cours » est active et pointe vers la page cybercriminalité,
//    désormais en ligne ;
//  — NIS 2 est active ;
//  — les deux autres restent à venir → carte non cliquable + mention « PAGE À
//    VENIR » (bloc H), plutôt qu'un lien mort. À rebasculer à `disponible: true`
//    et à repointer sur leur URL propre le jour de leur création.
const PORTES: Porte[] = [
  {
    titre: "Une attaque est en cours",
    corps:
      "Rançongiciel, intrusion, exfiltration. Ce qu'il faut faire — et ne pas faire — dans les premières heures.",
    lien: "Cyberattaque et cybercriminalité",
    href: "/nos-domaines/cybercriminalite",
    disponible: true,
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

// Bloc C : quatre expositions. `precision` et `horloge` alimentent le schéma ;
// `corps` (texte d'origine inchangé) alimente le dépliant « le détail ».
const EXPOSITIONS: {
  branche: string;
  precision: string;
  horloge: string;
  corps: string;
  coin: "tl" | "tr" | "bl" | "br";
}[] = [
  {
    branche: "Réglementaire",
    precision: "RGPD · CNIL · obligations sectorielles",
    horloge: "72 h",
    coin: "tl",
    corps:
      "Une violation de données personnelles doit être notifiée à la CNIL dans les meilleurs délais et au plus tard sous soixante-douze heures lorsqu'elle présente un risque pour les droits et libertés des personnes ; les personnes concernées doivent être informées lorsque le risque est élevé (RGPD, art. 33 et 34). Une fois la transposition de NIS 2 achevée, un incident affectant une entité assujettie relèvera d'un circuit distinct, avec ses propres seuils et ses propres délais. Deux notifications, deux destinataires, deux rédactions.",
  },
  {
    branche: "Gouvernance",
    precision: "Organe de direction",
    horloge: "Première décision",
    coin: "tr",
    corps:
      "NIS 2 place la maîtrise du risque au niveau de l'organe de direction, appelé à approuver les mesures et à superviser leur mise en œuvre. Sans attendre l'entrée en vigueur du texte, les donneurs d'ordre exigent déjà cette implication formelle de la direction. L'incident cesse d'être un sujet délégable au service informatique.",
  },
  {
    branche: "Contractuelle",
    precision: "Donneur d'ordre, prestataire",
    horloge: "Déjà écrit",
    coin: "bl",
    corps:
      "Qui répond de quoi entre l'entreprise, son prestataire informatique et son donneur d'ordre se joue dans des clauses écrites avant l'incident. Après, il est trop tard pour négocier un plafond de responsabilité ou une définition du périmètre de sécurité.",
  },
  {
    branche: "Pénale et probatoire",
    precision: "Parquet, preuves",
    horloge: "Premières heures",
    coin: "br",
    corps:
      "Dépôt de plainte, conservation des traces, arbitrage sur ce qui est communiqué et à qui. Les décisions prises dans les premières heures conditionnent ce qui pourra être établi ensuite.",
  },
];

// Coordonnées du schéma SVG desktop (viewBox 900×480). Le nœud central occupe
// (360,200)–(540,280) ; chaque encadré (250×110) est placé à un coin. Les
// connecteurs partent du BORD du nœud et s'arrêtent au BORD de l'encadré visé —
// calculés pour ne croiser aucune forme.
const SVG_BOX: Record<"tl" | "tr" | "bl" | "br", { x: number; y: number }> = {
  tl: { x: 20, y: 20 },
  tr: { x: 630, y: 20 },
  bl: { x: 20, y: 350 },
  br: { x: 630, y: 350 },
};
const SVG_CONNECTEURS: [number, number, number, number][] = [
  [376, 200, 247, 130], // nœud → réglementaire (haut-gauche)
  [524, 200, 653, 130], // nœud → gouvernance (haut-droite)
  [376, 280, 247, 350], // nœud → contractuelle (bas-gauche)
  [524, 280, 653, 350], // nœud → pénale et probatoire (bas-droite)
];

// Bloc E : manquements retenus par la CNIL (délibération SAN-2020-003), sortis
// du paragraphe et posés en pièce.
const CNIL_MANQUEMENTS = [
  "Robustesse insuffisante des mots de passe",
  "Aucun blocage après tentatives répétées d'authentification",
  "Enregistrements de conversations conservés au-delà du nécessaire",
  "Durées de conservation non proportionnées",
];

// Bloc F1 : chronologie de la transposition, en cartouche. La dernière ligne
// (saisine CJUE) porte un accent visuel distinct.
const NIS2_TIMELINE: { date: string; evenement: string; accent?: boolean }[] = [
  { date: "Oct. 2024", evenement: "Échéance européenne de transposition" },
  { date: "Mars 2025", evenement: "Adoption au Sénat" },
  { date: "Sept. 2025", evenement: "Commission spéciale à l'Assemblée nationale" },
  {
    date: "Juil. 2026",
    evenement: "La Commission européenne saisit la CJUE pour défaut de transposition",
    accent: true,
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

/* Bloc C — schéma « un incident, quatre expositions » + dépliant du détail.
   Un seul jeu de cartes, repositionné par CSS : croix en desktop, vertical en
   mobile (pas de duplication de texte). Accessible via role/aria-label ; le SVG
   des connecteurs est purement décoratif (aria-hidden). */
function ExpositionsSection() {
  const [detail, setDetail] = useState(false);
  return (
    <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
      <div style={INNER}>
        <SectionHead
          label="Ce qui est en jeu"
          title="Un incident, quatre expositions simultanées"
          sub="Elles se déclenchent en même temps, relèvent d'autorités différentes et obéissent à des calendriers qui ne coïncident pas. C'est cette simultanéité, plus que chaque régime pris isolément, qui met les directions en difficulté."
        />

        {/* Desktop : un SEUL <svg>. Connecteurs <line> tracés d'abord (derrière),
            nœud et encadrés en foreignObject par-dessus : les traits rejoignent le
            bord des formes sans passer dessous. */}
        <div className="expo-svg-wrap">
          <svg
            className="expo-svg"
            viewBox="0 0 900 480"
            role="img"
            aria-labelledby="expo-svg-titre expo-svg-desc"
            preserveAspectRatio="xMidYMid meet"
          >
            <title id="expo-svg-titre">Un incident déclenche quatre expositions simultanées</title>
            <desc id="expo-svg-desc">
              Au jour zéro, un incident se ramifie en quatre expositions simultanées : réglementaire (RGPD, CNIL, dans
              les 72 heures), gouvernance (organe de direction, dès la première décision), contractuelle (donneur
              d&apos;ordre et prestataire, déjà écrite avant l&apos;incident), pénale et probatoire (parquet et preuves,
              dès les premières heures).
            </desc>
            {SVG_CONNECTEURS.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LIGHT.muted} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            ))}
            <foreignObject x={360} y={200} width={180} height={80}>
              <div className="expo-svg-node">
                <span className="expo-svg-node-titre">Un incident</span>
                <span className="expo-svg-node-sub">jour zéro</span>
              </div>
            </foreignObject>
            {EXPOSITIONS.map((e) => {
              const p = SVG_BOX[e.coin];
              return (
                <foreignObject key={e.branche} x={p.x} y={p.y} width={250} height={110}>
                  <div className="expo-svg-box">
                    <span className="expo-svg-titre">{e.branche}</span>
                    <span className="expo-svg-precision">{e.precision}</span>
                    <span className="expo-svg-horloge">{e.horloge}</span>
                  </div>
                </foreignObject>
              );
            })}
            <text x={450} y={472} textAnchor="middle" className="expo-svg-legend">
              délais propres à chaque régime
            </text>
          </svg>
        </div>

        {/* Mobile : vertical. Le filet et les pastilles jouent le rôle des traits. */}
        <div
          className="expo-vert"
          role="group"
          aria-label="Un incident, au jour zéro, déclenche quatre expositions simultanées : réglementaire dans les 72 heures, gouvernance dès la première décision, contractuelle déjà écrite avant l'incident, pénale et probatoire dès les premières heures."
        >
          <div className="expo-node" aria-hidden>
            <span className="expo-node-kicker">Jour zéro</span>
            <span className="expo-node-titre">Un incident</span>
          </div>
          <div className="expo-cards">
            {EXPOSITIONS.map((e) => (
              <div key={e.branche} className="expo-card">
                <h3 className="expo-vert-titre">{e.branche}</h3>
                <p className="expo-vert-precision">{e.precision}</p>
                <span className="expo-vert-horloge">{e.horloge}</span>
              </div>
            ))}
          </div>
          <p className="expo-legende expo-legende--mobile">délais propres à chaque régime.</p>
        </div>

        {/* Dépliant : les quatre paragraphes d'origine, un panneau par branche. */}
        <div style={{ marginTop: 28, borderTop: `0.5px solid ${LIGHT.border}` }}>
          <button
            type="button"
            onClick={() => setDetail((v) => !v)}
            aria-expanded={detail}
            aria-controls="expo-detail"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              background: "none",
              border: "none",
              padding: "16px 0",
              textAlign: "left",
              cursor: "pointer",
              minHeight: 48,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text }}>Le détail de chaque exposition</span>
            <span aria-hidden className="cyb-plus" style={{ color: BLUE, fontSize: 20, lineHeight: 1, flexShrink: 0, transform: detail ? "rotate(45deg)" : "none" }}>
              +
            </span>
          </button>
          <div id="expo-detail" hidden={!detail} style={{ paddingBottom: 8 }}>
            {EXPOSITIONS.map((e) => (
              <div key={e.branche} style={{ padding: "4px 0 18px" }}>
                <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, margin: "0 0 6px" }}>
                  {e.branche}
                </p>
                <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.65, margin: 0, maxWidth: PROSE_MAX }}>{e.corps}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
          style={{ color: BLUE, fontSize: 20, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(45deg)" : "none" }}
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
        {item.lien ? (
          <Link
            href={item.lien.href}
            style={{ display: "inline-block", marginTop: 10, fontSize: 13, fontWeight: 600, color: BLUE, textDecoration: "none" }}
          >
            {item.lien.label} <span aria-hidden>→</span>
          </Link>
        ) : null}
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
        @media (prefers-reduced-motion: reduce) { .cyb-plus { transition: none; } }

        /* ---- Bloc B : héro avec photographie ---- */
        .cyb-hero-grid { display: grid; }
        .cyb-hero-photo { position: relative; width: 100%; height: 150px; }
        .cyb-hero-img { object-position: center bottom; }
        /* Raccord du noir de la photo au fond navy du bloc texte, sans rupture. */
        .cyb-hero-fade { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(to bottom, rgba(10,15,46,0) 55%, ${DARK.bg} 100%); }
        .cyb-hero-text { padding: 30px 24px 44px; }
        @media (min-width: 1024px) {
          .cyb-hero-grid { grid-template-columns: 55fr 45fr; align-items: stretch; }
          .cyb-hero-photo { order: 2; height: auto; min-height: 440px; }
          .cyb-hero-img { object-position: center; }
          .cyb-hero-fade { background: linear-gradient(to left, rgba(10,15,46,0) 62%, ${DARK.bg} 100%); }
          .cyb-hero-text { order: 1; padding: 56px 40px 56px 24px; display: flex; flex-direction: column; justify-content: center; }
        }

        /* ---- Schéma des quatre expositions ----
           Desktop : un SEUL <svg> (nœud + encadrés en foreignObject + connecteurs
           <line>) — les traits rejoignent les bords réels des formes. Mobile : la
           disposition verticale HTML (filet + pastilles tiennent lieu de traits). */
        .expo-svg-wrap { display: none; margin-top: 24px; }
        .expo-svg { width: 100%; height: auto; display: block; }
        .expo-svg-node { height: 100%; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; background: ${DARK.bg}; border: 1px solid ${BLUE}; border-radius: 10px; color: #fff; text-align: center; }
        .expo-svg-node-titre { font-size: 15px; font-weight: 600; }
        .expo-svg-node-sub { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7fa8ff; }
        .expo-svg-box { height: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 5px; background: #fff; border: 0.5px solid rgba(0,0,0,0.14); border-radius: 10px; padding: 14px 16px; }
        .expo-svg-titre { font-size: 14px; font-weight: 600; color: ${LIGHT.text}; line-height: 1.25; }
        .expo-svg-precision { font-size: 12px; color: ${LIGHT.muted}; line-height: 1.4; }
        .expo-svg-horloge { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: ${BLUE}; margin-top: auto; }
        .expo-svg-legend { fill: ${LIGHT.faint}; font-size: 12px; font-style: italic; }

        .expo-vert { margin-top: 12px; }
        .expo-node { display: flex; flex-direction: column; align-items: center; gap: 2px; width: max-content; max-width: 220px; margin: 0 auto 16px; background: ${DARK.bg}; color: #fff; border: 1px solid ${BLUE}; border-radius: 10px; padding: 12px 18px; text-align: center; }
        .expo-node-kicker { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #7fa8ff; }
        .expo-node-titre { font-size: 15px; font-weight: 600; }
        .expo-cards { position: relative; display: flex; flex-direction: column; gap: 12px; padding-left: 26px; }
        .expo-cards::before { content: ""; position: absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; background: ${BLUE}; opacity: 0.4; }
        .expo-card { position: relative; background: #fff; border: 0.5px solid ${LIGHT.border}; border-radius: 10px; padding: 14px 16px; }
        .expo-card::before { content: ""; position: absolute; left: -25px; top: 18px; width: 12px; height: 12px; border-radius: 50%; background: ${BLUE}; border: 2px solid ${LIGHT.bg}; }
        .expo-vert-titre { font-size: 15px; font-weight: 600; color: ${LIGHT.text}; margin: 0 0 4px; }
        .expo-vert-precision { font-size: 12.5px; color: ${LIGHT.muted}; line-height: 1.5; margin: 0 0 8px; }
        .expo-vert-horloge { display: inline-block; font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: ${BLUE}; background: rgba(26,71,255,0.08); border-radius: 6px; padding: 2px 8px; }
        .expo-legende { font-size: 12px; color: ${LIGHT.faint}; font-style: italic; margin: 10px 0 0; }
        @media (min-width: 1024px) {
          .expo-svg-wrap { display: block; }
          .expo-vert, .expo-legende--mobile { display: none; }
        }

        /* ---- Bloc E : pièce CNIL ---- */
        .cnil-piece { max-width: 68ch; background: ${LIGHT.panel2}; border: 0.5px solid rgba(0,0,0,0.14); border-radius: 10px; padding: 16px 18px; margin: 8px 0 18px; }
        .cnil-piece-head { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${LIGHT.muted}; margin: 0 0 8px; }
        .cnil-piece-list { margin: 0; padding: 0; list-style: none; }
        .cnil-piece-list li { position: relative; font-size: 14px; color: ${LIGHT.text}; line-height: 1.5; padding: 7px 0 7px 18px; border-top: 0.5px solid rgba(0,0,0,0.08); }
        .cnil-piece-list li:first-child { border-top: none; }
        .cnil-piece-list li::before { content: "—"; position: absolute; left: 0; color: ${BLUE}; }

        /* ---- Bloc F1 : cartouche chronologie NIS 2 ---- */
        .nis2-cartouche { max-width: 68ch; background: ${DARK.bg}; color: #fff; border-radius: 12px; padding: 20px 22px; margin: 8px 0 16px; }
        .nis2-cartouche-head { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #7fa8ff; margin: 0 0 12px; }
        .nis2-row { display: grid; grid-template-columns: 96px 1fr; gap: 14px; padding: 9px 0; border-top: 0.5px solid rgba(255,255,255,0.12); }
        .nis2-row:first-of-type { border-top: none; }
        .nis2-row dt { font-family: var(--ff-mono); font-size: 12px; color: rgba(255,255,255,0.85); margin: 0; }
        .nis2-row dd { font-size: 13.5px; color: rgba(255,255,255,0.8); line-height: 1.5; margin: 0; }
        .nis2-row--accent dt, .nis2-row--accent dd { color: #ff9d9d; font-weight: 500; }
        .nis2-cartouche-foot { margin: 12px 0 0; padding-top: 12px; border-top: 0.5px solid rgba(255,255,255,0.2); font-size: 13px; font-weight: 500; color: #fff; }
      `}</style>

      {/* ===== 1. BANDEAU INCIDENT (en flux, jamais position:fixed) =====
          « Rappel prioritaire » remplace volontairement un délai chiffré :
          ne pas réintroduire de durée ici. */}
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

      {/* ===== 2. HÉRO (Bloc B) =====
          Deux colonnes 55/45 en desktop (texte à gauche, photo à droite en cover
          sur toute la hauteur) ; bande de 150 px en haut sur mobile, recadrée sur
          le bas de l'image (object-position: center bottom) pour que la zone
          éclairée ne passe pas derrière le titre. L'aplat « 72 h » a disparu. */}
      <section style={{ background: DARK.bg, color: DARK.text, overflow: "hidden" }}>
        <div className="cyb-hero-grid" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="cyb-hero-photo">
            <Image
              src="/images/cyber-hero-facade.jpg"
              alt="Façade d'un immeuble de bureaux la nuit, un seul étage éclairé"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="cyb-hero-img"
              style={{ objectFit: "cover" }}
            />
            <span className="cyb-hero-fade" aria-hidden />
          </div>

          <div className="cyb-hero-text">
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
                alignSelf: "flex-start",
              }}
            >
              Cybersécurité · Paris
            </span>
            <h1 className="cyb-h1" style={{ fontWeight: 600, color: "#ffffff", margin: "0 0 18px", overflowWrap: "break-word" }}>
              Avocat en cybersécurité
            </h1>
            <p style={{ fontSize: 15, color: DARK.muted, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 560 }}>
              Une attaque, une fuite de données, un prestataire défaillant ou un client qui exige des garanties : le
              risque numérique cesse d'être une affaire technique dès l'instant où il engage une responsabilité. Le
              cabinet intervient sur l'ensemble de cette chaîne, à Paris, avec un expert technique à ses côtés. Le
              cabinet organise le risque avant qu'il ne survienne, et défend l'entreprise lorsqu'il survient.
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
                  <span style={{ fontSize: 13, fontWeight: 600, color: p.disponible ? BLUE : LIGHT.faint }}>
                    {p.lien}
                    {p.disponible ? <span aria-hidden> →</span> : null}
                  </span>
                  {/* Bloc H : mention explicite pour les pages non encore construites. */}
                  {!p.disponible ? (
                    <span
                      style={{
                        display: "block",
                        marginTop: 12,
                        fontFamily: "var(--ff-mono)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: LIGHT.faint,
                      }}
                    >
                      Page à venir
                    </span>
                  ) : null}
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
                <div key={p.titre} style={cardStyle}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. UN INCIDENT, QUATRE EXPOSITIONS — schéma + dépliant (bloc C) ===== */}
      <ExpositionsSection />

      {/* ===== 5. LES 72 HEURES QUITTENT LA PAGE (bloc D) =====
          La chronologie H+0 → H+72 est désormais la propriété de la page
          cybercriminalité (en ligne) : renvoi en deux lignes. */}
      <section style={{ background: LIGHT.bg, padding: "0 0 56px" }}>
        <div style={INNER}>
          <div style={{ borderLeft: `2px solid ${BLUE}`, paddingLeft: 20, maxWidth: PROSE_MAX }}>
            <p style={{ fontSize: 16, color: LIGHT.text, lineHeight: 1.6, margin: "0 0 10px" }}>
              Ce qui se décide dans les premières heures conditionne ce qui pourra être établi ensuite — et relève du
              terrain pénal.
            </p>
            <Link href="/nos-domaines/cybercriminalite" style={{ fontSize: 14, fontWeight: 600, color: BLUE, textDecoration: "none" }}>
              Les 72 premières heures <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 6. CE QUE « MESURES APPROPRIÉES » VEUT DIRE CONCRÈTEMENT (bloc E) ===== */}
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
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 4px" }}>
              Dans sa délibération du 28 juillet 2020 (n° SAN-2020-003), la CNIL a caractérisé un manquement à cette
              obligation sur des points d&apos;une grande banalité opérationnelle.
            </p>
            {/* Bloc E : l'énumération sort du paragraphe et devient une pièce. */}
            <div className="cnil-piece">
              <p className="cnil-piece-head">CNIL · SAN-2020-003 · Manquements retenus</p>
              <ul className="cnil-piece-list">
                {CNIL_MANQUEMENTS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
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

      {/* ===== 7. UNE CONTRAINTE DÉJÀ LÀ, UN TEXTE QUI NE L'EST PAS ENCORE (bloc F) =====
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

          {/* F1 : cartouche de chronologie (absorbe le paragraphe législatif). */}
          <div className="nis2-cartouche">
            <p className="nis2-cartouche-head">Où en est la transposition</p>
            <dl style={{ margin: 0 }}>
              {NIS2_TIMELINE.map((t) => (
                <div key={t.date} className={`nis2-row${t.accent ? " nis2-row--accent" : ""}`}>
                  <dt>{t.date}</dt>
                  <dd>{t.evenement}</dd>
                </div>
              ))}
            </dl>
            <p className="nis2-cartouche-foot">
              Les obligations ne sont pas encore juridiquement exigibles en France.
            </p>
          </div>

          {/* F2 : le lien remonte immédiatement sous le cartouche. */}
          <Link
            href="/nos-domaines/cybersecurite/nis2"
            style={{ display: "inline-block", fontSize: 14, fontWeight: 600, color: BLUE, textDecoration: "none", margin: "0 0 20px" }}
          >
            Le détail des obligations pour les PME et sous-traitants <span aria-hidden>→</span> NIS 2 et sous-traitance
          </Link>

          {/* F3 : texte condensé — deux paragraphes (phrases conservées telles quelles). */}
          <div style={{ maxWidth: PROSE_MAX }}>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
              Il faut en tirer une conséquence que peu de publications énoncent clairement : les obligations NIS 2 ne
              sont pas encore juridiquement exigibles en France, et les seuils, listes d&apos;entités et procédures de
              déclaration dépendront de décrets à paraître après la loi.
            </p>
            <p style={{ fontSize: 16, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>
              Cela ne réduit pas la contrainte, cela en déplace la source. La pression qui s&apos;exerce
              aujourd&apos;hui sur les entreprises n&apos;est pas réglementaire, elle est contractuelle : les grands
              donneurs d&apos;ordre, eux, ont anticipé, et répercutent leurs exigences de sécurité sur leurs
              fournisseurs par questionnaires, audits et clauses. Un sous-traitant peut ainsi perdre un marché pour
              non-conformité à un texte qui n&apos;est pas encore applicable. Deux enjeux se préparent dès maintenant.
              D&apos;abord répondre à ces exigences contractuelles sans souscrire des engagements que l&apos;entreprise
              ne pourra pas tenir, ni s&apos;obliger au-delà de ce que la loi imposera. Ensuite anticiper
              l&apos;articulation avec le RGPD : un même incident peut relever des deux régimes, avec deux autorités,
              deux calendriers et deux logiques de sanction. Selon l&apos;ANSSI, le périmètre attendu se situe entre dix
              mille et quinze mille entités, contre environ cinq cents sous NIS 1.
            </p>
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
              style={{ display: "block", background: LIGHT.panel2, border: `0.5px solid ${LIGHT.border}`, borderRadius: 12, padding: 18, textDecoration: "none" }}
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
              côte, jamais trois par ligne. */}
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

      {/* ===== 9. QUESTIONS FRÉQUENTES (bloc G) ===== */}
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
          <div style={{ background: DARK.bg, borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
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
