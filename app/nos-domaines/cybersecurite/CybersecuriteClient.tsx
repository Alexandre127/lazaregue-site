"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const DARK = {
  bg: "#0a0f2e",
  panel: "#11163a",
  text: "#FFFFFF",
  muted: "rgba(255,255,255,0.65)",
  border: "rgba(255,255,255,0.2)",
  borderBlue: "rgba(26,71,255,0.25)",
};

const LIGHT = {
  bg: "#f8f8f6",
  panel: "#ffffff",
  panel2: "#f1f1ee",
  text: "#1a1a1a",
  muted: "#4a4a4a",
  faint: "#6a6a6a",
  border: "rgba(0,0,0,0.1)",
  borderBlue: "rgba(26,71,255,0.22)",
};

const BLUE = "#1A47FF";

const INNER: React.CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 24px" };
const SECTION_PAD = "56px 0";

const TEST_QUESTIONS = [
  {
    q: "1 — Mon client exerce-t-il dans un secteur critique ?",
    a: "Énergie, eau, transports, santé, banque, infrastructure numérique, administrations publiques, industrie critique... Si oui, il est probablement une entité essentielle ou importante au sens de NIS 2.",
    badge: "Si oui → continuer",
    tone: "ok" as const,
  },
  {
    q: "2 — Mes services lui sont-ils indispensables ?",
    a: "Hébergement, cloud, infogérance, maintenance, SaaS, développement, télécoms... La directive analyse le niveau de dépendance à vos services, le caractère critique de vos systèmes, et l'absence d'alternative.",
    badge: "Si oui → vous êtes dans la chaîne d'approvisionnement",
    tone: "ok" as const,
  },
  {
    q: "3 — Avez-vous une documentation de conformité NIS 2 ?",
    a: "Politique de sécurité des systèmes d'information, gestion des incidents, plan de continuité d'activité, preuves de formation, audits. Comme pour le RGPD, la conformité NIS 2 se démontre — elle ne se déclare pas.",
    badge: "Si non → vous êtes exposé",
    tone: "warn" as const,
  },
];

const OBLIGATIONS = [
  {
    num: "01",
    title: "Politique de sécurité (PSSI)",
    desc: "Analyse de risques, gestion des incidents, contrôle des accès, chiffrement, mises à jour, sauvegardes testées.",
  },
  {
    num: "02",
    title: "Continuité d'activité",
    desc: "Plan de continuité (PCA) et plan de reprise d'activité (PRA) réellement testés. Un PRA non testé est inexistant aux yeux de l'ANSSI.",
  },
  {
    num: "03",
    title: "Documentation prouvable",
    desc: "Procédures, registres, preuves de formation, audits. La conformité NIS 2 se démontre, elle ne se déclare pas.",
  },
  {
    num: "04",
    title: "Contrats adaptés",
    desc: "Clauses cybersécurité NIS 2, notification d'incidents, répartition des responsabilités dans vos contrats et CGV.",
  },
  {
    num: "05",
    title: "Notification des incidents",
    desc: "Procédure de remontée vers votre donneur d'ordre, articulée avec les obligations RGPD (notification CNIL 72h).",
  },
  {
    num: "06",
    title: "Gouvernance cyber",
    desc: "La direction approuve formellement les mesures. En cas de manquement grave, sa responsabilité personnelle est engagée.",
  },
];

const ALERTES = [
  "Pas de PSSI documentée, ou politique de sécurité des systèmes d'information obsolète",
  "Contrats de prestation sans clause de cybersécurité ni notification d'incidents",
  "Sauvegardes jamais testées, plan de reprise d'activité inexistant",
  "Direction non impliquée formellement dans la gouvernance cyber",
  "Droits d'accès non révisés — ex-salariés ayant encore accès aux systèmes d'information",
];

