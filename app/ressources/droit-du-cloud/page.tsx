import Link from "next/link";
import styles from "../_components/article/article.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import Alerte from "../_components/article/Alerte";
import AppelFinal from "../_components/article/AppelFinal";
import CtaInline from "../_components/article/CtaInline";
import { metaArticle } from "../data/meta";

// Titre, description, chapô et sur-titre : registre data/articles.ts.
const SLUG = "droit-du-cloud";
const CONTRATS = "/nos-domaines/contrats-informatiques";
const RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const CYBER = "/nos-domaines/cybersecurite";
const IA = "/nos-domaines/avocat-intelligence-artificielle";
const AI_ADDENDUM = "/ressources/ai-addendum-avenant-ia";

export const metadata = metaArticle(SLUG);

const SYNTHESE = [
  {
    texte: "RGPD",
    statut: "En vigueur",
    qui: "Tous",
    obligation: "Sous-traitance encadrée, sécurité, transferts",
    sanction: "20 M€ ou 4 % du CA mondial",
  },
  {
    texte: "Loi SREN",
    statut: "En vigueur (art. 27 à 29 jusqu'au 12 janv. 2027)",
    qui: "Fournisseurs ; acheteurs publics",
    obligation: "Frais de sortie au coût réel, interopérabilité, crédits cloud",
    sanction: "3 % du CA mondial (5 % en réitération) ; 1 M€ (crédits cloud)",
  },
  {
    texte: "Data Act",
    statut: "Applicable depuis le 12 sept. 2025",
    qui: "Fournisseurs et clients",
    obligation: "Droit de changer de fournisseur ; frais supprimés au 12 janv. 2027",
    sanction: "Fixée par chaque État membre",
  },
  {
    texte: "NIS 2",
    statut: "Directive en vigueur ; transposition française en cours",
    qui: "Fournisseurs cloud, centres de données, entités régulées",
    obligation: "Gestion des risques, notification des incidents, chaîne d'approvisionnement",
    sanction: "10 M€ ou 2 % du CA mondial",
  },
  {
    texte: "DORA",
    statut: "Applicable depuis le 17 janv. 2025",
    qui: "Entités financières et leurs prestataires",
    obligation: "Résilience, registre des prestataires, clauses obligatoires",
    sanction: "Astreinte jusqu'à 1 % du CA journalier (prestataires critiques)",
  },
  {
    texte: "HDS",
    statut: "En vigueur",
    qui: "Hébergeurs de données de santé",
    obligation: "Certification obligatoire",
    sanction: "Sanctions pénales ; résiliation du contrat",
  },
  {
    texte: "Loi de blocage",
    statut: "En vigueur",
    qui: "Entreprises françaises sollicitées par une autorité étrangère",
    obligation: "Interdiction de communication hors entraide",
    sanction: "6 mois et 18 000 € (90 000 € personnes morales)",
  },
  {
    texte: "CADA",
    statut: "Proposition (juin 2026)",
    qui: "Offres cloud destinées au secteur public",
    obligation: "Niveaux d'assurance de souveraineté",
    sanction: "Aucune à ce stade",
  },
];

