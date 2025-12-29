import { useMemo } from 'react';

export function useTimeEstimate(progress, elapsed) {
  return useMemo(() => {
    if (progress === 0 || progress === 100) {
      return {
        remaining: 0,
        total: elapsed
      };
    }

    const rate = progress / elapsed;
    const remaining = (100 - progress) / rate;
    const total = 100 / rate;

    return {
      remaining: Math.round(remaining),
      total: Math.round(total)
    };
  }, [progress, elapsed]);
}

export function formatTime(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  const decimal = ((ms % 1000) / 1000).toFixed(1).substring(1);
  return `${seconds}${decimal}s`;
}
