import { useState } from 'react';
import Header from './components/Header.jsx';
import Counter from './components/Counter.jsx';
import AutoTimer from './components/AutoTimer.jsx';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <Header
        titre="Mon Super Compteur React"
        sousTitre="Maîtrise des Hooks fondamentaux useState et useEffect"
      />
      <Counter />

      <button
        className="btn btn-reset"
        onClick={() => setShowTimer((previous) => !previous)}
      >
        {showTimer ? 'Masquer le chronomètre' : 'Afficher le chronomètre'}
      </button>

      {showTimer && <AutoTimer />}
    </div>
  );
}