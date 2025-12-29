export function MultiSegmentProgressBar({ progress, status }) {
  const segments = 10;
  const filledSegments = Math.floor((progress / 100) * segments);

  const getColor = () => {
    if (status === 'error') return '#f44336';
    if (status === 'completed') return '#4CAF50';
    if (status === 'running') return '#2196F3';
    return '#e0e0e0';
  };

  return (
    <div className="progress-container">
      <div className="multi-segment-wrapper">
        {Array.from({ length: segments }).map((_, index) => (
          <div
            key={index}
            className="segment"
            style={{
              backgroundColor: index < filledSegments ? getColor() : '#e0e0e0',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
      <div className="progress-status">
        {filledSegments} / {segments} segments
      </div>
    </div>
  );
}
