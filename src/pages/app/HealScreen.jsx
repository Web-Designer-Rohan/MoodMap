import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { format, differenceInDays } from 'date-fns';
import { useHealJourney } from '../../hooks/useHealJourney';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import { db } from '../../db/db';

const GRIEF_CATEGORIES = [
  { emoji: '💔', label: 'Heartbreak' },
  { emoji: '🫂', label: 'Friendship' },
  { emoji: '🏠', label: 'Family' },
  { emoji: '📚', label: 'Academic' },
  { emoji: '🌫️', label: 'Loneliness' },
  { emoji: '🪞', label: 'Self-doubt' },
];

export default function HealScreen() {
  const navigate = useNavigate();
  const {
    getActiveEntries,
    getDaysHealing,
    getHealingProgress,
    addGriefEntry,
    updateGriefStatus,
  } = useHealJourney();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [unsentLetter, setUnsentLetter] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [letterEditor, setLetterEditor] = useState(null);
  const [letterContent, setLetterContent] = useState('');

  const activeEntries = getActiveEntries();

  const handleAddEntry = async () => {
    if (!selectedCategory || !description.trim()) return;
    await addGriefEntry({
      category: selectedCategory.label,
      description,
      unsentLetter: unsentLetter ? letterContent : '',
    });
    setSheetOpen(false);
    setSelectedCategory(null);
    setDescription('');
    setUnsentLetter(false);
    setLetterContent('');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>💚 Heal</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)' }}>Your private healing space</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '24px',
          borderRadius: 'var(--radius, 1.5rem)',
          backgroundColor: 'var(--color-green-light)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: 'var(--radius, 1rem)',
          backgroundColor: 'var(--color-green-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '3rem' }}>🖼️</span>
          {/* IMAGE PLACEHOLDER: Soft watercolor nature scene — gentle greenery, morning light */}
        </div>
        <p style={{ fontSize: '1.125rem', fontWeight: 600, textAlign: 'center' }}>
          You have been healing for {activeEntries.length > 0 ? getDaysHealing(activeEntries[0]) : 0} days 🕊️
        </p>
      </motion.div>

      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Active Grief</h2>
        {activeEntries.length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '24px' }}>
            No active grief entries. Add one below to start your healing journey.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeEntries.map((entry) => {
              const progress = getHealingProgress(entry);
              const days = getDaysHealing(entry);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius, 1.5rem)',
                    backgroundColor: 'var(--color-surface)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '1.5rem' }}>
                      {GRIEF_CATEGORIES.find((c) => c.label === entry.category)?.emoji || '💔'}
                    </span>
                    <div>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{entry.category}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)' }}>
                        Started {format(new Date(entry.startDate), 'd MMM')} · {days} days ago
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '4px', borderRadius: '9999px', backgroundColor: 'var(--color-divider)', marginBottom: '12px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8 }}
                      style={{ height: '100%', borderRadius: '9999px', backgroundColor: 'var(--color-blue-mid)' }}
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedEntry(entry)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      backgroundColor: 'var(--color-blue-light)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    View Journey
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Unsent Letters</h2>
        {activeEntries.filter((e) => e.unsentLetter).length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '16px' }}>
            No unsent letters yet.
          </p>
        ) : (
          activeEntries.filter((e) => e.unsentLetter).map((entry, i) => (
            <motion.button
              key={entry.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setLetterEditor(entry); setLetterContent(entry.unsentLetter || ''); }}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 'var(--radius, 1rem)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-divider)',
                textAlign: 'left',
                cursor: 'pointer',
                marginBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span>📝</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Letter #{i + 1}</span>
                <span style={{ fontSize: '0.625rem', color: 'var(--color-text-sub)' }}>
                  {format(new Date(entry.startDate), 'd MMM')}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--color-text-sub)' }}>
                {(entry.unsentLetter || '').substring(0, 40)}...
              </p>
            </motion.button>
          ))
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setSheetOpen(true)}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 'var(--radius, 1.5rem)',
          border: '2px dashed var(--color-blue-mid)',
          backgroundColor: 'transparent',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--color-blue-mid)',
          cursor: 'pointer',
        }}
      >
        + Add a grief entry
      </motion.button>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 999 }}
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
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <div style={{ width: '40px', height: '4px', borderRadius: '9999px', backgroundColor: 'var(--color-divider)', margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '16px' }}>Add Grief Entry</h3>

              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '8px' }}>Category</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                {GRIEF_CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 'var(--radius, 1rem)',
                      backgroundColor: selectedCategory?.label === cat.label ? 'var(--color-blue-light)' : 'var(--color-bg)',
                      border: selectedCategory?.label === cat.label ? '2px solid var(--color-blue-mid)' : '2px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{cat.emoji}</span>
                    <span style={{ fontSize: '0.625rem', fontWeight: 500 }}>{cat.label}</span>
                  </motion.button>
                ))}
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you are going through..."
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
                  marginBottom: '12px',
                }}
              />

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={unsentLetter}
                  onChange={(e) => setUnsentLetter(e.target.checked)}
                  style={{ accentColor: 'var(--color-blue-mid)' }}
                />
                <span style={{ fontSize: '0.875rem' }}>Include an unsent letter</span>
              </label>

              {unsentLetter && (
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  placeholder="Write your unsent letter here..."
                  rows={4}
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
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddEntry}
                disabled={!selectedCategory || !description.trim()}
                style={{
                  width: '100%',
                  height: '56px',
                  borderRadius: '9999px',
                  backgroundColor: (selectedCategory && description.trim()) ? 'var(--color-blue-mid)' : 'var(--color-divider)',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: (selectedCategory && description.trim()) ? 'pointer' : 'not-allowed',
                  boxShadow: (selectedCategory && description.trim()) ? 'var(--shadow-button)' : 'none',
                }}
              >
                Save Entry
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {letterEditor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLetterEditor(null)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'var(--color-bg)', zIndex: 999 }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              style={{
                position: 'fixed',
                inset: 0,
                maxWidth: '390px',
                margin: '0 auto',
                backgroundColor: 'var(--color-bg)',
                zIndex: 1000,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={() => setLetterEditor(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-blue-mid)' }}>← Back</span>
                </button>
              </div>
              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '16px',
                  borderRadius: 'var(--radius, 1rem)',
                  border: '1px solid var(--color-divider)',
                  backgroundColor: 'var(--color-surface)',
                  fontSize: '1rem',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.8,
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
