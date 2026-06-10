"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/lib/context/DashboardContext';

import SleepLogger from '@/components/dashboard/Sleep/SleepLogger';
import SleepChart from '@/components/dashboard/Sleep/SleepChart';
import SleepInsights from '@/components/dashboard/Sleep/SleepInsights';

export default function SleepPage() {
  const { today } = useDashboard();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      
      {/* Top Banner indicating today's state */}
      <div className="bg-gradient-to-r from-[#7C4DFF] to-[#512DA8] rounded-[16px] p-6 md:p-8 text-white shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-heading text-2xl font-bold mb-2">Sleep & Recovery</h2>
          <p className="text-white/80 max-w-lg">
            Track your sleep cycles, quality, and habits to optimize your recovery and mental clarity. Consistency is key.
          </p>
        </div>
        <div className="shrink-0 text-center bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 min-w-[160px]">
          <span className="text-sm font-bold text-white/80 block mb-1 uppercase tracking-wider">Tonight's Goal</span>
          <span className="font-mono text-3xl font-bold">7.5 <span className="text-lg">hrs</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        
        {/* Left Column: Logger */}
        <div className="flex flex-col h-full gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex-1">
            <SleepLogger />
          </motion.div>
        </div>

        {/* Right Column: Chart & Insights */}
        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <SleepChart />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex-1">
            <SleepInsights />
          </motion.div>
        </div>

      </div>

    </motion.div>
  );
}
