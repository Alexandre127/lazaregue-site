"use client";

/*
 * Lazarègue Avocats — Mentions légales & Politique de confidentialité
 * ---------------------------------------------------------------------------
 * Deux onglets, une seule page. Charte v1.0 : Electric Blue #1A47FF (seul
 * accent), Deep Navy #0A0F2E, Bebas Neue (display), Space Grotesk (titres et
 * corps), DM Mono (labels), angles droits, aucune ombre.
 *
 * Toutes les mentions sont désormais renseignées (plus aucun passage « à
 * compléter »).
 *
 * Usage Next.js (app router) :
 *   app/mentions-legales/page.jsx        -> <PagesLegales initial="mentions" />
 *   app/politique-de-confidentialite/page.jsx -> <PagesLegales initial="donnees" />
 * Deux routes distinctes valent mieux qu'une pour le référencement ; l'onglet
 * reste utile comme navigation latérale entre les deux documents.
 */

import { useState, useEffect, useCallback } from "react";

/* -------------------------------------------------------------------------- */
/*  Constantes éditoriales                                                     */
/* -------------------------------------------------------------------------- */

const VERSION = "1.1";
const MAJ = "1er octobre 2026";

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

/** Paragraphe de corps. */
const P = ({ children }) => <p className="lz-p">{children}</p>;

/** Sous-titre interne à un article. */
const H3 = ({ children }) => <h3 className="lz-h3">{children}</h3>;

/** Liste. */
const UL = ({ children }) => <ul className="lz-ul">{children}</ul>;

/** Bloc d'identité : paires label / valeur en mono. */
const Fiche = ({ lignes }) => (
  <dl className="lz-fiche">
    {lignes.map(([k, v]) => (
      <div key={k} className="lz-fiche-row">
        <dt>{k}</dt>
        <dd>{v}</dd>
      </div>
    ))}
  </dl>
);

/* -------------------------------------------------------------------------- */
/*  Le registre — pièce maîtresse de la politique de confidentialité           */
/* -------------------------------------------------------------------------- */

const REGISTRE = [
  {
    traitement: "Prise de contact",
    finalite:
      "Répondre à une sollicitation, envoyer un accusé de réception, vérifier l'absence de conflit d'intérêts avant toute ouverture de dossier",
    base: "Mesures précontractuelles et intérêt légitime du cabinet",
    donnees: "Identité, coordonnées, objet de la demande",
    duree: "3 ans à compter du dernier échange si la demande n'est pas suivie d'un dossier",
  },
  {
    traitement: "Ouverture et conduite du dossier",
    finalite:
      "Exécution de la mission : conseil, rédaction, représentation en justice, facturation",
    base: "Exécution du contrat (convention d'honoraires)",
    donnees:
      "Identité, coordonnées, pièces du dossier, correspondances, données relatives aux tiers concernés par l'affaire",
    duree:
      "5 ans à compter de la fin de la mission, durée de la prescription de l'action en responsabilité contre l'avocat (art. 2225 du code civil)",
  },
  {
    traitement: "Vigilance et lutte contre le blanchiment",
    finalite:
      "Identification et vérification de l'identité du client et du bénéficiaire effectif, examen de la relation d'affaires",
    base: "Obligation légale (art. L. 561-5 et s. du code monétaire et financier)",
    donnees: "Pièce d'identité, justificatifs, origine des fonds",
    duree:
      "5 ans à compter de la fin de la relation d'affaires (art. L. 561-12 du code monétaire et financier)",
  },
  {
    traitement: "Comptabilité et facturation",
    finalite: "Émission et conservation des factures, tenue des comptes",
    base: "Obligation légale",
    donnees: "Identité, coordonnées de facturation, montants, règlements",
    duree: "10 ans à compter de la clôture de l'exercice (art. L. 123-22 du code de commerce)",
  },
  {
    traitement: "Publications et invitations",
    finalite:
      "Envoi des analyses du cabinet, des lettres d'information et des invitations aux évènements",
    base: "Consentement, retirable à tout moment",
    donnees: "Nom, adresse électronique, fonction et organisation",
    duree: "Jusqu'au retrait du consentement, et au plus tard 3 ans après le dernier contact",
  },
  {
    traitement: "Candidatures",
    finalite: "Instruction des candidatures spontanées et des réponses aux offres",
    base: "Mesures précontractuelles et intérêt légitime",
    donnees: "Curriculum vitæ, lettre, parcours, coordonnées",
    duree: "2 ans à compter du dernier contact, sauf demande de suppression",
  },
  {
    traitement: "Fonctionnement et sécurité du site",
    finalite:
      "Maintien en condition opérationnelle, journalisation, détection et traitement des incidents",
    base: "Intérêt légitime du cabinet à la sécurité de son système d'information",
    donnees: "Adresse IP, horodatage, données techniques de connexion",
    duree: "Durée appliquée par l'hébergeur (journaux techniques)",
  },
  {
    traitement: "Mesure d'audience sans cookie (Vercel Web Analytics)",
    finalite: "Compter la fréquentation du site de façon globale, pour en suivre l'usage",
    base: "Intérêt légitime du cabinet à mesurer l'audience de son site",
    donnees:
      "Données agrégées de navigation (page, source, pays, type d'appareil), sans cookie ni identifiant persistant ni adresse IP conservée",
    duree: "Aucun cookie ; la session de visite est automatiquement supprimée après 24 heures",
  },
  {
    traitement: "Mesure d'audience (Google Analytics 4)",
    finalite: "Statistiques de fréquentation et de parcours, amélioration éditoriale du site",
    base: "Consentement (art. 82 loi du 6 janvier 1978 ; art. 6.1.a RGPD)",
    donnees: "Pages consultées, parcours, source, données de navigation (cookies _ga)",
    duree: "Cookies : 13 mois. Transferts vers les États-Unis encadrés par le Data Privacy Framework",
  },
  {
    traitement: "Analyse de l'expérience (Microsoft Clarity)",
    finalite: "Cartes de chaleur et relecture agrégée de la navigation, avec masquage strict des saisies",
    base: "Consentement (art. 82 loi du 6 janvier 1978 ; art. 6.1.a RGPD)",
    donnees: "Interactions agrégées, défilement, clics (aucune donnée saisie)",
    duree: "Cookies : de la session à 1 an. Microsoft Corporation (États-Unis), Data Privacy Framework",
  },
  {
    traitement: "Suivi de la relation en ligne (HubSpot)",
    finalite: "Rattachement des visites à la fiche d'un prospect qui contacte le cabinet",
    base: "Consentement (art. 82 loi du 6 janvier 1978 ; art. 6.1.a RGPD)",
    donnees: "Pages vues, source, identifiant de suivi (cookies __hstc, hubspotutk…)",
    duree: "Cookies : 6 mois (__hstc, hubspotutk), 30 min (__hssc). Hébergement UE (eu1)",
  },
  {
    traitement: "Gestion des demandes de contact (CRM HubSpot)",
    finalite: "Traiter la demande adressée via le formulaire et en assurer le suivi",
    base: "Mesures précontractuelles et intérêt légitime du cabinet",
    donnees: "Objet, urgence, nom, organisation, e-mail, téléphone, message, page d'arrivée, UTM",
    duree:
      "3 ans à compter du dernier contact (demandes sans suite) ; clients : durée de la relation puis archivage légal. Hébergement UE (eu1) ; accès possible de sous-traitants depuis les États-Unis (Data Privacy Framework)",
  },
];

