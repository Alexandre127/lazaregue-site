"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { MembreCarte } from "@/components/equipe-dossier";
import { fr } from "@/lib/typo";
import { FAQ_ITEMS } from "./faq";

/* ==========================================================================
   Page « Contrats informatiques et projets IT ».

   Intégration de la maquette validée par le cabinet (18 sept. 2026). La maquette
   est la référence de COMPOSITION, de couleurs et d’interactions ; le contenu
   métier et SEO reste celui du dépôt. Alignements repris de la maquette :
   héro à étapes (« Votre contrat, à chaque étape ») sans photo, section
   « Auditer. Rédiger. Négocier. », cinq clauses en tableau à onglets (colonnes
   Le risque / Les questions à poser / Les points à négocier + Ce que nous
   examinons), bandeau contentieux en bleu électrique, FAQ + renvois en deux
   colonnes, contact final en bleu nuit.

   Couleurs = tokens de `app/globals.css` (charte v1.1) : --blue #1A47FF (CTA,
   liens clairs, carte Rédaction, bandeau contentieux, onglet actif), --blue3
   #0A2ACC (survol), --navy #0A0F2E (héro, clauses, contact), --off #F4F4F8,
   --text-muted #4A4A63. Aucune valeur bleu ciel/désaturée. Angles droits.

   Header, menu, pied de page, barre de contact mobile (site-header_bottomBar) et
   parcours /contact sont fournis par le layout global : aucune barre ni modale
   propres à la page (les modales de démonstration de la maquette sont remplacées
   par de vrais liens internes). Le noindex, le title « Maquette » et les routes
   de démonstration de la maquette ne sont pas repris.

   Le contenu des cinq clauses fusionne la présentation de la maquette (colonnes)
   avec les précisions juridiques VERBATIM du dépôt (obligation essentielle et
   clause réputée non écrite ; caducité de l’ensemble des contrats
   interdépendants ; « sauvegarde = pratique, pas obligation » ; récupération au
   rapport de force défavorable ; SLA sans pénalité = promesse commerciale).
   Aucune règle juridique ni jurisprudence nouvelle n’est inventée.
   ========================================================================== */

/* ---- Tokens de la charte (aucune valeur en dur) ---- */
const BLUE = "var(--blue)";
const BLUE3 = "var(--blue3)"; // survol / labels sur clair
const NAVY = "var(--navy)";
const INK = "var(--ink)";
const WH = "var(--wh)";
const GHOST = "var(--off)";
const BD = "var(--bd)";
const MUTED = "var(--text-muted)";
const ON_DARK = "var(--wh)";

const HEADER_H = 72;

/* Parcours de contact réel. On transmet l’objet et, quand c’est utile, la
   situation, selon la convention du site (`/contact?objet=…`). */
const CONTACT = "/contact?objet=contrats-informatiques";
const contactObjet = (situation?: string) =>
  situation ? `${CONTACT}&situation=${situation}` : CONTACT;

/* Route de la page contentieux (publiée). */
const CONTENTIEUX = "/nos-domaines/contentieux-informatique-commercial";

/* ---------- Données (contenu du dépôt) ----------------------------------- */

const HERO_STAGES = [
  { n: "01", t: "Avant de signer.", s: "Définir les engagements et négocier.", href: "#accompagnement" },
  { n: "02", t: "Pendant le projet.", s: "Encadrer l’exécution et les évolutions.", href: "#contrats" },
  { n: "03", t: "Au moment de sortir.", s: "Organiser la transition et la réversibilité.", href: "#reversibilite" },
];

const HERO_BASELINE = [
  "Clients et prestataires informatiques",
  "Paris · Intervention partout en France",
  "Cabinet fondé en 2016",
];

const SITUATIONS = [
  {
    q: "Un contrat est sur la table.",
    d: "Contrat imposé par un éditeur ou un donneur d’ordre, négociation à engager, projet à cadrer avant signature.",
    l: "Audit, rédaction et négociation",
    href: "#accompagnement",
  },
  {
    q: "Un contrat doit être renouvelé ou corrigé.",
    d: "Échéance proche, avenant, niveaux de service à revoir ou obligation de sauvegarde absente.",
    l: "Les cinq clauses décisives",
    href: "#clauses",
  },
  {
    q: "Un changement de prestataire est bloqué.",
    d: "Réversibilité refusée, format inexploitable ou frais de sortie disproportionnés.",
    l: "Examiner la réversibilité",
    href: "#reversibilite",
  },
  {
    q: "Un différend est déjà engagé.",
    d: "Retards contestés, logiciel non conforme, rupture, perte de données ou mise en demeure.",
    l: "Le contentieux informatique",
    href: "#contentieux",
  },
];

const SERVICES = [
  {
    n: "01",
    titre: "Auditer un contrat",
    p: "Identifier les engagements, les clauses défavorables et les risques avant de décider.",
    items: ["Qualification de l’opération", "Matrice des risques contractuels", "Points à corriger ou à négocier"],
    link: "Faire examiner un contrat",
    situation: "audit",
    primary: false,
  },
  {
    n: "02",
    titre: "Rédiger le contrat",
    p: "Traduire le projet en obligations précises, avec des procédures de validation et de sortie.",
    items: ["Expression du besoin et livrables", "Contrat ou avenant adapté", "Articulation avec les autres contrats"],
    link: "Présenter votre projet",
    situation: "redaction",
    primary: true,
  },
  {
    n: "03",
    titre: "Négocier les conditions",
    p: "Porter vos positions face au client, à l’éditeur ou au prestataire et travailler les points de désaccord.",
    items: ["Priorités et marges de négociation", "Propositions de rédaction", "Appui dans les échanges"],
    link: "Préparer la négociation",
    situation: "negociation",
    primary: false,
  },
];

/* Dix familles : résumé court (visible, maquette) + précisions du dépôt (corps
   de l’accordéon, plus détaillé). */
const FAMILIES = [
  {
    titre: "Contrats SaaS et cloud",
    desc: "Disponibilité du service, évolution de l’offre et conditions de sortie.",
    body: "Ni vente ni licence classique : l’accès à un service continu dont le client ne maîtrise ni l’infrastructure, ni le rythme des évolutions. Niveaux de service, localisation des données, conditions de sortie, frais de migration.",
  },
  {
    titre: "Licences de logiciels",
    desc: "Droits d’utilisation, audits éditeur et développements spécifiques.",
    body: "Étendue des droits concédés, nombre d’utilisateurs et de postes, périmètre géographique, droit d’audit de l’éditeur, sous-licence, sort des développements spécifiques.",
  },
  {
    titre: "Développement de logiciels et d’applications",
    desc: "Cahier des charges, livraison et propriété du code source.",
    body: "Obligation de moyens renforcée, pouvant devenir obligation de résultat lorsque le prestataire s’engage sur un livrable conforme à un cahier des charges précis. La propriété du code source se joue au même endroit.",
  },
  {
    titre: "Intégration d’ERP, de CRM et de solutions métier",
    desc: "Expression du besoin, reprise des données et procédure de recette.",
    body: "Causes classiques d’échec : besoin insuffisamment exprimé, reprise de données sous-estimée, recette conduite sans réserves écrites, calendrier glissant. Structuration du projet, procédure de recette, traçabilité des alertes.",
  },
  {
    titre: "Infogérance et externalisation",
    desc: "Périmètre des services, sauvegardes et changement de prestataire.",
    body: "Transfert au prestataire de tout ou partie de l’exploitation du système d’information : périmètre exact des services, engagements de disponibilité, obligations de sécurité et de sauvegarde, plan de réversibilité.",
  },
  {
    titre: "Maintenance et support informatique",
    desc: "Délais d’intervention, rétablissement et exclusions de service.",
    body: "Un contrat de maintenance se lit d’abord par ce qu’il exclut : correctif, évolutif et préventif, délais de prise en charge et de rétablissement, plages d’astreinte, versions non maintenues.",
  },
  {
    titre: "Hébergement, cloud et services managés",
    desc: "Localisation, sous-traitance et récupération des données.",
    body: "Localisation et souveraineté des données, mesures de sécurité contractualisées, notification des incidents, sous-traitance en cascade, conditions et coût de récupération des données en fin de contrat. Le cabinet traite également l’hébergement de données de santé.",
  },
  {
    titre: "Assistance technique, régie et forfait",
    desc: "Pilotage du projet, responsabilité et répartition des rôles.",
    body: "Le choix entre régie et forfait modifie la répartition des responsabilités, le pilotage du projet et l’appréciation des retards. Il emporte aussi un risque de requalification lorsque l’encadrement effectif des intervenants échappe au prestataire.",
  },
  {
    titre: "Contrats de données, API et interconnexions",
    desc: "Accès, réutilisation et responsabilités sur les données.",
    body: "Mise à disposition de bases de données, contrats d’interface, conditions d’accès aux API, droits d’usage et de réutilisation, articulation avec les rôles de responsable de traitement et de sous-traitant au sens du RGPD.",
  },
  {
    titre: "Contrats de cybersécurité et de sauvegarde",
    desc: "Détection, restauration et engagements en cas d’incident.",
    body: "Sauvegarde, supervision, détection et réponse à incident. C’est la rédaction de ces engagements, et non la qualification générale du contrat, qui déterminera la responsabilité le jour de l’incident.",
  },
];

