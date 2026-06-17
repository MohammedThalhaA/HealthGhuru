"use client";

import React from 'react';
import { CreditCard, CheckCircle, Zap } from 'lucide-react';
import { useDashboard } from '@/lib/context/DashboardContext';
import { useToast } from '@/components/ui/Toast';

export default function SubscriptionCard() {
  const { user } = useDashboard();
  const { addToast } = useToast();

  const handleUpgradeClick = () => {
    addToast('Payment gateway integration placeholder.', 'success');
  };

  return (
    <div className="bg-gradient-to-br from-dark to-gray-900 rounded-[16px] shadow-sm border border-gray-800 overflow-hidden h-full flex flex-col relative text-white">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between relative z-10">
        <h3 className="font-heading font-bold uppercase tracking-wide flex items-center gap-2">
          <CreditCard size={18} className="text-accent" /> Plan & Billing
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${user.plan === 'pro' ? 'bg-accent text-dark' : 'bg-white/10 text-white'}`}>
          {user.plan === 'pro' ? 'Pro Member' : 'Free Plan'}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10">
        
        {user.plan === 'free' ? (
          <>
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2">Upgrade to Pro</h4>
              <p className="text-sm text-gray-400">Unlock full access to expert articles, advanced analytics, and personalized coaching features.</p>
            </div>
            
            <ul className="space-y-3 mb-6 flex-1">
              <li className="flex gap-2 text-sm">
                <CheckCircle size={18} className="text-accent shrink-0" />
                <span>Unlimited premium articles</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCircle size={18} className="text-accent shrink-0" />
                <span>Advanced weekly & monthly insights</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCircle size={18} className="text-accent shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>

            <button 
              onClick={handleUpgradeClick}
              className="w-full bg-accent text-dark font-bold py-3 rounded-lg shadow-btn-accent hover:brightness-105 active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 mt-auto"
            >
              <Zap size={18} /> Upgrade for $9.99/mo
            </button>
          </>
        ) : (
          <>
            <div className="mb-6 flex-1">
              <h4 className="text-xl font-bold mb-2">You are a Pro Member!</h4>
              <p className="text-sm text-gray-400 mb-6">Thank you for supporting HealthGhuru. You have access to all premium features.</p>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Next billing date</span>
                  <span className="text-sm font-bold">Oct 12, 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Amount</span>
                  <span className="text-sm font-bold">$9.99</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-white/10 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition-colors mt-auto">
              Manage Billing
            </button>
          </>
        )}
      </div>
    </div>
  );
}
