import { useEffect, useState } from 'react';

export default function AutoTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className="timer-box">
      <p>
        Chronomètre automatique : <strong>{seconds} s</strong>
      </p>

      <button
        className="btn"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? 'Pause' : 'Reprendre'}
      </button>
    </div>
  );
}