import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Dice from './components/dice';
import './App.css';

function App() {
  const [value, setValue] = useState(1);
  //récupère l'historique ou initalise avec tableau vide
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });

  //changement -> synchronise le localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  function roll() {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setValue(newValue);
    setHistory(old => [newValue, ...old]);
  }

  return (
    <div className="App">
      <div className="card">
        <h1>Lancer de <span>dé</span></h1>
        <p className="dice-value">{value}</p>
        <Canvas camera={{ position: [2, 2, 2], fov: 50 }} style={{ width: 300, height: 300 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Dice value={value} />
        </Canvas>
        <button className="roll-btn" onClick={roll}>Lancer</button>
        {history.length > 0 && (
          <div className="history">
            <p className="history-label">Historique</p>
            <div className="history-chips">
              {history.map((val, i) => (
                <span className="history-chip" key={i}>{val}</span>
              ))}
            </div>
            <button className="reset-btn" onClick={() => setHistory([])}>Effacer</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

