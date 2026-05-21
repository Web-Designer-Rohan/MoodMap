import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const slides = [
  {
    title: 'Track your mood daily',
    subtitle: 'Log how you feel in seconds. No judgment, just honesty.',
    placeholder: 'Mood tracking illustration',
  },
  {
    title: 'Understand your patterns',
    subtitle: 'See your emotional journey week by week and discover what affects your mood.',
    placeholder: 'Insights chart illustration',
  },
  {
    title: 'Heal at your own pace',
    subtitle: 'Your private space to process grief, heartbreak, and tough emotions.',
    placeholder: 'Healing journey illustration',
  },
];

export default function OnboardingSlides() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentSlide < 2) setCurrentSlide(currentSlide + 1);
      if (e.key === 'ArrowLeft' && currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleDragEnd = (info) => {
    if (info.offset.x < -80 && currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    } else if (info.offset.x > 80 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
    setDragOffset(0);
  };

  const slide = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '32px' }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => handleDragEnd(info)}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: 'var(--radius, 1.5rem)',
            backgroundColor: 'var(--color-green-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '3rem' }}>🖼️</span>
          {/* IMAGE PLACEHOLDER: {slide.placeholder} */}
        </div>

        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>{slide.title}</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', lineHeight: 1.5, maxWidth: '280px' }}>
            {slide.subtitle}
          </p>
        </motion.div>
      </motion.div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              width: i === currentSlide ? '24px' : '8px',
              backgroundColor: i === currentSlide ? 'var(--color-blue-mid)' : 'var(--color-divider)',
            }}
            transition={{ duration: 0.3 }}
            style={{ height: '8px', borderRadius: '9999px' }}
          />
        ))}
      </div>

      {currentSlide === 2 ? (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/home')}
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
          Let&apos;s go →
        </motion.button>
      ) : (
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.875rem',
            color: 'var(--color-blue-mid)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Skip
        </button>
      )}
    </motion.div>
  );
}
