// Outil d'export (hors production, exclu du build via tsconfig). Il IMPORTE le
// composant réel (init-premium-globe) et se contente de lui passer une
// orientation, une taille de rendu et des textures locales. Aucune scène n'est
// reproduite ici : l'image mobile est donc, par construction, le même globe que
// le desktop. Voir tools/globe-export/README.md pour les paramètres exacts.
import { initPremiumGlobe } from "../../lib/globe/init-premium-globe";

const q = new URLSearchParams(location.search);
const lat = parseFloat(q.get("lat") ?? "50"); // ~50° N
const lon = parseFloat(q.get("lon") ?? "10"); // ~10° E

const box = document.getElementById("box");
if (!box) throw new Error("#box introuvable");

const mk = () => document.createElement("div");

initPremiumGlobe(
  box,
  {
    card: mk(),
    cardCity: mk(),
    cardTitle: mk(),
    cardInsight: mk(),
    cardCoord: mk(),
  },
  {
    staticFrame: true,
    initialLatLon: [lat, lon],
    textureBaseUrl: "./textures/",
    onReady: ({ renderer, scene, camera }) => {
      const w = window as unknown as { exportPNG: () => string };
      // Rendu synchrone juste avant la capture : le canvas WebGL n'ayant pas
      // preserveDrawingBuffer, on redessine dans le même tick que toDataURL
      // pour garantir des pixels valides. Downscale WebP 1x/2x ensuite (sharp).
      w.exportPNG = () => {
        renderer.render(scene, camera);
        return renderer.domElement.toDataURL("image/png");
      };
    },
  },
);
