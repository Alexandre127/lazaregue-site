"use client";

export function SectionCabinet() {
  return (
    <section
      className="py-12 px-[5%] text-center"
      style={{ backgroundColor: "#060912" }}
    >
      <div
        className="relative overflow-hidden"
        style={{ marginTop: "32px", overflow: "hidden" }}
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
        `}</style>
        <img
          src="/images/equipe-cabinet.jpg"
          alt="Équipe Lazarègue Avocats"
          style={{
            width: "100%",
            height: "340px",
            objectFit: "cover",
            objectPosition: "center 35%",
            borderRadius: "10px",
            animation: "kenBurns 12s ease-in-out infinite alternate",
          }}
        />
        <span
          className="absolute"
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

      <p
        style={{
          marginTop: "32px",
          fontSize: "12px",
          color: "#1A47FF",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 500,
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
            color: "rgba(255,255,255,0.45)",
            border: "0.5px solid rgba(255,255,255,0.15)",
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
