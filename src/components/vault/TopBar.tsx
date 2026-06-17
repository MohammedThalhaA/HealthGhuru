'use client';

import React from 'react';
import { Search, Bell } from 'lucide-react';
import FamilyMemberSwitcher from './FamilyMemberSwitcher';
import PlanStatusStrip from './PlanStatusStrip';

import { usePathname } from 'next/navigation';

const routeTitles: Record<string, string> = {
  '/vault': 'My Vault',
  '/records': 'Health Records',
  '/goals': 'Goals & Milestones',
  '/library': 'My Health Library',
  '/profile': 'Profile & Settings',
};

const TopBar: React.FC = () => {
  const pathname = usePathname();
  const title = routeTitles[pathname as string] || 'My Vault';

  return (
    <header className="flex items-center justify-between h-20 px-8 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h1>
        <FamilyMemberSwitcher />
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex relative w-64">
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="w-full h-10 pl-10 pr-4 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:border-primary-light focus:ring-2 focus:ring-primary/20 transition-all outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </div>
        
        <PlanStatusStrip />

        <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <button className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
          <img src="/images/avatar_placeholder.png" alt="User" className="w-full h-full object-cover opacity-50" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
