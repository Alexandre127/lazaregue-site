import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";

/* ==========================================================================
   Page « Avocat en cybersécurité » — refonte sur le wireframe du 21 sept. 2026.

   Composant SERVEUR : toutes les interactions sont natives (`<details>`), donc
   tout le contenu (y compris les réponses de FAQ et les développements) est
   présent dans le HTML initial, jamais chargé au clic. Le header, le pied de
   page et la barre de contact mobile proviennent du layout global du site ; la
   maquette n'en fournit que des repères.

   Palette (consigne) : #1A47FF (actions), #05060F (hero, colonne « Pendant »,
   parcours « incident en cours », contact final), #B42318 UNIQUEMENT pour la
   bande d'urgence, fonds clairs #FFFFFF/#F4F4F8/#EEF1FB. Le bleu ciel #9FB2FF
   n'est utilisé nulle part ; sur fond sombre, le texte secondaire est en blanc
   atténué. Angles droits, bordures fines, pas d'ombre ni de dégradé (hors visuel
   fondu du hero).

   Textes récupérés : les deux développements de la section « Ce qui est en jeu »
   et les réponses FAQ 2 à 5 proviennent de la V7 (`maquette-cybersecurite-v7`) ;
   les réponses FAQ 6 et 7 de la version récente de la page. Aucun texte inventé.
   ========================================================================== */

const CONTACT = "/contact?objet=cybersecurite";
const NIS2 = "/nos-domaines/cybersecurite/nis2";
const TEL = "tel:+33181706200";

const EXPOSITIONS = [
  { n: "01", l: "Réglementaire", p: "L’entreprise doit déterminer si l’incident doit être déclaré à la CNIL, à l’ANSSI, à un client ou à une autre autorité, et dans quel délai." },
  { n: "02", l: "Contractuel", p: "Il est essentiel d’examiner les termes des contrats signés avec les clients, l’hébergeur, l’infogérant et l’assureur, puis d’identifier les responsabilités et de déterminer les garanties mobilisables." },
  { n: "03", l: "Pénal et preuve", p: "Les journaux de connexion, messages et chronologies doivent être conservés sans altération afin d’établir les faits et, si nécessaire, de préparer une plainte ou une défense." },
  { n: "04", l: "Gouvernance", p: "La direction, le service juridique et les équipes techniques doivent savoir qui prend les décisions, quelles informations sont utilisées et comment ces décisions sont consignées." },
];

/* Développements — repris VERBATIM de la V7 (maquette-cybersecurite-v7, §« Ce
   qui est en jeu »). */
const DEPLIABLES = [
  {
    s: "Qui faut-il informer après un incident ?",
    paras: [
      "Les cyberattaques ne déclenchent pas automatiquement les mêmes déclarations. Le cabinet commence par établir les faits : est-ce une simple indisponibilité, un accès non autorisé, un vol de fichiers, des données personnelles concernées ou un service essentiel perturbé ? À partir de ces éléments, il détermine si l’entreprise doit informer la CNIL, l’ANSSI, ses clients, son assureur ou une autre autorité, et dans quel délai. La décision de notifier, ou non, est motivée et conservée.",
    ],
  },
  {
    s: "Pourquoi faut-il préserver les preuves immédiatement ?",
    paras: [
      "Les journaux de connexion, les messages, les fichiers et les configurations peuvent être perdus lors d’une réinstallation ou d’un redémarrage. Il faut donc identifier et conserver les éléments qui permettront de reconstituer l’incident avant toute suppression. Ces éléments serviront à répondre aux autorités, à établir un éventuel manquement du prestataire et à mobiliser la garantie de l’assureur. Le cabinet encadre leur collecte avec l’expert technique afin qu’ils restent datés, compréhensibles et exploitables.",
    ],
  },
];

const REGLES = [
  { q: "Accès", a: "Les droits sont limités, révisés et supprimés au départ d’un salarié ou d’un prestataire." },
  { q: "Sauvegardes", a: "Les copies existent et un test de restauration documenté démontre qu’elles fonctionnent." },
  { q: "Traçabilité", a: "Les journaux sont conservés assez longtemps pour reconstituer les connexions et les actions importantes." },
];

const NIS_Q = [
  { n: "01", h: "Votre entreprise est-elle directement soumise à NIS 2 ?", p: "Le secteur d’activité, la taille de l’entreprise et certaines désignations particulières déterminent le régime applicable. Le cabinet vérifie ce périmètre au regard du texte en vigueur en France au moment de la mission." },
  { n: "02", h: "Êtes-vous fournisseur d’une entreprise concernée ?", p: "Un client soumis à NIS 2 peut vous adresser un questionnaire, demander des preuves, imposer un audit ou renforcer les clauses de sécurité et de notification du contrat." },
  { n: "03", h: "Que fait le cabinet ?", p: "Il qualifie les obligations applicables, analyse les engagements demandés, négocie les clauses et prépare les politiques et procédures nécessaires. L’appui technique vérifie ce qui existe déjà, ce qui peut être démontré et ce qui doit être corrigé." },
];

