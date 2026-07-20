import type { ReactNode } from "react";
import styles from "../ressources.module.css";

/**
 * Famille « documents-preuves » : de faux documents de travail juridiques,
 * avec imperfections volontaires et annotations manuscrites.
 *
 * DÉONTOLOGIE — la mention « Spécimen · … » est intégrée à la coquille et
 * ne peut pas être désactivée : aucun composant n'expose de prop pour la
 * retirer. Son libellé peut varier, jamais sa présence.
 */

const MENTION_DEFAUT = "Spécimen · données fictives";

function DocShell({
  titre,
  reference,
  mention = MENTION_DEFAUT,
  className,
  children,
}: {
  titre: ReactNode;
  reference: string;
  mention?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.doc} ${className ?? ""}`.trim()}>
      <div className={styles.docHead}>
        <span>{titre}</span>
        <b>{reference}</b>
      </div>
      <div className={styles.docBody}>{children}</div>
      <div className={styles.docFict}>{mention}</div>
    </div>
  );
}

/** Passage caviardé — accessible aux lecteurs d'écran. */
export function Redact({ width }: { width: number }) {
  return (
    <span
      className={styles.redact}
      style={{ width }}
      role="img"
      aria-label="passage masqué"
    />
  );
}

/** Surlignage bleu. */
export function Mark({ children }: { children: ReactNode }) {
  return <span className={styles.hlm}>{children}</span>;
}

/** Annotation manuscrite (Caveat). */
export function Hand({ children }: { children: ReactNode }) {
  return <span className={styles.hand}>{children}</span>;
}

/* ── Tableur : registre RGPD, recherche d'antériorités ── */

export type LigneTableur = {
  cellules: ReactNode[];
  statut?: { texte: string; ton: "ok" | "ko" };
};

export function DocSpreadsheet({
  titre,
  reference,
  colonnes,
  lignes,
  annotation,
  mention,
}: {
  titre: ReactNode;
  reference: string;
  colonnes: string[];
  lignes: LigneTableur[];
  annotation?: string;
  mention?: string;
}) {
  return (
    <DocShell titre={titre} reference={reference} mention={mention}>
      <table className={styles.xls}>
        <tbody>
          <tr>
            {colonnes.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
          {lignes.map((l, i) => (
            <tr key={i}>
              {l.cellules.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
              {l.statut ? (
                <td>
                  <span className={`${styles.st} ${styles[l.statut.ton]}`}>
                    {l.statut.texte}
                  </span>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      {annotation ? <Hand>{annotation}</Hand> : null}
    </DocShell>
  );
}

/* ── Courrier / contrat : LRAR, cession de droits ── */

export function DocContract({
  titre,
  reference,
  entete,
  paragraphes,
  annotation,
  tampon,
  mention,
}: {
  titre: ReactNode;
  reference: string;
  entete: string;
  paragraphes: ReactNode[];
  annotation?: string;
  tampon?: string;
  mention?: string;
}) {
  return (
    <DocShell
      titre={titre}
      reference={reference}
      mention={mention}
      className={styles.letter}
    >
      <p className={styles.lh}>{entete}</p>
      {paragraphes.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {annotation ? <Hand>{annotation}</Hand> : null}
      {tampon ? (
        <>
          <br />
          <span className={styles.stamp}>{tampon}</span>
        </>
      ) : null}
    </DocShell>
  );
}

/* ── Export de logs : SIEM ── */

export type LigneLog = {
  horodatage: string;
  severite: { texte: string; ton: "c" | "w" };
  message: ReactNode;
};

export function DocLog({
  titre,
  reference,
  lignes,
  annotation,
  mention,
}: {
  titre: ReactNode;
  reference: string;
  lignes: LigneLog[];
  annotation?: string;
  mention?: string;
}) {
  return (
    <DocShell titre={titre} reference={reference} mention={mention}>
      {lignes.map((l, i) => (
        <div key={i} className={styles.logLine}>
          <span className={styles.lt}>{l.horodatage}</span>
          <span className={`${styles.sv} ${styles[l.severite.ton]}`}>
            {l.severite.texte}
          </span>
          <span className={styles.lm}>{l.message}</span>
        </div>
      ))}
      {annotation ? <Hand>{annotation}</Hand> : null}
    </DocShell>
  );
}

/* ── Check-list : grille IA Act, aperçus d'outils ── */

export type LigneCheck = {
  texte: ReactNode;
  coche: boolean;
  reference?: string;
};

export function DocChecklist({
  titre,
  reference,
  lignes,
  annotation,
  mention,
}: {
  titre: ReactNode;
  reference: string;
  lignes: LigneCheck[];
  annotation?: string;
  mention?: string;
}) {
  return (
    <DocShell titre={titre} reference={reference} mention={mention}>
      {lignes.map((l, i) => (
        <div key={i} className={styles.dq}>
          <span
            className={`${styles.bx} ${l.coche ? "" : styles.off}`.trim()}
            aria-hidden
          >
            {l.coche ? "☒" : "☐"}
          </span>
          <span>{l.texte}</span>
          {l.reference ? <span className={styles.rf}>{l.reference}</span> : null}
        </div>
      ))}
      {annotation ? <Hand>{annotation}</Hand> : null}
    </DocShell>
  );
}
