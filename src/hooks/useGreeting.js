import { useMemo } from 'react';

export function useGreeting(firstName = '') {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return `Good morning ☀️${firstName ? `, ${firstName}` : ''}`;
    } else if (hour >= 12 && hour < 17) {
      return `Good afternoon 🌤️${firstName ? `, ${firstName}` : ''}`;
    } else if (hour >= 17 && hour < 21) {
      return `Good evening 🌙${firstName ? `, ${firstName}` : ''}`;
    } else {
      return `Still up? 🌃${firstName ? `, ${firstName}` : ''}`;
    }
  }, [firstName]);

  return greeting;
}
