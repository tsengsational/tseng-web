---
name: Wabi-Sabi & Scandinavian Folio
description: Organic, warm, tactile washi paper, natural linen, and earth-toned typography for Jason Tseng's triad portfolio.
colors:
  primary: "#bd5b3b"
  primary-hover: "#a34b2f"
  secondary: "#c98a42"
  tertiary: "#5a6e5a"
  neutral-bg: "#faf6f0"
  neutral-surface: "#ffffff"
  neutral-card: "#f4ede2"
  neutral-border: "#e7ded0"
  neutral-text: "#2c2825"
  neutral-muted: "#787067"
  neutral-subtle: "#a89f94"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  mono:
    fontFamily: "DM Mono, monospace"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  plate-card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.neutral-text}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "10px 24px"
---

# Design System: Wabi-Sabi & Scandinavian Folio

## Overview
This visual design system transforms Jason Tseng's digital portfolio from a clinical, tech-heavy drafting interface into an intimate, warm, and tactile Japanese-Scandinavian (Japandi / Wabi-Sabi) sanctuary. It centers unhurried contemplation, natural organic textures (unbleached washi, linen threads, raw clay), human imperfection, and generous breathing room (*Ma*). Technology is presented as a handcrafted discipline alongside literature and fine art.

## Colors
- **Ground & Canvas (`#faf6f0`)**: Warm unbleached mulberry washi paper with delicate organic fiber texture.
- **Surface Paper (`#ffffff`)**: Soft warm white laid paper sheets with delicate boundary threading.
- **Card Fill (`#f4ede2`)**: Raw linen / oatmeal undertone for secondary containers.
- **Sumi Ink Text (`#2c2825`)**: Warm natural soot black, achieving ≥ 10:1 contrast for effortless, glare-free reading.
- **Natural Craft Accents**:
  - **Writer (`#bd5b3b`)**: Warm terracotta / seal ink / fired pottery clay.
  - **Artist (`#c98a42`)**: Raw ocher / weathered wood / natural pigment.
  - **Coder (`#5a6e5a`)**: Lichen green / moss / steeped green tea.
- **Borders (`#e7ded0` / `#d4c7b2`)**: Soft sand and linen thread strokes.

## Typography
- **Editorial Titling (`Newsreader`, serif)**: Unhurried, poetic, and literary. Free of digital harshness.
- **Body & Captions (`Plus Jakarta Sans`, sans-serif)**: Refined Scandinavian sans with open forms, warm curves, and natural legibility. Clamped to 65–75 characters per line.
- **Numerals & Notes (`DM Mono`, monospace)**: Sparse, gentle notation for dates and tags.

## Layout
- **Negative Space (*Ma*)**: Generous top/bottom pacing (80px–120px) allowing elements to breathe.
- **Organic Discipline Filter**: Soft pill buttons with warm clay, ocher, and sage indicators that gently stain the background with watercolor Three.js gradients.
- **Grid Cadence**: Flexible, airy 1–3 column layouts anchored by generous gutters.

## Elevation & Depth
- Absence of harsh digital box-shadows.
- Depth is expressed through **washi paper layering**, tactile noise texture (`opacity: 0.06`), and soft ambient contact shadows (`rgba(60, 48, 36, 0.06)`).
- Three.js WebGL canvas acts as a gentle watercolor pigment wash diffusing across textured paper.

## Shapes
- Soft, pillowed corner radii (`16px` to `24px`) reminiscent of polished river stones and folded paper corners.
- Circular portrait frame softened by warm sepia-tinted tones.

## Components
- **Folio Masthead (`HeroSection.vue`)**: Textured paper sheet with warm portrait, poetic introduction, and watercolor triad switcher.
- **Artifact Card (`ProjectCard.vue`)**: Handcrafted paper cards with clean margins, craft indicators, and gentle hover elevations.
- **Discipline Collection (`RoleSection.vue`)**: Editorial section breaks with quiet serif titles and count annotations.
- **Substack Dispatches (`Blogroll.vue`)**: Clean literary essay cards with reading dates and natural terracotta accents.

## Do's and Don'ts
### Do:
- Prioritize natural warmth, tactile linen textures, and generous whitespace.
- Use soft, organic transitions (ease-out, watercolor bleed effects).
- Tint hover states from natural earth pigments (terracotta, ocher, sage).
- Let typography feel literary and publication-grade.

### Don'ts:
- Never use clinical wireframes, technical coordinates, or blueprint crosshairs.
- Never use cold dark mode (#000, neon blues, or terminal greens).
- Never use artificial gradient text or harsh digital drop shadows.
- Never clutter cards with dense technical metadata badges.
