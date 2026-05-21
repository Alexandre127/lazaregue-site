"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeroReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = window.setTimeout(() => el.classList.add("in"), 100 + delay);
    return () => window.clearTimeout(t);
  }, [delay]);

  return (
    <div ref={ref} className={`laz-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