const CAS = [
  {
    sit: "Situation 1",
    scenario:
      "ESN de 35 salariés, sous-traitante d'un groupe hospitalier. Le CHU envoie un questionnaire de 47 questions sur la sécurité du SI avant renouvellement du contrat.",
    badge: "Contrat à risque",
    tone: "blue" as const,
    livrables: [
      "Analyse du questionnaire : identification des 12 questions qui engagent juridiquement la responsabilité de la direction",
      "Réponses co-rédigées avec notre expert technique : chaque réponse vérifiée contre la réalité du SI, pas copiée d'un modèle",
      "Clause de limitation de responsabilité négociée : plafond d'indemnisation en cas d'incident hors périmètre contractuel",
    ],
    resultat:
      "le contrat est renouvelé. La direction n'a pas signé des engagements qu'elle ne pouvait pas tenir.",
  },
  {
    sit: "Situation 2",
    scenario:
      "Éditeur SaaS RH, 18 salariés. Son principal client — une ETI de 600 personnes dans l'énergie — exige la conformité NIS 2 sous 30 jours ou résilie le contrat.",
    badge: "Urgence 30 jours",
    tone: "purple" as const,
    livrables: [
      "Audit technique du SI en 5 jours : cartographie des accès, vérification MFA, état des sauvegardes, logs disponibles",
      "PSSI rédigée sur mesure — pas un template : elle décrit les vrais systèmes de l'éditeur, pas un SI générique",
      "Plan de remédiation avec calendrier : ce qui est fait, ce qui sera fait sous 90 jours, preuves à l'appui",
      "Avenant contractuel : formalise les engagements, plafonne la responsabilité, prévoit la notification d'incident",
    ],
    resultat:
      "le client accepte le dossier. Le contrat n'est pas résilié. La PSSI est réutilisable pour tous les autres clients.",
  },
  {
    sit: "Situation 3",
    scenario:
      "Prestataire de maintenance industrielle, 80 salariés, intervenant chez plusieurs OIV dans le secteur de l'eau. Un incident chez un client déclenche une enquête ANSSI qui remonte vers lui.",
    badge: "Incident en cours",
    tone: "amber" as const,
    livrables: [
      "Qualification juridique immédiate : responsabilité, obligations de déclaration, périmètre d'exposition",
      "Sécurisation des preuves : logs d'intervention, accès distants, traçabilité — avant que l'ANSSI ne les demande",
      "Stratégie de réponse à l'ANSSI : ce qu'on communique, dans quel ordre, avec quelles réserves juridiques",
      "Séparation des régimes : notification ANSSI distincte de la notification CNIL — deux circuits, deux délais",
    ],
    resultat:
      "le prestataire coopère sans s'auto-incriminer. La responsabilité est circonscrite au périmètre contractuel.",
  },
  {
    sit: "Situation 4",
    scenario:
      "Cabinet comptable de 12 collaborateurs, sous-traitant d'une banque régionale. Accès au SI bancaire via VPN. La banque impose un audit de sécurité annuel.",
    badge: "Audit annuel",
    tone: "teal" as const,
    livrables: [
      "Revue des accès VPN : MFA activé, droits réduits au strict nécessaire, journaux d'accès conservés 12 mois",
      "Dossier d'audit complet : politique de sécurité, preuves de formation, PRA testé, registre des incidents",
      "Clause de révision annuelle : les critères d'audit sont définis contractuellement — pas de résiliation abusive",
    ],
    resultat:
      "l'audit est passé. Le cabinet sait ce qu'on peut lui demander l'année suivante — et ce qu'il peut refuser.",
  },
];

