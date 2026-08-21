---
trigger: always_on
description: Stack enforcement rules
---

# Stack Rules
- Read @CONTEXT.md for the current stack before every task
- No React, no Vue, no bundler-dependent syntax — native ES modules only
- Animation: GSAP + ScrollTrigger only — do not introduce Framer Motion, anime.js, or a second animation library
- Background rendering: Canvas2D only — do not introduce Three.js, PixiJS, or WebGL without explicit approval
- Do not install a new package without explicit approval
- CSS: plain CSS with custom properties (design tokens in css/tokens.css) — no Sass/Less/Tailwind unless explicitly approved
