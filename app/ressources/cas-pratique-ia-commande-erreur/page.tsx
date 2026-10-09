import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./cas-pratique.module.css";
import { DOM_LABEL, article, chemin } from "../data/articles";
import { metaArticle } from "../data/meta";

/**
 * Cas pratique « Une IA commande sur votre site et se trompe » — CAS FICTIF à
 * visée pédagogique (mention affichée). Page à part, structure de la maquette
 * docs/maquettes/cas-pratique-maquette.html : hero navy → sommaire latéral →
 * le cas → 6 étapes → 3 variantes → tableau des risques → 4 actions → appel.
 * Ne va PAS dans /cas-clients (rubrique réservée aux dossiers réels).
 * Titre, description et chapô : registre data/articles.ts. Aucune date.
 */
const SLUG = "cas-pratique-ia-commande-erreur";
const URL_BASE = "https://lazaregue-avocats.fr";
const GUIDE = "/ressources/agents-ia-ecommerce-cgv";
const GUIDE_TITRE = "Agents IA et e-commerce : quel cadre juridique, et comment adapter ses CGV ?";

export const metadata = metaArticle(SLUG);

const SOMMAIRE: { id: string; n?: string; label: string }[] = [
  { id: "cas", label: "Le cas" },
  { id: "e1", n: "01", label: "La vente tient-elle ?" },
  { id: "e2", n: "02", label: "Vos CGV s’appliquent-elles ?" },
  { id: "e3", n: "03", label: "La cliente a-t-elle été informée ?" },
  { id: "e4", n: "04", label: "L’option payante est-elle due ?" },
  { id: "e5", n: "05", label: "La cliente peut-elle se rétracter ?" },
  { id: "e6", n: "06", label: "Pourrez-vous prouver ce qui s’est passé ?" },
  { id: "variantes", label: "Trois variantes" },
  { id: "risques", label: "Vos risques en un tableau" },
  { id: "agir", label: "Ce qu’il faut faire maintenant" },
];

/* Une étape : grand numéro bleu, question, réponse courte en gras, explication,
   encadré navy « Votre mesure ». */
function Etape({ id, n, question, reponse, mesure, children }: { id: string; n: string; question: string; reponse: ReactNode; mesure: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className={styles.etape} aria-labelledby={`t-${id}`}>
      <div className={styles.etapeTete}>
        <span className={styles.numero} aria-hidden="true">{n}</span>
        <h2 id={`t-${id}`}>{question}</h2>
      </div>
      <p className={styles.reponse}>{reponse}</p>
      {children}
      <div className={styles.mesure}>
        <p className={styles.mesureLabel}>Votre mesure</p>
        {mesure}
      </div>
    </section>
  );
}

