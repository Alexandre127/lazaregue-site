"use client";

import Image from "next/image";

export function SectionCabinet() {
  return (
    <section
      className="pt-8 pb-14 md:py-24 px-[5%] text-center"
      style={{ backgroundColor: "#060912" }}
    >
      {/*
        La photo d'équipe était servie brute en pleine résolution pour un
        affichage de 340 px de haut. `next/image` la redimensionne et la
        convertit en WebP ; `sizes="100vw"` parce qu'elle occupe toute la
        largeur du conteneur.

        Elle est plus haute que large dans un bandeau très large : en `cover`,
        plus l'écran s'élargit, plus le rognage vertical est sévère — au point
        de couper les visages. La hauteur suit donc la largeur (35vw), la
        largeur est plafonnée, et le cadrage à 48 % centre la bande sur les
        deux personnes, dont les visages sont vers 48 % de la hauteur.
      */}
      <div
        className="relative overflow-hidden mt-2 md:mt-8"
        style={{
          /* Sans plafond de largeur, le bandeau continue de s'élargir sur
             les très grands écrans alors que sa hauteur est bornée : le
             rognage se resserre et finit par recouper les visages. */
          maxWidth: "1400px",
          marginInline: "auto",
          height: "clamp(340px, 35vw, 560px)",
          borderRadius: "10px",
        }}
      >
        <style>{`
          @keyframes kenBurns {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.06);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .kenBurns {
              animation: none !important;
            }
          }
        `}</style>
        <Image
          className="kenBurns"
          src="/images/equipe-cabinet-2026.jpg"
          alt="L'équipe du cabinet Lazarègue Avocats — deux avocats et une avocate en costume sombre, debout dans un bureau parisien devant les fenêtres."
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            // Trois visages : têtes à ~18%, yeux ~30%, mentons ~43% de la
            // hauteur. Point focal à 30% → au rognage large du desktop, la bande
            // visible va de ~12% à ~71% : têtes dégagées (headroom ~6%), mentons
            // largement inclus. Sur mobile le cadre est quasi carré : toute la
            // hauteur est visible, seul un rognage latéral centré s'applique et
            // les trois visages (29/51/74%) restent dans la zone visible.
            objectPosition: "center 30%",
            animation: "kenBurns 12s ease-in-out infinite alternate",
          }}
        />
        {/* Légende — superposée en bas de l'image sur desktop (inchangé). Sur
            mobile, ce cartouche bleu sur fond sombre était peu lisible et se
            faisait couper par le bord de l'image : on le masque et on le
            reporte sous l'image (voir <p> ci-dessous). */}
        <span
          className="absolute hidden md:block"
          style={{
            bottom: "12px",
            left: "16px",
            fontSize: "12px",
            color: "#1A47FF",
            fontWeight: 500,
            letterSpacing: "0.06em",
            background: "rgba(6,9,18,0.7)",
            padding: "4px 10px",
            borderRadius: "3px",
          }}
        >
          Lazarègue Avocats · 18 rue de Tilsitt · 75017 Paris
        </span>
      </div>

      {/* Légende mobile : hors de l'image, lisible (gris clair, pas de rognage). */}
      <p
        className="md:hidden"
        style={{
          marginTop: "10px",
          fontSize: "11px",
          color: "#8892A6",
          letterSpacing: "0.04em",
        }}
      >
        Lazarègue Avocats · 18 rue de Tilsitt · 75017 Paris
      </p>

      <p
        className="home-kicker"
        style={{
          marginTop: "32px",
          fontSize: "12px",
          color: "#C5CBDE",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        LE CABINET
      </p>

      <h2
        style={{
          fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: 600,
          color: "white",
          marginTop: "12px",
        }}
      >
        Avocats et experts techniques croisent leurs compétences sur les enjeux
        du numérique.
      </h2>

      {/* Paragraphe institutionnel — texte HTML courant, lisible par les
          moteurs (ni image, ni composant animé, ni accordéon). */}
      <p
        style={{
          maxWidth: "680px",
          marginTop: "20px",
          marginInline: "auto",
          fontSize: "15px",
          lineHeight: 1.75,
          color: "#C5CBDE",
        }}
      >
        Lazarègue Avocats est un cabinet d&apos;avocats en droit du numérique et
        en nouvelles technologies, établi à Paris. Depuis 2016, nous conseillons
        et défendons les entreprises en droit de l&apos;informatique. Notre
        pratique couvre les cyberattaques, les contrats informatiques,
        l&apos;intelligence artificielle, la protection des données et les
        litiges liés aux plateformes numériques.
      </p>

      <div
        className="flex justify-center"
        style={{ marginTop: "24px", gap: "16px" }}
      >
        <button
          type="button"
          style={{
            backgroundColor: "#1A47FF",
            color: "white",
            padding: "14px 28px",
            borderRadius: "4px",
            fontSize: "12px",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
          }}
        >
          Une problématique juridique ? Parlons-en →
        </button>
        <button
          type="button"
          style={{
            backgroundColor: "transparent",
            color: "#C5CBDE",
            border: "0.5px solid rgba(255,255,255,0.25)",
            padding: "14px 24px",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Découvrir le cabinet →
        </button>
      </div>
    </section>
  );
}
