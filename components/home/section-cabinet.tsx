import Image from "next/image";
import Link from "next/link";

export function SectionCabinet() {
  return (
    <section
      className="pt-8 pb-14 md:py-24 px-[5%] text-center"
      style={{ backgroundColor: "#060912" }}
    >
      {/*
        Photographie du cabinet. Elle pointe vers /contact (aria-label explicite
        pour que la destination du lien soit claire malgré l'image). Le cartouche
        d'adresse superposé (« coordonnées » que rien ne signalait) a été retiré —
        l'adresse figure au pied de page.

        `next/image` la redimensionne en WebP ; `sizes="100vw"` (pleine largeur).
        Plus haute que large dans un bandeau large : en `cover`, la hauteur suit
        la largeur (35vw), la largeur est plafonnée, cadrage à 30 % centré sur les
        visages.
      */}
      <Link
        href="/contact"
        aria-label="Contacter le cabinet Lazarègue Avocats"
        className="relative block overflow-hidden mt-2 md:mt-8"
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          height: "clamp(340px, 35vw, 560px)",
          borderRadius: "10px",
        }}
      >
        <style>{`
          @keyframes kenBurns {
            0% { transform: scale(1); }
            100% { transform: scale(1.06); }
          }
          @media (prefers-reduced-motion: reduce) {
            .kenBurns { animation: none !important; }
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
            objectPosition: "center 30%",
            animation: "kenBurns 12s ease-in-out infinite alternate",
          }}
        />
      </Link>

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

      {/* Deux liens réels (les boutons précédents étaient inertes). */}
      <div
        className="flex flex-wrap justify-center"
        style={{ marginTop: "24px", gap: "16px" }}
      >
        <Link
          href="/contact"
          style={{
            backgroundColor: "#1A47FF",
            color: "white",
            padding: "14px 28px",
            borderRadius: "4px",
            fontSize: "12px",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Une problématique juridique ? Parlons-en →
        </Link>
        <Link
          href="/le-cabinet"
          style={{
            backgroundColor: "transparent",
            color: "#C5CBDE",
            border: "0.5px solid rgba(255,255,255,0.25)",
            padding: "14px 24px",
            borderRadius: "4px",
            fontSize: "12px",
            textDecoration: "none",
          }}
        >
          Découvrir le cabinet →
        </Link>
      </div>
    </section>
  );
}
