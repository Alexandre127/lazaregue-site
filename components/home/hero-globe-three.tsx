"use client";

import { initPremiumGlobe } from "@/lib/globe/init-premium-globe";
import { useEffect, useRef } from "react";

export function HeroGlobeThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardCityRef = useRef<HTMLDivElement>(null);
  const cardTitleRef = useRef<HTMLDivElement>(null);
  const cardInsightRef = useRef<HTMLDivElement>(null);
  const cardCoordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const cardCity = cardCityRef.current;
    const cardTitle = cardTitleRef.current;
    const cardInsight = cardInsightRef.current;
    const cardCoord = cardCoordRef.current;

    if (
      !container ||
      !card ||
      !cardCity ||
      !cardTitle ||
      !cardInsight ||
      !cardCoord
    ) {
      return;
    }

    const cleanup = initPremiumGlobe(container, {
      card,
      cardCity,
      cardTitle,
      cardInsight,
      cardCoord,
    });

    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className="laz-globe-three" aria-hidden>
      <div ref={cardRef} className="laz-city-card">
        <div className="laz-city-card-inner">
          <div className="laz-city-card-header">
            <div className="laz-city-card-dot" />
            <div ref={cardCityRef} className="laz-city-card-name">
              —
            </div>
          </div>
          <div className="laz-city-card-divider" />
          <div ref={cardTitleRef} className="laz-city-card-title">
            —
          </div>
          <div ref={cardInsightRef} className="laz-city-card-insight">
            —
          </div>
          <div className="laz-city-card-footer">
            <div ref={cardCoordRef} className="laz-city-card-coord">
              —
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
