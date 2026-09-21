"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * RGPD — addendum V4 : quatre livrables visuels.
 *
 * Quatre cartes-documents (rapport d'audit, registre, contrat, procédure de
 * violation). Chaque carte montre le nom, l'utilité et un extrait fictif
 * immédiatement lisible. « Agrandir l'extrait » ouvre un aperçu approfondi
 * (extrait agrandi + notes) dans un `<dialog>` natif (focus piégé, Échap, clic
 * fond, retour du focus). Les six autres documents restent dans un complément
 * natif fermé (`<details>`). Sans JavaScript, les liens « Agrandir » renvoient
 * vers la bibliothèque d'extraits rendue en fin de section.
 *
 * Extraits FICTIFS, présentés comme tels. Portée : cette section uniquement,
 * styles bornés à `.rgpd-deliverables-v4`.
 */

type Doc = {
  id: string;
  masthead: string;
  name: string;
  benefit: string;
  preview: ReactNode; // contenu interne de .document-preview (masthead + doc-content)
  notes: ReactNode; // .specimen-notes (affiché dans l'aperçu agrandi)
};

function Masthead({ badge }: { badge: string }) {
  return (
    <div className="doc-masthead">
      <span className="doc-brand">
        LAZARÈGUE <b>AVOCATS</b>
      </span>
      <span>{badge}</span>
    </div>
  );
}

