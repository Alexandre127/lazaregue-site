import type { Metadata } from "next";
import styles from "./piece.module.css";

/**
 * Pièce vidéo consultable depuis des conclusions (lien + QR code).
 *
 * Page HORS SITE, volontairement dépouillée :
 *  - adresse neutre (jeton aléatoire), sans nom de partie ni référence de
 *    dossier ; aucune entrée de menu, absente du sitemap ;
 *  - noindex/nofollow/noarchive (balise ci-dessous + en-tête X-Robots-Tag posé
 *    sur /v/* dans next.config.mjs, qui couvre aussi le fichier vidéo) ;
 *  - sans habillage ni mesure d'audience (voir components/layout/hors-pieces) ;
 *  - accessible à toute personne disposant du lien : ce n'est PAS un espace
 *    confidentiel.
 *
 * Exceptions assumées à la charte : pas de H1 en Bebas ni de BreadcrumbList —
 * la page n'appartient pas à l'arborescence du site et n'affiche que la
 * légende de la pièce.
 *
 * Fichier : remultiplexage MP4 (H.264 High, 426×240, sans piste audio) du
 * fichier d'origine, SANS réencodage — flux vidéo identique au paquet près
 * (SHA-256 des paquets c0549c31…afb8d6, identique pour l'original .mov et le
 * .mp4 publié). « faststart » placé pour une lecture immédiate en streaming.
 */

const VIDEO = "/v/phu46y3u2k.mp4";
const AFFICHE = "/v/phu46y3u2k.jpg";

export const metadata: Metadata = {
  title: "Quai du Louvre — 21 avril 2025",
  description: "Vidéo — Quai du Louvre — 21 avril 2025 — 29 secondes.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  // Pas d'aperçu riche en cas de partage du lien.
  openGraph: null,
  twitter: null,
};

export default function Page() {
  return (
    <main id="contenu" className={styles.page}>
      <div className={styles.cadre}>
        <h1 className={styles.titre}>Quai du Louvre — 21 avril 2025 — 29 secondes</h1>
        <video
          className={styles.lecteur}
          controls
          playsInline
          preload="metadata"
          poster={AFFICHE}
          width={426}
          height={240}
        >
          <source src={VIDEO} type="video/mp4" />
          <a href={VIDEO}>Ouvrir la vidéo</a>
        </video>
        <p className={styles.note}>Cette vidéo illustre les lieux à une autre date que celle des faits.</p>
      </div>
    </main>
  );
}
