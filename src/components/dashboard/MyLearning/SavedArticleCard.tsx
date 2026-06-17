"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Bookmark, Clock, CalendarDays, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/types';
import ProgressBar from '@/components/ui/ProgressBar';

interface SavedArticleCardProps {
  article: Article;
  onToggleSave?: (id: string) => void;
  showProgress?: boolean;
}

export default function SavedArticleCard({ article, onToggleSave, showProgress = false }: SavedArticleCardProps) {
  const [saved, setSaved] = useState(article.saved);

  const categoryFallbackImage: Record<Article['category'], string> = {
    Nutrition: '/images/nutrition_pillar.png',
    Fitness: '/images/fitness_pillar.png',
    Sleep: '/images/sleep_pillar.png',
    'Mental Health': '/images/mental_health_pillar.png',
  };

  const articleImage = article.image || categoryFallbackImage[article.category];

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved(!saved);
    if (onToggleSave) onToggleSave(article.id);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.date));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-card transition-all flex flex-col h-full group">
      {/* Image Area */}
      <div className="relative w-full pt-[56.25%] bg-surface-alt overflow-hidden">
        <Image 
          src={articleImage}
          alt={article.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
        
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
          {article.category.toUpperCase()}
        </div>
        
        <button 
          onClick={handleSaveToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-text-secondary hover:text-primary transition-colors"
        >
          <Bookmark size={18} className={saved ? "fill-primary text-primary" : ""} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-dark leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-sm text-text-muted line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>

        {showProgress && article.readProgress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-text-muted font-medium mb-1.5">
              <span>Progress</span>
              <span>{article.readProgress}%</span>
            </div>
            <ProgressBar progress={article.readProgress} height="h-1.5" />
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
            <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime} min</span>
          </div>
          
          <button className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
            {showProgress && article.readProgress > 0 ? 'Continue' : 'Read'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