/* Cinq clauses décisives — présentation en colonnes (maquette) + précisions
   juridiques du dépôt. Clé « reversibilite » = ancre #reversibilite, ouverte au
   départ (index 1). Aucune règle nouvelle : les points de droit (obligation
   essentielle / clause réputée non écrite ; caducité de l’ensemble) proviennent
   du contenu validé du dépôt. */
const CLAUSES = [
  {
    key: "sauvegarde",
    titre: "Sécurité et sauvegarde",
    heading: "Une sauvegarde prévue. Des données réellement restaurables.",
    risque:
      "Une sauvegarde existe, mais elle est incomplète, inaccessible ou inutilisable lors de la restauration. Sans engagement écrit, la sauvegarde reste une pratique, pas une obligation.",
    questions:
      "Quelles données sont couvertes ? À quelle fréquence ? La sauvegarde est-elle externalisée ? Qui teste la restauration, en conserve la preuve et sur quel délai de reprise s’engage-t-il ?",
    negociation:
      "Le périmètre des sauvegardes, la fréquence, la rétention, l’externalisation, les tests de restauration, le délai de reprise garanti et la répartition des responsabilités.",
    work:
      "Nous rapprochons les engagements écrits du dispositif technique décrit par le prestataire. Les obligations de sauvegarde, de contrôle et d’alerte doivent pouvoir être vérifiées.",
  },
  {
    key: "reversibilite",
    titre: "Réversibilité",
    heading: "Changer de prestataire sans perdre la maîtrise de ses données.",
    risque:
      "Des données restituées dans un format inexploitable, une assistance à la transition non prévue ou des frais de sortie contestés. À défaut de clause, la récupération se négocie au moment où le rapport de force est le plus défavorable.",
    questions:
      "Dans quel format, à quel prix et dans quel délai les données seront-elles remises ? Qui accompagne la transition, et pendant combien de temps ?",
    negociation:
      "Les formats de restitution, la durée et le contenu de l’assistance à la migration, le plafonnement du coût, les délais et la conservation des données pendant la transition.",
    work:
      "Nous examinons les conditions de sortie pendant que le contrat peut encore être négocié ou exécuté. L’objectif est de définir une transition réalisable et les engagements de chacun.",
  },
  {
    key: "responsabilite",
    titre: "Responsabilité",
    heading: "Un plafond de responsabilité à mesurer au regard du risque.",
    risque:
      "Une réparation plafonnée sans rapport avec les conséquences possibles d’une indisponibilité ou d’une perte de données. Un plafond aligné sur douze mois d’abonnement couvre rarement une perte réelle.",
    questions:
      "Quels dommages sont couverts ou exclus ? Comment le plafond se calcule-t-il ? Que couvre effectivement l’assurance du prestataire ?",
    negociation:
      "Le plafond, son périmètre, les exclusions et leur articulation avec l’obligation essentielle du contrat et les assurances.",
    work:
      "Nous analysons la portée des limitations au regard du contrat et de la mission. Seule est réputée non écrite la clause qui contredit la portée de l’obligation essentielle : un plafond non dérisoire, librement négocié, résiste au manquement même essentiel.",
  },
  {
    key: "service",
    titre: "Niveaux de service",
    heading: "Des engagements mesurables, au-delà d’un taux de disponibilité.",
    risque:
      "Un engagement de disponibilité affiché, mais des exclusions larges ou aucun délai précis de rétablissement. Un engagement de service sans pénalité ni crédit associé reste une promesse commerciale.",
    questions:
      "Comment le service est-il mesuré ? Quand le délai de prise en charge commence-t-il ? Les pénalités excluent-elles tout autre recours ?",
    negociation:
      "Les indicateurs, les exclusions, les délais de prise en charge et de rétablissement, l’escalade, les pénalités ou crédits et les conséquences des manquements.",
    work:
      "Nous examinons ensemble les niveaux de service, les procédures d’incident et les clauses de responsabilité pour éviter des engagements qui se contredisent.",
  },
  {
    key: "interdependance",
    titre: "Interdépendance contractuelle",
    heading: "Licence, intégration, maintenance, financement : lire l’ensemble.",
    risque:
      "Une prestation défaillante alors que les autres contrats et les échéances de financement continuent de produire leurs effets.",
    questions:
      "Quels contrats forment l’opération ? Que prévoit chacun si l’intégration échoue ou si l’un des contrats prend fin ?",
    negociation:
      "L’articulation des contrats, les validations communes et les conséquences de la défaillance ou de la fin d’un engagement.",
    work:
      "Nous reconstituons l’opération contractuelle dans son ensemble. Lorsque ces contrats poursuivent un même but et n’ont aucun sens séparément, leur interdépendance peut être reconnue et emporter la caducité de l’ensemble.",
  },
];

const AVOCATS = [
  { slug: "alexandre", role: "Contrats, négociation et structuration des projets.", tags: ["Contrats IT", "Négociation", "Cybersécurité"] },
  { slug: "amir", role: "Analyse et exécution des contrats IT.", tags: ["Contrats IT", "Exécution", "Responsabilité"] },
  { slug: "sarah", role: "Données personnelles et intelligence artificielle.", tags: ["RGPD", "Contrats de données", "IA"] },
];

const KHALID_EXAMINE = [
  "Architecture applicative et dépendances entre les briques du système",
  "État réel des sauvegardes et des tests de restauration",
  "Journaux, configurations et traces d’intervention du prestataire",
  "Chronologie technique des anomalies et des correctifs",
  "Faisabilité et format des opérations de réversibilité",
];

/* « Ce qui engage les parties — et ce qui permet de le prouver » : le contenu de
   différenciation juridique/technique restauré de la version initiale. */
const ENGAGE: { titre: string; p: string }[] = [
  {
    titre: "Les obligations du prestataire",
    p: "Obligation d’information, de conseil et de mise en garde ; engagements de sécurité, de disponibilité, de sauvegarde et de réversibilité.",
  },
  {
    titre: "La coopération du client",
    p: "Expression des besoins, validation des livrables, recettes, réserves et décisions prises pendant le projet.",
  },
  {
    titre: "Les preuves à conserver",
    p: "Contrat et cahier des charges, avenants, courriels, tickets, journaux techniques, tests de restauration, procès-verbaux et rapports d’expertise.",
  },
];

