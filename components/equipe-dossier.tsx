import Image from "next/image";
import { MEMBRES } from "@/lib/equipe";

/**
 * Bloc « équipe » des pages de domaine.
 *
 * Reprend la mise en page validée sur la page Contrats informatiques, à ceci
 * près que l'avatar d'initiales cède la place à la photo : sur une page de
 * conversion, voir le visage de l'avocat qui traitera le dossier vaut mieux
 * qu'un monogramme.
 *
 * Les intervenants extérieurs portent leur qualité en clair, sans « Me » :
 * la distinction avec les avocats du cabinet doit rester lisible.
 */

export type MembreDossier = {
  /** Clé dans `MEMBRES`. */
  slug: keyof typeof MEMBRES | string;
  /** Rôle sur ce type de dossier — propre à chaque page. */
  role: string;
  /** Mots-clés du domaine. */
  tags: string[];
};

type Props = {
  eyebrow?: string;
  titre: string;
  chapeau?: string;
  membres: MembreDossier[];
  /** Palette de la page hôte. */
  couleurs?: {
    panneau?: string;
    carte?: string;
    bordure?: string;
    texte?: string;
    secondaire?: string;
    accent?: string;
  };
};

const DEFAUT = {
  panneau: "#f1f1ee",
  carte: "#ffffff",
  bordure: "rgba(0,0,0,0.1)",
  texte: "#1a1a1a",
  secondaire: "#4a4a4a",
  accent: "#1A47FF",
};

/**
 * Carte d'un membre — extraite pour être réutilisable hors de la grille par
 * défaut d'`EquipeDossier` (ex. mise en page « texte à gauche, portraits à
 * droite » de la page pilier cybersécurité). Le rendu est identique à celui
 * qu'`EquipeDossier` produisait en interne.
 */
export function MembreCarte({
  membre,
  couleurs,
}: {
  membre: MembreDossier;
  couleurs?: Props["couleurs"];
}) {
  const c = { ...DEFAUT, ...couleurs };
  const p = MEMBRES[membre.slug];
  if (!p) return null;
  return (
    <article
      style={{
        background: c.carte,
        border: `0.5px solid ${c.bordure}`,
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Rapport 4/5 : les portraits ne sont jamais rognés
          verticalement, quelle que soit la largeur de la colonne. */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5" }}>
        <Image
          src={p.photo}
          alt={`${p.nom} — ${membre.role}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover", objectPosition: p.position ?? "center" }}
        />
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            alignSelf: "flex-start",
            fontFamily: "var(--ff-mono)",
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: p.avocat ? c.secondaire : c.texte,
            border: `1px solid ${p.avocat ? c.bordure : c.accent}`,
            padding: "3px 8px",
          }}
        >
          {p.statut}
        </span>
        <p style={{ fontSize: 15, fontWeight: 600, color: c.texte, margin: 0, lineHeight: 1.35 }}>
          {p.nom}
        </p>
        <p style={{ fontSize: 12, color: c.secondaire, margin: 0, lineHeight: 1.5 }}>
          {membre.role}
        </p>
        <div className="flex flex-wrap" style={{ gap: 6, marginTop: 2 }}>
          {membre.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "3px 9px",
                borderRadius: 8,
                background: "rgba(26,71,255,0.07)",
                color: c.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function EquipeDossier({
  eyebrow = "L'équipe",
  titre,
  chapeau,
  membres,
  couleurs,
}: Props) {
  const c = { ...DEFAUT, ...couleurs };

  return (
    <div style={{ background: c.panneau, borderRadius: 12, padding: 20 }}>
      <p
        style={{
          fontFamily: "var(--ff-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: c.accent,
          margin: "0 0 4px",
        }}
      >
        {eyebrow}
      </p>
      <h2 style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.2, color: c.texte, margin: "0 0 6px" }}>
        {titre}
      </h2>
      {chapeau ? (
        <p style={{ fontSize: 14, lineHeight: 1.7, color: c.secondaire, margin: "0 0 16px" }}>
          {chapeau}
        </p>
      ) : null}

      <div
        className={
          membres.length >= 3
            ? "grid grid-cols-1 md:grid-cols-3"
            : "grid grid-cols-1 md:grid-cols-2"
        }
        style={{ gap: 12 }}
      >
        {membres.map((m) => (
          <MembreCarte key={m.slug} membre={m} couleurs={couleurs} />
        ))}
      </div>
    </div>
  );
}
