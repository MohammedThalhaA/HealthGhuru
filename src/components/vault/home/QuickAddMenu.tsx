'use client';

import React, { useState } from 'react';
import { Plus, FileText, Target, Users } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import Link from 'next/link';

const QuickAddMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userPlan } = useVault();

  return (
    <div className="relative w-full h-full min-h-[160px] bg-primary rounded-3xl flex flex-col items-center justify-center p-6 text-white shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-center">Quick Add</h3>
      
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-white text-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-sm"
        >
          <Plus className="w-6 h-6" />
        </button>
      ) : (
        <div className="flex space-x-3">
          <Link href="/records" className="flex flex-col items-center group">
            <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors mb-1">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Record</span>
          </Link>
          <Link href="/goals" className="flex flex-col items-center group">
            <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors mb-1">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Goal</span>
          </Link>
          <Link href="/profile?tab=family" className={`flex flex-col items-center group ${userPlan.tier === 'free' ? 'opacity-50' : ''}`}>
            <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors mb-1 relative">
              <Users className="w-5 h-5" />
              {userPlan.tier === 'free' && <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>}
            </div>
            <span className="text-xs font-medium">Family</span>
          </Link>
        </div>
      )}
      
      {isOpen && (
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default QuickAddMenu;
