"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  /** Élément rendu (div par défaut) */
  as?: ElementType;
  /** Classes appliquées en permanence */
  className?: string;
  /** Classe ajoutée une fois l'élément entré dans le viewport */
  inClassName: string;
  threshold?: number;
  /** Délai avant application de `inClassName` (ms) — pour les cascades */
  delay?: number;
  children?: ReactNode;
};

/**
 * Applique `inClassName` à l'élément dès qu'il entre dans le viewport,
 * puis cesse de l'observer. L'observer est nettoyé au démontage.
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  inClassName,
  threshold = 0.08,
  delay = 0,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (delay > 0) {
          timer.current = setTimeout(() => setShown(true), delay);
        } else {
          setShown(true);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [threshold, delay]);

  return (
    <Tag ref={ref} className={`${className} ${shown ? inClassName : ""}`.trim()}>
      {children}
    </Tag>
  );
}
