import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import { db } from '../../db/db';

const AVATARS = ['🧑‍🎓', '👩‍💻', '🧑‍🎨', '👨‍🔬', '🧑‍🏫', '👩‍🎤', '🧑‍🚀', '👩‍🍳', '🧑‍💼', '👩‍🌾', '🧑‍🎮', '🧘'];
const ACADEMIC_LEVELS = ['School', 'Undergraduate', 'Postgraduate', 'Working Student', 'Other'];

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function SignupStep3() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState(AVATARS[0]);
  const [academicLevel, setAcademicLevel] = useState('');

  const handleContinue = async () => {
    if (!fullName.trim() || !username.trim() || !academicLevel) return;

    const email = sessionStorage.getItem('signup_email') || '';
    const trustedName = sessionStorage.getItem('signup_trusted_name') || '';
    const trustedEmail = sessionStorage.getItem('signup_trusted_email') || '';
    const password = sessionStorage.getItem('signup_password') || '';
    const securityQuestion = sessionStorage.getItem('signup_security_question') || '';
    const securityAnswer = sessionStorage.getItem('signup_security_answer') || '';

    const passwordHash = await hashPassword(password);
    const trustedContacts = JSON.stringify([
      { name: trustedName, email: trustedEmail, phone: '', role: 'friend' },
    ].filter((c) => c.name || c.email));

    await db.user.add({
      email,
      username,
      fullName,
      avatarEmoji,
      academicLevel,
      passwordHash,
      securityQuestion,
      securityAnswer,
      trustedContacts,
      createdAt: new Date().toISOString(),
    });

    sessionStorage.clear();
    navigate('/onboarding');
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
        <button onClick={() => navigate('/signup/step2')} style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="var(--color-text-primary)" />
        </button>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-divider)' }} />
          <motion.div animate={{ scale: 1.25 }} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-blue-mid)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <ImagePlaceholder width={80} height={80} shape="circle" description="Personal touch illustration" />
      </div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Make it yours</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-sub)', marginBottom: '32px' }}>
        Tell us a little about yourself
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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

        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>@</span>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              height: '56px',
              padding: '0 20px 0 36px',
              borderRadius: 'var(--radius, 1rem)',
              border: '1px solid var(--color-divider)',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: 'var(--color-surface)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--color-blue-mid)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--color-divider)')}
          />
        </div>

        <select
          value={academicLevel}
          onChange={(e) => setAcademicLevel(e.target.value)}
          style={{
            height: '56px',
            padding: '0 20px',
            borderRadius: 'var(--radius, 1rem)',
            border: '1px solid var(--color-divider)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'var(--color-surface)',
            color: academicLevel ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          }}
        >
          <option value="" disabled>Academic level</option>
          {ACADEMIC_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-sub)', marginBottom: '8px' }}>Choose your avatar</p>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {AVATARS.map((emoji) => {
              const isSelected = avatarEmoji === emoji;
              return (
                <motion.button
                  key={emoji}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAvatarEmoji(emoji)}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--color-blue-light)' : 'var(--color-surface)',
                    border: isSelected ? '2px solid var(--color-blue-mid)' : '2px solid var(--color-divider)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {emoji}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
        disabled={!fullName.trim() || !username.trim() || !academicLevel}
        style={{
          width: '100%',
          height: '56px',
          borderRadius: '9999px',
          backgroundColor: (fullName.trim() && username.trim() && academicLevel) ? 'var(--color-blue-mid)' : 'var(--color-divider)',
          color: '#FFFFFF',
          fontSize: '1rem',
          fontWeight: 600,
          border: 'none',
          cursor: (fullName.trim() && username.trim() && academicLevel) ? 'pointer' : 'not-allowed',
          boxShadow: (fullName.trim() && username.trim() && academicLevel) ? 'var(--shadow-button)' : 'none',
          marginTop: '32px',
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}
