"use client";

import { useState } from "react";
import styles from "../article.module.css";

/** Partage en fin d'article : LinkedIn, copie du lien, impression. */
export default function ShareBar() {
  const [copied, setCopied] = useState(false);

  function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* copie indisponible : sans effet */
    }
  }

  return (
    <div className={styles.share}>
      <span>Partager</span>
      <button type="button" onClick={share} aria-label="Partager sur LinkedIn">in</button>
      <button type="button" onClick={copy} aria-label="Copier le lien">⧉</button>
      <button type="button" onClick={() => window.print()} aria-label="Imprimer">⎙</button>
      <span className={styles.copied} role="status" aria-live="polite">
        {copied ? "Lien copié" : ""}
      </span>
    </div>
  );
}
