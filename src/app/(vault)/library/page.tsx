'use client';

import React, { useState } from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { MOCK_ARTICLES } from '@/lib/mockData';
import { ArticleCategory } from '@/lib/types';
import LibraryArticleCard from '@/components/vault/library/LibraryArticleCard';
import LibraryFilterBar from '@/components/vault/library/LibraryFilterBar';
import AdSlot from '@/components/ui/AdSlot';
import Link from 'next/link';

export default function LibraryPage() {
  const { userPlan, toggleSavedArticle, savedArticles } = useVault();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Combine all articles and mark saved state based on Context
  const allArticles = MOCK_ARTICLES.map(article => ({
    ...article,
    saved: savedArticles.some(sa => sa.id === article.id)
  }));

  const filteredArticles = selectedCategory === 'All' 
    ? allArticles 
    : allArticles.filter(a => a.category === selectedCategory);

  const categories: ArticleCategory[] = ['Nutrition', 'Fitness', 'Sleep', 'Mental Health'];

  const showAds = userPlan.tier === 'free';

  // Inject ads every 3 articles
  const renderFeed = () => {
    const feed = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      feed.push(
        <div key={`article-${filteredArticles[i].id}`}>
          <LibraryArticleCard 
            article={filteredArticles[i]} 
            onToggleSave={toggleSavedArticle} 
          />
        </div>
      );
      
      // Inject ad every 3 articles if showAds is true
      if (showAds && (i + 1) % 3 === 0 && i !== filteredArticles.length - 1) {
        feed.push(
          <div key={`ad-${i}`} className="h-full flex items-center justify-center">
            <AdSlot className="w-full h-full min-h-[300px]" />
          </div>
        );
      }
    }
    return feed;
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">My Health Library</h2>
          <p className="text-gray-500 mt-2">Personalized articles and resources.</p>
        </div>
      </div>

      {showAds && (
        <div className="mb-8 w-full bg-surface-alt border border-surface rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between shadow-sm">
          <p className="text-sm text-primary-dark font-medium mb-3 sm:mb-0">
            Enjoying the library? Upgrade to Pro for an ad-free reading experience.
          </p>
          <Link href="/profile?tab=subscription" className="whitespace-nowrap px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors">
            Upgrade to Pro
          </Link>
        </div>
      )}

      <LibraryFilterBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onChange={setSelectedCategory} 
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderFeed()}
      </div>
    </div>
  );
}
