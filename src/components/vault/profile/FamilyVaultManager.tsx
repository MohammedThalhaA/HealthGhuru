'use client';

import React from 'react';
import { useVault } from '@/lib/context/VaultContext';
import LockedFeatureCard from '@/components/ui/LockedFeatureCard';
import { Users, Plus, Shield } from 'lucide-react';

const FamilyVaultManager: React.FC = () => {
  const { userPlan, familyMembers } = useVault();

  if (userPlan.tier === 'free') {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Family Vault</h3>
        <LockedFeatureCard 
          title="Family Vaults are for Pro Members" 
          description="Upgrade to HealthGhuru Pro to manage health records and goals for up to 5 family members under one account."
        />
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Family Vault</h3>
          <p className="text-gray-500 text-sm mt-1">Manage up to {userPlan.familyMembersLimit} family members</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-surface-alt text-primary-dark font-medium rounded-xl hover:bg-surface transition-colors">
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </button>
      </div>

      <div className="space-y-4">
        {familyMembers.map(member => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-surface text-primary-dark rounded-full flex items-center justify-center font-bold">
                {member.avatarInitials}
              </div>
              <div>
                <p className="font-semibold text-gray-900 flex items-center">
                  {member.name}
                  {member.relationship === 'self' && (
                    <span className="ml-2 px-2 py-0.5 bg-surface text-primary-dark text-[10px] uppercase font-bold rounded">Account Owner</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 capitalize">{member.relationship}</p>
              </div>
            </div>
            
            {member.relationship !== 'self' && (
              <button className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start p-4 bg-surface-alt/50 rounded-2xl">
        <Shield className="w-5 h-5 text-primary-light mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Privacy Note:</strong> Each family member's records are siloed. They are only visible when their specific profile is selected from the top navigation switcher.
        </p>
      </div>
    </div>
  );
};

export default FamilyVaultManager;
