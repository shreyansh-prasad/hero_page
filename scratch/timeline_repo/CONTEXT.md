# Project Context: Cyber-Fluid 3D Event Timeline

## 1. Project Overview
A highly interactive, continuous 3D scroll-driven conveyor belt UI for an event timeline. The system maps a dataset of task cards onto a dynamic, velocity-driven parametric curve in a true 3D spatial environment. It bypasses native DOM scrolling in favor of a custom physics engine that converts user input into kinetic momentum.

*   **Target Engine:** Antigravity (Generative UI generation tool)
*   **Tech Stack:** Next.js (App Router), React (for shell/data mapping), GSAP (Ticker, Observer, Flip Plugin)
*   **Aesthetic Style:** Cyber-Fluid / Liquid Glassmorphism (dark mode, heavy blurs, dithered SVG noise, edge-lit glows)
*   **Data Set (6 Events):** 
    1. Zero Day Apocalypse
    2. Autopilot
    3. 24-Hour Devlympics
    4. Flow in Flux 2026
    5. Hallucination Hunt
    6. AI case-a-thon

---

## 2. The Physics & Render Engine (SceneController)
The core of the motion system is a 60fps render loop handled entirely outside of React's state reconciliation. 

### Velocity Accumulator & Inertia
*   Native scroll is disabled (`touch-action: none`, `preventDefault` on wheel).
*   User input (`deltaY`) is clamped and normalized (to handle notched wheels vs. trackpads equally).
*   Velocity is accumulated and heavily damped using a friction coefficient.
*   **Frame Rate Independence:** Friction and momentum calculations are multiplied by GSAP's Delta Time ($dt$) to ensure identical physics behavior on 60Hz and 144Hz monitors.

### Kinetic Wave Amplitude
*   The track is not a static curve. It behaves like a physical string under tension.
*   Amplitude ($A$) scales exponentially with scroll velocity ($V_s$): 
    $$ A_{target} = \min(A_{max}, |V_s|^{1.4} \cdot C_{amp}) $$
*   Amplitude damping operates independently of scroll friction, allowing the wave to slowly flatten back into a straight line *after* the scrolling stops (Jello/settling effect).

---

## 3. True 3D Spatial Mathematics
The system utilizes true 3D CSS rendering (`perspective: 1200px` on the parent, `preserve-3d`, `translateZ`, `rotateY`) rather than faking depth with 2D `scale()`. Let $\Delta$ represent the relative distance of a card from the focal point (using modulo math to maintain an infinite loop of 18 rendered DOM nodes for 6 data items).

*   **Bottom-Left Anchor Origin:** The focal point ($0$) is pushed down and left.
    $$ X_{base} = \Delta \cdot (0.15 \cdot W) $$
    $$ Y_{base} = (\Delta \cdot 0.05 \cdot H) + (0.25 \cdot H) $$
*   **Sine Wave Deformation:** 
    $$ Y_{wave} = A_{current} \cdot \sin(\Delta \cdot 1.2) $$
    $$ Y_{final} = Y_{base} - Y_{wave} $$
*   **True Z-Depth (Camera Distance):**
    Background cards recede deeply. Exiting cards ($\Delta < 0$) accelerate rapidly *through* the camera plane.
    $$ Z_{pos} = \begin{cases} -(\Delta \cdot 300\text{px}) & \text{if } \Delta \ge 0 \\ |\Delta|^{1.5} \cdot 600\text{px} & \text{if } \Delta < 0 \end{cases} $$
*   **Angular Dynamics (3D Fanning):** 
    Cards rotate on the Y-axis to face the vanishing point, creating a fanned deck effect.
    $$ Rotate_Y = \Delta \cdot 15^\circ $$
    $$ Rotate_Z = \Delta \cdot -4^\circ $$

---

## 4. Interaction & State Machine

### The "Empty Trail" Fix (Infinite Loop)
To prevent the spatial track from appearing empty, the 6 data items are duplicated 3 times (18 total DOM nodes). The math uses a wrapped modulo function to ensure $\Delta$ seamlessly cycles, creating an infinite conveyor belt.

### Magnetic Hover & Pointer Masking
*   Standard CSS `:hover` is strictly prohibited. 
*   **Masking:** To prevent invisible overlapping nodes from stealing clicks, pointer-events are dynamically toggled via the render loop: `pointer-events: auto` applies ONLY if $|\Delta| < 0.3$.
*   **Hover Pull:** The GSAP pointer observer calculates Pythagorean distance to the focal card. If the cursor is close, the card's coordinates lerp $20\%$ toward the cursor.

### Detail State (The FLIP Expansion)
When the active focal card is clicked:
1.  **Kinetic Braking:** The engine instantly freezes ($V_s = 0$, `isFrozen = true`).
2.  **Atmospheric Blur:** A global `backdrop-filter: blur(16px)` layer crossfades over the background.
3.  **Layout Morph:** GSAP `Flip` plugin takes over, animating the card from its 3D spatial position on the curve to a fixed, flattened `.detail-panel` state on the right side of the screen (`ease: "expo.inOut"`, `duration: 0.85s`).
4.  **Kinetic Dismissal:** Scrolling the mouse wheel or clicking the blurred background immediately reverses the FLIP state, injects the scroll delta back into the physics engine, and unfreezes the loop.

### Global Parallax
Independent of the frozen detail state, continuous pointer coordinates are normalized to $[-1, 1]$ and lerped to apply a subtle X/Y translation offset to the entire parent container, maintaining volumetric depth at all times.

---

## 5. UI/UX Design System Specifications

### CSS Classes & Styling
*   **`.cyber-glass-card`**: 
    *   `backdrop-blur-2xl`, `bg-white/5`, `border-white/10`.
    *   Must include `will-change: transform, backdrop-filter, opacity`.
*   **Dither Overlay**: 
    *   A pseudo-element (`::before`) using a base64 inline SVG fractal noise (`<feTurbulence>`) with `mix-blend-mode: overlay` and `opacity: 0.2`.
*   **Proximity Edge-Glow**:
    *   A pseudo-element (`::after`) containing a radial gradient tied to mouse coordinates (`--mouse-x`, `--mouse-y`), its opacity mathematically tied to $\Delta$ (peaks at $\Delta = 0$).

---

## 6. SDE Strict Guardrails

1.  **Hardware Acceleration:** Under no circumstances should layout properties (`top`, `left`, `margin`) be animated. The GSAP Ticker MUST write exclusively to a `transform3d()` string combining `translate3d`, `rotateY`, `rotateZ`, and `scale`.
2.  **React Strict Mode Safety:** The entire initialization of `Observer`, `gsap.ticker`, and event listeners must be wrapped in `let ctx = gsap.context(() => {...})`. The `useEffect` cleanup function must explicitly call `ctx.revert()` to prevent memory leaks and duplicated physics loops in Next.js development mode.
3.  **Asset Hydration:** Ensure `document.fonts.ready` has resolved before executing any GSAP `Flip` animations to prevent layout tearing during the transition.