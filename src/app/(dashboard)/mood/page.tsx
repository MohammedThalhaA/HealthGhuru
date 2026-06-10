"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MoodCheckIn from '@/components/dashboard/Mood/MoodCheckIn';
import JournalEntry from '@/components/dashboard/Mood/JournalEntry';
import MoodChart from '@/components/dashboard/Mood/MoodChart';

export default function MoodPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FF6B6B] to-[#D32F2F] rounded-[16px] p-6 md:p-8 text-white shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-heading text-2xl font-bold mb-2">Mood & Journal</h2>
          <p className="text-white/80 max-w-lg">
            Mental health is a critical pillar of overall wellness. Track your daily emotions, identify stressors, and practice mindfulness through journaling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Mood Check In & Chart */}
        <div className="flex flex-col gap-6 h-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <MoodCheckIn />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <MoodChart />
          </motion.div>
        </div>

        {/* Right Column: Journal Entry (taking full height) */}
        <div className="h-full">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="h-[600px] lg:h-full">
            <JournalEntry />
          </motion.div>
        </div>

      </div>

    </motion.div>
  );
}
