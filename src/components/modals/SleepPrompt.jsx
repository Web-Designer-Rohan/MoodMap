import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../db/db';

export default function SleepPrompt({ isOpen, onClose }) {
  const [quality, setQuality] = useState(3);
  const [note, setNote] = useState('');

  const handleSave = async () => {
    await db.sleep.add({
      date: new Date().toISOString().split('T')[0],
      quality,
      note,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 999,
            }}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxWidth: '390px',
              margin: '0 auto',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px 24px 0 0',
              padding: '24px 20px 32px',
              zIndex: 1000,
            }}
          >
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
              How did you sleep? 😴
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '20px' }}>
              Track your sleep quality to understand patterns.
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map((q) => (
                <motion.button
                  key={q}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuality(q)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: quality === q ? 'var(--color-blue-mid)' : 'var(--color-bg)',
                    border: quality === q ? '2px solid var(--color-blue-deep)' : '2px solid var(--color-divider)',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {['😫', '😕', '😐', '😊', '😴'][q - 1]}
                </motion.button>
              ))}
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any dreams or notes? (optional)"
              rows={2}
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
                marginBottom: '16px',
              }}
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              style={{
                width: '100%',
                height: '56px',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-blue-mid)',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-button)',
              }}
            >
              Save Sleep Log
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
