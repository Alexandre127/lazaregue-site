import Link from "next/link";
import styles from "../_components/article/article.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import { metaArticle } from "../data/meta";

// Titre, description, chapô, date, « L'essentiel » et questions fréquentes : registre data/articles.ts.
const SLUG = "osint-definition-preuve";
const CYBERCRIMINALITE = "/nos-domaines/cybercriminalite";
const RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const ESCROQUERIE = "/nos-domaines/escroquerie-fraude-bancaire";

export const metadata = metaArticle(SLUG);

export default function Page() {
  const pied = (
    <div className={styles.sources}>
      <p className={styles.label}>Sources et mise à jour</p>
      <p className={styles.srcgrp}><b>Textes.</b> Code civil, articles 1366 et 1382 ; code de procédure pénale, article 427 ; règlement général sur la protection des données (RGPD), article 15.</p>
      <p className={styles.srcgrp}><b>Jurisprudence.</b> Cass. crim., 30 avril 2024, n° 23-80.962 ; Cass. ass. plén., 22 décembre 2023.</p>
      <p className={styles.meta}>Dernière mise à jour : octobre 2026</p>
    </div>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied}>
          {/* ===== Définition ===== */}
          <h2 id="definition">OSINT : définition</h2>
          <p>OSINT est l&apos;acronyme anglais d&apos;<em>Open Source Intelligence</em>. En français, on parle de recherche ou de renseignement en sources ouvertes (ROSO).</p>
          <p>Une source ouverte est une information que chacun peut consulter sans contourner aucune protection : un article de presse, une publication sur un réseau social, une archive en ligne, un registre public, une photographie publiée, les métadonnées d&apos;un fichier diffusé.</p>
          <p>L&apos;OSINT ne se réduit pas à la recherche. Sa valeur tient à la méthode : collecter, dater, conserver, puis rapprocher des informations dispersées pour en tirer ce qu&apos;aucune ne dit seule.</p>

          {/* ===== Usages ===== */}
          <h2 id="usages">Qui utilise l&apos;OSINT ?</h2>
          <p>Née dans le renseignement militaire, la méthode est aujourd&apos;hui d&apos;usage courant :</p>
          <ul className={styles.bullets}>
            <li><strong>les services d&apos;enquête et les juridictions</strong>, pour identifier l&apos;auteur d&apos;un message, retracer un flux financier ou vérifier un alibi ;</li>
            <li><strong>les journalistes</strong>, pour authentifier une image, géolocaliser une vidéo ou attribuer des propos ;</li>
            <li><strong>les entreprises</strong>, pour instruire une fraude interne, documenter une concurrence déloyale ou vérifier un partenaire avant une opération ;</li>
            <li><strong>les victimes</strong>, pour identifier l&apos;auteur d&apos;une <Link href={ESCROQUERIE}>escroquerie</Link>, d&apos;un faux avis ou d&apos;un harcèlement en ligne ;</li>
            <li><strong>les avocats</strong>, pour constituer un dossier de preuve ou contester celui de l&apos;adversaire.</li>
          </ul>

          {/* ===== Exemple ===== */}
          <h2 id="exemple">Un exemple : l&apos;affaire des messages attribués à Jordan Bardella</h2>
          <p>En septembre et octobre 2026, Mediapart a attribué au président du Rassemblement national des messages antisémites échangés en 2013 sur Messenger. Contestés par l&apos;intéressé, ces messages ont été rattachés à lui par un recoupement typique de l&apos;OSINT.</p>
          <ul className={styles.bullets}>
            <li><strong>La conversation</strong> provient d&apos;un export obtenu auprès de Meta par l&apos;un des interlocuteurs, au titre du droit d&apos;accès prévu par le RGPD.</li>
            <li><strong>Un tweet public</strong> publié à 22 h 50 et un message privé envoyé à 22 h 52 relaient la même information, dans les mêmes termes et avec la même faute d&apos;orthographe.</li>
            <li><strong>Des formules et tics d&apos;écriture</strong> se retrouvent à l&apos;identique dans les deux espaces.</li>
            <li><strong>Des détails biographiques</strong> figurant dans la conversation n&apos;ont été rendus publics que des années plus tard.</li>
            <li><strong>Des témoins</strong> qui échangeaient avec lui à l&apos;époque affirment qu&apos;il restait maître de son compte.</li>
          </ul>
          <p>L&apos;affaire illustre la question centrale de toute preuve numérique : établir qu&apos;un message provient d&apos;un compte est une chose, établir qui tenait le clavier en est une autre.</p>

          {/* ===== Valeur de preuve ===== */}
          <h2 id="preuve">Quelle valeur de preuve devant un juge ?</h2>
          <h3>La preuve par faisceau d&apos;indices</h3>
          <p>Un élément issu de sources ouvertes prouve rarement quelque chose à lui seul. Une faute d&apos;orthographe peut être partagée, un détail biographique peut avoir circulé, un compte peut avoir été usurpé.</p>
          <p>Le droit admet pourtant depuis longtemps la preuve par indices. En matière civile, l&apos;article 1382 du code civil permet au juge de se fonder sur des présomptions « graves, précises et concordantes ». En matière pénale, la preuve est libre (article 427 du code de procédure pénale) : le juge forme son intime conviction à partir des éléments débattus devant lui.</p>
          <p>Ce qui emporte la conviction n&apos;est pas le nombre des indices, mais leur convergence. Une démonstration solide envisage les explications concurrentes (piratage, coïncidence, montage) et les écarte une à une.</p>

          <h3>Authenticité et imputabilité</h3>
          <p>Deux questions distinctes se posent :</p>
          <ol className={styles.steps}>
            <li><strong>L&apos;authenticité</strong> : le document est-il intact ? Un export obtenu directement auprès de la plateforme est plus difficile à contester qu&apos;une capture d&apos;écran. Le code civil exige, pour l&apos;écrit électronique, que son auteur puisse être identifié et que son intégrité soit garantie (article 1366).</li>
            <li><strong>L&apos;imputabilité</strong> : qui en est l&apos;auteur ? C&apos;est le terrain propre de l&apos;OSINT, qui rattache un compte à une personne par recoupement.</li>
          </ol>

          <h3>Capture d&apos;écran et constat de commissaire de justice</h3>
          <p>Une capture d&apos;écran est recevable mais fragile : elle se modifie facilement et ne dit rien de sa source. Le constat dressé par un commissaire de justice (anciennement huissier) fige ce qui était visible à une date donnée et selon un protocole vérifiable. Il renforce l&apos;authenticité de ce qui est constaté ; il ne dit pas qui a écrit.</p>

          {/* ===== Interdits ===== */}
          <h2 id="interdits">Ce que le droit interdit</h2>
          <h3>Une information publique n&apos;est pas librement exploitable</h3>
          <p>Une donnée accessible en ligne reste une donnée personnelle. Sa collecte et son traitement sont soumis au <Link href={RGPD}>RGPD</Link>.</p>
          <p>Dans l&apos;affaire de l&apos;espionnage de salariés par Ikea, la Cour de cassation a jugé que la collecte de données, même accessibles sur internet, réalisée à l&apos;insu des personnes pour constituer des fiches sur elles, constitue une collecte déloyale pénalement sanctionnée (Cass. crim., 30 avril 2024, n° 23-80.962).</p>

          <h3>Rechercher une personne : où passe la limite ?</h3>
          <p>Vérifier l&apos;identité d&apos;un escroc ou documenter les publications d&apos;un auteur de diffamation relève d&apos;un intérêt légitime. Constituer un profil détaillé d&apos;une personne, la surveiller ou exposer son adresse (doxing) peut en revanche engager la responsabilité civile et pénale de celui qui le fait.</p>
          <div className={styles.prat}>
            <span className={styles.label}>En pratique</span>
            <p>La règle pratique : collecter seulement ce qui est nécessaire au but poursuivi, et pouvoir justifier ce but.</p>
          </div>

          <h3>La loyauté de la preuve</h3>
          <p>En matière civile, une preuve obtenue de manière déloyale n&apos;est plus automatiquement écartée. Depuis un arrêt d&apos;assemblée plénière du 22 décembre 2023, le juge peut l&apos;admettre si elle est indispensable à l&apos;exercice du droit à la preuve et si l&apos;atteinte portée aux droits de l&apos;adversaire reste proportionnée. Le risque de rejet subsiste : une collecte propre reste la meilleure garantie.</p>

          <h3>Le cas de la presse</h3>
          <p>Les journalistes bénéficient d&apos;un régime adapté : le RGPD prévoit des dérogations pour l&apos;activité journalistique, à condition de respecter la déontologie professionnelle et de servir un débat d&apos;intérêt général.</p>

          {/* ===== Limites ===== */}
          <h2 id="limites">Ce que l&apos;OSINT ne peut pas atteindre</h2>
          <p>Les éléments décisifs se trouvent souvent hors des sources ouvertes : l&apos;adresse électronique et le numéro de téléphone rattachés à un compte, l&apos;historique de ses connexions et les adresses IP. Ces données sont détenues par les plateformes.</p>
          <p>Deux voies permettent d&apos;y accéder :</p>
          <ul className={styles.bullets}>
            <li><strong>la personne concernée elle-même</strong>, en exerçant son droit d&apos;accès auprès de la plateforme (article 15 du RGPD) ;</li>
            <li><strong>l&apos;autorité judiciaire</strong>, par réquisition, y compris auprès d&apos;opérateurs établis dans un autre État membre de l&apos;Union.</li>
          </ul>
          <p>L&apos;OSINT prépare le terrain : elle permet de rassembler suffisamment d&apos;indices pour convaincre un enquêteur ou un juge d&apos;aller chercher ces données.</p>

          {/* ===== Bons réflexes ===== */}
          <h2 id="reflexes">Constituer une preuve en sources ouvertes : les bons réflexes</h2>
          <ol className={styles.steps}>
            <li><strong>Conserver immédiatement.</strong> Un contenu en ligne peut disparaître à tout moment. Captures, liens, dates et heures doivent être relevés dès la découverte.</li>
            <li><strong>Privilégier les sources primaires.</strong> Un export de plateforme ou un fichier d&apos;origine avec ses métadonnées vaut mieux qu&apos;une capture.</li>
            <li><strong>Faire constater ce qui compte.</strong> Pour les éléments essentiels, un constat de commissaire de justice sécurise la date et le contenu.</li>
            <li><strong>Documenter la méthode.</strong> Chaque recherche doit pouvoir être refaite par un tiers : sources consultées, dates, étapes du raisonnement.</li>
            <li><strong>Tester les hypothèses contraires.</strong> Usurpation, coïncidence, manipulation : la démonstration doit les écarter explicitement.</li>
            <li><strong>Rester dans le cadre légal.</strong> Collecter uniquement ce qui est nécessaire, ne contourner aucune protection, ne pas usurper d&apos;identité pour accéder à un contenu.</li>
          </ol>

          {/* ===== Pour aller plus loin (maillage interne) ===== */}
          <h2 id="loin">Pour aller plus loin</h2>
          <ul className={styles.bullets}>
            <li><Link href={CYBERCRIMINALITE}>Cybercriminalité et cyberattaques</Link></li>
            <li><Link href={RGPD}>RGPD et données personnelles</Link></li>
            <li><Link href={ESCROQUERIE}>Fraude bancaire et escroquerie</Link></li>
          </ul>

          {/* ===== Clôture ===== */}
          <div className={styles.closing}>
            Le cabinet accompagne entreprises et particuliers dans la constitution et la contestation de preuves numériques, avec l&apos;appui d&apos;intervenants techniques.
          </div>

    </ArticleLayout>
  );
}
