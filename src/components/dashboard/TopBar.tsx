"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, User, Settings, LogOut } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { AnimatePresence, motion } from 'framer-motion';

interface TopBarProps {
  toggleMobileSidebar: () => void;
}

export default function TopBar({ toggleMobileSidebar }: TopBarProps) {
  const pathname = usePathname();
  const { user, today } = useDashboard();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Derive page title from pathname
  let pageTitle = 'Dashboard';
  if (pathname.includes('/my-learning')) pageTitle = 'My Learning';
  else if (pathname.includes('/nutrition')) pageTitle = 'Nutrition Tracker';
  else if (pathname.includes('/fitness')) pageTitle = 'Fitness Tracker';
  else if (pathname.includes('/sleep')) pageTitle = 'Sleep Tracker';
  else if (pathname.includes('/mood')) pageTitle = 'Mood & Journal';
  else if (pathname.includes('/profile')) pageTitle = 'Profile & Settings';

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header className="h-16 shrink-0 bg-white border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      
      {/* Left Area - Mobile Menu & Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 -ml-2 text-text-secondary hover:text-primary transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="font-display text-xl md:text-2xl text-dark hidden sm:block">{pageTitle}</h1>
      </div>

      {/* Center Area - Search */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search articles, tips..." 
            className="w-full bg-surface-alt border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>

      {/* Right Area - Actions & Profile */}
      <div className="flex items-center gap-2 md:gap-4 ml-auto lg:ml-0">
        
        {/* Streak Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-sm font-medium shadow-sm">
          🔥 <span>{today.streak} day streak</span>
        </div>
        
        <div className="flex sm:hidden items-center gap-1 px-2 py-1 bg-accent/10 rounded-full text-accent font-mono text-xs font-bold">
          🔥 {today.streak}
        </div>

        {/* Notifications */}
        <button className="p-2 text-text-secondary hover:text-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border border-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative ml-2">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-inner hover:ring-2 hover:ring-primary/30 transition-all outline-none"
          >
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </button>

          <AnimatePresence>
            {profileDropdownOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileDropdownOpen(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-card border border-border py-2 z-40"
                >
                  <div className="px-4 py-2 border-b border-border/50 mb-2">
                    <p className="text-sm font-bold text-dark truncate">{user.name}</p>
                    <p className="text-xs text-text-muted truncate">{user.email}</p>
                  </div>
                  
                  <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary transition-colors">
                    <User size={16} /> Profile
                  </a>
                  <a href="/profile?tab=preferences" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary transition-colors">
                    <Settings size={16} /> Settings
                  </a>
                  
                  <div className="border-t border-border/50 mt-2 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}
