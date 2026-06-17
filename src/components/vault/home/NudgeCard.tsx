'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const NudgeCard: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-surface-alt to-surface-alt border border-accent/20 rounded-3xl p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 text-accent mb-3">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">Health Nudge</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          It's been a while since your last blood test — most doctors recommend checking annually.
        </p>
      </div>
      <Link href="/library" className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent-light mt-4 group">
        Browse what to test <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default NudgeCard;
