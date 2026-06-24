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
    <div className="relative bg-gradient-primary rounded-xl md:rounded-[14px] p-4 md:p-8 text-white shadow-[0_4px_24px_rgba(46,125,50,0.08)] overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />

      <button
        onClick={() => setWelcomeSeen(true)}
        className="absolute top-3 right-3 md:top-4 md:right-4 text-white/60 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>

      <div className="relative z-10 max-w-2xl">
        <h2 className="font-display text-lg md:text-3xl mb-2 md:mb-3">
          Welcome, {activeMember.name.split(' ')[0]}.
        </h2>
        <p className="text-white/90 text-xs md:text-lg mb-4 md:mb-6 leading-relaxed">
          Your health records, goals, and reading — all in one place.
          {isPro && (
            <span className="block mt-1 md:mt-2 font-medium">
              Family Vault enabled — add a family member anytime.
            </span>
          )}
        </p>

        <Button variant="accent" onClick={() => setWelcomeSeen(true)} className="gap-2 text-xs md:text-sm">
          Add your first record <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
