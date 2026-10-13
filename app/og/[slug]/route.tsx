import path from "path";
import { ImageResponse } from "next/og";
import { ACCOMPAGNEMENT_CARTES, FAMILLES, FORMATIONS_LINKS, RESSOURCES_CARTES } from "@/components/header/nav-data";

/**
 * Image de partage (Open Graph / Twitter) d'une page de domaine, d'offre, de
 * formation, de rubrique ou institutionnelle, 1200 × 630, servie à `/og/<slug>`.
 * Slug = dernier segment de l'adresse pour les domaines et les offres ; adresse
 * entière, barres remplacées par des tirets, pour les autres pages
 * (`/formations/rgpd` → `formations-rgpd`). Même principe que
 * `/ressources/og/<slug>` : générée une fois au build.
 *
 * Gabarit : logo complet en haut à gauche, sur-titre en DM Mono, trait bleu,
 * titre en Bebas Neue blanc, sur la marge gauche de l'image générique
 * (`/og-lazaregue-avocats.jpg`). Fond : la photo principale (hero) de la page
 * voilée de navy à 50 % quand elle en a une, sinon navy uni.
 *
 * Titres et sur-titres lus dans la source unique (`nav-data.ts`) chaque fois
 * qu'elle les porte : domaine et sa famille, carte d'offre, formation, rubrique
 * de ressources. Seuls les intitulés sans équivalent dans le menu (rubrique
 * Formations, Le cabinet, Contact) et les photos sont déclarés ici.
 */
export const dynamic = "force-static";

/**
 * Photo principale des pages qui en ont une (les autres : fond navy uni). Pour
 * les pages dont l'en-tête est une vidéo, `public/images/og/` contient une image
 * extraite de cette vidéo (version ordinateur).
 */
const PHOTOS: Record<string, string> = {
  "rgpd-donnees-personnelles": "/images/og/rgpd.jpg",
  cybercriminalite: "/images/og/cybercriminalite.jpg",
  "diffamation-retrait-contenus": "/images/og/diffamation.jpg",
  contact: "/images/og/contact.jpg",
  formations: "/images/formations/opage-formation.webp",
  "le-cabinet": "/images/cabinet-interieur.jpg",
  cybersecurite: "/images/cyber-hero-facade.jpg",
  "escroquerie-fraude-bancaire": "/images/fraude-bancaire-hero.webp",
  "ma-tech": "/images/ma-tech/ma-tech-1200.jpg",
};

