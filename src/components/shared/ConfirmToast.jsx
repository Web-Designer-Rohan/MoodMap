import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ConfirmToast({ message, visible, onClose }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            padding: '12px 24px',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-green-deep)',
            color: '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(74, 140, 111, 0.3)',
            maxWidth: '320px',
            textAlign: 'center',
          }}
          onClick={onClose}
        >
          {message || 'Mood saved successfully ✨'}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
