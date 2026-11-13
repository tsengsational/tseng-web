# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Creative studios, literary publications, art curators, and collaborators looking for an authentic, multidisciplinary creative technologist (Writer, Artist, Coder).

## Product Purpose
Provide an intimate, tactile portfolio and digital home for Jason Tseng that feels unmistakably human, organic, and grounded. Success means visitors experience warmth, literary depth, and quiet craftsmanship across writing, art, and code without feeling alienated by cold "tech" aesthetics.

## Positioning
The Mindful Craftsman: Where digital code, visual art, and literary craft are held with equal human care. Unlike clinical developer portfolios or neon-infused creative tech demos, this space embodies Wabi-Sabi and Japandi / Scandinavian sensibilities—honoring organic textures, natural imperfections, warm earth tones, tactile papery surfaces, and breathing space.

## Operating Context
Desktop and mobile web environments. Visitors evaluate the portfolio in relaxed reading and viewing sessions, browsing essays, observing visual artworks, and understanding technical experiments as extensions of human curiosity.

## Capabilities and Constraints
- Technical stack: Vue 3 (Vite), Tailwind CSS, Three.js / WebGL shaders, Directus headless CMS backend, Substack RSS feed.
- Deployment target: Railway.
- Triad categorization: Writer, Artist, Coder must remain intuitive pathways.
- Wabi-Sabi / Scandinavian aesthetic commitments: Linen, washi paper, warm clay, raw timber, sumi ink, warm sand, and gentle kinetic movement.
- Graceful degradation if the Directus backend is offline.

## Brand Commitments
- Identity: Jason Tseng.
- Triad: Writer, Artist, Coder.
- Substack integration: https://jasontseng.substack.com/feed.
- Aesthetic Direction: Human, warm, textured, Wabi-Sabi / Scandi — earth tones, unbleached paper fibers, soft organic contours, gentle tactile transitions. Absolutely no cold blueprint lines, neon terminal markers, or clinical technical coordinates.

## Evidence on Hand
- Working Vue 3 application with Three.js shader.
- Directus schema setup with projects collection (`title`, `description`, `image`, `role`, `is_featured`, `link`, `content`).
- Existing routes: Home (`/`), Category (`/category/:role`), Tag (`/tag/:tag`), Project Details (`/project/:id`), Contact (`/contact`).
- Substack feed reader component (`Blogroll.vue`).
- Headshot asset at `/headshot.png`.

## Product Principles
1. Tactile Human Presence: Every surface should evoke natural materials—washi, raw linen, soft ceramic clay, warm wood—rather than machine glass or terminal phosphor.
2. Wabi-Sabi Restraint & Space (Ma): Value generous negative space, unforced asymmetry, and quiet, contemplative hierarchy over dense technical telemetry.
3. Warmth of the Triad: Present Writer (earthy sumi ink & terra cotta), Artist (warm ocher & raw clay), and Coder (organic sage & lichen green) as organic extensions of thought.
4. Organic Interactivity: Shaders and animations should feel like watercolor diffusing on wet mulberry paper or sunlight through linen curtains, never mechanical or computational.
