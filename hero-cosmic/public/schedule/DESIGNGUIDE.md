# Shunya — Design Guide

Reference source for every visual/motion decision below: forensic frame analysis of glitchandgrit.com's scroll and transition recordings, cross-referenced with the site's live DOM and direct pixel measurement of full-resolution settled frames (not compressed proxies). Values not directly measurable (illustration style, exact space-theme colors) are original art direction, chosen to fit "Shunya" (Sanskrit/Hindi for zero/void) — a space theme built on creation emerging from emptiness.

**Revision note (2026-08-04):** this replaces the two-panel/split-screen version of this guide. Direct pixel measurement of a clean reference frame showed no split-panel structure exists in the source — it's a single continuous column, left-anchored bold text on a mostly black background. The two-panel structure was a misreading of earlier feedback; corrected here with real coordinates.

## Concept
One continuous vertical scroll. Each event gets a mostly-black beat with its name in large bold type, colored uniquely per event — not a layout gimmick, a color signal. "Shunya" (zero/void) is the constant backdrop; each event is a brief, specific point of color and light against it, the way a probe returns one signal at a time from the dark.

## Structure (measured — replaces "Split-Panel Structure" and "Card Composition")
Measured directly from a settled reference frame at 1918×932: headline text spans x=195–1360 (≈10%–71% of viewport width) — left-anchored, not centered, not confined to a fixed-width column (its right edge is just wherever the word ends). Category tags sit above the headline, roughly centered over its span. The "Details" link sits below, likewise centered under the headline rather than left-aligned with it. A sparse dotted circular/orbit graphic occupies the empty right-hand space next to the text — small and quiet, not a large illustration.

Per event, in this arrangement:
- Category tags (2, Space Mono, small caps) — centered horizontally over the headline's span, just above it
- Event name — large bold display type, left-anchored (~10% from left edge), that event's accent color, full saturation (not muted)
- "Details →" link — centered under the headline's span
- A sparse dotted orbit-ring accent (10–20 small dots tracing a loose circle/ellipse) in the event's accent color at low opacity, sitting in the empty space to the right of the text — replaces the earlier "illustrated vignette" and "planet" ideas, which overstated what's actually there
- Background: `--void-black`, with the shared starfield (see below) always visible through it — no separate colored panel, no gradient wash tied to the event
- Loops seamlessly after event 6 back to event 1

## Color System
Base:
- `--void-black: #05060A` — page background, deep space
- `--void-navy: #0A0C1C` — secondary background
- `--star-white: #F4F6FF` — nav/footer text, brightest stars
- `--star-dim: #8B90AC` — secondary text, distant stars

Per-event accent — now applied directly to that event's headline text (full saturation), its tags (outline), its "Details" link, and its orbit-ring dots:
| Event | Accent | Hex |
|---|---|---|
| Zero Day Apocalypse | Ember crimson | `#FF4D5E` |
| Autopilot | Electric cyan | `#4DD8FF` |
| 24-Hour Devlympics | Solar amber | `#FFB84D` |
| Flow in Flux 2026 | Nebula violet | `#C86DFF` |
| Hallucination Hunt | Glitch teal | `#4DFFC8` |
| AI Case-a-thon | Slate blue | `#6D9CFF` |

This is a correction from the previous version, which reserved accent color for small UI details only and kept headline text white — the reference clearly color-codes the headline itself per project, at full saturation. That's the primary visual signal of "different vibe," not a layout split.

## Typography
- Display / headlines: **Space Grotesk**, bold, geometric, slightly condensed at large sizes
- Labels / tags / nav / footer: **Space Mono**
- Headline size: clamp(2.75rem, 6vw, 6rem), uppercase, tight line-height (0.95)
- Body/description (details view only): plain system sans (`Inter`), 1rem–1.125rem

## Motion Tokens (css/tokens.css)
```css
--ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
--ease-push: back.out(1.4);        /* GSAP — headline push transition, moderate overshoot */
--ease-curtain: cubic-bezier(0.76, 0, 0.24, 1);
--dur-push: 500ms;                  /* headline switch */
--dur-curtain: 800ms;
--dur-press: 180ms;
```

## Headline Transition — Vertical Shear Split (revised again, at explicit user request — this is a deliberate addition, not something confirmed present in the reference)
This is being added on direct instruction, described three times now the same way: the screen divides into a left half and right half along a vertical center line; the two halves move vertically in opposite directions — left up, right down.

