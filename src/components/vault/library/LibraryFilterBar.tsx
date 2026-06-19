<<<<<<< HEAD
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LibraryFilterBarProps {
  activeFilter: string;
  onChange: (filter: string) => void;
}

const FILTERS = ['For You', 'Saved', 'Nutrition', 'Fitness', 'Sleep', 'Mental Health'];

export function LibraryFilterBar({ activeFilter, onChange }: LibraryFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
      {FILTERS.map(filter => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          data-cursor="tab"
          className={cn(
            "px-5 py-2 rounded-full text-sm font-heading font-semibold transition-colors border",
            activeFilter === filter
              ? "bg-[#F9A825] text-dark border-[#F9A825] shadow-sm"
              : "bg-white text-text-secondary border-border hover:border-primary/40 hover:bg-surface-alt"
          )}
        >
          {filter}
=======
import React from 'react';
import { ArticleCategory } from '@/lib/types';

interface LibraryFilterBarProps {
  categories: ArticleCategory[];
  selectedCategory: string;
  onChange: (cat: string) => void;
}

const LibraryFilterBar: React.FC<LibraryFilterBarProps> = ({ categories, selectedCategory, onChange }) => {
  const options = ['All', ...categories];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-4 pt-2 px-1 -mx-1 scrollbar-hide">
      {options.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            selectedCategory === cat 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {cat}
>>>>>>> 118ed6f1b8720d66589e08b98928f73d312b204f
        </button>
      ))}
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default LibraryFilterBar;
>>>>>>> 118ed6f1b8720d66589e08b98928f73d312b204f
