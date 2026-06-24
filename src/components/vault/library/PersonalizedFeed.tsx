"use client";

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { LibraryArticleCard } from '@/components/vault/library/LibraryArticleCard';
import { SponsoredCard } from '@/components/vault/library/SponsoredCard';
import { PillBadge } from '@/components/ui/PillBadge';
import { GoalCategory } from '@/lib/types';

interface PersonalizedFeedProps {
  filter: string;
}

export function PersonalizedFeed({ filter }: PersonalizedFeedProps) {
  const { articles, goals, activeMemberId, userPlan } = useVault();
  const isFree = userPlan.tier === 'free';
  
  const memberGoals = goals.filter(g => g.memberId === activeMemberId && g.status === 'active');
  const activeCategories = memberGoals.map(g => g.category);

  // Filter articles
  let filteredArticles = [...articles];
  
  if (filter === 'Saved') {
    filteredArticles = filteredArticles.filter(a => a.saved);
  } else if (filter !== 'For You') {
    filteredArticles = filteredArticles.filter(a => a.category === filter);
  } else {
    // 'For You' feed logic: prioritize matching goals
    const matched = filteredArticles.filter(a => 
      activeCategories.includes((a.matchedGoalCategory as GoalCategory) || 'other') ||
      activeCategories.some(cat => a.category.toLowerCase().includes(cat.split('_')[0]))
    );
    const others = filteredArticles.filter(a => !matched.includes(a));
    filteredArticles = [...matched, ...others];
  }

  // Determine if we should show sponsored cards (only in For You or category feeds, not Saved)
  const showAds = isFree && filter !== 'Saved';

  if (filteredArticles.length === 0) {
    return (
      <div className="py-12 text-center text-text-muted">
        No articles found for &quot;{filter}&quot;.
      </div>
    );
  }

  // Interleave sponsored cards for Free users
  const renderFeed = () => {
    const items = [];
    let articleIndex = 0;

    for (let i = 0; i < filteredArticles.length; i++) {
      // Every 5th item (index 4, 9, etc.) is a sponsored card if showAds is true
      if (showAds && i > 0 && i % 4 === 0) {
        items.push(<SponsoredCard key={`sponsor-${i}`} />);
      }
      
      const article = filteredArticles[articleIndex];
      if (article) {
        const isMatched = filter === 'For You' && (
          activeCategories.includes((article.matchedGoalCategory as GoalCategory) || 'other') ||
          activeCategories.some(cat => article.category.toLowerCase().includes(cat.split('_')[0]))
        );

        items.push(
          <div key={article.id} className="flex flex-col h-full">
            {isMatched && (
              <div className="mb-2">
                <PillBadge active className="text-[10px] px-2 py-0.5 shadow-sm">
                  Because you&apos;re tracking: {article.category}
                </PillBadge>
              </div>
            )}
            <div className="flex-1">
              <LibraryArticleCard article={article} />
            </div>
          </div>
        );
        articleIndex++;
      }
    }
    
    return items;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {renderFeed()}
    </div>
  );
}
