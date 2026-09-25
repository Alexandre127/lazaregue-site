"use client";

/**
 * « Les quatre questions que le cabinet se pose d'abord ».
 *
 * BUREAU (> 760 px) : grille 2×2, les quatre questions et leurs réponses
 * visibles (sommaire non repliable). MOBILE (≤ 760 px) : accordéon numéroté,
 * questions visibles, réponses repliées, la première ouverte.
 *
 * `<details>` natifs (réponses toujours dans le DOM et le rendu serveur, ouverts
 * sans JavaScript) ; après montage, l'état est posé selon la largeur puis suivi.
 */

import { useEffect, useRef, type ReactNode } from "react";

const QUESTIONS: { n: string; h: string; p: ReactNode }[] = [
  { n: "01", h: "Que s’est-il réellement passé ?", p: "Les traces de connexion et les messages prouvent certaines choses, pas d’autres. Le cabinet distingue ce qui est établi de ce qui n’est qu’une supposition." },
  { n: "02", h: "Qui avait le droit d’accéder au système ?", p: <>Un ancien salarié dont l’accès n’a pas été coupé n’est pas dans la même situation qu’un pirate extérieur. <strong>Le dossier se joue souvent sur ce point.</strong></> },
  { n: "03", h: "Qu’est-ce qui a été conservé, et comment ?", p: "Une preuve mal recueillie peut être écartée. Il faut savoir quoi garder et comment le garder avant de remettre les systèmes en marche." },
  { n: "04", h: "Êtes-vous victime ou mis en cause ?", p: "La stratégie, le calendrier et ce que l’on peut demander à la justice en dépendent." },
];

export default function FourQuestions() {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const apply = () => {
      const mobile = mq.matches;
      refs.current.forEach((d, i) => { if (d) d.open = mobile ? i === 0 : true; });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="four">
      {QUESTIONS.map((q, i) => (
        <details className="q-item" key={q.n} open ref={(el) => { refs.current[i] = el; }}>
          <summary>
            <span className="q-n">{q.n}</span>
            <h3>{q.h}</h3>
            <span className="q-sign" aria-hidden="true" />
          </summary>
          <div className="q-ans"><p>{q.p}</p></div>
        </details>
      ))}
    </div>
  );
}