/* Trois cas COMPACTS présentés comme des situations-types (aucun dossier réel,
   aucun montant, aucun résultat — cf. brief : à confirmer par le cabinet avant
   toute présentation en dossier réel). */
const CAS: { situation: string; examine: string; enjeu: string }[] = [
  {
    situation: "Des sauvegardes prévues au contrat se révèlent inutilisables après un incident.",
    examine: "Le périmètre réellement sauvegardé, la fréquence, les tests de restauration et les engagements écrits du prestataire.",
    enjeu: "Déterminer si l’inexécution engage la responsabilité du prestataire ou relève d’un partage.",
  },
  {
    situation: "Un projet ERP accuse un retard important ou ne fonctionne pas comme prévu.",
    examine: "Le cahier des charges, la procédure de recette, les réserves émises et la chronologie des alertes.",
    enjeu: "Décider entre poursuite encadrée, renégociation ou sortie, en sécurisant les preuves.",
  },
  {
    situation: "Les données sont bloquées lors d’un changement de prestataire.",
    examine: "La clause de réversibilité, les formats de restitution, les délais et le coût de sortie annoncés.",
    enjeu: "Rétablir l’accès aux données et organiser une transition réalisable.",
  },
];

/* FAQ complémentaire (« Autres questions ») — réponses VERBATIM de la version
   initiale (git a8fd008). */
const AUTRES_FAQ: { q: string; a: string }[] = [
  {
    q: "Que doit contenir un cahier des charges informatique ?",
    a: "Périmètre fonctionnel, environnement technique existant, volumétrie, contraintes d’interopérabilité, jalons, livrables et critères de recette. Son absence ne profite pas au prestataire : il lui appartient d’en exiger la rédaction, d’émettre des réserves ou de refuser de s’engager.",
  },
  {
    q: "Comment organiser la recette d’un logiciel ?",
    a: "Par une procédure écrite : jeux d’essai, critères d’acceptation, délais de vérification, effets d’une recette avec réserves et d’un refus. Une recette signée sans réserve fragilise durablement toute contestation ultérieure.",
  },
  {
    q: "Comment se prépare une expertise judiciaire informatique ?",
    a: "Par la conservation immédiate des journaux, configurations et échanges, l’identification d’un conseil technique aux côtés de l’avocat, et la préparation des dires. L’expertise se joue largement sur les pièces produites lors des premières réunions.",
  },
];

const RELATED = [
  { label: "Obligations de sécurité et réponse à incident", href: "/nos-domaines/cybersecurite" },
  { label: "Sous-traitance et données personnelles", href: "/nos-domaines/rgpd-donnees-personnelles" },
  { label: "Intelligence artificielle et prestataires", href: "/nos-domaines/avocat-intelligence-artificielle" },
  { label: "Acquisition et due diligence technologique", href: "/nos-domaines/ma-tech" },
  { label: "Contentieux informatique et commercial", href: CONTENTIEUX },
];

/* ---------- Primitives locales ------------------------------------------- */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className="cx-label"
      style={{ color: light ? "#fff" : BLUE3 }}
    >
      {typeof children === "string" ? fr(children) : children}
    </span>
  );
}

/* Tableau des cinq clauses. Amélioration progressive : sans JavaScript, les cinq
   panneaux sont empilés et lisibles (contenu disponible pour l’indexation). Une
   fois monté (`enhanced`), le composant bascule en onglets (bureau) ou en
   accordéon (mobile), en répliquant la logique de la maquette validée. */
