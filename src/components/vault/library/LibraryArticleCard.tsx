import React from 'react';
import { Article } from '@/lib/types';
import { Bookmark, Clock } from 'lucide-react';
import Link from 'next/link';

interface LibraryArticleCardProps {
  article: Article;
  onToggleSave: (id: string) => void;
}

const LibraryArticleCard: React.FC<LibraryArticleCardProps> = ({ article, onToggleSave }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {article.image ? (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
        )}
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleSave(article.id);
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${article.saved ? 'text-primary fill-primary' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-wider text-primary uppercase">
            {article.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {article.readTime} min
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {article.readProgress > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs font-medium text-gray-500 mb-1.5">
              <span>Read Progress</span>
              <span>{article.readProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-light rounded-full"
                style={{ width: `${article.readProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryArticleCard;
