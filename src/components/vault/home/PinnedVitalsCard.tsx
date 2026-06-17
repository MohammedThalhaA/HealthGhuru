'use client';

import React from 'react';
import { Activity } from 'lucide-react';

const PinnedVitalsCard: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[160px] bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-primary-light" />
          Pinned Vitals
        </h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-end justify-between border-b border-gray-100 pb-3 mb-3">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Blood Pressure</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">120/80 <span className="text-sm font-normal text-gray-400">mmHg</span></p>
          </div>
          <span className="text-xs text-gray-400">2 days ago</span>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">Weight</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">79.8 <span className="text-sm font-normal text-gray-400">kg</span></p>
          </div>
          <span className="text-xs text-gray-400">Today</span>
        </div>
      </div>
    </div>
  );
};

export default PinnedVitalsCard;
