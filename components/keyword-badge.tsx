import type { CSSProperties, ReactNode } from "react";

/**
 * Pastille mot-clé de héro.
 *
 * Centralise la « pastille du héros » des pages de domaine (contrats,
 * diffamation, IA/AI Act, cybersécurité), jusqu'ici répétée en style inline :
 * DM Mono 11 px, majuscules, texte `#7fa8ff` sur fond bleu translucide, coins 8.
 *
 * Rôle selon la page (`as`) :
 *  - `span` (défaut) — simple **œil-de-bœuf** au-dessus du grand titre, qui reste
 *    le `<h1>`. C'est le cas des pages de domaine, qui ont déjà un `<h1>` (ex.
 *    « AVOCAT ESCROQUERIE ET FRAUDE »). Défaut volontaire : évite de créer un
 *    second `<h1>` par accident.
 *  - `h1` — la pastille EST le titre de la page. Réservé à `/le-cabinet`, qui n'a
 *    pas d'autre titre (le slogan n'en est pas un).
 *
 * Styles inline volontaires : mêmes valeurs que la pastille d'origine, et ils
 * priment sur la règle globale `h1 { font-family: var(--ff-display) }` (Bebas)
 * et sur tout sélecteur hôte comme `.hero h1`, garantissant le même rendu
 * partout sans `!important`.
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
  as = "span",
  className,
  style,
}: {
  /** Le mot-clé de la pastille. */
  children: ReactNode;
  /** `span` (œil-de-bœuf, défaut) ou `h1` (uniquement /le-cabinet). */
  as?: "span" | "h1";
  className?: string;
  /** Ajustements de positionnement de la page hôte (marges), pas d'apparence. */
  style?: CSSProperties;
}) {
  const Tag = as;
  return (
    <Tag className={className} style={{ ...PASTILLE_STYLE, ...style }}>
      {children}
    </Tag>
  );
}
