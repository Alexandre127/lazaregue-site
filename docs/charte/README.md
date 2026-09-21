# Charte graphique — référence du site

La **Charte graphique & design system accessible v1.1** (septembre 2026) est la
**référence unique** de l'identité visuelle du site Lazarègue Avocats. Elle
supersède la v1.0 et toute valeur visuelle antérieure, y compris celles des
maquettes HTML autonomes, qui n'étaient que des approximations de prévisualisation.

- **Source qui fait foi** : `Charte_graphique_Lazaregue_Avocats_v1.1_accessible.docx`.
- **Transcription lisible** : `charte-graphique-v1.1.md` (fidèle au `.docx`).
- **Archives** : `archive/` (chartes antérieures, conservées pour mémoire, superseded).

**Les tokens du code dérivent de la charte** (§08 pour les variables CSS, §05 pour
l'échelle d'espacement et la grille). La source unique des tokens dans le code est
`app/globals.css` (`:root`). Aucune valeur visuelle — couleur, taille, rayon,
espacement — ne se décide ailleurs : une valeur écrite en dur dans un composant de
page est un défaut, même si elle est juste. Toute évolution visuelle passe d'abord
par la charte, puis par les tokens.
