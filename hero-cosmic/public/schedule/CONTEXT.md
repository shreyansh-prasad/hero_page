# Project Context

> Auto-maintained by /sync workflow. Reflects active codebase state.

## Project Identity
- Name: Shunya
- Stack: Vanilla HTML / CSS / JavaScript (native ES modules), GSAP + ScrollTrigger, Canvas2D
- Type: Single-page marketing/event site (static, no backend, no framework)
- Package manager: none required — GSAP loaded via CDN `<script>`

## Architecture
- Entry point: index.html
- Background layer: js/background/starfield.js, js/background/parallax.js
- Scroll layer: js/scroll/scroll-controller.js (single-column scroll timeline, ScrollTrigger scrub), js/scroll/headline-transition.js (vertical shear split between events), js/scroll/space-visuals.js (dual-hemisphere cosmic & HUD visual architectures)
- Transition layer: js/transition/details-transition.js, js/transition/details-content.js
- Content: js/data/events.js
- Orchestration: js/main.js
- Styles: css/tokens.css, css/base.css, css/layout.css
- Tests: none (static animation site — see .agent/workflows/test.md)

## Active Decisions
| Decision | Reason | Date |
|----------|--------|------|
| Vanilla JS + native ES modules, no bundler | Explicit requirement | 2026-07-25 |
| GSAP + ScrollTrigger, `scrub: 1.0` | Liquid, smooth cinematic inertia | 2026-08-04 |
| Minimal Aesthetic Starlight & 3-Tier Parallax | Minimal diamond pinpoints (far, mid, near) with multi-factor scroll parallax and smooth interactive mouse perspective | 2026-08-06 |
| Canvas2D for starfield with dynamic ambient nebula luminescence | Ultra-premium cosmic aesthetic that softly tints to active event accent | 2026-08-04 |
| Translucent Hemisphere Atmosphere | Translucent radial depth gradients letting background stars twinkle through while maintaining contrast | 2026-08-06 |
| One continuous, seamlessly looping sequence of 6 events | Infinite scroll with cycle-synchronized jump offsets | 2026-08-04 |
| High-Contrast Headline Typography Palette | Editorial contrast colors (Periwinkle, Coral Melon, Electric Mint, Champagne, Canary Gold, Neon Lilac) distinct from background glow | 2026-08-05 |
| 50/50 Dual-Hemisphere Split Duality | Left atmospheric celestial world vs right technical HUD blueprint with distinct colors and flows per hemisphere | 2026-08-05 |
| Center Architectural Split Seam & Axis Reticle | Fine vertical dividing axis with target reticle for structured split | 2026-08-05 |
| Film-Grain Noise Overlay | Analog film texture overlay across viewport for cinematic luxury polish | 2026-08-05 |
| Vertical Counter-Shear Transition | Left half slides up, right half slides down in opposite directions during scroll transitions | 2026-08-04 |

## Current Functionality (Verified & Stable)
- [x] Minimal aesthetic Canvas starfield with 3-tier depth (220 far stardust micro-points, 70 mid specular stars, 24 foreground gems with subtle micro-glints).
- [x] Smooth Multi-Depth Parallax across scroll positions (`far: 0.04`, `mid: 0.16`, `near: 0.36`) and fluid interactive mouse perspective inertia.
- [x] High-contrast headline typography cutting through background colors with maximum legibility and luminous specular depth.
- [x] Dynamic motion for all visual elements (orbiting probes, spinning flare rings, drifting cloud bands, pulsating shockwaves, rotating radar sweeps, SVG dash animations).
- [x] 50/50 Dual-Hemisphere split-screen architecture across all 6 challenges with 100% unique visual identities, color palettes, and flows:
  1. Zero Day Apocalypse: Volcanic Blood Crimson Eclipse (Left) vs Stark Ice Cyan Cyber Vault (Right) | Headline: Luminous Slate Blue
  2. Autopilot: Cerulean Turquoise Ice Giant (Left) vs Solar Amber 3D Flight Trajectory HUD (Right) | Headline: Radiant Coral Melon
  3. 24-Hour Devlympics: Blazing Solar Core (Left) vs Midnight Violet 24H Launch Dial (Right) | Headline: Electric Mint
  4. Flow in Flux 2026: Cosmic Magenta Singularity (Left) vs Acid Lime Golden Spiral Blueprint (Right) | Headline: Warm Champagne Cream
  5. Hallucination Hunt: Aurora Emerald Quantum Rift (Left) vs Cyber Rose Oscilloscope Glitch Monitor (Right) | Headline: Pale Canary Gold
  6. AI Case-a-thon: Deep Sapphire Binary Stars (Left) vs Topaz Gold Macro Strategy Constellation (Right) | Headline: Neon Electric Lilac
- [x] Vertical Counter-Shear transitions between events (left moves up, right moves down).
- [x] Center architectural seam line with precision laser calibration reticle.
- [x] "EXPLORE CHALLENGE →" opens a full-viewport glassmorphic Airlock briefing modal in-page; closing restores exact prior scroll position.

## Installed Packages
- gsap (CDN 3.12.5) + ScrollTrigger (CDN 3.12.5)

## Last Updated
2026-08-06 — Upgraded with 3D volumetric celestial bodies, animated CAD holographic telemetry HUDs, aesthetic starlight with 3-tier parallax, and luxury glassmorphism.