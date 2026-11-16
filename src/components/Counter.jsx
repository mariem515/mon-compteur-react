import { useCallback, useEffect, useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(() => {
    const valeur = Number(localStorage.getItem('mon_compteur_valeur'));
    return Number.isFinite(valeur) ? Math.max(-50, Math.min(50, valeur)) : 0;
  });

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Aucun clic pour le moment');
  const [totalClics, setTotalClics] = useState(0);
  const [historique, setHistorique] = useState(() => {
    try {
      const sauvegarde = localStorage.getItem('mon_compteur_historique');
      const actions = JSON.parse(sauvegarde ?? '[]');
      return Array.isArray(actions) ? actions : [];
    } catch {
      return [];
    }
  });

  const modifierCompteur = useCallback((variation) => {
    const prochainCompte = count + variation;

    if (prochainCompte > 50) {
      setMessage('Seuil maximal de 50 atteint !');
      return;
    }

    if (prochainCompte < -50) {
      setMessage('Seuil minimal de −50 atteint !');
      return;
    }

    setCount(prochainCompte);
    setMessage(variation > 0 ? `Ajout de ${variation}` : `Retrait de ${-variation}`);
    setTotalClics((prev) => prev + 1);
    setHistorique((prev) => [
      ...prev,
      variation > 0 ? `+${variation}` : String(variation),
    ]);
  }, [count]);

  useEffect(() => {
    document.title = `Compteur : ${count}`;
    localStorage.setItem('mon_compteur_valeur', String(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.target instanceof HTMLSelectElement) return;

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        modifierCompteur(event.key === 'ArrowUp' ? step : -step);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modifierCompteur, step]);

  function handleReset() {
    setCount(0);
    setMessage('Remise à zéro');
    setTotalClics((prev) => prev + 1);
    setHistorique([]);
  }

  function getStyleClass() {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  }

  return (
    <div className="counter-card">
      <h2 className={getStyleClass()}>Compteur : {count}</h2>

      <div className="btn-group">
        <button className="btn btn-dec" onClick={() => modifierCompteur(-step)}>
          -{step}
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-inc" onClick={() => modifierCompteur(step)}>
          +{step}
        </button>
      </div>

      <div className="step-control">
        <label htmlFor="counter-step">Pas d’incrémentation : </label>
        <select
          id="counter-step"
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="history-card">
        <p><strong>Dernière action :</strong> {message}</p>
        <p><strong>Total des clics :</strong> {totalClics}</p>
        {historique.length > 0 && (
          <p><strong>Historique :</strong> {historique.join(', ')}</p>
        )}
      </div>
    </div>
  );
}