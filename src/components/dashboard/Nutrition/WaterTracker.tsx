"use client";

import React from 'react';
import { Droplets, Info } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { motion } from 'framer-motion';

export default function WaterTracker() {
  const { today, updateToday } = useDashboard();
  const maxGlasses = 8;

  const toggleGlass = (index: number) => {
    // If clicking the current exact glass count, it subtracts 1 (unfills it)
    // If clicking any other glass, it fills up to that glass index + 1
    if (index === today.waterGlasses - 1) {
      updateToday({ waterGlasses: index });
    } else {
      updateToday({ waterGlasses: index + 1 });
    }
  };

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-border overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-surface flex items-center gap-2">
        <Droplets size={20} className="text-[#29B6F6]" />
        <h3 className="font-heading font-bold text-dark uppercase tracking-wide">Water Tracker</h3>
      </div>
      
      <div className="p-6">
        <p className="text-center font-bold text-dark text-lg mb-6">
          You've had <span className="text-[#29B6F6]">{today.waterGlasses}</span> of {maxGlasses} glasses today
        </p>

        <div className="grid grid-cols-4 gap-4 max-w-[240px] mx-auto mb-8">
          {Array.from({ length: maxGlasses }).map((_, i) => (
            <motion.button 
              key={i} 
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleGlass(i)}
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                i < today.waterGlasses 
                  ? 'bg-[#29B6F6]/20 border-[#29B6F6] shadow-[0_4px_12px_rgba(41,182,246,0.3)]' 
                  : 'border-border bg-surface hover:border-[#29B6F6]/50'
              }`}
            >
              <Droplets 
                size={24} 
                className={i < today.waterGlasses ? 'text-[#29B6F6]' : 'text-border'} 
                fill={i < today.waterGlasses ? 'currentColor' : 'none'}
              />
            </motion.button>
          ))}
        </div>

        <div className="bg-[#29B6F6]/5 border border-[#29B6F6]/20 rounded-xl p-4 flex items-start gap-3">
          <Info size={18} className="text-[#29B6F6] mt-0.5 shrink-0" />
          <p className="text-sm text-text-secondary">
            <strong className="text-[#29B6F6]">Tip:</strong> Drink a glass of water 30 minutes before each meal to aid digestion and help control portion sizes.
          </p>
        </div>
      </div>
    </div>
  );
}
