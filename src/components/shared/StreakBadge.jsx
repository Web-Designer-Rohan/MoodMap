import React from 'react';
import { motion } from 'framer-motion';

export function StreakBadge({ streak }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        borderRadius: 'var(--radius, 1rem)',
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>🔥</span>
      <div>
        <span style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {streak}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginLeft: '4px' }}>
          day streak
        </span>
      </div>
    </motion.div>
  );
}
