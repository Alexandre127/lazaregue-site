---
name: "Untitled"
theme: "light"

colors:
  neutral:
    shade-0: "#FFFFFF"
    shade-1: "#F2F2F2"
    shade-2: "#D9DAD9"
    shade-3: "#B3B5B4"
    shade-4: "#808482"
    shade-5: "#4D5350"
    shade-6: "#1B221E"
    shade-7: "#020A06"
    white: "#FFFFFF"
  dodger-blue:
    shade-1: "#E8F3FF"
    shade-2: "#D2E8FF"
    shade-3: "#61B1FF"
    shade-4: "#1E90FF"
    shade-5: "#1873CC"
    shade-6: "#0C3966"
    shade-7: "#092B4C"
  bittersweet:
    shade-1: "#FFF0F0"
    shade-2: "#FFE1E1"
    shade-3: "#FF9797"
    shade-4: "#FF6B6B"
    shade-5: "#CC5555"
    shade-6: "#662A2A"
    shade-7: "#4C2020"
  shamrock:
    shade-1: "#EAF9F0"
    shade-2: "#D5F4E2"
    shade-3: "#6CDB9B"
    shade-4: "#2ECC71"
    shade-5: "#24A35A"
    shade-6: "#12512D"
    shade-7: "#0D3D21"

typography:
  heading:
    fontFamily: "Raleway"
    fontWeight: 500
  body:
    fontFamily: "Inter"
    fontWeight: 400
  sizes:
    desktop:
      h1: 72px
      h2: 52px
      h3: 44px
      h4: 36px
      h5: 28px
      h6: 22px
      text-large: 22px
      text-medium: 18px
      text-regular: 16px
      text-small: 14px
      text-tiny: 12px
    mobile:
      h1: 44px
      h2: 40px
      h3: 32px
      h4: 24px
      h5: 20px
      h6: 18px
      text-large: 18px
      text-medium: 16px
      text-regular: 12px
      text-small: 12px
      text-tiny: 10px

ui:
  style: "sleek"
  buttonRadius: 12px
  tagRadius: 6px
  inputRadius: 12px

cards:
  style: "outlined"
  borderWidth: 1px
  dividerWidth: 1px
  radiusLarge: 16px
  radiusMedium: 16px
  radiusSmall: 16px

schemes:
  - name: "Scheme 1"
    background: "neutral-shade-0"
    backgroundHex: "#FFFFFF"
    foregroundHex: "#FFFFFF"
    textHex: "#020a06"
    accentHex: "#1E90FF"
    borderValue: "#020a0626"
    useLogoVariant: light
    cssClass: "scheme-1"
  - name: "Scheme 2"
    background: "neutral-shade-1"
    backgroundHex: "#F2F2F2"
    foregroundHex: "#F2F2F2"
    textHex: "#020a06"
    accentHex: "#020a06"
    borderValue: "#020a0626"
    useLogoVariant: light
    cssClass: "scheme-2"
  - name: "Scheme 3"
    background: "chromatic1-shade-1"
    backgroundHex: "#E8F3FF"
    foregroundHex: "#E8F3FF"
    textHex: "#020a06"
    accentHex: "#020a06"
    borderValue: "#020a0626"
    useLogoVariant: light
    cssClass: "scheme-3"
---

# Untitled — Design Specification

This file contains machine-readable design tokens in the YAML frontmatter above, and human-readable guidance below.

## Colors

The design uses a **light** theme with a neutral palette and 3 chromatic palettes.

- **Neutral shades** range from shade-0 (darkest) to shade-7 (lightest), plus white
- **Dodger Blue** — primary shade: `#1E90FF`
- **Bittersweet** — primary shade: `#FF6B6B`
- **Shamrock** — primary shade: `#2ECC71`

Use the CSS custom properties from `react/globals.css` for all colors (e.g. `--color-neutral-darkest`, `--color-blue-ribbon`).

## Typography

Headings use **Raleway** at weight 500. Body text uses **Inter** at weight 400.

The type scale has desktop and mobile sizes. Apply mobile sizes at smaller breakpoints. All values are in `react/globals.css`.

## UI Elements

UI style is **sleek** with button radius 12px. Cards use the **outlined** style with border-width 1px.

## Color Schemes

Sections use color schemes to control their visual appearance. Each scheme is derived from a single background color — all other colors (text, foreground, accent, border) are automatically computed for optimal contrast.

| Scheme | Background | Text | Accent | Logo | CSS class |
|--------|-----------|------|--------|------|-----------|
| Scheme 1 | Neutral White (#FFFFFF) | #020a06 | #1E90FF | light | `.scheme-1` |
| Scheme 2 | Neutral Lightest (#F2F2F2) | #020a06 | #020a06 | light | `.scheme-2` |
| Scheme 3 | Dodger Blue Lightest (#E8F3FF) | #020a06 | #020a06 | light | `.scheme-3` |

Apply a scheme by adding its CSS class to the section element. See `sitemap.md` for which scheme each section uses.

### Tweaking Schemes

To create visual variation, you can change which scheme a section uses. When switching schemes:

- Swap the CSS class (e.g. change `.scheme-1` to `.scheme-2`)
- All child elements automatically inherit the correct text, accent, and border colors
- Use the matching logo variant (`logo-light.svg` or `logo-dark.svg`) based on the scheme's `useLogoVariant`
- Alternate between light and dark schemes to create visual rhythm
