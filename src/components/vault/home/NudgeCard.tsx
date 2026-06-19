<<<<<<< HEAD
"use client";

import React from 'react';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { PillBadge } from '@/components/ui/PillBadge';

export function NudgeCard() {
  const { goals, activeMemberId, articles } = useVault();
  
  // Logic to find a relevant article based on active goals
  const memberGoals = goals.filter(g => g.memberId === activeMemberId && g.status === 'active');
  const activeCategory = memberGoals.length > 0 ? memberGoals[0].category : 'Fitness';
  
  const suggestedArticle = articles.find(a => 
    a.matchedGoalCategory === activeCategory || 
    a.category.toLowerCase().includes(activeCategory)
  ) || articles[0];

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_4px_24px_rgba(46,125,50,0.08)] h-full border-t-4 border-secondary flex flex-col">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-secondary shrink-0">
          <Lightbulb size={20} />
        </div>
        <div>
          <h3 className="font-heading font-bold text-base text-dark leading-tight mb-1">Based on your goals</h3>
          <p className="text-sm text-text-muted leading-tight">We found something helpful for you.</p>
        </div>
      </div>
      
      <div className="mt-auto">
        <PillBadge active className="mb-3 text-[10px] px-2 py-0.5">{suggestedArticle.category}</PillBadge>
        <h4 className="font-heading font-bold text-dark text-base mb-2 leading-tight">
          {suggestedArticle.title}
        </h4>
        <Link href={`/library`} data-cursor="text" className="text-sm text-secondary hover:underline font-medium inline-flex items-center gap-1">
          Read article &rarr;
        </Link>
      </div>
    </div>
  );
}
=======
'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const NudgeCard: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-surface-alt to-surface-alt border border-accent/20 rounded-3xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 text-accent mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">Health Nudge</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          It's been a while since your last blood test — most doctors recommend checking annually.
        </p>
      </div>
      <Link href="/library" className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-light mt-4 group">
        Browse what to test <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default NudgeCard;
>>>>>>> 118ed6f1b8720d66589e08b98928f73d312b204f
