"use client";

import Link from "next/link";
import Logo from "@/components/header/logo";
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { track } from "@/lib/track";

/*
 * Sélecteur de spécimens (comportement de la maquette v3, réécrit en React).
 * ≥ 960px : liste à gauche, aperçu à droite (sticky, sous le header), un seul
 * visible, premier ouvert. < 960px : accordéon, panneau sous son bouton.
 * Boutons natifs, aria-expanded / aria-controls, état textuel sr-only.
 * Modale : role=dialog, aria-modal, focus piégé, Échap / Fermer / clic fond,
 * focus restitué, défilement bloqué, barre mobile masquée (classe body).
 * Contenu essentiel visible sans JS : cf. <noscript> côté page + hidden gérés.
 */

// Lettre-tête de document — composant Logo du projet (charte § 02), pas une
// reconstruction CSS.
function DocBrand({ badge }: { badge: string }) {
  return (
    <div className="doc-brand">
      <span className="id">
        <Logo />
      </span>
      <span className="doc-badge">{badge}</span>
    </div>
  );
}

type Specimen = {
  id: string;
  num: string;
  name: string;
  accroche: string;
  ariaLabel: string;
  doc: ReactNode;
  explain: ReactNode;
};

const SPECIMENS: Specimen[] = [
  {
    id: "spec-1",
    num: "01",
    name: "Rapport d’audit et plan d’action",
    accroche: "Les écarts constatés, hiérarchisés par risque",
    ariaLabel: "Aperçu : rapport d’audit et plan d’action",
    doc: (
      <div className="doc">
        <DocBrand badge="Rapport d’audit" />
        <div className="doc-inner">
          <div className="doc-title">
            <h4>Rapport d’audit — protection des données</h4>
            <span>
              réf. <span className="fill">XX-000</span> ·{" "}
              <span className="fill">date</span>
            </span>
          </div>
          <h5>synthèse</h5>
          <p style={{ fontSize: 14, maxWidth: "none" }}>
            L’audit porte sur <span className="fill">n</span> traitements et{" "}
            <span className="fill">n</span> prestataires. Les écarts sont classés
            par niveau de risque pour les personnes concernées, puis ordonnés par
            priorité de traitement.
          </p>
          <h5>plan d’action</h5>
          <p className="scroll-hint">Faire défiler le tableau horizontalement</p>
          <div
            className="table-scroll"
            tabIndex={0}
            role="group"
            aria-label="Plan d’action — tableau défilant horizontalement"
          >
            <table>
              <caption className="sr-only">
                Écarts constatés, niveau de risque, action et échéance
              </caption>
              <thead>
                <tr>
                  <th scope="col">Écart constaté</th>
                  <th scope="col">Risque</th>
                  <th scope="col">Action proposée</th>
                  <th scope="col">Échéance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-col="Écart constaté">Registre incomplet : bases légales non documentées</td>
                  <td data-col="Risque"><span className="pill h">élevé</span></td>
                  <td data-col="Action proposée">Reconstitution du registre et qualification des bases légales</td>
                  <td data-col="Échéance"><span className="fill">délai</span></td>
                </tr>
                <tr>
                  <td data-col="Écart constaté">Prestataire d’hébergement sans clauses article 28</td>
                  <td data-col="Risque"><span className="pill h">élevé</span></td>
                  <td data-col="Action proposée">Avenant de sous-traitance et annexe sécurité</td>
                  <td data-col="Échéance"><span className="fill">délai</span></td>
                </tr>
                <tr>
                  <td data-col="Écart constaté">Durées de conservation non définies</td>
                  <td data-col="Risque"><span className="pill m">moyen</span></td>
                  <td data-col="Action proposée">Politique de purge et paramétrage des outils</td>
                  <td data-col="Échéance"><span className="fill">délai</span></td>
                </tr>
                <tr>
                  <td data-col="Écart constaté">Mentions d’information incomplètes sur le formulaire de contact</td>
                  <td data-col="Risque"><span className="pill b">faible</span></td>
                  <td data-col="Action proposée">Réécriture des mentions</td>
                  <td data-col="Échéance"><span className="fill">délai</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="doc-note">
            Le niveau de risque exprime une appréciation, non un barème
            automatique : il tient compte de la nature des données, du volume, des
            personnes concernées et des mesures déjà en place.
          </div>
          <div className="doc-foot">
            <span>document de travail — couvert par le secret professionnel</span>
            <span>page 1 / <span className="fill">n</span></span>
          </div>
        </div>
      </div>
    ),
    explain: (
      <p className="explain">
        L’audit ne se limite pas au constat. Chaque écart est rattaché à un niveau
        de risque, à une action précise et à une échéance, de façon à pouvoir être
        suivi par la direction.
      </p>
    ),
  },
  {
    id: "spec-2",
    num: "02",
    name: "Registre des activités de traitement",
    accroche: "La base légale documentée, traitement par traitement",
    ariaLabel: "Aperçu : registre des activités de traitement",
    doc: (
      <div className="doc">
        <DocBrand badge="Registre art. 30" />
        <div className="doc-inner">
          <div className="doc-title">
            <h4>Registre des activités de traitement</h4>
            <span>
              responsable : <span className="fill">société</span> · version{" "}
              <span className="fill">n</span>
            </span>
          </div>
          <p className="scroll-hint">Faire défiler le tableau horizontalement</p>
          <div
            className="table-scroll"
            tabIndex={0}
            role="group"
            aria-label="Registre — tableau défilant horizontalement"
          >
            <table>
              <caption className="sr-only">Extrait du registre</caption>
              <thead>
                <tr>
                  <th scope="col">Traitement</th>
                  <th scope="col">Finalité</th>
                  <th scope="col">Base légale</th>
                  <th scope="col">Destinataires</th>
                  <th scope="col">Conservation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-col="Traitement">Gestion des clients</td>
                  <td data-col="Finalité">Exécution des commandes et facturation</td>
                  <td data-col="Base légale">Contrat</td>
                  <td data-col="Destinataires">Éditeur du CRM, expert-comptable</td>
                  <td data-col="Conservation"><span className="fill">durée</span> + prescription</td>
                </tr>
                <tr>
                  <td data-col="Traitement">Recrutement</td>
                  <td data-col="Finalité">Traitement des candidatures</td>
                  <td data-col="Base légale">Intérêt légitime</td>
                  <td data-col="Destinataires">Outil de recrutement</td>
                  <td data-col="Conservation"><span className="fill">durée</span> après le dernier contact</td>
                </tr>
                <tr>
                  <td data-col="Traitement">Prospection</td>
                  <td data-col="Finalité">Envoi d’informations commerciales</td>
                  <td data-col="Base légale">Consentement</td>
                  <td data-col="Destinataires">Outil d’emailing</td>
                  <td data-col="Conservation"><span className="fill">durée</span> après le dernier contact</td>
                </tr>
                <tr>
                  <td data-col="Traitement">Vidéoprotection des locaux</td>
                  <td data-col="Finalité">Sécurité des biens et des personnes</td>
                  <td data-col="Base légale"><span className="pill m">à qualifier</span></td>
                  <td data-col="Destinataires">Prestataire de sécurité</td>
                  <td data-col="Conservation"><span className="fill">durée</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="doc-note">
            Écart prioritaire : la base légale du traitement doit être identifiée
            et documentée.
          </div>
          <div className="doc-foot">
            <span>tenu par <span className="fill">fonction</span></span>
            <span>mise à jour : <span className="fill">date</span></span>
          </div>
        </div>
      </div>
    ),
    explain: (
      <p className="explain">
        Le registre recense chaque traitement, sa finalité, sa base légale, les
        destinataires et la durée de conservation. Il fait partie des principaux
        documents susceptibles d’être demandés lors d’un contrôle.
      </p>
    ),
  },
  {
    id: "spec-3",
    num: "03",
    name: "DPA sous-traitant — art. 28",
    accroche: "Les clauses que les éditeurs refusent, et comment elles se rédigent",
    ariaLabel: "Aperçu : contrat de sous-traitance, article 28",
    doc: (
      <div className="doc">
        <DocBrand badge="DPA art. 28" />
        <div className="doc-inner">
          <div className="doc-title">
            <h4>Accord de sous-traitance — révision des clauses</h4>
            <span>prestataire : <span className="fill">société</span></span>
          </div>

          <div className="clause">
            <p className="nom-clause">Recours à un sous-traitant ultérieur</p>
            <div className="diff">
              <div className="col recue">
                <span className="tag">version de départ</span>
                <p>Le prestataire peut recourir à tout sous-traitant de son choix pour l’exécution du service.</p>
              </div>
              <div className="col proposee">
                <span className="tag">rédaction proposée</span>
                <p>Le prestataire informe le responsable par écrit de tout projet de recours à un sous-traitant ultérieur. Le responsable dispose d’un délai de <span className="fill">n</span> jours pour s’y opposer. Le prestataire impose au sous-traitant ultérieur des obligations équivalentes aux siennes.</p>
              </div>
            </div>
          </div>

          <div className="clause">
            <p className="nom-clause">Violation de données</p>
            <div className="diff">
              <div className="col recue">
                <span className="tag">version de départ</span>
                <p>Le prestataire informe le client dans les meilleurs délais en cas d’incident de sécurité.</p>
              </div>
              <div className="col proposee">
                <span className="tag">rédaction proposée</span>
                <p>Le prestataire notifie au responsable toute violation de données dans un délai de <span className="fill">n</span> heures suivant sa connaissance, et lui communique les éléments nécessaires à l’appréciation du risque et, le cas échéant, à sa propre notification.</p>
              </div>
            </div>
          </div>

          <div className="clause">
            <p className="nom-clause">Sort des données en fin de contrat</p>
            <div className="diff">
              <div className="col recue">
                <span className="tag">version de départ</span>
                <p>Les données sont conservées par le prestataire à des fins d’archivage.</p>
              </div>
              <div className="col proposee">
                <span className="tag">rédaction proposée</span>
                <p>Au terme du contrat, le prestataire restitue ou supprime les données au choix du responsable, dans un délai de <span className="fill">n</span> jours, et lui en délivre attestation. Toute conservation ultérieure doit être justifiée par une obligation légale identifiée.</p>
              </div>
            </div>
          </div>

          <div className="doc-note">
            Les clauses de l’article 28 sont obligatoires dans leur objet, mais
            leur rédaction reste négociable : c’est à ce niveau que se répartit la
            charge réelle des obligations.
          </div>
          <div className="doc-foot">
            <span>annexes : description du traitement, mesures de sécurité</span>
            <span>page 1 / <span className="fill">n</span></span>
          </div>
        </div>
      </div>
    ),
    explain: (
      <p className="explain">
        Le cabinet ne se contente pas de vérifier la présence des clauses imposées
        par le règlement : il en réécrit la rédaction pour que les obligations du
        prestataire soient précises, datées et vérifiables. Ces clauses
        s’articulent avec le contrat principal, traité au titre des{" "}
        <Link href="/nos-domaines/contrats-informatiques">contrats informatiques</Link>.
      </p>
    ),
  },
  {
    id: "spec-4",
    num: "04",
    name: "Procédure de gestion d’une violation",
    accroche: "Notifier ou non : les critères de la décision",
    ariaLabel: "Aperçu : procédure de gestion d’une violation de données",
    doc: (
      <div className="doc">
        <DocBrand badge="Procédure art. 33" />
        <div className="doc-inner">
          <div className="doc-title">
            <h4>Procédure — violation de données personnelles</h4>
            <span>diffusion interne · version <span className="fill">n</span></span>
          </div>
          <h5>déroulé</h5>
          <ol>
            <li>Signalement interne au <span className="fill">fonction</span> et qualification des faits.</li>
            <li>Constitution du dossier technique : origine, périmètre, données et personnes concernées.</li>
            <li>Appréciation du risque pour les droits et libertés des personnes.</li>
            <li>Décision motivée de notifier ou non, consignée au registre des violations.</li>
            <li>Notification à la CNIL et, si le risque est élevé, information des personnes.</li>
            <li>Mesures correctrices et retour d’expérience.</li>
          </ol>
          <h5>éléments d’appréciation du risque</h5>
          <p className="scroll-hint">Faire défiler le tableau horizontalement</p>
          <div
            className="table-scroll"
            tabIndex={0}
            role="group"
            aria-label="Critères d’appréciation du risque — tableau défilant horizontalement"
          >
            <table>
              <caption className="sr-only">Critères d’appréciation</caption>
              <thead>
                <tr>
                  <th scope="col">Critère</th>
                  <th scope="col">À documenter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-col="Critère">Nature des données</td>
                  <td data-col="À documenter">Données sensibles, identifiants, données bancaires</td>
                </tr>
                <tr>
                  <td data-col="Critère">Volume et personnes concernées</td>
                  <td data-col="À documenter">Nombre, vulnérabilité éventuelle</td>
                </tr>
                <tr>
                  <td data-col="Critère">Conséquences prévisibles</td>
                  <td data-col="À documenter">Usurpation, fraude, atteinte à la réputation</td>
                </tr>
                <tr>
                  <td data-col="Critère">Mesures en place</td>
                  <td data-col="À documenter">Chiffrement, cloisonnement, réversibilité</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="doc-note">
            L’appréciation est conduite au cas par cas : la notification ne résulte
            pas d’un calcul automatique. La décision de ne pas notifier est motivée
            et conservée au même titre que la notification.
          </div>
          <div className="doc-foot">
            <span>contact d’alerte : <span className="fill">adresse interne</span></span>
            <span>page 1 / <span className="fill">n</span></span>
          </div>
        </div>
      </div>
    ),
    explain: (
      <p className="explain">
        La procédure fixe qui décide, sur quels critères et dans quel délai. Elle
        permet de démontrer la diligence de l’entreprise, y compris lorsque la
        notification n’est finalement pas requise.
      </p>
    ),
  },
];

