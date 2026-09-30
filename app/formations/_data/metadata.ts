import type { Metadata } from "next";
import type { Formation } from "./types";

/** Métadonnées Next à partir d'une formation (title, description, canonical). */
export function formationMetadata(f: Formation): Metadata {
  const path = `/formations/${f.slug}`;
  return {
    title: f.title,
    description: f.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: f.title, description: f.metaDescription, url: path, type: "website" },
  };
}
