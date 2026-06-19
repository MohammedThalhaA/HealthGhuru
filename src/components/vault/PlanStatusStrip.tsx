"use client";

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { Button } from '@/components/ui/Button';
import { PillBadge } from '@/components/ui/PillBadge';

export function PlanStatusStrip() {
  const { userPlan } = useVault();
  const isFree = userPlan.tier === 'free';

  // Basic mock upgrade handler that could be expanded
  const handleUpgradeClick = () => {
    // In a real app, this might open a modal or navigate to /profile#subscription
    window.location.href = '/profile';
  };

  if (isFree) {
    return (
      <div className="flex items-center gap-4 bg-surface-alt rounded-full px-4 py-1.5 border border-border">
        <span className="text-sm font-medium text-text-primary">
          Free Plan <span className="text-text-muted mx-1">&middot;</span> {userPlan.recordsUsed}/{userPlan.recordsLimit} records
        </span>
        <Button variant="ghost" size="sm" className="h-7 px-3 py-0 text-xs shadow-none border-0" onClick={handleUpgradeClick}>
          Upgrade &rarr;
        </Button>
      </div>
    );
  }

  // Pro Plan
  return (
    <PillBadge className="bg-gradient-accent text-dark border-0 shadow-sm font-bold tracking-wide">
      PRO PLAN <span className="font-normal opacity-70 ml-1">&middot; Unlimited</span>
    </PillBadge>
  );
}
