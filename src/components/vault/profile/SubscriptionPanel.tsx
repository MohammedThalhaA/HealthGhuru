'use client';

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import { Check, Star } from 'lucide-react';

const SubscriptionPanel: React.FC = () => {
  const { userPlan, updatePlan } = useVault();
  const isPro = userPlan.tier === 'pro';

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Subscription Plan</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mb-8">
        {/* Free Plan Card */}
        <div className={`p-6 rounded-2xl border-2 transition-all ${!isPro ? 'border-gray-900 shadow-md bg-gray-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
          <h4 className="text-lg font-bold text-gray-900 mb-2">Free Plan</h4>
          <p className="text-3xl font-bold text-gray-900 mb-6">₹0<span className="text-sm font-medium text-gray-500"> / forever</span></p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-secondary mr-2 flex-shrink-0" /> Up to 10 Health Records</li>
            <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-secondary mr-2 flex-shrink-0" /> 1 Active Health Goal</li>
            <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-secondary mr-2 flex-shrink-0" /> Ad-supported Library</li>
          </ul>

          <button 
            onClick={() => updatePlan('free')}
            disabled={!isPro}
            className={`w-full py-2.5 rounded-xl font-semibold transition-colors ${!isPro ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
          >
            {!isPro ? 'Current Plan' : 'Downgrade to Free'}
          </button>
        </div>

        {/* Pro Plan Card */}
        <div className={`p-6 rounded-2xl border-2 transition-all ${isPro ? 'border-primary shadow-md bg-surface-alt/10' : 'border-gray-200 hover:border-primary/20 bg-white'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-bold text-blue-900">HealthGhuru Pro</h4>
            <div className="flex items-center bg-surface text-primary-dark px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
              <Star className="w-3 h-3 mr-1 fill-primary-dark" /> Pro
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-6">₹499<span className="text-sm font-medium text-primary/70"> / year</span></p>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-sm text-blue-900"><Check className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" /> Unlimited Health Records</li>
            <li className="flex items-center text-sm text-blue-900"><Check className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" /> Unlimited Goals</li>
            <li className="flex items-center text-sm text-blue-900"><Check className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" /> Family Vault (up to 5 members)</li>
            <li className="flex items-center text-sm text-blue-900"><Check className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" /> Searchable Document Text (OCR)</li>
            <li className="flex items-center text-sm text-blue-900"><Check className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" /> 100% Ad-Free Experience</li>
          </ul>

          <button 
            onClick={() => updatePlan('pro')}
            disabled={isPro}
            className={`w-full py-2.5 rounded-xl font-semibold transition-colors shadow-sm ${isPro ? 'bg-primary/50 text-white cursor-not-allowed' : 'bg-primary hover:bg-primary-dark text-white'}`}
          >
            {isPro ? 'Current Plan' : 'Upgrade to Pro'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPanel;
