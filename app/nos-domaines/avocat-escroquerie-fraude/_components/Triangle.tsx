import styles from "../escroquerie.module.css";

/**
 * Schéma « le trajet des fonds » et les cinq voies de recours.
 * SVG inline (pas de <img>) : les accents suivent les variables de thème
 * (--blue, --blue2). Deux versions : horizontale (par défaut) et empilée
 * verticalement, cette dernière affichée sous 720 px via CSS sans supprimer
 * l'horizontale (cf. escroquerie.module.css).
 */

const ARIA =
  "Le trajet des fonds, de la victime à l'auteur, et les cinq voies de recours numérotées";

export default function Triangle() {
  return (
    <>
      {/* Version horizontale — écrans larges */}
      <svg
        className={styles.triangle}
        viewBox="0 0 760 250"
        role="img"
        aria-label={ARIA}
      >
        <defs>
          <marker id="tri-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#3A4270" />
          </marker>
        </defs>
        <g fontFamily="DM Mono, monospace" fontSize="10" letterSpacing="0.8" fill="#8F96BE">
          <text x="4" y="14" fill="#8F96BE" fontSize="10" letterSpacing="2">le trajet des fonds</text>

          <rect x="4" y="30" width="138" height="66" fill="none" stroke="var(--blue2)" strokeWidth="1.5" />
          <text x="73" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="11.5">VICTIME</text>
          <text x="73" y="78" textAnchor="middle">fonds sortis</text>

          <rect x="160" y="30" width="138" height="66" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <text x="229" y="18" textAnchor="middle" fill="var(--blue2)" fontSize="12">01</text>
          <text x="229" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="11">BANQUE</text>
          <text x="229" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11">ÉMETTRICE</text>
          <text x="229" y="86" textAnchor="middle">L. 133-18 · vigilance</text>

          <rect x="316" y="30" width="138" height="66" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <text x="385" y="18" textAnchor="middle" fill="var(--blue2)" fontSize="12">03</text>
          <text x="385" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="11">PLATEFORME</text>
          <text x="385" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11">OU PSP</text>
          <text x="385" y="86" textAnchor="middle">le cas échéant</text>

          <rect x="472" y="30" width="138" height="66" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <text x="541" y="18" textAnchor="middle" fill="var(--blue2)" fontSize="12">02</text>
          <text x="541" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="11">BANQUE</text>
          <text x="541" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="11">RÉCEPTRICE</text>
          <text x="541" y="86" textAnchor="middle">faute civile propre</text>

          <rect x="628" y="30" width="128" height="66" fill="none" stroke="#8F96BE" strokeWidth="1" strokeDasharray="4 4" />
          <text x="692" y="18" textAnchor="middle" fill="var(--blue2)" fontSize="12">05</text>
          <text x="692" y="60" textAnchor="middle" fill="#B9BDD6" fontSize="11.5">AUTEUR</text>
          <text x="692" y="78" textAnchor="middle">rarement solvable</text>

          <path d="M142 63 L 155 63" stroke="#3A4270" strokeWidth="1" markerEnd="url(#tri-a)" />
          <path d="M298 63 L 311 63" stroke="#3A4270" strokeWidth="1" markerEnd="url(#tri-a)" />
          <path d="M454 63 L 467 63" stroke="#3A4270" strokeWidth="1" markerEnd="url(#tri-a)" />
          <path d="M610 63 L 623 63" stroke="#3A4270" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#tri-a)" />

          <rect x="4" y="150" width="138" height="58" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          <text x="73" y="138" textAnchor="middle" fill="var(--blue2)" fontSize="12">04</text>
          <text x="73" y="176" textAnchor="middle" fill="#FFFFFF" fontSize="11">ASSUREUR</text>
          <text x="73" y="193" textAnchor="middle">côté victime</text>
          <path d="M73 96 L 73 145" stroke="#3A4270" strokeWidth="1" strokeDasharray="4 4" />

          <path d="M160 175 L 610 175" stroke="var(--blue)" strokeWidth="1.5" />
          <path d="M160 170 L 160 180" stroke="var(--blue)" strokeWidth="1.5" />
          <path d="M610 170 L 610 180" stroke="var(--blue)" strokeWidth="1.5" />
          <text x="385" y="166" textAnchor="middle" fill="var(--blue2)" fontSize="10.5" letterSpacing="2">les recours solvables</text>
        </g>
      </svg>

      {/* Version empilée — écrans étroits (< 720 px) */}
      <svg
        className={styles.triangleStack}
        viewBox="0 0 300 606"
        role="img"
        aria-label={ARIA}
      >
        <defs>
          <marker id="tri-b" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 0 L5 10 z" fill="#3A4270" />
          </marker>
        </defs>
        <g fontFamily="DM Mono, monospace" fontSize="11" fill="#8F96BE">
          {[
            { y: 4, stroke: "var(--blue2)", sw: 1.5, num: "", t1: "VICTIME", t2: "fonds sortis", dash: false },
            { y: 100, stroke: "#FFFFFF", sw: 1, num: "01", t1: "BANQUE ÉMETTRICE", t2: "L. 133-18 · vigilance", dash: false },
            { y: 196, stroke: "#FFFFFF", sw: 1, num: "03", t1: "PLATEFORME OU PSP", t2: "le cas échéant", dash: false },
            { y: 292, stroke: "#FFFFFF", sw: 1, num: "02", t1: "BANQUE RÉCEPTRICE", t2: "faute civile propre", dash: false },
            { y: 388, stroke: "#8F96BE", sw: 1, num: "05", t1: "AUTEUR", t2: "rarement solvable", dash: true },
            { y: 500, stroke: "#FFFFFF", sw: 1, num: "04", t1: "ASSUREUR", t2: "côté victime", dash: true },
          ].map((b, i, arr) => (
            <g key={b.t1}>
              <rect x="40" y={b.y} width="220" height="64" fill="none" stroke={b.stroke} strokeWidth={b.sw} strokeDasharray={b.dash ? "4 4" : undefined} />
              {b.num && <text x="20" y={b.y + 20} textAnchor="middle" fill="var(--blue2)" fontSize="12">{b.num}</text>}
              <text x="150" y={b.y + 30} textAnchor="middle" fill={b.dash ? "#B9BDD6" : "#FFFFFF"} fontSize="11.5">{b.t1}</text>
              <text x="150" y={b.y + 48} textAnchor="middle">{b.t2}</text>
              {i < arr.length - 1 && (
                <path
                  d={`M150 ${b.y + 64} L 150 ${arr[i + 1].y - 4}`}
                  stroke="#3A4270"
                  strokeWidth="1"
                  strokeDasharray={arr[i + 1].dash ? "4 4" : undefined}
                  markerEnd="url(#tri-b)"
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </>
  );
}
