"use client";

import { useEffect, useState } from "react";

type CaptionToken = {
  word: string;
  className: string;
};

const LINE1_TOKENS: CaptionToken[] = [
  ...["ATLAS", "MONDIAL", "DU", "DROIT", "DU", "NUMÉRIQUE"].map((word) => ({
    word,
    className: "text-[11px] tracking-[0.2em] text-white/60",
  })),
];

const LINE2_TOKENS: CaptionToken[] = [
  ...["SURVOLEZ", "POUR", "EXPLORER"].map((word) => ({
    word,
    className:
      "text-[11px] tracking-[0.2em] text-[#1A47FF] opacity-90 transition-colors duration-200 ease group-hover:text-white",
  })),
];

const REVEAL_DELAY_MS = 800;
const WORD_STAGGER_MS = 60;
const REVEAL_DURATION = "0.6s cubic-bezier(0.16, 1, 0.3, 1)";

function RevealWord({
  word,
  delay,
  className,
}: {
  word: string;
  delay: number;
  className: string;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setRevealed(true),
      REVEAL_DELAY_MS + delay,
    );
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span
        className={`inline-block ${className}`}
        style={{
          transform: revealed ? "translateY(0)" : "translateY(100%)",
          transition: `transform ${REVEAL_DURATION}`,
        }}
      >
        {word}
      </span>
    </span>
  );
}

function CaptionLine({
  tokens,
  startIndex,
}: {
  tokens: CaptionToken[];
  startIndex: number;
}) {
  return (
    <p className="w-full text-right font-mono uppercase leading-none">
      <span
        className="inline-block rounded-[4px] px-[10px] py-1"
        style={{
          background: "rgba(6,8,15,0.45)",
          backdropFilter: "blur(4px)",
        }}
      >
        {tokens.map((token, index) => (
          <span key={`${token.word}-${index}`} className="inline">
            {index > 0 ? " " : null}
            <RevealWord
              word={token.word}
              delay={(startIndex + index) * WORD_STAGGER_MS}
              className={token.className}
            />
          </span>
        ))}
      </span>
    </p>
  );
}

export function HeroAtlasCaption() {
  return (
    <div className="group mt-4 mb-2 w-full px-4 md:px-8 lg:px-12">
      <div className="mb-2">
        <CaptionLine tokens={LINE1_TOKENS} startIndex={0} />
      </div>
      <CaptionLine tokens={LINE2_TOKENS} startIndex={LINE1_TOKENS.length} />
    </div>
  );
}
