"use client";

import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useVault } from '@/lib/context/VaultContext';

export function WelcomeCard() {
  const { userPlan, activeMemberId, familyMembers, setWelcomeSeen } = useVault();
  const activeMember = familyMembers.find(m => m.id === activeMemberId) || familyMembers[0];
  const isPro = userPlan.tier === 'pro';

  return (
    <div className="relative bg-gradient-primary rounded-[14px] p-8 text-white shadow-[0_4px_24px_rgba(46,125,50,0.08)] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
      
      <button 
        onClick={() => setWelcomeSeen(true)}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="relative z-10 max-w-2xl">
        <h2 className="font-display text-3xl mb-3">
          Welcome to your Vault, {activeMember.name.split(' ')[0]}.
        </h2>
        <p className="text-white/90 text-lg mb-6 leading-relaxed">
          This is where your health records, goals, and reading live — all in one place.
          {isPro && (
            <span className="block mt-2 font-medium">
              You also have Family Vault — add a family member anytime.
            </span>
          )}
        </p>

        <Button variant="accent" onClick={() => setWelcomeSeen(true)} className="gap-2">
          Add your first record <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
