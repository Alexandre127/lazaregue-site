# Lot technique — à traiter après le lot 10

Registre des dettes techniques relevées pendant la refonte home. Rien ici n'a
d'effet visible sur le visiteur aujourd'hui ; tout doit être réglé avant mise en
ligne pour les points marqués **BLOQUANT**.

## 1. Textures du globe servies depuis GitHub — **BLOQUANT avant mise en ligne**

Le globe desktop (`lib/globe/init-premium-globe.ts`, visible ≥ 901 px) charge ses
cinq textures depuis `raw.githubusercontent.com` à chaque visite desktop. Ce
n'est pas un hébergement (pas d'engagement de service, limitation de débit
possible, dépendance à un tiers au moment du rendu, et une requête émise vers un
tiers par le navigateur de chaque visiteur — sensible pour un cabinet qui
conseille en protection des données).

Fichiers concernés et poids :

| Fichier | Poids |
|---|---|
| `earth_atmos_2048.jpg` | 504 Ko |
| `earth_lights_2048.png` | 404 Ko |
| `earth_normal_2048.jpg` | 332 Ko |
| `earth_specular_2048.jpg` | 220 Ko |
| `earth_clouds_1024.png` | 224 Ko |
| **Total** | **≈ 1,6 Mo** |

À faire : copier ces fichiers dans `public/` (ex. `public/textures/planets/`) et
passer la base d'URL au composant via l'option `textureBaseUrl` déjà prévue
(défaut inchangé = GitHub). Des copies locales existent déjà dans
`tools/globe-export/textures/`. Aucune modification du rendu desktop dans ce lot
(hors périmètre du lot 3).

## 2. Code mort à supprimer

Composants non montés (importés nulle part), porteurs d'anciennes URL, de
`href="#"`, de H1 parasites et d'anciennes variantes de l'identité :

- `components/navbar-11.tsx` — anciens slugs de routes (avant renommage lot 2).
- `components/footer-01.tsx` — `href="#"` factices.
- Sept gabarits home non montés : `blog-64`, `blog-35`, `team-06`, `stats-19`,
  `layout-351`, `cta-25`, `layout-300` (contiennent des `href="#"` et des H1).

Sans effet sur le visiteur aujourd'hui ; pèsent sur la maintenance.

## 3. Outil d'export du globe — conservé, non utilisé par la page

`tools/globe-export/` (import du composant réel + réglage de cadrage Europe) est
conservé pour réemploi éventuel mais n'est plus référencé par le site depuis le
retrait de l'image mobile (lot 3). Voir son README. `bundle.js` est un artefact
régénérable (gitignoré). Les textures locales (1,6 Mo) y restent pour la
reproductibilité de l'outil.

## 4. Contraste de la ligne bleue du H1 — marge nulle

La ligne bleue tournante du H1 (`var(--blue)` = `#1A47FF`) sur le fond encre
mesure **3,25 : 1**. Conforme au seuil WCAG AA « grand texte » (≥ 3 : 1, le H1
étant large et gras), mais **la marge est nulle**. Préexistant et non modifié au
lot 3.

**Conséquence de règle :** toute réduction ultérieure du corps du H1 (option un
temps envisagée pour la composition du premier écran, puis écartée) devra être
**revérifiée à ce titre** — sous un certain corps, un texte « grand » redevient
« normal » (seuil AA 4,5 : 1) et la ligne bleue échouerait. C'est une raison de
plus d'écarter la réduction de corps.

## 5. Icônes Apple absentes — deux 404

`/apple-touch-icon.png` et `/apple-touch-icon-precomposed.png` renvoient 404
(sondes automatiques du navigateur ; seul `app/favicon.ico` existe). Sans effet
fonctionnel, mais un site de cabinet **ajouté à l'écran d'accueil d'un iPhone
affiche aujourd'hui une vignette dégradée**. Préexistant, hors lot 3.

À faire : ajouter un `apple-icon.png` (180×180) dans `app/` (convention Next) ou
un `/apple-touch-icon.png` dans `public/`.

## 6. Canevas transparent du globe interactif dans le vide (desktop)

Le canevas du globe (520 px) est plus large que la sphère visible (~446 px) : les
~74 px de marge transparente restent une **surface interactive** sur desktop —
un glissement de souris dans le vide autour du globe pilote la rotation. Sans
gravité, mais à consigner. Piste : restreindre les écouteurs de pointeur à la
zone de la sphère, ou réduire le canevas à la sphère (voir aussi §3, la marge
récupérable pour la colonne de copie).
