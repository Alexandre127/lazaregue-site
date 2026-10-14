import Link from "next/link";
import styles from "../_components/article/article.module.css";
import s from "./perte-de-donnees.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import AppelFinal from "../_components/article/AppelFinal";
import { metaArticle } from "../data/meta";

// Titre, sous-titre (chapô du gabarit), description et domaine : registre data/articles.ts.
const SLUG = "perte-de-donnees-hebergeur";
const CONTRATS = "/nos-domaines/contrats-informatiques";
const CONTENTIEUX = "/nos-domaines/contentieux-informatique-commercial";

export const metadata = metaArticle(SLUG);

export default function Page() {
  const pied = (
    <div className={styles.sources}>
      <p className={styles.label}>Sources</p>
      <ul>
        <li>CA Douai, ch. 2 sect. 2, 24 avril 2025, n° 23/00858.</li>
        <li>CA Rennes, 3e ch. com., 19 novembre 2024, n° 23/04627.</li>
        <li>TJ Paris, 4e ch. 2e sect., 10 juillet 2025, n° 25/05759.</li>
        <li>CA Bordeaux, 4e ch. com., 14 avril 2025, n° 24/01325.</li>
        <li>Code civil, art. 1137, 1170, 1171, 1218, 1231-1, 1231-3 · Code de procédure civile, art. 145 et 873 · Code de commerce, art. L. 442-1.</li>
        <li>Directive (UE) 2022/2555 (NIS 2), art. 21 · Règlement (UE) 2022/2554 (DORA), art. 11 et 12 · Règlement (UE) 2023/2854 (Data Act), art. 23 à 31.</li>
        <li>« Et si tout reposait sur le data center ? », L&apos;Informaticien, n° 248, juillet-août 2026, p. 78-79.</li>
      </ul>
    </div>
  );

  const after = (
    <AppelFinal titre="Un contrat à relire, un sinistre en cours">
      <p className={styles.lead}>
        Le cabinet intervient sur les contrats d&apos;hébergement, de cloud et d&apos;infogérance, avant la signature comme <Link href={CONTENTIEUX}>après l&apos;incident</Link>. Sur ces dossiers, l&apos;avocat lit le contrat pendant qu&apos;un consultant technique en cybersécurité lit l&apos;architecture.
      </p>
    </AppelFinal>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} after={after}>
      {/* Chapeau */}
      <p>Un incendie, un rançongiciel, une fibre coupée par un engin de chantier : le jour où l&apos;infrastructure tombe, l&apos;entreprise découvre ce que son contrat d&apos;hébergement contient réellement. Le contentieux né de l&apos;incendie du datacentre strasbourgeois d&apos;OVHcloud, en mars 2021, l&apos;a montré : un client peut obtenir gain de cause sur le principe et voir son indemnisation ramenée au plafond contractuel. La protection ne se construit pas devant le tribunal. Elle se négocie avant la signature.</p>

      {/* ===== 01 ===== */}
      <h2 id="sauvegarde">Une sauvegarde n&apos;est pas une promesse de restauration</h2>
      <p>Une société exploitant un réseau de franchise sur internet louait un serveur privé virtuel chez OVH et avait souscrit l&apos;option de sauvegarde automatisée. Dans la nuit du 9 au 10 mars 2021, l&apos;incendie a détruit le serveur. Il a aussi détruit les sauvegardes, stockées dans le même bâtiment. Le client réclamait plus de six millions d&apos;euros.</p>
      <p>La cour d&apos;appel de Douai, le 24 avril 2025, a retenu un manquement du prestataire. Une fois l&apos;option souscrite, l&apos;hébergeur est tenu d&apos;une obligation de résultat : réaliser la copie et permettre au client d&apos;y accéder pendant toute la durée du contrat. L&apos;incendie n&apos;a pas été jugé constitutif d&apos;un cas de force majeure : dans un datacentre rempli de serveurs, de batteries et de réseaux électriques, ce risque n&apos;est ni imprévisible ni irrésistible pour l&apos;exploitant.</p>
      <p>Mais sur tout le reste, le client a perdu. L&apos;engagement contractuel d&apos;un espace de sauvegarde « physiquement isolé » a été lu dans son sens commun : un serveur et une salle distincts, pas un site géographiquement éloigné. Y voir une obligation de distance aurait, selon la cour, ajouté au contrat une condition qu&apos;il ne prévoyait pas. La règle dite « 3-2-1 » — trois copies, deux supports, un site externe — n&apos;a pas été jugée opposable au prestataire, la politique de sauvegarde relevant du client selon les conditions générales. Aucune faute lourde n&apos;a été caractérisée. Les clauses limitatives de responsabilité et l&apos;exclusion des dommages indirects (perte de commandes, atteinte à l&apos;image) ont été jugées valables.</p>
      <div className={styles.vig}>
        <span className={styles.label}>À retenir</span>
        <p>La copie existait. Elle se trouvait dans la maison qui a brûlé, et le contrat ne disait pas qu&apos;elle devait être ailleurs. Le juge lit le contrat tel qu&apos;il est écrit : ce qui n&apos;y figure pas ne sera pas reconstitué après le sinistre.</p>
      </div>
      <p className={styles.reference}>Réf. CA Douai, ch. 2 sect. 2, 24 avril 2025, n° 23/00858, infirmant partiellement T. com. Lille Métropole, 26 janvier 2023.</p>

      {/* ===== 02 ===== */}
      <h2 id="devoir-de-conseil">Le devoir de conseil protège surtout ceux qui ne sont pas du métier</h2>
      <p>Un fabricant de portails avait confié à un intégrateur le remplacement de son infrastructure. Quelques mois plus tard, un rançongiciel a chiffré la production et les sauvegardes, qui restaient administrables depuis le réseau de l&apos;entreprise. Rien n&apos;était déconnecté.</p>
      <p>La cour d&apos;appel de Rennes, le 19 novembre 2024, a jugé que l&apos;intégrateur devait analyser les besoins de son client, le conseiller sur l&apos;architecture nécessaire à la sécurité de ses données et lui signaler que sa prestation ne comportait pas de sauvegardes déconnectées. Le client n&apos;était pas un professionnel de l&apos;informatique. L&apos;intégrateur a été condamné à 50 000 euros au titre de la perte de chance d&apos;éviter le sinistre — une fraction du dommage, non sa totalité.</p>
      <p>La comparaison avec l&apos;affaire de Douai est instructive. La société hébergée chez OVH tirait l&apos;essentiel de son activité de ses sites internet ; la cour l&apos;a traitée en professionnel averti et a refusé de mettre à la charge de l&apos;hébergeur un devoir de conseil particulier. Plus une entreprise dispose de compétences internes, moins elle pourra reprocher à son prestataire de ne pas l&apos;avoir alertée. Pour une ETI dotée d&apos;une DSI, la protection passe donc par le contrat, non par le devoir de conseil.</p>
      <p className={styles.reference}>Réf. CA Rennes, 3e ch. com., 19 novembre 2024, n° 23/04627.</p>

      {/* ===== 03 ===== */}
      <h2 id="redondance">La redondance promise doit pouvoir être prouvée</h2>
      <p>Une entreprise pensait disposer de deux adductions fibre distinctes. Les deux chemins se rejoignaient en réalité dans un même local technique, quelques kilomètres plus loin ; un coup de pelleteuse a suffi à couper les deux. Le cas, rapporté en 2026 par un associé cybersécurité de Wavestone dans la presse professionnelle, résume le problème : une redondance qui n&apos;a jamais été vérifiée reste une hypothèse.</p>
      <p>Juridiquement, deux situations se distinguent. Si le contrat promet une « haute disponibilité » ou une « redondance » sans les définir, le prestataire défendra, comme à Douai, une lecture minimale de son engagement — et le juge risque de la retenir. Si, au contraire, le prestataire a présenté une architecture qu&apos;il savait inexistante, le terrain devient celui du dol (art. 1137 du Code civil) : le contrat peut être annulé, et la faute dolosive fait tomber le plafond de responsabilité (art. 1231-3). Encore faut-il le démontrer.</p>
      <p>La preuve se prépare avant le procès. L&apos;article 145 du Code de procédure civile permet d&apos;obtenir du juge, sur requête ou en référé, qu&apos;un commissaire de justice assisté d&apos;un technicien constate l&apos;architecture réelle : chemins physiques, localisation des copies, journaux de bascule. Cette mesure, prise vite, décide souvent de l&apos;issue du dossier.</p>

      {/* ===== 04 ===== */}
      <h2 id="hors-europe">Le fournisseur hors d&apos;Europe qui coupe le service</h2>
      <p>Les responsables de la sécurité le disent désormais ouvertement : leur crainte principale n&apos;est plus seulement l&apos;attaque, mais l&apos;arrêt de fourniture par un prestataire soumis à une autorité étrangère — sanctions, contrôle des exportations, injonction d&apos;un État tiers.</p>
      <p>Le fournisseur qui suspend son service invoquera la force majeure. L&apos;article 1218 du Code civil exige un événement qui ne pouvait être raisonnablement prévu lors de la conclusion du contrat. Le raisonnement suivi à Douai pour l&apos;incendie se transpose : un risque inhérent à l&apos;activité ou à la structure même du prestataire se prête mal à cette qualification. Un fournisseur qui relève d&apos;une juridiction étrangère connaît, au jour de la signature, l&apos;exposition que cela implique.</p>
      <p>Ce raisonnement a toutefois ses limites. Les conditions générales des grands fournisseurs prévoient presque toujours une faculté de suspension pour se conformer aux lois de contrôle des exportations ; le client qui les a acceptées aura du mal à s&apos;en plaindre. L&apos;action se reporte alors sur le prestataire français qui a conçu ou revendu la solution, lequel répond de ses propres fournisseurs, et, lorsque la relation commerciale est établie, sur la rupture brutale sans préavis suffisant (art. L. 442-1, II, du Code de commerce). La meilleure défense reste l&apos;anticipation : savoir de qui l&apos;on dépend, et organiser la sortie avant d&apos;en avoir besoin.</p>

      {/* ===== 05 ===== */}
      <h2 id="reversibilite">La réversibilité : le terrain où le juge agit vite</h2>
      <p>Lorsque le prestataire retient les données en fin de contrat, le juge des référés intervient en quelques jours. Le tribunal judiciaire de Paris, le 10 juillet 2025, a enjoint sous astreinte à un hébergeur qui avait interrompu la migration après la résiliation — en soutenant que le contrat s&apos;était tacitement prolongé — de rétablir le transfert et de permettre la récupération des serveurs. La restitution des données hébergées est due, et sauf stipulation contraire, elle est gratuite.</p>
      <p>La cour d&apos;appel de Bordeaux, le 14 avril 2025, a statué dans le même sens à propos d&apos;un éditeur SaaS de billettique qui avait coupé l&apos;accès d&apos;un exploitant de transports à l&apos;échéance sans transférer les données des usagers. Sur le fondement de l&apos;article 873 du Code de procédure civile, l&apos;éditeur a été contraint d&apos;exécuter le plan de réversibilité prévu au contrat.</p>
      <p>Dans les deux cas, le client disposait d&apos;une base écrite. Un plan de réversibilité précis — format, délai, assistance, prix — transforme un litige incertain en procédure d&apos;urgence. Le règlement européen sur les données (Data Act), dont le chapitre consacré au changement de fournisseur cloud s&apos;applique depuis le 12 septembre 2025, renforce encore ces obligations de portabilité.</p>
      <p className={styles.reference}>Réf. TJ Paris, 4e ch. 2e sect., 10 juillet 2025, n° 25/05759 · CA Bordeaux, 4e ch. com., 14 avril 2025, n° 24/01325 · Règlement (UE) 2023/2854, art. 23 à 31.</p>

      {/* ===== 06 ===== */}
      <h2 id="entites-regulees">Pour les entités régulées, le contrat devient une pièce de conformité</h2>
      <p>La directive NIS 2 impose aux entités essentielles et importantes des mesures de continuité d&apos;activité, de sauvegarde et de gestion de crise, ainsi que la maîtrise de la sécurité de leur chaîne d&apos;approvisionnement (art. 21). Le règlement DORA exige du secteur financier des politiques de sauvegarde et des procédures de restauration testées (art. 11 et 12). Pour ces organisations, un contrat d&apos;hébergement silencieux sur la localisation des copies ou sur les tests de restauration n&apos;est plus seulement un risque commercial : c&apos;est un écart que l&apos;autorité de contrôle relèvera.</p>

      {/* ===== 07 ===== */}
      <h2 id="sept-clauses" data-toc="Sept clauses à relire avant de signer"><Link href={CONTRATS}>Sept clauses à relire avant de signer</Link></h2>
      <ol className={s.clauses}>
        <li><strong>Localisation des sauvegardes.</strong> Site, bâtiment, distance minimale, nombre de copies, existence d&apos;une copie déconnectée ou immuable. Écrire « géographiquement distant » si c&apos;est ce qui est attendu.</li>
        <li><strong>Tests de restauration.</strong> Fréquence, procès-verbal remis au client, objectifs chiffrés de durée de reprise (RTO) et de perte de données admissible (RPO).</li>
        <li><strong>Redondance.</strong> Schéma d&apos;architecture annexé au contrat, chemins physiques distincts, droit d&apos;audit, tests de bascule documentés.</li>
        <li><strong>Responsabilité.</strong> Plafond proportionné à la valeur des données confiées ; liste des dommages exclus relue ligne à ligne ; articulation entre crédits de service et indemnisation.</li>
        <li><strong>Force majeure.</strong> Liste fermée, excluant les événements inhérents à l&apos;activité : incendie du site, cyberattaque, défaillance d&apos;un sous-traitant.</li>
        <li><strong>Dépendances hors Union européenne.</strong> Sous-traitants identifiés, information préalable en cas de changement, préavis et export des données en cas de suspension imposée par une autorité étrangère.</li>
        <li><strong>Réversibilité.</strong> Format de restitution, délai, assistance, prix, maintien du service pendant la transition.</li>
      </ol>

      {/* ===== 08 ===== */}
      <h2 id="quarante-huit-heures">Après le sinistre : les premières quarante-huit heures</h2>
      <p>Faire constater l&apos;état du service et l&apos;indisponibilité des données par un commissaire de justice. Conserver les échanges avec le prestataire et exiger la communication des journaux. Mettre en demeure de restituer les données et les sauvegardes. Saisir le juge des référés si le prestataire retient les données ou si des éléments de preuve risquent de disparaître. Chaque jour perdu affaiblit la reconstitution des faits.</p>
    </ArticleLayout>
  );
}
