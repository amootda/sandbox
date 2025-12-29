export function CircularProgressBar({ progress, status }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (status === 'error') return '#f44336';
    if (status === 'completed') return '#4CAF50';
    if (status === 'running') return '#2196F3';
    return '#e0e0e0';
  };

  return (
    <div className="progress-container circular-container">
      <svg width={size} height={size} className="circular-progress">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="24"
          fontWeight="bold"
          fill={getColor()}
        >
          {progress.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
}
