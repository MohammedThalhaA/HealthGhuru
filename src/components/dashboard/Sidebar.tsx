"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Apple, Dumbbell, 
  Moon, Heart, User as UserIcon, LogOut, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard',    href: '/dashboard',    icon: LayoutDashboard },
  { label: 'My Learning',  href: '/my-learning',  icon: BookOpen },
  { label: 'Nutrition',    href: '/nutrition',    icon: Apple },
  { label: 'Fitness',      href: '/fitness',      icon: Dumbbell },
  { label: 'Sleep',        href: '/sleep',        icon: Moon },
  { label: 'Mood Journal', href: '/mood',         icon: Heart },
  { label: 'Profile',      href: '/profile',      icon: UserIcon },
];

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ collapsed, toggleSidebar, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useDashboard();
  
  // Custom tracking for bottom nav "Trackers" sheet
  const [trackersOpen, setTrackersOpen] = useState(false);

  const desktopWidth = collapsed ? 72 : 260;

  const handleLogout = () => {
    // In a real app, clear auth. Here we just redirect.
    window.location.href = '/login';
  };

  const NavContent = () => (
    <div className="flex flex-col h-full bg-dark text-white">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-4 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src="/images/logo_transparent.png" alt="HealthGhuru Logo" fill className="object-contain" />
            </div>
          </div>
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-display text-xl text-white whitespace-nowrap"
            >
              HealthGhuru
            </motion.span>
          )}
        </div>
        {/* Mobile Close Button */}
        <button 
          className="md:hidden ml-auto p-2 text-white/60 hover:text-white"
          onClick={() => setMobileOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2 hide-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="relative group outline-none"
            >
              <div className={cn(
                "flex items-center px-3 py-3 rounded-[10px] transition-colors duration-200",
                isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}>
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={22} className="shrink-0" />
                
                {!collapsed && (
                  <span className="ml-3 font-medium whitespace-nowrap">{item.label}</span>
                )}
              </div>
              
              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white text-dark text-sm font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-lg">
                  {item.label}
                  {/* Arrow pointing left */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-full border-[6px] border-transparent border-r-white" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom User Area */}
      <div className="mt-auto border-t border-white/10 p-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          
          {!collapsed && (
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-white truncate">{user.name}</span>
                <span className="text-[10px] font-bold text-dark bg-accent px-2 py-0.5 rounded-full w-max uppercase tracking-wider">
                  {user.plan}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
        
        {/* Desktop Collapse Toggle */}
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex mt-4 w-full items-center justify-center py-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /><span className="text-sm font-medium">Collapse</span></div>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <motion.aside 
        initial={false}
        animate={{ width: desktopWidth }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="hidden md:block shrink-0 bg-dark z-30 h-screen sticky top-0 border-r border-dark/20"
      >
        <NavContent />
      </motion.aside>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-dark z-50 md:hidden shadow-2xl"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border z-40 px-2 flex items-center justify-around shadow-[0_-4px_24px_rgba(46,125,50,0.05)] pb-safe">
        {[
          { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
          { label: 'Learn', href: '/my-learning', icon: BookOpen },
        ].map(item => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center justify-center w-16 h-full text-text-muted hover:text-primary transition-colors">
              <item.icon size={20} className={isActive ? "text-primary" : ""} />
              <span className={cn("text-[10px] mt-1 font-medium", isActive ? "text-primary font-bold" : "")}>{item.label}</span>
            </Link>
          );
        })}

        {/* Center Trackers FAB */}
        <div className="relative -top-5">
          <button 
            onClick={() => setTrackersOpen(!trackersOpen)}
            className="w-14 h-14 bg-primary rounded-full shadow-card flex items-center justify-center text-white hover:bg-primary-dark transition-colors border-4 border-surface"
          >
            <div className="flex flex-col gap-0.5 items-center">
              <div className="flex gap-0.5">
                <Apple size={14} />
                <Dumbbell size={14} />
              </div>
              <Moon size={14} />
            </div>
          </button>
          
          {/* Tracker Menu Popup */}
          <AnimatePresence>
            {trackersOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setTrackersOpen(false)}
                  className="fixed inset-0 z-40 bg-dark/20"
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-border p-2 flex flex-col gap-1 z-50 w-40"
                >
                  <Link href="/nutrition" onClick={() => setTrackersOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm font-medium text-text-primary"><Apple size={16} className="text-primary"/> Nutrition</Link>
                  <Link href="/fitness" onClick={() => setTrackersOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm font-medium text-text-primary"><Dumbbell size={16} className="text-accent"/> Fitness</Link>
                  <Link href="/sleep" onClick={() => setTrackersOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm font-medium text-text-primary"><Moon size={16} className="text-indigo-500"/> Sleep</Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {[
          { label: 'Mood', href: '/mood', icon: Heart },
          { label: 'Profile', href: '/profile', icon: UserIcon },
        ].map(item => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center justify-center w-16 h-full text-text-muted hover:text-primary transition-colors">
              <item.icon size={20} className={isActive ? "text-primary" : ""} />
              <span className={cn("text-[10px] mt-1 font-medium", isActive ? "text-primary font-bold" : "")}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
