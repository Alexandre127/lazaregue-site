# Charte des pages de domaine — Lazarègue Avocats

Règles transversales validées sur les pages RGPD, cybersécurité, cybercriminalité
et AI Act. Les pages restantes en **héritent** — ne pas réinventer une grammaire
par page.

---

## 1. Système chromatique

**Le bleu Lazarègue est la couleur de la marque et de l'action.** Il porte, sur
toutes les pages sans exception, les éléments d'action : boutons primaires, liens,
focus, indicateurs de sélection ou de progression **cliquables**.

**L'accent de famille est éditorial.** Il ne sert qu'aux sur-titres, aux labels de
repérage, aux fonds légers et aux annotations. **Jamais** sur un bouton, un lien
ou un état de focus.

| Famille | Accent éditorial | Statut |
|---|---|---|
| Données et conformité (RGPD, AI Act) | **vert `#1D9E75`** | validé |
| Risque / pénal (cybercriminalité, cybersécurité) | à arbitrer | en attente |
| Contrats / opérations | à arbitrer | en attente |

**Réservé :** le rouge = urgence ; le vert ne doit **jamais** être un état de succès.
Un statut de service se traite en **gris neutre**, ni vert ni bleu. Aucune couleur
ne porte seule une information (doubler par un texte, une icône, une position).

**Élément non cliquable → pas d'effet de survol** (supprimer le survol, ne pas le
recolorer).

**Mécanique.** Variables CSS par famille, posées sur le `<main data-domaine="…">` :

```jsx
<main
  data-domaine="donnees"
  style={{
    "--brand": "#1A47FF", "--brand-rgb": "26,71,255",
    "--famille-accent": "#1D9E75", "--famille-rgb": "29,158,117",
    /* … */
  } as CSSProperties}
>
```

Dans les composants : `const BLUE = "var(--brand)"` (action) et
`const ACCENT = "var(--famille-accent)"` (éditorial). **Aucun hex « fonctionnel »
en dur.** Attention : une variable ne se concatène pas (`` `${BLUE}55` `` est
invalide) — utiliser `rgba(var(--…-rgb), …)`.

---

## 2. Typographie des titres

Règle unique, quelle que soit la taille graphique. Un seul `h1`, aucun saut de
niveau.

- **h1** : `clamp(32px, 5.5vw, 60px)`, graisse **600**, interligne **1.08**.
- **h2** : `clamp(22px, 2.8vw, 30px)`, graisse **600**, interligne **1.25**.
- Les questions de FAQ et les libellés navigables (carrousel) en **h3**.
- Un titre de section « habillé en sur-titre » (petites capitales) reste visible
  en `<p aria-hidden>` **et** double d'un `h2` masqué visuellement (`SR_ONLY`)
  pour la hiérarchie — ne pas le passer à la taille commune.

---

## 3. Présentation de l'équipe — deux formats

Choisir selon l'intention de la section :

- **`EquipeDossier` (étiquettes par défaut).** Format standard, cartes avec
  photo, encadré de fonction, rôle et **tags** de domaine. À utiliser quand la
  section liste l'équipe d'un dossier sans hiérarchie particulière entre les
  intervenants.
- **Cartes à quatre points.** Quand la page **démontre une complémentarité de
  compétences** (ex. binôme avocat + intervenant technique). Chaque carte :
  photo 4/5, encadré de fonction, nom, rôle, puis **une liste de quatre points**
  « ce qu'il/elle examine ». **Parité stricte** : même format, même encadré,
  même nombre de points, **hauteur identique** (`align-items: stretch` +
  `height: 100%`), construite depuis un **seul tableau mappé** pour garantir
  l'égalité par construction. Aucun intervenant présenté plus longuement que
  l'autre.

Les intervenants extérieurs portent leur **qualité en clair** (titre
universitaire, « intervenante indépendante »), jamais « expert » — l'interdiction
« spécialisé / spécialiste / expert » vise le cabinet et ses membres. La donnée
partagée `lib/equipe.ts` n'est pas modifiée pour un besoin de page : un intitulé
propre à une page se pose dans la page.

---

## 4. Spécimens (documents de démonstration)

Tout document fictif montré comme preuve de savoir-faire :

- Mention **« spécimen »** dans l'en-tête du document.
- Mention **« aucune donnée réelle »** sous le bloc (mono : `SPÉCIMENS · AUCUNE
  DONNÉE RÉELLE`).
- **Aucun nom d'éditeur ni de produit.**
- **Aucun chiffre présenté comme un résultat obtenu** (montants, taux, délais
  « obtenus »). Formulations qualitatives ; les annotations proposent une
  rédaction, elles n'affirment pas un résultat de négociation.

---

## 5. Rappels généraux

- Réutiliser les composants et tokens existants ; aucun nœud de texte dupliqué
  dans le DOM.
- `canonical` dérivé de `NEXT_PUBLIC_SITE_URL`. Pas de `localStorage` ni
  `sessionStorage`. Aucun `AggregateRating`.
- Curseur personnalisé désactivé sous 1024 px et sur `(hover: none)`.
- Téléphone : `tel:+33181706200`.
- Une source **unique** pour la FAQ : l'accordéon visible et le balisage
  `FAQPage` lisent le **même** fichier (réponses en chaînes sérialisables).
- Mobile (référence 390 px) : pas plus de deux colonnes, cible tactile ≥ 44 px,
  pas de texte sous 13 px hors mentions de source, **aucun débordement latéral**.
  Les tableaux s'empilent (`th scope`, `data-label`) sans défilement horizontal.
