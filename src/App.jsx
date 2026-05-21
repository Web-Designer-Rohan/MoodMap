import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMoodStore } from './store/moodStore';
import AppLayout from './components/layout/AppLayout';
import SplashScreen from './pages/SplashScreen';
import SignupStep1 from './pages/auth/SignupStep1';
import SignupStep2 from './pages/auth/SignupStep2';
import SignupStep3 from './pages/auth/SignupStep3';
import OnboardingSlides from './pages/onboarding/OnboardingSlides';
import LoginScreen from './pages/auth/LoginScreen';
import ForgotPassword from './pages/auth/ForgotPassword';
import HomeScreen from './pages/app/HomeScreen';
import HistoryScreen from './pages/app/HistoryScreen';
import HealScreen from './pages/app/HealScreen';
import CalendarScreen from './pages/app/CalendarScreen';
import ProfileScreen from './pages/app/ProfileScreen';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useMoodStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/signup/step1" element={<SignupStep1 />} />
      <Route path="/signup/step2" element={<SignupStep2 />} />
      <Route path="/signup/step3" element={<SignupStep3 />} />
      <Route path="/onboarding" element={<OnboardingSlides />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryScreen /></ProtectedRoute>} />
        <Route path="/heal" element={<ProtectedRoute><HealScreen /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarScreen /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  React.useEffect(() => {
    useMoodStore.getState().init();
  }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