const DOCS: Doc[] = [
  {
    id: "exemple-1",
    masthead: "RAPPORT D’AUDIT",
    name: "Rapport d’audit et plan d’action",
    benefit: "Les risques hiérarchisés et les mesures à engager.",
    preview: (
      <>
        <Masthead badge="RAPPORT D’AUDIT" />
        <div className="doc-content">
          <h4>Plan d’action priorisé</h4>
          <div className="audit-matrix">
            <div><span>Accès non révoqués</span><b className="priority high">Prioritaire</b></div>
            <div><span>Contrat prestataire</span><b className="priority">À négocier</b></div>
            <div><span>Information clients</span><b className="priority">À corriger</b></div>
          </div>
          <p className="doc-comment"><strong>Pourquoi agir d’abord ?</strong> Des personnes sorties de l’entreprise peuvent encore accéder aux données clients.</p>
          <div className="doc-decision"><strong>Action proposée</strong> Révoquer les accès, puis vérifier leur utilisation.</div>
        </div>
      </>
    ),
    notes: (
      <div className="specimen-notes">
        <h4>De l’écart à une décision d’entreprise</h4>
        <p>Dans cet exemple fictif, le maintien d’accès après le départ de salariés justifie une action immédiate. L’audit examine les habilitations, les données accessibles et les traces disponibles pour apprécier l’exposition.</p>
        <dl className="specimen-fields">
          <div><dt>Action</dt><dd>Révoquer les accès injustifiés, examiner les traces et vérifier le processus de départ.</dd></div>
          <div><dt>Pilotage</dt><dd>Identifier le responsable de l’action avec l’entreprise et fixer l’échéance selon le risque établi.</dd></div>
          <div><dt>Vérification</dt><dd>Conserver la preuve de la correction et contrôler son application.</dd></div>
        </dl>
        <p>Les priorités ne découlent pas automatiquement du nom du document manquant. Elles sont motivées par les faits, les données concernées et l’exposition constatée.</p>
      </div>
    ),
  },
  {
    id: "exemple-2",
    masthead: "REGISTRE · ART. 30",
    name: "Registre des traitements",
    benefit: "Les finalités, bases légales et durées documentées.",
    preview: (
      <>
        <Masthead badge="REGISTRE · ART. 30" />
        <div className="doc-content">
          <h4>Des usages distincts</h4>
          <table className="register-excerpt">
            <caption className="sr-only">Extrait illustratif du registre, sans détermination des durées applicables</caption>
            <thead>
              <tr><th scope="col">Traitement</th><th scope="col">Base légale</th><th scope="col">Usage</th></tr>
            </thead>
            <tbody>
              <tr><td>Commandes</td><td>Contrat</td><td>Gestion courante</td></tr>
              <tr><td>Facturation</td><td>Obligation légale</td><td>Archivage</td></tr>
              <tr className="row-review"><td>Prospection</td><td>À justifier</td><td>Finalité distincte</td></tr>
            </tbody>
          </table>
          <p className="doc-comment"><strong>Point à qualifier</strong> L’exécution d’une commande ne justifie pas, à elle seule, la réutilisation des données pour prospecter.</p>
          <div className="doc-decision">Bases et durées documentées, traitement par traitement.</div>
        </div>
      </>
    ),
    notes: (
      <div className="specimen-notes">
        <h4>Documenter les usages et les choix</h4>
        <p>L’extrait illustre une activité de vente en ligne aux particuliers. Il distingue la gestion des commandes, la facturation et la prospection : leurs finalités et justifications ne se confondent pas.</p>
        <dl className="specimen-fields">
          <div><dt>Qualification</dt><dd>Vérifier la nécessité du traitement pour chaque finalité et identifier la base légale adaptée.</dd></div>
          <div><dt>Conservation</dt><dd>Distinguer l’usage courant de l’archivage justifié ; déterminer les durées et les accès applicables.</dd></div>
          <div><dt>Registre complet</dt><dd>Documenter aussi les personnes et données concernées, destinataires, transferts et mesures de sécurité.</dd></div>
        </dl>
        <p>L’extrait montre le travail de qualification ; il ne constitue pas une fiche complète prête à réutiliser.</p>
        <p className="specimen-source">Repères : <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2" target="_blank" rel="noopener noreferrer">articles 5 et 6 du RGPD</a>.</p>
      </div>
    ),
  },
  {
    id: "exemple-3",
    masthead: "CONTRAT · ART. 28",
    name: "Contrat de sous-traitance",
    benefit: "Les clauses corrigées et les points à négocier.",
    preview: (
      <>
        <Masthead badge="CONTRAT · ART. 28" />
        <div className="doc-content">
          <h4>Recours à un autre prestataire</h4>
          <div className="clause-redline">
            <div><span>Version reçue</span><p><del>Le prestataire choisit librement ses sous-traitants.</del></p></div>
            <div className="clause-proposed"><span>Rédaction proposée</span><p>Le recours à un autre sous-traitant requiert <strong>l’autorisation écrite préalable du client.</strong></p></div>
          </div>
          <p className="doc-comment"><strong>Points à négocier</strong> Autorisation spécifique ou générale, information des changements, possibilité d’objection.</p>
        </div>
      </>
    ),
    notes: (
      <div className="specimen-notes">
        <h4>Une clause, plusieurs points de négociation</h4>
        <p>La rédaction proposée illustre le principe d’une autorisation écrite préalable. Le contrat précise ensuite si cette autorisation est spécifique ou générale.</p>
        <dl className="specimen-fields">
          <div><dt>Autorisation générale</dt><dd>Organiser l’information sur les ajouts ou remplacements et la possibilité pour le client d’émettre des objections.</dd></div>
          <div><dt>Organisation pratique</dt><dd>Définir le canal d’information, le délai applicable et la gestion d’une objection.</dd></div>
          <div><dt>Chaîne de sous-traitance</dt><dd>Prévoir la transmission des obligations pertinentes et examiner les conséquences pour la responsabilité du prestataire initial.</dd></div>
        </dl>
        <p>Les propositions sont adaptées au service, aux données et aux engagements réellement négociables.</p>
        <p className="specimen-source">Repère : <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4" target="_blank" rel="noopener noreferrer">article 28 du RGPD, paragraphes 2 à 4</a>.</p>
      </div>
    ),
  },
  {
    id: "exemple-4",
    masthead: "PROCÉDURE VIOLATION",
    name: "Procédure en cas de violation",
    benefit: "Qui intervient, quelles décisions prendre et quand notifier.",
    preview: (
      <>
        <Masthead badge="PROCÉDURE VIOLATION" />
        <div className="doc-content">
          <h4>Décider de la notification</h4>
          <div className="incident-start"><span aria-hidden="true">01</span><p>Qualifier les faits et contenir l’incident.</p></div>
          <div className="incident-question">Un risque pour les personnes ?</div>
          <div className="incident-branches">
            <div><b>Non</b><p>Documenter l’analyse et les mesures.</p></div>
            <div className="incident-yes"><b>Oui</b><p>Notifier l’autorité compétente.</p></div>
          </div>
          <p className="doc-comment"><strong>Risque élevé</strong> Examiner aussi l’information des personnes concernées.</p>
          <div className="doc-decision">La décision et ses motifs sont consignés.</div>
        </div>
      </>
    ),
    notes: (
      <div className="specimen-notes">
        <h4>Organiser la décision et garder sa trace</h4>
        <p>La procédure distingue les faits établis, l’évaluation du risque et les décisions prises par le responsable de traitement, avec l’appui de ses conseils et de ses équipes.</p>
        <dl className="specimen-fields">
          <div><dt>Notification à l’autorité</dt><dd>En présence d’un risque pour les droits et libertés, notifier dans les meilleurs délais et, si possible, sous 72 heures après avoir pris connaissance de la violation.</dd></div>
          <div><dt>Information des personnes</dt><dd>Un risque élevé appelle l’examen de leur information, sous réserve des exceptions applicables.</dd></div>
          <div><dt>Documentation</dt><dd>Consigner les faits, l’analyse, les mesures et les motifs de la décision, y compris en l’absence de notification.</dd></div>
        </dl>
        <p>Les rôles de l’entreprise, du prestataire, du DPO et des équipes sont précisés dans la procédure de la mission.</p>
        <p className="specimen-source">Repères : <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4" target="_blank" rel="noopener noreferrer">articles 33 et 34 du RGPD</a>.</p>
      </div>
    ),
  },
];

