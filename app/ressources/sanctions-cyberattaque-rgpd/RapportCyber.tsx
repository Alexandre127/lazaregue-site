import Link from "next/link";
import DownloadLink from "@/components/observatoire/DownloadLink";
import styles from "./rapport.module.css";

/**
 * Rapport « Après la cyberattaque, la sanction » — étude de 139 décisions
 * européennes. Texte et chiffres repris de la maquette validée (non modifiés) ;
 * composants, tokens et classes du site ; en-tête et pied de page via le layout.
 * Téléchargements libres (PDF + liste Excel), sans formulaire.
 */

const PDF = "/documents/rapport-apres-la-cyberattaque-la-sanction.pdf";
const XLSX = "/documents/liste-decisions-cyberattaques-sanctionnees.xlsx";
const RGPD = "/nos-domaines/rgpd-donnees-personnelles";
const CYBER = "/nos-domaines/cybersecurite";

const PAYS = [
  { nom: "France", n: "7 décisions", montant: "1 500 000 €" },
  { nom: "Espagne", n: "41", montant: "190 000 €" },
  { nom: "Pologne", n: "10", montant: "132 900 €" },
  { nom: "Irlande", n: "13", montant: "125 000 €" },
  { nom: "Italie", n: "14", montant: "30 000 €" },
  { nom: "Roumanie", n: "24", montant: "5 000 €" },
];

const DELAIS = [
  { nom: "Norvège, commune d’Østre Toten", duree: "12 mois", pct: 13 },
  { nom: "France, Hôpital privé de la Loire", duree: "13 mois", pct: 14 },
  { nom: "France, Free et Free Mobile", duree: "15 mois", pct: 17 },
  { nom: "Italie, LAZIOcrea", duree: "2 ans et 7 mois", pct: 34 },
  { nom: "Espagne, The Phone House", duree: "2 ans et 8 mois", pct: 36 },
  { nom: "Italie, UniCredit", duree: "5 ans et 3 mois", pct: 70 },
  { nom: "Pologne, hôpital de Białystok", duree: "5 ans et 5 mois", pct: 72 },
  { nom: "Irlande, Meta", duree: "6 ans et 2 mois", pct: 82 },
  { nom: "Irlande, hôpital de Tullamore", duree: "7 ans et 6 mois", pct: 100 },
];

const AUDIT = [
  {
    point: "Connexion à distance",
    question: "« Avez-vous une double authentification ? »",
    preuve: "La liste des comptes qui en sont dispensés, prestataires compris",
  },
  {
    point: "Mises à jour",
    question: "« Avez-vous une politique de mises à jour ? »",
    preuve: "Un relevé récent des défauts non réparés sur les équipements reliés à internet",
  },
  {
    point: "Surveillance",
    question: "« Avez-vous une supervision ? »",
    preuve: "Le résultat d’un essai : une copie massive de données déclenche-t-elle une alerte ?",
  },
  {
    point: "Accès",
    question: "« Les accès sont-ils limités ? »",
    preuve: "Ce qu’un compte pris au hasard peut réellement consulter",
  },
  {
    point: "Prestataires",
    question: "« Le contrat contient-il la clause prévue ? »",
    preuve: "Les preuves de sécurité reçues et la date du dernier contrôle",
  },
  {
    point: "Sauvegardes",
    question: "« Sont-elles réalisées ? »",
    preuve: "Le compte rendu du dernier essai de restauration",
  },
];

const SOMMAIRE = [
  "1. Le cadre juridique",
  "2. Les décisions étudiées",
  "3. Comment les attaques se déroulent",
  "4. Ce que les autorités reprochent, et pourquoi cela manquait",
  "5. Des mesures connues : confrontation aux référentiels",
  "6. Les sanctions, d’un pays à l’autre",
  "7. Enseignements pour les organismes",
  "8. Auditer autrement : la preuve plutôt que la déclaration",
  "9. Ce que le droit actuel laisse sans réponse",
];

