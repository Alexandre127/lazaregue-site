"use client";

import { useState } from "react";
import Link from "next/link";

const COLORS = {
  darkBg: "#0A0A14",
  lightBg: "#F4F4F8",
  white: "#FFFFFF",
  blue: "#1A47FF",
  textLight: "#F0EEE8",
  textDark: "#0A0A14",
  mutedDark: "rgba(240,238,232,0.38)",
  mutedLight: "rgba(10,10,20,0.45)",
  borderDark: "rgba(26,71,255,0.12)",
  borderLight: "rgba(10,10,20,0.07)",
};

const heroTags = ["AI Act", "RGPD", "Responsabilité", "Preuve", "Gouvernance"];

const scenarios = [
  {
    color: "#E24B4A",
    tag: "RH",
    title: "Tri de CV automatisé",
    text: "Un outil qui filtre les candidatures relève de l'annexe III. Sans supervision humaine documentée, votre responsabilité est directement engagée — et le candidat peut contester.",
  },
  {
    color: "#BA7517",
    tag: "Produit",
    title: "IA intégrée à un dispositif physique",
    text: "Composant de sécurité dans une machine ou un dispositif médical soumis à marquage CE : les obligations haut risque s'appliquent. La plupart des équipes produit l'ignorent.",
  },
  {
    color: "#1A47FF",
    tag: "Commercial",
    title: "Scoring client automatisé",
    text: "Un algorithme qui évalue la solvabilité ou la fidélité client croise AI Act et RGPD. Sans documentation ni droit de contestation, le déploiement est illégal.",
  },
];

const steps = [
  {
    n: "01",
    title: "Cartographier — tout ce que vous utilisez vraiment",
    text: "Systèmes internes, API tierces, modèles intégrés. Sans inventaire, vous ne savez pas ce que vous exposez.",
    pill: "Priorité immédiate",
  },
  {
    n: "02",
    title: "Qualifier — interdits, haut risque, transparence",
    text: "La qualification conditionne tout le régime. C'est la décision la plus structurante — et la plus souvent mal faite en interne.",
  },
  {
    n: "03",
    title: "Documenter — construire la preuve en amont",
    text: "Gouvernance des données, supervision humaine, évaluation de conformité. Dix ans de conservation obligatoire.",
  },
  {
    n: "04",
    title: "Gouverner — chartes, politiques, formation",
    text: "Comité IA, référent conformité, articulation DPO, DUERP, information des salariés.",
  },
  {
    n: "05",
    title: "Défendre — contrôles, incidents, contentieux",
    text: "La documentation de conformité est votre première ligne de défense. Nous la construisons pour qu'elle tienne.",
    pill: "Notre terrain naturel",
  },
];