**Implementation note added after the first build attempt**: the first attempt produced a text-*wrap* break (the headline literally split onto two lines at a word/hyphen boundary and the second line slid independently) rather than a geometric cut through one continuous line of text. That reads as a layout bug, not a design. The correct approach: **two full, pixel-identical, non-wrapping copies of the complete headline, stacked in the exact same position**, each showing only its half via `clip-path` (e.g. `inset(0 50% 0 0)` for the left copy, `inset(0 0 0 50%)` for the right copy). At rest (frame 0 and the final settled frame), the two clipped halves must align perfectly back into what looks like one normal, unbroken headline — if they don't line up pixel-for-pixel at rest, the cut is wrong. Neither copy may use `white-space: normal` / wrapping to create the split.

- Outgoing headline: left clipped copy translates `translateY(-100%)` and exits upward; right clipped copy translates `translateY(100%)` and exits downward. Simultaneous, ~450ms, `power2.in`.
- Incoming headline: mirrored — left copy starts at `translateY(-100%)`, right copy starts at `translateY(100%)`, both animate to `translateY(0)`, converging into the resting position.
- Ease on arrival: make the "rubber" quality obvious, not subtle — use GSAP `elastic.out(1, 0.6)` (a visible wobble-settle) or at minimum `back.out(2.2)` (a pronounced single overshoot), not a mild `back.out(1.4)` — the first attempt's motion was too subtle at this duration to read as elastic at all.
- Total duration ~650ms (slightly longer than the first attempt so the overshoot/settle is actually visible), incoming begins as soon as outgoing clears.
- Whole headline block (both lines if the headline wraps to two lines) is one shape being cut in half — not per-line, not per-word.
- No RGB-split/chromatic-glitch effect.

## Background / Starfield Spec
- **Far layer**: 80–120 static dots, 1–2px, `--star-dim` at 40–70% opacity, evenly scattered, no parallax.
- **Mid layer**: 15–25 small stars (2–4px) + 3–5 distant specks (6–12px, two-tone shaded). Parallax: 0.15× scroll delta.
- **Near layer**: max 3 on screen at once, 30–60px, radial-gradient shaded. Parallax: 0.3× scroll delta.
- **Text safe zone**: nothing above far-layer dots may render inside the headline's own bounding box (x≈10%–71%, its vertical band) — the orbit-ring accent lives in the remaining right-hand space, not on top of the text.
- Independent ambient drift under the scroll parallax; never tracks cursor; `prefers-reduced-motion` disables drift and parallax (static stars only).

## Header / Footer (measured)
Reference uses plain text nav, not a logo+button: "WORK / INFO / CONTACT US," `--star-white`, no boxes. Adapt labels for Shunya rather than copying literally — suggested: **EVENTS** (left) / **ABOUT** (center) / **REGISTER** (right), same plain-text treatment, no button styling. A footer wordmark "SHUNYA" in large type is visible at the bottom of the reference's scroll (their equivalent shows "GLITCH ↔ GRIT" split across the footer corners) — add a simple centered "SHUNYA" footer treatment at the end of the loop point or as a persistent bottom element, your implementation's call.

## Details Transition — "Airlock"
With the split-panel structure gone, the transition returns to something closer to the original measured reference mechanic rather than the panel-collapse version designed around a structure that no longer exists:
1. Press feedback (`--dur-press`, 180ms): "Details →" scales to 0.96, accent glow intensifies.
2. The current scroll view fades/scales down slightly (0.98, opacity 1→0.3) while a full-viewport detail view scales/fades in on top (0.98→1, opacity 0→1), over `--dur-curtain` (800ms), `--ease-curtain`. Same starfield visible underneath throughout — no separate background.
3. A thin seam of that event's accent color flashes across the transition as a subtle top-to-bottom light sweep (nod to the reference's own top-first reveal pattern, measured earlier in this project).
4. Detail content: headline, one-paragraph description, Space Mono metadata list (Format, Team Size, Duration, Prize), close control.
5. Record scroll position before opening; closing reverses the fade/scale and restores it exactly. No URL/history change at any point.

This is a simplified, lower-risk mechanic given how much churn the transition design has already been through — flag it if you want something more elaborate, but I'd rather ship something correct and plain than another elaborate guess.

## Accessibility
- `prefers-reduced-motion`: starfield drift off, headline transition becomes a plain opacity fade (no vertical push), details transition unaffected (already a fade/scale, no directional motion to remove)
- Maintain 4.5:1 text contrast; each event's accent at full saturation on `--void-black` should be checked individually — some (amber, teal) may need a slightly darker shade for body-text-sized use, headline size is large enough to be safe at full saturation