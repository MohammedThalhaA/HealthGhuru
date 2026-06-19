"use client";

import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';

export function MilestoneUpgradeCard() {
  const { setMilestoneSeen } = useVault();

  const handleDismiss = () => {
    setMilestoneSeen(true);
  };

  const handleUpgrade = () => {
    window.location.href = '/profile';
  };

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] h-full relative overflow-hidden border-2 border-[#F9A825] group">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-32 h-32 bg-[#F9A825] opacity-10 rounded-full blur-2xl pointer-events-none group-hover:opacity-20 transition-opacity" />
      
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-text-muted hover:text-dark transition-colors"
        title="Dismiss"
      >
        <X size={16} />
      </button>

      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#FFF8E1] text-[#F9A825] flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <h3 className="font-heading font-bold text-base text-dark">One week milestone</h3>
        </div>
        
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          You've been building your Vault for a week — Free plan users like you often add a family member next.
        </p>
        
        <div className="mt-auto">
          <button 
            onClick={handleUpgrade}
            className="text-sm font-bold text-[#F9A825] hover:text-[#FFB300] transition-colors flex items-center gap-1"
          >
            See Pro plans &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
