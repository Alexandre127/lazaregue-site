"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../le-cabinet.module.css";

const EVENT = "lc:method-transition";
const STEPS = ["analyse", "qualification", "convention", "intervention"];
const HOLD_MS = 600;
const OUT_MS = 220;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * CTA principal : déclenche la transition « analyse → qualification →
 * convention → intervention » avant de naviguer.
 */
export function CtaTransition({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        if (prefersReducedMotion()) {
          router.push(href);
          return;
        }
        window.dispatchEvent(new CustomEvent(EVENT, { detail: { href } }));
      }}
    >
      {children}
    </a>
  );
}

/** Overlay de transition — monté une seule fois par page. */
export function MethodTransitionOverlay() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "on" | "out">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const onTrigger = (e: Event) => {
      const href = (e as CustomEvent<{ href: string }>).detail?.href;
      setState("on");
      timers.current.push(
        setTimeout(() => setState("out"), HOLD_MS),
        setTimeout(() => {
          setState("idle");
          if (href) router.push(href);
        }, HOLD_MS + OUT_MS),
      );
    };

    window.addEventListener(EVENT, onTrigger);
    return () => {
      window.removeEventListener(EVENT, onTrigger);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [router]);

  return (
    <div
      className={`${styles.mtrans} ${state === "on" ? styles.on : ""} ${
        state === "out" ? `${styles.on} ${styles.out}` : ""
      }`.trim()}
      aria-hidden
    >
      <ol>
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
