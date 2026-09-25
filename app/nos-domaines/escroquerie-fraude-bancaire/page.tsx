import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fr } from "@/lib/typo";
import styles from "./escroquerie.module.css";
import { FAQ_ITEMS } from "./faq";
import { MobileActionBar } from "./MobileActionBar";

const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/nos-domaines/escroquerie-fraude-bancaire";
const TEL = "tel:+33181706200";

const TITLE = "Avocat fraude bancaire — remboursement et recours | Lazarègue Avocats";
const DESCRIPTION =
  "Victime de phishing, spoofing, faux conseiller ou virement frauduleux ? Le cabinet examine les recours et le remboursement pouvant être demandé.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${URL_BASE}${PATH}#service`,
      name: "Avocat en fraude bancaire et escroquerie en ligne",
      url: `${URL_BASE}${PATH}`,
      provider: { "@id": `${URL_BASE}/#cabinet` },
      areaServed: { "@type": "Country", name: "France" },
      serviceType: ["Fraude bancaire", "Virement frauduleux", "Escroquerie en ligne", "Recours contre les établissements de paiement"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Domaines", item: `${URL_BASE}/nos-domaines` },
        { "@type": "ListItem", position: 3, name: "Fraude bancaire et escroquerie", item: `${URL_BASE}${PATH}` },
      ],
    },
  ],
};

/* Votre situation — deux cas (sans lettres A/B/C). */
const CAS2 = [
  {
    h: "On vous a fait valider autre chose",
    p: "Un faux conseiller vous appelle depuis le numéro de votre banque, ou un SMS vous alerte d'une fraude. On vous demande de « bloquer une opération » ou de « sécuriser votre compte ». En réalité, vous avez validé un virement.",
    tags: ["Faux conseiller", "Appel usurpant le numéro de la banque", "Phishing, SMS frauduleux"],
  },
  {
    h: "Vous avez payé, mais pas la bonne personne",
    p: "Vous vouliez régler une facture, acheter un bien, placer votre épargne ou exécuter l'ordre de votre dirigeant. Le destinataire était un escroc.",
    tags: ["Faux RIB fournisseur", "Fausse vente en ligne", "Placement fictif, crypto-actifs", "Fraude au président"],
  },
];

/* Ce que le cabinet soutient — trois temps. */
const SOUTIENT = [
  { h: "Vous n'avez pas consenti au paiement qui a été exécuté.", p: "Valider un écran présenté comme une mesure de sécurité, ou payer un destinataire qui n'était pas celui que vous pensiez, ce n'est pas donner son accord à ce paiement. L'opération doit être remboursée." },
  { h: "Vous n'avez pas commis de négligence grave.", p: "C'est à la banque de le prouver, et c'est l'exception : ces fraudes sont conçues pour tromper tout le monde." },
  { h: "À défaut, les banques ont manqué à leur devoir de vigilance.", p: "Votre banque, qui a exécuté un virement inhabituel sans réagir. Celle de l'escroc, qui a ouvert le compte et l'a laissé recevoir puis faire sortir les fonds." },
];

/* Contre qui agir — trois blocs. */
const CONTRE = [
  { h: "Votre banque", p: "Elle doit rembourser le paiement auquel vous n'avez pas consenti. À défaut, elle répond d'un virement manifestement anormal exécuté sans vérification." },
  { h: "La banque qui a reçu les fonds", p: "Elle a ouvert le compte de l'escroc ou de son prête-nom et l'a laissé fonctionner. Sa responsabilité se recherche sur ce terrain." },
  { h: "L'escroc et ses complices", p: "Une plainte reste utile lorsqu'ils sont identifiés et que des saisies sont possibles." },
];

/* Premières mesures (§5) — quatre. */
const MESURES = [
  { t: "Alerter l'établissement et demander le rappel des fonds", p: "Faire opposition lorsqu'elle est utile, notifier immédiatement les opérations contestées et demander le rappel des fonds. La notification fait courir les obligations de la banque." },
  { t: "Conserver les échanges et traces disponibles", p: "Relevés, messages, courriels et historique des appels. Les preuves non conservées rapidement peuvent devenir difficiles, voire impossibles, à reconstituer." },
  { t: "Contester les opérations par écrit", p: "Une contestation adressée à l'établissement, et non une simple réclamation en ligne : sa réponse devient une pièce du dossier." },
  { t: "Ne pas attendre la fin de l'enquête pour faire examiner les recours", p: "L'action contre les établissements ne dépend pas de l'avancement de la procédure pénale, et certains délais courent en parallèle." },
];