const ETAPES = [
  {
    num: "1",
    title: "Diagnostic — 1h",
    desc: "Vous nous expliquez votre activité, vos clients critiques et vos contraintes. Nous identifions votre statut réel au regard de NIS 2 et les risques prioritaires.",
    tag: "Sans engagement · sous 48h",
  },
  {
    num: "2",
    title: "Cartographie des risques",
    desc: "Analyse juridique et audit technique du SI combinés. Cartographie des accès, des prestataires critiques, des contrats exposés. Rapport d'écart NIS 2 / RGPD avec priorisation.",
    tag: "Livrable : rapport d'écart",
  },
  {
    num: "3",
    title: "Plan d'action",
    desc: "Priorités classées par impact et coût. Ce qui est urgent, ce qui peut attendre, ce qui vous expose le plus. Un plan réaliste pour une PME — pas un programme grand compte.",
    tag: "Livrable : plan d'action priorisé",
  },
  {
    num: "4",
    title: "Mise en conformité",
    desc: "Rédaction de la PSSI, procédures de gestion des incidents, PCA/PRA, clauses contractuelles cybersécurité. Documents opposables — utilisables face à votre client, à l'ANSSI et à la CNIL.",
    tag: "Livrable : dossier de conformité complet",
  },
  {
    num: "5",
    title: "Maintien en condition",
    desc: "Mise à jour annuelle, accompagnement en cas d'incident, préparation aux audits clients. NIS 2 n'est pas un projet ponctuel — c'est un niveau de maturité à maintenir.",
    tag: "Option : suivi annuel",
  },
];

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Ma PME est-elle concernée par NIS 2 ?",
    a: (
      <>
        Pas nécessairement de façon directe. Si votre entreprise exerce dans un secteur critique et
        dépasse certains seuils, elle peut être qualifiée d&apos;entité importante ou essentielle.
        Mais même sans l&apos;être, <strong>vos clients peuvent vous imposer des exigences NIS 2</strong>{" "}
        si vous intervenez dans leur chaîne d&apos;approvisionnement.
      </>
    ),
  },
  {
    q: "Je suis une société informatique de 15 salariés. Suis-je concerné ?",
    a: (
      <>
        Peut-être. Si vous hébergez, maintenez ou développez des systèmes utilisés par un hôpital,
        une banque, une collectivité ou un opérateur critique, vous serez probablement soumis à des{" "}
        <strong>exigences contractuelles proches de NIS 2</strong> — même sans être juridiquement
        une entité NIS 2.
      </>
    ),
  },
  {
    q: "Mon client vient de m'envoyer un questionnaire cybersécurité. Que faire ?",
    a: (
      <>
        <strong>Ne répondez pas trop vite.</strong> Certaines réponses peuvent engager la
        responsabilité de votre entreprise ou de ses dirigeants. Avant de confirmer
        l&apos;existence d&apos;un PRA, d&apos;une PSSI ou d&apos;une authentification forte,
        vérifiez que ces dispositifs existent réellement et sont documentés.
      </>
    ),
  },
  {
    q: "Dois-je recruter un RSSI ?",
    a: (
      <>
        Pas forcément. Une PME peut désigner un responsable cybersécurité interne ou s&apos;appuyer
        sur un prestataire externe. L&apos;essentiel : pouvoir démontrer qu&apos;
        <strong>une personne est clairement responsable</strong> de la sécurité des systèmes
        d&apos;information.
      </>
    ),
  },
  {
    q: "Dois-je obtenir une certification ISO 27001 ?",
    a: (
      <>
        Non. NIS 2 n&apos;impose pas ISO 27001. En revanche, certaines grandes entreprises ou
        administrations peuvent l&apos;exiger contractuellement. Ce n&apos;est pas une obligation
        légale — c&apos;est parfois une condition commerciale.
      </>
    ),
  },
  {
    q: "Quelles sont les premières mesures à mettre en place ?",
    a: (
      <>
        La plupart des PME commencent par :
        <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            "Activer l'authentification multifacteur (MFA)",
            "Sécuriser les accès administrateurs",
            "Tester les sauvegardes",
            "Rédiger une politique de sécurité (PSSI)",
            "Formaliser un plan de continuité d'activité",
            "Documenter la gestion des incidents",
            "Sensibiliser les collaborateurs",
          ].map((li) => (
            <li key={li} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span
                style={{ width: 4, height: 4, borderRadius: "50%", background: "#378ADD", flexShrink: 0, marginTop: 8 }}
                aria-hidden
              />
              <span>{li}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: "Que risque mon entreprise en cas de non-conformité NIS 2 ?",
    a: (
      <>
        Les sanctions peuvent atteindre plusieurs millions d&apos;euros pour les entités directement
        soumises à NIS 2. Mais dans la pratique,{" "}
        <strong>le premier risque est souvent commercial</strong> : perte d&apos;un appel
        d&apos;offres, résiliation d&apos;un contrat ou refus de référencement par un donneur
        d&apos;ordre.
      </>
    ),
  },
  {
    q: "Que se passe-t-il après une cyberattaque ?",
    a: (
      <>
        L&apos;entreprise doit rapidement qualifier l&apos;incident, préserver les preuves,
        identifier les systèmes affectés, déterminer si une notification est nécessaire et
        documenter les mesures correctives. Selon les cas,{" "}
        <strong>plusieurs autorités peuvent être impliquées simultanément</strong> : ANSSI, CNIL ou
        régulateur sectoriel.
      </>
    ),
  },
  {
    q: "Quelle différence entre NIS 2 et le RGPD ?",
    a: (
      <>
        Le RGPD protège les données personnelles. NIS 2 protège les systèmes d&apos;information et la
        continuité des activités essentielles.{" "}
        <strong>Une cyberattaque peut déclencher simultanément des obligations au titre des deux régimes.</strong>
      </>
    ),
  },
  {
    q: "Mon entreprise sera-t-elle contrôlée ?",
    a: (
      <>
        Oui, potentiellement. Les autorités compétentes pourront réaliser des{" "}
        <strong>contrôles documentaires</strong>, demander des justificatifs, vérifier les mesures
        de sécurité mises en place et exiger des actions correctrices.
      </>
    ),
  },
];

const TEAM = [
  {
    initials: "AL",
    name: "Me Alexandre Lazarègue",
    role: "Avocat — cybersécurité & droit du numérique",
    photo: "/images/lazaregue-avocat.png",
    objectPosition: "center",
    intro:
      "Me Alexandre Lazarègue accompagne les entreprises confrontées aux audits fournisseurs, aux incidents cyber et aux exigences de conformité NIS 2. Il intervient aux côtés de Khalid Sookia, expert en cybersécurité.",
    tags: ["NIS 2", "RGPD", "Gestion de crise"],
    initialsBg: "#EEEDFE",
    initialsColor: "#3C3489",
    tagBg: "#EEEDFE",
    tagColor: "#3C3489",
  },
  {
    initials: "KS",
    name: "Khalid Sookia",
    role: "Expert en cybersécurité",
    photo: "/images/khalid-sookia.png",
    objectPosition: "top",
    intro: "",
    tags: ["Audit SI", "PSSI", "Forensic"],
    initialsBg: "#E6F1FB",
    initialsColor: "#0C447C",
    tagBg: "#E6F1FB",
    tagColor: "#185FA5",
  },
];

const SECTEURS = [
  "Santé · hôpitaux · cliniques",
  "Énergie · électricité · gaz",
  "Eau · assainissement",
  "Banque · assurance · finance",
  "Infrastructures numériques · cloud · SaaS",
  "Transports · logistique",
  "Collectivités territoriales",
  "Télécommunications",
  "Industrie critique · défense",
  "Administrations publiques",
];

function B({ children }: { children: ReactNode }) {
  return <strong style={{ fontStyle: "normal", fontWeight: 600, color: "#1a1a1a" }}>{children}</strong>;
}

const LIVRABLES: {
  icon: string;
  type: string;
  h3: string;
  extraitLabel: string;
  extrait: ReactNode;
}[] = [
  {
    icon: "ti-shield-check",
    type: "PSSI",
    h3: "Politique de sécurité des SI",
    extraitLabel: "Extrait — Netcore Solutions (ESN, 28 sal.)",
    extrait: (
      <>
        <B>Art. 4.3</B> — Tout départ de collaborateur déclenche une révocation sous{" "}
        <B>4h ouvrées</B> : désactivation <B>AD</B>, tokens <B>VPN Fortinet</B>, accès <B>GitHub</B>{" "}
        et <B>AWS</B> listés en annexe B. Le responsable SI atteste par écrit avant transmission au
        donneur d&apos;ordre.
      </>
    ),
  },
  {
    icon: "ti-file-text",
    type: "Clauses contractuelles",
    h3: "Clauses NIS 2 dans vos contrats",
    extraitLabel: "Extrait — avenant Dataflow SAS (infogérant)",
    extrait: (
      <>
        <B>Art. 8.4</B> — La responsabilité de Dataflow SAS est engagée uniquement si le manquement
        est documenté et imputable aux obligations de l&apos;<B>art. 6</B>. Plafond :{" "}
        <B>6 mois de facturation HT</B> sur les 12 mois précédant l&apos;incident, hors{" "}
        <B>dol ou faute lourde</B>.
      </>
    ),
  },
  {
    icon: "ti-refresh",
    type: "PCA / PRA",
    h3: "Plan de continuité et de reprise",
    extraitLabel: "Extrait — Aquatech Maintenance (OIV eau)",
    extrait: (
      <>
        Scénario <B>ransomware</B>. <B>H+0</B> : isolement réseau sans extinction. <B>H+2</B> :
        activation cellule de crise — DG + expert cyber. <B>H+4</B> : qualification juridique.{" "}
        <B>RPO : 4h</B> · <B>RTO : 8h</B>. Secours : <B>OVH Cloud Paris-2</B>, contrat n°{" "}
        <B>OVH-2024-8821</B>.
      </>
    ),
  },
  {
    icon: "ti-checklist",
    type: "Questionnaires fournisseurs",
    h3: "Réponse aux audits clients",
    extraitLabel: "Extrait — questionnaire CHU Grand-Est (fictif)",
    extrait: (
      <>
        <B>Q.31</B> : sauvegardes testées trimestriellement ? Vérification logs <B>Veeam</B> :
        dernier test le <B>14/11/2024</B>, rapport ref. <B>VBR-2024-Q4</B>. Réponse validée avec
        preuve jointe. Si test manquant : réponse différée + plan remédiation <B>30 jours</B>.
      </>
    ),
  },
  {
    icon: "ti-alert-triangle",
    type: "Gestion de crise",
    h3: "Procédure de crise cyber",
    extraitLabel: "Extrait — Synexia IT (ESN, client Elior)",
    extrait: (
      <>
        Critère <B>ANSSI</B> : indisponibilité <B>&gt; 4h consécutives</B> pour Groupe Elior, ou
        exfiltration confirmée. Décision du <B>DG</B> uniquement, sur avis de l&apos;avocat, non
        délégable. Notification initiale sous <B>24h</B>, rapport complet sous <B>72h</B>.
      </>
    ),
  },
  {
    icon: "ti-chart-bar",
    type: "Audit de conformité",
    h3: "Rapport d'écart NIS 2 / RGPD",
    extraitLabel: "Extrait — Proxicare (sous-traitant CH Melun)",
    extrait: (
      <>
        <B>Risque n°1 — Critique</B>. 3 comptes VPN actifs : Dubois (départ jan.), Torres (mars),
        InfoTech77 (contrat résilié fév.). Accès actif au <B>VLAN production</B> du CH de Melun.
        Action <B>48h</B> : révocation + attestation DSI + information écrite CH Melun,{" "}
        <B>art. 6.2</B>.
      </>
    ),
  },
];

function casTone(tone: "blue" | "purple" | "amber" | "teal") {
  if (tone === "purple") return { bg: "#EEEDFE", fg: "#3C3489", dot: "#378ADD" };
  if (tone === "amber") return { bg: "#FAEEDA", fg: "#633806", dot: "#378ADD" };
  if (tone === "teal") return { bg: "#E1F5EE", fg: "#085041", dot: "#1D9E75" };
  return { bg: "#E6F1FB", fg: "#185FA5", dot: "#378ADD" };
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: BLUE,
        marginBottom: 8,
      }}
    >
      {children}
    </p>
  );
}