const interventionTabs = [
  {
    id: "audit",
    label: "Audit",
    subtitle:
      "La base — avant tout le reste. Savoir exactement ce que vous utilisez et ce que ça vous expose.",
    title: "Audit & qualification",
    livrables: [
      ["Registre des systèmes IA", "Inventaire complet"],
      ["Note de qualification juridique", "Interdit / haut risque / transparence"],
      ["Matrice des risques et priorités", "Vue claire des urgences"],
      ["Revue des contrats fournisseurs IA", "Exposition contractuelle réelle"],
    ],
    impacts: [
      ["Visibilité complète", "Toutes les briques IA identifiées"],
      ["Exposition clarifiée", "Risques juridiques objectivés"],
      ["Plan d'action priorisé", "Décisions rapides et ordonnées"],
    ],
    before:
      "Vous utilisez l'IA sans cartographie, sans qualification, sans savoir ce que vous exposez en cas de contrôle",
    after:
      "Registre complet, qualification juridique par système, plan d'action opérationnel",
  },
  {
    id: "documentation",
    label: "Documentation",
    subtitle:
      "Ce qui tient face à une autorité. 10 ans de conservation obligatoire.",
    title: "Documentation & preuve",
    livrables: [
      ["Documentation technique art.11", "Structure complète et exploitable"],
      ["Notice d'utilisation conforme art.13", "Transparence utilisateur cadrée"],
      ["Procédure de journalisation", "Traçabilité opérationnelle"],
      ["Dossier d'évaluation de conformité", "Prêt audit / contrôle"],
    ],
    impacts: [
      ["Preuve disponible immédiatement", "Réponse rapide aux autorités"],
      ["Défense en responsabilité", "Diligence démontrable"],
      ["Conformité durable", "Archivage et gouvernance long terme"],
    ],
    before:
      "Aucun document en cas de contrôle — reconstruction impossible sous pression",
    after:
      "Dossier complet, archivé 10 ans, structuré pour résister à tout contrôle ou contentieux",
  },
  {
    id: "gouvernance",
    label: "Gouvernance",
    subtitle:
      "La structure qui tient dans la durée — et qui s'impose à tous.",
    title: "Gouvernance interne",
    livrables: [
      ["Charte IA interne", "Opposable et opérationnelle"],
      ["Politique d'usage des outils IA", "Règles claires pour tous"],
      ["Procédure de signalement d'incident", "Réaction coordonnée"],
      ["Note RH + mise à jour DUERP", "Alignement droit social / IA"],
    ],
    impacts: [
      ["Usage IA encadré", "Réduction des usages à risque"],
      ["Responsabilité clarifiée", "Rôles et validation définis"],
      ["Structure durable", "Cadre stable dans le temps"],
    ],
    before:
      "Chaque salarié utilise ChatGPT, Copilot ou d'autres IA à sa façon — sans règle, sans contrôle",
    after:
      "Charte adoptée, politique d'usage connue, procédures en place — l'entreprise maîtrise ses usages IA",
  },
  {
    id: "contrats",
    label: "Contrats",
    subtitle:
      "Ce que vos contrats doivent dire — et ce qu'ils ne disent probablement pas encore.",
    title: "Contrats & commercialisation",
    livrables: [
      ["Clauses AI Act pour CGV/CGU", "Distribution de responsabilité"],
      ["Contrat fournisseur IA type", "Obligations minimales imposées"],
      ["Mentions de transparence", "Chatbots / deepfakes encadrés"],
      ["Notice d'utilisation produit IA", "Information utilisateur conforme"],
    ],
    impacts: [
      ["Responsabilité limitée contractuellement", "Répartition maîtrisée"],
      ["Transparence documentée", "Moins de risque contentieux"],
      ["Fournisseurs encadrés", "Dépendance sécurisée"],
    ],
    before:
      "Vos CGV ne mentionnent pas l'IA. Vos fournisseurs IA n'ont aucune obligation contractuelle envers vous",
    after:
      "Contrats mis à jour, transparence assurée, responsabilités clairement réparties avec chaque fournisseur",
  },
  {
    id: "crise",
    label: "Crise",
    subtitle:
      "Quand le problème est déjà là — ou quand on veut éviter qu'il arrive.",
    title: "Contentieux & gestion de crise",
    livrables: [
      ["Stratégie de réponse aux autorités", "Position juridique coordonnée"],
      ["Plan de remédiation documenté", "Actions traçables et pilotées"],
      ["Notification d'incident grave", "CNIL et obligations connexes"],
      ["Mémoire de défense en responsabilité", "Base contentieuse structurée"],
    ],
    impacts: [
      ["Crise maîtrisée", "Décisions sécurisées sous contrainte"],
      ["Sanction limitée", "Démonstration de diligence"],
      ["Défense solide", "Arguments documentés et tenables"],
    ],
    before:
      "Incident IA non géré — pas de documentation, pas de procédure, sanction maximale probable",
    after:
      "Réponse coordonnée, preuve de diligence disponible, dommages limités, continuité assurée",
  },
];

