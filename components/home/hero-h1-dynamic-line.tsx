"use client";

import { useEffect, useState } from "react";

const H1_WORDS = [
  "CYBERSÉCURITÉ",
  "DROIT DES DONNÉES",
  "INTELLIGENCE ARTIFICIELLE",
  "CONTENTIEUX TECH",
  "DROIT DES RÉSEAUX",
  "CYBERCRIMINALITÉ",
  "CONTRATS INFORMATIQUES",
];

const INTERVAL_MS = 1500;

export function HeroH1DynamicLine() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % H1_WORDS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="laz-hero-h1-dynamic-slot" aria-live="polite">
      {H1_WORDS.map((word, idx) => (
        <span
          key={word}
          className={`laz-hero-h1-dynamic-word${idx === current ? " visible" : ""}`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