function ClauseBoard() {
  const [enhanced, setEnhanced] = useState(false);
  const [selected, setSelected] = useState(1); // Réversibilité par défaut
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<Record<number, boolean>>({ 1: true });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const apply = () => setIsMobile(mq.matches);
    // setState différé (hors corps synchrone de l'effet) : bascule en mode
    // « enhanced » après le premier rendu, qui reste identique au HTML serveur.
    const id = window.setTimeout(() => {
      setEnhanced(true);
      apply();
    }, 0);
    mq.addEventListener("change", apply);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", apply);
    };
  }, []);

  // Ouverture de la clause réversibilité par ancre (#reversibilite), y compris à
  // l’arrivée directe par URL, depuis le héro ou la carte « situation ».
  const openReversibilite = useCallback(() => {
    setSelected(1);
    setMobileOpen((m) => ({ ...m, 1: true }));
  }, []);

  useEffect(() => {
    const onHash = () => {
      if (typeof window === "undefined") return;
      if (/reversibilite/.test(window.location.hash)) openReversibilite();
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [openReversibilite]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowDown") next = (i + 1) % CLAUSES.length;
    else if (e.key === "ArrowUp") next = (i + CLAUSES.length - 1) % CLAUSES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = CLAUSES.length - 1;
    else return;
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={`cx-clause-board${enhanced ? " enhanced" : ""}`} id="clause-board">
      <div className="cx-clause-nav" role="tablist" aria-label="Clauses contractuelles" aria-orientation="vertical">
        {CLAUSES.map((c, i) => (
          <button
            key={c.key}
            id={`tab-${c.key}`}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={i === selected}
            aria-controls={`panel-${c.key}`}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <span aria-hidden>{`0${i + 1}`}</span>
            {fr(c.titre)}
          </button>
        ))}
      </div>

      <div className="cx-clause-panels">
        {CLAUSES.map((c, i) => {
          // Bureau amélioré : seul le panneau sélectionné est visible.
          const hiddenDesktop = enhanced && !isMobile && i !== selected;
          const open = mobileOpen[i] ?? false;
          return (
            <article
              key={c.key}
              className={`cx-clause-panel${open ? " mobile-open" : ""}`}
              id={i === 1 ? "reversibilite" : `panel-${c.key}`}
              hidden={hiddenDesktop || undefined}
              role={enhanced && !isMobile ? "tabpanel" : undefined}
              aria-labelledby={enhanced && !isMobile ? `tab-${c.key}` : undefined}
              style={{ scrollMarginTop: HEADER_H + 12 }}
            >
              <button
                type="button"
                className="cx-clause-mobile-title"
                aria-expanded={open}
                aria-controls={`body-${c.key}`}
                onClick={() => setMobileOpen((m) => ({ ...m, [i]: !open }))}
              >
                <span>{`0${i + 1} / ${c.titre}`}</span>
                <span aria-hidden>{open ? "−" : "+"}</span>
              </button>
              <div className="cx-clause-body" id={`body-${c.key}`}>
                <span className="cx-label" style={{ color: BLUE }}>{`Clause 0${i + 1} / 05 · ${c.titre}`}</span>
                <h3>{fr(c.heading)}</h3>
                <div className="cx-clause-columns">
                  <div>
                    <h4>Le risque</h4>
                    <p>{fr(c.risque)}</p>
                  </div>
                  <div>
                    <h4>Les questions à poser</h4>
                    <p>{fr(c.questions)}</p>
                  </div>
                  <div>
                    <h4>Les points à négocier</h4>
                    <p>{fr(c.negociation)}</p>
                  </div>
                </div>
                <div className="cx-clause-work">
                  <strong>Ce que nous examinons</strong>
                  <p>{fr(c.work)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ======================================================================== */

export default function ContratsInformatiquesClient() {
  return (
    <main data-domaine="contrats" style={{ background: WH, color: INK, fontFamily: "var(--ff-body)", fontSize: 17, overflowX: "clip" }}>
      <style>{`
        [data-domaine="contrats"] .cx-wrap { max-width: var(--content-max); margin: 0 auto; padding: 0 var(--page-margin); }
        @media (max-width: 640px) { [data-domaine="contrats"] .cx-wrap { padding: 0 var(--page-margin-mobile); } }
        [data-domaine="contrats"] .cx-section { padding: clamp(56px, 8vw, 88px) 0; }

        /* Labels de section — DM Mono, tracking large, majuscules. */
        [data-domaine="contrats"] .cx-label { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; display: block; margin-bottom: 16px; line-height: 1.5; }

        /* Titres. */
        [data-domaine="contrats"] h2 { font-family: var(--ff-body); font-weight: 500; font-size: clamp(29px, 3.3vw, 44px); line-height: 1.14; letter-spacing: -0.02em; margin: 0; }
        [data-domaine="contrats"] h3 { font-family: var(--ff-body); font-weight: 500; font-size: 22px; line-height: 1.3; letter-spacing: -0.02em; margin: 0; }

        /* En-tête de section à deux colonnes. */
        [data-domaine="contrats"] .cx-split-head { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.8fr); gap: 48px; align-items: end; margin-bottom: 38px; }
        [data-domaine="contrats"] .cx-split-head > div { max-width: 700px; }
        [data-domaine="contrats"] .cx-split-head > p { max-width: 385px; color: var(--text-muted); margin: 0; font-size: 16px; }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-split-head { display: block; margin-bottom: 27px; } [data-domaine="contrats"] .cx-split-head > p { margin-top: 18px; max-width: none; } }

        /* Boutons. */
        [data-domaine="contrats"] .cx-btn { display: inline-flex; gap: 24px; align-items: center; justify-content: space-between; min-height: 50px; padding: 14px 22px; background: var(--blue); border: 1px solid var(--blue); color: #fff; text-decoration: none; font-family: var(--ff-body); font-size: 16px; font-weight: 600; line-height: 1.4; transition: background 0.18s ease; }
        [data-domaine="contrats"] .cx-btn:hover { background: var(--blue3); }
        [data-domaine="contrats"] .cx-btn.outline { background: transparent; color: inherit; border-color: currentColor; }
        [data-domaine="contrats"] .cx-link { display: inline-flex; align-items: center; gap: 14px; min-height: 44px; color: var(--blue); font-weight: 500; font-size: 16px; text-decoration: none; }
        [data-domaine="contrats"] .cx-link:hover { text-decoration: underline; text-underline-offset: 5px; }

        /* Fil d’Ariane. */
        [data-domaine="contrats"] .cx-crumb ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 9px; font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.04em; }
        [data-domaine="contrats"] .cx-crumb a { color: var(--muted-on-dark); text-decoration: none; }
        [data-domaine="contrats"] .cx-crumb a:hover { text-decoration: underline; }

        /* Héro. */
        [data-domaine="contrats"] .cx-hero { position: relative; isolation: isolate; overflow: hidden; background: var(--navy); color: #fff; }
        [data-domaine="contrats"] .cx-hero::before { content: ""; position: absolute; width: 750px; height: 700px; background: radial-gradient(ellipse, rgba(26,71,255,0.14), transparent 68%); right: -260px; top: -200px; z-index: -1; }
        [data-domaine="contrats"] .cx-hero-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.85fr); gap: 50px; align-items: center; padding: 37px 0 55px; }
        [data-domaine="contrats"] .cx-hero h1 { font-family: var(--ff-display); font-weight: 400; font-size: clamp(48px, 5.3vw, 76px); line-height: 1.02; letter-spacing: 0; margin: 0; max-width: 12ch; text-transform: uppercase; }
        [data-domaine="contrats"] .cx-hero-copy { margin-top: 24px; color: #e1e2eb; font-size: 18px; line-height: 1.6; max-width: 60ch; }
        [data-domaine="contrats"] .cx-hero-copy strong { color: #fff; font-weight: 600; }
        [data-domaine="contrats"] .cx-hero-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 28px; }
        [data-domaine="contrats"] .cx-hero-actions .cx-link { color: #fff; font-size: 14px; }
        [data-domaine="contrats"] .cx-hero-art { align-self: stretch; display: flex; flex-direction: column; justify-content: center; padding: 26px 0; }
        [data-domaine="contrats"] .cx-hero-art .cx-overline { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.06em; color: #d6d8e9; margin: 0 0 23px; }
        [data-domaine="contrats"] .cx-hero-stage { border-top: 1px solid rgba(255,255,255,0.35); padding: 20px 0; display: grid; grid-template-columns: 40px 1fr 24px; gap: 16px; align-items: start; text-decoration: none; color: #fff; transition: padding 0.2s ease, background 0.2s ease; }
        [data-domaine="contrats"] .cx-hero-stage:last-child { border-bottom: 1px solid rgba(255,255,255,0.35); }
        [data-domaine="contrats"] .cx-hero-stage:hover { padding-inline: 12px; background: rgba(255,255,255,0.05); }
        [data-domaine="contrats"] .cx-hero-stage strong { font-size: 22px; line-height: 1.2; font-weight: 500; display: block; }
        [data-domaine="contrats"] .cx-hero-stage small { display: block; margin-top: 7px; color: #c6c8d6; font-size: 14px; }
        [data-domaine="contrats"] .cx-hero-stage .n { font-family: var(--ff-display); font-weight: 400; font-size: 32px; line-height: 1; }
        [data-domaine="contrats"] .cx-hero-baseline { border-top: 1px solid rgba(255,255,255,0.25); display: flex; gap: 34px; padding: 20px 0; font-family: var(--ff-mono); font-size: 12px; color: #dedfea; flex-wrap: wrap; }
        [data-domaine="contrats"] .cx-hero-baseline span::before { content: ""; display: inline-block; width: 5px; height: 5px; background: #fff; margin-right: 10px; vertical-align: middle; }
        @media (max-width: 1050px) { [data-domaine="contrats"] .cx-hero-grid { grid-template-columns: 1.25fr 0.75fr; gap: 28px; } [data-domaine="contrats"] .cx-hero-stage strong { font-size: 21px; } }
        @media (max-width: 760px) {
          [data-domaine="contrats"] .cx-hero-grid { grid-template-columns: 1fr; padding: 24px 0 32px; gap: 0; }
          [data-domaine="contrats"] .cx-hero-art { display: none; }
          [data-domaine="contrats"] .cx-hero h1 { font-size: clamp(46px, 8.8vw, 64px); max-width: none; }
          [data-domaine="contrats"] .cx-hero-copy { font-size: 17px; }
          [data-domaine="contrats"] .cx-hero-baseline { gap: 12px 25px; font-size: 11px; }
        }
        @media (max-width: 480px) {
          [data-domaine="contrats"] .cx-hero h1 { font-size: 48px; }
          [data-domaine="contrats"] .cx-hero-actions { display: block; }
          [data-domaine="contrats"] .cx-hero-actions .cx-btn { width: 100%; }
          [data-domaine="contrats"] .cx-hero-actions .cx-link { margin-top: 10px; }
          [data-domaine="contrats"] .cx-hero-baseline span:last-child { display: none; }
        }

        /* Situations. */
        [data-domaine="contrats"] .cx-situations { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid var(--bd); }
        [data-domaine="contrats"] .cx-situation { padding: 29px 25px; display: flex; flex-direction: column; gap: 18px; text-decoration: none; color: inherit; transition: background 0.2s ease, color 0.2s ease; }
        [data-domaine="contrats"] .cx-situation + .cx-situation { border-left: 1px solid var(--bd); }
        [data-domaine="contrats"] .cx-situation h3 { font-size: 21px; }
        [data-domaine="contrats"] .cx-situation p { font-size: 15px; color: var(--text-muted); margin: 0; line-height: 1.5; }
        [data-domaine="contrats"] .cx-situation .route { margin-top: auto; font-size: 14px; font-weight: 500; color: var(--blue); display: flex; justify-content: space-between; gap: 12px; align-items: center; line-height: 1.45; padding-top: 7px; }
        [data-domaine="contrats"] .cx-situation:hover, [data-domaine="contrats"] .cx-situation:focus-visible { background: var(--navy); color: #fff; }
        [data-domaine="contrats"] .cx-situation:hover p, [data-domaine="contrats"] .cx-situation:hover .route, [data-domaine="contrats"] .cx-situation:focus-visible p, [data-domaine="contrats"] .cx-situation:focus-visible .route { color: #fff; }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-situations { grid-template-columns: repeat(2, minmax(0, 1fr)); } [data-domaine="contrats"] .cx-situation:nth-child(3) { border-left: 0; } [data-domaine="contrats"] .cx-situation:nth-child(n+3) { border-top: 1px solid var(--bd); } }
        @media (max-width: 480px) { [data-domaine="contrats"] .cx-situations { grid-template-columns: 1fr; } [data-domaine="contrats"] .cx-situation + .cx-situation { border-left: 0; border-top: 1px solid var(--bd); } }

        /* Services : Auditer. Rédiger. Négocier. */
        [data-domaine="contrats"] .cx-services { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        [data-domaine="contrats"] .cx-service { background: #fff; padding: 30px 28px; border-top: 3px solid var(--ink); display: flex; flex-direction: column; align-items: start; }
        [data-domaine="contrats"] .cx-service .big { font-family: var(--ff-display); font-weight: 400; font-size: 64px; line-height: 1; color: var(--blue); margin-bottom: 22px; }
        [data-domaine="contrats"] .cx-service h3 { font-size: 25px; margin-bottom: 15px; }
        [data-domaine="contrats"] .cx-service p { font-size: 16px; color: var(--text-muted); margin: 0; line-height: 1.6; }
        [data-domaine="contrats"] .cx-service ul { padding: 0; margin: 22px 0; list-style: none; width: 100%; font-size: 15px; }
        [data-domaine="contrats"] .cx-service li { border-top: 1px solid var(--bd); padding: 10px 0; }
        [data-domaine="contrats"] .cx-service .cx-link { margin-top: auto; }
        [data-domaine="contrats"] .cx-service.primary { background: var(--blue); color: #fff; border-color: var(--blue); }
        [data-domaine="contrats"] .cx-service.primary .big, [data-domaine="contrats"] .cx-service.primary p, [data-domaine="contrats"] .cx-service.primary .cx-link { color: #fff; }
        [data-domaine="contrats"] .cx-service.primary li { border-color: rgba(255,255,255,0.45); }
        [data-domaine="contrats"] .cx-timing { margin-top: 32px; display: flex; gap: 22px; align-items: baseline; }
        [data-domaine="contrats"] .cx-timing .cx-label { flex-shrink: 0; margin: 0; color: var(--blue3); }
        [data-domaine="contrats"] .cx-timing p { font-size: 15px; color: var(--text-muted); margin: 0; line-height: 1.6; }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-services { grid-template-columns: 1fr; gap: 18px; } [data-domaine="contrats"] .cx-service { padding: 25px; display: grid; grid-template-columns: 58px minmax(0, 1fr); column-gap: 20px; } [data-domaine="contrats"] .cx-service .big { font-size: 49px; grid-row: 1 / 3; margin: 0; } [data-domaine="contrats"] .cx-service h3 { font-size: 23px; margin: 0 0 12px; } [data-domaine="contrats"] .cx-service p, [data-domaine="contrats"] .cx-service ul, [data-domaine="contrats"] .cx-service .cx-link { grid-column: 2; } [data-domaine="contrats"] .cx-service ul { margin: 17px 0 8px; } [data-domaine="contrats"] .cx-timing { display: block; } [data-domaine="contrats"] .cx-timing p { margin-top: 12px; } }

        /* Familles de contrats. */
        [data-domaine="contrats"] .cx-contract-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 55px; margin-bottom: 35px; }
        [data-domaine="contrats"] .cx-contract-intro p { color: var(--text-muted); font-size: 16px; margin: 0; line-height: 1.6; }
        [data-domaine="contrats"] .cx-family-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 42px; }
        [data-domaine="contrats"] .cx-family { border-top: 1px solid var(--bd); }
        [data-domaine="contrats"] .cx-family summary { list-style: none; display: grid; grid-template-columns: 1fr 22px; gap: 14px; padding: 22px 0; min-height: 96px; align-items: center; }
        [data-domaine="contrats"] .cx-family summary::-webkit-details-marker { display: none; }
        [data-domaine="contrats"] .cx-family h3 { font-size: 20px; }
        [data-domaine="contrats"] .cx-family .desc { font-size: 15px; color: var(--text-muted); margin-top: 6px; display: block; }
        [data-domaine="contrats"] .cx-family .plus { font-family: var(--ff-body); font-weight: 400; font-size: 25px; line-height: 1; color: var(--blue); align-self: center; transition: transform 0.2s ease; }
        [data-domaine="contrats"] .cx-family[open] .plus { transform: rotate(45deg); }
        [data-domaine="contrats"] .cx-family[open] { border-top-color: var(--blue); }
        [data-domaine="contrats"] .cx-family > p { padding: 0 36px 23px 0; font-size: 16px; color: var(--text-muted); margin: 0; line-height: 1.6; }
        [data-domaine="contrats"] .cx-family summary:hover h3 { color: var(--blue); }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-contract-intro { grid-template-columns: 1fr; gap: 20px; } [data-domaine="contrats"] .cx-family-grid { grid-template-columns: 1fr; } [data-domaine="contrats"] .cx-family summary { min-height: 0; padding: 20px 0; } }

        /* Clauses (tableau à onglets). */
        [data-domaine="contrats"] .cx-clause-board { display: grid; grid-template-columns: 285px minmax(0, 1fr); border: 1px solid rgba(255,255,255,0.35); align-items: start; }
        [data-domaine="contrats"] .cx-clause-nav { display: none; }
        [data-domaine="contrats"] .cx-clause-board.enhanced .cx-clause-nav { display: block; }
        [data-domaine="contrats"] .cx-clause-nav button { width: 100%; text-align: left; display: flex; align-items: center; gap: 16px; padding: 23px 20px; min-height: 75px; background: transparent; border: 0; border-bottom: 1px solid rgba(255,255,255,0.25); color: #fff; font-family: var(--ff-body); font-size: 15px; transition: background 0.2s ease; cursor: pointer; }
        [data-domaine="contrats"] .cx-clause-nav button span { font-family: var(--ff-mono); font-size: 13px; color: #c4c6d5; }
        [data-domaine="contrats"] .cx-clause-nav button[aria-selected="true"] { background: var(--blue); }
        [data-domaine="contrats"] .cx-clause-nav button[aria-selected="true"] span { color: #fff; }
        [data-domaine="contrats"] .cx-clause-nav button:hover { background: rgba(255,255,255,0.08); }
        [data-domaine="contrats"] .cx-clause-nav button[aria-selected="true"]:hover { background: var(--blue3); }
        [data-domaine="contrats"] .cx-clause-panels { background: #fff; color: var(--ink); min-width: 0; }
        [data-domaine="contrats"] .cx-clause-panel { padding: 33px; min-height: 440px; }
        [data-domaine="contrats"] .cx-clause-panel[hidden] { display: none; }
        [data-domaine="contrats"] .cx-clause-panel h3 { font-size: 28px; max-width: 620px; margin: 0; }
        [data-domaine="contrats"] .cx-clause-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 30px; }
        [data-domaine="contrats"] .cx-clause-columns > div { border-top: 2px solid var(--bd); padding-top: 17px; }
        [data-domaine="contrats"] .cx-clause-columns > div:last-child { border-color: var(--blue); }
        [data-domaine="contrats"] .cx-clause-columns h4 { font-family: var(--ff-body); font-weight: 500; font-size: 14px; line-height: 1.4; margin: 0 0 12px; }
        [data-domaine="contrats"] .cx-clause-columns p { font-size: 15px; line-height: 1.65; color: var(--text-muted); margin: 0; }
        [data-domaine="contrats"] .cx-clause-work { margin-top: 28px; border-top: 1px solid var(--bd); padding-top: 20px; font-size: 15px; }
        [data-domaine="contrats"] .cx-clause-work strong { display: block; font-weight: 600; margin-bottom: 7px; }
        [data-domaine="contrats"] .cx-clause-work p { color: var(--text-muted); margin: 0; line-height: 1.6; }
        [data-domaine="contrats"] .cx-clause-mobile-title { display: none; }
        /* Sans JS : les panneaux s’empilent, séparés par un filet. */
        @media (min-width: 761px) { [data-domaine="contrats"] .cx-clause-board:not(.enhanced) .cx-clause-panel + .cx-clause-panel { border-top: 1px solid var(--bd); } }
        [data-domaine="contrats"] .cx-clauses-foot { display: flex; justify-content: space-between; gap: 25px; align-items: center; margin-top: 28px; font-size: 16px; }
        [data-domaine="contrats"] .cx-clauses-foot p { max-width: 670px; color: #d0d2e2; margin: 0; }
        [data-domaine="contrats"] .cx-clauses-foot .cx-link { color: #fff; white-space: nowrap; }
        @media (max-width: 1050px) { [data-domaine="contrats"] .cx-clause-board { grid-template-columns: 230px 1fr; } [data-domaine="contrats"] .cx-clause-panel { padding: 26px; } [data-domaine="contrats"] .cx-clause-columns { gap: 15px; } }
        @media (max-width: 760px) {
          [data-domaine="contrats"] .cx-clause-board { display: block; border: 0; }
          [data-domaine="contrats"] .cx-clause-board.enhanced .cx-clause-nav { display: none; }
          [data-domaine="contrats"] .cx-clause-panels { background: transparent; color: #fff; }
          [data-domaine="contrats"] .cx-clause-panel, [data-domaine="contrats"] .cx-clause-panel[hidden] { display: block; background: transparent; padding: 0; min-height: 0; border-top: 1px solid rgba(255,255,255,0.45); }
          [data-domaine="contrats"] .cx-clause-mobile-title { display: flex; justify-content: space-between; gap: 16px; width: 100%; text-align: left; font-family: var(--ff-body); font-size: 18px; padding: 22px 0; color: #fff; background: transparent; border: 0; line-height: 1.35; min-height: 65px; cursor: pointer; }
          [data-domaine="contrats"] .cx-clause-mobile-title span:last-child { font-size: 23px; }
          [data-domaine="contrats"] .cx-clause-body { background: #fff; color: var(--ink); padding: 26px 23px; margin-bottom: 20px; }
          [data-domaine="contrats"] .cx-clause-board.enhanced .cx-clause-panel:not(.mobile-open) .cx-clause-body { display: none; }
          [data-domaine="contrats"] .cx-clause-panel h3 { font-size: 25px; }
          [data-domaine="contrats"] .cx-clause-columns { grid-template-columns: 1fr; gap: 20px; margin-top: 22px; }
          [data-domaine="contrats"] .cx-clause-columns p { font-size: 16px; }
          [data-domaine="contrats"] .cx-clauses-foot { display: block; margin-top: 23px; }
          [data-domaine="contrats"] .cx-clauses-foot .cx-link { margin-top: 13px; }
        }

        /* Bandeau contentieux (bleu électrique). */
        [data-domaine="contrats"] .cx-litigation { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 50px; align-items: center; background: var(--blue); color: #fff; padding: 34px 40px; }
        [data-domaine="contrats"] .cx-litigation .cx-label { color: #fff; margin-bottom: 10px; }
        [data-domaine="contrats"] .cx-litigation h2 { font-size: 29px; }
        [data-domaine="contrats"] .cx-litigation p { font-size: 16px; margin: 12px 0 0; line-height: 1.6; }
        [data-domaine="contrats"] .cx-litigation .cx-btn { justify-self: end; max-width: 340px; }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-litigation { grid-template-columns: 1fr; gap: 24px; padding: 27px; } [data-domaine="contrats"] .cx-litigation .cx-btn { justify-self: start; max-width: none; } }

        /* Équipe. */
        [data-domaine="contrats"] .cx-team-quote { font-family: var(--ff-body); font-weight: 300; font-size: clamp(21px, 2.6vw, 28px); line-height: 1.35; color: var(--ink); max-width: 24ch; margin: 0 0 24px; padding-left: 22px; border-left: 3px solid var(--blue); }
        [data-domaine="contrats"] .cx-team-intro { margin: 0 0 32px; color: var(--text-muted); font-size: 17px; line-height: 1.65; max-width: 72ch; }
        [data-domaine="contrats"] .cx-lawyers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
        [data-domaine="contrats"] .cx-technical { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; margin-top: 12px; align-items: start; }
        [data-domaine="contrats"] .cx-tech-note { font-size: 13px; color: var(--text-muted); margin: 12px 0 0; }
        [data-domaine="contrats"] .cx-exam { background: #fff; border: 1px solid var(--bd); padding: 24px; }
        [data-domaine="contrats"] .cx-exam h3 { font-size: 20px; margin: 0 0 16px; }
        [data-domaine="contrats"] .cx-exam ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
        [data-domaine="contrats"] .cx-exam li { display: flex; gap: 8px; font-size: 16px; color: var(--text-muted); line-height: 1.5; }
        @media (max-width: 900px) { [data-domaine="contrats"] .cx-lawyers { grid-template-columns: 1fr; gap: 22px; } [data-domaine="contrats"] .cx-technical { grid-template-columns: 1fr; } }

        /* FAQ + renvois. */
        [data-domaine="contrats"] .cx-faq-layout { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 0.8fr); gap: 75px; }
        [data-domaine="contrats"] .cx-faq-layout h2 { margin-bottom: 28px; }
        [data-domaine="contrats"] .cx-faq { border-top: 1px solid var(--bd); }
        [data-domaine="contrats"] .cx-faq:last-of-type { border-bottom: 1px solid var(--bd); }
        [data-domaine="contrats"] .cx-faq summary { padding: 21px 32px 21px 0; font-weight: 500; list-style: none; position: relative; line-height: 1.45; cursor: pointer; }
        [data-domaine="contrats"] .cx-faq summary::-webkit-details-marker { display: none; }
        [data-domaine="contrats"] .cx-faq summary h3 { display: inline; font-size: 17px; font-weight: 500; margin: 0; }
        [data-domaine="contrats"] .cx-faq summary::after { content: "+"; position: absolute; right: 3px; top: 18px; color: var(--blue); font-size: 24px; font-weight: 400; }
        [data-domaine="contrats"] .cx-faq[open] summary::after { content: "−"; }
        [data-domaine="contrats"] .cx-faq p { font-size: 16px; color: var(--text-muted); padding: 0 25px 23px 0; margin: 0; line-height: 1.6; }
        [data-domaine="contrats"] .cx-related .cx-label { margin-bottom: 24px; }
        [data-domaine="contrats"] .cx-related a { display: flex; gap: 20px; justify-content: space-between; text-decoration: none; padding: 17px 0; border-top: 1px solid var(--bd); font-size: 15px; color: inherit; align-items: center; }
        [data-domaine="contrats"] .cx-related a:hover { color: var(--blue); }
        [data-domaine="contrats"] .cx-related a .arrow { color: var(--blue); }
        @media (max-width: 1050px) { [data-domaine="contrats"] .cx-faq-layout { grid-template-columns: 1fr; gap: 40px; } }

        /* Contact final (bleu nuit). */
        [data-domaine="contrats"] .cx-contact-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 70px; align-items: center; }
        [data-domaine="contrats"] .cx-contact-layout h2 { font-size: clamp(32px, 3.6vw, 49px); max-width: 690px; color: #fff; }
        [data-domaine="contrats"] .cx-contact-layout > div > p { margin: 22px 0 0; color: #d8dae7; max-width: 600px; font-size: 17px; line-height: 1.65; }
        [data-domaine="contrats"] .cx-contact-action { border-left: 1px solid rgba(255,255,255,0.35); padding-left: 36px; }
        [data-domaine="contrats"] .cx-contact-action .cx-btn { width: 100%; }
        [data-domaine="contrats"] .cx-contact-action p { font-size: 14px; line-height: 1.6; margin: 16px 0 0; color: #d8dae7; }
        [data-domaine="contrats"] .cx-contact-secondary { color: #fff; margin-top: 18px; }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-contact-layout { grid-template-columns: 1fr; gap: 28px; } [data-domaine="contrats"] .cx-contact-action { border-left: 0; border-top: 1px solid rgba(255,255,255,0.35); padding: 26px 0 0; } }

        /* Ligne « exécution » sous les 3 services. */
        [data-domaine="contrats"] .cx-exec-line { margin: 22px 0 0; padding-top: 18px; border-top: 1px solid var(--bd); font-size: 16px; line-height: 1.6; color: var(--ink); max-width: 78ch; }

        /* « Ce qui engage les parties » — 3 colonnes sobres. */
        [data-domaine="contrats"] .cx-engage { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        [data-domaine="contrats"] .cx-engage > div { border-top: 2px solid var(--blue); padding-top: 16px; }
        [data-domaine="contrats"] .cx-engage h3 { font-size: 18px; margin: 0 0 10px; }
        [data-domaine="contrats"] .cx-engage p { font-size: 15px; line-height: 1.6; color: var(--text-muted); margin: 0; }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-engage { grid-template-columns: 1fr; gap: 20px; } }

        /* Trois cas compacts (situations-types). */
        [data-domaine="contrats"] .cx-cases { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: start; }
        [data-domaine="contrats"] .cx-case { border: 1px solid var(--bd); border-top: 3px solid var(--ink); padding: 22px 20px; }
        [data-domaine="contrats"] .cx-case-num { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.08em; color: var(--blue3); margin: 0 0 10px; }
        [data-domaine="contrats"] .cx-case h3 { font-size: 17px; line-height: 1.35; margin: 0 0 14px; }
        [data-domaine="contrats"] .cx-case dl { margin: 0; }
        [data-domaine="contrats"] .cx-case dl > div + div { margin-top: 12px; }
        [data-domaine="contrats"] .cx-case dt { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
        [data-domaine="contrats"] .cx-case dd { margin: 4px 0 0; font-size: 14px; line-height: 1.55; color: var(--ink); }
        @media (max-width: 760px) { [data-domaine="contrats"] .cx-cases { grid-template-columns: 1fr; } }

        /* FAQ — séparateur « Autres questions ». */
        [data-domaine="contrats"] .cx-faq-more-label { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue3); margin: 28px 0 0; padding-top: 18px; border-top: 1px solid var(--bd); }

        /* Focus visible (§06). */
        [data-domaine="contrats"] a:focus-visible, [data-domaine="contrats"] button:focus-visible, [data-domaine="contrats"] summary:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
        [data-domaine="contrats"] .cx-hero :focus-visible, [data-domaine="contrats"] .cx-clauses :focus-visible, [data-domaine="contrats"] .cx-contact :focus-visible { outline-color: #fff; }
        [data-domaine="contrats"] .arrow { font-family: Arial, sans-serif; }
        @media (prefers-reduced-motion: reduce) { [data-domaine="contrats"] * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* ===== HÉRO (fil d’Ariane + étapes) ===== */}
      <section className="cx-hero" id="haut">
        <div className="cx-wrap">
          <nav className="cx-crumb" aria-label="Fil d’Ariane" style={{ paddingTop: HEADER_H + 18, paddingBottom: 6 }}>
            <ol>
              <li><Link href="/">Accueil</Link></li>
              <li aria-hidden style={{ color: "#5A639B" }}>/</li>
              <li><Link href="/nos-domaines">Domaines d’intervention</Link></li>
              <li aria-hidden style={{ color: "#5A639B" }}>/</li>
              <li aria-current="page" style={{ color: "#fff" }}>Contrats informatiques et projets IT</li>
            </ol>
          </nav>
          <div className="cx-hero-grid">
            <div>
              <Eyebrow light>Contrats informatiques · Paris</Eyebrow>
              <h1>Avocat en contrats informatiques et projets IT à Paris</h1>
              <p className="cx-hero-copy">
                Lazarègue Avocats accompagne les <strong>PME, ETI, éditeurs, intégrateurs et ESN</strong> dans
                l’audit, la rédaction, la négociation et l’exécution de leurs contrats informatiques : logiciels,
                SaaS, cloud, infogérance et projets de transformation numérique.
              </p>
              <div className="cx-hero-actions">
                <Link href={contactObjet("audit")} className="cx-btn">
                  Faire auditer un contrat <span className="arrow" aria-hidden>↗</span>
                </Link>
                <a className="cx-link" href="#contentieux">Évaluer un projet en difficulté <span aria-hidden>↗</span></a>
              </div>
            </div>
            <aside className="cx-hero-art" aria-label="Les moments clés du contrat">
              <p className="cx-overline">VOTRE CONTRAT, À CHAQUE ÉTAPE</p>
              {HERO_STAGES.map((s) => (
                <a key={s.n} className="cx-hero-stage" href={s.href}>
                  <span className="n" aria-hidden>{s.n}</span>
                  <div>
                    <strong>{s.t}</strong>
                    <small>{fr(s.s)}</small>
                  </div>
                  <span className="arrow" aria-hidden>↗</span>
                </a>
              ))}
            </aside>
          </div>
          <div className="cx-hero-baseline">
            {HERO_BASELINE.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SITUATIONS ===== */}
      <section className="cx-section" id="situations" style={{ background: WH, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <div className="cx-split-head">
            <div>
              <Eyebrow>Votre point de départ</Eyebrow>
              <h2>Quelle est votre situation&nbsp;?</h2>
            </div>
            <p>Un contrat à signer, à faire évoluer ou à quitter&nbsp;: accédez aux points qui vous concernent.</p>
          </div>
          <div className="cx-situations">
            {SITUATIONS.map((r) => (
              <Link key={r.q} href={r.href} className="cx-situation">
                <h3>{fr(r.q)}</h3>
                <p>{fr(r.d)}</p>
                <span className="route">{fr(r.l)} <span className="arrow" aria-hidden>↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCOMPAGNEMENT : Auditer. Rédiger. Négocier. ===== */}
      <section className="cx-section" id="accompagnement" style={{ background: GHOST, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <div className="cx-split-head">
            <div>
              <Eyebrow>L’intervention du cabinet</Eyebrow>
              <h2>Auditer. Rédiger. Négocier.</h2>
            </div>
            <p>Contrat reçu, projet à construire ou conditions à renégocier&nbsp;: une intervention adaptée à votre position.</p>
          </div>
          <div className="cx-services">
            {SERVICES.map((s) => (
              <article key={s.n} className={`cx-service${s.primary ? " primary" : ""}`}>
                <span className="big" aria-hidden>{s.n}</span>
                <h3>{fr(s.titre)}</h3>
                <p>{fr(s.p)}</p>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{fr(it)}</li>
                  ))}
                </ul>
                <Link className="cx-link" href={contactObjet(s.situation)}>
                  {fr(s.link)} <span className="arrow" aria-hidden>↗</span>
                </Link>
              </article>
            ))}
          </div>
          <p className="cx-exec-line">
            Pendant l’exécution, le cabinet sécurise également les recettes, réserves, changements de périmètre et preuves contractuelles.
          </p>
          <div className="cx-timing">
            <span className="cx-label">Quand intervenir&nbsp;?</span>
            <p>
              Avant un appel d’offres, une signature ou un renouvellement&nbsp;; avant une migration ou un
              changement de prestataire, pendant que les conditions de sortie peuvent encore être organisées.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAMILLES DE CONTRATS ===== */}
      <section className="cx-section" id="contrats" style={{ background: WH, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <div className="cx-contract-intro">
            <div>
              <Eyebrow>Les contrats accompagnés</Eyebrow>
              <h2>Quels contrats informatiques accompagnons-nous&nbsp;?</h2>
            </div>
            <p>
              Une même opération associe fréquemment licence, intégration, maintenance et financement. Leur
              qualification et leur articulation déterminent les responsabilités et les conséquences d’une
              défaillance. Le cabinet intervient depuis Paris et sur l’ensemble du territoire, aux côtés des
              clients comme des prestataires.
            </p>
          </div>
          <div className="cx-family-grid">
            {FAMILIES.map((f) => (
              <details key={f.titre} className="cx-family">
                <summary>
                  <div>
                    <h3>{fr(f.titre)}</h3>
                    <span className="desc">{fr(f.desc)}</span>
                  </div>
                  <span className="plus" aria-hidden>+</span>
                </summary>
                <p>{fr(f.body)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CE QUI ENGAGE LES PARTIES (différenciation droit + preuve) ===== */}
      <section className="cx-section" id="engage" style={{ background: GHOST, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <div className="cx-split-head">
            <div>
              <Eyebrow>Droit, exécution et preuve</Eyebrow>
              <h2>Ce qui engage les parties&nbsp;— et ce qui permet de le prouver</h2>
            </div>
            <p>Un contrat ne se juge pas seulement à ses clauses. Son exécution, les réserves formulées et les preuves techniques déterminent aussi les responsabilités.</p>
          </div>
          <div className="cx-engage">
            {ENGAGE.map((c) => (
              <div key={c.titre}>
                <h3>{fr(c.titre)}</h3>
                <p>{fr(c.p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CINQ CLAUSES DÉCISIVES (navy) ===== */}
      <section className="cx-section cx-clauses" id="clauses" style={{ background: NAVY, color: ON_DARK, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <div className="cx-split-head">
            <div>
              <Eyebrow light>Les points qui changent le contrat</Eyebrow>
              <h2 style={{ color: "#fff" }}>Cinq clauses décisives.</h2>
            </div>
            <p style={{ color: "#d0d2e2" }}>Ce qui peut poser difficulté, les questions à poser et les engagements à négocier.</p>
          </div>
          <ClauseBoard />
          <div className="cx-clauses-foot">
            <p>Les obligations et les procédures de validation doivent correspondre à la réalité du projet informatique.</p>
            <Link href={CONTACT} className="cx-link">
              Faire examiner mon contrat <span className="arrow" aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TROIS CAS COMPACTS (situations-types, non des dossiers réels) ===== */}
      <section className="cx-section" id="cas" style={{ background: WH, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <div className="cx-split-head">
            <div>
              <Eyebrow>Quand le contrat rencontre la réalité du projet</Eyebrow>
              <h2>Trois situations que nous rencontrons</h2>
            </div>
            <p>Des situations-types, sans donnée ni résultat de dossier réel&nbsp;: elles illustrent la méthode d’analyse.</p>
          </div>
          <div className="cx-cases">
            {CAS.map((c, i) => (
              <article key={i} className="cx-case">
                <p className="cx-case-num" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
                <h3>{fr(c.situation)}</h3>
                <dl>
                  <div><dt>Ce que le cabinet examine</dt><dd>{fr(c.examine)}</dd></div>
                  <div><dt>Enjeu de la décision</dt><dd>{fr(c.enjeu)}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BANDEAU CONTENTIEUX (bleu) ===== */}
      <section style={{ background: WH, padding: "42px 0" }} id="contentieux">
        <div className="cx-wrap">
          <div className="cx-litigation">
            <div>
              <Eyebrow light>Un différend est déjà engagé</Eyebrow>
              <h2 style={{ color: "#fff" }}>Le projet est en difficulté&nbsp;?</h2>
              <p>Retards répétés, logiciel non conforme, réserves contestées, perte de données, factures impayées ou rupture conflictuelle.</p>
            </div>
            <Link href={CONTENTIEUX} className="cx-btn outline">
              Découvrir l’accompagnement en contentieux <span className="arrow" aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ÉQUIPE ===== */}
      <section className="cx-section" id="equipe" style={{ background: GHOST, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap">
          <Eyebrow>Les personnes qui interviennent</Eyebrow>
          <p className="cx-team-quote">
            Un engagement contractuel ne vaut que ce que vaut la réalité technique sur laquelle il repose.
          </p>
          <h2 style={{ maxWidth: "22ch", marginBottom: 16 }}>Le contrat, confronté à la réalité technique.</h2>
          <p className="cx-team-intro">
            L’analyse juridique peut être complétée, lorsque le dossier le nécessite, par l’examen des
            architectures, des sauvegardes, des traces d’intervention ou des conditions de migration. L’examen
            juridique et l’examen technique sont alors menés ensemble plutôt que successivement.
          </p>
          <div className="cx-lawyers">
            {AVOCATS.map((a) => (
              <MembreCarte
                key={a.slug}
                membre={a}
                couleurs={{ panneau: GHOST, carte: WH, bordure: BD, texte: INK, secondaire: MUTED, accent: BLUE }}
              />
            ))}
          </div>
          <div className="cx-technical">
            <div>
              <MembreCarte
                membre={{
                  slug: "khalid",
                  role: "Sauvegardes, traces techniques et faisabilité de la réversibilité.",
                  tags: ["Sauvegardes", "Réversibilité", "Journalisation"],
                }}
                couleurs={{ panneau: GHOST, carte: WH, bordure: BD, texte: INK, secondaire: MUTED, accent: BLUE }}
              />
              <p className="cx-tech-note">Intervient en appui technique. N’exerce pas la profession d’avocat.</p>
            </div>
            <div className="cx-exam">
              <h3>Des engagements que l’on peut vérifier</h3>
              <ul>
                {KHALID_EXAMINE.map((k) => (
                  <li key={k}><span aria-hidden style={{ color: BLUE, flexShrink: 0 }}>—</span><span>{fr(k)}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ + RENVOIS ===== */}
      <section className="cx-section" id="questions" style={{ background: WH, scrollMarginTop: HEADER_H + 8 }}>
        <div className="cx-wrap cx-faq-layout">
          <div>
            <Eyebrow>Avant de vous engager</Eyebrow>
            <h2>Vos questions sur les contrats informatiques.</h2>
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="cx-faq">
                <summary><h3>{fr(item.q)}</h3></summary>
                <p>{fr(item.a)}</p>
              </details>
            ))}
            <p className="cx-faq-more-label">Autres questions</p>
            {AUTRES_FAQ.map((item) => (
              <details key={item.q} className="cx-faq">
                <summary><h3>{fr(item.q)}</h3></summary>
                <p>{fr(item.a)}</p>
              </details>
            ))}
          </div>
          <aside className="cx-related">
            <Eyebrow>Selon les enjeux du projet</Eyebrow>
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href}>
                {fr(r.label)} <span className="arrow" aria-hidden>↗</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      {/* ===== CONTACT FINAL (bleu nuit) ===== */}
      <section className="cx-section cx-contact" id="contact" style={{ background: NAVY, color: ON_DARK }}>
        <div className="cx-wrap cx-contact-layout">
          <div>
            <Eyebrow light>Passer à l’action</Eyebrow>
            <h2>Faire auditer un contrat informatique</h2>
            <p>
              Transmettez le contrat et le contexte du projet. Le cabinet vous indique le périmètre de
              l’analyse, les points prioritaires et les modalités d’intervention.
            </p>
          </div>
          <div className="cx-contact-action">
            <Link href={contactObjet("audit")} className="cx-btn">
              Faire auditer un contrat <span className="arrow" aria-hidden>↗</span>
            </Link>
            <Link href={CONTENTIEUX} className="cx-link cx-contact-secondary">
              Projet en difficulté&nbsp;? Évaluer la situation <span className="arrow" aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
