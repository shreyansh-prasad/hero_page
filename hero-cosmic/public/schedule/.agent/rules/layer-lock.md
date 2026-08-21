---
trigger: always_on
description: Hard layer boundaries for the Shunya project — prevents cross-layer contamination
---

# Layer Lock Rules

This project has no server/API, so layers are NOT the generic UI/Logic split. Every task's [LAYER] header must be one of: BACKGROUND, SCROLL, TRANSITION, CONTENT, TOKENS, or BOTH (explicit file list required for BOTH).

## If LAYER: BACKGROUND
Files you MAY touch: js/background/*, the canvas-related rules in css/layout.css
Files you MUST NEVER touch: js/scroll/*, js/transition/*, js/data/events.js
If a background change requires a scroll-timing change: STOP. Report it. Do not proceed.

## If LAYER: SCROLL
Files you MAY touch: js/scroll/*, the `.event-card*` rules in css/layout.css
Files you MUST NEVER touch: js/background/*, js/transition/*
If a scroll change requires touching the details-transition: STOP. Report it. Do not proceed.

## If LAYER: TRANSITION
Files you MAY touch: js/transition/*, the `.details-view*` rules in css/layout.css
Files you MUST NEVER touch: js/background/*, js/scroll/*

## If LAYER: CONTENT
Files you MAY touch: js/data/events.js only
Files you MUST NEVER touch: anything under js/background, js/scroll, js/transition, css/

## If LAYER: TOKENS
Files you MAY touch: css/tokens.css only
This layer is cross-cutting — check whether any other layer's task would be better served by adding a new token here rather than a one-off value elsewhere.

## If LAYER: BOTH
Only touch files explicitly listed in the task's Context section.
Any file not listed is off-limits, regardless of layer.

## Why This Exists
The background, scroll, and transition systems each run their own GSAP timelines. A change made in one that reaches into another (e.g. a transition-layer task tweaking scroll-controller.js "while in there") is the most likely way this project silently breaks — the failure won't throw an error, it'll just desync the animation.
