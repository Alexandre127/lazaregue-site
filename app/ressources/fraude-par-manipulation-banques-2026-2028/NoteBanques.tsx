import Link from "next/link";
import PdfLink from "@/components/observatoire/PdfLink";
import AbonnementForm from "@/components/observatoire/AbonnementForm";
import styles from "./note.module.css";

/**
 * Note d'analyse « Fraude par manipulation : ce qui change pour les banques
 * entre 2026 et 2028 ». Texte repris de la maquette validée ; composants, tokens
 * et classes du site ; header/footer via le layout. Téléchargement du PDF libre.
 *
 * Réserves signalées au cabinet (voir compte rendu) : les références d'articles
 * de loi figurent dans le corps (texte de la maquette conservé tel quel) ; les
 * « dix questions » sont en « nous » = voix de la banque qui s'interroge.
 */

const PDF = "/documents/lazaregue-note-fraude-manipulation-banques-2026-2028.pdf";
const OFFRE = "/securite-des-paiements";

function IconTelecharger() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12M6 11l6 6 6-6M4 21h16" />
    </svg>
  );
}

export default function NoteBanques() {
  return (
    <main id="contenu" className={styles.page}>
      {/* Hero */}
      <section className={`${styles.hero} ${styles.navy}`}>
        <div className={styles.inner}>
          <p className={`${styles.surtitre} ${styles.surtitreDark}`}>
            Note d&rsquo;analyse · Novembre 2026 · Observatoire des obligations techniques des banques
          </p>
          <h1 className={styles.h1}>
            Fraude par manipulation : ce qui change pour les banques entre 2026 et 2028
          </h1>
          <p className={styles.chapo}>
            Un arrêt de la Cour de justice, trois arrêts de la Cour de cassation et un règlement européen en
            voie d&rsquo;adoption déplacent la charge de la fraude vers les établissements. La capacité à
            prouver la conformité des dispositifs de sécurité devient déterminante.
          </p>
          <p className={styles.public}>
            À l&rsquo;attention des directions générales, juridiques, conformité, risques et sécurité.
          </p>
          <div className={styles.heroBtns}>
            <PdfLink href={PDF} className={`btn btn-primary ${styles.iconBtn}`}>
              <IconTelecharger />
              Télécharger la note (PDF, 5 pages)
            </PdfLink>
            <a href="#essentiel" className="btn btn-ghost">
              Lire l&rsquo;essentiel
            </a>
          </div>
        </div>
      </section>

      {/* Quatre chiffres sourcés */}
      <section className={styles.stats}>
        <div className={styles.inner}>
          <div className={styles.stat}>
            <span className={styles.statNum}>516 M€</span>
            <span className={styles.statLabel}>de fraude par manipulation en 2025, en hausse de 34 %</span>
            <span className={styles.statSrc}>OSMP, rapport 2025</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>41,6 %</span>
            <span className={styles.statLabel}>de la fraude aux moyens de paiement en France</span>
            <span className={styles.statSrc}>OSMP, rapport 2025</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>62 %</span>
            <span className={styles.statLabel}>
              du montant des opérations frauduleuses remboursé en 2024, taux en recul
            </span>
            <span className={styles.statSrc}>OSMP, rapport 2024, p. 30 à 34</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>20 %</span>
            <span className={styles.statLabel}>
              seulement des virements exécutés sans authentification forte remboursés
            </span>
            <span className={styles.statSrc}>OSMP, rapport 2024</span>
          </div>
        </div>
      </section>

      {/* L'essentiel */}
      <section id="essentiel" className={`${styles.sec} ${styles.off}`}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.splitHead}>
            <p className={styles.surtitre}>L&rsquo;essentiel</p>
            <h2 className={styles.h2}>Le risque se déplace vers les établissements</h2>
          </div>
          <ol className={`${styles.ol} ${styles.olEssentiel} ${styles.splitBody}`}>
            <li>
              <span className={styles.numMono}>01</span>
              <span>
                La fraude par manipulation, dans laquelle le client est amené à valider lui-même
                l&rsquo;opération, a atteint 516 millions d&rsquo;euros en 2025, soit 41,6 % de la fraude aux
                moyens de paiement en France.
              </span>
            </li>
            <li>
              <span className={styles.numMono}>02</span>
              <span>
                Jusqu&rsquo;ici, la gestion des réclamations reposait largement sur la négligence grave du
                client, la validation par authentification forte valant souvent preuve de sa faute. La diligence
                technique de la banque était rarement examinée.
              </span>
            </li>
            <li>
              <span className={styles.numMono}>03</span>
              <span>
                Trois évolutions rompent cet équilibre : l&rsquo;arrêt de la CJUE du 15 octobre 2026, les
                exigences probatoires de la Cour de cassation et le futur règlement européen sur les services de
                paiement.
              </span>
            </li>
            <li>
              <span className={styles.numMono}>04</span>
              <span>
                Le risque se déplace vers les établissements, aux deux bouts de la chaîne du paiement. La
                capacité à prouver la conformité et le bon fonctionnement des dispositifs devient déterminante.
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* 1. Le point de départ */}
      <section className={styles.sec}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.splitHead}>
            <p className={styles.surtitre}>1. Le point de départ</p>
            <h2 className={styles.h2}>Un équilibre favorable aux banques, désormais fragile</h2>
          </div>
          <div className={`${styles.splitBody} ${styles.prose}`}>
            <p>
              Le droit en vigueur (directive (UE) 2015/2366, articles L. 133-18 à L. 133-24 du Code monétaire et
              financier, règlement délégué (UE) 2018/389) fait de la sécurité des paiements une obligation de la
              banque : authentification forte, surveillance des opérations, mesures de sécurité documentées,
              testées et auditées. En contrepartie, la banque doit rembourser toute opération que son client
              conteste avoir autorisée, sauf à prouver sa fraude ou sa négligence grave.
            </p>
            <p>
              En pratique, l&rsquo;exception est devenue l&rsquo;outil principal de gestion des réclamations.
              Devant le médiateur auprès de la Fédération bancaire française, 3,65 % des propositions de 2024 ont
              été entièrement favorables au consommateur ; le médiateur relève que, pour les opérations non
              autorisées, la vigilance de la banque ne peut être examinée qu&rsquo;en équité.
            </p>
            <p>
              Le régulateur a déjà relevé la fragilité de cet équilibre : une « non-conformité persistante » pour
              les virements exécutés sans authentification forte, trois établissements sur treize qui
              n&rsquo;exigent pas d&rsquo;authentification forte lors de l&rsquo;accès depuis un nouvel appareil,
              deux sur douze qui diffèrent le remboursement au-delà de huit semaines.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Trois ruptures */}
      <section id="ruptures" className={styles.ruptures}>
        <div className={styles.inner}>
          <div className={styles.headCol}>
            <p className={styles.surtitre}>2. Trois ruptures</p>
            <h2 className={styles.h2}>Ce qui a changé en 2026, et ce qui arrive</h2>
          </div>
          <div className={styles.grid3}>
            <article className={styles.rupture}>
              <p className={styles.ruptLabel}>CJUE · 15 OCT. 2026 · AFF. C-70/25</p>
              <h3 className={styles.ruptH3}>La Cour de justice impose de rembourser d&rsquo;abord</h3>
              <p className={styles.ruptText}>
                La banque ne peut plus refuser le remboursement immédiat d&rsquo;une opération non autorisée au
                motif d&rsquo;une négligence grave du payeur. Seul un soupçon de fraude du payeur, communiqué par
                écrit à l&rsquo;autorité nationale, l&rsquo;en dispense. La négligence grave ne se discute
                qu&rsquo;ensuite.
              </p>
              <p className={styles.ruptBox}>
                <strong>Ce que cela change.</strong> La charge du procès change de camp : la banque rembourse,
                puis engage elle-même le recouvrement si elle peut prouver la faute.
              </p>
            </article>

            <article className={styles.rupture}>
              <p className={styles.ruptLabel}>CASS. COM. · JUILL., SEPT. ET OCT. 2026</p>
              <h3 className={styles.ruptH3}>La Cour de cassation durcit les exigences de preuve</h3>
              <ul className={styles.ruptList}>
                <li>
                  <strong>1er juillet</strong> (n° 25-13.134) : les relevés d&rsquo;authentification ne suffisent
                  pas à présumer le consentement.
                </li>
                <li>
                  <strong>9 septembre</strong> (n° 25-15.225) : la preuve de l&rsquo;autorisation pèse sur le
                  prestataire.
                </li>
                <li>
                  <strong>8 octobre</strong> (n° 25-17.510) : la banque sortie de son propre cadre de sécurité ne
                  peut opposer la négligence grave.
                </li>
              </ul>
              <p className={styles.ruptBox}>
                <strong>Ce que cela change.</strong> Un journal d&rsquo;authentification ne suffit plus : il faut
                démontrer l&rsquo;absence de déficience technique au sens de l&rsquo;article L. 133-23.
              </p>
            </article>

            <article className={styles.rupture}>
              <p className={styles.ruptLabel}>PSR · CONSEIL DE L&rsquo;UE, DOC. 8221/26</p>
              <h3 className={styles.ruptH3}>Le futur règlement déplace la charge des pertes</h3>
              <ul className={styles.ruptList}>
                <li>
                  <strong>Art. 59</strong> : remboursement intégral de la fraude au faux conseiller bancaire.
                </li>
                <li>
                  <strong>Art. 83</strong> : surveillance avant exécution et avant mise à disposition des fonds.
                </li>
                <li>
                  <strong>Art. 69</strong> : la banque du bénéficiaire peut, et parfois doit, refuser les fonds
                  suspects.
                </li>
                <li>
                  <strong>Art. 58</strong> : responsabilité des prestataires techniques.
                </li>
              </ul>
              <p className={styles.ruptBox}>
                <strong>Ce que cela change.</strong> La banque qui reçoit les fonds devient un acteur obligé de
                la prévention. Application attendue vers 2028.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Conséquences par fonction */}
      <section className={`${styles.conseq} ${styles.off}`}>
        <div className={styles.inner}>
          <div className={styles.headCol}>
            <p className={styles.surtitre}>3. Conséquences par fonction</p>
            <h2 className={styles.h2}>Qui doit faire quoi</h2>
          </div>
          <div className={styles.grid4}>
            <div className={styles.fonction}>
              <h3 className={styles.fonctionH3}>Réclamations et relation client</h3>
              <ul className={styles.fonctionList}>
                <li>
                  Rembourser au plus tard le jour ouvrable suivant, y compris lorsque la négligence grave est
                  envisagée.
                </li>
                <li>Fixer par écrit les critères de déclaration d&rsquo;un soupçon de fraude à l&rsquo;autorité.</li>
                <li>Constituer le dossier de preuve dès la réclamation.</li>
              </ul>
            </div>
            <div className={styles.fonction}>
              <h3 className={styles.fonctionH3}>Sécurité, DSI, lutte contre la fraude</h3>
              <ul className={styles.fonctionList}>
                <li>Vérifier l&rsquo;authentification forte lors de l&rsquo;enrôlement d&rsquo;un nouvel appareil.</li>
                <li>Évaluer les délais de sécurité, plafonds temporaires et rappels du client.</li>
                <li>Conserver les journaux et rapports d&rsquo;audit sous une forme exploitable en justice.</li>
              </ul>
            </div>
            <div className={styles.fonction}>
              <h3 className={styles.fonctionH3}>Conformité et entrée en relation</h3>
              <ul className={styles.fonctionList}>
                <li>Réexaminer la vérification d&rsquo;identité à distance et la détection des comptes rebonds.</li>
                <li>Intégrer le fichier national des comptes signalés (loi n° 2025-1058).</li>
                <li>Anticiper le règlement (UE) 2024/1624, applicable en juillet 2027.</li>
              </ul>
            </div>
            <div className={styles.fonction}>
              <h3 className={styles.fonctionH3}>Juridique et achats</h3>
              <ul className={styles.fonctionList}>
                <li>
                  Revoir les contrats des prestataires d&rsquo;authentification et de détection : accès aux
                  journaux, audit, garanties.
                </li>
                <li>Fonder l&rsquo;argumentaire contentieux sur la preuve de la conformité des dispositifs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dix questions pour le comité des risques */}
      <section id="questions" className={styles.sec}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div className={styles.splitHead}>
            <p className={styles.surtitre}>4. Pour le comité des risques</p>
            <h2 className={styles.h2}>Dix questions à poser maintenant</h2>
          </div>
          <ol className={`${styles.ol} ${styles.olQuestions} ${styles.splitBody}`}>
            <li>
              <span className={styles.numBebas}>01</span>
              <span>
                Pouvons-nous rembourser toute opération contestée au plus tard le jour ouvrable suivant, y
                compris lorsque nous soupçonnons une négligence grave ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>02</span>
              <span>
                Selon quels critères écrits déclarons-nous un soupçon de fraude du client à l&rsquo;autorité, et
                combien de fois l&rsquo;avons-nous fait ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>03</span>
              <span>
                Pouvons-nous produire en justice la preuve du bon fonctionnement de notre authentification forte
                pour une opération donnée, au-delà du seul journal de connexion ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>04</span>
              <span>
                Que se passe-t-il lorsqu&rsquo;un client active l&rsquo;application sur un nouveau téléphone, et
                combien de temps faut-il avant qu&rsquo;un virement important soit possible ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>05</span>
              <span>Quels contrôles s&rsquo;appliquent après l&rsquo;ajout d&rsquo;un nouveau bénéficiaire ?</span>
            </li>
            <li>
              <span className={styles.numBebas}>06</span>
              <span>
                Disposons-nous des rapports d&rsquo;audit de nos mesures de sécurité exigés par le règlement
                délégué, et sont-ils à jour ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>07</span>
              <span>
                Quel est notre taux de remboursement, en nombre et en montant, et comment se compare-t-il aux
                chiffres publiés par l&rsquo;Observatoire ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>08</span>
              <span>
                Combien de comptes ouverts chez nous ont servi à recevoir des fonds frauduleux, et nos contrôles
                à l&rsquo;ouverture les auraient-ils détectés ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>09</span>
              <span>
                Nos contrats avec les prestataires techniques nous garantissent-ils l&rsquo;accès aux preuves et
                un recours en cas de défaillance ?
              </span>
            </li>
            <li>
              <span className={styles.numBebas}>10</span>
              <span>
                Quel serait le coût, pour notre établissement, de l&rsquo;obligation de remboursement prévue par
                l&rsquo;article 59 du futur règlement, appliquée à nos données de fraude actuelles ?
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* 5. Calendrier */}
      <section id="calendrier" className={`${styles.calendrier} ${styles.navy}`}>
        <div className={styles.inner}>
          <div className={styles.headCol}>
            <p className={`${styles.surtitre} ${styles.surtitreDark}`}>5. Calendrier</p>
            <h2 className={styles.h2}>Les échéances</h2>
          </div>
          <div className={styles.cal}>
            <div className={styles.calItem}>
              <span className={styles.calDate}>Depuis sept. 2019</span>
              <span className={styles.calText}>
                Authentification forte et surveillance des opérations (règlement délégué 2018/389)
              </span>
            </div>
            <div className={styles.calItem}>
              <span className={styles.calDate}>Depuis oct. 2025</span>
              <span className={styles.calText}>
                Vérification du nom du bénéficiaire et de l&rsquo;IBAN (règlement 2024/886)
              </span>
            </div>
            <div className={styles.calItem}>
              <span className={styles.calDate}>Depuis nov. 2025</span>
              <span className={styles.calText}>
                Fichier national des comptes signalés (loi n° 2025-1058, arrêté du 24 avril 2026)
              </span>
            </div>
            <div className={styles.calItem}>
              <span className={`${styles.calDate} ${styles.calDateFort}`}>15 oct. 2026</span>
              <span className={styles.calText}>
                CJUE, C-70/25 : rembourser d&rsquo;abord, discuter la négligence ensuite
              </span>
            </div>
            <div className={styles.calItem}>
              <span className={styles.calDate}>Juillet 2027</span>
              <span className={styles.calText}>
                Application du règlement (UE) 2024/1624 sur la lutte contre le blanchiment
              </span>
            </div>
            <div className={styles.calItem}>
              <span className={styles.calDate}>Vers 2028</span>
              <span className={styles.calText}>Règlement sur les services de paiement, après publication</span>
            </div>
          </div>
        </div>
      </section>

      {/* Télécharger la note complète */}
      <section id="telecharger" className={styles.dl}>
        <div className={styles.inner}>
          <div className={styles.dlText}>
            <p className={styles.surtitre}>La note complète</p>
            <h2 className={styles.h2}>Cinq pages, sourcées, pour vos comités</h2>
            <p className={styles.prose}>
              La version PDF reprend l&rsquo;analyse détaillée, les conséquences par fonction, les dix questions
              et l&rsquo;ensemble des sources. L&rsquo;analyse est développée dans l&rsquo;article
              d&rsquo;Alexandre Lazarègue, « Fraude aux paiements : les obligations de sécurité des banques à
              l&rsquo;épreuve de leur responsabilité » (2026).
            </p>
          </div>
          <div className={styles.dlAside}>
            <PdfLink href={PDF} className={`btn btn-primary ${styles.iconBtn}`}>
              <IconTelecharger />
              Télécharger la note (PDF)
            </PdfLink>
            <span className={styles.dlNote}>Téléchargement libre, sans formulaire</span>
          </div>
        </div>
      </section>

      {/* Auteur + renvoi vers l'offre */}
      <section id="contact" className={`${styles.auteur} ${styles.off}`}>
        <div className={styles.inner}>
          <div className={styles.auteurCol}>
            <p className={styles.surtitre}>L&rsquo;auteur</p>
            <h2 className={styles.h2m}>Alexandre Lazarègue</h2>
            <p className={styles.auteurBio}>
              Avocat au barreau de Paris, fondateur du cabinet Lazarègue Avocats, consacré au droit du numérique.
              Ancien élève de l&rsquo;École nationale de la magistrature. Le cabinet associe sur ses dossiers
              avocats et experts techniques en cybersécurité, qui ne sont pas avocats.
            </p>
          </div>
          <div className={styles.offreCard}>
            <h3 className={styles.offreH3}>Le cabinet accompagne les établissements</h3>
            <p className={styles.offreText}>
              Diagnostic probatoire de la sécurité des paiements, mise à jour des procédures de réclamation,
              revue des contrats avec les prestataires techniques, préparation au futur règlement et formation
              des équipes.
            </p>
            <Link href={OFFRE} className={`btn btn-primary ${styles.selfStart}`}>
              Découvrir l&rsquo;accompagnement
            </Link>
            <div className={styles.coords}>
              <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
              <a href="tel:+33181706200">01 81 70 62 00</a>
              <span className={styles.lieu}>18 rue de Tilsitt, 75017 Paris</span>
            </div>
          </div>
        </div>
      </section>

      {/* Abonnement */}
      <section id="abonnement" className={styles.abon}>
        <div className={styles.inner}>
          <div className={styles.abonHead}>
            <p className={styles.surtitre}>Observatoire des obligations techniques des banques</p>
            <h2 className={styles.h2m}>Recevoir les prochaines notes</h2>
            <p className={styles.lead}>
              Décisions de justice, textes européens, recommandations des autorités : une note d&rsquo;analyse à
              chaque évolution qui modifie les obligations des établissements. Pas de lettre périodique, pas de
              message commercial.
            </p>
          </div>
          <div className={styles.abonBody}>
            <AbonnementForm />
          </div>
        </div>
      </section>

      {/* Sources et avertissement */}
      <section className={styles.sources}>
        <div className={styles.inner}>
          <span className={styles.srcTitre}>Sources</span>
          <span>
            CJUE, 15 oct. 2026, aff. C-70/25. Cass. com., 1er juill. 2026, n° 25-13.134 ; 9 sept. 2026,
            n° 25-15.225 ; 8 oct. 2026, n° 25-17.510.
          </span>
          <span>
            Conseil de l&rsquo;UE, règlement concernant les services de paiement dans le marché intérieur, texte
            de compromis final, doc. 8221/26, 17 avr. 2026, art. 58, 59, 69 et 83.
          </span>
          <span>
            Observatoire de la sécurité des moyens de paiement, rapports annuels 2024 et 2025. Le Médiateur
            auprès de la Fédération bancaire française, rapport d&rsquo;activité 2024, p. 5 et 7.
          </span>
          <span>
            Directive (UE) 2015/2366 ; règlement délégué (UE) 2018/389 ; règlements (UE) 2024/886 et 2024/1624 ;
            C. mon. fin., art. L. 133-18 à L. 133-24 et L. 521-6-1 ; loi n° 2025-1058 du 6 nov. 2025.
          </span>
          <span className={styles.srcSep}>
            Cette note présente une analyse générale à la date de sa rédaction. Elle ne constitue pas une
            consultation juridique adaptée à la situation d&rsquo;un établissement déterminé.
          </span>
          <span className={styles.srcSep}>
            © 2026 Lazarègue Avocats · Alexandre Lazarègue, avocat au barreau de Paris
          </span>
        </div>
      </section>
    </main>
  );
}