/* -------------------------------------------------------------------------- */
/*  Onglet 1 — Mentions légales                                                */
/* -------------------------------------------------------------------------- */

const MENTIONS = [
  {
    id: "editeur",
    titre: "Éditeur du site",
    corps: (
      <>
        <Fiche
          lignes={[
            [
              "éditeur",
              "Alexandre Lazarègue, entrepreneur individuel, exerçant sous le nom commercial Lazarègue Avocats",
            ],
            ["siège", "18 rue de Tilsitt, 75017 Paris"],
            ["SIREN", "823 894 142"],
            ["SIRET du siège", "823 894 142 00038"],
            ["activité", "69.10Z — activités juridiques, en exercice depuis le 2 novembre 2016"],
            ["TVA intracommunautaire", "FR24 823 894 142"],
            ["téléphone", "01 81 70 62 00"],
            ["courriel", "contact@lazaregue-avocats.fr"],
            ["directeur de la publication", "Alexandre Lazarègue, avocat au barreau de Paris"],
          ]}
        />
        <P>
          L&#39;avocat exerce une profession libérale qui n&#39;a pas le caractère commercial : le cabinet
          n&#39;est pas immatriculé au registre du commerce et des sociétés. Son inscription au barreau
          de Paris vaut habilitation à exercer et le place sous le contrôle du Conseil de l&#39;Ordre.
        </P>
        <P>
          Le site est édité par un cabinet d&#39;avocats. Sa consultation ne fait naître aucune
          relation entre son éditeur et son lecteur.
        </P>
      </>
    ),
  },
  {
    id: "hebergeur",
    titre: "Hébergement",
    corps: (
      <>
        <Fiche
          lignes={[
            ["hébergeur", "Vercel Inc., société de droit américain"],
            ["adresse", "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis"],
            ["téléphone", "+1 559 288 7060"],
            ["signalements", "dmca@vercel.com — abus et atteintes aux droits"],
          ]}
        />
        <P>
          Ces mentions sont exigées par l&#39;article 6 de la loi du 21 juin 2004 pour la confiance
          dans l&#39;économie numérique. Vercel exploite un réseau de diffusion mondial ; les
          coordonnées ci-dessus sont celles que la société publie pour la réception des
          signalements.
        </P>
      </>
    ),
  },
  {
    id: "profession",
    titre: "Une profession réglementée",
    corps: (
      <>
        <P>
          L&#39;avocat exerce une profession réglementée. Les mentions qui suivent sont imposées par
          la directive 2006/123/CE du 12 décembre 2006 relative aux services dans le marché
          intérieur.
        </P>
        <Fiche
          lignes={[
            ["titre", "Avocat, titre obtenu en France"],
            ["barreau", "Barreau de Paris"],
            ["ordre", "Ordre des avocats de Paris, 11 place Dauphine, 75001 Paris"],
            ["autorité de contrôle", "Conseil de l'Ordre du barreau de Paris"],
          ]}
        />
        <H3>Règles professionnelles</H3>
        <P>
          L&#39;exercice de la profession est régi par la loi n° 71-1130 du 31 décembre 1971, le
          décret n° 91-1197 du 27 novembre 1991, le décret n° 2005-790 du 12 juillet 2005 relatif
          aux règles de déontologie et le Règlement Intérieur National de la profession d&#39;avocat,
          consultable sur le site du Conseil national des barreaux, ainsi que par le Règlement
          Intérieur du barreau de Paris.
        </P>
        <H3>Assurances</H3>
        <P>
          Conformément à l&#39;article 27 de la loi du 31 décembre 1971, la responsabilité civile
          professionnelle du cabinet et la représentation des fonds sont garanties par les polices
          collectives souscrites par l&#39;Ordre des avocats de Paris pour l&#39;ensemble des avocats qui y
          sont inscrits. La garantie couvre les activités professionnelles exercées sur le
          territoire des États membres de l&#39;Union européenne.
        </P>
        <P>
          L&#39;attestation d&#39;inscription au barreau et l&#39;attestation annuelle d&#39;assurance sont
          communiquées sur simple demande.
        </P>
      </>
    ),
  },
  {
    id: "differends",
    titre: "Honoraires et règlement des différends",
    corps: (
      <>
        <P>
          Les honoraires sont fixés par une convention écrite conclue avant toute intervention,
          selon les critères de l&#39;article 10 de la loi du 31 décembre 1971.
        </P>
        <P>
          Tout différend relatif au montant et au recouvrement des honoraires relève du Bâtonnier
          de l&#39;Ordre des avocats de Paris, saisi selon la procédure prévue par les articles 174 et
          suivants du décret du 27 novembre 1991.
        </P>
        <P>
          Le client consommateur peut, après réclamation écrite adressée au cabinet et restée sans
          issue, saisir gratuitement le Médiateur de la consommation de la profession d&#39;avocat,
          conformément aux articles L. 612-1 et suivants du code de la consommation. Les modalités
          de saisine et les coordonnées du Médiateur sont accessibles sur le site
          mediateur-consommation-avocat.fr.
        </P>
      </>
    ),
  },
  {
    id: "propriete",
    titre: "Propriété intellectuelle",
    corps: (
      <>
        <P>
          La structure du site, sa charte graphique, ses développements, ses illustrations
          documentaires et l&#39;ensemble des analyses qui y sont publiées sont protégés par le code de
          la propriété intellectuelle. Le cabinet en est titulaire ou détient les droits nécessaires
          à leur exploitation.
        </P>
        <P>
          La citation d&#39;un extrait est admise sous réserve d&#39;indiquer clairement le nom de l&#39;auteur
          et la source. Toute autre reproduction, adaptation ou réutilisation, notamment à des fins
          d&#39;indexation, d&#39;entraînement de modèles ou de constitution de bases documentaires, est
          soumise à autorisation préalable écrite. L&#39;usage des données publiées sur ce site aux fins
          de fouille de textes et de données est expressément réservé au sens de l&#39;article
          L. 122-5-3 du code de la propriété intellectuelle.
        </P>
        <P>
          La dénomination Lazarègue Avocats, le logotype du cabinet et l&#39;ensemble des signes
          distinctifs qui l&#39;accompagnent sont la propriété de l&#39;éditeur. Leur usage par un tiers,
          y compris à titre de référencement ou de mot-clé publicitaire, est interdit.
        </P>
        <P>
          Photographies et séquences vidéo : propriété du cabinet ou exploitées sous licence.
          Certaines séquences d&#39;illustration ont été produites à l&#39;aide d&#39;outils de génération
          d&#39;images ; elles ne représentent aucune personne réelle.
        </P>
      </>
    ),
  },
  {
    id: "responsabilite",
    titre: "Contenu du site et responsabilité",
    corps: (
      <>
        <P>
          Les analyses publiées présentent l&#39;état du droit à la date de leur rédaction. Elles ont
          une valeur d&#39;information générale et ne constituent ni une consultation juridique, ni un
          avis sur une situation particulière. Une règle exacte appliquée à des faits mal qualifiés
          conduit à une décision erronée : seule l&#39;étude d&#39;un dossier permet une réponse.
        </P>
        <P>
          Les liens conduisant vers des sites tiers sont proposés à titre documentaire. Le cabinet
          n&#39;exerce aucun contrôle sur leur contenu et n&#39;en répond pas.
        </P>
        <P>
          Tout contenu manifestement illicite constaté sur ce site peut être signalé à l&#39;adresse
          contact@lazaregue-avocats.fr, qui traite les signalements dans les meilleurs délais.
        </P>
      </>
    ),
  },
  {
    id: "secret",
    titre: "Confidentialité des échanges",
    corps: (
      <>
        <P>
          Les correspondances entre un avocat et son client sont couvertes par le secret
          professionnel, qui est d&#39;ordre public, général et illimité dans le temps.
        </P>
        <div className="lz-avertissement">
          <span className="lz-avertissement-label">avant d&#39;écrire</span>
          <P>
            L&#39;envoi d&#39;un message par le formulaire de contact ne vaut pas acceptation de mission et
            ne fait naître aucune relation client. Tant que la vérification des conflits d&#39;intérêts
            n&#39;a pas été effectuée et qu&#39;une convention d&#39;honoraires n&#39;a pas été signée, il est
            recommandé de s&#39;en tenir à une description sommaire de la situation et de ne pas
            transmettre de pièces ni d&#39;informations sensibles.
          </P>
        </div>
        <P>
          La messagerie électronique ordinaire n&#39;est pas un canal sûr. Une fois le dossier ouvert,
          le cabinet indique le canal de transmission adapté à la sensibilité des pièces et à la
          nature de l&#39;affaire.
        </P>
      </>
    ),
  },
  {
    id: "droit-applicable",
    titre: "Droit applicable",
    corps: (
      <P>
        Le site et ses mentions sont soumis au droit français. Les juridictions françaises sont
        seules compétentes, sous réserve des règles impératives applicables aux consommateurs et de
        la compétence du Bâtonnier en matière d&#39;honoraires.
      </P>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Onglet 2 — Politique de confidentialité                                    */
/* -------------------------------------------------------------------------- */

const DONNEES = [
  {
    id: "responsable",
    titre: "Qui traite vos données",
    corps: (
      <>
        <P>
          Le responsable du traitement est Alexandre Lazarègue, avocat au barreau de Paris,
          exerçant sous le nom commercial Lazarègue Avocats, 18 rue de Tilsitt, 75017 Paris. Toute
          question relative aux données personnelles peut lui être adressée à
          contact@lazaregue-avocats.fr ou par courrier au siège.
        </P>
        <P>
          Le cabinet ne relève d&#39;aucun des cas de désignation obligatoire d&#39;un délégué à la
          protection des données prévus par l&#39;article 37 du règlement : les demandes sont instruites
          et signées par un avocat, tenu au secret professionnel, et non déléguées à un tiers.
        </P>
        <P>
          Cette politique s&#39;applique au site et à l&#39;ensemble des traitements mis en œuvre dans le
          cadre de l&#39;activité du cabinet. Elle est rédigée en application des articles 12 à 14 du
          règlement (UE) 2016/679.
        </P>
      </>
    ),
  },
  {
    id: "principe",
    titre: "Le principe qui gouverne le reste",
    corps: (
      <>
        <P>
          Dès votre premier message, vos échanges avec le cabinet sont protégés par le secret
          professionnel de l&#39;avocat (article 66-5 de la loi du 31 décembre 1971). Ce secret prime
          sur toute considération de commodité : il commande la limitation des données collectées, le
          choix des prestataires et la localisation des serveurs.
        </P>
        <P>Concrètement :</P>
        <UL>
          <li>seuls les avocats du cabinet lisent les demandes envoyées par le site ;</li>
          <li>
            aucune information n&#39;est transmise à un tiers, en dehors des prestataires techniques
            indispensables, cités plus bas (hébergement, messagerie, logiciel de suivi des
            demandes) ;
          </li>
          <li>
            si votre dossier nécessite l&#39;avis d&#39;un expert technique travaillant avec le cabinet,
            celui-ci ne reçoit que les éléments utiles à sa mission et s&#39;engage par écrit à les
            garder confidentiels.
          </li>
        </UL>
        <div className="lz-avertissement">
          <span className="lz-avertissement-label">un conseil</span>
          <P>
            Dans le formulaire, décrivez simplement votre situation. Les pièces et les détails
            sensibles pourront être transmis lors de votre premier échange avec un avocat, par un
            canal adapté.
          </P>
        </div>
        <P>
          Aucune donnée traitée par le cabinet n&#39;est vendue, louée, ni utilisée à des fins
          publicitaires. Aucune décision automatisée produisant des effets juridiques n&#39;est prise à
          votre égard.
        </P>
      </>
    ),
  },
  {
    id: "registre",
    titre: "Ce que le cabinet traite, et pourquoi",
    registre: true,
    corps: (
      <P>
        Chaque traitement répond à une finalité déterminée et à une base légale identifiée. Le
        tableau ci-dessous en reprend la substance ; il est tenu à jour en même temps que le
        registre interne prévu par l&#39;article 30 du règlement.
      </P>
    ),
  },
  {
    id: "origine",
    titre: "Données que vous ne nous avez pas transmises vous-même",
    corps: (
      <>
        <P>
          Un dossier contient nécessairement des données relatives à des personnes qui ne sont pas
          clientes du cabinet : parties adverses, salariés, témoins, dirigeants, auteurs présumés
          d&#39;agissements. Ces données proviennent du client, des pièces de la procédure, des
          décisions de justice, des registres publics et des sources ouvertes.
        </P>
        <P>
          Leur traitement est nécessaire à la constatation, à l&#39;exercice ou à la défense d&#39;un droit
          en justice. L&#39;information individuelle de ces personnes est écartée lorsqu&#39;elle est
          impossible, exige des efforts disproportionnés, ou compromettrait l&#39;objet même du
          traitement et le secret professionnel, conformément à l&#39;article 14 du règlement.
        </P>
      </>
    ),
  },
  {
    id: "destinataires",
    titre: "Qui y a accès",
    corps: (
      <>
        <P>Les données ne sont accessibles qu&#39;aux personnes qui en ont besoin :</P>
        <UL>
          <li>les avocats et collaborateurs du cabinet, tenus au secret professionnel ;</li>
          <li>
            les auxiliaires de justice et intervenants du dossier lorsque la mission l&#39;exige :
            juridictions, greffes, huissiers, avocats postulants, experts, confrères de la partie
            adverse ;
          </li>
          <li>
            les prestataires techniques du cabinet, liés par un contrat de sous-traitance conforme
            à l&#39;article 28 du règlement, et limités à quatre catégories : hébergement du site
            (Vercel Inc., États-Unis), messagerie professionnelle, logiciel de gestion des
            dossiers, diffusion des lettres d&#39;information. La liste nominative complète est
            communiquée sur demande ;
          </li>
          <li>l&#39;expert-comptable et, le cas échéant, le commissaire aux comptes.</li>
        </UL>
        <P>
          Les prestataires techniques qui interviennent pour le site et le suivi des demandes sont les
          suivants. Chacun n&#39;utilise vos données que pour sa mission, dans le cadre d&#39;un contrat
          conforme au RGPD.
        </P>
        <TablePrestataires />
        <P>
          Les demandes de communication émanant d&#39;une autorité ne sont satisfaites que dans les
          formes et limites prévues par la loi, en particulier celles qui protègent le secret
          professionnel et exigent l&#39;intervention du Bâtonnier.
        </P>
      </>
    ),
  },
  {
    id: "transferts",
    titre: "Hors de l'Union européenne",
    corps: (
      <>
        <P>
          L&#39;hébergement du site est assuré par Vercel Inc., société de droit américain établie en
          Californie. Le recours à ce prestataire emporte un transfert de données hors de l&#39;Union
          européenne. Ce transfert est identifié, circonscrit et encadré.
        </P>
        <H3>Ce qui est transféré</H3>
        <P>
          Les seules données concernées sont celles qui transitent nécessairement par
          l&#39;infrastructure du site : données techniques de connexion et, le cas échéant, le contenu
          d&#39;un message adressé par le formulaire de contact. Le site ne comporte ni espace client,
          ni base documentaire, ni annuaire de dossiers : aucune pièce, aucune correspondance
          couverte par le secret professionnel n&#39;y est hébergée.
        </P>
        <H3>Ce qui l&#39;encadre</H3>
        <P>
          Vercel Inc. intervient en qualité de sous-traitant, sur la base d&#39;un accord de traitement
          conforme à l&#39;article 28 du règlement. La société déclare adhérer au cadre de protection
          des données UE — États-Unis, qui a fait l&#39;objet de la décision d&#39;adéquation de la
          Commission européenne du 10 juillet 2023, et recourir en outre aux clauses contractuelles
          types pour les transferts qui n&#39;en relèveraient pas. Sa certification est vérifiable sur
          le registre public du Département du commerce des États-Unis.
        </P>
        <P>
          Le cabinet suit l&#39;évolution de ce cadre, dont la validité est contestée devant le juge de
          l&#39;Union. Une remise en cause de la décision d&#39;adéquation conduirait au réexamen immédiat
          de cet hébergement.
        </P>
        <H3>Les autres transferts possibles</H3>
        <P>
          Si vous acceptez les outils de mesure facultatifs, Google et Microsoft peuvent traiter
          certaines données aux États-Unis, dans le même cadre (Data Privacy Framework du 10 juillet
          2023, complété par les clauses contractuelles types). Le logiciel de suivi des demandes,
          HubSpot, héberge les données dans l&#39;Union européenne (région eu1)&nbsp;; certains de ses
          sous-traitants peuvent toutefois y accéder depuis les États-Unis, dans le même cadre.
          Le détail de ces outils figure dans la{" "}
          <a className="lz-lien-inline" href="/politique-cookies">
            politique de cookies
          </a>
          .
        </P>
        <P>
          Un dossier peut par ailleurs exiger la communication de pièces à une juridiction ou à une
          autorité étrangère. Une telle communication n&#39;intervient que dans le respect de la loi du
          26 juillet 1968, dite loi de blocage, et des voies d&#39;entraide judiciaire.
        </P>
      </>
    ),
  },
  {
    id: "securite",
    titre: "Sécurité et archivage",
    corps: (
      <>
        <P>
          Les mesures techniques et organisationnelles sont proportionnées aux risques et reposent
          sur quatre principes : le contrôle des accès, poste par poste et dossier par dossier ; le
          chiffrement des supports et des sauvegardes ; la journalisation des accès aux systèmes ;
          la mise à jour et la sensibilisation continues. Leur détail n&#39;est pas publié — la
          description publique d&#39;un dispositif de sécurité en affaiblit l&#39;effet — mais il est
          communiqué au client qui en fait la demande.
        </P>
        <P>
          À l&#39;expiration des durées mentionnées au registre, les données sont supprimées ou
          archivées sous une forme excluant leur usage courant. Les dossiers papier restitués au
          client le sont contre décharge ; ceux qui ne sont pas réclamés sont détruits dans des
          conditions garantissant la confidentialité.
        </P>
        <P>
          En cas de violation de données susceptible d&#39;engendrer un risque pour les personnes, le
          cabinet notifie la CNIL dans les 72 heures et informe les personnes concernées lorsque le
          risque est élevé.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    titre: "Traceurs et mesure d'audience",
    corps: (
      <>
        <P>
          Le site ne dépose sans votre accord que les traceurs strictement nécessaires à son
          fonctionnement et à sa sécurité, ainsi qu&#39;un cookie conservant votre choix de
          consentement. La fréquentation est mesurée de façon globale, sans cookie et sans vous
          identifier (Vercel Web Analytics), au titre de l&#39;intérêt légitime du cabinet.
        </P>
        <P>
          Les autres outils de mesure (Google Analytics, Microsoft Clarity, suivi HubSpot) ne sont
          activés qu&#39;avec votre consentement, recueilli finalité par finalité au moyen du bandeau,
          et révocable à tout moment via le lien «&nbsp;Gérer les cookies&nbsp;» en pied de page.
          Aucun traceur publicitaire, aucun profilage publicitaire, aucune donnée vendue.
        </P>
        <P>
          Le détail de ces outils, des cookies déposés, de leurs durées et des transferts hors Union
          européenne figure dans la{" "}
          <a className="lz-lien-inline" href="/politique-cookies">
            politique de cookies
          </a>
          .
        </P>
        <P>
          <strong>Formulaire de contact et CRM.</strong> Lorsque vous utilisez le formulaire, votre
          demande (objet, degré d&#39;urgence, nom, organisation, e-mail, téléphone, message), ainsi
          que la page d&#39;arrivée et les paramètres de campagne (UTM) présents dans l&#39;adresse,
          sont transmis au logiciel de suivi HubSpot afin de traiter votre demande et d&#39;en assurer
          le suivi. Cette transmission est effectuée côté serveur, indépendamment des cookies et de
          votre choix relatif aux traceurs. Les demandes adressées au cabinet peuvent contenir des
          informations couvertes par le secret professionnel&nbsp;; l&#39;accès au logiciel de suivi
          est strictement réservé au cabinet. Ces données sont conservées trois ans à compter du
          dernier contact pour les demandes qui n&#39;aboutissent pas à une relation client&nbsp;;
          pour les clients, pendant la durée de la relation, puis archivées selon les obligations
          légales applicables.
        </P>
      </>
    ),
  },
  {
    id: "droits",
    titre: "Vos droits",
    droits: true,
    corps: (
      <>
        <P>
          Ces droits s&#39;exercent auprès du cabinet, à l&#39;adresse indiquée en tête de la présente
          politique. Une réponse est apportée dans le délai d&#39;un mois, prorogeable de deux mois pour
          les demandes complexes. Une preuve d&#39;identité peut être demandée en cas de doute
          raisonnable.
        </P>
        <H3>Ce que le secret professionnel limite</H3>
        <P>
          Lorsque les données figurent dans le dossier d&#39;une affaire, l&#39;exercice de ces droits par
          un tiers peut être restreint pour préserver le secret professionnel, les droits de la
          défense et le bon déroulement d&#39;une procédure judiciaire. Le cabinet motive alors sa
          réponse et indique les voies de recours.
        </P>
        <H3>Après le décès</H3>
        <P>
          Toute personne peut définir des directives relatives au sort de ses données après son
          décès, en application de l&#39;article 85 de la loi du 6 janvier 1978. Le cabinet s&#39;y
          conforme, sous réserve des règles applicables à la conservation des dossiers.
        </P>
        <H3>Réclamation</H3>
        <P>
          Une réclamation peut être adressée à la Commission nationale de l&#39;informatique et des
          libertés, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou déposée en ligne sur
          son site.
        </P>
      </>
    ),
  },
  {
    id: "evolution",
    titre: "Évolution du document",
    corps: (
      <P>
        La présente politique est datée et versionnée. Toute modification substantielle est portée à
        la connaissance des personnes concernées avant son entrée en vigueur. Les versions
        antérieures sont conservées par le cabinet et communiquées sur demande.
      </P>
    ),
  },
];

const DROITS = [
  ["Accès", "Obtenir la confirmation qu'un traitement existe et en recevoir une copie", "art. 15"],
  ["Rectification", "Corriger une donnée inexacte ou incomplète", "art. 16"],
  ["Effacement", "Obtenir la suppression, hors obligation de conservation", "art. 17"],
  ["Limitation", "Geler l'usage d'une donnée le temps d'une vérification", "art. 18"],
  ["Portabilité", "Récupérer les données fournies dans un format lisible", "art. 20"],
  ["Opposition", "S'opposer à un traitement fondé sur l'intérêt légitime", "art. 21"],
  ["Retrait", "Retirer un consentement à tout moment, sans effet rétroactif", "art. 7"],
];

// Prestataires techniques nommés (point « Qui y a accès » + « Hors de l'UE »).
const PRESTATAIRES = [
  [
    "Vercel",
    "Héberge le site et en mesure la fréquentation sans cookie",
    "États-Unis — adhérent au cadre de protection des données UE — États-Unis (Data Privacy Framework)",
  ],
  ["IONOS", "Messagerie électronique du cabinet", "Union européenne"],
  [
    "HubSpot",
    "Logiciel de suivi des demandes (CRM) et, après consentement, suivi des visites",
    "Union européenne (région eu1) ; un accès technique de sous-traitants depuis les États-Unis reste possible (Data Privacy Framework)",
  ],
  [
    "Google",
    "Statistiques de fréquentation détaillées, uniquement si vous les acceptez",
    "Union européenne et États-Unis (Data Privacy Framework)",
  ],
  [
    "Microsoft",
    "Analyse de l'utilisation des pages, uniquement si vous l'acceptez",
    "États-Unis (Data Privacy Framework)",
  ],
];

/* -------------------------------------------------------------------------- */
/*  Onglet 3 — Politique de cookies                                            */
/* -------------------------------------------------------------------------- */

// Cookie déposé sans consentement (fonctionnement / mémorisation du choix).
const COOKIE_NECESSAIRE = [
  [
    "lz_consent",
    "Retenir vos choix de consentement, pour ne pas vous les redemander à chaque page",
    "6 mois",
  ],
];

// Cookies soumis au consentement, finalité par finalité.
const COOKIES_CONSENTEMENT = [
  {
    role: "Statistiques de fréquentation : pages les plus lues, chemin suivi sur le site, provenance des visiteurs, envoi d'une demande",
    outil: "Google Analytics 4 (Google)",
    cookies: "_ga, _ga_…",
    duree: "13 mois maximum",
  },
  {
    role: "Amélioration des pages : repérer où les visiteurs cliquent, hésitent ou s'arrêtent. Ce que vous écrivez dans les formulaires et le texte affiché ne sont jamais enregistrés.",
    outil: "Microsoft Clarity",
    cookies: "_clck, _clsk (et des cookies de domaine Microsoft : MUID, CLID…)",
    duree: "_clck : jusqu'à 1 an ; _clsk : environ 1 jour",
  },
  {
    role: "Suivi de votre demande : si vous écrivez au cabinet, relier vos visites précédentes à votre demande, pour mieux en comprendre l'objet",
    outil: "HubSpot",
    cookies: "__hstc, hubspotutk, __hssc, __hssrc",
    duree: "6 mois, 6 mois, 30 minutes, durée de la session",
  },
];

const COOKIES = [
  {
    id: "definition",
    titre: "Qu'est-ce qu'un cookie",
    corps: (
      <P>
        Un cookie est un petit fichier enregistré sur votre ordinateur, votre téléphone ou votre
        tablette lorsque vous visitez un site. Certains sont indispensables à son fonctionnement.
        D&#39;autres servent à mesurer sa fréquentation ou à comprendre comment il est utilisé&nbsp;:
        ceux-là ne sont déposés <strong>que si vous les acceptez</strong>.
      </P>
    ),
  },
  {
    id: "controle",
    titre: "Vous gardez la main",
    corps: (
      <UL>
        <li>
          <strong>Rien n&#39;est activé sans votre accord.</strong> Tant que vous n&#39;avez pas fait
          de choix, aucun cookie facultatif n&#39;est déposé.
        </li>
        <li>
          <strong>Refuser est aussi simple qu&#39;accepter.</strong> Les boutons «&nbsp;Tout
          accepter&nbsp;» et «&nbsp;Tout refuser&nbsp;» sont présentés côte à côte, de la même façon.
        </li>
        <li>
          <strong>Vous pouvez choisir au cas par cas</strong>, avec le bouton
          «&nbsp;Personnaliser&nbsp;».
        </li>
        <li>
          <strong>Refuser ne change rien à votre visite</strong>&nbsp;: l&#39;ensemble du site reste
          accessible.
        </li>
        <li>
          <strong>Vous pouvez changer d&#39;avis à tout moment</strong>, avec le lien «&nbsp;Gérer
          les cookies&nbsp;», en bas de chaque page.
        </li>
      </UL>
    ),
  },
  {
    id: "necessaires",
    titre: "Le cookie qui ne nécessite pas votre accord",
    tableNecessaire: true,
    corps: (
      <P>
        Un seul cookie est déposé sans votre accord&nbsp;: il sert à retenir votre choix de
        consentement. La mesure de fréquentation globale (Vercel Web Analytics) ne dépose, elle,
        aucun cookie et ne vous identifie pas&nbsp;: les visites sont comptées au moyen d&#39;un
        identifiant éphémère, supprimé après 24&nbsp;heures. Elle ne nécessite donc pas votre accord.
      </P>
    ),
  },
  {
    id: "consentement",
    titre: "Les cookies soumis à votre accord",
    tableConsentement: true,
    corps: (
      <>
        <P>
          Ces cookies ne sont déposés qu&#39;après votre consentement, recueilli finalité par
          finalité.
        </P>
      </>
    ),
    apres: (
      <>
        <P>
          Les statistiques détaillées sont conservées <strong>14 mois au plus</strong>, puis
          supprimées.
        </P>
        <P>
          <strong>Le site n&#39;utilise aucun traceur publicitaire</strong>
          {" "}et aucun bouton de partage vers les réseaux sociaux. Seul Microsoft Clarity, s&#39;il
          est accepté, peut déposer des cookies Microsoft susceptibles d&#39;être utilisés au-delà de
          ce site.
        </P>
      </>
    ),
  },
  {
    id: "fonctionnement",
    titre: "Comment cela fonctionne",
    corps: (
      <P>
        Ces outils sont pilotés par Google Tag Manager, qui applique vos choix&nbsp;: chaque outil ne
        s&#39;active que si vous avez accepté ce qu&#39;il fait (Consent Mode&nbsp;v2). Si vous
        refusez, aucun n&#39;est chargé.
      </P>
    ),
  },
  {
    id: "duree-choix",
    titre: "Combien de temps votre choix est-il retenu",
    corps: (
      <P>
        Votre choix, que vous ayez accepté ou refusé, est conservé <strong>6 mois</strong>. Il vous
        est ensuite demandé à nouveau.
      </P>
    ),
  },
  {
    id: "changer",
    titre: "Changer d'avis",
    corps: (
      <UL>
        <li>
          <strong>Sur le site</strong>&nbsp;: cliquez sur «&nbsp;Gérer les cookies&nbsp;», en bas de
          chaque page. Vous pouvez y retirer votre accord aussi simplement que vous l&#39;avez donné.
        </li>
        <li>
          <strong>Dans votre navigateur</strong>&nbsp;: vous pouvez bloquer ou supprimer les cookies
          dans ses réglages. Ce choix s&#39;appliquera à tous les sites que vous visitez.
        </li>
      </UL>
    ),
  },
  {
    id: "savoir-plus",
    titre: "Pour en savoir plus",
    corps: (
      <P>
        Les garanties prévues lorsque des données sont traitées hors de l&#39;Union européenne, ainsi
        que vos droits et la façon de les exercer, sont expliqués dans la{" "}
        <a className="lz-lien-inline" href="/politique-de-confidentialite">
          politique de confidentialité
        </a>
        .
      </P>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const ONGLETS = [
  { cle: "mentions", label: "mentions légales", titre: "MENTIONS LÉGALES", sections: MENTIONS },
  {
    cle: "donnees",
    label: "politique de confidentialité",
    titre: "DONNÉES PERSONNELLES",
    sections: DONNEES,
  },
  {
    cle: "cookies",
    label: "politique de cookies",
    titre: "COOKIES",
    sections: COOKIES,
  },
];

export default function PagesLegales({ initial = "mentions" }) {
  const [onglet, setOnglet] = useState(initial);
  const [actif, setActif] = useState(null);
  const courant = ONGLETS.find((o) => o.cle === onglet) ?? ONGLETS[0];

  // Sommaire : mise en évidence de la section lue.
  useEffect(() => {
    const cibles = document.querySelectorAll("[data-lz-section]");
    if (!cibles.length) return;
    const obs = new IntersectionObserver(
      (entrees) => {
        const visible = entrees
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActif(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    cibles.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [onglet]);

  const aller = useCallback((e, id) => {
    e.preventDefault();
    const cible = document.getElementById(id);
    if (!cible) return;
    cible.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }, []);

  return (
    <div className="lz-legal">
      <style>{CSS}</style>

      {/* Masthead ---------------------------------------------------------- */}
      <header className="lz-masthead">
        <div className="lz-wrap">
          <p className="lz-kicker">
            Lazarègue Avocats · document juridique · version {VERSION} · à jour au {MAJ}
          </p>
          <h1 className="lz-h1">{courant.titre}</h1>
          {courant.chapo && <p className="lz-chapo">{courant.chapo}</p>}

          <nav className="lz-tabs" aria-label="Documents légaux">
            {ONGLETS.map((o) => (
              <button
                key={o.cle}
                type="button"
                onClick={() => setOnglet(o.cle)}
                aria-current={o.cle === onglet ? "page" : undefined}
                className={`lz-tab${o.cle === onglet ? " est-actif" : ""}`}
              >
                {o.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Corps ------------------------------------------------------------- */}
      <div className="lz-wrap lz-grille">
        <aside className="lz-sommaire" aria-label="Sommaire">
          <p className="lz-sommaire-titre">sommaire</p>
          <ol>
            {courant.sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => aller(e, s.id)}
                  className={actif === s.id ? "est-actif" : undefined}
                >
                  <span className="lz-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.titre}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <main className="lz-contenu">
          {courant.sections.map((s, i) => (
            <section key={s.id} id={s.id} data-lz-section className="lz-section">
              <h2 className="lz-h2">
                <span className="lz-article">article {String(i + 1).padStart(2, "0")}</span>
                {s.titre}
              </h2>
              {s.corps}
              {s.registre && <Registre />}
              {s.droits && <TableauDroits />}
              {s.tableNecessaire && <TableCookieNecessaire />}
              {s.tableConsentement && <TableCookiesConsentement />}
              {s.apres}
            </section>
          ))}

          <p className="lz-fin">
            Fin du document · version {VERSION} · {MAJ}
          </p>
        </main>
      </div>

      {/* Pied -------------------------------------------------------------- */}
      <footer className="lz-pied">
        <div className="lz-wrap lz-pied-grille">
          <div>
            <p className="lz-pied-titre">Une question sur vos données</p>
            <p className="lz-pied-txt">
              Une demande d&#39;accès, de rectification ou d&#39;effacement s&#39;écrit en trois lignes. Elle est
              traitée par un avocat, pas par un formulaire.
            </p>
          </div>
          <a className="lz-lien-fort" href="mailto:contact@lazaregue-avocats.fr">
            contact@lazaregue-avocats.fr
          </a>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Le registre — rendu « pièce du dossier »                                   */
/* -------------------------------------------------------------------------- */

function Registre() {
  return (
    <figure className="lz-piece">
      <figcaption className="lz-piece-entete">
        <span className="lz-piece-label">extrait du registre des traitements</span>
        <span className="lz-piece-meta">art. 30 RGPD · rév. {MAJ}</span>
      </figcaption>
      <div className="lz-piece-scroll">
        <table className="lz-table">
          <thead>
            <tr>
              <th scope="col">traitement</th>
              <th scope="col">finalité</th>
              <th scope="col">base légale</th>
              <th scope="col">données</th>
              <th scope="col">conservation</th>
            </tr>
          </thead>
          <tbody>
            {REGISTRE.map((r) => (
              <tr key={r.traitement}>
                <th scope="row" data-lb="traitement">
                  {r.traitement}
                </th>
                <td data-lb="finalité">{r.finalite}</td>
                <td data-lb="base légale">{r.base}</td>
                <td data-lb="données">{r.donnees}</td>
                <td data-lb="conservation">{r.duree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="lz-piece-note">
        Les durées indiquées sont des durées maximales. Une donnée devenue inutile à la finalité
        poursuivie est supprimée avant leur terme.
      </p>
    </figure>
  );
}

function TableauDroits() {
  return (
    <ul className="lz-droits">
      {DROITS.map(([nom, texte, ref]) => (
        <li key={nom}>
          <span className="lz-droit-nom">{nom}</span>
          <span className="lz-droit-txt">{texte}</span>
          <span className="lz-droit-ref">{ref}</span>
        </li>
      ))}
    </ul>
  );
}

/** Tableau des prestataires techniques nommés, lisible en pile sur mobile. */
function TablePrestataires() {
  return (
    <figure className="lz-piece">
      <figcaption className="lz-piece-entete">
        <span className="lz-piece-label">prestataires techniques</span>
        <span className="lz-piece-meta">sous-traitants · art. 28 RGPD</span>
      </figcaption>
      <div className="lz-piece-scroll">
        <table className="lz-table lz-table-3">
          <thead>
            <tr>
              <th scope="col">prestataire</th>
              <th scope="col">son rôle</th>
              <th scope="col">où sont les données</th>
            </tr>
          </thead>
          <tbody>
            {PRESTATAIRES.map(([nom, role, lieu]) => (
              <tr key={nom}>
                <th scope="row" data-lb="prestataire">
                  {nom}
                </th>
                <td data-lb="son rôle">{role}</td>
                <td data-lb="où sont les données">{lieu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="lz-piece-note">
        La liste nominative complète, avec les coordonnées de chaque prestataire, est communiquée sur
        demande.
      </p>
    </figure>
  );
}

/** Politique de cookies — cookie nécessaire (mémorisation du choix). */
function TableCookieNecessaire() {
  return (
    <figure className="lz-piece">
      <figcaption className="lz-piece-entete">
        <span className="lz-piece-label">cookie nécessaire</span>
        <span className="lz-piece-meta">sans consentement · art. 82 loi 1978</span>
      </figcaption>
      <div className="lz-piece-scroll">
        <table className="lz-table lz-table-3">
          <thead>
            <tr>
              <th scope="col">cookie</th>
              <th scope="col">à quoi il sert</th>
              <th scope="col">durée</th>
            </tr>
          </thead>
          <tbody>
            {COOKIE_NECESSAIRE.map(([nom, role, duree]) => (
              <tr key={nom}>
                <th scope="row" data-lb="cookie">
                  <code>{nom}</code>
                </th>
                <td data-lb="à quoi il sert">{role}</td>
                <td data-lb="durée">{duree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** Politique de cookies — cookies soumis au consentement. */
function TableCookiesConsentement() {
  return (
    <figure className="lz-piece">
      <figcaption className="lz-piece-entete">
        <span className="lz-piece-label">cookies soumis à votre accord</span>
        <span className="lz-piece-meta">consentement · finalité par finalité</span>
      </figcaption>
      <div className="lz-piece-scroll">
        <table className="lz-table lz-table-cons">
          <thead>
            <tr>
              <th scope="col">ce qu&#39;ils permettent</th>
              <th scope="col">outil</th>
              <th scope="col">cookies</th>
              <th scope="col">durée</th>
            </tr>
          </thead>
          <tbody>
            {COOKIES_CONSENTEMENT.map((c) => (
              <tr key={c.outil}>
                <th scope="row" data-lb="ce qu'ils permettent">
                  {c.role}
                </th>
                <td data-lb="outil">{c.outil}</td>
                <td data-lb="cookies">
                  <code>{c.cookies}</code>
                </td>
                <td data-lb="durée">{c.duree}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Styles — charte v1.0                                                       */
/* -------------------------------------------------------------------------- */

const CSS = `
.lz-legal{
  --bleu:#1A47FF; --bleu-fonce:#0A2ACC; --navy:#0A0F2E; --encre:#0A0A14;
  --ghost:#F4F4F8; --blanc:#FFFFFF; --muted:#8888A0; --bord:#E0E0EE;
  --display:'Bebas Neue',Impact,sans-serif;
  --texte:'Space Grotesk',system-ui,sans-serif;
  --mono:'DM Mono','IBM Plex Mono',ui-monospace,monospace;
  background:var(--blanc); color:var(--encre); font-family:var(--texte);
  font-size:16px; line-height:1.65; -webkit-font-smoothing:antialiased;
}
.lz-wrap{max-width:1180px;margin:0 auto;padding:0 24px;}

/* Masthead */
.lz-masthead{background:var(--navy);color:var(--blanc);padding:88px 0 0;}
.lz-kicker{font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:#9AA3C4;margin:0 0 28px;}
.lz-h1{font-family:var(--display);font-weight:400;font-size:clamp(56px,9vw,116px);line-height:.9;
  letter-spacing:.01em;margin:0;max-width:14ch;}
.lz-chapo{font-weight:300;font-style:italic;font-size:clamp(16px,1.6vw,19px);color:#C9CEE4;
  max-width:56ch;margin:28px 0 48px;}
.lz-tabs{display:flex;gap:0;border-top:1px solid rgba(255,255,255,.16);margin-top:48px;flex-wrap:wrap;}
.lz-tab{appearance:none;background:none;border:0;border-top:2px solid transparent;margin-top:-1px;
  padding:20px 28px 20px 0;margin-right:36px;cursor:pointer;color:#9AA3C4;
  font-family:var(--mono);font-size:12px;letter-spacing:.16em;transition:color .18s;}
.lz-tab:hover{color:var(--blanc);}
.lz-tab.est-actif{color:var(--blanc);border-top-color:var(--bleu);}
.lz-tab:focus-visible{outline:2px solid var(--bleu);outline-offset:4px;}

/* Grille */
.lz-grille{display:grid;grid-template-columns:230px 1fr;gap:72px;padding-top:72px;padding-bottom:96px;align-items:start;}
@media(max-width:900px){.lz-grille{grid-template-columns:1fr;gap:40px;padding-top:44px;}}

/* Sommaire */
.lz-sommaire{position:sticky;top:96px;}
@media(max-width:900px){.lz-sommaire{position:static;border-bottom:1px solid var(--bord);padding-bottom:24px;}}
.lz-sommaire-titre{font-family:var(--mono);font-size:11px;letter-spacing:.22em;color:var(--muted);
  margin:0 0 18px;padding-bottom:12px;border-bottom:1px solid var(--bord);}
.lz-sommaire ol{list-style:none;margin:0;padding:0;}
.lz-sommaire li{margin-bottom:2px;}
.lz-sommaire a{display:flex;gap:12px;text-decoration:none;color:var(--encre);font-size:13.5px;
  line-height:1.4;padding:7px 0;border-left:2px solid transparent;padding-left:0;transition:color .18s;}
.lz-sommaire a:hover{color:var(--bleu);}
.lz-sommaire a.est-actif{color:var(--bleu);}
.lz-sommaire a.est-actif .lz-num{color:var(--bleu);}
.lz-num{font-family:var(--mono);font-size:11px;color:var(--muted);padding-top:2px;}

/* Contenu */
.lz-contenu{max-width:70ch;}
.lz-section{padding-bottom:56px;margin-bottom:56px;border-bottom:1px solid var(--bord);}
.lz-section:last-of-type{border-bottom:0;}
.lz-h2{font-size:clamp(24px,3vw,30px);font-weight:500;line-height:1.2;margin:0 0 24px;letter-spacing:-.01em;}
.lz-article{display:block;font-family:var(--mono);font-size:11px;font-weight:400;letter-spacing:.2em;
  color:var(--bleu);margin-bottom:12px;}
.lz-h3{font-size:16px;font-weight:500;margin:32px 0 10px;}
/* Couleur explicite : le CSS global du site applique « p { color:blanc } »
   (dans @layer base). Sans couleur propre, les paragraphes du document
   héritaient de ce blanc et devenaient invisibles sur fond blanc. */
.lz-p{margin:0 0 18px;color:var(--encre);}
.lz-ul{margin:0 0 18px;padding-left:0;list-style:none;}
.lz-ul li{position:relative;padding-left:22px;margin-bottom:10px;}
.lz-ul li::before{content:"";position:absolute;left:0;top:11px;width:8px;height:1px;background:var(--bleu);}

/* Fiche d'identité */
.lz-fiche{margin:0 0 24px;border-top:1px solid var(--bord);}
.lz-fiche-row{display:grid;grid-template-columns:200px 1fr;gap:20px;padding:12px 0;border-bottom:1px solid var(--bord);}
@media(max-width:600px){.lz-fiche-row{grid-template-columns:1fr;gap:4px;}}
.lz-fiche dt{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--muted);padding-top:4px;}
.lz-fiche dd{margin:0;font-size:15px;}

/* Mention à compléter */
.lz-ac{background:rgba(26,71,255,.13);color:var(--bleu-fonce);
  padding:.05em .3em;box-decoration-break:clone;-webkit-box-decoration-break:clone;}

/* Avertissement */
.lz-avertissement{border-left:2px solid var(--bleu);background:var(--ghost);padding:20px 24px;margin:24px 0;}
.lz-avertissement .lz-p{margin:0;}
.lz-avertissement-label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.2em;
  color:var(--bleu);margin-bottom:8px;}

/* Pièce : le registre */
.lz-piece{margin:32px 0 8px;border:1px solid var(--bord);background:var(--blanc);}
.lz-piece-entete{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap;
  background:var(--navy);color:var(--blanc);padding:14px 18px;}
.lz-piece-label{font-family:var(--mono);font-size:11px;letter-spacing:.2em;}
.lz-piece-meta{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:#9AA3C4;}
.lz-piece-scroll{overflow-x:auto;}
.lz-table{border-collapse:collapse;width:100%;min-width:820px;font-size:13px;line-height:1.5;}
.lz-table-3{min-width:0;}
.lz-table-3 tbody th{width:20%;}
.lz-table-cons{min-width:0;}
.lz-table-cons tbody th{width:32%;font-weight:400;}
.lz-table-cons td{font-size:12.5px;}
.lz-table code{font-family:var(--mono);font-size:12px;}
.lz-table th,.lz-table td{border-bottom:1px solid var(--bord);border-right:1px solid var(--bord);
  padding:12px 14px;text-align:left;vertical-align:top;}
.lz-table th:last-child,.lz-table td:last-child{border-right:0;}
.lz-table thead th{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;font-weight:400;
  color:var(--muted);background:var(--ghost);white-space:nowrap;}
.lz-table tbody th{font-weight:500;width:17%;}
.lz-table tbody tr:nth-child(even){background:#FAFAFC;}
.lz-table tbody tr:last-child th,.lz-table tbody tr:last-child td{border-bottom:0;}
.lz-piece-note{font-family:var(--mono);font-size:11px;line-height:1.6;color:var(--muted);
  border-top:1px solid var(--bord);margin:0;padding:12px 18px;}
@media(max-width:760px){
  .lz-table{min-width:0;}
  .lz-table thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
  .lz-table tr{display:block;border-bottom:1px solid var(--bord);padding:6px 0;}
  .lz-table tbody tr:last-child{border-bottom:0;}
  .lz-table th,.lz-table td{display:block;width:auto;border:0;padding:6px 18px;}
  .lz-table td::before{content:attr(data-lb);display:block;font-family:var(--mono);font-size:10px;
    letter-spacing:.16em;color:var(--muted);margin-bottom:3px;}
  .lz-table tbody th{font-size:15px;padding-top:12px;}
  /* En pile (mobile), les largeurs de colonne des tableaux spécifiques ne
     doivent pas s'appliquer, sinon l'en-tête de ligne se réduit à ~32 % et le
     texte tombe mot par mot. On rend la pleine largeur. */
  .lz-table-3 tbody th,.lz-table-cons tbody th{width:auto;}
  .lz-table-cons td,.lz-table-cons tbody th{font-size:15px;}
}

/* Droits */
.lz-droits{list-style:none;margin:28px 0;padding:0;border-top:1px solid var(--bord);}
.lz-droits li{display:grid;grid-template-columns:150px 1fr 72px;gap:20px;align-items:baseline;
  padding:14px 0;border-bottom:1px solid var(--bord);}
@media(max-width:600px){.lz-droits li{grid-template-columns:1fr;gap:4px;}}
.lz-droit-nom{font-weight:500;}
.lz-droit-txt{font-size:15px;color:#3A3A50;}
.lz-droit-ref{font-family:var(--mono);font-size:11px;color:var(--muted);text-align:right;}
@media(max-width:600px){.lz-droit-ref{text-align:left;}}

.lz-fin{font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:var(--muted);
  border-top:1px solid var(--bord);padding-top:20px;margin:0;}

/* Pied */
.lz-pied{background:var(--ghost);border-top:1px solid var(--bord);padding:56px 0;}
.lz-pied-grille{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap;}
/* Couleur explicite : c'est une balise <p>, sinon colorée en blanc par la
   règle globale « p{color:blanc} » et invisible sur le fond clair du pied. */
.lz-pied-titre{font-size:20px;font-weight:500;margin:0 0 8px;color:var(--encre);}
.lz-pied-txt{margin:0;max-width:52ch;color:#3A3A50;font-size:15px;}
.lz-lien-fort{font-family:var(--mono);font-size:13px;letter-spacing:.08em;color:var(--bleu);
  text-decoration:none;border-bottom:1px solid var(--bleu);padding-bottom:3px;}
.lz-lien-fort:hover{color:var(--bleu-fonce);border-color:var(--bleu-fonce);}
.lz-lien-inline{color:var(--bleu);text-decoration:underline;text-underline-offset:2px;}
.lz-lien-inline:hover{color:var(--bleu-fonce);}

@media print{
  .lz-masthead{background:none;color:#000;padding-top:0;}
  .lz-h1{color:#000;} .lz-chapo{color:#333;} .lz-tabs,.lz-sommaire,.lz-pied{display:none;}
  .lz-grille{display:block;} .lz-contenu{max-width:none;}
  .lz-piece-entete{background:none;color:#000;border-bottom:1px solid #000;}
  .lz-section{break-inside:avoid;}
}
@media (prefers-reduced-motion:reduce){.lz-legal *{transition:none!important;}}
`;

/* -------------------------------------------------------------------------- */
/*  Notes de vérification (1er octobre 2026)                                   */
/*                                                                            */
/*   Trois onglets : mentions légales, politique de confidentialité, cookies.  */
/*   La politique de cookies reprend le même gabarit (masthead + sommaire +    */
/*   sections + tableaux « pièce »).                                           */
/*                                                                            */
/*   Traceurs : GA4 + Microsoft Clarity + suivi HubSpot, pilotés par GTM +     */
/*   Consent Mode v2 ; consentement recueilli par le bandeau CookieConsent v3  */
/*   (cookie de choix lz_consent, 6 mois). Durées vérifiées (oct. 2026) :      */
/*   HubSpot __hstc/hubspotutk 6 mois, __hssc 30 min, __hssrc session ;         */
/*   Clarity _clck/_clsk (+ cookies Microsoft MUID/CLID) ; Vercel Web          */
/*   Analytics sans cookie (identifiant éphémère, 24 h).                        */
/*   Formulaire : transmis par e-mail (SMTP cabinet) ET au CRM HubSpot côté    */
/*   serveur (base légale « Exécution d'un contrat »), indépendamment des       */
/*   cookies ; aucune persistance en base sur l'infra du site.                  */
/*                                                                            */
/*   Confirmé par le cabinet (oct. 2026) : aucun DPO désigné ; IONOS dans       */
/*   l'UE ; Vercel certifié Data Privacy Framework, données aux États-Unis,     */
/*   durée des journaux = celle appliquée par l'hébergeur (formule Vercel Pro   */
/*   en cours pour le DPA). Reste opérationnel (hors texte) : régler GA4 à       */
/*   13 mois dans GTM et activer le RGPD dans HubSpot. Voir docs/.              */
/* -------------------------------------------------------------------------- */
