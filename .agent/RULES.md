# Agent Rules

## Non-negotiables
- Do not invent files, paths, tools, or dependencies.
- Do not touch unrelated code.
- Do not create the HUD effect in the asset-generation step.
- Do not make the hero visually heavy.
- Do not sacrifice performance for decoration.
- Do not finalize uncertainty as fact.
- Do not silently skip repository inspection.
- Do not turn a local cursor effect into a global animation.
- Do not make any further changes to the Earth models, alignments, sizing, or layout; the current layout is final.

## Visual rules
- Earth belongs low in the frame.
- Nebula and stars belong above and around it.
- Negative space is a feature, not a bug.
- HUD lines must stay thin and restrained.
- Accent color should be rare, not constant.
- Details must read premium at hero scale.

## Motion rules
- Cursor-local reveal only.
- Outside the reveal, nothing from the HUD should animate.
- Prefer a continuous HUD layer clipped by a mask over remounting content.
- Keep motion elegant and controlled.
- Avoid jittery or game-like movement.

## Performance rules
- Keep runtime work minimal.
- Prefer transform, opacity, masking, and lightweight SVG.
- Avoid layout thrash.
- Avoid per-frame React state updates.
- Avoid dense particle systems.
- Keep assets optimized for web.

## Review checklist before shipping
- Is the visual hierarchy clear?
- Is the scene still readable with the HUD layered on top?
- Does the page feel smooth?
- Are the files modular?
- Is the implementation faithful to the brief?
- Did we avoid inventing unsupported details?

## Escalation rule
If a required fact cannot be verified from the repo or the provided source:
stop and ask before changing the design.
