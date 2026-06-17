'use client';

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { BookOpen, Bookmark } from 'lucide-react';
import Link from 'next/link';

const GoalLinkedArticles: React.FC = () => {
  const { goals, savedArticles } = useVault();
  const activeCategories = Array.from(new Set(goals.filter(g => g.status === 'active').map(g => g.category)));
  
  // Find saved articles that match active goal categories
  const relevantArticles = savedArticles.filter(article => 
    article.matchedGoalCategory && activeCategories.includes(article.matchedGoalCategory)
  );

  if (relevantArticles.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="w-5 h-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900">Articles for Your Goals</h3>
      </div>
      
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
        {relevantArticles.map(article => (
          <Link key={article.id} href="/library" className="min-w-[280px] w-[280px] bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 bg-gray-100">
              {article.image ? (
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-alt text-primary/20">
                  <BookOpen className="w-8 h-8" />
                </div>
              )}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
                <Bookmark className="w-3 h-3 text-primary fill-primary" />
              </div>
            </div>
            
            <span className="text-[10px] font-bold tracking-wider text-primary uppercase mb-2">
              {article.matchedGoalCategory?.replace('_', ' ')} Focus
            </span>
            <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-gray-500 mt-auto">{article.readTime} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GoalLinkedArticles;