/* Ce que prépare le cabinet — une ligne par acte. */
const ACTES = [
  "Note d'analyse — recours possibles, banques visées, montants, coût de l'action",
  "Contestation motivée adressée à la banque",
  "Mise en demeure chiffrée",
  "Requête au juge pour obtenir l'identité du titulaire du compte qui a reçu les fonds",
  "Plainte ou constitution de partie civile",
  "Assignation de l'une ou des deux banques ; saisine du médiateur si elle est utile",
];

/* Cas clients — contenu conservé. */
const CASES = [
  { cnum: "Cas client 01", titre: "Virements professionnels après un faux message de la banque", situation: "Dirigeante d'une société de services. Après un message reproduisant l'interface de sa banque, des virements sont exécutés depuis le compte professionnel vers des comptes de tiers.", diff: "L'établissement oppose une négligence grave de sa cliente.", interv: "Contestation de l'autorisation des opérations et de la négligence grave invoquée par l'établissement.", res: "Remboursement intégral des virements contestés, obtenu avant audience." },
  { cnum: "Cas client 02", titre: "Faux placement garanti : deux banques mises en cause", situation: "Particulier retraité, sollicité sur plusieurs mois pour un placement présenté comme garanti. Les fonds partent vers des comptes ouverts dans deux établissements distincts, dont un hors métropole.", diff: "Les ordres ont été donnés par la victime elle-même, et les comptes de réception relèvent de deux établissements différents.", interv: "Mises en demeure, puis assignation des deux banques.", res: "Indemnisation au titre de la perte de chance de conserver les fonds." },
  { cnum: "Cas client 03", titre: "Fausse vente de véhicule : la banque réceptrice mise en cause", situation: "Acheteur d'un véhicule annoncé sur une plateforme de petites annonces. Le virement est exécuté vers un compte ouvert au nom d'un tiers, dans un établissement en ligne.", diff: "Le virement a été voulu par l'acheteur, et le compte destinataire n'était pas celui du vendeur annoncé.", interv: "Assignation de la banque émettrice et de la banque réceptrice.", res: "Accord transactionnel avec la banque réceptrice." },
];