export default function IaActClient() {
  const [activeTab, setActiveTab] = useState("audit");
  const [openQuestions, setOpenQuestions] = useState(["q1"]);
  const activePanel = interventionTabs.find((t) => t.id === activeTab) ?? interventionTabs[0];

  return (
    <main style={{ background: COLORS.darkBg, fontFamily: "Space Grotesk, sans-serif" }}>
      {/* 1. HERO */}
      <section style={{ background: COLORS.darkBg, color: COLORS.textLight, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 12, color: COLORS.mutedDark, marginBottom: 14 }}>
            Nos domaines · <span style={{ color: COLORS.blue }}>IA & AI Act</span>
          </p>
          <h1 style={{ fontSize: "clamp(32px,4.2vw,52px)", lineHeight: 1.12, fontWeight: 600, marginBottom: 18 }}>
            Une IA mal documentée{" "}
            <em style={{ fontStyle: "italic", opacity: 0.4 }}>
              devient un risque de responsabilité.
            </em>
          </h1>
          <p style={{ maxWidth: 900, color: COLORS.mutedDark, lineHeight: 1.7, fontSize: 15, marginBottom: 22 }}>
            Le Règlement européen sur l&apos;IA est en vigueur. Les premières obligations
            s&apos;appliquent déjà. Les suivantes arrivent en 2027. La question n&apos;est plus
            &quot;faut-il s&apos;y préparer&quot; — c&apos;est &quot;où en êtes-vous ?&quot;
          </p>

          <blockquote
            style={{
              borderLeft: "2px solid #1A47FF",
              paddingLeft: 14,
              color: "rgba(240,238,232,0.75)",
              fontStyle: "italic",
              margin: "0 0 22px 0",
              lineHeight: 1.7,
            }}
          >
            Avant de déployer, il faut savoir ce que votre IA vous expose juridiquement.
          </blockquote>

          <div className="mb-6 flex flex-wrap gap-2">
            {heroTags.map((t) => (
              <span
                key={t}
                style={{
                  border: `1px solid ${COLORS.borderDark}`,
                  color: COLORS.textLight,
                  opacity: 0.72,
                  fontSize: 10,
                  padding: "4px 8px",
                  borderRadius: 3,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              style={{
                background: COLORS.blue,
                color: COLORS.textLight,
                padding: "12px 18px",
                borderRadius: 4,
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: ".04em",
              }}
            >
              Structurer ma gouvernance IA →
            </Link>
            <Link
              href="/references"
              style={{
                background: "transparent",
                color: COLORS.textLight,
                border: `1px solid ${COLORS.borderDark}`,
                padding: "12px 18px",
                borderRadius: 4,
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: ".04em",
              }}
            >
              Cas clients
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PREUVE SOCIALE */}
      <section style={{ background: COLORS.darkBg, color: COLORS.textLight, padding: "0 48px 40px" }}>
        <div className="mx-auto max-w-6xl">
          <div
            style={{
              background: "#0F1122",
              border: `1px solid ${COLORS.borderDark}`,
              borderRadius: 8,
              padding: 22,
            }}
          >
            <p style={{ fontStyle: "italic", color: "rgba(240,238,232,0.7)", lineHeight: 1.75, marginBottom: 14 }}>
              Nous accompagnons des entreprises qui utilisent l&apos;IA dans leurs outils RH, leurs
              produits SaaS, leurs processus commerciaux et leurs systèmes de décision — souvent sans
              l&apos;avoir formalisé.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Éditeurs SaaS", "PME & ETI", "Directions RH", "Équipes produit", "Directions juridiques"].map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: 10,
                    borderRadius: 999,
                    border: `1px solid ${COLORS.borderDark}`,
                    padding: "4px 10px",
                    color: "rgba(240,238,232,0.72)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCÉNARIOS */}
      <section style={{ background: COLORS.lightBg, color: COLORS.textDark, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.mutedLight, marginBottom: 10 }}>
            Ce que vos équipes font peut-être déjà
          </p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.2, marginBottom: 10 }}>
            Cinq situations à risque — concrètes
          </h2>
          <p style={{ color: COLORS.mutedLight, marginBottom: 24 }}>
            L&apos;IA est déjà dans votre entreprise. La question est : savez-vous ce qu&apos;elle vous expose ?
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {scenarios.map((s) => (
              <article key={s.title} style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderLeft: `3px solid ${s.color}`, borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 10, color: s.color, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.tag}</span>
                <h3 style={{ margin: "8px 0 8px", fontSize: 16 }}>{s.title}</h3>
                <p style={{ color: COLORS.mutedLight, lineHeight: 1.7 }}>{s.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 14 }}>
              <div style={{ marginBottom: 6 }}>💻</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>ChatGPT avec données RH</div>
              <div style={{ color: COLORS.mutedLight }}>Sans politique interne, chaque usage engage l&apos;entreprise.</div>
            </div>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 14 }}>
              <div style={{ marginBottom: 6 }}>🌍</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Fournisseur d&apos;IA sans contrat</div>
              <div style={{ color: COLORS.mutedLight }}>Une API tierce sans encadrement = risque immédiat.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ANGLE PREUVE */}
      <section style={{ background: COLORS.lightBg, color: COLORS.textDark, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: "#1A47FF", marginBottom: 10 }}>
            Un sujet transversal
          </p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.2, marginBottom: 8 }}>
            L&apos;IA est un sujet de direction générale — la preuve par les juges
          </h2>
          <p style={{ color: COLORS.mutedLight, marginBottom: 24 }}>
            Elle engage simultanément huit domaines du droit — souvent sans que l&apos;entreprise l&apos;ait anticipé.
          </p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mb-6">
            {[
              ["ti-users", "Droit du travail", "Information-consultation CSE, loyauté des évaluations algorithmiques, transparence des objectifs automatisés"],
              ["ti-shield-lock", "RGPD & données", "Licéité, analyse d'impact, minimisation, droits des personnes — cumulatifs avec l'AI Act"],
              ["ti-file-invoice", "Responsabilité produit", "Défaut de documentation ou de supervision humaine = indice de défaut en contentieux"],
              ["ti-world", "Fournisseurs & cloud", "APIs tierces, SaaS IA, contrats cloud : chaque prestataire sans encadrement est un risque non couvert"],
              ["ti-eye", "Transparence", "Contenus générés, chatbots, deepfakes : obligation d'information envers les utilisateurs — en vigueur"],
              ["ti-scale", "Devoir de conseil", "Les prestataires intégrant l'IA restent tenus d'informer sur les limites, risques et maturité des outils"],
              ["ti-building-bank", "Régulation sectorielle", "Finance, immobilier, santé, plateformes : des obligations spécifiques s'ajoutent au cadre général"],
              ["ti-certificate", "Conformité CNIL", "Référentiels, analyses d'impact, codes de conduite : la doctrine CNIL s'applique aux systèmes IA"],
            ].map(([icon, title, text]) => (
              <div key={title} style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 6, padding: 14 }}>
                <i className={`ti ${icon}`} style={{ fontSize: 18, color: "#1A47FF", display: "block", marginBottom: 8 }} aria-hidden="true" />
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textDark, marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 11, color: COLORS.mutedLight, lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}
          </div>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderLeft: "3px solid #1A47FF", borderRadius: "0 4px 4px 0", padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: COLORS.mutedLight, lineHeight: 1.6 }}>
              <strong style={{ color: COLORS.textDark, fontWeight: 500 }}>Notre approche : </strong>
              nous ne traitons pas l&apos;IA comme un sujet réglementaire isolé. Nous l&apos;articulons avec l&apos;ensemble des obligations de l&apos;entreprise — pour construire une gouvernance qui tient sur tous les fronts.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
            <article style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderLeft: "3px solid #E14B4B", borderRadius: 8, padding: 20, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: COLORS.mutedLight, textTransform: "uppercase", letterSpacing: ".06em" }}>Janv. 2026</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#E14B4B", border: "1px solid rgba(225,75,75,0.35)", borderRadius: 999, padding: "2px 8px" }}>TJ Nanterre</span>
              </div>
              <h3 style={{ fontSize: 15, margin: "0 0 4px" }}>IA RH suspendue</h3>
              <p style={{ fontSize: 11, color: COLORS.mutedLight, margin: "0 0 8px" }}>Réf. TJ Nanterre, janv. 2026</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                Un éditeur déploie des logiciels IA de gestion des compétences et d&apos;alimentation des entretiens annuels. Le tribunal suspend le déploiement : il s&apos;agit d&apos;une nouvelle technologie affectant les conditions de travail — la consultation du CSEC était obligatoire au préalable.
              </p>
              <p style={{ fontSize: 12, color: COLORS.mutedLight, fontStyle: "italic", margin: 0 }}>
                Impact : Tout déploiement IA RH structurant exige une information-consultation documentée avant mise en œuvre.
              </p>
            </article>
            <article style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderLeft: "3px solid #F2A43A", borderRadius: 8, padding: 20, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: COLORS.mutedLight, textTransform: "uppercase", letterSpacing: ".06em" }}>Fév. 2026</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#F2A43A", border: "1px solid rgba(242,164,58,0.35)", borderRadius: 999, padding: "2px 8px" }}>TJ Paris</span>
              </div>
              <h3 style={{ fontSize: 15, margin: "0 0 4px" }}>Copilot pas projet important</h3>
              <p style={{ fontSize: 11, color: COLORS.mutedLight, margin: "0 0 8px" }}>Réf. TJ Paris, fév. 2026</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                Expérimentation Copilot 365 limitée à des volontaires sur 4 mois. Le tribunal juge que ce n&apos;est pas un projet important au sens du Code du travail justifiant une expertise CSE — l&apos;accessibilité à un grand nombre de salariés ne suffit pas.
              </p>
              <p style={{ fontSize: 12, color: COLORS.mutedLight, fontStyle: "italic", margin: 0 }}>
                Impact : L&apos;ampleur des effets concrets sur l&apos;organisation est le critère déterminant — pas la taille de l&apos;outil.
              </p>
            </article>
            <article style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderLeft: "3px solid #1A47FF", borderRadius: 8, padding: 20, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: COLORS.mutedLight, textTransform: "uppercase", letterSpacing: ".06em" }}>Mai 2025</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#1A47FF", border: "1px solid rgba(26,71,255,0.35)", borderRadius: 999, padding: "2px 8px" }}>Cass. sociale</span>
              </div>
              <h3 style={{ fontSize: 15, margin: "0 0 4px" }}>Vidéoprotection = RGPD</h3>
              <p style={{ fontSize: 11, color: COLORS.mutedLight, margin: "0 0 8px" }}>Réf. Cass. sociale, mai 2025</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                La Cour de cassation qualifie la vidéoprotection en milieu aéroportuaire de traitement de données personnelles. Double exigence cumulée : conformité RGPD ET loyauté dans la collecte au titre du droit du travail.
              </p>
              <p style={{ fontSize: 12, color: COLORS.mutedLight, fontStyle: "italic", margin: 0 }}>
                Impact : Tout système IA traitant des données de salariés engage simultanément RGPD et droit du travail.
              </p>
            </article>
            <article style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderLeft: "3px solid #29A06A", borderRadius: 8, padding: 20, minHeight: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: COLORS.mutedLight, textTransform: "uppercase", letterSpacing: ".06em" }}>Mai 2025</span>
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", color: "#29A06A", border: "1px solid rgba(41,160,106,0.35)", borderRadius: 999, padding: "2px 8px" }}>CA Lyon</span>
              </div>
              <h3 style={{ fontSize: 15, margin: "0 0 4px" }}>IA comptable validée</h3>
              <p style={{ fontSize: 11, color: COLORS.mutedLight, margin: "0 0 8px" }}>Réf. CA Lyon, mai 2025</p>
              <p style={{ fontSize: 12, color: "rgba(10,10,20,0.55)", lineHeight: 1.6, margin: "0 0 8px" }}>
                Un logiciel IA automatise la tenue comptable d&apos;indépendants. La cour valide : pas d&apos;exercice illégal dès lors que la décision finale reste à la charge du client et que les CGV le précisent clairement.
              </p>
              <p style={{ fontSize: 12, color: COLORS.mutedLight, fontStyle: "italic", margin: 0 }}>
                Impact : La responsabilité de l&apos;utilisateur et les limites de l&apos;automatisation doivent être documentées dans les CGV.
              </p>
            </article>
          </div>
          <p style={{ fontStyle: "italic", color: "rgba(10,10,20,0.45)", fontSize: 13, margin: "0 0 20px" }}>
            les juges appliquent déjà une logique de gouvernance IA — documentation, transparence, supervision humaine.
          </p>

          <div style={{ background: "#0F1020", border: "1px solid rgba(26,71,255,0.15)", borderRadius: 8, padding: 16 }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.mutedDark, marginBottom: 8 }}>
              Notre angle
            </p>
            <blockquote style={{ borderLeft: "2px solid #1A47FF", paddingLeft: 12, margin: "0 0 10px", color: "rgba(240,238,232,0.8)", fontSize: 14, fontStyle: "italic", lineHeight: 1.65 }}>
              En cas de contrôle, l&apos;entreprise doit pouvoir démontrer comment son système a été conçu, supervisé et documenté.
            </blockquote>
            <p style={{ color: COLORS.mutedDark, lineHeight: 1.7, margin: 0 }}>
              Un manquement à la documentation ou à la supervision humaine devient un indice de défaut — utilisable contre vous dans tout contentieux. Nous construisons la preuve en amont pour qu&apos;elle tienne en aval.
            </p>
          </div>

        </div>
      </section>

      {/* 6. ÉTAPES */}
      <section style={{ background: COLORS.lightBg, color: COLORS.textDark, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.mutedLight, marginBottom: 10 }}>
            Notre méthode
          </p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", marginBottom: 10 }}>Cinq étapes — de l&apos;audit jusqu&apos;au contentieux</h2>
          <p style={{ color: COLORS.mutedLight, marginBottom: 24 }}>
            Une démarche structurée, proche du RGPD. Les enjeux techniques sont plus lourds.
          </p>

          <div className="flex flex-col">
            {steps.map((s, idx) => (
              <article
                key={s.n}
                style={{
                  background: "transparent",
                  padding: "14px 0",
                  borderBottom: idx < steps.length - 1 ? "1px solid rgba(10,10,20,0.06)" : "none",
                }}
              >
                <div className="mb-2 flex items-center gap-10">
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "1px solid rgba(26,71,255,0.35)",
                      color: COLORS.blue,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontFamily: "monospace",
                    }}
                  >
                    {s.n}
                  </span>
                  {s.pill ? (
                    <span style={{ fontSize: 10, color: COLORS.blue, border: `1px solid ${COLORS.blue}55`, borderRadius: 999, padding: "2px 8px" }}>
                      {s.pill}
                    </span>
                  ) : null}
                </div>
                <h3 style={{ marginBottom: 6, fontSize: 16 }}>{s.title}</h3>
                <p style={{ color: COLORS.mutedLight, margin: 0, lineHeight: 1.7 }}>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AI ETHIC OFFICER */}
      <section style={{ background: COLORS.lightBg, color: COLORS.textDark, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.mutedLight, marginBottom: 10 }}>
            Une approche unique
          </p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", marginBottom: 10 }}>AI Ethic Officer</h2>

          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 18 }}>
            <div
              style={{
                fontSize: 14,
                color: "rgba(10,10,20,0.6)",
                lineHeight: 1.7,
                marginBottom: 20,
                padding: "16px 20px",
                background: "rgba(26,71,255,0.04)",
                border: "1px solid rgba(26,71,255,0.1)",
                borderRadius: 4,
              }}
            >
              L&apos;AI Ethic Officer aide l&apos;entreprise à encadrer l&apos;usage de l&apos;intelligence artificielle : supervision des systèmes, documentation, conformité, sensibilisation des équipes et contrôle des impacts des algorithmes, notamment en matière de biais, de discrimination et de transparence.
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
              <div style={{ border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 0, display: "flex", flexDirection: "column" }}>
                <img
                  src="/images/alexandre-lazaregue.png"
                  alt="Alexandre Lazarègue"
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: 4,
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Alexandre Lazarègue</div>
                  <div style={{ fontSize: 12, color: COLORS.mutedLight }}>Avocat</div>
                  <div style={{ fontSize: 13, color: COLORS.mutedLight, lineHeight: 1.6 }}>Droit du numérique · Cybersécurité · RGPD · AI Act · Contentieux</div>
                </div>
              </div>
              <div style={{ border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 0, display: "flex", flexDirection: "column" }}>
                <img
                  src="/images/nadia-abchiche.png"
                  alt="Nadia Abchiche-Mimouni"
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: 4,
                  }}
                />
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Nadia Abchiche-Mimouni</div>
                  <div style={{ fontSize: 12, color: COLORS.mutedLight }}>AI Ethic Officer</div>
                  <div style={{ fontSize: 13, color: COLORS.mutedLight, lineHeight: 1.6 }}>Docteure en IA · CNRS · Éthique algorithmique · Systèmes IA</div>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: 13,
                color: "rgba(10,10,20,0.55)",
                lineHeight: 1.7,
                padding: "16px 0",
                borderTop: "1px solid rgba(10,10,20,0.07)",
                marginTop: 16,
              }}
            >
              Alexandre Lazarègue qualifie juridiquement vos systèmes IA et construit la documentation qui tient devant les autorités. Nadia Abchiche-Mimouni évalue l&apos;architecture technique des systèmes, leurs biais et leurs impacts éthiques. Deux compétences complémentaires au service d&apos;une gouvernance IA qui couvre l&apos;intégralité du spectre — du contrat à l&apos;algorithme.
            </div>

            <div style={{ background: "#F8F8FB", borderRadius: 8, padding: 14, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ margin: 0, color: COLORS.mutedLight }}>
                Rendre l&apos;IA gouvernable dans votre entreprise — avant que l&apos;absence de règles ne devienne un risque.
              </p>
              <Link
                href="/contact"
                style={{
                  background: COLORS.blue,
                  color: COLORS.textLight,
                  padding: "10px 14px",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontSize: 12,
                }}
              >
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERVENTION INTERACTIVE */}
      <section style={{ background: COLORS.lightBg, color: COLORS.textDark, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.mutedLight, marginBottom: 10 }}>
            Notre intervention
          </p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", marginBottom: 10 }}>Ce que vous recevez concrètement</h2>
          <p style={{ color: COLORS.mutedLight, marginBottom: 20 }}>
            Sélectionnez une mission pour voir les livrables et la transformation.
          </p>

          <div className="mb-4 overflow-x-auto">
            <div
              className="inline-flex min-w-max"
              style={{
                border: "1px solid rgba(10,10,20,0.08)",
                borderRadius: 6,
                overflow: "hidden",
                background: "white",
              }}
            >
              {interventionTabs.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    border: "none",
                    borderRight: idx < interventionTabs.length - 1 ? "1px solid rgba(10,10,20,0.08)" : "none",
                    background: activeTab === t.id ? COLORS.darkBg : COLORS.white,
                    color: activeTab === t.id ? COLORS.textLight : "rgba(10,10,20,0.4)",
                    padding: "8px 12px",
                    fontSize: 12,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ background: COLORS.darkBg, color: COLORS.textLight, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, marginBottom: 4 }}>▣ {activePanel.title}</div>
              <div style={{ color: COLORS.mutedDark, fontSize: 12 }}>{activePanel.subtitle}</div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <div>
                <h3 style={{ fontSize: 13, marginBottom: 10 }}>Livrables remis</h3>
                <div className="flex flex-col gap-2">
                  {activePanel.livrables.map(([name, desc]) => (
                    <div key={name} style={{ border: `1px solid ${COLORS.borderLight}`, borderRadius: 6, padding: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>◉ {name}</div>
                      <div style={{ fontSize: 11, color: COLORS.mutedLight }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 13, marginBottom: 10 }}>Ce que cela change</h3>
                <div className="flex flex-col gap-2">
                  {activePanel.impacts.map(([name, desc]) => (
                    <div key={name} style={{ border: `1px solid ${COLORS.borderLight}`, borderRadius: 6, padding: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3, color: "#1D9E75" }}>✓ {name}</div>
                      <div style={{ fontSize: 11, color: COLORS.mutedLight }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2" style={{ border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 12 }}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr]">
                  <div style={{ background: "rgba(226,75,74,0.08)", border: "1px solid rgba(226,75,74,0.3)", borderRadius: 6, padding: 10 }}>
                    <strong style={{ color: "#E24B4A", fontSize: 11 }}>Avant</strong>
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: COLORS.mutedLight, lineHeight: 1.65 }}>{activePanel.before}</p>
                  </div>
                  <div style={{ display: "grid", placeItems: "center", color: COLORS.blue }}>→</div>
                  <div style={{ background: "rgba(26,71,255,0.08)", border: "1px solid rgba(26,71,255,0.3)", borderRadius: 6, padding: 10 }}>
                    <strong style={{ color: COLORS.blue, fontSize: 11 }}>Après</strong>
                    <p style={{ margin: "6px 0 0", fontSize: 12, color: COLORS.mutedLight, lineHeight: 1.65 }}>{activePanel.after}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8B. QUESTIONS FRÉQUENTES */}
      <section style={{ background: COLORS.lightBg, color: COLORS.textDark, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: COLORS.mutedLight, marginBottom: 10 }}>
            Questions fréquentes
          </p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.2, marginBottom: 24 }}>
            Ce que nos clients nous demandent avant de commencer
          </h2>

          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, overflow: "hidden" }}>
            {[
              {
                id: "q1",
                q: "Mon entreprise est-elle vraiment concernée ?",
                badge: "En vigueur depuis 2024",
                a: "Oui — dès que vous utilisez un système d'IA dans l'UE, même acheté à un tiers. L'AI Act s'applique aux fournisseurs ET aux déployeurs. Un outil RH de tri de CV, un algorithme de scoring client, un chatbot, une API tierce : vous êtes déployeur au sens du règlement et vous avez des obligations directes.",
              },
              {
                id: "q2",
                q: "On utilise juste ChatGPT et Copilot — on est vraiment exposé ?",
                a: "Oui. Utiliser un outil IA tiers ne vous exonère pas de vos responsabilités. Le TJ Paris (fév. 2026, n° 25/57412) a jugé que même une expérimentation Copilot 365 limitée à des volontaires sur 4 mois pouvait déclencher des obligations sociales. Sans politique interne, chaque usage engage l'entreprise — sur les données personnelles des salariés, sur la loyauté des décisions automatisées, sur la traçabilité.",
              },
              {
                id: "q3",
                q: "Quelles sont les obligations concrètes pour un système à haut risque ?",
                badge: "Art. 6 & Annexes I-III RIA",
                a: "Pour tout système IA à haut risque — outil RH de sélection, scoring client, composant dans un dispositif médical — vous devez mettre en place : une gestion continue des risques (art. 9), une gouvernance des données d'entraînement (art. 10), une documentation technique complète (art. 11), une journalisation automatique (art. 12), une supervision humaine effective (art. 14), une évaluation de conformité avant mise sur le marché (art. 43), et un enregistrement dans la base européenne (art. 49). Conservation obligatoire : 10 ans (art. 18).",
              },
              {
                id: "q4",
                q: "L'IA engage-t-elle aussi le droit du travail ?",
                a: "Oui — et c'est souvent la surprise. Le TJ Nanterre (29 jan. 2026, n° 25/02856) a suspendu le déploiement de logiciels IA RH faute de consultation du CSEC au préalable. La Cour de cassation (21 mai 2025, 22-19.925) impose une double conformité pour tout système IA traitant des données de salariés : RGPD ET droit du travail cumulativement. Aucune information personnelle ne peut être collectée sans que le salarié en ait été préalablement informé (art. L.1222-4 C. trav.).",
              },
              {
                id: "q5",
                q: "Nos fournisseurs IA sont responsables — pas nous ?",
                a: "Non. Utiliser une API tierce ou un SaaS IA sans encadrement contractuel ne vous exonère pas. Vous restez déployeur au sens du règlement et responsable du déploiement. La CA Lyon (13 mai 2025, n° 23/04589) a rappelé que la responsabilité de l'utilisateur final doit être clairement documentée dans les CGV. Sans contrat encadrant votre fournisseur IA, le risque est entièrement porté par vous.",
              },
              {
                id: "q6",
                q: "Que se passe-t-il en cas de contrôle ?",
                a: "Les autorités nationales peuvent auditer à tout moment. En cas de contrôle, l'entreprise doit pouvoir démontrer comment son système a été conçu, supervisé et documenté. Un manquement à la documentation ou à la supervision humaine devient un indice de défaut — utilisable dans tout contentieux en responsabilité. Les incidents graves doivent être notifiés dans les 72 h (croisement AI Act / RGPD art. 33).",
              },
              {
                id: "q7",
                q: "À partir de quand mes obligations s'appliquent-elles ?",
                badge: "3 étapes clés",
                a: (
                  <div className="flex flex-col gap-2">
                    <div style={{ borderLeft: "2px solid #E24B4A", padding: "8px 12px", background: "rgba(226,75,74,0.08)", fontSize: 12 }}>
                      → Fév. 2025 : Pratiques interdites — en vigueur (art. 5 RIA)
                    </div>
                    <div style={{ borderLeft: "2px solid #F2A43A", padding: "8px 12px", background: "rgba(242,164,58,0.08)", fontSize: 12 }}>
                      → Août 2025 : IA générative, chatbots, deepfakes — obligations de transparence en vigueur
                    </div>
                    <div style={{ borderLeft: "2px solid #1A47FF", padding: "8px 12px", background: "rgba(26,71,255,0.08)", fontSize: 12 }}>
                      → Août 2027 : Systèmes à haut risque — pleine conformité fournisseurs et déployeurs (art. 6)
                    </div>
                  </div>
                ),
              },
            ].map((item, idx, arr) => {
              const isOpen = openQuestions.includes(item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    borderBottom: idx < arr.length - 1 ? `1px solid ${COLORS.borderLight}` : "none",
                    padding: "0 16px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenQuestions((prev) =>
                        prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                      )
                    }
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      padding: "14px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: COLORS.textDark, marginBottom: item.badge ? 6 : 0 }}>{item.q}</div>
                      {item.badge ? (
                        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: ".06em", color: COLORS.blue, border: "1px solid rgba(26,71,255,0.25)", borderRadius: 999, padding: "2px 8px" }}>
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: 18,
                        color: COLORS.blue,
                        lineHeight: 1,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 180ms ease",
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen ? (
                    <div style={{ padding: "0 0 14px 0", color: COLORS.mutedLight, lineHeight: 1.7, maxWidth: 920 }}>
                      {item.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 10. CTA */}
      <section style={{ background: COLORS.darkBg, color: COLORS.textLight, padding: "64px 48px" }}>
        <div className="mx-auto max-w-6xl text-center">
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.2, marginBottom: 10 }}>
            Structurez votre gouvernance IA avant que le problème arrive.
          </h2>
          <p style={{ color: COLORS.mutedDark, marginBottom: 20 }}>
            Un premier échange pour cartographier vos usages et évaluer votre exposition — sans engagement.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: COLORS.blue,
              color: COLORS.textLight,
              textDecoration: "none",
              padding: "12px 18px",
              borderRadius: 4,
              fontSize: 12,
              letterSpacing: ".04em",
            }}
          >
            Structurer ma gouvernance IA →
          </Link>
        </div>
      </section>
    </main>
  );
}
