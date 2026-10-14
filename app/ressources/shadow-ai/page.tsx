import Link from "next/link";
import a from "../_components/article/article.module.css";
import styles from "./shadow-ai.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import { metaArticle } from "../data/meta";
import KitForm from "./KitForm";

// Titre, chapô, date et métadonnées : registre data/articles.ts. Corps repris
// mot pour mot de la maquette validée (oct. 2026), dans le gabarit du site.
const SLUG = "shadow-ai";

export const metadata = metaArticle(SLUG);

const IconeDoc = () => (
  <svg viewBox="0 0 40 48" aria-hidden="true">
    <path d="M0 0h28l12 12v36H0z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M28 0v12h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 22h26M7 28h26M7 34h18" className={styles.trait} strokeWidth="2" />
  </svg>
);

const IconeGrille = () => (
  <svg viewBox="0 0 40 48" aria-hidden="true">
    <path d="M0 0h28l12 12v36H0z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M28 0v12h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 20h28v18H6zM6 26h28M6 32h28M15 20v18M24 20v18" fill="none" className={styles.trait} strokeWidth="1.5" />
  </svg>
);

export default function Page() {
  const encart = (
    <div className={styles.mini}>
      <p className={styles.miniLabel}>kit gratuit</p>
      <p>Le modèle de charte IA pour l&apos;entreprise et le registre des outils d&apos;IA du cabinet, prêts à adapter.</p>
      <a className="btn btn-primary" href="#kit">
        Recevoir les deux modèles
      </a>
    </div>
  );

  const pied = (
    <>
      <div className={styles.endGrid}>
        <div className={styles.card}>
          <p className={styles.k}>kit gratuit</p>
          <h3>Charte IA et registre des outils</h3>
          <p>Les deux modèles du cabinet, en formats modifiables.</p>
          <a className="btn btn-primary" href="#kit">
            Recevoir les modèles
          </a>
        </div>
        <div className={styles.card}>
          <p className={styles.k}>accompagnement</p>
          <h3>Audit et gouvernance de l&apos;IA</h3>
          <p>
            Inventaire, charte adaptée, formation, consultation du CSE et contrats fournisseurs, menés par des avocats
            avec des intervenants techniques.
          </p>
          <Link className="btn btn-line" href="/nos-domaines/avocat-intelligence-artificielle">
            Découvrir l&apos;accompagnement
          </Link>
        </div>
      </div>
      <div className={a.sources}>
        <p className={a.label}>Sources</p>
        <ul>
          <li>L&apos;Informaticien, n° 250, octobre 2026 : « L&apos;ère de l&apos;industrialisation » et « Veeam interpelle sur les agents fantômes ».</li>
          <li>Règlement (UE) 2024/1689 du 13 juin 2024 sur l&apos;intelligence artificielle, articles 4 et 5.</li>
          <li>Règlement (UE) 2016/679 (RGPD), article 28.</li>
          <li>Code de commerce, article L. 151-1.</li>
        </ul>
      </div>
      <p className={styles.disclaimer}>Cet article présente des règles générales et ne constitue pas une consultation juridique.</p>
    </>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} encart={encart}>
      <h2 id="definition">Shadow AI : de quoi parle-t-on ?</h2>
      <p>
        Le shadow AI désigne l&apos;utilisation d&apos;outils d&apos;intelligence artificielle par les salariés sans
        l&apos;accord ni la connaissance de l&apos;entreprise : assistants conversationnels grand public, outils de
        traduction ou de rédaction en ligne, extensions de navigateur, agents créés par les équipes elles-mêmes.
      </p>
      <ul className={styles.stats}>
        <li>
          <p className={styles.n}>96 %</p>
          <p className={styles.t}>des dirigeants pensent que leurs salariés utilisent l&apos;IA générative sans autorisation</p>
          <p className={styles.s}>dataiku · harris poll</p>
        </li>
        <li>
          <p className={styles.n}>70 %</p>
          <p className={styles.t}>des organisations admettent que des flux d&apos;IA touchent des données sensibles sans supervision complète</p>
          <p className={styles.s}>veeam · censuswide</p>
        </li>
        <li>
          <p className={styles.n}>40 %</p>
          <p className={styles.t}>des dirigeants interrogés s&apos;inquiètent de leur responsabilité personnelle</p>
          <p className={styles.s}>veeam · censuswide</p>
        </li>
      </ul>
      <p className={styles.note}>Chiffres cités par L&apos;Informaticien, n° 250, octobre 2026.</p>
      <p>
        Le problème ne tient pas à l&apos;IA elle-même, qui fait gagner un temps précieux. Il tient à l&apos;absence de
        cadre : l&apos;entreprise ignore quels outils sont utilisés, quelles données y sont confiées et qui en répond.
      </p>

      <h2 id="risques" data-toc="Les risques juridiques">
        Quels sont les risques juridiques ?
      </h2>
      <ul className={styles.risks}>
        <li>
          <div>
            <h3>Données personnelles</h3>
            <span className={styles.ref}>rgpd, art. 28</span>
          </div>
          <p>
            Saisir les données d&apos;un client, d&apos;un candidat ou d&apos;un salarié dans un outil d&apos;IA constitue
            un traitement dont l&apos;entreprise reste responsable. Sans outil choisi et encadré, ni contrat avec le
            prestataire, ni information des personnes, ni sécurité, ni encadrement des transferts hors de l&apos;Union.
          </p>
        </li>
        <li>
          <div>
            <h3>Secret des affaires</h3>
            <span className={styles.ref}>c. com., art. l. 151-1</span>
          </div>
          <p>
            Une information n&apos;est protégée que si l&apos;entreprise a pris des mesures raisonnables pour la garder
            confidentielle. Laisser circuler des documents stratégiques vers des outils extérieurs affaiblit cette
            protection.
          </p>
        </li>
        <li>
          <div>
            <h3>Engagements envers les clients</h3>
            <span className={styles.ref}>responsabilité contractuelle</span>
          </div>
          <p>
            Contrats et accords de confidentialité interdisent souvent de communiquer les informations du client à des
            tiers. Un fournisseur d&apos;IA est un tiers.
          </p>
        </li>
        <li>
          <div>
            <h3>Propriété intellectuelle</h3>
            <span className={styles.ref}>droit d&apos;auteur</span>
          </div>
          <p>
            Un contenu produit par une IA peut ne pas être protégé et reprendre des éléments qui le sont. Un livrable ou
            un code repris sans vérification fait courir un risque de contrefaçon.
          </p>
        </li>
        <li>
          <div>
            <h3>Règlement européen sur l&apos;IA</h3>
            <span className={styles.ref}>règl. (ue) 2024/1689, art. 4</span>
          </div>
          <p>
            Depuis le 2 février 2025, l&apos;entreprise doit assurer un niveau suffisant de maîtrise de l&apos;IA chez son
            personnel. Elle ne peut former ses équipes ni écarter les usages interdits sans savoir quels outils sont
            utilisés.
          </p>
        </li>
      </ul>

      <section className={styles.kit} id="kit" data-toc="Modèle de charte IA à télécharger" aria-labelledby="kit-title">
        <p className={styles.kitLabel}>kit gouvernance de l&apos;ia · gratuit</p>
        <h2 className={styles.kitTitre} id="kit-title">
          Modèle de charte IA pour l&apos;entreprise
        </h2>
        <p className={styles.intro}>
          Une charte d&apos;utilisation de l&apos;IA en entreprise et une grille pour tenir le registre des outils
          d&apos;IA : les documents que le cabinet utilise en mission, livrés dans des formats modifiables.
        </p>
        <ul className={styles.docs}>
          <li>
            <IconeDoc />
            <div>
              <h3>Charte d&apos;utilisation des outils d&apos;IA</h3>
              <p>
                Douze articles : outils autorisés, données interdites, contrôle humain, consultation du CSE, sanctions.
                Précédée d&apos;une note à l&apos;employeur sur l&apos;opposabilité.
              </p>
              <p className={styles.fmt}>
                <span>PDF</span>
                <span>WORD</span>
              </p>
            </div>
          </li>
          <li>
            <IconeGrille />
            <div>
              <h3>Grille d&apos;inventaire et de gouvernance</h3>
              <p>
                Le registre des outils d&apos;IA : tableau à 24 colonnes avec listes de choix, classification des
                risques, fiche d&apos;évaluation par outil et circuit de validation.
              </p>
              <p className={styles.fmt}>
                <span>PDF</span>
                <span>EXCEL</span>
              </p>
            </div>
          </li>
        </ul>
        <KitForm />
      </section>

      <h2 id="responsables">Qui est responsable ?</h2>
      <p>
        Le fait que l&apos;usage n&apos;ait pas été autorisé n&apos;exonère pas l&apos;entreprise. Il révèle au contraire
        une organisation insuffisante, et c&apos;est précisément ce que les autorités examinent.
      </p>
      <div className={styles.who}>
        <div>
          <h3>L&apos;entreprise</h3>
          <p>Elle répond, à l&apos;égard des clients, de la CNIL et des partenaires, des données confiées à un outil par ses salariés.</p>
        </div>
        <div>
          <h3>Les dirigeants</h3>
          <p>Leur responsabilité personnelle en matière de cybersécurité et de conformité se renforce, notamment avec la directive NIS 2.</p>
        </div>
        <div>
          <h3>Les salariés</h3>
          <p>Une sanction disciplinaire suppose que la règle leur ait été clairement opposable avant les faits.</p>
        </div>
      </div>

      <h2 id="encadrer" data-toc="Gouvernance de l'IA">
        Gouvernance de l&apos;IA : encadrer sans interdire
      </h2>
      <p>
        Interdire l&apos;IA est rarement efficace : les salariés continuent de l&apos;utiliser, simplement sans le dire.
        Mieux vaut fixer un cadre clair et proposer des outils validés, dans cet ordre.
      </p>
      <ol className={styles.steps}>
        <li>
          <div>
            <h3>Tenir un registre des outils d&apos;IA</h3>
            <p>
              Recenser par service les outils et agents réellement utilisés et les données qui y sont confiées. Un
              questionnaire anonyme donne souvent une image plus fidèle qu&apos;un audit technique seul.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h3>Adopter une charte IA</h3>
            <p>Outils autorisés, données à ne jamais saisir, vérification des contenus produits, procédure pour demander un nouvel outil.</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Former les équipes</h3>
            <p>C&apos;est une obligation de l&apos;article 4 du règlement sur l&apos;IA et le meilleur moyen de rendre la charte effective.</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Contrôler et mettre à jour</h3>
            <p>
              Désigner un référent, prévoir un canal de signalement des incidents et revoir la liste des outils autorisés
              au moins une fois par an.
            </p>
          </div>
        </li>
      </ol>
      <div className={styles.callout}>
        <h3>Rendre la charte opposable</h3>
        <p>
          Pour fonder une sanction, la charte doit être annexée au règlement intérieur et en suivre la procédure : avis
          du comité social et économique, communication à l&apos;inspection du travail, dépôt au greffe du conseil de
          prud&apos;hommes. L&apos;introduction d&apos;un outil d&apos;IA peut en outre exiger la consultation préalable
          du CSE.
        </p>
      </div>

      <h2 id="mesurer" data-toc="Mesurer son exposition">
        Mesurer l&apos;exposition de votre entreprise
      </h2>
      <p>
        Avant d&apos;adopter un cadre, il faut savoir d&apos;où l&apos;on part. L&apos;autodiagnostic du cabinet situe
        votre niveau d&apos;exposition au règlement européen sur l&apos;IA en dix questions.
      </p>
      <div className={styles.tool}>
        <div>
          <p className={styles.k}>outil · 10 questions · sans inscription</p>
          <h3>Autodiagnostic Shadow AI</h3>
          <p>Usages, données, CSE, contrats fournisseurs, systèmes à haut risque. Résultat immédiat.</p>
        </div>
        <Link className="btn btn-primary" href="/ressources/diagnostic-shadow-ai">
          Commencer le diagnostic
        </Link>
      </div>
    </ArticleLayout>
  );
}
