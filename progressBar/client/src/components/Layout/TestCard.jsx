export function TestCard({ title, children, onStart, onReset, isActive }) {
  return (
    <div className="test-card">
      <div className="test-card-header">
        <h3>{title}</h3>
        <div className="test-card-controls">
          <button
            onClick={onStart}
            disabled={isActive}
            className="btn btn-sm btn-primary"
          >
            Start
          </button>
          <button
            onClick={onReset}
            className="btn btn-sm btn-secondary"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="test-card-body">
        {children}
      </div>
    </div>
  );
}
