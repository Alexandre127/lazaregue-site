import type { Metadata } from "next";

const TITLE = "Colophon — comment ce site est fait | Lazarègue Avocats";
const DESCRIPTION =
  "Technologies, hébergement, mesure d'audience, consentement, usage de l'intelligence artificielle, crédits et licences : l'inventaire du site du cabinet Lazarègue Avocats.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/colophon" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/colophon",
    siteName: "Lazarègue Avocats",
    images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
};

const MAJ = "1er octobre 2026";

/**
 * Colophon — « comment ce site est fait ». Rendu dans le layout du site (header
 * et footer habituels). Reprend fidèlement la maquette docs/colophon.html, mais :
 *  - polices du site, auto-hébergées (var(--ff-*)), aucun appel à Google Fonts ;
 *  - toutes les classes scopées sous .lz-colophon (la maquette utilise des
 *    classes génériques — .wrap, .entry… — qui collisionneraient autrement) ;
 *  - mentions grisées de la maquette : soit renseignées (vérifiables dans le
 *    code), soit reformulées sans placeholder — aucune mention « à vérifier »
 *    dans la page publiée (les points restant à confirmer sont listés au
 *    rapport) ;
 *  - § 03 : la ligne « Publicité » reprend la formulation exacte de la politique
 *    de cookies (Microsoft Clarity) ; la ligne « Accessibilité » (non vérifiable)
 *    est retirée.
 */
