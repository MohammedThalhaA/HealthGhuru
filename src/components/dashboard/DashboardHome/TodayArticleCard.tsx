import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function TodayArticleCard() {
  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden flex flex-col md:flex-row h-full hover:shadow-md transition-shadow">
      <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-surface">
        {/* Placeholder image for mock */}
        <Image 
          src="/images/blog-1.jpg" // assuming some placeholder image exists or use external
          alt="Sleep Risks"
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#7C4DFF] text-xs font-bold px-2.5 py-1 rounded-md tracking-wide">
          SLEEP
        </div>
      </div>
      
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded w-max mb-3 uppercase">
          Based on your sleep goal
        </div>
        
        <h3 className="font-heading text-lg font-bold text-dark leading-tight mb-2">
          The Hidden Risks of Poor Sleep — What Your Body Is Trying to Tell You
        </h3>
        
        <p className="text-sm text-text-muted line-clamp-2 mb-4">
          Eight hours of bad sleep is worse than six hours of deep, restorative sleep. Here's what the science says about sleep quality versus quantity.
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium text-text-secondary">6 min read</span>
          <Link href="/my-learning" className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
            Read Article <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
