import { SpeedSlider } from './SpeedSlider';

export function ControlPanel({ speed, onSpeedChange, onStart, onReset, isRunning }) {
  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <SpeedSlider value={speed} onChange={onSpeedChange} />
      <div className="control-buttons">
        <button
          onClick={onStart}
          disabled={isRunning}
          className="btn btn-primary"
        >
          Start All
        </button>
        <button
          onClick={onReset}
          className="btn btn-secondary"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
