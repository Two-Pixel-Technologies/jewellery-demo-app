import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useApp } from '../App';

export default function AppLayout({ children }) {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Topbar />
        <div className="fade-in">
          {children}
        </div>
      </div>
    </div>
  );
}
