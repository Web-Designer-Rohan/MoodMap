import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';

const securityQuestions = [
  'What was your first pet\'s name?',
  'What city were you born in?',
  'What is your favorite book?',
  'What was your childhood nickname?',
  'What is the name of your favorite teacher?',
];

export default function SignupStep2() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!securityQuestion) {
      setError('Please select a security question');
      return;
    }
    if (!securityAnswer.trim()) {
      setError('Please provide an answer');
      return;
    }
    sessionStorage.setItem('signup_password', password);
    sessionStorage.setItem('signup_security_question', securityQuestion);
    sessionStorage.setItem('signup_security_answer', securityAnswer);
    navigate('/signup/step3');
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
        <button onClick={() => navigate('/signup/step1')} style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="var(--color-text-primary)" />
        </button>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }} />
          <motion.div animate={{ scale: 1.25 }} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-blue-mid)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <ImagePlaceholder width={80} height={80} shape="circle" description="Security illustration" />
      </div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Secure your space</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '32px' }}>
        Create a private password for your MoodMap
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              height: '56px',
              padding: '0 48px 0 20px',
              borderRadius: 'var(--radius, 1rem)',
              border: '1px solid var(--color-divider)',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: 'var(--color-surface)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showPassword ? <EyeOff size={20} color="var(--color-text-sub)" /> : <Eye size={20} color="var(--color-text-sub)" />}
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              height: '56px',
              padding: '0 48px 0 20px',
              borderRadius: 'var(--radius, 1rem)',
              border: '1px solid var(--color-divider)',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: 'var(--color-surface)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
          />
          <button
            onClick={() => setShowConfirm(!showConfirm)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showConfirm ? <EyeOff size={20} color="var(--color-text-sub)" /> : <Eye size={20} color="var(--color-text-sub)" />}
          </button>
        </div>

        <select
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
          style={{
            height: '56px',
            padding: '0 20px',
            borderRadius: 'var(--radius, 1rem)',
            border: '1px solid var(--color-divider)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'var(--color-surface)',
            color: securityQuestion ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          }}
        >
          <option value="" disabled>Security question</option>
          {securityQuestions.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Security answer"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
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

        {error && (
          <p style={{ fontSize: '0.75rem', color: 'var(--mood-stressed)' }}>{error}</p>
        )}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
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
          marginTop: '32px',
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
