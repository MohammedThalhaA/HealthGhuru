"use client";

import React from 'react';
import { Search, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { FamilyMemberSwitcher } from './FamilyMemberSwitcher';
import { PlanStatusStrip } from './PlanStatusStrip';
import { useVault } from '@/lib/context/VaultContext';

const ROUTE_TITLES: Record<string, string> = {
  '/dashboard': 'Vault Home',
  '/records': 'My Records',
  '/goals': 'Health Goals',
  '/library': 'Health Library',
  '/profile': 'Profile Settings',
};

export function TopBar() {
  const pathname = usePathname();
  const { familyMembers, activeMemberId } = useVault();
  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];
  
  // Find the closest matching route title
  const currentTitle = Object.keys(ROUTE_TITLES).find(route => pathname.startsWith(route)) 
    ? ROUTE_TITLES[Object.keys(ROUTE_TITLES).find(route => pathname.startsWith(route)) as string]
    : 'Vault';

  return (
    <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <h1 className="font-heading font-bold text-2xl text-dark">
          {currentTitle}
        </h1>
        <div className="h-8 w-px bg-border hidden md:block"></div>
        <FamilyMemberSwitcher />
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="pl-10 pr-4 py-2 bg-surface-alt border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary w-64 transition-all"
          />
        </div>

        <PlanStatusStrip />

        {/* Notifications */}
        <button className="w-10 h-10 rounded-full hover:bg-surface-alt flex items-center justify-center text-text-secondary relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent"></span>
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold cursor-pointer">
          {activeMember?.avatarInitials || 'ME'}
        </div>
      </div>
    </header>
  );
}
