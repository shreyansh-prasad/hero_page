export default function SchedulePage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: 'black' }}>
      <iframe 
        src="/schedule/index.html" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Schedule"
      />
    </div>
  );
}