const slugDe = (href: string) => href.split("/").pop()!;
const slugEntier = (href: string) => href.slice(1).replace(/\//g, "-");

const FORMATION_ENTREPRISES = "Formation · Entreprises";
const FORMATION_AVOCATS = "Formation · Avocats";

/**
 * Pages couvertes : les dix domaines, les deux offres, la rubrique Formations
 * et ses quatre formations, les trois rubriques de ressources, Le cabinet et
 * Contact. L'accueil et les autres pages gardent `/og-lazaregue-avocats.jpg`.
 */
const PAGES: Record<string, { surtitre: string; titre: string }> = Object.fromEntries([
  ...FAMILLES.flatMap((f) => f.domaines.map((d) => [slugDe(d.href), { surtitre: f.intitule, titre: d.titre }] as const)),
  ...ACCOMPAGNEMENT_CARTES.filter((c) => c.href !== "/formations").map((c) => [slugDe(c.href), { surtitre: c.surtitre ?? "Accompagnement", titre: c.titre }] as const),
  ["formations", { surtitre: FORMATION_ENTREPRISES, titre: "Formations en droit du numérique" }] as const,
  ...FORMATIONS_LINKS.map((f) => [slugEntier(f.href), { surtitre: f.href === "/formations/ia-avocats" ? FORMATION_AVOCATS : FORMATION_ENTREPRISES, titre: f.label }] as const),
  ...RESSOURCES_CARTES.map((c) => [slugEntier(c.href), { surtitre: "Ressources", titre: c.titre }] as const),
  ["le-cabinet", { surtitre: "Paris · depuis 2016", titre: "Le cabinet" }] as const,
  ["contact", { surtitre: "18 rue de Tilsitt · Paris 17e", titre: "Échanger avec un avocat" }] as const,
]);

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

const NAVY = "#0A0F2E";
const BLEU = "#1A47FF";
const MARGE = 85; // marge gauche de l'image générique

/** Mots qui ne doivent jamais terminer une ligne de titre. */
const MOTS_LIES = new Set(["ET", "OU", "DE", "DU", "DES", "D’", "LA", "LE", "LES", "L’", "À", "AU", "AUX", "EN", "UN", "UNE", "SUR", "POUR"]);

/**
 * Coupe un titre en lignes d'au plus `max` caractères. Aucune ligne ne finit
 * par un mot de liaison, et un « ET » / « OU » passe en début de ligne dès que
 * la suite du titre ne tient plus sur la ligne en cours (pour ne pas séparer
 * « ET AI ACT » ou « ET DUE DILIGENCE »).
 */
function lignes(titre: string, max = 18): string[] {
  const mots = titre.split(/\s+/);
  const out: string[][] = [[]];
  mots.forEach((mot, i) => {
    const courante = out[out.length - 1];
    const longueur = courante.join(" ").length;
    const reste = mots.slice(i).join(" ").length;
    const conjonction = (mot === "ET" || mot === "OU") && longueur >= 8 && longueur + 1 + reste > max;
    if (courante.length && (conjonction || longueur + 1 + mot.length > max)) out.push([mot]);
    else courante.push(mot);
  });
  for (let i = 0; i < out.length - 1; i++) {
    while (out[i].length > 1 && MOTS_LIES.has(out[i][out[i].length - 1])) out[i + 1].unshift(out[i].pop()!);
  }
  return out.map((l) => l.join(" "));
}

async function police(famille: string, texte: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${famille}&text=${encodeURIComponent(texte)}`).then((r) => r.text());
    const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return new Response("Introuvable", { status: 404 });

  const surtitre = page.surtitre.toUpperCase();
  const titre = page.titre.toUpperCase();
  const photo = PHOTOS[slug];
  // `sharp` est fourni par Next ; s'il manque, l'image est produite sans photo
  // et en PNG plutôt que de faire échouer le build.
  const sharp = await import("sharp").then((m) => m.default).catch(() => null);
  const [bebas, mono, fond] = await Promise.all([
    police("Bebas+Neue", `${titre} LAZARÈGUE AVOCATS`),
    police("DM+Mono:wght@500", surtitre),
    // Recadrée et convertie en JPEG : le moteur de rendu ne lit ni le WebP ni
    // l'AVIF, et n'a pas à décoder une photo de plusieurs milliers de pixels.
    photo && sharp
      ? sharp(path.join(process.cwd(), "public", photo)).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82 }).toBuffer()
      : null,
  ]);
  const fonts = [
    ...(bebas ? [{ name: "Bebas Neue", data: bebas, weight: 400 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "DM Mono", data: mono, weight: 500 as const, style: "normal" as const }] : []),
  ];
  const src = fond ? `data:image/jpeg;base64,${fond.toString("base64")}` : null;

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: NAVY, position: "relative" }}>
        {/* Photo principale de la page, plein cadre, puis voile navy pour le contraste du texte. */}
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendu d'image (satori), pas du HTML servi */}
            <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630 }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", background: NAVY, opacity: 0.5 }} />
            {/* Dégradé sombre discret en haut à gauche : le logo reste lisible sur une photo claire. */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 900, height: 360, display: "flex", backgroundImage: "radial-gradient(ellipse at top left, rgba(10,15,46,0.92) 0%, rgba(10,15,46,0.6) 35%, rgba(10,15,46,0) 70%)" }} />
          </>
        ) : null}
        {/* Logo complet, en haut à gauche, comme sur l'image générique. */}
        <div style={{ position: "absolute", left: MARGE, top: 78, display: "flex", alignItems: "center" }}>
          <svg width="58" height="52" viewBox="0 0 112 100">
            <polygon points="22.1,0 42.2,0 81,100 61.7,100" fill={BLEU} />
            <polygon points="79.3,60.3 95.7,60.3 111.7,100 94,100" fill={BLEU} />
            <polygon points="14.7,60.3 33.6,60.3 20.2,100 1.2,100" fill="#FFFFFF" />
          </svg>
          <div style={{ display: "flex", marginLeft: 20, fontFamily: "Bebas Neue", fontSize: 46, letterSpacing: 1, lineHeight: 1 }}>
            <span style={{ color: "#FFFFFF" }}>LAZARÈGUE</span>
            <span style={{ color: BLEU, marginLeft: 12 }}>AVOCATS</span>
          </div>
        </div>
        {/* Bloc de texte, aligné sur la marge gauche du logo. */}
        <div style={{ position: "absolute", left: MARGE, top: 170, bottom: 60, width: 1200 - 2 * MARGE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", fontFamily: "DM Mono", fontSize: 24, letterSpacing: 2, color: "#FFFFFF", opacity: 0.85 }}>{surtitre}</div>
          <div style={{ display: "flex", width: 72, height: 5, background: BLEU, marginTop: 18, marginBottom: 22 }} />
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Bebas Neue", fontSize: 92, lineHeight: 1, color: "#FFFFFF" }}>
            {/* Le moteur de rendu mesure l'apostrophe typographique trop large
                (environ 18 px à ce corps) : on coupe après elle et on rattrape
                l'écart, sinon une espace double apparaît plus loin dans la ligne. */}
            {lignes(titre).map((l) => (
              <div key={l} style={{ display: "flex" }}>
                {l.split(/(?<=’)/).map((morceau, i) => (
                  <div key={i} style={{ display: "flex", marginLeft: i ? -18 : 0 }}>{morceau}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) },
  );
  if (!sharp) return image;
  // JPEG : une photo en PNG dépasse le mégaoctet.
  const jpeg = await sharp(Buffer.from(await image.arrayBuffer())).jpeg({ quality: 86 }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}
