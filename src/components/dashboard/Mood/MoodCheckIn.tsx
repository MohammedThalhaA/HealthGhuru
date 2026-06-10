"use client";

import React, { useState } from 'react';
import { Smile, Frown, Meh, Heart } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';
import { motion } from 'framer-motion';

export default function MoodCheckIn() {
  const { today, updateToday } = useDashboard();
  const { addToast } = useToast();
  
  const [selectedScore, setSelectedScore] = useState<number | null>(today.moodScore);

  const moods = [
    { score: 1, label: 'Awful', icon: Frown, color: 'text-status-danger', bgHover: 'hover:bg-status-danger/10' },
    { score: 2, label: 'Bad', icon: Frown, color: 'text-status-warning', bgHover: 'hover:bg-status-warning/10' },
    { score: 3, label: 'Okay', icon: Meh, color: 'text-[#F9A825]', bgHover: 'hover:bg-[#F9A825]/10' },
    { score: 4, label: 'Good', icon: Smile, color: 'text-[#4CAF50]', bgHover: 'hover:bg-[#4CAF50]/10' },
    { score: 5, label: 'Awesome', icon: Smile, color: 'text-primary', bgHover: 'hover:bg-primary/10' },
  ];

  const handleMoodSelect = (score: number) => {
    setSelectedScore(score);
    updateToday({ moodScore: score });
    addToast('Mood logged successfully! ❤️', 'success');
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-6 md:p-8 flex flex-col h-full justify-center">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <Heart size={24} className="text-[#FF6B6B]" />
        <h2 className="font-heading font-bold text-xl text-dark text-center">How are you feeling today?</h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
        {moods.map((mood) => {
          const isSelected = selectedScore === mood.score;
          return (
            <motion.button
              key={mood.score}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.score)}
              className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-[14px] border-2 transition-all min-w-[70px] sm:min-w-[80px] ${
                isSelected 
                  ? `border-current bg-surface shadow-md ${mood.color}` 
                  : `border-transparent bg-surface-alt text-text-muted ${mood.bgHover} hover:border-border`
              }`}
            >
              <mood.icon size={32} className={isSelected ? '' : 'opacity-70'} />
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-current' : 'text-text-muted'}`}>
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 text-center text-sm font-medium text-text-secondary border-t border-border/50">
        Tracking your mood helps identify patterns between your diet, sleep, and mental well-being.
      </div>
    </div>
  );
}
