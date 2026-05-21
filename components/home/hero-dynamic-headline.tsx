"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "DONNÉES",
  "PROJETS",
  "INVESTISSEMENTS",
  "ACTIFS NUMÉRIQUES",
  "CODES",
  "PLATEFORMES",
  "IA",
  "RÉPUTATIONS",
  "CONTRATS",
  "SYSTÈMES",
];

const INTERVAL_MS = 1800;

export function HeroDynamicHeadline() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % WORDS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="laz-hero-h3-dynamic-slot" aria-live="polite">
      {WORDS.map((word, idx) => (
        <span
          key={word}
          className={`laz-hero-h3-dynamic${idx === current ? " visible" : ""}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
