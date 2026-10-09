import Link from "next/link";
import styles from "../_components/article/article.module.css";
import ArticleLayout from "../_components/article/ArticleLayout";
import DiagnosticAvisGoogle from "../_components/diagnostic/DiagnosticAvisGoogle";
import { metaArticle } from "../data/meta";
import { HORS_PRODUCTION } from "../data/environnement";

// Titre, description, chapô, date et questions fréquentes : registre data/articles.ts.
const SLUG = "supprimer-faux-avis-google";
const CAS_CLIENT = "/cas-clients/avis-google-authentique-informations-confidentielles";
const EXT = { target: "_blank", rel: "noopener" } as const;

export const metadata = metaArticle(SLUG);

export default function Page() {
  const pied = (
    <div className={styles.sources}>
      <p className={styles.label}>Sources</p>
      <p className={styles.srcgrp}>
        <a href="https://www.legifrance.gouv.fr/juri/id/JURITEXT000051283974" {...EXT}>Cass. 1re civ., 26 févr. 2025, n° 23-16.762</a> ·{" "}
        <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043969099/2026-03-25" {...EXT}>Article 6-3 de la LCEN</a> ·{" "}
        CA Chambéry, 22 mai 2025, RG n° 22/01814 ·{" "}
        <a href="https://ods.adrcenter.com/en/regolamento.html" {...EXT}>Règlement de procédure d&apos;ADR Center</a> ·{" "}
        <a href="https://support.google.com/contributionpolicy/answer/7400114?hl=fr" {...EXT}>Règles de Google sur les contenus interdits</a> · A. Lecourt, obs. sous TJ Paris, 22 juin 2022, Dalloz IP/IT 2022. 574
      </p>
    </div>
  );

  /* Diagnostic (version courte) en fin d'article : pleine largeur, à la place
     de l'appel final par défaut (le diagnostic porte son propre formulaire). */
  const after = (
    <section className={`${styles.sec} ${styles.ghost}`} id="diagnostic" aria-labelledby="h-diagnostic" style={{ scrollMarginTop: "var(--header-h-compact)" }}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <h2 className={styles.h2} id="h-diagnostic">Votre avis peut-il être retiré&nbsp;?</h2>
          <p className={styles.lead}>Six questions, deux minutes. Le résultat indique la qualification probable de l&apos;avis, la voie adaptée et le délai qui vous reste pour agir.</p>
        </div>
        <DiagnosticAvisGoogle variant="court" montrerNonVerifiees={HORS_PRODUCTION} />
      </div>
    </section>
  );

  return (
    <ArticleLayout slug={SLUG} pied={pied} after={after} mobileCta={{ href: "#diagnostic", label: "Faire le test" }}>
          {/* Encart après le chapeau : renvoi vers le diagnostic en bas de page. */}
          <aside className={styles.ctaIn}>
            <p className={styles.ctaInTitre}>Votre avis peut-il être retiré&nbsp;?</p>
            <p className={styles.ctaInTx}>Faites le test en deux minutes.</p>
            <a className={styles.btn} href="#diagnostic">Faire le test</a>
          </aside>

          <h2 id="situation">Quelle est votre situation&nbsp;?</h2>
          <table className={styles.voies}>
            <thead>
              <tr><th scope="col">Situation</th><th scope="col">Ce qui est possible</th><th scope="col">Voie principale</th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" data-l="Situation">Une société est visée par un avis publié sous pseudonyme, par une personne qui n&apos;a jamais été cliente</th>
                <td data-l="Ce qui est possible">Retrait de l&apos;avis pour dénigrement ; identification de l&apos;auteur seulement si l&apos;avis est diffamatoire ou injurieux</td>
                <td data-l="Voie principale">Signalement motivé, réclamation, organisme de règlement extrajudiciaire</td>
              </tr>
              <tr>
                <th scope="row" data-l="Situation">Un professionnel exerçant en nom propre (médecin, avocat, artisan) est visé</th>
                <td data-l="Ce qui est possible">Les mêmes voies, et en outre le droit d&apos;opposition prévu par le RGPD</td>
                <td data-l="Voie principale">Signalement motivé ; en dernier recours, suppression de la fiche</td>
              </tr>
              <tr>
                <th scope="row" data-l="Situation">Plusieurs avis négatifs sont publiés en série, par un concurrent ou une personne en conflit avec l&apos;établissement</th>
                <td data-l="Ce qui est possible">Retrait, identification si une infraction est caractérisée, dommages et intérêts</td>
                <td data-l="Voie principale">Signalement, puis action en justice</td>
              </tr>
              <tr>
                <th scope="row" data-l="Situation">Un véritable client tient des propos excessifs</th>
                <td data-l="Ce qui est possible">Retrait seulement si les propos sont diffamatoires, injurieux ou dénigrants</td>
                <td data-l="Voie principale">Signalement motivé ; à défaut, réponse publique mesurée</td>
              </tr>
              <tr>
                <th scope="row" data-l="Situation">Un véritable client divulgue des informations confidentielles ou personnelles</th>
                <td data-l="Ce qui est possible">Retrait possible, même si l&apos;avis est authentique</td>
                <td data-l="Voie principale">Signalement motivé fondé sur la protection de ces informations</td>
              </tr>
            </tbody>
          </table>

          <h2 id="retirable">Ce qui peut être retiré, et ce qui ne peut pas l&apos;être</h2>
          <p>La critique d&apos;une expérience réelle relève de la liberté d&apos;expression, même lorsqu&apos;elle est sévère. Cinq cas justifient en revanche le retrait :</p>
          <ul className={styles.bullets}>
            <li><strong>le faux avis</strong> : l&apos;auteur n&apos;a jamais été client ;</li>
            <li><strong>le conflit d&apos;intérêts</strong> : l&apos;avis émane d&apos;un concurrent, d&apos;un ancien salarié ou d&apos;un proche ;</li>
            <li><strong>le contenu illicite</strong> : diffamation, injure, dénigrement ;</li>
            <li><strong>la divulgation d&apos;informations protégées</strong> : informations confidentielles ou données personnelles, même dans un avis authentique ;</li>
            <li><strong>l&apos;engagement artificiel</strong> : avis en série, comptes multiples, contenu sans rapport avec l&apos;établissement.</li>
          </ul>
          <p>Les règles de Google l&apos;énoncent d&apos;ailleurs expressément : les contributions doivent refléter une expérience réellement vécue.</p>

          {/* Encart cas client. */}
          <div className={styles.vig}>
            <span className={styles.label}>Cas client</span>
            <p>Un avis authentique d&apos;un ancien client, conforme aux règles de Google, révélait des informations commerciales confidentielles. Le cabinet a obtenu son retrait sans contester l&apos;expérience du client. <Link href={CAS_CLIENT}>Lire le cas client →</Link></p>
          </div>

          <h2 id="qualifier">Qualifier l&apos;avis : dénigrement, diffamation ou injure</h2>
          <p>La qualification commande la procédure et, surtout, le délai pour agir.</p>
          <table className={styles.voies}>
            <thead>
              <tr><th scope="col">Type d&apos;avis</th><th scope="col">Exemple</th><th scope="col">Fondement</th><th scope="col">Délai pour agir en justice</th></tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" data-l="Type d'avis">Critique d&apos;une expérience réelle</th>
                <td data-l="Exemple">« Attente trop longue, accueil froid »</td>
                <td data-l="Fondement">Liberté d&apos;expression</td>
                <td data-l="Délai pour agir en justice">Aucune action</td>
              </tr>
              <tr>
                <th scope="row" data-l="Type d'avis">Dénigrement, y compris le faux avis</th>
                <td data-l="Exemple">« Travail bâclé, à fuir », publié par un non-client</td>
                <td data-l="Fondement">Article 1240 du Code civil</td>
                <td data-l="Délai pour agir en justice">5 ans</td>
              </tr>
              <tr>
                <th scope="row" data-l="Type d'avis">Diffamation</th>
                <td data-l="Exemple">« Cette société facture des interventions jamais réalisées »</td>
                <td data-l="Fondement">Loi du 29 juillet 1881, art. 29</td>
                <td data-l="Délai pour agir en justice">3 mois après la publication</td>
              </tr>
              <tr>
                <th scope="row" data-l="Type d'avis">Injure</th>
                <td data-l="Exemple">Termes outrageants sans fait précis</td>
                <td data-l="Fondement">Loi du 29 juillet 1881, art. 29, al. 2</td>
                <td data-l="Délai pour agir en justice">3 mois après la publication</td>
              </tr>
            </tbody>
          </table>
          <p>La diffamation impute un fait précis qui porte atteinte à l&apos;honneur. Le dénigrement jette le discrédit sur les produits ou les services. Pour l&apos;apprécier, les juges vérifient trois critères : un sujet d&apos;intérêt général, une base factuelle suffisante et une expression mesurée. Un avis publié par une personne qui n&apos;a jamais été cliente manque, par définition, de base factuelle.</p>
          <p>Le pseudonyme, à lui seul, ne suffit pas : l&apos;anonymat est licite. Il faut des indices sérieux de faux avis — aucune trace de l&apos;auteur ni des faits dans les fichiers de l&apos;établissement, un profil sans historique, des avis en série, des détails incompatibles avec l&apos;activité.</p>

          <h2 id="fiche">Retirer l&apos;avis ou supprimer la fiche&nbsp;?</h2>
          <p>Pour une personne exerçant en nom propre, la fiche Google et les avis qui y sont attachés constituent un traitement de données personnelles. Par un arrêt du 22 mai 2025 (RG n° 22/01814), la cour d&apos;appel de Chambéry a confirmé la suppression de la fiche d&apos;une professionnelle de santé, créée sans son consentement, faute pour Google de justifier d&apos;un intérêt légitime. Elle a alloué 10 000 € de dommages et intérêts. D&apos;autres juridictions, notamment à Paris, ont refusé la suppression au nom de l&apos;information du public.</p>
          <p>Cette voie conduit à la disparition de la fiche entière, avec l&apos;ensemble de ses avis, y compris les avis positifs. Elle ne convient qu&apos;au professionnel qui ne souhaite plus figurer sur Google Maps. Un professionnel qui a lui-même revendiqué et animé sa fiche se trouve, en outre, dans une situation différente de celle jugée à Chambéry. Pour tous les autres, l&apos;objectif reste le retrait de l&apos;avis litigieux.</p>
          <p>Ce levier ne bénéficie pas aux sociétés : le RGPD ne protège que les personnes physiques.</p>

          <h2 id="procedure">La procédure, étape par étape</h2>

          <h3>Étape 1 — Conserver la preuve</h3>
          <ol className={styles.steps}>
            <li>Faire une capture complète de l&apos;avis : texte, date, nom du profil, lien direct vers l&apos;avis.</li>
            <li>Rechercher l&apos;auteur dans les fichiers de l&apos;établissement (facturation, réservations, agenda) sur la période concernée, et consigner cette recherche dans une attestation.</li>
            <li>Relever les indices : profil récent, avis unique, plusieurs avis le même jour, lien avec un litige en cours.</li>
            <li>Conserver les statistiques de la fiche et du site (visites, appels, demandes de devis) : elles permettront de chiffrer le préjudice.</li>
            <li>Lorsque l&apos;enjeu le justifie, faire dresser un constat par un commissaire de justice.</li>
          </ol>
          <p>Les professionnels tenus au secret, comme les médecins ou les avocats, ne répondent jamais publiquement qu&apos;une personne n&apos;est pas leur patient ou leur client. Leur argumentation porte sur les faits décrits dans l&apos;avis, non sur la personne qui l&apos;a écrit.</p>

          <h3>Étape 2 — Signaler l&apos;avis à Google</h3>
          <p>Le bouton « Signaler » de la fiche donne lieu à un traitement largement automatisé. Le formulaire de signalement d&apos;un contenu illégal produit un effet juridique : il vaut notification au sens de l&apos;article 16 du DSA. Il doit contenir une explication motivée de l&apos;illégalité, l&apos;adresse exacte de l&apos;avis, le nom et l&apos;adresse électronique du demandeur, et une déclaration de bonne foi.</p>
          <p>Une fois informé d&apos;un contenu manifestement illicite, Google ne peut plus se retrancher derrière son statut d&apos;hébergeur s&apos;il le laisse en ligne. La notification doit donc être rédigée comme un écrit juridique : qualification, fondement, pièces.</p>
          <p>Liens : <a href="https://support.google.com/business/workflow/9945796?hl=fr" {...EXT}>Outil de gestion des avis</a> · <a href="https://support.google.com/legal/troubleshooter/1114905?hl=fr" {...EXT}>Signaler un contenu pour des raisons juridiques</a></p>

          <h3>Étape 3 — Contester un refus auprès de Google</h3>
          <p>En cas de refus, l&apos;article 20 du DSA ouvre une réclamation gratuite, pendant au moins six mois après la décision. Cette réclamation ne peut pas être tranchée par des moyens exclusivement automatisés. Elle se dépose en ligne, depuis l&apos;outil de gestion des avis (« Faire appel pour les avis éligibles ») ou par le lien figurant dans l&apos;e-mail de décision. Un seul appel est possible par signalement : c&apos;est le moment de verser un élément nouveau, comme l&apos;attestation de recherche dans les fichiers de l&apos;établissement.</p>
          <p>Lien : <a href="https://support.google.com/business/answer/4596773?hl=fr" {...EXT}>Faire appel d&apos;une décision sur un avis</a></p>

          <h3>Étape 4 — Saisir un organisme de règlement extrajudiciaire</h3>
          <p>L&apos;article 21 du DSA permet de soumettre le refus de Google à un organisme indépendant, certifié par un régulateur européen. ADR Center, certifié par l&apos;autorité italienne des communications (AGCOM), traite les litiges relatifs à Google Maps, en français.</p>
          <ul className={styles.bullets}>
            <li><strong>Coût</strong> : la procédure est gratuite pour le demandeur, les frais étant supportés par la plateforme.</li>
            <li><strong>Délai</strong> : recevabilité en 10 jours, décision dans les 90 jours, prolongeable pour les dossiers complexes.</li>
            <li><strong>Conditions</strong> : avoir fait appel auprès de Google, agir dans les douze mois, et ne pas avoir engagé d&apos;action en justice sur le fond.</li>
            <li><strong>Portée</strong> : la décision est motivée, mais elle ne s&apos;impose pas à Google.</li>
          </ul>
          <p>Seules les pièces jointes à la saisine sont prises en compte : le dossier doit être complet dès le départ.</p>
          <p>Liens : <a href="https://ods.adrcenter.com/fr/platform/google-maps.html" {...EXT}>ADR Center et Google Maps</a> · <a href="https://ods.adrcenter.com/fr/dispute/start" {...EXT}>Ouvrir un dossier</a></p>

          <h3>Étape 5 — Identifier l&apos;auteur d&apos;un avis anonyme</h3>
          <p>Google ne révèle pas spontanément l&apos;identité d&apos;un auteur. Le juge peut l&apos;y contraindre, à une condition décisive : l&apos;avis doit pouvoir recevoir une qualification pénale, comme la diffamation ou l&apos;injure publiques. Depuis le décret n° 2021-1362 du 20 octobre 2021, les données de connexion ne sont conservées que pour les besoins de la procédure pénale et de la sécurité publique ; une demande fondée sur un simple dénigrement ne peut plus aboutir.</p>
          <p>Lorsque l&apos;avis est diffamatoire, la demande est fondée sur l&apos;article 145 du Code de procédure civile. Dans une affaire de vidéos diffamatoires, le tribunal judiciaire de Paris a ainsi ordonné à Google Ireland de communiquer les données d&apos;identification et de connexion de leurs auteurs, mesure que la Cour de cassation a laissée intacte (Cass. 1re civ., 26 févr. 2025, n° 23-16.762). Les adresses IP ne sont conservées qu&apos;un an, et l&apos;identification est refusée dès que la diffamation est prescrite : il faut agir sans attendre.</p>

          <h3>Étape 6 — Saisir le juge</h3>
          <p><strong>Contre Google, sans attendre l&apos;identification de l&apos;auteur.</strong> L&apos;article 6-3 de la loi pour la confiance dans l&apos;économie numérique (LCEN) permet au président du tribunal judiciaire, statuant selon la procédure accélérée au fond, de prescrire à toute personne susceptible d&apos;y contribuer les mesures propres à faire cesser un dommage causé par un contenu en ligne. Il n&apos;est pas nécessaire d&apos;assigner d&apos;abord l&apos;auteur de l&apos;avis.</p>
          <p>La Cour de cassation encadre toutefois cette voie (Cass. 1re civ., 26 févr. 2025, n° 23-16.762). En l&apos;absence de débat avec l&apos;auteur, le juge doit constater le caractère manifestement illicite des propos ; ce caractère « n&apos;est pas établi par la seule communication de propos portant atteinte à l&apos;honneur », l&apos;auteur pouvant justifier de la vérité des faits ou de sa bonne foi. Mais lorsque l&apos;auteur ne peut être identifié, il incombe au juge d&apos;apprécier si la suppression est proportionnée à l&apos;atteinte subie. Plus l&apos;imputation est précise et manifestement fausse, plus la demande est solide.</p>
          <p><strong>Contre l&apos;auteur identifié.</strong> L&apos;action en dénigrement se prescrit par cinq ans ; l&apos;action en diffamation ou en injure, par trois mois à compter de la publication. Elle permet d&apos;obtenir, outre le retrait, des dommages et intérêts.</p>
          <p><strong>Par prudence</strong>, toute action fondée sur une diffamation, y compris contre Google, est engagée dans les trois mois et rédigée selon le formalisme de la loi de 1881, la question de son application à l&apos;action contre l&apos;hébergeur n&apos;étant pas définitivement tranchée.</p>

          <h2 id="delais">Les délais à retenir</h2>
          <table className={styles.voies}>
            <thead>
              <tr><th scope="col">Démarche</th><th scope="col">Délai</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row" data-l="Démarche">Action en diffamation ou en injure</th><td data-l="Délai">3 mois à compter de la publication</td></tr>
              <tr><th scope="row" data-l="Démarche">Conservation des adresses IP par Google</th><td data-l="Délai">1 an</td></tr>
              <tr><th scope="row" data-l="Démarche">Réclamation auprès de Google</th><td data-l="Délai">Au moins 6 mois après sa décision</td></tr>
              <tr><th scope="row" data-l="Démarche">Saisine d&apos;ADR Center</th><td data-l="Délai">12 mois à compter des faits</td></tr>
              <tr><th scope="row" data-l="Démarche">Décision d&apos;ADR Center</th><td data-l="Délai">90 jours, prolongeables</td></tr>
              <tr><th scope="row" data-l="Démarche">Action en dénigrement</th><td data-l="Délai">5 ans</td></tr>
            </tbody>
          </table>
    </ArticleLayout>
  );
}
