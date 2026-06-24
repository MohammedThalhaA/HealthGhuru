"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Plus, FileText, Target, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useVault } from '@/lib/context/VaultContext';

export function QuickAddMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { userPlan } = useVault();
  const isFree = userPlan.tier === 'free';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl md:rounded-[14px] p-4 md:p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] h-full flex flex-col items-center justify-center relative" ref={menuRef}>
      <h3 className="font-heading font-bold text-base md:text-lg text-dark mb-3 md:mb-4 text-center">Quick Add</h3>
      
      <div className="relative">
        <Button 
          variant="primary" 
          className="w-14 h-14 p-0 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus size={24} className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
        </Button>

        {isOpen && (
          <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 bg-white rounded-[14px] shadow-xl border border-border overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col py-2">
              <button 
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-alt transition-colors text-left"
                onClick={() => { window.location.href = '/records'; setIsOpen(false); }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText size={16} />
                </div>
                <span className="text-sm font-medium text-text-primary">Add Record</span>
              </button>
              
              <button 
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-alt transition-colors text-left"
                onClick={() => { window.location.href = '/goals'; setIsOpen(false); }}
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Target size={16} />
                </div>
                <span className="text-sm font-medium text-text-primary">Add Goal</span>
              </button>
              
              <button 
                className={`flex items-center gap-3 px-4 py-3 transition-colors text-left ${isFree ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : 'hover:bg-surface-alt'}`}
                onClick={() => { if (!isFree) { window.location.href = '/profile'; setIsOpen(false); } }}
                disabled={isFree}
              >
                <div className="w-8 h-8 rounded-full bg-text-muted/10 text-text-muted flex items-center justify-center shrink-0">
                  {isFree ? <Lock size={16} /> : <Users size={16} />}
                </div>
                <span className="text-sm font-medium text-text-primary">Add Family Member</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
