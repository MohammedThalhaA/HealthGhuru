"use client";

import React, { useState } from 'react';
import { Plus, X, ShieldAlert } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';
import { Button } from '@/components/ui/Button';
import { LockedFeatureCard } from '@/components/ui/LockedFeatureCard';

export function FamilyVaultManager() {
  const { familyMembers, userPlan } = useVault();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const isFree = userPlan.tier === 'free';

  return (
    <div className="bg-white border border-border rounded-xl md:rounded-[14px] shadow-[0_4px_24px_rgba(46,125,50,0.08)] p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
        <div>
          <h3 className="font-heading font-bold text-base md:text-xl text-dark">Family Vault</h3>
          <p className="text-sm text-text-secondary mt-1">Manage profiles for your family members.</p>
        </div>
        
        {!isFree && (
          <Button variant="outline" onClick={() => setIsAddModalOpen(true)} className="gap-2 bg-surface-alt">
            <Plus size={16} /> Add Member
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {familyMembers.map((member, index) => (
          <div key={member.id} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-lg">
                {member.avatarInitials}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-dark leading-tight">{member.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-text-muted capitalize">{member.relationship}</span>
                  <span className="text-text-muted text-xs">&middot;</span>
                  <span className="text-xs text-text-muted">{member.dob}</span>
                </div>
              </div>
            </div>
            
            {index !== 0 && (
              <button className="text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors">
                Remove
              </button>
            )}
            {index === 0 && (
              <span className="text-xs font-bold bg-surface-alt text-text-muted px-2 py-1 rounded-md">Primary</span>
            )}
          </div>
        ))}

        {isFree && (
          <div className="mt-6">
            <LockedFeatureCard 
              message="Family Vault is a Pro feature. Add up to 5 family members."
              upgradeText="Upgrade to Pro &rarr;"
              className="border-dashed"
            />
          </div>
        )}
      </div>

      {isAddModalOpen && !isFree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="profile-section-heading font-heading font-bold text-xl text-dark">Add Family Member</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-text-muted hover:text-dark">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="profile-label block text-sm font-medium text-text-primary mb-1">Name</label>
                <input type="text" className="profile-value w-full px-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div>
                <label className="profile-label block text-sm font-medium text-text-primary mb-1">Relationship</label>
                <select className="profile-value w-full px-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option>Spouse</option>
                  <option>Child</option>
                  <option>Parent</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="profile-label block text-sm font-medium text-text-primary mb-1">Date of Birth</label>
                <input type="date" className="profile-value w-full px-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl mb-6 text-sm">
              <ShieldAlert size={20} className="shrink-0 text-blue-500 mt-0.5" />
              <p>Adding a family member creates a secure, segregated section within your vault for their records.</p>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>Add Member</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
