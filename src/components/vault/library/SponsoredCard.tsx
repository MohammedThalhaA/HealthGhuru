"use client";

import React from 'react';
import { PillBadge } from '@/components/ui/PillBadge';

export function SponsoredCard() {
  return (
    <div className="bg-surface-alt border border-border hover:border-primary/30 rounded-[14px] shadow-sm hover:-translate-y-1 transition-all group overflow-hidden flex flex-col h-full relative">
      <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-text-muted bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm z-10 border border-border">
        Sponsored
      </div>

      <div className="relative h-48 w-full bg-white overflow-hidden shrink-0 flex items-center justify-center p-8">
        <div className="w-full h-full border-2 border-dashed border-border-strong rounded-lg flex items-center justify-center text-text-muted">
          Sponsor Logo
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <PillBadge className="bg-white border-border text-xs px-2.5 py-1">
            Partner
          </PillBadge>
        </div>

        <h3 className="font-heading font-bold text-dark text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
          <a href="#" className="before:absolute before:inset-0 z-0">
            Special Offer from Our Health Partner
          </a>
        </h3>
        
        <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
          Discover new ways to enhance your wellness journey with our exclusive partner discounts and programs.
        </p>

        <span className="text-sm font-bold text-secondary">Learn more &rarr;</span>
      </div>
    </div>
  );
}
