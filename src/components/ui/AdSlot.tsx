import React from 'react';

interface AdSlotProps {
  className?: string;
  variant?: 'card' | 'rail';
}

const AdSlot: React.FC<AdSlotProps> = ({ className = '', variant = 'card' }) => {
  if (variant === 'rail') {
    return (
      <div className={`hidden lg:flex flex-col items-center justify-center w-[300px] h-[600px] bg-gray-100 border border-gray-200 rounded-2xl p-4 text-center ${className}`}>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Advertisement</span>
        <div className="w-full flex-1 flex items-center justify-center bg-white border border-gray-200 rounded-xl">
          <p className="text-gray-400 text-sm">Ad Unit Placeholder<br/>(300x600)</p>
        </div>
      </div>
    );
  }

  // Card variant (inline in feed)
  return (
    <div className={`flex items-center justify-center w-full h-[250px] bg-gray-100 border border-gray-200 rounded-2xl p-4 text-center relative overflow-hidden ${className}`}>
      <span className="absolute top-3 right-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-white/80 px-2 py-1 rounded backdrop-blur-sm z-10">
        Advertisement
      </span>
      <div className="w-full h-full flex flex-col items-center justify-center">
         <p className="text-gray-400 text-sm font-medium">Inline Ad Placeholder</p>
         <p className="text-gray-400 text-xs mt-1">Sponsor Message Here</p>
      </div>
    </div>
  );
};

export default AdSlot;
