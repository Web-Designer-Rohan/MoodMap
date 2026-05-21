import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECONDARY_MOODS } from '../../data/moodData';
import IntensitySlider from './IntensitySlider';
import TagSelector from './TagSelector';
import MoodNote from './MoodNote';
import { useMoodStore } from '../../store/moodStore';
import { ConfirmToast } from '../shared/ConfirmToast';

export default function MoodDetailModal({ isOpen, onClose, primaryMood }) {
  const {
    selectedSecondaryMood,
    setSelectedSecondaryMood,
    moodIntensity,
    setMoodIntensity,
    selectedTags,
    toggleTag,
    moodNote,
    setMoodNote,
    saveMood,
    resetMoodForm,
  } = useMoodStore();

  const [toastVisible, setToastVisible] = useState(false);

  const secondaryMoods = primaryMood ? SECONDARY_MOODS[primaryMood.id] || [] : [];

  const handleSave = async () => {
    if (!primaryMood) return;
    await saveMood({
      primaryEmoji: primaryMood.emoji,
      primaryLabel: primaryMood.label,
      secondaryEmoji: selectedSecondaryMood?.emoji || '',
      secondaryLabel: selectedSecondaryMood?.label || '',
      intensity: moodIntensity,
      note: moodNote,
      tags: selectedTags,
    });
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      resetMoodForm();
      onClose();
    }, 1500);
  };

  return (
    <>
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
                padding: '16px 20px 32px',
                zIndex: 1000,
                maxHeight: '85vh',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-divider)',
                  margin: '0 auto 20px',
                }}
              />

              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>
                Tell us more
              </h3>

              {secondaryMoods.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '8px' }}>
                    Be more specific
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {secondaryMoods.map((mood) => {
                      const isSelected = selectedSecondaryMood?.label === mood.label;
                      return (
                        <motion.button
                          key={mood.label}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedSecondaryMood(mood)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px',
                            borderRadius: '9999px',
                            backgroundColor: isSelected ? 'var(--color-blue-light)' : 'var(--color-bg)',
                            border: isSelected ? '2px solid var(--color-blue-mid)' : '2px solid transparent',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontSize: '1.25rem' }}>{mood.emoji}</span>
                          <span style={{ fontWeight: 500 }}>{mood.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              <IntensitySlider value={moodIntensity} onChange={setMoodIntensity} />

              <TagSelector selectedTags={selectedTags} onToggle={toggleTag} />

              <MoodNote value={moodNote} onChange={setMoodNote} />

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                style={{
                  width: '100%',
                  height: '56px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-green-deep)',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '16px',
                  boxShadow: 'var(--shadow-button)',
                }}
              >
                Save Mood
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <ConfirmToast message="Mood saved successfully ✨" visible={toastVisible} onClose={() => setToastVisible(false)} />
    </>
  );
}
