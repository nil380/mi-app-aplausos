import { useState } from 'react';

function App() {
  const [aplausos, setAplausos] = useState(0);

  // Función mágica para hacer un sonido divertido cuando haces clic
  const tocarSonidoAplauso = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Por si el navegador se pone estricto con el sonido
    }
  };

  const manejarClic = () => {
    setAplausos(aplausos + 1);
    tocarSonidoAplauso();
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#0f172a',
      color: '#f8fafc'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Mi Primer App en React! 🚀</h1>
      
      <button 
        onClick={manejarClic}
        style={{
          padding: '14px 28px',
          fontSize: '1.3rem',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
          transition: 'transform 0.1s ease'
        }}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
      >
        👏 Llevas {aplausos} aplausos
      </button>
    </div>
  );
}

export default App;