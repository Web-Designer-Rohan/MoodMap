import React from 'react';
import { motion } from 'framer-motion';

export function ImagePlaceholder({ width = 120, height = 120, shape = 'rect', description = '' }) {
  const isCircle = shape === 'circle';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        width,
        height,
        backgroundColor: 'var(--color-green-light)',
        borderRadius: isCircle ? '9999px' : 'var(--radius, 1rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: shape === 'circle' ? '1.5rem' : '2rem' }}>🖼️</span>
      {description && (
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            marginTop: '4px',
            textAlign: 'center',
            padding: '0 8px',
          }}
        >
          {description}
        </span>
      )}
      {/* IMAGE PLACEHOLDER: {description || 'Image placeholder'} */}
    </motion.div>
  );
}
