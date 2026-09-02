"use client";

/*
 * Lazarègue Avocats — Mentions légales & Politique de confidentialité
 * ---------------------------------------------------------------------------
 * Deux onglets, une seule page. Charte v1.0 : Electric Blue #1A47FF (seul
 * accent), Deep Navy #0A0F2E, Bebas Neue (display), Space Grotesk (titres et
 * corps), DM Mono (labels), angles droits, aucune ombre.
 *
 * Les passages surlignés en bleu sont des mentions à compléter : ce sont les
 * seules informations que le rédacteur ne pouvait pas connaître. Elles sont
 * toutes balisées par le composant <AC> et listées en bas de ce fichier.
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

const VERSION = "1.0";
const MAJ = "1er septembre 2026";

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

/** À compléter : mention surlignée, en attente d'une information factuelle. */
const AC = ({ children }) => <span className="lz-ac">{children}</span>;

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
      "Répondre à une sollicitation, vérifier l'absence de conflit d'intérêts avant toute ouverture de dossier",
    base: "Mesures précontractuelles et intérêt légitime du cabinet",
    donnees: "Identité, coordonnées, objet de la demande",
    duree: "12 mois à compter du dernier échange si la demande n'est pas suivie d'un dossier",
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
    duree: "6 mois à compter de leur enregistrement",
  },
  {
    traitement: "Mesure d'audience",
    finalite: "Statistiques de fréquentation et amélioration éditoriale du site",
    base:
      "Consentement, sauf exemption réservée aux mesures d'audience strictement limitées à cette finalité",
    donnees: "Pages consultées, provenance, données de navigation agrégées",
    duree: "13 mois pour les traceurs, 25 mois pour les données qui en sont issues",
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
            ["téléphone", "01 82 88 91 19"],
            ["courriel", "contact@lazaregue-avocats.fr"],
            ["directeur de la publication", "Alexandre Lazarègue, avocat au barreau de Paris"],
          ]}
        />
        <P>
          L'avocat exerce une profession libérale qui n'a pas le caractère commercial : le cabinet
          n'est pas immatriculé au registre du commerce et des sociétés. Son inscription au barreau
          de Paris vaut habilitation à exercer et le place sous le contrôle du Conseil de l'Ordre.
        </P>
        <P>
          Le site est édité par un cabinet d'avocats. Sa consultation ne fait naître aucune
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
          Ces mentions sont exigées par l'article 6 de la loi du 21 juin 2004 pour la confiance
          dans l'économie numérique. Vercel exploite un réseau de diffusion mondial ; les
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
          L'avocat exerce une profession réglementée. Les mentions qui suivent sont imposées par
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
          L'exercice de la profession est régi par la loi n° 71-1130 du 31 décembre 1971, le
          décret n° 91-1197 du 27 novembre 1991, le décret n° 2005-790 du 12 juillet 2005 relatif
          aux règles de déontologie et le Règlement Intérieur National de la profession d'avocat,
          consultable sur le site du Conseil national des barreaux, ainsi que par le Règlement
          Intérieur du barreau de Paris.
        </P>
        <H3>Assurances</H3>
        <P>
          Conformément à l'article 27 de la loi du 31 décembre 1971, la responsabilité civile
          professionnelle du cabinet et la représentation des fonds sont garanties par les polices
          collectives souscrites par l'Ordre des avocats de Paris pour l'ensemble des avocats qui y
          sont inscrits. La garantie couvre les activités professionnelles exercées sur le
          territoire des États membres de l'Union européenne.
        </P>
        <P>
          L'attestation d'inscription au barreau et l'attestation annuelle d'assurance sont
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
          selon les critères de l'article 10 de la loi du 31 décembre 1971.
        </P>
        <P>
          Tout différend relatif au montant et au recouvrement des honoraires relève du Bâtonnier
          de l'Ordre des avocats de Paris, saisi selon la procédure prévue par les articles 174 et
          suivants du décret du 27 novembre 1991.
        </P>
        <P>
          Le client consommateur peut, après réclamation écrite adressée au cabinet et restée sans
          issue, saisir gratuitement le Médiateur de la consommation de la profession d'avocat,
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
          documentaires et l'ensemble des analyses qui y sont publiées sont protégés par le code de
          la propriété intellectuelle. Le cabinet en est titulaire ou détient les droits nécessaires
          à leur exploitation.
        </P>
        <P>
          La citation d'un extrait est admise sous réserve d'indiquer clairement le nom de l'auteur
          et la source. Toute autre reproduction, adaptation ou réutilisation, notamment à des fins
          d'indexation, d'entraînement de modèles ou de constitution de bases documentaires, est
          soumise à autorisation préalable écrite. L'usage des données publiées sur ce site aux fins
          de fouille de textes et de données est expressément réservé au sens de l'article
          L. 122-5-3 du code de la propriété intellectuelle.
        </P>
        <P>
          La dénomination Lazarègue Avocats, le logotype du cabinet et l'ensemble des signes
          distinctifs qui l'accompagnent sont la propriété de l'éditeur. Leur usage par un tiers,
          y compris à titre de référencement ou de mot-clé publicitaire, est interdit.
        </P>
        <P>
          Photographies et séquences vidéo : propriété du cabinet ou exploitées sous licence.
          Certaines séquences d'illustration ont été produites à l'aide d'outils de génération
          d'images ; elles ne représentent aucune personne réelle.
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
          Les analyses publiées présentent l'état du droit à la date de leur rédaction. Elles ont
          une valeur d'information générale et ne constituent ni une consultation juridique, ni un
          avis sur une situation particulière. Une règle exacte appliquée à des faits mal qualifiés
          conduit à une décision erronée : seule l'étude d'un dossier permet une réponse.
        </P>
        <P>
          Les liens conduisant vers des sites tiers sont proposés à titre documentaire. Le cabinet
          n'exerce aucun contrôle sur leur contenu et n'en répond pas.
        </P>
        <P>
          Tout contenu manifestement illicite constaté sur ce site peut être signalé à l'adresse
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
          professionnel, qui est d'ordre public, général et illimité dans le temps.
        </P>
        <div className="lz-avertissement">
          <span className="lz-avertissement-label">avant d'écrire</span>
          <P>
            L'envoi d'un message par le formulaire de contact ne vaut pas acceptation de mission et
            ne fait naître aucune relation client. Tant que la vérification des conflits d'intérêts
            n'a pas été effectuée et qu'une convention d'honoraires n'a pas été signée, il est
            recommandé de s'en tenir à une description sommaire de la situation et de ne pas
            transmettre de pièces ni d'informations sensibles.
          </P>
        </div>
        <P>
          La messagerie électronique ordinaire n'est pas un canal sûr. Une fois le dossier ouvert,
          le cabinet indique le canal de transmission adapté à la sensibilité des pièces et à la
          nature de l'affaire.
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
        la compétence du Bâtonnier en matière d'honoraires.
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
          Le cabinet ne relève d'aucun des cas de désignation obligatoire d'un délégué à la
          protection des données prévus par l'article 37 du règlement : les demandes sont instruites
          et signées par un avocat, tenu au secret professionnel, et non déléguées à un tiers.
        </P>
        <P>
          Cette politique s'applique au site et à l'ensemble des traitements mis en œuvre dans le
          cadre de l'activité du cabinet. Elle est rédigée en application des articles 12 à 14 du
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
          Un cabinet d'avocats traite, par nature, des informations que ses clients ne confieraient
          à personne d'autre. Le secret professionnel prime sur toute considération de commodité :
          il commande la limitation des données collectées, le choix des prestataires, la
          localisation des serveurs et les réponses apportées aux demandes de tiers.
        </P>
        <P>
          Aucune donnée traitée par le cabinet n'est vendue, louée, ni utilisée à des fins
          publicitaires. Aucune décision automatisée produisant des effets juridiques n'est prise à
          l'égard des personnes concernées.
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
        registre interne prévu par l'article 30 du règlement.
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
          d'agissements. Ces données proviennent du client, des pièces de la procédure, des
          décisions de justice, des registres publics et des sources ouvertes.
        </P>
        <P>
          Leur traitement est nécessaire à la constatation, à l'exercice ou à la défense d'un droit
          en justice. L'information individuelle de ces personnes est écartée lorsqu'elle est
          impossible, exige des efforts disproportionnés, ou compromettrait l'objet même du
          traitement et le secret professionnel, conformément à l'article 14 du règlement.
        </P>
      </>
    ),
  },
  {
    id: "destinataires",
    titre: "Qui y a accès",
    corps: (
      <>
        <P>Les données ne sont accessibles qu'aux personnes qui en ont besoin :</P>
        <UL>
          <li>les avocats et collaborateurs du cabinet, tenus au secret professionnel ;</li>
          <li>
            les auxiliaires de justice et intervenants du dossier lorsque la mission l'exige :
            juridictions, greffes, huissiers, avocats postulants, experts, confrères de la partie
            adverse ;
          </li>
          <li>
            les prestataires techniques du cabinet, liés par un contrat de sous-traitance conforme
            à l'article 28 du règlement, et limités à quatre catégories : hébergement du site
            (Vercel Inc., États-Unis), messagerie professionnelle, logiciel de gestion des
            dossiers, diffusion des lettres d'information. La liste nominative complète est
            communiquée sur demande ;
          </li>
          <li>l'expert-comptable et, le cas échéant, le commissaire aux comptes.</li>
        </UL>
        <P>
          Les demandes de communication émanant d'une autorité ne sont satisfaites que dans les
          formes et limites prévues par la loi, en particulier celles qui protègent le secret
          professionnel et exigent l'intervention du Bâtonnier.
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
          L'hébergement du site est assuré par Vercel Inc., société de droit américain établie en
          Californie. Le recours à ce prestataire emporte un transfert de données hors de l'Union
          européenne. Ce transfert est identifié, circonscrit et encadré.
        </P>
        <H3>Ce qui est transféré</H3>
        <P>
          Les seules données concernées sont celles qui transitent nécessairement par
          l'infrastructure du site : données techniques de connexion et, le cas échéant, le contenu
          d'un message adressé par le formulaire de contact. Le site ne comporte ni espace client,
          ni base documentaire, ni annuaire de dossiers : aucune pièce, aucune correspondance
          couverte par le secret professionnel n'y est hébergée.
        </P>
        <H3>Ce qui l'encadre</H3>
        <P>
          Vercel Inc. intervient en qualité de sous-traitant, sur la base d'un accord de traitement
          conforme à l'article 28 du règlement. La société déclare adhérer au cadre de protection
          des données UE — États-Unis, qui a fait l'objet de la décision d'adéquation de la
          Commission européenne du 10 juillet 2023, et recourir en outre aux clauses contractuelles
          types pour les transferts qui n'en relèveraient pas. Sa certification est vérifiable sur
          le registre public du Département du commerce des États-Unis.
        </P>
        <P>
          Le cabinet suit l'évolution de ce cadre, dont la validité est contestée devant le juge de
          l'Union. Une remise en cause de la décision d'adéquation conduirait au réexamen immédiat
          de cet hébergement.
        </P>
        <P>
          Un dossier peut par ailleurs exiger la communication de pièces à une juridiction ou à une
          autorité étrangère. Une telle communication n'intervient que dans le respect de la loi du
          26 juillet 1968, dite loi de blocage, et des voies d'entraide judiciaire.
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
          la mise à jour et la sensibilisation continues. Leur détail n'est pas publié — la
          description publique d'un dispositif de sécurité en affaiblit l'effet — mais il est
          communiqué au client qui en fait la demande.
        </P>
        <P>
          À l'expiration des durées mentionnées au registre, les données sont supprimées ou
          archivées sous une forme excluant leur usage courant. Les dossiers papier restitués au
          client le sont contre décharge ; ceux qui ne sont pas réclamés sont détruits dans des
          conditions garantissant la confidentialité.
        </P>
        <P>
          En cas de violation de données susceptible d'engendrer un risque pour les personnes, le
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
          Les traceurs strictement nécessaires au fonctionnement du site et à la sécurité de la
          navigation sont déposés sans consentement, conformément à l'article 82 de la loi du
          6 janvier 1978.
        </P>
        <P>
          Le site ne comporte aucun traceur publicitaire, aucun bouton de partage vers un réseau
          social et aucun dispositif de profilage. La mesure d'audience, lorsqu'elle est activée,
          est limitée à la production de statistiques anonymes pour le seul compte du cabinet et
          n'alimente aucun croisement avec d'autres traitements.{" "}
          <AC>
            À vérifier avant mise en ligne : outil d'audience effectivement installé, contenus
            incorporés — vidéos, cartes, polices distantes — et éventuel bandeau de recueil.
          </AC>
        </P>
        <P>
          Le consentement, lorsqu'il est requis, est recueilli avant tout dépôt, refusé aussi
          facilement qu'accepté, et peut être retiré à tout moment. Le refus n'altère pas l'accès
          au contenu du site.
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
          Ces droits s'exercent auprès du cabinet, à l'adresse indiquée en tête de la présente
          politique. Une réponse est apportée dans le délai d'un mois, prorogeable de deux mois pour
          les demandes complexes. Une preuve d'identité peut être demandée en cas de doute
          raisonnable.
        </P>
        <H3>Ce que le secret professionnel limite</H3>
        <P>
          Lorsque les données figurent dans le dossier d'une affaire, l'exercice de ces droits par
          un tiers peut être restreint pour préserver le secret professionnel, les droits de la
          défense et le bon déroulement d'une procédure judiciaire. Le cabinet motive alors sa
          réponse et indique les voies de recours.
        </P>
        <H3>Après le décès</H3>
        <P>
          Toute personne peut définir des directives relatives au sort de ses données après son
          décès, en application de l'article 85 de la loi du 6 janvier 1978. Le cabinet s'y
          conforme, sous réserve des règles applicables à la conservation des dossiers.
        </P>
        <H3>Réclamation</H3>
        <P>
          Une réclamation peut être adressée à la Commission nationale de l'informatique et des
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
          <p className="lz-chapo">
            Un cabinet qui conseille sur la protection des données se doit d'appliquer à lui-même la
            clarté qu'il recommande. Ces deux documents sont écrits pour être lus, non pour être
            acceptés sans l'être.
          </p>

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
              Une demande d'accès, de rectification ou d'effacement s'écrit en trois lignes. Elle est
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
.lz-tabs{display:flex;gap:0;border-top:1px solid rgba(255,255,255,.16);}
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
/*  Mentions restant à vérifier — plus aucun blanc dans les mentions légales  */
/*                                                                            */
/*   1. Traceurs : confirmer l'outil d'audience réellement installé et les    */
/*      contenus incorporés (vidéos, cartes, polices distantes) avant la      */
/*      mise en ligne. Le texte est écrit sur la position la plus sobre —     */
/*      aucun traceur publicitaire, aucun profilage.                          */
/*   2. Formulaire de contact : le texte affirme qu'aucune donnée de dossier  */
/*      n'est stockée sur l'infrastructure du site. À confirmer si le         */
/*      formulaire transmet par courriel sans persistance en base.            */
/*   3. TVA intracommunautaire FR24 823 894 142, calculée par la clé          */
/*      officielle (12 + 3 × SIREN mod 97) mod 97, à confronter aux           */
/*      déclarations du cabinet.                                              */
/*                                                                            */
/*  Hébergeur : coordonnées relevées le 1er septembre 2026 sur la politique   */
/*  de confidentialité et la DMCA Policy publiées par Vercel Inc.             */
/* -------------------------------------------------------------------------- */
