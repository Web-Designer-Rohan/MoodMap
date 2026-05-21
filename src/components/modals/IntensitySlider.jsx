import React from 'react';

const intensityLabels = ['Barely', 'Mild', 'Moderate', 'Strong', 'Intense'];

export default function IntensitySlider({ value, onChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '8px' }}>
        Intensity: {intensityLabels[value - 1]}
      </p>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '4px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px' }}>
        {intensityLabels.map((label) => (
          <span key={label} style={{ fontSize: '0.625rem', color: 'var(--color-text-muted)' }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