const SITUATIONS = [
  {
    n: "01",
    h: "Un questionnaire sécurité avant le renouvellement du contrat",
    ctx: "Une ESN sous-traitante d’un groupe hospitalier reçoit un questionnaire assorti de clauses à signer.",
    enjeu: "Ne pas souscrire des engagements qui dépassent les capacités du système.",
    travail: [
      "Repérer les engagements qui transforment une obligation de moyens en garantie de résultat.",
      "Vérifier les réponses avec l’expert technique.",
      "Négocier le périmètre et les limites de responsabilité.",
    ],
    prepare: "Réponse au questionnaire, justificatifs vérifiés et clauses négociées.",
  },
  {
    n: "02",
    h: "Un client impose une mise en conformité sous trente jours",
    ctx: "Un éditeur de logiciels doit documenter sa sécurité pour poursuivre un contrat.",
    enjeu: "La documentation disponible ne décrit pas les systèmes réellement exploités.",
    travail: [
      "Examiner les accès, l’authentification, les sauvegardes et les journaux.",
      "Rédiger une politique de sécurité adaptée aux systèmes de l’éditeur.",
      "Distinguer les mesures déjà réalisées des corrections planifiées, avec leurs preuves.",
    ],
    prepare: "Politique de sécurité, rapport d’écart et plan de remédiation daté.",
  },
  {
    n: "03",
    h: "Un incident chez un client met le prestataire en cause",
    ctx: "Un prestataire de maintenance industrielle reçoit des demandes après un incident chez un opérateur d’importance vitale.",
    enjeu: "Répondre sans reconnaître une responsabilité que les constatations n’établissent pas.",
    travail: [
      "Qualifier les obligations et le périmètre d’exposition.",
      "Préserver les journaux d’intervention et les accès distants.",
      "Distinguer les régimes et les destinataires des déclarations.",
    ],
    prepare: "Chronologie, conservation des preuves et réponse aux demandes reçues.",
  },
  {
    n: "04",
    h: "Une banque impose un audit annuel à son sous-traitant",
    ctx: "Un cabinet comptable accède à distance au système d’information de son client bancaire.",
    enjeu: "Documenter les mesures et définir les critères de l’audit à venir.",
    travail: [
      "Examiner l’authentification, les droits et la conservation des journaux.",
      "Rassembler la politique de sécurité, les preuves de formation et le plan de reprise testé.",
      "Encadrer contractuellement la révision annuelle des critères.",
    ],
    prepare: "Dossier d’audit, justificatifs et clause de révision annuelle.",
  },
];

/* FAQ — Q1 (wireframe), Q2 à Q5 (V7), Q6 et Q7 (version récente de la page). */
const FAQ = [
  { q: "À quel moment faut-il appeler un avocat ?", a: "Avant les premières déclarations. Les messages adressés aux clients, au prestataire, à l’assureur et à l’autorité de contrôle fixent la position de l’entreprise et seront relus plus tard. En prévention, le bon moment est celui où un client impose des exigences de sécurité ou celui où un contrat d’infogérance se négocie.", open: true },
  { q: "Faut-il informer la CNIL, l’ANSSI ou une autre autorité ?", a: "Cela dépend de ce que l’incident a touché et de ce qu’est l’entreprise. La CNIL est concernée lorsque des données personnelles ont fait l’objet d’une violation présentant un risque pour les personnes. D’autres destinataires peuvent s’ajouter selon le secteur, la qualification de l’entité ou les engagements contractuels : régulateur sectoriel, assureur, clients, personnes concernées. Chacun a son propre régime et son propre délai. La première étape est de déterminer lesquels s’appliquent réellement." },
  { q: "Le prestataire informatique est-il responsable de l’attaque ?", a: "Cela dépend de ce qu’il s’était engagé à faire. Le débat porte sur le périmètre souscrit, la nature de l’obligation, les niveaux de service convenus, les alertes qu’il aurait dû émettre et les clauses limitant sa responsabilité. Une attaque subie ne caractérise pas à elle seule un manquement : il faut identifier l’obligation précise qui n’a pas été exécutée et son lien avec le dommage." },
  { q: "Que répondre à un client qui exige des garanties de sécurité ?", a: "Ni un refus, ni une signature automatique. Les questionnaires et clauses transmis par les donneurs d’ordre contiennent souvent des engagements que l’entreprise ne peut pas tenir techniquement, ou qui transforment une obligation de moyens en garantie de résultat. Le cabinet identifie ce qui peut être signé en l’état, ce qui doit être renégocié et ce qui suppose d’abord une mise à niveau." },
  { q: "Comment sont fixés les honoraires ?", a: "La consultation initiale d’une heure est facturée selon un montant indiqué avant le rendez-vous. Pour la suite, les honoraires sont convenus par écrit avant toute intervention : au forfait lorsque le périmètre est délimité — rédaction de documents, revue contractuelle, rapport d’écart — et au temps passé lorsqu’il ne peut pas l’être, notamment en gestion d’incident et en contentieux." },
  { q: "Quelle différence avec l’intervention d’un expert technique ?", a: "L’expert analyse les systèmes et contribue à la réponse technique. L’avocat examine les obligations, les contrats et les conséquences juridiques ; il prépare les actes, accompagne les échanges et défend les intérêts de l’entreprise. Le cabinet travaille avec vos prestataires et peut mobiliser un expert indépendant selon la mission." },
  { q: "L’assurance cyber couvre-t-elle les conséquences de l’incident ?", a: "La prise en charge dépend du contrat, du sinistre, des exclusions et des conditions de garantie. Les démarches et délais doivent être examinés rapidement, notamment la déclaration à l’assureur et, dans le champ prévu par le Code des assurances, le dépôt de plainte. Ce délai de plainte ne se confond pas avec le délai de notification à la CNIL." },
];

