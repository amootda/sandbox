export function PercentageProgressBar({ progress, status }) {
  const getColor = () => {
    if (status === 'error') return '#f44336';
    if (status === 'completed') return '#4CAF50';
    if (status === 'running') return '#2196F3';
    return '#e0e0e0';
  };

  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper progress-with-text">
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
            transition: 'width 0.1s linear, background-color 0.3s ease'
          }}
        />
        <div className="progress-percentage-overlay">
          {progress.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
