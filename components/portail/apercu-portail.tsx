import { MEMBRES } from "@/lib/equipe";
import styles from "./apercu-portail.module.css";

/* Aperçu FIXE de l'espace client, tel que le portail l'affiche réellement
   (espace.lazaregue-avocats.fr) : quatre onglets, avancement par étapes,
   synthèse validée par l'avocat, prochaine échéance, « À vous de jouer ».
   Rien n'y est animé et rien n'y est promis que le portail ne fasse pas :
   ni messagerie, ni signature, ni « temps réel ».

   Deux exemples FICTIFS, sans nom de client : un contentieux informatique
   (accueil) et une mission de conseil RGPD (page « Le cabinet »).
   Décoratif : le texte voisin porte l'information (aria-hidden). */

const ONGLETS = ["Vue d’ensemble", "Documents", "À faire", "Honoraires"];

type Etapes = { libelles: string[]; enCours: number };

function Frise({ libelles, enCours }: Etapes) {
  return (
    <ol className={styles.frise}>
      {libelles.map((libelle, i) => (
        <li key={libelle} className={i < enCours ? styles.faite : i === enCours ? styles.enCours : styles.aVenir}>
          <span className={styles.barre} />
          {libelle}
        </li>
      ))}
    </ol>
  );
}

function Cadre({ aJour, pied, children }: { aJour: string; pied: string; children: React.ReactNode }) {
  return (
    <div className={styles.apercu} aria-hidden="true">
      <div className={styles.tete}>
        <span className={styles.mono}>Espace client</span>
        <span className={styles.aJour}>à jour au {aJour}</span>
      </div>
      <div className={styles.onglets}>
        {ONGLETS.map((onglet, i) => (
          <span key={onglet} className={i === 0 ? styles.ongletActif : undefined}>{onglet}</span>
        ))}
      </div>
      <div className={styles.corps}>{children}</div>
      <div className={styles.pied}>
        <span className={styles.carre} />
        {pied}
      </div>
    </div>
  );
}

function Contentieux() {
  return (
    <Cadre aJour="2 oct." pied="Conclusions adverses analysées · prochaine étape fixée">
      <div className={styles.titreLigne}>
        <div className={styles.titre}>PME industrielle — résiliation du contrat d’intégration</div>
        <span className={styles.mono}>étape 3 sur 5</span>
      </div>
      <Frise libelles={["Mise en demeure", "Assignation", "Conclusions", "Audience", "Décision"]} enCours={2} />
      <div className={styles.deux}>
        <div className={styles.synthese}>
          <div className={styles.syntheseTitre}>Où en est votre dossier</div>
          <div className={styles.syntheseTexte}>L’intégrateur a conclu le 22 septembre. Le cabinet prépare la réponse, à déposer avant le 14 novembre.</div>
          <div className={styles.validee}>✓ validée par votre avocat</div>
        </div>
        <div className={styles.colonne}>
          <div className={styles.echeance}>
            <span className={styles.pave}>
              <span className={styles.jour}>14</span>
              <span>nov.</span>
            </span>
            <span>Dépôt des conclusions en réponse</span>
          </div>
          <div className={styles.aVous}>
            <span className={styles.aVousTitre}>À vous de jouer</span>
            <span className={styles.secondaire}>Transmettre les échanges avec l’intégrateur</span>
          </div>
        </div>
      </div>
    </Cadre>
  );
}

function Conseil() {
  const avocate = MEMBRES.sarah;
  const initiales = avocate.nom.replace(/^Me\s+/, "").split(/\s+/).map((mot) => mot[0]).join("");
  return (
    <Cadre aJour="1er oct." pied="Synthèse validée par votre avocat">
      <div>
        <div className={styles.etiquettes}>
          <span className={styles.tagPlein}>conseil</span>
          <span className={styles.tagPale}>RGPD</span>
        </div>
        <div className={styles.titre}>Site e-commerce — mise en conformité RGPD</div>
      </div>
      <Frise libelles={["Cadrage", "Collecte", "Analyse", "Rapport", "Suivi"]} enCours={2} />
      <div className={styles.liste}>
        <div className={styles.rubrique}>Chronologie</div>
        <div className={styles.ligne}>
          <span><span className={styles.date}>1er oct.</span>Registre des traitements — projet v2 transmis pour relecture</span>
          <span className={styles.tagBleu}>cabinet</span>
        </div>
        <div className={styles.ligne}>
          <span><span className={styles.date}>24 sept.</span>Contrat de sous-traitance (DPA) annoté</span>
          <span className={styles.tagBleu}>cabinet</span>
        </div>
        <div className={styles.ligne}>
          <span><span className={styles.date}>12 sept.</span>Cartographie des données reçue</span>
          <span className={styles.tagContour}>vous</span>
        </div>
      </div>
      <div className={`${styles.aVous} ${styles.aVousLigne}`}>
        <span>
          <span className={styles.aVousTitre}>À vous de jouer</span>
          <span className={styles.secondaire}>Transmettre la liste de vos sous-traitants</span>
        </span>
        <span className={styles.tagContour}>avant le 15 oct.</span>
      </div>
      <div className={styles.equipe}>
        <span className={styles.initiales}>{initiales}</span>
        <span>
          <span className={styles.equipeNom}>{avocate.nom}</span>
          <span className={styles.secondaire}>{avocate.statut}</span>
        </span>
      </div>
    </Cadre>
  );
}

export function ApercuPortail({ exemple }: { exemple: "contentieux" | "conseil" }) {
  return exemple === "contentieux" ? <Contentieux /> : <Conseil />;
}