export default function Page() {
  const pied = (
    <div className={styles.sources}>
      <p className={styles.label}>Sources</p>
      <ul>
        <li>Loi n° 2024-449 du 21 mai 2024 (SREN), art. 26 à 31 et 64 ; Code de commerce, art. L. 442-1 et L. 442-12 ; loi n° 68-678 du 26 juillet 1968, art. 3 ; Code de la santé publique, art. L. 1111-8.</li>
        <li>Code civil, art. 1112-1, 1170, 1171, 1218 et 1231-1.</li>
        <li>Règlement (UE) 2016/679 (RGPD), art. 28, 32, 44 et s., 83 ; règlement (UE) 2023/2854 (Data Act), art. 23 à 31 ; directive (UE) 2022/2555 (NIS 2) ; règlement (UE) 2022/2554 (DORA) ; règlement (UE) 2024/1689 (AI Act).</li>
        <li>Proposition de règlement Cloud and AI Development Act, COM(2026) 502 final, 3 juin 2026.</li>
        <li>Cass. com., 29 juin 2010, n° 09-11.841 (Faurecia) ; Cass. ch. mixte, 22 avr. 2005, n° 02-18.326 ; TJ Lorient, 1re ch., 13 mai 2026, n° 24/01966.</li>
        <li>Arcep, lignes directrices du 2 juillet 2026 sur les frais de transfert de données en cas de recours simultané à plusieurs fournisseurs de services d&apos;informatique en nuage.</li>
        <li>Circulaires du Premier ministre du 5 juillet 2021 et du 31 mai 2023 (doctrine « cloud au centre ») ; Commission européenne, décision d&apos;adéquation du 10 juillet 2023 (cadre UE–États-Unis).</li>
      </ul>
      <p className={styles.meta}>
        <em>Ce document présente des informations générales. Il ne constitue pas une consultation juridique et ne dispense pas d&apos;une analyse de chaque situation.</em>
      </p>
    </div>
  );

  const after = (
    <AppelFinal titre="Un accompagnement sur l'ensemble du cycle cloud">
      <p className={styles.lead}>
        Lazarègue Avocats accompagne les éditeurs, les intégrateurs et les entreprises clientes sur l&apos;ensemble du cycle cloud : rédaction et négociation des contrats, mise en conformité RGPD, NIS 2 et DORA, préparation aux exigences du secteur public, gestion des incidents et règlement des litiges. Chaque dossier associe les avocats du cabinet à des intervenants techniques, pour confronter le contrat à l&apos;architecture réelle.
      </p>
      <p className={styles.lead}>
        Un premier échange permet de faire le point sur la situation de l&apos;entreprise et de définir les priorités.
      </p>
    </AppelFinal>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} after={after}>
      {/* ===== 01 ===== */}
      <h2 id="marche-encadre">Un marché désormais encadré</h2>
      <p>Pendant longtemps, le <Link href={CONTRATS}>contrat</Link> de cloud s&apos;est résumé aux conditions générales du fournisseur. Le législateur français puis le législateur européen ont depuis pris acte d&apos;une réalité devenue stratégique : les données des entreprises et des administrations reposent sur des infrastructures qu&apos;elles ne maîtrisent pas, souvent contrôlées par des acteurs soumis à des droits étrangers.</p>
      <p>La loi n° 2024-449 du 21 mai 2024 visant à sécuriser et à réguler l&apos;espace numérique (loi SREN) a encadré les frais de sortie, les crédits cloud et l&apos;interopérabilité. Le règlement (UE) 2023/2854 sur les données (Data Act) consacre, depuis le 12 septembre 2025, un véritable droit de changer de fournisseur. NIS 2 et DORA font de la sécurité des prestataires une obligation de leurs clients. Et la Commission européenne prépare, avec le Cloud and AI Development Act, un cadre de souveraineté pour les offres destinées au secteur public.</p>
      <p>Ces règles ne concernent pas les seuls géants du secteur. Elles s&apos;appliquent aussi à l&apos;éditeur SaaS de quarante salariés, à l&apos;ESN qui revend une solution tierce et à l&apos;ETI qui héberge ses données de production. Bien comprises, elles deviennent un outil de négociation et un argument commercial.</p>

      <div className={styles.brief}>
        <span className={styles.label}>Les principaux textes et leur régime de sanction</span>
        <ul>
          <li><strong>RGPD</strong> : jusqu&apos;à 20 millions d&apos;euros ou 4 % du chiffre d&apos;affaires annuel mondial (article 83).</li>
          <li><strong>Loi SREN</strong> : jusqu&apos;à 3 % du chiffre d&apos;affaires mondial hors taxes, 5 % en cas de réitération, prononcés par l&apos;Arcep ; 1 million d&apos;euros, 2 millions en cas de réitération, pour les manquements sur les crédits cloud (article L. 442-12 du Code de commerce).</li>
          <li><strong>NIS 2</strong> : jusqu&apos;à 10 millions d&apos;euros ou 2 % du chiffre d&apos;affaires mondial pour les entités essentielles, 7 millions ou 1,4 % pour les entités importantes (directive (UE) 2022/2555).</li>
          <li><strong>DORA</strong> : astreintes pouvant atteindre 1 % du chiffre d&apos;affaires mondial journalier moyen pour les prestataires informatiques critiques du secteur financier (règlement (UE) 2022/2554).</li>
          <li><strong>Loi de blocage</strong> : six mois d&apos;emprisonnement et 18 000 euros d&apos;amende, portée à 90 000 euros pour les personnes morales, pour la communication illicite d&apos;informations à une autorité étrangère (loi n° 68-678 du 26 juillet 1968, art. 3).</li>
        </ul>
      </div>

      {/* ===== 02 ===== */}
      <h2 id="regles-communes">Les règles communes à toute la chaîne</h2>

      <h3>Les données personnelles</h3>
      <p>Le fournisseur de cloud qui traite des données pour le compte de son client est un sous-traitant au sens du <Link href={RGPD}>RGPD</Link>. Il agit sur instruction documentée, garantit la sécurité du traitement (article 32), assiste son client en cas de violation de données et restitue ou détruit les données en fin de contrat (article 28). Chaque prestataire de rang inférieur — l&apos;hébergeur de l&apos;éditeur, le fournisseur de l&apos;hébergeur — doit être autorisé par écrit et tenu des mêmes obligations.</p>
      <p>Les transferts hors de l&apos;Union supposent une décision d&apos;adéquation, comme le cadre de protection des données UE–États-Unis adopté le 10 juillet 2023 pour les seules entreprises américaines certifiées, ou des clauses contractuelles types accompagnées d&apos;une analyse du droit du pays destinataire (articles 44 et suivants).</p>

      <h3>Le droit de partir</h3>
      <p>Le Data Act impose aux fournisseurs de services de traitement de données de permettre à leurs clients de changer de fournisseur ou de recourir à plusieurs fournisseurs simultanément (chapitre VI, articles 23 à 31). Les frais de changement ne peuvent, pendant la période transitoire, excéder les coûts directement supportés ; ils disparaissent totalement à compter du 12 janvier 2027 (article 29).</p>
      <p>La loi SREN a anticipé ce régime en France : frais de transfert plafonnés aux coûts réels (article 27), obligations de portabilité et d&apos;interopérabilité (articles 28 et 29). Ces dispositions s&apos;effacent devant le Data Act à mesure de son entrée en application, au plus tard le 12 janvier 2027 (article 64). L&apos;Arcep a précisé, par des lignes directrices du 2 juillet 2026, les seuls coûts que les fournisseurs peuvent répercuter en cas d&apos;usage simultané de plusieurs clouds : les coûts strictement liés au transfert, à l&apos;exclusion des fonctions support.</p>

      <h3>L&apos;extraterritorialité</h3>
      <p>Le Cloud Act américain de 2018 et la section 702 du Foreign Intelligence Surveillance Act permettent aux autorités des États-Unis d&apos;exiger d&apos;une entreprise soumise à leur juridiction la communication de données qu&apos;elle contrôle, quel que soit le lieu de leur stockage. Un serveur situé à Paris ne protège donc pas les données d&apos;un fournisseur américain. À l&apos;inverse, la loi de blocage de 1968 interdit de communiquer à une autorité étrangère, hors des voies de l&apos;entraide internationale, des informations économiques, commerciales ou techniques destinées à constituer des preuves. Le choix du fournisseur et la rédaction du contrat permettent d&apos;anticiper ces situations.</p>

      <h3>Le contrat</h3>
      <p>Le droit commun demeure le socle. Une clause limitative de responsabilité qui prive de sa substance l&apos;obligation essentielle du fournisseur — conserver, sécuriser, rendre disponibles les données — est réputée non écrite (article 1170 du Code civil, consacrant la jurisprudence Faurecia, <span className={styles.cite}>Cass. com., 29 juin 2010, n° 09-11.841</span>). La faute lourde écarte également le plafond convenu <span className={styles.cite}>(Cass. ch. mixte, 22 avr. 2005, n° 02-18.326)</span>. La panne d&apos;un sous-traitant ne constitue pas, en principe, un cas de force majeure : le débiteur répond des tiers auxquels il confie l&apos;exécution de son obligation (articles 1218 et 1231-1).</p>

      {/* ===== 03 ===== */}
      <h2 id="developpent">Ceux qui développent le cloud</h2>
      <p><strong>Éditeurs SaaS, plateformes, hébergeurs.</strong> Ils sont les premiers destinataires des obligations réglementaires.</p>
      <ul className={styles.bullets}>
        <li><strong>Sécurité et sous-traitance</strong> : contrat de sous-traitance conforme à l&apos;article 28 du RGPD, mesures de sécurité adaptées, maîtrise de toute la chaîne d&apos;hébergement.</li>
        <li><strong>Sortie et interopérabilité</strong> : export des données dans des formats exploitables, interfaces documentées, frais de sortie limités aux coûts réels puis supprimés en janvier 2027.</li>
        <li><strong>Crédits cloud</strong> : les avoirs offerts pour attirer un client sont limités dans le temps et ne peuvent être assortis d&apos;une exclusivité (article L. 442-12 du Code de commerce).</li>
        <li><strong>Données de santé</strong> : l&apos;hébergement de données de santé pour le compte de tiers exige une certification HDS (article L. 1111-8 du Code de la santé publique). Le tribunal judiciaire de Lorient a ainsi validé la résiliation aux torts exclusifs d&apos;un hébergeur qui accusait des retards et ne justifiait pas d&apos;une certification à jour <span className={styles.cite}>(TJ Lorient, 1re ch., 13 mai 2026, n° 24/01966)</span>.</li>
        <li><strong>Cybersécurité</strong> : les fournisseurs de cloud et de centres de données entrent dans le champ de <Link href={CYBER}>NIS 2</Link>, dont la loi française de transposition est toujours en discussion ; les prestataires des banques et assurances sont soumis aux exigences contractuelles de DORA (article 30).</li>
        <li><strong><Link href={IA}>Intelligence artificielle</Link></strong> : un service qui intègre un système d&apos;IA à haut risque soumet son fournisseur aux obligations du règlement (UE) 2024/1689 — gestion des risques, documentation, supervision humaine.</li>
      </ul>
      <Alerte libelle="À retenir :">une offre conforme — sortie organisée, chaîne d&apos;hébergement maîtrisée, certifications à jour — est aussi un avantage concurrentiel, notamment auprès des grands comptes et du secteur public.</Alerte>

      {/* ===== 04 ===== */}
      <h2 id="vendent">Ceux qui vendent le cloud</h2>
      <p><strong>Revendeurs, intégrateurs, ESN.</strong> Leur rôle d&apos;intermédiaire appelle une attention particulière : ils répondent envers le client final d&apos;une infrastructure qu&apos;ils ne maîtrisent pas directement.</p>
      <ul className={styles.bullets}>
        <li><strong>Responsabilité de la chaîne</strong> : l&apos;intégrateur répond de l&apos;éditeur qu&apos;il a choisi (article 1231-1 du Code civil) et, en matière de données personnelles, de ses sous-traitants ultérieurs (article 28, paragraphe 4, du RGPD).</li>
        <li><strong>Devoir d&apos;information</strong> : le professionnel doit communiquer à son client les informations déterminantes pour son consentement (article 1112-1 du Code civil) — localisation des données, exposition aux droits étrangers, certifications de l&apos;éditeur.</li>
        <li><strong>Contrats miroirs</strong> : garanties, niveaux de service, réversibilité et plafonds accordés au client doivent correspondre à ce que l&apos;éditeur accorde lui-même. Tout écart reste à la charge du revendeur.</li>
        <li><strong>Secteur public</strong> : la doctrine « cloud au centre » (circulaires du Premier ministre du 5 juillet 2021 et du 31 mai 2023) impose aux administrations de l&apos;État un cloud qualifié pour leurs données sensibles ; l&apos;article 31 de la loi SREN étend cette exigence aux données d&apos;une sensibilité particulière, dans l&apos;attente de son décret d&apos;application.</li>
      </ul>
      <Alerte libelle="À retenir :">l&apos;alignement des contrats amont et aval est la clé. Il garantit que chaque engagement pris envers le client est couvert par un engagement équivalent de l&apos;éditeur.</Alerte>

      <CtaInline
        titre="Faire le point sur vos contrats cloud."
        texte="Une revue des contrats fournisseurs et clients permet de vérifier leur conformité à ce cadre, d'organiser la réversibilité et d'aligner les engagements amont et aval."
        telephone
      />

      {/* ===== 05 ===== */}
      <h2 id="achetent">Ceux qui achètent le cloud</h2>
      <p><strong>PME, ETI, grands comptes, acteurs publics.</strong> Externaliser l&apos;hébergement ne transfère pas la responsabilité : l&apos;acheteur conserve la maîtrise juridique de ses données.</p>
      <ul className={styles.bullets}>
        <li><strong>Le choix du fournisseur engage l&apos;entreprise</strong> : le responsable du traitement ne peut recourir qu&apos;à des sous-traitants présentant des garanties suffisantes (article 28, paragraphe 1, du RGPD). Le choix et le suivi du prestataire font partie de ses obligations.</li>
        <li><strong>La souveraineté se vérifie</strong> : localisation des serveurs, nationalité et actionnariat du fournisseur, exposition au Cloud Act. Un hébergement en France par une filiale de groupe américain reste soumis au droit américain.</li>
        <li><strong>La sortie se prépare à l&apos;entrée</strong> : formats d&apos;export, délais, assistance à la migration, sort des données chez les sous-traitants. Le Data Act donne un droit ; seul le contrat en organise l&apos;exercice.</li>
        <li><strong>Les conditions générales se discutent</strong> : dans un contrat d&apos;adhésion, une clause non négociable créant un déséquilibre significatif est réputée non écrite (article 1171 du Code civil) ; entre professionnels, l&apos;article L. 442-1 du Code de commerce sanctionne également le déséquilibre significatif.</li>
        <li><strong>Les secteurs régulés</strong> : banques et assurances doivent tenir un registre de leurs prestataires informatiques et imposer contractuellement des droits d&apos;accès et d&apos;audit (DORA) ; les entités soumises à NIS 2 répondent de la sécurité de leur chaîne d&apos;approvisionnement.</li>
      </ul>
      <Alerte libelle="À retenir :">l&apos;achat de cloud se prépare comme un projet juridique — choix du fournisseur, négociation des conditions, organisation de la sortie dès la signature.</Alerte>
      <p>Voir aussi : <Link href={AI_ADDENDUM}>AI Addendum, l&apos;avenant IA des contrats</Link></p>

      {/* ===== 06 ===== */}
      <h2 id="souverainete">Souveraineté : SecNumCloud et la suite européenne</h2>
      <p>La qualification SecNumCloud, délivrée par l&apos;ANSSI, atteste un haut niveau de sécurité et, depuis la version 3.2 de son référentiel, une protection contre les lois extraterritoriales. Ce n&apos;est pas une obligation pour une entreprise privée, mais elle s&apos;impose aux administrations de l&apos;État pour leurs données sensibles et devient une exigence contractuelle fréquente dans la défense, la santé et chez les opérateurs d&apos;importance vitale.</p>
      <p>La Commission européenne a présenté le 3 juin 2026 une proposition de règlement, le Cloud and AI Development Act (COM(2026) 502). Elle définit quatre niveaux d&apos;assurance de souveraineté pour les offres destinées au secteur public, assortis d&apos;un registre des prestataires reconnus. Le texte n&apos;est pas adopté, mais il fixe la direction : pour vendre au secteur public européen, il faudra prouver, audit à l&apos;appui, l&apos;indépendance à l&apos;égard des droits étrangers.</p>

      {/* ===== 07 ===== */}
      <h2 id="synthese">Synthèse</h2>
      <table className={styles.voies}>
        <thead>
          <tr>
            <th scope="col">Texte</th>
            <th scope="col">Statut</th>
            <th scope="col">Qui est concerné</th>
            <th scope="col">Obligation principale</th>
            <th scope="col">Sanction maximale</th>
          </tr>
        </thead>
        <tbody>
          {SYNTHESE.map((l) => (
            <tr key={l.texte}>
              <th scope="row" data-l="Texte">{l.texte}</th>
              <td data-l="Statut">{l.statut}</td>
              <td data-l="Qui est concerné">{l.qui}</td>
              <td data-l="Obligation principale">{l.obligation}</td>
              <td data-l="Sanction maximale">{l.sanction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ArticleLayout>
  );
}
