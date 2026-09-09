import type { CSSProperties, ReactNode } from "react";

/**
 * Badge mot-clé — sert de `<h1>` à la page.
 *
 * La charte réserve Bebas Neue au display, au logo et aux grands chiffres ; un
 * titre de page ne doit pas l'emprunter. Or `globals.css` pose une règle de base
 * `h1 { font-family: var(--ff-display) }` (Bebas) : tout `<h1>` qui ne redéfinit
 * pas sa police l'hérite. Ce composant règle le problème à la source côté titre,
 * en portant sa propre typographie — Space Grotesk, casse normale, graisse
 * moyenne — plutôt qu'en surchargeant la règle globale (dont dépendent les
 * autres pages).
 *
 * Styles **inline** volontaires : le badge doit rendre à l'identique quelle que
 * soit la feuille de la page hôte. Une simple classe de module (spécificité
 * 0,1,0) serait battue par un sélecteur hôte comme `.hero h1` (0,1,1) qui
 * réimposerait Bebas ; l'inline (1,0,0) l'emporte partout, sans `!important`.
 *
 * Le badge **est** le `<h1>` de la page : un seul par page, il porte le mot-clé
 * principal. À réutiliser tel quel sur les pages de domaine.
 */
const BADGE_STYLE: CSSProperties = {
  display: "inline-block",
  fontFamily: 'var(--ff-body, "Space Grotesk", sans-serif)',
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: 1.3,
  letterSpacing: "0",
  textTransform: "none",
  color: "#ffffff",
  background: "#1A47FF",
  padding: "8px 14px",
  borderRadius: 0,
  boxShadow: "none",
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
    <h1 className={className} style={{ ...BADGE_STYLE, ...style }}>
      {children}
    </h1>
  );
}
