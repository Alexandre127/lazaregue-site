import { getImageProps } from "next/image";
import styles from "./apercu-portail.module.css";

/* Illustration FIXE de l'espace client (espace.lazaregue-avocats.fr), tirée de
   l'écran réel du portail : avancement par étapes, synthèse validée par le
   cabinet, prochaine échéance, documents. Dossiers FICTIFS.

   Deux cadrages selon la largeur d'écran :
   · ordinateur (≥ 900 px) : écran d'ordinateur et téléphone côte à côte ;
   · mobile : le téléphone seul, pour que le texte reste lisible.
   Images sur fond transparent, prévues pour les sections bleu nuit.
   Décoratif : le texte voisin porte l'information (alt vide). */

const DUO = { width: 3000, height: 2040 };
const TELEPHONE = { width: 1050, height: 2160 };

export function ApercuPortail({ exemple }: { exemple: "contentieux" | "conseil" }) {
  const commun = { alt: "" };
  const TAILLE_ORDINATEUR = "(min-width: 1200px) 640px, 55vw";
  const TAILLE_TELEPHONE = "340px";
  const {
    props: { srcSet: ordinateur },
  } = getImageProps({ ...commun, ...DUO, sizes: TAILLE_ORDINATEUR, src: `/images/portail/portail-${exemple}-ordinateur.png` });
  const {
    props: { srcSet: mobile, ...img },
  } = getImageProps({ ...commun, ...TELEPHONE, sizes: TAILLE_TELEPHONE, src: `/images/portail/portail-${exemple}-mobile.png` });

  return (
    <picture className={styles.illustration}>
      <source media="(min-width: 900px)" srcSet={ordinateur} sizes={TAILLE_ORDINATEUR} width={DUO.width} height={DUO.height} />
      <source srcSet={mobile} sizes={TAILLE_TELEPHONE} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vide fourni par getImageProps : image décorative */}
      <img {...img} />
    </picture>
  );
}
