"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import styles from "../ressources.module.css";

type RevealProps = {
  as?: ElementType;
  className?: string;
  inClassName: string;
  children?: ReactNode;
};

/**
 * Apparition au défilement. L'observer est nettoyé au démontage, et
 * `prefers-reduced-motion` est géré par le CSS (état final affiché d'emblée).
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  inClassName,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = className.includes(styles.reveal)
    ? className
    : `${styles.reveal} ${className}`.trim();

  return (
    <Tag ref={ref} className={`${base} ${shown ? inClassName : ""}`.trim()}>
      {children}
    </Tag>
  );
}
