"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import { DashboardProvider } from '@/lib/context/DashboardContext';
import { AnimatePresence } from 'framer-motion';

import { ToastProvider } from '@/components/ui/Toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load collapsed state from local storage
  useEffect(() => {
    const isCollapsed = localStorage.getItem('hg_sidebar_collapsed');
    if (isCollapsed === 'true') {
      setCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('hg_sidebar_collapsed', String(newState));
  };

  return (
    <ToastProvider>
      <DashboardProvider>
        <div className="min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden font-body text-text-primary">
        {/* Desktop Sidebar */}
        <Sidebar 
          collapsed={collapsed} 
          toggleSidebar={toggleSidebar} 
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden pb-16 md:pb-0">
          <TopBar 
            toggleMobileSidebar={() => setMobileOpen(true)} 
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
      </DashboardProvider>
    </ToastProvider>
  );
}
