import type { Metadata } from "next";
import type { Formation } from "./types";

/** Métadonnées Next à partir d'une formation (title, description, canonical). */
export function formationMetadata(f: Formation): Metadata {
  const path = `/formations/${f.slug}`;
  // Image de partage propre à la formation (voir app/og/[slug]/route.tsx).
  const image = `/og/formations-${f.slug}`;
  const alt = f.title;
  return {
    title: f.title,
    description: f.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: f.title, description: f.metaDescription, url: path, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website", images: [{ url: image, width: 1200, height: 630, alt }] },
    twitter: { card: "summary_large_image", title: f.title, description: f.metaDescription, images: [{ url: image, alt }] },
  };
}
