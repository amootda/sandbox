export function SpeedSlider({ value, onChange }) {
  return (
    <div className="speed-slider">
      <label htmlFor="speed" className="slider-label">
        Response Speed: <strong>{value}x</strong>
      </label>
      <input
        id="speed"
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="slider-input"
      />
      <div className="speed-labels">
        <span>Slow (10s)</span>
        <span>Fast (1s)</span>
      </div>
    </div>
  );
}
