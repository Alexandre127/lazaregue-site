"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/track";

/**
 * Lien qui déclenche le marquage d'événement no-op au clic (UX-001/003).
 * Interne (href commençant par « / ») → next/link ; tel:/mailto: → <a>.
 * Aucun href="#", aucun span cliquable : ce sont de vrais liens.
 */
export function TrackedLink({
  href,
  event,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  event: TrackEvent;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const onClick = () => track(event);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  );
}
