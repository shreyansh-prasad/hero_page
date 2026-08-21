/**
 * ScrollHint — Bottom-right "SCROLL TO DISCOVER" hint.
 * Pulses gently to indicate scroll interaction.
 * Hidden when the detail panel is open.
 */

export default function ScrollHint({ hidden }) {
  return (
    <div
      className="scroll-hint"
      style={{ opacity: hidden ? 0 : undefined, transition: "opacity 0.3s" }}
    >
      <div style={{ color: '#ffffff', fontWeight: 'bold' }}>Scroll to Discover</div>
      <div style={{ marginTop: '8px', color: 'rgba(255,255,255,0.6)' }}>Select the event for details</div>
    </div>
  );
}
