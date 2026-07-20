import type { ReactNode } from "react";
import type { DossierId } from "../data/ressources";
import {
  DocChecklist,
  DocContract,
  DocLog,
  DocSpreadsheet,
  Mark,
  Redact,
} from "./DocProof";
import styles from "../ressources.module.css";

/**
 * La pièce affichée dans le panneau navy de chaque dossier.
 * Une pièce par dossier, reprise à l'identique de la maquette.
 */
export const VISUELS: Record<DossierId, ReactNode> = {
  "donnees-rgpd": (
    <DocSpreadsheet
      titre="Registre des traitements (extrait)"
      reference="Art. 30 RGPD"
      colonnes={["Traitement", "Base légale", "Statut"]}
      lignes={[
        {
          cellules: ["Newsletter", "Consentement"],
          statut: { texte: "Conforme", ton: "ok" },
        },
        {
          cellules: [<Mark key="c">Cookies analytics</Mark>, "Consentement"],
          statut: { texte: "À recueillir", ton: "ko" },
        },
        {
          cellules: ["Recrutement", "Mesures précontr."],
          statut: { texte: "Conforme", ton: "ok" },
        },
      ]}
      annotation="→ bannière à revoir avant contrôle"
    />
  ),

  "pi-creations": (
    <DocContract
      titre="Contrat de cession de droits — art. 4"
      reference="Projet v2"
      entete="4.1 — Étendue de la cession"
      paragraphes={[
        <>
          « La cession comprend, pour chaque droit cédé,{" "}
          <Mark>son étendue, sa destination, son lieu et sa durée</Mark>,
          conformément à l&apos;article L.131-3… »
        </>,
        <>
          « …les œuvres créées{" "}
          <span className={styles.strike}>pendant la mission</span> dans le cadre
          des présentes… »
        </>,
      ]}
      annotation="mention manquante = cession fragile"
    />
  ),

  "marques-domaines": (
    <DocSpreadsheet
      titre={
        <>
          Recherche d&apos;antériorités — «&nbsp;
          <Redact width={38} />
          &nbsp;»
        </>
      }
      reference="Classes 9 · 42"
      colonnes={["Signe antérieur", "Classe", "Risque"]}
      lignes={[
        {
          cellules: [
            <>
              <Redact width={52} /> (identique)
            </>,
            "9",
          ],
          statut: { texte: "Antériorité", ton: "ko" },
        },
        {
          cellules: [
            <>
              <Redact width={44} /> (similaire)
            </>,
            "42",
          ],
          statut: { texte: "À évaluer", ton: "ko" },
        },
        {
          cellules: [".fr disponible", "—"],
          statut: { texte: "Libre", ton: "ok" },
        },
      ]}
      annotation="→ vérifier avant tout dépôt"
    />
  ),

  cyber: (
    <DocLog
      titre="export_siem_20260614.log"
      reference="Pièce n° 3"
      lignes={[
        {
          horodatage: "06-14 08:15:07",
          severite: { texte: "CRIT", ton: "c" },
          message: (
            <>
              14 connexions anormales — 185.
              <Redact width={20} />
              .41
            </>
          ),
        },
        {
          horodatage: "06-14 09:02:44",
          severite: { texte: "WARN", ton: "w" },
          message: "Snapshot gelé — préservation preuves",
        },
        {
          horodatage: "06-14 11:42:51",
          severite: { texte: "INFO", ton: "w" },
          message: "Pré-notification CNIL rédigée",
        },
      ]}
      annotation="↑ horodatage = preuve : ne rien purger"
    />
  ),

  ia: (
    <DocChecklist
      titre="Grille de qualification — IA Act"
      reference="V. 07/26"
      mention="Spécimen · analyse au cas par cas"
      lignes={[
        {
          texte: "Annexe III, 4 — emploi et gestion des travailleurs",
          coche: true,
          reference: "Art. 6 §2",
        },
        {
          texte: <Mark>Effets juridiques sur les personnes</Mark>,
          coche: true,
          reference: "§21",
        },
        { texte: "Exception art. 6 §3", coche: false, reference: "écartée" },
      ]}
      annotation="→ haut risque : registre + FRIA"
    />
  ),
};
