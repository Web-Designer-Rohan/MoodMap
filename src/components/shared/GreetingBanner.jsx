import React from 'react';

export function GreetingBanner({ firstName }) {
  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning ☀️';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon 🌤️';
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening 🌙';
  } else {
    greeting = 'Still up? 🌃';
  }

  return (
    <div>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
        {greeting}{firstName ? `, ${firstName}` : ''}
      </span>
    </div>
  );
}
