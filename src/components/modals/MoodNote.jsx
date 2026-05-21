import React from 'react';

export default function MoodNote({ value, onChange }) {
  const maxLength = 120;
  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '8px' }}>
        Add a note (optional)
      </p>
      <div style={{ position: 'relative' }}>
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange(e.target.value);
            }
          }}
          placeholder="What is on your mind?"
          rows={3}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 'var(--radius, 1rem)',
            border: '1px solid var(--color-divider)',
            backgroundColor: 'var(--color-bg)',
            fontSize: '0.875rem',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            resize: 'none',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
          }}
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
