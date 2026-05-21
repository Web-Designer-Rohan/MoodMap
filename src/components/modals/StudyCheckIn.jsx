import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../db/db';

export default function StudyCheckIn({ isOpen, onClose }) {
  const [studyMood, setStudyMood] = useState(null);

  const moods = [
    { emoji: '😄', label: 'Focused' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😟', label: 'Stressed' },
    { emoji: '😔', label: 'Overwhelmed' },
  ];

  const handleSave = async () => {
    if (!studyMood) return;
    await db.moods.add({
      primaryEmoji: studyMood.emoji,
      primaryLabel: studyMood.label,
      secondaryEmoji: '',
      secondaryLabel: '',
      intensity: 3,
      note: 'Study check-in',
      tags: ['assignment'],
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
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
              Study Check-In 📚
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '20px' }}>
              How are you feeling about your study session?
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              {moods.map((mood) => {
                const isSelected = studyMood?.label === mood.label;
                return (
                  <motion.button
                    key={mood.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStudyMood(mood)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius, 1rem)',
                      backgroundColor: isSelected ? 'var(--color-blue-light)' : 'var(--color-bg)',
                      border: isSelected ? '2px solid var(--color-blue-mid)' : '2px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{mood.emoji}</span>
                    <span style={{ fontSize: '0.625rem', fontWeight: 500 }}>{mood.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={!studyMood}
              style={{
                width: '100%',
                height: '56px',
                borderRadius: '9999px',
                backgroundColor: studyMood ? 'var(--color-blue-mid)' : 'var(--color-divider)',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
                cursor: studyMood ? 'pointer' : 'not-allowed',
                boxShadow: studyMood ? 'var(--shadow-button)' : 'none',
              }}
            >
              Log Study Mood
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
