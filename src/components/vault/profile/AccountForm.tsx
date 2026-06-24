"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useVault } from '@/lib/context/VaultContext';

export function AccountForm() {
  const { familyMembers } = useVault();
  const selfMember = familyMembers.find(m => m.relationship === 'self') || familyMembers[0];

  return (
    <div className="bg-white border border-border rounded-[14px] shadow-[0_4px_24px_rgba(46,125,50,0.08)] p-8">
      <h3 className="font-heading font-bold text-xl text-dark mb-6">Personal Details</h3>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
            <input 
              type="text" 
              defaultValue={selfMember.name}
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email Address</label>
            <input 
              type="email" 
              defaultValue="user@example.com"
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Date of Birth</label>
            <input 
              type="date" 
              defaultValue={selfMember.dob}
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Gender</label>
            <select className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
            <input 
              type="tel" 
              defaultValue="+91 98765 43210"
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">City</label>
            <input 
              type="text" 
              defaultValue="Bangalore"
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Height (cm)</label>
            <input 
              type="number" 
              defaultValue="175"
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Weight (kg)</label>
            <input 
              type="number" 
              defaultValue="75"
              className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end border-t border-border mt-8">
          <Button type="button" variant="primary">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
