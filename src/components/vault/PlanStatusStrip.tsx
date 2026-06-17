import React from 'react';
import Link from 'next/link';
import { useVault } from '@/lib/context/VaultContext';

const PlanStatusStrip: React.FC = () => {
  const { userPlan, records } = useVault();
  
  if (userPlan.tier === 'pro') {
    return (
      <div className="flex items-center px-3 py-1.5 bg-surface-alt text-primary-dark text-xs font-semibold rounded-full border border-surface">
        Pro Plan · Unlimited
      </div>
    );
  }

  return (
    <div className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
      <span className="mr-2">Free Plan · {records.length}/{userPlan.recordsLimit} records</span>
      <Link href="/profile?tab=subscription" className="text-primary hover:text-blue-800 font-semibold transition-colors">
        Upgrade
      </Link>
    </div>
  );
};

export default PlanStatusStrip;
