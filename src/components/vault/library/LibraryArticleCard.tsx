"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Clock } from 'lucide-react';
import { LibraryArticle } from '@/lib/types';
import { PillBadge } from '@/components/ui/PillBadge';
import { IconAction } from '@/components/ui/IconAction';
import { useVault } from '@/lib/context/VaultContext';

interface LibraryArticleCardProps {
  article: LibraryArticle;
  compact?: boolean;
}

export function LibraryArticleCard({ article, compact = false }: LibraryArticleCardProps) {
  const { toggleSavedArticle } = useVault();

  return (
    <div className={`bg-white border border-border hover:border-primary/30 rounded-[14px] shadow-[0_4px_24px_rgba(46,125,50,0.08)] hover:-translate-y-1 transition-all group overflow-hidden flex flex-col h-full`}>
      {!compact && (
        <div className="relative h-48 w-full bg-surface-alt overflow-hidden shrink-0">
          {article.heroImage ? (
            <Image 
              src={article.heroImage} 
              alt={article.title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 mix-blend-multiply"></div>
              <div className="absolute inset-0 flex items-center justify-center text-text-muted/30 font-display text-4xl">
                {article.category}
              </div>
            </>
          )}
          <button 
            onClick={(e) => { e.preventDefault(); toggleSavedArticle(article.id); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <IconAction context="action">
              <Bookmark size={16} className={article.saved ? "fill-primary text-primary" : "text-text-secondary"} />
            </IconAction>
          </button>
        </div>
      )}

      <div className={`p-5 flex flex-col flex-1 relative ${compact ? 'pt-4' : ''}`}>
        {compact && (
          <button 
            onClick={(e) => { e.preventDefault(); toggleSavedArticle(article.id); }}
            className="absolute top-4 right-4 text-text-muted hover:text-primary transition-colors z-10"
          >
            <IconAction context="action">
              <Bookmark size={16} className={article.saved ? "fill-primary text-primary" : ""} />
            </IconAction>
          </button>
        )}

        <div className="flex items-center gap-3 mb-3">
          <PillBadge className={`border-border ${compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
            {article.category}
          </PillBadge>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <IconAction context="decorative"><Clock size={12} /></IconAction> {article.readTime} min
          </span>
        </div>

        <h3 className={`font-heading font-bold text-dark leading-tight mb-2 group-hover:text-primary transition-colors ${compact ? 'text-base line-clamp-2' : 'text-xl'}`}>
          <Link href={`/library/${article.id}`} className="before:absolute before:inset-0 z-0">
            {article.title}
          </Link>
        </h3>
        
        {!compact && (
          <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
            {article.excerpt}
          </p>
        )}
      </div>
    </div>
  );
}
