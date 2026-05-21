import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';

export default function SignupStep1() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [trustedName, setTrustedName] = useState('');
  const [trustedEmail, setTrustedEmail] = useState('');

  const handleNext = () => {
    if (!email.trim()) return;
    sessionStorage.setItem('signup_email', email);
    sessionStorage.setItem('signup_trusted_name', trustedName);
    sessionStorage.setItem('signup_trusted_email', trustedEmail);
    navigate('/signup/step2');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', padding: '20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative' }}>
        <button onClick={() => navigate('/')} style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="var(--color-text-primary)" />
        </button>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <motion.div animate={{ scale: 1.25 }} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-blue-mid)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <ImagePlaceholder width={80} height={80} shape="circle" description="Get started illustration" />
      </div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Let&apos;s get started</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '32px' }}>
        Enter your email to create your MoodMap
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            height: '56px',
            padding: '0 20px',
            borderRadius: 'var(--radius, 1rem)',
            border: '1px solid var(--color-divider)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'var(--color-surface)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
        />
        <input
          type="text"
          placeholder="Trusted contact name (optional)"
          value={trustedName}
          onChange={(e) => setTrustedName(e.target.value)}
          style={{
            height: '56px',
            padding: '0 20px',
            borderRadius: 'var(--radius, 1rem)',
            border: '1px solid var(--color-divider)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'var(--color-surface)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
        />
        <input
          type="email"
          placeholder="A friend's email (optional)"
          value={trustedEmail}
          onChange={(e) => setTrustedEmail(e.target.value)}
          style={{
            height: '56px',
            padding: '0 20px',
            borderRadius: 'var(--radius, 1rem)',
            border: '1px solid var(--color-divider)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'var(--color-surface)',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '-8px' }}>
          We&apos;ll only message them if you choose to reach out during difficult moments.
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        disabled={!email.trim()}
        style={{
          width: '100%',
          height: '56px',
          borderRadius: '9999px',
          backgroundColor: email.trim() ? 'var(--color-blue-mid)' : 'var(--color-divider)',
          color: '#FFFFFF',
          fontSize: '1rem',
          fontWeight: 600,
          border: 'none',
          cursor: email.trim() ? 'pointer' : 'not-allowed',
          boxShadow: email.trim() ? 'var(--shadow-button)' : 'none',
          marginTop: '32px',
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