/* Équipe — quatre intervenants. Khalid : statut issu de lib/equipe. */
const TEAM = [
  { photo: "/images/alexandre-pro.jpg", alt: "Portrait d'Alexandre Lazarègue", nom: "Alexandre Lazarègue", bar: "avocat au barreau de Paris", p: "Droit du numérique. Conduit les recours contre les établissements financiers, l'action pénale et les mesures d'instruction destinées à identifier les comptes de réception.", pos: "center 25%" },
  { photo: "/images/amir-pro.jpg", alt: "Portrait d'Amir Ben Majed", nom: "Amir Ben Majed", bar: "avocat au barreau d'Évry", p: "Contentieux et procédure. Intervient sur les écritures, les mesures d'urgence et la conduite des instances devant les juridictions saisies.", pos: "center 25%" },
  { photo: "/images/equipe/sarah-hinderer.webp", alt: "Portrait de Sarah Hinderer", nom: "Sarah Hinderer", bar: "avocate aux barreaux de Paris et de Montréal", p: "Suit les dossiers de fraude bancaire et d'escroquerie, de la constitution du dossier de preuve au suivi des plaintes et du lien avec les services d'enquête.", pos: "center top" },
  { photo: "/images/khalid-pro.jpg", alt: "Portrait de Khalid Sookia", nom: "Khalid Sookia", bar: "consultant technique en cybersécurité", p: "Reconstitution des flux et analyse des journaux d'authentification.", pos: "center 20%" },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <a className={styles.skipLink} href="#main">Aller au contenu</a>

      <div className={styles.esc}>
        <main id="main">
          {/* ===== 1. HERO ===== */}
          <section className="hero hero-photo" aria-labelledby="h1">
            <div className="hero-bg" aria-hidden="true">
              <Image src="/images/fraude-bancaire-hero.webp" alt="" aria-hidden="true" fill priority sizes="100vw" className="hero-bg-img" />
            </div>
            <div className="wrap">
              <nav className="crumb" aria-label="Fil d’Ariane">
                <Link href="/">Accueil</Link> <span aria-hidden>/</span> <Link href="/nos-domaines">Domaines</Link> <span aria-hidden>/</span> <span aria-current="page">Fraude bancaire et escroquerie</span>
              </nav>
              <div className="hero-grid">
                <div className="hero-main">
                  <span className="lbl">fraude bancaire · escroquerie en ligne · toute la France</span>
                  <h1 id="h1">Avocat en fraude bancaire et escroquerie en ligne</h1>
                  <p className="say">{fr("Faux conseiller bancaire, SMS frauduleux, faux RIB, placement fictif : le cabinet défend les victimes, particuliers comme entreprises, et engage les recours contre les banques pour récupérer les fonds.")}</p>
                  <p className="claim">{fr("L'escroc a disparu. Les établissements par lesquels les fonds ont circulé, non.")}</p>
                  <div className="actions">
                    <a className="btn btn-primary" href={TEL}>Appeler le cabinet — 01 81 70 62 00</a>
                    <Link className="btn btn-line" href="/contact">Demander à être contacté</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bande d'urgence — une ligne + lien */}
          <section className="urgband" aria-label="Opération récente">
            <div className="wrap urgband-inner urgband-simple">
              <p className="urgband-title">Opération récente&nbsp;? Chaque jour compte.</p>
              <a className="urgband-link" href="#premiers">Les 4 réflexes ↓</a>
            </div>
          </section>

          {/* ===== 2. VOTRE SITUATION — DEUX CAS ===== */}
          <section aria-labelledby="sit-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">votre situation</span>
                <h2 id="sit-h">Votre banque refuse de rembourser parce que vous avez validé&nbsp;? Le dossier n’est pas clos.</h2>
                <p className="lede">{fr("C'est la réponse que les banques opposent presque toujours : l'opération a été validée, elle est donc due. Le cabinet la conteste dans deux situations.")}</p>
              </div>
              <div className="cas2">
                {CAS2.map((c) => (
                  <article className="cas2card" key={c.h}>
                    <h3>{fr(c.h)}</h3>
                    <p>{fr(c.p)}</p>
                    <p className="cas2tags">
                      {c.tags.map((t) => <span className="tag" key={t}>{fr(t)}</span>)}
                    </p>
                  </article>
                ))}
              </div>
              <p className="after-band">{fr("Le cabinet intervient aussi en cas d'usurpation d'identité ou d'escroquerie sentimentale, dès lors que des banques ou des intermédiaires ont fait circuler les fonds.")}</p>
            </div>
          </section>

          {/* ===== 3. CE QUE LE CABINET SOUTIENT (navy) + délai ===== */}
          <section className="dark" aria-labelledby="sout-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">la thèse du cabinet</span>
                <h2 id="sout-h">Ce que le cabinet soutient</h2>
              </div>
              <ol className="soutient">
                {SOUTIENT.map((s, i) => (
                  <li key={s.h}>
                    <span className="num">{String(i + 1)}</span>
                    <div><h3>{fr(s.h)}</h3><p>{fr(s.p)}</p></div>
                  </li>
                ))}
              </ol>
              <p className="soutient-refs">art. L. 133-18, L. 133-19 et L. 133-23 du code monétaire et financier · art. 1231-1 et 1240 du code civil</p>
              <p className="para"><b>Délai.</b> {fr("Une opération contestée doit en principe être signalée dans les treize mois suivant le débit. Pour les entreprises, le contrat de compte peut prévoir un délai plus court : il faut le vérifier en premier.")}</p>
              <p className="soutient-cta"><a className="btn btn-white" href={TEL}>Parler à un avocat — 01 81 70 62 00</a></p>
            </div>
          </section>

          {/* ===== 4. CAS CLIENTS (remontés) ===== */}
          <section className="tint" aria-labelledby="cas-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">cas clients</span>
                <h2 id="cas-h">Trois dossiers, trois stratégies de recours</h2>
                <p className="lede">{fr("Trois exemples parmi les dossiers dans lesquels le cabinet est intervenu.")}</p>
              </div>
              <div className="dos">
                {CASES.map((c) => (
                  <article className="dcard" key={c.cnum}>
                    <div className="top">
                      <p className="cnum">{c.cnum}</p>
                      <h3 className="ctitle">{fr(c.titre)}</h3>
                    </div>
                    <dl>
                      <dt>Situation</dt>
                      <dd>{fr(c.situation)}</dd>
                      <dt>Difficulté juridique</dt>
                      <dd>{fr(c.diff)}</dd>
                      <dt>Intervention</dt>
                      <dd>{fr(c.interv)}</dd>
                    </dl>
                    <div className="res"><b>Résultat</b><p>{fr(c.res)}</p></div>
                  </article>
                ))}
              </div>
              <p className="note-line note-line--light">{fr("Résultats effectivement obtenus. Faits modifiés pour préserver l'anonymat.")}</p>
            </div>
          </section>

          {/* ===== 5. CE QU'IL FAUT FAIRE IMMÉDIATEMENT ===== */}
          <section id="premiers" aria-labelledby="urg-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">les premiers jours</span>
                <h2 id="urg-h">{fr("Ce qu'il faut faire immédiatement")}</h2>
                <p className="lede">{fr("Certaines démarches doivent être entreprises rapidement, sans attendre que l'ensemble du dossier soit constitué.")}</p>
              </div>
              <ol className="steps">
                {MESURES.map((m, i) => (
                  <li key={m.t}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div><h3>{fr(m.t)}</h3><p>{fr(m.p)}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ===== 6. CONTRE QUI AGIR (tint) ===== */}
          <section className="tint" aria-labelledby="def-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">le trajet des fonds</span>
                <h2 id="def-h">Contre qui agir&nbsp;?</h2>
                <p className="lede">{fr("L'escroc est rarement solvable. Les banques par lesquelles l'argent est passé le sont, et chacune a ses propres obligations.")}</p>
              </div>
              <div className="contre3">
                {CONTRE.map((c) => (
                  <article key={c.h}>
                    <h3>{fr(c.h)}</h3>
                    <p>{fr(c.p)}</p>
                  </article>
                ))}
              </div>
              <p className="after-band">{fr("Plateformes et prestataires de paiement peuvent aussi être mis en cause, selon leur rôle dans le trajet des fonds.")}</p>
              <div className="assur">
                <b>Entreprises&nbsp;: pensez à votre assureur.</b>
                <p>{fr("Une garantie fraude ou cyber peut jouer en parallèle, à condition de déclarer le sinistre rapidement.")}</p>
              </div>
            </div>
          </section>

          {/* ===== 7. CE QUE PRÉPARE LE CABINET ===== */}
          <section aria-labelledby="actes-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">la prestation</span>
                <h2 id="actes-h">Ce que prépare le cabinet</h2>
              </div>
              <ol className="actline">
                {ACTES.map((a, i) => (
                  <li key={a}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <p>{fr(a)}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ===== 8. FAQ ===== */}
          <section aria-labelledby="faq-h">
            <div className="wrap faq-grid">
              <div className="sec-head">
                <span className="lbl">questions fréquentes</span>
                <h2 id="faq-h">Ce qui est demandé le plus souvent</h2>
              </div>
              <div className="faq">
                {FAQ_ITEMS.map((item) => (
                  <details key={item.q} open={item.open}>
                    <summary>{fr(item.q)}</summary>
                    <div className="a"><p>{fr(item.a)}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 9. ÉQUIPE ===== */}
          <section className="tint" aria-labelledby="team-h">
            <div className="wrap">
              <div className="sec-head">
                <span className="lbl">qui traite le dossier</span>
                <h2 id="team-h">Le dossier est suivi par un avocat, pas par un service</h2>
                <p className="lede">{fr("Ces dossiers se jouent sur des pièces et une chronologie. Chaque dossier est placé sous la responsabilité d'un avocat identifié, qui en coordonne le suivi jusqu'à son terme.")}</p>
              </div>
              <div className="team team4">
                {TEAM.map((m) => (
                  <figure key={m.nom}>
                    <div className="portrait">
                      <Image src={m.photo} alt={m.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw" loading="lazy" style={{ objectFit: "cover", objectPosition: m.pos }} />
                    </div>
                    <figcaption>
                      <h3>{m.nom}</h3>
                      <p className="bar">{m.bar}</p>
                      <p>{fr(m.p)}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* ===== Voir aussi ===== */}
          <section className="voir-wrap" aria-label="Voir aussi">
            <div className="wrap">
              <p className="voir">
                <span className="lbl">Voir aussi</span>
                <Link href="/nos-domaines/cybercriminalite">Cybercriminalité</Link>
                <span aria-hidden> · </span>
                <Link href="/nos-domaines/crypto-actifs-blockchain">Crypto-actifs, blockchain et Web3</Link>
              </p>
            </div>
          </section>

          {/* ===== 10. CONTACT (bleu) ===== */}
          <section className="contact" id="contact" aria-labelledby="ct-h">
            <div className="wrap">
              <span className="lbl">prendre contact</span>
              <h2 id="ct-h">Faire évaluer mon recours par un avocat</h2>
              <p className="lede">{fr("Un premier échange permet de comprendre la fraude, la position de la banque et les recours qui méritent d'être examinés. Le cabinet vous indiquera ensuite les informations et pièces nécessaires.")}</p>
              <div className="actions">
                <a className="btn btn-white" href={TEL}>Appeler — 01 81 70 62 00</a>
                <Link className="btn btn-ow" href="/contact">Demander à être contacté</Link>
              </div>
              <p className="coord">
                <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a> · 18 rue de Tilsitt, 75017 Paris — le cabinet intervient dans toute la France.
              </p>
            </div>
          </section>
        </main>

        <MobileActionBar />
      </div>
    </>
  );
}
