import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MEMBRES } from "@/lib/equipe";
import AbonnementForm from "@/components/observatoire/AbonnementForm";
import styles from "./securite.module.css";

/**
 * Page d'offre « Sécurité des paiements » (établissements bancaires et de
 * paiement). Texte repris de la maquette ; composants, tokens et classes du
 * site ; header/footer via le layout. GlobalCta masqué (SUPPRESS_ON), bloc
 * contact propre. Aucun prix. Renvoie vers la note d'analyse.
 *
 * Adaptations CLAUDE.md signalées : « Voir notre pratique… » → « la pratique du
 * cabinet… » ; bouton de contact « Échanger avec un avocat » (/contact nu) ;
 * équipe (intitulés figés) lue depuis lib/equipe.ts dans l'ordre imposé.
 */

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/securite-des-paiements";
const NOTE = "/ressources/fraude-par-manipulation-banques-2026-2028";
const CONTACT = "/contact";
const TEL = "tel:+33181706200";

const TITLE = "Sécurité des paiements pour les banques | Lazarègue Avocats";
const DESCRIPTION =
  "Diagnostic probatoire de la sécurité des paiements : prouver que les dispositifs ont fonctionné, face aux nouvelles exigences des juges depuis 2026.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    siteName: "Lazarègue Avocats",
    images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — sécurité des paiements" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — sécurité des paiements" }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Sécurité des paiements : accompagnement des établissements",
      serviceType: "Diagnostic probatoire de la sécurité des paiements",
      description:
        "Diagnostic probatoire de la sécurité des paiements, mise à jour des procédures de réclamation, revue des contrats avec les prestataires techniques, préparation au futur règlement et formation des équipes.",
      areaServed: "FR",
      provider: { "@type": "LegalService", name: "Lazarègue Avocats", url: `${URL_BASE}/` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Sécurité des paiements", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

const EQUIPE = ["alexandre", "sarah", "amir", "khalid", "nadia"] as const;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <main id="contenu" className={styles.page}>
        {/* Hero */}
        <section className={`${styles.hero} ${styles.navy}`}>
          <div className={styles.inner}>
            <p className={`${styles.surtitre} ${styles.surtitreDark}`}>
              Sécurité des paiements · Établissements bancaires et de paiement
            </p>
            <h1 className={styles.h1}>Pouvez-vous prouver que vos dispositifs de sécurité ont fonctionné ?</h1>
            <p className={styles.chapo}>
              Depuis 2026, opposer la négligence grave du client ne suffit plus. Les juges demandent à la banque
              de démontrer le bon fonctionnement de son authentification forte et le respect de son propre cadre
              de sécurité. Le cabinet vérifie, avec des experts techniques, si cette preuve existe.
            </p>
            <div className={styles.heroBtns}>
              <a href="#diagnostic" className="btn btn-primary">
                Découvrir le diagnostic
              </a>
              <Link href={NOTE} className="btn btn-ghost">
                Lire la note d&rsquo;analyse
              </Link>
            </div>
          </div>
        </section>

        {/* Pourquoi maintenant */}
        <section className={styles.pourquoi}>
          <div className={styles.inner}>
            <p className={styles.surtitre}>Pourquoi maintenant</p>
            <div className={styles.grid3}>
              <div className={styles.motif}>
                <span className={styles.motifRef}>Cass. com., 1er juill. 2026, n° 25-13.134</span>
                <p className={styles.motifText}>
                  Les relevés d&rsquo;authentification ne permettent pas, à eux seuls, de présumer le consentement
                  du client.
                </p>
              </div>
              <div className={styles.motif}>
                <span className={styles.motifRef}>CJUE, 15 oct. 2026, aff. C-70/25</span>
                <p className={styles.motifText}>
                  La banque rembourse d&rsquo;abord. La négligence grave ne se discute qu&rsquo;ensuite, et
                  c&rsquo;est à elle de la prouver.
                </p>
              </div>
              <div className={styles.motif}>
                <span className={styles.motifRef}>Futur règlement, art. 59 et 83</span>
                <p className={styles.motifText}>
                  Remboursement intégral de la fraude au faux conseiller bancaire, surveillance avant exécution et
                  avant crédit des fonds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Le diagnostic */}
        <section id="diagnostic" className={styles.diag}>
          <div className={styles.inner}>
            <div className={styles.split}>
              <div className={styles.splitHead}>
                <p className={styles.surtitre}>L&rsquo;intervention principale</p>
                <h2 className={styles.h2}>Le diagnostic probatoire de la sécurité des paiements</h2>
              </div>
              <div className={`${styles.splitBody} ${styles.prose}`}>
                <p>
                  À partir d&rsquo;un échantillon d&rsquo;opérations contestées, un avocat et un expert technique
                  examinent ensemble ce que l&rsquo;établissement pourrait produire devant un juge, opération par
                  opération. Le diagnostic distingue les points défendables des points faibles, avant qu&rsquo;un
                  contentieux ne les révèle.
                </p>
              </div>
            </div>

            <div className={styles.grid4}>
              <div className={styles.point}>
                <span className={styles.pointNum}>01</span>
                <h3 className={styles.pointH3}>Authentification forte</h3>
                <p className={styles.pointText}>
                  La preuve que l&rsquo;authentification a fonctionné pour l&rsquo;opération, au-delà du seul
                  journal de connexion, et l&rsquo;absence de déficience technique au sens de l&rsquo;article
                  L. 133-23.
                </p>
              </div>
              <div className={styles.point}>
                <span className={styles.pointNum}>02</span>
                <h3 className={styles.pointH3}>Nouvel appareil et nouveau bénéficiaire</h3>
                <p className={styles.pointText}>
                  Les contrôles appliqués à l&rsquo;activation de l&rsquo;application sur un nouveau téléphone et à
                  l&rsquo;ajout d&rsquo;un bénéficiaire, points d&rsquo;entrée de la fraude par manipulation.
                </p>
              </div>
              <div className={styles.point}>
                <span className={styles.pointNum}>03</span>
                <h3 className={styles.pointH3}>Surveillance des opérations</h3>
                <p className={styles.pointText}>
                  Ce que le dispositif de surveillance a détecté ou aurait dû détecter, et la trace qui en reste.
                </p>
              </div>
              <div className={styles.point}>
                <span className={styles.pointNum}>04</span>
                <h3 className={styles.pointH3}>Journaux et audits</h3>
                <p className={styles.pointText}>
                  L&rsquo;existence, la conservation et l&rsquo;exploitabilité en justice des journaux et des
                  rapports d&rsquo;audit exigés par le règlement délégué (UE) 2018/389.
                </p>
              </div>
            </div>

            <div className={styles.duo}>
              <div className={styles.deroule}>
                <h3 className={styles.cardH3}>Le déroulé</h3>
                <ol className={styles.derouleList}>
                  <li>Cadrage et choix d&rsquo;un échantillon d&rsquo;opérations contestées.</li>
                  <li>Revue des documents, des journaux et du paramétrage des dispositifs.</li>
                  <li>Entretiens avec les équipes réclamations, sécurité et conformité.</li>
                  <li>Remise du rapport et présentation au comité concerné.</li>
                </ol>
              </div>
              <div className={styles.livrable}>
                <h3 className={styles.cardH3}>Le livrable</h3>
                <p className={styles.livrableText}>
                  Un rapport qui classe chaque point en défendable ou à corriger, et un plan de correction
                  hiérarchisé selon le risque contentieux.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corriger les points faibles */}
        <section id="complements" className={`${styles.complements} ${styles.off}`}>
          <div className={styles.inner}>
            <div className={styles.headCol}>
              <p className={styles.surtitre}>Après le diagnostic</p>
              <h2 className={styles.h2}>Corriger les points faibles</h2>
            </div>
            <div className={styles.grid4}>
              <article id="procedures" className={styles.complement}>
                <h3 className={styles.complementH3}>Procédures de réclamation après l&rsquo;arrêt de la CJUE</h3>
                <p className={styles.complementText}>
                  Remboursement au plus tard le jour ouvrable suivant, critères écrits de déclaration d&rsquo;un
                  soupçon de fraude à l&rsquo;autorité, organisation du recouvrement lorsque la négligence grave
                  peut être prouvée.
                </p>
              </article>
              <article id="contrats" className={styles.complement}>
                <h3 className={styles.complementH3}>Contrats avec les prestataires techniques</h3>
                <p className={styles.complementText}>
                  Authentification, vérification d&rsquo;identité à distance, détection de la fraude : accès aux
                  journaux, conservation des preuves, droits d&rsquo;audit, garanties et recours, au regard de
                  l&rsquo;article 58 du futur règlement.
                </p>
                <Link href="/nos-domaines/contrats-informatiques" className={styles.complementLink}>
                  Voir la pratique du cabinet en contrats informatiques
                </Link>
              </article>
              <article id="reglement" className={styles.complement}>
                <h3 className={styles.complementH3}>Préparation au futur règlement</h3>
                <p className={styles.complementText}>
                  Évaluation de l&rsquo;exposition au remboursement prévu par l&rsquo;article 59 à partir des
                  données de fraude de l&rsquo;établissement ; obligations de la banque du bénéficiaire : comptes
                  rebonds, ouverture de comptes, refus des fonds suspects.
                </p>
              </article>
              <article id="formation" className={styles.complement}>
                <h3 className={styles.complementH3}>Formation des équipes</h3>
                <p className={styles.complementText}>
                  Sessions pour les équipes réclamations, conformité et sécurité sur la nouvelle répartition de la
                  charge de la preuve et les évolutions de 2026 à 2028.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* La méthode (équipe) + Pour qui */}
        <section className={styles.methode}>
          <div className={styles.inner}>
            <div className={styles.methodeCol}>
              <p className={styles.surtitre}>La méthode</p>
              <h2 className={styles.h2m}>Un avocat et un expert technique sur chaque dossier</h2>
              <p className={styles.methodeText}>
                La preuve de la sécurité est à la fois juridique et technique. Sur ces dossiers, l&rsquo;avocat
                qualifie les obligations et prépare la preuve ; les experts techniques du cabinet examinent les
                dispositifs, les journaux et les modèles de détection.
              </p>
              <div className={styles.equipe}>
                {EQUIPE.map((slug) => {
                  const m = MEMBRES[slug];
                  return (
                    <div key={slug} className={styles.membre}>
                      <span className={styles.membrePhoto}>
                        <Image
                          src={m.photo}
                          alt={`Portrait de ${m.nom}`}
                          fill
                          sizes="48px"
                          style={{ objectPosition: m.position ?? "center" }}
                        />
                      </span>
                      <span>
                        <span className={styles.membreNom}>{m.nom}</span>
                        <span className={styles.membreStatut}>{m.statut}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.pourqui}>
              <p className={styles.surtitre}>Pour qui</p>
              <h2 className={styles.h2m}>Les établissements qui gèrent eux-mêmes leurs réclamations</h2>
              <ul className={styles.pourquiList}>
                <li>Banques de détail et banques privées</li>
                <li>Caisses régionales des réseaux mutualistes</li>
                <li>Néobanques</li>
                <li>Établissements de paiement et de monnaie électronique</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`${styles.contact} ${styles.navy}`}>
          <div className={styles.inner}>
            <div className={styles.contactCol}>
              <h2 className={styles.h2}>Échanger sur votre situation</h2>
              <p className={styles.contactLead}>
                Un premier échange permet de cadrer le périmètre du diagnostic et l&rsquo;échantillon
                d&rsquo;opérations à examiner.
              </p>
            </div>
            <div className={styles.contactActions}>
              <Link href={CONTACT} className="btn btn-white">
                Échanger avec un avocat
              </Link>
              <a href={TEL} className="btn btn-ghost">
                Appeler — 01 81 70 62 00
              </a>
              <span className={styles.contactLieu}>18 rue de Tilsitt, 75017 Paris</span>
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

        {/* Renvoi vers la note (pied de l'offre) */}
        <section className={styles.renvoi}>
          <div className={styles.inner}>
            <span>© 2026 Lazarègue Avocats · Alexandre Lazarègue, avocat au barreau de Paris</span>
            <Link href={NOTE}>
              Note d&rsquo;analyse : ce qui change pour les banques entre 2026 et 2028
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
