"use client";

import React from 'react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { motion } from 'framer-motion';

export default function StreakCard() {
  const { today } = useDashboard();
  
  // Weekly structure (M, T, W, T, F, S, S)
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0=Mon, 6=Sun

  // Mock past days as completed (green), today as pulsing amber, future as empty
  const getDayStatus = (index: number) => {
    if (index < todayIndex) return 'completed';
    if (index === todayIndex) return 'today';
    return 'future';
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border p-5 md:p-6 h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-dark">Weekly Streak</h3>
        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-md">
          {today.streak} Days 🔥
        </span>
      </div>

      <div className="flex justify-between items-center px-1 mb-6">
        {days.map((day, i) => {
          const status = getDayStatus(i);
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-text-muted">{day}</span>
              <div className="relative flex items-center justify-center w-8 h-8">
                {status === 'completed' && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                )}
                {status === 'today' && (
                  <>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full bg-accent/30"
                    />
                    <div className="w-4 h-4 rounded-full bg-accent" />
                  </>
                )}
                {status === 'future' && (
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto bg-surface-alt rounded-lg p-3 text-center border border-border/50">
        <p className="text-sm font-medium text-text-primary">
          🔥 {today.streak}-day streak! Keep it up.
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex flex-col items-center opacity-100">
            <span className="text-lg">🥉</span>
            <span className="text-[10px] font-bold text-text-muted">7 DAYS</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex flex-col items-center opacity-40 grayscale">
            <span className="text-lg">🥈</span>
            <span className="text-[10px] font-bold text-text-muted">30 DAYS</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex flex-col items-center opacity-40 grayscale">
            <span className="text-lg">🥇</span>
            <span className="text-[10px] font-bold text-text-muted">90 DAYS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
