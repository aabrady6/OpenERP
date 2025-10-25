import React from 'react';

interface Props {
  radius: number;
  radiusOptions: number[];
  onChange: (newRadius: number) => void;
}

const RadiusSlider: React.FC<Props> = ({ radius, radiusOptions, onChange }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        background: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        boxShadow: '0 0 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      <label>
        Radius: {radius} meters
        <input
          type="range"
          min={0}
          max={radiusOptions.length - 1}
          step={1}
          value={radiusOptions.indexOf(radius)}
          onChange={(e) => onChange(radiusOptions[Number(e.target.value)])}
          list="radius-ticks"
          style={{ width: '100%' }}
        />
        <datalist id="radius-ticks">
          {radiusOptions.map((r, idx) => (
            <option key={idx} value={idx} label={`${r}`} />
          ))}
        </datalist>
      </label>
    </div>
  );
};

export default RadiusSlider;
