import React from 'react';
import { motion } from 'framer-motion';
import { TRIGGER_TAGS } from '../../data/moodData';

export default function TagSelector({ selectedTags, onToggle }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '8px' }}>
        What triggered this mood?
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {TRIGGER_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <motion.button
              key={tag}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(tag)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: isSelected ? 'var(--color-blue-mid)' : 'var(--color-green-light)',
                color: isSelected ? '#FFFFFF' : 'var(--color-text-primary)',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tag}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
