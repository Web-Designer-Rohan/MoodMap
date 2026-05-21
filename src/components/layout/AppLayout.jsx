import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '96px' }}>
      <Outlet />
      <BottomNav />
    </div>
  );
}
