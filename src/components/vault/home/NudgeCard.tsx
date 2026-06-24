"use client";

import React from 'react';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { PillBadge } from '@/components/ui/PillBadge';
import { IconAction } from '@/components/ui/IconAction';

export function NudgeCard() {
  const { goals, activeMemberId, articles } = useVault();
  
  // Logic to find a relevant article based on active goals
  const memberGoals = goals.filter(g => g.memberId === activeMemberId && g.status === 'active');
  const activeCategory = memberGoals.length > 0 ? memberGoals[0].category : 'Fitness';
  
  const suggestedArticle = articles.find(a => 
    a.matchedGoalCategory === activeCategory || 
    a.category?.toLowerCase().includes(activeCategory.toLowerCase())
  ) || articles[0];

  if (!suggestedArticle) return null;

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] h-full border-t-4 border-secondary flex flex-col overflow-hidden">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-secondary shrink-0">
          <IconAction context="decorative"><Lightbulb size={20} /></IconAction>
        </div>
        <div>
          <h3 className="font-heading font-bold text-base text-dark leading-tight mb-1">Based on your goals</h3>
          <p className="text-sm text-text-muted leading-tight">We found something helpful for you.</p>
        </div>
      </div>
      
      <div className="mt-auto">
        <PillBadge active className="mb-3 text-[10px] px-2 py-0.5">{suggestedArticle.category}</PillBadge>
        <h4 className="font-heading font-bold text-dark text-base mb-2 leading-tight line-clamp-2">
          {suggestedArticle.title}
        </h4>
        <Link href={`/library`} data-cursor="text" className="text-sm text-secondary hover:underline font-medium inline-flex items-center gap-1">
          Read article &rarr;
        </Link>
      </div>
    </div>
  );
}
