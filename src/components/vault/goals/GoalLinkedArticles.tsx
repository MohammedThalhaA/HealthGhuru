"use client";

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { LibraryArticleCard } from '@/components/vault/library/LibraryArticleCard';
import { BookOpen } from 'lucide-react';
import { GoalCategory } from '@/lib/types';

export function GoalLinkedArticles() {
  const { goals, articles, activeMemberId } = useVault();
  
  const memberGoals = goals.filter(g => g.memberId === activeMemberId && g.status === 'active');
  if (memberGoals.length === 0) return null;

  // Find articles matching any active goal category
  const goalCategories = memberGoals.map(g => g.category);
  const suggestedArticles = articles.filter(a => 
    goalCategories.includes((a.matchedGoalCategory as GoalCategory) || 'other') ||
    goalCategories.some(cat => a.category.toLowerCase().includes(cat.split('_')[0]))
  ).slice(0, 3); // Get top 3

  if (suggestedArticles.length === 0) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-dark leading-tight">Recommended Reading</h3>
            <p className="text-sm text-text-muted">Hand-picked for your active goals.</p>
          </div>
        </div>
        <div className="bg-surface-alt/50 border border-dashed border-border rounded-[14px] p-8 text-center flex flex-col items-center justify-center">
          <p className="text-text-muted font-medium mb-1">No reading matching your goals</p>
          <p className="text-sm text-text-muted opacity-80">Add more specific goals to see tailored recommendations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-surface-alt flex items-center justify-center text-primary">
          <BookOpen size={20} />
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl text-dark leading-tight">Recommended Reading</h3>
          <p className="text-sm text-text-muted">Hand-picked for your active goals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestedArticles.map(article => (
          <LibraryArticleCard key={article.id} article={article} compact />
        ))}
      </div>
    </div>
  );
}
