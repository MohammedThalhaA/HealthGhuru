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
        </button>
      ))}
    </div>
  );
};

export default LibraryFilterBar;
