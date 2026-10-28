import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./picrights.module.css";

/**
 * Page « Courrier PicRights : faut-il payer ? » (version 2.1 validée dans son
 * principe le 28 octobre 2026). Adresse /picrights : ancienne page du cabinet
 * classée 1re sur « picrights faut il payer » (Ahrefs, relevé du 15 août 2026).
 *
 * Bloc pédagogique « Qu'est-ce qu'une photographie originale ? » : trois images
 * libres de droits (provenance en légende), deux repères chacune, aucune
 * qualification « protégée / non protégée ».
 *
 * Décision de Rennes et tribune des Échos volontairement absentes tant que
 * leur texte n'a pas été vérifié.
 */
const URL_BASE = "https://lazaregue-avocats.fr";
const PATH = "/picrights";
const MAIL = "mailto:contact@lazaregue-avocats.fr"; // [À CONFIRMER] adresse dédiée éventuelle
const TEL = "tel:+33181706200";
const CAS = "/cas-clients/photographies-utilisees-sans-autorisation-reclamation";

const TITLE = "Courrier PicRights : faut-il payer ? | Lazarègue Avocats";
const DESCRIPTION =
  "Courrier PicRights pour une photo de l'AFP ? Avant de payer, faites examiner la photographie et les droits invoqués. Appréciation et prix forfaitaire, sans engagement.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${URL_BASE}/` },
        { "@type": "ListItem", position: 2, name: "Courrier PicRights", item: `${URL_BASE}${PATH}` },
      ],
    },
    {
      "@type": "LegalService",
      name: "Contestation des réclamations PicRights — Lazarègue Avocats",
      url: `${URL_BASE}${PATH}`,
      areaServed: { "@type": "Country", name: "France" },
      serviceType: "Réclamations photographiques, droit d'auteur",
      provider: { "@id": `${URL_BASE}/#cabinet` },
    },
  ],
};

type Repere = { x: number; y: number; titre: string; texte: string };
type Exemple = {
  genre: string;
  titre: string;
  src: string;
  w: number;
  h: number;
  alt: string;
  reperes: [Repere, Repere];
  explication: string;
  provenance: string;
};

const EXEMPLES: Exemple[] = [
  {
    genre: "Photographie descriptive d'objet",
    titre: "Une tasse sur fond blanc",
    src: "/images/picrights/tasse-fond-blanc.jpg",
    w: 1280,
    h: 853,
    alt: "Tasse de thé sur sa soucoupe, photographiée sur fond blanc",
    reperes: [
      { x: 86, y: 16, titre: "Fond et cadrage", texte: "Fond blanc uniforme, objet isolé et centré." },
      { x: 50, y: 82, titre: "Lumière", texte: "Éclairage doux, ombre légère sous la soucoupe." },
    ],
    explication:
      "L'avocat recherche si ces choix répondent surtout à une exigence de restitution fidèle de l'objet, ou s'ils traduisent une intention propre au photographe.",
    provenance: "Petr Kratochvil, « Cup of tea isolated on white background ». Wikimedia Commons, dédiée au domaine public (CC0).",
  },
  {
    genre: "Photographie mise en scène",
    titre: "Un bureau composé pour la prise de vue",
    src: "/images/picrights/bureau-mise-en-scene.jpg",
    w: 1280,
    h: 853,
    alt: "Vue de dessus d'un bureau : clavier, carnet, montre et tasse de café tenue par une main",
    reperes: [
      { x: 57, y: 42, titre: "Composition", texte: "Vue de dessus, objets alignés et espacés." },
      { x: 88, y: 50, titre: "Mise en scène", texte: "Gestes, accessoires et tons choisis avant le déclenchement." },
    ],
    explication:
      "La mise en scène est un indice à examiner : qui a décidé de la composition, et ces choix portent-ils la marque d'une personnalité ? Elle ne suffit pas, à elle seule, à conclure.",
    provenance: "Cathryn Lavery, « Coffee at work », 2016. Unsplash, via Wikimedia Commons, dédiée au domaine public (CC0).",
  },
  {
    genre: "Photographie d'actualité",
    titre: "Le public d'un lancement de fusée",
    src: "/images/picrights/lancement-pont-actualite.jpg",
    w: 934,
    h: 1400,
    alt: "Foule massée sur un pont et une jetée, sous le panache d'une fusée au décollage",
    reperes: [
      { x: 47, y: 24, titre: "Instant", texte: "Déclenchement au moment du décollage." },
      { x: 52, y: 66, titre: "Point de vue", texte: "Contre-plongée sous le pont, foule alignée." },
    ],
    explication:
      "Quelle part revient à l'événement, quelle part aux choix du photographe : emplacement, instant, cadrage ? Une photographie d'actualité n'est ni protégée ni exclue par principe.",
    provenance:
      "NASA/Jim Ross, « Artemis II launch from A. Max Brewer Bridge », 1er avril 2026 (AFRC2026-0071-08). Œuvre du gouvernement fédéral américain, non protégée par le droit d'auteur aux États-Unis ; usage sans suggestion de parrainage de la NASA.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Est-il nécessaire de payer PicRights ?",
    a: "Pas avant d'avoir vérifié la demande : protection de la photographie, droits de l'agence, utilisation reprochée et montant. La réponse dépend de cet examen.",
  },
  {
    q: "Quel est le lien entre PicRights et l'AFP ?",
    a: "PicRights agit pour le compte de l'AFP et d'autres agences de presse ; en cas d'échec de sa démarche, l'agence peut mandater un avocat.",
  },
  {
    q: "Que se passe-t-il si l'on ne répond pas ?",
    a: "Les relances se poursuivent et le dossier peut être transmis à un avocat. Une réponse motivée fixe la position de l'entreprise dès le départ.",
  },
  {
    q: "Le premier retour engage-t-il à quelque chose ?",
    a: "Non. Le cabinet indique son appréciation, la démarche proposée et le prix forfaitaire de son intervention ; la mission ne commence qu'après acceptation et signature de la convention d'honoraires.",
  },
  {
    q: "Le cabinet intervient-il hors de Paris ?",
    a: "Oui. Les échanges se font par e-mail et le cabinet intervient partout en France.",
  },
];

