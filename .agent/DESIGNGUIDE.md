# Flux — Design Guide

> Living document. Add a pattern here only once it's actually been decided and specced —
> do not pre-fill sections with invented values. As of 2026-08-09, most of this file is a
> scaffold, not a finished system — Flux's visual identity (color, type, logo, spacing scale)
> has not been established in any prior discussion. Fill those sections in as real decisions
> get made, not before.

## Status
- Visual identity (color palette, typography, logo, spacing/sizing scale): **not yet defined**
- Component inventory: **not yet defined**
- Confirmed interaction patterns: 1 (below)

---

## Confirmed Interaction Patterns

### Cosmic HUD Hero (cursor-local scan reveal)
Full source-of-truth spec lives in the earlier project artifact
(`cosmic-hud-hover-spec.md`) — this entry is a summary pointer, not a replacement.

**What it is:** A full-bleed hero with a static Earth/nebula background (subtle
ambient drift on stars/nebula only, Earth near-static). On pointer move, a soft
~260px circular mask follows the cursor with a slight lag and reveals a sci-fi
data-scan HUD (non-uniform grid lines, node markers, flickering coordinate
labels, a traveling diagonal scan-pulse in electric-blue/cyan) ONLY inside that
circle. Everything outside the circle stays completely static — no global
animation, ever.

**Where it came from:** Reverse-engineered from a stock flower time-lapse clip
with a data-scan HUD overlay (source: `clideo.com`-watermarked footage, not a
Flux asset), then re-skinned to the Earth/universe motif and adapted from a
"whole-card" reveal into a cursor-localized one per product direction.

**Key implementation rules (see full spec for details):**
- Pointer/mask position tracking: raw refs + requestAnimationFrame, never React state per frame
- Label flicker: throttled ~120ms interval, ref-driven text updates, never re-render
- Scan-pulse and mask: stroke-dashoffset / opacity / CSS mask only — never animate layout properties
- Reduced-motion: disables lerp-follow, flicker, and scan-pulse entirely
- Mobile: tap-to-reveal at tap point, hold ~2.5s, auto fade-out

**Status:** Spec complete, Antigravity build prompt written (Planning mode, UI
layer lock). Build/verification status: not yet confirmed — check PROGRESS.md.

**Addendum (2026-08-09): Glass-refraction distortion.** Source footage showed a
subtle warp/curvature on some grid lines — originally flagged `[Guessing]`
(unconfirmed whether scripted or a compression artifact) and deliberately left
out of the first build prompt. Confirmed as wanted; now specced as a lens-glass
refraction effect (SVG feTurbulence + feDisplacementMap) applied only inside the
mask region, strongest at the mask edge, settling flat toward center, ~4-10px
displacement, throttled animation (not per-frame feTurbulence recalculation —
known perf trap). First implementation attempt did not render visibly — retry
prompt hardens against the standard feDisplacementMap failure modes (filter
region clipping, baseFrequency too high, broken in2 chain, linearRGB washout).

**Addendum (2026-08-09): Stardust particle system.** Original footage had visible
glittery/sparkly particulate on petal surfaces — noted in the visual breakdown as
a texture quality but NEVER converted into an implementable spec, which is why it
didn't appear in the build. Now specced: canvas-based particle pool (~20-40
particles), confined to the active mask region, spawning near the mask's leading
edge as it moves (reads as the scanner "stirring up" dust), 1-3px bright
white/cyan dots with soft glow, drifting with slight randomized velocity, fading
over ~1-2s. Particle spawning is fully gated to hover-active state — zero
particles, zero canvas activity, at idle. See addendum prompt for exact
constraints.

---

## Scaffold — Fill In As Decided

### Color Palette
TBD. When defined, record: primary, secondary, accent (note: the Cosmic HUD
pattern above already commits to an electric-blue/cyan accent for its scan-pulse
— if Flux's brand accent ends up different, that's a conflict to resolve
explicitly, not silently override in one place).

### Typography
TBD. Note: the HUD pattern requires a monospace font with `tabular-nums` support
for its coordinate labels — factor that constraint in if/when a type system is chosen.

### Spacing / Sizing Scale
TBD.

### Component Inventory
TBD — populate as components are built (buttons, cards, event-feed items,
Memory Vault entries, CR hub notification units, profile components, etc.)

### Motion Principles
Only one data point so far: the Cosmic HUD pattern establishes a house style of
"precise, data-forward, restrained color (one accent max), local not global
motion, respects reduced-motion." Whether this generalizes to the rest of Flux
(event feeds, Memory Vault, profile) is an open design decision, not yet made.

---

## Explicitly Out of Scope for This File
- Shunya 2026 (GDSC NSUT tech-fest site) design direction — "THE NETWORK"
  mycelium/circuit SVG concept — is a **separate project**, not Flux. Do not
  copy its visual language into Flux without an explicit decision to do so;
  keep the two identities distinct unless told otherwise.

## Last Updated
2026-08-09 — Initial scaffold + first confirmed pattern (Cosmic HUD Hero).