export default function Page() {
  return (
    <main id="contenu" className="lz-colophon">
      <style>{CSS}</style>

      <header className="imprint">
        <div className="wrap">
          <div>
            <h1>
              COLO<em>PHON</em>
            </h1>
            <p className="sub">
              Comment ce site est fait&nbsp;: ce qu&#39;il utilise, ce qu&#39;il mesure, ce qu&#39;il
              conserve.
            </p>
          </div>
          <div className="record">
            <dl>
              <dt>version</dt>
              <dd>
                <b>2.0</b>
              </dd>
              <dt>mise à jour</dt>
              <dd>{MAJ}</dd>
              <dt>outils de mesure</dt>
              <dd>
                <b>sur consentement</b>
              </dd>
              <dt>refuser</dt>
              <dd>aussi simple qu&#39;accepter</dd>
              <dt>publicité</dt>
              <dd>
                <b>aucune</b>
              </dd>
              <dt>demandes reçues</dt>
              <dd>hébergées dans l&#39;UE</dd>
              <dt>polices</dt>
              <dd>auto-hébergées</dd>
              <dt>visuels de synthèse</dt>
              <dd>signalés</dd>
            </dl>
          </div>
        </div>
      </header>

      <section className="lede">
        <div className="wrap">
          <p>
            Cette page décrit le site que vous consultez&nbsp;: les technologies qu&#39;il utilise, où
            il est hébergé, ce qu&#39;il mesure, ce qu&#39;il conserve, ce qu&#39;il doit à d&#39;autres
            et ce qu&#39;il doit à des outils d&#39;intelligence artificielle. Elle est datée et mise à
            jour à chaque évolution notable.
          </p>
          <p>
            Le colophon est une tradition de l&#39;édition&nbsp;: la note finale où l&#39;imprimeur
            indiquait le papier, les caractères et l&#39;atelier.
          </p>
        </div>
      </section>

      <section className="entry">
        <div className="wrap">
          <div className="gutter">
            <span className="ref">§ 01</span> parti pris
          </div>
          <div className="body">
            <h2>Un site conçu par le cabinet</h2>
            <p>
              Ce site n&#39;a pas été confié à une agence. Il a été conçu et développé par le cabinet,
              avec l&#39;assistance d&#39;outils de génération de code décrits plus bas.
            </p>
            <p>
              Ce choix tient à la nature de l&#39;activité du cabinet. Conseiller des entreprises sur
              leurs contrats informatiques, leurs sous-traitants ou leur conformité en matière de
              données suppose de connaître de l&#39;intérieur ce que recouvrent ces arbitrages&nbsp;:
              choisir un hébergeur, organiser le recueil du consentement, lire une licence jusqu&#39;à
              sa dernière clause.
            </p>
          </div>
        </div>
      </section>

      <section className="entry">
        <div className="wrap">
          <div className="gutter">
            <span className="ref">§ 02</span> chaîne technique
          </div>
          <div className="body">
            <h2>Ce qui fait tourner ces pages</h2>
            <h3>développement</h3>
            <p>
              Le site est une application Next.js 16.2.6, écrite en TypeScript, sur React 19. Le globe
              de la page d&#39;accueil repose sur la bibliothèque three.js. Les pages sont versionnées
              comme du code, sans système de gestion de contenu tiers.
            </p>
            <h3>hébergement</h3>
            <p>
              Le site est hébergé par Vercel Inc., société de droit américain. Il ne comporte ni base
              d&#39;utilisateurs, ni compte, ni espace personnel&nbsp;: aucune donnée personnelle
              n&#39;y est stockée en propre. Le nom de domaine est enregistré auprès d&#39;IONOS.
            </p>
            <h3>messagerie et suivi des demandes</h3>
            <p>
              Les demandes envoyées par le formulaire sont acheminées par la messagerie du cabinet,
              hébergée par IONOS (Union européenne), et enregistrées dans le logiciel de suivi
              HubSpot, dont les données sont hébergées dans l&#39;Union européenne.
            </p>
            <h3>l&#39;arbitrage de l&#39;hébergement</h3>
            <p>
              Recourir à un hébergeur américain pose deux questions&nbsp;: la possibilité d&#39;un
              accès aux données par les autorités des États-Unis en vertu de leur législation, et
              l&#39;encadrement des transferts hors de l&#39;Union européenne. La seconde est traitée
              par la décision d&#39;adéquation «&nbsp;Data Privacy Framework&nbsp;» du 10 juillet 2023,
              complétée par les clauses contractuelles types de la Commission européenne. La première
              ne se règle pas par contrat.
            </p>
            <p>
              Ce choix a été retenu parce que le site ne conserve pas lui-même de données
              personnelles&nbsp;: il n&#39;a ni base d&#39;utilisateurs, ni compte, ni espace
              personnel. Les demandes adressées au cabinet sont conservées dans un logiciel hébergé en
              Europe, et non chez l&#39;hébergeur du site.
            </p>
          </div>
        </div>
      </section>

      <section className="entry">
        <div className="wrap">
          <div className="gutter">
            <span className="ref">§ 03</span> relevé
          </div>
          <div className="body">
            <h2>Ce que ce site mesure, et comment</h2>
            <p>
              Ces informations sont vérifiables par quiconque ouvre les outils de développement de son
              navigateur.
            </p>
            <table className="ledger">
              <thead>
                <tr>
                  <th>élément</th>
                  <th>observation</th>
                  <th>statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Avant tout choix</td>
                  <td>
                    Aucun outil de mesure soumis à consentement n&#39;est chargé.
                    <p className="note">
                      «&nbsp;Tout accepter&nbsp;» et «&nbsp;Tout refuser&nbsp;» sont présentés de la
                      même façon. Refuser n&#39;a aucune conséquence sur l&#39;accès au site.
                    </p>
                  </td>
                  <td>
                    <span className="state off">rien d&#39;activé</span>
                  </td>
                </tr>
                <tr>
                  <td>Fréquentation globale</td>
                  <td>Vercel Web Analytics, sans cookie ni identifiant persistant.</td>
                  <td>
                    <span className="state">sans cookie</span>
                  </td>
                </tr>
                <tr>
                  <td>Statistiques détaillées</td>
                  <td>Google Analytics 4&nbsp;: pages consultées, parcours, provenance.</td>
                  <td>
                    <span className="state consent">sur consentement</span>
                  </td>
                </tr>
                <tr>
                  <td>Usage des pages</td>
                  <td>
                    Microsoft Clarity&nbsp;: endroits où les visiteurs cliquent, hésitent ou
                    s&#39;arrêtent.
                    <p className="note">
                      Le texte saisi dans les formulaires et le texte affiché sont masqués&nbsp;: ils
                      ne sont jamais enregistrés.
                    </p>
                  </td>
                  <td>
                    <span className="state consent">sur consentement</span>
                  </td>
                </tr>
                <tr>
                  <td>Suivi des demandes</td>
                  <td>
                    HubSpot&nbsp;: relie les visites d&#39;une personne à la demande qu&#39;elle
                    adresse au cabinet.
                  </td>
                  <td>
                    <span className="state consent">sur consentement</span>
                  </td>
                </tr>
                <tr>
                  <td>Publicité</td>
                  <td>
                    Le site n&#39;utilise aucun traceur publicitaire ni bouton de partage. Seul
                    Microsoft Clarity, s&#39;il est accepté, peut déposer des cookies Microsoft
                    susceptibles d&#39;être utilisés au-delà de ce site.
                  </td>
                  <td>
                    <span className="state off">aucune</span>
                  </td>
                </tr>
                <tr>
                  <td>Polices, images, vidéos</td>
                  <td>
                    Servies depuis le domaine du site, sans appel à un serveur tiers.
                    <p className="note">Sur téléphone, aucune vidéo n&#39;est chargée.</p>
                  </td>
                  <td>
                    <span className="state">auto-hébergées</span>
                  </td>
                </tr>
                <tr>
                  <td>Formulaire de contact</td>
                  <td>
                    Demandes transmises au cabinet par e-mail et enregistrées dans HubSpot (Union
                    européenne), conservées 3 ans après le dernier échange en l&#39;absence de suite.
                    Aucune cession.
                  </td>
                  <td>
                    <span className="state">limité</span>
                  </td>
                </tr>
                <tr>
                  <td>Journaux techniques</td>
                  <td>
                    L&#39;hébergeur conserve adresse IP, horodatage et navigateur, à des fins de
                    sécurité, pour la durée qu&#39;il applique.
                  </td>
                  <td>
                    <span className="state">conservés</span>
                  </td>
                </tr>
                <tr>
                  <td>Consentement</td>
                  <td>
                    Bandeau CookieConsent, bibliothèque libre hébergée sur le site. Choix conservé
                    6&nbsp;mois, modifiable à tout moment par «&nbsp;Gérer les cookies&nbsp;».
                  </td>
                  <td>
                    <span className="state">6 mois</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="note" style={{ marginTop: 18 }}>
              Le détail des cookies figure dans la <a href="/politique-cookies">politique de cookies</a>
              &nbsp;; celui des traitements de données et de vos droits, dans la{" "}
              <a href="/politique-de-confidentialite">politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="entry">
        <div className="wrap">
          <div className="gutter">
            <span className="ref">§ 04</span> intelligence artificielle
          </div>
          <div className="body">
            <h2>La part des outils, et celle des avocats</h2>
            <h3>code</h3>
            <p>
              Une partie importante du code de ce site a été produite avec l&#39;assistance d&#39;un
              agent de génération de code, Claude Code (Anthropic). L&#39;architecture, les choix de
              conception et la relecture relèvent du cabinet.
            </p>
            <h3>textes</h3>
            <p>
              Les contenus juridiques publiés ici peuvent être préparés avec l&#39;assistance
              d&#39;outils de génération de texte. Aucun n&#39;est publié sans relecture et validation
              par un avocat du cabinet, qui en assume la responsabilité.
            </p>
            <h3>images et vidéos</h3>
            <p>
              Les portraits de l&#39;équipe, la photo de groupe et certaines séquences vidéo
              d&#39;illustration — notamment les vidéos de présentation de l&#39;accueil et de certaines
              rubriques — sont des contenus de synthèse, produits par des modèles génératifs. Ils sont
              signalés ici conformément à la logique de transparence de l&#39;article 50 du règlement
              (UE) 2024/1689 sur l&#39;intelligence artificielle.
            </p>
            <h3>vos demandes</h3>
            <p>
              Les messages adressés au cabinet par ce site sont lus et traités par ses avocats. Ils ne
              sont soumis à aucun outil d&#39;intelligence artificielle pour y répondre, et ne servent à
              entraîner aucun modèle.
            </p>
          </div>
        </div>
      </section>

      <section className="entry">
        <div className="wrap">
          <div className="gutter">
            <span className="ref">§ 05</span> crédits
          </div>
          <div className="body">
            <h2>Ce que ce site doit à d&#39;autres</h2>
            <table className="ledger">
              <tbody>
                <tr>
                  <td>Typographies</td>
                  <td>
                    Bebas Neue — Ryoichi Tsunekawa, Dharma Type. Space Grotesk — Florian Karsten.
                    DM Mono — Colophon Foundry.
                    <p className="note">Licence SIL Open Font 1.1.</p>
                  </td>
                  <td>
                    <span className="state">libres</span>
                  </td>
                </tr>
                <tr>
                  <td>Image de la Terre</td>
                  <td>
                    Textures du globe issues des images «&nbsp;Blue Marble&nbsp;» et «&nbsp;Black
                    Marble&nbsp;» de la NASA, servies depuis le domaine du site.
                  </td>
                  <td>
                    <span className="state">domaine public</span>
                  </td>
                </tr>
                <tr>
                  <td>Visuels de synthèse</td>
                  <td>
                    Portraits de l&#39;équipe, photo de groupe et séquences vidéo d&#39;illustration&nbsp;:
                    contenus de synthèse produits par des modèles génératifs, signalés au §&nbsp;04.
                  </td>
                  <td>
                    <span className="state">signalés</span>
                  </td>
                </tr>
                <tr>
                  <td>Bibliothèques</td>
                  <td>
                    Next.js 16 et React 19, three.js, CookieConsent.
                    <p className="note">Licence MIT.</p>
                  </td>
                  <td>
                    <span className="state">libres</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="note" style={{ marginTop: 18 }}>
              Une erreur ou un oubli dans ces crédits peut être signalé à{" "}
              <a href="mailto:contact@lazaregue-avocats.fr">contact@lazaregue-avocats.fr</a>. Il sera
              corrigé, et la correction datée ci-dessous.
            </p>
          </div>
        </div>
      </section>

      <section className="entry">
        <div className="wrap">
          <div className="gutter">
            <span className="ref">§ 06</span> versions
          </div>
          <div className="body">
            <h2>Journal des versions</h2>
            <table className="versions">
              <tbody>
                <tr>
                  <td>2.0</td>
                  <td>{MAJ}</td>
                  <td>
                    Nouveau site&nbsp;: refonte complète, dix domaines de compétence, cas clients,
                    ressources, formations, bandeau de consentement et mesure d&#39;audience,
                    publication de ce colophon.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Charte v1.0, reprise de la maquette — polices du site (var(--ff-*)), classes
   scopées sous .lz-colophon. */
const CSS = `
.lz-colophon{
  --electric:#1A47FF;--periwinkle:#4D6FFF;--deep:#0A2ACC;--navy:#0A0F2E;--ink:#0A0A14;
  --ghost:#F4F4F8;--white:#FFFFFF;--muted:#8888A0;--border:#E0E0EE;
  --display:var(--ff-display),Impact,sans-serif;
  --sans:var(--ff-body),system-ui,sans-serif;
  --mono:var(--ff-mono),ui-monospace,monospace;
  background:var(--ghost);color:var(--ink);font-family:var(--sans);
  font-size:17px;line-height:1.75;-webkit-font-smoothing:antialiased;
}
.lz-colophon a{color:var(--electric);text-decoration:none;border-bottom:1px solid rgba(26,71,255,.3)}
.lz-colophon a:hover{border-bottom-color:var(--electric)}
.lz-colophon a:focus-visible{outline:2px solid var(--electric);outline-offset:3px}
.lz-colophon .wrap{max-width:1080px;margin:0 auto;padding:0 32px}

/* Héro : dégage l'en-tête opaque du site (convention globals.css :
   padding-top calc(var(--header-h) + 12px) mini). */
.lz-colophon .imprint{background:var(--navy);color:var(--white);padding:calc(var(--header-h) + 28px) 0 72px}
.lz-colophon .imprint .wrap{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:64px;align-items:end}
.lz-colophon .imprint h1{font-family:var(--display);font-weight:400;font-size:clamp(76px,13vw,168px);line-height:.82;letter-spacing:.01em;color:var(--white)}
.lz-colophon .imprint h1 em{font-style:normal;color:var(--periwinkle)}
.lz-colophon .imprint .sub{font-weight:300;font-size:20px;line-height:1.5;color:#C9CCE6;margin-top:24px;max-width:32ch}
.lz-colophon .record{border-top:2px solid var(--electric);padding-top:18px}
.lz-colophon .record dl{display:grid;grid-template-columns:auto 1fr;gap:9px 20px;font-family:var(--mono);font-size:12.5px;line-height:1.5}
.lz-colophon .record dt{color:#6E74A8;letter-spacing:.14em;margin:0}
.lz-colophon .record dd{color:#DEE0F0;text-align:right;margin:0}
.lz-colophon .record dd b{font-weight:500;color:var(--periwinkle)}

.lz-colophon .lede{background:var(--white);border-bottom:1px solid var(--border);padding:56px 0}
.lz-colophon .lede p{font-size:21px;line-height:1.6;max-width:62ch;color:var(--ink)}
.lz-colophon .lede p+p{font-size:17px;color:#4A4A63;margin-top:20px;line-height:1.75}

.lz-colophon .entry{border-bottom:1px solid var(--border);padding:64px 0}
.lz-colophon .entry .wrap{display:grid;grid-template-columns:150px minmax(0,1fr);gap:48px}
.lz-colophon .gutter{font-family:var(--mono);font-size:12px;letter-spacing:.14em;color:var(--muted);line-height:1.9}
.lz-colophon .gutter .ref{color:var(--electric);display:block}
.lz-colophon .body{max-width:68ch}
.lz-colophon .body h2{font-weight:500;font-size:29px;line-height:1.25;letter-spacing:-.01em;margin:0 0 22px;color:var(--ink)}
.lz-colophon .body p{color:var(--ink)}
.lz-colophon .body p+p{margin-top:18px}
.lz-colophon .body p+h3,.lz-colophon .body table+h3{margin-top:32px}
.lz-colophon .body h3{font-family:var(--mono);font-size:13px;font-weight:500;letter-spacing:.1em;color:var(--deep);margin-bottom:8px}

.lz-colophon .ledger{margin:28px 0 6px;width:100%;border-collapse:collapse;font-size:15.5px}
.lz-colophon .ledger th{font-family:var(--mono);font-size:11.5px;font-weight:400;letter-spacing:.14em;color:var(--muted);text-align:left;padding:0 14px 10px 0;border-bottom:1px solid var(--border)}
.lz-colophon .ledger th:last-child{text-align:right;padding-right:0}
.lz-colophon .ledger td{padding:16px 14px 16px 0;border-bottom:1px solid var(--border);vertical-align:top;color:var(--ink)}
.lz-colophon .ledger td:first-child{font-weight:500;width:30%}
.lz-colophon .ledger td:last-child{text-align:right;padding-right:0;width:130px}
.lz-colophon .ledger tr:last-child td{border-bottom:0}
.lz-colophon .state{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;color:var(--deep);white-space:nowrap}
.lz-colophon .state.off{color:var(--muted)}
.lz-colophon .state.consent{color:var(--electric)}
.lz-colophon .note{font-size:14.5px;color:#5A5A72;line-height:1.6;margin-top:5px}

.lz-colophon .versions{width:100%;border-collapse:collapse;margin-top:8px;font-size:15.5px}
.lz-colophon .versions td{padding:15px 16px 15px 0;border-bottom:1px solid var(--border);vertical-align:top;color:var(--ink)}
.lz-colophon .versions tr:last-child td{border-bottom:0}
.lz-colophon .versions td:first-child{font-family:var(--display);font-size:26px;color:var(--electric);width:74px;line-height:1}
.lz-colophon .versions td:nth-child(2){font-family:var(--mono);font-size:12.5px;color:var(--muted);width:120px;letter-spacing:.08em}

@media (max-width:900px){
  .lz-colophon .imprint .wrap{grid-template-columns:minmax(0,1fr);gap:44px;align-items:start}
  .lz-colophon .entry .wrap{grid-template-columns:minmax(0,1fr);gap:16px}
  .lz-colophon .gutter{display:flex;gap:14px;line-height:1.4}
}
@media (max-width:620px){
  .lz-colophon{font-size:16px}
  .lz-colophon .wrap{padding:0 20px}
  .lz-colophon .imprint{padding:calc(var(--header-h) + 16px) 0 52px}
  .lz-colophon .lede p{font-size:19px}
  .lz-colophon .body h2{font-size:25px}
  .lz-colophon .ledger thead{display:none}
  .lz-colophon .ledger tr{display:block;border-bottom:1px solid var(--border);padding:14px 0}
  .lz-colophon .ledger tr:last-child{border-bottom:0}
  .lz-colophon .ledger td{display:block;border:0;padding:2px 0;width:auto!important;text-align:left!important}
  .lz-colophon .ledger td:last-child{margin-top:6px}
  .lz-colophon .versions td:nth-child(2){width:96px}
  .lz-colophon .record dl{font-size:12px}
}
@media (prefers-reduced-motion:reduce){.lz-colophon *{transition:none!important;animation:none!important}}
`;
