"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressRing from '@/components/ui/ProgressRing';

interface MacroRingsProps {
  calories: number;
  caloriesTarget: number;
  protein: number;
  proteinTarget: number;
  carbs: number;
  carbsTarget: number;
  fat: number;
  fatTarget: number;
}

export default function MacroRings({ 
  calories, caloriesTarget, 
  protein, proteinTarget, 
  carbs, carbsTarget, 
  fat, fatTarget 
}: MacroRingsProps) {

  const todayStr = new Intl.DateTimeFormat('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long'
  }).format(new Date());

  const getPercentage = (value: number, target: number) => Math.min(100, Math.round((value / target) * 100));

  const remainingCals = caloriesTarget - calories;
  const isOverCals = remainingCals < 0;

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-surface-alt px-6 py-4 flex items-center justify-between border-b border-border">
        <h3 className="font-heading font-bold text-dark flex items-center gap-2">
          Today: <span className="font-medium text-text-secondary">{todayStr}</span>
        </h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors">
            <ChevronLeft size={16} /> Yesterday
          </button>
          <div className="w-px h-4 bg-border mx-2" />
          <button className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-primary transition-colors opacity-50 cursor-not-allowed">
            Tomorrow <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Rings Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Calories Ring */}
        <div className="flex flex-col items-center">
          <ProgressRing value={getPercentage(calories, caloriesTarget)} size={110} strokeWidth={8} color="#4CAF50">
            <div className="flex flex-col items-center">
              <span className="font-mono text-xl font-bold text-dark">{calories}</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">/ {caloriesTarget}</span>
            </div>
          </ProgressRing>
          <div className="text-center mt-4">
            <span className="text-sm font-bold text-dark block">Calories</span>
            <span className={`text-xs font-medium ${isOverCals ? 'text-status-danger' : 'text-status-good'}`}>
              {Math.abs(remainingCals)} kcal {isOverCals ? 'over' : 'remaining'}
            </span>
          </div>
        </div>

        {/* Protein Ring */}
        <div className="flex flex-col items-center">
          <ProgressRing value={getPercentage(protein, proteinTarget)} size={110} strokeWidth={8} color="#29B6F6">
            <div className="flex flex-col items-center">
              <span className="font-mono text-xl font-bold text-dark">{protein}g</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">/ {proteinTarget}g</span>
            </div>
          </ProgressRing>
          <div className="text-center mt-4">
            <span className="text-sm font-bold text-dark block">Protein</span>
          </div>
        </div>

        {/* Carbs Ring */}
        <div className="flex flex-col items-center">
          <ProgressRing value={getPercentage(carbs, carbsTarget)} size={110} strokeWidth={8} color="#F9A825">
            <div className="flex flex-col items-center">
              <span className="font-mono text-xl font-bold text-dark">{carbs}g</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">/ {carbsTarget}g</span>
            </div>
          </ProgressRing>
          <div className="text-center mt-4">
            <span className="text-sm font-bold text-dark block">Carbs</span>
          </div>
        </div>

        {/* Fat Ring */}
        <div className="flex flex-col items-center">
          <ProgressRing value={getPercentage(fat, fatTarget)} size={110} strokeWidth={8} color="#FF6B6B">
            <div className="flex flex-col items-center">
              <span className="font-mono text-xl font-bold text-dark">{fat}g</span>
              <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">/ {fatTarget}g</span>
            </div>
          </ProgressRing>
          <div className="text-center mt-4">
            <span className="text-sm font-bold text-dark block">Fat</span>
          </div>
        </div>

      </div>
    </div>
  );
}
