import type { Metadata } from "next";
import type { Formation } from "./types";

/** Métadonnées Next à partir d'une formation (title, description, canonical). */
export function formationMetadata(f: Formation): Metadata {
  const path = `/formations/${f.slug}`;
  return {
    title: f.title,
    description: f.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: f.title, description: f.metaDescription, url: path, siteName: "Lazarègue Avocats", locale: "fr_FR", type: "website", images: [{ url: "/og-lazaregue-avocats.jpg", width: 1200, height: 630, alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
    twitter: { card: "summary_large_image", title: f.title, description: f.metaDescription, images: [{ url: "/og-lazaregue-avocats.jpg", alt: "Lazarègue Avocats — avocats en droit du numérique" }] },
  };
}