export function SpecimenViewer() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Mention « faire défiler » affichée UNIQUEMENT quand un tableau déborde
  // réellement de sa carte (jamais en desktop si le tableau tient ; sous 620px
  // les tableaux sont recomposés en blocs, donc aucun débordement). Recalcul au
  // changement d'extrait, à l'ouverture de la modale et au redimensionnement.
  useEffect(() => {
    const sync = () => {
      const root = rootRef.current;
      if (!root) return;
      root.querySelectorAll<HTMLElement>(".table-scroll").forEach((box) => {
        const hint = box.previousElementSibling;
        if (!hint || !hint.classList.contains("scroll-hint")) return;
        const overflows = box.scrollWidth > box.clientWidth + 1;
        hint.classList.toggle("is-visible", overflows);
      });
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [active, zoomed]);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    track("specimen_ouvert", { specimen: SPECIMENS[i].id });
  };

  const openModal = (i: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActive(i);
    setZoomed(true);
    track("specimen_agrandi", { specimen: SPECIMENS[i].id });
  };

  const closeModal = useCallback(() => {
    setZoomed(false);
    triggerRef.current?.focus();
  }, []);

  // Verrou du défilement + classe body (masque la barre mobile) + focus initial.
  useEffect(() => {
    if (!zoomed) return;
    document.body.classList.add("rgpd-modal-open");
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.classList.remove("rgpd-modal-open");
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  // Échap + piégeage du focus dans la modale.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const f = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomed, closeModal]);

  return (
    <div ref={rootRef}>
      <div className="specimens">
        {SPECIMENS.map((s, i) => {
          const open = i === active;
          return (
            <Fragment key={s.id}>
              <button
                className="spec-btn"
                type="button"
                aria-expanded={open}
                aria-controls={s.id}
                onClick={() => select(i)}
              >
                <span className="num" aria-hidden="true">{s.num}</span>
                <span className="txt">
                  <span className="nom">{s.name}</span>
                  <span className="accroche">{s.accroche}</span>
                </span>
                <span className="dot" aria-hidden="true" />
                <span className="chev" aria-hidden="true" />
                <span className="sr-only">
                  {open ? "document affiché" : "document masqué"}
                </span>
              </button>
              <div
                className="spec-panel"
                id={s.id}
                role="region"
                aria-label={s.ariaLabel}
                hidden={!open}
              >
                {s.doc}
                {s.explain}
                <div className="spec-actions">
                  <button
                    className="btn-ghost"
                    type="button"
                    onClick={(e) => openModal(i, e.currentTarget)}
                  >
                    Agrandir le document
                  </button>
                </div>
              </div>
            </Fragment>
          );
        })}
        <p className="livr-mention">Extraits anonymisés · aucune donnée réelle</p>
      </div>

      {zoomed && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titre"
          ref={modalRef}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal-box">
            <div className="modal-head">
              <h2 id="modal-titre">{SPECIMENS[active].name}</h2>
              <button
                className="modal-close"
                type="button"
                onClick={closeModal}
                ref={closeBtnRef}
              >
                Fermer
              </button>
            </div>
            <div
              className="modal-body"
              tabIndex={0}
              aria-label={`Extrait : ${SPECIMENS[active].name}`}
            >
              {SPECIMENS[active].doc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
