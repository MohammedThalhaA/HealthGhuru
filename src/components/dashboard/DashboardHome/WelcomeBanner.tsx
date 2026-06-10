"use client";

import React, { useMemo } from 'react';
import { useDashboard } from '@/lib/context/DashboardContext';

const QUOTES = [
  "Your body keeps score. Make today count.",
  "Small steps daily lead to massive results yearly.",
  "Health is not a destination, it's a daily practice.",
  "Rest is not a reward. It's a requirement.",
  "What you eat in private shows in public.",
  "Your future self will thank you for what you do today.",
  "A healthy outside starts from the inside."
];

export default function WelcomeBanner() {
  const { user } = useDashboard();
  
  const todayStr = new Intl.DateTimeFormat('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  const quote = useMemo(() => {
    const dayIndex = new Date().getDay(); // 0-6
    return QUOTES[dayIndex];
  }, []);

  return (
    <div className="w-full rounded-[16px] p-6 sm:p-8 bg-gradient-primary text-white shadow-card relative overflow-hidden flex flex-col justify-center min-h-[140px]">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-48 h-48 rounded-full bg-black/10 blur-xl" />
      
      <div className="relative z-10">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-1">
          Good morning, {user.name.split(' ')[0]} 👋
        </h2>
        <p className="text-white/80 text-sm sm:text-base font-medium mb-3">
          {todayStr}
        </p>
        <p className="text-white/90 text-sm sm:text-base italic font-serif">
          "{quote}"
        </p>
      </div>
    </div>
  );
}
