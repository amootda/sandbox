import { useTimeEstimate, formatTime } from '../../hooks/useTimeEstimate';

export function TimeEstimateProgressBar({ progress, status, elapsed }) {
  const { remaining, total } = useTimeEstimate(progress, elapsed);

  const getColor = () => {
    if (status === 'error') return '#f44336';
    if (status === 'completed') return '#4CAF50';
    if (status === 'running') return '#2196F3';
    return '#e0e0e0';
  };

  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
            transition: 'width 0.1s linear, background-color 0.3s ease'
          }}
        />
      </div>
      <div className="progress-time-info">
        {status === 'running' || status === 'completed' ? (
          <>
            <span>Elapsed: {formatTime(elapsed)}</span>
            {status === 'running' && remaining > 0 && (
              <>
                <span className="separator">•</span>
                <span>Remaining: ~{formatTime(remaining)}</span>
                <span className="separator">•</span>
                <span>Total: ~{formatTime(total)}</span>
              </>
            )}
            {status === 'completed' && (
              <>
                <span className="separator">•</span>
                <span>Total: {formatTime(elapsed)}</span>
              </>
            )}
          </>
        ) : (
          <span>Waiting...</span>
        )}
      </div>
    </div>
  );
}
