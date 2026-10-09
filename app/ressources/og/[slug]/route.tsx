import { ImageResponse } from "next/og";
import { ARTICLES, DOM_LABEL } from "../../data/articles";

/**
 * Image de partage (Open Graph / Twitter) d'une ressource, 1200 × 630, générée
 * depuis le registre : fond navy, sur-titre du domaine en DM Mono, titre en
 * Bebas Neue blanc, symbole du cabinet en bas à droite.
 *
 * Le texte tient dans le carré central (630 px) : un recadrage carré reste
 * lisible. Générée une fois au build pour chaque ressource (statique).
 * Les polices sont lues chez Google Fonts au build ; en cas d'échec, l'image
 * est produite avec la police par défaut plutôt que de faire échouer le build.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

const NAVY = "#0A0F2E";
const BLEU = "#1A47FF";

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
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return new Response("Introuvable", { status: 404 });

  const surtitre = DOM_LABEL[a.dom].toUpperCase();
  const titre = a.title.toUpperCase();
  const [bebas, mono] = await Promise.all([police("Bebas+Neue", titre), police("DM+Mono:wght@500", surtitre)]);
  const fonts = [
    ...(bebas ? [{ name: "Bebas Neue", data: bebas, weight: 400 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "DM Mono", data: mono, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: NAVY, position: "relative" }}>
        {/* Carré central de sécurité : 630 px de large, marges intérieures. */}
        <div style={{ width: 630, height: 630, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 34px" }}>
          <div style={{ display: "flex", fontFamily: "DM Mono", fontSize: 24, letterSpacing: 2, color: "#FFFFFF", opacity: 0.85 }}>{surtitre}</div>
          <div style={{ display: "flex", width: 72, height: 5, background: BLEU, marginTop: 18, marginBottom: 22 }} />
          <div style={{ display: "flex", fontFamily: "Bebas Neue", fontSize: titre.length > 70 ? 58 : 70, lineHeight: 1, color: "#FFFFFF" }}>{titre}</div>
        </div>
        {/* Symbole du cabinet, en bas à droite. */}
        <svg width="90" height="80" viewBox="0 0 112 100" style={{ position: "absolute", right: 48, bottom: 44 }}>
          <polygon points="22.1,0 42.2,0 81,100 61.7,100" fill={BLEU} />
          <polygon points="79.3,60.3 95.7,60.3 111.7,100 94,100" fill={BLEU} />
          <polygon points="14.7,60.3 33.6,60.3 20.2,100 1.2,100" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) },
  );
}
