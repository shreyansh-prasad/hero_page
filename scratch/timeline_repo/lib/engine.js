/**
 * Shunya 2.5D Conveyor Belt — Kinetic Amplitude Envelope Engine
 *
 * Mathematical architecture:
 *   V_current = lerp(V_current, V_target, μ_friction)      // high friction — stops fast
 *   A_target  = |V_current| * C_amplitude
 *   A_current = lerp(A_current, A_target, μ_spring)         // low spring — settles slowly
 *   Y_wave    = A_current * sin(Δ · ω + φ)
 *   Y_final   = Y_base - Y_wave
 *
 * μ_spring << μ_friction  →  cards stop before wave flattens  →  organic "jelly" settle
 */

export const TOTAL_NODES = 18;
export const DATA_SIZE = 6;
export const HALF_NODES = TOTAL_NODES >> 1; // 9

// ─── Velocity Physics ──────────────────────────────────────────────────────
export const V_FRICTION = 0.95;      // Smoother deceleration curve (more glide)
export const V_MAX = 0.08;           // Sped up to ~4.8 cards per second
export const V_REST = 0.0001;        // Snap to zero at this micro-velocity
export const INPUT_SCALE = 0.0003;   // Slightly more sensitive for a faster ramp-up

// ─── Wave Physics (Kinetic Amplitude Envelope) ─────────────────────────────
export const WAVE_FREQUENCY = 0.55;  // Decreased (ω) to drastically increase the wavelength
export const WAVE_AMP_SCALAR = 1200; // Halved to reduce vertical movement (amplitude)
export const WAVE_AMP_MAX = 200;     // Halved to cap the maximum vertical deviation
export const WAVE_AMP_SPRING = 0.4;  // Highly responsive spring: reacts instantly to your real-time scroll speed
export const WAVE_PHASE_SPEED = 0.5; // How fast the phase shifts with progress

// ─── Parallax ──────────────────────────────────────────────────────────────
export const AMP_X = 25;
export const AMP_Y = 15;

// ─── Perspective ───────────────────────────────────────────────────────────
export const VANISHING_POINT_X_PCT = 1.30;   // Pushed out to maintain the wide diagonal
export const VANISHING_POINT_Y_PCT = -1.20;  // High enough to clip the background cards
export const PERSPECTIVE_FACTOR = 0.20;      // Increased to spread the cards further apart
export const CARD_ROTATE_Y_DEG = -15;        // Tilts left edge forward (normal points left, face is straight)

// ─── Snap ──────────────────────────────────────────────────────────────────
export const SNAP_THRESHOLD = 0.018;  // Velocity below which magnetic snap engages
export const SNAP_STRENGTH = 0.04;    // Spring constant for magnetic snapping

/**
 * Wrapped delta: how many "slots" is node `i` from the virtual focal point `Pv`?
 * Result is in [-HALF_NODES, HALF_NODES).
 */
export function getDelta(i, Pv) {
  const raw = i - Pv;
  return (((raw + HALF_NODES) % TOTAL_NODES) + TOTAL_NODES) % TOTAL_NODES - HALF_NODES;
}

/**
 * Cinematic scale via perspective division: S = 1 / (1 + Δ · k)
 */
export function getScale(delta) {
  if (delta < 0) {
    // For past cards, smoothly increase scale linearly so they sweep off the bottom-left without singularity
    return 1 - delta * PERSPECTIVE_FACTOR;
  }
  const denom = 1 + delta * PERSPECTIVE_FACTOR;
  return denom <= 0.1 ? 10 : 1 / denom;
}

/**
 * X position: converges toward vanishing point
 */
export function getX(delta, W, xOrigin) {
  const S = getScale(delta);
  const Vx = W * VANISHING_POINT_X_PCT;
  return Vx - (Vx - xOrigin) * S;
}

/**
 * Y base position: converges toward vanishing point (no wave applied yet)
 */
export function getYBase(delta, H, yOrigin, W) {
  const S = getScale(delta);
  const Vy = H * VANISHING_POINT_Y_PCT;
  return Vy - (Vy - yOrigin) * S;
}

/**
 * Kinetic Wave Modifier — the core of the Kinetic Amplitude Envelope.
 * Pure function: given the current amplitude, delta, and progress, return the Y offset.
 *
 *   Y_wave = A_current * sin(Δ · ω + progress · phase_speed)
 */
export function getWaveY(delta, amplitude, progress) {
  // Subtracting progress makes the wave travel UP the timeline (towards the top-left)
  return amplitude * Math.sin(delta * WAVE_FREQUENCY - progress * WAVE_PHASE_SPEED);
}

export function isFocal(delta) {
  return Math.abs(delta) < 0.5;
}

/**
 * Full Spatial State for a single card on a single frame.
 * The wave is baked in: moving the card towards top-left (-X, -Y)
 */
export function getSpatialState(delta, W, H, xOrigin, yOrigin, amplitude, progress) {
  const S = getScale(delta);
  const absDelta = Math.abs(delta);
  
  return {
    x: getX(delta, W, xOrigin), // Strictly vertical wave, no X displacement
    y: getYBase(delta, H, yOrigin, W) - getWaveY(delta, amplitude, progress),
    scale: S,
    rotateY: CARD_ROTATE_Y_DEG,              
    z: (100 - delta * 10) | 0,               // bitwise floor — focal card on top
    opacity: delta < -4 ? 0 : delta > 16 ? 0 : 1, // Widened heavily so cards never pop in/out on screen
    visibility: delta < -4 || delta > 16 ? "hidden" : "visible",
    focusFactor: Math.max(0.6, 1 - absDelta * 0.15),
    focal: absDelta < 0.5,
  };
}
