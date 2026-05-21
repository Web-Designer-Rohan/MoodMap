import React from 'react';
import { motion } from 'framer-motion';

export function MoodCard({ mood, isSelected, onTap }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      onClick={() => onTap && onTap(mood)}
      style={{
        width: 72,
        borderRadius: 'var(--radius, 1rem)',
        backgroundColor: mood.color,
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        border: isSelected ? '2px solid var(--color-blue-deep)' : '2px solid transparent',
        boxShadow: isSelected ? 'var(--shadow-card)' : 'none',
        transform: isSelected ? 'translateY(-2px)' : 'none',
      }}
    >
      <span style={{ fontSize: '1.875rem' }}>{mood.emoji}</span>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: mood.textColor || 'var(--color-text-primary)',
          marginTop: '4px',
        }}
      >
        {mood.label}
      </span>
    </motion.div>
  );
}
