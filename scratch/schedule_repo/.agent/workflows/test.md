# /test — Manual QA Pass

This project has no automated test suite (static creative animation site, no logic layer to unit-test). Run this checklist manually / by scripted browser inspection.

1. **Scroll scrub**: Scroll normally, then stop abruptly. Motion must decelerate with smooth liquid inertia and settle cleanly without stuttering.
2. **Loop seam**: Scroll through all 6 event cards. The infinite loop must seamlessly wrap back from Card 6 to Card 1 without visual jumps, flashes, or scrub rewinds.
3. **Headline separation**: Confirm that outgoing headlines translate upward while incoming headlines enter from below with zero collision or illegible overlapping.
4. **Details Airlock transition**: Click "EXPLORE CHALLENGE →" — confirm full-viewport glassmorphic detail view smoothly scales and fades in with dynamic backdrop blur, accent light sweep, and no URL change.
5. **Scroll restore**: Close the details view (via close button or Escape key) — confirm the scroll position is exactly where it was before opening.
6. **Cosmic background**: Confirm starfield renders multi-depth stars and dynamic ambient nebula glow that smoothly tints to match the active event's accent color.
7. **Reduced motion**: Enable `prefers-reduced-motion` in the OS/browser and reload. Ambient drift and vertical push motion are replaced with clean opacity crossfades.
8. **Layer check**: Run `git status` / `git diff --name-only` to verify all touched files align with intended scope.
