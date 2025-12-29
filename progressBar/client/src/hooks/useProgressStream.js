import { useState, useEffect, useRef } from 'react';

export function useProgressStream(speed, isActive) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setStatus('idle');
      setElapsed(0);
      return;
    }

    setStatus('connecting');
    setError(null);
    setProgress(0);
    setElapsed(0);

    const eventSource = new EventSource(`/api/progress/simulate?speed=${speed}`);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setStatus('running');
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress);
      setElapsed(data.elapsed);

      if (data.status === 'completed') {
        setStatus('completed');
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setError('Connection error');
      setStatus('error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [speed, isActive]);

  const reset = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    setProgress(0);
    setStatus('idle');
    setError(null);
    setElapsed(0);
  };

  return { progress, status, error, elapsed, reset };
}