function SectionHead({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <>
      <Eyebrow>{label}</Eyebrow>
      <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 600, color: LIGHT.text, margin: "0 0 10px" }}>
        {title}
      </h2>
      <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 720 }}>{sub}</p>
    </>
  );
}

function Divider() {
  return <div style={{ borderTop: `0.5px solid ${LIGHT.border}`, maxWidth: 900, margin: "0 auto" }} />;
}

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `0.5px solid ${LIGHT.border}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
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
          style={{
            color: BLUE,
            fontSize: 20,
            lineHeight: 1,
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform 180ms ease",
          }}
        >
          +
        </span>
      </button>
      {open ? (
        <div
          style={{
            fontSize: 13,
            color: LIGHT.muted,
            lineHeight: 1.7,
            margin: 0,
            padding: "0 0 20px 40px",
            maxWidth: 760,
          }}
        >
          {item.a}
        </div>
      ) : null}
    </div>
  );
}

const strongStyle: React.CSSProperties = { color: LIGHT.text, fontWeight: 600 };

export default function CybersecuriteClient() {
  return (
    <main
      style={{
        background: LIGHT.bg,
        color: LIGHT.text,
        fontFamily: "var(--ff-body)",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <style>{`
        .nis2-faq strong { color: ${LIGHT.text}; font-weight: 600; }
      `}</style>

      {/* 1. HERO */}
      <section style={{ background: DARK.bg, color: DARK.text, padding: SECTION_PAD }}>
        <div style={{ ...INNER, padding: "0 48px" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--ff-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7fa8ff",
              background: "rgba(26,71,255,0.25)",
              borderRadius: 8,
              padding: "4px 12px",
              marginBottom: 16,
            }}
          >
            NIS 2 · sous-traitants PME · ETI
          </span>
          <h1
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: 14,
              maxWidth: "100%",
              overflowWrap: "break-word",
              hyphens: "none",
            }}
          >
            Votre client vous demande des garanties de cybersécurité ?
            <span
              style={{
                display: "block",
                fontSize: 20,
                fontWeight: 400,
                color: "#4d7aff",
                marginTop: 10,
              }}
            >
              NIS 2 fait de vous un maillon critique, même si vous êtes une PME.
            </span>
          </h1>
          <p style={{ fontSize: 15, color: DARK.muted, lineHeight: 1.75, marginBottom: 26, maxWidth: 640 }}>
            Questionnaires fournisseurs, audits, clauses de sécurité, exigences contractuelles :
            nous vous aidons à répondre sans engager inutilement votre responsabilité.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              style={{
                background: BLUE,
                color: "#fff",
                padding: "12px 22px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Faire le point sur ma situation
            </Link>
            <a
              href="#obligations"
              style={{
                background: "transparent",
                color: DARK.muted,
                padding: "12px 22px",
                borderRadius: 8,
                fontSize: 13,
                textDecoration: "none",
                border: `0.5px solid ${DARK.border}`,
              }}
            >
              Voir les obligations
            </a>
          </div>
        </div>
      </section>

      {/* 2. PASTILLE VIDÉO */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2" style={INNER}>
          <video width="100%" style={{ borderRadius: "12px" }} controls playsInline>
            <source src="https://dwhsfozwid3mrmrl.public.blob.vercel-storage.com/nis2-intro.mp4" type="video/mp4" />
          </video>
          <div>
            <p
              style={{
                fontFamily: "var(--ff-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: LIGHT.faint,
                margin: "0 0 6px",
              }}
            >
              Comprendre en 1 minute
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: LIGHT.text, lineHeight: 1.4, margin: "0 0 6px" }}>
              NIS 2 et sous-traitance : ce que vous devez savoir
            </p>
            <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 10px" }}>
              NIS 2 est la nouvelle réglementation européenne de cybersécurité. Elle oblige les
              secteurs critiques — et leurs fournisseurs — à prouver qu&apos;ils savent résister à
              une cyberattaque. En 1 minute, comprendre pourquoi votre entreprise est peut-être
              concernée.
            </p>
            <span style={{ fontSize: 12, color: LIGHT.faint, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE }} aria-hidden />
              1 min 14
            </span>
          </div>
        </div>
      </section>

      {/* 2c. BANDEAU CO-CONSTRUCTION */}
      <section style={{ background: LIGHT.bg, padding: "0 0 16px" }}>
        <div style={INNER}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: LIGHT.panel2,
              borderRadius: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid #ffffff",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/lazaregue-avocat.png"
                  alt="Me Alexandre Lazarègue"
                  fill
                  sizes="36px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "2px solid #ffffff",
                  overflow: "hidden",
                  flexShrink: 0,
                  marginLeft: -8,
                }}
              >
                <Image
                  src="/images/khalid-sookia.png"
                  alt="Khalid Sookia"
                  fill
                  sizes="36px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>
            <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>
              Une approche co-construite par{" "}
              <span style={{ fontWeight: 500, color: LIGHT.text }}>Me Alexandre Lazarègue</span>{" "}
              (Avocat — cybersécurité) et{" "}
              <span style={{ fontWeight: 500, color: LIGHT.text }}>Khalid Sookia</span> (Expert en
              cybersécurité).
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* 3. TEST EN 3 QUESTIONS */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Suis-je concerné ?"
            title="Le test en 3 questions"
            sub="NIS 2 cible les entités essentielles (énergie, santé, transports, finance, eau, numérique) et les entités importantes — mais aussi tous leurs sous-traitants dont les services sont indispensables à leur fonctionnement."
          />
          <div className="flex flex-col gap-3">
            {TEST_QUESTIONS.map((item) => {
              const ok = item.tone === "ok";
              return (
                <div
                  key={item.q}
                  style={{
                    background: LIGHT.panel,
                    border: `0.5px solid ${LIGHT.border}`,
                    borderRadius: 12,
                    padding: "16px 20px",
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, margin: "0 0 6px" }}>{item.q}</p>
                  <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: "0 0 10px" }}>{item.a}</p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                      fontWeight: 500,
                      color: ok ? "#085041" : "#633806",
                      background: ok ? "#E1F5EE" : "#FAEEDA",
                      padding: "3px 10px",
                      borderRadius: 8,
                    }}
                  >
                    <i
                      className={`ti ${ok ? "ti-check" : "ti-alert-triangle"}`}
                      style={{ fontSize: 11 }}
                      aria-hidden="true"
                    />
                    {item.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* 3b. SECTEURS CONCERNÉS */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Qui est concerné ?"
            title="Les secteurs les plus exposés"
            sub="Vos clients exercent dans l'un de ces secteurs ? Vous êtes probablement dans leur chaîne d'approvisionnement NIS 2."
          />
          <div className="flex flex-wrap gap-2">
            {SECTEURS.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#0C447C",
                  background: "#E6F1FB",
                  padding: "7px 14px",
                  borderRadius: 999,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 4. OBLIGATIONS */}
      <section id="obligations" style={{ background: LIGHT.bg, padding: SECTION_PAD, scrollMarginTop: 80 }}>
        <div style={INNER}>
          <SectionHead
            label="Vos obligations concrètes"
            title="Ce qu'on va vous demander"
            sub="Votre donneur d'ordre doit prouver à l'ANSSI qu'il maîtrise les risques de ses fournisseurs critiques. Il se retournera vers vous."
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {OBLIGATIONS.map((o) => (
              <div
                key={o.num}
                style={{
                  background: LIGHT.panel,
                  border: `0.5px solid ${LIGHT.border}`,
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <p style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: LIGHT.faint, margin: "0 0 5px" }}>
                  {o.num}
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text, margin: "0 0 4px" }}>{o.title}</p>
                <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.5, margin: 0 }}>{o.desc}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              background: "#FCEBEB",
              border: "0.5px solid #F09595",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: "var(--ff-display)", fontSize: 26, color: "#A32D2D", minWidth: 70 }}>
              7 M€
            </span>
            <span style={{ fontSize: 13, color: "#791F1F", lineHeight: 1.5, flex: 1 }}>
              Sanction maximale pour une entité importante (ou 1,4 % du CA mondial). Une mise en
              conformité NIS 2 coûte dix fois moins.
            </span>
          </div>
        </div>
      </section>

      <Divider />

      {/* 5. SIGNAUX D'ALERTE */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Les signaux d'alerte"
            title="Êtes-vous exposé ?"
            sub="Ces situations sont courantes — et souvent invisibles jusqu'au premier audit de votre donneur d'ordre ou au premier incident."
          />
          <div className="flex flex-col gap-2">
            {ALERTES.map((a) => (
              <div
                key={a}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "11px 14px",
                  background: LIGHT.panel,
                  border: `0.5px solid ${LIGHT.border}`,
                  borderRadius: 8,
                }}
              >
                <span
                  style={{ width: 7, height: 7, borderRadius: "50%", background: "#E24B4A", flexShrink: 0, marginTop: 5 }}
                  aria-hidden
                />
                <p style={{ fontSize: 13, color: LIGHT.text, lineHeight: 1.5, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 5b. BLOC LIVRABLES */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Nos livrables NIS 2"
            title="Ce que nous produisons — et ce que ça donne en pratique"
            sub="Six documents clés, avec un extrait issu d'un dossier réel (entreprises anonymisées) pour illustrer le niveau de précision attendu."
          />
          <p style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.faint, lineHeight: 1.6, margin: "-16px 0 10px" }}>
            Les extraits ci-dessous sont des exemples inspirés de dossiers réels, anonymisés et
            adaptés à des fins pédagogiques.
          </p>
          <p style={{ fontSize: 14, color: LIGHT.muted, lineHeight: 1.7, margin: "0 0 28px" }}>
            Nous produisons des documents opérationnels — utilisables lors d&apos;audits, de
            contrôles ANSSI, de questionnaires fournisseurs ou d&apos;incidents de sécurité.
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2" style={{ alignItems: "stretch" }}>
            {LIVRABLES.map((l) => (
              <div
                key={l.h3}
                style={{
                  background: LIGHT.panel,
                  border: `0.5px solid ${LIGHT.border}`,
                  borderRadius: 12,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  height: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: "#E6F1FB",
                      color: "#185FA5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`ti ${l.icon}`} style={{ fontSize: 17 }} aria-hidden="true" />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: LIGHT.faint,
                    }}
                  >
                    {l.type}
                  </span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: LIGHT.text, margin: 0, lineHeight: 1.35 }}>
                  {l.h3}
                </h3>
                <div
                  style={{
                    background: LIGHT.panel2,
                    borderLeft: "2px solid #378ADD",
                    borderRadius: "0 8px 8px 0",
                    padding: "10px 14px",
                    marginTop: "auto",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: LIGHT.faint,
                      margin: "0 0 6px",
                    }}
                  >
                    {l.extraitLabel}
                  </p>
                  <p style={{ fontSize: 12, fontStyle: "italic", color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>
                    {l.extrait}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 6. CAS CONCRETS */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <Eyebrow>Ce que nous livrons</Eyebrow>
          <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.7, margin: "0 0 28px", maxWidth: 720 }}>
            Quatre situations réelles — et le détail de ce que nous produisons à chaque étape.
          </p>
          <div className="flex flex-col gap-3">
            {CAS.map((cas) => {
              const t = casTone(cas.tone);
              return (
                <div
                  key={cas.sit}
                  style={{
                    background: LIGHT.panel,
                    border: `0.5px solid ${LIGHT.border}`,
                    borderRadius: 12,
                    padding: 18,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--ff-mono)",
                          fontSize: 11,
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.07em",
                          color: LIGHT.faint,
                          margin: "0 0 3px",
                        }}
                      >
                        {cas.sit}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 500, color: LIGHT.text, margin: 0, lineHeight: 1.45 }}>
                        {cas.scenario}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "3px 10px",
                        borderRadius: 8,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        background: t.bg,
                        color: t.fg,
                      }}
                    >
                      {cas.badge}
                    </span>
                  </div>

                  <div style={{ borderTop: `0.5px solid ${LIGHT.border}`, margin: "10px 0" }} />

                  <p
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      color: LIGHT.faint,
                      margin: "0 0 8px",
                    }}
                  >
                    Ce que nous livrons
                  </p>
                  <div className="flex flex-col" style={{ gap: 5 }}>
                    {cas.livrables.map((l) => (
                      <div key={l} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: LIGHT.text, lineHeight: 1.5 }}>
                        <span
                          style={{ width: 4, height: 4, borderRadius: "50%", background: t.dot, flexShrink: 0, marginTop: 7 }}
                          aria-hidden
                        />
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      padding: "9px 12px",
                      background: LIGHT.panel2,
                      borderRadius: 8,
                      fontSize: 13,
                      color: LIGHT.muted,
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={strongStyle}>Résultat :</strong> {cas.resultat}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* 7. 5 ÉTAPES */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Comment on travaille ensemble"
            title="5 étapes, un résultat mesurable"
            sub="Chaque accompagnement NIS 2 suit le même fil — adapté à la taille et aux contraintes de votre entreprise."
          />
          <div
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: "4px 20px",
            }}
          >
            {ETAPES.map((step, idx) => (
              <div key={step.num} style={{ display: "flex", gap: 16, padding: "16px 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#E6F1FB",
                      color: "#185FA5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--ff-mono)",
                      fontSize: 12,
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {step.num}
                  </div>
                  {idx < ETAPES.length - 1 ? (
                    <div style={{ width: 1, flex: 1, background: LIGHT.border, minHeight: 16 }} aria-hidden />
                  ) : null}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: LIGHT.text, margin: "0 0 4px", paddingTop: 5 }}>
                    {step.title}
                  </p>
                  <p style={{ fontSize: 13, color: LIGHT.muted, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 11,
                      color: LIGHT.faint,
                      background: LIGHT.panel2,
                      padding: "2px 8px",
                      borderRadius: 8,
                      marginTop: 6,
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 8. FAQ */}
      <section className="nis2-faq" style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <SectionHead
            label="Questions fréquentes"
            title="Ce que se demandent vraiment les dirigeants"
            sub="Les vraies questions — pas les questions juridiques abstraites."
          />
          <div
            style={{
              background: LIGHT.panel,
              border: `0.5px solid ${LIGHT.border}`,
              borderRadius: 12,
              padding: "4px 20px",
            }}
          >
            {FAQ_ITEMS.map((item, index) => (
              <FaqItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* 9. SECTION ÉQUIPE */}
      <section style={{ background: LIGHT.bg, padding: SECTION_PAD }}>
        <div style={INNER}>
          <div style={{ background: LIGHT.panel2, borderRadius: 12, padding: 24 }}>
            <Eyebrow>L&apos;équipe</Eyebrow>
            <h2 style={{ fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 600, color: LIGHT.text, margin: "0 0 4px" }}>
              Une approche juridique et technique combinée
            </h2>
            <p style={{ fontSize: 15, color: LIGHT.muted, lineHeight: 1.7, margin: 0 }}>
              Les livrables sont co-construits : l&apos;analyse juridique et la réalité technique de
              votre SI avancent ensemble — pour une conformité NIS 2 qui tient face à un audit réel.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2" style={{ marginTop: 16 }}>
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  style={{
                    background: LIGHT.panel,
                    border: `0.5px solid ${LIGHT.border}`,
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 240,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: LIGHT.text, margin: "0 0 3px" }}>{m.name}</p>
                    <p style={{ fontSize: 12, color: LIGHT.muted, margin: "0 0 8px" }}>{m.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            padding: "3px 9px",
                            borderRadius: 8,
                            background: m.tagBg,
                            color: m.tagColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section style={{ background: LIGHT.bg, padding: "0 0 56px" }}>
        <div style={INNER}>
          <div style={{ background: DARK.bg, borderRadius: 12, padding: 28, textAlign: "center" }}>
            <p style={{ fontSize: "clamp(18px, 2.4vw, 22px)", fontWeight: 600, color: "#fff", margin: "0 0 8px", lineHeight: 1.4 }}>
              Votre client vous demande des garanties ?
              <br />
              Préparez-vous avant le premier audit.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "0 0 20px", lineHeight: 1.6 }}>
              NIS 2 n&apos;est pas réservé aux grands groupes. Dès que vous êtes indispensable à un
              acteur critique, vous devez pouvoir le prouver — documents à l&apos;appui.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  background: BLUE,
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Nous contacter →
              </Link>
              <Link
                href="/#cas"
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.7)",
                  padding: "10px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  textDecoration: "none",
                  border: "0.5px solid rgba(255,255,255,0.2)",
                }}
              >
                Voir nos interventions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
