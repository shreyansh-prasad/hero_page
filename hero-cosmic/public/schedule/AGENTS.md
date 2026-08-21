# Shared Agent Standards

This is a static, backend-free site. The API/TypeScript sections from the standard template don't apply — replaced with front-end equivalents below.

## Animation Conventions
- All scroll-linked motion goes through GSAP ScrollTrigger — no bare `scroll` event listeners for animation
- All motion timing/easing values live in css/tokens.css or js data constants — never hardcode a magic timing number inline in a component file
- Respect `prefers-reduced-motion`: when set, disable the starfield's ambient drift and the headline crossfade slide/scale (keep a simple opacity cross-fade instead), and skip the details-transition panel-split in favor of a plain fade

## Markup & CSS
- Semantic HTML — `<section>`, `<button>`, not `<div onclick>`
- BEM-style class names (`.event-card__title`, `.details-view__meta`)
- No inline styles except values computed at runtime by JS (e.g. transform values GSAP writes directly)

## JavaScript
- Native ES modules (`import`/`export`), no bundler required
- No global variables outside js/main.js's top-level orchestration
- Every module in js/background, js/scroll, js/transition exports a single `init()` (or similarly named) entry function — no side effects on import

## Error Handling
- Never swallow errors silently
- If the canvas context or a DOM query returns null, fail loudly in the console with the module name, don't continue silently with broken state
