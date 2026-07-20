"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "../le-cabinet.module.css";
import {
  AUTOPLAY_MS,
  BUDGET,
  DILIGENCES,
  DOCUMENTS,
  ETAPES,
  MESSAGES,
  PORTAIL_ONGLETS,
  PORTAIL_REF,
  PORTAIL_STATUT,
  PORTAIL_TAGS,
  PORTAIL_TITRE,
} from "../data/portail-demo";

/**
 * Démonstration du portail client — unique îlot interactif de la page.
 *
 * Comportement préservé depuis la maquette :
 *  · défilement auto des onglets (4,2 s) dès l'entrée dans le viewport
 *  · pause au survol, reprise à la sortie
 *  · pause hors viewport
 *  · arrêt DÉFINITIF dès que l'utilisateur prend la main (clic ou clavier)
 *
 * Ajouts requis par le cahier des charges (absents de la maquette) :
 *  · navigation clavier ←/→/Home/End avec tabindex glissant
 *  · rôles ARIA complets (tablist/tab/tabpanel)
 */
export default function PortailDemo() {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Visibilité (autoplay) + animations d'entrée
  useEffect(() => {
    const el = appRef.current;
    if (!el) return;

    const playObserver = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.35 },
    );
    const enterObserver = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEntered(true);
          enterObserver.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    playObserver.observe(el);
    enterObserver.observe(el);
    return () => {
      playObserver.disconnect();
      enterObserver.disconnect();
    };
  }, []);

  const running = visible && !stopped && !hovered && !reduced;

  // Défilement automatique
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % PORTAIL_ONGLETS.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [running]);

  /** L'utilisateur prend la main : on cesse définitivement l'autoplay. */
  const takeOver = useCallback((index: number) => {
    setStopped(true);
    setActive(index);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = PORTAIL_ONGLETS.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    takeOver(next);
    tabRefs.current[next]?.focus();
  };

  const activeId = PORTAIL_ONGLETS[active].id;

  return (
    <div
      ref={appRef}
      className={`${styles.papp} ${entered ? styles.in : ""}`.trim()}
      style={{ "--budget-pct": `${BUDGET.pct}%` } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.bar}>
        <div className={styles.t}>
          <span className={styles.dot} aria-hidden />
          portail client
        </div>
        <div className={styles.ref}>{PORTAIL_REF}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.ptop}>
          <div className={styles.h}>{PORTAIL_TITRE}</div>
          <span className={styles.pill}>{PORTAIL_STATUT}</span>
        </div>

        <div
          className={styles.ptabs}
          role="tablist"
          aria-label="Sections du portail"
          onKeyDown={onKeyDown}
        >
          {PORTAIL_ONGLETS.map((onglet, i) => {
            const selected = i === active;
            return (
              <button
                key={onglet.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${onglet.id}`}
                aria-selected={selected}
                aria-controls={onglet.id}
                tabIndex={selected ? 0 : -1}
                className={`${styles.ptab} ${selected && running ? styles.run : ""}`.trim()}
                onClick={() => takeOver(i)}
              >
                {onglet.label}
                <span
                  key={`${active}-${running}`}
                  className={styles.prg}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        {/* Suivi */}
        {activeId === "p-suivi" ? (
          <div
            className={styles.ppanel}
            id="p-suivi"
            role="tabpanel"
            aria-labelledby="tab-p-suivi"
            tabIndex={0}
          >
            <div className={styles.pstep}>
              {ETAPES.map((etape) => (
                <div
                  key={etape.label}
                  className={`${styles.s} ${
                    etape.etat === "done" ? styles.done : etape.etat === "now" ? styles.now : ""
                  }`.trim()}
                >
                  <div className={styles.b} />
                  {etape.label}
                </div>
              ))}
            </div>
            {DILIGENCES.map((d) => (
              <div key={d.label} className={styles.prow2}>
                <span>{d.label}</span>
                <span
                  className={`${styles.st} ${
                    d.etat === "on" ? styles.on : d.etat === "pulse" ? styles.pulse : ""
                  }`.trim()}
                >
                  {d.statut}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Documents */}
        {activeId === "p-docs" ? (
          <div
            className={styles.ppanel}
            id="p-docs"
            role="tabpanel"
            aria-labelledby="tab-p-docs"
            tabIndex={0}
          >
            {DOCUMENTS.map((doc) => (
              <div key={doc.label} className={styles.doc}>
                <span className={styles.fi}>{doc.type}</span>
                <span>{doc.label}</span>
                <span className={styles.dt}>{doc.date}</span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Budget */}
        {activeId === "p-budget" ? (
          <div
            className={styles.ppanel}
            id="p-budget"
            role="tabpanel"
            aria-labelledby="tab-p-budget"
            tabIndex={0}
          >
            <div className={styles.pbudget}>
              <div className={styles.lbl}>
                <span>{BUDGET.libelle}</span>
                <span>{BUDGET.montant}</span>
              </div>
              <div className={styles.track}>
                <div className={styles.fill} />
              </div>
            </div>
            <div className={styles.bsplit}>
              {BUDGET.lignes.map((l) => (
                <span key={l.label} style={{ display: "contents" }}>
                  <span>{l.label}</span>
                  <span className={styles.v}>{l.valeur}</span>
                </span>
              ))}
              <span className={styles.tot}>{BUDGET.total.label}</span>
              <span className={`${styles.v} ${styles.tot}`}>{BUDGET.total.valeur}</span>
            </div>
          </div>
        ) : null}

        {/* Messages */}
        {activeId === "p-msg" ? (
          <div
            className={styles.ppanel}
            id="p-msg"
            role="tabpanel"
            aria-labelledby="tab-p-msg"
            tabIndex={0}
          >
            {MESSAGES.map((m) => (
              <div key={m.qui} className={styles.msg}>
                <div className={styles.who}>{m.qui}</div>
                {m.texte}
              </div>
            ))}
          </div>
        ) : null}

        <div className={styles.pfoot}>
          {PORTAIL_TAGS.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
          <span className={styles.plive}>
            <i aria-hidden />
            démonstration
          </span>
        </div>
      </div>
    </div>
  );
}