export default function RapportCyber() {
  return (
    <main id="contenu" className={styles.page}>
      {/* Hero */}
      <section className={`${styles.hero} ${styles.navy}`}>
        <div className={styles.inner}>
          <div className={styles.heroMain}>
            <p className={`${styles.label} ${styles.labelDark}`}>ressources · rapport · novembre 2026</p>
            <h1 className={styles.h1}>Après la cyberattaque, la sanction</h1>
            <p className={styles.heroLead}>
              Une entreprise piratée est-elle seulement une victime ? 139 décisions rendues dans 20 pays
              européens répondent, et elles ne répondent pas partout de la même façon.
            </p>
            <div className={styles.heroActions}>
              <DownloadLink href={PDF} fichier="pdf" composant="rapport_hero" className="btn btn-primary">
                Télécharger le rapport (PDF, 60 pages)
              </DownloadLink>
              <a href="#constats" className={styles.heroLink}>
                Lire les constats
              </a>
            </div>
            <p className={`${styles.label} ${styles.labelDark}`}>
              accès libre · sans inscription · relevé arrêté au 25 novembre 2026
            </p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.bigNum}>139</span>
              <p>organismes sanctionnés après avoir été attaqués</p>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.bigNum}>116 millions</span>
              <p>de personnes touchées, d’après les 59 décisions qui donnent un chiffre</p>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.bigNum}>14 centimes</span>
              <p>d’amende par personne touchée dans l’affaire France Travail</p>
            </div>
          </div>
        </div>
      </section>

      {/* La question */}
      <section className={styles.sec}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>la question</p>
            <h2 className={styles.h2}>Trois annonces en dix jours, une même question</h2>
            <p className={styles.secLead}>
              En novembre 2026, trois organismes français ont annoncé qu’un tiers avait accédé à leurs fichiers.
              Aucune autorité ne s’est prononcée sur ces affaires, et ce rapport n’en dit rien. Il regarde ce que
              les autorités ont décidé, depuis 2018, dans des affaires comparables.
            </p>
          </div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.countMono}>14 novembre</p>
              <h3 className={styles.h3}>Maileva, groupe La Poste</h3>
              <p>Nom, prénom et adresse de 22 millions de destinataires de courriers.</p>
            </div>
            <div className={styles.card}>
              <p className={styles.countMono}>23 novembre</p>
              <h3 className={styles.h3}>Institut national du cancer</h3>
              <p>Deux sites d’information indisponibles, violation de données confirmée.</p>
            </div>
            <div className={styles.card}>
              <p className={styles.countMono}>24 novembre</p>
              <h3 className={styles.h3}>Direction générale de l’aviation civile</h3>
              <p>Accès non autorisé au site de paiement des redevances pendant quatre jours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Repère : 3 étapes */}
      <section className={`${styles.sec} ${styles.off}`}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>repère</p>
            <h2 className={styles.h2}>Comment une victime devient un organisme sanctionné</h2>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <h3 className={styles.h3}>Un tiers attaque</h3>
              <p>
                Il entre, le plus souvent avec un mot de passe valable, et copie les données sans être remarqué.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <h3 className={styles.h3}>L’autorité enquête</h3>
              <p>
                L’organisme doit déclarer la fuite. L’autorité demande alors ce qui protégeait les données le
                jour de l’attaque.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <h3 className={styles.h3}>L’organisme est sanctionné</h3>
              <p>
                Jamais pour avoir été attaqué. Toujours pour une précaution connue qui manquait, et c’est à lui
                de prouver qu’il s’était protégé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les constats : 5 lignes */}
      <section id="constats" className={styles.sec}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>les constats</p>
            <h2 className={styles.h2}>Ce que montrent les 139 décisions</h2>
          </div>
          <div className={styles.constats}>
            <div className={styles.constat}>
              <h3>On n’est pas puni pour avoir été piraté</h3>
              <p>
                On l’est pour avoir laissé une porte ouverte : une précaution élémentaire manquait, qui aurait
                empêché l’intrusion ou limité les dégâts.
              </p>
            </div>
            <div className={styles.constat}>
              <h3>Ce sont toujours les mêmes portes</h3>
              <p>
                Un accès à distance protégé par un simple mot de passe. Une mise à jour jamais installée.
                Personne pour remarquer qu’un compte copie des millions de fiches. Un prestataire que nul ne
                contrôle.
              </p>
            </div>
            <div className={styles.constat}>
              <h3>Ces précautions étaient connues</h3>
              <p>
                Elles figurent dans les guides publics de la CNIL et de l’ANSSI. Dans sept dossiers au moins, un
                document interne de l’organisme décrivait le risque ou la mesure à prendre.
              </p>
            </div>
            <div className={styles.constat}>
              <h3>D’un pays à l’autre, la sanction n’a rien de comparable</h3>
              <p>
                Le même règlement s’applique partout. L’amende médiane va pourtant de 5 000 € à 1,5 M€, et le
                délai de un an à plus de sept ans.
              </p>
            </div>
            <div className={styles.constat}>
              <h3>Les personnes touchées ne reçoivent rien</h3>
              <p>
                L’amende revient à l’État. Rapportée à chaque personne dont les données ont fui, elle va de 4
                centimes à 6,57 €.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La comparaison (navy) */}
      <section id="pays" className={`${styles.sec} ${styles.navy}`}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <p className={`${styles.label} ${styles.labelDark}`}>la comparaison</p>
            <h2 className={styles.h2}>Un même règlement, des sanctions sans commune mesure</h2>
            <p className={styles.secLeadDark}>
              Ces écarts ne classent pas les autorités : elles ne jugent pas les mêmes organismes. Le délai, lui,
              ne dépend pas de leur taille.
            </p>
          </div>
          <div className={styles.compare}>
            <div className={styles.compareCol}>
              <h3 className={styles.compareH3}>Amende médiane par pays</h3>
              {PAYS.map((p) => (
                <div key={p.nom} className={styles.pays}>
                  <span>
                    {p.nom} <span className={styles.countMonoDark}>{p.n}</span>
                  </span>
                  <span className={styles.paysAmount}>{p.montant}</span>
                </div>
              ))}
            </div>
            <div className={styles.compareCol}>
              <h3 className={styles.compareH3}>Temps écoulé entre l’attaque et la sanction</h3>
              <div className={styles.delaiList}>
                {DELAIS.map((d) => (
                  <div key={d.nom} className={styles.delai}>
                    <div className={styles.delaiHead}>
                      <span>{d.nom}</span>
                      <span className={styles.countMonoDark}>{d.duree}</span>
                    </div>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: `${d.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour les organismes : tableau */}
      <section id="audit" className={styles.sec}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <p className={styles.label}>pour les organismes</p>
            <h2 className={styles.h2}>Vérifier les réglages, pas les documents</h2>
            <p className={styles.secLead}>
              Les autorités sanctionnent ce qui était en place le jour de l’attaque. Le rapport propose de clore
              chaque point de contrôle par une preuve tirée du système.
            </p>
          </div>
          <div className={styles.tableScroll}>
            <div className={styles.tableInner}>
              <div className={styles.tableHead}>
                <span className={styles.col1}>point vérifié</span>
                <span className={styles.col2}>question habituelle</span>
                <span className={styles.col3}>preuve à demander</span>
              </div>
              {AUDIT.map((r) => (
                <div key={r.point} className={styles.tableRow}>
                  <span className={styles.col1}>{r.point}</span>
                  <span className={styles.col2}>{r.question}</span>
                  <span className={styles.col3}>{r.preuve}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* La méthode (off) */}
      <section id="methode" className={`${styles.methode} ${styles.off}`}>
        <div className={styles.inner}>
          <div className={styles.methodeCol}>
            <p className={styles.label}>la méthode</p>
            <h2 className={styles.h2}>Comment ce relevé a été fait</h2>
            <p>
              Les décisions ont été recherchées sur les sites des autorités nationales et dans la base publique
              GDPR Enforcement Tracker. Une décision n’a été retenue que si trois éléments étaient réunis : un
              attaquant extérieur, une enquête ouverte à la suite de l’attaque, une sanction.
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>132</span>
              <p>décisions vérifiées sur le texte officiel, dans leur langue d’origine</p>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>20</span>
              <p>pays, de 2018 au 25 novembre 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Le rapport complet (navy) : téléchargement + sommaire */}
      <section id="telecharger" className={`${styles.dl} ${styles.navy}`}>
        <div className={styles.inner}>
          <div className={styles.dlCol}>
            <p className={`${styles.label} ${styles.labelDark}`}>le rapport complet</p>
            <h2 className={styles.h2}>60 pages, la liste des 139 décisions en annexe</h2>
            <div className={styles.dlBtns}>
              <DownloadLink href={PDF} fichier="pdf" composant="rapport_bloc" className="btn btn-primary">
                Télécharger le rapport (PDF)
              </DownloadLink>
              <DownloadLink href={XLSX} fichier="xlsx" composant="rapport_bloc" className={`btn ${styles.btnLigneBlanc}`}>
                Télécharger la liste des décisions (Excel)
              </DownloadLink>
            </div>
            <p className={styles.dlContact}>
              Presse et organisations professionnelles : <a href="tel:+33181706200">01 81 70 62 00</a> ·{" "}
              <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>
            </p>
          </div>
          <ol className={styles.sommaire}>
            {SOMMAIRE.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Renvois internes */}
      <section className={styles.renvoi}>
        <div className={styles.inner}>
          <Link href={RGPD}>RGPD et données personnelles</Link>
          <Link href={CYBER}>Cybersécurité et NIS 2</Link>
        </div>
      </section>

      {/* Avertissement */}
      <section className={styles.avertissement}>
        <div className={styles.inner}>
          étude d’information générale, qui ne constitue pas une consultation juridique
        </div>
      </section>
    </main>
  );
}
