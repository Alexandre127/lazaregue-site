# Export du globe (outil interne)

> **Statut : conservé mais non utilisé par la page.** L'image statique du globe
> a été retirée du hero mobile (décision du lot 3 : sous 901 px, un halo CSS
> remplace le globe — voir `.laz-hero::before` dans `app/hero.css`). Cet
> outillage et son réglage de cadrage sur l'Europe sont conservés car ils
> pourront resservir (autre page, autre usage). Aucune image générée ici n'est
> aujourd'hui référencée par le site.

Génère une image statique orientée sur l'Europe à partir du globe de production.
L'outil **importe le composant réel** `lib/globe/init-premium-globe.ts` : l'image
est donc, par construction, le même globe que le desktop (mêmes textures,
lumières, matériaux, caméra). Il ne reproduit aucune scène.

Ce dossier est hors de `app/` et **exclu du build** (`tsconfig.json` → `exclude`,
et jamais importé par l'application). Il ne doit jamais devenir une route.

## Paramètres exacts (pour régénérer à l'identique)

Ces valeurs viennent du composant réel ; l'export ne fait que passer une
orientation et une taille de rendu.

| Paramètre | Valeur |
|---|---|
| Caméra (type) | `PerspectiveCamera`, FOV **45°**, near 0.1, far 1000 |
| Caméra (position) | **(0, 0.5, 3.2)** |
| Caméra (cible / lookAt) | **(0, 0, 0)** |
| Rotation auto / interaction | **désactivées** (`staticFrame: true`) |
| Orientation cible | **lat 48° N, lon 6° E** (`initialLatLon: [48, 6]`) |
| Calcul d'orientation | lacet `atan2(-p.x, p.z)` + tangage `(latRad − élévation caméra)` sur l'axe X monde, pôle Nord conservé en haut |
| Conteneur de rendu | **1040 × 1040** CSS |
| `pixelRatio` | `min(devicePixelRatio, 2)` → tampon **2080 × 2080** sur écran 2× |
| Capture | `renderer.render()` puis `canvas.toDataURL('image/png')` |
| Sorties WebP | 2080² → **640²** (`@2x`, q82) et **320²** (1×, q82) via `sharp` |

Textures : copiées en local dans `./textures/` (obligatoire — l'export ne doit
pas dépendre de `raw.githubusercontent.com`, sinon échec CORS possible). En
production, le composant desktop charge encore ces textures depuis GitHub : point
à régler au lot technique (les servir depuis `public/`).

## Régénérer

```bash
# 1. Bundler l'entrée (importe le composant réel + three depuis node_modules)
npx esbuild tools/globe-export/entry.ts --bundle --format=iife \
  --platform=browser --outfile=tools/globe-export/bundle.js

# 2. Servir le dossier (textures locales servies en même origine)
python3 -m http.server 8099 --directory tools/globe-export

# 3. Ouvrir http://localhost:8099/index.html?lat=48&lon=6
#    Ajuster lat/lon si besoin, puis récupérer window.exportPNG() (dataURL PNG).

# 4. Downscaler en WebP 1x/2x avec sharp :
node -e "const s=require('sharp');(async()=>{\
 await s('capture.png').resize(640,640,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:82}).toFile('public/images/hero-globe-europe@2x.webp');\
 await s('capture.png').resize(320,320,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:82}).toFile('public/images/hero-globe-europe.webp');})()"
```

`bundle.js` est un artefact régénérable (non versionné). `entry.ts`,
`index.html`, `textures/` et ce README constituent l'outil.
