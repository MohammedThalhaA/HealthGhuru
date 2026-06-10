"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SavedArticleCard from '@/components/dashboard/MyLearning/SavedArticleCard';
import { MOCK_ARTICLES } from '@/lib/mockData';
import { ArticleCategory } from '@/lib/types';
import { Filter } from 'lucide-react';

export default function MyLearningPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');
  const [activeStatus, setActiveStatus] = useState<'All' | 'Saved' | 'Read' | 'Unread'>('All');

  // Filter logic
  const filteredArticles = MOCK_ARTICLES.filter(article => {
    if (activeCategory !== 'All' && article.category !== activeCategory) return false;
    
    if (activeStatus === 'Saved' && !article.saved) return false;
    if (activeStatus === 'Read' && article.readProgress !== 100) return false;
    if (activeStatus === 'Unread' && article.readProgress === 100) return false;
    
    return true;
  });

  const inProgressArticles = MOCK_ARTICLES.filter(a => a.readProgress > 0 && a.readProgress < 100);
  const savedArticles = filteredArticles.filter(a => a.saved);
  const recommendedArticles = MOCK_ARTICLES.filter(a => !a.saved).slice(0, 3);

  const categories = ['All', 'Nutrition', 'Fitness', 'Sleep', 'Mental Health'];
  const statuses = ['All', 'Saved', 'Read', 'Unread'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col lg:flex-row gap-6 h-full"
    >
      {/* Sidebar Filters (Desktop) */}
      <div className="hidden lg:block w-60 shrink-0 border-r border-border pr-6 h-full sticky top-0 overflow-y-auto hide-scrollbar">
        <div className="mb-8">
          <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
            <Filter size={16} /> Category
          </h3>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-alt'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-dark uppercase tracking-wider mb-4 flex items-center gap-2">
            <Filter size={16} /> Status
          </h3>
          <div className="flex flex-col gap-2">
            {statuses.map(stat => (
              <button 
                key={stat}
                onClick={() => setActiveStatus(stat as any)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeStatus === stat ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:bg-surface-alt'}`}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        
        {/* Mobile Filters */}
        <div className="lg:hidden mb-6 flex flex-col gap-3">
          <select 
            value={activeCategory} 
            onChange={e => setActiveCategory(e.target.value as any)}
            className="w-full bg-white border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat} Categories</option>)}
          </select>
          <select 
            value={activeStatus} 
            onChange={e => setActiveStatus(e.target.value as any)}
            className="w-full bg-white border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statuses.map(stat => <option key={stat} value={stat}>{stat} Status</option>)}
          </select>
        </div>

        {/* Section 1: In Progress */}
        {inProgressArticles.length > 0 && activeStatus === 'All' && activeCategory === 'All' && (
          <div className="mb-10">
            <h2 className="font-heading font-bold text-xl text-dark mb-4">Continue Reading</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x">
              {inProgressArticles.map((article) => (
                <div key={article.id} className="min-w-[300px] w-[300px] sm:min-w-[340px] snap-start">
                  <SavedArticleCard article={article} showProgress />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Saved Articles */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-xl text-dark">
              {activeStatus === 'Saved' ? 'My Saved Articles' : 'Articles Library'} ({filteredArticles.length})
            </h2>
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="bg-surface-alt border border-border rounded-xl p-8 text-center">
              <p className="text-text-muted">No articles found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <SavedArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Recommended */}
        {activeStatus === 'All' && activeCategory === 'All' && (
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded w-max mb-1 uppercase block">
                Because you're working on: Better Sleep
              </span>
              <h2 className="font-heading font-bold text-xl text-dark">Recommended For You</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendedArticles.map((article) => (
                <SavedArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
