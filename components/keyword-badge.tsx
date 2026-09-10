import type { CSSProperties, ReactNode } from "react";

/**
 * Pastille mot-clé de héro — sert de `<h1>` à la page.
 *
 * Centralise la « pastille du héro » déjà employée sur les pages de domaine
 * (contrats informatiques, diffamation, IA/AI Act, cybersécurité), jusqu'ici
 * répétée en style inline. Mêmes valeurs, rien de redéfini : DM Mono 11 px,
 * majuscules, texte `#7fa8ff` sur fond bleu translucide, coins arrondis 8.
 *
 * Rendu en `<h1>` : c'est le titre de la page (un seul par page), il porte le
 * mot-clé principal. Styles inline volontaires — d'une part parce que la
 * pastille d'origine l'était, d'autre part parce qu'ils priment sur la règle
 * globale `h1 { font-family: var(--ff-display) }` (Bebas) et sur tout sélecteur
 * hôte comme `.hero h1`, garantissant le même rendu partout sans `!important`.
 */
const PASTILLE_STYLE: CSSProperties = {
  display: "inline-block",
  alignSelf: "flex-start",
  fontFamily: 'var(--ff-mono, "DM Mono", monospace)',
  fontSize: "11px",
  fontWeight: 500,
  lineHeight: 1.4,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#7fa8ff",
  background: "rgba(26, 71, 255, 0.22)",
  borderRadius: "8px",
  padding: "4px 12px",
  margin: 0,
};

export default function KeywordBadge({
  children,
  className,
  style,
}: {
  /** Le mot-clé principal de la page — devient le texte du `<h1>`. */
  children: ReactNode;
  className?: string;
  /** Ajustements de positionnement de la page hôte (marges), pas d'apparence. */
  style?: CSSProperties;
}) {
  return (
    <h1 className={className} style={{ ...PASTILLE_STYLE, ...style }}>
      {children}
    </h1>
  );
}