function Actions({ sombre = true }: { sombre?: boolean }) {
  return (
    <div className={styles.actions}>
      <a className="btn btn-primary" href={MAIL}>
        Transmettre le courrier reçu →
      </a>
      <a className={sombre ? "btn btn-ghost" : "btn btn-line"} href={TEL}>
        Appeler — 01 81 70 62 00
      </a>
    </div>
  );
}

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.crumb} aria-label="Fil d'Ariane">
            <Link href="/">Accueil</Link> / <span aria-current="page">Courrier PicRights</span>
          </nav>
          <span className="eyebrow">Réclamations photographiques · PicRights · AFP</span>
          <h1>Courrier PicRights&nbsp;: faut-il payer&nbsp;?</h1>
          <p className={styles.lead}>
            PicRights réclame, pour le compte de l&apos;AFP ou d&apos;une autre agence de presse, une indemnité pour une
            photographie publiée sur un site internet. Avant de décider de payer ou de contester, le cabinet examine la
            photographie, les droits invoqués, l&apos;utilisation reprochée et le montant demandé.
          </p>
          <Actions />
          <p className={styles.note}>
            Envoyez votre courrier et la photographie&nbsp;: le cabinet vous indique son appréciation, la démarche
            proposée et le prix forfaitaire de son intervention, sans engagement.
          </p>
        </div>
      </section>

      <section className={`${styles.sec} ${styles.tint}`}>
        <div className={styles.wrap}>
          <span className="eyebrow">La réponse courte</span>
          <h2>Faut-il payer PicRights&nbsp;? Pas avant d&apos;avoir vérifié la demande</h2>
          <p>
            Une réclamation PicRights n&apos;est fondée que si plusieurs conditions sont réunies&nbsp;: la photographie
            est protégée par le droit d&apos;auteur, l&apos;agence en détient les droits et a mandaté PicRights, et
            l&apos;utilisation reprochée est établie. Selon le résultat de cet examen, la réponse adaptée peut être une
            contestation de la demande dans son principe, une discussion du montant, ou un règlement.
          </p>
        </div>
      </section>

      <section className={styles.sec}>
        <div className={`${styles.wrap} ${styles.cols2}`}>
          <div>
            <span className="eyebrow">Comprendre l&apos;expéditeur</span>
            <h2>Qu&apos;est-ce que PicRights&nbsp;?</h2>
            <p>
              PicRights Europe GmbH recherche sur internet les reproductions de photographies d&apos;agences de presse,
              notamment l&apos;Agence France-Presse, puis adresse aux sites concernés une demande d&apos;indemnisation,
              généralement accompagnée d&apos;un lien vers un espace de règlement en ligne. Elle agit pour le compte des
              agences. Lorsque la demande reste sans suite, le dossier peut être confié à un avocat mandaté par
              l&apos;agence, qui adresse alors une mise en demeure.
            </p>
          </div>
          <div>
            <span className="eyebrow">Arnaque ou demande légitime&nbsp;?</span>
            <h2>Une demande réelle n&apos;est pas nécessairement une demande fondée</h2>
            <p>
              PicRights existe et agit pour de véritables agences&nbsp;: il ne s&apos;agit pas d&apos;une escroquerie au
              sens courant du terme. Le bien-fondé de la demande reste toutefois à établir&nbsp;: la protection de
              l&apos;image, la titularité des droits, l&apos;étendue de l&apos;utilisation et le montant réclamé doivent
              être justifiés par celui qui réclame.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.sec} ${styles.tint}`}>
        <div className={styles.wrap}>
          <span className="eyebrow">Le point central</span>
          <h2>Toute photographie n&apos;est pas protégée par le droit d&apos;auteur</h2>
          <p>
            Le droit d&apos;auteur ne protège une photographie que si elle est originale, c&apos;est-à-dire si elle
            traduit des choix libres et créatifs propres à son auteur&nbsp;: cadrage, lumière, composition, mise en
            scène, instant du déclenchement. L&apos;originalité s&apos;apprécie au cas par cas, image par image.
            C&apos;est souvent sur ce terrain que se joue la discussion.
          </p>
          <p>
            Le parasitisme est parfois invoqué à titre subsidiaire. Il suppose notamment que l&apos;image présente une
            valeur économique propre dont l&apos;entreprise aurait cherché à tirer profit&nbsp;; ce point s&apos;examine
            également au regard de chaque dossier.
          </p>
          <p className={styles.ref}>
            Art. L. 111-1 et L. 112-1 du Code de la propriété intellectuelle&nbsp;; CJUE, 1<sup>er</sup> déc. 2011,
            Painer, C-145/10, pts 87 et s.
          </p>
        </div>
      </section>

      {/* Bloc pédagogique illustré */}
      <section className={styles.sec} aria-labelledby="h-originale">
        <div className={styles.wrap}>
          <span className="eyebrow">Méthode du cabinet</span>
          <h2 id="h-originale">Qu&apos;est-ce qu&apos;une photographie originale&nbsp;?</h2>
          <p className={styles.intro}>
            Aucun genre de photographie n&apos;est protégé ou exclu par principe. Trois exemples montrent ce que le
            cabinet examine&nbsp;: les contraintes techniques et la part des choix du photographe.
          </p>
          <div className={styles.exemples}>
            {EXEMPLES.map((e) => (
              <figure className={styles.ex} key={e.src}>
                <div className={styles.fig}>
                  <Image src={e.src} alt={e.alt} width={e.w} height={e.h} sizes="(max-width: 900px) 100vw, 380px" />
                  {e.reperes.map((r, i) => (
                    <span key={r.titre} className={styles.pin} style={{ left: `${r.x}%`, top: `${r.y}%` }} aria-hidden="true">
                      {i + 1}
                    </span>
                  ))}
                </div>
                <figcaption>
                  <span className={styles.genre}>{e.genre}</span>
                  <h3>{e.titre}</h3>
                  <ol className={styles.reperes}>
                    {e.reperes.map((r, i) => (
                      <li key={r.titre}>
                        <span className={styles.num} aria-hidden="true">
                          {i + 1}
                        </span>
                        <span>
                          <strong>{r.titre}.</strong> {r.texte}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className={styles.explication}>{e.explication}</p>
                  <p className={styles.provenance}>{e.provenance}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.chute}>
            Transmettez au cabinet la photographie et le courrier reçu&nbsp;: il vous indique son appréciation et le
            prix de son intervention.
          </p>
        </div>
      </section>

      <section className={`${styles.sec} ${styles.tint}`}>
        <div className={`${styles.wrap} ${styles.cols2}`}>
          <div>
            <span className="eyebrow">Les bons réflexes</span>
            <h2>Comment répondre à PicRights&nbsp;?</h2>
            <ul className={styles.liste}>
              <li>
                <strong>Ne pas régler dans la précipitation</strong> ni reconnaître une faute par écrit avant d&apos;avoir
                fait examiner la demande.
              </li>
              <li>
                <strong>Conserver le courrier et ses relances</strong>, ainsi que la référence de la photographie.
              </li>
              <li>
                <strong>Identifier la page du site</strong> où figurait l&apos;image et, si possible, la date de sa mise
                en ligne.
              </li>
              <li>
                <strong>Faire examiner la photographie</strong> avant toute réponse.
              </li>
            </ul>
          </div>
          <div>
            <span className="eyebrow">Après PicRights</span>
            <h2>Quand la mise en demeure vient de l&apos;avocat de l&apos;agence</h2>
            <p>
              Si la demande reste sans réponse, l&apos;agence peut confier le dossier à son avocat, qui adresse une mise
              en demeure, parfois suivie d&apos;une assignation. Les mêmes questions se posent alors&nbsp;: protection de
              l&apos;image, preuve des droits, réalité des usages, montant. Le cabinet intervient à ce stade comme en
              amont.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sec}>
        <div className={styles.wrap}>
          <span className="eyebrow">Comment le cabinet intervient</span>
          <h2>Une appréciation sans engagement, puis une intervention au forfait</h2>
          <ol className={styles.etapes}>
            <li>
              <span className={styles.big}>01</span>
              <strong>Transmettre</strong>
              <span>Le courrier reçu et la photographie concernée.</span>
            </li>
            <li>
              <span className={styles.big}>02</span>
              <strong>Recevoir l&apos;appréciation</strong>
              <span>Le cabinet indique son appréciation, la démarche proposée et le prix forfaitaire, sans engagement.</span>
            </li>
            <li>
              <span className={styles.big}>03</span>
              <strong>Décider</strong>
              <span>En cas d&apos;accord, une convention d&apos;honoraires forfaitaires est signée en ligne.</span>
            </li>
            <li>
              <span className={styles.big}>04</span>
              <strong>Confier le dossier</strong>
              <span>Le cabinet répond à PicRights, à l&apos;agence ou à son avocat, et suit les échanges.</span>
            </li>
          </ol>
          <p className={styles.ref}>
            Le périmètre du forfait est précisé dans la convention. Une procédure judiciaire fait l&apos;objet d&apos;une
            convention distincte.
          </p>
        </div>
      </section>

      <section className={`${styles.sec} ${styles.tint}`}>
        <div className={`${styles.wrap} ${styles.cols2}`}>
          <div>
            <span className="eyebrow">Un dossier traité par le cabinet</span>
            <h2>Photographies utilisées sans autorisation&nbsp;: une entreprise conteste la réclamation reçue</h2>
            <p>
              La contestation de la titularité des droits, des usages invoqués et du calcul de l&apos;indemnisation a
              conduit à l&apos;abandon intégral de la réclamation.
            </p>
            <p>
              <Link className={styles.lien} href={CAS}>
                Lire le cas client →
              </Link>
            </p>
          </div>
          <div>
            <span className="eyebrow">Les autres réclamations</span>
            <h2>Copytrack, Getty Images, PA Images</h2>
            <p>
              Les demandes adressées par Copytrack, par les banques d&apos;images ou par d&apos;autres agences
              soulèvent les mêmes questions&nbsp;: protection de l&apos;image, preuve des droits, usage établi, montant.
              Le cabinet les examine selon la même méthode.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sec}>
        <div className={styles.wrap}>
          <span className="eyebrow">Questions fréquentes</span>
          <h2>Questions fréquentes</h2>
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.wrap}>
          <h2>Un courrier PicRights vient d&apos;arriver&nbsp;?</h2>
          <p>
            Transmettez au cabinet la photographie et le courrier reçu&nbsp;: il vous indique son appréciation et le prix
            de son intervention.
          </p>
          <Actions />
        </div>
      </section>
    </main>
  );
}