const OTHER_DOCS = [
  "Cartographie des traitements et des flux de données",
  "Politique de confidentialité et mentions d’information",
  "Politique cookies et paramétrage du bandeau",
  "Encadrement des transferts hors Union européenne",
  "Procédure de réponse aux demandes d’exercice des droits",
  "Charte informatique et politique interne de protection des données",
];

export function DeliverablesV4() {
  const [jsActive, setJsActive] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // JS actif : la modale prend le relais et la bibliothèque de repli est masquée.
  // Déféré à une tâche pour ne pas appeler setState directement dans l'effet.
  useEffect(() => {
    const id = setTimeout(() => setJsActive(true), 0);
    return () => clearTimeout(id);
  }, []);

  const open = (id: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setOpenId(id);
  };

  const close = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  // Ouvre/ferme le <dialog> natif au gré de openId (focus piégé + Échap gérés
  // nativement par showModal). Retour du focus au déclencheur à la fermeture.
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (openId && !dlg.open) {
      dlg.showModal();
      dlg.scrollTop = 0;
    }
    const onClose = () => {
      setOpenId(null);
      triggerRef.current?.focus({ preventScroll: true });
    };
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, [openId]);

  const activeDoc = DOCS.find((d) => d.id === openId) ?? null;

  return (
    <div className="rgpd-deliverables-v4">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="deliverables-grid">
        {DOCS.map((d) => (
          <article className="deliverable-card" data-deliverable={d.id} key={d.id}>
            <h3>{d.name}</h3>
            <p className="deliverable-benefit">{d.benefit}</p>
            <div className="document-preview" role="group" aria-label={`Extrait illustratif : ${d.name}`}>
              {d.preview}
            </div>
            <a
              className="specimen-link"
              href={`#${d.id}`}
              aria-label={`Agrandir l’extrait : ${d.name}`}
              aria-haspopup={jsActive ? "dialog" : undefined}
              onClick={(e) => {
                if (!jsActive || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                open(d.id, e.currentTarget);
              }}
            >
              Agrandir l’extrait <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <p className="specimen-caption">Exemples fictifs de présentation. Le contenu est défini selon votre mission.</p>

      <details className="documents-extra">
        <summary>
          Autres documents selon votre mission <span aria-hidden="true">+</span>
        </summary>
        <div className="documents-extra-body">
          <ul>
            {OTHER_DOCS.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      </details>

      {/* Aperçu approfondi (modale). Contenu identique à la bibliothèque
          ci-dessous, rendu à la demande. */}
      <dialog className="specimen-dialog" ref={dialogRef} aria-labelledby="specimen-dialog-title">
        <div className="dialog-toolbar">
          <button className="dialog-close" type="button" onClick={close}>
            Fermer <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="dialog-body">
          {activeDoc ? (
            <article className="specimen-detail">
              <p className="example-label">Exemple fictif · illustration du travail</p>
              <h3 id="specimen-dialog-title">{activeDoc.name}</h3>
              <p>{activeDoc.benefit}</p>
              <div className="document-preview specimen-preview">{activeDoc.preview}</div>
              {activeDoc.notes}
            </article>
          ) : null}
        </div>
      </dialog>

      {/* Bibliothèque d'extraits — repli sans JavaScript (cible des liens
          « Agrandir »). Masquée dès que JS est actif (la modale prend le relais). */}
      <section className="specimen-library" aria-labelledby="specimen-library-title" hidden={jsActive}>
        <h2 id="specimen-library-title">Extraits de documents</h2>
        {DOCS.map((d) => (
          <article className="specimen-detail" id={d.id} key={d.id}>
            <p className="example-label">Exemple fictif · illustration du travail</p>
            <h3>{d.name}</h3>
            <p>{d.benefit}</p>
            <div className="document-preview specimen-preview">{d.preview}</div>
            {d.notes}
          </article>
        ))}
      </section>
    </div>
  );
}

/* CSS porté de la maquette V4, borné à `.rgpd-deliverables-v4`, polices
   remappées sur les tokens du site. */
const CSS = `
.rgpd-deliverables-v4{--blue:#1a47ff;--navy:#0a0f2e;--ink:#0a0a14;--muted:#4a4a63;--line:#e0e0ee;--off:#f5f5f7}
.rgpd-deliverables-v4 .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.rgpd-deliverables-v4 .deliverables-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.rgpd-deliverables-v4 .deliverable-card{display:flex;flex-direction:column;min-width:0;margin:0}
.rgpd-deliverables-v4 .deliverable-card>h3{font-size:21px;line-height:1.3;min-height:2.6em;margin:23px 0 10px;letter-spacing:-.025em;font-weight:500}
.rgpd-deliverables-v4 .deliverable-benefit{font-size:16px;line-height:1.5;color:var(--muted);min-height:4.5em;margin:0 0 19px}
.rgpd-deliverables-v4 .document-preview{order:-1;flex:1;min-width:0;min-height:430px;border:1px solid #c4c8d5;background:#fff;display:flex;flex-direction:column;transition:border-color .18s,box-shadow .18s}
.rgpd-deliverables-v4 .deliverable-card:hover>.document-preview,.rgpd-deliverables-v4 .deliverable-card:focus-within>.document-preview{border-color:var(--blue);box-shadow:0 4px 0 var(--blue)}
.rgpd-deliverables-v4 .doc-masthead{padding:14px 13px;border-bottom:2px solid var(--navy);display:flex;align-items:center;justify-content:space-between;gap:9px;min-height:58px;flex-wrap:wrap}
.rgpd-deliverables-v4 .doc-brand{font:400 21px/1 var(--ff-display);white-space:nowrap;color:var(--ink)}
.rgpd-deliverables-v4 .doc-brand b{font-weight:400;color:var(--blue)}
.rgpd-deliverables-v4 .doc-masthead>span:last-child{font:400 10px/1.45 var(--ff-mono);color:var(--muted)}
.rgpd-deliverables-v4 .doc-content{padding:18px 14px;min-width:0;flex:1;display:flex;flex-direction:column;gap:17px}
.rgpd-deliverables-v4 .doc-content h4{font-size:17px;line-height:1.4;font-weight:600;letter-spacing:-.015em;margin:0}
.rgpd-deliverables-v4 .audit-matrix{font-size:14px;line-height:1.4}
.rgpd-deliverables-v4 .audit-matrix>div{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.rgpd-deliverables-v4 .audit-matrix>div:first-child{border-top:1px solid var(--line)}
.rgpd-deliverables-v4 .priority{font:400 10px/1.4 var(--ff-mono);text-transform:uppercase;padding:5px 6px;background:#f1f1f3;color:#353848;white-space:nowrap}
.rgpd-deliverables-v4 .priority.high{color:#fff;background:var(--navy)}
.rgpd-deliverables-v4 .doc-content .doc-comment{font-size:14px;line-height:1.5;color:var(--muted);margin:0}
.rgpd-deliverables-v4 .doc-comment strong{font-size:13px;line-height:1.5;color:var(--ink);font-weight:600;display:block;margin-bottom:5px}
.rgpd-deliverables-v4 .doc-decision{font-size:14px;line-height:1.45;color:var(--navy);padding:11px 0 0 11px;border-top:1px solid var(--line);border-left:3px solid var(--blue);margin-top:auto}
.rgpd-deliverables-v4 .doc-decision strong{display:block;font-weight:600;margin-bottom:4px}
.rgpd-deliverables-v4 .register-excerpt{width:100%;border-collapse:collapse;font-size:13px;line-height:1.4;table-layout:fixed;text-align:left}
.rgpd-deliverables-v4 .register-excerpt caption{caption-side:top}
.rgpd-deliverables-v4 .register-excerpt th{font-size:11px;font-weight:500;background:var(--off);color:var(--muted)}
.rgpd-deliverables-v4 .register-excerpt td,.rgpd-deliverables-v4 .register-excerpt th{padding:10px 5px;border-bottom:1px solid var(--line);vertical-align:top;overflow-wrap:break-word;hyphens:auto}
.rgpd-deliverables-v4 .register-excerpt th:first-child{width:36%}
.rgpd-deliverables-v4 .register-excerpt th:nth-child(2){width:36%}
.rgpd-deliverables-v4 .register-excerpt .row-review{background:#f5f5f7}
.rgpd-deliverables-v4 .register-excerpt .row-review td:first-child{border-left:3px solid var(--blue)}
.rgpd-deliverables-v4 .clause-redline{display:grid;grid-template-columns:1fr 1fr;font-size:14px;line-height:1.55;border:1px solid var(--line);margin-inline:-1px}
.rgpd-deliverables-v4 .clause-redline>div{padding:11px 9px;min-width:0}
.rgpd-deliverables-v4 .clause-redline>div>span{display:block;font:400 10px/1.5 var(--ff-mono);text-transform:uppercase;color:var(--muted);margin-bottom:12px}
.rgpd-deliverables-v4 .clause-redline p{font-size:14px;line-height:1.55;margin:0}
.rgpd-deliverables-v4 .clause-redline del{color:#65687b;text-decoration-thickness:1px}
.rgpd-deliverables-v4 .clause-redline .clause-proposed{border-left:1px solid var(--line);border-top:3px solid var(--blue);padding-top:8px}
.rgpd-deliverables-v4 .clause-proposed>span{color:var(--blue)!important}
.rgpd-deliverables-v4 .clause-proposed strong{font-weight:500;text-decoration:underline;text-decoration-color:var(--blue);text-underline-offset:3px}
.rgpd-deliverables-v4 .incident-start{display:grid;grid-template-columns:25px 1fr;gap:10px;font-size:14px;line-height:1.5;align-items:start}
.rgpd-deliverables-v4 .incident-start>span{width:25px;height:27px;background:var(--navy);color:#fff;display:grid;place-content:center;font:400 12px/1 var(--ff-mono)}
.rgpd-deliverables-v4 .incident-start p{font-size:14px;line-height:1.5;margin:0}
.rgpd-deliverables-v4 .incident-question{border:1px solid var(--navy);border-top:3px solid var(--blue);padding:11px 8px;text-align:center;font-size:14px;font-weight:500;line-height:1.45;position:relative}
.rgpd-deliverables-v4 .incident-question::before{content:"";height:17px;position:absolute;border-left:1px solid var(--line);left:50%;top:-20px}
.rgpd-deliverables-v4 .incident-branches{display:grid;grid-template-columns:1fr 1fr;gap:10px;position:relative;padding-top:3px}
.rgpd-deliverables-v4 .incident-branches::before{content:"";position:absolute;top:-9px;left:25%;right:25%;height:11px;border:1px solid var(--line);border-bottom:0}
.rgpd-deliverables-v4 .incident-branches>div{background:var(--off);padding:11px 10px;min-width:0}
.rgpd-deliverables-v4 .incident-branches b{font-size:13px;font-weight:600;display:block;margin-bottom:5px}
.rgpd-deliverables-v4 .incident-branches p{font-size:14px;line-height:1.45;margin:0}
.rgpd-deliverables-v4 .incident-branches .incident-yes{background:var(--navy);color:#fff}
.rgpd-deliverables-v4 .specimen-link{border:1px solid var(--ink);min-height:48px;padding:12px 13px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:15px;font-weight:500;text-decoration:none;line-height:1.45;color:var(--ink)}
.rgpd-deliverables-v4 .specimen-link>span{font-size:23px;line-height:1;color:var(--blue)}
.rgpd-deliverables-v4 .specimen-link:hover{background:var(--navy);color:#fff}
.rgpd-deliverables-v4 .specimen-link:hover>span{color:#fff}
.rgpd-deliverables-v4 .specimen-link:focus-visible{outline:3px solid var(--blue);outline-offset:3px}
.rgpd-deliverables-v4 .specimen-caption{font-size:13px;line-height:1.5;color:var(--muted);margin-top:25px}
.rgpd-deliverables-v4 .documents-extra{margin-top:24px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.rgpd-deliverables-v4 .documents-extra summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:18px 0;min-height:60px;font-size:16px;font-weight:500;line-height:1.5}
.rgpd-deliverables-v4 .documents-extra summary::-webkit-details-marker{display:none}
.rgpd-deliverables-v4 .documents-extra summary>span{color:var(--blue);font-size:25px;flex-shrink:0}
.rgpd-deliverables-v4 .documents-extra[open] summary>span{transform:rotate(45deg)}
.rgpd-deliverables-v4 .documents-extra-body{padding:0 0 23px}
.rgpd-deliverables-v4 .documents-extra ul{display:grid;grid-template-columns:1fr 1fr;gap:12px 35px;list-style:none;padding:0;margin:0}
.rgpd-deliverables-v4 .documents-extra li{font-size:16px;line-height:1.5;border-left:2px solid var(--blue);padding-left:13px}
/* aperçu agrandi (dialog + repli) */
.rgpd-deliverables-v4 .specimen-library{padding:45px 0 0;margin-top:24px;border-top:1px solid var(--line);max-width:760px}
.rgpd-deliverables-v4 .specimen-library>h2{font-size:24px;margin-bottom:20px;font-weight:500}
.rgpd-deliverables-v4 .specimen-detail{margin:30px 0;border-top:1px solid var(--line);padding-top:25px}
.rgpd-deliverables-v4 .specimen-detail:first-of-type{border-top:0;padding-top:0;margin-top:0}
.rgpd-deliverables-v4 .example-label{font:400 12px/1.5 var(--ff-mono);text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin:0 0 8px}
.rgpd-deliverables-v4 .specimen-detail h3{font-size:24px;margin:0 0 8px;font-weight:500}
.rgpd-deliverables-v4 .specimen-detail>p{font-size:16px;color:var(--muted);margin:0 0 18px}
.rgpd-deliverables-v4 .specimen-preview{margin-top:0;min-height:0;max-width:650px}
.rgpd-deliverables-v4 .specimen-preview .doc-masthead{padding:18px 24px}
.rgpd-deliverables-v4 .specimen-preview .doc-content{padding:24px;gap:22px}
.rgpd-deliverables-v4 .specimen-preview .doc-content h4{font-size:23px}
.rgpd-deliverables-v4 .specimen-preview .audit-matrix{font-size:17px}
.rgpd-deliverables-v4 .specimen-preview .priority{font-size:12px}
.rgpd-deliverables-v4 .specimen-preview .doc-comment,.rgpd-deliverables-v4 .specimen-preview .doc-decision,.rgpd-deliverables-v4 .specimen-preview .incident-start p,.rgpd-deliverables-v4 .specimen-preview .incident-question,.rgpd-deliverables-v4 .specimen-preview .incident-branches p,.rgpd-deliverables-v4 .specimen-preview .clause-redline p{font-size:17px}
.rgpd-deliverables-v4 .specimen-preview .register-excerpt{font-size:16px;min-width:0}
.rgpd-deliverables-v4 .specimen-preview .register-excerpt th{font-size:14px;background:var(--off);color:var(--ink)}
.rgpd-deliverables-v4 .specimen-preview .register-excerpt td,.rgpd-deliverables-v4 .specimen-preview .register-excerpt th{padding:12px 9px}
.rgpd-deliverables-v4 .specimen-preview .clause-redline>div{padding:18px}
.rgpd-deliverables-v4 .specimen-preview .clause-redline>div>span{font-size:12px}
.rgpd-deliverables-v4 .specimen-preview .incident-start>span{height:29px}
.rgpd-deliverables-v4 .specimen-preview .incident-branches>div{padding:18px}
.rgpd-deliverables-v4 .specimen-preview .doc-comment strong{font-size:16px}
.rgpd-deliverables-v4 .specimen-notes{margin-top:32px;max-width:650px}
.rgpd-deliverables-v4 .specimen-notes h4{font-size:23px;line-height:1.3;margin-bottom:15px;font-weight:600}
.rgpd-deliverables-v4 .specimen-notes p{font-size:16px;line-height:1.6;margin:15px 0 0}
.rgpd-deliverables-v4 .specimen-fields{margin:22px 0}
.rgpd-deliverables-v4 .specimen-fields>div{padding:14px 0;border-top:1px solid var(--line)}
.rgpd-deliverables-v4 .specimen-fields dt{font-weight:500;font-size:16px;margin-bottom:5px}
.rgpd-deliverables-v4 .specimen-fields dd{margin:0;color:var(--muted);font-size:16px;line-height:1.6}
.rgpd-deliverables-v4 .specimen-source{font-size:14px;color:var(--muted)}
.rgpd-deliverables-v4 .specimen-source a{color:var(--blue)}
/* dialog natif */
.rgpd-deliverables-v4 .specimen-dialog{color:var(--ink);background:#fff;border:0;padding:0;width:min(760px,calc(100% - 32px));max-width:760px;max-height:calc(100% - 48px);box-shadow:0 25px 100px #0005}
.rgpd-deliverables-v4 .specimen-dialog::backdrop{background:#0a0f2ecc}
.rgpd-deliverables-v4 .dialog-toolbar{position:sticky;top:0;background:#fff;border-bottom:1px solid var(--line);display:flex;justify-content:flex-end;padding:10px}
.rgpd-deliverables-v4 .dialog-close{border:1px solid var(--ink);background:#fff;min-height:44px;min-width:88px;padding:0 14px;font-size:15px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;color:var(--ink)}
.rgpd-deliverables-v4 .dialog-close:hover{background:var(--navy);color:#fff}
.rgpd-deliverables-v4 .dialog-close:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
.rgpd-deliverables-v4 .dialog-body{padding:32px 28px 36px}
.rgpd-deliverables-v4 .dialog-body .specimen-detail{margin:0;border:0;padding:0}
@media(max-width:1279px){
 .rgpd-deliverables-v4 .deliverables-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:38px 26px}
 .rgpd-deliverables-v4 .deliverable-benefit{min-height:3em}
 .rgpd-deliverables-v4 .document-preview{min-height:410px}
 .rgpd-deliverables-v4 .doc-content{padding:21px;gap:18px}
 .rgpd-deliverables-v4 .doc-masthead{padding:15px 20px}
 .rgpd-deliverables-v4 .audit-matrix{font-size:16px}
 .rgpd-deliverables-v4 .priority{font-size:11px}
 .rgpd-deliverables-v4 .register-excerpt{font-size:15px}
 .rgpd-deliverables-v4 .register-excerpt th{font-size:13px}
 .rgpd-deliverables-v4 .doc-content .doc-comment,.rgpd-deliverables-v4 .doc-decision{font-size:16px}
 .rgpd-deliverables-v4 .clause-redline p,.rgpd-deliverables-v4 .incident-start p,.rgpd-deliverables-v4 .incident-question,.rgpd-deliverables-v4 .incident-branches p{font-size:16px}
 .rgpd-deliverables-v4 .clause-redline>div{padding:13px}
 .rgpd-deliverables-v4 .clause-redline>div>span{font-size:11px}
 .rgpd-deliverables-v4 .doc-content h4{font-size:20px}
}
@media(max-width:639px){
 .rgpd-deliverables-v4 .deliverables-grid{grid-template-columns:1fr;gap:35px}
 .rgpd-deliverables-v4 .deliverable-card>h3{font-size:23px;min-height:0;margin:0 0 9px}
 .rgpd-deliverables-v4 .deliverable-benefit{min-height:0;margin-bottom:19px;font-size:16px}
 .rgpd-deliverables-v4 .document-preview{order:0;min-height:0;flex:auto}
 .rgpd-deliverables-v4 .doc-content h4{font-size:19px}
 .rgpd-deliverables-v4 .audit-matrix{font-size:15px}
 .rgpd-deliverables-v4 .register-excerpt{font-size:14px}
 .rgpd-deliverables-v4 .register-excerpt th{font-size:12px}
 .rgpd-deliverables-v4 .clause-redline p{font-size:15px}
 .rgpd-deliverables-v4 .clause-redline>div{padding:11px 9px}
 .rgpd-deliverables-v4 .documents-extra ul{grid-template-columns:1fr}
 .rgpd-deliverables-v4 .specimen-preview .clause-redline{grid-template-columns:1fr}
 .rgpd-deliverables-v4 .specimen-preview .clause-redline>div{padding:15px}
 .rgpd-deliverables-v4 .specimen-detail h3{font-size:21px}
 .rgpd-deliverables-v4 .specimen-notes h4{font-size:20px}
 .rgpd-deliverables-v4 .dialog-body{padding:26px 20px 30px}
}
@media(prefers-reduced-motion:reduce){
 .rgpd-deliverables-v4 .document-preview,.rgpd-deliverables-v4 .documents-extra summary>span{transition:none}
}
`;