export default function Page() {
  const a = article(SLUG);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.seoDescription,
        inLanguage: "fr-FR",
        mainEntityOfPage: `${URL_BASE}${chemin(SLUG)}`,
        image: `${URL_BASE}/ressources/og/${SLUG}`,
        author: { "@type": "Person", name: a.auteur, jobTitle: "Avocat au Barreau de Paris", url: `${URL_BASE}/le-cabinet` },
        publisher: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
          { "@type": "ListItem", position: 2, name: "Ressources", item: `${URL_BASE}/ressources` },
          { "@type": "ListItem", position: 3, name: DOM_LABEL[a.dom], item: `${URL_BASE}/ressources?domaine=${a.dom}` },
          { "@type": "ListItem", position: 4, name: a.title, item: `${URL_BASE}${chemin(SLUG)}` },
        ],
      },
    ],
  };

  return (
    <main className={styles.page} id="contenu">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ================================ HERO ============================== */}
      <section className={styles.hero} aria-labelledby="h1">
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d’Ariane">
            <Link href="/ressources">Ressources</Link> <span aria-hidden="true">/</span>{" "}
            <Link href={`/ressources?domaine=${a.dom}#liste`}>{DOM_LABEL[a.dom]}</Link> <span aria-hidden="true">/</span> Cas pratique
          </nav>
          <p className={styles.kicker}>Cas pratique · Lazarègue Avocats</p>
          <h1 id="h1">
            Une IA commande sur votre site et se trompe<span className={styles.srOnly}> : </span>
            <span className={styles.sousTitre}>qui en supporte le risque&nbsp;?</span>
          </h1>
          <p className={styles.chapo}>{a.chapo}</p>
          <p className={styles.mention}>Cas fictif à visée pédagogique</p>
        </div>
      </section>

      <div className={`${styles.wrap} ${styles.corps}`}>
        {/* ============================== SOMMAIRE ========================== */}
        <aside className={styles.sommaire} aria-label="Sommaire">
          <p className={styles.label}>Sommaire</p>
          <ol>
            {SOMMAIRE.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  {s.n ? <span className={styles.somN} aria-hidden="true">{s.n}</span> : null}
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className={styles.article}>
          {/* ============================== LE CAS ========================== */}
          <section id="cas" className={styles.cas} aria-labelledby="t-cas">
            <h2 id="t-cas">Le cas</h2>
            <div className={styles.prose}>
              <p>NovaTech vend en ligne du matériel informatique, aux particuliers comme aux entreprises. Un mardi soir, son site reçoit une commande parfaitement régulière en apparence :</p>
            </div>

            <div className={styles.commande}>
              <p className={styles.commandeTete}>Commande reçue · passée par un agent d’IA</p>
              <div className={styles.defile}>
                <table>
                  <caption className={styles.srOnly}>Détail de la commande reçue par NovaTech</caption>
                  <tbody>
                    <tr><th scope="row">Ordinateur portable</th><td>2 650 €</td></tr>
                    <tr><th scope="row">Extension de garantie, 3 ans <span className={styles.annot}>(ajoutée par l’agent)</span></th><td>249 €</td></tr>
                    <tr><th scope="row">Livraison express</th><td>35 €</td></tr>
                    <tr><th scope="row">Conditions générales de vente</th><td>Acceptées</td></tr>
                    <tr className={styles.total}><th scope="row">Total payé par carte</th><td>2 934 €</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.prose}>
              <p>Trois jours plus tard, la cliente, Camille, écrit au service client. Elle n’a rien commandé elle-même : son assistant d’IA l’a fait pour elle.</p>
            </div>
            <blockquote className={styles.citation}>
              <p>« Je lui avais demandé un bon ordinateur pour le télétravail, environ 2 000 €. Je n’ai jamais vu vos conditions, je ne veux pas de cette garantie et je demande à être remboursée. »</p>
              <footer>Camille, cliente</footer>
            </blockquote>
            <p className={styles.question}>NovaTech est-elle exposée&nbsp;?</p>
          </section>

          {/* ============================== 6 ÉTAPES ======================== */}
          <Etape
            id="e1"
            n="01"
            question="La vente tient-elle ?"
            reponse="En principe, oui. L’agent n’est pas une personne mais un outil : ce qu’il fait engage celui qui l’utilise."
            mesure={<p>Lisez les paramètres transmis par les agents, et bloquez automatiquement toute commande qui les dépasse.</p>}
          >
            <div className={styles.prose}>
              <p>Une exception doit être surveillée. Le vendeur ne peut pas se prévaloir d’une commande dont il savait, ou devait savoir, qu’elle dépassait la volonté du client. Tout dépend de la façon dont l’agent a accédé au site :</p>
            </div>
            <div className={styles.faits}>
              <p><strong>L’agent a navigué comme un humain</strong>, en lisant les pages et en remplissant les formulaires : il n’a rien transmis de son budget. <strong>La vente tient.</strong> La cliente se retournera contre l’éditeur de son agent.</p>
              <p><strong>L’agent a commandé par un protocole d’achat</strong> qui transmet les limites fixées par l’utilisateur, par exemple « 2 000 € maximum » : en acceptant 2 650 €, NovaTech ne peut plus invoquer sa bonne foi. <strong>La vente est fragile.</strong></p>
            </div>
          </Etape>

          <Etape
            id="e2"
            n="02"
            question="Vos CGV s’appliquent-elles ?"
            reponse="Seulement si la cliente a pu les lire avant de s’engager. Un agent qui clique sur « j’accepte » ne suffit pas."
            mesure={<p>Adaptez vos CGV aux agents. Elles doivent dire quels agents vous acceptez, ce qui prouve leur autorisation, quelles limites ils doivent respecter, et quand la confirmation du client est exigée.</p>}
          >
            <div className={styles.prose}>
              <p>Si elle n’y a jamais eu accès, la vente subsiste, mais sans les clauses qui protègent NovaTech : frais de retour à la charge du client, limitations de responsabilité, conditions de garantie.</p>
            </div>
          </Etape>

          <Etape
            id="e3"
            n="03"
            question="La cliente a-t-elle été informée ?"
            reponse="Informer l’agent ne suffit pas. La cliente elle-même doit recevoir les informations essentielles, sur un support qu’elle peut conserver."
            mesure={<p>Envoyez systématiquement au client, et pas seulement à son agent, une confirmation complète de la commande.</p>}
          >
            <div className={styles.prose}>
              <p>Les informations concernées : produit, prix total, délai de livraison, droit de rétractation. Sans confirmation adressée à Camille, le délai de rétractation est prolongé de douze mois. Une information essentielle manquante peut même entraîner l’annulation de la vente.</p>
            </div>
          </Etape>

          <Etape
            id="e4"
            n="04"
            question="L’option payante est-elle due ?"
            reponse="Non. Toute option ajoutée au prix principal exige le consentement exprès du consommateur."
            mesure={<p>Ne proposez aucune option payante ni aucun financement à un agent sans confirmation directe du client.</p>}
          >
            <div className={styles.prose}>
              <p>Une option choisie par l’agent ne remplit pas cette condition. NovaTech doit rembourser les 249 € et s’expose à une amende pouvant atteindre 15 000 €. À compter du 20 novembre 2026, le paiement en plusieurs fois suivra la même logique : tout crédit exigera une demande préalable et l’accord explicite du client.</p>
            </div>
          </Etape>

          <Etape
            id="e5"
            n="05"
            question="La cliente peut-elle se rétracter ?"
            reponse="Oui, dans les 14 jours, sans avoir à se justifier, que la commande vienne d’elle ou de son agent."
            mesure={<p>Prévoyez un parcours de rétractation accessible aux agents comme aux humains.</p>}
          >
            <div className={styles.prose}>
              <p>L’agent peut exercer ce droit pour elle. Vos frais de retour ne pourront lui être imposés que si elle en a été informée.</p>
            </div>
          </Etape>

          <Etape
            id="e6"
            n="06"
            question="Pourrez-vous prouver ce qui s’est passé ?"
            reponse="C’est à vous de le prouver. Avec un agent, il faut montrer non seulement ce qui a été commandé, mais ce que l’agent était autorisé à faire."
            mesure={
              <>
                <p>Conservez pour chaque commande passée par un agent :</p>
                <ul>
                  <li>l’identité de l’agent et les limites qu’il a transmises ;</li>
                  <li>les prix affichés et la version des CGV ;</li>
                  <li>les confirmations du client et les données du paiement.</li>
                </ul>
              </>
            }
          />

          {/* ============================= 3 VARIANTES ====================== */}
          <section id="variantes" className={styles.bloc} aria-labelledby="t-variantes">
            <h2 id="t-variantes">Trois variantes</h2>
            <div className={styles.variantes}>
              <article>
                <p className={styles.label}>Variante 1</p>
                <h3>Le client est une entreprise</h3>
                <p>Les règles protectrices du consommateur ne s’appliquent pas : pas de droit de rétractation légal, pas de règle légale sur les options payantes. Le contrat-cadre devient l’outil central : il fixe à l’avance les agents admis, les plafonds, les produits autorisés et la valeur des journaux de connexion. Entre professionnels, la loi permet même d’y écarter la procédure de validation en deux clics.</p>
                <p className={styles.aRetenir}><span aria-hidden="true">→ </span>Proposez à vos clients professionnels un contrat-cadre « commandes automatisées ».</p>
              </article>
              <article>
                <p className={styles.label}>Variante 2</p>
                <h3>C’est votre entreprise qui achète par agent</h3>
                <p>Si votre propre agent d’achats commande trop, ou mal, votre entreprise est engagée envers le vendeur. Votre recours vise l’éditeur de l’agent, qui exclut souvent sa responsabilité dans ses conditions. Une telle exclusion n’est pourtant pas toujours valable lorsqu’elle vide le contrat de sa substance.</p>
                <p className={styles.aRetenir}><span aria-hidden="true">→ </span>Relisez le contrat de votre fournisseur d’agent et fixez des plafonds stricts.</p>
              </article>
              <article>
                <p className={styles.label}>Variante 3</p>
                <h3>L’agent du client a été piraté</h3>
                <p>Si l’agent détourné a payé un faux site, le paiement n’est pas autorisé : la banque de la cliente doit la rembourser, sauf fraude ou négligence grave de sa part. Le fait d’avoir utilisé un agent n’en est pas une. Si l’agent a bien commandé chez NovaTech, mais à l’insu de la cliente, la banque peut se retourner contre le commerçant selon les règles du réseau de carte.</p>
                <p className={styles.aRetenir}><span aria-hidden="true">→ </span>Conservez les preuves d’autorisation du paiement avec chaque commande.</p>
              </article>
            </div>
          </section>

          {/* ========================== TABLEAU DES RISQUES ================= */}
          <section id="risques" className={styles.bloc} aria-labelledby="t-risques">
            <h2 id="t-risques">Vos risques en un tableau</h2>
            <div className={`${styles.defile} ${styles.cadre}`} tabIndex={0} role="region" aria-labelledby="t-risques">
              <table className={styles.risques}>
                <thead>
                  <tr><th scope="col">Situation</th><th scope="col">Exposition de l’entreprise</th><th scope="col">Mesure</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Limite du client transmise et ignorée</th><td>Vente contestable</td><td>Lire et bloquer les dépassements</td></tr>
                  <tr><th scope="row">CGV jamais accessibles au client</th><td>Clauses protectrices inopposables</td><td>CGV adaptées aux agents</td></tr>
                  <tr><th scope="row">Pas de confirmation au client</th><td>Rétractation prolongée de 12 mois</td><td>Confirmation systématique</td></tr>
                  <tr><th scope="row">Option payante ajoutée par l’agent</th><td>Remboursement et amende</td><td>Confirmation du client pour toute option</td></tr>
                  <tr><th scope="row">Litige sur les pouvoirs de l’agent</th><td>Charge de la preuve sur le vendeur</td><td>Dossier de transaction</td></tr>
                  <tr><th scope="row">Client professionnel</th><td>Peu de règles impératives</td><td>Contrat-cadre</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ============================== 4 ACTIONS ======================= */}
          <section id="agir" className={styles.bloc} aria-labelledby="t-agir">
            <h2 id="t-agir">Ce qu’il faut faire maintenant</h2>
            <ol className={styles.actions}>
              <li><span className={styles.actionN} aria-hidden="true">1</span><strong>Cartographier</strong><span>les parcours de votre site que les agents peuvent emprunter.</span></li>
              <li><span className={styles.actionN} aria-hidden="true">2</span><strong>Adapter</strong><span>vos CGV et proposer un contrat-cadre à vos clients professionnels.</span></li>
              <li><span className={styles.actionN} aria-hidden="true">3</span><strong>Paramétrer</strong><span>la confirmation du client pour les options et le financement.</span></li>
              <li><span className={styles.actionN} aria-hidden="true">4</span><strong>Conserver</strong><span>la preuve de chaque commande passée par un agent.</span></li>
            </ol>
          </section>

          {/* =========================== POUR ALLER PLUS LOIN =============== */}
          <nav className={styles.suite} aria-labelledby="t-suite">
            <h2 className={styles.label} id="t-suite">Pour aller plus loin</h2>
            <Link href={GUIDE}>
              <span className={styles.suiteType}>IA · Guide pratique</span>
              <span className={styles.suiteTitre}>{GUIDE_TITRE}</span>
            </Link>
          </nav>
        </article>
      </div>

      {/* ============================ APPEL À L'ACTION ====================== */}
      <section className={styles.appel} aria-labelledby="t-appel">
        <div className={`${styles.wrap} ${styles.appelInner}`}>
          <div>
            <h2 id="t-appel">Vos parcours d’achat sont-ils prêts pour les agents&nbsp;?</h2>
            <p>Lazarègue Avocats accompagne les e-commerçants, les plateformes et les éditeurs d’agents d’IA dans l’adaptation de leurs contrats et de leurs parcours d’achat.</p>
          </div>
          <div className={styles.appelBoutons}>
            <Link className={styles.btn} href="/contact">Échanger avec un avocat</Link>
            {/* « Lire le livre blanc » : non affiché tant que le livre blanc n'est pas en ligne. */}
            <Link className={styles.btnLigne} href={GUIDE}>Lire le guide pratique</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