const SUJETS = [
  { label: "Cyberattaque et cybercriminalité", href: "/nos-domaines/cybercriminalite" },
  { label: "Violation de données", href: "/nos-domaines/rgpd-donnees-personnelles" },
  { label: "Contentieux des contrats informatiques", href: "/nos-domaines/contentieux-informatique-commercial" },
  { label: "Diffamation et retrait de contenus", href: "/nos-domaines/diffamation-retrait-contenus" },
];

export function CyberV4() {
  return (
    <main data-domaine="cyberwf">
      <style>{CSS}</style>

      {/* ===== 1. HERO ===== */}
      <section className="cw-hero cw-dark">
        <div className="cw-hero-text">
          <nav className="cw-crumb" aria-label="Fil d’Ariane">
            <Link href="/">Accueil</Link> / <Link href="/nos-domaines">Domaines</Link> / <span aria-current="page">Cybersécurité</span>
          </nav>
          <p className="cw-label"><span className="cw-only-d">Paris · entreprises · intervention partout en France</span><span className="cw-only-m">Paris · partout en France</span></p>
          <h1 className="cw-h1">AVOCAT EN CYBERSÉCURITÉ POUR LES ENTREPRISES</h1>
          <p className="cw-hero-lead">{fr("Le cabinet accompagne les entreprises dans la prévention des risques informatiques, la réponse en cas de cyberattaque et la défense de leurs intérêts à l’encontre des auteurs d’intrusions ou de tout acteur dont la responsabilité est engagée. Il les conseille également dans la mise en conformité avec leurs obligations de cybersécurité : RGPD et NIS 2, en documentant cette conformité et en l’intégrant à leur dispositif général de conformité.")}</p>
          <div className="cw-hero-cta">
            <Link href={CONTACT} className="cw-btn">Échanger avec un avocat →</Link>
            <a href="#interventions" className="cw-link cw-hero-link">Voir nos interventions ↓</a>
          </div>
        </div>
        <div className="cw-hero-visual" aria-hidden="true">
          <Image src="/images/cyber-hero-facade.jpg" alt="" fill sizes="(max-width: 767px) 0px, 42vw" style={{ objectFit: "cover", objectPosition: "center" }} priority />
        </div>
      </section>

      {/* ===== 2. BANDE ROUGE — INCIDENT EN COURS ===== */}
      <div className="cw-urgent">
        <span className="cw-urgent-tag">INCIDENT EN COURS&nbsp;?</span>
        <a href={TEL} className="cw-urgent-tel"><span className="cw-only-d">Appeler le cabinet : 01 81 70 62 00 →</span><span className="cw-only-m">Appeler : 01 81 70 62 00 →</span></a>
      </div>

      {/* ===== 3. AVANT / PENDANT / APRÈS ===== */}
      <section className="cw-sec">
        <div className="cw-head">
          <p className="cw-label">Notre intervention</p>
          <h2 className="cw-h2">Avant, pendant et après l’incident</h2>
        </div>
        <div className="cw-apa">
          <div className="cw-apa-card">
            <span className="cw-big">AVANT</span>
            <h3 className="cw-h3">Anticiper les obligations et les risques</h3>
            <p>{fr("Vérifier vos obligations, vos contrats, vos sauvegardes et votre assurance avant qu’un incident survienne.")}</p>
          </div>
          <div className="cw-apa-card cw-apa-dark">
            <span className="cw-big">PENDANT</span>
            <h3 className="cw-h3">Prendre les premières décisions</h3>
            <p>{fr("Contenir l’incident, préserver les preuves, décider des notifications et encadrer les communications.")}</p>
          </div>
          <div className="cw-apa-card">
            <span className="cw-big">APRÈS</span>
            <h3 className="cw-h3">Établir les responsabilités</h3>
            <p>{fr("Identifier les manquements, mobiliser les garanties et préparer le recours ou la défense.")}</p>
          </div>
        </div>
        <div className="cw-orient">
          <h3 className="cw-h3">Un client vous impose des exigences de sécurité ? Un prestataire est mis en cause ?</h3>
          <p className="cw-tx">Le cabinet vous aide à répondre aux questionnaires de sécurité, négocier les clauses exigées et examiner la responsabilité d’un prestataire après un incident.</p>
          <div className="cw-orient-links">
            <a href="#nis2" className="cw-link">Répondre aux exigences d’un client ↓</a>
            <a href="#interventions" className="cw-link">Examiner la responsabilité d’un prestataire ↓</a>
          </div>
        </div>
      </section>

      {/* ===== 4. QUATRE EXPOSITIONS ===== */}
      <section className="cw-sec cw-ghost">
        <div className="cw-head">
          <p className="cw-label">Ce qui est en jeu</p>
          <h2 className="cw-h2">Un incident, quatre expositions simultanées</h2>
          <p className="cw-lead">Les décisions techniques, les exigences réglementaires et les engagements contractuels interagissent. Le cabinet les évalue ensemble avec la direction et les équipes concernées.</p>
        </div>
        <div className="cw-expo">
          {EXPOSITIONS.map((e) => (
            <div key={e.l} className="cw-expo-item">
              <p className="cw-expo-head"><span className="cw-expo-num">{e.n}</span><span className="cw-label cw-expo-label">{e.l}</span></p>
              <p>{fr(e.p)}</p>
            </div>
          ))}
        </div>
        <div className="cw-dl">
          {DEPLIABLES.map((d) => (
            <details key={d.s}>
              <summary>{fr(d.s)}</summary>
              {d.paras.map((p, i) => (
                <p key={i}>{fr(p)}</p>
              ))}
            </details>
          ))}
        </div>
      </section>

      {/* ===== 5. RÈGLES DE SÉCURITÉ ===== */}
      <section className="cw-sec">
        <div className="cw-head">
          <p className="cw-label">Protéger les données et les systèmes</p>
          <h2 className="cw-h2">Comment vérifier si les mesures de sécurité sont suffisantes ?</h2>
          <p className="cw-lead">Il ne suffit pas d’affirmer qu’un système est sécurisé. L’entreprise doit pouvoir démontrer qui peut consulter les données, comment elles sont sauvegardées et si un incident peut être retracé. Lorsque des données personnelles sont concernées, l’article 32 du RGPD exige des mesures appropriées au niveau de risque.</p>
        </div>
        <div className="cw-kv-wrap">
          {REGLES.map((r) => (
            <div key={r.q} className="cw-kv">
              <strong>{fr(r.q)}</strong>
              <span className="cw-tx">{fr(r.a)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6. NIS 2 ===== */}
      <section id="nis2" className="cw-sec cw-tint" style={{ scrollMarginTop: "calc(var(--header-h-compact) + 12px)" }}>
        <div className="cw-head">
          <p className="cw-label">NIS 2 : la sécurité des entreprises concernées</p>
          <h2 className="cw-h2">NIS 2 : êtes-vous directement ou indirectement concerné ?</h2>
          <p className="cw-lead">NIS 2 renforce les obligations de cybersécurité des entreprises appartenant à des secteurs essentiels ou importants. Même lorsqu’une entreprise ne relève pas directement de son champ d’application, elle peut être concernée en tant que fournisseur ou sous-traitant d’un client régulé, qui doit également maîtriser les risques liés à sa chaîne d’approvisionnement.</p>
        </div>
        <ol className="cw-nis">
          {NIS_Q.map((q) => (
            <li key={q.n}>
              <span className="cw-num">{q.n}</span>
              <div>
                <h3 className="cw-h3">{fr(q.h)}</h3>
                <p className="cw-tx">{fr(q.p)}</p>
              </div>
            </li>
          ))}
        </ol>
        <div>
          <Link href={NIS2} className="cw-link">Comprendre les obligations NIS 2 et notre accompagnement →</Link>
        </div>
      </section>

      {/* ===== 7. BINÔME AVOCAT / EXPERT ===== */}
      <section className="cw-sec">
        <div className="cw-head">
          <p className="cw-label">Vos interlocuteurs</p>
          <h2 className="cw-h2">Un avocat et un expert technique sur votre dossier</h2>
          <p className="cw-lead">Les données techniques — journaux d’accès, état des sauvegardes, comptes actifs — servent de base à l’analyse juridique. L’appui technique est mobilisé selon les besoins de la mission.</p>
        </div>
        <div className="cw-team">
          <article className="cw-person">
            <div className="cw-shot">
              <Image src="/images/alexandre-pro.jpg" alt="Alexandre Lazarègue, avocat au Barreau de Paris" fill sizes="160px" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div>
              <p className="cw-label">Avocat au Barreau de Paris</p>
              <h3 className="cw-h3">Alexandre Lazarègue</h3>
              <p className="cw-tx">Obligations applicables, contrats, relations avec les autorités et contentieux.</p>
            </div>
          </article>
          <article className="cw-person">
            <div className="cw-shot">
              <Image src="/images/khalid-pro.jpg" alt="Khalid Sookia, appui technique en cybersécurité" fill sizes="160px" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div>
              <p className="cw-label">Consultant technique en cybersécurité</p>
              <h3 className="cw-h3">Khalid Sookia</h3>
              <p className="cw-tx">Analyse technique, sauvegardes, restauration, journalisation et investigation.</p>
            </div>
          </article>
        </div>
        <p className="cw-note-box">Lorsqu’un client adresse un questionnaire de sécurité, l’avocat analyse les engagements qui seront signés&nbsp;; le consultant vérifie si les réponses correspondent aux mesures et aux preuves disponibles. Le cabinet distingue ainsi ce qui est démontré, ce qui reste à vérifier et ce qui doit être négocié.</p>
      </section>

      {/* ===== 8. QUATRE SITUATIONS ===== */}
      <section id="interventions" className="cw-sec" style={{ scrollMarginTop: "calc(var(--header-h-compact) + 12px)" }}>
        <div className="cw-head">
          <p className="cw-label">Notre intervention, concrètement</p>
          <h2 className="cw-h2">Quatre situations, un travail concret</h2>
          <p className="cw-lead">Un questionnaire à signer, une mise en conformité imposée, un incident ou un audit client : le travail du cabinet part de votre situation et des engagements de votre entreprise.</p>
        </div>
        <div className="cw-sits">
          {SITUATIONS.map((s) => (
            <article key={s.n} className="cw-sit">
              <span className="cw-num cw-num-lg">{s.n}</span>
              <div className="cw-sit-body">
                <h3 className="cw-h3 cw-sit-h">{fr(s.h)}</h3>
                <p className="cw-tx">{fr(s.ctx)}</p>
                <p className="cw-sit-line"><strong>{fr("L’enjeu :")}</strong> {fr(s.enjeu)}</p>
                <div>
                  <p className="cw-sit-sub">Le travail du cabinet</p>
                  <ul className="cw-sit-ul">
                    {s.travail.map((t) => (
                      <li key={t}>{fr(t)}</li>
                    ))}
                  </ul>
                </div>
                <p className="cw-sit-prep"><strong>{fr("Ce que le cabinet prépare :")}</strong> {fr(s.prepare)}</p>
              </div>
            </article>
          ))}
        </div>

        <div><Link href={CONTACT} className="cw-link">Échanger sur votre situation →</Link></div>
      </section>

      {/* ===== 11. DEUX PARCOURS ===== */}
      <section className="cw-parcours">
        <div className="cw-parc cw-dark">
          <p className="cw-label">Si un incident est en cours</p>
          <h2 className="cw-h2 cw-h2-sm">Coordonner les premières décisions</h2>
          <p className="cw-tx">Le confinement, la poursuite des activités et la conservation des preuves doivent être coordonnés avec les intervenants techniques. Avant toute suppression, réinstallation ou reconstruction, il est essentiel de déterminer les éléments à conserver : journaux, messages et horodatages.</p>
          <p className="cw-tx">Déterminer qui doit être informé, évaluer la portée des communications et tracer les décisions. Le cabinet qualifie ensuite l’incident, prépare les notifications dues et les échanges nécessaires.</p>
          <div><a href={TEL} className="cw-btn">Appeler : 01 81 70 62 00 →</a></div>
        </div>
        <div className="cw-parc cw-parc-light">
          <p className="cw-label">Si vous préparez l’entreprise</p>
          <h2 className="cw-h2 cw-h2-sm">Un périmètre et des honoraires annoncés</h2>
          <p className="cw-tx cw-tx-dark">Consultation initiale d’une heure, facturée selon les honoraires communiqués avant le rendez-vous.</p>
          <p className="cw-tx cw-tx-dark">Examen des contrats, des mesures et des exigences clients ; rapport d’écart, documents retenus et clauses à renégocier. Un point de revue est convenu selon la mission.</p>
          <div><Link href={CONTACT} className="cw-btn">Contacter le cabinet →</Link></div>
        </div>
      </section>

      {/* ===== 12. FAQ ===== */}
      <section className="cw-sec cw-faq">
        <div className="cw-faq-grid">
          <div className="cw-head">
            <p className="cw-label">Questions directes</p>
            <h2 className="cw-h2">Questions fréquentes</h2>
          </div>
          <div>
            <div className="cw-faq-list">
              {FAQ.map((f) => (
                <details key={f.q} open={f.open}>
                  <summary>{fr(f.q)}</summary>
                  <p>{fr(f.a)}</p>
                </details>
              ))}
            </div>
            <p className="cw-sujets">
              <strong>Sujets liés ·</strong>{" "}
              {SUJETS.map((s) => (
                <Link key={s.href} href={s.href}>{fr(s.label)} →</Link>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 13. CONTACT FINAL ===== */}
      <section className="cw-final cw-dark">
        <div>
          <h2 className="cw-h2 cw-h2-final">Parlons de votre situation</h2>
          <p className="cw-tx">Incident en cours, exigence d’un client, contrat à relire ou mise en conformité : décrivez brièvement votre situation. Le cabinet vous indiquera comment transmettre les documents utiles.</p>
        </div>
        <div className="cw-final-actions">
          <Link href={CONTACT} className="cw-btn">Contacter le cabinet →</Link>
          <div>
            <span className="cw-mono">Incident en cours&nbsp;?</span><br />
            <a href={TEL} className="cw-final-tel">01 81 70 62 00</a>
          </div>
        </div>
      </section>
    </main>
  );
}

const CSS = `
[data-domaine="cyberwf"] { --px: clamp(20px, 6vw, 120px); --py: clamp(52px, 7vw, 96px); background: #FFFFFF; color: #0A0A14; font-size: 16px; line-height: 1.6; }
/* Neutralise le défaut global (p blanc 82 %) : texte encre sur fond clair ; les
   sections sombres redéfinissent explicitement leur texte en blanc atténué. */
[data-domaine="cyberwf"] p, [data-domaine="cyberwf"] li, [data-domaine="cyberwf"] dd { color: #0A0A14; }
[data-domaine="cyberwf"] .cw-sec { padding: var(--py) var(--px); display: flex; flex-direction: column; gap: clamp(22px, 3vw, 40px); }
[data-domaine="cyberwf"] .cw-dark { background: #05060F; color: #FFFFFF; }
[data-domaine="cyberwf"] .cw-ghost { background: #F4F4F8; }
[data-domaine="cyberwf"] .cw-tint { background: #EEF1FB; }
[data-domaine="cyberwf"] .cw-head { display: flex; flex-direction: column; gap: 14px; }
[data-domaine="cyberwf"] .cw-label { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #1A47FF; margin: 0; }
[data-domaine="cyberwf"] .cw-dark .cw-label { color: rgba(255,255,255,0.72); }
[data-domaine="cyberwf"] .cw-h2 { font-size: clamp(27px, 3.3vw, 40px); font-weight: 500; letter-spacing: -0.015em; line-height: 1.12; margin: 0; max-width: 900px; }
[data-domaine="cyberwf"] .cw-h2-sm { font-size: clamp(24px, 2.6vw, 32px); }
[data-domaine="cyberwf"] .cw-h3 { font-size: clamp(19px, 1.7vw, 22px); font-weight: 500; line-height: 1.25; margin: 0; }
[data-domaine="cyberwf"] .cw-tx { font-size: 16px; line-height: 1.6; color: #4A4A63; margin: 0; }
[data-domaine="cyberwf"] .cw-dark .cw-tx { color: rgba(255,255,255,0.8); }
[data-domaine="cyberwf"] .cw-lead { font-size: clamp(17px, 1.6vw, 19px); line-height: 1.6; color: #4A4A63; margin: 0; max-width: 700px; }
[data-domaine="cyberwf"] .cw-mono { font-family: var(--ff-mono); font-size: 13px; color: #4A4A63; margin: 0; }
[data-domaine="cyberwf"] a { color: #1A47FF; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
[data-domaine="cyberwf"] a:hover { color: #0A2ACC; }
[data-domaine="cyberwf"] .cw-btn { font-family: var(--ff-body); font-size: 16px; font-weight: 600; min-height: 52px; padding: 13px 26px; background: #1A47FF; color: #FFFFFF; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; text-align: center; border: 0; }
[data-domaine="cyberwf"] .cw-btn:hover { background: #0A2ACC; color: #FFFFFF; }
[data-domaine="cyberwf"] .cw-link { font-size: 15px; font-weight: 600; min-height: 44px; display: inline-flex; align-items: center; }
[data-domaine="cyberwf"] .cw-dark .cw-link, [data-domaine="cyberwf"] .cw-hero-link { color: #FFFFFF; }

/* Hero */
/* Le header global flotte au-dessus du hero sombre (route hero sombre) :
   dégager le haut pour que le fil d'Ariane ne passe pas sous le logo. */
[data-domaine="cyberwf"] .cw-hero { display: grid; grid-template-columns: 8fr 4fr; gap: 56px; align-items: center; padding: clamp(84px,9vw,116px) var(--px) clamp(36px,5vw,80px); }
[data-domaine="cyberwf"] .cw-hero-text { display: flex; flex-direction: column; gap: 22px; min-width: 0; }
[data-domaine="cyberwf"] .cw-crumb { font-family: var(--ff-mono); font-size: 13px; color: rgba(255,255,255,0.7); }
[data-domaine="cyberwf"] .cw-crumb a { color: rgba(255,255,255,0.7); }
[data-domaine="cyberwf"] .cw-h1 { font-family: var(--ff-display); font-weight: 400; font-size: clamp(46px, 7.8vw, 112px); line-height: 0.92; letter-spacing: 0.01em; margin: 0; overflow-wrap: break-word; }
[data-domaine="cyberwf"] .cw-hero-lead { font-size: clamp(17px, 1.8vw, 20px); line-height: 1.55; margin: 0; max-width: 640px; color: rgba(255,255,255,0.85); }
[data-domaine="cyberwf"] .cw-hero-cta { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
/* Visuel du hero : photo nocturne existante, fondue dans le fond bleu nuit
   (aucun cadre ni bord rectangulaire perceptible). */
[data-domaine="cyberwf"] .cw-hero-visual { position: relative; height: 440px; overflow: hidden; }
[data-domaine="cyberwf"] .cw-hero-visual::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(90deg, #05060F 0%, rgba(5, 6, 15, 0.68) 20%, rgba(5, 6, 15, 0.2) 55%, rgba(5, 6, 15, 0.35) 100%); }

/* Bande rouge */
[data-domaine="cyberwf"] .cw-urgent { background: #B42318; color: #FFFFFF; padding: 10px var(--px); min-height: 64px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
[data-domaine="cyberwf"] .cw-urgent-tag { font-family: var(--ff-mono); font-size: 13px; letter-spacing: 0.1em; }
[data-domaine="cyberwf"] .cw-urgent-tel { color: #FFFFFF; font-size: 19px; font-weight: 600; text-decoration: underline; min-height: 44px; display: inline-flex; align-items: center; }

/* Avant / Pendant / Après */
[data-domaine="cyberwf"] .cw-apa { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); }
[data-domaine="cyberwf"] .cw-apa-card { border: 1px solid #0A0A14; padding: 36px; display: flex; flex-direction: column; gap: 12px; }
[data-domaine="cyberwf"] .cw-apa-card + .cw-apa-card { border-left: 0; }
[data-domaine="cyberwf"] .cw-apa-card p { margin: 0; font-size: 16px; line-height: 1.55; color: #4A4A63; }
[data-domaine="cyberwf"] .cw-apa-dark { background: #05060F; color: #FFFFFF; border-color: #05060F; }
[data-domaine="cyberwf"] .cw-apa-dark p { color: rgba(255,255,255,0.8); }
[data-domaine="cyberwf"] .cw-big { font-family: var(--ff-display); font-size: 64px; line-height: 0.85; }
[data-domaine="cyberwf"] .cw-orient { border-top: 1px solid #0A0A14; padding-top: 28px; display: flex; flex-direction: column; gap: 10px; }
[data-domaine="cyberwf"] .cw-orient-links { display: flex; gap: 28px; flex-wrap: wrap; }

/* Expositions */
[data-domaine="cyberwf"] .cw-expo { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); column-gap: 48px; row-gap: 32px; }
[data-domaine="cyberwf"] .cw-expo-item { border-top: 2px solid #0A0A14; padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }
[data-domaine="cyberwf"] .cw-expo-head { display: flex; align-items: baseline; gap: 14px; margin: 0; }
[data-domaine="cyberwf"] .cw-expo-num { font-family: var(--ff-display); font-weight: 400; font-size: 44px; line-height: 0.9; color: #1A47FF; }
[data-domaine="cyberwf"] .cw-expo-label { margin: 0; }
[data-domaine="cyberwf"] .cw-expo-item p:last-child { margin: 0; font-size: 17px; line-height: 1.55; color: #0A0A14; }

/* Dépliables */
[data-domaine="cyberwf"] .cw-dl details { border-top: 1px solid #E0E0EE; }
[data-domaine="cyberwf"] .cw-dl summary { list-style: none; cursor: pointer; min-height: 56px; display: flex; justify-content: space-between; align-items: center; gap: 16px; font-size: 17px; font-weight: 600; color: #1A47FF; }
[data-domaine="cyberwf"] .cw-dl summary::-webkit-details-marker { display: none; }
[data-domaine="cyberwf"] .cw-dl summary::after { content: '+'; font-family: var(--ff-mono); font-size: 20px; }
[data-domaine="cyberwf"] .cw-dl details[open] summary::after { content: '−'; }
[data-domaine="cyberwf"] .cw-dl p { margin: 0 0 18px; font-size: 16px; line-height: 1.6; color: #4A4A63; max-width: 820px; }

/* Règles kv */
[data-domaine="cyberwf"] .cw-kv-wrap { border-top: 2px solid #0A0A14; max-width: 1000px; }
[data-domaine="cyberwf"] .cw-kv { display: grid; grid-template-columns: 260px 1fr; gap: 24px; padding: 16px 0; border-bottom: 1px solid #E0E0EE; }
[data-domaine="cyberwf"] .cw-kv strong { font-weight: 600; }
[data-domaine="cyberwf"] .cw-role { margin: 0; font-size: 17px; line-height: 1.6; max-width: 1000px; }
[data-domaine="cyberwf"] .cw-role strong { font-weight: 600; }

/* NIS 2 + examine + numbered */
[data-domaine="cyberwf"] .cw-num { font-family: var(--ff-mono); font-size: 15px; color: #1A47FF; }
[data-domaine="cyberwf"] .cw-nis { list-style: none; margin: 0; padding: 0; max-width: 1000px; border-bottom: 1px solid #E0E0EE; }
[data-domaine="cyberwf"] .cw-nis li { display: grid; grid-template-columns: 56px 1fr; gap: 16px; padding: 20px 0; border-top: 1px solid #E0E0EE; }
[data-domaine="cyberwf"] .cw-nis h3 { font-size: 20px; }
[data-domaine="cyberwf"] .cw-nis .cw-tx { margin-top: 6px; }
[data-domaine="cyberwf"] .cw-exam { list-style: none; margin: 0; padding: 0; max-width: 1000px; border-bottom: 1px solid #E0E0EE; }
[data-domaine="cyberwf"] .cw-exam li { display: grid; grid-template-columns: 56px 1fr; gap: 12px; padding: 18px 0; border-top: 1px solid #E0E0EE; font-size: 19px; line-height: 1.45; }

/* Binôme */
[data-domaine="cyberwf"] .cw-team { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); column-gap: 48px; row-gap: 32px; }
[data-domaine="cyberwf"] .cw-person { display: grid; grid-template-columns: 160px 1fr; gap: 20px; align-items: start; }
[data-domaine="cyberwf"] .cw-person > div { display: flex; flex-direction: column; gap: 8px; }
[data-domaine="cyberwf"] .cw-shot { position: relative; width: 160px; height: 190px; background: #E0E0EE; overflow: hidden; }
[data-domaine="cyberwf"] .cw-note-box { margin: 0; font-size: 17px; line-height: 1.6; max-width: 1000px; background: #F4F4F8; padding: 20px 24px; }
[data-domaine="cyberwf"] .cw-note-box strong { font-weight: 600; }
[data-domaine="cyberwf"] .cw-mention { margin: 0; font-size: 14px; color: #4A4A63; }

/* Situations */
/* Quatre situations en grille 2 × 2 (ordinateur), cartes bordées. */
[data-domaine="cyberwf"] .cw-sits { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; }
[data-domaine="cyberwf"] .cw-sit { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 20px; padding: 28px; border: 1px solid #0A0A14; }
[data-domaine="cyberwf"] .cw-num-lg { font-size: 22px; }
[data-domaine="cyberwf"] .cw-sit-body { display: flex; flex-direction: column; gap: 12px; max-width: 900px; }
[data-domaine="cyberwf"] .cw-sit-h { font-size: clamp(20px, 2.2vw, 26px); }
[data-domaine="cyberwf"] .cw-sit-line { margin: 0; font-size: 16px; line-height: 1.5; }
[data-domaine="cyberwf"] .cw-sit-line strong, [data-domaine="cyberwf"] .cw-sit-prep strong, [data-domaine="cyberwf"] .cw-sit-sub { font-weight: 600; }
[data-domaine="cyberwf"] .cw-sit-sub { margin: 0 0 6px; font-size: 16px; }
[data-domaine="cyberwf"] .cw-sit-ul { margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.6; }
[data-domaine="cyberwf"] .cw-sit-prep { margin: 0; font-size: 16px; line-height: 1.5; background: #F4F4F8; padding: 12px 16px; }
[data-domaine="cyberwf"] .cw-docs { border: 1px solid #0A0A14; padding: 28px 32px; display: flex; flex-direction: column; gap: 10px; }
[data-domaine="cyberwf"] .cw-docs p:first-of-type { margin: 0; font-size: 16px; line-height: 1.6; }

/* Deux parcours */
[data-domaine="cyberwf"] .cw-parcours { display: grid; grid-template-columns: 1fr 1fr; }
[data-domaine="cyberwf"] .cw-parc { padding: clamp(28px, 4vw, 48px); display: flex; flex-direction: column; gap: 14px; }
[data-domaine="cyberwf"] .cw-parc-light { background: #F4F4F8; }
[data-domaine="cyberwf"] .cw-tx-dark { color: #4A4A63; }

/* FAQ */
[data-domaine="cyberwf"] .cw-faq-grid { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 64px; }
[data-domaine="cyberwf"] .cw-faq-list details { border-bottom: 1px solid #E0E0EE; }
[data-domaine="cyberwf"] .cw-faq-list summary { list-style: none; cursor: pointer; min-height: 64px; padding: 12px 0; display: flex; justify-content: space-between; align-items: center; gap: 20px; font-size: clamp(17px, 1.7vw, 19px); font-weight: 500; line-height: 1.35; }
[data-domaine="cyberwf"] .cw-faq-list summary::-webkit-details-marker { display: none; }
[data-domaine="cyberwf"] .cw-faq-list summary::after { content: '+'; font-family: var(--ff-mono); font-size: 22px; color: #1A47FF; flex-shrink: 0; }
[data-domaine="cyberwf"] .cw-faq-list details[open] summary::after { content: '−'; }
[data-domaine="cyberwf"] .cw-faq-list p { margin: 0 0 22px; font-size: 16px; line-height: 1.6; color: #4A4A63; max-width: 760px; }
[data-domaine="cyberwf"] .cw-sujets { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 18px; font-size: 15px; margin-top: 16px; }
[data-domaine="cyberwf"] .cw-sujets strong { font-weight: 600; color: #0A0A14; }
[data-domaine="cyberwf"] .cw-sujets a { margin: 0; white-space: nowrap; }

/* Contact final */
[data-domaine="cyberwf"] .cw-final { padding: clamp(52px,7vw,96px) var(--px); display: grid; grid-template-columns: 7fr 5fr; gap: 64px; align-items: end; }
[data-domaine="cyberwf"] .cw-final > div:first-child { display: flex; flex-direction: column; gap: 16px; }
[data-domaine="cyberwf"] .cw-h2-final { font-size: clamp(32px, 4vw, 48px); }
[data-domaine="cyberwf"] .cw-final .cw-tx { max-width: 640px; }
[data-domaine="cyberwf"] .cw-final-actions { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
[data-domaine="cyberwf"] .cw-final-tel { color: #FFFFFF; font-size: 24px; font-weight: 600; text-decoration: none; }

/* Variantes texte bureau / mobile (raccourcis du wireframe) */
[data-domaine="cyberwf"] .cw-only-m { display: none; }

/* Focus */
[data-domaine="cyberwf"] a:focus-visible, [data-domaine="cyberwf"] summary:focus-visible, [data-domaine="cyberwf"] button:focus-visible { outline: 3px solid #1A47FF; outline-offset: 2px; }
[data-domaine="cyberwf"] .cw-dark a:focus-visible, [data-domaine="cyberwf"] .cw-dark summary:focus-visible { outline-color: #FFFFFF; }

/* Responsive */
@media (max-width: 1100px) {
  [data-domaine="cyberwf"] .cw-expo { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 767px) {
  [data-domaine="cyberwf"] .cw-only-d { display: none; }
  [data-domaine="cyberwf"] .cw-only-m { display: inline; }
  [data-domaine="cyberwf"] .cw-hero { grid-template-columns: 1fr; gap: 20px; }
  [data-domaine="cyberwf"] .cw-hero-visual { display: none; }
  [data-domaine="cyberwf"] .cw-urgent { flex-direction: column; align-items: flex-start; gap: 4px; }
  [data-domaine="cyberwf"] .cw-apa, [data-domaine="cyberwf"] .cw-expo, [data-domaine="cyberwf"] .cw-team, [data-domaine="cyberwf"] .cw-parcours, [data-domaine="cyberwf"] .cw-faq-grid, [data-domaine="cyberwf"] .cw-final, [data-domaine="cyberwf"] .cw-sits { grid-template-columns: 1fr; gap: 22px; }
  [data-domaine="cyberwf"] .cw-sit { padding: 20px; }
  [data-domaine="cyberwf"] .cw-apa-card { border: 1px solid #0A0A14; padding: 18px; }
  [data-domaine="cyberwf"] .cw-apa-dark { border-color: #05060F; }
  [data-domaine="cyberwf"] .cw-kv, [data-domaine="cyberwf"] .cw-sit, [data-domaine="cyberwf"] .cw-person { grid-template-columns: 1fr; gap: 10px; }
  [data-domaine="cyberwf"] .cw-nis li, [data-domaine="cyberwf"] .cw-exam li { grid-template-columns: 40px 1fr; }
  [data-domaine="cyberwf"] .cw-exam li { font-size: 17px; }
  [data-domaine="cyberwf"] .cw-shot { width: 120px; height: 150px; }
  [data-domaine="cyberwf"] .cw-final { align-items: start; }
}
@media (prefers-reduced-motion: reduce) {
  [data-domaine="cyberwf"] * { transition: none !important; animation: none !important; }
}
`;
